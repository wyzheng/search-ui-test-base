(window.webpackJsonp=window.webpackJsonp||[]).push([[82],{1421:function(t,e,a){},2047:function(t,e,a){"use strict";a(1421)},2340:function(t,e,a){"use strict";a.r(e);var n=a(1),i=a.n(n),r=a(39),s=(a(0),{name:"GameRanking",components:{hd:a(489).a},mixins:[r.a],props:{data:{type:Object,default:function(){return{}}},item:{type:Object,default:function(){return{}}},pos:{type:Number,default:0},typePos:{type:Number,default:0}},data:function(){return{countedWid:0,isIOS:Global.os.ios}},watch:i()({},"item.rankList",{handler:function(t,e){this.countWid()},immediate:!1,deep:!0}),mounted:function(){this.countWid()},methods:{countWid:function(){var t=this.item.rankList;t&&(this.countedWid=this.$refs["rankingNumber".concat(t.length-1)][0].clientWidth)},tapGameRank:function(){this.$refs.hd.tap({zone:2}),this.$emit("tap")}}}),o=(a(2047),a(4)),u=Object(o.a)(s,(function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"oz-game-ranking",attrs:{"data-id":t.M_exposeId()},on:{click:t.tapGameRank}},[a("hd",t._b({ref:"hd"},"hd",t.$props,!1)),a("div",{staticClass:"ranking-wrap"},[t._l(t.item.rankList,(function(e,n){return a("div",{key:n},[a("div",{staticClass:"ranking-content",attrs:{role:"option"}},[a("div",{staticClass:"ranking-content-info"},[a("span",{ref:"rankingNumber"+n,refInFor:!0,staticClass:"ranking-number",style:{width:0==t.countedWid?"auto":t.countedWid+"px"},attrs:{"aria-label":"第"+e.rank+"名,"}},[t._v(t._s(e.rank))]),a("span",{directives:[{name:"image",rawName:"v-image:avatar",value:e.thumbUrl,expression:"rankItem.thumbUrl",arg:"avatar"}],staticClass:"ranking-avatar",class:{"ranking-avatar-ios":t.isIOS}}),a("span",{domProps:{innerHTML:t._s(t.xss(e.title))}}),a("span",{staticClass:"ui-aria-hidden"},[t._v(".")])]),a("p",{staticClass:"ranking-content-extInfo"},[t._v(t._s(e.extInfo))])]),a("div",{staticClass:"line-next",style:{width:t.countedWid+"px"}})])})),a("p",{staticClass:"personal-ranking"},[a("i",{style:{width:t.countedWid+"px"}}),t._v(t._s(t.item.extraInfo))])],2)],1)}),[],!1,null,"666aeec0",null);e.default=u.exports},459:function(t,e,a){"use strict";var n={methods:{ozJump:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},e=this;e.M_confirm_go(t.dialog,t)}},computed:{M_canHeaderJump:function(){return!!this.item.header&&!!(this.item.header.jumpUrl||this.item.header.weappUrl||this.item.header.jumpInfo)}}};e.a=n},470:function(t,e,a){},471:function(t,e,a){},486:function(t,e,a){"use strict";a(470)},487:function(t,e,a){"use strict";a(471)},489:function(t,e,a){"use strict";var n=a(39),i=a(459),r={props:{title:{type:String,default:""},tags:{type:Array,default:function(){return[]}},jump:{type:Boolean,default:!0},moreText:{type:String,default:""}}},s=(a(486),a(4)),o=Object(s.a)(r,(function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"oz__header line",class:{active__item:t.jump},attrs:{role:t.jump?"button":"option"}},[a("div",{staticClass:"line__item oz__header-word",class:{flex1:t.jump&&t.moreText}},[a("p",[t._v(t._s(t.title))]),t.tags.length?a("ui-tags",{attrs:{flex:"",tags:t.tags}}):t._e()],1),t.jump&&!t.moreText?a("ui-arrow",{attrs:{gap:0,align:"flex"}}):t.jump&&t.moreText?a("div",{directives:[{name:"active",rawName:"v-active.stop",modifiers:{stop:!0}}],staticClass:"oz__header-more active__mask",on:{click:function(e){return e.stopPropagation(),t.$emit("tap:more",{zone:3,content:"更多"})}}},[t._v("\n    "+t._s(t.moreText)+"\n    "),a("ui-arrow")],1):t._e()],1)}),[],!1,null,null,null).exports,u=a(0),c=a(2),p={components:{accessHeader:o},mixins:[u.k,n.a,i.a],props:{data:{type:Object,default:function(){return{}}},item:{type:Object,default:function(){return{}}},pos:{type:Number,default:0},typePos:{type:Number,default:0}},computed:{header:function(){return this.item.header||{}},jump:function(){return!!(this.header.jumpUrl||this.header.weappUrl||this.header.jumpInfo)},moreText:function(){return this.header.moreText||u.g.L("更多")}},methods:{tap:function(t){var e=this;u.g.isObjectEmpty(t)&&(t={zone:1});var a=t.zone;u.g.fastClickCheck((function(){var n=e,i=JSON.parse(JSON.stringify(n.header)),r=i.jumpInfo,s={parentSearchID:e.M_composeParentSid({t:e.item.parentType||0,s:u.b.searchId,did:e.item.docID,rid:e.$store.state.result.previousRid}),crossExtReqParams:[{key:"cookies",textValue:e.$store.state.result.state.cookies}],subType:r&&r.subType||e.data.subType||""};r?r.jumpType===c.l.VERTICAL?r=Object.assign({extParams:s},r):r.jumpType===c.l.H5&&(r.jumpUrl=u.g.addParamsToURLSearch(u.g.object2params({tmplByPassJson:JSON.stringify(s)}),r.jumpUrl)):i.jumpUrl&&(i.jumpUrl=u.g.addParamsToURLSearch(u.g.object2params({tmplByPassJson:JSON.stringify(s)}),i.jumpUrl)),n.ozJump(r||n.header),n.M_clickReport({clickZone:a||1,clickContent:t.content||n.header.title})}),2e3),this.$emit("tap")}}},l=(a(487),Object(s.a)(p,(function(){var t=this,e=t.$createElement,a=t._self._c||e;return t.item.header?a("accessHeader",{attrs:{title:t.item.header.title,jump:t.jump,tags:t.item.header.tag,"more-text":t.moreText},on:{"tap:more":t.tap},nativeOn:{click:function(e){return e.stopPropagation(),t.tap.apply(null,arguments)}}}):t._e()}),[],!1,null,null,null));e.a=l.exports}}]);