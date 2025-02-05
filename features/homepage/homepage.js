/* (function(doc){
    var scriptElm = doc.scripts[doc.scripts.length - 1];
    var warn = ['[ionicons] Deprecated script, please remove: ' + scriptElm.outerHTML];
  
    warn.push('To improve performance it is recommended to set the differential scripts in the head as follows:')
  
    var parts = scriptElm.src.split('/');
    parts.pop();
    parts.push('ionicons');
    var url = parts.join('/');
  
    var scriptElm = doc.createElement('script');
    scriptElm.setAttribute('type', 'module');
    scriptElm.src = url + '/ionicons.esm.js';
    warn.push(scriptElm.outerHTML);
    scriptElm.setAttribute('data-stencil-namespace', 'ionicons');
    doc.head.appendChild(scriptElm);
  
    
    scriptElm = doc.createElement('script');
    scriptElm.setAttribute('nomodule', '');
    scriptElm.src = url + '/ionicons.js';
    warn.push(scriptElm.outerHTML);
    scriptElm.setAttribute('data-stencil-namespace', 'ionicons');
    doc.head.appendChild(scriptElm)
    
    console.warn(warn.join('\n'));

    if (localStorage.getItem("name") === "non fasciamoci la testa") {
      
      uniLog("easter egg attivato");
      document.getElementById("UniSignMiUp").innerHTML = "<img src='http://127.0.0.1:5501/resources/assets/non fasciamoci la testa.gif' >";
    }
  
  })(document); */


  uniLog("Nome utente");
  uniLog(localStorage.getItem("name"));
  if (localStorage.getItem("name") === "non fasciamoci la testa") {
      
    uniLog("easter egg attivato", true);
    document.getElementById("UniSignMiUp").innerHTML = "<img src='http://127.0.0.1:5501/resources/assets/non fasciamoci la testa.gif' width='500' height='100' >";
    document.getElementById("easteregg").innerHTML = "<p class= 'easteregg'> Complimenti, hai appena scoperto 1 easter EGG!</p>";
  }