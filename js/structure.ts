import { Game, RGB_ENEMY, RGB_ME } from "./game.ts";
import { Star, StructureDef } from "./types.ts";
import { PIXI } from "./pixi.ts";
import { app, parse, textureSet } from "./game.ts";
import { Shot, Skill } from "./Shot.ts";

export class Structure {
    sprite: PIXI.Sprite;
    _render: number;
    _interval?: number;
    isme: boolean;
    skillcount: number = 0;
    alive: boolean = true;
    y = 0;
    constructor(
        public define: StructureDef,
        public id: number,
        public parent: Star,
        public enemy: Star,
        public game: Game,
        public x: number,
        public extra?: Record<string,number>,
    ) {
        console.log("Structure", ...arguments);
        textureSet[define.texture].baseTexture.scaleMode =
            PIXI.SCALE_MODES.NEAREST;
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
        this.sprite.x = parse(this.isme ? (this.x) : (700 - this.x));
        this.sprite.y = parse(this.isme ? this.y : (1000 - this.y));
        this.sprite.width = parse(40);
        this.sprite.height = parse(40);
        this.sprite.anchor.set(0.5);
        this._render = setInterval(() => {
            if (game.delete_box) {
                this.remove();
            }
            this.y = this.parent.st.y - 70;
            this.sprite.x = parse(this.isme ? (this.x) : (700 - this.x));
            this.sprite.y = parse(this.isme ? this.y : (1000 - this.y));
            this.sprite.width = parse(40);
            this.sprite.height = parse(40);
        }, 100);
        if (define.interval) {
            let t = 0;
            define.chien0 && define.interval!.handler.call(this, t++);
            this._interval = setInterval(() => {
                define.interval!.handler.call(this, t);
                t++;
            }, define.interval.ms);
        }
    }
    skill(s: number, extra?: Record<string, number>) {
        this.game.structSkillBegin(this, s, undefined, extra);
    }
    onhit(by: Shot) {
        if (!this.alive) {
            return;
        }
        if (this.define.onhit) {
            this.define.onhit.call(this, by);
        }
        by.enemy === this.game.me && this.remove();
    }

    onParentSkill(skill: Skill) {
        if (!this.alive) {
            return;
        }
        if (this.define.onparentskill) {
            this.define.onparentskill.call(this, skill);
        }
    }

    ishit(x: number, y: number, r: number) {
        r += 12;
        return ((x <= (this.x) && x > (this.x - r)) ||
            (x > (this.x) && x < (this.x + r))) &&
            ((y < (this.y) && y > (this.y - r)) ||
                (y > (this.y) && y < (this.y + r)));
    }
    remove() {
        if (this._render) {
            clearInterval(this._render);
        }
        if (this._interval) {
            clearInterval(this._interval);
        }
        let y = this.isme ? this.y : (1000 - this.y);
        let x = this.isme ? (this.x) : (700 - this.x);
        this.alive = false;
        if (!this.define.bomb) {
            this.sprite.rotation = Math.PI / 2;
            this._render = setInterval(() => {
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
            setTimeout(() => {
                app.stage.removeChild(this.sprite);
                this.sprite.destroy();
            }, 250);
        }
        if (this.isme && this.game.start === 1) {
            this.game.gs.send({ rmstruct: { id: this.id } });
        }
    }
}
