"use client";

import { useEffect, useMemo, useRef, useState, Suspense } from "react";
import * as THREE from "three";
import {
  Canvas,
  extend,
  useFrame,
  useThree,
  type ThreeEvent,
} from "@react-three/fiber";
import {
  useGLTF,
  useTexture,
} from "@react-three/drei";
import {
  BallCollider,
  CuboidCollider,
  Physics,
  RigidBody,
  useRopeJoint,
  useSphericalJoint,
  type RapierRigidBody,
} from "@react-three/rapier";
import { MeshLineGeometry, MeshLineMaterial } from "meshline";
import "./Lanyard.css";

extend({ MeshLineGeometry, MeshLineMaterial });

declare module "@react-three/fiber" {
  interface ThreeElements {
    meshLineGeometry: {
      attach?: string;
      points?: THREE.Vector3[];
    };
    meshLineMaterial: {
      attach?: string;
      transparent?: boolean;
      opacity?: number;
      color?: THREE.ColorRepresentation;
      depthTest?: boolean;
      resolution?: [number, number];
      useMap?: number;
      map?: THREE.Texture;
      repeat?: [number, number];
      lineWidth?: number;
    };
  }
}

// 1x1 transparent pixel — lets useTexture be called unconditionally when a
// front/back image isn't supplied.
const BLANK_PIXEL =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==";

// The card model's front face is UV-mapped to the LEFT half of the texture
// atlas and the back face to the RIGHT half (measured from card.glb).
const FRONT_UV_RECT = { x: 0, y: 0, w: 0.5, h: 0.755 };
const BACK_UV_RECT = { x: 0.5, y: 0, w: 0.5, h: 0.757 };

/**
 * Smooth 1024x512 studio equirect environment map.
 */
function useStudioEnvironment() {
  return useMemo(() => {
    if (typeof document === "undefined") return null;
    const w = 1024;
    const h = 512;
    const canvas = document.createElement("canvas");
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext("2d");
    if (!ctx) return null;

    // Smooth studio gradient
    const bgGrad = ctx.createLinearGradient(0, 0, 0, h);
    bgGrad.addColorStop(0, "#0a0c12");
    bgGrad.addColorStop(0.5, "#161b26");
    bgGrad.addColorStop(1, "#08090e");
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, w, h);

    // Key softbox
    const rad1 = ctx.createRadialGradient(
      w * 0.75,
      h * 0.35,
      10,
      w * 0.75,
      h * 0.35,
      220
    );
    rad1.addColorStop(0, "rgba(255, 255, 255, 0.85)");
    rad1.addColorStop(0.3, "rgba(235, 245, 255, 0.45)");
    rad1.addColorStop(0.7, "rgba(180, 215, 255, 0.1)");
    rad1.addColorStop(1, "rgba(0, 0, 0, 0)");
    ctx.fillStyle = rad1;
    ctx.fillRect(0, 0, w, h);

    // Rim softbox
    const rad2 = ctx.createRadialGradient(
      w * 0.25,
      h * 0.65,
      10,
      w * 0.25,
      h * 0.65,
      180
    );
    rad2.addColorStop(0, "rgba(220, 240, 255, 0.6)");
    rad2.addColorStop(0.35, "rgba(140, 185, 255, 0.2)");
    rad2.addColorStop(1, "rgba(0, 0, 0, 0)");
    ctx.fillStyle = rad2;
    ctx.fillRect(0, 0, w, h);

    const tex = new THREE.CanvasTexture(canvas);
    tex.mapping = THREE.EquirectangularReflectionMapping;
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.generateMipmaps = true;
    tex.minFilter = THREE.LinearMipmapLinearFilter;
    tex.magFilter = THREE.LinearFilter;
    tex.anisotropy = 16;
    tex.needsUpdate = true;
    return tex;
  }, []);
}

function SceneEnvironment() {
  const envTex = useStudioEnvironment();
  return envTex ? <primitive object={envTex} attach="environment" /> : null;
}

export interface LanyardProps {
  position?: [number, number, number];
  gravity?: [number, number, number];
  fov?: number;
  transparent?: boolean;
  frontImage?: string | null;
  backImage?: string | null;
  imageFit?: "cover" | "contain";
  lanyardImage?: string | null;
  lanyardWidth?: number;
  modelPath?: string;
  anchorPosition?: [number, number, number];
  cardScale?: number;
  className?: string;
}

interface GLTFResult {
  nodes: {
    card: THREE.Mesh;
    clip: THREE.Mesh;
    clamp: THREE.Mesh;
    [key: string]: THREE.Object3D;
  };
  materials: {
    base: THREE.MeshPhysicalMaterial & { map: THREE.Texture };
    metal: THREE.MeshStandardMaterial;
    [key: string]: THREE.Material;
  };
}

export default function Lanyard({
  position = [0, 0, 20],
  gravity = [0, -40, 0],
  fov = 20,
  transparent = true,
  frontImage = "/lanyard/metek-card-black.png",
  backImage = "/lanyard/metek-card-black.png",
  imageFit = "contain",
  lanyardImage = "/lanyard/metek-lanyard.png",
  lanyardWidth = 1.25,
  modelPath = "/lanyard/card.glb",
  anchorPosition,
  cardScale,
  className = "",
}: LanyardProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(true);
  const [tabVisible, setTabVisible] = useState(true);
  const [isMobile, setIsMobile] = useState(
    () => typeof window !== "undefined" && (window.innerWidth < 768 || window.matchMedia("(pointer: coarse)").matches)
  );

  useEffect(() => {
    const coarseMq = window.matchMedia("(pointer: coarse)");
    const handleResize = () => setIsMobile(window.innerWidth < 768 || coarseMq.matches);
    window.addEventListener("resize", handleResize);
    coarseMq.addEventListener("change", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      coarseMq.removeEventListener("change", handleResize);
    };
  }, []);

  useEffect(() => {
    const onVis = () => setTabVisible(document.visibilityState === "visible");
    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
  }, []);

  useEffect(() => {
    const el = containerRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry) setInView(entry.isIntersecting);
      },
      { rootMargin: "15% 0px", threshold: 0.01 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const active = inView && tabVisible;

  return (
    <div ref={containerRef} className={`lanyard-wrapper ${className}`}>
      <Suspense fallback={null}>
        <Canvas
          camera={{ position, fov }}
          dpr={[1, isMobile ? 1.5 : 2]}
          frameloop={active ? "always" : "never"}
          gl={{
            alpha: transparent,
            antialias: true,
            powerPreference: "high-performance",
          }}
          onCreated={({ gl }) => {
            gl.setClearColor(
              new THREE.Color(0x000000),
              transparent ? 0 : 1
            );
          }}
        >
          <SceneEnvironment />

          <ambientLight intensity={Math.PI * 1.0} />
          <directionalLight position={[6, 12, 8]} intensity={2.0} />
          <directionalLight position={[-8, 8, 6]} intensity={1.4} />
          <directionalLight position={[0, -6, 8]} intensity={0.8} />

          <Physics gravity={gravity} timeStep={isMobile ? 1 / 30 : 1 / 60} paused={!active}>
            <Band
              isMobile={isMobile}
              frontImage={frontImage}
              backImage={backImage}
              imageFit={imageFit}
              lanyardImage={lanyardImage}
              lanyardWidth={lanyardWidth}
              modelPath={modelPath}
              anchorPosition={anchorPosition}
              cardScale={cardScale}
            />
          </Physics>
        </Canvas>
      </Suspense>
    </div>
  );
}

interface BandProps {
  maxSpeed?: number;
  minSpeed?: number;
  isMobile?: boolean;
  frontImage?: string | null;
  backImage?: string | null;
  imageFit?: "cover" | "contain";
  lanyardImage?: string | null;
  lanyardWidth?: number;
  modelPath?: string;
  anchorPosition?: [number, number, number];
  cardScale?: number;
}



function Band({
  maxSpeed = 50,
  minSpeed = 0,
  isMobile = false,
  frontImage = "/lanyard/metek-card-black.png",
  backImage = "/lanyard/metek-card-black.png",
  imageFit = "contain",
  lanyardImage = "/lanyard/metek-lanyard.png",
  lanyardWidth = 1.25,
  modelPath = "/lanyard/card.glb",
  anchorPosition,
  cardScale,
}: BandProps) {
  const { width, height } = useThree((state) => state.viewport);

  // Responsive scale: compact, sleek card badge
  const scale = cardScale || (isMobile ? 1.3 : 1.55);

  // Dynamically position the anchor in the top-right corner of the visible 3D viewport
  const anchor = useMemo<[number, number, number]>(() => {
    if (anchorPosition) return anchorPosition;
    const rightX = isMobile
      ? Math.min(width * 0.28, width / 2 - 0.5)
      : Math.min(width * 0.32, width / 2 - 1.2);
    const topY = height / 2 + 0.35;
    return [rightX, topY, 0];
  }, [anchorPosition, width, height, isMobile]);

  const band = useRef<THREE.Mesh>(null!);
  const fixed = useRef<RapierRigidBody>(null!);
  const j1 = useRef<RapierRigidBody & { lerped?: THREE.Vector3 }>(null!);
  const j2 = useRef<RapierRigidBody & { lerped?: THREE.Vector3 }>(null!);
  const j3 = useRef<RapierRigidBody & { lerped?: THREE.Vector3 }>(null!);
  const card = useRef<RapierRigidBody>(null!);

  const vec = useRef(new THREE.Vector3()).current;
  const ang = useRef(new THREE.Vector3()).current;
  const rot = useRef(new THREE.Vector3()).current;
  const dir = useRef(new THREE.Vector3()).current;

  const segmentProps = {
    type: "dynamic" as const,
    canSleep: true,
    colliders: false as const,
    angularDamping: 4,
    linearDamping: 4,
  };

  const gltf = useGLTF(modelPath) as unknown as GLTFResult;
  const nodes = gltf.nodes;
  const materials = gltf.materials;

  const texture = useTexture(
    lanyardImage || "/lanyard/metek-lanyard.png",
    (loadedTex) => {
      if (loadedTex instanceof THREE.Texture) {
        loadedTex.anisotropy = 16;
        loadedTex.generateMipmaps = true;
        loadedTex.minFilter = THREE.LinearMipmapLinearFilter;
        loadedTex.magFilter = THREE.LinearFilter;
        loadedTex.wrapS = THREE.RepeatWrapping;
        loadedTex.wrapT = THREE.RepeatWrapping;
        loadedTex.needsUpdate = true;
      }
    }
  );
  const frontTex = useTexture(frontImage || BLANK_PIXEL);
  const backTex = useTexture(backImage || BLANK_PIXEL);

  // Composite custom images into the card's texture atlas
  const cardMap = useMemo(() => {
    const baseMap = materials.base?.map;
    if (!baseMap) return null;
    if (!frontImage && !backImage) return baseMap;

    const baseImg = (baseMap as unknown as { image?: CanvasImageSource & { width?: number; height?: number } })?.image;
    const W = typeof baseImg?.width === "number" ? baseImg.width : 2048;
    const H = typeof baseImg?.height === "number" ? baseImg.height : 2048;
    const canvas = document.createElement("canvas");
    canvas.width = W;
    canvas.height = H;
    const ctx = canvas.getContext("2d");
    if (!ctx) return baseMap;

    // Base atlas for metal edges & untouched faces
    if (baseImg) {
      try {
        ctx.drawImage(baseImg, 0, 0, W, H);
      } catch {
        // fallback
      }
    }

    const drawFitted = (
      img: CanvasImageSource & { width: number; height: number },
      rect: { x: number; y: number; w: number; h: number }
    ) => {
      if (!img || !img.width || !img.height) return;
      const rx = rect.x * W;
      const ry = rect.y * H;
      const rw = rect.w * W;
      const rh = rect.h * H;

      // Pure deep glossy black background for the card face
      ctx.fillStyle = "#090a0d";
      ctx.fillRect(rx, ry, rw, rh);

      const pick = imageFit === "contain" ? Math.min : Math.max;
      const scaleFactor = pick(rw / img.width, rh / img.height);
      const dw = img.width * scaleFactor;
      const dh = img.height * scaleFactor;
      const dx = rx + (rw - dw) / 2;
      const dy = ry + (rh - dh) / 2;

      ctx.save();
      ctx.beginPath();
      ctx.rect(rx, ry, rw, rh);
      ctx.clip();
      ctx.drawImage(img, dx, dy, dw, dh);
      ctx.restore();
    };

    const frontImg = (frontTex as unknown as { image?: CanvasImageSource & { width: number; height: number } })?.image;
    const backImg = (backTex as unknown as { image?: CanvasImageSource & { width: number; height: number } })?.image;

    if (frontImage && frontImg) {
      drawFitted(frontImg, FRONT_UV_RECT);
    }
    if (backImage && backImg) {
      drawFitted(backImg, BACK_UV_RECT);
    }

    const composite = new THREE.CanvasTexture(canvas);
    composite.colorSpace = THREE.SRGBColorSpace;
    composite.flipY = baseMap.flipY;
    composite.anisotropy = 16;
    composite.generateMipmaps = true;
    composite.minFilter = THREE.LinearMipmapLinearFilter;
    composite.magFilter = THREE.LinearFilter;
    composite.needsUpdate = true;
    return composite;
  }, [frontImage, backImage, imageFit, frontTex, backTex, materials.base?.map]);

  const [curve] = useState(() => {
    const c = new THREE.CatmullRomCurve3([
      new THREE.Vector3(),
      new THREE.Vector3(),
      new THREE.Vector3(),
      new THREE.Vector3(),
    ]);
    c.curveType = "chordal";
    return c;
  });

  const [dragged, drag] = useState<THREE.Vector3 | false>(false);
  const [hovered, hover] = useState(false);

  useRopeJoint(fixed, j1, [[0, 0, 0], [0, 0, 0], 1]);
  useRopeJoint(j1, j2, [[0, 0, 0], [0, 0, 0], 1]);
  useRopeJoint(j2, j3, [[0, 0, 0], [0, 0, 0], 1]);
  useSphericalJoint(j3, card, [
    [0, 0, 0],
    [0, 0.65 * scale, 0],
  ]);

  useEffect(() => {
    if (hovered) {
      document.body.style.cursor = dragged ? "grabbing" : "grab";
      return () => {
        document.body.style.cursor = "auto";
      };
    }
  }, [hovered, dragged]);

  useFrame((state, delta) => {
    if (dragged && card.current) {
      vec.set(state.pointer.x, state.pointer.y, 0.5).unproject(state.camera);
      dir.copy(vec).sub(state.camera.position).normalize();
      vec.add(dir.multiplyScalar(state.camera.position.length()));
      [card, j1, j2, j3, fixed].forEach((ref) => ref.current?.wakeUp());
      card.current.setNextKinematicTranslation({
        x: vec.x - dragged.x,
        y: vec.y - dragged.y,
        z: vec.z - dragged.z,
      });
    }

    if (fixed.current && card.current && band.current) {
      [j1, j2].forEach((ref) => {
        if (!ref.current) return;
        if (!ref.current.lerped) {
          ref.current.lerped = new THREE.Vector3().copy(
            ref.current.translation()
          );
        }
        const currentPos = ref.current.translation();
        const clampedDistance = Math.max(
          0.1,
          Math.min(1, ref.current.lerped.distanceTo(currentPos))
        );
        ref.current.lerped.lerp(
          currentPos,
          delta * (minSpeed + clampedDistance * (maxSpeed - minSpeed))
        );
      });

      if (j3.current && j2.current?.lerped && j1.current?.lerped) {
        curve.points[0].copy(j3.current.translation());
        curve.points[1].copy(j2.current.lerped);
        curve.points[2].copy(j1.current.lerped);
        curve.points[3].copy(fixed.current.translation());
        (band.current.geometry as unknown as { setPoints: (pts: THREE.Vector3[]) => void }).setPoints(
          curve.getPoints(isMobile ? 16 : 32)
        );
      }

      ang.copy(card.current.angvel());
      rot.copy(card.current.rotation());
      card.current.setAngvel(
        { x: ang.x, y: ang.y - rot.y * 0.35, z: ang.z },
        true
      );
    }
  });

  return (
    <>
      <group position={anchor}>
        <RigidBody ref={fixed} {...segmentProps} type="fixed" />
        <RigidBody position={[0.1, -0.4, 0]} ref={j1} {...segmentProps}>
          <BallCollider args={[0.08]} />
        </RigidBody>
        <RigidBody position={[0.2, -0.8, 0]} ref={j2} {...segmentProps}>
          <BallCollider args={[0.08]} />
        </RigidBody>
        <RigidBody position={[0.2, -1.2, 0]} ref={j3} {...segmentProps}>
          <BallCollider args={[0.08]} />
        </RigidBody>
        <RigidBody
          position={[0.2, -2.0, 0]}
          ref={card}
          {...segmentProps}
          type={dragged ? "kinematicPosition" : "dynamic"}
        >
          <CuboidCollider args={[0.36 * scale, 0.52 * scale, 0.01]} />
          <group
            scale={scale}
            position={[0, -0.54 * scale, -0.05]}
            onPointerOver={() => hover(true)}
            onPointerOut={() => hover(false)}
            onPointerUp={(e: ThreeEvent<PointerEvent>) => {
              (e.target as HTMLElement).releasePointerCapture(e.pointerId);
              drag(false);
            }}
            onPointerDown={(e: ThreeEvent<PointerEvent>) => {
              (e.target as HTMLElement).setPointerCapture(e.pointerId);
              if (card.current) {
                const currentPos = card.current.translation();
                drag(
                  new THREE.Vector3().copy(e.point).sub(vec.copy(currentPos))
                );
              }
            }}
          >
            {/* Pure Glossy Obsidian Black Card */}
            <mesh geometry={nodes.card?.geometry}>
              <meshPhysicalMaterial
                map={cardMap || materials.base?.map}
                map-anisotropy={16}
                color="#ffffff"
                clearcoat={1.0}
                clearcoatRoughness={0.04}
                roughness={0.08}
                metalness={0.15}
                reflectivity={0.8}
                specularIntensity={1.8}
                specularColor="#ffffff"
                envMapIntensity={1.0}
              />
            </mesh>
            {/* Chrome Metal Hardware */}
            <mesh
              geometry={nodes.clip?.geometry}
              material={materials.metal}
              material-roughness={0.08}
              material-metalness={0.95}
            />
            <mesh
              geometry={nodes.clamp?.geometry}
              material={materials.metal}
              material-roughness={0.08}
              material-metalness={0.95}
            />
          </group>
        </RigidBody>
      </group>
      <mesh ref={band}>
        <meshLineGeometry />
        <meshLineMaterial
          color="white"
          depthTest={false}
          resolution={isMobile ? [1000, 2000] : [1000, 1000]}
          useMap={1}
          map={texture}
          repeat={[-3.5, 1]}
          lineWidth={lanyardWidth}
        />
      </mesh>
    </>
  );
}

useGLTF.preload("/lanyard/card.glb");
