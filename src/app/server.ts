import express, { Express } from "express";
import http from "node:http";
import { config } from "./config/config";
import { AddressInfo } from "node:net";
import { healthRouter } from "./health/api/health-router";
import { userRouter } from "./users/infraestructure/http/user-router";

export class Server {
  private readonly app: Express;
  private httServer?: http.Server;

  constructor() {
    this.app = express();
    this.app.use(express.json());

    // routes
    this.app.use("/api/health", healthRouter);
    this.app.use("/users", userRouter);
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
