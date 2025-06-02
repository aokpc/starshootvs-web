import { PIXI } from "./pixi.ts";
import { Box } from "./Box.ts";
import { textureSet, parse, app, boxsize, shot_speed } from "./game.ts";
import type { Star, MoveFunc, ShotDef, SkillDef } from "./types.ts";

import { Game } from "./game.ts";


export class Skill {
  id: number;
  shots: Shot[];
  constructor(
    star: Star,
    color: number,
    public define: SkillDef,
    on: number,
    public game: Game,
    public extra: Record<string, number> = {},
    at?: [number, number],
  ) {
    this.id = on;
    this.shots = Array(define.shots.length);
    define.shots.forEach((e, i) => {
      setTimeout(() => {
        const a = new Shot(e, star, color, i, this, at);
        this.shots[i] = a;
      }, e.delay);
    });
  }
  remove() {
    this.shots.forEach((e) => {
      e.remove();
    });
  }
}

export class Shot {
  isme: boolean = false;
  enemy: Star;
  movefunc: MoveFunc;
  color: number;
  bx: number;
  by: number;
  graphics?: PIXI.Graphics;
  t: number;
  undrils: Box[];
  star: Star;
  _id: number;
  x: number = 0;
  y: number = 0;
  removed: boolean = false;
  data: any;
  sprite?: PIXI.Sprite;
  constructor(
    def: ShotDef,
    star: Star,
    color: number,
    public index: number,
    public parent: Skill,
    at?: [number, number],
  ) {
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
    this._id = setInterval(() => {
      if (parent.game.delete_box) {
        return this.remove();
      }
      let x, y = 0;
      const [mx, my, s] = this.movefunc(this.t, this.parent.extra as any);
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
        // structure...
        for (const element of parent.game.me.structures) {
          if (element.ishit(x, y, s * 7 / 2)) {
            console.log("hit", x, y, s * 7 / 2);
            element.onhit(this);
          }
        }
      }
      if (this.isme) {
        // box...
        for (let i = 0; i < parent.game.on_box.length; i++) {
          const e = parent.game.on_box[i];
          if (e.ishit(x, y, 20 * boxsize + s * 7 / 2)) {
            if (!def.drill) {
              e.hit(star);
              if (parent.game.start === 1) {
                parent.game.gs.shotDel({
                  skillId: parent.id,
                  index,
                });
              }
              return this.remove();
            } else if (!(this.undrils.includes(e))) {
              e.hit(star);
              const n = this.undrils.length;
              this.undrils[n] = e;
              setTimeout(() => {
                delete this.undrils[n];
              }, 1000);
            }
          }
        }
        // 
      }
      if (x < 710 || x > -10 || y > -10 || y < 1010) {
        if (this.graphics) {
          this.graphics.clear();
          if (def.obake && (this.by - my) > (1200 - parent.game.me.st.y)) {
            if (this.isme) {
              this.graphics.beginFill(
                this.color,
                (this.t) < 20
                  ? 1 - (this.t / 40)
                  : 0.5
              );
            } else {
              this.graphics.beginFill(
                this.color,
                (this.t) < 20 ? 1 - (this.t / 20) : 0.01
              );
            }
          } else {
            this.graphics.beginFill(
              this.color
            );
          }
          if (def.drill) {
            this.graphics.drawRect(
              parse(x - s * 7 / 2 * (Math.abs(Math.sin(this.t / 5)))),
              parse(y - s * 7 / 2),
              parse(s * 7 * (Math.abs(Math.sin(this.t / 5)))), //6 回転
              parse(s * 7)
            );
          } else {
            this.graphics.drawRect(
              parse(x - s * 7 / 2),
              parse(y - s * 7 / 2),
              parse(s * 7),
              parse(s * 7)
            );
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
