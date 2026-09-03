"""Process 2 article images for 2026-09-03 articles: watermark removal + crop 1408x704 + JPG"""
import os
from PIL import Image, ImageFilter

OUT = "/Users/Zhuanz/WorkBuddy/GameMetaHub/gaming-hotwords/website/public/images/games"
GEN = "/Users/Zhuanz/WorkBuddy/GameMetaHub/gaming-hotwords/website/generated-images"

MAPPINGS = [
    ("Epic_samurai_action_game_key_a_2026-09-03T02-10-05.png", "onimusha-way-of-the-sword-ss2-v20260903.jpg"),
    ("Sci_fi_military_shooter_game_s_2026-09-03T02-10-51.png", "helldivers-2-ss3-v20260903.jpg"),
]

def remove_watermark(img):
    w, h = img.size
    wm_w, wm_h = 130, 45
    wm_left, wm_top = w - wm_w, h - wm_h
    clone = img.crop((wm_left, wm_top - wm_h, wm_left + wm_w, wm_top))
    clone = clone.filter(ImageFilter.GaussianBlur(radius=2.5))
    mask = Image.new('L', (wm_w, wm_h), 255)
    px = mask.load()
    feather = 20
    for y in range(wm_h):
        for x in range(wm_w):
            alpha = min(min(y, feather), min(x, feather), min(wm_w - 1 - x, feather), min(wm_h - 1 - y, feather)) / feather
            px[x, y] = int(alpha * 255)
    img.paste(clone, (wm_left, wm_top), mask)
    return img

for src, target in MAPPINGS:
    img = Image.open(os.path.join(GEN, src))
    print(src, img.size, img.mode)
    img = remove_watermark(img)
    # crop to 1408x704 center
    w, h = img.size
    tr = 1408 / 704
    if w / h > tr:
        nw = int(h * tr); left = (w - nw) // 2
        img = img.crop((left, 0, left + nw, h))
    else:
        nh = int(w / tr); top = (h - nh) // 2
        img = img.crop((0, top, w, top + nh))
    img = img.resize((1408, 704), Image.LANCZOS)
    if img.mode != 'RGB':
        bg = Image.new('RGB', img.size, (255, 255, 255))
        if img.mode == 'RGBA':
            bg.paste(img, mask=img.split()[3])
        else:
            bg = img.convert('RGB')
        img = bg
    out_path = os.path.join(OUT, target)
    img.save(out_path, 'JPEG', quality=80, progressive=True)
    print("  ->", out_path, img.size, f"{os.path.getsize(out_path)/1024:.0f} KB")
    os.remove(os.path.join(GEN, src))
print("Done")
