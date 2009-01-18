/* See license.txt for terms of usage */
/*
 * todo:
 *     1. save()
 *      1.1 get all name:url pair and format them as below:
 *         name\n
 *         url\n
 *         \n
 *      1.2 write file with the formated string
 *     
 *     2. load()
 *      2.0 read file , get _str 
 *      2.1 array = _str.split('\n\n');
 *      2.2 for(i=0;i<array.length;i=i+2)
 *            that[array[i]] = array[i+1];
 */
var InterWiki = function(){
  //private
  var that = this;

  //public
  return {
    add: function(_name,_url){
      if(that[_name])
        return false;
      if(!_name)
        return false;
      if(!_url)
        return false;
      logger.log('add new:'+_name+'\n'+_url);
      that[_name] = _url;
      return true;
    },
    remove: function(_name){
      if(that[_name])
        delete that[_name];
    },
    get: function(_name){
      return that[_name];         
    },
    update: function(_name,_newurl){
      if(!that[_name])
        return;
        that[_name]=_newurl;
    }
  };
}();

// test InterWiki object
InterWiki.add('hello','www');
InterWiki.add('woooooo','123');
InterWiki.add('woooooo','123');
InterWiki.add('213','213');
InterWiki.remove('213','213');
InterWiki.update('hello','123');
logger.log('get hello 123: '+InterWiki.get('hello'));
InterWiki.update('hi','asdf');
logger.log('\nget hi undefine: '+InterWiki.get('hi'));
