import { bootstrapExpress } from "./app";
import { logger } from "../config/logger";
import { validateEnv } from "../config/env.config";
import { connectToDB } from "../config/mongoose";
import { eventSubscribe } from "./eventSubscribe";

export const bootstrap = async (app) => {
  validateEnv();
  await connectToDB();
  bootstrapExpress(app);
  eventSubscribe();
  logger.info("Express app initiated.");
};
