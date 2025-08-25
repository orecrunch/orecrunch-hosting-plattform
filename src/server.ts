import { createServer, IncomingMessage, Server } from "http";
import { parse } from "url";
import next from "next";
import { WebSocketServer } from "ws";
import { Socket } from "net";

const port = parseInt(process.env.PORT || "3000", 10);
const dev = process.env.NODE_ENV !== "production";
const turbo = process.env.TURBOPACK === "true";
const app = next({ dev, turbo, turbopack: turbo });
const handle = app.getRequestHandler();
const clients: Set<WebSocket> = new Set();

console.log('\x1b[32m \n┏┓    ┏┓       ┓ \n┃┃┏┓┏┓┃ ┏┓┓┏┏┓┏┣┓\n┗┛┛ ┗ ┗┛┛ ┗┻┛┗┗┛┗•\n                 \n\x1b[0m')
console.log(
  "\x1b[32m=== Launching Server-Hosting plattform by OreCrunch! ===\x1b[0m"
);
console.log(
  `> Starting in ${dev ? "development" : "production"} mode with ${
    turbo ? "Turbopack" : "Webpack"
  }`
);
app.prepare().then(() => {
  const server: Server = createServer((req, res) => {
    //Because url.Parse() is now deprecated
    const urlObj = new URL(req.url!, getBasePath(req));
    const parsedUrl = {
      pathname: urlObj.pathname,
      query: Object.fromEntries(urlObj.searchParams),
    } as any;

    handle(req, res, parsedUrl);
  }).listen(port);

  //noServer cause we use the same server as next
  const wss = new WebSocketServer({ noServer: true });
  wss.on("connection", (ws: WebSocket) => {
    clients.add(ws);
  
    console.log("New client connected");

    ws.addEventListener("message", (ev: MessageEvent<any>) => {
      const message = ev.data;

      console.log(`Message received: ${message}`);
    });

    ws.addEventListener("close", () => {
      clients.delete(ws);
      console.log("Client disconnected");
    });
  });

  server.on("upgrade", (req: IncomingMessage, socket: Socket, head: Buffer) => {
    const { pathname } = new URL(req.url!, getBasePath(req));

    if (pathname === "/_next/webpack-hmr") {
      app.getUpgradeHandler()(req, socket, head);
    }

    // if (pathname === "/api/payment/stripe/ws") {
    //   wss.handleUpgrade(req, socket, head, (ws) => {
    //     wss.emit("connection", ws, req);
    //   });
    // }
  });

  console.log(`> Server listening at \x1b[32mhttp://localhost:${port}\x1b[0m`);
});


function getBasePath(req: IncomingMessage): string {
  return `${req.headers["x-forwarded-proto"] || "http"}://${req.headers.host}`;
}