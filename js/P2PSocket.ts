declare class TypedEventTarget<EventMap extends Record<string, any>>
    extends EventTarget {
    addEventListener<Type extends keyof EventMap>(
        type: Type,
        listener: (this: this, evt: EventMap[Type]) => void,
        options?: boolean | AddEventListenerOptions
    ): void;
    addEventListener(
        ...args: Parameters<EventTarget["addEventListener"]>
    ): void;
    removeEventListener<Type extends keyof EventMap>(
        type: Type,
        listener: (this: this, evt: EventMap[Type]) => void,
        options?: boolean | EventListenerOptions
    ): void;
    removeEventListener(
        ...args: Parameters<EventTarget["removeEventListener"]>
    ): void;
}

import { network_delay } from "./game.ts";

export interface P2PSocketEventMap {
    connect: Event;
    message: MessageEvent<P2PMessageData>;
    close: Event;
}

export type P2PMessageData = {
    data: any;
    seq: number;
    recv?: undefined;
}
export type P2PMessageRecv = {
    recv: number;
    data?: undefined;
    seq?: undefined;
}
export type P2PMessage = P2PMessageData | P2PMessageRecv;

export class P2PSocket extends (EventTarget as typeof TypedEventTarget<P2PSocketEventMap>) {
    ws: WebSocket;
    isOfferer: boolean;
    peerConnection: RTCPeerConnection;
    dataChannel?: RTCDataChannel;
    seq: number = 0;
    seq2: number = -1;
    pending: P2PMessageData[] = [];
    notarrived: number[] = [];

    constructor(ws: WebSocket, isOfferer: boolean) {
        super();
        this.ws = ws;
        this.isOfferer = isOfferer;
        this.peerConnection = new RTCPeerConnection();
        this.setupWebSocket();
        this.setupPeerConnection();
    }

    private setupWebSocket() {
        this.ws.addEventListener("message", async (event) => {
            const message = JSON.parse(event.data);
            if (message.sdp) {
                await this.peerConnection.setRemoteDescription(message.sdp);
                if (message.sdp.type === "offer") {
                    const answer = await this.peerConnection.createAnswer();
                    await this.peerConnection.setLocalDescription(answer);
                    this.ws.send(JSON.stringify({ sdp: answer }));
                }
            } else if (message.candidate) {
                await this.peerConnection.addIceCandidate(message.candidate);
            }
        });
    }

    private setupPeerConnection() {
        this.peerConnection.addEventListener("icecandidate", (event) => {
            if (event.candidate) {
                this.ws.send(JSON.stringify({ candidate: event.candidate }));
            }
        });

        if (this.isOfferer) {
            this.dataChannel = this.peerConnection.createDataChannel("data");
            this.setupDataChannel(this.dataChannel);

            this.peerConnection.createOffer().then((offer) => {
                this.peerConnection.setLocalDescription(offer);
                this.ws.send(JSON.stringify({ sdp: offer }));
            });
        } else {
            this.peerConnection.addEventListener("datachannel", (event) => {
                this.dataChannel = event.channel;
                this.setupDataChannel(this.dataChannel);
            });
        }

        this.peerConnection.addEventListener("connectionstatechange", () => {
            if (this.peerConnection.connectionState === "connected") {
            } else if (this.peerConnection.connectionState === "closed") {
                this.dispatchEvent(new Event("close"));
            }
        });
        addEventListener("beforeunload",()=>{
            this.peerConnection.close();
            this.ws.close();
        })
    }

    private setupDataChannel(channel: RTCDataChannel) {
        channel.addEventListener("open", () => {
            this.dispatchEvent(new Event("connect"));
        });
        channel.addEventListener("message", (event) => {
            const message = JSON.parse(event.data) as P2PMessage;
            console.log("recv", message);
            if (message.data !== undefined && message.seq !== undefined) {
                if (message.seq === this.seq2 + 1) {
                    this.seq2++;
                    this.dispatchEvent(new MessageEvent("message", { data: message }));
                    this.processPending();
                } else if (message.seq > this.seq2 + 1) {
                    this.pending.push(message);
                }
                channel.send(JSON.stringify({ recv: message.seq }));
            } else if (message.recv !== undefined) {
                console.log("Arrived message", message.recv);
                const index = this.notarrived.indexOf(message.recv);
                if (index !== -1) {
                    this.notarrived.splice(index, 1);
                }
            }
        });

        channel.addEventListener("close", () => {
            this.dispatchEvent(new Event("close"));
        });
    }

    private processPending() {
        if (this.pending.length === 0) return;
        this.pending.sort((a, b) => a.seq - b.seq);
        while (this.pending.length > 0 && this.pending[0].seq === this.seq2 + 1) {
            const message = this.pending.shift()!;
            this.seq2++;
            this.dispatchEvent(new MessageEvent("message", message));
        }
    }

    send(data: any) {
        console.log("send", data);
        if (!this.dataChannel || this.dataChannel.readyState !== "open") {
            throw new Error("Data channel is not open");
        }
        const message = { data, seq: this.seq++ };
        console.log("Sending message", message.seq);
        this.dataChannel.send(JSON.stringify(message));
        this.notarrived.push(message.seq);
        setTimeout(() => {
            if (this.notarrived.includes(message.seq)) {
                if (!this.dataChannel || this.dataChannel.readyState !== "open") {
                    throw new Error("Data channel is not open");
                }
                console.log("Resending message", message.seq);
                this.dataChannel.send(JSON.stringify(message));
            }
        }, network_delay*2);
    }
}

export function createP2PSocket(wsurl: string): Promise<[P2PSocket, number]> {
    const ws = new WebSocket(wsurl);
    return new Promise<[P2PSocket, number]>((resolve) => {
        let isOfferer = false;
        ws.addEventListener("message", (event) => {
            const message = JSON.parse(event.data);
            if (typeof message.side === "number" && typeof message.box === "number") {
                isOfferer = message.side === 0;
            }
            const p2pSocket = new P2PSocket(ws, isOfferer);
            p2pSocket.addEventListener("connect", () => {
                console.log("P2P connection established");
                resolve([p2pSocket, message.box]);
            });
        }, { once: true });
    });
}