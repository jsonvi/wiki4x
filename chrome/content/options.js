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
    window.openDialog("chrome://wiki4x/content/interwikidialog.xul", "",
      "chrome, dialog, modal, resizable=yes", params).focus();
    return params;
  };
  var addRow = function(_name,_url){
    var row = document.createElement('listitem');
    var nameCell = document.createElement('listcell');
    nameCell.setAttribute("label", _name);   
    var urlCell = document.createElement('listcell');
    urlCell.setAttribute("label", _url);   
    row.appendChild(nameCell);
    row.appendChild(urlCell);
    interWikiList.appendChild(row);
  };
  var addNewInterWiki = function(_name,_url){
    if(Options.interWiki().add(_name,_url))
       addRow(_name,_url);
    else
      logger.log('add new failed');
  };
  var getSelectedInterWiki = function(){
      var index = interWikiList.selectedIndex;
      if(index == -1)
        return false;
      var item = interWikiList.getItemAtIndex(index);
      var name = item.childNodes[0];
      var url = item.childNodes[1];
      return {
        wikiIndex:index,
        remove:function(){
          interWikiList.removeItemAt(index); 
        },
        wikiName:function(_newname){
          if(_newname)
            name.setAttribute('label',_newname);
          else
            return name.getAttribute('label');
        },
        wikiUrl:function(_newurl){
          if(_newurl)
            url.setAttribute('label',_newurl);
          else
            return url.getAttribute('label');
        }
      };
  };
  var initListItems = function(){
    var wiki = Options.interWiki().getAll(); 
    for(name in wiki)
      addRow(name,wiki[name]);
  };
  //public
  return {
    init:function(){
      extTxt = document.getElementById('ext-txt');
      pathTxt = document.getElementById('path-txt');
      cssTxt = document.getElementById('css-txt');
      interWikiList = document.getElementById('inter-wiki-list');
      initListItems();
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
      Options.saveInterWiki();
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
        var result = showInterWikiDialog('','');
        addNewInterWiki(result.newName,result.newUrl); 
    },
    editInterWiki: function(){
        var wiki = getSelectedInterWiki();
        if(wiki==false)
          return;
        var result = showInterWikiDialog(wiki.wikiName(),wiki.wikiUrl());
        
        if((!result.newName) || (!result.newUrl))
          return false;
        logger.log('startedit');
        if(result.newName != wiki.wikiName())
        {
          Options.interWiki().remove(wiki.wikiName());
          addNewInterWiki(result.newName,result.newUrl);
          wiki.remove();
        }
        else
        {
          Options.interWiki().update(result.newName,result.newUrl);
          wiki.wikiUrl(result.newUrl);
        }
    },
    removeInterWiki: function(){
        var wiki = getSelectedInterWiki();
        if(wiki==false)
          return;                       
        Options.interWiki().remove(wiki.wikiName());
        wiki.remove();
    }
  };
}();



