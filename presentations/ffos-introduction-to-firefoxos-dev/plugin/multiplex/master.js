!function(){if(!window.location.search.match(/receiver/gi)){var e=Reveal.getConfig().multiplex,n=io.connect(e.url),i=function(i,t,d,a){if(void 0===a&&"remote"!==a){var r,v,c=Reveal.getIndices().f;void 0===c&&(c=0),i.nextElementSibling&&"SECTION"==i.parentNode.nodeName?(r=t,v=d+1):(r=t+1,v=0);var o={indexh:t,indexv:d,indexf:c,nextindexh:r,nextindexv:v,secret:e.secret,socketId:e.id};n.emit("slidechanged",o)}};Reveal.addEventListener("slidechanged",(function(e){i(e.currentSlide,e.indexh,e.indexv,e.origin)}));var t=function(e){i(Reveal.getCurrentSlide(),Reveal.getIndices().h,Reveal.getIndices().v,e.origin)};Reveal.addEventListener("fragmentshown",t),Reveal.addEventListener("fragmenthidden",t)}}();