const FRAMES = {
  "bg1.png": { frame: { x: 350, y: 1, w: 752, h: 128 }, rotated: !1, trimmed: !0, spriteSourceSize: { x: 0, y: 6, w: 752, h: 128 }, sourceSize: { w: 752, h: 140 } },
  "bonus_zoom.png": { frame: { x: 173, y: 926, w: 468, h: 52 }, rotated: !1, trimmed: !1, spriteSourceSize: { x: 0, y: 0, w: 468, h: 52 }, sourceSize: { w: 468, h: 52 } },
  "box1.png": { frame: { x: 173, y: 884, w: 40, h: 554 }, rotated: !0, trimmed: !1, spriteSourceSize: { x: 0, y: 0, w: 40, h: 554 }, sourceSize: { w: 40, h: 554 } },
  "box2.png": { frame: { x: 350, y: 373, w: 644, h: 114 }, rotated: !1, trimmed: !1, spriteSourceSize: { x: 0, y: 0, w: 644, h: 114 }, sourceSize: { w: 644, h: 114 } },
  "bracket.png": { frame: { x: 350, y: 489, w: 424, h: 186 }, rotated: !1, trimmed: !1, spriteSourceSize: { x: 0, y: 0, w: 424, h: 186 }, sourceSize: { w: 424, h: 186 } },
  "button.png": { frame: { x: 357, y: 677, w: 476, h: 113 }, rotated: !1, trimmed: !0, spriteSourceSize: { x: 0, y: 1, w: 476, h: 113 }, sourceSize: { w: 476, h: 114 } },
  "circle.png": { frame: { x: 809, y: 884, w: 60, h: 60 }, rotated: !1, trimmed: !1, spriteSourceSize: { x: 0, y: 0, w: 60, h: 60 }, sourceSize: { w: 60, h: 60 } },
  "coin_bg.png": { frame: { x: 929, y: 880, w: 44, h: 44 }, rotated: !1, trimmed: !1, spriteSourceSize: { x: 0, y: 0, w: 44, h: 44 }, sourceSize: { w: 44, h: 44 } },
  "flag.png": { frame: { x: 350, y: 131, w: 661, h: 240 }, rotated: !1, trimmed: !0, spriteSourceSize: { x: 2, y: 29, w: 661, h: 240 }, sourceSize: { w: 664, h: 274 } },
  "light.png": { frame: { x: 871, y: 880, w: 56, h: 56 }, rotated: !1, trimmed: !1, spriteSourceSize: { x: 0, y: 0, w: 56, h: 56 }, sourceSize: { w: 56, h: 56 } },
  "more_gold.png": { frame: { x: 1, y: 697, w: 354, h: 148 }, rotated: !1, trimmed: !0, spriteSourceSize: { x: 4, y: 15, w: 354, h: 148 }, sourceSize: { w: 376, h: 202 } },
  "num_bg.png": { frame: { x: 910, y: 489, w: 76, h: 100 }, rotated: !1, trimmed: !1, spriteSourceSize: { x: 0, y: 0, w: 76, h: 100 }, sourceSize: { w: 76, h: 100 } },
  "pap1.png": { frame: { x: 173, y: 847, w: 38, h: 26 }, rotated: !1, trimmed: !1, spriteSourceSize: { x: 0, y: 0, w: 38, h: 26 }, sourceSize: { w: 38, h: 26 } },
  "pap2.png": { frame: { x: 1, y: 947, w: 22, h: 22 }, rotated: !1, trimmed: !1, spriteSourceSize: { x: 0, y: 0, w: 22, h: 22 }, sourceSize: { w: 22, h: 22 } },
  "pap3.png": { frame: { x: 996, y: 373, w: 12, h: 26 }, rotated: !1, trimmed: !1, spriteSourceSize: { x: 0, y: 0, w: 12, h: 26 }, sourceSize: { w: 12, h: 26 } },
  "pap4.png": { frame: { x: 776, y: 623, w: 50, h: 64 }, rotated: !0, trimmed: !1, spriteSourceSize: { x: 0, y: 0, w: 50, h: 64 }, sourceSize: { w: 50, h: 64 } },
  "pap5.png": { frame: { x: 975, y: 880, w: 44, h: 44 }, rotated: !1, trimmed: !1, spriteSourceSize: { x: 0, y: 0, w: 44, h: 44 }, sourceSize: { w: 44, h: 44 } },
  "pap6.png": { frame: { x: 1074, y: 648, w: 18, h: 16 }, rotated: !1, trimmed: !1, spriteSourceSize: { x: 0, y: 0, w: 18, h: 16 }, sourceSize: { w: 18, h: 16 } },
  "pap7.png": { frame: { x: 643, y: 926, w: 48, h: 44 }, rotated: !1, trimmed: !1, spriteSourceSize: { x: 0, y: 0, w: 48, h: 44 }, sourceSize: { w: 48, h: 44 } },
  "pap8.png": { frame: { x: 729, y: 884, w: 78, h: 68 }, rotated: !1, trimmed: !1, spriteSourceSize: { x: 0, y: 0, w: 78, h: 68 }, sourceSize: { w: 78, h: 68 } },
  "pap9.png": { frame: { x: 910, y: 591, w: 16, h: 18 }, rotated: !1, trimmed: !1, spriteSourceSize: { x: 0, y: 0, w: 16, h: 18 }, sourceSize: { w: 16, h: 18 } },
  "pap11.png": { frame: { x: 809, y: 946, w: 30, h: 32 }, rotated: !1, trimmed: !1, spriteSourceSize: { x: 0, y: 0, w: 30, h: 32 }, sourceSize: { w: 30, h: 32 } },
  "ring.png": { frame: { x: 1, y: 1, w: 347, h: 694 }, rotated: !1, trimmed: !1, spriteSourceSize: { x: 0, y: 0, w: 347, h: 694 }, sourceSize: { w: 347, h: 694 } },
  "spin_button.png": { frame: { x: 842, y: 648, w: 230, h: 230 }, rotated: !1, trimmed: !0, spriteSourceSize: { x: 16, y: 16, w: 230, h: 230 }, sourceSize: { w: 264, h: 264 } },
  "spin_text.png": { frame: { x: 1, y: 847, w: 170, h: 98 }, rotated: !1, trimmed: !0, spriteSourceSize: { x: 49, y: 79, w: 170, h: 98 }, sourceSize: { w: 264, h: 264 } },
  "sunflower.png": { frame: { x: 776, y: 489, w: 132, h: 132 }, rotated: !1, trimmed: !1, spriteSourceSize: { x: 0, y: 0, w: 132, h: 132 }, sourceSize: { w: 132, h: 132 } },
  "text1.png": { frame: { x: 357, y: 792, w: 483, h: 90 }, rotated: !1, trimmed: !0, spriteSourceSize: { x: 17, y: 2, w: 483, h: 90 }, sourceSize: { w: 518, h: 100 } },
  "text2.png": { frame: { x: 1013, y: 131, w: 515, h: 85 }, rotated: !0, trimmed: !0, spriteSourceSize: { x: 2, y: 7, w: 515, h: 85 }, sourceSize: { w: 518, h: 100 } },
};

export {
  FRAMES
}