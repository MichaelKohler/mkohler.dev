function goFullScreen(){var e;document.fullscreenEnabled=document.fullscreenEnabled||document.mozFullScreenEnabled||document.documentElement.webkitRequestFullScreen,document.fullscreenEnabled&&((e=document.documentElement).requestFullscreen?e.requestFullscreen():e.mozRequestFullScreen?e.mozRequestFullScreen():e.webkitRequestFullScreen&&e.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT))}!function(){var e,n=window.location,t=document.body,a=document.querySelectorAll("div.slide"),l=document.querySelector("div.progress div"),r=[],i=a.length;for("undefined"==typeof keysalive&&(keysalive=!0),e=0;e<i;e++){var c=document.createElement("button");c.className="cb",c.innerHTML="x",a[e].appendChild(c),r.push({id:a[e].id,hasInnerNavigation:null!==a[e].querySelector(".inner")})}!function(){for(var e=document.querySelectorAll("code"),n=e.length;n--;){var t=e[n].innerHTML;-1!==t.indexOf("<")&&(t=(t=t.replace(/</g,"&lt")).replace(/>/g,"&gt"),e[n].innerHTML=t)}}();var o=document.querySelectorAll("[contenteditable]"),s=o.length;function u(e){keysalive=!0}function d(e){keysalive=!1}for(;s--;)o[s].addEventListener("focus",d,!1),o[s].addEventListener("blur",u,!1);function f(){return"scale("+1/Math.max(t.clientWidth/window.innerWidth,t.clientHeight/window.innerHeight)+")"}function m(e){t.style.WebkitTransform=e,t.style.MozTransform=e,t.style.msTransform=e,t.style.OTransform=e,t.style.transform=e}function v(){t.className="full",m(f())}function h(){t.className="list",m("none")}function y(){var e,t=r.length,a=n.hash.substr(1);for(e=0;e<t;++e)if(a===r[e].id)return e;return-1}function g(e){if(-1!==e){var n=document.getElementById(r[e].id);null!==n&&window.scrollTo(0,n.offsetTop)}}function p(){return"full"!==n.search.substr(1)}function L(e){return 0>e?r.length-1:r.length<=e?0:e}function w(e){null!==l&&(l.style.width=(100/(r.length-1)*L(e)).toFixed(2)+"%")}function b(e){return"#"+r[L(e)].id}function E(e){document.getElementById(r[e].id).classList.contains("inactive")?E(a[e+1]?e+1:0):(n.hash=b(e),function(e){if(window.console&&r[e]){var n=document.querySelector("#"+r[e].id+" .notes");if(n&&console.info(n.innerHTML.replace(/\n\s+/g,"\n")),r[e+1]){var t=document.querySelector("#"+r[e+1].id+" header");t&&(t=t.innerHTML.replace(/^\s+|<[^>]+>/g,""),console.info("NEXT: "+t))}}}(e),p()||(w(e),function(e){if(a[e]){var n=a[e].querySelector("img");n&&-1!==n.src.indexOf("gif")&&(n.src=n.src)}}(e),function(e){if(a[e]&&-1!==a[e].className.indexOf("autoplay")){var n=a[e].querySelector("video");n&&n.play()}}(e)))}function S(e){var t,a=function(e){for(var n=e;"BODY"!==n.nodeName&&"HTML"!==n.nodeName;){if(n.classList.contains("slide"))return n.id;n=n.parentNode}return""}(e.target);""!==a&&p()&&(e.preventDefault(),"BUTTON"===e.target.tagName&&"cb"===e.target.className?(t=e.target.parentNode).classList.contains("inactive")?t.classList.remove("inactive"):t.classList.add("inactive"):(n.hash="#"+a,history.replaceState(null,null,n.pathname+"?full#"+a),v(),w(y())))}window.addEventListener("DOMContentLoaded",(function(){p()||(-1===y()&&history.replaceState(null,null,n.pathname+"?full"+b(0)),v(),w(y()))}),!1),window.addEventListener("popstate",(function(e){p()?(h(),g(y())):v()}),!1),window.addEventListener("resize",(function(e){p()||m(f())}),!1),document.addEventListener("keydown",(function(e){if(keysalive&&!(e.altKey||e.ctrlKey||e.metaKey)){var t=y();switch(e.which){case 116:case 13:p()&&-1!==t&&(e.preventDefault(),history.pushState(null,null,n.pathname+"?full"+b(t)),v(),w(t));break;case 27:p()||(e.preventDefault(),history.pushState(null,null,n.pathname+b(t)),h(),g(t));break;case 33:case 38:case 37:case 72:case 75:e.preventDefault(),E(--t);break;case 34:case 40:case 39:case 76:case 74:e.preventDefault(),-1!==t&&r[t].hasInnerNavigation&&-1!==function(e){if(!0!==r[e].hasInnerNavigation)return-1;var n=document.querySelectorAll(b(e)+" .active"),t=n[n.length-1].nextElementSibling;return null!==t?(t.classList.add("active"),n.length+1):-1}(t)||E(++t);break;case 36:e.preventDefault(),E(t=0);break;case 35:e.preventDefault(),E(t=r.length-1);break;case 9:case 32:e.preventDefault(),E(t+=e.shiftKey?-1:1);break;case 78:a[t].classList.toggle("peek")}}}),!1),document.addEventListener("click",S,!1),document.addEventListener("touchend",S,!1),document.addEventListener("touchstart",(function(e){if(!p()){var n=y();e.touches[0].pageX>window.innerWidth/2?n++:n--,E(n)}}),!1),document.addEventListener("touchmove",(function(e){p()||e.preventDefault()}),!1)}();