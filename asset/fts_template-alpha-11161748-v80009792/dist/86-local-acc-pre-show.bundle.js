(window.webpackJsonp=window.webpackJsonp||[]).push([[275,134],{1118:function(t,e,i){},1469:function(t,e,i){"use strict";i.r(e);var s=i(0),n=i(481),a=i(16),r=i(495),c=i(485),o=i(599),l={components:{tag:n.a,UiFrontTextEllipsis:o.a},mixins:[s.m,r.a,s.k],props:{data:{type:Object,default:function(){return{}}},item:{type:Object,default:function(){return{}}},pos:{type:Number,default:0},typePos:{type:Number,default:0},role:String,allServiceListInContext:{type:Array,default:function(){return[]}}},computed:{tags:function(){return this.item.recommendTag||this.item.tags||this.item.tag},allowTwoLine:function(){return s.b.fontRatio>1}},methods:{onTapProvider:function(t){if(Object(c.a)(this.item)){t.stopPropagation();var e="$.items[".concat(this.pos-1,"]");this.M_serviceSearchGo(this.item),this.M_clickReport({pos:this.pos,clickZone:e,title:this.item.nickName,expand:this.item.subScene,clickContent:[this.item.nickName,this.item.nickName,this.item.userName].join(";")}),this.M_handleInsert(!1,{serviceIdList:this.allServiceListInContext.map((function(t){return t.id})),serviceTitleList:this.allServiceListInContext.map((function(t){return t.title}))}),Object(a.g)(s.l.detail2.ssProvider)}},onTapService:function(t,e){var i="$.items[".concat(this.pos-1,"].serviceList[").concat(e,"]");this.$emit("tap-service",t,e),this.handleProviderJump(Object.assign({title:t.name,clickInfo:{serviceId:this.M_getJumpServiceId(t),serviceTitle:t.name||"",serviceIdList:this.allServiceListInContext.map((function(t){return t.id})),serviceTitleList:this.allServiceListInContext.map((function(t){return t.title}))}},this.item,t)),this.M_clickReport({clickZone:i,title:t.name,expand:t.subScene,clickContent:[t.name,this.item.nickName,this.item.userName].join(";")},t),this.M_handleInsert(!1,{serviceId:this.M_getJumpServiceId(t),serviceTitle:t.name||"",serviceIdList:this.allServiceListInContext.map((function(t){return t.id})),serviceTitleList:this.allServiceListInContext.map((function(t){return t.title}))}),Object(a.g)(s.l.detail2.ssService)},onTapRecommendTag:function(t,e){var i="$.items[".concat(this.pos-1,"].tag");e.stopPropagation(),this.M_serviceSearchGo(this.item),this.M_clickReport({pos:this.pos,clickZone:i,title:t.title,expand:this.item.subScene,clickContent:[t.title,this.item.nickName,this.item.userName,t.type].join(";")}),this.M_handleInsert(!1,{serviceIdList:this.allServiceListInContext.map((function(t){return t.id})),serviceTitleList:this.allServiceListInContext.map((function(t){return t.title}))}),Object(a.g)(s.l.detail2.ssTag)},onTapTag:function(t,e){var i=t[0],n="$.items[".concat(this.pos-1,"].serviceList[").concat(e,"].tag");this.M_clickReport({pos:this.pos,clickZone:n,title:i.title,expand:this.item.subScene,clickContent:[i.type,i.title].join(";")}),this.M_handleInsert(!1,{serviceIdList:this.allServiceListInContext.map((function(t){return t.id})),serviceTitleList:this.allServiceListInContext.map((function(t){return t.title}))}),Object(a.g)(s.l.detail2.ssTag)}}},u=(i(626),i(4)),p=Object(u.a)(l,(function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{directives:[{name:"active",rawName:"v-active",value:!!(t.item.jumpInfo||t.item.jumpUrl||t.item.userName),expression:"!!(item.jumpInfo || item.jumpUrl || item.userName)"}],staticClass:"sevice-search service-list expose_log_elem",attrs:{"data-id":t.M_exposeId()},on:{click:function(e){return t.onTapProvider(e)}}},[t.item.iconUrl?i("div",{directives:[{name:"image",rawName:"v-image:avatar",value:t.item.iconUrl,expression:"item.iconUrl",arg:"avatar"}],staticClass:"logo"}):t._e(),i("div",{staticClass:"content"},[t.item.nickNameHighlight||t.item.desc?i("div",{staticClass:"content-header",class:{bordered:t.item.bordered}},[i("h3",{staticClass:"ellipsis_1",attrs:{role:"button"},domProps:{innerHTML:t._s(t.xss(t.item.nickNameHighlight))}}),t.tags&&t.tags.length?i("tag",{staticClass:"sevice-search__recommend-tags",attrs:{tags:t.tags,"aria-hidden":"true"},on:{click:t.onTapRecommendTag}}):t._e(),t.item.desc?i("ui-front-text-ellipsis",{staticClass:"sevice-search__desc",attrs:{"aria-hidden":"true",list:t.item.desc.split("#ellipsis#")}}):t._e()],1):t._e(),t.item.serviceList&&t.item.serviceList.length?i("div",{staticClass:"heavy-links service-list"},t._l(t.item.serviceList,(function(e,s){return i("div",{directives:[{name:"active",rawName:"v-active.stop",modifiers:{stop:!0}}],key:s,staticClass:"heavy-link",attrs:{role:"button","data-report-id":t.M_itemReportId(e.reportId,s+1)},on:{click:function(i){return i.stopPropagation(),t.onTapService(e,s)}}},[i("div",{staticClass:"heavy-link__inner"},[i("div",{class:t.allowTwoLine?"ellipsis_2":"ellipsis_1"},[t._v("\n            "+t._s(e.name)+"\n          ")]),e.desc?i("div",{staticClass:"link-desc ellipsis_2",attrs:{"aria-hidden":"true"}},[t._v("\n            "+t._s(e.desc)+"\n          ")]):t._e(),e.tags&&e.tags.length?i("div",{staticClass:"service-list__tags",attrs:{"aria-hidden":"true"}},[i("tag",{attrs:{tags:e.tags,"no-bg":""},on:{click:function(e){return t.onTapTag(arguments,s)}}})],1):t._e()])])})),0):t._e()])])}),[],!1,null,"8614dd8c",null);e.default=p.exports},1752:function(t,e,i){"use strict";i(1118)},2136:function(t,e,i){"use strict";i.r(e);var s=i(1),n=i.n(s),a=i(80),r=i(0),c=i(43),o=i(5),l=i(742),u=i(1469),p=i(2),h=i(25);function d(t,e){var i=Object.keys(t);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(t);e&&(s=s.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),i.push.apply(i,s)}return i}function m(t){for(var e=1;e<arguments.length;e++){var i=null!=arguments[e]?arguments[e]:{};e%2?d(Object(i),!0).forEach((function(e){n()(t,e,i[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(i)):d(Object(i)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(i,e))}))}return t}var v={},f={components:{hd:a.default,ServiceList:u.default},mixins:[r.m,r.k],data:function(){return{isFirstLoad:!1,type:0,nickName:"",headUrl:"",userName:"",localAccTitle:"",randNum:parseInt(1e7*Math.random()),loadingCardNum:4,desc:"",serviceList:[],tags:[],isPreShow:!1,isResultShow:!1,isFetching:!1}},computed:m(m({},Object(h.c)({selfBase:function(t){return t.result.self.base}})),{},{isShow:function(){return!!this.nickName&&(this.isFirstLoad?this.isPreShow:this.isResultShow)},isFirstLoadPreShow:function(){return this.isFirstLoad&&this.isPreShow},title:function(){return this.localAccTitle||(5==this.type?"最近访问过的公众号":"最近使用过的小程序")},resultType:function(){return{5:2,19:1}[this.type]||0},loadingCardList:function(){return new Array(this.loadingCardNum).fill("")},accReportId:function(){return"".concat(this.userName,":").concat({5:"biz",19:"weapp"}[this.type]||"",":").concat(this.randNum)}}),created:function(){this.isFirstLoad=this.selfBase.isLoading,this.getAccInfo(),r.a.$on(r.j.handleResult,this.finish),r.a.$on(r.j.getResult,this.mockFetching)},methods:{getAccInfo:function(){try{var t=r.b.localAccExtParams.find((function(t){return"localAccInfo"===t.key}));if(t){var e=JSON.parse(t.textValue),i=e.type,s=e.nickName,n=e.headUrl,a=e.username,c=e.title,o=void 0===c?"":c,l=e.version,u=e.isPreShow,p=void 0!==u&&u;if(r.b.query===this.nickName&&0===r.b.type)return;r.b.query===s&&0===r.b.type?(this.type=i,this.nickName=s,this.headUrl=n,this.userName=a,this.localAccTitle=o,this.isPreShow=2!==l||p,this.isResultShow=2===l,this.makeReport25032({actionType:2e3,itemInfos:[this.accReportId]}),this.getAccExtInfo()):(this.type=0,this.nickName="",this.headUrl="",this.userName="",this.localAccTitle="",this.isPreShow=!1,this.isResultShow=!1)}}catch(t){}},makeReport25032:function(t){this.type,Object(c.a)(m(m({},r.b.getBase()),{},{actionType:t.actionType,requestId:this.$store.state.result.previousRid,businessType:20971520,resultSubType:10034,resultType:this.resultType,showType:o.c.LOCAL_ACC_PRE_SHOW_BOX,docInfos:["0:1"],itemInfos:t.itemInfos||[],itemPoses:[0],pageNumber:1,extInfo:t.extInfo||"{}"}))},tap:function(){try{this.makeReport25032({actionType:5==this.type?3001:3002,itemInfos:[this.accReportId],extInfo:JSON.stringify(Object.assign({clickBoxLoc:this.getClickBoxLoc(),clickLocation:"".concat(Math.floor(r.b.curClickPoi.clickX),"_").concat(Math.floor(r.b.curClickPoi.clickY),"_").concat(r.b.getScreenWidth(),"_").concat(r.b.getScreenHeight())}))}),this.M_go(5==this.type?{basicInfo:{UserName:this.userName,NickName:this.nickName},jumpType:p.h.jumpType.BIZ,userName:this.userName,opType:p.c.bizSession}:{jumpType:p.h.jumpType.WE_APP,userName:this.userName})}catch(t){}},finish:function(){this.isFirstLoad=!1,this.isFetching=!1,this.getAccInfo()},mockFetching:function(){this.isFetching=!0},getAccExtInfo:function(){var t=this;if(this.isResultShow&&this.userName){if(v[this.userName]){var e=v[this.userName],i=e.desc,s=void 0===i?"":i,n=e.serviceList,a=void 0===n?[]:n,r=e.titleTag,c=(void 0===r?{}:r).append,o=void 0===c?{}:c;return this.tags=o instanceof Array?o:[o],this.serviceList=a,this.desc=s,void this.makeReport25032({actionType:2001,itemInfos:a.map((function(t){return t&&t._reportId||""}))})}Object(l.a)({type:100,ext:JSON.stringify({username:this.userName})}).then((function(e){if(e&&e.data){var i=e.data,s=i.desc,n=void 0===s?"":s,a=i.serviceList,r=void 0===a?[]:a,c=i.titleTag,o=(void 0===c?{}:c).append,l=void 0===o?{}:o;r.forEach((function(t){t._reportId=t.reportId,delete t.reportId,t.ban12721Report=!0,t.ban25032Report=!0})),t.tags=l instanceof Array?l:[l],t.serviceList=r,t.desc=n,v[t.userName]=Object.assign({},e.data),t.makeReport25032({actionType:2001,itemInfos:r.map((function(t){return t&&t._reportId||""}))})}}))}},onTapService:function(t,e){var i=this.M_getJumpActionType(t);this.makeReport25032({actionType:i,itemInfos:[t._reportId],extInfo:JSON.stringify(Object.assign({clickBoxLoc:this.getClickBoxLoc(),clickLocation:"".concat(Math.floor(r.b.curClickPoi.clickX),"_").concat(Math.floor(r.b.curClickPoi.clickY),"_").concat(r.b.getScreenWidth(),"_").concat(r.b.getScreenHeight())}))})},getClickBoxLoc:function(){var t,e,i,s,n=this.$el,a=window.pageYOffset||document.documentElement.scrollTop,r=n.getBoundingClientRect();return t=Math.floor(r.x),e=Math.floor(r.y+a),i=Math.floor(r.width),s=Math.floor(r.height),"".concat(t,"_").concat(e,"_").concat(i,"_").concat(s)}}},g=(i(1752),i(4)),b=Object(g.a)(f,(function(){var t=this,e=t.$createElement,i=t._self._c||e;return t.isShow?i("div",{class:{"after-get-search-data":!t.isFirstLoad&&t.isResultShow}},[i("div",{staticClass:"local-acc-pre-show-card"},[i("hd",{attrs:{d:{title:t.title}}}),i("div",{directives:[{name:"active",rawName:"v-active.stop",modifiers:{stop:!0}}],staticClass:"local-account active__absolute",on:{click:t.tap}},[i("div",{staticClass:"account-header",attrs:{role:"link"}},[t.isResultShow?i("div",{directives:[{name:"image",rawName:"v-image:avatar",value:t.headUrl||"",expression:"headUrl || ''",arg:"avatar"}],staticClass:"account-header-icon"}):i("div",{directives:[{name:"image",rawName:"v-image:raw",value:t.headUrl||"",expression:"headUrl || ''",arg:"raw"}],staticClass:"account-header-icon"}),i("div",{staticClass:"header-text"},[i("div",{staticClass:"header-title-container",attrs:{"aria-hidden":"true"}},[i("span",{staticClass:"header-title"},[i("em",{staticClass:"highlight"},[t._v(t._s(t.nickName))])]),t.tags?i("ui-tags",{attrs:{"aria-hidden":"true",tags:t.tags,flex:""}}):t._e()],1),t.serviceList&&t.isResultShow?i("div",{staticClass:"local-acc-animation-wrap",class:{"start-local-acc-animation":t.serviceList.length}},[t.serviceList&&t.serviceList.length?i("service-list",{attrs:{item:{serviceList:t.serviceList,title:t.nickName,desc:t.desc,bordered:!0}},on:{"tap-service":t.onTapService}}):t._e()],1):t._e()])])])],1),t.isResultShow?i("div",{staticClass:"result-feed-title"},[t._v("更多相关结果")]):t._e(),t.isFirstLoadPreShow?i("div",{staticClass:"loading-feed-wrap"},[t.isResultShow?t._l(t.loadingCardList,(function(t,e){return i("div",{key:e,staticClass:"local-acc-pre-show-card"},[i("span",{staticClass:"circle-loading"})])})):t._e(),t._m(0)],2):t._e()]):t._e()}),[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"loading-wrap"},[e("span",{staticClass:"circle-loading"}),e("span",[this._v(" 搜索中 ")])])}],!1,null,"c25a85ce",null);e.default=b.exports},481:function(t,e,i){"use strict";var s={props:{tags:{type:Array,default:function(){return[]}},noBg:Boolean},methods:{onTapTag:function(t,e){this.$emit("click",t,e)}}},n=i(4),a=Object(n.a)(s,(function(){var t=this.$createElement;return(this._self._c||t)("ui-tags",{staticClass:"colorful-tags",attrs:{flex:"",tags:this.tags,"no-bg":this.noBg},on:{"tap:tag":this.onTapTag}})}),[],!1,null,null,null);e.a=a.exports},485:function(t,e,i){"use strict";function s(t){return!!t.jumpInfo||(!!t.jumpType||!(!t.userName&&!t.jumpUrl))}i.d(e,"a",(function(){return s}))},495:function(t,e,i){"use strict";var s=i(15),n=i(29),a=i(10),r=i(0),c=new a.a({normal:1,service:2,biz:3,weapp:4,link:5,section:6,menu:7,cards:8}),o=new a.a({service:1,biz:2,weapp:3,link:4,section:5,menu:6,cards:7}),l={data:function(){return{clickZone:c,boxType:o}},mixins:[r.m],methods:{handleProviderJump:function(t){var e={},i=this,s=t.action;if(s)if(1===s.providers.length){var n=s.providers[0];e=n,i.M_serviceSearchGo(n),i.clickReport(t)(n)}else e=s,i.$store.commit({type:"updateActionSheet",title:s.title,desc:s.desc,sub:s.sub,tags:s.tags||s.recommendTag,titleTag:s.titleTag,sheets:s.providers,clickCallback:i.clickReport(t),exposeCallback:i.exposeReport(t)});else e=t,i.M_serviceSearchGo(t);return e},getType:function(t){return t.userName&&t.weappUrl?2:t.jumpUrl?3:1},getClickType:function(t){return t.fromActionSheet?2:1},clickReport:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},e=this;return function(i){Object(s.e)(n.a.hospitalRegister,[e.getType(i),i.title,i.userName||i.jumpUrl,+new Date,r.b.searchId,i.pos||1,i.clickType||e.getClickType(i),2,r.b.sessionId,e.item.docID,r.b.query,t.title||""])}},exposeReport:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},e=this;return function(i){var a=i.reduce((function(t,i,s){return t.type.push(e.getType(i)),t.title.push(i.title),t.appid.push(i.userName||i.jumpUrl),t.pos.push(s+1),t}),{type:[],title:[],appid:[],pos:[]});Object(s.e)(n.a.hospitalRegister,[a.type.join("|"),a.title.join("|"),a.appid.join("|"),+new Date,r.b.searchId,a.pos.join("|"),2,1,r.b.sessionId,e.item.docID,r.b.query,t.title||""])}}}};e.a=l},553:function(t,e,i){},576:function(t,e,i){},586:function(t,e,i){"use strict";i(553)},599:function(t,e,i){"use strict";var s={name:"UiFrontTextEllipsis",props:{list:{type:Array,required:!0},index:{type:Number,default:0}}},n=(i(586),i(4)),a=Object(n.a)(s,(function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"ui-front-text-ellipsis"},t._l(t.list,(function(e,s){return i("span",{directives:[{name:"xss-html",rawName:"v-xss-html",value:e,expression:"word"}],key:e,class:{"ui-primary":t.index===s},attrs:{role:"option"}})})),0)}),[],!1,null,"42ac8289",null).exports;a.install=function(t){t.component(a.name,a)};e.a=a},626:function(t,e,i){"use strict";i(576)},742:function(t,e,i){"use strict";var s=i(1),n=i.n(s),a=i(0);function r(t,e){var i=Object.keys(t);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(t);e&&(s=s.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),i.push.apply(i,s)}return i}function c(t){for(var e=1;e<arguments.length;e++){var i=null!=arguments[e]?arguments[e]:{};e%2?r(Object(i),!0).forEach((function(e){n()(t,e,i[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(i)):r(Object(i)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(i,e))}))}return t}e.a=function(t){return a.h.getCommonCgiData({cgiName:"SearchGlobalEduCommApi",data:c({searchId:"",sessionId:a.b.sessionId,scene:a.b.scene,device:a.b.device,H5Version:a.b.version,clientVersion:a.b.wechatVersion,type:1,query:""},t)})}}}]);