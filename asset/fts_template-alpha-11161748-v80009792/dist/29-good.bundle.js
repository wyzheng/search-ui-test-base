(window.webpackJsonp=window.webpackJsonp||[]).push([[117],{1223:function(e,t,i){},1860:function(e,t,i){"use strict";i(1223)},2264:function(e,t,i){"use strict";i.r(t);var s=i(39),c=i(0),o=i(16),n={mixins:[s.a],props:{data:{type:Object,default:function(){return{}}},item:{type:Object,default:function(){return{}}},pos:{type:Number,default:0},typePos:{type:Number,default:0}},computed:{descList:function(){return this.item.source&&this.item.source.descList&&this.item.source.descList.length?this.item.source.descList:null}},methods:{tap:function(){this.M_startDetail({debugMode:this.item.debugMode,appVersion:this.item.appVersion}),c.h,this.M_clickReport(),Object(o.g)(c.l.detail2.goodThing)}}},a=(i(1860),i(4)),r=Object(a.a)(n,(function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{directives:[{name:"active",rawName:"v-active"}],staticClass:"active__item",attrs:{"data-id":e.M_exposeId()},on:{click:e.tap}},[i("div",{staticClass:"search_item_inner"},[i("online-image",{staticClass:"good-circle__icon",attrs:{url:e.item.iconUrl}}),i("div",{staticClass:"good-circle__info"},[i("div",{staticClass:"good-circle__title",domProps:{innerHTML:e._s(e.xss(e.item.title))}}),i("div",{staticClass:"good-circle__desc ellipsis_2",domProps:{innerHTML:e._s(e.xss(e.item.desc))}}),i("div",{staticClass:"good-circle__source line"},[e.descList?i("div",{staticClass:"good-circle__source-descs line__item ellipsis_1"},e._l(e.descList,(function(t){return i("span",{key:t,staticClass:"good-circle__source-desc"},[e._v(e._s(t))])})),0):e._e(),i("div",{staticClass:"line__item end primary no-wrap"},[e._v("\n          "+e._s(e.item.source.recommend)+"\n        ")])])])],1)])}),[],!1,null,null,null);t.default=r.exports}}]);