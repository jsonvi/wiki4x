function onLoad() {
  document.getElementById("inter-wiki-name-txt").value = window.arguments[0].name;
  document.getElementById("inter-wiki-url-txt").value = window.arguments[0].url;
}

function onOK() {
   window.arguments[0].newName = document.getElementById("inter-wiki-name-txt").value;
   window.arguments[0].newUrl = document.getElementById("inter-wiki-url-txt").value;
   return true;
}

