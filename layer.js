define("requirejs-dplugins/i18n",["./i18n/common","./i18n/build","module"],function(a,b,c){var d,e,f=a.mixin,g=a.eachProp,h=a.parseName,i=a.getMasterMid,j=function(a){var b={};return g(a,function(a,c){c.forEach(function(c){b[c]=a})}),b},k=function(a,b){var c={};return a._pseudoRoot&&(c[b]={},f(c,a._pseudoRoot),delete a._pseudoRoot,f(c[b],a),a=c),a},l=function(b,c,d){var e=i(b);c([e],function(e){var g=function(b,h,i,j){var k=function(c){f(j,c),i=a.getParentLocale(i),!c._flattened&&i?g(b,h,i,j):(j._flattened=!0,d(j))};e[i]===!0||1===e[i]?c([b+i+"/"+h],k):k(e[i]||{})};e=k(e,b.masterLocale),g(b.prefix,b.suffix,b.requestedLocale,{})})},m=function(a,b,c,d,e,f){for(var g=a.requestedLocale,h=c.localesMap[b];g&&h.indexOf(g)<0;)g=d(g);g?(a.masterLocale=g,e([b+"_"+g],function(){o(a,c,e,f)})):(console.log("i18n: no relevant layer "+b+" found for locale "+a.requestedLocale+"."),f())},n=function(a,b,c,d,e,f){var g=function(h){h?e(["maybe!"+b+"_"+h],function(b){b?(a.masterLocale=h,o(a,c,e,f)):g(d(h))}):(console.log("i18n: no relevant layer "+b+" found for locale "+a.requestedLocale+"."),f())};g(a.requestedLocale)},o=function(a,b,c,d){var e=i(a);a.requestedLocale===a.masterLocale||b.layerOnly||!b.enhanceLayer?c([e],function(a){a.root&&(a=a.root),d(a)}):l(a,c,d)};return{load:function(b,e,g,k){if(!b)return void g();k=k||{};var o,p,q={};return f(q,"function"==typeof c.config?c.config()||{}:{}),k.isBuild?(d=q.localesList,void g()):(q.enhanceLayer=void 0===q.enhanceLayer?!0:q.enhanceLayer,b=h(b),b.requestedLocale=b.requestedLocale||a.getLocale(q.locale||k.locale),o=i(b),q.bundlesMap?(q.bundlesMap=j(q.bundlesMap),p=q.bundlesMap[o],!p&&q.layerOnly?(console.log("i18n: module "+o+" not found in layer."),void g()):p?q.languagePack?void n(b,p,q,a.getParentLocale,e,g):void m(b,p,q,a.getParentLocale,e,g):void l(b,e,g)):void l(b,e,g))},write:function(a,c,d){var e,f=h(c);f.requestedLocale?(e=b.resolveSync(f.requestedLocale,f),"root"!==f.requestedLocale&&(e._pseudoRoot={},e._flattened=!0),d.asModule(a+"!"+c,"define("+JSON.stringify(e)+")")):b.addBundleToNlsLayer(f)},writeFile:function(a,b,c,d){e=d},onLayerEnd:function(a,f){if(f.name&&f.path){var g;b.setLocalesList(d),g=b.getLayersContent(),b.writeLayers(g,f,e),b.writeConfig(c.id,f,a)}b.reset()}}}),define("requirejs-dplugins/i18n/build",["./common","require"],function(a,b){var c,d,e=[],f=a.mixin,g=a.eachProp,h=a.getMasterMid,i=function(a){var b;return d||(b=a.name.match(/^(.*\/)?(.*)$/),d=(b[1]||"")+"nls/"+b[2]),d},j=function(a,b){var c=a.path.match(/^(.*\/)?(.*)\.js$/);return(c[1]||"")+"nls/"+c[2]+"_"+b+".js"},k=function(){return c=[],e.forEach(function(a){var d=b(h(a));g(d,function(a){d.loc&&c.indexOf(a)<0&&c.push(a)})}),c},l=function(a,c){return a.root=a.root===!0||1===a.root?b(c.prefix+"root/"+c.suffix):a.root,a},m=function(b){var c={};return g(b,function(b){for(var d=a.getParentLocale(b);d&&"root"!==d;)c[d]=c[d]||{},c[d][b]=!0,d=a.getParentLocale(d)}),c},n=function(c,d,e){var g,i=c,j={};if(2===arguments.length&&(e=l(b(h(d)),d)),"root"!==i){for(;i&&"root"!==i;)e[i]&&(g=b(d.prefix+i+"/"+d.suffix),f(j,g)),i=a.getParentLocale(i);g=e.root,f(j,g)}else f(j,e);return j};return{addBundleToNlsLayer:function(a){e.push(a)},setLocalesList:function(a){c=a?a.slice():k(),c.indexOf("root")<0&&c.push("root")},reset:function(){e=[],c=void 0,d=void 0},getLayersContent:function(){var a={};return e.forEach(function(d){var e=l(b(h(d)),d),f=m(e);c.forEach(function(b){var c=n(b,d,e);a[b]=a[b]||"";var g;"root"!==b?(g=d.prefix+b+"/"+d.suffix,c._flattened=!0,c._pseudoRoot=f[b]||{}):g=d.prefix+d.suffix,a[b]+='define("'+g+'",'+JSON.stringify(c)+");"})}),a},writeLayers:function(a,b,c){g(a,function(a,d){d+="define('"+i(b)+"_"+a+"', true);",c(j(b,a),d)})},writeConfig:function(a,b,d){var f=e.map(h),g=i(b),j={config:{}};j.config[a]={bundlesMap:{},localesMap:{}},j.config[a].bundlesMap[g]=f,j.config[a].localesMap[g]=c,d("require.config("+JSON.stringify(j)+");")},resolveSync:n}}),define("requirejs-dplugins/i18n/common",["./parentLocale"],function(a){var b=/(^.*(?:^|\/)nls\/)([^\/]*)\/?([^\/]*)$/;return{eachProp:function(a,b){var c;for(c in a)a.hasOwnProperty(c)&&b(c,a[c])},getLocale:function(a){return a||(a="undefined"==typeof navigator?"root":navigator.language||navigator.userLanguage||"root"),a.toLowerCase()},getParentLocale:function(b){if(!b||"root"===b)return void 0;if(a[b])return a[b];var c=b.split("-");return c.pop(),c.length>0?c.join("-"):"root"},mixin:function c(a,b,d){var e;for(e in b)!b.hasOwnProperty(e)||a.hasOwnProperty(e)&&!d?"object"==typeof b[e]&&(!a[e]&&b[e]&&(a[e]={}),c(a[e],b[e],d)):a[e]=b[e]},parseName:function(a){var c=a.match(b);return{prefix:c[1],masterLocale:"root",requestedLocale:c[3]?c[2]:null,suffix:c[3]||c[2]}},getMasterMid:function(a){return"root"===a.masterLocale?a.prefix+a.suffix:a.prefix+a.masterLocale+"/"+a.suffix}}}),define("requirejs-dplugins/i18n/parentLocale",{"en-ag":"en-001","en-ai":"en-001","en-bb":"en-001","en-bm":"en-001","en-bs":"en-001","en-bw":"en-001","en-bz":"en-001","en-cc":"en-001","en-ck":"en-001","en-cm":"en-001","en-cx":"en-001","en-dm":"en-001","en-er":"en-001","en-fj":"en-001","en-fm":"en-001","en-gb":"en-001","en-gd":"en-001","en-gh":"en-001","en-gm":"en-001","en-gy":"en-001","en-jm":"en-001","en-ke":"en-001","en-ki":"en-001","en-kn":"en-001","en-ky":"en-001","en-lc":"en-001","en-lr":"en-001","en-ls":"en-001","en-mg":"en-001","en-ms":"en-001","en-mu":"en-001","en-mw":"en-001","en-na":"en-001","en-nf":"en-001","en-ng":"en-001","en-nr":"en-001","en-nu":"en-001","en-pg":"en-001","en-ph":"en-001","en-pn":"en-001","en-pw":"en-001","en-rw":"en-001","en-sb":"en-001","en-sc":"en-001","en-sd":"en-001","en-sl":"en-001","en-ss":"en-001","en-sx":"en-001","en-sz":"en-001","en-tc":"en-001","en-tk":"en-001","en-to":"en-001","en-tt":"en-001","en-tv":"en-001","en-tz":"en-001","en-ug":"en-001","en-vc":"en-001","en-vu":"en-001","en-ws":"en-001","en-za":"en-001","en-zm":"en-001","en-zw":"en-001","en-150":"en-gb","en-au":"en-gb","en-be":"en-gb","en-dg":"en-gb","en-fk":"en-gb","en-gg":"en-gb","en-gi":"en-gb","en-hk":"en-gb","en-ie":"en-gb","en-im":"en-gb","en-in":"en-gb","en-io":"en-gb","en-je":"en-gb","en-mo":"en-gb","en-mt":"en-gb","en-nz":"en-gb","en-pk":"en-gb","en-sg":"en-gb","en-sh":"en-gb","en-vg":"en-gb","es-ar":"es-419","es-bo":"es-419","es-cl":"es-419","es-co":"es-419","es-cr":"es-419","es-cu":"es-419","es-do":"es-419","es-ec":"es-419","es-gt":"es-419","es-hn":"es-419","es-mx":"es-419","es-ni":"es-419","es-pa":"es-419","es-pe":"es-419","es-pr":"es-419","es-py":"es-419","es-sv":"es-419","es-us":"es-419","es-uy":"es-419","es-ve":"es-419","pt-ao":"pt-pt","pt-cv":"pt-pt","pt-gw":"pt-pt","pt-mo":"pt-pt","pt-mz":"pt-pt","pt-st":"pt-pt","pt-tl":"pt-pt","az-cyrl":"root","bs-cyrl":"root","en-dsrt":"root","ha-arab":"root","mn-mong":"root","ms-arab":"root","pa-arab":"root","shi-latn":"root","sr-latn":"root","uz-arab":"root","uz-cyrl":"root","vai-latn":"root","zh-hant":"root","zh-hant-mo":"zh-hant-hk"}),define("requirejs-dplugins/has",["module"],function(a){function b(a,b,c){var d=a.match(/[\?:]|[^:\?]+/g),e=0,f=function(a){var g=d[e++];if(":"===g)return"";if("?"===d[e++]){var h=b(g);return void 0===h&&c?void 0:!a&&h?f():(f(!0),f(a))}return g};return f()}var c=a.config&&a.config()||{},d=function(a){var b=function(){return this}();return"function"==typeof c[a]?c[a]=c[a](b):c[a]};return d.cache=c,d.add=function(a,b,e,f){return("undefined"==typeof c[a]||f)&&(c[a]=b),e&&d(a)},d.normalize=function(a,b){for(var c=a.match(/[\?:]|[^:\?]+/g),d=0;d<c.length;d++)if(":"!==c[d]&&"?"!==c[d]&&"?"!==c[d+1]){var e=c[d].split("!");e[0]=b(e[0]),c[d]=e.join("!")}return c.join("")},d.load=function(a,c,e,f){if(f=f||{},!a||f.isBuild)return void e();var g=b(a,d,f.isBuild);g?c([g],e):e()},d.addModules=function(a,c,e){var f=b(c,d,!0);f&&e([f])},d}),define("decor/sniff",["./features"],function(a){if(a("host-browser")){var b=navigator,c=b.userAgent,d=b.appVersion,e=parseFloat(d),f=parseFloat(c.split("WebKit/")[1])||void 0;if(f){if(a.add("webkit",parseFloat(c.split("WebKit/")[1])||void 0),a.add("chrome",parseFloat(c.split("Chrome/")[1])||void 0),a.add("safari",d.indexOf("Safari")>=0&&!a("chrome")?parseFloat(d.split("Version/")[1]):void 0),c.match(/(iPhone|iPod|iPad)/)){var g=RegExp.$1.replace(/P/,"p"),h=c.match(/OS ([\d_]+)/)?RegExp.$1:"1",i=parseFloat(h.replace(/_/,".").replace(/_/g,""));a.add(g,i),a.add("ios",i)}a.add("android",parseFloat(c.split("Android ")[1])||void 0)}else{var j=0;if(document.all?j=parseFloat(d.split("MSIE ")[1])||void 0:d.indexOf("Trident")&&(j=parseFloat(d.split("rv:")[1])||void 0),j){var k=document.documentMode;k&&Math.floor(j)!==k&&(j=k),a.add("ie",j)}else c.indexOf("Gecko")>=0&&(a.add("mozilla",e),a.add("ff",parseFloat(c.split("Firefox/")[1]||c.split("Minefield/")[1])||void 0))}a.add("mac",d.indexOf("Macintosh")>=0),a.add("msapp",parseFloat(c.split("MSAppHost/")[1])||void 0)}return a}),define("decor/schedule",["./features"],function(a){"use strict";function b(){for(var a=!0;a;){a=!1;for(var b in g){var d=g[b];delete g[b],d(),a=!0}}c=!1}var c,d="_schedule",e=0,f=Math.random()+"",g={},h=a("mutation-observer-api")&&document.createElement("div");return a("mutation-observer-api")?(h.id=0,new MutationObserver(b).observe(h,{attributes:!0})):a("setimmediate-api")||window.addEventListener("message",function(a){a.data===f&&b()}),function(i){var j=d+e++;return g[j]=i,c||(a("mutation-observer-api")?++h.id:a("setimmediate-api")?setImmediate(b):window.postMessage(f,"*"),c=!0),{remove:function(){delete g[j]}}}}),define("decor/features",["requirejs-dplugins/has"],function(a){return a.add("console-api","undefined"!=typeof console),a.add("host-browser","undefined"!=typeof window),a.add("object-observe-api","function"==typeof Object.observe&&"function"==typeof Array.observe),a.add("object-is-api",Object.is),a.add("setimmediate-api","function"==typeof setImmediate),a.add("mutation-observer-api","undefined"!=typeof MutationObserver&&(/\[\s*native\s+code\s*\]/i.test(MutationObserver)||!/^\s*function/.test(MutationObserver))),a.add("polymer-platform","undefined"!=typeof Platform),a}),define("decor/Stateful",["dcl/dcl","./features","./Observable"],function(a,b,c){function d(a){if(f[a])return f[a];var b=a.replace(/^[a-z]|-[a-zA-Z]/g,function(a){return a.charAt(a.length-1).toUpperCase()}),c=f[a]={p:"_"+a+"Attr",s:"_set"+b+"Attr",g:"_get"+b+"Attr"};return c}function e(a,b,d){c.getNotifier(a).notify({type:"update",object:a,name:b+"",oldValue:d})}var f={},g=a(null,{_getProps:function(){var a=[];for(var b in this)"function"==typeof this[b]||/^_/.test(b)||a.push(b);return a},_introspect:function(a){a.forEach(function(a){var b=d(a),c=b.p,e=b.g,f=b.s;c in this||(this[c]=this[a],delete this[a],Object.defineProperty(this,a,{enumerable:!0,set:function(b){f in this?this[f](b):this._set(a,b)},get:function(){return e in this?this[e]():this[c]}}))},this)},constructor:a.advise({before:function(){var a=this.constructor;a._introspected||(a.prototype._introspect(a.prototype._getProps()),a._introspected=!0),c.call(this)},after:function(a){this.processConstructorParameters(a)}}),processConstructorParameters:function(a){a.length&&this.mix(a[0])},mix:function(a){for(var b in a)a.hasOwnProperty(b)&&(this[b]=a[b])},_set:function(a,b){var f=d(a).p,g=this[f];this[f]=b,!c.is(b,g)&&e(this,a,g)},_get:function(a){return this[d(a).p]},notifyCurrentValue:function(a){e(this,a,this[d(a).p])},observe:function(a){var b=new g.PropertyListObserver(this);return b.open(a,this),b}});a.chainAfter(g,"_introspect");var h=/^_(.+)Attr$/;return g.PropertyListObserver=function(a){this.o=a},g.PropertyListObserver.prototype={open:function(a,d){return this._boundCallback=function(c){if(!this._closed&&!this._beingDiscarded){var e={};c.forEach(function(a){b("object-observe-api")&&h.test(a.name)||a.name in e||(e[a.name]=a.oldValue)});for(var f in e){a.call(d,e);break}}}.bind(this),this._h=c.observe(this.o,this._boundCallback),this.o},deliver:function(){this._boundCallback&&c.deliverChangeRecords(this._boundCallback)},discardChanges:function(){return this._beingDiscarded=!0,this._boundCallback&&c.deliverChangeRecords(this._boundCallback),this._beingDiscarded=!1,this.o},setValue:function(){},close:function(){this._h&&(this._h.remove(),this._h=null),this._closed=!0}},g.PropertyListObserver.prototype.remove=g.PropertyListObserver.prototype.close,g}),function(a){"undefined"!=typeof define?define("dcl/dcl",["./mini"],a):"undefined"!=typeof module?module.exports=a(require("./mini")):dcl=a(dcl)}(function(a){"use strict";function b(){}function c(b){return a._mk(b,f)}function d(a,c,d){var e=a||b,f=c||b,g=d||b,h=function(){var a;e.apply(this,arguments);try{a=g.apply(this,arguments)}catch(b){a=b}if(f.call(this,arguments,a),a instanceof Error)throw a;return a};return h.advices={b:a,a:c,f:d},h}function e(b){return function(c,d){var e,f=c._m;f&&(e=+f.w[d]||0,e&&e!=b&&a._e("set chaining",d,c,b,e),f.w[d]=b)}}var f=a(a.Super,{constructor:function(){this.b=this.f.before,this.a=this.f.after,this.f=this.f.around}});return a.mix(a,{Advice:f,advise:c,before:function(b){return a.advise({before:b})},after:function(b){return a.advise({after:b})},around:a.superCall,chainBefore:e(1),chainAfter:e(2),isInstanceOf:function(a,b){if(a instanceof b)return!0;var c,d=a.constructor._m;if(d)for(d=d.b,c=d.length-1;c>=0;--c)if(d[c]===b)return!0;return!1},_sb:function(b,c,e,f){var g=f[e]=a._ec(c,e,"f"),h=a._ec(c,e,"b").reverse(),i=a._ec(c,e,"a");return g=b?a._st(g,1==b?function(b){return a._sc(b.reverse())}:a._sc,e):a._ss(g,e),h.length||i.length?d(a._sc(h),a._sc(i),g):g||function(){}}}),a}),function(a){"undefined"!=typeof define?define("dcl/mini",[],a):"undefined"!=typeof module?module.exports=a():dcl=a()}(function(){"use strict";function a(b,d){var f,g,h,i,j,n,o,p,q,r,s=[0],t=0;if(b)if(b instanceof Array){for(j={},p=b.slice(0).reverse(),q=p.length-1;q>=0;--q)if(g=p[q],g._u=g._u||k++,f=g._m){for(o=f.b,t=o.length-1;t>0;--t)r=o[t]._u,j[r]=(j[r]||0)+1;p[q]=o.slice(0)}else p[q]=[g];n={};a:for(;p.length;){for(q=0;q<p.length;++q)if(o=p[q],g=o[0],r=g._u,!j[r]){n[r]||(s.push(g),n[r]=1),o.shift(),o.length?--j[o[0]._u]:p.splice(q,1);continue a}a._e("cycle",d,p)}b=b[0],t=s.length-((i=b._m)&&b===s[s.length-(t=i.b.length)]?t:1)-1}else b._u=b._u||k++,s=s.concat((i=b._m)?i.b:b);for(f=b?a.delegate(b[m]):{},o=b&&(i=b._m)?a.delegate(i.w):{constructor:2};t>0;--t)if(g=s[t],i=g._m,a.mix(f,i&&i.h||g[m]),i)for(r in p=i.w)o[r]=(+o[r]||0)|p[r];for(r in d)c(i=d[r])?o[r]=+o[r]||0:f[r]=i;return i={b:s,h:d,w:o,c:{}},s[0]={_m:i,prototype:f},e(i,f),h=f[l],h._m=i,h[m]=f,s[0]=h,a._p(h)}function b(a){this.f=a}function c(a){return a&&a.spr instanceof b}function d(a){var b=[];for(var c in a)b.push(c);return b}function e(b,c){var d=b.w,e=b.b,f=b.c;for(var g in d)c[g]=a._sb(d[g],e,g,f)}var f,g,h,i,j,k=0,l="constructor",m="prototype",n={};return(f=function(a,b){for(var c in b)a[c]=b[c]})(a,{mix:f,delegate:function(a){return Object.create(a)},allKeys:d,Super:b,superCall:function(b){return a._mk(b)},_mk:function(a,c){var d=function(){};return d.spr=new(c||b)(a),d},_p:function(a){return a},_e:function(a){throw Error("dcl: "+a)},_f:function(a,b){var c=a.spr.f(b);return c.ctr=a.ctr,c},_ec:g=function(a,b,d){for(var e,f,g=a.length-1,h=[],i="f"==d;e=a[g];--g)((f=e._m)?(f=f.h).hasOwnProperty(b)&&(c(f=f[b])?i?f.spr.f:f=f.spr[d]:i):i&&(f=b==l?e:e[m][b])&&f!==n[b])&&(f.ctr=e,h.push(f));return h},_sc:i=function(a){var b,c=a.length;return c?1==c?(b=a[0],function(){b.apply(this,arguments)}):function(){for(var b=0;c>b;++b)a[b].apply(this,arguments)}:0},_ss:h=function(b,d){for(var e,f=0,g=n[d];e=b[f];++f)g=c(e)?b[f]=a._f(e,g,d):e;return d!=l?g:function(){g.apply(this,arguments)}},_st:j=function(b,d,e){for(var f,g,h=0,i=0;f=b[h];++h)c(f)&&(g=h-i,g=b[h]=a._f(f,g?1==g?b[i]:d(b.slice(i,h)):0,e),i=h);return g=h-i,g?1==g&&e!=l?b[i]:d(i?b.slice(i):b):0},_sb:function(a,b,c,d){var e=d[c]=g(b,c,"f");return(a?j(e,i,c):h(e,c))||function(){}}}),a}),define("decor/Observable",["./features","./features!object-observe-api?:./schedule"],function(a,b){"use strict";var c,d=Object.defineProperty,e=Object.getOwnPropertyDescriptor,f={add:1,update:1,"delete":1,reconfigure:1,setPrototype:1,preventExtensions:1};if(c=function(a){this._observable||d(this,"_observable",{value:1}),a&&c.assign(this,a)},c.test=function(a){return a&&a._observable},c.is=a("object-is-api")?Object.is:function(a,b){return a===b&&(0!==a||1/a===1/b)||a!==a&&b!==b},c.assign=function(a){for(var b="function"==typeof a.set,c=1,d=arguments.length;d>c;++c)for(var e=arguments[c],f=Object.getOwnPropertyNames(e),g=0,h=f.length;h>g;++g){var i=f[g];b?a.set(i,e[i]):a[i]=e[i]}return a},c.canObserve=a("object-observe-api")?function(a){return"object"==typeof a&&null!=a}:c.test,a("object-observe-api"))d(c.prototype,"set",{value:function(a,b){return this[a]=b,b},configurable:!0,writable:!0}),c.observe=function(a,b,c){return Object.observe.call(this,a,b,c),{remove:Object.unobserve.bind(Object,a,b)}},c.getNotifier=Object.getNotifier,c.deliverChangeRecords=Object.deliverChangeRecords;else{d(c.prototype,"set",{value:function(a,b){var d=a in this?"update":"add",f=this[a],g=(e(this,a)||{}).set;if(this[a]=b,!c.is(b,f)&&void 0===g){var h={type:d,object:this,name:a+""};"update"===d&&(h.oldValue=f),c.getNotifier(this).notify(h)}return b},configurable:!0,writable:!0});var g=0,h={},i=null,j=function(){a("polymer-platform")&&Platform.performMicrotaskCheckpoint();for(var b=!0;b;){b=!1;var d=[];for(var e in h)d.push(h[e]);h={},d=d.sort(function(a,b){return a._seq-b._seq});for(var f=0,g=d.length;g>f;++f)d[f]._changeRecords.length>0&&(c.deliverChangeRecords(d[f]),b=!0)}i=null},k=function(a){0===a._changeRecords.length&&0===a._refCountOfNotifier&&(a._seq=void 0)},l=function(a){this.target=a,this.observers={},this._activeChanges={}};l.prototype={notify:function(a){function c(a,b,c){if(c in b){for(var d in b)if(a[d]>0)return!1;return!0}}for(var d in this.observers)if(c(this._activeChanges,this.observers[d].acceptTable,a.type)){var e=this.observers[d].callback;e._changeRecords.push(a),h[e._seq]=e,i||(i=b(j))}},performChange:function(a,b){this._activeChanges[a]=(this._activeChanges[a]||0)+1;var c=b.call(void 0);if(--this._activeChanges[a],c){var d={type:a,object:this.target};for(var e in c)e in d||(d[e]=c[e]);this.notify(d)}}},c.getNotifier=function(a){return e(a,"_notifier")||d(a,"_notifier",{value:new l(a)}),a._notifier},c.observe=function(a,b,d){if(Object(a)!==a)throw new TypeError("Observable.observe() cannot be called on non-object.");"_seq"in b||(b._seq=g++,b._changeRecords=[],b._refCountOfNotifier=0);var e=d?d.reduce(function(a,b){return a[b]=1,a},{}):f,h=c.getNotifier(a);return b._seq in h.observers?h.observers[b._seq].acceptTable=e:(h.observers[b._seq]={acceptTable:e,callback:b},++b._refCountOfNotifier),{remove:function(){b._seq in h.observers&&(delete h.observers[b._seq],--b._refCountOfNotifier)}}},c.deliverChangeRecords=function(b){var c=b._changeRecords.length;try{b(b._changeRecords.splice(0,c))}catch(d){a("console")&&console.error("Error occured in observer callback: "+(d.stack||d))}return k(b),c>0}}return c}),define("decor/Invalidating",["dcl/dcl","./Stateful","./Destroyable"],function(a,b,c){var d=a([b,c],{constructor:a.after(function(){this._initializeInvalidating()}),buildRendering:a.after(function(){this._initializeInvalidating()}),_initializeInvalidating:function(){this.own(this._hComputing=this.observe(function(a){this.computeProperties(a),this.deliverComputing()}),this._hRendering=this.observe(function(a){this.refreshRendering(a)})),this.discardChanges()},deliverComputing:function(){return this._hComputing&&this._hComputing.deliver(),this._hComputing},discardComputing:function(){return this._hComputing&&this._hComputing.discardChanges(),this._hComputing},deliver:function(){return this._hComputing&&this._hComputing.deliver(),this._hRendering&&this._hRendering.deliver(),this._hComputing},discardChanges:function(){return this._hComputing&&this._hComputing.discardChanges(),this._hRendering&&this._hRendering.discardChanges(),this._hComputing},computeProperties:function(){},refreshRendering:function(){}});return a.chainAfter(d,"computeProperties"),a.chainAfter(d,"refreshRendering"),d}),define("decor/Evented",["dcl/dcl","dcl/advise"],function(a,b){return a(null,{on:function(a,c){return b.before(this,"on"+a,c)},emit:function(a){var b="on"+a;if(this[b]){var c=Array.prototype.slice.call(arguments,1);this[b].apply(this,c)}}})}),function(a){"undefined"!=typeof define?define("dcl/advise",[],a):"undefined"!=typeof module?module.exports=a():advise=a()}(function(){"use strict";function a(a,b){this.nb=this.pb=this.na=this.pa=this.nf=this.pf=this,this.i=a,this.n=b}function b(a){var b=function(){var b,c,d=this,e=arguments;for(b=a.pb;b!==a;b=b.pb)b.b.apply(d,e);try{a.pf!==a&&(c=a.pf.f.apply(d,e))}catch(f){c=f}for(b=a.na;b!==a;b=b.na)b.a.call(d,e,c);if(c instanceof Error)throw c;return c};return b.adviceNode=a,b}function c(c,d,e){var f,g=c[d];return g&&g.adviceNode&&g.adviceNode instanceof a?f=g.adviceNode:(f=new a(c,d),g&&g.advices?(g=g.advices,f.a(g.b,g.a,g.f)):f.a(0,0,g),c[d]=b(f)),"function"==typeof e&&(e=e(d,c)),f.a(e.before,e.after,0,e.around)}var d=a.prototype={a:function(b,d,e,f){var g=new a(this.i,this.n);return g.p=this,g.b=b,this._a("b",g),g.a=d,this._a("a",g),g.f=e,this._a("f",g,f),g.o=f,f&&(g.f=c._f(f,g.pf.f,this)),g},_a:function(a,b,c){if(b[a]||c){var d="n"+a,e="p"+a;(b[e]=this[e])[d]=(b[d]=this)[e]=b}},r:function(a){this._r("b",a),this._r("a",a),this._r("f",a)},_r:function(a,b){var c="n"+a,d="p"+a;b[c][d]=b[d],b[d][c]=b[c]},destroy:function(){var a=this.pf.f,b=this.nf,d=this.p;if(this.r(this),b!==this)for(;b!==d;a=b.f,b=b.nf)b.o&&(b.f=c._f(b.o,a,this));this.i=0}};return d.unadvise=d.destroy,c.before=function(a,b,d){return c(a,b,{before:d})},c.after=function(a,b,d){return c(a,b,{after:d})},c.around=function(a,b,d){return c(a,b,{around:d})},c.Node=a,c._f=function(a,b){return a(b)},c}),define("decor/Destroyable",["dcl/advise","dcl/dcl"],function(a,b){var c=b(null,{destroy:b.advise({before:function(){this._beingDestroyed=!0},after:function(){this._destroyed=!0}}),own:function(){var b=["destroy","remove"],c=Array.prototype.slice.call(arguments);return c.forEach(function(c){function d(){f.destroy(),g.forEach(function(a){a.destroy()})}var e,f=a.before(this,"destroy",function(){c[e]()}),g=[];c.then?(e="cancel",c.then(d,d)):b.forEach(function(b){"function"==typeof c[b]&&(e||(e=b),g.push(a.after(c,b,d)))})},this),c},defer:function(a,b){var c=setTimeout(function(){c&&(c=null,this._destroyed||a.call(this))}.bind(this),b||0);return{remove:function(){return c&&(clearTimeout(c),c=null),null}}}});return b.chainBefore(c,"destroy"),c});
//# sourceMappingURL=layer.map