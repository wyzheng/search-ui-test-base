(window.webpackJsonp=window.webpackJsonp||[]).push([[193],{1346:function(e,t,o){},1347:function(e,t,o){},1985:function(e,t,o){"use strict";o(1346)},1986:function(e,t,o){"use strict";o(1347)},2216:function(e,t,o){"use strict";o.r(t);var i=o(0),r=o(3),s=o(10),n={name:"SlideMore",mixins:[i.m,i.k],props:{data:{type:Object,default:function(){return{}}},item:{type:Object,default:function(){return{}}},pos:{type:Number,default:0},typePos:{type:Number,default:0},source:{type:Object,default:function(){return{}}}},methods:{onTap:function(e){var t="".concat(this.M_getClickZonePath(),".moreInfo");this.M_serviceSearchGo(e),this.M_clickReport({clickZone:t,clickContent:e.moreText,expand:this.M_getJumpSubScene(e),reportId:e.reportId})}}},c=(o(1985),o(4)),l=Object(c.a)(n,(function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("div",{directives:[{name:"active",rawName:"v-active"}],staticClass:"more active__opacity",attrs:{role:"button","data-report-id":e.M_itemReportId(e.source.moreInfo.reportId)},on:{click:function(t){return t.stopPropagation(),e.onTap(e.source.moreInfo)}}},[o("div",{staticClass:"more-icon"},[o("ui-arrow",{attrs:{size:24}})],1),o("div",{staticClass:"more-title"},[e._v("\n    "+e._s(e.source.moreInfo.moreText)+"\n  ")])])}),[],!1,null,"732b481e",null).exports,a=o(617),u=new s.a({normal:1,first:2,double:3}),d=new s.a({normal:40,first:60,double:50}),p={name:"SlideVideo",components:{slideMore:l,videoCard:a.a},mixins:[i.m,i.k],props:{data:{type:Object,default:function(){return{}}},item:{type:Object,default:function(){return{}}},pos:{type:Number,default:0},typePos:{type:Number,default:0},source:{type:Object,default:function(){return{}}}},computed:{videos:function(){return this.source.videos},showDouble:function(){return 2==this.videos.length},scrollWdith:function(){var e=this.showDouble?u.double:this.source.showType||u.normal,t=d[u[e]],o=this.videos.length*t,i=this.source.moreInfo?.7*t:0;return"".concat(o+i,"%")}},methods:{onTapVideoCard:function(e,t,o){var i="".concat(this.M_getClickZonePath(),".videos[").concat(t-1,"]");this.M_serviceSearchGo(e),this.M_clickReport({clickZone:i,clickContent:e.title,expand:this.M_getJumpSubScene(e),itemPos:o},e)},scroll:function(){this.scrollTimer&&(clearTimeout(this.scrollTimer),this.scrollTimer=0),this.scrollTimer=setTimeout((function(){r.a.$emit(r.b.resultExposeAnalysis)}),300)},getItemWidth:function(){var e=this.$el.querySelector(".slide-item");return 2*(e.scrollWidth+parseFloat(getComputedStyle(e).getPropertyValue("margin-right")))}}},m=(o(1986),Object(c.a)(p,(function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("div",{staticClass:"slide slide-vc",class:{double:e.showDouble}},[o("div",{directives:[{name:"arrow-scroll",rawName:"v-arrow-scroll",value:{step:e.getItemWidth},expression:"{ step: getItemWidth }"}],ref:"scroll",staticClass:"slide-scroll",on:{scroll:e.scroll}},[o("div",{staticClass:"slide-inner",style:{width:e.scrollWdith}},[e._l(e.videos,(function(t,i){return o("div",{key:t.docID,staticClass:"slide-item"},[o("video-card",{attrs:{"tap-source-alone":"",item:Object.assign({},{subItemType:e.source.type},t,{docID:e.item.docID}),"block-title":e.source.title,"parent-doc-report-id":e.item.reportId,data:e.data,pos:i+1,"type-pos":e.typePos},on:{tap:e.onTapVideoCard}})],1)})),e.source.moreInfo?o("div",{staticClass:"slide-item slide-item__more"},[o("slide-more",e._b({},"slide-more",e.$props,!1))],1):e._e()],2)])])}),[],!1,null,"2b5c9ed5",null));t.default=m.exports}}]);