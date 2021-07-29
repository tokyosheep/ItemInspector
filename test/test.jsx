(function(){
    var places = app.activeDocument.placedItems;
    for(var p in places[0]){
        try{
            $.writeln(p);
            $.writeln(places[0][p]);
        }catch(e){
            $.writeln(e);
        }
    }
})();