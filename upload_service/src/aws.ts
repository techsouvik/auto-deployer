
import { S3 } from "aws-sdk"
import fs from "fs"

const s3 = new S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    endpoint: process.env.AWS_S3_ENDPOINT
})


export const uploadFile = async (fileName: string, filePath: string) =>{

    const fileContent = fs.readFileSync(filePath);
    const response = await s3.upload({
        Body: fileContent,
        Bucket: "auto-deployer" || process.env.AWS_BUCKET_NAME,
        Key: fileName
    }).promise();
    console.log(response)

}