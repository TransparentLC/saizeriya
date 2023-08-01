!function(){const e=document.createElement("link").relList;if(!(e&&e.supports&&e.supports("modulepreload"))){for(const e of document.querySelectorAll('link[rel="modulepreload"]'))i(e);new MutationObserver((e=>{for(const a of e)if("childList"===a.type)for(const e of a.addedNodes)"LINK"===e.tagName&&"modulepreload"===e.rel&&i(e)})).observe(document,{childList:!0,subtree:!0})}function i(e){if(e.ep)return;e.ep=!0;const i=function(e){const i={};return e.integrity&&(i.integrity=e.integrity),e.referrerPolicy&&(i.referrerPolicy=e.referrerPolicy),"use-credentials"===e.crossOrigin?i.credentials="include":"anonymous"===e.crossOrigin?i.credentials="omit":i.credentials="same-origin",i}(e);fetch(e.href,i)}}();var e=Object.defineProperty,i=(i,a,t)=>(((i,a,t)=>{a in i?e(i,a,{enumerable:!0,configurable:!0,writable:!0,value:t}):i[a]=t})(i,"symbol"!=typeof a?a+"":a,t),t);function a(e){if(f(e)){const i={};for(let t=0;t<e.length;t++){const g=e[t],r=u(g)?m(g):a(g);if(r)for(const e in r)i[e]=r[e]}return i}return u(e)||v(e)?e:void 0}const t=/;(?![^(]*\))/g,g=/:(.+)/;function m(e){const i={};return e.split(t).forEach((e=>{if(e){const a=e.split(g);a.length>1&&(i[a[0].trim()]=a[1].trim())}})),i}function r(e){let i="";if(u(e))i=e;else if(f(e))for(let a=0;a<e.length;a++){const t=r(e[a]);t&&(i+=t+" ")}else if(v(e))for(const a in e)e[a]&&(i+=a+" ");return i.trim()}function n(e,i){if(e===i)return!0;let a=d(e),t=d(i);if(a||t)return!(!a||!t)&&e.getTime()===i.getTime();if(a=f(e),t=f(i),a||t)return!(!a||!t)&&function(e,i){if(e.length!==i.length)return!1;let a=!0;for(let t=0;a&&t<e.length;t++)a=n(e[t],i[t]);return a}(e,i);if(a=v(e),t=v(i),a||t){if(!a||!t)return!1;if(Object.keys(e).length!==Object.keys(i).length)return!1;for(const a in e){const t=e.hasOwnProperty(a),g=i.hasOwnProperty(a);if(t&&!g||!t&&g||!n(e[a],i[a]))return!1}}return String(e)===String(i)}function p(e,i){return e.findIndex((e=>n(e,i)))}const c=Object.assign,s={}.hasOwnProperty,o=(e,i)=>s.call(e,i),f=Array.isArray,l=e=>"[object Map]"===w(e),d=e=>e instanceof Date,u=e=>"string"==typeof e,b=e=>"symbol"==typeof e,v=e=>null!==e&&"object"==typeof e,h={}.toString,w=e=>h.call(e),j=e=>w(e).slice(8,-1),y=e=>u(e)&&"NaN"!==e&&"-"!==e[0]&&""+parseInt(e,10)===e,x=e=>{const i=Object.create(null);return a=>i[a]||(i[a]=e(a))},k=/-(\w)/g,_=x((e=>e.replace(k,((e,i)=>i?i.toUpperCase():"")))),$=/\B([A-Z])/g,M=x((e=>e.replace($,"-$1").toLowerCase())),E=e=>{const i=parseFloat(e);return isNaN(i)?e:i};function O(e,i){(i=i||undefined)&&i.active&&i.effects.push(e)}const S=e=>{const i=new Set(e);return i.w=0,i.n=0,i},N=e=>(e.w&I)>0,R=e=>(e.n&I)>0,P=new WeakMap;let A=0,I=1;const C=30,T=[];let L;const B=Symbol(""),q=Symbol("");class F{constructor(e,i=null,a){this.fn=e,this.scheduler=i,this.active=!0,this.deps=[],O(this,a)}run(){if(!this.active)return this.fn();if(!T.includes(this))try{return T.push(L=this),z.push(W),W=!0,I=1<<++A,A<=C?(({deps:e})=>{if(e.length)for(let i=0;i<e.length;i++)e[i].w|=I})(this):K(this),this.fn()}finally{A<=C&&(e=>{const{deps:i}=e;if(i.length){let a=0;for(let t=0;t<i.length;t++){const g=i[t];N(g)&&!R(g)?g.delete(e):i[a++]=g,g.w&=~I,g.n&=~I}i.length=a}})(this),I=1<<--A,D(),T.pop();const e=T.length;L=e>0?T[e-1]:void 0}}stop(){this.active&&(K(this),this.onStop&&this.onStop(),this.active=!1)}}function K(e){const{deps:i}=e;if(i.length){for(let a=0;a<i.length;a++)i[a].delete(e);i.length=0}}function U(e){e.effect.stop()}let W=!0;const z=[];function D(){const e=z.pop();W=void 0===e||e}function V(e,i,a){if(!W||void 0===L)return;let t=P.get(e);t||P.set(e,t=new Map);let g=t.get(a);g||t.set(a,g=S()),function(e,i){let a=!1;A<=C?R(e)||(e.n|=I,a=!N(e)):a=!e.has(L),a&&(e.add(L),L.deps.push(e))}(g)}function H(e,i,a,t,g,m){const r=P.get(e);if(!r)return;let n=[];if("clear"===i)n=[...r.values()];else if("length"===a&&f(e))r.forEach(((e,i)=>{("length"===i||i>=t)&&n.push(e)}));else switch(void 0!==a&&n.push(r.get(a)),i){case"add":f(e)?y(a)&&n.push(r.get("length")):(n.push(r.get(B)),l(e)&&n.push(r.get(q)));break;case"delete":f(e)||(n.push(r.get(B)),l(e)&&n.push(r.get(q)));break;case"set":l(e)&&n.push(r.get(B))}if(1===n.length)n[0]&&Z(n[0]);else{const e=[];for(const i of n)i&&e.push(...i);Z(S(e))}}function Z(e,i){for(const a of f(e)?e:[...e])(a!==L||a.allowRecurse)&&(a.scheduler?a.scheduler():a.run())}const J=function(e,i){const a=Object.create(null),t="__proto__,__v_isRef,__isVue".split(",");for(let g=0;g<t.length;g++)a[t[g]]=!0;return e=>!!a[e]}(),Q=new Set(Object.getOwnPropertyNames(Symbol).map((e=>Symbol[e])).filter(b)),G=ee(),X=ee(!0),Y=function(){const e={};return["includes","indexOf","lastIndexOf"].forEach((i=>{e[i]=function(...e){const a=ce(this);for(let i=0,g=this.length;i<g;i++)V(a,0,i+"");const t=a[i](...e);return-1===t||!1===t?a[i](...e.map(ce)):t}})),["push","pop","shift","unshift","splice"].forEach((i=>{e[i]=function(...e){z.push(W),W=!1;const a=ce(this)[i].apply(this,e);return D(),a}})),e}();function ee(e=!1,i=!1){return function(a,t,g){if("__v_isReactive"===t)return!e;if("__v_isReadonly"===t)return e;if("__v_raw"===t&&g===(e?i?re:me:i?ge:te).get(a))return a;const m=f(a);if(!e&&m&&o(Y,t))return Reflect.get(Y,t,g);const r=Reflect.get(a,t,g);return(b(t)?Q.has(t):J(t))||(e||V(a,0,t),i)?r:se(r)?m&&y(t)?r:r.value:v(r)?e?function(e){return pe(e,!0,ae,null,me)}(r):ne(r):r}}const ie={get:G,set:function(e=!1){return function(i,a,t,g){let m=i[a];if(!e&&!function(e){return!(!e||!e.__v_isReadonly)}(t)&&(t=ce(t),m=ce(m),!f(i)&&se(m)&&!se(t)))return m.value=t,!0;const r=f(i)&&y(a)?Number(a)<i.length:o(i,a),n=Reflect.set(i,a,t,g);return i===ce(g)&&(r?((e,i)=>!Object.is(e,i))(t,m)&&H(i,"set",a,t):H(i,"add",a,t)),n}}(),deleteProperty(e,i){const a=o(e,i);e[i];const t=Reflect.deleteProperty(e,i);return t&&a&&H(e,"delete",i,void 0),t},has(e,i){const a=Reflect.has(e,i);return(!b(i)||!Q.has(i))&&V(e,0,i),a},ownKeys:e=>(V(e,0,f(e)?"length":B),Reflect.ownKeys(e))},ae={get:X,set(e,i){return!0},deleteProperty(e,i){return!0}},te=new WeakMap,ge=new WeakMap,me=new WeakMap,re=new WeakMap;function ne(e){return e&&e.__v_isReadonly?e:pe(e,!1,ie,null,te)}function pe(e,i,a,t,g){if(!v(e)||e.__v_raw&&(!i||!e.__v_isReactive))return e;const m=g.get(e);if(m)return m;const r=function(e){return e.__v_skip||!Object.isExtensible(e)?0:function(e){switch(e){case"Object":case"Array":return 1;case"Map":case"Set":case"WeakMap":case"WeakSet":return 2;default:return 0}}(j(e))}(e);if(0===r)return e;const n=new Proxy(e,2===r?t:a);return g.set(e,n),n}function ce(e){const i=e&&e.__v_raw;return i?ce(i):e}function se(e){return Boolean(e&&!0===e.__v_isRef)}Promise.resolve();let oe=!1;const fe=[],le=Promise.resolve(),de=e=>le.then(e),ue=e=>{fe.includes(e)||fe.push(e),oe||(oe=!0,de(be))},be=()=>{for(const e of fe)e();fe.length=0,oe=!1},ve=/^(spellcheck|draggable|form|list|type)$/,he=({el:e,get:i,effect:a,arg:t,modifiers:g})=>{let m;"class"===t&&(e._class=e.className),a((()=>{let a=i();if(t)(null==g?void 0:g.camel)&&(t=_(t)),we(e,t,a,m);else{for(const i in a)we(e,i,a[i],m&&m[i]);for(const i in m)(!a||!(i in a))&&we(e,i,null)}m=a}))},we=(e,i,t,g)=>{if("class"===i)e.setAttribute("class",r(e._class?[e._class,t]:t)||"");else if("style"===i){t=a(t);const{style:i}=e;if(t)if(u(t))t!==g&&(i.cssText=t);else{for(const e in t)ye(i,e,t[e]);if(g&&!u(g))for(const e in g)null==t[e]&&ye(i,e,"")}else e.removeAttribute("style")}else e instanceof SVGElement||!(i in e)||ve.test(i)?"true-value"===i?e._trueValue=t:"false-value"===i?e._falseValue=t:null!=t?e.setAttribute(i,t):e.removeAttribute(i):(e[i]=t,"value"===i&&(e._value=t))},je=/\s*!important$/,ye=(e,i,a)=>{f(a)?a.forEach((a=>ye(e,i,a))):i.startsWith("--")?e.setProperty(i,a):je.test(a)?e.setProperty(M(i),a.replace(je,""),"important"):e[i]=a},xe=(e,i)=>{const a=e.getAttribute(i);return null!=a&&e.removeAttribute(i),a},ke=(e,i,a,t)=>{e.addEventListener(i,a,t)},_e=/^[A-Za-z_$][\w$]*(?:\.[A-Za-z_$][\w$]*|\['[^']*?']|\["[^"]*?"]|\[\d+]|\[[A-Za-z_$][\w$]*])*$/,$e=["ctrl","shift","alt","meta"],Me={stop:e=>e.stopPropagation(),prevent:e=>e.preventDefault(),self:e=>e.target!==e.currentTarget,ctrl:e=>!e.ctrlKey,shift:e=>!e.shiftKey,alt:e=>!e.altKey,meta:e=>!e.metaKey,left:e=>"button"in e&&0!==e.button,middle:e=>"button"in e&&1!==e.button,right:e=>"button"in e&&2!==e.button,exact:(e,i)=>$e.some((a=>e[`${a}Key`]&&!i[a]))},Ee=({el:e,get:i,exp:a,arg:t,modifiers:g})=>{if(!t)return;let m=_e.test(a)?i(`(e => ${a}(e))`):i(`($event => { ${a} })`);if("vue:mounted"!==t){if("vue:unmounted"===t)return()=>m();if(g){"click"===t&&(g.right&&(t="contextmenu"),g.middle&&(t="mouseup"));const e=m;m=i=>{if(!("key"in i)||M(i.key)in g){for(const e in g){const a=Me[e];if(a&&a(i,g))return}return e(i)}}}ke(e,t,m,g)}else de(m)},Oe=({el:e,get:i,effect:a})=>{a((()=>{e.textContent=Se(i())}))},Se=e=>null==e?"":v(e)?JSON.stringify(e,null,2):String(e),Ne=e=>"_value"in e?e._value:e.value,Re=(e,i)=>{const a=i?"_trueValue":"_falseValue";return a in e?e[a]:i},Pe=e=>{e.target.composing=!0},Ae=e=>{const i=e.target;i.composing&&(i.composing=!1,Ie(i,"input"))},Ie=(e,i)=>{const a=document.createEvent("HTMLEvents");a.initEvent(i,!0,!0),e.dispatchEvent(a)},Ce=Object.create(null),Te=(e,i,a)=>Le(e,`return(${i})`,a),Le=(e,i,a)=>{const t=Ce[i]||(Ce[i]=Be(i));try{return t(e,a)}catch(g){console.error(g)}},Be=e=>{try{return new Function("$data","$el",`with($data){${e}}`)}catch(i){return console.error(`${i.message} in expression: ${e}`),()=>{}}},qe={bind:he,on:Ee,show({el:e,get:i,effect:a}){const t=e.style.display;a((()=>{e.style.display=i()?t:"none"}))},text:Oe,html({el:e,get:i,effect:a}){a((()=>{e.innerHTML=i()}))},model({el:e,exp:i,get:a,effect:t,modifiers:g}){const m=e.type,r=a(`(val) => { ${i} = val }`),{trim:c,number:s="number"===m}=g||{};if("SELECT"===e.tagName){const i=e;ke(e,"change",(()=>{const e=[].filter.call(i.options,(e=>e.selected)).map((e=>s?E(Ne(e)):Ne(e)));r(i.multiple?e:e[0])})),t((()=>{const e=a(),t=i.multiple;for(let a=0,g=i.options.length;a<g;a++){const g=i.options[a],m=Ne(g);if(t)f(e)?g.selected=p(e,m)>-1:g.selected=e.has(m);else if(n(Ne(g),e))return void(i.selectedIndex!==a&&(i.selectedIndex=a))}!t&&-1!==i.selectedIndex&&(i.selectedIndex=-1)}))}else if("checkbox"===m){let i;ke(e,"change",(()=>{const i=a(),t=e.checked;if(f(i)){const a=Ne(e),g=p(i,a),m=-1!==g;if(t&&!m)r(i.concat(a));else if(!t&&m){const e=[...i];e.splice(g,1),r(e)}}else r(Re(e,t))})),t((()=>{const t=a();f(t)?e.checked=p(t,Ne(e))>-1:t!==i&&(e.checked=n(t,Re(e,!0))),i=t}))}else if("radio"===m){let i;ke(e,"change",(()=>{r(Ne(e))})),t((()=>{const t=a();t!==i&&(e.checked=n(t,Ne(e)))}))}else{const i=e=>c?e.trim():s?E(e):e;ke(e,"compositionstart",Pe),ke(e,"compositionend",Ae),ke(e,(null==g?void 0:g.lazy)?"change":"input",(()=>{e.composing||r(i(e.value))})),c&&ke(e,"change",(()=>{e.value=e.value.trim()})),t((()=>{if(e.composing)return;const t=e.value,g=a();document.activeElement===e&&i(t)===g||t!==g&&(e.value=g)}))}},effect({el:e,ctx:i,exp:a,effect:t}){de((()=>t((()=>Le(i.scope,a,e)))))}},Fe=/([\s\S]*?)\s+(?:in|of)\s+([\s\S]*)/,Ke=/,([^,\}\]]*)(?:,([^,\}\]]*))?$/,Ue=/^[{[]\s*((?:[\w_$]+\s*,?\s*)+)[\]}]$/,We=({el:e,ctx:{scope:{$refs:i}},get:a,effect:t})=>{let g;return t((()=>{const t=a();i[t]=e,g&&t!==g&&delete i[g],g=t})),()=>{g&&delete i[g]}},ze=/^(?:v-|:|@)/,De=/\.([\w-]+)/g;let Ve=!1;const He=(e,i)=>{const a=e.nodeType;if(1===a){const a=e;if(a.hasAttribute("v-pre"))return;let t;if(xe(a,"v-cloak"),t=xe(a,"v-if"))return((e,i,a)=>{const t=e.parentElement,g=new Comment("v-if");t.insertBefore(g,e);const m=[{exp:i,el:e}];let r,n;for(;(r=e.nextElementSibling)&&(n=null,""===xe(r,"v-else")||(n=xe(r,"v-else-if")));)t.removeChild(r),m.push({exp:n,el:r});const p=e.nextSibling;t.removeChild(e);let c,s=-1;const o=()=>{c&&(t.insertBefore(g,c.el),c.remove(),c=void 0)};return a.effect((()=>{for(let e=0;e<m.length;e++){const{exp:i,el:r}=m[e];if(!i||Te(a.scope,i))return void(e!==s&&(o(),c=new ii(r,a),c.insert(t,g),t.removeChild(g),s=e))}s=-1,o()})),p})(a,t,i);if(t=xe(a,"v-for"))return((e,i,a)=>{const t=i.match(Fe);if(!t)return;const g=e.nextSibling,m=e.parentElement,r=new Text("");m.insertBefore(r,e),m.removeChild(e);const n=t[2].trim();let p,c,s,o,l=t[1].trim().replace(/^\(|\)$/g,"").trim(),d=!1,u="key",b=e.getAttribute(u)||e.getAttribute(u=":key")||e.getAttribute(u="v-bind:key");b&&(e.removeAttribute(u),"key"===u&&(b=JSON.stringify(b))),(o=l.match(Ke))&&(l=l.replace(Ke,"").trim(),c=o[1].trim(),o[2]&&(s=o[2].trim())),(o=l.match(Ue))&&(p=o[1].split(",").map((e=>e.trim())),d="["===l[0]);let h,w,j,y=!1;const x=(e,i,t,g)=>{const m={};p?p.forEach(((e,a)=>m[e]=i[d?a:e])):m[l]=i,g?(c&&(m[c]=g),s&&(m[s]=t)):c&&(m[c]=t);const r=Ye(a,m),n=b?Te(r.scope,b):t;return e.set(n,t),r.key=n,r},k=(i,a)=>{const t=new ii(e,i);return t.key=i.key,t.insert(m,a),t};return a.effect((()=>{const e=Te(a.scope,n),i=j;if([w,j]=(e=>{const i=new Map,a=[];if(f(e))for(let t=0;t<e.length;t++)a.push(x(i,e[t],t));else if("number"==typeof e)for(let t=0;t<e;t++)a.push(x(i,t+1,t));else if(v(e)){let t=0;for(const g in e)a.push(x(i,e[g],t++,g))}return[a,i]})(e),y){for(let i=0;i<h.length;i++)j.has(h[i].key)||h[i].remove();const e=[];let a,t,g=w.length;for(;g--;){const n=w[g],p=i.get(n.key);let c;null==p?c=k(n,a?a.el:r):(c=h[p],Object.assign(c.ctx.scope,n.scope),p!==g&&(h[p+1]!==a||t===a)&&(t=c,c.insert(m,a?a.el:r))),e.unshift(a=c)}h=e}else h=w.map((e=>k(e,r))),y=!0})),g})(a,t,i);if((t=xe(a,"v-scope"))||""===t){const e=t?Te(i.scope,t):{};i=Ye(i,e),e.$template&&Ge(a,e.$template)}const g=null!=xe(a,"v-once");g&&(Ve=!0),(t=xe(a,"ref"))&&Qe(a,We,`"${t}"`,i),Ze(a,i);const m=[];for(const{name:e,value:r}of[...a.attributes])ze.test(e)&&"v-cloak"!==e&&("v-model"===e?m.unshift([e,r]):"@"===e[0]||/^v-on\b/.test(e)?m.push([e,r]):Je(a,e,r,i));for(const[e,r]of m)Je(a,e,r,i);g&&(Ve=!1)}else if(3===a){const a=e.data;if(a.includes(i.delimiters[0])){let t,g=[],m=0;for(;t=i.delimitersRE.exec(a);){const e=a.slice(m,t.index);e&&g.push(JSON.stringify(e)),g.push(`$s(${t[1]})`),m=t.index+t[0].length}m<a.length&&g.push(JSON.stringify(a.slice(m))),Qe(e,Oe,g.join("+"),i)}}else 11===a&&Ze(e,i)},Ze=(e,i)=>{let a=e.firstChild;for(;a;)a=He(a,i)||a.nextSibling},Je=(e,i,a,t)=>{let g,m,r;if(":"===(i=i.replace(De,((e,i)=>((r||(r={}))[i]=!0,""))))[0])g=he,m=i.slice(1);else if("@"===i[0])g=Ee,m=i.slice(1);else{const e=i.indexOf(":"),a=e>0?i.slice(2,e):i.slice(2);g=qe[a]||t.dirs[a],m=e>0?i.slice(e+1):void 0}g&&(g===he&&"ref"===m&&(g=We),Qe(e,g,a,t,m,r),e.removeAttribute(i))},Qe=(e,i,a,t,g,m)=>{const r=i({el:e,get:(i=a)=>Te(t.scope,i,e),effect:t.effect,ctx:t,exp:a,arg:g,modifiers:m});r&&t.cleanups.push(r)},Ge=(e,i)=>{if("#"!==i[0])e.innerHTML=i;else{const a=document.querySelector(i);e.appendChild(a.content.cloneNode(!0))}},Xe=e=>{const i={delimiters:["{{","}}"],delimitersRE:/\{\{([^]+?)\}\}/g,...e,scope:e?e.scope:ne({}),dirs:e?e.dirs:{},effects:[],blocks:[],cleanups:[],effect(e){if(Ve)return ue(e),e;const a=function(e,i){e.effect&&(e=e.effect.fn);const a=new F(e);i&&(c(a,i),i.scope&&O(a,i.scope)),(!i||!i.lazy)&&a.run();const t=a.run.bind(a);return t.effect=a,t}(e,{scheduler:()=>ue(a)});return i.effects.push(a),a}};return i},Ye=(e,i={})=>{const a=e.scope,t=Object.create(a);Object.defineProperties(t,Object.getOwnPropertyDescriptors(i)),t.$refs=Object.create(a.$refs);const g=ne(new Proxy(t,{set(e,i,t,m){return m!==g||e.hasOwnProperty(i)?Reflect.set(e,i,t,m):Reflect.set(a,i,t)}}));return ei(g),{...e,scope:g}},ei=e=>{for(const i of Object.keys(e))"function"==typeof e[i]&&(e[i]=e[i].bind(e))};class ii{constructor(e,a,t=!1){i(this,"template"),i(this,"ctx"),i(this,"key"),i(this,"parentCtx"),i(this,"isFragment"),i(this,"start"),i(this,"end"),this.isFragment=e instanceof HTMLTemplateElement,t?this.template=e:this.isFragment?this.template=e.content.cloneNode(!0):this.template=e.cloneNode(!0),t?this.ctx=a:(this.parentCtx=a,a.blocks.push(this),this.ctx=Xe(a)),He(this.template,this.ctx)}get el(){return this.start||this.template}insert(e,i=null){if(this.isFragment)if(this.start){let a,t=this.start;for(;t&&(a=t.nextSibling,e.insertBefore(t,i),t!==this.end);)t=a}else this.start=new Text(""),this.end=new Text(""),e.insertBefore(this.end,i),e.insertBefore(this.start,this.end),e.insertBefore(this.template,this.end);else e.insertBefore(this.template,i)}remove(){if(this.parentCtx&&((e,i)=>{const a=e.indexOf(i);a>-1&&e.splice(a,1)})(this.parentCtx.blocks,this),this.start){const e=this.start.parentNode;let i,a=this.start;for(;a&&(i=a.nextSibling,e.removeChild(a),a!==this.end);)a=i}else this.template.parentNode.removeChild(this.template);this.teardown()}teardown(){this.ctx.blocks.forEach((e=>{e.teardown()})),this.ctx.effects.forEach(U),this.ctx.cleanups.forEach((e=>e()))}}const ai=e=>e.replace(/[-.*+?^${}()|[\]\/\\]/g,"\\$&"),ti=e=>{const i=Xe();if(e&&(i.scope=ne(e),ei(i.scope),e.$delimiters)){const[a,t]=i.delimiters=e.$delimiters;i.delimitersRE=new RegExp(ai(a)+"([^]+?)"+ai(t),"g")}let a;return i.scope.$s=Se,i.scope.$nextTick=de,i.scope.$refs=Object.create(null),{directive(e,a){return a?(i.dirs[e]=a,this):i.dirs[e]},mount(e){if("string"==typeof e&&!(e=document.querySelector(e)))return;let t;return t=(e=e||document.documentElement).hasAttribute("v-scope")?[e]:[...e.querySelectorAll("[v-scope]")].filter((e=>!e.matches("[v-scope] [v-scope]"))),t.length||(t=[e]),a=t.map((e=>new ii(e,i,!0))),this},unmount(){a.forEach((e=>e.teardown()))}}},gi=document.currentScript;gi&&gi.hasAttribute("init")&&ti().mount();const mi=[{id:1017,name:"熟制虾仁沙拉",price:15,category:"沙拉 汤",image:{"image/avif":"image/20001017.avif","image/webp":"image/20001017.webp","image/jpeg":"image/20001017.jpg"}},{id:1011,name:"金枪鱼沙拉",price:11,category:"沙拉 汤",image:{"image/avif":"image/20001011.avif","image/webp":"image/20001011.webp","image/jpeg":"image/20001011.jpg"}},{id:1012,name:"水果沙拉",price:9,category:"沙拉 汤",image:{"image/avif":"image/20001012.avif","image/webp":"image/20001012.webp","image/jpeg":"image/20001012.jpg"}},{id:1013,name:"海带丝沙拉",price:9,category:"沙拉 汤",image:{"image/avif":"image/20001013.avif","image/webp":"image/20001013.webp","image/jpeg":"image/20001013.jpg"}},{id:1014,name:"玉米沙拉",price:9,category:"沙拉 汤",image:{"image/avif":"image/20001014.avif","image/webp":"image/20001014.webp","image/jpeg":"image/20001014.jpg"}},{id:1116,name:"蘑菇汤",price:9,category:"沙拉 汤",image:{"image/avif":"image/20001116.avif","image/webp":"image/20001116.webp","image/jpeg":"image/20001116.jpg"}},{id:1115,name:"玉米汤",price:9,category:"沙拉 汤",image:{"image/avif":"image/20001115.avif","image/webp":"image/20001115.webp","image/jpeg":"image/20001115.jpg"}},{id:1117,name:"田园蔬菜汤",price:9,category:"沙拉 汤",image:{"image/avif":"image/20001117.avif","image/webp":"image/20001117.webp","image/jpeg":"image/20001117.jpg"}},{id:1114,name:"花蛤汤",price:9,category:"沙拉 汤",image:{"image/avif":"image/20001114.avif","image/webp":"image/20001114.webp","image/jpeg":"image/20001114.jpg"}},{id:1230,name:"人气小吃拼盘①",price:27,category:"前菜",image:{"image/avif":"image/20001230.avif","image/webp":"image/20001230.webp","image/jpeg":"image/20001230.jpg"}},{id:1231,name:"人气小吃拼盘②",price:27,category:"前菜",image:{"image/avif":"image/20001231.avif","image/webp":"image/20001231.webp","image/jpeg":"image/20001231.jpg"}},{id:1235,name:"鱿鱼花蛤拼盘",price:26,category:"前菜",image:{"image/avif":"image/20001235.avif","image/webp":"image/20001235.webp","image/jpeg":"image/20001235.jpg"}},{id:1250,name:"蒜香黄油炒菜心",price:9,category:"前菜",image:{"image/avif":"image/20001250.avif","image/webp":"image/20001250.webp","image/jpeg":"image/20001250.jpg"}},{id:1229,name:"芝士烤玉米",price:9,category:"前菜",image:{"image/avif":"image/20001229.avif","image/webp":"image/20001229.webp","image/jpeg":"image/20001229.jpg"}},{id:1253,name:"芝士烤菠菜",price:9,category:"前菜",image:{"image/avif":"image/20001253.avif","image/webp":"image/20001253.webp","image/jpeg":"image/20001253.jpg"}},{id:1255,name:"橄榄油炒西葫芦",price:9,category:"前菜",image:{"image/avif":"image/20001255.avif","image/webp":"image/20001255.webp","image/jpeg":"image/20001255.jpg"}},{id:1290,name:"蒜香花椰菜",price:9,category:"前菜",image:{"image/avif":"image/20001290.avif","image/webp":"image/20001290.webp","image/jpeg":"image/20001290.jpg"}},{id:1240,name:"海带丝",price:9,category:"前菜",image:{"image/avif":"image/20001240.avif","image/webp":"image/20001240.webp","image/jpeg":"image/20001240.jpg"}},{id:1254,name:"小份虾仁配沙拉酱",price:9,category:"前菜",image:{"image/avif":"image/20001254.avif","image/webp":"image/20001254.webp","image/jpeg":"image/20001254.jpg"}},{id:1289,name:"什锦鲜蔬",price:12,category:"前菜",image:{"image/avif":"image/20001289.avif","image/webp":"image/20001289.webp","image/jpeg":"image/20001289.jpg"}},{id:1226,name:"烤甜玉米",price:7,category:"前菜",image:{"image/avif":"image/20001226.avif","image/webp":"image/20001226.webp","image/jpeg":"image/20001226.jpg"}},{id:1224,name:"烤菠菜",price:7,category:"前菜",image:{"image/avif":"image/20001224.avif","image/webp":"image/20001224.webp","image/jpeg":"image/20001224.jpg"}},{id:1204,name:"QQ薯角",price:7,category:"前菜",image:{"image/avif":"image/20001204.avif","image/webp":"image/20001204.webp","image/jpeg":"image/20001204.jpg"}},{id:1256,name:"芝士培根局西葫芦",price:13,category:"前菜",image:{"image/avif":"image/20001256.avif","image/webp":"image/20001256.webp","image/jpeg":"image/20001256.jpg"}},{id:1297,name:"蒜香黄油蜗牛配面包片",price:18,category:"前菜",image:{"image/avif":"image/20001297.avif","image/webp":"image/20001297.webp","image/jpeg":"image/20001297.jpg"}},{id:1208,name:"意式茄红鸡翅",price:26,category:"前菜",image:{"image/avif":"image/20001208.avif","image/webp":"image/20001208.webp","image/jpeg":"image/20001208.jpg"}},{id:1246,name:"椒盐鸡腿排",price:16,category:"前菜",image:{"image/avif":"image/20001246.avif","image/webp":"image/20001246.webp","image/jpeg":"image/20001246.jpg"}},{id:1234,name:"五目烤肠",price:16,category:"前菜",image:{"image/avif":"image/20001234.avif","image/webp":"image/20001234.webp","image/jpeg":"image/20001234.jpg"}},{id:1233,name:"黑椒烤肠",price:16,category:"前菜",image:{"image/avif":"image/20001233.avif","image/webp":"image/20001233.webp","image/jpeg":"image/20001233.jpg"}},{id:1232,name:"盐酥鸡肉粒",price:13,category:"前菜",image:{"image/avif":"image/20001232.avif","image/webp":"image/20001232.webp","image/jpeg":"image/20001232.jpg"}},{id:1275,name:"奶油土豆泥",price:13,category:"前菜",image:{"image/avif":"image/20001275.avif","image/webp":"image/20001275.webp","image/jpeg":"image/20001275.jpg"}},{id:1218,name:"原味煮花蛤",price:13,category:"前菜",image:{"image/avif":"image/20001218.avif","image/webp":"image/20001218.webp","image/jpeg":"image/20001218.jpg"}},{id:1209,name:"本色烤全鱿",price:22,category:"前菜",image:{"image/avif":"image/20001209.avif","image/webp":"image/20001209.webp","image/jpeg":"image/20001209.jpg"}},{id:1287,name:"蒜香烤饼",price:7,category:"前菜",image:{"image/avif":"image/20001287.avif","image/webp":"image/20001287.webp","image/jpeg":"image/20001287.jpg"}},{id:1286,name:"原味烤饼",price:5,category:"前菜",image:{"image/avif":"image/20001286.avif","image/webp":"image/20001286.webp","image/jpeg":"image/20001286.jpg"}},{id:1288,name:"白糖烤饼",price:5,category:"前菜",image:{"image/avif":"image/20001288.avif","image/webp":"image/20001288.webp","image/jpeg":"image/20001288.jpg"}},{id:1242,name:"蒜香烤面包片",price:7,category:"前菜",image:{"image/avif":"image/20001242.avif","image/webp":"image/20001242.webp","image/jpeg":"image/20001242.jpg"}},{id:1241,name:"原味烤面包片",price:5,category:"前菜",image:{"image/avif":"image/20001241.avif","image/webp":"image/20001241.webp","image/jpeg":"image/20001241.jpg"}},{id:1535,name:"酸菜培根意面",price:12,category:"意面",image:{"image/avif":"image/20001535.avif","image/webp":"image/20001535.webp","image/jpeg":"image/20001535.jpg"}},{id:1525,name:"芝士番茄培根意面",price:14,category:"意面",image:{"image/avif":"image/20001525.avif","image/webp":"image/20001525.webp","image/jpeg":"image/20001525.jpg"}},{id:1541,name:"菌菇培根奶油意面",price:14,category:"意面",image:{"image/avif":"image/20001541.avif","image/webp":"image/20001541.webp","image/jpeg":"image/20001541.jpg"}},{id:1505,name:"青酱汁意面",price:14,category:"意面",image:{"image/avif":"image/20001505.avif","image/webp":"image/20001505.webp","image/jpeg":"image/20001505.jpg"}},{id:1539,name:"麻辣肉酱面",price:14,category:"意面",image:{"image/avif":"image/20001539.avif","image/webp":"image/20001539.webp","image/jpeg":"image/20001539.jpg"}},{id:1543,name:"曙光女神酱意面",price:16,category:"意面",image:{"image/avif":"image/20001543.avif","image/webp":"image/20001543.webp","image/jpeg":"image/20001543.jpg"}},{id:1512,name:"墨鱼汁意面",price:16,category:"意面",image:{"image/avif":"image/20001512.avif","image/webp":"image/20001512.webp","image/jpeg":"image/20001512.jpg"}},{id:1501,name:"肉酱意面",price:18,category:"意面",image:{"image/avif":"image/20001501.avif","image/webp":"image/20001501.webp","image/jpeg":"image/20001501.jpg"}},{id:1513,name:"黑椒牛柳意面",price:18,category:"意面",image:{"image/avif":"image/20001513.avif","image/webp":"image/20001513.webp","image/jpeg":"image/20001513.jpg"}},{id:1523,name:"蒜香茄汁鲜菇金枪鱼意面",price:18,category:"意面",image:{"image/avif":"image/20001523.avif","image/webp":"image/20001523.webp","image/jpeg":"image/20001523.jpg"}},{id:1542,name:"海鲜蒜香意面",price:18,category:"意面",image:{"image/avif":"image/20001542.avif","image/webp":"image/20001542.webp","image/jpeg":"image/20001542.jpg"}},{id:1509,name:"番茄海鲜意面",price:22,category:"意面",image:{"image/avif":"image/20001509.avif","image/webp":"image/20001509.webp","image/jpeg":"image/20001509.jpg"}},{id:1428,name:"曙光女神酱烩饭",price:16,category:"饭类、局类",image:{"image/avif":"image/20001428.avif","image/webp":"image/20001428.webp","image/jpeg":"image/20001428.jpg"}},{id:1401,name:"海鲜番茄酱烩饭",price:18,category:"饭类、局类",image:{"image/avif":"image/20001401.avif","image/webp":"image/20001401.webp","image/jpeg":"image/20001401.jpg"}},{id:1402,name:"芝士肉酱局饭",price:22,category:"饭类、局类",image:{"image/avif":"image/20001402.avif","image/webp":"image/20001402.webp","image/jpeg":"image/20001402.jpg"}},{id:1403,name:"肉酱局饭",price:18,category:"饭类、局类",image:{"image/avif":"image/20001403.avif","image/webp":"image/20001403.webp","image/jpeg":"image/20001403.jpg"}},{id:1415,name:"芝士香烤鸡肉局饭",price:22,category:"饭类、局类",image:{"image/avif":"image/20001415.avif","image/webp":"image/20001415.webp","image/jpeg":"image/20001415.jpg"}},{id:1416,name:"香烤鸡肉局饭",price:18,category:"饭类、局类",image:{"image/avif":"image/20001416.avif","image/webp":"image/20001416.webp","image/jpeg":"image/20001416.jpg"}},{id:1419,name:"肉酱香肠芝士烤饭",price:18,category:"饭类、局类",image:{"image/avif":"image/20001419.avif","image/webp":"image/20001419.webp","image/jpeg":"image/20001419.jpg"}},{id:1405,name:"鸡肉芝士培根烤饭",price:18,category:"饭类、局类",image:{"image/avif":"image/20001405.avif","image/webp":"image/20001405.webp","image/jpeg":"image/20001405.jpg"}},{id:1404,name:"鸡排烤饭",price:20,category:"饭类、局类",image:{"image/avif":"image/20001404.avif","image/webp":"image/20001404.webp","image/jpeg":"image/20001404.jpg"}},{id:1408,name:"肉酱局意面",price:18,category:"饭类、局类",image:{"image/avif":"image/20001408.avif","image/webp":"image/20001408.webp","image/jpeg":"image/20001408.jpg"}},{id:1410,name:"海鲜局意面",price:18,category:"饭类、局类",image:{"image/avif":"image/20001410.avif","image/webp":"image/20001410.webp","image/jpeg":"image/20001410.jpg"}},{id:1420,name:"金枪鱼局意面",price:18,category:"饭类、局类",image:{"image/avif":"image/20001420.avif","image/webp":"image/20001420.webp","image/jpeg":"image/20001420.jpg"}},{id:1409,name:"米饭",price:2,category:"饭类、局类",image:{"image/avif":"image/20001409.avif","image/webp":"image/20001409.webp","image/jpeg":"image/20001409.jpg"}},{id:1387,name:"榴莲小匹萨",price:21,category:"匹萨",image:{"image/avif":"image/20001387.avif","image/webp":"image/20001387.webp","image/jpeg":"image/20001387.jpg"}},{id:1396,name:"鸡肉培根小匹萨",price:15,category:"匹萨",image:{"image/avif":"image/20001396.avif","image/webp":"image/20001396.webp","image/jpeg":"image/20001396.jpg"}},{id:1395,name:"金枪鱼小匹萨",price:15,category:"匹萨",image:{"image/avif":"image/20001395.avif","image/webp":"image/20001395.webp","image/jpeg":"image/20001395.jpg"}},{id:1380,name:"培根菠萝小匹萨",price:14,category:"匹萨",image:{"image/avif":"image/20001380.avif","image/webp":"image/20001380.webp","image/jpeg":"image/20001380.jpg"}},{id:1389,name:"香肠小匹萨",price:14,category:"匹萨",image:{"image/avif":"image/20001389.avif","image/webp":"image/20001389.webp","image/jpeg":"image/20001389.jpg"}},{id:1393,name:"肉酱培根小匹萨",price:14,category:"匹萨",image:{"image/avif":"image/20001393.avif","image/webp":"image/20001393.webp","image/jpeg":"image/20001393.jpg"}},{id:1382,name:"水果小匹萨",price:14,category:"匹萨",image:{"image/avif":"image/20001382.avif","image/webp":"image/20001382.webp","image/jpeg":"image/20001382.jpg"}},{id:1307,name:"榴莲匹萨",price:39,category:"匹萨",image:{"image/avif":"image/20001307.avif","image/webp":"image/20001307.webp","image/jpeg":"image/20001307.jpg"}},{id:1314,name:"金枪鱼匹萨",price:26,category:"匹萨",image:{"image/avif":"image/20001314.avif","image/webp":"image/20001314.webp","image/jpeg":"image/20001314.jpg"}},{id:1305,name:"培根菠萝匹萨",price:22,category:"匹萨",image:{"image/avif":"image/20001305.avif","image/webp":"image/20001305.webp","image/jpeg":"image/20001305.jpg"}},{id:1620,name:"蒜香黄油烤鱼排",price:21,category:"主菜",image:{"image/avif":"image/20001620.avif","image/webp":"image/20001620.webp","image/jpeg":"image/20001620.jpg"}},{id:1606,name:"香烤鸡排(黑椒味)",price:18,category:"主菜",image:{"image/avif":"image/20001606.avif","image/webp":"image/20001606.webp","image/jpeg":"image/20001606.jpg"}},{id:1605,name:"香烤鸡排(蒜香味)",price:18,category:"主菜",image:{"image/avif":"image/20001605.avif","image/webp":"image/20001605.webp","image/jpeg":"image/20001605.jpg"}},{id:1608,name:"黑椒烤肠配黑椒鸡排",price:23,category:"主菜",image:{"image/avif":"image/20001608.avif","image/webp":"image/20001608.webp","image/jpeg":"image/20001608.jpg"}},{id:1615,name:"五目烤肠配原味鸡排",price:23,category:"主菜",image:{"image/avif":"image/20001615.avif","image/webp":"image/20001615.webp","image/jpeg":"image/20001615.jpg"}},{id:1618,name:"黑椒汉堡",price:23,category:"主菜",image:{"image/avif":"image/20001618.avif","image/webp":"image/20001618.webp","image/jpeg":"image/20001618.jpg"}},{id:1619,name:"芝士汉堡",price:27,category:"主菜",image:{"image/avif":"image/20001619.avif","image/webp":"image/20001619.webp","image/jpeg":"image/20001619.jpg"}},{id:1603,name:"牛排(黑椒风味)",price:49,category:"主菜",image:{"image/avif":"image/20001603.avif","image/webp":"image/20001603.webp","image/jpeg":"image/20001603.jpg"}},{id:1602,name:"牛排(蒜香风味)",price:49,category:"主菜",image:{"image/avif":"image/20001602.avif","image/webp":"image/20001602.webp","image/jpeg":"image/20001602.jpg"}},{id:1613,name:"烘烤羊排(2根)",price:49,category:"主菜",image:{"image/avif":"image/20001613.avif","image/webp":"image/20001613.webp","image/jpeg":"image/20001613.jpg"}},{id:1601,name:"鱿鱼鸡排拼盘",price:36,category:"主菜",image:{"image/avif":"image/20001601.avif","image/webp":"image/20001601.webp","image/jpeg":"image/20001601.jpg"}},{id:1607,name:"鸡翅鸡排牛肉粒拼盘",price:49,category:"主菜",image:{"image/avif":"image/20001607.avif","image/webp":"image/20001607.webp","image/jpeg":"image/20001607.jpg"}},{id:1612,name:"烤肠鸡排羊排拼盘",price:49,category:"主菜",image:{"image/avif":"image/20001612.avif","image/webp":"image/20001612.webp","image/jpeg":"image/20001612.jpg"}},{id:1617,name:"烤肠鸡排牛肉粒拼盘",price:49,category:"主菜",image:{"image/avif":"image/20001617.avif","image/webp":"image/20001617.webp","image/jpeg":"image/20001617.jpg"}},{id:1888,name:"畅饮",price:8,category:"畅饮",image:{"image/avif":"image/20001888.avif","image/webp":"image/20001888.webp","image/jpeg":"image/20001888.jpg"}},{id:1736,name:"提拉米苏",price:16,category:"甜点",image:{"image/avif":"image/20001736.avif","image/webp":"image/20001736.webp","image/jpeg":"image/20001736.jpg"}},{id:1726,name:"草莓千层蛋糕",price:16,category:"甜点",image:{"image/avif":"image/20001726.avif","image/webp":"image/20001726.webp","image/jpeg":"image/20001726.jpg"}},{id:1719,name:"焦糖布丁",price:16,category:"甜点",image:{"image/avif":"image/20001719.avif","image/webp":"image/20001719.webp","image/jpeg":"image/20001719.jpg"}},{id:1717,name:"激情果粒",price:8,category:"甜点",image:{"image/avif":"image/20001717.avif","image/webp":"image/20001717.webp","image/jpeg":"image/20001717.jpg"}},{id:1713,name:"芒果布丁",price:8,category:"甜点",image:{"image/avif":"image/20001713.avif","image/webp":"image/20001713.webp","image/jpeg":"image/20001713.jpg"}},{id:1731,name:"薄脆树莓果酱冰激凌",price:9,category:"甜点",image:{"image/avif":"image/20001731.avif","image/webp":"image/20001731.webp","image/jpeg":"image/20001731.jpg"}},{id:1732,name:"薄脆巧克力酱冰激凌",price:9,category:"甜点",image:{"image/avif":"image/20001732.avif","image/webp":"image/20001732.webp","image/jpeg":"image/20001732.jpg"}},{id:1735,name:"肉桂糖烤饼配香草冰激凌",price:10,category:"甜点",image:{"image/avif":"image/20001735.avif","image/webp":"image/20001735.webp","image/jpeg":"image/20001735.jpg"}},{id:1733,name:"草莓千层蛋糕配薄脆巧克力酱冰激凌",price:22,category:"甜点",image:{"image/avif":"image/20001733.avif","image/webp":"image/20001733.webp","image/jpeg":"image/20001733.jpg"}},{id:1737,name:"提拉米苏配树莓果酱冰激凌",price:22,category:"甜点",image:{"image/avif":"image/20001737.avif","image/webp":"image/20001737.webp","image/jpeg":"image/20001737.jpg"}},{id:1738,name:"香草冰激凌",price:8,category:"甜点",image:{"image/avif":"image/20001738.avif","image/webp":"image/20001738.webp","image/jpeg":"image/20001738.jpg"}},{id:1908,name:"普里米蒂沃干红葡萄酒",price:18,category:"酒水",image:{"image/avif":"image/20001908.avif","image/webp":"image/20001908.webp","image/jpeg":"image/20001908.jpg"}},{id:1909,name:"维罗纳干白葡萄酒",price:18,category:"酒水",image:{"image/avif":"image/20001909.avif","image/webp":"image/20001909.webp","image/jpeg":"image/20001909.jpg"}},{id:1977,name:"蓝布鲁斯科气泡",price:36,category:"酒水",image:{"image/avif":"image/20001977.avif","image/webp":"image/20001977.webp","image/jpeg":"image/20001977.jpg"}},{id:1969,name:"蒂安诺干红",price:58,category:"酒水",image:{"image/avif":"image/20001969.avif","image/webp":"image/20001969.webp","image/jpeg":"image/20001969.jpg"}},{id:1907,name:"麒麟啤酒",price:10,category:"酒水",image:{"image/avif":"image/20001907.avif","image/webp":"image/20001907.webp","image/jpeg":"image/20001907.jpg"}},{id:1777,name:"无需畅饮",price:0,category:"畅饮",image:{"image/avif":"image/20001777.avif","image/webp":"image/20001777.webp","image/jpeg":"image/20001777.jpg"}},{id:1921,name:"赤霞珠干红",price:36,category:"酒水",image:{"image/avif":"image/20001921.avif","image/webp":"image/20001921.webp","image/jpeg":"image/20001921.jpg"}},{id:1924,name:"霞多丽干白",price:36,category:"酒水",image:{"image/avif":"image/20001924.avif","image/webp":"image/20001924.webp","image/jpeg":"image/20001924.jpg"}}],ri=mi.find((e=>1888===e.id));mi.splice(mi.indexOf(ri),1);const ni=mi.find((e=>1777===e.id));mi.splice(mi.indexOf(ni),1);const pi=Math.min(...mi.map((e=>e.price))),ci=mi.map((e=>e.price)).reduce(((e,i)=>e+i),0),si=(e,i)=>e+Math.floor(Math.random()*(i-e+1)),oi=e=>e[si(0,e.length-1)];ti({isDark:!1,showResult:!1,menuPriceMin:pi,menuPriceTotal:ci,budgetMin:null,budgetMax:null,categoryFilter:Array.from(new Set(mi.map((e=>e.category)))).map((e=>({category:e,enabled:!0}))),blacklistExpr:"",result:[],drinkProbability:.5,drinkMix:!1,drinkRecommendation:"",qrImage:"",resultImage:"",formatPrice(e){return"¥"+e.toFixed(2)},autoSetBudget(){const e=parseInt(this.budgetMin),i=parseInt(this.budgetMax);let a;a=isNaN(e)&&isNaN(i)?30:isNaN(e)?i:isNaN(i)?e:(e+i)/2,this.budgetMin=Math.round(.8*a),this.budgetMax=Math.round(1.2*a)},rollMenu(){this.result.length=0;let e=parseInt(this.budgetMin),i=parseInt(this.budgetMax);if(isNaN(e)&&isNaN(i))return void alert("请输入预算…_φ(･ω･` )");if((isNaN(e)||e<1)&&(this.budgetMin=e=1),(isNaN(i)||i<1)&&(this.budgetMax=i=1),e>i&&([e,i]=[i,e],[this.budgetMin,this.budgetMax]=[this.budgetMax,this.budgetMin]),e>ci||i<pi)return;i>ci&&(i=ci);const a=new Set(this.categoryFilter.filter((e=>!e.enabled)).map((e=>e.category))),t=new Set(this.blacklistExpr.split(" ").map((e=>parseInt(e)))),g=mi.filter((e=>!t.has(e.id)&&!a.has(e.category)));if(!g.length)return;for(let n=g.length-1;n>=0;n--){const e=Math.floor(Math.random()*(n+1));[g[n],g[e]]=[g[e],g[n]]}const m=Math.random()<this.drinkProbability&&e>=ri.price;m&&(e-=ri.price,i-=ri.price);const r=new Set;for(let n=0;n<(e===i?1:64)&&r.size<i-e+1&&!this.result.length;n++){let a;this.result.length=0;do{a=si(e,i)}while(r.has(a));if(r.add(a),a===ci)this.result.push(...g);else{const e=Array(g.length+1).fill().map((()=>Array(a+1).fill()));for(let i=0;i<=a;i++)e[0][i]=!1;for(let i=0;i<=g.length;i++)e[i][0]=!0;for(let i=1;i<=g.length;i++)for(let t=1;t<=a;t++)t<g[i-1].price?e[i][t]=e[i-1][t]:e[i][t]=e[i-1][t]||e[i-1][t-g[i-1].price];if(e[g.length][a])for(let i=g.length;i>=0&&a;i--)e[i][a]&&!e[i-1][a]&&(this.result.push(g[i-1]),a-=g[i-1].price)}}if(m)switch(this.result.push(ri),this.drinkMix?si(4,6):si(0,3)){case 0:this.drinkRecommendation=`热饮（${oi(["拿铁咖啡","卡布奇诺","热牛奶","美式咖啡","意式浓缩咖啡","香沫咖啡"])}）`;break;case 1:this.drinkRecommendation=`茶包（${oi(["高山绿茶","玄米茶","红茶","茉莉花茶","菊花茶","普洱"])}）`;break;case 2:this.drinkRecommendation=`汽水（${oi(["可口可乐","雪碧","柠檬红茶","芬达"])}）`;break;case 3:this.drinkRecommendation=`果汁（${oi(["黑加仑汁","草莓番石榴汁","芒果汁","橙汁"])}）`;break;case 4:this.drinkRecommendation=`热奶茶（${oi(["高山绿茶","玄米茶","红茶","茉莉花茶","菊花茶","普洱"])}+热牛奶）`;break;case 5:this.drinkRecommendation=`碳酸果汁（${oi(["可口可乐","雪碧","柠檬红茶","芬达"])}+${oi(["黑加仑汁","草莓番石榴汁","芒果汁","橙汁"])}）`;break;case 6:this.drinkRecommendation=this.result.find((e=>1738===e.id))?"阿芙佳朵（香草冰激凌+意式浓缩咖啡）":"气泡咖啡（冰块+雪碧+意式浓缩咖啡）"}else this.result.push(ni);this.result.sort(((e,i)=>e.id-i.id)),this.showResult=!0},async saveMenu(){const[e,i]=await Promise.all([window.html2canvas||new Promise(((e,i)=>{const a=document.createElement("script");a.src="https://npm.elemecdn.com/html2canvas@1/dist/html2canvas.min.js",a.onload=()=>e(window.html2canvas),a.onerror=i,document.body.appendChild(a)})),this.qrImage||new Promise(((e,i)=>{const a=new URL("https://quickchart.io/qr");a.searchParams.set("text",location.href.split("?")[0]),a.searchParams.set("ecLevel","L"),a.searchParams.set("margin",0),a.searchParams.set("format","svg"),fetch(a).then((e=>e.text())).then((i=>e(this.qrImage=`data:image/svg+xml,${encodeURIComponent(i)}`))).catch(i)}))]),a=await e(document.getElementById("menu-result"),{useCORS:!0,onclone(e){Array.from(e.querySelectorAll(".is-dark")).forEach((e=>e.classList.remove("is-dark")));const a=e.getElementById("preload-style");a.parentNode.removeChild(a);const t=e.getElementById("menu-result");t.style.cssText="padding:24px",t.insertBefore(e.getElementById("title").cloneNode(!0),t.firstChild);const g=e.getElementById("source"),m=e.createElement("div");m.style.cssText="display:flex;align-items:center";const r=e.createElement("small");r.style.cssText="flex-grow:1",r.innerHTML=e.getElementById("footer").innerText.replaceAll("\n","<br>").replace(g.innerText.trim(),"");const n=e.createElement("img");n.src=i,n.style.cssText="margin-left:1rem;max-width:6rem;max-height:6rem",m.appendChild(r),m.appendChild(n),t.appendChild(m)}});URL.revokeObjectURL(this.resultImage),navigator.userAgent.includes("MicroMessenger")?this.resultImage=a.toDataURL("image/png"):this.resultImage=URL.createObjectURL(await new Promise((e=>a.toBlob(e,"image/png")))),document.getElementById("dialog-image").showModal()},mounted(){const e=matchMedia("(prefers-color-scheme:dark)");e.addEventListener("change",(()=>this.isDark=e.matches)),this.isDark=e.matches}}).mount();const fi=(e,i,a)=>console.log(`%c ${e} %c ${i} `,"color:#fff;background-color:#555;border-radius:3px 0 0 3px",`color:#fff;background-color:${a};border-radius:0 3px 3px 0`);fi("Project","saizeriya","#07c"),fi("Author","TransparentLC","#f84"),fi("Build Time","2023-08-01T17:03:57.573Z","#f48");