/* See license.txt for terms of usage */
function Option4X()
{
	var that = this;
	var _pref = Components.classes["@mozilla.org/preferences-service;1"].getService(Components.interfaces.nsIPrefBranch);
	var _path;
	var _css;

	function getStrPref(str)
	{
		try
		{
			if(_pref.getPrefType(str) == _pref.PREF_STRING) 
	    		return _pref.getCharPref(str);
			
		
		}catch(ex){alert(ex);}
	
	}
	that.loadOptions = function(){
		_path = getStrPref("wiki4x.option4x.path");
		_css = getStrPref("wiki4x.option4x.css");
	};
	that.saveOptions = function(){

		_pref.setCharPref("wiki4x.option4x.path",document.getElementById('path-txt').value);
		_pref.setCharPref("wiki4x.option4x.css",document.getElementById('css-txt').value);
	};
	that.initOptionPanel = function(){
		document.getElementById('path-txt').value = _path;
		document.getElementById('css-txt').value = _css;
	};
	that.path = function(){
		return _path;
	};
	that.css = function(){
		return _css;	
	};
	that.loadOptions();
}
