var PIXI = PIXI;
const maps = [];
maps[0] = [
[
0,
0,
0,
0,
0,
0,
0,
0,
0,
0,
0,
0,
0,
0,
0,
0
],
[
0,
0,
0,
0,
0,
0,
0,
0,
0,
0,
0,
0,
0,
0,
0,
0
],
[
0,
0,
0,
0,
0,
0,
0,
0,
0,
0,
0,
0,
0,
0,
0,
0
],
[
0,
0,
0,
0,
0,
0,
0,
0,
0,
0,
0,
0,
0,
0,
0,
0
],
[
0,
0,
0,
0,
0,
0,
0,
0,
0,
0,
0,
0,
0,
0,
0,
0
],
[
0,
0,
0,
0,
0,
0,
0,
0,
0,
0,
0,
0,
0,
0,
0,
0
],
[
0,
0,
0,
0,
0,
0,
0,
0,
0,
0,
0,
0,
0,
0,
0,
0
],
[
0,
0,
0,
0,
0,
0,
0,
0,
0,
0,
0,
0,
0,
0,
0,
0
],
[
0,
0,
0,
0,
0,
0,
0,
0,
0,
0,
0,
0,
0,
0,
0,
0
],
[
0,
0,
0,
0,
0,
0,
0,
0,
0,
0,
0,
0,
0,
0,
0,
0
],
[
0,
0,
0,
0,
0,
0,
0,
0,
0,
0,
0,
0,
0,
0,
0,
0
],
[
0,
0,
0,
0,
0,
0,
0,
0,
0,
0,
0,
0,
0,
0,
0,
0
],
[
0,
0,
0,
0,
0,
0,
0,
0,
0,
0,
0,
0,
0,
0,
0,
0
],
[
0,
0,
0,
0,
0,
0,
0,
0,
0,
0,
0,
0,
0,
0,
0,
0
],
[
0,
0,
0,
0,
0,
0,
0,
0,
0,
0,
0,
0,
0,
0,
0,
0
],
[
0,
0,
0,
0,
0,
0,
0,
0,
0,
0,
0,
0,
0,
0,
0,
0
]
];
maps[1] = [
[
0,
0,
0,
0,
0,
0,
0,
0,
0,
0,
0,
0,
0,
0,
0,
0
],
[
0,
0,
0,
0,
0,
0,
0,
0,
0,
0,
0,
0,
0,
0,
0,
0
],
[
0,
0,
0,
0,
0,
0,
0,
0,
0,
0,
0,
0,
0,
0,
0,
0
],
[
0,
0,
0,
0,
0,
0,
0,
0,
0,
0,
0,
0,
0,
0,
0,
0
],
[
0,
0,
0,
0,
0,
0,
0,
0,
0,
0,
0,
0,
0,
0,
0,
0
],
[
0,
0,
0,
0,
0,
0,
0,
0,
0,
0,
0,
0,
0,
0,
0,
0
],
[
0,
0,
0,
0,
0,
0,
0,
0,
0,
0,
0,
0,
0,
0,
0,
0
],
[
0,
0,
0,
0,
0,
0,
0,
0,
0,
0,
0,
0,
0,
0,
0,
0
],
[
0,
0,
0,
0,
0,
0,
0,
0,
0,
0,
0,
0,
0,
0,
0,
0
],
[
0,
0,
0,
0,
0,
0,
0,
0,
0,
0,
0,
0,
0,
0,
0,
0
],
[
0,
0,
0,
0,
0,
0,
0,
0,
0,
0,
0,
0,
0,
0,
0,
0
],
[
0,
0,
0,
0,
0,
0,
0,
0,
0,
0,
0,
0,
0,
0,
0,
0
],
[
0,
0,
0,
0,
0,
0,
0,
0,
0,
0,
0,
0,
0,
0,
0,
0
],
[
0,
0,
0,
0,
0,
0,
0,
0,
0,
0,
0,
0,
0,
0,
0,
0
],
[
0,
0,
0,
0,
0,
0,
0,
0,
0,
0,
0,
0,
0,
0,
0,
0
],
[
0,
0,
0,
0,
0,
0,
0,
0,
0,
0,
0,
0,
0,
0,
0,
0
]
];
function p2m(password) {
let str = "";
password = decodeXYZ(password);
for(let i = 0; i < password.length; i++){
let s = password.substr(i, 1);
let num = parseInt(s, 16);
let bit = toBit(num, 4);
str += bit;
}
return toMap(str);
}
function toMap(str) {
str = checkSkin(str);
const map = [];
for(let j = 0; j < 16; j++){
map[j] = [];
for(let i = 16 * j; i < 16 * j + 16; i++){
if (str.length < i) {
map[j][i % 16] = 0;
continue;
}
map[j][i % 16] = parseInt(str[i]);
}
}
return map;
}
function checkSkin(bits) {
var countPixel = 0;
bits.split("").forEach((e)=>{
if (e === "1") {
countPixel += 1;
}
});
if (countPixel > 16 * 2) {
return bits;
}
return "1".repeat(16 * 16);
}
function toBit(num, size) {
let s = num.toString(2);
for(let i = 0; i < 999; i++){
if (s.length >= size) {
return s;
}
s = "0" + s;
}
return s;
}
function decodeXYZ(str) {
str = str.replace(/z/g, "00000000");
str = str.replace(/y/g, "0000");
str = str.replace(/x/g, "00");
str = str.replace(/Z/g, "ffffffff");
str = str.replace(/Y/g, "ffff");
str = str.replace(/X/g, "ff");
return str;
}
const del = ()=>[
10000,
0,
0
];
function effect(callback) {
return function(t) {
callback(this);
return [
1401,
0,
0
];
};
}
function kasoku(dx = 0, dy = 10, size = 3, add = 0, [x, y] = [
0,
0
]) {
return (t)=>{
t += add;
return [
t * t * dx / 10 * 4 + x,
t * t * dy / 10 * 4 + y,
size
];
};
}
function kasoku2(dx = 0, dy = 10, size = 3, add = 0, [x, y] = [
0,
0
]) {
return (t)=>{
t += add;
return [
t * t * t * dx / 10 * 4 + x,
t * t * dy / 10 * 4 + y,
size
];
};
}
function kasoku3(dx = 0, dy = 10, size = 3, add = 0, [x, y] = [
0,
0
]) {
return (t)=>{
t += add;
return [
t * t * dx / 10 * 4 + x,
t * t * t * dy / 10 * 4 + y,
size
];
};
}
function kasoku4(dx = 0, ddx = 0, dy = 10, size = 3, add = 0, [x, y] = [
0,
0
]) {
return (t)=>{
t += add;
return [
(t * t * t * t * ddx + t * dx) / 10 * 4 + x,
t * t * dy / 10 * 4 + y,
size
];
};
}
function kasoku5(dx = 0, ddx = 0, dy = 10, size = 3, add = 0, [x, y] = [
0,
0
]) {
return (t)=>{
t += add;
return [
(t * t * t * ddx + t * dx) / 10 * 4 + x,
t * t * dy / 10 * 4 + y,
size
];
};
}
function dFunc(dx = 0, dy = 10, size = 3, add = 0, [x, y] = [
0,
0
]) {
return (t)=>{
t += add;
return [
t * dx / 10 * 4 + x,
t * dy / 10 * 4 + y,
size
];
};
}
function dCurve(θ = 0, dθ = 0, size = 3, speed = 7) {
return (t)=>{
return [
t * speed * Math.sin(θ + dθ * t),
t * speed * Math.cos(θ + dθ * t) - 20,
size
];
};
}
function dKaiten(θ = 0, dθ = 0.35, dy = 2, dx = 0, r = 5, dr = 0.13, size = 1.5, drx = 1, dry = 1, [x, y] = [
0,
0
]) {
return (t)=>{
return [
t * dx + drx * (r + dr * t) * Math.cos(θ + dθ * t) - x,
t * dy + dry * (r + dr * t) * Math.sin(θ + dθ * t) - y,
size
];
};
}
function takino(θ = 0, dθ = 0.35, dy = 2, r = 5, dr = 0.13, size = 1.5, dry = 1, [x, y] = [
0,
0
]) {
return (t)=>{
return [
0 + x,
t * dy + dry * (r + dr * t) * Math.sin(θ + dθ * t) + y,
size
];
};
}
function dKaitenFuncif(r = 13, dθ = -1 / 30 * Math.PI, θ = 4.5 / 6 * Math.PI, dθ2 = -1 / 30 * Math.PI, dx = 0, dy = 10, dx2 = 11, dy2 = 2, when = 60, add = 0, size = 3, [x, y] = [
0,
0
]) {
return (t)=>{
t += add;
if (t <= when) {
return [
t * dx + t * (r * Math.cos(θ + dθ * t)) + x,
t * dy + t * (r * Math.sin(θ + dθ * t)) + y,
size
];
} else return [
when * dx + when * (r * Math.cos(θ + dθ * when + dθ2 * (t - when))) + x + (t - when) * dx2,
when * dy + when * (r * Math.sin(θ + dθ * when + dθ2 * (t - when))) + y + (t - when) * dy2,
size
];
};
}
function dFuncif(dx = 0, dy = 10, dx2 = 11, dy2 = 2, when = 60, add = 0, size = 3, [x, y] = [
0,
0
]) {
return (t)=>{
t += add;
if (t <= when) {
return [
t * dx / 10 * 4 + x,
t * dy / 10 * 4 + y,
size
];
} else return [
when * dx / 10 * 4 + x + dx2 * (t - when) / 10 * 4,
when * dy / 10 * 4 + y + dy2 * (t - when) / 10 * 4,
size
];
};
}
function xgiri1(s = 30, size = 5) {
return function(t) {
this.bx = 30;
return [
-700 / s * t,
840 / s * t - 60,
size
];
};
}
function xgiri2(s = 30, size = 5) {
return function(t) {
this.bx = 670;
return [
700 / s * t,
840 / s * t - 60,
size
];
};
}
function turumai1(s = 40, size = 3) {
return function(t) {
this.bx = 450;
return [
210 / s * t,
810 / s * t - 60,
size
];
};
}
function turumai2(s = 40, size = 3) {
return function(t) {
this.bx = 250;
return [
-210 / s * t,
810 / s * t - 60,
size
];
};
}
function turumai3(s = 40, size = 3) {
return function(t) {
this.bx = 550;
return [
420 / s * t,
810 / s * t - 60,
size
];
};
}
function turumai4(s = 40, size = 3) {
return function(t) {
this.bx = 150;
return [
-420 / s * t,
810 / s * t - 60,
size
];
};
}
function turumai5(s = 40, size = 3) {
return function(t) {
this.bx = 650;
return [
630 / s * t,
810 / s * t - 60,
size
];
};
}
function turumai6(s = 40, size = 3) {
return function(t) {
this.bx = 50;
return [
-630 / s * t,
810 / s * t - 60,
size
];
};
}
function longaim(s = 30, size = 3) {
return function(t) {
return [
-t * ((350 - this.bx) / s),
t * ((this.by - 80) / s),
size
];
};
}
function shortaim(s = 30, size = 3) {
return function(t) {
return [
-t * ((350 - this.bx) * 2 / s),
-t * ((500 - this.by) * 2 / s),
size
];
};
}
function turnaim(s = 30, size = 3) {
return function(t) {
if (t === s / 2) {
this.bx = 700 - this.bx;
}
return [
-t * ((350 - this.bx) * 2 / s),
-t * ((500 - this.by) * 2 / s),
size
];
};
}
function corneraim1(s = 30, size = 3) {
return function(t) {
return [
t * (this.bx / s),
t * ((this.by - 80) / s),
size
];
};
}
function corneraim2(s = 30, size = 3) {
return function(t) {
return [
-t * ((700 - this.bx) / s),
t * ((this.by - 80) / s),
size
];
};
}
function mirror(dx = 0, dy = 10, size = 3) {
return function(t) {
if (t * dy / 10 * 4 > this.parent.game.me.st.y - 500) {
return [
-((350 - this.bx) * 2) - t * dx / 10 * 4,
t * dy / 10 * 4,
size
];
}
return [
t * dx / 10 * 4,
t * dy / 10 * 4,
size
];
};
}
function center(dx = 0, dy = 10, size = 3) {
return function(t) {
if (t * dy / 10 * 4 > this.parent.game.me.st.y - 500) {
return [
-(350 - this.bx) - t * dx / 10 * 4,
t * dy / 10 * 4,
size
];
}
return [
t * dx / 10 * 4,
t * dy / 10 * 4,
size
];
};
}
function mirrorfusen(dx = 0, dy = 8.55, bsize = 1.5, tosize = 13) {
let nt = 0;
return function(t) {
if (t * dy / 10 * 4 > this.parent.game.me.st.y - 500 && bsize + (tosize - bsize) * (t - nt) / 20 < tosize) {
return [
-((350 - this.bx) * 2) - t * dx / 10 * 4,
t * dy / 10 * 4,
bsize + (tosize - bsize) * (t - nt) / 20
];
} else if (bsize + (tosize - bsize) * (t - nt) / 20 >= tosize) {
return [
-((350 - this.bx) * 2) - t * dx / 10 * 4,
t * dy / 10 * 4,
tosize
];
}
nt = t;
return [
t * dx / 10 * 4,
t * dy / 10 * 4,
bsize
];
};
}
function sprit(dx = 0, dy = 10, size = 3, rl = 1, s = 100) {
return function(t) {
if (t * dy / 10 * 4 > this.parent.game.me.st.y - 500) {
return [
rl * s,
t * dy / 10 * 4,
size
];
}
return [
t * dx / 10 * 4,
t * dy / 10 * 4,
size
];
};
}
function fusen(dx = 0, s = 10, bsize = 1, tosize = 3) {
let nt = 0;
return function(t) {
if (t * s / 10 * 4 > (this.parent.game.me.st.y - 500) * 2 - 400 && bsize + (tosize - bsize) * (t - nt) / 50 < tosize) {
return [
t * dx / 10 * 4,
t * s / 10 * 4,
bsize + (tosize - bsize) * (t - nt) / 50
];
} else if (bsize + (tosize - bsize) * (t - nt) / 50 >= tosize) {
return [
t * dx / 10 * 4,
t * s / 10 * 4,
tosize
];
}
nt = t;
return [
t * dx / 10 * 4,
t * s / 10 * 4,
bsize
];
};
}
function curve(h = 1, w = 1.1, s = 13, size = 3, [x, y] = [
0,
0
]) {
return (t)=>{
return [
-Math.sin(t * w / 5.7) * h * 50 + x,
t * s / 10 * 4 + y,
size
];
};
}
function swim(h = 1, w = 1.1, s = 13, size = 3, dh = 0.1) {
return (t)=>{
return [
-Math.sin(t * w / 5.7) * (h + dh * t) * 50,
t * s / 10 * 4,
size
];
};
}
function fastswim(h = 1, w = 1.1, s = 13, size = 3, dh = 0.1) {
return (t)=>{
return [
-Math.sin(t * w / 5.7) * (h + dh * t * t) * 50,
t * s / 10 * 4,
size
];
};
}
function ago(h = 1, w = 1.1, s = 13, size = 3, z = 4) {
return (t)=>{
return [
-Math.abs(Math.sin(t * w / 5.7) * h * 50),
t * s / 10 * 4 - z,
size
];
};
}
function damashi(s = 19, l = 0, size = 3, w = 1) {
let nt = 0;
if (l) {
return function(t) {
if (t * s / 10 * 4 > (this.parent.game.me.st.y - 500) * 2 - 300) {
return [
w * (t - nt),
t * s / 10 * 4,
size
];
}
nt = t;
return [
0,
t * s / 10 * 4,
size
];
};
} else {
return function(t) {
if (t * s / 10 * 4 > (this.parent.game.me.st.y - 500) * 2 - 300) {
return [
-w * (t - nt),
t * s / 10 * 4,
size
];
}
nt = t;
return [
0,
t * s / 10 * 4,
size
];
};
}
}
function yura(h = 1, w = 1.1, s = 13, size = 3) {
return (t)=>{
return [
-Math.sin(t * w / 20) * h * 40 + Math.sin(t * w / 50) * 20 * h,
t * s / 10 * 3,
size
];
};
}
function yura2(h = 1, w = 1.1, s = 1, size = 3, dy = 0, [x, y] = [
0,
0
]) {
return (t)=>{
return [
-Math.sin(t * w / 20) * h + x,
1 / (s * w) * (10 * Math.sin(t * w / 10) + t * w) + y + t * dy,
size
];
};
}
function charge(s = 1, size = 3) {
return (t)=>{
return [
0,
2000 - s * 10000 / (t / 30 + 5),
size
];
};
}
function syuki(param, count) {
return function(t, extra) {
return param[extra.count % count].call(this, t, extra);
};
}
function X(param) {
return function(t, extra) {
if (extra && extra?.cost) {
return param[extra.cost].call(this, t, extra);
} else {
return [
0,
0,
10000
];
}
};
}
function huurie(x = 100, dx = 1, size = 3) {
return (t)=>{
return [
-(4 * x / Math.PI) * (Math.sin(t * dx / 9) + Math.sin(t * dx * 3 / 9) / 3 + Math.sin(t * dx * 5 / 9) / 5 + Math.sin(t * dx * 7 / 9) / 7 + Math.sin(t * dx * 9 / 9) / 9),
t * dx * Math.PI * 3,
size
];
};
}
function inazuma(dy = 0.5, size = 3, x = 53, speed = 9, add = 0) {
return (t)=>{
t += add;
return [
-(8 * x / (Math.PI * Math.PI)) * (Math.sin(t * dy / 2) - Math.sin(t * dy * 3 / 2) / 9 + Math.sin(t * dy * 5 / 2) / 25 - Math.sin(t * dy * 7 / 2) / 49 + Math.sin(t * dy * 9 / 2) / 81 - Math.sin(t * dy * 11 / 2) / 121 + Math.sin(t * dy * 13 / 2) / 169 - Math.sin(t * dy * 15 / 2) / 225 + Math.sin(t * dy * 17 / 2) / 289 - Math.sin(t * dy * 19 / 2) / 361 + Math.sin(t * dy * 21 / 2) / 441),
t * dy * Math.PI * speed,
size
];
};
}
function shinaru(speed = 10, s = 1800, z = 0, w = 700, size = 12, [x, y] = [
0,
-50
]) {
return (t)=>{
return [
-(1 / s) * (t * speed - z) * (t * speed - w) + x,
t * speed + y,
size
];
};
}
function daen2(p = 360, q = 40, speed = 0.015, size = 3, z = 300, θ = 2, add = 0) {
return (t)=>{
t += add;
if (t * speed <= θ) {
return [
q * Math.sin(t * Math.PI * speed),
-p * Math.cos(t * Math.PI * speed) + z,
size
];
} else θ <= t * speed;
{
return [
0,
-140000000,
size
];
}
};
}
function tubo(d = 1, speed = 4, size = 3, [x, y] = [
0,
-20
], add = -10) {
return (t)=>{
t += add;
return [
(((t * speed - 378) / 21) ** 3 / 3 - 64 * ((t * speed - 378) / 21)) / 6 * d + x + 220,
t * speed + y,
size
];
};
}
function lcurve(h = 1, w = 1.1, s = 13, size = 3, [x, y] = [
0,
0
], zurasi = 0, dy = 0) {
return (t)=>{
return [
Math.sin(t * w / 5.7) * h * 50 + x - zurasi * t / 10,
t * s / 10 * 4 + y + t * dy,
size
];
};
}
function rlcurve(h = 1, w = 1.1, s = 13, size = 3, [x, y] = [
0,
0
], zurasi = 0, dy = 0) {
return (t)=>{
return [
-(Math.sin(t * w / 5.7) * h * 50 + x - zurasi * t / 10),
t * s / 10 * 4 + y + t * dy,
size
];
};
}
function load_skill(star) {
star.skill = [
skill_list[star.skill_select[0]],
skill_list[star.skill_select[1]],
skill_list[star.skill_select[2]]
];
star.skill_gage[0].innerText = star.skill[0].name;
star.skill_gage[1].innerText = star.skill[1].name;
star.skill_gage[2].innerText = star.skill[2].name;
star.skill_gage_cost[0].innerText = star.skill[0].x ? "X" : star.skill[0].cost + "";
star.skill_gage_cost[1].innerText = star.skill[1].x ? "X" : star.skill[1].cost + "";
star.skill_gage_cost[2].innerText = star.skill[2].x ? "X" : star.skill[2].cost + "";
p_skill(star);
}
function p_skill(star) {
const pStatus = [
"☆",
"★"
];
star.skill_gage_cost[0].innerText = star.skill[0].x ? "X" : star.skill[0].cost + "";
star.skill_gage_cost[1].innerText = star.skill[1].x ? "X" : star.skill[1].cost + "";
star.skill_gage_cost[2].innerText = star.skill[2].x ? "X" : star.skill[2].cost + "";
if (star.st.p < star.skill[1].p) {
star.skill_gage_cost[1].innerText = pStatus[1].repeat(star.st.p);
star.skill_gage_cost[1].innerText += pStatus[0].repeat(star.skill[1].p - star.st.p);
}
if (star.st.p < star.skill[1].p + star.skill[2].p) {
star.skill_gage_cost[2].innerText = pStatus[1].repeat(star.st.p - star.skill[1].p > 0 ? star.st.p - star.skill[1].p : 0);
star.skill_gage_cost[2].innerText += pStatus[0].repeat(star.skill[1].p + star.skill[2].p - star.st.p < star.skill[2].p ? star.skill[1].p + star.skill[2].p - star.st.p : star.skill[2].p);
}
}
const skill_list = [
{
p: 0,
cost: 1,
name: "しょぼショット",
shots: [
{
func: dFunc(0, 6.48, 3)
}
]
},
{
p: 2,
cost: 5,
name: "トリプルスター",
shots: [
{
func: dFunc(3.724, 15.288, 3, 0, [
0.98,
-6.86
])
},
{
func: dFunc(0, 15.68, 5, 0, [
0,
-6.86
])
},
{
func: dFunc(-3.724, 15.288, 3, 0, [
-0.98,
-6.86
])
}
]
},
{
p: 2,
cost: 7,
name: "プチだんまく",
shots: danmaku(4)
},
{
p: 2,
cost: 7,
name: "ファイブスター",
shots: [
{
func: dFunc(10.515, 16.15, 3, 0, [
2.5,
0
]),
delay: 300
},
{
func: dFunc(6.154, 18.46, 3, 0, [
3,
0
]),
delay: 300
},
{
func: dFunc(0, 20, 5, 0, [
0,
-0.5
]),
delay: 300
},
{
func: dFunc(-6.154, 18.46, 3, 0, [
-3,
0
]),
delay: 300
},
{
func: dFunc(-10.515, 16.15, 3, 0, [
-2.5,
0
]),
delay: 300
}
]
},
{
p: 0,
cost: 2,
name: "ショット",
shots: [
{
func: dFunc(0, 17.5, 3)
}
]
},
{
p: 2,
cost: 3,
name: "だましレフト",
shots: [
{
func: damashi(17.5, 1, 3, 1.5),
delay: 0
}
]
},
{
p: 2,
cost: 3,
name: "だましライト",
shots: [
{
func: damashi(17.5, 0, 3, 1.5),
delay: 0
}
]
},
{
p: 2,
cost: 4,
name: "ファストショット",
shots: [
{
func: dFunc(0, 27, 3),
delay: 0
}
]
},
{
p: 2,
cost: 7,
name: "スピードショット",
shots: [
{
func: dFunc(0, 48.6, 3, 0, [
0,
10
]),
delay: 25
}
]
},
{
p: 2,
cost: 5,
name: "ファストレフト",
shots: [
{
func: damashi(27, 1, 3, 2),
delay: 0
}
]
},
{
p: 2,
cost: 5,
name: "ファストライト",
shots: [
{
func: damashi(27, 0, 3, 2),
delay: 0
}
]
},
{
p: 0,
cost: 2,
name: "カーブショット",
shots: [
{
func: curve(0.98, 0.93, 12.86),
delay: 0
}
]
},
{
p: 0,
cost: 1,
name: "しょぼカーブ",
shots: [
{
func: curve(0.48, 0.95, 6.48),
delay: 0
}
]
},
{
p: 2,
cost: 5,
name: "さんれんぱつ",
shots: [
{
func: dFunc(0, 19.8, 3),
delay: 0
},
{
func: dFunc(0, 19.8, 3),
delay: 160
},
{
func: dFunc(0, 19.8, 3),
delay: 310
}
]
},
{
p: 2,
cost: 4,
name: "ファストカーブ",
shots: [
{
func: curve(1.05, 1.1, 20),
delay: 0
}
]
},
{
p: 2,
cost: 8,
name: "はっぽんあし",
shots: happon()
},
{
p: 2,
cost: 8,
name: "のびのびカーブ",
shots: nobinobi()
},
{
p: 0,
cost: 2,
name: "ドリルショット",
shots: [
{
func: dFunc(0, 15, 3),
delay: 0,
drill: true
}
]
},
{
p: 1,
cost: 2,
name: "スロードリル",
shots: [
{
func: dFunc(0, 2.7, 3),
delay: 0,
drill: true
}
]
},
{
p: 1,
cost: 4,
name: "ツインドリル",
shots: [
{
func: dFunc(3, 15, 3),
delay: 0,
drill: true
},
{
func: dFunc(-3, 15, 3),
delay: 0,
drill: true
}
]
},
{
p: 3,
cost: 8,
name: "ドリルファイブ",
shots: [
{
func: dFunc(13.67, 21, 3, 0, [
3.25,
0
]),
delay: 400,
drill: true
},
{
func: dFunc(8, 24, 3, 0, [
3.9,
0
]),
delay: 400,
drill: true
},
{
func: dFunc(0, 26, 5, 0, [
0,
-0.65
]),
delay: 400,
drill: true
},
{
func: dFunc(-8, 24, 3, 0, [
-3.9,
0
]),
delay: 400,
drill: true
},
{
func: dFunc(-13.67, 21, 3, 0, [
-3.25,
0
]),
delay: 400,
drill: true
}
]
},
{
p: 2,
cost: 8,
name: "ドリルアタック",
shots: [
{
func: dFunc(2.14, 26.8, 1.5, 0, [
0,
-5
]),
delay: 200,
drill: true
},
{
func: dFunc(1.07, 26.95, 1.5, 0, [
0,
-5
]),
delay: 200,
drill: true
},
{
func: dFunc(0, 27, 1.5, 0, [
0,
-5
]),
delay: 200,
drill: true
},
{
func: dFunc(-1.07, 26.95, 1.5, 0, [
0,
-5
]),
delay: 200,
drill: true
},
{
func: dFunc(-2.14, 26.8, 1.5, 0, [
0,
-5
]),
delay: 200,
drill: true
}
]
},
{
p: 0,
cost: 2,
name: "ヘヴィショット",
shots: [
{
func: dFunc(0, 10.5, 9),
delay: 0
}
]
},
{
p: 0,
cost: 3,
name: "ヘヴィツイン",
shots: [
{
func: dFunc(4, 10, 8.5),
delay: 0
},
{
func: dFunc(-4, 10, 8.5),
delay: 0
}
]
},
{
p: 3,
cost: 5,
name: "スーパーヘヴィ",
shots: [
{
func: dFunc(0, 11.95, 18),
delay: 0
}
]
},
{
p: 2,
cost: 9,
name: "だんまく",
shots: danmaku()
},
{
p: 2,
cost: 9,
name: "マグナムショット",
shots: [
{
func: dFunc(0, 26, 24),
delay: 1000
}
]
},
{
p: 0,
cost: 1,
name: "プチショット",
shots: [
{
func: dFunc(0, 8.55, 1.5),
delay: 0
}
]
},
{
p: 1,
cost: 2,
name: "プチツイン",
shots: [
{
func: dFunc(2.5, 8.31491712707, 1.5),
delay: 0
},
{
func: dFunc(-2.5, 8.31491712707, 1.5),
delay: 0
}
]
},
{
p: 2,
cost: 3,
name: "ふうせんショット",
shots: [
{
func: fusen(0, 8.55, 1.5, 9),
delay: 0
}
]
},
{
p: 2,
cost: 6,
name: "バルーンファイブ",
shots: [
{
func: fusen(2.6, 8.1, 1.5, 4),
delay: 25
},
{
func: fusen(1.3, 8.3, 1.5, 4),
delay: 12
},
{
func: fusen(0, 8.5, 1.5, 4),
delay: 0
},
{
func: fusen(-1.3, 8.3, 1.5, 4),
delay: 12
},
{
func: fusen(-2.6, 8.1, 1.5, 4),
delay: 25
}
]
},
{
p: 2,
cost: 6,
name: "ジャンボふうせん",
shots: [
{
func: fusen(0, 8.55, 1.5, 33),
delay: 0
}
]
},
{
p: 0,
cost: 1,
name: "ナメショット",
shots: [
{
func: curve(0.45, 0.95, 2.7),
delay: 0
}
]
},
{
p: 0,
cost: 2,
name: "ナメドリル",
shots: [
{
func: curve(0.45, 0.95, 2.7),
delay: 0,
drill: true
}
]
},
{
p: 1,
cost: 4,
name: "ナメヘヴィ",
shots: [
{
func: curve(0.6, 0.7, 3.35, 10),
delay: 0,
drill: true
}
]
},
{
p: 2,
cost: 6,
name: "ナメスプレッド",
shots: name_spread()
},
{
p: 0,
cost: 2,
name: "ゆらゆらショット",
shots: [
{
func: yura2(60, 1.55, 100, 3, 4, [
0,
0
]),
delay: 0
}
]
},
{
p: 0,
cost: 1,
name: "しょぼゆらゆら",
shots: [
{
func: yura2(30, 1.5, 10, 3, 2),
delay: 0
}
]
},
{
p: 2,
cost: 5,
name: "イカスプレッド",
shots: i_spread()
},
{
p: 2,
cost: 4,
name: "ワイドカーブ",
shots: [
{
func: curve(4, 0.17, 9.7),
delay: 0
}
]
},
{
p: 2,
cost: 10,
name: "じゅっぽんあし",
shots: juppon()
},
{
p: 2,
cost: 7,
name: "うずしお",
shots: uzushio()
},
{
p: 0,
cost: 3,
name: "ヘヴィドリル",
shots: [
{
func: dFunc(0, 12.65, 11),
delay: 0,
drill: true
}
]
},
{
p: 2,
cost: 4,
name: "ライオンツイン",
shots: [
{
func: dFunc(4, 12, 9.5),
delay: 0,
drill: true
},
{
func: dFunc(-4, 12, 9.5),
delay: 0,
drill: true
}
]
},
{
p: 4,
cost: 10,
name: "ハイパーショット",
shots: [
{
func: dFunc(0, 47, 30),
delay: 2500,
drill: true
}
]
},
{
p: 0,
cost: 2,
name: "チャージアロー",
shots: [
{
func: charge(),
delay: 100
}
]
},
{
p: 0,
cost: 2,
name: "ピエロショット",
shots: [
{
func: dFunc(0, 17.7, 3),
delay: 0
}
]
},
{
p: 2,
cost: 4,
name: "ミラーショット",
shots: [
{
func: mirror(0, 17.7, 3),
delay: 0
}
]
},
{
p: 2,
cost: 5,
name: "だましダブル",
shots: [
{
func: damashi(17.7, 1, 3, 1.5),
delay: 0
},
{
func: damashi(17.7, 0, 3, 1.5),
delay: 0
}
]
},
{
p: 0,
cost: 3,
name: "ドリルカーブ",
shots: [
{
func: curve(1.5, 0.9, 10.83),
delay: 0,
drill: true
}
]
},
{
p: 0,
cost: 3,
name: "ゆらゆらドリル",
shots: [
{
func: yura(1.7, 1, 13),
delay: 0,
drill: true
}
]
},
{
p: 2,
cost: 5,
name: "ムーンサルト",
shots: [
{
func: curve(5.6, 0.21, 17.5),
delay: 0
}
]
},
{
p: 2,
cost: 6,
name: "ドリルムーン",
shots: [
{
func: curve(-5.6, 0.21, 17.8),
delay: 0,
drill: true
}
]
},
{
p: 2,
cost: 8,
name: "ムーンスプレッド",
shots: m_spread()
},
{
p: 3,
cost: 8,
name: "ムーンエイト",
shots: happon(true)
},
{
p: 0,
cost: 3,
name: "あわショット",
shots: [
{
func: dFunc(0, 4.26345609065, 1.5),
delay: 0
},
{
func: dFunc(0, 9.70967741935, 1.5),
delay: 0
},
{
func: dFunc(0, 15.05, 1.5),
delay: 0
}
]
},
{
p: 0,
cost: 3,
name: "あわリング",
shots: [
{
func: dKaiten(0, 0.29, 3.5, 0, 5, 0.21),
delay: 0
},
{
func: dKaiten(Math.PI, 0.29, 3.5, 0, 5, 0.21),
delay: 0
}
]
},
{
p: 2,
cost: 6,
name: "あわスプレー",
shots: awasp()
},
{
p: 2,
cost: 6,
name: "あわウォール",
shots: [
0,
1,
2,
3,
4,
5,
6,
7,
8,
9
].map((e)=>({
func: dFunc(0, 4.26345609065 + 1.7 * e, 1.5),
delay: 0
}))
},
{
p: 2,
cost: 8,
name: "あわはなび",
shots: awawash()
},
{
p: 2,
cost: 8,
name: "あわサイクロン",
shots: awa_ring()
},
{
p: 0,
cost: 3,
name: "ダブルショット",
shots: [
{
func: curve(0.69, 1.11, 12.75),
delay: 0
},
{
func: curve(-0.69, 1.11, 12.75),
delay: 0
}
]
},
{
p: 0,
cost: 2,
name: "しょぼダブル",
shots: [
{
func: curve(0.6, 1.05, 6.48),
delay: 0
},
{
func: curve(-0.6, 1.05, 6.48),
delay: 0
}
]
},
{
p: 2,
cost: 4,
name: "サイドアタック",
shots: [
{
func: dFunc(0, 20, 3, 0, [
240,
-150
]),
delay: 250
},
{
func: dFunc(0, 20, 3, 0, [
115,
-150
]),
delay: 250
},
{
func: dFunc(0, 20, 3, 0, [
-115,
-150
]),
delay: 250
},
{
func: dFunc(0, 20, 3, 0, [
-240,
-150
]),
delay: 250
}
]
},
{
p: 0,
cost: 1,
x: true,
name: "てんびんショット",
shots: [
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
10: dFunc(0, 10.91, 1.5)
}),
delay: 0
}
]
},
{
p: 0,
cost: 2,
name: "しょぼツイン",
shots: [
{
func: dFunc(2.15, 6.48, 3, 0, [
1.2,
-4
]),
delay: 0
},
{
func: dFunc(-2.15, 6.48, 3, 0, [
-1.2,
-4
]),
delay: 0
}
]
},
{
p: 2,
cost: 6,
name: "スローファイブ",
shots: [
{
func: dFunc(1.42, 2.181, 1.5, 0, [
0.3375,
0
]),
delay: 0,
drill: true
},
{
func: dFunc(0.83, 2.492, 1.5, 0, [
0.405,
0
]),
delay: 0,
drill: true
},
{
func: dFunc(0, 2.7, 2.5, 0, [
0,
-0.0675
]),
delay: 0,
drill: true
},
{
func: dFunc(-0.83, 2.492, 1.5, 0, [
-0.405,
0
]),
delay: 0,
drill: true
},
{
func: dFunc(-1.42, 2.181, 1.5, 0, [
-0.3375,
0
]),
delay: 0,
drill: true
}
]
},
{
p: 2,
cost: 4,
name: "ヘヴィカーブ",
shots: [
{
func: curve(1.05, 0.95, 14, 10),
delay: 0
}
]
},
{
p: 2,
cost: 5,
name: "ゲジゲジ",
shots: [
{
func: dFunc(0, 3.5, 3),
delay: 0
},
{
func: curve(0.7, 0.9, 3.5, 1.5),
delay: 0
},
{
func: curve(-0.7, 0.9, 3.5, 1.5),
delay: 0
},
{
func: dFunc(0, 3.5, 3),
delay: 250
},
{
func: curve(0.7, 0.9, 3.5, 1.5),
delay: 250
},
{
func: curve(-0.7, 0.9, 3.5, 1.5),
delay: 250
},
{
func: dFunc(0, 3.5, 3),
delay: 500
},
{
func: curve(0.7, 0.9, 3.5, 1.5),
delay: 500
},
{
func: curve(-0.7, 0.9, 3.5, 1.5),
delay: 500
},
{
func: dFunc(0, 3.5, 3),
delay: 750
},
{
func: curve(0.7, 0.9, 3.5, 1.5),
delay: 750
},
{
func: curve(-0.7, 0.9, 3.5, 1.5),
delay: 750
},
{
func: dFunc(0, 3.5, 3),
delay: 1000
},
{
func: curve(0.7, 0.9, 3.5, 1.5),
delay: 1000
},
{
func: curve(-0.7, 0.9, 3.5, 1.5),
delay: 1000
},
{
func: dFunc(0, 3.5, 3),
delay: 1250
},
{
func: curve(0.7, 0.9, 3.5, 1.5),
delay: 1250
},
{
func: curve(-0.7, 0.9, 3.5, 1.5),
delay: 1250
}
]
},
{
p: 0,
cost: 2,
name: "スイム",
shots: [
{
func: swim(0.15, 0.5, 9.3, 3, 0.0084),
delay: 0
}
]
},
{
p: 0,
cost: 2,
name: "たきのぼり",
shots: [
{
func: takino(0, 0.21, 3, 40, 0, 3, 1, [
0,
0
])
}
]
},
{
p: 2,
cost: 5,
name: "ソナー",
shots: [
{
func: dFunc(0, 18, 1.5, 0, [
0,
-20
]),
delay: 0
},
{
func: dFuncif(9, 9, 0, 18, 30, 0, 1.5, [
0,
-20
]),
delay: 0
},
{
func: dFuncif(-9, 9, 0, 18, 30, 0, 1.5, [
0,
-20
]),
delay: 0
},
{
func: dKaiten(-1 / 2 * Math.PI, 0.1, 7.2, 0, 20, 0, 1.5, 1, 1, [
0,
130
]),
delay: 0
},
{
func: dFuncif(0, 0, 0, 18, 30, 0, 1.5, [
0,
-20
]),
delay: 0
}
]
},
{
p: 2,
cost: 6,
name: "unアルティメットソナー",
shots: [
{
func: dFunc(0, 20, 3, 0, [
0,
-20
]),
delay: 0
},
{
func: dFuncif(10, 10, 0, 20, 30, 0, 3, [
0,
-20
]),
delay: 0
},
{
func: dFuncif(-10, 10, 0, 20, 30, 0, 3, [
0,
-20
]),
delay: 0
},
{
func: dKaiten(1 / 2 * Math.PI, 0.1, 8, 0, 60, 0, 1.5, 1, 1, [
0,
140
]),
delay: 0
},
{
func: dFuncif(0, 0, 0, 20, 30, 0, 3, [
0,
-20
]),
delay: 0
}
]
},
{
p: 2,
cost: 4,
name: "ファストスイム",
shots: [
{
func: fastswim(0.3, 0.55, 17, 3, 0.0003)
}
]
},
{
p: 2,
cost: 4,
name: "トビウオ",
shots: [
{
func: ago(2.5, 0.87, 20, 3)
}
]
},
{
p: 2,
cost: 6,
name: "ぎょらい",
shots: [
{
func: kasoku(0, 1.3, 6.5, 0, [
113,
-100
]),
delay: 400
},
{
func: kasoku(0, 1.3, 6.5, 0, [
-113,
-100
]),
delay: 400
}
]
},
{
p: 2,
cost: 7,
name: "スーパーぎょらい",
shots: [
{
func: kasoku(0, 1.3, 6.5, 0, [
113,
-100
]),
delay: 400
},
{
func: kasoku(0, 1.3, 6.5, 0, [
-113,
-100
]),
delay: 400
},
{
func: kasoku(0, 1.3, 6.5, 0, [
280,
-100
]),
delay: 400
},
{
func: kasoku(0, 1.3, 6.5, 0, [
-280,
-100
]),
delay: 400
}
]
},
{
p: 0,
cost: 3,
name: "プチデルタ",
shots: [
{
func: dKaiten(-2 / 3 * Math.PI, 0.018, 3.3, 0, 25, 0, 1.5, -1, 1, [
0,
40
]),
delay: 0
},
{
func: dKaiten(2 / 3 * Math.PI, 0.018, 3.3, 0, 25, 0, 1.5, -1, 1, [
0,
40
]),
delay: 0
},
{
func: dKaiten(0 * Math.PI, 0.018, 3.3, 0, 25, 0, 1.5, -1, 1, [
0,
40
]),
delay: 0
}
]
},
{
p: 2,
cost: 6,
name: "デルタ",
shots: [
{
func: dKaiten(1 / 3 * Math.PI, 0.03, 2.5, 0, 50, 0.5, 1.5, -1, 1, [
0,
0
]),
delay: 0,
drill: true
},
{
func: dKaiten(-1 / 3 * Math.PI, 0.03, 2.5, 0, 50, 0.5, 1.5, -1, 1, [
0,
0
]),
delay: 0,
drill: true
},
{
func: dKaiten(-1 * Math.PI, 0.03, 2.5, 0, 50, 0.5, 1.5, -1, 1, [
0,
0
]),
delay: 0,
drill: true
},
{
func: dKaiten(-2 / 3 * Math.PI, 0.03, 2.5, 0, 25, 0.25, 1.5, -1, 1, [
0,
0
]),
delay: 0,
drill: true
},
{
func: dKaiten(2 / 3 * Math.PI, 0.03, 2.5, 0, 25, 0.25, 1.5, -1, 1, [
0,
0
]),
delay: 0,
drill: true
},
{
func: dKaiten(0 * Math.PI, 0.03, 2.5, 0, 25, 0.25, 1.5, -1, 1, [
0,
0
]),
delay: 0,
drill: true
}
]
},
{
p: 2,
cost: 4,
name: "スクエア",
shots: [
{
func: dKaiten(0 * Math.PI, 0.03, 2.5, 0, 50, 0.5, 1.5, -1, 1, [
0,
0
]),
delay: 0,
drill: true
},
{
func: dKaiten(-0.5 * Math.PI, 0.03, 2.5, 0, 50, 0.5, 1.5, -1, 1, [
0,
0
]),
delay: 0,
drill: true
},
{
func: dKaiten(-1 * Math.PI, 0.03, 2.5, 0, 50, 0.5, 1.5, -1, 1, [
0,
0
]),
delay: 0,
drill: true
},
{
func: dKaiten(0.5 * Math.PI, 0.03, 2.5, 0, 50, 0.5, 1.5, -1, 1, [
0,
0
]),
delay: 0,
drill: true
}
]
},
{
p: 2,
cost: 5,
name: "デルタツイン",
shots: [
{
func: dKaiten(-1 / 3 * Math.PI, -0.03, 4, 0, 50, 0, 1.5, -1, 1, [
50,
40
]),
delay: 0,
drill: true
},
{
func: dKaiten(1 / 3 * Math.PI, -0.03, 4, 0, 50, 0, 1.5, -1, 1, [
50,
40
]),
delay: 0,
drill: true
},
{
func: dKaiten(1 * Math.PI, -0.03, 4, 0, 50, 0, 1.5, -1, 1, [
50,
40
]),
delay: 0,
drill: true
},
{
func: dKaiten(-2 / 3 * Math.PI, 0.03, 4, 0, 50, 0, 1.5, -1, 1, [
-50,
40
]),
delay: 0,
drill: true
},
{
func: dKaiten(2 / 3 * Math.PI, 0.03, 4, 0, 50, 0, 1.5, -1, 1, [
-50,
40
]),
delay: 0,
drill: true
},
{
func: dKaiten(0 * Math.PI, 0.03, 4, 0, 50, 0, 1.5, -1, 1, [
-50,
40
]),
delay: 0,
drill: true
}
]
},
{
p: 2,
cost: 9,
name: "ヘキサ",
shots: [
{
func: dKaiten(2 / 3 * Math.PI, 0.07, 2.5, 0, 30, 0.3, 1.5, -1, 1, [
0,
0
]),
delay: 0,
drill: true
},
{
func: dKaiten(1 / 3 * Math.PI, 0.07, 2.5, 0, 30, 0.3, 1.5, -1, 1, [
0,
0
]),
delay: 0,
drill: true
},
{
func: dKaiten(0 * Math.PI, 0.07, 2.5, 0, 30, 0.3, 1.5, -1, 1, [
0,
0
]),
delay: 0,
drill: true
},
{
func: dKaiten(-1 / 3 * Math.PI, 0.07, 2.5, 0, 30, 0.3, 1.5, -1, 1, [
0,
0
]),
delay: 0,
drill: true
},
{
func: dKaiten(-2 / 3 * Math.PI, 0.07, 2.5, 0, 30, 0.3, 1.5, -1, 1, [
0,
0
]),
delay: 0,
drill: true
},
{
func: dKaiten(-1 * Math.PI, 0.07, 2.5, 0, 30, 0.3, 1.5, -1, 1, [
0,
0
]),
delay: 0,
drill: true
},
{
func: dKaiten(3 / 6 * Math.PI, 0.07, 2.5, 0, 50, 0.5, 1.5, -1, 1, [
0,
0
]),
delay: 0,
drill: true
},
{
func: dKaiten(1 / 6 * Math.PI, 0.07, 2.5, 0, 50, 0.5, 1.5, -1, 1, [
0,
0
]),
delay: 0,
drill: true
},
{
func: dKaiten(-1 / 6 * Math.PI, 0.07, 2.5, 0, 50, 0.5, 1.5, -1, 1, [
0,
0
]),
delay: 0,
drill: true
},
{
func: dKaiten(-3 / 6 * Math.PI, 0.07, 2.5, 0, 50, 0.5, 1.5, -1, 1, [
0,
0
]),
delay: 0,
drill: true
},
{
func: dKaiten(-5 / 6 * Math.PI, 0.07, 2.5, 0, 50, 0.5, 1.5, -1, 1, [
0,
0
]),
delay: 0,
drill: true
},
{
func: dKaiten(-7 / 6 * Math.PI, 0.07, 2.5, 0, 50, 0.5, 1.5, -1, 1, [
0,
0
]),
delay: 0,
drill: true
}
]
},
{
p: 2,
cost: 8,
name: "クロック",
shots: [
{
func: dFuncif(14 * Math.cos(0 * Math.PI), 14 * Math.sin(0 * Math.PI) + 8, 0, 10, 35, 0, 1.5, [
0,
0
]),
delay: 300,
drill: true
},
{
func: dFuncif(14 * Math.cos(1 / 6 * Math.PI), 14 * Math.sin(1 / 6 * Math.PI) + 8, 0, 10, 35, 0, 1.5, [
0,
0
]),
delay: 300,
drill: true
},
{
func: dFuncif(14 * Math.cos(2 / 6 * Math.PI), 14 * Math.sin(2 / 6 * Math.PI) + 8, 0, 10, 35, 0, 1.5, [
0,
0
]),
delay: 300,
drill: true
},
{
func: dFuncif(14 * Math.cos(3 / 6 * Math.PI), 14 * Math.sin(3 / 6 * Math.PI) + 8, 0, 10, 35, 0, 1.5, [
0,
0
]),
delay: 300,
drill: true
},
{
func: dFuncif(14 * Math.cos(4 / 6 * Math.PI), 14 * Math.sin(4 / 6 * Math.PI) + 8, 0, 10, 35, 0, 1.5, [
0,
0
]),
delay: 300,
drill: true
},
{
func: dFuncif(14 * Math.cos(5 / 6 * Math.PI), 14 * Math.sin(5 / 6 * Math.PI) + 8, 0, 10, 35, 0, 1.5, [
0,
0
]),
delay: 300,
drill: true
},
{
func: dFuncif(14 * Math.cos(1 * Math.PI), 14 * Math.sin(1 * Math.PI) + 8, 0, 10, 35, 0, 1.5, [
0,
0
]),
delay: 300,
drill: true
},
{
func: dFuncif(14 * Math.cos(-1 / 6 * Math.PI), 14 * Math.sin(-1 / 6 * Math.PI) + 8, 0, 10, 35, 0, 1.5, [
0,
0
]),
delay: 300,
drill: true
},
{
func: dFuncif(14 * Math.cos(-2 / 6 * Math.PI), 14 * Math.sin(-2 / 6 * Math.PI) + 8, 0, 10, 35, 0, 1.5, [
0,
0
]),
delay: 300,
drill: true
},
{
func: dFuncif(14 * Math.cos(-3 / 6 * Math.PI), 14 * Math.sin(-3 / 6 * Math.PI) + 8, 0, 10, 35, 0, 1.5, [
0,
0
]),
delay: 300,
drill: true
},
{
func: dFuncif(14 * Math.cos(-4 / 6 * Math.PI), 14 * Math.sin(-4 / 6 * Math.PI) + 8, 0, 10, 35, 0, 1.5, [
0,
0
]),
delay: 300,
drill: true
},
{
func: dFuncif(14 * Math.cos(-5 / 6 * Math.PI), 14 * Math.sin(-5 / 6 * Math.PI) + 8, 0, 10, 35, 0, 1.5, [
0,
0
]),
delay: 300,
drill: true
},
{
func: dFuncif(0, 8, 0, 10, 35, 0, 1.5, [
0,
0
]),
delay: 300,
drill: true
},
{
func: dKaitenFuncif(4.8, 1 / 90 * Math.PI, 4.5 / 6 * Math.PI, 1 / 90 * Math.PI, 0, 3.2, 0, 4, 35, 0, 1.5, [
0,
0
]),
delay: 300,
drill: true
},
{
func: dKaitenFuncif(2.4, 1 / 90 * Math.PI, 4.5 / 6 * Math.PI, 1 / 90 * Math.PI, 0, 3.2, 0, 4, 35, 0, 1.5, [
0,
0
]),
delay: 300,
drill: true
},
{
func: dKaitenFuncif(2.2, 0, 118 / 432 * Math.PI, 1 / 540 * Math.PI, 0, 3.2, 0, 4, 35, 0, 1.5, [
0,
0
]),
delay: 300,
drill: true
}
]
},
{
p: 2,
cost: 6,
name: "スプリットマジック",
shots: [
{
func: sprit(0, 17.7, 3, 1),
delay: 0
},
{
func: sprit(0, 17.7, 3, -1),
delay: 0
}
]
},
{
p: 2,
cost: 8,
name: "よいどれラッシュ",
shots: rush(80 / 71)
},
{
p: 3,
cost: 8,
name: "ドリルラッシュ",
shots: rush(1, true)
},
{
p: 0,
cost: 2,
name: "よいどれショット",
shots: [
{
func: yoidore(),
delay: 0
}
]
},
{
p: 2,
cost: 8,
name: "ダブルムーン",
shots: [
{
func: curve(5.8, 0.25, 21.2, 3, [
0,
-40
]),
delay: 100
},
{
func: curve(-5.8, 0.25, 21.2, 3, [
0,
-40
]),
delay: 100
}
]
},
{
p: 3,
cost: 9,
name: "スーパークロス",
shots: [
{
func: dFunc(13.3, 30, 3, 0, [
-140,
-200
]),
drill: true
},
{
func: dFunc(-13.3, 30, 3, 0, [
140,
-200
]),
drill: true
},
{
func: dFunc(13.3, 30, 3, 0, [
-300,
-200
]),
drill: true
},
{
func: dFunc(-13.3, 30, 3, 0, [
300,
-200
]),
drill: true
}
]
},
{
p: 0,
cost: 3,
name: "はばたき",
shots: [
{
func: lcurve(2.5, 0.09, 18.5, 3, [
7,
-5
], 3)
},
{
func: lcurve(0.6, 0.2, 19, 3, [
-2,
1
], 9)
}
]
},
{
p: 2,
cost: 6,
name: "ビッグウィング",
shots: [
{
func: lcurve(14, 0.01, 4, 3, [
0,
-60
], -26, 2.7),
delay: 100
},
{
func: lcurve(11, 0.021, 9.8, 3, [
6,
-45
], -13.6, 1.7),
delay: 100
},
{
func: lcurve(4.6, 0.06, 16, 3, [
5,
-20
], -4.5),
delay: 100
},
{
func: lcurve(2.4, 0.07, 18, 3, [
7,
-5
], 1),
delay: 100
},
{
func: lcurve(0.3, 0.0001, 18.5, 3, [
0,
1
], 6.3),
delay: 100
},
{
func: lcurve(0.3, 0.00001, 14, 3, [
-3,
1
], 24, 1.3),
delay: 100
}
]
},
{
p: 2,
cost: 8,
name: "ダブルウィング",
shots: [
{
func: lcurve(14, 0.01, 4, 3, [
0,
-60
], -26, 2.7),
delay: 200
},
{
func: lcurve(11, 0.021, 9.8, 3, [
6,
-45
], -13.6, 1.7),
delay: 200
},
{
func: lcurve(4.6, 0.06, 16, 3, [
5,
-20
], -4.5),
delay: 200
},
{
func: lcurve(2.4, 0.07, 18, 3, [
7,
-5
], 1),
delay: 200
},
{
func: lcurve(0.3, 0.0001, 18.5, 3, [
0,
1
], 6.3),
delay: 200
},
{
func: lcurve(0.3, 0.00001, 14, 3, [
-3,
1
], 24, 1.3),
delay: 200
},
{
func: rlcurve(14, 0.01, 4, 3, [
0,
-60
], -26, 2.7),
delay: 1100
},
{
func: rlcurve(11, 0.021, 9.8, 3, [
6,
-45
], -13.6, 1.7),
delay: 1100
},
{
func: rlcurve(4.6, 0.06, 16, 3, [
5,
-20
], -4.5),
delay: 1100
},
{
func: rlcurve(2.4, 0.07, 18, 3, [
7,
-5
], 1),
delay: 1100
},
{
func: rlcurve(0.3, 0.0001, 18.5, 3, [
0,
1
], 6.3),
delay: 1100
},
{
func: rlcurve(0.3, 0.00001, 14, 3, [
-3,
1
], 24, 1.3),
delay: 1100
}
]
},
{
p: 0,
cost: 3,
name: "ブーメラン",
shots: [
{
func: daen2(420, 50, 0.012, 3, 380)
}
]
},
{
p: 0,
cost: 3,
name: "スローブーメラン",
shots: [
{
func: daen2(420, 110, 0.01, 3, 380)
}
]
},
{
p: 2,
cost: 4,
name: "オオガマ",
shots: [
{
func: daen2(390, 380, 0.014, 3, 360),
delay: 50
}
]
},
{
p: 2,
cost: 6,
name: "ハサミショット",
shots: [
{
func: dFunc(-4, 18.9, 1.5, 0, [
0,
-10
]),
delay: 0,
drill: true
},
{
func: dFunc(-7.27, 17.87, 1.5, 0, [
0,
-10
]),
delay: 0,
drill: true
},
{
func: dFunc(4, 18.9, 1.5, 0, [
0,
-10
]),
delay: 0,
drill: true
},
{
func: dFunc(7.27, 17.87, 1.5, 0, [
0,
-10
]),
delay: 0,
drill: true
}
]
},
{
p: 2,
cost: 8,
name: "ハサミアタック",
shots: [
{
func: dFunc(-6, 28.35, 1.5, 0, [
0,
-10
]),
delay: 100,
drill: true
},
{
func: dFunc(-11.1, 26.76, 1.5, 0, [
0,
-10
]),
delay: 100,
drill: true
},
{
func: dFunc(-15.81, 24.285, 1.5, 0, [
0,
-10
]),
delay: 100,
drill: true
},
{
func: dFunc(6, 28.35, 1.5, 0, [
0,
-10
]),
delay: 100,
drill: true
},
{
func: dFunc(11.1, 26.76, 1.5, 0, [
0,
-10
]),
delay: 100,
drill: true
},
{
func: dFunc(15.81, 24.285, 1.5, 0, [
0,
-10
]),
delay: 100,
drill: true
}
]
},
{
p: 2,
cost: 10,
name: "ジャグリング",
shots: [
{
func: daen2(420, 120, 0.014, 3, 380)
},
{
func: daen2(420, 200, 0.017, 3, 380)
},
{
func: daen2(420, 280, 0.02, 3, 380)
},
{
func: daen2(420, -120, 0.014, 3, 380)
},
{
func: daen2(420, -200, 0.017, 3, 380)
},
{
func: daen2(420, -280, 0.02, 3, 380)
}
]
},
{
p: 0,
cost: 1,
name: "スーパースロー",
shots: [
{
func: dFunc(0, 2, 3),
delay: 0
}
]
},
{
p: 2,
cost: 3,
name: "にれんぱつ",
shots: [
{
func: dFunc(0, 19.55, 3),
delay: 0
},
{
func: dFunc(0, 19.55, 3),
delay: 160
}
]
},
{
p: 2,
cost: 8,
name: "カカシだんまく",
shots: danmaku(5, true, true)
},
{
p: 0,
cost: 2,
name: "ジャブ",
shots: [
{
func: kasoku(-0.015, 0.295, 5, 0, [
65,
-70
])
}
]
},
{
p: 2,
cost: 4,
name: "ストレート",
shots: [
{
func: kasoku2(0.00235, 0.95, 5, 0, [
-100,
-150
]),
delay: 50
}
]
},
{
p: 2,
cost: 4,
name: "フットワーク",
shots: [
{
func: huurie()
}
]
},
{
p: 2,
cost: 5,
name: "フック",
shots: [
{
func: kasoku4(14, -0.000168, 0.95, 5, 0, [
40,
-170
]),
delay: 110
}
]
},
{
p: 2,
cost: 7,
name: "カミソリアッパー",
shots: [
{
func: kasoku3(0.15, 0.015, 18, 0, [
-150,
-70
]),
delay: 500,
drill: true
}
]
},
{
p: 3,
cost: 8,
name: "デンプシーロール",
shots: [
{
func: kasoku5(21, -0.0125, 0.84, 5, 0, [
0,
-50
]),
delay: 250
},
{
func: kasoku5(21, -0.0125, 0.84, 5, 0, [
0,
-50
]),
delay: 600
},
{
func: kasoku5(21, -0.0125, 0.84, 5, 0, [
0,
-50
]),
delay: 1050
},
{
func: kasoku5(-21, 0.0125, 0.84, 5, 0, [
0,
-50
]),
delay: 475
},
{
func: kasoku5(-21, 0.0125, 0.84, 5, 0, [
0,
-50
]),
delay: 825
},
{
func: kasoku5(-21, 0.0125, 0.84, 5, 0, [
0,
-50
]),
delay: 1275
}
]
},
{
p: 2,
cost: 5,
name: "water fall",
shots: [
{
func: curve(0.3, 2, 8.5, 3, [
-4200 / 7,
-60
]),
delay: 0
},
{
func: curve(0.3, 2, 8.5, 3, [
-3000 / 7,
-60
]),
delay: 0
},
{
func: curve(0.3, 2, 8.5, 3, [
-1800 / 7,
-60
]),
delay: 0
},
{
func: curve(0.3, 2, 8.5, 3, [
-600 / 7,
-60
]),
delay: 0
},
{
func: curve(0.3, 2, 8.5, 3, [
600 / 7,
-60
]),
delay: 0
},
{
func: curve(0.3, 2, 8.5, 3, [
1800 / 7,
-60
]),
delay: 0
},
{
func: curve(0.3, 2, 8.5, 3, [
3000 / 7,
-60
]),
delay: 0
},
{
func: curve(0.3, 2, 8.5, 3, [
4200 / 7,
-60
]),
delay: 0
},
{
func: curve(-0.3, 2, 8.5, 3, [
-4800 / 7,
-140
]),
delay: 0
},
{
func: curve(-0.3, 2, 8.5, 3, [
-3600 / 7,
-140
]),
delay: 0
},
{
func: curve(-0.3, 2, 8.5, 3, [
-2400 / 7,
-140
]),
delay: 0
},
{
func: curve(-0.3, 2, 8.5, 3, [
-1200 / 7,
-140
]),
delay: 0
},
{
func: curve(-0.3, 2, 8.5, 3, [
0 / 7,
-140
]),
delay: 0
},
{
func: curve(-0.3, 2, 8.5, 3, [
1200 / 7,
-140
]),
delay: 0
},
{
func: curve(-0.3, 2, 8.5, 3, [
2400 / 7,
-140
]),
delay: 0
},
{
func: curve(-0.3, 2, 8.5, 3, [
3600 / 7,
-140
]),
delay: 0
},
{
func: curve(-0.3, 2, 8.5, 3, [
4800 / 7,
-140
]),
delay: 0
},
{
func: curve(0.3, 2, 8.5, 3, [
-4200 / 7,
-220
]),
delay: 0
},
{
func: curve(0.3, 2, 8.5, 3, [
-3000 / 7,
-220
]),
delay: 0
},
{
func: curve(0.3, 2, 8.5, 3, [
-1800 / 7,
-220
]),
delay: 0
},
{
func: curve(0.3, 2, 8.5, 3, [
-600 / 7,
-220
]),
delay: 0
},
{
func: curve(0.3, 2, 8.5, 3, [
600 / 7,
-220
]),
delay: 0
},
{
func: curve(0.3, 2, 8.5, 3, [
1800 / 7,
-220
]),
delay: 0
},
{
func: curve(0.3, 2, 8.5, 3, [
3000 / 7,
-220
]),
delay: 0
},
{
func: curve(0.3, 2, 8.5, 3, [
4200 / 7,
-220
]),
delay: 0
},
{
func: curve(-0.3, 2, 8.5, 3, [
-4800 / 7,
-300
]),
delay: 0
},
{
func: curve(-0.3, 2, 8.5, 3, [
-3600 / 7,
-300
]),
delay: 0
},
{
func: curve(-0.3, 2, 8.5, 3, [
-2400 / 7,
-300
]),
delay: 0
},
{
func: curve(-0.3, 2, 8.5, 3, [
-1200 / 7,
-300
]),
delay: 0
},
{
func: curve(-0.3, 2, 8.5, 3, [
0 / 7,
-300
]),
delay: 0
},
{
func: curve(-0.3, 2, 8.5, 3, [
1200 / 7,
-300
]),
delay: 0
},
{
func: curve(-0.3, 2, 8.5, 3, [
2400 / 7,
-300
]),
delay: 0
},
{
func: curve(-0.3, 2, 8.5, 3, [
3600 / 7,
-300
]),
delay: 0
},
{
func: curve(-0.3, 2, 8.5, 3, [
4800 / 7,
-300
]),
delay: 0
}
]
},
{
p: 0,
cost: 2,
name: "ツボショット",
shots: [
{
func: tubo()
},
{
func: tubo(-1, 4, 3, [
-450,
-20
])
}
]
},
{
p: 0,
cost: 3,
name: "なげナイフ",
shots: [
{
func: dFunc(0, 20, 1.5, 0, [
-52,
-50
]),
delay: 0
},
{
func: dFunc(0, 20, 1.5, 0, [
52,
-50
]),
delay: 250,
drill: true
}
]
},
{
p: 0,
cost: 3,
name: "イナズマぎり",
shots: [
{
func: inazuma()
}
]
},
{
p: 2,
cost: 6,
name: "ハルパー",
shots: [
{
func: dKaitenFuncif(18.7, 0.003 * Math.PI, 3 / 10 * Math.PI, 0.0575 / 10 * Math.PI, 0, 0, 0, 4.5, 12, 0, 1.5, [
0,
-50
])
},
{
func: dKaitenFuncif(18.7, 0.003 * Math.PI, 1 / 10 * Math.PI, 0.0575 / 10 * Math.PI, 0, 0, 0, 4.5, 12, 0, 1.5, [
0,
-50
])
},
{
func: dKaitenFuncif(18.7, 0.003 * Math.PI, -1 / 10 * Math.PI, 0.0575 / 10 * Math.PI, 0, 0, 0, 4.5, 12, 0, 1.5, [
0,
-50
])
},
{
func: dKaitenFuncif(18.7, 0.003 * Math.PI, -3 / 10 * Math.PI, 0.0575 / 10 * Math.PI, 0, 0, 0, 4.5, 12, 0, 1.5, [
0,
-50
])
},
{
func: dKaitenFuncif(18.7, 0.003 * Math.PI, -5 / 10 * Math.PI, 0.0575 / 10 * Math.PI, 0, 0, 0, 4.5, 12, 0, 1.5, [
0,
-50
])
},
{
func: dKaitenFuncif(18.7, 0.003 * Math.PI, -7 / 10 * Math.PI, 0.0575 / 10 * Math.PI, 0, 0, 0, 4.5, 12, 0, 1.5, [
0,
-50
])
},
{
func: dKaitenFuncif(18.7, 0.003 * Math.PI, -9 / 10 * Math.PI, 0.0575 / 10 * Math.PI, 0, 0, 0, 4.5, 12, 0, 1.5, [
0,
-50
])
},
{
func: dKaitenFuncif(18.7, 0.003 * Math.PI, 9 / 10 * Math.PI, 0.0575 / 10 * Math.PI, 0, 0, 0, 4.5, 12, 0, 3, [
0,
-50
]),
delay: 0,
drill: true
}
]
},
{
p: 2,
cost: 4,
name: "エックスぎり",
shots: [
{
func: xgiri1(),
delay: 160,
drill: true
},
{
func: xgiri2(),
delay: 160,
drill: true
}
]
},
{
p: 2,
cost: 8,
name: "つるぎのまい",
shots: [
{
func: turumai2(),
delay: 70
},
{
func: turumai1(),
delay: 220
},
{
func: turumai4(),
delay: 370
},
{
func: turumai3(),
delay: 420
},
{
func: turumai6(),
delay: 570
},
{
func: turumai5(),
delay: 620
}
]
},
{
p: 3,
cost: 9,
name: "ツバメがえし",
shots: [
{
func: daen2(420, 0, 0.044, 3, 380)
}
]
},
{
p: 2,
cost: 1,
x: true,
name: "ハテナショット",
shots: [
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
10: dFunc(0, 10, 1.5)
}),
delay: 0
}
]
},
{
p: 2,
cost: 5,
name: "サイドドリル",
shots: [
{
func: dFunc(0, 25, 3, 0, [
240,
-50
]),
delay: 250
},
{
func: dFunc(0, 25, 3, 0, [
120,
-50
]),
delay: 250
},
{
func: dFunc(0, 25, 3, 0, [
-120,
-50
]),
delay: 250
},
{
func: dFunc(0, 25, 3, 0, [
-240,
-50
]),
delay: 250
}
]
},
{
p: 2,
cost: 4,
name: "ファストよいどれ",
shots: [
{
func: yoidore(2),
delay: 0
}
]
},
{
p: 3,
cost: 2,
name: "だましスイッチ",
shots: [
{
func: switchdamashi(),
delay: 0
}
]
},
{
p: 3,
cost: 1,
x: true,
name: "へんそくショット",
shots: [
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
10: dFunc(0, 95, 3)
}),
delay: 0
}
]
},
{
p: 0,
cost: 2,
name: "ドリルよいどれ",
shots: [
{
func: yoidore(15 / 17.5),
delay: 0,
drill: true
}
]
},
{
p: 0,
cost: 3,
name: "ふいうちショット",
shots: [
{
func: fuiuchi(),
drill: true
}
]
},
{
p: 2,
cost: 3,
name: "ドリルブーメラン",
shots: [
{
func: daen2(420, -20, 0.012, 3, 380),
drill: true
}
]
},
{
p: 0,
cost: 2,
name: "カカシショット",
shots: [
{
func: kakashi1(),
drill: true
},
{
func: kakashi2(),
obake: true
},
{
func: kakashi3()
}
]
},
{
p: 0,
cost: 2,
name: "オバケショット",
shots: [
{
func: dFunc(0, 15, 3),
obake: true
}
]
},
{
p: 2,
cost: 3,
name: "オバケカーブ",
shots: [
{
func: curve(-0.98, 0.93, 12.86, 3),
obake: true
}
]
},
{
p: 1,
cost: 2,
name: "スローオバケ",
shots: [
{
func: dFunc(0, 2.7, 3),
obake: true
}
]
},
{
p: 2,
cost: 8,
name: "オバケファイブ",
shots: [
{
func: dFunc(13.67 * 23.52 / 26, 21 * 23.52 / 26, 3, 0, [
2.5 * 23.52 / 20,
0
]),
delay: 400,
obake: true
},
{
func: dFunc(8 * 23.52 / 26, 24 * 23.52 / 26, 3, 0, [
3 * 23.52 / 20,
0
]),
delay: 400,
obake: true
},
{
func: dFunc(0, 23.52, 5, 0, [
0,
-0.5 * 23.52 / 20
]),
delay: 400,
obake: true
},
{
func: dFunc(-8 * 23.52 / 26, 24 * 23.52 / 26, 3, 0, [
-3 * 23.52 / 20,
0
]),
delay: 400,
obake: true
},
{
func: dFunc(-13.67 * 23.52 / 26, 21 * 23.52 / 26, 3, 0, [
-2.5 * 23.52 / 20,
0
]),
delay: 400,
obake: true
}
]
},
{
p: 2,
cost: 8,
name: "オバケスプレッド",
shots: name_spread(27, 14, 400)
},
{
p: 0,
cost: 2,
name: "オバケヘヴィ",
shots: [
{
func: dFunc(0, 6.7, 9.3, 0, [
0,
-10
]),
obake: true
}
]
},
{
p: 2,
cost: 6,
name: "オバケスター",
shots: [
{
func: dFunc(4.75 * 1.2, 19.5 * 1.2, 3, 0, [
1.25 * 1.2,
-8.75 * 1.2
]),
obake: true
},
{
func: dFunc(0, 20 * 1.2, 5, 0, [
0,
-8.75 * 1.2
]),
obake: true
},
{
func: dFunc(-4.75 * 1.2, 19.5 * 1.2, 3, 0, [
-1.25 * 1.2,
-8.75 * 1.2
]),
obake: true
}
]
},
{
p: 2,
cost: 6,
name: "スーパーオバケ",
shots: [
{
func: dFunc(0, 12.14, 26, 0, [
0,
-20
]),
obake: true
}
]
},
{
p: 0,
cost: 2,
name: "オバケよいどれ",
shots: [
{
func: yoidore(15 / 17.5),
delay: 0,
obake: true
}
]
},
{
p: 0,
cost: 2,
name: "オバケドリル",
shots: [
{
func: dFunc(0, 14, 3),
drill: true,
obake: true
}
]
},
{
p: 0,
cost: 3,
name: "オバケツイン",
shots: [
{
func: dFunc(3.8, 15, 3, 0, [
0.96,
-6.73
]),
obake: true
},
{
func: dFunc(-3.8, 15, 3, 0, [
-0.96,
-6.73
]),
obake: true
}
]
},
{
p: 2,
cost: 6,
name: "ドリルスター",
shots: [
{
func: dFunc(4.75 * 1.2, 19.5 * 1.2, 3, 0, [
1.25 * 1.2,
-8.75 * 1.2
]),
drill: true,
obake: true
},
{
func: dFunc(0, 20 * 1.2, 5, 0, [
0,
-8.75 * 1.2
]),
drill: true,
obake: true
},
{
func: dFunc(-4.75 * 1.2, 19.5 * 1.2, 3, 0, [
-1.25 * 1.2,
-8.75 * 1.2
]),
drill: true,
obake: true
}
]
},
{
p: 2,
cost: 4,
name: "しんかショット",
shots: [
{
func: shinka()
}
]
},
{
p: 2,
cost: 5,
name: "カカシスター",
shots: kakashistar(false, 13.5)
},
{
p: 2,
cost: 6,
name: "ミックススター",
shots: kakashistar(true, 22)
},
{
p: 2,
cost: 4,
name: "ミラーふうせん",
shots: [
{
func: mirrorfusen()
}
]
},
{
p: 2,
cost: 4,
name: "ツインふうせん",
shots: [
{
func: fusen(2.5, 8.31491712707, 1.5, 10),
delay: 0
},
{
func: fusen(-2.5, 8.31491712707, 1.5, 10),
delay: 0
}
]
},
{
p: 2,
cost: 2,
name: "ロングエイム",
shots: [
{
func: longaim(60)
}
]
},
{
p: 0,
cost: 2,
name: "ショートエイム",
shots: [
{
func: shortaim(60)
}
]
},
{
p: 2,
cost: 4,
name: "ターンエイム",
shots: [
{
func: turnaim(60)
}
]
},
{
p: 2,
cost: 3,
name: "コーナーエイム",
shots: [
{
func: corneraim1(60)
},
{
func: corneraim2(60)
}
]
},
{
p: 2,
cost: 5,
name: "トリプルエイム",
shots: [
{
func: corneraim1(60)
},
{
func: corneraim2(60)
},
{
func: longaim(60)
}
]
},
{
p: 2,
cost: 10,
name: "へんしん",
shots: [
{
func: effect((s)=>{
if (s.isme) {
s.parent.game.me.skill_select = [
103,
135,
20
];
load_skill(s.parent.game.me);
s.parent.game.gs.set([
"skill_select",
"cost"
]);
}
})
}
]
},
{
p: 2,
cost: 3,
name: "センターマジック",
shots: [
{
func: center(0, 17.7, 3),
delay: 0
}
]
},
{
p: 0,
cost: 3,
name: "ヘヴィモチ",
shots: [
{
func: shinaru(9)
}
]
},
{
p: 2,
cost: 6,
name: "ハイパースロー",
shots: [
{
func: dFunc(0, 7.5, 29, 10),
delay: 0,
drill: true
}
]
}
];
const chara_list = [
{
name: "ヒトデせいじん",
desc: "バランスのとれた使いやすいやつ！",
skill1: [
0,
65
],
skill2: [
1
],
skill3: [
2,
3
]
},
{
name: "ウサギせいじん",
desc: "こいつのショットはシンプルにはやい！",
skill1: [
4
],
skill2: [
5,
6,
7
],
skill3: [
8,
9,
10,
119
]
},
{
name: "タコせいじん",
desc: "クネクネまがるショットをうつひねくれものだ！",
skill1: [
11,
12
],
skill2: [
13,
14
],
skill3: [
15,
16
]
},
{
name: "オバケせいじん",
desc: "おそろしいオバケショットの使い手だ！",
skill1: [
124,
133
],
skill2: [
125,
126
],
skill3: [
127,
128
]
},
{
name: "モグラせいじん",
desc: "Pボックスをつらぬくドリルをあやつる！",
skill1: [
17,
133
],
skill2: [
18,
19,
66
],
skill3: [
20,
21
]
},
{
name: "クジラせいじん",
desc: "ショットがデカい! へヴィ級ファイター！",
skill1: [
22,
23
],
skill2: [
24,
67
],
skill3: [
25,
26
]
},
{
name: "カエルせいじん",
desc: "突然ふくらむ風船みたいなやつだ！",
skill1: [
27
],
skill2: [
28,
29,
30,
136,
139,
140
],
skill3: [
31
]
},
{
name: "ナメクジせいじん",
desc: "いやらしい戦法をとる！",
skill1: [
32,
33
],
skill2: [
34,
68,
136
],
skill3: [
35
]
},
{
name: "ヒツジせいじん",
desc: "ふわふわしててもあたればちめいしょうだ！",
skill1: [],
skill2: [],
skill3: []
},
{
name: "イカせいじん",
desc: "きたない戦法をこのむイカれたやつだ！",
skill1: [
36,
37
],
skill2: [
38,
39
],
skill3: [
40,
41
]
},
{
name: "シシせいじん",
desc: "ハイパーショットはすべてをふんさいする！",
skill1: [
42,
121
],
skill2: [
43,
149
],
skill3: [
44
]
},
{
name: "イテせいじん",
desc: "ねらったエモノをクールにおいこむスペース狩人だ！",
skill1: [
142,
45
],
skill2: [
141,
144,
145
],
skill3: [
143
]
},
{
name: "ウオせいじん",
desc: "むじゅうりょくの海をすいすいおよぐ！",
skill1: [
69,
70
],
skill2: [
71,
72,
73,
74
],
skill3: [
75,
76
]
},
{
name: "テンビンせいじん",
desc: "宇宙の秩序をみだすものにさばきをくだす！",
skill1: [
64,
77
],
skill2: [
78,
79,
80
],
skill3: [
81,
82
]
},
{
name: "ピエロせいじん",
desc: "鏡の法則をつかんだら一人前のピエロ星人だ！",
skill1: [
46
],
skill2: [
47,
118,
147
],
skill3: [
48,
83
]
},
{
name: "カピバラせいじん",
desc: "おだやかな性格でともだちが多い！",
skill1: [
86,
120,
132
],
skill2: [
117
],
skill3: [
84,
85
]
},
{
name: "ムーンせいじん",
desc: "ゆらゆらうごくミステリアスな存在だ！",
skill1: [
49,
50
],
skill2: [
51,
52
],
skill3: [
53,
54
]
},
{
name: "カニせいじん",
desc: "怒るとあわをたくさんはいてくる！",
skill1: [
55,
56
],
skill2: [
57,
58
],
skill3: [
59,
60
]
},
{
name: "フタゴせいじん",
desc: "1度に2発うってくるやっかいなフタゴだ！",
skill1: [
61,
62
],
skill2: [
63,
116
],
skill3: [
87,
88
]
},
{
name: "ファントムせいじん",
desc: "顔ににあわずおくびょうな性格だ！",
skill1: [
129,
133,
134
],
skill2: [
130
],
skill3: [
131
]
},
{
name: "ニワトリせいじん",
desc: "大切なタマゴをこわすものは絶対にゆるさない！",
skill1: [
89,
148
],
skill2: [
90,
149
],
skill3: [
91
]
},
{
name: "サソリせいじん",
desc: "じまんのハサミでブーメランをキャッチ！",
skill1: [
92,
93
],
skill2: [
94,
95,
122
],
skill3: [
96,
97
]
},
{
name: "カカシせいじん",
desc: "練習にきた宇宙人を返りうちにするのが生きがいだ！",
skill1: [
123,
0,
98
],
skill2: [
99,
137,
138
],
skill3: [
100
]
},
{
name: "オウシせいじん",
desc: "あいさつがわりのジャブであいてをノックアウト！",
skill1: [
101
],
skill2: [
102,
103,
104
],
skill3: [
105,
106
]
},
{
name: "オトメせいじん",
desc: "じぶんの手は汚さない宇宙のトップアイドルだ！",
skill1: [],
skill2: [],
skill3: []
},
{
name: "ヤギせいじん",
desc: "おだやかにみえるがすべてをぶっこわしたいとおもっている！",
skill1: [],
skill2: [],
skill3: [
146
]
},
{
name: "ミズガメせいじん",
desc: "まかふしぎなパワーをたくわえている！",
skill1: [
108
],
skill2: [],
skill3: []
},
{
name: "ペルセウスせいじん",
desc: "あらゆる武器をつかいこなすウェポンマスターだ！",
skill1: [
110,
109
],
skill2: [
111,
112
],
skill3: [
113,
114
]
}
];
function yoidore(s = 1, dx1 = 3.4, dx2 = -4.6, dx3 = 8, dx4 = -6.9, dx5 = -2.8, dx6 = 6.6, dx7 = 2.5, dy1 = 18.8125, dy2 = 18.35, dy3 = 17.3, dy4 = 18.13, dy5 = 19.55, dy6 = 17.92, dy7 = 19.3, size = 3, add = 0, [x, y] = [
0,
0
]) {
return syuki({
0: dFunc(dx7 * s, dy7 * s, size, add, [
x,
y
]),
1: dFunc(dx1 * s, dy1 * s, size, add, [
x,
y
]),
2: dFunc(dx2 * s, dy2 * s, size, add, [
x,
y
]),
3: dFunc(dx3 * s, dy3 * s, size, add, [
x,
y
]),
4: dFunc(dx4 * s, dy4 * s, size, add, [
x,
y
]),
5: dFunc(dx5 * s, dy5 * s, size, add, [
x,
y
]),
6: dFunc(dx6 * s, dy6 * s, size, add, [
x,
y
])
}, 7);
}
function switchdamashi() {
return syuki({
0: damashi(17.5, 0, 3, 1.5),
1: damashi(17.5, 1, 3, 1.5)
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
9: curve(0, 1, 5, 2.5)
}, 10);
}
function shinka() {
return function(t, extra) {
switch(extra?.count || 0){
case 0:
return dFunc(0, 8.55, 1.5).call(this, t);
case 1:
return curve(0.15, 1, 8.55, 1.5).call(this, t);
case 2:
return curve(0.3, 1, 8.55, 1.5).call(this, t);
case 3:
return fusen(0, 8.55, 1.5, 4).call(this, t);
case 4:
return fusen(0, 8.55, 1.5, 7).call(this, t);
case 5:
return fusen(0, 8.55, 1.5, 10).call(this, t);
case 6:
return fusen(0, 8.55, 1.5, 13).call(this, t);
case 7:
return fusen(0, 8.55, 1.5, 16).call(this, t);
case 8:
return fusen(0, 8.55, 1.5, 19).call(this, t);
case 9:
return fusen(0, 8.55, 1.5, 23).call(this, t);
case 10:
return fusen(0, 8.55, 1.5, 27).call(this, t);
case 11:
return fusen(0, 8.55, 1.5, 31).call(this, t);
case 12:
return fusen(0, 8.55, 1.5, 35).call(this, t);
case 13:
return fusen(0, 8.55, 1.5, 39).call(this, t);
case 14:
return fusen(0, 8.55, 1.5, 43).call(this, t);
default:
return fusen(0, 8.55, 1.5, 43).call(this, t);
}
};
}
function kakashi1() {
return syuki({
0: dFunc(0, 15.2, 3),
1: ()=>[
10000,
0,
0
],
2: ()=>[
10000,
0,
0
],
3: ()=>[
10000,
0,
0
]
}, 4);
}
function kakashi3() {
return syuki({
0: ()=>[
10000,
0,
0
],
1: dFunc(0, 15.2, 3),
2: curve(0.9, 1.05, 15.2, 3),
3: ()=>[
10000,
0,
0
]
}, 4);
}
function kakashi2() {
return syuki({
0: ()=>[
10000,
0,
0
],
1: ()=>[
10000,
0,
0
],
2: ()=>[
10000,
0,
0
],
3: dFunc(0, 15.2, 3)
}, 4);
}
function rush(s = 1, drill = false, dx1 = 3.4, dx2 = -4.6, dx3 = 8, dx4 = -6.9, dx5 = -2.8, dx6 = 6.6, dx7 = 2.5, dy1 = 18.8125, dy2 = 18.35, dy3 = 17.3, dy4 = 18.13, dy5 = 19.55, dy6 = 17.92, dy7 = 19.3, size = 3, add = 0, [x, y] = [
0,
0
]) {
const a = [];
{
a.push({
func: syuki({
1: dFunc(dx1 * s, dy1 * s, size, add, [
x,
y
]),
0: dFunc(-dx1 * s, dy1 * s, size, add, [
x,
y
])
}, 2),
delay: 100,
drill
});
a.push({
func: syuki({
1: dFunc(dx2 * s, dy2 * s, size, add, [
x,
y
]),
0: dFunc(-dx2 * s, dy2 * s, size, add, [
x,
y
])
}, 2),
delay: 225,
drill
});
a.push({
func: syuki({
1: dFunc(dx3 * s, dy3 * s, size, add, [
x,
y
]),
0: dFunc(-dx3 * s, dy3 * s, size, add, [
x,
y
])
}, 2),
delay: 350,
drill
});
a.push({
func: syuki({
1: dFunc(dx4 * s, dy4 * s, size, add, [
x,
y
]),
0: dFunc(-dx4 * s, dy4 * s, size, add, [
x,
y
])
}, 2),
delay: 475,
drill
});
a.push({
func: syuki({
1: dFunc(dx5 * s, dy5 * s, size, add, [
x,
y
]),
0: dFunc(-dx5 * s, dy5 * s, size, add, [
x,
y
])
}, 2),
delay: 600,
drill
});
a.push({
func: syuki({
1: dFunc(dx6 * s, dy6 * s, size, add, [
x,
y
]),
0: dFunc(-dx6 * s, dy6 * s, size, add, [
x,
y
])
}, 2),
delay: 725,
drill
});
a.push({
func: syuki({
1: dFunc(dx7 * s, dy7 * s, size, add, [
x,
y
]),
0: dFunc(-dx7 * s, dy7 * s, size, add, [
x,
y
])
}, 2),
delay: 850,
drill
});
a.push({
func: syuki({
1: dFunc(dx1 * s, dy1 * s, size, add, [
x,
y
]),
0: dFunc(-dx1 * s, dy1 * s, size, add, [
x,
y
])
}, 2),
delay: 975,
drill
});
}
return a;
}
function danmaku(x = 6, drill = false, kakashi = false) {
const a = [];
if (kakashi) {
for(let i = 0; i < x; i++){
a.push({
func: syuki({
1: dFunc(-2, 5, 1),
2: del,
0: del
}, 3),
delay: i * 800 + 200
});
a.push({
func: syuki({
2: dFunc(-2, 5, 1),
0: del,
1: del
}, 3),
delay: i * 800 + 200,
obake: true
});
a.push({
func: syuki({
0: dFunc(-2, 5, 1),
1: del,
2: del
}, 3),
delay: i * 800 + 200,
drill: true
});
a.push({
func: syuki({
1: dFunc(-1.5, 5, 1),
2: del,
0: del
}, 3),
delay: i * 800 + 400
});
a.push({
func: syuki({
2: dFunc(-1.5, 5, 1),
0: del,
1: del
}, 3),
delay: i * 800 + 400,
obake: true
});
a.push({
func: syuki({
0: dFunc(-1.5, 5, 1),
1: del,
2: del
}, 3),
delay: i * 800 + 400,
drill: true
});
a.push({
func: syuki({
1: dFunc(-1, 5, 1),
2: del,
0: del
}, 3),
delay: i * 800 + 800
});
a.push({
func: syuki({
2: dFunc(-1, 5, 1),
0: del,
1: del
}, 3),
delay: i * 800 + 800,
obake: true
});
a.push({
func: syuki({
0: dFunc(-1, 5, 1),
1: del,
2: del
}, 3),
delay: i * 800 + 800,
drill: true
});
a.push({
func: syuki({
1: dFunc(0, 5, 1),
2: del,
0: del
}, 3),
delay: i * 800 + 400
});
a.push({
func: syuki({
2: dFunc(0, 5, 1),
0: del,
1: del
}, 3),
delay: i * 800 + 400,
obake: true
});
a.push({
func: syuki({
0: dFunc(0, 5, 1),
2: del,
1: del
}, 3),
delay: i * 800 + 400,
drill: true
});
a.push({
func: syuki({
1: dFunc(1, 5, 1),
2: del,
0: del
}, 3),
delay: i * 800 + 200
});
a.push({
func: syuki({
2: dFunc(1, 5, 1),
0: del,
1: del
}, 3),
delay: i * 800 + 200,
obake: true
});
a.push({
func: syuki({
0: dFunc(1, 5, 1),
1: del,
2: del
}, 3),
delay: i * 800 + 200,
drill: true
});
a.push({
func: syuki({
1: dFunc(1.5, 5, 1),
2: del,
0: del
}, 3),
delay: i * 800 + 400
});
a.push({
func: syuki({
2: dFunc(1.5, 5, 1),
0: del,
1: del
}, 3),
delay: i * 800 + 400,
obake: true
});
a.push({
func: syuki({
0: dFunc(1.5, 5, 1),
1: del,
2: del
}, 3),
delay: i * 800 + 400,
drill: true
});
a.push({
func: syuki({
1: dFunc(2, 5, 1),
2: del,
0: del
}, 3),
delay: i * 800 + 600
});
a.push({
func: syuki({
2: dFunc(2, 5, 1),
0: del,
1: del
}, 3),
delay: i * 800 + 600,
obake: true
});
a.push({
func: syuki({
0: dFunc(2, 5, 1),
2: del,
1: del
}, 3),
delay: i * 800 + 600,
drill: true
});
}
return a;
} else {
for(let i = 0; i < x; i++){
a.push({
func: dFunc(-2, 5, 1),
delay: i * 800 + 200,
drill
});
a.push({
func: dFunc(-1.5, 5, 1),
delay: i * 800 + 400,
drill
});
a.push({
func: dFunc(-1, 5, 1),
delay: i * 800 + 800,
drill
});
a.push({
func: dFunc(0, 5, 1),
delay: i * 800 + 400,
drill
});
a.push({
func: dFunc(1, 5, 1),
delay: i * 800 + 200,
drill
});
a.push({
func: dFunc(1.5, 5, 1),
delay: i * 800 + 400,
drill
});
a.push({
func: dFunc(2, 5, 1),
delay: i * 800 + 600,
drill
});
}
return a;
}
}
function kakashistar(kakashi = false, s = 20) {
const a = [];
if (kakashi) {
{
a.push({
func: syuki({
0: dFunc(4.75 * s / 20, 19.5 * s / 20, 3, 0, [
1.25 * s / 20,
-8.75 * s / 20
]),
1: del,
2: del
}, 3)
});
a.push({
func: syuki({
1: dFunc(4.75 * s / 20, 19.5 * s / 20, 3, 0, [
1.25 * s / 20,
-8.75 * s / 20
]),
2: del,
0: del
}, 3),
drill: true
});
a.push({
func: syuki({
2: dFunc(4.75 * s / 20, 19.5 * s / 20, 3, 0, [
1.25 * s / 20,
-8.75 * s / 20
]),
0: del,
1: del
}, 3),
obake: true
});
a.push({
func: syuki({
1: dFunc(0, s, 5, 0, [
0,
-8.75 * s / 20
]),
2: del,
3: del
}, 3)
});
a.push({
func: syuki({
2: dFunc(0, s, 5, 0, [
0,
-8.75 * s / 20
]),
0: del,
1: del
}, 3),
drill: true
});
a.push({
func: syuki({
0: dFunc(0, s, 5, 0, [
0,
-8.75 * s / 20
]),
1: del,
2: del
}, 3),
obake: true
});
a.push({
func: syuki({
2: dFunc(-4.75 * s / 20, 19.5 * s / 20, 3, 0, [
-1.25 * s / 20,
-8.75 * s / 20
]),
0: del,
1: del
}, 3)
});
a.push({
func: syuki({
0: dFunc(-4.75 * s / 20, 19.5 * s / 20, 3, 0, [
-1.25 * s / 20,
-8.75 * s / 20
]),
1: del,
2: del
}, 3),
drill: true
});
a.push({
func: syuki({
1: dFunc(-4.75 * s / 20, 19.5 * s / 20, 3, 0, [
-1.25 * s / 20,
-8.75 * s / 20
]),
2: del,
0: del
}, 3),
obake: true
});
}
return a;
} else {
{
a.push({
func: syuki({
1: dFunc(4.75 * s / 20, 19.5 * s / 20, 3, 0, [
1.25 * s / 20,
-8.75 * s / 20
]),
2: del,
0: del
}, 3)
});
a.push({
func: syuki({
0: dFunc(4.75 * s / 20, 19.5 * s / 20, 3, 0, [
1.25 * s / 20,
-8.75 * s / 20
]),
1: del,
2: del
}, 3),
drill: true
});
a.push({
func: syuki({
2: dFunc(4.75 * s / 20, 19.5 * s / 20, 3, 0, [
1.25 * s / 20,
-8.75 * s / 20
]),
0: del,
1: del
}, 3),
obake: true
});
a.push({
func: syuki({
1: dFunc(0, s, 5, 0, [
0,
-8.75 * s / 20
]),
2: del,
0: del
}, 3)
});
a.push({
func: syuki({
0: dFunc(0, s, 5, 0, [
0,
-8.75 * s / 20
]),
1: del,
2: del
}, 3),
drill: true
});
a.push({
func: syuki({
2: dFunc(0, s, 5, 0, [
0,
-8.75 * s / 20
]),
0: del,
1: del
}, 3),
obake: true
});
a.push({
func: syuki({
1: dFunc(-4.75 * s / 20, 19.5 * s / 20, 3, 0, [
-1.25 * s / 20,
-8.75 * s / 20
]),
2: del,
0: del
}, 3)
});
a.push({
func: syuki({
0: dFunc(-4.75 * s / 20, 19.5 * s / 20, 3, 0, [
-1.25 * s / 20,
-8.75 * s / 20
]),
1: del,
2: del
}, 3),
drill: true
});
a.push({
func: syuki({
2: dFunc(-4.75 * s / 20, 19.5 * s / 20, 3, 0, [
-1.25 * s / 20,
-8.75 * s / 20
]),
0: del,
1: del
}, 3),
obake: true
});
}
return a;
}
}
function name_spread(z = 27, df = 2.568, de = 250) {
const s = df;
const a = [];
for(let i = 0; i < z; i++){
a.push({
func: dFunc(Math.sin(Math.PI / (2 / z) * i) * s, Math.cos(Math.PI / (2 / z) * i) * s, 1.5, 20, [
0,
-45
]),
delay: de
});
}
return a;
}
function awawash(afg = false) {
const a = [];
for(let i = 0; i < 11; i++){
a.push({
func: dFunc(19.8 * Math.sin(2 * i / 11 * Math.PI), 19.8 * Math.cos(2 * i / 11 * Math.PI), 1.5, 0, [
0,
-50
]),
delay: 500,
drill: afg
});
a.push({
func: dFunc(15.84 * Math.sin(2 * i / 11 * Math.PI), 15.84 * Math.cos(2 * i / 11 * Math.PI), 1.5, 0, [
0,
-50
]),
delay: 500,
drill: afg
});
a.push({
func: dFunc(11.85 * Math.sin(2 * i / 11 * Math.PI), 11.85 * Math.cos(2 * i / 11 * Math.PI), 1.5, 0, [
0,
-50
]),
delay: 500,
drill: afg
});
a.push({
func: dFunc(7.88 * Math.sin(2 * i / 11 * Math.PI), 7.88 * Math.cos(2 * i / 11 * Math.PI), 1.5, 0, [
0,
-50
]),
delay: 500,
drill: afg
});
a.push({
func: dFunc(3.93 * Math.sin(2 * i / 11 * Math.PI), 3.93 * Math.cos(2 * i / 11 * Math.PI), 1.5, 0, [
0,
-50
]),
delay: 500,
drill: afg
});
}
for(let i = 0; i < 11; i++){
a.push({
func: dFunc(17.82 * Math.sin((2 * i + 1) / 11 * Math.PI), 17.82 * Math.cos((2 * i + 1) / 11 * Math.PI), 1.5, 0, [
0,
-50
]),
delay: 500,
drill: afg
});
a.push({
func: dFunc(13.845 * Math.sin((2 * i + 1) / 11 * Math.PI), 13.845 * Math.cos((2 * i + 1) / 11 * Math.PI), 1.5, 0, [
0,
-50
]),
delay: 500,
drill: afg
});
a.push({
func: dFunc(9.865 * Math.sin((2 * i + 1) / 11 * Math.PI), 9.865 * Math.cos((2 * i + 1) / 11 * Math.PI), 1.5, 0, [
0,
-50
]),
delay: 500,
drill: afg
});
a.push({
func: dFunc(5.905 * Math.sin((2 * i + 1) / 11 * Math.PI), 5.905 * Math.cos((2 * i + 1) / 11 * Math.PI), 1.5, 0, [
0,
-50
]),
delay: 500,
drill: afg
});
}
return a;
}
function awasp(afg = false) {
const a = [];
for(let i = 0; i < 3; i++){
a.push({
func: dFunc(10.75 * Math.sin((-1 + i) / 12 * Math.PI), 10.75 * Math.cos((-1 + i) / 12 * Math.PI), 1.5, 0, [
0,
0
]),
drill: afg
});
a.push({
func: dFunc(8.6 * Math.sin((-1 + i) / 12 * Math.PI), 8.6 * Math.cos((-1 + i) / 12 * Math.PI), 1.5, 0, [
0,
0
]),
drill: afg
});
a.push({
func: dFunc(6.43162393162 * Math.sin((-1 + i) / 12 * Math.PI), 6.43162393162 * Math.cos((-1 + i) / 12 * Math.PI), 1.5, 0, [
0,
0
]),
drill: afg
});
a.push({
func: dFunc(4.26345609065 * Math.sin((-1 + i) / 12 * Math.PI), 4.26345609065 * Math.cos((-1 + i) / 12 * Math.PI), 1.5, 0, [
0,
0
]),
drill: afg
});
}
return a;
}
function awa_ring() {
const a = [];
for(let i = 0; i < 8; i++){
a.push({
func: dKaiten(Math.PI / 8 * (2 * i + 1), 0.13, 7, 0, 8, 1.55),
delay: 400
});
}
return a;
}
function uzushio() {
const a = [];
for(let i = 0; i < 10; i++){
a.push({
func: dKaiten(Math.PI / 10 * i, 0.17, 3, 0, 0.1, 0.00125, 3, 480, 1),
delay: 250 * i + 400,
drill: true
});
}
return a;
}
function happon(drill = false) {
const a = [];
a.push({
func: curve(3.15, 0.8, 12),
delay: 8 * 130,
drill
});
a.push({
func: curve(2.7, 0.8, 12),
delay: 7 * 130,
drill
});
a.push({
func: curve(2.25, 0.8, 12),
delay: 6 * 130,
drill
});
a.push({
func: curve(1.8, 0.8, 12),
delay: 5 * 130,
drill
});
a.push({
func: curve(1.35, 0.8, 12),
delay: 4 * 130,
drill
});
a.push({
func: curve(0.9, 0.8, 12),
delay: 3 * 130,
drill
});
a.push({
func: curve(0.45, 0.8, 12),
delay: 2 * 130,
drill
});
a.push({
func: dFunc(0, 12, 3),
delay: 1 * 130,
drill
});
return a;
}
function juppon() {
const a = [];
a.push({
func: curve(4.5, 0.8, 15),
delay: 10 * 140
});
a.push({
func: curve(4, 0.8, 15),
delay: 9 * 140
});
a.push({
func: curve(3.5, 0.8, 15),
delay: 8 * 140
});
a.push({
func: curve(3, 0.8, 15),
delay: 7 * 140
});
a.push({
func: curve(2.5, 0.8, 15),
delay: 6 * 140
});
a.push({
func: curve(2, 0.8, 15),
delay: 5 * 140
});
a.push({
func: curve(1.5, 0.8, 15),
delay: 4 * 140
});
a.push({
func: curve(1, 0.8, 15),
delay: 3 * 140
});
a.push({
func: curve(0.5, 0.8, 15),
delay: 2 * 140
});
a.push({
func: dFunc(0, 15, 3),
delay: 1 * 140
});
return a;
}
function nobinobi() {
const a = [];
a.push({
func: curve(4, 0.5, 12),
delay: 250
});
a.push({
func: curve(4.4, 0.5, 12),
delay: 250
});
a.push({
func: curve(4.8, 0.5, 12),
delay: 250
});
a.push({
func: curve(5.2, 0.5, 12),
delay: 250
});
a.push({
func: curve(5.6, 0.5, 12),
delay: 250
});
return a;
}
function i_spread() {
const a = [];
for(let i = 0; i < 24; i++){
a.push({
func: dCurve(Math.PI / 12 * i, 0.004, 1.5, 4),
delay: 0
});
}
return a;
}
function m_spread() {
const a = [];
for(let i = 0; i < 12; i++){
a.push({
func: dCurve(Math.PI / 6 * i, 0.012, 3, 7),
delay: 1000,
drill: true
});
}
for(let i = 0; i < 12; i++){
a.push({
func: dCurve(Math.PI / 6 * (i + 0.5), 0.012, 1.5, 7),
delay: 1000,
drill: true
});
}
return a;
}
let app;
let UI;
let pbox;
let pstar;
const RGB_ME = 0x29B6F6;
const RGB_ENEMY = 0xEF5350;
let chara = 0;
const url = new URL(location.href);
let ver = 0;
let debug;
const speed = 7;
const cost_speed = 0.5;
const p_speed = 1.8;
const box_speeds = [
2.5,
1.2,
1
];
const shot_speed = 1;
const Dapp = new PIXI.Application();
(async ()=>{
await Dapp.init({
background: "#000000"
});
UI = await fetch("/ui.html").then((res)=>res.text());
ver = parseInt(await fetch("/ver").then((res)=>res.text()));
document.getElementById("ver").innerText = `ver.${new Date(ver).toLocaleTimeString()} (${ver})`;
})();
function checkVer() {
return fetch("/ver").then((res)=>res.text()).then((i)=>{
if (ver !== parseInt(i)) {
alert("バージョンが更新されました。再読み込みします");
location.reload();
}
});
}
setTimeout(select, 100);
function sleep(t) {
return new Promise((resolve, reject)=>{
setTimeout(resolve, t);
});
}
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
"pe"
];
stars.forEach((e, i)=>{
if (i > 13 && !globalThis.kakin) {
return;
}
document.getElementById("select").innerHTML += `<button type="button" style="background-color: #0000;" onclick="skillSelect(${i})"><img style="width: 85px;" src="/img/${e}1.png" alt=""></button>`;
});
}
function skillSelect(i) {
if (globalThis.dev) {
for(let i = 1; i < document.getElementById("select").childNodes.length; i++){
document.getElementById("select").childNodes[i].style.backgroundColor = "#000";
}
document.getElementById("select").childNodes[i + 1].style.backgroundColor = "#29B6F6";
document.getElementById("skill-select0").innerHTML = "";
Object.keys(skill_list).forEach((e)=>{
const skill = skill_list[parseInt(e)];
document.getElementById("skill-select0").innerHTML += `<option value="${e}">${e} ${skill.name} [${skill.x ? "X" : skill.cost}] ${"☆".repeat(skill.p)}</option>`;
});
document.getElementById("skill-select1").innerHTML = "";
Object.keys(skill_list).forEach((e)=>{
const skill = skill_list[parseInt(e)];
document.getElementById("skill-select1").innerHTML += `<option value="${e}">${e} ${skill.name} [${skill.x ? "X" : skill.cost}] ${"☆".repeat(skill.p)}</option>`;
});
document.getElementById("skill-select2").innerHTML = "";
Object.keys(skill_list).forEach((e)=>{
const skill = skill_list[parseInt(e)];
document.getElementById("skill-select2").innerHTML += `<option value="${e}">${e} ${skill.name} [${skill.x ? "X" : skill.cost}] ${"☆".repeat(skill.p)}</option>`;
});
document.getElementById("run").innerHTML = '<input style="margin:10px 0 10px 0;" class="input" id="id" placeholder="ルーム ID" type="text"><button type="button" onclick="run()" class="run">▶︎遊ぶ</button>';
if (window.kakin) {
document.getElementById("run").innerHTML = '<input style="margin:10px 0 10px 0;" class="input" id="id" placeholder="ルーム ID" type="text"><input style="margin:10px 0 10px 0;" class="input" id="custom" placeholder="カスタムせいじん(<Skin1>+<Skin2>)" value="" type="text"><button type="button" onclick="preview()" style="margin:10px 0 10px 0;" class="run">カスタムせいじんのプレビュー</button><button type="button" onclick="run()" style="margin:10px 0 10px 0;" class="run">▶︎遊ぶ</button>';
}
document.getElementById("id").value = url.searchParams.get("code") || "";
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
for(let i = 1; i < document.getElementById("select").childNodes.length; i++){
document.getElementById("select").childNodes[i].style.backgroundColor = "#000";
}
document.getElementById("select").childNodes[i + 1].style.backgroundColor = "#29B6F6";
document.getElementById("skill-select0").innerHTML = "";
skills.skill1.forEach((e)=>{
const skill = skill_list[e];
document.getElementById("skill-select0").innerHTML += `<option value="${e}">${skill.name} [${skill.x ? "X" : skill.cost}] ${"☆".repeat(skill.p)}</option>`;
});
document.getElementById("skill-select1").innerHTML = "";
skills.skill2.forEach((e)=>{
const skill = skill_list[e];
document.getElementById("skill-select1").innerHTML += `<option value="${e}">${skill.name} [${skill.x ? "X" : skill.cost}] ${"☆".repeat(skill.p)}</option>`;
});
document.getElementById("skill-select2").innerHTML = "";
skills.skill3.forEach((e)=>{
const skill = skill_list[e];
document.getElementById("skill-select2").innerHTML += `<option value="${e}">${skill.name} [${skill.x ? "X" : skill.cost}] ${"☆".repeat(skill.p)}</option>`;
});
document.getElementById("run").innerHTML = '<input style="margin:10px 0 10px 0;" class="input" id="id" placeholder="ルーム ID" type="text"><button type="button" onclick="run()" class="run">▶︎遊ぶ</button>';
if (window.kakin) {
document.getElementById("run").innerHTML = '<input style="margin:10px 0 10px 0;" class="input" id="id" placeholder="ルーム ID" type="text"><input style="margin:10px 0 10px 0;" class="input" id="custom" placeholder="カスタムせいじん(<Skin1>+<Skin2>)" value="" type="text"><button type="button" onclick="preview()" style="margin:10px 0 10px 0;" class="run">カスタムせいじんのプレビュー</button><button type="button" onclick="run()" style="margin:10px 0 10px 0;" class="run">▶︎遊ぶ</button>';
}
document.getElementById("id").value = url.searchParams.get("code") || "";
}
function restart() {
checkVer();
document.getElementById("base").innerHTML = `<h1 style="text-align: center;"><img style="width: 500px;" src="https://flowgdd.com/star/img/shiny_logo.gif" alt="">
</h1>
<h1 style="text-align: center;font-size: 30px;">
キャラを選択
</h1>
<div id="select">
</div>
<h1 style="text-align: center;font-size: 30px;">
スキルを選択
</h1>
<div id="skill-select">
<select id="skill-select0">
</select>
<select id="skill-select1">
</select>
<select id="skill-select2">
</select>
</div>
<div id="run"></div>
<div id="preview"></div>
<p id="ver">ver.${new Date(ver).toLocaleTimeString()} (${ver})</p>`;
select();
}
async function run() {
let code = "s" + document.getElementById("id").value;
const rooms = await fetch("/rooms").then((res)=>res.json());
if (rooms[code] === "start") {
alert("重複したコードです!");
return;
}
if (code === "s") {
for(const k in rooms){
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
Number(document.getElementById("skill-select0").value),
Number(document.getElementById("skill-select1").value),
Number(document.getElementById("skill-select2").value)
], code);
}
async function preview() {
document.getElementById("preview").innerHTML = "";
const custom = document.getElementById("custom") ? document.getElementById("custom").value.split("+") : [];
if (custom.length !== 2) {
return;
}
const img = [
await pwToImgURL(custom[0]),
await pwToImgURL(custom[1])
];
const el = new Image();
el.setAttribute("style", "width:40vw;height:40vw;border:solid;");
el.src = img[0];
document.getElementById("preview").appendChild(el);
const el2 = new Image();
el2.setAttribute("style", "width:40vw;height:40vw;border:solid;");
el2.src = img[1];
document.getElementById("preview").appendChild(el2);
}
async function start(i, skill, code) {
await checkVer();
const custom = document.getElementById("custom") ? document.getElementById("custom").value.split("+") : [];
document.getElementById("base").innerHTML = UI;
app = new PIXI.Application();
await app.init({
background: '#000000',
resizeTo: document.getElementById("shoot")
});
debug = new Game(i, skill, code, custom);
}
class GameSocket {
socket;
game;
constructor(socket, game){
this.socket = socket;
this.game = game;
socket.addEventListener("message", (e)=>{
this.event(JSON.parse(e.data));
});
}
send(data) {
this.socket.send(JSON.stringify({
...data,
on: Date.now()
}));
}
st(k) {
const data = {};
for (const key of k){
data[key] = this.game.me.st[key];
}
this.send({
st: data
});
}
set(k) {
const data = {};
for (const key of k){
data[key] = this.game.me[key];
}
this.send({
set: data
});
}
skillBegin(skillBegin) {
this.send({
skillBegin
});
}
shotDel(shotDel) {
this.send({
shotDel
});
}
lose() {
this.send({
lose: true
});
}
boxHit(boxHit) {
this.send({
boxHit
});
}
event(e) {
const late = Date.now() - (e.on || 0);
if (e.start) {
this.game.socket_side = e.start.side;
this.game.codeHash = e.start.box;
this.game.delete_box = true;
setTimeout(()=>{
this.game.init();
}, 1000 - late);
}
if (e.st) {
if (typeof e.st.y !== "undefined") {
this.game.enemy.st.y = e.st.y;
}
if (typeof e.st.d !== "undefined") {
this.game.enemy.st.d = e.st.d;
}
if (typeof e.st.speed !== "undefined") {
this.game.enemy.st.speed = e.st.speed;
}
if (typeof e.st.cost_speed !== "undefined") {
this.game.enemy.st.cost_speed = e.st.cost_speed;
}
if (typeof e.st.canShot !== "undefined") {
this.game.enemy.st.canShot = e.st.canShot;
}
if (typeof e.st.position !== "undefined") {
this.game.enemy.st.position = e.st.position + this.game.enemy.st.d * this.game.enemy.st.speed / 100 * late;
}
if (typeof e.st.p !== "undefined") {
this.game.enemy.st.p = e.st.p;
p_skill(this.game.enemy);
}
}
if (e.skillBegin) {
this.game.skillBegin(this.game.enemy, e.skillBegin.target, e.skillBegin.on, e.skillBegin.extra);
}
if (e.lose) {
this.game.enemy.star.rotation = Math.PI / 2;
this.game.status("WIN!");
this.game.stop();
clearInterval(this.game.enemy._anime);
}
if (typeof e.set !== "undefined") {
if (typeof e.set.cost !== "undefined") {
this.game.enemy.cost = e.set.cost + this.game.enemy.st.cost_speed * late / 10;
}
if (typeof e.set.custom !== "undefined") {
this.game.enemy.custom = e.set.custom;
}
if (typeof e.set.skill_select !== "undefined") {
this.game.enemy.skill_select = e.set.skill_select;
load_skill(this.game.enemy);
}
if (typeof e.set.i !== "undefined") {
this.game.enemy.i = e.set.i;
}
}
if (e.boxHit && this.game.on_box[e.boxHit.id]) {
this.game.on_box[e.boxHit.id].event(e.boxHit, e.on);
}
if (e.shotDel) {
this.game.enemy.skills[e.shotDel.skillId].shots[e.shotDel.index].remove();
}
}
}
class Game {
start;
socket_side;
gs;
codeHash;
me;
enemy;
stars;
statusTxt;
base;
on_box;
on_p;
box_rules;
delete_box = false;
_update = 0;
mouse = {
x: 0
};
forrowMouse = false;
skillcount = {
1: 0,
2: 0,
0: 0
};
constructor(i = 0, skill = [
0,
0,
0
], code = "play", custom = []){
document.getElementById("base").style.backgroundColor = "#003";
document.getElementById("shoot").appendChild(app.canvas);
this.start = 0;
this.socket_side = 0;
this.gs = new GameSocket(new WebSocket("ws://" + location.host + "/ws?" + code), this);
this.gs.socket.onclose = ()=>{
if (this.start != 2) {
this.stop();
this.status("回線が切断されました");
setTimeout(()=>location.reload(), 1000);
}
};
this.me = {
w: 100,
h: 100,
cost: 0,
cost_gage: document.getElementById("mcost"),
cost_txt: document.getElementById("mcostxt"),
hit: ()=>{},
ishit: (x, y, r = 35)=>{
return (x <= this.me.st.position && x > this.me.st.position - r || x > this.me.st.position && x < this.me.st.position + r) && (y < this.me.st.y && y > this.me.st.y - r || y > this.me.st.y && y < this.me.st.y + r);
},
st: {
position: 350,
y: 860,
d: 0,
speed,
alive: true,
canShot: [
1,
1,
1
],
p: 0,
cost_speed: 0
},
i,
skill_gage: [
document.getElementById("skill-m1"),
document.getElementById("skill-m2"),
document.getElementById("skill-m3")
],
skill_gage_cost: [
document.getElementById("skill-cost-m1"),
document.getElementById("skill-cost-m2"),
document.getElementById("skill-cost-m3")
],
custom: custom,
skill: [],
skill_select: skill,
canShot (i) {
if (i === 0) {
return !!(this.st.canShot[i] && this.cost >= this.skill[i].cost * 100);
} else if (i === 1) {
return !!(this.st.canShot[i] && this.cost >= this.skill[i].cost * 100 && this.st.p >= this.skill[i].p);
} else if (i === 2) {
return !!(this.st.canShot[i] && this.cost >= this.skill[i].cost * 100 && this.st.p >= this.skill[1].p + this.skill[i].p);
}
return false;
},
skills: {}
};
load_skill(this.me);
this.enemy = {
w: 100,
h: 100,
cost: 0,
cost_gage: document.getElementById("ecost"),
cost_txt: document.getElementById("ecostxt"),
hit: ()=>{},
ishit: (x, y, r = 35)=>{
r += 10;
let nx = 700 - this.enemy.st.position;
let ny = 1000 - this.enemy.st.y;
return (x < nx && x > nx - r || x > nx && x < nx - r) && (y < ny && y > ny - r || y > ny && y < ny + r);
},
st: {
position: 350,
y: 900,
d: 0,
speed,
alive: true,
canShot: [
1,
1,
1
],
p: 0,
cost_speed: 0
},
i: 0,
skill_gage: [
document.getElementById("skill-e1"),
document.getElementById("skill-e2"),
document.getElementById("skill-e3")
],
skill_gage_cost: [
document.getElementById("skill-cost-e1"),
document.getElementById("skill-cost-e2"),
document.getElementById("skill-cost-e3")
],
skill: [],
custom: [],
canShot (i) {
if (i === 0) {
return !!(this.st.canShot[i] && this.cost >= this.skill[i].cost * 100);
} else if (i === 1) {
return !!(this.st.canShot[i] && this.cost >= this.skill[i].cost * 100 && this.st.p >= this.skill[i].p);
} else if (i === 2) {
return !!(this.st.canShot[i] && this.cost >= this.skill[i].cost * 100 && this.st.p >= this.skill[1].p + this.skill[i].p);
}
return false;
},
skills: {},
skill_select: skill
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
"0"
];
this.chara(i, custom);
this.statusTxt = document.getElementById("status");
this.status(`コード "${code.substring(1)}" で対戦相手を探しています...`);
this.cost(this.me);
this.base = document.getElementById("base");
this.on_box = [];
this.on_p = [];
this.box_rules = [
[
[
1,
-1,
1,
0
],
[
2,
1,
1,
10
],
[
1,
1,
2,
-10
],
[
1,
-1,
2,
20
],
[
2,
1,
2,
10
],
[
3,
-1,
1,
-20
],
[
1,
1,
2,
-10
],
[
2,
-1,
3,
-5
],
[
3,
1,
3,
2
],
[
1,
-1,
2,
-3
],
[
3,
-1,
4,
0
],
[
3,
1,
4,
10
],
[
2,
-1,
4,
-15
],
[
3,
1,
4,
10
],
[
3,
-1,
4,
13
],
[
3,
1,
4,
-10
],
[
3,
-1,
4,
-15
]
],
[
[
2,
-1,
1,
10
],
[
2,
1,
2,
-10
],
[
1,
-1,
2,
20
],
[
2,
1,
2,
10
],
[
1,
-1,
1,
-20
],
[
3,
1,
2,
-10
],
[
2,
-1,
3,
-5
],
[
3,
1,
3,
2
],
[
1,
-1,
2,
-3
],
[
3,
-1,
1,
0
],
[
3,
1,
4,
10
],
[
2,
-1,
4,
-15
],
[
3,
1,
4,
10
],
[
1,
-1,
4,
13
],
[
3,
1,
4,
-10
],
[
3,
-1,
4,
-15
]
],
[
[
1,
1,
1,
10
],
[
2,
-1,
2,
-10
],
[
2,
-1,
2,
20
],
[
1,
1,
2,
10
],
[
2,
-1,
1,
-20
],
[
3,
1,
2,
-10
],
[
1,
1,
3,
-5
],
[
2,
-1,
3,
2
],
[
1,
-1,
2,
-3
],
[
3,
1,
1,
0
],
[
3,
-1,
2,
10
],
[
2,
1,
0,
-15
],
[
3,
1,
4,
10
],
[
1,
-1,
4,
13
],
[
3,
1,
4,
-10
],
[
3,
-1,
4,
-15
]
],
[
[
3,
-1,
3,
-20
],
[
3,
1,
1,
-10
],
[
1,
-1,
1,
-5
],
[
2,
1,
3,
2
],
[
1,
-1,
2,
-3
],
[
3,
-1,
4,
0
],
[
1,
1,
4,
10
],
[
3,
-1,
4,
-15
],
[
2,
1,
4,
10
],
[
3,
-1,
4,
13
],
[
3,
1,
4,
-10
],
[
3,
-1,
4,
-15
],
[
3,
1,
4,
10
],
[
1,
-1,
4,
13
],
[
3,
1,
4,
-10
],
[
3,
-1,
4,
-15
]
],
[
[
1,
1,
1,
-20
],
[
2,
-1,
1,
10
],
[
1,
-1,
2,
10
],
[
1,
-1,
2,
20
],
[
2,
1,
2,
10
],
[
2,
-1,
1,
-20
],
[
3,
1,
2,
-10
],
[
2,
-1,
3,
-5
],
[
1,
1,
3,
2
],
[
2,
-1,
2,
-3
],
[
3,
-1,
4,
0
],
[
3,
1,
4,
10
],
[
3,
-1,
4,
-15
],
[
3,
1,
4,
10
],
[
1,
-1,
4,
13
],
[
3,
1,
4,
-10
],
[
3,
-1,
4,
-15
]
]
];
this.codeHash = new TextEncoder().encode(code[1])[0] % 5;
this.load_box(0);
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
this.on_box.forEach((e)=>{
e.remove();
});
this.on_p.forEach((e)=>{
e.remove();
});
this.on_box = [];
this.on_p = [];
p_skill(this.me);
this.update();
this.status();
setTimeout(async ()=>{
this.delete_box = false;
this.cost(this.enemy);
this.me.st.position = 350;
this.me.st.p = 0;
this.me.cost = 0;
this.start = 1;
this.load_box(this.codeHash);
await this.chara_enemy();
p_skill(this.enemy);
}, 1000);
setTimeout(()=>{
setInterval(()=>{
if (this.me.st.y > 550) this.me.st.y -= 2;
}, 1000);
}, 60000);
}
async load_box(n) {
const box_rules = this.box_rules[n % 5];
for(let i = 0; i < box_rules.length; i++){
const e = box_rules[i];
for(let i = 0; i < 6; i++){
await sleep(e[2] * 500);
if (this.delete_box) {
return;
}
}
if (this.socket_side) {
this.on_box.push(new Box(e[0], e[1] * -1, 500 - e[3] * 2, this));
} else {
this.on_box.push(new Box(e[0], e[1], e[3] * 2 + 500, this));
}
}
}
cost(star) {
star.cost = 0;
star.st.cost_speed = cost_speed;
star._cost = setInterval(()=>{
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
checkSt(oldst) {
const keys = [];
for(const key in this.me.st){
if (Object.prototype.hasOwnProperty.call(this.me.st, key)) {
if (this.me.st[key] !== oldst[key]) {
keys.push(key);
}
}
}
return keys;
}
update() {
let change = {
...this.me.st
};
this._update = setInterval(()=>{
const diff = this.checkSt(change);
if (diff.length && !(diff.length === 1 && diff[0] === "position")) {
this.gs.st([
...diff,
"position",
"d"
]);
change = {
...this.me.st
};
}
}, 100);
this.gs.st([
"alive",
"canShot",
"cost_speed",
"d",
"p",
"position",
"speed",
"y"
]);
this.gs.set([
"cost",
"custom",
"i",
"skill_select"
]);
}
async chara(i = 0, custom = []) {
this.me.i = i;
this.me.custom = custom;
app.canvas.onmousemove = (e)=>{
this.mouse = {
x: reparse((app.canvas.width - document.body.clientWidth) / 2 + e.clientX)
};
this.forrowMouse = true;
};
const textures = [
await PIXI.Assets.load(`/img2/${this.stars[i]}2.png`),
await PIXI.Assets.load(`/img2/${this.stars[i]}1.png`)
];
this.me.textures = textures;
if (custom.length == 2) {
textures[0] = pwToStar(custom[0], 0xffffff, app);
textures[1] = pwToStar(custom[1], 0xffffff, app);
}
textures[0].baseTexture.scaleMode = PIXI.SCALE_MODES.NEAREST;
textures[1].baseTexture.scaleMode = PIXI.SCALE_MODES.NEAREST;
const Star = new PIXI.Sprite(textures[1]);
Star.tint = RGB_ME;
this.me.star = Star;
app.stage.addChild(Star);
let move = 0;
this.me._anime = setInterval(()=>{
this.me.star.texture = textures[move];
move = Number(!move);
}, 1000);
this.me._move = setInterval(()=>{
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
if (this.me.st.position + this.me.st.d / 10 * this.me.st.speed > 50 && this.me.st.position + this.me.st.d / 10 * this.me.st.speed < 650) {
this.me.st.position += this.me.st.d / 10 * this.me.st.speed;
}
if (this.forrowMouse) {
if (Math.floor(this.mouse.x) > Math.floor(this.me.st.position)) {
this.me.st.d = 1;
} else if (Math.floor(this.mouse.x) < Math.floor(this.me.st.position)) {
this.me.st.d = -1;
} else {
this.me.st.d = 0;
}
}
}, 10);
onkeydown = (e)=>{
switch(e.key){
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
app.ticker.add((time)=>{
Star.width = parse(this.me.w);
Star.height = parse(this.me.h);
Star.x = parse(this.me.st.position);
Star.y = parse(this.me.st.y);
});
this.me.hit = (s)=>{
if (s == 1 && this.start == 1) {
this.status("Lose...");
this.gs.lose();
this.stop();
clearInterval(this.me._anime);
clearInterval(this.me._move);
Star.rotation = Math.PI / 2;
} else if (s == 2) {
this.me.st.p += 1;
this.me.st.speed += 0.3;
p_skill(this.me);
}
};
}
skillBegin(star, n, on, extra = {}) {
if (star == this.me && star.canShot(n)) {
this.skillcount[n]++;
on = Date.now() + 200;
let cost = 0;
if (star.skill[n].x) {
cost = Math.floor(star.cost / 100);
star.cost -= cost * 100;
} else {
star.cost -= star.skill[n].cost * 100;
}
star.st.canShot[n] = 0;
setTimeout(()=>{
star.st.canShot[n] = 1;
}, 400);
const count = Math.floor(Math.random() * 100);
setTimeout(()=>{
star.skills[on] = new Skill(star, RGB_ME, star.skill[n].shots, on, this, {
...extra,
cost,
count
});
}, 200);
if (this.start) {
this.gs.send({
skillBegin: {
target: n,
extra: {
...extra,
cost,
count
},
on
},
set: {
cost: this.me.cost
}
});
}
let wait = 0;
star.skill[n].shots.forEach((e)=>{
if ((e.delay || 0) > wait) {
wait = e.delay || 0;
}
});
if (wait) {
this.me.st.cost_speed = 0;
this.me.w = 110;
this.me.h = 110;
setTimeout(()=>{
this.me.st.cost_speed = cost_speed;
this.me.w = 100;
this.me.h = 100;
}, wait + 200);
}
} else if (star == this.enemy && on) {
const late = on - Date.now() > 0 ? on - Date.now() : 0;
setTimeout(()=>{
star.skills[on] = new Skill(star, RGB_ENEMY, star.skill[n].shots, on, this, extra);
}, late);
let wait = 0;
star.skill[n].shots.forEach((e)=>{
if ((e.delay || 0) > wait) {
wait = e.delay || 0;
}
});
if (wait) {
this.enemy.st.cost_speed = 0;
this.enemy.w = 110;
this.enemy.h = 110;
setTimeout(()=>{
this.enemy.st.cost_speed = cost_speed;
this.enemy.w = 100;
this.enemy.h = 100;
}, wait + late);
}
}
}
async chara_enemy() {
const textures = [];
if (this.enemy.custom.length == 2) {
textures[0] = pwToStar(this.enemy.custom[0], 0xffffff, app);
textures[1] = pwToStar(this.enemy.custom[1], 0xffffff, app);
} else {
textures[0] = await PIXI.Assets.load(`/img2/${this.stars[this.enemy.i]}2.png`);
textures[1] = await PIXI.Assets.load(`/img2/${this.stars[this.enemy.i]}1.png`);
}
textures[0].baseTexture.scaleMode = PIXI.SCALE_MODES.NEAREST;
textures[1].baseTexture.scaleMode = PIXI.SCALE_MODES.NEAREST;
const Star = new PIXI.Sprite(textures[1]);
Star.tint = RGB_ENEMY;
this.enemy.star = Star;
app.stage.addChild(Star);
let move = 0;
this.enemy._anime = setInterval(()=>{
this.enemy.star.texture = textures[move];
move = Number(!move);
}, 1000);
this.enemy._move = setInterval(()=>{
if (this.enemy.st.position + this.enemy.st.d / 10 * this.enemy.st.speed > 50 && this.enemy.st.position + this.enemy.st.d / 10 * this.enemy.st.speed < 650) {
this.enemy.st.position += this.enemy.st.d * this.enemy.st.speed / 10;
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
Star.anchor.set(0.5);
Star.width = parse(100);
Star.height = parse(100);
Star.rotation = Math.PI;
Star.x = app.screen.width / 2;
app.ticker.add((time)=>{
Star.width = parse(this.enemy.w);
Star.height = parse(this.enemy.h);
Star.x = parse(700 - this.enemy.st.position);
Star.y = parse(1000 - this.enemy.st.y);
});
}
stop(i = 0) {
try {
this.gs.socket.close();
} catch{}
this.start = 2;
this.delete_box = true;
try {
this.on_box.forEach((e)=>{
e.remove();
});
this.on_p.forEach((e)=>{
e.remove();
});
} catch{}
this.on_box = [];
this.on_p = [];
onkeydown = null;
clearInterval(this._update);
clearInterval(this.me._move);
clearInterval(this.me._cost);
clearInterval(this.enemy._move);
clearInterval(this.enemy._cost);
setTimeout(()=>{
for(let i = document.getElementsByClassName("g").length - 1; i > 0; i--){
const element = document.getElementsByClassName("g")[i];
this.base.removeChild(element);
}
this.base.removeChild(document.getElementById("shoot"));
this.base.removeChild(document.getElementById("mcost"));
this.base.removeChild(document.getElementById("ecost"));
this.base.removeChild(document.getElementById("mcostxt"));
this.base.removeChild(document.getElementById("ecostxt"));
this.base.style.backgroundColor = "#000";
postMessage("end");
window.addEventListener("click", restart, {
once: true
});
}, 3000);
}
get a() {
this.me.cost = 1000;
return 0;
}
}
function parse(i = 350) {
return Math.floor(app.canvas.height * i / 1000);
}
function reparse(i = 350) {
return Math.floor(i * 1000 / app.canvas.height);
}
class Skill {
game;
extra;
id;
shots;
constructor(star, color, moverules = [], on, game, extra = {}){
this.game = game;
this.extra = extra;
this.id = on;
this.shots = Array(moverules.length);
moverules.forEach((e, i)=>{
setTimeout(()=>{
const a = new Shot(e, star, color, i, this);
this.shots[i] = a;
}, e.delay);
});
}
remove() {
this.shots.forEach((e)=>{
e.remove();
});
}
}
class Shot {
parent;
isme;
enemy;
movefunc;
color;
bx;
by;
graphics;
t;
undrils;
star;
_id;
x;
y;
removed;
constructor(def, star, color, index, parent){
this.parent = parent;
this.isme = false;
this.x = 0;
this.y = 0;
this.removed = false;
if (star == parent.game.me) {
this.isme = true;
this.enemy = parent.game.enemy;
} else {
this.enemy = parent.game.me;
}
this.movefunc = def.func.bind(this);
this.color = color;
this.bx = star.st.position;
this.by = star.st.y - 50;
this.graphics = new PIXI.Graphics();
this.t = 0;
this.undrils = [];
this.star = star;
this._id = setInterval(()=>{
if (parent.game.delete_box) {
return this.remove();
}
let x, y = 0;
const [mx, my, s] = this.movefunc(this.t, this.parent.extra);
if (!this.isme) {
x = 700 - (this.bx - mx);
y = 1000 - (this.by - my);
} else {
x = this.bx - mx;
y = this.by - my;
}
this.x = x;
this.y = y;
if (this.enemy.ishit(x, y, 15 + s * 7 / 2)) {
this.enemy.hit(1);
}
if (star.ishit(x, y, 15 + s * 7 / 2)) star.hit(0);
if (this.isme) {
for(let i = 0; i < parent.game.on_box.length; i++){
const e = parent.game.on_box[i];
if (e.ishit(x, y, 20 + s * 7 / 2)) {
if (!def.drill) {
e.hit(star);
if (this.isme) {
if (parent.game.start === 1) {
parent.game.gs.shotDel({
skillId: parent.id,
index
});
}
return this.remove();
} else {
const n = this.undrils.length;
this.undrils[n] = e;
setTimeout(()=>{
delete this.undrils[n];
}, 1000);
}
return;
} else if (!this.undrils.includes(e)) {
e.hit(star);
const n = this.undrils.length;
this.undrils[n] = e;
setTimeout(()=>{
delete this.undrils[n];
}, 1000);
}
}
}
}
this.graphics.clear();
if (def.obake && this.by - my > 1200 - parent.game.me.st.y) {
if (this.isme) {
this.graphics.beginFill(this.color, this.t < 15 ? 1 - this.t / 30 : 0.5);
} else {
this.graphics.beginFill(this.color, this.t < 15 ? 1 - this.t / 15 : 0.01);
}
} else {
this.graphics.beginFill(this.color);
}
if (def.drill) {
this.graphics.drawRect(parse(x - s * 7 / 2 * Math.abs(Math.sin(this.t / 6))), parse(y - s * 7 / 2), parse(s * 7 * Math.abs(Math.sin(this.t / 6))), parse(s * 7));
} else {
this.graphics.drawRect(parse(x - s * 7 / 2), parse(y - s * 7 / 2), parse(s * 7), parse(s * 7));
}
this.graphics.endFill();
if (this.removed) {
return;
}
app.stage.addChild(this.graphics);
if (x > 1400 || x < -700 || y < -1000 || y > 2000) {
this.remove();
}
this.t += shot_speed;
}, 25);
}
remove() {
clearInterval(this._id);
app.stage.removeChild(this.graphics);
this.removed = true;
}
}
class Box {
v;
d;
y;
game;
allive;
star;
x;
_id;
child_P;
i;
constructor(v, d, y, game){
this.v = v;
this.d = d;
this.y = y;
this.game = game;
this.i = 0;
const texture = pbox[v - 1];
texture.baseTexture.scaleMode = PIXI.SCALE_MODES.NEAREST;
this.v = v;
this.allive = true;
const star = new PIXI.Sprite(texture);
this.star = star;
this.x = -50;
this.y = y;
star.y = parse(this.y);
star.x = parse(this.x);
app.stage.addChild(star);
star.anchor.set(0.5);
star.width = parse(90);
star.height = parse(90);
if (d == -1) {
this.x = 750;
}
this._id = setInterval(()=>{
star.width = parse(80);
star.height = parse(80);
star.x = parse(this.x);
star.y = parse(this.y);
this.x += d * box_speeds[v - 1];
if (this.x > 800 || this.x < -100 || this.y < -100 || this.y > 1200) {
this.remove();
}
}, 25);
}
ishit(x, y, r) {
return (x <= this.x && x > this.x - r || x > this.x && x < this.x + r) && (y < this.y && y > this.y - r || y > this.y && y < this.y + r);
}
hit(star, v = this.v, dropP = false, on) {
this.v = v;
if (star == this.game.me) {
this.game.on_box.forEach((e, i)=>{
if (e == this) {
this.i = i;
}
});
const value = this.v;
if (this.game.start === 1) {
this.game.gs.boxHit({
type: 0,
value,
id: this.i
});
}
}
if (this.v == 1) {
if (star == this.game.me && this.allive) {
this.child_P = new P(this.x, this.y, 1, this);
this.remove();
this.game.on_p.push(this.child_P);
} else if (dropP && this.allive) {
this.allive = false;
this.child_P = new P(this.x, this.y + 1.3 * ((Date.now() - on) / 25), -1, this);
this.remove();
this.game.on_p.push(this.child_P);
}
} else if (star == this.game.me || dropP) {
this.v -= 1;
this.star.texture = pbox[this.v - 1];
this.y += 5;
setTimeout(()=>{
this.y -= 5;
}, 250);
}
}
event(data, on) {
if (data.type == 0) this.hit(this.game.enemy, data.value, true, on);
if (data.type == 1 && this.child_P.d == -1) {
this.child_P.remove();
}
}
remove() {
clearInterval(this._id);
app.stage.removeChild(this.star);
this.allive = false;
this.x = 1000000;
}
catch_p() {
if (this.game.start === 1) {
this.game.gs.boxHit({
type: 1,
id: this.i
});
}
}
}
class P {
x;
y;
d;
parent;
star;
_id;
removed;
constructor(x, y, d, parent){
this.x = x;
this.y = y;
this.d = d;
this.parent = parent;
this.removed = 0;
const texture = pstar;
const Star = new PIXI.Sprite(texture);
this.star = Star;
Star.x = parse(this.x);
Star.y = parse(this.y);
app.stage.addChild(Star);
Star.anchor.set(0.5);
Star.width = parse(50);
Star.height = parse(50);
if (d == -1) {
Star.rotation = Math.PI;
}
this._id = setInterval(()=>{
Star.width = parse(50);
Star.height = parse(50);
Star.x = parse(this.x);
Star.y = parse(this.y);
this.y += d * p_speed;
if (this.x > 700 || this.x < -10 || this.y < -10 || this.y > 1000) {
this.remove();
}
if (parent.game.me.ishit(this.x, this.y, 25 + 6 * 7 / 2)) {
parent.game.me.hit(2);
this.remove();
this.parent.catch_p();
}
if (parent.game.enemy.ishit(this.x, this.y, 30)) {
parent.game.enemy.hit(2);
}
}, 25);
}
remove() {
clearInterval(this._id);
app.stage.removeChild(this.star);
this.removed = 1;
}
}
function pwToStar(pw, color, app = Dapp) {
const map = p2m(pw);
const Star = new PIXI.Graphics();
map.forEach((e, j)=>{
e.forEach((f, i)=>{
if (f === 1) {
Star.beginFill(color);
Star.drawRect(i * 100, j * 100, 100, 100);
Star.endFill();
} else {
Star.beginFill(color);
Star.drawRect(i * 100, j * 100, 100, 0);
Star.drawRect(i * 100, (j + 1) * 100, 100, 0);
Star.endFill();
}
});
});
return app.renderer.generateTexture(Star);
}
async function pwToImgURL(pw) {
const texture = pwToStar(pw, 0xffda60);
const sprite = new PIXI.Sprite(texture);
const blob = await new Promise((resolve, reject)=>{
Dapp.renderer.extract.canvas(sprite).toBlob(function(b) {
b ? resolve(URL.createObjectURL(b)) : reject();
}, "image/png");
});
return blob;
}
(async ()=>{
pstar = await PIXI.Assets.load(`/img/p.png`);
pstar.baseTexture.scaleMode = PIXI.SCALE_MODES.NEAREST;
pbox = [
await PIXI.Assets.load(`/img/1b.png`),
await PIXI.Assets.load(`/img/2b.png`),
await PIXI.Assets.load(`/img/3b.png`)
];
})();









