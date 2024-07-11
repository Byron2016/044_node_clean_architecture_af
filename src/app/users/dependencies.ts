import { ElasticUserRepository } from "./elastic-user-repository";
import { UserByIdFinder } from "./user-by-id-finder";
import { UserController } from "./user-controller";

const elasticUserRepository = new ElasticUserRepository();

const userByIdFinder = new UserByIdFinder(elasticUserRepository);

export const userController = new UserController(userByIdFinder);
