(window.webpackJsonp=window.webpackJsonp||[]).push([[274],{1114:function(t,e,a){},1115:function(t,e,a){},1116:function(t,e,a){},1748:function(t,e,a){"use strict";a(1114)},1749:function(t,e,a){"use strict";a(1115)},1750:function(t,e,a){"use strict";a(1116)},2125:function(t,e,a){"use strict";a.r(e);var n=a(1),r=a.n(n),s=a(25),i=a(0),c=a(2),o={props:{data:{type:Object,default:function(){return{}}}},computed:{text:function(){return this.data.text},isImageSearch:function(){return+i.b.chatSearch===c.u.IMAGE},isFingerSearch:function(){return+i.b.chatSearch===c.u.FINGER},isInRecommendMode:function(){return!i.b.query}}},u=(a(1748),a(4)),l=Object(u.a)(o,(function(){var t=this,e=t.$createElement,a=t._self._c||e;return t.text?a("div",{staticClass:"empty-default",class:{"empty-default_image-search":t.isImageSearch,"empty-default_finger-search":t.isFingerSearch,"empty-default_recommend-mode":t.isInRecommendMode}},[a("div",{staticClass:"fake-bg"}),t.isImageSearch?[a("span",{staticClass:"page-end"},[t._v(t._s(t.text))])]:[t._v("\n    "+t._s(t.text)+"\n  ")]],2):t._e()}),[],!1,null,"698a0d1d",null).exports,p=a(3);function d(t,e){var a=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),a.push.apply(a,n)}return a}function f(t){for(var e=1;e<arguments.length;e++){var a=null!=arguments[e]?arguments[e]:{};e%2?d(Object(a),!0).forEach((function(e){r()(t,e,a[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(a)):d(Object(a)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(a,e))}))}return t}var m={props:{data:{type:Object,default:function(){return{}}}},data:function(){return{uiOffset:0}},computed:f(f({isImageSearch:function(){return+i.b.chatSearch===c.u.IMAGE},isFingerSearch:function(){return+i.b.chatSearch===c.u.FINGER}},Object(s.b)({getHead:"result/self/getHead"})),{},{category:function(){return this.$store.state.result.unitData.category||[]}}),watch:{data:function(){setTimeout((function(){window.scrollTo(0,0)}),0)}},created:function(){var t=this;i.a.$on(p.b.goToPageIndex,(function(){t.$store.commit({type:"result/self/updateBase",pageMsg:"",noMoreData:null})}))},mounted:function(){var t=this;this.$nextTick((function(){var e=window.scrollY||window.pageYOffset,a=t.$el.getBoundingClientRect().y+e;a>0&&(t.uiOffset=a),window.scrollTo(0,0)}))},methods:{toSearchAll:function(){var t=this.$store.state.result.unitData.category.find((function(t){return 0==t.type})),e=this.$store.state.result.unitData.category.indexOf(t);t&&i.a.$emit(p.b.switchTab,{unit:t,index:e,parentType:c.p.NORESULT_GUIDE})}}},h=(a(1749),Object(u.a)(m,(function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"empty-guide",class:{"empty-guide_image-search":t.isImageSearch,"empty-guide_finger-search":t.isFingerSearch,"empty-guide_with-head":t.getHead||t.isImageSearch}},[a("div",{staticClass:"fake-bg",style:{height:"calc(100vh - "+t.uiOffset+"px)"}}),t.data.noMoreWording?a("div",{staticClass:"empty-guide__wording"},[t._v("\n    "+t._s(t.data.noMoreWording)+"\n  ")]):t._e(),t.data.guideText?a("div",{staticClass:"empty-guide__guide"},[t._v("\n    "+t._s(t.data.guideText)+"\n  ")]):t._e(),t.data.allResult&&t.category.length?a("div",{directives:[{name:"active",rawName:"v-active"}],staticClass:"empty-guide__action active__mask",on:{click:function(e){return e.stopPropagation(),t.toSearchAll.apply(null,arguments)}}},[t.data.iconUrl?a("ui-image",{staticClass:"empty-guide__action-icon",attrs:{url:t.data.iconUrl,size:20}}):t._e(),a("span",{staticClass:"empty-guide__action-text"},[t._v(t._s(t.data.allResult))])],1):t._e()])}),[],!1,null,"de5d6ac0",null).exports),g={mixins:[i.m],props:{data:{type:Object,default:function(){return{}}}},computed:{backgroundImg:function(){return this.data.thumbUrl?{backgroundImage:"url('".concat(this.data.thumbUrl,"')")}:{}},tip:function(){return this.data.tip||"识别来自小程序的内容"},desc:function(){return this.data.desc},btn:function(){return this.data.btn||"即将打开"}},created:function(){var t=this.data&&this.data.jumpInfo||this.data;(3===t.jumpType||t.jumpUrl)&&this.M_go(t),p.a.$emit(p.b.UNSET_BODY_TOP_LINE)},methods:{tap:function(){this.M_go(this.data.jumpInfo||this.data)}}};a(1750);function b(t,e){var a=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),a.push.apply(a,n)}return a}function y(t){for(var e=1;e<arguments.length;e++){var a=null!=arguments[e]?arguments[e]:{};e%2?b(Object(a),!0).forEach((function(e){r()(t,e,a[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(a)):b(Object(a)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(a,e))}))}return t}var _={components:{emptyDefault:l,emptyGuide:h,emptyStorePassword:Object(u.a)(g,(function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"esp-wrap"},[a("div",{staticClass:"esp-icon",style:t.backgroundImg}),a("p",{staticClass:"esp-title ellipsis_2"},[t._v("\n    "+t._s(t.tip)+"\n  ")]),t.data.desc?a("p",{staticClass:"esp-tip ellipsis_1"},[t._v("\n    "+t._s(t.desc)+"\n  ")]):t._e(),a("div",{staticClass:"btn weui-btn weui-btn_primary",on:{click:t.tap}},[t._v("\n    "+t._s(t.btn)+"\n  ")])])}),[],!1,null,"060495fc",null).exports},computed:y(y(y({},Object(s.c)({selfBase:function(t){return t.result.self.base},resultObj:function(t){return t.result.self.resultObj}})),Object(s.b)({mpImageSearchShowRecommend:"result/mpImageSearchShowRecommend",mpImageSearchShowAnotherButton:"result/mpImageSearchShowAnotherButton"})),{},{emptyData:function(){return!this.mpImageSearchShowRecommend&&(!this.mpImageSearchShowAnotherButton&&(this.resultObj.enterJumpInfo?{componentName:"emptyStorePassword",data:this.resultObj.enterJumpInfo}:this.selfBase.noMoreData?{componentName:"emptyGuide",data:this.selfBase.noMoreData}:!!this.selfBase.pageMsg&&{componentName:"emptyDefault",data:{text:this.selfBase.pageMsg}}))}})},O=Object(u.a)(_,(function(){var t=this.$createElement,e=this._self._c||t;return this.emptyData?e(this.emptyData.componentName,{tag:"components",attrs:{data:this.emptyData.data}}):this._e()}),[],!1,null,null,null);e.default=O.exports}}]);