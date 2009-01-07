//
// Common
//
function log(_msg)
{
	if(debug_mode)
	{
		var aConsoleService = Components.classes["@mozilla.org/consoleservice;1"].getService(Components.interfaces.nsIConsoleService);
		aConsoleService.logStringMessage(_msg);

	}
}
function getElementsByClassName(name, parent){
  	for(var o = [], n = new RegExp("\\b" + name.replace(/([(){}|*+?.,^$\[\]\\])/g, "\\\$1") + "\\b"), l = (parent || document).getElementsByTagName("*"), i = l.length; i--;)
  		n.test(l[i].className) && (o[o.length] = l[i]);
  	return o;
}

var Hashtable = function() {
this.data = {};
};
Hashtable.prototype.set = function(key, value) {
this.data[key] = value;
};
Hashtable.prototype.get = function(key) {
return this.data[key];
};
Hashtable.prototype.remove= function(key) {
delete this.data[key];
};

