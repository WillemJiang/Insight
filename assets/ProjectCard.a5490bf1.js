import{i as u,a as m,l as h,o as i,e as _,y as x,B as g,f as s,C as j,u as t,D as p,E as v,m as y}from"./@vue.1f0a3c9a.js";import{_ as d}from"./index.fcc669ec.js";const b={class:"search-box"},C=["onKeyup"],S={__name:"SearchBox",emits:["search"],setup(l,{emit:e}){const c=u("committee").committees,o=m(""),a=function(){const r=Object.entries(c).filter(([n])=>n.indexOf(o.value.toLowerCase())>=0);return e("search",r),r};return h(()=>{a()}),(r,n)=>(i(),_("div",b,[x(s("input",{type:"text","onUpdate:modelValue":n[0]||(n[0]=f=>o.value=f),onKeyup:j(a,["enter"])},null,40,C),[[g,o.value]]),s("i",{class:"fa fa-search fa-lg",onClick:a})]))}},E=d(S,[["__scopeId","data-v-d6afcff1"]]);const B={key:0,class:"logo-box"},k=["src","alt"],w={key:1,class:"logo-box"},P={class:"info-box"},z={class:"project-name"},D={class:"project-description"},K={__name:"ProjectCard",props:{name:String,project_info:Object},setup(l){const e=l,c=e.name?e.name.toUpperCase():null,o=e.project_info&&e.project_info.logo?e.project_info.logo:null,a=e.project_info&&e.project_info.description?e.project_info.description:null;return(r,n)=>(i(),_("div",{class:y(["project-card-box",t(o)?"has-logo":""]),draggable:"true"},[t(o)?(i(),_("div",B,[s("img",{src:t(o),alt:l.name,class:"logo"},null,8,k)])):(i(),_("div",w,[s("i",{class:"logo-text",style:v({fontSize:25/(t(c).length+2)+"rem"})},p(t(c)),5)])),s("div",P,[s("h4",z,p(t(c)),1),s("p",D,p(t(a)),1)])],2))}},I=d(K,[["__scopeId","data-v-fc1e268e"]]);export{I as P,E as S};