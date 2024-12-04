import { bundle } from "https://deno.land/x/emit/mod.ts";

type ModeSocket = {
  socket: WebSocket
  g_mode: number
}
type GameSocket = {
  0?: ModeSocket
  1?: ModeSocket
  status: string
}

let ver = Date.now()
const PATH = "/Users/211601aok/Desktop/vsc/st/";
const WS_pair: Record<string, GameSocket> = {};

export async function handler(request: Request) {
  const url = new URL(request.url);

  switch (url.pathname.split("/")[1]) {
    case "":
      return new Response(await Deno.readTextFile(PATH + "res/index.html"), {
        headers: { "content-type": "text/html" },
      });
    case "premium":
      return new Response(
        (await Deno.readTextFile(PATH + "res/index.html")).replace(
          "<script>",
          "<script>window.kakin=1;",
        ),
        { headers: { "content-type": "text/html" } },
      );
    case "dev":
      if (request.headers.get("host") !== "localhost:4301") {
        break
      }
      return new Response(
        (await Deno.readTextFile(PATH + "res/dev.html")),
        { headers: { "content-type": "text/html" } },
      );
    case "devtool":
      if (request.headers.get("host") !== "localhost:4301") {
        break
      }
      return new Response(
        (await Deno.readTextFile(PATH + "res/devtool.html")),
        { headers: { "content-type": "text/html" } },
      );
    case "ws":
      return ws(request, url);
    case "tsc":
      if (request.headers.get("host") !== "localhost:4301") {
        break
      }
      return tsc()
    case "ver":
      return new Response(ver + "")
    // deno-lint-ignore no-case-declarations
    case "rooms":
      const a: Record<string, string> = {};
      for (const k in WS_pair) {
        const e = WS_pair[k];
        a[k] = e.status;
      }
      return new Response(JSON.stringify(a), {
        headers: { "content-type": "application/json" },
      });
    default:
      break;
  }
  try {
    let mimeType = "text/html";
    let cache = {}
    switch (url.pathname.split(".")[url.pathname.split(".").length - 1]) {
      case "html":
        mimeType = "text/html";
        break;
      case "js":
        mimeType = "application/javascript";
        break;
      case "svg":
        mimeType = "image/svg+xml";
        break;
      case "png":
        cache = { "Cache-Control": "max-age=604800" }
        mimeType = "image/png";
        break;
      case "gif":
        cache = { "Cache-Control": "max-age=604800" }
        mimeType = "image/gif";
        break;
      case "css":
        mimeType = "text/css";
        break;
      default:
        break;
    }
    return new Response((await Deno.readFile(PATH + "res" + url.pathname)), {
      headers: { "content-type": mimeType, ...cache },
    });
  } catch (_e) {
    _e
  }
  return new Response("⭐︎Not Found⭐︎", {
    headers: { "content-type": "text/html;charset=utf-8;", "deno-status": "error" },
    status: 404
  });
}

function ws(request: Request, url: URL) {
  const upgradeHeader = request.headers.get("Upgrade");
  if (!upgradeHeader || upgradeHeader !== "websocket") {
    return (new Response("Expected Upgrade: websocket", { status: 426 }));
  }
  console.log("WS [open] :", url.search.substring(1))
  const { socket, response } = Deno.upgradeWebSocket(request);
  const key = url.search.substring(1);
  const msocket: ModeSocket = { socket, g_mode: 0 }

  msocket.socket.onmessage = (event) => {
    try {
      WS_pair[key][msocket.g_mode ? 0 : 1]?.socket?.send(event.data);
    } catch (_e) {
      try {
        delete WS_pair[key];
        socket.close();
      } catch (_e) {
        _e
      }
    }
  };
  socket.onclose = () => {
    console.log("WS [close]:", url.search.substring(1))
    delete WS_pair[key];
  };

  if (WS_pair[key] && WS_pair[key][0] && WS_pair[key][0].socket.readyState === 1) {
    msocket.g_mode = 1;
    WS_pair[key][1] = msocket;
    socket.onopen = () => {
      console.log("WS [start]:", url.search.substring(1))
      const box = Math.floor(Math.random() * 5).toString();
      WS_pair[key].status = "start";
      const on = Date.now()
      WS_pair[key][0]?.socket.send(JSON.stringify({ on, start: { side: 0, box } }));
      socket.send(JSON.stringify({ on, start: { side: 1, box } }));
    };
  } else {
    const g: GameSocket = { status: "open" }
    WS_pair[key] = g;
    msocket.g_mode = 0;
    WS_pair[key][0] = msocket;
    socket.onopen = () => {
    };
  }

  return response;
}

async function tsc() {
  ver = Date.now()
  await Deno.writeTextFile(PATH + "/js/pixi.ts", "export var PIXI = PIXI")
  const { code } = await bundle(PATH + "/js/game.ts");
  await Deno.writeTextFile(PATH + "res/game.js", (code).replaceAll(/export.*/g, "").replaceAll("  ", ""));
  await Deno.writeTextFile(PATH + "/js/pixi.ts", 'export * as PIXI from "npm:pixi.js"')
  return new Response()
}

await tsc()

Deno.serve({ port: 4301, hostname: "0.0.0.0" }, handler);
