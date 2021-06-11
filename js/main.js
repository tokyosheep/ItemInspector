"use strict";

const csInterface = new CSInterface();
const fs = require("fs");
const path = require("path");
const dir_home = process.env[process.platform == `win32` ? `USERPROFILE` : `HOME`];
const dir_desktop = path.join(dir_home, `Desktop`);//デスクトップパス
const extensionDir = csInterface.getSystemPath(SystemPath.EXTENSION);
const extensionRoot = csInterface.getSystemPath(SystemPath.EXTENSION) +`/jsx/`;
const init = () =>{
    csInterface.evalScript(`$.evalFile("${extensionRoot}json2.js")`);//json2読み込み
}

/* jsxと繋ぐオブジェクト */
class CallJsx{
    constructor(jsx="hostScript"){
        this.jsx = jsx;
    }

    CallJsx(){
        return new Promise((resolve,reject)=>{
            csInterface.evalScript(`$.evalFile("${extensionRoot}${this.jsx}")`,(o)=>{
                if(!o||o=="false")reject(false);
                resolve(o);
            });
        });
    }

    CallHostscript(obj){
        return new Promise((resolve,reject)=>{
            csInterface.evalScript(`${this.jsx}(${JSON.stringify(obj)})`,(o)=>{
                if(o === "false"){
                    reject(false);
                }                
                resolve(o);
            });
        });
    }
}

window.onload = () =>{
    init();
    themeManager.init();
    /* 拡張子のない純粋なファイル名を取得 */
    const setPureName = name => path.basename(name,path.extname(name));
    
    /* ファイルパスから最終更新日を取得 */
    const lookUpModifiedTime = async files =>{
        return await Promise.all(files.map(async(file)=>{
            const status = await fs.promises.stat(file.replace("~/Desktop",dir_desktop));
            return {path:file,mtime:status.mtime.toString()};
        }));
    }

    /* 配置されたアイテムの 情報をJSONに書き出し */
    const inspectItems = async()=>{
        const toJsx = new CallJsx("singleProcess/getAllplaces.jsx");
        const r = await toJsx.CallJsx();
        console.log(r);
        if(r===false||r==="false")return;
        const document = JSON.parse(r);
        const activeDoc = document.doc.replace("~/Desktop",dir_desktop);
        try{
            const fileObjects = await lookUpModifiedTime(document.files);
            console.log(fileObjects);
            await fs.promises.writeFile(`${path.dirname(activeDoc)}/${setPureName(activeDoc)}.json`,
                JSON.stringify({
                doc:activeDoc,
                files:fileObjects
            }));
        }catch(e){
            console.log(e);
        }
    };

    /* JSONに記録された前回データと最新の配置アイテムの情報を比較 */
    const compareItems = async() =>{
        const toJsx = new CallJsx("singleProcess/getAllplaces.jsx");
        const r = await toJsx.CallJsx();
        console.log(r);
        if(r===false||r==="false")return;
        const document = JSON.parse(r);
        const activeDoc = document.doc.replace("~/Desktop",dir_desktop);
        const jsonPath = `${path.dirname(activeDoc)}/${setPureName(activeDoc)}.json`;
        try{
            const fileObjects = await lookUpModifiedTime(document.files);
            const prevData = JSON.parse(await fs.promises.readFile(jsonPath));
            console.log(prevData);
            fileObjects.forEach(file=>{
                const flag = prevData.files.some(prevFile=>{
                    return (prevFile.path===file.path&&prevFile.mtime===file.mtime);
                    /* ファイルパスと最終更新日が前回と一致したら */
                });
                if(!flag){
                    const toJsx = new CallJsx();
                    toJsx.CallHostscript({funcType:"justAlert",msg:`${file.path} isn't match previous one`});
                    /* アラートは必ずIllustratorから発火させる */
                }
            })
        }catch(e){
            console.log(e);
        }

    }
    /* アプリケーションが開かれた時にパネルも開かれていたらイベント追加 */
    csInterface.addEventListener("applicationActivate",(e)=>{
        console.log(e);
        csInterface.addEventListener(`documentAfterActivate`,compareItems);
        csInterface.addEventListener("documentAfterSave",inspectItems);
    });
    
    /* パネルが表示、非表示されたときのイベント追加と削除 */
    csInterface.addEventListener(`com.adobe.csxs.events.WindowVisibilityChanged`,(e)=>{
        console.log(e);
        if(!e.data){
            csInterface.removeEventListener(`documentAfterActivate`,compareItems);
            csInterface.removeEventListener("documentAfterSave",inspectItems);
        }else{
            csInterface.addEventListener(`documentAfterActivate`,compareItems);
            csInterface.addEventListener("documentAfterSave",inspectItems);
        }
    });
    
}