"""Process 4 generated images for two new games: watermark removal + crop 1408x704 + JPG"""
import os
from PIL import Image, ImageFilter

OUTPUT_DIR = "/Users/Zhuanz/WorkBuddy/GameMetaHub/gaming-hotwords/website/public/images/games"

MAPPINGS = [
    ("Cinematic_wide_shot_of_a_Star__2026-08-25T09-01-03.png", "star-wars-zero-company-header-v20260825.jpg"),
    ("Dramatic_wide_shot_of_a_Star_W_2026-08-25T09-01-30.png", "star-wars-zero-company-ss1-v20260825.jpg"),
    ("Cinematic_wide_shot_of_a_dark__2026-08-25T09-02-04.png", "resonance-plague-tale-legacy-header-v20260825.jpg"),
    ("Dramatic_wide_shot_of_ancient__2026-08-25T09-02-42.png", "resonance-plague-tale-legacy-ss1-v20260825.jpg"),
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

for src_name, target_name in MAPPINGS:
    src_path = os.path.join(OUTPUT_DIR, src_name)
    target_path = os.path.join(OUTPUT_DIR, target_name)
    img = Image.open(src_path)
    print(f"{src_name}: {img.size} mode={img.mode}")
    img = remove_watermark(img)
    # Crop to 1408x704
    w, h = img.size
    target_w, target_h = 1408, 704
    target_ratio = target_w / target_h
    if w / h > target_ratio:
        new_w = int(h * target_ratio)
        left = (w - new_w) // 2
        img = img.crop((left, 0, left + new_w, h))
    else:
        new_h = int(w / target_ratio)
        top = (h - new_h) // 2
        img = img.crop((0, top, w, top + new_h))
    img = img.resize((target_w, target_h), Image.LANCZOS)
    if img.mode == 'RGBA':
        background = Image.new('RGB', img.size, (255, 255, 255))
        background.paste(img, mask=img.split()[3])
        img = background
    elif img.mode != 'RGB':
        img = img.convert('RGB')
    img.save(target_path, 'JPEG', quality=80, progressive=True)
    size_kb = os.path.getsize(target_path) / 1024
    print(f"  -> {target_name} ({size_kb:.0f} KB)")
    os.remove(src_path)

print("Done!")
