import fs from "fs";
import path from "path";

export const getAllFiles = (folderpath: string) => {

    let response:string [] = [];
    const allFilesandfolders = fs.readdirSync(folderpath);
    allFilesandfolders.forEach((file) => {
        const Fullfilepath = path.join(folderpath, file);

        if(fs.statSync(Fullfilepath).isDirectory()){
            response = response.concat(getAllFiles(Fullfilepath));
        }else{
            response.push(Fullfilepath)
        }
    })
    return response;
}
