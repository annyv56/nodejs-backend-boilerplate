import { Queue } from "bullmq";
import { redisConnection } from "../redis";

export const emailQueue = new Queue("email-queue", {
  connection: redisConnection as object,
});

export const addWelcomeEmailJob = async (email: string) => {
  await emailQueue.add(
    "welcome-email",
    { email },
    {
      attempts: 3,
      backoff: {
        type: "exponential",
        delay: 2000,
      },
      removeOnComplete: 100,
      removeOnFail: 50,
    },
  );
};
