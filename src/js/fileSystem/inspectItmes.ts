import { ImagesDataType } from "../redux/redux/placedImages";
import { SendHostScript } from "./connectJSX";
import { dir_desktop } from "./init";

import path from "path";
import fs from "fs";

import { AppALert } from "./connectJSX";

export const jsonDir = "prevData";

/* 拡張子のない純粋なファイル名を取得 */
const setPureName:(name:string)=>string = name => path.basename(name,path.extname(name));

export const replaceDesktop = filePath => filePath.replace("~/Desktop",dir_desktop);
    
/* ファイルパスから最終更新日を取得 */
export const lookUpModifiedTime:(files:string[],activePath)=>Promise<ImagesDataType[]> = async (files,activePath) =>{
    return await Promise.all(files.map(async(file)=>{
        const status = await fs.promises.stat(replaceDesktop(file));
        return {
                    path:path.relative(activePath,replaceDesktop(file)),
                    modifiedDate:status.mtime.toString(),
                    birthTime:status.birthtime.toString(),
                    size:status.size
            };
    }));
}

export const loadPlacedItems:()=>Promise<{files:string[],doc:string}|false> = async() =>{
    const toJsx = new SendHostScript("getAllplaces.jsx");
    const r = await toJsx.callJsx();
    console.log(r);
    if(r==="false"||typeof r === "boolean")return false;
    const result = JSON.parse(r);
    result.doc = replaceDesktop(result.doc);
    return result;
}

export const saveJSON:(dataObj:ImagesDataType[],docID:string)=>Promise<boolean> = async(dataObj,docID) =>{
    if(!docID || docID===""){
        await AppALert("can't recognize document ID please save document or check directory in which saved ai file");
        return false;
    }
    const toJsx = new SendHostScript("getDocumentPath.jsx");
    const r = await toJsx.callJsx();
    if(typeof r==="boolean")return;
    const activePath = `${path.dirname(replaceDesktop(r))}/${jsonDir}`;
    await fs.promises.mkdir(activePath).catch(e=>console.log(e));
    console.log(`${activePath}/${docID}.json`);
    try{
        await fs.promises.writeFile(`${activePath}/${docID}.json`,
            JSON.stringify(dataObj));
        return true;    
    }catch(e){
        alert(e);
        return false;
    }
}

export const loadJSON:(jsonPath:string)=>Promise<ImagesDataType[]|false> = async jsonPath =>{
    try{
        const prevData = JSON.parse(await fs.promises.readFile(jsonPath).toString());
        return prevData;
    }catch(e){
        alert(e);
        return false;
    }
}

export const loadDocumentID:()=>Promise<string|false> = async() =>{
    const idJsx = new SendHostScript("getDocumentID.jsx");
    const id = await idJsx.callJsx();
    return typeof id==="boolean" ? false : id.substr(8,id.length);
}

/* 配置されたアイテムの 情報をJSONに書き出し */
export const inspectItems = async()=>{
    const idJsx = new SendHostScript("getDocumentID.jsx");
    const docID = await idJsx.callJsx();
    console.log(docID);
    if(typeof docID === "boolean"||"false")return;
    const document = await loadPlacedItems();
    if(document===false)return;
    const activeDoc = document.doc;
    await fs.promises.mkdir(`${path.dirname(activeDoc)}/${jsonDir}`).catch(e=>console.log(e));
    const fileObjects = await lookUpModifiedTime(document.files,document.doc);
    console.log(fileObjects);
    await saveJSON(fileObjects,`${path.dirname(activeDoc)}/${jsonDir}/${docID}`);
};

