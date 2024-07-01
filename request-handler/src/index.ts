import express from 'express';
import { S3 } from "aws-sdk";

const app = express();

const s3 = new S3({
    accessKeyId: "6d77e0efbc785f4b94d756f91c9b368a" || process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: "f5fa9c62b0a261b503e700c4e597a2a9c38624302a47a49ad6c3de408444431f" || process.env.AWS_SECRET_ACCESS_KEY,
    endpoint: "https://f584cf9eb315183572305333890e54f2.r2.cloudflarestorage.com" || process.env.AWS_S3_ENDPOINT
})

app.get('/*', async (req, res) => {
    const host = req.hostname;
    const id = host.split('.')[0];
    const filePath = req.path;

    const contents = await s3.getObject({
        Bucket: "auto-deployer",
        Key: `dist/${id}${filePath}`
    }).promise();

    const type = filePath.endsWith("html") ? "text/html" : filePath.endsWith("css") ? "text/css" : "application/javascript"
    res.set("Content-Type", type);
    res.send(contents.Body);
})

app.listen(3001)