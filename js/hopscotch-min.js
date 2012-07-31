(function(){var i,c,h,g,f="undefined",a=(typeof window.jQuery!==f),d=(typeof window.localStorage!==f),e=document.body.style,b=(typeof e.MozTransition!==f||typeof e.MsTransition!==f||typeof e.webkitTransition!==f||typeof e.OTransition!==f||typeof e.transition!==f);if(window.hopscotch){return}g={addClass:function(l,n){var k,m,j;if(a){$(l).addClass(n)}else{if(l.className.length===0){l.className=n}else{k=l.className.split(" ");for(m=0,j=k.length;m<j;++m){if(k[m]===n){return}}k.splice(0,0,n);l.className=k.join(" ")}}},removeClass:function(m,l){var k,n,j;if(a){$(m).removeClass(l)}else{k=m.className.split(" ");for(n=0,j=k.length;n<j;++n){if(k[n]===l){break}}if(n<j){k.splice(n,1);m.className=k.join(" ")}}},getPixelValue:function(k){var j=typeof k;if(j==="number"){return k}if(j==="string"){return parseInt(k,10)}return 0},valOrDefault:function(k,j){return typeof k!==f?k:j},getScrollTop:function(){if(typeof window.pageYOffset!==f){return window.pageYOffset}else{return document.documentElement.scrollTop}},getScrollLeft:function(){if(typeof window.pageXOffset!==f){return window.pageXOffset}else{return document.documentElement.scrollLeft}},getWindowHeight:function(){return window.innerHeight?window.innerHeight:document.documentElement.clientHeight},getWindowWidth:function(){return window.innerWidth?window.innerWidth:document.documentElement.clientWidth},addClickListener:function(k,j){return k.addEventListener?k.addEventListener("click",j):k.attachEvent("onclick",j)},evtPreventDefault:function(j){if(j.preventDefault){j.preventDefault()}else{if(event){event.returnValue=false}}},extend:function(k,j){var l;for(l in j){if(j.hasOwnProperty(l)){k[l]=j[l]}}},setState:function(m,n,o){var j="",k,l;if(d){localStorage.setItem(m,n)}else{if(o){l=new Date();l.setTime(l.getTime()+(o*24*60*60*1000));j="; expires="+l.toGMTString()}document.cookie=m+"="+n+j+"; path=/"}},getState:function(k){var m=k+"=",j=document.cookie.split(";"),l,n;if(d){return localStorage.getItem(k)}else{for(var l=0;l<j.length;l++){n=j[l];while(n.charAt(0)===" "){n=n.substring(1,n.length)}if(n.indexOf(m)===0){return n.substring(m.length,n.length)}}return null}},clearState:function(j){if(d){localStorage.removeItem(j)}else{this.setState(j,"",-1)}}};h={stepNums:null,nextBtn:"Next",prevBtn:"Back",doneBtn:"Done",closeTooltip:"Close"};c=function(q){var o,p,k,j=false,n=function(t,s){var r=document.createElement("input");r.setAttribute("id",t);r.setAttribute("type","button");r.setAttribute("value",s);g.addClass(r,"hopscotch-nav-button");return r},l=function(s,r,u){var t="hide";if(u){t="hide-all"}if(typeof r===f){r=true}if(r){g.removeClass(s,t)}else{g.addClass(s,t)}},m=function(w,u){var z,r,x,t,y,v,C=document.getElementById(u.targetId),s=w.element,B=w.arrowEl,A=g.getPixelValue(u.arrowOffset);z=g.getPixelValue(u.width)||q.bubbleWidth;x=g.valOrDefault(u.padding,q.bubblePadding);t=C.getBoundingClientRect();if(u.orientation==="top"){r=s.offsetHeight;y=(t.top-r)-q.arrowWidth;v=t.left}else{if(u.orientation==="bottom"){y=t.bottom+q.arrowWidth;v=t.left}else{if(u.orientation==="left"){y=t.top;v=t.left-z-2*x-q.arrowWidth}else{if(u.orientation==="right"){y=t.top;v=t.right+q.arrowWidth}}}}if(!A){B.style.top="";B.style.left=""}else{if(u.orientation==="top"||u.orientation==="bottom"){B.style.left=A+"px"}else{if(u.orientation==="left"||u.orientation==="right"){B.style.top=A+"px"}}}v+=g.getPixelValue(u.xOffset);y+=g.getPixelValue(u.yOffset);y+=g.getScrollTop();v+=g.getScrollLeft();if(!b&&a&&q.animate){$(s).animate({top:y+"px",left:v+"px"})}else{s.style.top=y+"px";s.style.left=v+"px"}};this.init=function(){var u=document.createElement("div"),v=document.createElement("div"),t=this,s=false,r;this.element=u;this.containerEl=v;this.titleEl=document.createElement("h3");this.numberEl=document.createElement("span");this.contentEl=document.createElement("p");u.setAttribute("id","hopscotch-bubble");v.setAttribute("id","hopscotch-bubble-container");this.numberEl.setAttribute("id","hopscotch-bubble-number");v.appendChild(this.titleEl);v.appendChild(this.numberEl);v.appendChild(this.contentEl);u.appendChild(v);this.initNavButtons();if(q&&q.showCloseButton){this.initCloseButton()}this.initArrow();window.onresize=function(){if(s||!j){return}s=true;r=setTimeout(function(){m(t,k);s=false},200)};document.body.appendChild(u);return this};this.initNavButtons=function(){var r=document.createElement("div");this.prevBtnEl=n("hopscotch-prev",h.prevBtn);this.nextBtnEl=n("hopscotch-next",h.nextBtn);this.doneBtnEl=n("hopscotch-done",h.doneBtn);g.addClass(this.doneBtnEl,"hide");r.appendChild(this.prevBtnEl);r.appendChild(this.nextBtnEl);r.appendChild(this.doneBtnEl);g.addClickListener(this.prevBtnEl,function(s){if(o){o()}window.hopscotch.prevStep()});g.addClickListener(this.nextBtnEl,function(s){if(p){p()}window.hopscotch.nextStep()});g.addClickListener(this.doneBtnEl,window.hopscotch.endTour);r.setAttribute("id","hopscotch-actions");this.buttonsEl=r;this.containerEl.appendChild(r);return this};this.initCloseButton=function(){var r=document.createElement("a");r.setAttribute("id","hopscotch-bubble-close");r.setAttribute("href","#");r.setAttribute("title",h.closeTooltip);r.innerHTML="x";g.addClickListener(r,function(s){window.hopscotch.endTour();g.evtPreventDefault(s)});this.closeBtnEl=r;this.containerEl.appendChild(r);return this};this.initArrow=function(){this.arrowEl=document.createElement("div");this.arrowEl.setAttribute("id","hopscotch-bubble-arrow");this.containerEl.appendChild(this.arrowEl)};this.renderStep=function(t,x,u,y){var z=this,s=g.valOrDefault(t.showNextButton,q.showNextButton),r=g.valOrDefault(t.showPrevButton,q.showPrevButton),w,v;k=t;if(t.title){this.setTitle(t.title)}if(t.content){this.setContent(t.content)}this.setNum(x);this.showPrevButton(this.prevBtnEl&&r&&x>0);this.showNextButton(this.nextBtnEl&&s&&!u);if(u){g.removeClass(this.doneBtnEl,"hide")}else{g.addClass(this.doneBtnEl,"hide")}this.setArrow(t.orientation);w=g.getPixelValue(t.width)||q.bubbleWidth;v=g.valOrDefault(t.padding,q.bubblePadding);this.containerEl.style.width=w+"px";this.containerEl.style.padding=v+"px";if(t.orientation==="top"){setTimeout(function(){m(z,t);if(y){y()}},5)}else{m(this,t);if(y){y()}}o=t.prevCallback;p=t.nextCallback;return this};this.setTitle=function(r){if(r){this.titleEl.innerHTML=r;g.removeClass(this.titleEl,"hide")}else{g.addClass(this.titleEl,"hide")}return this};this.setContent=function(r){if(r){this.contentEl.innerHTML=r;g.removeClass(this.contentEl,"hide")}else{g.addClass(this.contentEl,"hide")}return this};this.setNum=function(r){if(h.stepNums&&r<h.stepNums.length){r=h.stepNums[r]}else{r=r+1}this.numberEl.innerHTML=r};this.setArrow=function(r){if(r==="top"){this.arrowEl.className="down"}else{if(r==="bottom"){this.arrowEl.className="up"}else{if(r==="left"){this.arrowEl.className="right"}else{if(r==="right"){this.arrowEl.className="left"}}}}};this.show=function(){var r=this;if(q.animate){setTimeout(function(){g.addClass(r.element,"animate")},50)}g.removeClass(this.element,"hide");j=true;return this};this.hide=function(){g.addClass(this.element,"hide");g.removeClass(this.element,"animate");j=false;return this};this.showPrevButton=function(r,s){l(this.prevBtnEl,r,s)};this.showNextButton=function(r,s){l(this.nextBtnEl,r,s)};this.showCloseButton=function(r,s){l(this.closeBtnEl,r,s)};this.initAnimate=function(){var r=this;setTimeout(function(){g.addClass(r.element,"animate")},50)};this.removeAnimate=function(){g.removeClass(this.element,"animate")};this.init()};i=function(j){var q,l,o,k,s,n,m=function(){if(!q){q=new c(l)}return q},r=function(){return o.steps[k]},p=function(){var J=m().element,F=g.getPixelValue(J.style.top),E=F+g.getPixelValue(J.offsetHeight),C=document.getElementById(r().targetId),K=C.getBoundingClientRect(),H=K.top+g.getScrollTop(),D=K.bottom+g.getScrollTop(),A=(F<H)?F:H,t=(E>D)?E:D,G=g.getScrollTop(),v=G+g.getWindowHeight(),w=A-50,u,z,y,I,x,B;if(a){$("body, html").animate({scrollTop:w},l.scrollDuration);return}else{if(typeof YAHOO!==f&&typeof YAHOO.env!==f&&typeof YAHOO.env.ua!==f&&typeof YAHOO.util!==f&&typeof YAHOO.util.Scroll!==f){u=YAHOO.env.ua.webkit?document.body:document.documentElement;y=YAHOO.util.Easing?YAHOO.util.Easing.easeOut:undefined;z=new YAHOO.util.Scroll(u,{scroll:{to:[0,w]}},l.scrollDuration/1000,y);z.animate();return}}if(w<0){w=0}if(A>=G&&A<=G+50){return}if(A<G||t>v){if(l.smoothScroll){I=(G>A)?-1:1;x=Math.abs(G-A)/(l.scrollDuration/10);B=setInterval(function(){var M=g.getScrollTop(),L=M+(I*x);if((I>0&&L>=w)||I<0&&L<=w){L=w;clearInterval(B)}window.scrollTo(0,L);if(g.getScrollTop()===M){clearInterval(B)}},10)}else{window.scrollTo(0,w)}}};this.init=function(){var t,u;if(j){this.configure(j)}t=g.getState("hopscotch.tour.next");if(t){u=t.split(":");s=u[0];n=parseInt(u[1],10);if(u.length>2&&u[2]==="mp"){++n}}};this.loadTour=function(v){var u={},t,w;o=v;for(w in v){if(v.hasOwnProperty(w)&&w!=="id"&&w!=="steps"){u[w]=v[w]}}this.configure(u);t=m();t.showPrevButton(l.showPrevButton,true);t.showNextButton(l.showNextButton,true)};this.startTour=function(){var t;if(!o){throw"Need to load a tour before you start it!"}if(o.id===s&&typeof n!==f){k=n;if(!document.getElementById(o.steps[k].targetId)){if(k<=0||!document.getElementById(o.steps[--k].targetId)){this.endTour(false);return}}}else{k=0}this.showStep(k);t=m().show();if(l.animate){t.initAnimate()}this.isActive=true};this.showStep=function(w){var x=o.steps[w],v=o.steps.length,u=o.id+":"+w,t=m();if(!o){throw"No tour currently selected!"}k=w;t.renderStep(x,w,(w===v-1),p);if(x.multiPage){u+=":mp"}g.setState("hopscotch.tour.next",u,7)};this.prevStep=function(){if(k>0){this.showStep(--k)}};this.nextStep=function(){if(l.allNextCallback){l.allNextCallback(r(),k)}if(k<o.steps.length-1){this.showStep(++k)}};this.endTour=function(u){var t=m();u=g.valOrDefault(u,true);t.hide();k=n=0;if(u){g.clearState("hopscotch.tour.next")}this.isActive=false};this.configure=function(t){if(!l){l={}}g.extend(l,t);l.animate=g.valOrDefault(l.animate,false);l.smoothScroll=g.valOrDefault(l.smoothScroll,true);l.scrollDuration=g.valOrDefault(l.scrollDuration,1000);l.showCloseButton=g.valOrDefault(l.showCloseButton,true);l.showPrevButton=g.valOrDefault(l.showPrevButton,false);l.showNextButton=g.valOrDefault(l.showNextButton,true);l.bubbleWidth=g.valOrDefault(l.bubbleWidth,280);l.bubblePadding=g.valOrDefault(l.bubblePadding,10);l.arrowWidth=g.valOrDefault(l.arrowWidth,20);l.allNextCallback=g.valOrDefault(l.allNextCallback,null);if(t){g.extend(h,t.i18n)}if(l.animate){m().initAnimate()}else{m().removeAnimate()}m().showPrevButton(l.showPrevButton,true);m().showNextButton(l.showNextButton,true);m().showCloseButton(l.showCloseButton,true)};this.init(j);this.clearCookie=function(){g.clearState("hopscotch.tour.next")}};window.hopscotch=new i()}());