(window.webpackJsonp=window.webpackJsonp||[]).push([[173],{1337:function(e,t,i){},1338:function(e,t,i){},1339:function(e,t,i){},1976:function(e,t,i){"use strict";i(1337)},1977:function(e,t,i){"use strict";i(1338)},1978:function(e,t,i){"use strict";i(1339)},2194:function(e,t,i){"use strict";i.r(t);var a=i(1),s=i.n(a),o=i(0),r={VIDEO:1,LIVE_BROADCAST:2},n={name:"UiBlurImage",props:{ratio:{type:Number,default:4/3},imageUrl:{type:String,default:""},disableBlurMaxRatio:{type:Number,default:1e5},disableBlurMinRatio:{type:Number,default:0},innerRatio:{type:[Number,Boolean],default:!1}},data:function(){return{imageRatio:-1}},computed:{displayType:function(){return-1===this.imageRatio?0:this.imageRatio<this.disableBlurMaxRatio&&this.imageRatio>this.disableBlurMinRatio?1:2},innerStyle:function(){var e={backgroundImage:'url("'.concat(this.imageUrl,'")'),backgroundSize:1===this.displayType?"contain":"cover",width:"100%",paddingBottom:"".concat(100*this.ratio,"%")};return this.innerRatio&&(this.ratio>this.imageRatio?e.paddingBottom="".concat(100*this.innerRatio,"%"):(e.paddingBottom="0",e.height="100%",e.width="".concat((this.ratio/this.innerRatio*100).toFixed(1),"%")),e.backgroundSize=this.imageRatio>=this.innerRatio?"100% auto":"auto 100%"),e}},watch:{imageUrl:{handler:function(){var e=this,t=new Image;t.src=this.imageUrl,t.onload=function(){e.imageRatio=t.height/t.width}},immediate:!0}},methods:{}},c=(i(1976),i(1977),i(4)),u=Object(c.a)(n,(function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"ui-blur-image",style:{paddingBottom:100*this.ratio+"%"}},[1===this.displayType?t("div",{staticClass:"ui-blur-image-blur",style:{backgroundImage:"url('"+this.imageUrl+"')"}}):this._e(),t("div",{directives:[{name:"show",rawName:"v-show",value:this.displayType,expression:"displayType"}],staticClass:"ui-blur-image-clear",style:this.innerStyle}),t("div",{staticClass:"ui-blur-image-slot-wrapper"},[this._t("default")],2)])}),[],!1,null,"60c0e808",null).exports;u.install=function(e){e.component(u.name,u)};var l={name:"NewsHotBanner",components:{UiBlurImage:u,UiVideo:i(549).a},mixins:[o.k,o.m],props:{source:{type:Object,default:function(){return{}}},data:{type:Object,default:function(){return{}}},item:{type:Object,default:function(){return{}}},pos:{type:Number,default:0},typePos:{type:Number,default:0}},data:function(){return{cardType:r,innerRatio:!1}},computed:{hasVedio:function(){return this.source.videoInfo&&this.source.videoInfo.playUrl},cardType12:function(){return!!this.source.cardType&&(this.source.cardType===r.VIDEO||this.source.cardType===r.LIVE_BROADCAST)}},watch:s()({},"source.cardType",{handler:function(e){var t=this;if(this.source.cardType)if(1==e){var i=new Image;i.src=this.source.thumbUrl,i.onload=function(){var e=i.height/i.width;e<3/3.5?t.innerRatio=.56:e>3.5/3&&(t.innerRatio=1.17)}}else 2==e&&(this.innerRatio=1.34)},immediate:!0}),methods:{onTap:function(){if(this.M_serviceSearchGo(this.source.jumpInfo||this.source),this.cardType12){var e=this.data.items[0]&&this.data.items[0].title||this.source.subTitle;this.M_clickReport({clickZone:"".concat(this.M_getClickZonePath()),clickContent:e||"",expand:this.M_getJumpSubScene(this.source)})}else this.M_clickReport()},onTapSource:function(){if(this.cardType12){var e=this.source.source;this.M_serviceSearchGo(e.jumpInfo||this.source.jumpInfo||this.source),this.M_clickReport({clickZone:"".concat(this.M_getClickZonePath(),".source"),clickContent:e.title||"",expand:this.M_getJumpSubScene(e)})}else this.M_serviceSearchGo(this.source.jumpInfo||this.source),this.M_clickReport()}}},d=(i(1978),Object(c.a)(l,(function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{directives:[{name:"active",rawName:"v-active.stop",modifiers:{stop:!0}}],staticClass:"news-hot active__mask",on:{click:e.onTap}},[e.source.thumbUrl&&!e.hasVedio?i("div",{staticClass:"news-thumbUrl news-media news-has-banner",attrs:{"aria-hidden":"true"}},[e.source.cardType?i("ui-blur-image",{class:{"live-broadcast-end":!!e.source.liveEndTips},attrs:{"image-url":e.source.thumbUrl,ratio:e.source.cardType===e.cardType.LIVE_BROADCAST?.54:.56,"inner-ratio":e.innerRatio}},[e.source.cardType===e.cardType.LIVE_BROADCAST?i("div",{staticClass:"gradual-mask"}):e._e(),e.source.banner&&!e.source.liveEndTips?i("ui-tag",{staticClass:"tag",attrs:{title:e.source.banner[0].title,type:e.source.banner[0].type}}):e._e(),e.source.liveEndTips?i("div",{staticClass:"live-end-tips"},[i("i",{staticStyle:{"-webkit-mask-image":"url('https://res.wx.qq.com/a/fed_upload/4e09c767-7238-4dab-bb48-8da245eeb470/live_icon.svg')"}}),i("span",[e._v(e._s(e.source.liveEndTips))])]):e._e(),e.source.liveWatchNum?i("p",{staticClass:"live-watch-num"},[e._v(e._s(e.source.liveWatchNum))]):e._e(),e.source.cardType&&e.source.cardType===e.cardType.VIDEO?i("svg-icon",{staticClass:"video-play-icon",attrs:{name:"video_play_circle"}}):e._e(),e.source.likeNum?i("div",{staticClass:"video-like-num"},[i("svg-icon",{staticClass:"like-icon",attrs:{name:"like"}}),e._v("\n        "+e._s(e.source.likeNum)+"\n      ")],1):e._e()],1):e._e()],1):e._e(),!e.source.thumbUrl||e.hasVedio||e.source.cardType?e._e():i("div",{directives:[{name:"image",rawName:"v-image",value:e.source.thumbUrl,expression:"source.thumbUrl"}],staticClass:"news-thumbUrl news-media"}),e.hasVedio?i("div",{staticClass:"news-video news-media",attrs:{"aria-hidden":"true"}},[i("ui-video",{staticClass:"video-common",attrs:{image:e.source.videoInfo.thumbUrl,time:e.source.videoInfo.duration,"no-active":""}})],1):e._e(),i("div",{staticClass:"grey-wrap",attrs:{role:"option",title:e.M_os("链接")}},[e.source.subTitle?i("p",{staticClass:"news-sub-title ellipsis_2",domProps:{innerHTML:e._s(e.xss(e.source.subTitle))}}):e._e(),i("ui-source",{directives:[{name:"active",rawName:"v-active.stop",value:e.cardType12,expression:"cardType12",modifiers:{stop:!0}}],staticClass:"news-hot-source",class:{"video-number-live":e.cardType12},attrs:{title:e.source.source.title,tags:e.source.tags,"icon-url":e.source.cardType&&e.source.source.iconUrl},nativeOn:{click:function(t){return t.stopPropagation(),e.onTapSource.apply(null,arguments)}},scopedSlots:e._u([{key:"after-text",fn:function(){return[e.cardType12?i("ui-tag",{attrs:{type:8}}):e._e(),i("span",{staticClass:"source-date-time"},[e._v(e._s(e.source.source.dateTime))]),e._l(e.source.recommendTag,(function(t){return i("ui-tag",e._b({key:t.title,attrs:{"no-bg":""}},"ui-tag",t,!1))}))]},proxy:!0}])})],1)])}),[],!1,null,"485eff30",null));t.default=d.exports},494:function(e,t,i){},548:function(e,t,i){"use strict";i(494)},549:function(e,t,i){"use strict";var a={name:"UiVideo",props:{image:String,time:[String,Number],like:Boolean,noActive:Boolean,top:Boolean,ratio:Number},data:function(){return{renderHeight:0}},mounted:function(){var e=this,t=function(){e.renderHeight=e.$refs._img.$el.clientWidth/(e.ratio||1)||100};t(),window.addEventListener("resize",t),this.$on("hook:beforeDestroy",(function(){window.removeEventListener("resize",t)}))},methods:{onTap:function(e){this.noActive||this.$emit("tap",e)}}},s=(i(548),i(4)),o=Object(s.a)(a,(function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{directives:[{name:"active",rawName:"v-active.stop",value:!e.noActive,expression:"!noActive",modifiers:{stop:!0}}],staticClass:"ui-video",on:{click:e.onTap}},[e.image?i("ui-image",{ref:"_img",staticClass:"ui-video-image",style:e.ratio?{height:e.renderHeight+"px"}:null,attrs:{url:e.image,mode:"color"}}):e._e(),i("div",{staticClass:"ui-video-mask"},[e.$slots.default?[e._t("default")]:[e.time?i("div",{staticClass:"ui-video-time",attrs:{role:"option"}},[e.like?i("svg-icon",{attrs:{"class-name":"icon-like",name:"like_outlined_medium",role:"option","aria-label":",点赞"}}):e._e(),i("div",{class:{"ui-time-with-top":e.top}},[e._v(e._s(e.time))]),e.top?i("ui-icon",{attrs:{name:"top",role:"option","aria-label":",置顶"}}):e._e()],1):e._e()]],2),i("ui-icon",{staticClass:"ui-video-icon-button",attrs:{name:"play-o",role:"button","aria-label":".播放"}})],1)}),[],!1,null,"5651b63c",null).exports;o.install=function(e){e.component(o.name,o)};t.a=o}}]);