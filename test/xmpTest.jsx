(function(){
	if(app.documents.length===0)return false;
    XMPtool = {
		ns : "http://ns.chuwa.sytes.net/idcomment/1.0/",
		prefix : "ID_meta:",//custom metada
		f : new Object(),
		read : function(prop){//read exist custom metadata.
		    try{
				if(xmpLib==undefined) var xmpLib = new ExternalObject('lib:AdobeXMPScript');
				var xmpFile = new XMPFile(this.f.fsName, XMPConst.UNKNOWN, XMPConst.OPEN_FOR_READ);
				var xmpPackets = xmpFile.getXMP();
				var xmp = new XMPMeta(xmpPackets.serialize());
			    return xmp.getProperty(XMPConst.NS_XMP_MM,prop).toString();
		    }catch(e){
                //alert(e);
				return false;
		    }
		}
	}

	XMPtool.ns = "http://purl.org/dc/elements/1.1/";  
	XMPtool.prefix = "";  
	XMPtool.f = app.activeDocument.fullName; 
	$.writeln(XMPtool.read("InstanceID"));    
})();