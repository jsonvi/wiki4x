/* See license.txt for terms of usage */
var Preloader = function(){
  //private
  //
  var pageExist = function(_path){
    var fileIn = FileIO.open(_path);
    return fileIn.exists();
  };
  //public
  return {
    initLink: function(){
     var arr = doc.getElementsByClassName('InnerLink'); 
     for(var i=0;i<arr.length;)
     {
        if(!pageExist(arr.item(i).getAttribute('href')))
          arr[i].setAttribute('class','NonExistInnerLink');
        else
          i++;
     }
    }  
  };
};
