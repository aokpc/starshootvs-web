// deno-lint-ignore-file no-debugger no-window

function effect(callback) {
    return function (t) {
        callback(this)
        return [1401, 0, 0];
    };
}
function dFunc(dx = 0, dy = 10, size = 3, add = 0, [x, y] = [0, 0]) {
    return (t) => {
        t += add
        return [t * dx / 10 * 4 + x, t * dy / 10 * 4 + y, size];
    }
}
function kasoku(dx = 0, dy = 10, size = 3, add = 0, [x, y] = [0, 0]) {
    return (t) => {
        t += add
        return [t * t * dx / 10 * 4 + x, t * t * dy / 10 * 4 + y, size];
    }
}
function kasoku2(dx = 0, dy = 10, size = 3, add = 0, [x, y] = [0, 0]) {
    return (t) => {
        t += add
        return [t * t * t * dx / 10 * 4 + x, t * t * dy / 10 * 4 + y, size];
    };
}
function kasoku3(dx = 0, dy = 10, size = 3, add = 0, [x, y] = [0, 0]) {
    return (t) => {
        t += add
        return [t * t * dx / 10 * 4 + x, t * t * t * dy / 10 * 4 + y, size];
    };
}
function kasoku4(dx = 0, ddx = 0, dy = 10, size = 3, add = 0, [x, y] = [0, 0]) {
    return (t) => {
        t += add
        return [(t * t * t * t * ddx + t * dx) / 10 * 4 + x, t * t * dy / 10 * 4 + y, size];
    };
}
function kasoku5(dx = 0, ddx = 0, dy = 10, size = 3, add = 0, [x, y] = [0, 0]) {
    return (t) => {
        t += add
        return [(t * t * t * ddx + t * dx) / 10 * 4 + x, t * t * dy / 10 * 4 + y, size];
    };
}

function dCurve(θ = 0, dθ = 0, size = 3, speed = 7) {
    return (t) => {
        return [t * speed * Math.sin(θ + dθ * t), t * speed * Math.cos(θ + dθ * t) - 20, size];
    };
}

function dKaiten(θ = 0, dθ = 0.35, dy = 2, dx = 0, r = 5, dr = 0.13, size = 1.5, drx = 1, dry = 1, [x, y] = [0, 0]) {
    return (t) => {
        return [t * dx + drx * (r + dr * t) * Math.cos(θ + dθ * t) - x, t * dy + dry * (r + dr * t) * Math.sin(θ + dθ * t) - y, size];
    };
}
function takino(θ = 0, dθ = 0.35, dy = 2, r = 5, dr = 0.13, size = 1.5, dry = 1, [x, y] = [0, 0]) {
    return (t) => {
        return [0 + x, t * dy + dry * (r + dr * t) * Math.sin(θ + dθ * t) + y, size];
    };
}
function dKaitenFuncif(r = 13, dθ = (-(1 / 30) * Math.PI), θ = ((4.5 / 6) * Math.PI), dθ2 = (-(1 / 30) * Math.PI), dx = 0, dy = 10, dx2 = 11, dy2 = 2, when = 60, add = 0, size = 3, [x, y] = [0, 0]) {
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

function dFuncif(dx = 0, dy = 10, dx2 = 11, dy2 = 2, when = 60, add = 0, size = 3, [x, y] = [0, 0]) {
    return (t) => {
        t += add
        if (t <= when) {
            return [t * dx / 10 * 4 + x, t * dy / 10 * 4 + y, size];
        } else
            return [when * dx / 10 * 4 + x + (dx2 * (t - when)) / 10 * 4, when * dy / 10 * 4 + y + dy2 * (t - when) / 10 * 4, size];
    };
}

function mirror(dx = 0, dy = 10, size = 3) {
    return function (t) {
        if ((t * dy / 10 * 4) > (vs.me.st.y - 500)) {
            return [
                -((350 - this.bx) * 2) - (t * dx / 10 * 4),
                t * dy / 10 * 4,
                size,
            ];
        }
        return [t * dx / 10 * 4, t * dy / 10 * 4, size];
    };
}
function sprit(dx = 0, dy = 10, size = 3, rl = 1, s = 100) {
    return function (t) {
        if ((t * dy / 10 * 4) > (vs.me.st.y - 500)) {
            return [
                rl * s,
                t * dy / 10 * 4,
                size,
            ];
        }
        return [t * dx / 10 * 4, t * dy / 10 * 4, size];
    };
}
function fusen(dx = 0, s = 10, bsize = 1, tosize = 3) {
    let nt = 0;
    return (t) => {
        if (
            (t * s / 10 * 4) > ((vs.me.st.y - 500) * 2 - 400) &&
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
function curve(h = 1, w = 1.1, s = 13, size = 3, [x, y] = [0, 0]) {
    return (t) => {
        return [-Math.sin(t * w / 5.7) * h * 50 + x, t * s / 10 * 4 + y, size];
    };
}
function swim(h = 1, w = 1.1, s = 13, size = 3, dh = 0.1) {
    return (t) => {
        return [-Math.sin(t * w / 5.7) * (h + (dh * t)) * 50, t * s / 10 * 4, size];
    };
}
function fastswim(h = 1, w = 1.1, s = 13, size = 3, dh = 0.1) {
    return (t) => {
        return [-Math.sin(t * w / 5.7) * (h + (dh * t * t)) * 50, t * s / 10 * 4, size];
    };
}
function ago(h = 1, w = 1.1, s = 13, size = 3, z = 4) {
    return (t) => {
        return [-Math.abs(Math.sin(t * w / 5.7) * h * 50), (t * s / 10 * 4) - z, size];
    };
}
function damashi(s = 19, l = 0, size = 3, w = 1,) {
    let nt = 0;
    if (l) {
        return (t) => {
            if ((t * s / 10 * 4) > ((vs.me.st.y - 500) * 2 - 300)) {
                return [w * (t - nt), t * s / 10 * 4, size];
            }
            nt = t;
            return [0, t * s / 10 * 4, size];
        };
    } else {
        return (t) => {
            if ((t * s / 10 * 4) > ((vs.me.st.y - 500) * 2 - 300)) {
                return [-w * (t - nt), t * s / 10 * 4, size];
            }
            nt = t;
            return [0, t * s / 10 * 4, size];
        };
    }
}



function load_skill(star, [s1, s2, s3]) {
    const pStatus = ["☆", "★"];
    if (skill_list[star.st.i]) {
        star.skill = [
            skill_list[star.st.i][0][s1],
            skill_list[star.st.i][1][s2],
            skill_list[star.st.i][2][s3],
        ];
    } else {
        star.skill = [
            skill_list[0][0][s1],
            skill_list[0][1][s2],
            skill_list[0][2][s3],
        ];
    }
    star.skill_gage[0].innerText = star.skill[0][3];
    star.skill_gage[1].innerText = star.skill[1][3];
    star.skill_gage[2].innerText = star.skill[2][3];
    star.skill_gage_cost[0].innerText = star.skill[0][1];
    star.skill_gage_cost[1].innerText = star.skill[1][1];
    star.skill_gage_cost[2].innerText = star.skill[2][1];
    if (star.st.p < star.skill[1][0]) {
        star.skill_gage_cost[1].innerText = pStatus[1].repeat(star.st.p);
        star.skill_gage_cost[1].innerText += pStatus[0].repeat(
            star.skill[1][0] - star.st.p,
        );
    }
    if (star.st.p < (star.skill[1][0] + star.skill[2][0])) {
        star.skill_gage_cost[2].innerText = pStatus[1].repeat(
            (star.st.p - star.skill[1][0]) > 0
                ? (star.st.p - star.skill[1][0])
                : 0,
        );
        star.skill_gage_cost[2].innerText += pStatus[0].repeat(
            (star.skill[1][0] + star.skill[2][0] - star.st.p) < star.skill[2][0]
                ? (star.skill[1][0] + star.skill[2][0] - star.st.p)
                : star.skill[2][0],
        );
    }
}
function p_skill(star) {
    const pStatus = ["☆", "★"];
    star.skill_gage_cost[0].innerText = star.skill[0][1];
    star.skill_gage_cost[1].innerText = star.skill[1][1];
    star.skill_gage_cost[2].innerText = star.skill[2][1];
    if (star.st.p < star.skill[1][0]) {
        star.skill_gage_cost[1].innerText = pStatus[1].repeat(star.st.p);
        star.skill_gage_cost[1].innerText += pStatus[0].repeat(
            star.skill[1][0] - star.st.p,
        );
    }
    if (star.st.p < (star.skill[1][0] + star.skill[2][0])) {
        star.skill_gage_cost[2].innerText = pStatus[1].repeat(
            (star.st.p - star.skill[1][0]) > 0
                ? (star.st.p - star.skill[1][0])
                : 0,
        );
        star.skill_gage_cost[2].innerText += pStatus[0].repeat(
            (star.skill[1][0] + star.skill[2][0] - star.st.p) < star.skill[2][0]
                ? (star.skill[1][0] + star.skill[2][0] - star.st.p)
                : star.skill[2][0],
        );
    }
}
/*
skills[
    skill[
        [p,cost,[shot],name]
    ]
]
*/
const skill_list = [
    [ //0 ヒトデ
        [
            [0, 1, [
                { func: dFunc(0, 6.3, 3), delay: 0 }
            ], "しょぼショット"],
            [0, 2, [
                { func: dFunc(2.15, 6.3, 3, 0, [1.2, -4]), delay: 0 },
                { func: dFunc(-2.15, 6.3, 3, 0, [-1.2, -4]), delay: 0 }
            ], "しょぼツイン"],
        ],
        [
            [2, 5, [
                { func: dFunc(3.8, 15.6, 3, 0, [1, -7]), delay: 0 },
                { func: dFunc(0, 16, 5, 0, [0, -7]), delay: 0, },
                { func: dFunc(-3.8, 15.6, 3, 0, [-1, -7]), delay: 0 }
            ], "トリプルスター"],
        ],
        [
            [2, 7, danmaku(4),
                "プチだんまく"],
            [2, 7, [
                { func: dFunc(8.2, 17.3, 3.3, 0, [2.5, 0]), delay: 200 },
                { func: dFunc(4.8, 18.8, 3.3, 0, [3, 0]), delay: 200 },
                { func: dFunc(0, 20, 5.3, 0, [0, -0.5]), delay: 200 },
                { func: dFunc(-4.8, 18.8, 3.3, 0, [-3, 0]), delay: 200 },
                { func: dFunc(-8.2, 17.3, 3.3, 0, [-2.5, 0]), delay: 200 },
            ], "ファイブスター"],

        ],
    ],
    [ //1 ウサギ
        [
            [0, 2, [
                { func: dFunc(0, 17.5, 3), delay: 0 }
            ], "ショット"],
        ],
        [
            [2, 3, [
                { func: damashi(17.5, 1, 3, 1.5), delay: 0 }
            ], "だましレフト",],
            [2, 3, [
                { func: damashi(17.5, 0, 3, 1.5), delay: 0 }
            ], "だましライト",],
            [2, 4, [
                { func: dFunc(0, 30, 3), delay: 0 }
            ], "ファストショット"],
        ],
        [
            [2, 7, [
                { func: dFunc(0, 48.6, 3, 0, [0, 10]), delay: 0 }
            ], "スピードショット"],
            [2, 5, [
                { func: damashi(30, 1, 3, 2), delay: 0 }
            ], "ファストレフト",],
            [2, 5, [
                { func: damashi(30, 0, 3, 2), delay: 0 }
            ], "ファストライト",],
        ],
    ],
    [ //2 たこ
        [
            [0, 2, [
                { func: curve(1.05, 0.95, 12), delay: 0 }
            ], "カーブショット"],
            [0, 1, [
                { func: curve(0.48, 1.1, 5.4), delay: 0 }
            ], "しょぼカーブ"],
        ],
        [
            [2, 5, [
                { func: dFunc(0, 19.8, 3), delay: 0 },
                { func: dFunc(0, 19.8, 3), delay: 160, },
                { func: dFunc(0, 19.8, 3), delay: 300 }
            ], "さんれんぱつ"],
            [2, 4, [
                { func: curve(1.05, 1.1, 20), delay: 0 }
            ], "ファストカーブ"],
            [2, 4, [
                { func: curve(1.05, 0.95, 12, 10), delay: 0 }
            ], "ヘヴィカーブ"],
        ],
        [
            [2, 8, happon(), "はっぽんあし"],
            [2, 8, nobinobi(), "のびのびカーブ"],
        ],
    ],
    0[//3 おばけ
    [
        []
    ]],
    [ //4 モグラ
        [
            [0, 2, [
                { func: dFunc(0, 15, 3), delay: 0, drill: true }],
                "ドリルショット",
            ],
        ],
        [
            [1, 2, [
                { func: dFunc(0, 2.7, 3), delay: 0, drill: true }
            ], "スロードリル",],
            [1, 4, [
                { func: dFunc(3, 15, 3), delay: 0, drill: true },
                { func: dFunc(-3, 15, 3), delay: 0, drill: true, }
            ], "ツインドリル"],
            [2, 6, [
                { func: dFunc(1.28, 2.3004, 1.5, 0, [2.5, 0]), delay: 0, drill: true },
                { func: dFunc(0.64, 2.5164, 1.5, 0, [3, 0]), delay: 0, drill: true },
                { func: dFunc(0, 2.64, 2.5, 0, [0, 0]), delay: 0, drill: true },
                { func: dFunc(-0.64, 2.5164, 1.5, 0, [-3, 0]), delay: 0, drill: true },
                { func: dFunc(-1.28, 2.3004, 1.5, 0, [-2.5, 0]), delay: 0, drill: true },
            ], "スローファイブ"],
        ],
        [
            [3, 8, [
                { func: dFunc(10.66, 22.49, 3.3, 0, [3.25, 0]), delay: 500, drill: true },
                { func: dFunc(6.24, 24.44, 3.3, 0, [3.9, 0]), delay: 500, drill: true },
                { func: dFunc(0, 26, 5.3, 0, [0, -0.65]), delay: 500, drill: true },
                { func: dFunc(-6.24, 24.44, 3.3, 0, [-3.9, 0]), delay: 500, drill: true },
                { func: dFunc(-10.66, 22.49, 3.3, 0, [-3.25, 0]), delay: 500, drill: true },
            ], "ドリルファイブ"],
            [2, 8, [
                { func: dFunc(2.14, 26.8, 1.5, 0, [0, -5]), delay: 200, drill: true },
                { func: dFunc(1.07, 26.95, 1.5, 0, [0, -5]), delay: 200, drill: true },
                { func: dFunc(0, 27, 1.5, 0, [0, -5]), delay: 200, drill: true },
                { func: dFunc(-1.07, 26.95, 1.5, 0, [0, -5]), delay: 200, drill: true },
                { func: dFunc(-2.14, 26.8, 1.5, 0, [0, -5]), delay: 200, drill: true },
            ], "ドリルアタック"],
        ],
    ],
    [ //5 クジラ
        [
            [0, 2, [
                { func: dFunc(0, 11, 9, 0, [0, 4]), delay: 0 }
            ], "ヘヴィショット"],
            [0, 3, [
                { func: dFunc(4, 10, 8.5), delay: 0 },
                { func: dFunc(-4, 10, 8.5), delay: 0, }
            ], "ヘヴィツイン"],
        ],
        [
            [3, 5, [
                { func: dFunc(0, 13, 23), delay: 50 }
            ], "スーパーヘヴィ"],
            [2, 4, [
                { func: curve(1.05, 0.95, 14, 10), delay: 0 }
            ], "ヘヴィカーブ"],
            [4, 5, [
                { func: damashi(11, 1, 8, 1.5), delay: 0 },
                { func: damashi(11, 0, 8, 1.5), delay: 0, },
                { func: damashi(11, 1, 8, 2), delay: 0 },
                { func: damashi(11, 0, 8, 2), delay: 0, },
                { func: damashi(11, 1, 8, 2.5), delay: 0 },
                { func: damashi(11, 0, 8, 2.5), delay: 0, },
                {
                    func: effect((shot) => {
                        if (shot.isme) {
                            vs.me.star.tint = 0xEF5350
                            let b = 0;
                            let a = setInterval(() => {
                                vs.me.star.tint = 0x29B6F6
                            }, 20)
                            setTimeout(() => {
                                b = setInterval(() => {
                                    vs.me.star.tint = 0xEF5350
                                }, 20)
                            }, 10)
                            setTimeout(() => { clearInterval(a); clearInterval(b); vs.me.star.tint = 0x29B6F6 }, 2000)
                        } else {
                            vs.enemy.star.tint = 0x29B6F6
                            let b = 0;
                            let a = setInterval(() => {
                                vs.enemy.star.tint = 0xEF5350
                            }, 20)
                            setTimeout(() => {
                                b = setInterval(() => {
                                    vs.enemy.star.tint = 0x29B6F6
                                }, 20)
                            }, 10)
                            setTimeout(() => { clearInterval(a); clearInterval(b); vs.enemy.star.tint = 0xEF5350 }, 2000)
                        }
                    }), delay: 0
                }], "しおふき"],
        ],
        [
            [2, 9, danmaku(),
                "だんまく"],
            [2, 9, [
                { func: dFunc(0, 26, 22), delay: 1000 }
            ], "マグナムショット"],
        ],
    ],
    [ //6 カエル
        [
            [0, 1, [
                { func: dFunc(0, 8.5, 1.5), delay: 0 }
            ], "プチショット"],
        ],
        [
            [1, 2, [
                { func: dFunc(2, 8.5, 1.5), delay: 0 },
                { func: dFunc(-2, 8.5, 1.5), delay: 0, }
            ], "プチツイン"],
            [2, 3, [
                { func: fusen(0, 8.5, 1.5, 9), delay: 0 }
            ], "ふうせんショット"],
            [2, 6, [
                { func: fusen(2.6, 8.1, 1.5, 4), delay: 25 },
                { func: fusen(1.3, 8.3, 1.5, 4), delay: 12 },
                { func: fusen(0, 8.5, 1.5, 4), delay: 0 },
                { func: fusen(-1.3, 8.3, 1.5, 4), delay: 12 },
                { func: fusen(-2.6, 8.1, 1.5, 4), delay: 25 },
            ], "バルーンファイブ"],
        ],
        [
            [2, 6, [
                { func: fusen(0, 8.5, 1.5, 33), delay: 0 }
            ], "ジャンボふうせん"],
        ],
    ],
    [ //7 ナメ
        [
            [0, 1, [
                { func: curve(0.35, 1.1, 2.7), delay: 0 }
            ], "ナメショット"],
            [0, 2, [
                { func: curve(0.35, 1.1, 2.7), delay: 0, drill: true }
            ], "ナメドリル",],
        ],
        [
            [1, 4,
                [{ func: curve(0.6, 1.1, 4, 10), delay: 0, drill: true }],
                "ナメヘヴィ",],
            [2, 5, [
                { func: dFunc(0, 4, 3), delay: 0 }, { func: curve(0.7, 1.1, 4, 1.5), delay: 0 }, { func: curve(-0.7, 1.1, 4, 1.5), delay: 0 },
                { func: dFunc(0, 4, 3), delay: 250 }, { func: curve(0.7, 1.1, 4, 1.5), delay: 250 }, { func: curve(-0.7, 1.1, 4, 1.5), delay: 250 },
                { func: dFunc(0, 4, 3), delay: 500 }, { func: curve(0.7, 1.1, 4, 1.5), delay: 500 }, { func: curve(-0.7, 1.1, 4, 1.5), delay: 500 },
                { func: dFunc(0, 4, 3), delay: 750 }, { func: curve(0.7, 1.1, 4, 1.5), delay: 750 }, { func: curve(-0.7, 1.1, 4, 1.5), delay: 750 },
                { func: dFunc(0, 4, 3), delay: 1000 }, { func: curve(0.7, 1.1, 4, 1.5), delay: 1000 }, { func: curve(-0.7, 1.1, 4, 1.5), delay: 1000 },
                { func: dFunc(0, 4, 3), delay: 1250 }, { func: curve(0.7, 1.1, 4, 1.5), delay: 1250 }, { func: curve(-0.7, 1.1, 4, 1.5), delay: 1250 },
            ], "ゲジゲジ"]
        ],
        [
            [2, 6, name_spread(),
                "ナメスプレッド"],
        ],
    ],
    0,
    [ //9 イカ
        [
            [0, 2, [
                { func: yura(1.11, 1.73, 22), delay: 0 }
            ], "ゆらゆらショット"],
            [0, 1, [
                { func: yura(0.5, 2.1, 8, 3), delay: 0 }
            ], "しょぼゆらゆら"],
        ],
        [
            [0, 5, i_spread(),
                "イカスプレッド"],
            [2, 4, [
                { func: curve(4, 0.17, 9.7), delay: 0 }
            ], "ワイドカーブ",],
        ],
        [
            [2, 10, juppon(),
                "じゅっぽんあし"],
            [2, 7, uzushio(),
                "うずしお"],
            [6, 10, [
                { func: yura(1.11, 1.73, 22, 3, [-300, 0]), delay: 0 },
                { func: yura(1.11, 1.73, 22, 3, [-2100 / 9, 0]), delay: 0 },
                { func: yura(1.11, 1.73, 22, 3, [-1500 / 9, 0]), delay: 0 },
                { func: yura(1.11, 1.73, 22, 3, [-100, 0]), delay: 0 },
                { func: yura(1.11, 1.73, 22, 3, [-300 / 9, 0]), delay: 0 },
                { func: yura(1.11, 1.73, 22, 3, [300 / 9, 0]), delay: 0 },
                { func: yura(1.11, 1.73, 22, 3, [100, 0]), delay: 0 },
                { func: yura(1.11, 1.73, 22, 3, [1500 / 9, 0]), delay: 0 },
                { func: yura(1.11, 1.73, 22, 3, [2100 / 9, 0]), delay: 0 },
                { func: yura(1.11, 1.73, 22, 3, [300, 0]), delay: 0 }
            ], "つよじゅっぽん"]
        ],
    ],
    [ //10 しし
        [
            [0, 3, [
                { func: dFunc(0, 13, 10), delay: 0, drill: true }
            ], "ヘヴィドリル"],
        ],
        [
            [2, 4, [
                { func: dFunc(5, 12, 9), delay: 0, drill: true },
                { func: dFunc(-5, 12, 9), delay: 0, drill: true }
            ], "ライオンツイン"],
            [0, 0, [
                { func: dFunc(0, 7.5, 25), delay: 0, drill: true }
            ], "ハイパースロー",],
        ],
        [
            [0, 0, [
                { func: dFunc(0, 47, 25), delay: 10000, drill: true }
            ], "ハイパーショット",]
        ],
    ],
    [ //11 いて
        [
            [0, 2, [
                { func: charge(), delay: 100 }
            ], "チャージアロー"],
        ],
        [
            [2, 5, [
                { func: dFunc(3.8, 15.6, 3, 0, [1, -7]), delay: 0 },
                { func: dFunc(0, 16, 5, 0, [0, -7]), delay: 0, },
                { func: dFunc(-3.8, 15.6, 3, 0, [-1, -7]), delay: 0 }
            ], "トリプルスター"],
        ],
        [
            [2, 7, danmaku(4), "プチだんまく"],
            [2, 7, [
                { func: dFunc(9, 18, 3), delay: 25 },
                { func: dFunc(5, 19, 4), delay: 25 },
                { func: dFunc(0, 20, 6), delay: 50 },
                { func: dFunc(-5, 19, 4), delay: 50 },
                { func: dFunc(-9, 18, 3), delay: 20 },
            ], "ファイブスター"],
        ],
    ],
    [//12 うお
        [
            [0, 2, [
                { func: swim(0.15, 0.5, 9.3, 3, 0.0084), delay: 0 }
            ], "スイム"],
            [0, 2, [
                { func: takino(0, 0.21, 3, 40, 0, 3, 1, [0, 0]) }
            ], "たきのぼり"]
        ],
        [
            [2, 5, [
                { func: dFunc(0, 18, 1.5, 0, [0, -20]), delay: 0 },
                { func: dFuncif(9, 9, 0, 18, 30, 0, 1.5, [0, -20]), delay: 0 },
                { func: dFuncif(-9, 9, 0, 18, 30, 0, 1.5, [0, -20]), delay: 0 },
                { func: dKaiten((-(1 / 2) * Math.PI), 0.1, 7.2, 0, 20, 0, 1.5, 1, 1, [0, 130]), delay: 0 },
                { func: dFuncif(0, 0, 0, 18, 30, 0, 1.5, [0, -20]), delay: 0 }
            ], "ソナー"],
            [2, 6, [
                { func: dFunc(0, 20, 3, 0, [0, -20]), delay: 0 },
                { func: dFuncif(10, 10, 0, 20, 30, 0, 3, [0, -20]), delay: 0 },
                { func: dFuncif(-10, 10, 0, 20, 30, 0, 3, [0, -20]), delay: 0 },
                { func: dKaiten(((1 / 2) * Math.PI), 0.1, 8, 0, 60, 0, 1.5, 1, 1, [0, 140]), delay: 0 },
                { func: dFuncif(0, 0, 0, 20, 30, 0, 3, [0, -20]), delay: 0 }
            ], "オールドソナー"],
            [2, 4, [
                { func: fastswim(0.3, 0.55, 17, 3, 0.0003) }
            ], "ファストスイム"],
            [2, 4, [
                { func: ago(2.5, 0.87, 20, 3) }
            ], "トビウオ"],
        ],
        [
            [2, 6, [
                { func: kasoku(0, 1.3, 6.5, 0, [113, -100]), delay: 400 },
                { func: kasoku(0, 1.3, 6.5, 0, [-113, -100]), delay: 400 }
            ], "ぎょらい"],
            [2, 7, [
                { func: kasoku(0, 1.3, 6.5, 0, [113, -100]), delay: 400 },
                { func: kasoku(0, 1.3, 6.5, 0, [-113, -100]), delay: 400 },
                { func: kasoku(0, 1.3, 6.5, 0, [280, -100]), delay: 400 },
                { func: kasoku(0, 1.3, 6.5, 0, [-280, -100]), delay: 400 }
            ], "スーパーぎょらい"]
        ],
    ],
    [//13 てんびん
        [[0, 3, [
            { func: dKaiten((-(2 / 3) * Math.PI), 0.018, 3.3, 0, 25, 0, 1.5, -1, 1, [0, 40]), delay: 0 },
            { func: dKaiten(((2 / 3) * Math.PI), 0.018, 3.3, 0, 25, 0, 1.5, -1, 1, [0, 40]), delay: 0 },
            { func: dKaiten((0 * Math.PI), 0.018, 3.3, 0, 25, 0, 1.5, -1, 1, [0, 40]), delay: 0 }
        ], "プチデルタ"],
        [0, 4, [{
            func: effect((shot) => {
                if (shot.isme) {
                    vs.on_box.forEach((b) => { if (Math.random() > 0.5) b.hit(vs.me) });
                    vs.me.cost = 0;
                    vs.me.st.cost = vs.me.cost;
                    vs.ws.send(JSON.stringify([vs.me.st]));
                }
            }), delay: 0
        }, { func: effect((shot) => { if (shot.isme) { vs.on_box.forEach((b) => b.hit(vs.me)) } }), delay: 250 }, { func: effect((shot) => { if (shot.isme) { vs.on_box.forEach((b) => b.hit(vs.me)) } }), delay: 500 }
        ], "ブレイク"],
        ],
        [
            [2, 6, [
                { func: dKaiten(((1 / 3) * Math.PI), 0.03, 2.5, 0, 50, 0.5, 1.5, -1, 1, [0, 0]), delay: 0, drill: true },
                { func: dKaiten((- (1 / 3) * Math.PI), 0.03, 2.5, 0, 50, 0.5, 1.5, -1, 1, [0, 0]), delay: 0, drill: true },
                { func: dKaiten((- 1 * Math.PI), 0.03, 2.5, 0, 50, 0.5, 1.5, -1, 1, [0, 0]), delay: 0, drill: true },
                { func: dKaiten((- (2 / 3) * Math.PI), 0.03, 2.5, 0, 25, 0.25, 1.5, -1, 1, [0, 0]), delay: 0, drill: true },
                { func: dKaiten(((2 / 3) * Math.PI), 0.03, 2.5, 0, 25, 0.25, 1.5, -1, 1, [0, 0]), delay: 0, drill: true },
                { func: dKaiten((0 * Math.PI), 0.03, 2.5, 0, 25, 0.25, 1.5, -1, 1, [0, 0]), delay: 0, drill: true }
            ], "デルタ？"],
            [2, 4, [
                { func: dKaiten((0 * Math.PI), 0.03, 2.5, 0, 50, 0.5, 1.5, -1, 1, [0, 0]), delay: 0, drill: true },
                { func: dKaiten((-0.5 * Math.PI), 0.03, 2.5, 0, 50, 0.5, 1.5, -1, 1, [0, 0]), delay: 0, drill: true },
                { func: dKaiten((-1 * Math.PI), 0.03, 2.5, 0, 50, 0.5, 1.5, -1, 1, [0, 0]), delay: 0, drill: true },
                { func: dKaiten((0.5 * Math.PI), 0.03, 2.5, 0, 50, 0.5, 1.5, -1, 1, [0, 0]), delay: 0, drill: true },
            ], "スクエア？"],
            [2, 5, [
                { func: dKaiten((-(1 / 3) * Math.PI), -0.03, 4, 0, 50, 0, 1.5, -1, 1, [50, 40]), delay: 0, drill: true },
                { func: dKaiten(((1 / 3) * Math.PI), -0.03, 4, 0, 50, 0, 1.5, -1, 1, [50, 40]), delay: 0, drill: true },
                { func: dKaiten((1 * Math.PI), -0.03, 4, 0, 50, 0, 1.5, -1, 1, [50, 40]), delay: 0, drill: true },
                { func: dKaiten((-(2 / 3) * Math.PI), 0.03, 4, 0, 50, 0, 1.5, -1, 1, [-50, 40]), delay: 0, drill: true },
                { func: dKaiten(((2 / 3) * Math.PI), 0.03, 4, 0, 50, 0, 1.5, -1, 1, [-50, 40]), delay: 0, drill: true },
                { func: dKaiten((0 * Math.PI), 0.03, 4, 0, 50, 0, 1.5, -1, 1, [-50, 40]), delay: 0, drill: true }
            ], "デルタツイン？"],
            [2, 2, [
                { func: effect((shot) => { if (shot.isme) { vs.me.st.speed += 10 } }), delay: 100 }
            ], "ファスト"],
        ],
        [[2, 9, [
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
        ], "ヘキサ？"],
        [2, 8, [
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
        ], "クロック"],
        [2, 8, [{
            func: effect((shot) => {
                if (shot.isme) {
                    if (vs.me.god) {
                        if (vs.me.god > 10) {
                            vs.status("Lose...");
                            vs.ws.send("[0,null,1]");
                            vs.stop();
                        }
                        vs.me.god++
                        vs.status(10 - vs.me.god)
                    } else {
                        vs.me.hit = (s) => {
                            vs.me.god++
                            vs.status(10 - vs.me.god)
                            if (s == 1 && vs.start == 1 && (vs.me.god > 10)) {
                                vs.status("Lose...");
                                vs.ws.send("[0,null,1]");
                                vs.stop();
                                clearInterval(vs.me._anime);
                                clearInterval(vs.me._move);
                                Star.rotation = Math.PI / 2;
                            } else if (s == 2) {
                                vs.me.st.p += 1;
                                vs.me.st.speed += 0.3;
                                p_skill(vs.me);
                            };
                        }; vs.me.god = 1
                    }
                } else {
                    if (globalThis._100) {
                        vs.shotBegin(vs.me, 1);
                        vs.shotBegin(vs.me, 2);
                        return
                    }
                    let _lose = 100
                    globalThis._100 = setInterval(() => {
                        vs.status(`残り ${_lose}秒`);
                        _lose--;
                    }, 1000)
                    setTimeout(() => {
                        clearInterval(_100)
                        vs.status("Lose...");
                        vs.ws.send("[0,null,1]");
                        vs.stop();
                        clearInterval(vs.me._anime);
                        clearInterval(vs.me._move);
                        Star.rotation = Math.PI / 2;
                    }, 1000 * 100)
                    vs.me.st.d = 0;
                    vs.me.forrowMouse = false;
                }
            }), delay: 25
        }], "かみ"],
        ]
    ],
    [ //14 ピエロ
        [
            [0, 2, [
                { func: dFunc(0, 17.7, 3), delay: 0 }
            ], "ピエロショット"],
        ],
        [
            [2, 4, [
                { func: mirror(0, 17.7, 3), delay: 0 }
            ], "ミラーショット"],
        ],
        [
            [2, 5, [
                { func: damashi(17.7, 1, 3, 1.5), delay: 0 },
                { func: damashi(17.7, 0, 3, 1.5), delay: 0, }
            ], "だましダブル"],
            [2, 6, [
                { func: sprit(0, 17.7, 3, 1), delay: 0 },
                { func: sprit(0, 17.7, 3, -1), delay: 0 }
            ], "スプリットマジック"]
        ],
    ],
    [//15 カピバラ
        [
            [0, 0, rush(), "よいどれラッシュ"],
            [0, 0, rush(1), "ドリルラッシュ"],
        ],
        [
            [0, 0, syuki(), "よいどれショット"]
        ],
        [
            [0, 0, syuki(), "よいどれショット"]
        ]],
    [ //16 ムーン
        [
            [0, 3, [
                { func: curve(1.5, 0.9, 9.7), delay: 0, drill: true }
            ], "ドリルカーブ"],
            [0, 3, [
                { func: yura(1.8, 1, 20), delay: 0, drill: true }
            ], "ゆらゆらドリル"],
        ],
        [
            [2, 5, [
                { func: curve(5.4, 0.178, 16.8), delay: 0 }
            ], "ムーンサルト"],
            [2, 6, [
                { func: curve(-5.4, 0.178, 17.4), delay: 0, drill: true }
            ], "ドリルムーン"],
        ],
        [
            [2, 8, m_spread(), "ムーンスプレッド"],
            [3, 8, happon(1), "ムーンエイト"],
        ],
    ],
    [ //17 カニ
        [
            [0, 3, [
                { func: dFunc(0, 5, 1.5), delay: 0 },
                { func: dFunc(0, 9, 1.5), delay: 0 },
                { func: dFunc(0, 13, 1.5), delay: 0 },
            ], "あわショット"],
            [0, 3, [
                { func: dKaiten(0, 0.35, 4), delay: 0 },
                { func: dKaiten(Math.PI, 0.35, 4), delay: 0 }
            ], "あわリング"],
        ],
        [
            [2, 6, awa_spr(), "あわスプレー"],
            [2, 6, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(e => ({ func: dFunc(0, 4 + 1.7 * e, 1.5), delay: 0 })),
                "あわウォール"],
        ],
        [
            [2, 8, awa_spread(), "あわはなび"],
            [2, 8, awa_ring(), "あわサイクロン"]
        ],
    ],
    [ //18 双子
        [
            [0, 3, [
                { func: curve(0.6, 1.1, 11), delay: 0 },
                { func: curve(-0.6, 1.1, 11), delay: 0 }
            ], "ダブルショット"],
            [0, 2, [
                { func: curve(0.6, 1.1, 6), delay: 0 },
                { func: curve(-0.6, 1.1, 6), delay: 0 }
            ], "しょぼダブル"],
        ],
        [
            [2, 4, [
                { func: dFunc(0, 20, 3, 0, [240, -50]), delay: 250 },
                { func: dFunc(0, 20, 3, 0, [120, -50]), delay: 250 },
                { func: dFunc(0, 20, 3, 0, [-120, -50]), delay: 250 },
                { func: dFunc(0, 20, 3, 0, [-240, -50]), delay: 250 }
            ], "サイドアタック"],
            [2, 5, [
                { func: dFunc(0, 25, 3, 0, [240, -60]), delay: 250, drill: true },
                { func: dFunc(0, 25, 3, 0, [120, -60]), delay: 250, drill: true },
                { func: dFunc(0, 25, 3, 0, [-120, -60]), delay: 250, drill: true },
                { func: dFunc(0, 25, 3, 0, [-240, -60]), delay: 250, drill: true }
            ], "サイドドリル"],
        ],
        [
            [2, 8, [
                { func: curve(5.8, 0.23, 17), delay: 0 },
                { func: curve(-5.8, 0.23, 17), delay: 0 }
            ], "ダブルムーン"],
            [3, 8, awa_ringx(),
                "あわハリケーン"],
            [3, 9, [
                { func: dFunc(13.3, 30, 3, 0, [-140, -200]), drill: true },
                { func: dFunc(-13.3, 30, 3, 0, [140, -200]), drill: true },
                { func: dFunc(13.3, 30, 3, 0, [-300, -200]), drill: true },
                { func: dFunc(-13.3, 30, 3, 0, [300, -200]), drill: true }
            ], "スーパークロス"]
        ],
    ],
    0[//19 ファントム
    [
        []
    ]],
    [//20 ニワトリ
        [
            [0, 3, [
                { func: lcurve(2.5, 0.09, 18.5, 3, [7, -5], 3) },
                { func: lcurve(0.6, 0.2, 19, 3, [-2, 1], 9) }
            ], "未はばたき"]
        ],
        [
            [2, 6, [
                { func: lcurve(14, 0.01, 4, 3, [0, -60], -26, 2.7), delay: 100 },
                { func: lcurve(11, 0.021, 9.8, 3, [6, -45], -13.6, 1.7), delay: 100 },
                { func: lcurve(4.6, 0.06, 16, 3, [5, -20], -4.5), delay: 100 },
                { func: lcurve(2.4, 0.07, 18, 3, [7, -5], 1), delay: 100 },
                { func: lcurve(0.3, 0.0001, 18.5, 3, [0, 1], 6.3), delay: 100 },
                { func: lcurve(0.3, 0.00001, 14, 3, [-3, 1], 24, 1.3), delay: 100 }
            ], "未ビッグウィング"]
        ],
        [
            [2, 8, [
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
            ], "未ダブルウィング"]
        ]
    ],
    [//21 サソリ
        [
            [0, 0, [
                { func: daen2(420, 40, 0.012, 3, 380) }
            ], "ブーメラン"],
            [0, 3, [
                { func: daen2(420, 120, 0.009, 3, 380) }
            ], "スローブーメラン"]
        ],
        [
            [2, 4, [
                { func: daen2(390, 380, 0.014, 3, 360), delay: 50 }
            ], "オオガマ"],
            [2, 6, [
                { func: dFunc(-4, 18.9, 1.5, 0, [0, -10]), delay: 0, drill: true },
                { func: dFunc(-7.27, 17.87, 1.5, 0, [0, -10]), delay: 0, drill: true },
                { func: dFunc(4, 18.9, 1.5, 0, [0, -10]), delay: 0, drill: true },
                { func: dFunc(7.27, 17.87, 1.5, 0, [0, -10]), delay: 0, drill: true }
            ], "ハサミショット"]
        ],
        [
            [2, 8, [
                { func: dFunc(-6, 28.35, 1.5, 0, [0, -10]), delay: 100, drill: true },
                { func: dFunc(-11.1, 26.76, 1.5, 0, [0, -10]), delay: 100, drill: true },
                { func: dFunc(-15.81, 24.285, 1.5, 0, [0, -10]), delay: 100, drill: true },
                { func: dFunc(6, 28.35, 1.5, 0, [0, -10]), delay: 100, drill: true },
                { func: dFunc(11.1, 26.76, 1.5, 0, [0, -10]), delay: 100, drill: true },
                { func: dFunc(15.81, 24.285, 1.5, 0, [0, -10]), delay: 100, drill: true }
            ], "ハサミアタック"],
            [2, 10, [
                { func: daen2(420, 120, 0.014, 3, 380) },
                { func: daen2(420, 200, 0.017, 3, 380) },
                { func: daen2(420, 280, 0.02, 3, 380) },
                { func: daen2(420, -120, 0.014, 3, 380) },
                { func: daen2(420, -200, 0.017, 3, 380) },
                { func: daen2(420, -280, 0.02, 3, 380) }
            ], "試ジャグリング"]
        ]],
    [//22 カカシ
        [
            [0, 1, [
                { func: dFunc(0, 2, 3), delay: 0 }
            ], "しょぼショット"],
            [0, 1, [
                { func: dFunc(0, 2, 3), delay: 0 }
            ], "スーパースロー"],
        ],
        [
            [2, 3, [
                { func: dFunc(0, 19.8, 3), delay: 0 },
                { func: dFunc(0, 19.8, 3), delay: 160, }
            ], "にれんぱつ"]
        ], [

            [2, 8, danmaku(5, 1),
                "試カカシだんまく(ドリルだけ)"]
        ]],
    [//23 オウシ
        [
            [0, 2, [
                { func: kasoku(-0.015, 0.295, 5, 0, [65, -70]) }
            ], "ジャブ"]
        ],
        [
            [2, 4, [
                { func: kasoku2(0.00235, 0.95, 5, 0, [-100, -150]), delay: 50 }
            ], "ストレート"],
            [2, 4, [
                { func: huurie() }
            ], "フットワーク"],
            [2, 5, [
                { func: kasoku4(14, -0.000168, 0.95, 5, 0, [40, -170]), delay: 110 }
            ], "フック"],
        ],
        [
            [2, 7, [
                { func: kasoku3(0.15, 0.015, 18, 0, [-150, -70]), delay: 500, drill: true }
            ], "カミソリアッパー"],
            [3, 8, [
                { func: kasoku5(14, -0.000168, 0.95, 5, 0, [40, -170]), delay: 110 },
                { func: kasoku5(14, -0.000168, 0.95, 5, 0, [40, -170]), delay: 150 },
                { func: kasoku5(14, -0.000168, 0.95, 5, 0, [40, -170]), delay: 190 },
                { func: kasoku5(-14, 0.0168, 0.95, 5, 0, [40, -170]), delay: 110 },
                { func: kasoku5(-14, 0.0168, 0.95, 5, 0, [40, -170]), delay: 150 },
                { func: kasoku5(-14, 0.0168, 0.95, 5, 0, [40, -170]), delay: 190 }
            ], "デンプシーロール"]
        ]],
    [//24 Virgo
    [
        [0, 0, [
            { func: curve(0.2, 2, 10, 1.5, [-300, -210]), delay: 0 },
            { func: curve(0.2, 2, 10, 1.5, [-1500 / 7, -180]), delay: 0 },
            { func: curve(0.2, 2, 10, 1.5, [-900 / 7, -150]), delay: 0 },
            { func: curve(0.2, 2, 10, 1.5, [-300 / 7, -120]), delay: 0 },
            { func: curve(0.2, 2, 10, 1.5, [300 / 7, -90]), delay: 0 },
            { func: curve(0.2, 2, 10, 1.5, [900 / 7, -60]), delay: 0 },
            { func: curve(0.2, 2, 10, 1.5, [1500 / 7, -30]), delay: 0 },
            { func: curve(0.2, 2, 10, 1.5, [300, 0]), delay: 0 }
        ], "試ウェーブ"]
    ],
    [
        [6, 10, [
            { func: yura(1.11, 1.73, 22, 3, [-300, 0]), delay: 0 }
        ], "つよじゅっぽん"]
    ],
    [
        [6, 10, [
            { func: yura(1.11, 1.73, 22, 3, [-300, 0]), delay: 0 }
        ], "つよじゅっぽん"]
    ]],
    0,
    [//26 ミズガメ
    [
        [0, 0, [{ func: tubo() }], "ツボショット"]
    ],
    [
        [0, 0, [{ func: tubo() }], "ツボショット"]
    ],
    [
        [0, 0, [{ func: tubo() }], "ツボショット"]
    ]],
    [//27 ペルセウス
        [
            [0, 3, [
                { func: dFunc(0, 20, 1.5, 0, [-52, -50]), delay: 0 },
                { func: dFunc(0, 20, 1.5, 0, [52, -50]), delay: 250, drill: true }
            ], "なげナイフ"],
            [0, 3, [
                { func: inazuma() }
            ], "イナズマぎり"]
        ],
        [
            [2, 6, [
                { func: dKaitenFuncif(18.5, (0.003) * Math.PI, (3 / 10) * Math.PI, (0.0545 / 10) * Math.PI, 0, 0, 0, 4, 12, 0, 1.5, [0, -50]) },
                { func: dKaitenFuncif(18.5, (0.003) * Math.PI, (1 / 10) * Math.PI, (0.0545 / 10) * Math.PI, 0, 0, 0, 4, 12, 0, 1.5, [0, -50]) },
                { func: dKaitenFuncif(18.5, (0.003) * Math.PI, (-1 / 10) * Math.PI, (0.0545 / 10) * Math.PI, 0, 0, 0, 4, 12, 0, 1.5, [0, -50]) },
                { func: dKaitenFuncif(18.5, (0.003) * Math.PI, (-3 / 10) * Math.PI, (0.0545 / 10) * Math.PI, 0, 0, 0, 4, 12, 0, 1.5, [0, -50]) },
                { func: dKaitenFuncif(18.5, (0.003) * Math.PI, (-5 / 10) * Math.PI, (0.0545 / 10) * Math.PI, 0, 0, 0, 4, 12, 0, 1.5, [0, -50]) },
                { func: dKaitenFuncif(18.5, (0.003) * Math.PI, (-7 / 10) * Math.PI, (0.0545 / 10) * Math.PI, 0, 0, 0, 4, 12, 0, 1.5, [0, -50]) },
                { func: dKaitenFuncif(18.5, (0.003) * Math.PI, (-9 / 10) * Math.PI, (0.0545 / 10) * Math.PI, 0, 0, 0, 4, 12, 0, 1.5, [0, -50]) },
                { func: dKaitenFuncif(18.5, (0.003) * Math.PI, (9 / 10) * Math.PI, (0.0545 / 10) * Math.PI, 0, 0, 0, 4, 12, 0, 3, [0, -50]), delay: 0, drill: true }
            ], "ハルパー"],
            [2, 4, [
                { func: dFuncif(0, 0, 90, 100, 30, 0, 6, [-320, -50]), drill: true },
                { func: dFuncif(0, 0, -90, 100, 30, 0, 6, [320, -50]), drill: true }
            ], "エックスぎり"],
        ],
        [
            [2, 8, [
                { func: dFuncif(0, 0, -15, 900 / 17, 30, 0, 3, [90, 0]) },
                { func: dFuncif(0, 0, 15, 900 / 17, 40, 0, 3, [-90, 0]) },
                { func: dFuncif(0, 0, -517.5 / 17, 900 / 17, 50, 0, 3, [180, 0]) },
                { func: dFuncif(0, 0, 517.5 / 17, 900 / 17, 60, 0, 3, [-180, 0]) },
                { func: dFuncif(0, 0, -780 / 17, 900 / 17, 70, 0, 3, [270, 0]) },
                { func: dFuncif(0, 0, 780 / 17, 900 / 17, 80, 0, 3, [-270, 0]) }
            ], "つるぎのまい"],
            [3, 9, [
                { func: daen2(420, 0, 0.044, 3, 380) }
            ], "試ツバメがえし"]
        ]]
];

function huurie(x = 100, dx = 1, size = 3) {
    return (t) => {
        return [
            -(4 * x / Math.PI) * (Math.sin(t * dx / 9) + Math.sin(t * dx * 3 / 9) / 3 + Math.sin(t * dx * 5 / 9) / 5 + Math.sin(t * dx * 7 / 9) / 7 + Math.sin(t * dx * 9 / 9) / 9), (t * dx * Math.PI) * 3, size,
        ];
    };
}
function inazuma(dy = 0.4, size = 3, x = 53, speed = 9.3) {
    return (t) => {
        return [
            -(8 * x / (Math.PI * Math.PI)) * (Math.sin(t * dy / 2) - Math.sin(t * dy * 3 / 2) / 9 + Math.sin(t * dy * 5 / 2) / 25 - Math.sin(t * dy * 7 / 2) / 49 + Math.sin(t * dy * 9 / 2) / 81 - Math.sin(t * dy * 11 / 2) / 121 + Math.sin(t * dy * 13 / 2) / 169 - Math.sin(t * dy * 15 / 2) / 225 + Math.sin(t * dy * 17 / 2) / 289 - Math.sin(t * dy * 19 / 2) / 361 + Math.sin(t * dy * 21 / 2) / 441),
            (t * dy * Math.PI) * speed,
            size,
        ]
    }
}
function sinaru(s = 6, w = 10, speed = 1, size = 3, [x, y] = [0, 0], z = -100) {
    return (t) => {
        return [(- (1 / s) * ((t * speed) - z) * ((t * speed) - w)) - x, (t * speed) - y, size];
    };

}
function daen2(p = 360, q = 40, speed = 0.015, size = 3, z = 300) {
    return (t) => {
        if ((t * speed) <= 2) { return [q * Math.sin(t * Math.PI * speed), - p * Math.cos(t * Math.PI * speed) + z, size]; }
        else (2 <= (t * speed))
        { return [0, -140000000, size]; }
    };

}

function tubo(speed = 0.01, size = 3, [x, y] = [0, 0]) {
    return (t) => {
        return [((((t * speed - 548) / 5) * ((t * speed - 548) / 5) * ((t * speed - 548) / 5) / 3) - 1600 * ((t * speed - 548) / 5)) / 500 - x - 526, (t * speed) - y, size];
    };

}
function lcurve(h = 1, w = 1.1, s = 13, size = 3, [x, y] = [0, 0], zurasi = 0, dy = 0) {
    return (t) => {
        return [Math.sin(t * w / 5.7) * h * 50 + x - zurasi * t / 10, t * s / 10 * 4 + y + t * dy, size];
    };

}
function rlcurve(h = 1, w = 1.1, s = 13, size = 3, [x, y] = [0, 0], zurasi = 0, dy = 0) {
    return (t) => {
        return [-(Math.sin(t * w / 5.7) * h * 50 + x - zurasi * t / 10), t * s / 10 * 4 + y + t * dy, size];
    };

}
function yura(h = 1, w = 1.1, s = 13, size = 3, [x, y] = [0, 0]) {
    return (t) => {
        return [
            -Math.sin(t * w / 20) * h * 45 + (Math.sin(t * w / 50) * 15 * h) + x,
            t * s / 10 * 2 + y,
            size,
        ];
    };
}

function charge(s = 1, size = 3) {
    return (t) => {
        return [
            0,
            2000 - s * 10000 / (t / 30 + 5),
            size,
        ];
    };
}
function syuki(dx1 = 4, dx2 = -5, dx3 = 9.5, dx4 = -7.2, dx5 = -3.5, dx6 = 7.2, dx7 = 3.5, dy1 = 19, dy2 = 19, dy3 = 19, dy4 = 19, dy5 = 19, dy6 = 19, dy7 = 19, size = 3, add = 0, [x, y] = [0, 0], i = 0) {
    i++;
    const a = [];
    switch (i % 7) {
        case 1:
            a.push({ func: dFunc(dx1, dy1, size, add, [x, y]), delay: 0 });
            break;
        case 2:
            a.push({ func: dFunc(dx2, dy2, size, add, [x, y]), delay: 0 });
            break;
        case 3:
            a.push({ func: dFunc(dx3, dy3, size, add, [x, y]), delay: 0 });
            break;
        case 4:
            a.push({ func: dFunc(dx4, dy4, size, add, [x, y]), delay: 0 });
            break;
        case 5:
            a.push({ func: dFunc(dx5, dy5, size, add, [x, y]), delay: 0 });
            break;
        case 6:
            a.push({ func: dFunc(dx6, dy6, size, add, [x, y]), delay: 0 });
            break;
        case 0:
            a.push({ func: dFunc(dx7, dy7, size, add, [x, y]), delay: 0 });
            break;
    }
    return a;
}
function rush(abc = 0, dx1 = 4, dx2 = -5, dx3 = 9.5, dx4 = -7.2, dx5 = -3.5, dx6 = 7.2, dx7 = 3.5,
    dy1 = 19, dy2 = 19, dy3 = 19, dy4 = 19, dy5 = 19, dy6 = 19, dy7 = 19,
    size = 3, add = 0, [x, y] = [0, 0]) {

    if (typeof rush.i === 'undefined') {
        rush.i = 0;
    }

    rush.i++;
    const a = [];

    switch (rush.i % 7) {
        case 1:
            a.push({ func: dFunc(dx1, dy1, size, add, [x, y]), delay: 50, drill: abc });
        case 2:
            a.push({ func: dFunc(dx2, dy2, size, add, [x, y]), delay: 200, drill: abc });
        case 3:
            a.push({ func: dFunc(dx3, dy3, size, add, [x, y]), delay: 350, drill: abc });
        case 4:
            a.push({ func: dFunc(dx4, dy4, size, add, [x, y]), delay: 500, drill: abc });
        case 5:
            a.push({ func: dFunc(dx5, dy5, size, add, [x, y]), delay: 650, drill: abc });
        case 6:
            a.push({ func: dFunc(dx6, dy6, size, add, [x, y]), delay: 800, drill: abc });
        case 0:
            a.push({ func: dFunc(dx7, dy7, size, add, [x, y]), delay: 950, drill: abc });
    }
    return a;
}

function danmaku(x = 6, drilll = 0) {
    const a = [];
    for (let i = 0; i < x; i++) {
        a.push({ func: dFunc(-2, 5, 1), delay: i * 800 + 200, drill: drilll });
        a.push({ func: dFunc(-1.5, 5, 1), delay: i * 800 + 400, drill: drilll });
        a.push({ func: dFunc(-1, 5, 1), delay: i * 800 + 800, drill: drilll });
        a.push({ func: dFunc(0, 5, 1), delay: i * 800 + 400, drill: drilll });
        a.push({ func: dFunc(1, 5, 1), delay: i * 800 + 200, drill: drilll });
        a.push({ func: dFunc(1.5, 5, 1), delay: i * 800 + 400, drill: drilll });
        a.push({ func: dFunc(2, 5, 1), delay: i * 800 + 600, drill: drilll });
    }
    return a;
}
function name_spread() {
    const s = 3;
    const a = [];
    for (let i = 0; i < 30; i++) {
        a.push({
            func: dFunc(
                Math.sin(Math.PI / 15 * i) * s,
                Math.cos(Math.PI / 15 * i) * s,
                1.5,
                20,
            ),
            delay: 200,
        });
    }
    return a;
}
function awa_spread() {
    const s1 = 4, s2 = 5, ds = 3;
    const a = [];
    for (let i = 0; i < 11; i++) {
        [0, 1, 2, 3, 4].forEach(e => {
            a.push({
                func: dFunc(
                    Math.sin(Math.PI / 5.5 * i) * (ds * e + s1),
                    Math.cos(Math.PI / 5.5 * i) * (ds * e + s1),
                    1.5,
                    0,
                ),
                delay: 400,
            });
        })
    }
    for (let i = 0; i < 11; i++) {
        [0, 1, 2, 3].forEach(e => {
            a.push({
                func: dFunc(
                    Math.sin(Math.PI / 5.5 * (i + 0.5)) * (ds * e + s2),
                    Math.cos(Math.PI / 5.5 * (i + 0.5)) * (ds * e + s2),
                    1.5,
                    0,
                ),
                delay: 400,
            });
        })
    }
    return a;
}


function awa_spr() {
    const a = []
    for (let i = 0; i < 4; i++) {
        [0.5, 0, -0.5].forEach(e => {
            a.push({
                func: dFunc(
                    Math.sin(Math.PI / 6 * e) * (1.7 * i + 4),
                    Math.cos(Math.PI / 6 * e) * (1.7 * i + 4),
                    1.5,
                    0,
                ),
                delay: 0,
            });
        })
    }
    return a;
}

function awa_ring() {
    const a = []
    for (let i = 0; i < 8; i++) {
        a.push({
            func: dKaiten(
                Math.PI / 4 * i,
                0.1,
                7,
                0,
                7,
                1.5,
            ),
            delay: 400,
        });
    }
    return a;
}
function awa_ringx() {
    const a = []
    for (let i = 0; i < 10; i++) {
        a.push({
            func: dKaiten(
                Math.PI / 5 * i,
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
    const a = []
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
function happon(drill = 0) {
    const a = [];
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
    const a = [];
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
    const a = [];
    a.push({ func: curve(4, 0.5, 12), delay: 250 });
    a.push({ func: curve(4.4, 0.5, 12), delay: 250 });
    a.push({ func: curve(4.8, 0.5, 12), delay: 250 });
    a.push({ func: curve(5.2, 0.5, 12), delay: 250 });
    a.push({ func: curve(5.6, 0.5, 12), delay: 250 });
    return a;
}
function i_spread() {
    const a = [];
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
    const a = [];
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


(async () => {
    window.Pstar = await PIXI.Assets.load(`/img/p.png`);
    window.Pstar.baseTexture.scaleMode = PIXI.SCALE_MODES.NEAREST;
    window.PBox = [
        await PIXI.Assets.load(`/img/1b.png`),
        await PIXI.Assets.load(`/img/2b.png`),
        await PIXI.Assets.load(`/img/3b.png`),
    ];
})();