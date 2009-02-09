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
  var pageExist = function(_file){
    var fileIn = FileIO.open(_file);
    return fileIn.exists();
  };
  
  var getPath = function(_name){
    return Options.getPath()+'/'+_name;
  };


  //public
  return {
    initLink: function(){
     var arr = doc.getElementsByClassName('internal-link'); 
     for(var i=0;i<arr.length;)
     {
       var page = new Page();
       page.name = arr.item(i).getAttribute('href');
       var path = getPath(page.name);
       if(path)
       {
         page.file = path;
         arr.item(i).setAttribute('href',path);
       }
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
