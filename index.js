import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import {emailJobQueue} from './MessageQueue/Queue.js'
import Worker from './MessageQueue/Worker.js'
dotenv.config()
const app = express()
app.use(express.json())

app.get('/',(request,response)=>{
response.status(200).json({message:"Hello World"})
})

app.post('/send-mail',async(request,response)=>{
  let job = await emailJobQueue(request.body)
 console.log("job ID : ",job.id)
  if(job.id)
  response.status(200).json({message:"Email Add in Queue",job:job})
else
response.status(400).json({message:"Job not Added"})

})

app.listen(6000,()=>{
    console.log("server run on Port : 6000")
    Worker();
})
