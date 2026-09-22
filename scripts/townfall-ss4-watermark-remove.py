"""Remove Hunyuan watermark for Silent Hill: Townfall ss4 (review roundup, 2026-09-22).

Measured watermark bbox on 1408x704 source: x ~1322-1406, y ~664-703 (~84x40 px).
"""
from PIL import Image, ImageFilter, ImageOps

SRC = "/Users/Zhuanz/WorkBuddy/GameMetaHub/gaming-hotwords/website/generated-images/Unreal_Engine_5_photorealistic_2026-09-22T07-19-36.png"
DST = "/Users/Zhuanz/WorkBuddy/GameMetaHub/gaming-hotwords/website/public/images/games/silent-hill-townfall-ss4-v20260922.jpg"
TARGET = (1408, 704)

BOX_W, BOX_H = 120, 74   # generous cover of measured ~84x40 (+ ghost margin)
FEATHER_X, FEATHER_Y = 22, 10  # fast vertical fade: watermark text sits close to box top
PAD_X, PAD_Y = 2, 1


def build_mask(size, feather_x, feather_y):
    w, h = size
    mask = Image.new("L", size, 255)
    px = mask.load()
    for y in range(h):
        fy = 1.0 if y >= feather_y else y / feather_y
        for x in range(w):
            fx = 1.0 if x >= feather_x else x / feather_x
            px[x, y] = int(255 * min(fx, fy))
    return mask


def main():
    img = Image.open(SRC).convert("RGB")
    W, H = img.size
    x2, y2 = W - PAD_X, H - PAD_Y
    x1, y1 = x2 - BOX_W, y2 - BOX_H
    sx2 = x1
    sx1 = sx2 - BOX_W
    if sx1 < 0:
        sx1, sx2 = 0, BOX_W
    patch = img.crop((sx1, y1, sx2, y2))
    patch = ImageOps.mirror(patch)
    patch = patch.filter(ImageFilter.GaussianBlur(radius=3.0))
    mask = build_mask((x2 - x1, y2 - y1), FEATHER_X, FEATHER_Y)
    img.paste(patch, (x1, y1), mask)
    # Second pass: hard re-cover the watermark text core (x>=1320, y>=660) to kill ghosting
    cx1, cy1 = 1316, 658
    patch2 = img.crop((cx1 - (x2 - cx1), cy1, cx1, y2))
    patch2 = ImageOps.mirror(patch2)
    patch2 = patch2.filter(ImageFilter.GaussianBlur(radius=4.0))
    mask2 = build_mask((x2 - cx1, y2 - cy1), 14, 8)
    img.paste(patch2, (cx1, cy1), mask2)
    if img.size != TARGET:
        img = img.resize(TARGET, Image.LANCZOS)
    img.save(DST, "JPEG", quality=92, optimize=True, progressive=True)
    print(f"box=({x1},{y1},{x2},{y2}) -> {DST}")

    out = Image.open(DST)
    W, H = out.size
    out.crop((W - 320, H - 160, W, H)).resize((960, 480), Image.LANCZOS).save("/tmp/after_townfall_ss4.png")
    print("Verification probe saved to /tmp/after_townfall_ss4.png")


if __name__ == "__main__":
    main()
