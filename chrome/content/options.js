/* See license.txt for terms of usage */
Components.utils.import('resource://wiki4x/modules/options.js');

function initOptionPanel()
{
	document.getElementById('ext-txt').value = Options.getExt();
	document.getElementById('path-txt').value = Options.getPath();
	document.getElementById('css-txt').value = Options.getCss();
}
function pickHomePath()
{
    var nsIFilePicker = Components.interfaces.nsIFilePicker;
    var filePicker = Components.classes["@mozilla.org/filepicker;1"].createInstance(nsIFilePicker);
    filePicker.init(window,'',nsIFilePicker.modeGetFolder);
//    filePicker.appendFilters(nsIFilePicker.filterHTML);
    var res = filePicker.show();
    if(res == nsIFilePicker.returnCancel)
      return;
    var newpath = filePicker.file.path;
    document.getElementById('path-txt').value = newpath;

}
function pickStyleFile(){
    var nsIFilePicker = Components.interfaces.nsIFilePicker;
    var filePicker = Components.classes["@mozilla.org/filepicker;1"].createInstance(nsIFilePicker);
    filePicker.init(window,'',nsIFilePicker.modeOpen);
    filePicker.appendFilter('css','*.css');
    var res = filePicker.show();
    if(res == nsIFilePicker.returnCancel)
      return;
    var newcss = filePicker.file.path;
    document.getElementById('css-txt').value = newcss;
}
function saveOptions()
{
	var newpath = document.getElementById('path-txt').value;
	var newcss = document.getElementById('css-txt').value;
	var newext = document.getElementById('ext-txt').value;
	Options.setPath(newpath);
	Options.setCss(newcss);
	Options.setExt(newext);
}
