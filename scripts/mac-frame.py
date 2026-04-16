#!/usr/bin/env python3
"""
mac-frame.py — Ajoute un châssis fenêtre macOS authentique à une capture d'écran.

Usage:
  python3 scripts/mac-frame.py <input.png> <output.png>
  python3 scripts/mac-frame.py --batch <dossier_source> <dossier_dest>

Exemple :
  python3 scripts/mac-frame.py /tmp/budget-rh.png public/modules/budget-rh.png
"""

import sys
import os
from pathlib import Path
from PIL import Image, ImageDraw, ImageFilter

# ─── Constantes style macOS ──────────────────────────────────────────────────
TITLEBAR_H   = 38          # hauteur barre de titre (px)
TITLEBAR_BG  = (28, 28, 30)        # #1c1c1e  — macOS dark titlebar
DOT_RADIUS   = 6                    # rayon des pastilles
DOT_Y        = TITLEBAR_H // 2     # centre vertical des pastilles
DOT_COLORS   = [
    (255,  95,  86),   # rouge   #ff5f56
    (255, 189,  46),   # jaune   #ffbd2e
    ( 39, 201,  63),   # vert    #27c93f
]
DOT_SPACING  = 20          # espacement centre-à-centre
DOT_X_START  = 16          # x du premier point

SHADOW_BLUR  = 24          # rayon du flou d'ombre portée
SHADOW_OFFSET = (0, 6)     # décalage (x, y)
SHADOW_COLOR = (0, 0, 0, 80)  # RGBA
SHADOW_EXPAND = 32          # marge autour pour l'ombre portée

CORNER_RADIUS = 12         # arrondi coins extérieurs
TARGET_WIDTH  = 1512       # largeur cible (pixels)
# ─────────────────────────────────────────────────────────────────────────────


def make_rounded_mask(width: int, height: int, radius: int) -> Image.Image:
    """Crée un masque alpha avec coins arrondis."""
    mask = Image.new("L", (width, height), 0)
    d = ImageDraw.Draw(mask)
    d.rounded_rectangle([0, 0, width - 1, height - 1], radius=radius, fill=255)
    return mask


def add_mac_frame(src_path: str, dst_path: str) -> None:
    src = Path(src_path)
    if not src.exists():
        print(f"[ERREUR] Fichier introuvable : {src_path}", file=sys.stderr)
        sys.exit(1)

    # 1. Charger et redimensionner le screenshot à TARGET_WIDTH
    screenshot = Image.open(src).convert("RGBA")
    orig_w, orig_h = screenshot.size
    if orig_w != TARGET_WIDTH:
        scale = TARGET_WIDTH / orig_w
        new_h = int(orig_h * scale)
        screenshot = screenshot.resize((TARGET_WIDTH, new_h), Image.LANCZOS)
    sw, sh = screenshot.size

    # 2. Construire la fenêtre (barre + screenshot)
    win_w = sw
    win_h = TITLEBAR_H + sh
    window = Image.new("RGBA", (win_w, win_h), (0, 0, 0, 0))
    draw = ImageDraw.Draw(window)

    # Fond entier de la fenêtre (blanc pour la zone screenshot)
    draw.rounded_rectangle(
        [0, 0, win_w - 1, win_h - 1],
        radius=CORNER_RADIUS,
        fill=(255, 255, 255, 255)
    )

    # Barre de titre
    draw.rectangle([0, 0, win_w, TITLEBAR_H], fill=TITLEBAR_BG + (255,))
    # Arrondi en haut seulement
    draw.rectangle([0, CORNER_RADIUS, win_w, TITLEBAR_H], fill=TITLEBAR_BG + (255,))
    draw.rounded_rectangle(
        [0, 0, win_w - 1, TITLEBAR_H + CORNER_RADIUS],
        radius=CORNER_RADIUS,
        fill=TITLEBAR_BG + (255,)
    )
    draw.rectangle([0, CORNER_RADIUS, win_w, TITLEBAR_H], fill=TITLEBAR_BG + (255,))

    # Pastilles macOS
    for i, color in enumerate(DOT_COLORS):
        cx = DOT_X_START + i * DOT_SPACING
        cy = DOT_Y
        draw.ellipse(
            [cx - DOT_RADIUS, cy - DOT_RADIUS, cx + DOT_RADIUS, cy + DOT_RADIUS],
            fill=color + (255,)
        )

    # Coller le screenshot sous la barre
    window.paste(screenshot, (0, TITLEBAR_H), mask=screenshot if screenshot.mode == "RGBA" else None)

    # Appliquer masque arrondi sur toute la fenêtre
    mask = make_rounded_mask(win_w, win_h, CORNER_RADIUS)
    window.putalpha(mask)

    # 3. Construire le canvas final avec ombre portée
    canvas_w = win_w + SHADOW_EXPAND * 2
    canvas_h = win_h + SHADOW_EXPAND * 2
    canvas = Image.new("RGBA", (canvas_w, canvas_h), (0, 0, 0, 0))

    # Ombre : on crée une silhouette floue décalée
    shadow_layer = Image.new("RGBA", (canvas_w, canvas_h), (0, 0, 0, 0))
    sil = Image.new("RGBA", (win_w, win_h), (0, 0, 0, 0))
    sil_draw = ImageDraw.Draw(sil)
    sil_draw.rounded_rectangle([0, 0, win_w - 1, win_h - 1], radius=CORNER_RADIUS, fill=SHADOW_COLOR)
    ox = SHADOW_EXPAND + SHADOW_OFFSET[0]
    oy = SHADOW_EXPAND + SHADOW_OFFSET[1]
    shadow_layer.paste(sil, (ox, oy))
    shadow_layer = shadow_layer.filter(ImageFilter.GaussianBlur(radius=SHADOW_BLUR))

    # Assembler : ombre d'abord, puis fenêtre
    canvas = Image.alpha_composite(canvas, shadow_layer)
    canvas.paste(window, (SHADOW_EXPAND, SHADOW_EXPAND), mask=window)

    # 4. Convertir en RGB pour l'export PNG (fond blanc)
    final = Image.new("RGB", canvas.size, (255, 255, 255))
    final.paste(canvas, mask=canvas.split()[3])  # utilise canal alpha

    dst = Path(dst_path)
    dst.parent.mkdir(parents=True, exist_ok=True)
    final.save(dst_path, "PNG", optimize=True)
    print(f"[OK] {src_path}  →  {dst_path}  ({final.size[0]}×{final.size[1]} px)")


def main():
    args = sys.argv[1:]
    if len(args) == 3 and args[0] == "--batch":
        src_dir, dst_dir = Path(args[1]), Path(args[2])
        for f in sorted(src_dir.glob("*.png")):
            add_mac_frame(str(f), str(dst_dir / f.name))
    elif len(args) == 2:
        add_mac_frame(args[0], args[1])
    else:
        print(__doc__)
        sys.exit(1)


if __name__ == "__main__":
    main()
