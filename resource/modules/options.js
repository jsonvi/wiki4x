/* See license.txt for terms of usage */
var EXPORTED_SYMBOLS = ["Options"];
var Options = function(){
	// private 
	var _pref = Components.classes["@mozilla.org/preferences-service;1"].getService(Components.interfaces.nsIPrefBranch);
	var _path = '';
	var _css = '';
	var _ext = '';
	var getStrPref = function(str)
	{
		try
		{
			if(_pref.getPrefType(str) == _pref.PREF_STRING) 
	    		return _pref.getCharPref(str);
		}catch(ex){alert(ex);}
	};

	var loadOptions = function(){
		_ext = getStrPref("wiki4x.options.ext");
		_path = getStrPref("wiki4x.options.path");
		_css = getStrPref("wiki4x.options.css");
	}();

	// public
	return {
		getExt: function(){return _ext;},	
		getPath: function(){return _path;},	
		getCss: function(){return _css;},
		setExt: function(_newext){
			_pref.setCharPref("wiki4x.options.ext",_newext);
			_ext = _newext;						 
		},
		setPath: function(_newpath){
			_pref.setCharPref("wiki4x.options.path",_newpath);
			_path = _newpath;						 
		},
		setCss: function(_newcss){
			_pref.setCharPref("wiki4x.options.css",_newcss);	
			_css = _newcss;
		}				 
	};
}();
