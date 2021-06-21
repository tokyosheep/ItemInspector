(function(){
    if(app.documents.length===0)return false;
    return decodeURI(app.activeDocument.fullName.toString());
})();