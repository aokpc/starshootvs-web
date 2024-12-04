import type { Skill, Shot } from "./game.ts";
import type * as PIXI from "npm:pixi.js"

export type boxRule = [number, number, number, number][][]

export interface GameEvent {
    on: number
    start?: {
        side: 0 | 1
        box: number
    }
    set?: Partial<Star>
    st?: Partial<St>
    skillBegin?: SkillBegin
    shotDel?: ShotDel
    boxHit?: BoxHit
    lose?: true
}
export type BoxHit = {
    id: number
    type: 0
    value: number
} | {
    id: number
    type: 1
}
export interface SkillBegin {
    on: number
    target: number
    extra?: Record<string, number> & { cost: number, count: number }
}

export interface ShotDel {
    skillId: number
    index: number
}

export type MoveFunc = (this: Shot, t: number, extra?: Record<string, number> & { cost: number, count: number }) => [number, number, number]

export interface ShotDef {
    delay?: number
    drill?: boolean
    obake?: boolean
    func: MoveFunc
}

export interface SkillDef {
    name: string,
    cost: number,
    x?: true
    p: number,
    shots: ShotDef[],
}

export interface CharaDef {
    name: string
    desc: string
    skill1: number[]
    skill2: number[]
    skill3: number[]
}

export interface St {
    position: number,
    y: number,
    d: number,
    speed: number,
    cost_speed: number
    alive: true,
    canShot: [number, number, number],
    p: number,
}
export interface Star {
    w: number
    h: number
    cost_gage: HTMLElement
    cost_txt: HTMLElement
    cost: number
    hit: (type: number) => void
    ishit: (x: number, y: number, range: number) => boolean
    st: St
    skill_gage: [HTMLElement, HTMLElement, HTMLElement]
    skill_gage_cost: [HTMLElement, HTMLElement, HTMLElement]
    skill: SkillDef[],
    skill_select: number[]
    custom: string[],
    canShot: (type: number) => boolean
    skills: Record<number, Skill>,
    _cost?: number
    star?: PIXI.Sprite
    _anime?: number
    _move?: number
    textures?: PIXI.Texture<PIXI.TextureSource<any>>[]
    i: number,
}