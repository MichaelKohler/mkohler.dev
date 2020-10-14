function Hammer(t,e,n){var o=this;e=function(t,e){var n={};if(!e)return t;for(var o in t)n[o]=o in e?e[o]:t[o];return n}({prevent_default:!1,css_hacks:!0,drag:!0,drag_vertical:!0,drag_horizontal:!0,drag_min_distance:20,transform:!0,scale_treshold:.1,rotation_treshold:15,tap:!0,tap_double:!0,tap_max_interval:300,tap_double_distance:20,hold:!0,hold_timeout:500},e),function(){if(!e.css_hacks)return!1;for(var n=["webkit","moz","ms","o",""],o={userSelect:"none",touchCallout:"none",userDrag:"none",tapHighlightColor:"rgba(0,0,0,0)"},a="",r=0;r<n.length;r++)for(var i in o)a=i,n[r]&&(a=n[r]+a.substring(0,1).toUpperCase()+a.substring(1)),t.style[a]=o[i]}();var a,r=0,i=0,s=0,l={},c=!1,u=null,d=null,f=null,v={x:0,y:0},m=null,h=null,p={},g=!1;function _(t){return t.touches?t.touches.length:1}function b(t){if((t=t||window.event).touches){for(var e,n=[],o=0,a=t.touches.length;o<a;o++)e=t.touches[o],n.push({x:e.pageX,y:e.pageY});return n}var r=document,i=r.body;return[{x:t.pageX||t.clientX+(r&&r.scrollLeft||i&&i.scrollLeft||0)-(r&&r.clientLeft||i&&r.clientLeft||0),y:t.pageY||t.clientY+(r&&r.scrollTop||i&&i.scrollTop||0)-(r&&r.clientTop||i&&r.clientTop||0)}]}function w(t,e){var n;e.touches=b(e.originalEvent),e.type=t,n=o["on"+t],"[object Function]"==Object.prototype.toString.call(n)&&o["on"+t].call(o,e)}function E(t){(t=t||window.event).preventDefault?t.preventDefault():(t.returnValue=!1,t.cancelBubble=!0)}this.getDirectionFromAngle=function(t){var e,n,o={down:t>=45&&t<135,left:t>=135||t<=-135,up:t<-45&&t>-135,right:t>=-45&&t<=45};for(n in o)if(o[n]){e=n;break}return e};function y(n){switch(n.type){case"mousedown":case"touchstart":l.start=b(n),f=(new Date).getTime(),_(n),c=!0,a=n;var y=t.getBoundingClientRect(),x=t.clientTop||document.body.clientTop||0,L=t.clientLeft||document.body.clientLeft||0,T=window.pageYOffset||t.scrollTop||document.body.scrollTop,M=window.pageXOffset||t.scrollLeft||document.body.scrollLeft;p={top:y.top+T-x,left:y.left+M-L},g=!0,function(t){e.hold&&(u="hold",clearTimeout(h),h=setTimeout((function(){"hold"==u&&w("hold",{originalEvent:t,position:l.start})}),e.hold_timeout))}(n),e.prevent_default&&E(n);break;case"mousemove":case"touchmove":if(!g)return!1;l.move=b(n),function(t){if(e.transform){var n=t.scale||1,o=t.rotation||0;if(2!=_(t))return!1;if("drag"!=u&&("transform"==u||Math.abs(1-n)>e.scale_treshold||Math.abs(o)>e.rotation_treshold)){u="transform",l.center={x:(l.move[0].x+l.move[1].x)/2-p.left,y:(l.move[0].y+l.move[1].y)/2-p.top};var a={originalEvent:t,position:l.center,scale:n,rotation:o};return c&&(w("transformstart",a),c=!1),w("transform",a),E(t),!0}}return!1}(n)||function(t){var n,a,d=l.move[0].x-l.start[0].x,f=l.move[0].y-l.start[0].y;if(r=Math.sqrt(d*d+f*f),e.drag&&r>e.drag_min_distance||"drag"==u){n=l.start[0],a=l.move[0],i=180*Math.atan2(a.y-n.y,a.x-n.x)/Math.PI;var v="up"==(s=o.getDirectionFromAngle(i))||"down"==s;if((v&&!e.drag_vertical||!v&&!e.drag_horizontal)&&r>e.drag_min_distance)return;u="drag";var m={originalEvent:t,position:{x:l.move[0].x-p.left,y:l.move[0].y-p.top},direction:s,distance:r,distanceX:d,distanceY:f,angle:i};c&&(w("dragstart",m),c=!1),w("drag",m),E(t)}}(n);break;case"mouseup":case"mouseout":case"touchcancel":case"touchend":if(!g||"transform"!=u&&n.touches&&n.touches.length>0)return!1;g=!1,"drag"==u?w("dragend",{originalEvent:n,direction:s,distance:r,angle:i}):"transform"==u?w("transformend",{originalEvent:n,position:l.center,scale:n.scale,rotation:n.rotation}):function(t){var n=(new Date).getTime(),o=n-f;(!e.hold||e.hold&&e.hold_timeout>o)&&(function(){if(v&&e.tap_double&&"tap"==d&&f-m<e.tap_max_interval){var t=Math.abs(v[0].x-l.start[0].x),n=Math.abs(v[0].y-l.start[0].y);return v&&l.start&&Math.max(t,n)<e.tap_double_distance}return!1}()?(u="double_tap",m=null,w("doubletap",{originalEvent:t,position:l.start}),E(t)):(u="tap",m=n,v=l.start,e.tap&&(w("tap",{originalEvent:t,position:l.start}),E(t))))}(a),d=u,l={},c=!1,r=0,i=0,u=null}}function x(t,e){if(!e&&window.event&&window.event.toElement&&(e=window.event.toElement),t===e)return!0;if(e)for(var n=e.parentNode;null!==n;){if(n===t)return!0;n=n.parentNode}return!1}"ontouchstart"in window?(t.addEventListener("touchstart",y,!1),t.addEventListener("touchmove",y,!1),t.addEventListener("touchend",y,!1),t.addEventListener("touchcancel",y,!1)):t.addEventListener?(t.addEventListener("mouseout",(function(e){x(t,e.relatedTarget)||y(e)}),!1),t.addEventListener("mouseup",y,!1),t.addEventListener("mousedown",y,!1),t.addEventListener("mousemove",y,!1)):document.attachEvent&&(t.attachEvent("onmouseout",(function(e){x(t,e.relatedTarget)||y(e)}),!1),t.attachEvent("onmouseup",y),t.attachEvent("onmousedown",y),t.attachEvent("onmousemove",y))}