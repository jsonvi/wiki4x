/* See license.txt for terms of usage */
var Preloader = function(){
  //private
  //
  var Page = function(){
    return{
      name:null,
      exist:false,
      file:null,
      withPath:function(){
        var name = this.name;
        var index = name.indexOf("\/");
        return (index != -1);
      }
    };
  };
  var allpaths = new Array();
  allpaths[0] = Options.getPath();
  var pageExist = function(_file){
    var fileIn = FileIO.open(_file);
    return fileIn.exists();
  };
  
  var initPath = function(dir){
     var rootlist = new Array();
     if (dir.exists())
      rootlist = DirIO.getSubFolders(dir); 
     if (rootlist.length > 0) {
        for (var i = 0; i < rootlist.length; i++) {
          allpaths.push(rootlist[i].path);
          initPath(rootlist[i]);
        }
      }
     return rootlist;
  };
  var searchInHomePath = function(_page){
    for(var i=0;i<allpaths.length;i++)
    {
       var _file = allpaths[i]+'/'+_page;
       var fileIn = FileIO.open(_file);
       if(fileIn.exists())
         return _file;
    }
    return false;
  };

  //public
  return {
    initLink: function(){
     initPath(DirIO.open(Options.getPath()));
     var arr = doc.getElementsByClassName('internal-link'); 
     for(var i=0;i<arr.length;)
     {
       var page = new Page();
       page.name = arr.item(i).getAttribute('href');
       page.file = Options.getPath()+'/'+page.name; 
       var withpath = page.withPath();
       if(!withpath)
       {
         var realpath = searchInHomePath(page.name);
         if(realpath)
         {
           page.file = realpath;
           page.exist = true;
           arr.item(i).setAttribute('href',realpath);
         }
       }
       else
         page.exist = pageExist(page.file);

       if(page.exist)
         i++;
       else
         arr.item(i).setAttribute('class','non-exist-internal-link'); 

     }
    }  
  };
};
