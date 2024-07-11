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
    - pnpm i dotenv express
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
