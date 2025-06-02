import type { Shot, Skill } from "./Shot.ts";
import type { PIXI } from "./pixi.ts";
import type { Structure } from "./structure.ts";

export type boxRule = [number, number, number, number][][];

export interface GameEvent {
    on: number;
    start?: number;
    set?: Partial<Star>;
    st?: Partial<St>;
    skillBegin?: SkillBegin;
    shotDel?: ShotDel;
    boxHit?: BoxHit;
    lose?: true;
    struct?: SetStruct;
    rmstruct?: RmStruct;
    hitstruct?: HitStruct;
    skillstruct?: SkillStruct;
}
export type BoxHit = {
    id: number;
    type: 0;
    value: number;
} | {
    id: number;
    type: 1;
};
export interface SkillBegin {
    on: number;
    target: number;
    extra?: Record<string, number> & { cost: number; count: number };
}

export interface ShotDel {
    skillId: number;
    index: number;
}

export type MoveFunc = (
    this: Shot,
    t: number,
    extra?: Record<string, number> & { cost: number; count: number },
) => [number, number, number];

export interface ShotDef {
    delay?: number;
    drill?: boolean;
    obake?: boolean;
    texture?: keyof TextureSet;
    func: MoveFunc;
}

export interface TextureSet {
    P: PIXI.Texture;
    BOX: PIXI.Texture;
    Star: PIXI.Texture;
    Fe: PIXI.Texture;
    Bomb: PIXI.Texture;
    kayaku: PIXI.Texture;
    Monomane: PIXI.Texture;
    henka1: PIXI.Texture;
    henka2: PIXI.Texture;
    henka3: PIXI.Texture;
    henka4: PIXI.Texture;
    henka5: PIXI.Texture;
    henka6: PIXI.Texture;
    kakasi: PIXI.Texture;
    senaka: PIXI.Texture;
    capy: PIXI.Texture;
    huryo: PIXI.Texture;
    bomb2: PIXI.Texture;
    scape: PIXI.Texture;
    dark: PIXI.Texture;
    egg1: PIXI.Texture;
    egg2: PIXI.Texture;
    ghbomb: PIXI.Texture;
    rabboy: PIXI.Texture;
    ghoboy: PIXI.Texture;
    molboy: PIXI.Texture;
    whabody: PIXI.Texture;
    slubody: PIXI.Texture;
    leobody: PIXI.Texture;
}

export interface SkillDef {
    name: string;
    cost: number;
    X?: true;
    catchable?: true;
    p: number;
    shots: ShotDef[];
}

export interface CharaDef {
    name: string;
    desc: string;
    skill1: number[];
    skill2: number[];
    skill3: number[];
}

export interface StructureDef {
    name: string;
    texture: keyof TextureSet;
    bomb?: boolean;
    extra?: Record<string, number>;
    onhit?: (this: Structure, by: Shot) => void | true;
    onparentskill?: (this: Structure, skill: Skill) => void;
    interval?: {
        ms: number;
        handler: (this: Structure, t: number) => void;
    };
    chien0?: boolean;
}

export interface SetStruct {
    on: number;
    id: number;
    type: number;
    x: number;
    extra?: Record<string, number>;
}

export interface RmStruct {
    id: number;
}

export interface HitStruct {
    id: number;
}

export interface SkillStruct {
    id: number;
    skillid: number;
    on: number;
    extra?: Record<string, number>;
}

export interface St {
    position: number;
    y: number;
    d: number;
    speed: number;
    cost_speed: number;
    alive: true;
    canShot: [number, number, number];
    p: number;
}
export interface Star {
    w: number;
    h: number;
    cost_gage: HTMLElement;
    cost_txt: HTMLElement;
    cost: number;
    hit: (type: 1 | 2, by?: Shot) => void;
    ishit: (x: number, y: number, range: number) => boolean;
    st: St;
    skill_gage: [HTMLElement, HTMLElement, HTMLElement];
    skill_gage_cost: [HTMLElement, HTMLElement, HTMLElement];
    skill: SkillDef[];
    skill_select: number[];
    structures: Structure[];
    custom: string[];
    canShot: (type: number) => boolean;
    skills: Record<number, Skill>;
    _cost?: number;
    star?: PIXI.Sprite;
    _anime?: number;
    _move?: number;
    textures?: PIXI.Texture<PIXI.TextureSource<any>>[];
    i: number;
}
