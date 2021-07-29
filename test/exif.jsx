(function(){
    if(xmpLib==undefined) var xmpLib = new ExternalObject('lib:AdobeXMPScript')

    MAINfn()

    function MAINfn(){
    	var PLA = File.openDialog().fsName
		$.writeln(PLA);
        //var PLA = app.activeDocument.fullName; 
    	if(!PLA) return false

    	var xmpFile = new XMPFile(PLA, XMPConst.UNKNOWN, XMPConst.OPEN_FOR_READ)
    	var xmpPackets = xmpFile.getXMP()
    	var xmp = new XMPMeta(xmpPackets.serialize())

    	$.writeln(xmp.getProperty(XMPConst.NS_EXIF,'PixelXDimension'))
    	$.writeln(xmp.getProperty(XMPConst.NS_EXIF,'PixelYDimension'))
    }
})();