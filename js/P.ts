import { PIXI } from "./pixi.ts";
import { pstar, parse, app, p_speed, psize } from "./game.ts";
import { Box } from "./Box.ts";

export class P {
  star: PIXI.Sprite;
  _id: number;
  removed: number = 0;
  constructor(
    public x: number,
    public y: number,
    public d: number,
    public parent: Box
  ) {
    // Load the Star texture.
    const texture = pstar;
    // Create a new Sprite from an image path.
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
    // Add an animation loop callback to the application's ticker.
    this._id = setInterval(() => {
      Star.width = parse(50);
      Star.height = parse(50);
      Star.x = parse(this.x);
      Star.y = parse(this.y);
      this.y += d * p_speed;
      if (this.x > 700 || this.x < -10 || this.y < -10 ||
        this.y > 1000) {
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
