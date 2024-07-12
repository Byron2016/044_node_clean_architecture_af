import { config } from "../../config/config";
import { ElasticUserRepository } from "./user-repository/elastic-user-repository";
import { UserByIdFinder } from "../application/user-by-id-finder";
import { UserController } from "./http/user-controller";
import { UserRepository } from "../domain/user-repository";
import { MongoUserRepository } from "./user-repository/mongo-user-repository";
import { MySQLUserRepository } from "./user-repository/mysql-user-repository";

const getUserRepository = (): UserRepository => {
  switch (config.db.db_type) {
    case "mongo":
      return new MongoUserRepository();
    case "elastic":
      return new ElasticUserRepository();
    case "mySQL":
      return new MySQLUserRepository();
    default:
      throw new Error("Invalid Database type");
  }
};

// const elasticUserRepository = new ElasticUserRepository();

// const userByIdFinder = new UserByIdFinder(elasticUserRepository);

// export const userController = new UserController(userByIdFinder);

const userByIdFinder = new UserByIdFinder(getUserRepository());

export const userController = new UserController(userByIdFinder);
