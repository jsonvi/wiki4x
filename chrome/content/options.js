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

  var newPrompt = function(_title,_string,_input){
      var check = {};                 
      var input = {value: _input};                  
      var prompts = Components.classes["@mozilla.org/embedcomp/prompt-service;1"]
                              .getService(Components.interfaces.nsIPromptService);

      var result = prompts.prompt(null,_title,_string, input, null,check);
      if(!result)
        return false;
      return input.value; 
  };
  var getNewItem = function(){
       var result = newPrompt(strbundle.getString("addInterWikiTitle"),
                               strbundle.getString("addInterWikiDescription"),
                               '');
        if(!result)
          return false;
        for(var i=0;i<interWikiList.getRowCount();i++)
        {
           if(interWikiList.getItemAtIndex(i).label == result)
             return false;
        }
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
           interWikiList.appendItem(result,"");
    },
    editInterWiki: function(){
        var index = interWikiList.selectedIndex;
        if(index == -1)
          return;
        var oldLabel = interWikiList.getItemAtIndex(index).label;
        var result = newPrompt('edit','edit',oldLabel);
        if(!result)
          return;
        interWikiList.getItemAtIndex(index).label = result;
    },
    removeInterWiki: function(){
        var index = interWikiList.selectedIndex;
        if(index == -1)
          return;                       
        interWikiList.removeItemAt(index);
    }
  };
}();



