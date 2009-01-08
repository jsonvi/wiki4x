/* See license.txt for terms of usage */
var View4X = function(){
	//private
	var cur_tab;
	var that = this;
	var creole = new Parse.Simple.Creole( {
        interwiki:{
            WikiCreole: 'http://www.wikicreole.org/wiki/',
            Wikipedia: 'http://en.wikipedia.org/wiki/'
        },
        linkFormat:['','']
   	} );
	var decodeEntities = function(str) {
		return str.replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"');
	};

	var initStyle = function(){
		var cssfile = Options.getCss();
		if(cssfile == '')
			return;
		if(top.window.navigator.platform.indexOf("Win") >= 0)
		{
			cssfile = cssfile.replace(/\\/g,'\/');
			if(/^[A-Za-z]:\/.+/.test(cssfile))
			{
				cssfile = 'file:///'+cssfile;
			}
		}
		var headID = doc.getElementsByTagName("head")[0];         
		var cssNode = doc.createElement('link');
		cssNode.type = 'text/css';
		cssNode.rel = 'stylesheet';
		cssNode.href = cssfile;
		cssNode.media = 'screen';
		headID.appendChild(cssNode);
	};
	var wikify = function(){
		var src = doc.body.innerHTML;		
		initStyle();
		var div = doc.createElement('div');
		div.id = 'wiki-block';	
		doc.body.appendChild(div);

		src = src.replace(/\<[\/]{0,1}pre\>/g,'');
		creole.parse(div,decodeEntities(src));
		doc.body.removeChild(doc.body.childNodes[0]);
	};
	//public
	return {
		domLoad: function(aEvent){
			doc = aEvent.originalTarget;
			if(Wiki4X.isValid())
				wikify();			 
		}	
	};
}();
var doc;
document.addEventListener('DOMContentLoaded',View4X.domLoad,false);
