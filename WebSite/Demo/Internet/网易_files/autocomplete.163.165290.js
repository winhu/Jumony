var SC={create:function(){return function(){this.initialize.apply(this,arguments)}}};function $S(){var _=[],$;for(var A=0;A<arguments.length;A++){$=arguments[A];if(typeof $=="string")$=document.getElementById($);_.push($)}return _.length<2?_[0]:_}function $SA(_){if(!_)return[];if(_.toArray)return _.toArray();else{var $=[];for(var A=0;A<_.length;A++)$.push(_[A]);return $}}Object.sextend=function(A,$){for(var _ in $)A[_]=$[_];return A};Function.prototype.sbind=function(){var $=this,_=$SA(arguments),A=_.shift();return function(){return $.apply(A,_.concat($SA(arguments)))}};Function.prototype.sbAEListener=function(_){var $=this;return function(A){return $.call(_,A||window.event)}};var SElement=new Object();SElement.Methods={visible:function($){return $S($).style.display!="none"},hide:function(){for(var _=0;_<arguments.length;_++){var $=$S(arguments[_]);$.style.display="none"}},show:function(){for(var _=0;_<arguments.length;_++){var $=$S(arguments[_]);$.style.display=""}},getHeight:function($){$=$S($);return $.offsetHeight},addClassName:function($,_){if(!($=$S($)))return;$.className=(""==$.className)?_:($.className+" "+_)},removeClassName:function($,_){if(!($=$S($)))return;var A=new RegExp("(^| )"+_+"( |$)");$.className=$.className.replace(A,"$1").replace(/ $/,"")}};Object.sextend(SElement,SElement.Methods);var SEvent=new Object();SEvent.Methods={element:function($){return $.target||$.srcElement},observers:false,_observeAndCache:function(_,A,B,$){if(!this.observers)this.observers=[];if(_.addEventListener){this.observers.push([_,A,B,$]);_.addEventListener(A,B,$)}else if(_.attachEvent){this.observers.push([_,A,B,$]);_.attachEvent("on"+A,B)}},unloadCache:function(){if(!SEvent.observers)return;for(var $=0;$<SEvent.observers.length;$++){SEvent.stopObserving.apply(this,SEvent.observers[$]);SEvent.observers[$][0]=null}SEvent.observers=false},observe:function(_,A,B,$){var _=$S(_);$=$||false;if(A=="keypress"&&(navigator.appVersion.match(/Konqueror|Safari|KHTML/)||_.attachEvent))A="keydown";this._observeAndCache(_,A,B,$)},stopObserving:function(_,A,B,$){var _=$S(_);$=$||false;if(A=="keypress"&&(navigator.appVersion.match(/Konqueror|Safari|KHTML/)||_.detachEvent))A="keydown";if(_.removeEventListener)_.removeEventListener(A,B,$);else if(_.detachEvent)_.detachEvent("on"+A,B)}};Object.sextend(SEvent,SEvent.Methods);if(navigator.appVersion.match(/\bMSIE\b/))SEvent.observe(window,"unload",SEvent.unloadCache,false);var SP={cumOffset:function(_){var $=0,A=0;do{$+=_.offsetTop||0;A+=_.offsetLeft||0;_=_.offsetParent}while(_);return[A,$]}},SK=SC.create();Object.sextend(SK,{BACKSPACE:8,TAB:9,RETURN:13,ESC:27,LEFT:37,UP:38,RIGHT:39,DOWN:40,PAGE_UP:33,PAGE_DOWN:34,END:35,HOME:36,INSERT:45,SHIFT:16,CTRL:17,ALT:18});var AutoComplete=SC.create();AutoComplete.prototype={initialize:function(E,_,C,$,A,B,D,F){SEvent.observe(document,"click",this.hide2.sbAEListener(this));SEvent.observe(document,"blur",this.hide2.sbAEListener(this));this.oN=this.defSugName;if(C)this.oN=C;this.IE=(navigator&&navigator.userAgent.toLowerCase().indexOf("msie")!=-1);this.browserInfo();if($)this.hI=true;else this.hI=false;if(A)this.hC=true;else this.hC=false;this.iconUrl=this.defSugIconUrl;if(B)this.iconUrl=B;this.box=$S(E);this.frameBox=$S(_);if(this.box){SEvent.observe(this.box,"keypress",this.onkeydown.sbAEListener(this));this.box.onblur=this.onblur.sbAEListener(this);SEvent.observe(this.box,"dblclick",this.dblClick.sbAEListener(this));if(!this.hI)this.setSugIcon(this.iconUrl)}this.count=0;this.sugServ=this.defSugServ;if(F)this.sugServ=F;this.sugMoreParams="";this.logServ=this.defSugServ;this.searchServ=this.defSearchServ;this.searchParamName=this.defSearchParamName;this.searchMoreParams="";this.kf=this.defKeyfrom+this.KEYFROM_POST;this.hcb=null;this.scb=null;this.sugFlag=true;this.clickEnabled=true;this.sptDiv=document.createElement("div");document.body.appendChild(this.sptDiv);this.sdiv=document.createElement("div");this.sdiv.style.position="absolute";this.sdiv.style.zIndex=10000;SElement.hide(this.sdiv);document.body.appendChild(this.sdiv);this.bdiv=document.createElement("div");this.vis=false;this.lq="";this.initVal="";if(this.box&&this.box.value!="")this.initVal=this.box.value;this.oldVal=this.initVal;this.oldValForCtrlZ=new Array(this.CZNUM);this.oldValForCtrlZNum=0;this.ctrlZFlag=false;this.upDownTag=false;this.blurCount=0;window.onresize=this.winResize.sbind(this);this.doReq("");this.clean();if(!D)this.timeoutId=setTimeout(this.sugReq.sbind(this),this.REQUEST_TIMEOUT)},setInputId:function($){this.box=$S($);if(this.box){SEvent.observe(this.box,"keypress",this.onkeydown.sbAEListener(this));this.box.onblur=this.onblur.sbAEListener(this);SEvent.observe(this.box,"dblclick",this.dblClick.sbAEListener(this));if(!this.hI)this.setSugIcon(this.iconUrl)}},start:function(){this.timeoutId=setTimeout(this.sugReq.sbind(this),this.REQUEST_TIMEOUT);if(this.box&&this.box.value!=""){this.initVal=this.box.value;this.oldVal=this.initVal}},setObjectName:function($){this.oN=$},setSelectCallBack:function($){this.scb=$.sbind(this)},setHoverCallBack:function($){this.hcb=$.sbind(this)},setSugServer:function($){this.sugServ=$;this.logServ=$;this.doReq("");this.clean()},setSugMoreParams:function($){this.sugMoreParams=$},setLogServer:function($){this.logServ=$},setSearchServer:function($){this.searchServ=$},setSearchParamName:function($){this.searchParamName=$},setSearchMoreParams:function($){this.searchMoreParams=$},setKeyFrom:function($){if($.indexOf(this.KEYFROM_POST)>0)this.kf=$;else this.kf=$+this.KEYFROM_POST},getSearchUrl:function($){return encodeURI(this.searchServ+this.searchParamName+"="+$+"&keyfrom="+this.kf+this.searchMoreParams)},getSugQueryUrl:function(_,A,$){return encodeURI(this.sugServ+this.S_QUERY_URL_POST+_+"&o="+this.oN+"&count="+$+"&keyfrom="+this.kf+this.sugMoreParams+this.time())},log:function(D,C,B,_,$){var A="";if(C)A+=C;if(B)A+=B;if(_)A+=_;if($)A+=$;var E=new Image();E.src=encodeURI(this.logServ+this.S_LOG_URL_POST+D+A+this.time());return true},setSugIcon:function(C){var B=this.oN+"_icon";if(document.getElementById(B))document.body.removeChild(document.getElementById(B));this.icon=document.createElement("img");this.icon.id=B;this.icon.src=C;this.icon.style.position="absolute";this.icon.style.zIndex="99";this.icon.style.width="13px";this.icon.style.height="10px";this.icon.style.cursor="pointer";var $=this.frameBox,A=SP.cumOffset($),_=0;this.icon.style.left=(A[0]+_+$.offsetWidth-13*1.5)+"px";this.icon.style.top=(A[1]+($.offsetHeight-10)/2)+"px";this.icon.style.display="";document.body.appendChild(this.icon);SEvent.observe(this.icon,"click",this.pressPoint.sbAEListener(this));SEvent.observe(this.icon,"mouseover",this.onmouseover2.sbAEListener(this));SEvent.observe(this.icon,"mouseout",this.onmouseout2.sbAEListener(this))},dblClick:function(){if(this.box.createTextRange){var $=this.box.createTextRange();$.moveStart("character",0);$.select()}else if(this.box.setSelectionRange)this.box.setSelectionRange(0,this.box.value.length);if(this.sugFlag){if(this.box.value!=""){if(this.lq==this.box.value){if(this.sdiv.childNodes.length>0)if(!this.vis)this.show();else this.hide();return}this.doReq()}}else if(this.box.value!="")this.insertSugHint()},winResize:function(){if(this.vis)this.show();if(!this.hI)this.setSugIcon(this.iconUrl)},storeOldValue:function(){if(this.oldValForCtrlZNum<this.CZNUM){this.oldValForCtrlZ[this.oldValForCtrlZNum]=this.oldVal;this.oldValForCtrlZNum++}else{for(var $=0;$<this.CZNUM-1;++$)this.oldValForCtrlZ[$]=this.oldValForCtrlZ[$+1];this.oldValForCtrlZ[this.CZNUM-1]=this.oldVal}},clearOldValue:function(){this.oldValForCtrlZNum=0},onkeydown:function(_){if(_.ctrlKey){var $=_.keyCode;if($==0)$=_.charCode;if($==90||$==122){if(this.oldValForCtrlZNum>0){this.box.value=this.oldValForCtrlZ[--this.oldValForCtrlZNum];if(this.box.value!="")this.ctrlZFlag=true;else this.oldVal="";this.upDownTag=false}if(this.IE)_.returnValue=false;else _.preventDefault();return false}return true}switch(_.keyCode){case SK.PAGE_UP:case SK.PAGE_DOWN:case SK.END:case SK.HOME:case SK.INSERT:case SK.CTRL:case SK.ALT:case SK.LEFT:case SK.RIGHT:case SK.SHIFT:case SK.TAB:return true;case SK.ESC:this.hide();return false;case SK.UP:if(this.vis&&this.sugFlag){this.upDownTag=true;this.up()}else{if(this.sdiv.childNodes.length>1)if(this.lq==this.box.value)if(this.sugFlag){this.show();return false}if(this.box.value!="")this.doReq()}if(this.IE)_.returnValue=false;else _.preventDefault();return false;case SK.DOWN:if(this.vis&&this.sugFlag){this.upDownTag=true;this.down()}else{if(this.sdiv.childNodes.length>1)if(this.lq==this.box.value)if(this.sugFlag){this.show();return false}if(this.box.value!="")this.doReq()}if(this.IE)_.returnValue=false;else _.preventDefault();return false;case SK.RETURN:if(this.vis&&this.curNodeIdx>-1)if(!this.select()){if(this.IE)_.returnValue=false;else _.preventDefault();return false}return true;case SK.BACKSPACE:if(this.box.value.length==1){this.storeOldValue();this.oldVal=""}default:this.upDownTag=false;return true}},sugReq:function(){if(this.box.value!=""&&this.box.value!=this.initVal){this.initVal="";if(this.lq!=this.box.value)if(!this.upDownTag)if(typeof(isYdDefault)!=undefined){if(!isYdDefault())this.doReq()}else this.doReq()}else if(this.lq!=""){this.lq="";if(this.vis){this.hide();this.clean()}}if(this.timeoutId!=0)clearTimeout(this.timeoutId);this.timeoutId=setTimeout(this.sugReq.sbind(this),this.REQUEST_TIMEOUT)},getSiteResult:function(B){var D=new RegExp("<[s][p][a][n].*>.*</[s][p][a][n]>");m=D.exec(B);if(m==null){D=new RegExp("<[aA].*>.*</[aA]>");m=D.exec(B)}if(m==null){var F=B.indexOf("HREF=\"");if(F!=-1){var E=B.indexOf("\"",F+6),_=B.substring(F+6,E);return _}return null}else{var $=new RegExp("[hH][rR][eE][fF]=.*><[fF][oO][nN][tT]"),C=$.exec(m);if(C[0].length<=13)return null;var A=C[0].split(" "),_;if(A.length>1)_=A[0].substr(6,A[0].length-7);else _=A[0].substr(6,A[0].length-13);return _}},getSelValue:function($){return $.replace(/this.txtBox.value=/,"").replace(/\'/g,"")},select:function($){if($){if(this.getCurNode()){var _=this.getCurNode().innerHTML,A=this.getSiteResult(_);if(A!=null){this.log(this.LOG_MOUSE_SELECT,"&q="+this.oldVal,"&index=0","&select="+A,"&direct=true");this.hide();window.open(A,"_blank")}else{try{var D=this.getCurNode().getAttribute(this.ITEM_SEL_ATTR_NAME),C=this.getSelValue(D);if(this.oldVal!=C)this.storeOldValue();this.log(this.LOG_MOUSE_SELECT,"&q="+this.oldVal,"&index="+this.curNodeIdx,"&select="+C);this.oldVal=C;this.hide();if(this.scb!=null)this.scb(C,this);else{this.clearOldValue();var B=this.getSearchUrl(C);window.open(B,"_blank")}}catch($){}}}}else if(this.getCurNode()){_=this.getCurNode().innerHTML,A=this.getSiteResult(_);if(A!=null){this.log(this.LOG_KEY_SELECT,"&q="+this.oldVal,"&index=0","&select="+A,"&direct=true");this.hide();window.open(A,"_blank")}else{try{D=this.getCurNode().getAttribute(this.ITEM_SEL_ATTR_NAME),C=this.getSelValue(D);if(this.oldVal!=C)this.storeOldValue();if(this.box.value!=C)return true;else this.log(this.LOG_KEY_SELECT,"&q="+this.oldVal,"&index="+this.curNodeIdx,"&select="+C);this.oldVal=C;this.hide();if(this.scb!=null)this.scb(this.box.value,this);else{this.clearOldValue();B=this.getSearchUrl(C);window.open(B,"_blank")}}catch($){}}}return false},doReq:function($){if(!this.sugFlag)return;if($=="undefined"||$==null){if(this.oldVal!=this.box.value&&!this.ctrlZFlag)this.storeOldValue();this.oldVal=this.box.value;this.ctrlZFlag=false;this.lq=this.box.value;var $=this.box.value}this.count++;var A=encodeURIComponent(document.URL),_=this.getSugQueryUrl($,A,this.count);this.excuteCall(_)},clean:function(){this.size=0;this.curNodeIdx=-1;this.sdiv.innerHTML="";this.bdiv.innerHTML=""},onComplete:function(){setTimeout(this.updateContent.sbind(this,arguments[0]),5)},cleanScript:function(){while(this.sptDiv.childNodes.length>0)this.sptDiv.removeChild(this.sptDiv.firstChild)},isValidNode:function($){return($.nodeType==1)&&($.getAttribute(this.ITEM_SEL_ATTR_NAME))},getReqStr:function($){if($&&$.getElementsByTagName("div").length>0)return $.getElementsByTagName("div")[0].getAttribute("id");return null},updateContent:function(){this.cleanScript();var C=this.box.value;if(this.bdiv.innerHTML=="")if(this.sdiv.innerHTML!=""&&this.getReqStr(this.sdiv)==C)return;else{this.hide();this.clean();return}if(this.getReqStr(this.bdiv)!=C)if(this.sdiv.innerHTML!=""&&this.getReqStr(this.sdiv)==C)return;else{this.hide();return}var A,_=false,B=(((this.bdiv.getElementsByTagName("table"))[1]).getElementsByTagName("tr"));for(var D=0;D<B.length;D++){A=B[D];if(this.isValidNode(A)){_=true;break}}if(_){this.sdiv.innerHTML=this.bdiv.innerHTML;var $=this.sdiv.getElementsByTagName("table");B=$[1].getElementsByTagName("tr");this.size=0;this.childs=new Array();for(D=0;D<B.length;D++){A=B[D];if(this.isValidNode(A)){A.setAttribute(this.ITEM_INDEX_ATTR_NAME,this.size);SEvent.observe(A,"mousemove",this.onmousemove.sbAEListener(this));SEvent.observe(A,"mouseover",this.onmouseover.sbAEListener(this));SEvent.observe(A,"mouseout",this.onmouseout.sbAEListener(this));SEvent.observe(A,"click",this.select.sbAEListener(this));this.childs.push(A);this.size++}}if(Number($.length)>=3)this.bindATagWithMouseEvent($[2],false);this.show();this.mouseTag=false}else{this.hide();this.clean()}},showContent:function(){var $=this.frameBox,A=SP.cumOffset($),B=0;this.sdiv.style.top=A[1]+($.offsetHeight+B)+"px";var _=0;if(this.bName=="IE");else _=1;this.sdiv.style.left=A[0]+_+"px";this.sdiv.style.cursor="default";this.sdiv.style.width=$.offsetWidth+"px";SElement.show(this.sdiv);this.vis=true;this.curNodeIdx=-1},show:function(){if(this.sdiv.childNodes.length<1)return;if(this.sugFlag)if(this.getReqStr(this.sdiv)!=this.box.value)return;this.showContent()},hide:function(){this.hlOff();SElement.hide(this.sdiv);this.curNodeIdx=-1;this.vis=false},hide2:function(){if(this.clickEnabled){this.hide();this.clickEnabled=false;setTimeout(this.enableClick.sbind(this),60)}},onblur:function(){this.hide();var $=true;if(this.IE)if(this.blurCount==0){$=false;this.blurCount++}if(typeof(ydInputBlur)!=undefined&&$)ydInputBlur(this.box)},enableClick:function(){this.clickEnabled=true},onmousemove:function($){this.mouseTag=true;this.onmouseover($)},onmouseover:function(_){this.box.onblur=null;if(!this.mouseTag){this.mouseTag=true;return}var A=SEvent.element(_);while(A.parentNode&&(!A.tagName||(A.getAttribute(this.ITEM_INDEX_ATTR_NAME)==null)))A=A.parentNode;var $=(A.tagName)?A.getAttribute(this.ITEM_INDEX_ATTR_NAME):-1;if($==-1||$==this.curNodeIdx)return;this.hlOff();this.curNodeIdx=Number($);this.hlOn(false)},onmouseout:function(){this.hlOff();this.curNodeIdx=-1;this.box.onblur=this.onblur.sbAEListener(this)},getNode:function($){if(this.childs&&($>=0&&$<this.childs.length))return this.childs[$];else return undefined},getCurNode:function(){return this.getNode(this.curNodeIdx)},hover:function($,_){if(this.hcb!=null)this.hcb($,_,this);else if(!$)this.box.value=_},hlOn:function(_){if(this.getCurNode()){var B=this.getCurNode().getElementsByTagName("td");this.procInstantResult();for(var C=0;C<B.length;++C)SElement.addClassName(B[C],this.ITEM_HIGHLIGHT_STYLE);try{var A=this.getCurNode().getAttribute(this.ITEM_SEL_ATTR_NAME);this.hover(!_,this.getSelValue(A))}catch($){}}},hlOff:function(){if(this.getCurNode()){var $=this.getCurNode().getElementsByTagName("td");for(var _=0;_<$.length;++_)SElement.removeClassName($[_],this.ITEM_HIGHLIGHT_STYLE);this.procInstantResultBack()}},procInstantResult:function(){var _=this.getCurNode().innerHTML;if(_.indexOf("red_font")==-1)return;var $=document.getElementById("red_font");if($)$.setAttribute("color","#ffffff");$=document.getElementById("gray_font");if($)$.setAttribute("color","#ffffff")},procInstantResultBack:function(){var _=this.getCurNode().innerHTML;if(_.indexOf("red_font")==-1)return;var $=document.getElementById("red_font");if($)$.setAttribute("color","red");$=document.getElementById("gray_font");if($)$.setAttribute("color","#008000")},up:function(){var $=this.curNodeIdx;if(this.curNodeIdx>0){this.hlOff();this.curNodeIdx=$-1;this.hlOn(true)}else if(this.curNodeIdx==0){this.hlOff();this.curNodeIdx=$-1;this.box.value=this.oldVal}else{this.curNodeIdx=this.size-1;this.hlOn(true)}},down:function(){var $=this.curNodeIdx;if(this.curNodeIdx<0){this.curNodeIdx=$+1;this.hlOn(true)}else if(this.curNodeIdx<(this.size-1)){this.hlOff();this.curNodeIdx=$+1;this.hlOn(true)}else{this.hlOff();this.curNodeIdx=-1;this.box.value=this.oldVal}},excuteCall:function(_){var $=document.createElement("script");$.src=_;this.sptDiv.appendChild($)},updateCall:function($){$=unescape($);$=$.replace(/&lt;/g,"<").replace(/&gt;/g,">").replace(/&quot;/g,"\"").replace(/&amp;/g,"&").replace(/&#39;/g,"'");this.bdiv.innerHTML=$;if(this.bdiv.childNodes.length<2)this.bdiv.innerHTML="";this.onComplete()},closeSuggest:function($){this.sugFlag=false},focusBox:function(){this.box.focus();if(this.box.createTextRange){var $=this.box.createTextRange();$.moveStart("character",this.box.value.length);$.select()}else if(this.box.setSelectionRange)this.box.setSelectionRange(this.box.value.length,this.box.value.length)},pressPoint:function($){if(this.clickEnabled){this.clickEnabled=false;setTimeout(this.enableClick.sbind(this),20);this.log(this.LOG_ICON_PRESS,"&q="+this.box.value,"&visible="+this.vis);this.focusBox();if(!this.vis){if(this.sugFlag){if(this.box.value=="")this.insertInputHint();else{if(typeof(ydInputFocus)!=undefined)if(ydInputFocus(this.box))return;if(this.lq!=this.box.value){this.doReq();setTimeout(this.showNoSug.sbind(this),200)}else if(this.sdiv.innerHTML==""){this.doReq();setTimeout(this.showNoSug.sbind(this),200)}else if(this.sdiv.childNodes.length<2)this.insertNoSugHint();else this.show()}}else this.insertSugHint()}else this.hide()}},showNoSug:function(){if(this.sdiv.childNodes.length<1)this.insertNoSugHint()},showSugHint:function(){if(this.sdiv.childNodes.length<1)return;this.showContent()},onCompleteHint:function(){setTimeout(this.showSugHint.sbind(this,arguments[0]),5)},onmouseover2:function($){this.box.onblur=null},onmouseout2:function(){this.box.onblur=this.onblur.sbAEListener(this)},bindATagWithMouseEvent:function(C,_){try{if(this.hC)if(C.parentNode){C.parentNode.removeChild(C);return}}catch(A){}var $=C.getElementsByTagName("A");if($.length==0)$=C.getElementsByTagName("a");var B=$[0];if(_)SEvent.observe(B,"click",this.turnOnSuggest.sbAEListener(this));else SEvent.observe(B,"click",this.turnOffSuggest.sbAEListener(this));SEvent.observe(B,"mouseover",this.onmouseover2.sbAEListener(this));SEvent.observe(B,"mouseout",this.onmouseout2.sbAEListener(this))},insertSugHint:function(){this.insertHint("\u63d0\u793a\u529f\u80fd\u5df2\u5173\u95ed","\u6253\u5f00\u63d0\u793a\u529f\u80fd",true)},insertInputHint:function(){this.insertHint("\u5728\u641c\u7d22\u6846\u4e2d\u8f93\u5165\u5173\u952e\u5b57\uff0c\u5373\u4f1a\u5728\u8fd9\u91cc\u51fa\u73b0\u63d0\u793a","\u5173\u95ed\u63d0\u793a\u529f\u80fd",false)},insertNoSugHint:function(){this.insertHint("\u6ca1\u6709\u53ef\u7528\u7684\u63d0\u793a","\u5173\u95ed\u63d0\u793a\u529f\u80fd",false)},insertHint:function(_,A,$){this.sdiv.innerHTML=this.hintCode1+_+this.hintCode2+A+this.hintCode3;var B=this.sdiv.getElementsByTagName("table")[2];this.bindATagWithMouseEvent(B,$);this.onCompleteHint()},turnOnSuggest:function(){var $=this.sugServ+this.S_PREF_URL_POST+"suggest=suggest"+"&o="+this.oN+this.time(),_=new Image();_.src=encodeURI($);this.sugFlag=true;this.lq="";this.initVal=this.box.value;this.oldVal=this.initVal;this.upDownTag=false;if(this.vis)this.hide();this.clean();return false},turnOffSuggest:function(){var $=this.sugServ+this.S_PREF_URL_POST+"&o="+this.oN+this.time(),_=new Image();_.src=encodeURI($);if(this.vis)this.hide();this.clean();this.sugFlag=false;return false},time:function(){return"&time="+new Date()},browserInfo:function(){this.bName="";this.bVer="";var _=navigator.userAgent,A=/MS(IE)\s([^.]+)/i,$=_.match(A);if($==null){A=/(Firefox)\/([^.]+)/i;$=_.match(A);if($==null)return}this.bName=$[1];this.bVer=$[2]},LOG_MOUSE_SELECT:"mouseSelect",LOG_KEY_SELECT:"keySelect",LOG_ICON_PRESS:"iconPress",hintCode1:"<div><table cellpadding=0 cellspacing=1 border=0 width=100% bgcolor=#979797 align=center><tr><td valign=top><table cellpadding=0 cellspacing=0 border=0 width=100% align=center><tr><td align=left bgcolor=white class=remindtt752>",hintCode2:"</td></tr></table><table cellpadding=0 cellspacing=0 border=0 width=100% align=center><tr><td height=1px bgcolor=#DDDDDD></td></tr><tr><td align=right height=17px bgcolor=#ECF0EF class=jstxhuitiaoyou><a class=jstxlan onclick=\"javascript:return false;\">",hintCode3:"</a></td></tr></table></td></tr></table></div>",REQUEST_TIMEOUT:7,ITEM_INDEX_ATTR_NAME:"s_index",ITEM_HIGHLIGHT_STYLE:"aa_highlight",ITEM_SEL_ATTR_NAME:"onSelect",CZNUM:10,KEYFROM_POST:".suggest",S_QUERY_URL_POST:"/suggest/suggest.s?query=",S_LOG_URL_POST:"/suggest/clog.s?type=",S_PREF_URL_POST:"/suggest/setpref.s?",defSugServ:"http://"+document.domain,defSearchServ:"http://"+document.domain+"/search?",defSearchParamName:"q",defKeyfrom:document.domain.replace(/.youdao.com/,""),defSugName:"aa",defSugIconUrl:"http://shared.youdao.com/images/downarrow.gif"};function turnOffSuggest(){return true}function closeSuggest($){if($==null||$=="undefined")$=AutoComplete.defSugName;if(typeof $!="object")return;$.closeSuggest();return true}