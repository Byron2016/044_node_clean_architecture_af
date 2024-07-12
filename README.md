<div>
	<div>
		<img src=https://raw.githubusercontent.com/Byron2016/00_forImages/main/images/Logo_01_00.png align=left alt=MyLogo width=200>
	</div>
	&nbsp;
	<div>
		<h1>044_node_clean_arq_af_repository_patron</h1>
	</div>
</div>

&nbsp;

# Table of contents

---

- [Table of contents](#table-of-contents)
- [Project Description](#project-description)
- [Technology stack](#technology-stack)
- [Technologies used](#technologies-used)
- [References](#references)
- [Steps](#steps)

[⏪(Back to top)](#table-of-contents)

# Project Description

**044_node_clean_arq_af_repository_patron** is a practice to build a **Nodejs app with repository pattern** following Youtube Albert Hernandez's tutorial [NodeJS Repository Pattern | Clean Architecture]
(https://www.youtube.com/watch?v=soe7tOPi7JM)
and the other help that you can find into **Reference** section.

# Technology stack

Se hace con un stack tecnológico un poco mezclado

- **Nodejs** with **express**
- **TypeScript**

[⏪(Back to top)](#table-of-contents)
&nbsp;

# Technologies used

![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)

[⏪(Back to top)](#table-of-contents)

# References

- Shields.io

  - [Shields.io](https://shields.io/)

  - [Github Ileriayo markdown-badges](https://github.com/Ileriayo/markdown-badges)

  - [Github Ileriayo markdown-badges WebSite](https://ileriayo.github.io/markdown-badges/)

[⏪(Back to top)](#table-of-contents)

# Steps

- Create a base project with this template:

  - [NodeJS Repository Pattern | Clean Architecture]
    (https://github.com/AlbertHernandez/express-typescript-service-template)

  - I am not going to use the template to generate it, I am goint to made by myselfe.

    - pnpm i -D typescript nodemon @types/node @types/express npm-run-all rimraf ts-node-dev
    - pnpm i dotenv express http-status-codes
    - Create a tsconfig.json file
      - npx tsc --init --outDir dist/ --rootDir src
    - Create package.json scripts
      - "dev": "tsnd --respawn --clear src/app.ts",
      - "build": "rimraf ./dist && tsc",
      - "start": "npm run build && node dist/app.js",
    - Create inicia project structure

      - src
        - main.ts
        - app
          - server.ts

    - Enviroment vars.

      - "./src/app/config/load-env-vars.ts

        ```js
        import { config } from "dotenv";
        config();
        ```

      - "./src/app/config/config.ts

        ```js
        export const config = {
          server: {
            port: process.env.PORT || 3000,
          },
        };
        ```

      - ".env"

      ```bash
        PORT=3000
      ```

    - Create express server.

      - "./src/app/server.ts"

        ```js
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
        ```

      - "./src/main.ts"

        ```js
        import "./app/config/load-env-vars";

        import { Server } from "./app/server";

        new Server().start().catch(handleError);

        function handleError(err: unknown) {
          console.error(err);
          process.exit(1);
        }

        process.on("uncaughtException", handleError);
        ```

    - Create health end point.

      - "./src/app/health/api/health-controller.ts"

        ```js
        import { Request, Response } from "express";
        import { StatusCodes } from "http-status-codes";

        export class HealthController {
          async run(req: Request, res: Response) {
            res.status(StatusCodes.OK).send();
          }
        }
        ```

      - "./src/app/health/api/health-router.ts"

        ```js
        import express, { Router } from "express";
        import { HealthController } from "./health-controller";

        const healthRouter = Router();

        const healthController = new HealthController();

        healthRouter.get("/", healthController.run.bind(healthController));

        export { healthRouter };
        ```

      - "./src/app/server.ts"

        ```js
        	....
        	import { healthRouter } from "./health/api/health-router";

        	export class Server {
        	  ....
        	  constructor() {
        	    ....
        	    // routes
        	    this.app.use("/api/health", healthRouter);
        	    // this.app.use();
        	  }
        	  ....
        	}
        ```

    - User Repository pattron.

      - "./src/app/users/user.ts"

        ```js
        	export class User {
        	  constructor(public readonly id: string, public readonly name: string) {}
        	}
        ```

      - "./src/app/users/user-repository.ts"

        ```js
        import { User } from "./user";

        export interface UserRepository {
          getById(id: string): Promise<User | null>;
        }
        ```

      - "./src/app/users/user-not-found.ts"

        ```js
        export class UserNotFound extends Error {
          constructor(id: string) {
            super(`User not found "${id}"`);
          }
        }
        ```

      - "./src/app/users/user-collection.ts"

        ```js
        import { User } from "./user";

        export const USER_COLLECTION: User[] = [
          {
            id: "1",
            name: "Santiago",
          },
          {
            id: "2",
            name: "Sofía",
          },
        ];
        ```

      - "./src/app/users/user-by-id-finder.ts"

        ```js
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
        ```

      - "./src/app/users/mongo-user-repository.ts"

        ```js
        import { User } from "./user";
        import { USER_COLLECTION } from "./user-collection";
        import { UserRepository } from "./user-repository";

        export class MongoUserRepository implements UserRepository {
          async getById(id: string): Promise<User | null> {
            console.log("Using Mongo");

            const user = USER_COLLECTION.find((user) => user.id === id);
            return user ? new User(user.id, user.name) : null;
          }
        }
        ```

      - "./src/app/users/elastic-user-repository.ts"

        ```js
        import { User } from "./user";
        import { USER_COLLECTION } from "./user-collection";
        import { UserRepository } from "./user-repository";

        export class ElasticUserRepository implements UserRepository {
          async getById(id: string): Promise<User | null> {
            console.log("Using Elastic");

            const user = USER_COLLECTION.find((user) => user.id === id);
            return user ? new User(user.id, user.name) : null;
          }
        }
        ```

      - "./src/app/users/user-controller.ts"

        ```js
        import { Request, Response } from "express";
        import { StatusCodes } from "http-status-codes";
        import { UserByIdFinder } from "./user-by-id-finder";
        import { UserNotFound } from "./user-not-found"
        export class UserController {
          constructor(private readonly userByIdFinder: UserByIdFinder) {
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
        ```

      - "./src/app/users/user-router.ts"

        ```js
        import express, { Router } from "express";
        import { userController } from "./dependencies";

        const userRouter = Router();

        // bind para no perder el contexto del this.
        userRouter.get("/:id", userController.run.bind(userController));

        export { userRouter };
        ```

      - "./src/app/users/dependencies.ts"

        ```js
        import { ElasticUserRepository } from "./elastic-user-repository";
        import { MongoUserRepository } from "./mongo-user-repository";
        import { UserByIdFinder } from "./user-by-id-finder";
        import { UserController } from "./user-controller";

        const mongoUserRepository = new MongoUserRepository();

        const userByIdFinder = new UserByIdFinder(mongoUserRepository);

        export const userController = new UserController(userByIdFinder);
        ```

      - "./src/app/server.ts"

        ```js
        ....
        import { userRouter } from "./users/user-router";

        export class Server {
          ....
          constructor() {
            ....
            // routes
            this.app.use("/api/health", healthRouter);
            this.app.use("/users", userRouter);
          }
        	....
        }
        ```

    - User Repository pattron: Move to a new DB.

      - "./src/app/server.ts"

        ```js
        import { ElasticUserRepository } from "./elastic-user-repository";
        // import { MongoUserRepository } from "./mongo-user-repository";
        ....

        // const mongoUserRepository = new MongoUserRepository();

        const elasticUserRepository = new ElasticUserRepository();

        const userByIdFinder = new UserByIdFinder(elasticUserRepository);

        export const userController = new UserController(userByIdFinder);
        ```

    - Transform to Hexagonal Architecture

    | File               | Original        | Destination                                     |
    | ------------------ | --------------- | ----------------------------------------------- |
    | dependencies       | ./src/app/users | ./src/app/users/infraestructure                 |
    | db-user-repository | ./src/app/users | ./src/app/users/infraestructure/user-repository |
    | user-colletion     | ./src/app/users | ./src/app/users/infraestructure/user-repository |
    | user-controller    | ./src/app/users | ./src/app/users/infraestructure/http            |
    | user-router        | ./src/app/users | ./src/app/users/infraestructure/http            |
    | user-not-found     | ./src/app/users | ./src/app/users/domain                          |
    | user-repository    | ./src/app/users | ./src/app/users/domain                          |
    | user               | ./src/app/users | ./src/app/users/domain                          |
    | user-by-id-finder  | ./src/app/users | ./src/app/users/application                     |
