(window.webpackJsonp=window.webpackJsonp||[]).push([[285],{1579:function(t,e,i){},2396:function(t,e,i){"use strict";i(1579)},492:function(t,e,i){"use strict";i.r(e);var s=i(0),a={name:"CelebrityWall",mixins:[s.m,s.k,s.i],data:function(){return{}},methods:{onTapItem:function(t){this.M_serviceSearchGo(t),this.M_clickReport({clickContent:t.title},t)}}},l=(i(2396),i(4)),n=Object(l.a)(a,(function(){var t=this,e=t.$createElement,i=t._self._c||e;return t.itemInfo.list&&t.itemInfo.list.length?i("ui-column",{staticClass:"celebrity-wall",attrs:{fill:"",list:t.itemInfo.list,col:2,gap:12},scopedSlots:t._u([{key:"default",fn:function(e){var s=e.item,a=e.index;return[i("div",{directives:[{name:"active",rawName:"v-active.stop",modifiers:{stop:!0}}],key:a,staticClass:"celebrity active__mask",attrs:{"data-report-id":t.M_itemReportId(s,a+1)},on:{click:function(e){return e.stopPropagation(),t.onTapItem(s)}}},[s.thumbUrl?i("ui-image",{staticClass:"celebrity-thumb",attrs:{url:s.thumbUrl,size:40,mode:"avatar"}}):t._e(),i("div",{staticClass:"celebrity-profile"},[i("p",{staticClass:"title"},[t._v(t._s(s.title))]),i("p",{staticClass:"desc"},[t._v(t._s(s.desc))])])],1)]}}],null,!1,1837189964)}):t._e()}),[],!1,null,"0fa53f44",null);e.default=n.exports}}]);