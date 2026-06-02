import { Worker } from "bullmq";
import { redisConnection } from "../redis";
import logger from "../../../common/logger/logger";

export const emailWorker = new Worker(
  "email-queue",
  async (job) => {
    logger.info({ jobId: job.id, data: job.data }, "Processing email job");
    await new Promise((resolve) => {
      setTimeout(() => {
        resolve(true);
      }, 0);
    });
    logger.info(
      {
        email: job.data.email,
      },
      "Welcome email sent",
    );
  },
  {
    connection: redisConnection as object,
  },

);
