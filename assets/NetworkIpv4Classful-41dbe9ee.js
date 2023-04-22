var p=Object.defineProperty;var k=(a,t,e)=>t in a?p(a,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):a[t]=e;var i=(a,t,e)=>(k(a,typeof t!="symbol"?t+"":t,e),e);import{d as w,a as _,b as f,e as v,w as C,o as c,f as d,g as h,v as x,h as o,n as B,i as N,t as D,j as I,k as V}from"./index-e2c8859e.js";import{B as b,M as g,D as u,_ as M,a as A,A as E}from"./BaseNetworkIpv4Info.vue_vue_type_script_setup_true_lang-57a762da.js";class l extends b{constructor(e){const s=l._resolveClass(e);super(e,l.maskFromClass(s));i(this,"class");this.class=s}static _resolveClass(e){const s=e.decimalValue.octets[0];if(s>=0&&s<=127)return"A";if(s>=128&&s<=191)return"B";if(s>=192&&s<=223)return"C";if(s>=224&&s<=239)return"D";if(s>=240&&s<=255)return"E";throw new Error(`Invalid IP address: ${e.decimalValue.value}`)}static maskFromClass(e){const s=new Map([["A","255.0.0.0"],["B","255.255.0.0"],["C","255.255.255.0"],["D","240.0.0.0"],["E","248.0.0.0"]]);return new g(new u(s.get(e)))}}const F={class:"p-2 border-green-700 border-2"},y=o("h1",{class:"text-xl"},"Classful network",-1),P=o("p",{class:"text-sm"},"Detect network class and display its info",-1),T=o("label",{for:"inputName"},"IP: ",-1),$={key:0},j={class:"p-1 rounded-sm bg-slate-300 text-sm font-mono"},U=w({__name:"NetworkIpv4Classful",setup(a){const t=_(""),e=f({network:null}),s=r=>{if(!u.isValid(r)&&!A.isValid(r)){e.network=null;return}const n=new E(r);e.network=new l(n)};return v(()=>{s(t.value)}),C(t,s),(r,n)=>(c(),d("div",F,[y,P,T,h(o("input",{id:"inputName","onUpdate:modelValue":n[0]||(n[0]=m=>t.value=m),class:B([e.network==null&&t.value?"text-red-500":"text-green-500","border"])},null,2),[[x,t.value]]),e.network?(c(),d("div",$,[o("div",null,[N(" class: "),o("span",j,D(e.network.class),1)]),I(M,{network:e.network},null,8,["network"])])):V("",!0)]))}});export{U as default};