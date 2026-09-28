#!/usr/bin/env python3
"""MD2 ss2 + GoY ss2 article images: remove watermark, resize to 1408x704."""
from PIL import Image, ImageDraw, ImageFilter, ImageOps
import os

DATE = "20260928"
IMG_DIR = "/Users/Zhuanz/WorkBuddy/GameMetaHub/gaming-hotwords/website/public/images/games"
SRC_DIR = "/Users/Zhuanz/WorkBuddy/GameMetaHub/gaming-hotwords/website/tmp-img"
JOBS = [
    (f"{SRC_DIR}/Wide_cinematic_game_guide_bann_2026-09-28T04-04-19.png",
     f"{IMG_DIR}/minecraft-dungeons-2-ss2-v{DATE}.jpg"),
    (f"{SRC_DIR}/Wide_cinematic_banner_for_a_sa_2026-09-28T04-04-37.png",
     f"{IMG_DIR}/ghost-of-yotei-ss2-v{DATE}.jpg"),
]


def find_bbox(img):
    """Find bright watermark bbox by scanning bottom-right 220x100 region."""
    w, h = img.size
    region = img.convert("L").crop((w - 220, h - 100, w, h))
    rw, rh = region.size
    px = region.load()
    vals = sorted(region.getdata())
    median = vals[len(vals) // 2]
    xs, ys = [], []
    for y in range(0, rh, 2):
        for x in range(0, rw, 2):
            if px[x, y] > min(median + 55, 235):
                xs.append(x)
                ys.append(y)
    if not xs:
        return None
    x0, x1, y0, y1 = min(xs), max(xs), min(ys), max(ys)
    return (w - 220 + x0, h - 100 + y0, w - 220 + x1, h - 100 + y1)


def remove_watermark(img, bbox):
    """Clone-fill the watermark bbox with mirrored left texture + feather."""
    w, h = img.size
    x0, y0, x1, y1 = bbox
    margin = 20
    left = max(0, x0 - margin)
    top = max(0, y0 - margin)
    right = min(w, x1 + margin)
    bottom = min(h, y1 + margin)
    wm_w, wm_h = right - left, bottom - top

    src_left = left - wm_w
    if src_left < 0:
        texture = img.crop((left, top - wm_h, right, top))
        texture = ImageOps.mirror(texture)
    else:
        texture = img.crop((src_left, top, src_left + wm_w, bottom))
        texture = ImageOps.mirror(texture)
    texture = texture.filter(ImageFilter.GaussianBlur(radius=2.5))

    mask = Image.new("L", (wm_w, wm_h), 255)
    draw = ImageDraw.Draw(mask)
    feather = 20
    for i in range(feather):
        a = int(255 * ((i + 1) / feather))
        draw.line([(i, 0), (i, wm_h)], fill=a, width=1)
        draw.line([(0, i), (wm_w, i)], fill=a, width=1)

    img.paste(texture, (left, top), mask)
    return img


def main():
    for src, dst in JOBS:
        img = Image.open(src).convert("RGBA")
        bbox = find_bbox(img)
        if not bbox:
            print(f"{os.path.basename(src)}: no watermark detected; saving as-is")
            out = img
        else:
            print(f"{os.path.basename(src)}: watermark bbox {bbox}")
            out = remove_watermark(img, bbox)

        out = out.convert("RGB").resize((1408, 704), Image.LANCZOS)
        os.makedirs(IMG_DIR, exist_ok=True)
        out.save(dst, "JPEG", quality=80, optimize=True, progressive=True)
        print(f"-> {dst} ({os.path.getsize(dst)} bytes)")


if __name__ == "__main__":
    main()
