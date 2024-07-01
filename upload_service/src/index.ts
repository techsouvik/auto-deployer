import {generate} from './utils'
import { getAllFiles } from './file';
import { uploadFile } from './aws';

import express from "express";
import cors from "cors";
import simpleGit from "simple-git";
import path from "path";
import {createClient} from "redis";

const publisher = createClient();
publisher.connect();

const subscriber = createClient();
subscriber.connect();


const app = express();

app.use(express.json());
app.use(cors());

app.post('/deploy', async(req,res)=>{
    
    console.log(req.body.repoUrl)
    const repoUrl = req.body.repoUrl
    const id = generate()
    await simpleGit().clone(repoUrl, path.join(__dirname,`output/${id}`))  
    const fileList = getAllFiles(path.join(__dirname,`output/${id}`))
    
    async function abcd(){
        await fileList.forEach(async(file)=>{
            await uploadFile(file.slice(__dirname.length+1), file)
        })
    }
    abcd();

    await new Promise((resolve) => setTimeout(resolve, 5000)) 

    publisher.lPush("build-queue", id)
    publisher.hSet("build-status", id, "uploaded")

    res.json({
        id : id
    })
})

app.get('/status', async(req,res)=>{
    const id = req.query.id
    const response = await subscriber.hGet("build-status", id as string)

    res.json({
        status : response
    })
})

app.listen(3000);