(window.webpackJsonp=window.webpackJsonp||[]).push([[180],{1317:function(t,e,i){},1340:function(t,e,i){},1404:function(t,e,i){},1979:function(t,e,i){"use strict";i(1340)},2030:function(t,e,i){"use strict";i(1404)},2036:function(t,e,i){"use strict";i(1317)},2095:function(t,e,i){"use strict";i.r(e);var s=i(51),a=i(16),n=i(14),o=i(2),r=i(0),c=i(466),u=i(480),l={components:{customSource:c.a,playMask:u.a},mixins:[r.m,r.k,r.i],props:{data:{type:Object,default:function(){return{}}},item:{type:Object,default:function(){return{}}},pos:{type:Number,default:0},typePos:{type:Number,default:0},source:{type:Object,default:function(){return{}}}},data:function(){return{wikiWords:[]}},computed:{isFirstPos:function(){return 1===this.typePos},hasCardInfo:function(){return this.itemInfo.cardItemInfo&&this.itemInfo.cardItemInfo.length>0},noImage:function(){return!this.itemInfo.thumbUrl},wordsColumnCount:function(){var t=window.innerWidth,e=n.a.calTextRenderWidth("搜","14px")<=14.5,i=this.wikiWords||[],s=i.filter((function(t){return t.word.length>4})),a=i.filter((function(t){return t.word.length>6}));if(!this.isFirstPos){if(t>=375){if(!s.length){if(e){var o=Math.min(4,i.length);return this.fixWordsCount(o),o}var r=Math.min(3,i.length);return this.fixWordsCount(r),r}return a.length?(this.fixWordsCount(2),2):e?(this.fixWordsCount(3),3):(this.fixWordsCount(2),2)}return s.length?(this.fixWordsCount(4),2):e?(this.fixWordsCount(3),3):(this.fixWordsCount(4),2)}return i?t>=375?e&&!s.length?i.length<4?(this.fixWordsCount(i.length),i.length):(this.fixWordsCount(4),4):!e&&s.length?(this.fixWordsCount(2),2):(this.fixWordsCount(4),3===i.length?3:2):(this.fixWordsCount(4),3===i.length?3:2):(this.fixWordsCount(4),4)}},watch:{itemInfo:{handler:function(t){this.wikiWords=t.wikiWords},immediate:!0}},mounted:function(){},methods:{onTap:function(){var t=this;t.M_clickReport({clickZone:1,clickContent:t.itemInfo.title},t.itemInfo),t.M_go(t.itemInfo.jumpInfo||t.itemInfo),Object(a.f)(s.a.detail.result.pedia)},tapRelativeLink:function(t){var e=this;e.M_go(Object.assign({},t.jumpInfo||t,{parentSearchID:e.M_composeParentSid({t:o.p.BAIKE_LINK,s:r.b.searchId,did:"",rid:e.$store.state.result.previousRid})})),e.M_clickReport({clickZone:4,query:e.data.items[0].subItems[0].title,clickContent:t.desc},t)},tapLink:function(t){this.M_go(t.jumpInfo||t),this.M_clickReport({clickZone:2,clickContent:t.word},t),Object(a.f)(s.a.detail.result.pediaLink)},tapMore:function(){var t=this.itemInfo.wikiMore;this.M_startDetail({userName:t.userName,url:t.url,weappUrl:t.weappUrl}),this.M_clickReport({clickZone:3,clickContent:t&&t.word},t),Object(a.f)(s.a.detail.result.pediaMore)},fixWordsCount:function(t){this.wikiWords=this.itemInfo.wikiWords.slice(0,t)}}},d=(i(2036),i(4)),p=Object(d.a)(l,(function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{directives:[{name:"active",rawName:"v-active.stop",modifiers:{stop:!0}}],staticClass:"expose_log_elem pedia",attrs:{"data-id":t.itemInfo.docID,role:"","data-report-id":t.M_itemReportId(t.itemInfo.reportId)},on:{click:function(e){return e.stopPropagation(),t.onTap.apply(null,arguments)}}},[i("div",{staticClass:"search_item_inner"},[i("p",{staticClass:"pedia__title",attrs:{role:"option"},domProps:{innerHTML:t._s(t.xss(t.itemInfo.title))}}),i("div",{staticClass:"pedia__ambi-title",domProps:{innerHTML:t._s(t.xss(t.itemInfo.ambiTitle))}}),i("div",{staticClass:"pedia__box"},[t.itemInfo.videoUrl&&t.itemInfo.showType&&1==t.itemInfo.showType?i("div",{staticClass:"pedia-card__media",attrs:{"aria-hidden":"true"}},[i("online-image",{staticClass:"pedia-card__image",attrs:{url:t.itemInfo.videoUrl,mode:t.itemInfo.duration?"color":"cover"}}),t.itemInfo.duration?i("playMask",{attrs:{text:t.itemInfo.duration}}):t._e()],1):t._e(),i("div",{staticClass:"pedia__thumb-desc-wrap",attrs:{role:"option"}},[t.itemInfo.thumbUrl?i("div",{directives:[{name:"image",rawName:"v-image",value:t.itemInfo.thumbUrl,expression:"itemInfo.thumbUrl"}],staticClass:"pedia__thumb",class:t.isFirstPos?"first-pos":""}):t._e(),i("div",{staticClass:"pedia__content"},[i("div",{staticClass:"pedia__desc",class:{"pedia__desc_not-first":!t.itemInfo.showType||1!=t.itemInfo.showType}},[i("div",{class:t.isFirstPos?t.hasCardInfo||t.noImage?"ellipsis_3":"ellipsis_5":"ellipsis_3",domProps:{innerHTML:t._s(t.xss(t.itemInfo.desc))}})]),t.hasCardInfo?i("ul",{staticClass:"pedia__items"},t._l(t.itemInfo.cardItemInfo,(function(e,s){return i("li",{key:"cardItem"+s},[e.title?i("span",{staticClass:"pedia__items-title"},[t._v(t._s(e.title))]):t._e(),e.value?i("span",{staticClass:"pedia__items-desc"},[t._v(t._s(e.value))]):t._e(),e.mainInfo&&e.mainInfo.length?[i("span",{staticClass:"cardItem_subItem_text ellipsis_2"},t._l(e.mainInfo,(function(e,a){return i("span",{key:"cardItem_subItem"+a,staticClass:"cardItem_subItem_text_inner"},[e.desc&&!e.jumpInfo?[t._v(t._s(e.desc))]:t._e(),e.desc&&e.jumpInfo?i("span",{directives:[{name:"active",rawName:"v-active.stop",modifiers:{stop:!0}}],class:{linkColor:e.jumpInfo},attrs:{"data-report-id":t.M_itemReportId(e.reportId,s+1+":list|"+(a+1)+":"+t.M_getItemType(e.reportId))},on:{click:function(i){return i.stopPropagation(),t.tapRelativeLink(e)},touchstart:function(t){t.stopPropagation()}}},[t._v(t._s(e.desc))]):t._e(),e.remark&&e.remark.desc?[t._v(t._s(e.remark.desc))]:t._e()],2)})),0)]:t._e()],2)})),0):t._e()])]),t.wikiWords&&t.itemInfo.showType?i("div",{staticClass:"links pedia__links"},[i("ui-column",{class:2===t.wordsColumnCount?"":"one-row-link",attrs:{list:t.wikiWords,col:t.wordsColumnCount,gap:8,fill:""},nativeOn:{mouseover:function(t){t.stopPropagation()}},scopedSlots:t._u([{key:"default",fn:function(e){var s=e.item,a=e.index;return[i("ui-link",{attrs:{"data-index":a,title:s.word,"data-report-id":t.M_itemReportId(s.reportId)},nativeOn:{click:function(e){return e.stopPropagation(),t.tapLink(s)},touchstart:function(t){t.stopPropagation()}}})]}}],null,!1,1785232217)})],1):t._e(),t.itemInfo.source&&t.itemInfo.source.title?i("customSource",{attrs:{source:t.itemInfo.source,single:!t.itemInfo.thumbUrl}}):t.itemInfo.source?i("div",{staticClass:"source-plain pedia__source"},[i("div",{staticClass:"source-plain__text",domProps:{innerHTML:t._s(t.xss(t.itemInfo.source))}}),t.itemInfo.date?i("div",{staticClass:"source-plain__text"},[t._v("\n          "+t._s(t._f("dateFormat")(t.itemInfo.date))+"\n        ")]):t._e()]):t._e()],1)]),t.itemInfo.wikiMore?i("div",{directives:[{name:"active",rawName:"v-active.stop",modifiers:{stop:!0}}],staticClass:"pedia__more active__item",attrs:{role:"button","data-report-id":t.M_itemReportId(t.itemInfo.wikiMore.reportId)},on:{click:function(e){return e.stopPropagation(),t.tapMore.apply(null,arguments)}}},[t._v("\n    "+t._s(t.itemInfo.wikiMore.word)+"\n  ")]):t._e()])}),[],!1,null,"b777914a",null);e.default=p.exports},2153:function(t,e,i){"use strict";i.r(e);var s=i(0),a={name:"ServicePedia",components:{pedia:i(2095).default},mixins:[s.k,s.m],props:{source:{type:Object,default:function(){return{}}},data:{type:Object,default:function(){return{}}},item:{type:Object,default:function(){return{}}},pos:{type:Number,default:0},typePos:{type:Number,default:0}}},n=(i(1979),i(4)),o=Object(n.a)(a,(function(){var t=this.$createElement;return(this._self._c||t)("pedia",this._b({},"pedia",this.$props,!1))}),[],!1,null,"3b229176",null);e.default=o.exports},2155:function(t,e,i){"use strict";i.r(e);var s=i(489),a=i(39),n=i(459),o={components:{hd:s.a},mixins:[a.a,n.a],inject:["idkey"],props:{data:{type:Object,default:function(){return{}}},item:{type:Object,default:function(){return{}}},pos:{type:Number,default:0},typePos:{type:Number,default:0}},methods:{tap:function(t){this.ozJump(t),this.M_clickReport({clickZone:2}),this.idkey(this.item.showType),this.$emit("tap")}}},r=(i(2030),i(4)),c=Object(r.a)(o,(function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{directives:[{name:"active",rawName:"v-active.stop",modifiers:{stop:!0}}],staticClass:"oz__pedia oz__item",class:{active__item:!!t.item.desc},attrs:{"data-id":t.M_exposeId()}},[i("hd",t._b({},"hd",t.$props,!1)),i("div",{staticClass:"oz__body"},[t.item.pedia?t._l(t.item.pedia,(function(e){return i("div",{key:e.desc,staticClass:"oz__pedia-block",attrs:{role:"button"},on:{click:function(i){return t.tap(e)}}},[i("online-image",{staticClass:"oz__pedia-icon",attrs:{url:e.iconUrl}}),i("div",{staticClass:"oz__pedia-desc ellipsis_3",domProps:{innerHTML:t._s(t.xss(e.desc))}})],1)})):t.item.desc?[i("div",{staticClass:"oz__pedia-desc ellipsis_2",attrs:{role:"button"},domProps:{innerHTML:t._s(t.xss(t.item.desc))},on:{click:function(e){return t.tap(t.item.header)}}})]:t._e()],2)],1)}),[],!1,null,null,null);e.default=c.exports},324:function(t,e,i){"use strict";i(464)},459:function(t,e,i){"use strict";var s={methods:{ozJump:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},e=this;e.M_confirm_go(t.dialog,t)}},computed:{M_canHeaderJump:function(){return!!this.item.header&&!!(this.item.header.jumpUrl||this.item.header.weappUrl||this.item.header.jumpInfo)}}};e.a=s},460:function(t,e,i){},461:function(t,e,i){},462:function(t,e,i){},463:function(t,e,i){},464:function(t,e,i){},466:function(t,e,i){"use strict";var s=i(39),a=i(478),n=i(79),o=i(467),r=i(0),c={components:{marks:n.a,nagetive:o.a},mixins:[s.a],provide:function(){return{block:this.data,item:this.item,pos:this.pos,typePos:this.typePos}},props:{data:{type:Object,default:function(){return{}}},item:{type:Object,default:function(){return{}}},pos:{type:Number,default:0},typePos:{type:Number,default:0},isAriaHidden:{type:Boolean,default:!0},source:{type:Object,default:function(){return{}}},rich:{type:[Boolean,Number],default:!1},single:{type:[Boolean],default:!1}},data:function(){return{tagColor:a.a}},computed:{show:function(){return!r.g.isObjectEmpty(this.source)||this.item.feedback},className:function(){return[this.rich?"source":"source-plain",this.single?"source_single":""]}},methods:{onTapLink:function(){this.$emit("tap:link",this.$props.source.link)}}},u=(i(324),i(4)),l=Object(u.a)(c,(function(){var t=this,e=t.$createElement,i=t._self._c||e;return t.show?i("div",{class:t.className,attrs:{"aria-hidden":t.isAriaHidden}},[t.source.iconMask?i("div",{staticClass:"source__icon-mask",style:{webkitMaskImage:"url('"+t.source.iconMask+"')"}}):t.source.iconUrl?i("div",{directives:[{name:"image",rawName:"v-image:avatar",value:t.source.iconUrl,expression:"source.iconUrl",arg:"avatar"}],staticClass:"source__icon",attrs:{"aria-label":"图像"}}):t._e(),t.source.title?i("div",{staticClass:"source__title",attrs:{title:t.M_os("链接")},domProps:{innerHTML:t._s(t.xss(t.source.title))}}):t._e(),t.source.link?i("div",{directives:[{name:"active",rawName:"v-active.stop",modifiers:{stop:!0}}],staticClass:"source__link",attrs:{title:t.M_os("链接")},on:{click:function(e){return e.stopPropagation(),t.onTapLink.apply(null,arguments)}}},[t._v("\n    "+t._s(t.source.link.text)+"\n  ")]):t._e(),t.source.mark?i("marks",{attrs:{mark:t.source.mark}}):t._e(),t.source.prepend&&t.source.prepend.length?t._l(t.source.prepend,(function(e){return i("div",{key:e,staticClass:"source__text"},[t._v("\n      "+t._s(e)+"\n    ")])})):t._e(),t.source.dateTime?i("div",{staticClass:"source__text date"},[t._v("\n    "+t._s(t.source.dateTime)+"\n  ")]):t.source.date?i("div",{staticClass:"source__text date"},[t._v("\n    "+t._s(t._f("dateFormat")(t.source.date))+"\n  ")]):t._e(),t.source.text&&t.source.text.length?t._l(t.source.text,(function(e){return i("div",{key:e,staticClass:"source__text"},[t._v("\n      "+t._s(e)+"\n    ")])})):t._e(),t.source.tag?i("div",{staticClass:"source__rec"},[i("ui-tags",{staticClass:"source__rec-item",attrs:{tags:t.source.tag}}),t.item.feedback?i("nagetive",t._b({staticClass:"source__rec-item"},"nagetive",t.$props,!1)):t._e()],1):i("div",{staticClass:"source__rec"},[i("div",{staticClass:"source__rec-item"},[t._v("\n      "+t._s(t.source.hot)+"\n    ")]),t.item.feedback?i("nagetive",t._b({staticClass:"source__rec-item"},"nagetive",t.$props,!1)):t._e()],1)],2):t._e()}),[],!1,null,null,null);e.a=l.exports},467:function(t,e,i){"use strict";var s=i(1),a=i.n(s),n=i(39),o=i(3),r={mixins:[n.a],props:{data:{type:Object,default:function(){return{}}}},data:function(){return{reasons:[]}},computed:{renderReasons:{set:function(t){this.reasons=t},get:function(){return this.reasons.length?this.reasons:this.data.reasons}},showButton:function(){return this.renderReasons.some((function(t){return t.checked}))}},created:function(){var t=this;o.a.$on(o.b.negativeHide,(function(){t.renderReasons=[]}))},methods:{tapJump:function(){this.$emit("tapJump")},tapConfirm:function(){this.$emit("tapConfirm",this.renderReasons)},tapReason:function(t,e){this.renderReasons=this.renderReasons.map((function(t,i){return e==i?Object.assign({},t,{checked:t.checked?0:1}):t}))}}},c=(i(474),i(4)),u=Object(c.a)(r,(function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"wrap"},[i("div",{staticClass:"header line"},[i("div",{staticClass:"title line__item"},[i("p",{staticClass:"title__word"},[t._v("\n        "+t._s(t.data.title)+"\n      ")])]),i("div",{staticClass:"button line__item primary no-wrap"},[t.showButton?i("div",{staticClass:"weui-btn weui-btn_mini weui-btn_primary",on:{click:t.tapConfirm}},[t._v("\n        "+t._s(t.data.confirm.title)+"\n      ")]):t._e()])]),i("div",{staticClass:"reasons"},t._l(t.renderReasons,(function(e,s){return i("div",{key:e.wording,staticClass:"reason",class:{reason__checked:e.checked},on:{click:function(i){return t.tapReason(e,s)}}},[t._v("\n      "+t._s(e.wording)+"\n    ")])})),0),i("div",{staticClass:"jump",on:{click:t.tapJump}},[i("div",{staticClass:"jump-in"},[t._v("\n      "+t._s(t.data.complaint.title)+"\n    ")])])])}),[],!1,null,"d28ecc42",null).exports,l={props:{data:{type:Object,default:function(){return{}}}},methods:{tap:function(){this.$emit("tapJump")}}},d=(i(475),Object(c.a)(l,(function(){var t=this.$createElement;return(this._self._c||t)("div",{directives:[{name:"active",rawName:"v-active"}],staticClass:"n-plain active__item",on:{click:this.tap}},[this._v("\n  "+this._s(this.data.complaint.title)+"\n")])}),[],!1,null,"1d1da364",null).exports),p=new(i(10).a)({withReason:1,plain:2}),m={components:{withReason:u,plain:d},props:{data:{type:Object,default:function(){return{}}}},data:function(){return{types:p}},methods:{tapJump:function(){var t=this.data.complaint;this.$emit("tapJump",t)},tapConfirm:function(t){this.$emit("tapConfirm",{confirm:this.data.confirm,feedback:{reasons:t,title:this.data.title}})}}},f=(i(476),Object(c.a)(m,(function(){var t=this.$createElement,e=this._self._c||t;return e("div",[e(this.types[this.data.type],{tag:"component",attrs:{data:this.data},on:{tapJump:this.tapJump,tapConfirm:this.tapConfirm}})],1)}),[],!1,null,null,null).exports),_=i(8),h=i(17),v=i(0);function g(t,e){var i=Object.keys(t);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(t);e&&(s=s.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),i.push.apply(i,s)}return i}function y(t){for(var e=1;e<arguments.length;e++){var i=null!=arguments[e]?arguments[e]:{};e%2?g(Object(i),!0).forEach((function(e){a()(t,e,i[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(i)):g(Object(i)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(i,e))}))}return t}var C={components:{pop:f},mixins:[n.a],props:{data:{type:Object,default:function(){return{}}},item:{type:Object,default:function(){return{}}},pos:{type:Number,default:0},typePos:{type:Number,default:0},needWords:{type:Boolean,default:!1}},computed:{feedback:function(){return this.item.feedback},popData:function(){if(!this.feedback)return!1;var t=(this.$store.state.result.self.resultObj.feedback||{})[this.feedback.id];return!!t&&Object.assign({},t,this.feedback)}},created:function(){o.a.$on(o.b.viewChange,this._hide)},destroyed:function(){o.a.$off(o.b.viewChange,this._hide)},methods:{_hide:function(){this.$refs&&this.$refs.popOver&&this.$refs.popOver.hide()},_makeUrlPamrams:function(){var t=this;return y(y({},t.base),{},{clientType:t.data.real_type||t.data.type,subType:t.data.subType||0,docID:t.item.docID||"",boxID:t.data.boxID||"",boxPos:t.typePos||0,docPos:t.pos||0,docUrl:t.item.jumpUrl||t.item.doc_url||t.item.weappUrl||""})},onHide:function(){o.a.$emit(o.b.negativeHide)},tap:function(){this._hide()},tapJump:function(t){if(this.needWords&&this.data.items.length&&t.jumpUrl&&!t.jumpUrl.includes("relatedWords")){var e=this.data.items.map((function(t){return t.word||""})).join("|");t.jumpUrl=this.M_composeUrl(t.jumpUrl,{relatedWords:e,query:v.b.query})}this.M_go({jumpUrl:this.M_composeUrl(t.jumpUrl,this._makeUrlPamrams())}),this._hide()},tapConfirm:function(t){var e=Object.assign(this._makeUrlPamrams(),{clientTimeStamp:"".concat(+new Date),feedback:t.feedback});_.a.commonCgi({cgiName:t.confirm.cgiName||h.a.negativeFeedBack,data:e}),this.$refs.popOver.hide(),o.a.$emit(o.b.showToast,{text:"已反馈"})}}},b=(i(477),Object(c.a)(C,(function(){var t=this,e=t.$createElement,i=t._self._c||e;return t.popData?i("PopOver",{ref:"popOver",staticClass:"negative__wrap expand-hotspot",attrs:{"class-name":"negative__outter"},on:{hide:t.onHide},nativeOn:{click:function(t){t.stopPropagation()},touchstart:function(t){t.stopPropagation()},touchmove:function(t){t.stopPropagation()}},scopedSlots:t._u([{key:"trigger",fn:function(){return[i("svg-icon",{staticClass:"source__negative",attrs:{name:"negative_button","aria-hidden":"true"}})]},proxy:!0},{key:"content",fn:function(){return[i("pop",{attrs:{data:t.popData},on:{tapJump:t.tapJump,tapConfirm:t.tapConfirm}})]},proxy:!0}],null,!1,582450734)}):t._e()}),[],!1,null,null,null));e.a=b.exports},469:function(t,e,i){},470:function(t,e,i){},471:function(t,e,i){},474:function(t,e,i){"use strict";i(460)},475:function(t,e,i){"use strict";i(461)},476:function(t,e,i){"use strict";i(462)},477:function(t,e,i){"use strict";i(463)},478:function(t,e,i){"use strict";i.d(e,"a",(function(){return s}));var s=new(i(10).a)({blue:1,gold:2,gray:3,reading:4,green:5,red:6})},480:function(t,e,i){"use strict";var s=i(493),a=i(0),n={mixins:[a.k,a.m],props:{useUiSource:{type:Boolean,default:!1},text:{type:[String,Number],default:""},size:{type:Number,default:32},iconUrl:{type:String,default:"https://res.wx.qq.com/a/fed_upload/658e7c8d-708d-499b-8d41-4cca1d510d03/play.svg"},ts:{type:Number,default:0},liveWatch:{type:Boolean,default:!1},like:{type:Boolean,default:!1},isHot:{type:Boolean,default:!1},duration:{type:Boolean,default:!1},durationAtLeftBottom:{type:String,default:""},isTop:{type:Boolean,default:!1},noIcon:{type:Boolean,default:!1},dateTime:{type:String,default:""},tag:{type:Object,default:function(){}},tags:{type:Array,default:function(){return[]}},liveEnd:{type:Boolean,default:!1},tapSourceAlone:{type:Boolean,default:!1},tapTextAlone:{type:Boolean,default:!1},title:{type:String,default:""},desc:{type:String,default:""},source:{type:Object,default:function(){return{}}},friendInfo:{type:Object,default:function(){return{}}},showGradient:{type:Boolean,default:!1},gradientPadding:{type:Number,default:8},maskType:{type:Number,default:1},tagDate:{type:String,default:""},tagTitle:{type:String,default:""},specialShadow:{type:Boolean,default:!1},hotComment:{type:Object,default:function(){return{}}}},computed:{maskTypeText:function(){return{1:"视频",2:"文章"}[this.maskType]},showAdvancedSpecialShadow:function(){return(!!this.dateTime||!!this.source||!!this.ts||this.text)&&(!!this.friendInfo&&!!this.friendInfo.avatars&&this.friendInfo.avatars.length>0||!!this.title||!!this.desc)&&!this.hotComment}},methods:{decodeEmoji:function(t){if(t){var e=t.replace(/\\n/gi," ");return Object(s.decode)(e)}return""},tapSource:function(t){this.$emit("tap:source",t,this.M_getItemPos(t))},tapHotComment:function(t){this.hotComment.jumpInfo&&(t.stopPropagation(),this.M_go(this.hotComment.jumpInfo),this.M_clickReport({clickZone:1,itemPos:this.M_getItemPos(this.hotComment),reportItem:this.reportItem},this.hotComment))}}},o=(i(583),i(484),i(4)),r=Object(o.a)(n,(function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"play-mask",attrs:{role:"option"}},[t.tag?i("ui-tag",{staticClass:"mask-tag",attrs:{title:t.tag.title,type:t.tag.type}}):t._e(),t.tags?i("ui-tags",{staticClass:"mask-tag",attrs:{tags:t.tags}}):t._e(),i("div",{staticClass:"mask-tag scene-tag"},[t.tagDate?i("div",{staticClass:"scene-tag__date"},[i("span",[t._v(t._s(t.tagDate))])]):t._e(),t.tagTitle?i("div",{staticClass:"scene-tag__title"},[i("span",[t._v(t._s(t.tagTitle))])]):t._e()]),i("div",{staticClass:"extra-wrap",class:{"linear-gradient":t.showGradient&&!t.specialShadow},style:{padding:t.gradientPadding+"px"}},[t.specialShadow?i("div",{class:{"special-shadow":!0,"special-shadow--advanced":t.showAdvancedSpecialShadow,"special-shadow--hot-comment":!!t.hotComment}}):t._e(),t.hotComment&&t.hotComment.content&&t.hotComment.content.trim()?i("ui-clamp",{directives:[{name:"active",rawName:"v-active.stop",value:!!t.hotComment.jumpInfo,expression:"!!hotComment.jumpInfo",modifiers:{stop:!0}}],class:{"hot-comment":!0,active__opacity:!!t.hotComment.jumpInfo},attrs:{autoresize:"","max-lines":2,"raw-html":t.decodeEmoji(t.hotComment.content),"aria-label":t.hotComment.content,"data-report-id":t.M_itemReportId(t.hotComment,1)},nativeOn:{click:function(e){return t.tapHotComment.apply(null,arguments)}},scopedSlots:t._u([{key:"before",fn:function(){return[i("span",{staticClass:"hot-comment__item-wrap"},[i("span",{staticClass:"hot-comment__label"},[t._v(t._s(t.hotComment.label))])])]},proxy:!0},{key:"after",fn:function(){return[i("span",{staticClass:"hot-comment__item-wrap"},[i("span",{staticClass:"hot-comment__like"},[i("online-image",{staticClass:"icon-like",attrs:{url:"https://res.wx.qq.com/t/fed_upload/59ee2753-a126-4495-bd1e-daccbdc285bf/like2_outlined.svg"}}),i("span",{staticClass:"ui-aria-hidden"},[t._v(", 获得")]),i("span",[t._v(t._s(t.hotComment.likeNum))]),i("span",{staticClass:"ui-aria-hidden"},[t._v("个赞")])],1)])]},proxy:!0}],null,!1,151505576)},[i("span",{staticClass:"hot-comment__content"})]):[t.friendInfo&&t.friendInfo.avatars&&t.friendInfo.avatars.length>0?i("div",{staticClass:"social",attrs:{"aria-hidden":"true"}},[i("div",{staticClass:"social__avatars"},t._l(t.friendInfo.avatars,(function(t){return i("ui-image",{key:t,staticClass:"social__avatar",attrs:{url:t,size:28,mode:"avatar"}})})),1),t.friendInfo.text?i("div",{staticClass:"social__title"},[t._v("\n          "+t._s(t.friendInfo.text)+"\n        ")]):t._e(),t.friendInfo.afterText?i("div",{staticClass:"social__after-text"},[t._v("\n          "+t._s(t.friendInfo.afterText)+"\n        ")]):t._e(),i("online-image",{staticClass:"social__mark",attrs:{url:"https://res.wx.qq.com/t/fed_upload/947ffded-fd95-4cf1-853c-1f052774f6aa/like_outlined_medium.svg"}})],1):t._e(),t.title?i("div",{staticClass:"vc-title",domProps:{innerHTML:t._s(t.xss(t.title))}}):t._e(),t.desc?i("div",{staticClass:"vc-desc",domProps:{innerHTML:t._s(t.xss(t.desc))}}):t._e(),t.durationAtLeftBottom?i("div",{staticClass:"play-mask__text",attrs:{role:"option"}},[i("span",{staticClass:"ui-aria-hidden"},[t._v("时长：")]),i("span",{staticStyle:{"font-weight":"normal"}},[t._v(t._s(t.durationAtLeftBottom))])]):t.dateTime?i("div",{staticClass:"datetime"},[t._v("\n        "+t._s(t.dateTime)+"\n      ")]):!t.useUiSource&&t.source?i("div",{directives:[{name:"active",rawName:"v-active.stop",value:t.tapSourceAlone,expression:"tapSourceAlone",modifiers:{stop:!0}}],staticClass:"vc-source",class:{"vc-source_with-tag":t.source.tag,active__opacity:t.source.jumpInfo&&t.tapSourceAlone},attrs:{"data-report-id":t.M_itemReportId(t.source)},on:{click:function(e){return e.stopPropagation(),t.tapSource(t.source)}}},[t.source.iconUrl?i("ui-image",{staticClass:"vc-source__thumb",attrs:{url:t.source.iconUrl,size:20,mode:"avatar",overlay:""}}):t._e(),t.source.title||t.source.mark?i("div",{staticClass:"vc-source-title-box"},[i("div",{staticClass:"vc-source__title"},[i("p",{staticClass:"vc-source__text",domProps:{innerHTML:t._s(t.xss(t.source.title))}}),i("div",{staticClass:"badges"},t._l(t.source.mark,(function(t){return i("ui-image",{key:t,attrs:{url:t,size:16,mode:"raw"}})})),1),i("p",{staticClass:"vc-source__dateTime",domProps:{innerHTML:t._s(t.xss(t.source.dateTime))}})])]):t._e()],1):t.source?i("ui-source",t._b({directives:[{name:"active",rawName:"v-active.stop",value:!!t.source.jumpInfo,expression:"!!source.jumpInfo",modifiers:{stop:!0}}],attrs:{"data-report-id":t.M_itemReportId(t.source)},nativeOn:{click:function(e){return e.stopPropagation(),t.tapSource(t.source)}},scopedSlots:t._u([{key:"after-text",fn:function(){},proxy:!0}])},"ui-source",t.source,!1)):t._e(),i("div",{staticClass:"extra-info-gap"}),t.ts||t.text?i("span",{directives:[{name:"active",rawName:"v-active.stop",value:t.tapTextAlone,expression:"tapTextAlone",modifiers:{stop:!0}}],staticClass:"play-mask__bg active__opacity"},[t.like?i("span",{staticClass:"play-mask__text",attrs:{role:"option"}},[t.isHot?i("online-image",{staticClass:"icon-like",attrs:{url:"https://res.wx.qq.com/t/fed_upload/1f3fb4f3-6753-466e-9a75-eef436716497/fire.svg"}}):i("online-image",{staticClass:"icon-like",attrs:{url:"https://res.wx.qq.com/t/fed_upload/947ffded-fd95-4cf1-853c-1f052774f6aa/like_outlined_medium.svg"}}),i("span",{staticClass:"ui-aria-hidden"},[t._v("，点赞：")]),i("span",[t._v(t._s(t.text))])],1):i("span",{staticClass:"play-mask__text",attrs:{role:"option"}},[t.durationAtLeftBottom?t._e():[t.ts||t.duration||t.text.toString().indexOf(":")>-1?i("span",{staticClass:"ui-aria-hidden"},[t._v("，时长：")]):t._e(),t.liveWatch?i("span",{staticClass:"ui-aria-hidden"},[t._v(t._s("，"+t.text))]):t._e(),t.ts?i("span",[t._v(t._s(t._f("mmss")(t.ts)))]):i("span",{attrs:{"aria-hidden":t.liveWatch}},[t._v(t._s(t.text))])],t.isTop?i("online-image",{staticClass:"icon-top",attrs:{url:"https://res.wx.qq.com/t/fed_upload/d649fe44-ec25-474b-bcc0-2281a0105218/top.svg"}}):t._e()],2)]):t._e(),i("span",{staticClass:"ui-aria-hidden"},[t._v(t._s(","+t.maskTypeText+"。"))])]],2),t.noIcon?t._e():i("div",{staticClass:"play-icon-wrapper"},[i("ui-image",{staticClass:"play-icon",attrs:{"aria-label":"播放",url:t.iconUrl,size:t.size,type:"img"}})],1),t.liveEnd?i("div",{staticClass:"live-end-tip"},[i("ui-image",{staticClass:"live-end-icon",attrs:{url:"https://res.wx.qq.com/a/fed_upload/4e09c767-7238-4dab-bb48-8da245eeb470/live_icon.svg",size:20}}),i("span",[t._v("直播已结束")])],1):t._e()],1)}),[],!1,null,"7c7a3501",null);e.a=r.exports},484:function(t,e,i){"use strict";i(469)},486:function(t,e,i){"use strict";i(470)},487:function(t,e,i){"use strict";i(471)},489:function(t,e,i){"use strict";var s=i(39),a=i(459),n={props:{title:{type:String,default:""},tags:{type:Array,default:function(){return[]}},jump:{type:Boolean,default:!0},moreText:{type:String,default:""}}},o=(i(486),i(4)),r=Object(o.a)(n,(function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"oz__header line",class:{active__item:t.jump},attrs:{role:t.jump?"button":"option"}},[i("div",{staticClass:"line__item oz__header-word",class:{flex1:t.jump&&t.moreText}},[i("p",[t._v(t._s(t.title))]),t.tags.length?i("ui-tags",{attrs:{flex:"",tags:t.tags}}):t._e()],1),t.jump&&!t.moreText?i("ui-arrow",{attrs:{gap:0,align:"flex"}}):t.jump&&t.moreText?i("div",{directives:[{name:"active",rawName:"v-active.stop",modifiers:{stop:!0}}],staticClass:"oz__header-more active__mask",on:{click:function(e){return e.stopPropagation(),t.$emit("tap:more",{zone:3,content:"更多"})}}},[t._v("\n    "+t._s(t.moreText)+"\n    "),i("ui-arrow")],1):t._e()],1)}),[],!1,null,null,null).exports,c=i(0),u=i(2),l={components:{accessHeader:r},mixins:[c.k,s.a,a.a],props:{data:{type:Object,default:function(){return{}}},item:{type:Object,default:function(){return{}}},pos:{type:Number,default:0},typePos:{type:Number,default:0}},computed:{header:function(){return this.item.header||{}},jump:function(){return!!(this.header.jumpUrl||this.header.weappUrl||this.header.jumpInfo)},moreText:function(){return this.header.moreText||c.g.L("更多")}},methods:{tap:function(t){var e=this;c.g.isObjectEmpty(t)&&(t={zone:1});var i=t.zone;c.g.fastClickCheck((function(){var s=e,a=JSON.parse(JSON.stringify(s.header)),n=a.jumpInfo,o={parentSearchID:e.M_composeParentSid({t:e.item.parentType||0,s:c.b.searchId,did:e.item.docID,rid:e.$store.state.result.previousRid}),crossExtReqParams:[{key:"cookies",textValue:e.$store.state.result.state.cookies}],subType:n&&n.subType||e.data.subType||""};n?n.jumpType===u.l.VERTICAL?n=Object.assign({extParams:o},n):n.jumpType===u.l.H5&&(n.jumpUrl=c.g.addParamsToURLSearch(c.g.object2params({tmplByPassJson:JSON.stringify(o)}),n.jumpUrl)):a.jumpUrl&&(a.jumpUrl=c.g.addParamsToURLSearch(c.g.object2params({tmplByPassJson:JSON.stringify(o)}),a.jumpUrl)),s.ozJump(n||s.header),s.M_clickReport({clickZone:i||1,clickContent:t.content||s.header.title})}),2e3),this.$emit("tap")}}},d=(i(487),Object(o.a)(l,(function(){var t=this,e=t.$createElement,i=t._self._c||e;return t.item.header?i("accessHeader",{attrs:{title:t.item.header.title,jump:t.jump,tags:t.item.header.tag,"more-text":t.moreText},on:{"tap:more":t.tap},nativeOn:{click:function(e){return e.stopPropagation(),t.tap.apply(null,arguments)}}}):t._e()}),[],!1,null,null,null));e.a=d.exports},577:function(t,e,i){},583:function(t,e,i){"use strict";i(577)}}]);