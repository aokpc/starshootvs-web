// deno-lint-ignore-file
/// <reference lib="dom"/>
import { PIXI } from "./pixi.ts";
import { p2m } from "./star_code.ts";
import type {
    boxRule,
    SkillDef,
    St,
    Star,
    TextureSet,
} from "./types.ts";
import { chara_list, load_skill, p_skill, skill_list } from "./skill.ts";
import { P } from "./P.ts";
import { Box } from "./Box.ts";
import { GameSocket } from "./GameSocket.ts";
import { Skill } from "./Shot.ts";
import { Structure } from "./structure.ts";
import { structs } from "./struct.ts";
import { createP2PSocket, P2PSocket } from "./P2PSocket.ts";
import { tapEventEmitter } from "./tap.ts";

oncontextmenu = (e) => e.preventDefault();

export let app: PIXI.Application<PIXI.Renderer>;
let UI: string;
export let pbox: PIXI.Texture[];
const bgm = new Audio();
document.body.appendChild(bgm);
let bgm_home: string;
let bgm_battle: string;

export let pstar: PIXI.Texture;
export const RGB_ME = 0x29B6F6;
export const RGB_ENEMY = 0xEF5350;
let chara = 0;
const url = new URL(location.href);
let ver = 0;
let debug: Game;
export let textureSet: TextureSet;
/*
export const boxsize = 1.15
const speed = 7
const cost_speed = 0.5
export const p_speed = 1.6
export const psize = 25
export const box_speeds = [2.5, 1.2, 1];
export const shot_speed = 1
const skill_delay = 400
const network_delay = 100

*/
export const boxsize = 1.15
const speed = 7
const cost_speed = 0.5
export const p_speed = 1.6
export const psize = 25
export const box_speeds = [2.5, 1.2, 1];
export const shot_speed = 1
const skill_delay = 400
export const network_delay = 200

const Dapp = new PIXI.Application();
addEventListener("click", () => { bgm.play() }, { once: true });
(async () => {
    await Dapp.init({ background: "#000000" });
    UI = await fetch("/ui.html").then((res) => res.text());
    ver = parseInt(await fetch("/ver").then((res) => res.text()));
    document.getElementById("ver")!.innerText = `ver.${new Date(ver).toLocaleTimeString()
        } (${ver})`;
    document.getElementById("st")!.innerText = `${await fetch("/online").then((res) => res.text())}オンライン ${await fetch("/rooms").then((res) => res.json()).then((e) => Object.keys(e).length)}にんがプレイちゅう`;
})();

setInterval(async () => {
    const st = document.getElementById("st");
    if (st) st.innerText = `${await fetch("/online").then((res) => res.text())}オンライン ${await fetch("/rooms").then((res) => res.json()).then((e) => Object.keys(e).length)}にんがプレイちゅう`;
}, 3 * 1000)

function colorx(rgb: number, x: number) {
    const r = Math.floor(((rgb & 0xff0000) >> 16) * x);
    const g = Math.floor(((rgb & 0x00ff00) >> 8) * x);
    const b = Math.floor((rgb & 0x0000ff) * x);
    return (r << 16) + (g << 8) + b;
}

async function checkVer() {
    const res = await fetch("/ver");
    const i = await res.text();
    if (ver !== parseInt(i)) {
        alert("バージョンが更新されました。再読み込みします");
        location.reload();
    }
}

setTimeout(select, 100);

function sleep(t: number) {
    return new Promise((resolve, reject) => {
        setTimeout(resolve, t);
    });
}

/*
function select() {
    const stars = ["starfish", "rabbit", "octopus", "ghost", "mole", "whale", "frog", "slug", "sheep", "squid", "leo", "sagittarius", "pisces", "libra", "cl", "c", "m", "cr", "g", "ph", "ch", "sc", "kk", "b", "v", "ca", "aq", "pe","kuro"]
    stars.forEach((e, i) => {
        if (i > 13 && (!(globalThis as any).kakin)) {
            return
        }
        document.getElementById("select")!.innerHTML += `<button type="button" style="background-color: #0000;" onclick="skillSelect(${i})"><img style="width: 85px;" src="/img/${e}1.png" alt=""></button>`
    })
}
*/
function select() {
    const stars = [
        "starfish",
        "rabbit",
        "octopus",
        "ghost",
        "mole",
        "whale",
        "frog",
        "slug",
        "sheep",
        "squid",
        "leo",
        "sagittarius",
        "pisces",
        "libra",
        "cl",
        "c",
        "m",
        "cr",
        "g",
        "ph",
        "ch",
        "sc",
        "kk",
        "b",
        "v",
        "ca",
        "aq",
        "pe",
    ];
    stars.forEach((e, i) => {
        if (i > 13 && (!(globalThis as any).kakin)) {
            return;
        }
        document.getElementById("select")!.innerHTML +=
            `<button type="button" style="background-color: #0000;" onclick="skillSelect(${i})"><img style="width: 85px;" src="/img/${e}1.png" alt=""></button>`;
    });
}
export function skillSelect(i: number) {
    if ((globalThis as any).dev) {
        for (
            let i = 1;
            i < document.getElementById("select")!.childNodes.length;
            i++
        ) {
            (document.getElementById("select")!.childNodes[i] as HTMLElement)
                .style.backgroundColor = "#000";
        }
        (document.getElementById("select")!.childNodes[i + 1] as HTMLElement)
            .style.backgroundColor = "#29B6F6";

        document.getElementById("skill-select0")!.innerHTML = "";
        Object.keys(skill_list).forEach((e) => {
            const skill = skill_list[parseInt(e)];
            document.getElementById("skill-select0")!.innerHTML +=
                `<option value="${e}">${e} ${skill.name} [${skill.X ? "X" : skill.cost
                }] ${"P".repeat(skill.p)}</option>`;
        });

        document.getElementById("skill-select1")!.innerHTML = "";
        Object.keys(skill_list).forEach((e) => {
            const skill = skill_list[parseInt(e)];
            document.getElementById("skill-select1")!.innerHTML +=
                `<option value="${e}">${e} ${skill.name} [${skill.X ? "X" : skill.cost
                }] ${"P".repeat(skill.p)}</option>`;
        });

        document.getElementById("skill-select2")!.innerHTML = "";
        Object.keys(skill_list).forEach((e) => {
            const skill = skill_list[parseInt(e)];
            document.getElementById("skill-select2")!.innerHTML +=
                `<option value="${e}">${e} ${skill.name} [${skill.X ? "X" : skill.cost
                }] ${"P".repeat(skill.p)}</option>`;
        });

        document.getElementById("run")!.innerHTML =
            '<input style="margin:10px 0 10px 0;" class="input" id="id" placeholder="ルーム ID" type="text"><button type="button" onclick="run()" class="run">▶︎あそぶ</button>';
        if ((window as any).kakin) {
            document.getElementById("run")!.innerHTML =
                '<input style="margin:10px 0 10px 0;" class="input" id="id" placeholder="ルーム ID" type="text"><input style="margin:10px 0 10px 0;" class="input" id="custom" placeholder="カスタムせいじん(<Skin1>+<Skin2>)" value="" type="text"><button type="button" onclick="preview()" style="margin:10px 0 10px 0;" class="run">カスタムせいじんのプレビュー</button><button type="button" onclick="run()" style="margin:10px 0 10px 0;" class="run">▶︎あそぶ</button>';
        }
        (document.getElementById("id") as HTMLInputElement).value =
            url.searchParams.get("code") || "";
        return;
    }
    chara = i;
    const skills = chara_list[i];
    if (!skills.skill1.length) {
        skills.skill1 = chara_list[0].skill1;
    }
    if (!skills.skill2.length) {
        skills.skill2 = chara_list[0].skill2;
    }
    if (!skills.skill3.length) {
        skills.skill3 = chara_list[0].skill3;
    }
    for (
        let i = 1;
        i < document.getElementById("select")!.childNodes.length;
        i++
    ) {
        (document.getElementById("select")!.childNodes[i] as HTMLElement).style
            .backgroundColor = "#000";
    }
    (document.getElementById("select")!.childNodes[i + 1] as HTMLElement).style
        .backgroundColor = "#29B6F6";

    document.getElementById("skill-select0")!.innerHTML = "";
    skills.skill1.forEach((e) => {
        const skill = skill_list[e];
        document.getElementById("skill-select0")!.innerHTML +=
            `<option value="${e}">${skill.name} [${skill.X ? "X" : skill.cost
            }] ${"P".repeat(skill.p)}</option>`;
    });

    document.getElementById("skill-select1")!.innerHTML = "";
    skills.skill2.forEach((e) => {
        const skill = skill_list[e];
        document.getElementById("skill-select1")!.innerHTML +=
            `<option value="${e}">${skill.name} [${skill.X ? "X" : skill.cost
            }] ${"P".repeat(skill.p)}</option>`;
    });

    document.getElementById("skill-select2")!.innerHTML = "";
    skills.skill3.forEach((e) => {
        const skill = skill_list[e];
        document.getElementById("skill-select2")!.innerHTML +=
            `<option value="${e}">${skill.name} [${skill.X ? "X" : skill.cost
            }] ${"P".repeat(skill.p)}</option>`;
    });

    document.getElementById("run")!.innerHTML =
        '<input style="margin:10px 0 10px 0;" class="input" id="id" placeholder="ルーム ID" type="text"><button type="button" onclick="run()" class="run">▶︎あそぶ</button>';
    if ((window as any).kakin) {
        document.getElementById("run")!.innerHTML =
            '<input style="margin:10px 0 10px 0;" class="input" id="id" placeholder="ルーム ID" type="text"><input style="margin:10px 0 10px 0;" class="input" id="custom" placeholder="カスタムせいじん(<Skin1>+<Skin2>)" value="" type="text"><button type="button" onclick="preview()" style="margin:10px 0 10px 0;" class="run">カスタムせいじんのプレビュー</button><button type="button" onclick="run()" style="margin:10px 0 10px 0;" class="run">▶︎あそぶ</button>';
    }
    (document.getElementById("id") as HTMLInputElement).value =
        url.searchParams.get("code") || "";
}
function restart() {
    checkVer();
    bgm.src = bgm_home
    bgm.currentTime = 0
    bgm.play()
    document.getElementById("base")!.innerHTML =
        `<h1 style="text-align: center;"><img style="width: 500px;" src="/img/shiny_logo.gif" alt="">
        </h1>
        <h1 style="text-align: center;font-size: 30px;">
            キャラをせんたく
        </h1>
        <div id="select">
        </div>
        <h1 style="text-align: center;font-size: 30px;">
            スキルをせんたく
        </h1>
        <div id="skill-select">
            <select id="skill-select0"></select><select id="skill-select1"></select><select id="skill-select2"></select>
        </div>
        <div id="run"></div>
        <div id="preview"></div>
        <p id="st"></p>
        <p id="ver">ver.${new Date(ver).toLocaleTimeString()} (${ver})</p>`;
    select();
}
export async function run() {
    let code = "s" + (document.getElementById("id") as HTMLInputElement).value;
    const rooms = await fetch("/rooms").then((res) => res.json());
    if (rooms[code] === "start") {
        alert("重複したコードです!");
        return;
    }
    if (code === "s") {
        for (const k in rooms) {
            if (Object.hasOwnProperty.call(rooms, k)) {
                const e = rooms[k];
                if (e === "open" && k.substring(0, 1) === "o") {
                    code = k;
                    break;
                }
            }
        }
    }
    if (code === "s") {
        code = "o" + Math.floor(Math.random() * 0xffffff).toString(16);
    }
    start(chara, [
        Number(
            (document.getElementById("skill-select0") as HTMLInputElement)
                .value,
        ),
        Number(
            (document.getElementById("skill-select1") as HTMLInputElement)
                .value,
        ),
        Number(
            (document.getElementById("skill-select2") as HTMLInputElement)
                .value,
        ),
    ], code);
}
export async function preview() {
    document.getElementById("preview")!.innerHTML = "";
    const custom = document.getElementById("custom")
        ? (document.getElementById("custom") as HTMLInputElement).value.split(
            "+",
        )
        : [];
    if (custom.length !== 2) return;
    const img = [await pwToImgURL(custom[0]), await pwToImgURL(custom[1])];
    const el = new Image();
    el.setAttribute("style", "width:40vw;height:40vw;border:solid;");
    el.src = img[0];
    document.getElementById("preview")!.appendChild(el);
    const el2 = new Image();
    el2.setAttribute("style", "width:40vw;height:40vw;border:solid;");
    el2.src = img[1];
    document.getElementById("preview")!.appendChild(el2);
}
async function start(i: number, skill: [number, number, number], code: string) {
    await checkVer();
    const custom = document.getElementById("custom")
        ? (document.getElementById("custom") as HTMLInputElement).value.split(
            "+",
        )
        : [];
    const base = document.getElementById("base")!
    base.innerHTML = UI;
    app = new PIXI.Application();
    await app.init({
        background: "#000000",
        resizeTo: document.getElementById("shoot")!,
    });
    
    debug = new Game(i, skill, code, custom);
}

export class Game {
    start: number;
    socket_side: number;
    gs: GameSocket;
    codeHash: number = 0;
    me: Star;
    enemy: Star;
    stars: string[];
    statusTxt: HTMLElement;
    base: HTMLElement;
    on_box: Box[];
    on_p: P[];
    box_rules: boxRule;
    delete_box: boolean = false;
    _update: number = 0;
    mouse: { x: number } = { x: 0 };
    forrowMouse: boolean = false;
    skillcount: { 1: number; 2: number; 0: number } = { 1: 0, 2: 0, 0: 0 };
    constructor(
        i = 0,
        skill: [number, number, number] = [0, 0, 0],
        code = "play",
        custom: string[] | [] = [],
    ) {
        document.getElementById("base")!.style.backgroundColor = "#003";
        document.getElementById("shoot")!.appendChild(app.canvas);
        this.start = 0;
        this.socket_side = 0;
        this.gs = new GameSocket(
            this,
        );
        createP2PSocket(`${location.protocol.replace("http", "ws")}${location.host}/ws?${code}`).then(([ps, box]) => {
            this.codeHash = box;
            ps.addEventListener("close", () => {
                if (this.start != 2) {
                    this.stop();
                    this.status("かいせんがせつだんされました");
                    setTimeout(() => location.reload(), 1000);
                }
            });
            this.gs.initWithP2P(ps, box);
        })
        this.me = {
            w: 100,
            h: 100,
            cost: 0,
            cost_gage: document.getElementById("mcost")!,
            cost_txt: document.getElementById("mcostxt")!,
            hit: () => { },
            ishit: (x, y, r = 35) => {
                return ((x <= (this.me.st.position) &&
                    x > (this.me.st.position - r)) ||
                    (x > (this.me.st.position) &&
                        x < (this.me.st.position + r))) &&
                    ((y < (this.me.st.y) && y > (this.me.st.y - r)) ||
                        (y > (this.me.st.y) && y < (this.me.st.y + r)));
            },
            st: {
                position: 350,
                y: 860,
                d: 0,
                speed,
                alive: true,
                canShot: [1, 1, 1],
                p: 0,
                cost_speed: 0,
            },
            structures: [],
            i,
            skill_gage: [
                document.getElementById("skill-m1")!,
                document.getElementById("skill-m2")!,
                document.getElementById("skill-m3")!,
            ],
            skill_gage_cost: [
                document.getElementById("skill-cost-m1")!,
                document.getElementById("skill-cost-m2")!,
                document.getElementById("skill-cost-m3")!,
            ],
            custom: custom,
            skill: [],
            skill_select: skill,
            canShot(i) {
                if (i === 0) {
                    return !!(this.st.canShot[i] &&
                        (this.cost >= this.skill[i].cost * 100));
                } else if (i === 1) {
                    return !!(this.st.canShot[i] &&
                        (this.cost >= this.skill[i].cost * 100) &&
                        (this.st.p >= this.skill[i].p));
                } else if (i === 2) {
                    return !!(this.st.canShot[i] &&
                        (this.cost >= this.skill[i].cost * 100) &&
                        (this.st.p >=
                            (this.skill[1].p + this.skill[i].p)));
                }
                return false;
            },
            skills: {},
        };
        load_skill(this.me);
        this.enemy = {
            w: 100,
            h: 100,
            cost: 0,
            cost_gage: document.getElementById("ecost")!,
            cost_txt: document.getElementById("ecostxt")!,
            hit: () => { },
            ishit: (x, y, r = 35) => {
                r += 10;
                let nx = 700 - this.enemy.st.position;
                let ny = 1000 - this.enemy.st.y;
                return ((x < nx && x > (nx - r)) || (x > nx && x < (nx - r))) &&
                    ((y < ny && y > (ny - r)) || (y > ny && y < (ny + r)));
            },
            st: {
                position: 350,
                y: 900,
                d: 0,
                speed,
                alive: true,
                canShot: [1, 1, 1],
                p: 0,
                cost_speed: 0,
            },
            structures: [],
            i: 0,
            skill_gage: [
                document.getElementById("skill-e1")!,
                document.getElementById("skill-e2")!,
                document.getElementById("skill-e3")!,
            ],
            skill_gage_cost: [
                document.getElementById("skill-cost-e1")!,
                document.getElementById("skill-cost-e2")!,
                document.getElementById("skill-cost-e3")!,
            ],
            skill: [],
            custom: [],
            canShot(i) {
                if (i === 0) {
                    return !!(this.st.canShot[i] &&
                        (this.cost >= this.skill[i].cost * 100));
                } else if (i === 1) {
                    return !!(this.st.canShot[i] &&
                        (this.cost >= this.skill[i].cost * 100) &&
                        (this.st.p >= this.skill[i].p));
                } else if (i === 2) {
                    return !!(this.st.canShot[i] &&
                        (this.cost >= this.skill[i].cost * 100) &&
                        (this.st.p >=
                            (this.skill[1].p + this.skill[i].p)));
                }
                return false;
            },
            skills: {},
            skill_select: skill,
        };
        this.stars = [
            "starfish",
            "rabbit",
            "octopus",
            "ghost",
            "mole",
            "whale",
            "frog",
            "slug",
            "sheep",
            "squid",
            "leo",
            "sagittarius",
            "pisces",
            "libra",
            "cl",
            "c",
            "m",
            "cr",
            "g",
            "ph",
            "ch",
            "sc",
            "kk",
            "b",
            "v",
            "ca",
            "aq",
            "pe",
            "q",
            "0",
        ];
        this.chara(i, custom);
        this.statusTxt = document.getElementById("status")!;
        this.status(
            `コード ${code.substring(1)} であいてをさがしています...`,
        );
        this.cost(this.me);
        this.base = document.getElementById("base")!;
        this.on_box = [];
        this.on_p = [];
        this.box_rules = [
            [
                [1, -1, 1.42, 0],
                [2, 1, 2, 10],
                [1, 1, 2, -10],
                [1, -1, 2, 20],
                [2, 1, 2, 10],
                [3, -1, 2, -20],
                [1, 1, 2, -10],
                [2, -1, 3, -5],
                [3, 1, 3, 2],
                [1, -1, 2, -3],
                [3, -1, 4, 0],
                [3, 1, 4, 10],
                [2, -1, 4, -15],
                [3, 1, 4, 10],
                [3, -1, 4, 13],
                [3, 1, 4, -10],
                [3, -1, 4, -15],
            ],
            [
                [1, -1, 1.42, 0],
                [2, 1, 2, 10],
                [1, -1, 2, -10],
                [1, -1, 2, 20],
                [2, 1, 2, 20],
                [3, -1, 2, -20],
                [1, 1, 2, -10],
                [2, -1, 3, -5],
                [3, 1, 3, 12],
                [1, -1, 2, -3],
                [3, -1, 4, 0],
                [3, 1, 4, 10],
                [2, -1, 4, -15],
                [3, 1, 4, 10],
                [3, -1, 4, 13],
                [3, 1, 4, -10],
                [3, -1, 4, -15],
            ],
            [
                [1, -1, 1.42, 0],
                [2, -1, 2, 10],
                [1, 1, 2, -10],
                [1, 1, 2, 20],
                [2, 1, 2, 10],
                [3, -1, 2, -20],
                [1, 1, 2, -10],
                [2, -1, 3, -5],
                [3, 1, 3, 2],
                [1, -1, 2, -10],
                [3, -1, 4, 0],
                [3, 1, 4, 10],
                [2, -1, 4, -15],
                [3, 1, 4, 10],
                [3, -1, 4, 13],
                [3, 1, 4, -10],
                [3, -1, 4, -15],
            ],
            [
                [1, -1, 1.42, 0],
                [2, 1, 2, 10],
                [1, -1, 2, -10],
                [1, 1, 2, 20],
                [2, 1, 2, 3],
                [3, 1, 2, -20],
                [1, -1, 2, -10],
                [2, -1, 3, -5],
                [3, 1, 3, 2],
                [1, -1, 2, -3],
                [3, -1, 4, 0],
                [3, 1, 4, 10],
                [2, -1, 4, -15],
                [3, 1, 4, 10],
                [3, -1, 4, 13],
                [3, 1, 4, -10],
                [3, -1, 4, -15],
            ],
            [
                [1, -1, 1.42, 0],
                [2, 1, 2, 10],
                [1, 1, 2, -10],
                [3, -1, 2, 20],
                [2, 1, 2, 10],
                [3, -1, 2, -20],
                [2, 1, 2, -10],
                [2, -1, 3, -5],
                [3, 1, 3, 2],
                [1, -1, 2, -3],
                [3, -1, 4, 0],
                [3, 1, 4, 10],
                [2, -1, 4, -15],
                [3, 1, 4, 10],
                [3, -1, 4, 13],
                [3, 1, 4, -10],
                [3, -1, 4, -15],
            ],
            [
                [2, -1, 1.6, 10],
                [2, 1, 2, -10],
                [1, -1, 2, 20],
                [2, 1, 2, 10],
                [1, -1, 1, -20],
                [3, 1, 2, -10],
                [2, -1, 3, -5],
                [3, 1, 3, 2],
                [1, -1, 2, -3],
                [3, -1, 1, 0],
                [3, 1, 4, 10],
                [2, -1, 4, -15],
                [3, 1, 4, 10],
                [1, -1, 4, 13],
                [3, 1, 4, -10],
                [3, -1, 4, -15],
            ],
            [
                [2, -1, 1.6, 10],
                [1, 1, 2, -10],
                [1, -1, 2, 20],
                [2, 1, 2, 10],
                [1, -1, 1, -20],
                [3, -1, 2, -10],
                [2, -1, 3, -5],
                [3, 1, 3, 2],
                [2, -1, 2, -3],
                [3, -1, 1, 0],
                [3, 1, 4, 10],
                [2, -1, 4, -15],
                [3, 1, 4, 10],
                [1, -1, 4, 13],
                [3, 1, 4, -10],
                [3, -1, 4, -15],
            ],
            [
                [2, -1, 1.6, 10],
                [1, 1, 2, -10],
                [1, -1, 2, 20],
                [2, 1, 2, 10],
                [1, -1, 1, -20],
                [3, -1, 2, -10],
                [2, -1, 3, -5],
                [3, 1, 3, 2],
                [2, -1, 2, -3],
                [3, -1, 1, 0],
                [3, 1, 4, 10],
                [2, -1, 4, -15],
                [3, 1, 4, 10],
                [1, -1, 4, 13],
                [3, 1, 4, -10],
                [3, -1, 4, -15],
            ],
            [
                [2, -1, 1.6, 10],
                [1, 1, 2, -10],
                [1, -1, 2, 20],
                [2, 1, 2, 10],
                [1, -1, 1, -20],
                [3, -1, 2, -10],
                [2, -1, 3, -5],
                [3, 1, 3, 2],
                [3, -1, 2, -3],
                [3, -1, 1, 0],
                [3, 1, 4, 10],
                [2, -1, 4, -15],
                [3, 1, 4, 10],
                [1, -1, 4, 13],
                [3, 1, 4, -10],
                [3, -1, 4, -15],
            ],
            [
                [2, -1, 1.6, 10],
                [1, 1, 2, -10],
                [2, -1, 2, 20],
                [2, 1, 2, 10],
                [1, -1, 1, -20],
                [3, -1, 2, -10],
                [2, -1, 3, -5],
                [3, 1, 3, 2],
                [2, -1, 2, -3],
                [3, -1, 1, 0],
                [3, 1, 4, 10],
                [2, -1, 4, -15],
                [3, 1, 4, 10],
                [1, -1, 4, 13],
                [3, 1, 4, -10],
                [3, -1, 4, -15],
            ],
            [
                [3, -1, 2, -20],
                [3, 1, 1.6, -10],
                [1, -1, 1.5, -5],
                [2, 1, 3, 2],
                [1, -1, 2, -3],
                [3, -1, 4, 0],
                [1, 1, 4, 10],
                [3, -1, 4, -15],
                [2, 1, 4, 10],
                [3, -1, 4, 13],
                [3, 1, 4, -10],
                [3, -1, 4, -15],
                [3, 1, 4, 10],
                [1, -1, 4, 13],
                [3, 1, 4, -10],
                [3, -1, 4, -15],
            ],
            [
                [1, 1, 1.42, -20],
                [1, 1, 1.42, 10],
                [1, -1, 1.42, 10],
                [2, -1, 2, 20],
                [3, 1, 2, 10],
                [2, -1, 1, -20],
                [3, 1, 2, -10],
                [2, -1, 3, -5],
                [3, -1, 3, 2],
                [2, -1, 2, -3],
                [3, 1, 4, 20],
                [1, 1, 4, 10],
                [3, -1, 4, -15],
                [3, 1, 4, 10],
                [3, -1, 4, 13],
                [3, 1, 4, -10],
                [3, -1, 4, -15],
            ],
            [
                [1, -1, 1.42, 0],
                [2, 1, 2, 10],
                [1, 1, 2, -10],
                [1, -1, 2, 20],
                [2, 1, 2, 10],
                [3, -1, 2, -20],
                [1, 1, 2, -10],
                [2, -1, 3, -5],
                [3, 1, 3, 2],
                [1, -1, 2, -3],
                [3, -1, 4, 0],
                [3, 1, 4, 10],
                [2, -1, 4, -15],
                [3, 1, 4, 10],
                [3, -1, 4, 13],
                [3, 1, 4, -10],
                [3, -1, 4, -15],
            ],
        ];
        this.load_box(0);
        //[val,d,time,y]
        tapEventEmitter.block = true;
    }
    status(txt = "", useRaw = false) {
        if (useRaw) {
            this.statusTxt.innerHTML = txt;
        } else {
            this.statusTxt.innerText = txt;
        }
    }
    async init() {
        this.delete_box = true;
        this.skillcount = { 0: 0, 1: 0, 2: 0 };

        this.on_box.forEach((e) => {
            e.remove();
        });
        this.on_p.forEach((e) => {
            e.remove();
        });
        this.on_box = [];
        this.on_p = [];
        p_skill(this.me);
        this.update();
        this.status();
        setTimeout(async () => {
            this.delete_box = false;
            this.cost(this.enemy);
            this.me.st.position = 350;
            this.me.st.p = 0;
            this.me.cost = 0;
            this.start = 1;
            this.load_box(this.codeHash);
            await this.chara_enemy();
            p_skill(this.enemy);
            bgm.src = bgm_battle
            bgm.currentTime = 0
            bgm.play()
        }, 1000);
        setTimeout(() => {
            setInterval(() => {
                if (this.me.st.y > 550) this.me.st.y -= 2;
            }, 1000);
        }, 60000);
    }
    async load_box(n: number) {
        const box_rules = this.box_rules[n % 5];
        for (let i = 0; i < box_rules.length; i++) {
            const e = box_rules[i];
            for (let i = 0; i < 6; i++) {
                await sleep(e[2] * 500);
                if (this.delete_box) {
                    return;
                }
            }
            if (this.socket_side) {
                this.on_box.push(
                    new Box(
                        e[0],
                        e[1] * -1,
                        500 - (e[3] * 2),
                        this,
                    ),
                );
            } else {
                this.on_box.push(
                    new Box(
                        e[0],
                        e[1],
                        e[3] * 2 + 500,
                        this,
                    ),
                );
            }
        }
    }
    cost(star: Star) {
        star.cost = 0;
        star.st.cost_speed = cost_speed;
        star._cost = setInterval(() => {
            if (star.cost > 1000) {
                star.cost = 1000;
                return;
            }
            if (1) {
                star.cost += star.st.cost_speed;
            }
            star.cost_gage.style.width = star.cost / 10 + "vw";
            star.cost_txt.innerText = Math.floor(star.cost / 100) + "";
        }, 10);
    }
    checkSt(oldst: St): (keyof St)[] {
        const keys: (keyof St)[] = [];
        for (const key in this.me.st) {
            if (Object.prototype.hasOwnProperty.call(this.me.st, key)) {
                if ((this.me.st as any)[key] !== (oldst as any)[key]) {
                    keys.push(key as any);
                }
            }
        }
        return keys;
    }
    update() {
        let change = { ...this.me.st };
        this._update = setInterval(() => {
            const diff = this.checkSt(change);
            if (diff.length && !(diff.length === 1 && diff[0] === "position")) {
                this.gs.st([...diff, "position", "d"]);
                change = { ...this.me.st };
            }
        }, 100);
        this.gs.set(["cost", "custom", "i", "skill_select"]);
        this.gs.st([
            "alive",
            "canShot",
            "cost_speed",
            "d",
            "p",
            "position",
            "speed",
            "y",
        ]); //effectでいじるのに使いたい
    }
    async chara(i = 0, custom: string[] = []) {
        this.me.i = i;
        this.me.custom = custom;
        app.canvas.onmousemove = (e) => {
            this.mouse = {
                x: reparse(
                    (app.canvas.width - document.body.clientWidth) / 2 +
                    e.clientX,
                ),
            };
            this.forrowMouse = true;
        };
        const textures = [
            await PIXI.Assets.load(`/img2/${this.stars[i]}2.png`),
            await PIXI.Assets.load(`/img2/${this.stars[i]}1.png`),
        ];
        this.me.textures = textures;
        if (custom.length == 2) {
            textures[0] = pwToStar(
                custom[0],
                0xffffff,
                app,
            );
            textures[1] = pwToStar(
                custom[1],
                0xffffff,
                app,
            );
        }
        textures[0].baseTexture.scaleMode = PIXI.SCALE_MODES.NEAREST;
        textures[1].baseTexture.scaleMode = PIXI.SCALE_MODES.NEAREST;
        // Create a new Sprite from an image path.
        const Star = new PIXI.Sprite(textures[1]);
        Star.tint = RGB_ME;
        this.me.star = Star;
        // Add to stage.
        app.stage.addChild(Star);
        let move = 0;
        this.me._anime = setInterval(() => {
            this.me.star!.texture = textures[move];
            move = Number(!move);
        }, 1000);
        this.me._move = setInterval(() => {
            if (this.me.canShot(0)) {
                this.me.skill_gage[0].style.backgroundColor = "#29B6F6";
            } else {
                this.me.skill_gage[0].style.backgroundColor = "#999";
            }
            if (this.me.canShot(1)) {
                this.me.skill_gage[1].style.backgroundColor = "#29B6F6";
            } else {
                this.me.skill_gage[1].style.backgroundColor = "#999";
            }
            if (this.me.canShot(2)) {
                this.me.skill_gage[2].style.backgroundColor = "#29B6F6";
            } else {
                this.me.skill_gage[2].style.backgroundColor = "#999";
            }
            if (
                this.me.st.position + ((this.me.st.d / 10) * this.me.st.speed) >
                50 &&
                this.me.st.position + ((this.me.st.d / 10) * this.me.st.speed) <
                650
            ) {
                this.me.st.position += (this.me.st.d / 10) * this.me.st.speed;
            }
            if (this.forrowMouse) {
                if (
                    Math.floor(this.mouse.x) > Math.floor(this.me.st.position)
                ) {
                    this.me.st.d = 1;
                } else if (
                    Math.floor(this.mouse.x) < Math.floor(this.me.st.position)
                ) {
                    this.me.st.d = -1;
                } else {
                    this.me.st.d = 0;
                }
            }
        }, 10);
        tapEventEmitter.on("move", (i) => {
            switch (i) {
                case 0:
                    this.me.st.d = -1;
                    this.forrowMouse = false;
                    break;
                case 1:
                    this.me.st.d = 1;
                    this.forrowMouse = false;
                    break;
                case 2:
                    this.me.st.d = 0;
                    this.forrowMouse = false;
                    break;
            }
        })
        tapEventEmitter.on("skill", (i) => this.skillBegin(this.me, i))
        onkeydown = (e) => {
            switch (e.key) {
                case "ArrowLeft":
                case "a":
                    this.me.st.d = -1;
                    this.forrowMouse = false;
                    e.preventDefault();
                    break;
                case "ArrowRight":
                case "d":
                    this.me.st.d = 1;
                    this.forrowMouse = false;
                    e.preventDefault();
                    break;
                case "ArrowDown":
                case "s":
                    this.me.st.d = 0;
                    this.forrowMouse = false;
                    e.preventDefault();
                    break;
                case "1":
                    this.skillBegin(this.me, 0);

                    break;
                case "2":
                    this.skillBegin(this.me, 1);

                    break;
                case "3":
                    this.skillBegin(this.me, 2);

                    break;
                default:
                    break;
            }
        };
        Star.anchor.set(0.5);
        Star.width = parse(100);
        Star.height = parse(100);

        Star.x = app.screen.width / 2;
        app.ticker.add((time) => {
            Star.width = parse(this.me.w);
            Star.height = parse(this.me.h);
            Star.x = parse(this.me.st.position);
            Star.y = parse(this.me.st.y);
        });
        this.me.hit = (s, by) => {
            if (s == 1 && this.start == 1 && by && by.enemy == this.me) {
                this.status("Lose...");
                this.gs.lose();
                this.stop();
                clearInterval(this.me._anime);
                clearInterval(this.me._move);
                Star.rotation = Math.PI / 2;
            } else if (s == 1 && this.start == 1 && by && by.star == this.me && by.parent.define.catchable) {
                if (this.me.cost + 100 >= 1000) {
                    this.me.cost = 1000;
                    this.gs.set(["cost"])
                } else {
                    this.me.cost += 100;
                    this.gs.set(["cost"])
                }
            } else if (s == 2) {
                this.me.st.p += 1;
                this.me.st.speed += 0.6; //p取得加速
                p_skill(this.me);
            }
        };
    }
    skillBegin(
        star: Star,
        n: number,
        on?: number,
        extra: Record<string, number> = {},
    ) {
        if (star == this.me && star.canShot(n)) {
            this.skillcount[n as (0 | 1 | 2)]++;
            on = Date.now() + network_delay;
            let cost = 0;
            if (star.skill[n].X) {
                cost = Math.floor(star.cost / 100);
                star.cost -= cost * 100;
            } else {
                star.cost -= star.skill[n].cost * 100;
            }
            star.st.canShot[n] = 0;
            setTimeout(() => {
                star.st.canShot[n] = 1;
            }, skill_delay);
            setTimeout(() => {
                star.skills[on!] = new Skill(
                    star,
                    RGB_ME,
                    star.skill[n],
                    on!,
                    this,
                    {
                        ...extra,
                        cost,
                        count: this.skillcount[n as (0 | 1 | 2)],
                    },
                );
                star.structures.forEach((e) => e.onParentSkill(star.skills[on!]));
            }, network_delay);
            if (this.start) {
                this.gs.send({
                    skillBegin: {
                        target: n,
                        extra: {
                            ...extra,
                            cost,
                            count: this.skillcount[n as (0 | 1 | 2)],
                        },
                        on,
                    },
                    set: { cost: this.me.cost },
                });
            }
            let wait = 0;
            star.skill[n].shots.forEach((e) => {
                if ((e.delay || 0) > wait) {
                    wait = e.delay || 0;
                }
            });
            if (wait) {
                this.me.st.cost_speed = 0;
                this.me.w = 110;
                this.me.h = 110;
                setTimeout(() => {
                    this.me.st.cost_speed = cost_speed;
                    this.me.w = 100;
                    this.me.h = 100;
                }, wait + network_delay);
            }
        } else if (star == this.enemy && on) {
            const late = (on - Date.now()) > 0 ? (on - Date.now()) : 0;
            setTimeout(() => {
                star.skills[on!] = new Skill(
                    star,
                    RGB_ENEMY,
                    star.skill[n],
                    on!,
                    this,
                    extra,
                );
            }, late);
            let wait = 0;
            star.skill[n].shots.forEach((e) => {
                if ((e.delay || 0) > wait) {
                    wait = e.delay || 0;
                }
            });
            if (wait) {
                this.enemy.st.cost_speed = 0;
                this.enemy.w = 110;
                this.enemy.h = 110;
                setTimeout(() => {
                    this.enemy.st.cost_speed = cost_speed;
                    this.enemy.w = 100;
                    this.enemy.h = 100;
                }, wait + late);
            }
        }
    }
    structSkillBegin(
        from: Structure,
        n: number,
        on?: number,
        extra: Record<string, number> = {},
    ) {
        if (from.isme) {
            from.skillcount++;
            on = Date.now() + network_delay;
            setTimeout(() => {
                from.parent.skills[on!] = new Skill(
                    from.parent,
                    RGB_ME,
                    skill_list[n],
                    on!,
                    this,
                    {
                        ...extra,
                        count: from.skillcount,
                    },
                    [from.x, from.y],
                );
            }, network_delay);
            if (this.start) {
                this.gs.send({
                    skillstruct: {
                        skillid: n,
                        extra: {
                            ...extra,
                            count: from.skillcount,
                        },
                        on,
                        id: from.id,
                    },
                    set: { cost: this.me.cost },
                });
            }
        } else if (from.parent === this.enemy && on) {
            const late = (on - Date.now()) > 0 ? (on - Date.now()) : 0;
            setTimeout(() => {
                from.parent.skills[on!] = new Skill(
                    from.parent,
                    RGB_ENEMY,
                    skill_list[n],
                    on!,
                    this,
                    extra,
                    [from.x, from.y],
                );
            }, late);
        }
    }
    setStruct(star: Star, type: number, x?: number, extra?: Record<string, number>, id?: number, on?: number) {
        if (star == this.me) {
            x = star.st.position
            on = Date.now() + 200;
            id = star.structures.length;
            if (this.start) {
                this.gs.send({
                    struct: {
                        type,
                        x,
                        id,
                        on,
                        extra,
                    },
                });
            }
            star.structures[id] = (
                new Structure(
                    structs[type],
                    id,
                    this.me,
                    this.enemy,
                    this,
                    x,
                )
            );
        } else if (on && x) {
            const late = (on - Date.now()) > 0 ? (on - Date.now()) : 0;
            setTimeout(() => {
                this.enemy.structures[id!] = (
                    new Structure(
                        structs[type],
                        id!,
                        this.enemy,
                        this.me,
                        this,
                        x!,
                    )
                );
            }, late);
        }
    }
    async chara_enemy() {
        const textures: PIXI.Texture[] = [];
        if (this.enemy.custom.length == 2) {
            textures[0] = pwToStar(
                this.enemy.custom[0],
                0xffffff,
                app,
            );
            textures[1] = pwToStar(
                this.enemy.custom[1],
                0xffffff,
                app,
            );
        } else {
            textures[0] = await PIXI.Assets.load(
                `/img2/${this.stars[this.enemy.i]}2.png`,
            );
            textures[1] = await PIXI.Assets.load(
                `/img2/${this.stars[this.enemy.i]}1.png`,
            );
        }
        textures[0].baseTexture.scaleMode = PIXI.SCALE_MODES.NEAREST;
        textures[1].baseTexture.scaleMode = PIXI.SCALE_MODES.NEAREST;
        // Create a new Sprite from an image path.
        const Star = new PIXI.Sprite(textures[1]);
        Star.tint = RGB_ENEMY;
        this.enemy.star = Star;
        // Add to stage.
        app.stage.addChild(Star);
        let move = 0;
        this.enemy._anime = setInterval(() => {
            this.enemy.star!.texture = textures[move];
            move = Number(!move);
        }, 1000);
        this.enemy._move = setInterval(() => {
            if (
                this.enemy.st.position +
                ((this.enemy.st.d / 10) * this.enemy.st.speed) >
                50 &&
                this.enemy.st.position +
                ((this.enemy.st.d / 10) * this.enemy.st.speed) < 650 //行けるx範囲
            ) {
                this.enemy.st.position += (this.enemy.st.d) *
                    this.enemy.st.speed / 10;
            }
            if (this.enemy.canShot(0)) {
                this.enemy.skill_gage[0].style.backgroundColor = "#EF5350";
            } else {
                this.enemy.skill_gage[0].style.backgroundColor = "#999";
            }
            if (this.enemy.canShot(1)) {
                this.enemy.skill_gage[1].style.backgroundColor = "#EF5350";
            } else {
                this.enemy.skill_gage[1].style.backgroundColor = "#999";
            }
            if (this.enemy.canShot(2)) {
                this.enemy.skill_gage[2].style.backgroundColor = "#EF5350";
            } else {
                this.enemy.skill_gage[2].style.backgroundColor = "#999";
            }
        }, 10);
        // Center the sprite's anchor point.
        Star.anchor.set(0.5);
        Star.width = parse(100);
        Star.height = parse(100);
        Star.rotation = Math.PI;
        Star.x = app.screen.width / 2;
        // Add an animation loop callback to the application's ticker.
        app.ticker.add((time) => {
            Star.width = parse(this.enemy.w);
            Star.height = parse(this.enemy.h);
            Star.x = parse(700 - this.enemy.st.position);
            Star.y = parse(1000 - this.enemy.st.y);
        });
    }
    stop(i = 0) {
        try {
            this.gs._socket.peerConnection.close();
        } catch { }
        this.start = 2;
        this.delete_box = true;
        try {
            this.on_box.forEach((e) => {
                e.remove();
            });
            this.on_p.forEach((e) => {
                e.remove();
            });
        } catch {
        }
        this.on_box = [];
        this.on_p = [];
        onkeydown = null;
        clearInterval(this._update);
        clearInterval(this.me._move);
        clearInterval(this.me._cost);
        clearInterval(this.enemy._move);
        clearInterval(this.enemy._cost);
        const nid = setInterval(() => 0) + 1;
        for (let i = 0; i < nid; i++) clearInterval(i);
        bgm.pause();
        setTimeout(() => {
            for (
                let i = document.getElementsByClassName("g").length - 1;
                i > 0;
                i--
            ) {
                const element = document.getElementsByClassName("g")[i];
                this.base.removeChild(element);
            }
            this.base.removeChild(document.getElementById("shoot")!);
            this.base.removeChild(document.getElementById("mcost")!);
            this.base.removeChild(document.getElementById("ecost")!);
            this.base.removeChild(document.getElementById("mcostxt")!);
            this.base.removeChild(document.getElementById("ecostxt")!);
            this.base.style.backgroundColor = "#000";
            postMessage("end");
            window.addEventListener("click", restart, { once: true });
            tapEventEmitter.block = false;
            tapEventEmitter.clear();

        }, 3000);
    }
    get a() {
        this.me.cost = 1000;
        return 0;
    }
}

export function parse(i = 350) {
    return Math.floor(app.canvas.height * i / 1000);
}
function reparse(i = 350) {
    return Math.floor(i * 1000 / app.canvas.height);
}

function pwToStar(pw: string, color: number, app = Dapp) {
    const map = p2m(pw);
    const Star = new PIXI.Graphics();
    const X = 100;
    map.forEach((e, j) => {
        e.forEach((f, i) => {
            if (f === 1) {
                Star.beginFill(color);
                Star.drawRect(
                    i * X,
                    j * X,
                    X,
                    X,
                );
                Star.endFill();
            } else {
                Star.beginFill(color);
                Star.drawRect(
                    i * X,
                    j * X,
                    X,
                    0,
                );
                Star.drawRect(
                    i * X,
                    (j + 1) * X,
                    X,
                    0,
                );
                Star.endFill();
            }
        });
    });
    return app.renderer.generateTexture(Star);
}
async function pwToImgURL(pw: string) {
    const texture = pwToStar(pw, 0xffda60);
    const sprite = new PIXI.Sprite(texture);
    const blob = await new Promise<string>((resolve, reject) => {
        (Dapp.renderer.extract.canvas(sprite).toBlob as any)(
            function (b: null | Blob) {
                b ? resolve(URL.createObjectURL(b)) : reject();
            },
            "image/png",
        );
    });
    return blob;
}

(async () => {
    pstar = await PIXI.Assets.load(`/img/p.png`);
    pstar.baseTexture.scaleMode = PIXI.SCALE_MODES.NEAREST;
    pbox = [
        await PIXI.Assets.load(`/img/1b.png`),
        await PIXI.Assets.load(`/img/2b.png`),
        await PIXI.Assets.load(`/img/3b.png`),
        await PIXI.Assets.load(`/img/4b.png`),
    ];
    textureSet = {
        P: pstar,
        BOX: await PIXI.Assets.load(`/img/2048.png`),
        Star: await PIXI.Assets.load(`/img2/starfish1.png`),
        Fe: await PIXI.Assets.load(`/img/Fe.png`),
        Bomb: await PIXI.Assets.load(`/img/bomb.png`),
        kayaku: await PIXI.Assets.load(`/img/kayaku.png`),
        Monomane: await PIXI.Assets.load(`/img/monomane.png`),
        henka1: await PIXI.Assets.load(`/img/henka1.png`),
        henka2: await PIXI.Assets.load(`/img/henka2.png`),
        henka3: await PIXI.Assets.load(`/img/henka3.png`),
        henka4: await PIXI.Assets.load(`/img/henka4.png`),
        henka5: await PIXI.Assets.load(`/img/henka5.png`),
        henka6: await PIXI.Assets.load(`/img/henka6.png`),
        kakasi: await PIXI.Assets.load(`/img2/kk2.png`),
        senaka: await PIXI.Assets.load(`/img/senaka.png`),
        capy: await PIXI.Assets.load(`/img2/c2.png`),
        huryo: await PIXI.Assets.load(`/img/cps.png`),
        bomb2: await PIXI.Assets.load(`/img/bomb2.png`),
        scape: await PIXI.Assets.load(`/img2/ca1.png`),
        dark: await PIXI.Assets.load(`/img2/bf1.png`),
        egg1: await PIXI.Assets.load(`/img/egg.png`),
        egg2: await PIXI.Assets.load(`/img/egg2.png`),
        ghbomb: await PIXI.Assets.load(`/img/ghbomb.png`),
        rabboy: await PIXI.Assets.load(`/img2/rabbit1.png`),
        ghoboy: await PIXI.Assets.load(`/img2/ghost1.png`),
        molboy: await PIXI.Assets.load(`/img2/mole1.png`),
        whabody: await PIXI.Assets.load(`/img2/whale1.png`),
        slubody: await PIXI.Assets.load(`/img2/slug1.png`),
        leobody: await PIXI.Assets.load(`/img2/leo1.png`),

    };
    bgm_battle = URL.createObjectURL(await (await fetch("./8bit_mission.m4a")).blob())
    bgm_home = URL.createObjectURL(await (await fetch("./home.m4a")).blob())
    bgm.src = bgm_home
})();
