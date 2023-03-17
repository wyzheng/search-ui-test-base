(window.webpackJsonp=window.webpackJsonp||[]).push([[50],{1320:function(e,t,s){},1321:function(e,t,s){},1959:function(e,t,s){"use strict";s(1320)},1960:function(e,t,s){"use strict";s(1321)},2214:function(e,t,s){"use strict";s.r(t);var i={name:"Colorset",props:{value:{type:Array,default:function(){return[]}}},data:function(){return{length:this.value.length,ellipsis:!1,observer:null}},computed:{colors:function(){return this.value.slice(0,this.length)}},mounted:function(){this.observer=new ResizeObserver(this.checkEllipsis),this.observer.observe(this.$refs.wrap)},beforeDestroy:function(){this.observer.unobserve(this.$refs.wrap)},methods:{checkEllipsis:function(){var e=this.$refs.wrap,t=e.offsetWidth;if(e.scrollWidth>t){var s=e.querySelectorAll(".color"),i=t,r=0;do{var n=s[r],l=n.offsetWidth+parseFloat(getComputedStyle(n,null).getPropertyValue("margin-left"));if(!(i-l>=0))break;r++,i-=l}while(r<s.length&&i>0);r--,this.length=r,this.ellipsis=!0}else this.length=this.value.length,this.ellipsis=!1},getStyle:function(e){var t=e.split(",");return t.length>1?{backgroundImage:"linear-gradient(90deg, ".concat(t[0]," 50%, ").concat(t[1]," 50%)")}:{backgroundColor:e}}}},r=(s(1959),s(4)),n=Object(r.a)(i,(function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",[s("div",{staticClass:"wrap"},[e._l(e.colors,(function(t,i){return s("i",{key:t+"_"+i,staticClass:"color",style:e.getStyle(t)})})),s("i",{directives:[{name:"show",rawName:"v-show",value:e.ellipsis,expression:"ellipsis"}],ref:"ellipsis",staticClass:"color color-ellipsis"})],2),s("div",{ref:"wrap",staticClass:"wrap",staticStyle:{height:"0"},attrs:{"aria-hidden":"true"}},e._l(e.value,(function(e,t){return s("i",{key:e+"_"+t,staticClass:"color"})})),0)])}),[],!1,null,"62d4aa2a",null).exports,l=s(0),o=s(39),a={name:"Description",components:{CheckEllipsis:s(824).a,colorset:n},mixins:[l.m,o.a],props:{source:{type:Object,default:function(){return{}}},data:{type:Object,default:function(){return{}}},item:{type:Object,default:function(){return{}}},pos:{type:Number,default:0},typePos:{type:Number,default:0}},data:function(){return{ellipsisStatus:[],valueNewLine:[],keyWidth:[],visible:"hidden"}},computed:{canJump:function(){return!!this.source.jumpInfo},cols:function(){return this.source.column||2},rows:function(){return Math.ceil(this.source.list.length/this.cols)}},mounted:function(){var e=this;try{this.keyWidth=Array.from(this.$el.querySelectorAll(".describe__key")).map((function(e){return e.offsetWidth}));for(var t=0;t<this.cols;t++){for(var s=0,i=0;i<this.rows;i++)s=Math.max(s,this.keyWidth[i*this.rows+t]||0);for(var r=0;r<this.rows;r++)this.keyWidth[r*this.rows+t]=s}}catch(e){}this.$nextTick((function(){e.visible="unset"}))},methods:{chooseTab:function(e){this.current=e},onTap:function(e,t,s){this.canJump&&(e.stopPropagation(),this.M_clickReport({clickZone:"".concat(this.M_getClickZonePath(),".list[").concat(s,"]"),clickContent:t.key,docPos:s},Object.assign({},t,this.source)),this.M_go(this.source.jumpInfo))},onEllipsisChange:function(e,t){if(!(this.cols<2)){this.$set(this.ellipsisStatus,t,e);for(var s=0;s<this.rows;s++)for(var i=s*this.cols,r=i+this.cols,n=this.ellipsisStatus.slice(i,r).some((function(e){return e})),l=i;l<r;l++)this.$set(this.valueNewLine,l,n)}}}},c=(s(1960),Object(r.a)(a,(function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{directives:[{name:"active",rawName:"v-active.stop",value:e.canJump,expression:"canJump",modifiers:{stop:!0}}],staticClass:"describe active__absolute",style:{visibility:e.visible},attrs:{"data-report-id":e.M_itemReportId(e.source.reportId)}},[s("ui-column",{attrs:{col:e.cols,list:e.source.list},scopedSlots:e._u([{key:"default",fn:function(t){var i=t.item,r=t.index;return[s("dl",{staticClass:"describe__item",on:{click:function(t){return e.onTap(t,i,r)}}},[s("dt",{staticClass:"describe__key",style:e.keyWidth[r]?{minWidth:e.keyWidth[r]+"px"}:{}},[e._v(e._s(i.key))]),i.value&&i.value[0]?s("dd",{staticClass:"describe__value",class:{invisible:e.valueNewLine[r]},attrs:{"aria-hidden":e.valueNewLine[r]}},["color"===i.valueType?s("colorset",{attrs:{value:i.value}}):s("check-ellipsis",{on:{ellipsis:function(t){return e.onEllipsisChange(t,r)}}},[s("div",{domProps:{innerHTML:e._s(e.xss(i.value[0]))}})])],1):e._e()]),s("div",{staticClass:"describe__item newline",attrs:{"aria-hidden":!e.valueNewLine[r]},on:{click:function(t){return e.onTap(t,i,r)}}},["color"===i.valueType?s("colorset",{directives:[{name:"show",rawName:"v-show",value:e.valueNewLine[r],expression:"valueNewLine[index]"}],attrs:{value:i.value}}):s("div",{directives:[{name:"show",rawName:"v-show",value:e.valueNewLine[r],expression:"valueNewLine[index]"}],staticClass:"ellipsis_1",domProps:{innerHTML:e._s(e.xss(i.value[0]))}})],1)]}}])})],1)}),[],!1,null,"768ae99e",null));t.default=c.exports},685:function(e,t,s){},772:function(e,t,s){"use strict";s(685)},824:function(e,t,s){"use strict";var i={name:"CheckEllipsis",props:{direction:{type:String,default:"horizon"}},data:function(){return{observer:null,lastEllipsis:-1}},mounted:function(){this.observer=new ResizeObserver(this.checkEllipsis),this.observer.observe(this.$el)},beforeDestroy:function(){this.observer&&this.observer.unobserve(this.$el)},methods:{checkEllipsis:function(){var e=this.$refs.origin.children[0],t=this.$refs.measure.children[0],s=!1;(s="horizon"===this.direction?t.scrollWidth>t.offsetWidth:e.offsetHeight<t.offsetHeight)!==this.lastEllipsis&&(this.lastEllipsis=s,this.$emit("ellipsis",s))}}},r=(s(772),s(4)),n=Object(r.a)(i,(function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"wrap"},[t("div",{ref:"origin"},[this._t("default")],2),t("div",{ref:"measure",staticClass:"measure",class:this.direction,attrs:{"aria-hidden":"true"}},[this._t("default")],2)])}),[],!1,null,"7930fa90",null);t.a=n.exports}}]);