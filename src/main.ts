import "./app/config/load-env-vars";

import { Server } from "./app/server";

new Server().start().catch(handleError);

function handleError(err: unknown) {
  console.error(err);
  process.exit(1);
}

process.on("uncaughtException", handleError);
