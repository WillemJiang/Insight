import{b as N}from"./vendor.4ad96017.js";import{P as S,b as a,g as o}from"./getSeries.9d57ace6.js";import{_ as j}from"./index.8f9ef17a.js";import{i as w,l as x,w as R,o as A,e as O,f as z,g as B,u,G as y}from"./@vue.1f0a3c9a.js";import"./echarts.4de0c91d.js";import"./zrender.80041eb6.js";const U={class:"project-info-box"},V=y('<div class="charts-box" data-v-5be74c97><div id="PMC" class="graph" data-v-5be74c97></div><div id="PARTICIPANT" class="graph" data-v-5be74c97></div><div id="ISSUE-OPEN" class="graph" data-v-5be74c97></div><div id="COMMENT" class="graph" data-v-5be74c97></div><div id="PR" class="graph" data-v-5be74c97></div></div>',1),k={__name:"SingleProjectTemplate",props:{isExpand:Boolean},setup(_){const f=_,t=({domId:n,chart:r,fun:T,config:E,title:M})=>{const p=document.getElementById(n);return p.removeAttribute("_echarts_instance_"),r=T(M,p,E,r),r},v=N(),P=w("committee").committees,m=v.query.main,e=P[m];let c=null;const h=function(){c=t({domId:"PMC",title:"PMC GROWTH",chart:c,fun:a,config:o.bar([{name:"PMC",data:e.pmc}])})};let s=null;const I=function(){s=t({domId:"ISSUE-OPEN",title:"ISSUE-OPEN",chart:s,fun:a,config:o.bar([{name:"issue open",data:e.repo.oi}])})};let i=null;const b=function(){i=t({domId:"PR",title:"PR",chart:i,fun:a,config:o.bar([{name:"open pull",data:e.repo.op},{name:"merge pull",data:e.repo.pm}])})};let d=null;const g=function(){d=t({domId:"COMMENT",title:"COMMENTS",chart:d,fun:a,config:o.bar([{name:"issue comment",data:e.repo.ic},{name:"review comment",data:e.repo.rc}])})};let l=null;const C=function(){l=t({domId:"PARTICIPANT",title:"PARTICIPANT",chart:l,fun:a,config:o.bar([{name:"participant",data:e.repo.p}])})};return x(()=>{h(),I(),b(),C(),g()}),R(()=>f.isExpand,()=>{let n=setInterval(()=>{c.resize(),s.resize(),i.resize(),d.resize(),l.resize()},10);setTimeout(()=>{clearInterval(n)},300)}),(n,r)=>(A(),O("main",null,[z("div",U,[B(S,{name:u(m),project_info:u(e)},null,8,["name","project_info"]),V])]))}},F=j(k,[["__scopeId","data-v-5be74c97"]]);export{F as default};