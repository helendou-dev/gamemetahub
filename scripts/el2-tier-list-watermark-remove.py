#!/usr/bin/env python3
"""EL2 Sandshapers tier list images: watermark removal + rename to versioned JPG filenames."""
from PIL import Image, ImageDraw, ImageFilter
import os
import sys

DATE = "20260918"
WORKSPACE = "/Users/Zhuanz/WorkBuddy/GameMetaHub/gaming-hotwords/website"
IMG_DIR = os.path.join(WORKSPACE, "public/images/games")

# Source files (output of ImageGen)
SOURCES = {
    "header": f"{IMG_DIR}/Endless_Legend_2_Sandshapers_f_2026-09-18T06-23-26.png",
    "ss1":    f"{IMG_DIR}/Endless_Legend_2_Rogue_Faction_2026-09-18T06-23-20.png",
}
# Target files
TARGETS = {
    "header": f"{IMG_DIR}/endless-legend-2-header-v{DATE}.jpg",
    "ss1":    f"{IMG_DIR}/endless-legend-2-ss1-v{DATE}.jpg",
}


def remove_watermark(src_path: str, dst_path: str) -> None:
    """Inpaint the bottom-right watermark area with cloned texture + feathered mask."""
    img = Image.open(src_path).convert("RGBA")
    w, h = img.size
    # Recent Hunyuan watermark bbox per measured run: ~88x44 at bottom-right
    wm_w, wm_h = 88, 44
    pad_bottom = 2
    left = w - wm_w
    top = h - wm_h - pad_bottom

    # Source texture: clone from the LEFT of the watermark area at the same vertical position
    src_left = left - wm_w
    src_top = top
    src_right = left
    src_bottom = h - pad_bottom
    if src_left < 0:
        # Fallback: copy from above the watermark
        src_left, src_top, src_right, src_bottom = left, top - wm_h, w, top

    texture = img.crop((src_left, src_top, src_right, src_bottom))
    texture = texture.filter(ImageFilter.GaussianBlur(radius=2.5))

    # Build a feathered alpha mask (left edge fades in over 16px)
    mask = Image.new("L", (wm_w, wm_h), 255)
    draw = ImageDraw.Draw(mask)
    feather = 16
    for x in range(feather):
        alpha = int(255 * ((x + 1) / feather))
        draw.line([(x, 0), (x, wm_h)], fill=alpha, width=1)

    # Paste texture over watermark
    img.paste(texture, (left, top), mask)

    # Convert RGBA -> RGB and save as JPG
    rgb_img = Image.new("RGB", img.size, (255, 255, 255))
    rgb_img.paste(img, mask=img.split()[3])
    rgb_img.save(dst_path, "JPEG", quality=82, optimize=True, progressive=True)
    print(f"  -> {os.path.basename(dst_path)} ({os.path.getsize(dst_path)} bytes)")


def main() -> int:
    print("== EL2 Sandshapers tier list watermark removal ==")
    for name, src in SOURCES.items():
        if not os.path.exists(src):
            print(f"  ! missing source: {src}")
            return 1
        # Clean up any old versioned file with the same name (safe: only the v{DATE} files)
        dst = TARGETS[name]
        if os.path.exists(dst):
            os.remove(dst)
        print(f"[{name}] {os.path.basename(src)}")
        remove_watermark(src, dst)

    # Remove the original PNGs to keep public/ clean
    for src in SOURCES.values():
        if os.path.exists(src):
            os.remove(src)
            print(f"  cleanup: {os.path.basename(src)}")

    print("== done ==")
    return 0


if __name__ == "__main__":
    sys.exit(main())