"""Process Witcher 3 images: watermark removal + crop to 1408x704 + convert to JPG"""
import os, sys
from PIL import Image, ImageFilter

SRC_DIR = "/Users/Zhuanz/WorkBuddy/GameMetaHub/gaming-hotwords/website/generated-images"
OUT_DIR = "/Users/Zhuanz/WorkBuddy/GameMetaHub/gaming-hotwords/website/public/images/games"

MAPPINGS = [
    ("Dark_fantasy_open_world_game_k_2026-08-29T06-14-01.png", "witcher-3-header-v20260829.jpg"),
    ("Atmospheric_dark_fantasy_swamp_2026-08-29T06-14-25.png", "witcher-3-ss1-v20260829.jpg"),
]

TARGET_W, TARGET_H = 1408, 704

def remove_watermark(img):
    w, h = img.size
    wm_w, wm_h = 130, 45
    wm_left = w - wm_w
    wm_top = h - wm_h
    clone_region = img.crop((wm_left, wm_top - wm_h, wm_left + wm_w, wm_top))
    clone_region = clone_region.filter(ImageFilter.GaussianBlur(radius=2.5))
    mask = Image.new('L', (wm_w, wm_h), 255)
    pixels = mask.load()
    feather = 20
    for y in range(wm_h):
        for x in range(wm_w):
            dist_top = min(y, feather) / feather
            dist_left = min(x, feather) / feather
            dist_right = min(wm_w - 1 - x, feather) / feather
            dist_bottom = min(wm_h - 1 - y, feather) / feather
            pixels[x, y] = int(255 * min(dist_top, dist_left, dist_right, dist_bottom))
    img.paste(clone_region, (wm_left, wm_top), mask)
    return img

def center_crop(img, tw, th):
    w, h = img.size
    target_ratio = tw / th
    ratio = w / h
    if ratio > target_ratio:
        new_w = int(h * target_ratio)
        left = (w - new_w) // 2
        img = img.crop((left, 0, left + new_w, h))
    else:
        new_h = int(w / target_ratio)
        top = (h - new_h) // 2
        img = img.crop((0, top, w, top + new_h))
    return img.resize((tw, th), Image.LANCZOS)

for src_name, out_name in MAPPINGS:
    path = os.path.join(SRC_DIR, src_name)
    img = Image.open(path).convert("RGB")
    img = remove_watermark(img)
    img = center_crop(img, TARGET_W, TARGET_H)
    out_path = os.path.join(OUT_DIR, out_name)
    img.save(out_path, "JPEG", quality=88)
    print(f"{out_name}: {img.size} saved")
