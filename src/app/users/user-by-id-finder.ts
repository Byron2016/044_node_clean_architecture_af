import { error } from "console";
import { UserRepository } from "./user-repository";
import { UserNotFound } from "./user-not-found";
import { User } from "./user";

export class UserByIdFinder {
  constructor(private readonly userRepository: UserRepository) {}

  async run(id: string): Promise<User> {
    const user = await this.userRepository.getById(id);

    if (!user) {
      throw new UserNotFound(id);
    }

    return user;
  }
}
