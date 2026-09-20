"""Remove Hunyuan watermark and resize to 1408x704 for Silent Hill: Townfall ss2."""
from PIL import Image, ImageFilter, ImageOps
import os

SRC = "/Users/Zhuanz/WorkBuddy/GameMetaHub/gaming-hotwords/website/generated-images/First_person_view_in_foggy_Sco_2026-09-20T02-19-56.png"
DST = "/Users/Zhuanz/WorkBuddy/GameMetaHub/gaming-hotwords/website/public/images/games/silent-hill-townfall-ss2-v20260920.jpg"
TARGET = (1408, 704)

# Hunyuan watermark on 1100x550 source: ~63x32 px, ~6px from right edge, ~5px from bottom
BOX_W, BOX_H = 100, 60          # slightly larger than watermark to ensure full coverage
FEATHER = 25                    # symmetric fade on left+top edges only
PAD_X, PAD_Y = 6, 4

def build_mask(size, feather):
    w, h = size
    mask = Image.new("L", size, 255)
    px = mask.load()
    for y in range(h):
        fy = 1.0 if y >= feather else y / feather
        for x in range(w):
            fx = 1.0 if x >= feather else x / feather
            px[x, y] = int(255 * min(fx, fy))
    return mask

def remove_watermark(src_path, out_path, target_size=TARGET):
    img = Image.open(src_path).convert("RGB")
    W, H = img.size
    # Bottom-right corner
    x2, y2 = W - PAD_X, H - PAD_Y
    x1, y1 = x2 - BOX_W, y2 - BOX_H
    # Clone from left, same y range
    sx2 = x1
    sx1 = sx2 - BOX_W
    if sx1 < 0:
        sx1, sx2 = 0, BOX_W
    patch = img.crop((sx1, y1, sx2, y2))
    patch = ImageOps.mirror(patch)
    patch = patch.filter(ImageFilter.GaussianBlur(radius=3.0))
    mask = build_mask((x2 - x1, y2 - y1), FEATHER)
    img.paste(patch, (x1, y1), mask)
    if img.size != target_size:
        img = img.resize(target_size, Image.LANCZOS)
    img.save(out_path, "JPEG", quality=92, optimize=True, progressive=True)
    print(f"box=({x1},{y1},{x2},{y2}) -> {out_path}")
    return out_path

if __name__ == "__main__":
    remove_watermark(SRC, DST)
    # Verify: crop bottom-right of output
    out = Image.open(DST)
    W, H = out.size
    out.crop((W-260, H-140, W, H)).resize((780, 420), Image.LANCZOS).save("/tmp/after_townfall_ss2.png")
    print(f"Verification probe saved to /tmp/after_townfall_ss2.png")