import express, { Express } from "express";
import http from "node:http";
import { config } from "./config/config";
import { AddressInfo } from "node:net";

export class Server {
  private readonly app: Express;
  private httServer?: http.Server;

  constructor() {
    this.app = express();
    this.app.use(express.json());
    // this.app.use()
    // this.app.use()
  }

  async start(): Promise<void> {
    return new Promise((resolve) => {
      this.httServer = this.app.listen(config.server.port, () => {
        const { port } = this.httServer?.address() as AddressInfo;
        console.log(`App is ready and listenig on port ${port} 🚀`);
        resolve();
      });
    });
  }

  async stop(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (this.httServer) {
        this.httServer.close((err) => {
          if (err) {
            return reject(err);
          }
          return resolve();
        });
      }

      return resolve();
    });
  }

  getHttpServer(): http.Server | undefined {
    return this.httServer;
  }
}
