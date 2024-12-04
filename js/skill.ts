import type { Star, SkillDef, MoveFunc, St, ShotDef, CharaDef } from "./types.ts";

import type { Shot } from "./game.ts";

const del = (): [number, number, number] => [10000, 0, 0]

function effect(callback: (p: Shot) => void): MoveFunc {
    return function (t) {
        callback(this)
        return [1401, 0, 0];
    };
}
function kasoku(dx = 0, dy = 10, size = 3, add = 0, [x, y] = [0, 0]): MoveFunc {
    return (t) => {
        t += add
        return [t * t * dx / 10 * 4 + x, t * t * dy / 10 * 4 + y, size];
    }
}
function kasoku2(dx = 0, dy = 10, size = 3, add = 0, [x, y] = [0, 0]): MoveFunc {
    return (t) => {
        t += add
        return [t * t * t * dx / 10 * 4 + x, t * t * dy / 10 * 4 + y, size];
    };
}
function kasoku3(dx = 0, dy = 10, size = 3, add = 0, [x, y] = [0, 0]): MoveFunc {
    return (t) => {
        t += add
        return [t * t * dx / 10 * 4 + x, t * t * t * dy / 10 * 4 + y, size];
    };
}
function kasoku4(dx = 0, ddx = 0, dy = 10, size = 3, add = 0, [x, y] = [0, 0]): MoveFunc {
    return (t) => {
        t += add
        return [(t * t * t * t * ddx + t * dx) / 10 * 4 + x, t * t * dy / 10 * 4 + y, size];
    };
}
function kasoku5(dx = 0, ddx = 0, dy = 10, size = 3, add = 0, [x, y] = [0, 0]): MoveFunc {
    return (t) => {
        t += add
        return [(t * t * t * ddx + t * dx) / 10 * 4 + x, t * t * dy / 10 * 4 + y, size];
    };
}
function dFunc(dx = 0, dy = 10, size = 3, add = 0, [x, y] = [0, 0]): MoveFunc {
    return (t) => {
        t += add
        return [t * dx / 10 * 4 + x, t * dy / 10 * 4 + y, size];
    };
}

function dCurve(θ = 0, dθ = 0, size = 3, speed = 7): MoveFunc {
    return (t) => {
        return [t * speed * Math.sin(θ + dθ * t), t * speed * Math.cos(θ + dθ * t) - 20, size];
    };
}

function dKaiten(θ = 0, dθ = 0.35, dy = 2, dx = 0, r = 5, dr = 0.13, size = 1.5, drx = 1, dry = 1, [x, y] = [0, 0]): MoveFunc {
    return (t) => {
        return [t * dx + drx * (r + dr * t) * Math.cos(θ + dθ * t) - x, t * dy + dry * (r + dr * t) * Math.sin(θ + dθ * t) - y, size];
    };
}

function takino(θ = 0, dθ = 0.35, dy = 2, r = 5, dr = 0.13, size = 1.5, dry = 1, [x, y] = [0, 0]): MoveFunc {
    return (t) => {
        return [0 + x, t * dy + dry * (r + dr * t) * Math.sin(θ + dθ * t) + y, size];
    };
}
function dKaitenFuncif(r = 13, dθ = (-(1 / 30) * Math.PI), θ = ((4.5 / 6) * Math.PI), dθ2 = (-(1 / 30) * Math.PI), dx = 0, dy = 10, dx2 = 11, dy2 = 2, when = 60, add = 0, size = 3, [x, y] = [0, 0]): MoveFunc {
    return (t) => {
        t += add
        if (t <= when) {
            return [t * dx + t * (r * Math.cos(θ + dθ * t)) + x, t * dy + t * (r * Math.sin(θ + dθ * t)) + y, size];
        } else
            return [when * dx + when * (r * Math.cos(θ + dθ * when + dθ2 * (t - when))) + x + (t - when) * dx2,
            when * dy + when * (r * Math.sin(θ + dθ * when + dθ2 * (t - when))) + y + (t - when) * dy2,
                size];
    };
}
function dFuncif(dx = 0, dy = 10, dx2 = 11, dy2 = 2, when = 60, add = 0, size = 3, [x, y] = [0, 0]): MoveFunc {
    return (t) => {
        t += add
        if (t <= when) {
            return [t * dx / 10 * 4 + x, t * dy / 10 * 4 + y, size];
        } else
            return [when * dx / 10 * 4 + x + (dx2 * (t - when)) / 10 * 4, when * dy / 10 * 4 + y + dy2 * (t - when) / 10 * 4, size];
    };
}
function xgiri1(s = 30, size = 5): MoveFunc {
    return function (t) {
        this.bx = 30
        return [-700 / s * t, (840 / s * t) - 60, size]
    }
}
function xgiri2(s = 30, size = 5): MoveFunc {
    return function (t) {
        this.bx = 670
        return [700 / s * t, (840 / s * t) - 60, size]
    }
}
function turumai1(s = 40, size = 3): MoveFunc {
    return function (t) {
        this.bx = 450
        return [210 / s * t, (810 / s * t) - 60, size]
    }
}
function turumai2(s = 40, size = 3): MoveFunc {
    return function (t) {
        this.bx = 250
        return [-210 / s * t, (810 / s * t) - 60, size]
    }
}
function turumai3(s = 40, size = 3): MoveFunc {
    return function (t) {
        this.bx = 550
        return [420 / s * t, (810 / s * t) - 60, size]
    }
}
function turumai4(s = 40, size = 3): MoveFunc {
    return function (t) {
        this.bx = 150
        return [-420 / s * t, (810 / s * t) - 60, size]
    }
}
function turumai5(s = 40, size = 3): MoveFunc {
    return function (t) {
        this.bx = 650
        return [630 / s * t, (810 / s * t) - 60, size]
    }
}
function turumai6(s = 40, size = 3): MoveFunc {
    return function (t) {
        this.bx = 50
        return [-630 / s * t, (810 / s * t) - 60, size]
    }
}

function longaim(s = 30, size = 3): MoveFunc {
    return function (t) {
        return [-t * ((350 - this.bx) / s), t * ((this.by - 80) / s), size]
    }
}
function shortaim(s = 30, size = 3): MoveFunc {
    return function (t) {
        return [-t * ((350 - this.bx) * 2 / s), -t * ((500 - this.by) * 2 / s), size]
    }
}
function turnaim(s = 30, size = 3): MoveFunc {
    return function (t) {
        if (t === (s / 2)) {
            this.bx = 700 - this.bx
        }
        return [-t * ((350 - this.bx) * 2 / s), -t * ((500 - this.by) * 2 / s), size]
    }
}
function corneraim1(s = 30, size = 3): MoveFunc {
    return function (t) {
        return [t * ((this.bx) / s), t * ((this.by - 80) / s), size]
    }
}
function corneraim2(s = 30, size = 3): MoveFunc {
    return function (t) {
        return [-t * ((700 - this.bx) / s), t * ((this.by - 80) / s), size]
    }
}

function mirror(dx = 0, dy = 10, size = 3): MoveFunc {
    return function (t) {
        if ((t * dy / 10 * 4) > (this.parent.game.me.st.y - 500)) {
            return [
                -((350 - this.bx) * 2) - (t * dx / 10 * 4),
                t * dy / 10 * 4,
                size,
            ];
        }
        return [t * dx / 10 * 4, t * dy / 10 * 4, size];
    };
}
function center(dx = 0, dy = 10, size = 3): MoveFunc {
    return function (t) {
        if ((t * dy / 10 * 4) > (this.parent.game.me.st.y - 500)) {
            return [
                -((350 - this.bx)) - (t * dx / 10 * 4),
                t * dy / 10 * 4,
                size,
            ];
        }
        return [t * dx / 10 * 4, t * dy / 10 * 4, size];
    };
}
function mirrorfusen(dx = 0, dy = 8.55, bsize = 1.5, tosize = 13): MoveFunc {
    let nt = 0;
    return function (t) {
        if ((t * dy / 10 * 4) > (this.parent.game.me.st.y - 500) &&
            ((bsize + ((tosize - bsize) * (t - nt) / 20)) < tosize)
        ) {
            return [
                -((350 - this.bx) * 2) - (t * dx / 10 * 4),
                t * dy / 10 * 4,
                bsize + ((tosize - bsize) * (t - nt) / 20),
            ];
        } else if ((bsize + ((tosize - bsize) * (t - nt) / 20)) >= tosize) {
            return [-((350 - this.bx) * 2) - (t * dx / 10 * 4), t * dy / 10 * 4, tosize];
        }
        nt = t;
        return [t * dx / 10 * 4, t * dy / 10 * 4, bsize];
    };
}
function sprit(dx = 0, dy = 10, size = 3, rl = 1, s = 100): MoveFunc {
    return function (t) {
        if ((t * dy / 10 * 4) > (this.parent.game.me.st.y - 500)) {
            return [
                rl * s,
                t * dy / 10 * 4,
                size,
            ];
        }
        return [t * dx / 10 * 4, t * dy / 10 * 4, size];
    };
}

function fusen(dx = 0, s = 10, bsize = 1, tosize = 3): MoveFunc {
    let nt = 0;
    return function (t) {
        if (
            (t * s / 10 * 4) > ((this.parent.game.me.st.y - 500) * 2 - 400) &&
            ((bsize + ((tosize - bsize) * (t - nt) / 50)) < tosize)
        ) {
            return [
                t * dx / 10 * 4,
                t * s / 10 * 4,
                bsize + ((tosize - bsize) * (t - nt) / 50),
            ];
        } else if ((bsize + ((tosize - bsize) * (t - nt) / 50)) >= tosize) {
            return [t * dx / 10 * 4, t * s / 10 * 4, tosize];
        }
        nt = t;
        return [t * dx / 10 * 4, t * s / 10 * 4, bsize];
    };
}

function curve(h = 1, w = 1.1, s = 13, size = 3, [x, y] = [0, 0]): MoveFunc {
    return (t) => {
        return [-Math.sin(t * w / 5.7) * h * 50 + x, t * s / 10 * 4 + y, size];
    };
}
function swim(h = 1, w = 1.1, s = 13, size = 3, dh = 0.1): MoveFunc {
    return (t) => {
        return [-Math.sin(t * w / 5.7) * (h + (dh * t)) * 50, t * s / 10 * 4, size];
    };
}
function fastswim(h = 1, w = 1.1, s = 13, size = 3, dh = 0.1): MoveFunc {
    return (t) => {
        return [-Math.sin(t * w / 5.7) * (h + (dh * t * t)) * 50, t * s / 10 * 4, size];
    };
}
function ago(h = 1, w = 1.1, s = 13, size = 3, z = 4): MoveFunc {
    return (t) => {
        return [-Math.abs(Math.sin(t * w / 5.7) * h * 50), (t * s / 10 * 4) - z, size];
    };
}
function damashi(s = 19, l = 0, size = 3, w = 1): MoveFunc {
    let nt = 0;
    if (l) {
        return function (t) {
            if ((t * s / 10 * 4) > ((this.parent.game.me.st.y - 500) * 2 - 300)) {
                return [w * (t - nt), t * s / 10 * 4, size];
            }
            nt = t;
            return [0, t * s / 10 * 4, size];
        };
    } else {
        return function (t) {
            if ((t * s / 10 * 4) > ((this.parent.game.me.st.y - 500) * 2 - 300)) {
                return [-w * (t - nt), t * s / 10 * 4, size];
            }
            nt = t;
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
function yura2(h = 1, w = 1.1, s = 1, size = 3, dy = 0, [x, y] = [0, 0]): MoveFunc {
    return (t) => {
        return [
            -Math.sin(t * w / 20) * h + x,
            ((1 / (s * w)) * ((10 * Math.sin(t * w / 10)) + t * w)) + y + t * dy,
            size,
        ];
    };
}
function charge(s = 1, size = 3): MoveFunc {
    return (t) => {
        return [
            0,
            2000 - s * 10000 / (t / 30 + 5),
            size,
        ];
    };
}

function delay(time: number, f: MoveFunc): MoveFunc {
    return function (t, extra) {
        if (time > t) {
            return [700, 0, 0]
        } else {
            return f.call(this, t, extra)
        }
    };
}
function syuki(param: Record<number, MoveFunc>, count: number): MoveFunc {
    return function (t, extra) {
        return (param as any)[extra!.count % count].call(this, t, extra)
    };
}
function X(param: {
    1: MoveFunc
    2: MoveFunc
    3: MoveFunc
    4: MoveFunc
    5: MoveFunc
    6: MoveFunc
    7: MoveFunc
    8: MoveFunc
    9: MoveFunc
    10: MoveFunc
}): MoveFunc {
    return function (t, extra) {
        if (extra && extra?.cost) {
            return (param as any)[extra.cost].call(this, t, extra)
        } else {
            return [0, 0, 10000]
        }
    };
}

function huurie(x = 100, dx = 1, size = 3): MoveFunc {
    return (t) => {
        return [
            -(4 * x / Math.PI) * (Math.sin(t * dx / 9) + Math.sin(t * dx * 3 / 9) / 3 + Math.sin(t * dx * 5 / 9) / 5 + Math.sin(t * dx * 7 / 9) / 7 + Math.sin(t * dx * 9 / 9) / 9), (t * dx * Math.PI) * 3, size,
        ];
    };
}
function inazuma(dy = 0.5, size = 3, x = 53, speed = 9, add = 0): MoveFunc {
    return (t) => {
        t += add;
        return [
            -(8 * x / (Math.PI * Math.PI)) * (Math.sin(t * dy / 2) - Math.sin(t * dy * 3 / 2) / 9 + Math.sin(t * dy * 5 / 2) / 25 - Math.sin(t * dy * 7 / 2) / 49 + Math.sin(t * dy * 9 / 2) / 81 - Math.sin(t * dy * 11 / 2) / 121 + Math.sin(t * dy * 13 / 2) / 169 - Math.sin(t * dy * 15 / 2) / 225 + Math.sin(t * dy * 17 / 2) / 289 - Math.sin(t * dy * 19 / 2) / 361 + Math.sin(t * dy * 21 / 2) / 441),
            (t * dy * Math.PI) * speed,
            size,
        ]
    }
}
function shinaru(speed = 10, s = 1800, z = 0, w = 700, size = 12, [x, y] = [0, -50]): MoveFunc {
    return (t) => {
        return [(- (1 / s) * ((t * speed) - z) * ((t * speed) - w)) + x, (t * speed) + y, size];
    };

}
function daen2(p = 360, q = 40, speed = 0.015, size = 3, z = 300, θ = 2, add = 0): MoveFunc {
    return (t) => {
        t += add
        if ((t * speed) <= θ) { return [q * Math.sin(t * Math.PI * speed), - p * Math.cos(t * Math.PI * speed) + z, size]; }
        else (θ <= (t * speed))
        { return [0, -140000000, size]; }
    };

}
function daen3(p = 360, q = 40, speed = 0.015, size = 3, z = 300, θ = 2, add = 0, dx = -1.1): MoveFunc {
    return (t) => {
        t += add
        if ((t * speed) <= θ) { return [(q * Math.sin(t * Math.PI * speed)) + t * dx, - p * Math.cos(t * Math.PI * speed) + z, size]; }
        else (θ <= (t * speed))
        { return [0, -140000000, size]; }
    };

}

function tubo(d = 1, speed = 4, size = 3, [x, y] = [0, -20], add = -10): MoveFunc {
    return (t) => {
        t += add;
        return [(((((t * speed - 378) / 21) ** 3) / 3) - 64 * ((t * speed - 378) / 21)) / 6 * d + x + 220, (t * speed) + y, size];
    };

}
function lcurve(h = 1, w = 1.1, s = 13, size = 3, [x, y] = [0, 0], zurasi = 0, dy = 0): MoveFunc {
    return (t) => {
        return [Math.sin(t * w / 5.7) * h * 50 + x - zurasi * t / 10, t * s / 10 * 4 + y + t * dy, size];
    };

}
function rlcurve(h = 1, w = 1.1, s = 13, size = 3, [x, y] = [0, 0], zurasi = 0, dy = 0): MoveFunc {
    return (t) => {
        return [-(Math.sin(t * w / 5.7) * h * 50 + x - zurasi * t / 10), t * s / 10 * 4 + y + t * dy, size];
    };

}
function drilll() {
    const a: ShotDef[] = [];
    a.push({ func: dFunc(0, 15, 3), drill: true });
}


export function load_skill(star: Star) {
    const pStatus = ["☆", "★"];
    star.skill = [
        skill_list[star.skill_select[0]],
        skill_list[star.skill_select[1]],
        skill_list[star.skill_select[2]],
    ];
    star.skill_gage[0].innerText = star.skill[0].name;
    star.skill_gage[1].innerText = star.skill[1].name;
    star.skill_gage[2].innerText = star.skill[2].name;
    star.skill_gage_cost[0].innerText = star.skill[0].x ? "X" : star.skill[0].cost + "";
    star.skill_gage_cost[1].innerText = star.skill[1].x ? "X" : star.skill[1].cost + "";
    star.skill_gage_cost[2].innerText = star.skill[2].x ? "X" : star.skill[2].cost + "";
    p_skill(star)
}
export function p_skill(star: Star) {
    const pStatus = ["☆", "★"];
    star.skill_gage_cost[0].innerText = star.skill[0].x ? "X" : star.skill[0].cost + "";
    star.skill_gage_cost[1].innerText = star.skill[1].x ? "X" : star.skill[1].cost + "";
    star.skill_gage_cost[2].innerText = star.skill[2].x ? "X" : star.skill[2].cost + "";
    if (star.st.p < star.skill[1].p) {
        star.skill_gage_cost[1].innerText = pStatus[1].repeat(star.st.p);
        star.skill_gage_cost[1].innerText += pStatus[0].repeat(
            star.skill[1].p - star.st.p,
        );
    }
    if (star.st.p < (star.skill[1].p + star.skill[2].p)) {
        star.skill_gage_cost[2].innerText = pStatus[1].repeat(
            (star.st.p - star.skill[1].p) > 0
                ? (star.st.p - star.skill[1].p)
                : 0,
        );
        star.skill_gage_cost[2].innerText += pStatus[0].repeat(
            (star.skill[1].p + star.skill[2].p - star.st.p) < star.skill[2].p
                ? (star.skill[1].p + star.skill[2].p - star.st.p)
                : star.skill[2].p,
        );
    }
}
export const skill_list: SkillDef[] = [
    {// 0
        p: 0, cost: 1, name: "しょぼショット", shots: [
            { func: dFunc(0, 6.48, 3) }
        ]
    },
    {// 1
        p: 2, cost: 5, name: "トリプルスター", shots: [
            { func: dFunc(3.724, 15.288, 3, 0, [0.98, -6.86]) },
            { func: dFunc(0, 15.68, 5, 0, [0, -6.86]) },
            { func: dFunc(-3.724, 15.288, 3, 0, [-0.98, -6.86]) }
        ]
    },
    {// 2
        p: 2, cost: 7, name: "プチだんまく", shots: danmaku(4)
    },
    {// 3
        p: 2, cost: 7, name: "ファイブスター", shots: [
            { func: dFunc(10.515, 16.15, 3, 0, [2.5, 0]), delay: 300 },
            { func: dFunc(6.154, 18.46, 3, 0, [3, 0]), delay: 300 },
            { func: dFunc(0, 20, 5, 0, [0, -0.5]), delay: 300 },
            { func: dFunc(-6.154, 18.46, 3, 0, [-3, 0]), delay: 300 },
            { func: dFunc(-10.515, 16.15, 3, 0, [-2.5, 0]), delay: 300 },
        ]
    },
    {// 4
        p: 0, cost: 2, name: "ショット", shots: [
            { func: dFunc(0, 17.5, 3) }
        ]
    },
    {// 5
        p: 2, cost: 3, name: "だましレフト", shots: [
            { func: damashi(17.5, 1, 3, 1.5), delay: 0 }
        ]
    },
    {// 6
        p: 2, cost: 3, name: "だましライト", shots: [
            { func: damashi(17.5, 0, 3, 1.5), delay: 0 }
        ]
    },
    {// 7
        p: 2, cost: 4, name: "ファストショット", shots: [
            { func: dFunc(0, 27, 3), delay: 0 }
        ]
    },
    {// 8
        p: 2, cost: 7, name: "スピードショット", shots: [
            { func: dFunc(0, 48.6, 3, 0, [0, 10]), delay: 25 }
        ]
    },
    {// 9
        p: 2, cost: 5, name: "ファストレフト", shots: [
            { func: damashi(27, 1, 3, 2), delay: 0 }
        ]
    },
    {// 10
        p: 2, cost: 5, name: "ファストライト", shots: [
            { func: damashi(27, 0, 3, 2), delay: 0 }
        ]
    },
    {// 11
        p: 0, cost: 2, name: "カーブショット", shots: [
            { func: curve(0.98, 0.93, 12.86), delay: 0 }
        ]
    },
    {// 12
        p: 0, cost: 1, name: "しょぼカーブ", shots: [
            { func: curve(0.48, 0.95, 6.48), delay: 0 }
        ]
    },
    {// 13
        p: 2, cost: 5, name: "さんれんぱつ", shots: [
            { func: dFunc(0, 19.8, 3), delay: 0 },
            { func: dFunc(0, 19.8, 3), delay: 160, },
            { func: dFunc(0, 19.8, 3), delay: 310 }
        ]
    },
    {// 14
        p: 2, cost: 4, name: "ファストカーブ", shots: [
            { func: curve(1.05, 1.1, 20), delay: 0 }
        ]
    },
    {// 15
        p: 2, cost: 8, name: "はっぽんあし", shots: happon()
    },
    {// 16
        p: 2, cost: 8, name: "のびのびカーブ", shots: nobinobi()
    },
    {// 17
        p: 0, cost: 2, name: "ドリルショット", shots: [
            { func: dFunc(0, 15, 3), delay: 0, drill: true }
        ]
    },
    {// 18
        p: 1, cost: 2, name: "スロードリル", shots: [
            { func: dFunc(0, 2.7, 3), delay: 0, drill: true }
        ]
    },
    {// 19
        p: 1, cost: 4, name: "ツインドリル", shots: [
            { func: dFunc(3, 15, 3), delay: 0, drill: true },
            { func: dFunc(-3, 15, 3), delay: 0, drill: true }
        ]
    },
    {// 20
        p: 3, cost: 8, name: "ドリルファイブ", shots: [
            { func: dFunc(13.67, 21, 3, 0, [3.25, 0]), delay: 400, drill: true },
            { func: dFunc(8, 24, 3, 0, [3.9, 0]), delay: 400, drill: true },
            { func: dFunc(0, 26, 5, 0, [0, -0.65]), delay: 400, drill: true },
            { func: dFunc(-8, 24, 3, 0, [-3.9, 0]), delay: 400, drill: true },
            { func: dFunc(-13.67, 21, 3, 0, [-3.25, 0]), delay: 400, drill: true },
        ]
    },
    {// 21
        p: 2, cost: 8, name: "ドリルアタック", shots: [
            { func: dFunc(2.14, 26.8, 1.5, 0, [0, -5]), delay: 200, drill: true },
            { func: dFunc(1.07, 26.95, 1.5, 0, [0, -5]), delay: 200, drill: true },
            { func: dFunc(0, 27, 1.5, 0, [0, -5]), delay: 200, drill: true },
            { func: dFunc(-1.07, 26.95, 1.5, 0, [0, -5]), delay: 200, drill: true },
            { func: dFunc(-2.14, 26.8, 1.5, 0, [0, -5]), delay: 200, drill: true },
        ]
    },
    {// 22
        p: 0, cost: 2, name: "ヘヴィショット", shots: [
            { func: dFunc(0, 10.5, 9), delay: 0 }
        ]
    },
    {// 23
        p: 0, cost: 3, name: "ヘヴィツイン", shots: [
            { func: dFunc(4, 10, 8.5), delay: 0 },
            { func: dFunc(-4, 10, 8.5), delay: 0 }
        ]
    },
    {// 24
        p: 3, cost: 5, name: "スーパーヘヴィ", shots: [
            { func: dFunc(0, 11.95, 18), delay: 0 }
        ]
    },
    {// 25
        p: 2, cost: 9, name: "だんまく", shots: danmaku()
    },
    {// 26
        p: 2, cost: 9, name: "マグナムショット", shots: [
            { func: dFunc(0, 26, 24), delay: 1000 }
        ]
    },
    {// 27
        p: 0, cost: 1, name: "プチショット", shots: [
            { func: dFunc(0, 8.55, 1.5), delay: 0 }
        ]
    },
    {// 28
        p: 1, cost: 2, name: "プチツイン", shots: [
            { func: dFunc(2.5, 8.31491712707, 1.5), delay: 0 },
            { func: dFunc(-2.5, 8.31491712707, 1.5), delay: 0, }
        ]
    },
    {// 29
        p: 2, cost: 3, name: "ふうせんショット", shots: [
            { func: fusen(0, 8.55, 1.5, 9), delay: 0 }
        ]
    },
    {// 30
        p: 2, cost: 6, name: "バルーンファイブ", shots: [
            { func: fusen(2.6, 8.1, 1.5, 4), delay: 25 },
            { func: fusen(1.3, 8.3, 1.5, 4), delay: 12 },
            { func: fusen(0, 8.5, 1.5, 4), delay: 0 },
            { func: fusen(-1.3, 8.3, 1.5, 4), delay: 12 },
            { func: fusen(-2.6, 8.1, 1.5, 4), delay: 25 },
        ]
    },
    {// 31
        p: 2, cost: 6, name: "ジャンボふうせん", shots: [
            { func: fusen(0, 8.55, 1.5, 33), delay: 0 }
        ]
    },
    {// 32
        p: 0, cost: 1, name: "ナメショット", shots: [
            { func: curve(0.45, 0.95, 2.7), delay: 0 }
        ]
    },
    {// 33
        p: 0, cost: 2, name: "ナメドリル", shots: [
            { func: curve(0.45, 0.95, 2.7), delay: 0, drill: true }
        ]
    },
    {// 34
        p: 1, cost: 4, name: "ナメヘヴィ", shots: [
            { func: curve(0.6, 0.7, 3.35, 10), delay: 0, drill: true }
        ]
    },
    {// 35
        p: 2, cost: 6, name: "ナメスプレッド", shots: name_spread()
    },
    {// 36
        p: 0, cost: 2, name: "ゆらゆらショット", shots: [
            { func: yura2(60, 1.55, 100, 3, 4, [0, 0]), delay: 0 }
        ]
    },
    {// 37
        p: 0, cost: 1, name: "しょぼゆらゆら", shots: [
            { func: yura2(30, 1.5, 10, 3, 2), delay: 0 }
        ]
    },
    {// 38
        p: 2, cost: 5, name: "イカスプレッド", shots: i_spread()
    },
    {// 39
        p: 2, cost: 4, name: "ワイドカーブ", shots: [
            { func: curve(4, 0.17, 9.7), delay: 0 }
        ]
    },
    {// 40
        p: 2, cost: 10, name: "じゅっぽんあし", shots: juppon()
    },
    {// 41
        p: 2, cost: 7, name: "うずしお", shots: uzushio()
    },
    {// 42
        p: 0, cost: 3, name: "ヘヴィドリル", shots: [
            { func: dFunc(0, 12.65, 11), delay: 0, drill: true }
        ]
    },
    {// 43
        p: 2, cost: 4, name: "ライオンツイン", shots: [
            { func: dFunc(4, 12, 9.5), delay: 0, drill: true },
            { func: dFunc(-4, 12, 9.5), delay: 0, drill: true }
        ]
    },
    {// 44
        p: 4, cost: 10, name: "ハイパーショット", shots: [
            { func: dFunc(0, 47, 30), delay: 2500, drill: true }
        ]
    },
    {// 45
        p: 0, cost: 2, name: "チャージアロー", shots: [
            { func: charge(), delay: 100 }
        ]
    },
    {// 46
        p: 0, cost: 2, name: "ピエロショット", shots: [
            { func: dFunc(0, 17.7, 3), delay: 0 }
        ]
    },
    {// 47
        p: 2, cost: 4, name: "ミラーショット", shots: [
            { func: mirror(0, 17.7, 3), delay: 0 }
        ]
    },
    {// 48
        p: 2, cost: 5, name: "だましダブル", shots: [
            { func: damashi(17.7, 1, 3, 1.5), delay: 0 },
            { func: damashi(17.7, 0, 3, 1.5), delay: 0 }
        ]
    },
    {// 49
        p: 0, cost: 3, name: "ドリルカーブ", shots: [
            { func: curve(1.5, 0.9, 10.83), delay: 0, drill: true }
        ]
    },
    {// 50
        p: 0, cost: 3, name: "ゆらゆらドリル", shots: [
            { func: yura(1.7, 1, 13), delay: 0, drill: true }
        ]
    },
    {// 51
        p: 2, cost: 5, name: "ムーンサルト", shots: [
            { func: curve(5.6, 0.21, 17.5), delay: 0 }
        ]
    },
    {// 52
        p: 2, cost: 6, name: "ドリルムーン", shots: [
            { func: curve(-5.6, 0.21, 17.8), delay: 0, drill: true }
        ]
    },
    {// 53
        p: 2, cost: 8, name: "ムーンスプレッド", shots: m_spread()
    },
    {// 54
        p: 3, cost: 8, name: "ムーンエイト", shots: happon(true)
    },
    {// 55
        p: 0, cost: 3, name: "あわショット", shots: [
            { func: dFunc(0, 4.26345609065, 1.5), delay: 0 },
            { func: dFunc(0, 9.70967741935, 1.5), delay: 0 },
            { func: dFunc(0, 15.05, 1.5), delay: 0 },
        ]
    },
    {// 56
        p: 0, cost: 3, name: "あわリング", shots: [
            { func: dKaiten(0, 0.29, 3.5, 0, 5, 0.21), delay: 0 },
            { func: dKaiten(Math.PI, 0.29, 3.5, 0, 5, 0.21), delay: 0 }
        ]
    },
    {// 57
        p: 2, cost: 6, name: "あわスプレー", shots: awasp()
    },
    {// 58
        p: 2, cost: 6, name: "あわウォール", shots: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(e => ({ func: dFunc(0, 4.26345609065 + 1.7 * e, 1.5), delay: 0 }))
    },
    {// 59
        p: 2, cost: 8, name: "あわはなび", shots: awawash()
    },
    {// 60
        p: 2, cost: 8, name: "あわサイクロン", shots: awa_ring()
    },
    {// 61
        p: 0, cost: 3, name: "ダブルショット", shots: [
            { func: curve(0.69, 1.11, 12.75), delay: 0 },
            { func: curve(-0.69, 1.11, 12.75), delay: 0 }
        ]
    },
    {// 62
        p: 0, cost: 2, name: "しょぼダブル", shots: [
            { func: curve(0.6, 1.05, 6.48), delay: 0 },
            { func: curve(-0.6, 1.05, 6.48), delay: 0 }
        ]
    },
    {// 63
        p: 2, cost: 4, name: "サイドアタック", shots: [
            { func: dFunc(0, 20, 3, 0, [240, -150]), delay: 250 },
            { func: dFunc(0, 20, 3, 0, [115, -150]), delay: 250 },
            { func: dFunc(0, 20, 3, 0, [-115, -150]), delay: 250 },
            { func: dFunc(0, 20, 3, 0, [-240, -150]), delay: 250 }
        ]
    },
    {// 64
        p: 0, cost: 1, x: true, name: "てんびんショット", shots: [
            {
                func: X({
                    1: dFunc(0, 10.91, 1.5),
                    2: dFunc(0, 10.91, 6),
                    3: dFunc(0, 12.7, 13),
                    4: dFunc(0, 13, 20),
                    5: dFunc(0, 13, 26),
                    6: dFunc(0, 13, 26),
                    7: dFunc(0, 13, 20),
                    8: dFunc(0, 12.7, 13),
                    9: dFunc(0, 10.91, 6),
                    10: dFunc(0, 10.91, 1.5),
                }),
                delay: 0
            }
        ]
    },
    {// 65
        p: 0, cost: 2, name: "しょぼツイン", shots: [
            { func: dFunc(2.15, 6.48, 3, 0, [1.2, -4]), delay: 0 },
            { func: dFunc(-2.15, 6.48, 3, 0, [-1.2, -4]), delay: 0 }
        ]
    },
    {// 66
        p: 2, cost: 6, name: "スローファイブ", shots: [
            { func: dFunc(1.42, 2.181, 1.5, 0, [0.3375, 0]), delay: 0, drill: true },
            { func: dFunc(0.83, 2.492, 1.5, 0, [0.405, 0]), delay: 0, drill: true },
            { func: dFunc(0, 2.7, 2.5, 0, [0, -0.0675]), delay: 0, drill: true },
            { func: dFunc(-0.83, 2.492, 1.5, 0, [-0.405, 0]), delay: 0, drill: true },
            { func: dFunc(-1.42, 2.181, 1.5, 0, [-0.3375, 0]), delay: 0, drill: true },
        ]
    },
    {// 67
        p: 2, cost: 4, name: "ヘヴィカーブ", shots: [
            { func: curve(1.05, 0.95, 14, 10), delay: 0 }
        ]
    },
    {// 68
        p: 2, cost: 5, name: "ゲジゲジ", shots: [
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
        ]
    },
    {// 69
        p: 0, cost: 2, name: "スイム", shots: [
            { func: swim(0.15, 0.5, 9.3, 3, 0.0084), delay: 0 }
        ]
    },
    {// 70
        p: 0, cost: 2, name: "たきのぼり", shots: [
            { func: takino(0, 0.21, 3, 40, 0, 3, 1, [0, 0]) }
        ]
    },
    {// 71
        p: 2, cost: 5, name: "ソナー", shots: [
            { func: dFunc(0, 18, 1.5, 0, [0, -20]), delay: 0 },
            { func: dFuncif(9, 9, 0, 18, 30, 0, 1.5, [0, -20]), delay: 0 },
            { func: dFuncif(-9, 9, 0, 18, 30, 0, 1.5, [0, -20]), delay: 0 },
            { func: dKaiten((-(1 / 2) * Math.PI), 0.1, 7.2, 0, 20, 0, 1.5, 1, 1, [0, 130]), delay: 0 },
            { func: dFuncif(0, 0, 0, 18, 30, 0, 1.5, [0, -20]), delay: 0 }
        ]
    },
    {// 72
        p: 2, cost: 6, name: "unアルティメットソナー", shots: [
            { func: dFunc(0, 20, 3, 0, [0, -20]), delay: 0 },
            { func: dFuncif(10, 10, 0, 20, 30, 0, 3, [0, -20]), delay: 0 },
            { func: dFuncif(-10, 10, 0, 20, 30, 0, 3, [0, -20]), delay: 0 },
            { func: dKaiten(((1 / 2) * Math.PI), 0.1, 8, 0, 60, 0, 1.5, 1, 1, [0, 140]), delay: 0 },
            { func: dFuncif(0, 0, 0, 20, 30, 0, 3, [0, -20]), delay: 0 }
        ]
    },
    {// 73
        p: 2, cost: 4, name: "ファストスイム", shots: [
            { func: fastswim(0.3, 0.55, 17, 3, 0.0003) }
        ]
    },
    {// 74
        p: 2, cost: 4, name: "トビウオ", shots: [
            { func: ago(2.5, 0.87, 20, 3) }
        ]
    },
    {// 75
        p: 2, cost: 6, name: "ぎょらい", shots: [
            { func: kasoku(0, 1.3, 6.5, 0, [113, -100]), delay: 400 },
            { func: kasoku(0, 1.3, 6.5, 0, [-113, -100]), delay: 400 }
        ]
    },
    {// 76
        p: 2, cost: 7, name: "スーパーぎょらい", shots: [
            { func: kasoku(0, 1.3, 6.5, 0, [113, -100]), delay: 400 },
            { func: kasoku(0, 1.3, 6.5, 0, [-113, -100]), delay: 400 },
            { func: kasoku(0, 1.3, 6.5, 0, [280, -100]), delay: 400 },
            { func: kasoku(0, 1.3, 6.5, 0, [-280, -100]), delay: 400 }
        ]
    },
    {// 77
        p: 0, cost: 3, name: "プチデルタ", shots: [
            { func: dKaiten((-(2 / 3) * Math.PI), 0.018, 3.3, 0, 25, 0, 1.5, -1, 1, [0, 40]), delay: 0 },
            { func: dKaiten(((2 / 3) * Math.PI), 0.018, 3.3, 0, 25, 0, 1.5, -1, 1, [0, 40]), delay: 0 },
            { func: dKaiten((0 * Math.PI), 0.018, 3.3, 0, 25, 0, 1.5, -1, 1, [0, 40]), delay: 0 }
        ]
    },
    {// 78
        p: 2, cost: 6, name: "デルタ", shots: [
            { func: dKaiten(((1 / 3) * Math.PI), 0.03, 2.5, 0, 50, 0.5, 1.5, -1, 1, [0, 0]), delay: 0, drill: true },
            { func: dKaiten((- (1 / 3) * Math.PI), 0.03, 2.5, 0, 50, 0.5, 1.5, -1, 1, [0, 0]), delay: 0, drill: true },
            { func: dKaiten((- 1 * Math.PI), 0.03, 2.5, 0, 50, 0.5, 1.5, -1, 1, [0, 0]), delay: 0, drill: true },
            { func: dKaiten((- (2 / 3) * Math.PI), 0.03, 2.5, 0, 25, 0.25, 1.5, -1, 1, [0, 0]), delay: 0, drill: true },
            { func: dKaiten(((2 / 3) * Math.PI), 0.03, 2.5, 0, 25, 0.25, 1.5, -1, 1, [0, 0]), delay: 0, drill: true },
            { func: dKaiten((0 * Math.PI), 0.03, 2.5, 0, 25, 0.25, 1.5, -1, 1, [0, 0]), delay: 0, drill: true }
        ]
    },
    {// 79
        p: 2, cost: 4, name: "スクエア", shots: [
            { func: dKaiten((0 * Math.PI), 0.03, 2.5, 0, 50, 0.5, 1.5, -1, 1, [0, 0]), delay: 0, drill: true },
            { func: dKaiten((-0.5 * Math.PI), 0.03, 2.5, 0, 50, 0.5, 1.5, -1, 1, [0, 0]), delay: 0, drill: true },
            { func: dKaiten((-1 * Math.PI), 0.03, 2.5, 0, 50, 0.5, 1.5, -1, 1, [0, 0]), delay: 0, drill: true },
            { func: dKaiten((0.5 * Math.PI), 0.03, 2.5, 0, 50, 0.5, 1.5, -1, 1, [0, 0]), delay: 0, drill: true },
        ]
    },
    {// 80
        p: 2, cost: 5, name: "デルタツイン", shots: [
            { func: dKaiten((-(1 / 3) * Math.PI), -0.03, 4, 0, 50, 0, 1.5, -1, 1, [50, 40]), delay: 0, drill: true },
            { func: dKaiten(((1 / 3) * Math.PI), -0.03, 4, 0, 50, 0, 1.5, -1, 1, [50, 40]), delay: 0, drill: true },
            { func: dKaiten((1 * Math.PI), -0.03, 4, 0, 50, 0, 1.5, -1, 1, [50, 40]), delay: 0, drill: true },
            { func: dKaiten((-(2 / 3) * Math.PI), 0.03, 4, 0, 50, 0, 1.5, -1, 1, [-50, 40]), delay: 0, drill: true },
            { func: dKaiten(((2 / 3) * Math.PI), 0.03, 4, 0, 50, 0, 1.5, -1, 1, [-50, 40]), delay: 0, drill: true },
            { func: dKaiten((0 * Math.PI), 0.03, 4, 0, 50, 0, 1.5, -1, 1, [-50, 40]), delay: 0, drill: true }
        ]
    },
    {// 81
        p: 2, cost: 9, name: "ヘキサ", shots: [
            { func: dKaiten(((2 / 3) * Math.PI), 0.07, 2.5, 0, 30, 0.3, 1.5, -1, 1, [0, 0]), delay: 0, drill: true },
            { func: dKaiten(((1 / 3) * Math.PI), 0.07, 2.5, 0, 30, 0.3, 1.5, -1, 1, [0, 0]), delay: 0, drill: true },
            { func: dKaiten((0 * Math.PI), 0.07, 2.5, 0, 30, 0.3, 1.5, -1, 1, [0, 0]), delay: 0, drill: true },
            { func: dKaiten((-(1 / 3) * Math.PI), 0.07, 2.5, 0, 30, 0.3, 1.5, -1, 1, [0, 0]), delay: 0, drill: true },
            { func: dKaiten((- (2 / 3) * Math.PI), 0.07, 2.5, 0, 30, 0.3, 1.5, -1, 1, [0, 0]), delay: 0, drill: true },
            { func: dKaiten((- 1 * Math.PI), 0.07, 2.5, 0, 30, 0.3, 1.5, -1, 1, [0, 0]), delay: 0, drill: true },

            { func: dKaiten(((3 / 6) * Math.PI), 0.07, 2.5, 0, 50, 0.5, 1.5, -1, 1, [0, 0]), delay: 0, drill: true },
            { func: dKaiten(((1 / 6) * Math.PI), 0.07, 2.5, 0, 50, 0.5, 1.5, -1, 1, [0, 0]), delay: 0, drill: true },
            { func: dKaiten((-(1 / 6) * Math.PI), 0.07, 2.5, 0, 50, 0.5, 1.5, -1, 1, [0, 0]), delay: 0, drill: true },
            { func: dKaiten((-(3 / 6) * Math.PI), 0.07, 2.5, 0, 50, 0.5, 1.5, -1, 1, [0, 0]), delay: 0, drill: true },
            { func: dKaiten((- (5 / 6) * Math.PI), 0.07, 2.5, 0, 50, 0.5, 1.5, -1, 1, [0, 0]), delay: 0, drill: true },
            { func: dKaiten((- (7 / 6) * Math.PI), 0.07, 2.5, 0, 50, 0.5, 1.5, -1, 1, [0, 0]), delay: 0, drill: true },
        ]
    },
    {// 82
        p: 2, cost: 8, name: "クロック", shots: [
            { func: dFuncif(14 * (Math.cos(0 * Math.PI)), 14 * (Math.sin(0 * Math.PI)) + 8, 0, 10, 35, 0, 1.5, [0, 0]), delay: 300, drill: true },
            { func: dFuncif(14 * (Math.cos((1 / 6) * Math.PI)), 14 * (Math.sin((1 / 6) * Math.PI)) + 8, 0, 10, 35, 0, 1.5, [0, 0]), delay: 300, drill: true },
            { func: dFuncif(14 * (Math.cos((2 / 6) * Math.PI)), 14 * (Math.sin((2 / 6) * Math.PI)) + 8, 0, 10, 35, 0, 1.5, [0, 0]), delay: 300, drill: true },
            { func: dFuncif(14 * (Math.cos((3 / 6) * Math.PI)), 14 * (Math.sin((3 / 6) * Math.PI)) + 8, 0, 10, 35, 0, 1.5, [0, 0]), delay: 300, drill: true },
            { func: dFuncif(14 * (Math.cos((4 / 6) * Math.PI)), 14 * (Math.sin((4 / 6) * Math.PI)) + 8, 0, 10, 35, 0, 1.5, [0, 0]), delay: 300, drill: true },
            { func: dFuncif(14 * (Math.cos((5 / 6) * Math.PI)), 14 * (Math.sin((5 / 6) * Math.PI)) + 8, 0, 10, 35, 0, 1.5, [0, 0]), delay: 300, drill: true },
            { func: dFuncif(14 * (Math.cos(1 * Math.PI)), 14 * (Math.sin(1 * Math.PI)) + 8, 0, 10, 35, 0, 1.5, [0, 0]), delay: 300, drill: true },
            { func: dFuncif(14 * (Math.cos(-(1 / 6) * Math.PI)), 14 * (Math.sin(-(1 / 6) * Math.PI)) + 8, 0, 10, 35, 0, 1.5, [0, 0]), delay: 300, drill: true },
            { func: dFuncif(14 * (Math.cos(-(2 / 6) * Math.PI)), 14 * (Math.sin(-(2 / 6) * Math.PI)) + 8, 0, 10, 35, 0, 1.5, [0, 0]), delay: 300, drill: true },
            { func: dFuncif(14 * (Math.cos(-(3 / 6) * Math.PI)), 14 * (Math.sin(-(3 / 6) * Math.PI)) + 8, 0, 10, 35, 0, 1.5, [0, 0]), delay: 300, drill: true },
            { func: dFuncif(14 * (Math.cos(-(4 / 6) * Math.PI)), 14 * (Math.sin(-(4 / 6) * Math.PI)) + 8, 0, 10, 35, 0, 1.5, [0, 0]), delay: 300, drill: true },
            { func: dFuncif(14 * (Math.cos(-(5 / 6) * Math.PI)), 14 * (Math.sin(-(5 / 6) * Math.PI)) + 8, 0, 10, 35, 0, 1.5, [0, 0]), delay: 300, drill: true },
            { func: dFuncif(0, 8, 0, 10, 35, 0, 1.5, [0, 0]), delay: 300, drill: true }, //真ん中
            { func: dKaitenFuncif(4.8, ((1 / 90) * Math.PI), ((4.5 / 6) * Math.PI), ((1 / 90) * Math.PI), 0, 3.2, 0, 4, 35, 0, 1.5, [0, 0]), delay: 300, drill: true }, //分針
            { func: dKaitenFuncif(2.4, ((1 / 90) * Math.PI), ((4.5 / 6) * Math.PI), ((1 / 90) * Math.PI), 0, 3.2, 0, 4, 35, 0, 1.5, [0, 0]), delay: 300, drill: true }, //分針
            { func: dKaitenFuncif(2.2, 0, ((118 / 432) * Math.PI), ((1 / 540) * Math.PI), 0, 3.2, 0, 4, 35, 0, 1.5, [0, 0]), delay: 300, drill: true }, //短針
        ]
    },
    {// 83
        p: 2, cost: 6, name: "スプリットマジック", shots: [
            { func: sprit(0, 17.7, 3, 1), delay: 0 },
            { func: sprit(0, 17.7, 3, -1), delay: 0 }
        ]
    },
    {// 84
        p: 2, cost: 8, name: "よいどれラッシュ", shots: rush(80 / 71)
    },
    {// 85
        p: 3, cost: 8, name: "ドリルラッシュ", shots: rush(1, true)
    },
    {// 86
        p: 0, cost: 2, name: "よいどれショット", shots: [
            { func: yoidore(), delay: 0 }
        ]
    },
    {// 87
        p: 2, cost: 8, name: "ダブルムーン", shots: [
            { func: curve(5.8, 0.25, 21.2, 3, [0, -40]), delay: 100 },
            { func: curve(-5.8, 0.25, 21.2, 3, [0, -40]), delay: 100 }
        ]
    },
    {// 88
        p: 3, cost: 9, name: "スーパークロス", shots: [
            { func: dFunc(13.3, 30, 3, 0, [-140, -200]), drill: true },
            { func: dFunc(-13.3, 30, 3, 0, [140, -200]), drill: true },
            { func: dFunc(13.3, 30, 3, 0, [-300, -200]), drill: true },
            { func: dFunc(-13.3, 30, 3, 0, [300, -200]), drill: true }
        ]
    },
    {// 89
        p: 0, cost: 3, name: "はばたき", shots: [
            { func: lcurve(2.5, 0.09, 18.5, 3, [7, -5], 3) },
            { func: lcurve(0.6, 0.2, 19, 3, [-2, 1], 9) }
        ]
    },
    {// 90
        p: 2, cost: 6, name: "ビッグウィング", shots: [
            { func: lcurve(14, 0.01, 4, 3, [0, -60], -26, 2.7), delay: 100 },
            { func: lcurve(11, 0.021, 9.8, 3, [6, -45], -13.6, 1.7), delay: 100 },
            { func: lcurve(4.6, 0.06, 16, 3, [5, -20], -4.5), delay: 100 },
            { func: lcurve(2.4, 0.07, 18, 3, [7, -5], 1), delay: 100 },
            { func: lcurve(0.3, 0.0001, 18.5, 3, [0, 1], 6.3), delay: 100 },
            { func: lcurve(0.3, 0.00001, 14, 3, [-3, 1], 24, 1.3), delay: 100 }
        ]
    },
    {// 91
        p: 2, cost: 8, name: "ダブルウィング", shots: [
            { func: lcurve(14, 0.01, 4, 3, [0, -60], -26, 2.7), delay: 200 },
            { func: lcurve(11, 0.021, 9.8, 3, [6, -45], -13.6, 1.7), delay: 200 },
            { func: lcurve(4.6, 0.06, 16, 3, [5, -20], -4.5), delay: 200 },
            { func: lcurve(2.4, 0.07, 18, 3, [7, -5], 1), delay: 200 },
            { func: lcurve(0.3, 0.0001, 18.5, 3, [0, 1], 6.3), delay: 200 },
            { func: lcurve(0.3, 0.00001, 14, 3, [-3, 1], 24, 1.3), delay: 200 },
            { func: rlcurve(14, 0.01, 4, 3, [0, -60], -26, 2.7), delay: 1100 },
            { func: rlcurve(11, 0.021, 9.8, 3, [6, -45], -13.6, 1.7), delay: 1100 },
            { func: rlcurve(4.6, 0.06, 16, 3, [5, -20], -4.5), delay: 1100 },
            { func: rlcurve(2.4, 0.07, 18, 3, [7, -5], 1), delay: 1100 },
            { func: rlcurve(0.3, 0.0001, 18.5, 3, [0, 1], 6.3), delay: 1100 },
            { func: rlcurve(0.3, 0.00001, 14, 3, [-3, 1], 24, 1.3), delay: 1100 }
        ]
    },
    {// 92
        p: 0, cost: 3, name: "ブーメラン", shots: [
            { func: daen2(420, 50, 0.012, 3, 380) }
        ]
    },
    {// 93
        p: 0, cost: 3, name: "スローブーメラン", shots: [
            { func: daen2(420, 110, 0.01, 3, 380) }
        ]
    },
    {// 94
        p: 2, cost: 4, name: "オオガマ", shots: [
            { func: daen2(390, 380, 0.014, 3, 360), delay: 50 }
        ]
    },
    {// 95
        p: 2, cost: 6, name: "ハサミショット", shots: [
            { func: dFunc(-4, 18.9, 1.5, 0, [0, -10]), delay: 0, drill: true },
            { func: dFunc(-7.27, 17.87, 1.5, 0, [0, -10]), delay: 0, drill: true },
            { func: dFunc(4, 18.9, 1.5, 0, [0, -10]), delay: 0, drill: true },
            { func: dFunc(7.27, 17.87, 1.5, 0, [0, -10]), delay: 0, drill: true }
        ]
    },
    {// 96
        p: 2, cost: 8, name: "ハサミアタック", shots: [
            { func: dFunc(-6, 28.35, 1.5, 0, [0, -10]), delay: 100, drill: true },
            { func: dFunc(-11.1, 26.76, 1.5, 0, [0, -10]), delay: 100, drill: true },
            { func: dFunc(-15.81, 24.285, 1.5, 0, [0, -10]), delay: 100, drill: true },
            { func: dFunc(6, 28.35, 1.5, 0, [0, -10]), delay: 100, drill: true },
            { func: dFunc(11.1, 26.76, 1.5, 0, [0, -10]), delay: 100, drill: true },
            { func: dFunc(15.81, 24.285, 1.5, 0, [0, -10]), delay: 100, drill: true }
        ]
    },
    {// 97
        p: 2, cost: 10, name: "ジャグリング", shots: [
            { func: daen2(420, 120, 0.014, 3, 380) },
            { func: daen2(420, 200, 0.017, 3, 380) },
            { func: daen2(420, 280, 0.02, 3, 380) },
            { func: daen2(420, -120, 0.014, 3, 380) },
            { func: daen2(420, -200, 0.017, 3, 380) },
            { func: daen2(420, -280, 0.02, 3, 380) }
        ]
    },
    {// 98
        p: 0, cost: 1, name: "スーパースロー", shots: [
            { func: dFunc(0, 2, 3), delay: 0 }
        ]
    },
    {// 99
        p: 2, cost: 3, name: "にれんぱつ", shots: [
            { func: dFunc(0, 19.55, 3), delay: 0 },
            { func: dFunc(0, 19.55, 3), delay: 160, }
        ]
    },
    {// 100
        p: 2, cost: 8, name: "カカシだんまく", shots: danmaku(5, true, true)
    },
    {// 101
        p: 0, cost: 2, name: "ジャブ", shots: [
            { func: kasoku(-0.015, 0.295, 5, 0, [65, -70]) }
        ]
    },
    {// 102
        p: 2, cost: 4, name: "ストレート", shots: [
            { func: kasoku2(0.00235, 0.95, 5, 0, [-100, -150]), delay: 50 }
        ]
    },
    {// 103
        p: 2, cost: 4, name: "フットワーク", shots: [
            { func: huurie() }
        ]
    },
    {// 104
        p: 2, cost: 5, name: "フック", shots: [
            { func: kasoku4(14, -0.000168, 0.95, 5, 0, [40, -170]), delay: 110 }
        ]
    },
    {// 105
        p: 2, cost: 7, name: "カミソリアッパー", shots: [
            { func: kasoku3(0.15, 0.015, 18, 0, [-150, -70]), delay: 500, drill: true }
        ]
    },
    {// 106
        p: 3, cost: 8, name: "デンプシーロール", shots: [
            { func: kasoku5(21, -0.0125, 0.84, 5, 0, [0, -50]), delay: 250 },
            { func: kasoku5(21, -0.0125, 0.84, 5, 0, [0, -50]), delay: 600 },
            { func: kasoku5(21, -0.0125, 0.84, 5, 0, [0, -50]), delay: 1050 },
            { func: kasoku5(-21, 0.0125, 0.84, 5, 0, [0, -50]), delay: 475 },
            { func: kasoku5(-21, 0.0125, 0.84, 5, 0, [0, -50]), delay: 825 },
            { func: kasoku5(-21, 0.0125, 0.84, 5, 0, [0, -50]), delay: 1275 }
        ]
    },
    {// 107
        p: 2, cost: 5, name: "water fall", shots: [
            { func: curve(0.3, 2, 8.5, 3, [-4200 / 7, -60]), delay: 0 },
            { func: curve(0.3, 2, 8.5, 3, [-3000 / 7, -60]), delay: 0 },
            { func: curve(0.3, 2, 8.5, 3, [-1800 / 7, -60]), delay: 0 },
            { func: curve(0.3, 2, 8.5, 3, [-600 / 7, -60]), delay: 0 },
            { func: curve(0.3, 2, 8.5, 3, [600 / 7, -60]), delay: 0 },
            { func: curve(0.3, 2, 8.5, 3, [1800 / 7, -60]), delay: 0 },
            { func: curve(0.3, 2, 8.5, 3, [3000 / 7, -60]), delay: 0 },
            { func: curve(0.3, 2, 8.5, 3, [4200 / 7, -60]), delay: 0 },
            { func: curve(-0.3, 2, 8.5, 3, [-4800 / 7, -140]), delay: 0 },
            { func: curve(-0.3, 2, 8.5, 3, [-3600 / 7, -140]), delay: 0 },
            { func: curve(-0.3, 2, 8.5, 3, [-2400 / 7, -140]), delay: 0 },
            { func: curve(-0.3, 2, 8.5, 3, [-1200 / 7, -140]), delay: 0 },
            { func: curve(-0.3, 2, 8.5, 3, [0 / 7, -140]), delay: 0 },
            { func: curve(-0.3, 2, 8.5, 3, [1200 / 7, -140]), delay: 0 },
            { func: curve(-0.3, 2, 8.5, 3, [2400 / 7, -140]), delay: 0 },
            { func: curve(-0.3, 2, 8.5, 3, [3600 / 7, -140]), delay: 0 },
            { func: curve(-0.3, 2, 8.5, 3, [4800 / 7, -140]), delay: 0 },
            { func: curve(0.3, 2, 8.5, 3, [-4200 / 7, -220]), delay: 0 },
            { func: curve(0.3, 2, 8.5, 3, [-3000 / 7, -220]), delay: 0 },
            { func: curve(0.3, 2, 8.5, 3, [-1800 / 7, -220]), delay: 0 },
            { func: curve(0.3, 2, 8.5, 3, [-600 / 7, -220]), delay: 0 },
            { func: curve(0.3, 2, 8.5, 3, [600 / 7, -220]), delay: 0 },
            { func: curve(0.3, 2, 8.5, 3, [1800 / 7, -220]), delay: 0 },
            { func: curve(0.3, 2, 8.5, 3, [3000 / 7, -220]), delay: 0 },
            { func: curve(0.3, 2, 8.5, 3, [4200 / 7, -220]), delay: 0 },
            { func: curve(-0.3, 2, 8.5, 3, [-4800 / 7, -300]), delay: 0 },
            { func: curve(-0.3, 2, 8.5, 3, [-3600 / 7, -300]), delay: 0 },
            { func: curve(-0.3, 2, 8.5, 3, [-2400 / 7, -300]), delay: 0 },
            { func: curve(-0.3, 2, 8.5, 3, [-1200 / 7, -300]), delay: 0 },
            { func: curve(-0.3, 2, 8.5, 3, [0 / 7, -300]), delay: 0 },
            { func: curve(-0.3, 2, 8.5, 3, [1200 / 7, -300]), delay: 0 },
            { func: curve(-0.3, 2, 8.5, 3, [2400 / 7, -300]), delay: 0 },
            { func: curve(-0.3, 2, 8.5, 3, [3600 / 7, -300]), delay: 0 },
            { func: curve(-0.3, 2, 8.5, 3, [4800 / 7, -300]), delay: 0 },
        ]
    },
    {// 108
        p: 0, cost: 2, name: "ツボショット", shots: [
            { func: tubo() },
            { func: tubo(-1, 4, 3, [-450, -20]) }
        ]
    },
    {// 109
        p: 0, cost: 3, name: "なげナイフ", shots: [
            { func: dFunc(0, 20, 1.5, 0, [-52, -50]), delay: 0 },
            { func: dFunc(0, 20, 1.5, 0, [52, -50]), delay: 250, drill: true }
        ]
    },
    {// 110
        p: 0, cost: 3, name: "イナズマぎり", shots: [
            { func: inazuma() }
        ]
    },
    {// 111
        p: 2, cost: 6, name: "ハルパー", shots: [
            { func: dKaitenFuncif(18.7, (0.003) * Math.PI, (3 / 10) * Math.PI, (0.0575 / 10) * Math.PI, 0, 0, 0, 4.5, 12, 0, 1.5, [0, -50]) },
            { func: dKaitenFuncif(18.7, (0.003) * Math.PI, (1 / 10) * Math.PI, (0.0575 / 10) * Math.PI, 0, 0, 0, 4.5, 12, 0, 1.5, [0, -50]) },
            { func: dKaitenFuncif(18.7, (0.003) * Math.PI, (-1 / 10) * Math.PI, (0.0575 / 10) * Math.PI, 0, 0, 0, 4.5, 12, 0, 1.5, [0, -50]) },
            { func: dKaitenFuncif(18.7, (0.003) * Math.PI, (-3 / 10) * Math.PI, (0.0575 / 10) * Math.PI, 0, 0, 0, 4.5, 12, 0, 1.5, [0, -50]) },
            { func: dKaitenFuncif(18.7, (0.003) * Math.PI, (-5 / 10) * Math.PI, (0.0575 / 10) * Math.PI, 0, 0, 0, 4.5, 12, 0, 1.5, [0, -50]) },
            { func: dKaitenFuncif(18.7, (0.003) * Math.PI, (-7 / 10) * Math.PI, (0.0575 / 10) * Math.PI, 0, 0, 0, 4.5, 12, 0, 1.5, [0, -50]) },
            { func: dKaitenFuncif(18.7, (0.003) * Math.PI, (-9 / 10) * Math.PI, (0.0575 / 10) * Math.PI, 0, 0, 0, 4.5, 12, 0, 1.5, [0, -50]) },
            { func: dKaitenFuncif(18.7, (0.003) * Math.PI, (9 / 10) * Math.PI, (0.0575 / 10) * Math.PI, 0, 0, 0, 4.5, 12, 0, 3, [0, -50]), delay: 0, drill: true }
        ]
    },
    {// 112
        p: 2, cost: 4, name: "エックスぎり", shots: [
            { func: xgiri1(), delay: 160, drill: true },
            { func: xgiri2(), delay: 160, drill: true }
        ]
    },
    {// 113
        p: 2, cost: 8, name: "つるぎのまい", shots: [
            { func: turumai2(), delay: 70 },
            { func: turumai1(), delay: 220 },
            { func: turumai4(), delay: 370 },
            { func: turumai3(), delay: 420 },
            { func: turumai6(), delay: 570 },
            { func: turumai5(), delay: 620 }
        ]
    },
    {// 114
        p: 3, cost: 9, name: "ツバメがえし", shots: [
            { func: daen2(420, 0, 0.044, 3, 380) }
        ]
    },
    {// 115
        p: 2, cost: 1, x: true, name: "ハテナショット", shots: [
            {
                func: X({
                    1: dFunc(0, 10, 1.5),
                    2: dFunc(0, 10, 6),
                    3: dFunc(0, 10, 12),
                    4: dFunc(0, 10, 18),
                    5: dFunc(0, 10, 24),
                    6: dFunc(0, 10, 24),
                    7: dFunc(0, 10, 18),
                    8: dFunc(0, 10, 12),
                    9: dFunc(0, 10, 6),
                    10: dFunc(0, 10, 1.5),
                }),
                delay: 0
            }
        ]
    },
    {// 116
        p: 2, cost: 5, name: "サイドドリル", shots: [
            { func: dFunc(0, 25, 3, 0, [240, -50]), delay: 250 },
            { func: dFunc(0, 25, 3, 0, [120, -50]), delay: 250 },
            { func: dFunc(0, 25, 3, 0, [-120, -50]), delay: 250 },
            { func: dFunc(0, 25, 3, 0, [-240, -50]), delay: 250 }
        ]
    },
    {// 117 
        p: 2, cost: 4, name: "ファストよいどれ", shots: [
            { func: yoidore(2), delay: 0 }
        ]
    },
    {// 118
        p: 3, cost: 2, name: "だましスイッチ", shots: [
            { func: switchdamashi(), delay: 0 }
        ]
    },
    {// 119 
        p: 3, cost: 1, x: true, name: "へんそくショット", shots: [
            {
                func: X({
                    1: dFunc(0, 9, 3),
                    2: dFunc(0, 13, 3),
                    3: dFunc(0, 19, 3),
                    4: dFunc(0, 25, 3),
                    5: dFunc(0, 35, 3),
                    6: dFunc(0, 55, 3),
                    7: dFunc(0, 65, 3),
                    8: dFunc(0, 75, 3),
                    9: dFunc(0, 85, 3),
                    10: dFunc(0, 95, 3),
                }),
                delay: 0
            }
        ]
    },
    {// 120
        p: 0, cost: 2, name: "ドリルよいどれ", shots: [
            { func: yoidore(15 / 17.5), delay: 0, drill: true }
        ]
    },
    {// 121
        p: 0, cost: 3, name: "ふいうちショット", shots: [
            { func: fuiuchi(), drill: true }
        ]
    },
    {// 122
        p: 2, cost: 3, name: "ドリルブーメラン", shots: [
            { func: daen2(420, -20, 0.012, 3, 380), drill: true }
        ]
    },
    {// 123
        p: 0, cost: 2, name: "カカシショット", shots: [
            { func: kakashi1(), drill: true },
            { func: kakashi2(), obake: true },
            { func: kakashi3() }
        ]
    },
    {// 124
        p: 0, cost: 2, name: "オバケショット", shots: [
            { func: dFunc(0, 15, 3), obake: true }
        ]
    },
    {// 125
        p: 2, cost: 3, name: "オバケカーブ", shots: [
            { func: curve(-0.98, 0.93, 12.86, 3), obake: true }
        ]
    },
    {// 126
        p: 1, cost: 2, name: "スローオバケ", shots: [
            { func: dFunc(0, 2.7, 3), obake: true }
        ]
    },
    {// 127
        p: 2, cost: 8, name: "オバケファイブ", shots: [
            { func: dFunc(13.67 * 23.52 / 26, 21 * 23.52 / 26, 3, 0, [2.5 * 23.52 / 20, 0]), delay: 400, obake: true },
            { func: dFunc(8 * 23.52 / 26, 24 * 23.52 / 26, 3, 0, [3 * 23.52 / 20, 0]), delay: 400, obake: true },
            { func: dFunc(0, 23.52, 5, 0, [0, -0.5 * 23.52 / 20]), delay: 400, obake: true },
            { func: dFunc(-8 * 23.52 / 26, 24 * 23.52 / 26, 3, 0, [-3 * 23.52 / 20, 0]), delay: 400, obake: true },
            { func: dFunc(-13.67 * 23.52 / 26, 21 * 23.52 / 26, 3, 0, [-2.5 * 23.52 / 20, 0]), delay: 400, obake: true },
        ]
    },
    {// 128
        p: 2, cost: 8, name: "オバケスプレッド", shots: name_spread(27, 14, 400)
    },
    {// 129
        p: 0, cost: 2, name: "オバケヘヴィ", shots: [
            { func: dFunc(0, 6.7, 9.3, 0, [0, -10]), obake: true }
        ]
    },
    {// 130
        p: 2, cost: 6, name: "オバケスター", shots: [
            { func: dFunc(4.75 * 1.2, 19.5 * 1.2, 3, 0, [1.25 * 1.2, -8.75 * 1.2]), obake: true },
            { func: dFunc(0, 20 * 1.2, 5, 0, [0, -8.75 * 1.2]), obake: true },
            { func: dFunc(-4.75 * 1.2, 19.5 * 1.2, 3, 0, [-1.25 * 1.2, -8.75 * 1.2]), obake: true }
        ]
    },
    {// 131
        p: 2, cost: 6, name: "スーパーオバケ", shots: [
            { func: dFunc(0, 12.14, 26, 0, [0, -20]), obake: true }
        ]
    },
    {// 132
        p: 0, cost: 2, name: "オバケよいどれ", shots: [
            { func: yoidore(15 / 17.5), delay: 0, obake: true }
        ]
    },
    {// 133
        p: 0, cost: 2, name: "オバケドリル", shots: [
            { func: dFunc(0, 14, 3), drill: true, obake: true }
        ]
    },
    {// 134
        p: 0, cost: 3, name: "オバケツイン", shots: [
            { func: dFunc(3.8, 15, 3, 0, [0.96, -6.73]), obake: true },
            { func: dFunc(-3.8, 15, 3, 0, [-0.96, -6.73]), obake: true }
        ]
    },
    {// 135
        p: 2, cost: 6, name: "ドリルスター", shots: [
            { func: dFunc(4.75 * 1.2, 19.5 * 1.2, 3, 0, [1.25 * 1.2, -8.75 * 1.2]), drill: true, obake: true },
            { func: dFunc(0, 20 * 1.2, 5, 0, [0, -8.75 * 1.2]), drill: true, obake: true },
            { func: dFunc(-4.75 * 1.2, 19.5 * 1.2, 3, 0, [-1.25 * 1.2, -8.75 * 1.2]), drill: true, obake: true }
        ]
    },
    {// 136
        p: 2, cost: 4, name: "しんかショット", shots: [
            { func: shinka() }
        ]
    },
    {// 137
        p: 2, cost: 5, name: "カカシスター", shots: kakashistar(false, 13.5)
    },
    {// 138 
        p: 2, cost: 6, name: "ミックススター", shots: kakashistar(true, 22)
    },
    {// 139
        p: 2, cost: 4, name: "ミラーふうせん", shots: [
            { func: mirrorfusen() }
        ]
    },
    {// 140
        p: 2, cost: 4, name: "ツインふうせん", shots: [
            { func: fusen(2.5, 8.31491712707, 1.5, 10), delay: 0 },
            { func: fusen(-2.5, 8.31491712707, 1.5, 10), delay: 0, }
        ]
    },
    {// 141
        p: 2, cost: 2, name: "ロングエイム", shots: [
            { func: longaim(60) }
        ]
    },
    {// 142
        p: 0, cost: 2, name: "ショートエイム", shots: [
            { func: shortaim(60) }
        ]
    },
    {// 143
        p: 2, cost: 4, name: "ターンエイム", shots: [
            { func: turnaim(60) }
        ]
    },
    {// 144
        p: 2, cost: 3, name: "コーナーエイム", shots: [
            { func: corneraim1(60) },
            { func: corneraim2(60) }
        ]
    },
    {// 145
        p: 2, cost: 5, name: "トリプルエイム", shots: [
            { func: corneraim1(60) },
            { func: corneraim2(60) },
            { func: longaim(60) }
        ]
    },
    {// 146
        p: 2, cost: 10, name: "へんしん", shots: [
            {
                func: effect((s) => {
                    if (s.isme) {
                        s.parent.game.me.skill_select = [103, 135, 20]
                        load_skill(s.parent.game.me)
                        s.parent.game.gs.set(["skill_select", "cost"])
                    }
                })
            },
        ]
    },
    {// 147
        p: 2, cost: 3, name: "センターマジック", shots: [
            { func: center(0, 17.7, 3), delay: 0 }
        ]
    },
    {// 148
        p: 0, cost: 3, name: "ヘヴィモチ", shots: [
            { func: shinaru(9) }
        ]
    },
    {// 149
        p: 2, cost: 6, name: "ハイパースロー", shots: [
            { func: dFunc(0, 7.5, 29, 10), delay: 0, drill: true }
        ]
    },
    /*
    {// 
        p: 0, cost: 1, name: "しょぼショット", shots: [
            { func: dFunc(0, 6.5, 3), delay: 0 }
        ]
    },*/
]
export const chara_list: CharaDef[] = [
    {
        name: "ヒトデせいじん",
        desc: "バランスのとれた使いやすいやつ！",
        skill1: [0, 65],
        skill2: [1],
        skill3: [2, 3],
    },
    {
        name: "ウサギせいじん",
        desc: "こいつのショットはシンプルにはやい！",
        skill1: [4],
        skill2: [5, 6, 7],
        skill3: [8, 9, 10, 119],
    },
    {
        name: "タコせいじん",
        desc: "クネクネまがるショットをうつひねくれものだ！",
        skill1: [11, 12],
        skill2: [13, 14],
        skill3: [15, 16],
    },
    {
        name: "オバケせいじん",
        desc: "おそろしいオバケショットの使い手だ！",
        skill1: [124, 133],
        skill2: [125, 126],
        skill3: [127, 128],
    },
    {
        name: "モグラせいじん",
        desc: "Pボックスをつらぬくドリルをあやつる！",
        skill1: [17, 133],
        skill2: [18, 19, 66],
        skill3: [20, 21],
    },
    {
        name: "クジラせいじん",
        desc: "ショットがデカい! へヴィ級ファイター！",
        skill1: [22, 23],
        skill2: [24, 67],
        skill3: [25, 26],
    },
    {
        name: "カエルせいじん",
        desc: "突然ふくらむ風船みたいなやつだ！",
        skill1: [27],
        skill2: [28, 29, 30, 136, 139, 140],
        skill3: [31],
    },
    {
        name: "ナメクジせいじん",
        desc: "いやらしい戦法をとる！",
        skill1: [32, 33],
        skill2: [34, 68, 136],
        skill3: [35],
    },
    {
        name: "ヒツジせいじん",
        desc: "ふわふわしててもあたればちめいしょうだ！",
        skill1: [],
        skill2: [],
        skill3: [],
    },
    {
        name: "イカせいじん",
        desc: "きたない戦法をこのむイカれたやつだ！",
        skill1: [36, 37],
        skill2: [38, 39],
        skill3: [40, 41],
    },
    {
        name: "シシせいじん",
        desc: "ハイパーショットはすべてをふんさいする！",
        skill1: [42, 121],
        skill2: [43, 149],
        skill3: [44],
    },
    {
        name: "イテせいじん",
        desc: "ねらったエモノをクールにおいこむスペース狩人だ！",
        skill1: [142, 45],
        skill2: [141, 144, 145],
        skill3: [143],
    },
    {
        name: "ウオせいじん",
        desc: "むじゅうりょくの海をすいすいおよぐ！",
        skill1: [69, 70],
        skill2: [71, 72, 73, 74],
        skill3: [75, 76],
    },
    {
        name: "テンビンせいじん",
        desc: "宇宙の秩序をみだすものにさばきをくだす！",
        skill1: [64, 77],
        skill2: [78, 79, 80],
        skill3: [81, 82],
    },
    {
        name: "ピエロせいじん",
        desc: "鏡の法則をつかんだら一人前のピエロ星人だ！",
        skill1: [46],
        skill2: [47, 118, 147],
        skill3: [48, 83],
    },
    {
        name: "カピバラせいじん",
        desc: "おだやかな性格でともだちが多い！",
        skill1: [86, 120, 132],
        skill2: [117],
        skill3: [84, 85],
    },
    {
        name: "ムーンせいじん",
        desc: "ゆらゆらうごくミステリアスな存在だ！",
        skill1: [49, 50],
        skill2: [51, 52],
        skill3: [53, 54],
    },
    {
        name: "カニせいじん",
        desc: "怒るとあわをたくさんはいてくる！",
        skill1: [55, 56],
        skill2: [57, 58],
        skill3: [59, 60],
    },
    {
        name: "フタゴせいじん",
        desc: "1度に2発うってくるやっかいなフタゴだ！",
        skill1: [61, 62],
        skill2: [63, 116],
        skill3: [87, 88],
    },
    {
        name: "ファントムせいじん",
        desc: "顔ににあわずおくびょうな性格だ！",
        skill1: [129, 133, 134],
        skill2: [130],
        skill3: [131],
    },
    {
        name: "ニワトリせいじん",
        desc: "大切なタマゴをこわすものは絶対にゆるさない！",
        skill1: [89, 148],
        skill2: [90, 149],
        skill3: [91],
    },
    {
        name: "サソリせいじん",
        desc: "じまんのハサミでブーメランをキャッチ！",
        skill1: [92, 93],
        skill2: [94, 95, 122],
        skill3: [96, 97],
    },
    {
        name: "カカシせいじん",
        desc: "練習にきた宇宙人を返りうちにするのが生きがいだ！",
        skill1: [123, 0, 98],
        skill2: [99, 137, 138],
        skill3: [100],
    },
    {
        name: "オウシせいじん",
        desc: "あいさつがわりのジャブであいてをノックアウト！",
        skill1: [101],
        skill2: [102, 103, 104],
        skill3: [105, 106],
    },
    {
        name: "オトメせいじん",
        desc: "じぶんの手は汚さない宇宙のトップアイドルだ！",
        skill1: [],
        skill2: [],
        skill3: [],
    },
    {
        name: "ヤギせいじん",
        desc: "おだやかにみえるがすべてをぶっこわしたいとおもっている！",
        skill1: [],
        skill2: [],
        skill3: [146],
    },
    {
        name: "ミズガメせいじん",
        desc: "まかふしぎなパワーをたくわえている！",
        skill1: [108],
        skill2: [],
        skill3: [],
    },
    {
        name: "ペルセウスせいじん",
        desc: "あらゆる武器をつかいこなすウェポンマスターだ！",
        skill1: [110, 109],
        skill2: [111, 112],
        skill3: [113, 114],
    },
]

function yoidore(s = 1, dx1 = 3.4, dx2 = -4.6, dx3 = 8, dx4 = -6.9, dx5 = -2.8, dx6 = 6.6, dx7 = 2.5, dy1 = 18.8125, dy2 = 18.35, dy3 = 17.3, dy4 = 18.13, dy5 = 19.55, dy6 = 17.92, dy7 = 19.3, size = 3, add = 0, [x, y] = [0, 0]) {
    return syuki({
        0: dFunc(dx7 * s, dy7 * s, size, add, [x, y]),
        1: dFunc(dx1 * s, dy1 * s, size, add, [x, y]),
        2: dFunc(dx2 * s, dy2 * s, size, add, [x, y]),
        3: dFunc(dx3 * s, dy3 * s, size, add, [x, y]),
        4: dFunc(dx4 * s, dy4 * s, size, add, [x, y]),
        5: dFunc(dx5 * s, dy5 * s, size, add, [x, y]),
        6: dFunc(dx6 * s, dy6 * s, size, add, [x, y]),
    }, 7)
}

function switchdamashi() {
    return syuki({
        0: damashi(17.5, 0, 3, 1.5),
        1: damashi(17.5, 1, 3, 1.5),
    }, 2)
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
    }, 10)
}
function shinka(): MoveFunc {
    return function (t, extra) {
        switch (extra?.count || 0) {
            case 0:
                return dFunc(0, 8.55, 1.5).call(this, t)
            case 1:
                return curve(0.15, 1, 8.55, 1.5).call(this, t)
            case 2:
                return curve(0.3, 1, 8.55, 1.5).call(this, t)
            case 3:
                return fusen(0, 8.55, 1.5, 4).call(this, t)
            case 4:
                return fusen(0, 8.55, 1.5, 7).call(this, t)
            case 5:
                return fusen(0, 8.55, 1.5, 10).call(this, t)
            case 6:
                return fusen(0, 8.55, 1.5, 13).call(this, t)
            case 7:
                return fusen(0, 8.55, 1.5, 16).call(this, t)
            case 8:
                return fusen(0, 8.55, 1.5, 19).call(this, t)
            case 9:
                return fusen(0, 8.55, 1.5, 23).call(this, t)
            case 10:
                return fusen(0, 8.55, 1.5, 27).call(this, t)
            case 11:
                return fusen(0, 8.55, 1.5, 31).call(this, t)
            case 12:
                return fusen(0, 8.55, 1.5, 35).call(this, t)
            case 13:
                return fusen(0, 8.55, 1.5, 39).call(this, t)
            case 14:
                return fusen(0, 8.55, 1.5, 43).call(this, t)
            default:
                return fusen(0, 8.55, 1.5, 43).call(this, t)
        }
    }
}

function kakashi1() {
    return syuki({
        0: dFunc(0, 15.2, 3),
        1: () => [10000, 0, 0],
        2: () => [10000, 0, 0],
        3: () => [10000, 0, 0],
    }, 4)
}
function kakashi3() {
    return syuki({
        0: () => [10000, 0, 0],
        1: dFunc(0, 15.2, 3),
        2: curve(0.9, 1.05, 15.2, 3),
        3: () => [10000, 0, 0],
    }, 4)
}
function kakashi2() {
    return syuki({
        0: () => [10000, 0, 0],
        1: () => [10000, 0, 0],
        2: () => [10000, 0, 0],
        3: dFunc(0, 15.2, 3),
    }, 4)
}


function rush(s = 1,
    drill = false,
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
    size = 3,
    add = 0,
    [x, y] = [0, 0]) {
    const a: ShotDef[] = []; {
        a.push({
            func: syuki({
                1: dFunc(dx1 * s, dy1 * s, size, add, [x, y]),
                0: dFunc(-dx1 * s, dy1 * s, size, add, [x, y])
            }, 2)
            , delay: 100
            , drill
        });
        a.push({
            func: syuki({
                1: dFunc(dx2 * s, dy2 * s, size, add, [x, y]),
                0: dFunc(-dx2 * s, dy2 * s, size, add, [x, y])
            }, 2)
            , delay: 225
            , drill
        });
        a.push({
            func: syuki({
                1: dFunc(dx3 * s, dy3 * s, size, add, [x, y]),
                0: dFunc(-dx3 * s, dy3 * s, size, add, [x, y])
            }, 2)
            , delay: 350
            , drill
        });
        a.push({
            func: syuki({
                1: dFunc(dx4 * s, dy4 * s, size, add, [x, y]),
                0: dFunc(-dx4 * s, dy4 * s, size, add, [x, y])
            }, 2)
            , delay: 475
            , drill
        });
        a.push({
            func: syuki({
                1: dFunc(dx5 * s, dy5 * s, size, add, [x, y]),
                0: dFunc(-dx5 * s, dy5 * s, size, add, [x, y])
            }, 2)
            , delay: 600
            , drill
        });
        a.push({
            func: syuki({
                1: dFunc(dx6 * s, dy6 * s, size, add, [x, y]),
                0: dFunc(-dx6 * s, dy6 * s, size, add, [x, y])
            }, 2)
            , delay: 725
            , drill
        });
        a.push({
            func: syuki({
                1: dFunc(dx7 * s, dy7 * s, size, add, [x, y]),
                0: dFunc(-dx7 * s, dy7 * s, size, add, [x, y])
            }, 2)
            , delay: 850
            , drill
        });
        a.push({
            func: syuki({
                1: dFunc(dx1 * s, dy1 * s, size, add, [x, y]),
                0: dFunc(-dx1 * s, dy1 * s, size, add, [x, y])
            }, 2)
            , delay: 975
            , drill
        });


    }
    return a;
}

function danmaku(x = 6, drill = false, kakashi = false) {
    const a: ShotDef[] = [];
    if (kakashi) {
        for (let i = 0; i < x; i++) {
            a.push({ func: syuki({ 1: dFunc(-2, 5, 1), 2: del, 0: del }, 3), delay: i * 800 + 200 });
            a.push({ func: syuki({ 2: dFunc(-2, 5, 1), 0: del, 1: del }, 3), delay: i * 800 + 200, obake: true });
            a.push({ func: syuki({ 0: dFunc(-2, 5, 1), 1: del, 2: del }, 3), delay: i * 800 + 200, drill: true });
            a.push({ func: syuki({ 1: dFunc(-1.5, 5, 1), 2: del, 0: del }, 3), delay: i * 800 + 400 });
            a.push({ func: syuki({ 2: dFunc(-1.5, 5, 1), 0: del, 1: del }, 3), delay: i * 800 + 400, obake: true });
            a.push({ func: syuki({ 0: dFunc(-1.5, 5, 1), 1: del, 2: del }, 3), delay: i * 800 + 400, drill: true });
            a.push({ func: syuki({ 1: dFunc(-1, 5, 1), 2: del, 0: del }, 3), delay: i * 800 + 800 });
            a.push({ func: syuki({ 2: dFunc(-1, 5, 1), 0: del, 1: del }, 3), delay: i * 800 + 800, obake: true });
            a.push({ func: syuki({ 0: dFunc(-1, 5, 1), 1: del, 2: del }, 3), delay: i * 800 + 800, drill: true });
            a.push({ func: syuki({ 1: dFunc(0, 5, 1), 2: del, 0: del }, 3), delay: i * 800 + 400 });
            a.push({ func: syuki({ 2: dFunc(0, 5, 1), 0: del, 1: del }, 3), delay: i * 800 + 400, obake: true });
            a.push({ func: syuki({ 0: dFunc(0, 5, 1), 2: del, 1: del }, 3), delay: i * 800 + 400, drill: true });
            a.push({ func: syuki({ 1: dFunc(1, 5, 1), 2: del, 0: del }, 3), delay: i * 800 + 200 });
            a.push({ func: syuki({ 2: dFunc(1, 5, 1), 0: del, 1: del }, 3), delay: i * 800 + 200, obake: true });
            a.push({ func: syuki({ 0: dFunc(1, 5, 1), 1: del, 2: del }, 3), delay: i * 800 + 200, drill: true });
            a.push({ func: syuki({ 1: dFunc(1.5, 5, 1), 2: del, 0: del }, 3), delay: i * 800 + 400 });
            a.push({ func: syuki({ 2: dFunc(1.5, 5, 1), 0: del, 1: del }, 3), delay: i * 800 + 400, obake: true });
            a.push({ func: syuki({ 0: dFunc(1.5, 5, 1), 1: del, 2: del }, 3), delay: i * 800 + 400, drill: true });
            a.push({ func: syuki({ 1: dFunc(2, 5, 1), 2: del, 0: del }, 3), delay: i * 800 + 600 });
            a.push({ func: syuki({ 2: dFunc(2, 5, 1), 0: del, 1: del }, 3), delay: i * 800 + 600, obake: true });
            a.push({ func: syuki({ 0: dFunc(2, 5, 1), 2: del, 1: del }, 3), delay: i * 800 + 600, drill: true });
        }
        return a;
    } else {
        for (let i = 0; i < x; i++) {
            a.push({ func: dFunc(-2, 5, 1), delay: i * 800 + 200, drill });
            a.push({ func: dFunc(-1.5, 5, 1), delay: i * 800 + 400, drill });
            a.push({ func: dFunc(-1, 5, 1), delay: i * 800 + 800, drill });
            a.push({ func: dFunc(0, 5, 1), delay: i * 800 + 400, drill });
            a.push({ func: dFunc(1, 5, 1), delay: i * 800 + 200, drill });
            a.push({ func: dFunc(1.5, 5, 1), delay: i * 800 + 400, drill });
            a.push({ func: dFunc(2, 5, 1), delay: i * 800 + 600, drill });
        }
        return a;
    }
}
function kakashistar(kakashi = false, s = 20) {
    const a: ShotDef[] = [];
    if (kakashi) {
        {
            a.push({ func: syuki({ 0: dFunc(4.75 * s / 20, 19.5 * s / 20, 3, 0, [1.25 * s / 20, -8.75 * s / 20]), 1: del, 2: del }, 3) });
            a.push({ func: syuki({ 1: dFunc(4.75 * s / 20, 19.5 * s / 20, 3, 0, [1.25 * s / 20, -8.75 * s / 20]), 2: del, 0: del }, 3), drill: true });
            a.push({ func: syuki({ 2: dFunc(4.75 * s / 20, 19.5 * s / 20, 3, 0, [1.25 * s / 20, -8.75 * s / 20]), 0: del, 1: del }, 3), obake: true });
            a.push({ func: syuki({ 1: dFunc(0, s, 5, 0, [0, -8.75 * s / 20]), 2: del, 3: del }, 3) });
            a.push({ func: syuki({ 2: dFunc(0, s, 5, 0, [0, -8.75 * s / 20]), 0: del, 1: del }, 3), drill: true });
            a.push({ func: syuki({ 0: dFunc(0, s, 5, 0, [0, -8.75 * s / 20]), 1: del, 2: del }, 3), obake: true });
            a.push({ func: syuki({ 2: dFunc(-4.75 * s / 20, 19.5 * s / 20, 3, 0, [-1.25 * s / 20, -8.75 * s / 20]), 0: del, 1: del }, 3) });
            a.push({ func: syuki({ 0: dFunc(-4.75 * s / 20, 19.5 * s / 20, 3, 0, [-1.25 * s / 20, -8.75 * s / 20]), 1: del, 2: del }, 3), drill: true });
            a.push({ func: syuki({ 1: dFunc(-4.75 * s / 20, 19.5 * s / 20, 3, 0, [-1.25 * s / 20, -8.75 * s / 20]), 2: del, 0: del }, 3), obake: true });
        }
        return a;
    } else {
        {
            a.push({ func: syuki({ 1: dFunc(4.75 * s / 20, 19.5 * s / 20, 3, 0, [1.25 * s / 20, -8.75 * s / 20]), 2: del, 0: del }, 3) });
            a.push({ func: syuki({ 0: dFunc(4.75 * s / 20, 19.5 * s / 20, 3, 0, [1.25 * s / 20, -8.75 * s / 20]), 1: del, 2: del }, 3), drill: true });
            a.push({ func: syuki({ 2: dFunc(4.75 * s / 20, 19.5 * s / 20, 3, 0, [1.25 * s / 20, -8.75 * s / 20]), 0: del, 1: del }, 3), obake: true });
            a.push({ func: syuki({ 1: dFunc(0, s, 5, 0, [0, -8.75 * s / 20]), 2: del, 0: del }, 3) });
            a.push({ func: syuki({ 0: dFunc(0, s, 5, 0, [0, -8.75 * s / 20]), 1: del, 2: del }, 3), drill: true });
            a.push({ func: syuki({ 2: dFunc(0, s, 5, 0, [0, -8.75 * s / 20]), 0: del, 1: del }, 3), obake: true });
            a.push({ func: syuki({ 1: dFunc(-4.75 * s / 20, 19.5 * s / 20, 3, 0, [-1.25 * s / 20, -8.75 * s / 20]), 2: del, 0: del }, 3) });
            a.push({ func: syuki({ 0: dFunc(-4.75 * s / 20, 19.5 * s / 20, 3, 0, [-1.25 * s / 20, -8.75 * s / 20]), 1: del, 2: del }, 3), drill: true });
            a.push({ func: syuki({ 2: dFunc(-4.75 * s / 20, 19.5 * s / 20, 3, 0, [-1.25 * s / 20, -8.75 * s / 20]), 0: del, 1: del }, 3), obake: true });
        }
        return a;
    }
}
function name_spread(z = 27, df = 2.568, de = 250) {
    const s = df;
    const a: ShotDef[] = [];
    for (let i = 0; i < z; i++) {
        a.push({
            func: dFunc(
                Math.sin(Math.PI / (2 / z) * i) * s,
                Math.cos(Math.PI / (2 / z) * i) * s,
                1.5,
                20,
                [0, -45]
            ),
            delay: de,
        });
    }
    return a;
}
function awawash(afg = false) {
    const a: ShotDef[] = [];
    for (let i = 0; i < 11; i++) {
        a.push({
            func: dFunc(19.8 * Math.sin(((2 * i) / 11) * Math.PI),
                19.8 * Math.cos(((2 * i) / 11) * Math.PI), 1.5, 0, [0, -50]), delay: 500, drill: afg
        });
        a.push({
            func: dFunc(15.84 * Math.sin(((2 * i) / 11) * Math.PI),
                15.84 * Math.cos(((2 * i) / 11) * Math.PI), 1.5, 0, [0, -50]), delay: 500, drill: afg
        });
        a.push({
            func: dFunc(11.85 * Math.sin(((2 * i) / 11) * Math.PI),
                11.85 * Math.cos(((2 * i) / 11) * Math.PI), 1.5, 0, [0, -50]), delay: 500, drill: afg
        });
        a.push({
            func: dFunc(7.88 * Math.sin(((2 * i) / 11) * Math.PI),
                7.88 * Math.cos(((2 * i) / 11) * Math.PI), 1.5, 0, [0, -50]), delay: 500, drill: afg
        });
        a.push({
            func: dFunc(3.93 * Math.sin(((2 * i) / 11) * Math.PI),
                3.93 * Math.cos(((2 * i) / 11) * Math.PI), 1.5, 0, [0, -50]), delay: 500, drill: afg
        });
    }
    for (let i = 0; i < 11; i++) {
        a.push({
            func: dFunc(17.82 * Math.sin((((2 * i) + 1) / 11) * Math.PI),
                17.82 * Math.cos((((2 * i) + 1) / 11) * Math.PI), 1.5, 0, [0, -50]), delay: 500, drill: afg
        });
        a.push({
            func: dFunc(13.845 * Math.sin((((2 * i) + 1) / 11) * Math.PI),
                13.845 * Math.cos((((2 * i) + 1) / 11) * Math.PI), 1.5, 0, [0, -50]), delay: 500, drill: afg
        });
        a.push({
            func: dFunc(9.865 * Math.sin((((2 * i) + 1) / 11) * Math.PI),
                9.865 * Math.cos((((2 * i) + 1) / 11) * Math.PI), 1.5, 0, [0, -50]), delay: 500, drill: afg
        });
        a.push({
            func: dFunc(5.905 * Math.sin((((2 * i) + 1) / 11) * Math.PI),
                5.905 * Math.cos((((2 * i) + 1) / 11) * Math.PI), 1.5, 0, [0, -50]), delay: 500, drill: afg
        });
    } return a;
}
function awasp(afg = false) {
    const a: ShotDef[] = [];
    for (let i = 0; i < 3; i++) {
        a.push({
            func: dFunc(10.75 * Math.sin(((-1 + i) / 12) * Math.PI),
                10.75 * Math.cos(((-1 + i) / 12) * Math.PI), 1.5, 0, [0, 0]), drill: afg
        });
        a.push({
            func: dFunc(8.6 * Math.sin(((-1 + i) / 12) * Math.PI),
                8.6 * Math.cos(((-1 + i) / 12) * Math.PI), 1.5, 0, [0, 0]), drill: afg
        });
        a.push({
            func: dFunc(6.43162393162 * Math.sin(((-1 + i) / 12) * Math.PI),
                6.43162393162 * Math.cos(((-1 + i) / 12) * Math.PI), 1.5, 0, [0, 0]), drill: afg
        });
        a.push({
            func: dFunc(4.26345609065 * Math.sin(((-1 + i) / 12) * Math.PI),
                4.26345609065 * Math.cos(((-1 + i) / 12) * Math.PI), 1.5, 0, [0, 0]), drill: afg
        });
    } return a;
}

function awa_ring() {
    const a: ShotDef[] = []
    for (let i = 0; i < 8; i++) {
        a.push({
            func: dKaiten(
                Math.PI / 8 * (2 * i + 1),
                0.13,
                7,
                0,
                8,
                1.55,
            ),
            delay: 400,
        });
    }
    return a;
}
function awa_ringx() {
    const a: ShotDef[] = []
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
            drill: true
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
            drill: true
        });
    }
    return a;
}


function uzushio() {
    const a: ShotDef[] = []
    for (let i = 0; i < 10; i++) {
        a.push({
            func: dKaiten(
                Math.PI / 10 * i,
                0.17,
                3,
                0,
                0.1,
                0.00125,
                3,
                480,
                1,
            ),
            delay: 250 * i + 400,
            drill: true,
        });
    }
    return a;
}
function happon(drill = false) {
    const a: ShotDef[] = [];
    a.push({ func: curve(3.15, 0.8, 12), delay: 8 * 130, drill });
    a.push({ func: curve(2.7, 0.8, 12), delay: 7 * 130, drill });
    a.push({ func: curve(2.25, 0.8, 12), delay: 6 * 130, drill });
    a.push({ func: curve(1.8, 0.8, 12), delay: 5 * 130, drill });
    a.push({ func: curve(1.35, 0.8, 12), delay: 4 * 130, drill });
    a.push({ func: curve(0.9, 0.8, 12), delay: 3 * 130, drill });
    a.push({ func: curve(0.45, 0.8, 12), delay: 2 * 130, drill });
    a.push({ func: dFunc(0, 12, 3), delay: 1 * 130, drill });
    return a;
}

function juppon() {
    const a: ShotDef[] = [];
    a.push({ func: curve(4.5, 0.8, 15), delay: 10 * 140 });
    a.push({ func: curve(4, 0.8, 15), delay: 9 * 140 });
    a.push({ func: curve(3.5, 0.8, 15), delay: 8 * 140 });
    a.push({ func: curve(3, 0.8, 15), delay: 7 * 140 });
    a.push({ func: curve(2.5, 0.8, 15), delay: 6 * 140 });
    a.push({ func: curve(2, 0.8, 15), delay: 5 * 140 });
    a.push({ func: curve(1.5, 0.8, 15), delay: 4 * 140 });
    a.push({ func: curve(1, 0.8, 15), delay: 3 * 140 });
    a.push({ func: curve(0.5, 0.8, 15), delay: 2 * 140 });
    a.push({ func: dFunc(0, 15, 3), delay: 1 * 140 });
    return a;
}

function nobinobi() {
    const a: ShotDef[] = [];
    a.push({ func: curve(4, 0.5, 12), delay: 250 });
    a.push({ func: curve(4.4, 0.5, 12), delay: 250 });
    a.push({ func: curve(4.8, 0.5, 12), delay: 250 });
    a.push({ func: curve(5.2, 0.5, 12), delay: 250 });
    a.push({ func: curve(5.6, 0.5, 12), delay: 250 });
    return a;
}
function i_spread() {
    const a: ShotDef[] = [];
    for (let i = 0; i < 24; i++) {
        a.push({
            func: dCurve(
                Math.PI / 12 * i, 0.004, 1.5, 4
            ),
            delay: 0,
        });
    }
    return a;
}

function m_spread() {
    const a: ShotDef[] = [];
    for (let i = 0; i < 12; i++) {
        a.push({
            func: dCurve(
                (Math.PI / 6 * i), 0.012, 3, 7
            ),
            delay: 1000,
            drill: true
        });
    }
    for (let i = 0; i < 12; i++) {
        a.push({
            func: dCurve(
                (Math.PI / 6 * (i + 0.5)), 0.012, 1.5, 7
            ),
            delay: 1000,
            drill: true
        });
    }
    return a;
}
