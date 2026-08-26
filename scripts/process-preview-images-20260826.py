"""Process 2 generated preview-roundup images: watermark removal + crop 1408x704 + JPG"""
import os
from PIL import Image, ImageFilter

OUTPUT_DIR = "/Users/Zhuanz/WorkBuddy/GameMetaHub/gaming-hotwords/website/public/images/games"

MAPPINGS = [
    ("Cinematic_wide_shot_of_a_gritt_2026-08-26T06-11-33.png", "star-wars-zero-company-preview-v20260826.jpg"),
    ("Cinematic_wide_shot_of_a_fierc_2026-08-26T06-11-31.png", "resonance-plague-tale-legacy-preview-v20260826.jpg"),
]

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
            alpha = min(dist_top, dist_left, dist_right, dist_bottom)
            pixels[x, y] = int(alpha * 255)
    img.paste(clone_region, (wm_left, wm_top), mask)
    return img

def crop_to_1408x704(img):
    target_ratio = 1408 / 704  # 2:1
    w, h = img.size
    current_ratio = w / h
    if current_ratio > target_ratio:
        new_w = int(h * target_ratio)
        left = (w - new_w) // 2
        img = img.crop((left, 0, left + new_w, h))
    else:
        new_h = int(w / target_ratio)
        top = (h - new_h) // 2
        img = img.crop((0, top, w, top + new_h))
    return img.resize((1408, 704), Image.LANCZOS)

for src_name, target_name in MAPPINGS:
    src_path = os.path.join(OUTPUT_DIR, src_name)
    target_path = os.path.join(OUTPUT_DIR, target_name)
    img = Image.open(src_path)
    print(f"{src_name}: {img.size} mode={img.mode}")
    img = remove_watermark(img)
    img = crop_to_1408x704(img)
    img.convert("RGB").save(target_path, "JPEG", quality=88)
    print(f"  -> {target_name} ({img.size[0]}x{img.size[1]})")
    os.remove(src_path)
    print(f"  removed source png")

print("DONE")
