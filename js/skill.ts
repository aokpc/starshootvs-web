import type {
  CharaDef,
  MoveFunc,
  ShotDef,
  SkillDef,
  St,
  Star,
} from "./types.ts";

import { pstar } from "./game.ts";
import { Box } from "./Box.ts";
import { PIXI } from "./pixi.ts";
import { Shot } from "./Shot.ts";

const del = (): [number, number, number] => [10000, 0, 0];

function effect(callback: (p: Shot) => void): MoveFunc {
  return function (t) {
    callback(this);
    return [1401, 0, 0];
  };
}

function kasoku(
  ddx = 0,
  ddy = 10,
  size = 3,
  add = 0,
  [x, y] = [0, 0],
  dx = 0,
  dy = 0,
): MoveFunc {
  return (t) => {
    t += add;
    return [
      (t * t * ddx + t * dx) / 10 * 4 + x,
      (t * t * ddy + t * dy) / 10 * 4 + y,
      size,
    ];
  };
}
function kasoku1(
  ddx = 0,
  ddy = 10,
  size = 3,
  add = 0,
  [x, y] = [0, 0],
  dx = 0,
  dy = 0,
): MoveFunc {
  return (t) => {
    t += add;
    return [
      (t * t * t * ddx + t * t * dx) / 10 * 4 + x,
      (t * t * t * ddy + t * t * dy) / 10 * 4 + y,
      size,
    ];
  };
}
function kasoku2(
  dx = 0,
  dy = 10,
  size = 3,
  add = 0,
  [x, y] = [0, 0],
): MoveFunc {
  return (t) => {
    t += add;
    return [t * t * t * dx / 10 * 4 + x, t * t * dy / 10 * 4 + y, size];
  };
}
function kasoku3(
  dx = 0,
  dy = 10,
  size = 3,
  add = 0,
  [x, y] = [0, 0],
): MoveFunc {
  return (t) => {
    t += add;
    return [t * t * dx / 10 * 4 + x, t * t * t * dy / 10 * 4 + y, size];
  };
}
function kasoku4(
  dx = 0,
  ddx = 0,
  dy = 10,
  size = 3,
  add = 0,
  [x, y] = [0, 0],
): MoveFunc {
  return (t) => {
    t += add;
    return [
      (t * t * t * t * ddx + t * dx) / 10 * 4 + x,
      t * t * dy / 10 * 4 + y,
      size,
    ];
  };
}
function kasoku5(
  dx = 0,
  ddx = 0,
  dy = 10,
  size = 3,
  add = 0,
  [x, y] = [0, 0],
): MoveFunc {
  return (t) => {
    t += add;
    return [
      (t * t * t * ddx + t * dx) / 10 * 4 + x,
      t * t * dy / 10 * 4 + y,
      size,
    ];
  };
}
function kasoku7(
  dx = 0,
  dy = 10,
  size = 3,
  add = 0,
  [x, y] = [0, 0],
): MoveFunc {
  return (t) => {
    t += add;
    return [(t ** 5 * dx) + x, t ** 6 * dy + y, size];
  };
}
function ruijo(dx = 0.2, dy = 0.3, size = 3): MoveFunc {
  return (t) => {
    return [(dx ** -(t / 80)) * 100, t * t * dy, size];
  };
}

function dFunc(dx = 0, dy = 10, size = 3, add = 0, [x, y] = [0, 0]): MoveFunc {
  return (t) => {
    t += add;
    return [t * dx / 10 * 4 + x, t * dy / 10 * 4 + y, size];
  };
}
function dark(dy = 1.6, a = 35, b = 14, s = 5, size = 1.5, add = 0): MoveFunc {
  return function (t) {
    t += add;
    if (t % (4 * a + 2 * b) <= a) {
      return [0, (t % (4 * a + 2 * b)) * -dy + 0.4 * s * t, size];
    } else if (t % (4 * a + 2 * b) <= (a + b)) {
      return [0, a * -dy + 0.4 * s * t, size];
    } else if (t % (4 * a + 2 * b) <= (3 * a + b)) {
      return [
        0,
        ((2 * a + b) - (t % (4 * a + 2 * b))) * -dy + 0.4 * s * t,
        size,
      ];
    } else if (t % (4 * a + 2 * b) <= (3 * a + 2 * b)) {
      return [0, -a * -dy + 0.4 * s * t, size];
    } else {
      return [
        0,
        ((t % (4 * a + 2 * b)) - (4 * a + 2 * b)) * -dy + 0.4 * s * t,
        size,
      ];
    }
  };
}
function dark2(
  z = 1,
  dy = 1.6,
  a = 35,
  b = 14,
  s = 5,
  size = 1.5,
  add = 0,
): MoveFunc {
  return function (t) {
    t += add;
    if (t % (4 * a + 2 * b) <= a) {
      return [
        z * dy * Math.cos(Math.PI / 6) * (t % (4 * a + 2 * b)),
        dy * Math.sin(Math.PI / 6) * (t % (4 * a + 2 * b)) + 0.4 * s * t,
        size,
      ];
    } else if (t % (4 * a + 2 * b) <= (a + b)) {
      return [
        z * dy * Math.cos(Math.PI / 6) * a,
        dy * Math.sin(Math.PI / 6) * a + 0.4 * s * t,
        size,
      ];
    } else if (t % (4 * a + 2 * b) <= (2 * a + b)) {
      return [
        z * dy * Math.cos(Math.PI / 6) * ((2 * a + b) - (t % (4 * a + 2 * b))),
        dy * Math.sin(Math.PI / 6) * ((2 * a + b) - (t % (4 * a + 2 * b))) +
        0.4 * s * t,
        size,
      ];
    } else if (t % (4 * a + 2 * b) <= (3 * a + b)) {
      return [
        z * dy * Math.cos(Math.PI / 6) * ((t % (4 * a + 2 * b)) - (2 * a + b)),
        -dy * Math.sin(Math.PI / 6) * ((t % (4 * a + 2 * b)) - (2 * a + b)) +
        0.4 * s * t,
        size,
      ];
    } else if (t % (4 * a + 2 * b) <= (3 * a + 2 * b)) {
      return [
        z * dy * Math.cos(Math.PI / 6) * a,
        -dy * Math.sin(Math.PI / 6) * a + 0.4 * s * t,
        size,
      ];
    } else {
      return [
        z * dy * Math.cos(Math.PI / 6) *
        ((4 * a + 2 * b) - (t % (4 * a + 2 * b))),
        -dy * Math.sin(Math.PI / 6) *
          ((4 * a + 2 * b) - (t % (4 * a + 2 * b))) + 0.4 * s * t,
        size,
      ];
    }
  };
}
function sena(dx = 0, dy = 10, size = 3, add = 0, [x, y] = [0, 0]): MoveFunc {
  return function (t) {
    t += add;
    if (this.y > 1010 && !this.data) {
      this.by = 0;
      this.t = 1;
      this.data = true;
    }
    if (this.y < -10 && !this.data) {
      this.by = 0;
      this.t = 1;
      this.data = true;
    }
    return [t * dx / 10 * 4 + x, t * dy / 10 * 4 + y, size];
  };
}
function dFunx(dx = 0, dy = 10, size = 3, add = 0, [x, y] = [0, 0]): MoveFunc {
  return (t) => {
    t += add;
    return [
      t * dx / 10 * 4 + x,
      t * dy / 10 * 4 + y,
      size * Math.sin(t * Math.PI / 20),
    ];
  };
}
function kasoku6(
  dx = 0,
  dy = 10,
  size = 3,
  add = 0,
  [x, y] = [0, 0],
): MoveFunc {
  return (t) => {
    t += add;
    return [t * t * dx / 10 * 4 + x, t * dy / 10 * 4 + y, size];
  };
}
function dCurve(
  θ = 0,
  dθ = 0,
  size = 3,
  speed = 7,
  [x, y] = [0, 0],
  add = 0,
  daen = 1,
): MoveFunc {
  return (t) => {
    t += add;
    return [
      t * speed * Math.sin(θ + dθ * (t - add)) + x,
      t * speed * Math.cos(θ + dθ * (t - add)) * daen + y,
      size,
    ];
  };
}

function dKaiten(
  θ = 0,
  dθ = 0.35,
  dy = 2,
  dx = 0,
  r = 5,
  dr = 0.13,
  size = 1.5,
  drx = 1,
  dry = 1,
  [x, y] = [0, 0],
): MoveFunc {
  return (t) => {
    return [
      t * dx + drx * (r + dr * t) * Math.cos(θ + dθ * t) - x,
      t * dy + dry * (r + dr * t) * Math.sin(θ + dθ * t) - y,
      size,
    ];
  };
}

function takino(
  θ = 0,
  dθ = 0.35,
  dy = 2,
  r = 5,
  dr = 0.13,
  size = 1.5,
  dry = 1,
  [x, y] = [0, 0],
): MoveFunc {
  return (t) => {
    return [
      0 + x,
      t * dy + dry * (r + dr * t) * Math.sin(θ + dθ * t) + y,
      size,
    ];
  };
}
function taki(dy = 1.6, a = 35, b = 14, s = 5, size = 1.5, add = 0): MoveFunc {
  return function (t) {
    t += add;
    if (t % (4 * a + 2 * b) <= a) {
      return [0, (t % (4 * a + 2 * b)) * -dy + 0.4 * s * t, size];
    } else if (t % (4 * a + 2 * b) <= (a + b)) {
      return [0, a * -dy + 0.4 * s * t, size];
    } else if (t % (4 * a + 2 * b) <= (3 * a + b)) {
      return [
        0,
        ((2 * a + b) - (t % (4 * a + 2 * b))) * -dy + 0.4 * s * t,
        size,
      ];
    } else if (t % (4 * a + 2 * b) <= (3 * a + 2 * b)) {
      return [0, -a * -dy + 0.4 * s * t, size];
    } else {
      return [
        0,
        ((t % (4 * a + 2 * b)) - (4 * a + 2 * b)) * -dy + 0.4 * s * t,
        size,
      ];
    }
  };
}
function dKaitenFuncif(
  r = 13,
  dθ = (-(1 / 30) * Math.PI),
  θ = ((4.5 / 6) * Math.PI),
  dθ2 = (-(1 / 30) * Math.PI),
  dx = 0,
  dy = 10,
  dx2 = 11,
  dy2 = 2,
  when = 60,
  add = 0,
  size = 3,
  [x, y] = [0, 0],
  dr = 0,
  dr2 = 0,
  s = 1,
): MoveFunc {
  return (t) => {
    t += add;
    if (t <= when) {
      return [
        t * dx + t * ((r + dr * t) * Math.cos(θ + dθ * t)) + x,
        t * dy + t * ((r + dr * t) * Math.sin(θ + dθ * t)) + y,
        size,
      ];
    } else {
      return [
        when * dx +
        when *
          ((r + dr * when + dr2 * (t - when) * s) *
            Math.cos(θ + dθ * when + dθ2 * (t - when) * s)) +
        x + (t - when) * s * dx2,
        when * dy +
        when *
          ((r + dr * when + dr2 * (t - when) * s) *
            Math.sin(θ + dθ * when + dθ2 * (t - when) * s)) +
        y + (t - when) * s * dy2,
        size,
      ];
    }
  };
}
function KaitenFuncif(
  r = 13,
  θ = ((4.5 / 6) * Math.PI),
  dθ = (-(1 / 30) * Math.PI),
  dθ2 = (-(1 / 30) * Math.PI),
  dx = 0,
  dy = 10,
  dx2 = 11,
  dy2 = 2,
  when = 60,
  add = 0,
  size = 3,
  [x, y] = [0, 0],
  dr = 0,
  dr2 = 0,
): MoveFunc {
  return (t) => {
    t += add;
    if (t < when) {
      return [
        t * dx + ((r + dr * t) * Math.cos(θ + dθ * t)) + x,
        t * dy + ((r + dr * t) * Math.sin(θ + dθ * t)) + y,
        size,
      ];
    } else {
      return [
        when * dx +
        (r + when * dr + dr2 * (t - when)) *
          Math.cos(θ + dθ * when + dθ2 * (t - when)) +
        (t - when) * dx2 +
        x,
        when * dy +
        (r + when * dr + dr2 * (t - when)) *
          Math.sin(θ + dθ * when + dθ2 * (t - when)) +
        (t - when) * dy2 +
        y,
        size,
      ];
    }
  };
}
function kaiten(
  θ = 0,
  dθ = 0.35,
  dy = 2,
  dx = 0,
  r = 5,
  dr = 0.13,
  size = 1.5,
  [x, y] = [0, 0],
): MoveFunc {
  return (t) => {
    return [
      t * dx + t * (r + dr * t) * Math.cos(θ + dθ * t) + x,
      t * dy + t * (r + dr * t) * Math.sin(θ + dθ * t) + y,
      size,
    ];
  };
}
function dFuncif(
  dx = 0,
  dy = 10,
  dx2 = 11,
  dy2 = 2,
  when = 60,
  add = 0,
  size = 3,
  [x, y] = [0, 0],
): MoveFunc {
  return (t) => {
    t += add;
    if (t <= when) {
      return [t * dx / 10 * 4 + x, t * dy / 10 * 4 + y, size];
    } else {
      return [
        when * dx / 10 * 4 + x + (dx2 * (t - when)) / 10 * 4,
        when * dy / 10 * 4 + y + dy2 * (t - when) / 10 * 4,
        size,
      ];
    }
  };
}
function dFuncifif(
  dx = 0,
  dy = 10,
  dx2 = 11,
  dy2 = 2,
  dx3 = 0,
  dy3 = 0,
  when = 60,
  when2 = 10,
  add = 0,
  size = 3,
  [x, y] = [0, 0],
): MoveFunc {
  return (t) => {
    t += add;
    if (t <= when) {
      return [t * dx / 10 * 4 + x, t * dy / 10 * 4 + y, size];
    } else if (t > when && t <= (when + when2)) {
      return [
        when * dx / 10 * 4 + x + (dx2 * (t - when)) / 10 * 4,
        when * dy / 10 * 4 + y + dy2 * (t - when) / 10 * 4,
        size,
      ];
    } else {
      return [
        when * dx / 10 * 4 + x + (dx2 * when2) / 10 * 4 +
        dx3 * (t - when - when2) / 10 * 4,
        when * dy / 10 * 4 + y + (dy2 * when2) / 10 * 4 +
        dy3 * (t - when - when2) / 10 * 4,
        size,
      ];
    }
  };
}
function xgiri1(s = 30, size = 5, o = 20): MoveFunc {
  return function (t) {
    this.bx = 625;
    if (t >= o) {
      return [700 / s * (t - o), (840 / s * (t - o)) - 30, size];
    }
    return [0, -30, size];
  };
}
function xgiri2(s = 30, size = 5, o = 20): MoveFunc {
  return function (t) {
    this.bx = 75;
    if (t >= o) {
      return [-700 / s * (t - o), (840 / s * (t - o)) - 30, size];
    }
    return [0, -30, size];
  };
}
function turumai1(s = 33, size = 3, o = 50): MoveFunc {
  return function (t) {
    this.bx = 250;
    if (t >= o) {
      return [-260 / s * (t - o), 810 / s * (t - o), size];
    }
    return [0, 0, size];
  };
}
function turumai2(s = 33, size = 3, o = 60): MoveFunc {
  return function (t) {
    this.bx = 450;
    if (t >= o) {
      return [260 / s * (t - o), 810 / s * (t - o), size];
    }
    return [0, 0, size];
  };
}
function turumai3(s = 33, size = 3, o = 70): MoveFunc {
  return function (t) {
    this.bx = 165;
    if (t >= o) {
      return [-470 / s * (t - o), 810 / s * (t - o), size];
    }
    return [0, 0, size];
  };
}
function turumai4(s = 33, size = 3, o = 80): MoveFunc {
  return function (t) {
    this.bx = 535;
    if (t >= o) {
      return [470 / s * (t - o), 810 / s * (t - o), size];
    }
    return [0, 0, size];
  };
}
function turumai5(s = 33, size = 3, o = 90): MoveFunc {
  return function (t) {
    this.bx = 80;
    if (t >= o) {
      return [-680 / s * (t - o), 810 / s * (t - o), size];
    }
    return [0, 0, size];
  };
}
function turumai6(s = 33, size = 3, o = 100): MoveFunc {
  return function (t) {
    this.bx = 620;
    if (t >= o) {
      return [680 / s * (t - o), 810 / s * (t - o), size];
    }
    return [0, 0, size];
  };
}

function longaim(s = 30, size = 3): MoveFunc { //未
  return function (t) {
    return [
      t *
      (((this.bx - 350) / s) * ((950 - 500) * 2) /
        (Math.sqrt((this.bx - 350) ** 2 + (this.by - 85) ** 2))),
      t *
      (((this.by - 85) / s) * ((950 - 500) * 2) / //950 = this.by
        (Math.sqrt((this.bx - 350) ** 2 + (this.by - 85) ** 2))),
      size,
    ];
  };
}
function shortaim(s = 30, size = 3): MoveFunc {
  return function (t) {
    return [
      t *
      (((this.bx - 350) * 2 / s) * ((950 - 500) * 2) /
        (Math.sqrt(((this.bx - 350) * 2) ** 2 + ((this.by - 500) * 2) ** 2))),
      t *
      (((this.by - 500) * 2 / s) * ((950 - 500) * 2) /
        (Math.sqrt(((this.bx - 350) * 2) ** 2 + ((this.by - 500) * 2) ** 2))),
      size,
    ];
  };
}
function turnaim(s = 30, size = 3): MoveFunc {
  return function (t) {
    if (t === (s / 2)) {
      this.bx = 700 - this.bx;
    }
    return [
      -t * ((350 - this.bx) * 2 / s),
      -t * ((500 - this.by) * 2 / s),
      size,
    ];
  };
}
/*
function turnaim( s = 30, size = 3 ): MoveFunc {
  return function (t) {
    if ((t *
      (((this.by - 500) * 2 / s) * ((950 - 500) * 2) / //950 = this.by
        (Math.sqrt(((this.bx - 350) * 2) ** 2 + ((this.by - 500) * 2) ** 2)))) === 500) {
      this.bx = 700 - this.bx;
    }
    return [
      t *
      (((this.bx - 350) * 2 / s) * ((950 - 500) * 2) / //950 = this.by
        (Math.sqrt(((this.bx - 350) * 2) ** 2 + ((this.by - 500) * 2) ** 2))),
      t *
      (((this.by - 500) * 2 / s) * ((950 - 500) * 2) / //950 = this.by
        (Math.sqrt(((this.bx - 350) * 2) ** 2 + ((this.by - 500) * 2) ** 2))),
      size,
    ];
  };
}
*/
function corneraim1(s = 30, size = 3): MoveFunc {
  return function (t) {
    return [
      t *
      (((this.bx) / s) * ((950 - 500) * 2) /
        Math.sqrt((this.by - 80) ** 2 + this.bx ** 2)),
      t *
      (((this.by - 80) / s) * ((950 - 500) * 2) /
        Math.sqrt((this.by - 80) ** 2 + this.bx ** 2)),
      size,
    ];
  };
}
function corneraim2(s = 30, size = 3): MoveFunc {
  return function (t) {
    return [
      t *
      (((this.bx - 700) / s) * ((950 - 500) * 2) /
        Math.sqrt((this.by - 80) ** 2 + (this.bx - 700) ** 2)),
      t *
      (((this.by - 80) / s) * ((950 - 500) * 2) /
        Math.sqrt((this.by - 80) ** 2 + (this.bx - 700) ** 2)),
      size,
    ];
  };
}

function mirror(dx = 0, dy = 10, size = 3): MoveFunc {
  return function (t) {
    if ((t * dy / 10 * 4) >= (this.parent.game.me.st.y - 500)) {
      return [
        2 * this.bx - 700 - (t * dx / 10 * 4),
        t * dy / 10 * 4,
        size,
      ];
    }
    return [t * dx / 10 * 4, t * dy / 10 * 4, size];
  };
}
function center(dx = 0, dy = 10, size = 3): MoveFunc {
  return function (t) {
    if ((t * dy / 10 * 4) >= (this.parent.game.me.st.y - 500)) {
      return [
        this.bx - 350 - (t * dx / 10 * 4),
        t * dy / 10 * 4,
        size,
      ];
    }
    return [t * dx / 10 * 4, t * dy / 10 * 4, size];
  };
}
function mirrorfusen(dx = 0, dy = 8.55, bsize = 1.5, tosize = 13): MoveFunc {
  return function (t) {
    if (!this.data) {
      this.data = 0;
    }
    if (
      (t * dy / 10 * 4) >= (this.parent.game.me.st.y - 500) &&
      ((bsize + ((tosize - bsize) * (t - this.data) / 20)) < tosize)
    ) {
      return [
        -((350 - this.bx) * 2) - (t * dx / 10 * 4),
        t * dy / 10 * 4,
        bsize + ((tosize - bsize) * (t - this.data) / 20),
      ];
    } else if ((bsize + ((tosize - bsize) * (t - this.data) / 20)) >= tosize) {
      return [
        -((350 - this.bx) * 2) - (t * dx / 10 * 4),
        t * dy / 10 * 4,
        tosize,
      ];
    }
    this.data = t;
    return [t * dx / 10 * 4, t * dy / 10 * 4, bsize];
  };
}
function sprit(dx = 0, dy = 10, size = 3, r = 1): MoveFunc {
  return function (t) {
    if ((t * dy / 10 * 4) >= (this.parent.game.me.st.y - 500)) {
      return [
        130 * r,
        t * dy / 10 * 4,
        size,
      ];
    }
    return [t * dx / 10 * 4, t * dy / 10 * 4, size];
  };
}
function spider1(dx = 0, dy = 10, size = 3, rl = 1, s = 100): MoveFunc {
  return function (t) {
    if ((t * dy / 10 * 4) >= (this.parent.game.me.st.y - 550)) {
      return [
        0,
        this.parent.game.me.st.y - 550,
        size,
      ];
    }
    return [t * dx / 10 * 4, t * dy / 10 * 4, size];
  };
}
function spider2(dx = 0, dy = 10, size = 3, rl = 1, s = 100): MoveFunc {
  return function (t) {
    if ((t * dy / 10 * 4) >= (this.parent.game.me.st.y - 550)) {
      return [
        0,
        this.parent.game.me.st.y - 550 + 30,
        size,
      ];
    }
    return [t * dx / 10 * 4, t * dy / 10 * 4, size];
  };
}
function spider3(dx = 0, dy = 10, size = 3, rl = 1, s = 100): MoveFunc {
  return function (t) {
    if ((t * dy / 10 * 4) > (this.parent.game.me.st.y - 550)) {
      return [
        0,
        this.parent.game.me.st.y - 550 - 30,
        size,
      ];
    }
    return [t * dx / 10 * 4, t * dy / 10 * 4, size];
  };
}
function spider4(dx = 0, dy = 10, size = 3, rl = 1, s = 100): MoveFunc {
  return function (t) {
    if ((t * dy / 10 * 4) > (this.parent.game.me.st.y - 550)) {
      return [
        15 * Math.sqrt(3),
        this.parent.game.me.st.y - 550 + 15,
        size,
      ];
    }
    return [t * dx / 10 * 4, t * dy / 10 * 4, size];
  };
}
function spider5(dx = 0, dy = 10, size = 3, rl = 1, s = 100): MoveFunc {
  return function (t) {
    if ((t * dy / 10 * 4) > (this.parent.game.me.st.y - 550)) {
      return [
        15 * Math.sqrt(3),
        this.parent.game.me.st.y - 550 - 15,
        size,
      ];
    }
    return [t * dx / 10 * 4, t * dy / 10 * 4, size];
  };
}
function spider6(dx = 0, dy = 10, size = 3, rl = 1, s = 100): MoveFunc {
  return function (t) {
    if ((t * dy / 10 * 4) > (this.parent.game.me.st.y - 550)) {
      return [
        -15 * Math.sqrt(3),
        this.parent.game.me.st.y - 550 + 15,
        size,
      ];
    }
    return [t * dx / 10 * 4, t * dy / 10 * 4, size];
  };
}
function spider7(dx = 0, dy = 10, size = 3, rl = 1, s = 100): MoveFunc {
  return function (t) {
    if ((t * dy / 10 * 4) > (this.parent.game.me.st.y - 550)) {
      return [
        -15 * Math.sqrt(3),
        this.parent.game.me.st.y - 550 - 15,
        size,
      ];
    }
    return [t * dx / 10 * 4, t * dy / 10 * 4, size];
  };
}
function fusen(dx = 0, s = 10, bsize = 1, tosize = 3): MoveFunc {
  return function (t) {
    if (!this.data) {
      this.data = 0;
    }
    if (
      (t * s / 10 * 4) > (this.parent.game.me.st.y - 520) &&
      ((bsize + ((tosize - bsize) * (t - this.data) / 43)) < tosize)
    ) {
      return [
        t * dx / 10 * 4,
        t * s / 10 * 4,
        bsize + ((tosize - bsize) * (t - this.data) / 43),
      ];
    } else if ((bsize + ((tosize - bsize) * (t - this.data) / 43)) >= tosize) {
      return [t * dx / 10 * 4, t * s / 10 * 4, tosize];
    }
    this.data = t;
    return [t * dx / 10 * 4, t * s / 10 * 4, bsize];
  };
}
function fuwa1(size = 3): MoveFunc {
  return function (t) {
    if (t <= 130) {
      return [
        -0.3 * t,
        3 * t,
        size,
      ];
    }
    {
      return [
        -0.3 * 130 + 0.45 * (t - 130),
        3 * t,
        size,
      ];
    }
  };
}
function fu1(speed = 2.5, kai = Math.PI * 0.05 / 180, size = 3): MoveFunc {
  return (t) => {
    return[speed * t * Math.sin((-Math.PI * 12 / 180) + kai * t ), speed * t * Math.cos((-Math.PI * 12 / 180) + kai * t ), size];
  };
}
function curve(h = 1, w = 1.1, s = 13, size = 3, [x, y] = [0, 0]): MoveFunc {
  return (t) => {
    return [-Math.sin(t * w / 5.7) * h * 50 + x, t * s / 10 * 4 + y, size];
  };
}
function wave(h = 1, w = 1.1, s = 13, size = 3, x = 0, y = 0): MoveFunc {
  return function (t) {
    this.bx = x;
    this.by = y;
    return [-Math.sin(t * w / 5.7) * h * 50, t * s / 10 * 4, size];
  };
}
/*function swim(h = 1, w = 1.1, s = 13, size = 3, dh = 0.1): MoveFunc {
  return (t) => {
    return [-Math.sin(t * w / 5.7) * (h + (dh * t)) * 50, t * s / 10 * 4, size];
  };
}*/
function swim(h = 1, w = 1.1, s = 13, size = 3, [x, y] = [0, 0]): MoveFunc {
  return (t) => {
    return [-Math.sin(t * w / 5.7) * h * 50 * t + x, t * s / 10 * 4 + y, size];
  };
}
/*function fastswim(h = 1, w = 1.1, s = 13, size = 3, dh = 0.1): MoveFunc {
  return (t) => {
    return [
      -Math.sin(t * w / 5.7) * (h + (dh * t * t)) * 50,
      t * s / 10 * 4,
      size,
    ];
  };
}*/
function ago(h = 1, w = 1.1, s = 13, size = 3, [x, y] = [0, 0]): MoveFunc {
  return (t) => {
    return [
      -Math.abs(Math.sin(t * w / 5.7) * h * 50) + x,
      (t * s / 10 * 4) + y,
      size,
    ];
  };
}
function damashi(s = 19, l = 0, size = 3, w = 1): MoveFunc {
  if (l) {
    return function (t) {
      if (!this.data) {
        this.data = 0;
      }
      if ((t * s / 10 * 4) > ((this.parent.game.me.st.y - 500) * 2 * 0.5)) {
        return [w * (t - this.data), t * s / 10 * 4, size];
      }
      this.data = t;
      return [0, t * s / 10 * 4, size];
    };
  } else {
    return function (t) {
      if (!this.data) {
        this.data = 0;
      }
      if ((t * s / 10 * 4) > ((this.parent.game.me.st.y - 500) * 2 * 0.5)) {
        return [-w * (t - this.data), t * s / 10 * 4, size];
      }
      this.data = t;
      return [0, t * s / 10 * 4, size];
    };
  }
}

function yura(h = 1, w = 1.1, s = 13, size = 3): MoveFunc {
  return (t) => {
    return [
      -Math.sin(t * w / 20) * h * 40 + (Math.sin(t * w / 50) * 20 * h),
      t * s / 10 * 3,
      size,
    ];
  };
}
function yura2(
  h = 1,
  w = 1.1,
  s = 1,
  size = 3,
  dy = 0,
  [x, y] = [0, 0],
): MoveFunc {
  return (t) => {
    return [
      -Math.sin(t * w / 20) * h + x,
      ((1 / (s * w)) * ((10 * Math.sin(t * w / 10)) + t * w)) + y + t * dy,
      size,
    ];
  };
}
function charge(s = 0.5, size = 3): MoveFunc {
  return (t) => {
    return [
      0,
      1600 - s * 16000 / (t / 30 + 10 * s),
      size,
    ];
  };
}
function rokuro(
  q = 112,
  dr = 0.45,
  p = 35,
  kaiten = 0.05,
  dy = 3,
  size = 3,
  z = 0,
  when = 10,
): MoveFunc {
  return (t) => {
    if (t < when) {
      return [
        ((q - dr * when) / 2) * Math.sin(t * Math.PI * 0.1 + 1 / 2 * Math.PI) -
        (q - dr * when) / 2,
        -((p - when * dr / 10) / 2) *
          Math.cos(t * Math.PI * 0.1 + 1 / 2 * Math.PI) + z + dy * t,
        size,
      ];
    }
    return [
      (q - dr * (t - when)) *
      Math.sin((t - when) * Math.PI * kaiten - 1 / 2 * Math.PI),
      -(p - (t - when) * dr / 10) *
        Math.cos((t - when) * Math.PI * kaiten - 1 / 2 * Math.PI) + z + dy * t,
      size,
    ];
  };
}

function delay(time: number, f: MoveFunc): MoveFunc {
  return function (t, extra) {
    if (time > t) {
      this.data = t;
      return [700, 0, 0];
    } else {
      return f.call(this, t - this.data, extra);
    }
  };
}
function syuki(param: Record<number, MoveFunc>, count: number): MoveFunc {
  return function (t, extra) {
    return (param as any)[extra!.count % count].call(this, t, extra);
  };
}
function X(param: {
  1: MoveFunc;
  2: MoveFunc;
  3: MoveFunc;
  4: MoveFunc;
  5: MoveFunc;
  6: MoveFunc;
  7: MoveFunc;
  8: MoveFunc;
  9: MoveFunc;
  10: MoveFunc;
}): MoveFunc {
  return function (t, extra) {
    if (extra && extra?.cost) {
      return (param as any)[extra.cost].call(this, t, extra);
    } else {
      return [0, 0, 10000];
    }
  };
}

function huurie(x = 100, dx = 1, size = 3): MoveFunc {
  return (t) => {
    return [
      -(4 * x / Math.PI) *
      (Math.sin(t * dx / 9) + Math.sin(t * dx * 3 / 9) / 3 +
        Math.sin(t * dx * 5 / 9) / 5 + Math.sin(t * dx * 7 / 9) / 7 +
        Math.sin(t * dx * 9 / 9) / 9),
      (t * dx * Math.PI) * 3,
      size,
    ];
  };
}
function snake(
  size = 1.5,
  dy = 120 / 18,
  dx = 1.2,
  a = 18,
  b = 30,
  c = 25,
  add = 0,
): MoveFunc {
  return function (t) {
    t += add;
    if (t % (2 * a + 2 * b + 2 * c) <= a) {
      return [
        0,
        (t % (2 * a + 2 * b + 2 * c)) * dy +
        2 * a * ((t - t % (2 * a + 2 * b + 2 * c)) / (2 * a + 2 * b + 2 * c)) *
          dy,
        size,
      ];
    } else if (t % (2 * a + 2 * b + 2 * c) <= (a + b)) {
      return [
        0,
        a * dy +
        2 * a * ((t - t % (2 * a + 2 * b + 2 * c)) / (2 * a + 2 * b + 2 * c)) *
          dy,
        size,
      ];
    } else if (t % (2 * a + 2 * b + 2 * c) <= (a + b + c)) {
      return [
        -dx * (t % (2 * a + 2 * b + 2 * c) - a - b),
        a * dy +
        2 * a * ((t - t % (2 * a + 2 * b + 2 * c)) / (2 * a + 2 * b + 2 * c)) *
          dy,
        size,
      ];
    } else if (t % (2 * a + 2 * b + 2 * c) <= (2 * a + b + c)) {
      return [
        -dx * c,
        (t % (2 * a + 2 * b + 2 * c) - b - c) * dy +
        2 * a * ((t - t % (2 * a + 2 * b + 2 * c)) / (2 * a + 2 * b + 2 * c)) *
          dy,
        size,
      ];
    } else if (t % (2 * a + 2 * b + 2 * c) <= (2 * a + 2 * b + c)) {
      return [
        -dx * c,
        2 * a * dy +
        2 * a * ((t - t % (2 * a + 2 * b + 2 * c)) / (2 * a + 2 * b + 2 * c)) *
          dy,
        size,
      ];
    } else {
      return [
        -dx * c + dx * (t % (2 * a + 2 * b + 2 * c) - (2 * a + 2 * b + c)),
        2 * a * dy +
        2 * a * ((t - t % (2 * a + 2 * b + 2 * c)) / (2 * a + 2 * b + 2 * c)) *
          dy,
        size,
      ];
    }
  };
}
function inazuma(dy = 0.45, size = 3, x = 45, speed = 8, add = 3): MoveFunc {
  return (t) => {
    t += add;
    return [
      (8 * x / (Math.PI * Math.PI)) *
      (Math.sin(t * dy / 2) - Math.sin(t * dy * 3 / 2) / 9 +
        Math.sin(t * dy * 5 / 2) / 25 - Math.sin(t * dy * 7 / 2) / 49 +
        Math.sin(t * dy * 9 / 2) / 81 - Math.sin(t * dy * 11 / 2) / 121 +
        Math.sin(t * dy * 13 / 2) / 169 - Math.sin(t * dy * 15 / 2) / 225 +
        Math.sin(t * dy * 17 / 2) / 289 - Math.sin(t * dy * 19 / 2) / 361 +
        Math.sin(t * dy * 21 / 2) / 441),
      (t * dy * Math.PI) * speed - 70,
      size,
    ];
  };
}
function shinaru(
  speed = 10,
  s = 2500,
  z = 0,
  w = 700,
  size = 12,
  [x, y] = [0, -50],
): MoveFunc {
  return (t) => {
    return [
      (-(1 / s) * ((t * speed) - z) * ((t * speed) - w)) + x,
      (t * speed) + y,
      size,
    ];
  };
}
function daen2(
  p = 360,
  q = 40,
  speed = 0.015,
  size = 3,
  z = 300,
  θ = 2,
  add = 0,
): MoveFunc {
  return (t) => {
    t += add;
    if ((t * speed) <= θ) {
      return [
        q * Math.sin(t * Math.PI * speed),
        -p * Math.cos(t * Math.PI * speed) + z,
        size,
      ];
    } else θ <= (t * speed);
    {
      return [0, -140000000, size];
    }
  };
}
function daen3(
  p = 360,
  q = 40,
  speed = 0.015,
  size = 3,
  z = 300,
  θ = 2,
  add = 0,
  dx = -1.1,
): MoveFunc {
  return (t) => {
    t += add;
    if ((t * speed) <= θ) {
      return [
        (q * Math.sin(t * Math.PI * speed)) + t * dx,
        -p * Math.cos(t * Math.PI * speed) + z,
        size,
      ];
    } else θ <= (t * speed);
    {
      return [0, -140000000, size];
    }
  };
}

function tubo(
  d = 1,
  speed = 4.2,
  size = 3,
  [x, y] = [0, -20],
  add = -4,
): MoveFunc {
  return (t) => {
    t += add;
    return [
      (((((((t * speed) * 430 - 170000) / 1.4) ** 3) / 3) -
            3000000000 * (((t * speed) * 430 - 170000) / 1.4)) / 2700000000000 +
        x + 137) * d,
      (t * speed) + y,
      size,
    ];
  };
}
function lcurve(
  h = 1,
  w = 1.1,
  s = 13,
  size = 3,
  [x, y] = [0, 0],
  zurasi = 0,
  dy = 0,
): MoveFunc {
  return (t) => {
    return [
      Math.sin(t * w / 5.7) * h * 50 + x - zurasi * t / 10,
      t * s / 10 * 4 + y + t * dy,
      size,
    ];
  };
}
function nizikansu(
  speed = 7.5,
  p = 0,
  q = 100,
  size = 3,
  r = 4500,
  [x, y] = [0, 0],
): MoveFunc {
  return (t) => {
    return [
      -((t * speed - p) * (t * speed - q)) / r + x,
      t * speed + y,
      size,
    ];
  };
}

export function load_skill(star: Star) {
  star.skill = [
    skill_list[star.skill_select[0]],
    skill_list[star.skill_select[1]],
    skill_list[star.skill_select[2]],
  ];
  star.skill_gage[0].innerText = star.skill[0].name;
  star.skill_gage[1].innerText = star.skill[1].name;
  star.skill_gage[2].innerText = star.skill[2].name;
  star.skill_gage_cost[0].innerText = star.skill[0].X
    ? "X"
    : star.skill[0].cost + "";
  star.skill_gage_cost[1].innerText = star.skill[1].X
    ? "X"
    : star.skill[1].cost + "";
  star.skill_gage_cost[2].innerText = star.skill[2].X
    ? "X"
    : star.skill[2].cost + "";
  p_skill(star);
}
export function p_skill(star: Star) {
  const pStatus = [
    '<span class="pstar2">　　</span>',
    '<span class="pstar">　　</span>',
  ];
  star.skill_gage_cost[0].innerText = star.skill[0].X
    ? "X"
    : star.skill[0].cost + "";
  star.skill_gage_cost[1].innerText = star.skill[1].X
    ? "X"
    : star.skill[1].cost + "";
  star.skill_gage_cost[2].innerText = star.skill[2].X
    ? "X"
    : star.skill[2].cost + "";
  if (star.st.p < star.skill[1].p) {
    star.skill_gage_cost[1].innerHTML = pStatus[1].repeat(star.st.p);
    star.skill_gage_cost[1].innerHTML += pStatus[0].repeat(
      star.skill[1].p - star.st.p,
    );
  }
  if (star.st.p < (star.skill[1].p + star.skill[2].p)) {
    star.skill_gage_cost[2].innerHTML = pStatus[1].repeat(
      (star.st.p - star.skill[1].p) > 0 ? (star.st.p - star.skill[1].p) : 0,
    );
    star.skill_gage_cost[2].innerHTML += pStatus[0].repeat(
      (star.skill[1].p + star.skill[2].p - star.st.p) < star.skill[2].p
        ? (star.skill[1].p + star.skill[2].p - star.st.p)
        : star.skill[2].p,
    );
  }
}
export const skill_list: SkillDef[] = [
  { // 0
    p: 0,
    cost: 1,
    name: "しょぼショット",
    shots: [
      { func: dFunc(0, 6.12, 3) },
    ],
  },
  { // 1
    p: 2,
    cost: 5,
    name: "トリプルスター", //未減速
    shots: [
      {
        func: dFunc(
          15 * Math.sin((16.87 / 180) * Math.PI),
          15 * Math.cos((16.87 / 180) * Math.PI),
          3,
          0,
          [0, -10],
        ),
      },
      { func: dFunc(0, 15, 5, 0, [0, -10]) },
      {
        func: dFunc(
          -15 * Math.sin((16.87 / 180) * Math.PI),
          15 * Math.cos((16.87 / 180) * Math.PI),
          3,
          0,
          [0, -10],
        ),
      },
    ],
  },
  { // 2
    p: 2,
    cost: 7,
    name: "プチだんまく", //未
    shots: puchidanmaku(),
  },
  { // 3
    p: 0,
    cost: 2,
    name: "ショット",
    shots: [
      { func: dFunc(0, 16.6, 3) },
    ],
  },
  { // 4
    p: 2,
    cost: 3,
    name: "だましレフト",
    shots: [
      { func: damashi(16.6, 1, 3, 1.7), delay: 0 },
    ],
  },
  { // 5
    p: 2,
    cost: 7,
    name: "スピードショット",
    shots: [
      { func: dFunc(0, 46.5, 3, 0, [0, 10]), delay: 0 },
    ],
  },
  { // 6
    p: 0,
    cost: 2,
    name: "カーブショット",
    shots: [
      //{ func: curve(0.98, 0.93, 12.21), delay: 0 },
      { func: curve(0.98, 0.93, 12.21), delay: 0 },
    ],
  },
  { // 7
    p: 2,
    cost: 5,
    name: "さんれんぱつ",
    shots: [
      { func: dFunc(0, 18.8, 3), delay: 0 },
      { func: dFunc(0, 18.8, 3), delay: 170 },
      { func: dFunc(0, 18.8, 3), delay: 320 },
    ],
  },
  { // 8
    p: 2,
    cost: 8,
    name: "はっぽんあし",
    shots: [
      { func: dFunc(0.00, 14, 3, 0, [0, 10]), delay: 270 },
      { func: curve(0.40, 0.93, 14, 3, [0, 10]), delay: 415 },
      { func: curve(0.80, 0.93, 14, 3, [0, 10]), delay: 560 },
      { func: curve(1.20, 0.93, 14, 3, [0, 10]), delay: 705 },
      { func: curve(1.60, 0.93, 14, 3, [0, 10]), delay: 850 },
      { func: curve(2.00, 0.93, 14, 3, [0, 10]), delay: 995 },
      { func: curve(2.40, 0.93, 14, 3, [0, 10]), delay: 1140 },
      { func: curve(2.80, 0.93, 14, 3, [0, 10]), delay: 1285 },
    ],
  },
  { // 9
    p: 0,
    cost: 2,
    name: "オバケショット",
    shots: [
      { func: dFunc(0, 14.28, 3), obake: true },
    ],
  },
  { // 10
    p: 2,
    cost: 3,
    name: "オバケカーブ",
    shots: [
      { func: curve(-0.98, 0.928, 12.21, 3), obake: true },
    ],
  },
  { // 11
    p: 2,
    cost: 8,
    name: "オバケファイブ",
    shots: five(22.3125, false, 300, true),
  },
  { // 12
    p: 0,
    cost: 2,
    name: "ドリルショット",
    shots: [
      { func: dFunc(0, 14.28, 3), delay: 0, drill: true },
    ],
  },
  { // 13
    p: 1,
    cost: 2,
    name: "スロードリル",
    shots: [
      { func: dFunc(0, 2.54, 3), delay: 0, drill: true },
    ],
  },
  { // 14
    p: 3,
    cost: 8,
    name: "ドリルファイブ",
    shots: five(24.62, true),
  },
  { // 15
    p: 0,
    cost: 2,
    name: "ヘヴィショット",
    shots: [
      { func: dFunc(0, 10.5, 9.7), delay: 0 },
    ],
  },
  { // 16
    p: 3,
    cost: 5,
    name: "スーパーヘヴィ",
    shots: [
      { func: dFunc(0, 11.2, 20.5), delay: 0 },
    ],
  },
  { // 17
    p: 2,
    cost: 9,
    name: "だんまく", //未
    shots: danmaku(),
  },
  { // 18
    p: 0,
    cost: 1,
    name: "プチショット",
    shots: [
      { func: dFunc(0, 8.13, 1.5), delay: 0 },
    ],
  },
  { // 19
    p: 1,
    cost: 2,
    name: "プチツイン",
    shots: [
      {
        func: dFunc(
          8.05 * Math.sin((16.69 / 180) * Math.PI),
          8.05 * Math.cos((16.69 / 180) * Math.PI),
          1.5,
        ),
        delay: 0,
      },
      {
        func: dFunc(
          -8.05 * Math.sin((16.69 / 180) * Math.PI),
          8.05 * Math.cos((16.69 / 180) * Math.PI),
          1.5,
        ),
        delay: 0,
      },
    ],
  },
  { // 20
    p: 2,
    cost: 6,
    name: "ジャンボふうせん",
    shots: [
      { func: fusen(0, 8.11, 1.5, 31), delay: 0, texture: "BOX" },
    ],
  },
  { // 21
    p: 0,
    cost: 1,
    name: "ナメショット", //未
    shots: [
      { func: curve(0.45, 0.95, 2.56), delay: 0 },
    ],
  },
  { // 22
    p: 1,
    cost: 4,
    name: "ナメヘヴィ", //未
    shots: [
      { func: curve(0.6, 0.7, 3.2, 10), delay: 0, drill: true },
    ],
  },
  { // 23
    p: 2,
    cost: 6,
    name: "ナメスプレッド",
    shots: name_spread(),
  },
  { // 24
    p: 10,
    cost: 10,
    name: "ふわふわショット",
    shots: [],
  },
  { // 25
    p: 10,
    cost: 10,
    name: "ヒツジをよぶ",
    shots: [],
  },
  { // 26
    p: 10,
    cost: 10,
    name: "ふわふわスター",
    shots: [],
  },
  { // 27
    p: 0,
    cost: 2,
    name: "ゆらゆらショット",
    shots: [
      { func: yura2(65, 1.47, 100, 3, 4, [0, 0]), delay: 0 },
      //{ func: curve(1.3, 0.4, 9.7), delay: 0 }
    ],
  },
  { // 28
    p: 2,
    cost: 5,
    name: "イカスプレッド", //未
    shots: i_spread(),
  },
  { // 29
    p: 2,
    cost: 10,
    name: "じゅっぽんあし",
    shots: [
      { func: dFunc(0.00, 68 / 3, 3, 0, [0, 10]), delay: 300 },
      { func: curve(0.375, 0.97, 68 / 3, 3, [0, 10]), delay: 460 },
      { func: curve(0.750, 0.97, 68 / 3, 3, [0, 10]), delay: 620 },
      { func: curve(1.125, 0.97, 68 / 3, 3, [0, 10]), delay: 780 },
      { func: curve(1.500, 0.97, 68 / 3, 3, [0, 10]), delay: 940 },
      { func: curve(1.875, 0.97, 68 / 3, 3, [0, 10]), delay: 1100 },
      { func: curve(2.250, 0.97, 68 / 3, 3, [0, 10]), delay: 1260 },
      { func: curve(2.625, 0.97, 68 / 3, 3, [0, 10]), delay: 1420 },
      { func: curve(3.000, 0.97, 68 / 3, 3, [0, 10]), delay: 1580 },
      { func: curve(3.375, 0.97, 68 / 3, 3, [0, 10]), delay: 1740 },
    ],
  },
  { // 30
    p: 0,
    cost: 3,
    name: "ヘヴィドリル",
    shots: [
      { func: dFunc(0, 12.2, 11.5), delay: 0, drill: true },
    ],
  },
  { // 31
    p: 1,
    cost: 5,
    name: "ライオンボム",
    shots: [
      {
        func: effect((p) => {
          p.isme && p.parent.game.setStruct(p.parent.game.me, 14);
        }),
        delay: 0,
      },
    ],
  },
  { // 32
    p: 4,
    cost: 10,
    name: "ハイパーショット",
    shots: [
      { func: dFunc(0, 44.625, 25), delay: 2500, drill: true },
    ],
  },
  { // 33
    p: 0,
    cost: 2,
    name: "ショートエイム",
    shots: [
      { func: shortaim(95) },
    ],
  },
  { // 34
    p: 2,
    cost: 2,
    name: "ロングエイム",
    shots: [
      { func: longaim(95) },
    ],
  },
  { // 35
    p: 2,
    cost: 4,
    name: "ターンエイム つかうな", //未
    shots: [
      { func: turnaim(60) },
    ],
  },
  { // 36
    p: 0,
    cost: 2,
    name: "スイム", //未
    shots: [
      //{ func: swim(0.15, 0.5, 9.3, 3, 0.0084), delay: 0 },
      { func: swim(0.013, 0.5, 9.7, 3), delay: 0 },
    ],
  },
  { // 37
    p: 2,
    cost: 5,
    name: "ソナー", //未
    shots: [
      { func: dFunc(0, 18, 1.5, 0, [0, -20]), delay: 0 },
      { func: dFuncif(9, 9, 0, 18, 30, 0, 1.5, [0, -20]), delay: 0 },
      { func: dFuncif(-9, 9, 0, 18, 30, 0, 1.5, [0, -20]), delay: 0 },
      {
        func: dKaitenFuncif(
          0.8,
          0.1,
          (1 / 2) * Math.PI,
          0.1,
          0,
          3.6,
          0,
          7.2,
          30,
          0,
          1.5,
          [0, -20],
          0,
          0,
        ),
        delay: 0,
      },
      { func: dFuncif(0, 0, 0, 18, 30, 0, 1.5, [0, -20]), delay: 0 },
    ],
  },
  { // 38
    p: 2,
    cost: 6,
    name: "ぎょらい", //未
    shots: [
      { func: kasoku(0, 1.3, 6.5, 0, [113, -100]), delay: 400 },
      { func: kasoku(0, 1.3, 6.5, 0, [-113, -100]), delay: 400 },
    ],
  },
  { // 39
    p: 0,
    cost: 1,
    X: true,
    name: "てんびんショット", //未
    shots: [
      {
        func: X({
          1: dFunc(0, 9.3, 1.5),
          2: dFunc(0, 9.3, 5),
          3: dFunc(0, 11, 15),
          4: dFunc(0, 12, 19),
          5: dFunc(0, 13, 23),
          6: dFunc(0, 13, 23),
          7: dFunc(0, 12, 19),
          8: dFunc(0, 11, 15),
          9: dFunc(0, 9.3, 5),
          10: dFunc(0, 9.3, 1.5),
        }),
        delay: 0,
      },
    ],
  },
  { // 40
    p: 2,
    cost: 6,
    name: "デルタ",
    shots: [
      {
        func: KaitenFuncif(
          0,
          (12 / 24) * Math.PI,
          -0.004 * Math.PI,
          -0.004 * Math.PI,
          0,
          2.5,
          0,
          2.5,
          0.25 / 0.004,
          0,
          1.5,
          [0, -65],
          3,
          0,
        ),
        delay: 0,
        drill: true,
      },
      {
        func: KaitenFuncif(
          0,
          (-4 / 24) * Math.PI,
          -0.004 * Math.PI,
          -0.004 * Math.PI,
          0,
          2.5,
          0,
          2.5,
          0.25 / 0.004,
          0,
          1.5,
          [0, -65],
          3,
          0,
        ),
        delay: 0,
        drill: true,
      },
      {
        func: KaitenFuncif(
          0,
          (28 / 24) * Math.PI,
          -0.004 * Math.PI,
          -0.004 * Math.PI,
          0,
          2.5,
          0,
          2.5,
          0.25 / 0.004,
          0,
          1.5,
          [0, -65],
          3,
          0,
        ),
        delay: 0,
        drill: true,
      },
      {
        func: KaitenFuncif(
          0,
          (-12 / 24) * Math.PI,
          -0.004 * Math.PI,
          -0.004 * Math.PI,
          0,
          2.5,
          0,
          2.5,
          0.25 / 0.004,
          0,
          1.5,
          [0, -65],
          1.5,
          0,
        ),
        delay: 0,
        drill: true,
      },
      {
        func: KaitenFuncif(
          0,
          (4 / 24) * Math.PI,
          -0.004 * Math.PI,
          -0.004 * Math.PI,
          0,
          2.5,
          0,
          2.5,
          0.25 / 0.004,
          0,
          1.5,
          [0, -65],
          1.5,
          0,
        ),
        delay: 0,
        drill: true,
      },
      {
        func: KaitenFuncif(
          0,
          (20 / 24) * Math.PI,
          -0.004 * Math.PI,
          -0.004 * Math.PI,
          0,
          2.5,
          0,
          2.5,
          0.25 / 0.004,
          0,
          1.5,
          [0, -65],
          1.5,
          0,
        ),
        delay: 0,
        drill: true,
      },
    ],
  },
  { // 41
    p: 2,
    cost: 9,
    name: "ヘキサ", //未
    shots: [
      {
        func: KaitenFuncif(
          0,
          (12 / 24) * Math.PI,
          0.0052 * Math.PI,
          0.0052 * Math.PI,
          0,
          2.7,
          0,
          2.7,
          (1 / 6) / 0.0052,
          0,
          1.5,
          [0, -65],
          8.9,
          0,
        ),
        delay: 100,
        drill: true,
      },

      {
        func: KaitenFuncif(
          0,
          (-4 / 24) * Math.PI,
          0.0052 * Math.PI,
          0.0052 * Math.PI,
          0,
          2.7,
          0,
          2.7,
          (1 / 6) / 0.0052,
          0,
          1.5,
          [0, -65],
          8.9,
          0,
        ),
        delay: 100,
        drill: true,
      },

      {
        func: KaitenFuncif(
          0,
          (28 / 24) * Math.PI,
          0.0052 * Math.PI,
          0.0052 * Math.PI,
          0,
          2.7,
          0,
          2.7,
          (1 / 6) / 0.0052,
          0,
          1.5,
          [0, -65],
          8.9,
          0,
        ),
        delay: 100,
        drill: true,
      },

      {
        func: KaitenFuncif(
          0,
          (-12 / 24) * Math.PI,
          0.0052 * Math.PI,
          0.0052 * Math.PI,
          0,
          2.7,
          0,
          2.7,
          (1 / 6) / 0.0052,
          0,
          1.5,
          [0, -65],
          8.9,
          0,
        ),
        delay: 100,
        drill: true,
      },

      {
        func: KaitenFuncif(
          0,
          (4 / 24) * Math.PI,
          0.0052 * Math.PI,
          0.0052 * Math.PI,
          0,
          2.7,
          0,
          2.7,
          (1 / 6) / 0.0052,
          0,
          1.5,
          [0, -65],
          8.9,
          0,
        ),
        delay: 100,
        drill: true,
      },

      {
        func: KaitenFuncif(
          0,
          (20 / 24) * Math.PI,
          0.0052 * Math.PI,
          0.0052 * Math.PI,
          0,
          2.7,
          0,
          2.7,
          (1 / 6) / 0.0052,
          0,
          1.5,
          [0, -65],
          8.9,
          0,
        ),
        delay: 100,
        drill: true,
      },

      /*{ func: dFuncif(0, 2 * 2.7, 0, 2.68 * 2.7, (1 / 6) / 0.0052, 0, 1.5, [0, -65]), drill: true},*/
      {
        func: KaitenFuncif(
          0,
          (16 / 24) * Math.PI,
          0.0052 * Math.PI,
          0.0052 * Math.PI,
          0,
          2.7,
          0,
          2.7,
          (1 / 6) / 0.0052,
          0,
          1.5,
          [0, -65],
          4.45,
          0,
        ),
        delay: 100,
        drill: true,
      },

      {
        func: KaitenFuncif(
          0,
          (0 / 24) * Math.PI,
          0.0052 * Math.PI,
          0.0052 * Math.PI,
          0,
          2.7,
          0,
          2.7,
          (1 / 6) / 0.0052,
          0,
          1.5,
          [0, -65],
          4.45,
          0,
        ),
        delay: 100,
        drill: true,
      },

      {
        func: KaitenFuncif(
          0,
          (32 / 24) * Math.PI,
          0.0052 * Math.PI,
          0.0052 * Math.PI,
          0,
          2.7,
          0,
          2.7,
          (1 / 6) / 0.0052,
          0,
          1.5,
          [0, -65],
          4.45,
          0,
        ),
        delay: 100,
        drill: true,
      },

      {
        func: KaitenFuncif(
          0,
          (-8 / 24) * Math.PI,
          0.0052 * Math.PI,
          0.0052 * Math.PI,
          0,
          2.7,
          0,
          2.7,
          (1 / 6) / 0.0052,
          0,
          1.5,
          [0, -65],
          4.45,
          0,
        ),
        delay: 100,
        drill: true,
      },

      {
        func: KaitenFuncif(
          0,
          (8 / 24) * Math.PI,
          0.0052 * Math.PI,
          0.0052 * Math.PI,
          0,
          2.7,
          0,
          2.7,
          (1 / 6) / 0.0052,
          0,
          1.5,
          [0, -65],
          4.45,
          0,
        ),
        delay: 100,
        drill: true,
      },

      {
        func: KaitenFuncif(
          0,
          (24 / 24) * Math.PI,
          0.0052 * Math.PI,
          0.0052 * Math.PI,
          0,
          2.7,
          0,
          2.7,
          (1 / 6) / 0.0052,
          0,
          1.5,
          [0, -65],
          4.45,
          0,
        ),
        delay: 100,
        drill: true,
      },
    ],
  },
  { // 42
    p: 0,
    cost: 2,
    name: "ピエロショット",
    shots: [
      { func: dFunc(0, 16.6, 3), delay: 0 },
    ],
  },
  { // 43
    p: 2,
    cost: 4,
    name: "ミラーショット",
    shots: [
      { func: mirror(0, 16.6, 3), delay: 0 },
    ],
  },
  { // 44
    p: 2,
    cost: 5,
    name: "だましダブル",
    shots: [
      { func: damashi(16.6, 1, 3, 1.7), delay: 0 }, //1.6?
      { func: damashi(16.6, 0, 3, 1.7), delay: 0 },
    ],
  },
  { // 45
    p: 0,
    cost: 2,
    name: "よいどれショット",
    shots: [ //未
      { func: yoidore(), delay: 0 },
    ],
  },
  { // 46
    p: 1,
    cost: 4,
    name: "カピバラをよぶ",
    shots: [
      {
        func: effect((p) => {
          p.isme && p.parent.game.setStruct(p.parent.game.me, 17);
        }),
        delay: 0,
      },
    ],
  },
  { // 47
    p: 2,
    cost: 8,
    name: "よいどれラッシュ",
    shots: rush(80 / 71), //未
  },
  { // 48
    p: 0,
    cost: 3,
    name: "ドリルカーブ",
    shots: [
      { func: curve(1.5, 0.89, 10.273), delay: 0, drill: true },
    ],
  },
  { // 49
    p: 2,
    cost: 5,
    name: "ムーンサルト",
    shots: [
      //{ func: curve(6, 0.2, 16.605), delay: 0 },
      { func: nizikansu(16.605 * 0.4, 0, 625, 3, -320, [0, 0]), delay: 0 },
    ],
  },
  { // 50
    p: 2,
    cost: 8,
    name: "ムーンスプレッド",
    shots: m_spread(-1),
  },
  { // 51
    p: 0,
    cost: 3,
    name: "あわショット",
    shots: [
      { func: dFunc(0, 4.08, 1.5), delay: 0 },
      { func: dFunc(0, 9.18, 1.5), delay: 0 },
      { func: dFunc(0, 14.28, 1.5), delay: 0 },
    ],
  },
  { // 52
    p: 2,
    cost: 6,
    name: "あわスプレー",
    shots: awasp(),
  },
  { // 53
    p: 2,
    cost: 8,
    name: "あわはなび",
    shots: awawash(),
  },
  { // 54
    p: 0,
    cost: 3,
    name: "ダブルショット",
    shots: [
      { func: curve(0.63, 0.965, 12.102, 3, [0, 10]), delay: 0 }, //0.65
      { func: curve(-0.63, 0.965, 12.102, 3, [0, 10]), delay: 0 }, //0.65
    ],
  },
  { // 55
    p: 2,
    cost: 4,
    name: "サイドアタック",
    shots: [ //微妙
      {
        func: dFuncif(57.5 * 2, -160 * 8 / 16, 0, 22, 5, 0, 3, [0, 10]),
        delay: 0,
      },
      {
        func: dFuncif(29 * 2, -160 * 8 / 16, 0, 22, 5, 0, 3, [0, 10]),
        delay: 0,
      },
      {
        func: dFuncif(-57.5 * 2, -160 * 8 / 16, 0, 22, 5, 0, 3, [0, 10]),
        delay: 0,
      },
      {
        func: dFuncif(-29 * 2, -160 * 8 / 16, 0, 22, 5, 0, 3, [0, 10]),
        delay: 0,
      },
    ],
  },
  { // 56
    p: 2,
    cost: 8,
    name: "ダブルムーン",
    shots: [ //済
      { func: curve(6, 0.235, 1428 / 71, 3, [0, -40]), delay: 100 },
      { func: curve(-6, 0.235, 1428 / 71, 3, [0, -40]), delay: 100 },
    ],
  },
  { // 57
    p: 0,
    cost: 2,
    name: "オバケヘヴィ",
    shots: [ //済
      { func: dFunc(0, 7.5, 9.3, 0, [0, -10]), obake: true },
    ],
  },
  { // 58
    p: 2,
    cost: 4,
    name: "きえる(連続使用はお控えください)",
    shots: [
      {
        func: effect((s) => {
          if (s.isme) {
            let t = 0;
            const interval = 50;
            const id = setInterval(() => {
              t++;
              if (t * interval < 1500) {
                s.star.star!.alpha = ((3000 / interval) - t) /
                  (3000 / interval);
              } else if (t * interval < 8500) {
                s.star.star!.alpha = 0.5;
              } else if (t * interval > 8500 && t * interval < 8800) {
                s.star.star!.alpha =
                  ((t - 8500 / interval) / (600 / interval)) + 0.5;
              } else if (t * interval === 8800) {
                s.star.star!.alpha = 1;
                clearInterval(id);
              }
            }, interval);
          } else {
            let t = 0;
            const interval = 50;
            const id = setInterval(() => {
              t++;
              if (t * interval < 1500) {
                s.star.star!.alpha = ((1500 / interval) - t) /
                  (1500 / interval);
              } else if (t * interval < 8500) {
                s.star.star!.alpha = 0;
              } else if (t * interval > 8500 && t * interval < 8800) {
                s.star.star!.alpha = (t - 8500 / interval) / (300 / interval);
              } else if (t * interval === 8800) {
                s.star.star!.alpha = 1;
                clearInterval(id);
              }
            }, interval);
          }
        }),
        delay: 0,
      },
    ],
  },
  { // 59
    p: 2,
    cost: 6,
    name: "スーパーオバケ",
    shots: [ //未
      { func: dFunc(0, 12.7, 26, 0, [0, -20]), obake: true },
    ],
  },
  { // 60
    p: 0,
    cost: 3,
    name: "はばたき",
    shots: [ //未
      //{ func: lcurve(2.5, 0.09, 18.5, 3, [7, -5], 3) },
      //{ func: lcurve(0.6, 0.2, 19, 3, [-2, 1], 9) },

      //{ func: fly(7.5, 0, 200, 3, 3750)},
      //{ func: fly(7.3, 0, 1300, 3, 7000, [10, -5])},

      {
        func: dCurve(
          (1 / 7) * Math.PI,
          -(1 / 1280) * Math.PI,
          3,
          4.4,
          [0, -20],
          0,
          1.7,
        ),
      },
      {
        func: dCurve(
          (1 / 70) * Math.PI,
          -(1 / 1240) * Math.PI,
          3,
          4.4,
          [0, -20],
          0,
          1.7,
        ),
      },
    ],
  },
  { // 61
    p: 1,
    cost: 2,
    name: "たまごをうむ", //未
    shots: [
      {
        func: effect((p) => {
          p.isme && p.parent.game.setStruct(p.parent.game.me, 23);
        }),
        delay: 0,
      },
    ],
  },
  { // 62
    p: 2,
    cost: 7,
    name: "タマゴボム",
    shots: [
      {
        func: effect((p) => {
          p.isme && p.parent.game.setStruct(p.parent.game.me, 25);
        }),
        delay: 0,
      },
    ],
  },
  { // 63
    p: 0,
    cost: 3,
    catchable: true,
    name: "ブーメラン",
    shots: [ //済
      { func: daen2(400, 40, 0.012, 3, 380) },
    ],
  },
  { // 64
    p: 2,
    cost: 1,
    X: true,
    name: "ハテナスターズ",
    shots: [
      {
        func: X({
          1: dFunc(0, 5.5, 1.5),
          2: dFunc(
            5.5 * Math.sin(Math.PI * 10 / 180),
            5.5 * Math.cos(Math.PI * 10 / 180),
            1.5,
          ),
          3: dFunc(0, 5, 1.5),
          4: dFunc(
            5.5 * Math.sin(Math.PI * 6.5 / 180),
            5.5 * Math.cos(Math.PI * 6.5 / 180),
            1.5,
          ),
          5: dFunc(0, 5, 1.5),
          6: dFunc(
            5.5 * Math.sin(Math.PI * 6.5 / 180),
            5.5 * Math.cos(Math.PI * 6.5 / 180),
            1.5,
          ),
          7: dFunc(0, 5, 1.5),
          8: dFunc(
            5.5 * Math.sin(Math.PI * 6.5 / 180),
            5.5 * Math.cos(Math.PI * 6.5 / 180),
            1.5,
          ),
          9: dFunc(0, 5, 1.5),
          10: dFunc(
            5.5 * Math.sin(Math.PI * 6.5 / 180),
            5.5 * Math.cos(Math.PI * 6.5 / 180),
            1.5,
          ),
        }),
        delay: 0,
      },
      {
        func: X({
          1: del,
          2: dFunc(
            -5.5 * Math.sin(Math.PI * 10 / 180),
            5.5 * Math.cos(Math.PI * 10 / 180),
            1.5,
          ),
          3: dFunc(
            5.5 * Math.sin(Math.PI * 12 / 180),
            5.5 * Math.cos(Math.PI * 12 / 180),
            1.5,
          ),
          4: dFunc(
            -5.5 * Math.sin(Math.PI * 6.5 / 180),
            5.5 * Math.cos(Math.PI * 6.5 / 180),
            1.5,
          ),
          5: dFunc(
            5.5 * Math.sin(Math.PI / 14),
            5.5 * Math.cos(Math.PI / 14),
            1.5,
          ),
          6: dFunc(
            -5.5 * Math.sin(Math.PI * 6.5 / 180),
            5.5 * Math.cos(Math.PI * 6.5 / 180),
            1.5,
          ),
          7: dFunc(
            5.5 * Math.sin(Math.PI * 13 / 180),
            5.5 * Math.cos(Math.PI * 13 / 180),
            1.5,
          ),
          8: dFunc(
            -5.5 * Math.sin(Math.PI * 6.5 / 180),
            5.5 * Math.cos(Math.PI * 6.5 / 180),
            1.5,
          ),
          9: dFunc(
            5.5 * Math.sin(Math.PI * 13 / 180),
            5.5 * Math.cos(Math.PI * 13 / 180),
            1.5,
          ),
          10: dFunc(
            -5.5 * Math.sin(Math.PI * 6.5 / 180),
            5.5 * Math.cos(Math.PI * 6.5 / 180),
            1.5,
          ),
        }),
        delay: 0,
      },
      {
        func: X({
          1: del,
          2: del,
          3: dFunc(
            -5.5 * Math.sin(Math.PI * 12 / 180),
            5.5 * Math.cos(Math.PI * 12 / 180),
            1.5,
          ),
          4: dFunc(
            5.5 * Math.sin(Math.PI * 19 / 180),
            5.5 * Math.cos(Math.PI * 19 / 180),
            1.5,
          ),
          5: dFunc(
            -5.5 * Math.sin(Math.PI / 13),
            5.5 * Math.cos(Math.PI / 13),
            1.5,
          ),
          6: dFunc(
            5.5 * Math.sin(Math.PI * 18.5 / 180),
            5.5 * Math.cos(Math.PI * 18.5 / 180),
            1.5,
          ),
          7: dFunc(
            -5.5 * Math.sin(Math.PI * 13 / 180),
            5.5 * Math.cos(Math.PI * 13 / 180),
            1.5,
          ),
          8: dFunc(
            5.5 * Math.sin(Math.PI * 18.5 / 180),
            5.5 * Math.cos(Math.PI * 18.5 / 180),
            1.5,
          ),
          9: dFunc(
            -5.5 * Math.sin(Math.PI * 13 / 180),
            5.5 * Math.cos(Math.PI * 13 / 180),
            1.5,
          ),
          10: dFunc(
            5.5 * Math.sin(Math.PI * 19.5 / 180),
            5.5 * Math.cos(Math.PI * 19.5 / 180),
            1.5,
          ),
        }),
        delay: 0,
      },
      {
        func: X({
          1: del,
          2: del,
          3: del,
          4: dFunc(
            -5.5 * Math.sin(Math.PI * 19 / 180),
            5.5 * Math.cos(Math.PI * 19 / 180),
            1.5,
          ),
          5: dFunc(
            5.5 * Math.sin(Math.PI / 7),
            5.5 * Math.cos(Math.PI / 7),
            1.5,
          ),
          6: dFunc(
            -5.5 * Math.sin(Math.PI * 18.5 / 180),
            5.5 * Math.cos(Math.PI * 18.5 / 180),
            1.5,
          ),
          7: dFunc(
            5.5 * Math.sin(Math.PI * 25 / 180),
            5.5 * Math.cos(Math.PI * 25 / 180),
            1.5,
          ),
          8: dFunc(
            -5.5 * Math.sin(Math.PI * 18.5 / 180),
            5.5 * Math.cos(Math.PI * 18.5 / 180),
            1.5,
          ),
          9: dFunc(
            5.5 * Math.sin(Math.PI * 25 / 180),
            5.5 * Math.cos(Math.PI * 25 / 180),
            1.5,
          ),
          10: dFunc(
            -5.5 * Math.sin(Math.PI * 19.5 / 180),
            5.5 * Math.cos(Math.PI * 19.5 / 180),
            1.5,
          ),
        }),
        delay: 0,
      },
      {
        func: X({
          1: del,
          2: del,
          3: del,
          4: del,
          5: dFunc(
            -5.5 * Math.sin(Math.PI / 7),
            5.5 * Math.cos(Math.PI / 7),
            1.5,
          ),
          6: dFunc(
            5.5 * Math.sin(Math.PI * 30 / 180),
            5.5 * Math.cos(Math.PI * 30 / 180),
            1.5,
          ),
          7: dFunc(
            -5.5 * Math.sin(Math.PI * 25 / 180),
            5.5 * Math.cos(Math.PI * 25 / 180),
            1.5,
          ),
          8: dFunc(
            5.5 * Math.sin(Math.PI * 30 / 180),
            5.5 * Math.cos(Math.PI * 30 / 180),
            1.5,
          ),
          9: dFunc(
            -5.5 * Math.sin(Math.PI * 25 / 180),
            5.5 * Math.cos(Math.PI * 25 / 180),
            1.5,
          ),
          10: dFunc(
            5.5 * Math.sin(Math.PI * 30 / 180),
            5.5 * Math.cos(Math.PI * 30 / 180),
            1.5,
          ),
        }),
        delay: 0,
      },
      {
        func: X({
          1: del,
          2: del,
          3: del,
          4: del,
          5: del,
          6: dFunc(
            -5.5 * Math.sin(Math.PI * 30 / 180),
            5.5 * Math.cos(Math.PI * 30 / 180),
            1.5,
          ),
          7: dFunc(
            5.5 * Math.sin(Math.PI * 36 / 180),
            5.5 * Math.cos(Math.PI * 36 / 180),
            1.5,
          ),
          8: dFunc(
            -5.5 * Math.sin(Math.PI * 30 / 180),
            5.5 * Math.cos(Math.PI * 30 / 180),
            1.5,
          ),
          9: dFunc(
            5.5 * Math.sin(Math.PI * 36 / 180),
            5.5 * Math.cos(Math.PI * 36 / 180),
            1.5,
          ),
          10: dFunc(
            -5.5 * Math.sin(Math.PI * 30 / 180),
            5.5 * Math.cos(Math.PI * 30 / 180),
            1.5,
          ),
        }),
        delay: 0,
      },
      {
        func: X({
          1: del,
          2: del,
          3: del,
          4: del,
          5: del,
          6: del,
          7: dFunc(
            -5.5 * Math.sin(Math.PI * 36 / 180),
            5.5 * Math.cos(Math.PI * 36 / 180),
            1.5,
          ),
          8: dFunc(
            5.5 * Math.sin(Math.PI * 41 / 180),
            5.5 * Math.cos(Math.PI * 41 / 180),
            1.5,
          ),
          9: dFunc(
            -5.5 * Math.sin(Math.PI * 36 / 180),
            5.5 * Math.cos(Math.PI * 36 / 180),
            1.5,
          ),
          10: dFunc(
            5.5 * Math.sin(Math.PI * 38.5 / 180),
            5.5 * Math.cos(Math.PI * 38.5 / 180),
            1.5,
          ),
        }),
        delay: 0,
      },
      {
        func: X({
          1: del,
          2: del,
          3: del,
          4: del,
          5: del,
          6: del,
          7: del,
          8: dFunc(
            -5.5 * Math.sin(Math.PI * 41 / 180),
            5.5 * Math.cos(Math.PI * 41 / 180),
            1.5,
          ),
          9: dFunc(
            5.5 * Math.sin(Math.PI * 45 / 180),
            5.5 * Math.cos(Math.PI * 45 / 180),
            1.5,
          ),
          10: dFunc(
            -5.5 * Math.sin(Math.PI * 38.5 / 180),
            5.5 * Math.cos(Math.PI * 38.5 / 180),
            1.5,
          ),
        }),
        delay: 0,
      },
      {
        func: X({
          1: del,
          2: del,
          3: del,
          4: del,
          5: del,
          6: del,
          7: del,
          8: del,
          9: dFunc(
            -5.5 * Math.sin(Math.PI * 45 / 180),
            5.5 * Math.cos(Math.PI * 45 / 180),
            1.5,
          ),
          10: dFunc(
            5.5 * Math.sin(Math.PI * 46 / 180),
            5.5 * Math.cos(Math.PI * 46 / 180),
            1.5,
          ),
        }),
        delay: 0,
      },
      {
        func: X({
          1: del,
          2: del,
          3: del,
          4: del,
          5: del,
          6: del,
          7: del,
          8: del,
          9: del,
          10: dFunc(
            -5.5 * Math.sin(Math.PI * 46 / 180),
            5.5 * Math.cos(Math.PI * 46 / 180),
            1.5,
          ),
        }),
        delay: 0,
      },
    ],
  },
  { // 65
    p: 2,
    cost: 8,
    name: "ハサミアタック",
    shots: [ //致命的
      { func: dFunc(-6, 28.35, 1.5, 0, [0, -10]), delay: 100, drill: true },
      {
        func: dFunc(-11.1, Math.sqrt(716.5125), 1.5, 0, [0, -10]),
        delay: 100,
        drill: true,
      },
      {
        func: dFunc(-15.81, Math.sqrt(589.7664), 1.5, 0, [0, -10]),
        delay: 100,
        drill: true,
      },
      { func: dFunc(6, 28.35, 1.5, 0, [0, -10]), delay: 100, drill: true },
      {
        func: dFunc(11.1, Math.sqrt(716.5125), 1.5, 0, [0, -10]),
        delay: 100,
        drill: true,
      },
      {
        func: dFunc(15.81, Math.sqrt(589.7664), 1.5, 0, [0, -10]),
        delay: 100,
        drill: true,
      },
    ],
  },
  { // 66
    p: 0,
    cost: 2,
    name: "れんしゅうショット",
    shots: [ //済
      { func: kakashi1(), drill: true },
      { func: kakashi2(), obake: true },
      { func: kakashi3() },
    ],
  },
  { // 67
    p: 2,
    cost: 3,
    name: "にれんぱつ",
    shots: [ //済
      { func: dFunc(0, 1428 / 77, 3), delay: 0 },
      { func: dFunc(0, 1428 / 77, 3), delay: 200 },
    ],
  },
  { // 68
    p: 2,
    cost: 8,
    name: "カカシだんまく",
    shots: kakashidanmaku(), //未
  },
  { // 69
    p: 0,
    cost: 2,
    name: "ジャブ",
    shots: [
      { func: kasoku1(0.00027, 0, 5, 0, [50, -40], -0.04, 0.28) },
    ],
  },
  { // 70
    p: 2,
    cost: 4,
    name: "ストレート",
    shots: [ //未
      //{ func: kasoku2(0.0018, 0.95, 5, 0, [-90, -150]), delay: 50 },
      { func: kasoku1(0.0022, 0, 5, 0, [-100, -150], 0, 0.95), delay: 40 },
    ],
  },
  { // 71
    p: 2,
    cost: 7,
    name: "カミソリアッパー",
    shots: [
      {
        func: kasoku3(0.15, 0.015, 18, 0, [-150, -70]),
        delay: 500,
        drill: true,
      },
    ],
  },
  { // 72
    p: 0,
    cost: 3,
    name: "ボーイフレンド",
    shots: [
      {
        func: syuki({
          1: effect((p) => {
            p.isme && p.parent.game.setStruct(p.parent.game.me, 26);
          }),
          2: effect((p) => {
            p.isme && p.parent.game.setStruct(p.parent.game.me, 27);
          }),
          0: effect((p) => {
            p.isme && p.parent.game.setStruct(p.parent.game.me, 28);
          }),
        }, 3),
      },
    ],
  },
  { // 73
    p: 1,
    cost: 3,
    name: "ウインク",
    shots: [ //謎
      {
        func: syuki({
          1: effect((s) => {
            if (s.isme) {
              s.parent.game.enemy.st.d = -1;
              s.enemy.star!.alpha = 0.5;
            } else {
              s.parent.game.me.st.d = -1;
              s.star.star!.alpha = 0.5;
            }
          }),
          0: effect((s) => {
            if (s.isme) {
              s.parent.game.enemy.st.d = 1;
              s.enemy.star!.alpha = 1;
            } else {
              s.parent.game.me.st.d = 1;
              s.star.star!.alpha = 1;
            }
          }),
        }, 2),
      },
    ],
  },
  { // 74
    p: 2,
    cost: 5,
    name: "ウェーブ",
    shots: [
      { func: wave(0.35, 0.92, 8.5, 1.5, 50, 850), delay: 10 },
      { func: wave(0.35, 0.92, 8.5, 1.5, 170, 850), delay: 210 },
      { func: wave(0.35, 0.92, 8.5, 1.5, 290, 850), delay: 410 },
      { func: wave(0.35, 0.92, 8.5, 1.5, 410, 850), delay: 610 },
      { func: wave(0.35, 0.92, 8.5, 1.5, 530, 850), delay: 810 },
      { func: wave(0.35, 0.92, 8.5, 1.5, 650, 850), delay: 1010 },
    ],
  },
  { // 75
    p: 0,
    cost: 2,
    name: "リーダーショット",
    shots: [
      { func: dFunc(0, 8.8, 3) },
    ],
  },
  { // 76
    p: 2,
    cost: 3,
    name: "スケープゴート",
    shots: [
      {
        func: effect((p) => {
          p.isme && p.parent.game.setStruct(p.parent.game.me, 20);
        }),
        delay: 0,
      },
    ],
  },
  { // 77
    p: 2,
    cost: 10,
    name: "へんしん🔧",
    shots: [ //未(2,3)
      {
        func: effect((s) => {
          if (s.isme) {
            s.parent.game.me.skill_select = [218, 219, 220];
            load_skill(s.parent.game.me);
            s.parent.game.gs.set(["skill_select", "cost"]);
          }
        }),
      },
    ],
  },
  { // 78
    p: 0,
    cost: 2,
    name: "ツボショット",
    shots: [
      { func: tubo() },
      { func: tubo(-1) },
    ],
  },
  { // 79
    p: 2,
    cost: 4,
    name: "かやくのツボ",
    shots: [
      {
        func: effect((p) => {
          p.isme && p.parent.game.setStruct(p.parent.game.me, 2);
        }),
        delay: 0,
      },
    ],
  },
  { // 80
    p: 1,
    cost: 1,
    name: "ツボをわる",
    shots: [],
  },
  { // 81
    p: 0,
    cost: 3,
    name: "なげナイフ",
    shots: [ //要改良
      { func: dFunc(0, 24, 1.5, 0, [-50, -35]), delay: 0 },
      { func: dFunc(0, 24, 1.5, 0, [50, -35]), delay: 250, drill: true },
    ],
  },
  { // 82
    p: 2,
    cost: 6,
    name: "ハルパー",
    shots: [ //要改良(いい感じ)
      {
        func: dKaitenFuncif(
          19.3 * 1.2,
          (0.003) * Math.PI,
          (3 / 10) * Math.PI,
          (0.0585 * 5 / 60) * Math.PI,
          0,
          0,
          0,
          3.75,
          10,
          0,
          1.5,
          [0, -50],
          0,
          0,
          0.88,
        ),
      },
      {
        func: dKaitenFuncif(
          19.3 * 1.2,
          (0.003) * Math.PI,
          (1 / 10) * Math.PI,
          (0.0585 * 5 / 60) * Math.PI,
          0,
          0,
          0,
          3.75,
          10,
          0,
          1.5,
          [0, -50],
          0,
          0,
          0.88,
        ),
      },
      {
        func: dKaitenFuncif(
          19.3 * 1.2,
          (0.003) * Math.PI,
          (-1 / 10) * Math.PI,
          (0.0585 * 5 / 60) * Math.PI,
          0,
          0,
          0,
          3.75,
          10,
          0,
          1.5,
          [0, -50],
          0,
          0,
          0.88,
        ),
      },
      {
        func: dKaitenFuncif(
          19.3 * 1.2,
          (0.003) * Math.PI,
          (-3 / 10) * Math.PI,
          (0.0585 * 5 / 60) * Math.PI,
          0,
          0,
          0,
          3.75,
          10,
          0,
          1.5,
          [0, -50],
          0,
          0,
          0.88,
        ),
      },
      {
        func: dKaitenFuncif(
          19.3 * 1.2,
          (0.003) * Math.PI,
          (-5 / 10) * Math.PI,
          (0.0585 * 5 / 60) * Math.PI,
          0,
          0,
          0,
          3.75,
          10,
          0,
          1.5,
          [0, -50],
          0,
          0,
          0.88,
        ),
      },
      {
        func: dKaitenFuncif(
          19.3 * 1.2,
          (0.003) * Math.PI,
          (-7 / 10) * Math.PI,
          (0.0585 * 5 / 60) * Math.PI,
          0,
          0,
          0,
          3.75,
          10,
          0,
          1.5,
          [0, -50],
          0,
          0,
          0.88,
        ),
      },
      {
        func: dKaitenFuncif(
          19.3 * 1.2,
          (0.003) * Math.PI,
          (-9 / 10) * Math.PI,
          (0.0585 * 5 / 60) * Math.PI,
          0,
          0,
          0,
          3.75,
          10,
          0,
          1.5,
          [0, -50],
          0,
          0,
          0.88,
        ),
      },
      {
        func: dKaitenFuncif(
          19.3 * 1.2,
          (0.003) * Math.PI,
          (9 / 10) * Math.PI,
          (0.0585 * 5 / 60) * Math.PI,
          0,
          0,
          0,
          3.75,
          10,
          0,
          3,
          [0, -50],
          0,
          0,
          0.88,
        ),
        delay: 0,
        drill: true,
      },
    ],
  },
  { // 83
    p: 2,
    cost: 8,
    name: "つるぎのまい",
    shots: [ //済
      { func: turumai2() },
      { func: turumai1() },
      { func: turumai4() },
      { func: turumai3() },
      { func: turumai6() },
      { func: turumai5() },
    ],
  }, //ここからギア
  { // 84
    p: 0,
    cost: 2,
    name: "しょぼツイン",
    shots: [
      {
        func: dFunc(
          6.1 * Math.sin((1.1 / 12) * Math.PI),
          6.1 * Math.cos((1.1 / 12) * Math.PI),
          3,
        ),
        delay: 0,
      },
      {
        func: dFunc(
          6.1 * Math.sin((-1.1 / 12) * Math.PI),
          6.1 * Math.cos((-1.1 / 12) * Math.PI),
          3,
        ),
        delay: 0,
      },
    ],
  },
  { // 85
    p: 1,
    cost: 2,
    name: "キエるマキュウ",
    shots: [
      { func: dFunc(0, 6.48, 3), obake: true },
    ],
  },
  { // 86
    p: 2,
    cost: 7,
    name: "ファイブスター",
    shots: five(20),
  },
  { // 87
    p: 2,
    cost: 8,
    name: "ビッグスター",
    shots: [ //if２ついる
      {
        func: dKaitenFuncif(
          0,
          -0.006 * Math.PI,
          (0 / 5) * Math.PI,
          -0.0051 * Math.PI,
          0,
          2.63,
          0,
          2.63,
          80,
          0,
          1.5,
          [0, 65],
          0.044,
          0,
        ),
        delay: 100,
        drill: true,
      },
      {
        func: dKaitenFuncif(
          0,
          -0.006 * Math.PI,
          -(2 / 5) * Math.PI,
          -0.0051 * Math.PI,
          0,
          2.63,
          0,
          2.63,
          80,
          0,
          1.5,
          [0, 65],
          0.044,
          0,
        ),
        delay: 100,
        drill: true,
      },
      {
        func: dKaitenFuncif(
          0,
          -0.006 * Math.PI,
          (2 / 5) * Math.PI,
          -0.0051 * Math.PI,
          0,
          2.63,
          0,
          2.63,
          80,
          0,
          1.5,
          [0, 65],
          0.044,
          0,
        ),
        delay: 100,
        drill: true,
      },
      {
        func: dKaitenFuncif(
          0,
          -0.006 * Math.PI,
          (4 / 5) * Math.PI,
          -0.0051 * Math.PI,
          0,
          2.63,
          0,
          2.63,
          80,
          0,
          1.5,
          [0, 65],
          0.044,
          0,
        ),
        delay: 100,
        drill: true,
      },
      {
        func: dKaitenFuncif(
          0,
          -0.006 * Math.PI,
          -(4 / 5) * Math.PI,
          -0.0051 * Math.PI,
          0,
          2.63,
          0,
          2.63,
          80,
          0,
          1.5,
          [0, 65],
          0.044,
          0,
        ),
        delay: 100,
        drill: true,
      },

      {
        func: dKaitenFuncif(
          0,
          -0.006 * Math.PI,
          (1 / 5) * Math.PI,
          -0.0051 * Math.PI,
          0,
          2.63,
          0,
          2.63,
          80,
          0,
          1.5,
          [0, 65],
          0.021,
          0,
        ),
        delay: 100,
        drill: true,
      },
      {
        func: dKaitenFuncif(
          0,
          -0.006 * Math.PI,
          -(1 / 5) * Math.PI,
          -0.0051 * Math.PI,
          0,
          2.63,
          0,
          2.63,
          80,
          0,
          1.5,
          [0, 65],
          0.021,
          0,
        ),
        delay: 100,
        drill: true,
      },
      {
        func: dKaitenFuncif(
          0,
          -0.006 * Math.PI,
          (3 / 5) * Math.PI,
          -0.0051 * Math.PI,
          0,
          2.63,
          0,
          2.63,
          80,
          0,
          1.5,
          [0, 65],
          0.021,
          0,
        ),
        delay: 100,
        drill: true,
      },
      {
        func: dKaitenFuncif(
          0,
          -0.006 * Math.PI,
          -(3 / 5) * Math.PI,
          -0.0051 * Math.PI,
          0,
          2.63,
          0,
          2.63,
          80,
          0,
          1.5,
          [0, 65],
          0.021,
          0,
        ),
        delay: 100,
        drill: true,
      },
      {
        func: dKaitenFuncif(
          0,
          -0.006 * Math.PI,
          (5 / 5) * Math.PI,
          -0.0051 * Math.PI,
          0,
          2.63,
          0,
          2.63,
          80,
          0,
          1.5,
          [0, 65],
          0.021,
          0,
        ),
        delay: 100,
        drill: true,
      },
    ],
  },
  { // 88
    p: 2,
    cost: 3,
    name: "だましライト",
    shots: [
      { func: damashi(16.6, 0, 3, 1.7), delay: 0 },
    ],
  },
  { // 89
    p: 2,
    cost: 4,
    name: "ファストショット",
    shots: [
      { func: dFunc(0, 27, 3), delay: 0 },
    ],
  },
  { // 90
    p: 2,
    cost: 5,
    name: "ファストレフト",
    shots: [
      { func: damashi(27, 1, 3, 2), delay: 0 },
    ],
  },
  { // 91
    p: 2,
    cost: 5,
    name: "ファストライト",
    shots: [
      { func: damashi(27, 0, 3, 2), delay: 0 },
    ],
  },
  { // 92
    p: 0,
    cost: 1,
    name: "しょぼカーブ",
    shots: [
      //{ func: curve(0.45, 0.93 * 1.15, 6.155), delay: 0 },
      { func: yura2(22, 3.5, 20, 3, 2), delay: 0 },
    ],
  },
  { // 93
    p: 2,
    cost: 4,
    name: "ファストカーブ",
    shots: [
      { func: curve(1.05, 0.94, 21), delay: 0 },
    ],
  },
  { // 94
    p: 2,
    cost: 6,
    name: "さんぼんあし",
    shots: [
      { func: dFunc(0.00, 20, 3, 0, [0, 10]), delay: 0 },
      { func: curve(0.80, 1, 20, 3, [0, 10]), delay: 250 },
      { func: curve(1.60, 1, 20, 3, [0, 10]), delay: 500 },
    ],
  },
  { // 95
    p: 2,
    cost: 8,
    name: "のびのびカーブ",
    shots: [
      { func: curve(3.20, 0.47, 10, 3, [0, 10]), delay: 300 },
      { func: curve(3.60, 0.47, 10, 3, [0, 10]), delay: 300 },
      { func: curve(4.00, 0.47, 10, 3, [0, 10]), delay: 300 },
      { func: curve(4.40, 0.47, 10, 3, [0, 10]), delay: 300 },
      { func: curve(4.80, 0.47, 10, 3, [0, 10]), delay: 300 },
    ],
  },
  { // 96
    p: 1,
    cost: 2,
    name: "スローオバケ",
    shots: [
      { func: dFunc(0, 2.2, 3), obake: true },
    ],
  },
  { // 97
    p: 2,
    cost: 3,
    name: "オバケレフト",
    shots: [
      { func: damashi(14.28, 1, 3, 1.7 * 14.28 / 16.6), delay: 0, obake: true },
    ],
  },
  { // 98
    p: 2,
    cost: 3,
    name: "オバケライト",
    shots: [
      { func: damashi(14.28, 0, 3, 1.7 * 14.28 / 16.6), delay: 0, obake: true },
    ],
  },
  { // 99
    p: 2,
    cost: 8,
    name: "オバケスプレッド",
    shots: name_spread(27, 12, 400, 0, true),
  },
  { // 100
    p: 1,
    cost: 4,
    name: "ツインドリル",
    shots: [
      { func: dFunc(3, 14, 3), delay: 0, drill: true },
      { func: dFunc(-3, 14, 3), delay: 0, drill: true },
    ],
  },
  { // 101
    p: 2,
    cost: 6,
    name: "スローファイブ",
    shots: [
      {
        func: dFunc(
          (476 / 187) * Math.sin((0 / 12) * Math.PI),
          (476 / 187) * Math.cos((0 / 12) * Math.PI),
          2.5,
        ),
        drill: true,
      },
      {
        func: dFunc(
          (476 / 187) * Math.sin((0.97 / 12) * Math.PI),
          (476 / 187) * Math.cos((0.97 / 12) * Math.PI),
          1.5,
        ),
        drill: true,
      },
      {
        func: dFunc(
          (476 / 187) * Math.sin((-0.97 / 12) * Math.PI),
          (476 / 187) * Math.cos((-0.97 / 12) * Math.PI),
          1.5,
        ),
        drill: true,
      },
      {
        func: dFunc(
          (476 / 187) * Math.sin((1.90 / 12) * Math.PI),
          (476 / 187) * Math.cos((1.90 / 12) * Math.PI),
          1.5,
        ),
        drill: true,
      },
      {
        func: dFunc(
          (476 / 187) * Math.sin((-1.90 / 12) * Math.PI),
          (476 / 187) * Math.cos((-1.90 / 12) * Math.PI),
          1.5,
        ),
        drill: true,
      },
    ],
  },
  { // 102
    p: 2,
    cost: 5,
    name: "ドリルボム",
    shots: [
      {
        func: effect((p) => {
          p.isme && p.parent.game.setStruct(p.parent.game.me, 3);
        }),
        delay: 0,
      },
    ],
  },
  { // 103
    p: 2,
    cost: 8,
    name: "ドリルアタック",
    shots: [
      { func: dFunc(2.14, 26.8, 1.5, 0, [0, -5]), delay: 200, drill: true },
      { func: dFunc(1.07, 26.95, 1.5, 0, [0, -5]), delay: 200, drill: true },
      { func: dFunc(0, 27, 1.5, 0, [0, -5]), delay: 200, drill: true },
      { func: dFunc(-1.07, 26.95, 1.5, 0, [0, -5]), delay: 200, drill: true },
      { func: dFunc(-2.14, 26.8, 1.5, 0, [0, -5]), delay: 200, drill: true },
    ],
  },
  { // 104
    p: 0,
    cost: 3,
    name: "ヘヴィツイン",
    shots: [
      { func: dFunc(4, 10, 9), delay: 0 },
      { func: dFunc(-4, 10, 9), delay: 0 },
    ],
  },
  { // 105
    p: 1,
    cost: 4,
    name: "クジラボム",
    shots: [
      {
        func: effect((p) => {
          p.isme && p.parent.game.setStruct(p.parent.game.me, 19);
        }),
        delay: 0,
      },
    ],
  },
  { // 106
    p: 2,
    cost: 1,
    X: true,
    name: "ハテナショット", //未
    shots: [
      {
        func: X({
          1: dFunc(0, 13, 5),
          2: dFunc(0, 13, 9),
          3: dFunc(0, 13, 12),
          4: dFunc(0, 13, 15),
          5: dFunc(0, 13, 18),
          6: dFunc(0, 13, 21),
          7: dFunc(0, 13, 24),
          8: dFunc(0, 13, 27),
          9: dFunc(0, 13, 30),
          10: dFunc(0, 13, 33),
        }),
        delay: 0,
      },
    ],
  },
  { // 107
    p: 2,
    cost: 9,
    name: "マグナムショット",
    shots: [
      { func: dFunc(0, 26, 20), delay: 600 },
    ],
  },
  { // 108
    p: 2,
    cost: 3,
    name: "ふうせんショット",
    shots: [
      { func: fusen(0, 8.114, 1.5, 15), delay: 0 },
    ],
  },
  { // 109
    p: 2,
    cost: 6,
    name: "バルーンファイブ",
    shots: [
      {
        func: fusen(
          8.114 * Math.sin((0.00 / 12) * Math.PI),
          8.114 * Math.cos((0.00 / 12) * Math.PI),
          1.5,
          5,
        ),
      },
      {
        func: fusen(
          8.114 * Math.sin((0.95 / 12) * Math.PI),
          8.114 * Math.cos((0.95 / 12) * Math.PI),
          1.5,
          5,
        ),
      },
      {
        func: fusen(
          8.114 * Math.sin((-0.95 / 12) * Math.PI),
          8.114 * Math.cos((-0.95 / 12) * Math.PI),
          1.5,
          5,
        ),
      },
      {
        func: fusen(
          8.114 * Math.sin((1.90 / 12) * Math.PI),
          8.114 * Math.cos((1.90 / 12) * Math.PI),
          1.5,
          5,
        ),
      },
      {
        func: fusen(
          8.114 * Math.sin((-1.90 / 12) * Math.PI),
          8.114 * Math.cos((-1.90 / 12) * Math.PI),
          1.5,
          5,
        ),
      },
    ],
  },
  { // 110
    p: 2,
    cost: 4,
    name: "ツインふうせん", //未
    shots: [
      { func: fusen(2.5, 8.31491712707, 1.5, 10), delay: 0 },
      { func: fusen(-2.5, 8.31491712707, 1.5, 10), delay: 0 },
    ],
  },
  { // 111
    p: 2,
    cost: 1,
    X: true,
    name: "ハテナふうせん",
    shots: [
      {
        func: X({
          1: fusen(0, 8.114, 1.5, 6),
          2: fusen(0, 8.114, 1.5, 9.5),
          3: fusen(0, 8.114, 1.5, 13),
          4: fusen(0, 8.114, 1.5, 16.5),
          5: fusen(0, 8.114, 1.5, 20),
          6: fusen(0, 8.114, 1.5, 23.5),
          7: fusen(0, 8.114, 1.5, 27),
          8: fusen(0, 8.114, 1.5, 30.5),
          9: fusen(0, 8.114, 1.5, 34),
          10: fusen(0, 8.114, 1.5, 37.5),
        }),
        delay: 0,
      },
    ],
  },
  { // 112
    p: 0,
    cost: 2,
    name: "ナメドリル", //未
    shots: [
      { func: curve(0.45, 0.95, 2.56), delay: 0, drill: true },
    ],
  },
  { // 113
    p: 1,
    cost: 1,
    name: "Pボム",
    shots: [
      {
        func: effect((p) => {
          p.isme && p.parent.game.setStruct(p.parent.game.me, 7);
        }),
        delay: 0,
      },
    ],
  },
  { // 114
    p: 2,
    cost: 5,
    name: "ゲジゲジ",
    shots: [
      { func: dFunc(0, 3.5, 3), delay: 0 },
      { func: curve(0.7, 0.9, 3.5, 1.5), delay: 0 },
      { func: curve(-0.7, 0.9, 3.5, 1.5), delay: 0 },
      { func: dFunc(0, 3.5, 3), delay: 250 },
      { func: curve(0.7, 0.9, 3.5, 1.5), delay: 250 },
      { func: curve(-0.7, 0.9, 3.5, 1.5), delay: 250 },
      { func: dFunc(0, 3.5, 3), delay: 500 },
      { func: curve(0.7, 0.9, 3.5, 1.5), delay: 500 },
      { func: curve(-0.7, 0.9, 3.5, 1.5), delay: 500 },
      { func: dFunc(0, 3.5, 3), delay: 750 },
      { func: curve(0.7, 0.9, 3.5, 1.5), delay: 750 },
      { func: curve(-0.7, 0.9, 3.5, 1.5), delay: 750 },
      { func: dFunc(0, 3.5, 3), delay: 1000 },
      { func: curve(0.7, 0.9, 3.5, 1.5), delay: 1000 },
      { func: curve(-0.7, 0.9, 3.5, 1.5), delay: 1000 },
      { func: dFunc(0, 3.5, 3), delay: 1250 },
      { func: curve(0.7, 0.9, 3.5, 1.5), delay: 1250 },
      { func: curve(-0.7, 0.9, 3.5, 1.5), delay: 1250 },
    ],
  },
  { // 115
    p: 2,
    cost: 7,
    name: "ナメアッパー",
    shots: [
      { func: nupper(), drill: true },
    ],
  },
  { // 116
    p: 10,
    cost: 10,
    name: "もこもこショット",
    shots: [],
  },
  { // 117
    p: 10,
    cost: 10,
    name: "ふわふわスロー",
    shots: [],
  },
  { // 118
    p: 10,
    cost: 10,
    name: "ふわふわふうせん",
    shots: [],
  },
  { // 119
    p: 10,
    cost: 10,
    name: "ふわふわスプレッド",
    shots: [],
  },
  { // 120
    p: 0,
    cost: 1,
    name: "しょぼゆらゆら",
    shots: [
      { func: yura2(25, 1.7, 10, 3, 2), delay: 0 },
    ],
  },
  { // 121
    p: 2,
    cost: 4,
    name: "ワイドカーブ",
    shots: [
      { func: curve(4.6, 0.2, 9.7), delay: 0 },
      //{ func: yura2(230, 0.7, 100, 3, 4, [0, 0]), delay: 0 },
    ],
  },
  { // 122
    p: 10,
    cost: 10,
    name: "イカスミ",
    shots: [],
  },
  { // 123
    p: 2,
    cost: 7,
    name: "うずしお",
    shots: uzushio(),
  },
  { // 124
    p: 0,
    cost: 3,
    name: "ふいうちショット",
    shots: [
      { func: fuiuchi(), drill: true },
    ],
  },
  { // 125
    p: 2,
    cost: 4,
    name: "ライオンツイン",
    shots: [
      { func: dFunc(4.2, 11, 9.8), delay: 0, drill: true },
      { func: dFunc(-4.2, 11, 9.8), delay: 0, drill: true },
    ],
  },
  { // 126
    p: 2,
    cost: 6,
    name: "ハイパースロー", //未
    shots: [
      { func: dFunc(0, 7.5, 28, 10), delay: 0, drill: true },
    ],
  },
  { // 127
    p: 2,
    cost: 6,
    name: "ファストライオン",
    shots: [
      { func: dFunc(0, 30, 13, 0), delay: 175, drill: true },
    ],
  },
  { // 128
    p: 10,
    cost: 10,
    name: "ハテナドリル",
    shots: [],
  },
  { // 129
    p: 0,
    cost: 2,
    name: "チャージアロー",
    shots: [
      { func: charge(), delay: 100 },
    ],
  },
  { // 130
    p: 2,
    cost: 3,
    name: "コーナーエイム",
    shots: [
      { func: corneraim1(85) },
      { func: corneraim2(85) },
    ],
  },
  { // 131
    p: 2,
    cost: 0,
    name: "トリプルエイム",
    shots: [
      { func: corneraim1(85) },
      { func: corneraim2(85) },
      { func: longaim(85) },
    ],
  },
  { // 132
    p: 2,
    cost: 7,
    name: "ビッグアロー",
    shots: bigarrow(),
  },
  { // 133
    p: 0,
    cost: 2,
    name: "たきのぼり", //未
    shots: [
      { func: takino(0, 0.21, 3, 40, 0, 3, 1, [0, 0]) },
    ],
  },
  { // 134
    p: 2,
    cost: 6,
    name: "ソナー'", //未
    shots: [
      { func: dFunc(0, 22, 3, 0, [0, -20]), delay: 0 },
      { func: dFuncif(11, 11, 0, 22, 30, 0, 3, [0, -20]), delay: 0 },
      { func: dFuncif(-11, 11, 0, 22, 30, 0, 3, [0, -20]), delay: 0 },
      {
        func: dKaitenFuncif(
          2,
          0.028 * Math.PI,
          (1 / 2) * Math.PI,
          0.028 * Math.PI,
          0,
          4.4,
          0,
          8.8,
          30,
          0,
          1.5,
          [0, -20],
          0,
          0,
        ),
        delay: 0,
      },
      { func: dFuncif(0, 0, 0, 22, 30, 0, 3, [0, -20]), delay: 0 },
    ],
  },
  { // 135
    p: 2,
    cost: 4,
    name: "ファストスイム",
    shots: [ //済
      //{ func: fastswim(0.3, 0.51, 16, 3, 0.00028) },
      { func: swim(0.032, 0.5, 16, 3), delay: 0 },
    ],
  },
  { // 136
    p: 10,
    cost: 10,
    name: "スイミー",
    shots: [],
  },
  { // 137
    p: 2,
    cost: 7,
    name: "スーパーぎょらい",
    shots: [ //未
      { func: kasoku3(0, 0.04, 6.5, 0, [113, -100]), delay: 400 },
      { func: kasoku3(0, 0.04, 6.5, 0, [-113, -100]), delay: 400 },
      { func: kasoku3(0, 0.04, 6.5, 0, [280, -100]), delay: 400 },
      { func: kasoku3(0, 0.04, 6.5, 0, [-280, -100]), delay: 400 },
    ],
  },
  { // 138
    p: 0,
    cost: 3,
    name: "プチデルタ",
    shots: [ //未
      {
        func: dKaiten(-(2 / 3) * Math.PI, 0.02, 3.3, 0, 30, 0, 1.5, -1, 1, [
          0,
          40,
        ]),
        delay: 0,
      },
      {
        func: dKaiten((2 / 3) * Math.PI, 0.02, 3.3, 0, 30, 0, 1.5, -1, 1, [
          0,
          40,
        ]),
        delay: 0,
      },
      {
        func: dKaiten((0 / 3) * Math.PI, 0.02, 3.3, 0, 30, 0, 1.5, -1, 1, [
          0,
          40,
        ]),
        delay: 0,
      },
    ],
  },
  { // 139
    p: 2,
    cost: 4,
    name: "スクエア",
    shots: [
      {
        func: dKaitenFuncif(
          0,
          0.0063 * Math.PI,
          -0.25 * Math.PI,
          0.0063 * Math.PI,
          0,
          3.3,
          0,
          3.3,
          52,
          0,
          1.5,
          [0, -60],
          0.06,
          0,
        ),
        delay: 0,
        drill: true,
      },
      {
        func: dKaitenFuncif(
          0,
          0.0063 * Math.PI,
          0.25 * Math.PI,
          0.0063 * Math.PI,
          0,
          3.3,
          0,
          3.3,
          52,
          0,
          1.5,
          [0, -60],
          0.06,
          0,
        ),
        delay: 0,
        drill: true,
      },
      {
        func: dKaitenFuncif(
          0,
          0.0063 * Math.PI,
          -0.75 * Math.PI,
          0.0063 * Math.PI,
          0,
          3.3,
          0,
          3.3,
          52,
          0,
          1.5,
          [0, -60],
          0.06,
          0,
        ),
        delay: 0,
        drill: true,
      },
      {
        func: dKaitenFuncif(
          0,
          0.0063 * Math.PI,
          0.75 * Math.PI,
          0.0063 * Math.PI,
          0,
          3.3,
          0,
          3.3,
          52,
          0,
          1.5,
          [0, -60],
          0.06,
          0,
        ),
        delay: 0,
        drill: true,
      },
    ],
  },
  { // 140
    p: 2,
    cost: 5,
    name: "デルタツイン",
    shots: [ //未
      {
        func: dKaitenFuncif(
          0.4,
          -0.0052 * Math.PI,
          -(1 / 3) * Math.PI,
          -0.0052 * Math.PI,
          0.76,
          3,
          0.76,
          3,
          50,
          0,
          1.5,
          [0, -60],
          0.021,
          0,
        ),
        delay: 0,
        drill: true,
      },
      {
        func: dKaitenFuncif(
          0.4,
          -0.0052 * Math.PI,
          (1 / 3) * Math.PI,
          -0.0052 * Math.PI,
          0.76,
          3,
          0.76,
          3,
          50,
          0,
          1.5,
          [0, -60],
          0.021,
          0,
        ),
        delay: 0,
        drill: true,
      },
      {
        func: dKaitenFuncif(
          0.4,
          -0.0052 * Math.PI,
          (3 / 3) * Math.PI,
          -0.0052 * Math.PI,
          0.76,
          3,
          0.76,
          3,
          50,
          0,
          1.5,
          [0, -60],
          0.021,
          0,
        ),
        delay: 0,
        drill: true,
      },
      {
        func: dKaitenFuncif(
          0.4,
          0.0052 * Math.PI,
          -(2 / 3) * Math.PI,
          0.0052 * Math.PI,
          -0.76,
          3,
          -0.76,
          3,
          50,
          0,
          1.5,
          [0, -60],
          0.021,
          0,
        ),
        delay: 0,
        drill: true,
      },
      {
        func: dKaitenFuncif(
          0.4,
          0.0052 * Math.PI,
          (2 / 3) * Math.PI,
          0.0052 * Math.PI,
          -0.76,
          3,
          -0.76,
          3,
          50,
          0,
          1.5,
          [0, -60],
          0.021,
          0,
        ),
        delay: 0,
        drill: true,
      },
      {
        func: dKaitenFuncif(
          0.4,
          0.0052 * Math.PI,
          (0 / 3) * Math.PI,
          0.0052 * Math.PI,
          -0.76,
          3,
          -0.76,
          3,
          50,
          0,
          1.5,
          [0, -60],
          0.021,
          0,
        ),
        delay: 0,
        drill: true,
      },
    ],
  },
  { // 141
    p: 2,
    cost: 8,
    name: "クロック",
    shots: [
      {
        func: dFuncif(
          14 * (Math.cos(0 * Math.PI)),
          14 * (Math.sin(0 * Math.PI)) + 8,
          0,
          10,
          35,
          0,
          1.5,
          [0, 0],
        ),
        delay: 300,
        drill: true,
      },
      {
        func: dFuncif(
          14 * (Math.cos((1 / 6) * Math.PI)),
          14 * (Math.sin((1 / 6) * Math.PI)) + 8,
          0,
          10,
          35,
          0,
          1.5,
          [0, 0],
        ),
        delay: 300,
        drill: true,
      },
      {
        func: dFuncif(
          14 * (Math.cos((2 / 6) * Math.PI)),
          14 * (Math.sin((2 / 6) * Math.PI)) + 8,
          0,
          10,
          35,
          0,
          1.5,
          [0, 0],
        ),
        delay: 300,
        drill: true,
      },
      {
        func: dFuncif(
          14 * (Math.cos((3 / 6) * Math.PI)),
          14 * (Math.sin((3 / 6) * Math.PI)) + 8,
          0,
          10,
          35,
          0,
          1.5,
          [0, 0],
        ),
        delay: 300,
        drill: true,
      },
      {
        func: dFuncif(
          14 * (Math.cos((4 / 6) * Math.PI)),
          14 * (Math.sin((4 / 6) * Math.PI)) + 8,
          0,
          10,
          35,
          0,
          1.5,
          [0, 0],
        ),
        delay: 300,
        drill: true,
      },
      {
        func: dFuncif(
          14 * (Math.cos((5 / 6) * Math.PI)),
          14 * (Math.sin((5 / 6) * Math.PI)) + 8,
          0,
          10,
          35,
          0,
          1.5,
          [0, 0],
        ),
        delay: 300,
        drill: true,
      },
      {
        func: dFuncif(
          14 * (Math.cos(1 * Math.PI)),
          14 * (Math.sin(1 * Math.PI)) + 8,
          0,
          10,
          35,
          0,
          1.5,
          [0, 0],
        ),
        delay: 300,
        drill: true,
      },
      {
        func: dFuncif(
          14 * (Math.cos(-(1 / 6) * Math.PI)),
          14 * (Math.sin(-(1 / 6) * Math.PI)) + 8,
          0,
          10,
          35,
          0,
          1.5,
          [0, 0],
        ),
        delay: 300,
        drill: true,
      },
      {
        func: dFuncif(
          14 * (Math.cos(-(2 / 6) * Math.PI)),
          14 * (Math.sin(-(2 / 6) * Math.PI)) + 8,
          0,
          10,
          35,
          0,
          1.5,
          [0, 0],
        ),
        delay: 300,
        drill: true,
      },
      {
        func: dFuncif(
          14 * (Math.cos(-(3 / 6) * Math.PI)),
          14 * (Math.sin(-(3 / 6) * Math.PI)) + 8,
          0,
          10,
          35,
          0,
          1.5,
          [0, 0],
        ),
        delay: 300,
        drill: true,
      },
      {
        func: dFuncif(
          14 * (Math.cos(-(4 / 6) * Math.PI)),
          14 * (Math.sin(-(4 / 6) * Math.PI)) + 8,
          0,
          10,
          35,
          0,
          1.5,
          [0, 0],
        ),
        delay: 300,
        drill: true,
      },
      {
        func: dFuncif(
          14 * (Math.cos(-(5 / 6) * Math.PI)),
          14 * (Math.sin(-(5 / 6) * Math.PI)) + 8,
          0,
          10,
          35,
          0,
          1.5,
          [0, 0],
        ),
        delay: 300,
        drill: true,
      },
      {
        func: dFuncif(0, 8, 0, 10, 35, 0, 1.5, [0, 0]),
        delay: 300,
        drill: true,
      },
      {
        func: dFuncif(0, 8, 0, 10, 35, 0, 1.5, [0, 0]),
        delay: 300,
        drill: true,
      }, //真ん中
      {
        func: dKaitenFuncif(
          4.8,
          (1 / 90) * Math.PI,
          (4.5 / 6) * Math.PI,
          (1 / 90) * Math.PI,
          0,
          3.2,
          0,
          4,
          35,
          0,
          1.5,
          [0, 0],
        ),
        delay: 300,
        drill: true,
      }, //分針
      {
        func: dKaitenFuncif(
          2.4,
          (1 / 90) * Math.PI,
          (4.5 / 6) * Math.PI,
          (1 / 90) * Math.PI,
          0,
          3.2,
          0,
          4,
          35,
          0,
          1.5,
          [0, 0],
        ),
        delay: 300,
        drill: true,
      }, //分針
      {
        func: dKaitenFuncif(
          2.2,
          0,
          (118 / 432) * Math.PI,
          (1 / 540) * Math.PI,
          0,
          3.2,
          0,
          4,
          35,
          0,
          1.5,
          [0, 0],
        ),
        delay: 300,
        drill: true,
      }, //短針
    ],
  },
  { // 142
    p: 2,
    cost: 3,
    name: "センターマジック",
    shots: [ //済
      { func: center(0, 16.6, 3), delay: 0 },
    ],
  },
  { // 143
    p: 3,
    cost: 2,
    name: "だましスイッチ",
    shots: [
      { func: switchdamashi(), delay: 0 },
    ],
  },
  { // 144
    p: 2,
    cost: 6,
    name: "スプリットマジック",
    shots: [
      { func: sprit(0, 16.6, 3, 1), delay: 0 },
      { func: sprit(0, 16.6, 3, -1), delay: 0 },
    ],
  },
  { // 145
    p: 10,
    cost: 10,
    name: "ラッキーセブン",
    shots: [],
  },
  { // 146
    p: 0,
    cost: 1,
    name: "ほろよいショット",
    shots: [ //未
      { func: yoidore(14 / 19), delay: 0 },
    ],
  },
  { // 147
    p: 2,
    cost: 4,
    name: "ファストよいどれ",
    shots: [
      { func: yoidore(2), delay: 0 },
    ],
  },
  { // 148
    p: 2,
    cost: 4,
    name: "ふりょうをよぶ",
    shots: [
      {
        func: effect((p) => {
          p.isme && p.parent.game.setStruct(p.parent.game.me, 18);
        }),
        delay: 0,
      },
    ],
  },
  { // 149
    p: 3,
    cost: 9,
    name: "でいすいラッシュ",
    shots: deisuirush(80 / 177.5),
  },
  { // 150
    p: 0,
    cost: 3,
    name: "ゆらゆらドリル",
    shots: [
      { func: yura2(75, 1.53, 13, 3, 5), delay: 0, drill: true },
    ],
  },
  { // 151
    p: 2,
    cost: 6,
    name: "ドリルムーン",
    shots: [
      { func: curve(-6.1, 0.21, 17), delay: 0, drill: true },
    ],
  },
  { // 152
    p: 3,
    cost: 4,
    name: "ムーンスイッチ",
    shots: [
      { func: moons() },
    ],
  },
  { // 153
    p: 2,
    cost: 9,
    name: "リバーススプレッド",
    shots: m_spread(1.15, 1.06),
  },
  { // 154
    p: 0,
    cost: 3,
    name: "あわリング",
    shots: [
      { func: dKaiten(0, 0.29, 3.5, 0, 5, 0.21), delay: 0 },
      { func: dKaiten(Math.PI, 0.29, 3.5, 0, 5, 0.21), delay: 0 },
    ],
  },
  { // 155
    p: 2,
    cost: 6,
    name: "あわウォール",
    shots: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((e) => ({
      func: dFunc(0, 4.08 + 1.7 * e, 1.5),
      delay: 0,
    })),
  },
  { // 156
    p: 2,
    cost: 4,
    name: "あわボム",
    shots: [
      {
        func: effect((p) => {
          p.isme && p.parent.game.setStruct(p.parent.game.me, 6);
        }),
        delay: 0,
      },
    ],
  },
  { // 157
    p: 2,
    cost: 8,
    name: "あわサイクロン",
    shots: awa_ring(),
  },
  { // 158
    p: 0,
    cost: 2,
    name: "しょぼダブル",
    shots: [
      { func: curve(0.6, 0.95, 6.155), delay: 0 },
      { func: curve(-0.6, 0.95, 6.155), delay: 0 },
    ],
  },
  { // 159
    p: 2,
    cost: 5,
    name: "サイドドリル",
    shots: [ //済
      {
        func: dFuncif(57.5 * 2, -160 * 8 / 16, 0, 26, 5, 0, 3, [0, 10]),
        delay: 0,
        drill: true,
      },
      {
        func: dFuncif(29 * 2, -160 * 8 / 16, 0, 26, 5, 0, 3, [0, 10]),
        delay: 0,
        drill: true,
      },
      {
        func: dFuncif(-57.5 * 2, -160 * 8 / 16, 0, 26, 5, 0, 3, [0, 10]),
        delay: 0,
        drill: true,
      },
      {
        func: dFuncif(-29 * 2, -160 * 8 / 16, 0, 26, 5, 0, 3, [0, 10]),
        delay: 0,
        drill: true,
      },
    ],
  },
  { // 160
    p: 2,
    cost: 3,
    name: "ダブルツイン",
    shots: [ //未
      { func: dFunc(-2.8, 8.5, 3, 0, [0, -10]), delay: 0 },
      { func: dFunc(-6, Math.sqrt(44.09), 3, 0, [0, -10]), delay: 0 },
      { func: dFunc(6, Math.sqrt(44.09), 3, 0, [0, -10]), delay: 0 },
      { func: dFunc(2.8, 8.5, 3, 0, [0, -10]), delay: 0 },
    ],
  },
  { // 161
    p: 3,
    cost: 9,
    name: "スーパークロス",
    shots: [ //済
      {
        func: dFunc(13.5 * 0.9, 30 * 0.9, 3, 0, [-140, -150]),
        delay: 100,
        drill: true,
      },
      {
        func: dFunc(-13.5 * 0.9, 30 * 0.9, 3, 0, [140, -150]),
        delay: 100,
        drill: true,
      },
      {
        func: dFunc(13.5 * 0.9, 30 * 0.9, 3, 0, [-300, -150]),
        delay: 100,
        drill: true,
      },
      {
        func: dFunc(-13.5 * 0.9, 30 * 0.9, 3, 0, [300, -150]),
        delay: 100,
        drill: true,
      },
    ],
  },
  { // 162
    p: 0,
    cost: 3,
    name: "オバケツイン",
    shots: [ //未
      { func: dFunc(3.8, 15, 3, 0, [0.96, -6.73]), obake: true },
      { func: dFunc(-3.8, 15, 3, 0, [-0.96, -6.73]), obake: true },
    ],
  },
  { // 163
    p: 2,
    cost: 6,
    name: "オバケスター",
    shots: [ //未
      {
        func: dFunc(
          20 * Math.sin((16.87 / 180) * Math.PI),
          20 * Math.cos((16.87 / 180) * Math.PI),
          3,
          0,
          [0, -10],
        ),
        obake: true,
      },
      { func: dFunc(0, 20, 5, 0, [0, -10]), obake: true },
      {
        func: dFunc(
          -20 * Math.sin((16.87 / 180) * Math.PI),
          20 * Math.cos((16.87 / 180) * Math.PI),
          3,
          0,
          [0, -10],
        ),
        obake: true,
      },
    ],
  },
  { // 164
    p: 2,
    cost: 5,
    name: "オバケボム",
    shots: [
      {
        func: effect((p) => {
          p.isme && p.parent.game.setStruct(p.parent.game.me, 5);
        }),
        delay: 0,
      },
    ],
  },
  { // 165
    p: 2,
    cost: 9,
    name: "オバケマグナム",
    shots: [
      { func: dFunc(0, 26, 20), delay: 600, obake: true },
    ],
  },
  { // 166
    p: 10,
    cost: 10,
    name: "トリモチ",
    shots: [],
  },
  { // 167
    p: 2,
    cost: 6,
    name: "ビッグウィング",
    shots: [ //未
      {
        func: dCurve(
          (1 / 6.5) * Math.PI,
          -(1 / 930) * Math.PI,
          3,
          5,
          [0, -20],
          0,
          1.7,
        ),
      },
      {
        func: dCurve(
          (1 / 70) * Math.PI,
          -(1 / 900) * Math.PI,
          3,
          5,
          [0, -20],
          0,
          1.7,
        ),
      },
      {
        func: dCurve(
          -(70 / 630) * Math.PI,
          -(1 / 890) * Math.PI,
          3,
          5.1,
          [0, -20],
          0,
          1.7,
        ),
      },
      {
        func: dCurve(
          (170 / 630) * Math.PI,
          -(1 / 1100) * Math.PI,
          3,
          5,
          [0, -20],
          0,
          1.7,
        ),
      },
      {
        func: dCurve(
          (230 / 630) * Math.PI,
          -(1 / 1200) * Math.PI,
          3,
          4.95,
          [0, -20],
          0,
          1.7,
        ),
      },
      {
        func: dCurve(
          (285 / 630) * Math.PI,
          -(1 / 1400) * Math.PI,
          3,
          4.9,
          [0, -20],
          0,
          1.7,
        ),
      },
    ],
  },
  { // 168
    p: 2,
    cost: 6,
    name: "トリカゴ",
    shots: [
      {
        func: dFunc(
          7.0 * Math.sin((0.000 / 12) * Math.PI),
          7.0 * Math.cos((0.000 / 12) * Math.PI),
          3,
          0,
          [0, -10],
        ),
      },
      {
        func: dFunc(
          7.0 * Math.sin((1.430 / 12) * Math.PI),
          7.0 * Math.cos((1.430 / 12) * Math.PI),
          3,
          0,
          [0, -10],
        ),
      },
      {
        func: dFunc(
          7.0 * Math.sin((-1.430 / 12) * Math.PI),
          7.0 * Math.cos((-1.430 / 12) * Math.PI),
          3,
          0,
          [0, -10],
        ),
      },
      {
        func: dFunc(
          7.0 * Math.sin((-2.570 / 12) * Math.PI),
          7.0 * Math.cos((-2.570 / 12) * Math.PI),
          3,
          0,
          [0, -10],
        ),
      },
      {
        func: dFunc(
          7.0 * Math.sin((2.570 / 12) * Math.PI),
          7.0 * Math.cos((2.570 / 12) * Math.PI),
          3,
          0,
          [0, -10],
        ),
      },
      {
        func: dFunc(
          5.0 * Math.sin((0.515 / 12) * Math.PI),
          5.0 * Math.cos((0.515 / 12) * Math.PI),
          3,
          0,
          [0, -10],
        ),
      },
      {
        func: dFunc(
          5.0 * Math.sin((-0.515 / 12) * Math.PI),
          5.0 * Math.cos((-0.515 / 12) * Math.PI),
          3,
          0,
          [0, -10],
        ),
      },
      {
        func: dFunc(
          5.0 * Math.sin((-1.700 / 12) * Math.PI),
          5.0 * Math.cos((-1.700 / 12) * Math.PI),
          3,
          0,
          [0, -10],
        ),
      },
      {
        func: dFunc(
          5.0 * Math.sin((1.700 / 12) * Math.PI),
          5.0 * Math.cos((1.700 / 12) * Math.PI),
          3,
          0,
          [0, -10],
        ),
      },
    ],
  },
  { // 169
    p: 2,
    cost: 8,
    name: "ダブルウィング",
    shots: [ //未
      {
        func: dCurve(
          (1 / 6.5) * Math.PI,
          -(1 / 930) * Math.PI,
          3,
          5,
          [0, -20],
          0,
          1.7,
        ),
        delay: 400,
      },
      {
        func: dCurve(
          (1 / 70) * Math.PI,
          -(1 / 900) * Math.PI,
          3,
          5,
          [0, -20],
          0,
          1.7,
        ),
        delay: 400,
      },
      {
        func: dCurve(
          -(70 / 630) * Math.PI,
          -(1 / 890) * Math.PI,
          3,
          5.1,
          [0, -20],
          0,
          1.7,
        ),
        delay: 400,
      },
      {
        func: dCurve(
          (170 / 630) * Math.PI,
          -(1 / 1100) * Math.PI,
          3,
          5,
          [0, -20],
          0,
          1.7,
        ),
        delay: 400,
      },
      {
        func: dCurve(
          (230 / 630) * Math.PI,
          -(1 / 1200) * Math.PI,
          3,
          4.95,
          [0, -20],
          0,
          1.7,
        ),
        delay: 400,
      },
      {
        func: dCurve(
          (285 / 630) * Math.PI,
          -(1 / 1400) * Math.PI,
          3,
          4.9,
          [0, -20],
          0,
          1.7,
        ),
        delay: 400,
      },

      {
        func: dCurve(
          -(1 / 6.5) * Math.PI,
          (1 / 930) * Math.PI,
          3,
          5,
          [0, -20],
          0,
          1.7,
        ),
        delay: 1200,
      },
      {
        func: dCurve(
          -(1 / 70) * Math.PI,
          (1 / 900) * Math.PI,
          3,
          5,
          [0, -20],
          0,
          1.7,
        ),
        delay: 1200,
      },
      {
        func: dCurve(
          (70 / 630) * Math.PI,
          (1 / 890) * Math.PI,
          3,
          5.1,
          [0, -20],
          0,
          1.7,
        ),
        delay: 1200,
      },
      {
        func: dCurve(
          -(170 / 630) * Math.PI,
          (1 / 1100) * Math.PI,
          3,
          5,
          [0, -20],
          0,
          1.7,
        ),
        delay: 1200,
      },
      {
        func: dCurve(
          -(230 / 630) * Math.PI,
          (1 / 1200) * Math.PI,
          3,
          4.95,
          [0, -20],
          0,
          1.7,
        ),
        delay: 1200,
      },
      {
        func: dCurve(
          -(285 / 630) * Math.PI,
          (1 / 1400) * Math.PI,
          3,
          4.9,
          [0, -20],
          0,
          1.7,
        ),
        delay: 1200,
      },
    ],
  },
  { // 170
    p: 0,
    cost: 3,
    catchable: true,
    name: "スローブーメラン",
    shots: [ //済
      { func: daen2(400, 150, 0.009, 3, 380) },
    ],
  },
  { // 171
    p: 2,
    cost: 6,
    name: "ハサミショット",
    shots: [ //半済
      {
        func: dFunc(-4.6 * 0.9, Math.sqrt(352.86) * 0.9, 1.5, 0, [0, -10]),
        delay: 0,
        drill: true,
      },
      {
        func: dFunc(-8.5 * 0.9, Math.sqrt(301.77) * 0.9, 1.5, 0, [0, -10]),
        delay: 0,
        drill: true,
      },
      {
        func: dFunc(4.6 * 0.9, Math.sqrt(352.86) * 0.9, 1.5, 0, [0, -10]),
        delay: 0,
        drill: true,
      },
      {
        func: dFunc(8.5 * 0.9, Math.sqrt(301.77) * 0.9, 1.5, 0, [0, -10]),
        delay: 0,
        drill: true,
      },
    ],
  },
  { // 172
    p: 2,
    cost: 4,
    name: "オオガマ",
    catchable: true,
    shots: [ //済
      { func: daen2(395, 380, 0.014, 3, 350, 2, 0), delay: 50 },
    ],
  },
  { // 173
    p: 2,
    cost: 10,
    name: "ジャグリング",
    catchable: true,
    shots: [ //済
      { func: daen2(410, 100, 0.0098, 3, 360), delay: 300 },
      { func: daen2(410, 175, 0.0123, 3, 360), delay: 300 },
      { func: daen2(410, 250, 0.0148, 3, 360), delay: 300 },
      { func: daen2(410, -100, 0.0110, 3, 360), delay: 300 },
      { func: daen2(410, -175, 0.0135, 3, 360), delay: 300 },
      { func: daen2(410, -250, 0.0160, 3, 360), delay: 300 },
    ],
  },
  { // 174
    p: 0,
    cost: 1,
    name: "スーパースロー",
    shots: [ //済
      { func: dFunc(0, 1.8, 3), delay: 0 },
    ],
  },
  { // 175
    p: 2,
    cost: 3,
    name: "カカシをよぶ",
    shots: [
      {
        func: effect((p) => {
          p.isme && p.parent.game.setStruct(p.parent.game.me, 15);
        }),
        delay: 0,
      },
    ],
  },
  { // 176
    p: 2,
    cost: 5,
    name: "カカシスター",
    shots: kakashistar(false, 13.5), //済
  },
  { // 177
    p: 3,
    cost: 10,
    name: "コメット",
    shots: [ //半済
      {
        func: dKaiten(0, (0.05) * Math.PI, 25.5, 0, 15, 2.3, 5, 1, 1, [0, -30]),
        delay: 150,
      },
      {
        func: dKaiten(
          (2 / 3) * Math.PI,
          (0.05) * Math.PI,
          25.5,
          0,
          15,
          2.3,
          5,
          1,
          1,
          [0, -30],
        ),
        delay: 150,
      },
      {
        func: dKaiten(
          (-2 / 3) * Math.PI,
          (0.05) * Math.PI,
          25.5,
          0,
          15,
          2.3,
          5,
          1,
          1,
          [0, -30],
        ),
        delay: 150,
      },
    ],
  },
  { // 178
    p: 2,
    cost: 4,
    name: "フットワーク",
    shots: [
      { func: huurie() },
    ],
  },
  { // 179
    p: 2,
    cost: 5,
    name: "フック",
    shots: [
      { func: kasoku4(14, -0.000168, 0.95, 5, 0, [40, -170]), delay: 110 },
    ],
  },
  { // 180
    p: 2,
    cost: 3,
    name: "コークスクリュー",
    shots: [
      {
        func: kasoku7(0.00000004, 0.000000009, 5, 0, [-60, -100]),
        delay: 50,
        drill: true,
      },
    ],
  },
  { // 181
    p: 3,
    cost: 8,
    name: "デンプシーロール",
    shots: [
      { func: kasoku5(21, -0.0125, 0.84, 5, 0, [30, -50]), delay: 250 },
      { func: kasoku5(21, -0.0125, 0.84, 5, 0, [30, -50]), delay: 600 },
      { func: kasoku5(21, -0.0125, 0.84, 5, 0, [30, -50]), delay: 1050 },
      { func: kasoku5(-21, 0.0125, 0.84, 5, 0, [-30, -50]), delay: 475 },
      { func: kasoku5(-21, 0.0125, 0.84, 5, 0, [-30, -50]), delay: 825 },
      { func: kasoku5(-21, 0.0125, 0.84, 5, 0, [-30, -50]), delay: 1275 },
    ],
  },
  { // 182
    p: 10,
    cost: 10,
    name: "サポーター",
    shots: [],
  },
  { // 183
    p: 10,
    cost: 10,
    name: "かくれファン",
    shots: [],
  },
  { // 184
    p: 2,
    cost: 4,
    name: "ボディガード",
    shots: [
      {
        func: syuki({
          1: effect((p) => {
            p.isme && p.parent.game.setStruct(p.parent.game.me, 29);
          }),
          2: effect((p) => {
            p.isme && p.parent.game.setStruct(p.parent.game.me, 30);
          }),
          0: effect((p) => {
            p.isme && p.parent.game.setStruct(p.parent.game.me, 31);
          }),
        }, 3),
      },
    ],
  },
  { // 185
    p: 10,
    cost: 10,
    name: "バックダンサー",
    shots: [],
  },
  { // 186
    p: 0,
    cost: 3,
    name: "リーダーカーブ",
    shots: [
      { func: curve(0.9, 0.92, 17.5, 3) },
    ],
  },
  { // 187
    p: 2,
    cost: 4,
    name: "デルタゴート",
    shots: [
      {
        func: effect((p) => {
          p.isme && p.parent.game.setStruct(p.parent.game.me, 21);
        }),
        delay: 0,
      },
    ],
  },
  { // 188
    p: 2,
    cost: 4,
    name: "カーブゴート",
    shots: [
      {
        func: effect((p) => {
          p.isme && p.parent.game.setStruct(p.parent.game.me, 22);
        }),
        delay: 0,
      },
    ],
  },
  { // 189
    p: 2,
    cost: 4,
    name: "ゴートボム",
    shots: [
      {
        func: effect((p) => {
          p.isme && p.parent.game.setStruct(p.parent.game.me, 33);
        }),
        delay: 0,
      },
    ],
  },
  { // 190
    p: 0,
    cost: 2,
    name: "ろくろ",
    shots: [
      { func: rokuro() },
    ],
  },
  { // 191
    p: 1,
    cost: 2,
    name: "せなかのツボ",
    shots: [
      {
        func: effect((p) => {
          p.isme && p.parent.game.setStruct(p.parent.game.me, 16);
        }),
        delay: 0,
      },
    ],
  },
  { // 192
    p: 2,
    cost: 1,
    X: true,
    name: "へんかのツボ",
    shots: [
      {
        func: X({
          1: effect((p) => {
            p.isme && p.parent.game.setStruct(p.parent.game.me, 8);
          }),
          2: effect((p) => {
            p.isme && p.parent.game.setStruct(p.parent.game.me, 9);
          }),
          3: effect((p) => {
            p.isme && p.parent.game.setStruct(p.parent.game.me, 9);
          }),
          4: effect((p) => {
            p.isme && p.parent.game.setStruct(p.parent.game.me, 10);
          }),
          5: effect((p) => {
            p.isme && p.parent.game.setStruct(p.parent.game.me, 10);
          }),
          6: effect((p) => {
            p.isme && p.parent.game.setStruct(p.parent.game.me, 11);
          }),
          7: effect((p) => {
            p.isme && p.parent.game.setStruct(p.parent.game.me, 11);
          }),
          8: effect((p) => {
            p.isme && p.parent.game.setStruct(p.parent.game.me, 12);
          }),
          9: effect((p) => {
            p.isme && p.parent.game.setStruct(p.parent.game.me, 12);
          }),
          10: effect((p) => {
            p.isme && p.parent.game.setStruct(p.parent.game.me, 13);
          }),
        }),
        delay: 0,
      },
    ],
  },
  { // 193
    p: 1,
    cost: 5,
    name: "モノマネのツボ",
    shots: [
      {
        func: effect((p) => {
          p.isme && p.parent.game.setStruct(p.parent.game.me, 4);
        }),
        delay: 0,
      },
    ],
  },
  { // 194
    p: 0,
    cost: 3,
    name: "イナズマぎり",
    shots: [ //済
      { func: inazuma() },
    ],
  },
  { // 195
    p: 2,
    cost: 4,
    name: "エックスぎり",
    shots: [ //済
      { func: xgiri1(), delay: 160, drill: true },
      { func: xgiri2(), delay: 160, drill: true },
    ],
  },
  { // 196
    p: 2,
    cost: 4,
    name: "ヘビ",
    shots: [
      { func: snake(3), drill: true },
      {
        func: delay(36.5, snake(1.5)),
      },
      {
        func: delay(73, snake(1.5)),
      },
      {
        func: delay(109.5, snake(1.5)),
      },
      {
        func: delay(146, snake(1.5)),
      },
    ],
  },
  { // 197
    p: 3,
    cost: 9,
    catchable: true,
    name: "ツバメがえし",
    shots: [
      { func: daen2(420, 0, 0.044, 3, 380) },
    ],
  },
  { // 198
    p: 2,
    cost: 6,
    name: "ドリルスター",
    shots: [ //未
      {
        func: dFunc(
          20 * Math.sin((16.87 / 180) * Math.PI),
          20 * Math.cos((16.87 / 180) * Math.PI),
          3,
          0,
          [0, -10],
        ),
        drill: true,
      },
      { func: dFunc(0, 20, 5, 0, [0, -10]), drill: true },
      {
        func: dFunc(
          -20 * Math.sin((16.87 / 180) * Math.PI),
          20 * Math.cos((16.87 / 180) * Math.PI),
          3,
          0,
          [0, -10],
        ),
        drill: true,
      },
    ],
  },
  { // 199
    p: 2,
    cost: 4,
    name: "トビウオ",
    shots: [
      { func: ago(2.3, 0.92, 20, 3, [0, 10]) },
    ],
  },
  { // 200
    p: 2,
    cost: 4,
    name: "サテライト",
    shots: [ //半済
      { func: dFunc(0, 16, 1.5, 0) },
      {
        func: dKaitenFuncif(
          5,
          0.01 * Math.PI,
          (1 / 2) * Math.PI,
          0.009 * Math.PI,
          0,
          6.4,
          0,
          6.4,
          3,
          0,
          5,
          [0, 0],
          5,
          0,
        ),
      },
      {
        func: dKaitenFuncif(
          5,
          0.01 * Math.PI,
          -(1 / 2) * Math.PI,
          0.009 * Math.PI,
          0,
          6.4,
          0,
          6.4,
          3,
          0,
          5,
          [0, 0],
          5,
          0,
        ),
      },
      //{ func: dKaitenFuncif(5, 0.01 * Math.PI,  (1 / 2) * Math.PI, 0.009 * Math.PI, 0, 6.4, 0, 6.4, 5, 0, 5, [0, 0], 1.7, 0)},
      //{ func: dKaitenFuncif(5, 0.01 * Math.PI, -(1 / 2) * Math.PI, 0.009 * Math.PI, 0, 6.4, 0, 6.4, 5, 0, 5, [0, 0], 1.7, 0)}
    ],
  },
  { // 201
    p: 2,
    cost: 6,
    name: "ミックススター",
    shots: kakashistar(true, 22), //未
  },
  { // 202
    p: 2,
    cost: 4,
    name: "ヘヴィカーブ",
    shots: [
      { func: curve(1.05, 0.95, 12, 10, [0, 10]), delay: 0 },
    ],
  },
  { // 203
    p: 0,
    cost: 2,
    name: "ドリルよいどれ",
    shots: [ //済
      { func: yoidore(0.8), delay: 0, drill: true },
    ],
  },
  { // 204
    p: 2,
    cost: 3,
    name: "ドリルブーメラン",
    catchable: true,
    shots: [
      { func: daen2(400, -30, 0.012, 3, 380), drill: true },
    ],
  },
  { // 205
    p: 0,
    cost: 2,
    name: "オバケよいどれ",
    shots: [ //済
      { func: yoidore(0.8), delay: 0, obake: true },
    ],
  },
  { // 206
    p: 0,
    cost: 2,
    name: "オバケドリル",
    shots: [ //未
      { func: dFunc(0, 14, 3), drill: true, obake: true },
    ],
  },
  { // 207
    p: 2,
    cost: 4,
    name: "しんかショット",
    shots: [ //未
      { func: shinka() },
    ],
  },
  { // 208
    p: 2,
    cost: 4,
    name: "ミラーふうせん",
    shots: [ //未
      { func: mirrorfusen() },
    ],
  },
  { // 209
    p: 0,
    cost: 3,
    name: "ヘヴィモチ",
    shots: [ //致命的
      { func: shinaru(9) },
    ],
  },
  { // 210
    p: 3,
    cost: 8,
    name: "ドリルラッシュ",
    shots: rush(1, true),
  },
  { // 211
    p: 3,
    cost: 1,
    X: true,
    name: "へんそくショット",
    shots: [
      {
        func: X({
          1: dFunc(0, 9, 3),
          2: dFunc(0, 15, 3),
          3: dFunc(0, 21, 3),
          4: dFunc(0, 27, 3),
          5: dFunc(0, 33, 3),
          6: dFunc(0, 39, 3),
          7: dFunc(0, 45, 3),
          8: dFunc(0, 51, 3),
          9: dFunc(0, 57, 3),
          10: dFunc(0, 63, 3),
        }),
        delay: 0,
      },
    ],
  },
  { // 212
    p: 3,
    cost: 8,
    name: "ムーンエイト",
    shots: [
      { func: dFunc(0.00, 14, 3, 0, [0, 10]), delay: 300, drill: true },
      { func: curve(0.40, 0.93, 14, 3, [0, 10]), delay: 445, drill: true },
      { func: curve(0.80, 0.93, 14, 3, [0, 10]), delay: 590, drill: true },
      { func: curve(1.20, 0.93, 14, 3, [0, 10]), delay: 735, drill: true },
      { func: curve(1.60, 0.93, 14, 3, [0, 10]), delay: 880, drill: true },
      { func: curve(2.00, 0.93, 14, 3, [0, 10]), delay: 1025, drill: true },
      { func: curve(2.40, 0.93, 14, 3, [0, 10]), delay: 1170, drill: true },
      { func: curve(2.80, 0.93, 14, 3, [0, 10]), delay: 1315, drill: true },
    ],
  },
  { // 213
    p: 3,
    cost: 6,
    name: "バルーンファイブ'",
    shots: [
      {
        func: fusen(
          8.114 * Math.sin((0.00 / 12) * Math.PI),
          8.114 * Math.cos((0.00 / 12) * Math.PI),
          1.5,
          8,
        ),
      },
      {
        func: fusen(
          8.114 * Math.sin((0.95 / 12) * Math.PI),
          8.114 * Math.cos((0.95 / 12) * Math.PI),
          1.5,
          8,
        ),
      },
      {
        func: fusen(
          8.114 * Math.sin((-0.95 / 12) * Math.PI),
          8.114 * Math.cos((-0.95 / 12) * Math.PI),
          1.5,
          8,
        ),
      },
      {
        func: fusen(
          8.114 * Math.sin((1.90 / 12) * Math.PI),
          8.114 * Math.cos((1.90 / 12) * Math.PI),
          1.5,
          8,
        ),
      },
      {
        func: fusen(
          8.114 * Math.sin((-1.90 / 12) * Math.PI),
          8.114 * Math.cos((-1.90 / 12) * Math.PI),
          1.5,
          8,
        ),
      },
    ],
  },
  { // 214
    p: 0,
    cost: 2,
    name: "ツボショットA",
    shots: [ //未
      { func: tuboA() },
      { func: tuboA(-1) },
      //{ func: tuboAd() },
      //{ func: tuboAd(-1) },
    ],
  },
  { // 215
    p: 2,
    cost: 3,
    name: "せなかのキズ",
    catchable: true,
    shots: [
      {
        func: syuki({
          0: senaka(),
          1: senaka(-5.5 / 6 * Math.PI, -0.00001 * Math.PI, 3, 8),
        }, 2),
      },
    ],
  },
  { // 216
    p: 0,
    cost: 3,
    name: "つぼショットB",
    shots: [ //未
      { func: tuboB() },
      { func: tuboB(-1) },
    ],
  },
  { // 217
    p: 0,
    cost: 10,
    name: "ダークマター試",
    shots: [ //致命的
      { func: kasoku2(-0.003, 1.6, 1.5, 0, [270, -50]), drill: true },
      { func: kasoku(-0.35, 1.6, 1.5, 0, [270, -50]), drill: true },
      { func: kasoku(-0.45, 1.6, 1.5, 0, [270, -50]), drill: true },
      { func: kasoku5(9, -0.00005, 1.6, 1.5, 0, [30, -10]), drill: true },
      { func: kasoku(-0.85, 1.6, 1.5, 0, [280, -50]), drill: true },
    ],
  },
  { // 218
    p: 0,
    cost: 2,
    name: "ダークリーダー",
    shots: [
      { func: dFunc(0, 5, 3), drill: true },
      { func: dark(), drill: true },
      { func: dark2(), drill: true },
      { func: dark2(-1), drill: true },
    ],
  },
  { // 219
    p: 2,
    cost: 4,
    name: "ダークゴート",
    shots: [
      {
        func: effect((p) => {
          p.isme && p.parent.game.setStruct(p.parent.game.me, 32);
        }),
        delay: 0,
      },
    ],
  },
  { // 220
    p: 0,
    cost: 0,
    name: "ダークマター",
    shots: [ //致命的
      { func: fu1() },
    ],
  },
  { // 221
    p: 0,
    cost: 10,
    name: "ネット",
    shots: [ //試
      { func: spider1(0, 12, 1.5) },
      { func: spider2(0, 12, 1.5) },
      { func: spider3(0, 12, 1.5) },
      { func: spider4(0, 12, 1.5) },
      { func: spider5(0, 12, 1.5) },
      { func: spider6(0, 12, 1.5) },
      { func: spider7(0, 12, 1.5) },
    ],
  },
  { // 222
    p: 10,
    cost: 10,
    name: "a",
    shots: [ //未
      { func: ruijo() },
    ],
  },
  { // 223
    p: 1,
    cost: 4,
    name: "くものす",
    shots: [ //試
      {
        func: effect((s) => {
          if (s.isme) {
            s.parent.game.enemy.st.speed *= 0.98;
          } else {
            s.parent.game.me.st.speed *= 0.98;
          }
        }),
      },
    ],
  },
  { // 224
    p: 10,
    cost: 10,
    name: "てんめつショット",
    shots: [ //試
      { func: dFunx() },
    ],
  },
  { // 225
    p: 1,
    cost: 2,
    name: "だましP",
    shots: [
      { func: dFunc(0, 4, 7.5), delay: 0, texture: "P" },
    ],
  },
  { // 226
    p: 2,
    cost: 3,
    name: "ヒトデをよぶ",
    shots: [
      {
        func: effect((p) => {
          p.isme && p.parent.game.setStruct(p.parent.game.me, 0);
        }),
        delay: 0,
      },
    ],
  },
  { // 227
    p: 1,
    cost: 3,
    name: "てっぺきをよぶ",
    shots: [
      {
        func: effect((p) => {
          p.isme && p.parent.game.setStruct(p.parent.game.me, 1);
        }),
        delay: 0,
      },
    ],
  },
  { // 228
    p: 1,
    cost: 3,
    name: "かやく",
    shots: kayaku(18, 7, 0, 10),
  },
  { // 229
    p: 1,
    cost: 3,
    name: "ドリル",
    shots: kayaku(20, 13, 0, 10, false, true),
  },
  { // 230
    p: 1,
    cost: 3,
    name: "オバケ",
    shots: kayaku(22, 11, 200, 10, true),
  },
  { // 231
    p: 1,
    cost: 3,
    name: "あわ",
    shots: awabomb(false, false),
  },
  { // 232
    p: 1,
    cost: 3,
    name: "へんか1",
    shots: kayaku(6, 7, 0, 5),
  },
  { // 233
    p: 1,
    cost: 3,
    name: "へんか2",
    shots: [
      { func: dFunc(0, 25, 1.5) },
    ],
  },
  { // 234
    p: 0,
    cost: 0,
    name: "へんか3", //未
    shots: tubo_spread(6, -1.42, 1.5, 3, 1), //-1.4
  },
  { // 235
    p: 1,
    cost: 3,
    name: "へんか4",
    shots: [
      { func: dFunc(0, 18, 3) },
      { func: dFunc(0, 18, 3), delay: 170 },
      { func: dFunc(0, 18, 3), delay: 320 },
    ],
  },
  { // 236
    p: 0,
    cost: 0,
    name: "へんか5",
    shots: tubo_spread(8, 1.7, 1.5, 3, 1.5),
  },
  { // 237
    p: 1,
    cost: 3,
    name: "へんか6",
    shots: [
      { func: dFunc(0, 27, 11) },
    ],
  },
  { // 238
    p: 0,
    cost: 2,
    name: "カカシショット",
    shots: [ //済
      { func: kakashi1(1.5), drill: true },
      { func: kakashi2(1.5), obake: true },
      { func: kakashi3(1.5) },
    ],
  },
  { // 239
    p: 0,
    cost: 0,
    name: "せなかショット",
    shots: [ //済
      { func: sena(0, -5, 3, 0, [0, 0]) },
    ],
  },
  { // 240
    p: 1,
    cost: 3,
    name: "プチよいどれ",
    shots: [
      { func: yoidore(0.45, 1.5) },
    ],
  },
  { // 241
    p: 1,
    cost: 3,
    name: "ふりょうよいどれ",
    shots: [
      { func: yoidore(0.55, 1.5), drill: true },
    ],
  },
  { // 242
    p: 2,
    cost: 4,
    name: "クジラツイン",
    shots: [
      { func: dFunc(5, 15, 8), delay: 0 },
      { func: dFunc(-5, 15, 8), delay: 0 },
    ],
  },
  { // 243
    p: 2,
    cost: 4,
    name: "ライオンツイン",
    shots: [
      { func: dFunc(5.2, 15, 9.8), delay: 0, drill: true },
      { func: dFunc(-5.2, 15, 9.8), delay: 0, drill: true },
    ],
  },
  { // 244
    p: 0,
    cost: 2,
    name: "子分ショット",
    shots: [
      { func: dFunc(0, 8.8, 1.5) },
    ],
  },
  { // 245
    p: 0,
    cost: 2,
    name: "デルタ子分ショット",
    shots: [
      { func: dFuncifif(0, 9, 0, 0, 0, 17, 25, 10, 0, 1.5, [0, 0]) },
      {
        func: dFuncifif(
          -4.5 * Math.sqrt(3),
          -4.5,
          0,
          0,
          0,
          17,
          25,
          20,
          0,
          1.5,
          [0, 0],
        ),
      },
      {
        func: dFuncifif(4.5 * Math.sqrt(3), -4.5, 0, 0, 0, 17, 25, 30, 0, 1.5, [
          0,
          0,
        ]),
      },
    ],
  },
  { // 246
    p: 0,
    cost: 2,
    name: "カーブ子分ショット",
    shots: [
      { func: curve(0.5, 0.9, 8.8, 1.5, [0, 0]) },
    ],
  },
  { // 247
    p: 0,
    cost: 2,
    name: "タマゴショット",
    shots: [
      { func: dFunc(0, 8.8, 1.5) },
    ],
  },
  { // 248
    p: 0,
    cost: 2,
    name: "タマゴ火薬",
    shots: eggbomb(0.7),
  },
  { // 249
    p: 1,
    cost: 3,
    name: "オバケボーイ",
    shots: [
      { func: dFunc(0, 16.5, 1.5), obake: true },
    ],
  },
  { // 250
    p: 1,
    cost: 3,
    name: "モグラボーイ",
    shots: [
      { func: dFunc(0, 16.5, 1.5), drill: true },
    ],
  },
  { // 251
    p: 1,
    cost: 3,
    name: "クジラボディ",
    shots: [
      { func: dFunc(0, 10, 7) },
    ],
  },
  { // 252
    p: 1,
    cost: 3,
    name: "ナメボディ",
    shots: [
      { func: curve(0.4, 0.75, 2.8, 7), drill: true },
    ],
  },
  { // 253
    p: 1,
    cost: 3,
    name: "シシボディ",
    shots: [
      { func: dFunc(0, 10.5, 7.5), drill: true },
    ],
  },
  { // 254
    p: 1,
    cost: 3,
    name: "ウサギボーイ",
    shots: [
      { func: dFunc(0, 18, 1.5) },
    ],
  },
  { // 255
    p: 1,
    cost: 3,
    name: "ダークゴート中身",
    shots: [
      {
        func: dFuncifif(0, 7.7, 0, 0, 0, 12.5, 30, 3, 0, 1.5, [0, -5]),
        drill: true,
      },
      {
        func: dFuncifif(
          7.7 * Math.sin(0.4 * Math.PI),
          7.7 * Math.cos(0.4 * Math.PI),
          0,
          0,
          0,
          19.5,
          30,
          2,
          0,
          1.5,
          [0, -5],
        ),
        drill: true,
      },
      {
        func: dFuncifif(
          -7.7 * Math.sin(0.4 * Math.PI),
          7.7 * Math.cos(0.4 * Math.PI),
          0,
          0,
          0,
          19.5,
          30,
          2,
          0,
          1.5,
          [0, -5],
        ),
        drill: true,
      },
      {
        func: dFuncifif(
          7.7 * Math.sin(0.8 * Math.PI),
          7.7 * Math.cos(0.8 * Math.PI),
          0,
          0,
          0,
          26,
          30,
          2,
          0,
          1.5,
          [0, -5],
        ),
        drill: true,
      },
      {
        func: dFuncifif(
          -7.7 * Math.sin(0.8 * Math.PI),
          7.7 * Math.cos(0.8 * Math.PI),
          0,
          0,
          0,
          26,
          30,
          2,
          0,
          1.5,
          [0, -5],
        ),
        drill: true,
      },
    ],
  },
  { // 256
    p: 1,
    cost: 3,
    name: "ゴートボム中身",
    shots: [
      { func: dCurve(0, -0.00615 * Math.PI, 1.5, 4, [0, -5]) },
      { func: dCurve(0.4 * Math.PI, -0.00615 * Math.PI, 1.5, 4, [0, -5]) },
      { func: dCurve(-0.4 * Math.PI, -0.00615 * Math.PI, 1.5, 4, [0, -5]) },
      { func: dCurve(0.8 * Math.PI, -0.00615 * Math.PI, 1.5, 4, [0, -5]) },
      { func: dCurve(-0.8 * Math.PI, -0.00615 * Math.PI, 1.5, 4, [0, -5]) },
    ],
  },
  /* {//

        p: 0, cost: 0, name: "チャージ", shots: [ //未
            { func: effect((s) => {
                    if (s.isme) {
                        s.parent.game.me.st.cost_speed += 0.1
                    } else {
                        s.parent.game.enemy.st.cost_speed += 0.1
                    }})
            }
        ]
    }, */
  /*
    {//
        p: 0, cost: 1, name: "しょぼショット", shots: [
            { func: dFunc(0, 6.5, 3), delay: 0 }
        ]
    },*/
];
export const chara_list: CharaDef[] = [
  {
    name: "ヒトデせいじん",
    desc: "バランスのとれた使いやすいやつ！",
    skill1: [0, 84],
    skill2: [1, 85, 198, 199, 200, 201], //226
    skill3: [2, 86], // 2, 86, 87
  },
  {
    name: "ウサギせいじん",
    desc: "こいつのショットはシンプルにはやい！",
    skill1: [3],
    skill2: [4, 88, 89],
    skill3: [5, 90, 91, 211],
  },
  {
    name: "タコせいじん",
    desc: "クネクネまがるショットをうつひねくれものだ！",
    skill1: [6, 92],
    skill2: [7, 93, 94, 202],
    skill3: [8, 95],
  },
  {
    name: "オバケせいじん",
    desc: "おそろしいオバケショットの使い手だ！",
    skill1: [9, 205, 206],
    skill2: [10, 96, 97, 98],
    skill3: [11, 99],
  },
  {
    name: "モグラせいじん",
    desc: "Pボックスをつらぬくドリルをあやつる！",
    skill1: [12, 203, 206],
    skill2: [13, 100, 101, 102, 198, 204],
    skill3: [14, 103],
  },
  {
    name: "クジラせいじん",
    desc: "ショットがデカい! へヴィ級ファイター！",
    skill1: [15, 104],
    skill2: [16, 105, 106, 202],
    skill3: [17, 107],
  },
  {
    name: "カエルせいじん",
    desc: "突然ふくらむ風船みたいなやつだ！",
    skill1: [18],
    skill2: [19, 108, 109, 110, 207, 208, 213],
    skill3: [20, 111],
  },
  {
    name: "ナメクジせいじん",
    desc: "いやらしい戦法をとる！",
    skill1: [21, 112],
    skill2: [22, 113, 114, 208],
    skill3: [23, 115],
  },
  {
    name: "ヒツジせいじん",
    desc: "ふわふわしててもあたればちめいしょうだ！",
    skill1: [0], //24, 116
    skill2: [1], //25, 117, 118
    skill3: [2], //26, 119
  },
  {
    name: "イカせいじん",
    desc: "きたない戦法をこのむイカれたやつだ！",
    skill1: [27, 120],
    skill2: [28, 121], //28, 121, 122
    skill3: [29, 123],
  },
  {
    name: "シシせいじん",
    desc: "ハイパーショットはすべてをふんさいする！",
    skill1: [30, 124],
    skill2: [31, 125, 126, 127], //31, 125, 126, 127, 128
    skill3: [32],
  },
  {
    name: "イテせいじん",
    desc: "ねらったエモノをクールにおいこむスペース狩人だ！",
    skill1: [33, 129],
    skill2: [34, 130, 131],
    skill3: [35, 132],
  },
  {
    name: "ウオせいじん",
    desc: "むじゅうりょくの海をすいすいおよぐ！",
    skill1: [36, 133],
    skill2: [37, 134, 135, 199], //37, 134, 135, 136, 199
    skill3: [38, 137],
  },
  {
    name: "テンビンせいじん",
    desc: "宇宙の秩序をみだすものにさばきをくだす！",
    skill1: [39, 138],
    skill2: [40, 139, 140],
    skill3: [41, 141],
  },
  {
    name: "ピエロせいじん",
    desc: "鏡の法則をつかんだら一人前のピエロ星人だ！",
    skill1: [42],
    skill2: [43, 142, 143, 208, 225],
    skill3: [44, 144], //44, 144, 145
  },
  {
    name: "カピバラせいじん",
    desc: "おだやかな性格でともだちが多い！",
    skill1: [45, 146, 203, 205],
    skill2: [46, 147, 148],
    skill3: [47, 149, 210],
  },
  {
    name: "ムーンせいじん",
    desc: "ゆらゆらうごくミステリアスな存在だ！",
    skill1: [48, 150],
    skill2: [49, 151, 152, 200],
    skill3: [50, 153, 212],
  },
  {
    name: "カニせいじん",
    desc: "怒るとあわをたくさんはいてくる！",
    skill1: [51, 154],
    skill2: [52, 155, 156],
    skill3: [53, 157],
  },
  {
    name: "フタゴせいじん",
    desc: "1度に2発うってくるやっかいなフタゴだ！",
    skill1: [54, 158],
    skill2: [55, 159, 160],
    skill3: [56, 161],
  },
  {
    name: "ファントムせいじん",
    desc: "顔ににあわずおくびょうな性格だ！",
    skill1: [57, 162, 205, 206],
    skill2: [58, 163, 164],
    skill3: [59, 165],
  },
  {
    name: "ニワトリせいじん",
    desc: "大切なタマゴをこわすものは絶対にゆるさない！",
    skill1: [60], //60, 166
    skill2: [61, 167, 168], //61, 167, 168
    skill3: [62, 169], //62, 169
  },
  {
    name: "サソリせいじん",
    desc: "じまんのハサミでブーメランをキャッチ！",
    skill1: [63, 170],
    skill2: [64, 171, 172, 204],
    skill3: [65, 173],
  },
  {
    name: "カカシせいじん",
    desc: "練習にきた宇宙人を返りうちにするのが生きがいだ！",
    skill1: [66, 174],
    skill2: [67, 175, 176, 201],
    skill3: [68, 177],
  },
  {
    name: "オウシせいじん",
    desc: "あいさつがわりのジャブであいてをノックアウト！",
    skill1: [69],
    skill2: [70, 178, 179, 180],
    skill3: [71, 181],
  },
  {
    name: "オトメせいじん",
    desc: "じぶんの手は汚さない宇宙のトップアイドルだ！",
    skill1: [72], //72, 182
    skill2: [73, 184], //73, 183, 184
    skill3: [74], //74, 185
  },
  {
    name: "ヤギせいじん",
    desc: "おだやかにみえるがすべてをぶっこわしたいとおもっている！",
    skill1: [75, 186],
    skill2: [76, 187, 188],
    skill3: [77, 189],
  },
  {
    name: "ミズガメせいじん",
    desc: "まかふしぎなパワーをたくわえている！",
    skill1: [78, 190, 214, 216],
    skill2: [79, 191, 192],
    skill3: [80, 193],
  },
  {
    name: "ペルセウスせいじん",
    desc: "あらゆる武器をつかいこなすウェポンマスターだ！",
    skill1: [81, 194],
    skill2: [82, 195, 196], //82, 195, 196, 215
    skill3: [83, 197],
  },
  /*
    {
        name: "クラゲせいじん",
        desc: "",
        skill1: [110, 109],
        skill2: [111, 112],
        skill3: [113, 114],
    },
    */
];

function yoidore(
  s = 1,
  size = 3,
  dx1 = 3.4,
  dx2 = -4.6,
  dx3 = 8,
  dx4 = -6.9,
  dx5 = -2.8,
  dx6 = 6.6,
  dx7 = 2.5,
  dy1 = 18.8125,
  dy2 = 18.35,
  dy3 = 17.3,
  dy4 = 18.13,
  dy5 = 19.55,
  dy6 = 17.92,
  dy7 = 19.3,
  add = 0,
  [x, y] = [0, 0],
) {
  return syuki({
    0: dFunc(dx7 * s, dy7 * s, size, add, [x, y]),
    1: dFunc(dx1 * s, dy1 * s, size, add, [x, y]),
    2: dFunc(dx2 * s, dy2 * s, size, add, [x, y]),
    3: dFunc(dx3 * s, dy3 * s, size, add, [x, y]),
    4: dFunc(dx4 * s, dy4 * s, size, add, [x, y]),
    5: dFunc(dx5 * s, dy5 * s, size, add, [x, y]),
    6: dFunc(dx6 * s, dy6 * s, size, add, [x, y]),
  }, 7);
}

function switchdamashi(s = 16.6) {
  return syuki({
    0: damashi(s, 0, 3, 1.7 * s / 16.6),
    1: damashi(s, 1, 3, 1.7 * s / 16.6),
  }, 2);
}
function fuiuchi() {
  return syuki({
    0: curve(0, 1, 4, 1.5),
    1: curve(0.3, 1, 25, 13),
    2: curve(0.25, 1, 23, 11),
    3: curve(0.23, 1, 20, 9),
    4: curve(0.2, 1, 15, 8),
    5: curve(0.15, 1, 12, 6),
    6: curve(0.15, 1, 10, 5),
    7: curve(0.1, 1, 6, 4),
    8: curve(0.1, 1, 5.5, 3.5),
    9: curve(0, 1, 5, 2.5),
  }, 10);
}
/*function shinka() {
    return syuki({
        1: dFunc(0, 8.55, 1.5),
        2: curve(0.15, 1, 8.55, 1.5),
        3: curve(0.3, 1, 8.55, 1.5),
        4: fusen(0, 8.55, 1.5, 4),
        5: fusen(0, 8.55, 1.5, 7),
        6: fusen(0, 8.55, 1.5, 10),
        7: fusen(0, 8.55, 1.5, 13),
        8: fusen(0, 8.55, 1.5, 16),
        9: fusen(0, 8.55, 1.5, 19),
        10: fusen(0, 8.55, 1.5, 23),
        11: fusen(0, 8.55, 1.5, 27),
        12: fusen(0, 8.55, 1.5, 31),
        13: fusen(0, 8.55, 1.5, 35),
        14: fusen(0, 8.55, 1.5, 39),
        15: fusen(0, 8.55, 1.5, 43),
        16: fusen(0, 8.55, 1.5, 43),
        17: fusen(0, 8.55, 1.5, 43),
        18: fusen(0, 8.55, 1.5, 43),
        19: fusen(0, 8.55, 1.5, 43),
        20: fusen(0, 8.55, 1.5, 43),
        21: fusen(0, 8.55, 1.5, 43),
        22: fusen(0, 8.55, 1.5, 43),
        23: fusen(0, 8.55, 1.5, 43),
        24: fusen(0, 8.55, 1.5, 43),
        25: fusen(0, 8.55, 1.5, 43),
        26: fusen(0, 8.55, 1.5, 43),
        27: fusen(0, 8.55, 1.5, 43),
        28: fusen(0, 8.55, 1.5, 43),
        29: fusen(0, 8.55, 1.5, 43),
        30: fusen(0, 8.55, 1.5, 43),
        31: fusen(0, 8.55, 1.5, 43),
        32: fusen(0, 8.55, 1.5, 43),
        33: fusen(0, 8.55, 1.5, 43),
        34: fusen(0, 8.55, 1.5, 43),
        35: fusen(0, 8.55, 1.5, 43),
        36: fusen(0, 8.55, 1.5, 43),
        37: fusen(0, 8.55, 1.5, 43),
        38: fusen(0, 8.55, 1.5, 43),
        39: fusen(0, 8.55, 1.5, 43),
        0: fusen(0, 8.55, 1.5, 100),
    }, 40)
}*/

function shinka(): MoveFunc {
  return function (t, extra) {
    switch (extra?.count || 0) {
      case 1:
        return dFunc(0, 8.13, 1.5).call(this, t);
      case 2:
        return curve(0.15, 1, 8.13, 1.5).call(this, t);
      case 3:
        return curve(0.3, 1, 8.13, 1.5).call(this, t);
      case 4:
        return fusen(0, 8.13, 1.5, 4).call(this, t);
      case 5:
        return fusen(0, 8.13, 1.5, 7).call(this, t);
      case 6:
        return fusen(0, 8.13, 1.5, 10).call(this, t);
      case 7:
        return fusen(0, 8.13, 1.5, 13).call(this, t);
      case 8:
        return fusen(0, 8.13, 1.5, 16).call(this, t);
      case 9:
        return fusen(0, 8.13, 1.5, 19).call(this, t);
      case 10:
        return fusen(0, 8.13, 1.5, 23).call(this, t);
      case 11:
        return fusen(0, 8.13, 1.5, 27).call(this, t);
      case 12:
        return fusen(0, 8.13, 1.5, 31).call(this, t);
      case 13:
        return fusen(0, 8.13, 1.5, 35).call(this, t);
      case 14:
        return fusen(0, 8.13, 1.5, 39).call(this, t);
      case 15:
        return fusen(0, 8.13, 1.5, 43).call(this, t);
      default:
        return fusen(0, 8.13, 1.5, 43).call(this, t);
    }
  };
}
function nupper(): MoveFunc {
  return function (t, extra) {
    switch (extra?.count || 0) {
      case 1:
        return curve(0.45, 0.95, 3.2, 5).call(this, t);
      case 2:
        return curve(0.45, 0.95, 3.2, 13).call(this, t);
      case 3:
        return curve(0.45, 0.95, 3.2, 20).call(this, t);
      case 4:
        return curve(0.45, 0.95, 3.2, 30).call(this, t);
      case 5:
        return curve(0.45, 0.95, 3.2, 35).call(this, t);
      case 6:
        return curve(0.45, 0.95, 3.2, 40).call(this, t);
      case 7:
        return curve(0.45, 0.95, 3.2, 45).call(this, t);
      case 8:
        return curve(0.45, 0.95, 3.2, 50).call(this, t);
      default:
        return curve(0.45, 0.95, 3.2, 50).call(this, t);
    }
  };
}
function kakashi1(size = 3) {
  return syuki({
    0: dFunc(0, 1428 / 99, size),
    1: () => [10000, 0, 0],
    2: () => [10000, 0, 0],
    3: () => [10000, 0, 0],
  }, 4);
}
function kakashi3(size = 3) {
  return syuki({
    0: () => [10000, 0, 0],
    1: dFunc(0, 1428 / 99, size),
    2: curve(0.9, 0.97, 1428 / 99, size, [0, 10]),
    3: () => [10000, 0, 0],
  }, 4);
}
function kakashi2(size = 3) {
  return syuki({
    0: () => [10000, 0, 0],
    1: () => [10000, 0, 0],
    2: () => [10000, 0, 0],
    3: dFunc(0, 1428 / 99, size),
  }, 4);
}
function moons() {
  return syuki({
    0: curve(-6, 0.2, 16.605),
    1: curve(6, 0.2, 16.605),
  }, 2);
}

function rush(
  s = 17.85 / 18.8125,
  drill = false,
  dx1 = 3.4,
  dx2 = -4.6 * 18.8125 / 18.35,
  dx3 = 8 * 18.8125 / 17.3,
  dx4 = -6.9 * 18.8125 / 18.13,
  dx5 = -2.8 * 18.8125 / 19.55,
  dx6 = 6.6 * 18.8125 / 17.92,
  dx7 = 2.5 * 18.8125 / 19.3,
  dy1 = 18.8125,
  dy2 = 18.8125,
  dy3 = 18.8125,
  dy4 = 18.8125,
  dy5 = 18.8125,
  dy6 = 18.8125,
  dy7 = 18.8125,
  size = 3,
  add = 0,
  [x, y] = [0, 0],
) {
  const a: ShotDef[] = [];
  {
    a.push({
      func: syuki({
        1: dFunc(dx1 * s, dy1 * s, size, add, [x, y]),
        0: dFunc(-dx1 * s, dy1 * s, size, add, [x, y]),
      }, 2),
      delay: 100,
      drill,
    });
    a.push({
      func: syuki({
        1: dFunc(dx2 * s, dy2 * s, size, add, [x, y]),
        0: dFunc(-dx2 * s, dy2 * s, size, add, [x, y]),
      }, 2),
      delay: 225,
      drill,
    });
    a.push({
      func: syuki({
        1: dFunc(dx3 * s, dy3 * s, size, add, [x, y]),
        0: dFunc(-dx3 * s, dy3 * s, size, add, [x, y]),
      }, 2),
      delay: 350,
      drill,
    });
    a.push({
      func: syuki({
        1: dFunc(dx4 * s, dy4 * s, size, add, [x, y]),
        0: dFunc(-dx4 * s, dy4 * s, size, add, [x, y]),
      }, 2),
      delay: 475,
      drill,
    });
    a.push({
      func: syuki({
        1: dFunc(dx5 * s, dy5 * s, size, add, [x, y]),
        0: dFunc(-dx5 * s, dy5 * s, size, add, [x, y]),
      }, 2),
      delay: 600,
      drill,
    });
    a.push({
      func: syuki({
        1: dFunc(dx6 * s, dy6 * s, size, add, [x, y]),
        0: dFunc(-dx6 * s, dy6 * s, size, add, [x, y]),
      }, 2),
      delay: 725,
      drill,
    });
    a.push({
      func: syuki({
        1: dFunc(dx7 * s, dy7 * s, size, add, [x, y]),
        0: dFunc(-dx7 * s, dy7 * s, size, add, [x, y]),
      }, 2),
      delay: 850,
      drill,
    });
    a.push({
      func: syuki({
        1: dFunc(dx1 * s, dy1 * s, size, add, [x, y]),
        0: dFunc(-dx1 * s, dy1 * s, size, add, [x, y]),
      }, 2),
      delay: 975,
      drill,
    });
  }
  return a;
}
function deisuirush(
  s = 1,
  drill = false,
  dx1 = 5.6,
  dx2 = -6.3,
  dx3 = 9.7,
  dx4 = -8.6,
  dx5 = -4.5,
  dx6 = 8.3,
  dx7 = 4.7,
  dy1 = 18.8125,
  dy2 = 18.35,
  dy3 = 17.3,
  dy4 = 18.13,
  dy5 = 19.55,
  dy6 = 17.92,
  dy7 = 19.3,
  size = 3,
  [x, y] = [0, 0],
) {
  const a: ShotDef[] = [];
  {
    a.push({
      func: syuki({
        1: dKaitenFuncif(
          1,
          -0.22,
          -1 * Math.PI,
          -1,
          dx1 * s,
          dy1 * s,
          dx1 * s,
          dy1 * s,
          160,
          0,
          size,
          [x, y],
          0,
          0,
        ),
        0: dKaitenFuncif(
          1,
          0.22,
          -1 * Math.PI,
          -1,
          -dx1 * s,
          dy1 * s,
          -dx1 * s,
          dy1 * s,
          160,
          0,
          size,
          [x, y],
          0,
          0,
        ),
      }, 2),
      delay: 100,
      drill,
    });
    a.push({
      func: syuki({
        1: dKaitenFuncif(
          1,
          0.22,
          -1 * Math.PI,
          -1,
          dx2 * s,
          dy2 * s,
          dx2 * s,
          dy2 * s,
          160,
          0,
          size,
          [x, y],
          0,
          0,
        ),
        0: dKaitenFuncif(
          1,
          -0.22,
          -1 * Math.PI,
          -1,
          -dx2 * s,
          dy2 * s,
          -dx2 * s,
          dy2 * s,
          160,
          0,
          size,
          [x, y],
          0,
          0,
        ),
      }, 2),
      delay: 230,
      drill,
    });
    a.push({
      func: syuki({
        1: dKaitenFuncif(
          1,
          -0.22,
          -1 * Math.PI,
          -1,
          dx3 * s,
          dy3 * s,
          dx3 * s,
          dy3 * s,
          160,
          0,
          size,
          [x, y],
          0,
          0,
        ),
        0: dKaitenFuncif(
          1,
          0.22,
          -1 * Math.PI,
          -1,
          -dx3 * s,
          dy3 * s,
          -dx3 * s,
          dy3 * s,
          160,
          0,
          size,
          [x, y],
          0,
          0,
        ),
      }, 2),
      delay: 360,
      drill,
    });
    a.push({
      func: syuki({
        1: dKaitenFuncif(
          1,
          0.22,
          -1 * Math.PI,
          -1,
          dx4 * s,
          dy4 * s,
          dx4 * s,
          dy4 * s,
          160,
          0,
          size,
          [x, y],
          0,
          0,
        ),
        0: dKaitenFuncif(
          1,
          -0.22,
          -1 * Math.PI,
          -1,
          -dx4 * s,
          dy4 * s,
          -dx4 * s,
          dy4 * s,
          160,
          0,
          size,
          [x, y],
          0,
          0,
        ),
      }, 2),
      delay: 490,
      drill,
    });
    a.push({
      func: syuki({
        1: dKaitenFuncif(
          1,
          0.22,
          -1 * Math.PI,
          -1,
          dx5 * s,
          dy5 * s,
          dx5 * s,
          dy5 * s,
          160,
          0,
          size,
          [x, y],
          0,
          0,
        ),
        0: dKaitenFuncif(
          1,
          -0.22,
          -1 * Math.PI,
          -1,
          -dx5 * s,
          dy5 * s,
          -dx5 * s,
          dy5 * s,
          160,
          0,
          size,
          [x, y],
          0,
          0,
        ),
      }, 2),
      delay: 620,
      drill,
    });
    a.push({
      func: syuki({
        1: dKaitenFuncif(
          1,
          -0.22,
          -1 * Math.PI,
          -1,
          dx6 * s,
          dy6 * s,
          dx6 * s,
          dy6 * s,
          160,
          0,
          size,
          [x, y],
          0,
          0,
        ),
        0: dKaitenFuncif(
          1,
          0.22,
          -1 * Math.PI,
          -1,
          -dx6 * s,
          dy6 * s,
          -dx6 * s,
          dy6 * s,
          160,
          0,
          size,
          [x, y],
          0,
          0,
        ),
      }, 2),
      delay: 750,
      drill,
    });
    a.push({
      func: syuki({
        1: dKaitenFuncif(
          1,
          -0.22,
          -1 * Math.PI,
          -1,
          dx7 * s,
          dy7 * s,
          dx7 * s,
          dy7 * s,
          160,
          0,
          size,
          [x, y],
          0,
          0,
        ),
        0: dKaitenFuncif(
          1,
          0.22,
          -1 * Math.PI,
          -1,
          -dx7 * s,
          dy7 * s,
          -dx7 * s,
          dy7 * s,
          160,
          0,
          size,
          [x, y],
          0,
          0,
        ),
      }, 2),
      delay: 880,
      drill,
    });
    a.push({
      func: syuki({
        1: dKaitenFuncif(
          1,
          -0.22,
          -1 * Math.PI,
          -1,
          dx1 * s,
          dy1 * s,
          dx1 * s,
          dy1 * s,
          160,
          0,
          size,
          [x, y],
          0,
          0,
        ),
        0: dKaitenFuncif(
          1,
          0.22,
          -1 * Math.PI,
          -1,
          -dx1 * s,
          dy1 * s,
          -dx1 * s,
          dy1 * s,
          160,
          0,
          size,
          [x, y],
          0,
          0,
        ),
      }, 2),
      delay: 1010,
      drill,
    });
  }
  return a;
}

function kakashidanmaku(s = 6.5) {
  const a: ShotDef[] = [];
  {
    {
      a.push({
        func: syuki({
          1: dFunc(
            s * Math.sin((16.835 / 180) * Math.PI),
            s * Math.cos((16.835 / 180) * Math.PI),
            1.5,
            0,
            [0, -10],
          ),
          2: del,
          0: del,
        }, 3),
        delay: 250,
      });
      a.push({
        func: syuki({
          2: dFunc(
            s * Math.sin((16.835 / 180) * Math.PI),
            s * Math.cos((16.835 / 180) * Math.PI),
            1.5,
            0,
            [0, -10],
          ),
          0: del,
          1: del,
        }, 3),
        delay: 250,
        obake: true,
      });
      a.push({
        func: syuki({
          0: dFunc(
            s * Math.sin((16.835 / 180) * Math.PI),
            s * Math.cos((16.835 / 180) * Math.PI),
            1.5,
            0,
            [0, -10],
          ),
          1: del,
          2: del,
        }, 3),
        delay: 250,
        drill: true,
      });
      a.push({
        func: syuki({
          1: dFunc(
            s * Math.sin((0 / 180) * Math.PI),
            s * Math.cos((0 / 180) * Math.PI),
            1.5,
            0,
            [0, -10],
          ),
          2: del,
          0: del,
        }, 3),
        delay: 400,
      });
      a.push({
        func: syuki({
          2: dFunc(
            s * Math.sin((0 / 180) * Math.PI),
            s * Math.cos((0 / 180) * Math.PI),
            1.5,
            0,
            [0, -10],
          ),
          0: del,
          1: del,
        }, 3),
        delay: 400,
        obake: true,
      });
      a.push({
        func: syuki({
          0: dFunc(
            s * Math.sin((0 / 180) * Math.PI),
            s * Math.cos((0 / 180) * Math.PI),
            1.5,
            0,
            [0, -10],
          ),
          1: del,
          2: del,
        }, 3),
        delay: 400,
        drill: true,
      });
      a.push({
        func: syuki({
          1: dFunc(
            s * -Math.sin((16.835 / 180) * Math.PI),
            s * Math.cos((16.835 / 180) * Math.PI),
            1.5,
            0,
            [0, -10],
          ),
          2: del,
          0: del,
        }, 3),
        delay: 550,
      });
      a.push({
        func: syuki({
          2: dFunc(
            s * -Math.sin((16.835 / 180) * Math.PI),
            s * Math.cos((16.835 / 180) * Math.PI),
            1.5,
            0,
            [0, -10],
          ),
          0: del,
          1: del,
        }, 3),
        delay: 550,
        obake: true,
      });
      a.push({
        func: syuki({
          0: dFunc(
            s * -Math.sin((16.835 / 180) * Math.PI),
            s * Math.cos((16.835 / 180) * Math.PI),
            1.5,
            0,
            [0, -10],
          ),
          1: del,
          2: del,
        }, 3),
        delay: 550,
        drill: true,
      });

      a.push({
        func: syuki({
          1: dFunc(
            s * Math.sin((24.4075 / 180) * Math.PI),
            s * Math.cos((24.4075 / 180) * Math.PI),
            1.5,
            0,
            [0, -10],
          ),
          2: del,
          0: del,
        }, 3),
        delay: 700,
      });
      a.push({
        func: syuki({
          2: dFunc(
            s * Math.sin((24.4075 / 180) * Math.PI),
            s * Math.cos((24.4075 / 180) * Math.PI),
            1.5,
            0,
            [0, -10],
          ),
          0: del,
          1: del,
        }, 3),
        delay: 700,
        obake: true,
      });
      a.push({
        func: syuki({
          0: dFunc(
            s * Math.sin((24.4075 / 180) * Math.PI),
            s * Math.cos((24.4075 / 180) * Math.PI),
            1.5,
            0,
            [0, -10],
          ),
          1: del,
          2: del,
        }, 3),
        delay: 700,
        drill: true,
      });
      a.push({
        func: syuki({
          1: dFunc(
            s * Math.sin((8.5475 / 180) * Math.PI),
            s * Math.cos((8.5475 / 180) * Math.PI),
            1.5,
            0,
            [0, -10],
          ),
          2: del,
          0: del,
        }, 3),
        delay: 850,
      });
      a.push({
        func: syuki({
          2: dFunc(
            s * Math.sin((8.5475 / 180) * Math.PI),
            s * Math.cos((8.5475 / 180) * Math.PI),
            1.5,
            0,
            [0, -10],
          ),
          0: del,
          1: del,
        }, 3),
        delay: 850,
        obake: true,
      });
      a.push({
        func: syuki({
          0: dFunc(
            s * Math.sin((8.5475 / 180) * Math.PI),
            s * Math.cos((8.5475 / 180) * Math.PI),
            1.5,
            0,
            [0, -10],
          ),
          1: del,
          2: del,
        }, 3),
        delay: 850,
        drill: true,
      });
      a.push({
        func: syuki({
          1: dFunc(
            s * -Math.sin((8.5475 / 180) * Math.PI),
            s * Math.cos((8.5475 / 180) * Math.PI),
            1.5,
            0,
            [0, -10],
          ),
          2: del,
          0: del,
        }, 3),
        delay: 1000,
      });
      a.push({
        func: syuki({
          2: dFunc(
            s * -Math.sin((8.5475 / 180) * Math.PI),
            s * Math.cos((8.5475 / 180) * Math.PI),
            1.5,
            0,
            [0, -10],
          ),
          0: del,
          1: del,
        }, 3),
        delay: 1000,
        obake: true,
      });
      a.push({
        func: syuki({
          0: dFunc(
            s * -Math.sin((8.5475 / 180) * Math.PI),
            s * Math.cos((8.5475 / 180) * Math.PI),
            1.5,
            0,
            [0, -10],
          ),
          1: del,
          2: del,
        }, 3),
        delay: 1000,
        drill: true,
      });
      a.push({
        func: syuki({
          1: dFunc(
            s * -Math.sin((24.4075 / 180) * Math.PI),
            s * Math.cos((24.4075 / 180) * Math.PI),
            1.5,
            0,
            [0, -10],
          ),
          2: del,
          0: del,
        }, 3),
        delay: 1150,
      });
      a.push({
        func: syuki({
          2: dFunc(
            s * -Math.sin((24.4075 / 180) * Math.PI),
            s * Math.cos((24.4075 / 180) * Math.PI),
            1.5,
            0,
            [0, -10],
          ),
          0: del,
          1: del,
        }, 3),
        delay: 1150,
        obake: true,
      });
      a.push({
        func: syuki({
          0: dFunc(
            s * -Math.sin((24.4075 / 180) * Math.PI),
            s * Math.cos((24.4075 / 180) * Math.PI),
            1.5,
            0,
            [0, -10],
          ),
          1: del,
          2: del,
        }, 3),
        delay: 1150,
        drill: true,
      });

      a.push({
        func: syuki({
          1: dFunc(
            s * Math.sin((16.835 / 180) * Math.PI),
            s * Math.cos((16.835 / 180) * Math.PI),
            1.5,
            0,
            [0, -10],
          ),
          2: del,
          0: del,
        }, 3),
        delay: 1300,
      });
      a.push({
        func: syuki({
          2: dFunc(
            s * Math.sin((16.835 / 180) * Math.PI),
            s * Math.cos((16.835 / 180) * Math.PI),
            1.5,
            0,
            [0, -10],
          ),
          0: del,
          1: del,
        }, 3),
        delay: 1300,
        obake: true,
      });
      a.push({
        func: syuki({
          0: dFunc(
            s * Math.sin((16.835 / 180) * Math.PI),
            s * Math.cos((16.835 / 180) * Math.PI),
            1.5,
            0,
            [0, -10],
          ),
          1: del,
          2: del,
        }, 3),
        delay: 1300,
        drill: true,
      });
      a.push({
        func: syuki({
          1: dFunc(
            s * Math.sin((0 / 180) * Math.PI),
            s * Math.cos((0 / 180) * Math.PI),
            1.5,
            0,
            [0, -10],
          ),
          2: del,
          0: del,
        }, 3),
        delay: 1450,
      });
      a.push({
        func: syuki({
          2: dFunc(
            s * Math.sin((0 / 180) * Math.PI),
            s * Math.cos((0 / 180) * Math.PI),
            1.5,
            0,
            [0, -10],
          ),
          0: del,
          1: del,
        }, 3),
        delay: 1450,
        obake: true,
      });
      a.push({
        func: syuki({
          0: dFunc(
            s * Math.sin((0 / 180) * Math.PI),
            s * Math.cos((0 / 180) * Math.PI),
            1.5,
            0,
            [0, -10],
          ),
          2: del,
          1: del,
        }, 3),
        delay: 1450,
        drill: true,
      });
      a.push({
        func: syuki({
          1: dFunc(
            s * -Math.sin((16.835 / 180) * Math.PI),
            s * Math.cos((16.835 / 180) * Math.PI),
            1.5,
            0,
            [0, -10],
          ),
          2: del,
          0: del,
        }, 3),
        delay: 1600,
      });
      a.push({
        func: syuki({
          2: dFunc(
            s * -Math.sin((16.835 / 180) * Math.PI),
            s * Math.cos((16.835 / 180) * Math.PI),
            1.5,
            0,
            [0, -10],
          ),
          0: del,
          1: del,
        }, 3),
        delay: 1600,
        obake: true,
      });
      a.push({
        func: syuki({
          0: dFunc(
            s * -Math.sin((16.835 / 180) * Math.PI),
            s * Math.cos((16.835 / 180) * Math.PI),
            1.5,
            0,
            [0, -10],
          ),
          2: del,
          1: del,
        }, 3),
        delay: 1600,
        drill: true,
      });

      a.push({
        func: syuki({
          1: dFunc(
            s * Math.sin((24.4075 / 180) * Math.PI),
            s * Math.cos((24.4075 / 180) * Math.PI),
            1.5,
            0,
            [0, -10],
          ),
          2: del,
          0: del,
        }, 3),
        delay: 1750,
      });
      a.push({
        func: syuki({
          2: dFunc(
            s * Math.sin((24.4075 / 180) * Math.PI),
            s * Math.cos((24.4075 / 180) * Math.PI),
            1.5,
            0,
            [0, -10],
          ),
          0: del,
          1: del,
        }, 3),
        delay: 1750,
        obake: true,
      });
      a.push({
        func: syuki({
          0: dFunc(
            s * Math.sin((24.4075 / 180) * Math.PI),
            s * Math.cos((24.4075 / 180) * Math.PI),
            1.5,
            0,
            [0, -10],
          ),
          2: del,
          1: del,
        }, 3),
        delay: 1750,
        drill: true,
      });
      a.push({
        func: syuki({
          1: dFunc(
            s * Math.sin((8.5475 / 180) * Math.PI),
            s * Math.cos((8.5475 / 180) * Math.PI),
            1.5,
            0,
            [0, -10],
          ),
          2: del,
          0: del,
        }, 3),
        delay: 1900,
      });
      a.push({
        func: syuki({
          2: dFunc(
            s * Math.sin((8.5475 / 180) * Math.PI),
            s * Math.cos((8.5475 / 180) * Math.PI),
            1.5,
            0,
            [0, -10],
          ),
          0: del,
          1: del,
        }, 3),
        delay: 1900,
        obake: true,
      });
      a.push({
        func: syuki({
          0: dFunc(
            s * Math.sin((8.5475 / 180) * Math.PI),
            s * Math.cos((8.5475 / 180) * Math.PI),
            1.5,
            0,
            [0, -10],
          ),
          2: del,
          1: del,
        }, 3),
        delay: 1900,
        drill: true,
      });
      a.push({
        func: syuki({
          1: dFunc(
            s * -Math.sin((8.5475 / 180) * Math.PI),
            s * Math.cos((8.5475 / 180) * Math.PI),
            1.5,
            0,
            [0, -10],
          ),
          2: del,
          0: del,
        }, 3),
        delay: 2050,
      });
      a.push({
        func: syuki({
          2: dFunc(
            s * -Math.sin((8.5475 / 180) * Math.PI),
            s * Math.cos((8.5475 / 180) * Math.PI),
            1.5,
            0,
            [0, -10],
          ),
          0: del,
          1: del,
        }, 3),
        delay: 2050,
        obake: true,
      });
      a.push({
        func: syuki({
          0: dFunc(
            s * -Math.sin((8.5475 / 180) * Math.PI),
            s * Math.cos((8.5475 / 180) * Math.PI),
            1.5,
            0,
            [0, -10],
          ),
          2: del,
          1: del,
        }, 3),
        delay: 2050,
        drill: true,
      });
      a.push({
        func: syuki({
          1: dFunc(
            s * -Math.sin((24.4075 / 180) * Math.PI),
            s * Math.cos((24.4075 / 180) * Math.PI),
            1.5,
            0,
            [0, -10],
          ),
          2: del,
          0: del,
        }, 3),
        delay: 2200,
      });
      a.push({
        func: syuki({
          2: dFunc(
            s * -Math.sin((24.4075 / 180) * Math.PI),
            s * Math.cos((24.4075 / 180) * Math.PI),
            1.5,
            0,
            [0, -10],
          ),
          0: del,
          1: del,
        }, 3),
        delay: 2200,
        obake: true,
      });
      a.push({
        func: syuki({
          0: dFunc(
            s * -Math.sin((24.4075 / 180) * Math.PI),
            s * Math.cos((24.4075 / 180) * Math.PI),
            1.5,
            0,
            [0, -10],
          ),
          2: del,
          1: del,
        }, 3),
        delay: 2200,
        drill: true,
      });

      a.push({
        func: syuki({
          1: dFunc(
            s * Math.sin((16.835 / 180) * Math.PI),
            s * Math.cos((16.835 / 180) * Math.PI),
            1.5,
            0,
            [0, -10],
          ),
          2: del,
          0: del,
        }, 3),
        delay: 2350,
      });
      a.push({
        func: syuki({
          2: dFunc(
            s * Math.sin((16.835 / 180) * Math.PI),
            s * Math.cos((16.835 / 180) * Math.PI),
            1.5,
            0,
            [0, -10],
          ),
          0: del,
          1: del,
        }, 3),
        delay: 2350,
        obake: true,
      });
      a.push({
        func: syuki({
          0: dFunc(
            s * Math.sin((16.835 / 180) * Math.PI),
            s * Math.cos((16.835 / 180) * Math.PI),
            1.5,
            0,
            [0, -10],
          ),
          2: del,
          1: del,
        }, 3),
        delay: 2350,
        drill: true,
      });
      a.push({
        func: syuki({
          1: dFunc(
            s * Math.sin((0 / 180) * Math.PI),
            s * Math.cos((0 / 180) * Math.PI),
            1.5,
            0,
            [0, -10],
          ),
          2: del,
          0: del,
        }, 3),
        delay: 2500,
      });
      a.push({
        func: syuki({
          2: dFunc(
            s * Math.sin((0 / 180) * Math.PI),
            s * Math.cos((0 / 180) * Math.PI),
            1.5,
            0,
            [0, -10],
          ),
          0: del,
          1: del,
        }, 3),
        delay: 2500,
        obake: true,
      });
      a.push({
        func: syuki({
          0: dFunc(
            s * Math.sin((0 / 180) * Math.PI),
            s * Math.cos((0 / 180) * Math.PI),
            1.5,
            0,
            [0, -10],
          ),
          2: del,
          1: del,
        }, 3),
        delay: 2500,
        drill: true,
      });
      a.push({
        func: syuki({
          1: dFunc(
            s * -Math.sin((16.835 / 180) * Math.PI),
            s * Math.cos((16.835 / 180) * Math.PI),
            1.5,
            0,
            [0, -10],
          ),
          2: del,
          0: del,
        }, 3),
        delay: 2650,
      });
      a.push({
        func: syuki({
          2: dFunc(
            s * -Math.sin((16.835 / 180) * Math.PI),
            s * Math.cos((16.835 / 180) * Math.PI),
            1.5,
            0,
            [0, -10],
          ),
          0: del,
          1: del,
        }, 3),
        delay: 2650,
        obake: true,
      });
      a.push({
        func: syuki({
          0: dFunc(
            s * -Math.sin((16.835 / 180) * Math.PI),
            s * Math.cos((16.835 / 180) * Math.PI),
            1.5,
            0,
            [0, -10],
          ),
          2: del,
          1: del,
        }, 3),
        delay: 2650,
        drill: true,
      });

      a.push({
        func: syuki({
          1: dFunc(
            s * Math.sin((24.4075 / 180) * Math.PI),
            s * Math.cos((24.4075 / 180) * Math.PI),
            1.5,
            0,
            [0, -10],
          ),
          2: del,
          0: del,
        }, 3),
        delay: 2800,
      });
      a.push({
        func: syuki({
          2: dFunc(
            s * Math.sin((24.4075 / 180) * Math.PI),
            s * Math.cos((24.4075 / 180) * Math.PI),
            1.5,
            0,
            [0, -10],
          ),
          0: del,
          1: del,
        }, 3),
        delay: 2800,
        obake: true,
      });
      a.push({
        func: syuki({
          0: dFunc(
            s * Math.sin((24.4075 / 180) * Math.PI),
            s * Math.cos((24.4075 / 180) * Math.PI),
            1.5,
            0,
            [0, -10],
          ),
          2: del,
          1: del,
        }, 3),
        delay: 2800,
        drill: true,
      });
      a.push({
        func: syuki({
          1: dFunc(
            s * Math.sin((8.5475 / 180) * Math.PI),
            s * Math.cos((8.5475 / 180) * Math.PI),
            1.5,
            0,
            [0, -10],
          ),
          2: del,
          0: del,
        }, 3),
        delay: 2950,
      });
      a.push({
        func: syuki({
          2: dFunc(
            s * Math.sin((8.5475 / 180) * Math.PI),
            s * Math.cos((8.5475 / 180) * Math.PI),
            1.5,
            0,
            [0, -10],
          ),
          0: del,
          1: del,
        }, 3),
        delay: 2950,
        obake: true,
      });
      a.push({
        func: syuki({
          0: dFunc(
            s * Math.sin((8.5475 / 180) * Math.PI),
            s * Math.cos((8.5475 / 180) * Math.PI),
            1.5,
            0,
            [0, -10],
          ),
          2: del,
          1: del,
        }, 3),
        delay: 2950,
        drill: true,
      });
      a.push({
        func: syuki({
          1: dFunc(
            s * -Math.sin((8.5475 / 180) * Math.PI),
            s * Math.cos((8.5475 / 180) * Math.PI),
            1.5,
            0,
            [0, -10],
          ),
          2: del,
          0: del,
        }, 3),
        delay: 3100,
      });
      a.push({
        func: syuki({
          2: dFunc(
            s * -Math.sin((8.5475 / 180) * Math.PI),
            s * Math.cos((8.5475 / 180) * Math.PI),
            1.5,
            0,
            [0, -10],
          ),
          0: del,
          1: del,
        }, 3),
        delay: 3100,
        obake: true,
      });
      a.push({
        func: syuki({
          0: dFunc(
            s * -Math.sin((8.5475 / 180) * Math.PI),
            s * Math.cos((8.5475 / 180) * Math.PI),
            1.5,
            0,
            [0, -10],
          ),
          2: del,
          1: del,
        }, 3),
        delay: 3100,
        drill: true,
      });
    }
    return a;
  }
}
function puchidanmaku(s = 6.5) {
  const a: ShotDef[] = [];
  {
    {
      a.push({
        func: dFunc(
          s * Math.sin((16.835 / 180) * Math.PI),
          s * Math.cos((16.835 / 180) * Math.PI),
          1.5,
          0,
          [0, -10],
        ),
        delay: 250,
      });
      a.push({
        func: dFunc(
          s * Math.sin((0 / 180) * Math.PI),
          s * Math.cos((0 / 180) * Math.PI),
          1.5,
          0,
          [0, -10],
        ),
        delay: 400,
      });
      a.push({
        func: dFunc(
          s * -Math.sin((16.835 / 180) * Math.PI),
          s * Math.cos((16.835 / 180) * Math.PI),
          1.5,
          0,
          [0, -10],
        ),
        delay: 550,
      });

      a.push({
        func: dFunc(
          s * Math.sin((24.4075 / 180) * Math.PI),
          s * Math.cos((24.4075 / 180) * Math.PI),
          1.5,
          0,
          [0, -10],
        ),
        delay: 700,
      });
      a.push({
        func: dFunc(
          s * Math.sin((8.5475 / 180) * Math.PI),
          s * Math.cos((8.5475 / 180) * Math.PI),
          1.5,
          0,
          [0, -10],
        ),
        delay: 850,
      });
      a.push({
        func: dFunc(
          s * -Math.sin((8.5475 / 180) * Math.PI),
          s * Math.cos((8.5475 / 180) * Math.PI),
          1.5,
          0,
          [0, -10],
        ),
        delay: 1000,
      });
      a.push({
        func: dFunc(
          s * -Math.sin((24.4075 / 180) * Math.PI),
          s * Math.cos((24.4075 / 180) * Math.PI),
          1.5,
          0,
          [0, -10],
        ),
        delay: 1150,
      });

      a.push({
        func: dFunc(
          s * Math.sin((16.835 / 180) * Math.PI),
          s * Math.cos((16.835 / 180) * Math.PI),
          1.5,
          0,
          [0, -10],
        ),
        delay: 1300,
      });
      a.push({
        func: dFunc(
          s * Math.sin((0 / 180) * Math.PI),
          s * Math.cos((0 / 180) * Math.PI),
          1.5,
          0,
          [0, -10],
        ),
        delay: 1450,
      });
      a.push({
        func: dFunc(
          s * -Math.sin((16.835 / 180) * Math.PI),
          s * Math.cos((16.835 / 180) * Math.PI),
          1.5,
          0,
          [0, -10],
        ),
        delay: 1600,
      });

      a.push({
        func: dFunc(
          s * Math.sin((24.4075 / 180) * Math.PI),
          s * Math.cos((24.4075 / 180) * Math.PI),
          1.5,
          0,
          [0, -10],
        ),
        delay: 1750,
      });
      a.push({
        func: dFunc(
          s * Math.sin((8.5475 / 180) * Math.PI),
          s * Math.cos((8.5475 / 180) * Math.PI),
          1.5,
          0,
          [0, -10],
        ),
        delay: 1900,
      });
      a.push({
        func: dFunc(
          s * -Math.sin((8.5475 / 180) * Math.PI),
          s * Math.cos((8.5475 / 180) * Math.PI),
          1.5,
          0,
          [0, -10],
        ),
        delay: 2050,
      });
      a.push({
        func: dFunc(
          s * -Math.sin((24.4075 / 180) * Math.PI),
          s * Math.cos((24.4075 / 180) * Math.PI),
          1.5,
          0,
          [0, -10],
        ),
        delay: 2200,
      });

      a.push({
        func: dFunc(
          s * Math.sin((16.835 / 180) * Math.PI),
          s * Math.cos((16.835 / 180) * Math.PI),
          1.5,
          0,
          [0, -10],
        ),
        delay: 2350,
      });
      a.push({
        func: dFunc(
          s * Math.sin((0 / 180) * Math.PI),
          s * Math.cos((0 / 180) * Math.PI),
          1.5,
          0,
          [0, -10],
        ),
        delay: 2500,
      });
      a.push({
        func: dFunc(
          s * -Math.sin((16.835 / 180) * Math.PI),
          s * Math.cos((16.835 / 180) * Math.PI),
          1.5,
          0,
          [0, -10],
        ),
        delay: 2650,
      });

      a.push({
        func: dFunc(
          s * Math.sin((24.4075 / 180) * Math.PI),
          s * Math.cos((24.4075 / 180) * Math.PI),
          1.5,
          0,
          [0, -10],
        ),
        delay: 2800,
      });
      a.push({
        func: dFunc(
          s * Math.sin((8.5475 / 180) * Math.PI),
          s * Math.cos((8.5475 / 180) * Math.PI),
          1.5,
          0,
          [0, -10],
        ),
        delay: 2950,
      });
    }
    return a;
  }
}
function danmaku(s = 6.5) {
  const a: ShotDef[] = [];
  {
    {
      a.push({
        func: dFunc(
          s * Math.sin((16.835 / 180) * Math.PI),
          s * Math.cos((16.835 / 180) * Math.PI),
          1.5,
          0,
          [0, -10],
        ),
        delay: 250,
      });
      a.push({
        func: dFunc(
          s * Math.sin((0 / 180) * Math.PI),
          s * Math.cos((0 / 180) * Math.PI),
          1.5,
          0,
          [0, -10],
        ),
        delay: 400,
      });
      a.push({
        func: dFunc(
          s * -Math.sin((16.835 / 180) * Math.PI),
          s * Math.cos((16.835 / 180) * Math.PI),
          1.5,
          0,
          [0, -10],
        ),
        delay: 550,
      });

      a.push({
        func: dFunc(
          s * Math.sin((24.4075 / 180) * Math.PI),
          s * Math.cos((24.4075 / 180) * Math.PI),
          1.5,
          0,
          [0, -10],
        ),
        delay: 700,
      });
      a.push({
        func: dFunc(
          s * Math.sin((8.5475 / 180) * Math.PI),
          s * Math.cos((8.5475 / 180) * Math.PI),
          1.5,
          0,
          [0, -10],
        ),
        delay: 850,
      });
      a.push({
        func: dFunc(
          s * -Math.sin((8.5475 / 180) * Math.PI),
          s * Math.cos((8.5475 / 180) * Math.PI),
          1.5,
          0,
          [0, -10],
        ),
        delay: 1000,
      });
      a.push({
        func: dFunc(
          s * -Math.sin((24.4075 / 180) * Math.PI),
          s * Math.cos((24.4075 / 180) * Math.PI),
          1.5,
          0,
          [0, -10],
        ),
        delay: 1150,
      });

      a.push({
        func: dFunc(
          s * Math.sin((16.835 / 180) * Math.PI),
          s * Math.cos((16.835 / 180) * Math.PI),
          1.5,
          0,
          [0, -10],
        ),
        delay: 1300,
      });
      a.push({
        func: dFunc(
          s * Math.sin((0 / 180) * Math.PI),
          s * Math.cos((0 / 180) * Math.PI),
          1.5,
          0,
          [0, -10],
        ),
        delay: 1450,
      });
      a.push({
        func: dFunc(
          s * -Math.sin((16.835 / 180) * Math.PI),
          s * Math.cos((16.835 / 180) * Math.PI),
          1.5,
          0,
          [0, -10],
        ),
        delay: 1600,
      });

      a.push({
        func: dFunc(
          s * Math.sin((24.4075 / 180) * Math.PI),
          s * Math.cos((24.4075 / 180) * Math.PI),
          1.5,
          0,
          [0, -10],
        ),
        delay: 1750,
      });
      a.push({
        func: dFunc(
          s * Math.sin((8.5475 / 180) * Math.PI),
          s * Math.cos((8.5475 / 180) * Math.PI),
          1.5,
          0,
          [0, -10],
        ),
        delay: 1900,
      });
      a.push({
        func: dFunc(
          s * -Math.sin((8.5475 / 180) * Math.PI),
          s * Math.cos((8.5475 / 180) * Math.PI),
          1.5,
          0,
          [0, -10],
        ),
        delay: 2050,
      });
      a.push({
        func: dFunc(
          s * -Math.sin((24.4075 / 180) * Math.PI),
          s * Math.cos((24.4075 / 180) * Math.PI),
          1.5,
          0,
          [0, -10],
        ),
        delay: 2200,
      });

      a.push({
        func: dFunc(
          s * Math.sin((16.835 / 180) * Math.PI),
          s * Math.cos((16.835 / 180) * Math.PI),
          1.5,
          0,
          [0, -10],
        ),
        delay: 2350,
      });
      a.push({
        func: dFunc(
          s * Math.sin((0 / 180) * Math.PI),
          s * Math.cos((0 / 180) * Math.PI),
          1.5,
          0,
          [0, -10],
        ),
        delay: 2500,
      });
      a.push({
        func: dFunc(
          s * -Math.sin((16.835 / 180) * Math.PI),
          s * Math.cos((16.835 / 180) * Math.PI),
          1.5,
          0,
          [0, -10],
        ),
        delay: 2650,
      });

      a.push({
        func: dFunc(
          s * Math.sin((24.4075 / 180) * Math.PI),
          s * Math.cos((24.4075 / 180) * Math.PI),
          1.5,
          0,
          [0, -10],
        ),
        delay: 2800,
      });
      a.push({
        func: dFunc(
          s * Math.sin((8.5475 / 180) * Math.PI),
          s * Math.cos((8.5475 / 180) * Math.PI),
          1.5,
          0,
          [0, -10],
        ),
        delay: 2950,
      });
      a.push({
        func: dFunc(
          s * -Math.sin((8.5475 / 180) * Math.PI),
          s * Math.cos((8.5475 / 180) * Math.PI),
          1.5,
          0,
          [0, -10],
        ),
        delay: 3100,
      });
      a.push({
        func: dFunc(
          s * -Math.sin((24.4075 / 180) * Math.PI),
          s * Math.cos((24.4075 / 180) * Math.PI),
          1.5,
          0,
          [0, -10],
        ),
        delay: 3250,
      });

      a.push({
        func: dFunc(
          s * Math.sin((16.835 / 180) * Math.PI),
          s * Math.cos((16.835 / 180) * Math.PI),
          1.5,
          0,
          [0, -10],
        ),
        delay: 3400,
      });
      a.push({
        func: dFunc(
          s * Math.sin((0 / 180) * Math.PI),
          s * Math.cos((0 / 180) * Math.PI),
          1.5,
          0,
          [0, -10],
        ),
        delay: 3550,
      });
      a.push({
        func: dFunc(
          s * -Math.sin((16.835 / 180) * Math.PI),
          s * Math.cos((16.835 / 180) * Math.PI),
          1.5,
          0,
          [0, -10],
        ),
        delay: 3700,
      });

      a.push({
        func: dFunc(
          s * Math.sin((24.4075 / 180) * Math.PI),
          s * Math.cos((24.4075 / 180) * Math.PI),
          1.5,
          0,
          [0, -10],
        ),
        delay: 3850,
      });
    }
    return a;
  }
}
function kakashistar(kakashi = false, s = 20) {
  const a: ShotDef[] = [];
  if (kakashi) {
    {
      a.push({
        func: syuki({
          0: dFunc(
            s * Math.sin((16.87 / 180) * Math.PI),
            s * Math.cos((16.87 / 180) * Math.PI),
            3,
            0,
            [0, -10],
          ),
          1: del,
          2: del,
        }, 3),
      });
      a.push({
        func: syuki({
          1: dFunc(
            s * Math.sin((16.87 / 180) * Math.PI),
            s * Math.cos((16.87 / 180) * Math.PI),
            3,
            0,
            [0, -10],
          ),
          2: del,
          0: del,
        }, 3),
        drill: true,
      });
      a.push({
        func: syuki({
          2: dFunc(
            s * Math.sin((16.87 / 180) * Math.PI),
            s * Math.cos((16.87 / 180) * Math.PI),
            3,
            0,
            [0, -10],
          ),
          0: del,
          1: del,
        }, 3),
        obake: true,
      });
      a.push({
        func: syuki({ 1: dFunc(0, s, 5, 0, [0, -10]), 2: del, 3: del }, 3),
      });
      a.push({
        func: syuki({ 2: dFunc(0, s, 5, 0, [0, -10]), 0: del, 1: del }, 3),
        drill: true,
      });
      a.push({
        func: syuki({ 0: dFunc(0, s, 5, 0, [0, -10]), 1: del, 2: del }, 3),
        obake: true,
      });
      a.push({
        func: syuki({
          2: dFunc(
            -s * Math.sin((16.87 / 180) * Math.PI),
            s * Math.cos((16.87 / 180) * Math.PI),
            3,
            0,
            [0, -10],
          ),
          0: del,
          1: del,
        }, 3),
      });
      a.push({
        func: syuki({
          0: dFunc(
            -s * Math.sin((16.87 / 180) * Math.PI),
            s * Math.cos((16.87 / 180) * Math.PI),
            3,
            0,
            [0, -10],
          ),
          1: del,
          2: del,
        }, 3),
        drill: true,
      });
      a.push({
        func: syuki({
          1: dFunc(
            -s * Math.sin((16.87 / 180) * Math.PI),
            s * Math.cos((16.87 / 180) * Math.PI),
            3,
            0,
            [0, -10],
          ),
          2: del,
          0: del,
        }, 3),
        obake: true,
      });
    }
    return a;
  } else {
    {
      a.push({
        func: syuki({
          1: dFunc(4.75 * s / 20, 19.5 * s / 20, 3, 0, [
            1.25 * s / 20,
            -8.75 * s / 20,
          ]),
          2: del,
          0: del,
        }, 3),
      });
      a.push({
        func: syuki({
          0: dFunc(4.75 * s / 20, 19.5 * s / 20, 3, 0, [
            1.25 * s / 20,
            -8.75 * s / 20,
          ]),
          1: del,
          2: del,
        }, 3),
        drill: true,
      });
      a.push({
        func: syuki({
          2: dFunc(4.75 * s / 20, 19.5 * s / 20, 3, 0, [
            1.25 * s / 20,
            -8.75 * s / 20,
          ]),
          0: del,
          1: del,
        }, 3),
        obake: true,
      });
      a.push({
        func: syuki({
          1: dFunc(0, s, 5, 0, [0, -8.75 * s / 20]),
          2: del,
          0: del,
        }, 3),
      });
      a.push({
        func: syuki({
          0: dFunc(0, s, 5, 0, [0, -8.75 * s / 20]),
          1: del,
          2: del,
        }, 3),
        drill: true,
      });
      a.push({
        func: syuki({
          2: dFunc(0, s, 5, 0, [0, -8.75 * s / 20]),
          0: del,
          1: del,
        }, 3),
        obake: true,
      });
      a.push({
        func: syuki({
          1: dFunc(-4.75 * s / 20, 19.5 * s / 20, 3, 0, [
            -1.25 * s / 20,
            -8.75 * s / 20,
          ]),
          2: del,
          0: del,
        }, 3),
      });
      a.push({
        func: syuki({
          0: dFunc(-4.75 * s / 20, 19.5 * s / 20, 3, 0, [
            -1.25 * s / 20,
            -8.75 * s / 20,
          ]),
          1: del,
          2: del,
        }, 3),
        drill: true,
      });
      a.push({
        func: syuki({
          2: dFunc(-4.75 * s / 20, 19.5 * s / 20, 3, 0, [
            -1.25 * s / 20,
            -8.75 * s / 20,
          ]),
          0: del,
          1: del,
        }, 3),
        obake: true,
      });
    }
    return a;
  }
}
function tuboB(
  l = 1,
  r = 190,
  size = 3,
  dθ = -0.007,
  dy = 1.5,
  y = 1,
): MoveFunc {
  return (t) => {
    if (t < 5) {
      return [
        ((r * Math.sin((5 * dθ - 1) * Math.PI)) * l) * t / 5,
        ((r * Math.cos((5 * dθ - 1) * Math.PI)) * y + 5 * dy + 50) * t / 5,
        size,
      ];
    } else if ((t * dθ - 1) < 2) {
      return [
        (r * Math.sin((t * dθ - 1) * Math.PI)) * l,
        (r * Math.cos((t * dθ - 1) * Math.PI)) * y + t * dy + 50,
        size,
      ];
    } else {
      return [-14000, 0, 0];
    }
  };
}
function tuboA(
  r = 1,
  when = 0.7,
  size = 3,
  speed = 0.011,
  dx = 135,
  dy = 12,
  dx2 = -0.0375,
  dy2 = 0.115 * 19 / 20,
  f = 0.00015,
): MoveFunc {
  return (t) => {
    if (t < (when / speed)) {
      return [
        r * (dx * Math.sin((t * speed - (1 / 5)) * Math.PI) + 90),
        -dy * Math.cos((t * speed - (1 / 5)) * Math.PI) - dy - 20 +
        t * t * t * f,
        size,
      ];
    } else {
      return [
        r *
        (dx * Math.sin((when - (1 / 5)) * Math.PI) + 90 +
          (t - (when / speed)) * (t - (when / speed - 22)) * dx2),
        -dy * Math.cos((when - (1 / 5)) * Math.PI) - dy +
        (t - (when / speed)) * (t - (when / speed - 22)) * dy2 - 20 +
        (when / speed) * (when / speed) * (when / speed) * f,
        size,
      ];
    }
  };
}
function tuboAd(
  r = 1,
  dx = 4,
  dx2 = 0.000002,
  dy = 0.000000023,
  when = 60,
  size = 3,
): MoveFunc {
  return (t) => {
    if (t < when) {
      return [
        (t * dx - t ** 4 * dx2) * r,
        t ** 5 * dy - 50,
        size,
      ];
    } else {
      return [
        (t * dx - t ** 4 * dx2) * r,
        t ** 5 * dy - 50,
        size,
      ];
    }
  };
}
function name_spread(
  z = 27,
  df = 2.437,
  de = 250,
  st = 20,
  obake = false,
  d = 1,
) {
  const s = df;
  const a: ShotDef[] = [];
  for (let i = 0; i < z; i++) {
    a.push({
      func: dFunc(
        Math.sin(Math.PI * (2 / z) * i) * s,
        Math.cos(Math.PI * (2 / z) * i) * s * d,
        1.5,
        st,
        [0, -45],
      ),
      delay: de,
      obake,
    });
  }
  return a;
}
function kayaku(
  z = 18,
  df = 8,
  de = 0,
  add = 20,
  obake = false,
  drill = false,
  d = 1,
) {
  const s = df;
  const a: ShotDef[] = [];
  for (let i = 0; i < z; i++) {
    a.push({
      func: dFunc(
        Math.sin(Math.PI * (2 / z) * i) * s,
        Math.cos(Math.PI * (2 / z) * i) * s * d,
        1.5,
        add,
        [0, 0],
      ),
      delay: de,
      drill,
      obake,
    });
  }
  return a;
}
function awawash(afg = false) {
  const a: ShotDef[] = [];
  for (let i = 0; i < 11; i++) {
    a.push({
      func: dFunc(
        18.789 * Math.sin(((2 * i) / 11) * Math.PI),
        18.789 * Math.cos(((2 * i) / 11) * Math.PI),
        1.5,
        0,
        [0, -50],
      ),
      delay: 500,
      drill: afg,
    });
    a.push({
      func: dFunc(
        15.024 * Math.sin(((2 * i) / 11) * Math.PI),
        15.024 * Math.cos(((2 * i) / 11) * Math.PI),
        1.5,
        0,
        [0, -50],
      ),
      delay: 500,
      drill: afg,
    });
    a.push({
      func: dFunc(
        11.259 * Math.sin(((2 * i) / 11) * Math.PI),
        11.259 * Math.cos(((2 * i) / 11) * Math.PI),
        1.5,
        0,
        [0, -50],
      ),
      delay: 500,
      drill: afg,
    });
    a.push({
      func: dFunc(
        7.494 * Math.sin(((2 * i) / 11) * Math.PI),
        7.494 * Math.cos(((2 * i) / 11) * Math.PI),
        1.5,
        0,
        [0, -50],
      ),
      delay: 500,
      drill: afg,
    });
    a.push({
      func: dFunc(
        3.729 * Math.sin(((2 * i) / 11) * Math.PI),
        3.729 * Math.cos(((2 * i) / 11) * Math.PI),
        1.5,
        0,
        [0, -50],
      ),
      delay: 500,
      drill: afg,
    });
  }
  for (let i = 0; i < 11; i++) {
    a.push({
      func: dFunc(
        16.9065 * Math.sin((((2 * i) + 1) / 11) * Math.PI),
        16.9065 * Math.cos((((2 * i) + 1) / 11) * Math.PI),
        1.5,
        0,
        [0, -50],
      ),
      delay: 500,
      drill: afg,
    });
    a.push({
      func: dFunc(
        13.1415 * Math.sin((((2 * i) + 1) / 11) * Math.PI),
        13.1415 * Math.cos((((2 * i) + 1) / 11) * Math.PI),
        1.5,
        0,
        [0, -50],
      ),
      delay: 500,
      drill: afg,
    });
    a.push({
      func: dFunc(
        9.3765 * Math.sin((((2 * i) + 1) / 11) * Math.PI),
        9.3765 * Math.cos((((2 * i) + 1) / 11) * Math.PI),
        1.5,
        0,
        [0, -50],
      ),
      delay: 500,
      drill: afg,
    });
    a.push({
      func: dFunc(
        5.6115 * Math.sin((((2 * i) + 1) / 11) * Math.PI),
        5.6115 * Math.cos((((2 * i) + 1) / 11) * Math.PI),
        1.5,
        0,
        [0, -50],
      ),
      delay: 500,
      drill: afg,
    });
  }
  return a;
}
function awasp(drill = false, obake = false, s = 180 / 16.35) {
  const a: ShotDef[] = [];
  for (let i = 0; i < 3; i++) {
    a.push({
      func: dFunc(
        10.2 * Math.sin(((-1 + i) / s) * Math.PI),
        10.2 * Math.cos(((-1 + i) / s) * Math.PI),
        1.5,
        0,
        [0, 0],
      ),
      drill,
      obake,
    });
    a.push({
      func: dFunc(
        8.16 * Math.sin(((-1 + i) / s) * Math.PI),
        8.16 * Math.cos(((-1 + i) / s) * Math.PI),
        1.5,
        0,
        [0, 0],
      ),
      drill,
      obake,
    });
    a.push({
      func: dFunc(
        6.12 * Math.sin(((-1 + i) / s) * Math.PI),
        6.12 * Math.cos(((-1 + i) / s) * Math.PI),
        1.5,
        0,
        [0, 0],
      ),
      drill,
      obake,
    });
    a.push({
      func: dFunc(
        4.08 * Math.sin(((-1 + i) / s) * Math.PI),
        4.08 * Math.cos(((-1 + i) / s) * Math.PI),
        1.5,
        0,
        [0, 0],
      ),
      drill,
      obake,
    });
  }
  return a;
}
function eggbomb(s = 1, drill = false, obake = false) {
  const a: ShotDef[] = [];
  for (let i = 0; i < 7; i++) {
    a.push({
      func: dCurve(
        54 * Math.PI / 180 - 13 * Math.PI * i / 180,
        -0.2 * Math.PI / 180,
        1.5,
        10 * s,
        [0, -10],
        0,
        1.4,
      ),
      drill,
      obake,
    });
  }
  return a;
}
function awabomb(drill = false, obake = false, s = 180 / 16.35) {
  const a: ShotDef[] = [];
  for (let i = 0; i < 3; i++) {
    a.push({
      func: dFunc(
        8.16 * Math.sin(((-1 + i) / s) * Math.PI),
        8.16 * Math.cos(((-1 + i) / s) * Math.PI),
        1.5,
        0,
        [0, 0],
      ),
      drill,
      obake,
    });
    a.push({
      func: dFunc(
        6.12 * Math.sin(((-1 + i) / s) * Math.PI),
        6.12 * Math.cos(((-1 + i) / s) * Math.PI),
        1.5,
        0,
        [0, 0],
      ),
      drill,
      obake,
    });
    a.push({
      func: dFunc(
        4.08 * Math.sin(((-1 + i) / s) * Math.PI),
        4.08 * Math.cos(((-1 + i) / s) * Math.PI),
        1.5,
        0,
        [0, 0],
      ),
      drill,
      obake,
    });
  }
  return a;
}
function five(
  s = 24.62,
  drill = false,
  delay = 300,
  obake = false,
  size = 1,
  daen = 1,
) {
  const a: ShotDef[] = [];
  a.push({
    func: dFunc(
      s * Math.sin((0 / 12) * Math.PI) * daen,
      s * Math.cos((0 / 12) * Math.PI),
      5 * size,
      0,
      [0, -10],
    ),
    drill,
    delay,
    obake,
  });
  a.push({
    func: dFunc(
      s * 0.625 * daen,
      s * Math.sqrt(39) / 8,
      3 * size,
      0,
      [0, -10],
    ),
    drill,
    delay,
    obake,
  });
  a.push({
    func: dFunc(
      s * -0.625 * daen,
      s * Math.sqrt(39) / 8,
      3 * size,
      0,
      [0, -10],
    ),
    drill,
    delay,
    obake,
  });
  a.push({
    func: dFunc(
      s * 0.375 * daen,
      s * Math.sqrt(55) / 8,
      3 * size,
      0,
      [0, -10],
    ),
    drill,
    delay,
    obake,
  });
  a.push({
    func: dFunc(
      s * -0.375 * daen,
      s * Math.sqrt(55) / 8,
      3 * size,
      0,
      [0, -10],
    ),
    drill,
    delay,
    obake,
  });

  return a;
}

function awa_ring() {
  const a: ShotDef[] = [];
  for (let i = 0; i < 8; i++) {
    a.push({
      func: dKaiten(
        Math.PI / 8 * (2 * i + 1),
        0.13,
        6.9, //6.9
        0,
        8,
        1.5, //1.55
      ),
      delay: 350,
    });
  }
  return a;
}
function awa_ringx() {
  const a: ShotDef[] = [];
  for (let i = 0; i < 8; i++) {
    a.push({
      func: dKaiten(
        Math.PI / 4 * i,
        0.1,
        14,
        0,
        50 - 5 * i,
        2 * (50 - 5 * i) / 100,
        1.5,
      ),
      delay: 400,
      drill: true,
    });
  }
  for (let i = 0; i < 10; i++) {
    a.push({
      func: dKaiten(
        Math.PI + Math.PI / 5 * i,
        0.1,
        14,
        0,
        50 - 5 * i,
        2 * (50 - 5 * i) / 100,
        1.5,
      ),
      delay: 400,
      drill: true,
    });
  }
  return a;
}
function uzu(
  dr1 = -1.5,
  q = 100,
  dr2 = 0,
  p = 250,
  kaiten = 0.06,
  dy = 2.6,
  size = 3,
  z = 0,
  when = 10,
  when2 = 2.6 / 0.06,
): MoveFunc {
  return (t) => {
    if (t < when) {
      return [
        (q / 2) * Math.sin(t * Math.PI * 0.1 + 1 / 2 * Math.PI) - q / 2,
        -(p / 10) * Math.cos(t * Math.PI * 0.1 + 1 / 2 * Math.PI) + z + dy * t,
        size,
      ];
    } else if (t < when2 && t >= when) {
      return [
        (q - dr1 * (t - when)) *
        Math.sin((t - when) * Math.PI * kaiten - 1 / 2 * Math.PI),
        -((p - (t - when) * dr1) / 10) *
          Math.cos((t - when) * Math.PI * kaiten - 1 / 2 * Math.PI) +
        z + dy * t,
        size,
      ];
    }
    return [
      (q - dr2 * (t - when2) - dr1 * (when2 - when)) *
      Math.sin((t - when2) * Math.PI * kaiten - 1 / 2 * Math.PI),
      -((p - (t - when2) * dr2 - dr1 * (when2 - when)) / 10) *
        Math.cos((t - when2) * Math.PI * kaiten - 1 / 2 * Math.PI) + z + dy * t,
      size,
    ];
  };
}

function uzushio() {
  const a: ShotDef[] = [];
  for (let i = 0; i < 20; i++) {
    a.push({
      func: delay(
        (120 * i + 200) / 25,
        uzu(
          //-2.2 + 0.11 * i,
          -2.2 + 0.25 * i,
        ),
      ),
      delay: 0,
      drill: true,
    });
  }
  return a;
}
function i_spread(r = -1) {
  const a: ShotDef[] = [];
  for (let i = 0; i < 24; i++) {
    a.push({
      func: dCurve(
        Math.PI / 12 * i,
        r * (0.019 / 12) * Math.PI,
        1.5,
        4.5,
        [0, -50],
        6,
      ),
      delay: 0,
    });
  }
  return a;
}

function m_spread(r = 1, s = 1) {
  const a: ShotDef[] = [];
  for (let i = 0; i < 12; i++) {
    a.push({
      func: dCurve(
        (i / 6) * Math.PI,
        r * (0.024 / 12) * Math.PI,
        3,
        6.8 * s,
        [0, -50],
        5,
      ),
      delay: 400,
      drill: true,
    });
  }
  for (let i = 0; i < 12; i++) {
    a.push({
      func: dCurve(
        ((2 * i) + 1) / 12 * Math.PI,
        r * (0.024 / 12) * Math.PI,
        1.5,
        6.8 * s,
        [0, -50],
        5,
      ),
      delay: 400,
      drill: true,
    });
  }
  return a;
}
function tubo_spread(
  kazu = 6,
  r = 1,
  size1 = 1.5,
  size2 = 3,
  s = 1,
  add = 3,
  drill = false,
) {
  const a: ShotDef[] = [];
  for (let i = 0; i < kazu; i++) {
    a.push({
      func: dCurve(
        (2 * i / kazu) * Math.PI,
        r * (0.024 / 12) * Math.PI,
        size1,
        6.8 * s,
        [0, -10],
        add,
      ),
      delay: 0,
      drill,
    });
  }
  for (let i = 0; i < kazu; i++) {
    a.push({
      func: dCurve(
        ((2 * i) + 1) / kazu * Math.PI,
        r * (0.024 / 12) * Math.PI,
        size2,
        6.8 * s,
        [0, -10],
        add,
      ),
      delay: 0,
      drill,
    });
  }
  return a;
}
function senaka(
  θ = 5.5 / 6 * Math.PI,
  dθ = 0.00001 * Math.PI,
  size = 3,
  speed = 8,
): MoveFunc {
  return function (t) {
    if (t <= 3) {
      this.by = 0;
      return [0, 0, size];
    } else {
      this.by = 0;
      return [
        t * speed * Math.sin(θ + dθ * t * t),
        t * speed * Math.cos(θ + dθ * t),
        size,
      ];
    }
  };
}
function bigarrow() {
  const a: ShotDef[] = [];
  a.push({ func: dFunc(0, 20.5, 3, 0, [0, 10]), delay: 300 });

  a.push({
    func: dFuncif(1100 / 16, 0, 0, 16.5, 4, 0, 3, [0, 10]),
    delay: 300,
  });
  a.push({
    func: dFuncif(-1100 / 16, 0, 0, 16.5, 4, 0, 3, [0, 10]),
    delay: 300,
  });

  a.push({
    func: dFuncif(1100 / 16, 0, 0, 12.5, 8, 0, 3, [0, 10]),
    delay: 300,
  });
  a.push({
    func: dFuncif(-1100 / 16, 0, 0, 12.5, 8, 0, 3, [0, 10]),
    delay: 300,
  });

  a.push({
    func: dFuncif(1100 / 16, 0, 0, 8.5, 12, 0, 3, [0, 10]),
    delay: 300,
  });
  a.push({
    func: dFuncif(-1100 / 16, 0, 0, 8.5, 12, 0, 3, [0, 10]),
    delay: 300,
  });
  return a;
}
function nazospread(r = -1) {
  const a: ShotDef[] = [];
  for (let i = 0; i < 12; i++) {
    a.push({
      func: kaiten(
        (i / 6) * Math.PI,
        r * (0.05 / 12) * Math.PI, //回転量
        0,
        0,
        8, //半径変化量
        0, //半径変化量加速
        3,
        [0, -50],
      ), //半径変化量
      delay: 400,
      drill: true,
    });
  }
  for (let i = 0; i < 12; i++) {
    a.push({
      func: kaiten(
        ((2 * i) + 1) / 12 * Math.PI,
        r * (0.05 / 12) * Math.PI, //回転量
        0,
        0,
        8, //半径変化量
        0, //半径変化量加速
        1.5,
        [0, -50],
      ), //半径変化量
      delay: 400,
      drill: true,
    });
  }
  return a;
}
/* 試作置き場 */
/*
{// 164
p: 10, cost: 0, name: "試うずしお", shots: [ //未
    {func: uzu(), drill: true},
    {func: uzu(-1.43), delay : 110, drill: true},
    {func: uzu(-1.36), delay : 220, drill: true},
    {func: uzu(-1.29), delay : 330, drill: true},
    {func: uzu(-1.22), delay : 440, drill: true},
    {func: uzu(-1.15), delay : 550, drill: true},
    {func: uzu(-1.08), delay : 660, drill: true},
    {func: uzu(-1.01), delay : 770, drill: true},
    {func: uzu(-0.94), delay : 880, drill: true},
    {func: uzu(-0.87), delay : 990, drill: true},
    {func: uzu(-0.8), delay : 1100, drill: true},
    {func: uzu(-0.73), delay : 1210, drill: true},
    {func: uzu(-0.66), delay : 1320, drill: true},
    {func: uzu(-0.59), delay : 1430, drill: true},
    {func: uzu(-0.52), delay : 1540, drill: true},
    {func: uzu(-0.45), delay : 1650, drill: true},
    {func: uzu(-0.38), delay : 1760, drill: true},
    {func: uzu(-0.31), delay : 1870, drill: true},
    {func: uzu(-0.24), delay : 1980, drill: true},
    {func: uzu(-0.17), delay : 2090, drill: true},
]
},*/
/*没デルタ
{ // 40
    p: 2,
    cost: 6,
    name: "デルタ", //未
    shots: [
      {
        func: dKaitenFuncif(
          0,
          -0.0068 * Math.PI,
          (0 / 24) * Math.PI,
          -0.0041 * Math.PI,
          0,
          2,
          0,
          2.68,
          52,
          0,
          1.5,
          [0, -65],
          0.062,
          0,
        ),
        delay: 0,
        drill: true,
      },
      {
        func: dKaitenFuncif(
          0,
          -0.0068 * Math.PI,
          -(16 / 24) * Math.PI,
          -0.0041 * Math.PI,
          0,
          2,
          0,
          2.68,
          52,
          0,
          1.5,
          [0, -65],
          0.062,
          0,
        ),
        delay: 0,
        drill: true,
      },
      {
        func: dKaitenFuncif(
          0,
          -0.0068 * Math.PI,
          (16 / 24) * Math.PI,
          -0.0041 * Math.PI,
          0,
          2,
          0,
          2.68,
          52,
          0,
          1.5,
          [0, -65],
          0.062,
          0,
        ),
        delay: 0,
        drill: true,
      },
      {
        func: dKaitenFuncif(
          0,
          -0.0068 * Math.PI,
          (24 / 24) * Math.PI,
          -0.0041 * Math.PI,
          0,
          2,
          0,
          2.68,
          52,
          0,
          1.5,
          [0, -65],
          0.031,
          0,
        ),
        delay: 0,
        drill: true,
      },
      {
        func: dKaitenFuncif(
          0,
          -0.0068 * Math.PI,
          (8 / 24) * Math.PI,
          -0.0041 * Math.PI,
          0,
          2,
          0,
          2.68,
          52,
          0,
          1.5,
          [0, -65],
          0.031,
          0,
        ),
        delay: 0,
        drill: true,
      },
      {
        func: dKaitenFuncif(
          0,
          -0.0068 * Math.PI,
          -(8 / 24) * Math.PI,
          -0.0041 * Math.PI,
          0,
          2,
          0,
          2.68,
          52,
          0,
          1.5,
          [0, -65],
          0.031,
          0,
        ),
        delay: 0,
        drill: true,
      },
    ],
  },
  */
/* 没ヘキサ
 { // 41
    p: 2,
    cost: 0,
    name: "ヘキサ", //未
    shots: [
      {
        func: dKaitenFuncif(
          0,
          0.0060 * Math.PI,
          (0 / 24) * Math.PI,
          0.0051 * Math.PI,
          0,
          2.63,
          0,
          2.63,
          80,
          0,
          1.5,
          [0, -65],
          0.044,
          0,
        ),
        delay: 100,
        drill: true,
      },
      {
        func: dKaitenFuncif(
          0,
          0.0060 * Math.PI,
          -(16 / 24) * Math.PI,
          0.0051 * Math.PI,
          0,
          2.63,
          0,
          2.63,
          80,
          0,
          1.5,
          [0, -65],
          0.044,
          0,
        ),
        delay: 100,
        drill: true,
      },
      {
        func: dKaitenFuncif(
          0,
          0.0060 * Math.PI,
          (16 / 24) * Math.PI,
          0.0051 * Math.PI,
          0,
          2.63,
          0,
          2.63,
          80,
          0,
          1.5,
          [0, -65],
          0.044,
          0,
        ),
        delay: 100,
        drill: true,
      },
      {
        func: dKaitenFuncif(
          0,
          0.0060 * Math.PI,
          (24 / 24) * Math.PI,
          0.0051 * Math.PI,
          0,
          2.63,
          0,
          2.63,
          80,
          0,
          1.5,
          [0, -65],
          0.044,
          0,
        ),
        delay: 100,
        drill: true,
      },
      {
        func: dKaitenFuncif(
          0,
          0.0060 * Math.PI,
          (8 / 24) * Math.PI,
          0.0051 * Math.PI,
          0,
          2.63,
          0,
          2.63,
          80,
          0,
          1.5,
          [0, -65],
          0.044,
          0,
        ),
        delay: 100,
        drill: true,
      },
      {
        func: dKaitenFuncif(
          0,
          0.0060 * Math.PI,
          -(8 / 24) * Math.PI,
          0.0051 * Math.PI,
          0,
          2.63,
          0,
          2.63,
          80,
          0,
          1.5,
          [0, -65],
          0.044,
          0,
        ),
        delay: 100,
        drill: true,
      },
      {
        func: dKaitenFuncif(
          0,
          0.0060 * Math.PI,
          (4 / 24) * Math.PI,
          0.0051 * Math.PI,
          0,
          2.63,
          0,
          2.63,
          80,
          0,
          1.5,
          [0, -65],
          0.021,
          0,
        ),
        delay: 100,
        drill: true,
      },
      {
        func: dKaitenFuncif(
          0,
          0.0060 * Math.PI,
          -(12 / 24) * Math.PI,
          0.0051 * Math.PI,
          0,
          2.63,
          0,
          2.63,
          80,
          0,
          1.5,
          [0, -65],
          0.021,
          0,
        ),
        delay: 100,
        drill: true,
      },
      {
        func: dKaitenFuncif(
          0,
          0.0060 * Math.PI,
          (20 / 24) * Math.PI,
          0.0051 * Math.PI,
          0,
          2.63,
          0,
          2.63,
          80,
          0,
          1.5,
          [0, -65],
          0.021,
          0,
        ),
        delay: 100,
        drill: true,
      },
      {
        func: dKaitenFuncif(
          0,
          0.0060 * Math.PI,
          (28 / 24) * Math.PI,
          0.0051 * Math.PI,
          0,
          2.63,
          0,
          2.63,
          80,
          0,
          1.5,
          [0, -65],
          0.021,
          0,
        ),
        delay: 100,
        drill: true,
      },
      {
        func: dKaitenFuncif(
          0,
          0.0060 * Math.PI,
          (12 / 24) * Math.PI,
          0.0051 * Math.PI,
          0,
          2.63,
          0,
          2.63,
          80,
          0,
          1.5,
          [0, -65],
          0.021,
          0,
        ),
        delay: 100,
        drill: true,
      },
      {
        func: dKaitenFuncif(
          0,
          0.0060 * Math.PI,
          -(4 / 24) * Math.PI,
          0.0051 * Math.PI,
          0,
          2.63,
          0,
          2.63,
          80,
          0,
          1.5,
          [0, -65],
          0.021,
          0,
        ),
        delay: 100,
        drill: true,
      },
    ],
  },
*/
