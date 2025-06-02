import { PIXI } from "./pixi.ts";
import { Game, pbox, parse, app, boxsize, box_speeds } from "./game.ts";
import { P } from "./P.ts";
import type { Star, BoxHit } from "./types.ts";


export class Box {
  allive: boolean;
  star: PIXI.Sprite;
  x: number;
  _id: number;
  child_P?: P;
  i: number = 0;
  constructor(
    public v: number,
    public d: number,
    public y: number,
    public game: Game
  ) {
    // Load the Star texture.
    const texture = pbox[v - 1];
    texture.baseTexture.scaleMode = PIXI.SCALE_MODES.NEAREST;
    this.v = v;
    this.allive = true;
    // Create a new Sprite from an image path.
    const star = new PIXI.Sprite(texture);
    this.star = star;
    // Add to stage.
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
    // Add an animation loop callback to the application's ticker.
    this._id = setInterval(() => {
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
  ishit(x: number, y: number, r: number) {
    return ((x <= (this.x) && x > (this.x - r)) ||
      (x > (this.x) && x < (this.x + r))) &&
      ((y < (this.y) && y > (this.y - r)) ||
        (y > (this.y) && y < (this.y + r)));
  }
  hit(star: Star, v = this.v, dropP = false, on?: number) {
    this.v = v;
    if (star == this.game.me) {
      this.game.on_box.forEach((e, i) => {
        if (e == this) {
          this.i = i;
        }
      });
      const value = this.v;
      if (this.game.start === 1) {
        this.game.gs.boxHit({ type: 0, value, id: this.i });
      }
    }
    if (this.v == 1) {
      if (star == this.game.me && this.allive) {
        this.child_P = new P(this.x, this.y, 1, this);
        this.remove();
        this.game.on_p.push(this.child_P);
      } else if (dropP && this.allive) {
        this.allive = false;
        this.child_P = new P(
          this.x,
          this.y + (1.3 * ((Date.now() - on!) / 25)),
          -1,
          this
        );
        this.remove();
        this.game.on_p.push(this.child_P);
      }
    } else if ((star == this.game.me || dropP)) {
      this.v -= 1;
      this.star.texture = pbox[this.v - 1];
      this.y += 5;
      setTimeout(() => {
        this.y -= 5;
      }, 250);
    }
  }
  event(data: BoxHit, on?: number) {
    if (data.type == 0) this.hit(this.game.enemy, data.value, true, on);
    if (data.type == 1 && this.child_P!.d == -1) {
      this.child_P!.remove();
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
      this.game.gs.boxHit({ type: 1, id: this.i });
    }
  }
}
