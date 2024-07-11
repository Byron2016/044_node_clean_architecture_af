import express, { Router } from "express";
import { HealthController } from "./health-controller";

const healthRouter = Router();

const healthController = new HealthController();

healthRouter.get("/", healthController.run.bind(healthController));

export { healthRouter };
