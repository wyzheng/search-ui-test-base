(window.webpackJsonp=window.webpackJsonp||[]).push([[163],{1287:function(t,e,s){},1925:function(t,e,s){"use strict";s(1287)},543:function(t,e,s){"use strict";s.r(e);var i=s(0),a={name:"Hotel",mixins:[i.k,i.m],props:{source:{type:Object,default:function(){return{}}},data:{type:Object,default:function(){return{}}},item:{type:Object,default:function(){return{}}},pos:{type:Number,default:0},typePos:{type:Number,default:0}},data:function(){return{referenceText:"参考价",observer:null}},mounted:function(){var t=this;this.observer=new ResizeObserver((function(){var e=i.g.calTextRenderWidth(t.referenceText,"12px"),s=t.$refs.hotel;s&&s.forEach((function(t){var s=t.querySelector(".reference");s&&s.offsetWidth<e&&(s.style.display="none");var i=t.querySelector(".title");if(i){var a=i.getBoundingClientRect().height,o=parseFloat(window.getComputedStyle(i).lineHeight),r=Math.round(a/o),n=t.querySelector(".distance");n&&(n.style["-webkit-line-clamp"]=3-r)}}))})),this.observer.observe(this.$el),this.$on("hook:beforeDestroy",(function(){t.observer.unobserve(t.$el)}))},methods:{onTap:function(t){this.M_serviceSearchGo(t)&&this.M_clickReport({clickContent:t.title},t)},onTapTip:function(){this.M_serviceSearchGo(this.source.action)&&this.M_clickReport({clickContent:this.source.action.title},this.source.action)}}},o=(s(1925),s(4)),r=Object(o.a)(a,(function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"hotel-wrapper"},[s("div",{staticClass:"hotel-forms"},t._l(t.source.forms,(function(e,i){return s("div",{directives:[{name:"active",rawName:"v-active.stop",modifiers:{stop:!0}}],key:i,staticClass:"forms-item active__mask",attrs:{"data-report-id":t.M_itemReportId(e,"1:list|"+(i+1)+":"+t.M_getItemType(e))},on:{click:function(s){return s.stopPropagation(),t.onTap(e)}}},[s("div",[s("div",{staticClass:"title"},[t._v(t._s(e.title))]),s("div",{staticClass:"desc"},[t._v(t._s(e.desc))])]),s("ui-arrow",{attrs:{gap:"",direction:"down"}})],1)})),0),t.source.action?s("div",{directives:[{name:"active",rawName:"v-active.stop",modifiers:{stop:!0}}],staticClass:"tip active__mask",attrs:{"data-report-id":t.M_itemReportId(t.source.action)},on:{click:function(e){return e.stopPropagation(),t.onTapTip.apply(null,arguments)}}},[t._v("\n    "+t._s(t.source.action.title)+"\n  ")]):t.source.tip?s("div",{staticClass:"tip"},[t._v("\n    "+t._s(t.source.tip)+"\n  ")]):t._e(),s("div",{staticClass:"hotel-list"},[t.source.recommend?s("div",{staticClass:"recommend"},[t._v("\n      "+t._s(t.source.recommend)+"\n    ")]):t._e(),t._l(t.source.list,(function(e,i){return s("div",{directives:[{name:"active",rawName:"v-active.stop",modifiers:{stop:!0}}],key:e.name,ref:"hotel",refInFor:!0,staticClass:"hotel-item active__mask",attrs:{"data-report-id":t.M_itemReportId(e,"2:list|"+(i+1)+":"+t.M_getItemType(e))},on:{click:function(s){return s.stopPropagation(),t.onTap(e)}}},[s("div",{directives:[{name:"image",rawName:"v-image",value:e.thumbUrl,expression:"item.thumbUrl"}],staticClass:"thumb"}),s("div",{staticClass:"main"},[s("div",{staticClass:"top-info"},[s("div",{staticClass:"title"},[s("span",{staticClass:"name"},[t._v(t._s(e.title))]),s("ui-tags",{staticClass:"append-tags",attrs:{"align-vertical":"",tags:e.titleTag&&e.titleTag.append}})],1),s("p",{staticClass:"distance"},[t._v(t._s(e.distance))]),s("ui-tags",{staticClass:"recommend-tags",attrs:{tags:e.recommendTag}})],1),s("div",{staticClass:"bottom-info"},[s("div",{staticClass:"bottom-info__left"},[e.score?s("span",{staticClass:"score"},[t._v(t._s(e.score))]):t._e(),e.commentDesc?s("span",{staticClass:"comment"},[t._v(t._s(e.commentDesc))]):t._e()]),e.price?s("div",{staticClass:"bottom-info__right"},[s("span",{staticClass:"reference"},[t._v(t._s(t.referenceText))]),s("span",{staticClass:"price"},[t._v(t._s(e.price))])]):e.status?s("div",{staticClass:"status"},[t._v("\n            "+t._s(e.status)+"\n          ")]):t._e()])])])}))],2)])}),[],!1,null,"4b205f5a",null);e.default=r.exports}}]);