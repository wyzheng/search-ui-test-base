(window.webpackJsonp=window.webpackJsonp||[]).push([[21],{1582:function(t,e,n){},2283:function(t,e,n){"use strict";n.r(e);var o=n(1),r=n.n(o),a=n(69),i=n(0);function c(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(t);e&&(o=o.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,o)}return n}function p(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?c(Object(n),!0).forEach((function(e){r()(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):c(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}var s={name:"BlockHeader",components:{blockHeader:a.a},mixins:[i.k,i.m],props:{source:{type:Object,default:function(){return{}}},data:{type:Object,default:function(){return{}}},item:{type:Object,default:function(){return{}}},pos:{type:Number,default:0},typePos:{type:Number,default:0},handler:{type:Object,default:function(){return{}}}},computed:{itemInfo:function(){return this.source||this.item}},methods:{prefixParam:function(t){return p(p({},t),{},{docPos:this.pos,pos:this.pos,typePos:this.typePos,docId:this.item.docID})},onTapMore:function(t){this.handler.tapMore(this.prefixParam(t))},onTapAction:function(t){this.handler.tapAction(this.prefixParam(t))},onTapNotice:function(t){this.handler.tapNotice(this.prefixParam(t))},onTapButton:function(t){this.handler.tapButton(this.prefixParam(t))},onReport:function(t){this.handler.tapReport(this.prefixParam(t))},onReplaceItems:function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,n=arguments.length>2?arguments[2]:void 0;this.handler.tapReplaceItems(t,e,n)}}},u=(n(2406),n(4)),f=Object(u.a)(s,(function(){var t=this,e=t.$createElement;return(t._self._c||e)("block-header",t._b({staticClass:"sub-item-block-header",class:{"is-zone-header":t.item.isZoneHeader,"with-zone-config":t.data.zoneConfig},on:{"tap:more":t.onTapMore,"tap:action":t.onTapAction,"tap:notice":t.onTapNotice,"tap:button":t.onTapButton,report:t.onReport,"replace-items":t.onReplaceItems}},"block-header",{d:Object.assign({},t.data,{header:t.itemInfo.blockHd}),typePos:t.typePos,parentDocReportId:t.docReportId},!1))}),[],!1,null,"f2ac40ce",null);e.default=f.exports},2406:function(t,e,n){"use strict";n(1582)}}]);