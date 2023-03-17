(window.webpackJsonp=window.webpackJsonp||[]).push([[170],{1503:function(t,i,e){},2097:function(t,i,e){"use strict";e.r(i);var s=e(1),n=e.n(s),a=e(39),r=e(601),o=e(0),l=e(16),c=e(51),u=e(65),p=e(808),h=e(600);function m(t,i){var e=Object.keys(t);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(t);i&&(s=s.filter((function(i){return Object.getOwnPropertyDescriptor(t,i).enumerable}))),e.push.apply(e,s)}return e}function d(t){for(var i=1;i<arguments.length;i++){var e=null!=arguments[i]?arguments[i]:{};i%2?m(Object(e),!0).forEach((function(i){n()(t,i,e[i])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(e)):m(Object(e)).forEach((function(i){Object.defineProperty(t,i,Object.getOwnPropertyDescriptor(e,i))}))}return t}var f={name:"UniversalHd",components:{OlympicToast:r.a,UiNotice:u.a,UiZoneHd:p.a,UiAvatarsRow:h.a},mixins:[a.a],props:{data:{type:Object,default:function(){return{}}},item:{type:Object,default:function(){return{}}},pos:{type:Number,default:0},typePos:{type:Number,default:0},isService:{type:Boolean,default:!1}},data:function(){return{bottomButton:!1}},computed:{isOlympic:function(){return!!this.item.isOlympic},isPedia:function(){return!!this.item.isPedia},isThumbUrl:function(){return!!this.item.thumbUrl},olympicButton:function(){var t=this.item.olympicButton||this.item.statusButton;if(!t)return null;if("string"!=typeof t)return t;try{return JSON.parse(t)}catch(t){return null}}},methods:{onTapOlympicButton:function(){var t=this;this.olympicButton.publishTextStateInfo&&(this.M_clickReport({clickZone:this.isService?"".concat(this.M_getClickZonePath(),".button"):3,clickContent:this.olympicButton.title,expand:this.M_getJumpSubScene(this.olympicButton)}),o.h.publishTextState(d(d({},this.olympicButton.publishTextStateInfo.params),{},{hideToast:1}),(function(i){/cancel/.test(i&&i.err_msg||"")||t.$refs["olympic-toast"].show()})))},onTapButton:function(){this.M_clickReport({clickZone:this.isService?"".concat(this.M_getClickZonePath(),".button"):1,clickContent:this.item.button.title,expand:this.M_getJumpSubScene(this.item.button)},this.item.button),this.M_go(this.item.button)},onTapLink:function(t){t.jumpInfo&&(this.M_clickReport({clickZone:this.isService?"".concat(this.M_getClickZonePath(),".link"):2,clickContent:t.title,expand:this.M_getJumpSubScene(t)},t),this.M_go(t))},onTapBar:function(){this.M_clickReport({clickZone:this.isService?"".concat(this.M_getClickZonePath(),".bar"):3,clickContent:this.item.bar.title,expand:this.M_getJumpSubScene(this.item.bar)},this.item.bar),this.M_go(this.item.bar)},onTapHd:function(){this.isPedia&&(this.M_clickReport({clickZone:5,ClickContent:52===this.data.type?this.data.items[0].subItems[0].title:this.item.title},this.item),this.M_go(this.item.jumpInfo||this.item),Object(l.f)(c.a.detail.result.pedia))}}},v=(e(2210),e(4)),b=Object(v.a)(f,(function(){var t=this,i=t.$createElement,e=t._self._c||i;return e("div",[e("ui-zone-hd",{staticClass:"universal-hd",class:{"thumb-not-person-style":!t.item.isPerson,"olympic-hd":t.isOlympic,"pedia-hd":t.isPedia,"pedia-hd-thumbUrl":!t.isThumbUrl&&t.isPedia},attrs:{type:t.item.style||1,title:t.item.title,"title-tag":t.item.titleTag,thumb:t.item.thumbUrl,"data-id":t.M_exposeId()},nativeOn:{click:function(i){return i.stopPropagation(),t.onTapHd.apply(null,arguments)}},scopedSlots:t._u([{key:"title-right",fn:function(){return[t.item.button?e("ui-button",{class:{"with-icon":t.item.button.iconUrl},attrs:{"icon-url":t.item.button.iconUrl,"icon-size":20,title:t.item.button.title},nativeOn:{click:function(i){return i.stopPropagation(),t.onTapButton.apply(null,arguments)}}}):t._e(),t.olympicButton?e("ui-button",{staticClass:"olympic-button active__mask",attrs:{"icon-url":t.olympicButton.iconUrl,title:t.olympicButton.title,"icon-size":20},nativeOn:{click:function(i){return i.stopPropagation(),t.onTapOlympicButton.apply(null,arguments)}}}):t._e()]},proxy:!0},{key:"after-title",fn:function(){return[t.item.desc||t.item.duration?e("p",{staticClass:"desc"},[t._v(t._s(t.item.desc)+" "+t._s(t.item.duration))]):t._e(),t.item.graylink?e("div",{staticClass:"desc"},[e("span",{directives:[{name:"active",rawName:"v-active.stop",modifiers:{stop:!0}}],staticClass:"grayLink",class:{active__mask:t.item.graylink.jumpInfo},on:{click:function(i){return i.stopPropagation(),t.onTapLink(t.item.graylink)}}},[e("span",[t._v(t._s(t.item.graylink.title)+" ")]),e("ui-arrow",{attrs:{gap:""}})],1)]):t._e(),t.item.link?e("p",{staticClass:"desc desc-link"},[e("a",{directives:[{name:"active",rawName:"v-active.stop",modifiers:{stop:!0}}],staticClass:"pedia-link",class:{active__mask:t.item.link.jumpInfo},on:{click:function(i){return i.stopPropagation(),t.onTapLink(t.item.link)}}},[t._v(t._s(t.item.link.title))])]):t._e(),t.item.extraInfo?e("p",{staticClass:"extra-info"},[t._v(t._s(t.item.extraInfo))]):t._e(),t.item.intro?e("p",{staticClass:"intro"},[t._v("\n        "+t._s(t.item.intro[0])),e("span",{staticClass:"intro-item"},[t._v(t._s(t.item.intro[1]))])]):t._e(),t.item.friendInfo?e("ui-avatars-row",{staticClass:"friend-info",attrs:{list:t.item.friendInfo.avatars,direction:"left"}},[e("span",[t._v(t._s(t.item.friendInfo.text))])]):t._e(),t.item.bar?e("p",{staticClass:"desc"},[e("ui-notice",{staticClass:"active__mask",attrs:{title:t.item.bar.title,desc:t.item.bar.desc,contrast:""},on:{tap:t.onTapBar}})],1):t._e()]},proxy:!0}])}),t.olympicButton?e("olympic-toast",{ref:"olympic-toast",attrs:{title:t.olympicButton.publishTextStateInfo&&t.olympicButton.publishTextStateInfo.successMsg,"icon-url":t.olympicButton.publishTextStateInfo&&t.olympicButton.publishTextStateInfo.successIconUrl}}):t._e()],1)}),[],!1,null,"edc3ceec",null);i.default=b.exports},2210:function(t,i,e){"use strict";e(1503)},555:function(t,i,e){},556:function(t,i,e){},588:function(t,i,e){"use strict";e(555)},589:function(t,i,e){"use strict";e(556)},600:function(t,i,e){"use strict";var s={name:"UiAvatarsRow",props:{list:{type:Array,default:function(){return[]}},direction:{type:String,default:"left"},wrap:{type:Boolean,default:!1}},data:function(){return{}}},n=(e(588),e(4)),a=Object(n.a)(s,(function(){var t=this.$createElement,i=this._self._c||t;return i("ul",{staticClass:"ui-avatars-row",class:{"ui-avatars-row_right":"right"===this.direction,"ui-avatars-row_wrap":this.wrap}},[this._l(this.list,(function(t,e){return i("li",{directives:[{name:"load-background",rawName:"v-load-background:avatar",value:t,expression:"avatar",arg:"avatar"}],key:e,staticClass:"ui-avatar"})})),i("li",{staticClass:"ui-extra"},[this._t("default")],2)],2)}),[],!1,null,"767492ae",null).exports;a.install=function(t){t.component(a.name,a)};i.a=a},601:function(t,i,e){"use strict";var s={name:"OlympicToast",props:{title:String,iconUrl:String},data:function(){return{isShow:!1,timeout:null}},methods:{show:function(){var t=this;this.isShow=!0,this.timeout&&clearTimeout(this.timeout),this.timeout=setTimeout((function(){t.isShow=!1}),1500)}}},n=(e(589),e(4)),a=Object(n.a)(s,(function(){var t=this.$createElement,i=this._self._c||t;return i("div",[i("img",{style:{display:"none"},attrs:{src:"https://res.wx.qq.com/t/fed_upload/9c331236-86ab-4138-b717-f3c90c45e9d3/z.png",alt:""}}),i("img",{style:{display:"none"},attrs:{src:this.iconUrl,alt:""}}),i("transition",{attrs:{name:"fade"}},[this.isShow?i("div",{staticClass:"olympic-toast"},[i("div",{staticClass:"olympic-toast-bg"}),i("div",{staticClass:"olympic-toast-inner"},[i("ui-image",{staticClass:"inner-icon",attrs:{url:this.iconUrl}}),i("div",{staticClass:"inner-title",attrs:{role:"alert"}},[this._v(this._s(this.title))])],1)]):this._e()])],1)}),[],!1,null,"7349846c",null);i.a=a.exports},697:function(t,i,e){},698:function(t,i,e){},784:function(t,i,e){"use strict";e(697)},808:function(t,i,e){"use strict";var s={name:"DefaultHd",props:["type","title","thumb","thumbTip","titleTag"],mounted:function(){this.$refs.title.clientHeight>40&&(this.$refs.title.style.fontSize="17px")}},n=(e(784),e(4)),a=Object(n.a)(s,(function(){var t=this,i=t.$createElement,e=t._self._c||i;return e("div",{staticClass:"ui-default-hd"},[e("div",{staticClass:"ui-hd-wrapper"},[t.thumb||t.thumbTip?e("div",{staticClass:"ui-hd-thumb-wrapper",attrs:{role:"option"}},[t.thumb?e("ui-image",{staticClass:"ui-hd-thumb",attrs:{url:t.thumb}}):t.thumbTip?e("div",{staticClass:"ui-hd-thumb-tip"},[t._v("\n        "+t._s(t.thumbTip)+"\n      ")]):t._e(),e("div",{directives:[{name:"xss-html",rawName:"v-xss-html",value:"图像."+t.title,expression:"'图像.' + title"}],staticClass:"ui-aria-hidden"})],1):t._e(),e("div",{staticClass:"ui-hd-text-wrapper"},[e("div",[e("div",{staticClass:"ui-float-right-wrapper"},[t._t("float-right")],2),e("div",{staticClass:"ui-title-wrapper"},[e("div",{ref:"title",staticClass:"ui-title"},[e("span",{directives:[{name:"xss-html",rawName:"v-xss-html",value:t.title,expression:"title"}]}),t.titleTag&&t.titleTag.append?e("ui-tags",{staticClass:"ui-title-tag-append",attrs:{tags:t.titleTag.append,"align-vertical":""}}):t._e()],1),t._t("title-right")],2),t._t("after-title")],2)]),t._t("right")],2),t._t("after-hd")],2)}),[],!1,null,"5d3058fe",null).exports,r={name:"StandoutThumbHd",props:["type","title","thumb","thumbTip","titleTag"],data:function(){return{alignTop:!1}},mounted:function(){var t;this.$refs.title.clientHeight>40&&(this.$refs.title.style.fontSize="17px"),this.thumb&&null!==(t=this.$refs.thumb)&&void 0!==t&&t.$el&&this.$refs.thumb.$el.clientHeight<this.$refs.text.clientHeight+16&&(this.alignTop=!0)}},o=(e(907),Object(n.a)(r,(function(){var t=this,i=t.$createElement,e=t._self._c||i;return e("div",{staticClass:"ui-standout-hd",class:{"ui-standout-hd--align-top":t.alignTop}},[e("div",{staticClass:"ui-hd-wrapper"},[e("div",{staticClass:"ui-hd-content"},[t.thumb||t.thumbTip?e("div",{staticClass:"ui-hd-thumb-wrapper",attrs:{role:"option"}},[t.thumb?e("ui-image",{ref:"thumb",staticClass:"ui-hd-thumb",attrs:{url:t.thumb}}):t.thumbTip?e("div",{staticClass:"ui-hd-thumb-tip"},[t._v("\n          "+t._s(t.thumbTip)+"\n        ")]):t._e(),e("div",{directives:[{name:"xss-html",rawName:"v-xss-html",value:"图像."+t.title,expression:"'图像.' + title"}],staticClass:"ui-aria-hidden"})],1):t._e(),e("div",{staticClass:"ui-hd-text-wrapper"},[e("div",{ref:"text",staticClass:"ui-hd-text"},[e("div",{staticClass:"ui-title-wrapper"},[e("div",{ref:"title",staticClass:"ui-title"},[e("span",{directives:[{name:"xss-html",rawName:"v-xss-html",value:t.title,expression:"title"}]}),t.titleTag&&t.titleTag.append?e("ui-tags",{staticClass:"ui-title-tag-append",attrs:{tags:t.titleTag.append,"align-vertical":""}}):t._e()],1),t._t("title-right")],2),t._t("after-title")],2)]),e("div"),t._t("right")],2)]),e("div",{staticClass:"after-hd-wrapper"},[t._t("after-hd")],2)])}),[],!1,null,"b7aff8dc",null).exports),l={1:"default-hd",2:"standout-thumb-hd",3:"default-hd"},c={name:"UiZoneHd",components:{StandoutThumbHd:o,DefaultHd:a},props:{type:{type:[Number,String],default:1},title:String,thumb:String,thumbTip:String,titleTag:Object},data:function(){return{types:l}}},u=Object(n.a)(c,(function(){var t=this,i=t.$createElement,e=t._self._c||i;return t.types[t.type.toString()]?e(t.types[t.type.toString()],t._b({tag:"component",scopedSlots:t._u([t.$slots["float-right"]?{key:"float-right",fn:function(){return[t._t("float-right")]},proxy:!0}:null,t.$slots["title-right"]?{key:"title-right",fn:function(){return[t._t("title-right")]},proxy:!0}:null,t.$slots["after-title"]?{key:"after-title",fn:function(){return[t._t("after-title")]},proxy:!0}:null,t.$slots.right?{key:"right",fn:function(){return[t._t("right")]},proxy:!0}:null,t.$slots["after-hd"]?{key:"after-hd",fn:function(){return[t._t("after-hd")]},proxy:!0}:null],null,!0)},"component",t.$props,!1)):t._e()}),[],!1,null,"38ed1724",null).exports;u.install=function(t){t.component(u.name,u)};i.a=u},907:function(t,i,e){"use strict";e(698)}}]);