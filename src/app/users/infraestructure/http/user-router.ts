import express, { Router } from "express";
import { userController } from "../dependencies";

const userRouter = Router();

// bind para no perder el contexto del this.
userRouter.get("/:id", userController.run.bind(userController));

export { userRouter };
