/*
 @licstart  The following is the entire license notice for the JavaScript code in this file.

 The MIT License (MIT)

 Copyright (C) 1997-2020 by Dimitri van Heesch

 Permission is hereby granted, free of charge, to any person obtaining a copy of this software
 and associated documentation files (the "Software"), to deal in the Software without restriction,
 including without limitation the rights to use, copy, modify, merge, publish, distribute,
 sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in all copies or
 substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING
 BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
 DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

 @licend  The above is the entire license notice for the JavaScript code in this file
 */
function initResizable(){function e(e){if(window.chrome){if(o=localStorage.getItem(h+"_width"))return o}else{var t=h+"_"+e+"=";if(document.cookie){var i=document.cookie.indexOf(t);if(-1!=i){var o,n=i+t.length,a=document.cookie.indexOf(";",n);return-1==a&&(a=document.cookie.length),o=document.cookie.substring(n,a)}}}return 250}function t(e,t){if(window.chrome)localStorage.setItem(h+"_width",t);else{var i=new Date;i.setTime(i.getTime()+31536e7),expiration=i.toGMTString(),document.cookie=h+"_"+e+"="+t+"; SameSite=Lax; expires="+expiration+"; path=/"}}function i(){$(window).width();var e=$(r).outerWidth();s.css({marginLeft:parseInt(e)+"px"}),"undefined"!=typeof page_layout&&1==page_layout&&footer.css({marginLeft:parseInt(e)+"px"}),t("width",e-u)}function o(e){$(window).width();s.css({marginLeft:parseInt(e)+u+"px"}),"undefined"!=typeof page_layout&&1==page_layout&&footer.css({marginLeft:parseInt(e)+u+"px"}),r.css({width:e+"px"})}function n(){var e,t,i,o=c.outerHeight(),n=footer.outerHeight(),a=$(window).height();"undefined"==typeof page_layout||0==page_layout?(t=e=a-o-n,i=e):1==page_layout&&(e=a-n,t=a-o,i=a),s.css({height:e+"px"}),d.css({height:t+"px"}),r.css({height:i+"px"}),location.hash.slice(1)&&(document.getElementById(location.hash.slice(1))||document.body).scrollIntoView()}function a(){var i;if(r.width()>0)i=0;else{var n=e("width");i=n>250&&n<$(window).width()?n:250}o(i),t("width",$(r).outerWidth()-u)}var r,d,s,c,h="doxygen",u=6;c=$("#top"),r=$("#side-nav"),s=$("#doc-content"),d=$("#nav-tree"),footer=$("#nav-path"),$(".side-nav-resizable").resizable({resize:function(){i()}}),$(r).resizable({minWidth:0}),$(window).resize(function(){n()}),navigator.userAgent.toLowerCase().match(/(iphone|ipod|ipad|android)/)&&($(r).css({paddingRight:"20px"}),$(".ui-resizable-e").css({width:"20px"}),$("#nav-sync").css({right:"34px"}),u=20);var l=e("width");l?o(l):i(),n();var p=location.href,f=p.indexOf("#");f>=0&&(window.location.hash=p.substr(f));var g=function(e){e.preventDefault()};$("#splitbar").bind("dragstart",g).bind("selectstart",g),once&&($(".ui-resizable-handle").dblclick(a),once=0),$(window).on("load",n)}var once=1;