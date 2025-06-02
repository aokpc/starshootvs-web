import { Shot } from "./Shot.ts";
import { skill_list } from "./skill.ts";
import type { StructureDef } from "./types.ts";

export const structs: StructureDef[] = [
    { //0
        name: "プチヒトデ",
        texture: "Star",
        bomb: true,
        interval: {
            ms: 2000,
            handler: function (t: number) {
                this.skill(18);
                this.skill(19);
            },
        },
        onhit: function (by: Shot) {
            skill_list.indexOf(by.parent.define);
            this.skill(20);
            this.skill(skill_list.indexOf(by.parent.define));
        },
    },
    { //1
        name: "てっぺき",
        texture: "Fe",
        interval: {
            ms: 4500,
            handler: function (t: number) {
                this.skill(57);
            },
        },
        onhit: function (by: Shot) {
            this.skill(86);
        },
    },
    { //2
        name: "かやく",
        texture: "kayaku",
        bomb: true,
        onhit: function (by: Shot) {
            this.skill(228);
        },
        onparentskill: function (skill) {
            if (skill_list.indexOf(skill.define) === 80) {
                this.skill(228);
                this.remove();
            }
        },
    },
    { //3
        name: "ドリル",
        texture: "Bomb",
        bomb: true,
        onhit: function (by: Shot) {
            this.skill(229);
        },
    },
    { //4
        name: "モノマネ",
        texture: "Monomane",
        bomb: true,
        onhit: function (by: Shot) {
            skill_list.indexOf(by.parent.define);
            this.skill(skill_list.indexOf(by.parent.define));
        },
    },
    { //5
        name: "オバケ",
        texture: "ghbomb",
        bomb: true,
        onhit: function (by: Shot) {
            this.skill(230);
        },
    },
    { //6
        name: "あわ",
        texture: "Bomb",
        bomb: true,
        onhit: function (by: Shot) {
            this.skill(231);
        },
    },
    { //7
        name: "だましp",
        texture: "Bomb",
        bomb: true,
        onhit: function (by: Shot) {
            this.skill(225);
        },
    },
    { //8
        name: "へんか1",
        texture: "henka1",
        bomb: true,
        onhit: function (by: Shot) {
            this.skill(232);
        },
        onparentskill: function (skill) {
            if (skill_list.indexOf(skill.define) === 80) {
                this.skill(232);
                this.remove();
            }
        },
    },
    { //9
        name: "へんか2",
        texture: "henka2",
        interval: {
            ms: 4500,
            handler: function (t: number) {
                this.skill(233);
            },
        },
    },
    { //10
        name: "へんか3",
        texture: "henka3",
        bomb: true,
        onhit: function (by: Shot) {
            this.skill(234);
        },
        onparentskill: function (skill) {
            if (skill_list.indexOf(skill.define) === 80) {
                this.skill(234);
                this.remove();
            }
        },
    },
    { //11
        name: "へんか4",
        texture: "henka4",
        chien0: true,
        interval: {
            ms: 4500,
            handler: function (t: number) {
                this.skill(235);
            },
        },
    },
    { //12
        name: "へんか5",
        texture: "henka5",
        bomb: true,
        onhit: function (by: Shot) {
            this.skill(236);
        },
        onparentskill: function (skill) {
            if (skill_list.indexOf(skill.define) === 80) {
                this.skill(236);
                this.remove();
            }
        },
    },
    { //13
        name: "へんか6",
        texture: "henka6",
        interval: {
            ms: 550,
            handler: function (t: number) {
                this.skill(237);
            },
        },
    },
    { //14
        name: "ライオンボム",
        texture: "bomb2",
        bomb: true,
        onhit: function (by: Shot) {
            this.skill(243);
        },
    },
    { //15
        name: "カカシ",
        texture: "kakasi",
        interval: {
            ms: 1800,
            handler: function (t: number) {
                this.skill(238);
            },
        },
    },
    { //16
        name: "背中",
        texture: "senaka",
        bomb: true,
        interval: {
            ms: 100,
            handler: function (t: number) {
                this.x += 1;
            },
        },
        onhit: function (by: Shot) {
            this.skill(239);
        },
        onparentskill: function (skill) {
            if (skill_list.indexOf(skill.define) === 80) {
                this.skill(239);
                this.remove();
            }
        },
    },
    { //17
        name: "子カピ",
        texture: "capy",
        interval: {
            ms: 2800,
            handler: function (t: number) {
                this.skill(240);
            },
        },
    },
    { //18
        name: "不良",
        texture: "capy",
        chien0: true,
        interval: {
            ms: 2400,
            handler: function (t: number) {
                this.skill(241);
            },
        },
    },
    { //19
        name: "クジラボム",
        texture: "bomb2",
        bomb: true,
        onhit: function (by: Shot) {
            this.skill(242);
        },
    },
    { //20
        name: "スケープゴート",
        texture: "scape",
        chien0: true,
        onparentskill: function (skill) {
            if (
                skill_list.indexOf(skill.define) === 75 ||
                skill_list.indexOf(skill.define) === 186 ||
                skill_list.indexOf(skill.define) === 218
            ) {
                this.skill(244);
            }
        },
    },
    { //21
        name: "デルタゴート",
        texture: "scape",
        chien0: true,
        onparentskill: function (skill) {
            if (
                skill_list.indexOf(skill.define) === 75 ||
                skill_list.indexOf(skill.define) === 186 ||
                skill_list.indexOf(skill.define) === 218
            ) {
                this.skill(245);
            }
        },
    },
    { //22
        name: "カーブゴート",
        texture: "scape",
        chien0: true,
        onparentskill: function (skill) {
            if (
                skill_list.indexOf(skill.define) === 75 ||
                skill_list.indexOf(skill.define) === 186 ||
                skill_list.indexOf(skill.define) === 218
            ) {
                this.skill(246);
            }
        },
    },
    { //23
        name: "産卵",
        texture: "egg1",
        onhit: function (by: Shot) {
            if (this.isme) {
                setTimeout(
                    () =>
                        this.game.setStruct(this.game.me, 24, undefined, {
                            x: this.x,
                        }),
                    800,
                );
            }
        },
    },
    { //24
        name: "孵化",
        texture: "egg2",
        chien0: true,
        interval: {
            ms: 2800,
            handler: function (t: number) {
                this.x = this.extra!.x;
                this.skill(247);
            },
        },
    },
    { //25
        name: "たまごボム",
        texture: "egg1",
        onhit: function (by: Shot) {
            this.skill(248);
            },
    },
    { //26
        name: "ウサギボーイ",
        texture: "rabboy",
        chien0: true,
        interval: {
            ms: 5000,
            handler: function (t: number) {
                this.skill(254);
            },
        },
    },
    { //27
        name: "オバケボーイ",
        texture: "ghoboy",
        chien0: true,
        interval: {
            ms: 5000,
            handler: function (t: number) {
                this.skill(249);
            },
        },
    },
    { //28
        name: "モグラボーイ",
        texture: "molboy",
        chien0: true,
        interval: {
            ms: 5000,
            handler: function (t: number) {
                this.skill(250);
            },
        },
    },
    { //29
        name: "クジラボディ",
        texture: "whabody",
        chien0: true,
        interval: {
            ms: 3600,
            handler: function (t: number) {
                this.skill(251);
            },
        },
    },
    { //30
        name: "ナメボディ",
        texture: "slubody",
        chien0: true,
        interval: {
            ms: 3600,
            handler: function (t: number) {
                this.skill(252);
            },
        },
    },
    { //31
        name: "シシボディ",
        texture: "leobody",
        chien0: true,
        interval: {
            ms: 3600,
            handler: function (t: number) {
                this.skill(253);
            },
        },
    },
    { //32
        name: "ダークゴート",
        texture: "dark",
        chien0: true,
        onparentskill: function (skill) {
            if (
                skill_list.indexOf(skill.define) === 75 ||
                skill_list.indexOf(skill.define) === 186 ||
                skill_list.indexOf(skill.define) === 218
            ) {
                this.skill(255);
            }
        },
    },
    { //33
        name: "ゴートボム",
        texture: "scape",
        onhit: function (by: Shot) {
            this.skill(256);
        },
        onparentskill: function (skill) {
            if (
                skill_list.indexOf(skill.define) === 75 ||
                skill_list.indexOf(skill.define) === 186 ||
                skill_list.indexOf(skill.define) === 218
            ) {
                this.skill(256);
                this.remove();
            }
        },
    },
    
];
