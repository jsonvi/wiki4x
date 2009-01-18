/* See license.txt for terms of usage */
Components.utils.import('resource://wiki4x/modules/options.js');

var OptGui = function(){
  //private
  var extTxt;
  var pathTxt;
  var cssTxt;
  var interWikiList;
  var strbundle;
  var getHomePath = function(){
      var nsIFilePicker = Components.interfaces.nsIFilePicker;
      var filePicker = Components.classes["@mozilla.org/filepicker;1"].createInstance(nsIFilePicker);
      filePicker.init(window,'',nsIFilePicker.modeGetFolder);
      var res = filePicker.show();
      if(res == nsIFilePicker.returnCancel)
        return false;
      return filePicker.file.path;
  };
  var getStyleFile = function(){
      var nsIFilePicker = Components.interfaces.nsIFilePicker;
      var filePicker = Components.classes["@mozilla.org/filepicker;1"].createInstance(nsIFilePicker);
      filePicker.init(window,'',nsIFilePicker.modeOpen);
      filePicker.appendFilter('css','*.css');
      var res = filePicker.show();
      if(res == nsIFilePicker.returnCancel)
        return;
      var newcss = filePicker.file.path;
      document.getElementById('css-txt').value = newcss;
  };

  var showInterWikiDialog = function(_name,_url){
  
    var params = {name:_name,url:_url,newName:null,newUrl:null};       
    window.openDialog("chrome://wiki4x/content/interwiki.xul", "",
      "chrome, dialog, modal, resizable=yes", params).focus();
    return params;
  };
  var isValidInterWiki = function(_str){
      return /^[^\|\,]+\|[^\|\,]+$/.test(_str); 
  };
  var existedInterWikiName = function(_name){
      for(var i=0;i<interWikiList.getRowCount();i++)
      {
         if(interWikiList.getItemAtIndex(i).childNodes[0].getAttribute('label') == _name)
           return true;
      }
      return false;
  };
  var getNewItem = function(){
        var result = showInterWikiDialog('','');

        if((!result.newName) || (!result.newUrl))
          return false;
        if(existedInterWikiName(result.newName))
          return false;
       /*
        if(!isValidInterWiki(result.newName))
        {
          alert(strbundle.getString("invalidInterWikiAlert"));
          return false;
        }
        */
        return result;
  };
  //public
  return {
    init:function(){
      extTxt = document.getElementById('ext-txt');
      pathTxt = document.getElementById('path-txt');
      cssTxt = document.getElementById('css-txt');
      interWikiList = document.getElementById('inter-wiki-list');
      strbundle = document.getElementById("strings");
      extTxt.value = Options.getExt();
      pathTxt.value = Options.getPath();
      cssTxt.value = Options.getCss();
    }, 
    saveOptions: function()
    {
      Options.setPath(pathTxt.value);
      Options.setCss(cssTxt.value);
      Options.setExt(extTxt.value);
    },
    pickHomePath: function(){
      var newpath = getHomePath();
      if(newpath)
        pathTxt.value = newpath;
    },
    pickStyleFile: function(){
      var newcss = getStyleFile();               
      if(newcss)
        cssTxt.value = newcss;
    },
    addInterWiki: function(){
        var result = getNewItem();
        if(result!=false)
        {
           var row = document.createElement('listitem');
           var nameCell = document.createElement('listcell');
           nameCell.setAttribute("label", result.newName);   
           var urlCell = document.createElement('listcell');
           urlCell.setAttribute("label", result.newUrl);   
           row.appendChild(nameCell);
           row.appendChild(urlCell);
           interWikiList.appendChild(row);
        }
    },
    editInterWiki: function(){
        var index = interWikiList.selectedIndex;
        if(index == -1)
          return;
        var item = interWikiList.getItemAtIndex(index);
        var name = item.childNodes[0];
        var url = item.childNodes[1];
        logger.log('name'+name);
        logger.log('name label'+name.getAttribute('label'));
        var result = showInterWikiDialog(name.getAttribute('label'),url.getAttribute('label'));

        if(result.newName && result.newUrl)
        {
          if(existedInterWikiName(result.newName))
            return false;
          var item = interWikiList.getItemAtIndex(index);
          name.setAttribute('label',result.newName);
          url.setAttribute('label',result.newUrl);
        }
    },
    removeInterWiki: function(){
        var index = interWikiList.selectedIndex;
        if(index == -1)
          return;                       
        interWikiList.removeItemAt(index);
    }
  };
}();



