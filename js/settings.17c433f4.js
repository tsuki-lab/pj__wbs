(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["settings"],{b41f:function(e,t,a){"use strict";a.r(t);var n=a("7a23");const c=Object(n["g"])("h1",{class:"ml-4 text-4xl font-bold"}," Settings ",-1),l={class:"w-3/6 px-4"},o=Object(n["g"])("h2",{class:"text-2xl font-bold"}," Categories ",-1),s={class:"flex justify-end mx-2"};function b(e,t,a,b,r,u){const d=Object(n["v"])("InputLabel");return Object(n["q"])(),Object(n["d"])(n["a"],null,[c,Object(n["g"])("div",l,[o,Object(n["g"])("ul",null,[(Object(n["q"])(!0),Object(n["d"])(n["a"],null,Object(n["u"])(e.categories,t=>(Object(n["q"])(),Object(n["d"])("li",{key:t.id,class:"flex justify-between mb-2"},[Object(n["g"])(d,{value:t.name,"onUpdate:value":e=>t.name=e,type:"text",placeholder:"（例）設計全般",label:"種別名"},null,8,["value","onUpdate:value"]),Object(n["g"])("button",{class:"w-6 h-6 mr-4 button-close",onClick:a=>e.deleteCategory(t)},null,8,["onClick"])]))),128))]),Object(n["g"])("div",s,[Object(n["g"])("button",{onClick:t[1]||(t[1]=(...t)=>e.addCreateCategory&&e.addCreateCategory(...t))}," 種別を追加 ")])])],64)}var r=a("f875"),u=a("62fe"),d=r["a"].addCreateCategory,i=r["a"].deleteCategories,g=Object(n["h"])({name:"Settings",components:{InputLabel:u["a"]},setup:function(){return{categories:Object(n["b"])((function(){return r["a"].categories})),addCreateCategory:d,deleteCategory:function(e){i({categoriesToDel:[e]})}}}});g.render=b;t["default"]=g}}]);