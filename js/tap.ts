type RecordEvent = Record<string, (...args: any[]) => any>;

export class TypedEventEmitter<
    T extends RecordEvent,
    E extends keyof T = keyof T,
> {
    public listeners: Map<E, T[E][]> = new Map();

    public on<E2 extends E>(event: E2, ...listeners: T[E2][]): this {
        if (!this.listeners.has(event)) {
            this.listeners.set(event, []);
        }

        for (const listener of listeners) {
            this.listeners.get(event)?.push(listener);
        }

        return this;
    }

    public off<E2 extends E>(event: E2, ...listeners: T[E2][]): this {
        if (this.listeners.has(event)) {
            for (const listener of listeners) {
                if (!this.listeners.get(event)?.includes(listener)) continue;

                this.listeners
                    .get(event)
                    ?.splice(
                        this.listeners.get(event)?.indexOf(listener) ?? 0,
                        1,
                    );
            }
        }

        return this;
    }

    public emit<E2 extends E>(event: E2, ...args: Parameters<T[E2]>): this {
        if (this.listeners.has(event)) {
            this.listeners.get(event)?.forEach((listener) => listener(...args));
        }

        return this;
    }

}

export type TapEvent = {
    skill: (id: number) => void;
    move: (id: number) => void;
}

export class TapEventEmitter extends TypedEventEmitter<TapEvent> {
    touch?: [number, number, number];
    block: boolean = false;
    constructor() {
        super();
        addEventListener("touchend", (e) => {
            this.block && e.preventDefault();
            if (e.changedTouches[0].pageY > (window.innerHeight * 0.9)) {
                this.emit("skill", Math.floor(e.changedTouches[0].pageX / (window.innerWidth / 3)))
            }
        })
        addEventListener("touchstart", (e) => {
            this.block && e.preventDefault();
            this.touch = [e.changedTouches[0].pageX, e.changedTouches[0].pageX, e.changedTouches[0].identifier];
        })
        addEventListener("touchmove", (e) => {
            this.block && e.preventDefault();
            if (!this.touch) return
            for (let index = 0; index < e.changedTouches.length; index++) {
                const { identifier, pageX, pageY } = e.changedTouches[index];
                if (identifier === this.touch[2]) {
                    if (Math.abs(pageX - this.touch[0]) * 2 < Math.abs(pageY - this.touch[1])) {
                        this.emit("move", 2);
                    } else if ((pageX - this.touch[0])) {
                        this.emit("move", pageX > this.touch[0] ? 1 : 0);
                    }
                    this.touch = [pageX, pageY, identifier];
                    break;
                }

            }
        })
        addEventListener("contextmenu",e=>e.preventDefault())
    }
    public clear() {
        this.listeners.clear();
        this.touch = undefined;
    }
}

export const tapEventEmitter = new TapEventEmitter();