import prisma from "../../database/prisma"
import { redisConnection } from "../queue/redis"

export const getHealthStatus = async()=>{
    return {
        status:"ok",
        timestamp: new Date().toISOString(),
    }
}

export const getReadinessStatus = async()=>{
    let postgres = false;
    let redis = false;
    try{
        await redisConnection.ping();
        redis=true;
    }
    catch{
        redis=false
    }
    return{
        status: 
        postgres && redis ?"ready":"not ready",
        postgres,
        redis,
        timestamp: new Date().toDateString(),
    }
}