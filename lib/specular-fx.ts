/**
 * SpecularButton FX — tek pointer + tek rAF.
 * Her buton kendi küçük canvas'ına çizer (görsel aynı); idle'da rAF tamamen durur.
 * Eski: N context × sonsuz rAF → desktop'ta ~60+ rAF/100ms.
 */
import { Renderer, Program, Mesh, Triangle, Color } from "ogl";

const PAD = 20;

const VERT = `#version 300 es
in vec2 position;
void main() {
  gl_Position = vec4(position, 0.0, 1.0);
}
`;

const FRAG = `#version 300 es
precision highp float;

uniform vec2 uCenter;
uniform vec2 uHalfSize;
uniform float uRadius;
uniform float uAngle;
uniform float uPx;
uniform vec3 uLineColor;
uniform vec3 uBaseColor;
uniform float uIntensity;
uniform float uShineSize;
uniform float uShineFade;
uniform float uThickness;
uniform float uBaseWidth;

out vec4 fragColor;

float sdRoundedRect(vec2 p, vec2 b, float r) {
  vec2 q = abs(p) - b + r;
  return length(max(q, 0.0)) + min(max(q.x, q.y), 0.0) - r;
}

float shapeSDF(vec2 p) { return sdRoundedRect(p, uHalfSize, uRadius); }

float gaussianLine(float d, float sigma) {
  float x = d / (sigma + 1e-6);
  float k = mix(1.0, 1.6, smoothstep(0.0, 1.5, x));
  return exp(-k * x * x);
}

void main() {
  vec2 p = gl_FragCoord.xy - uCenter;
  float d = shapeSDF(p);
  vec2 L = vec2(cos(uAngle), sin(uAngle));

  float base = (1.0 - smoothstep(0.0, uBaseWidth, abs(d))) * 0.45;

  vec2 nEll = normalize(p / (uHalfSize * uHalfSize) + 1e-6);
  float phi = acos(clamp(abs(dot(nEll, L)), 0.0, 1.0));
  float rim = 1.0 - smoothstep(uShineSize - uShineFade, uShineSize + uShineFade + 1e-4, phi);
  float line = gaussianLine(d, uThickness);
  float edgeClamp = 1.0 - smoothstep(0.5 * uPx, 3.0 * uPx, abs(d));
  float hi = line * rim * edgeClamp * uIntensity;

  vec3 col = uBaseColor * base + uLineColor * hi;
  float a = clamp(base + hi, 0.0, 1.0);
  fragColor = vec4(col, a);
}
`;

export type SpecularFxProps = {
  radius: number;
  lineColor: string;
  baseColor: string;
  intensity: number;
  shineSize: number;
  shineFade: number;
  thickness: number;
  speed: number;
  followMouse: boolean;
  proximity: number;
  autoAnimate: boolean;
};

type SpecularFxInstance = {
  btn: HTMLElement;
  fx: HTMLElement;
  props: () => SpecularFxProps;
  dpr: number;
  renderer: Renderer;
  program: Program;
  mesh: Mesh;
  size: { w: number; h: number };
  pointerAngle: number | null;
  proximityT: number;
  angle: number;
  idleAngle: number;
  bright: number;
  visible: boolean;
  last: number;
  ro: ResizeObserver;
  io: IntersectionObserver;
  lineC: Color;
  baseC: Color;
};

const instances = new Set<SpecularFxInstance>();
let pointerBound = false;
let visibilityBound = false;
let pageVisible = true;
let raf = 0;
let looping = false;
let pointerX = 0;
let pointerY = 0;

function ensureListeners() {
  if (!pointerBound) {
    pointerBound = true;
    window.addEventListener("pointermove", onPointerMove, { passive: true });
  }
  if (!visibilityBound) {
    visibilityBound = true;
    pageVisible = !document.hidden;
    document.addEventListener("visibilitychange", onVisibility);
  }
}

function teardownListenersIfIdle() {
  if (instances.size > 0) return;
  if (pointerBound) {
    window.removeEventListener("pointermove", onPointerMove);
    pointerBound = false;
  }
  if (visibilityBound) {
    document.removeEventListener("visibilitychange", onVisibility);
    visibilityBound = false;
  }
  stopLoop();
}

function onVisibility() {
  pageVisible = !document.hidden;
  if (pageVisible) wakeLoop();
  else stopLoop();
}

function onPointerMove(e: PointerEvent) {
  pointerX = e.clientX;
  pointerY = e.clientY;
  let anyHot = false;
  for (const inst of instances) {
    updateProximity(inst, pointerX, pointerY);
    if (inst.visible && (inst.proximityT > 0.001 || inst.props().autoAnimate || inst.bright > 0.01)) {
      anyHot = true;
    }
  }
  if (anyHot) wakeLoop();
}

function updateProximity(inst: SpecularFxInstance, x: number, y: number) {
  const rect = inst.btn.getBoundingClientRect();
  const cx = rect.left + rect.width / 2;
  const cy = rect.top + rect.height / 2;
  const dx = Math.max(rect.left - x, 0, x - rect.right);
  const dy = Math.max(rect.top - y, 0, y - rect.bottom);
  const dist = Math.hypot(dx, dy);
  if (dist === 0) {
    const nx = (x - cx) / (rect.width / 2 || 1);
    const ny = (cy - y) / (rect.height / 2 || 1);
    inst.pointerAngle =
      Math.atan2(2 / rect.height, -2 / rect.width) + nx * 0.3 + ny * 0.15;
  } else {
    inst.pointerAngle = Math.atan2(cy - y, x - cx);
  }
  const prox = Math.max(inst.props().proximity, 1);
  const t = Math.max(0, 1 - dist / prox);
  inst.proximityT = t * t * (3 - 2 * t);
}

function resizeInstance(inst: SpecularFxInstance) {
  const rect = inst.btn.getBoundingClientRect();
  const w = rect.width;
  const h = rect.height;
  if (w < 1 || h < 1) return;
  inst.size.w = w;
  inst.size.h = h;
  const { dpr, renderer, program } = inst;
  renderer.setSize(w + PAD * 2, h + PAD * 2);
  program.uniforms.uCenter.value = [(PAD + w / 2) * dpr, (PAD + h / 2) * dpr];
  program.uniforms.uHalfSize.value = [(w / 2) * dpr, (h / 2) * dpr];
}

function clearInstance(inst: SpecularFxInstance) {
  const { program, renderer, mesh } = inst;
  program.uniforms.uIntensity.value = 0;
  renderer.render({ scene: mesh });
  renderer.gl.canvas.style.opacity = "0";
  inst.bright = 0;
}

function paintInstance(inst: SpecularFxInstance, now: number) {
  const p = inst.props();
  const dt = Math.min((now - inst.last) / 1000, 0.05);
  inst.last = now;

  inst.idleAngle += p.speed * dt;
  const steer =
    p.followMouse &&
    inst.pointerAngle != null &&
    (!p.autoAnimate || inst.proximityT > 0);
  const target =
    steer && inst.pointerAngle != null ? inst.pointerAngle : inst.idleAngle;
  const diff = ((target - inst.angle + Math.PI * 3) % (Math.PI * 2)) - Math.PI;
  inst.angle += diff * (1 - Math.exp(-dt * 7));

  const brightTarget = p.autoAnimate ? 1 : inst.proximityT;
  inst.bright += (brightTarget - inst.bright) * (1 - Math.exp(-dt * 8));

  const { program, renderer, mesh, dpr, size, lineC, baseC } = inst;

  if (inst.bright < 0.01 && !p.autoAnimate) {
    if (renderer.gl.canvas.style.opacity !== "0") {
      clearInstance(inst);
    } else {
      inst.bright = 0;
    }
    return false;
  }

  renderer.gl.canvas.style.opacity = "1";
  lineC.set(p.lineColor);
  baseC.set(p.baseColor);
  program.uniforms.uAngle.value = inst.angle;
  program.uniforms.uRadius.value =
    Math.min(p.radius, Math.min(size.w, size.h) / 2) * dpr;
  program.uniforms.uLineColor.value = [lineC.r, lineC.g, lineC.b];
  program.uniforms.uBaseColor.value = [baseC.r, baseC.g, baseC.b];
  program.uniforms.uIntensity.value = p.intensity * inst.bright;
  program.uniforms.uShineSize.value = (p.shineSize * Math.PI) / 180;
  program.uniforms.uShineFade.value = (p.shineFade * Math.PI) / 180;
  program.uniforms.uThickness.value = p.thickness * dpr;
  renderer.render({ scene: mesh });
  return true;
}

function tick(now: number) {
  raf = 0;
  if (!pageVisible || instances.size === 0) {
    looping = false;
    return;
  }

  let keep = false;
  for (const inst of instances) {
    if (!inst.visible) continue;
    const p = inst.props();
    const needs =
      p.autoAnimate || inst.proximityT > 0.001 || inst.bright > 0.01;
    if (!needs) continue;
    if (paintInstance(inst, now)) keep = true;
    else if (p.autoAnimate) keep = true;
  }

  if (keep) {
    raf = requestAnimationFrame(tick);
  } else {
    looping = false;
  }
}

function wakeLoop() {
  if (looping || !pageVisible || instances.size === 0) return;
  looping = true;
  raf = requestAnimationFrame(tick);
}

function stopLoop() {
  looping = false;
  if (raf) {
    cancelAnimationFrame(raf);
    raf = 0;
  }
}

export function mountSpecularFx(
  btn: HTMLElement,
  fx: HTMLElement,
  props: () => SpecularFxProps
): () => void {
  ensureListeners();

  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  const renderer = new Renderer({
    alpha: true,
    premultipliedAlpha: true,
    antialias: true,
    dpr,
  });
  const gl = renderer.gl;
  gl.clearColor(0, 0, 0, 0);
  gl.enable(gl.BLEND);
  gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);

  const geometry = new Triangle(gl);
  if (geometry.attributes.uv) delete geometry.attributes.uv;

  const program = new Program(gl, {
    vertex: VERT,
    fragment: FRAG,
    uniforms: {
      uCenter: { value: [0, 0] },
      uHalfSize: { value: [1, 1] },
      uRadius: { value: 0 },
      uAngle: { value: 2.4 },
      uPx: { value: dpr },
      uLineColor: { value: [1, 1, 1] },
      uBaseColor: { value: [0.32, 0.32, 0.32] },
      uIntensity: { value: 1 },
      uShineSize: { value: 0.17 },
      uShineFade: { value: 0.7 },
      uThickness: { value: 1 },
      uBaseWidth: { value: dpr },
    },
  });

  const mesh = new Mesh(gl, { geometry, program });
  fx.appendChild(gl.canvas);

  const inst: SpecularFxInstance = {
    btn,
    fx,
    props,
    dpr,
    renderer,
    program,
    mesh,
    size: { w: 1, h: 1 },
    pointerAngle: null,
    proximityT: 0,
    angle: 2.4,
    idleAngle: 2.4,
    bright: 0,
    visible: true,
    last: performance.now(),
    ro: null as unknown as ResizeObserver,
    io: null as unknown as IntersectionObserver,
    lineC: new Color(),
    baseC: new Color(),
  };

  const ro = new ResizeObserver(() => resizeInstance(inst));
  ro.observe(btn);
  inst.ro = ro;
  resizeInstance(inst);

  program.uniforms.uIntensity.value = 0;
  renderer.render({ scene: mesh });
  gl.canvas.style.opacity = "0";

  const io = new IntersectionObserver(
    ([entry]) => {
      inst.visible = entry?.isIntersecting ?? false;
      if (inst.visible && (inst.props().autoAnimate || inst.proximityT > 0)) {
        wakeLoop();
      }
    },
    { rootMargin: "80px" }
  );
  io.observe(btn);
  inst.io = io;

  instances.add(inst);
  if (inst.props().autoAnimate) wakeLoop();

  return () => {
    instances.delete(inst);
    ro.disconnect();
    io.disconnect();
    if (gl.canvas.parentNode === fx) fx.removeChild(gl.canvas);
    gl.getExtension("WEBGL_lose_context")?.loseContext();
    teardownListenersIfIdle();
  };
}
