/* See license.txt for terms of usage */
function View4X()
{
	var cur_tab;
	var that = this;
	var creole = new Parse.Simple.Creole( {
        interwiki:{
            WikiCreole: 'http://www.wikicreole.org/wiki/',
            Wikipedia: 'http://en.wikipedia.org/wiki/'
        },
        linkFormat:['','']
   	} );
	function decodeEntities(str) {
		return str.replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"');
	}

	function initStyle()
	{
		var opt = new Option4X();
		var cssfile = opt.css();
		if(cssfile == '')
			return;
		var wiki4x = new Wiki4X();
		var headID = doc.getElementsByTagName("head")[0];         
		var cssNode = doc.createElement('link');
		cssNode.type = 'text/css';
		cssNode.rel = 'stylesheet';
		cssNode.href = cssfile;
		cssNode.media = 'screen';
		headID.appendChild(cssNode);
	}
	function wikify()
	{
		var src = doc.body.innerHTML;		
		initStyle();
		var div = doc.createElement('div');
		div.id = 'wiki-block';	
		doc.body.appendChild(div);

		src = src.replace(/\<[\/]{0,1}pre\>/g,'');
		logger.group('parser');
		creole.parse(div,decodeEntities(src));
		logger.groupEnd();
		doc.body.removeChild(doc.body.childNodes[0]);
	}
	that.domLoad = function(aEvent)
	{
		doc = aEvent.originalTarget;
		var wiki4x = new Wiki4X();
		if(!wiki4x.isProtocolValid())
			return;
		logger.group('contenttype check');
		var contenttype = wiki4x.isContentTypeValid();
		logger.groupEnd();
		if(!contenttype)
			return;
		if(wiki4x.hasHomePath())
		{
			if(!wiki4x.isPageValid())
			return;
		}
		logger.group('wikify');
		wikify();
		logger.groupEnd();
	};

}
var doc;
document.addEventListener('DOMContentLoaded',new View4X().domLoad,false);
