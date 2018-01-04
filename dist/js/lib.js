/*!
* @license EaselJS
* Visit http://createjs.com/ for documentation, updates and examples.
*
* Copyright (c) 2011-2015 gskinner.com, inc.
*
* Distributed under the terms of the MIT license.
* http://www.opensource.org/licenses/mit-license.html
*
* This notice shall be included in all copies or substantial portions of the Software.
*/
this.createjs=this.createjs||{},createjs.extend=function(a,b){"use strict";function c(){this.constructor=a}return c.prototype=b.prototype,a.prototype=new c},this.createjs=this.createjs||{},createjs.promote=function(a,b){"use strict";var c=a.prototype,d=Object.getPrototypeOf&&Object.getPrototypeOf(c)||c.__proto__;if(d){c[(b+="_")+"constructor"]=d.constructor;for(var e in d)c.hasOwnProperty(e)&&"function"==typeof d[e]&&(c[b+e]=d[e])}return a},this.createjs=this.createjs||{},createjs.indexOf=function(a,b){"use strict";for(var c=0,d=a.length;d>c;c++)if(b===a[c])return c;return-1},this.createjs=this.createjs||{},function(){"use strict";function a(){throw"UID cannot be instantiated"}a._nextID=0,a.get=function(){return a._nextID++},createjs.UID=a}(),this.createjs=this.createjs||{},createjs.deprecate=function(a,b){"use strict";return function(){var c="Deprecated property or method '"+b+"'. See docs for info.";return console&&(console.warn?console.warn(c):console.log(c)),a&&a.apply(this,arguments)}},this.createjs=this.createjs||{},function(){"use strict";function a(a,b,c){this.type=a,this.target=null,this.currentTarget=null,this.eventPhase=0,this.bubbles=!!b,this.cancelable=!!c,this.timeStamp=(new Date).getTime(),this.defaultPrevented=!1,this.propagationStopped=!1,this.immediatePropagationStopped=!1,this.removed=!1}var b=a.prototype;b.preventDefault=function(){this.defaultPrevented=this.cancelable&&!0},b.stopPropagation=function(){this.propagationStopped=!0},b.stopImmediatePropagation=function(){this.immediatePropagationStopped=this.propagationStopped=!0},b.remove=function(){this.removed=!0},b.clone=function(){return new a(this.type,this.bubbles,this.cancelable)},b.set=function(a){for(var b in a)this[b]=a[b];return this},b.toString=function(){return"[Event (type="+this.type+")]"},createjs.Event=a}(),this.createjs=this.createjs||{},function(){"use strict";function a(){this._listeners=null,this._captureListeners=null}var b=a.prototype;a.initialize=function(a){a.addEventListener=b.addEventListener,a.on=b.on,a.removeEventListener=a.off=b.removeEventListener,a.removeAllEventListeners=b.removeAllEventListeners,a.hasEventListener=b.hasEventListener,a.dispatchEvent=b.dispatchEvent,a._dispatchEvent=b._dispatchEvent,a.willTrigger=b.willTrigger},b.addEventListener=function(a,b,c){var d;d=c?this._captureListeners=this._captureListeners||{}:this._listeners=this._listeners||{};var e=d[a];return e&&this.removeEventListener(a,b,c),e=d[a],e?e.push(b):d[a]=[b],b},b.on=function(a,b,c,d,e,f){return b.handleEvent&&(c=c||b,b=b.handleEvent),c=c||this,this.addEventListener(a,function(a){b.call(c,a,e),d&&a.remove()},f)},b.removeEventListener=function(a,b,c){var d=c?this._captureListeners:this._listeners;if(d){var e=d[a];if(e)for(var f=0,g=e.length;g>f;f++)if(e[f]==b){1==g?delete d[a]:e.splice(f,1);break}}},b.off=b.removeEventListener,b.removeAllEventListeners=function(a){a?(this._listeners&&delete this._listeners[a],this._captureListeners&&delete this._captureListeners[a]):this._listeners=this._captureListeners=null},b.dispatchEvent=function(a,b,c){if("string"==typeof a){var d=this._listeners;if(!(b||d&&d[a]))return!0;a=new createjs.Event(a,b,c)}else a.target&&a.clone&&(a=a.clone());try{a.target=this}catch(e){}if(a.bubbles&&this.parent){for(var f=this,g=[f];f.parent;)g.push(f=f.parent);var h,i=g.length;for(h=i-1;h>=0&&!a.propagationStopped;h--)g[h]._dispatchEvent(a,1+(0==h));for(h=1;i>h&&!a.propagationStopped;h++)g[h]._dispatchEvent(a,3)}else this._dispatchEvent(a,2);return!a.defaultPrevented},b.hasEventListener=function(a){var b=this._listeners,c=this._captureListeners;return!!(b&&b[a]||c&&c[a])},b.willTrigger=function(a){for(var b=this;b;){if(b.hasEventListener(a))return!0;b=b.parent}return!1},b.toString=function(){return"[EventDispatcher]"},b._dispatchEvent=function(a,b){var c,d,e=2>=b?this._captureListeners:this._listeners;if(a&&e&&(d=e[a.type])&&(c=d.length)){try{a.currentTarget=this}catch(f){}try{a.eventPhase=0|b}catch(f){}a.removed=!1,d=d.slice();for(var g=0;c>g&&!a.immediatePropagationStopped;g++){var h=d[g];h.handleEvent?h.handleEvent(a):h(a),a.removed&&(this.off(a.type,h,1==b),a.removed=!1)}}2===b&&this._dispatchEvent(a,2.1)},createjs.EventDispatcher=a}(),this.createjs=this.createjs||{},function(){"use strict";function a(){throw"Ticker cannot be instantiated."}a.RAF_SYNCHED="synched",a.RAF="raf",a.TIMEOUT="timeout",a.timingMode=null,a.maxDelta=0,a.paused=!1,a.removeEventListener=null,a.removeAllEventListeners=null,a.dispatchEvent=null,a.hasEventListener=null,a._listeners=null,createjs.EventDispatcher.initialize(a),a._addEventListener=a.addEventListener,a.addEventListener=function(){return!a._inited&&a.init(),a._addEventListener.apply(a,arguments)},a._inited=!1,a._startTime=0,a._pausedTime=0,a._ticks=0,a._pausedTicks=0,a._interval=50,a._lastTime=0,a._times=null,a._tickTimes=null,a._timerId=null,a._raf=!0,a._setInterval=function(b){a._interval=b,a._inited&&a._setupTick()},a.setInterval=createjs.deprecate(a._setInterval,"Ticker.setInterval"),a._getInterval=function(){return a._interval},a.getInterval=createjs.deprecate(a._getInterval,"Ticker.getInterval"),a._setFPS=function(b){a._setInterval(1e3/b)},a.setFPS=createjs.deprecate(a._setFPS,"Ticker.setFPS"),a._getFPS=function(){return 1e3/a._interval},a.getFPS=createjs.deprecate(a._getFPS,"Ticker.getFPS");try{Object.defineProperties(a,{interval:{get:a._getInterval,set:a._setInterval},framerate:{get:a._getFPS,set:a._setFPS}})}catch(b){console.log(b)}a.init=function(){a._inited||(a._inited=!0,a._times=[],a._tickTimes=[],a._startTime=a._getTime(),a._times.push(a._lastTime=0),a.interval=a._interval)},a.reset=function(){if(a._raf){var b=window.cancelAnimationFrame||window.webkitCancelAnimationFrame||window.mozCancelAnimationFrame||window.oCancelAnimationFrame||window.msCancelAnimationFrame;b&&b(a._timerId)}else clearTimeout(a._timerId);a.removeAllEventListeners("tick"),a._timerId=a._times=a._tickTimes=null,a._startTime=a._lastTime=a._ticks=a._pausedTime=0,a._inited=!1},a.getMeasuredTickTime=function(b){var c=0,d=a._tickTimes;if(!d||d.length<1)return-1;b=Math.min(d.length,b||0|a._getFPS());for(var e=0;b>e;e++)c+=d[e];return c/b},a.getMeasuredFPS=function(b){var c=a._times;return!c||c.length<2?-1:(b=Math.min(c.length-1,b||0|a._getFPS()),1e3/((c[0]-c[b])/b))},a.getTime=function(b){return a._startTime?a._getTime()-(b?a._pausedTime:0):-1},a.getEventTime=function(b){return a._startTime?(a._lastTime||a._startTime)-(b?a._pausedTime:0):-1},a.getTicks=function(b){return a._ticks-(b?a._pausedTicks:0)},a._handleSynch=function(){a._timerId=null,a._setupTick(),a._getTime()-a._lastTime>=.97*(a._interval-1)&&a._tick()},a._handleRAF=function(){a._timerId=null,a._setupTick(),a._tick()},a._handleTimeout=function(){a._timerId=null,a._setupTick(),a._tick()},a._setupTick=function(){if(null==a._timerId){var b=a.timingMode;if(b==a.RAF_SYNCHED||b==a.RAF){var c=window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.oRequestAnimationFrame||window.msRequestAnimationFrame;if(c)return a._timerId=c(b==a.RAF?a._handleRAF:a._handleSynch),void(a._raf=!0)}a._raf=!1,a._timerId=setTimeout(a._handleTimeout,a._interval)}},a._tick=function(){var b=a.paused,c=a._getTime(),d=c-a._lastTime;if(a._lastTime=c,a._ticks++,b&&(a._pausedTicks++,a._pausedTime+=d),a.hasEventListener("tick")){var e=new createjs.Event("tick"),f=a.maxDelta;e.delta=f&&d>f?f:d,e.paused=b,e.time=c,e.runTime=c-a._pausedTime,a.dispatchEvent(e)}for(a._tickTimes.unshift(a._getTime()-c);a._tickTimes.length>100;)a._tickTimes.pop();for(a._times.unshift(c);a._times.length>100;)a._times.pop()};var c=window,d=c.performance.now||c.performance.mozNow||c.performance.msNow||c.performance.oNow||c.performance.webkitNow;a._getTime=function(){return(d&&d.call(c.performance)||(new Date).getTime())-a._startTime},createjs.Ticker=a}(),this.createjs=this.createjs||{},function(){"use strict";function a(a){this.readyState=a.readyState,this._video=a,this._canvas=null,this._lastTime=-1,this.readyState<2&&a.addEventListener("canplaythrough",this._videoReady.bind(this))}var b=a.prototype;b.getImage=function(){if(!(this.readyState<2)){var a=this._canvas,b=this._video;if(a||(a=this._canvas=createjs.createCanvas?createjs.createCanvas():document.createElement("canvas"),a.width=b.videoWidth,a.height=b.videoHeight),b.readyState>=2&&b.currentTime!==this._lastTime){var c=a.getContext("2d");c.clearRect(0,0,a.width,a.height),c.drawImage(b,0,0,a.width,a.height),this._lastTime=b.currentTime}return a}},b._videoReady=function(){this.readyState=2},createjs.VideoBuffer=a}(),this.createjs=this.createjs||{},function(){"use strict";function a(a,b,c,d,e,f,g,h,i,j,k){this.Event_constructor(a,b,c),this.stageX=d,this.stageY=e,this.rawX=null==i?d:i,this.rawY=null==j?e:j,this.nativeEvent=f,this.pointerID=g,this.primary=!!h,this.relatedTarget=k}var b=createjs.extend(a,createjs.Event);b._get_localX=function(){return this.currentTarget.globalToLocal(this.rawX,this.rawY).x},b._get_localY=function(){return this.currentTarget.globalToLocal(this.rawX,this.rawY).y},b._get_isTouch=function(){return-1!==this.pointerID};try{Object.defineProperties(b,{localX:{get:b._get_localX},localY:{get:b._get_localY},isTouch:{get:b._get_isTouch}})}catch(c){}b.clone=function(){return new a(this.type,this.bubbles,this.cancelable,this.stageX,this.stageY,this.nativeEvent,this.pointerID,this.primary,this.rawX,this.rawY)},b.toString=function(){return"[MouseEvent (type="+this.type+" stageX="+this.stageX+" stageY="+this.stageY+")]"},createjs.MouseEvent=createjs.promote(a,"Event")}(),this.createjs=this.createjs||{},function(){"use strict";function a(a,b,c,d,e,f){this.setValues(a,b,c,d,e,f)}var b=a.prototype;a.DEG_TO_RAD=Math.PI/180,a.identity=null,b.setValues=function(a,b,c,d,e,f){return this.a=null==a?1:a,this.b=b||0,this.c=c||0,this.d=null==d?1:d,this.tx=e||0,this.ty=f||0,this},b.append=function(a,b,c,d,e,f){var g=this.a,h=this.b,i=this.c,j=this.d;return(1!=a||0!=b||0!=c||1!=d)&&(this.a=g*a+i*b,this.b=h*a+j*b,this.c=g*c+i*d,this.d=h*c+j*d),this.tx=g*e+i*f+this.tx,this.ty=h*e+j*f+this.ty,this},b.prepend=function(a,b,c,d,e,f){var g=this.a,h=this.c,i=this.tx;return this.a=a*g+c*this.b,this.b=b*g+d*this.b,this.c=a*h+c*this.d,this.d=b*h+d*this.d,this.tx=a*i+c*this.ty+e,this.ty=b*i+d*this.ty+f,this},b.appendMatrix=function(a){return this.append(a.a,a.b,a.c,a.d,a.tx,a.ty)},b.prependMatrix=function(a){return this.prepend(a.a,a.b,a.c,a.d,a.tx,a.ty)},b.appendTransform=function(b,c,d,e,f,g,h,i,j){if(f%360)var k=f*a.DEG_TO_RAD,l=Math.cos(k),m=Math.sin(k);else l=1,m=0;return g||h?(g*=a.DEG_TO_RAD,h*=a.DEG_TO_RAD,this.append(Math.cos(h),Math.sin(h),-Math.sin(g),Math.cos(g),b,c),this.append(l*d,m*d,-m*e,l*e,0,0)):this.append(l*d,m*d,-m*e,l*e,b,c),(i||j)&&(this.tx-=i*this.a+j*this.c,this.ty-=i*this.b+j*this.d),this},b.prependTransform=function(b,c,d,e,f,g,h,i,j){if(f%360)var k=f*a.DEG_TO_RAD,l=Math.cos(k),m=Math.sin(k);else l=1,m=0;return(i||j)&&(this.tx-=i,this.ty-=j),g||h?(g*=a.DEG_TO_RAD,h*=a.DEG_TO_RAD,this.prepend(l*d,m*d,-m*e,l*e,0,0),this.prepend(Math.cos(h),Math.sin(h),-Math.sin(g),Math.cos(g),b,c)):this.prepend(l*d,m*d,-m*e,l*e,b,c),this},b.rotate=function(b){b*=a.DEG_TO_RAD;var c=Math.cos(b),d=Math.sin(b),e=this.a,f=this.b;return this.a=e*c+this.c*d,this.b=f*c+this.d*d,this.c=-e*d+this.c*c,this.d=-f*d+this.d*c,this},b.skew=function(b,c){return b*=a.DEG_TO_RAD,c*=a.DEG_TO_RAD,this.append(Math.cos(c),Math.sin(c),-Math.sin(b),Math.cos(b),0,0),this},b.scale=function(a,b){return this.a*=a,this.b*=a,this.c*=b,this.d*=b,this},b.translate=function(a,b){return this.tx+=this.a*a+this.c*b,this.ty+=this.b*a+this.d*b,this},b.identity=function(){return this.a=this.d=1,this.b=this.c=this.tx=this.ty=0,this},b.invert=function(){var a=this.a,b=this.b,c=this.c,d=this.d,e=this.tx,f=a*d-b*c;return this.a=d/f,this.b=-b/f,this.c=-c/f,this.d=a/f,this.tx=(c*this.ty-d*e)/f,this.ty=-(a*this.ty-b*e)/f,this},b.isIdentity=function(){return 0===this.tx&&0===this.ty&&1===this.a&&0===this.b&&0===this.c&&1===this.d},b.equals=function(a){return this.tx===a.tx&&this.ty===a.ty&&this.a===a.a&&this.b===a.b&&this.c===a.c&&this.d===a.d},b.transformPoint=function(a,b,c){return c=c||{},c.x=a*this.a+b*this.c+this.tx,c.y=a*this.b+b*this.d+this.ty,c},b.decompose=function(b){null==b&&(b={}),b.x=this.tx,b.y=this.ty,b.scaleX=Math.sqrt(this.a*this.a+this.b*this.b),b.scaleY=Math.sqrt(this.c*this.c+this.d*this.d);var c=Math.atan2(-this.c,this.d),d=Math.atan2(this.b,this.a),e=Math.abs(1-c/d);return 1e-5>e?(b.rotation=d/a.DEG_TO_RAD,this.a<0&&this.d>=0&&(b.rotation+=b.rotation<=0?180:-180),b.skewX=b.skewY=0):(b.skewX=c/a.DEG_TO_RAD,b.skewY=d/a.DEG_TO_RAD),b},b.copy=function(a){return this.setValues(a.a,a.b,a.c,a.d,a.tx,a.ty)},b.clone=function(){return new a(this.a,this.b,this.c,this.d,this.tx,this.ty)},b.toString=function(){return"[Matrix2D (a="+this.a+" b="+this.b+" c="+this.c+" d="+this.d+" tx="+this.tx+" ty="+this.ty+")]"},a.identity=new a,createjs.Matrix2D=a}(),this.createjs=this.createjs||{},function(){"use strict";function a(a,b,c,d,e){this.setValues(a,b,c,d,e)}var b=a.prototype;b.setValues=function(a,b,c,d,e){return this.visible=null==a?!0:!!a,this.alpha=null==b?1:b,this.shadow=c,this.compositeOperation=d,this.matrix=e||this.matrix&&this.matrix.identity()||new createjs.Matrix2D,this},b.append=function(a,b,c,d,e){return this.alpha*=b,this.shadow=c||this.shadow,this.compositeOperation=d||this.compositeOperation,this.visible=this.visible&&a,e&&this.matrix.appendMatrix(e),this},b.prepend=function(a,b,c,d,e){return this.alpha*=b,this.shadow=this.shadow||c,this.compositeOperation=this.compositeOperation||d,this.visible=this.visible&&a,e&&this.matrix.prependMatrix(e),this},b.identity=function(){return this.visible=!0,this.alpha=1,this.shadow=this.compositeOperation=null,this.matrix.identity(),this},b.clone=function(){return new a(this.alpha,this.shadow,this.compositeOperation,this.visible,this.matrix.clone())},createjs.DisplayProps=a}(),this.createjs=this.createjs||{},function(){"use strict";function a(a,b){this.setValues(a,b)}var b=a.prototype;b.setValues=function(a,b){return this.x=a||0,this.y=b||0,this},b.copy=function(a){return this.x=a.x,this.y=a.y,this},b.clone=function(){return new a(this.x,this.y)},b.toString=function(){return"[Point (x="+this.x+" y="+this.y+")]"},createjs.Point=a}(),this.createjs=this.createjs||{},function(){"use strict";function a(a,b,c,d){this.setValues(a,b,c,d)}var b=a.prototype;b.setValues=function(a,b,c,d){return this.x=a||0,this.y=b||0,this.width=c||0,this.height=d||0,this},b.extend=function(a,b,c,d){return c=c||0,d=d||0,a+c>this.x+this.width&&(this.width=a+c-this.x),b+d>this.y+this.height&&(this.height=b+d-this.y),a<this.x&&(this.width+=this.x-a,this.x=a),b<this.y&&(this.height+=this.y-b,this.y=b),this},b.pad=function(a,b,c,d){return this.x-=b,this.y-=a,this.width+=b+d,this.height+=a+c,this},b.copy=function(a){return this.setValues(a.x,a.y,a.width,a.height)},b.contains=function(a,b,c,d){return c=c||0,d=d||0,a>=this.x&&a+c<=this.x+this.width&&b>=this.y&&b+d<=this.y+this.height},b.union=function(a){return this.clone().extend(a.x,a.y,a.width,a.height)},b.intersection=function(b){var c=b.x,d=b.y,e=c+b.width,f=d+b.height;return this.x>c&&(c=this.x),this.y>d&&(d=this.y),this.x+this.width<e&&(e=this.x+this.width),this.y+this.height<f&&(f=this.y+this.height),c>=e||d>=f?null:new a(c,d,e-c,f-d)},b.intersects=function(a){return a.x<=this.x+this.width&&this.x<=a.x+a.width&&a.y<=this.y+this.height&&this.y<=a.y+a.height},b.isEmpty=function(){return this.width<=0||this.height<=0},b.clone=function(){return new a(this.x,this.y,this.width,this.height)},b.toString=function(){return"[Rectangle (x="+this.x+" y="+this.y+" width="+this.width+" height="+this.height+")]"},createjs.Rectangle=a}(),this.createjs=this.createjs||{},function(){"use strict";function a(a,b,c,d,e,f,g){a.addEventListener&&(this.target=a,this.overLabel=null==c?"over":c,this.outLabel=null==b?"out":b,this.downLabel=null==d?"down":d,this.play=e,this._isPressed=!1,this._isOver=!1,this._enabled=!1,a.mouseChildren=!1,this.enabled=!0,this.handleEvent({}),f&&(g&&(f.actionsEnabled=!1,f.gotoAndStop&&f.gotoAndStop(g)),a.hitArea=f))}var b=a.prototype;b._setEnabled=function(a){if(a!=this._enabled){var b=this.target;this._enabled=a,a?(b.cursor="pointer",b.addEventListener("rollover",this),b.addEventListener("rollout",this),b.addEventListener("mousedown",this),b.addEventListener("pressup",this),b._reset&&(b.__reset=b._reset,b._reset=this._reset)):(b.cursor=null,b.removeEventListener("rollover",this),b.removeEventListener("rollout",this),b.removeEventListener("mousedown",this),b.removeEventListener("pressup",this),b.__reset&&(b._reset=b.__reset,delete b.__reset))}},b.setEnabled=createjs.deprecate(b._setEnabled,"ButtonHelper.setEnabled"),b._getEnabled=function(){return this._enabled},b.getEnabled=createjs.deprecate(b._getEnabled,"ButtonHelper.getEnabled");try{Object.defineProperties(b,{enabled:{get:b._getEnabled,set:b._setEnabled}})}catch(c){}b.toString=function(){return"[ButtonHelper]"},b.handleEvent=function(a){var b,c=this.target,d=a.type;"mousedown"==d?(this._isPressed=!0,b=this.downLabel):"pressup"==d?(this._isPressed=!1,b=this._isOver?this.overLabel:this.outLabel):"rollover"==d?(this._isOver=!0,b=this._isPressed?this.downLabel:this.overLabel):(this._isOver=!1,b=this._isPressed?this.overLabel:this.outLabel),this.play?c.gotoAndPlay&&c.gotoAndPlay(b):c.gotoAndStop&&c.gotoAndStop(b)},b._reset=function(){var a=this.paused;this.__reset(),this.paused=a},createjs.ButtonHelper=a}(),this.createjs=this.createjs||{},function(){"use strict";function a(a,b,c,d){this.color=a||"black",this.offsetX=b||0,this.offsetY=c||0,this.blur=d||0}var b=a.prototype;a.identity=new a("transparent",0,0,0),b.toString=function(){return"[Shadow]"},b.clone=function(){return new a(this.color,this.offsetX,this.offsetY,this.blur)},createjs.Shadow=a}(),this.createjs=this.createjs||{},function(){"use strict";function a(a){this.EventDispatcher_constructor(),this.complete=!0,this.framerate=0,this._animations=null,this._frames=null,this._images=null,this._data=null,this._loadCount=0,this._frameHeight=0,this._frameWidth=0,this._numFrames=0,this._regX=0,this._regY=0,this._spacing=0,this._margin=0,this._parseData(a)}var b=createjs.extend(a,createjs.EventDispatcher);b._getAnimations=function(){return this._animations.slice()},b.getAnimations=createjs.deprecate(b._getAnimations,"SpriteSheet.getAnimations");try{Object.defineProperties(b,{animations:{get:b._getAnimations}})}catch(c){}b.getNumFrames=function(a){if(null==a)return this._frames?this._frames.length:this._numFrames||0;var b=this._data[a];return null==b?0:b.frames.length},b.getAnimation=function(a){return this._data[a]},b.getFrame=function(a){var b;return this._frames&&(b=this._frames[a])?b:null},b.getFrameBounds=function(a,b){var c=this.getFrame(a);return c?(b||new createjs.Rectangle).setValues(-c.regX,-c.regY,c.rect.width,c.rect.height):null},b.toString=function(){return"[SpriteSheet]"},b.clone=function(){throw"SpriteSheet cannot be cloned."},b._parseData=function(a){var b,c,d,e;if(null!=a){if(this.framerate=a.framerate||0,a.images&&(c=a.images.length)>0)for(e=this._images=[],b=0;c>b;b++){var f=a.images[b];if("string"==typeof f){var g=f;f=document.createElement("img"),f.src=g}e.push(f),f.getContext||f.naturalWidth||(this._loadCount++,this.complete=!1,function(a,b){f.onload=function(){a._handleImageLoad(b)}}(this,g),function(a,b){f.onerror=function(){a._handleImageError(b)}}(this,g))}if(null==a.frames);else if(Array.isArray(a.frames))for(this._frames=[],e=a.frames,b=0,c=e.length;c>b;b++){var h=e[b];this._frames.push({image:this._images[h[4]?h[4]:0],rect:new createjs.Rectangle(h[0],h[1],h[2],h[3]),regX:h[5]||0,regY:h[6]||0})}else d=a.frames,this._frameWidth=d.width,this._frameHeight=d.height,this._regX=d.regX||0,this._regY=d.regY||0,this._spacing=d.spacing||0,this._margin=d.margin||0,this._numFrames=d.count,0==this._loadCount&&this._calculateFrames();if(this._animations=[],null!=(d=a.animations)){this._data={};var i;for(i in d){var j={name:i},k=d[i];if("number"==typeof k)e=j.frames=[k];else if(Array.isArray(k))if(1==k.length)j.frames=[k[0]];else for(j.speed=k[3],j.next=k[2],e=j.frames=[],b=k[0];b<=k[1];b++)e.push(b);else{j.speed=k.speed,j.next=k.next;var l=k.frames;e=j.frames="number"==typeof l?[l]:l.slice(0)}(j.next===!0||void 0===j.next)&&(j.next=i),(j.next===!1||e.length<2&&j.next==i)&&(j.next=null),j.speed||(j.speed=1),this._animations.push(i),this._data[i]=j}}}},b._handleImageLoad=function(){0==--this._loadCount&&(this._calculateFrames(),this.complete=!0,this.dispatchEvent("complete"))},b._handleImageError=function(a){var b=new createjs.Event("error");b.src=a,this.dispatchEvent(b),0==--this._loadCount&&this.dispatchEvent("complete")},b._calculateFrames=function(){if(!this._frames&&0!=this._frameWidth){this._frames=[];var a=this._numFrames||1e5,b=0,c=this._frameWidth,d=this._frameHeight,e=this._spacing,f=this._margin;a:for(var g=0,h=this._images;g<h.length;g++)for(var i=h[g],j=i.width||i.naturalWidth,k=i.height||i.naturalHeight,l=f;k-f-d>=l;){for(var m=f;j-f-c>=m;){if(b>=a)break a;b++,this._frames.push({image:i,rect:new createjs.Rectangle(m,l,c,d),regX:this._regX,regY:this._regY}),m+=c+e}l+=d+e}this._numFrames=b}},createjs.SpriteSheet=createjs.promote(a,"EventDispatcher")}(),this.createjs=this.createjs||{},function(){"use strict";function a(){this.command=null,this._stroke=null,this._strokeStyle=null,this._oldStrokeStyle=null,this._strokeDash=null,this._oldStrokeDash=null,this._strokeIgnoreScale=!1,this._fill=null,this._instructions=[],this._commitIndex=0,this._activeInstructions=[],this._dirty=!1,this._storeIndex=0,this.clear()}var b=a.prototype,c=a;a.getRGB=function(a,b,c,d){return null!=a&&null==c&&(d=b,c=255&a,b=a>>8&255,a=a>>16&255),null==d?"rgb("+a+","+b+","+c+")":"rgba("+a+","+b+","+c+","+d+")"},a.getHSL=function(a,b,c,d){return null==d?"hsl("+a%360+","+b+"%,"+c+"%)":"hsla("+a%360+","+b+"%,"+c+"%,"+d+")"},a.BASE_64={A:0,B:1,C:2,D:3,E:4,F:5,G:6,H:7,I:8,J:9,K:10,L:11,M:12,N:13,O:14,P:15,Q:16,R:17,S:18,T:19,U:20,V:21,W:22,X:23,Y:24,Z:25,a:26,b:27,c:28,d:29,e:30,f:31,g:32,h:33,i:34,j:35,k:36,l:37,m:38,n:39,o:40,p:41,q:42,r:43,s:44,t:45,u:46,v:47,w:48,x:49,y:50,z:51,0:52,1:53,2:54,3:55,4:56,5:57,6:58,7:59,8:60,9:61,"+":62,"/":63},a.STROKE_CAPS_MAP=["butt","round","square"],a.STROKE_JOINTS_MAP=["miter","round","bevel"];var d=createjs.createCanvas?createjs.createCanvas():document.createElement("canvas");d.getContext&&(a._ctx=d.getContext("2d"),d.width=d.height=1),b._getInstructions=function(){return this._updateInstructions(),this._instructions},b.getInstructions=createjs.deprecate(b._getInstructions,"Graphics.getInstructions");try{Object.defineProperties(b,{instructions:{get:b._getInstructions}})}catch(e){}b.isEmpty=function(){return!(this._instructions.length||this._activeInstructions.length)},b.draw=function(a,b){this._updateInstructions();for(var c=this._instructions,d=this._storeIndex,e=c.length;e>d;d++)c[d].exec(a,b)},b.drawAsPath=function(a){this._updateInstructions();for(var b,c=this._instructions,d=this._storeIndex,e=c.length;e>d;d++)(b=c[d]).path!==!1&&b.exec(a)},b.moveTo=function(a,b){return this.append(new c.MoveTo(a,b),!0)},b.lineTo=function(a,b){return this.append(new c.LineTo(a,b))},b.arcTo=function(a,b,d,e,f){return this.append(new c.ArcTo(a,b,d,e,f))},b.arc=function(a,b,d,e,f,g){return this.append(new c.Arc(a,b,d,e,f,g))},b.quadraticCurveTo=function(a,b,d,e){return this.append(new c.QuadraticCurveTo(a,b,d,e))},b.bezierCurveTo=function(a,b,d,e,f,g){return this.append(new c.BezierCurveTo(a,b,d,e,f,g))},b.rect=function(a,b,d,e){return this.append(new c.Rect(a,b,d,e))},b.closePath=function(){return this._activeInstructions.length?this.append(new c.ClosePath):this},b.clear=function(){return this._instructions.length=this._activeInstructions.length=this._commitIndex=0,this._strokeStyle=this._oldStrokeStyle=this._stroke=this._fill=this._strokeDash=this._oldStrokeDash=null,this._dirty=this._strokeIgnoreScale=!1,this},b.beginFill=function(a){return this._setFill(a?new c.Fill(a):null)},b.beginLinearGradientFill=function(a,b,d,e,f,g){return this._setFill((new c.Fill).linearGradient(a,b,d,e,f,g))},b.beginRadialGradientFill=function(a,b,d,e,f,g,h,i){return this._setFill((new c.Fill).radialGradient(a,b,d,e,f,g,h,i))},b.beginBitmapFill=function(a,b,d){return this._setFill(new c.Fill(null,d).bitmap(a,b))},b.endFill=function(){return this.beginFill()},b.setStrokeStyle=function(a,b,d,e,f){return this._updateInstructions(!0),this._strokeStyle=this.command=new c.StrokeStyle(a,b,d,e,f),this._stroke&&(this._stroke.ignoreScale=f),this._strokeIgnoreScale=f,this},b.setStrokeDash=function(a,b){return this._updateInstructions(!0),this._strokeDash=this.command=new c.StrokeDash(a,b),this},b.beginStroke=function(a){return this._setStroke(a?new c.Stroke(a):null)},b.beginLinearGradientStroke=function(a,b,d,e,f,g){return this._setStroke((new c.Stroke).linearGradient(a,b,d,e,f,g))},b.beginRadialGradientStroke=function(a,b,d,e,f,g,h,i){return this._setStroke((new c.Stroke).radialGradient(a,b,d,e,f,g,h,i))},b.beginBitmapStroke=function(a,b){return this._setStroke((new c.Stroke).bitmap(a,b))},b.endStroke=function(){return this.beginStroke()},b.curveTo=b.quadraticCurveTo,b.drawRect=b.rect,b.drawRoundRect=function(a,b,c,d,e){return this.drawRoundRectComplex(a,b,c,d,e,e,e,e)},b.drawRoundRectComplex=function(a,b,d,e,f,g,h,i){return this.append(new c.RoundRect(a,b,d,e,f,g,h,i))},b.drawCircle=function(a,b,d){return this.append(new c.Circle(a,b,d))},b.drawEllipse=function(a,b,d,e){return this.append(new c.Ellipse(a,b,d,e))},b.drawPolyStar=function(a,b,d,e,f,g){return this.append(new c.PolyStar(a,b,d,e,f,g))},b.append=function(a,b){return this._activeInstructions.push(a),this.command=a,b||(this._dirty=!0),this},b.decodePath=function(b){for(var c=[this.moveTo,this.lineTo,this.quadraticCurveTo,this.bezierCurveTo,this.closePath],d=[2,2,4,6,0],e=0,f=b.length,g=[],h=0,i=0,j=a.BASE_64;f>e;){var k=b.charAt(e),l=j[k],m=l>>3,n=c[m];if(!n||3&l)throw"bad path data (@"+e+"): "+k;var o=d[m];m||(h=i=0),g.length=0,e++;for(var p=(l>>2&1)+2,q=0;o>q;q++){var r=j[b.charAt(e)],s=r>>5?-1:1;r=(31&r)<<6|j[b.charAt(e+1)],3==p&&(r=r<<6|j[b.charAt(e+2)]),r=s*r/10,q%2?h=r+=h:i=r+=i,g[q]=r,e+=p}n.apply(this,g)}return this},b.store=function(){return this._updateInstructions(!0),this._storeIndex=this._instructions.length,this},b.unstore=function(){return this._storeIndex=0,this},b.clone=function(){var b=new a;return b.command=this.command,b._stroke=this._stroke,b._strokeStyle=this._strokeStyle,b._strokeDash=this._strokeDash,b._strokeIgnoreScale=this._strokeIgnoreScale,b._fill=this._fill,b._instructions=this._instructions.slice(),b._commitIndex=this._commitIndex,b._activeInstructions=this._activeInstructions.slice(),b._dirty=this._dirty,b._storeIndex=this._storeIndex,b},b.toString=function(){return"[Graphics]"},b.mt=b.moveTo,b.lt=b.lineTo,b.at=b.arcTo,b.bt=b.bezierCurveTo,b.qt=b.quadraticCurveTo,b.a=b.arc,b.r=b.rect,b.cp=b.closePath,b.c=b.clear,b.f=b.beginFill,b.lf=b.beginLinearGradientFill,b.rf=b.beginRadialGradientFill,b.bf=b.beginBitmapFill,b.ef=b.endFill,b.ss=b.setStrokeStyle,b.sd=b.setStrokeDash,b.s=b.beginStroke,b.ls=b.beginLinearGradientStroke,b.rs=b.beginRadialGradientStroke,b.bs=b.beginBitmapStroke,b.es=b.endStroke,b.dr=b.drawRect,b.rr=b.drawRoundRect,b.rc=b.drawRoundRectComplex,b.dc=b.drawCircle,b.de=b.drawEllipse,b.dp=b.drawPolyStar,b.p=b.decodePath,b._updateInstructions=function(b){var c=this._instructions,d=this._activeInstructions,e=this._commitIndex;if(this._dirty&&d.length){c.length=e,c.push(a.beginCmd);var f=d.length,g=c.length;c.length=g+f;for(var h=0;f>h;h++)c[h+g]=d[h];this._fill&&c.push(this._fill),this._stroke&&(this._strokeDash!==this._oldStrokeDash&&c.push(this._strokeDash),this._strokeStyle!==this._oldStrokeStyle&&c.push(this._strokeStyle),b&&(this._oldStrokeStyle=this._strokeStyle,this._oldStrokeDash=this._strokeDash),c.push(this._stroke)),this._dirty=!1}b&&(d.length=0,this._commitIndex=c.length)},b._setFill=function(a){return this._updateInstructions(!0),this.command=this._fill=a,this},b._setStroke=function(a){return this._updateInstructions(!0),(this.command=this._stroke=a)&&(a.ignoreScale=this._strokeIgnoreScale),this},(c.LineTo=function(a,b){this.x=a,this.y=b}).prototype.exec=function(a){a.lineTo(this.x,this.y)},(c.MoveTo=function(a,b){this.x=a,this.y=b}).prototype.exec=function(a){a.moveTo(this.x,this.y)},(c.ArcTo=function(a,b,c,d,e){this.x1=a,this.y1=b,this.x2=c,this.y2=d,this.radius=e}).prototype.exec=function(a){a.arcTo(this.x1,this.y1,this.x2,this.y2,this.radius)},(c.Arc=function(a,b,c,d,e,f){this.x=a,this.y=b,this.radius=c,this.startAngle=d,this.endAngle=e,this.anticlockwise=!!f}).prototype.exec=function(a){a.arc(this.x,this.y,this.radius,this.startAngle,this.endAngle,this.anticlockwise)},(c.QuadraticCurveTo=function(a,b,c,d){this.cpx=a,this.cpy=b,this.x=c,this.y=d}).prototype.exec=function(a){a.quadraticCurveTo(this.cpx,this.cpy,this.x,this.y)},(c.BezierCurveTo=function(a,b,c,d,e,f){this.cp1x=a,this.cp1y=b,this.cp2x=c,this.cp2y=d,this.x=e,this.y=f}).prototype.exec=function(a){a.bezierCurveTo(this.cp1x,this.cp1y,this.cp2x,this.cp2y,this.x,this.y)},(c.Rect=function(a,b,c,d){this.x=a,this.y=b,this.w=c,this.h=d}).prototype.exec=function(a){a.rect(this.x,this.y,this.w,this.h)},(c.ClosePath=function(){}).prototype.exec=function(a){a.closePath()},(c.BeginPath=function(){}).prototype.exec=function(a){a.beginPath()},b=(c.Fill=function(a,b){this.style=a,this.matrix=b}).prototype,b.exec=function(a){if(this.style){a.fillStyle=this.style;var b=this.matrix;b&&(a.save(),a.transform(b.a,b.b,b.c,b.d,b.tx,b.ty)),a.fill(),b&&a.restore()}},b.linearGradient=function(b,c,d,e,f,g){for(var h=this.style=a._ctx.createLinearGradient(d,e,f,g),i=0,j=b.length;j>i;i++)h.addColorStop(c[i],b[i]);return h.props={colors:b,ratios:c,x0:d,y0:e,x1:f,y1:g,type:"linear"},this},b.radialGradient=function(b,c,d,e,f,g,h,i){for(var j=this.style=a._ctx.createRadialGradient(d,e,f,g,h,i),k=0,l=b.length;l>k;k++)j.addColorStop(c[k],b[k]);return j.props={colors:b,ratios:c,x0:d,y0:e,r0:f,x1:g,y1:h,r1:i,type:"radial"},this},b.bitmap=function(b,c){if(b.naturalWidth||b.getContext||b.readyState>=2){var d=this.style=a._ctx.createPattern(b,c||"");d.props={image:b,repetition:c,type:"bitmap"}}return this},b.path=!1,b=(c.Stroke=function(a,b){this.style=a,this.ignoreScale=b}).prototype,b.exec=function(a){this.style&&(a.strokeStyle=this.style,this.ignoreScale&&(a.save(),a.setTransform(1,0,0,1,0,0)),a.stroke(),this.ignoreScale&&a.restore())},b.linearGradient=c.Fill.prototype.linearGradient,b.radialGradient=c.Fill.prototype.radialGradient,b.bitmap=c.Fill.prototype.bitmap,b.path=!1,b=(c.StrokeStyle=function(a,b,c,d,e){this.width=a,this.caps=b,this.joints=c,this.miterLimit=d,this.ignoreScale=e}).prototype,b.exec=function(b){b.lineWidth=null==this.width?"1":this.width,b.lineCap=null==this.caps?"butt":isNaN(this.caps)?this.caps:a.STROKE_CAPS_MAP[this.caps],b.lineJoin=null==this.joints?"miter":isNaN(this.joints)?this.joints:a.STROKE_JOINTS_MAP[this.joints],b.miterLimit=null==this.miterLimit?"10":this.miterLimit,b.ignoreScale=null==this.ignoreScale?!1:this.ignoreScale},b.path=!1,(c.StrokeDash=function(a,b){this.segments=a,this.offset=b||0}).prototype.exec=function(a){a.setLineDash&&(a.setLineDash(this.segments||c.StrokeDash.EMPTY_SEGMENTS),a.lineDashOffset=this.offset||0)},c.StrokeDash.EMPTY_SEGMENTS=[],(c.RoundRect=function(a,b,c,d,e,f,g,h){this.x=a,this.y=b,this.w=c,this.h=d,this.radiusTL=e,this.radiusTR=f,this.radiusBR=g,this.radiusBL=h}).prototype.exec=function(a){var b=(j>i?i:j)/2,c=0,d=0,e=0,f=0,g=this.x,h=this.y,i=this.w,j=this.h,k=this.radiusTL,l=this.radiusTR,m=this.radiusBR,n=this.radiusBL;0>k&&(k*=c=-1),k>b&&(k=b),0>l&&(l*=d=-1),l>b&&(l=b),0>m&&(m*=e=-1),m>b&&(m=b),0>n&&(n*=f=-1),n>b&&(n=b),a.moveTo(g+i-l,h),a.arcTo(g+i+l*d,h-l*d,g+i,h+l,l),a.lineTo(g+i,h+j-m),a.arcTo(g+i+m*e,h+j+m*e,g+i-m,h+j,m),a.lineTo(g+n,h+j),a.arcTo(g-n*f,h+j+n*f,g,h+j-n,n),a.lineTo(g,h+k),a.arcTo(g-k*c,h-k*c,g+k,h,k),a.closePath()
},(c.Circle=function(a,b,c){this.x=a,this.y=b,this.radius=c}).prototype.exec=function(a){a.arc(this.x,this.y,this.radius,0,2*Math.PI)},(c.Ellipse=function(a,b,c,d){this.x=a,this.y=b,this.w=c,this.h=d}).prototype.exec=function(a){var b=this.x,c=this.y,d=this.w,e=this.h,f=.5522848,g=d/2*f,h=e/2*f,i=b+d,j=c+e,k=b+d/2,l=c+e/2;a.moveTo(b,l),a.bezierCurveTo(b,l-h,k-g,c,k,c),a.bezierCurveTo(k+g,c,i,l-h,i,l),a.bezierCurveTo(i,l+h,k+g,j,k,j),a.bezierCurveTo(k-g,j,b,l+h,b,l)},(c.PolyStar=function(a,b,c,d,e,f){this.x=a,this.y=b,this.radius=c,this.sides=d,this.pointSize=e,this.angle=f}).prototype.exec=function(a){var b=this.x,c=this.y,d=this.radius,e=(this.angle||0)/180*Math.PI,f=this.sides,g=1-(this.pointSize||0),h=Math.PI/f;a.moveTo(b+Math.cos(e)*d,c+Math.sin(e)*d);for(var i=0;f>i;i++)e+=h,1!=g&&a.lineTo(b+Math.cos(e)*d*g,c+Math.sin(e)*d*g),e+=h,a.lineTo(b+Math.cos(e)*d,c+Math.sin(e)*d);a.closePath()},a.beginCmd=new c.BeginPath,createjs.Graphics=a}(),this.createjs=this.createjs||{},function(){"use strict";function a(){this.EventDispatcher_constructor(),this.alpha=1,this.cacheCanvas=null,this.bitmapCache=null,this.id=createjs.UID.get(),this.mouseEnabled=!0,this.tickEnabled=!0,this.name=null,this.parent=null,this.regX=0,this.regY=0,this.rotation=0,this.scaleX=1,this.scaleY=1,this.skewX=0,this.skewY=0,this.shadow=null,this.visible=!0,this.x=0,this.y=0,this.transformMatrix=null,this.compositeOperation=null,this.snapToPixel=!0,this.filters=null,this.mask=null,this.hitArea=null,this.cursor=null,this._props=new createjs.DisplayProps,this._rectangle=new createjs.Rectangle,this._bounds=null,this._webGLRenderStyle=a._StageGL_NONE}var b=createjs.extend(a,createjs.EventDispatcher);a._MOUSE_EVENTS=["click","dblclick","mousedown","mouseout","mouseover","pressmove","pressup","rollout","rollover"],a.suppressCrossDomainErrors=!1,a._snapToPixelEnabled=!1,a._StageGL_NONE=0,a._StageGL_SPRITE=1,a._StageGL_BITMAP=2;var c=createjs.createCanvas?createjs.createCanvas():document.createElement("canvas");c.getContext&&(a._hitTestCanvas=c,a._hitTestContext=c.getContext("2d"),c.width=c.height=1),b._getStage=function(){for(var a=this,b=createjs.Stage;a.parent;)a=a.parent;return a instanceof b?a:null},b.getStage=createjs.deprecate(b._getStage,"DisplayObject.getStage");try{Object.defineProperties(b,{stage:{get:b._getStage},cacheID:{get:function(){return this.bitmapCache&&this.bitmapCache.cacheID},set:function(a){this.bitmapCache&&(this.bitmapCache.cacheID=a)}},scale:{get:function(){return this.scaleX},set:function(a){this.scaleX=this.scaleY=a}}})}catch(d){}b.isVisible=function(){return!!(this.visible&&this.alpha>0&&0!=this.scaleX&&0!=this.scaleY)},b.draw=function(a,b){var c=this.bitmapCache;return c&&!b?c.draw(a):!1},b.updateContext=function(b){var c=this,d=c.mask,e=c._props.matrix;d&&d.graphics&&!d.graphics.isEmpty()&&(d.getMatrix(e),b.transform(e.a,e.b,e.c,e.d,e.tx,e.ty),d.graphics.drawAsPath(b),b.clip(),e.invert(),b.transform(e.a,e.b,e.c,e.d,e.tx,e.ty)),this.getMatrix(e);var f=e.tx,g=e.ty;a._snapToPixelEnabled&&c.snapToPixel&&(f=f+(0>f?-.5:.5)|0,g=g+(0>g?-.5:.5)|0),b.transform(e.a,e.b,e.c,e.d,f,g),b.globalAlpha*=c.alpha,c.compositeOperation&&(b.globalCompositeOperation=c.compositeOperation),c.shadow&&this._applyShadow(b,c.shadow)},b.cache=function(a,b,c,d,e,f){this.bitmapCache||(this.bitmapCache=new createjs.BitmapCache),this.bitmapCache.define(this,a,b,c,d,e,f)},b.updateCache=function(a){if(!this.bitmapCache)throw"cache() must be called before updateCache()";this.bitmapCache.update(a)},b.uncache=function(){this.bitmapCache&&(this.bitmapCache.release(),this.bitmapCache=void 0)},b.getCacheDataURL=function(){return this.bitmapCache?this.bitmapCache.getDataURL():null},b.localToGlobal=function(a,b,c){return this.getConcatenatedMatrix(this._props.matrix).transformPoint(a,b,c||new createjs.Point)},b.globalToLocal=function(a,b,c){return this.getConcatenatedMatrix(this._props.matrix).invert().transformPoint(a,b,c||new createjs.Point)},b.localToLocal=function(a,b,c,d){return d=this.localToGlobal(a,b,d),c.globalToLocal(d.x,d.y,d)},b.setTransform=function(a,b,c,d,e,f,g,h,i){return this.x=a||0,this.y=b||0,this.scaleX=null==c?1:c,this.scaleY=null==d?1:d,this.rotation=e||0,this.skewX=f||0,this.skewY=g||0,this.regX=h||0,this.regY=i||0,this},b.getMatrix=function(a){var b=this,c=a&&a.identity()||new createjs.Matrix2D;return b.transformMatrix?c.copy(b.transformMatrix):c.appendTransform(b.x,b.y,b.scaleX,b.scaleY,b.rotation,b.skewX,b.skewY,b.regX,b.regY)},b.getConcatenatedMatrix=function(a){for(var b=this,c=this.getMatrix(a);b=b.parent;)c.prependMatrix(b.getMatrix(b._props.matrix));return c},b.getConcatenatedDisplayProps=function(a){a=a?a.identity():new createjs.DisplayProps;var b=this,c=b.getMatrix(a.matrix);do a.prepend(b.visible,b.alpha,b.shadow,b.compositeOperation),b!=this&&c.prependMatrix(b.getMatrix(b._props.matrix));while(b=b.parent);return a},b.hitTest=function(b,c){var d=a._hitTestContext;d.setTransform(1,0,0,1,-b,-c),this.draw(d);var e=this._testHit(d);return d.setTransform(1,0,0,1,0,0),d.clearRect(0,0,2,2),e},b.set=function(a){for(var b in a)this[b]=a[b];return this},b.getBounds=function(){if(this._bounds)return this._rectangle.copy(this._bounds);var a=this.cacheCanvas;if(a){var b=this._cacheScale;return this._rectangle.setValues(this._cacheOffsetX,this._cacheOffsetY,a.width/b,a.height/b)}return null},b.getTransformedBounds=function(){return this._getBounds()},b.setBounds=function(a,b,c,d){return null==a?void(this._bounds=a):void(this._bounds=(this._bounds||new createjs.Rectangle).setValues(a,b,c,d))},b.clone=function(){return this._cloneProps(new a)},b.toString=function(){return"[DisplayObject (name="+this.name+")]"},b._updateState=null,b._cloneProps=function(a){return a.alpha=this.alpha,a.mouseEnabled=this.mouseEnabled,a.tickEnabled=this.tickEnabled,a.name=this.name,a.regX=this.regX,a.regY=this.regY,a.rotation=this.rotation,a.scaleX=this.scaleX,a.scaleY=this.scaleY,a.shadow=this.shadow,a.skewX=this.skewX,a.skewY=this.skewY,a.visible=this.visible,a.x=this.x,a.y=this.y,a.compositeOperation=this.compositeOperation,a.snapToPixel=this.snapToPixel,a.filters=null==this.filters?null:this.filters.slice(0),a.mask=this.mask,a.hitArea=this.hitArea,a.cursor=this.cursor,a._bounds=this._bounds,a},b._applyShadow=function(a,b){b=b||Shadow.identity,a.shadowColor=b.color,a.shadowOffsetX=b.offsetX,a.shadowOffsetY=b.offsetY,a.shadowBlur=b.blur},b._tick=function(a){var b=this._listeners;b&&b.tick&&(a.target=null,a.propagationStopped=a.immediatePropagationStopped=!1,this.dispatchEvent(a))},b._testHit=function(b){try{var c=b.getImageData(0,0,1,1).data[3]>1}catch(d){if(!a.suppressCrossDomainErrors)throw"An error has occurred. This is most likely due to security restrictions on reading canvas pixel data with local or cross-domain images."}return c},b._getBounds=function(a,b){return this._transformBounds(this.getBounds(),a,b)},b._transformBounds=function(a,b,c){if(!a)return a;var d=a.x,e=a.y,f=a.width,g=a.height,h=this._props.matrix;h=c?h.identity():this.getMatrix(h),(d||e)&&h.appendTransform(0,0,1,1,0,0,0,-d,-e),b&&h.prependMatrix(b);var i=f*h.a,j=f*h.b,k=g*h.c,l=g*h.d,m=h.tx,n=h.ty,o=m,p=m,q=n,r=n;return(d=i+m)<o?o=d:d>p&&(p=d),(d=i+k+m)<o?o=d:d>p&&(p=d),(d=k+m)<o?o=d:d>p&&(p=d),(e=j+n)<q?q=e:e>r&&(r=e),(e=j+l+n)<q?q=e:e>r&&(r=e),(e=l+n)<q?q=e:e>r&&(r=e),a.setValues(o,q,p-o,r-q)},b._hasMouseEventListener=function(){for(var b=a._MOUSE_EVENTS,c=0,d=b.length;d>c;c++)if(this.hasEventListener(b[c]))return!0;return!!this.cursor},createjs.DisplayObject=createjs.promote(a,"EventDispatcher")}(),this.createjs=this.createjs||{},function(){"use strict";function a(){this.DisplayObject_constructor(),this.children=[],this.mouseChildren=!0,this.tickChildren=!0}var b=createjs.extend(a,createjs.DisplayObject);b._getNumChildren=function(){return this.children.length},b.getNumChildren=createjs.deprecate(b._getNumChildren,"Container.getNumChildren");try{Object.defineProperties(b,{numChildren:{get:b._getNumChildren}})}catch(c){}b.initialize=a,b.isVisible=function(){var a=this.cacheCanvas||this.children.length;return!!(this.visible&&this.alpha>0&&0!=this.scaleX&&0!=this.scaleY&&a)},b.draw=function(a,b){if(this.DisplayObject_draw(a,b))return!0;for(var c=this.children.slice(),d=0,e=c.length;e>d;d++){var f=c[d];f.isVisible()&&(a.save(),f.updateContext(a),f.draw(a),a.restore())}return!0},b.addChild=function(a){if(null==a)return a;var b=arguments.length;if(b>1){for(var c=0;b>c;c++)this.addChild(arguments[c]);return arguments[b-1]}var d=a.parent,e=d===this;return d&&d._removeChildAt(createjs.indexOf(d.children,a),e),a.parent=this,this.children.push(a),e||a.dispatchEvent("added"),a},b.addChildAt=function(a,b){var c=arguments.length,d=arguments[c-1];if(0>d||d>this.children.length)return arguments[c-2];if(c>2){for(var e=0;c-1>e;e++)this.addChildAt(arguments[e],d+e);return arguments[c-2]}var f=a.parent,g=f===this;return f&&f._removeChildAt(createjs.indexOf(f.children,a),g),a.parent=this,this.children.splice(b,0,a),g||a.dispatchEvent("added"),a},b.removeChild=function(a){var b=arguments.length;if(b>1){for(var c=!0,d=0;b>d;d++)c=c&&this.removeChild(arguments[d]);return c}return this._removeChildAt(createjs.indexOf(this.children,a))},b.removeChildAt=function(a){var b=arguments.length;if(b>1){for(var c=[],d=0;b>d;d++)c[d]=arguments[d];c.sort(function(a,b){return b-a});for(var e=!0,d=0;b>d;d++)e=e&&this._removeChildAt(c[d]);return e}return this._removeChildAt(a)},b.removeAllChildren=function(){for(var a=this.children;a.length;)this._removeChildAt(0)},b.getChildAt=function(a){return this.children[a]},b.getChildByName=function(a){for(var b=this.children,c=0,d=b.length;d>c;c++)if(b[c].name==a)return b[c];return null},b.sortChildren=function(a){this.children.sort(a)},b.getChildIndex=function(a){return createjs.indexOf(this.children,a)},b.swapChildrenAt=function(a,b){var c=this.children,d=c[a],e=c[b];d&&e&&(c[a]=e,c[b]=d)},b.swapChildren=function(a,b){for(var c,d,e=this.children,f=0,g=e.length;g>f&&(e[f]==a&&(c=f),e[f]==b&&(d=f),null==c||null==d);f++);f!=g&&(e[c]=b,e[d]=a)},b.setChildIndex=function(a,b){var c=this.children,d=c.length;if(!(a.parent!=this||0>b||b>=d)){for(var e=0;d>e&&c[e]!=a;e++);e!=d&&e!=b&&(c.splice(e,1),c.splice(b,0,a))}},b.contains=function(a){for(;a;){if(a==this)return!0;a=a.parent}return!1},b.hitTest=function(a,b){return null!=this.getObjectUnderPoint(a,b)},b.getObjectsUnderPoint=function(a,b,c){var d=[],e=this.localToGlobal(a,b);return this._getObjectsUnderPoint(e.x,e.y,d,c>0,1==c),d},b.getObjectUnderPoint=function(a,b,c){var d=this.localToGlobal(a,b);return this._getObjectsUnderPoint(d.x,d.y,null,c>0,1==c)},b.getBounds=function(){return this._getBounds(null,!0)},b.getTransformedBounds=function(){return this._getBounds()},b.clone=function(b){var c=this._cloneProps(new a);return b&&this._cloneChildren(c),c},b.toString=function(){return"[Container (name="+this.name+")]"},b._tick=function(a){if(this.tickChildren)for(var b=this.children.length-1;b>=0;b--){var c=this.children[b];c.tickEnabled&&c._tick&&c._tick(a)}this.DisplayObject__tick(a)},b._cloneChildren=function(a){a.children.length&&a.removeAllChildren();for(var b=a.children,c=0,d=this.children.length;d>c;c++){var e=this.children[c].clone(!0);e.parent=a,b.push(e)}},b._removeChildAt=function(a,b){if(0>a||a>this.children.length-1)return!1;var c=this.children[a];return c&&(c.parent=null),this.children.splice(a,1),b||c.dispatchEvent("removed"),!0},b._getObjectsUnderPoint=function(b,c,d,e,f,g){if(g=g||0,!g&&!this._testMask(this,b,c))return null;var h,i=createjs.DisplayObject._hitTestContext;f=f||e&&this._hasMouseEventListener();for(var j=this.children,k=j.length,l=k-1;l>=0;l--){var m=j[l],n=m.hitArea;if(m.visible&&(n||m.isVisible())&&(!e||m.mouseEnabled)&&(n||this._testMask(m,b,c)))if(!n&&m instanceof a){var o=m._getObjectsUnderPoint(b,c,d,e,f,g+1);if(!d&&o)return e&&!this.mouseChildren?this:o}else{if(e&&!f&&!m._hasMouseEventListener())continue;var p=m.getConcatenatedDisplayProps(m._props);if(h=p.matrix,n&&(h.appendMatrix(n.getMatrix(n._props.matrix)),p.alpha=n.alpha),i.globalAlpha=p.alpha,i.setTransform(h.a,h.b,h.c,h.d,h.tx-b,h.ty-c),(n||m).draw(i),!this._testHit(i))continue;if(i.setTransform(1,0,0,1,0,0),i.clearRect(0,0,2,2),!d)return e&&!this.mouseChildren?this:m;d.push(m)}}return null},b._testMask=function(a,b,c){var d=a.mask;if(!d||!d.graphics||d.graphics.isEmpty())return!0;var e=this._props.matrix,f=a.parent;e=f?f.getConcatenatedMatrix(e):e.identity(),e=d.getMatrix(d._props.matrix).prependMatrix(e);var g=createjs.DisplayObject._hitTestContext;return g.setTransform(e.a,e.b,e.c,e.d,e.tx-b,e.ty-c),d.graphics.drawAsPath(g),g.fillStyle="#000",g.fill(),this._testHit(g)?(g.setTransform(1,0,0,1,0,0),g.clearRect(0,0,2,2),!0):!1},b._getBounds=function(a,b){var c=this.DisplayObject_getBounds();if(c)return this._transformBounds(c,a,b);var d=this._props.matrix;d=b?d.identity():this.getMatrix(d),a&&d.prependMatrix(a);for(var e=this.children.length,f=null,g=0;e>g;g++){var h=this.children[g];h.visible&&(c=h._getBounds(d))&&(f?f.extend(c.x,c.y,c.width,c.height):f=c.clone())}return f},createjs.Container=createjs.promote(a,"DisplayObject")}(),this.createjs=this.createjs||{},function(){"use strict";function a(a){this.Container_constructor(),this.autoClear=!0,this.canvas="string"==typeof a?document.getElementById(a):a,this.mouseX=0,this.mouseY=0,this.drawRect=null,this.snapToPixelEnabled=!1,this.mouseInBounds=!1,this.tickOnUpdate=!0,this.mouseMoveOutside=!1,this.preventSelection=!0,this._pointerData={},this._pointerCount=0,this._primaryPointerID=null,this._mouseOverIntervalID=null,this._nextStage=null,this._prevStage=null,this.enableDOMEvents(!0)}var b=createjs.extend(a,createjs.Container);b._get_nextStage=function(){return this._nextStage},b._set_nextStage=function(a){this._nextStage&&(this._nextStage._prevStage=null),a&&(a._prevStage=this),this._nextStage=a};try{Object.defineProperties(b,{nextStage:{get:b._get_nextStage,set:b._set_nextStage}})}catch(c){}b.update=function(a){if(this.canvas&&(this.tickOnUpdate&&this.tick(a),this.dispatchEvent("drawstart",!1,!0)!==!1)){createjs.DisplayObject._snapToPixelEnabled=this.snapToPixelEnabled;var b=this.drawRect,c=this.canvas.getContext("2d");c.setTransform(1,0,0,1,0,0),this.autoClear&&(b?c.clearRect(b.x,b.y,b.width,b.height):c.clearRect(0,0,this.canvas.width+1,this.canvas.height+1)),c.save(),this.drawRect&&(c.beginPath(),c.rect(b.x,b.y,b.width,b.height),c.clip()),this.updateContext(c),this.draw(c,!1),c.restore(),this.dispatchEvent("drawend")}},b.tick=function(a){if(this.tickEnabled&&this.dispatchEvent("tickstart",!1,!0)!==!1){var b=new createjs.Event("tick");if(a)for(var c in a)a.hasOwnProperty(c)&&(b[c]=a[c]);this._tick(b),this.dispatchEvent("tickend")}},b.handleEvent=function(a){"tick"==a.type&&this.update(a)},b.clear=function(){if(this.canvas){var a=this.canvas.getContext("2d");a.setTransform(1,0,0,1,0,0),a.clearRect(0,0,this.canvas.width+1,this.canvas.height+1)}},b.toDataURL=function(a,b){var c,d=this.canvas.getContext("2d"),e=this.canvas.width,f=this.canvas.height;if(a){c=d.getImageData(0,0,e,f);var g=d.globalCompositeOperation;d.globalCompositeOperation="destination-over",d.fillStyle=a,d.fillRect(0,0,e,f)}var h=this.canvas.toDataURL(b||"image/png");return a&&(d.putImageData(c,0,0),d.globalCompositeOperation=g),h},b.enableMouseOver=function(a){if(this._mouseOverIntervalID&&(clearInterval(this._mouseOverIntervalID),this._mouseOverIntervalID=null,0==a&&this._testMouseOver(!0)),null==a)a=20;else if(0>=a)return;var b=this;this._mouseOverIntervalID=setInterval(function(){b._testMouseOver()},1e3/Math.min(50,a))},b.enableDOMEvents=function(a){null==a&&(a=!0);var b,c,d=this._eventListeners;if(!a&&d){for(b in d)c=d[b],c.t.removeEventListener(b,c.f,!1);this._eventListeners=null}else if(a&&!d&&this.canvas){var e=window.addEventListener?window:document,f=this;d=this._eventListeners={},d.mouseup={t:e,f:function(a){f._handleMouseUp(a)}},d.mousemove={t:e,f:function(a){f._handleMouseMove(a)}},d.dblclick={t:this.canvas,f:function(a){f._handleDoubleClick(a)}},d.mousedown={t:this.canvas,f:function(a){f._handleMouseDown(a)}};for(b in d)c=d[b],c.t.addEventListener(b,c.f,!1)}},b.clone=function(){throw"Stage cannot be cloned."},b.toString=function(){return"[Stage (name="+this.name+")]"},b._getElementRect=function(a){var b;try{b=a.getBoundingClientRect()}catch(c){b={top:a.offsetTop,left:a.offsetLeft,width:a.offsetWidth,height:a.offsetHeight}}var d=(window.pageXOffset||document.scrollLeft||0)-(document.clientLeft||document.body.clientLeft||0),e=(window.pageYOffset||document.scrollTop||0)-(document.clientTop||document.body.clientTop||0),f=window.getComputedStyle?getComputedStyle(a,null):a.currentStyle,g=parseInt(f.paddingLeft)+parseInt(f.borderLeftWidth),h=parseInt(f.paddingTop)+parseInt(f.borderTopWidth),i=parseInt(f.paddingRight)+parseInt(f.borderRightWidth),j=parseInt(f.paddingBottom)+parseInt(f.borderBottomWidth);return{left:b.left+d+g,right:b.right+d-i,top:b.top+e+h,bottom:b.bottom+e-j}},b._getPointerData=function(a){var b=this._pointerData[a];return b||(b=this._pointerData[a]={x:0,y:0}),b},b._handleMouseMove=function(a){a||(a=window.event),this._handlePointerMove(-1,a,a.pageX,a.pageY)},b._handlePointerMove=function(a,b,c,d,e){if((!this._prevStage||void 0!==e)&&this.canvas){var f=this._nextStage,g=this._getPointerData(a),h=g.inBounds;this._updatePointerPosition(a,b,c,d),(h||g.inBounds||this.mouseMoveOutside)&&(-1===a&&g.inBounds==!h&&this._dispatchMouseEvent(this,h?"mouseleave":"mouseenter",!1,a,g,b),this._dispatchMouseEvent(this,"stagemousemove",!1,a,g,b),this._dispatchMouseEvent(g.target,"pressmove",!0,a,g,b)),f&&f._handlePointerMove(a,b,c,d,null)}},b._updatePointerPosition=function(a,b,c,d){var e=this._getElementRect(this.canvas);c-=e.left,d-=e.top;var f=this.canvas.width,g=this.canvas.height;c/=(e.right-e.left)/f,d/=(e.bottom-e.top)/g;var h=this._getPointerData(a);(h.inBounds=c>=0&&d>=0&&f-1>=c&&g-1>=d)?(h.x=c,h.y=d):this.mouseMoveOutside&&(h.x=0>c?0:c>f-1?f-1:c,h.y=0>d?0:d>g-1?g-1:d),h.posEvtObj=b,h.rawX=c,h.rawY=d,(a===this._primaryPointerID||-1===a)&&(this.mouseX=h.x,this.mouseY=h.y,this.mouseInBounds=h.inBounds)},b._handleMouseUp=function(a){this._handlePointerUp(-1,a,!1)},b._handlePointerUp=function(a,b,c,d){var e=this._nextStage,f=this._getPointerData(a);if(!this._prevStage||void 0!==d){var g=null,h=f.target;d||!h&&!e||(g=this._getObjectsUnderPoint(f.x,f.y,null,!0)),f.down&&(this._dispatchMouseEvent(this,"stagemouseup",!1,a,f,b,g),f.down=!1),g==h&&this._dispatchMouseEvent(h,"click",!0,a,f,b),this._dispatchMouseEvent(h,"pressup",!0,a,f,b),c?(a==this._primaryPointerID&&(this._primaryPointerID=null),delete this._pointerData[a]):f.target=null,e&&e._handlePointerUp(a,b,c,d||g&&this)}},b._handleMouseDown=function(a){this._handlePointerDown(-1,a,a.pageX,a.pageY)},b._handlePointerDown=function(a,b,c,d,e){this.preventSelection&&b.preventDefault(),(null==this._primaryPointerID||-1===a)&&(this._primaryPointerID=a),null!=d&&this._updatePointerPosition(a,b,c,d);var f=null,g=this._nextStage,h=this._getPointerData(a);e||(f=h.target=this._getObjectsUnderPoint(h.x,h.y,null,!0)),h.inBounds&&(this._dispatchMouseEvent(this,"stagemousedown",!1,a,h,b,f),h.down=!0),this._dispatchMouseEvent(f,"mousedown",!0,a,h,b),g&&g._handlePointerDown(a,b,c,d,e||f&&this)},b._testMouseOver=function(a,b,c){if(!this._prevStage||void 0!==b){var d=this._nextStage;if(!this._mouseOverIntervalID)return void(d&&d._testMouseOver(a,b,c));var e=this._getPointerData(-1);if(e&&(a||this.mouseX!=this._mouseOverX||this.mouseY!=this._mouseOverY||!this.mouseInBounds)){var f,g,h,i=e.posEvtObj,j=c||i&&i.target==this.canvas,k=null,l=-1,m="";!b&&(a||this.mouseInBounds&&j)&&(k=this._getObjectsUnderPoint(this.mouseX,this.mouseY,null,!0),this._mouseOverX=this.mouseX,this._mouseOverY=this.mouseY);var n=this._mouseOverTarget||[],o=n[n.length-1],p=this._mouseOverTarget=[];for(f=k;f;)p.unshift(f),m||(m=f.cursor),f=f.parent;for(this.canvas.style.cursor=m,!b&&c&&(c.canvas.style.cursor=m),g=0,h=p.length;h>g&&p[g]==n[g];g++)l=g;for(o!=k&&this._dispatchMouseEvent(o,"mouseout",!0,-1,e,i,k),g=n.length-1;g>l;g--)this._dispatchMouseEvent(n[g],"rollout",!1,-1,e,i,k);for(g=p.length-1;g>l;g--)this._dispatchMouseEvent(p[g],"rollover",!1,-1,e,i,o);o!=k&&this._dispatchMouseEvent(k,"mouseover",!0,-1,e,i,o),d&&d._testMouseOver(a,b||k&&this,c||j&&this)}}},b._handleDoubleClick=function(a,b){var c=null,d=this._nextStage,e=this._getPointerData(-1);b||(c=this._getObjectsUnderPoint(e.x,e.y,null,!0),this._dispatchMouseEvent(c,"dblclick",!0,-1,e,a)),d&&d._handleDoubleClick(a,b||c&&this)},b._dispatchMouseEvent=function(a,b,c,d,e,f,g){if(a&&(c||a.hasEventListener(b))){var h=new createjs.MouseEvent(b,c,!1,e.x,e.y,f,d,d===this._primaryPointerID||-1===d,e.rawX,e.rawY,g);a.dispatchEvent(h)}},createjs.Stage=createjs.promote(a,"Container")}(),this.createjs=this.createjs||{},function(){"use strict";function a(b,c){if(this.Stage_constructor(b),void 0!==c){if("object"!=typeof c)throw"Invalid options object";var d=c.premultiply,e=c.transparent,f=c.antialias,g=c.preserveBuffer,h=c.autoPurge}this.vocalDebug=!1,this._preserveBuffer=g||!1,this._antialias=f||!1,this._transparent=e||!1,this._premultiply=d||!1,this._autoPurge=void 0,this.autoPurge=h,this._viewportWidth=0,this._viewportHeight=0,this._projectionMatrix=null,this._webGLContext=null,this._clearColor={r:.5,g:.5,b:.5,a:0},this._maxCardsPerBatch=a.DEFAULT_MAX_BATCH_SIZE,this._activeShader=null,this._vertices=null,this._vertexPositionBuffer=null,this._uvs=null,this._uvPositionBuffer=null,this._indices=null,this._textureIndexBuffer=null,this._alphas=null,this._alphaBuffer=null,this._textureDictionary=[],this._textureIDs={},this._batchTextures=[],this._baseTextures=[],this._batchTextureCount=8,this._lastTextureInsert=-1,this._batchID=0,this._drawID=0,this._slotBlacklist=[],this._isDrawing=0,this._lastTrackedCanvas=0,this.isCacheControlled=!1,this._cacheContainer=new createjs.Container,this._initializeWebGL()}var b=createjs.extend(a,createjs.Stage);a.buildUVRects=function(a,b,c){if(!a||!a._frames)return null;void 0===b&&(b=-1),void 0===c&&(c=!1);for(var d=-1!=b&&c?b:0,e=-1!=b&&c?b+1:a._frames.length,f=d;e>f;f++){var g=a._frames[f];if(!(g.uvRect||g.image.width<=0||g.image.height<=0)){var h=g.rect;g.uvRect={t:h.y/g.image.height,l:h.x/g.image.width,b:(h.y+h.height)/g.image.height,r:(h.x+h.width)/g.image.width}}}return a._frames[-1!=b?b:0].uvRect||{t:0,l:0,b:1,r:1}},a.isWebGLActive=function(a){return a&&a instanceof WebGLRenderingContext&&"undefined"!=typeof WebGLRenderingContext},a.VERTEX_PROPERTY_COUNT=6,a.INDICIES_PER_CARD=6,a.DEFAULT_MAX_BATCH_SIZE=1e4,a.WEBGL_MAX_INDEX_NUM=Math.pow(2,16),a.UV_RECT={t:0,l:0,b:1,r:1};try{a.COVER_VERT=new Float32Array([-1,1,1,1,-1,-1,1,1,1,-1,-1,-1]),a.COVER_UV=new Float32Array([0,0,1,0,0,1,1,0,1,1,0,1]),a.COVER_UV_FLIP=new Float32Array([0,1,1,1,0,0,1,1,1,0,0,0])}catch(c){}a.REGULAR_VARYING_HEADER="precision mediump float;varying vec2 vTextureCoord;varying lowp float indexPicker;varying lowp float alphaValue;",a.REGULAR_VERTEX_HEADER=a.REGULAR_VARYING_HEADER+"attribute vec2 vertexPosition;attribute vec2 uvPosition;attribute lowp float textureIndex;attribute lowp float objectAlpha;uniform mat4 pMatrix;",a.REGULAR_FRAGMENT_HEADER=a.REGULAR_VARYING_HEADER+"uniform sampler2D uSampler[{{count}}];",a.REGULAR_VERTEX_BODY="void main(void) {gl_Position = vec4((vertexPosition.x * pMatrix[0][0]) + pMatrix[3][0],(vertexPosition.y * pMatrix[1][1]) + pMatrix[3][1],pMatrix[3][2],1.0);alphaValue = objectAlpha;indexPicker = textureIndex;vTextureCoord = uvPosition;}",a.REGULAR_FRAGMENT_BODY="void main(void) {vec4 color = vec4(1.0, 0.0, 0.0, 1.0);if (indexPicker <= 0.5) {color = texture2D(uSampler[0], vTextureCoord);{{alternates}}}{{fragColor}}}",a.REGULAR_FRAG_COLOR_NORMAL="gl_FragColor = vec4(color.rgb, color.a * alphaValue);",a.REGULAR_FRAG_COLOR_PREMULTIPLY="if(color.a > 0.0035) {gl_FragColor = vec4(color.rgb/color.a, color.a * alphaValue);} else {gl_FragColor = vec4(0.0, 0.0, 0.0, 0.0);}",a.PARTICLE_VERTEX_BODY=a.REGULAR_VERTEX_BODY,a.PARTICLE_FRAGMENT_BODY=a.REGULAR_FRAGMENT_BODY,a.COVER_VARYING_HEADER="precision mediump float;varying highp vec2 vRenderCoord;varying highp vec2 vTextureCoord;",a.COVER_VERTEX_HEADER=a.COVER_VARYING_HEADER+"attribute vec2 vertexPosition;attribute vec2 uvPosition;uniform float uUpright;",a.COVER_FRAGMENT_HEADER=a.COVER_VARYING_HEADER+"uniform sampler2D uSampler;",a.COVER_VERTEX_BODY="void main(void) {gl_Position = vec4(vertexPosition.x, vertexPosition.y, 0.0, 1.0);vRenderCoord = uvPosition;vTextureCoord = vec2(uvPosition.x, abs(uUpright - uvPosition.y));}",a.COVER_FRAGMENT_BODY="void main(void) {vec4 color = texture2D(uSampler, vRenderCoord);gl_FragColor = color;}",b._get_isWebGL=function(){return!!this._webGLContext},b._set_autoPurge=function(a){a=isNaN(a)?1200:a,-1!=a&&(a=10>a?10:a),this._autoPurge=a},b._get_autoPurge=function(){return Number(this._autoPurge)};try{Object.defineProperties(b,{isWebGL:{get:b._get_isWebGL},autoPurge:{get:b._get_autoPurge,set:b._set_autoPurge}})}catch(c){}b._initializeWebGL=function(){if(this.canvas){if(!this._webGLContext||this._webGLContext.canvas!==this.canvas){var a={depth:!1,alpha:this._transparent,stencil:!0,antialias:this._antialias,premultipliedAlpha:this._premultiply,preserveDrawingBuffer:this._preserveBuffer},b=this._webGLContext=this._fetchWebGLContext(this.canvas,a);if(!b)return null;this.updateSimultaneousTextureCount(b.getParameter(b.MAX_TEXTURE_IMAGE_UNITS)),this._maxTextureSlots=b.getParameter(b.MAX_COMBINED_TEXTURE_IMAGE_UNITS),this._createBuffers(b),this._initTextures(b),b.disable(b.DEPTH_TEST),b.enable(b.BLEND),b.blendFuncSeparate(b.SRC_ALPHA,b.ONE_MINUS_SRC_ALPHA,b.ONE,b.ONE_MINUS_SRC_ALPHA),b.pixelStorei(b.UNPACK_PREMULTIPLY_ALPHA_WEBGL,this._premultiply),this._webGLContext.clearColor(this._clearColor.r,this._clearColor.g,this._clearColor.b,this._clearColor.a),this.updateViewport(this._viewportWidth||this.canvas.width,this._viewportHeight||this.canvas.height)}}else this._webGLContext=null;return this._webGLContext},b.update=function(a){if(this.canvas){if(this.tickOnUpdate&&this.tick(a),this.dispatchEvent("drawstart"),this.autoClear&&this.clear(),this._webGLContext)this._batchDraw(this,this._webGLContext),-1==this._autoPurge||this._drawID%(this._autoPurge/2|0)||this.purgeTextures(this._autoPurge);else{var b=this.canvas.getContext("2d");b.save(),this.updateContext(b),this.draw(b,!1),b.restore()}this.dispatchEvent("drawend")}},b.clear=function(){if(this.canvas)if(a.isWebGLActive(this._webGLContext)){var b=this._webGLContext,c=this._clearColor,d=this._transparent?c.a:1;this._webGLContext.clearColor(c.r*d,c.g*d,c.b*d,d),b.clear(b.COLOR_BUFFER_BIT),this._webGLContext.clearColor(c.r,c.g,c.b,c.a)}else this.Stage_clear()},b.draw=function(b,c){if(b===this._webGLContext&&a.isWebGLActive(this._webGLContext)){var d=this._webGLContext;return this._batchDraw(this,d,c),!0}return this.Stage_draw(b,c)},b.cacheDraw=function(b,c,d){if(a.isWebGLActive(this._webGLContext)){var e=this._webGLContext;return this._cacheDraw(e,b,c,d),!0}return!1},b.protectTextureSlot=function(a,b){if(a>this._maxTextureSlots||0>a)throw"Slot outside of acceptable range";this._slotBlacklist[a]=!!b},b.getTargetRenderTexture=function(a,b,c){var d,e=!1,f=this._webGLContext;if(void 0!==a.__lastRT&&a.__lastRT===a.__rtA&&(e=!0),e?(void 0===a.__rtB?a.__rtB=this.getRenderBufferTexture(b,c):((b!=a.__rtB._width||c!=a.__rtB._height)&&this.resizeTexture(a.__rtB,b,c),this.setTextureParams(f)),d=a.__rtB):(void 0===a.__rtA?a.__rtA=this.getRenderBufferTexture(b,c):((b!=a.__rtA._width||c!=a.__rtA._height)&&this.resizeTexture(a.__rtA,b,c),this.setTextureParams(f)),d=a.__rtA),!d)throw"Problems creating render textures, known causes include using too much VRAM by not releasing WebGL texture instances";return a.__lastRT=d,d},b.releaseTexture=function(a){var b,c;if(a){if(a.children)for(b=0,c=a.children.length;c>b;b++)this.releaseTexture(a.children[b]);a.cacheCanvas&&a.uncache();var d=void 0;if(void 0!==a._storeID){if(a===this._textureDictionary[a._storeID])return this._killTextureObject(a),void(a._storeID=void 0);d=a}else if(2===a._webGLRenderStyle)d=a.image;else if(1===a._webGLRenderStyle){for(b=0,c=a.spriteSheet._images.length;c>b;b++)this.releaseTexture(a.spriteSheet._images[b]);return}if(void 0===d)return void(this.vocalDebug&&console.log("No associated texture found on release"));this._killTextureObject(this._textureDictionary[d._storeID]),d._storeID=void 0}},b.purgeTextures=function(a){void 0==a&&(a=100);for(var b=this._textureDictionary,c=b.length,d=0;c>d;d++){var e=b[d];e&&e._drawID+a<=this._drawID&&this._killTextureObject(e)}},b.updateSimultaneousTextureCount=function(a){var b=this._webGLContext,c=!1;for((1>a||isNaN(a))&&(a=1),this._batchTextureCount=a;!c;)try{this._activeShader=this._fetchShaderProgram(b),c=!0}catch(d){if(1==this._batchTextureCount)throw"Cannot compile shader "+d;this._batchTextureCount-=4,this._batchTextureCount<1&&(this._batchTextureCount=1),this.vocalDebug&&console.log("Reducing desired texture count due to errors: "+this._batchTextureCount)}},b.updateViewport=function(a,b){this._viewportWidth=0|a,this._viewportHeight=0|b;var c=this._webGLContext;c&&(c.viewport(0,0,this._viewportWidth,this._viewportHeight),this._projectionMatrix=new Float32Array([2/this._viewportWidth,0,0,0,0,-2/this._viewportHeight,1,0,0,0,1,0,-1,1,.1,0]),this._projectionMatrixFlip=new Float32Array([0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]),this._projectionMatrixFlip.set(this._projectionMatrix),this._projectionMatrixFlip[5]*=-1,this._projectionMatrixFlip[13]*=-1)},b.getFilterShader=function(a){a||(a=this);var b=this._webGLContext,c=this._activeShader;if(a._builtShader)c=a._builtShader,a.shaderParamSetup&&(b.useProgram(c),a.shaderParamSetup(b,this,c));else try{c=this._fetchShaderProgram(b,"filter",a.VTX_SHADER_BODY,a.FRAG_SHADER_BODY,a.shaderParamSetup&&a.shaderParamSetup.bind(a)),a._builtShader=c,c._name=a.toString()}catch(d){console&&console.log("SHADER SWITCH FAILURE",d)}return c},b.getBaseTexture=function(a,b){var c=Math.ceil(a>0?a:1)||1,d=Math.ceil(b>0?b:1)||1,e=this._webGLContext,f=e.createTexture();return this.resizeTexture(f,c,d),this.setTextureParams(e,!1),f},b.resizeTexture=function(a,b,c){var d=this._webGLContext;d.bindTexture(d.TEXTURE_2D,a),d.texImage2D(d.TEXTURE_2D,0,d.RGBA,b,c,0,d.RGBA,d.UNSIGNED_BYTE,null),a.width=b,a.height=c},b.getRenderBufferTexture=function(a,b){var c=this._webGLContext,d=this.getBaseTexture(a,b);if(!d)return null;var e=c.createFramebuffer();return e?(d.width=a,d.height=b,c.bindFramebuffer(c.FRAMEBUFFER,e),c.framebufferTexture2D(c.FRAMEBUFFER,c.COLOR_ATTACHMENT0,c.TEXTURE_2D,d,0),e._renderTexture=d,d._frameBuffer=e,d._storeID=this._textureDictionary.length,this._textureDictionary[d._storeID]=d,c.bindFramebuffer(c.FRAMEBUFFER,null),d):null},b.setTextureParams=function(a,b){b&&this._antialias?(a.texParameteri(a.TEXTURE_2D,a.TEXTURE_MIN_FILTER,a.LINEAR),a.texParameteri(a.TEXTURE_2D,a.TEXTURE_MAG_FILTER,a.LINEAR)):(a.texParameteri(a.TEXTURE_2D,a.TEXTURE_MIN_FILTER,a.NEAREST),a.texParameteri(a.TEXTURE_2D,a.TEXTURE_MAG_FILTER,a.NEAREST)),a.texParameteri(a.TEXTURE_2D,a.TEXTURE_WRAP_S,a.CLAMP_TO_EDGE),a.texParameteri(a.TEXTURE_2D,a.TEXTURE_WRAP_T,a.CLAMP_TO_EDGE)},b.setClearColor=function(a){var b,c,d,e,f;"string"==typeof a?0==a.indexOf("#")?(4==a.length&&(a="#"+a.charAt(1)+a.charAt(1)+a.charAt(2)+a.charAt(2)+a.charAt(3)+a.charAt(3)),b=Number("0x"+a.slice(1,3))/255,c=Number("0x"+a.slice(3,5))/255,d=Number("0x"+a.slice(5,7))/255,e=Number("0x"+a.slice(7,9))/255):0==a.indexOf("rgba(")&&(f=a.slice(5,-1).split(","),b=Number(f[0])/255,c=Number(f[1])/255,d=Number(f[2])/255,e=Number(f[3])):(b=((4278190080&a)>>>24)/255,c=((16711680&a)>>>16)/255,d=((65280&a)>>>8)/255,e=(255&a)/255),this._clearColor.r=b||0,this._clearColor.g=c||0,this._clearColor.b=d||0,this._clearColor.a=e||0,this._webGLContext&&this._webGLContext.clearColor(this._clearColor.r,this._clearColor.g,this._clearColor.b,this._clearColor.a)},b.toString=function(){return"[StageGL (name="+this.name+")]"
},b._fetchWebGLContext=function(a,b){var c;try{c=a.getContext("webgl",b)||a.getContext("experimental-webgl",b)}catch(d){}if(c)c.viewportWidth=a.width,c.viewportHeight=a.height;else{var e="Could not initialize WebGL";console.error?console.error(e):console.log(e)}return c},b._fetchShaderProgram=function(b,c,d,e,f){b.useProgram(null);var g,h;switch(c){case"filter":h=a.COVER_VERTEX_HEADER+(d||a.COVER_VERTEX_BODY),g=a.COVER_FRAGMENT_HEADER+(e||a.COVER_FRAGMENT_BODY);break;case"particle":h=a.REGULAR_VERTEX_HEADER+a.PARTICLE_VERTEX_BODY,g=a.REGULAR_FRAGMENT_HEADER+a.PARTICLE_FRAGMENT_BODY;break;case"override":h=a.REGULAR_VERTEX_HEADER+(d||a.REGULAR_VERTEX_BODY),g=a.REGULAR_FRAGMENT_HEADER+(e||a.REGULAR_FRAGMENT_BODY);break;case"regular":default:h=a.REGULAR_VERTEX_HEADER+a.REGULAR_VERTEX_BODY,g=a.REGULAR_FRAGMENT_HEADER+a.REGULAR_FRAGMENT_BODY}var i=this._createShader(b,b.VERTEX_SHADER,h),j=this._createShader(b,b.FRAGMENT_SHADER,g),k=b.createProgram();if(b.attachShader(k,i),b.attachShader(k,j),b.linkProgram(k),k._type=c,!b.getProgramParameter(k,b.LINK_STATUS))throw b.useProgram(this._activeShader),b.getProgramInfoLog(k);switch(b.useProgram(k),c){case"filter":k.vertexPositionAttribute=b.getAttribLocation(k,"vertexPosition"),b.enableVertexAttribArray(k.vertexPositionAttribute),k.uvPositionAttribute=b.getAttribLocation(k,"uvPosition"),b.enableVertexAttribArray(k.uvPositionAttribute),k.samplerUniform=b.getUniformLocation(k,"uSampler"),b.uniform1i(k.samplerUniform,0),k.uprightUniform=b.getUniformLocation(k,"uUpright"),b.uniform1f(k.uprightUniform,0),f&&f(b,this,k);break;case"override":case"particle":case"regular":default:k.vertexPositionAttribute=b.getAttribLocation(k,"vertexPosition"),b.enableVertexAttribArray(k.vertexPositionAttribute),k.uvPositionAttribute=b.getAttribLocation(k,"uvPosition"),b.enableVertexAttribArray(k.uvPositionAttribute),k.textureIndexAttribute=b.getAttribLocation(k,"textureIndex"),b.enableVertexAttribArray(k.textureIndexAttribute),k.alphaAttribute=b.getAttribLocation(k,"objectAlpha"),b.enableVertexAttribArray(k.alphaAttribute);for(var l=[],m=0;m<this._batchTextureCount;m++)l[m]=m;k.samplerData=l,k.samplerUniform=b.getUniformLocation(k,"uSampler"),b.uniform1iv(k.samplerUniform,l),k.pMatrixUniform=b.getUniformLocation(k,"pMatrix")}return b.useProgram(this._activeShader),k},b._createShader=function(b,c,d){d=d.replace(/{{count}}/g,this._batchTextureCount);for(var e="",f=1;f<this._batchTextureCount;f++)e+="} else if (indexPicker <= "+f+".5) { color = texture2D(uSampler["+f+"], vTextureCoord);";d=d.replace(/{{alternates}}/g,e),d=d.replace(/{{fragColor}}/g,this._premultiply?a.REGULAR_FRAG_COLOR_PREMULTIPLY:a.REGULAR_FRAG_COLOR_NORMAL);var g=b.createShader(c);if(b.shaderSource(g,d),b.compileShader(g),!b.getShaderParameter(g,b.COMPILE_STATUS))throw b.getShaderInfoLog(g);return g},b._createBuffers=function(b){var c,d,e,f=this._maxCardsPerBatch*a.INDICIES_PER_CARD,g=this._vertexPositionBuffer=b.createBuffer();b.bindBuffer(b.ARRAY_BUFFER,g),c=2;var h=this._vertices=new Float32Array(f*c);for(d=0,e=h.length;e>d;d+=c)h[d]=h[d+1]=0;b.bufferData(b.ARRAY_BUFFER,h,b.DYNAMIC_DRAW),g.itemSize=c,g.numItems=f;var i=this._uvPositionBuffer=b.createBuffer();b.bindBuffer(b.ARRAY_BUFFER,i),c=2;var j=this._uvs=new Float32Array(f*c);for(d=0,e=j.length;e>d;d+=c)j[d]=j[d+1]=0;b.bufferData(b.ARRAY_BUFFER,j,b.DYNAMIC_DRAW),i.itemSize=c,i.numItems=f;var k=this._textureIndexBuffer=b.createBuffer();b.bindBuffer(b.ARRAY_BUFFER,k),c=1;var l=this._indices=new Float32Array(f*c);for(d=0,e=l.length;e>d;d++)l[d]=0;b.bufferData(b.ARRAY_BUFFER,l,b.DYNAMIC_DRAW),k.itemSize=c,k.numItems=f;var m=this._alphaBuffer=b.createBuffer();b.bindBuffer(b.ARRAY_BUFFER,m),c=1;var n=this._alphas=new Float32Array(f*c);for(d=0,e=n.length;e>d;d++)n[d]=1;b.bufferData(b.ARRAY_BUFFER,n,b.DYNAMIC_DRAW),m.itemSize=c,m.numItems=f},b._initTextures=function(){this._lastTextureInsert=-1,this._textureDictionary=[],this._textureIDs={},this._baseTextures=[],this._batchTextures=[];for(var a=0;a<this._batchTextureCount;a++){var b=this.getBaseTexture();if(this._baseTextures[a]=this._batchTextures[a]=b,!b)throw"Problems creating basic textures, known causes include using too much VRAM by not releasing WebGL texture instances"}},b._loadTextureImage=function(a,b){var c=b.src;c||(b._isCanvas=!0,c=b.src="canvas_"+this._lastTrackedCanvas++);var d=this._textureIDs[c];void 0===d&&(d=this._textureIDs[c]=this._textureDictionary.length),void 0===this._textureDictionary[d]&&(this._textureDictionary[d]=this.getBaseTexture());var e=this._textureDictionary[d];if(e)e._batchID=this._batchID,e._storeID=d,e._imageData=b,this._insertTextureInBatch(a,e),b._storeID=d,b.complete||b.naturalWidth||b._isCanvas?this._updateTextureImageData(a,b):b.addEventListener("load",this._updateTextureImageData.bind(this,a,b));else{var f="Problem creating desired texture, known causes include using too much VRAM by not releasing WebGL texture instances";console.error&&console.error(f)||console.log(f),e=this._baseTextures[0],e._batchID=this._batchID,e._storeID=-1,e._imageData=e,this._insertTextureInBatch(a,e)}return e},b._updateTextureImageData=function(a,b){var c=b.width&b.width-1||b.height&b.height-1,d=this._textureDictionary[b._storeID];a.activeTexture(a.TEXTURE0+d._activeIndex),a.bindTexture(a.TEXTURE_2D,d),d.isPOT=!c,this.setTextureParams(a,d.isPOT);try{a.texImage2D(a.TEXTURE_2D,0,a.RGBA,a.RGBA,a.UNSIGNED_BYTE,b)}catch(e){var f="\nAn error has occurred. This is most likely due to security restrictions on WebGL images with local or cross-domain origins";console.error?(console.error(f),console.error(e)):console&&(console.log(f),console.log(e))}b._invalid=!1,d._w=b.width,d._h=b.height,this.vocalDebug&&(c&&console.warn("NPOT(Non Power of Two) Texture: "+b.src),(b.width>a.MAX_TEXTURE_SIZE||b.height>a.MAX_TEXTURE_SIZE)&&console&&console.error("Oversized Texture: "+b.width+"x"+b.height+" vs "+a.MAX_TEXTURE_SIZE+"max"))},b._insertTextureInBatch=function(a,b){if(this._batchTextures[b._activeIndex]!==b){var c=-1,d=(this._lastTextureInsert+1)%this._batchTextureCount,e=d;do{if(this._batchTextures[e]._batchID!=this._batchID&&!this._slotBlacklist[e]){c=e;break}e=(e+1)%this._batchTextureCount}while(e!==d);-1===c&&(this.batchReason="textureOverflow",this._drawBuffers(a),this.batchCardCount=0,c=d),this._batchTextures[c]=b,b._activeIndex=c;var f=b._imageData;f&&f._invalid&&void 0!==b._drawID?this._updateTextureImageData(a,f):(a.activeTexture(a.TEXTURE0+c),a.bindTexture(a.TEXTURE_2D,b),this.setTextureParams(a)),this._lastTextureInsert=c}else{var f=b._imageData;void 0!=b._storeID&&f&&f._invalid&&this._updateTextureImageData(a,f)}b._drawID=this._drawID,b._batchID=this._batchID},b._killTextureObject=function(a){if(a){var b=this._webGLContext;if(void 0!==a._storeID&&a._storeID>=0){this._textureDictionary[a._storeID]=void 0;for(var c in this._textureIDs)this._textureIDs[c]==a._storeID&&delete this._textureIDs[c];a._imageData&&(a._imageData._storeID=void 0),a._imageData=a._storeID=void 0}void 0!==a._activeIndex&&this._batchTextures[a._activeIndex]===a&&(this._batchTextures[a._activeIndex]=this._baseTextures[a._activeIndex]);try{a._frameBuffer&&b.deleteFramebuffer(a._frameBuffer),a._frameBuffer=void 0}catch(d){this.vocalDebug&&console.log(d)}try{b.deleteTexture(a)}catch(d){this.vocalDebug&&console.log(d)}}},b._backupBatchTextures=function(a,b){var c=this._webGLContext;this._backupTextures||(this._backupTextures=[]),void 0===b&&(b=this._backupTextures);for(var d=0;d<this._batchTextureCount;d++)c.activeTexture(c.TEXTURE0+d),a?this._batchTextures[d]=b[d]:(b[d]=this._batchTextures[d],this._batchTextures[d]=this._baseTextures[d]),c.bindTexture(c.TEXTURE_2D,this._batchTextures[d]),this.setTextureParams(c,this._batchTextures[d].isPOT);a&&b===this._backupTextures&&(this._backupTextures=[])},b._batchDraw=function(a,b,c){this._isDrawing>0&&this._drawBuffers(b),this._isDrawing++,this._drawID++,this.batchCardCount=0,this.depth=0,this._appendToBatchGroup(a,b,new createjs.Matrix2D,this.alpha,c),this.batchReason="drawFinish",this._drawBuffers(b),this._isDrawing--},b._cacheDraw=function(a,b,c,d){var e,f=this._activeShader,g=this._slotBlacklist,h=this._maxTextureSlots-1,i=this._viewportWidth,j=this._viewportHeight;this.protectTextureSlot(h,!0);var k=b.getMatrix();k=k.clone(),k.scale(1/d.scale,1/d.scale),k=k.invert(),k.translate(-d.offX/d.scale*b.scaleX,-d.offY/d.scale*b.scaleY);var l=this._cacheContainer;l.children=[b],l.transformMatrix=k,this._backupBatchTextures(!1),c&&c.length?this._drawFilters(b,c,d):this.isCacheControlled?(a.clear(a.COLOR_BUFFER_BIT),this._batchDraw(l,a,!0)):(a.activeTexture(a.TEXTURE0+h),b.cacheCanvas=this.getTargetRenderTexture(b,d._drawWidth,d._drawHeight),e=b.cacheCanvas,a.bindFramebuffer(a.FRAMEBUFFER,e._frameBuffer),this.updateViewport(d._drawWidth,d._drawHeight),this._projectionMatrix=this._projectionMatrixFlip,a.clear(a.COLOR_BUFFER_BIT),this._batchDraw(l,a,!0),a.bindFramebuffer(a.FRAMEBUFFER,null),this.updateViewport(i,j)),this._backupBatchTextures(!0),this.protectTextureSlot(h,!1),this._activeShader=f,this._slotBlacklist=g},b._drawFilters=function(a,b,c){var d,e=this._webGLContext,f=this._maxTextureSlots-1,g=this._viewportWidth,h=this._viewportHeight,i=this._cacheContainer,j=b.length;e.activeTexture(e.TEXTURE0+f),d=this.getTargetRenderTexture(a,c._drawWidth,c._drawHeight),e.bindFramebuffer(e.FRAMEBUFFER,d._frameBuffer),this.updateViewport(c._drawWidth,c._drawHeight),e.clear(e.COLOR_BUFFER_BIT),this._batchDraw(i,e,!0),e.activeTexture(e.TEXTURE0),e.bindTexture(e.TEXTURE_2D,d),this.setTextureParams(e);var k=!1,l=0,m=b[l];do this._activeShader=this.getFilterShader(m),this._activeShader&&(e.activeTexture(e.TEXTURE0+f),d=this.getTargetRenderTexture(a,c._drawWidth,c._drawHeight),e.bindFramebuffer(e.FRAMEBUFFER,d._frameBuffer),e.viewport(0,0,c._drawWidth,c._drawHeight),e.clear(e.COLOR_BUFFER_BIT),this._drawCover(e,k),e.activeTexture(e.TEXTURE0),e.bindTexture(e.TEXTURE_2D,d),this.setTextureParams(e),(j>1||b[0]._multiPass)&&(k=!k),m=null!==m._multiPass?m._multiPass:b[++l]);while(m);this.isCacheControlled?(e.bindFramebuffer(e.FRAMEBUFFER,null),this.updateViewport(g,h),this._activeShader=this.getFilterShader(this),e.clear(e.COLOR_BUFFER_BIT),this._drawCover(e,k)):(k&&(e.activeTexture(e.TEXTURE0+f),d=this.getTargetRenderTexture(a,c._drawWidth,c._drawHeight),e.bindFramebuffer(e.FRAMEBUFFER,d._frameBuffer),this._activeShader=this.getFilterShader(this),e.viewport(0,0,c._drawWidth,c._drawHeight),e.clear(e.COLOR_BUFFER_BIT),this._drawCover(e,!k)),e.bindFramebuffer(e.FRAMEBUFFER,null),this.updateViewport(g,h),a.cacheCanvas=d)},b._appendToBatchGroup=function(b,c,d,e,f){b._glMtx||(b._glMtx=new createjs.Matrix2D);var g=b._glMtx;g.copy(d),b.transformMatrix?g.appendMatrix(b.transformMatrix):g.appendTransform(b.x,b.y,b.scaleX,b.scaleY,b.rotation,b.skewX,b.skewY,b.regX,b.regY);for(var h,i,j,k,l=b.children.length,m=0;l>m;m++){var n=b.children[m];if(n.visible&&e)if(n.cacheCanvas&&!f||(n._updateState&&n._updateState(),!n.children)){this.batchCardCount+1>this._maxCardsPerBatch&&(this.batchReason="vertexOverflow",this._drawBuffers(c),this.batchCardCount=0),n._glMtx||(n._glMtx=new createjs.Matrix2D);var o=n._glMtx;o.copy(g),n.transformMatrix?o.appendMatrix(n.transformMatrix):o.appendTransform(n.x,n.y,n.scaleX,n.scaleY,n.rotation,n.skewX,n.skewY,n.regX,n.regY);var p,q,r,s,t,u,v=n.cacheCanvas&&!f;if(2===n._webGLRenderStyle||v)r=(f?!1:n.cacheCanvas)||n.image;else{if(1!==n._webGLRenderStyle)continue;if(s=n.spriteSheet.getFrame(n.currentFrame),null===s)continue;r=s.image}var w=this._uvs,x=this._vertices,y=this._indices,z=this._alphas;if(r){if(void 0===r._storeID)t=this._loadTextureImage(c,r),this._insertTextureInBatch(c,t);else{if(t=this._textureDictionary[r._storeID],!t){this.vocalDebug&&console.log("Texture should not be looked up while not being stored.");continue}t._batchID!==this._batchID&&this._insertTextureInBatch(c,t)}if(q=t._activeIndex,2===n._webGLRenderStyle||v)!v&&n.sourceRect?(n._uvRect||(n._uvRect={}),u=n.sourceRect,p=n._uvRect,p.t=u.y/r.height,p.l=u.x/r.width,p.b=(u.y+u.height)/r.height,p.r=(u.x+u.width)/r.width,h=0,i=0,j=u.width+h,k=u.height+i):(p=a.UV_RECT,v?(u=n.bitmapCache,h=u.x+u._filterOffX/u.scale,i=u.y+u._filterOffY/u.scale,j=u._drawWidth/u.scale+h,k=u._drawHeight/u.scale+i):(h=0,i=0,j=r.width+h,k=r.height+i));else if(1===n._webGLRenderStyle){var A=s.rect;p=s.uvRect,p||(p=a.buildUVRects(n.spriteSheet,n.currentFrame,!1)),h=-s.regX,i=-s.regY,j=A.width-s.regX,k=A.height-s.regY}var B=this.batchCardCount*a.INDICIES_PER_CARD,C=2*B;x[C]=h*o.a+i*o.c+o.tx,x[C+1]=h*o.b+i*o.d+o.ty,x[C+2]=h*o.a+k*o.c+o.tx,x[C+3]=h*o.b+k*o.d+o.ty,x[C+4]=j*o.a+i*o.c+o.tx,x[C+5]=j*o.b+i*o.d+o.ty,x[C+6]=x[C+2],x[C+7]=x[C+3],x[C+8]=x[C+4],x[C+9]=x[C+5],x[C+10]=j*o.a+k*o.c+o.tx,x[C+11]=j*o.b+k*o.d+o.ty,w[C]=p.l,w[C+1]=p.t,w[C+2]=p.l,w[C+3]=p.b,w[C+4]=p.r,w[C+5]=p.t,w[C+6]=p.l,w[C+7]=p.b,w[C+8]=p.r,w[C+9]=p.t,w[C+10]=p.r,w[C+11]=p.b,y[B]=y[B+1]=y[B+2]=y[B+3]=y[B+4]=y[B+5]=q,z[B]=z[B+1]=z[B+2]=z[B+3]=z[B+4]=z[B+5]=n.alpha*e,this.batchCardCount++}}else this._appendToBatchGroup(n,c,g,n.alpha*e)}},b._drawBuffers=function(b){if(!(this.batchCardCount<=0)){this.vocalDebug&&console.log("Draw["+this._drawID+":"+this._batchID+"] : "+this.batchReason);var c=this._activeShader,d=this._vertexPositionBuffer,e=this._textureIndexBuffer,f=this._uvPositionBuffer,g=this._alphaBuffer;b.useProgram(c),b.bindBuffer(b.ARRAY_BUFFER,d),b.vertexAttribPointer(c.vertexPositionAttribute,d.itemSize,b.FLOAT,!1,0,0),b.bufferSubData(b.ARRAY_BUFFER,0,this._vertices),b.bindBuffer(b.ARRAY_BUFFER,e),b.vertexAttribPointer(c.textureIndexAttribute,e.itemSize,b.FLOAT,!1,0,0),b.bufferSubData(b.ARRAY_BUFFER,0,this._indices),b.bindBuffer(b.ARRAY_BUFFER,f),b.vertexAttribPointer(c.uvPositionAttribute,f.itemSize,b.FLOAT,!1,0,0),b.bufferSubData(b.ARRAY_BUFFER,0,this._uvs),b.bindBuffer(b.ARRAY_BUFFER,g),b.vertexAttribPointer(c.alphaAttribute,g.itemSize,b.FLOAT,!1,0,0),b.bufferSubData(b.ARRAY_BUFFER,0,this._alphas),b.uniformMatrix4fv(c.pMatrixUniform,b.FALSE,this._projectionMatrix);for(var h=0;h<this._batchTextureCount;h++){var i=this._batchTextures[h];b.activeTexture(b.TEXTURE0+h),b.bindTexture(b.TEXTURE_2D,i),this.setTextureParams(b,i.isPOT)}b.drawArrays(b.TRIANGLES,0,this.batchCardCount*a.INDICIES_PER_CARD),this._batchID++}},b._drawCover=function(b,c){this._isDrawing>0&&this._drawBuffers(b),this.vocalDebug&&console.log("Draw["+this._drawID+":"+this._batchID+"] : Cover");var d=this._activeShader,e=this._vertexPositionBuffer,f=this._uvPositionBuffer;b.clear(b.COLOR_BUFFER_BIT),b.useProgram(d),b.bindBuffer(b.ARRAY_BUFFER,e),b.vertexAttribPointer(d.vertexPositionAttribute,e.itemSize,b.FLOAT,!1,0,0),b.bufferSubData(b.ARRAY_BUFFER,0,a.COVER_VERT),b.bindBuffer(b.ARRAY_BUFFER,f),b.vertexAttribPointer(d.uvPositionAttribute,f.itemSize,b.FLOAT,!1,0,0),b.bufferSubData(b.ARRAY_BUFFER,0,c?a.COVER_UV_FLIP:a.COVER_UV),b.uniform1i(d.samplerUniform,0),b.uniform1f(d.uprightUniform,c?0:1),b.drawArrays(b.TRIANGLES,0,a.INDICIES_PER_CARD)},createjs.StageGL=createjs.promote(a,"Stage")}(),this.createjs=this.createjs||{},function(){function a(a){this.DisplayObject_constructor(),"string"==typeof a?(this.image=document.createElement("img"),this.image.src=a):this.image=a,this.sourceRect=null,this._webGLRenderStyle=createjs.DisplayObject._StageGL_BITMAP}var b=createjs.extend(a,createjs.DisplayObject);b.initialize=a,b.isVisible=function(){var a=this.image,b=this.cacheCanvas||a&&(a.naturalWidth||a.getContext||a.readyState>=2);return!!(this.visible&&this.alpha>0&&0!=this.scaleX&&0!=this.scaleY&&b)},b.draw=function(a,b){if(this.DisplayObject_draw(a,b))return!0;var c=this.image,d=this.sourceRect;if(c.getImage&&(c=c.getImage()),!c)return!0;if(d){var e=d.x,f=d.y,g=e+d.width,h=f+d.height,i=0,j=0,k=c.width,l=c.height;0>e&&(i-=e,e=0),g>k&&(g=k),0>f&&(j-=f,f=0),h>l&&(h=l),a.drawImage(c,e,f,g-e,h-f,i,j,g-e,h-f)}else a.drawImage(c,0,0);return!0},b.getBounds=function(){var a=this.DisplayObject_getBounds();if(a)return a;var b=this.image,c=this.sourceRect||b,d=b&&(b.naturalWidth||b.getContext||b.readyState>=2);return d?this._rectangle.setValues(0,0,c.width,c.height):null},b.clone=function(b){var c=this.image;c&&b&&(c=c.cloneNode());var d=new a(c);return this.sourceRect&&(d.sourceRect=this.sourceRect.clone()),this._cloneProps(d),d},b.toString=function(){return"[Bitmap (name="+this.name+")]"},createjs.Bitmap=createjs.promote(a,"DisplayObject")}(),this.createjs=this.createjs||{},function(){"use strict";function a(a,b){this.DisplayObject_constructor(),this.currentFrame=0,this.currentAnimation=null,this.paused=!0,this.spriteSheet=a,this.currentAnimationFrame=0,this.framerate=0,this._animation=null,this._currentFrame=null,this._skipAdvance=!1,this._webGLRenderStyle=createjs.DisplayObject._StageGL_SPRITE,null!=b&&this.gotoAndPlay(b)}var b=createjs.extend(a,createjs.DisplayObject);b.initialize=a,b.isVisible=function(){var a=this.cacheCanvas||this.spriteSheet.complete;return!!(this.visible&&this.alpha>0&&0!=this.scaleX&&0!=this.scaleY&&a)},b.draw=function(a,b){if(this.DisplayObject_draw(a,b))return!0;this._normalizeFrame();var c=this.spriteSheet.getFrame(0|this._currentFrame);if(!c)return!1;var d=c.rect;return d.width&&d.height&&a.drawImage(c.image,d.x,d.y,d.width,d.height,-c.regX,-c.regY,d.width,d.height),!0},b.play=function(){this.paused=!1},b.stop=function(){this.paused=!0},b.gotoAndPlay=function(a){this.paused=!1,this._skipAdvance=!0,this._goto(a)},b.gotoAndStop=function(a){this.paused=!0,this._goto(a)},b.advance=function(a){var b=this.framerate||this.spriteSheet.framerate,c=b&&null!=a?a/(1e3/b):1;this._normalizeFrame(c)},b.getBounds=function(){return this.DisplayObject_getBounds()||this.spriteSheet.getFrameBounds(this.currentFrame,this._rectangle)},b.clone=function(){return this._cloneProps(new a(this.spriteSheet))},b.toString=function(){return"[Sprite (name="+this.name+")]"},b._cloneProps=function(a){return this.DisplayObject__cloneProps(a),a.currentFrame=this.currentFrame,a.currentAnimation=this.currentAnimation,a.paused=this.paused,a.currentAnimationFrame=this.currentAnimationFrame,a.framerate=this.framerate,a._animation=this._animation,a._currentFrame=this._currentFrame,a._skipAdvance=this._skipAdvance,a},b._tick=function(a){this.paused||(this._skipAdvance||this.advance(a&&a.delta),this._skipAdvance=!1),this.DisplayObject__tick(a)},b._normalizeFrame=function(a){a=a||0;var b,c=this._animation,d=this.paused,e=this._currentFrame;if(c){var f=c.speed||1,g=this.currentAnimationFrame;if(b=c.frames.length,g+a*f>=b){var h=c.next;if(this._dispatchAnimationEnd(c,e,d,h,b-1))return;if(h)return this._goto(h,a-(b-g)/f);this.paused=!0,g=c.frames.length-1}else g+=a*f;this.currentAnimationFrame=g,this._currentFrame=c.frames[0|g]}else if(e=this._currentFrame+=a,b=this.spriteSheet.getNumFrames(),e>=b&&b>0&&!this._dispatchAnimationEnd(c,e,d,b-1)&&(this._currentFrame-=b)>=b)return this._normalizeFrame();e=0|this._currentFrame,this.currentFrame!=e&&(this.currentFrame=e,this.dispatchEvent("change"))},b._dispatchAnimationEnd=function(a,b,c,d,e){var f=a?a.name:null;if(this.hasEventListener("animationend")){var g=new createjs.Event("animationend");g.name=f,g.next=d,this.dispatchEvent(g)}var h=this._animation!=a||this._currentFrame!=b;return h||c||!this.paused||(this.currentAnimationFrame=e,h=!0),h},b._goto=function(a,b){if(this.currentAnimationFrame=0,isNaN(a)){var c=this.spriteSheet.getAnimation(a);c&&(this._animation=c,this.currentAnimation=a,this._normalizeFrame(b))}else this.currentAnimation=this._animation=null,this._currentFrame=a,this._normalizeFrame()},createjs.Sprite=createjs.promote(a,"DisplayObject")}(),this.createjs=this.createjs||{},function(){"use strict";function a(a){this.DisplayObject_constructor(),this.graphics=a?a:new createjs.Graphics}var b=createjs.extend(a,createjs.DisplayObject);b.isVisible=function(){var a=this.cacheCanvas||this.graphics&&!this.graphics.isEmpty();return!!(this.visible&&this.alpha>0&&0!=this.scaleX&&0!=this.scaleY&&a)},b.draw=function(a,b){return this.DisplayObject_draw(a,b)?!0:(this.graphics.draw(a,this),!0)},b.clone=function(b){var c=b&&this.graphics?this.graphics.clone():this.graphics;return this._cloneProps(new a(c))},b.toString=function(){return"[Shape (name="+this.name+")]"},createjs.Shape=createjs.promote(a,"DisplayObject")}(),this.createjs=this.createjs||{},function(){"use strict";function a(a,b,c){this.DisplayObject_constructor(),this.text=a,this.font=b,this.color=c,this.textAlign="left",this.textBaseline="top",this.maxWidth=null,this.outline=0,this.lineHeight=0,this.lineWidth=null}var b=createjs.extend(a,createjs.DisplayObject),c=createjs.createCanvas?createjs.createCanvas():document.createElement("canvas");c.getContext&&(a._workingContext=c.getContext("2d"),c.width=c.height=1),a.H_OFFSETS={start:0,left:0,center:-.5,end:-1,right:-1},a.V_OFFSETS={top:0,hanging:-.01,middle:-.4,alphabetic:-.8,ideographic:-.85,bottom:-1},b.isVisible=function(){var a=this.cacheCanvas||null!=this.text&&""!==this.text;return!!(this.visible&&this.alpha>0&&0!=this.scaleX&&0!=this.scaleY&&a)},b.draw=function(a,b){if(this.DisplayObject_draw(a,b))return!0;var c=this.color||"#000";return this.outline?(a.strokeStyle=c,a.lineWidth=1*this.outline):a.fillStyle=c,this._drawText(this._prepContext(a)),!0},b.getMeasuredWidth=function(){return this._getMeasuredWidth(this.text)},b.getMeasuredLineHeight=function(){return 1.2*this._getMeasuredWidth("M")},b.getMeasuredHeight=function(){return this._drawText(null,{}).height},b.getBounds=function(){var b=this.DisplayObject_getBounds();if(b)return b;if(null==this.text||""===this.text)return null;var c=this._drawText(null,{}),d=this.maxWidth&&this.maxWidth<c.width?this.maxWidth:c.width,e=d*a.H_OFFSETS[this.textAlign||"left"],f=this.lineHeight||this.getMeasuredLineHeight(),g=f*a.V_OFFSETS[this.textBaseline||"top"];return this._rectangle.setValues(e,g,d,c.height)},b.getMetrics=function(){var b={lines:[]};return b.lineHeight=this.lineHeight||this.getMeasuredLineHeight(),b.vOffset=b.lineHeight*a.V_OFFSETS[this.textBaseline||"top"],this._drawText(null,b,b.lines)},b.clone=function(){return this._cloneProps(new a(this.text,this.font,this.color))},b.toString=function(){return"[Text (text="+(this.text.length>20?this.text.substr(0,17)+"...":this.text)+")]"},b._cloneProps=function(a){return this.DisplayObject__cloneProps(a),a.textAlign=this.textAlign,a.textBaseline=this.textBaseline,a.maxWidth=this.maxWidth,a.outline=this.outline,a.lineHeight=this.lineHeight,a.lineWidth=this.lineWidth,a},b._prepContext=function(a){return a.font=this.font||"10px sans-serif",a.textAlign=this.textAlign||"left",a.textBaseline=this.textBaseline||"top",a.lineJoin="miter",a.miterLimit=2.5,a},b._drawText=function(b,c,d){var e=!!b;e||(b=a._workingContext,b.save(),this._prepContext(b));for(var f=this.lineHeight||this.getMeasuredLineHeight(),g=0,h=0,i=String(this.text).split(/(?:\r\n|\r|\n)/),j=0,k=i.length;k>j;j++){var l=i[j],m=null;if(null!=this.lineWidth&&(m=b.measureText(l).width)>this.lineWidth){var n=l.split(/(\s)/);l=n[0],m=b.measureText(l).width;for(var o=1,p=n.length;p>o;o+=2){var q=b.measureText(n[o]+n[o+1]).width;m+q>this.lineWidth?(e&&this._drawTextLine(b,l,h*f),d&&d.push(l),m>g&&(g=m),l=n[o+1],m=b.measureText(l).width,h++):(l+=n[o]+n[o+1],m+=q)}}e&&this._drawTextLine(b,l,h*f),d&&d.push(l),c&&null==m&&(m=b.measureText(l).width),m>g&&(g=m),h++}return c&&(c.width=g,c.height=h*f),e||b.restore(),c},b._drawTextLine=function(a,b,c){this.outline?a.strokeText(b,0,c,this.maxWidth||65535):a.fillText(b,0,c,this.maxWidth||65535)},b._getMeasuredWidth=function(b){var c=a._workingContext;c.save();var d=this._prepContext(c).measureText(b).width;return c.restore(),d},createjs.Text=createjs.promote(a,"DisplayObject")}(),this.createjs=this.createjs||{},function(){"use strict";function a(a,b){this.Container_constructor(),this.text=a||"",this.spriteSheet=b,this.lineHeight=0,this.letterSpacing=0,this.spaceWidth=0,this._oldProps={text:0,spriteSheet:0,lineHeight:0,letterSpacing:0,spaceWidth:0},this._oldStage=null,this._drawAction=null}var b=createjs.extend(a,createjs.Container);a.maxPoolSize=100,a._spritePool=[],b.draw=function(a,b){this.DisplayObject_draw(a,b)||(this._updateState(),this.Container_draw(a,b))},b.getBounds=function(){return this._updateText(),this.Container_getBounds()},b.isVisible=function(){var a=this.cacheCanvas||this.spriteSheet&&this.spriteSheet.complete&&this.text;return!!(this.visible&&this.alpha>0&&0!==this.scaleX&&0!==this.scaleY&&a)},b.clone=function(){return this._cloneProps(new a(this.text,this.spriteSheet))},b.addChild=b.addChildAt=b.removeChild=b.removeChildAt=b.removeAllChildren=function(){},b._updateState=function(){this._updateText()},b._cloneProps=function(a){return this.Container__cloneProps(a),a.lineHeight=this.lineHeight,a.letterSpacing=this.letterSpacing,a.spaceWidth=this.spaceWidth,a},b._getFrameIndex=function(a,b){var c,d=b.getAnimation(a);return d||(a!=(c=a.toUpperCase())||a!=(c=a.toLowerCase())||(c=null),c&&(d=b.getAnimation(c))),d&&d.frames[0]},b._getFrame=function(a,b){var c=this._getFrameIndex(a,b);return null==c?c:b.getFrame(c)},b._getLineHeight=function(a){var b=this._getFrame("1",a)||this._getFrame("T",a)||this._getFrame("L",a)||a.getFrame(0);return b?b.rect.height:1},b._getSpaceWidth=function(a){var b=this._getFrame("1",a)||this._getFrame("l",a)||this._getFrame("e",a)||this._getFrame("a",a)||a.getFrame(0);return b?b.rect.width:1},b._updateText=function(){var b,c=0,d=0,e=this._oldProps,f=!1,g=this.spaceWidth,h=this.lineHeight,i=this.spriteSheet,j=a._spritePool,k=this.children,l=0,m=k.length;for(var n in e)e[n]!=this[n]&&(e[n]=this[n],f=!0);if(f){var o=!!this._getFrame(" ",i);o||g||(g=this._getSpaceWidth(i)),h||(h=this._getLineHeight(i));for(var p=0,q=this.text.length;q>p;p++){var r=this.text.charAt(p);if(" "!=r||o)if("\n"!=r&&"\r"!=r){var s=this._getFrameIndex(r,i);null!=s&&(m>l?b=k[l]:(k.push(b=j.length?j.pop():new createjs.Sprite),b.parent=this,m++),b.spriteSheet=i,b.gotoAndStop(s),b.x=c,b.y=d,l++,c+=b.getBounds().width+this.letterSpacing)}else"\r"==r&&"\n"==this.text.charAt(p+1)&&p++,c=0,d+=h;else c+=g}for(;m>l;)j.push(b=k.pop()),b.parent=null,m--;j.length>a.maxPoolSize&&(j.length=a.maxPoolSize)}},createjs.BitmapText=createjs.promote(a,"Container")}(),this.createjs=this.createjs||{},function(){"use strict";function a(b){this.Container_constructor(),!a.inited&&a.init();var c,d,e,f;b instanceof String||arguments.length>1?(c=b,d=arguments[1],e=arguments[2],f=arguments[3],null==e&&(e=-1),b=null):b&&(c=b.mode,d=b.startPosition,e=b.loop,f=b.labels),b||(b={labels:f}),this.mode=c||a.INDEPENDENT,this.startPosition=d||0,this.loop=e===!0?-1:e||0,this.currentFrame=0,this.paused=b.paused||!1,this.actionsEnabled=!0,this.autoReset=!0,this.frameBounds=this.frameBounds||b.frameBounds,this.framerate=null,b.useTicks=b.paused=!0,this.timeline=new createjs.Timeline(b),this._synchOffset=0,this._rawPosition=-1,this._bound_resolveState=this._resolveState.bind(this),this._t=0,this._managed={}}function b(){throw"MovieClipPlugin cannot be instantiated."}var c=createjs.extend(a,createjs.Container);a.INDEPENDENT="independent",a.SINGLE_FRAME="single",a.SYNCHED="synched",a.inited=!1,a.init=function(){a.inited||(b.install(),a.inited=!0)},c._getLabels=function(){return this.timeline.getLabels()},c.getLabels=createjs.deprecate(c._getLabels,"MovieClip.getLabels"),c._getCurrentLabel=function(){return this.timeline.currentLabel},c.getCurrentLabel=createjs.deprecate(c._getCurrentLabel,"MovieClip.getCurrentLabel"),c._getDuration=function(){return this.timeline.duration},c.getDuration=createjs.deprecate(c._getDuration,"MovieClip.getDuration");try{Object.defineProperties(c,{labels:{get:c._getLabels},currentLabel:{get:c._getCurrentLabel},totalFrames:{get:c._getDuration},duration:{get:c._getDuration}})}catch(d){}c.initialize=a,c.isVisible=function(){return!!(this.visible&&this.alpha>0&&0!=this.scaleX&&0!=this.scaleY)},c.draw=function(a,b){return this.DisplayObject_draw(a,b)?!0:(this._updateState(),this.Container_draw(a,b),!0)},c.play=function(){this.paused=!1},c.stop=function(){this.paused=!0},c.gotoAndPlay=function(a){this.paused=!1,this._goto(a)},c.gotoAndStop=function(a){this.paused=!0,this._goto(a)},c.advance=function(b){var c=a.INDEPENDENT;if(this.mode===c){for(var d=this,e=d.framerate;(d=d.parent)&&null===e;)d.mode===c&&(e=d._framerate);if(this._framerate=e,!this.paused){var f=null!==e&&-1!==e&&null!==b?b/(1e3/e)+this._t:1,g=0|f;for(this._t=f-g;g--;)this._updateTimeline(this._rawPosition+1,!1)}}},c.clone=function(){throw"MovieClip cannot be cloned."},c.toString=function(){return"[MovieClip (name="+this.name+")]"},c._updateState=function(){(-1===this._rawPosition||this.mode!==a.INDEPENDENT)&&this._updateTimeline(-1)},c._tick=function(a){this.advance(a&&a.delta),this.Container__tick(a)},c._goto=function(a){var b=this.timeline.resolve(a);null!=b&&(this._t=0,this._updateTimeline(b,!0))},c._reset=function(){this._rawPosition=-1,this._t=this.currentFrame=0,this.paused=!1},c._updateTimeline=function(b,c){var d=this.mode!==a.INDEPENDENT,e=this.timeline;d&&(b=this.startPosition+(this.mode===a.SINGLE_FRAME?0:this._synchOffset)),0>b&&(b=0),(this._rawPosition!==b||d)&&(this._rawPosition=b,e.loop=this.loop,e.setPosition(b,d||!this.actionsEnabled,c,this._bound_resolveState))},c._renderFirstFrame=function(){var a=this.timeline,b=a.rawPosition;a.setPosition(0,!0,!0,this._bound_resolveState),a.rawPosition=b},c._resolveState=function(){var a=this.timeline;this.currentFrame=a.position;for(var b in this._managed)this._managed[b]=1;for(var c=a.tweens,d=0,e=c.length;e>d;d++){var f=c[d],g=f.target;if(g!==this&&!f.passive){var h=f._stepPosition;g instanceof createjs.DisplayObject?this._addManagedChild(g,h):this._setState(g.state,h)}}var i=this.children;for(d=i.length-1;d>=0;d--){var j=i[d].id;1===this._managed[j]&&(this.removeChildAt(d),delete this._managed[j])}},c._setState=function(a,b){if(a)for(var c=a.length-1;c>=0;c--){var d=a[c],e=d.t,f=d.p;for(var g in f)e[g]=f[g];this._addManagedChild(e,b)}},c._addManagedChild=function(b,c){b._off||(this.addChildAt(b,0),b instanceof a&&(b._synchOffset=c,b.mode===a.INDEPENDENT&&b.autoReset&&!this._managed[b.id]&&b._reset()),this._managed[b.id]=2)},c._getBounds=function(a,b){var c=this.DisplayObject_getBounds();return c||this.frameBounds&&(c=this._rectangle.copy(this.frameBounds[this.currentFrame])),c?this._transformBounds(c,a,b):this.Container__getBounds(a,b)},createjs.MovieClip=createjs.promote(a,"Container"),b.priority=100,b.ID="MovieClip",b.install=function(){createjs.Tween._installPlugin(b)},b.init=function(c,d){"startPosition"===d&&c.target instanceof a&&c._addPlugin(b)},b.step=function(){},b.change=function(a,b,c,d,e){return"startPosition"===c?1===e?b.props[c]:b.prev.props[c]:void 0}}(),this.createjs=this.createjs||{},function(){"use strict";function a(){throw"SpriteSheetUtils cannot be instantiated"}var b=createjs.createCanvas?createjs.createCanvas():document.createElement("canvas");b.getContext&&(a._workingCanvas=b,a._workingContext=b.getContext("2d"),b.width=b.height=1),a.extractFrame=function(b,c){isNaN(c)&&(c=b.getAnimation(c).frames[0]);var d=b.getFrame(c);if(!d)return null;var e=d.rect,f=a._workingCanvas;f.width=e.width,f.height=e.height,a._workingContext.drawImage(d.image,e.x,e.y,e.width,e.height,0,0,e.width,e.height);var g=document.createElement("img");return g.src=f.toDataURL("image/png"),g},a.addFlippedFrames=createjs.deprecate(null,"SpriteSheetUtils.addFlippedFrames"),a.mergeAlpha=createjs.deprecate(null,"SpriteSheetUtils.mergeAlpha"),a._flip=function(b,c,d,e){for(var f=b._images,g=a._workingCanvas,h=a._workingContext,i=f.length/c,j=0;i>j;j++){var k=f[j];k.__tmp=j,h.setTransform(1,0,0,1,0,0),h.clearRect(0,0,g.width+1,g.height+1),g.width=k.width,g.height=k.height,h.setTransform(d?-1:1,0,0,e?-1:1,d?k.width:0,e?k.height:0),h.drawImage(k,0,0);var l=document.createElement("img");l.src=g.toDataURL("image/png"),l.width=k.width||k.naturalWidth,l.height=k.height||k.naturalHeight,f.push(l)}var m=b._frames,n=m.length/c;for(j=0;n>j;j++){k=m[j];
var o=k.rect.clone();l=f[k.image.__tmp+i*c];var p={image:l,rect:o,regX:k.regX,regY:k.regY};d&&(o.x=(l.width||l.naturalWidth)-o.x-o.width,p.regX=o.width-k.regX),e&&(o.y=(l.height||l.naturalHeight)-o.y-o.height,p.regY=o.height-k.regY),m.push(p)}var q="_"+(d?"h":"")+(e?"v":""),r=b._animations,s=b._data,t=r.length/c;for(j=0;t>j;j++){var u=r[j];k=s[u];var v={name:u+q,speed:k.speed,next:k.next,frames:[]};k.next&&(v.next+=q),m=k.frames;for(var w=0,x=m.length;x>w;w++)v.frames.push(m[w]+n*c);s[v.name]=v,r.push(v.name)}},createjs.SpriteSheetUtils=a}(),this.createjs=this.createjs||{},function(){"use strict";function a(a){this.EventDispatcher_constructor(),this.maxWidth=2048,this.maxHeight=2048,this.spriteSheet=null,this.scale=1,this.padding=1,this.timeSlice=.3,this.progress=-1,this.framerate=a||0,this._frames=[],this._animations={},this._data=null,this._nextFrameIndex=0,this._index=0,this._timerID=null,this._scale=1}var b=createjs.extend(a,createjs.EventDispatcher);a.ERR_DIMENSIONS="frame dimensions exceed max spritesheet dimensions",a.ERR_RUNNING="a build is already running",b.addFrame=function(b,c,d,e,f){if(this._data)throw a.ERR_RUNNING;var g=c||b.bounds||b.nominalBounds;return!g&&b.getBounds&&(g=b.getBounds()),g?(d=d||1,this._frames.push({source:b,sourceRect:g,scale:d,funct:e,data:f,index:this._frames.length,height:g.height*d})-1):null},b.addAnimation=function(b,c,d,e){if(this._data)throw a.ERR_RUNNING;this._animations[b]={frames:c,next:d,speed:e}},b.addMovieClip=function(b,c,d,e,f,g){if(this._data)throw a.ERR_RUNNING;var h=b.frameBounds,i=c||b.bounds||b.nominalBounds;if(!i&&b.getBounds&&(i=b.getBounds()),i||h){var j,k,l=this._frames.length,m=b.timeline.duration;for(j=0;m>j;j++){var n=h&&h[j]?h[j]:i;this.addFrame(b,n,d,this._setupMovieClipFrame,{i:j,f:e,d:f})}var o=b.timeline._labels,p=[];for(var q in o)p.push({index:o[q],label:q});if(p.length)for(p.sort(function(a,b){return a.index-b.index}),j=0,k=p.length;k>j;j++){for(var r=p[j].label,s=l+p[j].index,t=l+(j==k-1?m:p[j+1].index),u=[],v=s;t>v;v++)u.push(v);(!g||(r=g(r,b,s,t)))&&this.addAnimation(r,u,!0)}}},b.build=function(){if(this._data)throw a.ERR_RUNNING;for(this._startBuild();this._drawNext(););return this._endBuild(),this.spriteSheet},b.buildAsync=function(b){if(this._data)throw a.ERR_RUNNING;this.timeSlice=b,this._startBuild();var c=this;this._timerID=setTimeout(function(){c._run()},50-50*Math.max(.01,Math.min(.99,this.timeSlice||.3)))},b.stopAsync=function(){clearTimeout(this._timerID),this._data=null},b.clone=function(){throw"SpriteSheetBuilder cannot be cloned."},b.toString=function(){return"[SpriteSheetBuilder]"},b._startBuild=function(){var b=this.padding||0;this.progress=0,this.spriteSheet=null,this._index=0,this._scale=this.scale;var c=[];this._data={images:[],frames:c,framerate:this.framerate,animations:this._animations};var d=this._frames.slice();if(d.sort(function(a,b){return a.height<=b.height?-1:1}),d[d.length-1].height+2*b>this.maxHeight)throw a.ERR_DIMENSIONS;for(var e=0,f=0,g=0;d.length;){var h=this._fillRow(d,e,g,c,b);if(h.w>f&&(f=h.w),e+=h.h,!h.h||!d.length){var i=createjs.createCanvas?createjs.createCanvas():document.createElement("canvas");i.width=this._getSize(f,this.maxWidth),i.height=this._getSize(e,this.maxHeight),this._data.images[g]=i,h.h||(f=e=0,g++)}}},b._setupMovieClipFrame=function(a,b){var c=a.actionsEnabled;a.actionsEnabled=!1,a.gotoAndStop(b.i),a.actionsEnabled=c,b.f&&b.f(a,b.d,b.i)},b._getSize=function(a,b){for(var c=4;Math.pow(2,++c)<a;);return Math.min(b,Math.pow(2,c))},b._fillRow=function(b,c,d,e,f){var g=this.maxWidth,h=this.maxHeight;c+=f;for(var i=h-c,j=f,k=0,l=b.length-1;l>=0;l--){var m=b[l],n=this._scale*m.scale,o=m.sourceRect,p=m.source,q=Math.floor(n*o.x-f),r=Math.floor(n*o.y-f),s=Math.ceil(n*o.height+2*f),t=Math.ceil(n*o.width+2*f);if(t>g)throw a.ERR_DIMENSIONS;s>i||j+t>g||(m.img=d,m.rect=new createjs.Rectangle(j,c,t,s),k=k||s,b.splice(l,1),e[m.index]=[j,c,t,s,d,Math.round(-q+n*p.regX-f),Math.round(-r+n*p.regY-f)],j+=t)}return{w:j,h:k}},b._endBuild=function(){this.spriteSheet=new createjs.SpriteSheet(this._data),this._data=null,this.progress=1,this.dispatchEvent("complete")},b._run=function(){for(var a=50*Math.max(.01,Math.min(.99,this.timeSlice||.3)),b=(new Date).getTime()+a,c=!1;b>(new Date).getTime();)if(!this._drawNext()){c=!0;break}if(c)this._endBuild();else{var d=this;this._timerID=setTimeout(function(){d._run()},50-a)}var e=this.progress=this._index/this._frames.length;if(this.hasEventListener("progress")){var f=new createjs.Event("progress");f.progress=e,this.dispatchEvent(f)}},b._drawNext=function(){var a=this._frames[this._index],b=a.scale*this._scale,c=a.rect,d=a.sourceRect,e=this._data.images[a.img],f=e.getContext("2d");return a.funct&&a.funct(a.source,a.data),f.save(),f.beginPath(),f.rect(c.x,c.y,c.width,c.height),f.clip(),f.translate(Math.ceil(c.x-d.x*b),Math.ceil(c.y-d.y*b)),f.scale(b,b),a.source.draw(f),f.restore(),++this._index<this._frames.length},createjs.SpriteSheetBuilder=createjs.promote(a,"EventDispatcher")}(),this.createjs=this.createjs||{},function(){"use strict";function a(a){this.DisplayObject_constructor(),"string"==typeof a&&(a=document.getElementById(a)),this.mouseEnabled=!1;var b=a.style;b.position="absolute",b.transformOrigin=b.WebkitTransformOrigin=b.msTransformOrigin=b.MozTransformOrigin=b.OTransformOrigin="0% 0%",this.htmlElement=a,this._oldProps=null,this._oldStage=null,this._drawAction=null}var b=createjs.extend(a,createjs.DisplayObject);b.isVisible=function(){return null!=this.htmlElement},b.draw=function(){return!0},b.cache=function(){},b.uncache=function(){},b.updateCache=function(){},b.hitTest=function(){},b.localToGlobal=function(){},b.globalToLocal=function(){},b.localToLocal=function(){},b.clone=function(){throw"DOMElement cannot be cloned."},b.toString=function(){return"[DOMElement (name="+this.name+")]"},b._tick=function(a){var b=this.stage;b&&b!==this._oldStage&&(this._drawAction&&b.off("drawend",this._drawAction),this._drawAction=b.on("drawend",this._handleDrawEnd,this),this._oldStage=b),this.DisplayObject__tick(a)},b._handleDrawEnd=function(){var a=this.htmlElement;if(a){var b=a.style,c=this.getConcatenatedDisplayProps(this._props),d=c.matrix,e=c.visible?"visible":"hidden";if(e!=b.visibility&&(b.visibility=e),c.visible){var f=this._oldProps,g=f&&f.matrix,h=1e4;if(!g||!g.equals(d)){var i="matrix("+(d.a*h|0)/h+","+(d.b*h|0)/h+","+(d.c*h|0)/h+","+(d.d*h|0)/h+","+(d.tx+.5|0);b.transform=b.WebkitTransform=b.OTransform=b.msTransform=i+","+(d.ty+.5|0)+")",b.MozTransform=i+"px,"+(d.ty+.5|0)+"px)",f||(f=this._oldProps=new createjs.DisplayProps(!0,null)),f.matrix.copy(d)}f.alpha!=c.alpha&&(b.opacity=""+(c.alpha*h|0)/h,f.alpha=c.alpha)}}},createjs.DOMElement=createjs.promote(a,"DisplayObject")}(),this.createjs=this.createjs||{},function(){"use strict";function a(){this.usesContext=!1,this._multiPass=null,this.VTX_SHADER_BODY=null,this.FRAG_SHADER_BODY=null}var b=a.prototype;b.getBounds=function(a){return a},b.shaderParamSetup=function(){},b.applyFilter=function(a,b,c,d,e,f,g,h){f=f||a,null==g&&(g=b),null==h&&(h=c);try{var i=a.getImageData(b,c,d,e)}catch(j){return!1}return this._applyFilter(i)?(f.putImageData(i,g,h),!0):!1},b.toString=function(){return"[Filter]"},b.clone=function(){return new a},b._applyFilter=function(){return!0},createjs.Filter=a}(),this.createjs=this.createjs||{},function(){"use strict";function a(){this.width=void 0,this.height=void 0,this.x=void 0,this.y=void 0,this.scale=1,this.offX=0,this.offY=0,this.cacheID=0,this._filterOffX=0,this._filterOffY=0,this._cacheDataURLID=0,this._cacheDataURL=null,this._drawWidth=0,this._drawHeight=0}var b=a.prototype;a.getFilterBounds=function(a,b){b||(b=new createjs.Rectangle);var c=a.filters,d=c&&c.length;if(0>=!!d)return b;for(var e=0;d>e;e++){var f=c[e];if(f&&f.getBounds){var g=f.getBounds();g&&(0==e?b.setValues(g.x,g.y,g.width,g.height):b.extend(g.x,g.y,g.width,g.height))}}return b},b.toString=function(){return"[BitmapCache]"},b.define=function(a,b,c,d,e,f,g){if(!a)throw"No symbol to cache";this._options=g,this.target=a,this.width=d>=1?d:1,this.height=e>=1?e:1,this.x=b||0,this.y=c||0,this.scale=f||1,this.update()},b.update=function(b){if(!this.target)throw"define() must be called before update()";var c=a.getFilterBounds(this.target),d=this.target.cacheCanvas;this._drawWidth=Math.ceil(this.width*this.scale)+c.width,this._drawHeight=Math.ceil(this.height*this.scale)+c.height,d&&this._drawWidth==d.width&&this._drawHeight==d.height||this._updateSurface(),this._filterOffX=c.x,this._filterOffY=c.y,this.offX=this.x*this.scale+this._filterOffX,this.offY=this.y*this.scale+this._filterOffY,this._drawToCache(b),this.cacheID=this.cacheID?this.cacheID+1:1},b.release=function(){if(this._webGLCache)this._webGLCache.isCacheControlled||(this.__lastRT&&(this.__lastRT=void 0),this.__rtA&&this._webGLCache._killTextureObject(this.__rtA),this.__rtB&&this._webGLCache._killTextureObject(this.__rtB),this.target&&this.target.cacheCanvas&&this._webGLCache._killTextureObject(this.target.cacheCanvas)),this._webGLCache=!1;else{var a=this.target.stage;a instanceof createjs.StageGL&&a.releaseTexture(this.target.cacheCanvas)}this.target=this.target.cacheCanvas=null,this.cacheID=this._cacheDataURLID=this._cacheDataURL=void 0,this.width=this.height=this.x=this.y=this.offX=this.offY=0,this.scale=1},b.getCacheDataURL=function(){var a=this.target&&this.target.cacheCanvas;return a?(this.cacheID!=this._cacheDataURLID&&(this._cacheDataURLID=this.cacheID,this._cacheDataURL=a.toDataURL?a.toDataURL():null),this._cacheDataURL):null},b.draw=function(a){return this.target?(a.drawImage(this.target.cacheCanvas,this.x+this._filterOffX/this.scale,this.y+this._filterOffY/this.scale,this._drawWidth/this.scale,this._drawHeight/this.scale),!0):!1},b._updateSurface=function(){if(!this._options||!this._options.useGL){var a=this.target.cacheCanvas;return a||(a=this.target.cacheCanvas=createjs.createCanvas?createjs.createCanvas():document.createElement("canvas")),a.width=this._drawWidth,void(a.height=this._drawHeight)}if(!this._webGLCache)if("stage"===this._options.useGL){if(!this.target.stage||!this.target.stage.isWebGL){var b="Cannot use 'stage' for cache because the object's parent stage is ";throw b+=this.target.stage?"non WebGL.":"not set, please addChild to the correct stage."}this.target.cacheCanvas=!0,this._webGLCache=this.target.stage}else if("new"===this._options.useGL)this.target.cacheCanvas=document.createElement("canvas"),this._webGLCache=new createjs.StageGL(this.target.cacheCanvas,{antialias:!0,transparent:!0,autoPurge:-1}),this._webGLCache.isCacheControlled=!0;else{if(!(this._options.useGL instanceof createjs.StageGL))throw"Invalid option provided to useGL, expected ['stage', 'new', StageGL, undefined], got "+this._options.useGL;this.target.cacheCanvas=!0,this._webGLCache=this._options.useGL,this._webGLCache.isCacheControlled=!0}var a=this.target.cacheCanvas,c=this._webGLCache;c.isCacheControlled&&(a.width=this._drawWidth,a.height=this._drawHeight,c.updateViewport(this._drawWidth,this._drawHeight)),this.target.filters?(c.getTargetRenderTexture(this.target,this._drawWidth,this._drawHeight),c.getTargetRenderTexture(this.target,this._drawWidth,this._drawHeight)):c.isCacheControlled||c.getTargetRenderTexture(this.target,this._drawWidth,this._drawHeight)},b._drawToCache=function(a){var b=this.target.cacheCanvas,c=this.target,d=this._webGLCache;if(d)d.cacheDraw(c,c.filters,this),b=this.target.cacheCanvas,b.width=this._drawWidth,b.height=this._drawHeight;else{var e=b.getContext("2d");a||e.clearRect(0,0,this._drawWidth+1,this._drawHeight+1),e.save(),e.globalCompositeOperation=a,e.setTransform(this.scale,0,0,this.scale,-this._filterOffX,-this._filterOffY),e.translate(-this.x,-this.y),c.draw(e,!0),e.restore(),c.filters&&c.filters.length&&this._applyFilters(e)}b._invalid=!0},b._applyFilters=function(a){var b,c=this.target.filters,d=this._drawWidth,e=this._drawHeight,f=0,g=c[f];do g.usesContext?(b&&(a.putImageData(b,0,0),b=null),g.applyFilter(a,0,0,d,e)):(b||(b=a.getImageData(0,0,d,e)),g._applyFilter(b)),g=null!==g._multiPass?g._multiPass:c[++f];while(g);b&&a.putImageData(b,0,0)},createjs.BitmapCache=a}(),this.createjs=this.createjs||{},function(){"use strict";function a(a,b,c){this.Filter_constructor(),this._blurX=a,this._blurXTable=[],this._lastBlurX=null,this._blurY=b,this._blurYTable=[],this._lastBlurY=null,this._quality,this._lastQuality=null,this.FRAG_SHADER_TEMPLATE="uniform float xWeight[{{blurX}}];uniform float yWeight[{{blurY}}];uniform vec2 textureOffset;void main(void) {vec4 color = vec4(0.0);float xAdj = ({{blurX}}.0-1.0)/2.0;float yAdj = ({{blurY}}.0-1.0)/2.0;vec2 sampleOffset;for(int i=0; i<{{blurX}}; i++) {for(int j=0; j<{{blurY}}; j++) {sampleOffset = vRenderCoord + (textureOffset * vec2(float(i)-xAdj, float(j)-yAdj));color += texture2D(uSampler, sampleOffset) * (xWeight[i] * yWeight[j]);}}gl_FragColor = color.rgba;}",(isNaN(c)||1>c)&&(c=1),this.setQuality(0|c)}var b=createjs.extend(a,createjs.Filter);b.getBlurX=function(){return this._blurX},b.getBlurY=function(){return this._blurY},b.setBlurX=function(a){(isNaN(a)||0>a)&&(a=0),this._blurX=a},b.setBlurY=function(a){(isNaN(a)||0>a)&&(a=0),this._blurY=a},b.getQuality=function(){return this._quality},b.setQuality=function(a){(isNaN(a)||0>a)&&(a=0),this._quality=0|a},b._getShader=function(){var a=this._lastBlurX!==this._blurX,b=this._lastBlurY!==this._blurY,c=this._lastQuality!==this._quality;return a||b||c?((a||c)&&(this._blurXTable=this._getTable(this._blurX*this._quality)),(b||c)&&(this._blurYTable=this._getTable(this._blurY*this._quality)),this._updateShader(),this._lastBlurX=this._blurX,this._lastBlurY=this._blurY,void(this._lastQuality=this._quality)):this._compiledShader},b._setShader=function(){this._compiledShader};try{Object.defineProperties(b,{blurX:{get:b.getBlurX,set:b.setBlurX},blurY:{get:b.getBlurY,set:b.setBlurY},quality:{get:b.getQuality,set:b.setQuality},_builtShader:{get:b._getShader,set:b._setShader}})}catch(c){console.log(c)}b._getTable=function(a){var b=4.2;if(1>=a)return[1];var c=[],d=Math.ceil(2*a);d+=d%2?0:1;for(var e=d/2|0,f=-e;e>=f;f++){var g=f/e*b;c.push(1/Math.sqrt(2*Math.PI)*Math.pow(Math.E,-(Math.pow(g,2)/4)))}var h=c.reduce(function(a,b){return a+b});return c.map(function(a){return a/h})},b._updateShader=function(){if(void 0!==this._blurX&&void 0!==this._blurY){var a=this.FRAG_SHADER_TEMPLATE;a=a.replace(/\{\{blurX\}\}/g,this._blurXTable.length.toFixed(0)),a=a.replace(/\{\{blurY\}\}/g,this._blurYTable.length.toFixed(0)),this.FRAG_SHADER_BODY=a}},b.shaderParamSetup=function(a,b,c){a.uniform1fv(a.getUniformLocation(c,"xWeight"),this._blurXTable),a.uniform1fv(a.getUniformLocation(c,"yWeight"),this._blurYTable),a.uniform2f(a.getUniformLocation(c,"textureOffset"),2/(b._viewportWidth*this._quality),2/(b._viewportHeight*this._quality))},a.MUL_TABLE=[1,171,205,293,57,373,79,137,241,27,391,357,41,19,283,265,497,469,443,421,25,191,365,349,335,161,155,149,9,278,269,261,505,245,475,231,449,437,213,415,405,395,193,377,369,361,353,345,169,331,325,319,313,307,301,37,145,285,281,69,271,267,263,259,509,501,493,243,479,118,465,459,113,446,55,435,429,423,209,413,51,403,199,393,97,3,379,375,371,367,363,359,355,351,347,43,85,337,333,165,327,323,5,317,157,311,77,305,303,75,297,294,73,289,287,71,141,279,277,275,68,135,67,133,33,262,260,129,511,507,503,499,495,491,61,121,481,477,237,235,467,232,115,457,227,451,7,445,221,439,218,433,215,427,425,211,419,417,207,411,409,203,202,401,399,396,197,49,389,387,385,383,95,189,47,187,93,185,23,183,91,181,45,179,89,177,11,175,87,173,345,343,341,339,337,21,167,83,331,329,327,163,81,323,321,319,159,79,315,313,39,155,309,307,153,305,303,151,75,299,149,37,295,147,73,291,145,289,287,143,285,71,141,281,35,279,139,69,275,137,273,17,271,135,269,267,133,265,33,263,131,261,130,259,129,257,1],a.SHG_TABLE=[0,9,10,11,9,12,10,11,12,9,13,13,10,9,13,13,14,14,14,14,10,13,14,14,14,13,13,13,9,14,14,14,15,14,15,14,15,15,14,15,15,15,14,15,15,15,15,15,14,15,15,15,15,15,15,12,14,15,15,13,15,15,15,15,16,16,16,15,16,14,16,16,14,16,13,16,16,16,15,16,13,16,15,16,14,9,16,16,16,16,16,16,16,16,16,13,14,16,16,15,16,16,10,16,15,16,14,16,16,14,16,16,14,16,16,14,15,16,16,16,14,15,14,15,13,16,16,15,17,17,17,17,17,17,14,15,17,17,16,16,17,16,15,17,16,17,11,17,16,17,16,17,16,17,17,16,17,17,16,17,17,16,16,17,17,17,16,14,17,17,17,17,15,16,14,16,15,16,13,16,15,16,14,16,15,16,12,16,15,16,17,17,17,17,17,13,16,15,17,17,17,16,15,17,17,17,16,15,17,17,14,16,17,17,16,17,17,16,15,17,16,14,17,16,15,17,16,17,17,16,17,15,16,17,14,17,16,15,17,16,17,13,17,16,17,17,16,17,14,17,16,17,16,17,16,17,9],b.getBounds=function(a){var b=0|this.blurX,c=0|this.blurY;if(0>=b&&0>=c)return a;var d=Math.pow(this.quality,.2);return(a||new createjs.Rectangle).pad(c*d+1,b*d+1,c*d+1,b*d+1)},b.clone=function(){return new a(this.blurX,this.blurY,this.quality)},b.toString=function(){return"[BlurFilter]"},b._applyFilter=function(b){var c=this._blurX>>1;if(isNaN(c)||0>c)return!1;var d=this._blurY>>1;if(isNaN(d)||0>d)return!1;if(0==c&&0==d)return!1;var e=this.quality;(isNaN(e)||1>e)&&(e=1),e|=0,e>3&&(e=3),1>e&&(e=1);var f=b.data,g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=c+c+1|0,w=d+d+1|0,x=0|b.width,y=0|b.height,z=x-1|0,A=y-1|0,B=c+1|0,C=d+1|0,D={r:0,b:0,g:0,a:0},E=D;for(i=1;v>i;i++)E=E.n={r:0,b:0,g:0,a:0};E.n=D;var F={r:0,b:0,g:0,a:0},G=F;for(i=1;w>i;i++)G=G.n={r:0,b:0,g:0,a:0};G.n=F;for(var H=null,I=0|a.MUL_TABLE[c],J=0|a.SHG_TABLE[c],K=0|a.MUL_TABLE[d],L=0|a.SHG_TABLE[d];e-->0;){m=l=0;var M=I,N=J;for(h=y;--h>-1;){for(n=B*(r=f[0|l]),o=B*(s=f[l+1|0]),p=B*(t=f[l+2|0]),q=B*(u=f[l+3|0]),E=D,i=B;--i>-1;)E.r=r,E.g=s,E.b=t,E.a=u,E=E.n;for(i=1;B>i;i++)j=l+((i>z?z:i)<<2)|0,n+=E.r=f[j],o+=E.g=f[j+1],p+=E.b=f[j+2],q+=E.a=f[j+3],E=E.n;for(H=D,g=0;x>g;g++)f[l++]=n*M>>>N,f[l++]=o*M>>>N,f[l++]=p*M>>>N,f[l++]=q*M>>>N,j=m+((j=g+c+1)<z?j:z)<<2,n-=H.r-(H.r=f[j]),o-=H.g-(H.g=f[j+1]),p-=H.b-(H.b=f[j+2]),q-=H.a-(H.a=f[j+3]),H=H.n;m+=x}for(M=K,N=L,g=0;x>g;g++){for(l=g<<2|0,n=C*(r=f[l])|0,o=C*(s=f[l+1|0])|0,p=C*(t=f[l+2|0])|0,q=C*(u=f[l+3|0])|0,G=F,i=0;C>i;i++)G.r=r,G.g=s,G.b=t,G.a=u,G=G.n;for(k=x,i=1;d>=i;i++)l=k+g<<2,n+=G.r=f[l],o+=G.g=f[l+1],p+=G.b=f[l+2],q+=G.a=f[l+3],G=G.n,A>i&&(k+=x);if(l=g,H=F,e>0)for(h=0;y>h;h++)j=l<<2,f[j+3]=u=q*M>>>N,u>0?(f[j]=n*M>>>N,f[j+1]=o*M>>>N,f[j+2]=p*M>>>N):f[j]=f[j+1]=f[j+2]=0,j=g+((j=h+C)<A?j:A)*x<<2,n-=H.r-(H.r=f[j]),o-=H.g-(H.g=f[j+1]),p-=H.b-(H.b=f[j+2]),q-=H.a-(H.a=f[j+3]),H=H.n,l+=x;else for(h=0;y>h;h++)j=l<<2,f[j+3]=u=q*M>>>N,u>0?(u=255/u,f[j]=(n*M>>>N)*u,f[j+1]=(o*M>>>N)*u,f[j+2]=(p*M>>>N)*u):f[j]=f[j+1]=f[j+2]=0,j=g+((j=h+C)<A?j:A)*x<<2,n-=H.r-(H.r=f[j]),o-=H.g-(H.g=f[j+1]),p-=H.b-(H.b=f[j+2]),q-=H.a-(H.a=f[j+3]),H=H.n,l+=x}}return!0},createjs.BlurFilter=createjs.promote(a,"Filter")}(),this.createjs=this.createjs||{},function(){"use strict";function a(a){this.Filter_constructor(),this.alphaMap=a,this._alphaMap=null,this._mapData=null,this._mapTexture=null,this.FRAG_SHADER_BODY="uniform sampler2D uAlphaSampler;void main(void) {vec4 color = texture2D(uSampler, vRenderCoord);vec4 alphaMap = texture2D(uAlphaSampler, vTextureCoord);gl_FragColor = vec4(color.rgb, color.a * (alphaMap.r * ceil(alphaMap.a)));}"}var b=createjs.extend(a,createjs.Filter);b.shaderParamSetup=function(a,b,c){this._mapTexture||(this._mapTexture=a.createTexture()),a.activeTexture(a.TEXTURE1),a.bindTexture(a.TEXTURE_2D,this._mapTexture),b.setTextureParams(a),a.texImage2D(a.TEXTURE_2D,0,a.RGBA,a.RGBA,a.UNSIGNED_BYTE,this.alphaMap),a.uniform1i(a.getUniformLocation(c,"uAlphaSampler"),1)},b.clone=function(){var b=new a(this.alphaMap);return b._alphaMap=this._alphaMap,b._mapData=this._mapData,b},b.toString=function(){return"[AlphaMapFilter]"},b._applyFilter=function(a){if(!this.alphaMap)return!0;if(!this._prepAlphaMap())return!1;for(var b=a.data,c=this._mapData,d=0,e=b.length;e>d;d+=4)b[d+3]=c[d]||0;return!0},b._prepAlphaMap=function(){if(!this.alphaMap)return!1;if(this.alphaMap==this._alphaMap&&this._mapData)return!0;this._mapData=null;var a,b=this._alphaMap=this.alphaMap,c=b;b instanceof HTMLCanvasElement?a=c.getContext("2d"):(c=createjs.createCanvas?createjs.createCanvas():document.createElement("canvas"),c.width=b.width,c.height=b.height,a=c.getContext("2d"),a.drawImage(b,0,0));try{var d=a.getImageData(0,0,b.width,b.height)}catch(e){return!1}return this._mapData=d.data,!0},createjs.AlphaMapFilter=createjs.promote(a,"Filter")}(),this.createjs=this.createjs||{},function(){"use strict";function a(a){this.Filter_constructor(),this.mask=a,this.usesContext=!0,this.FRAG_SHADER_BODY="uniform sampler2D uAlphaSampler;void main(void) {vec4 color = texture2D(uSampler, vRenderCoord);vec4 alphaMap = texture2D(uAlphaSampler, vTextureCoord);gl_FragColor = vec4(color.rgb, color.a * alphaMap.a);}"}var b=createjs.extend(a,createjs.Filter);b.shaderParamSetup=function(a,b,c){this._mapTexture||(this._mapTexture=a.createTexture()),a.activeTexture(a.TEXTURE1),a.bindTexture(a.TEXTURE_2D,this._mapTexture),b.setTextureParams(a),a.texImage2D(a.TEXTURE_2D,0,a.RGBA,a.RGBA,a.UNSIGNED_BYTE,this.mask),a.uniform1i(a.getUniformLocation(c,"uAlphaSampler"),1)},b.applyFilter=function(a,b,c,d,e,f,g,h){return this.mask?(f=f||a,null==g&&(g=b),null==h&&(h=c),f.save(),a!=f?!1:(f.globalCompositeOperation="destination-in",f.drawImage(this.mask,g,h),f.restore(),!0)):!0},b.clone=function(){return new a(this.mask)},b.toString=function(){return"[AlphaMaskFilter]"},createjs.AlphaMaskFilter=createjs.promote(a,"Filter")}(),this.createjs=this.createjs||{},function(){"use strict";function a(a,b,c,d,e,f,g,h){this.Filter_constructor(),this.redMultiplier=null!=a?a:1,this.greenMultiplier=null!=b?b:1,this.blueMultiplier=null!=c?c:1,this.alphaMultiplier=null!=d?d:1,this.redOffset=e||0,this.greenOffset=f||0,this.blueOffset=g||0,this.alphaOffset=h||0,this.FRAG_SHADER_BODY="uniform vec4 uColorMultiplier;uniform vec4 uColorOffset;void main(void) {vec4 color = texture2D(uSampler, vRenderCoord);gl_FragColor = (color * uColorMultiplier) + uColorOffset;}"}var b=createjs.extend(a,createjs.Filter);b.shaderParamSetup=function(a,b,c){a.uniform4f(a.getUniformLocation(c,"uColorMultiplier"),this.redMultiplier,this.greenMultiplier,this.blueMultiplier,this.alphaMultiplier),a.uniform4f(a.getUniformLocation(c,"uColorOffset"),this.redOffset/255,this.greenOffset/255,this.blueOffset/255,this.alphaOffset/255)},b.toString=function(){return"[ColorFilter]"},b.clone=function(){return new a(this.redMultiplier,this.greenMultiplier,this.blueMultiplier,this.alphaMultiplier,this.redOffset,this.greenOffset,this.blueOffset,this.alphaOffset)},b._applyFilter=function(a){for(var b=a.data,c=b.length,d=0;c>d;d+=4)b[d]=b[d]*this.redMultiplier+this.redOffset,b[d+1]=b[d+1]*this.greenMultiplier+this.greenOffset,b[d+2]=b[d+2]*this.blueMultiplier+this.blueOffset,b[d+3]=b[d+3]*this.alphaMultiplier+this.alphaOffset;return!0},createjs.ColorFilter=createjs.promote(a,"Filter")}(),this.createjs=this.createjs||{},function(){"use strict";function a(a,b,c,d){this.setColor(a,b,c,d)}var b=a.prototype;a.DELTA_INDEX=[0,.01,.02,.04,.05,.06,.07,.08,.1,.11,.12,.14,.15,.16,.17,.18,.2,.21,.22,.24,.25,.27,.28,.3,.32,.34,.36,.38,.4,.42,.44,.46,.48,.5,.53,.56,.59,.62,.65,.68,.71,.74,.77,.8,.83,.86,.89,.92,.95,.98,1,1.06,1.12,1.18,1.24,1.3,1.36,1.42,1.48,1.54,1.6,1.66,1.72,1.78,1.84,1.9,1.96,2,2.12,2.25,2.37,2.5,2.62,2.75,2.87,3,3.2,3.4,3.6,3.8,4,4.3,4.7,4.9,5,5.5,6,6.5,6.8,7,7.3,7.5,7.8,8,8.4,8.7,9,9.4,9.6,9.8,10],a.IDENTITY_MATRIX=[1,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,0,0,1],a.LENGTH=a.IDENTITY_MATRIX.length,b.setColor=function(a,b,c,d){return this.reset().adjustColor(a,b,c,d)},b.reset=function(){return this.copy(a.IDENTITY_MATRIX)},b.adjustColor=function(a,b,c,d){return this.adjustHue(d),this.adjustContrast(b),this.adjustBrightness(a),this.adjustSaturation(c)},b.adjustBrightness=function(a){return 0==a||isNaN(a)?this:(a=this._cleanValue(a,255),this._multiplyMatrix([1,0,0,0,a,0,1,0,0,a,0,0,1,0,a,0,0,0,1,0,0,0,0,0,1]),this)},b.adjustContrast=function(b){if(0==b||isNaN(b))return this;b=this._cleanValue(b,100);var c;return 0>b?c=127+b/100*127:(c=b%1,c=0==c?a.DELTA_INDEX[b]:a.DELTA_INDEX[b<<0]*(1-c)+a.DELTA_INDEX[(b<<0)+1]*c,c=127*c+127),this._multiplyMatrix([c/127,0,0,0,.5*(127-c),0,c/127,0,0,.5*(127-c),0,0,c/127,0,.5*(127-c),0,0,0,1,0,0,0,0,0,1]),this},b.adjustSaturation=function(a){if(0==a||isNaN(a))return this;a=this._cleanValue(a,100);var b=1+(a>0?3*a/100:a/100),c=.3086,d=.6094,e=.082;return this._multiplyMatrix([c*(1-b)+b,d*(1-b),e*(1-b),0,0,c*(1-b),d*(1-b)+b,e*(1-b),0,0,c*(1-b),d*(1-b),e*(1-b)+b,0,0,0,0,0,1,0,0,0,0,0,1]),this},b.adjustHue=function(a){if(0==a||isNaN(a))return this;a=this._cleanValue(a,180)/180*Math.PI;var b=Math.cos(a),c=Math.sin(a),d=.213,e=.715,f=.072;return this._multiplyMatrix([d+b*(1-d)+c*-d,e+b*-e+c*-e,f+b*-f+c*(1-f),0,0,d+b*-d+.143*c,e+b*(1-e)+.14*c,f+b*-f+c*-.283,0,0,d+b*-d+c*-(1-d),e+b*-e+c*e,f+b*(1-f)+c*f,0,0,0,0,0,1,0,0,0,0,0,1]),this},b.concat=function(b){return b=this._fixMatrix(b),b.length!=a.LENGTH?this:(this._multiplyMatrix(b),this)},b.clone=function(){return(new a).copy(this)},b.toArray=function(){for(var b=[],c=0,d=a.LENGTH;d>c;c++)b[c]=this[c];return b},b.copy=function(b){for(var c=a.LENGTH,d=0;c>d;d++)this[d]=b[d];return this},b.toString=function(){return"[ColorMatrix]"},b._multiplyMatrix=function(a){var b,c,d,e=[];for(b=0;5>b;b++){for(c=0;5>c;c++)e[c]=this[c+5*b];for(c=0;5>c;c++){var f=0;for(d=0;5>d;d++)f+=a[c+5*d]*e[d];this[c+5*b]=f}}},b._cleanValue=function(a,b){return Math.min(b,Math.max(-b,a))},b._fixMatrix=function(b){return b instanceof a&&(b=b.toArray()),b.length<a.LENGTH?b=b.slice(0,b.length).concat(a.IDENTITY_MATRIX.slice(b.length,a.LENGTH)):b.length>a.LENGTH&&(b=b.slice(0,a.LENGTH)),b},createjs.ColorMatrix=a}(),this.createjs=this.createjs||{},function(){"use strict";function a(a){this.Filter_constructor(),this.matrix=a,this.FRAG_SHADER_BODY="uniform mat4 uColorMatrix;uniform vec4 uColorMatrixOffset;void main(void) {vec4 color = texture2D(uSampler, vRenderCoord);mat4 m = uColorMatrix;vec4 newColor = vec4(0,0,0,0);newColor.r = color.r*m[0][0] + color.g*m[0][1] + color.b*m[0][2] + color.a*m[0][3];newColor.g = color.r*m[1][0] + color.g*m[1][1] + color.b*m[1][2] + color.a*m[1][3];newColor.b = color.r*m[2][0] + color.g*m[2][1] + color.b*m[2][2] + color.a*m[2][3];newColor.a = color.r*m[3][0] + color.g*m[3][1] + color.b*m[3][2] + color.a*m[3][3];gl_FragColor = newColor + uColorMatrixOffset;}"}var b=createjs.extend(a,createjs.Filter);b.shaderParamSetup=function(a,b,c){var d=this.matrix,e=new Float32Array([d[0],d[1],d[2],d[3],d[5],d[6],d[7],d[8],d[10],d[11],d[12],d[13],d[15],d[16],d[17],d[18]]);a.uniformMatrix4fv(a.getUniformLocation(c,"uColorMatrix"),!1,e),a.uniform4f(a.getUniformLocation(c,"uColorMatrixOffset"),d[4]/255,d[9]/255,d[14]/255,d[19]/255)},b.toString=function(){return"[ColorMatrixFilter]"},b.clone=function(){return new a(this.matrix)},b._applyFilter=function(a){for(var b,c,d,e,f=a.data,g=f.length,h=this.matrix,i=h[0],j=h[1],k=h[2],l=h[3],m=h[4],n=h[5],o=h[6],p=h[7],q=h[8],r=h[9],s=h[10],t=h[11],u=h[12],v=h[13],w=h[14],x=h[15],y=h[16],z=h[17],A=h[18],B=h[19],C=0;g>C;C+=4)b=f[C],c=f[C+1],d=f[C+2],e=f[C+3],f[C]=b*i+c*j+d*k+e*l+m,f[C+1]=b*n+c*o+d*p+e*q+r,f[C+2]=b*s+c*t+d*u+e*v+w,f[C+3]=b*x+c*y+d*z+e*A+B;return!0},createjs.ColorMatrixFilter=createjs.promote(a,"Filter")}(),this.createjs=this.createjs||{},function(){"use strict";function a(){throw"Touch cannot be instantiated"}a.isSupported=function(){return!!("ontouchstart"in window||window.navigator.msPointerEnabled&&window.navigator.msMaxTouchPoints>0||window.navigator.pointerEnabled&&window.navigator.maxTouchPoints>0)},a.enable=function(b,c,d){return b&&b.canvas&&a.isSupported()?b.__touch?!0:(b.__touch={pointers:{},multitouch:!c,preventDefault:!d,count:0},"ontouchstart"in window?a._IOS_enable(b):(window.navigator.msPointerEnabled||window.navigator.pointerEnabled)&&a._IE_enable(b),!0):!1},a.disable=function(b){b&&("ontouchstart"in window?a._IOS_disable(b):(window.navigator.msPointerEnabled||window.navigator.pointerEnabled)&&a._IE_disable(b),delete b.__touch)},a._IOS_enable=function(b){var c=b.canvas,d=b.__touch.f=function(c){a._IOS_handleEvent(b,c)};c.addEventListener("touchstart",d,!1),c.addEventListener("touchmove",d,!1),c.addEventListener("touchend",d,!1),c.addEventListener("touchcancel",d,!1)},a._IOS_disable=function(a){var b=a.canvas;if(b){var c=a.__touch.f;b.removeEventListener("touchstart",c,!1),b.removeEventListener("touchmove",c,!1),b.removeEventListener("touchend",c,!1),b.removeEventListener("touchcancel",c,!1)}},a._IOS_handleEvent=function(a,b){if(a){a.__touch.preventDefault&&b.preventDefault&&b.preventDefault();for(var c=b.changedTouches,d=b.type,e=0,f=c.length;f>e;e++){var g=c[e],h=g.identifier;g.target==a.canvas&&("touchstart"==d?this._handleStart(a,h,b,g.pageX,g.pageY):"touchmove"==d?this._handleMove(a,h,b,g.pageX,g.pageY):("touchend"==d||"touchcancel"==d)&&this._handleEnd(a,h,b))}}},a._IE_enable=function(b){var c=b.canvas,d=b.__touch.f=function(c){a._IE_handleEvent(b,c)};void 0===window.navigator.pointerEnabled?(c.addEventListener("MSPointerDown",d,!1),window.addEventListener("MSPointerMove",d,!1),window.addEventListener("MSPointerUp",d,!1),window.addEventListener("MSPointerCancel",d,!1),b.__touch.preventDefault&&(c.style.msTouchAction="none")):(c.addEventListener("pointerdown",d,!1),window.addEventListener("pointermove",d,!1),window.addEventListener("pointerup",d,!1),window.addEventListener("pointercancel",d,!1),b.__touch.preventDefault&&(c.style.touchAction="none")),b.__touch.activeIDs={}},a._IE_disable=function(a){var b=a.__touch.f;void 0===window.navigator.pointerEnabled?(window.removeEventListener("MSPointerMove",b,!1),window.removeEventListener("MSPointerUp",b,!1),window.removeEventListener("MSPointerCancel",b,!1),a.canvas&&a.canvas.removeEventListener("MSPointerDown",b,!1)):(window.removeEventListener("pointermove",b,!1),window.removeEventListener("pointerup",b,!1),window.removeEventListener("pointercancel",b,!1),a.canvas&&a.canvas.removeEventListener("pointerdown",b,!1))},a._IE_handleEvent=function(a,b){if(a){a.__touch.preventDefault&&b.preventDefault&&b.preventDefault();var c=b.type,d=b.pointerId,e=a.__touch.activeIDs;if("MSPointerDown"==c||"pointerdown"==c){if(b.srcElement!=a.canvas)return;e[d]=!0,this._handleStart(a,d,b,b.pageX,b.pageY)}else e[d]&&("MSPointerMove"==c||"pointermove"==c?this._handleMove(a,d,b,b.pageX,b.pageY):("MSPointerUp"==c||"MSPointerCancel"==c||"pointerup"==c||"pointercancel"==c)&&(delete e[d],this._handleEnd(a,d,b)))}},a._handleStart=function(a,b,c,d,e){var f=a.__touch;if(f.multitouch||!f.count){var g=f.pointers;g[b]||(g[b]=!0,f.count++,a._handlePointerDown(b,c,d,e))}},a._handleMove=function(a,b,c,d,e){a.__touch.pointers[b]&&a._handlePointerMove(b,c,d,e)},a._handleEnd=function(a,b,c){var d=a.__touch,e=d.pointers;e[b]&&(d.count--,a._handlePointerUp(b,c,!0),delete e[b])},createjs.Touch=a}(),this.createjs=this.createjs||{},function(){"use strict";var a=createjs.EaselJS=createjs.EaselJS||{};a.version="1.0.0",a.buildDate="Thu, 14 Sep 2017 19:47:53 GMT"}();
/* interact.js v1.2.9 | https://raw.github.com/taye/interact.js/master/LICENSE */var $jscomp=$jscomp||{};$jscomp.scope={};$jscomp.ASSUME_ES5=!1;$jscomp.ASSUME_NO_NATIVE_MAP=!1;$jscomp.ASSUME_NO_NATIVE_SET=!1;$jscomp.defineProperty=$jscomp.ASSUME_ES5||"function"==typeof Object.defineProperties?Object.defineProperty:function(m,J,r){m!=Array.prototype&&m!=Object.prototype&&(m[J]=r.value)};$jscomp.getGlobal=function(m){return"undefined"!=typeof window&&window===m?m:"undefined"!=typeof global&&null!=global?global:m};$jscomp.global=$jscomp.getGlobal(this);
$jscomp.polyfill=function(m,J,r,M){if(J){r=$jscomp.global;m=m.split(".");for(M=0;M<m.length-1;M++){var B=m[M];B in r||(r[B]={});r=r[B]}m=m[m.length-1];M=r[m];J=J(M);J!=M&&null!=J&&$jscomp.defineProperty(r,m,{configurable:!0,writable:!0,value:J})}};
$jscomp.polyfill("Math.hypot",function(m){return m?m:function(m,r,M){m=Number(m);r=Number(r);var B,u=Math.max(Math.abs(m),Math.abs(r));for(B=2;B<arguments.length;B++)u=Math.max(u,Math.abs(arguments[B]));if(1E100<u||1E-100>u){m/=u;r/=u;var x=m*m+r*r;for(B=2;B<arguments.length;B++){var F=Number(arguments[B])/u;x+=F*F}return Math.sqrt(x)*u}x=m*m+r*r;for(B=2;B<arguments.length;B++)F=Number(arguments[B]),x+=F*F;return Math.sqrt(x)}},"es6-impl","es3");
(function(m){function J(){}function r(a){if(!a||"object"!==typeof a)return!1;var b=Y(a)||v;return/object|function/.test(typeof b.Element)?a instanceof b.Element:1===a.nodeType&&"string"===typeof a.nodeName}function M(a){return a===v||!(!a||!a.Window)&&a instanceof a.Window}function B(a){return u(a)&&!0&&x(a.splice)}function u(a){return!!a&&"object"===typeof a}function x(a){return"function"===typeof a}function F(a){return"number"===typeof a}function K(a){return"boolean"===typeof a}function P(a){return"string"===
typeof a}function fa(a){if(!P(a))return!1;S.querySelector(a);return!0}function C(a,b){for(var c in b)a[c]=b[c];return a}function qa(a,b){for(var c in b){var d=!1,e;for(e in za)if(0===c.indexOf(e)&&za[e].test(c)){d=!0;break}d||(a[c]=b[c])}return a}function ra(a,b){a.page=a.page||{};a.page.x=b.page.x;a.page.y=b.page.y;a.client=a.client||{};a.client.x=b.client.x;a.client.y=b.client.y;a.timeStamp=b.timeStamp}function Qa(a,b,c){a.page.x=c.page.x-b.page.x;a.page.y=c.page.y-b.page.y;a.client.x=c.client.x-
b.client.x;a.client.y=c.client.y-b.client.y;a.timeStamp=(new Date).getTime()-b.timeStamp;b=Math.max(a.timeStamp/1E3,.001);a.page.speed=ga(a.page.x,a.page.y)/b;a.page.vx=a.page.x/b;a.page.vy=a.page.y/b;a.client.speed=ga(a.client.x,a.page.y)/b;a.client.vx=a.client.x/b;a.client.vy=a.client.y/b}function Ra(a){return a instanceof v.Event||ha&&v.Touch&&a instanceof v.Touch}function sa(a,b,c){c=c||{};a=a||"page";c.x=b[a+"X"];c.y=b[a+"Y"];return c}function Aa(a,b){b=b||{};Sa&&Ra(a)?(sa("screen",a,b),b.x+=
v.scrollX,b.y+=v.scrollY):sa("page",a,b);return b}function Ta(a,b){b=b||{};Sa&&Ra(a)?sa("screen",a,b):sa("client",a,b);return b}function Q(a){return F(a.pointerId)?a.pointerId:a.identifier}function Ba(a){return a instanceof kb?a.correspondingUseElement:a}function Y(a){if(M(a))return a;a=a.ownerDocument||a;return a.defaultView||a.parentWindow||v}function Ca(a){return(a=a instanceof Ua?a.getBoundingClientRect():a.getClientRects()[0])&&{left:a.left,right:a.right,top:a.top,bottom:a.bottom,width:a.width||
a.right-a.left,height:a.height||a.bottom-a.top}}function ta(a){var b=Ca(a);if(!lb&&b){var c=(c=Y(a))||v;a=c.scrollX||c.document.documentElement.scrollLeft;c=c.scrollY||c.document.documentElement.scrollTop;b.left+=a;b.right+=a;b.top+=c;b.bottom+=c}return b}function Da(a){var b=[];B(a)?(b[0]=a[0],b[1]=a[1]):"touchend"===a.type?1===a.touches.length?(b[0]=a.touches[0],b[1]=a.changedTouches[0]):0===a.touches.length&&(b[0]=a.changedTouches[0],b[1]=a.changedTouches[1]):(b[0]=a.touches[0],b[1]=a.touches[1]);
return b}function Va(a){for(var b={pageX:0,pageY:0,clientX:0,clientY:0,screenX:0,screenY:0},c,d=0;d<a.length;d++)for(c in b)b[c]+=a[d][c];for(c in b)b[c]/=a.length;return b}function Ea(a){if(a.length||a.touches&&1<a.touches.length){a=Da(a);var b=Math.min(a[0].pageX,a[1].pageX),c=Math.min(a[0].pageY,a[1].pageY);return{x:b,y:c,left:b,top:c,width:Math.max(a[0].pageX,a[1].pageX)-b,height:Math.max(a[0].pageY,a[1].pageY)-c}}}function Fa(a,b){b=b||H.deltaSource;var c=b+"X";b+="Y";a=Da(a);return ga(a[0][c]-
a[1][c],a[0][b]-a[1][b])}function Ga(a,b,c){c=c||H.deltaSource;var d=c+"X";c+="Y";a=Da(a);d=180*Math.atan((a[0][c]-a[1][c])/(a[0][d]-a[1][d]))/Math.PI;F(b)&&(b=(d-b)%360,315<b?d-=360+d/360|0:135<b?d-=180+d/360|0:-315>b?d+=360+d/360|0:-135>b&&(d+=180+d/360|0));return d}function na(a,b){var c=a?a.options.origin:H.origin;"parent"===c?c=N(b):"self"===c?c=a.getRect(b):fa(c)&&(c=Ha(b,c)||{x:0,y:0});x(c)&&(c=c(a&&b));r(c)&&(c=ta(c));c.x="x"in c?c.x:c.left;c.y="y"in c?c.y:c.top;return c}function Wa(a,b,c,
d){var e=1-a;return e*e*b+2*e*a*c+a*a*d}function ba(a,b){for(;b;){if(b===a)return!0;b=b.parentNode}return!1}function Ha(a,b){for(a=N(a);r(a);){if(T(a,b))return a;a=N(a)}return null}function N(a){if((a=a.parentNode)&&a instanceof Xa)for(;(a=a.host)&&a&&a instanceof Xa;);return a}function ua(a,b){return a._context===b.ownerDocument||ba(a._context,b)}function ca(a,b,c){return(a=a.options.ignoreFrom)&&r(c)?P(a)?Ia(c,a,b):r(a)?ba(a,c):!1:!1}function da(a,b,c){return(a=a.options.allowFrom)?r(c)?P(a)?Ia(c,
a,b):r(a)?ba(a,c):!1:!1:!0}function Ya(a,b){if(!b)return!1;b=b.options.drag.axis;return"xy"===a||"xy"===b||b===a}function Ja(a,b){a=a.options;/^resize/.test(b)&&(b="resize");return a[b].snap&&a[b].snap.enabled}function Ka(a,b){a=a.options;/^resize/.test(b)&&(b="resize");return a[b].restrict&&a[b].restrict.enabled}function ia(a,b,c){for(var d=a.options,e=d[c.name].max,d=d[c.name].maxPerElement,k=0,h=0,f=0,q=0,G=w.length;q<G;q++){var n=w[q],t=n.prepared.name;if(n.interacting()&&(k++,k>=va||n.target===
a&&(h+=t===c.name|0,h>=e||n.element===b&&(f++,t!==c.name||f>=d))))return!1}return 0<va}function wa(){this.prevDropElement=this.prevDropTarget=this.dropElement=this.dropTarget=this.element=this.target=null;this.prepared={name:null,axis:null,edges:null};this.matches=[];this.matchElements=[];this.inertiaStatus={active:!1,smoothEnd:!1,ending:!1,startEvent:null,upCoords:{},xe:0,ye:0,sx:0,sy:0,t0:0,vx0:0,vys:0,duration:0,resumeDx:0,resumeDy:0,lambda_v0:0,one_ve_v0:0,i:null};if(x(Function.prototype.bind))this.boundInertiaFrame=
this.inertiaFrame.bind(this),this.boundSmoothEndFrame=this.smoothEndFrame.bind(this);else{var a=this;this.boundInertiaFrame=function(){return a.inertiaFrame()};this.boundSmoothEndFrame=function(){return a.smoothEndFrame()}}this.activeDrops={dropzones:[],elements:[],rects:[]};this.pointers=[];this.pointerIds=[];this.downTargets=[];this.downTimes=[];this.holdTimers=[];this.prevCoords={page:{x:0,y:0},client:{x:0,y:0},timeStamp:0};this.curCoords={page:{x:0,y:0},client:{x:0,y:0},timeStamp:0};this.startCoords=
{page:{x:0,y:0},client:{x:0,y:0},timeStamp:0};this.pointerDelta={page:{x:0,y:0,vx:0,vy:0,speed:0},client:{x:0,y:0,vx:0,vy:0,speed:0},timeStamp:0};this.downEvent=null;this.downPointer={};this.prevEvent=this._curEventTarget=this._eventTarget=null;this.tapTime=0;this.prevTap=null;this.startOffset={left:0,right:0,top:0,bottom:0};this.restrictOffset={left:0,right:0,top:0,bottom:0};this.snapOffsets=[];this.gesture={start:{x:0,y:0},startDistance:0,prevDistance:0,distance:0,scale:1,startAngle:0,prevAngle:0};
this.snapStatus={x:0,y:0,dx:0,dy:0,realX:0,realY:0,snappedX:0,snappedY:0,targets:[],locked:!1,changed:!1};this.restrictStatus={dx:0,dy:0,restrictedX:0,restrictedY:0,snap:null,restricted:!1,changed:!1};this.restrictStatus.snap=this.snapStatus;this.resizing=this.dragging=this.gesturing=this.pointerWasMoved=this.pointerIsDown=!1;this.resizeAxes="xy";this.mouse=!1;w.push(this)}function Za(a,b,c){var d=w.length,e=/mouse/i.test(a.pointerType||b)||4===a.pointerType,k=Q(a);if(/down|start/i.test(b))for(a=
0;a<d;a++){var h=w[a];var f=c;if(h.inertiaStatus.active&&h.target.options[h.prepared.name].inertia.allowResume&&h.mouse===e)for(;f;){if(f===h.element)return h;f=N(f)}}if(e||!ha&&!U){for(a=0;a<d;a++)if(w[a].mouse&&!w[a].inertiaStatus.active)return w[a];for(a=0;a<d;a++)if(w[a].mouse&&(!/down/.test(b)||!w[a].inertiaStatus.active))return h;h=new wa;h.mouse=!0;return h}for(a=0;a<d;a++)if(-1!==y(w[a].pointerIds,k))return w[a];if(/up|end|out/i.test(b))return null;for(a=0;a<d;a++)if(h=w[a],!(h.prepared.name&&
!h.target.options.gesture.enabled||h.interacting()||!e&&h.mouse))return h;return new wa}function $a(a){return function(b){var c,d=Ba(b.path?b.path[0]:b.target),e=Ba(b.currentTarget),k;if(ha&&/touch/.test(b.type))for(ab=(new Date).getTime(),k=0;k<b.changedTouches.length;k++){var h=b.changedTouches[k];if(c=Za(h,b.type,d))c._updateEventTargets(d,e),c[a](h,b,d,e)}else{if(!U&&/mouse/.test(b.type)){for(k=0;k<w.length;k++)if(!w[k].mouse&&w[k].pointerIsDown)return;if(500>(new Date).getTime()-ab)return}if(c=
Za(b,b.type,d))c._updateEventTargets(d,e),c[a](b,b,d,e)}}}function I(a,b,c,d,e,k){var h=a.target,f=a.snapStatus,q=a.restrictStatus,G=a.pointers,n=(h&&h.options||H).deltaSource,t=n+"X",z=n+"Y",p=h?h.options:H,m=na(h,e),r="start"===d,l="end"===d;var A=r?a.startCoords:a.curCoords;e=e||a.element;var g=C({},A.page);A=C({},A.client);g.x-=m.x;g.y-=m.y;A.x-=m.x;A.y-=m.y;var ja=p[c].snap&&p[c].snap.relativePoints;!Ja(h,c)||r&&ja&&ja.length||(this.snap={range:f.range,locked:f.locked,x:f.snappedX,y:f.snappedY,
realX:f.realX,realY:f.realY,dx:f.dx,dy:f.dy},f.locked&&(g.x+=f.dx,g.y+=f.dy,A.x+=f.dx,A.y+=f.dy));!Ka(h,c)||r&&p[c].restrict.elementRect||!q.restricted||(g.x+=q.dx,g.y+=q.dy,A.x+=q.dx,A.y+=q.dy,this.restrict={dx:q.dx,dy:q.dy});this.pageX=g.x;this.pageY=g.y;this.clientX=A.x;this.clientY=A.y;this.x0=a.startCoords.page.x-m.x;this.y0=a.startCoords.page.y-m.y;this.clientX0=a.startCoords.client.x-m.x;this.clientY0=a.startCoords.client.y-m.y;this.ctrlKey=b.ctrlKey;this.altKey=b.altKey;this.shiftKey=b.shiftKey;
this.metaKey=b.metaKey;this.button=b.button;this.buttons=b.buttons;this.target=e;this.t0=a.downTimes[0];this.type=c+(d||"");this.interaction=a;this.interactable=h;e=a.inertiaStatus;e.active&&(this.detail="inertia");k&&(this.relatedTarget=k);l?"client"===n?(this.dx=A.x-a.startCoords.client.x,this.dy=A.y-a.startCoords.client.y):(this.dx=g.x-a.startCoords.page.x,this.dy=g.y-a.startCoords.page.y):r?this.dy=this.dx=0:"inertiastart"===d?(this.dx=a.prevEvent.dx,this.dy=a.prevEvent.dy):"client"===n?(this.dx=
A.x-a.prevEvent.clientX,this.dy=A.y-a.prevEvent.clientY):(this.dx=g.x-a.prevEvent.pageX,this.dy=g.y-a.prevEvent.pageY);a.prevEvent&&"inertia"===a.prevEvent.detail&&!e.active&&p[c].inertia&&p[c].inertia.zeroResumeDelta&&(e.resumeDx+=this.dx,e.resumeDy+=this.dy,this.dx=this.dy=0);"resize"===c&&a.resizeAxes?p.resize.square?("y"===a.resizeAxes?this.dx=this.dy:this.dy=this.dx,this.axes="xy"):(this.axes=a.resizeAxes,"x"===a.resizeAxes?this.dy=0:"y"===a.resizeAxes&&(this.dx=0)):"gesture"===c&&(this.touches=
[G[0],G[1]],r?(this.distance=Fa(G,n),this.box=Ea(G),this.scale=1,this.ds=0,this.angle=Ga(G,void 0,n),this.da=0):l||b instanceof I?(this.distance=a.prevEvent.distance,this.box=a.prevEvent.box,this.scale=a.prevEvent.scale,this.ds=this.scale-1,this.angle=a.prevEvent.angle,this.da=this.angle-a.gesture.startAngle):(this.distance=Fa(G,n),this.box=Ea(G),this.scale=this.distance/a.gesture.startDistance,this.angle=Ga(G,a.gesture.prevAngle,n),this.ds=this.scale-a.gesture.prevScale,this.da=this.angle-a.gesture.prevAngle));
r?(this.timeStamp=a.downTimes[0],this.velocityY=this.velocityX=this.speed=this.duration=this.dt=0):"inertiastart"===d?(this.timeStamp=a.prevEvent.timeStamp,this.dt=a.prevEvent.dt,this.duration=a.prevEvent.duration,this.speed=a.prevEvent.speed,this.velocityX=a.prevEvent.velocityX,this.velocityY=a.prevEvent.velocityY):(this.timeStamp=(new Date).getTime(),this.dt=this.timeStamp-a.prevEvent.timeStamp,this.duration=this.timeStamp-a.downTimes[0],b instanceof I?(b=this[t]-a.prevEvent[t],z=this[z]-a.prevEvent[z],
c=this.dt/1E3,this.speed=ga(b,z)/c,this.velocityX=b/c,this.velocityY=z/c):(this.speed=a.pointerDelta[n].speed,this.velocityX=a.pointerDelta[n].vx,this.velocityY=a.pointerDelta[n].vy));(l||"inertiastart"===d)&&600<a.prevEvent.speed&&150>this.timeStamp-a.prevEvent.timeStamp&&(d=180*Math.atan2(a.prevEvent.velocityY,a.prevEvent.velocityX)/Math.PI,0>d&&(d+=360),l=112.5<=d&&247.5>d,z=202.5<=d&&337.5>d,this.swipe={up:z,down:!z&&22.5<=d&&157.5>d,left:l,right:!l&&(292.5<=d||67.5>d),angle:d,speed:a.prevEvent.speed,
velocity:{x:a.prevEvent.velocityX,y:a.prevEvent.velocityY}})}function bb(){this.originalEvent.preventDefault()}function cb(a){var b="";"drag"===a.name&&(b=xa.drag);if("resize"===a.name)if(a.axis)b=xa[a.name+a.axis];else if(a.edges){for(var b="resize",c=["top","bottom","left","right"],d=0;4>d;d++)a.edges[c[d]]&&(b+=c[d]);b=xa[b]}return b}function db(a,b,c){var d=this.getRect(c),e=!1,k=null,h=C({},b.curCoords.page);a=this.options;if(!d)return null;if(V.resize&&a.resize.enabled){e=a.resize;var f={left:!1,
right:!1,top:!1,bottom:!1};if(u(e.edges)){for(var q in f){var G=f,n=q;a:{var t=q;var z=e.edges[q],g=h,p=b._eventTarget,m=c,l=d,A=e.margin||oa;if(z){if(!0===z){var x=F(l.width)?l.width:l.right-l.left,ja=F(l.height)?l.height:l.bottom-l.top;0>x&&("left"===t?t="right":"right"===t&&(t="left"));0>ja&&("top"===t?t="bottom":"bottom"===t&&(t="top"));if("left"===t){t=g.x<(0<=x?l.left:l.right)+A;break a}if("top"===t){t=g.y<(0<=ja?l.top:l.bottom)+A;break a}if("right"===t){t=g.x>(0<=x?l.right:l.left)-A;break a}if("bottom"===
t){t=g.y>(0<=ja?l.bottom:l.top)-A;break a}}t=r(p)?r(z)?z===p:Ia(p,z,m):!1}else t=!1}G[n]=t}f.left=f.left&&!f.right;f.top=f.top&&!f.bottom;e=f.left||f.right||f.top||f.bottom}else c="y"!==a.resize.axis&&h.x>d.right-oa,d="x"!==a.resize.axis&&h.y>d.bottom-oa,e=c||d,k=(c?"x":"")+(d?"y":"")}a=e?"resize":V.drag&&a.drag.enabled?"drag":null;V.gesture&&2<=b.pointerIds.length&&!b.dragging&&!b.resizing&&(a="gesture");return a?{name:a,axis:k,edges:f}:null}function Z(a,b){if(!u(a))return null;var c=a.name;b=b.options;
return("resize"===c&&b.resize.enabled||"drag"===c&&b.drag.enabled||"gesture"===c&&b.gesture.enabled)&&V[c]?a:null}function pa(a,b){var c={},d=R[a.type],e=Ba(a.path?a.path[0]:a.target),k=e;b=b?!0:!1;for(var h in a)c[h]=a[h];c.originalEvent=a;for(c.preventDefault=bb;r(k);){for(a=0;a<d.selectors.length;a++)if(h=d.contexts[a],T(k,d.selectors[a])&&ba(h,e)&&ba(h,k)){h=d.listeners[a];c.currentTarget=k;for(var f=0;f<h.length;f++)if(h[f][1]===b)h[f][0](c)}k=N(k)}}function ya(a){return pa.call(this,a,!0)}function p(a,
b){return D.get(a,b)||new E(a,b)}function E(a,b){this._element=a;this._iEvents=this._iEvents||{};if(fa(a)){this.selector=a;var c=(a=b&&b.context)?Y(a):v;a&&(c.Node?a instanceof c.Node:r(a)||a===c.document)&&(this._context=a)}else c=Y(a),r(a,c)&&(U?(n.add(this._element,L.down,l.pointerDown),n.add(this._element,L.move,l.pointerHover)):(n.add(this._element,"mousedown",l.pointerDown),n.add(this._element,"mousemove",l.pointerHover),n.add(this._element,"touchstart",l.pointerDown),n.add(this._element,"touchmove",
l.pointerHover)));this._doc=c.document;-1===y(ka,this._doc)&&eb(this._doc);D.push(this);this.set(b)}function O(a,b){var c=!1;return function(){c||(v.console.warn(b),c=!0);return a.apply(this,arguments)}}function fb(a){for(var b=0;b<w.length;b++)w[b].pointerEnd(a,a)}function eb(a){if(-1===y(ka,a)){var b=a.defaultView||a.parentWindow,c;for(c in R)n.add(a,c,pa),n.add(a,c,ya,!0);U?(L=gb===b.MSPointerEvent?{up:"MSPointerUp",down:"MSPointerDown",over:"mouseover",out:"mouseout",move:"MSPointerMove",cancel:"MSPointerCancel"}:
{up:"pointerup",down:"pointerdown",over:"pointerover",out:"pointerout",move:"pointermove",cancel:"pointercancel"},n.add(a,L.down,l.selectorDown),n.add(a,L.move,l.pointerMove),n.add(a,L.over,l.pointerOver),n.add(a,L.out,l.pointerOut),n.add(a,L.up,l.pointerUp),n.add(a,L.cancel,l.pointerCancel),n.add(a,L.move,l.autoScrollMove)):(n.add(a,"mousedown",l.selectorDown),n.add(a,"mousemove",l.pointerMove),n.add(a,"mouseup",l.pointerUp),n.add(a,"mouseover",l.pointerOver),n.add(a,"mouseout",l.pointerOut),n.add(a,
"touchstart",l.selectorDown),n.add(a,"touchmove",l.pointerMove),n.add(a,"touchend",l.pointerUp),n.add(a,"touchcancel",l.pointerCancel),n.add(a,"mousemove",l.autoScrollMove),n.add(a,"touchmove",l.autoScrollMove));n.add(b,"blur",fb);try{if(b.frameElement){var d=b.frameElement.ownerDocument,e=d.defaultView;n.add(d,"mouseup",l.pointerEnd);n.add(d,"touchend",l.pointerEnd);n.add(d,"touchcancel",l.pointerEnd);n.add(d,"pointerup",l.pointerEnd);n.add(d,"MSPointerUp",l.pointerEnd);n.add(e,"blur",fb)}}catch(k){p.windowParentError=
k}n.add(a,"dragstart",function(a){for(var b=0;b<w.length;b++){var c=w[b];if(c.element&&(c.element===a.target||ba(c.element,a.target))){c.checkAndPreventDefault(a,c.target,c.element);break}}});n.useAttachEvent&&(n.add(a,"selectstart",function(a){var b=w[0];b.currentAction()&&b.checkAndPreventDefault(a)}),n.add(a,"dblclick",$a("ie8Dblclick")));ka.push(a)}}function y(a,b){for(var c=0,d=a.length;c<d;c++)if(a[c]===b)return c;return-1}function T(a,b,c){if(la)return la(a,b,c);v!==m&&(b=b.replace(/\/deep\//g,
" "));return a[La](b)}function Ia(a,b,c){for(;r(a);){if(T(a,b))return!0;a=N(a);if(a===c)return T(a,b)}return!1}if(m){var v=function(){var a=m.document.createTextNode("");return a.ownerDocument!==m.document&&"function"===typeof m.wrap&&m.wrap(a)===a?m.wrap(m):m}(),S=v.document,Xa=v.DocumentFragment||J,Ua=v.SVGElement||J,mb=v.SVGSVGElement||J,kb=v.SVGElementInstance||J,nb=v.HTMLElement||v.Element,gb=v.PointerEvent||v.MSPointerEvent,L,ga=Math.hypot||function(a,b){return Math.sqrt(a*a+b*b)},ma={},ka=
[],D=[],w=[],Ma=!1,R={},H={base:{accept:null,actionChecker:null,styleCursor:!0,preventDefault:"auto",origin:{x:0,y:0},deltaSource:"page",allowFrom:null,ignoreFrom:null,_context:S,dropChecker:null},drag:{enabled:!1,manualStart:!0,max:Infinity,maxPerElement:1,snap:null,restrict:null,inertia:null,autoScroll:null,axis:"xy"},drop:{enabled:!1,accept:null,overlap:"pointer"},resize:{enabled:!1,manualStart:!1,max:Infinity,maxPerElement:1,snap:null,restrict:null,inertia:null,autoScroll:null,square:!1,preserveAspectRatio:!1,
axis:"xy",margin:NaN,edges:null,invert:"none"},gesture:{manualStart:!1,enabled:!1,max:Infinity,maxPerElement:1,restrict:null},perAction:{manualStart:!1,max:Infinity,maxPerElement:1,snap:{enabled:!1,endOnly:!1,range:Infinity,targets:null,offsets:null,relativePoints:null},restrict:{enabled:!1,endOnly:!1},autoScroll:{enabled:!1,container:null,margin:60,speed:300},inertia:{enabled:!1,resistance:10,minSpeed:100,endSpeed:10,allowResume:!0,zeroResumeDelta:!0,smoothEndDuration:300}},_holdDuration:600},g=
{interaction:null,i:null,x:0,y:0,scroll:function(){var a=g.interaction.target.options[g.interaction.prepared.name].autoScroll,b=a.container||Y(g.interaction.element),c=(new Date).getTime(),d=(c-g.prevTimeX)/1E3,e=(c-g.prevTimeY)/1E3;if(a.velocity){var k=a.velocity.x;a=a.velocity.y}else k=a=a.speed;d*=k;e*=a;if(1<=d||1<=e)M(b)?b.scrollBy(g.x*d,g.y*e):b&&(b.scrollLeft+=g.x*d,b.scrollTop+=g.y*e),1<=d&&(g.prevTimeX=c),1<=e&&(g.prevTimeY=c);g.isScrolling&&(aa(g.i),g.i=W(g.scroll))},isScrolling:!1,prevTimeX:0,
prevTimeY:0,start:function(a){g.isScrolling=!0;aa(g.i);g.interaction=a;g.prevTimeX=(new Date).getTime();g.prevTimeY=(new Date).getTime();g.i=W(g.scroll)},stop:function(){g.isScrolling=!1;aa(g.i)}},ha="ontouchstart"in v||v.DocumentTouch&&S instanceof v.DocumentTouch,U=gb&&!/Chrome/.test(navigator.userAgent),oa=ha||U?20:10,Na=1,ab=0,va=Infinity,xa=S.all&&!v.atob?{drag:"move",resizex:"e-resize",resizey:"s-resize",resizexy:"se-resize",resizetop:"n-resize",resizeleft:"w-resize",resizebottom:"s-resize",
resizeright:"e-resize",resizetopleft:"se-resize",resizebottomright:"se-resize",resizetopright:"ne-resize",resizebottomleft:"ne-resize",gesture:""}:{drag:"move",resizex:"ew-resize",resizey:"ns-resize",resizexy:"nwse-resize",resizetop:"ns-resize",resizeleft:"ew-resize",resizebottom:"ns-resize",resizeright:"ew-resize",resizetopleft:"nwse-resize",resizebottomright:"nwse-resize",resizetopright:"nesw-resize",resizebottomleft:"nesw-resize",gesture:""},V={drag:!0,resize:!0,gesture:!0},hb="onmousewheel"in
S?"mousewheel":"wheel",ea="dragstart dragmove draginertiastart dragend dragenter dragleave dropactivate dropdeactivate dropmove drop resizestart resizemove resizeinertiastart resizeend gesturestart gesturemove gestureinertiastart gestureend down move up cancel tap doubletap hold".split(" "),X={},Sa="Opera"==navigator.appName&&ha&&navigator.userAgent.match("Presto"),lb=/iP(hone|od|ad)/.test(navigator.platform)&&/OS 7[^\d]/.test(navigator.appVersion),La="matches"in Element.prototype?"matches":"webkitMatchesSelector"in
Element.prototype?"webkitMatchesSelector":"mozMatchesSelector"in Element.prototype?"mozMatchesSelector":"oMatchesSelector"in Element.prototype?"oMatchesSelector":"msMatchesSelector",la,W=m.requestAnimationFrame,aa=m.cancelAnimationFrame,n=function(){function a(b,c,d,k){var t,l=y(q,b),g=G[l],p=d;if(g&&g.events){if(e){var z=n[l];var m=y(z.supplied,d);p=z.wrapped[m]}if("all"===c)for(c in g.events)g.events.hasOwnProperty(c)&&a(b,c,"all");else{if(g.events[c]){var r=g.events[c].length;if("all"===d){for(t=
0;t<r;t++)a(b,c,g.events[c][t],!!k);return}for(t=0;t<r;t++)if(g.events[c][t]===d){b[h](f+c,p,k||!1);g.events[c].splice(t,1);e&&z&&(z.useCount[m]--,0===z.useCount[m]&&(z.supplied.splice(m,1),z.wrapped.splice(m,1),z.useCount.splice(m,1)));break}g.events[c]&&0===g.events[c].length&&(g.events[c]=null,g.typeCount--)}g.typeCount||(G.splice(l,1),q.splice(l,1),n.splice(l,1))}}}function b(){this.returnValue=!1}function c(){this.cancelBubble=!0}function d(){this.immediatePropagationStopped=this.cancelBubble=
!0}var e="attachEvent"in v&&!("addEventListener"in v),k=e?"attachEvent":"addEventListener",h=e?"detachEvent":"removeEventListener",f=e?"on":"",q=[],G=[],n=[];return{add:function(a,h,g,l){var t=y(q,a),m=G[t];m||(m={events:{},typeCount:0},t=q.push(a)-1,G.push(m),n.push(e?{supplied:[],wrapped:[],useCount:[]}:null));m.events[h]||(m.events[h]=[],m.typeCount++);if(-1===y(m.events[h],g)){if(e){var t=n[t],p=y(t.supplied,g),z=t.wrapped[p]||function(e){e.immediatePropagationStopped||(e.target=e.srcElement,
e.currentTarget=a,e.preventDefault=e.preventDefault||b,e.stopPropagation=e.stopPropagation||c,e.stopImmediatePropagation=e.stopImmediatePropagation||d,/mouse|click/.test(e.type)&&(e.pageX=e.clientX+Y(a).document.documentElement.scrollLeft,e.pageY=e.clientY+Y(a).document.documentElement.scrollTop),g(e))};l=a[k](f+h,z,!!l);-1===p?(t.supplied.push(g),t.wrapped.push(z),t.useCount.push(1)):t.useCount[p]++}else l=a[k](h,g,l||!1);m.events[h].push(g);return l}},remove:a,useAttachEvent:e,_elements:q,_targets:G,
_attachedListeners:n}}(),za={webkit:/(Movement[XY]|Radius[XY]|RotationAngle|Force)$/};wa.prototype={getPageXY:function(a,b){return Aa(a,b,this)},getClientXY:function(a,b){return Ta(a,b,this)},setEventXY:function(a,b){b=1<b.length?Va(b):b[0];Aa(b,ma,this);a.page.x=ma.x;a.page.y=ma.y;Ta(b,ma,this);a.client.x=ma.x;a.client.y=ma.y;a.timeStamp=(new Date).getTime()},pointerOver:function(a,b,c){function d(a,b){a&&r(c)&&ua(a,c)&&!ca(a,c,c)&&da(a,c,c)&&T(c,b)&&(e.push(a),k.push(c))}if(!this.prepared.name&&
this.mouse){var e=[],k=[],h=this.element;this.addPointer(a);!this.target||!ca(this.target,this.element,c)&&da(this.target,this.element,c)||(this.element=this.target=null,this.matches=[],this.matchElements=[]);var f=D.get(c),q=f&&!ca(f,c,c)&&da(f,c,c)&&Z(f.getAction(a,b,this,c),f);q&&!ia(f,c,q)&&(q=null);q?(this.target=f,this.element=c,this.matches=[],this.matchElements=[]):(D.forEachSelector(d),this.validateSelector(a,b,e,k)?(this.matches=e,this.matchElements=k,this.pointerHover(a,b,this.matches,
this.matchElements),n.add(c,U?L.move:"mousemove",l.pointerHover)):this.target&&(ba(h,c)?(this.pointerHover(a,b,this.matches,this.matchElements),n.add(this.element,U?L.move:"mousemove",l.pointerHover)):(this.element=this.target=null,this.matches=[],this.matchElements=[])))}},pointerHover:function(a,b,c,d,e,k){c=this.target;if(!this.prepared.name&&this.mouse){var h;this.setEventXY(this.curCoords,[a]);e?h=this.validateSelector(a,b,e,k):c&&(h=Z(c.getAction(this.pointers[0],b,this,this.element),this.target));
c&&c.options.styleCursor&&(c._doc.documentElement.style.cursor=h?cb(h):"")}else this.prepared.name&&this.checkAndPreventDefault(b,c,this.element)},pointerOut:function(a,b,c){this.prepared.name||(D.get(c)||n.remove(c,U?L.move:"mousemove",l.pointerHover),this.target&&this.target.options.styleCursor&&!this.interacting()&&(this.target._doc.documentElement.style.cursor=""))},selectorDown:function(a,b,c,d){function e(a,b,d){d=la?d.querySelectorAll(b):void 0;ua(a,f)&&!ca(a,f,c)&&da(a,f,c)&&T(f,b,d)&&(k.matches.push(a),
k.matchElements.push(f))}var k=this,h=n.useAttachEvent?C({},b):b,f=c,q=this.addPointer(a);this.holdTimers[q]=setTimeout(function(){k.pointerHold(n.useAttachEvent?h:a,h,c,d)},H._holdDuration);this.pointerIsDown=!0;if(this.inertiaStatus.active&&this.target.selector)for(;r(f);){if(f===this.element&&Z(this.target.getAction(a,b,this,this.element),this.target).name===this.prepared.name){aa(this.inertiaStatus.i);this.inertiaStatus.active=!1;this.collectEventTargets(a,b,c,"down");return}f=N(f)}if(!this.interacting()){this.setEventXY(this.curCoords,
[a]);for(this.downEvent=b;r(f)&&!g;){this.matches=[];this.matchElements=[];D.forEachSelector(e);var g=this.validateSelector(a,b,this.matches,this.matchElements);f=N(f)}if(g)return this.prepared.name=g.name,this.prepared.axis=g.axis,this.prepared.edges=g.edges,this.collectEventTargets(a,b,c,"down"),this.pointerDown(a,b,c,d,g);this.downTimes[q]=(new Date).getTime();this.downTargets[q]=c;qa(this.downPointer,a);ra(this.prevCoords,this.curCoords);this.pointerWasMoved=!1}this.collectEventTargets(a,b,c,
"down")},pointerDown:function(a,b,c,d,e){if(!e&&!this.inertiaStatus.active&&this.pointerWasMoved&&this.prepared.name)this.checkAndPreventDefault(b,this.target,this.element);else{this.pointerIsDown=!0;this.downEvent=b;var k=this.addPointer(a),h;if(1<this.pointerIds.length&&this.target._element===this.element){var f=Z(e||this.target.getAction(a,b,this,this.element),this.target);ia(this.target,this.element,f)&&(h=f);this.prepared.name=null}else this.prepared.name||(f=D.get(d))&&!ca(f,d,c)&&da(f,d,c)&&
(h=Z(e||f.getAction(a,b,this,d),f,c))&&ia(f,d,h)&&(this.target=f,this.element=d);var q=(f=this.target)&&f.options;!f||!e&&this.prepared.name?this.inertiaStatus.active&&d===this.element&&Z(f.getAction(a,b,this,this.element),f).name===this.prepared.name&&(aa(this.inertiaStatus.i),this.inertiaStatus.active=!1,this.checkAndPreventDefault(b,f,this.element)):(h=h||Z(e||f.getAction(a,b,this,d),f,this.element),this.setEventXY(this.startCoords,this.pointers),h&&(q.styleCursor&&(f._doc.documentElement.style.cursor=
cb(h)),this.resizeAxes="resize"===h.name?h.axis:null,"gesture"===h&&2>this.pointerIds.length&&(h=null),this.prepared.name=h.name,this.prepared.axis=h.axis,this.prepared.edges=h.edges,this.snapStatus.snappedX=this.snapStatus.snappedY=this.restrictStatus.restrictedX=this.restrictStatus.restrictedY=NaN,this.downTimes[k]=(new Date).getTime(),this.downTargets[k]=c,qa(this.downPointer,a),ra(this.prevCoords,this.startCoords),this.pointerWasMoved=!1,this.checkAndPreventDefault(b,f,this.element)))}},setModifications:function(a,
b){var c=this.target,d=!0,e=Ja(c,this.prepared.name)&&(!c.options[this.prepared.name].snap.endOnly||b);b=Ka(c,this.prepared.name)&&(!c.options[this.prepared.name].restrict.endOnly||b);e?this.setSnapping(a):this.snapStatus.locked=!1;b?this.setRestriction(a):this.restrictStatus.restricted=!1;e&&this.snapStatus.locked&&!this.snapStatus.changed?d=b&&this.restrictStatus.restricted&&this.restrictStatus.changed:b&&this.restrictStatus.restricted&&!this.restrictStatus.changed&&(d=!1);return d},setStartOffsets:function(a,
b,c){a=b.getRect(c);var d=na(b,c);c=b.options[this.prepared.name].snap;b=b.options[this.prepared.name].restrict;if(a){this.startOffset.left=this.startCoords.page.x-a.left;this.startOffset.top=this.startCoords.page.y-a.top;this.startOffset.right=a.right-this.startCoords.page.x;this.startOffset.bottom=a.bottom-this.startCoords.page.y;var e="width"in a?a.width:a.right-a.left;var k="height"in a?a.height:a.bottom-a.top}else this.startOffset.left=this.startOffset.top=this.startOffset.right=this.startOffset.bottom=
0;this.snapOffsets.splice(0);d=c&&"startCoords"===c.offset?{x:this.startCoords.page.x-d.x,y:this.startCoords.page.y-d.y}:c&&c.offset||{x:0,y:0};if(a&&c&&c.relativePoints&&c.relativePoints.length)for(var h=0;h<c.relativePoints.length;h++)this.snapOffsets.push({x:this.startOffset.left-e*c.relativePoints[h].x+d.x,y:this.startOffset.top-k*c.relativePoints[h].y+d.y});else this.snapOffsets.push(d);a&&b.elementRect?(this.restrictOffset.left=this.startOffset.left-e*b.elementRect.left,this.restrictOffset.top=
this.startOffset.top-k*b.elementRect.top,this.restrictOffset.right=this.startOffset.right-e*(1-b.elementRect.right),this.restrictOffset.bottom=this.startOffset.bottom-k*(1-b.elementRect.bottom)):this.restrictOffset.left=this.restrictOffset.top=this.restrictOffset.right=this.restrictOffset.bottom=0},start:function(a,b,c){this.interacting()||!this.pointerIsDown||this.pointerIds.length<("gesture"===a.name?2:1)||(-1===y(w,this)&&w.push(this),this.prepared.name||this.setEventXY(this.startCoords,this.pointers),
this.prepared.name=a.name,this.prepared.axis=a.axis,this.prepared.edges=a.edges,this.target=b,this.element=c,this.setStartOffsets(a.name,b,c),this.setModifications(this.startCoords.page),this.prevEvent=this[this.prepared.name+"Start"](this.downEvent))},pointerMove:function(a,b,c,d,e){if(this.inertiaStatus.active){d=this.inertiaStatus.upCoords.page;var k=this.inertiaStatus.upCoords.client;this.setEventXY(this.curCoords,[{pageX:d.x+this.inertiaStatus.sx,pageY:d.y+this.inertiaStatus.sy,clientX:k.x+this.inertiaStatus.sx,
clientY:k.y+this.inertiaStatus.sy}])}else this.recordPointer(a),this.setEventXY(this.curCoords,this.pointers);d=this.curCoords.page.x===this.prevCoords.page.x&&this.curCoords.page.y===this.prevCoords.page.y&&this.curCoords.client.x===this.prevCoords.client.x&&this.curCoords.client.y===this.prevCoords.client.y;var k=this.mouse?0:y(this.pointerIds,Q(a));if(this.pointerIsDown&&!this.pointerWasMoved){var h=this.curCoords.client.x-this.startCoords.client.x;var f=this.curCoords.client.y-this.startCoords.client.y;
this.pointerWasMoved=ga(h,f)>Na}d||this.pointerIsDown&&!this.pointerWasMoved||(this.pointerIsDown&&clearTimeout(this.holdTimers[k]),this.collectEventTargets(a,b,c,"move"));if(this.pointerIsDown)if(d&&this.pointerWasMoved&&!e)this.checkAndPreventDefault(b,this.target,this.element);else if(Qa(this.pointerDelta,this.prevCoords,this.curCoords),this.prepared.name){if(this.pointerWasMoved&&(!this.inertiaStatus.active||a instanceof I&&/inertiastart/.test(a.type))){if(!this.interacting()&&(Qa(this.pointerDelta,
this.prevCoords,this.curCoords),"drag"===this.prepared.name)){h=Math.abs(h);f=Math.abs(f);d=this.target.options.drag.axis;var q=h>f?"x":h<f?"y":"xy";if("xy"!==q&&"xy"!==d&&d!==q){this.prepared.name=null;for(var g=c;r(g);){if((f=D.get(g))&&f!==this.target&&!f.options.drag.manualStart&&"drag"===f.getAction(this.downPointer,this.downEvent,this,g).name&&Ya(q,f)){this.prepared.name="drag";this.target=f;this.element=g;break}g=N(g)}if(!this.prepared.name){var n=this;f=function(a,b,d){d=la?d.querySelectorAll(b):
void 0;if(a!==n.target&&ua(a,c)&&!a.options.drag.manualStart&&!ca(a,g,c)&&da(a,g,c)&&T(g,b,d)&&"drag"===a.getAction(n.downPointer,n.downEvent,n,g).name&&Ya(q,a)&&ia(a,g,"drag"))return a};for(g=c;r(g);){if(h=D.forEachSelector(f)){this.prepared.name="drag";this.target=h;this.element=g;break}g=N(g)}}}}if((f=!!this.prepared.name&&!this.interacting())&&(this.target.options[this.prepared.name].manualStart||!ia(this.target,this.element,this.prepared))){this.stop(b);return}if(this.prepared.name&&this.target){f&&
this.start(this.prepared,this.target,this.element);if(this.setModifications(this.curCoords.page,e)||f)this.prevEvent=this[this.prepared.name+"Move"](b);this.checkAndPreventDefault(b,this.target,this.element)}}ra(this.prevCoords,this.curCoords);(this.dragging||this.resizing)&&this.autoScrollMove(a)}},dragStart:function(a){var b=new I(this,a,"drag","start",this.element);this.dragging=!0;this.target.fire(b);this.activeDrops.dropzones=[];this.activeDrops.elements=[];this.activeDrops.rects=[];this.dynamicDrop||
this.setActiveDrops(this.element);a=this.getDropEvents(a,b);a.activate&&this.fireActiveDrops(a.activate);return b},dragMove:function(a){var b=this.target,c=new I(this,a,"drag","move",this.element),d=this.getDrop(c,a,this.element);this.dropTarget=d.dropzone;this.dropElement=d.element;a=this.getDropEvents(a,c);b.fire(c);a.leave&&this.prevDropTarget.fire(a.leave);a.enter&&this.dropTarget.fire(a.enter);a.move&&this.dropTarget.fire(a.move);this.prevDropTarget=this.dropTarget;this.prevDropElement=this.dropElement;
return c},resizeStart:function(a){a=new I(this,a,"resize","start",this.element);if(this.prepared.edges){var b=this.target.getRect(this.element);if(this.target.options.resize.square||this.target.options.resize.preserveAspectRatio){var c=C({},this.prepared.edges);c.top=c.top||c.left&&!c.bottom;c.left=c.left||c.top&&!c.right;c.bottom=c.bottom||c.right&&!c.top;c.right=c.right||c.bottom&&!c.left;this.prepared._linkedEdges=c}else this.prepared._linkedEdges=null;this.target.options.resize.preserveAspectRatio&&
(this.resizeStartAspectRatio=b.width/b.height);this.resizeRects={start:b,current:C({},b),restricted:C({},b),previous:C({},b),delta:{left:0,right:0,width:0,top:0,bottom:0,height:0}};a.rect=this.resizeRects.restricted;a.deltaRect=this.resizeRects.delta}this.target.fire(a);this.resizing=!0;return a},resizeMove:function(a){a=new I(this,a,"resize","move",this.element);var b=this.prepared.edges,c=this.target.options.resize.invert,d="reposition"===c||"negate"===c;if(b){var e=a.dx,k=a.dy,h=this.resizeRects.start,
f=this.resizeRects.current,q=this.resizeRects.restricted,g=this.resizeRects.delta,n=C(this.resizeRects.previous,q),l=b;if(this.target.options.resize.preserveAspectRatio){var m=this.resizeStartAspectRatio,b=this.prepared._linkedEdges;if(l.left&&l.bottom||l.right&&l.top)k=-e/m;else if(l.left||l.right)k=e/m;else if(l.top||l.bottom)e=k*m}else if(this.target.options.resize.square)if(b=this.prepared._linkedEdges,l.left&&l.bottom||l.right&&l.top)k=-e;else if(l.left||l.right)k=e;else if(l.top||l.bottom)e=
k;b.top&&(f.top+=k);b.bottom&&(f.bottom+=k);b.left&&(f.left+=e);b.right&&(f.right+=e);d?(C(q,f),"reposition"===c&&(q.top>q.bottom&&(b=q.top,q.top=q.bottom,q.bottom=b),q.left>q.right&&(b=q.left,q.left=q.right,q.right=b))):(q.top=Math.min(f.top,h.bottom),q.bottom=Math.max(f.bottom,h.top),q.left=Math.min(f.left,h.right),q.right=Math.max(f.right,h.left));q.width=q.right-q.left;q.height=q.bottom-q.top;for(var p in q)g[p]=q[p]-n[p];a.edges=this.prepared.edges;a.rect=q;a.deltaRect=g}this.target.fire(a);
return a},gestureStart:function(a){a=new I(this,a,"gesture","start",this.element);a.ds=0;this.gesture.startDistance=this.gesture.prevDistance=a.distance;this.gesture.startAngle=this.gesture.prevAngle=a.angle;this.gesture.scale=1;this.gesturing=!0;this.target.fire(a);return a},gestureMove:function(a){if(!this.pointerIds.length)return this.prevEvent;a=new I(this,a,"gesture","move",this.element);a.ds=a.scale-this.gesture.scale;this.target.fire(a);this.gesture.prevAngle=a.angle;this.gesture.prevDistance=
a.distance;Infinity===a.scale||null===a.scale||void 0===a.scale||isNaN(a.scale)||(this.gesture.scale=a.scale);return a},pointerHold:function(a,b,c){this.collectEventTargets(a,b,c,"hold")},pointerUp:function(a,b,c,d){var e=this.mouse?0:y(this.pointerIds,Q(a));clearTimeout(this.holdTimers[e]);this.collectEventTargets(a,b,c,"up");this.collectEventTargets(a,b,c,"tap");this.pointerEnd(a,b,c,d);this.removePointer(a)},pointerCancel:function(a,b,c,d){var e=this.mouse?0:y(this.pointerIds,Q(a));clearTimeout(this.holdTimers[e]);
this.collectEventTargets(a,b,c,"cancel");this.pointerEnd(a,b,c,d);this.removePointer(a)},ie8Dblclick:function(a,b,c){this.prevTap&&b.clientX===this.prevTap.clientX&&b.clientY===this.prevTap.clientY&&c===this.prevTap.target&&(this.downTargets[0]=c,this.downTimes[0]=(new Date).getTime(),this.collectEventTargets(a,b,c,"tap"))},pointerEnd:function(a,b,c,d){var e=this.target,k=e&&e.options,h=k&&this.prepared.name&&k[this.prepared.name].inertia;var f=this.inertiaStatus;if(this.interacting()){if(f.active&&
!f.ending)return;var q=(new Date).getTime(),g,l=!1,n=Ja(e,this.prepared.name)&&k[this.prepared.name].snap.endOnly,m=Ka(e,this.prepared.name)&&k[this.prepared.name].restrict.endOnly,p=0,r=0,k=this.dragging?"x"===k.drag.axis?Math.abs(this.pointerDelta.client.vx):"y"===k.drag.axis?Math.abs(this.pointerDelta.client.vy):this.pointerDelta.client.speed:this.pointerDelta.client.speed,h=(g=h&&h.enabled&&"gesture"!==this.prepared.name&&b!==f.startEvent)&&50>q-this.curCoords.timeStamp&&k>h.minSpeed&&k>h.endSpeed;
g&&!h&&(n||m)&&(g={},g.snap=g.restrict=g,n&&(this.setSnapping(this.curCoords.page,g),g.locked&&(p+=g.dx,r+=g.dy)),m&&(this.setRestriction(this.curCoords.page,g),g.restricted&&(p+=g.dx,r+=g.dy)),p||r)&&(l=!0);if(h||l){ra(f.upCoords,this.curCoords);this.pointers[0]=f.startEvent=new I(this,b,this.prepared.name,"inertiastart",this.element);f.t0=q;e.fire(f.startEvent);h?(f.vx0=this.pointerDelta.client.vx,f.vy0=this.pointerDelta.client.vy,f.v0=k,this.calcInertia(f),b=C({},this.curCoords.page),e=na(e,this.element),
b.x=b.x+f.xe-e.x,b.y=b.y+f.ye-e.y,e={useStatusXY:!0,x:b.x,y:b.y,dx:0,dy:0,snap:null},e.snap=e,p=r=0,n&&(b=this.setSnapping(this.curCoords.page,e),b.locked&&(p+=b.dx,r+=b.dy)),m&&(e=this.setRestriction(this.curCoords.page,e),e.restricted&&(p+=e.dx,r+=e.dy)),f.modifiedXe+=p,f.modifiedYe+=r,f.i=W(this.boundInertiaFrame)):(f.smoothEnd=!0,f.xe=p,f.ye=r,f.sx=f.sy=0,f.i=W(this.boundSmoothEndFrame));f.active=!0;return}(n||m)&&this.pointerMove(a,b,c,d,!0)}this.dragging?(f=new I(this,b,"drag","end",this.element),
m=this.getDrop(f,b,this.element),this.dropTarget=m.dropzone,this.dropElement=m.element,m=this.getDropEvents(b,f),m.leave&&this.prevDropTarget.fire(m.leave),m.enter&&this.dropTarget.fire(m.enter),m.drop&&this.dropTarget.fire(m.drop),m.deactivate&&this.fireActiveDrops(m.deactivate),e.fire(f)):this.resizing?(f=new I(this,b,"resize","end",this.element),e.fire(f)):this.gesturing&&(f=new I(this,b,"gesture","end",this.element),e.fire(f));this.stop(b)},collectDrops:function(a){var b=[],c=[],d;a=a||this.element;
for(d=0;d<D.length;d++)if(D[d].options.drop.enabled){var e=D[d],k=e.options.drop.accept;if(!(r(k)&&k!==a||P(k)&&!T(a,k)))for(var k=e.selector?e._context.querySelectorAll(e.selector):[e._element],h=0,f=k.length;h<f;h++){var g=k[h];g!==a&&(b.push(e),c.push(g))}}return{dropzones:b,elements:c}},fireActiveDrops:function(a){var b;for(b=0;b<this.activeDrops.dropzones.length;b++){var c=this.activeDrops.dropzones[b];var d=this.activeDrops.elements[b];d!==e&&(a.target=d,c.fire(a));var e=d}},setActiveDrops:function(a){a=
this.collectDrops(a,!0);this.activeDrops.dropzones=a.dropzones;this.activeDrops.elements=a.elements;this.activeDrops.rects=[];for(a=0;a<this.activeDrops.dropzones.length;a++)this.activeDrops.rects[a]=this.activeDrops.dropzones[a].getRect(this.activeDrops.elements[a])},getDrop:function(a,b,c){var d=[];Ma&&this.setActiveDrops(c);for(var e=0;e<this.activeDrops.dropzones.length;e++){var k=this.activeDrops.elements[e];d.push(this.activeDrops.dropzones[e].dropCheck(a,b,this.target,c,k,this.activeDrops.rects[e])?
k:null)}c=(b=d[0])?0:-1;for(var h,e=[],f,k=1;k<d.length;k++)if((a=d[k])&&a!==b)if(!b)b=a,c=k;else if(a.parentNode!==a.ownerDocument)if(b.parentNode===a.ownerDocument)b=a,c=k;else{if(!e.length)for(h=b;h.parentNode&&h.parentNode!==h.ownerDocument;)e.unshift(h),h=h.parentNode;if(b instanceof nb&&a instanceof Ua&&!(a instanceof mb)){if(a===b.parentNode)continue;h=a.ownerSVGElement}else h=a;for(f=[];h.parentNode!==h.ownerDocument;)f.unshift(h),h=h.parentNode;for(h=0;f[h]&&f[h]===e[h];)h++;h=[f[h-1],f[h],
e[h]];for(f=h[0].lastChild;f;){if(f===h[1]){b=a;c=k;e=[];break}else if(f===h[2])break;f=f.previousSibling}}d=c;return{dropzone:this.activeDrops.dropzones[d]||null,element:this.activeDrops.elements[d]||null}},getDropEvents:function(a,b){a={enter:null,leave:null,activate:null,deactivate:null,move:null,drop:null};this.dropElement!==this.prevDropElement&&(this.prevDropTarget&&(a.leave={target:this.prevDropElement,dropzone:this.prevDropTarget,relatedTarget:b.target,draggable:b.interactable,dragEvent:b,
interaction:this,timeStamp:b.timeStamp,type:"dragleave"},b.dragLeave=this.prevDropElement,b.prevDropzone=this.prevDropTarget),this.dropTarget&&(a.enter={target:this.dropElement,dropzone:this.dropTarget,relatedTarget:b.target,draggable:b.interactable,dragEvent:b,interaction:this,timeStamp:b.timeStamp,type:"dragenter"},b.dragEnter=this.dropElement,b.dropzone=this.dropTarget));"dragend"===b.type&&this.dropTarget&&(a.drop={target:this.dropElement,dropzone:this.dropTarget,relatedTarget:b.target,draggable:b.interactable,
dragEvent:b,interaction:this,timeStamp:b.timeStamp,type:"drop"},b.dropzone=this.dropTarget);"dragstart"===b.type&&(a.activate={target:null,dropzone:null,relatedTarget:b.target,draggable:b.interactable,dragEvent:b,interaction:this,timeStamp:b.timeStamp,type:"dropactivate"});"dragend"===b.type&&(a.deactivate={target:null,dropzone:null,relatedTarget:b.target,draggable:b.interactable,dragEvent:b,interaction:this,timeStamp:b.timeStamp,type:"dropdeactivate"});"dragmove"===b.type&&this.dropTarget&&(a.move=
{target:this.dropElement,dropzone:this.dropTarget,relatedTarget:b.target,draggable:b.interactable,dragEvent:b,interaction:this,dragmove:b,timeStamp:b.timeStamp,type:"dropmove"},b.dropzone=this.dropTarget);return a},currentAction:function(){return this.dragging&&"drag"||this.resizing&&"resize"||this.gesturing&&"gesture"||null},interacting:function(){return this.dragging||this.resizing||this.gesturing},clearTargets:function(){this.dropTarget=this.dropElement=this.prevDropTarget=this.prevDropElement=
this.target=this.element=null},stop:function(a){if(this.interacting()){g.stop();this.matches=[];this.matchElements=[];var b=this.target;b.options.styleCursor&&(b._doc.documentElement.style.cursor="");a&&x(a.preventDefault)&&this.checkAndPreventDefault(a,b,this.element);this.dragging&&(this.activeDrops.dropzones=this.activeDrops.elements=this.activeDrops.rects=null)}this.clearTargets();this.pointerIsDown=this.snapStatus.locked=this.dragging=this.resizing=this.gesturing=!1;this.prepared.name=this.prevEvent=
null;for(a=this.inertiaStatus.resumeDx=this.inertiaStatus.resumeDy=0;a<this.pointers.length;a++)-1===y(this.pointerIds,Q(this.pointers[a]))&&this.pointers.splice(a,1)},inertiaFrame:function(){var a=this.inertiaStatus;var b=this.target.options[this.prepared.name].inertia.resistance;var c=(new Date).getTime()/1E3-a.t0;if(c<a.te){c=1-(Math.exp(-b*c)-a.lambda_v0)/a.one_ve_v0;if(a.modifiedXe===a.xe&&a.modifiedYe===a.ye)a.sx=a.xe*c,a.sy=a.ye*c;else{var d=a.ye,e=a.modifiedYe;b=Wa(c,0,a.xe,a.modifiedXe);
c=Wa(c,0,d,e);a.sx=b;a.sy=c}this.pointerMove(a.startEvent,a.startEvent);a.i=W(this.boundInertiaFrame)}else a.ending=!0,a.sx=a.modifiedXe,a.sy=a.modifiedYe,this.pointerMove(a.startEvent,a.startEvent),this.pointerEnd(a.startEvent,a.startEvent),a.active=a.ending=!1},smoothEndFrame:function(){var a=this.inertiaStatus,b=(new Date).getTime()-a.t0,c=this.target.options[this.prepared.name].inertia.smoothEndDuration;if(b<c){var d=b/c;a.sx=-a.xe*d*(d-2)+0;b/=c;a.sy=-a.ye*b*(b-2)+0;this.pointerMove(a.startEvent,
a.startEvent);a.i=W(this.boundSmoothEndFrame)}else a.ending=!0,a.sx=a.xe,a.sy=a.ye,this.pointerMove(a.startEvent,a.startEvent),this.pointerEnd(a.startEvent,a.startEvent),a.smoothEnd=a.active=a.ending=!1},addPointer:function(a){var b=Q(a),c=this.mouse?0:y(this.pointerIds,b);-1===c&&(c=this.pointerIds.length);this.pointerIds[c]=b;this.pointers[c]=a;return c},removePointer:function(a){a=Q(a);a=this.mouse?0:y(this.pointerIds,a);-1!==a&&(this.pointers.splice(a,1),this.pointerIds.splice(a,1),this.downTargets.splice(a,
1),this.downTimes.splice(a,1),this.holdTimers.splice(a,1))},recordPointer:function(a){var b=this.mouse?0:y(this.pointerIds,Q(a));-1!==b&&(this.pointers[b]=a)},collectEventTargets:function(a,b,c,d){function e(a,b,e){e=la?e.querySelectorAll(b):void 0;a._iEvents[d]&&r(g)&&ua(a,g)&&!ca(a,g,c)&&da(a,g,c)&&T(g,b,e)&&(h.push(a),f.push(g))}var k=this.mouse?0:y(this.pointerIds,Q(a));if("tap"!==d||!this.pointerWasMoved&&this.downTargets[k]&&this.downTargets[k]===c){for(var h=[],f=[],g=c;g;)p.isSet(g)&&p(g)._iEvents[d]&&
(h.push(p(g)),f.push(g)),D.forEachSelector(e),g=N(g);(h.length||"tap"===d)&&this.firePointers(a,b,c,h,f,d)}},firePointers:function(a,b,c,d,e,k){var h=this.mouse?0:y(this.pointerIds,Q(a)),f={};"doubletap"===k?f=a:(qa(f,b),b!==a&&qa(f,a),f.preventDefault=bb,f.stopPropagation=I.prototype.stopPropagation,f.stopImmediatePropagation=I.prototype.stopImmediatePropagation,f.interaction=this,f.timeStamp=(new Date).getTime(),f.originalEvent=b,f.originalPointer=a,f.type=k,f.pointerId=Q(a),f.pointerType=this.mouse?
"mouse":U?P(a.pointerType)?a.pointerType:[,,"touch","pen","mouse"][a.pointerType]:"touch");if("tap"===k){f.dt=f.timeStamp-this.downTimes[h];var g=f.timeStamp-this.tapTime;var l=!!(this.prevTap&&"doubletap"!==this.prevTap.type&&this.prevTap.target===f.target&&500>g);f.double=l;this.tapTime=f.timeStamp}for(a=0;a<d.length&&!(f.currentTarget=e[a],f.interactable=d[a],d[a].fire(f),f.immediatePropagationStopped||f.propagationStopped&&e[a+1]!==f.currentTarget);a++);l?(d={},C(d,f),d.dt=g,d.type="doubletap",
this.collectEventTargets(d,b,c,"doubletap"),this.prevTap=d):"tap"===k&&(this.prevTap=f)},validateSelector:function(a,b,c,d){for(var e=0,k=c.length;e<k;e++){var h=c[e],f=d[e],g=Z(h.getAction(a,b,this,f),h);if(g&&ia(h,f,g))return this.target=h,this.element=f,g}},setSnapping:function(a,b){var c=this.target.options[this.prepared.name].snap,d=[],e;b=b||this.snapStatus;if(b.useStatusXY)a={x:b.x,y:b.y};else{var k=na(this.target,this.element);a=C({},a);a.x-=k.x;a.y-=k.y}b.realX=a.x;b.realY=a.y;a.x-=this.inertiaStatus.resumeDx;
a.y-=this.inertiaStatus.resumeDy;for(var h=c.targets?c.targets.length:0,f=0;f<this.snapOffsets.length;f++){var g=a.x-this.snapOffsets[f].x,l=a.y-this.snapOffsets[f].y;for(e=0;e<h;e++)(k=x(c.targets[e])?c.targets[e](g,l,this):c.targets[e])&&d.push({x:F(k.x)?k.x+this.snapOffsets[f].x:g,y:F(k.y)?k.y+this.snapOffsets[f].y:l,range:F(k.range)?k.range:c.range})}var c=null,f=!1,m=0,n=0;e=l=g=0;for(h=d.length;e<h;e++){k=d[e];var p=k.range,r=k.x-a.x,u=k.y-a.y,v=ga(r,u),w=v<=p;Infinity===p&&f&&Infinity!==n&&
(w=!1);if(!c||(w?f&&Infinity!==p?v/p<m/n:Infinity===p&&Infinity!==n||v<m:!f&&v<m))Infinity===p&&(w=!0),c=k,m=v,n=p,f=w,g=r,l=u,b.range=p}c?(d=b.snappedX!==c.x||b.snappedY!==c.y,b.snappedX=c.x,b.snappedY=c.y):(d=!0,b.snappedX=NaN,b.snappedY=NaN);b.dx=g;b.dy=l;b.changed=d||f&&!b.locked;b.locked=f;return b},setRestriction:function(a,b){var c=this.target,d=c&&c.options[this.prepared.name].restrict,e=d&&d.restriction;if(!e)return b;b=b||this.restrictStatus;d=b.useStatusXY?d={x:b.x,y:b.y}:d=C({},a);b.snap&&
b.snap.locked&&(d.x+=b.snap.dx||0,d.y+=b.snap.dy||0);d.x-=this.inertiaStatus.resumeDx;d.y-=this.inertiaStatus.resumeDy;b.dx=0;b.dy=0;b.restricted=!1;if(P(e)&&(e="parent"===e?N(this.element):"self"===e?c.getRect(this.element):Ha(this.element,e),!e))return b;x(e)&&(e=e(d.x,d.y,this.element));r(e)&&(e=ta(e));(a=e)?"x"in e&&"y"in e?(c=Math.max(Math.min(a.x+a.width-this.restrictOffset.right,d.x),a.x+this.restrictOffset.left),a=Math.max(Math.min(a.y+a.height-this.restrictOffset.bottom,d.y),a.y+this.restrictOffset.top)):
(c=Math.max(Math.min(a.right-this.restrictOffset.right,d.x),a.left+this.restrictOffset.left),a=Math.max(Math.min(a.bottom-this.restrictOffset.bottom,d.y),a.top+this.restrictOffset.top)):(c=d.x,a=d.y);b.dx=c-d.x;b.dy=a-d.y;b.changed=b.restrictedX!==c||b.restrictedY!==a;b.restricted=!(!b.dx&&!b.dy);b.restrictedX=c;b.restrictedY=a;return b},checkAndPreventDefault:function(a,b,c){if(b=b||this.target){b=b.options;var d=b.preventDefault;"auto"===d&&c&&!/^(input|select|textarea)$/i.test(a.target.nodeName)?
/down|start/i.test(a.type)&&"drag"===this.prepared.name&&"xy"!==b.drag.axis||b[this.prepared.name]&&b[this.prepared.name].manualStart&&!this.interacting()||a.preventDefault():"always"===d&&a.preventDefault()}},calcInertia:function(a){var b=this.target.options[this.prepared.name].inertia,c=b.resistance,d=-Math.log(b.endSpeed/a.v0)/c;a.x0=this.prevEvent.pageX;a.y0=this.prevEvent.pageY;a.t0=a.startEvent.timeStamp/1E3;a.sx=a.sy=0;a.modifiedXe=a.xe=(a.vx0-d)/c;a.modifiedYe=a.ye=(a.vy0-d)/c;a.te=d;a.lambda_v0=
c/a.v0;a.one_ve_v0=1-b.endSpeed/a.v0},autoScrollMove:function(a){var b;if(b=this.interacting()){b=this.prepared.name;var c=this.target.options;/^resize/.test(b)&&(b="resize");b=c[b].autoScroll&&c[b].autoScroll.enabled}if(b)if(this.inertiaStatus.active)g.x=g.y=0;else{var d=this.target.options[this.prepared.name].autoScroll,e=d.container||Y(this.element);if(M(e)){var k=a.clientX<g.margin;b=a.clientY<g.margin;c=a.clientX>e.innerWidth-g.margin;a=a.clientY>e.innerHeight-g.margin}else e=Ca(e),k=a.clientX<
e.left+g.margin,b=a.clientY<e.top+g.margin,c=a.clientX>e.right-g.margin,a=a.clientY>e.bottom-g.margin;g.x=c?1:k?-1:0;g.y=a?1:b?-1:0;g.isScrolling||(g.margin=d.margin,g.speed=d.speed,g.start(this))}},_updateEventTargets:function(a,b){this._eventTarget=a;this._curEventTarget=b}};I.prototype={preventDefault:J,stopImmediatePropagation:function(){this.immediatePropagationStopped=this.propagationStopped=!0},stopPropagation:function(){this.propagationStopped=!0}};for(var l={},ib="dragStart dragMove resizeStart resizeMove gestureStart gestureMove pointerOver pointerOut pointerHover selectorDown pointerDown pointerMove pointerUp pointerCancel pointerEnd addPointer removePointer recordPointer autoScrollMove".split(" "),
Oa=0,Pa=ib.length;Oa<Pa;Oa++){var jb=ib[Oa];l[jb]=$a(jb)}D.indexOfElement=function(a,b){b=b||S;for(var c=0;c<this.length;c++){var d=this[c];if(d.selector===a&&d._context===b||!d.selector&&d._element===a)return c}return-1};D.get=function(a,b){return this[this.indexOfElement(a,b&&b.context)]};D.forEachSelector=function(a){for(var b=0;b<this.length;b++){var c=this[b];if(c.selector&&(c=a(c,c.selector,c._context,b,this),void 0!==c))return c}};E.prototype={setOnEvents:function(a,b){"drop"===a?(x(b.ondrop)&&
(this.ondrop=b.ondrop),x(b.ondropactivate)&&(this.ondropactivate=b.ondropactivate),x(b.ondropdeactivate)&&(this.ondropdeactivate=b.ondropdeactivate),x(b.ondragenter)&&(this.ondragenter=b.ondragenter),x(b.ondragleave)&&(this.ondragleave=b.ondragleave),x(b.ondropmove)&&(this.ondropmove=b.ondropmove)):(a="on"+a,x(b.onstart)&&(this[a+"start"]=b.onstart),x(b.onmove)&&(this[a+"move"]=b.onmove),x(b.onend)&&(this[a+"end"]=b.onend),x(b.oninertiastart)&&(this[a+"inertiastart"]=b.oninertiastart));return this},
draggable:function(a){return u(a)?(this.options.drag.enabled=!1===a.enabled?!1:!0,this.setPerAction("drag",a),this.setOnEvents("drag",a),/^x$|^y$|^xy$/.test(a.axis)?this.options.drag.axis=a.axis:null===a.axis&&delete this.options.drag.axis,this):K(a)?(this.options.drag.enabled=a,this):this.options.drag},setPerAction:function(a,b){for(var c in b)c in H[a]&&(u(b[c])?(this.options[a][c]=C(this.options[a][c]||{},b[c]),u(H.perAction[c])&&"enabled"in H.perAction[c]&&(this.options[a][c].enabled=!1===b[c].enabled?
!1:!0)):K(b[c])&&u(H.perAction[c])?this.options[a][c].enabled=b[c]:void 0!==b[c]&&(this.options[a][c]=b[c]))},dropzone:function(a){return u(a)?(this.options.drop.enabled=!1===a.enabled?!1:!0,this.setOnEvents("drop",a),/^(pointer|center)$/.test(a.overlap)?this.options.drop.overlap=a.overlap:F(a.overlap)&&(this.options.drop.overlap=Math.max(Math.min(1,a.overlap),0)),"accept"in a&&(this.options.drop.accept=a.accept),"checker"in a&&(this.options.drop.checker=a.checker),this):K(a)?(this.options.drop.enabled=
a,this):this.options.drop},dropCheck:function(a,b,c,d,e,k){var h=!1;if(!(k=k||this.getRect(e)))return this.options.drop.checker?this.options.drop.checker(a,b,h,this,e,c,d):!1;var f=this.options.drop.overlap;if("pointer"===f){var g=Aa(a),h=na(c,d);g.x+=h.x;g.y+=h.y;h=g.x>k.left&&g.x<k.right;g=g.y>k.top&&g.y<k.bottom;h=h&&g}g=c.getRect(d);if("center"===f)var h=g.left+g.width/2,l=g.top+g.height/2,h=h>=k.left&&h<=k.right&&l>=k.top&&l<=k.bottom;F(f)&&(h=Math.max(0,Math.min(k.right,g.right)-Math.max(k.left,
g.left))*Math.max(0,Math.min(k.bottom,g.bottom)-Math.max(k.top,g.top))/(g.width*g.height)>=f);this.options.drop.checker&&(h=this.options.drop.checker(a,b,h,this,e,c,d));return h},dropChecker:function(a){return x(a)?(this.options.drop.checker=a,this):null===a?(delete this.options.getRect,this):this.options.drop.checker},accept:function(a){return r(a)||fa(a)?(this.options.drop.accept=a,this):null===a?(delete this.options.drop.accept,this):this.options.drop.accept},resizable:function(a){return u(a)?
(this.options.resize.enabled=!1===a.enabled?!1:!0,this.setPerAction("resize",a),this.setOnEvents("resize",a),/^x$|^y$|^xy$/.test(a.axis)?this.options.resize.axis=a.axis:null===a.axis&&(this.options.resize.axis=H.resize.axis),K(a.preserveAspectRatio)?this.options.resize.preserveAspectRatio=a.preserveAspectRatio:K(a.square)&&(this.options.resize.square=a.square),this):K(a)?(this.options.resize.enabled=a,this):this.options.resize},squareResize:function(a){return K(a)?(this.options.resize.square=a,this):
null===a?(delete this.options.resize.square,this):this.options.resize.square},gesturable:function(a){return u(a)?(this.options.gesture.enabled=!1===a.enabled?!1:!0,this.setPerAction("gesture",a),this.setOnEvents("gesture",a),this):K(a)?(this.options.gesture.enabled=a,this):this.options.gesture},autoScroll:function(a){u(a)?a=C({actions:["drag","resize"]},a):K(a)&&(a={actions:["drag","resize"],enabled:a});return this.setOptions("autoScroll",a)},snap:function(a){a=this.setOptions("snap",a);return a===
this?this:a.drag},setOptions:function(a,b){var c=b&&B(b.actions)?b.actions:["drag"],d;if(u(b)||K(b)){for(d=0;d<c.length;d++){var e=/resize/.test(c[d])?"resize":c[d];u(this.options[e])&&(e=this.options[e][a],u(b)?(C(e,b),e.enabled=!1===b.enabled?!1:!0,"snap"===a&&("grid"===e.mode?e.targets=[p.createSnapGrid(C({offset:e.gridOffset||{x:0,y:0}},e.grid||{}))]:"anchor"===e.mode?e.targets=e.anchors:"path"===e.mode&&(e.targets=e.paths),"elementOrigin"in b&&(e.relativePoints=[b.elementOrigin]))):K(b)&&(e.enabled=
b))}return this}b={};c=["drag","resize","gesture"];for(d=0;d<c.length;d++)a in H[c[d]]&&(b[c[d]]=this.options[c[d]][a]);return b},inertia:function(a){a=this.setOptions("inertia",a);return a===this?this:a.drag},getAction:function(a,b,c,d){var e=this.defaultActionChecker(a,c,d);return this.options.actionChecker?this.options.actionChecker(a,b,e,this,d,c):e},defaultActionChecker:db,actionChecker:function(a){return x(a)?(this.options.actionChecker=a,this):null===a?(delete this.options.actionChecker,this):
this.options.actionChecker},getRect:function(a){a=a||this._element;this.selector&&!r(a)&&(a=this._context.querySelector(this.selector));return ta(a)},rectChecker:function(a){return x(a)?(this.getRect=a,this):null===a?(delete this.options.getRect,this):this.getRect},styleCursor:function(a){return K(a)?(this.options.styleCursor=a,this):null===a?(delete this.options.styleCursor,this):this.options.styleCursor},preventDefault:function(a){return/^(always|never|auto)$/.test(a)?(this.options.preventDefault=
a,this):K(a)?(this.options.preventDefault=a?"always":"never",this):this.options.preventDefault},origin:function(a){return fa(a)||u(a)?(this.options.origin=a,this):this.options.origin},deltaSource:function(a){return"page"===a||"client"===a?(this.options.deltaSource=a,this):this.options.deltaSource},restrict:function(a){if(!u(a))return this.setOptions("restrict",a);for(var b=["drag","resize","gesture"],c,d=0;d<b.length;d++){var e=b[d];e in a&&(c=C({actions:[e],restriction:a[e]},a),c=this.setOptions("restrict",
c))}return c},context:function(){return this._context},_context:S,ignoreFrom:function(a){return fa(a)||r(a)?(this.options.ignoreFrom=a,this):this.options.ignoreFrom},allowFrom:function(a){return fa(a)||r(a)?(this.options.allowFrom=a,this):this.options.allowFrom},element:function(){return this._element},fire:function(a){if(!a||!a.type||-1===y(ea,a.type))return this;var b,c="on"+a.type;if(a.type in this._iEvents){var d=this._iEvents[a.type];var e=0;for(b=d.length;e<b&&!a.immediatePropagationStopped;e++)d[e](a)}if(x(this[c]))this[c](a);
if(a.type in X&&(d=X[a.type]))for(e=0,b=d.length;e<b&&!a.immediatePropagationStopped;e++)d[e](a);return this},on:function(a,b,c){var d;P(a)&&-1!==a.search(" ")&&(a=a.trim().split(/ +/));if(B(a)){for(d=0;d<a.length;d++)this.on(a[d],b,c);return this}if(u(a)){for(d in a)this.on(d,a[d],b);return this}"wheel"===a&&(a=hb);c=c?!0:!1;if(-1!==y(ea,a))a in this._iEvents?this._iEvents[a].push(b):this._iEvents[a]=[b];else if(this.selector){if(!R[a])for(R[a]={selectors:[],contexts:[],listeners:[]},d=0;d<ka.length;d++)n.add(ka[d],
a,pa),n.add(ka[d],a,ya,!0);a=R[a];for(d=a.selectors.length-1;0<=d&&(a.selectors[d]!==this.selector||a.contexts[d]!==this._context);d--);-1===d&&(d=a.selectors.length,a.selectors.push(this.selector),a.contexts.push(this._context),a.listeners.push([]));a.listeners[d].push([b,c])}else n.add(this._element,a,b,c);return this},off:function(a,b,c){var d;P(a)&&-1!==a.search(" ")&&(a=a.trim().split(/ +/));if(B(a)){for(d=0;d<a.length;d++)this.off(a[d],b,c);return this}if(u(a)){for(var e in a)this.off(e,a[e],
b);return this}e=-1;c=c?!0:!1;"wheel"===a&&(a=hb);if(-1!==y(ea,a))(c=this._iEvents[a])&&-1!==(e=y(c,b))&&this._iEvents[a].splice(e,1);else if(this.selector){var g=R[a],h=!1;if(!g)return this;for(e=g.selectors.length-1;0<=e;e--)if(g.selectors[e]===this.selector&&g.contexts[e]===this._context){var f=g.listeners[e];for(d=f.length-1;0<=d;d--){var l=f[d][1];if(f[d][0]===b&&l===c){f.splice(d,1);f.length||(g.selectors.splice(e,1),g.contexts.splice(e,1),g.listeners.splice(e,1),n.remove(this._context,a,pa),
n.remove(this._context,a,ya,!0),g.selectors.length||(R[a]=null));h=!0;break}}if(h)break}}else n.remove(this._element,a,b,c);return this},set:function(a){u(a)||(a={});this.options=C({},H.base);var b,c=["drag","drop","resize","gesture"],d=["draggable","dropzone","resizable","gesturable"],e=C(C({},H.perAction),a[g]||{});for(b=0;b<c.length;b++){var g=c[b];this.options[g]=C({},H[g]);this.setPerAction(g,e);this[d[b]](a[g])}g="accept actionChecker allowFrom deltaSource dropChecker ignoreFrom origin preventDefault rectChecker styleCursor".split(" ");
b=0;for(Pa=g.length;b<Pa;b++)if(c=g[b],this.options[c]=H.base[c],c in a)this[c](a[c]);return this},unset:function(){n.remove(this._element,"all");if(P(this.selector))for(var a in R)for(var b=R[a];0<b.selectors.length;){b.selectors[0]===this.selector&&b.contexts[0]===this._context&&(b.selectors.splice(0,1),b.contexts.splice(0,1),b.listeners.splice(0,1),b.selectors.length||(R[a]=null));n.remove(this._context,a,pa);n.remove(this._context,a,ya,!0);break}else n.remove(this,"all"),this.options.styleCursor&&
(this._element.style.cursor="");this.dropzone(!1);D.splice(y(D,this),1);return p}};E.prototype.snap=O(E.prototype.snap,"Interactable#snap is deprecated. See the new documentation for snapping at http://interactjs.io/docs/snapping");E.prototype.restrict=O(E.prototype.restrict,"Interactable#restrict is deprecated. See the new documentation for resticting at http://interactjs.io/docs/restriction");E.prototype.inertia=O(E.prototype.inertia,"Interactable#inertia is deprecated. See the new documentation for inertia at http://interactjs.io/docs/inertia");
E.prototype.autoScroll=O(E.prototype.autoScroll,"Interactable#autoScroll is deprecated. See the new documentation for autoScroll at http://interactjs.io/docs/#autoscroll");E.prototype.squareResize=O(E.prototype.squareResize,"Interactable#squareResize is deprecated. See http://interactjs.io/docs/#resize-square");E.prototype.accept=O(E.prototype.accept,"Interactable#accept is deprecated. use Interactable#dropzone({ accept: target }) instead");E.prototype.dropChecker=O(E.prototype.dropChecker,"Interactable#dropChecker is deprecated. use Interactable#dropzone({ dropChecker: checkerFunction }) instead");
E.prototype.context=O(E.prototype.context,"Interactable#context as a method is deprecated. It will soon be a DOM Node instead");p.isSet=function(a,b){return-1!==D.indexOfElement(a,b&&b.context)};p.on=function(a,b,c){P(a)&&-1!==a.search(" ")&&(a=a.trim().split(/ +/));if(B(a)){for(var d=0;d<a.length;d++)p.on(a[d],b,c);return p}if(u(a)){for(d in a)p.on(d,a[d],b);return p}-1!==y(ea,a)?X[a]?X[a].push(b):X[a]=[b]:n.add(S,a,b,c);return p};p.off=function(a,b,c){P(a)&&-1!==a.search(" ")&&(a=a.trim().split(/ +/));
if(B(a)){for(var d=0;d<a.length;d++)p.off(a[d],b,c);return p}if(u(a)){for(d in a)p.off(d,a[d],b);return p}if(-1===y(ea,a))n.remove(S,a,b,c);else{var e;a in X&&-1!==(e=y(X[a],b))&&X[a].splice(e,1)}return p};p.enableDragging=O(function(a){return null!==a&&void 0!==a?(V.drag=a,p):V.drag},"interact.enableDragging is deprecated and will soon be removed.");p.enableResizing=O(function(a){return null!==a&&void 0!==a?(V.resize=a,p):V.resize},"interact.enableResizing is deprecated and will soon be removed.");
p.enableGesturing=O(function(a){return null!==a&&void 0!==a?(V.gesture=a,p):V.gesture},"interact.enableGesturing is deprecated and will soon be removed.");p.eventTypes=ea;p.debug=function(){var a=w[0]||new wa;return{interactions:w,target:a.target,dragging:a.dragging,resizing:a.resizing,gesturing:a.gesturing,prepared:a.prepared,matches:a.matches,matchElements:a.matchElements,prevCoords:a.prevCoords,startCoords:a.startCoords,pointerIds:a.pointerIds,pointers:a.pointers,addPointer:l.addPointer,removePointer:l.removePointer,
recordPointer:l.recordPointer,snap:a.snapStatus,restrict:a.restrictStatus,inertia:a.inertiaStatus,downTime:a.downTimes[0],downEvent:a.downEvent,downPointer:a.downPointer,prevEvent:a.prevEvent,Interactable:E,interactables:D,pointerIsDown:a.pointerIsDown,defaultOptions:H,defaultActionChecker:db,actionCursors:xa,dragMove:l.dragMove,resizeMove:l.resizeMove,gestureMove:l.gestureMove,pointerUp:l.pointerUp,pointerDown:l.pointerDown,pointerMove:l.pointerMove,pointerHover:l.pointerHover,eventTypes:ea,events:n,
globalEvents:X,delegatedEvents:R,prefixedPropREs:za}};p.getPointerAverage=Va;p.getTouchBBox=Ea;p.getTouchDistance=Fa;p.getTouchAngle=Ga;p.getElementRect=ta;p.getElementClientRect=Ca;p.matchesSelector=T;p.closest=Ha;p.margin=O(function(a){return F(a)?(oa=a,p):oa},"interact.margin is deprecated. Use interact(target).resizable({ margin: number }); instead.");p.supportsTouch=function(){return ha};p.supportsPointerEvent=function(){return U};p.stop=function(a){for(var b=w.length-1;0<=b;b--)w[b].stop(a);
return p};p.dynamicDrop=function(a){return K(a)?(Ma=a,p):Ma};p.pointerMoveTolerance=function(a){return F(a)?(Na=a,this):Na};p.maxInteractions=function(a){return F(a)?(va=a,this):va};p.createSnapGrid=function(a){return function(b,c){var d=0,e=0;u(a.offset)&&(d=a.offset.x,e=a.offset.y);return{x:Math.round((b-d)/a.x)*a.x+d,y:Math.round((c-e)/a.y)*a.y+e,range:a.range}}};eb(S);La in Element.prototype&&x(Element.prototype[La])||(la=function(a,b,c){c=c||a.parentNode.querySelectorAll(b);b=0;for(var d=c.length;b<
d;b++)if(c[b]===a)return!0;return!1});(function(){for(var a=0,b=["ms","moz","webkit","o"],c=0;c<b.length&&!m.requestAnimationFrame;++c)W=m[b[c]+"RequestAnimationFrame"],aa=m[b[c]+"CancelAnimationFrame"]||m[b[c]+"CancelRequestAnimationFrame"];W||(W=function(b){var c=(new Date).getTime(),d=Math.max(0,16-(c-a)),g=setTimeout(function(){b(c+d)},d);a=c+d;return g});aa||(aa=function(a){clearTimeout(a)})})();"undefined"!==typeof exports?("undefined"!==typeof module&&module.exports&&(exports=module.exports=
p),exports.interact=p):"function"===typeof define&&define.amd?define("interact",function(){return p}):m.interact=p}})("undefined"===typeof window?void 0:window);
//# sourceMappingURL=interact.min.js.map

(function() {

    var debug = false;

    var root = this;

    var EXIF = function(obj) {
        if (obj instanceof EXIF) return obj;
        if (!(this instanceof EXIF)) return new EXIF(obj);
        this.EXIFwrapped = obj;
    };

    if (typeof exports !== 'undefined') {
        if (typeof module !== 'undefined' && module.exports) {
            exports = module.exports = EXIF;
        }
        exports.EXIF = EXIF;
    } else {
        root.EXIF = EXIF;
    }

    var ExifTags = EXIF.Tags = {

        // version tags
        0x9000 : "ExifVersion",             // EXIF version
        0xA000 : "FlashpixVersion",         // Flashpix format version

        // colorspace tags
        0xA001 : "ColorSpace",              // Color space information tag

        // image configuration
        0xA002 : "PixelXDimension",         // Valid width of meaningful image
        0xA003 : "PixelYDimension",         // Valid height of meaningful image
        0x9101 : "ComponentsConfiguration", // Information about channels
        0x9102 : "CompressedBitsPerPixel",  // Compressed bits per pixel

        // user information
        0x927C : "MakerNote",               // Any desired information written by the manufacturer
        0x9286 : "UserComment",             // Comments by user

        // related file
        0xA004 : "RelatedSoundFile",        // Name of related sound file

        // date and time
        0x9003 : "DateTimeOriginal",        // Date and time when the original image was generated
        0x9004 : "DateTimeDigitized",       // Date and time when the image was stored digitally
        0x9290 : "SubsecTime",              // Fractions of seconds for DateTime
        0x9291 : "SubsecTimeOriginal",      // Fractions of seconds for DateTimeOriginal
        0x9292 : "SubsecTimeDigitized",     // Fractions of seconds for DateTimeDigitized

        // picture-taking conditions
        0x829A : "ExposureTime",            // Exposure time (in seconds)
        0x829D : "FNumber",                 // F number
        0x8822 : "ExposureProgram",         // Exposure program
        0x8824 : "SpectralSensitivity",     // Spectral sensitivity
        0x8827 : "ISOSpeedRatings",         // ISO speed rating
        0x8828 : "OECF",                    // Optoelectric conversion factor
        0x9201 : "ShutterSpeedValue",       // Shutter speed
        0x9202 : "ApertureValue",           // Lens aperture
        0x9203 : "BrightnessValue",         // Value of brightness
        0x9204 : "ExposureBias",            // Exposure bias
        0x9205 : "MaxApertureValue",        // Smallest F number of lens
        0x9206 : "SubjectDistance",         // Distance to subject in meters
        0x9207 : "MeteringMode",            // Metering mode
        0x9208 : "LightSource",             // Kind of light source
        0x9209 : "Flash",                   // Flash status
        0x9214 : "SubjectArea",             // Location and area of main subject
        0x920A : "FocalLength",             // Focal length of the lens in mm
        0xA20B : "FlashEnergy",             // Strobe energy in BCPS
        0xA20C : "SpatialFrequencyResponse",    //
        0xA20E : "FocalPlaneXResolution",   // Number of pixels in width direction per FocalPlaneResolutionUnit
        0xA20F : "FocalPlaneYResolution",   // Number of pixels in height direction per FocalPlaneResolutionUnit
        0xA210 : "FocalPlaneResolutionUnit",    // Unit for measuring FocalPlaneXResolution and FocalPlaneYResolution
        0xA214 : "SubjectLocation",         // Location of subject in image
        0xA215 : "ExposureIndex",           // Exposure index selected on camera
        0xA217 : "SensingMethod",           // Image sensor type
        0xA300 : "FileSource",              // Image source (3 == DSC)
        0xA301 : "SceneType",               // Scene type (1 == directly photographed)
        0xA302 : "CFAPattern",              // Color filter array geometric pattern
        0xA401 : "CustomRendered",          // Special processing
        0xA402 : "ExposureMode",            // Exposure mode
        0xA403 : "WhiteBalance",            // 1 = auto white balance, 2 = manual
        0xA404 : "DigitalZoomRation",       // Digital zoom ratio
        0xA405 : "FocalLengthIn35mmFilm",   // Equivalent foacl length assuming 35mm film camera (in mm)
        0xA406 : "SceneCaptureType",        // Type of scene
        0xA407 : "GainControl",             // Degree of overall image gain adjustment
        0xA408 : "Contrast",                // Direction of contrast processing applied by camera
        0xA409 : "Saturation",              // Direction of saturation processing applied by camera
        0xA40A : "Sharpness",               // Direction of sharpness processing applied by camera
        0xA40B : "DeviceSettingDescription",    //
        0xA40C : "SubjectDistanceRange",    // Distance to subject

        // other tags
        0xA005 : "InteroperabilityIFDPointer",
        0xA420 : "ImageUniqueID"            // Identifier assigned uniquely to each image
    };

    var TiffTags = EXIF.TiffTags = {
        0x0100 : "ImageWidth",
        0x0101 : "ImageHeight",
        0x8769 : "ExifIFDPointer",
        0x8825 : "GPSInfoIFDPointer",
        0xA005 : "InteroperabilityIFDPointer",
        0x0102 : "BitsPerSample",
        0x0103 : "Compression",
        0x0106 : "PhotometricInterpretation",
        0x0112 : "Orientation",
        0x0115 : "SamplesPerPixel",
        0x011C : "PlanarConfiguration",
        0x0212 : "YCbCrSubSampling",
        0x0213 : "YCbCrPositioning",
        0x011A : "XResolution",
        0x011B : "YResolution",
        0x0128 : "ResolutionUnit",
        0x0111 : "StripOffsets",
        0x0116 : "RowsPerStrip",
        0x0117 : "StripByteCounts",
        0x0201 : "JPEGInterchangeFormat",
        0x0202 : "JPEGInterchangeFormatLength",
        0x012D : "TransferFunction",
        0x013E : "WhitePoint",
        0x013F : "PrimaryChromaticities",
        0x0211 : "YCbCrCoefficients",
        0x0214 : "ReferenceBlackWhite",
        0x0132 : "DateTime",
        0x010E : "ImageDescription",
        0x010F : "Make",
        0x0110 : "Model",
        0x0131 : "Software",
        0x013B : "Artist",
        0x8298 : "Copyright"
    };

    var GPSTags = EXIF.GPSTags = {
        0x0000 : "GPSVersionID",
        0x0001 : "GPSLatitudeRef",
        0x0002 : "GPSLatitude",
        0x0003 : "GPSLongitudeRef",
        0x0004 : "GPSLongitude",
        0x0005 : "GPSAltitudeRef",
        0x0006 : "GPSAltitude",
        0x0007 : "GPSTimeStamp",
        0x0008 : "GPSSatellites",
        0x0009 : "GPSStatus",
        0x000A : "GPSMeasureMode",
        0x000B : "GPSDOP",
        0x000C : "GPSSpeedRef",
        0x000D : "GPSSpeed",
        0x000E : "GPSTrackRef",
        0x000F : "GPSTrack",
        0x0010 : "GPSImgDirectionRef",
        0x0011 : "GPSImgDirection",
        0x0012 : "GPSMapDatum",
        0x0013 : "GPSDestLatitudeRef",
        0x0014 : "GPSDestLatitude",
        0x0015 : "GPSDestLongitudeRef",
        0x0016 : "GPSDestLongitude",
        0x0017 : "GPSDestBearingRef",
        0x0018 : "GPSDestBearing",
        0x0019 : "GPSDestDistanceRef",
        0x001A : "GPSDestDistance",
        0x001B : "GPSProcessingMethod",
        0x001C : "GPSAreaInformation",
        0x001D : "GPSDateStamp",
        0x001E : "GPSDifferential"
    };

     // EXIF 2.3 Spec
    var IFD1Tags = EXIF.IFD1Tags = {
        0x0100: "ImageWidth",
        0x0101: "ImageHeight",
        0x0102: "BitsPerSample",
        0x0103: "Compression",
        0x0106: "PhotometricInterpretation",
        0x0111: "StripOffsets",
        0x0112: "Orientation",
        0x0115: "SamplesPerPixel",
        0x0116: "RowsPerStrip",
        0x0117: "StripByteCounts",
        0x011A: "XResolution",
        0x011B: "YResolution",
        0x011C: "PlanarConfiguration",
        0x0128: "ResolutionUnit",
        0x0201: "JpegIFOffset",    // When image format is JPEG, this value show offset to JPEG data stored.(aka "ThumbnailOffset" or "JPEGInterchangeFormat")
        0x0202: "JpegIFByteCount", // When image format is JPEG, this value shows data size of JPEG image (aka "ThumbnailLength" or "JPEGInterchangeFormatLength")
        0x0211: "YCbCrCoefficients",
        0x0212: "YCbCrSubSampling",
        0x0213: "YCbCrPositioning",
        0x0214: "ReferenceBlackWhite"
    };

    var StringValues = EXIF.StringValues = {
        ExposureProgram : {
            0 : "Not defined",
            1 : "Manual",
            2 : "Normal program",
            3 : "Aperture priority",
            4 : "Shutter priority",
            5 : "Creative program",
            6 : "Action program",
            7 : "Portrait mode",
            8 : "Landscape mode"
        },
        MeteringMode : {
            0 : "Unknown",
            1 : "Average",
            2 : "CenterWeightedAverage",
            3 : "Spot",
            4 : "MultiSpot",
            5 : "Pattern",
            6 : "Partial",
            255 : "Other"
        },
        LightSource : {
            0 : "Unknown",
            1 : "Daylight",
            2 : "Fluorescent",
            3 : "Tungsten (incandescent light)",
            4 : "Flash",
            9 : "Fine weather",
            10 : "Cloudy weather",
            11 : "Shade",
            12 : "Daylight fluorescent (D 5700 - 7100K)",
            13 : "Day white fluorescent (N 4600 - 5400K)",
            14 : "Cool white fluorescent (W 3900 - 4500K)",
            15 : "White fluorescent (WW 3200 - 3700K)",
            17 : "Standard light A",
            18 : "Standard light B",
            19 : "Standard light C",
            20 : "D55",
            21 : "D65",
            22 : "D75",
            23 : "D50",
            24 : "ISO studio tungsten",
            255 : "Other"
        },
        Flash : {
            0x0000 : "Flash did not fire",
            0x0001 : "Flash fired",
            0x0005 : "Strobe return light not detected",
            0x0007 : "Strobe return light detected",
            0x0009 : "Flash fired, compulsory flash mode",
            0x000D : "Flash fired, compulsory flash mode, return light not detected",
            0x000F : "Flash fired, compulsory flash mode, return light detected",
            0x0010 : "Flash did not fire, compulsory flash mode",
            0x0018 : "Flash did not fire, auto mode",
            0x0019 : "Flash fired, auto mode",
            0x001D : "Flash fired, auto mode, return light not detected",
            0x001F : "Flash fired, auto mode, return light detected",
            0x0020 : "No flash function",
            0x0041 : "Flash fired, red-eye reduction mode",
            0x0045 : "Flash fired, red-eye reduction mode, return light not detected",
            0x0047 : "Flash fired, red-eye reduction mode, return light detected",
            0x0049 : "Flash fired, compulsory flash mode, red-eye reduction mode",
            0x004D : "Flash fired, compulsory flash mode, red-eye reduction mode, return light not detected",
            0x004F : "Flash fired, compulsory flash mode, red-eye reduction mode, return light detected",
            0x0059 : "Flash fired, auto mode, red-eye reduction mode",
            0x005D : "Flash fired, auto mode, return light not detected, red-eye reduction mode",
            0x005F : "Flash fired, auto mode, return light detected, red-eye reduction mode"
        },
        SensingMethod : {
            1 : "Not defined",
            2 : "One-chip color area sensor",
            3 : "Two-chip color area sensor",
            4 : "Three-chip color area sensor",
            5 : "Color sequential area sensor",
            7 : "Trilinear sensor",
            8 : "Color sequential linear sensor"
        },
        SceneCaptureType : {
            0 : "Standard",
            1 : "Landscape",
            2 : "Portrait",
            3 : "Night scene"
        },
        SceneType : {
            1 : "Directly photographed"
        },
        CustomRendered : {
            0 : "Normal process",
            1 : "Custom process"
        },
        WhiteBalance : {
            0 : "Auto white balance",
            1 : "Manual white balance"
        },
        GainControl : {
            0 : "None",
            1 : "Low gain up",
            2 : "High gain up",
            3 : "Low gain down",
            4 : "High gain down"
        },
        Contrast : {
            0 : "Normal",
            1 : "Soft",
            2 : "Hard"
        },
        Saturation : {
            0 : "Normal",
            1 : "Low saturation",
            2 : "High saturation"
        },
        Sharpness : {
            0 : "Normal",
            1 : "Soft",
            2 : "Hard"
        },
        SubjectDistanceRange : {
            0 : "Unknown",
            1 : "Macro",
            2 : "Close view",
            3 : "Distant view"
        },
        FileSource : {
            3 : "DSC"
        },

        Components : {
            0 : "",
            1 : "Y",
            2 : "Cb",
            3 : "Cr",
            4 : "R",
            5 : "G",
            6 : "B"
        }
    };

    function addEvent(element, event, handler) {
        if (element.addEventListener) {
            element.addEventListener(event, handler, false);
        } else if (element.attachEvent) {
            element.attachEvent("on" + event, handler);
        }
    }

    function imageHasData(img) {
        return !!(img.exifdata);
    }


    function base64ToArrayBuffer(base64, contentType) {
        contentType = contentType || base64.match(/^data\:([^\;]+)\;base64,/mi)[1] || ''; // e.g. 'data:image/jpeg;base64,...' => 'image/jpeg'
        base64 = base64.replace(/^data\:([^\;]+)\;base64,/gmi, '');
        var binary = atob(base64);
        var len = binary.length;
        var buffer = new ArrayBuffer(len);
        var view = new Uint8Array(buffer);
        for (var i = 0; i < len; i++) {
            view[i] = binary.charCodeAt(i);
        }
        return buffer;
    }

    function objectURLToBlob(url, callback) {
        var http = new XMLHttpRequest();
        http.open("GET", url, true);
        http.responseType = "blob";
        http.onload = function(e) {
            if (this.status == 200 || this.status === 0) {
                callback(this.response);
            }
        };
        http.send();
    }

    function getImageData(img, callback) {
        function handleBinaryFile(binFile) {
            var data = findEXIFinJPEG(binFile);
            img.exifdata = data || {};
            var iptcdata = findIPTCinJPEG(binFile);
            img.iptcdata = iptcdata || {};
            if (EXIF.isXmpEnabled) {
               var xmpdata= findXMPinJPEG(binFile);
               img.xmpdata = xmpdata || {};               
            }
            if (callback) {
                callback.call(img);
            }
        }

        if (img.src) {
            if (/^data\:/i.test(img.src)) { // Data URI
                var arrayBuffer = base64ToArrayBuffer(img.src);
                handleBinaryFile(arrayBuffer);

            } else if (/^blob\:/i.test(img.src)) { // Object URL
                var fileReader = new FileReader();
                fileReader.onload = function(e) {
                    handleBinaryFile(e.target.result);
                };
                objectURLToBlob(img.src, function (blob) {
                    fileReader.readAsArrayBuffer(blob);
                });
            } else {
                var http = new XMLHttpRequest();
                http.onload = function() {
                    if (this.status == 200 || this.status === 0) {
                        handleBinaryFile(http.response);
                    } else {
                        throw "Could not load image";
                    }
                    http = null;
                };
                http.open("GET", img.src, true);
                http.responseType = "arraybuffer";
                http.send(null);
            }
        } else if (self.FileReader && (img instanceof self.Blob || img instanceof self.File)) {
            var fileReader = new FileReader();
            fileReader.onload = function(e) {
                if (debug) console.log("Got file of length " + e.target.result.byteLength);
                handleBinaryFile(e.target.result);
            };

            fileReader.readAsArrayBuffer(img);
        }
    }

    function findEXIFinJPEG(file) {
        var dataView = new DataView(file);

        if (debug) console.log("Got file of length " + file.byteLength);
        if ((dataView.getUint8(0) != 0xFF) || (dataView.getUint8(1) != 0xD8)) {
            if (debug) console.log("Not a valid JPEG");
            return false; // not a valid jpeg
        }

        var offset = 2,
            length = file.byteLength,
            marker;

        while (offset < length) {
            if (dataView.getUint8(offset) != 0xFF) {
                if (debug) console.log("Not a valid marker at offset " + offset + ", found: " + dataView.getUint8(offset));
                return false; // not a valid marker, something is wrong
            }

            marker = dataView.getUint8(offset + 1);
            if (debug) console.log(marker);

            // we could implement handling for other markers here,
            // but we're only looking for 0xFFE1 for EXIF data

            if (marker == 225) {
                if (debug) console.log("Found 0xFFE1 marker");

                return readEXIFData(dataView, offset + 4, dataView.getUint16(offset + 2) - 2);

                // offset += 2 + file.getShortAt(offset+2, true);

            } else {
                offset += 2 + dataView.getUint16(offset+2);
            }

        }

    }

    function findIPTCinJPEG(file) {
        var dataView = new DataView(file);

        if (debug) console.log("Got file of length " + file.byteLength);
        if ((dataView.getUint8(0) != 0xFF) || (dataView.getUint8(1) != 0xD8)) {
            if (debug) console.log("Not a valid JPEG");
            return false; // not a valid jpeg
        }

        var offset = 2,
            length = file.byteLength;


        var isFieldSegmentStart = function(dataView, offset){
            return (
                dataView.getUint8(offset) === 0x38 &&
                dataView.getUint8(offset+1) === 0x42 &&
                dataView.getUint8(offset+2) === 0x49 &&
                dataView.getUint8(offset+3) === 0x4D &&
                dataView.getUint8(offset+4) === 0x04 &&
                dataView.getUint8(offset+5) === 0x04
            );
        };

        while (offset < length) {

            if ( isFieldSegmentStart(dataView, offset )){

                // Get the length of the name header (which is padded to an even number of bytes)
                var nameHeaderLength = dataView.getUint8(offset+7);
                if(nameHeaderLength % 2 !== 0) nameHeaderLength += 1;
                // Check for pre photoshop 6 format
                if(nameHeaderLength === 0) {
                    // Always 4
                    nameHeaderLength = 4;
                }

                var startOffset = offset + 8 + nameHeaderLength;
                var sectionLength = dataView.getUint16(offset + 6 + nameHeaderLength);

                return readIPTCData(file, startOffset, sectionLength);

                break;

            }


            // Not the marker, continue searching
            offset++;

        }

    }
    var IptcFieldMap = {
        0x78 : 'caption',
        0x6E : 'credit',
        0x19 : 'keywords',
        0x37 : 'dateCreated',
        0x50 : 'byline',
        0x55 : 'bylineTitle',
        0x7A : 'captionWriter',
        0x69 : 'headline',
        0x74 : 'copyright',
        0x0F : 'category'
    };
    function readIPTCData(file, startOffset, sectionLength){
        var dataView = new DataView(file);
        var data = {};
        var fieldValue, fieldName, dataSize, segmentType, segmentSize;
        var segmentStartPos = startOffset;
        while(segmentStartPos < startOffset+sectionLength) {
            if(dataView.getUint8(segmentStartPos) === 0x1C && dataView.getUint8(segmentStartPos+1) === 0x02){
                segmentType = dataView.getUint8(segmentStartPos+2);
                if(segmentType in IptcFieldMap) {
                    dataSize = dataView.getInt16(segmentStartPos+3);
                    segmentSize = dataSize + 5;
                    fieldName = IptcFieldMap[segmentType];
                    fieldValue = getStringFromDB(dataView, segmentStartPos+5, dataSize);
                    // Check if we already stored a value with this name
                    if(data.hasOwnProperty(fieldName)) {
                        // Value already stored with this name, create multivalue field
                        if(data[fieldName] instanceof Array) {
                            data[fieldName].push(fieldValue);
                        }
                        else {
                            data[fieldName] = [data[fieldName], fieldValue];
                        }
                    }
                    else {
                        data[fieldName] = fieldValue;
                    }
                }

            }
            segmentStartPos++;
        }
        return data;
    }



    function readTags(file, tiffStart, dirStart, strings, bigEnd) {
        var entries = file.getUint16(dirStart, !bigEnd),
            tags = {},
            entryOffset, tag,
            i;

        for (i=0;i<entries;i++) {
            entryOffset = dirStart + i*12 + 2;
            tag = strings[file.getUint16(entryOffset, !bigEnd)];
            if (!tag && debug) console.log("Unknown tag: " + file.getUint16(entryOffset, !bigEnd));
            tags[tag] = readTagValue(file, entryOffset, tiffStart, dirStart, bigEnd);
        }
        return tags;
    }


    function readTagValue(file, entryOffset, tiffStart, dirStart, bigEnd) {
        var type = file.getUint16(entryOffset+2, !bigEnd),
            numValues = file.getUint32(entryOffset+4, !bigEnd),
            valueOffset = file.getUint32(entryOffset+8, !bigEnd) + tiffStart,
            offset,
            vals, val, n,
            numerator, denominator;

        switch (type) {
            case 1: // byte, 8-bit unsigned int
            case 7: // undefined, 8-bit byte, value depending on field
                if (numValues == 1) {
                    return file.getUint8(entryOffset + 8, !bigEnd);
                } else {
                    offset = numValues > 4 ? valueOffset : (entryOffset + 8);
                    vals = [];
                    for (n=0;n<numValues;n++) {
                        vals[n] = file.getUint8(offset + n);
                    }
                    return vals;
                }

            case 2: // ascii, 8-bit byte
                offset = numValues > 4 ? valueOffset : (entryOffset + 8);
                return getStringFromDB(file, offset, numValues-1);

            case 3: // short, 16 bit int
                if (numValues == 1) {
                    return file.getUint16(entryOffset + 8, !bigEnd);
                } else {
                    offset = numValues > 2 ? valueOffset : (entryOffset + 8);
                    vals = [];
                    for (n=0;n<numValues;n++) {
                        vals[n] = file.getUint16(offset + 2*n, !bigEnd);
                    }
                    return vals;
                }

            case 4: // long, 32 bit int
                if (numValues == 1) {
                    return file.getUint32(entryOffset + 8, !bigEnd);
                } else {
                    vals = [];
                    for (n=0;n<numValues;n++) {
                        vals[n] = file.getUint32(valueOffset + 4*n, !bigEnd);
                    }
                    return vals;
                }

            case 5:    // rational = two long values, first is numerator, second is denominator
                if (numValues == 1) {
                    numerator = file.getUint32(valueOffset, !bigEnd);
                    denominator = file.getUint32(valueOffset+4, !bigEnd);
                    val = new Number(numerator / denominator);
                    val.numerator = numerator;
                    val.denominator = denominator;
                    return val;
                } else {
                    vals = [];
                    for (n=0;n<numValues;n++) {
                        numerator = file.getUint32(valueOffset + 8*n, !bigEnd);
                        denominator = file.getUint32(valueOffset+4 + 8*n, !bigEnd);
                        vals[n] = new Number(numerator / denominator);
                        vals[n].numerator = numerator;
                        vals[n].denominator = denominator;
                    }
                    return vals;
                }

            case 9: // slong, 32 bit signed int
                if (numValues == 1) {
                    return file.getInt32(entryOffset + 8, !bigEnd);
                } else {
                    vals = [];
                    for (n=0;n<numValues;n++) {
                        vals[n] = file.getInt32(valueOffset + 4*n, !bigEnd);
                    }
                    return vals;
                }

            case 10: // signed rational, two slongs, first is numerator, second is denominator
                if (numValues == 1) {
                    return file.getInt32(valueOffset, !bigEnd) / file.getInt32(valueOffset+4, !bigEnd);
                } else {
                    vals = [];
                    for (n=0;n<numValues;n++) {
                        vals[n] = file.getInt32(valueOffset + 8*n, !bigEnd) / file.getInt32(valueOffset+4 + 8*n, !bigEnd);
                    }
                    return vals;
                }
        }
    }

    /**
    * Given an IFD (Image File Directory) start offset
    * returns an offset to next IFD or 0 if it's the last IFD.
    */
    function getNextIFDOffset(dataView, dirStart, bigEnd){
        //the first 2bytes means the number of directory entries contains in this IFD
        var entries = dataView.getUint16(dirStart, !bigEnd);

        // After last directory entry, there is a 4bytes of data,
        // it means an offset to next IFD.
        // If its value is '0x00000000', it means this is the last IFD and there is no linked IFD.

        return dataView.getUint32(dirStart + 2 + entries * 12, !bigEnd); // each entry is 12 bytes long
    }

    function readThumbnailImage(dataView, tiffStart, firstIFDOffset, bigEnd){
        // get the IFD1 offset
        var IFD1OffsetPointer = getNextIFDOffset(dataView, tiffStart+firstIFDOffset, bigEnd);

        if (!IFD1OffsetPointer) {
            // console.log('******** IFD1Offset is empty, image thumb not found ********');
            return {};
        }
        else if (IFD1OffsetPointer > dataView.byteLength) { // this should not happen
            // console.log('******** IFD1Offset is outside the bounds of the DataView ********');
            return {};
        }
        // console.log('*******  thumbnail IFD offset (IFD1) is: %s', IFD1OffsetPointer);

        var thumbTags = readTags(dataView, tiffStart, tiffStart + IFD1OffsetPointer, IFD1Tags, bigEnd)

        // EXIF 2.3 specification for JPEG format thumbnail

        // If the value of Compression(0x0103) Tag in IFD1 is '6', thumbnail image format is JPEG.
        // Most of Exif image uses JPEG format for thumbnail. In that case, you can get offset of thumbnail
        // by JpegIFOffset(0x0201) Tag in IFD1, size of thumbnail by JpegIFByteCount(0x0202) Tag.
        // Data format is ordinary JPEG format, starts from 0xFFD8 and ends by 0xFFD9. It seems that
        // JPEG format and 160x120pixels of size are recommended thumbnail format for Exif2.1 or later.

        if (thumbTags['Compression']) {
            // console.log('Thumbnail image found!');

            switch (thumbTags['Compression']) {
                case 6:
                    // console.log('Thumbnail image format is JPEG');
                    if (thumbTags.JpegIFOffset && thumbTags.JpegIFByteCount) {
                    // extract the thumbnail
                        var tOffset = tiffStart + thumbTags.JpegIFOffset;
                        var tLength = thumbTags.JpegIFByteCount;
                        thumbTags['blob'] = new Blob([new Uint8Array(dataView.buffer, tOffset, tLength)], {
                            type: 'image/jpeg'
                        });
                    }
                break;

            case 1:
                console.log("Thumbnail image format is TIFF, which is not implemented.");
                break;
            default:
                console.log("Unknown thumbnail image format '%s'", thumbTags['Compression']);
            }
        }
        else if (thumbTags['PhotometricInterpretation'] == 2) {
            console.log("Thumbnail image format is RGB, which is not implemented.");
        }
        return thumbTags;
    }

    function getStringFromDB(buffer, start, length) {
        var outstr = "";
        for (n = start; n < start+length; n++) {
            outstr += String.fromCharCode(buffer.getUint8(n));
        }
        return outstr;
    }

    function readEXIFData(file, start) {
        if (getStringFromDB(file, start, 4) != "Exif") {
            if (debug) console.log("Not valid EXIF data! " + getStringFromDB(file, start, 4));
            return false;
        }

        var bigEnd,
            tags, tag,
            exifData, gpsData,
            tiffOffset = start + 6;

        // test for TIFF validity and endianness
        if (file.getUint16(tiffOffset) == 0x4949) {
            bigEnd = false;
        } else if (file.getUint16(tiffOffset) == 0x4D4D) {
            bigEnd = true;
        } else {
            if (debug) console.log("Not valid TIFF data! (no 0x4949 or 0x4D4D)");
            return false;
        }

        if (file.getUint16(tiffOffset+2, !bigEnd) != 0x002A) {
            if (debug) console.log("Not valid TIFF data! (no 0x002A)");
            return false;
        }

        var firstIFDOffset = file.getUint32(tiffOffset+4, !bigEnd);

        if (firstIFDOffset < 0x00000008) {
            if (debug) console.log("Not valid TIFF data! (First offset less than 8)", file.getUint32(tiffOffset+4, !bigEnd));
            return false;
        }

        tags = readTags(file, tiffOffset, tiffOffset + firstIFDOffset, TiffTags, bigEnd);

        if (tags.ExifIFDPointer) {
            exifData = readTags(file, tiffOffset, tiffOffset + tags.ExifIFDPointer, ExifTags, bigEnd);
            for (tag in exifData) {
                switch (tag) {
                    case "LightSource" :
                    case "Flash" :
                    case "MeteringMode" :
                    case "ExposureProgram" :
                    case "SensingMethod" :
                    case "SceneCaptureType" :
                    case "SceneType" :
                    case "CustomRendered" :
                    case "WhiteBalance" :
                    case "GainControl" :
                    case "Contrast" :
                    case "Saturation" :
                    case "Sharpness" :
                    case "SubjectDistanceRange" :
                    case "FileSource" :
                        exifData[tag] = StringValues[tag][exifData[tag]];
                        break;

                    case "ExifVersion" :
                    case "FlashpixVersion" :
                        exifData[tag] = String.fromCharCode(exifData[tag][0], exifData[tag][1], exifData[tag][2], exifData[tag][3]);
                        break;

                    case "ComponentsConfiguration" :
                        exifData[tag] =
                            StringValues.Components[exifData[tag][0]] +
                            StringValues.Components[exifData[tag][1]] +
                            StringValues.Components[exifData[tag][2]] +
                            StringValues.Components[exifData[tag][3]];
                        break;
                }
                tags[tag] = exifData[tag];
            }
        }

        if (tags.GPSInfoIFDPointer) {
            gpsData = readTags(file, tiffOffset, tiffOffset + tags.GPSInfoIFDPointer, GPSTags, bigEnd);
            for (tag in gpsData) {
                switch (tag) {
                    case "GPSVersionID" :
                        gpsData[tag] = gpsData[tag][0] +
                            "." + gpsData[tag][1] +
                            "." + gpsData[tag][2] +
                            "." + gpsData[tag][3];
                        break;
                }
                tags[tag] = gpsData[tag];
            }
        }

        // extract thumbnail
        tags['thumbnail'] = readThumbnailImage(file, tiffOffset, firstIFDOffset, bigEnd);

        return tags;
    }

   function findXMPinJPEG(file) {

        if (!('DOMParser' in self)) {
            // console.warn('XML parsing not supported without DOMParser');
            return;
        }
        var dataView = new DataView(file);

        if (debug) console.log("Got file of length " + file.byteLength);
        if ((dataView.getUint8(0) != 0xFF) || (dataView.getUint8(1) != 0xD8)) {
           if (debug) console.log("Not a valid JPEG");
           return false; // not a valid jpeg
        }

        var offset = 2,
            length = file.byteLength,
            dom = new DOMParser();

        while (offset < (length-4)) {
            if (getStringFromDB(dataView, offset, 4) == "http") {
                var startOffset = offset - 1;
                var sectionLength = dataView.getUint16(offset - 2) - 1;
                var xmpString = getStringFromDB(dataView, startOffset, sectionLength)
                var xmpEndIndex = xmpString.indexOf('xmpmeta>') + 8;
                xmpString = xmpString.substring( xmpString.indexOf( '<x:xmpmeta' ), xmpEndIndex );

                var indexOfXmp = xmpString.indexOf('x:xmpmeta') + 10
                //Many custom written programs embed xmp/xml without any namespace. Following are some of them.
                //Without these namespaces, XML is thought to be invalid by parsers
                xmpString = xmpString.slice(0, indexOfXmp)
                            + 'xmlns:Iptc4xmpCore="http://iptc.org/std/Iptc4xmpCore/1.0/xmlns/" '
                            + 'xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" '
                            + 'xmlns:tiff="http://ns.adobe.com/tiff/1.0/" '
                            + 'xmlns:plus="http://schemas.android.com/apk/lib/com.google.android.gms.plus" '
                            + 'xmlns:ext="http://www.gettyimages.com/xsltExtension/1.0" '
                            + 'xmlns:exif="http://ns.adobe.com/exif/1.0/" '
                            + 'xmlns:stEvt="http://ns.adobe.com/xap/1.0/sType/ResourceEvent#" '
                            + 'xmlns:stRef="http://ns.adobe.com/xap/1.0/sType/ResourceRef#" '
                            + 'xmlns:crs="http://ns.adobe.com/camera-raw-settings/1.0/" '
                            + 'xmlns:xapGImg="http://ns.adobe.com/xap/1.0/g/img/" '
                            + 'xmlns:Iptc4xmpExt="http://iptc.org/std/Iptc4xmpExt/2008-02-29/" '
                            + xmpString.slice(indexOfXmp)

                var domDocument = dom.parseFromString( xmpString, 'text/xml' );
                return xml2Object(domDocument);
            } else{
             offset++;
            }
        }
    }

    function xml2json(xml) {
        var json = {};
      
        if (xml.nodeType == 1) { // element node
          if (xml.attributes.length > 0) {
            json['@attributes'] = {};
            for (var j = 0; j < xml.attributes.length; j++) {
              var attribute = xml.attributes.item(j);
              json['@attributes'][attribute.nodeName] = attribute.nodeValue;
            }
          }
        } else if (xml.nodeType == 3) { // text node
          return xml.nodeValue;
        }
      
        // deal with children
        if (xml.hasChildNodes()) {
          for(var i = 0; i < xml.childNodes.length; i++) {
            var child = xml.childNodes.item(i);
            var nodeName = child.nodeName;
            if (json[nodeName] == null) {
              json[nodeName] = xml2json(child);
            } else {
              if (json[nodeName].push == null) {
                var old = json[nodeName];
                json[nodeName] = [];
                json[nodeName].push(old);
              }
              json[nodeName].push(xml2json(child));
            }
          }
        }
        
        return json;
    }

    function xml2Object(xml) {
        try {
            var obj = {};
            if (xml.children.length > 0) {
              for (var i = 0; i < xml.children.length; i++) {
                var item = xml.children.item(i);
                var attributes = item.attributes;
                for(var idx in attributes) {
                    var itemAtt = attributes[idx];
                    var dataKey = itemAtt.nodeName;
                    var dataValue = itemAtt.nodeValue;

                    if(dataKey !== undefined) {
                        obj[dataKey] = dataValue;
                    }
                }
                var nodeName = item.nodeName;

                if (typeof (obj[nodeName]) == "undefined") {
                  obj[nodeName] = xml2json(item);
                } else {
                  if (typeof (obj[nodeName].push) == "undefined") {
                    var old = obj[nodeName];

                    obj[nodeName] = [];
                    obj[nodeName].push(old);
                  }
                  obj[nodeName].push(xml2json(item));
                }
              }
            } else {
              obj = xml.textContent;
            }
            return obj;
          } catch (e) {
              console.log(e.message);
          }
    }

    EXIF.enableXmp = function() {
        EXIF.isXmpEnabled = true;
    }

    EXIF.disableXmp = function() {
        EXIF.isXmpEnabled = false;
    }

    EXIF.getData = function(img, callback) {
        if (((self.Image && img instanceof self.Image)
            || (self.HTMLImageElement && img instanceof self.HTMLImageElement))
            && !img.complete)
            return false;

        if (!imageHasData(img)) {
            getImageData(img, callback);
        } else {
            if (callback) {
                callback.call(img);
            }
        }
        return true;
    }

    EXIF.getTag = function(img, tag) {
        if (!imageHasData(img)) return;
        return img.exifdata[tag];
    }
    
    EXIF.getIptcTag = function(img, tag) {
        if (!imageHasData(img)) return;
        return img.iptcdata[tag];
    }

    EXIF.getAllTags = function(img) {
        if (!imageHasData(img)) return {};
        var a,
            data = img.exifdata,
            tags = {};
        for (a in data) {
            if (data.hasOwnProperty(a)) {
                tags[a] = data[a];
            }
        }
        return tags;
    }
    
    EXIF.getAllIptcTags = function(img) {
        if (!imageHasData(img)) return {};
        var a,
            data = img.iptcdata,
            tags = {};
        for (a in data) {
            if (data.hasOwnProperty(a)) {
                tags[a] = data[a];
            }
        }
        return tags;
    }

    EXIF.pretty = function(img) {
        if (!imageHasData(img)) return "";
        var a,
            data = img.exifdata,
            strPretty = "";
        for (a in data) {
            if (data.hasOwnProperty(a)) {
                if (typeof data[a] == "object") {
                    if (data[a] instanceof Number) {
                        strPretty += a + " : " + data[a] + " [" + data[a].numerator + "/" + data[a].denominator + "]\r\n";
                    } else {
                        strPretty += a + " : [" + data[a].length + " values]\r\n";
                    }
                } else {
                    strPretty += a + " : " + data[a] + "\r\n";
                }
            }
        }
        return strPretty;
    }

    EXIF.readFromBinaryFile = function(file) {
        return findEXIFinJPEG(file);
    }

    if (typeof define === 'function' && define.amd) {
        define('exif-js', [], function() {
            return EXIF;
        });
    }
}.call(this));

