import { Queue } from "bullmq";
import  RedisConnection  from "./RedisConnection.js";

const sendEmailQueue= new Queue('sendEmailQueue',{connection:RedisConnection})

export async function emailJobQueue(job){
    const Options={}
 return sendEmailQueue.add('sendEmail',job,Options)
 
}