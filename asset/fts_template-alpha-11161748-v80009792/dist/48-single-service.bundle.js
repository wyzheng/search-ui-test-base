(window.webpackJsonp=window.webpackJsonp||[]).push([[3],{1277:function(e,t,i){},1521:function(e,t,i){},2e3:function(e,t,i){"use strict";i(1277)},2259:function(e,t,i){"use strict";i(1521)},496:function(e,t,i){},561:function(e,t,i){"use strict";i(496)},565:function(e,t,i){"use strict";var s={name:"UiMenu",props:{source:{type:Array,default:function(){return[]}},nowrap:{type:Boolean,default:!1},compact:{type:Boolean,default:!1}},methods:{tap:function(e,t){this.$emit("tap:menu",{menu:e,index:t,target:this.$el})},menuItemClassName:function(e){var t=this.source.length%3||3;return{"ui-menu-item":!0,"ui-menu-item-end":!this.nowrap&&this.source.length-e-1<t}}}},n=(i(561),i(4)),o=Object(n.a)(s,(function(){var e=this,t=e.$createElement,i=e._self._c||t;return e.source&&e.source.length?i("div",{staticClass:"ui-menu",class:{"ui-menu-nowrap":e.nowrap,"ui-menu-compact":e.compact}},e._l(e.source,(function(t,s){return i("a",{directives:[{name:"active",rawName:"v-active.stop",modifiers:{stop:!0}}],key:"menu-item-"+s,class:e.menuItemClassName(s),attrs:{role:"button",tabindex:"-1","data-report-id":t.itemReportId},on:{touchstart:function(e){e.stopPropagation()},click:function(i){return i.stopPropagation(),e.tap(t,s)}}},[e.$scopedSlots.default?[e._t("default",null,{item:t,index:s})]:[t.iconUrl?i("ui-image",{staticClass:"ui-menu-icon",attrs:{url:t.iconUrl,mode:"plain"}}):e._e(),t.title?i("h4",{directives:[{name:"xss-html",rawName:"v-xss-html",value:t.title,expression:"item.title"}],staticClass:"ui-menu-item-title"}):e._e(),t.desc?i("p",{directives:[{name:"xss-html",rawName:"v-xss-html",value:t.desc,expression:"item.desc"}],staticClass:"ui-menu-item-desc",attrs:{"aria-hidden":"true"}}):e._e()]],2)})),0):e._e()}),[],!1,null,"3cdbbeb0",null).exports;o.install=function(e){e.component(o.name,o)};t.a=o},606:function(e,t,i){},668:function(e,t,i){"use strict";i(606)},746:function(e,t,i){"use strict";i.r(t);var s=i(24),n=i.n(s),o=i(1),a=i.n(o),c=i(50),r=i(0),l=(i(8),i(204)),p={components:{UiScroll:i(809).a},mixins:[r.m,r.k],props:{list:{type:Array,default:function(){return[]}}},data:function(){return{}},methods:{onTapTab:function(e,t){this.$emit("tap",{list:this.list,tab:e,tabIndex:t,itemPos:this.M_getItemPos(e)})}}},u=(i(2e3),i(4)),d=Object(u.a)(p,(function(){var e=this,t=e.$createElement,i=e._self._c||t;return e.list&&e.list.length?i("ui-scroll",{directives:[{name:"arrow-scroll",rawName:"v-arrow-scroll"}],staticClass:"tabs-wrapper",attrs:{padding:16,items:e.list,wait:50,role:"listbox"},scopedSlots:e._u([{key:"default",fn:function(t){var s=t.item,n=t.index;return[i("ui-button",{directives:[{name:"active",rawName:"v-active.stop",modifiers:{stop:!0}}],key:s.value,staticClass:"tab",class:{selected:s.selected},attrs:{mini:"","data-report-id":e.M_itemReportId(s,n+1)},nativeOn:{click:function(t){return t.stopPropagation(),e.onTapTab(s,n)}}},[e._v("\n      "+e._s(s.name)+"\n    ")])]}}],null,!1,3589517230)}):e._e()}),[],!1,null,"1e8cea9a",null).exports,m={e150:"🚏",e030:"🌸",e151:"🚻",e152:"👮",e031:"🔱",e032:"🌹",e153:"🏣",e033:"🎄",e154:"🏧",e155:"🏥",e034:"💍",e156:"🏪",e035:"💎",e036:"🏠",e157:"🏫",e158:"🏨",e037:"⛪",e038:"🏢",e159:"🚌",e039:"🚉",e15a:"🚕",e03a:"⛽",e03b:"🗻",e03c:"🎤",e03d:"🎥",e03e:"🎵",e03f:"🔑",e01f:"🚅",e140:"🚽",e141:"🔊",e020:"❓",e142:"📢",e021:"❗",e143:"🎌",e022:"❤️",e023:"💔",e144:"🔒",e145:"🔓",e024:"🕐",e146:"🌆",e025:"🕑",e147:"🍳",e026:"🕒",e148:"📖",e027:"🕓",e149:"💱",e028:"🕔",e029:"🕕",e14a:"💹",e14b:"📡",e02a:"🕖",e14c:"💪",e02b:"🕗",e14d:"🏦",e02c:"🕘",e02d:"🕙",e14e:"🚥",e14f:"🅿️",e02e:"🕚",e02f:"🕛",e050:"🐯",e051:"🐻",e052:"🐶",e053:"🐭",e054:"🐳",e055:"🐧",e056:"😊",e057:"😃",e058:"😞",e059:"😠",e05a:"💩",e040:"🎷",e041:"🎸",e042:"🎺",e043:"🍴",e044:"🍸",e045:"☕",e046:"🍰",e047:"🍺",e048:"⛄",e049:"☁️",e04a:"☀️",e04b:"☔",e04c:"🌙",e04d:"🌄",e04e:"👼",e04f:"🐱",e50b:"🇯🇵",e50c:"🇺🇸",e50d:"🇫🇷",e50e:"🇩🇪",e50f:"🇮🇹",e510:"🇬🇧",e511:"🇪🇸",e512:"🇷🇺",e513:"🇨🇳",e514:"🇰🇷",e515:"👱",e516:"👲",e517:"👳",e518:"👴",e519:"👵",e501:"🏩",e502:"🎨",e503:"🎩",e504:"🏬",e505:"🏯",e506:"🏰",e507:"🎦",e508:"🏭",e509:"🗼",e52b:"🐮",e40a:"😌",e52c:"🐰",e40b:"😨",e52d:"🐍",e40c:"😷",e52e:"🐔",e40d:"😳",e52f:"🐗",e40e:"😒",e40f:"😰",e530:"🐫",e531:"🐸",e410:"😲",e532:"🅰️",e411:"😭",e533:"🅱️",e412:"😂",e534:"🆎",e413:"😢",e535:"🅾️",e414:"☺️",e536:"👣",e415:"😄",e416:"😡",e537:"™️",e417:"😚",e418:"😘",e419:"👀",e41a:"👃",e51a:"👶",e51b:"👷",e51c:"👸",e51d:"🗽",e51e:"💂",e51f:"💃",e520:"🐬",e521:"🐦",e522:"🐠",e401:"😥",e523:"🐤",e402:"😏",e524:"🐹",e403:"😔",e525:"🐛",e404:"😁",e526:"🐘",e405:"😉",e527:"🐨",e406:"😣",e528:"🐒",e407:"😖",e529:"🐑",e408:"😪",e409:"😝",e52a:"🐺",e30b:"🍶",e42c:"🎱",e30c:"🍻",e42d:"🏊",e42e:"🚙",e30d:"㊗️",e42f:"🚚",e30e:"🚬",e30f:"💊",e430:"🚒",e310:"🎈",e431:"🚑",e311:"💣",e432:"🚓",e312:"🎉",e433:"🎢",e434:"🚇",e313:"✂️",e314:"🎀",e435:"🚄",e436:"🎍",e315:"㊙️",e437:"💝",e316:"💽",e438:"🎎",e317:"📣",e439:"🎓",e318:"👒",e319:"👗",e43a:"🎒",e43b:"🎏",e31a:"👡",e43c:"🌂",e31b:"👢",e41b:"👂",e41c:"👄",e41d:"🙏",e41e:"👋",e41f:"👏",e420:"👌",e421:"👎",e422:"👐",e301:"📝",e302:"👔",e423:"🙅",e303:"🌺",e424:"🙆",e304:"🌷",e425:"💑",e305:"🌻",e426:"🙇",e306:"💐",e427:"🙌",e307:"🌴",e428:"👫",e308:"🌵",e429:"👯",e309:"🚾",e42a:"🏀",e30a:"🎧",e42b:"🏈",e32d:"💜",e20c:"♥️",e20d:"♦️",e32e:"✨",e20e:"♠️",e32f:"⭐",e20f:"♣️",e330:"💨",e210:"#️⃣",e331:"💦",e211:"➿",e332:"⭕",e212:"🆕",e333:"❌",e213:"🆙",e334:"💢",e214:"🆒",e335:"🌟",e215:"🈶",e336:"❔",e216:"🈚",e337:"❕",e217:"🈷️",e338:"🍵",e218:"🈸",e339:"🍞",e219:"🔴",e33a:"🍦",e33b:"🍟",e21a:"🔲",e33c:"🍡",e21b:"🔳",e21c:"1️⃣",e33d:"🍘",e31c:"💄",e43d:"💒",e43e:"🌊",e31d:"💅",e43f:"🍧",e31e:"💆",e31f:"💇",e440:"🎇",e441:"🐚",e320:"💈",e442:"🎐",e321:"👘",e443:"🌀",e322:"👙",e201:"🚶",e444:"🌾",e323:"👜",e202:"🚢",e203:"🈁",e445:"🎃",e324:"🎬",e446:"🎑",e204:"💟",e325:"🔔",e447:"🍃",e326:"🎶",e205:"✴️",e448:"🎅",e327:"💓",e206:"✳️",e449:"🌅",e328:"💗",e207:"🔞",e329:"💘",e208:"🚭",e209:"🔰",e44a:"🌇",e44b:"🌃",e32a:"💙",e44c:"🌈",e32b:"💚",e20a:"♿",e32c:"💛",e20b:"📶",e22e:"👆",e10d:"🚀",e22f:"👇",e10e:"👑",e10f:"💡",e230:"👈",e110:"🍀",e231:"👉",e111:"💏",e232:"⬆️",e112:"🎁",e233:"⬇️",e113:"🔫",e234:"➡️",e114:"🔍",e235:"⬅️",e115:"🏃",e236:"↗️",e116:"🔨",e237:"↖️",e117:"🎆",e238:"↘️",e118:"🍁",e239:"↙️",e119:"🍂",e23a:"▶️",e11a:"👿",e23b:"◀️",e11b:"👻",e23c:"⏩",e11c:"💀",e23d:"⏪",e11d:"🔥",e23e:"🔯",e21d:"2️⃣",e33e:"🍚",e21e:"3️⃣",e33f:"🍝",e21f:"4️⃣",e340:"🍜",e220:"5️⃣",e341:"🍛",e221:"6️⃣",e342:"🍙",e222:"7️⃣",e343:"🍢",e101:"📫",e223:"8️⃣",e344:"🍣",e102:"📮",e224:"9️⃣",e345:"🍎",e103:"📩",e225:"0️⃣",e346:"🍊",e104:"📲",e226:"🉐",e347:"🍓",e105:"😜",e227:"🈹",e348:"🍉",e106:"😍",e228:"🈂️",e349:"🍅",e107:"😱",e229:"🆔",e108:"😓",e109:"🐵",e34a:"🍆",e22a:"🈵",e34b:"🎂",e22b:"🈳",e34c:"🍱",e10a:"🐙",e22c:"🈯",e34d:"🍲",e10b:"🐷",e22d:"🈺",e10c:"👽",e00e:"👍",e12f:"💰",e00f:"☝️",e250:"📳",e130:"🎯",e251:"📴",e131:"🏆",e252:"⚠️",e010:"✊",e132:"🏁",e253:"💁",e011:"✌️",e133:"🎰",e012:"✋",e013:"🎿",e134:"🐎",e135:"🚤",e014:"⛳",e015:"🎾",e136:"🚲",e137:"🚧",e016:"⚾",e017:"🏄",e138:"🚹",e139:"🚺",e018:"⚽",e019:"🐟",e13a:"🚼",e01a:"🐴",e13b:"💉",e13c:"💤",e01b:"🚗",e13d:"⚡",e01c:"⛵",e13e:"👠",e01d:"✈️",e01e:"🚃",e13f:"🛀",e11e:"💼",e23f:"♈",e11f:"💺",e240:"♉",e120:"🍔",e241:"♊",e242:"♋",e121:"⛲",e001:"👦",e243:"♌",e122:"⛺",e002:"👧",e244:"♍",e123:"♨️",e124:"🎡",e003:"💋",e245:"♎",e125:"🎫",e004:"👨",e246:"♏",e005:"👩",e126:"💿",e247:"♐",e006:"👕",e127:"📀",e248:"♑",e007:"👟",e128:"📻",e249:"♒",e008:"📷",e129:"📼",e009:"☎️",e24a:"♓",e12a:"📺",e24b:"⛎",e12b:"👾",e00a:"📱",e24c:"🔝",e24d:"🆗",e00b:"📠",e12c:"〽️",e24e:"©️",e12d:"🀄",e00c:"💻",e24f:"®️",e12e:"🆚",e00d:"👊"};var _={name:"ServiceComments",mixins:[r.m,r.k],props:{comment:{type:Object,default:function(){return{}}},dataCommentId:{type:String},tapAlone:{type:Boolean},addQuotes:Boolean},computed:{nickname:function(){return function(e){try{for(var t="",i=0;i<e.length;i++){var s=e.charCodeAt(i).toString(16).toLowerCase();t+=m[s]?m[s]:e[i]}return t}catch(t){return e}}(this.comment.nickname)}}},v=(i(668),Object(u.a)(_,(function(){var e=this,t=e.$createElement,i=e._self._c||t;return 1===e.comment.type&&e.comment.link?i("div",{directives:[{name:"active",rawName:"v-active.stop",value:e.tapAlone,expression:"tapAlone",modifiers:{stop:!0}}],staticClass:"comment-wrap empty-wrap active__item",attrs:{"data-comment-id":e.dataCommentId}},[i("span",{staticClass:"empty-link",domProps:{innerHTML:e._s(e.xss(e.comment.link.title))}}),i("span",{staticClass:"empty-tip",domProps:{innerHTML:e._s(e.xss(e.comment.link.desc))}})]):i("ui-clamp",{directives:[{name:"active",rawName:"v-active.stop",value:e.tapAlone,expression:"tapAlone",modifiers:{stop:!0}}],staticClass:"comment-wrap active__item",attrs:{autoresize:"",tag:"div","max-lines":2,"data-comment-id":e.dataCommentId},scopedSlots:e._u([e.comment.avatarUrl||e.nickname?{key:"before",fn:function(){return[i("div",{staticClass:"user"},[i("ui-image",{staticClass:"user-img",attrs:{size:16,url:e.comment.avatarUrl,type:"img",mode:"avatar"}}),i("span",{staticClass:"user-nickname",domProps:{innerHTML:e._s(e.xss(e.nickname+"："))}})],1)]},proxy:!0}:null,{key:"after",fn:function(){return[i("span",{staticClass:"quotes"},[e._v(e._s(e.addQuotes?"”":""))]),e.comment.link?[i("span",{staticClass:"user-link-opacity",attrs:{"aria-hidden":"true"}},[e._v(e._s(e.comment.link.text))]),i("span",{staticClass:"user-link-abs"},[e._v(e._s(e.comment.link.text))])]:e._e()]},proxy:!0}],null,!0)},[e.addQuotes?[e._v("“")]:e._e(),e._v(e._s(e.comment.desc))],2)}),[],!1,null,"7e3beccf",null).exports),f=i(10),h=i(48),b=i(2),g=(i(3),i(565));function k(e,t){var i=Object.keys(e);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(e);t&&(s=s.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),i.push.apply(i,s)}return i}function C(e){for(var t=1;t<arguments.length;t++){var i=null!=arguments[t]?arguments[t]:{};t%2?k(Object(i),!0).forEach((function(t){a()(e,t,i[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(i)):k(Object(i)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(i,t))}))}return e}var y=new f.a({COLLEGE_SCORE:1}),M={name:"SingleService",components:{Comment:v,LinkSelect:l.a,Tabs:d,UiMenu:g.a},mixins:[r.m,r.k],props:{source:{type:Object,default:function(){return{}}},data:{type:Object,default:function(){return{}}},item:{type:Object,default:function(){return{}}},pos:{type:Number,default:0},typePos:{type:Number,default:0}},data:function(){return{showTypeMap:y}},watch:{source:{handler:function(){this.destroyExpose(),this.createExpose()},immediate:!0}},destroyed:function(){this.destroyExpose()},methods:{chooseTab:function(e,t){var i=e.list,s=e.tab,n=e.tabIndex,o=e.itemPos;s.selected||(i.forEach((function(e){e.selected=!1})),s.selected=!0,this.M_clickReport({clickZone:"".concat(this.M_getClickZonePath(),".tabs[").concat(n,"]"),clickContent:s.name,actionType:b.g.CLICK_CHOOSE,itemPos:o},s),t&&this.$emit("location-refresh",{cgi:{name:t.name,params:C({data:JSON.stringify({standard_tags:[s.value]})},t.params),target:this,refreshType:"box"}}))},prefixCommentId:function(e,t){return e&&e.length?"".concat(e.join("|"),":").concat(t):t},reportCommentExpose:function(e){var t=e.cardPos,i=e.itemTitle;r.f.activitySlide.reportExpose({docID:this.item.docID,businessType:this.data.real_type,cardPos:+t,itemTitle:i})},reportCommentClick:function(e){var t=e.logKeyId,i=e.cardPos,s=e.itemTitle;r.f.activitySlide.reportClick({docID:this.item.docID,businessType:this.data.real_type,cardPos:+i,logKeyId:t,itemTitle:s})},destroyExpose:function(){this.exposeComment&&(this.exposeComment.resetExposeId(),this.exposeComment=null)},createExpose:function(){var e=this;this.$nextTick((function(){var t=e.source.options&&e.source.options.filter((function(e){return e.selectLinks})).length;e.exposeComment=new c.Expose((function(i){i.length&&i.forEach((function(i){var s=i.split("$"),o=n()(s,2),a=o[0],c=o[1];e.reportCommentExpose({itemTitle:a,cardPos:t?+c:+c+1})}))}),{container:e.$el,attr:"data-comment-id"}),setTimeout((function(){e.exposeComment&&e.exposeComment.analysis()}))}))},getOptionTags:function(e){return e.titleTag&&e.titleTag.append||e.titleTags},onTapCellItem:function(e,t){var i="".concat(this.M_getClickZonePath(),".cellList[").concat(t,"]");this.M_serviceSearchGo(e,i),this.M_clickReport({clickZone:i,clickContent:e.title||"",expand:this.M_getJumpSubScene(e)},e)},onLocationRefresh:function(){for(var e=arguments.length,t=new Array(e),i=0;i<e;i++)t[i]=arguments[i];this.$emit.apply(this,["location-refresh"].concat(t))},reportLinkSelect:function(e){var t=e.target,i=void 0===t?{}:t,s=e.clickZoneAfter,n=void 0===s?"":s,o=e.clickContent,a=void 0===o?i.title||"":o,c=e.expand,r=void 0===c?"":c,l=e.itemPos,p=void 0===l?"":l;this.M_clickReport({clickZone:this.M_getClickZonePath()+n,clickContent:a,expand:r||this.M_getJumpSubScene(this.source),itemPos:p},i)},opLinkInfo:function(e){this.M_go(e)},getRenderButton:function(e){return e.richButton||e.button||null},onlyTitle:function(e){return e.title&&!e.tag&&!e.price&&!e.desc&&!e.address&&!e.sub&&!e.distance},onTapOptionButton:function(e,t){var i,s="".concat(this.M_getClickZonePath(),".options[").concat(t,"]");["link","richButton","button"].some((function(t){if(e[t])return i=e[t],s+=".".concat(t),!0})),this.M_storeClickInfo(),this.M_clickReport({clickZone:s,clickContent:i.title||"",expand:this.M_getJumpSubScene(i)},i),e.link&&e.link.disabled||(this.M_serviceSearchGo(i,s),e.asyncAPI&&e.asyncAPI.name&&Object(h.b)(e.asyncAPI))},onTapOptionIconButton:function(e,t){var i="".concat(this.M_getClickZonePath(),".options[").concat(t,"]");this.M_serviceSearchGo(e,i),this.M_clickReport({clickZone:i,clickContent:e.title||"",expand:this.M_getJumpSubScene(e)},e),this.source.options[t].asyncAPI&&this.source.options[t].asyncAPI.name&&Object(h.b)(this.source.options[t].asyncAPI)},getJumpInfo:function(e){return e.jumpInfo||e.jumpType||e.pop||e.jumpInfos?e:e.richButton?e.richButton:e.button?e.button:e.subButton?e.subButton:null},onTapOption:function(e,t){var i="".concat(this.M_getClickZonePath(),".options[").concat(t,"]");this.M_storeClickInfo();var s=this.getJumpInfo(e);s&&(this.M_serviceSearchGo(C(C({},s),{},{targetCallback:function(){e.asyncAPI&&e.asyncAPI.name&&Object(h.b)(e.asyncAPI)}}),i),this.M_clickReport({clickZone:i,clickContent:s.title||s.sub||s.desc||"",expand:this.M_getJumpSubScene(s),cardExtInfo:{content:s.title||s.sub||s.desc||""}},s))},onSkuItem:function(e,t,i){var s="".concat(this.M_getClickZonePath(),".options[").concat(t,"].skuList[").concat(i,"]");this.M_storeClickInfo(),this.M_serviceSearchGo(e,s),this.M_clickReport({clickZone:s,clickContent:e.title||"",expand:this.M_getJumpSubScene(e)},e),this.source.options[t].asyncAPI&&this.source.options[t].asyncAPI.name&&Object(h.b)(this.source.options[t].asyncAPI)},onTapListOption:function(e){var t=e.menu,i=e.index,s=+e.target.dataset.optionIndex,n="".concat(this.M_getClickZonePath(),".options[").concat(s,"].linkList[").concat(i,"]");this.M_storeClickInfo(),this.M_serviceSearchGo(t,n),this.M_clickReport({clickZone:n,clickContent:t.title||"",expand:this.M_getJumpSubScene(t)},t),this.source.options[s].asyncAPI&&this.source.options[s].asyncAPI.name&&Object(h.b)(this.source.options[s].asyncAPI)},onSkuMore:function(e,t){var i="".concat(this.M_getClickZonePath(),".options[").concat(t,"].skuMore");this.M_storeClickInfo(),this.M_serviceSearchGo(e,i),this.M_clickReport({clickZone:i,clickContent:e.title||"",expand:this.M_getJumpSubScene(e)},e),this.source.options[t].asyncAPI&&this.source.options[t].asyncAPI.name&&Object(h.b)(this.source.options[t].asyncAPI)},onTapMore:function(){var e="".concat(this.M_getClickZonePath(),".action");this.M_storeClickInfo(),this.M_serviceSearchGo(this.source.action,e),this.M_clickReport({clickZone:e,clickContent:this.source.action.title||"",expand:this.M_getJumpSubScene(this.source.action)},this.source.action)},onTapHdInfo:function(e,t,i){var s="".concat(this.M_getClickZonePath(),".options[").concat(i,"].options[").concat(t,"]");this.M_storeClickInfo(),this.M_serviceSearchGo(e,s),this.M_clickReport({clickZone:s,clickContent:e.title,expand:this.M_getJumpSubScene(e)},e),e.asyncAPI&&e.asyncAPI.name&&Object(h.b)(e.asyncAPI)},onTapSubButton:function(e,t){var i="".concat(this.M_getClickZonePath(),".options[").concat(t,"].subButton");this.M_storeClickInfo(),this.M_serviceSearchGo(e,i),this.M_clickReport({clickZone:i,clickContent:e.title||"",expand:this.M_getJumpSubScene(e)},e),this.source.options[t].asyncAPI&&this.source.options[t].asyncAPI.name&&Object(h.b)(this.source.options[t].asyncAPI)},onTapComment:function(e,t){var i="".concat(this.M_getClickZonePath(),".options[").concat(t,"].comment");this.M_storeClickInfo(),this.M_serviceSearchGo(e,i);var s=this.M_clickReport({clickZone:i,clickContent:e.desc||e.link&&e.link.title||"",expand:this.M_getJumpSubScene(e)},e).clickId;this.reportCommentClick({logKeyId:s,cardPos:t,itemTitle:this.prefixCommentId(e.areaCodes,e.id)}),this.source.options[t].asyncAPI&&this.source.options[t].asyncAPI.name&&Object(h.b)(this.source.options[t].asyncAPI)},onTapTip:function(e,t){e&&(t.stopPropagation(),this.M_serviceSearchGo(e),this.M_clickReport({clickContent:e.title||"",expand:this.M_getJumpSubScene(e)},e))},onTapEmptyAction:function(e){e&&(this.M_serviceSearchGo(e),this.M_clickReport({clickContent:e.title||""},e))},getRenderMenuInfo:function(){var e=this,t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[];return t.forEach((function(t,i){t.itemReportId=e.M_itemReportId(t,i+1)})),t}}},x=(i(2259),Object(u.a)(M,(function(){var e,t=this,i=t.$createElement,s=t._self._c||i;return s("div",{staticClass:"single-service",class:(e={"single-service-compact":!!t.source.compact,"single-service-solid":!!t.source.solid},e["single-service-showtype-"+t.source.showType]=!!t.source.showType,e)},[t.source.desc?s("div",{staticClass:"card-desc"},[s("div",[t._v(t._s(t.source.desc))]),t.source.tag?s("div",{staticClass:"title-tags",attrs:{"aria-hidden":"true"}},[s("ui-tags",{attrs:{"align-vertical":"",tags:t.source.tag}})],1):t._e()]):t._e(),t.source.cellList?s("div",{staticClass:"cell-wrap"},t._l(t.source.cellList,(function(e,i){return s("div",{directives:[{name:"active",rawName:"v-active.stop",modifiers:{stop:!0}}],key:e.title+e.desc,staticClass:"cell-wrap__item active__item",attrs:{"data-report-id":t.M_itemReportId(e)},on:{click:function(s){return s.stopPropagation(),t.onTapCellItem(e,i)}}},[s("div",{staticClass:"cell-left"},[e.title?s("p",{staticClass:"cell-left__title",domProps:{innerHTML:t._s(t.xss(e.title))}}):t._e(),e.desc?s("p",{staticClass:"cell-left__desc",domProps:{innerHTML:t._s(t.xss(e.desc))}}):t._e()]),s("div",{staticClass:"cell-right"},[e.iconUrl?s("ui-image",{staticClass:"cell-right__icon",attrs:{size:20,url:e.iconUrl}}):t._e(),e.nickname?s("span",{staticClass:"cell-right__nickname",domProps:{innerHTML:t._s(t.xss(e.nickname))}}):t._e(),s("ui-arrow",{staticClass:"cell-right__arrow",attrs:{size:"big",align:"flex"}})],1)])})),0):t._e(),t.source.empty?s("div",{staticClass:"top-empty"},[s("span",{staticClass:"empty-title",domProps:{innerHTML:t._s(t.xss(t.source.empty.title))}}),t.source.empty.action?s("span",{directives:[{name:"active",rawName:"v-active.stop",modifiers:{stop:!0}}],staticClass:"empty-action active__mask",attrs:{"data-report-id":t.M_itemReportId(t.source.empty)},on:{click:function(e){return e.stopPropagation(),t.onTapEmptyAction(t.source.empty)}}},[t._v(t._s(t.source.empty.action.title))]):t._e()]):t._e(),t.source.tip?s("div",{staticClass:"service-list-tip",attrs:{"data-report-id":t.M_itemReportId(t.source.tip)},on:{click:function(e){return e.stopPropagation(),t.onTapTip(t.source.tip,e)}}},[t.source.tip.iconUrl?s("ui-image",{staticClass:"service-list-tip-icon",attrs:{"aria-hidden":"true",url:t.source.tip.iconUrl,size:20}}):t._e(),s("div",{staticClass:"service-list-tip-text",domProps:{innerHTML:t._s(t.xss(t.source.tip.title))}}),s("span",{staticClass:"ui-aria-hidden"},[t._v(".")])],1):t._e(),t._l(t.source.options,(function(e,i){return s("div",{directives:[{name:"active",rawName:"v-active.stop",modifiers:{stop:!0}}],key:e.title,ref:"serviceItem",refInFor:!0,staticClass:"service-item",class:{active__absolute:!e.subButton&&t.getJumpInfo(e),"service-item-with-sku":e.subMenu,"service-item-with-selectlinks":e.selectLinks||e.config,"service-item-with-config":e.config,"service-item-with-subbutton":e.subButton,"service-item-with-empty":e.emptyText||e.empty,"flex-wrap":e.comment,"service-item-vertical-center":t.source.tip},attrs:{"data-report-id":t.M_itemReportId(e,i+1)},on:{click:function(s){return s.stopPropagation(),t.onTapOption(e,i)}}},[e.selectLinks?s("div",{style:{width:e.selectLinks&&e.selectLinks.filter((function(e){return 1===e.type})).length?"100%":"auto"}},t._l(e.selectLinks,(function(e,n){return s("link-select",t._b({key:e.title,attrs:{source:e,"source-index":n,"click-zone-prop":".options["+i+"].selectLinks["+n+"]","parent-item-pos":i+1+":list"},on:{report:t.reportLinkSelect,"location-refresh":t.onLocationRefresh}},"link-select",t.$props,!1))})),1):t._e(),s("tabs",{attrs:{list:e.config&&e.config.options,"parent-item-pos":""+(t.M_getItemPos(e)||i+1+":list")},on:{tap:function(i){return t.chooseTab(i,e.config.cgi)}}}),s("div",{staticClass:"flex flex-center",staticStyle:{"flex-shrink":"0"},attrs:{"aria-hidden":"true"}},[e.rank?s("div",{staticClass:"option-rank"},[t._v(t._s(e.rank))]):t._e(),s("ui-image",{staticClass:"ui-image-thumb active__opacity",attrs:{type:"img",size:40,url:e.iconUrl}})],1),s("div",{staticClass:"option-text-wrapper"},[s("div",{attrs:{role:"button",tabindex:"-1"}},[s("div",{staticClass:"option-title-wrap"},[s("div",{staticClass:"option-title"},[e.rank?s("div",{staticClass:"ui-aria-hidden"},[t._v("第"+t._s(e.rank)+"名, ")]):t._e(),e.title?s("span",{staticClass:"option-title-text",domProps:{innerHTML:t._s(t.xss(e.title))}}):t._e(),s("span",{staticClass:"ui-aria-hidden"},[t._v(",")]),s("ui-tags",{staticClass:"single-service-title-tags",attrs:{"align-vertical":"",tags:t.getOptionTags(e)}}),s("span",{staticClass:"ui-aria-hidden"},[t._v(",")])],1),e.titleExpand?s("div",{staticClass:"option-title-expand",class:{"option-title-expand-tag":t.getOptionTags(e)}},[s("span",{domProps:{innerHTML:t._s(t.xss(e.titleExpand))}})]):t._e(),s("span",{staticClass:"ui-aria-hidden"},[t._v(",")])]),e.desc?s("div",{staticClass:"option-desc",domProps:{innerHTML:t._s(t.xss(e.desc))}}):t._e(),e.price||e.tag?s("div",{staticClass:"option-tags",class:{"option-price-as-title":!e.title&&!e.desc}},[e.price?s("span",{staticClass:"option-price"},[t._v(t._s(e.price))]):t._e(),e.tag?s("ui-tags",{attrs:{"align-vertical":"",tags:e.tag}}):t._e()],1):t._e(),e.address||e.distance?s("div",{staticClass:"option-address"},[e.distance?s("span",{staticClass:"option-distance",domProps:{innerHTML:t._s(t.xss(e.distance))}}):t._e(),s("span",{domProps:{innerHTML:t._s(t.xss(e.address))}}),s("span",{staticClass:"ui-aria-hidden"},[t._v(",")]),e.bottomTags&&e.bottomTags.length?s("ui-tags",{staticClass:"single-service-bottom-tags",attrs:{"align-vertical":"",tags:e.bottomTags}}):t._e()],1):t._e(),e.sub||e.time?s("div",{staticClass:"option-address",domProps:{innerHTML:t._s(t.xss(e.sub||e.time))}}):t._e(),e.heading?s("div",{staticClass:"option-heading",domProps:{innerHTML:t._s(t.xss(e.heading))}}):t._e(),e.textTags?s("div",{staticClass:"option-text-tags"},t._l(e.textTags,(function(e,i){return s("span",{key:i,domProps:{innerHTML:t._s(t.xss(e))}})})),0):t._e(),e.source?["string"==typeof e.source?s("div",{staticClass:"option-source ellipsis_1",domProps:{innerHTML:t._s(t.xss(e.source))}}):s("ui-source",{attrs:{"icon-url":e.source.iconUrl,title:e.source.title}})]:t._e()],2),e.linkList?s("div",{staticClass:"hos-link-list"},[s("ui-menu",{attrs:{source:t.getRenderMenuInfo(e.linkList),"data-option-index":i},on:{"tap:menu":t.onTapListOption},scopedSlots:t._u([{key:"default",fn:function(e){var i=e.item;return[s("div",{staticClass:"hos-link-item"},[s("ui-image",{staticClass:"hos-link-image",attrs:{size:20,url:i.iconUrl}}),s("div",{staticClass:"hos-link-title"},[t._v(t._s(i.title))])],1)]}}],null,!0)})],1):t._e(),e.descTable?s("div",{staticClass:"desc-table",attrs:{role:"option"}},t._l(e.descTable,(function(e,i){return s("div",{key:i,staticClass:"desc-table-row"},t._l(e.text,(function(e,i){return s("div",{key:i,staticClass:"desc-table-cell"},[t._v("\n            "+t._s(e)+"\n            "),s("span",{staticClass:"ui-aria-hidden"},[t._v(",")])])})),0)})),0):t._e(),e.subMenu?s("div",{staticClass:"sku"},[t._l(e.subMenu.linkList,(function(e,n){return s("div",{directives:[{name:"active",rawName:"v-active.stop",modifiers:{stop:!0}}],key:n,staticClass:"sku-list active__item",attrs:{role:"button",tabindex:"-1"},on:{click:function(s){return s.stopPropagation(),t.onSkuItem(e,i,n)}}},[s("div",{staticClass:"sku-list-title",domProps:{innerHTML:t._s(t.xss(e.title))}}),e.price?s("span",{staticClass:"option-price"},[t._v(t._s(e.price)),s("span",{staticClass:"ui-aria-hidden"},[t._v(",")])]):t._e()])})),e.subMenu.more?s("div",{directives:[{name:"active",rawName:"v-active.stop",modifiers:{stop:!0}}],staticClass:"sku-more active__item",attrs:{role:"button",tabindex:"-1"},on:{click:function(s){return s.stopPropagation(),t.onSkuMore(e.subMenu.more,i)}}},[t._v("\n          "+t._s(e.subMenu.more.title)+"\n        ")]):t._e()],2):t._e(),e.options?s("div",{staticClass:"hd-option-wrapper"},t._l(e.options,(function(n,o){return s("div",{directives:[{name:"active",rawName:"v-active.stop",modifiers:{stop:!0}}],key:n.title,staticClass:"hd-option active__link",attrs:{role:"button",tabindex:"-1"},on:{click:function(s){return s.stopPropagation(),t.onTapHdInfo(Object.assign({},n,{asyncAPI:e.asyncAPI}),o,i)}}},[s("ui-image",{attrs:{url:n.iconUrl,size:20}}),s("span",{staticClass:"hd-option-text"},[t._v(t._s(n.title))])],1)})),0):t._e(),e.subButton?s("a",{directives:[{name:"active",rawName:"v-active.stop",modifiers:{stop:!0}}],staticClass:"button weui-btn",class:{"light-btn weui-btn_default":1===e.subButton.type,"heavy-btn weui-btn_primary":2===e.subButton.type},attrs:{role:"button",tabindex:"-1","data-report-id":t.M_itemReportId(e.subButton,0,""+(t.M_getItemPos(e)||i+1+":list"))},on:{click:function(s){return s.stopPropagation(),t.onTapSubButton(e.subButton,i)}}},[t._v("\n        "+t._s(e.subButton.title)+"\n      ")]):t._e()]),e.link?s("div",{directives:[{name:"active",rawName:"v-active.stop",modifiers:{stop:!0}}],staticClass:"option-btn option-link",class:e.link.disabled?"option-btn-disabled":"active__link",on:{click:function(s){return s.stopPropagation(),t.onTapOptionButton(e,i)}}},[t._v("\n      "+t._s(e.link.title)+"\n    ")]):t.getRenderButton(e)?s("ui-button",{directives:[{name:"active",rawName:"v-active.stop",modifiers:{stop:!0}}],staticClass:"option-btn active__mask",class:{"option-btn-center":t.onlyTitle(e)},attrs:{type:void 0===t.getRenderButton(e).type?1:t.getRenderButton(e).type,"icon-size":20,"icon-url":t.getRenderButton(e).iconUrl,disabled:t.getRenderButton(e).disabled,"data-report-id":t.M_itemReportId(t.getRenderButton(e),0,""+(t.M_getItemPos(e)||i+1+":list"),!1)},nativeOn:{click:function(s){return s.stopPropagation(),t.onTapOptionButton(e,i)}}},[t._v(t._s(t.getRenderButton(e).title)+"\n    ")]):t._e(),e.iconButtons?s("div",{staticClass:"icon-svg-button"},t._l(e.iconButtons,(function(n,o){return s("div",{directives:[{name:"active",rawName:"v-active.stop",modifiers:{stop:!0}}],key:o,staticClass:"active__item",attrs:{"data-report-id":t.M_itemReportId(n,o+1,""+(t.M_getItemPos(e)||i+1+":list"))},on:{click:function(e){return e.stopPropagation(),t.onTapOptionIconButton(n,i)}}},[s("online-image",{attrs:{url:n.iconUrl}})],1)})),0):t._e(),e.comment?s("comment",{staticClass:"comment-wrap",attrs:{"data-comment-id":t.prefixCommentId(e.comment.areaCodes,e.comment.id)+"$"+i,comment:e.comment,"tap-alone":"","data-report-id":t.M_itemReportId(e.comment,0,i+1+":"+t.M_getItemType(e))},nativeOn:{click:function(s){return s.stopPropagation(),t.onTapComment(e.comment,i)}}}):t._e()],1)})),t.source.action?s("div",{directives:[{name:"active",rawName:"v-active.stop",modifiers:{stop:!0}}],staticClass:"action active__mask",class:{"light-action":1===t.source.action.type,"no-margin":t.source.tip,"active-mask":t.source.showType==t.showTypeMap.COLLEGE_SCORE},attrs:{role:"button",tabindex:"-1","data-report-id":t.M_itemReportId(t.source.action)},on:{click:function(e){return e.stopPropagation(),t.onTapMore.apply(null,arguments)}}},[s("span",[t._v(t._s(t.source.action.title))]),t.source.action.showArrow?s("ui-arrow",{attrs:{align:"flex",gap:4,direction:"right",size:"big"}}):t._e()],1):t._e(),t.source.emptyText?s("p",{staticClass:"source-empty",domProps:{innerHTML:t._s(t.xss(t.source.emptyText))}}):t._e()],2)}),[],!1,null,"3548bba2",null));t.default=x.exports}}]);