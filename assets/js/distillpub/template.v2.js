<<<<<<< HEAD
!function(n){"function"==typeof define&&define.amd?define(n):n()}(function(){"use strict";
// Copyright 2018 The Distill Template Authors
function n(n,t){n.title=t.title,t.published&&(t.published instanceof Date?n.publishedDate=t.published:t.published.constructor===String&&(n.publishedDate=new Date(t.published))),t.publishedDate&&(t.publishedDate instanceof Date?n.publishedDate=t.publishedDate:t.publishedDate.constructor===String?n.publishedDate=new Date(t.publishedDate):console.error("Don't know what to do with published date: "+t.publishedDate)),n.description=t.description,n.authors=t.authors.map(n=>new Nr(n)),n.katex=t.katex,n.password=t.password,t.doi&&(n.doi=t.doi)}
// Copyright 2018 The Distill Template Authors
function t(n=document){const t=new Set,e=n.querySelectorAll("d-cite");for(const n of e){const e=(n.getAttribute("key")||n.getAttribute("bibtex-key")).split(",").map(n=>n.trim());for(const n of e)t.add(n)}return[...t]}function e(n,t,e,i){if(null==n.author)return"";var r=n.author.split(" and ");let o=r.map(n=>{if(-1!=(n=n.trim()).indexOf(","))var e=n.split(",")[0].trim(),i=n.split(",")[1];else if(-1!=n.indexOf(" "))e=n.split(" ").slice(-1)[0].trim(),i=n.split(" ").slice(0,-1).join(" ");else e=n.trim();var r="";return i!=undefined&&(r=(r=i.trim().split(" ").map(n=>n.trim()[0])).join(".")+"."),t.replace("${F}",i).replace("${L}",e).replace("${I}",r).trim()});if(r.length>1){var a=o.slice(0,r.length-1).join(e);return a+=(i||e)+o[r.length-1]}return o[0]}function i(n){var t=n.journal||n.booktitle||"";if("volume"in n){var e=n.issue||n.number;e=e!=undefined?"("+e+")":"",t+=", Vol "+n.volume+e}return"pages"in n&&(t+=", pp. "+n.pages),""!=t&&(t+=". "),"publisher"in n&&"."!=(t+=n.publisher)[t.length-1]&&(t+="."),t}function r(n){if("url"in n){var t=n.url,e=/arxiv\.org\/abs\/([0-9\.]*)/.exec(t);if(null!=e&&(t=`http://arxiv.org/pdf/${e[1]}.pdf`),".pdf"==t.slice(-4))var i="PDF";else if(".html"==t.slice(-5))i="HTML";return` &ensp;<a href="${t}">[${i||"link"}]</a>`}return""}function o(n,t){return"doi"in n?`${t?"<br>":""} <a href="https://doi.org/${n.doi}" style="text-decoration:inherit;">DOI: ${n.doi}</a>`:""}function a(n){return'<span class="title">'+n.title+"</span> "}function s(n){if(n){var t=a(n);return t+=r(n)+"<br>",n.author&&(t+=e(n,"${L}, ${I}",", "," and "),(n.year||n.date)&&(t+=", ")),n.year||n.date?t+=(n.year||n.date)+". ":t+=". ",t+=i(n),t+=o(n)}return"?"}function l(n){if(n){var t="";t+="<strong>"+n.title+"</strong>",t+=r(n),t+="<br>";var a=e(n,"${I} ${L}",", ")+".",s=i(n).trim()+" "+n.year+". "+o(n,!0);return(a+s).length<Math.min(40,n.title.length)?t+=a+" "+s:t+=a+"<br>"+s,t}return"?"}function u(){return-1!==["interactive","complete"].indexOf(document.readyState)}
// Copyright 2018 The Distill Template Authors
function c(n){for(let t of n.authors){const n=Boolean(t.affiliation),e=Boolean(t.affiliations);if(n)if(e)console.warn(`Author ${t.author} has both old-style ("affiliation" & "affiliationURL") and new style ("affiliations") affiliation information!`);else{let n={name:t.affiliation};t.affiliationURL&&(n.url=t.affiliationURL),t.affiliations=[n]}}return n}function d(n){const t=n.firstElementChild;if(t){if("json"==t.getAttribute("type").split("/")[1]){const n=t.textContent;return c(JSON.parse(n))}console.error("Distill only supports JSON frontmatter tags anymore; no more YAML.")}else console.error("You added a frontmatter tag but did not provide a script tag with front matter data in it. Please take a look at our templates.");return{}}
// Copyright 2018 The Distill Template Authors
function h(n,t){const e=n.body;if(!e.querySelector("d-article"))return void console.warn("No d-article tag found; skipping adding optional components!");let i=n.querySelector("d-byline");i||(t.authors?i=n.createElement("d-byline"):console.warn("No authors found in front matter; please add them before submission!"));let r=n.querySelector("d-title");r||(r=n.createElement("d-title"),e.insertBefore(r,i));let o=r.querySelector("h1");o||((o=n.createElement("h1")).textContent=t.title,r.insertBefore(o,r.firstChild));const a="undefined"!=typeof t.password;let s=e.querySelector("d-interstitial");if(a&&!s){const i="undefined"!=typeof window,r=i&&window.location.hostname.includes("localhost");i&&r||((s=n.createElement("d-interstitial")).password=t.password,e.insertBefore(s,e.firstChild))}else!a&&s&&s.parentElement.removeChild(this);let l=n.querySelector("d-appendix");l||(l=n.createElement("d-appendix"),n.body.appendChild(l));let u=n.querySelector("d-footnote-list");u||(u=n.createElement("d-footnote-list"),l.appendChild(u));let c=n.querySelector("d-citation-list");c||(c=n.createElement("d-citation-list"),l.appendChild(c))}
// Copyright 2018 The Distill Template Authors
function p(n){const t="distill-prerendered-styles";if(!n.getElementById(t)){const e=n.createElement("style");e.id=t,e.type="text/css";const i=n.createTextNode(Kr);e.appendChild(i);const r=n.head.querySelector("script");n.head.insertBefore(e,r)}}
// Copyright 2018 The Distill Template Authors
function f(n,t){console.debug("Runlevel 0: Polyfill required: "+n.name);const e=document.createElement("script");e.src=n.url,e.async=!1,t&&(e.onload=function(){t(n)}),e.onerror=function(){new Error("Runlevel 0: Polyfills failed to load script "+n.name)},document.head.appendChild(e)}
// Copyright 2018 The Distill Template Authors
function g(n){return`${n} {\n      grid-column: left / text;\n    }\n  `}
// Copyright 2018 The Distill Template Authors
function m(n,t){return n(t={exports:{}},t.exports),t.exports}
// Copyright 2018 The Distill Template Authors
function b(n){return n.replace(/[\t\n ]+/g," ").replace(/{\\["^`.'acu~Hvs]( )?([a-zA-Z])}/g,(n,t,e)=>e).replace(/{\\([a-zA-Z])}/g,(n,t)=>t)}function y(n){const t=new Map,e=oo.toJSON(n);for(const n of e){for(const[t,e]of Object.entries(n.entryTags))n.entryTags[t.toLowerCase()]=b(e);n.entryTags.type=n.entryType,t.set(n.citationKey,n.entryTags)}return t}function v(n){return`@article{${n.slug},\n  author = {${n.bibtexAuthors}},\n  title = {${n.title}},\n  journal = {${n.journal.title}},\n  year = {${n.publishedYear}},\n  note = {${n.url}},\n  doi = {${n.doi}}\n}`}
// Copyright 2018 The Distill Template Authors
// Copyright 2018 The Distill Template Authors
function w(n){return`\n  <div class="byline grid">\n    <div class="authors-affiliations grid">\n      <h3>Authors</h3>\n      <h3>Affiliations</h3>\n      ${n.authors.map(n=>`\n        <p class="author">\n          ${n.personalURL?`\n            <a class="name" href="${n.personalURL}">${n.name}</a>`:`\n            <span class="name">${n.name}</span>`}\n        </p>\n        <p class="affiliation">\n        ${n.affiliations.map(n=>n.url?`<a class="affiliation" href="${n.url}">${n.name}</a>`:`<span class="affiliation">${n.name}</span>`).join(", ")}\n        </p>\n      `).join("")}\n    </div>\n    <div>\n      <h3>Published</h3>\n      ${n.publishedDate?`\n        <p>${n.publishedMonth} ${n.publishedDay}, ${n.publishedYear}</p> `:"\n        <p><em>Not published yet.</em></p>"}\n    </div>\n  </div>\n`}function x(n,t,e=document){if(t.size>0){n.style.display="";let i=n.querySelector(".references");if(i)i.innerHTML="";else{const t=e.createElement("style");t.innerHTML=co,n.appendChild(t);const r=e.createElement("h3");r.id="references",r.textContent="References",n.appendChild(r),(i=e.createElement("ol")).id="references-list",i.className="references",n.appendChild(i)}for(const[n,r]of t){const t=e.createElement("li");t.id=n,t.innerHTML=s(r),i.appendChild(t)}}else n.style.display="none"}function k(n,t){let e='\n  <style>\n\n  d-toc {\n    contain: layout style;\n    display: block;\n  }\n\n  d-toc ul {\n    padding-left: 0;\n  }\n\n  d-toc ul > ul {\n    padding-left: 24px;\n  }\n\n  d-toc a {\n    border-bottom: none;\n    text-decoration: none;\n  }\n\n  </style>\n  <nav role="navigation" class="table-of-contents"></nav>\n  <h2>Table of contents</h2>\n  <ul>';for(const n of t){const t="D-TITLE"==n.parentElement.tagName,i=n.getAttribute("no-toc");if(t||i)continue;const r=n.textContent;let o='<li><a href="'+("#"+n.getAttribute("id"))+'">'+r+"</a></li>";"H3"==n.tagName?o="<ul>"+o+"</ul>":o+="<br>",e+=o}e+="</ul></nav>",n.innerHTML=e}
// Copyright 2018 The Distill Template Authors
function S(n,t){return n<t?-1:n>t?1:n>=t?0:NaN}function M(n){return 1===n.length&&(n=T(n)),{left:function(t,e,i,r){for(null==i&&(i=0),null==r&&(r=t.length);i<r;){var o=i+r>>>1;n(t[o],e)<0?i=o+1:r=o}return i},right:function(t,e,i,r){for(null==i&&(i=0),null==r&&(r=t.length);i<r;){var o=i+r>>>1;n(t[o],e)>0?r=o:i=o+1}return i}}}function T(n){return function(t,e){return S(n(t),e)}}function _(n,t,e){n=+n,t=+t,e=(r=arguments.length)<2?(t=n,n=0,1):r<3?1:+e;for(var i=-1,r=0|Math.max(0,Math.ceil((t-n)/e)),o=new Array(r);++i<r;)o[i]=n+i*e;return o}function C(n,t,e){var i,r,o,a,s=-1;if(e=+e,(n=+n)===(t=+t)&&e>0)return[n];if((i=t<n)&&(r=n,n=t,t=r),0===(a=A(n,t,e))||!isFinite(a))return[];if(a>0)for(n=Math.ceil(n/a),t=Math.floor(t/a),o=new Array(r=Math.ceil(t-n+1));++s<r;)o[s]=(n+s)*a;else for(n=Math.floor(n*a),t=Math.ceil(t*a),o=new Array(r=Math.ceil(n-t+1));++s<r;)o[s]=(n-s)/a;return i&&o.reverse(),o}function A(n,t,e){var i=(t-n)/Math.max(0,e),r=Math.floor(Math.log(i)/Math.LN10),o=i/Math.pow(10,r);return r>=0?(o>=Lo?10:o>=Do?5:o>=Oo?2:1)*Math.pow(10,r):-Math.pow(10,-r)/(o>=Lo?10:o>=Do?5:o>=Oo?2:1)}function E(n,t,e){var i=Math.abs(t-n)/Math.max(0,e),r=Math.pow(10,Math.floor(Math.log(i)/Math.LN10)),o=i/r;return o>=Lo?r*=10:o>=Do?r*=5:o>=Oo&&(r*=2),t<n?-r:r}function N(n,t){switch(arguments.length){case 0:break;case 1:this.range(n);break;default:this.range(t).domain(n)}return this}function L(n,t,e){n.prototype=t.prototype=e,e.constructor=n}function D(n,t){var e=Object.create(n.prototype);for(var i in t)e[i]=t[i];return e}function O(){}function I(){return this.rgb().formatHex()}function F(){return G(this).formatHsl()}function R(){return this.rgb().formatRgb()}function U(n){var t,e;return n=(n+"").trim().toLowerCase(),(t=Po.exec(n))?(e=t[1].length,t=parseInt(t[1],16),6===e?$(t):3===e?new q(t>>8&15|t>>4&240,t>>4&15|240&t,(15&t)<<4|15&t,1):8===e?P(t>>24&255,t>>16&255,t>>8&255,(255&t)/255):4===e?P(t>>12&15|t>>8&240,t>>8&15|t>>4&240,t>>4&15|240&t,((15&t)<<4|15&t)/255):null):(t=Ho.exec(n))?new q(t[1],t[2],t[3],1):(t=zo.exec(n))?new q(255*t[1]/100,255*t[2]/100,255*t[3]/100,1):(t=qo.exec(n))?P(t[1],t[2],t[3],t[4]):(t=jo.exec(n))?P(255*t[1]/100,255*t[2]/100,255*t[3]/100,t[4]):(t=Bo.exec(n))?W(t[1],t[2]/100,t[3]/100,1):(t=Yo.exec(n))?W(t[1],t[2]/100,t[3]/100,t[4]):Wo.hasOwnProperty(n)?$(Wo[n]):"transparent"===n?new q(NaN,NaN,NaN,0):null}function $(n){return new q(n>>16&255,n>>8&255,255&n,1)}function P(n,t,e,i){return i<=0&&(n=t=e=NaN),new q(n,t,e,i)}function H(n){return n instanceof O||(n=U(n)),n?new q((n=n.rgb()).r,n.g,n.b,n.opacity):new q}function z(n,t,e,i){return 1===arguments.length?H(n):new q(n,t,e,null==i?1:i)}function q(n,t,e,i){this.r=+n,this.g=+t,this.b=+e,this.opacity=+i}function j(){return"#"+Y(this.r)+Y(this.g)+Y(this.b)}function B(){var n=this.opacity;return(1===(n=isNaN(n)?1:Math.max(0,Math.min(1,n)))?"rgb(":"rgba(")+Math.max(0,Math.min(255,Math.round(this.r)||0))+", "+Math.max(0,Math.min(255,Math.round(this.g)||0))+", "+Math.max(0,Math.min(255,Math.round(this.b)||0))+(1===n?")":", "+n+")")}function Y(n){return((n=Math.max(0,Math.min(255,Math.round(n)||0)))<16?"0":"")+n.toString(16)}function W(n,t,e,i){return i<=0?n=t=e=NaN:e<=0||e>=1?n=t=NaN:t<=0&&(n=NaN),new K(n,t,e,i)}function G(n){if(n instanceof K)return new K(n.h,n.s,n.l,n.opacity);if(n instanceof O||(n=U(n)),!n)return new K;if(n instanceof K)return n;var t=(n=n.rgb()).r/255,e=n.g/255,i=n.b/255,r=Math.min(t,e,i),o=Math.max(t,e,i),a=NaN,s=o-r,l=(o+r)/2;return s?(a=t===o?(e-i)/s+6*(e<i):e===o?(i-t)/s+2:(t-e)/s+4,s/=l<.5?o+r:2-o-r,a*=60):s=l>0&&l<1?0:a,new K(a,s,l,n.opacity)}function V(n,t,e,i){return 1===arguments.length?G(n):new K(n,t,e,null==i?1:i)}function K(n,t,e,i){this.h=+n,this.s=+t,this.l=+e,this.opacity=+i}function X(n,t,e){return 255*(n<60?t+(e-t)*n/60:n<180?e:n<240?t+(e-t)*(240-n)/60:t)}function Z(n){if(n instanceof J)return new J(n.l,n.a,n.b,n.opacity);if(n instanceof sn)return ln(n);n instanceof q||(n=H(n));var t,e,i=rn(n.r),r=rn(n.g),o=rn(n.b),a=nn((.2225045*i+.7168786*r+.0606169*o)/Zo);return i===r&&r===o?t=e=a:(t=nn((.4360747*i+.3850649*r+.1430804*o)/Xo),e=nn((.0139322*i+.0971045*r+.7141733*o)/Qo)),new J(116*a-16,500*(t-a),200*(a-e),n.opacity)}function Q(n,t,e,i){return 1===arguments.length?Z(n):new J(n,t,e,null==i?1:i)}function J(n,t,e,i){this.l=+n,this.a=+t,this.b=+e,this.opacity=+i}function nn(n){return n>ea?Math.pow(n,1/3):n/ta+Jo}function tn(n){return n>na?n*n*n:ta*(n-Jo)}function en(n){return 255*(n<=.0031308?12.92*n:1.055*Math.pow(n,1/2.4)-.055)}function rn(n){return(n/=255)<=.04045?n/12.92:Math.pow((n+.055)/1.055,2.4)}function on(n){if(n instanceof sn)return new sn(n.h,n.c,n.l,n.opacity);if(n instanceof J||(n=Z(n)),0===n.a&&0===n.b)return new sn(NaN,0<n.l&&n.l<100?0:NaN,n.l,n.opacity);var t=Math.atan2(n.b,n.a)*Vo;return new sn(t<0?t+360:t,Math.sqrt(n.a*n.a+n.b*n.b),n.l,n.opacity)}function an(n,t,e,i){return 1===arguments.length?on(n):new sn(n,t,e,null==i?1:i)}function sn(n,t,e,i){this.h=+n,this.c=+t,this.l=+e,this.opacity=+i}function ln(n){if(isNaN(n.h))return new J(n.l,0,0,n.opacity);var t=n.h*Go;return new J(n.l,Math.cos(t)*n.c,Math.sin(t)*n.c,n.opacity)}function un(n){if(n instanceof dn)return new dn(n.h,n.s,n.l,n.opacity);n instanceof q||(n=H(n));var t=n.r/255,e=n.g/255,i=n.b/255,r=(ca*i+la*t-ua*e)/(ca+la-ua),o=i-r,a=(sa*(e-r)-oa*o)/aa,s=Math.sqrt(a*a+o*o)/(sa*r*(1-r)),l=s?Math.atan2(a,o)*Vo-120:NaN;return new dn(l<0?l+360:l,s,r,n.opacity)}function cn(n,t,e,i){return 1===arguments.length?un(n):new dn(n,t,e,null==i?1:i)}function dn(n,t,e,i){this.h=+n,this.s=+t,this.l=+e,this.opacity=+i}function hn(n){return function(){return n}}function pn(n,t){return function(e){return n+e*t}}function fn(n,t,e){return n=Math.pow(n,e),t=Math.pow(t,e)-n,e=1/e,function(i){return Math.pow(n+i*t,e)}}function gn(n){return 1==(n=+n)?mn:function(t,e){return e-t?fn(t,e,n):hn(isNaN(t)?e:t)}}function mn(n,t){var e=t-n;return e?pn(n,e):hn(isNaN(n)?t:n)}function bn(n,t){t||(t=[]);var e,i=n?Math.min(t.length,n.length):0,r=t.slice();return function(o){for(e=0;e<i;++e)r[e]=n[e]*(1-o)+t[e]*o;return r}}function yn(n){return ArrayBuffer.isView(n)&&!(n instanceof DataView)}function vn(n,t){var e,i=t?t.length:0,r=n?Math.min(i,n.length):0,o=new Array(r),a=new Array(i);for(e=0;e<r;++e)o[e]=_n(n[e],t[e]);for(;e<i;++e)a[e]=t[e];return function(n){for(e=0;e<r;++e)a[e]=o[e](n);return a}}function wn(n,t){var e=new Date;return n=+n,t=+t,function(i){return e.setTime(n*(1-i)+t*i),e}}function xn(n,t){return n=+n,t=+t,function(e){return n*(1-e)+t*e}}function kn(n,t){var e,i={},r={};for(e in null!==n&&"object"==typeof n||(n={}),null!==t&&"object"==typeof t||(t={}),t)e in n?i[e]=_n(n[e],t[e]):r[e]=t[e];return function(n){for(e in i)r[e]=i[e](n);return r}}function Sn(n){return function(){return n}}function Mn(n){return function(t){return n(t)+""}}function Tn(n,t){var e,i,r,o=pa.lastIndex=fa.lastIndex=0,a=-1,s=[],l=[];for(n+="",t+="";(e=pa.exec(n))&&(i=fa.exec(t));)(r=i.index)>o&&(r=t.slice(o,r),s[a]?s[a]+=r:s[++a]=r),(e=e[0])===(i=i[0])?s[a]?s[a]+=i:s[++a]=i:(s[++a]=null,l.push({i:a,x:xn(e,i)})),o=fa.lastIndex;return o<t.length&&(r=t.slice(o),s[a]?s[a]+=r:s[++a]=r),s.length<2?l[0]?Mn(l[0].x):Sn(t):(t=l.length,function(n){for(var e,i=0;i<t;++i)s[(e=l[i]).i]=e.x(n);return s.join("")})}function _n(n,t){var e,i=typeof t;return null==t||"boolean"===i?hn(t):("number"===i?xn:"string"===i?(e=U(t))?(t=e,ha):Tn:t instanceof U?ha:t instanceof Date?wn:yn(t)?bn:Array.isArray(t)?vn:"function"!=typeof t.valueOf&&"function"!=typeof t.toString||isNaN(t)?kn:xn)(n,t)}function Cn(n,t){return n=+n,t=+t,function(e){return Math.round(n*(1-e)+t*e)}}function An(n){return function(){return n}}function En(n){return+n}function Nn(n){return n}function Ln(n,t){return(t-=n=+n)?function(e){return(e-n)/t}:An(isNaN(t)?NaN:.5)}function Dn(n,t){var e;return n>t&&(e=n,n=t,t=e),function(e){return Math.max(n,Math.min(t,e))}}function On(n,t,e){var i=n[0],r=n[1],o=t[0],a=t[1];return r<i?(i=Ln(r,i),o=e(a,o)):(i=Ln(i,r),o=e(o,a)),function(n){return o(i(n))}}function In(n,t,e){var i=Math.min(n.length,t.length)-1,r=new Array(i),o=new Array(i),a=-1;for(n[i]<n[0]&&(n=n.slice().reverse(),t=t.slice().reverse());++a<i;)r[a]=Ln(n[a],n[a+1]),o[a]=e(t[a],t[a+1]);return function(t){var e=No(n,t,1,i)-1;return o[e](r[e](t))}}function Fn(n,t){return t.domain(n.domain()).range(n.range()).interpolate(n.interpolate()).clamp(n.clamp()).unknown(n.unknown())}function Rn(){function n(){var n=Math.min(l.length,u.length);return d!==Nn&&(d=Dn(l[0],l[n-1])),o=n>2?In:On,a=s=null,t}function t(n){return isNaN(n=+n)?r:(a||(a=o(l.map(e),u,c)))(e(d(n)))}var e,i,r,o,a,s,l=ga,u=ga,c=_n,d=Nn;return t.invert=function(n){return d(i((s||(s=o(u,l.map(e),xn)))(n)))},t.domain=function(t){return arguments.length?(l=Array.from(t,En),n()):l.slice()},t.range=function(t){return arguments.length?(u=Array.from(t),n()):u.slice()},t.rangeRound=function(t){return u=Array.from(t),c=Cn,n()},t.clamp=function(t){return arguments.length?(d=!!t||Nn,n()):d!==Nn},t.interpolate=function(t){return arguments.length?(c=t,n()):c},t.unknown=function(n){return arguments.length?(r=n,t):r},function(t,r){return e=t,i=r,n()}}function Un(){return Rn()(Nn,Nn)}function $n(n,t){if((e=(n=t?n.toExponential(t-1):n.toExponential()).indexOf("e"))<0)return null;var e,i=n.slice(0,e);return[i.length>1?i[0]+i.slice(2):i,+n.slice(e+1)]}function Pn(n){return(n=$n(Math.abs(n)))?n[1]:NaN}function Hn(n,t){return function(e,i){for(var r=e.length,o=[],a=0,s=n[0],l=0;r>0&&s>0&&(l+s+1>i&&(s=Math.max(1,i-l)),o.push(e.substring(r-=s,r+s)),!((l+=s+1)>i));)s=n[a=(a+1)%n.length];return o.reverse().join(t)}}function zn(n){return function(t){return t.replace(/[0-9]/g,function(t){return n[+t]})}}function qn(n){if(!(t=ma.exec(n)))throw new Error("invalid format: "+n);var t;return new jn({fill:t[1],align:t[2],sign:t[3],symbol:t[4],zero:t[5],width:t[6],comma:t[7],precision:t[8]&&t[8].slice(1),trim:t[9],type:t[10]})}function jn(n){this.fill=n.fill===undefined?" ":n.fill+"",this.align=n.align===undefined?">":n.align+"",this.sign=n.sign===undefined?"-":n.sign+"",this.symbol=n.symbol===undefined?"":n.symbol+"",this.zero=!!n.zero,this.width=n.width===undefined?undefined:+n.width,this.comma=!!n.comma,this.precision=n.precision===undefined?undefined:+n.precision,this.trim=!!n.trim,this.type=n.type===undefined?"":n.type+""}function Bn(n){n:for(var t,e=n.length,i=1,r=-1;i<e;++i)switch(n[i]){case".":r=t=i;break;case"0":0===r&&(r=i),t=i;break;default:if(!+n[i])break n;r>0&&(r=0)}return r>0?n.slice(0,r)+n.slice(t+1):n}function Yn(n,t){var e=$n(n,t);if(!e)return n+"";var i=e[0],r=e[1],o=r-(da=3*Math.max(-8,Math.min(8,Math.floor(r/3))))+1,a=i.length;return o===a?i:o>a?i+new Array(o-a+1).join("0"):o>0?i.slice(0,o)+"."+i.slice(o):"0."+new Array(1-o).join("0")+$n(n,Math.max(0,t+o-1))[0]}function Wn(n,t){var e=$n(n,t);if(!e)return n+"";var i=e[0],r=e[1];return r<0?"0."+new Array(-r).join("0")+i:i.length>r+1?i.slice(0,r+1)+"."+i.slice(r+1):i+new Array(r-i.length+2).join("0")}function Gn(n){return n}function Vn(n){function t(n){function t(n){var t,r,o,l=w,p=x;if("c"===v)p=k(n)+p,n="";else{var M=(n=+n)<0||1/n<0;if(n=isNaN(n)?c:k(Math.abs(n),b),y&&(n=Bn(n)),M&&0==+n&&"+"!==h&&(M=!1),l=(M?"("===h?h:u:"-"===h||"("===h?"":h)+l,p=("s"===v?ka[8+da/3]:"")+p+(M&&"("===h?")":""),S)for(t=-1,r=n.length;++t<r;)if(48>(o=n.charCodeAt(t))||o>57){p=(46===o?a+n.slice(t+1):n.slice(t))+p,n=n.slice(0,t);break}}m&&!f&&(n=i(n,Infinity));var T=l.length+n.length+p.length,_=T<g?new Array(g-T+1).join(e):"";switch(m&&f&&(n=i(_+n,_.length?g-p.length:Infinity),_=""),d){case"<":n=l+n+p+_;break;case"=":n=l+_+n+p;break;case"^":n=_.slice(0,T=_.length>>1)+l+n+p+_.slice(T);break;default:n=_+l+n+p}return s(n)}var e=(n=qn(n)).fill,d=n.align,h=n.sign,p=n.symbol,f=n.zero,g=n.width,m=n.comma,b=n.precision,y=n.trim,v=n.type;"n"===v?(m=!0,v="g"):wa[v]||(b===undefined&&(b=12),y=!0,v="g"),(f||"0"===e&&"="===d)&&(f=!0,e="0",d="=");var w="$"===p?r:"#"===p&&/[boxX]/.test(v)?"0"+v.toLowerCase():"",x="$"===p?o:/[%p]/.test(v)?l:"",k=wa[v],S=/[defgprs%]/.test(v);return b=b===undefined?6:/[gprs]/.test(v)?Math.max(1,Math.min(21,b)):Math.max(0,Math.min(20,b)),t.toString=function(){return n+""},t}function e(n,e){var i=t(((n=qn(n)).type="f",n)),r=3*Math.max(-8,Math.min(8,Math.floor(Pn(e)/3))),o=Math.pow(10,-r),a=ka[8+r/3];return function(n){return i(o*n)+a}}var i=n.grouping===undefined||n.thousands===undefined?Gn:Hn(xa.call(n.grouping,Number),n.thousands+""),r=n.currency===undefined?"":n.currency[0]+"",o=n.currency===undefined?"":n.currency[1]+"",a=n.decimal===undefined?".":n.decimal+"",s=n.numerals===undefined?Gn:zn(xa.call(n.numerals,String)),l=n.percent===undefined?"%":n.percent+"",u=n.minus===undefined?"-":n.minus+"",c=n.nan===undefined?"NaN":n.nan+"";return{format:t,formatPrefix:e}}function Kn(n){return ba=Vn(n),ya=ba.format,va=ba.formatPrefix,ba}function Xn(n){return Math.max(0,-Pn(Math.abs(n)))}function Zn(n,t){return Math.max(0,3*Math.max(-8,Math.min(8,Math.floor(Pn(t)/3)))-Pn(Math.abs(n)))}function Qn(n,t){return n=Math.abs(n),t=Math.abs(t)-n,Math.max(0,Pn(t)-Pn(n))+1}function Jn(n,t,e,i){var r,o=E(n,t,e);switch((i=qn(null==i?",f":i)).type){case"s":var a=Math.max(Math.abs(n),Math.abs(t));return null!=i.precision||isNaN(r=Zn(o,a))||(i.precision=r),va(i,a);case"":case"e":case"g":case"p":case"r":null!=i.precision||isNaN(r=Qn(o,Math.max(Math.abs(n),Math.abs(t))))||(i.precision=r-("e"===i.type));break;case"f":case"%":null!=i.precision||isNaN(r=Xn(o))||(i.precision=r-2*("%"===i.type))}return ya(i)}function nt(n){var t=n.domain;return n.ticks=function(n){var e=t();return C(e[0],e[e.length-1],null==n?10:n)},n.tickFormat=function(n,e){var i=t();return Jn(i[0],i[i.length-1],null==n?10:n,e)},n.nice=function(e){null==e&&(e=10);var i,r=t(),o=0,a=r.length-1,s=r[o],l=r[a];return l<s&&(i=s,s=l,l=i,i=o,o=a,a=i),(i=A(s,l,e))>0?i=A(s=Math.floor(s/i)*i,l=Math.ceil(l/i)*i,e):i<0&&(i=A(s=Math.ceil(s*i)/i,l=Math.floor(l*i)/i,e)),i>0?(r[o]=Math.floor(s/i)*i,r[a]=Math.ceil(l/i)*i,t(r)):i<0&&(r[o]=Math.ceil(s*i)/i,r[a]=Math.floor(l*i)/i,t(r)),n},n}function tt(){var n=Un();return n.copy=function(){return Fn(n,tt())},N.apply(n,arguments),nt(n)}function et(n,t,e,i){function r(t){return n(t=0===arguments.length?new Date:new Date(+t)),t}return r.floor=function(t){return n(t=new Date(+t)),t},r.ceil=function(e){return n(e=new Date(e-1)),t(e,1),n(e),e},r.round=function(n){var t=r(n),e=r.ceil(n);return n-t<e-n?t:e},r.offset=function(n,e){return t(n=new Date(+n),null==e?1:Math.floor(e)),n},r.range=function(e,i,o){var a,s=[];if(e=r.ceil(e),o=null==o?1:Math.floor(o),!(e<i&&o>0))return s;do{s.push(a=new Date(+e)),t(e,o),n(e)}while(a<e&&e<i);return s},r.filter=function(e){return et(function(t){if(t>=t)for(;n(t),!e(t);)t.setTime(t-1)},function(n,i){if(n>=n)if(i<0)for(;++i<=0;)for(;t(n,-1),!e(n););else for(;--i>=0;)for(;t(n,1),!e(n););})},e&&(r.count=function(t,i){return Sa.setTime(+t),Ma.setTime(+i),n(Sa),n(Ma),Math.floor(e(Sa,Ma))},r.every=function(n){return n=Math.floor(n),isFinite(n)&&n>0?n>1?r.filter(i?function(t){return i(t)%n==0}:function(t){return r.count(0,t)%n==0}):r:null}),r}function it(n){return et(function(t){t.setDate(t.getDate()-(t.getDay()+7-n)%7),t.setHours(0,0,0,0)},function(n,t){n.setDate(n.getDate()+7*t)},function(n,t){return(t-n-(t.getTimezoneOffset()-n.getTimezoneOffset())*Ca)/Na})}function rt(n){return et(function(t){t.setUTCDate(t.getUTCDate()-(t.getUTCDay()+7-n)%7),t.setUTCHours(0,0,0,0)},function(n,t){n.setUTCDate(n.getUTCDate()+7*t)},function(n,t){return(t-n)/Na})}function ot(n){if(0<=n.y&&n.y<100){var t=new Date(-1,n.m,n.d,n.H,n.M,n.S,n.L);return t.setFullYear(n.y),t}return new Date(n.y,n.m,n.d,n.H,n.M,n.S,n.L)}function at(n){if(0<=n.y&&n.y<100){var t=new Date(Date.UTC(-1,n.m,n.d,n.H,n.M,n.S,n.L));return t.setUTCFullYear(n.y),t}return new Date(Date.UTC(n.y,n.m,n.d,n.H,n.M,n.S,n.L))}function st(n,t,e){return{y:n,m:t,d:e,H:0,M:0,S:0,L:0}}function lt(n){function t(n,t){return function(e){var i,r,o,a=[],s=-1,l=0,u=n.length;for(e instanceof Date||(e=new Date(+e));++s<u;)37===n.charCodeAt(s)&&(a.push(n.slice(l,s)),null!=(r=Ba[i=n.charAt(++s)])?i=n.charAt(++s):r="e"===i?" ":"0",(o=t[i])&&(i=o(e,r)),a.push(i),l=s+1);return a.push(n.slice(l,s)),a.join("")}}function e(n,t){return function(e){var r,o,a=st(1900,undefined,1);if(i(a,n,e+="",0)!=e.length)return null;if("Q"in a)return new Date(a.Q);if("s"in a)return new Date(1e3*a.s+("L"in a?a.L:0));if(!t||"Z"in a||(a.Z=0),"p"in a&&(a.H=a.H%12+12*a.p),a.m===undefined&&(a.m="q"in a?a.q:0),"V"in a){if(a.V<1||a.V>53)return null;"w"in a||(a.w=1),"Z"in a?(r=(o=(r=at(st(a.y,0,1))).getUTCDay())>4||0===o?$a.ceil(r):$a(r),r=Ra.offset(r,7*(a.V-1)),a.y=r.getUTCFullYear(),a.m=r.getUTCMonth(),a.d=r.getUTCDate()+(a.w+6)%7):(r=(o=(r=ot(st(a.y,0,1))).getDay())>4||0===o?Oa.ceil(r):Oa(r),r=La.offset(r,7*(a.V-1)),a.y=r.getFullYear(),a.m=r.getMonth(),a.d=r.getDate()+(a.w+6)%7)}else("W"in a||"U"in a)&&("w"in a||(a.w="u"in a?a.u%7:"W"in a?1:0),o="Z"in a?at(st(a.y,0,1)).getUTCDay():ot(st(a.y,0,1)).getDay(),a.m=0,a.d="W"in a?(a.w+6)%7+7*a.W-(o+5)%7:a.w+7*a.U-(o+6)%7);return"Z"in a?(a.H+=a.Z/100|0,a.M+=a.Z%100,at(a)):ot(a)}}function i(n,t,e,i){for(var r,o,a=0,s=t.length,l=e.length;a<s;){if(i>=l)return-1;if(37===(r=t.charCodeAt(a++))){if(r=t.charAt(a++),!(o=B[r in Ba?t.charAt(a++):r])||(i=o(n,e,i))<0)return-1}else if(r!=e.charCodeAt(i++))return-1}return i}function r(n,t,e){var i=D.exec(t.slice(e));return i?(n.p=O[i[0].toLowerCase()],e+i[0].length):-1}function o(n,t,e){var i=R.exec(t.slice(e));return i?(n.w=U[i[0].toLowerCase()],e+i[0].length):-1}function a(n,t,e){var i=I.exec(t.slice(e));return i?(n.w=F[i[0].toLowerCase()],e+i[0].length):-1}function s(n,t,e){var i=H.exec(t.slice(e));return i?(n.m=z[i[0].toLowerCase()],e+i[0].length):-1}function l(n,t,e){var i=$.exec(t.slice(e));return i?(n.m=P[i[0].toLowerCase()],e+i[0].length):-1}function u(n,t,e){return i(n,M,t,e)}function c(n,t,e){return i(n,T,t,e)}function d(n,t,e){return i(n,_,t,e)}function h(n){return E[n.getDay()]}function p(n){return A[n.getDay()]}function f(n){return L[n.getMonth()]}function g(n){return N[n.getMonth()]}function m(n){return C[+(n.getHours()>=12)]}function b(n){return 1+~~(n.getMonth()/3)}function y(n){return E[n.getUTCDay()]}function v(n){return A[n.getUTCDay()]}function w(n){return L[n.getUTCMonth()]}function x(n){return N[n.getUTCMonth()]}function k(n){return C[+(n.getUTCHours()>=12)]}function S(n){return 1+~~(n.getUTCMonth()/3)}var M=n.dateTime,T=n.date,_=n.time,C=n.periods,A=n.days,E=n.shortDays,N=n.months,L=n.shortMonths,D=dt(C),O=ht(C),I=dt(A),F=ht(A),R=dt(E),U=ht(E),$=dt(N),P=ht(N),H=dt(L),z=ht(L),q={a:h,A:p,b:f,B:g,c:null,d:Ot,e:Ot,f:$t,H:It,I:Ft,j:Rt,L:Ut,m:Pt,M:Ht,p:m,q:b,Q:fe,s:ge,S:zt,u:qt,U:jt,V:Bt,w:Yt,W:Wt,x:null,X:null,y:Gt,Y:Vt,Z:Kt,"%":pe},j={a:y,A:v,b:w,B:x,c:null,d:Xt,e:Xt,f:te,H:Zt,I:Qt,j:Jt,L:ne,m:ee,M:ie,p:k,q:S,Q:fe,s:ge,S:re,u:oe,U:ae,V:se,w:le,W:ue,x:null,X:null,y:ce,Y:de,Z:he,"%":pe},B={a:o,A:a,b:s,B:l,c:u,d:St,e:St,f:Et,H:Tt,I:Tt,j:Mt,L:At,m:kt,M:_t,p:r,q:xt,Q:Lt,s:Dt,S:Ct,u:ft,U:gt,V:mt,w:pt,W:bt,x:c,X:d,y:vt,Y:yt,Z:wt,"%":Nt};return q.x=t(T,q),q.X=t(_,q),q.c=t(M,q),j.x=t(T,j),j.X=t(_,j),j.c=t(M,j),{format:function(n){var e=t(n+="",q);return e.toString=function(){return n},e},parse:function(n){var t=e(n+="",!1);return t.toString=function(){return n},t},utcFormat:function(n){var e=t(n+="",j);return e.toString=function(){return n},e},utcParse:function(n){var t=e(n+="",!0);return t.toString=function(){return n},t}}}function ut(n,t,e){var i=n<0?"-":"",r=(i?-n:n)+"",o=r.length;return i+(o<e?new Array(e-o+1).join(t)+r:r)}function ct(n){return n.replace(Ga,"\\$&")}function dt(n){return new RegExp("^(?:"+n.map(ct).join("|")+")","i")}function ht(n){for(var t={},e=-1,i=n.length;++e<i;)t[n[e].toLowerCase()]=e;return t}function pt(n,t,e){var i=Ya.exec(t.slice(e,e+1));return i?(n.w=+i[0],e+i[0].length):-1}function ft(n,t,e){var i=Ya.exec(t.slice(e,e+1));return i?(n.u=+i[0],e+i[0].length):-1}function gt(n,t,e){var i=Ya.exec(t.slice(e,e+2));return i?(n.U=+i[0],e+i[0].length):-1}function mt(n,t,e){var i=Ya.exec(t.slice(e,e+2));return i?(n.V=+i[0],e+i[0].length):-1}function bt(n,t,e){var i=Ya.exec(t.slice(e,e+2));return i?(n.W=+i[0],e+i[0].length):-1}function yt(n,t,e){var i=Ya.exec(t.slice(e,e+4));return i?(n.y=+i[0],e+i[0].length):-1}function vt(n,t,e){var i=Ya.exec(t.slice(e,e+2));return i?(n.y=+i[0]+(+i[0]>68?1900:2e3),e+i[0].length):-1}function wt(n,t,e){var i=/^(Z)|([+-]\d\d)(?::?(\d\d))?/.exec(t.slice(e,e+6));return i?(n.Z=i[1]?0:-(i[2]+(i[3]||"00")),e+i[0].length):-1}function xt(n,t,e){var i=Ya.exec(t.slice(e,e+1));return i?(n.q=3*i[0]-3,e+i[0].length):-1}function kt(n,t,e){var i=Ya.exec(t.slice(e,e+2));return i?(n.m=i[0]-1,e+i[0].length):-1}function St(n,t,e){var i=Ya.exec(t.slice(e,e+2));return i?(n.d=+i[0],e+i[0].length):-1}function Mt(n,t,e){var i=Ya.exec(t.slice(e,e+3));return i?(n.m=0,n.d=+i[0],e+i[0].length):-1}function Tt(n,t,e){var i=Ya.exec(t.slice(e,e+2));return i?(n.H=+i[0],e+i[0].length):-1}function _t(n,t,e){var i=Ya.exec(t.slice(e,e+2));return i?(n.M=+i[0],e+i[0].length):-1}function Ct(n,t,e){var i=Ya.exec(t.slice(e,e+2));return i?(n.S=+i[0],e+i[0].length):-1}function At(n,t,e){var i=Ya.exec(t.slice(e,e+3));return i?(n.L=+i[0],e+i[0].length):-1}function Et(n,t,e){var i=Ya.exec(t.slice(e,e+6));return i?(n.L=Math.floor(i[0]/1e3),e+i[0].length):-1}function Nt(n,t,e){var i=Wa.exec(t.slice(e,e+1));return i?e+i[0].length:-1}function Lt(n,t,e){var i=Ya.exec(t.slice(e));return i?(n.Q=+i[0],e+i[0].length):-1}function Dt(n,t,e){var i=Ya.exec(t.slice(e));return i?(n.s=+i[0],e+i[0].length):-1}function Ot(n,t){return ut(n.getDate(),t,2)}function It(n,t){return ut(n.getHours(),t,2)}function Ft(n,t){return ut(n.getHours()%12||12,t,2)}function Rt(n,t){return ut(1+La.count(Fa(n),n),t,3)}function Ut(n,t){return ut(n.getMilliseconds(),t,3)}function $t(n,t){return Ut(n,t)+"000"}function Pt(n,t){return ut(n.getMonth()+1,t,2)}function Ht(n,t){return ut(n.getMinutes(),t,2)}function zt(n,t){return ut(n.getSeconds(),t,2)}function qt(n){var t=n.getDay();return 0===t?7:t}function jt(n,t){return ut(Da.count(Fa(n)-1,n),t,2)}function Bt(n,t){var e=n.getDay();return n=e>=4||0===e?Ia(n):Ia.ceil(n),ut(Ia.count(Fa(n),n)+(4===Fa(n).getDay()),t,2)}function Yt(n){return n.getDay()}function Wt(n,t){return ut(Oa.count(Fa(n)-1,n),t,2)}function Gt(n,t){return ut(n.getFullYear()%100,t,2)}function Vt(n,t){return ut(n.getFullYear()%1e4,t,4)}function Kt(n){var t=n.getTimezoneOffset();return(t>0?"-":(t*=-1,"+"))+ut(t/60|0,"0",2)+ut(t%60,"0",2)}function Xt(n,t){return ut(n.getUTCDate(),t,2)}function Zt(n,t){return ut(n.getUTCHours(),t,2)}function Qt(n,t){return ut(n.getUTCHours()%12||12,t,2)}function Jt(n,t){return ut(1+Ra.count(Ha(n),n),t,3)}function ne(n,t){return ut(n.getUTCMilliseconds(),t,3)}function te(n,t){return ne(n,t)+"000"}function ee(n,t){return ut(n.getUTCMonth()+1,t,2)}function ie(n,t){return ut(n.getUTCMinutes(),t,2)}function re(n,t){return ut(n.getUTCSeconds(),t,2)}function oe(n){var t=n.getUTCDay();return 0===t?7:t}function ae(n,t){return ut(Ua.count(Ha(n)-1,n),t,2)}function se(n,t){var e=n.getUTCDay();return n=e>=4||0===e?Pa(n):Pa.ceil(n),ut(Pa.count(Ha(n),n)+(4===Ha(n).getUTCDay()),t,2)}function le(n){return n.getUTCDay()}function ue(n,t){return ut($a.count(Ha(n)-1,n),t,2)}function ce(n,t){return ut(n.getUTCFullYear()%100,t,2)}function de(n,t){return ut(n.getUTCFullYear()%1e4,t,4)}function he(){return"+0000"}function pe(){return"%"}function fe(n){return+n}function ge(n){return Math.floor(+n/1e3)}function me(n){return za=lt(n),za.format,za.parse,qa=za.utcFormat,ja=za.utcParse,za}function be(n){return n.toISOString()}function ye(n){var t=new Date(n);return isNaN(t)?null:t}function ve(){for(var n,t=0,e=arguments.length,i={};t<e;++t){if(!(n=arguments[t]+"")||n in i||/[\s.]/.test(n))throw new Error("illegal type: "+n);i[n]=[]}return new we(i)}function we(n){this._=n}function xe(n,t){return n.trim().split(/^|\s+/).map(function(n){var e="",i=n.indexOf(".");if(i>=0&&(e=n.slice(i+1),n=n.slice(0,i)),n&&!t.hasOwnProperty(n))throw new Error("unknown type: "+n);return{type:n,name:e}})}function ke(n,t){for(var e,i=0,r=n.length;i<r;++i)if((e=n[i]).name===t)return e.value}function Se(n,t,e){for(var i=0,r=n.length;i<r;++i)if(n[i].name===t){n[i]=Ka,n=n.slice(0,i).concat(n.slice(i+1));break}return null!=e&&n.push({name:t,value:e}),n}function Me(n){var t=n+="",e=t.indexOf(":");return e>=0&&"xmlns"!==(t=n.slice(0,e))&&(n=n.slice(e+1)),Za.hasOwnProperty(t)?{space:Za[t],local:n}:n}function Te(n){return function(){var t=this.ownerDocument,e=this.namespaceURI;return e===Xa&&t.documentElement.namespaceURI===Xa?t.createElement(n):t.createElementNS(e,n)}}function _e(n){return function(){return this.ownerDocument.createElementNS(n.space,n.local)}}function Ce(n){var t=Me(n);return(t.local?_e:Te)(t)}function Ae(){}function Ee(n){return null==n?Ae:function(){return this.querySelector(n)}}function Ne(n){"function"!=typeof n&&(n=Ee(n));for(var t=this._groups,e=t.length,i=new Array(e),r=0;r<e;++r)for(var o,a,s=t[r],l=s.length,u=i[r]=new Array(l),c=0;c<l;++c)(o=s[c])&&(a=n.call(o,o.__data__,c,s))&&("__data__"in o&&(a.__data__=o.__data__),u[c]=a);return new or(i,this._parents)}function Le(){return[]}function De(n){return null==n?Le:function(){return this.querySelectorAll(n)}}function Oe(n){"function"!=typeof n&&(n=De(n));for(var t=this._groups,e=t.length,i=[],r=[],o=0;o<e;++o)for(var a,s=t[o],l=s.length,u=0;u<l;++u)(a=s[u])&&(i.push(n.call(a,a.__data__,u,s)),r.push(a));return new or(i,r)}function Ie(n){return function(){return this.matches(n)}}function Fe(n){"function"!=typeof n&&(n=Ie(n));for(var t=this._groups,e=t.length,i=new Array(e),r=0;r<e;++r)for(var o,a=t[r],s=a.length,l=i[r]=[],u=0;u<s;++u)(o=a[u])&&n.call(o,o.__data__,u,a)&&l.push(o);return new or(i,this._parents)}function Re(n){return new Array(n.length)}function Ue(){return new or(this._enter||this._groups.map(Re),this._parents)}function $e(n,t){this.ownerDocument=n.ownerDocument,this.namespaceURI=n.namespaceURI,this._next=null,this._parent=n,this.__data__=t}function Pe(n){return function(){return n}}function He(n,t,e,i,r,o){for(var a,s=0,l=t.length,u=o.length;s<u;++s)(a=t[s])?(a.__data__=o[s],i[s]=a):e[s]=new $e(n,o[s]);for(;s<l;++s)(a=t[s])&&(r[s]=a)}function ze(n,t,e,i,r,o,a){var s,l,u,c={},d=t.length,h=o.length,p=new Array(d);for(s=0;s<d;++s)(l=t[s])&&(p[s]=u=Qa+a.call(l,l.__data__,s,t),u in c?r[s]=l:c[u]=l);for(s=0;s<h;++s)(l=c[u=Qa+a.call(n,o[s],s,o)])?(i[s]=l,l.__data__=o[s],c[u]=null):e[s]=new $e(n,o[s]);for(s=0;s<d;++s)(l=t[s])&&c[p[s]]===l&&(r[s]=l)}function qe(n,t){if(!n)return p=new Array(this.size()),u=-1,this.each(function(n){p[++u]=n}),p;var e=t?ze:He,i=this._parents,r=this._groups;"function"!=typeof n&&(n=Pe(n));for(var o=r.length,a=new Array(o),s=new Array(o),l=new Array(o),u=0;u<o;++u){var c=i[u],d=r[u],h=d.length,p=n.call(c,c&&c.__data__,u,i),f=p.length,g=s[u]=new Array(f),m=a[u]=new Array(f);e(c,d,g,m,l[u]=new Array(h),p,t);for(var b,y,v=0,w=0;v<f;++v)if(b=g[v]){for(v>=w&&(w=v+1);!(y=m[w])&&++w<f;);b._next=y||null}}return(a=new or(a,i))._enter=s,a._exit=l,a}function je(){return new or(this._exit||this._groups.map(Re),this._parents)}function Be(n,t,e){var i=this.enter(),r=this,o=this.exit();return i="function"==typeof n?n(i):i.append(n+""),null!=t&&(r=t(r)),null==e?o.remove():e(o),i&&r?i.merge(r).order():r}function Ye(n){for(var t=this._groups,e=n._groups,i=t.length,r=e.length,o=Math.min(i,r),a=new Array(i),s=0;s<o;++s)for(var l,u=t[s],c=e[s],d=u.length,h=a[s]=new Array(d),p=0;p<d;++p)(l=u[p]||c[p])&&(h[p]=l);for(;s<i;++s)a[s]=t[s];return new or(a,this._parents)}function We(){for(var n=this._groups,t=-1,e=n.length;++t<e;)for(var i,r=n[t],o=r.length-1,a=r[o];--o>=0;)(i=r[o])&&(a&&4^i.compareDocumentPosition(a)&&a.parentNode.insertBefore(i,a),a=i);return this}function Ge(n){function t(t,e){return t&&e?n(t.__data__,e.__data__):!t-!e}n||(n=Ve);for(var e=this._groups,i=e.length,r=new Array(i),o=0;o<i;++o){for(var a,s=e[o],l=s.length,u=r[o]=new Array(l),c=0;c<l;++c)(a=s[c])&&(u[c]=a);u.sort(t)}return new or(r,this._parents).order()}function Ve(n,t){return n<t?-1:n>t?1:n>=t?0:NaN}function Ke(){var n=arguments[0];return arguments[0]=this,n.apply(null,arguments),this}function Xe(){var n=new Array(this.size()),t=-1;return this.each(function(){n[++t]=this}),n}function Ze(){for(var n=this._groups,t=0,e=n.length;t<e;++t)for(var i=n[t],r=0,o=i.length;r<o;++r){var a=i[r];if(a)return a}return null}function Qe(){var n=0;return this.each(function(){++n}),n}function Je(){return!this.node()}function ni(n){for(var t=this._groups,e=0,i=t.length;e<i;++e)for(var r,o=t[e],a=0,s=o.length;a<s;++a)(r=o[a])&&n.call(r,r.__data__,a,o);return this}function ti(n){return function(){this.removeAttribute(n)}}function ei(n){return function(){this.removeAttributeNS(n.space,n.local)}}function ii(n,t){return function(){this.setAttribute(n,t)}}function ri(n,t){return function(){this.setAttributeNS(n.space,n.local,t)}}function oi(n,t){return function(){var e=t.apply(this,arguments);null==e?this.removeAttribute(n):this.setAttribute(n,e)}}function ai(n,t){return function(){var e=t.apply(this,arguments);null==e?this.removeAttributeNS(n.space,n.local):this.setAttributeNS(n.space,n.local,e)}}function si(n,t){var e=Me(n);if(arguments.length<2){var i=this.node();return e.local?i.getAttributeNS(e.space,e.local):i.getAttribute(e)}return this.each((null==t?e.local?ei:ti:"function"==typeof t?e.local?ai:oi:e.local?ri:ii)(e,t))}function li(n){return n.ownerDocument&&n.ownerDocument.defaultView||n.document&&n||n.defaultView}function ui(n){return function(){this.style.removeProperty(n)}}function ci(n,t,e){return function(){this.style.setProperty(n,t,e)}}function di(n,t,e){return function(){var i=t.apply(this,arguments);null==i?this.style.removeProperty(n):this.style.setProperty(n,i,e)}}function hi(n,t,e){return arguments.length>1?this.each((null==t?ui:"function"==typeof t?di:ci)(n,t,null==e?"":e)):pi(this.node(),n)}function pi(n,t){return n.style.getPropertyValue(t)||li(n).getComputedStyle(n,null).getPropertyValue(t)}function fi(n){return function(){delete this[n]}}function gi(n,t){return function(){this[n]=t}}function mi(n,t){return function(){var e=t.apply(this,arguments);null==e?delete this[n]:this[n]=e}}function bi(n,t){return arguments.length>1?this.each((null==t?fi:"function"==typeof t?mi:gi)(n,t)):this.node()[n]}function yi(n){return n.trim().split(/^|\s+/)}function vi(n){return n.classList||new wi(n)}function wi(n){this._node=n,this._names=yi(n.getAttribute("class")||"")}function xi(n,t){for(var e=vi(n),i=-1,r=t.length;++i<r;)e.add(t[i])}function ki(n,t){for(var e=vi(n),i=-1,r=t.length;++i<r;)e.remove(t[i])}function Si(n){return function(){xi(this,n)}}function Mi(n){return function(){ki(this,n)}}function Ti(n,t){return function(){(t.apply(this,arguments)?xi:ki)(this,n)}}function _i(n,t){var e=yi(n+"");if(arguments.length<2){for(var i=vi(this.node()),r=-1,o=e.length;++r<o;)if(!i.contains(e[r]))return!1;return!0}return this.each(("function"==typeof t?Ti:t?Si:Mi)(e,t))}function Ci(){this.textContent=""}function Ai(n){return function(){this.textContent=n}}function Ei(n){return function(){var t=n.apply(this,arguments);this.textContent=null==t?"":t}}function Ni(n){return arguments.length?this.each(null==n?Ci:("function"==typeof n?Ei:Ai)(n)):this.node().textContent}function Li(){this.innerHTML=""}function Di(n){return function(){this.innerHTML=n}}function Oi(n){return function(){var t=n.apply(this,arguments);this.innerHTML=null==t?"":t}}function Ii(n){return arguments.length?this.each(null==n?Li:("function"==typeof n?Oi:Di)(n)):this.node().innerHTML}function Fi(){this.nextSibling&&this.parentNode.appendChild(this)}function Ri(){return this.each(Fi)}function Ui(){this.previousSibling&&this.parentNode.insertBefore(this,this.parentNode.firstChild)}function $i(){return this.each(Ui)}function Pi(n){var t="function"==typeof n?n:Ce(n);return this.select(function(){return this.appendChild(t.apply(this,arguments))})}function Hi(){return null}function zi(n,t){var e="function"==typeof n?n:Ce(n),i=null==t?Hi:"function"==typeof t?t:Ee(t);return this.select(function(){return this.insertBefore(e.apply(this,arguments),i.apply(this,arguments)||null)})}function qi(){var n=this.parentNode;n&&n.removeChild(this)}function ji(){return this.each(qi)}function Bi(){var n=this.cloneNode(!1),t=this.parentNode;return t?t.insertBefore(n,this.nextSibling):n}function Yi(){var n=this.cloneNode(!0),t=this.parentNode;return t?t.insertBefore(n,this.nextSibling):n}function Wi(n){return this.select(n?Yi:Bi)}function Gi(n){return arguments.length?this.property("__data__",n):this.node().__data__}function Vi(n,t,e){return n=Ki(n,t,e),function(t){var e=t.relatedTarget;e&&(e===this||8&e.compareDocumentPosition(this))||n.call(this,t)}}function Ki(n,t,e){return function(i){var r=ns;ns=i;try{
n.call(this,this.__data__,t,e)}finally{ns=r}}}function Xi(n){return n.trim().split(/^|\s+/).map(function(n){var t="",e=n.indexOf(".");return e>=0&&(t=n.slice(e+1),n=n.slice(0,e)),{type:n,name:t}})}function Zi(n){return function(){var t=this.__on;if(t){for(var e,i=0,r=-1,o=t.length;i<o;++i)e=t[i],n.type&&e.type!==n.type||e.name!==n.name?t[++r]=e:this.removeEventListener(e.type,e.listener,e.capture);++r?t.length=r:delete this.__on}}}function Qi(n,t,e){var i=Ja.hasOwnProperty(n.type)?Vi:Ki;return function(r,o,a){var s,l=this.__on,u=i(t,o,a);if(l)for(var c=0,d=l.length;c<d;++c)if((s=l[c]).type===n.type&&s.name===n.name)return this.removeEventListener(s.type,s.listener,s.capture),this.addEventListener(s.type,s.listener=u,s.capture=e),void(s.value=t);this.addEventListener(n.type,u,e),s={type:n.type,name:n.name,value:t,listener:u,capture:e},l?l.push(s):this.__on=[s]}}function Ji(n,t,e){var i,r,o=Xi(n+""),a=o.length;if(!(arguments.length<2)){for(s=t?Qi:Zi,null==e&&(e=!1),i=0;i<a;++i)this.each(s(o[i],t,e));return this}var s=this.node().__on;if(s)for(var l,u=0,c=s.length;u<c;++u)for(i=0,l=s[u];i<a;++i)if((r=o[i]).type===l.type&&r.name===l.name)return l.value}function nr(n,t,e,i){var r=ns;n.sourceEvent=ns,ns=n;try{return t.apply(e,i)}finally{ns=r}}function tr(n,t,e){var i=li(n),r=i.CustomEvent;"function"==typeof r?r=new r(t,e):(r=i.document.createEvent("Event"),e?(r.initEvent(t,e.bubbles,e.cancelable),r.detail=e.detail):r.initEvent(t,!1,!1)),n.dispatchEvent(r)}function er(n,t){return function(){return tr(this,n,t)}}function ir(n,t){return function(){return tr(this,n,t.apply(this,arguments))}}function rr(n,t){return this.each(("function"==typeof t?ir:er)(n,t))}function or(n,t){this._groups=n,this._parents=t}function ar(){return new or([[document.documentElement]],ts)}function sr(n){return"string"==typeof n?new or([[document.querySelector(n)]],[document.documentElement]):new or([[n]],ts)}function lr(){for(var n,t=ns;n=t.sourceEvent;)t=n;return t}function ur(n,t){var e=n.ownerSVGElement||n;if(e.createSVGPoint){var i=e.createSVGPoint();return i.x=t.clientX,i.y=t.clientY,[(i=i.matrixTransform(n.getScreenCTM().inverse())).x,i.y]}var r=n.getBoundingClientRect();return[t.clientX-r.left-n.clientLeft,t.clientY-r.top-n.clientTop]}function cr(n){var t=lr();return t.changedTouches&&(t=t.changedTouches[0]),ur(n,t)}function dr(n,t,e){arguments.length<3&&(e=t,t=lr().changedTouches);for(var i,r=0,o=t?t.length:0;r<o;++r)if((i=t[r]).identifier===e)return ur(n,i);return null}function hr(){ns.stopImmediatePropagation()}function pr(){ns.preventDefault(),ns.stopImmediatePropagation()}function fr(n){var t=n.document.documentElement,e=sr(n).on("dragstart.drag",pr,!0);"onselectstart"in t?e.on("selectstart.drag",pr,!0):(t.__noselect=t.style.MozUserSelect,t.style.MozUserSelect="none")}function gr(n,t){var e=n.document.documentElement,i=sr(n).on("dragstart.drag",null);t&&(i.on("click.drag",pr,!0),setTimeout(function(){i.on("click.drag",null)},0)),"onselectstart"in e?i.on("selectstart.drag",null):(e.style.MozUserSelect=e.__noselect,delete e.__noselect)}function mr(n){return function(){return n}}function br(n,t,e,i,r,o,a,s,l,u){this.target=n,this.type=t,this.subject=e,this.identifier=i,this.active=r,this.x=o,this.y=a,this.dx=s,this.dy=l,this._=u}function yr(){return!ns.ctrlKey&&!ns.button}function vr(){return this.parentNode}function wr(n){return null==n?{x:ns.x,y:ns.y}:n}function xr(){return navigator.maxTouchPoints||"ontouchstart"in this}function kr(){function n(n){n.on("mousedown.drag",t).filter(g).on("touchstart.drag",r).on("touchmove.drag",o).on("touchend.drag touchcancel.drag",a).style("touch-action","none").style("-webkit-tap-highlight-color","rgba(0,0,0,0)")}function t(){if(!d&&h.apply(this,arguments)){var n=s("mouse",p.apply(this,arguments),cr,this,arguments);n&&(sr(ns.view).on("mousemove.drag",e,!0).on("mouseup.drag",i,!0),fr(ns.view),hr(),c=!1,l=ns.clientX,u=ns.clientY,n("start"))}}function e(){if(pr(),!c){var n=ns.clientX-l,t=ns.clientY-u;c=n*n+t*t>v}m.mouse("drag")}function i(){sr(ns.view).on("mousemove.drag mouseup.drag",null),gr(ns.view,c),pr(),m.mouse("end")}function r(){if(h.apply(this,arguments)){var n,t,e=ns.changedTouches,i=p.apply(this,arguments),r=e.length;for(n=0;n<r;++n)(t=s(e[n].identifier,i,dr,this,arguments))&&(hr(),t("start"))}}function o(){var n,t,e=ns.changedTouches,i=e.length;for(n=0;n<i;++n)(t=m[e[n].identifier])&&(pr(),t("drag"))}function a(){var n,t,e=ns.changedTouches,i=e.length;for(d&&clearTimeout(d),d=setTimeout(function(){d=null},500),n=0;n<i;++n)(t=m[e[n].identifier])&&(hr(),t("end"))}function s(t,e,i,r,o){var a,s,l,u=i(e,t),c=b.copy();if(nr(new br(n,"beforestart",a,t,y,u[0],u[1],0,0,c),function(){return null!=(ns.subject=a=f.apply(r,o))&&(s=a.x-u[0]||0,l=a.y-u[1]||0,!0)}))return function d(h){var p,f=u;switch(h){case"start":m[t]=d,p=y++;break;case"end":delete m[t],--y;case"drag":u=i(e,t),p=y}nr(new br(n,h,a,t,p,u[0]+s,u[1]+l,u[0]-f[0],u[1]-f[1],c),c.apply,c,[h,r,o])}}var l,u,c,d,h=yr,p=vr,f=wr,g=xr,m={},b=ve("start","drag","end"),y=0,v=0;return n.filter=function(t){return arguments.length?(h="function"==typeof t?t:mr(!!t),n):h},n.container=function(t){return arguments.length?(p="function"==typeof t?t:mr(t),n):p},n.subject=function(t){return arguments.length?(f="function"==typeof t?t:mr(t),n):f},n.touchable=function(t){return arguments.length?(g="function"==typeof t?t:mr(!!t),n):g},n.on=function(){var t=b.on.apply(b,arguments);return t===b?n:t},n.clickDistance=function(t){return arguments.length?(v=(t=+t)*t,n):Math.sqrt(v)},n}
// Copyright 2018 The Distill Template Authors
function Sr(n){let t=ls;"undefined"!=typeof n.githubUrl&&(t+='\n    <h3 id="updates-and-corrections">Updates and Corrections</h3>\n    <p>',n.githubCompareUpdatesUrl&&(t+=`<a href="${n.githubCompareUpdatesUrl}">View all changes</a> to this article since it was first published.`),t+=`\n    If you see mistakes or want to suggest changes, please <a href="${n.githubUrl+"/issues/new"}">create an issue on GitHub</a>. </p>\n    `);const e=n.journal;return void 0!==e&&"Distill"===e.title&&(t+=`\n    <h3 id="reuse">Reuse</h3>\n    <p>Diagrams and text are licensed under Creative Commons Attribution <a href="https://creativecommons.org/licenses/by/4.0/">CC-BY 4.0</a> with the <a class="github" href="${n.githubUrl}">source available on GitHub</a>, unless noted otherwise. The figures that have been reused from other sources don\u2019t fall under this license and can be recognized by a note in their caption: \u201cFigure from \u2026\u201d.</p>\n    `),"undefined"!=typeof n.publishedDate&&(t+=`\n    <h3 id="citation">Citation</h3>\n    <p>For attribution in academic contexts, please cite this work as</p>\n    <pre class="citation short">${n.concatenatedAuthors}, "${n.title}", Distill, ${n.publishedYear}.</pre>\n    <p>BibTeX citation</p>\n    <pre class="citation long">${v(n)}</pre>\n    `),t}const Mr=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],Tr=["Jan.","Feb.","March","April","May","June","July","Aug.","Sept.","Oct.","Nov.","Dec."],_r=n=>n<10?"0"+n:n,Cr=function(n){return`${Mr[n.getDay()].substring(0,3)}, ${_r(n.getDate())} ${Tr[n.getMonth()].substring(0,3)} ${n.getFullYear().toString()} ${n.getUTCHours().toString()}:${n.getUTCMinutes().toString()}:${n.getUTCSeconds().toString()} Z`},Ar=function(n){return Array.from(n).reduce((n,[t,e])=>Object.assign(n,{[t]:e}),{})},Er=function(n){const t=new Map;for(var e in n)n.hasOwnProperty(e)&&t.set(e,n[e]);return t};class Nr{constructor(n){this.name=n.author,this.personalURL=n.authorURL,this.affiliation=n.affiliation,this.affiliationURL=n.affiliationURL,this.affiliations=n.affiliations||[]}get firstName(){const n=this.name.split(" ");return n.slice(0,n.length-1).join(" ")}get lastName(){const n=this.name.split(" ");return n[n.length-1]}}class Lr{constructor(){this.title="unnamed article",this.description="",this.authors=[],this.bibliography=new Map,this.bibliographyParsed=!1,this.citations=[],this.citationsCollected=!1,this.journal={},this.katex={},this.doi=undefined,this.publishedDate=undefined}set url(n){this._url=n}get url(){return this._url?this._url:this.distillPath&&this.journal.url?this.journal.url+"/"+this.distillPath:this.journal.url?this.journal.url:void 0}get githubUrl(){return this.githubPath?"https://github.com/"+this.githubPath:undefined}set previewURL(n){this._previewURL=n}get previewURL(){return this._previewURL?this._previewURL:this.url+"/thumbnail.jpg"}get publishedDateRFC(){return Cr(this.publishedDate)}get updatedDateRFC(){return Cr(this.updatedDate)}get publishedYear(){return this.publishedDate.getFullYear()}get publishedMonth(){return Tr[this.publishedDate.getMonth()]}get publishedDay(){return this.publishedDate.getDate()}get publishedMonthPadded(){return _r(this.publishedDate.getMonth()+1)}get publishedDayPadded(){return _r(this.publishedDate.getDate())}get publishedISODateOnly(){return this.publishedDate.toISOString().split("T")[0]}get volume(){const n=this.publishedYear-2015;if(n<1)throw new Error("Invalid publish date detected during computing volume");return n}get issue(){return this.publishedDate.getMonth()+1}get concatenatedAuthors(){return this.authors.length>2?this.authors[0].lastName+", et al.":2===this.authors.length?this.authors[0].lastName+" & "+this.authors[1].lastName:1===this.authors.length?this.authors[0].lastName:void 0}get bibtexAuthors(){return this.authors.map(n=>n.lastName+", "+n.firstName).join(" and ")}get slug(){let n="";return this.authors.length&&(n+=this.authors[0].lastName.toLowerCase(),n+=this.publishedYear,n+=this.title.split(" ")[0].toLowerCase()),n||"Untitled"}get bibliographyEntries(){return new Map(this.citations.map(n=>{return[n,this.bibliography.get(n)]}))}set bibliography(n){n instanceof Map?this._bibliography=n:"object"==typeof n&&(this._bibliography=Er(n))}get bibliography(){return this._bibliography}static fromObject(n){const t=new Lr;return Object.assign(t,n),t}assignToObject(n){Object.assign(n,this),n.bibliography=Ar(this.bibliographyEntries),n.url=this.url,n.doi=this.doi,n.githubUrl=this.githubUrl,n.previewURL=this.previewURL,this.publishedDate&&(n.volume=this.volume,n.issue=this.issue,n.publishedDateRFC=this.publishedDateRFC,n.publishedYear=this.publishedYear,n.publishedMonth=this.publishedMonth,n.publishedDay=this.publishedDay,n.publishedMonthPadded=this.publishedMonthPadded,n.publishedDayPadded=this.publishedDayPadded),this.updatedDate&&(n.updatedDateRFC=this.updatedDateRFC),n.concatenatedAuthors=this.concatenatedAuthors,n.bibtexAuthors=this.bibtexAuthors,n.slug=this.slug}}
// Copyright 2018 The Distill Template Authors
const Dr=n=>(class extends n{constructor(){super();const n={childList:!0,characterData:!0,subtree:!0},t=new MutationObserver(()=>{t.disconnect(),this.renderIfPossible(),t.observe(this,n)});t.observe(this,n)}connectedCallback(){super.connectedCallback(),this.renderIfPossible()}renderIfPossible(){this.textContent&&this.root&&this.renderContent()}renderContent(){console.error(`Your class ${this.constructor.name} must provide a custom renderContent() method!`)}}),Or=(n,t,e=!0)=>i=>{const r=document.createElement("template");return r.innerHTML=t,e&&"ShadyCSS"in window&&ShadyCSS.prepareTemplate(r,n),class extends i{static get is(){return n}constructor(){super(),this.clone=document.importNode(r.content,!0),e&&(this.attachShadow({mode:"open"}),this.shadowRoot.appendChild(this.clone))}connectedCallback(){this.hasAttribute("distill-prerendered")||(e?"ShadyCSS"in window&&ShadyCSS.styleElement(this):this.insertBefore(this.clone,this.firstChild))}get root(){return e?this.shadowRoot:this}$(n){return this.root.querySelector(n)}$$(n){return this.root.querySelectorAll(n)}}};
// Copyright 2018 The Distill Template Authors
var Ir='/*\n * Copyright 2018 The Distill Template Authors\n *\n * Licensed under the Apache License, Version 2.0 (the "License");\n * you may not use this file except in compliance with the License.\n * You may obtain a copy of the License at\n *\n *      http://www.apache.org/licenses/LICENSE-2.0\n *\n * Unless required by applicable law or agreed to in writing, software\n * distributed under the License is distributed on an "AS IS" BASIS,\n * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n * See the License for the specific language governing permissions and\n * limitations under the License.\n */\n\nspan.katex-display {\n  text-align: left;\n  padding: 8px 0 8px 0;\n  margin: 0.5em 0 0.5em 1em;\n}\n\nspan.katex {\n  -webkit-font-smoothing: antialiased;\n  color: rgba(0, 0, 0, 0.8);\n  font-size: 1.18em;\n}\n';
// Copyright 2018 The Distill Template Authors
const Fr=function(n,t,e){let i=e,r=0;const o=n.length;for(;i<t.length;){const e=t[i];if(r<=0&&t.slice(i,i+o)===n)return i;"\\"===e?i++:"{"===e?r++:"}"===e&&r--,i++}return-1},Rr=function(n,t,e,i){const r=[];for(let o=0;o<n.length;o++)if("text"===n[o].type){const a=n[o].data;let s,l=!0,u=0;for(-1!==(s=a.indexOf(t))&&(u=s,r.push({type:"text",data:a.slice(0,u)}),l=!1);;){if(l){if(-1===(s=a.indexOf(t,u)))break;r.push({type:"text",data:a.slice(u,s)}),u=s}else{if(-1===(s=Fr(e,a,u+t.length)))break;r.push({type:"math",data:a.slice(u+t.length,s),rawData:a.slice(u,s+e.length),display:i}),u=s+e.length}l=!l}r.push({type:"text",data:a.slice(u)})}else r.push(n[o]);return r},Ur=function(n,t){let e=[{type:"text",data:n}];for(let n=0;n<t.length;n++){const i=t[n];e=Rr(e,i.left,i.right,i.display||!1)}return e},$r=function(n,t){const e=Ur(n,t.delimiters),i=document.createDocumentFragment();for(let n=0;n<e.length;n++)if("text"===e[n].type)i.appendChild(document.createTextNode(e[n].data));else{const o=document.createElement("d-math"),a=e[n].data;t.displayMode=e[n].display;try{o.textContent=a,t.displayMode&&o.setAttribute("block","")}catch(r){if(!(r instanceof katex.ParseError))throw r;t.errorCallback("KaTeX auto-render: Failed to parse `"+e[n].data+"` with ",r),i.appendChild(document.createTextNode(e[n].rawData));continue}i.appendChild(o)}return i},Pr=function(n,t){for(let e=0;e<n.childNodes.length;e++){const i=n.childNodes[e];if(3===i.nodeType){const r=i.textContent;if(t.mightHaveMath(r)){const o=$r(r,t);e+=o.childNodes.length-1,n.replaceChild(o,i)}}else if(1===i.nodeType){-1===t.ignoredTags.indexOf(i.nodeName.toLowerCase())&&Pr(i,t)}}},Hr={delimiters:[{left:"$$",right:"$$",display:!0},{left:"\\[",right:"\\]",display:!0},{left:"\\(",right:"\\)",display:!1}],ignoredTags:["script","noscript","style","textarea","pre","code","svg"],errorCallback:function(n,t){console.error(n,t)}},zr=function(n,t){if(!n)throw new Error("No element provided to render");const e=Object.assign({},Hr,t),i=e.delimiters.flatMap(n=>[n.left,n.right]),r=n=>i.some(t=>-1!==n.indexOf(t));e.mightHaveMath=r,Pr(n,e)},qr="https://distill.pub/third-party/katex/katex.min.js",jr='<link rel="stylesheet" href="https://distill.pub/third-party/katex/katex.min.css" crossorigin="anonymous">',Br=Or("d-math",`\n${jr}\n<style>\n\n:host {\n  display: inline-block;\n  contain: style;\n}\n\n:host([block]) {\n  display: block;\n}\n\n${Ir}\n</style>\n<span id='katex-container'></span>\n`);class Yr extends(Dr(Br(HTMLElement))){static set katexOptions(n){Yr._katexOptions=n,Yr.katexOptions.delimiters&&(Yr.katexAdded?Yr.katexLoadedCallback():Yr.addKatex())}static get katexOptions(){return Yr._katexOptions||(Yr._katexOptions={delimiters:[{left:"$$",right:"$$",display:!1}]}),Yr._katexOptions}static katexLoadedCallback(){const n=document.querySelectorAll("d-math");for(const t of n)t.renderContent();Yr.katexOptions.delimiters&&zr(document.body,Yr.katexOptions)}static addKatex(){document.head.insertAdjacentHTML("beforeend",jr);const n=document.createElement("script");n.src=qr,n.async=!0,n.onload=Yr.katexLoadedCallback,n.crossorigin="anonymous",document.head.appendChild(n),Yr.katexAdded=!0}get options(){const n={displayMode:this.hasAttribute("block")};return Object.assign(n,Yr.katexOptions)}connectedCallback(){super.connectedCallback(),Yr.katexAdded||Yr.addKatex()}renderContent(){if("undefined"!=typeof katex){const n=this.root.querySelector("#katex-container");katex.render(this.textContent,n,this.options)}}}Yr.katexAdded=!1,Yr.inlineMathRendered=!1,window.DMath=Yr;class Wr extends HTMLElement{static get is(){return"d-front-matter"}constructor(){super();const n={childList:!0,characterData:!0,subtree:!0};new MutationObserver(n=>{for(const t of n)if("SCRIPT"===t.target.nodeName||"characterData"===t.type){const n=d(this);this.notify(n)}}).observe(this,n)}notify(n){const t=new CustomEvent("onFrontMatterChanged",{detail:n,bubbles:!0});document.dispatchEvent(t)}}const Gr=new Lr,Vr={frontMatter:Gr,waitingOn:{bibliography:[],citations:[]},listeners:{onCiteKeyCreated(n){const[t,e]=n.detail;if(!Gr.citationsCollected)return void Vr.waitingOn.citations.push(()=>Vr.listeners.onCiteKeyCreated(n));if(!Gr.bibliographyParsed)return void Vr.waitingOn.bibliography.push(()=>Vr.listeners.onCiteKeyCreated(n));const i=e.map(n=>Gr.citations.indexOf(n));t.numbers=i;const r=e.map(n=>Gr.bibliography.get(n));t.entries=r},onCiteKeyChanged(){Gr.citations=t(),Gr.citationsCollected=!0;for(const n of Vr.waitingOn.citations.slice())n();const n=document.querySelector("d-citation-list"),e=new Map(Gr.citations.map(n=>[n,Gr.bibliography.get(n)]));n.citations=e;const i=document.querySelectorAll("d-cite");for(const n of i){console.log(n);const t=n.keys,e=t.map(n=>Gr.citations.indexOf(n));n.numbers=e;const i=t.map(n=>Gr.bibliography.get(n));n.entries=i}},onCiteKeyRemoved(n){Vr.listeners.onCiteKeyChanged(n)},onBibliographyChanged(n){const t=document.querySelector("d-citation-list"),e=n.detail;Gr.bibliography=e,Gr.bibliographyParsed=!0;for(const n of Vr.waitingOn.bibliography.slice())n();if(Gr.citationsCollected)if(t.hasAttribute("distill-prerendered"))console.debug("Citation list was prerendered; not updating it.");else{const n=new Map(Gr.citations.map(n=>[n,Gr.bibliography.get(n)]));t.citations=n}else Vr.waitingOn.citations.push(function(){Vr.listeners.onBibliographyChanged({target:n.target,detail:n.detail})})},onFootnoteChanged(){const n=document.querySelector("d-footnote-list");if(n){const t=document.querySelectorAll("d-footnote");n.footnotes=t}},onFrontMatterChanged(t){const e=t.detail;n(Gr,e);const i=document.querySelector("d-interstitial");if(i&&("undefined"!=typeof Gr.password?i.password=Gr.password:i.parentElement.removeChild(i)),!document.body.hasAttribute("distill-prerendered")&&u()){h(document,Gr);const n=document.querySelector("distill-appendix");n&&(n.frontMatter=Gr);const t=document.querySelector("d-byline");t&&(t.frontMatter=Gr),e.katex&&(Yr.katexOptions=e.katex)}},DOMContentLoaded(){if(Vr.loaded)return void console.warn("Controller received DOMContentLoaded but was already loaded!");if(!u())return void console.warn("Controller received DOMContentLoaded at document.readyState: "+document.readyState+"!");Vr.loaded=!0,console.debug("Runlevel 4: Controller running DOMContentLoaded");const n=document.querySelector("d-front-matter");if(n){const t=d(n);Vr.listeners.onFrontMatterChanged({detail:t})}Gr.citations=t(),Gr.citationsCollected=!0;for(const n of Vr.waitingOn.citations.slice())n();if(Gr.bibliographyParsed)for(const n of Vr.waitingOn.bibliography.slice())n();const e=document.querySelector("d-footnote-list");if(e){const n=document.querySelectorAll("d-footnote");e.footnotes=n}}}};
// Copyright 2018 The Distill Template Authors
const Kr='/*\n * Copyright 2018 The Distill Template Authors\n *\n * Licensed under the Apache License, Version 2.0 (the "License");\n * you may not use this file except in compliance with the License.\n * You may obtain a copy of the License at\n *\n *      http://www.apache.org/licenses/LICENSE-2.0\n *\n * Unless required by applicable law or agreed to in writing, software\n * distributed under the License is distributed on an "AS IS" BASIS,\n * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n * See the License for the specific language governing permissions and\n * limitations under the License.\n */\n\nhtml {\n  font-size: 14px;\n\tline-height: 1.6em;\n  /* font-family: "Libre Franklin", "Helvetica Neue", sans-serif; */\n  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", Arial, sans-serif;\n  /*, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";*/\n  text-size-adjust: 100%;\n  -ms-text-size-adjust: 100%;\n  -webkit-text-size-adjust: 100%;\n}\n\n@media(min-width: 768px) {\n  html {\n    font-size: 16px;\n  }\n}\n\nbody {\n  margin: 0;\n}\n\na {\n  color: #004276;\n}\n\nfigure {\n  margin: 0;\n}\n\ntable {\n\tborder-collapse: collapse;\n\tborder-spacing: 0;\n}\n\ntable th {\n\ttext-align: left;\n}\n\ntable thead {\n  border-bottom: 1px solid rgba(0, 0, 0, 0.05);\n}\n\ntable thead th {\n  padding-bottom: 0.5em;\n}\n\ntable tbody :first-child td {\n  padding-top: 0.5em;\n}\n\npre {\n  overflow: auto;\n  max-width: 100%;\n}\n\np {\n  margin-top: 0;\n  margin-bottom: 1em;\n}\n\nsup, sub {\n  vertical-align: baseline;\n  position: relative;\n  top: -0.4em;\n  line-height: 1em;\n}\n\nsub {\n  top: 0.4em;\n}\n\n.kicker,\n.marker {\n  font-size: 15px;\n  font-weight: 600;\n  color: rgba(0, 0, 0, 0.5);\n}\n\n\n/* Headline */\n\n@media(min-width: 1024px) {\n  d-title h1 span {\n    display: block;\n  }\n}\n\n/* Figure */\n\nfigure {\n  position: relative;\n  margin-bottom: 2.5em;\n  margin-top: 1.5em;\n}\n\nfigcaption+figure {\n\n}\n\nfigure img {\n  width: 100%;\n}\n\nfigure svg text,\nfigure svg tspan {\n}\n\nfigcaption,\n.figcaption {\n  color: rgba(0, 0, 0, 0.6);\n  font-size: 12px;\n  line-height: 1.5em;\n}\n\n@media(min-width: 1024px) {\nfigcaption,\n.figcaption {\n    font-size: 13px;\n  }\n}\n\nfigure.external img {\n  background: white;\n  border: 1px solid rgba(0, 0, 0, 0.1);\n  box-shadow: 0 1px 8px rgba(0, 0, 0, 0.1);\n  padding: 18px;\n  box-sizing: border-box;\n}\n\nfigcaption a {\n  color: rgba(0, 0, 0, 0.6);\n}\n\nfigcaption b,\nfigcaption strong, {\n  font-weight: 600;\n  color: rgba(0, 0, 0, 1.0);\n}\n'+'/*\n * Copyright 2018 The Distill Template Authors\n *\n * Licensed under the Apache License, Version 2.0 (the "License");\n * you may not use this file except in compliance with the License.\n * You may obtain a copy of the License at\n *\n *      http://www.apache.org/licenses/LICENSE-2.0\n *\n * Unless required by applicable law or agreed to in writing, software\n * distributed under the License is distributed on an "AS IS" BASIS,\n * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n * See the License for the specific language governing permissions and\n * limitations under the License.\n */\n\n@supports not (display: grid) {\n  .base-grid,\n  distill-header,\n  d-title,\n  d-abstract,\n  d-article,\n  d-appendix,\n  distill-appendix,\n  d-byline,\n  d-footnote-list,\n  d-citation-list,\n  distill-footer {\n    display: block;\n    padding: 8px;\n  }\n}\n\n.base-grid,\ndistill-header,\nd-title,\nd-abstract,\nd-article,\nd-appendix,\ndistill-appendix,\nd-byline,\nd-footnote-list,\nd-citation-list,\ndistill-footer {\n  display: grid;\n  justify-items: stretch;\n  grid-template-columns: [screen-start] 8px [page-start kicker-start text-start gutter-start middle-start] 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr [text-end page-end gutter-end kicker-end middle-end] 8px [screen-end];\n  grid-column-gap: 8px;\n}\n\n.grid {\n  display: grid;\n  grid-column-gap: 8px;\n}\n\n@media(min-width: 768px) {\n  .base-grid,\n  distill-header,\n  d-title,\n  d-abstract,\n  d-article,\n  d-appendix,\n  distill-appendix,\n  d-byline,\n  d-footnote-list,\n  d-citation-list,\n  distill-footer {\n    grid-template-columns: [screen-start] 1fr [page-start kicker-start middle-start text-start] 45px 45px 45px 45px 45px 45px 45px 45px [ kicker-end text-end gutter-start] 45px [middle-end] 45px [page-end gutter-end] 1fr [screen-end];\n    grid-column-gap: 16px;\n  }\n\n  .grid {\n    grid-column-gap: 16px;\n  }\n}\n\n@media(min-width: 1000px) {\n  .base-grid,\n  distill-header,\n  d-title,\n  d-abstract,\n  d-article,\n  d-appendix,\n  distill-appendix,\n  d-byline,\n  d-footnote-list,\n  d-citation-list,\n  distill-footer {\n    grid-template-columns: [screen-start] 1fr [page-start kicker-start] 50px [middle-start] 50px [text-start kicker-end] 50px 50px 50px 50px 50px 50px 50px 50px [text-end gutter-start] 50px [middle-end] 50px [page-end gutter-end] 1fr [screen-end];\n    grid-column-gap: 16px;\n  }\n\n  .grid {\n    grid-column-gap: 16px;\n  }\n}\n\n@media(min-width: 1180px) {\n  .base-grid,\n  distill-header,\n  d-title,\n  d-abstract,\n  d-article,\n  d-appendix,\n  distill-appendix,\n  d-byline,\n  d-footnote-list,\n  d-citation-list,\n  distill-footer {\n    grid-template-columns: [screen-start] 1fr [page-start kicker-start] 60px [middle-start] 60px [text-start kicker-end] 60px 60px 60px 60px 60px 60px 60px 60px [text-end gutter-start] 60px [middle-end] 60px [page-end gutter-end] 1fr [screen-end];\n    grid-column-gap: 32px;\n  }\n\n  .grid {\n    grid-column-gap: 32px;\n  }\n}\n\n\n\n\n.base-grid {\n  grid-column: screen;\n}\n\n/* .l-body,\nd-article > *  {\n  grid-column: text;\n}\n\n.l-page,\nd-title > *,\nd-figure {\n  grid-column: page;\n} */\n\n.l-gutter {\n  grid-column: gutter;\n}\n\n.l-text,\n.l-body {\n  grid-column: text;\n}\n\n.l-page {\n  grid-column: page;\n}\n\n.l-body-outset {\n  grid-column: middle;\n}\n\n.l-page-outset {\n  grid-column: page;\n}\n\n.l-screen {\n  grid-column: screen;\n}\n\n.l-screen-inset {\n  grid-column: screen;\n  padding-left: 16px;\n  padding-left: 16px;\n}\n\n\n/* Aside */\n\nd-article aside {\n  grid-column: gutter;\n  font-size: 12px;\n  line-height: 1.6em;\n  color: rgba(0, 0, 0, 0.6)\n}\n\n@media(min-width: 768px) {\n  aside {\n    grid-column: gutter;\n  }\n\n  .side {\n    grid-column: gutter;\n  }\n}\n'+'/*\n * Copyright 2018 The Distill Template Authors\n *\n * Licensed under the Apache License, Version 2.0 (the "License");\n * you may not use this file except in compliance with the License.\n * You may obtain a copy of the License at\n *\n *      http://www.apache.org/licenses/LICENSE-2.0\n *\n * Unless required by applicable law or agreed to in writing, software\n * distributed under the License is distributed on an "AS IS" BASIS,\n * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n * See the License for the specific language governing permissions and\n * limitations under the License.\n */\n\nd-title {\n  padding: 2rem 0 1.5rem;\n  contain: layout style;\n  overflow-x: hidden;\n}\n\n@media(min-width: 768px) {\n  d-title {\n    padding: 4rem 0 1.5rem;\n  }\n}\n\nd-title h1 {\n  grid-column: text;\n  font-size: 40px;\n  font-weight: 700;\n  line-height: 1.1em;\n  margin: 0 0 0.5rem;\n}\n\n@media(min-width: 768px) {\n  d-title h1 {\n    font-size: 50px;\n  }\n}\n\nd-title p {\n  font-weight: 300;\n  font-size: 1.2rem;\n  line-height: 1.55em;\n  grid-column: text;\n}\n\nd-title .status {\n  margin-top: 0px;\n  font-size: 12px;\n  color: #009688;\n  opacity: 0.8;\n  grid-column: kicker;\n}\n\nd-title .status span {\n  line-height: 1;\n  display: inline-block;\n  padding: 6px 0;\n  border-bottom: 1px solid #80cbc4;\n  font-size: 11px;\n  text-transform: uppercase;\n}\n'+'/*\n * Copyright 2018 The Distill Template Authors\n *\n * Licensed under the Apache License, Version 2.0 (the "License");\n * you may not use this file except in compliance with the License.\n * You may obtain a copy of the License at\n *\n *      http://www.apache.org/licenses/LICENSE-2.0\n *\n * Unless required by applicable law or agreed to in writing, software\n * distributed under the License is distributed on an "AS IS" BASIS,\n * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n * See the License for the specific language governing permissions and\n * limitations under the License.\n */\n\nd-byline {\n  contain: style;\n  overflow: hidden;\n  border-top: 1px solid rgba(0, 0, 0, 0.1);\n  font-size: 0.8rem;\n  line-height: 1.8em;\n  padding: 1.5rem 0;\n  min-height: 1.8em;\n}\n\n\nd-byline .byline {\n  grid-template-columns: 1fr 1fr;\n  grid-column: text;\n}\n\n@media(min-width: 768px) {\n  d-byline .byline {\n    grid-template-columns: 1fr 1fr 1fr 1fr;\n  }\n}\n\nd-byline .authors-affiliations {\n  grid-column-end: span 2;\n  grid-template-columns: 1fr 1fr;\n  margin-bottom: 1em;\n}\n\n@media(min-width: 768px) {\n  d-byline .authors-affiliations {\n    margin-bottom: 0;\n  }\n}\n\nd-byline h3 {\n  font-size: 0.6rem;\n  font-weight: 400;\n  color: rgba(0, 0, 0, 0.5);\n  margin: 0;\n  text-transform: uppercase;\n}\n\nd-byline p {\n  margin: 0;\n}\n\nd-byline a,\nd-article d-byline a {\n  color: rgba(0, 0, 0, 0.8);\n  text-decoration: none;\n  border-bottom: none;\n}\n\nd-article d-byline a:hover {\n  text-decoration: underline;\n  border-bottom: none;\n}\n\nd-byline p.author {\n  font-weight: 500;\n}\n\nd-byline .affiliations {\n\n}\n'+'/*\n * Copyright 2018 The Distill Template Authors\n *\n * Licensed under the Apache License, Version 2.0 (the "License");\n * you may not use this file except in compliance with the License.\n * You may obtain a copy of the License at\n *\n *      http://www.apache.org/licenses/LICENSE-2.0\n *\n * Unless required by applicable law or agreed to in writing, software\n * distributed under the License is distributed on an "AS IS" BASIS,\n * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n * See the License for the specific language governing permissions and\n * limitations under the License.\n */\n\nd-article {\n  contain: layout style;\n  overflow-x: hidden;\n  border-top: 1px solid rgba(0, 0, 0, 0.1);\n  padding-top: 2rem;\n  color: rgba(0, 0, 0, 0.8);\n}\n\nd-article > * {\n  grid-column: text;\n}\n\n@media(min-width: 768px) {\n  d-article {\n    font-size: 16px;\n  }\n}\n\n@media(min-width: 1024px) {\n  d-article {\n    font-size: 1.06rem;\n    line-height: 1.7em;\n  }\n}\n\n\n/* H2 */\n\n\nd-article .marker {\n  text-decoration: none;\n  border: none;\n  counter-reset: section;\n  grid-column: kicker;\n  line-height: 1.7em;\n}\n\nd-article .marker:hover {\n  border: none;\n}\n\nd-article .marker span {\n  padding: 0 3px 4px;\n  border-bottom: 1px solid rgba(0, 0, 0, 0.2);\n  position: relative;\n  top: 4px;\n}\n\nd-article .marker:hover span {\n  color: rgba(0, 0, 0, 0.7);\n  border-bottom: 1px solid rgba(0, 0, 0, 0.7);\n}\n\nd-article h2 {\n  font-weight: 600;\n  font-size: 24px;\n  line-height: 1.25em;\n  margin: 2rem 0 1.5rem 0;\n  border-bottom: 1px solid rgba(0, 0, 0, 0.1);\n  padding-bottom: 1rem;\n}\n\n@media(min-width: 1024px) {\n  d-article h2 {\n    font-size: 36px;\n  }\n}\n\n/* H3 */\n\nd-article h3 {\n  font-weight: 700;\n  font-size: 18px;\n  line-height: 1.4em;\n  margin-bottom: 1em;\n  margin-top: 2em;\n}\n\n@media(min-width: 1024px) {\n  d-article h3 {\n    font-size: 20px;\n  }\n}\n\n/* H4 */\n\nd-article h4 {\n  font-weight: 600;\n  text-transform: uppercase;\n  font-size: 14px;\n  line-height: 1.4em;\n}\n\nd-article a {\n  color: inherit;\n}\n\nd-article p,\nd-article ul,\nd-article ol,\nd-article blockquote {\n  margin-top: 0;\n  margin-bottom: 1em;\n  margin-left: 0;\n  margin-right: 0;\n}\n\nd-article blockquote {\n  border-left: 2px solid rgba(0, 0, 0, 0.2);\n  padding-left: 2em;\n  font-style: italic;\n  color: rgba(0, 0, 0, 0.6);\n}\n\nd-article a {\n  border-bottom: 1px solid rgba(0, 0, 0, 0.4);\n  text-decoration: none;\n}\n\nd-article a:hover {\n  border-bottom: 1px solid rgba(0, 0, 0, 0.8);\n}\n\nd-article .link {\n  text-decoration: underline;\n  cursor: pointer;\n}\n\nd-article ul,\nd-article ol {\n  padding-left: 24px;\n}\n\nd-article li {\n  margin-bottom: 1em;\n  margin-left: 0;\n  padding-left: 0;\n}\n\nd-article li:last-child {\n  margin-bottom: 0;\n}\n\nd-article pre {\n  font-size: 14px;\n  margin-bottom: 20px;\n}\n\nd-article hr {\n  grid-column: screen;\n  width: 100%;\n  border: none;\n  border-bottom: 1px solid rgba(0, 0, 0, 0.1);\n  margin-top: 60px;\n  margin-bottom: 60px;\n}\n\nd-article section {\n  margin-top: 60px;\n  margin-bottom: 60px;\n}\n\nd-article span.equation-mimic {\n  font-family: georgia;\n  font-size: 115%;\n  font-style: italic;\n}\n\nd-article > d-code,\nd-article section > d-code  {\n  display: block;\n}\n\nd-article > d-math[block],\nd-article section > d-math[block]  {\n  display: block;\n}\n\n@media (max-width: 768px) {\n  d-article > d-code,\n  d-article section > d-code,\n  d-article > d-math[block],\n  d-article section > d-math[block] {\n      overflow-x: scroll;\n      -ms-overflow-style: none;  // IE 10+\n      overflow: -moz-scrollbars-none;  // Firefox\n  }\n\n  d-article > d-code::-webkit-scrollbar,\n  d-article section > d-code::-webkit-scrollbar,\n  d-article > d-math[block]::-webkit-scrollbar,\n  d-article section > d-math[block]::-webkit-scrollbar {\n    display: none;  // Safari and Chrome\n  }\n}\n\nd-article .citation {\n  color: #668;\n  cursor: pointer;\n}\n\nd-include {\n  width: auto;\n  display: block;\n}\n\nd-figure {\n  contain: layout style;\n}\n\n/* KaTeX */\n\n.katex, .katex-prerendered {\n  contain: style;\n  display: inline-block;\n}\n\n/* Tables */\n\nd-article table {\n  border-collapse: collapse;\n  margin-bottom: 1.5rem;\n  border-bottom: 1px solid rgba(0, 0, 0, 0.2);\n}\n\nd-article table th {\n  border-bottom: 1px solid rgba(0, 0, 0, 0.2);\n}\n\nd-article table td {\n  border-bottom: 1px solid rgba(0, 0, 0, 0.05);\n}\n\nd-article table tr:last-of-type td {\n  border-bottom: none;\n}\n\nd-article table th,\nd-article table td {\n  font-size: 15px;\n  padding: 2px 8px;\n}\n\nd-article table tbody :first-child td {\n  padding-top: 2px;\n}\n'+Ir+'/*\n * Copyright 2018 The Distill Template Authors\n *\n * Licensed under the Apache License, Version 2.0 (the "License");\n * you may not use this file except in compliance with the License.\n * You may obtain a copy of the License at\n *\n *      http://www.apache.org/licenses/LICENSE-2.0\n *\n * Unless required by applicable law or agreed to in writing, software\n * distributed under the License is distributed on an "AS IS" BASIS,\n * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n * See the License for the specific language governing permissions and\n * limitations under the License.\n */\n\n@media print {\n\n  @page {\n    size: 8in 11in;\n    @bottom-right {\n      content: counter(page) " of " counter(pages);\n    }\n  }\n\n  html {\n    /* no general margins -- CSS Grid takes care of those */\n  }\n\n  p, code {\n    page-break-inside: avoid;\n  }\n\n  h2, h3 {\n    page-break-after: avoid;\n  }\n\n  d-header {\n    visibility: hidden;\n  }\n\n  d-footer {\n    display: none!important;\n  }\n\n}\n',Xr=[{name:"WebComponents",support:function(){return"customElements"in window&&"attachShadow"in Element.prototype&&"getRootNode"in Element.prototype&&"content"in document.createElement("template")&&"Promise"in window&&"from"in Array},url:"https://distill.pub/third-party/polyfills/webcomponents-lite.js"},{name:"IntersectionObserver",support:function(){return"IntersectionObserver"in window&&"IntersectionObserverEntry"in window},url:"https://distill.pub/third-party/polyfills/intersection-observer.js"}];class Zr{static browserSupportsAllFeatures(){return Xr.every(n=>n.support())}static load(n){const t=function(t){t.loaded=!0,console.debug("Runlevel 0: Polyfill has finished loading: "+t.name),Zr.neededPolyfills.every(n=>n.loaded)&&(console.debug("Runlevel 0: All required polyfills have finished loading."),console.debug("Runlevel 0->1."),window.distillRunlevel=1,n())};for(const n of Zr.neededPolyfills)f(n,t)}static get neededPolyfills(){return Zr._neededPolyfills||(Zr._neededPolyfills=Xr.filter(n=>!n.support())),Zr._neededPolyfills}}const Qr=Or("d-abstract",`\n<style>\n  :host {\n    font-size: 1.25rem;\n    line-height: 1.6em;\n    color: rgba(0, 0, 0, 0.7);\n    -webkit-font-smoothing: antialiased;\n  }\n\n  ::slotted(p) {\n    margin-top: 0;\n    margin-bottom: 1em;\n    grid-column: text-start / middle-end;\n  }\n  ${g("d-abstract")}\n</style>\n\n<slot></slot>\n`);class Jr extends(Qr(HTMLElement)){}
// Copyright 2018 The Distill Template Authors
const no=Or("d-appendix","\n<style>\n\nd-appendix {\n  contain: layout style;\n  font-size: 0.8em;\n  line-height: 1.7em;\n  margin-top: 60px;\n  margin-bottom: 0;\n  border-top: 1px solid rgba(0, 0, 0, 0.1);\n  color: rgba(0,0,0,0.5);\n  padding-top: 60px;\n  padding-bottom: 48px;\n}\n\nd-appendix h3 {\n  grid-column: page-start / text-start;\n  font-size: 15px;\n  font-weight: 500;\n  margin-top: 1em;\n  margin-bottom: 0;\n  color: rgba(0,0,0,0.65);\n}\n\nd-appendix h3 + * {\n  margin-top: 1em;\n}\n\nd-appendix ol {\n  padding: 0 0 0 15px;\n}\n\n@media (min-width: 768px) {\n  d-appendix ol {\n    padding: 0 0 0 30px;\n    margin-left: -30px;\n  }\n}\n\nd-appendix li {\n  margin-bottom: 1em;\n}\n\nd-appendix a {\n  color: rgba(0, 0, 0, 0.6);\n}\n\nd-appendix > * {\n  grid-column: text;\n}\n\nd-appendix > d-footnote-list,\nd-appendix > d-citation-list,\nd-appendix > distill-appendix {\n  grid-column: screen;\n}\n\n</style>\n\n",!1);class to extends(no(HTMLElement)){}
// Copyright 2018 The Distill Template Authors
const eo=/^\s*$/;class io extends HTMLElement{static get is(){return"d-article"}constructor(){super(),new MutationObserver(n=>{for(const t of n)for(const n of t.addedNodes)switch(n.nodeName){case"#text":{const t=n.nodeValue;if(!eo.test(t)){console.warn("Use of unwrapped text in distill articles is discouraged as it breaks layout! Please wrap any text in a <span> or <p> tag. We found the following text: "+t);const e=document.createElement("span");e.innerHTML=n.nodeValue,n.parentNode.insertBefore(e,n),n.parentNode.removeChild(n)}}}}).observe(this,{childList:!0})}}var ro="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{},oo=m(function(n,t){!function(n){function t(){this.months=["jan","feb","mar","apr","may","jun","jul","aug","sep","oct","nov","dec"],this.notKey=[",","{","}"," ","="],this.pos=0,this.input="",this.entries=new Array,this.currentEntry="",this.setInput=function(n){this.input=n},this.getEntries=function(){return this.entries},this.isWhitespace=function(n){return" "==n||"\r"==n||"\t"==n||"\n"==n},this.match=function(n,t){if(t!=undefined&&null!=t||(t=!0),this.skipWhitespace(t),this.input.substring(this.pos,this.pos+n.length)!=n)throw"Token mismatch, expected "+n+", found "+this.input.substring(this.pos);this.pos+=n.length,this.skipWhitespace(t)},this.tryMatch=function(n,t){return t!=undefined&&null!=t||(t=!0),this.skipWhitespace(t),this.input.substring(this.pos,this.pos+n.length)==n},this.matchAt=function(){for(;this.input.length>this.pos&&"@"!=this.input[this.pos];)this.pos++;return"@"==this.input[this.pos]},this.skipWhitespace=function(n){for(;this.isWhitespace(this.input[this.pos]);)this.pos++;if("%"==this.input[this.pos]&&1==n){for(;"\n"!=this.input[this.pos];)this.pos++;this.skipWhitespace(n)}},this.value_braces=function(){var n=0;this.match("{",!1);for(var t=this.pos,e=!1;;){if(!e)if("}"==this.input[this.pos]){if(!(n>0)){var i=this.pos;return this.match("}",!1),this.input.substring(t,i)}n--}else if("{"==this.input[this.pos])n++;else if(this.pos>=this.input.length-1)throw"Unterminated value";e="\\"==this.input[this.pos]&&0==e,this.pos++}},this.value_comment=function(){for(var n="",t=0;!this.tryMatch("}",!1)||0!=t;){if(n+=this.input[this.pos],"{"==this.input[this.pos]&&t++,"}"==this.input[this.pos]&&t--,this.pos>=this.input.length-1)throw"Unterminated value:"+this.input.substring(start);this.pos++}return n},this.value_quotes=function(){this.match('"',!1);for(var n=this.pos,t=!1;;){if(!t){if('"'==this.input[this.pos]){var e=this.pos;return this.match('"',!1),this.input.substring(n,e)}if(this.pos>=this.input.length-1)throw"Unterminated value:"+this.input.substring(n)}t="\\"==this.input[this.pos]&&0==t,this.pos++}},this.single_value=function(){var n=this.pos;if(this.tryMatch("{"))return this.value_braces();if(this.tryMatch('"'))return this.value_quotes();var t=this.key();if(t.match("^[0-9]+$"))return t;if(this.months.indexOf(t.toLowerCase())>=0)return t.toLowerCase();throw"Value expected:"+this.input.substring(n)+" for key: "+t},this.value=function(){var n=[];for(n.push(this.single_value());this.tryMatch("#");)this.match("#"),n.push(this.single_value());return n.join("")},this.key=function(){for(var n=this.pos;;){if(this.pos>=this.input.length)throw"Runaway key";if(this.notKey.indexOf(this.input[this.pos])>=0)return this.input.substring(n,this.pos);this.pos++}},this.key_equals_value=function(){var n=this.key();if(this.tryMatch("="))return this.match("="),[n,this.value()];throw"... = value expected, equals sign missing:"+this.input.substring(this.pos)},this.key_value_list=function(){var n=this.key_equals_value();for(this.currentEntry.entryTags={},this.currentEntry.entryTags[n[0]]=n[1];this.tryMatch(",")&&(this.match(","),!this.tryMatch("}"));)n=this.key_equals_value(),this.currentEntry.entryTags[n[0]]=n[1]},this.entry_body=function(n){this.currentEntry={},this.currentEntry.citationKey=this.key(),this.currentEntry.entryType=n.substring(1),this.match(","),this.key_value_list(),this.entries.push(this.currentEntry)},this.directive=function(){return this.match("@"),"@"+this.key()},this.preamble=function(){this.currentEntry={},this.currentEntry.entryType="PREAMBLE",this.currentEntry.entry=this.value_comment(),this.entries.push(this.currentEntry)},this.comment=function(){this.currentEntry={},this.currentEntry.entryType="COMMENT",this.currentEntry.entry=this.value_comment(),this.entries.push(this.currentEntry)},this.entry=function(n){this.entry_body(n)},this.bibtex=function(){for(;this.matchAt();){var n=this.directive();this.match("{"),"@STRING"==n?this.string():"@PREAMBLE"==n?this.preamble():"@COMMENT"==n?this.comment():this.entry(n),this.match("}")}}}n.toJSON=function(n){var e=new t;return e.setInput(n),e.bibtex(),e.entries},n.toBibtex=function(n){var t="";for(var e in n){if(t+="@"+n[e].entryType,t+="{",n[e].citationKey&&(t+=n[e].citationKey+", "),n[e].entry&&(t+=n[e].entry),n[e].entryTags){var i="";for(var r in n[e].entryTags)0!=i.length&&(i+=", "),i+=r+"= {"+n[e].entryTags[r]+"}";t+=i}t+="}\n\n"}return t}}(t)});class ao extends HTMLElement{static get is(){return"d-bibliography"}constructor(){super();const n={childList:!0,characterData:!0,subtree:!0};new MutationObserver(n=>{for(const t of n)"SCRIPT"!==t.target.nodeName&&"characterData"!==t.type||this.parseIfPossible()}).observe(this,n)}connectedCallback(){requestAnimationFrame(()=>{this.parseIfPossible()})}parseIfPossible(){const n=this.querySelector("script");if(n)if("text/bibtex"==n.type){const t=n.textContent;if(this.bibtex!==t){this.bibtex=t;const n=y(this.bibtex);this.notify(n)}}else if("text/json"==n.type){const t=new Map(JSON.parse(n.textContent));this.notify(t)}else console.warn("Unsupported bibliography script tag type: "+n.type)}notify(n){const t=new CustomEvent("onBibliographyChanged",{detail:n,bubbles:!0});this.dispatchEvent(t)}static get observedAttributes(){return["src"]}receivedBibtex(n){const t=y(n.target.response);this.notify(t)}attributeChangedCallback(n,t,e){var i=new XMLHttpRequest;i.onload=(n=>this.receivedBibtex(n)),i.onerror=(()=>console.warn(`Could not load Bibtex! (tried ${e})`)),i.responseType="text",i.open("GET",e,!0),i.send()}}class so extends HTMLElement{static get is(){return"d-byline"}set frontMatter(n){this.innerHTML=w(n)}}
// Copyright 2018 The Distill Template Authors
const lo=Or("d-cite",'\n<style>\n\n:host {\n  display: inline-block;\n}\n\n.citation {\n  color: hsla(206, 90%, 20%, 0.7);\n}\n\n.citation-number {\n  cursor: default;\n  white-space: nowrap;\n  font-family: -apple-system, BlinkMacSystemFont, "Roboto", Helvetica, sans-serif;\n  font-size: 75%;\n  color: hsla(206, 90%, 20%, 0.7);\n  display: inline-block;\n  line-height: 1.1em;\n  text-align: center;\n  position: relative;\n  top: -2px;\n  margin: 0 2px;\n}\n\nfigcaption .citation-number {\n  font-size: 11px;\n  font-weight: normal;\n  top: -2px;\n  line-height: 1em;\n}\n\nul {\n  margin: 0;\n  padding: 0;\n  list-style-type: none;\n}\n\nul li {\n  padding: 15px 10px 15px 10px;\n  border-bottom: 1px solid rgba(0,0,0,0.1)\n}\n\nul li:last-of-type {\n  border-bottom: none;\n}\n\n</style>\n\n<d-hover-box id="hover-box"></d-hover-box>\n\n<div id="citation-" class="citation">\n  <span class="citation-number"></span>\n</div>\n');class uo extends(lo(HTMLElement)){constructor(){super(),this._numbers=[],this._entries=[]}connectedCallback(){this.outerSpan=this.root.querySelector("#citation-"),this.innerSpan=this.root.querySelector(".citation-number"),this.hoverBox=this.root.querySelector("d-hover-box"),window.customElements.whenDefined("d-hover-box").then(()=>{this.hoverBox.listen(this)}),this.numbers&&this.displayNumbers(this.numbers),this.entries&&this.displayEntries(this.entries)}static get observedAttributes(){return["key","bibtex-key"]}attributeChangedCallback(n,t,e){const i=t?"onCiteKeyChanged":"onCiteKeyCreated",r=e.split(",").map(n=>n.trim()),o=new CustomEvent(i,{detail:[this,r],bubbles:!0});document.dispatchEvent(o)}set key(n){this.setAttribute("key",n)}get key(){return this.getAttribute("key")||this.getAttribute("bibtex-key")}get keys(){const n=this.key.split(",");return console.log(n),n}set numbers(n){this._numbers=n,this.displayNumbers(n)}get numbers(){return this._numbers}displayNumbers(n){if(!this.innerSpan)return;const t="["+n.map(n=>-1==n?"?":n+1+"").join(", ")+"]";this.innerSpan.textContent=t}set entries(n){this._entries=n,this.displayEntries(n)}get entries(){return this._entries}displayEntries(n){this.hoverBox&&(this.hoverBox.innerHTML=`<ul>\n      ${n.map(l).map(n=>`<li>${n}</li>`).join("\n")}\n    </ul>`)}}
// Copyright 2018 The Distill Template Authors
const co="\nd-citation-list {\n  contain: style;\n}\n\nd-citation-list .references {\n  grid-column: text;\n}\n\nd-citation-list .references .title {\n  font-weight: 500;\n}\n";class ho extends HTMLElement{static get is(){return"d-citation-list"}connectedCallback(){this.hasAttribute("distill-prerendered")||(this.style.display="none")}set citations(n){x(this,n)}}var po=m(function(n){var t=function(n){function t(n,t,e,i,r){this.type=n,this.content=t,this.alias=e,this.length=0|(i||"").length,this.greedy=!!r}function e(n,i,a,s,l,u,d){for(var h in a)if(a.hasOwnProperty(h)&&a[h]){var p=a[h];p=Array.isArray(p)?p:[p];for(var f=0;f<p.length;++f){if(d&&d==h+","+f)return;var g=p[f],m=g.inside,b=!!g.lookbehind,y=!!g.greedy,v=0,w=g.alias;if(y&&!g.pattern.global){var x=g.pattern.toString().match(/[imsuy]*$/)[0];g.pattern=RegExp(g.pattern.source,x+"g")}g=g.pattern||g;for(var k=s.next,S=l;k!==i.tail;S+=k.value.length,k=k.next){var M=k.value;if(i.length>n.length)return;if(!(M instanceof t)){var T=1;if(y&&k!=i.tail.prev){if(g.lastIndex=S,!(N=g.exec(n)))break;var _=N.index+(b&&N[1]?N[1].length:0),C=N.index+N[0].length,A=S;for(A+=k.value.length;_>=A;)A+=(k=k.next).value.length;if(S=A-=k.value.length,k.value instanceof t)continue;for(var E=k;E!==i.tail&&(A<C||"string"==typeof E.value&&!E.prev.value.greedy);E=E.next)T++,A+=E.value.length;T--,M=n.slice(S,A),N.index-=S}else{g.lastIndex=0;var N=g.exec(M)}if(N){b&&(v=N[1]?N[1].length:0);C=(_=N.index+v)+(N=N[0].slice(v)).length;var L=M.slice(0,_),D=M.slice(C),O=k.prev;if(L&&(O=r(i,O,L),S+=L.length),o(i,O,T),k=r(i,O,new t(h,m?c.tokenize(N,m):N,w,N,y)),D&&r(i,k,D),T>1&&e(n,i,a,k.prev,S,!0,h+","+f),u)break}else if(u)break}}}}}function i(){var n={value:null,prev:null,next:null},t={value:null,prev:n,next:null};n.next=t,this.head=n,this.tail=t,this.length=0}function r(n,t,e){var i=t.next,r={value:e,prev:t,next:i};return t.next=r,i.prev=r,n.length++,r}function o(n,t,e){for(var i=t.next,r=0;r<e&&i!==n.tail;r++)i=i.next;t.next=i,i.prev=t,n.length-=r}function a(n){for(var t=[],e=n.head.next;e!==n.tail;)t.push(e.value),e=e.next;return t}function s(){c.manual||c.highlightAll()}var l=/\blang(?:uage)?-([\w-]+)\b/i,u=0,c={manual:n.Prism&&n.Prism.manual,disableWorkerMessageHandler:n.Prism&&n.Prism.disableWorkerMessageHandler,util:{encode:function p(n){return n instanceof t?new t(n.type,p(n.content),n.alias):Array.isArray(n)?n.map(p):n.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/\u00a0/g," ")},type:function(n){return Object.prototype.toString.call(n).slice(8,-1)},objId:function(n){return n.__id||Object.defineProperty(n,"__id",{value:++u}),n.__id},clone:function f(n,t){var e,i,r=c.util.type(n);switch(t=t||{},r){case"Object":if(i=c.util.objId(n),t[i])return t[i];for(var o in e={},t[i]=e,n)n.hasOwnProperty(o)&&(e[o]=f(n[o],t));return e;case"Array":return i=c.util.objId(n),t[i]?t[i]:(e=[],t[i]=e,n.forEach(function(n,i){e[i]=f(n,t)}),e);default:return n}},getLanguage:function(n){for(;n&&!l.test(n.className);)n=n.parentElement;return n?(n.className.match(l)||[,"none"])[1].toLowerCase():"none"},currentScript:function(){if("undefined"==typeof document)return null;if("currentScript"in document)return document.currentScript;try{throw new Error}catch(i){var n=(/at [^(\r\n]*\((.*):.+:.+\)$/i.exec(i.stack)||[])[1];if(n){var t=document.getElementsByTagName("script");for(var e in t)if(t[e].src==n)return t[e]}return null}}},languages:{extend:function(n,t){var e=c.util.clone(c.languages[n]);for(var i in t)e[i]=t[i];return e},insertBefore:function(n,t,e,i){var r=(i=i||c.languages)[n],o={};for(var a in r)if(r.hasOwnProperty(a)){if(a==t)for(var s in e)e.hasOwnProperty(s)&&(o[s]=e[s]);e.hasOwnProperty(a)||(o[a]=r[a])}var l=i[n];return i[n]=o,c.languages.DFS(c.languages,function(t,e){e===l&&t!=n&&(this[t]=o)}),o},DFS:function g(n,t,e,i){i=i||{};var r=c.util.objId;for(var o in n)if(n.hasOwnProperty(o)){t.call(n,o,n[o],e||o);var a=n[o],s=c.util.type(a);"Object"!==s||i[r(a)]?"Array"!==s||i[r(a)]||(i[r(a)]=!0,g(a,t,o,i)):(i[r(a)]=!0,g(a,t,null,i))}}},plugins:{},highlightAll:function(n,t){c.highlightAllUnder(document,n,t)},highlightAllUnder:function(n,t,e){var i={callback:e,container:n,selector:'code[class*="language-"], [class*="language-"] code, code[class*="lang-"], [class*="lang-"] code'};c.hooks.run("before-highlightall",i),i.elements=Array.prototype.slice.apply(i.container.querySelectorAll(i.selector)),c.hooks.run("before-all-elements-highlight",i);for(var r,o=0;r=i.elements[o++];)c.highlightElement(r,!0===t,i.callback)},highlightElement:function(t,e,i){function r(n){u.highlightedCode=n,c.hooks.run("before-insert",u),u.element.innerHTML=u.highlightedCode,c.hooks.run("after-highlight",u),c.hooks.run("complete",u),i&&i.call(u.element)}var o=c.util.getLanguage(t),a=c.languages[o];t.className=t.className.replace(l,"").replace(/\s+/g," ")+" language-"+o;var s=t.parentNode;s&&"pre"===s.nodeName.toLowerCase()&&(s.className=s.className.replace(l,"").replace(/\s+/g," ")+" language-"+o);var u={element:t,language:o,grammar:a,code:t.textContent};if(c.hooks.run("before-sanity-check",u),!u.code)return c.hooks.run("complete",u),void(i&&i.call(u.element));if(c.hooks.run("before-highlight",u),u.grammar)if(e&&n.Worker){var d=new Worker(c.filename);d.onmessage=function(n){r(n.data)},d.postMessage(JSON.stringify({language:u.language,code:u.code,immediateClose:!0}))}else r(c.highlight(u.code,u.grammar,u.language));else r(c.util.encode(u.code))},highlight:function(n,e,i){var r={code:n,grammar:e,language:i};return c.hooks.run("before-tokenize",r),r.tokens=c.tokenize(r.code,r.grammar),c.hooks.run("after-tokenize",r),t.stringify(c.util.encode(r.tokens),r.language)},tokenize:function(n,t){var o=t.rest;if(o){for(var s in o)t[s]=o[s];delete t.rest}var l=new i;return r(l,l.head,n),e(n,l,t,l.head,0),a(l)},hooks:{all:{},add:function(n,t){var e=c.hooks.all;e[n]=e[n]||[],e[n].push(t)},run:function(n,t){var e=c.hooks.all[n];if(e&&e.length)for(var i,r=0;i=e[r++];)i(t)}},Token:t};if(n.Prism=c,t.stringify=function m(n,t){if("string"==typeof n)return n;if(Array.isArray(n)){var e="";return n.forEach(function(n){e+=m(n,t)}),e}var i={type:n.type,content:m(n.content,t),tag:"span",classes:["token",n.type],attributes:{},language:t},r=n.alias;r&&(Array.isArray(r)?Array.prototype.push.apply(i.classes,r):i.classes.push(r)),c.hooks.run("wrap",i);var o="";for(var a in i.attributes)o+=" "+a+'="'+(i.attributes[a]||"").replace(/"/g,"&quot;")+'"';return"<"+i.tag+' class="'+i.classes.join(" ")+'"'+o+">"+i.content+"</"+i.tag+">"},!n.document)return n.addEventListener?(c.disableWorkerMessageHandler||n.addEventListener("message",function(t){var e=JSON.parse(t.data),i=e.language,r=e.code,o=e.immediateClose;n.postMessage(c.highlight(r,c.languages[i],i)),o&&n.close()},!1),c):c;var d=c.util.currentScript();if(d&&(c.filename=d.src,d.hasAttribute("data-manual")&&(c.manual=!0)),!c.manual){var h=document.readyState;"loading"===h||"interactive"===h&&d&&d.defer?document.addEventListener("DOMContentLoaded",s):window.requestAnimationFrame?window.requestAnimationFrame(s):window.setTimeout(s,16)}return c}("undefined"!=typeof window?window:"undefined"!=typeof WorkerGlobalScope&&self instanceof WorkerGlobalScope?self:{});n.exports&&(n.exports=t),void 0!==ro&&(ro.Prism=t),t.languages.markup={comment:/<!--[\s\S]*?-->/,prolog:/<\?[\s\S]+?\?>/,doctype:{pattern:/<!DOCTYPE(?:[^>"'[\]]|"[^"]*"|'[^']*')+(?:\[(?:(?!<!--)[^"'\]]|"[^"]*"|'[^']*'|<!--[\s\S]*?-->)*\]\s*)?>/i,greedy:!0},cdata:/<!\[CDATA\[[\s\S]*?]]>/i,tag:{pattern:/<\/?(?!\d)[^\s>\/=$<%]+(?:\s(?:\s*[^\s>\/=]+(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+(?=[\s>]))|(?=[\s/>])))+)?\s*\/?>/i,greedy:!0,inside:{tag:{pattern:/^<\/?[^\s>\/]+/i,inside:{punctuation:/^<\/?/,namespace:/^[^\s>\/:]+:/}},"attr-value":{pattern:/=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+)/i,inside:{punctuation:[/^=/,{pattern:/^(\s*)["']|["']$/,lookbehind:!0}]}},punctuation:/\/?>/,"attr-name":{pattern:/[^\s>\/]+/,inside:{namespace:/^[^\s>\/:]+:/}}}},entity:/&#?[\da-z]{1,8};/i},t.languages.markup.tag.inside["attr-value"].inside.entity=t.languages.markup.entity,t.hooks.add("wrap",function(n){"entity"===n.type&&(n.attributes.title=n.content.replace(/&amp;/,"&"))}),Object.defineProperty(t.languages.markup.tag,"addInlined",{value:function(n,e){var i={};i["language-"+e]={pattern:/(^<!\[CDATA\[)[\s\S]+?(?=\]\]>$)/i,lookbehind:!0,inside:t.languages[e]},i.cdata=/^<!\[CDATA\[|\]\]>$/i;var r={"included-cdata":{pattern:/<!\[CDATA\[[\s\S]*?\]\]>/i,inside:i}};r["language-"+e]={pattern:/[\s\S]+/,inside:t.languages[e]};var o={};o[n]={pattern:RegExp(/(<__[\s\S]*?>)(?:<!\[CDATA\[[\s\S]*?\]\]>\s*|[\s\S])*?(?=<\/__>)/.source.replace(/__/g,function(){return n}),"i"),lookbehind:!0,greedy:!0,inside:r},t.languages.insertBefore("markup","cdata",o)}}),t.languages.xml=t.languages.extend("markup",{}),t.languages.html=t.languages.markup,t.languages.mathml=t.languages.markup,t.languages.svg=t.languages.markup,function(n){var t=/("|')(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/;n.languages.css={comment:/\/\*[\s\S]*?\*\//,atrule:{pattern:/@[\w-]+[\s\S]*?(?:;|(?=\s*\{))/,inside:{rule:/^@[\w-]+/,"selector-function-argument":{pattern:/(\bselector\s*\((?!\s*\))\s*)(?:[^()]|\((?:[^()]|\([^()]*\))*\))+?(?=\s*\))/,lookbehind:!0,alias:"selector"}}},url:{pattern:RegExp("url\\((?:"+t.source+"|[^\n\r()]*)\\)","i"),greedy:!0,inside:{"function":/^url/i,punctuation:/^\(|\)$/}},selector:RegExp("[^{}\\s](?:[^{};\"']|"+t.source+")*?(?=\\s*\\{)"),string:{pattern:t,greedy:!0},property:/[-_a-z\xA0-\uFFFF][-\w\xA0-\uFFFF]*(?=\s*:)/i,important:/!important\b/i,"function":/[-a-z0-9]+(?=\()/i,punctuation:/[(){};:,]/},n.languages.css.atrule.inside.rest=n.languages.css;var e=n.languages.markup;e&&(e.tag.addInlined("style","css"),n.languages.insertBefore("inside","attr-value",{"style-attr":{pattern:/\s*style=("|')(?:\\[\s\S]|(?!\1)[^\\])*\1/i,inside:{"attr-name":{pattern:/^\s*style/i,inside:e.tag.inside},punctuation:/^\s*=\s*['"]|['"]\s*$/,"attr-value":{pattern:/.+/i,inside:n.languages.css}},alias:"language-css"}},e.tag))}(t),t.languages.clike={comment:[{pattern:/(^|[^\\])\/\*[\s\S]*?(?:\*\/|$)/,lookbehind:!0},{pattern:/(^|[^\\:])\/\/.*/,lookbehind:!0,greedy:!0}],string:{pattern:/(["'])(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,greedy:!0},"class-name":{pattern:/(\b(?:class|interface|extends|implements|trait|instanceof|new)\s+|\bcatch\s+\()[\w.\\]+/i,lookbehind:!0,inside:{punctuation:/[.\\]/}},keyword:/\b(?:if|else|while|do|for|return|in|instanceof|function|new|try|throw|catch|finally|null|break|continue)\b/,boolean:/\b(?:true|false)\b/,"function":/\w+(?=\()/,number:/\b0x[\da-f]+\b|(?:\b\d+\.?\d*|\B\.\d+)(?:e[+-]?\d+)?/i,operator:/[<>]=?|[!=]=?=?|--?|\+\+?|&&?|\|\|?|[?*/~^%]/,punctuation:/[{}[\];(),.:]/},t.languages.javascript=t.languages.extend("clike",{"class-name":[t.languages.clike["class-name"],{pattern:/(^|[^$\w\xA0-\uFFFF])[_$A-Z\xA0-\uFFFF][$\w\xA0-\uFFFF]*(?=\.(?:prototype|constructor))/,lookbehind:!0}],keyword:[{pattern:/((?:^|})\s*)(?:catch|finally)\b/,lookbehind:!0},{pattern:/(^|[^.]|\.\.\.\s*)\b(?:as|async(?=\s*(?:function\b|\(|[$\w\xA0-\uFFFF]|$))|await|break|case|class|const|continue|debugger|default|delete|do|else|enum|export|extends|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)\b/,lookbehind:!0}],number:/\b(?:(?:0[xX](?:[\dA-Fa-f](?:_[\dA-Fa-f])?)+|0[bB](?:[01](?:_[01])?)+|0[oO](?:[0-7](?:_[0-7])?)+)n?|(?:\d(?:_\d)?)+n|NaN|Infinity)\b|(?:\b(?:\d(?:_\d)?)+\.?(?:\d(?:_\d)?)*|\B\.(?:\d(?:_\d)?)+)(?:[Ee][+-]?(?:\d(?:_\d)?)+)?/,"function":/#?[_$a-zA-Z\xA0-\uFFFF][$\w\xA0-\uFFFF]*(?=\s*(?:\.\s*(?:apply|bind|call)\s*)?\()/,operator:/--|\+\+|\*\*=?|=>|&&|\|\||[!=]==|<<=?|>>>?=?|[-+*/%&|^!=<>]=?|\.{3}|\?[.?]?|[~:]/}),t.languages.javascript["class-name"][0].pattern=/(\b(?:class|interface|extends|implements|instanceof|new)\s+)[\w.\\]+/,t.languages.insertBefore("javascript","keyword",{regex:{pattern:/((?:^|[^$\w\xA0-\uFFFF."'\])\s])\s*)\/(?:\[(?:[^\]\\\r\n]|\\.)*]|\\.|[^/\\\[\r\n])+\/[gimyus]{0,6}(?=(?:\s|\/\*[\s\S]*?\*\/)*(?:$|[\r\n,.;:})\]]|\/\/))/,lookbehind:!0,greedy:!0},"function-variable":{pattern:/#?[_$a-zA-Z\xA0-\uFFFF][$\w\xA0-\uFFFF]*(?=\s*[=:]\s*(?:async\s*)?(?:\bfunction\b|(?:\((?:[^()]|\([^()]*\))*\)|[_$a-zA-Z\xA0-\uFFFF][$\w\xA0-\uFFFF]*)\s*=>))/,alias:"function"},parameter:[{pattern:/(function(?:\s+[_$A-Za-z\xA0-\uFFFF][$\w\xA0-\uFFFF]*)?\s*\(\s*)(?!\s)(?:[^()]|\([^()]*\))+?(?=\s*\))/,lookbehind:!0,inside:t.languages.javascript},{pattern:/[_$a-z\xA0-\uFFFF][$\w\xA0-\uFFFF]*(?=\s*=>)/i,inside:t.languages.javascript},{pattern:/(\(\s*)(?!\s)(?:[^()]|\([^()]*\))+?(?=\s*\)\s*=>)/,lookbehind:!0,inside:t.languages.javascript},{pattern:/((?:\b|\s|^)(?!(?:as|async|await|break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)(?![$\w\xA0-\uFFFF]))(?:[_$A-Za-z\xA0-\uFFFF][$\w\xA0-\uFFFF]*\s*)\(\s*)(?!\s)(?:[^()]|\([^()]*\))+?(?=\s*\)\s*\{)/,lookbehind:!0,inside:t.languages.javascript}],constant:/\b[A-Z](?:[A-Z_]|\dx?)*\b/}),t.languages.insertBefore("javascript","string",{"template-string":{pattern:/`(?:\\[\s\S]|\${(?:[^{}]|{(?:[^{}]|{[^}]*})*})+}|(?!\${)[^\\`])*`/,greedy:!0,inside:{"template-punctuation":{pattern:/^`|`$/,alias:"string"},interpolation:{pattern:/((?:^|[^\\])(?:\\{2})*)\${(?:[^{}]|{(?:[^{}]|{[^}]*})*})+}/,lookbehind:!0,inside:{"interpolation-punctuation":{pattern:/^\${|}$/,alias:"punctuation"},rest:t.languages.javascript}},string:/[\s\S]+/}}}),t.languages.markup&&t.languages.markup.tag.addInlined("script","javascript"),t.languages.js=t.languages.javascript,"undefined"!=typeof self&&self.Prism&&self.document&&document.querySelector&&(self.Prism.fileHighlight=function(n){n=n||document;var e={js:"javascript",py:"python",rb:"ruby",ps1:"powershell",psm1:"powershell",sh:"bash",bat:"batch",h:"c",tex:"latex"};Array.prototype.slice.call(n.querySelectorAll("pre[data-src]")).forEach(function(n){if(!n.hasAttribute("data-src-loaded")){for(var i,r=n.getAttribute("data-src"),o=n,a=/\blang(?:uage)?-([\w-]+)\b/i;o&&!a.test(o.className);)o=o.parentNode;if(o&&(i=(n.className.match(a)||[,""])[1]),!i){var s=(r.match(/\.(\w+)$/)||[,""])[1];i=e[s]||s}var l=document.createElement("code");l.className="language-"+i,n.textContent="",l.textContent="Loading\u2026",n.appendChild(l);var u=new XMLHttpRequest;u.open("GET",r,!0),u.onreadystatechange=function(){4==u.readyState&&(u.status<400&&u.responseText?(l.textContent=u.responseText,t.highlightElement(l),n.setAttribute("data-src-loaded","")):u.status>=400?l.textContent="\u2716 Error "+u.status+" while fetching file: "+u.statusText:l.textContent="\u2716 Error: File does not exist or is empty")},u.send(null)}})},document.addEventListener("DOMContentLoaded",function(){self.Prism.fileHighlight()}))});Prism.languages.python={comment:{pattern:/(^|[^\\])#.*/,lookbehind:!0},"string-interpolation":{pattern:/(?:f|rf|fr)(?:("""|''')[\s\S]+?\1|("|')(?:\\.|(?!\2)[^\\\r\n])*\2)/i,greedy:!0,inside:{interpolation:{pattern:/((?:^|[^{])(?:{{)*){(?!{)(?:[^{}]|{(?!{)(?:[^{}]|{(?!{)(?:[^{}])+})+})+}/,lookbehind:!0,inside:{"format-spec":{pattern:/(:)[^:(){}]+(?=}$)/,lookbehind:!0},"conversion-option":{pattern:/![sra](?=[:}]$)/,alias:"punctuation"},rest:null}},string:/[\s\S]+/}},"triple-quoted-string":{pattern:/(?:[rub]|rb|br)?("""|''')[\s\S]+?\1/i,greedy:!0,alias:"string"},string:{pattern:/(?:[rub]|rb|br)?("|')(?:\\.|(?!\1)[^\\\r\n])*\1/i,greedy:!0},"function":{pattern:/((?:^|\s)def[ \t]+)[a-zA-Z_]\w*(?=\s*\()/g,lookbehind:!0},"class-name":{pattern:/(\bclass\s+)\w+/i,lookbehind:!0},decorator:{pattern:/(^\s*)@\w+(?:\.\w+)*/im,lookbehind:!0,alias:["annotation","punctuation"],inside:{punctuation:/\./}},keyword:/\b(?:and|as|assert|async|await|break|class|continue|def|del|elif|else|except|exec|finally|for|from|global|if|import|in|is|lambda|nonlocal|not|or|pass|print|raise|return|try|while|with|yield)\b/,builtin:/\b(?:__import__|abs|all|any|apply|ascii|basestring|bin|bool|buffer|bytearray|bytes|callable|chr|classmethod|cmp|coerce|compile|complex|delattr|dict|dir|divmod|enumerate|eval|execfile|file|filter|float|format|frozenset|getattr|globals|hasattr|hash|help|hex|id|input|int|intern|isinstance|issubclass|iter|len|list|locals|long|map|max|memoryview|min|next|object|oct|open|ord|pow|property|range|raw_input|reduce|reload|repr|reversed|round|set|setattr|slice|sorted|staticmethod|str|sum|super|tuple|type|unichr|unicode|vars|xrange|zip)\b/,boolean:/\b(?:True|False|None)\b/,number:/(?:\b(?=\d)|\B(?=\.))(?:0[bo])?(?:(?:\d|0x[\da-f])[\da-f]*\.?\d*|\.\d+)(?:e[+-]?\d+)?j?\b/i,operator:/[-+%=]=?|!=|\*\*?=?|\/\/?=?|<[<=>]?|>[=>]?|[&|^~]/,punctuation:/[{}[\];(),.:]/},Prism.languages.python["string-interpolation"].inside.interpolation.inside.rest=Prism.languages.python,Prism.languages.py=Prism.languages.python,Prism.languages.clike={comment:[{pattern:/(^|[^\\])\/\*[\s\S]*?(?:\*\/|$)/,lookbehind:!0},{pattern:/(^|[^\\:])\/\/.*/,lookbehind:!0,greedy:!0}],string:{pattern:/(["'])(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,greedy:!0},"class-name":{pattern:/(\b(?:class|interface|extends|implements|trait|instanceof|new)\s+|\bcatch\s+\()[\w.\\]+/i,lookbehind:!0,inside:{punctuation:/[.\\]/}},keyword:/\b(?:if|else|while|do|for|return|in|instanceof|function|new|try|throw|catch|finally|null|break|continue)\b/,boolean:/\b(?:true|false)\b/,"function":/\w+(?=\()/,number:/\b0x[\da-f]+\b|(?:\b\d+\.?\d*|\B\.\d+)(?:e[+-]?\d+)?/i,operator:/[<>]=?|[!=]=?=?|--?|\+\+?|&&?|\|\|?|[?*/~^%]/,punctuation:/[{}[\];(),.:]/},Prism.languages.lua={comment:/^#!.+|--(?:\[(=*)\[[\s\S]*?\]\1\]|.*)/m,string:{pattern:/(["'])(?:(?!\1)[^\\\r\n]|\\z(?:\r\n|\s)|\\(?:\r\n|[\s\S]))*\1|\[(=*)\[[\s\S]*?\]\2\]/,greedy:!0},number:/\b0x[a-f\d]+\.?[a-f\d]*(?:p[+-]?\d+)?\b|\b\d+(?:\.\B|\.?\d*(?:e[+-]?\d+)?\b)|\B\.\d+(?:e[+-]?\d+)?\b/i,keyword:/\b(?:and|break|do|else|elseif|end|false|for|function|goto|if|in|local|nil|not|or|repeat|return|then|true|until|while)\b/,"function":/(?!\d)\w+(?=\s*(?:[({]))/,operator:[/[-+*%^&|#]|\/\/?|<[<=]?|>[>=]?|[=~]=?/,{pattern:/(^|[^.])\.\.(?!\.)/,lookbehind:!0}],punctuation:/[\[\](){},;]|\.+|:+/},function(n){var t="\\b(?:BASH|BASHOPTS|BASH_ALIASES|BASH_ARGC|BASH_ARGV|BASH_CMDS|BASH_COMPLETION_COMPAT_DIR|BASH_LINENO|BASH_REMATCH|BASH_SOURCE|BASH_VERSINFO|BASH_VERSION|COLORTERM|COLUMNS|COMP_WORDBREAKS|DBUS_SESSION_BUS_ADDRESS|DEFAULTS_PATH|DESKTOP_SESSION|DIRSTACK|DISPLAY|EUID|GDMSESSION|GDM_LANG|GNOME_KEYRING_CONTROL|GNOME_KEYRING_PID|GPG_AGENT_INFO|GROUPS|HISTCONTROL|HISTFILE|HISTFILESIZE|HISTSIZE|HOME|HOSTNAME|HOSTTYPE|IFS|INSTANCE|JOB|LANG|LANGUAGE|LC_ADDRESS|LC_ALL|LC_IDENTIFICATION|LC_MEASUREMENT|LC_MONETARY|LC_NAME|LC_NUMERIC|LC_PAPER|LC_TELEPHONE|LC_TIME|LESSCLOSE|LESSOPEN|LINES|LOGNAME|LS_COLORS|MACHTYPE|MAILCHECK|MANDATORY_PATH|NO_AT_BRIDGE|OLDPWD|OPTERR|OPTIND|ORBIT_SOCKETDIR|OSTYPE|PAPERSIZE|PATH|PIPESTATUS|PPID|PS1|PS2|PS3|PS4|PWD|RANDOM|REPLY|SECONDS|SELINUX_INIT|SESSION|SESSIONTYPE|SESSION_MANAGER|SHELL|SHELLOPTS|SHLVL|SSH_AUTH_SOCK|TERM|UID|UPSTART_EVENTS|UPSTART_INSTANCE|UPSTART_JOB|UPSTART_SESSION|USER|WINDOWID|XAUTHORITY|XDG_CONFIG_DIRS|XDG_CURRENT_DESKTOP|XDG_DATA_DIRS|XDG_GREETER_DATA_DIR|XDG_MENU_PREFIX|XDG_RUNTIME_DIR|XDG_SEAT|XDG_SEAT_PATH|XDG_SESSION_DESKTOP|XDG_SESSION_ID|XDG_SESSION_PATH|XDG_SESSION_TYPE|XDG_VTNR|XMODIFIERS)\\b",e={environment:{pattern:RegExp("\\$"+t),alias:"constant"},variable:[{pattern:/\$?\(\([\s\S]+?\)\)/,greedy:!0,inside:{variable:[{pattern:/(^\$\(\([\s\S]+)\)\)/,lookbehind:!0},/^\$\(\(/],number:/\b0x[\dA-Fa-f]+\b|(?:\b\d+\.?\d*|\B\.\d+)(?:[Ee]-?\d+)?/,operator:/--?|-=|\+\+?|\+=|!=?|~|\*\*?|\*=|\/=?|%=?|<<=?|>>=?|<=?|>=?|==?|&&?|&=|\^=?|\|\|?|\|=|\?|:/,punctuation:/\(\(?|\)\)?|,|;/}},{pattern:/\$\((?:\([^)]+\)|[^()])+\)|`[^`]+`/,greedy:!0,inside:{variable:/^\$\(|^`|\)$|`$/}},{pattern:/\$\{[^}]+\}/,greedy:!0,inside:{operator:/:[-=?+]?|[!\/]|##?|%%?|\^\^?|,,?/,punctuation:/[\[\]]/,environment:{pattern:RegExp("(\\{)"+t),lookbehind:!0,alias:"constant"}}},/\$(?:\w+|[#?*!@$])/],entity:/\\(?:[abceEfnrtv\\"]|O?[0-7]{1,3}|x[0-9a-fA-F]{1,2}|u[0-9a-fA-F]{4}|U[0-9a-fA-F]{8})/};n.languages.bash={shebang:{pattern:/^#!\s*\/.*/,alias:"important"},comment:{pattern:/(^|[^"{\\$])#.*/,lookbehind:!0},"function-name":[{pattern:/(\bfunction\s+)\w+(?=(?:\s*\(?:\s*\))?\s*\{)/,lookbehind:!0,alias:"function"},{pattern:/\b\w+(?=\s*\(\s*\)\s*\{)/,alias:"function"}],"for-or-select":{pattern:/(\b(?:for|select)\s+)\w+(?=\s+in\s)/,alias:"variable",lookbehind:!0},"assign-left":{pattern:/(^|[\s;|&]|[<>]\()\w+(?=\+?=)/,inside:{environment:{pattern:RegExp("(^|[\\s;|&]|[<>]\\()"+t),lookbehind:!0,alias:"constant"}},alias:"variable",lookbehind:!0},string:[{pattern:/((?:^|[^<])<<-?\s*)(\w+?)\s*(?:\r?\n|\r)[\s\S]*?(?:\r?\n|\r)\2/,lookbehind:!0,greedy:!0,inside:e},{pattern:/((?:^|[^<])<<-?\s*)(["'])(\w+)\2\s*(?:\r?\n|\r)[\s\S]*?(?:\r?\n|\r)\3/,lookbehind:!0,greedy:!0},{pattern:/(^|[^\\](?:\\\\)*)(["'])(?:\\[\s\S]|\$\([^)]+\)|`[^`]+`|(?!\2)[^\\])*\2/,lookbehind:!0,greedy:!0,inside:e}],environment:{pattern:RegExp("\\$?"+t),alias:"constant"},variable:e.variable,"function":{pattern:/(^|[\s;|&]|[<>]\()(?:add|apropos|apt|aptitude|apt-cache|apt-get|aspell|automysqlbackup|awk|basename|bash|bc|bconsole|bg|bzip2|cal|cat|cfdisk|chgrp|chkconfig|chmod|chown|chroot|cksum|clear|cmp|column|comm|cp|cron|crontab|csplit|curl|cut|date|dc|dd|ddrescue|debootstrap|df|diff|diff3|dig|dir|dircolors|dirname|dirs|dmesg|du|egrep|eject|env|ethtool|expand|expect|expr|fdformat|fdisk|fg|fgrep|file|find|fmt|fold|format|free|fsck|ftp|fuser|gawk|git|gparted|grep|groupadd|groupdel|groupmod|groups|grub-mkconfig|gzip|halt|head|hg|history|host|hostname|htop|iconv|id|ifconfig|ifdown|ifup|import|install|ip|jobs|join|kill|killall|less|link|ln|locate|logname|logrotate|look|lpc|lpr|lprint|lprintd|lprintq|lprm|ls|lsof|lynx|make|man|mc|mdadm|mkconfig|mkdir|mke2fs|mkfifo|mkfs|mkisofs|mknod|mkswap|mmv|more|most|mount|mtools|mtr|mutt|mv|nano|nc|netstat|nice|nl|nohup|notify-send|npm|nslookup|op|open|parted|passwd|paste|pathchk|ping|pkill|pnpm|popd|pr|printcap|printenv|ps|pushd|pv|quota|quotacheck|quotactl|ram|rar|rcp|reboot|remsync|rename|renice|rev|rm|rmdir|rpm|rsync|scp|screen|sdiff|sed|sendmail|seq|service|sftp|sh|shellcheck|shuf|shutdown|sleep|slocate|sort|split|ssh|stat|strace|su|sudo|sum|suspend|swapon|sync|tac|tail|tar|tee|time|timeout|top|touch|tr|traceroute|tsort|tty|umount|uname|unexpand|uniq|units|unrar|unshar|unzip|update-grub|uptime|useradd|userdel|usermod|users|uudecode|uuencode|v|vdir|vi|vim|virsh|vmstat|wait|watch|wc|wget|whereis|which|who|whoami|write|xargs|xdg-open|yarn|yes|zenity|zip|zsh|zypper)(?=$|[)\s;|&])/,lookbehind:!0},keyword:{pattern:/(^|[\s;|&]|[<>]\()(?:if|then|else|elif|fi|for|while|in|case|esac|function|select|do|done|until)(?=$|[)\s;|&])/,lookbehind:!0},builtin:{pattern:/(^|[\s;|&]|[<>]\()(?:\.|:|break|cd|continue|eval|exec|exit|export|getopts|hash|pwd|readonly|return|shift|test|times|trap|umask|unset|alias|bind|builtin|caller|command|declare|echo|enable|help|let|local|logout|mapfile|printf|read|readarray|source|type|typeset|ulimit|unalias|set|shopt)(?=$|[)\s;|&])/,lookbehind:!0,alias:"class-name"},boolean:{pattern:/(^|[\s;|&]|[<>]\()(?:true|false)(?=$|[)\s;|&])/,lookbehind:!0},"file-descriptor":{pattern:/\B&\d\b/,alias:"important"},operator:{pattern:/\d?<>|>\||\+=|==?|!=?|=~|<<[<-]?|[&\d]?>>|\d?[<>]&?|&[>&]?|\|[&|]?|<=?|>=?/,inside:{"file-descriptor":{pattern:/^\d/,alias:"important"}}},punctuation:/\$?\(\(?|\)\)?|\.\.|[{}[\];\\]/,number:{pattern:/(^|\s)(?:[1-9]\d*|0)(?:[.,]\d+)?\b/,lookbehind:!0}};for(var i=["comment","function-name","for-or-select","assign-left","string","environment","function","keyword","builtin","boolean","file-descriptor","operator","punctuation","number"],r=e.variable[1].inside,o=0;o<i.length;o++)r[i[o]]=n.languages.bash[i[o]];n.languages.shell=n.languages.bash}(Prism),Prism.languages.go=Prism.languages.extend("clike",{keyword:/\b(?:break|case|chan|const|continue|default|defer|else|fallthrough|for|func|go(?:to)?|if|import|interface|map|package|range|return|select|struct|switch|type|var)\b/,builtin:/\b(?:bool|byte|complex(?:64|128)|error|float(?:32|64)|rune|string|u?int(?:8|16|32|64)?|uintptr|append|cap|close|complex|copy|delete|imag|len|make|new|panic|print(?:ln)?|real|recover)\b/,boolean:/\b(?:_|iota|nil|true|false)\b/,operator:/[*\/%^!=]=?|\+[=+]?|-[=-]?|\|[=|]?|&(?:=|&|\^=?)?|>(?:>=?|=)?|<(?:<=?|=|-)?|:=|\.\.\./,number:/(?:\b0x[a-f\d]+|(?:\b\d+\.?\d*|\B\.\d+)(?:e[-+]?\d+)?)i?/i,string:{pattern:/(["'`])(?:\\[\s\S]|(?!\1)[^\\])*\1/,greedy:!0}}),delete Prism.languages.go["class-name"],function(n){function t(n,t){return n=n.replace(/<inner>/g,function(){return e}),t&&(n=n+"|"+n.replace(/_/g,"\\*")),RegExp(/((?:^|[^\\])(?:\\{2})*)/.source+"(?:"+n+")")}var e=/(?:\\.|[^\\\n\r]|(?:\n|\r\n?)(?!\n|\r\n?))/.source,i=/(?:\\.|``.+?``|`[^`\r\n]+`|[^\\|\r\n`])+/.source,r=/\|?__(?:\|__)+\|?(?:(?:\n|\r\n?)|$)/.source.replace(/__/g,function(){return i}),o=/\|?[ \t]*:?-{3,}:?[ \t]*(?:\|[ \t]*:?-{3,}:?[ \t]*)+\|?(?:\n|\r\n?)/.source;n.languages.markdown=n.languages.extend("markup",{}),n.languages.insertBefore("markdown","prolog",{blockquote:{pattern:/^>(?:[\t ]*>)*/m,alias:"punctuation"},table:{pattern:RegExp("^"+r+o+"(?:"+r+")*","m"),inside:{"table-data-rows":{pattern:RegExp("^("+r+o+")(?:"+r+")*$"),lookbehind:!0,inside:{"table-data":{pattern:RegExp(i),inside:n.languages.markdown},punctuation:/\|/}},"table-line":{pattern:RegExp("^("+r+")"+o+"$"),lookbehind:!0,inside:{punctuation:/\||:?-{3,}:?/}},"table-header-row":{pattern:RegExp("^"+r+"$"),inside:{"table-header":{pattern:RegExp(i),alias:"important",inside:n.languages.markdown},punctuation:/\|/}}}},code:[{pattern:/((?:^|\n)[ \t]*\n|(?:^|\r\n?)[ \t]*\r\n?)(?: {4}|\t).+(?:(?:\n|\r\n?)(?: {4}|\t).+)*/,lookbehind:!0,alias:"keyword"},{pattern:/``.+?``|`[^`\r\n]+`/,alias:"keyword"},{pattern:/^```[\s\S]*?^```$/m,greedy:!0,inside:{"code-block":{pattern:/^(```.*(?:\n|\r\n?))[\s\S]+?(?=(?:\n|\r\n?)^```$)/m,lookbehind:!0},"code-language":{pattern:/^(```).+/,lookbehind:!0},punctuation:/```/}}],title:[{pattern:/\S.*(?:\n|\r\n?)(?:==+|--+)(?=[ \t]*$)/m,alias:"important",inside:{punctuation:/==+$|--+$/}},{pattern:/(^\s*)#+.+/m,lookbehind:!0,alias:"important",inside:{punctuation:/^#+|#+$/}}],hr:{pattern:/(^\s*)([*-])(?:[\t ]*\2){2,}(?=\s*$)/m,lookbehind:!0,alias:"punctuation"},list:{pattern:/(^\s*)(?:[*+-]|\d+\.)(?=[\t ].)/m,lookbehind:!0,alias:"punctuation"},"url-reference":{pattern:/!?\[[^\]]+\]:[\t ]+(?:\S+|<(?:\\.|[^>\\])+>)(?:[\t ]+(?:"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|\((?:\\.|[^)\\])*\)))?/,inside:{variable:{pattern:/^(!?\[)[^\]]+/,lookbehind:!0},string:/(?:"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|\((?:\\.|[^)\\])*\))$/,punctuation:/^[\[\]!:]|[<>]/},alias:"url"},bold:{pattern:t(/__(?:(?!_)<inner>|_(?:(?!_)<inner>)+_)+__/.source,!0),lookbehind:!0,greedy:!0,inside:{content:{pattern:/(^..)[\s\S]+(?=..$)/,lookbehind:!0,inside:{}},punctuation:/\*\*|__/}},italic:{pattern:t(/_(?:(?!_)<inner>|__(?:(?!_)<inner>)+__)+_/.source,!0),lookbehind:!0,greedy:!0,inside:{content:{pattern:/(^.)[\s\S]+(?=.$)/,lookbehind:!0,inside:{}},punctuation:/[*_]/}},strike:{pattern:t(/(~~?)(?:(?!~)<inner>)+?\2/.source,!1),lookbehind:!0,greedy:!0,inside:{content:{pattern:/(^~~?)[\s\S]+(?=\1$)/,lookbehind:!0,inside:{}},punctuation:/~~?/}},url:{pattern:t(/!?\[(?:(?!\])<inner>)+\](?:\([^\s)]+(?:[\t ]+"(?:\\.|[^"\\])*")?\)| ?\[(?:(?!\])<inner>)+\])/.source,!1),lookbehind:!0,greedy:!0,inside:{variable:{pattern:/(\[)[^\]]+(?=\]$)/,lookbehind:!0},content:{pattern:/(^!?\[)[^\]]+(?=\])/,lookbehind:!0,inside:{}},string:{pattern:/"(?:\\.|[^"\\])*"(?=\)$)/}}}}),["url","bold","italic","strike"].forEach(function(t){["url","bold","italic","strike"].forEach(function(e){t!==e&&(n.languages.markdown[t].inside.content.inside[e]=n.languages.markdown[e])})}),n.hooks.add("after-tokenize",function(n){function t(n){if(n&&"string"!=typeof n)for(var e=0,i=n.length;e<i;e++){var r=n[e];if("code"===r.type){var o=r.content[1],a=r.content[3];if(o&&a&&"code-language"===o.type&&"code-block"===a.type&&"string"==typeof o.content){var s=o.content.replace(/\b#/g,"sharp").replace(/\b\+\+/g,"pp"),l="language-"+(s=(/[a-z][\w-]*/i.exec(s)||[""])[0].toLowerCase());a.alias?"string"==typeof a.alias?a.alias=[a.alias,l]:a.alias.push(l):a.alias=[l]}}else t(r.content)}}"markdown"!==n.language&&"md"!==n.language||t(n.tokens)}),n.hooks.add("wrap",function(t){if("code-block"===t.type){for(var e="",i=0,r=t.classes.length;i<r;i++){var o=t.classes[i],a=/language-(.+)/.exec(o);if(a){e=a[1];break}}var s=n.languages[e];if(s){var l=t.content.replace(/&lt;/g,"<").replace(/&amp;/g,"&");t.content=n.highlight(l,s,e)}else if(e&&"none"!==e&&n.plugins.autoloader){var u="md-"+(new Date).valueOf()+"-"+Math.floor(1e16*Math.random());t.attributes.id=u,n.plugins.autoloader.loadLanguages(e,function(){var t=document.getElementById(u);t&&(t.innerHTML=n.highlight(t.textContent,n.languages[e],e))})}}}),n.languages.md=n.languages.markdown}(Prism),Prism.languages.julia={comment:{pattern:/(^|[^\\])#.*/,lookbehind:!0},string:/("""|''')[\s\S]+?\1|("|')(?:\\.|(?!\2)[^\\\r\n])*\2/,keyword:/\b(?:abstract|baremodule|begin|bitstype|break|catch|ccall|const|continue|do|else|elseif|end|export|finally|for|function|global|if|immutable|import|importall|in|let|local|macro|module|print|println|quote|return|struct|try|type|typealias|using|while)\b/,boolean:/\b(?:true|false)\b/,number:/(?:\b(?=\d)|\B(?=\.))(?:0[box])?(?:[\da-f]+\.?\d*|\.\d+)(?:[efp][+-]?\d+)?j?/i,operator:/[-+*^%\xf7&$\\]=?|\/[\/=]?|!=?=?|\|[=>]?|<(?:<=?|[=:])?|>(?:=|>>?=?)?|==?=?|[~\u2260\u2264\u2265]/,punctuation:/[{}[\];(),.:]/,constant:/\b(?:(?:NaN|Inf)(?:16|32|64)?)\b/};
// Copyright 2018 The Distill Template Authors
const fo=Or("d-code",`\n<style>\n\ncode {\n  white-space: nowrap;\n  background: rgba(0, 0, 0, 0.04);\n  border-radius: 2px;\n  padding: 4px 7px;\n  font-size: 15px;\n  color: rgba(0, 0, 0, 0.6);\n}\n\npre code {\n  display: block;\n  border-left: 2px solid rgba(0, 0, 0, .1);\n  padding: 0 0 0 36px;\n}\n\n${'/**\n * prism.js default theme for JavaScript, CSS and HTML\n * Based on dabblet (http://dabblet.com)\n * @author Lea Verou\n */\n\ncode[class*="language-"],\npre[class*="language-"] {\n\tcolor: black;\n\tbackground: none;\n\ttext-shadow: 0 1px white;\n\tfont-family: Consolas, Monaco, \'Andale Mono\', \'Ubuntu Mono\', monospace;\n\tfont-size: 1em;\n\ttext-align: left;\n\twhite-space: pre;\n\tword-spacing: normal;\n\tword-break: normal;\n\tword-wrap: normal;\n\tline-height: 1.5;\n\n\t-moz-tab-size: 4;\n\t-o-tab-size: 4;\n\ttab-size: 4;\n\n\t-webkit-hyphens: none;\n\t-moz-hyphens: none;\n\t-ms-hyphens: none;\n\thyphens: none;\n}\n\npre[class*="language-"]::-moz-selection, pre[class*="language-"] ::-moz-selection,\ncode[class*="language-"]::-moz-selection, code[class*="language-"] ::-moz-selection {\n\ttext-shadow: none;\n\tbackground: #b3d4fc;\n}\n\npre[class*="language-"]::selection, pre[class*="language-"] ::selection,\ncode[class*="language-"]::selection, code[class*="language-"] ::selection {\n\ttext-shadow: none;\n\tbackground: #b3d4fc;\n}\n\n@media print {\n\tcode[class*="language-"],\n\tpre[class*="language-"] {\n\t\ttext-shadow: none;\n\t}\n}\n\n/* Code blocks */\npre[class*="language-"] {\n\tpadding: 1em;\n\tmargin: .5em 0;\n\toverflow: auto;\n}\n\n:not(pre) > code[class*="language-"],\npre[class*="language-"] {\n\tbackground: #f5f2f0;\n}\n\n/* Inline code */\n:not(pre) > code[class*="language-"] {\n\tpadding: .1em;\n\tborder-radius: .3em;\n\twhite-space: normal;\n}\n\n.token.comment,\n.token.prolog,\n.token.doctype,\n.token.cdata {\n\tcolor: slategray;\n}\n\n.token.punctuation {\n\tcolor: #999;\n}\n\n.token.namespace {\n\topacity: .7;\n}\n\n.token.property,\n.token.tag,\n.token.boolean,\n.token.number,\n.token.constant,\n.token.symbol,\n.token.deleted {\n\tcolor: #905;\n}\n\n.token.selector,\n.token.attr-name,\n.token.string,\n.token.char,\n.token.builtin,\n.token.inserted {\n\tcolor: #690;\n}\n\n.token.operator,\n.token.entity,\n.token.url,\n.language-css .token.string,\n.style .token.string {\n\tcolor: #9a6e3a;\n\tbackground: hsla(0, 0%, 100%, .5);\n}\n\n.token.atrule,\n.token.attr-value,\n.token.keyword {\n\tcolor: #07a;\n}\n\n.token.function,\n.token.class-name {\n\tcolor: #DD4A68;\n}\n\n.token.regex,\n.token.important,\n.token.variable {\n\tcolor: #e90;\n}\n\n.token.important,\n.token.bold {\n\tfont-weight: bold;\n}\n.token.italic {\n\tfont-style: italic;\n}\n\n.token.entity {\n\tcursor: help;\n}\n'}\n</style>\n\n<code id="code-container"></code>\n\n`);class go extends(Dr(fo(HTMLElement))){renderContent(){if(this.languageName=this.getAttribute("language"),!this.languageName)return void console.warn('You need to provide a language attribute to your <d-code> block to let us know how to highlight your code; e.g.:\n <d-code language="python">zeros = np.zeros(shape)</d-code>.');const n=po.languages[this.languageName];if(n==undefined)return void console.warn(`Distill does not yet support highlighting your code block in "${this.languageName}'.`);let t=this.textContent;const e=this.shadowRoot.querySelector("#code-container");if(this.hasAttribute("block")){const n=(t=t.replace(/\n/,"")).match(/\s*/);if(t=(t=t.replace(new RegExp("\n"+n,"g"),"\n")).trim(),e.parentNode instanceof ShadowRoot){const n=document.createElement("pre");this.shadowRoot.removeChild(e),n.appendChild(e),this.shadowRoot.appendChild(n)}}e.className=`language-${this.languageName}`,e.innerHTML=po.highlight(t,n)}}
// Copyright 2018 The Distill Template Authors
const mo=Or("d-footnote",'\n<style>\n\nd-math[block] {\n  display: block;\n}\n\n:host {\n\n}\n\nsup {\n  line-height: 1em;\n  font-size: 0.75em;\n  position: relative;\n  top: -.5em;\n  vertical-align: baseline;\n}\n\nspan {\n  color: hsla(206, 90%, 20%, 0.7);\n  cursor: default;\n}\n\n.footnote-container {\n  padding: 10px;\n}\n\n</style>\n\n<d-hover-box>\n  <div class="footnote-container">\n    <slot id="slot"></slot>\n  </div>\n</d-hover-box>\n\n<sup>\n  <span id="fn-" data-hover-ref=""></span>\n</sup>\n\n');class bo extends(mo(HTMLElement)){constructor(){super();const n={childList:!0,characterData:!0,subtree:!0};new MutationObserver(this.notify).observe(this,n)}notify(){const n=new CustomEvent("onFootnoteChanged",{detail:this,bubbles:!0});document.dispatchEvent(n)}connectedCallback(){this.hoverBox=this.root.querySelector("d-hover-box"),window.customElements.whenDefined("d-hover-box").then(()=>{this.hoverBox.listen(this)}),bo.currentFootnoteId+=1;const n=bo.currentFootnoteId.toString();this.root.host.id="d-footnote-"+n;const t="dt-fn-hover-box-"+n;this.hoverBox.id=t;const e=this.root.querySelector("#fn-");e.setAttribute("id","fn-"+n),e.setAttribute("data-hover-ref",t),e.textContent=n}}bo.currentFootnoteId=0;
// Copyright 2018 The Distill Template Authors
const yo=Or("d-footnote-list","\n<style>\n\nd-footnote-list {\n  contain: layout style;\n}\n\nd-footnote-list > * {\n  grid-column: text;\n}\n\nd-footnote-list a.footnote-backlink {\n  color: rgba(0,0,0,0.3);\n  padding-left: 0.5em;\n}\n\n</style>\n\n<h3>Footnotes</h3>\n<ol></ol>\n",!1);class vo extends(yo(HTMLElement)){connectedCallback(){super.connectedCallback(),this.list=this.root.querySelector("ol"),this.root.style.display="none"}set footnotes(n){if(this.list.innerHTML="",n.length){this.root.style.display="";for(const t of n){const n=document.createElement("li");n.id=t.id+"-listing",n.innerHTML=t.innerHTML;const e=document.createElement("a");e.setAttribute("class","footnote-backlink"),e.textContent="[\u21a9]",e.href="#"+t.id,n.appendChild(e),this.list.appendChild(n)}}else this.root.style.display="none"}}
// Copyright 2018 The Distill Template Authors
const wo=Or("d-hover-box",'\n<style>\n\n:host {\n  position: absolute;\n  width: 100%;\n  left: 0px;\n  z-index: 10000;\n  display: none;\n  white-space: normal\n}\n\n.container {\n  position: relative;\n  width: 704px;\n  max-width: 100vw;\n  margin: 0 auto;\n}\n\n.panel {\n  position: absolute;\n  font-size: 1rem;\n  line-height: 1.5em;\n  top: 0;\n  left: 0;\n  width: 100%;\n  border: 1px solid rgba(0, 0, 0, 0.1);\n  background-color: rgba(250, 250, 250, 0.95);\n  box-shadow: 0 0 7px rgba(0, 0, 0, 0.1);\n  border-radius: 4px;\n  box-sizing: border-box;\n\n  backdrop-filter: blur(2px);\n  -webkit-backdrop-filter: blur(2px);\n}\n\n</style>\n\n<div class="container">\n  <div class="panel">\n    <slot></slot>\n  </div>\n</div>\n');class xo extends(wo(HTMLElement)){constructor(){super()}connectedCallback(){}listen(n){this.bindDivEvents(this),this.bindTriggerEvents(n)}bindDivEvents(n){n.addEventListener("mouseover",()=>{this.visible||this.showAtNode(n),this.stopTimeout()}),n.addEventListener("mouseout",()=>{this.extendTimeout(500)}),n.addEventListener("touchstart",n=>{n.stopPropagation()},{passive:!0}),document.body.addEventListener("touchstart",()=>{this.hide()},{passive:!0})}bindTriggerEvents(n){n.addEventListener("mouseover",()=>{this.visible||this.showAtNode(n),this.stopTimeout()}),n.addEventListener("mouseout",()=>{this.extendTimeout(300)}),n.addEventListener("touchstart",t=>{this.visible?this.hide():this.showAtNode(n),t.stopPropagation()},{passive:!0})}show(n){this.visible=!0,this.style.display="block",this.style.top=Math.round(n[1]+10)+"px"}showAtNode(n){const t=n.getBoundingClientRect();this.show([n.offsetLeft+t.width,n.offsetTop+t.height])}hide(){this.visible=!1,this.style.display="none",this.stopTimeout()}stopTimeout(){this.timeout&&clearTimeout(this.timeout)}extendTimeout(n){this.stopTimeout(),this.timeout=setTimeout(()=>{this.hide()},n)}}
// Copyright 2018 The Distill Template Authors
class ko extends HTMLElement{static get is(){return"d-title"}}
// Copyright 2018 The Distill Template Authors
const So=Or("d-references","\n<style>\nd-references {\n  display: block;\n}\n</style>\n",!1);class Mo extends(So(HTMLElement)){}
// Copyright 2018 The Distill Template Authors
class To extends HTMLElement{static get is(){return"d-toc"}connectedCallback(){this.getAttribute("prerendered")||(window.onload=(()=>{k(this,document.querySelector("d-article").querySelectorAll("h2, h3"))}))}}class _o extends HTMLElement{static get is(){return"d-figure"}static get readyQueue(){return _o._readyQueue||(_o._readyQueue=[]),_o._readyQueue}static addToReadyQueue(n){-1===_o.readyQueue.indexOf(n)&&(_o.readyQueue.push(n),_o.runReadyQueue())}static runReadyQueue(){const n=_o.readyQueue.sort((n,t)=>n._seenOnScreen-t._seenOnScreen).filter(n=>!n._ready).pop();n&&(n.ready(),requestAnimationFrame(_o.runReadyQueue))}constructor(){super(),this._ready=!1,this._onscreen=!1,this._offscreen=!0}connectedCallback(){this.loadsWhileScrolling=this.hasAttribute("loadsWhileScrolling"),_o.marginObserver.observe(this),_o.directObserver.observe(this)}disconnectedCallback(){_o.marginObserver.unobserve(this),_o.directObserver.unobserve(this)}static get marginObserver(){if(!_o._marginObserver){const n=window.innerHeight,t=Math.floor(2*n),e={rootMargin:t+"px 0px "+t+"px 0px",threshold:.01},i=_o.didObserveMarginIntersection,r=new IntersectionObserver(i,e);_o._marginObserver=r}return _o._marginObserver}static didObserveMarginIntersection(n){for(const t of n){const n=t.target;t.isIntersecting&&!n._ready&&_o.addToReadyQueue(n)}}static get directObserver(){return _o._directObserver||(_o._directObserver=new IntersectionObserver(_o.didObserveDirectIntersection,{rootMargin:"0px",threshold:[0,1]})),_o._directObserver}static didObserveDirectIntersection(n){for(const t of n){const n=t.target;t.isIntersecting?(n._seenOnScreen=new Date,n._offscreen&&n.onscreen()):n._onscreen&&n.offscreen()}}addEventListener(n,t){super.addEventListener(n,t),"ready"===n&&-1!==_o.readyQueue.indexOf(this)&&(this._ready=!1,_o.runReadyQueue()),"onscreen"===n&&this.onscreen()}ready(){this._ready=!0,_o.marginObserver.unobserve(this);const n=new CustomEvent("ready");this.dispatchEvent(n)}onscreen(){this._onscreen=!0,this._offscreen=!1;const n=new CustomEvent("onscreen");this.dispatchEvent(n)}offscreen(){this._onscreen=!1,this._offscreen=!0;const n=new CustomEvent("offscreen");this.dispatchEvent(n)}}if("undefined"!=typeof window){let n;_o.isScrolling=!1;const t=()=>{_o.isScrolling=!0,clearTimeout(n),n=setTimeout(()=>{_o.isScrolling=!1,_o.runReadyQueue()},500)};window.addEventListener("scroll",t,!0)}
// Copyright 2018 The Distill Template Authors
const Co="distill.pub",Ao=Or("d-interstitial",'\n<style>\n\n.overlay {\n  position: fixed;\n  width: 100%;\n  height: 100%;\n  top: 0;\n  left: 0;\n  background: white;\n\n  opacity: 1;\n  visibility: visible;\n\n  display: flex;\n  flex-flow: column;\n  justify-content: center;\n  z-index: 2147483647 /* MaxInt32 */\n\n}\n\n.container {\n  position: relative;\n  margin-left: auto;\n  margin-right: auto;\n  max-width: 420px;\n  padding: 2em;\n}\n\nh1 {\n  text-decoration: underline;\n  text-decoration-color: hsl(0,100%,40%);\n  -webkit-text-decoration-color: hsl(0,100%,40%);\n  margin-bottom: 1em;\n  line-height: 1.5em;\n}\n\ninput[type="password"] {\n  -webkit-appearance: none;\n  -moz-appearance: none;\n  appearance: none;\n  -webkit-box-shadow: none;\n  -moz-box-shadow: none;\n  box-shadow: none;\n  -webkit-border-radius: none;\n  -moz-border-radius: none;\n  -ms-border-radius: none;\n  -o-border-radius: none;\n  border-radius: none;\n  outline: none;\n\n  font-size: 18px;\n  background: none;\n  width: 25%;\n  padding: 10px;\n  border: none;\n  border-bottom: solid 2px #999;\n  transition: border .3s;\n}\n\ninput[type="password"]:focus {\n  border-bottom: solid 2px #333;\n}\n\ninput[type="password"].wrong {\n  border-bottom: solid 2px hsl(0,100%,40%);\n}\n\np small {\n  color: #888;\n}\n\n.logo {\n  position: relative;\n  font-size: 1.5em;\n  margin-bottom: 3em;\n}\n\n.logo svg {\n  width: 36px;\n  position: relative;\n  top: 6px;\n  margin-right: 2px;\n}\n\n.logo svg path {\n  fill: none;\n  stroke: black;\n  stroke-width: 2px;\n}\n\n</style>\n\n<div class="overlay">\n  <div class="container">\n    <h1>This article is in review.</h1>\n    <p>Do not share this URL or the contents of this article. Thank you!</p>\n    <input id="interstitial-password-input" type="password" name="password" autofocus/>\n    <p><small>Enter the password we shared with you as part of the review process to view the article.</small></p>\n  </div>\n</div>\n');class Eo extends(Ao(HTMLElement)){connectedCallback(){if(this.shouldRemoveSelf())this.parentElement.removeChild(this);else{this.root.querySelector("#interstitial-password-input").oninput=(n=>this.passwordChanged(n))}}passwordChanged(n){n.target.value===this.password&&(console.log("Correct password entered."),this.parentElement.removeChild(this),"undefined"!=typeof Storage&&(console.log("Saved that correct password was entered."),localStorage.setItem(this.localStorageIdentifier(),"true")))}shouldRemoveSelf(){return window&&window.location.hostname===Co?(console.warn("Interstitial found on production, hiding it."),!0):"undefined"!=typeof Storage&&"true"===localStorage.getItem(this.localStorageIdentifier())&&(console.log("Loaded that correct password was entered before; skipping interstitial."),!0)}localStorageIdentifier(){const n="interstitial-password-correct";return"distill-drafts"+(window?window.location.pathname:"-")+n}}var No=M(S).right,Lo=Math.sqrt(50),Do=Math.sqrt(10),Oo=Math.sqrt(2),Io=.7,Fo=1/Io,Ro="\\s*([+-]?\\d+)\\s*",Uo="\\s*([+-]?\\d*\\.?\\d+(?:[eE][+-]?\\d+)?)\\s*",$o="\\s*([+-]?\\d*\\.?\\d+(?:[eE][+-]?\\d+)?)%\\s*",Po=/^#([0-9a-f]{3,8})$/,Ho=new RegExp("^rgb\\("+[Ro,Ro,Ro]+"\\)$"),zo=new RegExp("^rgb\\("+[$o,$o,$o]+"\\)$"),qo=new RegExp("^rgba\\("+[Ro,Ro,Ro,Uo]+"\\)$"),jo=new RegExp("^rgba\\("+[$o,$o,$o,Uo]+"\\)$"),Bo=new RegExp("^hsl\\("+[Uo,$o,$o]+"\\)$"),Yo=new RegExp("^hsla\\("+[Uo,$o,$o,Uo]+"\\)$"),Wo={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074};L(O,U,{copy:function(n){return Object.assign(new this.constructor,this,n)},displayable:function(){return this.rgb().displayable()},hex:I,formatHex:I,formatHsl:F,formatRgb:R,toString:R}),L(q,z,D(O,{brighter:function(n){return n=null==n?Fo:Math.pow(Fo,n),new q(this.r*n,this.g*n,this.b*n,this.opacity)},darker:function(n){return n=null==n?Io:Math.pow(Io,n),new q(this.r*n,this.g*n,this.b*n,this.opacity)},rgb:function(){return this},displayable:function(){return-.5<=this.r&&this.r<255.5&&-.5<=this.g&&this.g<255.5&&-.5<=this.b&&this.b<255.5&&0<=this.opacity&&this.opacity<=1},hex:j,formatHex:j,formatRgb:B,toString:B})),L(K,V,D(O,{brighter:function(n){return n=null==n?Fo:Math.pow(Fo,n),new K(this.h,this.s,this.l*n,this.opacity)},darker:function(n){return n=null==n?Io:Math.pow(Io,n),new K(this.h,this.s,this.l*n,this.opacity)},rgb:function(){var n=this.h%360+360*(this.h<0),t=isNaN(n)||isNaN(this.s)?0:this.s,e=this.l,i=e+(e<.5?e:1-e)*t,r=2*e-i;return new q(X(n>=240?n-240:n+120,r,i),X(n,r,i),X(n<120?n+240:n-120,r,i),this.opacity)},displayable:function(){return(0<=this.s&&this.s<=1||isNaN(this.s))&&0<=this.l&&this.l<=1&&0<=this.opacity&&this.opacity<=1},formatHsl:function(){var n=this.opacity;return(1===(n=isNaN(n)?1:Math.max(0,Math.min(1,n)))?"hsl(":"hsla(")+(this.h||0)+", "+100*(this.s||0)+"%, "+100*(this.l||0)+"%"+(1===n?")":", "+n+")")}}));var Go=Math.PI/180,Vo=180/Math.PI,Ko=18,Xo=.96422,Zo=1,Qo=.82521,Jo=4/29,na=6/29,ta=3*na*na,ea=na*na*na;L(J,Q,D(O,{brighter:function(n){return new J(this.l+Ko*(null==n?1:n),this.a,this.b,this.opacity)},darker:function(n){return new J(this.l-Ko*(null==n?1:n),this.a,this.b,this.opacity)},rgb:function(){var n=(this.l+16)/116,t=isNaN(this.a)?n:n+this.a/500,e=isNaN(this.b)?n:n-this.b/200;return new q(en(3.1338561*(t=Xo*tn(t))-1.6168667*(n=Zo*tn(n))-.4906146*(e=Qo*tn(e))),en(-.9787684*t+1.9161415*n+.033454*e),en(.0719453*t-.2289914*n+1.4052427*e),this.opacity)}})),L(sn,an,D(O,{brighter:function(n){return new sn(this.h,this.c,this.l+Ko*(null==n?1:n),this.opacity)},darker:function(n){return new sn(this.h,this.c,this.l-Ko*(null==n?1:n),this.opacity)},rgb:function(){return ln(this).rgb()}}));var ia=-.14861,ra=1.78277,oa=-.29227,aa=-.90649,sa=1.97294,la=sa*aa,ua=sa*ra,ca=ra*oa-aa*ia;L(dn,cn,D(O,{brighter:function(n){return n=null==n?Fo:Math.pow(Fo,n),new dn(this.h,this.s,this.l*n,this.opacity)},darker:function(n){return n=null==n?Io:Math.pow(Io,n),new dn(this.h,this.s,this.l*n,this.opacity)},rgb:function(){var n=isNaN(this.h)?0:(this.h+120)*Go,t=+this.l,e=isNaN(this.s)?0:this.s*t*(1-t),i=Math.cos(n),r=Math.sin(n);return new q(255*(t+e*(ia*i+ra*r)),255*(t+e*(oa*i+aa*r)),255*(t+e*(sa*i)),this.opacity)}}));var da,ha=function gs(n){function t(n,t){var i=e((n=z(n)).r,(t=z(t)).r),r=e(n.g,t.g),o=e(n.b,t.b),a=mn(n.opacity,t.opacity);return function(t){return n.r=i(t),n.g=r(t),n.b=o(t),n.opacity=a(t),n+""}}var e=gn(n);return t.gamma=gs,t}(1),pa=/[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g,fa=new RegExp(pa.source,"g"),ga=[0,1],ma=/^(?:(.)?([<>=^]))?([+\-( ])?([$#])?(0)?(\d+)?(,)?(\.\d+)?(~)?([a-z%])?$/i;qn.prototype=jn.prototype,jn.prototype.toString=function(){return this.fill+this.align+this.sign+this.symbol+(this.zero?"0":"")+(this.width===undefined?"":Math.max(1,0|this.width))+(this.comma?",":"")+(this.precision===undefined?"":"."+Math.max(0,0|this.precision))+(this.trim?"~":"")+this.type};var ba,ya,va,wa={"%":function(n,t){return(100*n).toFixed(t)},b:function(n){return Math.round(n).toString(2)},c:function(n){return n+""},d:function(n){return Math.round(n).toString(10)},e:function(n,t){return n.toExponential(t)},f:function(n,t){return n.toFixed(t)},g:function(n,t){return n.toPrecision(t)},o:function(n){return Math.round(n).toString(8)},p:function(n,t){return Wn(100*n,t)},r:Wn,s:Yn,X:function(n){return Math.round(n).toString(16).toUpperCase()},x:function(n){return Math.round(n).toString(16)}},xa=Array.prototype.map,ka=["y","z","a","f","p","n","\xb5","m","","k","M","G","T","P","E","Z","Y"];Kn({decimal:".",thousands:",",grouping:[3],currency:["$",""],minus:"-"});var Sa=new Date,Ma=new Date,Ta=et(function(){},function(n,t){n.setTime(+n+t)},function(n,t){return t-n});Ta.every=function(n){return n=Math.floor(n),isFinite(n)&&n>0?n>1?et(function(t){t.setTime(Math.floor(t/n)*n)},function(t,e){t.setTime(+t+e*n)},function(t,e){return(e-t)/n}):Ta:null};var _a=1e3,Ca=6e4,Aa=36e5,Ea=864e5,Na=6048e5,La=(et(function(n){n.setTime(n-n.getMilliseconds())},function(n,t){n.setTime(+n+t*_a)},function(n,t){return(t-n)/_a},function(n){return n.getUTCSeconds()}),et(function(n){n.setTime(n-n.getMilliseconds()-n.getSeconds()*_a)},function(n,t){n.setTime(+n+t*Ca)},function(n,t){return(t-n)/Ca},function(n){return n.getMinutes()}),et(function(n){n.setTime(n-n.getMilliseconds()-n.getSeconds()*_a-n.getMinutes()*Ca)},function(n,t){n.setTime(+n+t*Aa)},function(n,t){return(t-n)/Aa},function(n){return n.getHours()}),et(function(n){n.setHours(0,0,0,0)},function(n,t){n.setDate(n.getDate()+t)},function(n,t){return(t-n-(t.getTimezoneOffset()-n.getTimezoneOffset())*Ca)/Ea},function(n){return n.getDate()-1})),Da=it(0),Oa=it(1),Ia=(it(2),it(3),it(4)),Fa=(it(5),it(6),et(function(n){n.setDate(1),n.setHours(0,0,0,0)},function(n,t){n.setMonth(n.getMonth()+t)},function(n,t){return t.getMonth()-n.getMonth()+12*(t.getFullYear()-n.getFullYear())},function(n){return n.getMonth()}),et(function(n){n.setMonth(0,1),n.setHours(0,0,0,0)},function(n,t){n.setFullYear(n.getFullYear()+t)},function(n,t){return t.getFullYear()-n.getFullYear()},function(n){return n.getFullYear()}));Fa.every=function(n){return isFinite(n=Math.floor(n))&&n>0?et(function(t){t.setFullYear(Math.floor(t.getFullYear()/n)*n),t.setMonth(0,1),t.setHours(0,0,0,0)},function(t,e){t.setFullYear(t.getFullYear()+e*n)}):null};et(function(n){n.setUTCSeconds(0,0)},function(n,t){n.setTime(+n+t*Ca)},function(n,t){return(t-n)/Ca},function(n){return n.getUTCMinutes()}),et(function(n){n.setUTCMinutes(0,0,0)},function(n,t){n.setTime(+n+t*Aa)},function(n,t){return(t-n)/Aa},function(n){return n.getUTCHours()});var Ra=et(function(n){n.setUTCHours(0,0,0,0)},function(n,t){n.setUTCDate(n.getUTCDate()+t)},function(n,t){return(t-n)/Ea},function(n){return n.getUTCDate()-1}),Ua=rt(0),$a=rt(1),Pa=(rt(2),rt(3),rt(4)),Ha=(rt(5),rt(6),et(function(n){n.setUTCDate(1),n.setUTCHours(0,0,0,0)},function(n,t){n.setUTCMonth(n.getUTCMonth()+t)},function(n,t){return t.getUTCMonth()-n.getUTCMonth()+12*(t.getUTCFullYear()-n.getUTCFullYear())},function(n){return n.getUTCMonth()}),et(function(n){n.setUTCMonth(0,1),n.setUTCHours(0,0,0,0)},function(n,t){n.setUTCFullYear(n.getUTCFullYear()+t)},function(n,t){return t.getUTCFullYear()-n.getUTCFullYear()},function(n){return n.getUTCFullYear()}));Ha.every=function(n){return isFinite(n=Math.floor(n))&&n>0?et(function(t){t.setUTCFullYear(Math.floor(t.getUTCFullYear()/n)*n),t.setUTCMonth(0,1),t.setUTCHours(0,0,0,0)},function(t,e){t.setUTCFullYear(t.getUTCFullYear()+e*n)}):null};var za,qa,ja,Ba={"-":"",_:" ",0:"0"},Ya=/^\s*\d+/,Wa=/^%/,Ga=/[\\^$*+?|[\]().{}]/g;me({dateTime:"%x, %X",date:"%-m/%-d/%Y",time:"%-I:%M:%S %p",periods:["AM","PM"],days:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],shortDays:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],months:["January","February","March","April","May","June","July","August","September","October","November","December"],shortMonths:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]});var Va="%Y-%m-%dT%H:%M:%S.%LZ",Ka=(Date.prototype.toISOString||qa(Va),+new Date("2000-01-01T00:00:00.000Z")||ja(Va),{value:function(){}});we.prototype=ve.prototype={constructor:we,on:function(n,t){var e,i=this._,r=xe(n+"",i),o=-1,a=r.length;if(!(arguments.length<2)){if(null!=t&&"function"!=typeof t)throw new Error("invalid callback: "+t);for(;++o<a;)if(e=(n=r[o]).type)i[e]=Se(i[e],n.name,t);else if(null==t)for(e in i)i[e]=Se(i[e],n.name,null);return this}for(;++o<a;)if((e=(n=r[o]).type)&&(e=ke(i[e],n.name)))return e},copy:function(){var n={},t=this._;for(var e in t)n[e]=t[e].slice();return new we(n)},call:function(n,t){if((e=arguments.length-2)>0)for(var e,i,r=new Array(e),o=0;o<e;++o)r[o]=arguments[o+2];if(!this._.hasOwnProperty(n))throw new Error("unknown type: "+n);for(o=0,e=(i=this._[n]).length;o<e;++o)i[o].value.apply(t,r)},apply:function(n,t,e){if(!this._.hasOwnProperty(n))throw new Error("unknown type: "+n);for(var i=this._[n],r=0,o=i.length;r<o;++r)i[r].value.apply(t,e)}};var Xa="http://www.w3.org/1999/xhtml",Za={svg:"http://www.w3.org/2000/svg",xhtml:Xa,xlink:"http://www.w3.org/1999/xlink",xml:"http://www.w3.org/XML/1998/namespace",xmlns:"http://www.w3.org/2000/xmlns/"};$e.prototype={constructor:$e,appendChild:function(n){return this._parent.insertBefore(n,this._next)},insertBefore:function(n,t){return this._parent.insertBefore(n,t)},querySelector:function(n){return this._parent.querySelector(n)},querySelectorAll:function(n){return this._parent.querySelectorAll(n)}};var Qa="$";wi.prototype={add:function(n){this._names.indexOf(n)<0&&(this._names.push(n),this._node.setAttribute("class",this._names.join(" ")))},remove:function(n){var t=this._names.indexOf(n);t>=0&&(this._names.splice(t,1),this._node.setAttribute("class",this._names.join(" ")))},contains:function(n){return this._names.indexOf(n)>=0}};var Ja={},ns=null;"undefined"!=typeof document&&("onmouseenter"in document.documentElement||(Ja={mouseenter:"mouseover",mouseleave:"mouseout"}));var ts=[null];or.prototype=ar.prototype={constructor:or,select:Ne,selectAll:Oe,filter:Fe,data:qe,enter:Ue,exit:je,join:Be,merge:Ye,order:We,sort:Ge,call:Ke,nodes:Xe,node:Ze,size:Qe,empty:Je,each:ni,attr:si,style:hi,property:bi,classed:_i,text:Ni,html:Ii,raise:Ri,lower:$i,append:Pi,insert:zi,remove:ji,clone:Wi,datum:Gi,on:Ji,dispatch:rr},br.prototype.on=function(){var n=this._.on.apply(this._,arguments);return n===this._?this:n};const es=Or("d-slider","\n<style>\n  :host {\n    position: relative;\n    display: inline-block;\n  }\n\n  :host(:focus) {\n    outline: none;\n  }\n\n  .background {\n    padding: 9px 0;\n    color: white;\n    position: relative;\n  }\n\n  .track {\n    height: 3px;\n    width: 100%;\n    border-radius: 2px;\n    background-color: hsla(0, 0%, 0%, 0.2);\n  }\n\n  .track-fill {\n    position: absolute;\n    top: 9px;\n    height: 3px;\n    border-radius: 4px;\n    background-color: hsl(24, 100%, 50%);\n  }\n\n  .knob-container {\n    position: absolute;\n    top: 10px;\n  }\n\n  .knob {\n    position: absolute;\n    top: -6px;\n    left: -6px;\n    width: 13px;\n    height: 13px;\n    background-color: hsl(24, 100%, 50%);\n    border-radius: 50%;\n    transition-property: transform;\n    transition-duration: 0.18s;\n    transition-timing-function: ease;\n  }\n  .mousedown .knob {\n    transform: scale(1.5);\n  }\n\n  .knob-highlight {\n    position: absolute;\n    top: -6px;\n    left: -6px;\n    width: 13px;\n    height: 13px;\n    background-color: hsla(0, 0%, 0%, 0.1);\n    border-radius: 50%;\n    transition-property: transform;\n    transition-duration: 0.18s;\n    transition-timing-function: ease;\n  }\n\n  .focus .knob-highlight {\n    transform: scale(2);\n  }\n\n  .ticks {\n    position: absolute;\n    top: 16px;\n    height: 4px;\n    width: 100%;\n    z-index: -1;\n  }\n\n  .ticks .tick {\n    position: absolute;\n    height: 100%;\n    border-left: 1px solid hsla(0, 0%, 0%, 0.2);\n  }\n\n</style>\n\n  <div class='background'>\n    <div class='track'></div>\n    <div class='track-fill'></div>\n    <div class='knob-container'>\n      <div class='knob-highlight'></div>\n      <div class='knob'></div>\n    </div>\n    <div class='ticks'></div>\n  </div>\n"),is={left:37,up:38,right:39,down:40,pageUp:33,pageDown:34,end:35,home:36};class rs extends(es(HTMLElement)){connectedCallback(){this.connected=!0,this.setAttribute("role","slider"),this.hasAttribute("tabindex")||this.setAttribute("tabindex",0),this.mouseEvent=!1,this.knob=this.root.querySelector(".knob-container"),this.background=this.root.querySelector(".background"),this.trackFill=this.root.querySelector(".track-fill"),this.track=this.root.querySelector(".track"),this.min=this.min?this.min:0,this.max=this.max?this.max:100,this.scale=tt().domain([this.min,this.max]).range([0,1]).clamp(!0),this.origin=this.origin!==undefined?this.origin:this.min,this.step=this.step?this.step:1,this.update(this.value?this.value:0),this.ticks=!!this.ticks&&this.ticks,this.renderTicks(),this.drag=kr().container(this.background).on("start",()=>{this.mouseEvent=!0,this.background.classList.add("mousedown"),this.changeValue=this.value,this.dragUpdate()}).on("drag",()=>{this.dragUpdate()}).on("end",()=>{this.mouseEvent=!1,this.background.classList.remove("mousedown"),this.dragUpdate(),this.changeValue!==this.value&&this.dispatchChange(),this.changeValue=this.value}),this.drag(sr(this.background)),this.addEventListener("focusin",()=>{this.mouseEvent||this.background.classList.add("focus")}),this.addEventListener("focusout",()=>{this.background.classList.remove("focus")}),this.addEventListener("keydown",this.onKeyDown)}static get observedAttributes(){return["min","max","value","step","ticks","origin","tickValues","tickLabels"]}attributeChangedCallback(n,t,e){isNaN(e)||e===undefined||null===e||("min"==n&&(this.min=+e,this.setAttribute("aria-valuemin",this.min)),"max"==n&&(this.max=+e,this.setAttribute("aria-valuemax",this.max)),"value"==n&&this.update(+e),"origin"==n&&(this.origin=+e),"step"==n&&e>0&&(this.step=+e),"ticks"==n&&(this.ticks=""===e||e))}onKeyDown(n){this.changeValue=this.value;let t=!1;switch(n.keyCode){case is.left:case is.down:this.update(this.value-this.step),t=!0;break;case is.right:case is.up:this.update(this.value+this.step),t=!0;break;case is.pageUp:case is.pageDown:this.update(this.value+10*this.step),t=!0;break;case is.home:this.update(this.min),t=!0;break;case is.end:this.update(this.max),t=!0}t&&(this.background.classList.add("focus"),n.preventDefault(),n.stopPropagation(),this.changeValue!==this.value&&this.dispatchChange())}validateValueRange(n,t,e){return Math.max(Math.min(t,e),n)}quantizeValue(n,t){return Math.round(n/t)*t}dragUpdate(){const n=this.background.getBoundingClientRect(),t=ns.x,e=n.width;this.update(this.scale.invert(t/e))}update(n){let t=n;"any"!==this.step&&(t=this.quantizeValue(n,this.step)),t=this.validateValueRange(this.min,this.max,t),this.connected&&(this.knob.style.left=100*this.scale(t)+"%",this.trackFill.style.width=100*this.scale(this.min+Math.abs(t-this.origin))+"%",this.trackFill.style.left=100*this.scale(Math.min(t,this.origin))+"%"),this.value!==t&&(this.value=t,this.setAttribute("aria-valuenow",this.value),this.dispatchInput())}dispatchChange(){const n=new Event("change");this.dispatchEvent(n,{})}dispatchInput(){const n=new Event("input");this.dispatchEvent(n,{})}renderTicks(){const n=this.root.querySelector(".ticks");if(!1!==this.ticks){let t=[];(t=this.ticks>0?this.scale.ticks(this.ticks):"any"===this.step?this.scale.ticks():_(this.min,this.max+1e-6,this.step)).forEach(t=>{const e=document.createElement("div");e.classList.add("tick"),e.style.left=100*this.scale(t)+"%",n.appendChild(e)})}else n.style.display="none"}}var os='<svg viewBox="-607 419 64 64">\n  <path d="M-573.4,478.9c-8,0-14.6-6.4-14.6-14.5s14.6-25.9,14.6-40.8c0,14.9,14.6,32.8,14.6,40.8S-565.4,478.9-573.4,478.9z"/>\n</svg>\n';const as=Or("distill-header",`\n<style>\ndistill-header {\n  position: relative;\n  height: 60px;\n  background-color: hsl(200, 60%, 15%);\n  width: 100%;\n  box-sizing: border-box;\n  z-index: 2;\n  color: rgba(0, 0, 0, 0.8);\n  border-bottom: 1px solid rgba(0, 0, 0, 0.08);\n  box-shadow: 0 1px 6px rgba(0, 0, 0, 0.05);\n}\ndistill-header .content {\n  height: 70px;\n  grid-column: page;\n}\ndistill-header a {\n  font-size: 16px;\n  height: 60px;\n  line-height: 60px;\n  text-decoration: none;\n  color: rgba(255, 255, 255, 0.8);\n  padding: 22px 0;\n}\ndistill-header a:hover {\n  color: rgba(255, 255, 255, 1);\n}\ndistill-header svg {\n  width: 24px;\n  position: relative;\n  top: 4px;\n  margin-right: 2px;\n}\n@media(min-width: 1080px) {\n  distill-header {\n    height: 70px;\n  }\n  distill-header a {\n    height: 70px;\n    line-height: 70px;\n    padding: 28px 0;\n  }\n  distill-header .logo {\n  }\n}\ndistill-header svg path {\n  fill: none;\n  stroke: rgba(255, 255, 255, 0.8);\n  stroke-width: 3px;\n}\ndistill-header .logo {\n  font-size: 17px;\n  font-weight: 200;\n}\ndistill-header .nav {\n  float: right;\n  font-weight: 300;\n}\ndistill-header .nav a {\n  font-size: 12px;\n  margin-left: 24px;\n  text-transform: uppercase;\n}\n</style>\n<div class="content">\n  <a href="/" class="logo">\n    ${os}\n    Distill\n  </a>\n  <nav class="nav">\n    <a href="/about/">About</a>\n    <a href="/prize/">Prize</a>\n    <a href="/journal/">Submit</a>\n  </nav>\n</div>\n`,!1);
// Copyright 2018 The Distill Template Authors
class ss extends(as(HTMLElement)){}
// Copyright 2018 The Distill Template Authors
const ls="\n<style>\n  distill-appendix {\n    contain: layout style;\n  }\n\n  distill-appendix .citation {\n    font-size: 11px;\n    line-height: 15px;\n    border-left: 1px solid rgba(0, 0, 0, 0.1);\n    padding-left: 18px;\n    border: 1px solid rgba(0,0,0,0.1);\n    background: rgba(0, 0, 0, 0.02);\n    padding: 10px 18px;\n    border-radius: 3px;\n    color: rgba(150, 150, 150, 1);\n    overflow: hidden;\n    margin-top: -12px;\n    white-space: pre-wrap;\n    word-wrap: break-word;\n  }\n\n  distill-appendix > * {\n    grid-column: text;\n  }\n</style>\n";class us extends HTMLElement{static get is(){return"distill-appendix"}set frontMatter(n){this.innerHTML=Sr(n)}}const cs=Or("distill-footer",`\n<style>\n\n:host {\n  color: rgba(255, 255, 255, 0.5);\n  font-weight: 300;\n  padding: 2rem 0;\n  border-top: 1px solid rgba(0, 0, 0, 0.1);\n  background-color: hsl(180, 5%, 15%); /*hsl(200, 60%, 15%);*/\n  text-align: left;\n  contain: content;\n}\n\n.footer-container .logo svg {\n  width: 24px;\n  position: relative;\n  top: 4px;\n  margin-right: 2px;\n}\n\n.footer-container .logo svg path {\n  fill: none;\n  stroke: rgba(255, 255, 255, 0.8);\n  stroke-width: 3px;\n}\n\n.footer-container .logo {\n  font-size: 17px;\n  font-weight: 200;\n  color: rgba(255, 255, 255, 0.8);\n  text-decoration: none;\n  margin-right: 6px;\n}\n\n.footer-container {\n  grid-column: text;\n}\n\n.footer-container .nav {\n  font-size: 0.9em;\n  margin-top: 1.5em;\n}\n\n.footer-container .nav a {\n  color: rgba(255, 255, 255, 0.8);\n  margin-right: 6px;\n  text-decoration: none;\n}\n\n</style>\n\n<div class='footer-container'>\n\n  <a href="/" class="logo">\n    ${os}\n    Distill\n  </a> is dedicated to clear explanations of machine learning\n\n  <div class="nav">\n    <a href="https://distill.pub/about/">About</a>\n    <a href="https://distill.pub/journal/">Submit</a>\n    <a href="https://distill.pub/prize/">Prize</a>\n    <a href="https://distill.pub/archive/">Archive</a>\n    <a href="https://distill.pub/rss.xml">RSS</a>\n    <a href="https://github.com/distillpub">GitHub</a>\n    <a href="https://twitter.com/distillpub">Twitter</a>\n    &nbsp;&nbsp;&nbsp;&nbsp; ISSN 2476-0757\n  </div>\n\n</div>\n\n`);
// Copyright 2018 The Distill Template Authors
class ds extends(cs(HTMLElement)){}
// Copyright 2018 The Distill Template Authors
let hs=!1,ps=0;const fs=function(){if(window.distill.runlevel<1)throw new Error("Insufficient Runlevel for Distill Template!");if("distill"in window&&window.distill.templateIsLoading)throw new Error("Runlevel 1: Distill Template is getting loaded more than once, aborting!");window.distill.templateIsLoading=!0,console.debug("Runlevel 1: Distill Template has started loading."),p(document),console.debug("Runlevel 1: Static Distill styles have been added."),console.debug("Runlevel 1->2."),window.distill.runlevel+=1;for(const[n,t]of Object.entries(Vr.listeners))"function"==typeof t?document.addEventListener(n,t):console.error("Runlevel 2: Controller listeners need to be functions!");console.debug("Runlevel 2: We can now listen to controller events."),console.debug("Runlevel 2->3."),window.distill.runlevel+=1;const n=[Jr,to,io,ao,so,uo,ho,go,bo,vo,Wr,xo,ko,Yr,Mo,To,_o,rs,Eo],t=[ss,us,ds];if(window.distill.runlevel<2)throw new Error("Insufficient Runlevel for adding custom elements!");const e=n.concat(t);for(const n of e)console.debug("Runlevel 2: Registering custom element: "+n.is),customElements.define(n.is,n);console.debug("Runlevel 3: Distill Template finished registering custom elements."),console.debug("Runlevel 3->4."),window.distill.runlevel+=1,u()&&Vr.listeners.DOMContentLoaded(),console.debug("Runlevel 4: Distill Template initialisation complete."),window.distill.templateIsLoading=!1,window.distill.templateHasLoaded=!0};window.distill={runlevel:ps,initialize:fs,templateIsLoading:hs},Zr.browserSupportsAllFeatures()?(console.debug("Runlevel 0: No need for polyfills."),console.debug("Runlevel 0->1."),window.distill.runlevel+=1,window.distill.initialize()):(console.debug("Runlevel 0: Distill Template is loading polyfills."),Zr.load(window.distill.initialize))});
=======
(function (factory) {
  typeof define === "function" && define.amd ? define(factory) : factory();
})(function () {
  "use strict";

  // Copyright 2018 The Distill Template Authors
  //
  // Licensed under the Apache License, Version 2.0 (the "License");
  // you may not use this file except in compliance with the License.
  // You may obtain a copy of the License at
  //
  //      http://www.apache.org/licenses/LICENSE-2.0
  //
  // Unless required by applicable law or agreed to in writing, software
  // distributed under the License is distributed on an "AS IS" BASIS,
  // WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  // See the License for the specific language governing permissions and
  // limitations under the License.

  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const months = ["Jan.", "Feb.", "March", "April", "May", "June", "July", "Aug.", "Sept.", "Oct.", "Nov.", "Dec."];
  const zeroPad = (n) => (n < 10 ? "0" + n : n);

  const RFC = function (date) {
    const day = days[date.getDay()].substring(0, 3);
    const paddedDate = zeroPad(date.getDate());
    const month = months[date.getMonth()].substring(0, 3);
    const year = date.getFullYear().toString();
    const hours = date.getUTCHours().toString();
    const minutes = date.getUTCMinutes().toString();
    const seconds = date.getUTCSeconds().toString();
    return `${day}, ${paddedDate} ${month} ${year} ${hours}:${minutes}:${seconds} Z`;
  };

  const objectFromMap = function (map) {
    const object = Array.from(map).reduce(
      (object, [key, value]) => Object.assign(object, { [key]: value }), // Be careful! Maps can have non-String keys; object literals can't.
      {}
    );
    return object;
  };

  const mapFromObject = function (object) {
    const map = new Map();
    for (var property in object) {
      if (object.hasOwnProperty(property)) {
        map.set(property, object[property]);
      }
    }
    return map;
  };

  class Author {
    // constructor(name='', personalURL='', affiliation='', affiliationURL='') {
    //   this.name = name; // 'Chris Olah'
    //   this.personalURL = personalURL; // 'https://colah.github.io'
    //   this.affiliation = affiliation; // 'Google Brain'
    //   this.affiliationURL = affiliationURL; // 'https://g.co/brain'
    // }

    constructor(object) {
      this.name = object.author; // 'Chris Olah'
      this.personalURL = object.authorURL; // 'https://colah.github.io'
      this.affiliation = object.affiliation; // 'Google Brain'
      this.affiliationURL = object.affiliationURL; // 'https://g.co/brain'
      this.affiliations = object.affiliations || []; // new-style affiliations
    }

    // 'Chris'
    get firstName() {
      const names = this.name.split(" ");
      return names.slice(0, names.length - 1).join(" ");
    }

    // 'Olah'
    get lastName() {
      const names = this.name.split(" ");
      return names[names.length - 1];
    }
  }

  function mergeFromYMLFrontmatter(target, source) {
    target.title = source.title;
    if (source.published) {
      if (source.published instanceof Date) {
        target.publishedDate = source.published;
      } else if (source.published.constructor === String) {
        target.publishedDate = new Date(source.published);
      }
    }
    if (source.publishedDate) {
      if (source.publishedDate instanceof Date) {
        target.publishedDate = source.publishedDate;
      } else if (source.publishedDate.constructor === String) {
        target.publishedDate = new Date(source.publishedDate);
      } else {
        console.error("Don't know what to do with published date: " + source.publishedDate);
      }
    }
    target.description = source.description;
    target.authors = source.authors.map((authorObject) => new Author(authorObject));
    target.katex = source.katex;
    target.password = source.password;
    if (source.doi) {
      target.doi = source.doi;
    }
  }

  class FrontMatter {
    constructor() {
      this.title = "unnamed article"; // 'Attention and Augmented Recurrent Neural Networks'
      this.description = ""; // 'A visual overview of neural attention...'
      this.authors = []; // Array of Author(s)

      this.bibliography = new Map();
      this.bibliographyParsed = false;
      //  {
      //    'gregor2015draw': {
      //      'title': 'DRAW: A recurrent neural network for image generation',
      //      'author': 'Gregor, Karol and Danihelka, Ivo and Graves, Alex and Rezende, Danilo Jimenez and Wierstra, Daan',
      //      'journal': 'arXiv preprint arXiv:1502.04623',
      //      'year': '2015',
      //      'url': 'https://arxiv.org/pdf/1502.04623.pdf',
      //      'type': 'article'
      //    },
      //  }

      // Citation keys should be listed in the order that they are appear in the document.
      // Each key refers to a key in the bibliography dictionary.
      this.citations = []; // [ 'gregor2015draw', 'mercier2011humans' ]
      this.citationsCollected = false;

      //
      // Assigned from posts.csv
      //

      //  publishedDate: 2016-09-08T07:00:00.000Z,
      //  tags: [ 'rnn' ],
      //  distillPath: '2016/augmented-rnns',
      //  githubPath: 'distillpub/post--augmented-rnns',
      //  doiSuffix: 1,

      //
      // Assigned from journal
      //
      this.journal = {};
      //  journal: {
      //    'title': 'Distill',
      //    'full_title': 'Distill',
      //    'abbrev_title': 'Distill',
      //    'url': 'http://distill.pub',
      //    'doi': '10.23915/distill',
      //    'publisherName': 'Distill Working Group',
      //    'publisherEmail': 'admin@distill.pub',
      //    'issn': '2476-0757',
      //    'editors': [...],
      //    'committee': [...]
      //  }
      //  volume: 1,
      //  issue: 9,

      this.katex = {};

      //
      // Assigned from publishing process
      //

      //  githubCompareUpdatesUrl: 'https://github.com/distillpub/post--augmented-rnns/compare/1596e094d8943d2dc0ea445d92071129c6419c59...3bd9209e0c24d020f87cf6152dcecc6017cbc193',
      //  updatedDate: 2017-03-21T07:13:16.000Z,
      //  doi: '10.23915/distill.00001',
      this.doi = undefined;
      this.publishedDate = undefined;
    }

    // Example:
    // title: Demo Title Attention and Augmented Recurrent Neural Networks
    // published: Jan 10, 2017
    // authors:
    // - Chris Olah:
    // - Shan Carter: http://shancarter.com
    // affiliations:
    // - Google Brain:
    // - Google Brain: http://g.co/brain

    //
    // Computed Properties
    //

    // 'http://distill.pub/2016/augmented-rnns',
    set url(value) {
      this._url = value;
    }
    get url() {
      if (this._url) {
        return this._url;
      } else if (this.distillPath && this.journal.url) {
        return this.journal.url + "/" + this.distillPath;
      } else if (this.journal.url) {
        return this.journal.url;
      }
    }

    // 'https://github.com/distillpub/post--augmented-rnns',
    get githubUrl() {
      if (this.githubPath) {
        return "https://github.com/" + this.githubPath;
      } else {
        return undefined;
      }
    }

    // TODO resolve differences in naming of URL/Url/url.
    // 'http://distill.pub/2016/augmented-rnns/thumbnail.jpg',
    set previewURL(value) {
      this._previewURL = value;
    }
    get previewURL() {
      return this._previewURL ? this._previewURL : this.url + "/thumbnail.jpg";
    }

    // 'Thu, 08 Sep 2016 00:00:00 -0700',
    get publishedDateRFC() {
      return RFC(this.publishedDate);
    }

    // 'Thu, 08 Sep 2016 00:00:00 -0700',
    get updatedDateRFC() {
      return RFC(this.updatedDate);
    }

    // 2016,
    get publishedYear() {
      return this.publishedDate.getFullYear();
    }

    // 'Sept',
    get publishedMonth() {
      return months[this.publishedDate.getMonth()];
    }

    // 8,
    get publishedDay() {
      return this.publishedDate.getDate();
    }

    // '09',
    get publishedMonthPadded() {
      return zeroPad(this.publishedDate.getMonth() + 1);
    }

    // '08',
    get publishedDayPadded() {
      return zeroPad(this.publishedDate.getDate());
    }

    get publishedISODateOnly() {
      return this.publishedDate.toISOString().split("T")[0];
    }

    get volume() {
      const volume = this.publishedYear - 2015;
      if (volume < 1) {
        throw new Error("Invalid publish date detected during computing volume");
      }
      return volume;
    }

    get issue() {
      return this.publishedDate.getMonth() + 1;
    }

    // 'Olah & Carter',
    get concatenatedAuthors() {
      if (this.authors.length > 2) {
        return this.authors[0].lastName + ", et al.";
      } else if (this.authors.length === 2) {
        return this.authors[0].lastName + " & " + this.authors[1].lastName;
      } else if (this.authors.length === 1) {
        return this.authors[0].lastName;
      }
    }

    // 'Olah, Chris and Carter, Shan',
    get bibtexAuthors() {
      return this.authors
        .map((author) => {
          return author.lastName + ", " + author.firstName;
        })
        .join(" and ");
    }

    // 'olah2016attention'
    get slug() {
      let slug = "";
      if (this.authors.length) {
        slug += this.authors[0].lastName.toLowerCase();
        slug += this.publishedYear;
        slug += this.title.split(" ")[0].toLowerCase();
      }
      return slug || "Untitled";
    }

    get bibliographyEntries() {
      return new Map(
        this.citations.map((citationKey) => {
          const entry = this.bibliography.get(citationKey);
          return [citationKey, entry];
        })
      );
    }

    set bibliography(bibliography) {
      if (bibliography instanceof Map) {
        this._bibliography = bibliography;
      } else if (typeof bibliography === "object") {
        this._bibliography = mapFromObject(bibliography);
      }
    }

    get bibliography() {
      return this._bibliography;
    }

    static fromObject(source) {
      const frontMatter = new FrontMatter();
      Object.assign(frontMatter, source);
      return frontMatter;
    }

    assignToObject(target) {
      Object.assign(target, this);
      target.bibliography = objectFromMap(this.bibliographyEntries);
      target.url = this.url;
      target.doi = this.doi;
      target.githubUrl = this.githubUrl;
      target.previewURL = this.previewURL;
      if (this.publishedDate) {
        target.volume = this.volume;
        target.issue = this.issue;
        target.publishedDateRFC = this.publishedDateRFC;
        target.publishedYear = this.publishedYear;
        target.publishedMonth = this.publishedMonth;
        target.publishedDay = this.publishedDay;
        target.publishedMonthPadded = this.publishedMonthPadded;
        target.publishedDayPadded = this.publishedDayPadded;
      }
      if (this.updatedDate) {
        target.updatedDateRFC = this.updatedDateRFC;
      }
      target.concatenatedAuthors = this.concatenatedAuthors;
      target.bibtexAuthors = this.bibtexAuthors;
      target.slug = this.slug;
    }
  }

  // Copyright 2018 The Distill Template Authors
  //
  // Licensed under the Apache License, Version 2.0 (the "License");
  // you may not use this file except in compliance with the License.
  // You may obtain a copy of the License at
  //
  //      http://www.apache.org/licenses/LICENSE-2.0
  //
  // Unless required by applicable law or agreed to in writing, software
  // distributed under the License is distributed on an "AS IS" BASIS,
  // WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  // See the License for the specific language governing permissions and
  // limitations under the License.

  const Mutating = (superclass) => {
    return class extends superclass {
      constructor() {
        super();

        // set up mutation observer
        const options = {
          childList: true,
          characterData: true,
          subtree: true,
        };
        const observer = new MutationObserver(() => {
          observer.disconnect();
          this.renderIfPossible();
          observer.observe(this, options);
        });

        // ...and listen for changes
        observer.observe(this, options);
      }

      connectedCallback() {
        super.connectedCallback();

        this.renderIfPossible();
      }

      // potential TODO: check if this is enough for all our usecases
      // maybe provide a custom function to tell if we have enough information to render
      renderIfPossible() {
        if (this.textContent && this.root) {
          this.renderContent();
        }
      }

      renderContent() {
        console.error(`Your class ${this.constructor.name} must provide a custom renderContent() method!`);
      }
    }; // end class
  }; // end mixin function

  // Copyright 2018 The Distill Template Authors
  //
  // Licensed under the Apache License, Version 2.0 (the "License");
  // you may not use this file except in compliance with the License.
  // You may obtain a copy of the License at
  //
  //      http://www.apache.org/licenses/LICENSE-2.0
  //
  // Unless required by applicable law or agreed to in writing, software
  // distributed under the License is distributed on an "AS IS" BASIS,
  // WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  // See the License for the specific language governing permissions and
  // limitations under the License.

  /*global ShadyCSS*/

  const Template = (name, templateString, useShadow = true) => {
    return (superclass) => {
      const template = document.createElement("template");
      template.innerHTML = templateString;

      if (useShadow && "ShadyCSS" in window) {
        ShadyCSS.prepareTemplate(template, name);
      }

      return class extends superclass {
        static get is() {
          return name;
        }

        constructor() {
          super();

          this.clone = document.importNode(template.content, true);
          if (useShadow) {
            this.attachShadow({ mode: "open" });
            this.shadowRoot.appendChild(this.clone);
          }
        }

        connectedCallback() {
          if (this.hasAttribute("distill-prerendered")) {
            return;
          }
          if (useShadow) {
            if ("ShadyCSS" in window) {
              ShadyCSS.styleElement(this);
            }
          } else {
            this.insertBefore(this.clone, this.firstChild);
          }
        }

        get root() {
          if (useShadow) {
            return this.shadowRoot;
          } else {
            return this;
          }
        }

        /* TODO: Are we using these? Should we even? */
        $(query) {
          return this.root.querySelector(query);
        }

        $$(query) {
          return this.root.querySelectorAll(query);
        }
      };
    };
  };

  var math =
    '/*\n * Copyright 2018 The Distill Template Authors\n *\n * Licensed under the Apache License, Version 2.0 (the "License");\n * you may not use this file except in compliance with the License.\n * You may obtain a copy of the License at\n *\n *      http://www.apache.org/licenses/LICENSE-2.0\n *\n * Unless required by applicable law or agreed to in writing, software\n * distributed under the License is distributed on an "AS IS" BASIS,\n * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n * See the License for the specific language governing permissions and\n * limitations under the License.\n */\n\nspan.katex-display {\n  text-align: left;\n  padding: 8px 0 8px 0;\n  margin: 0.5em 0 0.5em 1em;\n}\n\nspan.katex {\n  -webkit-font-smoothing: antialiased;\n  color: rgba(0, 0, 0, 0.8);\n  font-size: 1.18em;\n}\n';

  // Copyright 2018 The Distill Template Authors
  //
  // Licensed under the Apache License, Version 2.0 (the "License");
  // you may not use this file except in compliance with the License.
  // You may obtain a copy of the License at
  //
  //      http://www.apache.org/licenses/LICENSE-2.0
  //
  // Unless required by applicable law or agreed to in writing, software
  // distributed under the License is distributed on an "AS IS" BASIS,
  // WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  // See the License for the specific language governing permissions and
  // limitations under the License.

  // This is a straight concatenation of code from KaTeX's contrib folder,
  // but we aren't using some of their helpers that don't work well outside a browser environment.

  /*global katex */

  const findEndOfMath = function (delimiter, text, startIndex) {
    // Adapted from
    // https://github.com/Khan/perseus/blob/master/src/perseus-markdown.jsx
    let index = startIndex;
    let braceLevel = 0;

    const delimLength = delimiter.length;

    while (index < text.length) {
      const character = text[index];

      if (braceLevel <= 0 && text.slice(index, index + delimLength) === delimiter) {
        return index;
      } else if (character === "\\") {
        index++;
      } else if (character === "{") {
        braceLevel++;
      } else if (character === "}") {
        braceLevel--;
      }

      index++;
    }

    return -1;
  };

  const splitAtDelimiters = function (startData, leftDelim, rightDelim, display) {
    const finalData = [];

    for (let i = 0; i < startData.length; i++) {
      if (startData[i].type === "text") {
        const text = startData[i].data;

        let lookingForLeft = true;
        let currIndex = 0;
        let nextIndex;

        nextIndex = text.indexOf(leftDelim);
        if (nextIndex !== -1) {
          currIndex = nextIndex;
          finalData.push({
            type: "text",
            data: text.slice(0, currIndex),
          });
          lookingForLeft = false;
        }

        while (true) {
          // eslint-disable-line no-constant-condition
          if (lookingForLeft) {
            nextIndex = text.indexOf(leftDelim, currIndex);
            if (nextIndex === -1) {
              break;
            }

            finalData.push({
              type: "text",
              data: text.slice(currIndex, nextIndex),
            });

            currIndex = nextIndex;
          } else {
            nextIndex = findEndOfMath(rightDelim, text, currIndex + leftDelim.length);
            if (nextIndex === -1) {
              break;
            }

            finalData.push({
              type: "math",
              data: text.slice(currIndex + leftDelim.length, nextIndex),
              rawData: text.slice(currIndex, nextIndex + rightDelim.length),
              display: display,
            });

            currIndex = nextIndex + rightDelim.length;
          }

          lookingForLeft = !lookingForLeft;
        }

        finalData.push({
          type: "text",
          data: text.slice(currIndex),
        });
      } else {
        finalData.push(startData[i]);
      }
    }

    return finalData;
  };

  const splitWithDelimiters = function (text, delimiters) {
    let data = [{ type: "text", data: text }];
    for (let i = 0; i < delimiters.length; i++) {
      const delimiter = delimiters[i];
      data = splitAtDelimiters(data, delimiter.left, delimiter.right, delimiter.display || false);
    }
    return data;
  };

  /* Note: optionsCopy is mutated by this method. If it is ever exposed in the
   * API, we should copy it before mutating.
   */
  const renderMathInText = function (text, optionsCopy) {
    const data = splitWithDelimiters(text, optionsCopy.delimiters);
    const fragment = document.createDocumentFragment();

    for (let i = 0; i < data.length; i++) {
      if (data[i].type === "text") {
        fragment.appendChild(document.createTextNode(data[i].data));
      } else {
        const tag = document.createElement("d-math");
        const math = data[i].data;
        // Override any display mode defined in the settings with that
        // defined by the text itself
        optionsCopy.displayMode = data[i].display;
        try {
          tag.textContent = math;
          if (optionsCopy.displayMode) {
            tag.setAttribute("block", "");
          }
        } catch (e) {
          if (!(e instanceof katex.ParseError)) {
            throw e;
          }
          optionsCopy.errorCallback("KaTeX auto-render: Failed to parse `" + data[i].data + "` with ", e);
          fragment.appendChild(document.createTextNode(data[i].rawData));
          continue;
        }
        fragment.appendChild(tag);
      }
    }

    return fragment;
  };

  const renderElem = function (elem, optionsCopy) {
    for (let i = 0; i < elem.childNodes.length; i++) {
      const childNode = elem.childNodes[i];
      if (childNode.nodeType === 3) {
        // Text node
        const text = childNode.textContent;
        if (optionsCopy.mightHaveMath(text)) {
          const frag = renderMathInText(text, optionsCopy);
          i += frag.childNodes.length - 1;
          elem.replaceChild(frag, childNode);
        }
      } else if (childNode.nodeType === 1) {
        // Element node
        const shouldRender = optionsCopy.ignoredTags.indexOf(childNode.nodeName.toLowerCase()) === -1;

        if (shouldRender) {
          renderElem(childNode, optionsCopy);
        }
      }
      // Otherwise, it's something else, and ignore it.
    }
  };

  const defaultAutoRenderOptions = {
    delimiters: [
      { left: "$$", right: "$$", display: true },
      { left: "\\[", right: "\\]", display: true },
      { left: "\\(", right: "\\)", display: false },
      // LaTeX uses this, but it ruins the display of normal `$` in text:
      // {left: '$', right: '$', display: false},
    ],

    ignoredTags: ["script", "noscript", "style", "textarea", "pre", "code", "svg"],

    errorCallback: function (msg, err) {
      console.error(msg, err);
    },
  };

  const renderMathInElement = function (elem, options) {
    if (!elem) {
      throw new Error("No element provided to render");
    }

    const optionsCopy = Object.assign({}, defaultAutoRenderOptions, options);
    const delimiterStrings = optionsCopy.delimiters.flatMap((d) => [d.left, d.right]);
    const mightHaveMath = (text) => delimiterStrings.some((d) => text.indexOf(d) !== -1);
    optionsCopy.mightHaveMath = mightHaveMath;
    renderElem(elem, optionsCopy);
  };

  // Copyright 2018 The Distill Template Authors

  const katexJSURL = "https://distill.pub/third-party/katex/katex.min.js";
  const katexCSSTag = '<link rel="stylesheet" href="https://distill.pub/third-party/katex/katex.min.css" crossorigin="anonymous">';

  const T = Template(
    "d-math",
    `
${katexCSSTag}
<style>

:host {
  display: inline-block;
  contain: style;
}

:host([block]) {
  display: block;
}

${math}
</style>
<span id='katex-container'></span>
`
  );

  // DMath, not Math, because that would conflict with the JS built-in
  class DMath extends Mutating(T(HTMLElement)) {
    static set katexOptions(options) {
      DMath._katexOptions = options;
      if (DMath.katexOptions.delimiters) {
        if (!DMath.katexAdded) {
          DMath.addKatex();
        } else {
          DMath.katexLoadedCallback();
        }
      }
    }

    static get katexOptions() {
      if (!DMath._katexOptions) {
        DMath._katexOptions = {
          delimiters: [{ left: "$$", right: "$$", display: false }],
        };
      }
      return DMath._katexOptions;
    }

    static katexLoadedCallback() {
      // render all d-math tags
      const mathTags = document.querySelectorAll("d-math");
      for (const mathTag of mathTags) {
        mathTag.renderContent();
      }
      // transform inline delimited math to d-math tags
      if (DMath.katexOptions.delimiters) {
        renderMathInElement(document.body, DMath.katexOptions);
      }
    }

    static addKatex() {
      // css tag can use this convenience function
      document.head.insertAdjacentHTML("beforeend", katexCSSTag);
      // script tag has to be created to work properly
      const scriptTag = document.createElement("script");
      scriptTag.src = katexJSURL;
      scriptTag.async = true;
      scriptTag.onload = DMath.katexLoadedCallback;
      scriptTag.crossorigin = "anonymous";
      document.head.appendChild(scriptTag);

      DMath.katexAdded = true;
    }

    get options() {
      const localOptions = { displayMode: this.hasAttribute("block") };
      return Object.assign(localOptions, DMath.katexOptions);
    }

    connectedCallback() {
      super.connectedCallback();
      if (!DMath.katexAdded) {
        DMath.addKatex();
      }
    }

    renderContent() {
      if (typeof katex !== "undefined") {
        const container = this.root.querySelector("#katex-container");
        katex.render(this.textContent, container, this.options);
      }
    }
  }

  DMath.katexAdded = false;
  DMath.inlineMathRendered = false;
  window.DMath = DMath; // TODO: check if this can be removed, or if we should expose a distill global

  // Copyright 2018 The Distill Template Authors
  //
  // Licensed under the Apache License, Version 2.0 (the "License");
  // you may not use this file except in compliance with the License.
  // You may obtain a copy of the License at
  //
  //      http://www.apache.org/licenses/LICENSE-2.0
  //
  // Unless required by applicable law or agreed to in writing, software
  // distributed under the License is distributed on an "AS IS" BASIS,
  // WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  // See the License for the specific language governing permissions and
  // limitations under the License.

  function collect_citations(dom = document) {
    const citations = new Set();
    const citeTags = dom.querySelectorAll("d-cite");
    for (const tag of citeTags) {
      const keyString = tag.getAttribute("key") || tag.getAttribute("bibtex-key");
      const keys = keyString.split(",").map((k) => k.trim());
      for (const key of keys) {
        citations.add(key);
      }
    }
    return [...citations];
  }

  function author_string(ent, template, sep, finalSep) {
    if (ent.author == null) {
      return "";
    }
    var names = ent.author.split(" and ");
    let name_strings = names.map((name) => {
      name = name.trim();
      if (name.indexOf(",") != -1) {
        var last = name.split(",")[0].trim();
        var firsts = name.split(",")[1];
      } else if (name.indexOf(" ") != -1) {
        var last = name.split(" ").slice(-1)[0].trim();
        var firsts = name.split(" ").slice(0, -1).join(" ");
      } else {
        var last = name.trim();
      }
      var initials = "";
      if (firsts != undefined) {
        initials = firsts
          .trim()
          .split(" ")
          .map((s) => s.trim()[0]);
        initials = initials.join(".") + ".";
      }
      return template.replace("${F}", firsts).replace("${L}", last).replace("${I}", initials).trim(); // in case one of first or last was empty
    });
    if (names.length > 1) {
      var str = name_strings.slice(0, names.length - 1).join(sep);
      str += (finalSep || sep) + name_strings[names.length - 1];
      return str;
    } else {
      return name_strings[0];
    }
  }

  function venue_string(ent) {
    var cite = ent.journal || ent.booktitle || "";
    if ("volume" in ent) {
      var issue = ent.issue || ent.number;
      issue = issue != undefined ? "(" + issue + ")" : "";
      cite += ", Vol " + ent.volume + issue;
    }
    if ("pages" in ent) {
      cite += ", pp. " + ent.pages;
    }
    if (cite != "") cite += ". ";
    if ("publisher" in ent) {
      cite += ent.publisher;
      if (cite[cite.length - 1] != ".") cite += ".";
    }
    return cite;
  }

  function link_string(ent) {
    if ("url" in ent) {
      var url = ent.url;
      var arxiv_match = /arxiv\.org\/abs\/([0-9\.]*)/.exec(url);
      if (arxiv_match != null) {
        url = `http://arxiv.org/pdf/${arxiv_match[1]}.pdf`;
      }

      if (url.slice(-4) == ".pdf") {
        var label = "PDF";
      } else if (url.slice(-5) == ".html") {
        var label = "HTML";
      }
      return ` &ensp;<a href="${url}">[${label || "link"}]</a>`;
    } /* else if ("doi" in ent){
      return ` &ensp;<a href="https://doi.org/${ent.doi}" >[DOI]</a>`;
    }*/ else {
      return "";
    }
  }
  function doi_string(ent, new_line) {
    if ("doi" in ent) {
      return `${new_line ? "<br>" : ""} <a href="https://doi.org/${ent.doi}" style="text-decoration:inherit;">DOI: ${ent.doi}</a>`;
    } else {
      return "";
    }
  }

  function title_string(ent) {
    return '<span class="title">' + ent.title + "</span> ";
  }

  function bibliography_cite(ent, fancy) {
    if (ent) {
      var cite = title_string(ent);
      cite += link_string(ent) + "<br>";
      if (ent.author) {
        cite += author_string(ent, "${L}, ${I}", ", ", " and ");
        if (ent.year || ent.date) {
          cite += ", ";
        }
      }
      if (ent.year || ent.date) {
        cite += (ent.year || ent.date) + ". ";
      } else {
        cite += ". ";
      }
      cite += venue_string(ent);
      cite += doi_string(ent);
      return cite;
      /*var cite =  author_string(ent, "${L}, ${I}", ", ", " and ");
      if (ent.year || ent.date){
        cite += ", " + (ent.year || ent.date) + ". "
      } else {
        cite += ". "
      }
      cite += "<b>" + ent.title + "</b>. ";
      cite += venue_string(ent);
      cite += doi_string(ent);
      cite += link_string(ent);
      return cite*/
    } else {
      return "?";
    }
  }

  function hover_cite(ent) {
    if (ent) {
      var cite = "";
      cite += "<strong>" + ent.title + "</strong>";
      cite += link_string(ent);
      cite += "<br>";

      var a_str = author_string(ent, "${I} ${L}", ", ") + ".";
      var v_str = venue_string(ent).trim() + " " + ent.year + ". " + doi_string(ent, true);

      if ((a_str + v_str).length < Math.min(40, ent.title.length)) {
        cite += a_str + " " + v_str;
      } else {
        cite += a_str + "<br>" + v_str;
      }
      return cite;
    } else {
      return "?";
    }
  }

  function domContentLoaded() {
    return ["interactive", "complete"].indexOf(document.readyState) !== -1;
  }

  // Copyright 2018 The Distill Template Authors
  //
  // Licensed under the Apache License, Version 2.0 (the "License");
  // you may not use this file except in compliance with the License.
  // You may obtain a copy of the License at
  //
  //      http://www.apache.org/licenses/LICENSE-2.0
  //
  // Unless required by applicable law or agreed to in writing, software
  // distributed under the License is distributed on an "AS IS" BASIS,
  // WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  // See the License for the specific language governing permissions and
  // limitations under the License.

  function _moveLegacyAffiliationFormatIntoArray(frontMatter) {
    // authors used to have propoerties "affiliation" and "affiliationURL".
    // We now encourage using an array for affiliations containing objects with
    // properties "name" and "url".
    for (let author of frontMatter.authors) {
      const hasOldStyle = Boolean(author.affiliation);
      const hasNewStyle = Boolean(author.affiliations);
      if (!hasOldStyle) continue;
      if (hasNewStyle) {
        console.warn(
          `Author ${author.author} has both old-style ("affiliation" & "affiliationURL") and new style ("affiliations") affiliation information!`
        );
      } else {
        let newAffiliation = {
          name: author.affiliation,
        };
        if (author.affiliationURL) newAffiliation.url = author.affiliationURL;
        author.affiliations = [newAffiliation];
      }
    }
    return frontMatter;
  }

  function parseFrontmatter(element) {
    const scriptTag = element.firstElementChild;
    if (scriptTag) {
      const type = scriptTag.getAttribute("type");
      if (type.split("/")[1] == "json") {
        const content = scriptTag.textContent;
        const parsed = JSON.parse(content);
        return _moveLegacyAffiliationFormatIntoArray(parsed);
      } else {
        console.error("Distill only supports JSON frontmatter tags anymore; no more YAML.");
      }
    } else {
      console.error(
        "You added a frontmatter tag but did not provide a script tag with front matter data in it. Please take a look at our templates."
      );
    }
    return {};
  }

  class FrontMatter$1 extends HTMLElement {
    static get is() {
      return "d-front-matter";
    }

    constructor() {
      super();

      const options = {
        childList: true,
        characterData: true,
        subtree: true,
      };
      const observer = new MutationObserver((entries) => {
        for (const entry of entries) {
          if (entry.target.nodeName === "SCRIPT" || entry.type === "characterData") {
            const data = parseFrontmatter(this);
            this.notify(data);
          }
        }
      });
      observer.observe(this, options);
    }

    notify(data) {
      const options = { detail: data, bubbles: true };
      const event = new CustomEvent("onFrontMatterChanged", options);
      document.dispatchEvent(event);
    }
  }

  // Copyright 2018 The Distill Template Authors
  //
  // Licensed under the Apache License, Version 2.0 (the "License");
  // you may not use this file except in compliance with the License.
  // You may obtain a copy of the License at
  //
  //      http://www.apache.org/licenses/LICENSE-2.0
  //
  // Unless required by applicable law or agreed to in writing, software
  // distributed under the License is distributed on an "AS IS" BASIS,
  // WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  // See the License for the specific language governing permissions and
  // limitations under the License.

  // no appendix -> add appendix
  // title in front, no h1 -> add it
  // no title in front, h1 -> read and put into frontMatter
  // footnote -> footnote list
  // break up bib
  // if citation, no bib-list -> add citation-list

  // if authors, no byline -> add byline

  function optionalComponents(dom, data) {
    const body = dom.body;
    const article = body.querySelector("d-article");

    // If we don't have an article tag, something weird is going on—giving up.
    if (!article) {
      console.warn("No d-article tag found; skipping adding optional components!");
      return;
    }

    let byline = dom.querySelector("d-byline");
    if (!byline) {
      if (data.authors) {
        byline = dom.createElement("d-byline");
        // body.insertBefore(byline, article);
      } else {
        console.warn("No authors found in front matter; please add them before submission!");
      }
    }

    let title = dom.querySelector("d-title");
    if (!title) {
      title = dom.createElement("d-title");
      body.insertBefore(title, byline);
    }

    let h1 = title.querySelector("h1");
    if (!h1) {
      h1 = dom.createElement("h1");
      h1.textContent = data.title;
      title.insertBefore(h1, title.firstChild);
    }

    const hasPassword = typeof data.password !== "undefined";
    let interstitial = body.querySelector("d-interstitial");
    if (hasPassword && !interstitial) {
      const inBrowser = typeof window !== "undefined";
      const onLocalhost = inBrowser && window.location.hostname.includes("localhost");
      if (!inBrowser || !onLocalhost) {
        interstitial = dom.createElement("d-interstitial");
        interstitial.password = data.password;
        body.insertBefore(interstitial, body.firstChild);
      }
    } else if (!hasPassword && interstitial) {
      interstitial.parentElement.removeChild(this);
    }

    let appendix = dom.querySelector("d-appendix");
    if (!appendix) {
      appendix = dom.createElement("d-appendix");
      dom.body.appendChild(appendix);
    }

    let footnoteList = dom.querySelector("d-footnote-list");
    if (!footnoteList) {
      footnoteList = dom.createElement("d-footnote-list");
      appendix.appendChild(footnoteList);
    }

    let citationList = dom.querySelector("d-citation-list");
    if (!citationList) {
      citationList = dom.createElement("d-citation-list");
      appendix.appendChild(citationList);
    }
  }

  // Copyright 2018 The Distill Template Authors

  const frontMatter = new FrontMatter();

  const Controller = {
    frontMatter: frontMatter,
    waitingOn: {
      bibliography: [],
      citations: [],
    },
    listeners: {
      onCiteKeyCreated(event) {
        const [citeTag, keys] = event.detail;

        // ensure we have citations
        if (!frontMatter.citationsCollected) {
          // console.debug('onCiteKeyCreated, but unresolved dependency ("citations"). Enqueing.');
          Controller.waitingOn.citations.push(() => Controller.listeners.onCiteKeyCreated(event));
          return;
        }

        // ensure we have a loaded bibliography
        if (!frontMatter.bibliographyParsed) {
          // console.debug('onCiteKeyCreated, but unresolved dependency ("bibliography"). Enqueing.');
          Controller.waitingOn.bibliography.push(() => Controller.listeners.onCiteKeyCreated(event));
          return;
        }

        const numbers = keys.map((key) => frontMatter.citations.indexOf(key));
        citeTag.numbers = numbers;
        const entries = keys.map((key) => frontMatter.bibliography.get(key));
        citeTag.entries = entries;
      },

      onCiteKeyChanged() {
        // const [citeTag, keys] = event.detail;

        // update citations
        frontMatter.citations = collect_citations();
        frontMatter.citationsCollected = true;
        for (const waitingCallback of Controller.waitingOn.citations.slice()) {
          waitingCallback();
        }

        // update bibliography
        const citationListTag = document.querySelector("d-citation-list");
        const bibliographyEntries = new Map(
          frontMatter.citations.map((citationKey) => {
            return [citationKey, frontMatter.bibliography.get(citationKey)];
          })
        );
        citationListTag.citations = bibliographyEntries;

        const citeTags = document.querySelectorAll("d-cite");
        for (const citeTag of citeTags) {
          console.log(citeTag);
          const keys = citeTag.keys;
          const numbers = keys.map((key) => frontMatter.citations.indexOf(key));
          citeTag.numbers = numbers;
          const entries = keys.map((key) => frontMatter.bibliography.get(key));
          citeTag.entries = entries;
        }
      },

      onCiteKeyRemoved(event) {
        Controller.listeners.onCiteKeyChanged(event);
      },

      onBibliographyChanged(event) {
        const citationListTag = document.querySelector("d-citation-list");

        const bibliography = event.detail;

        frontMatter.bibliography = bibliography;
        frontMatter.bibliographyParsed = true;
        for (const waitingCallback of Controller.waitingOn.bibliography.slice()) {
          waitingCallback();
        }

        // ensure we have citations
        if (!frontMatter.citationsCollected) {
          Controller.waitingOn.citations.push(function () {
            Controller.listeners.onBibliographyChanged({
              target: event.target,
              detail: event.detail,
            });
          });
          return;
        }

        if (citationListTag.hasAttribute("distill-prerendered")) {
          console.debug("Citation list was prerendered; not updating it.");
        } else {
          const entries = new Map(
            frontMatter.citations.map((citationKey) => {
              return [citationKey, frontMatter.bibliography.get(citationKey)];
            })
          );
          citationListTag.citations = entries;
        }
      },

      onFootnoteChanged() {
        // const footnote = event.detail;
        //TODO: optimize to only update current footnote
        const footnotesList = document.querySelector("d-footnote-list");
        if (footnotesList) {
          const footnotes = document.querySelectorAll("d-footnote");
          footnotesList.footnotes = footnotes;
        }
      },

      onFrontMatterChanged(event) {
        const data = event.detail;
        mergeFromYMLFrontmatter(frontMatter, data);

        const interstitial = document.querySelector("d-interstitial");
        if (interstitial) {
          if (typeof frontMatter.password !== "undefined") {
            interstitial.password = frontMatter.password;
          } else {
            interstitial.parentElement.removeChild(interstitial);
          }
        }

        const prerendered = document.body.hasAttribute("distill-prerendered");
        if (!prerendered && domContentLoaded()) {
          optionalComponents(document, frontMatter);

          const appendix = document.querySelector("distill-appendix");
          if (appendix) {
            appendix.frontMatter = frontMatter;
          }

          const byline = document.querySelector("d-byline");
          if (byline) {
            byline.frontMatter = frontMatter;
          }

          if (data.katex) {
            DMath.katexOptions = data.katex;
          }
        }
      },

      DOMContentLoaded() {
        if (Controller.loaded) {
          console.warn("Controller received DOMContentLoaded but was already loaded!");
          return;
        } else if (!domContentLoaded()) {
          console.warn("Controller received DOMContentLoaded at document.readyState: " + document.readyState + "!");
          return;
        } else {
          Controller.loaded = true;
          console.debug("Runlevel 4: Controller running DOMContentLoaded");
        }

        const frontMatterTag = document.querySelector("d-front-matter");
        if (frontMatterTag) {
          const data = parseFrontmatter(frontMatterTag);
          Controller.listeners.onFrontMatterChanged({ detail: data });
        }

        // Resolving "citations" dependency due to initial DOM load
        frontMatter.citations = collect_citations();
        frontMatter.citationsCollected = true;
        for (const waitingCallback of Controller.waitingOn.citations.slice()) {
          waitingCallback();
        }

        if (frontMatter.bibliographyParsed) {
          for (const waitingCallback of Controller.waitingOn.bibliography.slice()) {
            waitingCallback();
          }
        }

        const footnotesList = document.querySelector("d-footnote-list");
        if (footnotesList) {
          const footnotes = document.querySelectorAll("d-footnote");
          footnotesList.footnotes = footnotes;
        }
      },
    }, // listeners
  }; // Controller

  var base =
    '/*\n * Copyright 2018 The Distill Template Authors\n *\n * Licensed under the Apache License, Version 2.0 (the "License");\n * you may not use this file except in compliance with the License.\n * You may obtain a copy of the License at\n *\n *      http://www.apache.org/licenses/LICENSE-2.0\n *\n * Unless required by applicable law or agreed to in writing, software\n * distributed under the License is distributed on an "AS IS" BASIS,\n * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n * See the License for the specific language governing permissions and\n * limitations under the License.\n */\n\nhtml {\n  font-size: 14px;\n\tline-height: 1.6em;\n  /* font-family: "Libre Franklin", "Helvetica Neue", sans-serif; */\n  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", Arial, sans-serif;\n  /*, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";*/\n  text-size-adjust: 100%;\n  -ms-text-size-adjust: 100%;\n  -webkit-text-size-adjust: 100%;\n}\n\n@media(min-width: 768px) {\n  html {\n    font-size: 16px;\n  }\n}\n\nbody {\n  margin: 0;\n}\n\na {\n  color: #004276;\n}\n\nfigure {\n  margin: 0;\n}\n\ntable {\n\tborder-collapse: collapse;\n\tborder-spacing: 0;\n}\n\ntable th {\n\ttext-align: left;\n}\n\ntable thead {\n  border-bottom: 1px solid rgba(0, 0, 0, 0.05);\n}\n\ntable thead th {\n  padding-bottom: 0.5em;\n}\n\ntable tbody :first-child td {\n  padding-top: 0.5em;\n}\n\npre {\n  overflow: auto;\n  max-width: 100%;\n}\n\np {\n  margin-top: 0;\n  margin-bottom: 1em;\n}\n\nsup, sub {\n  vertical-align: baseline;\n  position: relative;\n  top: -0.4em;\n  line-height: 1em;\n}\n\nsub {\n  top: 0.4em;\n}\n\n.kicker,\n.marker {\n  font-size: 15px;\n  font-weight: 600;\n  color: rgba(0, 0, 0, 0.5);\n}\n\n\n/* Headline */\n\n@media(min-width: 1024px) {\n  d-title h1 span {\n    display: block;\n  }\n}\n\n/* Figure */\n\nfigure {\n  position: relative;\n  margin-bottom: 2.5em;\n  margin-top: 1.5em;\n}\n\nfigcaption+figure {\n\n}\n\nfigure img {\n  width: 100%;\n}\n\nfigure svg text,\nfigure svg tspan {\n}\n\nfigcaption,\n.figcaption {\n  color: rgba(0, 0, 0, 0.6);\n  font-size: 12px;\n  line-height: 1.5em;\n}\n\n@media(min-width: 1024px) {\nfigcaption,\n.figcaption {\n    font-size: 13px;\n  }\n}\n\nfigure.external img {\n  background: white;\n  border: 1px solid rgba(0, 0, 0, 0.1);\n  box-shadow: 0 1px 8px rgba(0, 0, 0, 0.1);\n  padding: 18px;\n  box-sizing: border-box;\n}\n\nfigcaption a {\n  color: rgba(0, 0, 0, 0.6);\n}\n\nfigcaption b,\nfigcaption strong, {\n  font-weight: 600;\n  color: rgba(0, 0, 0, 1.0);\n}\n';

  var layout =
    '/*\n * Copyright 2018 The Distill Template Authors\n *\n * Licensed under the Apache License, Version 2.0 (the "License");\n * you may not use this file except in compliance with the License.\n * You may obtain a copy of the License at\n *\n *      http://www.apache.org/licenses/LICENSE-2.0\n *\n * Unless required by applicable law or agreed to in writing, software\n * distributed under the License is distributed on an "AS IS" BASIS,\n * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n * See the License for the specific language governing permissions and\n * limitations under the License.\n */\n\n@supports not (display: grid) {\n  .base-grid,\n  distill-header,\n  d-title,\n  d-abstract,\n  d-article,\n  d-appendix,\n  distill-appendix,\n  d-byline,\n  d-footnote-list,\n  d-citation-list,\n  distill-footer {\n    display: block;\n    padding: 8px;\n  }\n}\n\n.base-grid,\ndistill-header,\nd-title,\nd-abstract,\nd-article,\nd-appendix,\ndistill-appendix,\nd-byline,\nd-footnote-list,\nd-citation-list,\ndistill-footer {\n  display: grid;\n  justify-items: stretch;\n  grid-template-columns: [screen-start] 8px [page-start kicker-start text-start gutter-start middle-start] 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr [text-end page-end gutter-end kicker-end middle-end] 8px [screen-end];\n  grid-column-gap: 8px;\n}\n\n.grid {\n  display: grid;\n  grid-column-gap: 8px;\n}\n\n@media(min-width: 768px) {\n  .base-grid,\n  distill-header,\n  d-title,\n  d-abstract,\n  d-article,\n  d-appendix,\n  distill-appendix,\n  d-byline,\n  d-footnote-list,\n  d-citation-list,\n  distill-footer {\n    grid-template-columns: [screen-start] 1fr [page-start kicker-start middle-start text-start] 45px 45px 45px 45px 45px 45px 45px 45px [ kicker-end text-end gutter-start] 45px [middle-end] 45px [page-end gutter-end] 1fr [screen-end];\n    grid-column-gap: 16px;\n  }\n\n  .grid {\n    grid-column-gap: 16px;\n  }\n}\n\n@media(min-width: 1000px) {\n  .base-grid,\n  distill-header,\n  d-title,\n  d-abstract,\n  d-article,\n  d-appendix,\n  distill-appendix,\n  d-byline,\n  d-footnote-list,\n  d-citation-list,\n  distill-footer {\n    grid-template-columns: [screen-start] 1fr [page-start kicker-start] 50px [middle-start] 50px [text-start kicker-end] 50px 50px 50px 50px 50px 50px 50px 50px [text-end gutter-start] 50px [middle-end] 50px [page-end gutter-end] 1fr [screen-end];\n    grid-column-gap: 16px;\n  }\n\n  .grid {\n    grid-column-gap: 16px;\n  }\n}\n\n@media(min-width: 1180px) {\n  .base-grid,\n  distill-header,\n  d-title,\n  d-abstract,\n  d-article,\n  d-appendix,\n  distill-appendix,\n  d-byline,\n  d-footnote-list,\n  d-citation-list,\n  distill-footer {\n    grid-template-columns: [screen-start] 1fr [page-start kicker-start] 60px [middle-start] 60px [text-start kicker-end] 60px 60px 60px 60px 60px 60px 60px 60px [text-end gutter-start] 60px [middle-end] 60px [page-end gutter-end] 1fr [screen-end];\n    grid-column-gap: 32px;\n  }\n\n  .grid {\n    grid-column-gap: 32px;\n  }\n}\n\n\n\n\n.base-grid {\n  grid-column: screen;\n}\n\n/* .l-body,\nd-article > *  {\n  grid-column: text;\n}\n\n.l-page,\nd-title > *,\nd-figure {\n  grid-column: page;\n} */\n\n.l-gutter {\n  grid-column: gutter;\n}\n\n.l-text,\n.l-body {\n  grid-column: text;\n}\n\n.l-page {\n  grid-column: page;\n}\n\n.l-body-outset {\n  grid-column: middle;\n}\n\n.l-page-outset {\n  grid-column: page;\n}\n\n.l-screen {\n  grid-column: screen;\n}\n\n.l-screen-inset {\n  grid-column: screen;\n  padding-left: 16px;\n  padding-left: 16px;\n}\n\n\n/* Aside */\n\nd-article aside {\n  grid-column: gutter;\n  font-size: 12px;\n  line-height: 1.6em;\n  color: rgba(0, 0, 0, 0.6)\n}\n\n@media(min-width: 768px) {\n  aside {\n    grid-column: gutter;\n  }\n\n  .side {\n    grid-column: gutter;\n  }\n}\n';

  var print =
    '/*\n * Copyright 2018 The Distill Template Authors\n *\n * Licensed under the Apache License, Version 2.0 (the "License");\n * you may not use this file except in compliance with the License.\n * You may obtain a copy of the License at\n *\n *      http://www.apache.org/licenses/LICENSE-2.0\n *\n * Unless required by applicable law or agreed to in writing, software\n * distributed under the License is distributed on an "AS IS" BASIS,\n * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n * See the License for the specific language governing permissions and\n * limitations under the License.\n */\n\n@media print {\n\n  @page {\n    size: 8in 11in;\n    @bottom-right {\n      content: counter(page) " of " counter(pages);\n    }\n  }\n\n  html {\n    /* no general margins -- CSS Grid takes care of those */\n  }\n\n  p, code {\n    page-break-inside: avoid;\n  }\n\n  h2, h3 {\n    page-break-after: avoid;\n  }\n\n  d-header {\n    visibility: hidden;\n  }\n\n  d-footer {\n    display: none!important;\n  }\n\n}\n';

  var byline =
    '/*\n * Copyright 2018 The Distill Template Authors\n *\n * Licensed under the Apache License, Version 2.0 (the "License");\n * you may not use this file except in compliance with the License.\n * You may obtain a copy of the License at\n *\n *      http://www.apache.org/licenses/LICENSE-2.0\n *\n * Unless required by applicable law or agreed to in writing, software\n * distributed under the License is distributed on an "AS IS" BASIS,\n * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n * See the License for the specific language governing permissions and\n * limitations under the License.\n */\n\nd-byline {\n  contain: style;\n  overflow: hidden;\n  border-top: 1px solid rgba(0, 0, 0, 0.1);\n  font-size: 0.8rem;\n  line-height: 1.8em;\n  padding: 1.5rem 0;\n  min-height: 1.8em;\n}\n\n\nd-byline .byline {\n  grid-template-columns: 1fr 1fr;\n  grid-column: text;\n}\n\n@media(min-width: 768px) {\n  d-byline .byline {\n    grid-template-columns: 1fr 1fr 1fr 1fr;\n  }\n}\n\nd-byline .authors-affiliations {\n  grid-column-end: span 2;\n  grid-template-columns: 1fr 1fr;\n  margin-bottom: 1em;\n}\n\n@media(min-width: 768px) {\n  d-byline .authors-affiliations {\n    margin-bottom: 0;\n  }\n}\n\nd-byline h3 {\n  font-size: 0.6rem;\n  font-weight: 400;\n  color: rgba(0, 0, 0, 0.5);\n  margin: 0;\n  text-transform: uppercase;\n}\n\nd-byline p {\n  margin: 0;\n}\n\nd-byline a,\nd-article d-byline a {\n  color: rgba(0, 0, 0, 0.8);\n  text-decoration: none;\n  border-bottom: none;\n}\n\nd-article d-byline a:hover {\n  text-decoration: underline;\n  border-bottom: none;\n}\n\nd-byline p.author {\n  font-weight: 500;\n}\n\nd-byline .affiliations {\n\n}\n';

  var article =
    '/*\n * Copyright 2018 The Distill Template Authors\n *\n * Licensed under the Apache License, Version 2.0 (the "License");\n * you may not use this file except in compliance with the License.\n * You may obtain a copy of the License at\n *\n *      http://www.apache.org/licenses/LICENSE-2.0\n *\n * Unless required by applicable law or agreed to in writing, software\n * distributed under the License is distributed on an "AS IS" BASIS,\n * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n * See the License for the specific language governing permissions and\n * limitations under the License.\n */\n\nd-article {\n  contain: layout style;\n  overflow-x: hidden;\n  border-top: 1px solid rgba(0, 0, 0, 0.1);\n  padding-top: 2rem;\n  color: rgba(0, 0, 0, 0.8);\n}\n\nd-article > * {\n  grid-column: text;\n}\n\n@media(min-width: 768px) {\n  d-article {\n    font-size: 16px;\n  }\n}\n\n@media(min-width: 1024px) {\n  d-article {\n    font-size: 1.06rem;\n    line-height: 1.7em;\n  }\n}\n\n\n/* H2 */\n\n\nd-article .marker {\n  text-decoration: none;\n  border: none;\n  counter-reset: section;\n  grid-column: kicker;\n  line-height: 1.7em;\n}\n\nd-article .marker:hover {\n  border: none;\n}\n\nd-article .marker span {\n  padding: 0 3px 4px;\n  border-bottom: 1px solid rgba(0, 0, 0, 0.2);\n  position: relative;\n  top: 4px;\n}\n\nd-article .marker:hover span {\n  color: rgba(0, 0, 0, 0.7);\n  border-bottom: 1px solid rgba(0, 0, 0, 0.7);\n}\n\nd-article h2 {\n  font-weight: 600;\n  font-size: 24px;\n  line-height: 1.25em;\n  margin: 2rem 0 1.5rem 0;\n  border-bottom: 1px solid rgba(0, 0, 0, 0.1);\n  padding-bottom: 1rem;\n}\n\n@media(min-width: 1024px) {\n  d-article h2 {\n    font-size: 36px;\n  }\n}\n\n/* H3 */\n\nd-article h3 {\n  font-weight: 700;\n  font-size: 18px;\n  line-height: 1.4em;\n  margin-bottom: 1em;\n  margin-top: 2em;\n}\n\n@media(min-width: 1024px) {\n  d-article h3 {\n    font-size: 20px;\n  }\n}\n\n/* H4 */\n\nd-article h4 {\n  font-weight: 600;\n  text-transform: uppercase;\n  font-size: 14px;\n  line-height: 1.4em;\n}\n\nd-article a {\n  color: inherit;\n}\n\nd-article p,\nd-article ul,\nd-article ol,\nd-article blockquote {\n  margin-top: 0;\n  margin-bottom: 1em;\n  margin-left: 0;\n  margin-right: 0;\n}\n\nd-article blockquote {\n  border-left: 2px solid rgba(0, 0, 0, 0.2);\n  padding-left: 2em;\n  font-style: italic;\n  color: rgba(0, 0, 0, 0.6);\n}\n\nd-article a {\n  border-bottom: 1px solid rgba(0, 0, 0, 0.4);\n  text-decoration: none;\n}\n\nd-article a:hover {\n  border-bottom: 1px solid rgba(0, 0, 0, 0.8);\n}\n\nd-article .link {\n  text-decoration: underline;\n  cursor: pointer;\n}\n\nd-article ul,\nd-article ol {\n  padding-left: 24px;\n}\n\nd-article li {\n  margin-bottom: 1em;\n  margin-left: 0;\n  padding-left: 0;\n}\n\nd-article li:last-child {\n  margin-bottom: 0;\n}\n\nd-article pre {\n  font-size: 14px;\n  margin-bottom: 20px;\n}\n\nd-article hr {\n  grid-column: screen;\n  width: 100%;\n  border: none;\n  border-bottom: 1px solid rgba(0, 0, 0, 0.1);\n  margin-top: 60px;\n  margin-bottom: 60px;\n}\n\nd-article section {\n  margin-top: 60px;\n  margin-bottom: 60px;\n}\n\nd-article span.equation-mimic {\n  font-family: georgia;\n  font-size: 115%;\n  font-style: italic;\n}\n\nd-article > d-code,\nd-article section > d-code  {\n  display: block;\n}\n\nd-article > d-math[block],\nd-article section > d-math[block]  {\n  display: block;\n}\n\n@media (max-width: 768px) {\n  d-article > d-code,\n  d-article section > d-code,\n  d-article > d-math[block],\n  d-article section > d-math[block] {\n      overflow-x: scroll;\n      -ms-overflow-style: none;  // IE 10+\n      overflow: -moz-scrollbars-none;  // Firefox\n  }\n\n  d-article > d-code::-webkit-scrollbar,\n  d-article section > d-code::-webkit-scrollbar,\n  d-article > d-math[block]::-webkit-scrollbar,\n  d-article section > d-math[block]::-webkit-scrollbar {\n    display: none;  // Safari and Chrome\n  }\n}\n\nd-article .citation {\n  color: #668;\n  cursor: pointer;\n}\n\nd-include {\n  width: auto;\n  display: block;\n}\n\nd-figure {\n  contain: layout style;\n}\n\n/* KaTeX */\n\n.katex, .katex-prerendered {\n  contain: style;\n  display: inline-block;\n}\n\n/* Tables */\n\nd-article table {\n  border-collapse: collapse;\n  margin-bottom: 1.5rem;\n  border-bottom: 1px solid rgba(0, 0, 0, 0.2);\n}\n\nd-article table th {\n  border-bottom: 1px solid rgba(0, 0, 0, 0.2);\n}\n\nd-article table td {\n  border-bottom: 1px solid rgba(0, 0, 0, 0.05);\n}\n\nd-article table tr:last-of-type td {\n  border-bottom: none;\n}\n\nd-article table th,\nd-article table td {\n  font-size: 15px;\n  padding: 2px 8px;\n}\n\nd-article table tbody :first-child td {\n  padding-top: 2px;\n}\n';

  var title =
    '/*\n * Copyright 2018 The Distill Template Authors\n *\n * Licensed under the Apache License, Version 2.0 (the "License");\n * you may not use this file except in compliance with the License.\n * You may obtain a copy of the License at\n *\n *      http://www.apache.org/licenses/LICENSE-2.0\n *\n * Unless required by applicable law or agreed to in writing, software\n * distributed under the License is distributed on an "AS IS" BASIS,\n * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n * See the License for the specific language governing permissions and\n * limitations under the License.\n */\n\nd-title {\n  padding: 2rem 0 1.5rem;\n  contain: layout style;\n  overflow-x: hidden;\n}\n\n@media(min-width: 768px) {\n  d-title {\n    padding: 4rem 0 1.5rem;\n  }\n}\n\nd-title h1 {\n  grid-column: text;\n  font-size: 40px;\n  font-weight: 700;\n  line-height: 1.1em;\n  margin: 0 0 0.5rem;\n}\n\n@media(min-width: 768px) {\n  d-title h1 {\n    font-size: 50px;\n  }\n}\n\nd-title p {\n  font-weight: 300;\n  font-size: 1.2rem;\n  line-height: 1.55em;\n  grid-column: text;\n}\n\nd-title .status {\n  margin-top: 0px;\n  font-size: 12px;\n  color: #009688;\n  opacity: 0.8;\n  grid-column: kicker;\n}\n\nd-title .status span {\n  line-height: 1;\n  display: inline-block;\n  padding: 6px 0;\n  border-bottom: 1px solid #80cbc4;\n  font-size: 11px;\n  text-transform: uppercase;\n}\n';

  // Copyright 2018 The Distill Template Authors

  const styles = base + layout + title + byline + article + math + print;

  function makeStyleTag(dom) {
    const styleTagId = "distill-prerendered-styles";
    const prerenderedTag = dom.getElementById(styleTagId);
    if (!prerenderedTag) {
      const styleTag = dom.createElement("style");
      styleTag.id = styleTagId;
      styleTag.type = "text/css";
      const cssTextTag = dom.createTextNode(styles);
      styleTag.appendChild(cssTextTag);
      const firstScriptTag = dom.head.querySelector("script");
      dom.head.insertBefore(styleTag, firstScriptTag);
    }
  }

  // Copyright 2018 The Distill Template Authors
  //
  // Licensed under the Apache License, Version 2.0 (the "License");
  // you may not use this file except in compliance with the License.
  // You may obtain a copy of the License at
  //
  //      http://www.apache.org/licenses/LICENSE-2.0
  //
  // Unless required by applicable law or agreed to in writing, software
  // distributed under the License is distributed on an "AS IS" BASIS,
  // WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  // See the License for the specific language governing permissions and
  // limitations under the License.

  function addPolyfill(polyfill, polyfillLoadedCallback) {
    console.debug("Runlevel 0: Polyfill required: " + polyfill.name);
    const script = document.createElement("script");
    script.src = polyfill.url;
    script.async = false;
    if (polyfillLoadedCallback) {
      script.onload = function () {
        polyfillLoadedCallback(polyfill);
      };
    }
    script.onerror = function () {
      new Error("Runlevel 0: Polyfills failed to load script " + polyfill.name);
    };
    document.head.appendChild(script);
  }

  const polyfills = [
    {
      name: "WebComponents",
      support: function () {
        return (
          "customElements" in window &&
          "attachShadow" in Element.prototype &&
          "getRootNode" in Element.prototype &&
          "content" in document.createElement("template") &&
          "Promise" in window &&
          "from" in Array
        );
      },
      url: "https://distill.pub/third-party/polyfills/webcomponents-lite.js",
    },
    {
      name: "IntersectionObserver",
      support: function () {
        return "IntersectionObserver" in window && "IntersectionObserverEntry" in window;
      },
      url: "https://distill.pub/third-party/polyfills/intersection-observer.js",
    },
  ];

  class Polyfills {
    static browserSupportsAllFeatures() {
      return polyfills.every((poly) => poly.support());
    }

    static load(callback) {
      // Define an intermediate callback that checks if all is loaded.
      const polyfillLoaded = function (polyfill) {
        polyfill.loaded = true;
        console.debug("Runlevel 0: Polyfill has finished loading: " + polyfill.name);
        // console.debug(window[polyfill.name]);
        if (Polyfills.neededPolyfills.every((poly) => poly.loaded)) {
          console.debug("Runlevel 0: All required polyfills have finished loading.");
          console.debug("Runlevel 0->1.");
          window.distillRunlevel = 1;
          callback();
        }
      };
      // Add polyfill script tags
      for (const polyfill of Polyfills.neededPolyfills) {
        addPolyfill(polyfill, polyfillLoaded);
      }
    }

    static get neededPolyfills() {
      if (!Polyfills._neededPolyfills) {
        Polyfills._neededPolyfills = polyfills.filter((poly) => !poly.support());
      }
      return Polyfills._neededPolyfills;
    }
  }

  // Copyright 2018 The Distill Template Authors
  //
  // Licensed under the Apache License, Version 2.0 (the "License");
  // you may not use this file except in compliance with the License.
  // You may obtain a copy of the License at
  //
  //      http://www.apache.org/licenses/LICENSE-2.0
  //
  // Unless required by applicable law or agreed to in writing, software
  // distributed under the License is distributed on an "AS IS" BASIS,
  // WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  // See the License for the specific language governing permissions and
  // limitations under the License.

  // const marginSmall = 16;
  // const marginLarge = 3 * marginSmall;
  // const margin = marginSmall + marginLarge;
  // const gutter = marginSmall;
  // const outsetAmount = margin / 2;
  // const numCols = 4;
  // const numGutters = numCols - 1;
  // const columnWidth = (768 - 2 * marginLarge - numGutters * gutter) / numCols;
  //
  // const screenwidth = 768;
  // const pageWidth = screenwidth - 2 * marginLarge;
  // const bodyWidth = pageWidth - columnWidth - gutter;

  function body(selector) {
    return `${selector} {
      grid-column: left / text;
    }
  `;
  }

  // Copyright 2018 The Distill Template Authors

  const T$1 = Template(
    "d-abstract",
    `
<style>
  :host {
    font-size: 1.25rem;
    line-height: 1.6em;
    color: rgba(0, 0, 0, 0.7);
    -webkit-font-smoothing: antialiased;
  }

  ::slotted(p) {
    margin-top: 0;
    margin-bottom: 1em;
    grid-column: text-start / middle-end;
  }
  ${body("d-abstract")}
</style>

<slot></slot>
`
  );

  class Abstract extends T$1(HTMLElement) {}

  // Copyright 2018 The Distill Template Authors

  const T$2 = Template(
    "d-appendix",
    `
<style>

d-appendix {
  contain: layout style;
  font-size: 0.8em;
  line-height: 1.7em;
  margin-top: 60px;
  margin-bottom: 0;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  color: rgba(0,0,0,0.5);
  padding-top: 60px;
  padding-bottom: 48px;
}

d-appendix h3 {
  grid-column: page-start / text-start;
  font-size: 15px;
  font-weight: 500;
  margin-top: 1em;
  margin-bottom: 0;
  color: rgba(0,0,0,0.65);
}

d-appendix h3 + * {
  margin-top: 1em;
}

d-appendix ol {
  padding: 0 0 0 15px;
}

@media (min-width: 768px) {
  d-appendix ol {
    padding: 0 0 0 30px;
    margin-left: -30px;
  }
}

d-appendix li {
  margin-bottom: 1em;
}

d-appendix a {
  color: rgba(0, 0, 0, 0.6);
}

d-appendix > * {
  grid-column: text;
}

d-appendix > d-footnote-list,
d-appendix > d-citation-list,
d-appendix > distill-appendix {
  grid-column: screen;
}

</style>

`,
    false
  );

  class Appendix extends T$2(HTMLElement) {}

  // Copyright 2018 The Distill Template Authors
  //
  // Licensed under the Apache License, Version 2.0 (the "License");
  // you may not use this file except in compliance with the License.
  // You may obtain a copy of the License at
  //
  //      http://www.apache.org/licenses/LICENSE-2.0
  //
  // Unless required by applicable law or agreed to in writing, software
  // distributed under the License is distributed on an "AS IS" BASIS,
  // WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  // See the License for the specific language governing permissions and
  // limitations under the License.

  // import { Template } from '../mixins/template';
  // import { Controller } from '../controller';

  const isOnlyWhitespace = /^\s*$/;

  class Article extends HTMLElement {
    static get is() {
      return "d-article";
    }

    constructor() {
      super();

      new MutationObserver((mutations) => {
        for (const mutation of mutations) {
          for (const addedNode of mutation.addedNodes) {
            switch (addedNode.nodeName) {
              case "#text":
                {
                  // usually text nodes are only linebreaks.
                  const text = addedNode.nodeValue;
                  if (!isOnlyWhitespace.test(text)) {
                    console.warn(
                      "Use of unwrapped text in distill articles is discouraged as it breaks layout! Please wrap any text in a <span> or <p> tag. We found the following text: " +
                        text
                    );
                    const wrapper = document.createElement("span");
                    wrapper.innerHTML = addedNode.nodeValue;
                    addedNode.parentNode.insertBefore(wrapper, addedNode);
                    addedNode.parentNode.removeChild(addedNode);
                  }
                }
                break;
            }
          }
        }
      }).observe(this, { childList: true });
    }
  }

  var commonjsGlobal =
    typeof globalThis !== "undefined"
      ? globalThis
      : typeof window !== "undefined"
        ? window
        : typeof global !== "undefined"
          ? global
          : typeof self !== "undefined"
            ? self
            : {};

  function createCommonjsModule(fn, module) {
    return (module = { exports: {} }), fn(module, module.exports), module.exports;
  }

  var bibtexParse = createCommonjsModule(function (module, exports) {
    /* start bibtexParse 0.0.22 */

    //Original work by Henrik Muehe (c) 2010
    //
    //CommonJS port by Mikola Lysenko 2013
    //
    //Port to Browser lib by ORCID / RCPETERS
    //
    //Issues:
    //no comment handling within strings
    //no string concatenation
    //no variable values yet
    //Grammar implemented here:
    //bibtex -> (string | preamble | comment | entry)*;
    //string -> '@STRING' '{' key_equals_value '}';
    //preamble -> '@PREAMBLE' '{' value '}';
    //comment -> '@COMMENT' '{' value '}';
    //entry -> '@' key '{' key ',' key_value_list '}';
    //key_value_list -> key_equals_value (',' key_equals_value)*;
    //key_equals_value -> key '=' value;
    //value -> value_quotes | value_braces | key;
    //value_quotes -> '"' .*? '"'; // not quite
    //value_braces -> '{' .*? '"'; // not quite
    (function (exports) {
      function BibtexParser() {
        this.months = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"];
        this.notKey = [",", "{", "}", " ", "="];
        this.pos = 0;
        this.input = "";
        this.entries = new Array();

        this.currentEntry = "";

        this.setInput = function (t) {
          this.input = t;
        };

        this.getEntries = function () {
          return this.entries;
        };

        this.isWhitespace = function (s) {
          return s == " " || s == "\r" || s == "\t" || s == "\n";
        };

        this.match = function (s, canCommentOut) {
          if (canCommentOut == undefined || canCommentOut == null) canCommentOut = true;
          this.skipWhitespace(canCommentOut);
          if (this.input.substring(this.pos, this.pos + s.length) == s) {
            this.pos += s.length;
          } else {
            throw "Token mismatch, expected " + s + ", found " + this.input.substring(this.pos);
          }
          this.skipWhitespace(canCommentOut);
        };

        this.tryMatch = function (s, canCommentOut) {
          if (canCommentOut == undefined || canCommentOut == null) canCommentOut = true;
          this.skipWhitespace(canCommentOut);
          if (this.input.substring(this.pos, this.pos + s.length) == s) {
            return true;
          } else {
            return false;
          }
        };

        /* when search for a match all text can be ignored, not just white space */
        this.matchAt = function () {
          while (this.input.length > this.pos && this.input[this.pos] != "@") {
            this.pos++;
          }
          if (this.input[this.pos] == "@") {
            return true;
          }
          return false;
        };

        this.skipWhitespace = function (canCommentOut) {
          while (this.isWhitespace(this.input[this.pos])) {
            this.pos++;
          }
          if (this.input[this.pos] == "%" && canCommentOut == true) {
            while (this.input[this.pos] != "\n") {
              this.pos++;
            }
            this.skipWhitespace(canCommentOut);
          }
        };

        this.value_braces = function () {
          var bracecount = 0;
          this.match("{", false);
          var start = this.pos;
          var escaped = false;
          while (true) {
            if (!escaped) {
              if (this.input[this.pos] == "}") {
                if (bracecount > 0) {
                  bracecount--;
                } else {
                  var end = this.pos;
                  this.match("}", false);
                  return this.input.substring(start, end);
                }
              } else if (this.input[this.pos] == "{") {
                bracecount++;
              } else if (this.pos >= this.input.length - 1) {
                throw "Unterminated value";
              }
            }
            if (this.input[this.pos] == "\\" && escaped == false) escaped = true;
            else escaped = false;
            this.pos++;
          }
        };

        this.value_comment = function () {
          var str = "";
          var brcktCnt = 0;
          while (!(this.tryMatch("}", false) && brcktCnt == 0)) {
            str = str + this.input[this.pos];
            if (this.input[this.pos] == "{") brcktCnt++;
            if (this.input[this.pos] == "}") brcktCnt--;
            if (this.pos >= this.input.length - 1) {
              throw "Unterminated value:" + this.input.substring(start);
            }
            this.pos++;
          }
          return str;
        };

        this.value_quotes = function () {
          this.match('"', false);
          var start = this.pos;
          var escaped = false;
          while (true) {
            if (!escaped) {
              if (this.input[this.pos] == '"') {
                var end = this.pos;
                this.match('"', false);
                return this.input.substring(start, end);
              } else if (this.pos >= this.input.length - 1) {
                throw "Unterminated value:" + this.input.substring(start);
              }
            }
            if (this.input[this.pos] == "\\" && escaped == false) escaped = true;
            else escaped = false;
            this.pos++;
          }
        };

        this.single_value = function () {
          var start = this.pos;
          if (this.tryMatch("{")) {
            return this.value_braces();
          } else if (this.tryMatch('"')) {
            return this.value_quotes();
          } else {
            var k = this.key();
            if (k.match("^[0-9]+$")) return k;
            else if (this.months.indexOf(k.toLowerCase()) >= 0) return k.toLowerCase();
            else throw "Value expected:" + this.input.substring(start) + " for key: " + k;
          }
        };

        this.value = function () {
          var values = [];
          values.push(this.single_value());
          while (this.tryMatch("#")) {
            this.match("#");
            values.push(this.single_value());
          }
          return values.join("");
        };

        this.key = function () {
          var start = this.pos;
          while (true) {
            if (this.pos >= this.input.length) {
              throw "Runaway key";
            } // а-яА-Я is Cyrillic
            //console.log(this.input[this.pos]);
            if (this.notKey.indexOf(this.input[this.pos]) >= 0) {
              return this.input.substring(start, this.pos);
            } else {
              this.pos++;
            }
          }
        };

        this.key_equals_value = function () {
          var key = this.key();
          if (this.tryMatch("=")) {
            this.match("=");
            var val = this.value();
            return [key, val];
          } else {
            throw "... = value expected, equals sign missing:" + this.input.substring(this.pos);
          }
        };

        this.key_value_list = function () {
          var kv = this.key_equals_value();
          this.currentEntry["entryTags"] = {};
          this.currentEntry["entryTags"][kv[0]] = kv[1];
          while (this.tryMatch(",")) {
            this.match(",");
            // fixes problems with commas at the end of a list
            if (this.tryMatch("}")) {
              break;
            }
            kv = this.key_equals_value();
            this.currentEntry["entryTags"][kv[0]] = kv[1];
          }
        };

        this.entry_body = function (d) {
          this.currentEntry = {};
          this.currentEntry["citationKey"] = this.key();
          this.currentEntry["entryType"] = d.substring(1);
          this.match(",");
          this.key_value_list();
          this.entries.push(this.currentEntry);
        };

        this.directive = function () {
          this.match("@");
          return "@" + this.key();
        };

        this.preamble = function () {
          this.currentEntry = {};
          this.currentEntry["entryType"] = "PREAMBLE";
          this.currentEntry["entry"] = this.value_comment();
          this.entries.push(this.currentEntry);
        };

        this.comment = function () {
          this.currentEntry = {};
          this.currentEntry["entryType"] = "COMMENT";
          this.currentEntry["entry"] = this.value_comment();
          this.entries.push(this.currentEntry);
        };

        this.entry = function (d) {
          this.entry_body(d);
        };

        this.bibtex = function () {
          while (this.matchAt()) {
            var d = this.directive();
            this.match("{");
            if (d == "@STRING") {
              this.string();
            } else if (d == "@PREAMBLE") {
              this.preamble();
            } else if (d == "@COMMENT") {
              this.comment();
            } else {
              this.entry(d);
            }
            this.match("}");
          }
        };
      }
      exports.toJSON = function (bibtex) {
        var b = new BibtexParser();
        b.setInput(bibtex);
        b.bibtex();
        return b.entries;
      };

      /* added during hackathon don't hate on me */
      exports.toBibtex = function (json) {
        var out = "";
        for (var i in json) {
          out += "@" + json[i].entryType;
          out += "{";
          if (json[i].citationKey) out += json[i].citationKey + ", ";
          if (json[i].entry) out += json[i].entry;
          if (json[i].entryTags) {
            var tags = "";
            for (var jdx in json[i].entryTags) {
              if (tags.length != 0) tags += ", ";
              tags += jdx + "= {" + json[i].entryTags[jdx] + "}";
            }
            out += tags;
          }
          out += "}\n\n";
        }
        return out;
      };
    })(exports);

    /* end bibtexParse */
  });

  // Copyright 2018 The Distill Template Authors

  function normalizeTag(string) {
    return string
      .replace(/[\t\n ]+/g, " ")
      .replace(/{\\["^`.'acu~Hvs]( )?([a-zA-Z])}/g, (full, x, char) => char)
      .replace(/{\\([a-zA-Z])}/g, (full, char) => char);
  }

  function parseBibtex(bibtex) {
    const bibliography = new Map();
    const parsedEntries = bibtexParse.toJSON(bibtex);
    for (const entry of parsedEntries) {
      // normalize tags; note entryTags is an object, not Map
      for (const [key, value] of Object.entries(entry.entryTags)) {
        entry.entryTags[key.toLowerCase()] = normalizeTag(value);
      }
      entry.entryTags.type = entry.entryType;
      // add to bibliography
      bibliography.set(entry.citationKey, entry.entryTags);
    }
    return bibliography;
  }

  function serializeFrontmatterToBibtex(frontMatter) {
    return `@article{${frontMatter.slug},
  author = {${frontMatter.bibtexAuthors}},
  title = {${frontMatter.title}},
  journal = {${frontMatter.journal.title}},
  year = {${frontMatter.publishedYear}},
  note = {${frontMatter.url}},
  doi = {${frontMatter.doi}}
}`;
  }

  // Copyright 2018 The Distill Template Authors

  class Bibliography extends HTMLElement {
    static get is() {
      return "d-bibliography";
    }

    constructor() {
      super();

      // set up mutation observer
      const options = {
        childList: true,
        characterData: true,
        subtree: true,
      };
      const observer = new MutationObserver((entries) => {
        for (const entry of entries) {
          if (entry.target.nodeName === "SCRIPT" || entry.type === "characterData") {
            this.parseIfPossible();
          }
        }
      });
      observer.observe(this, options);
    }

    connectedCallback() {
      requestAnimationFrame(() => {
        this.parseIfPossible();
      });
    }

    parseIfPossible() {
      const scriptTag = this.querySelector("script");
      if (!scriptTag) return;
      if (scriptTag.type == "text/bibtex") {
        const newBibtex = scriptTag.textContent;
        if (this.bibtex !== newBibtex) {
          this.bibtex = newBibtex;
          const bibliography = parseBibtex(this.bibtex);
          this.notify(bibliography);
        }
      } else if (scriptTag.type == "text/json") {
        const bibliography = new Map(JSON.parse(scriptTag.textContent));
        this.notify(bibliography);
      } else {
        console.warn("Unsupported bibliography script tag type: " + scriptTag.type);
      }
    }

    notify(bibliography) {
      const options = { detail: bibliography, bubbles: true };
      const event = new CustomEvent("onBibliographyChanged", options);
      this.dispatchEvent(event);
    }

    /* observe 'src' attribute */

    static get observedAttributes() {
      return ["src"];
    }

    receivedBibtex(event) {
      const bibliography = parseBibtex(event.target.response);
      this.notify(bibliography);
    }

    attributeChangedCallback(name, oldValue, newValue) {
      var oReq = new XMLHttpRequest();
      oReq.onload = (e) => this.receivedBibtex(e);
      oReq.onerror = () => console.warn(`Could not load Bibtex! (tried ${newValue})`);
      oReq.responseType = "text";
      oReq.open("GET", newValue, true);
      oReq.send();
    }
  }

  // Copyright 2018 The Distill Template Authors
  //
  // Licensed under the Apache License, Version 2.0 (the "License");
  // you may not use this file except in compliance with the License.
  // You may obtain a copy of the License at
  //
  //      http://www.apache.org/licenses/LICENSE-2.0
  //
  // Unless required by applicable law or agreed to in writing, software
  // distributed under the License is distributed on an "AS IS" BASIS,
  // WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  // See the License for the specific language governing permissions and
  // limitations under the License.

  // import style from '../styles/d-byline.css';

  function bylineTemplate(frontMatter) {
    return `
  <div class="byline grid">
    <div class="authors-affiliations grid">
      <h3>Authors</h3>
      <h3>Affiliations</h3>
      ${frontMatter.authors
        .map(
          (author) => `
        <p class="author">
          ${
            author.personalURL
              ? `
            <a class="name" href="${author.personalURL}">${author.name}</a>`
              : `
            <span class="name">${author.name}</span>`
          }
        </p>
        <p class="affiliation">
        ${author.affiliations
          .map((affiliation) =>
            affiliation.url
              ? `<a class="affiliation" href="${affiliation.url}">${affiliation.name}</a>`
              : `<span class="affiliation">${affiliation.name}</span>`
          )
          .join(", ")}
        </p>
      `
        )
        .join("")}
    </div>
    <div>
      <h3>Published</h3>
      ${
        frontMatter.publishedDate
          ? `
        <p>${frontMatter.publishedMonth} ${frontMatter.publishedDay}, ${frontMatter.publishedYear}</p> `
          : `
        <p><em>Not published yet.</em></p>`
      }
    </div>
  </div>
`;
  }

  class Byline extends HTMLElement {
    static get is() {
      return "d-byline";
    }

    set frontMatter(frontMatter) {
      this.innerHTML = bylineTemplate(frontMatter);
    }
  }

  // Copyright 2018 The Distill Template Authors

  const T$3 = Template(
    "d-cite",
    `
<style>

:host {
  display: inline-block;
}

.citation {
  color: hsla(206, 90%, 20%, 0.7);
}

.citation-number {
  cursor: default;
  white-space: nowrap;
  font-family: -apple-system, BlinkMacSystemFont, "Roboto", Helvetica, sans-serif;
  font-size: 75%;
  color: hsla(206, 90%, 20%, 0.7);
  display: inline-block;
  line-height: 1.1em;
  text-align: center;
  position: relative;
  top: -2px;
  margin: 0 2px;
}

figcaption .citation-number {
  font-size: 11px;
  font-weight: normal;
  top: -2px;
  line-height: 1em;
}

ul {
  margin: 0;
  padding: 0;
  list-style-type: none;
}

ul li {
  padding: 15px 10px 15px 10px;
  border-bottom: 1px solid rgba(0,0,0,0.1)
}

ul li:last-of-type {
  border-bottom: none;
}

</style>

<d-hover-box id="hover-box"></d-hover-box>

<div id="citation-" class="citation">
  <span class="citation-number"></span>
</div>
`
  );

  class Cite extends T$3(HTMLElement) {
    /* Lifecycle */
    constructor() {
      super();
      this._numbers = [];
      this._entries = [];
    }

    connectedCallback() {
      this.outerSpan = this.root.querySelector("#citation-");
      this.innerSpan = this.root.querySelector(".citation-number");
      this.hoverBox = this.root.querySelector("d-hover-box");
      window.customElements.whenDefined("d-hover-box").then(() => {
        this.hoverBox.listen(this);
      });
      // in case this component got connected after values were set
      if (this.numbers) {
        this.displayNumbers(this.numbers);
      }
      if (this.entries) {
        this.displayEntries(this.entries);
      }
    }

    //TODO This causes an infinite loop on firefox with polyfills.
    // This is only needed for interactive editing so no priority.
    // disconnectedCallback() {
    // const options = { detail: [this, this.keys], bubbles: true };
    // const event = new CustomEvent('onCiteKeyRemoved', options);
    // document.dispatchEvent(event);
    // }

    /* observe 'key' attribute */

    static get observedAttributes() {
      return ["key", "bibtex-key"];
    }

    attributeChangedCallback(name, oldValue, newValue) {
      const eventName = oldValue ? "onCiteKeyChanged" : "onCiteKeyCreated";
      const keys = newValue.split(",").map((k) => k.trim());
      const options = { detail: [this, keys], bubbles: true };
      const event = new CustomEvent(eventName, options);
      document.dispatchEvent(event);
    }

    set key(value) {
      this.setAttribute("key", value);
    }

    get key() {
      return this.getAttribute("key") || this.getAttribute("bibtex-key");
    }

    get keys() {
      const result = this.key.split(",");
      console.log(result);
      return result;
    }

    /* Setters & Rendering */

    set numbers(numbers) {
      this._numbers = numbers;
      this.displayNumbers(numbers);
    }

    get numbers() {
      return this._numbers;
    }

    displayNumbers(numbers) {
      if (!this.innerSpan) return;
      const numberStrings = numbers.map((index) => {
        return index == -1 ? "?" : index + 1 + "";
      });
      const textContent = "[" + numberStrings.join(", ") + "]";
      this.innerSpan.textContent = textContent;
    }

    set entries(entries) {
      this._entries = entries;
      this.displayEntries(entries);
    }

    get entries() {
      return this._entries;
    }

    displayEntries(entries) {
      if (!this.hoverBox) return;
      this.hoverBox.innerHTML = `<ul>
      ${entries
        .map(hover_cite)
        .map((html) => `<li>${html}</li>`)
        .join("\n")}
    </ul>`;
    }
  }

  // Copyright 2018 The Distill Template Authors

  const styles$1 = `
d-citation-list {
  contain: style;
}

d-citation-list .references {
  grid-column: text;
}

d-citation-list .references .title {
  font-weight: 500;
}
`;

  function renderCitationList(element, entries, dom = document) {
    if (entries.size > 0) {
      element.style.display = "";
      let list = element.querySelector(".references");
      if (list) {
        list.innerHTML = "";
      } else {
        const stylesTag = dom.createElement("style");
        stylesTag.innerHTML = styles$1;
        element.appendChild(stylesTag);

        const heading = dom.createElement("h3");
        heading.id = "references";
        heading.textContent = "References";
        element.appendChild(heading);

        list = dom.createElement("ol");
        list.id = "references-list";
        list.className = "references";
        element.appendChild(list);
      }

      for (const [key, entry] of entries) {
        const listItem = dom.createElement("li");
        listItem.id = key;
        listItem.innerHTML = bibliography_cite(entry);
        list.appendChild(listItem);
      }
    } else {
      element.style.display = "none";
    }
  }

  class CitationList extends HTMLElement {
    static get is() {
      return "d-citation-list";
    }

    connectedCallback() {
      if (!this.hasAttribute("distill-prerendered")) {
        this.style.display = "none";
      }
    }

    set citations(citations) {
      renderCitationList(this, citations);
    }
  }

  var prism = createCommonjsModule(function (module) {
    /* **********************************************
       Begin prism-core.js
  ********************************************** */

    var _self =
      typeof window !== "undefined"
        ? window // if in browser
        : typeof WorkerGlobalScope !== "undefined" && self instanceof WorkerGlobalScope
          ? self // if in worker
          : {}; // if in node js

    /**
     * Prism: Lightweight, robust, elegant syntax highlighting
     * MIT license http://www.opensource.org/licenses/mit-license.php/
     * @author Lea Verou http://lea.verou.me
     */

    var Prism = (function (_self) {
      // Private helper vars
      var lang = /\blang(?:uage)?-([\w-]+)\b/i;
      var uniqueId = 0;

      var _ = {
        manual: _self.Prism && _self.Prism.manual,
        disableWorkerMessageHandler: _self.Prism && _self.Prism.disableWorkerMessageHandler,
        util: {
          encode: function encode(tokens) {
            if (tokens instanceof Token) {
              return new Token(tokens.type, encode(tokens.content), tokens.alias);
            } else if (Array.isArray(tokens)) {
              return tokens.map(encode);
            } else {
              return tokens
                .replace(/&/g, "&amp;")
                .replace(/</g, "&lt;")
                .replace(/\u00a0/g, " ");
            }
          },

          type: function (o) {
            return Object.prototype.toString.call(o).slice(8, -1);
          },

          objId: function (obj) {
            if (!obj["__id"]) {
              Object.defineProperty(obj, "__id", {
                value: ++uniqueId,
              });
            }
            return obj["__id"];
          },

          // Deep clone a language definition (e.g. to extend it)
          clone: function deepClone(o, visited) {
            var clone,
              id,
              type = _.util.type(o);
            visited = visited || {};

            switch (type) {
              case "Object":
                id = _.util.objId(o);
                if (visited[id]) {
                  return visited[id];
                }
                clone = {};
                visited[id] = clone;

                for (var key in o) {
                  if (o.hasOwnProperty(key)) {
                    clone[key] = deepClone(o[key], visited);
                  }
                }

                return clone;

              case "Array":
                id = _.util.objId(o);
                if (visited[id]) {
                  return visited[id];
                }
                clone = [];
                visited[id] = clone;

                o.forEach(function (v, i) {
                  clone[i] = deepClone(v, visited);
                });

                return clone;

              default:
                return o;
            }
          },

          /**
           * Returns the Prism language of the given element set by a `language-xxxx` or `lang-xxxx` class.
           *
           * If no language is set for the element or the element is `null` or `undefined`, `none` will be returned.
           *
           * @param {Element} element
           * @returns {string}
           */
          getLanguage: function (element) {
            while (element && !lang.test(element.className)) {
              element = element.parentElement;
            }
            if (element) {
              return (element.className.match(lang) || [, "none"])[1].toLowerCase();
            }
            return "none";
          },

          /**
           * Returns the script element that is currently executing.
           *
           * This does __not__ work for line script element.
           *
           * @returns {HTMLScriptElement | null}
           */
          currentScript: function () {
            if (typeof document === "undefined") {
              return null;
            }
            if ("currentScript" in document) {
              return document.currentScript;
            }

            // IE11 workaround
            // we'll get the src of the current script by parsing IE11's error stack trace
            // this will not work for inline scripts

            try {
              throw new Error();
            } catch (err) {
              // Get file src url from stack. Specifically works with the format of stack traces in IE.
              // A stack will look like this:
              //
              // Error
              //    at _.util.currentScript (http://localhost/components/prism-core.js:119:5)
              //    at Global code (http://localhost/components/prism-core.js:606:1)

              var src = (/at [^(\r\n]*\((.*):.+:.+\)$/i.exec(err.stack) || [])[1];
              if (src) {
                var scripts = document.getElementsByTagName("script");
                for (var i in scripts) {
                  if (scripts[i].src == src) {
                    return scripts[i];
                  }
                }
              }
              return null;
            }
          },
        },

        languages: {
          extend: function (id, redef) {
            var lang = _.util.clone(_.languages[id]);

            for (var key in redef) {
              lang[key] = redef[key];
            }

            return lang;
          },

          /**
           * Insert a token before another token in a language literal
           * As this needs to recreate the object (we cannot actually insert before keys in object literals),
           * we cannot just provide an object, we need an object and a key.
           * @param inside The key (or language id) of the parent
           * @param before The key to insert before.
           * @param insert Object with the key/value pairs to insert
           * @param root The object that contains `inside`. If equal to Prism.languages, it can be omitted.
           */
          insertBefore: function (inside, before, insert, root) {
            root = root || _.languages;
            var grammar = root[inside];
            var ret = {};

            for (var token in grammar) {
              if (grammar.hasOwnProperty(token)) {
                if (token == before) {
                  for (var newToken in insert) {
                    if (insert.hasOwnProperty(newToken)) {
                      ret[newToken] = insert[newToken];
                    }
                  }
                }

                // Do not insert token which also occur in insert. See #1525
                if (!insert.hasOwnProperty(token)) {
                  ret[token] = grammar[token];
                }
              }
            }

            var old = root[inside];
            root[inside] = ret;

            // Update references in other language definitions
            _.languages.DFS(_.languages, function (key, value) {
              if (value === old && key != inside) {
                this[key] = ret;
              }
            });

            return ret;
          },

          // Traverse a language definition with Depth First Search
          DFS: function DFS(o, callback, type, visited) {
            visited = visited || {};

            var objId = _.util.objId;

            for (var i in o) {
              if (o.hasOwnProperty(i)) {
                callback.call(o, i, o[i], type || i);

                var property = o[i],
                  propertyType = _.util.type(property);

                if (propertyType === "Object" && !visited[objId(property)]) {
                  visited[objId(property)] = true;
                  DFS(property, callback, null, visited);
                } else if (propertyType === "Array" && !visited[objId(property)]) {
                  visited[objId(property)] = true;
                  DFS(property, callback, i, visited);
                }
              }
            }
          },
        },
        plugins: {},

        highlightAll: function (async, callback) {
          _.highlightAllUnder(document, async, callback);
        },

        highlightAllUnder: function (container, async, callback) {
          var env = {
            callback: callback,
            container: container,
            selector: 'code[class*="language-"], [class*="language-"] code, code[class*="lang-"], [class*="lang-"] code',
          };

          _.hooks.run("before-highlightall", env);

          env.elements = Array.prototype.slice.apply(env.container.querySelectorAll(env.selector));

          _.hooks.run("before-all-elements-highlight", env);

          for (var i = 0, element; (element = env.elements[i++]); ) {
            _.highlightElement(element, async === true, env.callback);
          }
        },

        highlightElement: function (element, async, callback) {
          // Find language
          var language = _.util.getLanguage(element);
          var grammar = _.languages[language];

          // Set language on the element, if not present
          element.className = element.className.replace(lang, "").replace(/\s+/g, " ") + " language-" + language;

          // Set language on the parent, for styling
          var parent = element.parentNode;
          if (parent && parent.nodeName.toLowerCase() === "pre") {
            parent.className = parent.className.replace(lang, "").replace(/\s+/g, " ") + " language-" + language;
          }

          var code = element.textContent;

          var env = {
            element: element,
            language: language,
            grammar: grammar,
            code: code,
          };

          function insertHighlightedCode(highlightedCode) {
            env.highlightedCode = highlightedCode;

            _.hooks.run("before-insert", env);

            env.element.innerHTML = env.highlightedCode;

            _.hooks.run("after-highlight", env);
            _.hooks.run("complete", env);
            callback && callback.call(env.element);
          }

          _.hooks.run("before-sanity-check", env);

          if (!env.code) {
            _.hooks.run("complete", env);
            callback && callback.call(env.element);
            return;
          }

          _.hooks.run("before-highlight", env);

          if (!env.grammar) {
            insertHighlightedCode(_.util.encode(env.code));
            return;
          }

          if (async && _self.Worker) {
            var worker = new Worker(_.filename);

            worker.onmessage = function (evt) {
              insertHighlightedCode(evt.data);
            };

            worker.postMessage(
              JSON.stringify({
                language: env.language,
                code: env.code,
                immediateClose: true,
              })
            );
          } else {
            insertHighlightedCode(_.highlight(env.code, env.grammar, env.language));
          }
        },

        highlight: function (text, grammar, language) {
          var env = {
            code: text,
            grammar: grammar,
            language: language,
          };
          _.hooks.run("before-tokenize", env);
          env.tokens = _.tokenize(env.code, env.grammar);
          _.hooks.run("after-tokenize", env);
          return Token.stringify(_.util.encode(env.tokens), env.language);
        },

        tokenize: function (text, grammar) {
          var rest = grammar.rest;
          if (rest) {
            for (var token in rest) {
              grammar[token] = rest[token];
            }

            delete grammar.rest;
          }

          var tokenList = new LinkedList();
          addAfter(tokenList, tokenList.head, text);

          matchGrammar(text, tokenList, grammar, tokenList.head, 0);

          return toArray(tokenList);
        },

        hooks: {
          all: {},

          add: function (name, callback) {
            var hooks = _.hooks.all;

            hooks[name] = hooks[name] || [];

            hooks[name].push(callback);
          },

          run: function (name, env) {
            var callbacks = _.hooks.all[name];

            if (!callbacks || !callbacks.length) {
              return;
            }

            for (var i = 0, callback; (callback = callbacks[i++]); ) {
              callback(env);
            }
          },
        },

        Token: Token,
      };

      _self.Prism = _;

      function Token(type, content, alias, matchedStr, greedy) {
        this.type = type;
        this.content = content;
        this.alias = alias;
        // Copy of the full string this token was created from
        this.length = (matchedStr || "").length | 0;
        this.greedy = !!greedy;
      }

      Token.stringify = function stringify(o, language) {
        if (typeof o == "string") {
          return o;
        }
        if (Array.isArray(o)) {
          var s = "";
          o.forEach(function (e) {
            s += stringify(e, language);
          });
          return s;
        }

        var env = {
          type: o.type,
          content: stringify(o.content, language),
          tag: "span",
          classes: ["token", o.type],
          attributes: {},
          language: language,
        };

        var aliases = o.alias;
        if (aliases) {
          if (Array.isArray(aliases)) {
            Array.prototype.push.apply(env.classes, aliases);
          } else {
            env.classes.push(aliases);
          }
        }

        _.hooks.run("wrap", env);

        var attributes = "";
        for (var name in env.attributes) {
          attributes += " " + name + '="' + (env.attributes[name] || "").replace(/"/g, "&quot;") + '"';
        }

        return "<" + env.tag + ' class="' + env.classes.join(" ") + '"' + attributes + ">" + env.content + "</" + env.tag + ">";
      };

      /**
       * @param {string} text
       * @param {LinkedList<string | Token>} tokenList
       * @param {any} grammar
       * @param {LinkedListNode<string | Token>} startNode
       * @param {number} startPos
       * @param {boolean} [oneshot=false]
       * @param {string} [target]
       */
      function matchGrammar(text, tokenList, grammar, startNode, startPos, oneshot, target) {
        for (var token in grammar) {
          if (!grammar.hasOwnProperty(token) || !grammar[token]) {
            continue;
          }

          var patterns = grammar[token];
          patterns = Array.isArray(patterns) ? patterns : [patterns];

          for (var j = 0; j < patterns.length; ++j) {
            if (target && target == token + "," + j) {
              return;
            }

            var pattern = patterns[j],
              inside = pattern.inside,
              lookbehind = !!pattern.lookbehind,
              greedy = !!pattern.greedy,
              lookbehindLength = 0,
              alias = pattern.alias;

            if (greedy && !pattern.pattern.global) {
              // Without the global flag, lastIndex won't work
              var flags = pattern.pattern.toString().match(/[imsuy]*$/)[0];
              pattern.pattern = RegExp(pattern.pattern.source, flags + "g");
            }

            pattern = pattern.pattern || pattern;

            for (
              // iterate the token list and keep track of the current token/string position
              var currentNode = startNode.next, pos = startPos;
              currentNode !== tokenList.tail;
              pos += currentNode.value.length, currentNode = currentNode.next
            ) {
              var str = currentNode.value;

              if (tokenList.length > text.length) {
                // Something went terribly wrong, ABORT, ABORT!
                return;
              }

              if (str instanceof Token) {
                continue;
              }

              var removeCount = 1; // this is the to parameter of removeBetween

              if (greedy && currentNode != tokenList.tail.prev) {
                pattern.lastIndex = pos;
                var match = pattern.exec(text);
                if (!match) {
                  break;
                }

                var from = match.index + (lookbehind && match[1] ? match[1].length : 0);
                var to = match.index + match[0].length;
                var p = pos;

                // find the node that contains the match
                p += currentNode.value.length;
                while (from >= p) {
                  currentNode = currentNode.next;
                  p += currentNode.value.length;
                }
                // adjust pos (and p)
                p -= currentNode.value.length;
                pos = p;

                // the current node is a Token, then the match starts inside another Token, which is invalid
                if (currentNode.value instanceof Token) {
                  continue;
                }

                // find the last node which is affected by this match
                for (var k = currentNode; k !== tokenList.tail && (p < to || (typeof k.value === "string" && !k.prev.value.greedy)); k = k.next) {
                  removeCount++;
                  p += k.value.length;
                }
                removeCount--;

                // replace with the new match
                str = text.slice(pos, p);
                match.index -= pos;
              } else {
                pattern.lastIndex = 0;

                var match = pattern.exec(str);
              }

              if (!match) {
                if (oneshot) {
                  break;
                }

                continue;
              }

              if (lookbehind) {
                lookbehindLength = match[1] ? match[1].length : 0;
              }

              var from = match.index + lookbehindLength,
                match = match[0].slice(lookbehindLength),
                to = from + match.length,
                before = str.slice(0, from),
                after = str.slice(to);

              var removeFrom = currentNode.prev;

              if (before) {
                removeFrom = addAfter(tokenList, removeFrom, before);
                pos += before.length;
              }

              removeRange(tokenList, removeFrom, removeCount);

              var wrapped = new Token(token, inside ? _.tokenize(match, inside) : match, alias, match, greedy);
              currentNode = addAfter(tokenList, removeFrom, wrapped);

              if (after) {
                addAfter(tokenList, currentNode, after);
              }

              if (removeCount > 1) matchGrammar(text, tokenList, grammar, currentNode.prev, pos, true, token + "," + j);

              if (oneshot) break;
            }
          }
        }
      }

      /**
       * @typedef LinkedListNode
       * @property {T} value
       * @property {LinkedListNode<T> | null} prev The previous node.
       * @property {LinkedListNode<T> | null} next The next node.
       * @template T
       */

      /**
       * @template T
       */
      function LinkedList() {
        /** @type {LinkedListNode<T>} */
        var head = { value: null, prev: null, next: null };
        /** @type {LinkedListNode<T>} */
        var tail = { value: null, prev: head, next: null };
        head.next = tail;

        /** @type {LinkedListNode<T>} */
        this.head = head;
        /** @type {LinkedListNode<T>} */
        this.tail = tail;
        this.length = 0;
      }

      /**
       * Adds a new node with the given value to the list.
       * @param {LinkedList<T>} list
       * @param {LinkedListNode<T>} node
       * @param {T} value
       * @returns {LinkedListNode<T>} The added node.
       * @template T
       */
      function addAfter(list, node, value) {
        // assumes that node != list.tail && values.length >= 0
        var next = node.next;

        var newNode = { value: value, prev: node, next: next };
        node.next = newNode;
        next.prev = newNode;
        list.length++;

        return newNode;
      }
      /**
       * Removes `count` nodes after the given node. The given node will not be removed.
       * @param {LinkedList<T>} list
       * @param {LinkedListNode<T>} node
       * @param {number} count
       * @template T
       */
      function removeRange(list, node, count) {
        var next = node.next;
        for (var i = 0; i < count && next !== list.tail; i++) {
          next = next.next;
        }
        node.next = next;
        next.prev = node;
        list.length -= i;
      }
      /**
       * @param {LinkedList<T>} list
       * @returns {T[]}
       * @template T
       */
      function toArray(list) {
        var array = [];
        var node = list.head.next;
        while (node !== list.tail) {
          array.push(node.value);
          node = node.next;
        }
        return array;
      }

      if (!_self.document) {
        if (!_self.addEventListener) {
          // in Node.js
          return _;
        }

        if (!_.disableWorkerMessageHandler) {
          // In worker
          _self.addEventListener(
            "message",
            function (evt) {
              var message = JSON.parse(evt.data),
                lang = message.language,
                code = message.code,
                immediateClose = message.immediateClose;

              _self.postMessage(_.highlight(code, _.languages[lang], lang));
              if (immediateClose) {
                _self.close();
              }
            },
            false
          );
        }

        return _;
      }

      //Get current script and highlight
      var script = _.util.currentScript();

      if (script) {
        _.filename = script.src;

        if (script.hasAttribute("data-manual")) {
          _.manual = true;
        }
      }

      function highlightAutomaticallyCallback() {
        if (!_.manual) {
          _.highlightAll();
        }
      }

      if (!_.manual) {
        // If the document state is "loading", then we'll use DOMContentLoaded.
        // If the document state is "interactive" and the prism.js script is deferred, then we'll also use the
        // DOMContentLoaded event because there might be some plugins or languages which have also been deferred and they
        // might take longer one animation frame to execute which can create a race condition where only some plugins have
        // been loaded when Prism.highlightAll() is executed, depending on how fast resources are loaded.
        // See https://github.com/PrismJS/prism/issues/2102
        var readyState = document.readyState;
        if (readyState === "loading" || (readyState === "interactive" && script && script.defer)) {
          document.addEventListener("DOMContentLoaded", highlightAutomaticallyCallback);
        } else {
          if (window.requestAnimationFrame) {
            window.requestAnimationFrame(highlightAutomaticallyCallback);
          } else {
            window.setTimeout(highlightAutomaticallyCallback, 16);
          }
        }
      }

      return _;
    })(_self);

    if (module.exports) {
      module.exports = Prism;
    }

    // hack for components to work correctly in node.js
    if (typeof commonjsGlobal !== "undefined") {
      commonjsGlobal.Prism = Prism;
    }

    /* **********************************************
       Begin prism-markup.js
  ********************************************** */

    Prism.languages.markup = {
      comment: /<!--[\s\S]*?-->/,
      prolog: /<\?[\s\S]+?\?>/,
      doctype: {
        pattern: /<!DOCTYPE(?:[^>"'[\]]|"[^"]*"|'[^']*')+(?:\[(?:(?!<!--)[^"'\]]|"[^"]*"|'[^']*'|<!--[\s\S]*?-->)*\]\s*)?>/i,
        greedy: true,
      },
      cdata: /<!\[CDATA\[[\s\S]*?]]>/i,
      tag: {
        pattern: /<\/?(?!\d)[^\s>\/=$<%]+(?:\s(?:\s*[^\s>\/=]+(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+(?=[\s>]))|(?=[\s/>])))+)?\s*\/?>/i,
        greedy: true,
        inside: {
          tag: {
            pattern: /^<\/?[^\s>\/]+/i,
            inside: {
              punctuation: /^<\/?/,
              namespace: /^[^\s>\/:]+:/,
            },
          },
          "attr-value": {
            pattern: /=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+)/i,
            inside: {
              punctuation: [
                /^=/,
                {
                  pattern: /^(\s*)["']|["']$/,
                  lookbehind: true,
                },
              ],
            },
          },
          punctuation: /\/?>/,
          "attr-name": {
            pattern: /[^\s>\/]+/,
            inside: {
              namespace: /^[^\s>\/:]+:/,
            },
          },
        },
      },
      entity: /&#?[\da-z]{1,8};/i,
    };

    Prism.languages.markup["tag"].inside["attr-value"].inside["entity"] = Prism.languages.markup["entity"];

    // Plugin to make entity title show the real entity, idea by Roman Komarov
    Prism.hooks.add("wrap", function (env) {
      if (env.type === "entity") {
        env.attributes["title"] = env.content.replace(/&amp;/, "&");
      }
    });

    Object.defineProperty(Prism.languages.markup.tag, "addInlined", {
      /**
       * Adds an inlined language to markup.
       *
       * An example of an inlined language is CSS with `<style>` tags.
       *
       * @param {string} tagName The name of the tag that contains the inlined language. This name will be treated as
       * case insensitive.
       * @param {string} lang The language key.
       * @example
       * addInlined('style', 'css');
       */
      value: function addInlined(tagName, lang) {
        var includedCdataInside = {};
        includedCdataInside["language-" + lang] = {
          pattern: /(^<!\[CDATA\[)[\s\S]+?(?=\]\]>$)/i,
          lookbehind: true,
          inside: Prism.languages[lang],
        };
        includedCdataInside["cdata"] = /^<!\[CDATA\[|\]\]>$/i;

        var inside = {
          "included-cdata": {
            pattern: /<!\[CDATA\[[\s\S]*?\]\]>/i,
            inside: includedCdataInside,
          },
        };
        inside["language-" + lang] = {
          pattern: /[\s\S]+/,
          inside: Prism.languages[lang],
        };

        var def = {};
        def[tagName] = {
          pattern: RegExp(
            /(<__[\s\S]*?>)(?:<!\[CDATA\[[\s\S]*?\]\]>\s*|[\s\S])*?(?=<\/__>)/.source.replace(/__/g, function () {
              return tagName;
            }),
            "i"
          ),
          lookbehind: true,
          greedy: true,
          inside: inside,
        };

        Prism.languages.insertBefore("markup", "cdata", def);
      },
    });

    Prism.languages.xml = Prism.languages.extend("markup", {});
    Prism.languages.html = Prism.languages.markup;
    Prism.languages.mathml = Prism.languages.markup;
    Prism.languages.svg = Prism.languages.markup;

    /* **********************************************
       Begin prism-css.js
  ********************************************** */

    (function (Prism) {
      var string = /("|')(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/;

      Prism.languages.css = {
        comment: /\/\*[\s\S]*?\*\//,
        atrule: {
          pattern: /@[\w-]+[\s\S]*?(?:;|(?=\s*\{))/,
          inside: {
            rule: /^@[\w-]+/,
            "selector-function-argument": {
              pattern: /(\bselector\s*\((?!\s*\))\s*)(?:[^()]|\((?:[^()]|\([^()]*\))*\))+?(?=\s*\))/,
              lookbehind: true,
              alias: "selector",
            },
            // See rest below
          },
        },
        url: {
          pattern: RegExp("url\\((?:" + string.source + "|[^\n\r()]*)\\)", "i"),
          greedy: true,
          inside: {
            function: /^url/i,
            punctuation: /^\(|\)$/,
          },
        },
        selector: RegExp("[^{}\\s](?:[^{};\"']|" + string.source + ")*?(?=\\s*\\{)"),
        string: {
          pattern: string,
          greedy: true,
        },
        property: /[-_a-z\xA0-\uFFFF][-\w\xA0-\uFFFF]*(?=\s*:)/i,
        important: /!important\b/i,
        function: /[-a-z0-9]+(?=\()/i,
        punctuation: /[(){};:,]/,
      };

      Prism.languages.css["atrule"].inside.rest = Prism.languages.css;

      var markup = Prism.languages.markup;
      if (markup) {
        markup.tag.addInlined("style", "css");

        Prism.languages.insertBefore(
          "inside",
          "attr-value",
          {
            "style-attr": {
              pattern: /\s*style=("|')(?:\\[\s\S]|(?!\1)[^\\])*\1/i,
              inside: {
                "attr-name": {
                  pattern: /^\s*style/i,
                  inside: markup.tag.inside,
                },
                punctuation: /^\s*=\s*['"]|['"]\s*$/,
                "attr-value": {
                  pattern: /.+/i,
                  inside: Prism.languages.css,
                },
              },
              alias: "language-css",
            },
          },
          markup.tag
        );
      }
    })(Prism);

    /* **********************************************
       Begin prism-clike.js
  ********************************************** */

    Prism.languages.clike = {
      comment: [
        {
          pattern: /(^|[^\\])\/\*[\s\S]*?(?:\*\/|$)/,
          lookbehind: true,
        },
        {
          pattern: /(^|[^\\:])\/\/.*/,
          lookbehind: true,
          greedy: true,
        },
      ],
      string: {
        pattern: /(["'])(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,
        greedy: true,
      },
      "class-name": {
        pattern: /(\b(?:class|interface|extends|implements|trait|instanceof|new)\s+|\bcatch\s+\()[\w.\\]+/i,
        lookbehind: true,
        inside: {
          punctuation: /[.\\]/,
        },
      },
      keyword: /\b(?:if|else|while|do|for|return|in|instanceof|function|new|try|throw|catch|finally|null|break|continue)\b/,
      boolean: /\b(?:true|false)\b/,
      function: /\w+(?=\()/,
      number: /\b0x[\da-f]+\b|(?:\b\d+\.?\d*|\B\.\d+)(?:e[+-]?\d+)?/i,
      operator: /[<>]=?|[!=]=?=?|--?|\+\+?|&&?|\|\|?|[?*/~^%]/,
      punctuation: /[{}[\];(),.:]/,
    };

    /* **********************************************
       Begin prism-javascript.js
  ********************************************** */

    Prism.languages.javascript = Prism.languages.extend("clike", {
      "class-name": [
        Prism.languages.clike["class-name"],
        {
          pattern: /(^|[^$\w\xA0-\uFFFF])[_$A-Z\xA0-\uFFFF][$\w\xA0-\uFFFF]*(?=\.(?:prototype|constructor))/,
          lookbehind: true,
        },
      ],
      keyword: [
        {
          pattern: /((?:^|})\s*)(?:catch|finally)\b/,
          lookbehind: true,
        },
        {
          pattern:
            /(^|[^.]|\.\.\.\s*)\b(?:as|async(?=\s*(?:function\b|\(|[$\w\xA0-\uFFFF]|$))|await|break|case|class|const|continue|debugger|default|delete|do|else|enum|export|extends|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)\b/,
          lookbehind: true,
        },
      ],
      number:
        /\b(?:(?:0[xX](?:[\dA-Fa-f](?:_[\dA-Fa-f])?)+|0[bB](?:[01](?:_[01])?)+|0[oO](?:[0-7](?:_[0-7])?)+)n?|(?:\d(?:_\d)?)+n|NaN|Infinity)\b|(?:\b(?:\d(?:_\d)?)+\.?(?:\d(?:_\d)?)*|\B\.(?:\d(?:_\d)?)+)(?:[Ee][+-]?(?:\d(?:_\d)?)+)?/,
      // Allow for all non-ASCII characters (See http://stackoverflow.com/a/2008444)
      function: /#?[_$a-zA-Z\xA0-\uFFFF][$\w\xA0-\uFFFF]*(?=\s*(?:\.\s*(?:apply|bind|call)\s*)?\()/,
      operator: /--|\+\+|\*\*=?|=>|&&|\|\||[!=]==|<<=?|>>>?=?|[-+*/%&|^!=<>]=?|\.{3}|\?[.?]?|[~:]/,
    });

    Prism.languages.javascript["class-name"][0].pattern = /(\b(?:class|interface|extends|implements|instanceof|new)\s+)[\w.\\]+/;

    Prism.languages.insertBefore("javascript", "keyword", {
      regex: {
        pattern:
          /((?:^|[^$\w\xA0-\uFFFF."'\])\s])\s*)\/(?:\[(?:[^\]\\\r\n]|\\.)*]|\\.|[^/\\\[\r\n])+\/[gimyus]{0,6}(?=(?:\s|\/\*[\s\S]*?\*\/)*(?:$|[\r\n,.;:})\]]|\/\/))/,
        lookbehind: true,
        greedy: true,
      },
      // This must be declared before keyword because we use "function" inside the look-forward
      "function-variable": {
        pattern:
          /#?[_$a-zA-Z\xA0-\uFFFF][$\w\xA0-\uFFFF]*(?=\s*[=:]\s*(?:async\s*)?(?:\bfunction\b|(?:\((?:[^()]|\([^()]*\))*\)|[_$a-zA-Z\xA0-\uFFFF][$\w\xA0-\uFFFF]*)\s*=>))/,
        alias: "function",
      },
      parameter: [
        {
          pattern: /(function(?:\s+[_$A-Za-z\xA0-\uFFFF][$\w\xA0-\uFFFF]*)?\s*\(\s*)(?!\s)(?:[^()]|\([^()]*\))+?(?=\s*\))/,
          lookbehind: true,
          inside: Prism.languages.javascript,
        },
        {
          pattern: /[_$a-z\xA0-\uFFFF][$\w\xA0-\uFFFF]*(?=\s*=>)/i,
          inside: Prism.languages.javascript,
        },
        {
          pattern: /(\(\s*)(?!\s)(?:[^()]|\([^()]*\))+?(?=\s*\)\s*=>)/,
          lookbehind: true,
          inside: Prism.languages.javascript,
        },
        {
          pattern:
            /((?:\b|\s|^)(?!(?:as|async|await|break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)(?![$\w\xA0-\uFFFF]))(?:[_$A-Za-z\xA0-\uFFFF][$\w\xA0-\uFFFF]*\s*)\(\s*)(?!\s)(?:[^()]|\([^()]*\))+?(?=\s*\)\s*\{)/,
          lookbehind: true,
          inside: Prism.languages.javascript,
        },
      ],
      constant: /\b[A-Z](?:[A-Z_]|\dx?)*\b/,
    });

    Prism.languages.insertBefore("javascript", "string", {
      "template-string": {
        pattern: /`(?:\\[\s\S]|\${(?:[^{}]|{(?:[^{}]|{[^}]*})*})+}|(?!\${)[^\\`])*`/,
        greedy: true,
        inside: {
          "template-punctuation": {
            pattern: /^`|`$/,
            alias: "string",
          },
          interpolation: {
            pattern: /((?:^|[^\\])(?:\\{2})*)\${(?:[^{}]|{(?:[^{}]|{[^}]*})*})+}/,
            lookbehind: true,
            inside: {
              "interpolation-punctuation": {
                pattern: /^\${|}$/,
                alias: "punctuation",
              },
              rest: Prism.languages.javascript,
            },
          },
          string: /[\s\S]+/,
        },
      },
    });

    if (Prism.languages.markup) {
      Prism.languages.markup.tag.addInlined("script", "javascript");
    }

    Prism.languages.js = Prism.languages.javascript;

    /* **********************************************
       Begin prism-file-highlight.js
  ********************************************** */

    (function () {
      if (typeof self === "undefined" || !self.Prism || !self.document || !document.querySelector) {
        return;
      }

      /**
       * @param {Element} [container=document]
       */
      self.Prism.fileHighlight = function (container) {
        container = container || document;

        var Extensions = {
          js: "javascript",
          py: "python",
          rb: "ruby",
          ps1: "powershell",
          psm1: "powershell",
          sh: "bash",
          bat: "batch",
          h: "c",
          tex: "latex",
        };

        Array.prototype.slice.call(container.querySelectorAll("pre[data-src]")).forEach(function (pre) {
          // ignore if already loaded
          if (pre.hasAttribute("data-src-loaded")) {
            return;
          }

          // load current
          var src = pre.getAttribute("data-src");

          var language,
            parent = pre;
          var lang = /\blang(?:uage)?-([\w-]+)\b/i;
          while (parent && !lang.test(parent.className)) {
            parent = parent.parentNode;
          }

          if (parent) {
            language = (pre.className.match(lang) || [, ""])[1];
          }

          if (!language) {
            var extension = (src.match(/\.(\w+)$/) || [, ""])[1];
            language = Extensions[extension] || extension;
          }

          var code = document.createElement("code");
          code.className = "language-" + language;

          pre.textContent = "";

          code.textContent = "Loading…";

          pre.appendChild(code);

          var xhr = new XMLHttpRequest();

          xhr.open("GET", src, true);

          xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {
              if (xhr.status < 400 && xhr.responseText) {
                code.textContent = xhr.responseText;

                Prism.highlightElement(code);
                // mark as loaded
                pre.setAttribute("data-src-loaded", "");
              } else if (xhr.status >= 400) {
                code.textContent = "✖ Error " + xhr.status + " while fetching file: " + xhr.statusText;
              } else {
                code.textContent = "✖ Error: File does not exist or is empty";
              }
            }
          };

          xhr.send(null);
        });
      };

      document.addEventListener("DOMContentLoaded", function () {
        // execute inside handler, for dropping Event as argument
        self.Prism.fileHighlight();
      });
    })();
  });

  Prism.languages.python = {
    comment: {
      pattern: /(^|[^\\])#.*/,
      lookbehind: true,
    },
    "string-interpolation": {
      pattern: /(?:f|rf|fr)(?:("""|''')[\s\S]+?\1|("|')(?:\\.|(?!\2)[^\\\r\n])*\2)/i,
      greedy: true,
      inside: {
        interpolation: {
          // "{" <expression> <optional "!s", "!r", or "!a"> <optional ":" format specifier> "}"
          pattern: /((?:^|[^{])(?:{{)*){(?!{)(?:[^{}]|{(?!{)(?:[^{}]|{(?!{)(?:[^{}])+})+})+}/,
          lookbehind: true,
          inside: {
            "format-spec": {
              pattern: /(:)[^:(){}]+(?=}$)/,
              lookbehind: true,
            },
            "conversion-option": {
              pattern: /![sra](?=[:}]$)/,
              alias: "punctuation",
            },
            rest: null,
          },
        },
        string: /[\s\S]+/,
      },
    },
    "triple-quoted-string": {
      pattern: /(?:[rub]|rb|br)?("""|''')[\s\S]+?\1/i,
      greedy: true,
      alias: "string",
    },
    string: {
      pattern: /(?:[rub]|rb|br)?("|')(?:\\.|(?!\1)[^\\\r\n])*\1/i,
      greedy: true,
    },
    function: {
      pattern: /((?:^|\s)def[ \t]+)[a-zA-Z_]\w*(?=\s*\()/g,
      lookbehind: true,
    },
    "class-name": {
      pattern: /(\bclass\s+)\w+/i,
      lookbehind: true,
    },
    decorator: {
      pattern: /(^\s*)@\w+(?:\.\w+)*/im,
      lookbehind: true,
      alias: ["annotation", "punctuation"],
      inside: {
        punctuation: /\./,
      },
    },
    keyword:
      /\b(?:and|as|assert|async|await|break|class|continue|def|del|elif|else|except|exec|finally|for|from|global|if|import|in|is|lambda|nonlocal|not|or|pass|print|raise|return|try|while|with|yield)\b/,
    builtin:
      /\b(?:__import__|abs|all|any|apply|ascii|basestring|bin|bool|buffer|bytearray|bytes|callable|chr|classmethod|cmp|coerce|compile|complex|delattr|dict|dir|divmod|enumerate|eval|execfile|file|filter|float|format|frozenset|getattr|globals|hasattr|hash|help|hex|id|input|int|intern|isinstance|issubclass|iter|len|list|locals|long|map|max|memoryview|min|next|object|oct|open|ord|pow|property|range|raw_input|reduce|reload|repr|reversed|round|set|setattr|slice|sorted|staticmethod|str|sum|super|tuple|type|unichr|unicode|vars|xrange|zip)\b/,
    boolean: /\b(?:True|False|None)\b/,
    number: /(?:\b(?=\d)|\B(?=\.))(?:0[bo])?(?:(?:\d|0x[\da-f])[\da-f]*\.?\d*|\.\d+)(?:e[+-]?\d+)?j?\b/i,
    operator: /[-+%=]=?|!=|\*\*?=?|\/\/?=?|<[<=>]?|>[=>]?|[&|^~]/,
    punctuation: /[{}[\];(),.:]/,
  };

  Prism.languages.python["string-interpolation"].inside["interpolation"].inside.rest = Prism.languages.python;

  Prism.languages.py = Prism.languages.python;

  Prism.languages.clike = {
    comment: [
      {
        pattern: /(^|[^\\])\/\*[\s\S]*?(?:\*\/|$)/,
        lookbehind: true,
      },
      {
        pattern: /(^|[^\\:])\/\/.*/,
        lookbehind: true,
        greedy: true,
      },
    ],
    string: {
      pattern: /(["'])(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,
      greedy: true,
    },
    "class-name": {
      pattern: /(\b(?:class|interface|extends|implements|trait|instanceof|new)\s+|\bcatch\s+\()[\w.\\]+/i,
      lookbehind: true,
      inside: {
        punctuation: /[.\\]/,
      },
    },
    keyword: /\b(?:if|else|while|do|for|return|in|instanceof|function|new|try|throw|catch|finally|null|break|continue)\b/,
    boolean: /\b(?:true|false)\b/,
    function: /\w+(?=\()/,
    number: /\b0x[\da-f]+\b|(?:\b\d+\.?\d*|\B\.\d+)(?:e[+-]?\d+)?/i,
    operator: /[<>]=?|[!=]=?=?|--?|\+\+?|&&?|\|\|?|[?*/~^%]/,
    punctuation: /[{}[\];(),.:]/,
  };

  Prism.languages.lua = {
    comment: /^#!.+|--(?:\[(=*)\[[\s\S]*?\]\1\]|.*)/m,
    // \z may be used to skip the following space
    string: {
      pattern: /(["'])(?:(?!\1)[^\\\r\n]|\\z(?:\r\n|\s)|\\(?:\r\n|[\s\S]))*\1|\[(=*)\[[\s\S]*?\]\2\]/,
      greedy: true,
    },
    number: /\b0x[a-f\d]+\.?[a-f\d]*(?:p[+-]?\d+)?\b|\b\d+(?:\.\B|\.?\d*(?:e[+-]?\d+)?\b)|\B\.\d+(?:e[+-]?\d+)?\b/i,
    keyword: /\b(?:and|break|do|else|elseif|end|false|for|function|goto|if|in|local|nil|not|or|repeat|return|then|true|until|while)\b/,
    function: /(?!\d)\w+(?=\s*(?:[({]))/,
    operator: [
      /[-+*%^&|#]|\/\/?|<[<=]?|>[>=]?|[=~]=?/,
      {
        // Match ".." but don't break "..."
        pattern: /(^|[^.])\.\.(?!\.)/,
        lookbehind: true,
      },
    ],
    punctuation: /[\[\](){},;]|\.+|:+/,
  };

  (function (Prism) {
    // $ set | grep '^[A-Z][^[:space:]]*=' | cut -d= -f1 | tr '\n' '|'
    // + LC_ALL, RANDOM, REPLY, SECONDS.
    // + make sure PS1..4 are here as they are not always set,
    // - some useless things.
    var envVars =
      "\\b(?:BASH|BASHOPTS|BASH_ALIASES|BASH_ARGC|BASH_ARGV|BASH_CMDS|BASH_COMPLETION_COMPAT_DIR|BASH_LINENO|BASH_REMATCH|BASH_SOURCE|BASH_VERSINFO|BASH_VERSION|COLORTERM|COLUMNS|COMP_WORDBREAKS|DBUS_SESSION_BUS_ADDRESS|DEFAULTS_PATH|DESKTOP_SESSION|DIRSTACK|DISPLAY|EUID|GDMSESSION|GDM_LANG|GNOME_KEYRING_CONTROL|GNOME_KEYRING_PID|GPG_AGENT_INFO|GROUPS|HISTCONTROL|HISTFILE|HISTFILESIZE|HISTSIZE|HOME|HOSTNAME|HOSTTYPE|IFS|INSTANCE|JOB|LANG|LANGUAGE|LC_ADDRESS|LC_ALL|LC_IDENTIFICATION|LC_MEASUREMENT|LC_MONETARY|LC_NAME|LC_NUMERIC|LC_PAPER|LC_TELEPHONE|LC_TIME|LESSCLOSE|LESSOPEN|LINES|LOGNAME|LS_COLORS|MACHTYPE|MAILCHECK|MANDATORY_PATH|NO_AT_BRIDGE|OLDPWD|OPTERR|OPTIND|ORBIT_SOCKETDIR|OSTYPE|PAPERSIZE|PATH|PIPESTATUS|PPID|PS1|PS2|PS3|PS4|PWD|RANDOM|REPLY|SECONDS|SELINUX_INIT|SESSION|SESSIONTYPE|SESSION_MANAGER|SHELL|SHELLOPTS|SHLVL|SSH_AUTH_SOCK|TERM|UID|UPSTART_EVENTS|UPSTART_INSTANCE|UPSTART_JOB|UPSTART_SESSION|USER|WINDOWID|XAUTHORITY|XDG_CONFIG_DIRS|XDG_CURRENT_DESKTOP|XDG_DATA_DIRS|XDG_GREETER_DATA_DIR|XDG_MENU_PREFIX|XDG_RUNTIME_DIR|XDG_SEAT|XDG_SEAT_PATH|XDG_SESSION_DESKTOP|XDG_SESSION_ID|XDG_SESSION_PATH|XDG_SESSION_TYPE|XDG_VTNR|XMODIFIERS)\\b";
    var insideString = {
      environment: {
        pattern: RegExp("\\$" + envVars),
        alias: "constant",
      },
      variable: [
        // [0]: Arithmetic Environment
        {
          pattern: /\$?\(\([\s\S]+?\)\)/,
          greedy: true,
          inside: {
            // If there is a $ sign at the beginning highlight $(( and )) as variable
            variable: [
              {
                pattern: /(^\$\(\([\s\S]+)\)\)/,
                lookbehind: true,
              },
              /^\$\(\(/,
            ],
            number: /\b0x[\dA-Fa-f]+\b|(?:\b\d+\.?\d*|\B\.\d+)(?:[Ee]-?\d+)?/,
            // Operators according to https://www.gnu.org/software/bash/manual/bashref.html#Shell-Arithmetic
            operator: /--?|-=|\+\+?|\+=|!=?|~|\*\*?|\*=|\/=?|%=?|<<=?|>>=?|<=?|>=?|==?|&&?|&=|\^=?|\|\|?|\|=|\?|:/,
            // If there is no $ sign at the beginning highlight (( and )) as punctuation
            punctuation: /\(\(?|\)\)?|,|;/,
          },
        },
        // [1]: Command Substitution
        {
          pattern: /\$\((?:\([^)]+\)|[^()])+\)|`[^`]+`/,
          greedy: true,
          inside: {
            variable: /^\$\(|^`|\)$|`$/,
          },
        },
        // [2]: Brace expansion
        {
          pattern: /\$\{[^}]+\}/,
          greedy: true,
          inside: {
            operator: /:[-=?+]?|[!\/]|##?|%%?|\^\^?|,,?/,
            punctuation: /[\[\]]/,
            environment: {
              pattern: RegExp("(\\{)" + envVars),
              lookbehind: true,
              alias: "constant",
            },
          },
        },
        /\$(?:\w+|[#?*!@$])/,
      ],
      // Escape sequences from echo and printf's manuals, and escaped quotes.
      entity: /\\(?:[abceEfnrtv\\"]|O?[0-7]{1,3}|x[0-9a-fA-F]{1,2}|u[0-9a-fA-F]{4}|U[0-9a-fA-F]{8})/,
    };

    Prism.languages.bash = {
      shebang: {
        pattern: /^#!\s*\/.*/,
        alias: "important",
      },
      comment: {
        pattern: /(^|[^"{\\$])#.*/,
        lookbehind: true,
      },
      "function-name": [
        // a) function foo {
        // b) foo() {
        // c) function foo() {
        // but not “foo {”
        {
          // a) and c)
          pattern: /(\bfunction\s+)\w+(?=(?:\s*\(?:\s*\))?\s*\{)/,
          lookbehind: true,
          alias: "function",
        },
        {
          // b)
          pattern: /\b\w+(?=\s*\(\s*\)\s*\{)/,
          alias: "function",
        },
      ],
      // Highlight variable names as variables in for and select beginnings.
      "for-or-select": {
        pattern: /(\b(?:for|select)\s+)\w+(?=\s+in\s)/,
        alias: "variable",
        lookbehind: true,
      },
      // Highlight variable names as variables in the left-hand part
      // of assignments (“=” and “+=”).
      "assign-left": {
        pattern: /(^|[\s;|&]|[<>]\()\w+(?=\+?=)/,
        inside: {
          environment: {
            pattern: RegExp("(^|[\\s;|&]|[<>]\\()" + envVars),
            lookbehind: true,
            alias: "constant",
          },
        },
        alias: "variable",
        lookbehind: true,
      },
      string: [
        // Support for Here-documents https://en.wikipedia.org/wiki/Here_document
        {
          pattern: /((?:^|[^<])<<-?\s*)(\w+?)\s*(?:\r?\n|\r)[\s\S]*?(?:\r?\n|\r)\2/,
          lookbehind: true,
          greedy: true,
          inside: insideString,
        },
        // Here-document with quotes around the tag
        // → No expansion (so no “inside”).
        {
          pattern: /((?:^|[^<])<<-?\s*)(["'])(\w+)\2\s*(?:\r?\n|\r)[\s\S]*?(?:\r?\n|\r)\3/,
          lookbehind: true,
          greedy: true,
        },
        // “Normal” string
        {
          pattern: /(^|[^\\](?:\\\\)*)(["'])(?:\\[\s\S]|\$\([^)]+\)|`[^`]+`|(?!\2)[^\\])*\2/,
          lookbehind: true,
          greedy: true,
          inside: insideString,
        },
      ],
      environment: {
        pattern: RegExp("\\$?" + envVars),
        alias: "constant",
      },
      variable: insideString.variable,
      function: {
        pattern:
          /(^|[\s;|&]|[<>]\()(?:add|apropos|apt|aptitude|apt-cache|apt-get|aspell|automysqlbackup|awk|basename|bash|bc|bconsole|bg|bzip2|cal|cat|cfdisk|chgrp|chkconfig|chmod|chown|chroot|cksum|clear|cmp|column|comm|cp|cron|crontab|csplit|curl|cut|date|dc|dd|ddrescue|debootstrap|df|diff|diff3|dig|dir|dircolors|dirname|dirs|dmesg|du|egrep|eject|env|ethtool|expand|expect|expr|fdformat|fdisk|fg|fgrep|file|find|fmt|fold|format|free|fsck|ftp|fuser|gawk|git|gparted|grep|groupadd|groupdel|groupmod|groups|grub-mkconfig|gzip|halt|head|hg|history|host|hostname|htop|iconv|id|ifconfig|ifdown|ifup|import|install|ip|jobs|join|kill|killall|less|link|ln|locate|logname|logrotate|look|lpc|lpr|lprint|lprintd|lprintq|lprm|ls|lsof|lynx|make|man|mc|mdadm|mkconfig|mkdir|mke2fs|mkfifo|mkfs|mkisofs|mknod|mkswap|mmv|more|most|mount|mtools|mtr|mutt|mv|nano|nc|netstat|nice|nl|nohup|notify-send|npm|nslookup|op|open|parted|passwd|paste|pathchk|ping|pkill|pnpm|popd|pr|printcap|printenv|ps|pushd|pv|quota|quotacheck|quotactl|ram|rar|rcp|reboot|remsync|rename|renice|rev|rm|rmdir|rpm|rsync|scp|screen|sdiff|sed|sendmail|seq|service|sftp|sh|shellcheck|shuf|shutdown|sleep|slocate|sort|split|ssh|stat|strace|su|sudo|sum|suspend|swapon|sync|tac|tail|tar|tee|time|timeout|top|touch|tr|traceroute|tsort|tty|umount|uname|unexpand|uniq|units|unrar|unshar|unzip|update-grub|uptime|useradd|userdel|usermod|users|uudecode|uuencode|v|vdir|vi|vim|virsh|vmstat|wait|watch|wc|wget|whereis|which|who|whoami|write|xargs|xdg-open|yarn|yes|zenity|zip|zsh|zypper)(?=$|[)\s;|&])/,
        lookbehind: true,
      },
      keyword: {
        pattern: /(^|[\s;|&]|[<>]\()(?:if|then|else|elif|fi|for|while|in|case|esac|function|select|do|done|until)(?=$|[)\s;|&])/,
        lookbehind: true,
      },
      // https://www.gnu.org/software/bash/manual/html_node/Shell-Builtin-Commands.html
      builtin: {
        pattern:
          /(^|[\s;|&]|[<>]\()(?:\.|:|break|cd|continue|eval|exec|exit|export|getopts|hash|pwd|readonly|return|shift|test|times|trap|umask|unset|alias|bind|builtin|caller|command|declare|echo|enable|help|let|local|logout|mapfile|printf|read|readarray|source|type|typeset|ulimit|unalias|set|shopt)(?=$|[)\s;|&])/,
        lookbehind: true,
        // Alias added to make those easier to distinguish from strings.
        alias: "class-name",
      },
      boolean: {
        pattern: /(^|[\s;|&]|[<>]\()(?:true|false)(?=$|[)\s;|&])/,
        lookbehind: true,
      },
      "file-descriptor": {
        pattern: /\B&\d\b/,
        alias: "important",
      },
      operator: {
        // Lots of redirections here, but not just that.
        pattern: /\d?<>|>\||\+=|==?|!=?|=~|<<[<-]?|[&\d]?>>|\d?[<>]&?|&[>&]?|\|[&|]?|<=?|>=?/,
        inside: {
          "file-descriptor": {
            pattern: /^\d/,
            alias: "important",
          },
        },
      },
      punctuation: /\$?\(\(?|\)\)?|\.\.|[{}[\];\\]/,
      number: {
        pattern: /(^|\s)(?:[1-9]\d*|0)(?:[.,]\d+)?\b/,
        lookbehind: true,
      },
    };

    /* Patterns in command substitution. */
    var toBeCopied = [
      "comment",
      "function-name",
      "for-or-select",
      "assign-left",
      "string",
      "environment",
      "function",
      "keyword",
      "builtin",
      "boolean",
      "file-descriptor",
      "operator",
      "punctuation",
      "number",
    ];
    var inside = insideString.variable[1].inside;
    for (var i = 0; i < toBeCopied.length; i++) {
      inside[toBeCopied[i]] = Prism.languages.bash[toBeCopied[i]];
    }

    Prism.languages.shell = Prism.languages.bash;
  })(Prism);

  Prism.languages.go = Prism.languages.extend("clike", {
    keyword:
      /\b(?:break|case|chan|const|continue|default|defer|else|fallthrough|for|func|go(?:to)?|if|import|interface|map|package|range|return|select|struct|switch|type|var)\b/,
    builtin:
      /\b(?:bool|byte|complex(?:64|128)|error|float(?:32|64)|rune|string|u?int(?:8|16|32|64)?|uintptr|append|cap|close|complex|copy|delete|imag|len|make|new|panic|print(?:ln)?|real|recover)\b/,
    boolean: /\b(?:_|iota|nil|true|false)\b/,
    operator: /[*\/%^!=]=?|\+[=+]?|-[=-]?|\|[=|]?|&(?:=|&|\^=?)?|>(?:>=?|=)?|<(?:<=?|=|-)?|:=|\.\.\./,
    number: /(?:\b0x[a-f\d]+|(?:\b\d+\.?\d*|\B\.\d+)(?:e[-+]?\d+)?)i?/i,
    string: {
      pattern: /(["'`])(?:\\[\s\S]|(?!\1)[^\\])*\1/,
      greedy: true,
    },
  });
  delete Prism.languages.go["class-name"];

  (function (Prism) {
    // Allow only one line break
    var inner = /(?:\\.|[^\\\n\r]|(?:\n|\r\n?)(?!\n|\r\n?))/.source;

    /**
     * This function is intended for the creation of the bold or italic pattern.
     *
     * This also adds a lookbehind group to the given pattern to ensure that the pattern is not backslash-escaped.
     *
     * _Note:_ Keep in mind that this adds a capturing group.
     *
     * @param {string} pattern
     * @param {boolean} starAlternative Whether to also add an alternative where all `_`s are replaced with `*`s.
     * @returns {RegExp}
     */
    function createInline(pattern, starAlternative) {
      pattern = pattern.replace(/<inner>/g, function () {
        return inner;
      });
      if (starAlternative) {
        pattern = pattern + "|" + pattern.replace(/_/g, "\\*");
      }
      return RegExp(/((?:^|[^\\])(?:\\{2})*)/.source + "(?:" + pattern + ")");
    }

    var tableCell = /(?:\\.|``.+?``|`[^`\r\n]+`|[^\\|\r\n`])+/.source;
    var tableRow = /\|?__(?:\|__)+\|?(?:(?:\n|\r\n?)|$)/.source.replace(/__/g, function () {
      return tableCell;
    });
    var tableLine = /\|?[ \t]*:?-{3,}:?[ \t]*(?:\|[ \t]*:?-{3,}:?[ \t]*)+\|?(?:\n|\r\n?)/.source;

    Prism.languages.markdown = Prism.languages.extend("markup", {});
    Prism.languages.insertBefore("markdown", "prolog", {
      blockquote: {
        // > ...
        pattern: /^>(?:[\t ]*>)*/m,
        alias: "punctuation",
      },
      table: {
        pattern: RegExp("^" + tableRow + tableLine + "(?:" + tableRow + ")*", "m"),
        inside: {
          "table-data-rows": {
            pattern: RegExp("^(" + tableRow + tableLine + ")(?:" + tableRow + ")*$"),
            lookbehind: true,
            inside: {
              "table-data": {
                pattern: RegExp(tableCell),
                inside: Prism.languages.markdown,
              },
              punctuation: /\|/,
            },
          },
          "table-line": {
            pattern: RegExp("^(" + tableRow + ")" + tableLine + "$"),
            lookbehind: true,
            inside: {
              punctuation: /\||:?-{3,}:?/,
            },
          },
          "table-header-row": {
            pattern: RegExp("^" + tableRow + "$"),
            inside: {
              "table-header": {
                pattern: RegExp(tableCell),
                alias: "important",
                inside: Prism.languages.markdown,
              },
              punctuation: /\|/,
            },
          },
        },
      },
      code: [
        {
          // Prefixed by 4 spaces or 1 tab and preceded by an empty line
          pattern: /((?:^|\n)[ \t]*\n|(?:^|\r\n?)[ \t]*\r\n?)(?: {4}|\t).+(?:(?:\n|\r\n?)(?: {4}|\t).+)*/,
          lookbehind: true,
          alias: "keyword",
        },
        {
          // `code`
          // ``code``
          pattern: /``.+?``|`[^`\r\n]+`/,
          alias: "keyword",
        },
        {
          // ```optional language
          // code block
          // ```
          pattern: /^```[\s\S]*?^```$/m,
          greedy: true,
          inside: {
            "code-block": {
              pattern: /^(```.*(?:\n|\r\n?))[\s\S]+?(?=(?:\n|\r\n?)^```$)/m,
              lookbehind: true,
            },
            "code-language": {
              pattern: /^(```).+/,
              lookbehind: true,
            },
            punctuation: /```/,
          },
        },
      ],
      title: [
        {
          // title 1
          // =======

          // title 2
          // -------
          pattern: /\S.*(?:\n|\r\n?)(?:==+|--+)(?=[ \t]*$)/m,
          alias: "important",
          inside: {
            punctuation: /==+$|--+$/,
          },
        },
        {
          // # title 1
          // ###### title 6
          pattern: /(^\s*)#+.+/m,
          lookbehind: true,
          alias: "important",
          inside: {
            punctuation: /^#+|#+$/,
          },
        },
      ],
      hr: {
        // ***
        // ---
        // * * *
        // -----------
        pattern: /(^\s*)([*-])(?:[\t ]*\2){2,}(?=\s*$)/m,
        lookbehind: true,
        alias: "punctuation",
      },
      list: {
        // * item
        // + item
        // - item
        // 1. item
        pattern: /(^\s*)(?:[*+-]|\d+\.)(?=[\t ].)/m,
        lookbehind: true,
        alias: "punctuation",
      },
      "url-reference": {
        // [id]: http://example.com "Optional title"
        // [id]: http://example.com 'Optional title'
        // [id]: http://example.com (Optional title)
        // [id]: <http://example.com> "Optional title"
        pattern: /!?\[[^\]]+\]:[\t ]+(?:\S+|<(?:\\.|[^>\\])+>)(?:[\t ]+(?:"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|\((?:\\.|[^)\\])*\)))?/,
        inside: {
          variable: {
            pattern: /^(!?\[)[^\]]+/,
            lookbehind: true,
          },
          string: /(?:"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|\((?:\\.|[^)\\])*\))$/,
          punctuation: /^[\[\]!:]|[<>]/,
        },
        alias: "url",
      },
      bold: {
        // **strong**
        // __strong__

        // allow one nested instance of italic text using the same delimiter
        pattern: createInline(/__(?:(?!_)<inner>|_(?:(?!_)<inner>)+_)+__/.source, true),
        lookbehind: true,
        greedy: true,
        inside: {
          content: {
            pattern: /(^..)[\s\S]+(?=..$)/,
            lookbehind: true,
            inside: {}, // see below
          },
          punctuation: /\*\*|__/,
        },
      },
      italic: {
        // *em*
        // _em_

        // allow one nested instance of bold text using the same delimiter
        pattern: createInline(/_(?:(?!_)<inner>|__(?:(?!_)<inner>)+__)+_/.source, true),
        lookbehind: true,
        greedy: true,
        inside: {
          content: {
            pattern: /(^.)[\s\S]+(?=.$)/,
            lookbehind: true,
            inside: {}, // see below
          },
          punctuation: /[*_]/,
        },
      },
      strike: {
        // ~~strike through~~
        // ~strike~
        pattern: createInline(/(~~?)(?:(?!~)<inner>)+?\2/.source, false),
        lookbehind: true,
        greedy: true,
        inside: {
          content: {
            pattern: /(^~~?)[\s\S]+(?=\1$)/,
            lookbehind: true,
            inside: {}, // see below
          },
          punctuation: /~~?/,
        },
      },
      url: {
        // [example](http://example.com "Optional title")
        // [example][id]
        // [example] [id]
        pattern: createInline(/!?\[(?:(?!\])<inner>)+\](?:\([^\s)]+(?:[\t ]+"(?:\\.|[^"\\])*")?\)| ?\[(?:(?!\])<inner>)+\])/.source, false),
        lookbehind: true,
        greedy: true,
        inside: {
          variable: {
            pattern: /(\[)[^\]]+(?=\]$)/,
            lookbehind: true,
          },
          content: {
            pattern: /(^!?\[)[^\]]+(?=\])/,
            lookbehind: true,
            inside: {}, // see below
          },
          string: {
            pattern: /"(?:\\.|[^"\\])*"(?=\)$)/,
          },
        },
      },
    });

    ["url", "bold", "italic", "strike"].forEach(function (token) {
      ["url", "bold", "italic", "strike"].forEach(function (inside) {
        if (token !== inside) {
          Prism.languages.markdown[token].inside.content.inside[inside] = Prism.languages.markdown[inside];
        }
      });
    });

    Prism.hooks.add("after-tokenize", function (env) {
      if (env.language !== "markdown" && env.language !== "md") {
        return;
      }

      function walkTokens(tokens) {
        if (!tokens || typeof tokens === "string") {
          return;
        }

        for (var i = 0, l = tokens.length; i < l; i++) {
          var token = tokens[i];

          if (token.type !== "code") {
            walkTokens(token.content);
            continue;
          }

          /*
           * Add the correct `language-xxxx` class to this code block. Keep in mind that the `code-language` token
           * is optional. But the grammar is defined so that there is only one case we have to handle:
           *
           * token.content = [
           *     <span class="punctuation">```</span>,
           *     <span class="code-language">xxxx</span>,
           *     '\n', // exactly one new lines (\r or \n or \r\n)
           *     <span class="code-block">...</span>,
           *     '\n', // exactly one new lines again
           *     <span class="punctuation">```</span>
           * ];
           */

          var codeLang = token.content[1];
          var codeBlock = token.content[3];

          if (codeLang && codeBlock && codeLang.type === "code-language" && codeBlock.type === "code-block" && typeof codeLang.content === "string") {
            // this might be a language that Prism does not support

            // do some replacements to support C++, C#, and F#
            var lang = codeLang.content.replace(/\b#/g, "sharp").replace(/\b\+\+/g, "pp");
            // only use the first word
            lang = (/[a-z][\w-]*/i.exec(lang) || [""])[0].toLowerCase();
            var alias = "language-" + lang;

            // add alias
            if (!codeBlock.alias) {
              codeBlock.alias = [alias];
            } else if (typeof codeBlock.alias === "string") {
              codeBlock.alias = [codeBlock.alias, alias];
            } else {
              codeBlock.alias.push(alias);
            }
          }
        }
      }

      walkTokens(env.tokens);
    });

    Prism.hooks.add("wrap", function (env) {
      if (env.type !== "code-block") {
        return;
      }

      var codeLang = "";
      for (var i = 0, l = env.classes.length; i < l; i++) {
        var cls = env.classes[i];
        var match = /language-(.+)/.exec(cls);
        if (match) {
          codeLang = match[1];
          break;
        }
      }

      var grammar = Prism.languages[codeLang];

      if (!grammar) {
        if (codeLang && codeLang !== "none" && Prism.plugins.autoloader) {
          var id = "md-" + new Date().valueOf() + "-" + Math.floor(Math.random() * 1e16);
          env.attributes["id"] = id;

          Prism.plugins.autoloader.loadLanguages(codeLang, function () {
            var ele = document.getElementById(id);
            if (ele) {
              ele.innerHTML = Prism.highlight(ele.textContent, Prism.languages[codeLang], codeLang);
            }
          });
        }
      } else {
        // reverse Prism.util.encode
        var code = env.content.replace(/&lt;/g, "<").replace(/&amp;/g, "&");

        env.content = Prism.highlight(code, grammar, codeLang);
      }
    });

    Prism.languages.md = Prism.languages.markdown;
  })(Prism);

  Prism.languages.julia = {
    comment: {
      pattern: /(^|[^\\])#.*/,
      lookbehind: true,
    },
    string: /("""|''')[\s\S]+?\1|("|')(?:\\.|(?!\2)[^\\\r\n])*\2/,
    keyword:
      /\b(?:abstract|baremodule|begin|bitstype|break|catch|ccall|const|continue|do|else|elseif|end|export|finally|for|function|global|if|immutable|import|importall|in|let|local|macro|module|print|println|quote|return|struct|try|type|typealias|using|while)\b/,
    boolean: /\b(?:true|false)\b/,
    number: /(?:\b(?=\d)|\B(?=\.))(?:0[box])?(?:[\da-f]+\.?\d*|\.\d+)(?:[efp][+-]?\d+)?j?/i,
    operator: /[-+*^%÷&$\\]=?|\/[\/=]?|!=?=?|\|[=>]?|<(?:<=?|[=:])?|>(?:=|>>?=?)?|==?=?|[~≠≤≥]/,
    punctuation: /[{}[\];(),.:]/,
    constant: /\b(?:(?:NaN|Inf)(?:16|32|64)?)\b/,
  };

  var css =
    '/**\n * prism.js default theme for JavaScript, CSS and HTML\n * Based on dabblet (http://dabblet.com)\n * @author Lea Verou\n */\n\ncode[class*="language-"],\npre[class*="language-"] {\n\tcolor: black;\n\tbackground: none;\n\ttext-shadow: 0 1px white;\n\tfont-family: Consolas, Monaco, \'Andale Mono\', \'Ubuntu Mono\', monospace;\n\tfont-size: 1em;\n\ttext-align: left;\n\twhite-space: pre;\n\tword-spacing: normal;\n\tword-break: normal;\n\tword-wrap: normal;\n\tline-height: 1.5;\n\n\t-moz-tab-size: 4;\n\t-o-tab-size: 4;\n\ttab-size: 4;\n\n\t-webkit-hyphens: none;\n\t-moz-hyphens: none;\n\t-ms-hyphens: none;\n\thyphens: none;\n}\n\npre[class*="language-"]::-moz-selection, pre[class*="language-"] ::-moz-selection,\ncode[class*="language-"]::-moz-selection, code[class*="language-"] ::-moz-selection {\n\ttext-shadow: none;\n\tbackground: #b3d4fc;\n}\n\npre[class*="language-"]::selection, pre[class*="language-"] ::selection,\ncode[class*="language-"]::selection, code[class*="language-"] ::selection {\n\ttext-shadow: none;\n\tbackground: #b3d4fc;\n}\n\n@media print {\n\tcode[class*="language-"],\n\tpre[class*="language-"] {\n\t\ttext-shadow: none;\n\t}\n}\n\n/* Code blocks */\npre[class*="language-"] {\n\tpadding: 1em;\n\tmargin: .5em 0;\n\toverflow: auto;\n}\n\n:not(pre) > code[class*="language-"],\npre[class*="language-"] {\n\tbackground: #f5f2f0;\n}\n\n/* Inline code */\n:not(pre) > code[class*="language-"] {\n\tpadding: .1em;\n\tborder-radius: .3em;\n\twhite-space: normal;\n}\n\n.token.comment,\n.token.prolog,\n.token.doctype,\n.token.cdata {\n\tcolor: slategray;\n}\n\n.token.punctuation {\n\tcolor: #999;\n}\n\n.token.namespace {\n\topacity: .7;\n}\n\n.token.property,\n.token.tag,\n.token.boolean,\n.token.number,\n.token.constant,\n.token.symbol,\n.token.deleted {\n\tcolor: #905;\n}\n\n.token.selector,\n.token.attr-name,\n.token.string,\n.token.char,\n.token.builtin,\n.token.inserted {\n\tcolor: #690;\n}\n\n.token.operator,\n.token.entity,\n.token.url,\n.language-css .token.string,\n.style .token.string {\n\tcolor: #9a6e3a;\n\tbackground: hsla(0, 0%, 100%, .5);\n}\n\n.token.atrule,\n.token.attr-value,\n.token.keyword {\n\tcolor: #07a;\n}\n\n.token.function,\n.token.class-name {\n\tcolor: #DD4A68;\n}\n\n.token.regex,\n.token.important,\n.token.variable {\n\tcolor: #e90;\n}\n\n.token.important,\n.token.bold {\n\tfont-weight: bold;\n}\n.token.italic {\n\tfont-style: italic;\n}\n\n.token.entity {\n\tcursor: help;\n}\n';

  // Copyright 2018 The Distill Template Authors

  const T$4 = Template(
    "d-code",
    `
<style>

code {
  white-space: nowrap;
  background: rgba(0, 0, 0, 0.04);
  border-radius: 2px;
  padding: 4px 7px;
  font-size: 15px;
  color: rgba(0, 0, 0, 0.6);
}

pre code {
  display: block;
  border-left: 2px solid rgba(0, 0, 0, .1);
  padding: 0 0 0 36px;
}

${css}
</style>

<code id="code-container"></code>

`
  );

  class Code extends Mutating(T$4(HTMLElement)) {
    renderContent() {
      // check if language can be highlighted
      this.languageName = this.getAttribute("language");
      if (!this.languageName) {
        console.warn(
          'You need to provide a language attribute to your <d-code> block to let us know how to highlight your code; e.g.:\n <d-code language="python">zeros = np.zeros(shape)</d-code>.'
        );
        return;
      }
      const language = prism.languages[this.languageName];
      if (language == undefined) {
        console.warn(`Distill does not yet support highlighting your code block in "${this.languageName}'.`);
        return;
      }

      let content = this.textContent;
      const codeTag = this.shadowRoot.querySelector("#code-container");

      if (this.hasAttribute("block")) {
        // normalize the tab indents
        content = content.replace(/\n/, "");
        const tabs = content.match(/\s*/);
        content = content.replace(new RegExp("\n" + tabs, "g"), "\n");
        content = content.trim();
        // wrap code block in pre tag if needed
        if (codeTag.parentNode instanceof ShadowRoot) {
          const preTag = document.createElement("pre");
          this.shadowRoot.removeChild(codeTag);
          preTag.appendChild(codeTag);
          this.shadowRoot.appendChild(preTag);
        }
      }

      codeTag.className = `language-${this.languageName}`;
      codeTag.innerHTML = prism.highlight(content, language);
    }
  }

  // Copyright 2018 The Distill Template Authors

  const T$5 = Template(
    "d-footnote",
    `
<style>

d-math[block] {
  display: block;
}

:host {

}

sup {
  line-height: 1em;
  font-size: 0.75em;
  position: relative;
  top: -.5em;
  vertical-align: baseline;
}

span {
  color: hsla(206, 90%, 20%, 0.7);
  cursor: default;
}

.footnote-container {
  padding: 10px;
}

</style>

<d-hover-box>
  <div class="footnote-container">
    <slot id="slot"></slot>
  </div>
</d-hover-box>

<sup>
  <span id="fn-" data-hover-ref=""></span>
</sup>

`
  );

  class Footnote extends T$5(HTMLElement) {
    constructor() {
      super();

      const options = {
        childList: true,
        characterData: true,
        subtree: true,
      };
      const observer = new MutationObserver(this.notify);
      observer.observe(this, options);
    }

    notify() {
      const options = { detail: this, bubbles: true };
      const event = new CustomEvent("onFootnoteChanged", options);
      document.dispatchEvent(event);
    }

    connectedCallback() {
      // listen and notify about changes to slotted content
      // const slot = this.shadowRoot.querySelector('#slot');
      // console.warn(slot.textContent);
      // slot.addEventListener('slotchange', this.notify);
      this.hoverBox = this.root.querySelector("d-hover-box");
      window.customElements.whenDefined("d-hover-box").then(() => {
        this.hoverBox.listen(this);
      });
      // create numeric ID
      Footnote.currentFootnoteId += 1;
      const IdString = Footnote.currentFootnoteId.toString();
      this.root.host.id = "d-footnote-" + IdString;

      // set up hidden hover box
      const id = "dt-fn-hover-box-" + IdString;
      this.hoverBox.id = id;

      // set up visible footnote marker
      const span = this.root.querySelector("#fn-");
      span.setAttribute("id", "fn-" + IdString);
      span.setAttribute("data-hover-ref", id);
      span.textContent = IdString;
    }
  }

  Footnote.currentFootnoteId = 0;

  // Copyright 2018 The Distill Template Authors

  const T$6 = Template(
    "d-footnote-list",
    `
<style>

d-footnote-list {
  contain: layout style;
}

d-footnote-list > * {
  grid-column: text;
}

d-footnote-list a.footnote-backlink {
  color: rgba(0,0,0,0.3);
  padding-left: 0.5em;
}

</style>

<h3>Footnotes</h3>
<ol></ol>
`,
    false
  );

  class FootnoteList extends T$6(HTMLElement) {
    connectedCallback() {
      super.connectedCallback();

      this.list = this.root.querySelector("ol");
      // footnotes list is initially hidden
      this.root.style.display = "none";
      // look through document and register existing footnotes
      // Store.subscribeTo('footnotes', (footnote) => {
      //   this.renderFootnote(footnote);
      // });
    }

    // TODO: could optimize this to accept individual footnotes?
    set footnotes(footnotes) {
      this.list.innerHTML = "";
      if (footnotes.length) {
        // ensure footnote list is visible
        this.root.style.display = "";

        for (const footnote of footnotes) {
          // construct and append list item to show footnote
          const listItem = document.createElement("li");
          listItem.id = footnote.id + "-listing";
          listItem.innerHTML = footnote.innerHTML;

          const backlink = document.createElement("a");
          backlink.setAttribute("class", "footnote-backlink");
          backlink.textContent = "[↩]";
          backlink.href = "#" + footnote.id;

          listItem.appendChild(backlink);
          this.list.appendChild(listItem);
        }
      } else {
        // ensure footnote list is invisible
        this.root.style.display = "none";
      }
    }
  }

  // Copyright 2018 The Distill Template Authors

  const T$7 = Template(
    "d-hover-box",
    `
<style>

:host {
  position: absolute;
  width: 100%;
  left: 0px;
  z-index: 10000;
  display: none;
  white-space: normal
}

.container {
  position: relative;
  width: 704px;
  max-width: 100vw;
  margin: 0 auto;
}

.panel {
  position: absolute;
  font-size: 1rem;
  line-height: 1.5em;
  top: 0;
  left: 0;
  width: 100%;
  border: 1px solid rgba(0, 0, 0, 0.1);
  background-color: rgba(250, 250, 250, 0.95);
  box-shadow: 0 0 7px rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  box-sizing: border-box;

  backdrop-filter: blur(2px);
  -webkit-backdrop-filter: blur(2px);
}

</style>

<div class="container">
  <div class="panel">
    <slot></slot>
  </div>
</div>
`
  );

  class HoverBox extends T$7(HTMLElement) {
    constructor() {
      super();
    }

    connectedCallback() {}

    listen(element) {
      // console.log(element)
      this.bindDivEvents(this);
      this.bindTriggerEvents(element);
      // this.style.display = "block";
    }

    bindDivEvents(element) {
      // For mice, same behavior as hovering on links
      element.addEventListener("mouseover", () => {
        if (!this.visible) this.showAtNode(element);
        this.stopTimeout();
      });
      element.addEventListener("mouseout", () => {
        this.extendTimeout(500);
      });
      // Don't trigger body touchstart event when touching within box
      element.addEventListener(
        "touchstart",
        (event) => {
          event.stopPropagation();
        },
        { passive: true }
      );
      // Close box when touching outside box
      document.body.addEventListener(
        "touchstart",
        () => {
          this.hide();
        },
        { passive: true }
      );
    }

    bindTriggerEvents(node) {
      node.addEventListener("mouseover", () => {
        if (!this.visible) {
          this.showAtNode(node);
        }
        this.stopTimeout();
      });

      node.addEventListener("mouseout", () => {
        this.extendTimeout(300);
      });

      node.addEventListener(
        "touchstart",
        (event) => {
          if (this.visible) {
            this.hide();
          } else {
            this.showAtNode(node);
          }
          // Don't trigger body touchstart event when touching link
          event.stopPropagation();
        },
        { passive: true }
      );
    }

    show(position) {
      this.visible = true;
      this.style.display = "block";
      // 10px extra offset from element
      this.style.top = Math.round(position[1] + 10) + "px";
    }

    showAtNode(node) {
      // https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/offsetTop
      const bbox = node.getBoundingClientRect();
      this.show([node.offsetLeft + bbox.width, node.offsetTop + bbox.height]);
    }

    hide() {
      this.visible = false;
      this.style.display = "none";
      this.stopTimeout();
    }

    stopTimeout() {
      if (this.timeout) {
        clearTimeout(this.timeout);
      }
    }

    extendTimeout(time) {
      this.stopTimeout();
      this.timeout = setTimeout(() => {
        this.hide();
      }, time);
    }
  }

  // Copyright 2018 The Distill Template Authors
  //
  // Licensed under the Apache License, Version 2.0 (the "License");
  // you may not use this file except in compliance with the License.
  // You may obtain a copy of the License at
  //
  //      http://www.apache.org/licenses/LICENSE-2.0
  //
  // Unless required by applicable law or agreed to in writing, software
  // distributed under the License is distributed on an "AS IS" BASIS,
  // WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  // See the License for the specific language governing permissions and
  // limitations under the License.

  class Title extends HTMLElement {
    static get is() {
      return "d-title";
    }
  }

  // Copyright 2018 The Distill Template Authors

  const T$8 = Template(
    "d-references",
    `
<style>
d-references {
  display: block;
}
</style>
`,
    false
  );

  class References extends T$8(HTMLElement) {}

  // Copyright 2018 The Distill Template Authors
  //
  // Licensed under the Apache License, Version 2.0 (the "License");
  // you may not use this file except in compliance with the License.
  // You may obtain a copy of the License at
  //
  //      http://www.apache.org/licenses/LICENSE-2.0
  //
  // Unless required by applicable law or agreed to in writing, software
  // distributed under the License is distributed on an "AS IS" BASIS,
  // WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  // See the License for the specific language governing permissions and
  // limitations under the License.

  class TOC extends HTMLElement {
    static get is() {
      return "d-toc";
    }

    connectedCallback() {
      if (!this.getAttribute("prerendered")) {
        window.onload = () => {
          const article = document.querySelector("d-article");
          const headings = article.querySelectorAll("h2, h3");
          renderTOC(this, headings);
        };
      }
    }
  }

  function renderTOC(element, headings) {
    let ToC = `
  <style>

  d-toc {
    contain: layout style;
    display: block;
  }

  d-toc ul {
    padding-left: 0;
  }

  d-toc ul > ul {
    padding-left: 24px;
  }

  d-toc a {
    border-bottom: none;
    text-decoration: none;
  }

  </style>
  <nav role="navigation" class="table-of-contents"></nav>
  <h2>Table of contents</h2>
  <ul>`;

    for (const el of headings) {
      // should element be included in TOC?
      const isInTitle = el.parentElement.tagName == "D-TITLE";
      const isException = el.getAttribute("no-toc");
      if (isInTitle || isException) continue;
      // create TOC entry
      const title = el.textContent;
      const link = "#" + el.getAttribute("id");

      let newLine = "<li>" + '<a href="' + link + '">' + title + "</a>" + "</li>";
      if (el.tagName == "H3") {
        newLine = "<ul>" + newLine + "</ul>";
      } else {
        newLine += "<br>";
      }
      ToC += newLine;
    }

    ToC += "</ul></nav>";
    element.innerHTML = ToC;
  }

  // Copyright 2018 The Distill Template Authors
  //
  // Licensed under the Apache License, Version 2.0 (the "License");
  // you may not use this file except in compliance with the License.
  // You may obtain a copy of the License at
  //
  //      http://www.apache.org/licenses/LICENSE-2.0
  //
  // Unless required by applicable law or agreed to in writing, software
  // distributed under the License is distributed on an "AS IS" BASIS,
  // WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  // See the License for the specific language governing permissions and
  // limitations under the License.

  // Figure
  //
  // d-figure provides a state-machine of visibility events:
  //
  //                         scroll out of view
  //                         +----------------+
  //   *do work here*        |                |
  // +----------------+    +-+---------+    +-v---------+
  // | ready          +----> onscreen  |    | offscreen |
  // +----------------+    +---------^-+    +---------+-+
  //                                 |                |
  //                                 +----------------+
  //                                  scroll into view
  //

  class Figure extends HTMLElement {
    static get is() {
      return "d-figure";
    }

    static get readyQueue() {
      if (!Figure._readyQueue) {
        Figure._readyQueue = [];
      }
      return Figure._readyQueue;
    }

    static addToReadyQueue(figure) {
      if (Figure.readyQueue.indexOf(figure) === -1) {
        Figure.readyQueue.push(figure);
        Figure.runReadyQueue();
      }
    }

    static runReadyQueue() {
      // console.log("Checking to run readyQueue, length: " + Figure.readyQueue.length + ", scrolling: " + Figure.isScrolling);
      // if (Figure.isScrolling) return;
      // console.log("Running ready Queue");
      const figure = Figure.readyQueue
        .sort((a, b) => a._seenOnScreen - b._seenOnScreen)
        .filter((figure) => !figure._ready)
        .pop();
      if (figure) {
        figure.ready();
        requestAnimationFrame(Figure.runReadyQueue);
      }
    }

    constructor() {
      super();
      // debugger
      this._ready = false;
      this._onscreen = false;
      this._offscreen = true;
    }

    connectedCallback() {
      this.loadsWhileScrolling = this.hasAttribute("loadsWhileScrolling");
      Figure.marginObserver.observe(this);
      Figure.directObserver.observe(this);
    }

    disconnectedCallback() {
      Figure.marginObserver.unobserve(this);
      Figure.directObserver.unobserve(this);
    }

    // We use two separate observers:
    // One with an extra 1000px margin to warn if the viewpoint gets close,
    // And one for the actual on/off screen events

    static get marginObserver() {
      if (!Figure._marginObserver) {
        // if (!('IntersectionObserver' in window)) {
        //   throw new Error('no interscetionobbserver!');
        // }
        const viewportHeight = window.innerHeight;
        const margin = Math.floor(2 * viewportHeight);
        const options = {
          rootMargin: margin + "px 0px " + margin + "px 0px",
          threshold: 0.01,
        };
        const callback = Figure.didObserveMarginIntersection;
        const observer = new IntersectionObserver(callback, options);
        Figure._marginObserver = observer;
      }
      return Figure._marginObserver;
    }

    static didObserveMarginIntersection(entries) {
      for (const entry of entries) {
        const figure = entry.target;
        if (entry.isIntersecting && !figure._ready) {
          Figure.addToReadyQueue(figure);
        }
      }
    }

    static get directObserver() {
      if (!Figure._directObserver) {
        Figure._directObserver = new IntersectionObserver(Figure.didObserveDirectIntersection, {
          rootMargin: "0px",
          threshold: [0, 1.0],
        });
      }
      return Figure._directObserver;
    }

    static didObserveDirectIntersection(entries) {
      for (const entry of entries) {
        const figure = entry.target;
        if (entry.isIntersecting) {
          figure._seenOnScreen = new Date();
          // if (!figure._ready) { figure.ready(); }
          if (figure._offscreen) {
            figure.onscreen();
          }
        } else {
          if (figure._onscreen) {
            figure.offscreen();
          }
        }
      }
    }

    // Notify listeners that registered late, too:

    addEventListener(eventName, callback) {
      super.addEventListener(eventName, callback);
      // if we had already dispatched something while presumingly no one was listening, we do so again
      // debugger
      if (eventName === "ready") {
        if (Figure.readyQueue.indexOf(this) !== -1) {
          this._ready = false;
          Figure.runReadyQueue();
        }
      }
      if (eventName === "onscreen") {
        this.onscreen();
      }
    }

    // Custom Events

    ready() {
      // debugger
      this._ready = true;
      Figure.marginObserver.unobserve(this);
      const event = new CustomEvent("ready");
      this.dispatchEvent(event);
    }

    onscreen() {
      this._onscreen = true;
      this._offscreen = false;
      const event = new CustomEvent("onscreen");
      this.dispatchEvent(event);
    }

    offscreen() {
      this._onscreen = false;
      this._offscreen = true;
      const event = new CustomEvent("offscreen");
      this.dispatchEvent(event);
    }
  }

  if (typeof window !== "undefined") {
    Figure.isScrolling = false;
    let timeout;
    const resetTimer = () => {
      Figure.isScrolling = true;
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        Figure.isScrolling = false;
        Figure.runReadyQueue();
      }, 500);
    };
    window.addEventListener("scroll", resetTimer, true);
  }

  // Copyright 2018 The Distill Template Authors

  // This overlay is not secure.
  // It is only meant as a social deterrent.

  const productionHostname = "distill.pub";
  const T$9 = Template(
    "d-interstitial",
    `
<style>

.overlay {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: white;

  opacity: 1;
  visibility: visible;

  display: flex;
  flex-flow: column;
  justify-content: center;
  z-index: 2147483647 /* MaxInt32 */

}

.container {
  position: relative;
  margin-left: auto;
  margin-right: auto;
  max-width: 420px;
  padding: 2em;
}

h1 {
  text-decoration: underline;
  text-decoration-color: hsl(0,100%,40%);
  -webkit-text-decoration-color: hsl(0,100%,40%);
  margin-bottom: 1em;
  line-height: 1.5em;
}

input[type="password"] {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  -webkit-box-shadow: none;
  -moz-box-shadow: none;
  box-shadow: none;
  -webkit-border-radius: none;
  -moz-border-radius: none;
  -ms-border-radius: none;
  -o-border-radius: none;
  border-radius: none;
  outline: none;

  font-size: 18px;
  background: none;
  width: 25%;
  padding: 10px;
  border: none;
  border-bottom: solid 2px #999;
  transition: border .3s;
}

input[type="password"]:focus {
  border-bottom: solid 2px #333;
}

input[type="password"].wrong {
  border-bottom: solid 2px hsl(0,100%,40%);
}

p small {
  color: #888;
}

.logo {
  position: relative;
  font-size: 1.5em;
  margin-bottom: 3em;
}

.logo svg {
  width: 36px;
  position: relative;
  top: 6px;
  margin-right: 2px;
}

.logo svg path {
  fill: none;
  stroke: black;
  stroke-width: 2px;
}

</style>

<div class="overlay">
  <div class="container">
    <h1>This article is in review.</h1>
    <p>Do not share this URL or the contents of this article. Thank you!</p>
    <input id="interstitial-password-input" type="password" name="password" autofocus/>
    <p><small>Enter the password we shared with you as part of the review process to view the article.</small></p>
  </div>
</div>
`
  );

  class Interstitial extends T$9(HTMLElement) {
    connectedCallback() {
      if (this.shouldRemoveSelf()) {
        this.parentElement.removeChild(this);
      } else {
        const passwordInput = this.root.querySelector("#interstitial-password-input");
        passwordInput.oninput = (event) => this.passwordChanged(event);
      }
    }

    passwordChanged(event) {
      const entered = event.target.value;
      if (entered === this.password) {
        console.log("Correct password entered.");
        this.parentElement.removeChild(this);
        if (typeof Storage !== "undefined") {
          console.log("Saved that correct password was entered.");
          localStorage.setItem(this.localStorageIdentifier(), "true");
        }
      }
    }

    shouldRemoveSelf() {
      // should never be visible in production
      if (window && window.location.hostname === productionHostname) {
        console.warn("Interstitial found on production, hiding it.");
        return true;
      }
      // should only have to enter password once
      if (typeof Storage !== "undefined") {
        if (localStorage.getItem(this.localStorageIdentifier()) === "true") {
          console.log("Loaded that correct password was entered before; skipping interstitial.");
          return true;
        }
      }
      // otherwise, leave visible
      return false;
    }

    localStorageIdentifier() {
      const prefix = "distill-drafts";
      const suffix = "interstitial-password-correct";
      return prefix + (window ? window.location.pathname : "-") + suffix;
    }
  }

  function ascending(a, b) {
    return a < b ? -1 : a > b ? 1 : a >= b ? 0 : NaN;
  }

  function bisector(compare) {
    if (compare.length === 1) compare = ascendingComparator(compare);
    return {
      left: function (a, x, lo, hi) {
        if (lo == null) lo = 0;
        if (hi == null) hi = a.length;
        while (lo < hi) {
          var mid = (lo + hi) >>> 1;
          if (compare(a[mid], x) < 0) lo = mid + 1;
          else hi = mid;
        }
        return lo;
      },
      right: function (a, x, lo, hi) {
        if (lo == null) lo = 0;
        if (hi == null) hi = a.length;
        while (lo < hi) {
          var mid = (lo + hi) >>> 1;
          if (compare(a[mid], x) > 0) hi = mid;
          else lo = mid + 1;
        }
        return lo;
      },
    };
  }

  function ascendingComparator(f) {
    return function (d, x) {
      return ascending(f(d), x);
    };
  }

  var ascendingBisect = bisector(ascending);
  var bisectRight = ascendingBisect.right;

  function range(start, stop, step) {
    (start = +start), (stop = +stop), (step = (n = arguments.length) < 2 ? ((stop = start), (start = 0), 1) : n < 3 ? 1 : +step);

    var i = -1,
      n = Math.max(0, Math.ceil((stop - start) / step)) | 0,
      range = new Array(n);

    while (++i < n) {
      range[i] = start + i * step;
    }

    return range;
  }

  var e10 = Math.sqrt(50),
    e5 = Math.sqrt(10),
    e2 = Math.sqrt(2);

  function ticks(start, stop, count) {
    var reverse,
      i = -1,
      n,
      ticks,
      step;

    (stop = +stop), (start = +start), (count = +count);
    if (start === stop && count > 0) return [start];
    if ((reverse = stop < start)) (n = start), (start = stop), (stop = n);
    if ((step = tickIncrement(start, stop, count)) === 0 || !isFinite(step)) return [];

    if (step > 0) {
      start = Math.ceil(start / step);
      stop = Math.floor(stop / step);
      ticks = new Array((n = Math.ceil(stop - start + 1)));
      while (++i < n) ticks[i] = (start + i) * step;
    } else {
      start = Math.floor(start * step);
      stop = Math.ceil(stop * step);
      ticks = new Array((n = Math.ceil(start - stop + 1)));
      while (++i < n) ticks[i] = (start - i) / step;
    }

    if (reverse) ticks.reverse();

    return ticks;
  }

  function tickIncrement(start, stop, count) {
    var step = (stop - start) / Math.max(0, count),
      power = Math.floor(Math.log(step) / Math.LN10),
      error = step / Math.pow(10, power);
    return power >= 0
      ? (error >= e10 ? 10 : error >= e5 ? 5 : error >= e2 ? 2 : 1) * Math.pow(10, power)
      : -Math.pow(10, -power) / (error >= e10 ? 10 : error >= e5 ? 5 : error >= e2 ? 2 : 1);
  }

  function tickStep(start, stop, count) {
    var step0 = Math.abs(stop - start) / Math.max(0, count),
      step1 = Math.pow(10, Math.floor(Math.log(step0) / Math.LN10)),
      error = step0 / step1;
    if (error >= e10) step1 *= 10;
    else if (error >= e5) step1 *= 5;
    else if (error >= e2) step1 *= 2;
    return stop < start ? -step1 : step1;
  }

  function initRange(domain, range) {
    switch (arguments.length) {
      case 0:
        break;
      case 1:
        this.range(domain);
        break;
      default:
        this.range(range).domain(domain);
        break;
    }
    return this;
  }

  function define(constructor, factory, prototype) {
    constructor.prototype = factory.prototype = prototype;
    prototype.constructor = constructor;
  }

  function extend(parent, definition) {
    var prototype = Object.create(parent.prototype);
    for (var key in definition) prototype[key] = definition[key];
    return prototype;
  }

  function Color() {}

  var darker = 0.7;
  var brighter = 1 / darker;

  var reI = "\\s*([+-]?\\d+)\\s*",
    reN = "\\s*([+-]?\\d*\\.?\\d+(?:[eE][+-]?\\d+)?)\\s*",
    reP = "\\s*([+-]?\\d*\\.?\\d+(?:[eE][+-]?\\d+)?)%\\s*",
    reHex = /^#([0-9a-f]{3,8})$/,
    reRgbInteger = new RegExp("^rgb\\(" + [reI, reI, reI] + "\\)$"),
    reRgbPercent = new RegExp("^rgb\\(" + [reP, reP, reP] + "\\)$"),
    reRgbaInteger = new RegExp("^rgba\\(" + [reI, reI, reI, reN] + "\\)$"),
    reRgbaPercent = new RegExp("^rgba\\(" + [reP, reP, reP, reN] + "\\)$"),
    reHslPercent = new RegExp("^hsl\\(" + [reN, reP, reP] + "\\)$"),
    reHslaPercent = new RegExp("^hsla\\(" + [reN, reP, reP, reN] + "\\)$");

  var named = {
    aliceblue: 0xf0f8ff,
    antiquewhite: 0xfaebd7,
    aqua: 0x00ffff,
    aquamarine: 0x7fffd4,
    azure: 0xf0ffff,
    beige: 0xf5f5dc,
    bisque: 0xffe4c4,
    black: 0x000000,
    blanchedalmond: 0xffebcd,
    blue: 0x0000ff,
    blueviolet: 0x8a2be2,
    brown: 0xa52a2a,
    burlywood: 0xdeb887,
    cadetblue: 0x5f9ea0,
    chartreuse: 0x7fff00,
    chocolate: 0xd2691e,
    coral: 0xff7f50,
    cornflowerblue: 0x6495ed,
    cornsilk: 0xfff8dc,
    crimson: 0xdc143c,
    cyan: 0x00ffff,
    darkblue: 0x00008b,
    darkcyan: 0x008b8b,
    darkgoldenrod: 0xb8860b,
    darkgray: 0xa9a9a9,
    darkgreen: 0x006400,
    darkgrey: 0xa9a9a9,
    darkkhaki: 0xbdb76b,
    darkmagenta: 0x8b008b,
    darkolivegreen: 0x556b2f,
    darkorange: 0xff8c00,
    darkorchid: 0x9932cc,
    darkred: 0x8b0000,
    darksalmon: 0xe9967a,
    darkseagreen: 0x8fbc8f,
    darkslateblue: 0x483d8b,
    darkslategray: 0x2f4f4f,
    darkslategrey: 0x2f4f4f,
    darkturquoise: 0x00ced1,
    darkviolet: 0x9400d3,
    deeppink: 0xff1493,
    deepskyblue: 0x00bfff,
    dimgray: 0x696969,
    dimgrey: 0x696969,
    dodgerblue: 0x1e90ff,
    firebrick: 0xb22222,
    floralwhite: 0xfffaf0,
    forestgreen: 0x228b22,
    fuchsia: 0xff00ff,
    gainsboro: 0xdcdcdc,
    ghostwhite: 0xf8f8ff,
    gold: 0xffd700,
    goldenrod: 0xdaa520,
    gray: 0x808080,
    green: 0x008000,
    greenyellow: 0xadff2f,
    grey: 0x808080,
    honeydew: 0xf0fff0,
    hotpink: 0xff69b4,
    indianred: 0xcd5c5c,
    indigo: 0x4b0082,
    ivory: 0xfffff0,
    khaki: 0xf0e68c,
    lavender: 0xe6e6fa,
    lavenderblush: 0xfff0f5,
    lawngreen: 0x7cfc00,
    lemonchiffon: 0xfffacd,
    lightblue: 0xadd8e6,
    lightcoral: 0xf08080,
    lightcyan: 0xe0ffff,
    lightgoldenrodyellow: 0xfafad2,
    lightgray: 0xd3d3d3,
    lightgreen: 0x90ee90,
    lightgrey: 0xd3d3d3,
    lightpink: 0xffb6c1,
    lightsalmon: 0xffa07a,
    lightseagreen: 0x20b2aa,
    lightskyblue: 0x87cefa,
    lightslategray: 0x778899,
    lightslategrey: 0x778899,
    lightsteelblue: 0xb0c4de,
    lightyellow: 0xffffe0,
    lime: 0x00ff00,
    limegreen: 0x32cd32,
    linen: 0xfaf0e6,
    magenta: 0xff00ff,
    maroon: 0x800000,
    mediumaquamarine: 0x66cdaa,
    mediumblue: 0x0000cd,
    mediumorchid: 0xba55d3,
    mediumpurple: 0x9370db,
    mediumseagreen: 0x3cb371,
    mediumslateblue: 0x7b68ee,
    mediumspringgreen: 0x00fa9a,
    mediumturquoise: 0x48d1cc,
    mediumvioletred: 0xc71585,
    midnightblue: 0x191970,
    mintcream: 0xf5fffa,
    mistyrose: 0xffe4e1,
    moccasin: 0xffe4b5,
    navajowhite: 0xffdead,
    navy: 0x000080,
    oldlace: 0xfdf5e6,
    olive: 0x808000,
    olivedrab: 0x6b8e23,
    orange: 0xffa500,
    orangered: 0xff4500,
    orchid: 0xda70d6,
    palegoldenrod: 0xeee8aa,
    palegreen: 0x98fb98,
    paleturquoise: 0xafeeee,
    palevioletred: 0xdb7093,
    papayawhip: 0xffefd5,
    peachpuff: 0xffdab9,
    peru: 0xcd853f,
    pink: 0xffc0cb,
    plum: 0xdda0dd,
    powderblue: 0xb0e0e6,
    purple: 0x800080,
    rebeccapurple: 0x663399,
    red: 0xff0000,
    rosybrown: 0xbc8f8f,
    royalblue: 0x4169e1,
    saddlebrown: 0x8b4513,
    salmon: 0xfa8072,
    sandybrown: 0xf4a460,
    seagreen: 0x2e8b57,
    seashell: 0xfff5ee,
    sienna: 0xa0522d,
    silver: 0xc0c0c0,
    skyblue: 0x87ceeb,
    slateblue: 0x6a5acd,
    slategray: 0x708090,
    slategrey: 0x708090,
    snow: 0xfffafa,
    springgreen: 0x00ff7f,
    steelblue: 0x4682b4,
    tan: 0xd2b48c,
    teal: 0x008080,
    thistle: 0xd8bfd8,
    tomato: 0xff6347,
    turquoise: 0x40e0d0,
    violet: 0xee82ee,
    wheat: 0xf5deb3,
    white: 0xffffff,
    whitesmoke: 0xf5f5f5,
    yellow: 0xffff00,
    yellowgreen: 0x9acd32,
  };

  define(Color, color, {
    copy: function (channels) {
      return Object.assign(new this.constructor(), this, channels);
    },
    displayable: function () {
      return this.rgb().displayable();
    },
    hex: color_formatHex, // Deprecated! Use color.formatHex.
    formatHex: color_formatHex,
    formatHsl: color_formatHsl,
    formatRgb: color_formatRgb,
    toString: color_formatRgb,
  });

  function color_formatHex() {
    return this.rgb().formatHex();
  }

  function color_formatHsl() {
    return hslConvert(this).formatHsl();
  }

  function color_formatRgb() {
    return this.rgb().formatRgb();
  }

  function color(format) {
    var m, l;
    format = (format + "").trim().toLowerCase();
    return (m = reHex.exec(format))
      ? ((l = m[1].length),
        (m = parseInt(m[1], 16)),
        l === 6
          ? rgbn(m) // #ff0000
          : l === 3
            ? new Rgb(((m >> 8) & 0xf) | ((m >> 4) & 0xf0), ((m >> 4) & 0xf) | (m & 0xf0), ((m & 0xf) << 4) | (m & 0xf), 1) // #f00
            : l === 8
              ? rgba((m >> 24) & 0xff, (m >> 16) & 0xff, (m >> 8) & 0xff, (m & 0xff) / 0xff) // #ff000000
              : l === 4
                ? rgba(
                    ((m >> 12) & 0xf) | ((m >> 8) & 0xf0),
                    ((m >> 8) & 0xf) | ((m >> 4) & 0xf0),
                    ((m >> 4) & 0xf) | (m & 0xf0),
                    (((m & 0xf) << 4) | (m & 0xf)) / 0xff
                  ) // #f000
                : null) // invalid hex
      : (m = reRgbInteger.exec(format))
        ? new Rgb(m[1], m[2], m[3], 1) // rgb(255, 0, 0)
        : (m = reRgbPercent.exec(format))
          ? new Rgb((m[1] * 255) / 100, (m[2] * 255) / 100, (m[3] * 255) / 100, 1) // rgb(100%, 0%, 0%)
          : (m = reRgbaInteger.exec(format))
            ? rgba(m[1], m[2], m[3], m[4]) // rgba(255, 0, 0, 1)
            : (m = reRgbaPercent.exec(format))
              ? rgba((m[1] * 255) / 100, (m[2] * 255) / 100, (m[3] * 255) / 100, m[4]) // rgb(100%, 0%, 0%, 1)
              : (m = reHslPercent.exec(format))
                ? hsla(m[1], m[2] / 100, m[3] / 100, 1) // hsl(120, 50%, 50%)
                : (m = reHslaPercent.exec(format))
                  ? hsla(m[1], m[2] / 100, m[3] / 100, m[4]) // hsla(120, 50%, 50%, 1)
                  : named.hasOwnProperty(format)
                    ? rgbn(named[format]) // eslint-disable-line no-prototype-builtins
                    : format === "transparent"
                      ? new Rgb(NaN, NaN, NaN, 0)
                      : null;
  }

  function rgbn(n) {
    return new Rgb((n >> 16) & 0xff, (n >> 8) & 0xff, n & 0xff, 1);
  }

  function rgba(r, g, b, a) {
    if (a <= 0) r = g = b = NaN;
    return new Rgb(r, g, b, a);
  }

  function rgbConvert(o) {
    if (!(o instanceof Color)) o = color(o);
    if (!o) return new Rgb();
    o = o.rgb();
    return new Rgb(o.r, o.g, o.b, o.opacity);
  }

  function rgb(r, g, b, opacity) {
    return arguments.length === 1 ? rgbConvert(r) : new Rgb(r, g, b, opacity == null ? 1 : opacity);
  }

  function Rgb(r, g, b, opacity) {
    this.r = +r;
    this.g = +g;
    this.b = +b;
    this.opacity = +opacity;
  }

  define(
    Rgb,
    rgb,
    extend(Color, {
      brighter: function (k) {
        k = k == null ? brighter : Math.pow(brighter, k);
        return new Rgb(this.r * k, this.g * k, this.b * k, this.opacity);
      },
      darker: function (k) {
        k = k == null ? darker : Math.pow(darker, k);
        return new Rgb(this.r * k, this.g * k, this.b * k, this.opacity);
      },
      rgb: function () {
        return this;
      },
      displayable: function () {
        return (
          -0.5 <= this.r &&
          this.r < 255.5 &&
          -0.5 <= this.g &&
          this.g < 255.5 &&
          -0.5 <= this.b &&
          this.b < 255.5 &&
          0 <= this.opacity &&
          this.opacity <= 1
        );
      },
      hex: rgb_formatHex, // Deprecated! Use color.formatHex.
      formatHex: rgb_formatHex,
      formatRgb: rgb_formatRgb,
      toString: rgb_formatRgb,
    })
  );

  function rgb_formatHex() {
    return "#" + hex(this.r) + hex(this.g) + hex(this.b);
  }

  function rgb_formatRgb() {
    var a = this.opacity;
    a = isNaN(a) ? 1 : Math.max(0, Math.min(1, a));
    return (
      (a === 1 ? "rgb(" : "rgba(") +
      Math.max(0, Math.min(255, Math.round(this.r) || 0)) +
      ", " +
      Math.max(0, Math.min(255, Math.round(this.g) || 0)) +
      ", " +
      Math.max(0, Math.min(255, Math.round(this.b) || 0)) +
      (a === 1 ? ")" : ", " + a + ")")
    );
  }

  function hex(value) {
    value = Math.max(0, Math.min(255, Math.round(value) || 0));
    return (value < 16 ? "0" : "") + value.toString(16);
  }

  function hsla(h, s, l, a) {
    if (a <= 0) h = s = l = NaN;
    else if (l <= 0 || l >= 1) h = s = NaN;
    else if (s <= 0) h = NaN;
    return new Hsl(h, s, l, a);
  }

  function hslConvert(o) {
    if (o instanceof Hsl) return new Hsl(o.h, o.s, o.l, o.opacity);
    if (!(o instanceof Color)) o = color(o);
    if (!o) return new Hsl();
    if (o instanceof Hsl) return o;
    o = o.rgb();
    var r = o.r / 255,
      g = o.g / 255,
      b = o.b / 255,
      min = Math.min(r, g, b),
      max = Math.max(r, g, b),
      h = NaN,
      s = max - min,
      l = (max + min) / 2;
    if (s) {
      if (r === max) h = (g - b) / s + (g < b) * 6;
      else if (g === max) h = (b - r) / s + 2;
      else h = (r - g) / s + 4;
      s /= l < 0.5 ? max + min : 2 - max - min;
      h *= 60;
    } else {
      s = l > 0 && l < 1 ? 0 : h;
    }
    return new Hsl(h, s, l, o.opacity);
  }

  function hsl(h, s, l, opacity) {
    return arguments.length === 1 ? hslConvert(h) : new Hsl(h, s, l, opacity == null ? 1 : opacity);
  }

  function Hsl(h, s, l, opacity) {
    this.h = +h;
    this.s = +s;
    this.l = +l;
    this.opacity = +opacity;
  }

  define(
    Hsl,
    hsl,
    extend(Color, {
      brighter: function (k) {
        k = k == null ? brighter : Math.pow(brighter, k);
        return new Hsl(this.h, this.s, this.l * k, this.opacity);
      },
      darker: function (k) {
        k = k == null ? darker : Math.pow(darker, k);
        return new Hsl(this.h, this.s, this.l * k, this.opacity);
      },
      rgb: function () {
        var h = (this.h % 360) + (this.h < 0) * 360,
          s = isNaN(h) || isNaN(this.s) ? 0 : this.s,
          l = this.l,
          m2 = l + (l < 0.5 ? l : 1 - l) * s,
          m1 = 2 * l - m2;
        return new Rgb(hsl2rgb(h >= 240 ? h - 240 : h + 120, m1, m2), hsl2rgb(h, m1, m2), hsl2rgb(h < 120 ? h + 240 : h - 120, m1, m2), this.opacity);
      },
      displayable: function () {
        return ((0 <= this.s && this.s <= 1) || isNaN(this.s)) && 0 <= this.l && this.l <= 1 && 0 <= this.opacity && this.opacity <= 1;
      },
      formatHsl: function () {
        var a = this.opacity;
        a = isNaN(a) ? 1 : Math.max(0, Math.min(1, a));
        return (
          (a === 1 ? "hsl(" : "hsla(") +
          (this.h || 0) +
          ", " +
          (this.s || 0) * 100 +
          "%, " +
          (this.l || 0) * 100 +
          "%" +
          (a === 1 ? ")" : ", " + a + ")")
        );
      },
    })
  );

  /* From FvD 13.37, CSS Color Module Level 3 */
  function hsl2rgb(h, m1, m2) {
    return (h < 60 ? m1 + ((m2 - m1) * h) / 60 : h < 180 ? m2 : h < 240 ? m1 + ((m2 - m1) * (240 - h)) / 60 : m1) * 255;
  }

  var deg2rad = Math.PI / 180;
  var rad2deg = 180 / Math.PI;

  // https://observablehq.com/@mbostock/lab-and-rgb
  var K = 18,
    Xn = 0.96422,
    Yn = 1,
    Zn = 0.82521,
    t0 = 4 / 29,
    t1 = 6 / 29,
    t2 = 3 * t1 * t1,
    t3 = t1 * t1 * t1;

  function labConvert(o) {
    if (o instanceof Lab) return new Lab(o.l, o.a, o.b, o.opacity);
    if (o instanceof Hcl) return hcl2lab(o);
    if (!(o instanceof Rgb)) o = rgbConvert(o);
    var r = rgb2lrgb(o.r),
      g = rgb2lrgb(o.g),
      b = rgb2lrgb(o.b),
      y = xyz2lab((0.2225045 * r + 0.7168786 * g + 0.0606169 * b) / Yn),
      x,
      z;
    if (r === g && g === b) x = z = y;
    else {
      x = xyz2lab((0.4360747 * r + 0.3850649 * g + 0.1430804 * b) / Xn);
      z = xyz2lab((0.0139322 * r + 0.0971045 * g + 0.7141733 * b) / Zn);
    }
    return new Lab(116 * y - 16, 500 * (x - y), 200 * (y - z), o.opacity);
  }

  function lab(l, a, b, opacity) {
    return arguments.length === 1 ? labConvert(l) : new Lab(l, a, b, opacity == null ? 1 : opacity);
  }

  function Lab(l, a, b, opacity) {
    this.l = +l;
    this.a = +a;
    this.b = +b;
    this.opacity = +opacity;
  }

  define(
    Lab,
    lab,
    extend(Color, {
      brighter: function (k) {
        return new Lab(this.l + K * (k == null ? 1 : k), this.a, this.b, this.opacity);
      },
      darker: function (k) {
        return new Lab(this.l - K * (k == null ? 1 : k), this.a, this.b, this.opacity);
      },
      rgb: function () {
        var y = (this.l + 16) / 116,
          x = isNaN(this.a) ? y : y + this.a / 500,
          z = isNaN(this.b) ? y : y - this.b / 200;
        x = Xn * lab2xyz(x);
        y = Yn * lab2xyz(y);
        z = Zn * lab2xyz(z);
        return new Rgb(
          lrgb2rgb(3.1338561 * x - 1.6168667 * y - 0.4906146 * z),
          lrgb2rgb(-0.9787684 * x + 1.9161415 * y + 0.033454 * z),
          lrgb2rgb(0.0719453 * x - 0.2289914 * y + 1.4052427 * z),
          this.opacity
        );
      },
    })
  );

  function xyz2lab(t) {
    return t > t3 ? Math.pow(t, 1 / 3) : t / t2 + t0;
  }

  function lab2xyz(t) {
    return t > t1 ? t * t * t : t2 * (t - t0);
  }

  function lrgb2rgb(x) {
    return 255 * (x <= 0.0031308 ? 12.92 * x : 1.055 * Math.pow(x, 1 / 2.4) - 0.055);
  }

  function rgb2lrgb(x) {
    return (x /= 255) <= 0.04045 ? x / 12.92 : Math.pow((x + 0.055) / 1.055, 2.4);
  }

  function hclConvert(o) {
    if (o instanceof Hcl) return new Hcl(o.h, o.c, o.l, o.opacity);
    if (!(o instanceof Lab)) o = labConvert(o);
    if (o.a === 0 && o.b === 0) return new Hcl(NaN, 0 < o.l && o.l < 100 ? 0 : NaN, o.l, o.opacity);
    var h = Math.atan2(o.b, o.a) * rad2deg;
    return new Hcl(h < 0 ? h + 360 : h, Math.sqrt(o.a * o.a + o.b * o.b), o.l, o.opacity);
  }

  function hcl(h, c, l, opacity) {
    return arguments.length === 1 ? hclConvert(h) : new Hcl(h, c, l, opacity == null ? 1 : opacity);
  }

  function Hcl(h, c, l, opacity) {
    this.h = +h;
    this.c = +c;
    this.l = +l;
    this.opacity = +opacity;
  }

  function hcl2lab(o) {
    if (isNaN(o.h)) return new Lab(o.l, 0, 0, o.opacity);
    var h = o.h * deg2rad;
    return new Lab(o.l, Math.cos(h) * o.c, Math.sin(h) * o.c, o.opacity);
  }

  define(
    Hcl,
    hcl,
    extend(Color, {
      brighter: function (k) {
        return new Hcl(this.h, this.c, this.l + K * (k == null ? 1 : k), this.opacity);
      },
      darker: function (k) {
        return new Hcl(this.h, this.c, this.l - K * (k == null ? 1 : k), this.opacity);
      },
      rgb: function () {
        return hcl2lab(this).rgb();
      },
    })
  );

  var A = -0.14861,
    B = +1.78277,
    C = -0.29227,
    D = -0.90649,
    E = +1.97294,
    ED = E * D,
    EB = E * B,
    BC_DA = B * C - D * A;

  function cubehelixConvert(o) {
    if (o instanceof Cubehelix) return new Cubehelix(o.h, o.s, o.l, o.opacity);
    if (!(o instanceof Rgb)) o = rgbConvert(o);
    var r = o.r / 255,
      g = o.g / 255,
      b = o.b / 255,
      l = (BC_DA * b + ED * r - EB * g) / (BC_DA + ED - EB),
      bl = b - l,
      k = (E * (g - l) - C * bl) / D,
      s = Math.sqrt(k * k + bl * bl) / (E * l * (1 - l)), // NaN if l=0 or l=1
      h = s ? Math.atan2(k, bl) * rad2deg - 120 : NaN;
    return new Cubehelix(h < 0 ? h + 360 : h, s, l, o.opacity);
  }

  function cubehelix(h, s, l, opacity) {
    return arguments.length === 1 ? cubehelixConvert(h) : new Cubehelix(h, s, l, opacity == null ? 1 : opacity);
  }

  function Cubehelix(h, s, l, opacity) {
    this.h = +h;
    this.s = +s;
    this.l = +l;
    this.opacity = +opacity;
  }

  define(
    Cubehelix,
    cubehelix,
    extend(Color, {
      brighter: function (k) {
        k = k == null ? brighter : Math.pow(brighter, k);
        return new Cubehelix(this.h, this.s, this.l * k, this.opacity);
      },
      darker: function (k) {
        k = k == null ? darker : Math.pow(darker, k);
        return new Cubehelix(this.h, this.s, this.l * k, this.opacity);
      },
      rgb: function () {
        var h = isNaN(this.h) ? 0 : (this.h + 120) * deg2rad,
          l = +this.l,
          a = isNaN(this.s) ? 0 : this.s * l * (1 - l),
          cosh = Math.cos(h),
          sinh = Math.sin(h);
        return new Rgb(255 * (l + a * (A * cosh + B * sinh)), 255 * (l + a * (C * cosh + D * sinh)), 255 * (l + a * (E * cosh)), this.opacity);
      },
    })
  );

  function constant(x) {
    return function () {
      return x;
    };
  }

  function linear(a, d) {
    return function (t) {
      return a + t * d;
    };
  }

  function exponential(a, b, y) {
    return (
      (a = Math.pow(a, y)),
      (b = Math.pow(b, y) - a),
      (y = 1 / y),
      function (t) {
        return Math.pow(a + t * b, y);
      }
    );
  }

  function gamma(y) {
    return (y = +y) === 1
      ? nogamma
      : function (a, b) {
          return b - a ? exponential(a, b, y) : constant(isNaN(a) ? b : a);
        };
  }

  function nogamma(a, b) {
    var d = b - a;
    return d ? linear(a, d) : constant(isNaN(a) ? b : a);
  }

  var rgb$1 = (function rgbGamma(y) {
    var color = gamma(y);

    function rgb$1(start, end) {
      var r = color((start = rgb(start)).r, (end = rgb(end)).r),
        g = color(start.g, end.g),
        b = color(start.b, end.b),
        opacity = nogamma(start.opacity, end.opacity);
      return function (t) {
        start.r = r(t);
        start.g = g(t);
        start.b = b(t);
        start.opacity = opacity(t);
        return start + "";
      };
    }

    rgb$1.gamma = rgbGamma;

    return rgb$1;
  })(1);

  function numberArray(a, b) {
    if (!b) b = [];
    var n = a ? Math.min(b.length, a.length) : 0,
      c = b.slice(),
      i;
    return function (t) {
      for (i = 0; i < n; ++i) c[i] = a[i] * (1 - t) + b[i] * t;
      return c;
    };
  }

  function isNumberArray(x) {
    return ArrayBuffer.isView(x) && !(x instanceof DataView);
  }

  function genericArray(a, b) {
    var nb = b ? b.length : 0,
      na = a ? Math.min(nb, a.length) : 0,
      x = new Array(na),
      c = new Array(nb),
      i;

    for (i = 0; i < na; ++i) x[i] = interpolate(a[i], b[i]);
    for (; i < nb; ++i) c[i] = b[i];

    return function (t) {
      for (i = 0; i < na; ++i) c[i] = x[i](t);
      return c;
    };
  }

  function date(a, b) {
    var d = new Date();
    return (
      (a = +a),
      (b = +b),
      function (t) {
        return d.setTime(a * (1 - t) + b * t), d;
      }
    );
  }

  function interpolateNumber(a, b) {
    return (
      (a = +a),
      (b = +b),
      function (t) {
        return a * (1 - t) + b * t;
      }
    );
  }

  function object(a, b) {
    var i = {},
      c = {},
      k;

    if (a === null || typeof a !== "object") a = {};
    if (b === null || typeof b !== "object") b = {};

    for (k in b) {
      if (k in a) {
        i[k] = interpolate(a[k], b[k]);
      } else {
        c[k] = b[k];
      }
    }

    return function (t) {
      for (k in i) c[k] = i[k](t);
      return c;
    };
  }

  var reA = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g,
    reB = new RegExp(reA.source, "g");

  function zero(b) {
    return function () {
      return b;
    };
  }

  function one(b) {
    return function (t) {
      return b(t) + "";
    };
  }

  function string(a, b) {
    var bi = (reA.lastIndex = reB.lastIndex = 0), // scan index for next number in b
      am, // current match in a
      bm, // current match in b
      bs, // string preceding current number in b, if any
      i = -1, // index in s
      s = [], // string constants and placeholders
      q = []; // number interpolators

    // Coerce inputs to strings.
    (a = a + ""), (b = b + "");

    // Interpolate pairs of numbers in a & b.
    while ((am = reA.exec(a)) && (bm = reB.exec(b))) {
      if ((bs = bm.index) > bi) {
        // a string precedes the next number in b
        bs = b.slice(bi, bs);
        if (s[i]) s[i] += bs; // coalesce with previous string
        else s[++i] = bs;
      }
      if ((am = am[0]) === (bm = bm[0])) {
        // numbers in a & b match
        if (s[i]) s[i] += bm; // coalesce with previous string
        else s[++i] = bm;
      } else {
        // interpolate non-matching numbers
        s[++i] = null;
        q.push({ i: i, x: interpolateNumber(am, bm) });
      }
      bi = reB.lastIndex;
    }

    // Add remains of b.
    if (bi < b.length) {
      bs = b.slice(bi);
      if (s[i]) s[i] += bs; // coalesce with previous string
      else s[++i] = bs;
    }

    // Special optimization for only a single match.
    // Otherwise, interpolate each of the numbers and rejoin the string.
    return s.length < 2
      ? q[0]
        ? one(q[0].x)
        : zero(b)
      : ((b = q.length),
        function (t) {
          for (var i = 0, o; i < b; ++i) s[(o = q[i]).i] = o.x(t);
          return s.join("");
        });
  }

  function interpolate(a, b) {
    var t = typeof b,
      c;
    return b == null || t === "boolean"
      ? constant(b)
      : (t === "number"
          ? interpolateNumber
          : t === "string"
            ? (c = color(b))
              ? ((b = c), rgb$1)
              : string
            : b instanceof color
              ? rgb$1
              : b instanceof Date
                ? date
                : isNumberArray(b)
                  ? numberArray
                  : Array.isArray(b)
                    ? genericArray
                    : (typeof b.valueOf !== "function" && typeof b.toString !== "function") || isNaN(b)
                      ? object
                      : interpolateNumber)(a, b);
  }

  function interpolateRound(a, b) {
    return (
      (a = +a),
      (b = +b),
      function (t) {
        return Math.round(a * (1 - t) + b * t);
      }
    );
  }

  function constant$1(x) {
    return function () {
      return x;
    };
  }

  function number(x) {
    return +x;
  }

  var unit = [0, 1];

  function identity(x) {
    return x;
  }

  function normalize(a, b) {
    return (b -= a = +a)
      ? function (x) {
          return (x - a) / b;
        }
      : constant$1(isNaN(b) ? NaN : 0.5);
  }

  function clamper(a, b) {
    var t;
    if (a > b) (t = a), (a = b), (b = t);
    return function (x) {
      return Math.max(a, Math.min(b, x));
    };
  }

  // normalize(a, b)(x) takes a domain value x in [a,b] and returns the corresponding parameter t in [0,1].
  // interpolate(a, b)(t) takes a parameter t in [0,1] and returns the corresponding range value x in [a,b].
  function bimap(domain, range, interpolate) {
    var d0 = domain[0],
      d1 = domain[1],
      r0 = range[0],
      r1 = range[1];
    if (d1 < d0) (d0 = normalize(d1, d0)), (r0 = interpolate(r1, r0));
    else (d0 = normalize(d0, d1)), (r0 = interpolate(r0, r1));
    return function (x) {
      return r0(d0(x));
    };
  }

  function polymap(domain, range, interpolate) {
    var j = Math.min(domain.length, range.length) - 1,
      d = new Array(j),
      r = new Array(j),
      i = -1;

    // Reverse descending domains.
    if (domain[j] < domain[0]) {
      domain = domain.slice().reverse();
      range = range.slice().reverse();
    }

    while (++i < j) {
      d[i] = normalize(domain[i], domain[i + 1]);
      r[i] = interpolate(range[i], range[i + 1]);
    }

    return function (x) {
      var i = bisectRight(domain, x, 1, j) - 1;
      return r[i](d[i](x));
    };
  }

  function copy(source, target) {
    return target.domain(source.domain()).range(source.range()).interpolate(source.interpolate()).clamp(source.clamp()).unknown(source.unknown());
  }

  function transformer() {
    var domain = unit,
      range = unit,
      interpolate$1 = interpolate,
      transform,
      untransform,
      unknown,
      clamp = identity,
      piecewise,
      output,
      input;

    function rescale() {
      var n = Math.min(domain.length, range.length);
      if (clamp !== identity) clamp = clamper(domain[0], domain[n - 1]);
      piecewise = n > 2 ? polymap : bimap;
      output = input = null;
      return scale;
    }

    function scale(x) {
      return isNaN((x = +x)) ? unknown : (output || (output = piecewise(domain.map(transform), range, interpolate$1)))(transform(clamp(x)));
    }

    scale.invert = function (y) {
      return clamp(untransform((input || (input = piecewise(range, domain.map(transform), interpolateNumber)))(y)));
    };

    scale.domain = function (_) {
      return arguments.length ? ((domain = Array.from(_, number)), rescale()) : domain.slice();
    };

    scale.range = function (_) {
      return arguments.length ? ((range = Array.from(_)), rescale()) : range.slice();
    };

    scale.rangeRound = function (_) {
      return (range = Array.from(_)), (interpolate$1 = interpolateRound), rescale();
    };

    scale.clamp = function (_) {
      return arguments.length ? ((clamp = _ ? true : identity), rescale()) : clamp !== identity;
    };

    scale.interpolate = function (_) {
      return arguments.length ? ((interpolate$1 = _), rescale()) : interpolate$1;
    };

    scale.unknown = function (_) {
      return arguments.length ? ((unknown = _), scale) : unknown;
    };

    return function (t, u) {
      (transform = t), (untransform = u);
      return rescale();
    };
  }

  function continuous() {
    return transformer()(identity, identity);
  }

  // Computes the decimal coefficient and exponent of the specified number x with
  // significant digits p, where x is positive and p is in [1, 21] or undefined.
  // For example, formatDecimal(1.23) returns ["123", 0].
  function formatDecimal(x, p) {
    if ((i = (x = p ? x.toExponential(p - 1) : x.toExponential()).indexOf("e")) < 0) return null; // NaN, ±Infinity
    var i,
      coefficient = x.slice(0, i);

    // The string returned by toExponential either has the form \d\.\d+e[-+]\d+
    // (e.g., 1.2e+3) or the form \de[-+]\d+ (e.g., 1e+3).
    return [coefficient.length > 1 ? coefficient[0] + coefficient.slice(2) : coefficient, +x.slice(i + 1)];
  }

  function exponent(x) {
    return (x = formatDecimal(Math.abs(x))), x ? x[1] : NaN;
  }

  function formatGroup(grouping, thousands) {
    return function (value, width) {
      var i = value.length,
        t = [],
        j = 0,
        g = grouping[0],
        length = 0;

      while (i > 0 && g > 0) {
        if (length + g + 1 > width) g = Math.max(1, width - length);
        t.push(value.substring((i -= g), i + g));
        if ((length += g + 1) > width) break;
        g = grouping[(j = (j + 1) % grouping.length)];
      }

      return t.reverse().join(thousands);
    };
  }

  function formatNumerals(numerals) {
    return function (value) {
      return value.replace(/[0-9]/g, function (i) {
        return numerals[+i];
      });
    };
  }

  // [[fill]align][sign][symbol][0][width][,][.precision][~][type]
  var re = /^(?:(.)?([<>=^]))?([+\-( ])?([$#])?(0)?(\d+)?(,)?(\.\d+)?(~)?([a-z%])?$/i;

  function formatSpecifier(specifier) {
    if (!(match = re.exec(specifier))) throw new Error("invalid format: " + specifier);
    var match;
    return new FormatSpecifier({
      fill: match[1],
      align: match[2],
      sign: match[3],
      symbol: match[4],
      zero: match[5],
      width: match[6],
      comma: match[7],
      precision: match[8] && match[8].slice(1),
      trim: match[9],
      type: match[10],
    });
  }

  formatSpecifier.prototype = FormatSpecifier.prototype; // instanceof

  function FormatSpecifier(specifier) {
    this.fill = specifier.fill === undefined ? " " : specifier.fill + "";
    this.align = specifier.align === undefined ? ">" : specifier.align + "";
    this.sign = specifier.sign === undefined ? "-" : specifier.sign + "";
    this.symbol = specifier.symbol === undefined ? "" : specifier.symbol + "";
    this.zero = !!specifier.zero;
    this.width = specifier.width === undefined ? undefined : +specifier.width;
    this.comma = !!specifier.comma;
    this.precision = specifier.precision === undefined ? undefined : +specifier.precision;
    this.trim = !!specifier.trim;
    this.type = specifier.type === undefined ? "" : specifier.type + "";
  }

  FormatSpecifier.prototype.toString = function () {
    return (
      this.fill +
      this.align +
      this.sign +
      this.symbol +
      (this.zero ? "0" : "") +
      (this.width === undefined ? "" : Math.max(1, this.width | 0)) +
      (this.comma ? "," : "") +
      (this.precision === undefined ? "" : "." + Math.max(0, this.precision | 0)) +
      (this.trim ? "~" : "") +
      this.type
    );
  };

  // Trims insignificant zeros, e.g., replaces 1.2000k with 1.2k.
  function formatTrim(s) {
    out: for (var n = s.length, i = 1, i0 = -1, i1; i < n; ++i) {
      switch (s[i]) {
        case ".":
          i0 = i1 = i;
          break;
        case "0":
          if (i0 === 0) i0 = i;
          i1 = i;
          break;
        default:
          if (!+s[i]) break out;
          if (i0 > 0) i0 = 0;
          break;
      }
    }
    return i0 > 0 ? s.slice(0, i0) + s.slice(i1 + 1) : s;
  }

  var prefixExponent;

  function formatPrefixAuto(x, p) {
    var d = formatDecimal(x, p);
    if (!d) return x + "";
    var coefficient = d[0],
      exponent = d[1],
      i = exponent - (prefixExponent = Math.max(-8, Math.min(8, Math.floor(exponent / 3))) * 3) + 1,
      n = coefficient.length;
    return i === n
      ? coefficient
      : i > n
        ? coefficient + new Array(i - n + 1).join("0")
        : i > 0
          ? coefficient.slice(0, i) + "." + coefficient.slice(i)
          : "0." + new Array(1 - i).join("0") + formatDecimal(x, Math.max(0, p + i - 1))[0]; // less than 1y!
  }

  function formatRounded(x, p) {
    var d = formatDecimal(x, p);
    if (!d) return x + "";
    var coefficient = d[0],
      exponent = d[1];
    return exponent < 0
      ? "0." + new Array(-exponent).join("0") + coefficient
      : coefficient.length > exponent + 1
        ? coefficient.slice(0, exponent + 1) + "." + coefficient.slice(exponent + 1)
        : coefficient + new Array(exponent - coefficient.length + 2).join("0");
  }

  var formatTypes = {
    "%": function (x, p) {
      return (x * 100).toFixed(p);
    },
    b: function (x) {
      return Math.round(x).toString(2);
    },
    c: function (x) {
      return x + "";
    },
    d: function (x) {
      return Math.round(x).toString(10);
    },
    e: function (x, p) {
      return x.toExponential(p);
    },
    f: function (x, p) {
      return x.toFixed(p);
    },
    g: function (x, p) {
      return x.toPrecision(p);
    },
    o: function (x) {
      return Math.round(x).toString(8);
    },
    p: function (x, p) {
      return formatRounded(x * 100, p);
    },
    r: formatRounded,
    s: formatPrefixAuto,
    X: function (x) {
      return Math.round(x).toString(16).toUpperCase();
    },
    x: function (x) {
      return Math.round(x).toString(16);
    },
  };

  function identity$1(x) {
    return x;
  }

  var map = Array.prototype.map,
    prefixes = ["y", "z", "a", "f", "p", "n", "µ", "m", "", "k", "M", "G", "T", "P", "E", "Z", "Y"];

  function formatLocale(locale) {
    var group =
        locale.grouping === undefined || locale.thousands === undefined
          ? identity$1
          : formatGroup(map.call(locale.grouping, Number), locale.thousands + ""),
      currencyPrefix = locale.currency === undefined ? "" : locale.currency[0] + "",
      currencySuffix = locale.currency === undefined ? "" : locale.currency[1] + "",
      decimal = locale.decimal === undefined ? "." : locale.decimal + "",
      numerals = locale.numerals === undefined ? identity$1 : formatNumerals(map.call(locale.numerals, String)),
      percent = locale.percent === undefined ? "%" : locale.percent + "",
      minus = locale.minus === undefined ? "-" : locale.minus + "",
      nan = locale.nan === undefined ? "NaN" : locale.nan + "";

    function newFormat(specifier) {
      specifier = formatSpecifier(specifier);

      var fill = specifier.fill,
        align = specifier.align,
        sign = specifier.sign,
        symbol = specifier.symbol,
        zero = specifier.zero,
        width = specifier.width,
        comma = specifier.comma,
        precision = specifier.precision,
        trim = specifier.trim,
        type = specifier.type;

      // The "n" type is an alias for ",g".
      if (type === "n") (comma = true), (type = "g");
      // The "" type, and any invalid type, is an alias for ".12~g".
      else if (!formatTypes[type]) precision === undefined && (precision = 12), (trim = true), (type = "g");

      // If zero fill is specified, padding goes after sign and before digits.
      if (zero || (fill === "0" && align === "=")) (zero = true), (fill = "0"), (align = "=");

      // Compute the prefix and suffix.
      // For SI-prefix, the suffix is lazily computed.
      var prefix = symbol === "$" ? currencyPrefix : symbol === "#" && /[boxX]/.test(type) ? "0" + type.toLowerCase() : "",
        suffix = symbol === "$" ? currencySuffix : /[%p]/.test(type) ? percent : "";

      // What format function should we use?
      // Is this an integer type?
      // Can this type generate exponential notation?
      var formatType = formatTypes[type],
        maybeSuffix = /[defgprs%]/.test(type);

      // Set the default precision if not specified,
      // or clamp the specified precision to the supported range.
      // For significant precision, it must be in [1, 21].
      // For fixed precision, it must be in [0, 20].
      precision = precision === undefined ? 6 : /[gprs]/.test(type) ? Math.max(1, Math.min(21, precision)) : Math.max(0, Math.min(20, precision));

      function format(value) {
        var valuePrefix = prefix,
          valueSuffix = suffix,
          i,
          n,
          c;

        if (type === "c") {
          valueSuffix = formatType(value) + valueSuffix;
          value = "";
        } else {
          value = +value;

          // Determine the sign. -0 is not less than 0, but 1 / -0 is!
          var valueNegative = value < 0 || 1 / value < 0;

          // Perform the initial formatting.
          value = isNaN(value) ? nan : formatType(Math.abs(value), precision);

          // Trim insignificant zeros.
          if (trim) value = formatTrim(value);

          // If a negative value rounds to zero after formatting, and no explicit positive sign is requested, hide the sign.
          if (valueNegative && +value === 0 && sign !== "+") valueNegative = false;

          // Compute the prefix and suffix.
          valuePrefix = (valueNegative ? (sign === "(" ? sign : minus) : sign === "-" || sign === "(" ? "" : sign) + valuePrefix;
          valueSuffix = (type === "s" ? prefixes[8 + prefixExponent / 3] : "") + valueSuffix + (valueNegative && sign === "(" ? ")" : "");

          // Break the formatted value into the integer “value” part that can be
          // grouped, and fractional or exponential “suffix” part that is not.
          if (maybeSuffix) {
            (i = -1), (n = value.length);
            while (++i < n) {
              if (((c = value.charCodeAt(i)), 48 > c || c > 57)) {
                valueSuffix = (c === 46 ? decimal + value.slice(i + 1) : value.slice(i)) + valueSuffix;
                value = value.slice(0, i);
                break;
              }
            }
          }
        }

        // If the fill character is not "0", grouping is applied before padding.
        if (comma && !zero) value = group(value, Infinity);

        // Compute the padding.
        var length = valuePrefix.length + value.length + valueSuffix.length,
          padding = length < width ? new Array(width - length + 1).join(fill) : "";

        // If the fill character is "0", grouping is applied after padding.
        if (comma && zero) (value = group(padding + value, padding.length ? width - valueSuffix.length : Infinity)), (padding = "");

        // Reconstruct the final output based on the desired alignment.
        switch (align) {
          case "<":
            value = valuePrefix + value + valueSuffix + padding;
            break;
          case "=":
            value = valuePrefix + padding + value + valueSuffix;
            break;
          case "^":
            value = padding.slice(0, (length = padding.length >> 1)) + valuePrefix + value + valueSuffix + padding.slice(length);
            break;
          default:
            value = padding + valuePrefix + value + valueSuffix;
            break;
        }

        return numerals(value);
      }

      format.toString = function () {
        return specifier + "";
      };

      return format;
    }

    function formatPrefix(specifier, value) {
      var f = newFormat(((specifier = formatSpecifier(specifier)), (specifier.type = "f"), specifier)),
        e = Math.max(-8, Math.min(8, Math.floor(exponent(value) / 3))) * 3,
        k = Math.pow(10, -e),
        prefix = prefixes[8 + e / 3];
      return function (value) {
        return f(k * value) + prefix;
      };
    }

    return {
      format: newFormat,
      formatPrefix: formatPrefix,
    };
  }

  var locale;
  var format;
  var formatPrefix;

  defaultLocale({
    decimal: ".",
    thousands: ",",
    grouping: [3],
    currency: ["$", ""],
    minus: "-",
  });

  function defaultLocale(definition) {
    locale = formatLocale(definition);
    format = locale.format;
    formatPrefix = locale.formatPrefix;
    return locale;
  }

  function precisionFixed(step) {
    return Math.max(0, -exponent(Math.abs(step)));
  }

  function precisionPrefix(step, value) {
    return Math.max(0, Math.max(-8, Math.min(8, Math.floor(exponent(value) / 3))) * 3 - exponent(Math.abs(step)));
  }

  function precisionRound(step, max) {
    (step = Math.abs(step)), (max = Math.abs(max) - step);
    return Math.max(0, exponent(max) - exponent(step)) + 1;
  }

  function tickFormat(start, stop, count, specifier) {
    var step = tickStep(start, stop, count),
      precision;
    specifier = formatSpecifier(specifier == null ? ",f" : specifier);
    switch (specifier.type) {
      case "s": {
        var value = Math.max(Math.abs(start), Math.abs(stop));
        if (specifier.precision == null && !isNaN((precision = precisionPrefix(step, value)))) specifier.precision = precision;
        return formatPrefix(specifier, value);
      }
      case "":
      case "e":
      case "g":
      case "p":
      case "r": {
        if (specifier.precision == null && !isNaN((precision = precisionRound(step, Math.max(Math.abs(start), Math.abs(stop))))))
          specifier.precision = precision - (specifier.type === "e");
        break;
      }
      case "f":
      case "%": {
        if (specifier.precision == null && !isNaN((precision = precisionFixed(step)))) specifier.precision = precision - (specifier.type === "%") * 2;
        break;
      }
    }
    return format(specifier);
  }

  function linearish(scale) {
    var domain = scale.domain;

    scale.ticks = function (count) {
      var d = domain();
      return ticks(d[0], d[d.length - 1], count == null ? 10 : count);
    };

    scale.tickFormat = function (count, specifier) {
      var d = domain();
      return tickFormat(d[0], d[d.length - 1], count == null ? 10 : count, specifier);
    };

    scale.nice = function (count) {
      if (count == null) count = 10;

      var d = domain(),
        i0 = 0,
        i1 = d.length - 1,
        start = d[i0],
        stop = d[i1],
        step;

      if (stop < start) {
        (step = start), (start = stop), (stop = step);
        (step = i0), (i0 = i1), (i1 = step);
      }

      step = tickIncrement(start, stop, count);

      if (step > 0) {
        start = Math.floor(start / step) * step;
        stop = Math.ceil(stop / step) * step;
        step = tickIncrement(start, stop, count);
      } else if (step < 0) {
        start = Math.ceil(start * step) / step;
        stop = Math.floor(stop * step) / step;
        step = tickIncrement(start, stop, count);
      }

      if (step > 0) {
        d[i0] = Math.floor(start / step) * step;
        d[i1] = Math.ceil(stop / step) * step;
        domain(d);
      } else if (step < 0) {
        d[i0] = Math.ceil(start * step) / step;
        d[i1] = Math.floor(stop * step) / step;
        domain(d);
      }

      return scale;
    };

    return scale;
  }

  function linear$1() {
    var scale = continuous();

    scale.copy = function () {
      return copy(scale, linear$1());
    };

    initRange.apply(scale, arguments);

    return linearish(scale);
  }

  var t0$1 = new Date(),
    t1$1 = new Date();

  function newInterval(floori, offseti, count, field) {
    function interval(date) {
      return floori((date = arguments.length === 0 ? new Date() : new Date(+date))), date;
    }

    interval.floor = function (date) {
      return floori((date = new Date(+date))), date;
    };

    interval.ceil = function (date) {
      return floori((date = new Date(date - 1))), offseti(date, 1), floori(date), date;
    };

    interval.round = function (date) {
      var d0 = interval(date),
        d1 = interval.ceil(date);
      return date - d0 < d1 - date ? d0 : d1;
    };

    interval.offset = function (date, step) {
      return offseti((date = new Date(+date)), step == null ? 1 : Math.floor(step)), date;
    };

    interval.range = function (start, stop, step) {
      var range = [],
        previous;
      start = interval.ceil(start);
      step = step == null ? 1 : Math.floor(step);
      if (!(start < stop) || !(step > 0)) return range; // also handles Invalid Date
      do range.push((previous = new Date(+start))), offseti(start, step), floori(start);
      while (previous < start && start < stop);
      return range;
    };

    interval.filter = function (test) {
      return newInterval(
        function (date) {
          if (date >= date) while ((floori(date), !test(date))) date.setTime(date - 1);
        },
        function (date, step) {
          if (date >= date) {
            if (step < 0)
              while (++step <= 0) {
                while ((offseti(date, -1), !test(date))) {} // eslint-disable-line no-empty
              }
            else
              while (--step >= 0) {
                while ((offseti(date, +1), !test(date))) {} // eslint-disable-line no-empty
              }
          }
        }
      );
    };

    if (count) {
      interval.count = function (start, end) {
        t0$1.setTime(+start), t1$1.setTime(+end);
        floori(t0$1), floori(t1$1);
        return Math.floor(count(t0$1, t1$1));
      };

      interval.every = function (step) {
        step = Math.floor(step);
        return !isFinite(step) || !(step > 0)
          ? null
          : !(step > 1)
            ? interval
            : interval.filter(
                field
                  ? function (d) {
                      return field(d) % step === 0;
                    }
                  : function (d) {
                      return interval.count(0, d) % step === 0;
                    }
              );
      };
    }

    return interval;
  }

  var millisecond = newInterval(
    function () {
      // noop
    },
    function (date, step) {
      date.setTime(+date + step);
    },
    function (start, end) {
      return end - start;
    }
  );

  // An optimized implementation for this simple case.
  millisecond.every = function (k) {
    k = Math.floor(k);
    if (!isFinite(k) || !(k > 0)) return null;
    if (!(k > 1)) return millisecond;
    return newInterval(
      function (date) {
        date.setTime(Math.floor(date / k) * k);
      },
      function (date, step) {
        date.setTime(+date + step * k);
      },
      function (start, end) {
        return (end - start) / k;
      }
    );
  };

  var durationSecond = 1e3;
  var durationMinute = 6e4;
  var durationHour = 36e5;
  var durationDay = 864e5;
  var durationWeek = 6048e5;

  var second = newInterval(
    function (date) {
      date.setTime(date - date.getMilliseconds());
    },
    function (date, step) {
      date.setTime(+date + step * durationSecond);
    },
    function (start, end) {
      return (end - start) / durationSecond;
    },
    function (date) {
      return date.getUTCSeconds();
    }
  );

  var minute = newInterval(
    function (date) {
      date.setTime(date - date.getMilliseconds() - date.getSeconds() * durationSecond);
    },
    function (date, step) {
      date.setTime(+date + step * durationMinute);
    },
    function (start, end) {
      return (end - start) / durationMinute;
    },
    function (date) {
      return date.getMinutes();
    }
  );

  var hour = newInterval(
    function (date) {
      date.setTime(date - date.getMilliseconds() - date.getSeconds() * durationSecond - date.getMinutes() * durationMinute);
    },
    function (date, step) {
      date.setTime(+date + step * durationHour);
    },
    function (start, end) {
      return (end - start) / durationHour;
    },
    function (date) {
      return date.getHours();
    }
  );

  var day = newInterval(
    function (date) {
      date.setHours(0, 0, 0, 0);
    },
    function (date, step) {
      date.setDate(date.getDate() + step);
    },
    function (start, end) {
      return (end - start - (end.getTimezoneOffset() - start.getTimezoneOffset()) * durationMinute) / durationDay;
    },
    function (date) {
      return date.getDate() - 1;
    }
  );

  function weekday(i) {
    return newInterval(
      function (date) {
        date.setDate(date.getDate() - ((date.getDay() + 7 - i) % 7));
        date.setHours(0, 0, 0, 0);
      },
      function (date, step) {
        date.setDate(date.getDate() + step * 7);
      },
      function (start, end) {
        return (end - start - (end.getTimezoneOffset() - start.getTimezoneOffset()) * durationMinute) / durationWeek;
      }
    );
  }

  var sunday = weekday(0);
  var monday = weekday(1);
  var tuesday = weekday(2);
  var wednesday = weekday(3);
  var thursday = weekday(4);
  var friday = weekday(5);
  var saturday = weekday(6);

  var month = newInterval(
    function (date) {
      date.setDate(1);
      date.setHours(0, 0, 0, 0);
    },
    function (date, step) {
      date.setMonth(date.getMonth() + step);
    },
    function (start, end) {
      return end.getMonth() - start.getMonth() + (end.getFullYear() - start.getFullYear()) * 12;
    },
    function (date) {
      return date.getMonth();
    }
  );

  var year = newInterval(
    function (date) {
      date.setMonth(0, 1);
      date.setHours(0, 0, 0, 0);
    },
    function (date, step) {
      date.setFullYear(date.getFullYear() + step);
    },
    function (start, end) {
      return end.getFullYear() - start.getFullYear();
    },
    function (date) {
      return date.getFullYear();
    }
  );

  // An optimized implementation for this simple case.
  year.every = function (k) {
    return !isFinite((k = Math.floor(k))) || !(k > 0)
      ? null
      : newInterval(
          function (date) {
            date.setFullYear(Math.floor(date.getFullYear() / k) * k);
            date.setMonth(0, 1);
            date.setHours(0, 0, 0, 0);
          },
          function (date, step) {
            date.setFullYear(date.getFullYear() + step * k);
          }
        );
  };

  var utcMinute = newInterval(
    function (date) {
      date.setUTCSeconds(0, 0);
    },
    function (date, step) {
      date.setTime(+date + step * durationMinute);
    },
    function (start, end) {
      return (end - start) / durationMinute;
    },
    function (date) {
      return date.getUTCMinutes();
    }
  );

  var utcHour = newInterval(
    function (date) {
      date.setUTCMinutes(0, 0, 0);
    },
    function (date, step) {
      date.setTime(+date + step * durationHour);
    },
    function (start, end) {
      return (end - start) / durationHour;
    },
    function (date) {
      return date.getUTCHours();
    }
  );

  var utcDay = newInterval(
    function (date) {
      date.setUTCHours(0, 0, 0, 0);
    },
    function (date, step) {
      date.setUTCDate(date.getUTCDate() + step);
    },
    function (start, end) {
      return (end - start) / durationDay;
    },
    function (date) {
      return date.getUTCDate() - 1;
    }
  );

  function utcWeekday(i) {
    return newInterval(
      function (date) {
        date.setUTCDate(date.getUTCDate() - ((date.getUTCDay() + 7 - i) % 7));
        date.setUTCHours(0, 0, 0, 0);
      },
      function (date, step) {
        date.setUTCDate(date.getUTCDate() + step * 7);
      },
      function (start, end) {
        return (end - start) / durationWeek;
      }
    );
  }

  var utcSunday = utcWeekday(0);
  var utcMonday = utcWeekday(1);
  var utcTuesday = utcWeekday(2);
  var utcWednesday = utcWeekday(3);
  var utcThursday = utcWeekday(4);
  var utcFriday = utcWeekday(5);
  var utcSaturday = utcWeekday(6);

  var utcMonth = newInterval(
    function (date) {
      date.setUTCDate(1);
      date.setUTCHours(0, 0, 0, 0);
    },
    function (date, step) {
      date.setUTCMonth(date.getUTCMonth() + step);
    },
    function (start, end) {
      return end.getUTCMonth() - start.getUTCMonth() + (end.getUTCFullYear() - start.getUTCFullYear()) * 12;
    },
    function (date) {
      return date.getUTCMonth();
    }
  );

  var utcYear = newInterval(
    function (date) {
      date.setUTCMonth(0, 1);
      date.setUTCHours(0, 0, 0, 0);
    },
    function (date, step) {
      date.setUTCFullYear(date.getUTCFullYear() + step);
    },
    function (start, end) {
      return end.getUTCFullYear() - start.getUTCFullYear();
    },
    function (date) {
      return date.getUTCFullYear();
    }
  );

  // An optimized implementation for this simple case.
  utcYear.every = function (k) {
    return !isFinite((k = Math.floor(k))) || !(k > 0)
      ? null
      : newInterval(
          function (date) {
            date.setUTCFullYear(Math.floor(date.getUTCFullYear() / k) * k);
            date.setUTCMonth(0, 1);
            date.setUTCHours(0, 0, 0, 0);
          },
          function (date, step) {
            date.setUTCFullYear(date.getUTCFullYear() + step * k);
          }
        );
  };

  function localDate(d) {
    if (0 <= d.y && d.y < 100) {
      var date = new Date(-1, d.m, d.d, d.H, d.M, d.S, d.L);
      date.setFullYear(d.y);
      return date;
    }
    return new Date(d.y, d.m, d.d, d.H, d.M, d.S, d.L);
  }

  function utcDate(d) {
    if (0 <= d.y && d.y < 100) {
      var date = new Date(Date.UTC(-1, d.m, d.d, d.H, d.M, d.S, d.L));
      date.setUTCFullYear(d.y);
      return date;
    }
    return new Date(Date.UTC(d.y, d.m, d.d, d.H, d.M, d.S, d.L));
  }

  function newDate(y, m, d) {
    return { y: y, m: m, d: d, H: 0, M: 0, S: 0, L: 0 };
  }

  function formatLocale$1(locale) {
    var locale_dateTime = locale.dateTime,
      locale_date = locale.date,
      locale_time = locale.time,
      locale_periods = locale.periods,
      locale_weekdays = locale.days,
      locale_shortWeekdays = locale.shortDays,
      locale_months = locale.months,
      locale_shortMonths = locale.shortMonths;

    var periodRe = formatRe(locale_periods),
      periodLookup = formatLookup(locale_periods),
      weekdayRe = formatRe(locale_weekdays),
      weekdayLookup = formatLookup(locale_weekdays),
      shortWeekdayRe = formatRe(locale_shortWeekdays),
      shortWeekdayLookup = formatLookup(locale_shortWeekdays),
      monthRe = formatRe(locale_months),
      monthLookup = formatLookup(locale_months),
      shortMonthRe = formatRe(locale_shortMonths),
      shortMonthLookup = formatLookup(locale_shortMonths);

    var formats = {
      a: formatShortWeekday,
      A: formatWeekday,
      b: formatShortMonth,
      B: formatMonth,
      c: null,
      d: formatDayOfMonth,
      e: formatDayOfMonth,
      f: formatMicroseconds,
      H: formatHour24,
      I: formatHour12,
      j: formatDayOfYear,
      L: formatMilliseconds,
      m: formatMonthNumber,
      M: formatMinutes,
      p: formatPeriod,
      q: formatQuarter,
      Q: formatUnixTimestamp,
      s: formatUnixTimestampSeconds,
      S: formatSeconds,
      u: formatWeekdayNumberMonday,
      U: formatWeekNumberSunday,
      V: formatWeekNumberISO,
      w: formatWeekdayNumberSunday,
      W: formatWeekNumberMonday,
      x: null,
      X: null,
      y: formatYear,
      Y: formatFullYear,
      Z: formatZone,
      "%": formatLiteralPercent,
    };

    var utcFormats = {
      a: formatUTCShortWeekday,
      A: formatUTCWeekday,
      b: formatUTCShortMonth,
      B: formatUTCMonth,
      c: null,
      d: formatUTCDayOfMonth,
      e: formatUTCDayOfMonth,
      f: formatUTCMicroseconds,
      H: formatUTCHour24,
      I: formatUTCHour12,
      j: formatUTCDayOfYear,
      L: formatUTCMilliseconds,
      m: formatUTCMonthNumber,
      M: formatUTCMinutes,
      p: formatUTCPeriod,
      q: formatUTCQuarter,
      Q: formatUnixTimestamp,
      s: formatUnixTimestampSeconds,
      S: formatUTCSeconds,
      u: formatUTCWeekdayNumberMonday,
      U: formatUTCWeekNumberSunday,
      V: formatUTCWeekNumberISO,
      w: formatUTCWeekdayNumberSunday,
      W: formatUTCWeekNumberMonday,
      x: null,
      X: null,
      y: formatUTCYear,
      Y: formatUTCFullYear,
      Z: formatUTCZone,
      "%": formatLiteralPercent,
    };

    var parses = {
      a: parseShortWeekday,
      A: parseWeekday,
      b: parseShortMonth,
      B: parseMonth,
      c: parseLocaleDateTime,
      d: parseDayOfMonth,
      e: parseDayOfMonth,
      f: parseMicroseconds,
      H: parseHour24,
      I: parseHour24,
      j: parseDayOfYear,
      L: parseMilliseconds,
      m: parseMonthNumber,
      M: parseMinutes,
      p: parsePeriod,
      q: parseQuarter,
      Q: parseUnixTimestamp,
      s: parseUnixTimestampSeconds,
      S: parseSeconds,
      u: parseWeekdayNumberMonday,
      U: parseWeekNumberSunday,
      V: parseWeekNumberISO,
      w: parseWeekdayNumberSunday,
      W: parseWeekNumberMonday,
      x: parseLocaleDate,
      X: parseLocaleTime,
      y: parseYear,
      Y: parseFullYear,
      Z: parseZone,
      "%": parseLiteralPercent,
    };

    // These recursive directive definitions must be deferred.
    formats.x = newFormat(locale_date, formats);
    formats.X = newFormat(locale_time, formats);
    formats.c = newFormat(locale_dateTime, formats);
    utcFormats.x = newFormat(locale_date, utcFormats);
    utcFormats.X = newFormat(locale_time, utcFormats);
    utcFormats.c = newFormat(locale_dateTime, utcFormats);

    function newFormat(specifier, formats) {
      return function (date) {
        var string = [],
          i = -1,
          j = 0,
          n = specifier.length,
          c,
          pad,
          format;

        if (!(date instanceof Date)) date = new Date(+date);

        while (++i < n) {
          if (specifier.charCodeAt(i) === 37) {
            string.push(specifier.slice(j, i));
            if ((pad = pads[(c = specifier.charAt(++i))]) != null) c = specifier.charAt(++i);
            else pad = c === "e" ? " " : "0";
            if ((format = formats[c])) c = format(date, pad);
            string.push(c);
            j = i + 1;
          }
        }

        string.push(specifier.slice(j, i));
        return string.join("");
      };
    }

    function newParse(specifier, Z) {
      return function (string) {
        var d = newDate(1900, undefined, 1),
          i = parseSpecifier(d, specifier, (string += ""), 0),
          week,
          day$1;
        if (i != string.length) return null;

        // If a UNIX timestamp is specified, return it.
        if ("Q" in d) return new Date(d.Q);
        if ("s" in d) return new Date(d.s * 1000 + ("L" in d ? d.L : 0));

        // If this is utcParse, never use the local timezone.
        if (Z && !("Z" in d)) d.Z = 0;

        // The am-pm flag is 0 for AM, and 1 for PM.
        if ("p" in d) d.H = (d.H % 12) + d.p * 12;

        // If the month was not specified, inherit from the quarter.
        if (d.m === undefined) d.m = "q" in d ? d.q : 0;

        // Convert day-of-week and week-of-year to day-of-year.
        if ("V" in d) {
          if (d.V < 1 || d.V > 53) return null;
          if (!("w" in d)) d.w = 1;
          if ("Z" in d) {
            (week = utcDate(newDate(d.y, 0, 1))), (day$1 = week.getUTCDay());
            week = day$1 > 4 || day$1 === 0 ? utcMonday.ceil(week) : utcMonday(week);
            week = utcDay.offset(week, (d.V - 1) * 7);
            d.y = week.getUTCFullYear();
            d.m = week.getUTCMonth();
            d.d = week.getUTCDate() + ((d.w + 6) % 7);
          } else {
            (week = localDate(newDate(d.y, 0, 1))), (day$1 = week.getDay());
            week = day$1 > 4 || day$1 === 0 ? monday.ceil(week) : monday(week);
            week = day.offset(week, (d.V - 1) * 7);
            d.y = week.getFullYear();
            d.m = week.getMonth();
            d.d = week.getDate() + ((d.w + 6) % 7);
          }
        } else if ("W" in d || "U" in d) {
          if (!("w" in d)) d.w = "u" in d ? d.u % 7 : "W" in d ? 1 : 0;
          day$1 = "Z" in d ? utcDate(newDate(d.y, 0, 1)).getUTCDay() : localDate(newDate(d.y, 0, 1)).getDay();
          d.m = 0;
          d.d = "W" in d ? ((d.w + 6) % 7) + d.W * 7 - ((day$1 + 5) % 7) : d.w + d.U * 7 - ((day$1 + 6) % 7);
        }

        // If a time zone is specified, all fields are interpreted as UTC and then
        // offset according to the specified time zone.
        if ("Z" in d) {
          d.H += (d.Z / 100) | 0;
          d.M += d.Z % 100;
          return utcDate(d);
        }

        // Otherwise, all fields are in local time.
        return localDate(d);
      };
    }

    function parseSpecifier(d, specifier, string, j) {
      var i = 0,
        n = specifier.length,
        m = string.length,
        c,
        parse;

      while (i < n) {
        if (j >= m) return -1;
        c = specifier.charCodeAt(i++);
        if (c === 37) {
          c = specifier.charAt(i++);
          parse = parses[c in pads ? specifier.charAt(i++) : c];
          if (!parse || (j = parse(d, string, j)) < 0) return -1;
        } else if (c != string.charCodeAt(j++)) {
          return -1;
        }
      }

      return j;
    }

    function parsePeriod(d, string, i) {
      var n = periodRe.exec(string.slice(i));
      return n ? ((d.p = periodLookup[n[0].toLowerCase()]), i + n[0].length) : -1;
    }

    function parseShortWeekday(d, string, i) {
      var n = shortWeekdayRe.exec(string.slice(i));
      return n ? ((d.w = shortWeekdayLookup[n[0].toLowerCase()]), i + n[0].length) : -1;
    }

    function parseWeekday(d, string, i) {
      var n = weekdayRe.exec(string.slice(i));
      return n ? ((d.w = weekdayLookup[n[0].toLowerCase()]), i + n[0].length) : -1;
    }

    function parseShortMonth(d, string, i) {
      var n = shortMonthRe.exec(string.slice(i));
      return n ? ((d.m = shortMonthLookup[n[0].toLowerCase()]), i + n[0].length) : -1;
    }

    function parseMonth(d, string, i) {
      var n = monthRe.exec(string.slice(i));
      return n ? ((d.m = monthLookup[n[0].toLowerCase()]), i + n[0].length) : -1;
    }

    function parseLocaleDateTime(d, string, i) {
      return parseSpecifier(d, locale_dateTime, string, i);
    }

    function parseLocaleDate(d, string, i) {
      return parseSpecifier(d, locale_date, string, i);
    }

    function parseLocaleTime(d, string, i) {
      return parseSpecifier(d, locale_time, string, i);
    }

    function formatShortWeekday(d) {
      return locale_shortWeekdays[d.getDay()];
    }

    function formatWeekday(d) {
      return locale_weekdays[d.getDay()];
    }

    function formatShortMonth(d) {
      return locale_shortMonths[d.getMonth()];
    }

    function formatMonth(d) {
      return locale_months[d.getMonth()];
    }

    function formatPeriod(d) {
      return locale_periods[+(d.getHours() >= 12)];
    }

    function formatQuarter(d) {
      return 1 + ~~(d.getMonth() / 3);
    }

    function formatUTCShortWeekday(d) {
      return locale_shortWeekdays[d.getUTCDay()];
    }

    function formatUTCWeekday(d) {
      return locale_weekdays[d.getUTCDay()];
    }

    function formatUTCShortMonth(d) {
      return locale_shortMonths[d.getUTCMonth()];
    }

    function formatUTCMonth(d) {
      return locale_months[d.getUTCMonth()];
    }

    function formatUTCPeriod(d) {
      return locale_periods[+(d.getUTCHours() >= 12)];
    }

    function formatUTCQuarter(d) {
      return 1 + ~~(d.getUTCMonth() / 3);
    }

    return {
      format: function (specifier) {
        var f = newFormat((specifier += ""), formats);
        f.toString = function () {
          return specifier;
        };
        return f;
      },
      parse: function (specifier) {
        var p = newParse((specifier += ""), false);
        p.toString = function () {
          return specifier;
        };
        return p;
      },
      utcFormat: function (specifier) {
        var f = newFormat((specifier += ""), utcFormats);
        f.toString = function () {
          return specifier;
        };
        return f;
      },
      utcParse: function (specifier) {
        var p = newParse((specifier += ""), true);
        p.toString = function () {
          return specifier;
        };
        return p;
      },
    };
  }

  var pads = { "-": "", _: " ", 0: "0" },
    numberRe = /^\s*\d+/, // note: ignores next directive
    percentRe = /^%/,
    requoteRe = /[\\^$*+?|[\]().{}]/g;

  function pad(value, fill, width) {
    var sign = value < 0 ? "-" : "",
      string = (sign ? -value : value) + "",
      length = string.length;
    return sign + (length < width ? new Array(width - length + 1).join(fill) + string : string);
  }

  function requote(s) {
    return s.replace(requoteRe, "\\$&");
  }

  function formatRe(names) {
    return new RegExp("^(?:" + names.map(requote).join("|") + ")", "i");
  }

  function formatLookup(names) {
    var map = {},
      i = -1,
      n = names.length;
    while (++i < n) map[names[i].toLowerCase()] = i;
    return map;
  }

  function parseWeekdayNumberSunday(d, string, i) {
    var n = numberRe.exec(string.slice(i, i + 1));
    return n ? ((d.w = +n[0]), i + n[0].length) : -1;
  }

  function parseWeekdayNumberMonday(d, string, i) {
    var n = numberRe.exec(string.slice(i, i + 1));
    return n ? ((d.u = +n[0]), i + n[0].length) : -1;
  }

  function parseWeekNumberSunday(d, string, i) {
    var n = numberRe.exec(string.slice(i, i + 2));
    return n ? ((d.U = +n[0]), i + n[0].length) : -1;
  }

  function parseWeekNumberISO(d, string, i) {
    var n = numberRe.exec(string.slice(i, i + 2));
    return n ? ((d.V = +n[0]), i + n[0].length) : -1;
  }

  function parseWeekNumberMonday(d, string, i) {
    var n = numberRe.exec(string.slice(i, i + 2));
    return n ? ((d.W = +n[0]), i + n[0].length) : -1;
  }

  function parseFullYear(d, string, i) {
    var n = numberRe.exec(string.slice(i, i + 4));
    return n ? ((d.y = +n[0]), i + n[0].length) : -1;
  }

  function parseYear(d, string, i) {
    var n = numberRe.exec(string.slice(i, i + 2));
    return n ? ((d.y = +n[0] + (+n[0] > 68 ? 1900 : 2000)), i + n[0].length) : -1;
  }

  function parseZone(d, string, i) {
    var n = /^(Z)|([+-]\d\d)(?::?(\d\d))?/.exec(string.slice(i, i + 6));
    return n ? ((d.Z = n[1] ? 0 : -(n[2] + (n[3] || "00"))), i + n[0].length) : -1;
  }

  function parseQuarter(d, string, i) {
    var n = numberRe.exec(string.slice(i, i + 1));
    return n ? ((d.q = n[0] * 3 - 3), i + n[0].length) : -1;
  }

  function parseMonthNumber(d, string, i) {
    var n = numberRe.exec(string.slice(i, i + 2));
    return n ? ((d.m = n[0] - 1), i + n[0].length) : -1;
  }

  function parseDayOfMonth(d, string, i) {
    var n = numberRe.exec(string.slice(i, i + 2));
    return n ? ((d.d = +n[0]), i + n[0].length) : -1;
  }

  function parseDayOfYear(d, string, i) {
    var n = numberRe.exec(string.slice(i, i + 3));
    return n ? ((d.m = 0), (d.d = +n[0]), i + n[0].length) : -1;
  }

  function parseHour24(d, string, i) {
    var n = numberRe.exec(string.slice(i, i + 2));
    return n ? ((d.H = +n[0]), i + n[0].length) : -1;
  }

  function parseMinutes(d, string, i) {
    var n = numberRe.exec(string.slice(i, i + 2));
    return n ? ((d.M = +n[0]), i + n[0].length) : -1;
  }

  function parseSeconds(d, string, i) {
    var n = numberRe.exec(string.slice(i, i + 2));
    return n ? ((d.S = +n[0]), i + n[0].length) : -1;
  }

  function parseMilliseconds(d, string, i) {
    var n = numberRe.exec(string.slice(i, i + 3));
    return n ? ((d.L = +n[0]), i + n[0].length) : -1;
  }

  function parseMicroseconds(d, string, i) {
    var n = numberRe.exec(string.slice(i, i + 6));
    return n ? ((d.L = Math.floor(n[0] / 1000)), i + n[0].length) : -1;
  }

  function parseLiteralPercent(d, string, i) {
    var n = percentRe.exec(string.slice(i, i + 1));
    return n ? i + n[0].length : -1;
  }

  function parseUnixTimestamp(d, string, i) {
    var n = numberRe.exec(string.slice(i));
    return n ? ((d.Q = +n[0]), i + n[0].length) : -1;
  }

  function parseUnixTimestampSeconds(d, string, i) {
    var n = numberRe.exec(string.slice(i));
    return n ? ((d.s = +n[0]), i + n[0].length) : -1;
  }

  function formatDayOfMonth(d, p) {
    return pad(d.getDate(), p, 2);
  }

  function formatHour24(d, p) {
    return pad(d.getHours(), p, 2);
  }

  function formatHour12(d, p) {
    return pad(d.getHours() % 12 || 12, p, 2);
  }

  function formatDayOfYear(d, p) {
    return pad(1 + day.count(year(d), d), p, 3);
  }

  function formatMilliseconds(d, p) {
    return pad(d.getMilliseconds(), p, 3);
  }

  function formatMicroseconds(d, p) {
    return formatMilliseconds(d, p) + "000";
  }

  function formatMonthNumber(d, p) {
    return pad(d.getMonth() + 1, p, 2);
  }

  function formatMinutes(d, p) {
    return pad(d.getMinutes(), p, 2);
  }

  function formatSeconds(d, p) {
    return pad(d.getSeconds(), p, 2);
  }

  function formatWeekdayNumberMonday(d) {
    var day = d.getDay();
    return day === 0 ? 7 : day;
  }

  function formatWeekNumberSunday(d, p) {
    return pad(sunday.count(year(d) - 1, d), p, 2);
  }

  function formatWeekNumberISO(d, p) {
    var day = d.getDay();
    d = day >= 4 || day === 0 ? thursday(d) : thursday.ceil(d);
    return pad(thursday.count(year(d), d) + (year(d).getDay() === 4), p, 2);
  }

  function formatWeekdayNumberSunday(d) {
    return d.getDay();
  }

  function formatWeekNumberMonday(d, p) {
    return pad(monday.count(year(d) - 1, d), p, 2);
  }

  function formatYear(d, p) {
    return pad(d.getFullYear() % 100, p, 2);
  }

  function formatFullYear(d, p) {
    return pad(d.getFullYear() % 10000, p, 4);
  }

  function formatZone(d) {
    var z = d.getTimezoneOffset();
    return (z > 0 ? "-" : ((z *= -1), "+")) + pad((z / 60) | 0, "0", 2) + pad(z % 60, "0", 2);
  }

  function formatUTCDayOfMonth(d, p) {
    return pad(d.getUTCDate(), p, 2);
  }

  function formatUTCHour24(d, p) {
    return pad(d.getUTCHours(), p, 2);
  }

  function formatUTCHour12(d, p) {
    return pad(d.getUTCHours() % 12 || 12, p, 2);
  }

  function formatUTCDayOfYear(d, p) {
    return pad(1 + utcDay.count(utcYear(d), d), p, 3);
  }

  function formatUTCMilliseconds(d, p) {
    return pad(d.getUTCMilliseconds(), p, 3);
  }

  function formatUTCMicroseconds(d, p) {
    return formatUTCMilliseconds(d, p) + "000";
  }

  function formatUTCMonthNumber(d, p) {
    return pad(d.getUTCMonth() + 1, p, 2);
  }

  function formatUTCMinutes(d, p) {
    return pad(d.getUTCMinutes(), p, 2);
  }

  function formatUTCSeconds(d, p) {
    return pad(d.getUTCSeconds(), p, 2);
  }

  function formatUTCWeekdayNumberMonday(d) {
    var dow = d.getUTCDay();
    return dow === 0 ? 7 : dow;
  }

  function formatUTCWeekNumberSunday(d, p) {
    return pad(utcSunday.count(utcYear(d) - 1, d), p, 2);
  }

  function formatUTCWeekNumberISO(d, p) {
    var day = d.getUTCDay();
    d = day >= 4 || day === 0 ? utcThursday(d) : utcThursday.ceil(d);
    return pad(utcThursday.count(utcYear(d), d) + (utcYear(d).getUTCDay() === 4), p, 2);
  }

  function formatUTCWeekdayNumberSunday(d) {
    return d.getUTCDay();
  }

  function formatUTCWeekNumberMonday(d, p) {
    return pad(utcMonday.count(utcYear(d) - 1, d), p, 2);
  }

  function formatUTCYear(d, p) {
    return pad(d.getUTCFullYear() % 100, p, 2);
  }

  function formatUTCFullYear(d, p) {
    return pad(d.getUTCFullYear() % 10000, p, 4);
  }

  function formatUTCZone() {
    return "+0000";
  }

  function formatLiteralPercent() {
    return "%";
  }

  function formatUnixTimestamp(d) {
    return +d;
  }

  function formatUnixTimestampSeconds(d) {
    return Math.floor(+d / 1000);
  }

  var locale$1;
  var timeFormat;
  var timeParse;
  var utcFormat;
  var utcParse;

  defaultLocale$1({
    dateTime: "%x, %X",
    date: "%-m/%-d/%Y",
    time: "%-I:%M:%S %p",
    periods: ["AM", "PM"],
    days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    shortDays: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
    shortMonths: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
  });

  function defaultLocale$1(definition) {
    locale$1 = formatLocale$1(definition);
    timeFormat = locale$1.format;
    timeParse = locale$1.parse;
    utcFormat = locale$1.utcFormat;
    utcParse = locale$1.utcParse;
    return locale$1;
  }

  var isoSpecifier = "%Y-%m-%dT%H:%M:%S.%LZ";

  function formatIsoNative(date) {
    return date.toISOString();
  }

  var formatIso = Date.prototype.toISOString ? formatIsoNative : utcFormat(isoSpecifier);

  function parseIsoNative(string) {
    var date = new Date(string);
    return isNaN(date) ? null : date;
  }

  var parseIso = +new Date("2000-01-01T00:00:00.000Z") ? parseIsoNative : utcParse(isoSpecifier);

  var noop = { value: function () {} };

  function dispatch() {
    for (var i = 0, n = arguments.length, _ = {}, t; i < n; ++i) {
      if (!(t = arguments[i] + "") || t in _ || /[\s.]/.test(t)) throw new Error("illegal type: " + t);
      _[t] = [];
    }
    return new Dispatch(_);
  }

  function Dispatch(_) {
    this._ = _;
  }

  function parseTypenames(typenames, types) {
    return typenames
      .trim()
      .split(/^|\s+/)
      .map(function (t) {
        var name = "",
          i = t.indexOf(".");
        if (i >= 0) (name = t.slice(i + 1)), (t = t.slice(0, i));
        if (t && !types.hasOwnProperty(t)) throw new Error("unknown type: " + t);
        return { type: t, name: name };
      });
  }

  Dispatch.prototype = dispatch.prototype = {
    constructor: Dispatch,
    on: function (typename, callback) {
      var _ = this._,
        T = parseTypenames(typename + "", _),
        t,
        i = -1,
        n = T.length;

      // If no callback was specified, return the callback of the given type and name.
      if (arguments.length < 2) {
        while (++i < n) if ((t = (typename = T[i]).type) && (t = get(_[t], typename.name))) return t;
        return;
      }

      // If a type was specified, set the callback for the given type and name.
      // Otherwise, if a null callback was specified, remove callbacks of the given name.
      if (callback != null && typeof callback !== "function") throw new Error("invalid callback: " + callback);
      while (++i < n) {
        if ((t = (typename = T[i]).type)) _[t] = set(_[t], typename.name, callback);
        else if (callback == null) for (t in _) _[t] = set(_[t], typename.name, null);
      }

      return this;
    },
    copy: function () {
      var copy = {},
        _ = this._;
      for (var t in _) copy[t] = _[t].slice();
      return new Dispatch(copy);
    },
    call: function (type, that) {
      if ((n = arguments.length - 2) > 0) for (var args = new Array(n), i = 0, n, t; i < n; ++i) args[i] = arguments[i + 2];
      if (!this._.hasOwnProperty(type)) throw new Error("unknown type: " + type);
      for (t = this._[type], i = 0, n = t.length; i < n; ++i) t[i].value.apply(that, args);
    },
    apply: function (type, that, args) {
      if (!this._.hasOwnProperty(type)) throw new Error("unknown type: " + type);
      for (var t = this._[type], i = 0, n = t.length; i < n; ++i) t[i].value.apply(that, args);
    },
  };

  function get(type, name) {
    for (var i = 0, n = type.length, c; i < n; ++i) {
      if ((c = type[i]).name === name) {
        return c.value;
      }
    }
  }

  function set(type, name, callback) {
    for (var i = 0, n = type.length; i < n; ++i) {
      if (type[i].name === name) {
        (type[i] = noop), (type = type.slice(0, i).concat(type.slice(i + 1)));
        break;
      }
    }
    if (callback != null) type.push({ name: name, value: callback });
    return type;
  }

  var xhtml = "http://www.w3.org/1999/xhtml";

  var namespaces = {
    svg: "http://www.w3.org/2000/svg",
    xhtml: xhtml,
    xlink: "http://www.w3.org/1999/xlink",
    xml: "http://www.w3.org/XML/1998/namespace",
    xmlns: "http://www.w3.org/2000/xmlns/",
  };

  function namespace(name) {
    var prefix = (name += ""),
      i = prefix.indexOf(":");
    if (i >= 0 && (prefix = name.slice(0, i)) !== "xmlns") name = name.slice(i + 1);
    return namespaces.hasOwnProperty(prefix) ? { space: namespaces[prefix], local: name } : name;
  }

  function creatorInherit(name) {
    return function () {
      var document = this.ownerDocument,
        uri = this.namespaceURI;
      return uri === xhtml && document.documentElement.namespaceURI === xhtml ? document.createElement(name) : document.createElementNS(uri, name);
    };
  }

  function creatorFixed(fullname) {
    return function () {
      return this.ownerDocument.createElementNS(fullname.space, fullname.local);
    };
  }

  function creator(name) {
    var fullname = namespace(name);
    return (fullname.local ? creatorFixed : creatorInherit)(fullname);
  }

  function none() {}

  function selector(selector) {
    return selector == null
      ? none
      : function () {
          return this.querySelector(selector);
        };
  }

  function selection_select(select) {
    if (typeof select !== "function") select = selector(select);

    for (var groups = this._groups, m = groups.length, subgroups = new Array(m), j = 0; j < m; ++j) {
      for (var group = groups[j], n = group.length, subgroup = (subgroups[j] = new Array(n)), node, subnode, i = 0; i < n; ++i) {
        if ((node = group[i]) && (subnode = select.call(node, node.__data__, i, group))) {
          if ("__data__" in node) subnode.__data__ = node.__data__;
          subgroup[i] = subnode;
        }
      }
    }

    return new Selection(subgroups, this._parents);
  }

  function empty() {
    return [];
  }

  function selectorAll(selector) {
    return selector == null
      ? empty
      : function () {
          return this.querySelectorAll(selector);
        };
  }

  function selection_selectAll(select) {
    if (typeof select !== "function") select = selectorAll(select);

    for (var groups = this._groups, m = groups.length, subgroups = [], parents = [], j = 0; j < m; ++j) {
      for (var group = groups[j], n = group.length, node, i = 0; i < n; ++i) {
        if ((node = group[i])) {
          subgroups.push(select.call(node, node.__data__, i, group));
          parents.push(node);
        }
      }
    }

    return new Selection(subgroups, parents);
  }

  function matcher(selector) {
    return function () {
      return this.matches(selector);
    };
  }

  function selection_filter(match) {
    if (typeof match !== "function") match = matcher(match);

    for (var groups = this._groups, m = groups.length, subgroups = new Array(m), j = 0; j < m; ++j) {
      for (var group = groups[j], n = group.length, subgroup = (subgroups[j] = []), node, i = 0; i < n; ++i) {
        if ((node = group[i]) && match.call(node, node.__data__, i, group)) {
          subgroup.push(node);
        }
      }
    }

    return new Selection(subgroups, this._parents);
  }

  function sparse(update) {
    return new Array(update.length);
  }

  function selection_enter() {
    return new Selection(this._enter || this._groups.map(sparse), this._parents);
  }

  function EnterNode(parent, datum) {
    this.ownerDocument = parent.ownerDocument;
    this.namespaceURI = parent.namespaceURI;
    this._next = null;
    this._parent = parent;
    this.__data__ = datum;
  }

  EnterNode.prototype = {
    constructor: EnterNode,
    appendChild: function (child) {
      return this._parent.insertBefore(child, this._next);
    },
    insertBefore: function (child, next) {
      return this._parent.insertBefore(child, next);
    },
    querySelector: function (selector) {
      return this._parent.querySelector(selector);
    },
    querySelectorAll: function (selector) {
      return this._parent.querySelectorAll(selector);
    },
  };

  function constant$2(x) {
    return function () {
      return x;
    };
  }

  var keyPrefix = "$"; // Protect against keys like “__proto__”.

  function bindIndex(parent, group, enter, update, exit, data) {
    var i = 0,
      node,
      groupLength = group.length,
      dataLength = data.length;

    // Put any non-null nodes that fit into update.
    // Put any null nodes into enter.
    // Put any remaining data into enter.
    for (; i < dataLength; ++i) {
      if ((node = group[i])) {
        node.__data__ = data[i];
        update[i] = node;
      } else {
        enter[i] = new EnterNode(parent, data[i]);
      }
    }

    // Put any non-null nodes that don’t fit into exit.
    for (; i < groupLength; ++i) {
      if ((node = group[i])) {
        exit[i] = node;
      }
    }
  }

  function bindKey(parent, group, enter, update, exit, data, key) {
    var i,
      node,
      nodeByKeyValue = {},
      groupLength = group.length,
      dataLength = data.length,
      keyValues = new Array(groupLength),
      keyValue;

    // Compute the key for each node.
    // If multiple nodes have the same key, the duplicates are added to exit.
    for (i = 0; i < groupLength; ++i) {
      if ((node = group[i])) {
        keyValues[i] = keyValue = keyPrefix + key.call(node, node.__data__, i, group);
        if (keyValue in nodeByKeyValue) {
          exit[i] = node;
        } else {
          nodeByKeyValue[keyValue] = node;
        }
      }
    }

    // Compute the key for each datum.
    // If there a node associated with this key, join and add it to update.
    // If there is not (or the key is a duplicate), add it to enter.
    for (i = 0; i < dataLength; ++i) {
      keyValue = keyPrefix + key.call(parent, data[i], i, data);
      if ((node = nodeByKeyValue[keyValue])) {
        update[i] = node;
        node.__data__ = data[i];
        nodeByKeyValue[keyValue] = null;
      } else {
        enter[i] = new EnterNode(parent, data[i]);
      }
    }

    // Add any remaining nodes that were not bound to data to exit.
    for (i = 0; i < groupLength; ++i) {
      if ((node = group[i]) && nodeByKeyValue[keyValues[i]] === node) {
        exit[i] = node;
      }
    }
  }

  function selection_data(value, key) {
    if (!value) {
      (data = new Array(this.size())), (j = -1);
      this.each(function (d) {
        data[++j] = d;
      });
      return data;
    }

    var bind = key ? bindKey : bindIndex,
      parents = this._parents,
      groups = this._groups;

    if (typeof value !== "function") value = constant$2(value);

    for (var m = groups.length, update = new Array(m), enter = new Array(m), exit = new Array(m), j = 0; j < m; ++j) {
      var parent = parents[j],
        group = groups[j],
        groupLength = group.length,
        data = value.call(parent, parent && parent.__data__, j, parents),
        dataLength = data.length,
        enterGroup = (enter[j] = new Array(dataLength)),
        updateGroup = (update[j] = new Array(dataLength)),
        exitGroup = (exit[j] = new Array(groupLength));

      bind(parent, group, enterGroup, updateGroup, exitGroup, data, key);

      // Now connect the enter nodes to their following update node, such that
      // appendChild can insert the materialized enter node before this node,
      // rather than at the end of the parent node.
      for (var i0 = 0, i1 = 0, previous, next; i0 < dataLength; ++i0) {
        if ((previous = enterGroup[i0])) {
          if (i0 >= i1) i1 = i0 + 1;
          while (!(next = updateGroup[i1]) && ++i1 < dataLength);
          previous._next = next || null;
        }
      }
    }

    update = new Selection(update, parents);
    update._enter = enter;
    update._exit = exit;
    return update;
  }

  function selection_exit() {
    return new Selection(this._exit || this._groups.map(sparse), this._parents);
  }

  function selection_join(onenter, onupdate, onexit) {
    var enter = this.enter(),
      update = this,
      exit = this.exit();
    enter = typeof onenter === "function" ? onenter(enter) : enter.append(onenter + "");
    if (onupdate != null) update = onupdate(update);
    if (onexit == null) exit.remove();
    else onexit(exit);
    return enter && update ? enter.merge(update).order() : update;
  }

  function selection_merge(selection) {
    for (
      var groups0 = this._groups,
        groups1 = selection._groups,
        m0 = groups0.length,
        m1 = groups1.length,
        m = Math.min(m0, m1),
        merges = new Array(m0),
        j = 0;
      j < m;
      ++j
    ) {
      for (var group0 = groups0[j], group1 = groups1[j], n = group0.length, merge = (merges[j] = new Array(n)), node, i = 0; i < n; ++i) {
        if ((node = group0[i] || group1[i])) {
          merge[i] = node;
        }
      }
    }

    for (; j < m0; ++j) {
      merges[j] = groups0[j];
    }

    return new Selection(merges, this._parents);
  }

  function selection_order() {
    for (var groups = this._groups, j = -1, m = groups.length; ++j < m; ) {
      for (var group = groups[j], i = group.length - 1, next = group[i], node; --i >= 0; ) {
        if ((node = group[i])) {
          if (next && node.compareDocumentPosition(next) ^ 4) next.parentNode.insertBefore(node, next);
          next = node;
        }
      }
    }

    return this;
  }

  function selection_sort(compare) {
    if (!compare) compare = ascending$1;

    function compareNode(a, b) {
      return a && b ? compare(a.__data__, b.__data__) : !a - !b;
    }

    for (var groups = this._groups, m = groups.length, sortgroups = new Array(m), j = 0; j < m; ++j) {
      for (var group = groups[j], n = group.length, sortgroup = (sortgroups[j] = new Array(n)), node, i = 0; i < n; ++i) {
        if ((node = group[i])) {
          sortgroup[i] = node;
        }
      }
      sortgroup.sort(compareNode);
    }

    return new Selection(sortgroups, this._parents).order();
  }

  function ascending$1(a, b) {
    return a < b ? -1 : a > b ? 1 : a >= b ? 0 : NaN;
  }

  function selection_call() {
    var callback = arguments[0];
    arguments[0] = this;
    callback.apply(null, arguments);
    return this;
  }

  function selection_nodes() {
    var nodes = new Array(this.size()),
      i = -1;
    this.each(function () {
      nodes[++i] = this;
    });
    return nodes;
  }

  function selection_node() {
    for (var groups = this._groups, j = 0, m = groups.length; j < m; ++j) {
      for (var group = groups[j], i = 0, n = group.length; i < n; ++i) {
        var node = group[i];
        if (node) return node;
      }
    }

    return null;
  }

  function selection_size() {
    var size = 0;
    this.each(function () {
      ++size;
    });
    return size;
  }

  function selection_empty() {
    return !this.node();
  }

  function selection_each(callback) {
    for (var groups = this._groups, j = 0, m = groups.length; j < m; ++j) {
      for (var group = groups[j], i = 0, n = group.length, node; i < n; ++i) {
        if ((node = group[i])) callback.call(node, node.__data__, i, group);
      }
    }

    return this;
  }

  function attrRemove(name) {
    return function () {
      this.removeAttribute(name);
    };
  }

  function attrRemoveNS(fullname) {
    return function () {
      this.removeAttributeNS(fullname.space, fullname.local);
    };
  }

  function attrConstant(name, value) {
    return function () {
      this.setAttribute(name, value);
    };
  }

  function attrConstantNS(fullname, value) {
    return function () {
      this.setAttributeNS(fullname.space, fullname.local, value);
    };
  }

  function attrFunction(name, value) {
    return function () {
      var v = value.apply(this, arguments);
      if (v == null) this.removeAttribute(name);
      else this.setAttribute(name, v);
    };
  }

  function attrFunctionNS(fullname, value) {
    return function () {
      var v = value.apply(this, arguments);
      if (v == null) this.removeAttributeNS(fullname.space, fullname.local);
      else this.setAttributeNS(fullname.space, fullname.local, v);
    };
  }

  function selection_attr(name, value) {
    var fullname = namespace(name);

    if (arguments.length < 2) {
      var node = this.node();
      return fullname.local ? node.getAttributeNS(fullname.space, fullname.local) : node.getAttribute(fullname);
    }

    return this.each(
      (value == null
        ? fullname.local
          ? attrRemoveNS
          : attrRemove
        : typeof value === "function"
          ? fullname.local
            ? attrFunctionNS
            : attrFunction
          : fullname.local
            ? attrConstantNS
            : attrConstant)(fullname, value)
    );
  }

  function defaultView(node) {
    return (
      (node.ownerDocument && node.ownerDocument.defaultView) || // node is a Node
      (node.document && node) || // node is a Window
      node.defaultView
    ); // node is a Document
  }

  function styleRemove(name) {
    return function () {
      this.style.removeProperty(name);
    };
  }

  function styleConstant(name, value, priority) {
    return function () {
      this.style.setProperty(name, value, priority);
    };
  }

  function styleFunction(name, value, priority) {
    return function () {
      var v = value.apply(this, arguments);
      if (v == null) this.style.removeProperty(name);
      else this.style.setProperty(name, v, priority);
    };
  }

  function selection_style(name, value, priority) {
    return arguments.length > 1
      ? this.each(
          (value == null ? styleRemove : typeof value === "function" ? styleFunction : styleConstant)(name, value, priority == null ? "" : priority)
        )
      : styleValue(this.node(), name);
  }

  function styleValue(node, name) {
    return node.style.getPropertyValue(name) || defaultView(node).getComputedStyle(node, null).getPropertyValue(name);
  }

  function propertyRemove(name) {
    return function () {
      delete this[name];
    };
  }

  function propertyConstant(name, value) {
    return function () {
      this[name] = value;
    };
  }

  function propertyFunction(name, value) {
    return function () {
      var v = value.apply(this, arguments);
      if (v == null) delete this[name];
      else this[name] = v;
    };
  }

  function selection_property(name, value) {
    return arguments.length > 1
      ? this.each((value == null ? propertyRemove : typeof value === "function" ? propertyFunction : propertyConstant)(name, value))
      : this.node()[name];
  }

  function classArray(string) {
    return string.trim().split(/^|\s+/);
  }

  function classList(node) {
    return node.classList || new ClassList(node);
  }

  function ClassList(node) {
    this._node = node;
    this._names = classArray(node.getAttribute("class") || "");
  }

  ClassList.prototype = {
    add: function (name) {
      var i = this._names.indexOf(name);
      if (i < 0) {
        this._names.push(name);
        this._node.setAttribute("class", this._names.join(" "));
      }
    },
    remove: function (name) {
      var i = this._names.indexOf(name);
      if (i >= 0) {
        this._names.splice(i, 1);
        this._node.setAttribute("class", this._names.join(" "));
      }
    },
    contains: function (name) {
      return this._names.indexOf(name) >= 0;
    },
  };

  function classedAdd(node, names) {
    var list = classList(node),
      i = -1,
      n = names.length;
    while (++i < n) list.add(names[i]);
  }

  function classedRemove(node, names) {
    var list = classList(node),
      i = -1,
      n = names.length;
    while (++i < n) list.remove(names[i]);
  }

  function classedTrue(names) {
    return function () {
      classedAdd(this, names);
    };
  }

  function classedFalse(names) {
    return function () {
      classedRemove(this, names);
    };
  }

  function classedFunction(names, value) {
    return function () {
      (value.apply(this, arguments) ? classedAdd : classedRemove)(this, names);
    };
  }

  function selection_classed(name, value) {
    var names = classArray(name + "");

    if (arguments.length < 2) {
      var list = classList(this.node()),
        i = -1,
        n = names.length;
      while (++i < n) if (!list.contains(names[i])) return false;
      return true;
    }

    return this.each((typeof value === "function" ? classedFunction : value ? classedTrue : classedFalse)(names, value));
  }

  function textRemove() {
    this.textContent = "";
  }

  function textConstant(value) {
    return function () {
      this.textContent = value;
    };
  }

  function textFunction(value) {
    return function () {
      var v = value.apply(this, arguments);
      this.textContent = v == null ? "" : v;
    };
  }

  function selection_text(value) {
    return arguments.length
      ? this.each(value == null ? textRemove : (typeof value === "function" ? textFunction : textConstant)(value))
      : this.node().textContent;
  }

  function htmlRemove() {
    this.innerHTML = "";
  }

  function htmlConstant(value) {
    return function () {
      this.innerHTML = value;
    };
  }

  function htmlFunction(value) {
    return function () {
      var v = value.apply(this, arguments);
      this.innerHTML = v == null ? "" : v;
    };
  }

  function selection_html(value) {
    return arguments.length
      ? this.each(value == null ? htmlRemove : (typeof value === "function" ? htmlFunction : htmlConstant)(value))
      : this.node().innerHTML;
  }

  function raise() {
    if (this.nextSibling) this.parentNode.appendChild(this);
  }

  function selection_raise() {
    return this.each(raise);
  }

  function lower() {
    if (this.previousSibling) this.parentNode.insertBefore(this, this.parentNode.firstChild);
  }

  function selection_lower() {
    return this.each(lower);
  }

  function selection_append(name) {
    var create = typeof name === "function" ? name : creator(name);
    return this.select(function () {
      return this.appendChild(create.apply(this, arguments));
    });
  }

  function constantNull() {
    return null;
  }

  function selection_insert(name, before) {
    var create = typeof name === "function" ? name : creator(name),
      select = before == null ? constantNull : typeof before === "function" ? before : selector(before);
    return this.select(function () {
      return this.insertBefore(create.apply(this, arguments), select.apply(this, arguments) || null);
    });
  }

  function remove() {
    var parent = this.parentNode;
    if (parent) parent.removeChild(this);
  }

  function selection_remove() {
    return this.each(remove);
  }

  function selection_cloneShallow() {
    var clone = this.cloneNode(false),
      parent = this.parentNode;
    return parent ? parent.insertBefore(clone, this.nextSibling) : clone;
  }

  function selection_cloneDeep() {
    var clone = this.cloneNode(true),
      parent = this.parentNode;
    return parent ? parent.insertBefore(clone, this.nextSibling) : clone;
  }

  function selection_clone(deep) {
    return this.select(deep ? selection_cloneDeep : selection_cloneShallow);
  }

  function selection_datum(value) {
    return arguments.length ? this.property("__data__", value) : this.node().__data__;
  }

  var filterEvents = {};

  var event = null;

  if (typeof document !== "undefined") {
    var element = document.documentElement;
    if (!("onmouseenter" in element)) {
      filterEvents = { mouseenter: "mouseover", mouseleave: "mouseout" };
    }
  }

  function filterContextListener(listener, index, group) {
    listener = contextListener(listener, index, group);
    return function (event) {
      var related = event.relatedTarget;
      if (!related || (related !== this && !(related.compareDocumentPosition(this) & 8))) {
        listener.call(this, event);
      }
    };
  }

  function contextListener(listener, index, group) {
    return function (event1) {
      var event0 = event; // Events can be reentrant (e.g., focus).
      event = event1;
      try {
        listener.call(this, this.__data__, index, group);
      } finally {
        event = event0;
      }
    };
  }

  function parseTypenames$1(typenames) {
    return typenames
      .trim()
      .split(/^|\s+/)
      .map(function (t) {
        var name = "",
          i = t.indexOf(".");
        if (i >= 0) (name = t.slice(i + 1)), (t = t.slice(0, i));
        return { type: t, name: name };
      });
  }

  function onRemove(typename) {
    return function () {
      var on = this.__on;
      if (!on) return;
      for (var j = 0, i = -1, m = on.length, o; j < m; ++j) {
        if (((o = on[j]), (!typename.type || o.type === typename.type) && o.name === typename.name)) {
          this.removeEventListener(o.type, o.listener, o.capture);
        } else {
          on[++i] = o;
        }
      }
      if (++i) on.length = i;
      else delete this.__on;
    };
  }

  function onAdd(typename, value, capture) {
    var wrap = filterEvents.hasOwnProperty(typename.type) ? filterContextListener : contextListener;
    return function (d, i, group) {
      var on = this.__on,
        o,
        listener = wrap(value, i, group);
      if (on)
        for (var j = 0, m = on.length; j < m; ++j) {
          if ((o = on[j]).type === typename.type && o.name === typename.name) {
            this.removeEventListener(o.type, o.listener, o.capture);
            this.addEventListener(o.type, (o.listener = listener), (o.capture = capture));
            o.value = value;
            return;
          }
        }
      this.addEventListener(typename.type, listener, capture);
      o = {
        type: typename.type,
        name: typename.name,
        value: value,
        listener: listener,
        capture: capture,
      };
      if (!on) this.__on = [o];
      else on.push(o);
    };
  }

  function selection_on(typename, value, capture) {
    var typenames = parseTypenames$1(typename + ""),
      i,
      n = typenames.length,
      t;

    if (arguments.length < 2) {
      var on = this.node().__on;
      if (on)
        for (var j = 0, m = on.length, o; j < m; ++j) {
          for (i = 0, o = on[j]; i < n; ++i) {
            if ((t = typenames[i]).type === o.type && t.name === o.name) {
              return o.value;
            }
          }
        }
      return;
    }

    on = value ? onAdd : onRemove;
    if (capture == null) capture = false;
    for (i = 0; i < n; ++i) this.each(on(typenames[i], value, capture));
    return this;
  }

  function customEvent(event1, listener, that, args) {
    var event0 = event;
    event1.sourceEvent = event;
    event = event1;
    try {
      return listener.apply(that, args);
    } finally {
      event = event0;
    }
  }

  function dispatchEvent(node, type, params) {
    var window = defaultView(node),
      event = window.CustomEvent;

    if (typeof event === "function") {
      event = new event(type, params);
    } else {
      event = window.document.createEvent("Event");
      if (params) event.initEvent(type, params.bubbles, params.cancelable), (event.detail = params.detail);
      else event.initEvent(type, false, false);
    }

    node.dispatchEvent(event);
  }

  function dispatchConstant(type, params) {
    return function () {
      return dispatchEvent(this, type, params);
    };
  }

  function dispatchFunction(type, params) {
    return function () {
      return dispatchEvent(this, type, params.apply(this, arguments));
    };
  }

  function selection_dispatch(type, params) {
    return this.each((typeof params === "function" ? dispatchFunction : dispatchConstant)(type, params));
  }

  var root = [null];

  function Selection(groups, parents) {
    this._groups = groups;
    this._parents = parents;
  }

  function selection() {
    return new Selection([[document.documentElement]], root);
  }

  Selection.prototype = selection.prototype = {
    constructor: Selection,
    select: selection_select,
    selectAll: selection_selectAll,
    filter: selection_filter,
    data: selection_data,
    enter: selection_enter,
    exit: selection_exit,
    join: selection_join,
    merge: selection_merge,
    order: selection_order,
    sort: selection_sort,
    call: selection_call,
    nodes: selection_nodes,
    node: selection_node,
    size: selection_size,
    empty: selection_empty,
    each: selection_each,
    attr: selection_attr,
    style: selection_style,
    property: selection_property,
    classed: selection_classed,
    text: selection_text,
    html: selection_html,
    raise: selection_raise,
    lower: selection_lower,
    append: selection_append,
    insert: selection_insert,
    remove: selection_remove,
    clone: selection_clone,
    datum: selection_datum,
    on: selection_on,
    dispatch: selection_dispatch,
  };

  function select(selector) {
    return typeof selector === "string"
      ? new Selection([[document.querySelector(selector)]], [document.documentElement])
      : new Selection([[selector]], root);
  }

  function sourceEvent() {
    var current = event,
      source;
    while ((source = current.sourceEvent)) current = source;
    return current;
  }

  function point(node, event) {
    var svg = node.ownerSVGElement || node;

    if (svg.createSVGPoint) {
      var point = svg.createSVGPoint();
      (point.x = event.clientX), (point.y = event.clientY);
      point = point.matrixTransform(node.getScreenCTM().inverse());
      return [point.x, point.y];
    }

    var rect = node.getBoundingClientRect();
    return [event.clientX - rect.left - node.clientLeft, event.clientY - rect.top - node.clientTop];
  }

  function mouse(node) {
    var event = sourceEvent();
    if (event.changedTouches) event = event.changedTouches[0];
    return point(node, event);
  }

  function touch(node, touches, identifier) {
    if (arguments.length < 3) (identifier = touches), (touches = sourceEvent().changedTouches);

    for (var i = 0, n = touches ? touches.length : 0, touch; i < n; ++i) {
      if ((touch = touches[i]).identifier === identifier) {
        return point(node, touch);
      }
    }

    return null;
  }

  function nopropagation() {
    event.stopImmediatePropagation();
  }

  function noevent() {
    event.preventDefault();
    event.stopImmediatePropagation();
  }

  function nodrag(view) {
    var root = view.document.documentElement,
      selection = select(view).on("dragstart.drag", noevent, true);
    if ("onselectstart" in root) {
      selection.on("selectstart.drag", noevent, true);
    } else {
      root.__noselect = root.style.MozUserSelect;
      root.style.MozUserSelect = "none";
    }
  }

  function yesdrag(view, noclick) {
    var root = view.document.documentElement,
      selection = select(view).on("dragstart.drag", null);
    if (noclick) {
      selection.on("click.drag", noevent, true);
      setTimeout(function () {
        selection.on("click.drag", null);
      }, 0);
    }
    if ("onselectstart" in root) {
      selection.on("selectstart.drag", null);
    } else {
      root.style.MozUserSelect = root.__noselect;
      delete root.__noselect;
    }
  }

  function constant$3(x) {
    return function () {
      return x;
    };
  }

  function DragEvent(target, type, subject, id, active, x, y, dx, dy, dispatch) {
    this.target = target;
    this.type = type;
    this.subject = subject;
    this.identifier = id;
    this.active = active;
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this._ = dispatch;
  }

  DragEvent.prototype.on = function () {
    var value = this._.on.apply(this._, arguments);
    return value === this._ ? this : value;
  };

  // Ignore right-click, since that should open the context menu.
  function defaultFilter() {
    return !event.ctrlKey && !event.button;
  }

  function defaultContainer() {
    return this.parentNode;
  }

  function defaultSubject(d) {
    return d == null ? { x: event.x, y: event.y } : d;
  }

  function defaultTouchable() {
    return navigator.maxTouchPoints || "ontouchstart" in this;
  }

  function drag() {
    var filter = defaultFilter,
      container = defaultContainer,
      subject = defaultSubject,
      touchable = defaultTouchable,
      gestures = {},
      listeners = dispatch("start", "drag", "end"),
      active = 0,
      mousedownx,
      mousedowny,
      mousemoving,
      touchending,
      clickDistance2 = 0;

    function drag(selection) {
      selection
        .on("mousedown.drag", mousedowned)
        .filter(touchable)
        .on("touchstart.drag", touchstarted)
        .on("touchmove.drag", touchmoved)
        .on("touchend.drag touchcancel.drag", touchended)
        .style("touch-action", "none")
        .style("-webkit-tap-highlight-color", "rgba(0,0,0,0)");
    }

    function mousedowned() {
      if (touchending || !filter.apply(this, arguments)) return;
      var gesture = beforestart("mouse", container.apply(this, arguments), mouse, this, arguments);
      if (!gesture) return;
      select(event.view).on("mousemove.drag", mousemoved, true).on("mouseup.drag", mouseupped, true);
      nodrag(event.view);
      nopropagation();
      mousemoving = false;
      mousedownx = event.clientX;
      mousedowny = event.clientY;
      gesture("start");
    }

    function mousemoved() {
      noevent();
      if (!mousemoving) {
        var dx = event.clientX - mousedownx,
          dy = event.clientY - mousedowny;
        mousemoving = dx * dx + dy * dy > clickDistance2;
      }
      gestures.mouse("drag");
    }

    function mouseupped() {
      select(event.view).on("mousemove.drag mouseup.drag", null);
      yesdrag(event.view, mousemoving);
      noevent();
      gestures.mouse("end");
    }

    function touchstarted() {
      if (!filter.apply(this, arguments)) return;
      var touches = event.changedTouches,
        c = container.apply(this, arguments),
        n = touches.length,
        i,
        gesture;

      for (i = 0; i < n; ++i) {
        if ((gesture = beforestart(touches[i].identifier, c, touch, this, arguments))) {
          nopropagation();
          gesture("start");
        }
      }
    }

    function touchmoved() {
      var touches = event.changedTouches,
        n = touches.length,
        i,
        gesture;

      for (i = 0; i < n; ++i) {
        if ((gesture = gestures[touches[i].identifier])) {
          noevent();
          gesture("drag");
        }
      }
    }

    function touchended() {
      var touches = event.changedTouches,
        n = touches.length,
        i,
        gesture;

      if (touchending) clearTimeout(touchending);
      touchending = setTimeout(function () {
        touchending = null;
      }, 500); // Ghost clicks are delayed!
      for (i = 0; i < n; ++i) {
        if ((gesture = gestures[touches[i].identifier])) {
          nopropagation();
          gesture("end");
        }
      }
    }

    function beforestart(id, container, point, that, args) {
      var p = point(container, id),
        s,
        dx,
        dy,
        sublisteners = listeners.copy();

      if (
        !customEvent(new DragEvent(drag, "beforestart", s, id, active, p[0], p[1], 0, 0, sublisteners), function () {
          if ((event.subject = s = subject.apply(that, args)) == null) return false;
          dx = s.x - p[0] || 0;
          dy = s.y - p[1] || 0;
          return true;
        })
      )
        return;

      return function gesture(type) {
        var p0 = p,
          n;
        switch (type) {
          case "start":
            (gestures[id] = gesture), (n = active++);
            break;
          case "end":
            delete gestures[id], --active; // nobreak
          case "drag":
            (p = point(container, id)), (n = active);
            break;
        }
        customEvent(
          new DragEvent(drag, type, s, id, n, p[0] + dx, p[1] + dy, p[0] - p0[0], p[1] - p0[1], sublisteners),
          sublisteners.apply,
          sublisteners,
          [type, that, args]
        );
      };
    }

    drag.filter = function (_) {
      return arguments.length ? ((filter = typeof _ === "function" ? _ : constant$3(!!_)), drag) : filter;
    };

    drag.container = function (_) {
      return arguments.length ? ((container = typeof _ === "function" ? _ : constant$3(_)), drag) : container;
    };

    drag.subject = function (_) {
      return arguments.length ? ((subject = typeof _ === "function" ? _ : constant$3(_)), drag) : subject;
    };

    drag.touchable = function (_) {
      return arguments.length ? ((touchable = typeof _ === "function" ? _ : constant$3(!!_)), drag) : touchable;
    };

    drag.on = function () {
      var value = listeners.on.apply(listeners, arguments);
      return value === listeners ? drag : value;
    };

    drag.clickDistance = function (_) {
      return arguments.length ? ((clickDistance2 = (_ = +_) * _), drag) : Math.sqrt(clickDistance2);
    };

    return drag;
  }

  // Copyright 2018 The Distill Template Authors

  const T$a = Template(
    "d-slider",
    `
<style>
  :host {
    position: relative;
    display: inline-block;
  }

  :host(:focus) {
    outline: none;
  }

  .background {
    padding: 9px 0;
    color: white;
    position: relative;
  }

  .track {
    height: 3px;
    width: 100%;
    border-radius: 2px;
    background-color: hsla(0, 0%, 0%, 0.2);
  }

  .track-fill {
    position: absolute;
    top: 9px;
    height: 3px;
    border-radius: 4px;
    background-color: hsl(24, 100%, 50%);
  }

  .knob-container {
    position: absolute;
    top: 10px;
  }

  .knob {
    position: absolute;
    top: -6px;
    left: -6px;
    width: 13px;
    height: 13px;
    background-color: hsl(24, 100%, 50%);
    border-radius: 50%;
    transition-property: transform;
    transition-duration: 0.18s;
    transition-timing-function: ease;
  }
  .mousedown .knob {
    transform: scale(1.5);
  }

  .knob-highlight {
    position: absolute;
    top: -6px;
    left: -6px;
    width: 13px;
    height: 13px;
    background-color: hsla(0, 0%, 0%, 0.1);
    border-radius: 50%;
    transition-property: transform;
    transition-duration: 0.18s;
    transition-timing-function: ease;
  }

  .focus .knob-highlight {
    transform: scale(2);
  }

  .ticks {
    position: absolute;
    top: 16px;
    height: 4px;
    width: 100%;
    z-index: -1;
  }

  .ticks .tick {
    position: absolute;
    height: 100%;
    border-left: 1px solid hsla(0, 0%, 0%, 0.2);
  }

</style>

  <div class='background'>
    <div class='track'></div>
    <div class='track-fill'></div>
    <div class='knob-container'>
      <div class='knob-highlight'></div>
      <div class='knob'></div>
    </div>
    <div class='ticks'></div>
  </div>
`
  );

  // ARIA
  // If the slider has a visible label, it is referenced by aria-labelledby on the slider element. Otherwise, the slider element has a label provided by aria-label.
  // If the slider is vertically oriented, it has aria-orientation set to vertical. The default value of aria-orientation for a slider is horizontal.

  const keyCodes = {
    left: 37,
    up: 38,
    right: 39,
    down: 40,
    pageUp: 33,
    pageDown: 34,
    end: 35,
    home: 36,
  };

  class Slider extends T$a(HTMLElement) {
    connectedCallback() {
      this.connected = true;
      this.setAttribute("role", "slider");
      // Makes the element tab-able.
      if (!this.hasAttribute("tabindex")) {
        this.setAttribute("tabindex", 0);
      }

      // Keeps track of keyboard vs. mouse interactions for focus rings
      this.mouseEvent = false;

      // Handles to shadow DOM elements
      this.knob = this.root.querySelector(".knob-container");
      this.background = this.root.querySelector(".background");
      this.trackFill = this.root.querySelector(".track-fill");
      this.track = this.root.querySelector(".track");

      // Default values for attributes
      this.min = this.min ? this.min : 0;
      this.max = this.max ? this.max : 100;
      this.scale = linear$1().domain([this.min, this.max]).range([0, 1]).clamp(true);

      this.origin = this.origin !== undefined ? this.origin : this.min;
      this.step = this.step ? this.step : 1;
      this.update(this.value ? this.value : 0);

      this.ticks = this.ticks ? this.ticks : false;
      this.renderTicks();

      this.drag = drag()
        .container(this.background)
        .on("start", () => {
          this.mouseEvent = true;
          this.background.classList.add("mousedown");
          this.changeValue = this.value;
          this.dragUpdate();
        })
        .on("drag", () => {
          this.dragUpdate();
        })
        .on("end", () => {
          this.mouseEvent = false;
          this.background.classList.remove("mousedown");
          this.dragUpdate();
          if (this.changeValue !== this.value) this.dispatchChange();
          this.changeValue = this.value;
        });
      this.drag(select(this.background));

      this.addEventListener("focusin", () => {
        if (!this.mouseEvent) {
          this.background.classList.add("focus");
        }
      });
      this.addEventListener("focusout", () => {
        this.background.classList.remove("focus");
      });
      this.addEventListener("keydown", this.onKeyDown);
    }

    static get observedAttributes() {
      return ["min", "max", "value", "step", "ticks", "origin", "tickValues", "tickLabels"];
    }

    attributeChangedCallback(attr, oldValue, newValue) {
      if (isNaN(newValue) || newValue === undefined || newValue === null) return;
      if (attr == "min") {
        this.min = +newValue;
        this.setAttribute("aria-valuemin", this.min);
      }
      if (attr == "max") {
        this.max = +newValue;
        this.setAttribute("aria-valuemax", this.max);
      }
      if (attr == "value") {
        this.update(+newValue);
      }
      if (attr == "origin") {
        this.origin = +newValue;
        // this.update(this.value);
      }
      if (attr == "step") {
        if (newValue > 0) {
          this.step = +newValue;
        }
      }
      if (attr == "ticks") {
        this.ticks = newValue === "" ? true : newValue;
      }
    }

    onKeyDown(event) {
      this.changeValue = this.value;
      let stopPropagation = false;
      switch (event.keyCode) {
        case keyCodes.left:
        case keyCodes.down:
          this.update(this.value - this.step);
          stopPropagation = true;
          break;
        case keyCodes.right:
        case keyCodes.up:
          this.update(this.value + this.step);
          stopPropagation = true;
          break;
        case keyCodes.pageUp:
          this.update(this.value + this.step * 10);
          stopPropagation = true;
          break;

        case keyCodes.pageDown:
          this.update(this.value + this.step * 10);
          stopPropagation = true;
          break;
        case keyCodes.home:
          this.update(this.min);
          stopPropagation = true;
          break;
        case keyCodes.end:
          this.update(this.max);
          stopPropagation = true;
          break;
      }
      if (stopPropagation) {
        this.background.classList.add("focus");
        event.preventDefault();
        event.stopPropagation();
        if (this.changeValue !== this.value) this.dispatchChange();
      }
    }

    validateValueRange(min, max, value) {
      return Math.max(Math.min(max, value), min);
    }

    quantizeValue(value, step) {
      return Math.round(value / step) * step;
    }

    dragUpdate() {
      const bbox = this.background.getBoundingClientRect();
      const x = event.x;
      const width = bbox.width;
      this.update(this.scale.invert(x / width));
    }

    update(value) {
      let v = value;
      if (this.step !== "any") {
        v = this.quantizeValue(value, this.step);
      }
      v = this.validateValueRange(this.min, this.max, v);
      if (this.connected) {
        this.knob.style.left = this.scale(v) * 100 + "%";
        this.trackFill.style.width = this.scale(this.min + Math.abs(v - this.origin)) * 100 + "%";
        this.trackFill.style.left = this.scale(Math.min(v, this.origin)) * 100 + "%";
      }
      if (this.value !== v) {
        this.value = v;
        this.setAttribute("aria-valuenow", this.value);
        this.dispatchInput();
      }
    }

    // Dispatches only on a committed change (basically only on mouseup).
    dispatchChange() {
      const e = new Event("change");
      this.dispatchEvent(e, {});
    }

    // Dispatches on each value change.
    dispatchInput() {
      const e = new Event("input");
      this.dispatchEvent(e, {});
    }

    renderTicks() {
      const ticksContainer = this.root.querySelector(".ticks");
      if (this.ticks !== false) {
        let tickData = [];
        if (this.ticks > 0) {
          tickData = this.scale.ticks(this.ticks);
        } else if (this.step === "any") {
          tickData = this.scale.ticks();
        } else {
          tickData = range(this.min, this.max + 1e-6, this.step);
        }
        tickData.forEach((d) => {
          const tick = document.createElement("div");
          tick.classList.add("tick");
          tick.style.left = this.scale(d) * 100 + "%";
          ticksContainer.appendChild(tick);
        });
      } else {
        ticksContainer.style.display = "none";
      }
    }
  }

  var logo =
    '<svg viewBox="-607 419 64 64">\n  <path d="M-573.4,478.9c-8,0-14.6-6.4-14.6-14.5s14.6-25.9,14.6-40.8c0,14.9,14.6,32.8,14.6,40.8S-565.4,478.9-573.4,478.9z"/>\n</svg>\n';

  const headerTemplate = `
<style>
distill-header {
  position: relative;
  height: 60px;
  background-color: hsl(200, 60%, 15%);
  width: 100%;
  box-sizing: border-box;
  z-index: 2;
  color: rgba(0, 0, 0, 0.8);
  border-bottom: 1px solid rgba(0, 0, 0, 0.08);
  box-shadow: 0 1px 6px rgba(0, 0, 0, 0.05);
}
distill-header .content {
  height: 70px;
  grid-column: page;
}
distill-header a {
  font-size: 16px;
  height: 60px;
  line-height: 60px;
  text-decoration: none;
  color: rgba(255, 255, 255, 0.8);
  padding: 22px 0;
}
distill-header a:hover {
  color: rgba(255, 255, 255, 1);
}
distill-header svg {
  width: 24px;
  position: relative;
  top: 4px;
  margin-right: 2px;
}
@media(min-width: 1080px) {
  distill-header {
    height: 70px;
  }
  distill-header a {
    height: 70px;
    line-height: 70px;
    padding: 28px 0;
  }
  distill-header .logo {
  }
}
distill-header svg path {
  fill: none;
  stroke: rgba(255, 255, 255, 0.8);
  stroke-width: 3px;
}
distill-header .logo {
  font-size: 17px;
  font-weight: 200;
}
distill-header .nav {
  float: right;
  font-weight: 300;
}
distill-header .nav a {
  font-size: 12px;
  margin-left: 24px;
  text-transform: uppercase;
}
</style>
<div class="content">
  <a href="/" class="logo">
    ${logo}
    Distill
  </a>
  <nav class="nav">
    <a href="/about/">About</a>
    <a href="/prize/">Prize</a>
    <a href="/journal/">Submit</a>
  </nav>
</div>
`;

  // Copyright 2018 The Distill Template Authors

  const T$b = Template("distill-header", headerTemplate, false);

  class DistillHeader extends T$b(HTMLElement) {}

  // Copyright 2018 The Distill Template Authors

  const styles$2 = `
<style>
  distill-appendix {
    contain: layout style;
  }

  distill-appendix .citation {
    font-size: 11px;
    line-height: 15px;
    border-left: 1px solid rgba(0, 0, 0, 0.1);
    padding-left: 18px;
    border: 1px solid rgba(0,0,0,0.1);
    background: rgba(0, 0, 0, 0.02);
    padding: 10px 18px;
    border-radius: 3px;
    color: rgba(150, 150, 150, 1);
    overflow: hidden;
    margin-top: -12px;
    white-space: pre-wrap;
    word-wrap: break-word;
  }

  distill-appendix > * {
    grid-column: text;
  }
</style>
`;

  function appendixTemplate(frontMatter) {
    let html = styles$2;

    if (typeof frontMatter.githubUrl !== "undefined") {
      html += `
    <h3 id="updates-and-corrections">Updates and Corrections</h3>
    <p>`;
      if (frontMatter.githubCompareUpdatesUrl) {
        html += `<a href="${frontMatter.githubCompareUpdatesUrl}">View all changes</a> to this article since it was first published.`;
      }
      html += `
    If you see mistakes or want to suggest changes, please <a href="${frontMatter.githubUrl + "/issues/new"}">create an issue on GitHub</a>. </p>
    `;
    }

    const journal = frontMatter.journal;
    if (typeof journal !== "undefined" && journal.title === "Distill") {
      html += `
    <h3 id="reuse">Reuse</h3>
    <p>Diagrams and text are licensed under Creative Commons Attribution <a href="https://creativecommons.org/licenses/by/4.0/">CC-BY 4.0</a> with the <a class="github" href="${frontMatter.githubUrl}">source available on GitHub</a>, unless noted otherwise. The figures that have been reused from other sources don’t fall under this license and can be recognized by a note in their caption: “Figure from …”.</p>
    `;
    }

    if (typeof frontMatter.publishedDate !== "undefined") {
      html += `
    <h3 id="citation">Citation</h3>
    <p>For attribution in academic contexts, please cite this work as</p>
    <pre class="citation short">${frontMatter.concatenatedAuthors}, "${frontMatter.title}", Distill, ${frontMatter.publishedYear}.</pre>
    <p>BibTeX citation</p>
    <pre class="citation long">${serializeFrontmatterToBibtex(frontMatter)}</pre>
    `;
    }

    return html;
  }

  class DistillAppendix extends HTMLElement {
    static get is() {
      return "distill-appendix";
    }

    set frontMatter(frontMatter) {
      this.innerHTML = appendixTemplate(frontMatter);
    }
  }

  const footerTemplate = `
<style>

:host {
  color: rgba(255, 255, 255, 0.5);
  font-weight: 300;
  padding: 2rem 0;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  background-color: hsl(180, 5%, 15%); /*hsl(200, 60%, 15%);*/
  text-align: left;
  contain: content;
}

.footer-container .logo svg {
  width: 24px;
  position: relative;
  top: 4px;
  margin-right: 2px;
}

.footer-container .logo svg path {
  fill: none;
  stroke: rgba(255, 255, 255, 0.8);
  stroke-width: 3px;
}

.footer-container .logo {
  font-size: 17px;
  font-weight: 200;
  color: rgba(255, 255, 255, 0.8);
  text-decoration: none;
  margin-right: 6px;
}

.footer-container {
  grid-column: text;
}

.footer-container .nav {
  font-size: 0.9em;
  margin-top: 1.5em;
}

.footer-container .nav a {
  color: rgba(255, 255, 255, 0.8);
  margin-right: 6px;
  text-decoration: none;
}

</style>

<div class='footer-container'>

  <a href="/" class="logo">
    ${logo}
    Distill
  </a> is dedicated to clear explanations of machine learning

  <div class="nav">
    <a href="https://distill.pub/about/">About</a>
    <a href="https://distill.pub/journal/">Submit</a>
    <a href="https://distill.pub/prize/">Prize</a>
    <a href="https://distill.pub/archive/">Archive</a>
    <a href="https://distill.pub/rss.xml">RSS</a>
    <a href="https://github.com/distillpub">GitHub</a>
    <a href="https://twitter.com/distillpub">Twitter</a>
    &nbsp;&nbsp;&nbsp;&nbsp; ISSN 2476-0757
  </div>

</div>

`;

  // Copyright 2018 The Distill Template Authors

  const T$c = Template("distill-footer", footerTemplate);

  class DistillFooter extends T$c(HTMLElement) {}

  // Copyright 2018 The Distill Template Authors

  let templateIsLoading = false;
  let runlevel = 0;
  const initialize = function () {
    if (window.distill.runlevel < 1) {
      throw new Error("Insufficient Runlevel for Distill Template!");
    }

    /* 1. Flag that we're being loaded */
    if ("distill" in window && window.distill.templateIsLoading) {
      throw new Error("Runlevel 1: Distill Template is getting loaded more than once, aborting!");
    } else {
      window.distill.templateIsLoading = true;
      console.debug("Runlevel 1: Distill Template has started loading.");
    }

    /* 2. Add styles if they weren't added during prerendering */
    makeStyleTag(document);
    console.debug("Runlevel 1: Static Distill styles have been added.");
    console.debug("Runlevel 1->2.");
    window.distill.runlevel += 1;

    /* 3. Register Controller listener functions */
    /* Needs to happen before components to their connected callbacks have a controller to talk to. */
    for (const [functionName, callback] of Object.entries(Controller.listeners)) {
      if (typeof callback === "function") {
        document.addEventListener(functionName, callback);
      } else {
        console.error("Runlevel 2: Controller listeners need to be functions!");
      }
    }
    console.debug("Runlevel 2: We can now listen to controller events.");
    console.debug("Runlevel 2->3.");
    window.distill.runlevel += 1;

    /* 4. Register components */
    const components = [
      Abstract,
      Appendix,
      Article,
      Bibliography,
      Byline,
      Cite,
      CitationList,
      Code,
      Footnote,
      FootnoteList,
      FrontMatter$1,
      HoverBox,
      Title,
      DMath,
      References,
      TOC,
      Figure,
      Slider,
      Interstitial,
    ];

    const distillComponents = [DistillHeader, DistillAppendix, DistillFooter];

    if (window.distill.runlevel < 2) {
      throw new Error("Insufficient Runlevel for adding custom elements!");
    }
    const allComponents = components.concat(distillComponents);
    for (const component of allComponents) {
      console.debug("Runlevel 2: Registering custom element: " + component.is);
      customElements.define(component.is, component);
    }

    console.debug("Runlevel 3: Distill Template finished registering custom elements.");
    console.debug("Runlevel 3->4.");
    window.distill.runlevel += 1;

    // If template was added after DOMContentLoaded we may have missed that event.
    // Controller will check for that case, so trigger the event explicitly:
    if (domContentLoaded()) {
      Controller.listeners.DOMContentLoaded();
    }

    console.debug("Runlevel 4: Distill Template initialisation complete.");
    window.distill.templateIsLoading = false;
    window.distill.templateHasLoaded = true;
  };

  window.distill = { runlevel, initialize, templateIsLoading };

  /* 0. Check browser feature support; synchronously polyfill if needed */
  if (Polyfills.browserSupportsAllFeatures()) {
    console.debug("Runlevel 0: No need for polyfills.");
    console.debug("Runlevel 0->1.");
    window.distill.runlevel += 1;
    window.distill.initialize();
  } else {
    console.debug("Runlevel 0: Distill Template is loading polyfills.");
    Polyfills.load(window.distill.initialize);
  }
});
//# sourceMappingURL=template.v2.js.map
>>>>>>> master
