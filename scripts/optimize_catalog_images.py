from pathlib import Path
from PIL import Image

root = Path(__file__).resolve().parents[1] / "public" / "catalog"
for source in sorted(root.glob("shoe-*")):
    image = Image.open(source).convert("RGB")
    image.thumbnail((1400, 1400), Image.Resampling.LANCZOS)
    target = source.with_suffix(".jpg")
    image.save(target, "JPEG", quality=82, optimize=True, progressive=True)
    if target != source:
        source.unlink()
    print(f"{target.name}: {image.width}x{image.height}")
