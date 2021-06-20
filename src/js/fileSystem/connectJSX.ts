
import {csInterface,extensionRoot} from "./init.js";

interface HostObj{
    jsx:string,
    arg?:object,
}

type Return = string|boolean;

export class SendHostScript implements HostObj{
    constructor(public jsx:string = "hostScript",public arg?:object){

    }

    callJsx():Promise<string|boolean>{
        return new Promise((resolve,reject)=>{
            csInterface.evalScript(`$.evalFile("${extensionRoot}/singleProcess/${this.jsx}")`,(o:Return)=>{
                if(!o||o==="false")resolve(false);
                resolve(o);
            });
        })
    }

    callHostScript(obj:object):Promise<string|boolean>{
        return new Promise((resolve,reject)=>{
            csInterface.evalScript(`${this.jsx}(${JSON.stringify(obj)})`,(o:Return)=>{
                if(!o||o === "false"){
                    resolve(false);
                }                
                resolve(o);
            });
        });
    }
}

export const AppALert:(msg:string)=>Promise<void> = async msg =>{
    return new Promise(resolve=>{
        csInterface.evalScript(`hostScript(${JSON.stringify({funcType:"justAlert",msg:msg})})`,()=>{
            resolve();
        });
    })
}