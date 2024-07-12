import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { UserByIdFinder } from "../../application/user-by-id-finder";
import { UserNotFound } from "../../domain/user-not-found";

export class UserController {
  constructor(private readonly userByIdFinder: UserByIdFinder) {}

  async run(req: Request, res: Response) {
    try {
      const user = await this.userByIdFinder.run(req.params.id);
      res.status(StatusCodes.OK).send(user);
    } catch (error) {
      if (error instanceof UserNotFound) {
        res.status(StatusCodes.BAD_REQUEST).send();
      }
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).send();
    }
  }
}
