#!/usr/bin/env python3
"""Aniimo ss3 article image (mobile launch guide): 2:1 crop, watermark bbox probe, clone-fill, resize to 1408x704."""
from PIL import Image, ImageDraw, ImageFilter, ImageOps
import os
import sys

DATE = "20260923"
IMG_DIR = "/Users/Zhuanz/WorkBuddy/GameMetaHub/gaming-hotwords/website/public/images/games"
SRC = "/Users/Zhuanz/WorkBuddy/GameMetaHub/gaming-hotwords/website/generated-images/Vibrant_stylized_3D_game_scree_2026-09-23T07-05-42.png"
DST = f"{IMG_DIR}/aniimo-ss3-v{DATE}.jpg"


def ascii_brightness(img, box, step_x=4, step_y=2):
    crop = img.crop(box).convert("L")
    chars = " .:-=+*#%@"
    w, h = crop.size
    for y in range(0, h, step_y):
        row = ""
        for x in range(0, w, step_x):
            px = crop.getpixel((x, y))
            row += chars[min(px * len(chars) // 256, len(chars) - 1)]
        print(row)


def probe(img):
    w, h = img.size
    print(f"cropped size: {w}x{h}")
    print("--- bottom-right 200x120 brightness map ---")
    ascii_brightness(img, (w - 200, h - 120, w, h))


def find_bbox(img):
    w, h = img.size
    region = img.convert("L").crop((w - 220, h - 90, w, h))
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
    return (w - 220 + x0, h - 90 + y0, w - 220 + x1, h - 90 + y1)


def remove_watermark(img, bbox):
    w, h = img.size
    x0, y0, x1, y1 = bbox
    margin = 30
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
    texture = texture.filter(ImageFilter.GaussianBlur(radius=3))

    mask = Image.new("L", (wm_w, wm_h), 255)
    draw = ImageDraw.Draw(mask)
    feather = 30
    for i in range(feather):
        a = int(255 * ((i + 1) / feather))
        draw.line([(i, 0), (i, wm_h)], fill=a, width=1)
        draw.line([(0, i), (wm_w, i)], fill=a, width=1)

    img.paste(texture, (left, top), mask)
    return img


def main():
    if not os.path.exists(SRC):
        print(f"missing source: {SRC}")
        return 1
    img = Image.open(SRC).convert("RGB")
    print(f"source size: {img.size}")

    # Center-crop to 2:1, biased slightly upward to keep subject + horizon
    w, h = img.size
    target_h = w // 2
    top = max(0, (h - target_h) // 2 - int(h * 0.06))
    img = img.crop((0, top, w, top + target_h))

    probe(img)
    bbox = find_bbox(img)
    if not bbox:
        print("!! no watermark detected — saving as-is (verify visually!)")
        out = img
    else:
        print(f"watermark bbox: {bbox}")
        out = remove_watermark(img, bbox)

    out = out.resize((1408, 704), Image.LANCZOS)
    out.save(DST, "JPEG", quality=80, optimize=True, progressive=True)
    print(f"-> {DST} ({os.path.getsize(DST)} bytes)")
    return 0


if __name__ == "__main__":
    sys.exit(main())
