/*jslint vars: true, plusplus: true, devel: true, nomen: true, regexp: true, indent: 4, maxerr: 50 */
/*global $, Folder*/

function hostScript(obj){
    switch(obj.funcType){
        case "justAlert":
            alert(obj.msg);
            return;

        default:
            return;
    }
    return true;
}  
