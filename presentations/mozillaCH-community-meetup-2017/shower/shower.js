/*! For license information please see shower.js.LICENSE.txt */
window.shower&&window.shower.init||(window.shower=function(e,t,i){var r,n={},s=e.location,o=e.console,l=t.title,a=[],d=[],u=!(!e.history||!e.history.pushState);function c(e){for(var t in e)e.hasOwnProperty(t)&&(this[t]=e[t])}for(var m in n.debugMode=!1,c.prototype={getSlideNumber:function(){return this.number},isLast:function(){return n.slideList.length===this.number+1},isFinished:function(){return this.innerComplete>=this.innerLength},process:function(e){return this.timing?(this.initTimer(e),this):(this.next(e),this)},initTimer:function(e){var t=this;return!!t.timing&&(t.stopTimer(),r=t.isFinished()?setInterval((function(){t.stopTimer(),e.next()}),t.timing*(t.innerLength||1)):setInterval((function(){t.isFinished()?(t.stopTimer(),e.next()):t.next(e)}),t.timing),this)},stopTimer:function(){return r&&(clearInterval(r),r=!1),this},prev:function(e){var i,r=this;return!r.hasInnerNavigation||r.isFinished()||0===r.innerComplete?(e.prev(),!1):!(!(i=t.getElementById(r.id).querySelectorAll(".next.active"))||i.length<1)&&(r.innerComplete>0?(r.innerComplete--,i[i.length-1].classList.remove("active")):e.prev(),this)},next:function(e){var i=this;return!i.hasInnerNavigation||i.isFinished()?(e.next(),!1):(i.isFinished()||(t.getElementById(i.id).querySelectorAll(".next:not(.active)")[0].classList.add("active"),i.innerComplete++),this)}},n._getData=function(e,t){return e.dataset?e.dataset[t]:e.getAttribute("data-"+t)},n.slideList=[],n.init=function(e,i){var r;n.debugMode&&(t.body.classList.add("debug"),o.log("Debug mode on")),e=e||".slide[data-disable=false]",i=i||"div.progress div";var s=t.createElement("section");s.className="live-region",s.setAttribute("role","region"),s.setAttribute("aria-live","assertive"),s.setAttribute("aria-relevant","additions"),s.setAttribute("aria-label","Slide Content: Auto-updating"),t.body.appendChild(s),a=t.querySelectorAll(e),d=t.querySelector(i);for(var l=0;l<a.length;l++)a[l].id||(a[l].id=l+1),(r=n._getData(a[l],"timing"))&&/^(\d{1,2}:)?\d{1,3}$/.test(r)?(-1!==r.indexOf(":")?(r=r.split(":"),r=1e3*(60*parseInt(r[0],10)+parseInt(r[1],10))):r=1e3*parseInt(r,10),0===r&&(r=!1)):r=!1,n.slideList.push(new c({id:a[l].id,number:l,hasInnerNavigation:null!==a[l].querySelector(".next"),timing:r,innerLength:a[l].querySelectorAll(".next").length,innerComplete:0}));return n},n.run=function(){var e=n.getCurrentSlideNumber(),i=t.body.classList.contains("full")||n.isSlideMode();(i&&-1===e||-1===e&&""!==s.hash)&&n.go(0),e>=0&&n.go(e),i&&n.enterSlideMode()},n._getTransform=function(){return"scale("+1/Math.max(t.body.clientWidth/e.innerWidth,t.body.clientHeight/e.innerHeight)+")"},n._applyTransform=function(e){return["WebkitTransform","MozTransform","msTransform","OTransform","transform"].forEach((function(i){t.body.style[i]=e})),!0},n._isNumber=function(e){return!isNaN(parseFloat(e))&&isFinite(e)},n._normalizeSlideNumber=function(e){if(!n._isNumber(e))throw new Error("Gimme slide number as Number, baby!");return e<0&&(e=0),e>=n.slideList.length&&(e=n.slideList.length-1),e},n._getSlideIdByEl=function(e){for(;"BODY"!==e.nodeName&&"HTML"!==e.nodeName;){if(e.classList.contains("slide"))return e.id;e=e.parentNode}return""},n._checkInteractiveElement=function(e){return"A"===e.target.nodeName},n.getSlideNumber=function(e){var t,i=n.slideList.length-1;for(""===e&&(t=0);i>=0;--i)if(e===n.slideList[i].id){t=i;break}return t},n.go=function(e,t){var i;if(!n._isNumber(e))throw new Error("Gimme slide number as Number, baby!");return!!n.slideList[e]&&(s.hash=n.getSlideHash(e),n.updateProgress(e),n.updateActiveAndVisitedSlides(e),n.isSlideMode()&&(n.showPresenterNotes(e),(i=n.slideList[e]).timing&&i.initTimer(n)),"function"==typeof t&&t(),e)},n.next=function(e){var t=n.getCurrentSlideNumber();return!!n.slideList[t+1]&&(n.go(t+1),"function"==typeof e&&e(),this)},n._turnNextSlide=function(e){var t=n.getCurrentSlideNumber(),i=n.slideList[t];n.isSlideMode()?(i.stopTimer(),i.next(n)):n.go(t+1),"function"==typeof e&&e()},n.prev=n.previous=function(e){var t=n.getCurrentSlideNumber();return!(t<1||(n.go(t-1),"function"==typeof e&&e(),0))},n._turnPreviousSlide=function(e){var t=n.getCurrentSlideNumber(),i=n.slideList[t];return i.stopTimer(),n.isSlideMode()?i.prev(n):n.go(t-1),"function"==typeof e&&e(),!0},n.first=function(e){var t=n.slideList[n.getCurrentSlideNumber()];t&&t.timing&&t.stopTimer(),n.go(0),"function"==typeof e&&e()},n.last=function(e){var t=n.slideList[n.getCurrentSlideNumber()];t&&t.timing&&t.stopTimer(),n.go(n.slideList.length-1),"function"==typeof e&&e()},n.enterSlideMode=function(e){var i=n.getCurrentSlideNumber();return t.body.classList.remove("list"),t.body.classList.add("full"),n.isListMode()&&u&&history.pushState(null,null,s.pathname+"?full"+n.getSlideHash(i)),n._applyTransform(n._getTransform()),"function"==typeof e&&e(),!0},n.enterListMode=function(e){var i;return t.body.classList.remove("full"),t.body.classList.add("list"),n.clearPresenterNotes(),n._applyTransform("none"),!n.isListMode()&&(i=n.getCurrentSlideNumber(),n.slideList[i].stopTimer(),n.isSlideMode()&&u&&history.pushState(null,null,s.pathname+n.getSlideHash(i)),n.scrollToSlide(i),"function"==typeof e&&e(),!0)},n.toggleMode=function(e){return n.isListMode()?n.enterSlideMode():n.enterListMode(),"function"==typeof e&&e(),!0},n.getCurrentSlideNumber=function(){var e=n.slideList.length-1,t=s.hash.substr(1);if(""===t)return-1;for(;e>=0;--e)if(t===n.slideList[e].id)return e;return-1},n.scrollToSlide=function(i){var r,s=!1;if(!n._isNumber(i))throw new Error("Gimme slide number as Number, baby!");if(n.isSlideMode())throw new Error("You can't scroll to because you in slide mode. Please, switch to list mode.");if(-1===i)return s;if(!n.slideList[i])throw new Error("There is no slide with number "+i);return r=t.getElementById(n.slideList[i].id),e.scrollTo(0,r.offsetTop),!0},n.isListMode=function(){return u?!/^full.*/.test(s.search.substr(1)):t.body.classList.contains("list")},n.isSlideMode=function(){return u?/^full.*/.test(s.search.substr(1)):t.body.classList.contains("full")},n.updateProgress=function(e){if(null===d)return!1;if(!n._isNumber(e))throw new Error("Gimme slide number as Number, baby!");return progressVal=(100/(n.slideList.length-1)*n._normalizeSlideNumber(e)).toFixed(2)+"%",d.style.width=progressVal,d.setAttribute("role","progressbar"),d.setAttribute("aria-valuenow",progressVal),d.setAttribute("aria-valuemin","0"),d.setAttribute("aria-valuemax","100"),d.setAttribute("aria-valuetext","Slideshow Progress: "+progressVal),!0},n.updateActiveAndVisitedSlides=function(e){var i,r,s=n.slideList.length;if(e=n._normalizeSlideNumber(e),!n._isNumber(e))throw new Error("Gimme slide number as Number, baby!");for(i=0;i<s;++i)r=t.getElementById(n.slideList[i].id),i<e?(r.classList.remove("active"),r.classList.add("visited")):i>e?(r.classList.remove("visited"),r.classList.remove("active")):(r.classList.remove("visited"),r.classList.add("active"),t.querySelector(".live-region").innerHTML=r.innerHTML);return!0},n.clearPresenterNotes=function(){n.isSlideMode()&&o&&o.clear&&!n.debugMode&&o.clear()},n.showPresenterNotes=function(e){if(n.clearPresenterNotes(),o){e=n._normalizeSlideNumber(e);var i=n.slideList[e].id,r=t.getElementById(i).querySelector("footer");r&&r.innerHTML&&o.info(r.innerHTML.replace(/\n\s+/g,"\n"));var s=n._getSlideTitle(e+1);s&&o.info("NEXT: "+s)}},n._getSlideTitle=function(e){if(!n.slideList[e])return"";var i=n.slideList[e].id,r=t.getElementById(i).querySelector("h2");return r?r.textContent.replace(/\s+/g," ").replace(/^\s+|\s+$/g,""):void 0},n.getSlideHash=function(e){if(!n._isNumber(e))throw new Error("Gimme slide number as Number, baby!");return e=n._normalizeSlideNumber(e),"#"+n.slideList[e].id},e.shower)n[m]=e.shower[m];return n.init().run(),e.addEventListener("popstate",(function(){var e=n.getCurrentSlideNumber(),i=t.body.classList.contains("full")||n.isSlideMode();n._getSlideTitle(e)?t.title=n._getSlideTitle(e)+" — "+l:t.title=l,(i&&-1===e||-1===e&&""!==s.hash)&&n.go(0),n.isListMode()?n.enterListMode():n.enterSlideMode()}),!1),e.addEventListener("resize",(function(){n.isSlideMode()&&n._applyTransform(n._getTransform())}),!1),t.addEventListener("keydown",(function(e){var t,i=n.getCurrentSlideNumber(),r=n.slideList[-1!==i?i:0];switch(e.which){case 80:n.isListMode()&&e.altKey&&e.metaKey&&(e.preventDefault(),t=r.number,n.go(t),n.enterSlideMode(),n.showPresenterNotes(t),r.timing&&r.initTimer(n));break;case 116:e.preventDefault(),n.isListMode()?(t=e.shiftKey?r.number:0,n.go(t),n.enterSlideMode(),n.showPresenterNotes(t),r.timing&&r.initTimer(n)):n.enterListMode();break;case 13:n.isListMode()&&-1!==i&&(e.preventDefault(),n.enterSlideMode(),n.showPresenterNotes(i),r.timing&&r.initTimer(n));break;case 27:n.isSlideMode()&&(e.preventDefault(),n.enterListMode());break;case 33:case 38:case 37:case 72:case 75:if(e.altKey||e.ctrlKey||e.metaKey)return;e.preventDefault(),n._turnPreviousSlide();break;case 34:case 40:case 39:case 76:case 74:if(e.altKey||e.ctrlKey||e.metaKey)return;e.preventDefault(),n._turnNextSlide();break;case 36:e.preventDefault(),n.first();break;case 35:e.preventDefault(),n.last();break;case 9:case 32:if(e.altKey||e.ctrlKey||e.metaKey)return;e.preventDefault(),n[e.shiftKey?"_turnPreviousSlide":"_turnNextSlide"]()}}),!1),t.addEventListener("click",(function(e){var t,i,r=n._getSlideIdByEl(e.target);r&&n.isListMode()&&(t=n.getSlideNumber(r),n.go(t),n.enterSlideMode(),n.showPresenterNotes(t),(i=n.slideList[t]).timing&&i.initTimer(n))}),!1),t.addEventListener("touchstart",(function(t){var i,r,s=n._getSlideIdByEl(t.target);s&&(n.isSlideMode()&&!n._checkInteractiveElement(t)&&(t.touches[0].pageX>e.innerWidth/2?n._turnNextSlide():n._turnPreviousSlide()),n.isListMode()&&(i=n.getSlideNumber(s),n.go(i),n.enterSlideMode(),n.showPresenterNotes(i),(r=n.slideList[i]).timing&&r.initTimer(n)))}),!1),t.addEventListener("touchmove",(function(e){n.isSlideMode()&&e.preventDefault()}),!1),n}(this,this.document));
//# sourceMappingURL=shower.js.map