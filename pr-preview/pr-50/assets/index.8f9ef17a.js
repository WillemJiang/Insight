import{b,o as g,e as y,f as d,g as h,j as E,k as w,F as q,l as B,a as S,m as O,q as T,t as j,v as N}from"./@vue.1f0a3c9a.js";import{c as P,a as H}from"./vendor.4ad96017.js";import{i as x}from"./echarts.4de0c91d.js";import"./zrender.80041eb6.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))s(e);new MutationObserver(e=>{for(const o of e)if(o.type==="childList")for(const l of o.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&s(l)}).observe(document,{childList:!0,subtree:!0});function n(e){const o={};return e.integrity&&(o.integrity=e.integrity),e.referrerpolicy&&(o.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?o.credentials="include":e.crossorigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function s(e){if(e.ep)return;e.ep=!0;const o=n(e);fetch(e.href,o)}})();const k=(r,t)=>{const n=r.__vccOpts||r;for(const[s,e]of t)n[s]=e;return n},L={},V={class:"header-bar"},U={class:"header-nav"},D=w("global"),Q=w("projects");function $(r,t){const n=b("RouterLink");return g(),y("header",V,[d("nav",U,[h(n,{class:"header-link",to:"/"},{default:E(()=>[D]),_:1}),h(n,{class:"header-link",to:"/projects"},{default:E(()=>[Q]),_:1})])])}const M=k(L,[["render",$],["__scopeId","data-v-3f84875e"]]);const G={__name:"App",setup(r){return(t,n)=>{const s=b("RouterView");return g(),y(q,null,[h(M),h(s,{class:"main-box"})],64)}}},C=k(G,[["__scopeId","data-v-f3729390"]]),F="modulepreload",J=function(r,t){return new URL(r,t).href},A={},_=function(t,n,s){return!n||n.length===0?t():Promise.all(n.map(e=>{if(e=J(e,s),e in A)return;A[e]=!0;const o=e.endsWith(".css"),l=o?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${e}"]${l}`))return;const i=document.createElement("link");if(i.rel=o?"stylesheet":F,o||(i.as="script",i.crossOrigin=""),i.href=e,document.head.appendChild(i),o)return new Promise((v,p)=>{i.addEventListener("load",v),i.addEventListener("error",()=>p(new Error(`Unable to preload CSS for ${e}`)))})})).then(()=>t())};function X(r,t,n){t!=null&&t!=""&&t!=null&&t.dispose(),t=x(r);const s={title:{text:"Project Activity Rank",left:"center"},tooltip:{trigger:"item",formatter:"{b} : {c} ({d}%)"},legend:{bottom:10,left:"center",data:["Super Healthy","Healthy","Mostly Okay","Unhealthy","Action required","URGENT ACTION REQUIRED"]},series:[{type:"pie",radius:"65%",center:["50%","50%"],selectedMode:"single",data:[{value:n.filter(e=>e.rank=="Super Healthy").length,name:"Super Healthy"},{value:n.filter(e=>e.rank=="Healthy").length,name:"Healthy"},{value:n.filter(e=>e.rank=="Mostly Okay").length,name:"Mostly Okay"},{value:n.filter(e=>e.rank=="Unhealthy").length,name:"Unhealthy"},{value:n.filter(e=>e.rank=="Action required").length,name:"Action required"},{value:n.filter(e=>e.rank=="URGENT ACTION REQUIRED").length,name:"URGENT ACTION REQUIRED"}],emphasis:{itemStyle:{shadowBlur:10,shadowOffsetX:0,shadowColor:"rgba(0, 0, 0, 0.5)"}}}]};return s&&t.setOption(s),t}function W(r,t,n,s){t!=null&&t!=""&&t!=null&&t.dispose(),t=x(r);var e;return e={xAxis:{type:"value"},yAxis:{type:"category",data:n.filter(o=>o.rank==s).map(o=>o.name)},series:[{data:n.filter(o=>o.rank==s).map(o=>o.score),type:"bar",showBackground:!0,backgroundStyle:{color:"rgba(180, 180, 180, 0.2)"}}]},e&&t.setOption(e),t}const z=r=>(T("data-v-f7705236"),r=r(),j(),r),K={class:"graphic"},Y=z(()=>d("div",{class:"RanckBar",id:"RanckBar"},null,-1)),Z=[Y],ee={__name:"GlobalView",setup(r){let t=null;const n=function(a){const u=document.getElementById("QiChart");u.removeAttribute("_echarts_instance_"),t=X(u,t,a),t.on("click",c=>{const m=c.event.target.selected,I=c.name;p.value=m,m&&e(a,I)})};let s=null;const e=function(a,u){const c=document.getElementById("RanckBar");c.removeAttribute("_echarts_instance_"),s=W(c,s,a,u)},o=function(a){let u=[];for(let c in a){const m=a[c].description.split(": ")[1].replace("!","");u.push({name:c,score:a[c]["Health score"],rank:m})}return u};let l=null,i=[];const v=function(){const a=new XMLHttpRequest;a.open("get","@/../Qi/qi.json"),a.send(null),a.onload=()=>{a.status==200&&(l=JSON.parse(a.responseText),i=o(l),n(i))}};B(()=>{v()});const p=S(!1);return(a,u)=>(g(),y("main",null,[d("div",K,[d("div",{class:O(["Qi-box",{"left-chart":p.value}]),id:"QiChart"},null,2),d("div",{class:O(["project-box",{"right-chart":p.value}])},Z,2)])]))}},te=k(ee,[["__scopeId","data-v-f7705236"]]),ne=P({history:H("./"),routes:[{path:"/",name:"global",component:te},{path:"/projects",name:"projects",component:()=>_(()=>import("./ProjectsView.77630166.js"),["ProjectsView.77630166.js","ProjectsView.e3b0c442.css","@vue.1f0a3c9a.js","vendor.4ad96017.js","echarts.4de0c91d.js","zrender.80041eb6.js"],import.meta.url),children:[{path:"",name:"search",component:()=>_(()=>import("./SearchView.949b59e5.js"),["SearchView.949b59e5.js","SearchView.c25d7152.css","@vue.1f0a3c9a.js","ProjectCard.b5e1584d.js","ProjectCard.d3fb5a10.css","vendor.4ad96017.js","echarts.4de0c91d.js","zrender.80041eb6.js"],import.meta.url)},{path:"detail",name:"Detail",component:()=>_(()=>import("./ProjectDetail.58a4fb57.js"),["ProjectDetail.58a4fb57.js","ProjectDetail.33f802e6.css","@vue.1f0a3c9a.js","vendor.4ad96017.js","ProjectCard.b5e1584d.js","ProjectCard.d3fb5a10.css","echarts.4de0c91d.js","zrender.80041eb6.js"],import.meta.url),children:[{path:"project",component:()=>_(()=>import("./SingleProjectTemplate.9a68e6a6.js"),["SingleProjectTemplate.9a68e6a6.js","SingleProjectTemplate.482c2208.css","vendor.4ad96017.js","@vue.1f0a3c9a.js","getSeries.9d57ace6.js","getSeries.ae609f90.css","echarts.4de0c91d.js","zrender.80041eb6.js"],import.meta.url)},{path:"compare",component:()=>_(()=>import("./MultiProjectTemplates.0e853e6a.js"),["MultiProjectTemplates.0e853e6a.js","MultiProjectTemplates.bad1400e.css","vendor.4ad96017.js","@vue.1f0a3c9a.js","getSeries.9d57ace6.js","getSeries.ae609f90.css","echarts.4de0c91d.js","zrender.80041eb6.js"],import.meta.url)}]}]}]});function R(r,t){const n=new XMLHttpRequest;n.open("get",r),n.send(null),n.onload=()=>{n.status==200&&this.provide(t,JSON.parse(n.responseText))}}const f=N(C);R.apply(f,["@/../json/committee.json","committee"]);R.apply(f,["@/../json/projects_total.json","repo"]);R.apply(f,["@/../Qi/qi.json","qi"]);f.use(ne);f.mount("#app");export{k as _};