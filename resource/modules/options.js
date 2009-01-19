/* See license.txt for terms of usage */
var EXPORTED_SYMBOLS = ["Options"];
var InterWiki = function(){
  //private
  var interwiki = new Object();
   
  //public
  return {
    add: function(_name,_url){
      if(interwiki[_name])
        return false;
      if(!_name)
        return false;
      if(!_url)
        return false;
      interwiki[_name] = _url;
      return true;
    },
    remove: function(_name){
      if(interwiki[_name])
        delete interwiki[_name];
    },
    get: function(_name){
      return interwiki[_name];         
    },
    update: function(_name,_newurl){
      if(!interwiki[_name])
        return;
        interwiki[_name]=_newurl;
    },
    init: function(_str){
      var wikis = _str.split('\n\n');
      for(var i=0;i<wikis.length;i++)
      {
        var wiki = wikis[i].split('\n');
        if(wiki[0] && wiki[1])
          interwiki[wiki[0]] = wiki[1];
      }
    },
    getAll: function(){
      return interwiki;         
    },
    toStr: function(){
      var str = '';
      for (name in interwiki)
      {
        str+= name +'\n'+ interwiki[name] +'\n\n'; 
      }
      return str;
    }

  };
};

var Options = function(){
	// private 
	var _pref = Components.classes["@mozilla.org/preferences-service;1"].getService(Components.interfaces.nsIPrefBranch);
	var _path = '';
	var _css = '';
	var _ext = '';
  var _interwiki = new InterWiki();
	var getStrPref = function(str)
	{
		try
		{
			if(_pref.getPrefType(str) == _pref.PREF_STRING) 
	    		return _pref.getCharPref(str);
		}catch(ex){alert(ex);}
	};

	var loadOptions = function(){
		_ext = getStrPref("wiki4x.option4x.ext");
		_path = getStrPref("wiki4x.option4x.path");
		_css = getStrPref("wiki4x.option4x.css");
    _interwiki.init(getStrPref("wiki4x.option4x.interwiki"));
	}();

	// public
	return {
    interWiki: function(){return _interwiki;},
		getExt: function(){return _ext;},	
		getPath: function(){return _path;},	
		getCss: function(){return _css;},
		setExt: function(_newext){
			_pref.setCharPref("wiki4x.option4x.ext",_newext);
			_ext = _newext;						 
		},
		setPath: function(_newpath){
			_pref.setCharPref("wiki4x.option4x.path",_newpath);
			_path = _newpath;						 
		},
		setCss: function(_newcss){
			_pref.setCharPref("wiki4x.option4x.css",_newcss);	
			_css = _newcss;
		},				 
    saveInterWiki: function(){
      _pref.setCharPref("wiki4x.option4x.interwiki",_interwiki.toStr());
    }
	};
}();
