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
  
  var getCategoryPath = function(_name){
    return Options.getPath()+'/'+_name;
    logger.log('get category path from '+_name+' in index file');
    // get category path from a page in index file
  };


  //public
  return {
    initLink: function(){
     var arr = doc.getElementsByClassName('internal-link'); 
     for(var i=0;i<arr.length;)
     {
       var page = new Page();
       page.name = arr.item(i).getAttribute('href');
       var withpath = page.withPath();
       if(!withpath)
       {
         var realpath = getCategoryPath(page.name);
         if(realpath)
         {
           page.file = realpath;
           arr.item(i).setAttribute('href',realpath);
         }
       }
       logger.log('page.file = '+page.file);
       page.exist = pageExist(page.file);

       if(page.exist)
         i++;
       else
       {
         arr.item(i).setAttribute('href',page.file);
         arr.item(i).setAttribute('class','non-exist-internal-link'); 
       }

     }
    }  
  };
};
