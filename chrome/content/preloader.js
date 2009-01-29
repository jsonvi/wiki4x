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
     var links = doc.getElementsByClassName('InnerLink'); 
     logger.log('innerlinks.length='+links.length);
     for(var i=0;i<links.length;i++)
     {
        if(!pageExist(links[i].getAttribute('href')))
        {
          logger.log('link '+links[i].getAttribute('href')+' not exist');
          links[i].setAttribute('class','NonExistInnerLink');
        }
     }
    }  
  };
};
