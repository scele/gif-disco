// Copyright 2011 Google Inc.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
(function(e){"use strict";function s(e){return e[r]?!1:(e[r]=i++,!0)}function o(){this.map_={}}function u(e,t){return Object.prototype.hasOwnProperty.call(e,t)}function d(e){return e==f||e==c}function m(e,t,n,r){this.rootNode=e,this.elementFilter=t,this.calcReordered=n,this.calcOldPreviousSibling=r}function b(e){function i(){n&&(r&&(n.qualifiers.push(r),r=undefined),t.push(n)),n={qualifiers:[]}}function s(){r&&n.qualifiers.push(r),r={}}function L(e){return'"'+e.replace(/"/,'\\"')+'"'}var t=[],n,r,o=/\s/,u,a="Invalid or unsupported selector syntax.",f=1,l=2,c=3,h=4,p=5,d=6,v=7,m=8,b=9,w=10,E=11,S=12,x=13,T=14,N=f,C=0;while(C<e.length){var k=e[C++];switch(N){case f:if(k.match(g)){i(),n.tagName=k,N=l;break}if(k=="*"){i(),n.tagName="*",N=c;break}if(k=="."){i(),s(),n.tagName="*",r.class=!0,N=h;break}if(k=="#"){i(),s(),n.tagName="*",r.id=!0,N=h;break}if(k=="["){i(),s(),n.tagName="*",r.attrName="",N=d;break}if(k.match(o))break;throw Error(a);case l:if(k.match(y)){n.tagName+=k;break}if(k=="."){s(),r.class=!0,N=h;break}if(k=="#"){s(),r.id=!0,N=h;break}if(k=="["){s(),r.attrName="",N=d;break}if(k.match(o)){N=T;break}if(k==","){N=f;break}throw Error(a);case c:if(k=="."){s(),r.class=!0,N=h;break}if(k=="#"){s(),r.id=!0,N=h;break}if(k=="["){s(),r.attrName="",N=d;break}if(k.match(o)){N=T;break}if(k==","){N=f;break}throw Error(a);case h:if(k.match(g)){r.attrValue=k,N=p;break}throw Error(a);case p:if(k.match(y)){r.attrValue+=k;break}if(k=="."){s(),r.class=!0,N=h;break}if(k=="#"){s(),r.id=!0,N=h;break}if(k=="["){s(),N=d;break}if(k.match(o)){N=T;break}if(k==","){N=f;break}throw Error(a);case d:if(k.match(g)){r.attrName=k,N=v;break}if(k.match(o))break;throw Error(a);case v:if(k.match(y)){r.attrName+=k;break}if(k.match(o)){N=m;break}if(k=="~"){r.contains=!0,N=b;break}if(k=="="){r.attrValue="",N=E;break}if(k=="]"){N=c;break}throw Error(a);case m:if(k=="~"){r.contains=!0,N=b;break}if(k=="="){r.attrValue="",N=E;break}if(k=="]"){N=c;break}if(k.match(o))break;throw Error(a);case b:if(k=="="){r.attrValue="",N=E;break}throw Error(a);case w:if(k=="]"){N=c;break}if(k.match(o))break;throw Error(a);case E:if(k.match(o))break;if(k=='"'||k=="'"){u=k,N=x;break}r.attrValue+=k,N=S;break;case S:if(k.match(o)){N=w;break}if(k=="]"){N=c;break}if(k=="'"||k=='"')throw Error(a);r.attrValue+=k;break;case x:if(k==u){N=w;break}r.attrValue+=k;break;case T:if(k.match(o))break;if(k==","){N=f;break}throw Error(a)}}switch(N){case f:case l:case c:case p:case T:i();break;default:throw Error(a)}if(!t.length)throw Error(a);return t.forEach(function(e){var t=e.tagName.toUpperCase();e.tagName!=t&&(e.caseInsensitiveTagName=t);var n=e.tagName;e.qualifiers.forEach(function(e){if(e.class)n+="."+e.attrValue;else if(e.id)n+="#"+e.attrValue;else{var t=e.attrName.toLowerCase();e.attrName!=t&&(e.caseInsensitiveAttrName=t),e.contains?n+="["+e.attrName+"~="+L(e.attrValue)+"]":(n+="["+e.attrName,e.hasOwnProperty("attrValue")&&(n+="="+L(e.attrValue)),n+="]")}}),e.selectorString=n}),t}function E(e){if(typeof e!="string")throw Error("Invalid request opion. attribute must be a non-zero length string.");e=e.trim();if(!e)throw Error("Invalid request opion. attribute must be a non-zero length string.");if(!e.match(w))throw Error("Invalid request option. invalid attribute name: "+e);return e}function S(e){if(!e.trim().length)throw Error("Invalid request option: elementAttributes must contain at least one attribute.");var t={},n={},r=e.split(/\s+/);for(var i=0;i<r.length;i++){var s=r[i];if(!s)continue;var s=E(s);if(t.hasOwnProperty(s.toLowerCase()))throw Error("Invalid request option: observing multiple case varitations of the same attribute is not supported.");n[s]=!0,t[s.toLowerCase()]=!0}return Object.keys(n)}function x(e){var t={callback:!0,queries:!0,rootNode:!0,oldPreviousSibling:!0,observeOwnChanges:!0},n={};for(var r in e)if(!(r in t))throw Error("Invalid option: "+r);if(typeof e.callback!="function")throw Error("Invalid options: callback is required and must be a function");n.callback=e.callback,n.rootNode=e.rootNode||document,n.observeOwnChanges=e.observeOwnChanges,n.oldPreviousSibling=e.oldPreviousSibling;if(!e.queries||!e.queries.length)throw Error("Invalid options: queries must contain at least one query request object.");n.queries=[];for(var i=0;i<e.queries.length;i++){var s=e.queries[i];if(s.all){if(Object.keys(s).length>1)throw Error("Invalid request option. all has no options.");n.queries.push({all:!0});continue}if(s.hasOwnProperty("attribute")){var o={attribute:E(s.attribute)};o.elementFilter=b("*["+o.attribute+"]");if(Object.keys(s).length>1)throw Error("Invalid request option. attribute has no options.");n.queries.push(o);continue}if(s.hasOwnProperty("element")){var u=Object.keys(s).length,o={element:s.element,elementFilter:b(s.element)};s.hasOwnProperty("elementAttributes")&&(o.elementAttributes=S(s.elementAttributes),u--);if(u>1)throw Error("Invalid request option. element only allows elementAttributes option.");n.queries.push(o);continue}if(s.characterData){if(Object.keys(s).length>1)throw Error("Invalid request option. characterData has no options.");n.queries.push({characterData:!0});continue}throw Error("Invalid request option. Unknown query request.")}return n}function T(e){var t={};return e.forEach(function(e){e.qualifiers.forEach(function(e){e.class?t["class"]=!0:e.id?t.id=!0:t[e.attrName]=!0})}),Object.keys(t)}function N(e){function r(e){if(t.attributes&&!n)return;t.attributes=!0,t.attributeOldValue=!0;if(!e){n=undefined;return}n=n||{},e.forEach(function(e){n[e]=!0,n[e.toLowerCase()]=!0})}var t={childList:!0,subtree:!0},n;return e.forEach(function(e){if(e.characterData){t.characterData=!0,t.characterDataOldValue=!0;return}if(e.all){r(),t.characterData=!0,t.characterDataOldValue=!0;return}if(e.attribute){r([e.attribute.trim()]);return}e.elementFilter&&e.elementFilter.some(function(e){return e.className})&&r(["class"]);var n=T(e.elementFilter).concat(e.elementAttributes||[]);n.length&&r(n)}),n&&(t.attributeFilter=Object.keys(n)),t}function C(e,t,n){e.elementFilter=n.elementFilter,e.filterCharacterData=n.characterData;var r={target:t,type:"summary",added:[],removed:[]};r.getOldParentNode=e.getOldParentNode.bind(e);if(n.all||n.element)r.reparented=[];n.all&&(r.reordered=[]),e.getChanged(r);if(n.all||n.attribute||n.elementAttributes){var i=n.attribute?[n.attribute]:n.elementAttributes,s=e.getAttributesChanged(i);n.attribute?(r.valueChanged=[],s[n.attribute]&&(r.valueChanged=s[n.attribute]),r.getOldAttribute=function(t){return e.getOldAttribute(t,n.attribute)}):(r.attributeChanged=s,n.elementAttributes&&n.elementAttributes.forEach(function(e){r.attributeChanged.hasOwnProperty(e)||(r.attributeChanged[e]=[])}),r.getOldAttribute=e.getOldAttribute.bind(e))}if(n.all||n.characterData){var o=e.getCharacterDataChanged();r.getOldCharacterData=e.getOldCharacterData.bind(e),n.characterData?r.valueChanged=o:r.characterDataChanged=o}return r.reordered&&(r.getOldPreviousSibling=e.getOldPreviousSibling.bind(e)),r}function k(e){function l(){f.forEach(function(e){e&&e.recordPreviousState()})}function c(e){f.forEach(function(t,n){t&&t.validate(e[n])})}function h(e){if(!e||!e.length)return[];var t=new m(s,u,a,r.oldPreviousSibling);return t.processMutations(e),r.queries.map(function(e){return C(t,s,e)})}function p(e){return e.some(function(e){var t=["added","removed","reordered","reparented","valueChanged","characterDataChanged"];if(t.some(function(t){return e[t]&&e[t].length}))return!0;if(e.attributeChanged){var n=Object.keys(e.attributeChanged).some(function(t){return e.attributeChanged[t].length});if(n)return!0}return!1})}var t=!1,r=x(e),i=N(r.queries),s=r.rootNode,o=r.callback,u=Array.prototype.concat.apply([],r.queries.map(function(e){return e.elementFilter?e.elementFilter:[]}));u.length||(u=undefined);var a=r.queries.some(function(e){return e.all}),f=[];k.createQueryValidator&&(f=r.queries.map(function(e){return k.createQueryValidator(s,e)}));var d=new n(function(e){r.observeOwnChanges||d.disconnect();var t=h(e);c(t),r.observeOwnChanges&&l(),p(t)&&o(t),r.observeOwnChanges||(l(),d.observe(s,i))});this.reconnect=function(){if(t)throw Error("Already connected");d.observe(s,i),t=!0,l()};var v=this.takeSummaries=function(){if(!t)throw Error("Not connected");var e=d.takeRecords(),n=h(e);if(p(n))return n};this.disconnect=function(){var e=v();return d.disconnect(),t=!1,e},this.reconnect()}var t="matchesSelector";"webkitMatchesSelector"in Element.prototype?t="webkitMatchesSelector":"mozMatchesSelector"in Element.prototype&&(t="mozMatchesSelector");var n=e.MutationObserver||e.WebKitMutationObserver||e.MozMutationObserver;if(n===undefined){console.log("MutationSummary cannot load: DOM Mutation Observers are required."),console.log("https://developer.mozilla.org/en-US/docs/DOM/MutationObserver");return}var r="__mutation_summary_node_map_id__",i=1;o.prototype={set:function(e,t){s(e),this.map_[e[r]]={k:e,v:t}},get:function(e){if(s(e))return;var t=this.map_[e[r]];if(t)return t.v},has:function(e){return!s(e)&&e[r]in this.map_},"delete":function(e){if(s(e))return;delete this.map_[e[r]]},keys:function(){var e=[];for(var t in this.map_)e.push(this.map_[t].k);return e}};var a=0,f=1,l=2,c=3,h=4,p=5,v=Array.prototype.forEach.call.bind(Array.prototype.forEach);m.prototype={getChange:function(e){var t=this.changeMap.get(e);return t||(t={target:e},this.changeMap.set(e,t)),e.nodeType==Node.ELEMENT_NODE&&(t.matchCaseInsensitive=e instanceof HTMLElement&&e.ownerDocument instanceof HTMLDocument),t},getParentChange:function(e){var t=this.getChange(e);return t.childList||(t.childList=!0,t.oldParentNode=null),t},handleChildList:function(e){this.childListChanges=!0,v(e.removedNodes,function(t){var n=this.getParentChange(t);n.added||n.oldParentNode?n.added=!1:n.oldParentNode=e.target},this),v(e.addedNodes,function(e){var t=this.getParentChange(e);t.added=!0},this)},handleAttributes:function(e){this.attributesChanges=!0;var t=this.getChange(e.target);t.attributes||(t.attributes=!0,t.attributeOldValues={});var n=t.attributeOldValues;u(n,e.attributeName)||(n[e.attributeName]=e.oldValue)},handleCharacterData:function(e){this.characterDataChanges=!0;var t=this.getChange(e.target);if(t.characterData)return;t.characterData=!0,t.characterDataOldValue=e.oldValue},processMutations:function(e){function m(e){if(!v.calcOldPreviousSibling)return;v.processChildlistChanges();var t=e.parentNode,n=v.changeMap.get(e);n&&n.oldParentNode&&(t=n.oldParentNode),n=v.childlistChanges.get(t),n||(n={oldPrevious:new o},v.childlistChanges.set(t,n)),n.oldPrevious.has(e)||n.oldPrevious.set(e,e.previousSibling)}function g(e,o){if(d.has(e))return;d.set(e,!0);var y=v.changeMap.get(e),b=o;if(y&&y.childList||b==undefined)b=s(e);if(b==a)return;i(e);if(b==f)t.push(e);else if(b==c)n.push(e),m(e);else if(b==l){var w=l;y&&y.childList&&(y.oldParentNode!==e.parentNode?(w=h,m(e)):v.calcReordered&&u(e)&&(w=p)),r.set(e,w)}if(b==l)return;for(var E=e.firstChild;E;E=E.nextSibling)g(E,b)}this.mutations=e,this.changeMap=new o,this.mutations.forEach(function(e){switch(e.type){case"childList":this.handleChildList(e);break;case"attributes":this.handleAttributes(e);break;case"characterData":this.handleCharacterData(e)}},this);var t=this.entered=[],n=this.exited=[],r=this.stayedIn=new o;if(!this.childListChanges&&!this.attributesChanges)return;var i=this.matchabilityChange.bind(this),s=this.reachabilityChange.bind(this),u=this.wasReordered.bind(this),d=new o,v=this;this.changeMap.keys().forEach(function(e){g(e)})},getChanged:function(e){var t=this.matchabilityChange.bind(this);this.entered.forEach(function(n){var r=t(n);(r==f||r==l)&&e.added.push(n)}),this.stayedIn.keys().forEach(function(n){var r=t(n);if(r==f)e.added.push(n);else if(r==c)e.removed.push(n);else if(r==l&&(e.reparented||e.reordered)){var i=this.stayedIn.get(n);e.reparented&&i==h?e.reparented.push(n):e.reordered&&i==p&&e.reordered.push(n)}},this),this.exited.forEach(function(n){var r=t(n);(r==c||r==l)&&e.removed.push(n)})},getOldParentNode:function(e){var t=this.changeMap.get(e);if(t&&t.childList)return t.oldParentNode?t.oldParentNode:null;var n=this.reachabilityChange(e);if(n==a||n==f)throw Error("getOldParentNode requested on invalid node.");return e.parentNode},getOldPreviousSibling:function(e){var t=e.parentNode,n=this.changeMap.get(e);n&&n.oldParentNode&&(t=n.oldParentNode),n=this.childlistChanges.get(t);if(!n)throw Error("getOldPreviousSibling requested on invalid node.");return n.oldPrevious.get(e)},getOldAttribute:function(e,t){var n=this.changeMap.get(e);if(!n||!n.attributes)throw Error("getOldAttribute requested on invalid node.");n.matchCaseInsensitive&&(t=t.toLowerCase());if(!u(n.attributeOldValues,t))throw Error("getOldAttribute requested for unchanged attribute name.");return n.attributeOldValues[t]},getAttributesChanged:function(e){if(!this.attributesChanges)return{};var t,n;e&&(t={},n={},e.forEach(function(e){t[e]=!0;var r=e.toLowerCase();e!=r&&(n[r]=e)}));var r={},i=this.changeMap.keys();for(var s=0;s<i.length;s++){var o=i[s],u=this.changeMap.get(o);if(!u.attributes)continue;if(l!=this.reachabilityChange(o)||l!=this.matchabilityChange(o))continue;var a=o,f=u.attributeOldValues;Object.keys(f).forEach(function(e){var i=e;u.matchCaseInsensitive&&n&&n[e]&&(i=n[e]);if(t&&!t[i])return;if(a.getAttribute(e)==f[e])return;r[i]||(r[i]=[]),r[i].push(a)})}return r},getOldCharacterData:function(e){var t=this.changeMap.get(e);if(!t||!t.characterData)throw Error("getOldCharacterData requested on invalid node.");return t.characterDataOldValue},getCharacterDataChanged:function(){if(!this.characterDataChanges)return[];var e=this.changeMap.keys(),t=[];for(var n=0;n<e.length;n++){var r=e[n];if(l!=this.reachabilityChange(r)||l!=this.matchabilityChange(r))continue;var i=this.changeMap.get(r);if(!i.characterData||r.textContent==i.characterDataOldValue)continue;t.push(r)}return t},reachabilityChange:function(e){function s(e){var t=n.get(e);if(t&&t.childList){if(t.oldParentNode)return t.oldParentNode;if(t.added)return null}return e.parentNode}function u(e){if(e===t)return!0;if(!e)return!1;var n=r.get(e);return n===undefined&&(n=u(e.parentNode),r.set(e,n)),n}function h(e){if(e===t)return!0;if(!e)return!1;var n=i.get(e);return n===undefined&&(n=h(s(e)),i.set(e,n)),n}this.reachableCache=this.reachableCache||new o,this.wasReachableCache=this.wasReachableCache||new o;var t=this.rootNode,n=this.changeMap,r=this.reachableCache,i=this.wasReachableCache;return u(e)?h(e)?l:f:h(e)?c:a},checkWasMatching:function(e,t,n){var r=this.changeMap.get(e);if(!r||!r.attributeOldValues)return n;var i=t.tagName;r.matchCaseInsensitive&&i!="*"&&u(t,"caseInsensitiveTagName")&&(i=t.caseInsensitiveTagName);if(i!="*"&&i!=e.tagName)return!1;var s=r.attributeOldValues,o=t.qualifiers.some(function(e){return e.class?u(s,"class"):e.id?u(s,"id"):r.matchCaseInsensitive&&u(e,"caseInsensitiveAttrName")?u(s,e.caseInsensitiveAttrName):u(s,e.attrName)});if(!o)return n;for(var a=0;a<t.qualifiers.length;a++){var f=t.qualifiers[a],l;f.class?l="class":f.id?l="id":r.matchCaseInsensitive&&u(f,"caseInsensitiveAttrName")?l=f.caseInsensitiveAttrName:l=f.attrName;var c=f.class?!0:f.contains,h=u(s,l)?s[l]:e.getAttribute(l);if(h==null)return!1;if(f.hasOwnProperty("attrValue")){if(!c&&f.attrValue!==h)return!1;var p=h.split(" ").some(function(e){return e==f.attrValue});if(!p)return!1}}return!0},matchabilityChange:function(e){function r(e){this.matchCache||(this.matchCache={}),this.matchCache[e.selectorString]||(this.matchCache[e.selectorString]=new o);var r=this.matchCache[e.selectorString],i=r.get(n);if(i!==undefined)return i;var s=n[t](e.selectorString),u=this.checkWasMatching(n,e,s);return s?i=u?l:f:i=u?c:a,r.set(n,i),i}if(this.filterCharacterData)switch(e.nodeType){case Node.COMMENT_NODE:case Node.TEXT_NODE:return l;default:return a}if(!this.elementFilter)return l;if(e.nodeType!==Node.ELEMENT_NODE)return a;var n=e,i=this.elementFilter.map(r,this),s=a,u=0;while(s!=l&&u<i.length){switch(i[u]){case l:s=l;break;case f:s==c?s=l:s=f;break;case c:s==f?s=l:s=c}u++}return s},processChildlistChanges:function(){function t(t){var n=e.get(t);return n||(n={added:new o,removed:new o,maybeMoved:new o,oldPrevious:new o},e.set(t,n)),n}if(this.childlistChanges)return;var e=this.childlistChanges=new o,n=this.reachabilityChange.bind(this),r=this;this.mutations.forEach(function(e){function o(e,t){if(!e||i.oldPrevious.has(e)||i.added.has(e)||i.maybeMoved.has(e))return;if(t&&(i.added.has(t)||i.maybeMoved.has(t)))return;i.oldPrevious.set(e,t)}if(e.type!="childList")return;if(n(e.target)!=l&&!r.calcOldPreviousSibling)return;var i=t(e.target),s=e.previousSibling;v(e.removedNodes,function(e){o(e,s),i.added.has(e)?i.added.delete(e):(i.removed.set(e,!0),i.maybeMoved.delete(e,!0)),s=e}),o(e.nextSibling,s),v(e.addedNodes,function(e){i.removed.has(e)?(i.removed.delete(e),i.maybeMoved.set(e,!0)):i.added.set(e,!0)})})},wasReordered:function(e){function s(e){if(!e)return!1;if(!n.maybeMoved.has(e))return!1;var t=r.get(e);return t!==undefined?t:(i.has(e)?t=!0:(i.set(e,!0),t=l(e)!==a(e)),i.has(e)?(i.delete(e),r.set(e,t)):t=r.get(e),t)}function a(e){var t=u.get(e);if(t!==undefined)return t;t=n.oldPrevious.get(e);while(t&&(n.removed.has(t)||s(t)))t=a(t);return t===undefined&&(t=e.previousSibling),u.set(e,t),t}function l(e){if(f.has(e))return f.get(e);var t=e.previousSibling;while(t&&(n.added.has(t)||s(t)))t=t.previousSibling;return f.set(e,t),t}if(!this.childListChanges)return!1;this.processChildlistChanges();var t=e.parentNode,n=this.changeMap.get(e);n&&n.oldParentNode&&(t=n.oldParentNode),n=this.childlistChanges.get(t);if(!n)return!1;if(n.moved)return n.moved.get(e);var r=n.moved=new o,i=new o,u=new o,f=new o;return n.maybeMoved.keys().forEach(s),n.moved.get(e)}};var g=/[a-zA-Z_]+/,y=/[a-zA-Z0-9_\-]+/,w=/^([a-zA-Z:_]+[a-zA-Z0-9_\-:\.]*)$/;e.MutationSummary=k,e.MutationSummary.NodeMap=o,e.MutationSummary.parseElementFilter=b})(this);
/*!
 * Copyright 2012 The Toolkitchen Authors. All rights reserved.
 * Use of this source code is governed by a BSD-style
 * license that can be found in the LICENSE file.
 */
function PointerEvent(e,t){var n=document.createEvent("MouseEvent");return Object.__proto__?(n.__proto__=PointerEvent.prototype,n.initPointerEvent(e,t)):PointerEvent.prototype.initPointerEvent.call(n,e,t),n}function PointerMap(){this.ids=[],this.pointers=[]}PointerEvent.prototype.__proto__=MouseEvent.prototype,PointerEvent.prototype.initPointerEvent=function(e,t){var n={bubbles:!1,cancelable:!1,view:null,detail:null,screenX:0,screenY:0,clientX:0,clientY:0,ctrlKey:!1,altKey:!1,shiftKey:!1,metaKey:!1,button:-1,buttons:null,which:0,relatedTarget:null,pointerId:-1,width:0,height:0,pressure:0,tiltX:0,tiltY:0,pointerType:"unavailable",hwTimestamp:0,isPrimary:!1};for(var r in t)r in n&&(n[r]=t[r]);var i;n.buttons!==null?i=n.buttons?n.button:-1:i=n.which?n.button:-1,Object.defineProperties(this,{pointerId:{value:n.pointerId,enumerable:!0},width:{value:n.width,enumerable:!0},height:{value:n.height,enumerable:!0},pressure:{value:n.pressure,enumerable:!0},tiltX:{value:n.tiltX,enumerable:!0},tiltY:{value:n.tiltY,enumerable:!0},pointerType:{value:n.pointerType,enumerable:!0},hwTimestamp:{value:n.hwTimestamp,enumerable:!0},isPrimary:{value:n.isPrimary,enumerable:!0}}),this.initMouseEvent(e,n.bubbles,n.cancelable,n.view,n.detail,n.screenX,n.screenY,n.clientX,n.clientY,n.ctrlKey,n.altKey,n.shiftKey,n.metaKey,i,n.relatedTarget)};var SideTable;typeof WeakMap!="undefined"&&navigator.userAgent.indexOf("Firefox/")<0?SideTable=WeakMap:(SideTable=function(e){this.name="__$"+e+"$__"},SideTable.prototype={set:function(e,t){Object.defineProperty(e,this.name,{value:t,writable:!0})},get:function(e){return e[this.name]}}),function(e){e=e||{},Function.prototype.bind||(Function.prototype.bind=function(t){var n=e.toArray(arguments,1),r=this;return function(){var i=e.toArray(arguments,0);return r.apply(t,n.concat(i))}}),e.toArray=function(e,t){return Array.prototype.slice.call(e,t||0)},window.__PointerEventShim__=e}(window.__PointerEventShim__),PointerMap.prototype={set:function(e,t){var n=this.ids.indexOf(e);n>-1?this.pointers[n]=t:(this.ids.push(e),this.pointers.push(t))},has:function(e){return this.ids.indexOf(e)>-1},"delete":function(e){var t=this.ids.indexOf(e);t>-1&&(this.ids.splice(t,1),this.pointers.splice(t,1))},get:function(e){var t=this.ids.indexOf(e);return this.pointers[t]},item:function(e){return this.pointers[e]},get size(){return this.pointers.length}},function(e){var t={targets:new SideTable("target"),handledEvents:new SideTable("pointer"),pointermap:new PointerMap,events:[],eventMap:{},eventSources:{},registerSource:function(e,t){var n=t,r=n.events;r&&(this.events=this.events.concat(r),r.forEach(function(e){n[e]&&(this.eventMap[e]=n[e].bind(n))},this),this.eventSources[e]=n)},registerTarget:function(e){this.listen(this.events,e)},unregisterTarget:function(e){this.unlisten(this.events,e)},down:function(e){this.fireEvent("pointerdown",e)},move:function(e){this.fireEvent("pointermove",e)},up:function(e){this.fireEvent("pointerup",e)},enter:function(e){this.fireEvent("pointerenter",e)},leave:function(e){this.fireEvent("pointerleave",e)},over:function(e){this.fireEvent("pointerover",e)},out:function(e){this.fireEvent("pointerout",e)},cancel:function(e){this.fireEvent("pointercancel",e)},eventHandler:function(e){if(this.handledEvents.get(e))return;var t=e.type,n=this.eventMap&&this.eventMap[t];n&&n(e),this.handledEvents.set(e,!0)},listen:function(e,t){e.forEach(function(e){this.addEvent(e,this.boundHandler,!0,t)},this)},unlisten:function(e,t){e.forEach(function(e){this.removeEvent(e,this.boundHandler,!0,t)},this)},addEvent:function(e,t,n,r){r.addEventListener(e,t,n)},removeEvent:function(e,t,n,r){r.removeEventListener(e,t,n)},makeEvent:function(e,t){var n=new PointerEvent(e,t);return this.targets.set(n,this.targets.get(t)||t.target),n},fireEvent:function(e,t){var n=this.makeEvent(e,t);return this.dispatchEvent(n)},cloneEvent:function(e){var t={};for(var n in e)t[n]=e[n];return t},getTarget:function(e){return this.captureInfo&&this.captureInfo.id===e.pointerId?this.captureInfo.target:this.targets.get(e)},setCapture:function(e,t){this.captureInfo&&this.releaseCapture(this.captureInfo.id),this.captureInfo={id:e,target:t};var n=new PointerEvent("gotpointercapture",{bubbles:!0});this.implicitRelease=this.releaseCapture.bind(this,e),document.addEventListener("pointerup",this.implicitRelease),setTimeout(function(){t.dispatchEvent(n)},0)},releaseCapture:function(e){if(this.captureInfo&&this.captureInfo.id===e){var t=new PointerEvent("lostpointercapture",{bubbles:!0}),n=this.captureInfo.target;this.captureInfo=null,document.removeEventListener("pointerup",this.implicitRelease),setTimeout(function(){n.dispatchEvent(t)},0)}},dispatchEvent:function(e){var t=this.getTarget(e);if(t)return t.dispatchEvent(e)}};t.boundHandler=t.eventHandler.bind(t),e.dispatcher=t}(window.__PointerEventShim__),function(e){var t=e.dispatcher,n=Array.prototype.forEach.call.bind(Array.prototype.forEach),r={SELECTOR:"[touch-action=none]",watchSubtree:function(e){new MutationSummary({callback:i,rootNode:e,queries:[{element:this.SELECTOR}]})},enableOnSubtree:function(e){var t=e||document;this.watchSubtree(e),t===document&&document.readyState!=="complete"?this.installOnLoad():this.findElements(t)},findElements:function(e){var t=e||document;if(t.querySelectorAll){var r=t.querySelectorAll(this.SELECTOR);n(r,this.elementAdded,this)}},elementRemoved:function(e){t.unregisterTarget(e)},elementAdded:function(e){t.registerTarget(e)},installOnLoad:function(){document.addEventListener("DOMContentLoaded",this.findElements.bind(this,document))},summaryWatcher:function(e){e.forEach(this.summaryHandler,this)},summaryHandler:function(e){e.added.forEach(this.elementAdded,this),e.removed.forEach(this.elementRemoved,this)}},i=r.summaryWatcher.bind(r);e.installer=r,e.enablePointerEvents=r.enableOnSubtree.bind(r),window.MutationSummary||(r.watchSubtree=function(){console.warn("MutationSummary not found, touch-action will not be dynamically detected")})}(window.__PointerEventShim__),function(e){var t=e.dispatcher,n=e.installer,r=t.pointermap,i=Array.prototype.map.call.bind(Array.prototype.map),s={events:["touchstart","touchmove","touchend","touchcancel"],POINTER_TYPE:"touch",firstTouch:null,isPrimaryTouch:function(e){return this.firstTouch===e.identifier},setPrimaryTouch:function(e){this.firstTouch===null&&(this.firstTouch=e.identifier)},removePrimaryTouch:function(e){this.isPrimaryTouch(e)&&(this.firstTouch=null)},touchToPointer:function(e){var n=t.cloneEvent(e);return n.pointerId=e.identifier+2,n.target=this.findTarget(n),n.bubbles=!0,n.cancelable=!0,n.button=0,n.buttons=1,n.isPrimary=this.isPrimaryTouch(e),n.pointerType=this.POINTER_TYPE,n},processTouches:function(e,t){var n=e.changedTouches,r=i(n,this.touchToPointer,this);r.forEach(t,this)},findTarget:function(e){return document.elementFromPoint(e.clientX,e.clientY)||document},touchstart:function(e){this.setPrimaryTouch(e.changedTouches[0]),this.processTouches(e,this.overDown)},overDown:function(e){var n=r.set(e.pointerId,{target:e.target,out:e,outTarget:e.target});t.over(e),t.down(e)},touchmove:function(e){e.preventDefault(),this.processTouches(e,this.moveOverOut)},moveOverOut:function(e){var n=e,i=r.get(n.pointerId),s=i.out,o=i.outTarget;t.move(n),s&&o!==n.target&&(s.relatedTarget=n.target,n.relatedTarget=o,s.target=o,t.out(s),t.over(n)),i.out=n,i.outTarget=n.target},touchend:function(e){this.processTouches(e,this.upOut)},upOut:function(e){t.up(e),t.out(e),this.cleanUpPointer(e)},touchcancel:function(e){this.processTouches(e,this.cancelOut)},cancelOut:function(e){t.cancel(e),t.out(e),this.cleanUpPointer(e)},cleanUpPointer:function(e){r.delete(e.pointerId),this.removePrimaryTouch(e)}},o={POINTER_ID:1,POINTER_TYPE:"mouse",events:["mousedown","mousemove","mouseup","mouseover","mouseout"],global:["mousedown","mouseup","mouseover","mouseout"],prepareEvent:function(e){var n=t.cloneEvent(e);return n.pointerId=this.POINTER_ID,n.isPrimary=!0,n.pointerType=this.POINTER_TYPE,n},mousedown:function(e){if(!r.has(this.POINTER_ID)){var n=this.prepareEvent(e),i=r.set(this.POINTER_ID,e);t.down(n),t.listen(this.global,document)}},mousemove:function(e){var n=this.prepareEvent(e);t.move(n)},mouseup:function(e){var n=r.get(this.POINTER_ID);if(n&&n.button===e.button){var i=this.prepareEvent(e);t.up(i),r.delete(this.POINTER_ID),t.unlisten(this.global,document)}},mouseover:function(e){var n=this.prepareEvent(e);t.over(n)},mouseout:function(e){var n=this.prepareEvent(e);t.out(n)}},u={events:["MSPointerDown","MSPointerMove","MSPointerUp","MSPointerOut","MSPointerOver","MSPointerCancel"],POINTER_TYPES:["NOT USED","unavailable","touch","pen","mouse"],prepareEvent:function(e){var n=t.cloneEvent(e);return n.pointerType=this.POINTER_TYPES[e.pointerType],n},MSPointerDown:function(e){var n=this.prepareEvent(e);t.down(n)},MSPointerMove:function(e){var n=this.prepareEvent(e);t.move(n)},MSPointerUp:function(e){var n=this.prepareEvent(e);t.up(n)},MSPointerOut:function(e){var n=this.prepareEvent(e);t.out(n)},MSPointerOver:function(e){var n=this.prepareEvent(e);t.over(n)},MSPointerCancel:function(e){var n=this.prepareEvent(e);t.cancel(n)}};if(window.navigator.pointerEnabled===undefined){if(window.navigator.msPointerEnabled){var a=window.navigator.msMaxTouchPoints;a!==undefined&&Object.defineProperty(window.navigator,"maxTouchPoints",{value:a,enumerable:!0}),t.registerSource("ms",u),t.registerTarget(document)}else"ontouchstart"in window?t.registerSource("touch",s):t.registerSource("mouse",o),n.enableOnSubtree(document),t.listen(["mousemove"],document);Object.defineProperty(window.navigator,"pointerEnabled",{value:!0,enumerable:!0})}}(window.__PointerEventShim__);