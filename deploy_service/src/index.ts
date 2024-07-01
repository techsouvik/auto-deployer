import { downloadS3Folder,copyFinalDist } from "./aws"
import { buildProject } from "./utils"

import {createClient} from "redis"

const subscriber = createClient()
subscriber.connect()

const publisher = createClient()
publisher.connect()

async function main(){
    while(true){
        const res = await subscriber.brPop('build-queue', 0)

        // @ts-ignore
        const id = res.element
        console.log(id)
        await downloadS3Folder(`output/${id}`);
        console.log("downloaded")
        
        await buildProject(id);
        console.log("Project build done")
        
        await copyFinalDist(id);
        console.log("Uploading done")

        publisher.hSet("build-status", id, "deployed")
    }
}
main();