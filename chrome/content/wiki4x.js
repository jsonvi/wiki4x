/* See license.txt for terms of usage */
var Wiki4X = function(){
	//private	
	var validatePath = function(_path){
		var test_path = _path;
		test_path = test_path.replace(/file:\/\/\//g,'');
		test_path = test_path.replace(/\/+/g,'\/');
		test_path = test_path.replace(/^[\/](.+)/,'$1');
		return test_path;
	};
	var isProtocolValid = function(){
		var protocol = doc.location.protocol;
		if(protocol != 'file:')
			return false;
		return true;
	};
	var isContentTypeValid = function(){
		var type = doc.contentType;
		if(type!='text/plain')
			return false;
		return true;
	};
	var hasHomePath = function(){
		return (Options.getPath() != '');
	};
	var isPageValid = function(){
		var src = doc.body.innerHTML;	
		var opt_path = home_path;	
		if(!src)
			return false;
	
		if(top.window.navigator.platform.indexOf("Win") >= 0)
			opt_path = opt_path.replace(/\\/g,'\/');
		var cur_path = doc.location.href; 

		cur_path = validatePath(cur_path);
		opt_path = validatePath(opt_path);
		cur_path = cur_path.substring(0,opt_path.length);
		if(cur_path != opt_path)
			return false;
		else
			return true;
	};
	//public
	return{
		isValid: function(){
			if(!isProtocolValid())
				return false;
			if(!isContentTypeValid())
				return false;
			if(hasHomePath())
			{
				if(!isPageValid())
					return false;
			}
			return true;
		}	
	};
}();



