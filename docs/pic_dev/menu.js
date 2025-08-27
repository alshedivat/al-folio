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
function initMenu(e,a,n,i,s){function o(e,a){var n="";if("children"in e){for(var i in n+="<ul>",e.children){var s;n+='<li><a href="'+("^"==(s=e.children[i].url).substring(0,1)?s.substring(1):a+s)+'">'+e.children[i].text+"</a>"+o(e.children[i],a)+"</li>"}n+="</ul>"}return n}var c;a&&(c=n?'<div id="MSearchBox" class="MSearchBoxInactive"><div class="left"><form id="FSearchBox" action="'+e+i+'" method="get"><span id="MSearchSelectExt">&#160;</span><input type="text" id="MSearchField" name="query" value="" placeholder="'+s+'" size="20" accesskey="S" onfocus="searchBox.OnSearchFieldFocus(true)" onblur="searchBox.OnSearchFieldFocus(false)"/></form></div><div class="right"></div></div>':'<div id="MSearchBox" class="MSearchBoxInactive"><span class="left"><span id="MSearchSelect" onmouseover="return searchBox.OnSearchSelectShow()" onmouseout="return searchBox.OnSearchSelectHide()">&#160;</span><input type="text" id="MSearchField" value="" placeholder="'+s+'" accesskey="S" onfocus="searchBox.OnSearchFieldFocus(true)" onblur="searchBox.OnSearchFieldFocus(false)" onkeyup="searchBox.OnSearchFieldChange(event)"/></span><span class="right"><a id="MSearchClose" href="javascript:searchBox.CloseResultsWindow()"><img id="MSearchCloseImg" border="0" src="'+e+'search/close.svg" alt=""/></a></span></div>'),$("#main-nav").before('<div class="sm sm-dox"><input id="main-menu-state" type="checkbox"/><label class="main-menu-btn" for="main-menu-state"><span class="main-menu-btn-icon"></span> Toggle main menu visibility</label><span id="searchBoxPos1" style="position:absolute;right:8px;top:8px;height:36px;"></span></div>'),$("#main-nav").append(o(menudata,e)),$("#main-nav").children(":first").addClass("sm sm-dox").attr("id","main-menu"),c&&$("#main-menu").append('<li id="searchBoxPos2" style="float:right"></li>');var t=$("#main-menu-state"),r=0;if(t.length){function l(){"function"==typeof initResizable&&initResizable()}function h(){var e=$("#main-menu"),a=$("#main-menu-state"),n=$(window).outerWidth();n!=r&&($(window).outerWidth()<768?(a.prop("checked",!1),e.hide(),$("#searchBoxPos1").html(c),$("#searchBoxPos2").hide()):(e.show(),$("#searchBoxPos1").empty(),$("#searchBoxPos2").html(c),$("#searchBoxPos2").show()),"undefined"!=typeof searchBox&&searchBox.CloseResultsWindow(),r=n)}t.change(function(){var e=$("#main-menu"),a={duration:250,step:l};this.checked?(a.complete=function(){e.css("display","block")},e.hide().slideDown(a)):(a.complete=function(){e.css("display","none")},e.show().slideUp(a))}),$(window).ready(function(){h(),l()}),$(window).resize(h)}$("#main-menu").smartmenus()}