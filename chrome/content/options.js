/* See license.txt for terms of usage */
Components.utils.import('resource://wiki4x/modules/options.js');

function initOptionPanel()
{
	document.getElementById('path-txt').value = Options.getPath();
	document.getElementById('css-txt').value = Options.getCss();
}
function saveOptions()
{
	var newpath = document.getElementById('path-txt').value;
	var newcss = document.getElementById('css-txt').value;
	Options.setPath(newpath);
	Options.setCss(newcss);
}
