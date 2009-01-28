/* See license.txt for terms of usage */
var View4X = function(){
	//private
	var cur_tab;
	var that = this;
	
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
	var initTitle = function(){
		var title = doc.body.childNodes[1].childNodes[0].innerHTML;
		if(!title)
			return;
		doc.body.childNodes[1].setAttribute('name',title);
		doc.title = title;
	};
	var wikify = function(){
		var src = doc.body.childNodes[0].innerHTML;		
		initStyle();
		var creole = new Parse.Simple.Creole( {
			interwiki: Options.interWiki().getAll(),
			linkFormat:[Options.getPath()+'/',Options.getExt()]
		} );
		var div = doc.createElement('div');
		div.setAttribute('class','wiki-block');
		div.className = 'wiki-block';//for IE	
		doc.body.appendChild(div);

		creole.parse(div,decodeEntities(src));
		initTitle();
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
