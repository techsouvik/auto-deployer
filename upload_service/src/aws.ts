
import { S3 } from "aws-sdk"
import fs from "fs"

const s3 = new S3({
    accessKeyId: "6d77e0efbc785f4b94d756f91c9b368a" || process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: "f5fa9c62b0a261b503e700c4e597a2a9c38624302a47a49ad6c3de408444431f" || process.env.AWS_SECRET_ACCESS_KEY,
    endpoint: "https://f584cf9eb315183572305333890e54f2.r2.cloudflarestorage.com" || process.env.AWS_S3_ENDPOINT
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