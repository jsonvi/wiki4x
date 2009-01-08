/* See license.txt for terms of usage */
var Options = function(){
	// private 
	var _pref = Components.classes["@mozilla.org/preferences-service;1"].getService(Components.interfaces.nsIPrefBranch);
	var _path = '';
	var _css = '';
	var getStrPref = function(str)
	{
		try
		{
			if(_pref.getPrefType(str) == _pref.PREF_STRING) 
	    		return _pref.getCharPref(str);
		}catch(ex){alert(ex);}
	};

	var loadOptions = function(){
		_path = getStrPref("wiki4x.option4x.path");
		_css = getStrPref("wiki4x.option4x.css");
	}();

	// public
	return {
		path: function(){return _path;},	
		css: function(){
			var cssfile = _css;
			if(top.window.navigator.platform.indexOf("Win") >= 0)
			{
				cssfile = cssfile.replace(/\\/g,'\/');
				if(/^[A-Za-z]:\/.+/.test(cssfile))
				{
					cssfile = 'file:///'+cssfile;
				}
			}
			return cssfile;	
		},
		saveOptions: function(){
			var newpath = document.getElementById('path-txt').value;
			var newcss = document.getElementById('css-txt').value;
			_pref.setCharPref("wiki4x.option4x.path",newpath);
			_pref.setCharPref("wiki4x.option4x.css",newcss);	
		},	
		initOptionPanel: function(){
			document.getElementById('path-txt').value = _path;
			document.getElementById('css-txt').value = _css;
		}
	};
}();
