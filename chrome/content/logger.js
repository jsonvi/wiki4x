/* See license.txt for terms of usage */
function Logger(){
	var level = 0;
	var that = this;
	var aConsoleService = Components.classes["@mozilla.org/consoleservice;1"].getService(Components.interfaces.nsIConsoleService);
	var groups = [''];
	function levPattern(_str)
	{
		var t = '';
		for(i=0;i<level;i++)
			t = t + '	';
		return t + _str;
	}
	that.group = function(_str){
		groups[groups.length] = _str;
		that.log('[ '+_str);
		level = level + 1;	
	};
	that.groupEnd = function(){
		level = level - 1;
		that.log(groups[groups.length-1]+' ]');
		groups = groups.slice(0,groups.length-1);
	};
	that.log = function(_str){
		aConsoleService.logStringMessage(levPattern(_str));		
	};
}
var logger = new Logger();
