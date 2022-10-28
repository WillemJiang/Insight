import{s as nt,i as B,u as F,c as N,r as qe,n as rt,d as ze,h as Ge,p as ae,a as ot,w as st}from"./@vue.dee5c8f0.js";/*!
  * vue-router v4.1.5
  * (c) 2022 Eduardo San Martin Morote
  * @license MIT
  */const z=typeof window<"u";function ct(e){return e.__esModule||e[Symbol.toStringTag]==="Module"}const S=Object.assign;function le(e,t){const n={};for(const r in t){const o=t[r];n[r]=I(o)?o.map(e):e(o)}return n}const W=()=>{},I=Array.isArray,it=/\/$/,at=e=>e.replace(it,"");function ue(e,t,n="/"){let r,o={},l="",d="";const g=t.indexOf("#");let i=t.indexOf("?");return g<i&&g>=0&&(i=-1),i>-1&&(r=t.slice(0,i),l=t.slice(i+1,g>-1?g:t.length),o=e(l)),g>-1&&(r=r||t.slice(0,g),d=t.slice(g,t.length)),r=ht(r!=null?r:t,n),{fullPath:r+(l&&"?")+l+d,path:r,query:o,hash:d}}function lt(e,t){const n=t.query?e(t.query):"";return t.path+(n&&"?")+n+(t.hash||"")}function _e(e,t){return!t||!e.toLowerCase().startsWith(t.toLowerCase())?e:e.slice(t.length)||"/"}function ut(e,t,n){const r=t.matched.length-1,o=n.matched.length-1;return r>-1&&r===o&&G(t.matched[r],n.matched[o])&&Ke(t.params,n.params)&&e(t.query)===e(n.query)&&t.hash===n.hash}function G(e,t){return(e.aliasOf||e)===(t.aliasOf||t)}function Ke(e,t){if(Object.keys(e).length!==Object.keys(t).length)return!1;for(const n in e)if(!ft(e[n],t[n]))return!1;return!0}function ft(e,t){return I(e)?Ce(e,t):I(t)?Ce(t,e):e===t}function Ce(e,t){return I(t)?e.length===t.length&&e.every((n,r)=>n===t[r]):e.length===1&&e[0]===t}function ht(e,t){if(e.startsWith("/"))return e;if(!e)return t;const n=t.split("/"),r=e.split("/");let o=n.length-1,l,d;for(l=0;l<r.length;l++)if(d=r[l],d!==".")if(d==="..")o>1&&o--;else break;return n.slice(0,o).join("/")+"/"+r.slice(l-(l===r.length?1:0)).join("/")}var X;(function(e){e.pop="pop",e.push="push"})(X||(X={}));var Y;(function(e){e.back="back",e.forward="forward",e.unknown=""})(Y||(Y={}));function dt(e){if(!e)if(z){const t=document.querySelector("base");e=t&&t.getAttribute("href")||"/",e=e.replace(/^\w+:\/\/[^\/]+/,"")}else e="/";return e[0]!=="/"&&e[0]!=="#"&&(e="/"+e),at(e)}const pt=/^[^#]+#/;function mt(e,t){return e.replace(pt,"#")+t}function gt(e,t){const n=document.documentElement.getBoundingClientRect(),r=e.getBoundingClientRect();return{behavior:t.behavior,left:r.left-n.left-(t.left||0),top:r.top-n.top-(t.top||0)}}const ee=()=>({left:window.pageXOffset,top:window.pageYOffset});function vt(e){let t;if("el"in e){const n=e.el,r=typeof n=="string"&&n.startsWith("#"),o=typeof n=="string"?r?document.getElementById(n.slice(1)):document.querySelector(n):n;if(!o)return;t=gt(o,e)}else t=e;"scrollBehavior"in document.documentElement.style?window.scrollTo(t):window.scrollTo(t.left!=null?t.left:window.pageXOffset,t.top!=null?t.top:window.pageYOffset)}function ke(e,t){return(history.state?history.state.position-t:-1)+e}const he=new Map;function yt(e,t){he.set(e,t)}function Rt(e){const t=he.get(e);return he.delete(e),t}let Et=()=>location.protocol+"//"+location.host;function Ve(e,t){const{pathname:n,search:r,hash:o}=t,l=e.indexOf("#");if(l>-1){let g=o.includes(e.slice(l))?e.slice(l).length:1,i=o.slice(g);return i[0]!=="/"&&(i="/"+i),_e(i,"")}return _e(n,e)+r+o}function wt(e,t,n,r){let o=[],l=[],d=null;const g=({state:u})=>{const m=Ve(e,location),R=n.value,k=t.value;let C=0;if(u){if(n.value=m,t.value=u,d&&d===R){d=null;return}C=k?u.position-k.position:0}else r(m);o.forEach(P=>{P(n.value,R,{delta:C,type:X.pop,direction:C?C>0?Y.forward:Y.back:Y.unknown})})};function i(){d=n.value}function f(u){o.push(u);const m=()=>{const R=o.indexOf(u);R>-1&&o.splice(R,1)};return l.push(m),m}function s(){const{history:u}=window;!u.state||u.replaceState(S({},u.state,{scroll:ee()}),"")}function a(){for(const u of l)u();l=[],window.removeEventListener("popstate",g),window.removeEventListener("beforeunload",s)}return window.addEventListener("popstate",g),window.addEventListener("beforeunload",s),{pauseListeners:i,listen:f,destroy:a}}function Ae(e,t,n,r=!1,o=!1){return{back:e,current:t,forward:n,replaced:r,position:window.history.length,scroll:o?ee():null}}function Pt(e){const{history:t,location:n}=window,r={value:Ve(e,n)},o={value:t.state};o.value||l(r.value,{back:null,current:r.value,forward:null,position:t.length-1,replaced:!0,scroll:null},!0);function l(i,f,s){const a=e.indexOf("#"),u=a>-1?(n.host&&document.querySelector("base")?e:e.slice(a))+i:Et()+e+i;try{t[s?"replaceState":"pushState"](f,"",u),o.value=f}catch(m){console.error(m),n[s?"replace":"assign"](u)}}function d(i,f){const s=S({},t.state,Ae(o.value.back,i,o.value.forward,!0),f,{position:o.value.position});l(i,s,!0),r.value=i}function g(i,f){const s=S({},o.value,t.state,{forward:i,scroll:ee()});l(s.current,s,!0);const a=S({},Ae(r.value,i,null),{position:s.position+1},f);l(i,a,!1),r.value=i}return{location:r,state:o,push:g,replace:d}}function St(e){e=dt(e);const t=Pt(e),n=wt(e,t.state,t.location,t.replace);function r(l,d=!0){d||n.pauseListeners(),history.go(l)}const o=S({location:"",base:e,go:r,createHref:mt.bind(null,e)},t,n);return Object.defineProperty(o,"location",{enumerable:!0,get:()=>t.location.value}),Object.defineProperty(o,"state",{enumerable:!0,get:()=>t.state.value}),o}function un(e){return e=location.host?e||location.pathname+location.search:"",e.includes("#")||(e+="#"),St(e)}function _t(e){return typeof e=="string"||e&&typeof e=="object"}function Ue(e){return typeof e=="string"||typeof e=="symbol"}const $={path:"/",name:void 0,params:{},query:{},hash:"",fullPath:"/",matched:[],meta:{},redirectedFrom:void 0},De=Symbol("");var Oe;(function(e){e[e.aborted=4]="aborted",e[e.cancelled=8]="cancelled",e[e.duplicated=16]="duplicated"})(Oe||(Oe={}));function K(e,t){return S(new Error,{type:e,[De]:!0},t)}function T(e,t){return e instanceof Error&&De in e&&(t==null||!!(e.type&t))}const be="[^/]+?",Ct={sensitive:!1,strict:!1,start:!0,end:!0},kt=/[.+*?^${}()[\]/\\]/g;function At(e,t){const n=S({},Ct,t),r=[];let o=n.start?"^":"";const l=[];for(const f of e){const s=f.length?[]:[90];n.strict&&!f.length&&(o+="/");for(let a=0;a<f.length;a++){const u=f[a];let m=40+(n.sensitive?.25:0);if(u.type===0)a||(o+="/"),o+=u.value.replace(kt,"\\$&"),m+=40;else if(u.type===1){const{value:R,repeatable:k,optional:C,regexp:P}=u;l.push({name:R,repeatable:k,optional:C});const w=P||be;if(w!==be){m+=10;try{new RegExp(`(${w})`)}catch(M){throw new Error(`Invalid custom RegExp for param "${R}" (${w}): `+M.message)}}let b=k?`((?:${w})(?:/(?:${w}))*)`:`(${w})`;a||(b=C&&f.length<2?`(?:/${b})`:"/"+b),C&&(b+="?"),o+=b,m+=20,C&&(m+=-8),k&&(m+=-20),w===".*"&&(m+=-50)}s.push(m)}r.push(s)}if(n.strict&&n.end){const f=r.length-1;r[f][r[f].length-1]+=.7000000000000001}n.strict||(o+="/?"),n.end?o+="$":n.strict&&(o+="(?:/|$)");const d=new RegExp(o,n.sensitive?"":"i");function g(f){const s=f.match(d),a={};if(!s)return null;for(let u=1;u<s.length;u++){const m=s[u]||"",R=l[u-1];a[R.name]=m&&R.repeatable?m.split("/"):m}return a}function i(f){let s="",a=!1;for(const u of e){(!a||!s.endsWith("/"))&&(s+="/"),a=!1;for(const m of u)if(m.type===0)s+=m.value;else if(m.type===1){const{value:R,repeatable:k,optional:C}=m,P=R in f?f[R]:"";if(I(P)&&!k)throw new Error(`Provided param "${R}" is an array but it is not repeatable (* or + modifiers)`);const w=I(P)?P.join("/"):P;if(!w)if(C)u.length<2&&(s.endsWith("/")?s=s.slice(0,-1):a=!0);else throw new Error(`Missing required param "${R}"`);s+=w}}return s||"/"}return{re:d,score:r,keys:l,parse:g,stringify:i}}function Ot(e,t){let n=0;for(;n<e.length&&n<t.length;){const r=t[n]-e[n];if(r)return r;n++}return e.length<t.length?e.length===1&&e[0]===40+40?-1:1:e.length>t.length?t.length===1&&t[0]===40+40?1:-1:0}function bt(e,t){let n=0;const r=e.score,o=t.score;for(;n<r.length&&n<o.length;){const l=Ot(r[n],o[n]);if(l)return l;n++}if(Math.abs(o.length-r.length)===1){if(xe(r))return 1;if(xe(o))return-1}return o.length-r.length}function xe(e){const t=e[e.length-1];return e.length>0&&t[t.length-1]<0}const xt={type:0,value:""},Mt=/[a-zA-Z0-9_]/;function Nt(e){if(!e)return[[]];if(e==="/")return[[xt]];if(!e.startsWith("/"))throw new Error(`Invalid path "${e}"`);function t(m){throw new Error(`ERR (${n})/"${f}": ${m}`)}let n=0,r=n;const o=[];let l;function d(){l&&o.push(l),l=[]}let g=0,i,f="",s="";function a(){!f||(n===0?l.push({type:0,value:f}):n===1||n===2||n===3?(l.length>1&&(i==="*"||i==="+")&&t(`A repeatable param (${f}) must be alone in its segment. eg: '/:ids+.`),l.push({type:1,value:f,regexp:s,repeatable:i==="*"||i==="+",optional:i==="*"||i==="?"})):t("Invalid state to consume buffer"),f="")}function u(){f+=i}for(;g<e.length;){if(i=e[g++],i==="\\"&&n!==2){r=n,n=4;continue}switch(n){case 0:i==="/"?(f&&a(),d()):i===":"?(a(),n=1):u();break;case 4:u(),n=r;break;case 1:i==="("?n=2:Mt.test(i)?u():(a(),n=0,i!=="*"&&i!=="?"&&i!=="+"&&g--);break;case 2:i===")"?s[s.length-1]=="\\"?s=s.slice(0,-1)+i:n=3:s+=i;break;case 3:a(),n=0,i!=="*"&&i!=="?"&&i!=="+"&&g--,s="";break;default:t("Unknown state");break}}return n===2&&t(`Unfinished custom RegExp for param "${f}"`),a(),d(),o}function It(e,t,n){const r=At(Nt(e.path),n),o=S(r,{record:e,parent:t,children:[],alias:[]});return t&&!o.record.aliasOf==!t.record.aliasOf&&t.children.push(o),o}function Lt(e,t){const n=[],r=new Map;t=Ie({strict:!1,end:!0,sensitive:!1},t);function o(s){return r.get(s)}function l(s,a,u){const m=!u,R=Tt(s);R.aliasOf=u&&u.record;const k=Ie(t,s),C=[R];if("alias"in s){const b=typeof s.alias=="string"?[s.alias]:s.alias;for(const M of b)C.push(S({},R,{components:u?u.record.components:R.components,path:M,aliasOf:u?u.record:R}))}let P,w;for(const b of C){const{path:M}=b;if(a&&M[0]!=="/"){const H=a.record.path,L=H[H.length-1]==="/"?"":"/";b.path=a.record.path+(M&&L+M)}if(P=It(b,a,k),u?u.alias.push(P):(w=w||P,w!==P&&w.alias.push(P),m&&s.name&&!Ne(P)&&d(s.name)),R.children){const H=R.children;for(let L=0;L<H.length;L++)l(H[L],P,u&&u.children[L])}u=u||P,i(P)}return w?()=>{d(w)}:W}function d(s){if(Ue(s)){const a=r.get(s);a&&(r.delete(s),n.splice(n.indexOf(a),1),a.children.forEach(d),a.alias.forEach(d))}else{const a=n.indexOf(s);a>-1&&(n.splice(a,1),s.record.name&&r.delete(s.record.name),s.children.forEach(d),s.alias.forEach(d))}}function g(){return n}function i(s){let a=0;for(;a<n.length&&bt(s,n[a])>=0&&(s.record.path!==n[a].record.path||!Qe(s,n[a]));)a++;n.splice(a,0,s),s.record.name&&!Ne(s)&&r.set(s.record.name,s)}function f(s,a){let u,m={},R,k;if("name"in s&&s.name){if(u=r.get(s.name),!u)throw K(1,{location:s});k=u.record.name,m=S(Me(a.params,u.keys.filter(w=>!w.optional).map(w=>w.name)),s.params&&Me(s.params,u.keys.map(w=>w.name))),R=u.stringify(m)}else if("path"in s)R=s.path,u=n.find(w=>w.re.test(R)),u&&(m=u.parse(R),k=u.record.name);else{if(u=a.name?r.get(a.name):n.find(w=>w.re.test(a.path)),!u)throw K(1,{location:s,currentLocation:a});k=u.record.name,m=S({},a.params,s.params),R=u.stringify(m)}const C=[];let P=u;for(;P;)C.unshift(P.record),P=P.parent;return{name:k,path:R,params:m,matched:C,meta:jt(C)}}return e.forEach(s=>l(s)),{addRoute:l,resolve:f,removeRoute:d,getRoutes:g,getRecordMatcher:o}}function Me(e,t){const n={};for(const r of t)r in e&&(n[r]=e[r]);return n}function Tt(e){return{path:e.path,redirect:e.redirect,name:e.name,meta:e.meta||{},aliasOf:void 0,beforeEnter:e.beforeEnter,props:$t(e),children:e.children||[],instances:{},leaveGuards:new Set,updateGuards:new Set,enterCallbacks:{},components:"components"in e?e.components||null:e.component&&{default:e.component}}}function $t(e){const t={},n=e.props||!1;if("component"in e)t.default=n;else for(const r in e.components)t[r]=typeof n=="boolean"?n:n[r];return t}function Ne(e){for(;e;){if(e.record.aliasOf)return!0;e=e.parent}return!1}function jt(e){return e.reduce((t,n)=>S(t,n.meta),{})}function Ie(e,t){const n={};for(const r in e)n[r]=r in t?t[r]:e[r];return n}function Qe(e,t){return t.children.some(n=>n===e||Qe(e,n))}const Fe=/#/g,Ht=/&/g,Bt=/\//g,qt=/=/g,zt=/\?/g,We=/\+/g,Gt=/%5B/g,Kt=/%5D/g,Ye=/%5E/g,Vt=/%60/g,Xe=/%7B/g,Ut=/%7C/g,Ze=/%7D/g,Dt=/%20/g;function ge(e){return encodeURI(""+e).replace(Ut,"|").replace(Gt,"[").replace(Kt,"]")}function Qt(e){return ge(e).replace(Xe,"{").replace(Ze,"}").replace(Ye,"^")}function de(e){return ge(e).replace(We,"%2B").replace(Dt,"+").replace(Fe,"%23").replace(Ht,"%26").replace(Vt,"`").replace(Xe,"{").replace(Ze,"}").replace(Ye,"^")}function Ft(e){return de(e).replace(qt,"%3D")}function Wt(e){return ge(e).replace(Fe,"%23").replace(zt,"%3F")}function Yt(e){return e==null?"":Wt(e).replace(Bt,"%2F")}function J(e){try{return decodeURIComponent(""+e)}catch{}return""+e}function Xt(e){const t={};if(e===""||e==="?")return t;const r=(e[0]==="?"?e.slice(1):e).split("&");for(let o=0;o<r.length;++o){const l=r[o].replace(We," "),d=l.indexOf("="),g=J(d<0?l:l.slice(0,d)),i=d<0?null:J(l.slice(d+1));if(g in t){let f=t[g];I(f)||(f=t[g]=[f]),f.push(i)}else t[g]=i}return t}function Le(e){let t="";for(let n in e){const r=e[n];if(n=Ft(n),r==null){r!==void 0&&(t+=(t.length?"&":"")+n);continue}(I(r)?r.map(l=>l&&de(l)):[r&&de(r)]).forEach(l=>{l!==void 0&&(t+=(t.length?"&":"")+n,l!=null&&(t+="="+l))})}return t}function Zt(e){const t={};for(const n in e){const r=e[n];r!==void 0&&(t[n]=I(r)?r.map(o=>o==null?null:""+o):r==null?r:""+r)}return t}const Jt=Symbol(""),Te=Symbol(""),te=Symbol(""),ve=Symbol(""),pe=Symbol("");function Q(){let e=[];function t(r){return e.push(r),()=>{const o=e.indexOf(r);o>-1&&e.splice(o,1)}}function n(){e=[]}return{add:t,list:()=>e,reset:n}}function j(e,t,n,r,o){const l=r&&(r.enterCallbacks[o]=r.enterCallbacks[o]||[]);return()=>new Promise((d,g)=>{const i=a=>{a===!1?g(K(4,{from:n,to:t})):a instanceof Error?g(a):_t(a)?g(K(2,{from:t,to:a})):(l&&r.enterCallbacks[o]===l&&typeof a=="function"&&l.push(a),d())},f=e.call(r&&r.instances[o],t,n,i);let s=Promise.resolve(f);e.length<3&&(s=s.then(i)),s.catch(a=>g(a))})}function fe(e,t,n,r){const o=[];for(const l of e)for(const d in l.components){let g=l.components[d];if(!(t!=="beforeRouteEnter"&&!l.instances[d]))if(en(g)){const f=(g.__vccOpts||g)[t];f&&o.push(j(f,n,r,l,d))}else{let i=g();o.push(()=>i.then(f=>{if(!f)return Promise.reject(new Error(`Couldn't resolve component "${d}" at "${l.path}"`));const s=ct(f)?f.default:f;l.components[d]=s;const u=(s.__vccOpts||s)[t];return u&&j(u,n,r,l,d)()}))}}return o}function en(e){return typeof e=="object"||"displayName"in e||"props"in e||"__vccOpts"in e}function $e(e){const t=B(te),n=B(ve),r=N(()=>t.resolve(F(e.to))),o=N(()=>{const{matched:i}=r.value,{length:f}=i,s=i[f-1],a=n.matched;if(!s||!a.length)return-1;const u=a.findIndex(G.bind(null,s));if(u>-1)return u;const m=je(i[f-2]);return f>1&&je(s)===m&&a[a.length-1].path!==m?a.findIndex(G.bind(null,i[f-2])):u}),l=N(()=>o.value>-1&&on(n.params,r.value.params)),d=N(()=>o.value>-1&&o.value===n.matched.length-1&&Ke(n.params,r.value.params));function g(i={}){return rn(i)?t[F(e.replace)?"replace":"push"](F(e.to)).catch(W):Promise.resolve()}return{route:r,href:N(()=>r.value.href),isActive:l,isExactActive:d,navigate:g}}const tn=ze({name:"RouterLink",compatConfig:{MODE:3},props:{to:{type:[String,Object],required:!0},replace:Boolean,activeClass:String,exactActiveClass:String,custom:Boolean,ariaCurrentValue:{type:String,default:"page"}},useLink:$e,setup(e,{slots:t}){const n=qe($e(e)),{options:r}=B(te),o=N(()=>({[He(e.activeClass,r.linkActiveClass,"router-link-active")]:n.isActive,[He(e.exactActiveClass,r.linkExactActiveClass,"router-link-exact-active")]:n.isExactActive}));return()=>{const l=t.default&&t.default(n);return e.custom?l:Ge("a",{"aria-current":n.isExactActive?e.ariaCurrentValue:null,href:n.href,onClick:n.navigate,class:o.value},l)}}}),nn=tn;function rn(e){if(!(e.metaKey||e.altKey||e.ctrlKey||e.shiftKey)&&!e.defaultPrevented&&!(e.button!==void 0&&e.button!==0)){if(e.currentTarget&&e.currentTarget.getAttribute){const t=e.currentTarget.getAttribute("target");if(/\b_blank\b/i.test(t))return}return e.preventDefault&&e.preventDefault(),!0}}function on(e,t){for(const n in t){const r=t[n],o=e[n];if(typeof r=="string"){if(r!==o)return!1}else if(!I(o)||o.length!==r.length||r.some((l,d)=>l!==o[d]))return!1}return!0}function je(e){return e?e.aliasOf?e.aliasOf.path:e.path:""}const He=(e,t,n)=>e!=null?e:t!=null?t:n,sn=ze({name:"RouterView",inheritAttrs:!1,props:{name:{type:String,default:"default"},route:Object},compatConfig:{MODE:3},setup(e,{attrs:t,slots:n}){const r=B(pe),o=N(()=>e.route||r.value),l=B(Te,0),d=N(()=>{let f=F(l);const{matched:s}=o.value;let a;for(;(a=s[f])&&!a.components;)f++;return f}),g=N(()=>o.value.matched[d.value]);ae(Te,N(()=>d.value+1)),ae(Jt,g),ae(pe,o);const i=ot();return st(()=>[i.value,g.value,e.name],([f,s,a],[u,m,R])=>{s&&(s.instances[a]=f,m&&m!==s&&f&&f===u&&(s.leaveGuards.size||(s.leaveGuards=m.leaveGuards),s.updateGuards.size||(s.updateGuards=m.updateGuards))),f&&s&&(!m||!G(s,m)||!u)&&(s.enterCallbacks[a]||[]).forEach(k=>k(f))},{flush:"post"}),()=>{const f=o.value,s=e.name,a=g.value,u=a&&a.components[s];if(!u)return Be(n.default,{Component:u,route:f});const m=a.props[s],R=m?m===!0?f.params:typeof m=="function"?m(f):m:null,C=Ge(u,S({},R,t,{onVnodeUnmounted:P=>{P.component.isUnmounted&&(a.instances[s]=null)},ref:i}));return Be(n.default,{Component:C,route:f})||C}}});function Be(e,t){if(!e)return null;const n=e(t);return n.length===1?n[0]:n}const cn=sn;function fn(e){const t=Lt(e.routes,e),n=e.parseQuery||Xt,r=e.stringifyQuery||Le,o=e.history,l=Q(),d=Q(),g=Q(),i=nt($);let f=$;z&&e.scrollBehavior&&"scrollRestoration"in history&&(history.scrollRestoration="manual");const s=le.bind(null,c=>""+c),a=le.bind(null,Yt),u=le.bind(null,J);function m(c,p){let h,v;return Ue(c)?(h=t.getRecordMatcher(c),v=p):v=c,t.addRoute(v,h)}function R(c){const p=t.getRecordMatcher(c);p&&t.removeRoute(p)}function k(){return t.getRoutes().map(c=>c.record)}function C(c){return!!t.getRecordMatcher(c)}function P(c,p){if(p=S({},p||i.value),typeof c=="string"){const y=ue(n,c,p.path),O=t.resolve({path:y.path},p),D=o.createHref(y.fullPath);return S(y,O,{params:u(O.params),hash:J(y.hash),redirectedFrom:void 0,href:D})}let h;if("path"in c)h=S({},c,{path:ue(n,c.path,p.path).path});else{const y=S({},c.params);for(const O in y)y[O]==null&&delete y[O];h=S({},c,{params:a(c.params)}),p.params=a(p.params)}const v=t.resolve(h,p),_=c.hash||"";v.params=s(u(v.params));const A=lt(r,S({},c,{hash:Qt(_),path:v.path})),E=o.createHref(A);return S({fullPath:A,hash:_,query:r===Le?Zt(c.query):c.query||{}},v,{redirectedFrom:void 0,href:E})}function w(c){return typeof c=="string"?ue(n,c,i.value.path):S({},c)}function b(c,p){if(f!==c)return K(8,{from:p,to:c})}function M(c){return V(c)}function H(c){return M(S(w(c),{replace:!0}))}function L(c){const p=c.matched[c.matched.length-1];if(p&&p.redirect){const{redirect:h}=p;let v=typeof h=="function"?h(c):h;return typeof v=="string"&&(v=v.includes("?")||v.includes("#")?v=w(v):{path:v},v.params={}),S({query:c.query,hash:c.hash,params:"path"in v?{}:c.params},v)}}function V(c,p){const h=f=P(c),v=i.value,_=c.state,A=c.force,E=c.replace===!0,y=L(h);if(y)return V(S(w(y),{state:typeof y=="object"?S({},_,y.state):_,force:A,replace:E}),p||h);const O=h;O.redirectedFrom=p;let D;return!A&&ut(r,v,h)&&(D=K(16,{to:O,from:v}),Pe(v,v,!0,!1)),(D?Promise.resolve(D):ye(O,v)).catch(x=>T(x)?T(x,2)?x:oe(x):re(x,O,v)).then(x=>{if(x){if(T(x,2))return V(S({replace:E},w(x.to),{state:typeof x.to=="object"?S({},_,x.to.state):_,force:A}),p||O)}else x=Ee(O,v,!0,E,_);return Re(O,v,x),x})}function Je(c,p){const h=b(c,p);return h?Promise.reject(h):Promise.resolve()}function ye(c,p){let h;const[v,_,A]=an(c,p);h=fe(v.reverse(),"beforeRouteLeave",c,p);for(const y of v)y.leaveGuards.forEach(O=>{h.push(j(O,c,p))});const E=Je.bind(null,c,p);return h.push(E),q(h).then(()=>{h=[];for(const y of l.list())h.push(j(y,c,p));return h.push(E),q(h)}).then(()=>{h=fe(_,"beforeRouteUpdate",c,p);for(const y of _)y.updateGuards.forEach(O=>{h.push(j(O,c,p))});return h.push(E),q(h)}).then(()=>{h=[];for(const y of c.matched)if(y.beforeEnter&&!p.matched.includes(y))if(I(y.beforeEnter))for(const O of y.beforeEnter)h.push(j(O,c,p));else h.push(j(y.beforeEnter,c,p));return h.push(E),q(h)}).then(()=>(c.matched.forEach(y=>y.enterCallbacks={}),h=fe(A,"beforeRouteEnter",c,p),h.push(E),q(h))).then(()=>{h=[];for(const y of d.list())h.push(j(y,c,p));return h.push(E),q(h)}).catch(y=>T(y,8)?y:Promise.reject(y))}function Re(c,p,h){for(const v of g.list())v(c,p,h)}function Ee(c,p,h,v,_){const A=b(c,p);if(A)return A;const E=p===$,y=z?history.state:{};h&&(v||E?o.replace(c.fullPath,S({scroll:E&&y&&y.scroll},_)):o.push(c.fullPath,_)),i.value=c,Pe(c,p,h,E),oe()}let U;function et(){U||(U=o.listen((c,p,h)=>{if(!Se.listening)return;const v=P(c),_=L(v);if(_){V(S(_,{replace:!0}),v).catch(W);return}f=v;const A=i.value;z&&yt(ke(A.fullPath,h.delta),ee()),ye(v,A).catch(E=>T(E,12)?E:T(E,2)?(V(E.to,v).then(y=>{T(y,20)&&!h.delta&&h.type===X.pop&&o.go(-1,!1)}).catch(W),Promise.reject()):(h.delta&&o.go(-h.delta,!1),re(E,v,A))).then(E=>{E=E||Ee(v,A,!1),E&&(h.delta&&!T(E,8)?o.go(-h.delta,!1):h.type===X.pop&&T(E,20)&&o.go(-1,!1)),Re(v,A,E)}).catch(W)}))}let ne=Q(),we=Q(),Z;function re(c,p,h){oe(c);const v=we.list();return v.length?v.forEach(_=>_(c,p,h)):console.error(c),Promise.reject(c)}function tt(){return Z&&i.value!==$?Promise.resolve():new Promise((c,p)=>{ne.add([c,p])})}function oe(c){return Z||(Z=!c,et(),ne.list().forEach(([p,h])=>c?h(c):p()),ne.reset()),c}function Pe(c,p,h,v){const{scrollBehavior:_}=e;if(!z||!_)return Promise.resolve();const A=!h&&Rt(ke(c.fullPath,0))||(v||!h)&&history.state&&history.state.scroll||null;return rt().then(()=>_(c,p,A)).then(E=>E&&vt(E)).catch(E=>re(E,c,p))}const se=c=>o.go(c);let ce;const ie=new Set,Se={currentRoute:i,listening:!0,addRoute:m,removeRoute:R,hasRoute:C,getRoutes:k,resolve:P,options:e,push:M,replace:H,go:se,back:()=>se(-1),forward:()=>se(1),beforeEach:l.add,beforeResolve:d.add,afterEach:g.add,onError:we.add,isReady:tt,install(c){const p=this;c.component("RouterLink",nn),c.component("RouterView",cn),c.config.globalProperties.$router=p,Object.defineProperty(c.config.globalProperties,"$route",{enumerable:!0,get:()=>F(i)}),z&&!ce&&i.value===$&&(ce=!0,M(o.location).catch(_=>{}));const h={};for(const _ in $)h[_]=N(()=>i.value[_]);c.provide(te,p),c.provide(ve,qe(h)),c.provide(pe,i);const v=c.unmount;ie.add(c),c.unmount=function(){ie.delete(c),ie.size<1&&(f=$,U&&U(),U=null,i.value=$,ce=!1,Z=!1),v()}}};return Se}function q(e){return e.reduce((t,n)=>t.then(()=>n()),Promise.resolve())}function an(e,t){const n=[],r=[],o=[],l=Math.max(t.matched.length,e.matched.length);for(let d=0;d<l;d++){const g=t.matched[d];g&&(e.matched.find(f=>G(f,g))?r.push(g):n.push(g));const i=e.matched[d];i&&(t.matched.find(f=>G(f,i))||o.push(i))}return[n,r,o]}function hn(){return B(te)}function dn(){return B(ve)}/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */var me=function(e,t){return me=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(n,r){n.__proto__=r}||function(n,r){for(var o in r)Object.prototype.hasOwnProperty.call(r,o)&&(n[o]=r[o])},me(e,t)};function pn(e,t){if(typeof t!="function"&&t!==null)throw new TypeError("Class extends value "+String(t)+" is not a constructor or null");me(e,t);function n(){this.constructor=e}e.prototype=t===null?Object.create(t):(n.prototype=t.prototype,new n)}export{pn as _,un as a,dn as b,fn as c,hn as u};
