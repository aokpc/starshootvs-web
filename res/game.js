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
return str.replace(/z/g, "00000000").replace(/y/g, "0000").replace(/x/g, "00").replace(/Z/g, "ffffffff").replace(/Y/g, "ffff").replace(/X/g, "ff");
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
function kasoku(ddx = 0, ddy = 10, size = 3, add = 0, [x, y] = [
0,
0
], dx = 0, dy = 0) {
return (t)=>{
t += add;
return [
(t * t * ddx + t * dx) / 10 * 4 + x,
(t * t * ddy + t * dy) / 10 * 4 + y,
size
];
};
}
function kasoku1(ddx = 0, ddy = 10, size = 3, add = 0, [x, y] = [
0,
0
], dx = 0, dy = 0) {
return (t)=>{
t += add;
return [
(t * t * t * ddx + t * t * dx) / 10 * 4 + x,
(t * t * t * ddy + t * t * dy) / 10 * 4 + y,
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
function kasoku7(dx = 0, dy = 10, size = 3, add = 0, [x, y] = [
0,
0
]) {
return (t)=>{
t += add;
return [
t ** 5 * dx + x,
t ** 6 * dy + y,
size
];
};
}
function ruijo(dx = 0.2, dy = 0.3, size = 3) {
return (t)=>{
return [
dx ** -(t / 80) * 100,
t * t * dy,
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
function dark(dy = 1.6, a = 35, b = 14, s = 5, size = 1.5, add = 0) {
return function(t) {
t += add;
if (t % (4 * a + 2 * b) <= a) {
return [
0,
t % (4 * a + 2 * b) * -dy + 0.4 * s * t,
size
];
} else if (t % (4 * a + 2 * b) <= a + b) {
return [
0,
a * -dy + 0.4 * s * t,
size
];
} else if (t % (4 * a + 2 * b) <= 3 * a + b) {
return [
0,
(2 * a + b - t % (4 * a + 2 * b)) * -dy + 0.4 * s * t,
size
];
} else if (t % (4 * a + 2 * b) <= 3 * a + 2 * b) {
return [
0,
-a * -dy + 0.4 * s * t,
size
];
} else {
return [
0,
(t % (4 * a + 2 * b) - (4 * a + 2 * b)) * -dy + 0.4 * s * t,
size
];
}
};
}
function dark2(z = 1, dy = 1.6, a = 35, b = 14, s = 5, size = 1.5, add = 0) {
return function(t) {
t += add;
if (t % (4 * a + 2 * b) <= a) {
return [
z * dy * Math.cos(Math.PI / 6) * (t % (4 * a + 2 * b)),
dy * Math.sin(Math.PI / 6) * (t % (4 * a + 2 * b)) + 0.4 * s * t,
size
];
} else if (t % (4 * a + 2 * b) <= a + b) {
return [
z * dy * Math.cos(Math.PI / 6) * a,
dy * Math.sin(Math.PI / 6) * a + 0.4 * s * t,
size
];
} else if (t % (4 * a + 2 * b) <= 2 * a + b) {
return [
z * dy * Math.cos(Math.PI / 6) * (2 * a + b - t % (4 * a + 2 * b)),
dy * Math.sin(Math.PI / 6) * (2 * a + b - t % (4 * a + 2 * b)) + 0.4 * s * t,
size
];
} else if (t % (4 * a + 2 * b) <= 3 * a + b) {
return [
z * dy * Math.cos(Math.PI / 6) * (t % (4 * a + 2 * b) - (2 * a + b)),
-dy * Math.sin(Math.PI / 6) * (t % (4 * a + 2 * b) - (2 * a + b)) + 0.4 * s * t,
size
];
} else if (t % (4 * a + 2 * b) <= 3 * a + 2 * b) {
return [
z * dy * Math.cos(Math.PI / 6) * a,
-dy * Math.sin(Math.PI / 6) * a + 0.4 * s * t,
size
];
} else {
return [
z * dy * Math.cos(Math.PI / 6) * (4 * a + 2 * b - t % (4 * a + 2 * b)),
-dy * Math.sin(Math.PI / 6) * (4 * a + 2 * b - t % (4 * a + 2 * b)) + 0.4 * s * t,
size
];
}
};
}
function sena(dx = 0, dy = 10, size = 3, add = 0, [x, y] = [
0,
0
]) {
return function(t) {
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
return [
t * dx / 10 * 4 + x,
t * dy / 10 * 4 + y,
size
];
};
}
function dFunx(dx = 0, dy = 10, size = 3, add = 0, [x, y] = [
0,
0
]) {
return (t)=>{
t += add;
return [
t * dx / 10 * 4 + x,
t * dy / 10 * 4 + y,
size * Math.sin(t * Math.PI / 20)
];
};
}
function dCurve(θ = 0, dθ = 0, size = 3, speed = 7, [x, y] = [
0,
0
], add = 0, daen = 1) {
return (t)=>{
t += add;
return [
t * speed * Math.sin(θ + dθ * (t - add)) + x,
t * speed * Math.cos(θ + dθ * (t - add)) * daen + y,
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
], dr = 0, dr2 = 0, s = 1) {
return (t)=>{
t += add;
if (t <= when) {
return [
t * dx + t * ((r + dr * t) * Math.cos(θ + dθ * t)) + x,
t * dy + t * ((r + dr * t) * Math.sin(θ + dθ * t)) + y,
size
];
} else {
return [
when * dx + when * ((r + dr * when + dr2 * (t - when) * s) * Math.cos(θ + dθ * when + dθ2 * (t - when) * s)) + x + (t - when) * s * dx2,
when * dy + when * ((r + dr * when + dr2 * (t - when) * s) * Math.sin(θ + dθ * when + dθ2 * (t - when) * s)) + y + (t - when) * s * dy2,
size
];
}
};
}
function KaitenFuncif(r = 13, θ = 4.5 / 6 * Math.PI, dθ = -1 / 30 * Math.PI, dθ2 = -1 / 30 * Math.PI, dx = 0, dy = 10, dx2 = 11, dy2 = 2, when = 60, add = 0, size = 3, [x, y] = [
0,
0
], dr = 0, dr2 = 0) {
return (t)=>{
t += add;
if (t < when) {
return [
t * dx + (r + dr * t) * Math.cos(θ + dθ * t) + x,
t * dy + (r + dr * t) * Math.sin(θ + dθ * t) + y,
size
];
} else {
return [
when * dx + (r + when * dr + dr2 * (t - when)) * Math.cos(θ + dθ * when + dθ2 * (t - when)) + (t - when) * dx2 + x,
when * dy + (r + when * dr + dr2 * (t - when)) * Math.sin(θ + dθ * when + dθ2 * (t - when)) + (t - when) * dy2 + y,
size
];
}
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
} else {
return [
when * dx / 10 * 4 + x + dx2 * (t - when) / 10 * 4,
when * dy / 10 * 4 + y + dy2 * (t - when) / 10 * 4,
size
];
}
};
}
function dFuncifif(dx = 0, dy = 10, dx2 = 11, dy2 = 2, dx3 = 0, dy3 = 0, when = 60, when2 = 10, add = 0, size = 3, [x, y] = [
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
} else if (t > when && t <= when + when2) {
return [
when * dx / 10 * 4 + x + dx2 * (t - when) / 10 * 4,
when * dy / 10 * 4 + y + dy2 * (t - when) / 10 * 4,
size
];
} else {
return [
when * dx / 10 * 4 + x + dx2 * when2 / 10 * 4 + dx3 * (t - when - when2) / 10 * 4,
when * dy / 10 * 4 + y + dy2 * when2 / 10 * 4 + dy3 * (t - when - when2) / 10 * 4,
size
];
}
};
}
function xgiri1(s = 30, size = 5, o = 20) {
return function(t) {
this.bx = 625;
if (t >= o) {
return [
700 / s * (t - o),
840 / s * (t - o) - 30,
size
];
}
return [
0,
-30,
size
];
};
}
function xgiri2(s = 30, size = 5, o = 20) {
return function(t) {
this.bx = 75;
if (t >= o) {
return [
-700 / s * (t - o),
840 / s * (t - o) - 30,
size
];
}
return [
0,
-30,
size
];
};
}
function turumai1(s = 33, size = 3, o = 50) {
return function(t) {
this.bx = 250;
if (t >= o) {
return [
-260 / s * (t - o),
810 / s * (t - o),
size
];
}
return [
0,
0,
size
];
};
}
function turumai2(s = 33, size = 3, o = 60) {
return function(t) {
this.bx = 450;
if (t >= o) {
return [
260 / s * (t - o),
810 / s * (t - o),
size
];
}
return [
0,
0,
size
];
};
}
function turumai3(s = 33, size = 3, o = 70) {
return function(t) {
this.bx = 165;
if (t >= o) {
return [
-470 / s * (t - o),
810 / s * (t - o),
size
];
}
return [
0,
0,
size
];
};
}
function turumai4(s = 33, size = 3, o = 80) {
return function(t) {
this.bx = 535;
if (t >= o) {
return [
470 / s * (t - o),
810 / s * (t - o),
size
];
}
return [
0,
0,
size
];
};
}
function turumai5(s = 33, size = 3, o = 90) {
return function(t) {
this.bx = 80;
if (t >= o) {
return [
-680 / s * (t - o),
810 / s * (t - o),
size
];
}
return [
0,
0,
size
];
};
}
function turumai6(s = 33, size = 3, o = 100) {
return function(t) {
this.bx = 620;
if (t >= o) {
return [
680 / s * (t - o),
810 / s * (t - o),
size
];
}
return [
0,
0,
size
];
};
}
function longaim(s = 30, size = 3) {
return function(t) {
return [
t * ((this.bx - 350) / s * ((950 - 500) * 2) / Math.sqrt((this.bx - 350) ** 2 + (this.by - 85) ** 2)),
t * ((this.by - 85) / s * ((950 - 500) * 2) / Math.sqrt((this.bx - 350) ** 2 + (this.by - 85) ** 2)),
size
];
};
}
function shortaim(s = 30, size = 3) {
return function(t) {
return [
t * ((this.bx - 350) * 2 / s * ((950 - 500) * 2) / Math.sqrt(((this.bx - 350) * 2) ** 2 + ((this.by - 500) * 2) ** 2)),
t * ((this.by - 500) * 2 / s * ((950 - 500) * 2) / Math.sqrt(((this.bx - 350) * 2) ** 2 + ((this.by - 500) * 2) ** 2)),
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
t * (this.bx / s * ((950 - 500) * 2) / Math.sqrt((this.by - 80) ** 2 + this.bx ** 2)),
t * ((this.by - 80) / s * ((950 - 500) * 2) / Math.sqrt((this.by - 80) ** 2 + this.bx ** 2)),
size
];
};
}
function corneraim2(s = 30, size = 3) {
return function(t) {
return [
t * ((this.bx - 700) / s * ((950 - 500) * 2) / Math.sqrt((this.by - 80) ** 2 + (this.bx - 700) ** 2)),
t * ((this.by - 80) / s * ((950 - 500) * 2) / Math.sqrt((this.by - 80) ** 2 + (this.bx - 700) ** 2)),
size
];
};
}
function mirror(dx = 0, dy = 10, size = 3) {
return function(t) {
if (t * dy / 10 * 4 >= this.parent.game.me.st.y - 500) {
return [
2 * this.bx - 700 - t * dx / 10 * 4,
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
if (t * dy / 10 * 4 >= this.parent.game.me.st.y - 500) {
return [
this.bx - 350 - t * dx / 10 * 4,
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
return function(t) {
if (!this.data) {
this.data = 0;
}
if (t * dy / 10 * 4 >= this.parent.game.me.st.y - 500 && bsize + (tosize - bsize) * (t - this.data) / 20 < tosize) {
return [
-((350 - this.bx) * 2) - t * dx / 10 * 4,
t * dy / 10 * 4,
bsize + (tosize - bsize) * (t - this.data) / 20
];
} else if (bsize + (tosize - bsize) * (t - this.data) / 20 >= tosize) {
return [
-((350 - this.bx) * 2) - t * dx / 10 * 4,
t * dy / 10 * 4,
tosize
];
}
this.data = t;
return [
t * dx / 10 * 4,
t * dy / 10 * 4,
bsize
];
};
}
function sprit(dx = 0, dy = 10, size = 3, r = 1) {
return function(t) {
if (t * dy / 10 * 4 >= this.parent.game.me.st.y - 500) {
return [
130 * r,
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
function spider1(dx = 0, dy = 10, size = 3, rl = 1, s = 100) {
return function(t) {
if (t * dy / 10 * 4 >= this.parent.game.me.st.y - 550) {
return [
0,
this.parent.game.me.st.y - 550,
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
function spider2(dx = 0, dy = 10, size = 3, rl = 1, s = 100) {
return function(t) {
if (t * dy / 10 * 4 >= this.parent.game.me.st.y - 550) {
return [
0,
this.parent.game.me.st.y - 550 + 30,
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
function spider3(dx = 0, dy = 10, size = 3, rl = 1, s = 100) {
return function(t) {
if (t * dy / 10 * 4 > this.parent.game.me.st.y - 550) {
return [
0,
this.parent.game.me.st.y - 550 - 30,
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
function spider4(dx = 0, dy = 10, size = 3, rl = 1, s = 100) {
return function(t) {
if (t * dy / 10 * 4 > this.parent.game.me.st.y - 550) {
return [
15 * Math.sqrt(3),
this.parent.game.me.st.y - 550 + 15,
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
function spider5(dx = 0, dy = 10, size = 3, rl = 1, s = 100) {
return function(t) {
if (t * dy / 10 * 4 > this.parent.game.me.st.y - 550) {
return [
15 * Math.sqrt(3),
this.parent.game.me.st.y - 550 - 15,
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
function spider6(dx = 0, dy = 10, size = 3, rl = 1, s = 100) {
return function(t) {
if (t * dy / 10 * 4 > this.parent.game.me.st.y - 550) {
return [
-15 * Math.sqrt(3),
this.parent.game.me.st.y - 550 + 15,
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
function spider7(dx = 0, dy = 10, size = 3, rl = 1, s = 100) {
return function(t) {
if (t * dy / 10 * 4 > this.parent.game.me.st.y - 550) {
return [
-15 * Math.sqrt(3),
this.parent.game.me.st.y - 550 - 15,
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
return function(t) {
if (!this.data) {
this.data = 0;
}
if (t * s / 10 * 4 > this.parent.game.me.st.y - 520 && bsize + (tosize - bsize) * (t - this.data) / 43 < tosize) {
return [
t * dx / 10 * 4,
t * s / 10 * 4,
bsize + (tosize - bsize) * (t - this.data) / 43
];
} else if (bsize + (tosize - bsize) * (t - this.data) / 43 >= tosize) {
return [
t * dx / 10 * 4,
t * s / 10 * 4,
tosize
];
}
this.data = t;
return [
t * dx / 10 * 4,
t * s / 10 * 4,
bsize
];
};
}
function fu1(speed = 2.5, kai = Math.PI * 0.05 / 180, size = 3) {
return (t)=>{
return [
speed * t * Math.sin(-Math.PI * 12 / 180 + kai * t),
speed * t * Math.cos(-Math.PI * 12 / 180 + kai * t),
size
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
function wave(h = 1, w = 1.1, s = 13, size = 3, x = 0, y = 0) {
return function(t) {
this.bx = x;
this.by = y;
return [
-Math.sin(t * w / 5.7) * h * 50,
t * s / 10 * 4,
size
];
};
}
function swim(h = 1, w = 1.1, s = 13, size = 3, [x, y] = [
0,
0
]) {
return (t)=>{
return [
-Math.sin(t * w / 5.7) * h * 50 * t + x,
t * s / 10 * 4 + y,
size
];
};
}
function ago(h = 1, w = 1.1, s = 13, size = 3, [x, y] = [
0,
0
]) {
return (t)=>{
return [
-Math.abs(Math.sin(t * w / 5.7) * h * 50) + x,
t * s / 10 * 4 + y,
size
];
};
}
function damashi(s = 19, l = 0, size = 3, w = 1) {
if (l) {
return function(t) {
if (!this.data) {
this.data = 0;
}
if (t * s / 10 * 4 > (this.parent.game.me.st.y - 500) * 2 * 0.5) {
return [
w * (t - this.data),
t * s / 10 * 4,
size
];
}
this.data = t;
return [
0,
t * s / 10 * 4,
size
];
};
} else {
return function(t) {
if (!this.data) {
this.data = 0;
}
if (t * s / 10 * 4 > (this.parent.game.me.st.y - 500) * 2 * 0.5) {
return [
-w * (t - this.data),
t * s / 10 * 4,
size
];
}
this.data = t;
return [
0,
t * s / 10 * 4,
size
];
};
}
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
function charge(s = 0.5, size = 3) {
return (t)=>{
return [
0,
1600 - s * 16000 / (t / 30 + 10 * s),
size
];
};
}
function rokuro(q = 112, dr = 0.45, p = 35, kaiten = 0.05, dy = 3, size = 3, z = 0, when = 10) {
return (t)=>{
if (t < when) {
return [
(q - dr * when) / 2 * Math.sin(t * Math.PI * 0.1 + 1 / 2 * Math.PI) - (q - dr * when) / 2,
-((p - when * dr / 10) / 2) * Math.cos(t * Math.PI * 0.1 + 1 / 2 * Math.PI) + z + dy * t,
size
];
}
return [
(q - dr * (t - when)) * Math.sin((t - when) * Math.PI * kaiten - 1 / 2 * Math.PI),
-(p - (t - when) * dr / 10) * Math.cos((t - when) * Math.PI * kaiten - 1 / 2 * Math.PI) + z + dy * t,
size
];
};
}
function delay(time, f) {
return function(t, extra) {
if (time > t) {
this.data = t;
return [
700,
0,
0
];
} else {
return f.call(this, t - this.data, extra);
}
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
function snake(size = 1.5, dy = 120 / 18, dx = 1.2, a = 18, b = 30, c = 25, add = 0) {
return function(t) {
t += add;
if (t % (2 * a + 2 * b + 2 * c) <= a) {
return [
0,
t % (2 * a + 2 * b + 2 * c) * dy + 2 * a * ((t - t % (2 * a + 2 * b + 2 * c)) / (2 * a + 2 * b + 2 * c)) * dy,
size
];
} else if (t % (2 * a + 2 * b + 2 * c) <= a + b) {
return [
0,
a * dy + 2 * a * ((t - t % (2 * a + 2 * b + 2 * c)) / (2 * a + 2 * b + 2 * c)) * dy,
size
];
} else if (t % (2 * a + 2 * b + 2 * c) <= a + b + c) {
return [
-dx * (t % (2 * a + 2 * b + 2 * c) - a - b),
a * dy + 2 * a * ((t - t % (2 * a + 2 * b + 2 * c)) / (2 * a + 2 * b + 2 * c)) * dy,
size
];
} else if (t % (2 * a + 2 * b + 2 * c) <= 2 * a + b + c) {
return [
-dx * c,
(t % (2 * a + 2 * b + 2 * c) - b - c) * dy + 2 * a * ((t - t % (2 * a + 2 * b + 2 * c)) / (2 * a + 2 * b + 2 * c)) * dy,
size
];
} else if (t % (2 * a + 2 * b + 2 * c) <= 2 * a + 2 * b + c) {
return [
-dx * c,
2 * a * dy + 2 * a * ((t - t % (2 * a + 2 * b + 2 * c)) / (2 * a + 2 * b + 2 * c)) * dy,
size
];
} else {
return [
-dx * c + dx * (t % (2 * a + 2 * b + 2 * c) - (2 * a + 2 * b + c)),
2 * a * dy + 2 * a * ((t - t % (2 * a + 2 * b + 2 * c)) / (2 * a + 2 * b + 2 * c)) * dy,
size
];
}
};
}
function inazuma(dy = 0.45, size = 3, x = 45, speed = 8, add = 3) {
return (t)=>{
t += add;
return [
8 * x / (Math.PI * Math.PI) * (Math.sin(t * dy / 2) - Math.sin(t * dy * 3 / 2) / 9 + Math.sin(t * dy * 5 / 2) / 25 - Math.sin(t * dy * 7 / 2) / 49 + Math.sin(t * dy * 9 / 2) / 81 - Math.sin(t * dy * 11 / 2) / 121 + Math.sin(t * dy * 13 / 2) / 169 - Math.sin(t * dy * 15 / 2) / 225 + Math.sin(t * dy * 17 / 2) / 289 - Math.sin(t * dy * 19 / 2) / 361 + Math.sin(t * dy * 21 / 2) / 441),
t * dy * Math.PI * speed - 70,
size
];
};
}
function shinaru(speed = 10, s = 2500, z = 0, w = 700, size = 12, [x, y] = [
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
function tubo(d = 1, speed = 4.2, size = 3, [x, y] = [
0,
-20
], add = -4) {
return (t)=>{
t += add;
return [
((((t * speed * 430 - 170000) / 1.4) ** 3 / 3 - 3000000000 * ((t * speed * 430 - 170000) / 1.4)) / 2700000000000 + x + 137) * d,
t * speed + y,
size
];
};
}
function nizikansu(speed = 7.5, p = 0, q = 100, size = 3, r = 4500, [x, y] = [
0,
0
]) {
return (t)=>{
return [
-((t * speed - p) * (t * speed - q)) / r + x,
t * speed + y,
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
star.skill_gage_cost[0].innerText = star.skill[0].X ? "X" : star.skill[0].cost + "";
star.skill_gage_cost[1].innerText = star.skill[1].X ? "X" : star.skill[1].cost + "";
star.skill_gage_cost[2].innerText = star.skill[2].X ? "X" : star.skill[2].cost + "";
p_skill(star);
}
function p_skill(star) {
const pStatus = [
'<span class="pstar2">　　</span>',
'<span class="pstar">　　</span>'
];
star.skill_gage_cost[0].innerText = star.skill[0].X ? "X" : star.skill[0].cost + "";
star.skill_gage_cost[1].innerText = star.skill[1].X ? "X" : star.skill[1].cost + "";
star.skill_gage_cost[2].innerText = star.skill[2].X ? "X" : star.skill[2].cost + "";
if (star.st.p < star.skill[1].p) {
star.skill_gage_cost[1].innerHTML = pStatus[1].repeat(star.st.p);
star.skill_gage_cost[1].innerHTML += pStatus[0].repeat(star.skill[1].p - star.st.p);
}
if (star.st.p < star.skill[1].p + star.skill[2].p) {
star.skill_gage_cost[2].innerHTML = pStatus[1].repeat(star.st.p - star.skill[1].p > 0 ? star.st.p - star.skill[1].p : 0);
star.skill_gage_cost[2].innerHTML += pStatus[0].repeat(star.skill[1].p + star.skill[2].p - star.st.p < star.skill[2].p ? star.skill[1].p + star.skill[2].p - star.st.p : star.skill[2].p);
}
}
const skill_list = [
{
p: 0,
cost: 1,
name: "しょぼショット",
shots: [
{
func: dFunc(0, 6.12, 3)
}
]
},
{
p: 2,
cost: 5,
name: "トリプルスター",
shots: [
{
func: dFunc(15 * Math.sin(16.87 / 180 * Math.PI), 15 * Math.cos(16.87 / 180 * Math.PI), 3, 0, [
0,
-10
])
},
{
func: dFunc(0, 15, 5, 0, [
0,
-10
])
},
{
func: dFunc(-15 * Math.sin(16.87 / 180 * Math.PI), 15 * Math.cos(16.87 / 180 * Math.PI), 3, 0, [
0,
-10
])
}
]
},
{
p: 2,
cost: 7,
name: "プチだんまく",
shots: puchidanmaku()
},
{
p: 0,
cost: 2,
name: "ショット",
shots: [
{
func: dFunc(0, 16.6, 3)
}
]
},
{
p: 2,
cost: 3,
name: "だましレフト",
shots: [
{
func: damashi(16.6, 1, 3, 1.7),
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
func: dFunc(0, 46.5, 3, 0, [
0,
10
]),
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
func: curve(0.98, 0.93, 12.21),
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
func: dFunc(0, 18.8, 3),
delay: 0
},
{
func: dFunc(0, 18.8, 3),
delay: 170
},
{
func: dFunc(0, 18.8, 3),
delay: 320
}
]
},
{
p: 2,
cost: 8,
name: "はっぽんあし",
shots: [
{
func: dFunc(0.00, 14, 3, 0, [
0,
10
]),
delay: 270
},
{
func: curve(0.40, 0.93, 14, 3, [
0,
10
]),
delay: 415
},
{
func: curve(0.80, 0.93, 14, 3, [
0,
10
]),
delay: 560
},
{
func: curve(1.20, 0.93, 14, 3, [
0,
10
]),
delay: 705
},
{
func: curve(1.60, 0.93, 14, 3, [
0,
10
]),
delay: 850
},
{
func: curve(2.00, 0.93, 14, 3, [
0,
10
]),
delay: 995
},
{
func: curve(2.40, 0.93, 14, 3, [
0,
10
]),
delay: 1140
},
{
func: curve(2.80, 0.93, 14, 3, [
0,
10
]),
delay: 1285
}
]
},
{
p: 0,
cost: 2,
name: "オバケショット",
shots: [
{
func: dFunc(0, 14.28, 3),
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
func: curve(-0.98, 0.928, 12.21, 3),
obake: true
}
]
},
{
p: 2,
cost: 8,
name: "オバケファイブ",
shots: five(22.3125, false, 300, true)
},
{
p: 0,
cost: 2,
name: "ドリルショット",
shots: [
{
func: dFunc(0, 14.28, 3),
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
func: dFunc(0, 2.54, 3),
delay: 0,
drill: true
}
]
},
{
p: 3,
cost: 8,
name: "ドリルファイブ",
shots: five(24.62, true)
},
{
p: 0,
cost: 2,
name: "ヘヴィショット",
shots: [
{
func: dFunc(0, 10.5, 9.7),
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
func: dFunc(0, 11.2, 20.5),
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
p: 0,
cost: 1,
name: "プチショット",
shots: [
{
func: dFunc(0, 8.13, 1.5),
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
func: dFunc(8.05 * Math.sin(16.69 / 180 * Math.PI), 8.05 * Math.cos(16.69 / 180 * Math.PI), 1.5),
delay: 0
},
{
func: dFunc(-8.05 * Math.sin(16.69 / 180 * Math.PI), 8.05 * Math.cos(16.69 / 180 * Math.PI), 1.5),
delay: 0
}
]
},
{
p: 2,
cost: 6,
name: "ジャンボふうせん",
shots: [
{
func: fusen(0, 8.11, 1.5, 31),
delay: 0,
texture: "BOX"
}
]
},
{
p: 0,
cost: 1,
name: "ナメショット",
shots: [
{
func: curve(0.45, 0.95, 2.56),
delay: 0
}
]
},
{
p: 1,
cost: 4,
name: "ナメヘヴィ",
shots: [
{
func: curve(0.6, 0.7, 3.2, 10),
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
p: 10,
cost: 10,
name: "ふわふわショット",
shots: []
},
{
p: 10,
cost: 10,
name: "ヒツジをよぶ",
shots: []
},
{
p: 10,
cost: 10,
name: "ふわふわスター",
shots: []
},
{
p: 0,
cost: 2,
name: "ゆらゆらショット",
shots: [
{
func: yura2(65, 1.47, 100, 3, 4, [
0,
0
]),
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
cost: 10,
name: "じゅっぽんあし",
shots: [
{
func: dFunc(0.00, 68 / 3, 3, 0, [
0,
10
]),
delay: 300
},
{
func: curve(0.375, 0.97, 68 / 3, 3, [
0,
10
]),
delay: 460
},
{
func: curve(0.750, 0.97, 68 / 3, 3, [
0,
10
]),
delay: 620
},
{
func: curve(1.125, 0.97, 68 / 3, 3, [
0,
10
]),
delay: 780
},
{
func: curve(1.500, 0.97, 68 / 3, 3, [
0,
10
]),
delay: 940
},
{
func: curve(1.875, 0.97, 68 / 3, 3, [
0,
10
]),
delay: 1100
},
{
func: curve(2.250, 0.97, 68 / 3, 3, [
0,
10
]),
delay: 1260
},
{
func: curve(2.625, 0.97, 68 / 3, 3, [
0,
10
]),
delay: 1420
},
{
func: curve(3.000, 0.97, 68 / 3, 3, [
0,
10
]),
delay: 1580
},
{
func: curve(3.375, 0.97, 68 / 3, 3, [
0,
10
]),
delay: 1740
}
]
},
{
p: 0,
cost: 3,
name: "ヘヴィドリル",
shots: [
{
func: dFunc(0, 12.2, 11.5),
delay: 0,
drill: true
}
]
},
{
p: 1,
cost: 5,
name: "ライオンボム",
shots: [
{
func: effect((p)=>{
p.isme && p.parent.game.setStruct(p.parent.game.me, 14);
}),
delay: 0
}
]
},
{
p: 4,
cost: 10,
name: "ハイパーショット",
shots: [
{
func: dFunc(0, 44.625, 25),
delay: 2500,
drill: true
}
]
},
{
p: 0,
cost: 2,
name: "ショートエイム",
shots: [
{
func: shortaim(95)
}
]
},
{
p: 2,
cost: 2,
name: "ロングエイム",
shots: [
{
func: longaim(95)
}
]
},
{
p: 2,
cost: 4,
name: "ターンエイム つかうな",
shots: [
{
func: turnaim(60)
}
]
},
{
p: 0,
cost: 2,
name: "スイム",
shots: [
{
func: swim(0.013, 0.5, 9.7, 3),
delay: 0
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
func: dKaitenFuncif(0.8, 0.1, 1 / 2 * Math.PI, 0.1, 0, 3.6, 0, 7.2, 30, 0, 1.5, [
0,
-20
], 0, 0),
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
p: 0,
cost: 1,
X: true,
name: "てんびんショット",
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
10: dFunc(0, 9.3, 1.5)
}),
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
func: KaitenFuncif(0, 12 / 24 * Math.PI, -0.004 * Math.PI, -0.004 * Math.PI, 0, 2.5, 0, 2.5, 0.25 / 0.004, 0, 1.5, [
0,
-65
], 3, 0),
delay: 0,
drill: true
},
{
func: KaitenFuncif(0, -4 / 24 * Math.PI, -0.004 * Math.PI, -0.004 * Math.PI, 0, 2.5, 0, 2.5, 0.25 / 0.004, 0, 1.5, [
0,
-65
], 3, 0),
delay: 0,
drill: true
},
{
func: KaitenFuncif(0, 28 / 24 * Math.PI, -0.004 * Math.PI, -0.004 * Math.PI, 0, 2.5, 0, 2.5, 0.25 / 0.004, 0, 1.5, [
0,
-65
], 3, 0),
delay: 0,
drill: true
},
{
func: KaitenFuncif(0, -12 / 24 * Math.PI, -0.004 * Math.PI, -0.004 * Math.PI, 0, 2.5, 0, 2.5, 0.25 / 0.004, 0, 1.5, [
0,
-65
], 1.5, 0),
delay: 0,
drill: true
},
{
func: KaitenFuncif(0, 4 / 24 * Math.PI, -0.004 * Math.PI, -0.004 * Math.PI, 0, 2.5, 0, 2.5, 0.25 / 0.004, 0, 1.5, [
0,
-65
], 1.5, 0),
delay: 0,
drill: true
},
{
func: KaitenFuncif(0, 20 / 24 * Math.PI, -0.004 * Math.PI, -0.004 * Math.PI, 0, 2.5, 0, 2.5, 0.25 / 0.004, 0, 1.5, [
0,
-65
], 1.5, 0),
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
func: KaitenFuncif(0, 12 / 24 * Math.PI, 0.0052 * Math.PI, 0.0052 * Math.PI, 0, 2.7, 0, 2.7, 1 / 6 / 0.0052, 0, 1.5, [
0,
-65
], 8.9, 0),
delay: 100,
drill: true
},
{
func: KaitenFuncif(0, -4 / 24 * Math.PI, 0.0052 * Math.PI, 0.0052 * Math.PI, 0, 2.7, 0, 2.7, 1 / 6 / 0.0052, 0, 1.5, [
0,
-65
], 8.9, 0),
delay: 100,
drill: true
},
{
func: KaitenFuncif(0, 28 / 24 * Math.PI, 0.0052 * Math.PI, 0.0052 * Math.PI, 0, 2.7, 0, 2.7, 1 / 6 / 0.0052, 0, 1.5, [
0,
-65
], 8.9, 0),
delay: 100,
drill: true
},
{
func: KaitenFuncif(0, -12 / 24 * Math.PI, 0.0052 * Math.PI, 0.0052 * Math.PI, 0, 2.7, 0, 2.7, 1 / 6 / 0.0052, 0, 1.5, [
0,
-65
], 8.9, 0),
delay: 100,
drill: true
},
{
func: KaitenFuncif(0, 4 / 24 * Math.PI, 0.0052 * Math.PI, 0.0052 * Math.PI, 0, 2.7, 0, 2.7, 1 / 6 / 0.0052, 0, 1.5, [
0,
-65
], 8.9, 0),
delay: 100,
drill: true
},
{
func: KaitenFuncif(0, 20 / 24 * Math.PI, 0.0052 * Math.PI, 0.0052 * Math.PI, 0, 2.7, 0, 2.7, 1 / 6 / 0.0052, 0, 1.5, [
0,
-65
], 8.9, 0),
delay: 100,
drill: true
},
{
func: KaitenFuncif(0, 16 / 24 * Math.PI, 0.0052 * Math.PI, 0.0052 * Math.PI, 0, 2.7, 0, 2.7, 1 / 6 / 0.0052, 0, 1.5, [
0,
-65
], 4.45, 0),
delay: 100,
drill: true
},
{
func: KaitenFuncif(0, 0 / 24 * Math.PI, 0.0052 * Math.PI, 0.0052 * Math.PI, 0, 2.7, 0, 2.7, 1 / 6 / 0.0052, 0, 1.5, [
0,
-65
], 4.45, 0),
delay: 100,
drill: true
},
{
func: KaitenFuncif(0, 32 / 24 * Math.PI, 0.0052 * Math.PI, 0.0052 * Math.PI, 0, 2.7, 0, 2.7, 1 / 6 / 0.0052, 0, 1.5, [
0,
-65
], 4.45, 0),
delay: 100,
drill: true
},
{
func: KaitenFuncif(0, -8 / 24 * Math.PI, 0.0052 * Math.PI, 0.0052 * Math.PI, 0, 2.7, 0, 2.7, 1 / 6 / 0.0052, 0, 1.5, [
0,
-65
], 4.45, 0),
delay: 100,
drill: true
},
{
func: KaitenFuncif(0, 8 / 24 * Math.PI, 0.0052 * Math.PI, 0.0052 * Math.PI, 0, 2.7, 0, 2.7, 1 / 6 / 0.0052, 0, 1.5, [
0,
-65
], 4.45, 0),
delay: 100,
drill: true
},
{
func: KaitenFuncif(0, 24 / 24 * Math.PI, 0.0052 * Math.PI, 0.0052 * Math.PI, 0, 2.7, 0, 2.7, 1 / 6 / 0.0052, 0, 1.5, [
0,
-65
], 4.45, 0),
delay: 100,
drill: true
}
]
},
{
p: 0,
cost: 2,
name: "ピエロショット",
shots: [
{
func: dFunc(0, 16.6, 3),
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
func: mirror(0, 16.6, 3),
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
func: damashi(16.6, 1, 3, 1.7),
delay: 0
},
{
func: damashi(16.6, 0, 3, 1.7),
delay: 0
}
]
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
p: 1,
cost: 4,
name: "カピバラをよぶ",
shots: [
{
func: effect((p)=>{
p.isme && p.parent.game.setStruct(p.parent.game.me, 17);
}),
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
p: 0,
cost: 3,
name: "ドリルカーブ",
shots: [
{
func: curve(1.5, 0.89, 10.273),
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
func: nizikansu(16.605 * 0.4, 0, 625, 3, -320, [
0,
0
]),
delay: 0
}
]
},
{
p: 2,
cost: 8,
name: "ムーンスプレッド",
shots: m_spread(-1)
},
{
p: 0,
cost: 3,
name: "あわショット",
shots: [
{
func: dFunc(0, 4.08, 1.5),
delay: 0
},
{
func: dFunc(0, 9.18, 1.5),
delay: 0
},
{
func: dFunc(0, 14.28, 1.5),
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
cost: 8,
name: "あわはなび",
shots: awawash()
},
{
p: 0,
cost: 3,
name: "ダブルショット",
shots: [
{
func: curve(0.63, 0.965, 12.102, 3, [
0,
10
]),
delay: 0
},
{
func: curve(-0.63, 0.965, 12.102, 3, [
0,
10
]),
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
func: dFuncif(57.5 * 2, -160 * 8 / 16, 0, 22, 5, 0, 3, [
0,
10
]),
delay: 0
},
{
func: dFuncif(29 * 2, -160 * 8 / 16, 0, 22, 5, 0, 3, [
0,
10
]),
delay: 0
},
{
func: dFuncif(-57.5 * 2, -160 * 8 / 16, 0, 22, 5, 0, 3, [
0,
10
]),
delay: 0
},
{
func: dFuncif(-29 * 2, -160 * 8 / 16, 0, 22, 5, 0, 3, [
0,
10
]),
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
func: curve(6, 0.235, 1428 / 71, 3, [
0,
-40
]),
delay: 100
},
{
func: curve(-6, 0.235, 1428 / 71, 3, [
0,
-40
]),
delay: 100
}
]
},
{
p: 0,
cost: 2,
name: "オバケヘヴィ",
shots: [
{
func: dFunc(0, 7.5, 9.3, 0, [
0,
-10
]),
obake: true
}
]
},
{
p: 2,
cost: 4,
name: "きえる(連続使用はお控えください)",
shots: [
{
func: effect((s)=>{
if (s.isme) {
let t = 0;
const interval = 50;
const id = setInterval(()=>{
t++;
if (t * 50 < 1500) {
s.star.star.alpha = (3000 / interval - t) / (3000 / interval);
} else if (t * 50 < 8500) {
s.star.star.alpha = 0.5;
} else if (t * 50 > 8500 && t * 50 < 8800) {
s.star.star.alpha = (t - 8500 / interval) / (600 / interval) + 0.5;
} else if (t * 50 === 8800) {
s.star.star.alpha = 1;
clearInterval(id);
}
}, 50);
} else {
let t = 0;
const interval = 50;
const id = setInterval(()=>{
t++;
if (t * 50 < 1500) {
s.star.star.alpha = (1500 / interval - t) / (1500 / interval);
} else if (t * 50 < 8500) {
s.star.star.alpha = 0;
} else if (t * 50 > 8500 && t * 50 < 8800) {
s.star.star.alpha = (t - 8500 / interval) / (300 / interval);
} else if (t * 50 === 8800) {
s.star.star.alpha = 1;
clearInterval(id);
}
}, 50);
}
}),
delay: 0
}
]
},
{
p: 2,
cost: 6,
name: "スーパーオバケ",
shots: [
{
func: dFunc(0, 12.7, 26, 0, [
0,
-20
]),
obake: true
}
]
},
{
p: 0,
cost: 3,
name: "はばたき",
shots: [
{
func: dCurve(1 / 7 * Math.PI, -1 / 1280 * Math.PI, 3, 4.4, [
0,
-20
], 0, 1.7)
},
{
func: dCurve(1 / 70 * Math.PI, -1 / 1240 * Math.PI, 3, 4.4, [
0,
-20
], 0, 1.7)
}
]
},
{
p: 1,
cost: 2,
name: "たまごをうむ",
shots: [
{
func: effect((p)=>{
p.isme && p.parent.game.setStruct(p.parent.game.me, 23);
}),
delay: 0
}
]
},
{
p: 2,
cost: 7,
name: "タマゴボム",
shots: [
{
func: effect((p)=>{
p.isme && p.parent.game.setStruct(p.parent.game.me, 25);
}),
delay: 0
}
]
},
{
p: 0,
cost: 3,
catchable: true,
name: "ブーメラン",
shots: [
{
func: daen2(400, 40, 0.012, 3, 380)
}
]
},
{
p: 2,
cost: 1,
X: true,
name: "ハテナスターズ",
shots: [
{
func: X({
1: dFunc(0, 5.5, 1.5),
2: dFunc(5.5 * Math.sin(Math.PI * 10 / 180), 5.5 * Math.cos(Math.PI * 10 / 180), 1.5),
3: dFunc(0, 5, 1.5),
4: dFunc(5.5 * Math.sin(Math.PI * 6.5 / 180), 5.5 * Math.cos(Math.PI * 6.5 / 180), 1.5),
5: dFunc(0, 5, 1.5),
6: dFunc(5.5 * Math.sin(Math.PI * 6.5 / 180), 5.5 * Math.cos(Math.PI * 6.5 / 180), 1.5),
7: dFunc(0, 5, 1.5),
8: dFunc(5.5 * Math.sin(Math.PI * 6.5 / 180), 5.5 * Math.cos(Math.PI * 6.5 / 180), 1.5),
9: dFunc(0, 5, 1.5),
10: dFunc(5.5 * Math.sin(Math.PI * 6.5 / 180), 5.5 * Math.cos(Math.PI * 6.5 / 180), 1.5)
}),
delay: 0
},
{
func: X({
1: del,
2: dFunc(-5.5 * Math.sin(Math.PI * 10 / 180), 5.5 * Math.cos(Math.PI * 10 / 180), 1.5),
3: dFunc(5.5 * Math.sin(Math.PI * 12 / 180), 5.5 * Math.cos(Math.PI * 12 / 180), 1.5),
4: dFunc(-5.5 * Math.sin(Math.PI * 6.5 / 180), 5.5 * Math.cos(Math.PI * 6.5 / 180), 1.5),
5: dFunc(5.5 * Math.sin(Math.PI / 14), 5.5 * Math.cos(Math.PI / 14), 1.5),
6: dFunc(-5.5 * Math.sin(Math.PI * 6.5 / 180), 5.5 * Math.cos(Math.PI * 6.5 / 180), 1.5),
7: dFunc(5.5 * Math.sin(Math.PI * 13 / 180), 5.5 * Math.cos(Math.PI * 13 / 180), 1.5),
8: dFunc(-5.5 * Math.sin(Math.PI * 6.5 / 180), 5.5 * Math.cos(Math.PI * 6.5 / 180), 1.5),
9: dFunc(5.5 * Math.sin(Math.PI * 13 / 180), 5.5 * Math.cos(Math.PI * 13 / 180), 1.5),
10: dFunc(-5.5 * Math.sin(Math.PI * 6.5 / 180), 5.5 * Math.cos(Math.PI * 6.5 / 180), 1.5)
}),
delay: 0
},
{
func: X({
1: del,
2: del,
3: dFunc(-5.5 * Math.sin(Math.PI * 12 / 180), 5.5 * Math.cos(Math.PI * 12 / 180), 1.5),
4: dFunc(5.5 * Math.sin(Math.PI * 19 / 180), 5.5 * Math.cos(Math.PI * 19 / 180), 1.5),
5: dFunc(-5.5 * Math.sin(Math.PI / 13), 5.5 * Math.cos(Math.PI / 13), 1.5),
6: dFunc(5.5 * Math.sin(Math.PI * 18.5 / 180), 5.5 * Math.cos(Math.PI * 18.5 / 180), 1.5),
7: dFunc(-5.5 * Math.sin(Math.PI * 13 / 180), 5.5 * Math.cos(Math.PI * 13 / 180), 1.5),
8: dFunc(5.5 * Math.sin(Math.PI * 18.5 / 180), 5.5 * Math.cos(Math.PI * 18.5 / 180), 1.5),
9: dFunc(-5.5 * Math.sin(Math.PI * 13 / 180), 5.5 * Math.cos(Math.PI * 13 / 180), 1.5),
10: dFunc(5.5 * Math.sin(Math.PI * 19.5 / 180), 5.5 * Math.cos(Math.PI * 19.5 / 180), 1.5)
}),
delay: 0
},
{
func: X({
1: del,
2: del,
3: del,
4: dFunc(-5.5 * Math.sin(Math.PI * 19 / 180), 5.5 * Math.cos(Math.PI * 19 / 180), 1.5),
5: dFunc(5.5 * Math.sin(Math.PI / 7), 5.5 * Math.cos(Math.PI / 7), 1.5),
6: dFunc(-5.5 * Math.sin(Math.PI * 18.5 / 180), 5.5 * Math.cos(Math.PI * 18.5 / 180), 1.5),
7: dFunc(5.5 * Math.sin(Math.PI * 25 / 180), 5.5 * Math.cos(Math.PI * 25 / 180), 1.5),
8: dFunc(-5.5 * Math.sin(Math.PI * 18.5 / 180), 5.5 * Math.cos(Math.PI * 18.5 / 180), 1.5),
9: dFunc(5.5 * Math.sin(Math.PI * 25 / 180), 5.5 * Math.cos(Math.PI * 25 / 180), 1.5),
10: dFunc(-5.5 * Math.sin(Math.PI * 19.5 / 180), 5.5 * Math.cos(Math.PI * 19.5 / 180), 1.5)
}),
delay: 0
},
{
func: X({
1: del,
2: del,
3: del,
4: del,
5: dFunc(-5.5 * Math.sin(Math.PI / 7), 5.5 * Math.cos(Math.PI / 7), 1.5),
6: dFunc(5.5 * Math.sin(Math.PI * 30 / 180), 5.5 * Math.cos(Math.PI * 30 / 180), 1.5),
7: dFunc(-5.5 * Math.sin(Math.PI * 25 / 180), 5.5 * Math.cos(Math.PI * 25 / 180), 1.5),
8: dFunc(5.5 * Math.sin(Math.PI * 30 / 180), 5.5 * Math.cos(Math.PI * 30 / 180), 1.5),
9: dFunc(-5.5 * Math.sin(Math.PI * 25 / 180), 5.5 * Math.cos(Math.PI * 25 / 180), 1.5),
10: dFunc(5.5 * Math.sin(Math.PI * 30 / 180), 5.5 * Math.cos(Math.PI * 30 / 180), 1.5)
}),
delay: 0
},
{
func: X({
1: del,
2: del,
3: del,
4: del,
5: del,
6: dFunc(-5.5 * Math.sin(Math.PI * 30 / 180), 5.5 * Math.cos(Math.PI * 30 / 180), 1.5),
7: dFunc(5.5 * Math.sin(Math.PI * 36 / 180), 5.5 * Math.cos(Math.PI * 36 / 180), 1.5),
8: dFunc(-5.5 * Math.sin(Math.PI * 30 / 180), 5.5 * Math.cos(Math.PI * 30 / 180), 1.5),
9: dFunc(5.5 * Math.sin(Math.PI * 36 / 180), 5.5 * Math.cos(Math.PI * 36 / 180), 1.5),
10: dFunc(-5.5 * Math.sin(Math.PI * 30 / 180), 5.5 * Math.cos(Math.PI * 30 / 180), 1.5)
}),
delay: 0
},
{
func: X({
1: del,
2: del,
3: del,
4: del,
5: del,
6: del,
7: dFunc(-5.5 * Math.sin(Math.PI * 36 / 180), 5.5 * Math.cos(Math.PI * 36 / 180), 1.5),
8: dFunc(5.5 * Math.sin(Math.PI * 41 / 180), 5.5 * Math.cos(Math.PI * 41 / 180), 1.5),
9: dFunc(-5.5 * Math.sin(Math.PI * 36 / 180), 5.5 * Math.cos(Math.PI * 36 / 180), 1.5),
10: dFunc(5.5 * Math.sin(Math.PI * 38.5 / 180), 5.5 * Math.cos(Math.PI * 38.5 / 180), 1.5)
}),
delay: 0
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
8: dFunc(-5.5 * Math.sin(Math.PI * 41 / 180), 5.5 * Math.cos(Math.PI * 41 / 180), 1.5),
9: dFunc(5.5 * Math.sin(Math.PI * 45 / 180), 5.5 * Math.cos(Math.PI * 45 / 180), 1.5),
10: dFunc(-5.5 * Math.sin(Math.PI * 38.5 / 180), 5.5 * Math.cos(Math.PI * 38.5 / 180), 1.5)
}),
delay: 0
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
9: dFunc(-5.5 * Math.sin(Math.PI * 45 / 180), 5.5 * Math.cos(Math.PI * 45 / 180), 1.5),
10: dFunc(5.5 * Math.sin(Math.PI * 46 / 180), 5.5 * Math.cos(Math.PI * 46 / 180), 1.5)
}),
delay: 0
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
10: dFunc(-5.5 * Math.sin(Math.PI * 46 / 180), 5.5 * Math.cos(Math.PI * 46 / 180), 1.5)
}),
delay: 0
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
func: dFunc(-11.1, Math.sqrt(716.5125), 1.5, 0, [
0,
-10
]),
delay: 100,
drill: true
},
{
func: dFunc(-15.81, Math.sqrt(589.7664), 1.5, 0, [
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
func: dFunc(11.1, Math.sqrt(716.5125), 1.5, 0, [
0,
-10
]),
delay: 100,
drill: true
},
{
func: dFunc(15.81, Math.sqrt(589.7664), 1.5, 0, [
0,
-10
]),
delay: 100,
drill: true
}
]
},
{
p: 0,
cost: 2,
name: "れんしゅうショット",
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
p: 2,
cost: 3,
name: "にれんぱつ",
shots: [
{
func: dFunc(0, 1428 / 77, 3),
delay: 0
},
{
func: dFunc(0, 1428 / 77, 3),
delay: 200
}
]
},
{
p: 2,
cost: 8,
name: "カカシだんまく",
shots: kakashidanmaku()
},
{
p: 0,
cost: 2,
name: "ジャブ",
shots: [
{
func: kasoku1(0.00027, 0, 5, 0, [
50,
-40
], -0.04, 0.28)
}
]
},
{
p: 2,
cost: 4,
name: "ストレート",
shots: [
{
func: kasoku1(0.0022, 0, 5, 0, [
-100,
-150
], 0, 0.95),
delay: 40
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
p: 0,
cost: 3,
name: "ボーイフレンド",
shots: [
{
func: syuki({
1: effect((p)=>{
p.isme && p.parent.game.setStruct(p.parent.game.me, 26);
}),
2: effect((p)=>{
p.isme && p.parent.game.setStruct(p.parent.game.me, 27);
}),
0: effect((p)=>{
p.isme && p.parent.game.setStruct(p.parent.game.me, 28);
})
}, 3)
}
]
},
{
p: 1,
cost: 3,
name: "ウインク",
shots: [
{
func: syuki({
1: effect((s)=>{
if (s.isme) {
s.parent.game.enemy.st.d = -1;
s.enemy.star.alpha = 0.5;
} else {
s.parent.game.me.st.d = -1;
s.star.star.alpha = 0.5;
}
}),
0: effect((s)=>{
if (s.isme) {
s.parent.game.enemy.st.d = 1;
s.enemy.star.alpha = 1;
} else {
s.parent.game.me.st.d = 1;
s.star.star.alpha = 1;
}
})
}, 2)
}
]
},
{
p: 2,
cost: 5,
name: "ウェーブ",
shots: [
{
func: wave(0.35, 0.92, 8.5, 1.5, 50, 850),
delay: 10
},
{
func: wave(0.35, 0.92, 8.5, 1.5, 170, 850),
delay: 210
},
{
func: wave(0.35, 0.92, 8.5, 1.5, 290, 850),
delay: 410
},
{
func: wave(0.35, 0.92, 8.5, 1.5, 410, 850),
delay: 610
},
{
func: wave(0.35, 0.92, 8.5, 1.5, 530, 850),
delay: 810
},
{
func: wave(0.35, 0.92, 8.5, 1.5, 650, 850),
delay: 1010
}
]
},
{
p: 0,
cost: 2,
name: "リーダーショット",
shots: [
{
func: dFunc(0, 8.8, 3)
}
]
},
{
p: 2,
cost: 3,
name: "スケープゴート",
shots: [
{
func: effect((p)=>{
p.isme && p.parent.game.setStruct(p.parent.game.me, 20);
}),
delay: 0
}
]
},
{
p: 2,
cost: 10,
name: "へんしん🔧",
shots: [
{
func: effect((s)=>{
if (s.isme) {
s.parent.game.me.skill_select = [
218,
219,
220
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
p: 0,
cost: 2,
name: "ツボショット",
shots: [
{
func: tubo()
},
{
func: tubo(-1)
}
]
},
{
p: 2,
cost: 4,
name: "かやくのツボ",
shots: [
{
func: effect((p)=>{
p.isme && p.parent.game.setStruct(p.parent.game.me, 2);
}),
delay: 0
}
]
},
{
p: 1,
cost: 1,
name: "ツボをわる",
shots: []
},
{
p: 0,
cost: 3,
name: "なげナイフ",
shots: [
{
func: dFunc(0, 24, 1.5, 0, [
-50,
-35
]),
delay: 0
},
{
func: dFunc(0, 24, 1.5, 0, [
50,
-35
]),
delay: 250,
drill: true
}
]
},
{
p: 2,
cost: 6,
name: "ハルパー",
shots: [
{
func: dKaitenFuncif(19.3 * 1.2, 0.003 * Math.PI, 3 / 10 * Math.PI, 0.0585 * 5 / 60 * Math.PI, 0, 0, 0, 3.75, 10, 0, 1.5, [
0,
-50
], 0, 0, 0.88)
},
{
func: dKaitenFuncif(19.3 * 1.2, 0.003 * Math.PI, 1 / 10 * Math.PI, 0.0585 * 5 / 60 * Math.PI, 0, 0, 0, 3.75, 10, 0, 1.5, [
0,
-50
], 0, 0, 0.88)
},
{
func: dKaitenFuncif(19.3 * 1.2, 0.003 * Math.PI, -1 / 10 * Math.PI, 0.0585 * 5 / 60 * Math.PI, 0, 0, 0, 3.75, 10, 0, 1.5, [
0,
-50
], 0, 0, 0.88)
},
{
func: dKaitenFuncif(19.3 * 1.2, 0.003 * Math.PI, -3 / 10 * Math.PI, 0.0585 * 5 / 60 * Math.PI, 0, 0, 0, 3.75, 10, 0, 1.5, [
0,
-50
], 0, 0, 0.88)
},
{
func: dKaitenFuncif(19.3 * 1.2, 0.003 * Math.PI, -5 / 10 * Math.PI, 0.0585 * 5 / 60 * Math.PI, 0, 0, 0, 3.75, 10, 0, 1.5, [
0,
-50
], 0, 0, 0.88)
},
{
func: dKaitenFuncif(19.3 * 1.2, 0.003 * Math.PI, -7 / 10 * Math.PI, 0.0585 * 5 / 60 * Math.PI, 0, 0, 0, 3.75, 10, 0, 1.5, [
0,
-50
], 0, 0, 0.88)
},
{
func: dKaitenFuncif(19.3 * 1.2, 0.003 * Math.PI, -9 / 10 * Math.PI, 0.0585 * 5 / 60 * Math.PI, 0, 0, 0, 3.75, 10, 0, 1.5, [
0,
-50
], 0, 0, 0.88)
},
{
func: dKaitenFuncif(19.3 * 1.2, 0.003 * Math.PI, 9 / 10 * Math.PI, 0.0585 * 5 / 60 * Math.PI, 0, 0, 0, 3.75, 10, 0, 3, [
0,
-50
], 0, 0, 0.88),
delay: 0,
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
func: turumai2()
},
{
func: turumai1()
},
{
func: turumai4()
},
{
func: turumai3()
},
{
func: turumai6()
},
{
func: turumai5()
}
]
},
{
p: 0,
cost: 2,
name: "しょぼツイン",
shots: [
{
func: dFunc(6.1 * Math.sin(1.1 / 12 * Math.PI), 6.1 * Math.cos(1.1 / 12 * Math.PI), 3),
delay: 0
},
{
func: dFunc(6.1 * Math.sin(-1.1 / 12 * Math.PI), 6.1 * Math.cos(-1.1 / 12 * Math.PI), 3),
delay: 0
}
]
},
{
p: 1,
cost: 2,
name: "キエるマキュウ",
shots: [
{
func: dFunc(0, 6.48, 3),
obake: true
}
]
},
{
p: 2,
cost: 7,
name: "ファイブスター",
shots: five(20)
},
{
p: 2,
cost: 8,
name: "ビッグスター",
shots: [
{
func: dKaitenFuncif(0, -0.006 * Math.PI, 0 / 5 * Math.PI, -0.0051 * Math.PI, 0, 2.63, 0, 2.63, 80, 0, 1.5, [
0,
65
], 0.044, 0),
delay: 100,
drill: true
},
{
func: dKaitenFuncif(0, -0.006 * Math.PI, -2 / 5 * Math.PI, -0.0051 * Math.PI, 0, 2.63, 0, 2.63, 80, 0, 1.5, [
0,
65
], 0.044, 0),
delay: 100,
drill: true
},
{
func: dKaitenFuncif(0, -0.006 * Math.PI, 2 / 5 * Math.PI, -0.0051 * Math.PI, 0, 2.63, 0, 2.63, 80, 0, 1.5, [
0,
65
], 0.044, 0),
delay: 100,
drill: true
},
{
func: dKaitenFuncif(0, -0.006 * Math.PI, 4 / 5 * Math.PI, -0.0051 * Math.PI, 0, 2.63, 0, 2.63, 80, 0, 1.5, [
0,
65
], 0.044, 0),
delay: 100,
drill: true
},
{
func: dKaitenFuncif(0, -0.006 * Math.PI, -4 / 5 * Math.PI, -0.0051 * Math.PI, 0, 2.63, 0, 2.63, 80, 0, 1.5, [
0,
65
], 0.044, 0),
delay: 100,
drill: true
},
{
func: dKaitenFuncif(0, -0.006 * Math.PI, 1 / 5 * Math.PI, -0.0051 * Math.PI, 0, 2.63, 0, 2.63, 80, 0, 1.5, [
0,
65
], 0.021, 0),
delay: 100,
drill: true
},
{
func: dKaitenFuncif(0, -0.006 * Math.PI, -1 / 5 * Math.PI, -0.0051 * Math.PI, 0, 2.63, 0, 2.63, 80, 0, 1.5, [
0,
65
], 0.021, 0),
delay: 100,
drill: true
},
{
func: dKaitenFuncif(0, -0.006 * Math.PI, 3 / 5 * Math.PI, -0.0051 * Math.PI, 0, 2.63, 0, 2.63, 80, 0, 1.5, [
0,
65
], 0.021, 0),
delay: 100,
drill: true
},
{
func: dKaitenFuncif(0, -0.006 * Math.PI, -3 / 5 * Math.PI, -0.0051 * Math.PI, 0, 2.63, 0, 2.63, 80, 0, 1.5, [
0,
65
], 0.021, 0),
delay: 100,
drill: true
},
{
func: dKaitenFuncif(0, -0.006 * Math.PI, 5 / 5 * Math.PI, -0.0051 * Math.PI, 0, 2.63, 0, 2.63, 80, 0, 1.5, [
0,
65
], 0.021, 0),
delay: 100,
drill: true
}
]
},
{
p: 2,
cost: 3,
name: "だましライト",
shots: [
{
func: damashi(16.6, 0, 3, 1.7),
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
cost: 1,
name: "しょぼカーブ",
shots: [
{
func: yura2(22, 3.5, 20, 3, 2),
delay: 0
}
]
},
{
p: 2,
cost: 4,
name: "ファストカーブ",
shots: [
{
func: curve(1.05, 0.94, 21),
delay: 0
}
]
},
{
p: 2,
cost: 6,
name: "さんぼんあし",
shots: [
{
func: dFunc(0.00, 20, 3, 0, [
0,
10
]),
delay: 0
},
{
func: curve(0.80, 1, 20, 3, [
0,
10
]),
delay: 250
},
{
func: curve(1.60, 1, 20, 3, [
0,
10
]),
delay: 500
}
]
},
{
p: 2,
cost: 8,
name: "のびのびカーブ",
shots: [
{
func: curve(3.20, 0.47, 10, 3, [
0,
10
]),
delay: 300
},
{
func: curve(3.60, 0.47, 10, 3, [
0,
10
]),
delay: 300
},
{
func: curve(4.00, 0.47, 10, 3, [
0,
10
]),
delay: 300
},
{
func: curve(4.40, 0.47, 10, 3, [
0,
10
]),
delay: 300
},
{
func: curve(4.80, 0.47, 10, 3, [
0,
10
]),
delay: 300
}
]
},
{
p: 1,
cost: 2,
name: "スローオバケ",
shots: [
{
func: dFunc(0, 2.2, 3),
obake: true
}
]
},
{
p: 2,
cost: 3,
name: "オバケレフト",
shots: [
{
func: damashi(14.28, 1, 3, 1.7 * 14.28 / 16.6),
delay: 0,
obake: true
}
]
},
{
p: 2,
cost: 3,
name: "オバケライト",
shots: [
{
func: damashi(14.28, 0, 3, 1.7 * 14.28 / 16.6),
delay: 0,
obake: true
}
]
},
{
p: 2,
cost: 8,
name: "オバケスプレッド",
shots: name_spread(27, 12, 400, 0, true)
},
{
p: 1,
cost: 4,
name: "ツインドリル",
shots: [
{
func: dFunc(3, 14, 3),
delay: 0,
drill: true
},
{
func: dFunc(-3, 14, 3),
delay: 0,
drill: true
}
]
},
{
p: 2,
cost: 6,
name: "スローファイブ",
shots: [
{
func: dFunc(476 / 187 * Math.sin(0 / 12 * Math.PI), 476 / 187 * Math.cos(0 / 12 * Math.PI), 2.5),
drill: true
},
{
func: dFunc(476 / 187 * Math.sin(0.97 / 12 * Math.PI), 476 / 187 * Math.cos(0.97 / 12 * Math.PI), 1.5),
drill: true
},
{
func: dFunc(476 / 187 * Math.sin(-0.97 / 12 * Math.PI), 476 / 187 * Math.cos(-0.97 / 12 * Math.PI), 1.5),
drill: true
},
{
func: dFunc(476 / 187 * Math.sin(1.90 / 12 * Math.PI), 476 / 187 * Math.cos(1.90 / 12 * Math.PI), 1.5),
drill: true
},
{
func: dFunc(476 / 187 * Math.sin(-1.90 / 12 * Math.PI), 476 / 187 * Math.cos(-1.90 / 12 * Math.PI), 1.5),
drill: true
}
]
},
{
p: 2,
cost: 5,
name: "ドリルボム",
shots: [
{
func: effect((p)=>{
p.isme && p.parent.game.setStruct(p.parent.game.me, 3);
}),
delay: 0
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
cost: 3,
name: "ヘヴィツイン",
shots: [
{
func: dFunc(4, 10, 9),
delay: 0
},
{
func: dFunc(-4, 10, 9),
delay: 0
}
]
},
{
p: 1,
cost: 4,
name: "クジラボム",
shots: [
{
func: effect((p)=>{
p.isme && p.parent.game.setStruct(p.parent.game.me, 19);
}),
delay: 0
}
]
},
{
p: 2,
cost: 1,
X: true,
name: "ハテナショット",
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
10: dFunc(0, 13, 33)
}),
delay: 0
}
]
},
{
p: 2,
cost: 9,
name: "マグナムショット",
shots: [
{
func: dFunc(0, 26, 20),
delay: 600
}
]
},
{
p: 2,
cost: 3,
name: "ふうせんショット",
shots: [
{
func: fusen(0, 8.114, 1.5, 15),
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
func: fusen(8.114 * Math.sin(0.00 / 12 * Math.PI), 8.114 * Math.cos(0.00 / 12 * Math.PI), 1.5, 5)
},
{
func: fusen(8.114 * Math.sin(0.95 / 12 * Math.PI), 8.114 * Math.cos(0.95 / 12 * Math.PI), 1.5, 5)
},
{
func: fusen(8.114 * Math.sin(-0.95 / 12 * Math.PI), 8.114 * Math.cos(-0.95 / 12 * Math.PI), 1.5, 5)
},
{
func: fusen(8.114 * Math.sin(1.90 / 12 * Math.PI), 8.114 * Math.cos(1.90 / 12 * Math.PI), 1.5, 5)
},
{
func: fusen(8.114 * Math.sin(-1.90 / 12 * Math.PI), 8.114 * Math.cos(-1.90 / 12 * Math.PI), 1.5, 5)
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
10: fusen(0, 8.114, 1.5, 37.5)
}),
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
func: curve(0.45, 0.95, 2.56),
delay: 0,
drill: true
}
]
},
{
p: 1,
cost: 1,
name: "Pボム",
shots: [
{
func: effect((p)=>{
p.isme && p.parent.game.setStruct(p.parent.game.me, 7);
}),
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
p: 2,
cost: 7,
name: "ナメアッパー",
shots: [
{
func: nupper(),
drill: true
}
]
},
{
p: 10,
cost: 10,
name: "もこもこショット",
shots: []
},
{
p: 10,
cost: 10,
name: "ふわふわスロー",
shots: []
},
{
p: 10,
cost: 10,
name: "ふわふわふうせん",
shots: []
},
{
p: 10,
cost: 10,
name: "ふわふわスプレッド",
shots: []
},
{
p: 0,
cost: 1,
name: "しょぼゆらゆら",
shots: [
{
func: yura2(25, 1.7, 10, 3, 2),
delay: 0
}
]
},
{
p: 2,
cost: 4,
name: "ワイドカーブ",
shots: [
{
func: curve(4.6, 0.2, 9.7),
delay: 0
}
]
},
{
p: 10,
cost: 10,
name: "イカスミ",
shots: []
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
cost: 4,
name: "ライオンツイン",
shots: [
{
func: dFunc(4.2, 11, 9.8),
delay: 0,
drill: true
},
{
func: dFunc(-4.2, 11, 9.8),
delay: 0,
drill: true
}
]
},
{
p: 2,
cost: 6,
name: "ハイパースロー",
shots: [
{
func: dFunc(0, 7.5, 28, 10),
delay: 0,
drill: true
}
]
},
{
p: 2,
cost: 6,
name: "ファストライオン",
shots: [
{
func: dFunc(0, 30, 13, 0),
delay: 175,
drill: true
}
]
},
{
p: 10,
cost: 10,
name: "ハテナドリル",
shots: []
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
p: 2,
cost: 3,
name: "コーナーエイム",
shots: [
{
func: corneraim1(85)
},
{
func: corneraim2(85)
}
]
},
{
p: 2,
cost: 0,
name: "トリプルエイム",
shots: [
{
func: corneraim1(85)
},
{
func: corneraim2(85)
},
{
func: longaim(85)
}
]
},
{
p: 2,
cost: 7,
name: "ビッグアロー",
shots: bigarrow()
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
cost: 6,
name: "ソナー'",
shots: [
{
func: dFunc(0, 22, 3, 0, [
0,
-20
]),
delay: 0
},
{
func: dFuncif(11, 11, 0, 22, 30, 0, 3, [
0,
-20
]),
delay: 0
},
{
func: dFuncif(-11, 11, 0, 22, 30, 0, 3, [
0,
-20
]),
delay: 0
},
{
func: dKaitenFuncif(2, 0.028 * Math.PI, 1 / 2 * Math.PI, 0.028 * Math.PI, 0, 4.4, 0, 8.8, 30, 0, 1.5, [
0,
-20
], 0, 0),
delay: 0
},
{
func: dFuncif(0, 0, 0, 22, 30, 0, 3, [
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
func: swim(0.032, 0.5, 16, 3),
delay: 0
}
]
},
{
p: 10,
cost: 10,
name: "スイミー",
shots: []
},
{
p: 2,
cost: 7,
name: "スーパーぎょらい",
shots: [
{
func: kasoku3(0, 0.04, 6.5, 0, [
113,
-100
]),
delay: 400
},
{
func: kasoku3(0, 0.04, 6.5, 0, [
-113,
-100
]),
delay: 400
},
{
func: kasoku3(0, 0.04, 6.5, 0, [
280,
-100
]),
delay: 400
},
{
func: kasoku3(0, 0.04, 6.5, 0, [
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
func: dKaiten(-2 / 3 * Math.PI, 0.02, 3.3, 0, 30, 0, 1.5, -1, 1, [
0,
40
]),
delay: 0
},
{
func: dKaiten(2 / 3 * Math.PI, 0.02, 3.3, 0, 30, 0, 1.5, -1, 1, [
0,
40
]),
delay: 0
},
{
func: dKaiten(0 / 3 * Math.PI, 0.02, 3.3, 0, 30, 0, 1.5, -1, 1, [
0,
40
]),
delay: 0
}
]
},
{
p: 2,
cost: 4,
name: "スクエア",
shots: [
{
func: dKaitenFuncif(0, 0.0063 * Math.PI, -0.25 * Math.PI, 0.0063 * Math.PI, 0, 3.3, 0, 3.3, 52, 0, 1.5, [
0,
-60
], 0.06, 0),
delay: 0,
drill: true
},
{
func: dKaitenFuncif(0, 0.0063 * Math.PI, 0.25 * Math.PI, 0.0063 * Math.PI, 0, 3.3, 0, 3.3, 52, 0, 1.5, [
0,
-60
], 0.06, 0),
delay: 0,
drill: true
},
{
func: dKaitenFuncif(0, 0.0063 * Math.PI, -0.75 * Math.PI, 0.0063 * Math.PI, 0, 3.3, 0, 3.3, 52, 0, 1.5, [
0,
-60
], 0.06, 0),
delay: 0,
drill: true
},
{
func: dKaitenFuncif(0, 0.0063 * Math.PI, 0.75 * Math.PI, 0.0063 * Math.PI, 0, 3.3, 0, 3.3, 52, 0, 1.5, [
0,
-60
], 0.06, 0),
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
func: dKaitenFuncif(0.4, -0.0052 * Math.PI, -1 / 3 * Math.PI, -0.0052 * Math.PI, 0.76, 3, 0.76, 3, 50, 0, 1.5, [
0,
-60
], 0.021, 0),
delay: 0,
drill: true
},
{
func: dKaitenFuncif(0.4, -0.0052 * Math.PI, 1 / 3 * Math.PI, -0.0052 * Math.PI, 0.76, 3, 0.76, 3, 50, 0, 1.5, [
0,
-60
], 0.021, 0),
delay: 0,
drill: true
},
{
func: dKaitenFuncif(0.4, -0.0052 * Math.PI, 3 / 3 * Math.PI, -0.0052 * Math.PI, 0.76, 3, 0.76, 3, 50, 0, 1.5, [
0,
-60
], 0.021, 0),
delay: 0,
drill: true
},
{
func: dKaitenFuncif(0.4, 0.0052 * Math.PI, -2 / 3 * Math.PI, 0.0052 * Math.PI, -0.76, 3, -0.76, 3, 50, 0, 1.5, [
0,
-60
], 0.021, 0),
delay: 0,
drill: true
},
{
func: dKaitenFuncif(0.4, 0.0052 * Math.PI, 2 / 3 * Math.PI, 0.0052 * Math.PI, -0.76, 3, -0.76, 3, 50, 0, 1.5, [
0,
-60
], 0.021, 0),
delay: 0,
drill: true
},
{
func: dKaitenFuncif(0.4, 0.0052 * Math.PI, 0 / 3 * Math.PI, 0.0052 * Math.PI, -0.76, 3, -0.76, 3, 50, 0, 1.5, [
0,
-60
], 0.021, 0),
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
cost: 3,
name: "センターマジック",
shots: [
{
func: center(0, 16.6, 3),
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
p: 2,
cost: 6,
name: "スプリットマジック",
shots: [
{
func: sprit(0, 16.6, 3, 1),
delay: 0
},
{
func: sprit(0, 16.6, 3, -1),
delay: 0
}
]
},
{
p: 10,
cost: 10,
name: "ラッキーセブン",
shots: []
},
{
p: 0,
cost: 1,
name: "ほろよいショット",
shots: [
{
func: yoidore(14 / 19),
delay: 0
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
p: 2,
cost: 4,
name: "ふりょうをよぶ",
shots: [
{
func: effect((p)=>{
p.isme && p.parent.game.setStruct(p.parent.game.me, 18);
}),
delay: 0
}
]
},
{
p: 3,
cost: 9,
name: "でいすいラッシュ",
shots: deisuirush(80 / 177.5)
},
{
p: 0,
cost: 3,
name: "ゆらゆらドリル",
shots: [
{
func: yura2(75, 1.53, 13, 3, 5),
delay: 0,
drill: true
}
]
},
{
p: 2,
cost: 6,
name: "ドリルムーン",
shots: [
{
func: curve(-6.1, 0.21, 17),
delay: 0,
drill: true
}
]
},
{
p: 3,
cost: 4,
name: "ムーンスイッチ",
shots: [
{
func: moons()
}
]
},
{
p: 2,
cost: 9,
name: "リバーススプレッド",
shots: m_spread(1.15, 1.06)
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
func: dFunc(0, 4.08 + 1.7 * e, 1.5),
delay: 0
}))
},
{
p: 2,
cost: 4,
name: "あわボム",
shots: [
{
func: effect((p)=>{
p.isme && p.parent.game.setStruct(p.parent.game.me, 6);
}),
delay: 0
}
]
},
{
p: 2,
cost: 8,
name: "あわサイクロン",
shots: awa_ring()
},
{
p: 0,
cost: 2,
name: "しょぼダブル",
shots: [
{
func: curve(0.6, 0.95, 6.155),
delay: 0
},
{
func: curve(-0.6, 0.95, 6.155),
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
func: dFuncif(57.5 * 2, -160 * 8 / 16, 0, 26, 5, 0, 3, [
0,
10
]),
delay: 0,
drill: true
},
{
func: dFuncif(29 * 2, -160 * 8 / 16, 0, 26, 5, 0, 3, [
0,
10
]),
delay: 0,
drill: true
},
{
func: dFuncif(-57.5 * 2, -160 * 8 / 16, 0, 26, 5, 0, 3, [
0,
10
]),
delay: 0,
drill: true
},
{
func: dFuncif(-29 * 2, -160 * 8 / 16, 0, 26, 5, 0, 3, [
0,
10
]),
delay: 0,
drill: true
}
]
},
{
p: 2,
cost: 3,
name: "ダブルツイン",
shots: [
{
func: dFunc(-2.8, 8.5, 3, 0, [
0,
-10
]),
delay: 0
},
{
func: dFunc(-6, Math.sqrt(44.09), 3, 0, [
0,
-10
]),
delay: 0
},
{
func: dFunc(6, Math.sqrt(44.09), 3, 0, [
0,
-10
]),
delay: 0
},
{
func: dFunc(2.8, 8.5, 3, 0, [
0,
-10
]),
delay: 0
}
]
},
{
p: 3,
cost: 9,
name: "スーパークロス",
shots: [
{
func: dFunc(13.5 * 0.9, 30 * 0.9, 3, 0, [
-140,
-150
]),
delay: 100,
drill: true
},
{
func: dFunc(-13.5 * 0.9, 30 * 0.9, 3, 0, [
140,
-150
]),
delay: 100,
drill: true
},
{
func: dFunc(13.5 * 0.9, 30 * 0.9, 3, 0, [
-300,
-150
]),
delay: 100,
drill: true
},
{
func: dFunc(-13.5 * 0.9, 30 * 0.9, 3, 0, [
300,
-150
]),
delay: 100,
drill: true
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
name: "オバケスター",
shots: [
{
func: dFunc(20 * Math.sin(16.87 / 180 * Math.PI), 20 * Math.cos(16.87 / 180 * Math.PI), 3, 0, [
0,
-10
]),
obake: true
},
{
func: dFunc(0, 20, 5, 0, [
0,
-10
]),
obake: true
},
{
func: dFunc(-20 * Math.sin(16.87 / 180 * Math.PI), 20 * Math.cos(16.87 / 180 * Math.PI), 3, 0, [
0,
-10
]),
obake: true
}
]
},
{
p: 2,
cost: 5,
name: "オバケボム",
shots: [
{
func: effect((p)=>{
p.isme && p.parent.game.setStruct(p.parent.game.me, 5);
}),
delay: 0
}
]
},
{
p: 2,
cost: 9,
name: "オバケマグナム",
shots: [
{
func: dFunc(0, 26, 20),
delay: 600,
obake: true
}
]
},
{
p: 10,
cost: 10,
name: "トリモチ",
shots: []
},
{
p: 2,
cost: 6,
name: "ビッグウィング",
shots: [
{
func: dCurve(1 / 6.5 * Math.PI, -1 / 930 * Math.PI, 3, 5, [
0,
-20
], 0, 1.7)
},
{
func: dCurve(1 / 70 * Math.PI, -1 / 900 * Math.PI, 3, 5, [
0,
-20
], 0, 1.7)
},
{
func: dCurve(-70 / 630 * Math.PI, -1 / 890 * Math.PI, 3, 5.1, [
0,
-20
], 0, 1.7)
},
{
func: dCurve(170 / 630 * Math.PI, -1 / 1100 * Math.PI, 3, 5, [
0,
-20
], 0, 1.7)
},
{
func: dCurve(230 / 630 * Math.PI, -1 / 1200 * Math.PI, 3, 4.95, [
0,
-20
], 0, 1.7)
},
{
func: dCurve(285 / 630 * Math.PI, -1 / 1400 * Math.PI, 3, 4.9, [
0,
-20
], 0, 1.7)
}
]
},
{
p: 2,
cost: 6,
name: "トリカゴ",
shots: [
{
func: dFunc(7.0 * Math.sin(0.000 / 12 * Math.PI), 7.0 * Math.cos(0.000 / 12 * Math.PI), 3, 0, [
0,
-10
])
},
{
func: dFunc(7.0 * Math.sin(1.430 / 12 * Math.PI), 7.0 * Math.cos(1.430 / 12 * Math.PI), 3, 0, [
0,
-10
])
},
{
func: dFunc(7.0 * Math.sin(-1.430 / 12 * Math.PI), 7.0 * Math.cos(-1.430 / 12 * Math.PI), 3, 0, [
0,
-10
])
},
{
func: dFunc(7.0 * Math.sin(-2.570 / 12 * Math.PI), 7.0 * Math.cos(-2.570 / 12 * Math.PI), 3, 0, [
0,
-10
])
},
{
func: dFunc(7.0 * Math.sin(2.570 / 12 * Math.PI), 7.0 * Math.cos(2.570 / 12 * Math.PI), 3, 0, [
0,
-10
])
},
{
func: dFunc(5.0 * Math.sin(0.515 / 12 * Math.PI), 5.0 * Math.cos(0.515 / 12 * Math.PI), 3, 0, [
0,
-10
])
},
{
func: dFunc(5.0 * Math.sin(-0.515 / 12 * Math.PI), 5.0 * Math.cos(-0.515 / 12 * Math.PI), 3, 0, [
0,
-10
])
},
{
func: dFunc(5.0 * Math.sin(-1.700 / 12 * Math.PI), 5.0 * Math.cos(-1.700 / 12 * Math.PI), 3, 0, [
0,
-10
])
},
{
func: dFunc(5.0 * Math.sin(1.700 / 12 * Math.PI), 5.0 * Math.cos(1.700 / 12 * Math.PI), 3, 0, [
0,
-10
])
}
]
},
{
p: 2,
cost: 8,
name: "ダブルウィング",
shots: [
{
func: dCurve(1 / 6.5 * Math.PI, -1 / 930 * Math.PI, 3, 5, [
0,
-20
], 0, 1.7),
delay: 400
},
{
func: dCurve(1 / 70 * Math.PI, -1 / 900 * Math.PI, 3, 5, [
0,
-20
], 0, 1.7),
delay: 400
},
{
func: dCurve(-70 / 630 * Math.PI, -1 / 890 * Math.PI, 3, 5.1, [
0,
-20
], 0, 1.7),
delay: 400
},
{
func: dCurve(170 / 630 * Math.PI, -1 / 1100 * Math.PI, 3, 5, [
0,
-20
], 0, 1.7),
delay: 400
},
{
func: dCurve(230 / 630 * Math.PI, -1 / 1200 * Math.PI, 3, 4.95, [
0,
-20
], 0, 1.7),
delay: 400
},
{
func: dCurve(285 / 630 * Math.PI, -1 / 1400 * Math.PI, 3, 4.9, [
0,
-20
], 0, 1.7),
delay: 400
},
{
func: dCurve(-1 / 6.5 * Math.PI, 1 / 930 * Math.PI, 3, 5, [
0,
-20
], 0, 1.7),
delay: 1200
},
{
func: dCurve(-1 / 70 * Math.PI, 1 / 900 * Math.PI, 3, 5, [
0,
-20
], 0, 1.7),
delay: 1200
},
{
func: dCurve(70 / 630 * Math.PI, 1 / 890 * Math.PI, 3, 5.1, [
0,
-20
], 0, 1.7),
delay: 1200
},
{
func: dCurve(-170 / 630 * Math.PI, 1 / 1100 * Math.PI, 3, 5, [
0,
-20
], 0, 1.7),
delay: 1200
},
{
func: dCurve(-230 / 630 * Math.PI, 1 / 1200 * Math.PI, 3, 4.95, [
0,
-20
], 0, 1.7),
delay: 1200
},
{
func: dCurve(-285 / 630 * Math.PI, 1 / 1400 * Math.PI, 3, 4.9, [
0,
-20
], 0, 1.7),
delay: 1200
}
]
},
{
p: 0,
cost: 3,
catchable: true,
name: "スローブーメラン",
shots: [
{
func: daen2(400, 150, 0.009, 3, 380)
}
]
},
{
p: 2,
cost: 6,
name: "ハサミショット",
shots: [
{
func: dFunc(-4.6 * 0.9, Math.sqrt(352.86) * 0.9, 1.5, 0, [
0,
-10
]),
delay: 0,
drill: true
},
{
func: dFunc(-8.5 * 0.9, Math.sqrt(301.77) * 0.9, 1.5, 0, [
0,
-10
]),
delay: 0,
drill: true
},
{
func: dFunc(4.6 * 0.9, Math.sqrt(352.86) * 0.9, 1.5, 0, [
0,
-10
]),
delay: 0,
drill: true
},
{
func: dFunc(8.5 * 0.9, Math.sqrt(301.77) * 0.9, 1.5, 0, [
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
cost: 4,
name: "オオガマ",
catchable: true,
shots: [
{
func: daen2(395, 380, 0.014, 3, 350, 2, 0),
delay: 50
}
]
},
{
p: 2,
cost: 10,
name: "ジャグリング",
catchable: true,
shots: [
{
func: daen2(410, 100, 0.0098, 3, 360),
delay: 300
},
{
func: daen2(410, 175, 0.0123, 3, 360),
delay: 300
},
{
func: daen2(410, 250, 0.0148, 3, 360),
delay: 300
},
{
func: daen2(410, -100, 0.0110, 3, 360),
delay: 300
},
{
func: daen2(410, -175, 0.0135, 3, 360),
delay: 300
},
{
func: daen2(410, -250, 0.0160, 3, 360),
delay: 300
}
]
},
{
p: 0,
cost: 1,
name: "スーパースロー",
shots: [
{
func: dFunc(0, 1.8, 3),
delay: 0
}
]
},
{
p: 2,
cost: 3,
name: "カカシをよぶ",
shots: [
{
func: effect((p)=>{
p.isme && p.parent.game.setStruct(p.parent.game.me, 15);
}),
delay: 0
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
p: 3,
cost: 10,
name: "コメット",
shots: [
{
func: dKaiten(0, 0.05 * Math.PI, 25.5, 0, 15, 2.3, 5, 1, 1, [
0,
-30
]),
delay: 150
},
{
func: dKaiten(2 / 3 * Math.PI, 0.05 * Math.PI, 25.5, 0, 15, 2.3, 5, 1, 1, [
0,
-30
]),
delay: 150
},
{
func: dKaiten(-2 / 3 * Math.PI, 0.05 * Math.PI, 25.5, 0, 15, 2.3, 5, 1, 1, [
0,
-30
]),
delay: 150
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
cost: 3,
name: "コークスクリュー",
shots: [
{
func: kasoku7(0.00000004, 0.000000009, 5, 0, [
-60,
-100
]),
delay: 50,
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
30,
-50
]),
delay: 250
},
{
func: kasoku5(21, -0.0125, 0.84, 5, 0, [
30,
-50
]),
delay: 600
},
{
func: kasoku5(21, -0.0125, 0.84, 5, 0, [
30,
-50
]),
delay: 1050
},
{
func: kasoku5(-21, 0.0125, 0.84, 5, 0, [
-30,
-50
]),
delay: 475
},
{
func: kasoku5(-21, 0.0125, 0.84, 5, 0, [
-30,
-50
]),
delay: 825
},
{
func: kasoku5(-21, 0.0125, 0.84, 5, 0, [
-30,
-50
]),
delay: 1275
}
]
},
{
p: 10,
cost: 10,
name: "サポーター",
shots: []
},
{
p: 10,
cost: 10,
name: "かくれファン",
shots: []
},
{
p: 2,
cost: 4,
name: "ボディガード",
shots: [
{
func: syuki({
1: effect((p)=>{
p.isme && p.parent.game.setStruct(p.parent.game.me, 29);
}),
2: effect((p)=>{
p.isme && p.parent.game.setStruct(p.parent.game.me, 30);
}),
0: effect((p)=>{
p.isme && p.parent.game.setStruct(p.parent.game.me, 31);
})
}, 3)
}
]
},
{
p: 10,
cost: 10,
name: "バックダンサー",
shots: []
},
{
p: 0,
cost: 3,
name: "リーダーカーブ",
shots: [
{
func: curve(0.9, 0.92, 17.5, 3)
}
]
},
{
p: 2,
cost: 4,
name: "デルタゴート",
shots: [
{
func: effect((p)=>{
p.isme && p.parent.game.setStruct(p.parent.game.me, 21);
}),
delay: 0
}
]
},
{
p: 2,
cost: 4,
name: "カーブゴート",
shots: [
{
func: effect((p)=>{
p.isme && p.parent.game.setStruct(p.parent.game.me, 22);
}),
delay: 0
}
]
},
{
p: 2,
cost: 4,
name: "ゴートボム",
shots: [
{
func: effect((p)=>{
p.isme && p.parent.game.setStruct(p.parent.game.me, 33);
}),
delay: 0
}
]
},
{
p: 0,
cost: 2,
name: "ろくろ",
shots: [
{
func: rokuro()
}
]
},
{
p: 1,
cost: 2,
name: "せなかのツボ",
shots: [
{
func: effect((p)=>{
p.isme && p.parent.game.setStruct(p.parent.game.me, 16);
}),
delay: 0
}
]
},
{
p: 2,
cost: 1,
X: true,
name: "へんかのツボ",
shots: [
{
func: X({
1: effect((p)=>{
p.isme && p.parent.game.setStruct(p.parent.game.me, 8);
}),
2: effect((p)=>{
p.isme && p.parent.game.setStruct(p.parent.game.me, 9);
}),
3: effect((p)=>{
p.isme && p.parent.game.setStruct(p.parent.game.me, 9);
}),
4: effect((p)=>{
p.isme && p.parent.game.setStruct(p.parent.game.me, 10);
}),
5: effect((p)=>{
p.isme && p.parent.game.setStruct(p.parent.game.me, 10);
}),
6: effect((p)=>{
p.isme && p.parent.game.setStruct(p.parent.game.me, 11);
}),
7: effect((p)=>{
p.isme && p.parent.game.setStruct(p.parent.game.me, 11);
}),
8: effect((p)=>{
p.isme && p.parent.game.setStruct(p.parent.game.me, 12);
}),
9: effect((p)=>{
p.isme && p.parent.game.setStruct(p.parent.game.me, 12);
}),
10: effect((p)=>{
p.isme && p.parent.game.setStruct(p.parent.game.me, 13);
})
}),
delay: 0
}
]
},
{
p: 1,
cost: 5,
name: "モノマネのツボ",
shots: [
{
func: effect((p)=>{
p.isme && p.parent.game.setStruct(p.parent.game.me, 4);
}),
delay: 0
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
cost: 4,
name: "ヘビ",
shots: [
{
func: snake(3),
drill: true
},
{
func: delay(36.5, snake(1.5))
},
{
func: delay(73, snake(1.5))
},
{
func: delay(109.5, snake(1.5))
},
{
func: delay(146, snake(1.5))
}
]
},
{
p: 3,
cost: 9,
catchable: true,
name: "ツバメがえし",
shots: [
{
func: daen2(420, 0, 0.044, 3, 380)
}
]
},
{
p: 2,
cost: 6,
name: "ドリルスター",
shots: [
{
func: dFunc(20 * Math.sin(16.87 / 180 * Math.PI), 20 * Math.cos(16.87 / 180 * Math.PI), 3, 0, [
0,
-10
]),
drill: true
},
{
func: dFunc(0, 20, 5, 0, [
0,
-10
]),
drill: true
},
{
func: dFunc(-20 * Math.sin(16.87 / 180 * Math.PI), 20 * Math.cos(16.87 / 180 * Math.PI), 3, 0, [
0,
-10
]),
drill: true
}
]
},
{
p: 2,
cost: 4,
name: "トビウオ",
shots: [
{
func: ago(2.3, 0.92, 20, 3, [
0,
10
])
}
]
},
{
p: 2,
cost: 4,
name: "サテライト",
shots: [
{
func: dFunc(0, 16, 1.5, 0)
},
{
func: dKaitenFuncif(5, 0.01 * Math.PI, 1 / 2 * Math.PI, 0.009 * Math.PI, 0, 6.4, 0, 6.4, 3, 0, 5, [
0,
0
], 5, 0)
},
{
func: dKaitenFuncif(5, 0.01 * Math.PI, -1 / 2 * Math.PI, 0.009 * Math.PI, 0, 6.4, 0, 6.4, 3, 0, 5, [
0,
0
], 5, 0)
}
]
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
name: "ヘヴィカーブ",
shots: [
{
func: curve(1.05, 0.95, 12, 10, [
0,
10
]),
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
func: yoidore(0.8),
delay: 0,
drill: true
}
]
},
{
p: 2,
cost: 3,
name: "ドリルブーメラン",
catchable: true,
shots: [
{
func: daen2(400, -30, 0.012, 3, 380),
drill: true
}
]
},
{
p: 0,
cost: 2,
name: "オバケよいどれ",
shots: [
{
func: yoidore(0.8),
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
cost: 4,
name: "ミラーふうせん",
shots: [
{
func: mirrorfusen()
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
p: 3,
cost: 8,
name: "ドリルラッシュ",
shots: rush(1, true)
},
{
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
10: dFunc(0, 63, 3)
}),
delay: 0
}
]
},
{
p: 3,
cost: 8,
name: "ムーンエイト",
shots: [
{
func: dFunc(0.00, 14, 3, 0, [
0,
10
]),
delay: 300,
drill: true
},
{
func: curve(0.40, 0.93, 14, 3, [
0,
10
]),
delay: 445,
drill: true
},
{
func: curve(0.80, 0.93, 14, 3, [
0,
10
]),
delay: 590,
drill: true
},
{
func: curve(1.20, 0.93, 14, 3, [
0,
10
]),
delay: 735,
drill: true
},
{
func: curve(1.60, 0.93, 14, 3, [
0,
10
]),
delay: 880,
drill: true
},
{
func: curve(2.00, 0.93, 14, 3, [
0,
10
]),
delay: 1025,
drill: true
},
{
func: curve(2.40, 0.93, 14, 3, [
0,
10
]),
delay: 1170,
drill: true
},
{
func: curve(2.80, 0.93, 14, 3, [
0,
10
]),
delay: 1315,
drill: true
}
]
},
{
p: 3,
cost: 6,
name: "バルーンファイブ'",
shots: [
{
func: fusen(8.114 * Math.sin(0.00 / 12 * Math.PI), 8.114 * Math.cos(0.00 / 12 * Math.PI), 1.5, 8)
},
{
func: fusen(8.114 * Math.sin(0.95 / 12 * Math.PI), 8.114 * Math.cos(0.95 / 12 * Math.PI), 1.5, 8)
},
{
func: fusen(8.114 * Math.sin(-0.95 / 12 * Math.PI), 8.114 * Math.cos(-0.95 / 12 * Math.PI), 1.5, 8)
},
{
func: fusen(8.114 * Math.sin(1.90 / 12 * Math.PI), 8.114 * Math.cos(1.90 / 12 * Math.PI), 1.5, 8)
},
{
func: fusen(8.114 * Math.sin(-1.90 / 12 * Math.PI), 8.114 * Math.cos(-1.90 / 12 * Math.PI), 1.5, 8)
}
]
},
{
p: 0,
cost: 2,
name: "ツボショットA",
shots: [
{
func: tuboA()
},
{
func: tuboA(-1)
}
]
},
{
p: 2,
cost: 3,
name: "せなかのキズ",
catchable: true,
shots: [
{
func: syuki({
0: senaka(),
1: senaka(-5.5 / 6 * Math.PI, -0.00001 * Math.PI, 3, 8)
}, 2)
}
]
},
{
p: 0,
cost: 3,
name: "つぼショットB",
shots: [
{
func: tuboB()
},
{
func: tuboB(-1)
}
]
},
{
p: 0,
cost: 10,
name: "ダークマター試",
shots: [
{
func: kasoku2(-0.003, 1.6, 1.5, 0, [
270,
-50
]),
drill: true
},
{
func: kasoku(-0.35, 1.6, 1.5, 0, [
270,
-50
]),
drill: true
},
{
func: kasoku(-0.45, 1.6, 1.5, 0, [
270,
-50
]),
drill: true
},
{
func: kasoku5(9, -0.00005, 1.6, 1.5, 0, [
30,
-10
]),
drill: true
},
{
func: kasoku(-0.85, 1.6, 1.5, 0, [
280,
-50
]),
drill: true
}
]
},
{
p: 0,
cost: 2,
name: "ダークリーダー",
shots: [
{
func: dFunc(0, 5, 3),
drill: true
},
{
func: dark(),
drill: true
},
{
func: dark2(),
drill: true
},
{
func: dark2(-1),
drill: true
}
]
},
{
p: 2,
cost: 4,
name: "ダークゴート",
shots: [
{
func: effect((p)=>{
p.isme && p.parent.game.setStruct(p.parent.game.me, 32);
}),
delay: 0
}
]
},
{
p: 0,
cost: 0,
name: "ダークマター",
shots: [
{
func: fu1()
}
]
},
{
p: 0,
cost: 10,
name: "ネット",
shots: [
{
func: spider1(0, 12, 1.5)
},
{
func: spider2(0, 12, 1.5)
},
{
func: spider3(0, 12, 1.5)
},
{
func: spider4(0, 12, 1.5)
},
{
func: spider5(0, 12, 1.5)
},
{
func: spider6(0, 12, 1.5)
},
{
func: spider7(0, 12, 1.5)
}
]
},
{
p: 10,
cost: 10,
name: "a",
shots: [
{
func: ruijo()
}
]
},
{
p: 1,
cost: 4,
name: "くものす",
shots: [
{
func: effect((s)=>{
if (s.isme) {
s.parent.game.enemy.st.speed *= 0.98;
} else {
s.parent.game.me.st.speed *= 0.98;
}
})
}
]
},
{
p: 10,
cost: 10,
name: "てんめつショット",
shots: [
{
func: dFunx()
}
]
},
{
p: 1,
cost: 2,
name: "だましP",
shots: [
{
func: dFunc(0, 4, 7.5),
delay: 0,
texture: "P"
}
]
},
{
p: 2,
cost: 3,
name: "ヒトデをよぶ",
shots: [
{
func: effect((p)=>{
p.isme && p.parent.game.setStruct(p.parent.game.me, 0);
}),
delay: 0
}
]
},
{
p: 1,
cost: 3,
name: "てっぺきをよぶ",
shots: [
{
func: effect((p)=>{
p.isme && p.parent.game.setStruct(p.parent.game.me, 1);
}),
delay: 0
}
]
},
{
p: 1,
cost: 3,
name: "かやく",
shots: kayaku(18, 7, 0, 10)
},
{
p: 1,
cost: 3,
name: "ドリル",
shots: kayaku(20, 13, 0, 10, false, true)
},
{
p: 1,
cost: 3,
name: "オバケ",
shots: kayaku(22, 11, 200, 10, true)
},
{
p: 1,
cost: 3,
name: "あわ",
shots: awabomb(false, false)
},
{
p: 1,
cost: 3,
name: "へんか1",
shots: kayaku(6, 7, 0, 5)
},
{
p: 1,
cost: 3,
name: "へんか2",
shots: [
{
func: dFunc(0, 25, 1.5)
}
]
},
{
p: 0,
cost: 0,
name: "へんか3",
shots: tubo_spread(6, -1.42, 1.5, 3, 1)
},
{
p: 1,
cost: 3,
name: "へんか4",
shots: [
{
func: dFunc(0, 18, 3)
},
{
func: dFunc(0, 18, 3),
delay: 170
},
{
func: dFunc(0, 18, 3),
delay: 320
}
]
},
{
p: 0,
cost: 0,
name: "へんか5",
shots: tubo_spread(8, 1.7, 1.5, 3, 1.5)
},
{
p: 1,
cost: 3,
name: "へんか6",
shots: [
{
func: dFunc(0, 27, 11)
}
]
},
{
p: 0,
cost: 2,
name: "カカシショット",
shots: [
{
func: kakashi1(1.5),
drill: true
},
{
func: kakashi2(1.5),
obake: true
},
{
func: kakashi3(1.5)
}
]
},
{
p: 0,
cost: 0,
name: "せなかショット",
shots: [
{
func: sena(0, -5, 3, 0, [
0,
0
])
}
]
},
{
p: 1,
cost: 3,
name: "プチよいどれ",
shots: [
{
func: yoidore(0.45, 1.5)
}
]
},
{
p: 1,
cost: 3,
name: "ふりょうよいどれ",
shots: [
{
func: yoidore(0.55, 1.5),
drill: true
}
]
},
{
p: 2,
cost: 4,
name: "クジラツイン",
shots: [
{
func: dFunc(5, 15, 8),
delay: 0
},
{
func: dFunc(-5, 15, 8),
delay: 0
}
]
},
{
p: 2,
cost: 4,
name: "ライオンツイン",
shots: [
{
func: dFunc(5.2, 15, 9.8),
delay: 0,
drill: true
},
{
func: dFunc(-5.2, 15, 9.8),
delay: 0,
drill: true
}
]
},
{
p: 0,
cost: 2,
name: "子分ショット",
shots: [
{
func: dFunc(0, 8.8, 1.5)
}
]
},
{
p: 0,
cost: 2,
name: "デルタ子分ショット",
shots: [
{
func: dFuncifif(0, 9, 0, 0, 0, 17, 25, 10, 0, 1.5, [
0,
0
])
},
{
func: dFuncifif(-4.5 * Math.sqrt(3), -4.5, 0, 0, 0, 17, 25, 20, 0, 1.5, [
0,
0
])
},
{
func: dFuncifif(4.5 * Math.sqrt(3), -4.5, 0, 0, 0, 17, 25, 30, 0, 1.5, [
0,
0
])
}
]
},
{
p: 0,
cost: 2,
name: "カーブ子分ショット",
shots: [
{
func: curve(0.5, 0.9, 8.8, 1.5, [
0,
0
])
}
]
},
{
p: 0,
cost: 2,
name: "タマゴショット",
shots: [
{
func: dFunc(0, 8.8, 1.5)
}
]
},
{
p: 0,
cost: 2,
name: "タマゴ火薬",
shots: eggbomb(0.7)
},
{
p: 1,
cost: 3,
name: "オバケボーイ",
shots: [
{
func: dFunc(0, 16.5, 1.5),
obake: true
}
]
},
{
p: 1,
cost: 3,
name: "モグラボーイ",
shots: [
{
func: dFunc(0, 16.5, 1.5),
drill: true
}
]
},
{
p: 1,
cost: 3,
name: "クジラボディ",
shots: [
{
func: dFunc(0, 10, 7)
}
]
},
{
p: 1,
cost: 3,
name: "ナメボディ",
shots: [
{
func: curve(0.4, 0.75, 2.8, 7),
drill: true
}
]
},
{
p: 1,
cost: 3,
name: "シシボディ",
shots: [
{
func: dFunc(0, 10.5, 7.5),
drill: true
}
]
},
{
p: 1,
cost: 3,
name: "ウサギボーイ",
shots: [
{
func: dFunc(0, 18, 1.5)
}
]
},
{
p: 1,
cost: 3,
name: "ダークゴート中身",
shots: [
{
func: dFuncifif(0, 7.7, 0, 0, 0, 12.5, 30, 3, 0, 1.5, [
0,
-5
]),
drill: true
},
{
func: dFuncifif(7.7 * Math.sin(0.4 * Math.PI), 7.7 * Math.cos(0.4 * Math.PI), 0, 0, 0, 19.5, 30, 2, 0, 1.5, [
0,
-5
]),
drill: true
},
{
func: dFuncifif(-7.7 * Math.sin(0.4 * Math.PI), 7.7 * Math.cos(0.4 * Math.PI), 0, 0, 0, 19.5, 30, 2, 0, 1.5, [
0,
-5
]),
drill: true
},
{
func: dFuncifif(7.7 * Math.sin(0.8 * Math.PI), 7.7 * Math.cos(0.8 * Math.PI), 0, 0, 0, 26, 30, 2, 0, 1.5, [
0,
-5
]),
drill: true
},
{
func: dFuncifif(-7.7 * Math.sin(0.8 * Math.PI), 7.7 * Math.cos(0.8 * Math.PI), 0, 0, 0, 26, 30, 2, 0, 1.5, [
0,
-5
]),
drill: true
}
]
},
{
p: 1,
cost: 3,
name: "ゴートボム中身",
shots: [
{
func: dCurve(0, -0.00615 * Math.PI, 1.5, 4, [
0,
-5
])
},
{
func: dCurve(0.4 * Math.PI, -0.00615 * Math.PI, 1.5, 4, [
0,
-5
])
},
{
func: dCurve(-0.4 * Math.PI, -0.00615 * Math.PI, 1.5, 4, [
0,
-5
])
},
{
func: dCurve(0.8 * Math.PI, -0.00615 * Math.PI, 1.5, 4, [
0,
-5
])
},
{
func: dCurve(-0.8 * Math.PI, -0.00615 * Math.PI, 1.5, 4, [
0,
-5
])
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
84
],
skill2: [
1,
85,
198,
199,
200,
201
],
skill3: [
2,
86
]
},
{
name: "ウサギせいじん",
desc: "こいつのショットはシンプルにはやい！",
skill1: [
3
],
skill2: [
4,
88,
89
],
skill3: [
5,
90,
91,
211
]
},
{
name: "タコせいじん",
desc: "クネクネまがるショットをうつひねくれものだ！",
skill1: [
6,
92
],
skill2: [
7,
93,
94,
202
],
skill3: [
8,
95
]
},
{
name: "オバケせいじん",
desc: "おそろしいオバケショットの使い手だ！",
skill1: [
9,
205,
206
],
skill2: [
10,
96,
97,
98
],
skill3: [
11,
99
]
},
{
name: "モグラせいじん",
desc: "Pボックスをつらぬくドリルをあやつる！",
skill1: [
12,
203,
206
],
skill2: [
13,
100,
101,
102,
198,
204
],
skill3: [
14,
103
]
},
{
name: "クジラせいじん",
desc: "ショットがデカい! へヴィ級ファイター！",
skill1: [
15,
104
],
skill2: [
16,
105,
106,
202
],
skill3: [
17,
107
]
},
{
name: "カエルせいじん",
desc: "突然ふくらむ風船みたいなやつだ！",
skill1: [
18
],
skill2: [
19,
108,
109,
110,
207,
208,
213
],
skill3: [
20,
111
]
},
{
name: "ナメクジせいじん",
desc: "いやらしい戦法をとる！",
skill1: [
21,
112
],
skill2: [
22,
113,
114,
208
],
skill3: [
23,
115
]
},
{
name: "ヒツジせいじん",
desc: "ふわふわしててもあたればちめいしょうだ！",
skill1: [
0
],
skill2: [
1
],
skill3: [
2
]
},
{
name: "イカせいじん",
desc: "きたない戦法をこのむイカれたやつだ！",
skill1: [
27,
120
],
skill2: [
28,
121
],
skill3: [
29,
123
]
},
{
name: "シシせいじん",
desc: "ハイパーショットはすべてをふんさいする！",
skill1: [
30,
124
],
skill2: [
31,
125,
126,
127
],
skill3: [
32
]
},
{
name: "イテせいじん",
desc: "ねらったエモノをクールにおいこむスペース狩人だ！",
skill1: [
33,
129
],
skill2: [
34,
130,
131
],
skill3: [
35,
132
]
},
{
name: "ウオせいじん",
desc: "むじゅうりょくの海をすいすいおよぐ！",
skill1: [
36,
133
],
skill2: [
37,
134,
135,
199
],
skill3: [
38,
137
]
},
{
name: "テンビンせいじん",
desc: "宇宙の秩序をみだすものにさばきをくだす！",
skill1: [
39,
138
],
skill2: [
40,
139,
140
],
skill3: [
41,
141
]
},
{
name: "ピエロせいじん",
desc: "鏡の法則をつかんだら一人前のピエロ星人だ！",
skill1: [
42
],
skill2: [
43,
142,
143,
208,
225
],
skill3: [
44,
144
]
},
{
name: "カピバラせいじん",
desc: "おだやかな性格でともだちが多い！",
skill1: [
45,
146,
203,
205
],
skill2: [
46,
147,
148
],
skill3: [
47,
149,
210
]
},
{
name: "ムーンせいじん",
desc: "ゆらゆらうごくミステリアスな存在だ！",
skill1: [
48,
150
],
skill2: [
49,
151,
152,
200
],
skill3: [
50,
153,
212
]
},
{
name: "カニせいじん",
desc: "怒るとあわをたくさんはいてくる！",
skill1: [
51,
154
],
skill2: [
52,
155,
156
],
skill3: [
53,
157
]
},
{
name: "フタゴせいじん",
desc: "1度に2発うってくるやっかいなフタゴだ！",
skill1: [
54,
158
],
skill2: [
55,
159,
160
],
skill3: [
56,
161
]
},
{
name: "ファントムせいじん",
desc: "顔ににあわずおくびょうな性格だ！",
skill1: [
57,
162,
205,
206
],
skill2: [
58,
163,
164
],
skill3: [
59,
165
]
},
{
name: "ニワトリせいじん",
desc: "大切なタマゴをこわすものは絶対にゆるさない！",
skill1: [
60
],
skill2: [
61,
167,
168
],
skill3: [
62,
169
]
},
{
name: "サソリせいじん",
desc: "じまんのハサミでブーメランをキャッチ！",
skill1: [
63,
170
],
skill2: [
64,
171,
172,
204
],
skill3: [
65,
173
]
},
{
name: "カカシせいじん",
desc: "練習にきた宇宙人を返りうちにするのが生きがいだ！",
skill1: [
66,
174
],
skill2: [
67,
175,
176,
201
],
skill3: [
68,
177
]
},
{
name: "オウシせいじん",
desc: "あいさつがわりのジャブであいてをノックアウト！",
skill1: [
69
],
skill2: [
70,
178,
179,
180
],
skill3: [
71,
181
]
},
{
name: "オトメせいじん",
desc: "じぶんの手は汚さない宇宙のトップアイドルだ！",
skill1: [
72
],
skill2: [
73,
184
],
skill3: [
74
]
},
{
name: "ヤギせいじん",
desc: "おだやかにみえるがすべてをぶっこわしたいとおもっている！",
skill1: [
75,
186
],
skill2: [
76,
187,
188
],
skill3: [
77,
189
]
},
{
name: "ミズガメせいじん",
desc: "まかふしぎなパワーをたくわえている！",
skill1: [
78,
190,
214,
216
],
skill2: [
79,
191,
192
],
skill3: [
80,
193
]
},
{
name: "ペルセウスせいじん",
desc: "あらゆる武器をつかいこなすウェポンマスターだ！",
skill1: [
81,
194
],
skill2: [
82,
195,
196
],
skill3: [
83,
197
]
}
];
function yoidore(s = 1, size = 3, dx1 = 3.4, dx2 = -4.6, dx3 = 8, dx4 = -6.9, dx5 = -2.8, dx6 = 6.6, dx7 = 2.5, dy1 = 18.8125, dy2 = 18.35, dy3 = 17.3, dy4 = 18.13, dy5 = 19.55, dy6 = 17.92, dy7 = 19.3, add = 0, [x, y] = [
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
function switchdamashi(s = 16.6) {
return syuki({
0: damashi(s, 0, 3, 1.7 * s / 16.6),
1: damashi(s, 1, 3, 1.7 * s / 16.6)
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
function nupper() {
return function(t, extra) {
switch(extra?.count || 0){
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
function kakashi3(size = 3) {
return syuki({
0: ()=>[
10000,
0,
0
],
1: dFunc(0, 1428 / 99, size),
2: curve(0.9, 0.97, 1428 / 99, size, [
0,
10
]),
3: ()=>[
10000,
0,
0
]
}, 4);
}
function kakashi2(size = 3) {
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
3: dFunc(0, 1428 / 99, size)
}, 4);
}
function moons() {
return syuki({
0: curve(-6, 0.2, 16.605),
1: curve(6, 0.2, 16.605)
}, 2);
}
function rush(s = 17.85 / 18.8125, drill = false, dx1 = 3.4, dx2 = -4.6 * 18.8125 / 18.35, dx3 = 8 * 18.8125 / 17.3, dx4 = -6.9 * 18.8125 / 18.13, dx5 = -2.8 * 18.8125 / 19.55, dx6 = 6.6 * 18.8125 / 17.92, dx7 = 2.5 * 18.8125 / 19.3, dy1 = 18.8125, dy2 = 18.8125, dy3 = 18.8125, dy4 = 18.8125, dy5 = 18.8125, dy6 = 18.8125, dy7 = 18.8125, size = 3, add = 0, [x, y] = [
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
function deisuirush(s = 1, drill = false, dx1 = 5.6, dx2 = -6.3, dx3 = 9.7, dx4 = -8.6, dx5 = -4.5, dx6 = 8.3, dx7 = 4.7, dy1 = 18.8125, dy2 = 18.35, dy3 = 17.3, dy4 = 18.13, dy5 = 19.55, dy6 = 17.92, dy7 = 19.3, size = 3, [x, y] = [
0,
0
]) {
const a = [];
{
a.push({
func: syuki({
1: dKaitenFuncif(1, -0.22, -1 * Math.PI, -1, dx1 * s, dy1 * s, dx1 * s, dy1 * s, 160, 0, size, [
x,
y
], 0, 0),
0: dKaitenFuncif(1, 0.22, -1 * Math.PI, -1, -dx1 * s, dy1 * s, -dx1 * s, dy1 * s, 160, 0, size, [
x,
y
], 0, 0)
}, 2),
delay: 100,
drill
});
a.push({
func: syuki({
1: dKaitenFuncif(1, 0.22, -1 * Math.PI, -1, dx2 * s, dy2 * s, dx2 * s, dy2 * s, 160, 0, size, [
x,
y
], 0, 0),
0: dKaitenFuncif(1, -0.22, -1 * Math.PI, -1, -dx2 * s, dy2 * s, -dx2 * s, dy2 * s, 160, 0, size, [
x,
y
], 0, 0)
}, 2),
delay: 230,
drill
});
a.push({
func: syuki({
1: dKaitenFuncif(1, -0.22, -1 * Math.PI, -1, dx3 * s, dy3 * s, dx3 * s, dy3 * s, 160, 0, size, [
x,
y
], 0, 0),
0: dKaitenFuncif(1, 0.22, -1 * Math.PI, -1, -dx3 * s, dy3 * s, -dx3 * s, dy3 * s, 160, 0, size, [
x,
y
], 0, 0)
}, 2),
delay: 360,
drill
});
a.push({
func: syuki({
1: dKaitenFuncif(1, 0.22, -1 * Math.PI, -1, dx4 * s, dy4 * s, dx4 * s, dy4 * s, 160, 0, size, [
x,
y
], 0, 0),
0: dKaitenFuncif(1, -0.22, -1 * Math.PI, -1, -dx4 * s, dy4 * s, -dx4 * s, dy4 * s, 160, 0, size, [
x,
y
], 0, 0)
}, 2),
delay: 490,
drill
});
a.push({
func: syuki({
1: dKaitenFuncif(1, 0.22, -1 * Math.PI, -1, dx5 * s, dy5 * s, dx5 * s, dy5 * s, 160, 0, size, [
x,
y
], 0, 0),
0: dKaitenFuncif(1, -0.22, -1 * Math.PI, -1, -dx5 * s, dy5 * s, -dx5 * s, dy5 * s, 160, 0, size, [
x,
y
], 0, 0)
}, 2),
delay: 620,
drill
});
a.push({
func: syuki({
1: dKaitenFuncif(1, -0.22, -1 * Math.PI, -1, dx6 * s, dy6 * s, dx6 * s, dy6 * s, 160, 0, size, [
x,
y
], 0, 0),
0: dKaitenFuncif(1, 0.22, -1 * Math.PI, -1, -dx6 * s, dy6 * s, -dx6 * s, dy6 * s, 160, 0, size, [
x,
y
], 0, 0)
}, 2),
delay: 750,
drill
});
a.push({
func: syuki({
1: dKaitenFuncif(1, -0.22, -1 * Math.PI, -1, dx7 * s, dy7 * s, dx7 * s, dy7 * s, 160, 0, size, [
x,
y
], 0, 0),
0: dKaitenFuncif(1, 0.22, -1 * Math.PI, -1, -dx7 * s, dy7 * s, -dx7 * s, dy7 * s, 160, 0, size, [
x,
y
], 0, 0)
}, 2),
delay: 880,
drill
});
a.push({
func: syuki({
1: dKaitenFuncif(1, -0.22, -1 * Math.PI, -1, dx1 * s, dy1 * s, dx1 * s, dy1 * s, 160, 0, size, [
x,
y
], 0, 0),
0: dKaitenFuncif(1, 0.22, -1 * Math.PI, -1, -dx1 * s, dy1 * s, -dx1 * s, dy1 * s, 160, 0, size, [
x,
y
], 0, 0)
}, 2),
delay: 1010,
drill
});
}
return a;
}
function kakashidanmaku(s = 6.5) {
const a = [];
{
{
a.push({
func: syuki({
1: dFunc(s * Math.sin(16.835 / 180 * Math.PI), s * Math.cos(16.835 / 180 * Math.PI), 1.5, 0, [
0,
-10
]),
2: del,
0: del
}, 3),
delay: 250
});
a.push({
func: syuki({
2: dFunc(s * Math.sin(16.835 / 180 * Math.PI), s * Math.cos(16.835 / 180 * Math.PI), 1.5, 0, [
0,
-10
]),
0: del,
1: del
}, 3),
delay: 250,
obake: true
});
a.push({
func: syuki({
0: dFunc(s * Math.sin(16.835 / 180 * Math.PI), s * Math.cos(16.835 / 180 * Math.PI), 1.5, 0, [
0,
-10
]),
1: del,
2: del
}, 3),
delay: 250,
drill: true
});
a.push({
func: syuki({
1: dFunc(s * Math.sin(0 / 180 * Math.PI), s * Math.cos(0 / 180 * Math.PI), 1.5, 0, [
0,
-10
]),
2: del,
0: del
}, 3),
delay: 400
});
a.push({
func: syuki({
2: dFunc(s * Math.sin(0 / 180 * Math.PI), s * Math.cos(0 / 180 * Math.PI), 1.5, 0, [
0,
-10
]),
0: del,
1: del
}, 3),
delay: 400,
obake: true
});
a.push({
func: syuki({
0: dFunc(s * Math.sin(0 / 180 * Math.PI), s * Math.cos(0 / 180 * Math.PI), 1.5, 0, [
0,
-10
]),
1: del,
2: del
}, 3),
delay: 400,
drill: true
});
a.push({
func: syuki({
1: dFunc(s * -Math.sin(16.835 / 180 * Math.PI), s * Math.cos(16.835 / 180 * Math.PI), 1.5, 0, [
0,
-10
]),
2: del,
0: del
}, 3),
delay: 550
});
a.push({
func: syuki({
2: dFunc(s * -Math.sin(16.835 / 180 * Math.PI), s * Math.cos(16.835 / 180 * Math.PI), 1.5, 0, [
0,
-10
]),
0: del,
1: del
}, 3),
delay: 550,
obake: true
});
a.push({
func: syuki({
0: dFunc(s * -Math.sin(16.835 / 180 * Math.PI), s * Math.cos(16.835 / 180 * Math.PI), 1.5, 0, [
0,
-10
]),
1: del,
2: del
}, 3),
delay: 550,
drill: true
});
a.push({
func: syuki({
1: dFunc(s * Math.sin(24.4075 / 180 * Math.PI), s * Math.cos(24.4075 / 180 * Math.PI), 1.5, 0, [
0,
-10
]),
2: del,
0: del
}, 3),
delay: 700
});
a.push({
func: syuki({
2: dFunc(s * Math.sin(24.4075 / 180 * Math.PI), s * Math.cos(24.4075 / 180 * Math.PI), 1.5, 0, [
0,
-10
]),
0: del,
1: del
}, 3),
delay: 700,
obake: true
});
a.push({
func: syuki({
0: dFunc(s * Math.sin(24.4075 / 180 * Math.PI), s * Math.cos(24.4075 / 180 * Math.PI), 1.5, 0, [
0,
-10
]),
1: del,
2: del
}, 3),
delay: 700,
drill: true
});
a.push({
func: syuki({
1: dFunc(s * Math.sin(8.5475 / 180 * Math.PI), s * Math.cos(8.5475 / 180 * Math.PI), 1.5, 0, [
0,
-10
]),
2: del,
0: del
}, 3),
delay: 850
});
a.push({
func: syuki({
2: dFunc(s * Math.sin(8.5475 / 180 * Math.PI), s * Math.cos(8.5475 / 180 * Math.PI), 1.5, 0, [
0,
-10
]),
0: del,
1: del
}, 3),
delay: 850,
obake: true
});
a.push({
func: syuki({
0: dFunc(s * Math.sin(8.5475 / 180 * Math.PI), s * Math.cos(8.5475 / 180 * Math.PI), 1.5, 0, [
0,
-10
]),
1: del,
2: del
}, 3),
delay: 850,
drill: true
});
a.push({
func: syuki({
1: dFunc(s * -Math.sin(8.5475 / 180 * Math.PI), s * Math.cos(8.5475 / 180 * Math.PI), 1.5, 0, [
0,
-10
]),
2: del,
0: del
}, 3),
delay: 1000
});
a.push({
func: syuki({
2: dFunc(s * -Math.sin(8.5475 / 180 * Math.PI), s * Math.cos(8.5475 / 180 * Math.PI), 1.5, 0, [
0,
-10
]),
0: del,
1: del
}, 3),
delay: 1000,
obake: true
});
a.push({
func: syuki({
0: dFunc(s * -Math.sin(8.5475 / 180 * Math.PI), s * Math.cos(8.5475 / 180 * Math.PI), 1.5, 0, [
0,
-10
]),
1: del,
2: del
}, 3),
delay: 1000,
drill: true
});
a.push({
func: syuki({
1: dFunc(s * -Math.sin(24.4075 / 180 * Math.PI), s * Math.cos(24.4075 / 180 * Math.PI), 1.5, 0, [
0,
-10
]),
2: del,
0: del
}, 3),
delay: 1150
});
a.push({
func: syuki({
2: dFunc(s * -Math.sin(24.4075 / 180 * Math.PI), s * Math.cos(24.4075 / 180 * Math.PI), 1.5, 0, [
0,
-10
]),
0: del,
1: del
}, 3),
delay: 1150,
obake: true
});
a.push({
func: syuki({
0: dFunc(s * -Math.sin(24.4075 / 180 * Math.PI), s * Math.cos(24.4075 / 180 * Math.PI), 1.5, 0, [
0,
-10
]),
1: del,
2: del
}, 3),
delay: 1150,
drill: true
});
a.push({
func: syuki({
1: dFunc(s * Math.sin(16.835 / 180 * Math.PI), s * Math.cos(16.835 / 180 * Math.PI), 1.5, 0, [
0,
-10
]),
2: del,
0: del
}, 3),
delay: 1300
});
a.push({
func: syuki({
2: dFunc(s * Math.sin(16.835 / 180 * Math.PI), s * Math.cos(16.835 / 180 * Math.PI), 1.5, 0, [
0,
-10
]),
0: del,
1: del
}, 3),
delay: 1300,
obake: true
});
a.push({
func: syuki({
0: dFunc(s * Math.sin(16.835 / 180 * Math.PI), s * Math.cos(16.835 / 180 * Math.PI), 1.5, 0, [
0,
-10
]),
1: del,
2: del
}, 3),
delay: 1300,
drill: true
});
a.push({
func: syuki({
1: dFunc(s * Math.sin(0 / 180 * Math.PI), s * Math.cos(0 / 180 * Math.PI), 1.5, 0, [
0,
-10
]),
2: del,
0: del
}, 3),
delay: 1450
});
a.push({
func: syuki({
2: dFunc(s * Math.sin(0 / 180 * Math.PI), s * Math.cos(0 / 180 * Math.PI), 1.5, 0, [
0,
-10
]),
0: del,
1: del
}, 3),
delay: 1450,
obake: true
});
a.push({
func: syuki({
0: dFunc(s * Math.sin(0 / 180 * Math.PI), s * Math.cos(0 / 180 * Math.PI), 1.5, 0, [
0,
-10
]),
2: del,
1: del
}, 3),
delay: 1450,
drill: true
});
a.push({
func: syuki({
1: dFunc(s * -Math.sin(16.835 / 180 * Math.PI), s * Math.cos(16.835 / 180 * Math.PI), 1.5, 0, [
0,
-10
]),
2: del,
0: del
}, 3),
delay: 1600
});
a.push({
func: syuki({
2: dFunc(s * -Math.sin(16.835 / 180 * Math.PI), s * Math.cos(16.835 / 180 * Math.PI), 1.5, 0, [
0,
-10
]),
0: del,
1: del
}, 3),
delay: 1600,
obake: true
});
a.push({
func: syuki({
0: dFunc(s * -Math.sin(16.835 / 180 * Math.PI), s * Math.cos(16.835 / 180 * Math.PI), 1.5, 0, [
0,
-10
]),
2: del,
1: del
}, 3),
delay: 1600,
drill: true
});
a.push({
func: syuki({
1: dFunc(s * Math.sin(24.4075 / 180 * Math.PI), s * Math.cos(24.4075 / 180 * Math.PI), 1.5, 0, [
0,
-10
]),
2: del,
0: del
}, 3),
delay: 1750
});
a.push({
func: syuki({
2: dFunc(s * Math.sin(24.4075 / 180 * Math.PI), s * Math.cos(24.4075 / 180 * Math.PI), 1.5, 0, [
0,
-10
]),
0: del,
1: del
}, 3),
delay: 1750,
obake: true
});
a.push({
func: syuki({
0: dFunc(s * Math.sin(24.4075 / 180 * Math.PI), s * Math.cos(24.4075 / 180 * Math.PI), 1.5, 0, [
0,
-10
]),
2: del,
1: del
}, 3),
delay: 1750,
drill: true
});
a.push({
func: syuki({
1: dFunc(s * Math.sin(8.5475 / 180 * Math.PI), s * Math.cos(8.5475 / 180 * Math.PI), 1.5, 0, [
0,
-10
]),
2: del,
0: del
}, 3),
delay: 1900
});
a.push({
func: syuki({
2: dFunc(s * Math.sin(8.5475 / 180 * Math.PI), s * Math.cos(8.5475 / 180 * Math.PI), 1.5, 0, [
0,
-10
]),
0: del,
1: del
}, 3),
delay: 1900,
obake: true
});
a.push({
func: syuki({
0: dFunc(s * Math.sin(8.5475 / 180 * Math.PI), s * Math.cos(8.5475 / 180 * Math.PI), 1.5, 0, [
0,
-10
]),
2: del,
1: del
}, 3),
delay: 1900,
drill: true
});
a.push({
func: syuki({
1: dFunc(s * -Math.sin(8.5475 / 180 * Math.PI), s * Math.cos(8.5475 / 180 * Math.PI), 1.5, 0, [
0,
-10
]),
2: del,
0: del
}, 3),
delay: 2050
});
a.push({
func: syuki({
2: dFunc(s * -Math.sin(8.5475 / 180 * Math.PI), s * Math.cos(8.5475 / 180 * Math.PI), 1.5, 0, [
0,
-10
]),
0: del,
1: del
}, 3),
delay: 2050,
obake: true
});
a.push({
func: syuki({
0: dFunc(s * -Math.sin(8.5475 / 180 * Math.PI), s * Math.cos(8.5475 / 180 * Math.PI), 1.5, 0, [
0,
-10
]),
2: del,
1: del
}, 3),
delay: 2050,
drill: true
});
a.push({
func: syuki({
1: dFunc(s * -Math.sin(24.4075 / 180 * Math.PI), s * Math.cos(24.4075 / 180 * Math.PI), 1.5, 0, [
0,
-10
]),
2: del,
0: del
}, 3),
delay: 2200
});
a.push({
func: syuki({
2: dFunc(s * -Math.sin(24.4075 / 180 * Math.PI), s * Math.cos(24.4075 / 180 * Math.PI), 1.5, 0, [
0,
-10
]),
0: del,
1: del
}, 3),
delay: 2200,
obake: true
});
a.push({
func: syuki({
0: dFunc(s * -Math.sin(24.4075 / 180 * Math.PI), s * Math.cos(24.4075 / 180 * Math.PI), 1.5, 0, [
0,
-10
]),
2: del,
1: del
}, 3),
delay: 2200,
drill: true
});
a.push({
func: syuki({
1: dFunc(s * Math.sin(16.835 / 180 * Math.PI), s * Math.cos(16.835 / 180 * Math.PI), 1.5, 0, [
0,
-10
]),
2: del,
0: del
}, 3),
delay: 2350
});
a.push({
func: syuki({
2: dFunc(s * Math.sin(16.835 / 180 * Math.PI), s * Math.cos(16.835 / 180 * Math.PI), 1.5, 0, [
0,
-10
]),
0: del,
1: del
}, 3),
delay: 2350,
obake: true
});
a.push({
func: syuki({
0: dFunc(s * Math.sin(16.835 / 180 * Math.PI), s * Math.cos(16.835 / 180 * Math.PI), 1.5, 0, [
0,
-10
]),
2: del,
1: del
}, 3),
delay: 2350,
drill: true
});
a.push({
func: syuki({
1: dFunc(s * Math.sin(0 / 180 * Math.PI), s * Math.cos(0 / 180 * Math.PI), 1.5, 0, [
0,
-10
]),
2: del,
0: del
}, 3),
delay: 2500
});
a.push({
func: syuki({
2: dFunc(s * Math.sin(0 / 180 * Math.PI), s * Math.cos(0 / 180 * Math.PI), 1.5, 0, [
0,
-10
]),
0: del,
1: del
}, 3),
delay: 2500,
obake: true
});
a.push({
func: syuki({
0: dFunc(s * Math.sin(0 / 180 * Math.PI), s * Math.cos(0 / 180 * Math.PI), 1.5, 0, [
0,
-10
]),
2: del,
1: del
}, 3),
delay: 2500,
drill: true
});
a.push({
func: syuki({
1: dFunc(s * -Math.sin(16.835 / 180 * Math.PI), s * Math.cos(16.835 / 180 * Math.PI), 1.5, 0, [
0,
-10
]),
2: del,
0: del
}, 3),
delay: 2650
});
a.push({
func: syuki({
2: dFunc(s * -Math.sin(16.835 / 180 * Math.PI), s * Math.cos(16.835 / 180 * Math.PI), 1.5, 0, [
0,
-10
]),
0: del,
1: del
}, 3),
delay: 2650,
obake: true
});
a.push({
func: syuki({
0: dFunc(s * -Math.sin(16.835 / 180 * Math.PI), s * Math.cos(16.835 / 180 * Math.PI), 1.5, 0, [
0,
-10
]),
2: del,
1: del
}, 3),
delay: 2650,
drill: true
});
a.push({
func: syuki({
1: dFunc(s * Math.sin(24.4075 / 180 * Math.PI), s * Math.cos(24.4075 / 180 * Math.PI), 1.5, 0, [
0,
-10
]),
2: del,
0: del
}, 3),
delay: 2800
});
a.push({
func: syuki({
2: dFunc(s * Math.sin(24.4075 / 180 * Math.PI), s * Math.cos(24.4075 / 180 * Math.PI), 1.5, 0, [
0,
-10
]),
0: del,
1: del
}, 3),
delay: 2800,
obake: true
});
a.push({
func: syuki({
0: dFunc(s * Math.sin(24.4075 / 180 * Math.PI), s * Math.cos(24.4075 / 180 * Math.PI), 1.5, 0, [
0,
-10
]),
2: del,
1: del
}, 3),
delay: 2800,
drill: true
});
a.push({
func: syuki({
1: dFunc(s * Math.sin(8.5475 / 180 * Math.PI), s * Math.cos(8.5475 / 180 * Math.PI), 1.5, 0, [
0,
-10
]),
2: del,
0: del
}, 3),
delay: 2950
});
a.push({
func: syuki({
2: dFunc(s * Math.sin(8.5475 / 180 * Math.PI), s * Math.cos(8.5475 / 180 * Math.PI), 1.5, 0, [
0,
-10
]),
0: del,
1: del
}, 3),
delay: 2950,
obake: true
});
a.push({
func: syuki({
0: dFunc(s * Math.sin(8.5475 / 180 * Math.PI), s * Math.cos(8.5475 / 180 * Math.PI), 1.5, 0, [
0,
-10
]),
2: del,
1: del
}, 3),
delay: 2950,
drill: true
});
a.push({
func: syuki({
1: dFunc(s * -Math.sin(8.5475 / 180 * Math.PI), s * Math.cos(8.5475 / 180 * Math.PI), 1.5, 0, [
0,
-10
]),
2: del,
0: del
}, 3),
delay: 3100
});
a.push({
func: syuki({
2: dFunc(s * -Math.sin(8.5475 / 180 * Math.PI), s * Math.cos(8.5475 / 180 * Math.PI), 1.5, 0, [
0,
-10
]),
0: del,
1: del
}, 3),
delay: 3100,
obake: true
});
a.push({
func: syuki({
0: dFunc(s * -Math.sin(8.5475 / 180 * Math.PI), s * Math.cos(8.5475 / 180 * Math.PI), 1.5, 0, [
0,
-10
]),
2: del,
1: del
}, 3),
delay: 3100,
drill: true
});
}
return a;
}
}
function puchidanmaku(s = 6.5) {
const a = [];
{
{
a.push({
func: dFunc(s * Math.sin(16.835 / 180 * Math.PI), s * Math.cos(16.835 / 180 * Math.PI), 1.5, 0, [
0,
-10
]),
delay: 250
});
a.push({
func: dFunc(s * Math.sin(0 / 180 * Math.PI), s * Math.cos(0 / 180 * Math.PI), 1.5, 0, [
0,
-10
]),
delay: 400
});
a.push({
func: dFunc(s * -Math.sin(16.835 / 180 * Math.PI), s * Math.cos(16.835 / 180 * Math.PI), 1.5, 0, [
0,
-10
]),
delay: 550
});
a.push({
func: dFunc(s * Math.sin(24.4075 / 180 * Math.PI), s * Math.cos(24.4075 / 180 * Math.PI), 1.5, 0, [
0,
-10
]),
delay: 700
});
a.push({
func: dFunc(s * Math.sin(8.5475 / 180 * Math.PI), s * Math.cos(8.5475 / 180 * Math.PI), 1.5, 0, [
0,
-10
]),
delay: 850
});
a.push({
func: dFunc(s * -Math.sin(8.5475 / 180 * Math.PI), s * Math.cos(8.5475 / 180 * Math.PI), 1.5, 0, [
0,
-10
]),
delay: 1000
});
a.push({
func: dFunc(s * -Math.sin(24.4075 / 180 * Math.PI), s * Math.cos(24.4075 / 180 * Math.PI), 1.5, 0, [
0,
-10
]),
delay: 1150
});
a.push({
func: dFunc(s * Math.sin(16.835 / 180 * Math.PI), s * Math.cos(16.835 / 180 * Math.PI), 1.5, 0, [
0,
-10
]),
delay: 1300
});
a.push({
func: dFunc(s * Math.sin(0 / 180 * Math.PI), s * Math.cos(0 / 180 * Math.PI), 1.5, 0, [
0,
-10
]),
delay: 1450
});
a.push({
func: dFunc(s * -Math.sin(16.835 / 180 * Math.PI), s * Math.cos(16.835 / 180 * Math.PI), 1.5, 0, [
0,
-10
]),
delay: 1600
});
a.push({
func: dFunc(s * Math.sin(24.4075 / 180 * Math.PI), s * Math.cos(24.4075 / 180 * Math.PI), 1.5, 0, [
0,
-10
]),
delay: 1750
});
a.push({
func: dFunc(s * Math.sin(8.5475 / 180 * Math.PI), s * Math.cos(8.5475 / 180 * Math.PI), 1.5, 0, [
0,
-10
]),
delay: 1900
});
a.push({
func: dFunc(s * -Math.sin(8.5475 / 180 * Math.PI), s * Math.cos(8.5475 / 180 * Math.PI), 1.5, 0, [
0,
-10
]),
delay: 2050
});
a.push({
func: dFunc(s * -Math.sin(24.4075 / 180 * Math.PI), s * Math.cos(24.4075 / 180 * Math.PI), 1.5, 0, [
0,
-10
]),
delay: 2200
});
a.push({
func: dFunc(s * Math.sin(16.835 / 180 * Math.PI), s * Math.cos(16.835 / 180 * Math.PI), 1.5, 0, [
0,
-10
]),
delay: 2350
});
a.push({
func: dFunc(s * Math.sin(0 / 180 * Math.PI), s * Math.cos(0 / 180 * Math.PI), 1.5, 0, [
0,
-10
]),
delay: 2500
});
a.push({
func: dFunc(s * -Math.sin(16.835 / 180 * Math.PI), s * Math.cos(16.835 / 180 * Math.PI), 1.5, 0, [
0,
-10
]),
delay: 2650
});
a.push({
func: dFunc(s * Math.sin(24.4075 / 180 * Math.PI), s * Math.cos(24.4075 / 180 * Math.PI), 1.5, 0, [
0,
-10
]),
delay: 2800
});
a.push({
func: dFunc(s * Math.sin(8.5475 / 180 * Math.PI), s * Math.cos(8.5475 / 180 * Math.PI), 1.5, 0, [
0,
-10
]),
delay: 2950
});
}
return a;
}
}
function danmaku(s = 6.5) {
const a = [];
{
{
a.push({
func: dFunc(s * Math.sin(16.835 / 180 * Math.PI), s * Math.cos(16.835 / 180 * Math.PI), 1.5, 0, [
0,
-10
]),
delay: 250
});
a.push({
func: dFunc(s * Math.sin(0 / 180 * Math.PI), s * Math.cos(0 / 180 * Math.PI), 1.5, 0, [
0,
-10
]),
delay: 400
});
a.push({
func: dFunc(s * -Math.sin(16.835 / 180 * Math.PI), s * Math.cos(16.835 / 180 * Math.PI), 1.5, 0, [
0,
-10
]),
delay: 550
});
a.push({
func: dFunc(s * Math.sin(24.4075 / 180 * Math.PI), s * Math.cos(24.4075 / 180 * Math.PI), 1.5, 0, [
0,
-10
]),
delay: 700
});
a.push({
func: dFunc(s * Math.sin(8.5475 / 180 * Math.PI), s * Math.cos(8.5475 / 180 * Math.PI), 1.5, 0, [
0,
-10
]),
delay: 850
});
a.push({
func: dFunc(s * -Math.sin(8.5475 / 180 * Math.PI), s * Math.cos(8.5475 / 180 * Math.PI), 1.5, 0, [
0,
-10
]),
delay: 1000
});
a.push({
func: dFunc(s * -Math.sin(24.4075 / 180 * Math.PI), s * Math.cos(24.4075 / 180 * Math.PI), 1.5, 0, [
0,
-10
]),
delay: 1150
});
a.push({
func: dFunc(s * Math.sin(16.835 / 180 * Math.PI), s * Math.cos(16.835 / 180 * Math.PI), 1.5, 0, [
0,
-10
]),
delay: 1300
});
a.push({
func: dFunc(s * Math.sin(0 / 180 * Math.PI), s * Math.cos(0 / 180 * Math.PI), 1.5, 0, [
0,
-10
]),
delay: 1450
});
a.push({
func: dFunc(s * -Math.sin(16.835 / 180 * Math.PI), s * Math.cos(16.835 / 180 * Math.PI), 1.5, 0, [
0,
-10
]),
delay: 1600
});
a.push({
func: dFunc(s * Math.sin(24.4075 / 180 * Math.PI), s * Math.cos(24.4075 / 180 * Math.PI), 1.5, 0, [
0,
-10
]),
delay: 1750
});
a.push({
func: dFunc(s * Math.sin(8.5475 / 180 * Math.PI), s * Math.cos(8.5475 / 180 * Math.PI), 1.5, 0, [
0,
-10
]),
delay: 1900
});
a.push({
func: dFunc(s * -Math.sin(8.5475 / 180 * Math.PI), s * Math.cos(8.5475 / 180 * Math.PI), 1.5, 0, [
0,
-10
]),
delay: 2050
});
a.push({
func: dFunc(s * -Math.sin(24.4075 / 180 * Math.PI), s * Math.cos(24.4075 / 180 * Math.PI), 1.5, 0, [
0,
-10
]),
delay: 2200
});
a.push({
func: dFunc(s * Math.sin(16.835 / 180 * Math.PI), s * Math.cos(16.835 / 180 * Math.PI), 1.5, 0, [
0,
-10
]),
delay: 2350
});
a.push({
func: dFunc(s * Math.sin(0 / 180 * Math.PI), s * Math.cos(0 / 180 * Math.PI), 1.5, 0, [
0,
-10
]),
delay: 2500
});
a.push({
func: dFunc(s * -Math.sin(16.835 / 180 * Math.PI), s * Math.cos(16.835 / 180 * Math.PI), 1.5, 0, [
0,
-10
]),
delay: 2650
});
a.push({
func: dFunc(s * Math.sin(24.4075 / 180 * Math.PI), s * Math.cos(24.4075 / 180 * Math.PI), 1.5, 0, [
0,
-10
]),
delay: 2800
});
a.push({
func: dFunc(s * Math.sin(8.5475 / 180 * Math.PI), s * Math.cos(8.5475 / 180 * Math.PI), 1.5, 0, [
0,
-10
]),
delay: 2950
});
a.push({
func: dFunc(s * -Math.sin(8.5475 / 180 * Math.PI), s * Math.cos(8.5475 / 180 * Math.PI), 1.5, 0, [
0,
-10
]),
delay: 3100
});
a.push({
func: dFunc(s * -Math.sin(24.4075 / 180 * Math.PI), s * Math.cos(24.4075 / 180 * Math.PI), 1.5, 0, [
0,
-10
]),
delay: 3250
});
a.push({
func: dFunc(s * Math.sin(16.835 / 180 * Math.PI), s * Math.cos(16.835 / 180 * Math.PI), 1.5, 0, [
0,
-10
]),
delay: 3400
});
a.push({
func: dFunc(s * Math.sin(0 / 180 * Math.PI), s * Math.cos(0 / 180 * Math.PI), 1.5, 0, [
0,
-10
]),
delay: 3550
});
a.push({
func: dFunc(s * -Math.sin(16.835 / 180 * Math.PI), s * Math.cos(16.835 / 180 * Math.PI), 1.5, 0, [
0,
-10
]),
delay: 3700
});
a.push({
func: dFunc(s * Math.sin(24.4075 / 180 * Math.PI), s * Math.cos(24.4075 / 180 * Math.PI), 1.5, 0, [
0,
-10
]),
delay: 3850
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
0: dFunc(s * Math.sin(16.87 / 180 * Math.PI), s * Math.cos(16.87 / 180 * Math.PI), 3, 0, [
0,
-10
]),
1: del,
2: del
}, 3)
});
a.push({
func: syuki({
1: dFunc(s * Math.sin(16.87 / 180 * Math.PI), s * Math.cos(16.87 / 180 * Math.PI), 3, 0, [
0,
-10
]),
2: del,
0: del
}, 3),
drill: true
});
a.push({
func: syuki({
2: dFunc(s * Math.sin(16.87 / 180 * Math.PI), s * Math.cos(16.87 / 180 * Math.PI), 3, 0, [
0,
-10
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
-10
]),
2: del,
3: del
}, 3)
});
a.push({
func: syuki({
2: dFunc(0, s, 5, 0, [
0,
-10
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
-10
]),
1: del,
2: del
}, 3),
obake: true
});
a.push({
func: syuki({
2: dFunc(-s * Math.sin(16.87 / 180 * Math.PI), s * Math.cos(16.87 / 180 * Math.PI), 3, 0, [
0,
-10
]),
0: del,
1: del
}, 3)
});
a.push({
func: syuki({
0: dFunc(-s * Math.sin(16.87 / 180 * Math.PI), s * Math.cos(16.87 / 180 * Math.PI), 3, 0, [
0,
-10
]),
1: del,
2: del
}, 3),
drill: true
});
a.push({
func: syuki({
1: dFunc(-s * Math.sin(16.87 / 180 * Math.PI), s * Math.cos(16.87 / 180 * Math.PI), 3, 0, [
0,
-10
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
function tuboB(l = 1, r = 190, size = 3, dθ = -0.007, dy = 1.5, y = 1) {
return (t)=>{
if (t < 5) {
return [
r * Math.sin((5 * dθ - 1) * Math.PI) * l * t / 5,
(r * Math.cos((5 * dθ - 1) * Math.PI) * y + 5 * dy + 50) * t / 5,
size
];
} else if (t * dθ - 1 < 2) {
return [
r * Math.sin((t * dθ - 1) * Math.PI) * l,
r * Math.cos((t * dθ - 1) * Math.PI) * y + t * dy + 50,
size
];
} else {
return [
-14000,
0,
0
];
}
};
}
function tuboA(r = 1, when = 0.7, size = 3, speed = 0.011, dx = 135, dy = 12, dx2 = -0.0375, dy2 = 0.115 * 19 / 20, f = 0.00015) {
return (t)=>{
if (t < when / speed) {
return [
r * (dx * Math.sin((t * speed - 1 / 5) * Math.PI) + 90),
-dy * Math.cos((t * speed - 1 / 5) * Math.PI) - dy - 20 + t * t * t * f,
size
];
} else {
return [
r * (dx * Math.sin((when - 1 / 5) * Math.PI) + 90 + (t - when / speed) * (t - (when / speed - 22)) * dx2),
-dy * Math.cos((when - 1 / 5) * Math.PI) - dy + (t - when / speed) * (t - (when / speed - 22)) * dy2 - 20 + when / speed * (when / speed) * (when / speed) * f,
size
];
}
};
}
function name_spread(z = 27, df = 2.437, de = 250, st = 20, obake = false, d = 1) {
const s = df;
const a = [];
for(let i = 0; i < z; i++){
a.push({
func: dFunc(Math.sin(Math.PI * (2 / z) * i) * s, Math.cos(Math.PI * (2 / z) * i) * s * d, 1.5, st, [
0,
-45
]),
delay: de,
obake
});
}
return a;
}
function kayaku(z = 18, df = 8, de = 0, add = 20, obake = false, drill = false, d = 1) {
const s = df;
const a = [];
for(let i = 0; i < z; i++){
a.push({
func: dFunc(Math.sin(Math.PI * (2 / z) * i) * s, Math.cos(Math.PI * (2 / z) * i) * s * d, 1.5, add, [
0,
0
]),
delay: de,
drill,
obake
});
}
return a;
}
function awawash(afg = false) {
const a = [];
for(let i = 0; i < 11; i++){
a.push({
func: dFunc(18.789 * Math.sin(2 * i / 11 * Math.PI), 18.789 * Math.cos(2 * i / 11 * Math.PI), 1.5, 0, [
0,
-50
]),
delay: 500,
drill: afg
});
a.push({
func: dFunc(15.024 * Math.sin(2 * i / 11 * Math.PI), 15.024 * Math.cos(2 * i / 11 * Math.PI), 1.5, 0, [
0,
-50
]),
delay: 500,
drill: afg
});
a.push({
func: dFunc(11.259 * Math.sin(2 * i / 11 * Math.PI), 11.259 * Math.cos(2 * i / 11 * Math.PI), 1.5, 0, [
0,
-50
]),
delay: 500,
drill: afg
});
a.push({
func: dFunc(7.494 * Math.sin(2 * i / 11 * Math.PI), 7.494 * Math.cos(2 * i / 11 * Math.PI), 1.5, 0, [
0,
-50
]),
delay: 500,
drill: afg
});
a.push({
func: dFunc(3.729 * Math.sin(2 * i / 11 * Math.PI), 3.729 * Math.cos(2 * i / 11 * Math.PI), 1.5, 0, [
0,
-50
]),
delay: 500,
drill: afg
});
}
for(let i = 0; i < 11; i++){
a.push({
func: dFunc(16.9065 * Math.sin((2 * i + 1) / 11 * Math.PI), 16.9065 * Math.cos((2 * i + 1) / 11 * Math.PI), 1.5, 0, [
0,
-50
]),
delay: 500,
drill: afg
});
a.push({
func: dFunc(13.1415 * Math.sin((2 * i + 1) / 11 * Math.PI), 13.1415 * Math.cos((2 * i + 1) / 11 * Math.PI), 1.5, 0, [
0,
-50
]),
delay: 500,
drill: afg
});
a.push({
func: dFunc(9.3765 * Math.sin((2 * i + 1) / 11 * Math.PI), 9.3765 * Math.cos((2 * i + 1) / 11 * Math.PI), 1.5, 0, [
0,
-50
]),
delay: 500,
drill: afg
});
a.push({
func: dFunc(5.6115 * Math.sin((2 * i + 1) / 11 * Math.PI), 5.6115 * Math.cos((2 * i + 1) / 11 * Math.PI), 1.5, 0, [
0,
-50
]),
delay: 500,
drill: afg
});
}
return a;
}
function awasp(drill = false, obake = false, s = 180 / 16.35) {
const a = [];
for(let i = 0; i < 3; i++){
a.push({
func: dFunc(10.2 * Math.sin((-1 + i) / s * Math.PI), 10.2 * Math.cos((-1 + i) / s * Math.PI), 1.5, 0, [
0,
0
]),
drill,
obake
});
a.push({
func: dFunc(8.16 * Math.sin((-1 + i) / s * Math.PI), 8.16 * Math.cos((-1 + i) / s * Math.PI), 1.5, 0, [
0,
0
]),
drill,
obake
});
a.push({
func: dFunc(6.12 * Math.sin((-1 + i) / s * Math.PI), 6.12 * Math.cos((-1 + i) / s * Math.PI), 1.5, 0, [
0,
0
]),
drill,
obake
});
a.push({
func: dFunc(4.08 * Math.sin((-1 + i) / s * Math.PI), 4.08 * Math.cos((-1 + i) / s * Math.PI), 1.5, 0, [
0,
0
]),
drill,
obake
});
}
return a;
}
function eggbomb(s = 1, drill = false, obake = false) {
const a = [];
for(let i = 0; i < 7; i++){
a.push({
func: dCurve(54 * Math.PI / 180 - 13 * Math.PI * i / 180, -0.2 * Math.PI / 180, 1.5, 10 * s, [
0,
-10
], 0, 1.4),
drill,
obake
});
}
return a;
}
function awabomb(drill = false, obake = false, s = 180 / 16.35) {
const a = [];
for(let i = 0; i < 3; i++){
a.push({
func: dFunc(8.16 * Math.sin((-1 + i) / s * Math.PI), 8.16 * Math.cos((-1 + i) / s * Math.PI), 1.5, 0, [
0,
0
]),
drill,
obake
});
a.push({
func: dFunc(6.12 * Math.sin((-1 + i) / s * Math.PI), 6.12 * Math.cos((-1 + i) / s * Math.PI), 1.5, 0, [
0,
0
]),
drill,
obake
});
a.push({
func: dFunc(4.08 * Math.sin((-1 + i) / s * Math.PI), 4.08 * Math.cos((-1 + i) / s * Math.PI), 1.5, 0, [
0,
0
]),
drill,
obake
});
}
return a;
}
function five(s = 24.62, drill = false, delay = 300, obake = false, size = 1, daen = 1) {
const a = [];
a.push({
func: dFunc(s * Math.sin(0 / 12 * Math.PI) * daen, s * Math.cos(0 / 12 * Math.PI), 5 * size, 0, [
0,
-10
]),
drill,
delay,
obake
});
a.push({
func: dFunc(s * 0.625 * daen, s * Math.sqrt(39) / 8, 3 * size, 0, [
0,
-10
]),
drill,
delay,
obake
});
a.push({
func: dFunc(s * -0.625 * daen, s * Math.sqrt(39) / 8, 3 * size, 0, [
0,
-10
]),
drill,
delay,
obake
});
a.push({
func: dFunc(s * 0.375 * daen, s * Math.sqrt(55) / 8, 3 * size, 0, [
0,
-10
]),
drill,
delay,
obake
});
a.push({
func: dFunc(s * -0.375 * daen, s * Math.sqrt(55) / 8, 3 * size, 0, [
0,
-10
]),
drill,
delay,
obake
});
return a;
}
function awa_ring() {
const a = [];
for(let i = 0; i < 8; i++){
a.push({
func: dKaiten(Math.PI / 8 * (2 * i + 1), 0.13, 6.9, 0, 8, 1.5),
delay: 350
});
}
return a;
}
function uzu(dr1 = -1.5, q = 100, dr2 = 0, p = 250, kaiten = 0.06, dy = 2.6, size = 3, z = 0, when = 10, when2 = 2.6 / 0.06) {
return (t)=>{
if (t < when) {
return [
q / 2 * Math.sin(t * Math.PI * 0.1 + 1 / 2 * Math.PI) - q / 2,
-(p / 10) * Math.cos(t * Math.PI * 0.1 + 1 / 2 * Math.PI) + z + dy * t,
size
];
} else if (t < when2 && t >= when) {
return [
(q - dr1 * (t - when)) * Math.sin((t - when) * Math.PI * kaiten - 1 / 2 * Math.PI),
-((p - (t - when) * dr1) / 10) * Math.cos((t - when) * Math.PI * kaiten - 1 / 2 * Math.PI) + z + dy * t,
size
];
}
return [
(q - dr2 * (t - when2) - dr1 * (when2 - when)) * Math.sin((t - when2) * Math.PI * kaiten - 1 / 2 * Math.PI),
-((p - (t - when2) * dr2 - dr1 * (when2 - when)) / 10) * Math.cos((t - when2) * Math.PI * kaiten - 1 / 2 * Math.PI) + z + dy * t,
size
];
};
}
function uzushio() {
const a = [];
for(let i = 0; i < 20; i++){
a.push({
func: delay((120 * i + 200) / 25, uzu(-2.2 + 0.25 * i)),
delay: 0,
drill: true
});
}
return a;
}
function i_spread(r = -1) {
const a = [];
for(let i = 0; i < 24; i++){
a.push({
func: dCurve(Math.PI / 12 * i, r * (0.019 / 12) * Math.PI, 1.5, 4.5, [
0,
-50
], 6),
delay: 0
});
}
return a;
}
function m_spread(r = 1, s = 1) {
const a = [];
for(let i = 0; i < 12; i++){
a.push({
func: dCurve(i / 6 * Math.PI, r * (0.024 / 12) * Math.PI, 3, 6.8 * s, [
0,
-50
], 5),
delay: 400,
drill: true
});
}
for(let i = 0; i < 12; i++){
a.push({
func: dCurve((2 * i + 1) / 12 * Math.PI, r * (0.024 / 12) * Math.PI, 1.5, 6.8 * s, [
0,
-50
], 5),
delay: 400,
drill: true
});
}
return a;
}
function tubo_spread(kazu = 6, r = 1, size1 = 1.5, size2 = 3, s = 1, add = 3, drill = false) {
const a = [];
for(let i = 0; i < kazu; i++){
a.push({
func: dCurve(2 * i / kazu * Math.PI, r * (0.024 / 12) * Math.PI, size1, 6.8 * s, [
0,
-10
], add),
delay: 0,
drill
});
}
for(let i = 0; i < kazu; i++){
a.push({
func: dCurve((2 * i + 1) / kazu * Math.PI, r * (0.024 / 12) * Math.PI, size2, 6.8 * s, [
0,
-10
], add),
delay: 0,
drill
});
}
return a;
}
function senaka(θ = 5.5 / 6 * Math.PI, dθ = 0.00001 * Math.PI, size = 3, speed = 8) {
return function(t) {
if (t <= 3) {
this.by = 0;
return [
0,
0,
size
];
} else {
this.by = 0;
return [
t * speed * Math.sin(θ + dθ * t * t),
t * speed * Math.cos(θ + dθ * t),
size
];
}
};
}
function bigarrow() {
const a = [];
a.push({
func: dFunc(0, 20.5, 3, 0, [
0,
10
]),
delay: 300
});
a.push({
func: dFuncif(1100 / 16, 0, 0, 16.5, 4, 0, 3, [
0,
10
]),
delay: 300
});
a.push({
func: dFuncif(-1100 / 16, 0, 0, 16.5, 4, 0, 3, [
0,
10
]),
delay: 300
});
a.push({
func: dFuncif(1100 / 16, 0, 0, 12.5, 8, 0, 3, [
0,
10
]),
delay: 300
});
a.push({
func: dFuncif(-1100 / 16, 0, 0, 12.5, 8, 0, 3, [
0,
10
]),
delay: 300
});
a.push({
func: dFuncif(1100 / 16, 0, 0, 8.5, 12, 0, 3, [
0,
10
]),
delay: 300
});
a.push({
func: dFuncif(-1100 / 16, 0, 0, 8.5, 12, 0, 3, [
0,
10
]),
delay: 300
});
return a;
}
class GameSocket {
game;
socket;
constructor(game){
this.game = game;
}
initWithP2P(socket, box) {
console.log("listening start");
socket.addEventListener("message", (e)=>{
this.event(e.data.data);
});
this.socket = socket;
this.game.socket_side = socket.isOfferer ? 1 : 0;
this.game.codeHash = box;
this.game.delete_box = true;
if (socket.isOfferer) {
setTimeout(()=>{
const start = Date.now() + 1000;
this.send({
start
});
setTimeout(()=>{
this.game.init();
}, start - Date.now());
}, 1000);
}
}
get _socket() {
if (!this.socket) {
throw new Error("Socket not initialized");
}
return this.socket;
}
send(data) {
this._socket.send({
...data,
on: Date.now()
});
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
console.log("event", e);
const late = Date.now() - (e.on || 0);
if (e.start) {
setTimeout(()=>{
this.game.init();
}, e.start - Date.now());
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
if (e.struct) {
this.game.setStruct(this.game.enemy, e.struct.type, e.struct.x, e.struct.extra || {}, e.struct.id, e.struct.on);
}
if (e.rmstruct) {
this.game.enemy.structures[e.rmstruct.id].remove();
}
if (e.skillstruct) {
this.game.structSkillBegin(this.game.enemy.structures[e.skillstruct.id], e.skillstruct.skillid, e.skillstruct.on, e.skillstruct.extra);
}
}
}
const structs = [
{
name: "プチヒトデ",
texture: "Star",
bomb: true,
interval: {
ms: 2000,
handler: function(t) {
this.skill(18);
this.skill(19);
}
},
onhit: function(by) {
skill_list.indexOf(by.parent.define);
this.skill(20);
this.skill(skill_list.indexOf(by.parent.define));
}
},
{
name: "てっぺき",
texture: "Fe",
interval: {
ms: 4500,
handler: function(t) {
this.skill(57);
}
},
onhit: function(by) {
this.skill(86);
}
},
{
name: "かやく",
texture: "kayaku",
bomb: true,
onhit: function(by) {
this.skill(228);
},
onparentskill: function(skill) {
if (skill_list.indexOf(skill.define) === 80) {
this.skill(228);
this.remove();
}
}
},
{
name: "ドリル",
texture: "Bomb",
bomb: true,
onhit: function(by) {
this.skill(229);
}
},
{
name: "モノマネ",
texture: "Monomane",
bomb: true,
onhit: function(by) {
skill_list.indexOf(by.parent.define);
this.skill(skill_list.indexOf(by.parent.define));
}
},
{
name: "オバケ",
texture: "ghbomb",
bomb: true,
onhit: function(by) {
this.skill(230);
}
},
{
name: "あわ",
texture: "Bomb",
bomb: true,
onhit: function(by) {
this.skill(231);
}
},
{
name: "だましp",
texture: "Bomb",
bomb: true,
onhit: function(by) {
this.skill(225);
}
},
{
name: "へんか1",
texture: "henka1",
bomb: true,
onhit: function(by) {
this.skill(232);
},
onparentskill: function(skill) {
if (skill_list.indexOf(skill.define) === 80) {
this.skill(232);
this.remove();
}
}
},
{
name: "へんか2",
texture: "henka2",
interval: {
ms: 4500,
handler: function(t) {
this.skill(233);
}
}
},
{
name: "へんか3",
texture: "henka3",
bomb: true,
onhit: function(by) {
this.skill(234);
},
onparentskill: function(skill) {
if (skill_list.indexOf(skill.define) === 80) {
this.skill(234);
this.remove();
}
}
},
{
name: "へんか4",
texture: "henka4",
chien0: true,
interval: {
ms: 4500,
handler: function(t) {
this.skill(235);
}
}
},
{
name: "へんか5",
texture: "henka5",
bomb: true,
onhit: function(by) {
this.skill(236);
},
onparentskill: function(skill) {
if (skill_list.indexOf(skill.define) === 80) {
this.skill(236);
this.remove();
}
}
},
{
name: "へんか6",
texture: "henka6",
interval: {
ms: 550,
handler: function(t) {
this.skill(237);
}
}
},
{
name: "ライオンボム",
texture: "bomb2",
bomb: true,
onhit: function(by) {
this.skill(243);
}
},
{
name: "カカシ",
texture: "kakasi",
interval: {
ms: 1800,
handler: function(t) {
this.skill(238);
}
}
},
{
name: "背中",
texture: "senaka",
bomb: true,
interval: {
ms: 100,
handler: function(t) {
this.x += 1;
}
},
onhit: function(by) {
this.skill(239);
},
onparentskill: function(skill) {
if (skill_list.indexOf(skill.define) === 80) {
this.skill(239);
this.remove();
}
}
},
{
name: "子カピ",
texture: "capy",
interval: {
ms: 2800,
handler: function(t) {
this.skill(240);
}
}
},
{
name: "不良",
texture: "capy",
chien0: true,
interval: {
ms: 2400,
handler: function(t) {
this.skill(241);
}
}
},
{
name: "クジラボム",
texture: "bomb2",
bomb: true,
onhit: function(by) {
this.skill(242);
}
},
{
name: "スケープゴート",
texture: "scape",
chien0: true,
onparentskill: function(skill) {
if (skill_list.indexOf(skill.define) === 75 || skill_list.indexOf(skill.define) === 186 || skill_list.indexOf(skill.define) === 218) {
this.skill(244);
}
}
},
{
name: "デルタゴート",
texture: "scape",
chien0: true,
onparentskill: function(skill) {
if (skill_list.indexOf(skill.define) === 75 || skill_list.indexOf(skill.define) === 186 || skill_list.indexOf(skill.define) === 218) {
this.skill(245);
}
}
},
{
name: "カーブゴート",
texture: "scape",
chien0: true,
onparentskill: function(skill) {
if (skill_list.indexOf(skill.define) === 75 || skill_list.indexOf(skill.define) === 186 || skill_list.indexOf(skill.define) === 218) {
this.skill(246);
}
}
},
{
name: "産卵",
texture: "egg1",
onhit: function(by) {
if (this.isme) {
setTimeout(()=>this.game.setStruct(this.game.me, 24, undefined, {
x: this.x
}), 800);
}
}
},
{
name: "孵化",
texture: "egg2",
chien0: true,
interval: {
ms: 2800,
handler: function(t) {
this.x = this.extra.x;
this.skill(247);
}
}
},
{
name: "たまごボム",
texture: "egg1",
onhit: function(by) {
this.skill(248);
}
},
{
name: "ウサギボーイ",
texture: "rabboy",
chien0: true,
interval: {
ms: 5000,
handler: function(t) {
this.skill(254);
}
}
},
{
name: "オバケボーイ",
texture: "ghoboy",
chien0: true,
interval: {
ms: 5000,
handler: function(t) {
this.skill(249);
}
}
},
{
name: "モグラボーイ",
texture: "molboy",
chien0: true,
interval: {
ms: 5000,
handler: function(t) {
this.skill(250);
}
}
},
{
name: "クジラボディ",
texture: "whabody",
chien0: true,
interval: {
ms: 3600,
handler: function(t) {
this.skill(251);
}
}
},
{
name: "ナメボディ",
texture: "slubody",
chien0: true,
interval: {
ms: 3600,
handler: function(t) {
this.skill(252);
}
}
},
{
name: "シシボディ",
texture: "leobody",
chien0: true,
interval: {
ms: 3600,
handler: function(t) {
this.skill(253);
}
}
},
{
name: "ダークゴート",
texture: "dark",
chien0: true,
onparentskill: function(skill) {
if (skill_list.indexOf(skill.define) === 75 || skill_list.indexOf(skill.define) === 186 || skill_list.indexOf(skill.define) === 218) {
this.skill(255);
}
}
},
{
name: "ゴートボム",
texture: "scape",
onhit: function(by) {
this.skill(256);
},
onparentskill: function(skill) {
if (skill_list.indexOf(skill.define) === 75 || skill_list.indexOf(skill.define) === 186 || skill_list.indexOf(skill.define) === 218) {
this.skill(256);
this.remove();
}
}
}
];
class TypedEventEmitter {
listeners = new Map();
on(event, ...listeners) {
if (!this.listeners.has(event)) {
this.listeners.set(event, []);
}
for (const listener of listeners){
this.listeners.get(event)?.push(listener);
}
return this;
}
off(event, ...listeners) {
if (this.listeners.has(event)) {
for (const listener of listeners){
if (!this.listeners.get(event)?.includes(listener)) continue;
this.listeners.get(event)?.splice(this.listeners.get(event)?.indexOf(listener) ?? 0, 1);
}
}
return this;
}
emit(event, ...args) {
if (this.listeners.has(event)) {
this.listeners.get(event)?.forEach((listener)=>listener(...args));
}
return this;
}
}
class TapEventEmitter extends TypedEventEmitter {
touch;
block = false;
constructor(){
super();
addEventListener("touchend", (e)=>{
this.block && e.preventDefault();
if (e.changedTouches[0].pageY > window.innerHeight * 0.9) {
this.emit("skill", Math.floor(e.changedTouches[0].pageX / (window.innerWidth / 3)));
}
});
addEventListener("touchstart", (e)=>{
this.block && e.preventDefault();
this.touch = [
e.changedTouches[0].pageX,
e.changedTouches[0].pageX,
e.changedTouches[0].identifier
];
});
addEventListener("touchmove", (e)=>{
this.block && e.preventDefault();
if (!this.touch) return;
for(let index = 0; index < e.changedTouches.length; index++){
const { identifier, pageX, pageY } = e.changedTouches[index];
if (identifier === this.touch[2]) {
if (Math.abs(pageX - this.touch[0]) * 2 < Math.abs(pageY - this.touch[1])) {
this.emit("move", 2);
} else if (pageX - this.touch[0]) {
this.emit("move", pageX > this.touch[0] ? 1 : 0);
}
this.touch = [
pageX,
pageY,
identifier
];
break;
}
}
});
addEventListener("contextmenu", (e)=>e.preventDefault());
}
clear() {
this.listeners.clear();
this.touch = undefined;
}
}
const tapEventEmitter = new TapEventEmitter();
oncontextmenu = (e)=>e.preventDefault();
let app;
let UI;
let pbox;
const bgm = new Audio();
document.body.appendChild(bgm);
let bgm_home;
let bgm_battle;
let pstar;
const RGB_ME = 0x29B6F6;
const RGB_ENEMY = 0xEF5350;
let chara = 0;
const url = new URL(location.href);
let ver = 0;
let debug;
let textureSet;
const boxsize = 1.15;

const speed = 7;
const cost_speed = 0.5;
const p_speed = 1.6;
const psize = 25;
const box_speeds = [
2.5,
1.2,
1
];

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
star.width = parse(80);
star.height = parse(80);
if (d == -1) {
this.x = 750;
}
this._id = setInterval(()=>{
star.width = parse(80 * boxsize);
star.height = parse(80 * boxsize);
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

class Skill {
define;
game;
extra;
id;
shots;
constructor(star, color, define, on, game, extra = {}, at){
this.define = define;
this.game = game;
this.extra = extra;
this.id = on;
this.shots = Array(define.shots.length);
define.shots.forEach((e, i)=>{
setTimeout(()=>{
const a = new Shot(e, star, color, i, this, at);
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
class Structure {
define;
id;
parent;
enemy;
game;
x;
extra;
sprite;
_render;
_interval;
isme;
skillcount;
alive;
y;
constructor(define, id, parent, enemy, game, x, extra){
this.define = define;
this.id = id;
this.parent = parent;
this.enemy = enemy;
this.game = game;
this.x = x;
this.extra = extra;
this.skillcount = 0;
this.alive = true;
this.y = 0;
console.log("Structure", ...arguments);
textureSet[define.texture].baseTexture.scaleMode = PIXI.SCALE_MODES.NEAREST;
this.sprite = new PIXI.Sprite(textureSet[define.texture]);
app.stage.addChild(this.sprite);
this.isme = game.me === parent;
if (this.isme) {
this.sprite.tint = RGB_ME;
} else {
this.sprite.tint = RGB_ENEMY;
this.sprite.rotation = Math.PI;
}
this.y = this.parent.st.y - 70;
this.sprite.x = parse(this.isme ? this.x : 700 - this.x);
this.sprite.y = parse(this.isme ? this.y : 1000 - this.y);
this.sprite.width = parse(40);
this.sprite.height = parse(40);
this.sprite.anchor.set(0.5);
this._render = setInterval(()=>{
if (game.delete_box) {
this.remove();
}
this.y = this.parent.st.y - 70;
this.sprite.x = parse(this.isme ? this.x : 700 - this.x);
this.sprite.y = parse(this.isme ? this.y : 1000 - this.y);
this.sprite.width = parse(40);
this.sprite.height = parse(40);
}, 100);
if (define.interval) {
let t = 0;
define.chien0 && define.interval.handler.call(this, t++);
this._interval = setInterval(()=>{
define.interval.handler.call(this, t);
t++;
}, define.interval.ms);
}
}
skill(s, extra) {
this.game.structSkillBegin(this, s, undefined, extra);
}
onhit(by) {
if (!this.alive) {
return;
}
if (this.define.onhit) {
this.define.onhit.call(this, by);
}
by.enemy === this.game.me && this.remove();
}
onParentSkill(skill) {
if (!this.alive) {
return;
}
if (this.define.onparentskill) {
this.define.onparentskill.call(this, skill);
}
}
ishit(x, y, r) {
r += 12;
return (x <= this.x && x > this.x - r || x > this.x && x < this.x + r) && (y < this.y && y > this.y - r || y > this.y && y < this.y + r);
}
remove() {
if (this._render) {
clearInterval(this._render);
}
if (this._interval) {
clearInterval(this._interval);
}
let y = this.isme ? this.y : 1000 - this.y;
let x = this.isme ? this.x : 700 - this.x;
this.alive = false;
if (!this.define.bomb) {
this.sprite.rotation = Math.PI / 2;
this._render = setInterval(()=>{
y += this.isme ? 15 : -15;
this.sprite.x = parse(x);
this.sprite.y = parse(y);
this.sprite.width = parse(40);
this.sprite.height = parse(40);
if (y < -50 || y > 1050) {
clearInterval(this._render);
app.stage.removeChild(this.sprite);
this.sprite.destroy();
}
}, 50);
} else {
this.sprite.x = parse(x);
this.sprite.y = parse(y);
this.sprite.width = parse(70);
this.sprite.height = parse(70);
this.sprite.tint = 0xFFFFFF;
setTimeout(()=>{
app.stage.removeChild(this.sprite);
this.sprite.destroy();
}, 250);
}
if (this.isme && this.game.start === 1) {
this.game.gs.send({
rmstruct: {
id: this.id
}
});
}
}
}
const shot_speed = 1;
const network_delay = 200;

class P2PSocket extends EventTarget {
ws;
isOfferer;
peerConnection;
dataChannel;
seq = 0;
seq2 = -1;
pending = [];
notarrived = [];
constructor(ws, isOfferer){
super();
this.ws = ws;
this.isOfferer = isOfferer;
this.peerConnection = new RTCPeerConnection();
this.setupWebSocket();
this.setupPeerConnection();
}
setupWebSocket() {
this.ws.addEventListener("message", async (event)=>{
const message = JSON.parse(event.data);
if (message.sdp) {
await this.peerConnection.setRemoteDescription(message.sdp);
if (message.sdp.type === "offer") {
const answer = await this.peerConnection.createAnswer();
await this.peerConnection.setLocalDescription(answer);
this.ws.send(JSON.stringify({
sdp: answer
}));
}
} else if (message.candidate) {
await this.peerConnection.addIceCandidate(message.candidate);
}
});
}
setupPeerConnection() {
this.peerConnection.addEventListener("icecandidate", (event)=>{
if (event.candidate) {
this.ws.send(JSON.stringify({
candidate: event.candidate
}));
}
});
if (this.isOfferer) {
this.dataChannel = this.peerConnection.createDataChannel("data");
this.setupDataChannel(this.dataChannel);
this.peerConnection.createOffer().then((offer)=>{
this.peerConnection.setLocalDescription(offer);
this.ws.send(JSON.stringify({
sdp: offer
}));
});
} else {
this.peerConnection.addEventListener("datachannel", (event)=>{
this.dataChannel = event.channel;
this.setupDataChannel(this.dataChannel);
});
}
this.peerConnection.addEventListener("connectionstatechange", ()=>{
if (this.peerConnection.connectionState === "connected") {} else if (this.peerConnection.connectionState === "closed") {
this.dispatchEvent(new Event("close"));
}
});
addEventListener("beforeunload", ()=>{
this.peerConnection.close();
this.ws.close();
});
}
setupDataChannel(channel) {
channel.addEventListener("open", ()=>{
this.dispatchEvent(new Event("connect"));
});
channel.addEventListener("message", (event)=>{
const message = JSON.parse(event.data);
console.log("recv", message);
if (message.data !== undefined && message.seq !== undefined) {
if (message.seq === this.seq2 + 1) {
this.seq2++;
this.dispatchEvent(new MessageEvent("message", {
data: message
}));
this.processPending();
} else if (message.seq > this.seq2 + 1) {
this.pending.push(message);
}
channel.send(JSON.stringify({
recv: message.seq
}));
} else if (message.recv !== undefined) {
console.log("Arrived message", message.recv);
const index = this.notarrived.indexOf(message.recv);
if (index !== -1) {
this.notarrived.splice(index, 1);
}
}
});
channel.addEventListener("close", ()=>{
this.dispatchEvent(new Event("close"));
});
}
processPending() {
if (this.pending.length === 0) return;
this.pending.sort((a, b)=>a.seq - b.seq);
while(this.pending.length > 0 && this.pending[0].seq === this.seq2 + 1){
const message = this.pending.shift();
this.seq2++;
this.dispatchEvent(new MessageEvent("message", message));
}
}
send(data) {
console.log("send", data);
if (!this.dataChannel || this.dataChannel.readyState !== "open") {
throw new Error("Data channel is not open");
}
const message = {
data,
seq: this.seq++
};
console.log("Sending message", message.seq);
this.dataChannel.send(JSON.stringify(message));
this.notarrived.push(message.seq);
setTimeout(()=>{
if (this.notarrived.includes(message.seq)) {
if (!this.dataChannel || this.dataChannel.readyState !== "open") {
throw new Error("Data channel is not open");
}
console.log("Resending message", message.seq);
this.dataChannel.send(JSON.stringify(message));
}
}, 200 * 2);
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
const Star = new PIXI.Sprite(pstar);
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
if (parent.game.me.ishit(this.x, this.y, psize + 6 * 7 / 2)) {
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
const Dapp = new PIXI.Application();
addEventListener("click", ()=>{
bgm.play();
}, {
once: true
});
(async ()=>{
await Dapp.init({
background: "#000000"
});
UI = await fetch("/ui.html").then((res)=>res.text());
ver = parseInt(await fetch("/ver").then((res)=>res.text()));
document.getElementById("ver").innerText = `ver.${new Date(ver).toLocaleTimeString()} (${ver})`;
document.getElementById("st").innerText = `${await fetch("/online").then((res)=>res.text())}オンライン ${await fetch("/rooms").then((res)=>res.json()).then((e)=>Object.keys(e).length)}にんがプレイちゅう`;
})();
setInterval(async ()=>{
const st = document.getElementById("st");
if (st) st.innerText = `${await fetch("/online").then((res)=>res.text())}オンライン ${await fetch("/rooms").then((res)=>res.json()).then((e)=>Object.keys(e).length)}にんがプレイちゅう`;
}, 3 * 1000);
async function checkVer() {
const res = await fetch("/ver");
const i = await res.text();
if (ver !== parseInt(i)) {
alert("バージョンが更新されました。再読み込みします");
location.reload();
}
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
document.getElementById("skill-select0").innerHTML += `<option value="${e}">${e} ${skill.name} [${skill.X ? "X" : skill.cost}] ${"P".repeat(skill.p)}</option>`;
});
document.getElementById("skill-select1").innerHTML = "";
Object.keys(skill_list).forEach((e)=>{
const skill = skill_list[parseInt(e)];
document.getElementById("skill-select1").innerHTML += `<option value="${e}">${e} ${skill.name} [${skill.X ? "X" : skill.cost}] ${"P".repeat(skill.p)}</option>`;
});
document.getElementById("skill-select2").innerHTML = "";
Object.keys(skill_list).forEach((e)=>{
const skill = skill_list[parseInt(e)];
document.getElementById("skill-select2").innerHTML += `<option value="${e}">${e} ${skill.name} [${skill.X ? "X" : skill.cost}] ${"P".repeat(skill.p)}</option>`;
});
document.getElementById("run").innerHTML = '<input style="margin:10px 0 10px 0;" class="input" id="id" placeholder="ルーム ID" type="text"><button type="button" onclick="run()" class="run">▶︎あそぶ</button>';
if (window.kakin) {
document.getElementById("run").innerHTML = '<input style="margin:10px 0 10px 0;" class="input" id="id" placeholder="ルーム ID" type="text"><input style="margin:10px 0 10px 0;" class="input" id="custom" placeholder="カスタムせいじん(<Skin1>+<Skin2>)" value="" type="text"><button type="button" onclick="preview()" style="margin:10px 0 10px 0;" class="run">カスタムせいじんのプレビュー</button><button type="button" onclick="run()" style="margin:10px 0 10px 0;" class="run">▶︎あそぶ</button>';
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
document.getElementById("skill-select0").innerHTML += `<option value="${e}">${skill.name} [${skill.X ? "X" : skill.cost}] ${"P".repeat(skill.p)}</option>`;
});
document.getElementById("skill-select1").innerHTML = "";
skills.skill2.forEach((e)=>{
const skill = skill_list[e];
document.getElementById("skill-select1").innerHTML += `<option value="${e}">${skill.name} [${skill.X ? "X" : skill.cost}] ${"P".repeat(skill.p)}</option>`;
});
document.getElementById("skill-select2").innerHTML = "";
skills.skill3.forEach((e)=>{
const skill = skill_list[e];
document.getElementById("skill-select2").innerHTML += `<option value="${e}">${skill.name} [${skill.X ? "X" : skill.cost}] ${"P".repeat(skill.p)}</option>`;
});
document.getElementById("run").innerHTML = '<input style="margin:10px 0 10px 0;" class="input" id="id" placeholder="ルーム ID" type="text"><button type="button" onclick="run()" class="run">▶︎あそぶ</button>';
if (window.kakin) {
document.getElementById("run").innerHTML = '<input style="margin:10px 0 10px 0;" class="input" id="id" placeholder="ルーム ID" type="text"><input style="margin:10px 0 10px 0;" class="input" id="custom" placeholder="カスタムせいじん(<Skin1>+<Skin2>)" value="" type="text"><button type="button" onclick="preview()" style="margin:10px 0 10px 0;" class="run">カスタムせいじんのプレビュー</button><button type="button" onclick="run()" style="margin:10px 0 10px 0;" class="run">▶︎あそぶ</button>';
}
document.getElementById("id").value = url.searchParams.get("code") || "";
}
function restart() {
checkVer();
bgm.src = bgm_home;
bgm.currentTime = 0;
bgm.play();
document.getElementById("base").innerHTML = `<h1 style="text-align: center;"><img style="width: 500px;" src="/img/shiny_logo.gif" alt="">
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
if (custom.length !== 2) return;
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
const base = document.getElementById("base");
base.innerHTML = UI;
app = new PIXI.Application();
await app.init({
background: "#000000",
resizeTo: document.getElementById("shoot")
});
debug = new Game(i, skill, code, custom);
}
function createP2PSocket(wsurl) {
const ws = new WebSocket(wsurl);
return new Promise((resolve)=>{
let isOfferer = false;
ws.addEventListener("message", (event)=>{
const message = JSON.parse(event.data);
if (typeof message.side === "number" && typeof message.box === "number") {
isOfferer = message.side === 0;
}
const p2pSocket = new P2PSocket(ws, isOfferer);
p2pSocket.addEventListener("connect", ()=>{
console.log("P2P connection established");
resolve([
p2pSocket,
message.box
]);
});
}, {
once: true
});
});
}
class Game {
start;
socket_side;
gs;
codeHash = 0;
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
this.gs = new GameSocket(this);
createP2PSocket(`${location.protocol.replace("http", "ws")}${location.host}/ws?${code}`).then(([ps, box])=>{
this.codeHash = box;
ps.addEventListener("close", ()=>{
if (this.start != 2) {
this.stop();
this.status("かいせんがせつだんされました");
setTimeout(()=>location.reload(), 1000);
}
});
this.gs.initWithP2P(ps, box);
});
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
structures: [],
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
structures: [],
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
this.status(`コード ${code.substring(1)} であいてをさがしています...`);
this.cost(this.me);
this.base = document.getElementById("base");
this.on_box = [];
this.on_p = [];
this.box_rules = [
[
[
1,
-1,
1.42,
0
],
[
2,
1,
2,
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
2,
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
1,
-1,
1.42,
0
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
20
],
[
3,
-1,
2,
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
12
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
1,
-1,
1.42,
0
],
[
2,
-1,
2,
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
1,
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
2,
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
-10
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
1,
-1,
1.42,
0
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
2,
-10
],
[
1,
1,
2,
20
],
[
2,
1,
2,
3
],
[
3,
1,
2,
-20
],
[
1,
-1,
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
1,
-1,
1.42,
0
],
[
2,
1,
2,
10
],
[
1,
1,
2,
-10
],
[
3,
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
2,
-20
],
[
2,
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
1.6,
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
2,
-1,
1.6,
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
1,
-1,
1,
-20
],
[
3,
-1,
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
2,
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
2,
-1,
1.6,
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
1,
-1,
1,
-20
],
[
3,
-1,
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
2,
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
2,
-1,
1.6,
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
1,
-1,
1,
-20
],
[
3,
-1,
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
3,
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
2,
-1,
1.6,
10
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
-1,
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
2,
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
3,
-1,
2,
-20
],
[
3,
1,
1.6,
-10
],
[
1,
-1,
1.5,
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
1.42,
-20
],
[
1,
1,
1.42,
10
],
[
1,
-1,
1.42,
10
],
[
2,
-1,
2,
20
],
[
3,
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
3,
-1,
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
1,
4,
20
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
1,
-1,
1.42,
0
],
[
2,
1,
2,
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
2,
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
]
];
this.load_box(0);
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
this.skillcount = {
0: 0,
1: 0,
2: 0
};
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
bgm.src = bgm_battle;
bgm.currentTime = 0;
bgm.play();
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
this.gs.set([
"cost",
"custom",
"i",
"skill_select"
]);
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
tapEventEmitter.on("move", (i)=>{
switch(i){
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
});
tapEventEmitter.on("skill", (i)=>this.skillBegin(this.me, i));
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
this.me.hit = (s, by)=>{
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
this.gs.set([
"cost"
]);
} else {
this.me.cost += 100;
this.gs.set([
"cost"
]);
}
} else if (s == 2) {
this.me.st.p += 1;
this.me.st.speed += 0.6;
p_skill(this.me);
}
};
}
skillBegin(star, n, on, extra = {}) {
if (star == this.me && star.canShot(n)) {
this.skillcount[n]++;
on = Date.now() + network_delay;
let cost = 0;
if (star.skill[n].X) {
cost = Math.floor(star.cost / 100);
star.cost -= cost * 100;
} else {
star.cost -= star.skill[n].cost * 100;
}
star.st.canShot[n] = 0;
setTimeout(()=>{
star.st.canShot[n] = 1;
}, 400);
setTimeout(()=>{
star.skills[on] = new Skill(star, RGB_ME, star.skill[n], on, this, {
...extra,
cost,
count: this.skillcount[n]
});
star.structures.forEach((e)=>e.onParentSkill(star.skills[on]));
}, 200);
if (this.start) {
this.gs.send({
skillBegin: {
target: n,
extra: {
...extra,
cost,
count: this.skillcount[n]
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
star.skills[on] = new Skill(star, RGB_ENEMY, star.skill[n], on, this, extra);
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
structSkillBegin(from, n, on, extra = {}) {
if (from.isme) {
from.skillcount++;
on = Date.now() + network_delay;
setTimeout(()=>{
from.parent.skills[on] = new Skill(from.parent, RGB_ME, skill_list[n], on, this, {
...extra,
count: from.skillcount
}, [
from.x,
from.y
]);
}, 200);
if (this.start) {
this.gs.send({
skillstruct: {
skillid: n,
extra: {
...extra,
count: from.skillcount
},
on,
id: from.id
},
set: {
cost: this.me.cost
}
});
}
} else if (from.parent === this.enemy && on) {
const late = on - Date.now() > 0 ? on - Date.now() : 0;
setTimeout(()=>{
from.parent.skills[on] = new Skill(from.parent, RGB_ENEMY, skill_list[n], on, this, extra, [
from.x,
from.y
]);
}, late);
}
}
setStruct(star, type, x, extra, id, on) {
if (star == this.me) {
x = star.st.position;
on = Date.now() + 200;
id = star.structures.length;
if (this.start) {
this.gs.send({
struct: {
type,
x,
id,
on,
extra
}
});
}
star.structures[id] = new Structure(structs[type], id, this.me, this.enemy, this, x);
} else if (on && x) {
const late = on - Date.now() > 0 ? on - Date.now() : 0;
setTimeout(()=>{
this.enemy.structures[id] = new Structure(structs[type], id, this.enemy, this.me, this, x);
}, late);
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
this.gs._socket.peerConnection.close();
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
const nid = setInterval(()=>0) + 1;
for(let i = 0; i < nid; i++)clearInterval(i);
bgm.pause();
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
tapEventEmitter.block = false;
tapEventEmitter.clear();
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
await PIXI.Assets.load(`/img/3b.png`),
await PIXI.Assets.load(`/img/4b.png`)
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
leobody: await PIXI.Assets.load(`/img2/leo1.png`)
};
bgm_battle = URL.createObjectURL(await (await fetch("./8bit_mission.m4a")).blob());
bgm_home = URL.createObjectURL(await (await fetch("./home.m4a")).blob());
bgm.src = bgm_home;
})();
class Shot {
index;
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
data;
sprite;
constructor(def, star, color, index, parent, at){
this.index = index;
this.parent = parent;
this.isme = false;
this.x = 0;
this.y = 0;
this.removed = false;
console.log(def, this);
if (star == parent.game.me) {
this.isme = true;
this.enemy = parent.game.enemy;
} else {
this.enemy = parent.game.me;
}
this.movefunc = def.func.bind(this);
this.color = color;
if (at) {
this.bx = at[0];
this.by = at[1] - 10;
} else {
this.bx = star.st.position;
this.by = star.st.y - 50;
}
if (!def.texture) {
this.graphics = new PIXI.Graphics();
} else {
this.sprite = new PIXI.Sprite(textureSet[def.texture]);
this.sprite.x = parse(this.x);
this.sprite.y = parse(this.y);
app.stage.addChild(this.sprite);
this.sprite.anchor.set(0.5);
this.sprite.width = parse(50);
this.sprite.height = parse(50);
if (this.isme) {
this.sprite.rotation = Math.PI;
}
}
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
if (this.enemy.ishit(x, y, 15 + s * 7 / 2)) this.enemy.hit(1, this);
if (star.ishit(x, y, 25 + s * 7 / 2) && this.t > 10 && this.parent.define.catchable) {
star.hit(1, this);
this.remove();
}
if (!this.isme) {
for (const element of parent.game.me.structures){
if (element.ishit(x, y, s * 7 / 2)) {
console.log("hit", x, y, s * 7 / 2);
element.onhit(this);
}
}
}
if (this.isme) {
for(let i = 0; i < parent.game.on_box.length; i++){
const e = parent.game.on_box[i];
if (e.ishit(x, y, 20 * boxsize + s * 7 / 2)) {
if (!def.drill) {
e.hit(star);
if (parent.game.start === 1) {
parent.game.gs.shotDel({
skillId: parent.id,
index
});
}
return this.remove();
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
if (x < 710 || x > -10 || y > -10 || y < 1010) {
if (this.graphics) {
this.graphics.clear();
if (def.obake && this.by - my > 1200 - parent.game.me.st.y) {
if (this.isme) {
this.graphics.beginFill(this.color, this.t < 20 ? 1 - this.t / 40 : 0.5);
} else {
this.graphics.beginFill(this.color, this.t < 20 ? 1 - this.t / 20 : 0.01);
}
} else {
this.graphics.beginFill(this.color);
}
if (def.drill) {
this.graphics.drawRect(parse(x - s * 7 / 2 * Math.abs(Math.sin(this.t / 5))), parse(y - s * 7 / 2), parse(s * 7 * Math.abs(Math.sin(this.t / 5))), parse(s * 7));
} else {
this.graphics.drawRect(parse(x - s * 7 / 2), parse(y - s * 7 / 2), parse(s * 7), parse(s * 7));
}
this.graphics.endFill();
if (this.removed) {
return;
}
app.stage.addChild(this.graphics);
} else if (this.sprite) {
this.sprite.width = parse(s * 7);
this.sprite.height = parse(s * 7);
this.sprite.x = parse(x);
this.sprite.y = parse(y);
}
}
if (x > 1400 || x < -700 || y < -1000 || y > 2000) {
this.remove();
}
this.x = x;
this.y = y;
this.t += shot_speed;
}, 25);
}
remove() {
clearInterval(this._id);
if (this.graphics) {
app.stage.removeChild(this.graphics);
}
if (this.sprite) {
app.stage.removeChild(this.sprite);
}
this.removed = true;
}
}













