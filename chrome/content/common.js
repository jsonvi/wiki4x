/* See license.txt for terms of usage */
function chromeToPath (aPath) {

   if (!aPath || !(/^chrome:/.test(aPath)))
      return; //not a chrome url
   var rv;
   
   var ios = Components.classes['@mozilla.org/network/io-service;1'].getService(Components.interfaces["nsIIOService"]);
   var uri = ios.newURI(aPath, "UTF-8", null);
   var cr = Components.classes['@mozilla.org/chrome/chrome-registry;1'].getService(Components.interfaces["nsIChromeRegistry"]);
   rv = cr.convertChromeURL(uri).spec;

   if (/^file:/.test(rv))
     rv = this.urlToPath(rv);
   else
     rv = this.urlToPath("file://"+rv);

   return rv;
}
