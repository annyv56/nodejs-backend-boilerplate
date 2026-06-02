import IORedis from "ioredis";
import {config} from "../../config"
import logger from "../../common/logger/logger";

export const redisConnection = new IORedis({
    host:"localhost",
    port: 6379,
    maxRetriesPerRequest: null,
})

const redisClient = redisConnection

redisClient.on("connect", () =>{
    logger.info("redis connected");
});

redisClient.on("error", (error:any)=>{
    logger.error("Redis error:", error);
})

export {redisClient}