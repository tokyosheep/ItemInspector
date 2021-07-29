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

	