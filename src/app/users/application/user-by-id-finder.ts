import { error } from "console";
import { UserRepository } from "../domain/user-repository";
import { UserNotFound } from "../domain/user-not-found";
import { User } from "../domain/user";

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
