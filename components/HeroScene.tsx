"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  Environment,
  Lightformer,
  MeshTransmissionMaterial,
  PerformanceMonitor,
  useFBO,
} from "@react-three/drei";
import { HERO_FILM } from "@/lib/hero-media";

/**
 * Canvas şeffaf — zemin HeroFilm (DOM video). Env bake VoidEnvironment'ta.
 *
 * Sahnenin ışığı SİTE TEMASINDAN değil, filmden geliyor: hero her iki temada
 * da aynı siyah kadraj. Bu yüzden burada `dark` yok — malzeme ve env tek bir
 * "void" kurgusuna sabit. Kaynağın paleti: mutlak siyah gök, alttan menekşe-
 * mavi çiçek tarlası, ortada soluk chartreuse ışık havuzu, figürde soğuk beyaz.
 */
const VOID = {
  /** Tarlanın menekşe-mavisi — M'e ALTTAN vuran ana renk */
  field: "#5b62c8",
  /** Işık havuzunun soluk chartreuse sıçraması */
  bounce: "#c3cf8a",
  /** Figürün soğuk beyaz core'u / tepe ışığı */
  key: "#eaf2ff",
  /** Gökyüzü — dolgu değil, negatif alan */
  sky: "#04060a",
} as const;

/*
  Kilit ölçüleri. Yön başına ayrı: kadraj da yön başına ayrı master'dan
  geliyor (HeroFilm) ve figürün başı iki master'da farklı yükseklikte —
  yatayda ~%50, dikeyde ~%61. Ölçüldü: `lite` (pointer/genişlik) DEĞİL,
  yön belirleyici; craft.css'teki --hero-mark-y / --hero-word-y ile
  birlikte değişir.
*/
/** Bevel dahil M'in birim yüksekliği (shape -0.56..0.56 + bevel) */
const GEOMETRY_HEIGHT = 1.18;
/** M yüksekliği — hero yüksekliğinin oranı */
const MARK_HEIGHT = 0.26;
const MARK_HEIGHT_PORTRAIT = 0.2;
/** Dar/kare kadrajda taşma freni — hero genişliğinin oranı */
const MARK_MAX_WIDTH = 0.44;
/**
 * M'in DİNLENME merkezi — hero yüksekliğinin oranı, üstten.
 * Kelime markasının ÜSTÜNDE duruyor, çünkü yazı çıplak gözle görünmüyor:
 * marka ancak cam oradan geçerken okunuyor. Bu yüzden gezinme bandının
 * merkezi yazı bloğuyla çakışmalı. Daha yukarı alma — M navigasyona
 * yapışıp "hep en üstte" duruyor.
 */
const MARK_Y = 0.4;
const MARK_Y_PORTRAIT = 0.44;
/**
 * Gezinme sınırları (hero yüksekliğinin oranı, üstten) — M'in KENARI için,
 * merkezi için değil. Merkeze uygulanınca büyük M'in üstü nav'ın altına
 * giriyordu; sınırlar aşağıda yarım yükseklik kadar içeri çekiliyor.
 * Alan geniş ama serbest değil: üstte nav, altta figür.
 */
const MARK_LIMIT_TOP = 0.17;
const MARK_LIMIT_BOTTOM = 0.66;
/** Yatay sınır — hero genişliğinin merkezden oranı */
const MARK_LIMIT_X = 0.36;

/**
 * Glass/chrome M.
 * Live transmission buffer at capped resolution — no stale/black FBO race,
 * correct refraction while rotating, far cheaper than full-canvas samples.
 */
/** craft.css `.hero-film__media { object-position: 50% 16% }` ile aynı */
const FILM_FOCUS_Y = 0.16;

/**
 * Kelime markasını kırılma arkaplanına çizer.
 *
 * WebGL, DOM'u göremez: "METEK Digital" bir <h1> olduğu sürece cam onu
 * kıramaz, sadece üstünü örter. Bu yüzden yazının bir KOPYASI, DOM'daki
 * ile aynı yazı tipi/konum/punto ile kırılma arkaplanına çiziliyor —
 * M metnin üstünden geçerken harfler camın içinde kırılıyor.
 *
 * Ölçüler DOM'dan okunuyor (tek kaynak craft.css); burada ikinci bir
 * tipografi tanımı YOK, aksi halde ikisi ayrışır.
 */
function drawWordmark(ctx: CanvasRenderingContext2D, scale: number) {
  const hero = document.querySelector<HTMLElement>(".hero-section");
  const nodes = document.querySelectorAll<HTMLElement>(
    ".hero-wordmark__lead, .hero-wordmark__tail"
  );
  if (!hero || !nodes.length) return;

  /*
    Konum offsetLeft/offsetTop ile, getBoundingClientRect ile DEĞİL:
    giriş animasyonu (GSAP, y:16) bake anında hâlâ sürüyor olabiliyor ve
    rect o kaymayı içeriyor — kopya kalıcı olarak 16px kayık kalıyordu.
    offset* düzen tabanlı, transform'dan etkilenmiyor.
  */
  const offsetIn = (el: HTMLElement) => {
    let x = 0;
    let y = 0;
    let node: HTMLElement | null = el;
    while (node && node !== hero) {
      x += node.offsetLeft;
      y += node.offsetTop;
      node = node.offsetParent as HTMLElement | null;
    }
    return { x, y };
  };

  ctx.textBaseline = "alphabetic";
  ctx.fillStyle = "#eef1f4";

  nodes.forEach((el) => {
    const text = el.textContent;
    if (!text) return;
    const style = getComputedStyle(el);
    const box = offsetIn(el);
    const size = Number.parseFloat(style.fontSize) * scale;
    ctx.font = `${style.fontStyle} ${style.fontWeight} ${size}px ${style.fontFamily}`;
    // letterSpacing Chrome 99+/Safari 17.4+; yoksa harf aralığı sıfır kalır
    if ("letterSpacing" in ctx) {
      const px = Number.parseFloat(style.letterSpacing);
      ctx.letterSpacing = Number.isFinite(px) ? `${px * scale}px` : "0px";
    }
    /*
      Taban çizgisi: CSS satır kutusunda yarım-aralık (half-leading) ile
      yerleşiyor. Aynı formülü uygulamazsak kopya birkaç piksel kayıyor ve
      cam "yanlış yeri" kırıyor gibi duruyor.
    */
    const metrics = ctx.measureText(text);
    const asc = metrics.fontBoundingBoxAscent || size * 0.8;
    const desc = metrics.fontBoundingBoxDescent || size * 0.2;
    const boxH = el.offsetHeight * scale;
    const baseline = box.y * scale + (boxH - (asc + desc)) / 2 + asc;
    ctx.fillText(text, box.x * scale, baseline);
  });
}

/**
 * Cam M'in KIRDIĞI arkaplan — filmin ekrandaki kadrajıyla BİREBİR.
 *
 * Transmission sahnenin FBO'sunu örnekliyor; sahne boş olduğu için M
 * "kıracak bir şey bulamayıp" opak levhaya dönüyordu. Çözüm drei'nin
 * `background` kancası: transmission geçişinde sahne arkaplanına filmin
 * karesi konuyor.
 *
 * Posteri doğrudan vermek YETMİYOR: `scene.background` düz dokuyu ekrana
 * GERİYOR, yani cam ekranda arkasında olmayan bir yeri kırıyor ve M'in
 * yüzü yamalı bir renk lekesine dönüyordu. Bu yüzden poster önce
 * ekran en-boyuna, CSS'in cover + object-position matematiğiyle kırpılıyor;
 * cam gerçekten ARKASINDAKİNİ kırıyor.
 *
 * Film pratikte durağan (komşu kare RMSE 0.0015) — VideoTexture yerine tek
 * poster karesi yeterli, her karede GPU'ya doku yüklenmiyor. Dosya
 * HeroFilm'in posteriyle aynı (lib/hero-media): ikinci indirme değil.
 */
function useFilmBackdrop(portrait: boolean, aspect: number, lite: boolean) {
  const [texture, setTexture] = useState<THREE.Texture | null>(null);
  // Her piksellik resize'da yeniden çizme — en-boy basamağı yeterli
  const step = Math.round(aspect * 20) / 20;
  /*
    Bake genişliği cihaza göre. 1536 masaüstünde ekranın üstünde bir pay
    bırakıyor (cam kırarken büyütüyor). Telefonda ise fazlasıyla üstünde:
    393pt × DPR ~2 = ~790 aygıt pikseli, buna karşılık DİKEY kadrajda
    1536×3340'lık RGBA doku ≈ 20MB GPU belleği ve tek karede çok büyük bir
    yükleme. 1024 hâlâ aygıt genişliğinin ~1.3 katı — kırılan görüntüde gözle
    fark yok, bellek dörtte birine iniyor.
  */
  const bakeWidth = lite ? 1024 : 1536;

  useEffect(() => {
    let cancelled = false;
    let made: THREE.Texture | null = null;

    const img = new Image();
    img.decoding = "async";
    img.src = portrait
      ? HERO_FILM.posterPortrait
      : HERO_FILM.posterLandscape;

    const draw = () => {
      if (cancelled) return;
      // Kırılan görüntünün (film + kelime markası) çözünürlüğü
      const w = bakeWidth;
      const h = Math.max(1, Math.round(w / step));
      const canvas = document.createElement("canvas");
      canvas.width = w;
      canvas.height = h;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      // object-fit: cover + object-position 50% FILM_FOCUS_Y
      const cover = Math.max(w / img.width, h / img.height);
      const dw = img.width * cover;
      const dh = img.height * cover;
      ctx.fillStyle = "#04060a";
      ctx.fillRect(0, 0, w, h);
      ctx.drawImage(img, (w - dw) * 0.5, (h - dh) * FILM_FOCUS_Y, dw, dh);

      // Kelime markası da arkaplanın parçası — cam yazıyı kırabilsin
      const hero = document.querySelector(".hero-section");
      if (hero) drawWordmark(ctx, w / hero.getBoundingClientRect().width);

      made = new THREE.CanvasTexture(canvas);
      made.colorSpace = THREE.SRGBColorSpace;
      setTexture(made);
    };

    // Yazı tipi inmeden çizersek kopya yedek fontla kalıyor
    const start = () => void document.fonts.ready.then(draw);
    if (img.complete && img.naturalWidth) start();
    else img.addEventListener("load", start, { once: true });

    return () => {
      cancelled = true;
      img.removeEventListener("load", start);
      made?.dispose();
      setTexture(null);
    };
  }, [portrait, step, bakeWidth]);

  return texture;
}

/**
 * Filmden türetilen ORTAM HARİTASI — M'in yansıttığı çevre.
 *
 * "Arkasını yansıtsın" iki ayrı kanal:
 * · KIRILMA (transmission) → `useFilmBackdrop`, ekranla birebir hizalı.
 * · YANSIMA (env) → burası. Elle konumlanmış lightformer'lar sahnede
 *   olmayan renkleri yansıtıyordu (menekşe panel, camı mavi plastiğe
 *   çeviriyordu). Artık çevre filmin KENDİSİ: üstte mutlak siyah gök,
 *   ufukta figürün soğuk beyaz halesi, altta ışıyan tarla.
 *
 * Equirect düzeni: v=0 tepe (yukarı), v=0.5 ufuk, v=1 dip (aşağı). Tarla
 * yatayda 4 kez, dönüşümlü aynalanarak döşeniyor — dikiş yok, M dönerken
 * yansıma sürekli.
 */
function useFilmEnvironment(portrait: boolean) {
  const [texture, setTexture] = useState<THREE.Texture | null>(null);

  useEffect(() => {
    let cancelled = false;
    let made: THREE.Texture | null = null;

    const img = new Image();
    img.decoding = "async";
    img.src = portrait
      ? HERO_FILM.posterPortrait
      : HERO_FILM.posterLandscape;

    const draw = () => {
      if (cancelled) return;
      const w = 1024;
      const h = 512;
      const canvas = document.createElement("canvas");
      canvas.width = w;
      canvas.height = h;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      /*
        Gök MUTLAK siyah olamaz. Fiziksel olarak doğru olurdu — gece,
        yıldızsız — ama o zaman M'in ön/üst yüzleri hiçbir şey yansıtmıyor
        ve marka siyah bir delik oluyordu (ölçüldü: gövde zeminden koyu).
        Ufka doğru açılan çok koyu bir gradyan: gökyüzü hâlâ gece, ama
        kromun tutunacağı bir değer var.
      */
      const sky = ctx.createLinearGradient(0, 0, 0, h * 0.5);
      sky.addColorStop(0, "#070b14");
      sky.addColorStop(1, "#1b2434");
      ctx.fillStyle = sky;
      ctx.fillRect(0, 0, w, h);

      // Alt yarı: tarla. Kaynağın en parlak şeridi (alt %38) döşeniyor.
      const bandTop = img.height * 0.62;
      const bandH = img.height - bandTop;
      const tiles = 4;
      const tileW = w / tiles;
      for (let i = 0; i < tiles; i += 1) {
        ctx.save();
        // Dönüşümlü ayna: karo sınırında kesik oluşmuyor
        if (i % 2 === 1) {
          ctx.translate(i * tileW + tileW, 0);
          ctx.scale(-1, 1);
        } else {
          ctx.translate(i * tileW, 0);
        }
        ctx.drawImage(img, 0, bandTop, img.width, bandH, 0, h * 0.5, tileW, h * 0.5);
        ctx.restore();
      }

      // Ufuk halesi — figürün soğuk beyaz core'u, çevreye yayılmış
      const glow = ctx.createRadialGradient(
        w * 0.5,
        h * 0.5,
        0,
        w * 0.5,
        h * 0.5,
        w * 0.5
      );
      glow.addColorStop(0, "rgba(232,243,255,0.95)");
      glow.addColorStop(0.35, "rgba(140,168,215,0.35)");
      glow.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = glow;
      ctx.fillRect(0, 0, w, h);

      /*
        Tepe ışığı — filmde görünmüyor ama krom için ŞART: tek parlak
        kaynak olmadan cam kenarlarında spekülar doğmuyor ve M mat bir
        siluete düşüyor. Ay gibi tek ve yüksek: sahnenin gece dilini
        bozmadan dönen yüzlerde gezen bir parlama bırakıyor.
      */
      const moon = ctx.createRadialGradient(
        w * 0.3,
        h * 0.15,
        0,
        w * 0.3,
        h * 0.15,
        w * 0.17
      );
      moon.addColorStop(0, "rgba(255,255,255,1)");
      moon.addColorStop(0.3, "rgba(226,238,255,0.62)");
      moon.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = moon;
      ctx.fillRect(0, 0, w, h * 0.5);

      // Karşı kenar — ikinci, zayıf parlama; profil anında gövde ölmesin
      const rim = ctx.createRadialGradient(
        w * 0.82,
        h * 0.3,
        0,
        w * 0.82,
        h * 0.3,
        w * 0.14
      );
      rim.addColorStop(0, "rgba(186,206,240,0.55)");
      rim.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = rim;
      ctx.fillRect(0, 0, w, h * 0.5);

      made = new THREE.CanvasTexture(canvas);
      made.mapping = THREE.EquirectangularReflectionMapping;
      made.colorSpace = THREE.SRGBColorSpace;
      setTexture(made);
    };

    if (img.complete && img.naturalWidth) draw();
    else img.addEventListener("load", draw, { once: true });

    return () => {
      cancelled = true;
      img.removeEventListener("load", draw);
      made?.dispose();
      setTexture(null);
    };
  }, [portrait]);

  return texture;
}

function GlassM({
  reduced = false,
  lite = false,
}: {
  reduced?: boolean;
  lite?: boolean;
}) {
  const geometry = useMemo(() => {
    const shape = new THREE.Shape();
    shape.moveTo(-0.3, -0.56);
    shape.lineTo(-0.54, -0.56);
    shape.lineTo(-0.49, 0.34);
    shape.lineTo(-0.35, 0.56);
    shape.lineTo(-0.1, 0.56);
    shape.lineTo(0, -0.04);
    shape.lineTo(0.1, 0.56);
    shape.lineTo(0.35, 0.56);
    shape.lineTo(0.49, 0.34);
    shape.lineTo(0.54, -0.56);
    shape.lineTo(0.3, -0.56);
    shape.lineTo(0.28, 0.12);
    shape.quadraticCurveTo(0, -0.5, -0.28, 0.12);
    shape.lineTo(-0.3, -0.56);
    shape.closePath();

    /*
      M artık kilidin içinde daha KÜÇÜK basılıyor; aynı bütçeyle silüeti
      yükseltmek serbest. Kaba bevel/curve, dönüş sırasında kenarlarda
      kırıklık gösteriyordu.
    */
    const geo = new THREE.ExtrudeGeometry(shape, {
      /*
        KALIN gövde şart. M kendi ekseninde tam tur dönüyor; 0.32'lik
        levha 90°'de ince bir çizgiye düşüp marka birkaç saniye
        kayboluyordu. 0.6'da profil hâlâ ışığı toplayan bir krom blok —
        dönüş kesintiye uğramıyor. Yükseklik 1.12 olduğuna göre bu oran
        "dökme metal harf"; daha inceltme.
      */
      depth: lite ? 0.46 : 0.5,
      bevelEnabled: true,
      bevelThickness: lite ? 0.04 : 0.045,
      bevelSize: lite ? 0.03 : 0.034,
      bevelSegments: lite ? 3 : 4,
      curveSegments: lite ? 14 : 20,
      steps: 1,
    });
    geo.center();
    /*
      ExtrudeGeometry zaten non-indexed dönüyor. Koşulsuz toNonIndexed()
      hem "already non-indexed" uyarısı basıyor hem de tüm vertex buffer'ını
      boşuna kopyalıyordu (hero'nun kritik yolunda). Sadece gerekirse çevir.
    */
    const smooth = geo.index ? geo.toNonIndexed() : geo;
    smooth.computeVertexNormals();
    if (smooth !== geo) geo.dispose();
    return smooth;
  }, [lite]);

  useEffect(() => () => geometry.dispose(), [geometry]);

  const mesh = useRef<THREE.Mesh>(null);
  const intro = useRef(0);
  const phaseY = useRef(0);
  const phaseZ = useRef(0);
  const phaseFloat = useRef(0);
  const blitKey = useRef("");
  /*
    Selector şart: çıplak `useThree()` her karede clock/pointer ile
    re-render tetikler, MeshTransmissionMaterial her kare reconcile olur.
    viewport yalnız resize'da değişir.
  */
  const viewport = useThree((s) => s.viewport);
  const sizeW = useThree((s) => s.size.width);
  const sizeH = useThree((s) => s.size.height);
  const dpr = useThree((s) => s.viewport.dpr);
  /*
    Film durağan (poster). Transmission FBO'su mesh gizlenince yalnızca
    o posteri içeriyor — M'in dönüşü shader'da kırılıyor, tamponun
    her kare yeniden çizilmesine gerek yok. drei her karede 512×(h·dpr)
    sahne geçişi yapıyordu; lite'ta bir kez bake edip donduruyoruz.
    Masaüstü backside canlı kalsın diye orada drei'nin kendi FBO'su durur.
  */
  const frozenFbo = useFBO(lite ? 512 : 1, undefined, { depthBuffer: false });
  /*
    Kilit: M gökyüzünde, kelime markası altında, figür ikisinin altında.
    Mesh z=0 — viewport ölçüsü de z=0'da, yani ölçek/konum birebir yüzde
    olarak okunuyor (z=1'de 1.25x büyüyordu, kadrajla eşleşmiyordu).
    Bu oranların filmdeki karşılığı için bkz. HeroFilm/craft.css.
  */
  const portrait = viewport.width < viewport.height;
  const scale =
    Math.min(
      viewport.height * (portrait ? MARK_HEIGHT_PORTRAIT : MARK_HEIGHT),
      viewport.width * MARK_MAX_WIDTH
    ) / GEOMETRY_HEIGHT;
  const offsetY =
    viewport.height * (0.5 - (portrait ? MARK_Y_PORTRAIT : MARK_Y));
  const backdrop = useFilmBackdrop(portrait, viewport.aspect, lite);
  /* Serbest gezinme payı — M kelime markasının üstünden geçebilsin diye
     dikeyde kilitli değil (bkz. useFrame). */
  const driftX = viewport.width * (portrait ? 0.12 : 0.14);
  const driftY = viewport.height * (portrait ? 0.06 : 0.09);
  /*
    İmleç payı GENİŞ. Küçük tutulduğunda M "takip etmiyor" gibi duruyordu;
    gezinme alanı da kadrajın küçük bir köşesine sıkışıyordu. Toplam yol
    aşağıdaki MARK_LIMIT_* ile kırpılıyor, o yüzden burada cömert olmak
    güvenli.
  */
  const pointerX = lite ? 0 : viewport.width * 0.26;
  const pointerY = lite ? 0 : viewport.height * 0.18;
  /*
    Kırpma sınırları — dünya birimine çevrilmiş, M'in YARIM boyu kadar
    içeri çekilmiş hâli. Merkezi kırpmak yetmiyor: gövde büyüdükçe üst
    kenar nav'ın altına giriyor.
  */
  const halfH = (scale * GEOMETRY_HEIGHT) / 2;
  const halfW = halfH * 0.95;
  const limitTop = viewport.height * (0.5 - MARK_LIMIT_TOP) - halfH;
  const limitBottom = viewport.height * (0.5 - MARK_LIMIT_BOTTOM) + halfH;
  const limitX = Math.max(0, viewport.width * MARK_LIMIT_X - halfW);

  useFrame((state, delta) => {
    const parent = mesh.current;
    if (!parent) return;

    if (lite && backdrop) {
      const key = `${backdrop.uuid}:${sizeW}x${sizeH}@${dpr.toFixed(2)}`;
      if (blitKey.current !== key) {
        const { gl, scene, camera } = state;
        const oldVis = parent.visible;
        const oldBg = scene.background;
        const oldTone = gl.toneMapping;
        parent.visible = false;
        gl.toneMapping = THREE.NoToneMapping;
        scene.background = backdrop;
        gl.setRenderTarget(frozenFbo);
        gl.render(scene, camera);
        parent.visible = oldVis;
        scene.background = oldBg;
        gl.setRenderTarget(null);
        gl.toneMapping = oldTone;
        blitKey.current = key;
      }
    }

    if (reduced) return;

    // Giriş — ilk ~1sn'de yumuşak ölçek + oturma
    if (intro.current < 1) {
      intro.current = Math.min(1, intro.current + delta * 1.15);
      const e = 1 - Math.pow(1 - intro.current, 3); // easeOutCubic
      parent.scale.setScalar(scale * (0.86 + 0.14 * e));
    }

    /*
      Kesintisiz dönüş — salınım değil. Hız düşük: profilden geçerken
      (90°/270°) ince kenar anı hızlıca geçsin diye ~16sn'de bir tam tur.
      Delta-bazlı faz — frameloop duraklayıp devam ederse sıçrama olmuyor.
    */
    phaseY.current += delta * (lite ? 0.34 : 0.4);
    phaseZ.current += delta * 0.26;
    phaseFloat.current += delta * 0.19;

    parent.rotation.y = phaseY.current;
    parent.rotation.z = Math.sin(phaseZ.current) * 0.06 - 0.04;

    /*
      Konum = serbest gezinme + imleç.
      · Gezinme: iki farklı periyotta Lissajous (oran irrasyonele yakın,
        desen tekrar etmiyor). Fare hiç kımıldamasa bile M kilidin
        etrafında dolaşıp arada kelime markasının ÜSTÜNDEN geçiyor —
        canvas z-katmanı metnin üstünde.
      · İmleç: lerp ile yumuşatılmış; ani sıçrama yok. lite'ta canvas
        pointer almıyor, orada yalnızca gezinme kalıyor.
    */
    const t = phaseFloat.current;
    const px = lite ? 0 : state.pointer.x;
    const py = lite ? 0 : state.pointer.y;
    parent.position.x = THREE.MathUtils.lerp(
      parent.position.x,
      THREE.MathUtils.clamp(
        Math.sin(t) * driftX + px * pointerX,
        -limitX,
        limitX
      ),
      0.07
    );
    parent.position.y = THREE.MathUtils.lerp(
      parent.position.y,
      THREE.MathUtils.clamp(
        Math.sin(t * 1.618 + 0.9) * driftY + py * pointerY,
        limitBottom - offsetY,
        limitTop - offsetY
      ),
      0.07
    );
    parent.rotation.x = THREE.MathUtils.lerp(
      parent.rotation.x,
      Math.sin(t * 0.83) * 0.14 + py * 0.35,
      0.08
    );
  });

  return (
    <group position={[0, offsetY, 0]}>
      <mesh
        ref={mesh}
        geometry={geometry}
        scale={scale}
        rotation={reduced || lite ? [0.08, -0.4, -0.06] : [0.05, -0.2, -0.05]}
        frustumCulled={false}
      >
        <MeshTransmissionMaterial
          /*
            ŞEFFAF CAM + KROM.
            · Lite: dondurulmuş FBO (`buffer`) — drei her kare sahneyi
              yeniden çizmıyor. Masaüstü: `background` + canlı FBO,
              backside için (iç cam) kare başı geçiş şart.
            · Kromu env yansıması + clearcoat veriyor, metalness DEĞİL:
              metal transmission'ı söndürüp camı öldürüyor.
          */
          buffer={lite ? frozenFbo.texture : undefined}
          background={lite ? undefined : (backdrop ?? undefined)}
          samples={lite ? 2 : 12}
          /*
            FBO üst sınır. Lite'ta drei'nin kendi hedefi 1px — asıl tampon
            `frozenFbo` (512). Masaüstü 1024. 640 altına inme (merdiven).
          */
          resolution={lite ? 1 : 1024}
          backside={!lite}
          backsideThickness={0.1}
          backsideResolution={lite ? 1 : 512}
          /*
            CAM + KROM dengesi. transmission=1 saf camdı: arkasında mutlak
            siyah gök olduğu için Fresnel dışında hiçbir şey yansıtmıyor ve
            marka siyah bir siluete düşüyordu (fizik doğru, marka görünmez).
            0.7'de gövde hâlâ arkasını gösteriyor; metalness ise kroma
            yansıtacak pay bırakıyor.
          */
          transmission={0.82}
          /*
            thickness DÜNYA BİRİMİNDE ve kırılmanın ne kadar uzağını
            örneklediğini belirliyor. M sahnede ~0.5 birim: 0.7 verince
            cam kendi boyundan uzağı, yani ekranın ta altındaki TARLAYI
            örnekliyor ve mavi bir levha gibi doluyordu. Nesnenin
            boyutuyla orantılı kalmalı — bu değeri ölçekten bağımsız
            büyütme.
          */
          thickness={lite ? 0.16 : 0.2}
          roughness={0.03}
          metalness={0.3}
          ior={1.66}
          // Prizma: kalın camda kenarlarda renk ayrışması
          chromaticAberration={lite ? 0.14 : 0.22}
          anisotropicBlur={lite ? 0.04 : 0.06}
          distortion={lite ? 0 : 0.06}
          distortionScale={0.25}
          temporalDistortion={0}
          clearcoat={1}
          clearcoatRoughness={0.03}
          /*
            Tint ÇOK hafif olmalı: attenuation doygun menekşede (#5b62c8,
            mesafe 2.2) cam mavi bir plastik bloğa dönüyordu. Renk artık
            kenarlara değen bir öpücük; gövde berrak kalıyor, "krom"u
            clearcoat + env yansıması veriyor.
          */
          attenuationColor="#aebbd2"
          attenuationDistance={6}
          color="#ffffff"
          /*
            YÜKSEK — ve olması gereken bu. Env artık elle konmuş
            Lightformer'lar (intensity 5-7, yani HDR) değil, LDR bir canvas:
            en parlak pikseli 1.0. Aynı spekülar gücü için çarpan buradan
            geliyor. Gök zaten ~0.04 olduğu için gövde kararmıyor, sadece
            ay/ufuk yansımaları krom gibi patlıyor.
          */
          envMapIntensity={9}
        />
      </mesh>
    </group>
  );
}

/**
 * Env bake — filmin ışık kurgusu.
 *
 * Kaynakta tek ışık kaynağı var: ALTTAKİ tarla. Gökyüzü karanlık, figür de
 * aşağıdan aydınlanıyor. M de aynı kurala uyuyor — yoksa sahnenin içinden
 * değil, üstünden yapıştırılmış gibi duruyor:
 * · alttan geniş menekşe-mavi (tarla) — ana kaynak
 * · alt-merkezden soluk chartreuse (ışık havuzu) — sıcak sıçrama
 * · arkadan dar soğuk beyaz (figürün core'u) — kenar çizgisi
 * · üstten çok zayıf beyaz — tepe kenarı ölmesin
 * Yanlar/ön koyu bırakıldı: kontrast siyah gökten geliyor.
 */
/** Filmden türetilen env; hazır olana kadar elle kurulmuş yedek. */
function FilmEnvironment() {
  const portrait = useThree((s) => s.viewport.width < s.viewport.height);
  const map = useFilmEnvironment(portrait);
  return map ? <Environment map={map} /> : <VoidEnvironment />;
}

function VoidEnvironment() {
  return (
    // frames={1} → tek sefer bake; sürekli maliyet yok
    <Environment resolution={256} frames={1}>
      {/* Tarla — alttan geniş menekşe-mavi yıkama, sahnenin ana kaynağı */}
      <Lightformer
        intensity={4.5}
        position={[0, -3, 1.6]}
        rotation-x={-Math.PI / 2}
        scale={[12, 12, 1]}
        color={VOID.field}
      />
      {/* Işık havuzu — alt-merkez, soluk chartreuse sıçrama */}
      <Lightformer
        intensity={3}
        position={[0.6, -2.2, 2.6]}
        rotation-x={-Math.PI / 3}
        scale={[5, 4, 1]}
        color={VOID.bounce}
      />
      {/* Ay ışığı — ön-üst-sol; filmde figürün ön yüzünü açan ışık */}
      <Lightformer
        intensity={5}
        position={[-2.6, 2.4, 3.4]}
        rotation-y={Math.PI / 5}
        scale={[6, 6, 1]}
        color={VOID.key}
      />
      {/*
        Arka panel İKİYE bölündü. M'in ön yüzü metalik, yani kameranın AYNA
        yönünü (arka tarafı) gösteriyor: tek renk panel koyunca yüz düz bir
        levha gibi çıkıyordu. Solda soğuk beyaz (figür), sağda menekşe
        (tarla) — yüzde filmin iki rengi arasında geçiş oluyor.
      */}
      <Lightformer
        intensity={2.8}
        position={[-2.4, 0.2, -4]}
        scale={[7, 9, 1]}
        color="#dfeaf7"
      />
      <Lightformer
        intensity={1.6}
        position={[2.6, -0.4, -4]}
        scale={[7, 9, 1]}
        color="#7d86c0"
      />
      {/* Figürün core'u — arkada dar ve parlak: yüzde gezen sıcak nokta */}
      <Lightformer
        intensity={6}
        position={[-0.7, 0.6, -3]}
        scale={[1.8, 3.4, 1]}
        color={VOID.key}
      />
      {/* Tepe kenarı — üst bevel'i tanımlar */}
      <Lightformer
        intensity={2.4}
        position={[-1.2, 3.6, 0.6]}
        rotation-x={Math.PI / 2}
        scale={[7, 7, 1]}
        color={VOID.key}
      />
      {/*
        Sağ yan negatif alan — siyah ayna; hepsi ışık olursa M "sütlü"
        oluyor. Dar tutuldu: M profilden geçerken yan yüzü tam bu yöne
        bakıyor, geniş siyah panel markayı orada söndürüyordu.
      */}
      <Lightformer
        intensity={1}
        position={[3.2, 0.6, 1.4]}
        rotation-y={-Math.PI / 3}
        scale={[1.6, 4, 1]}
        color={VOID.sky}
      />
      {/* Yan aydınlatma — profil anında gövdeyi tutan soğuk mavi */}
      <Lightformer
        intensity={2}
        position={[-3.4, 0.2, 0.4]}
        rotation-y={Math.PI / 2.4}
        scale={[4, 5, 1]}
        color={VOID.field}
      />
    </Environment>
  );
}

/**
 * Mobil/lite: 60fps + keskinlik. Transmission FBO lite'ta dondurulduğu için
 * kare başı maliyet tek mesh geçişi; 30fps kilidine gerek yok. DPR 1.5–1.75
 * — eski 1.2 tabanı bulanıklık yapıyordu; PerformanceMonitor bu aralıkta
 * oynatır. Boştaki maliyet idle frameloop / scoped pointer / lazy chunk.
 */
const LITE_DPR_CAP = 1.75;
/*
  Masaüstü tavanı 1.5 → 2. M kilidin içinde küçüldü; 1.5'te dönerken
  kenarlar merdivenleniyordu (ölçüldü: 140px'lik markada belirgin).
  Sahne tek mesh — asıl maliyet transmission FBO'su, DPR değil.
  PerformanceMonitor fps 50'nin altına düşerse zaten geri indirir.
*/
const DESKTOP_DPR_CAP = 2;
/** Mobil DPR tabanı — 1.5: keskin cam, 60fps dostu */
const LITE_DPR_FLOOR = 1.5;

export default function HeroScene({
  active,
}: {
  active: boolean;
}) {
  const [ready, setReady] = useState(false);
  const [contextKey, setContextKey] = useState(0);
  const mountedRef = useRef(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const glRef = useRef<THREE.WebGLRenderer | null>(null);
  const invalidateRef = useRef<(() => void) | null>(null);
  const readyRef = useRef(false);
  const recoverTimer = useRef(0);
  const [lite, setLite] = useState(
    () =>
      window.matchMedia("(pointer: coarse)").matches ||
      window.matchMedia("(max-width: 768px)").matches
  );
  const [dpr, setDpr] = useState(() =>
    Math.min(lite ? LITE_DPR_CAP : DESKTOP_DPR_CAP, window.devicePixelRatio)
  );
  const [reduced, setReduced] = useState(
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
  const [tabVisible, setTabVisible] = useState(true);
  /** Intro perdesi açıkken sürekli loop yerine ısıt-sonra-dur */
  const [introCovering, setIntroCovering] = useState(
    () => document.documentElement.dataset.intro === "play"
  );
  const [baked, setBaked] = useState(false);
  /**
   * Mount sonrası kısa süre frameloop always — soft-nav'da scroll settle /
   * IntersectionObserver gecikmesi Text+cam'i "never"da boş bırakmasın.
   */
  const [bootLive, setBootLive] = useState(true);
  /*
    Eskiden masaüstünde pointer 1.8sn kımıldamazsa frameloop "demand"a
    düşüyordu (son kare donardı). M artık kesintisiz DÖNDÜĞÜ için o mod
    dönüşü kilitliyor — görünürken always, görüş dışında never.
    Boştaki maliyet görüş dışına çıkma + sekme gizlenmesiyle kesiliyor.
  */

  const remountCanvas = () => {
    if (!mountedRef.current) return;
    readyRef.current = false;
    setReady(false);
    setBaked(false);
    setBootLive(true);
    setContextKey((k) => k + 1);
  };

  useEffect(() => {
    mountedRef.current = true;
    window.__metekHeroReady = false;
    return () => {
      mountedRef.current = false;
      window.clearTimeout(recoverTimer.current);
      glRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (!introCovering) return;
    const onDone = () => setIntroCovering(false);
    window.addEventListener("metek:intro-done", onDone);
    return () => window.removeEventListener("metek:intro-done", onDone);
  }, [introCovering]);

  useEffect(() => {
    const coarseMq = window.matchMedia("(pointer: coarse)");
    const narrowMq = window.matchMedia("(max-width: 768px)");
    const reducedMq = window.matchMedia("(prefers-reduced-motion: reduce)");

    const syncLite = () => {
      const next = coarseMq.matches || narrowMq.matches;
      setLite((prev) => {
        if (prev === next) return prev;
        setDpr(
          Math.min(next ? LITE_DPR_CAP : DESKTOP_DPR_CAP, window.devicePixelRatio)
        );
        return next;
      });
    };
    const syncReduced = () => setReduced(reducedMq.matches);

    syncLite();
    syncReduced();
    coarseMq.addEventListener("change", syncLite);
    narrowMq.addEventListener("change", syncLite);
    reducedMq.addEventListener("change", syncReduced);
    return () => {
      coarseMq.removeEventListener("change", syncLite);
      narrowMq.removeEventListener("change", syncLite);
      reducedMq.removeEventListener("change", syncReduced);
    };
  }, []);

  useEffect(() => {
    const onVis = () => setTabVisible(document.visibilityState === "visible");
    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
  }, []);

  /*
    Tema gözlemcisi YOK. Hero'nun zemini artık her iki temada da aynı siyah
    film; M'in ışığı temadan değil filmden geliyor. Eskiden buradaki
    MutationObserver env'i yeniden bake ediyordu — artık gereksiz iş.
  */

  /**
   * Context lost → remount. Görünür olunca invalidate pump.
   * NOT: ready=false iken 500ms remount YOK — soft-nav'da çift init (2–3sn boşluk)
   * yaratıyordu; onCreated zaten ready'yi set eder.
   */
  useEffect(() => {
    if (!tabVisible) return;

    const gl = glRef.current;
    const lost = Boolean(gl?.getContext()?.isContextLost?.());
    if (lost) {
      window.clearTimeout(recoverTimer.current);
      recoverTimer.current = window.setTimeout(remountCanvas, 60);
      return () => window.clearTimeout(recoverTimer.current);
    }

    if (!ready || (!active && !bootLive)) return;

    let frames = 0;
    let raf = 0;
    const pump = () => {
      frames += 1;
      invalidateRef.current?.();
      if (frames < 14) raf = requestAnimationFrame(pump);
    };
    raf = requestAnimationFrame(pump);
    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(recoverTimer.current);
    };
  }, [active, tabVisible, ready, contextKey, bootLive]);

  const visible = active && tabVisible && !reduced;
  // Intro altında: birkaç frame ısıt, sonra demand (GPU boş). Perde kalkınca always.
  // bootLive: soft-nav settle sırasında IO false verse bile çiz — boş header olmasın.
  const running = visible && !introCovering;
  const warming =
    (visible && introCovering && !baked) ||
    (bootLive && tabVisible && !reduced && !introCovering);
  const live = running || warming || bootLive;

  // Boot liveliness süresi — bake + font sonrası IO'ya bırak
  useEffect(() => {
    if (!bootLive || !baked) return;
    const t = window.setTimeout(() => {
      if (mountedRef.current) setBootLive(false);
    }, 400);
    return () => window.clearTimeout(t);
  }, [bootLive, baked]);

  // bfcache (geri/ileri) — WebGL sıkça ölü gelir; remount şart
  useEffect(() => {
    const onPageShow = (e: PageTransitionEvent) => {
      if (e.persisted) remountCanvas();
    };
    window.addEventListener("pageshow", onPageShow);
    return () => window.removeEventListener("pageshow", onPageShow);
  }, []);

  /*
    M kesintisiz döndüğü için görünürken tek doğru mod "always" (masaüstü
    ve telefon). "demand" dönüşü donduruyor. Boşta iş yapmamayı görünürlük
    sağlıyor: hero görüş dışına çıkınca (veya sekme gizlenince) "never".
    reduced-motion: dönüş zaten yok, tek kare yeter → "demand".
  */
  const frameloop = reduced ? "demand" : live ? "always" : "never";
  const dprCap = lite ? LITE_DPR_CAP : DESKTOP_DPR_CAP;
  const dprFloor = lite ? LITE_DPR_FLOOR : 1;
  /*
    Üst eşik 60 OLAMAZ: 60fps ≥ 60 → her 2.5sn incline → 4 flipflop sonra
    onFallback DPR'ı tabana kilitler (eski 30fps kilidinde [24,31] bu yüzden
    vardı). 70: 60Hz'de ne incline ne decline; 50'nin altında düşer.
  */
  const monitorBounds: [number, number] = [50, 70];

  return (
    /*
      Canvas kelime markasının ÜSTÜNDE (lockup z-[2]). Cam M yörüngesinde
      dolaşırken metnin üstünden geçebiliyor — arkasında kalsaydı yazının
      altında kaybolurdu. Tıklamayı engellememesi için pointer-events yok
      (sahnede etkileşim de kalmadı).
    */
    <div ref={containerRef} className="pointer-events-none absolute inset-0 z-[3]">
      {/*
        Tema değişiminde Canvas remount YOK — WebGL context kaybını önler.
        Yalnızca gerçek context loss / recovery’de contextKey artar.
      */}
      <Canvas
        key={contextKey}
        frameloop={frameloop}
        camera={{ position: [0, 0, 5], fov: lite ? 38 : 35 }}
        dpr={dpr}
        /*
          Fare takibi R3F'in `state.pointer`'ından geliyor; o da ancak
          canvas pointer olayı alırsa güncelleniyor. Bu yüzden masaüstünde
          pointer-events AÇIK (hero'da tıklanacak bir şey yok, sarmalayıcı
          zaten pointer-events-none). Lite'ta kapalı: dokunmatikte imleç
          diye bir şey yok, R3F olay sistemi boşuna uyanmasın.
        */
        style={lite ? { pointerEvents: "none" } : { pointerEvents: "auto" }}
        gl={{
          antialias: true,
          alpha: true,
          stencil: false,
          depth: true,
          powerPreference: "high-performance",
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.08,
        }}
        onCreated={({ gl, invalidate }) => {
          glRef.current = gl;
          invalidateRef.current = invalidate;
          const canvas = gl.domElement;
          const onLost = (e: Event) => {
            e.preventDefault();
            if (!mountedRef.current) return;
            readyRef.current = false;
            setReady(false);
            // contextrestored birçok tarayıcıda gelmiyor — kısa gecikmeyle remount
            window.clearTimeout(recoverTimer.current);
            recoverTimer.current = window.setTimeout(remountCanvas, 80);
          };
          const onRestored = () => {
            if (!mountedRef.current) return;
            window.clearTimeout(recoverTimer.current);
            remountCanvas();
          };
          canvas.addEventListener("webglcontextlost", onLost, false);
          canvas.addEventListener("webglcontextrestored", onRestored, false);

          gl.setClearColor(0x000000, 0);
          setBaked(false);
          readyRef.current = true;
          setReady(true);
          window.__metekHeroReady = true;
          window.dispatchEvent(new Event("metek:hero-ready"));
          // Transmission FBO için birkaç frame; sonra intro altında idle
          let frames = 0;
          const bake = () => {
            frames += 1;
            invalidate();
            if (frames < 12) {
              requestAnimationFrame(bake);
            } else if (mountedRef.current) {
              setBaked(true);
            }
          };
          requestAnimationFrame(bake);
        }}
      >
        <PerformanceMonitor
          flipflops={8}
          bounds={() => monitorBounds}
          onDecline={() =>
            setDpr((d) => Math.max(dprFloor, +(d - 0.15).toFixed(2)))
          }
          onIncline={() =>
            setDpr((d) =>
              Math.min(dprCap, +(d + 0.15).toFixed(2), window.devicePixelRatio)
            )
          }
        />
        <GlassM reduced={reduced} lite={lite} />
        <FilmEnvironment />
      </Canvas>
    </div>
  );
}
