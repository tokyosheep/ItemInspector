import fs from "fs";
import path from "path";

const dir_home = process.env[process.platform == `win32` ? `USERPROFILE` : `HOME`];
export const dir_desktop = path.join(dir_home, `Desktop`);//デスクトップパス

import { ImagesDataType } from "../redux/redux/placedImages";
import { loadDocumentID , loadPlacedItems , lookUpModifiedTime , jsonDir } from "./inspectItmes";
import { AppALert } from "../fileSystem/connectJSX";

type StatusType = {id:string|false,places:ImagesDataType[]|false,prev:ImagesDataType[]|false};

export　const dispatchAfterActivate:()=>Promise<StatusType> = async() =>{
    const status:StatusType ={
        id:false,places:false,prev:false
    }
    const places = await loadPlacedItems();
    console.log(places);
    if(places === false) return status;
    status.places = await lookUpModifiedTime(places.files,places.doc);
    const docID = await loadDocumentID();
    if(docID===false)return status;
    status.id = docID;
    try{
        const r = await fs.promises.readFile(`${path.dirname(places.doc.replace("~/Desktop",dir_desktop))}/${jsonDir}/${status.id}.json`,{encoding:"utf-8"});
        console.log(r);
        const prevs =  JSON.parse(r);
        status.prev = prevs; 
    }catch(e){
        console.log(e);
    }finally{
        return status;
    }
}

const sortTuronPath:(array:ImagesDataType[])=>void = array =>{
    array.sort((a,b)=> {
        if(a.path < b.path)return -1;
        if(a.path > b.path)return 1;
        return 0
    });
    return array;
}

const isSameItem:(item1:ImagesDataType,item2:ImagesDataType)=>boolean = (item1,item2) =>{
    return item1.path　===　item2.path && item1.modifiedDate === item2.modifiedDate;
}

/* JSONに記録された前回データと最新の配置アイテムの情報を比較 */
export const compareItems:(presents:ImagesDataType[],preves:ImagesDataType[])=>void = async(presents,prevs) =>{
    if(prevs.length===0){
        await AppALert("the document doen't have previous data");
        return;
    }
    if(presents.length !== prevs.length){
        await AppALert("the document has different number of items from previous's");
        return;
    }
    sortTuronPath(presents);
    sortTuronPath(prevs);

    const incorrects = presents.reduce((acc,current,index)=>{
        if(!isSameItem(current,prevs[index]))return [...acc,current.path];
        return acc;
    },[]);
    console.log(incorrects);
    if(incorrects.length === 0)return;
    await Promise.all(Array.from(new Set(incorrects)).map(async (value)=>{
        await AppALert(`${path.basename(value)} isn't match previous one`);
    }));
}

