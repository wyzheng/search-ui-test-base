(window.webpackJsonp=window.webpackJsonp||[]).push([[6],{1349:function(t,e,i){},1507:function(t,e,i){},1523:function(t,e,i){},1580:function(t,e,i){},2331:function(t,e,i){"use strict";i(1349)},2369:function(t,e,i){"use strict";i(1523)},2449:function(t,e,i){"use strict";i(1507)},2450:function(t,e,i){"use strict";i(1580)},459:function(t,e,i){"use strict";var a={methods:{ozJump:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},e=this;e.M_confirm_go(t.dialog,t)}},computed:{M_canHeaderJump:function(){return!!this.item.header&&!!(this.item.header.jumpUrl||this.item.header.weappUrl||this.item.header.jumpInfo)}}};e.a=a},469:function(t,e,i){},480:function(t,e,i){"use strict";var a=i(493),n=i(0),o={mixins:[n.k,n.m],props:{useUiSource:{type:Boolean,default:!1},text:{type:[String,Number],default:""},size:{type:Number,default:32},iconUrl:{type:String,default:"https://res.wx.qq.com/a/fed_upload/658e7c8d-708d-499b-8d41-4cca1d510d03/play.svg"},ts:{type:Number,default:0},liveWatch:{type:Boolean,default:!1},like:{type:Boolean,default:!1},isHot:{type:Boolean,default:!1},duration:{type:Boolean,default:!1},durationAtLeftBottom:{type:String,default:""},isTop:{type:Boolean,default:!1},noIcon:{type:Boolean,default:!1},dateTime:{type:String,default:""},tag:{type:Object,default:function(){}},tags:{type:Array,default:function(){return[]}},liveEnd:{type:Boolean,default:!1},tapSourceAlone:{type:Boolean,default:!1},tapTextAlone:{type:Boolean,default:!1},title:{type:String,default:""},desc:{type:String,default:""},source:{type:Object,default:function(){return{}}},friendInfo:{type:Object,default:function(){return{}}},showGradient:{type:Boolean,default:!1},gradientPadding:{type:Number,default:8},maskType:{type:Number,default:1},tagDate:{type:String,default:""},tagTitle:{type:String,default:""},specialShadow:{type:Boolean,default:!1},hotComment:{type:Object,default:function(){return{}}}},computed:{maskTypeText:function(){return{1:"视频",2:"文章"}[this.maskType]},showAdvancedSpecialShadow:function(){return(!!this.dateTime||!!this.source||!!this.ts||this.text)&&(!!this.friendInfo&&!!this.friendInfo.avatars&&this.friendInfo.avatars.length>0||!!this.title||!!this.desc)&&!this.hotComment}},methods:{decodeEmoji:function(t){if(t){var e=t.replace(/\\n/gi," ");return Object(a.decode)(e)}return""},tapSource:function(t){this.$emit("tap:source",t,this.M_getItemPos(t))},tapHotComment:function(t){this.hotComment.jumpInfo&&(t.stopPropagation(),this.M_go(this.hotComment.jumpInfo),this.M_clickReport({clickZone:1,itemPos:this.M_getItemPos(this.hotComment),reportItem:this.reportItem},this.hotComment))}}},r=(i(583),i(484),i(4)),s=Object(r.a)(o,(function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"play-mask",attrs:{role:"option"}},[t.tag?i("ui-tag",{staticClass:"mask-tag",attrs:{title:t.tag.title,type:t.tag.type}}):t._e(),t.tags?i("ui-tags",{staticClass:"mask-tag",attrs:{tags:t.tags}}):t._e(),i("div",{staticClass:"mask-tag scene-tag"},[t.tagDate?i("div",{staticClass:"scene-tag__date"},[i("span",[t._v(t._s(t.tagDate))])]):t._e(),t.tagTitle?i("div",{staticClass:"scene-tag__title"},[i("span",[t._v(t._s(t.tagTitle))])]):t._e()]),i("div",{staticClass:"extra-wrap",class:{"linear-gradient":t.showGradient&&!t.specialShadow},style:{padding:t.gradientPadding+"px"}},[t.specialShadow?i("div",{class:{"special-shadow":!0,"special-shadow--advanced":t.showAdvancedSpecialShadow,"special-shadow--hot-comment":!!t.hotComment}}):t._e(),t.hotComment&&t.hotComment.content&&t.hotComment.content.trim()?i("ui-clamp",{directives:[{name:"active",rawName:"v-active.stop",value:!!t.hotComment.jumpInfo,expression:"!!hotComment.jumpInfo",modifiers:{stop:!0}}],class:{"hot-comment":!0,active__opacity:!!t.hotComment.jumpInfo},attrs:{autoresize:"","max-lines":2,"raw-html":t.decodeEmoji(t.hotComment.content),"aria-label":t.hotComment.content,"data-report-id":t.M_itemReportId(t.hotComment,1)},nativeOn:{click:function(e){return t.tapHotComment.apply(null,arguments)}},scopedSlots:t._u([{key:"before",fn:function(){return[i("span",{staticClass:"hot-comment__item-wrap"},[i("span",{staticClass:"hot-comment__label"},[t._v(t._s(t.hotComment.label))])])]},proxy:!0},{key:"after",fn:function(){return[i("span",{staticClass:"hot-comment__item-wrap"},[i("span",{staticClass:"hot-comment__like"},[i("online-image",{staticClass:"icon-like",attrs:{url:"https://res.wx.qq.com/t/fed_upload/59ee2753-a126-4495-bd1e-daccbdc285bf/like2_outlined.svg"}}),i("span",{staticClass:"ui-aria-hidden"},[t._v(", 获得")]),i("span",[t._v(t._s(t.hotComment.likeNum))]),i("span",{staticClass:"ui-aria-hidden"},[t._v("个赞")])],1)])]},proxy:!0}],null,!1,151505576)},[i("span",{staticClass:"hot-comment__content"})]):[t.friendInfo&&t.friendInfo.avatars&&t.friendInfo.avatars.length>0?i("div",{staticClass:"social",attrs:{"aria-hidden":"true"}},[i("div",{staticClass:"social__avatars"},t._l(t.friendInfo.avatars,(function(t){return i("ui-image",{key:t,staticClass:"social__avatar",attrs:{url:t,size:28,mode:"avatar"}})})),1),t.friendInfo.text?i("div",{staticClass:"social__title"},[t._v("\n          "+t._s(t.friendInfo.text)+"\n        ")]):t._e(),t.friendInfo.afterText?i("div",{staticClass:"social__after-text"},[t._v("\n          "+t._s(t.friendInfo.afterText)+"\n        ")]):t._e(),i("online-image",{staticClass:"social__mark",attrs:{url:"https://res.wx.qq.com/t/fed_upload/947ffded-fd95-4cf1-853c-1f052774f6aa/like_outlined_medium.svg"}})],1):t._e(),t.title?i("div",{staticClass:"vc-title",domProps:{innerHTML:t._s(t.xss(t.title))}}):t._e(),t.desc?i("div",{staticClass:"vc-desc",domProps:{innerHTML:t._s(t.xss(t.desc))}}):t._e(),t.durationAtLeftBottom?i("div",{staticClass:"play-mask__text",attrs:{role:"option"}},[i("span",{staticClass:"ui-aria-hidden"},[t._v("时长：")]),i("span",{staticStyle:{"font-weight":"normal"}},[t._v(t._s(t.durationAtLeftBottom))])]):t.dateTime?i("div",{staticClass:"datetime"},[t._v("\n        "+t._s(t.dateTime)+"\n      ")]):!t.useUiSource&&t.source?i("div",{directives:[{name:"active",rawName:"v-active.stop",value:t.tapSourceAlone,expression:"tapSourceAlone",modifiers:{stop:!0}}],staticClass:"vc-source",class:{"vc-source_with-tag":t.source.tag,active__opacity:t.source.jumpInfo&&t.tapSourceAlone},attrs:{"data-report-id":t.M_itemReportId(t.source)},on:{click:function(e){return e.stopPropagation(),t.tapSource(t.source)}}},[t.source.iconUrl?i("ui-image",{staticClass:"vc-source__thumb",attrs:{url:t.source.iconUrl,size:20,mode:"avatar",overlay:""}}):t._e(),t.source.title||t.source.mark?i("div",{staticClass:"vc-source-title-box"},[i("div",{staticClass:"vc-source__title"},[i("p",{staticClass:"vc-source__text",domProps:{innerHTML:t._s(t.xss(t.source.title))}}),i("div",{staticClass:"badges"},t._l(t.source.mark,(function(t){return i("ui-image",{key:t,attrs:{url:t,size:16,mode:"raw"}})})),1),i("p",{staticClass:"vc-source__dateTime",domProps:{innerHTML:t._s(t.xss(t.source.dateTime))}})])]):t._e()],1):t.source?i("ui-source",t._b({directives:[{name:"active",rawName:"v-active.stop",value:!!t.source.jumpInfo,expression:"!!source.jumpInfo",modifiers:{stop:!0}}],attrs:{"data-report-id":t.M_itemReportId(t.source)},nativeOn:{click:function(e){return e.stopPropagation(),t.tapSource(t.source)}},scopedSlots:t._u([{key:"after-text",fn:function(){},proxy:!0}])},"ui-source",t.source,!1)):t._e(),i("div",{staticClass:"extra-info-gap"}),t.ts||t.text?i("span",{directives:[{name:"active",rawName:"v-active.stop",value:t.tapTextAlone,expression:"tapTextAlone",modifiers:{stop:!0}}],staticClass:"play-mask__bg active__opacity"},[t.like?i("span",{staticClass:"play-mask__text",attrs:{role:"option"}},[t.isHot?i("online-image",{staticClass:"icon-like",attrs:{url:"https://res.wx.qq.com/t/fed_upload/1f3fb4f3-6753-466e-9a75-eef436716497/fire.svg"}}):i("online-image",{staticClass:"icon-like",attrs:{url:"https://res.wx.qq.com/t/fed_upload/947ffded-fd95-4cf1-853c-1f052774f6aa/like_outlined_medium.svg"}}),i("span",{staticClass:"ui-aria-hidden"},[t._v("，点赞：")]),i("span",[t._v(t._s(t.text))])],1):i("span",{staticClass:"play-mask__text",attrs:{role:"option"}},[t.durationAtLeftBottom?t._e():[t.ts||t.duration||t.text.toString().indexOf(":")>-1?i("span",{staticClass:"ui-aria-hidden"},[t._v("，时长：")]):t._e(),t.liveWatch?i("span",{staticClass:"ui-aria-hidden"},[t._v(t._s("，"+t.text))]):t._e(),t.ts?i("span",[t._v(t._s(t._f("mmss")(t.ts)))]):i("span",{attrs:{"aria-hidden":t.liveWatch}},[t._v(t._s(t.text))])],t.isTop?i("online-image",{staticClass:"icon-top",attrs:{url:"https://res.wx.qq.com/t/fed_upload/d649fe44-ec25-474b-bcc0-2281a0105218/top.svg"}}):t._e()],2)]):t._e(),i("span",{staticClass:"ui-aria-hidden"},[t._v(t._s(","+t.maskTypeText+"。"))])]],2),t.noIcon?t._e():i("div",{staticClass:"play-icon-wrapper"},[i("ui-image",{staticClass:"play-icon",attrs:{"aria-label":"播放",url:t.iconUrl,size:t.size,type:"img"}})],1),t.liveEnd?i("div",{staticClass:"live-end-tip"},[i("ui-image",{staticClass:"live-end-icon",attrs:{url:"https://res.wx.qq.com/a/fed_upload/4e09c767-7238-4dab-bb48-8da245eeb470/live_icon.svg",size:20}}),i("span",[t._v("直播已结束")])],1):t._e()],1)}),[],!1,null,"7c7a3501",null);e.a=s.exports},484:function(t,e,i){"use strict";i(469)},485:function(t,e,i){"use strict";function a(t){return!!t.jumpInfo||(!!t.jumpType||!(!t.userName&&!t.jumpUrl))}i.d(e,"a",(function(){return a}))},513:function(t,e,i){"use strict";i.r(e);var a=i(24),n=i.n(a),o=i(1),r=i.n(o),s=i(0),c=i(8),d=(i(12),i(2)),u=i(480),p=i(504),l={name:"ActivityCardContainer",components:{"v-mask":u.a,VideoPlayer:p.a},props:{imageUrl:String,videoUrl:String,duration:[String,Number],strDuration:String,likeNum:String,noPlayIcon:{type:Boolean,default:!0},tag:Object,readNum:String,nonceId:String,exportId:String,pollingCgi:Object,activityBlock:Object},methods:{onVideoError:function(){this.$emit("video:error")},onTapMask:function(){this.$emit("tap:card")},onTapCard:function(){this.$emit("tap:card")}}},m=(i(2450),i(4));function f(t,e){var i=Object.keys(t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(t);e&&(a=a.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),i.push.apply(i,a)}return i}function h(t){for(var e=1;e<arguments.length;e++){var i=null!=arguments[e]?arguments[e]:{};e%2?f(Object(i),!0).forEach((function(e){r()(t,e,i[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(i)):f(Object(i)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(i,e))}))}return t}var v={name:"ActivityCard",components:{ActivityCardContainer:Object(m.a)(l,(function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"activity-card-container-wrap",on:{click:function(e){return e.stopPropagation(),t.onTapCard.apply(null,arguments)}}},[i("video-player",{staticClass:"activity-card-container",attrs:{src:t.videoUrl,poster:t.imageUrl,"export-id":t.exportId,"nonce-id":t.nonceId,"round-corner":!0,"aspect-ratio":9/16,"round-corner-size":8,"polling-cgi":t.pollingCgi,tag:t.tag,controls:t.noPlayIcon?[]:["sound","play"]}},[i("div",{staticClass:"slot-wrapper"},[t._t("default")],2)]),t.likeNum||t.duration||t.strDuration||t.readNum||t.activityBlock?i("v-mask",{attrs:{text:t.likeNum||t.duration||t.strDuration||t.readNum,like:!!t.likeNum,"no-icon":!0,size:40,"gradient-padding":12,source:t.activityBlock.source,title:t.activityBlock.title,desc:t.activityBlock.desc||t.activityBlock.descList&&t.activityBlock.descList[0],"use-ui-source":"","special-shadow":""},nativeOn:{click:function(e){return t.onTapMask.apply(null,arguments)}}}):t._e()],1)}),[],!1,null,"6232e55c",null).exports},mixins:[s.m,s.k],props:{cardInfo:Object,noPlay:Boolean},data:function(){return{bubbleImg:"https://res.wx.qq.com/t/fed_upload/cda467f7-0a71-4cb8-91cc-4aabbc7a45e9/bubble.gif",shakeImg:"https://res.wx.qq.com/t/fed_upload/8e4d6632-fd0a-462a-8d38-9a5aec4e34d7/shake.gif?",endAction:Global.os.android?"terminate":"suspend",isShakeCardExpose:!1,isOverSpread:!1,openADFlag:!0,transitionFlag:!0,playingFlag:!1,showBubble:!1,useGif:!1,isFirst:!0}},computed:{activity:function(){return this.cardInfo.activityBlock},menus:function(){return this.cardInfo.menus},isShakeType:function(){return 51005==this.cardInfo.cardType}},mounted:function(){var t=this;this.isShakeType&&(new IntersectionObserver(this.handleObserve,{threshold:.95}).observe(this.$el),this.preloadAD(),s.a.$on(s.j.APP_VIEW_CHANGED,(function(e){"index"==e.page&&t.suspend()})),c.b.onDeviceMotionFired(this.onMotionFired),c.b.onWebviewResume(this.onResume),c.b.onWebviewPause(this.suspend))},beforeDestroy:function(){this.isShakeType&&(c.b.offDeviceMotionFired(this.onMotionFired),c.b.offWebviewResume(this.onResume),c.b.offWebviewPause(this.suspend))},methods:{onVideoError:function(t){this.$emit("video:error",t)},onTapPlay:function(t){this.$emit("tap:play",t)},onTapCard:function(t){this.$emit("tap:card",t)},onTapButton:function(t){this.$emit("tap:button",h(h({},t),{},{itemPos:this.M_itemReportIdMap[t.reportId]}))},onTapMenu:function(t){this.$emit("tap:menu",h(h({},t),{},{itemPos:this.M_itemReportIdMap[t.reportId]}))},onTapInfo:function(t,e){if(this.isShakeType&&!this.playingFlag){this.transitionFlag=!0,this.playingFlag=!0,this.isOverSpread=!0,this.refreshAnimation(),this.$emit("tap:info",t);this.$emit("shake:card",this.cardInfo,{actionId:2,actionCarrier:3}),e.stopPropagation()}},onMotionFired:function(){if(this.openADFlag){this.openADFlag=!1;this.$emit("shake:card",this.cardInfo,{actionId:7,actionCarrier:3})}},activate:function(){s.h.deviceMotionMonitor({action:"activate",amplitude:.65})},suspend:function(){s.h.deviceMotionMonitor({action:this.endAction})},preloadAD:function(){var t=d.h.jumpType,e=this.cardInfo,i=e.jumpInfoForShake,a=e.jumpInfo;a.jumpType==t.AD_NATIVE&&this.M_go({jumpInfo:h({preLoad:1},a)}),i.jumpType==t.AD_NATIVE&&this.M_go({jumpInfo:h({preLoad:1},i)})},handleObserve:function(t,e){var i=this;t.forEach((function(t){var e=t.isIntersecting;i.isShakeCardExpose=e,e?i.activate():i.suspend(),i.isFirst&&e&&i.startAnimation()}))},startAnimation:function(){var t=this,e=new Image;e.onload=function(){t.isFirst=!1,t.playingFlag=!0,t.useGif=!0,setTimeout((function(){t.useGif=!1,t.isOverSpread=!0,t.refreshAnimation();t.$emit("shake:card",t.cardInfo,{actionId:2,actionCarrier:3})}),1200)},e.src=t.shakeImg},onResume:function(){this.isShakeCardExpose&&this.activate(),this.openADFlag=!0},transitionEnd:function(t){var e=this;if(e.transitionFlag&&t.target===t.currentTarget){e.transitionFlag=!1;var i=new Image;i.onload=function(){e.useGif=!0,e.showBubble=!0,setTimeout((function(){e.useGif=!1,e.showBubble=!1,e.isOverSpread=!1,setTimeout((function(){e.playingFlag=!1}),400)}),3600)},i.src=e.shakeImg}},refreshAnimation:function(){var t=new Image;t.onload=function(){};var e=this.shakeImg.split("?")[0];this.shakeImg="".concat(e,"?time=").concat(Math.random()),t.src=this.shakeImg}}},g=(i(2449),Object(m.a)(v,(function(){var t=this,e=t.$createElement,i=t._self._c||e;return t.cardInfo?i("activity-card-container",t._b({directives:[{name:"active",rawName:"v-active"}],staticClass:"media-card",attrs:{"read-num":"","no-play":t.noPlay},on:{"tap:card":function(e){return t.onTapCard(t.cardInfo)},"tap:play":function(e){return t.onTapPlay(t.cardInfo)},"video:error":function(e){return t.onVideoError(t.cardInfo)}}},"activity-card-container",t.cardInfo,!1),[t.activity&&(t.activity.title||t.activity.descList||t.activity.button||t.activity.source)||t.cardInfo.readNum?i("div",{staticClass:"activity",class:{overSpread:t.isOverSpread,shakeCardType:t.isShakeType}},[i("div",{staticClass:"activity-inner"},[i("div",{directives:[{name:"active",rawName:"v-active.stop",value:t.isShakeType,expression:"isShakeType",modifiers:{stop:!0}}],staticClass:"activity-info",attrs:{role:"button"},on:{click:function(e){return t.onTapInfo(t.cardInfo,e)}}},[t.isShakeType?i("div",{directives:[{name:"active",rawName:"v-active.stop",modifiers:{stop:!0}}],staticClass:"activity-icon",on:{transitionend:t.transitionEnd}},[i("div",{directives:[{name:"show",rawName:"v-show",value:t.showBubble,expression:"showBubble"},{name:"image",rawName:"v-image:custom",value:t.bubbleImg,expression:"bubbleImg",arg:"custom"}],staticClass:"gif-icon-bubble"}),i("svg-icon",{directives:[{name:"show",rawName:"v-show",value:!t.useGif,expression:"!useGif"}],attrs:{name:"shake"}}),i("div",{directives:[{name:"show",rawName:"v-show",value:t.useGif,expression:"useGif"},{name:"image",rawName:"v-image:custom",value:t.shakeImg,expression:"shakeImg",arg:"custom"}],staticClass:"gif-icon-shake"})],1):t._e()]),t.activity.button?i("ui-button",{staticStyle:{"margin-left":"12px"},attrs:{mini:"",loading:t.cardInfo.loading,title:t.activity.button.title,"data-report-id":t.M_itemReportId(t.activity.button.reportId)},nativeOn:{click:function(e){return e.stopPropagation(),t.onTapButton(t.activity.button)}}}):t.cardInfo.readNum&&0!=t.cardInfo.readNum?i("div",{staticClass:"text-mask"},[t._v(t._s(t.cardInfo.readNum))]):t._e()],1)]):t.menus&&t.menus.length?i("div",{staticClass:"menus"},[i("div",{staticClass:"menus-inner"},t._l(t.menus,(function(e,a){return i("div",{directives:[{name:"active",rawName:"v-active.stop",modifiers:{stop:!0}}],key:e.title+a,staticClass:"menu-item active__opacity",attrs:{role:"button","data-report-id":t.M_itemReportId(e.reportId,a+1)},on:{click:function(i){return i.stopPropagation(),t.onTapMenu(e)}}},[t._v("\n        "+t._s(e.title)+"\n      ")])})),0)]):t._e()]):t._e()}),[],!1,null,"de41c296",null).exports),y=i(39),_=i(459);function b(t,e){var i=Object.keys(t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(t);e&&(a=a.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),i.push.apply(i,a)}return i}function I(t){for(var e=1;e<arguments.length;e++){var i=null!=arguments[e]?arguments[e]:{};e%2?b(Object(i),!0).forEach((function(e){r()(t,e,i[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(i)):b(Object(i)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(i,e))}))}return t}var C={name:"ActivityCardSlide",components:{ActivityCard:g,UiScroll:i(809).a},mixins:[y.a,_.a,s.k],props:{list:Array,decayFactor:{type:Number,default:1},padding:Number},computed:{isOneCard:function(){return 1===this.list.length}},mounted:function(){this.list.length>=1&&this.$emit("expose:card",I(I({},this.list[0]),{},{index:0}))},methods:{onVideoError:function(t,e){this.$emit("video:error",I(I({},t),{},{index:e}))},onTapPlay:function(t,e){this.$emit("tap:play",I(I({},t),{},{index:e}))},onTapCard:function(t,e){this.$emit("tap:card",I(I({},t),{},{index:e,itemPos:this.M_getItemPos(t.reportId)}))},onTapButton:function(t,e){this.$emit("tap:button",I(I({},t),{},{index:e}))},onTapMenu:function(t,e){this.$emit("tap:menu",I(I({},t),{},{index:e}))},onTapInfo:function(t,e){this.$emit("tap:info",I(I({},t),{},{index:e}))},onShakeCard:function(t,e){this.$emit("shake:card",t,e)},onScrollEnd:function(t){var e=t.map((function(t,e){return I(I({},t),{},{index:e})})).filter((function(t){return t.include&&t.visible})),i=(e&&e[0]||{}).index;if(void 0!==i){var a=this.list[i];a.isShow||(this.$emit("onShow:card",{index:i,itemPos:this.M_getItemPos(a.reportId)}),this.$emit("expose:card",I(I({},this.list[i]),{},{index:i})))}},getItemWidth:function(){return this.$refs.card.$el.scrollWidth+8}}},k=(i(2331),Object(m.a)(C,(function(){var t=this,e=t.$createElement,i=t._self._c||e;return t.list?i("div",{staticClass:"activity-card-slide"},[t.isOneCard?i("div",{staticClass:"only-media-card"},[i("activity-card",{attrs:{"card-info":t.list&&t.list[0],"data-report-id":t.M_itemReportId(t.list[0].reportId,1)},on:{"video:error":function(e){return t.onVideoError(e,0)},"tap:play":function(e){return t.onTapPlay(e,0)},"tap:card":function(e){return t.onTapCard(e,0)},"tap:button":function(e){return t.onTapButton(e,0)},"tap:menu":function(e){return t.onTapMenu(e,0)},"tap:info":function(e){return t.onTapInfo(e,0)},"shake:card":function(e){return t.onShakeCard(arguments,0)}}})],1):i("ui-scroll",{directives:[{name:"arrow-scroll",rawName:"v-arrow-scroll",value:{step:t.getItemWidth},expression:"{ step: getItemWidth }"}],attrs:{snap:"",padding:t.padding||16,items:t.list,wait:50,role:"listbox","decay-factor":t.decayFactor},on:{scrollEnd:t.onScrollEnd},scopedSlots:t._u([{key:"default",fn:function(e){var a=e.item,n=e.index;return[i("activity-card",{ref:"card",attrs:{"card-info":a,"data-report-id":t.M_itemReportId(a.reportId,n+1)},on:{"video:error":function(e){return t.onVideoError(e,n)},"tap:play":function(e){return t.onTapPlay(e,n)},"tap:card":function(e){return t.onTapCard(e,n)},"tap:button":function(e){return t.onTapButton(e,n)},"tap:menu":function(e){return t.onTapMenu(e,n)},"tap:info":function(e){return t.onTapInfo(e,n)},"shake:card":function(e){return t.onShakeCard(arguments,n)}}})]}}],null,!1,1064952083)})],1):t._e()}),[],!1,null,"226f0e0f",null).exports),x=i(485),w=i(15),T=i(3),S=i(28),O=new(i(10).a)({COMMON:51001,MENUS:51002,STOCK:51003,SINGLE:51004,SHAKE:51005,VIDEO:51006,SUBSCRIBE:51007});function j(t,e){var i=Object.keys(t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(t);e&&(a=a.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),i.push.apply(i,a)}return i}function P(t){for(var e=1;e<arguments.length;e++){var i=null!=arguments[e]?arguments[e]:{};e%2?j(Object(i),!0).forEach((function(e){r()(t,e,i[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(i)):j(Object(i)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(i,e))}))}return t}var M={name:"Swiper",components:{ActivityCardSlide:k},mixins:[s.m,s.k],props:{data:{type:Object,default:function(){return{}}},item:{type:Object,default:function(){return{}}},source:{type:Object,default:function(){return{}}},pos:{type:Number,default:0},typePos:{type:Number,default:0},reservePaddingH:{type:Boolean,default:!1},decayFactor:{type:Number,default:1}},data:function(){return{renderList:[]}},computed:{itemInfo:function(){return s.g.isObjectEmpty(this.source)?this.item:this.source},isService:function(){return!s.g.isObjectEmpty(this.source)},isEliminatingPaddingH:function(){return this.isService&&!this.reservePaddingH}},watch:{item:{handler:function(){this.renderList=(this.itemInfo.list||[]).map((function(t,e){return P(P({videoUrl:""},t),{},{loading:!1,isShow:0===e,id:s.g.generateGuuId()})}))},immediate:!0}},methods:{onTapCard:function(t){if(Object(x.a)(t)){var e=t.index;this.M_go(t),this.clickReport({clickZone:2,clickContent:"",index:e,reportItem:{expand:t.jumpInfo&&t.jumpInfo.expandReport,target:t}}),this.useReportCgi(e),this.$emit("tap")}},onTapButton:function(t){var e=this,i=t.index,a=this.renderList[i];if(t.cgiName){var n=t.cgiName,o=t.reportId;if(this.clickReport({clickZone:3,clickContent:t.title||"",index:i,reportItem:{target:t}}),a.loading)return;this.$set(a,"loading",!0);var r=setTimeout((function(){e.$set(a,"loading",!1)}),3e3);s.h.getCommonCgiData({cgiName:t.cgiName,data:t.param}).then((function(t){if(e.$set(a,"loading",!1),T.a.$emit(s.j.hideToast),0!==t.errCode&&t.errMsg)e.$store.commit("updateDialog",{confirm:"确定",cancel:!1,title:t.errMsg});else{var i=a.cardType==O.SUBSCRIBE||"finderLivingSubscribe"===n;if(i&&t.errCode<0)e.$store.commit("updateDialog",{confirm:"确定",cancel:!1,title:"操作失败"});else{""!==t.successMsg&&T.a.$emit(s.j.showToast,{action:i?S.a.pure:S.a.done,text:t.successMsg||"已领取到卡包"});var c=t.activityBlock&&t.activityBlock.button||t.button;c&&e.$set(a.activityBlock,"button",P({reportId:o},c)),r&&clearTimeout(r)}}}))}else Object(x.a)(t)?(this.clickReport({clickZone:3,clickContent:t.title||"",index:i,reportItem:{target:t}}),this.M_go(t),this.useReportCgi(i)):Object(x.a)(a)&&(this.clickReport({clickZone:3,clickContent:t.title||"",index:i,reportItem:{expand:a.jumpInfo&&a.jumpInfo.expandReport,target:P(P({},a),{},{itemPos:t.itemPos||this.M_itemReportId(a.reportId,i+1),reportId:t.reportId||a.reportId})}}),this.M_go(a),this.useReportCgi(i));this.$emit("tap")},onTapMenu:function(t){if(Object(x.a)(t)){this.clickReport({clickZone:3,clickContent:t.title||"",index:e,reportItem:{expand:t.jumpInfo&&t.jumpInfo.expandReport,target:t}});var e=t.index;this.M_go(t),this.useReportCgi(e),this.$emit("tap")}},onTapInfo:function(t){var e=t.index;this.clickReport({clickZone:1,clickContent:t.activityBlock.title,index:e})},useReportCgi:function(t){var e=this,i=this.renderList[t],a=i.reportCgi;a&&a.cgiName&&s.h.getCommonCgiData({cgiName:a.cgiName,data:a.param}).then((function(t){t.activityBlock&&t.activityBlock.button&&e.$set(i.activityBlock,"button",t.activityBlock.button)}))},clickReport:function(t){var e=t.clickZone,i=t.clickContent,a=void 0===i?"":i,n=t.index,o=void 0===n?0:n,r=t.reportItem,s=void 0===r?{}:r,c=this.renderList[o],d=this.M_clickReport({clickZone:e,clickContent:a,reportItem:s},s.target).clickId;w.c.activitySlide.reportClick({docID:this.item.docID,cardPos:o,businessType:this.data.real_type?this.data.real_type:this.data.type,cardType:c.cardType,itemTitle:c.activityBlock&&c.activityBlock.title,itemType:c.realJumpType,logKeyId:d})},onExposeCard:function(t){T.a.$emit(s.j.exposeAnalysis),w.c.activitySlide.reportExpose({docID:this.item.docID,cardPos:t.index,businessType:this.data.real_type?this.data.real_type:this.data.type,cardType:t.cardType,itemTitle:t.activityBlock&&t.activityBlock.title,itemType:t.realJumpType})},onShowCard:function(t){var e=this,i=t.index,a=t.itemPos,n=this.renderList.findIndex((function(t){return t.isShow}));if(n>-1){var o=this.renderList[n];o.isShow&&this.M_clickReport({ban12721Report:!0,banAdReport:!0,clickContent:o.activityBlock&&o.activityBlock.title,actionType:d.g.HOR_TOUCHMOVE,itemPos:a},o)}this.renderList.forEach((function(t,a){e.$set(t,"isShow",a===i)})),this.$emit("tap")},onShakeCard:function(t,e){var i=n()(t,2),a=i[0],o=i[1];if(a.jumpInfoForShake){var r=o.actionCarrier,c=o.actionId;7==c&&this.M_go({jumpInfo:a.jumpInfoForShake});var d=s.g.generateGuuId();w.c.activitySlide.reportShake({docID:this.item.docID,cardPos:e,logKeyId:d,businessType:this.data.real_type?this.data.real_type:this.data.type,cardType:a.cardType,actionId:c,actionCarrier:r}),this.$emit("tap")}}}},B=(i(2369),Object(m.a)(M,(function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"slide oz__margin-dense oz__item oz__body",class:{"service-swiper":t.isEliminatingPaddingH},attrs:{"data-id":t.M_exposeId()}},[i("activity-card-slide",{ref:"slide",attrs:{list:t.renderList,"parent-box-report-id":t.boxReportId,"parent-doc-report-id":t.docReportId,"parent-item-pos":t.parentItemPos,"decay-factor":t.decayFactor,padding:t.itemInfo.padding},on:{"tap:card":t.onTapCard,"tap:button":t.onTapButton,"tap:menu":t.onTapMenu,"tap:info":t.onTapInfo,"expose:card":t.onExposeCard,"onShow:card":t.onShowCard,"shake:card":t.onShakeCard}})],1)}),[],!1,null,"bf68ea44",null));e.default=B.exports},577:function(t,e,i){},583:function(t,e,i){"use strict";i(577)}}]);