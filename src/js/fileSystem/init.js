import fs from "fs";
import path from "path";
export const csInterface = new CSInterface();
export const extensionRoot = csInterface.getSystemPath(SystemPath.EXTENSION) +`/jsx`;

const dir_home = process.env[process.platform == `win32` ? `USERPROFILE` : `HOME`];
export const dir_desktop = path.join(dir_home, `Desktop`);//デスクトップパス
const jsxParts = `${extensionRoot}/parts`;
const mainJsxFolder = `${extensionRoot}/mainProcess`;

export const changeDocEvent = func =>{
    csInterface.addEventListener("documentAfterActivate",func,false);
}

export const reloadEvent = () =>{
    csInterface.addEventListener("com.adobe.csxs.events.WindowVisibilityChanged",()=>{location.reload(true)},false);
}

const readDirFiles = (path) =>{
    return new Promise((resolve,reject)=>{
        fs.readdir(path,(err,files)=>{
            if(err)reject(err);
            resolve(files);
        })
    });
}

const loadJsx = async(jsxFolder) =>{
    const parts = await readDirFiles(jsxFolder).catch(e=>console.log(e));
    const jsxes = parts.filter(f => path.extname(f) === ".jsx");
    console.log(jsxes);
    jsxes.forEach(jsx =>  {
        console.log(`${jsxFolder}/${jsx}`);
        csInterface.evalScript(`$.evalFile("${jsxFolder}/${jsx}")`);
    } );
}

export const init = async() =>{
    //reloadEvent();
    csInterface.evalScript(`$.evalFile("${extensionRoot}/json2.js")`);//json2読み込み
    await loadJsx(jsxParts);
    await loadJsx(mainJsxFolder);
}

export const writeDebugData = obj =>{
    fs.writeFileSync(`${extensionRoot}/data.json`,JSON.stringify(obj));
}

export const prevent_drag_event= () =>{
    window.addEventListener(`drop`,prevent_dragnaddrop,false);
    
    window.addEventListener(`dragover`,prevent_dragnaddrop,false);
    
    function prevent_dragnaddrop(e){
        e.stopPropagation();
        e.preventDefault();
    }
}