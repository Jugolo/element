const makeListElement = function(dom){
  var obj = {};
  var l = [];
  for(var i=0;i<dom.length;i++){
    l.push(element(dom[i]));
  }
  
  obj.on = function(name, call){
    for(var i=0;i<l.length;i++)
      l[i].on(name, call);
  };
  
  obj.toggleClass = function(name){
    for(var i=0;i<l.length;i++)
      l[i].toggleClass(name);
  };
  
  obj.style = function(name, value){
    for(var i=0;i<l.length;i++)
      l[i].style(name, value);
  };
  
  obj.disable = function(bool){
    for(var i=0;i<l.length;i++)
      l[i].disable(bool);
  };
  
  return obj;
};

const makeElement = function(dom){
  var obj = {};
  
  const disableElemenets = [
    "button"
    ];
  
  obj.append = function(node){
    dom.appendChild(node);
  };
  
  obj.disable = function(bool){
    if(disableElemenets.indexOf(dom.tagName.toLowerCase()))
      return false;
    
    dom.disabled = typeof bool == "boolean" ? bool : true;
  };
  
  obj.dataGet = function(name){
    //transform normal to js
    const data = [];
    const p    = name.split("-");
    if(p.length > 0)
      data.push(p[0]);
    
    for(var i=1;i<p.length;i++)
      data.push(p[i][0].toUpperCase()+p[i].substr(1));
    
    const v = dom.dataset[data.join("")];
    if(!v)
      return null;
    return v;
  };
  
  obj.hasClass = function(name){
    return dom.classList.contains(name);
  };
  
  obj.addClass = function(name){
    dom.classList.add(name);
  };
  
  obj.removeClass = function(name){
    dom.classList.remove(name);
  };
  
  obj.toggleClass = function(name){
    if(!this.hasClass(name))
      this.addClass(name);
    else
      this.removeClass(name);
  };
  
  obj.getNode = function(){
    return dom;
  };
  
  obj.value = function(){
    if(arguments.length > 0){
      if(dom instanceof HTMLInputElement){
        dom.value = arguments[0];
        return true;
      }
      
      dom.innerHTML = arguments[0];
      return true;
    }
    
    if(dom instanceof HTMLInputElement)
      return dom.value;
    return dom.innerHTML;
  };
  
  obj.style = function(name, value){
    const piece = [];
    const p = name.split('-');
    piece.push(p[0]);
    for(var i=1;i<p.length;i++){
      piece.push(p[i][0].toUpperCase()+p[i].substr(1));
    }
    
    dom.style[piece.join("")] = value;
  };
  
  obj.isVisible = function(){
    return dom.offsetParent !== null;
  };
  
  obj.on = function(str, call){
    dom.addEventListener(str, (event) => call.call(obj, event));
  };
  
  return obj;
};

const element = function(n){
  //wee finde out wich type n is
  if(typeof n === "string"){
    var query = document.querySelectorAll(n);
    if(query.length == 0)
      return null;
    else if(query.length == 1)
      return element(query[0]);
    return element(query);
  }else if(n instanceof HTMLElement){
    return makeElement(n);
  }else if(n instanceof NodeList){
    return makeListElement(n);
  }
  
  alert(n);
};
