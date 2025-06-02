import { Game } from "./game.ts";
import { p_skill, load_skill } from "./skill.ts";
import type { GameEvent, St, Star, SkillBegin, ShotDel, BoxHit } from "./types.ts";
import { P2PSocket } from "./P2PSocket.ts";

export class GameSocket {
  public socket?: P2PSocket
  constructor(public game: Game) {
  }

  initWithP2P(socket: P2PSocket, box: number) {
    console.log("listening start");
    socket.addEventListener("message", (e) => {
      this.event(e.data.data);
    });
    this.socket = socket;
    this.game.socket_side = socket.isOfferer ? 1 : 0;
    this.game.codeHash = box;
    this.game.delete_box = true;
    if (socket.isOfferer) {
      setTimeout(() => {
        const start = Date.now() + 1000;
        this.send({ start })
        setTimeout(() => {
          this.game.init();
        }, start - Date.now())
      }, 1000);
    }
  }
  get _socket() {
    if (!this.socket) {
      throw new Error("Socket not initialized");
    }
    return this.socket;
  }
  send(data: Omit<GameEvent, "on">) {
    this._socket.send(({ ...data, on: Date.now() }));
  }
  st(k: (keyof St)[]) {
    const data: Partial<St> = {};
    for (const key of k) {
      data[key] = this.game.me.st[key] as any;
    }
    this.send({ st: data });
  }
  set(k: (keyof Star)[]) {
    const data: Partial<Star> = {};
    for (const key of k) {
      data[key] = this.game.me[key] as any;
    }
    this.send({ set: data });
  }
  skillBegin(skillBegin: SkillBegin) {
    this.send({ skillBegin });
  }
  shotDel(shotDel: ShotDel) {
    this.send({ shotDel });
  }
  lose() {
    this.send({ lose: true });
  }
  boxHit(boxHit: BoxHit) {
    this.send({ boxHit });
  }
  event(e: GameEvent) {
    console.log("event", e);
    const late = Date.now() - (e.on || 0);
    if (e.start) {
      setTimeout(() => {
        this.game.init();
      }, e.start - Date.now())
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
        this.game.enemy.st.position = e.st.position +
          this.game.enemy.st.d *
          this.game.enemy.st.speed / 100 * late;
      }
      if (typeof e.st.p !== "undefined") {
        this.game.enemy.st.p = e.st.p;
        p_skill(this.game.enemy);
      }
    }
    if (e.skillBegin) {
      this.game.skillBegin(
        this.game.enemy,
        e.skillBegin.target,
        e.skillBegin.on,
        e.skillBegin.extra
      );
    }
    if (e.lose) {
      this.game.enemy.star!.rotation = Math.PI / 2;
      this.game.status("WIN!");
      this.game.stop();
      clearInterval(this.game.enemy._anime);
    }
    if (typeof e.set !== "undefined") {
      if (typeof e.set.cost !== "undefined") {
        this.game.enemy.cost = e.set.cost +
          this.game.enemy.st.cost_speed * late / 10;
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
      this.game.enemy.skills[e.shotDel.skillId].shots[e.shotDel.index]
        .remove();
    }
    if (e.struct) {
      this.game.setStruct(this.game.enemy, e.struct.type, e.struct.x, e.struct.extra || {}, e.struct.id, e.struct.on)
    }
    if (e.rmstruct) {
      this.game.enemy.structures[e.rmstruct.id].remove();
    }
    if (e.skillstruct) {
      this.game.structSkillBegin(this.game.enemy.structures[e.skillstruct.id], e.skillstruct.skillid, e.skillstruct.on, e.skillstruct.extra)
    }
  }
}
