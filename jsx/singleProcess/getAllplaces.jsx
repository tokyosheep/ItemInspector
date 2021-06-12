(function(){
    var places = app.activeDocument.placedItems;
    var files = [];
    for(var i=0;i<places.length;i++){
        files[i] = decodeURI(places[i].file.toString());
    }
    return JSON.stringify({files:files,doc:decodeURI(app.activeDocument.fullName.toString())});
})();