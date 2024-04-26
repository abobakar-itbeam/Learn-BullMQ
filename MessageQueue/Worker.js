import { Worker } from "bullmq";
import RedisConnection  from "./RedisConnection.js";
import sendEmail from "../Utility/EmailSendBySendBox.js";

const MessageQueueWorker =async()=>{
    const jobHandlers={
        sendEmail:sendEmail,
        //sendNotification:sendNotification
        //MonthlyBillSlip:MonthlyBillSlip
    }
    
    
    const processJob=async (job)=>{
        const handler = jobHandlers[job.name];
        
        if(handler){
            console.log(`Processing job : ${job.name}`)
            await handler(job.data.email, job.data.subject, job.data.body);
        }
    }
    
    const worker =new Worker('sendEmailQueue',processJob,{connection:RedisConnection})
    
    worker.on("completed", (job) => {
        console.log(`${job.id} has completed!`);
      });
      
      worker.on("failed", (job, err) => {
        console.log(`${job.id} has failed with ${err.message}`);
      });
      
}

export default MessageQueueWorker