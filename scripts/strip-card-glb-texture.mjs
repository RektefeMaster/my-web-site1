/**
 * card.glb'nin ÖLÜ gömülü dokusunu söker.
 *
 * NEDEN: Kaynak model ReactBits demo kartı — içine 1678×1677 RGBA PNG
 * gömülü (2.19MB), dosyanın 2.34MB'ının %94'ü. Bu doku EKRANA HİÇ ÇIKMIYOR:
 *
 *   - `card` mesh'i (material "base", dokulu olan) UV'de yalnızca
 *     V ∈ [0.0022, 0.7572] aralığını örnekliyor (ölçüldü).
 *   - Lanyard.tsx'teki `cardMap` composite'i atlası kendi canvas'ına çizip
 *     ÜSTÜNE FRONT_UV_RECT (x 0→0.5, y 0→0.755) ve BACK_UV_RECT
 *     (x 0.5→1, y 0→0.757) dikdörtgenlerini `#090a0d` dolgu + METEK kart
 *     görseliyle basıyor. İki dikdörtgen birlikte x[0,1] × y[0,0.757]'yi
 *     kaplıyor — yani kartın örneklediği HER texel yeniden boyanıyor.
 *   - `clip` ve `clamp` mesh'leri material "metal" kullanıyor; onun dokusu
 *     yok, yalnızca baseColorFactor.
 *
 * Bu yüzden gömülü PNG, aynı ÖLÇÜLERDE düz `#090a0d` bir PNG ile
 * değiştiriliyor. Ölçü korunuyor çünkü composite canvas'ın boyutu
 * `baseMap.image.width/height`'tan geliyor (Lanyard.tsx) — küçültmek kart
 * yüzünün çözünürlüğünü düşürürdü. Renk `drawFitted`'ın kart yüzüne bastığı
 * dolgunun aynısı, böylece kartın uç kenarındaki ~0.4 piksellik taşma bandı
 * (sağ yarıda maxV 0.757248 > 0.757) da kart rengiyle birebir eşleşiyor —
 * eskiden orada ReactBits'in beyaz kâğıt dokusu vardı.
 *
 * Çalıştır: node scripts/strip-card-glb-texture.mjs
 */
import { readFileSync, writeFileSync } from "node:fs";
import { deflateSync } from "node:zlib";

const GLB = "public/lanyard/card.glb";
/** Lanyard.tsx `drawFitted` kart yüzü dolgusu ile birebir aynı. */
const FILL = [0x09, 0x0a, 0x0d, 0xff];

const crcTable = (() => {
  const t = new Uint32Array(256);
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    t[n] = c >>> 0;
  }
  return t;
})();

function crc32(buf) {
  let c = 0xffffffff;
  for (let i = 0; i < buf.length; i++) c = crcTable[(c ^ buf[i]) & 0xff] ^ (c >>> 8);
  return (c ^ 0xffffffff) >>> 0;
}

function chunk(type, data) {
  const len = Buffer.alloc(4);
  len.writeUInt32BE(data.length);
  const body = Buffer.concat([Buffer.from(type, "ascii"), data]);
  const crc = Buffer.alloc(4);
  crc.writeUInt32BE(crc32(body));
  return Buffer.concat([len, body, crc]);
}

/** Düz renkli RGBA PNG — colortype 6, bitdepth 8 (orijinalle aynı format). */
function solidPng(w, h, [r, g, b, a]) {
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(w, 0);
  ihdr.writeUInt32BE(h, 4);
  ihdr[8] = 8; // bit depth
  ihdr[9] = 6; // RGBA
  const row = Buffer.alloc(1 + w * 4);
  for (let x = 0; x < w; x++) {
    row[1 + x * 4] = r;
    row[2 + x * 4] = g;
    row[3 + x * 4] = b;
    row[4 + x * 4] = a;
  }
  const raw = Buffer.concat(Array.from({ length: h }, () => row));
  return Buffer.concat([
    Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
    chunk("IHDR", ihdr),
    chunk("IDAT", deflateSync(raw, { level: 9 })),
    chunk("IEND", Buffer.alloc(0)),
  ]);
}

const src = readFileSync(GLB);
const total = src.readUInt32LE(8);

// --- GLB chunk'larını ayrıştır -------------------------------------------
let off = 12;
let json = null;
let bin = null;
while (off < total) {
  const len = src.readUInt32LE(off);
  const type = src.toString("ascii", off + 4, off + 8);
  const data = src.subarray(off + 8, off + 8 + len);
  if (type === "JSON") json = JSON.parse(data.toString("utf8"));
  else if (type.startsWith("BIN")) bin = data;
  off += 8 + len;
}
if (!json || !bin) throw new Error("GLB chunk'ları okunamadı");

const image = json.images?.[0];
if (!image || image.bufferView === undefined) throw new Error("gömülü görsel yok");

// PNG başlığından gerçek ölçüyü oku — composite canvas ölçüsü buna bağlı.
const oldView = json.bufferViews[image.bufferView];
const oldPng = bin.subarray(
  oldView.byteOffset ?? 0,
  (oldView.byteOffset ?? 0) + oldView.byteLength
);
const w = oldPng.readUInt32BE(16);
const h = oldPng.readUInt32BE(20);

const newPng = solidPng(w, h, FILL);

// --- BIN'i yeniden kur: her bufferView 4 bayta hizalı -------------------
const parts = [];
let cursor = 0;
json.bufferViews.forEach((view, index) => {
  const data =
    index === image.bufferView
      ? newPng
      : bin.subarray(view.byteOffset ?? 0, (view.byteOffset ?? 0) + view.byteLength);
  const pad = (4 - (cursor % 4)) % 4;
  if (pad) {
    parts.push(Buffer.alloc(pad));
    cursor += pad;
  }
  view.byteOffset = cursor;
  view.byteLength = data.length;
  parts.push(data);
  cursor += data.length;
});
let newBin = Buffer.concat(parts);
if (newBin.length % 4) newBin = Buffer.concat([newBin, Buffer.alloc(4 - (newBin.length % 4))]);
json.buffers[0].byteLength = newBin.length;

// --- GLB'yi yaz: JSON boşlukla, BIN sıfırla hizalanır --------------------
let jsonBuf = Buffer.from(JSON.stringify(json), "utf8");
if (jsonBuf.length % 4) {
  jsonBuf = Buffer.concat([jsonBuf, Buffer.alloc(4 - (jsonBuf.length % 4), 0x20)]);
}
const header = Buffer.alloc(12);
header.writeUInt32LE(0x46546c67, 0); // "glTF"
header.writeUInt32LE(2, 4);
header.writeUInt32LE(12 + 8 + jsonBuf.length + 8 + newBin.length, 8);

const jsonHeader = Buffer.alloc(8);
jsonHeader.writeUInt32LE(jsonBuf.length, 0);
jsonHeader.write("JSON", 4, "ascii");
const binHeader = Buffer.alloc(8);
binHeader.writeUInt32LE(newBin.length, 0);
binHeader.write("BIN\0", 4, "ascii");

const out = Buffer.concat([header, jsonHeader, jsonBuf, binHeader, newBin]);
writeFileSync(GLB, out);

const mb = (n) => `${(n / 1024 / 1024).toFixed(2)}MB`;
console.log(`doku  ${w}×${h}  ${mb(oldPng.length)} → ${mb(newPng.length)}`);
console.log(`card.glb  ${mb(src.length)} → ${mb(out.length)}  (−${mb(src.length - out.length)})`);
