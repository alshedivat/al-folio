<<<<<<< HEAD
!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?t(exports,require("fs")):"function"==typeof define&&define.amd?define(["exports","fs"],t):t((e=e||self).dl={},e.fs)}(this,function(e,t){"use strict";function n(e,t){e.title=t.title,t.published&&(t.published instanceof Date?e.publishedDate=t.published:t.published.constructor===String&&(e.publishedDate=new Date(t.published))),t.publishedDate&&(t.publishedDate instanceof Date?e.publishedDate=t.publishedDate:t.publishedDate.constructor===String?e.publishedDate=new Date(t.publishedDate):console.error("Don't know what to do with published date: "+t.publishedDate)),e.description=t.description,e.authors=t.authors.map(e=>new te(e)),e.katex=t.katex,e.password=t.password,t.doi&&(e.doi=t.doi)}
// Copyright 2018 The Distill Template Authors
function r(e){for(let t of e.authors){const e=Boolean(t.affiliation),n=Boolean(t.affiliations);if(e)if(n)console.warn(`Author ${t.author} has both old-style ("affiliation" & "affiliationURL") and new style ("affiliations") affiliation information!`);else{let e={name:t.affiliation};t.affiliationURL&&(e.url=t.affiliationURL),t.affiliations=[e]}}return e}function i(e){const t=e.firstElementChild;if(t){if("json"==t.getAttribute("type").split("/")[1]){const e=t.textContent;return r(JSON.parse(e))}console.error("Distill only supports JSON frontmatter tags anymore; no more YAML.")}else console.error("You added a frontmatter tag but did not provide a script tag with front matter data in it. Please take a look at our templates.");return{}}
// Copyright 2018 The Distill Template Authors
function a(e,t){const r=e.querySelector("d-front-matter");r?n(t,i(r)):console.warn("No front matter tag found!")}function o(){throw new Error("Dynamic requires are not currently supported by rollup-plugin-commonjs")}function s(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e["default"]:e}function l(e,t){return e(t={exports:{}},t.exports),t.exports}
// Copyright 2018 The Distill Template Authors
function u(e){return e.replace(/[\t\n ]+/g," ").replace(/{\\["^`.'acu~Hvs]( )?([a-zA-Z])}/g,(e,t,n)=>n).replace(/{\\([a-zA-Z])}/g,(e,t)=>t)}function d(e){const t=new Map,n=re.toJSON(e);for(const e of n){for(const[t,n]of Object.entries(e.entryTags))e.entryTags[t.toLowerCase()]=u(n);e.entryTags.type=e.entryType,t.set(e.citationKey,e.entryTags)}return t}function c(e){return`@article{${e.slug},\n  author = {${e.bibtexAuthors}},\n  title = {${e.title}},\n  journal = {${e.journal.title}},\n  year = {${e.publishedYear}},\n  note = {${e.url}},\n  doi = {${e.doi}}\n}`}
// Copyright 2018 The Distill Template Authors
function h(e){const t=e.firstElementChild;if(t&&"SCRIPT"===t.tagName){if("text/bibtex"==t.type){return d(e.firstElementChild.textContent)}if("text/json"==t.type)return new Map(JSON.parse(t.textContent));console.warn("Unsupported bibliography script tag type: "+t.type)}else console.warn("Bibliography did not have any script tag.")}
// Copyright 2018 The Distill Template Authors
function p(e,n){const r=e.querySelector("d-bibliography");if(!r)return void console.warn("No bibliography tag found!");const i=r.getAttribute("src");if(i){const a=n.inputDirectory+"/"+i,o=d(t.readFileSync(a,"utf-8")),s=e.createElement("script");s.type="text/json",s.textContent=JSON.stringify([...o]),r.appendChild(s),r.removeAttribute("src")}n.bibliography=h(r)}
// Copyright 2018 The Distill Template Authors
function f(e=document){const t=new Set,n=e.querySelectorAll("d-cite");for(const e of n){const n=(e.getAttribute("key")||e.getAttribute("bibtex-key")).split(",").map(e=>e.trim());for(const e of n)t.add(e)}return[...t]}function m(e,t,n,r){if(null==e.author)return"";var i=e.author.split(" and ");let a=i.map(e=>{if(-1!=(e=e.trim()).indexOf(","))var n=e.split(",")[0].trim(),r=e.split(",")[1];else if(-1!=e.indexOf(" "))n=e.split(" ").slice(-1)[0].trim(),r=e.split(" ").slice(0,-1).join(" ");else n=e.trim();var i="";return r!=undefined&&(i=(i=r.trim().split(" ").map(e=>e.trim()[0])).join(".")+"."),t.replace("${F}",r).replace("${L}",n).replace("${I}",i).trim()});if(i.length>1){var o=a.slice(0,i.length-1).join(n);return o+=(r||n)+a[i.length-1]}return a[0]}function g(e){var t=e.journal||e.booktitle||"";if("volume"in e){var n=e.issue||e.number;n=n!=undefined?"("+n+")":"",t+=", Vol "+e.volume+n}return"pages"in e&&(t+=", pp. "+e.pages),""!=t&&(t+=". "),"publisher"in e&&"."!=(t+=e.publisher)[t.length-1]&&(t+="."),t}function v(e){if("url"in e){var t=e.url,n=/arxiv\.org\/abs\/([0-9\.]*)/.exec(t);if(null!=n&&(t=`http://arxiv.org/pdf/${n[1]}.pdf`),".pdf"==t.slice(-4))var r="PDF";else if(".html"==t.slice(-5))r="HTML";return` &ensp;<a href="${t}">[${r||"link"}]</a>`}return""}function b(e,t){return"doi"in e?`${t?"<br>":""} <a href="https://doi.org/${e.doi}" style="text-decoration:inherit;">DOI: ${e.doi}</a>`:""}function y(e){return'<span class="title">'+e.title+"</span> "}function x(e){if(e){var t=y(e);return t+=v(e)+"<br>",e.author&&(t+=m(e,"${L}, ${I}",", "," and "),(e.year||e.date)&&(t+=", ")),e.year||e.date?t+=(e.year||e.date)+". ":t+=". ",t+=g(e),t+=b(e)}return"?"}
// Copyright 2018 The Distill Template Authors
function w(e,t){const n=new Set(t.citations),r=f(e);for(const e of r)n.add(e);t.citations=Array.from(n)}
// Copyright 2018 The Distill Template Authors
function k(e){const t=e.querySelector("head");if(e.querySelector("html").getAttribute("lang")||e.querySelector("html").setAttribute("lang","en"),!e.querySelector("meta[charset]")){const n=e.createElement("meta");n.setAttribute("charset","utf-8"),t.appendChild(n)}if(!e.querySelector("meta[name=viewport]")){const n=e.createElement("meta");n.setAttribute("name","viewport"),n.setAttribute("content","width=device-width, initial-scale=1"),t.appendChild(n)}}
// Copyright 2018 The Distill Template Authors
function M(e){return`\n  <div class="byline grid">\n    <div class="authors-affiliations grid">\n      <h3>Authors</h3>\n      <h3>Affiliations</h3>\n      ${e.authors.map(e=>`\n        <p class="author">\n          ${e.personalURL?`\n            <a class="name" href="${e.personalURL}">${e.name}</a>`:`\n            <span class="name">${e.name}</span>`}\n        </p>\n        <p class="affiliation">\n        ${e.affiliations.map(e=>e.url?`<a class="affiliation" href="${e.url}">${e.name}</a>`:`<span class="affiliation">${e.name}</span>`).join(", ")}\n        </p>\n      `).join("")}\n    </div>\n    <div>\n      <h3>Published</h3>\n      ${e.publishedDate?`\n        <p>${e.publishedMonth} ${e.publishedDay}, ${e.publishedYear}</p> `:"\n        <p><em>Not published yet.</em></p>"}\n    </div>\n  </div>\n`}
// Copyright 2018 The Distill Template Authors
function S(e,t){const n=e.querySelector("d-byline");n&&(n.innerHTML=M(t))}
// Copyright 2018 The Distill Template Authors
function z(e,t){const n=e.body,r=n.querySelector("d-article");if(!r)return void console.warn("No d-article tag found; skipping adding optional components!");let i=e.querySelector("d-byline");i||(t.authors?(i=e.createElement("d-byline"),n.insertBefore(i,r)):console.warn("No authors found in front matter; please add them before submission!"));let a=e.querySelector("d-title");a||(a=e.createElement("d-title"),n.insertBefore(a,i));let o=a.querySelector("h1");o||((o=e.createElement("h1")).textContent=t.title,a.insertBefore(o,a.firstChild));const s="undefined"!=typeof t.password;let l=n.querySelector("d-interstitial");if(s&&!l){const r="undefined"!=typeof window,i=r&&window.location.hostname.includes("localhost");r&&i||((l=e.createElement("d-interstitial")).password=t.password,n.insertBefore(l,n.firstChild))}else!s&&l&&l.parentElement.removeChild(this);let u=e.querySelector("d-appendix");u||(u=e.createElement("d-appendix"),e.body.appendChild(u));let d=e.querySelector("d-footnote-list");d||(d=e.createElement("d-footnote-list"),u.appendChild(d));let c=e.querySelector("d-citation-list");c||(c=e.createElement("d-citation-list"),u.appendChild(c))}
// Copyright 2018 The Distill Template Authors
function A(e,t){let n=!1;const r=e.querySelector("body");if(!r)return void console.warn("No body tag found!");t.katex&&t.katex.delimiters&&(global.document=e,ce(r,t.katex));const i=r.querySelectorAll("d-math");if(i.length>0){n=!0,console.warn(`Prerendering ${i.length} math tags...`);for(const n of i){const r={displayMode:n.hasAttribute("block")},i=Object.assign(r,t.katex),a=ie.renderToString(n.textContent,i),o=e.createElement("span");o.innerHTML=a,n.parentElement.insertBefore(o,n),n.parentElement.removeChild(n)}}if(n){const t='<link rel="stylesheet" href="https://distill.pub/third-party/katex/katex.min.css" crossorigin="anonymous">';e.head.insertAdjacentHTML("beforeend",t)}}function C(e){var t,n=""+e,r=pe.exec(n);if(!r)return n;var i="",a=0,o=0;for(a=r.index;a<n.length;a++){switch(n.charCodeAt(a)){case 34:t="&quot;";break;case 38:t="&amp;";break;case 39:t="&#39;";break;case 60:t="&lt;";break;case 62:t="&gt;";break;default:continue}o!==a&&(i+=n.substring(o,a)),o=a+1,i+=t}return o!==a?i+n.substring(o,a):i}
// Copyright 2018 The Distill Template Authors
function T(e,t){function n(e,t,n){(t||n)&&i(`    <meta name="${e}" content="${fe(t)}" >\n`)}let r=e.querySelector("head"),i=e=>N(r,e);if(i(`\n    <meta http-equiv="X-UA-Compatible" content="IE=Edge,chrome=1">\n    <link rel="icon" type="image/png" href="data:image/png;base64,${he}">\n    <link href="/rss.xml" rel="alternate" type="application/rss+xml" title="Articles from Distill">\n  `),t.title&&i(`\n    <title>${fe(t.title)}</title>\n    `),t.url&&i(`\n    <link rel="canonical" href="${t.url}">\n    `),t.publishedDate&&i(`\n    <!--  https://schema.org/Article -->\n    <meta property="description"       itemprop="description"   content="${fe(t.description)}" />\n    <meta property="article:published" itemprop="datePublished" content="${t.publishedISODateOnly}" />\n    <meta property="article:created"   itemprop="dateCreated"   content="${t.publishedISODateOnly}" />\n    `),t.updatedDate&&i(`\n    <meta property="article:modified"  itemprop="dateModified"  content="${t.updatedDate.toISOString()}" />\n    `),(t.authors||[]).forEach(e=>{N(r,`\n    <meta property="article:author" content="${fe(e.firstName)} ${fe(e.lastName)}" />`)}),i(`\n    <!--  https://developers.facebook.com/docs/sharing/webmasters#markup -->\n    <meta property="og:type" content="article"/>\n    <meta property="og:title" content="${fe(t.title)}"/>\n    <meta property="og:description" content="${fe(t.description)}">\n    <meta property="og:url" content="${t.url}"/>\n    <meta property="og:image" content="${t.previewURL}"/>\n    <meta property="og:locale" content="en_US" />\n    <meta property="og:site_name" content="Distill" />\n  `),i(`\n    <!--  https://dev.twitter.com/cards/types/summary -->\n    <meta name="twitter:card" content="summary_large_image">\n    <meta name="twitter:title" content="${fe(t.title)}">\n    <meta name="twitter:description" content="${fe(t.description)}">\n    <meta name="twitter:url" content="${t.url}">\n    <meta name="twitter:image" content="${t.previewURL}">\n    <meta name="twitter:image:width" content="560">\n    <meta name="twitter:image:height" content="295">\n  `),t.doiSuffix){i("\n      <!--  https://scholar.google.com/intl/en/scholar/inclusion.html#indexing -->\n"),n("citation_title",t.title),n("citation_fulltext_html_url",t.url),n("citation_volume",t.volume),n("citation_issue",t.issue),n("citation_firstpage",t.doiSuffix?`e${t.doiSuffix}`:undefined),n("citation_doi",t.doi);let e=t.journal||{};n("citation_journal_title",e.full_title||e.title),n("citation_journal_abbrev",e.abbrev_title),n("citation_issn",e.issn),n("citation_publisher",e.publisher),n("citation_fulltext_world_readable","",!0),t.publishedDate&&(n("citation_online_date",`${t.publishedYear}/${t.publishedMonthPadded}/${t.publishedDayPadded}`),n("citation_publication_date",`${t.publishedYear}/${t.publishedMonthPadded}/${t.publishedDayPadded}`)),(t.authors||[]).forEach(e=>{n("citation_author",`${e.lastName}, ${e.firstName}`),n("citation_author_institution",e.affiliation)})}else console.warn("No DOI suffix in data; not adding citation meta tags!");t.citations?t.citations.forEach(e=>{if(t.bibliography&&t.bibliography.has(e)){n("citation_reference",E(t.bibliography.get(e)))}else console.warn("No bibliography data found for "+e)}):console.warn("No citations found; not adding any references meta tags!")}function N(e,t){e.innerHTML+=t}function E(e){var t=`citation_title=${e.title};`;e.author&&""!==e.author&&e.author.split(" and ").forEach(e=>{let n,r;-1!=(e=e.trim()).indexOf(",")?(n=e.split(",")[0].trim(),r=e.split(",")[1].trim()):(n=e.split(" ").slice(-1)[0].trim(),r=e.split(" ").slice(0,-1).join(" ")),t+=`citation_author=${r} ${n};`}),"year"in e&&(t+=`citation_publication_date=${e.year};`);let n=/https?:\/\/arxiv\.org\/pdf\/([0-9]*\.[0-9]*)\.pdf/.exec(e.url);return(n=(n=n||/https?:\/\/arxiv\.org\/abs\/([0-9]*\.[0-9]*)/.exec(e.url))||/arXiv preprint arXiv:([0-9]*\.[0-9]*)/.exec(e.journal))&&n[1]?t+=`citation_arxiv_id=${n[1]};`:("journal"in e&&(t+=`citation_journal_title=${fe(e.journal)};`),"volume"in e&&(t+=`citation_volume=${fe(e.volume)};`),("issue"in e||"number"in e)&&(t+=`citation_number=${fe(e.issue||e.number)};`),t)}function R(e){const t="distill-prerendered-styles";if(!e.getElementById(t)){const n=e.createElement("style");n.id=t,n.type="text/css";const r=e.createTextNode(me);n.appendChild(r);const i=e.head.querySelector("script");e.head.insertBefore(n,i)}}
// Copyright 2018 The Distill Template Authors
function L(e,t){let n='\n  <style>\n\n  d-toc {\n    contain: layout style;\n    display: block;\n  }\n\n  d-toc ul {\n    padding-left: 0;\n  }\n\n  d-toc ul > ul {\n    padding-left: 24px;\n  }\n\n  d-toc a {\n    border-bottom: none;\n    text-decoration: none;\n  }\n\n  </style>\n  <nav role="navigation" class="table-of-contents"></nav>\n  <h2>Table of contents</h2>\n  <ul>';for(const e of t){const t="D-TITLE"==e.parentElement.tagName,r=e.getAttribute("no-toc");if(t||r)continue;const i=e.textContent;let a='<li><a href="'+("#"+e.getAttribute("id"))+'">'+i+"</a></li>";"H3"==e.tagName?a="<ul>"+a+"</ul>":a+="<br>",n+=a}n+="</ul></nav>",e.innerHTML=n}
// Copyright 2018 The Distill Template Authors
function O(e){const t=e.querySelector("d-article"),n=e.querySelector("d-toc");if(n){L(n,t.querySelectorAll("h2, h3")),n.setAttribute("prerendered","true")}}
// Copyright 2018 The Distill Template Authors
function q(e){for(var t=e.createTreeWalker(e.body,e.defaultView.NodeFilter.SHOW_TEXT);t.nextNode();){var n=t.currentNode,r=n.nodeValue;r&&_(n)&&(r=D(r=B(r)),n.nodeValue=r)}}function _(e){var t=e.parentElement,n=!!(t&&t.getAttribute&&t.getAttribute("class"))&&(t.getAttribute("class").includes("katex")||t.getAttribute("class").includes("MathJax"));return t&&"SCRIPT"!==t.nodeName&&"STYLE"!==t.nodeName&&"CODE"!==t.nodeName&&"PRE"!==t.nodeName&&"SPAN"!==t.nodeName&&"D-HEADER"!==t.nodeName&&"D-BYLINE"!==t.nodeName&&"D-MATH"!==t.nodeName&&"D-CODE"!==t.nodeName&&"D-BIBLIOGRAPHY"!==t.nodeName&&"D-FOOTER"!==t.nodeName&&"D-APPENDIX"!==t.nodeName&&"D-FRONTMATTER"!==t.nodeName&&"D-TOC"!==t.nodeName&&8!==t.nodeType&&!n}
/*!
   * typeset - Typesetting for the web
   * @version v0.1.6
   * @link https://github.com/davidmerfield/Typeset.js
   * @author David Merfield
   */function D(e){var t="\xa0",n=/([\xab\xbf\xa1]) /g,r=/ ([!?:;.,\u203d\xbb])/g;return e=(e=(e=(e=(e=e.replace(/--/g,"\u2014")).replace(/\s*\u2014\s*/g,"\u2009\u2014\u2009")).replace(/\.\.\./g,"\u2026")).replace(n,"$1"+t)).replace(r,t+"$1")}function B(e){return e=(e=(e=(e=(e=e.replace(/(\W|^)"([^\s!?:;.,\u203d\xbb])/g,"$1\u201c$2").replace(/(\u201c[^"]*)"([^"]*$|[^\u201c"]*\u201c)/g,"$1\u201d$2").replace(/([^0-9])"/g,"$1\u201d").replace(/(\W|^)'(\S)/g,"$1\u2018$2").replace(/([a-z])'([a-z])/gi,"$1\u2019$2").replace(/((\u2018[^']*)|[a-z])'([^0-9]|$)/gi,"$1\u2019$3").replace(/(\u2018)([0-9]{2}[^\u2019]*)(\u2018([^0-9]|$)|$|\u2019[a-z])/gi,"\u2019$2$3").replace(/(\B|^)\u2018(?=([^\u2019]*\u2019\b)*([^\u2019\u2018]*\W[\u2019\u2018]\b|[^\u2019\u2018]*$))/gi,"$1\u2019").replace(/'''/g,"\u2034").replace(/("|'')/g,"\u2033").replace(/'/g,"\u2032")).replace(/\\\u201c/,'"')).replace(/\\\u201d/,'"')).replace(/\\\u2019/,"'")).replace(/\\\u2018/,"'")}
// Copyright 2018 The Distill Template Authors
function I(e){const t=e.querySelector('script[src*="template.v2.js"]');t?t.parentNode.removeChild(t):console.debug("FYI: Did not find template tag when trying to remove it. You may not have added it. Be aware that our polyfills will add it.");const n=e.createElement("script");n.src="https://cdnjs.cloudflare.com/ajax/libs/webcomponentsjs/1.0.17/webcomponents-loader.js",e.head.insertBefore(n,e.head.firstChild);const r=e.createElement("script");r.innerHTML=ge,e.head.insertBefore(r,e.head.firstChild)}
// Copyright 2018 The Distill Template Authors
function H(e,t,n=document){if(t.size>0){e.style.display="";let r=e.querySelector(".references");if(r)r.innerHTML="";else{const t=n.createElement("style");t.innerHTML=ve,e.appendChild(t);const i=n.createElement("h3");i.id="references",i.textContent="References",e.appendChild(i),(r=n.createElement("ol")).id="references-list",r.className="references",e.appendChild(r)}for(const[e,i]of t){const t=n.createElement("li");t.id=e,t.innerHTML=x(i),r.appendChild(t)}}else e.style.display="none"}
// Copyright 2018 The Distill Template Authors
function P(e,t){const n=e.querySelector("d-citation-list");if(n){H(n,new Map(t.citations.map(e=>[e,t.bibliography.get(e)])),e),n.setAttribute("distill-prerendered","true")}}
// Copyright 2018 The Distill Template Authors
function j(e){const t=e.head,n=t.querySelector("meta[http-equiv]");t.insertBefore(n,t.firstChild);const r=t.querySelector("meta[name=viewport]");t.insertBefore(r,t.firstChild);const i=t.querySelector("meta[charset]");t.insertBefore(i,t.firstChild)}
// Copyright 2018 The Distill Template Authors
function F(e){if(!e.querySelector("distill-header")){const t=e.createElement("distill-header");t.innerHTML=ye,t.setAttribute("distill-prerendered","");const n=e.querySelector("body");n.insertBefore(t,n.firstChild)}}
// Copyright 2018 The Distill Template Authors
function $(e){let t=xe;"undefined"!=typeof e.githubUrl&&(t+='\n    <h3 id="updates-and-corrections">Updates and Corrections</h3>\n    <p>',e.githubCompareUpdatesUrl&&(t+=`<a href="${e.githubCompareUpdatesUrl}">View all changes</a> to this article since it was first published.`),t+=`\n    If you see mistakes or want to suggest changes, please <a href="${e.githubUrl+"/issues/new"}">create an issue on GitHub</a>. </p>\n    `);const n=e.journal;return void 0!==n&&"Distill"===n.title&&(t+=`\n    <h3 id="reuse">Reuse</h3>\n    <p>Diagrams and text are licensed under Creative Commons Attribution <a href="https://creativecommons.org/licenses/by/4.0/">CC-BY 4.0</a> with the <a class="github" href="${e.githubUrl}">source available on GitHub</a>, unless noted otherwise. The figures that have been reused from other sources don\u2019t fall under this license and can be recognized by a note in their caption: \u201cFigure from \u2026\u201d.</p>\n    `),"undefined"!=typeof e.publishedDate&&(t+=`\n    <h3 id="citation">Citation</h3>\n    <p>For attribution in academic contexts, please cite this work as</p>\n    <pre class="citation short">${e.concatenatedAuthors}, "${e.title}", Distill, ${e.publishedYear}.</pre>\n    <p>BibTeX citation</p>\n    <pre class="citation long">${c(e)}</pre>\n    `),t}
// Copyright 2018 The Distill Template Authors
function U(e,t){const n=e.querySelector("d-appendix");if(n){if(!n.querySelector("distill-appendix")){const r=e.createElement("distill-appendix");n.appendChild(r),r.innerHTML=$(t)}}else console.warn("No appendix tag found!")}
// Copyright 2018 The Distill Template Authors
function Y(e){if(!e.querySelector("distill-footer")){const t=e.createElement("distill-footer");t.innerHTML=we,e.querySelector("body").appendChild(t)}}
// Copyright 2018 The Distill Template Authors
function V(e,t,n=!0){let r;r=t instanceof ne?t:ne.fromObject(t);for(const[t,i]of ke.entries())n&&console.warn("Running extractor: "+t),i(e,r,n);for(const[t,i]of Me.entries())n&&console.warn("Running transform: "+t),i(e,r,n);e.body.setAttribute("distill-prerendered",""),t instanceof ne||r.assignToObject(t)}function G(e,t,n=!0){for(const[r,i]of Se.entries())n&&console.warn("Running distillify: ",r),i(e,t,n)}function W(e){const t=e.querySelectorAll("script");let n=undefined;for(const e of t){const t=e.src;if(t.includes("template.v1.js"))n=!1;else if(t.includes("template.v2.js"))n=!0;else if(t.includes("template."))throw new Error("Uses distill template, but unknown version?!")}if(n===undefined)throw new Error("Does not seem to use Distill template at all.");return n}t=t&&Object.prototype.hasOwnProperty.call(t,"default")?t["default"]:t;
// Copyright 2018 The Distill Template Authors
const K=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],J=["Jan.","Feb.","March","April","May","June","July","Aug.","Sept.","Oct.","Nov.","Dec."],X=e=>e<10?"0"+e:e,Z=function(e){return`${K[e.getDay()].substring(0,3)}, ${X(e.getDate())} ${J[e.getMonth()].substring(0,3)} ${e.getFullYear().toString()} ${e.getUTCHours().toString()}:${e.getUTCMinutes().toString()}:${e.getUTCSeconds().toString()} Z`},Q=function(e){return Array.from(e).reduce((e,[t,n])=>Object.assign(e,{[t]:n}),{})},ee=function(e){const t=new Map;for(var n in e)e.hasOwnProperty(n)&&t.set(n,e[n]);return t};class te{constructor(e){this.name=e.author,this.personalURL=e.authorURL,this.affiliation=e.affiliation,this.affiliationURL=e.affiliationURL,this.affiliations=e.affiliations||[]}get firstName(){const e=this.name.split(" ");return e.slice(0,e.length-1).join(" ")}get lastName(){const e=this.name.split(" ");return e[e.length-1]}}class ne{constructor(){this.title="unnamed article",this.description="",this.authors=[],this.bibliography=new Map,this.bibliographyParsed=!1,this.citations=[],this.citationsCollected=!1,this.journal={},this.katex={},this.doi=undefined,this.publishedDate=undefined}set url(e){this._url=e}get url(){return this._url?this._url:this.distillPath&&this.journal.url?this.journal.url+"/"+this.distillPath:this.journal.url?this.journal.url:void 0}get githubUrl(){return this.githubPath?"https://github.com/"+this.githubPath:undefined}set previewURL(e){this._previewURL=e}get previewURL(){return this._previewURL?this._previewURL:this.url+"/thumbnail.jpg"}get publishedDateRFC(){return Z(this.publishedDate)}get updatedDateRFC(){return Z(this.updatedDate)}get publishedYear(){return this.publishedDate.getFullYear()}get publishedMonth(){return J[this.publishedDate.getMonth()]}get publishedDay(){return this.publishedDate.getDate()}get publishedMonthPadded(){return X(this.publishedDate.getMonth()+1)}get publishedDayPadded(){return X(this.publishedDate.getDate())}get publishedISODateOnly(){return this.publishedDate.toISOString().split("T")[0]}get volume(){const e=this.publishedYear-2015;if(e<1)throw new Error("Invalid publish date detected during computing volume");return e}get issue(){return this.publishedDate.getMonth()+1}get concatenatedAuthors(){return this.authors.length>2?this.authors[0].lastName+", et al.":2===this.authors.length?this.authors[0].lastName+" & "+this.authors[1].lastName:1===this.authors.length?this.authors[0].lastName:void 0}get bibtexAuthors(){return this.authors.map(e=>e.lastName+", "+e.firstName).join(" and ")}get slug(){let e="";return this.authors.length&&(e+=this.authors[0].lastName.toLowerCase(),e+=this.publishedYear,e+=this.title.split(" ")[0].toLowerCase()),e||"Untitled"}get bibliographyEntries(){return new Map(this.citations.map(e=>{return[e,this.bibliography.get(e)]}))}set bibliography(e){e instanceof Map?this._bibliography=e:"object"==typeof e&&(this._bibliography=ee(e))}get bibliography(){return this._bibliography}static fromObject(e){const t=new ne;return Object.assign(t,e),t}assignToObject(e){Object.assign(e,this),e.bibliography=Q(this.bibliographyEntries),e.url=this.url,e.doi=this.doi,e.githubUrl=this.githubUrl,e.previewURL=this.previewURL,this.publishedDate&&(e.volume=this.volume,e.issue=this.issue,e.publishedDateRFC=this.publishedDateRFC,e.publishedYear=this.publishedYear,e.publishedMonth=this.publishedMonth,e.publishedDay=this.publishedDay,e.publishedMonthPadded=this.publishedMonthPadded,e.publishedDayPadded=this.publishedDayPadded),this.updatedDate&&(e.updatedDateRFC=this.updatedDateRFC),e.concatenatedAuthors=this.concatenatedAuthors,e.bibtexAuthors=this.bibtexAuthors,e.slug=this.slug}}var re=l(function(e,t){!function(e){function t(){this.months=["jan","feb","mar","apr","may","jun","jul","aug","sep","oct","nov","dec"],this.notKey=[",","{","}"," ","="],this.pos=0,this.input="",this.entries=new Array,this.currentEntry="",this.setInput=function(e){this.input=e},this.getEntries=function(){return this.entries},this.isWhitespace=function(e){return" "==e||"\r"==e||"\t"==e||"\n"==e},this.match=function(e,t){if(t!=undefined&&null!=t||(t=!0),this.skipWhitespace(t),this.input.substring(this.pos,this.pos+e.length)!=e)throw"Token mismatch, expected "+e+", found "+this.input.substring(this.pos);this.pos+=e.length,this.skipWhitespace(t)},this.tryMatch=function(e,t){return t!=undefined&&null!=t||(t=!0),this.skipWhitespace(t),this.input.substring(this.pos,this.pos+e.length)==e},this.matchAt=function(){for(;this.input.length>this.pos&&"@"!=this.input[this.pos];)this.pos++;return"@"==this.input[this.pos]},this.skipWhitespace=function(e){for(;this.isWhitespace(this.input[this.pos]);)this.pos++;if("%"==this.input[this.pos]&&1==e){for(;"\n"!=this.input[this.pos];)this.pos++;this.skipWhitespace(e)}},this.value_braces=function(){var e=0;this.match("{",!1);for(var t=this.pos,n=!1;;){if(!n)if("}"==this.input[this.pos]){if(!(e>0)){var r=this.pos;return this.match("}",!1),this.input.substring(t,r)}e--}else if("{"==this.input[this.pos])e++;else if(this.pos>=this.input.length-1)throw"Unterminated value";n="\\"==this.input[this.pos]&&0==n,this.pos++}},this.value_comment=function(){for(var e="",t=0;!this.tryMatch("}",!1)||0!=t;){if(e+=this.input[this.pos],"{"==this.input[this.pos]&&t++,"}"==this.input[this.pos]&&t--,this.pos>=this.input.length-1)throw"Unterminated value:"+this.input.substring(start);this.pos++}return e},this.value_quotes=function(){this.match('"',!1);for(var e=this.pos,t=!1;;){if(!t){if('"'==this.input[this.pos]){var n=this.pos;return this.match('"',!1),this.input.substring(e,n)}if(this.pos>=this.input.length-1)throw"Unterminated value:"+this.input.substring(e)}t="\\"==this.input[this.pos]&&0==t,this.pos++}},this.single_value=function(){var e=this.pos;if(this.tryMatch("{"))return this.value_braces();if(this.tryMatch('"'))return this.value_quotes();var t=this.key();if(t.match("^[0-9]+$"))return t;if(this.months.indexOf(t.toLowerCase())>=0)return t.toLowerCase();throw"Value expected:"+this.input.substring(e)+" for key: "+t},this.value=function(){var e=[];for(e.push(this.single_value());this.tryMatch("#");)this.match("#"),e.push(this.single_value());return e.join("")},this.key=function(){for(var e=this.pos;;){if(this.pos>=this.input.length)throw"Runaway key";if(this.notKey.indexOf(this.input[this.pos])>=0)return this.input.substring(e,this.pos);this.pos++}},this.key_equals_value=function(){var e=this.key();if(this.tryMatch("="))return this.match("="),[e,this.value()];throw"... = value expected, equals sign missing:"+this.input.substring(this.pos)},this.key_value_list=function(){var e=this.key_equals_value();for(this.currentEntry.entryTags={},this.currentEntry.entryTags[e[0]]=e[1];this.tryMatch(",")&&(this.match(","),!this.tryMatch("}"));)e=this.key_equals_value(),this.currentEntry.entryTags[e[0]]=e[1]},this.entry_body=function(e){this.currentEntry={},this.currentEntry.citationKey=this.key(),this.currentEntry.entryType=e.substring(1),this.match(","),this.key_value_list(),this.entries.push(this.currentEntry)},this.directive=function(){return this.match("@"),"@"+this.key()},this.preamble=function(){this.currentEntry={},this.currentEntry.entryType="PREAMBLE",this.currentEntry.entry=this.value_comment(),this.entries.push(this.currentEntry)},this.comment=function(){this.currentEntry={},this.currentEntry.entryType="COMMENT",this.currentEntry.entry=this.value_comment(),this.entries.push(this.currentEntry)},this.entry=function(e){this.entry_body(e)},this.bibtex=function(){for(;this.matchAt();){var e=this.directive();this.match("{"),"@STRING"==e?this.string():"@PREAMBLE"==e?this.preamble():"@COMMENT"==e?this.comment():this.entry(e),this.match("}")}}}e.toJSON=function(e){var n=new t;return n.setInput(e),n.bibtex(),n.entries},e.toBibtex=function(e){var t="";for(var n in e){if(t+="@"+e[n].entryType,t+="{",e[n].citationKey&&(t+=e[n].citationKey+", "),e[n].entry&&(t+=e[n].entry),e[n].entryTags){var r="";for(var i in e[n].entryTags)0!=r.length&&(r+=", "),r+=i+"= {"+e[n].entryTags[i]+"}";t+=r}t+="}\n\n"}return t}}(t)}),ie=s(l(function(e){var t;t=function(){return function e(t,n,r){function i(s,l){if(!n[s]){if(!t[s]){var u="function"==typeof o&&o;if(!l&&u)return u(s,!0);if(a)return a(s,!0);var d=new Error("Cannot find module '"+s+"'");throw d.code="MODULE_NOT_FOUND",d}var c=n[s]={exports:{}};t[s][0].call(c.exports,function(e){var n=t[s][1][e];return i(n||e)},c,c.exports,e,t,n,r)}return n[s].exports}for(var a="function"==typeof o&&o,s=0;s<r.length;s++)i(r[s]);return i}({1:[function(e,t){function n(e){return e&&e.__esModule?e:{"default":e}}var r=n(e("./src/ParseError")),i=n(e("./src/Settings")),a=n(e("./src/buildTree")),o=n(e("./src/parseTree")),s=n(e("./src/utils")),l=function(e,t,n){s["default"].clearNode(t);var r=new i["default"](n),l=(0,o["default"])(e,r),u=(0,a["default"])(l,e,r).toNode();t.appendChild(u)};"undefined"!=typeof document&&"CSS1Compat"!==document.compatMode&&("undefined"!=typeof console&&console.warn("Warning: KaTeX doesn't work in quirks mode. Make sure your website has a suitable doctype."),l=function(){throw new r["default"]("KaTeX doesn't work in quirks mode.")});var u=function(e,t){var n=new i["default"](t),r=(0,o["default"])(e,n);return(0,a["default"])(r,e,n).toMarkup()},d=function(e,t){var n=new i["default"](t);return(0,o["default"])(e,n)};t.exports={render:l,renderToString:u,__parse:d,ParseError:r["default"]}},{"./src/ParseError":29,"./src/Settings":32,"./src/buildTree":37,"./src/parseTree":46,"./src/utils":51}],2:[function(e,t){t.exports={"default":e("core-js/library/fn/json/stringify"),__esModule:!0}},{"core-js/library/fn/json/stringify":6}],3:[function(e,t){t.exports={"default":e("core-js/library/fn/object/define-property"),__esModule:!0}},{"core-js/library/fn/object/define-property":7}],4:[function(e,t,n){n.__esModule=!0,n["default"]=function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}},{}],5:[function(e,t,n){function r(e){return e&&e.__esModule?e:{"default":e}}n.__esModule=!0;var i=r(e("../core-js/object/define-property"));n["default"]=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),(0,i["default"])(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}()},{"../core-js/object/define-property":3}],6:[function(e,t){var n=e("../../modules/_core"),r=n.JSON||(n.JSON={stringify:JSON.stringify});t.exports=function(){return r.stringify.apply(r,arguments)}},{"../../modules/_core":10}],7:[function(e,t){e("../../modules/es6.object.define-property");var n=e("../../modules/_core").Object;t.exports=function(e,t,r){return n.defineProperty(e,t,r)}},{"../../modules/_core":10,"../../modules/es6.object.define-property":23}],8:[function(e,t){t.exports=function(e){if("function"!=typeof e)throw TypeError(e+" is not a function!");return e}},{}],9:[function(e,t){var n=e("./_is-object");t.exports=function(e){if(!n(e))throw TypeError(e+" is not an object!");return e}},{"./_is-object":19}],10:[function(e,t){var n=t.exports={version:"2.4.0"};"number"==typeof __e&&(__e=n)},{}],11:[function(e,t){var n=e("./_a-function");t.exports=function(e,t,r){if(n(e),t===undefined)return e;switch(r){case 1:return function(n){return e.call(t,n)};case 2:return function(n,r){return e.call(t,n,r)};case 3:return function(n,r,i){return e.call(t,n,r,i)}}return function(){return e.apply(t,arguments)}}},{"./_a-function":8}],12:[function(e,t){t.exports=!e("./_fails")(function(){return 7!=Object.defineProperty({},"a",{get:function(){return 7}}).a})},{"./_fails":15}],13:[function(e,t){var n=e("./_is-object"),r=e("./_global").document,i=n(r)&&n(r.createElement);t.exports=function(e){return i?r.createElement(e):{}}},{"./_global":16,"./_is-object":19}],14:[function(e,t){var n=e("./_global"),r=e("./_core"),i=e("./_ctx"),a=e("./_hide"),o="prototype",s=function(e,t,l){var u,d,c,h=e&s.F,p=e&s.G,f=e&s.S,m=e&s.P,g=e&s.B,v=e&s.W,b=p?r:r[t]||(r[t]={}),y=b[o],x=p?n:f?n[t]:(n[t]||{})[o];for(u in p&&(l=t),l)(d=!h&&x&&x[u]!==undefined)&&u in b||(c=d?x[u]:l[u],b[u]=p&&"function"!=typeof x[u]?l[u]:g&&d?i(c,n):v&&x[u]==c?function(e){var t=function(t,n,r){if(this instanceof e){switch(arguments.length){case 0:return new e;case 1:return new e(t);case 2:return new e(t,n)}return new e(t,n,r)}return e.apply(this,arguments)};return t[o]=e[o],t}(c):m&&"function"==typeof c?i(Function.call,c):c,m&&((b.virtual||(b.virtual={}))[u]=c,e&s.R&&y&&!y[u]&&a(y,u,c)))};s.F=1,s.G=2,s.S=4,s.P=8,s.B=16,s.W=32,s.U=64,s.R=128,t.exports=s},{"./_core":10,"./_ctx":11,"./_global":16,"./_hide":17}],15:[function(e,t){t.exports=function(e){try{return!!e()}catch(t){return!0}}},{}],16:[function(e,t){var n=t.exports="undefined"!=typeof window&&window.Math==Math?window:"undefined"!=typeof self&&self.Math==Math?self:Function("return this")();"number"==typeof __g&&(__g=n)},{}],17:[function(e,t){var n=e("./_object-dp"),r=e("./_property-desc");t.exports=e("./_descriptors")?function(e,t,i){return n.f(e,t,r(1,i))}:function(e,t,n){return e[t]=n,e}},{"./_descriptors":12,"./_object-dp":20,"./_property-desc":21}],18:[function(e,t){t.exports=!e("./_descriptors")&&!e("./_fails")(function(){return 7!=Object.defineProperty(e("./_dom-create")("div"),"a",{get:function(){return 7}}).a})},{"./_descriptors":12,"./_dom-create":13,"./_fails":15}],19:[function(e,t){t.exports=function(e){return"object"==typeof e?null!==e:"function"==typeof e}},{}],20:[function(e,t,n){var r=e("./_an-object"),i=e("./_ie8-dom-define"),a=e("./_to-primitive"),o=Object.defineProperty;n.f=e("./_descriptors")?Object.defineProperty:function(e,t,n){if(r(e),t=a(t,!0),r(n),i)try{return o(e,t,n)}catch(s){}if("get"in n||"set"in n)throw TypeError("Accessors not supported!");return"value"in n&&(e[t]=n.value),e}},{"./_an-object":9,"./_descriptors":12,"./_ie8-dom-define":18,"./_to-primitive":22}],21:[function(e,t){t.exports=function(e,t){return{enumerable:!(1&e),configurable:!(2&e),writable:!(4&e),value:t}}},{}],22:[function(e,t){var n=e("./_is-object");t.exports=function(e,t){if(!n(e))return e;var r,i;if(t&&"function"==typeof(r=e.toString)&&!n(i=r.call(e)))return i;if("function"==typeof(r=e.valueOf)&&!n(i=r.call(e)))return i;if(!t&&"function"==typeof(r=e.toString)&&!n(i=r.call(e)))return i;throw TypeError("Can't convert object to primitive value")}},{"./_is-object":19}],23:[function(e){var t=e("./_export");t(t.S+t.F*!e("./_descriptors"),"Object",{defineProperty:e("./_object-dp").f})},{"./_descriptors":12,"./_export":14,"./_object-dp":20}],24:[function(e,t){function n(e){if(!e.__matchAtRelocatable){var t=e.source+"|()",n="g"+(e.ignoreCase?"i":"")+(e.multiline?"m":"")+(e.unicode?"u":"");e.__matchAtRelocatable=new RegExp(t,n)}return e.__matchAtRelocatable}function r(e,t,r){if(e.global||e.sticky)throw new Error("matchAt(...): Only non-global regexes are supported");var i=n(e);i.lastIndex=r;var a=i.exec(t);return null==a[a.length-1]?(a.length=a.length-1,a):null}t.exports=r},{}],25:[function(e,t){function n(e){if(null===e||e===undefined)throw new TypeError("Object.assign cannot be called with null or undefined");return Object(e)}function r(){try{if(!Object.assign)return!1;var e=new String("abc");if(e[5]="de","5"===Object.getOwnPropertyNames(e)[0])return!1;for(var t={},n=0;n<10;n++)t["_"+String.fromCharCode(n)]=n;if("0123456789"!==Object.getOwnPropertyNames(t).map(function(e){return t[e]}).join(""))return!1;var r={};return"abcdefghijklmnopqrst".split("").forEach(function(e){r[e]=e}),"abcdefghijklmnopqrst"===Object.keys(Object.assign({},r)).join("")}catch(i){return!1}}var i=Object.prototype.hasOwnProperty,a=Object.prototype.propertyIsEnumerable;t.exports=r()?Object.assign:function(e){for(var t,r,o=n(e),s=1;s<arguments.length;s++){for(var l in t=Object(arguments[s]))i.call(t,l)&&(o[l]=t[l]);if(Object.getOwnPropertySymbols){r=Object.getOwnPropertySymbols(t);for(var u=0;u<r.length;u++)a.call(t,r[u])&&(o[r[u]]=t[r[u]])}}return o}},{}],26:[function(e,t){function n(e){return e&&e.__esModule?e:{"default":e}}var r=n(e("babel-runtime/helpers/classCallCheck")),i=n(e("babel-runtime/helpers/createClass")),a=n(e("match-at")),o=n(e("./ParseError")),s=function(){function e(t,n,i,a){(0,r["default"])(this,e),this.text=t,this.start=n,this.end=i,this.lexer=a}return(0,i["default"])(e,[{key:"range",value:function(t,n){return t.lexer!==this.lexer?new e(n):new e(n,this.start,t.end,this.lexer)}}]),e}(),l=new RegExp("([ \r\n\t]+)|([!-\\[\\]-\u2027\u202a-\ud7ff\uf900-\uffff]|[\ud800-\udbff][\udc00-\udfff]|\\\\(?:[a-zA-Z]+|[^\ud800-\udfff]))"),u=function(){function e(t){(0,r["default"])(this,e),this.input=t,this.pos=0}return(0,i["default"])(e,[{key:"lex",value:function(){var e=this.input,t=this.pos;if(t===e.length)return new s("EOF",t,t,this);var n=(0,a["default"])(l,e,t);if(null===n)throw new o["default"]("Unexpected character: '"+e[t]+"'",new s(e[t],t,t+1,this));var r=n[2]||" ",i=this.pos;this.pos+=n[0].length;var u=this.pos;return new s(r,i,u,this)}}]),e}();t.exports=u},{"./ParseError":29,"babel-runtime/helpers/classCallCheck":4,"babel-runtime/helpers/createClass":5,"match-at":24}],27:[function(e,t){function n(e){return e&&e.__esModule?e:{"default":e}}var r=n(e("babel-runtime/helpers/classCallCheck")),i=n(e("babel-runtime/helpers/createClass")),a=n(e("./Lexer")),o=n(e("./macros")),s=n(e("./ParseError")),l=n(e("object-assign")),u=function(){function e(t,n){(0,r["default"])(this,e),this.lexer=new a["default"](t),this.macros=(0,l["default"])({},o["default"],n),this.stack=[],this.discardedWhiteSpace=[]}return(0,i["default"])(e,[{key:"nextToken",value:function(){for(;;){0===this.stack.length&&this.stack.push(this.lexer.lex());var e=this.stack.pop(),t=e.text;if("\\"!==t.charAt(0)||!this.macros.hasOwnProperty(t))return e;var n=void 0,r=this.macros[t];if("string"==typeof r){var i=0;if(-1!==r.indexOf("#"))for(var o=r.replace(/##/g,"");-1!==o.indexOf("#"+(i+1));)++i;var l=new a["default"](r);for(r=[],n=l.lex();"EOF"!==n.text;)r.push(n),n=l.lex();r.reverse(),r.numArgs=i,this.macros[t]=r}if(r.numArgs){var u=[],d=void 0;for(d=0;d<r.numArgs;++d){var c=this.get(!0);if("{"===c.text){for(var h=[],p=1;0!==p;)if(n=this.get(!1),h.push(n),"{"===n.text)++p;else if("}"===n.text)--p;else if("EOF"===n.text)throw new s["default"]("End of input in macro argument",c);h.pop(),h.reverse(),u[d]=h}else{if("EOF"===c.text)throw new s["default"]("End of input expecting macro argument",e);u[d]=[c]}}for(d=(r=r.slice()).length-1;d>=0;--d)if("#"===(n=r[d]).text){if(0===d)throw new s["default"]("Incomplete placeholder at end of macro body",n);if("#"===(n=r[--d]).text)r.splice(d+1,1);else{if(!/^[1-9]$/.test(n.text))throw new s["default"]("Not a valid argument number",n);r.splice.apply(r,[d,2].concat(u[n.text-1]))}}}this.stack=this.stack.concat(r)}}},{key:"get",value:function(e){this.discardedWhiteSpace=[];var t=this.nextToken();if(e)for(;" "===t.text;)this.discardedWhiteSpace.push(t),t=this.nextToken();return t}},{key:"unget",value:function(e){for(this.stack.push(e);0!==this.discardedWhiteSpace.length;)this.stack.push(this.discardedWhiteSpace.pop())}}]),e}();t.exports=u},{"./Lexer":26,"./ParseError":29,"./macros":44,"babel-runtime/helpers/classCallCheck":4,"babel-runtime/helpers/createClass":5,"object-assign":25}],28:[function(e,t){function n(e){return e&&e.__esModule?e:{"default":e}}var r=n(e("babel-runtime/helpers/classCallCheck")),i=n(e("babel-runtime/helpers/createClass")),a=n(e("./fontMetrics")),o=6,s=[[1,1,1],[2,1,1],[3,1,1],[4,2,1],[5,2,1],[6,3,1],[7,4,2],[8,6,3],[9,7,6],[10,8,7],[11,10,9]],l=[.5,.6,.7,.8,.9,1,1.2,1.44,1.728,2.074,2.488],u=function(e,t){return t.size<2?e:s[e-1][t.size-1]},d=function(){function e(t){(0,r["default"])(this,e),this.style=t.style,this.color=t.color,this.size=t.size||o,this.textSize=t.textSize||this.size,this.phantom=t.phantom,this.font=t.font,this.sizeMultiplier=l[this.size-1],this._fontMetrics=null}return(0,i["default"])(e,[{key:"extend",value:function(t){var n={style:this.style,size:this.size,textSize:this.textSize,color:this.color,phantom:this.phantom,font:this.font};for(var r in t)t.hasOwnProperty(r)&&(n[r]=t[r]);return new e(n)}},{key:"havingStyle",value:function(e){return this.style===e?this:this.extend({style:e,size:u(this.textSize,e)})}},{key:"havingCrampedStyle",value:function(){return this.havingStyle(this.style.cramp())}},{key:"havingSize",value:function(e){return this.size===e&&this.textSize===e?this:this.extend({style:this.style.text(),size:e,textSize:e})}},{key:"havingBaseStyle",value:function(e){e=e||this.style.text();var t=u(o,e);return this.size===t&&this.textSize===o&&this.style===e?this:this.extend({style:e,size:t,baseSize:o})}},{key:"withColor",value:function(e){return this.extend({color:e})}},{key:"withPhantom",value:function(){return this.extend({phantom:!0})}},{key:"withFont",value:function(e){return this.extend({font:e||this.font})}},{key:"sizingClasses",value:function(e){return e.size!==this.size?["sizing","reset-size"+e.size,"size"+this.size]:[]}},{key:"baseSizingClasses",value:function(){return this.size!==o?["sizing","reset-size"+this.size,"size"+o]:[]}},{key:"fontMetrics",value:function(){return this._fontMetrics||(this._fontMetrics=a["default"].getFontMetrics(this.size)),this._fontMetrics}},{key:"getColor",value:function(){return this.phantom?"transparent":e.colorMap[this.color]||this.color}}]),e}();d.colorMap={"katex-blue":"#6495ed","katex-orange":"#ffa500","katex-pink":"#ff00af","katex-red":"#df0030","katex-green":"#28ae7b","katex-gray":"gray","katex-purple":"#9d38bd","katex-blueA":"#ccfaff","katex-blueB":"#80f6ff","katex-blueC":"#63d9ea","katex-blueD":"#11accd","katex-blueE":"#0c7f99","katex-tealA":"#94fff5","katex-tealB":"#26edd5","katex-tealC":"#01d1c1","katex-tealD":"#01a995","katex-tealE":"#208170","katex-greenA":"#b6ffb0","katex-greenB":"#8af281","katex-greenC":"#74cf70","katex-greenD":"#1fab54","katex-greenE":"#0d923f","katex-goldA":"#ffd0a9","katex-goldB":"#ffbb71","katex-goldC":"#ff9c39","katex-goldD":"#e07d10","katex-goldE":"#a75a05","katex-redA":"#fca9a9","katex-redB":"#ff8482","katex-redC":"#f9685d","katex-redD":"#e84d39","katex-redE":"#bc2612","katex-maroonA":"#ffbde0","katex-maroonB":"#ff92c6","katex-maroonC":"#ed5fa6","katex-maroonD":"#ca337c","katex-maroonE":"#9e034e","katex-purpleA":"#ddd7ff","katex-purpleB":"#c6b9fc","katex-purpleC":"#aa87ff","katex-purpleD":"#7854ab","katex-purpleE":"#543b78","katex-mintA":"#f5f9e8","katex-mintB":"#edf2df","katex-mintC":"#e0e5cc","katex-grayA":"#f6f7f7","katex-grayB":"#f0f1f2","katex-grayC":"#e3e5e6","katex-grayD":"#d6d8da","katex-grayE":"#babec2","katex-grayF":"#888d93","katex-grayG":"#626569","katex-grayH":"#3b3e40","katex-grayI":"#21242c","katex-kaBlue":"#314453","katex-kaGreen":"#71B307"},d.BASESIZE=o,t.exports=d},{"./fontMetrics":41,"babel-runtime/helpers/classCallCheck":4,"babel-runtime/helpers/createClass":5}],29:[function(e,t){function n(e){return e&&e.__esModule?e:{"default":e}}var r=n(e("babel-runtime/helpers/classCallCheck")),i=function a(e,t){(0,r["default"])(this,a);var n="KaTeX parse error: "+e,i=void 0,o=void 0;if(t&&t.lexer&&t.start<=t.end){var s=t.lexer.input;i=t.start,o=t.end,i===s.length?n+=" at end of input: ":n+=" at position "+(i+1)+": ";var l=s.slice(i,o).replace(/[^]/g,"$&\u0332");n+=(i>15?"\u2026"+s.slice(i-15,i):s.slice(0,i))+l+(o+15<s.length?s.slice(o,o+15)+"\u2026":s.slice(o))}var u=new Error(n);return u.name="ParseError",u.__proto__=a.prototype,u.position=i,u};i.prototype.__proto__=Error.prototype,t.exports=i},{"babel-runtime/helpers/classCallCheck":4}],30:[function(e,t,n){function r(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(n,"__esModule",{value:!0});var i=r(e("babel-runtime/helpers/classCallCheck")),a=function o(e,t,n,r,a){(0,i["default"])(this,o),this.type=e,this.value=t,this.mode=n,!r||a&&a.lexer!==r.lexer||(this.lexer=r.lexer,this.start=r.start,this.end=(a||r).end)};n["default"]=a},{"babel-runtime/helpers/classCallCheck":4}],31:[function(e,t){function n(e){return e&&e.__esModule?e:{"default":e}}function r(e,t,n){this.result=e,this.isFunction=t,this.token=n}var i=n(e("babel-runtime/helpers/classCallCheck")),a=n(e("babel-runtime/helpers/createClass")),o=n(e("./functions")),s=n(e("./environments")),l=n(e("./MacroExpander")),u=n(e("./symbols")),d=n(e("./utils")),c=n(e("./units")),h=e("./unicodeRegexes"),p=n(e("./ParseNode")),f=n(e("./ParseError")),m=function(){function e(t,n){(0,i["default"])(this,e),this.gullet=new l["default"](t,n.macros),n.colorIsTextColor&&(this.gullet.macros["\\color"]="\\textcolor"),this.settings=n,this.leftrightDepth=0}return(0,a["default"])(e,[{key:"expect",value:function(e,t){if(this.nextToken.text!==e)throw new f["default"]("Expected '"+e+"', got '"+this.nextToken.text+"'",this.nextToken);!1!==t&&this.consume()}},{key:"consume",value:function(){this.nextToken=this.gullet.get("math"===this.mode)}},{key:"switchMode",value:function(e){this.gullet.unget(this.nextToken),this.mode=e,this.consume()}},{key:"parse",value:function(){this.mode="math",this.consume();var e=this.parseInput();return e}},{key:"parseInput",value:function(){var e=this.parseExpression(!1);return this.expect("EOF",!1),e}},{key:"parseExpression",value:function(t,n){for(var r=[];;){var i=this.nextToken;if(-1!==e.endOfExpression.indexOf(i.text))break;if(n&&i.text===n)break;if(t&&o["default"][i.text]&&o["default"][i.text].infix)break;var a=this.parseAtom();if(!a){if(!this.settings.throwOnError&&"\\"===i.text[0]){var s=this.handleUnsupportedCmd();r.push(s);continue}break}r.push(a)}return this.handleInfixNodes(r)}},{key:"handleInfixNodes",value:function(e){for(var t=-1,n=void 0,r=0;r<e.length;r++){var i=e[r];if("infix"===i.type){if(-1!==t)throw new f["default"]("only one infix operator per group",i.value.token);t=r,n=i.value.replaceWith}}if(-1!==t){var a=void 0,o=void 0,s=e.slice(0,t),l=e.slice(t+1);a=1===s.length&&"ordgroup"===s[0].type?s[0]:new p["default"]("ordgroup",s,this.mode),o=1===l.length&&"ordgroup"===l[0].type?l[0]:new p["default"]("ordgroup",l,this.mode);var u=this.callFunction(n,[a,o],null);return[new p["default"](u.type,u,this.mode)]}return e}},{key:"handleSupSubscript",value:function(t){var n=this.nextToken,r=n.text;this.consume();var i=this.parseGroup();if(i){if(i.isFunction){if(o["default"][i.result].greediness>e.SUPSUB_GREEDINESS)return this.parseFunction(i);throw new f["default"]("Got function '"+i.result+"' with no arguments as "+t,n)}return i.result}if(this.settings.throwOnError||"\\"!==this.nextToken.text[0])throw new f["default"]("Expected group after '"+r+"'",n);return this.handleUnsupportedCmd()}},{key:"handleUnsupportedCmd",value:function(){for(var e=this.nextToken.text,t=[],n=0;n<e.length;n++)t.push(new p["default"]("textord",e[n],"text"));var r=new p["default"]("text",{body:t,type:"text"},this.mode),i=new p["default"]("color",{color:this.settings.errorColor,value:[r],type:"color"},this.mode);return this.consume(),i}},{key:"parseAtom",value:function(){var e=this.parseImplicitGroup();if("text"===this.mode)return e;for(var t=void 0,n=void 0;;){var r=this.nextToken;if("\\limits"===r.text||"\\nolimits"===r.text){if(!e||"op"!==e.type)throw new f["default"]("Limit controls must follow a math operator",r);var i="\\limits"===r.text;e.value.limits=i,e.value.alwaysHandleSupSub=!0,this.consume()}else if("^"===r.text){if(t)throw new f["default"]("Double superscript",r);t=this.handleSupSubscript("superscript")}else if("_"===r.text){if(n)throw new f["default"]("Double subscript",r);n=this.handleSupSubscript("subscript")}else{if("'"!==r.text)break;if(t)throw new f["default"]("Double superscript",r);var a=new p["default"]("textord","\\prime",this.mode),o=[a];for(this.consume();"'"===this.nextToken.text;)o.push(a),this.consume();"^"===this.nextToken.text&&o.push(this.handleSupSubscript("superscript")),t=new p["default"]("ordgroup",o,this.mode)}}return t||n?new p["default"]("supsub",{base:e,sup:t,sub:n},this.mode):e}},{key:"parseImplicitGroup",value:function(){var t=this.parseSymbol();if(null==t)return this.parseFunction();var n=t.result;if("\\left"===n){var r=this.parseFunction(t);++this.leftrightDepth;var i=this.parseExpression(!1);--this.leftrightDepth,this.expect("\\right",!1);var a=this.parseFunction();return new p["default"]("leftright",{body:i,left:r.value.value,right:a.value.value},this.mode)}if("\\begin"===n){var o=this.parseFunction(t),l=o.value.name;if(!s["default"].hasOwnProperty(l))throw new f["default"]("No such environment: "+l,o.value.nameGroup);var u=s["default"][l],c=this.parseArguments("\\begin{"+l+"}",u),h={mode:this.mode,envName:l,parser:this,positions:c.pop()},m=u.handler(h,c);this.expect("\\end",!1);var g=this.nextToken,v=this.parseFunction();if(v.value.name!==l)throw new f["default"]("Mismatch: \\begin{"+l+"} matched by \\end{"+v.value.name+"}",g);return m.position=v.position,m}if(d["default"].contains(e.sizeFuncs,n)){this.consumeSpaces();var b=this.parseExpression(!1);return new p["default"]("sizing",{size:d["default"].indexOf(e.sizeFuncs,n)+1,value:b},this.mode)}if(d["default"].contains(e.styleFuncs,n)){this.consumeSpaces();var y=this.parseExpression(!0);return new p["default"]("styling",{style:n.slice(1,n.length-5),value:y},this.mode)}if(n in e.oldFontFuncs){var x=e.oldFontFuncs[n];this.consumeSpaces();var w=this.parseExpression(!0);return"text"===x.slice(0,4)?new p["default"]("text",{style:x,body:new p["default"]("ordgroup",w,this.mode)},this.mode):new p["default"]("font",{font:x,body:new p["default"]("ordgroup",w,this.mode)},this.mode)}if("\\color"===n){var k=this.parseColorGroup(!1);if(!k)throw new f["default"]("\\color not followed by color");var M=this.parseExpression(!0);return new p["default"]("color",{type:"color",color:k.result.value,value:M},this.mode)}if("$"===n){if("math"===this.mode)throw new f["default"]("$ within math mode");this.consume();var S=this.mode;this.switchMode("math");var z=this.parseExpression(!1,"$");return this.expect("$",!0),this.switchMode(S),new p["default"]("styling",{style:"text",value:z},"math")}return this.parseFunction(t)}},{key:"parseFunction",value:function(e){if(e||(e=this.parseGroup()),e){if(e.isFunction){var t=e.result,n=o["default"][t];if("text"===this.mode&&!n.allowedInText)throw new f["default"]("Can't use function '"+t+"' in text mode",e.token);if("math"===this.mode&&!1===n.allowedInMath)throw new f["default"]("Can't use function '"+t+"' in math mode",e.token);var r=this.parseArguments(t,n),i=e.token,a=this.callFunction(t,r,r.pop(),i);return new p["default"](a.type,a,this.mode)}return e.result}return null}},{key:"callFunction",value:function(e,t,n,r){var i={funcName:e,parser:this,positions:n,token:r};return o["default"][e].handler(i,t)}},{key:"parseArguments",value:function(e,t){var n=t.numArgs+t.numOptionalArgs;if(0===n)return[[this.pos]];for(var i=t.greediness,a=[this.pos],s=[],l=0;l<n;l++){var u=this.nextToken,d=t.argTypes&&t.argTypes[l],c=void 0;if(l<t.numOptionalArgs){if(!(c=d?this.parseGroupOfType(d,!0):this.parseGroup(!0))){s.push(null),a.push(this.pos);continue}}else if(!(c=d?this.parseGroupOfType(d):this.parseGroup())){if(this.settings.throwOnError||"\\"!==this.nextToken.text[0])throw new f["default"]("Expected group after '"+e+"'",u);c=new r(this.handleUnsupportedCmd(this.nextToken.text),!1)}var h=void 0;if(c.isFunction){if(!(o["default"][c.result].greediness>i))throw new f["default"]("Got function '"+c.result+"' as argument to '"+e+"'",u);h=this.parseFunction(c)}else h=c.result;s.push(h),a.push(this.pos)}return s.push(a),s}},{key:"parseGroupOfType",value:function(e,t){var n=this.mode;if("original"===e&&(e=n),"color"===e)return this.parseColorGroup(t);if("size"===e)return this.parseSizeGroup(t);this.switchMode(e),"text"===e&&this.consumeSpaces();var r=this.parseGroup(t);return this.switchMode(n),r}},{key:"consumeSpaces",value:function(){for(;" "===this.nextToken.text;)this.consume()}},{key:"parseStringGroup",value:function(e,t){if(t&&"["!==this.nextToken.text)return null;var n=this.mode;this.mode="text",this.expect(t?"[":"{");for(var r="",i=this.nextToken,a=i;this.nextToken.text!==(t?"]":"}");){if("EOF"===this.nextToken.text)throw new f["default"]("Unexpected end of input in "+e,i.range(this.nextToken,r));r+=(a=this.nextToken).text,this.consume()}return this.mode=n,this.expect(t?"]":"}"),i.range(a,r)}},{key:"parseRegexGroup",value:function(e,t){var n=this.mode;this.mode="text";for(var r=this.nextToken,i=r,a="";"EOF"!==this.nextToken.text&&e.test(a+this.nextToken.text);)a+=(i=this.nextToken).text,this.consume();if(""===a)throw new f["default"]("Invalid "+t+": '"+r.text+"'",r);return this.mode=n,r.range(i,a)}},{key:"parseColorGroup",value:function(e){var t=this.parseStringGroup("color",e);if(!t)return null;var n=/^(#[a-z0-9]+|[a-z]+)$/i.exec(t.text);if(!n)throw new f["default"]("Invalid color: '"+t.text+"'",t)
;return new r(new p["default"]("color",n[0],this.mode),!1)}},{key:"parseSizeGroup",value:function(e){var t=void 0;if(!(t=e||"{"===this.nextToken.text?this.parseStringGroup("size",e):this.parseRegexGroup(/^[-+]? *(?:$|\d+|\d+\.\d*|\.\d*) *[a-z]{0,2} *$/,"size")))return null;var n=/([-+]?) *(\d+(?:\.\d*)?|\.\d+) *([a-z]{2})/.exec(t.text);if(!n)throw new f["default"]("Invalid size: '"+t.text+"'",t);var i={number:+(n[1]+n[2]),unit:n[3]};if(!c["default"].validUnit(i))throw new f["default"]("Invalid unit: '"+i.unit+"'",t);return new r(new p["default"]("size",i,this.mode),!1)}},{key:"parseGroup",value:function(e){var t=this.nextToken;if(this.nextToken.text===(e?"[":"{")){this.consume();var n=this.parseExpression(!1,e?"]":null),i=this.nextToken;return this.expect(e?"]":"}"),"text"===this.mode&&this.formLigatures(n),new r(new p["default"]("ordgroup",n,this.mode,t,i),!1)}return e?null:this.parseSymbol()}},{key:"formLigatures",value:function(e){for(var t=e.length-1,n=0;n<t;++n){var r=e[n],i=r.value;"-"===i&&"-"===e[n+1].value&&(n+1<t&&"-"===e[n+2].value?(e.splice(n,3,new p["default"]("textord","---","text",r,e[n+2])),t-=2):(e.splice(n,2,new p["default"]("textord","--","text",r,e[n+1])),t-=1)),"'"!==i&&"`"!==i||e[n+1].value!==i||(e.splice(n,2,new p["default"]("textord",i+i,"text",r,e[n+1])),t-=1)}}},{key:"parseSymbol",value:function(){var e=this.nextToken;return o["default"][e.text]?(this.consume(),new r(e.text,!0,e)):u["default"][this.mode][e.text]?(this.consume(),new r(new p["default"](u["default"][this.mode][e.text].group,e.text,this.mode,e),!1,e)):"text"===this.mode&&h.cjkRegex.test(e.text)?(this.consume(),new r(new p["default"]("textord",e.text,this.mode,e),!1,e)):"$"===e.text?new r(e.text,!1,e):null}}]),e}();m.endOfExpression=["}","\\end","\\right","&","\\\\","\\cr"],m.SUPSUB_GREEDINESS=1,m.sizeFuncs=["\\tiny","\\sixptsize","\\scriptsize","\\footnotesize","\\small","\\normalsize","\\large","\\Large","\\LARGE","\\huge","\\Huge"],m.styleFuncs=["\\displaystyle","\\textstyle","\\scriptstyle","\\scriptscriptstyle"],m.oldFontFuncs={"\\rm":"mathrm","\\sf":"mathsf","\\tt":"mathtt","\\bf":"mathbf","\\it":"mathit"},m.prototype.ParseNode=p["default"],t.exports=m},{"./MacroExpander":27,"./ParseError":29,"./ParseNode":30,"./environments":40,"./functions":43,"./symbols":48,"./unicodeRegexes":49,"./units":50,"./utils":51,"babel-runtime/helpers/classCallCheck":4,"babel-runtime/helpers/createClass":5}],32:[function(e,t){function n(e){return e&&e.__esModule?e:{"default":e}}var r=n(e("babel-runtime/helpers/classCallCheck")),i=n(e("./utils")),a=function o(e){(0,r["default"])(this,o),e=e||{},this.displayMode=i["default"].deflt(e.displayMode,!1),this.throwOnError=i["default"].deflt(e.throwOnError,!0),this.errorColor=i["default"].deflt(e.errorColor,"#cc0000"),this.macros=e.macros||{},this.colorIsTextColor=i["default"].deflt(e.colorIsTextColor,!1)};t.exports=a},{"./utils":51,"babel-runtime/helpers/classCallCheck":4}],33:[function(e,t){function n(e){return e&&e.__esModule?e:{"default":e}}var r=n(e("babel-runtime/helpers/classCallCheck")),i=n(e("babel-runtime/helpers/createClass")),a=function(){function e(t,n,i){(0,r["default"])(this,e),this.id=t,this.size=n,this.cramped=i}return(0,i["default"])(e,[{key:"sup",value:function(){return f[m[this.id]]}},{key:"sub",value:function(){return f[g[this.id]]}},{key:"fracNum",value:function(){return f[v[this.id]]}},{key:"fracDen",value:function(){return f[b[this.id]]}},{key:"cramp",value:function(){return f[y[this.id]]}},{key:"text",value:function(){return f[x[this.id]]}},{key:"isTight",value:function(){return this.size>=2}}]),e}(),o=0,s=1,l=2,u=3,d=4,c=5,h=6,p=7,f=[new a(o,0,!1),new a(s,0,!0),new a(l,1,!1),new a(u,1,!0),new a(d,2,!1),new a(c,2,!0),new a(h,3,!1),new a(p,3,!0)],m=[d,c,d,c,h,p,h,p],g=[c,c,c,c,p,p,p,p],v=[l,u,d,c,h,p,h,p],b=[u,u,c,c,p,p,p,p],y=[s,s,u,u,c,c,p,p],x=[o,s,l,u,l,u,l,u];t.exports={DISPLAY:f[o],TEXT:f[l],SCRIPT:f[d],SCRIPTSCRIPT:f[h]}},{"babel-runtime/helpers/classCallCheck":4,"babel-runtime/helpers/createClass":5}],34:[function(e,t){function n(e){return e&&e.__esModule?e:{"default":e}}var r=n(e("./domTree")),i=n(e("./fontMetrics")),a=n(e("./symbols")),o=n(e("./utils")),s=["\\imath","\\jmath","\\pounds"],l=function(e,t,n){return a["default"][n][e]&&a["default"][n][e].replace&&(e=a["default"][n][e].replace),{value:e,metrics:i["default"].getCharacterMetrics(e,t)}},u=function(e,t,n,i,a){var o=l(e,t,n),s=o.metrics;e=o.value;var u=void 0;if(s){var d=s.italic;"text"===n&&(d=0),u=new r["default"].symbolNode(e,s.height,s.depth,d,s.skew,a)}else"undefined"!=typeof console&&console.warn("No character metrics for '"+e+"' in style '"+t+"'"),u=new r["default"].symbolNode(e,0,0,0,0,a);return i&&(u.maxFontSize=i.sizeMultiplier,i.style.isTight()&&u.classes.push("mtight"),i.getColor()&&(u.style.color=i.getColor())),u},d=function(e,t,n,r){return"\\"===e||"main"===a["default"][t][e].font?u(e,"Main-Regular",t,n,r):u(e,"AMS-Regular",t,n,r.concat(["amsrm"]))},c=function(e,t,n,r,i){if("mathord"===i){var o=h(e);return u(e,o.fontName,t,n,r.concat([o.fontClass]))}if("textord"===i)return"ams"===(a["default"][t][e]&&a["default"][t][e].font)?u(e,"AMS-Regular",t,n,r.concat(["amsrm"])):u(e,"Main-Regular",t,n,r.concat(["mathrm"]));throw new Error("unexpected type: "+i+" in mathDefault")},h=function(e){return/[0-9]/.test(e.charAt(0))||o["default"].contains(s,e)?{fontName:"Main-Italic",fontClass:"mainit"}:{fontName:"Math-Italic",fontClass:"mathit"}},p=function(e,t,n){var r=e.mode,i=e.value,a=["mord"],d=t.font;if(d){var p=void 0;return p="mathit"===d||o["default"].contains(s,i)?h(i):x[d],l(i,p.fontName,r).metrics?u(i,p.fontName,r,t,a.concat([p.fontClass||d])):c(i,r,t,a,n)}return c(i,r,t,a,n)},f=function(e){var t=0,n=0,r=0;if(e.children)for(var i=0;i<e.children.length;i++)e.children[i].height>t&&(t=e.children[i].height),e.children[i].depth>n&&(n=e.children[i].depth),e.children[i].maxFontSize>r&&(r=e.children[i].maxFontSize);e.height=t,e.depth=n,e.maxFontSize=r},m=function(e,t,n){var i=new r["default"].span(e,t,n);return f(i),i},g=function(e,t){e.children=t.concat(e.children),f(e)},v=function(e){var t=new r["default"].documentFragment(e);return f(t),t},b=function(e,t,n){var i=void 0,a=void 0,o=void 0;if("individualShift"===t){var s=e;for(e=[s[0]],a=i=-s[0].shift-s[0].elem.depth,o=1;o<s.length;o++){var l=-s[o].shift-a-s[o].elem.depth,u=l-(s[o-1].elem.height+s[o-1].elem.depth);a+=l,e.push({type:"kern",size:u}),e.push(s[o])}}else if("top"===t){var d=n;for(o=0;o<e.length;o++)"kern"===e[o].type?d-=e[o].size:d-=e[o].elem.height+e[o].elem.depth;i=d}else i="bottom"===t?-n:"shift"===t?-e[0].elem.depth-n:"firstBaseline"===t?-e[0].elem.depth:0;var c=0;for(o=0;o<e.length;o++)if("elem"===e[o].type){var h=e[o].elem;c=Math.max(c,h.maxFontSize,h.height)}c+=2;var p=m(["pstrut"],[]);p.style.height=c+"em";var f=[],g=i,v=i;for(a=i,o=0;o<e.length;o++){if("kern"===e[o].type)a+=e[o].size;else{var b=e[o].elem,y=m([],[p,b]);y.style.top=-c-a-b.depth+"em",e[o].marginLeft&&(y.style.marginLeft=e[o].marginLeft),e[o].marginRight&&(y.style.marginRight=e[o].marginRight),f.push(y),a+=b.height+b.depth}g=Math.min(g,a),v=Math.max(v,a)}var x=m(["vlist"],f);x.style.height=v+"em";var w=void 0;if(g<0){var k=m(["vlist"],[]);k.style.height=-g+"em";var M=m(["vlist-s"],[new r["default"].symbolNode("\u200b")]);w=[m(["vlist-r"],[x,M]),m(["vlist-r"],[k])]}else w=[m(["vlist-r"],[x])];var S=m(["vlist-t"],w);return 2===w.length&&S.classes.push("vlist-t2"),S.height=v,S.depth=-g,S},y={"\\qquad":{size:"2em",className:"qquad"},"\\quad":{size:"1em",className:"quad"},"\\enspace":{size:"0.5em",className:"enspace"},"\\;":{size:"0.277778em",className:"thickspace"},"\\:":{size:"0.22222em",className:"mediumspace"},"\\,":{size:"0.16667em",className:"thinspace"},"\\!":{size:"-0.16667em",className:"negativethinspace"}},x={mathbf:{variant:"bold",fontName:"Main-Bold"},mathrm:{variant:"normal",fontName:"Main-Regular"},textit:{variant:"italic",fontName:"Main-Italic"},mathbb:{variant:"double-struck",fontName:"AMS-Regular"},mathcal:{variant:"script",fontName:"Caligraphic-Regular"},mathfrak:{variant:"fraktur",fontName:"Fraktur-Regular"},mathscr:{variant:"script",fontName:"Script-Regular"},mathsf:{variant:"sans-serif",fontName:"SansSerif-Regular"},mathtt:{variant:"monospace",fontName:"Typewriter-Regular"}};t.exports={fontMap:x,makeSymbol:u,mathsym:d,makeSpan:m,makeFragment:v,makeVList:b,makeOrd:p,prependChildren:g,spacingFunctions:y}},{"./domTree":39,"./fontMetrics":41,"./symbols":48,"./utils":51}],35:[function(e,t){function n(e){return e&&e.__esModule?e:{"default":e}}function r(e,t,n){for(var r=y(e,t,!1),i=t.sizeMultiplier/n.sizeMultiplier,a=0;a<r.length;a++){var o=h["default"].indexOf(r[a].classes,"sizing");o<0?Array.prototype.push.apply(r[a].classes,t.sizingClasses(n)):r[a].classes[o+1]==="reset-size"+t.size&&(r[a].classes[o+1]="reset-size"+n.size),r[a].height*=i,r[a].depth*=i}return l["default"].makeFragment(r)}var i=n(e("babel-runtime/core-js/json/stringify")),a=n(e("./ParseError")),o=n(e("./Style")),s=e("./buildCommon"),l=n(s),u=n(e("./delimiter")),d=n(e("./domTree")),c=n(e("./units")),h=n(e("./utils")),p=n(e("./stretchy")),f=function(e){return e instanceof d["default"].span&&"mspace"===e.classes[0]},m=function(e){return e&&"mbin"===e.classes[0]},g=function(e,t){return e?h["default"].contains(["mbin","mopen","mrel","mop","mpunct"],e.classes[0]):t},v=function(e,t){return e?h["default"].contains(["mrel","mclose","mpunct"],e.classes[0]):t},b=function(e,t){for(var n=t;n<e.length&&f(e[n]);)n++;return n===t?null:e.splice(t,n-t)},y=function(e,t,n){for(var r=[],i=0;i<e.length;i++){var a=e[i],o=C(a,t);o instanceof d["default"].documentFragment?Array.prototype.push.apply(r,o.children):r.push(o)}for(var u=0;u<r.length;u++){var c=b(r,u);if(c){if(!(u<r.length)){Array.prototype.push.apply(r,c);break}r[u]instanceof d["default"].symbolNode&&(r[u]=(0,s.makeSpan)([].concat(r[u].classes),[r[u]])),l["default"].prependChildren(r[u],c)}}for(var h=0;h<r.length;h++)m(r[h])&&(g(r[h-1],n)||v(r[h+1],n))&&(r[h].classes[0]="mord");for(var p=0;p<r.length;p++)if("\u0338"===r[p].value&&p+1<r.length){var f=r.slice(p,p+2);f[0].classes=["mainrm"],f[0].style.position="absolute",f[0].style.right="0";var y=r[p+1].classes,x=(0,s.makeSpan)(y,f);-1!==y.indexOf("mord")&&(x.style.paddingLeft="0.277771em"),x.style.position="relative",r.splice(p,2,x)}return r},x=function N(e){if(e instanceof d["default"].documentFragment){if(e.children.length)return N(e.children[e.children.length-1])}else if(h["default"].contains(["mord","mop","mbin","mrel","mopen","mclose","mpunct","minner"],e.classes[0]))return e.classes[0];return null},w=function(e,t){if(e.value.base){var n=e.value.base;return"op"===n.type?n.value.limits&&(t.style.size===o["default"].DISPLAY.size||n.value.alwaysHandleSupSub):"accent"===n.type?M(n.value.base):"horizBrace"===n.type?!e.value.sub===n.value.isOver:null}return!1},k=function E(e){return!!e&&("ordgroup"===e.type?1===e.value.length?E(e.value[0]):e:"color"===e.type?1===e.value.value.length?E(e.value.value[0]):e:"font"===e.type?E(e.value.body):e)},M=function(e){var t=k(e);return"mathord"===t.type||"textord"===t.type||"bin"===t.type||"rel"===t.type||"inner"===t.type||"open"===t.type||"close"===t.type||"punct"===t.type},S=function(e,t){var n=["nulldelimiter"].concat(e.baseSizingClasses());return(0,s.makeSpan)(t.concat(n))},z={mathord:function(e,t){return l["default"].makeOrd(e,t,"mathord")},textord:function(e,t){return l["default"].makeOrd(e,t,"textord")},bin:function(e,t){return l["default"].mathsym(e.value,e.mode,t,["mbin"])},rel:function(e,t){return l["default"].mathsym(e.value,e.mode,t,["mrel"])},open:function(e,t){return l["default"].mathsym(e.value,e.mode,t,["mopen"])},close:function(e,t){return l["default"].mathsym(e.value,e.mode,t,["mclose"])},inner:function(e,t){return l["default"].mathsym(e.value,e.mode,t,["minner"])},punct:function(e,t){return l["default"].mathsym(e.value,e.mode,t,["mpunct"])},ordgroup:function(e,t){return(0,s.makeSpan)(["mord"],y(e.value,t,!0),t)},text:function(e,t){for(var n=t.withFont(e.value.style),r=y(e.value.body,n,!0),i=0;i<r.length-1;i++)r[i].tryCombine(r[i+1])&&(r.splice(i+1,1),i--);return(0,s.makeSpan)(["mord","text"],r,n)},color:function(e,t){var n=y(e.value.value,t.withColor(e.value.color),!1);return new l["default"].makeFragment(n)},supsub:function(e,t){if(w(e,t))return z[e.value.base.type](e,t);var n=C(e.value.base,t),r=void 0,i=void 0,a=t.fontMetrics(),u=void 0,c=0,h=0;e.value.sup&&(u=t.havingStyle(t.style.sup()),r=C(e.value.sup,u,t),M(e.value.base)||(c=n.height-u.fontMetrics().supDrop*u.sizeMultiplier/t.sizeMultiplier)),e.value.sub&&(u=t.havingStyle(t.style.sub()),i=C(e.value.sub,u,t),M(e.value.base)||(h=n.depth+u.fontMetrics().subDrop*u.sizeMultiplier/t.sizeMultiplier));var p=void 0;p=t.style===o["default"].DISPLAY?a.sup1:t.style.cramped?a.sup3:a.sup2;var f=t.sizeMultiplier,m=.5/a.ptPerEm/f+"em",g=void 0;if(e.value.sup)if(e.value.sub){c=Math.max(c,p,r.depth+.25*a.xHeight),h=Math.max(h,a.sub2);var v=a.defaultRuleThickness;if(c-r.depth-(i.height-h)<4*v){h=4*v-(c-r.depth)+i.height;var b=.8*a.xHeight-(c-r.depth);b>0&&(c+=b,h-=b)}var y=[{type:"elem",elem:i,shift:h,marginRight:m},{type:"elem",elem:r,shift:-c,marginRight:m}];n instanceof d["default"].symbolNode&&(y[0].marginLeft=-n.italic+"em"),g=l["default"].makeVList(y,"individualShift",null,t)}else c=Math.max(c,p,r.depth+.25*a.xHeight),g=l["default"].makeVList([{type:"elem",elem:r,marginRight:m}],"shift",-c,t);else{h=Math.max(h,a.sub1,i.height-.8*a.xHeight);var k=[{type:"elem",elem:i,marginRight:m}];n instanceof d["default"].symbolNode&&(k[0].marginLeft=-n.italic+"em"),g=l["default"].makeVList(k,"shift",h,t)}var S=x(n)||"mord";return(0,s.makeSpan)([S],[n,(0,s.makeSpan)(["msupsub"],[g])],t)},genfrac:function(e,t){var n=t.style;"display"===e.value.size?n=o["default"].DISPLAY:"text"===e.value.size&&(n=o["default"].TEXT);var r=n.fracNum(),i=n.fracDen(),a=void 0;a=t.havingStyle(r);var d=C(e.value.numer,a,t);a=t.havingStyle(i);var c=C(e.value.denom,a,t),h=void 0,p=void 0,f=void 0;e.value.hasBarLine?(p=(h=A("frac-line",t)).height,f=h.height):(h=null,p=0,f=t.fontMetrics().defaultRuleThickness);var m=void 0,g=void 0,v=void 0;n.size===o["default"].DISPLAY.size?(m=t.fontMetrics().num1,g=p>0?3*f:7*f,v=t.fontMetrics().denom1):(p>0?(m=t.fontMetrics().num2,g=f):(m=t.fontMetrics().num3,g=3*f),v=t.fontMetrics().denom2);var b=void 0;if(0===p){var y=m-d.depth-(c.height-v);y<g&&(m+=.5*(g-y),v+=.5*(g-y)),b=l["default"].makeVList([{type:"elem",elem:c,shift:v},{type:"elem",elem:d,shift:-m}],"individualShift",null,t)}else{var x=t.fontMetrics().axisHeight;m-d.depth-(x+.5*p)<g&&(m+=g-(m-d.depth-(x+.5*p))),x-.5*p-(c.height-v)<g&&(v+=g-(x-.5*p-(c.height-v)));var w=-(x-.5*p);b=l["default"].makeVList([{type:"elem",elem:c,shift:v},{type:"elem",elem:h,shift:w},{type:"elem",elem:d,shift:-m}],"individualShift",null,t)}a=t.havingStyle(n),b.height*=a.sizeMultiplier/t.sizeMultiplier,b.depth*=a.sizeMultiplier/t.sizeMultiplier;var k=void 0;k=n.size===o["default"].DISPLAY.size?t.fontMetrics().delim1:t.fontMetrics().delim2;var M=void 0,z=void 0;return M=null==e.value.leftDelim?S(t,["mopen"]):u["default"].customSizedDelim(e.value.leftDelim,k,!0,t.havingStyle(n),e.mode,["mopen"]),z=null==e.value.rightDelim?S(t,["mclose"]):u["default"].customSizedDelim(e.value.rightDelim,k,!0,t.havingStyle(n),e.mode,["mclose"]),(0,s.makeSpan)(["mord"].concat(a.sizingClasses(t)),[M,(0,s.makeSpan)(["mfrac"],[b]),z],t)},array:function(e,t){var n=void 0,r=void 0,i=e.value.body.length,o=0,u=new Array(i),d=1/t.fontMetrics().ptPerEm,p=5*d,f=12*d,m=3*d,g=h["default"].deflt(e.value.arraystretch,1)*f,v=.7*g,b=.3*g,y=0;for(n=0;n<e.value.body.length;++n){var x=e.value.body[n],w=v,k=b;o<x.length&&(o=x.length);var M=new Array(x.length);for(r=0;r<x.length;++r){var S=C(x[r],t);k<S.depth&&(k=S.depth),w<S.height&&(w=S.height),M[r]=S}var z=0;e.value.rowGaps[n]&&(z=c["default"].calculateSize(e.value.rowGaps[n].value,t))>0&&(k<(z+=b)&&(k=z),z=0),e.value.addJot&&(k+=m),M.height=w,M.depth=k,y+=w,M.pos=y,y+=k+z,u[n]=M}var A=y/2+t.fontMetrics().axisHeight,T=e.value.cols||[],N=[],E=void 0,R=void 0;for(r=0,R=0;r<o||R<T.length;++r,++R){for(var L=T[R]||{},O=!0;"separator"===L.type;){if(O||((E=(0,s.makeSpan)(["arraycolsep"],[])).style.width=t.fontMetrics().doubleRuleSep+"em",N.push(E)),"|"!==L.separator)throw new a["default"]("Invalid separator type: "+L.separator);var q=(0,s.makeSpan)(["vertical-separator"],[]);q.style.height=y+"em",q.style.verticalAlign=-(y-A)+"em",N.push(q),L=T[++R]||{},O=!1}if(!(r>=o)){var _=void 0;(r>0||e.value.hskipBeforeAndAfter)&&0!==(_=h["default"].deflt(L.pregap,p))&&((E=(0,s.makeSpan)(["arraycolsep"],[])).style.width=_+"em",N.push(E));var D=[];for(n=0;n<i;++n){var B=u[n],I=B[r];if(I){var H=B.pos-A;I.depth=B.depth,I.height=B.height,D.push({type:"elem",elem:I,shift:H})}}D=l["default"].makeVList(D,"individualShift",null,t),D=(0,s.makeSpan)(["col-align-"+(L.align||"c")],[D]),N.push(D),(r<o-1||e.value.hskipBeforeAndAfter)&&0!==(_=h["default"].deflt(L.postgap,p))&&((E=(0,s.makeSpan)(["arraycolsep"],[])).style.width=_+"em",N.push(E))}}return u=(0,s.makeSpan)(["mtable"],N),(0,s.makeSpan)(["mord"],[u],t)},spacing:function(e,t){return"\\ "===e.value||"\\space"===e.value||" "===e.value||"~"===e.value?"text"===e.mode?l["default"].makeOrd(e,t,"textord"):(0,s.makeSpan)(["mspace"],[l["default"].mathsym(e.value,e.mode,t)],t):(0,s.makeSpan)(["mspace",l["default"].spacingFunctions[e.value].className],[],t)},llap:function(e,t){var n=(0,s.makeSpan)(["inner"],[C(e.value.body,t)]),r=(0,s.makeSpan)(["fix"],[]);return(0,s.makeSpan)(["mord","llap"],[n,r],t)},rlap:function(e,t){var n=(0,s.makeSpan)(["inner"],[C(e.value.body,t)]),r=(0,s.makeSpan)(["fix"],[]);return(0,s.makeSpan)(["mord","rlap"],[n,r],t)},op:function(e,t){var n=void 0,r=void 0,i=!1;"supsub"===e.type&&(n=e.value.sup,r=e.value.sub,e=e.value.base,i=!0);var a=t.style,u=["\\smallint"],c=!1;a.size===o["default"].DISPLAY.size&&e.value.symbol&&!h["default"].contains(u,e.value.body)&&(c=!0);var p=void 0;if(e.value.symbol){var f=c?"Size2-Regular":"Size1-Regular";p=l["default"].makeSymbol(e.value.body,f,"math",t,["mop","op-symbol",c?"large-op":"small-op"])}else if(e.value.value){var m=y(e.value.value,t,!0);1===m.length&&m[0]instanceof d["default"].symbolNode?(p=m[0]).classes[0]="mop":p=(0,s.makeSpan)(["mop"],m,t)}else{for(var g=[],v=1;v<e.value.body.length;v++)g.push(l["default"].mathsym(e.value.body[v],e.mode));p=(0,s.makeSpan)(["mop"],g,t)}var b=0,x=0;if(p instanceof d["default"].symbolNode&&(b=(p.height-p.depth)/2-t.fontMetrics().axisHeight,x=p.italic),i){p=(0,s.makeSpan)([],[p]);var w=void 0,k=void 0,M=void 0,S=void 0,z=void 0;n&&(z=t.havingStyle(a.sup()),w=C(n,z,t),k=Math.max(t.fontMetrics().bigOpSpacing1,t.fontMetrics().bigOpSpacing3-w.depth)),r&&(z=t.havingStyle(a.sub()),M=C(r,z,t),S=Math.max(t.fontMetrics().bigOpSpacing2,t.fontMetrics().bigOpSpacing4-M.height));var A=void 0,T=void 0,N=void 0;if(n)if(r){if(!n&&!r)return p;N=t.fontMetrics().bigOpSpacing5+M.height+M.depth+S+p.depth+b,A=l["default"].makeVList([{type:"kern",size:t.fontMetrics().bigOpSpacing5},{type:"elem",elem:M,marginLeft:-x+"em"},{type:"kern",size:S},{type:"elem",elem:p},{type:"kern",size:k},{type:"elem",elem:w,marginLeft:x+"em"},{type:"kern",size:t.fontMetrics().bigOpSpacing5}],"bottom",N,t)}else N=p.depth+b,A=l["default"].makeVList([{type:"elem",elem:p},{type:"kern",size:k},{type:"elem",elem:w,marginLeft:x+"em"},{type:"kern",size:t.fontMetrics().bigOpSpacing5}],"bottom",N,t);else T=p.height-b,A=l["default"].makeVList([{type:"kern",size:t.fontMetrics().bigOpSpacing5},{type:"elem",elem:M,marginLeft:-x+"em"},{type:"kern",size:S},{type:"elem",elem:p}],"top",T,t);return(0,s.makeSpan)(["mop","op-limits"],[A],t)}return b&&(p.style.position="relative",p.style.top=b+"em"),p},mod:function(e,t){var n=[];if("bmod"===e.value.modType?(t.style.isTight()||n.push((0,s.makeSpan)(["mspace","negativemediumspace"],[],t)),n.push((0,s.makeSpan)(["mspace","thickspace"],[],t))):t.style.size===o["default"].DISPLAY.size?n.push((0,s.makeSpan)(["mspace","quad"],[],t)):"mod"===e.value.modType?n.push((0,s.makeSpan)(["mspace","twelvemuspace"],[],t)):n.push((0,s.makeSpan)(["mspace","eightmuspace"],[],t)),"pod"!==e.value.modType&&"pmod"!==e.value.modType||n.push(l["default"].mathsym("(",e.mode)),"pod"!==e.value.modType){var r=[l["default"].mathsym("m",e.mode),l["default"].mathsym("o",e.mode),l["default"].mathsym("d",e.mode)];"bmod"===e.value.modType?(n.push((0,s.makeSpan)(["mbin"],r,t)),n.push((0,s.makeSpan)(["mspace","thickspace"],[],t)),t.style.isTight()||n.push((0,s.makeSpan)(["mspace","negativemediumspace"],[],t))):(Array.prototype.push.apply(n,r),n.push((0,s.makeSpan)(["mspace","sixmuspace"],[],t)))}return e.value.value&&Array.prototype.push.apply(n,y(e.value.value,t,!1)),"pod"!==e.value.modType&&"pmod"!==e.value.modType||n.push(l["default"].mathsym(")",e.mode)),l["default"].makeFragment(n)},katex:function(e,t){var n=(0,s.makeSpan)(["k"],[l["default"].mathsym("K",e.mode)],t),r=(0,s.makeSpan)(["a"],[l["default"].mathsym("A",e.mode)],t);r.height=.75*(r.height+.2),r.depth=.75*(r.height-.2);var i=(0,s.makeSpan)(["t"],[l["default"].mathsym("T",e.mode)],t),a=(0,s.makeSpan)(["e"],[l["default"].mathsym("E",e.mode)],t);a.height=a.height-.2155,a.depth=a.depth+.2155;var o=(0,s.makeSpan)(["x"],[l["default"].mathsym("X",e.mode)],t);return(0,s.makeSpan)(["mord","katex-logo"],[n,r,i,a,o],t)}},A=function(e,t,n){var r=(0,s.makeSpan)([e],[],t);return r.height=n||t.fontMetrics().defaultRuleThickness,r.style.borderBottomWidth=r.height+"em",r.maxFontSize=1,r};z.overline=function(e,t){var n=C(e.value.body,t.havingCrampedStyle()),r=A("overline-line",t),i=l["default"].makeVList([{type:"elem",elem:n},{type:"kern",size:3*r.height},{type:"elem",elem:r},{type:"kern",size:r.height}],"firstBaseline",null,t);return(0,s.makeSpan)(["mord","overline"],[i],t)},z.underline=function(e,t){var n=C(e.value.body,t),r=A("underline-line",t),i=l["default"].makeVList([{type:"kern",size:r.height},{type:"elem",elem:r},{type:"kern",size:3*r.height},{type:"elem",elem:n}],"top",n.height,t);return(0,s.makeSpan)(["mord","underline"],[i],t)},z.sqrt=function(e,t){var n=C(e.value.body,t.havingCrampedStyle());n instanceof d["default"].documentFragment&&(n=(0,s.makeSpan)([],[n],t));var r=t.fontMetrics().defaultRuleThickness,i=r;t.style.id<o["default"].TEXT.id&&(i=t.fontMetrics().xHeight);var a=r+i/4,c=(n.height+n.depth+a+r)*t.sizeMultiplier,h=u["default"].customSizedDelim("\\surd",c,!1,t,e.mode),p=t.fontMetrics().sqrtRuleThickness*h.sizeMultiplier,f=h.height-p;f>n.height+n.depth+a&&(a=(a+f-n.height-n.depth)/2);var m=h.height-n.height-a-p,g=void 0;if(0===n.height&&0===n.depth?g=(0,s.makeSpan)():(n.style.paddingLeft=h.surdWidth+"em",(g=l["default"].makeVList([{type:"elem",elem:n},{type:"kern",size:-(n.height+m)},{type:"elem",elem:h},{type:"kern",size:p}],"firstBaseline",null,t)).children[0].children[0].classes.push("svg-align")),e.value.index){var v=t.havingStyle(o["default"].SCRIPTSCRIPT),b=C(e.value.index,v,t),y=.6*(g.height-g.depth),x=l["default"].makeVList([{type:"elem",elem:b}],"shift",-y,t),w=(0,s.makeSpan)(["root"],[x]);return(0,s.makeSpan)(["mord","sqrt"],[w,g],t)}return(0,s.makeSpan)(["mord","sqrt"],[g],t)},z.sizing=function(e,t){var n=t.havingSize(e.value.size);return r(e.value.value,n,t)},z.styling=function(e,t){var n={display:o["default"].DISPLAY,text:o["default"].TEXT,script:o["default"].SCRIPT,scriptscript:o["default"].SCRIPTSCRIPT}[e.value.style],i=t.havingStyle(n);return r(e.value.value,i,t)},z.font=function(e,t){var n=e.value.font;return C(e.value.body,t.withFont(n))},z.delimsizing=function(e,t){var n=e.value.value;return"."===n?(0,s.makeSpan)([e.value.mclass]):u["default"].sizedDelim(n,e.value.size,t,e.mode,[e.value.mclass])},z.leftright=function(e,t){for(var n=y(e.value.body,t,!0),r=0,i=0,a=!1,o=0;o<n.length;o++)n[o].isMiddle?a=!0:(r=Math.max(n[o].height,r),i=Math.max(n[o].depth,i));r*=t.sizeMultiplier,i*=t.sizeMultiplier;var d=void 0;if(d="."===e.value.left?S(t,["mopen"]):u["default"].leftRightDelim(e.value.left,r,i,t,e.mode,["mopen"]),n.unshift(d),a)for(var c=1;c<n.length;c++){var h=n[c];if(h.isMiddle){n[c]=u["default"].leftRightDelim(h.isMiddle.value,r,i,h.isMiddle.options,e.mode,[]);var p=b(h.children,0);p&&l["default"].prependChildren(n[c],p)}}var f=void 0;return f="."===e.value.right?S(t,["mclose"]):u["default"].leftRightDelim(e.value.right,r,i,t,e.mode,["mclose"]),n.push(f),(0,s.makeSpan)(["minner"],n,t)},z.middle=function(e,t){var n=void 0;return"."===e.value.value?n=S(t,[]):(n=u["default"].sizedDelim(e.value.value,1,t,e.mode,[])).isMiddle={value:e.value.value,options:t},n},z.rule=function(e,t){var n=(0,s.makeSpan)(["mord","rule"],[],t),r=0;e.value.shift&&(r=c["default"].calculateSize(e.value.shift,t));var i=c["default"].calculateSize(e.value.width,t),a=c["default"].calculateSize(e.value.height,t);return n.style.borderRightWidth=i+"em",n.style.borderTopWidth=a+"em",n.style.bottom=r+"em",n.width=i,n.height=a+r,n.depth=-r,n.maxFontSize=1.125*a*t.sizeMultiplier,n},z.kern=function(e,t){var n=(0,s.makeSpan)(["mord","rule"],[],t);if(e.value.dimension){var r=c["default"].calculateSize(e.value.dimension,t);n.style.marginLeft=r+"em"}return n},z.accent=function(e,t){var n=e.value.base,r=void 0;if("supsub"===e.type){var i=e;n=(e=i.value.base).value.base,i.value.base=n,r=C(i,t)}var a=C(n,t.havingCrampedStyle()),o=0;if(e.value.isShifty&&M(n)){var u=k(n);o=C(u,t.havingCrampedStyle()).skew}var d=Math.min(a.height,t.fontMetrics().xHeight),c=void 0;if(e.value.isStretchy){c=p["default"].svgSpan(e,t);var h=(c=l["default"].makeVList([{type:"elem",elem:a},{type:"elem",elem:c}],"firstBaseline",null,t)).children[0].children[0].children[1];h.classes.push("svg-align"),o>0&&(h.style.width="calc(100% - "+2*o+"em)",h.style.marginLeft=2*o+"em")}else{var f=l["default"].makeSymbol(e.value.label,"Main-Regular",e.mode,t);f.italic=0;var m=null;"\\vec"===e.value.label?m="accent-vec":"\\H"===e.value.label&&(m="accent-hungarian"),c=(0,s.makeSpan)([],[f]),(c=(0,s.makeSpan)(["accent-body",m],[c])).style.marginLeft=2*o+"em",c=l["default"].makeVList([{type:"elem",elem:a},{type:"kern",size:-d},{type:"elem",elem:c}],"firstBaseline",null,t)}var g=(0,s.makeSpan)(["mord","accent"],[c],t);return r?(r.children[0]=g,r.height=Math.max(g.height,r.height),r.classes[0]="mord",r):g},z.horizBrace=function(e,t){var n=t.style,r="supsub"===e.type,i=void 0,a=void 0;r&&(e.value.sup?(a=t.havingStyle(n.sup()),i=C(e.value.sup,a,t)):(a=t.havingStyle(n.sub()),i=C(e.value.sub,a,t)),e=e.value.base);var u=C(e.value.base,t.havingBaseStyle(o["default"].DISPLAY)),d=p["default"].svgSpan(e,t),c=void 0;if(e.value.isOver?(c=l["default"].makeVList([{type:"elem",elem:u},{type:"kern",size:.1},{type:"elem",elem:d}],"firstBaseline",null,t)).children[0].children[0].children[1].classes.push("svg-align"):(c=l["default"].makeVList([{type:"elem",elem:d},{type:"kern",size:.1},{type:"elem",elem:u}],"bottom",u.depth+.1+d.height,t)).children[0].children[0].children[0].classes.push("svg-align"),r){var h=(0,s.makeSpan)(["mord",e.value.isOver?"mover":"munder"],[c],t);c=e.value.isOver?l["default"].makeVList([{type:"elem",elem:h},{type:"kern",size:.2},{type:"elem",elem:i}],"firstBaseline",null,t):l["default"].makeVList([{type:"elem",elem:i},{type:"kern",size:.2},{type:"elem",elem:h}],"bottom",h.depth+.2+i.height,t)}return(0,s.makeSpan)(["mord",e.value.isOver?"mover":"munder"],[c],t)},z.accentUnder=function(e,t){var n=C(e.value.body,t),r=p["default"].svgSpan(e,t),i=/tilde/.test(e.value.label)?.12:0,a=l["default"].makeVList([{type:"elem",elem:r},{type:"kern",size:i},{type:"elem",elem:n}],"bottom",r.height+i,t);return a.children[0].children[0].children[0].classes.push("svg-align"),(0,s.makeSpan)(["mord","accentunder"],[a],t)},z.enclose=function(e,t){var n=C(e.value.body,t),r=e.value.label.substr(1),i=t.sizeMultiplier,a=void 0,o=0,u=0;if("sout"===r)(a=(0,s.makeSpan)(["stretchy","sout"])).height=t.fontMetrics().defaultRuleThickness/i,u=-.5*t.fontMetrics().xHeight;else{n.classes.push("fbox"===r?"boxpad":"cancel-pad");var d=M(e.value.body);o="fbox"===r?.34:d?.2:0,u=n.depth+o,a=p["default"].encloseSpan(n,r,o,t)}var c=l["default"].makeVList([{type:"elem",elem:n,shift:0},{type:"elem",elem:a,shift:u}],"individualShift",null,t);return"fbox"!==r&&c.children[0].children[0].children[1].classes.push("svg-align"),/cancel/.test(r)?(0,s.makeSpan)(["mord","cancel-lap"],[c],t):(0,s.makeSpan)(["mord"],[c],t)},z.xArrow=function(e,t){var n=t.style,r=t.havingStyle(n.sup()),i=C(e.value.body,r,t);i.classes.push("x-arrow-pad");var a=void 0;e.value.below&&(r=t.havingStyle(n.sub()),(a=C(e.value.below,r,t)).classes.push("x-arrow-pad"));var o=p["default"].svgSpan(e,t),u=-t.fontMetrics().axisHeight+o.depth,d=-t.fontMetrics().axisHeight-o.height-.111,c=void 0;if(e.value.below){var h=-t.fontMetrics().axisHeight+a.height+o.height+.111;c=l["default"].makeVList([{type:"elem",elem:i,shift:d},{type:"elem",elem:o,shift:u},{type:"elem",elem:a,shift:h}],"individualShift",null,t)}else c=l["default"].makeVList([{type:"elem",elem:i,shift:d},{type:"elem",elem:o,shift:u}],"individualShift",null,t);return c.children[0].children[0].children[1].classes.push("svg-align"),(0,s.makeSpan)(["mrel","x-arrow"],[c],t)},z.phantom=function(e,t){var n=y(e.value.value,t.withPhantom(),!1);return new l["default"].makeFragment(n)},z.mclass=function(e,t){var n=y(e.value.value,t,!0);return(0,s.makeSpan)([e.value.mclass],n,t)};var C=function(e,t,n){if(!e)return(0,s.makeSpan)();if(z[e.type]){var r=z[e.type](e,t);if(n&&t.size!==n.size){r=(0,s.makeSpan)(t.sizingClasses(n),[r],t);var i=t.sizeMultiplier/n.sizeMultiplier;r.height*=i,r.depth*=i}return r}throw new a["default"]("Got group of unknown type: '"+e.type+"'")},T=function(e,t){e=JSON.parse((0,i["default"])(e));var n=y(e,t,!0),r=(0,s.makeSpan)(["base"],n,t),a=(0,s.makeSpan)(["strut"]),o=(0,s.makeSpan)(["strut","bottom"]);a.style.height=r.height+"em",o.style.height=r.height+r.depth+"em",o.style.verticalAlign=-r.depth+"em";var l=(0,s.makeSpan)(["katex-html"],[a,o,r]);return l.setAttribute("aria-hidden","true"),l};t.exports=T},{"./ParseError":29,"./Style":33,"./buildCommon":34,"./delimiter":38,"./domTree":39,"./stretchy":47,"./units":50,"./utils":51,"babel-runtime/core-js/json/stringify":2}],36:[function(e,t){function n(e){return e&&e.__esModule?e:{"default":e}}var r=e("./buildCommon"),i=n(r),a=n(e("./fontMetrics")),o=n(e("./mathMLTree")),s=n(e("./ParseError")),l=n(e("./Style")),u=n(e("./symbols")),d=n(e("./utils")),c=n(e("./stretchy")),h=function(e,t){return u["default"][t][e]&&u["default"][t][e].replace&&(e=u["default"][t][e].replace),new o["default"].TextNode(e)},p=function(e,t){var n=t.font;if(!n)return null;var i=e.mode;if("mathit"===n)return"italic";var o=e.value;if(d["default"].contains(["\\imath","\\jmath"],o))return null;u["default"][i][o]&&u["default"][i][o].replace&&(o=u["default"][i][o].replace);var s=r.fontMap[n].fontName;return a["default"].getCharacterMetrics(o,s)?r.fontMap[t.font].variant:null},f={},m={mi:"italic",mn:"normal",mtext:"normal"};f.mathord=function(e,t){var n=new o["default"].MathNode("mi",[h(e.value,e.mode)]),r=p(e,t)||"italic";return r!==m[n.type]&&n.setAttribute("mathvariant",r),n},f.textord=function(e,t){var n=h(e.value,e.mode),r=p(e,t)||"normal",i=void 0;return i="text"===e.mode?new o["default"].MathNode("mtext",[n]):/[0-9]/.test(e.value)?new o["default"].MathNode("mn",[n]):"\\prime"===e.value?new o["default"].MathNode("mo",[n]):new o["default"].MathNode("mi",[n]),r!==m[i.type]&&i.setAttribute("mathvariant",r),i},f.bin=function(e){return new o["default"].MathNode("mo",[h(e.value,e.mode)])},f.rel=function(e){return new o["default"].MathNode("mo",[h(e.value,e.mode)])},f.open=function(e){return new o["default"].MathNode("mo",[h(e.value,e.mode)])},f.close=function(e){return new o["default"].MathNode("mo",[h(e.value,e.mode)])},f.inner=function(e){return new o["default"].MathNode("mo",[h(e.value,e.mode)])},f.punct=function(e){var t=new o["default"].MathNode("mo",[h(e.value,e.mode)]);return t.setAttribute("separator","true"),t},f.ordgroup=function(e,t){var n=g(e.value,t);return new o["default"].MathNode("mrow",n)},f.text=function(e,t){for(var n=e.value.body,r=[],i=null,a=0;a<n.length;a++){var s=v(n[a],t);"mtext"===s.type&&null!=i?Array.prototype.push.apply(i.children,s.children):(r.push(s),"mtext"===s.type&&(i=s))}return 1===r.length?r[0]:new o["default"].MathNode("mrow",r)},f.color=function(e,t){var n=g(e.value.value,t),r=new o["default"].MathNode("mstyle",n);return r.setAttribute("mathcolor",e.value.color),r},f.supsub=function(e,t){var n=!1,r=void 0;e.value.base&&"horizBrace"===e.value.base.value.type&&!!e.value.sup===e.value.base.value.isOver&&(n=!0,r=e.value.base.value.isOver);var i=!0,a=[v(e.value.base,t,i)];e.value.sub&&a.push(v(e.value.sub,t,i)),
e.value.sup&&a.push(v(e.value.sup,t,i));var s=void 0;if(n)s=r?"mover":"munder";else if(e.value.sub)if(e.value.sup){var u=e.value.base;s=u&&u.value.limits&&t.style===l["default"].DISPLAY?"munderover":"msubsup"}else s="msub";else s="msup";return new o["default"].MathNode(s,a)},f.genfrac=function(e,t){var n=new o["default"].MathNode("mfrac",[v(e.value.numer,t),v(e.value.denom,t)]);if(e.value.hasBarLine||n.setAttribute("linethickness","0px"),null!=e.value.leftDelim||null!=e.value.rightDelim){var r=[];if(null!=e.value.leftDelim){var i=new o["default"].MathNode("mo",[new o["default"].TextNode(e.value.leftDelim)]);i.setAttribute("fence","true"),r.push(i)}if(r.push(n),null!=e.value.rightDelim){var a=new o["default"].MathNode("mo",[new o["default"].TextNode(e.value.rightDelim)]);a.setAttribute("fence","true"),r.push(a)}return new o["default"].MathNode("mrow",r)}return n},f.array=function(e,t){return new o["default"].MathNode("mtable",e.value.body.map(function(e){return new o["default"].MathNode("mtr",e.map(function(e){return new o["default"].MathNode("mtd",[v(e,t)])}))}))},f.sqrt=function(e,t){return e.value.index?new o["default"].MathNode("mroot",[v(e.value.body,t),v(e.value.index,t)]):new o["default"].MathNode("msqrt",[v(e.value.body,t)])},f.leftright=function(e,t){var n=g(e.value.body,t);if("."!==e.value.left){var r=new o["default"].MathNode("mo",[h(e.value.left,e.mode)]);r.setAttribute("fence","true"),n.unshift(r)}if("."!==e.value.right){var i=new o["default"].MathNode("mo",[h(e.value.right,e.mode)]);i.setAttribute("fence","true"),n.push(i)}return new o["default"].MathNode("mrow",n)},f.middle=function(e){var t=new o["default"].MathNode("mo",[h(e.value.middle,e.mode)]);return t.setAttribute("fence","true"),t},f.accent=function(e,t){var n=void 0;n=e.value.isStretchy?c["default"].mathMLnode(e.value.label):new o["default"].MathNode("mo",[h(e.value.label,e.mode)]);var r=new o["default"].MathNode("mover",[v(e.value.base,t),n]);return r.setAttribute("accent","true"),r},f.spacing=function(e){var t=void 0;return"\\ "===e.value||"\\space"===e.value||" "===e.value||"~"===e.value?t=new o["default"].MathNode("mtext",[new o["default"].TextNode("\xa0")]):(t=new o["default"].MathNode("mspace")).setAttribute("width",i["default"].spacingFunctions[e.value].size),t},f.op=function(e,t){return e.value.symbol?new o["default"].MathNode("mo",[h(e.value.body,e.mode)]):e.value.value?new o["default"].MathNode("mo",g(e.value.value,t)):new o["default"].MathNode("mi",[new o["default"].TextNode(e.value.body.slice(1))])},f.mod=function(e,t){var n=[];if("pod"!==e.value.modType&&"pmod"!==e.value.modType||n.push(new o["default"].MathNode("mo",[h("(",e.mode)])),"pod"!==e.value.modType&&n.push(new o["default"].MathNode("mo",[h("mod",e.mode)])),e.value.value){var r=new o["default"].MathNode("mspace");r.setAttribute("width","0.333333em"),n.push(r),n=n.concat(g(e.value.value,t))}return"pod"!==e.value.modType&&"pmod"!==e.value.modType||n.push(new o["default"].MathNode("mo",[h(")",e.mode)])),new o["default"].MathNode("mo",n)},f.katex=function(){return new o["default"].MathNode("mtext",[new o["default"].TextNode("KaTeX")])},f.font=function(e,t){var n=e.value.font;return v(e.value.body,t.withFont(n))},f.delimsizing=function(e){var t=[];"."!==e.value.value&&t.push(h(e.value.value,e.mode));var n=new o["default"].MathNode("mo",t);return"mopen"===e.value.mclass||"mclose"===e.value.mclass?n.setAttribute("fence","true"):n.setAttribute("fence","false"),n},f.styling=function(e,t){var n={display:l["default"].DISPLAY,text:l["default"].TEXT,script:l["default"].SCRIPT,scriptscript:l["default"].SCRIPTSCRIPT}[e.value.style],r=t.havingStyle(n),i=g(e.value.value,r),a=new o["default"].MathNode("mstyle",i),s={display:["0","true"],text:["0","false"],script:["1","false"],scriptscript:["2","false"]}[e.value.style];return a.setAttribute("scriptlevel",s[0]),a.setAttribute("displaystyle",s[1]),a},f.sizing=function(e,t){var n=t.havingSize(e.value.size),r=g(e.value.value,n),i=new o["default"].MathNode("mstyle",r);return i.setAttribute("mathsize",n.sizeMultiplier+"em"),i},f.overline=function(e,t){var n=new o["default"].MathNode("mo",[new o["default"].TextNode("\u203e")]);n.setAttribute("stretchy","true");var r=new o["default"].MathNode("mover",[v(e.value.body,t),n]);return r.setAttribute("accent","true"),r},f.underline=function(e,t){var n=new o["default"].MathNode("mo",[new o["default"].TextNode("\u203e")]);n.setAttribute("stretchy","true");var r=new o["default"].MathNode("munder",[v(e.value.body,t),n]);return r.setAttribute("accentunder","true"),r},f.accentUnder=function(e,t){var n=c["default"].mathMLnode(e.value.label),r=new o["default"].MathNode("munder",[v(e.value.body,t),n]);return r.setAttribute("accentunder","true"),r},f.enclose=function(e,t){var n=new o["default"].MathNode("menclose",[v(e.value.body,t)]),r="";switch(e.value.label){case"\\bcancel":r="downdiagonalstrike";break;case"\\sout":r="horizontalstrike";break;case"\\fbox":r="box";break;default:r="updiagonalstrike"}return n.setAttribute("notation",r),n},f.horizBrace=function(e,t){var n=c["default"].mathMLnode(e.value.label);return new o["default"].MathNode(e.value.isOver?"mover":"munder",[v(e.value.base,t),n])},f.xArrow=function(e,t){var n=c["default"].mathMLnode(e.value.label),r=void 0,i=void 0;if(e.value.body){var a=v(e.value.body,t);e.value.below?(i=v(e.value.below,t),r=new o["default"].MathNode("munderover",[n,i,a])):r=new o["default"].MathNode("mover",[n,a])}else e.value.below?(i=v(e.value.below,t),r=new o["default"].MathNode("munder",[n,i])):r=new o["default"].MathNode("mover",[n]);return r},f.rule=function(){return new o["default"].MathNode("mrow")},f.kern=function(){return new o["default"].MathNode("mrow")},f.llap=function(e,t){var n=new o["default"].MathNode("mpadded",[v(e.value.body,t)]);return n.setAttribute("lspace","-1width"),n.setAttribute("width","0px"),n},f.rlap=function(e,t){var n=new o["default"].MathNode("mpadded",[v(e.value.body,t)]);return n.setAttribute("width","0px"),n},f.phantom=function(e,t){var n=g(e.value.value,t);return new o["default"].MathNode("mphantom",n)},f.mclass=function(e,t){var n=g(e.value.value,t);return new o["default"].MathNode("mstyle",n)};var g=function(e,t){for(var n=[],r=0;r<e.length;r++){var i=e[r];n.push(v(i,t))}return n},v=function(e,t){var n=arguments.length>2&&arguments[2]!==undefined&&arguments[2];if(!e)return new o["default"].MathNode("mrow");if(f[e.type]){var r=f[e.type](e,t);return n&&"mrow"===r.type&&1===r.children.length?r.children[0]:r}throw new s["default"]("Got group of unknown type: '"+e.type+"'")},b=function(e,t,n){var i=g(e,n),a=new o["default"].MathNode("mrow",i),s=new o["default"].MathNode("annotation",[new o["default"].TextNode(t)]);s.setAttribute("encoding","application/x-tex");var l=new o["default"].MathNode("semantics",[a,s]),u=new o["default"].MathNode("math",[l]);return(0,r.makeSpan)(["katex-mathml"],[u])};t.exports=b},{"./ParseError":29,"./Style":33,"./buildCommon":34,"./fontMetrics":41,"./mathMLTree":45,"./stretchy":47,"./symbols":48,"./utils":51}],37:[function(e,t){function n(e){return e&&e.__esModule?e:{"default":e}}var r=n(e("./buildHTML")),i=n(e("./buildMathML")),a=e("./buildCommon"),o=n(e("./Options")),s=n(e("./Settings")),l=n(e("./Style")),u=function(e,t,n){n=n||new s["default"]({});var u=l["default"].TEXT;n.displayMode&&(u=l["default"].DISPLAY);var d=new o["default"]({style:u}),c=(0,i["default"])(e,t,d),h=(0,r["default"])(e,d),p=(0,a.makeSpan)(["katex"],[c,h]);return n.displayMode?(0,a.makeSpan)(["katex-display"],[p]):p};t.exports=u},{"./Options":28,"./Settings":32,"./Style":33,"./buildCommon":34,"./buildHTML":35,"./buildMathML":36}],38:[function(e,t){function n(e){return e&&e.__esModule?e:{"default":e}}var r=n(e("./ParseError")),i=n(e("./Style")),a=e("./buildCommon"),o=n(a),s=n(e("./fontMetrics")),l=n(e("./symbols")),u=n(e("./utils")),d=function(e,t){return l["default"].math[e]&&l["default"].math[e].replace?s["default"].getCharacterMetrics(l["default"].math[e].replace,t):s["default"].getCharacterMetrics(e,t)},c=function(e,t,n,r){var i=n.havingBaseStyle(t),o=(0,a.makeSpan)((r||[]).concat(i.sizingClasses(n)),[e],n);return o.delimSizeMultiplier=i.sizeMultiplier/n.sizeMultiplier,o.height*=o.delimSizeMultiplier,o.depth*=o.delimSizeMultiplier,o.maxFontSize=i.sizeMultiplier,o},h=function(e,t,n){var r=t.havingBaseStyle(n),i=(1-t.sizeMultiplier/r.sizeMultiplier)*t.fontMetrics().axisHeight;e.classes.push("delimcenter"),e.style.top=i+"em",e.height-=i,e.depth+=i},p=function(e,t,n,r,i,a){var s=o["default"].makeSymbol(e,"Main-Regular",i,r),l=c(s,t,r,a);return n&&h(l,r,t),l},f=function(e,t,n,r){return o["default"].makeSymbol(e,"Size"+t+"-Regular",n,r)},m=function(e,t,n,r,o,s){var l=f(e,t,o,r),u=c((0,a.makeSpan)(["delimsizing","size"+t],[l],r),i["default"].TEXT,r,s);return n&&h(u,r,i["default"].TEXT),u},g=function(e,t,n){var r=void 0;return"Size1-Regular"===t?r="delim-size1":"Size4-Regular"===t&&(r="delim-size4"),{type:"elem",elem:(0,a.makeSpan)(["delimsizinginner",r],[(0,a.makeSpan)([],[o["default"].makeSymbol(e,t,n)])])}},v=function(e,t,n,r,s,l){var u=void 0,h=void 0,p=void 0,f=void 0;u=p=f=e,h=null;var m="Size1-Regular";"\\uparrow"===e?p=f="\u23d0":"\\Uparrow"===e?p=f="\u2016":"\\downarrow"===e?u=p="\u23d0":"\\Downarrow"===e?u=p="\u2016":"\\updownarrow"===e?(u="\\uparrow",p="\u23d0",f="\\downarrow"):"\\Updownarrow"===e?(u="\\Uparrow",p="\u2016",f="\\Downarrow"):"["===e||"\\lbrack"===e?(u="\u23a1",p="\u23a2",f="\u23a3",m="Size4-Regular"):"]"===e||"\\rbrack"===e?(u="\u23a4",p="\u23a5",f="\u23a6",m="Size4-Regular"):"\\lfloor"===e?(p=u="\u23a2",f="\u23a3",m="Size4-Regular"):"\\lceil"===e?(u="\u23a1",p=f="\u23a2",m="Size4-Regular"):"\\rfloor"===e?(p=u="\u23a5",f="\u23a6",m="Size4-Regular"):"\\rceil"===e?(u="\u23a4",p=f="\u23a5",m="Size4-Regular"):"("===e?(u="\u239b",p="\u239c",f="\u239d",m="Size4-Regular"):")"===e?(u="\u239e",p="\u239f",f="\u23a0",m="Size4-Regular"):"\\{"===e||"\\lbrace"===e?(u="\u23a7",h="\u23a8",f="\u23a9",p="\u23aa",m="Size4-Regular"):"\\}"===e||"\\rbrace"===e?(u="\u23ab",h="\u23ac",f="\u23ad",p="\u23aa",m="Size4-Regular"):"\\lgroup"===e?(u="\u23a7",f="\u23a9",p="\u23aa",m="Size4-Regular"):"\\rgroup"===e?(u="\u23ab",f="\u23ad",p="\u23aa",m="Size4-Regular"):"\\lmoustache"===e?(u="\u23a7",f="\u23ad",p="\u23aa",m="Size4-Regular"):"\\rmoustache"===e&&(u="\u23ab",f="\u23a9",p="\u23aa",m="Size4-Regular");var v=d(u,m),b=v.height+v.depth,y=d(p,m),x=y.height+y.depth,w=d(f,m),k=w.height+w.depth,M=0,S=1;if(null!==h){var z=d(h,m);M=z.height+z.depth,S=2}var A=b+k+M,C=Math.ceil((t-A)/(S*x)),T=A+C*S*x,N=r.fontMetrics().axisHeight;n&&(N*=r.sizeMultiplier);var E=T/2-N,R=[];if(R.push(g(f,m,s)),null===h)for(var L=0;L<C;L++)R.push(g(p,m,s));else{for(var O=0;O<C;O++)R.push(g(p,m,s));R.push(g(h,m,s));for(var q=0;q<C;q++)R.push(g(p,m,s))}R.push(g(u,m,s));var _=r.havingBaseStyle(i["default"].TEXT),D=o["default"].makeVList(R,"bottom",E,_);return c((0,a.makeSpan)(["delimsizing","mult"],[D],_),i["default"].TEXT,r,l)},b={main:"<svg viewBox='0 0 400000 1000' preserveAspectRatio='xMinYMin\nslice'><path d='M95 622c-2.667 0-7.167-2.667-13.5\n-8S72 604 72 600c0-2 .333-3.333 1-4 1.333-2.667 23.833-20.667 67.5-54s\n65.833-50.333 66.5-51c1.333-1.333 3-2 5-2 4.667 0 8.667 3.333 12 10l173\n378c.667 0 35.333-71 104-213s137.5-285 206.5-429S812 17.333 812 14c5.333\n-9.333 12-14 20-14h399166v40H845.272L620 507 385 993c-2.667 4.667-9 7-19\n7-6 0-10-1-12-3L160 575l-65 47zM834 0h399166v40H845z'/></svg>",1:"<svg viewBox='0 0 400000 1200' preserveAspectRatio='xMinYMin\nslice'><path d='M263 601c.667 0 18 39.667 52 119s68.167\n 158.667 102.5 238 51.833 119.333 52.5 120C810 373.333 980.667 17.667 982 11\nc4.667-7.333 11-11 19-11h398999v40H1012.333L741 607c-38.667 80.667-84 175-136\n 283s-89.167 185.333-111.5 232-33.833 70.333-34.5 71c-4.667 4.667-12.333 7-23\n 7l-12-1-109-253c-72.667-168-109.333-252-110-252-10.667 8-22 16.667-34 26-22\n 17.333-33.333 26-34 26l-26-26 76-59 76-60zM1001 0h398999v40H1012z'/></svg>",2:"<svg viewBox='0 0 400000 1800' preserveAspectRatio='xMinYMin\nslice'><path d='M1001 0h398999v40H1013.084S929.667 308 749\n 880s-277 876.333-289 913c-4.667 4.667-12.667 7-24 7h-12c-1.333-3.333-3.667\n-11.667-7-25-35.333-125.333-106.667-373.333-214-744-10 12-21 25-33 39l-32 39\nc-6-5.333-15-14-27-26l25-30c26.667-32.667 52-63 76-91l52-60 208 722c56-175.333\n 126.333-397.333 211-666s153.833-488.167 207.5-658.5C944.167 129.167 975 32.667\n 983 10c4-6.667 10-10 18-10zm0 0h398999v40H1013z'/></svg>",3:"<svg viewBox='0 0 400000 2400' preserveAspectRatio='xMinYMin\nslice'><path d='M424 2398c-1.333-.667-38.5-172-111.5-514\nS202.667 1370.667 202 1370c0-2-10.667 14.333-32 49-4.667 7.333-9.833 15.667\n-15.5 25s-9.833 16-12.5 20l-5 7c-4-3.333-8.333-7.667-13-13l-13-13 76-122 77-121\n 209 968c0-2 84.667-361.667 254-1079C896.333 373.667 981.667 13.333 983 10\nc4-6.667 10-10 18-10h398999v40H1014.622S927.332 418.667 742 1206c-185.333\n 787.333-279.333 1182.333-282 1185-2 6-10 9-24 9-8 0-12-.667-12-2z\nM1001 0h398999v40H1014z'/></svg>",4:"<svg viewBox='0 0 400000 3000' preserveAspectRatio='xMinYMin\nslice'><path d='M473 2713C812.333 913.667 982.333 13 983 11\nc3.333-7.333 9.333-11 18-11h399110v40H1017.698S927.168 518 741.5 1506C555.833\n 2494 462 2989 460 2991c-2 6-10 9-24 9-8 0-12-.667-12-2s-5.333-32-16-92c-50.667\n-293.333-119.667-693.333-207-1200 0-1.333-5.333 8.667-16 30l-32 64-16 33-26-26\n 76-153 77-151c.667.667 35.667 202 105 604 67.333 400.667 102 602.667 104 606z\nM1001 0h398999v40H1017z'/></svg>",tall:"l-4 4-4 4c-.667.667-2 1.5-4 2.5s-4.167 1.833-6.5 2.5-5.5 1-9.5 1h\n-12l-28-84c-16.667-52-96.667 -294.333-240-727l-212 -643 -85 170c-4-3.333-8.333\n-7.667-13 -13l-13-13l77-155 77-156c66 199.333 139 419.667 219 661 l218 661z\nM702 0H400000v40H742z'/></svg>"},y=function(e,t,n){var r=o["default"].makeSpan([],[],n),i=n.sizeMultiplier;if("small"===t.type)i=n.havingBaseStyle(t.style).sizeMultiplier/n.sizeMultiplier,r.height=1*i,r.style.height=r.height+"em",r.surdWidth=.833*i,r.innerHTML="<svg width='100%' height='"+r.height+"em'>\n            "+b.main+"</svg>";else if("large"===t.type)r.height=M[t.size]/i,r.style.height=r.height+"em",r.surdWidth=1/i,r.innerHTML='<svg width="100%" height="'+r.height+'em">\n            '+b[t.size]+"</svg>";else{r.height=e/i,r.style.height=r.height+"em",r.surdWidth=1.056/i;var a=Math.floor(1e3*r.height),s=a-54;r.innerHTML="<svg width='100%' height='"+r.height+"em'>\n            <svg viewBox='0 0 400000 "+a+"'\n            preserveAspectRatio='xMinYMax slice'>\n            <path d='M702 0H400000v40H742v"+s+"\n            "+b.tall+"</svg>"}return r.sizeMultiplier=i,r},x=["(",")","[","\\lbrack","]","\\rbrack","\\{","\\lbrace","\\}","\\rbrace","\\lfloor","\\rfloor","\\lceil","\\rceil","\\surd"],w=["\\uparrow","\\downarrow","\\updownarrow","\\Uparrow","\\Downarrow","\\Updownarrow","|","\\|","\\vert","\\Vert","\\lvert","\\rvert","\\lVert","\\rVert","\\lgroup","\\rgroup","\\lmoustache","\\rmoustache"],k=["<",">","\\langle","\\rangle","/","\\backslash","\\lt","\\gt"],M=[0,1.2,1.8,2.4,3],S=function(e,t,n,i,a){if("<"===e||"\\lt"===e?e="\\langle":">"!==e&&"\\gt"!==e||(e="\\rangle"),u["default"].contains(x,e)||u["default"].contains(k,e))return m(e,t,!1,n,i,a);if(u["default"].contains(w,e))return v(e,M[t],!1,n,i,a);throw new r["default"]("Illegal delimiter: '"+e+"'")},z=[{type:"small",style:i["default"].SCRIPTSCRIPT},{type:"small",style:i["default"].SCRIPT},{type:"small",style:i["default"].TEXT},{type:"large",size:1},{type:"large",size:2},{type:"large",size:3},{type:"large",size:4}],A=[{type:"small",style:i["default"].SCRIPTSCRIPT},{type:"small",style:i["default"].SCRIPT},{type:"small",style:i["default"].TEXT},{type:"stack"}],C=[{type:"small",style:i["default"].SCRIPTSCRIPT},{type:"small",style:i["default"].SCRIPT},{type:"small",style:i["default"].TEXT},{type:"large",size:1},{type:"large",size:2},{type:"large",size:3},{type:"large",size:4},{type:"stack"}],T=function(e){return"small"===e.type?"Main-Regular":"large"===e.type?"Size"+e.size+"-Regular":"stack"===e.type?"Size4-Regular":void 0},N=function(e,t,n,r){for(var i=Math.min(2,3-r.style.size);i<n.length&&"stack"!==n[i].type;i++){var a=d(e,T(n[i])),o=a.height+a.depth;if("small"===n[i].type&&(o*=r.havingBaseStyle(n[i].style).sizeMultiplier),o>t)return n[i]}return n[n.length-1]},E=function(e,t,n,r,i,a){"<"===e||"\\lt"===e?e="\\langle":">"!==e&&"\\gt"!==e||(e="\\rangle");var o=void 0;o=u["default"].contains(k,e)?z:u["default"].contains(x,e)?C:A;var s=N(e,t,o,r);return"\\surd"===e?y(t,s,r):"small"===s.type?p(e,s.style,n,r,i,a):"large"===s.type?m(e,s.size,n,r,i,a):"stack"===s.type?v(e,t,n,r,i,a):void 0},R=function(e,t,n,r,i,a){var o=r.fontMetrics().axisHeight*r.sizeMultiplier,s=901,l=5/r.fontMetrics().ptPerEm,u=Math.max(t-o,n+o),d=Math.max(u/500*s,2*u-l);return E(e,d,!0,r,i,a)};t.exports={sizedDelim:S,customSizedDelim:E,leftRightDelim:R}},{"./ParseError":29,"./Style":33,"./buildCommon":34,"./fontMetrics":41,"./symbols":48,"./utils":51}],39:[function(e,t){function n(e){return e&&e.__esModule?e:{"default":e}}var r=n(e("babel-runtime/helpers/classCallCheck")),i=n(e("babel-runtime/helpers/createClass")),a=n(e("./unicodeRegexes")),o=n(e("./utils")),s=function(e){for(var t=(e=e.slice()).length-1;t>=0;t--)e[t]||e.splice(t,1);return e.join(" ")},l=function(){function e(t,n,i){(0,r["default"])(this,e),this.classes=t||[],this.children=n||[],this.height=0,this.depth=0,this.maxFontSize=0,this.style={},this.attributes={},this.innerHTML,i&&(i.style.isTight()&&this.classes.push("mtight"),i.getColor()&&(this.style.color=i.getColor()))}return(0,i["default"])(e,[{key:"setAttribute",value:function(e,t){this.attributes[e]=t}},{key:"tryCombine",value:function(){return!1}},{key:"toNode",value:function(){var e=document.createElement("span");for(var t in e.className=s(this.classes),this.style)Object.prototype.hasOwnProperty.call(this.style,t)&&(e.style[t]=this.style[t]);for(var n in this.attributes)Object.prototype.hasOwnProperty.call(this.attributes,n)&&e.setAttribute(n,this.attributes[n]);this.innerHTML&&(e.innerHTML=this.innerHTML);for(var r=0;r<this.children.length;r++)e.appendChild(this.children[r].toNode());return e}},{key:"toMarkup",value:function(){var e="<span";this.classes.length&&(e+=' class="',e+=o["default"].escape(s(this.classes)),e+='"');var t="";for(var n in this.style)this.style.hasOwnProperty(n)&&(t+=o["default"].hyphenate(n)+":"+this.style[n]+";");for(var r in t&&(e+=' style="'+o["default"].escape(t)+'"'),this.attributes)Object.prototype.hasOwnProperty.call(this.attributes,r)&&(e+=" "+r+'="',e+=o["default"].escape(this.attributes[r]),e+='"');e+=">",this.innerHTML&&(e+=this.innerHTML);for(var i=0;i<this.children.length;i++)e+=this.children[i].toMarkup();return e+="</span>"}}]),e}(),u=function(){function e(t){(0,r["default"])(this,e),this.children=t||[],this.height=0,this.depth=0,this.maxFontSize=0}return(0,i["default"])(e,[{key:"toNode",value:function(){for(var e=document.createDocumentFragment(),t=0;t<this.children.length;t++)e.appendChild(this.children[t].toNode());return e}},{key:"toMarkup",value:function(){for(var e="",t=0;t<this.children.length;t++)e+=this.children[t].toMarkup();return e}}]),e}(),d={"\xee":"\u0131\u0302","\xef":"\u0131\u0308","\xed":"\u0131\u0301","\xec":"\u0131\u0300"},c=function(){function e(t,n,i,o,s,l,u){(0,r["default"])(this,e),this.value=t||"",this.height=n||0,this.depth=i||0,this.italic=o||0,this.skew=s||0,this.classes=l||[],this.style=u||{},this.maxFontSize=0,a["default"].cjkRegex.test(t)&&(a["default"].hangulRegex.test(t)?this.classes.push("hangul_fallback"):this.classes.push("cjk_fallback")),/[\xee\xef\xed\xec]/.test(this.value)&&(this.value=d[this.value])}return(0,i["default"])(e,[{key:"tryCombine",value:function(t){if(!t||!(t instanceof e)||this.italic>0||s(this.classes)!==s(t.classes)||this.skew!==t.skew||this.maxFontSize!==t.maxFontSize)return!1;for(var n in this.style)if(this.style.hasOwnProperty(n)&&this.style[n]!==t.style[n])return!1;for(var r in t.style)if(t.style.hasOwnProperty(r)&&this.style[r]!==t.style[r])return!1;return this.value+=t.value,this.height=Math.max(this.height,t.height),this.depth=Math.max(this.depth,t.depth),this.italic=t.italic,!0}},{key:"toNode",value:function(){var e=document.createTextNode(this.value),t=null;for(var n in this.italic>0&&((t=document.createElement("span")).style.marginRight=this.italic+"em"),this.classes.length>0&&((t=t||document.createElement("span")).className=s(this.classes)),this.style)this.style.hasOwnProperty(n)&&((t=t||document.createElement("span")).style[n]=this.style[n]);return t?(t.appendChild(e),t):e}},{key:"toMarkup",value:function(){var e=!1,t="<span";this.classes.length&&(e=!0,t+=' class="',t+=o["default"].escape(s(this.classes)),t+='"');var n="";for(var r in this.italic>0&&(n+="margin-right:"+this.italic+"em;"),this.style)this.style.hasOwnProperty(r)&&(n+=o["default"].hyphenate(r)+":"+this.style[r]+";");n&&(e=!0,t+=' style="'+o["default"].escape(n)+'"');var i=o["default"].escape(this.value);return e?(t+=">",t+=i,t+="</span>"):i}}]),e}();t.exports={span:l,documentFragment:u,symbolNode:c}},{"./unicodeRegexes":49,"./utils":51,"babel-runtime/helpers/classCallCheck":4,"babel-runtime/helpers/createClass":5}],40:[function(e,t){function n(e){return e&&e.__esModule?e:{"default":e}}function r(e,t,n){for(var r=[],i=[r],a=[];;){var l=e.parseExpression(!1,null);l=new o["default"]("ordgroup",l,e.mode),n&&(l=new o["default"]("styling",{style:n,value:[l]},e.mode)),r.push(l);var u=e.nextToken.text;if("&"===u)e.consume();else{if("\\end"===u)break;if("\\\\"!==u&&"\\cr"!==u)throw new s["default"]("Expected & or \\\\ or \\end",e.nextToken);var d=e.parseFunction();a.push(d.value.size),r=[],i.push(r)}}return t.body=i,t.rowGaps=a,new o["default"](t.type,t,e.mode)}function i(e,n,r){"string"==typeof e&&(e=[e]),"number"==typeof n&&(n={numArgs:n});for(var i={numArgs:n.numArgs||0,argTypes:n.argTypes,greediness:1,allowedInText:!!n.allowedInText,numOptionalArgs:n.numOptionalArgs||0,handler:r},a=0;a<e.length;++a)t.exports[e[a]]=i}function a(e){return"d"===e.substr(0,1)?"display":"text"}var o=n(e("./ParseNode")),s=n(e("./ParseError"));i(["array","darray"],{numArgs:1},function(e,t){var n=t[0],i={type:"array",cols:(n=n.value.map?n.value:[n]).map(function(e){var t=e.value;if(-1!=="lcr".indexOf(t))return{type:"align",align:t};if("|"===t)return{type:"separator",separator:"|"};throw new s["default"]("Unknown column alignment: "+e.value,e)}),hskipBeforeAndAfter:!0};return i=r(e.parser,i,a(e.envName))}),i(["matrix","pmatrix","bmatrix","Bmatrix","vmatrix","Vmatrix"],{},function(e){var t={matrix:null,pmatrix:["(",")"],bmatrix:["[","]"],Bmatrix:["\\{","\\}"],vmatrix:["|","|"],Vmatrix:["\\Vert","\\Vert"]}[e.envName],n={type:"array",hskipBeforeAndAfter:!1};return n=r(e.parser,n,a(e.envName)),t&&(n=new o["default"]("leftright",{body:[n],left:t[0],right:t[1]},e.mode)),n}),i(["cases","dcases"],{},function(e){var t={type:"array",arraystretch:1.2,cols:[{type:"align",align:"l",pregap:0,postgap:1},{type:"align",align:"l",pregap:0,postgap:0}]};return t=r(e.parser,t,a(e.envName)),t=new o["default"]("leftright",{body:[t],left:"\\{",right:"."},e.mode)}),i("aligned",{},function(e){var t={type:"array",cols:[],addJot:!0};t=r(e.parser,t,"display");var n=new o["default"]("ordgroup",[],e.mode),i=0;t.value.body.forEach(function(e){for(var t=1;t<e.length;t+=2){e[t].value.value[0].value.unshift(n)}i<e.length&&(i=e.length)});for(var a=0;a<i;++a){var s="r",l=0;a%2==1?s="l":a>0&&(l=2),t.value.cols[a]={type:"align",align:s,pregap:l,postgap:0}}return t}),i("gathered",{},function(e){var t={type:"array",cols:[{type:"align",align:"c"}],addJot:!0};return t=r(e.parser,t,"display")})},{"./ParseError":29,"./ParseNode":30}],41:[function(e,t){function n(e){return e&&e.__esModule?e:{"default":e}}var r=e("./unicodeRegexes"),i=n(e("./fontMetricsData")),a={slant:[.25,.25,.25],space:[0,0,0],stretch:[0,0,0],shrink:[0,0,0],xHeight:[.431,.431,.431],quad:[1,1.171,1.472],extraSpace:[0,0,0],num1:[.677,.732,.925],num2:[.394,.384,.387],num3:[.444,.471,.504],denom1:[.686,.752,1.025],denom2:[.345,.344,.532],sup1:[.413,.503,.504],sup2:[.363,.431,.404],sup3:[.289,.286,.294],sub1:[.15,.143,.2],sub2:[.247,.286,.4],supDrop:[.386,.353,.494],subDrop:[.05,.071,.1],delim1:[2.39,1.7,1.98],delim2:[1.01,1.157,1.42],axisHeight:[.25,.25,.25],defaultRuleThickness:[.04,.049,.049],bigOpSpacing1:[.111,.111,.111],bigOpSpacing2:[.166,.166,.166],bigOpSpacing3:[.2,.2,.2],bigOpSpacing4:[.6,.611,.611],bigOpSpacing5:[.1,.143,.143],sqrtRuleThickness:[.04,.04,.04],ptPerEm:[10,10,10],doubleRuleSep:[.2,.2,.2]},o={"\xc0":"A","\xc1":"A","\xc2":"A","\xc3":"A","\xc4":"A","\xc5":"A","\xc6":"A","\xc7":"C","\xc8":"E","\xc9":"E","\xca":"E","\xcb":"E","\xcc":"I","\xcd":"I","\xce":"I","\xcf":"I","\xd0":"D","\xd1":"N","\xd2":"O","\xd3":"O","\xd4":"O","\xd5":"O","\xd6":"O","\xd8":"O","\xd9":"U","\xda":"U","\xdb":"U","\xdc":"U","\xdd":"Y","\xde":"o","\xdf":"B","\xe0":"a","\xe1":"a","\xe2":"a","\xe3":"a","\xe4":"a","\xe5":"a","\xe6":"a","\xe7":"c","\xe8":"e","\xe9":"e","\xea":"e","\xeb":"e","\xec":"i","\xed":"i","\xee":"i","\xef":"i","\xf0":"d","\xf1":"n","\xf2":"o","\xf3":"o","\xf4":"o","\xf5":"o","\xf6":"o","\xf8":"o","\xf9":"u","\xfa":"u","\xfb":"u","\xfc":"u","\xfd":"y","\xfe":"o","\xff":"y","\u0410":"A","\u0411":"B","\u0412":"B","\u0413":"F","\u0414":"A","\u0415":"E","\u0416":"K","\u0417":"3","\u0418":"N","\u0419":"N","\u041a":"K","\u041b":"N","\u041c":"M","\u041d":"H","\u041e":"O","\u041f":"N","\u0420":"P","\u0421":"C","\u0422":"T","\u0423":"y","\u0424":"O","\u0425":"X","\u0426":"U","\u0427":"h","\u0428":"W","\u0429":"W","\u042a":"B","\u042b":"X","\u042c":"B","\u042d":"3","\u042e":"X","\u042f":"R","\u0430":"a","\u0431":"b","\u0432":"a","\u0433":"r","\u0434":"y","\u0435":"e","\u0436":"m","\u0437":"e","\u0438":"n","\u0439":"n","\u043a":"n","\u043b":"n","\u043c":"m","\u043d":"n","\u043e":"o","\u043f":"n","\u0440":"p","\u0441":"c","\u0442":"o","\u0443":"y","\u0444":"b","\u0445":"x","\u0446":"n","\u0447":"n","\u0448":"w","\u0449":"w","\u044a":"a","\u044b":"m","\u044c":"a","\u044d":"e","\u044e":"m","\u044f":"r"},s=function(e,t){var n=e.charCodeAt(0);e[0]in o?n=o[e[0]].charCodeAt(0):r.cjkRegex.test(e[0])&&(n="M".charCodeAt(0));var a=i["default"][t][n];if(a)return{depth:a[0],height:a[1],italic:a[2],skew:a[3],width:a[4]}},l={},u=function(e){var t=void 0;if(!l[t=e>=5?0:e>=3?1:2]){var n=l[t]={};for(var r in a)a.hasOwnProperty(r)&&(n[r]=a[r][t]);n.cssEmPerMu=n.quad/18}return l[t]};t.exports={getFontMetrics:u,getCharacterMetrics:s}},{"./fontMetricsData":42,"./unicodeRegexes":49}],42:[function(e,t){t.exports={"AMS-Regular":{65:[0,.68889,0,0],66:[0,.68889,0,0],67:[0,.68889,0,0],68:[0,.68889,0,0],69:[0,.68889,0,0],70:[0,.68889,0,0],71:[0,.68889,0,0],72:[0,.68889,0,0],73:[0,.68889,0,0],74:[.16667,.68889,0,0],75:[0,.68889,0,0],76:[0,.68889,0,0],77:[0,.68889,0,0],78:[0,.68889,0,0],79:[.16667,.68889,0,0],80:[0,.68889,0,0],81:[.16667,.68889,0,0],82:[0,.68889,0,0],83:[0,.68889,0,0],84:[0,.68889,0,0],85:[0,.68889,0,0],86:[0,.68889,0,0],87:[0,.68889,0,0],88:[0,.68889,0,0],89:[0,.68889,0,0],90:[0,.68889,0,0],107:[0,.68889,0,0],165:[0,.675,.025,0],174:[.15559,.69224,0,0],240:[0,.68889,0,0],295:[0,.68889,0,0],710:[0,.825,0,0],732:[0,.9,0,0],770:[0,.825,0,0],771:[0,.9,0,0],989:[.08167,.58167,0,0],1008:[0,.43056,.04028,0],8245:[0,.54986,0,0],8463:[0,.68889,0,0],8487:[0,.68889,0,0],8498:[0,.68889,0,0],8502:[0,.68889,0,0],8503:[0,.68889,0,0],8504:[0,.68889,0,0],8513:[0,.68889,0,0],8592:[-.03598,.46402,0,0],8594:[-.03598,.46402,0,0],8602:[-.13313,.36687,0,0],8603:[-.13313,.36687,0,0],8606:[.01354,.52239,0,0],8608:[.01354,.52239,0,0],8610:[.01354,.52239,0,0],8611:[.01354,.52239,0,0],8619:[0,.54986,0,0],8620:[0,.54986,0,0],8621:[-.13313,.37788,0,0],8622:[-.13313,.36687,0,0],8624:[0,.69224,0,0],8625:[0,.69224,0,0],8630:[0,.43056,0,0],8631:[0,.43056,0,0],8634:[.08198,.58198,0,0],8635:[.08198,.58198,0,0],8638:[.19444,.69224,0,0],8639:[.19444,.69224,0,0],8642:[.19444,.69224,0,0],8643:[.19444,.69224,0,0],8644:[.1808,.675,0,0],8646:[.1808,.675,0,0],8647:[.1808,.675,0,0],8648:[.19444,.69224,0,0],8649:[.1808,.675,0,0],8650:[.19444,.69224,0,0],8651:[.01354,.52239,0,0],8652:[.01354,.52239,0,0],8653:[-.13313,.36687,0,0],8654:[-.13313,.36687,0,0],8655:[-.13313,.36687,0,0],8666:[.13667,.63667,0,0],8667:[.13667,.63667,0,0],8669:[-.13313,.37788,0,0],8672:[-.064,.437,0,0],8674:[-.064,.437,0,0],8705:[0,.825,0,0],8708:[0,.68889,0,0],8709:[.08167,.58167,0,0],8717:[0,.43056,0,0],8722:[-.03598,.46402,0,0],8724:[.08198,.69224,0,0],8726:[.08167,.58167,0,0],8733:[0,.69224,0,0],8736:[0,.69224,0,0],8737:[0,.69224,0,0],8738:[.03517,.52239,0,0],8739:[.08167,.58167,0,0],8740:[.25142,.74111,0,0],8741:[.08167,.58167,0,0],8742:[.25142,.74111,0,0],8756:[0,.69224,0,0],8757:[0,.69224,0,0],8764:[-.13313,.36687,0,0],8765:[-.13313,.37788,0,0],8769:[-.13313,.36687,0,0],8770:[-.03625,.46375,0,0],8774:[.30274,.79383,0,0],8776:[-.01688,.48312,0,0],8778:[.08167,.58167,0,0],8782:[.06062,.54986,0,0],8783:[.06062,.54986,0,0],8785:[.08198,.58198,0,0],8786:[.08198,.58198,0,0],8787:[.08198,.58198,0,0],8790:[0,.69224,0,0],8791:[.22958,.72958,0,0],8796:[.08198,.91667,0,0],8806:[.25583,.75583,0,0],8807:[.25583,.75583,0,0],8808:[.25142,.75726,0,0],8809:[.25142,.75726,0,0],8812:[.25583,.75583,0,0],8814:[.20576,.70576,0,0],8815:[.20576,.70576,0,0],8816:[.30274,.79383,0,0],8817:[.30274,.79383,0,0],8818:[.22958,.72958,0,0],8819:[.22958,.72958,0,0],8822:[.1808,.675,0,0],8823:[.1808,.675,0,0],8828:[.13667,.63667,0,0],8829:[.13667,.63667,0,0],8830:[.22958,.72958,0,0],8831:[.22958,.72958,0,0],8832:[.20576,.70576,0,0],8833:[.20576,.70576,0,0],8840:[.30274,.79383,0,0],8841:[.30274,.79383,0,0],8842:[.13597,.63597,0,0],8843:[.13597,.63597,0,0],8847:[.03517,.54986,0,0],8848:[.03517,.54986,0,0],8858:[.08198,.58198,0,0],8859:[.08198,.58198,0,0],8861:[.08198,.58198,0,0],8862:[0,.675,0,0],8863:[0,.675,0,0],8864:[0,.675,0,0],8865:[0,.675,0,0],8872:[0,.69224,0,0],8873:[0,.69224,0,0],8874:[0,.69224,0,0],8876:[0,.68889,0,0],8877:[0,.68889,0,0],8878:[0,.68889,0,0],8879:[0,.68889,0,0],8882:[.03517,.54986,0,0],8883:[.03517,.54986,0,0],8884:[.13667,.63667,0,0],8885:[.13667,.63667,0,0],8888:[0,.54986,0,0],8890:[.19444,.43056,0,0],8891:[.19444,.69224,0,0],8892:[.19444,.69224,0,0],8901:[0,.54986,0,0],8903:[.08167,.58167,0,0],8905:[.08167,.58167,0,0],8906:[.08167,.58167,0,0],8907:[0,.69224,0,0],8908:[0,.69224,0,0],8909:[-.03598,.46402,0,0],8910:[0,.54986,0,0],8911:[0,.54986,0,0],8912:[.03517,.54986,0,0],8913:[.03517,.54986,0,0],8914:[0,.54986,0,0],8915:[0,.54986,0,0],8916:[0,.69224,0,0],8918:[.0391,.5391,0,0],8919:[.0391,.5391,0,0],8920:[.03517,.54986,0,0],8921:[.03517,.54986,0,0],8922:[.38569,.88569,0,0],8923:[.38569,.88569,0,0],8926:[.13667,.63667,0,0],8927:[.13667,.63667,0,0],8928:[.30274,.79383,0,0],8929:[.30274,.79383,0,0],8934:[.23222,.74111,0,0],8935:[.23222,.74111,0,0],8936:[.23222,.74111,0,0],8937:[.23222,.74111,0,0],8938:[.20576,.70576,0,0],8939:[.20576,.70576,0,0],8940:[.30274,.79383,0,0],8941:[.30274,.79383,0,0],8994:[.19444,.69224,0,0],8995:[.19444,.69224,0,0],9416:[.15559,.69224,0,0],9484:[0,.69224,0,0],9488:[0,.69224,0,0],9492:[0,.37788,0,0],9496:[0,.37788,0,0],9585:[.19444,.68889,0,0],9586:[.19444,.74111,0,0],9632:[0,.675,0,0],9633:[0,.675,0,0],9650:[0,.54986,0,0],9651:[0,.54986,0,0],9654:[.03517,.54986,0,0],9660:[0,.54986,0,0],9661:[0,.54986,0,0],9664:[.03517,.54986,0,0],9674:[.11111,.69224,0,0],9733:[.19444,.69224,0,0],10003:[0,.69224,0,0],10016:[0,.69224,0,0],10731:[.11111,.69224,0,0],10846:[.19444,.75583,0,0],10877:[.13667,.63667,0,0],10878:[.13667,.63667,0,0],10885:[.25583,.75583,0,0],10886:[.25583,.75583,0,0],10887:[.13597,.63597,0,0],10888:[.13597,.63597,0,0],10889:[.26167,.75726,0,0],10890:[.26167,.75726,0,0],10891:[.48256,.98256,0,0],10892:[.48256,.98256,0,0],10901:[.13667,.63667,0,0],10902:[.13667,.63667,0,0],10933:[.25142,.75726,0,0],10934:[.25142,.75726,0,0],10935:[.26167,.75726,0,0],10936:[.26167,.75726,0,0],10937:[.26167,.75726,0,0],10938:[.26167,.75726,0,0],10949:[.25583,.75583,0,0],10950:[.25583,.75583,0,0],10955:[.28481,.79383,0,0],10956:[.28481,.79383,0,0],57350:[.08167,.58167,0,0],57351:[.08167,.58167,0,0],57352:[.08167,.58167,0,0],57353:[0,.43056,.04028,0],57356:[.25142,.75726,0,0],57357:[.25142,.75726,0,0],57358:[.41951,.91951,0,0],57359:[.30274,.79383,0,0],57360:[.30274,.79383,0,0],57361:[.41951,.91951,0,0],57366:[.25142,.75726,0,0],57367:[.25142,.75726,0,0],57368:[.25142,.75726,0,0],57369:[.25142,.75726,0,0],57370:[.13597,.63597,0,0],57371:[.13597,.63597,0,0]},"Caligraphic-Regular":{48:[0,.43056,0,0],49:[0,.43056,0,0],50:[0,.43056,0,0],51:[.19444,.43056,0,0],52:[.19444,.43056,0,0],53:[.19444,.43056,0,0],54:[0,.64444,0,0],55:[.19444,.43056,0,0],56:[0,.64444,0,0],57:[.19444,.43056,0,0],65:[0,.68333,0,.19445],66:[0,.68333,.03041,.13889],67:[0,.68333,.05834,.13889],
68:[0,.68333,.02778,.08334],69:[0,.68333,.08944,.11111],70:[0,.68333,.09931,.11111],71:[.09722,.68333,.0593,.11111],72:[0,.68333,.00965,.11111],73:[0,.68333,.07382,0],74:[.09722,.68333,.18472,.16667],75:[0,.68333,.01445,.05556],76:[0,.68333,0,.13889],77:[0,.68333,0,.13889],78:[0,.68333,.14736,.08334],79:[0,.68333,.02778,.11111],80:[0,.68333,.08222,.08334],81:[.09722,.68333,0,.11111],82:[0,.68333,0,.08334],83:[0,.68333,.075,.13889],84:[0,.68333,.25417,0],85:[0,.68333,.09931,.08334],86:[0,.68333,.08222,0],87:[0,.68333,.08222,.08334],88:[0,.68333,.14643,.13889],89:[.09722,.68333,.08222,.08334],90:[0,.68333,.07944,.13889]},"Fraktur-Regular":{33:[0,.69141,0,0],34:[0,.69141,0,0],38:[0,.69141,0,0],39:[0,.69141,0,0],40:[.24982,.74947,0,0],41:[.24982,.74947,0,0],42:[0,.62119,0,0],43:[.08319,.58283,0,0],44:[0,.10803,0,0],45:[.08319,.58283,0,0],46:[0,.10803,0,0],47:[.24982,.74947,0,0],48:[0,.47534,0,0],49:[0,.47534,0,0],50:[0,.47534,0,0],51:[.18906,.47534,0,0],52:[.18906,.47534,0,0],53:[.18906,.47534,0,0],54:[0,.69141,0,0],55:[.18906,.47534,0,0],56:[0,.69141,0,0],57:[.18906,.47534,0,0],58:[0,.47534,0,0],59:[.12604,.47534,0,0],61:[-.13099,.36866,0,0],63:[0,.69141,0,0],65:[0,.69141,0,0],66:[0,.69141,0,0],67:[0,.69141,0,0],68:[0,.69141,0,0],69:[0,.69141,0,0],70:[.12604,.69141,0,0],71:[0,.69141,0,0],72:[.06302,.69141,0,0],73:[0,.69141,0,0],74:[.12604,.69141,0,0],75:[0,.69141,0,0],76:[0,.69141,0,0],77:[0,.69141,0,0],78:[0,.69141,0,0],79:[0,.69141,0,0],80:[.18906,.69141,0,0],81:[.03781,.69141,0,0],82:[0,.69141,0,0],83:[0,.69141,0,0],84:[0,.69141,0,0],85:[0,.69141,0,0],86:[0,.69141,0,0],87:[0,.69141,0,0],88:[0,.69141,0,0],89:[.18906,.69141,0,0],90:[.12604,.69141,0,0],91:[.24982,.74947,0,0],93:[.24982,.74947,0,0],94:[0,.69141,0,0],97:[0,.47534,0,0],98:[0,.69141,0,0],99:[0,.47534,0,0],100:[0,.62119,0,0],101:[0,.47534,0,0],102:[.18906,.69141,0,0],103:[.18906,.47534,0,0],104:[.18906,.69141,0,0],105:[0,.69141,0,0],106:[0,.69141,0,0],107:[0,.69141,0,0],108:[0,.69141,0,0],109:[0,.47534,0,0],110:[0,.47534,0,0],111:[0,.47534,0,0],112:[.18906,.52396,0,0],113:[.18906,.47534,0,0],114:[0,.47534,0,0],115:[0,.47534,0,0],116:[0,.62119,0,0],117:[0,.47534,0,0],118:[0,.52396,0,0],119:[0,.52396,0,0],120:[.18906,.47534,0,0],121:[.18906,.47534,0,0],122:[.18906,.47534,0,0],8216:[0,.69141,0,0],8217:[0,.69141,0,0],58112:[0,.62119,0,0],58113:[0,.62119,0,0],58114:[.18906,.69141,0,0],58115:[.18906,.69141,0,0],58116:[.18906,.47534,0,0],58117:[0,.69141,0,0],58118:[0,.62119,0,0],58119:[0,.47534,0,0]},"Main-Bold":{33:[0,.69444,0,0],34:[0,.69444,0,0],35:[.19444,.69444,0,0],36:[.05556,.75,0,0],37:[.05556,.75,0,0],38:[0,.69444,0,0],39:[0,.69444,0,0],40:[.25,.75,0,0],41:[.25,.75,0,0],42:[0,.75,0,0],43:[.13333,.63333,0,0],44:[.19444,.15556,0,0],45:[0,.44444,0,0],46:[0,.15556,0,0],47:[.25,.75,0,0],48:[0,.64444,0,0],49:[0,.64444,0,0],50:[0,.64444,0,0],51:[0,.64444,0,0],52:[0,.64444,0,0],53:[0,.64444,0,0],54:[0,.64444,0,0],55:[0,.64444,0,0],56:[0,.64444,0,0],57:[0,.64444,0,0],58:[0,.44444,0,0],59:[.19444,.44444,0,0],60:[.08556,.58556,0,0],61:[-.10889,.39111,0,0],62:[.08556,.58556,0,0],63:[0,.69444,0,0],64:[0,.69444,0,0],65:[0,.68611,0,0],66:[0,.68611,0,0],67:[0,.68611,0,0],68:[0,.68611,0,0],69:[0,.68611,0,0],70:[0,.68611,0,0],71:[0,.68611,0,0],72:[0,.68611,0,0],73:[0,.68611,0,0],74:[0,.68611,0,0],75:[0,.68611,0,0],76:[0,.68611,0,0],77:[0,.68611,0,0],78:[0,.68611,0,0],79:[0,.68611,0,0],80:[0,.68611,0,0],81:[.19444,.68611,0,0],82:[0,.68611,0,0],83:[0,.68611,0,0],84:[0,.68611,0,0],85:[0,.68611,0,0],86:[0,.68611,.01597,0],87:[0,.68611,.01597,0],88:[0,.68611,0,0],89:[0,.68611,.02875,0],90:[0,.68611,0,0],91:[.25,.75,0,0],92:[.25,.75,0,0],93:[.25,.75,0,0],94:[0,.69444,0,0],95:[.31,.13444,.03194,0],96:[0,.69444,0,0],97:[0,.44444,0,0],98:[0,.69444,0,0],99:[0,.44444,0,0],100:[0,.69444,0,0],101:[0,.44444,0,0],102:[0,.69444,.10903,0],103:[.19444,.44444,.01597,0],104:[0,.69444,0,0],105:[0,.69444,0,0],106:[.19444,.69444,0,0],107:[0,.69444,0,0],108:[0,.69444,0,0],109:[0,.44444,0,0],110:[0,.44444,0,0],111:[0,.44444,0,0],112:[.19444,.44444,0,0],113:[.19444,.44444,0,0],114:[0,.44444,0,0],115:[0,.44444,0,0],116:[0,.63492,0,0],117:[0,.44444,0,0],118:[0,.44444,.01597,0],119:[0,.44444,.01597,0],120:[0,.44444,0,0],121:[.19444,.44444,.01597,0],122:[0,.44444,0,0],123:[.25,.75,0,0],124:[.25,.75,0,0],125:[.25,.75,0,0],126:[.35,.34444,0,0],168:[0,.69444,0,0],172:[0,.44444,0,0],175:[0,.59611,0,0],176:[0,.69444,0,0],177:[.13333,.63333,0,0],180:[0,.69444,0,0],215:[.13333,.63333,0,0],247:[.13333,.63333,0,0],305:[0,.44444,0,0],567:[.19444,.44444,0,0],710:[0,.69444,0,0],711:[0,.63194,0,0],713:[0,.59611,0,0],714:[0,.69444,0,0],715:[0,.69444,0,0],728:[0,.69444,0,0],729:[0,.69444,0,0],730:[0,.69444,0,0],732:[0,.69444,0,0],768:[0,.69444,0,0],769:[0,.69444,0,0],770:[0,.69444,0,0],771:[0,.69444,0,0],772:[0,.59611,0,0],774:[0,.69444,0,0],775:[0,.69444,0,0],776:[0,.69444,0,0],778:[0,.69444,0,0],779:[0,.69444,0,0],780:[0,.63194,0,0],824:[.19444,.69444,0,0],915:[0,.68611,0,0],916:[0,.68611,0,0],920:[0,.68611,0,0],923:[0,.68611,0,0],926:[0,.68611,0,0],928:[0,.68611,0,0],931:[0,.68611,0,0],933:[0,.68611,0,0],934:[0,.68611,0,0],936:[0,.68611,0,0],937:[0,.68611,0,0],8211:[0,.44444,.03194,0],8212:[0,.44444,.03194,0],8216:[0,.69444,0,0],8217:[0,.69444,0,0],8220:[0,.69444,0,0],8221:[0,.69444,0,0],8224:[.19444,.69444,0,0],8225:[.19444,.69444,0,0],8242:[0,.55556,0,0],8407:[0,.72444,.15486,0],8463:[0,.69444,0,0],8465:[0,.69444,0,0],8467:[0,.69444,0,0],8472:[.19444,.44444,0,0],8476:[0,.69444,0,0],8501:[0,.69444,0,0],8592:[-.10889,.39111,0,0],8593:[.19444,.69444,0,0],8594:[-.10889,.39111,0,0],8595:[.19444,.69444,0,0],8596:[-.10889,.39111,0,0],8597:[.25,.75,0,0],8598:[.19444,.69444,0,0],8599:[.19444,.69444,0,0],8600:[.19444,.69444,0,0],8601:[.19444,.69444,0,0],8636:[-.10889,.39111,0,0],8637:[-.10889,.39111,0,0],8640:[-.10889,.39111,0,0],8641:[-.10889,.39111,0,0],8656:[-.10889,.39111,0,0],8657:[.19444,.69444,0,0],8658:[-.10889,.39111,0,0],8659:[.19444,.69444,0,0],8660:[-.10889,.39111,0,0],8661:[.25,.75,0,0],8704:[0,.69444,0,0],8706:[0,.69444,.06389,0],8707:[0,.69444,0,0],8709:[.05556,.75,0,0],8711:[0,.68611,0,0],8712:[.08556,.58556,0,0],8715:[.08556,.58556,0,0],8722:[.13333,.63333,0,0],8723:[.13333,.63333,0,0],8725:[.25,.75,0,0],8726:[.25,.75,0,0],8727:[-.02778,.47222,0,0],8728:[-.02639,.47361,0,0],8729:[-.02639,.47361,0,0],8730:[.18,.82,0,0],8733:[0,.44444,0,0],8734:[0,.44444,0,0],8736:[0,.69224,0,0],8739:[.25,.75,0,0],8741:[.25,.75,0,0],8743:[0,.55556,0,0],8744:[0,.55556,0,0],8745:[0,.55556,0,0],8746:[0,.55556,0,0],8747:[.19444,.69444,.12778,0],8764:[-.10889,.39111,0,0],8768:[.19444,.69444,0,0],8771:[.00222,.50222,0,0],8776:[.02444,.52444,0,0],8781:[.00222,.50222,0,0],8801:[.00222,.50222,0,0],8804:[.19667,.69667,0,0],8805:[.19667,.69667,0,0],8810:[.08556,.58556,0,0],8811:[.08556,.58556,0,0],8826:[.08556,.58556,0,0],8827:[.08556,.58556,0,0],8834:[.08556,.58556,0,0],8835:[.08556,.58556,0,0],8838:[.19667,.69667,0,0],8839:[.19667,.69667,0,0],8846:[0,.55556,0,0],8849:[.19667,.69667,0,0],8850:[.19667,.69667,0,0],8851:[0,.55556,0,0],8852:[0,.55556,0,0],8853:[.13333,.63333,0,0],8854:[.13333,.63333,0,0],8855:[.13333,.63333,0,0],8856:[.13333,.63333,0,0],8857:[.13333,.63333,0,0],8866:[0,.69444,0,0],8867:[0,.69444,0,0],8868:[0,.69444,0,0],8869:[0,.69444,0,0],8900:[-.02639,.47361,0,0],8901:[-.02639,.47361,0,0],8902:[-.02778,.47222,0,0],8968:[.25,.75,0,0],8969:[.25,.75,0,0],8970:[.25,.75,0,0],8971:[.25,.75,0,0],8994:[-.13889,.36111,0,0],8995:[-.13889,.36111,0,0],9651:[.19444,.69444,0,0],9657:[-.02778,.47222,0,0],9661:[.19444,.69444,0,0],9667:[-.02778,.47222,0,0],9711:[.19444,.69444,0,0],9824:[.12963,.69444,0,0],9825:[.12963,.69444,0,0],9826:[.12963,.69444,0,0],9827:[.12963,.69444,0,0],9837:[0,.75,0,0],9838:[.19444,.69444,0,0],9839:[.19444,.69444,0,0],10216:[.25,.75,0,0],10217:[.25,.75,0,0],10815:[0,.68611,0,0],10927:[.19667,.69667,0,0],10928:[.19667,.69667,0,0]},"Main-Italic":{33:[0,.69444,.12417,0],34:[0,.69444,.06961,0],35:[.19444,.69444,.06616,0],37:[.05556,.75,.13639,0],38:[0,.69444,.09694,0],39:[0,.69444,.12417,0],40:[.25,.75,.16194,0],41:[.25,.75,.03694,0],42:[0,.75,.14917,0],43:[.05667,.56167,.03694,0],44:[.19444,.10556,0,0],45:[0,.43056,.02826,0],46:[0,.10556,0,0],47:[.25,.75,.16194,0],48:[0,.64444,.13556,0],49:[0,.64444,.13556,0],50:[0,.64444,.13556,0],51:[0,.64444,.13556,0],52:[.19444,.64444,.13556,0],53:[0,.64444,.13556,0],54:[0,.64444,.13556,0],55:[.19444,.64444,.13556,0],56:[0,.64444,.13556,0],57:[0,.64444,.13556,0],58:[0,.43056,.0582,0],59:[.19444,.43056,.0582,0],61:[-.13313,.36687,.06616,0],63:[0,.69444,.1225,0],64:[0,.69444,.09597,0],65:[0,.68333,0,0],66:[0,.68333,.10257,0],67:[0,.68333,.14528,0],68:[0,.68333,.09403,0],69:[0,.68333,.12028,0],70:[0,.68333,.13305,0],71:[0,.68333,.08722,0],72:[0,.68333,.16389,0],73:[0,.68333,.15806,0],74:[0,.68333,.14028,0],75:[0,.68333,.14528,0],76:[0,.68333,0,0],77:[0,.68333,.16389,0],78:[0,.68333,.16389,0],79:[0,.68333,.09403,0],80:[0,.68333,.10257,0],81:[.19444,.68333,.09403,0],82:[0,.68333,.03868,0],83:[0,.68333,.11972,0],84:[0,.68333,.13305,0],85:[0,.68333,.16389,0],86:[0,.68333,.18361,0],87:[0,.68333,.18361,0],88:[0,.68333,.15806,0],89:[0,.68333,.19383,0],90:[0,.68333,.14528,0],91:[.25,.75,.1875,0],93:[.25,.75,.10528,0],94:[0,.69444,.06646,0],95:[.31,.12056,.09208,0],97:[0,.43056,.07671,0],98:[0,.69444,.06312,0],99:[0,.43056,.05653,0],100:[0,.69444,.10333,0],101:[0,.43056,.07514,0],102:[.19444,.69444,.21194,0],103:[.19444,.43056,.08847,0],104:[0,.69444,.07671,0],105:[0,.65536,.1019,0],106:[.19444,.65536,.14467,0],107:[0,.69444,.10764,0],108:[0,.69444,.10333,0],109:[0,.43056,.07671,0],110:[0,.43056,.07671,0],111:[0,.43056,.06312,0],112:[.19444,.43056,.06312,0],113:[.19444,.43056,.08847,0],114:[0,.43056,.10764,0],115:[0,.43056,.08208,0],116:[0,.61508,.09486,0],117:[0,.43056,.07671,0],118:[0,.43056,.10764,0],119:[0,.43056,.10764,0],120:[0,.43056,.12042,0],121:[.19444,.43056,.08847,0],122:[0,.43056,.12292,0],126:[.35,.31786,.11585,0],163:[0,.69444,0,0],305:[0,.43056,0,.02778],567:[.19444,.43056,0,.08334],768:[0,.69444,0,0],769:[0,.69444,.09694,0],770:[0,.69444,.06646,0],771:[0,.66786,.11585,0],772:[0,.56167,.10333,0],774:[0,.69444,.10806,0],775:[0,.66786,.11752,0],776:[0,.66786,.10474,0],778:[0,.69444,0,0],779:[0,.69444,.1225,0],780:[0,.62847,.08295,0],915:[0,.68333,.13305,0],916:[0,.68333,0,0],920:[0,.68333,.09403,0],923:[0,.68333,0,0],926:[0,.68333,.15294,0],928:[0,.68333,.16389,0],931:[0,.68333,.12028,0],933:[0,.68333,.11111,0],934:[0,.68333,.05986,0],936:[0,.68333,.11111,0],937:[0,.68333,.10257,0],8211:[0,.43056,.09208,0],8212:[0,.43056,.09208,0],8216:[0,.69444,.12417,0],8217:[0,.69444,.12417,0],8220:[0,.69444,.1685,0],8221:[0,.69444,.06961,0],8463:[0,.68889,0,0]},"Main-Regular":{32:[0,0,0,0],33:[0,.69444,0,0],34:[0,.69444,0,0],35:[.19444,.69444,0,0],36:[.05556,.75,0,0],37:[.05556,.75,0,0],38:[0,.69444,0,0],39:[0,.69444,0,0],40:[.25,.75,0,0],41:[.25,.75,0,0],42:[0,.75,0,0],43:[.08333,.58333,0,0],44:[.19444,.10556,0,0],45:[0,.43056,0,0],46:[0,.10556,0,0],47:[.25,.75,0,0],48:[0,.64444,0,0],49:[0,.64444,0,0],50:[0,.64444,0,0],51:[0,.64444,0,0],52:[0,.64444,0,0],53:[0,.64444,0,0],54:[0,.64444,0,0],55:[0,.64444,0,0],56:[0,.64444,0,0],57:[0,.64444,0,0],58:[0,.43056,0,0],59:[.19444,.43056,0,0],60:[.0391,.5391,0,0],61:[-.13313,.36687,0,0],62:[.0391,.5391,0,0],63:[0,.69444,0,0],64:[0,.69444,0,0],65:[0,.68333,0,0],66:[0,.68333,0,0],67:[0,.68333,0,0],68:[0,.68333,0,0],69:[0,.68333,0,0],70:[0,.68333,0,0],71:[0,.68333,0,0],72:[0,.68333,0,0],73:[0,.68333,0,0],74:[0,.68333,0,0],75:[0,.68333,0,0],76:[0,.68333,0,0],77:[0,.68333,0,0],78:[0,.68333,0,0],79:[0,.68333,0,0],80:[0,.68333,0,0],81:[.19444,.68333,0,0],82:[0,.68333,0,0],83:[0,.68333,0,0],84:[0,.68333,0,0],85:[0,.68333,0,0],86:[0,.68333,.01389,0],87:[0,.68333,.01389,0],88:[0,.68333,0,0],89:[0,.68333,.025,0],90:[0,.68333,0,0],91:[.25,.75,0,0],92:[.25,.75,0,0],93:[.25,.75,0,0],94:[0,.69444,0,0],95:[.31,.12056,.02778,0],96:[0,.69444,0,0],97:[0,.43056,0,0],98:[0,.69444,0,0],99:[0,.43056,0,0],100:[0,.69444,0,0],101:[0,.43056,0,0],102:[0,.69444,.07778,0],103:[.19444,.43056,.01389,0],104:[0,.69444,0,0],105:[0,.66786,0,0],106:[.19444,.66786,0,0],107:[0,.69444,0,0],108:[0,.69444,0,0],109:[0,.43056,0,0],110:[0,.43056,0,0],111:[0,.43056,0,0],112:[.19444,.43056,0,0],113:[.19444,.43056,0,0],114:[0,.43056,0,0],115:[0,.43056,0,0],116:[0,.61508,0,0],117:[0,.43056,0,0],118:[0,.43056,.01389,0],119:[0,.43056,.01389,0],120:[0,.43056,0,0],121:[.19444,.43056,.01389,0],122:[0,.43056,0,0],123:[.25,.75,0,0],124:[.25,.75,0,0],125:[.25,.75,0,0],126:[.35,.31786,0,0],160:[0,0,0,0],168:[0,.66786,0,0],172:[0,.43056,0,0],175:[0,.56778,0,0],176:[0,.69444,0,0],177:[.08333,.58333,0,0],180:[0,.69444,0,0],215:[.08333,.58333,0,0],247:[.08333,.58333,0,0],305:[0,.43056,0,0],567:[.19444,.43056,0,0],710:[0,.69444,0,0],711:[0,.62847,0,0],713:[0,.56778,0,0],714:[0,.69444,0,0],715:[0,.69444,0,0],728:[0,.69444,0,0],729:[0,.66786,0,0],730:[0,.69444,0,0],732:[0,.66786,0,0],768:[0,.69444,0,0],769:[0,.69444,0,0],770:[0,.69444,0,0],771:[0,.66786,0,0],772:[0,.56778,0,0],774:[0,.69444,0,0],775:[0,.66786,0,0],776:[0,.66786,0,0],778:[0,.69444,0,0],779:[0,.69444,0,0],780:[0,.62847,0,0],824:[.19444,.69444,0,0],915:[0,.68333,0,0],916:[0,.68333,0,0],920:[0,.68333,0,0],923:[0,.68333,0,0],926:[0,.68333,0,0],928:[0,.68333,0,0],931:[0,.68333,0,0],933:[0,.68333,0,0],934:[0,.68333,0,0],936:[0,.68333,0,0],937:[0,.68333,0,0],8211:[0,.43056,.02778,0],8212:[0,.43056,.02778,0],8216:[0,.69444,0,0],8217:[0,.69444,0,0],8220:[0,.69444,0,0],8221:[0,.69444,0,0],8224:[.19444,.69444,0,0],8225:[.19444,.69444,0,0],8230:[0,.12,0,0],8242:[0,.55556,0,0],8407:[0,.71444,.15382,0],8463:[0,.68889,0,0],8465:[0,.69444,0,0],8467:[0,.69444,0,.11111],8472:[.19444,.43056,0,.11111],8476:[0,.69444,0,0],8501:[0,.69444,0,0],8592:[-.13313,.36687,0,0],8593:[.19444,.69444,0,0],8594:[-.13313,.36687,0,0],8595:[.19444,.69444,0,0],8596:[-.13313,.36687,0,0],8597:[.25,.75,0,0],8598:[.19444,.69444,0,0],8599:[.19444,.69444,0,0],8600:[.19444,.69444,0,0],8601:[.19444,.69444,0,0],8614:[.011,.511,0,0],8617:[.011,.511,0,0],8618:[.011,.511,0,0],8636:[-.13313,.36687,0,0],8637:[-.13313,.36687,0,0],8640:[-.13313,.36687,0,0],8641:[-.13313,.36687,0,0],8652:[.011,.671,0,0],8656:[-.13313,.36687,0,0],8657:[.19444,.69444,0,0],8658:[-.13313,.36687,0,0],8659:[.19444,.69444,0,0],8660:[-.13313,.36687,0,0],8661:[.25,.75,0,0],8704:[0,.69444,0,0],8706:[0,.69444,.05556,.08334],8707:[0,.69444,0,0],8709:[.05556,.75,0,0],8711:[0,.68333,0,0],8712:[.0391,.5391,0,0],8715:[.0391,.5391,0,0],8722:[.08333,.58333,0,0],8723:[.08333,.58333,0,0],8725:[.25,.75,0,0],8726:[.25,.75,0,0],8727:[-.03472,.46528,0,0],8728:[-.05555,.44445,0,0],8729:[-.05555,.44445,0,0],8730:[.2,.8,0,0],8733:[0,.43056,0,0],8734:[0,.43056,0,0],8736:[0,.69224,0,0],8739:[.25,.75,0,0],8741:[.25,.75,0,0],8743:[0,.55556,0,0],8744:[0,.55556,0,0],8745:[0,.55556,0,0],8746:[0,.55556,0,0],8747:[.19444,.69444,.11111,0],8764:[-.13313,.36687,0,0],8768:[.19444,.69444,0,0],8771:[-.03625,.46375,0,0],8773:[-.022,.589,0,0],8776:[-.01688,.48312,0,0],8781:[-.03625,.46375,0,0],8784:[-.133,.67,0,0],8800:[.215,.716,0,0],8801:[-.03625,.46375,0,0],8804:[.13597,.63597,0,0],8805:[.13597,.63597,0,0],8810:[.0391,.5391,0,0],8811:[.0391,.5391,0,0],8826:[.0391,.5391,0,0],8827:[.0391,.5391,0,0],8834:[.0391,.5391,0,0],8835:[.0391,.5391,0,0],8838:[.13597,.63597,0,0],8839:[.13597,.63597,0,0],8846:[0,.55556,0,0],8849:[.13597,.63597,0,0],8850:[.13597,.63597,0,0],8851:[0,.55556,0,0],8852:[0,.55556,0,0],8853:[.08333,.58333,0,0],8854:[.08333,.58333,0,0],8855:[.08333,.58333,0,0],8856:[.08333,.58333,0,0],8857:[.08333,.58333,0,0],8866:[0,.69444,0,0],8867:[0,.69444,0,0],8868:[0,.69444,0,0],8869:[0,.69444,0,0],8872:[.249,.75,0,0],8900:[-.05555,.44445,0,0],8901:[-.05555,.44445,0,0],8902:[-.03472,.46528,0,0],8904:[.005,.505,0,0],8942:[.03,.9,0,0],8943:[-.19,.31,0,0],8945:[-.1,.82,0,0],8968:[.25,.75,0,0],8969:[.25,.75,0,0],8970:[.25,.75,0,0],8971:[.25,.75,0,0],8994:[-.14236,.35764,0,0],8995:[-.14236,.35764,0,0],9136:[.244,.744,0,0],9137:[.244,.744,0,0],9651:[.19444,.69444,0,0],9657:[-.03472,.46528,0,0],9661:[.19444,.69444,0,0],9667:[-.03472,.46528,0,0],9711:[.19444,.69444,0,0],9824:[.12963,.69444,0,0],9825:[.12963,.69444,0,0],9826:[.12963,.69444,0,0],9827:[.12963,.69444,0,0],9837:[0,.75,0,0],9838:[.19444,.69444,0,0],9839:[.19444,.69444,0,0],10216:[.25,.75,0,0],10217:[.25,.75,0,0],10222:[.244,.744,0,0],10223:[.244,.744,0,0],10229:[.011,.511,0,0],10230:[.011,.511,0,0],10231:[.011,.511,0,0],10232:[.024,.525,0,0],10233:[.024,.525,0,0],10234:[.024,.525,0,0],10236:[.011,.511,0,0],10815:[0,.68333,0,0],10927:[.13597,.63597,0,0],10928:[.13597,.63597,0,0]},"Math-BoldItalic":{47:[.19444,.69444,0,0],65:[0,.68611,0,0],66:[0,.68611,.04835,0],67:[0,.68611,.06979,0],68:[0,.68611,.03194,0],69:[0,.68611,.05451,0],70:[0,.68611,.15972,0],71:[0,.68611,0,0],72:[0,.68611,.08229,0],73:[0,.68611,.07778,0],74:[0,.68611,.10069,0],75:[0,.68611,.06979,0],76:[0,.68611,0,0],77:[0,.68611,.11424,0],78:[0,.68611,.11424,0],79:[0,.68611,.03194,0],80:[0,.68611,.15972,0],81:[.19444,.68611,0,0],82:[0,.68611,.00421,0],83:[0,.68611,.05382,0],84:[0,.68611,.15972,0],85:[0,.68611,.11424,0],86:[0,.68611,.25555,0],87:[0,.68611,.15972,0],88:[0,.68611,.07778,0],89:[0,.68611,.25555,0],90:[0,.68611,.06979,0],97:[0,.44444,0,0],98:[0,.69444,0,0],99:[0,.44444,0,0],100:[0,.69444,0,0],101:[0,.44444,0,0],102:[.19444,.69444,.11042,0],103:[.19444,.44444,.03704,0],104:[0,.69444,0,0],105:[0,.69326,0,0],106:[.19444,.69326,.0622,0],107:[0,.69444,.01852,0],108:[0,.69444,.0088,0],109:[0,.44444,0,0],110:[0,.44444,0,0],111:[0,.44444,0,0],112:[.19444,.44444,0,0],113:[.19444,.44444,.03704,0],114:[0,.44444,.03194,0],115:[0,.44444,0,0],116:[0,.63492,0,0],117:[0,.44444,0,0],118:[0,.44444,.03704,0],119:[0,.44444,.02778,0],120:[0,.44444,0,0],121:[.19444,.44444,.03704,0],122:[0,.44444,.04213,0],915:[0,.68611,.15972,0],916:[0,.68611,0,0],920:[0,.68611,.03194,0],923:[0,.68611,0,0],926:[0,.68611,.07458,0],928:[0,.68611,.08229,0],931:[0,.68611,.05451,0],933:[0,.68611,.15972,0],934:[0,.68611,0,0],936:[0,.68611,.11653,0],937:[0,.68611,.04835,0],945:[0,.44444,0,0],946:[.19444,.69444,.03403,0],947:[.19444,.44444,.06389,0],948:[0,.69444,.03819,0],949:[0,.44444,0,0],950:[.19444,.69444,.06215,0],951:[.19444,.44444,.03704,0],952:[0,.69444,.03194,0],953:[0,.44444,0,0],954:[0,.44444,0,0],955:[0,.69444,0,0],956:[.19444,.44444,0,0],957:[0,.44444,.06898,0],958:[.19444,.69444,.03021,0],959:[0,.44444,0,0],960:[0,.44444,.03704,0],961:[.19444,.44444,0,0],962:[.09722,.44444,.07917,0],963:[0,.44444,.03704,0],964:[0,.44444,.13472,0],965:[0,.44444,.03704,0],966:[.19444,.44444,0,0],967:[.19444,.44444,0,0],968:[.19444,.69444,.03704,0],969:[0,.44444,.03704,0],977:[0,.69444,0,0],981:[.19444,.69444,0,0],982:[0,.44444,.03194,0],1009:[.19444,.44444,0,0],1013:[0,.44444,0,0]},"Math-Italic":{47:[.19444,.69444,0,0],65:[0,.68333,0,.13889],66:[0,.68333,.05017,.08334],67:[0,.68333,.07153,.08334],68:[0,.68333,.02778,.05556],69:[0,.68333,.05764,.08334],70:[0,.68333,.13889,.08334],71:[0,.68333,0,.08334],72:[0,.68333,.08125,.05556],73:[0,.68333,.07847,.11111],74:[0,.68333,.09618,.16667],75:[0,.68333,.07153,.05556],76:[0,.68333,0,.02778],77:[0,.68333,.10903,.08334],78:[0,.68333,.10903,.08334],79:[0,.68333,.02778,.08334],80:[0,.68333,.13889,.08334],81:[.19444,.68333,0,.08334],82:[0,.68333,.00773,.08334],83:[0,.68333,.05764,.08334],84:[0,.68333,.13889,.08334],85:[0,.68333,.10903,.02778],86:[0,.68333,.22222,0],87:[0,.68333,.13889,0],88:[0,.68333,.07847,.08334],89:[0,.68333,.22222,0],90:[0,.68333,.07153,.08334],97:[0,.43056,0,0],98:[0,.69444,0,0],99:[0,.43056,0,.05556],100:[0,.69444,0,.16667],101:[0,.43056,0,.05556],102:[.19444,.69444,.10764,.16667],103:[.19444,.43056,.03588,.02778],104:[0,.69444,0,0],105:[0,.65952,0,0],106:[.19444,.65952,.05724,0],107:[0,.69444,.03148,0],108:[0,.69444,.01968,.08334],109:[0,.43056,0,0],110:[0,.43056,0,0],111:[0,.43056,0,.05556],112:[.19444,.43056,0,.08334],113:[.19444,.43056,.03588,.08334],114:[0,.43056,.02778,.05556],115:[0,.43056,0,.05556],116:[0,.61508,0,.08334],117:[0,.43056,0,.02778],118:[0,.43056,.03588,.02778],119:[0,.43056,.02691,.08334],120:[0,.43056,0,.02778],121:[.19444,.43056,.03588,.05556],122:[0,.43056,.04398,.05556],915:[0,.68333,.13889,.08334],916:[0,.68333,0,.16667],920:[0,.68333,.02778,.08334],923:[0,.68333,0,.16667],926:[0,.68333,.07569,.08334],928:[0,.68333,.08125,.05556],931:[0,.68333,.05764,.08334],933:[0,.68333,.13889,.05556],934:[0,.68333,0,.08334],936:[0,.68333,.11,.05556],937:[0,.68333,.05017,.08334],945:[0,.43056,.0037,.02778],946:[.19444,.69444,.05278,.08334],947:[.19444,.43056,.05556,0],948:[0,.69444,.03785,.05556],949:[0,.43056,0,.08334],950:[.19444,.69444,.07378,.08334],951:[.19444,.43056,.03588,.05556],952:[0,.69444,.02778,.08334],953:[0,.43056,0,.05556],954:[0,.43056,0,0],955:[0,.69444,0,0],956:[.19444,.43056,0,.02778],957:[0,.43056,.06366,.02778],958:[.19444,.69444,.04601,.11111],959:[0,.43056,0,.05556],960:[0,.43056,.03588,0],961:[.19444,.43056,0,.08334],962:[.09722,.43056,.07986,.08334],963:[0,.43056,.03588,0],964:[0,.43056,.1132,.02778],965:[0,.43056,.03588,.02778],966:[.19444,.43056,0,.08334],967:[.19444,.43056,0,.05556],968:[.19444,.69444,.03588,.11111],969:[0,.43056,.03588,0],977:[0,.69444,0,.08334],981:[.19444,.69444,0,.08334],982:[0,.43056,.02778,0],1009:[.19444,.43056,0,.08334],1013:[0,.43056,0,.05556]},"Math-Regular":{65:[0,.68333,0,.13889],66:[0,.68333,.05017,.08334],67:[0,.68333,.07153,.08334],68:[0,.68333,.02778,.05556],69:[0,.68333,.05764,.08334],70:[0,.68333,.13889,.08334],71:[0,.68333,0,.08334],72:[0,.68333,.08125,.05556],73:[0,.68333,.07847,.11111],74:[0,.68333,.09618,.16667],75:[0,.68333,.07153,.05556],76:[0,.68333,0,.02778],77:[0,.68333,.10903,.08334],78:[0,.68333,.10903,.08334],79:[0,.68333,.02778,.08334],80:[0,.68333,.13889,.08334],81:[.19444,.68333,0,.08334],82:[0,.68333,.00773,.08334],83:[0,.68333,.05764,.08334],84:[0,.68333,.13889,.08334],85:[0,.68333,.10903,.02778],86:[0,.68333,.22222,0],87:[0,.68333,.13889,0],88:[0,.68333,.07847,.08334],89:[0,.68333,.22222,0],90:[0,.68333,.07153,.08334],97:[0,.43056,0,0],98:[0,.69444,0,0],99:[0,.43056,0,.05556],100:[0,.69444,0,.16667],101:[0,.43056,0,.05556],102:[.19444,.69444,.10764,.16667],103:[.19444,.43056,.03588,.02778],104:[0,.69444,0,0],105:[0,.65952,0,0],106:[.19444,.65952,.05724,0],107:[0,.69444,.03148,0],108:[0,.69444,.01968,.08334],109:[0,.43056,0,0],110:[0,.43056,0,0],111:[0,.43056,0,.05556],112:[.19444,.43056,0,.08334],113:[.19444,.43056,.03588,.08334],114:[0,.43056,.02778,.05556],115:[0,.43056,0,.05556],116:[0,.61508,0,.08334],117:[0,.43056,0,.02778],118:[0,.43056,.03588,.02778],119:[0,.43056,.02691,.08334],120:[0,.43056,0,.02778],121:[.19444,.43056,.03588,.05556],122:[0,.43056,.04398,.05556],915:[0,.68333,.13889,.08334],916:[0,.68333,0,.16667],920:[0,.68333,.02778,.08334],923:[0,.68333,0,.16667],926:[0,.68333,.07569,.08334],928:[0,.68333,.08125,.05556],931:[0,.68333,.05764,.08334],933:[0,.68333,.13889,.05556],934:[0,.68333,0,.08334],936:[0,.68333,.11,.05556],937:[0,.68333,.05017,.08334],945:[0,.43056,.0037,.02778],946:[.19444,.69444,.05278,.08334],947:[.19444,.43056,.05556,0],948:[0,.69444,.03785,.05556],949:[0,.43056,0,.08334],950:[.19444,.69444,.07378,.08334],951:[.19444,.43056,.03588,.05556],952:[0,.69444,.02778,.08334],953:[0,.43056,0,.05556],954:[0,.43056,0,0],955:[0,.69444,0,0],956:[.19444,.43056,0,.02778],957:[0,.43056,.06366,.02778],958:[.19444,.69444,.04601,.11111],959:[0,.43056,0,.05556],960:[0,.43056,.03588,0],961:[.19444,.43056,0,.08334],962:[.09722,.43056,.07986,.08334],963:[0,.43056,.03588,0],964:[0,.43056,.1132,.02778],965:[0,.43056,.03588,.02778],966:[.19444,.43056,0,.08334],967:[.19444,.43056,0,.05556],968:[.19444,.69444,.03588,.11111],969:[0,.43056,.03588,0],977:[0,.69444,0,.08334],981:[.19444,.69444,0,.08334],982:[0,.43056,.02778,0],1009:[.19444,.43056,0,.08334],1013:[0,.43056,0,.05556]},"SansSerif-Regular":{33:[0,.69444,0,0],34:[0,.69444,0,0],35:[.19444,.69444,0,0],36:[.05556,.75,0,0],37:[.05556,.75,0,0],38:[0,.69444,0,0],39:[0,.69444,0,0],40:[.25,.75,0,0],41:[.25,.75,0,0],42:[0,.75,0,0],43:[.08333,.58333,0,0],44:[.125,.08333,0,0],45:[0,.44444,0,0],46:[0,.08333,0,0],47:[.25,.75,0,0],48:[0,.65556,0,0],49:[0,.65556,0,0],50:[0,.65556,0,0],51:[0,.65556,0,0],52:[0,.65556,0,0],53:[0,.65556,0,0],54:[0,.65556,0,0],55:[0,.65556,0,0],56:[0,.65556,0,0],57:[0,.65556,0,0],58:[0,.44444,0,0],59:[.125,.44444,0,0],61:[-.13,.37,0,0],63:[0,.69444,0,0],64:[0,.69444,0,0],65:[0,.69444,0,0],66:[0,.69444,0,0],67:[0,.69444,0,0],68:[0,.69444,0,0],69:[0,.69444,0,0],70:[0,.69444,0,0],71:[0,.69444,0,0],72:[0,.69444,0,0],73:[0,.69444,0,0],74:[0,.69444,0,0],75:[0,.69444,0,0],76:[0,.69444,0,0],77:[0,.69444,0,0],78:[0,.69444,0,0],79:[0,.69444,0,0],80:[0,.69444,0,0],81:[.125,.69444,0,0],82:[0,.69444,0,0],83:[0,.69444,0,0],84:[0,.69444,0,0],85:[0,.69444,0,0],86:[0,.69444,.01389,0],87:[0,.69444,.01389,0],88:[0,.69444,0,0],89:[0,.69444,.025,0],90:[0,.69444,0,0],91:[.25,.75,0,0],93:[.25,.75,0,0],94:[0,.69444,0,0],95:[.35,.09444,.02778,0],97:[0,.44444,0,0],98:[0,.69444,0,0],99:[0,.44444,0,0],100:[0,.69444,0,0],101:[0,.44444,0,0],102:[0,.69444,.06944,0],103:[.19444,.44444,.01389,0],104:[0,.69444,0,0],105:[0,.67937,0,0],106:[.19444,.67937,0,0],107:[0,.69444,0,0],108:[0,.69444,0,0],109:[0,.44444,0,0],110:[0,.44444,0,0],111:[0,.44444,0,0],112:[.19444,.44444,0,0],113:[.19444,.44444,0,0],114:[0,.44444,.01389,0],115:[0,.44444,0,0],116:[0,.57143,0,0],117:[0,.44444,0,0],118:[0,.44444,.01389,0],119:[0,.44444,.01389,0],120:[0,.44444,0,0],121:[.19444,.44444,.01389,0],122:[0,.44444,0,0],126:[.35,.32659,0,0],305:[0,.44444,0,0],567:[.19444,.44444,0,0],768:[0,.69444,0,0],769:[0,.69444,0,0],770:[0,.69444,0,0],771:[0,.67659,0,0],772:[0,.60889,0,0],774:[0,.69444,0,0],775:[0,.67937,0,0],776:[0,.67937,0,0],778:[0,.69444,0,0],779:[0,.69444,0,0],780:[0,.63194,0,0],915:[0,.69444,0,0],916:[0,.69444,0,0],920:[0,.69444,0,0],923:[0,.69444,0,0],926:[0,.69444,0,0],928:[0,.69444,0,0],931:[0,.69444,0,0],933:[0,.69444,0,0],934:[0,.69444,0,0],936:[0,.69444,0,0],937:[0,.69444,0,0],8211:[0,.44444,.02778,0],8212:[0,.44444,.02778,0],8216:[0,.69444,0,0],8217:[0,.69444,0,0],8220:[0,.69444,0,0],8221:[0,.69444,0,0]},"Script-Regular":{65:[0,.7,.22925,0],66:[0,.7,.04087,0],67:[0,.7,.1689,0],68:[0,.7,.09371,0],69:[0,.7,.18583,0],70:[0,.7,.13634,0],71:[0,.7,.17322,0],72:[0,.7,.29694,0],73:[0,.7,.19189,0],74:[.27778,.7,.19189,0],75:[0,.7,.31259,0],76:[0,.7,.19189,0],77:[0,.7,.15981,0],78:[0,.7,.3525,0],79:[0,.7,.08078,0],80:[0,.7,.08078,0],81:[0,.7,.03305,0],82:[0,.7,.06259,0],83:[0,.7,.19189,0],84:[0,.7,.29087,0],85:[0,.7,.25815,0],86:[0,.7,.27523,0],87:[0,.7,.27523,0],88:[0,.7,.26006,0],89:[0,.7,.2939,0],90:[0,.7,.24037,0]},"Size1-Regular":{40:[.35001,.85,0,0],41:[.35001,.85,0,0],47:[.35001,.85,0,0],91:[.35001,.85,0,0],92:[.35001,.85,0,0],93:[.35001,.85,0,0],123:[.35001,.85,0,0],125:[.35001,.85,0,0],710:[0,.72222,0,0],732:[0,.72222,0,0],770:[0,.72222,0,0],771:[0,.72222,0,0],8214:[-99e-5,.601,0,0],8593:[1e-5,.6,0,0],8595:[1e-5,.6,0,0],8657:[1e-5,.6,0,0],8659:[1e-5,.6,0,0],8719:[.25001,.75,0,0],8720:[.25001,.75,0,0],8721:[.25001,.75,0,0],8730:[.35001,.85,0,0],8739:[-.00599,.606,0,0],8741:[-.00599,.606,0,0],8747:[.30612,.805,.19445,0],8748:[.306,.805,.19445,0],8749:[.306,.805,.19445,0],8750:[.30612,.805,.19445,0],8896:[.25001,.75,0,0],8897:[.25001,.75,0,0],8898:[.25001,.75,0,0],8899:[.25001,.75,0,0],8968:[.35001,.85,0,0],8969:[.35001,.85,0,0],8970:[.35001,.85,0,0],8971:[.35001,.85,0,0],9168:[-99e-5,.601,0,0],10216:[.35001,.85,0,0],10217:[.35001,.85,0,0],10752:[.25001,.75,0,0],10753:[.25001,.75,0,0],10754:[.25001,.75,0,0],10756:[.25001,.75,0,0],10758:[.25001,.75,0,0]},"Size2-Regular":{40:[.65002,1.15,0,0],41:[.65002,1.15,0,0],47:[.65002,1.15,0,0],91:[.65002,1.15,0,0],92:[.65002,1.15,0,0],93:[.65002,1.15,0,0],123:[.65002,1.15,0,0],125:[.65002,1.15,0,0],710:[0,.75,0,0],732:[0,.75,0,0],770:[0,.75,0,0],771:[0,.75,0,0],8719:[.55001,1.05,0,0],8720:[.55001,1.05,0,0],8721:[.55001,1.05,0,0],8730:[.65002,1.15,0,0],8747:[.86225,1.36,.44445,0],8748:[.862,1.36,.44445,0],8749:[.862,1.36,.44445,0],8750:[.86225,1.36,.44445,0],8896:[.55001,1.05,0,0],8897:[.55001,1.05,0,0],8898:[.55001,1.05,0,0],8899:[.55001,1.05,0,0],8968:[.65002,1.15,0,0],8969:[.65002,1.15,0,0],8970:[.65002,1.15,0,0],8971:[.65002,1.15,0,0],10216:[.65002,1.15,0,0],10217:[.65002,1.15,0,0],10752:[.55001,1.05,0,0],10753:[.55001,1.05,0,0],10754:[.55001,1.05,0,0],10756:[.55001,1.05,0,0],10758:[.55001,1.05,0,0]},"Size3-Regular":{40:[.95003,1.45,0,0],41:[.95003,1.45,0,0],47:[.95003,1.45,0,0],91:[.95003,1.45,0,0],92:[.95003,1.45,0,0],93:[.95003,1.45,0,0],123:[.95003,1.45,0,0],125:[.95003,1.45,0,0],710:[0,.75,0,0],732:[0,.75,0,0],770:[0,.75,0,0],771:[0,.75,0,0],8730:[.95003,1.45,0,0],8968:[.95003,1.45,0,0],8969:[.95003,1.45,0,0],8970:[.95003,1.45,0,0],8971:[.95003,1.45,0,0],10216:[.95003,1.45,0,0],10217:[.95003,1.45,0,0]},"Size4-Regular":{40:[1.25003,1.75,0,0],41:[1.25003,1.75,0,0],47:[1.25003,1.75,0,0],91:[1.25003,1.75,0,0],92:[1.25003,1.75,0,0],93:[1.25003,1.75,0,0],123:[1.25003,1.75,0,0],125:[1.25003,1.75,0,0],710:[0,.825,0,0],732:[0,.825,0,0],770:[0,.825,0,0],771:[0,.825,0,0],8730:[1.25003,1.75,0,0],8968:[1.25003,1.75,0,0],8969:[1.25003,1.75,0,0],8970:[1.25003,1.75,0,0],8971:[1.25003,1.75,0,0],9115:[.64502,1.155,0,0],9116:[1e-5,.6,0,0],9117:[.64502,1.155,0,0],9118:[.64502,1.155,0,0],9119:[1e-5,.6,0,0],9120:[.64502,1.155,0,0],9121:[.64502,1.155,0,0],9122:[-99e-5,.601,0,0],9123:[.64502,1.155,0,0],9124:[.64502,1.155,0,0],9125:[-99e-5,.601,0,0],9126:[.64502,1.155,0,0],9127:[1e-5,.9,0,0],9128:[.65002,1.15,0,0],9129:[.90001,0,0,0],9130:[0,.3,0,0],9131:[1e-5,.9,0,0],9132:[.65002,1.15,0,0],9133:[.90001,0,0,0],9143:[.88502,.915,0,0],10216:[1.25003,1.75,0,0],10217:[1.25003,1.75,0,0],57344:[-.00499,.605,0,0],57345:[-.00499,.605,0,0],57680:[0,.12,0,0],57681:[0,.12,0,0],57682:[0,.12,0,0],57683:[0,.12,0,0]},"Typewriter-Regular":{33:[0,.61111,0,0],34:[0,.61111,0,0],35:[0,.61111,0,0],36:[.08333,.69444,0,0],37:[.08333,.69444,0,0],38:[0,.61111,0,0],39:[0,.61111,0,0],40:[.08333,.69444,0,0],41:[.08333,.69444,0,0],42:[0,.52083,0,0],43:[-.08056,.53055,0,0],44:[.13889,.125,0,0],45:[-.08056,.53055,0,0],46:[0,.125,0,0],47:[.08333,.69444,0,0],48:[0,.61111,0,0],49:[0,.61111,0,0],50:[0,.61111,0,0],51:[0,.61111,0,0],52:[0,.61111,0,0],53:[0,.61111,0,0],54:[0,.61111,0,0],55:[0,.61111,0,0],56:[0,.61111,0,0],57:[0,.61111,0,0],58:[0,.43056,0,0],59:[.13889,.43056,0,0],60:[-.05556,.55556,0,0],61:[-.19549,.41562,0,0],62:[-.05556,.55556,0,0],63:[0,.61111,0,0],64:[0,.61111,0,0],65:[0,.61111,0,0],66:[0,.61111,0,0],67:[0,.61111,0,0],68:[0,.61111,0,0],69:[0,.61111,0,0],70:[0,.61111,0,0],71:[0,.61111,0,0],72:[0,.61111,0,0],73:[0,.61111,0,0],74:[0,.61111,0,0],75:[0,.61111,0,0],76:[0,.61111,0,0],77:[0,.61111,0,0],78:[0,.61111,0,0],79:[0,.61111,0,0],80:[0,.61111,0,0],81:[.13889,.61111,0,0],82:[0,.61111,0,0],83:[0,.61111,0,0],84:[0,.61111,0,0],85:[0,.61111,0,0],86:[0,.61111,0,0],87:[0,.61111,0,0],88:[0,.61111,0,0],89:[0,.61111,0,0],90:[0,.61111,0,0],91:[.08333,.69444,0,0],92:[.08333,.69444,0,0],93:[.08333,.69444,0,0],94:[0,.61111,0,0],95:[.09514,0,0,0],96:[0,.61111,0,0],97:[0,.43056,0,0],98:[0,.61111,0,0],99:[0,.43056,0,0],100:[0,.61111,0,0],101:[0,.43056,0,0],102:[0,.61111,0,0],103:[.22222,.43056,0,0],104:[0,.61111,0,0],105:[0,.61111,0,0],106:[.22222,.61111,0,0],107:[0,.61111,0,0],108:[0,.61111,0,0],109:[0,.43056,0,0],110:[0,.43056,0,0],111:[0,.43056,0,0],112:[.22222,.43056,0,0],113:[.22222,.43056,0,0],114:[0,.43056,0,0],115:[0,.43056,0,0],116:[0,.55358,0,0],117:[0,.43056,0,0],118:[0,.43056,0,0],119:[0,.43056,0,0],120:[0,.43056,0,0],121:[.22222,.43056,0,0],122:[0,.43056,0,0],123:[.08333,.69444,0,0],124:[.08333,.69444,0,0],125:[.08333,.69444,0,0],126:[0,.61111,0,0],127:[0,.61111,0,0],305:[0,.43056,0,0],567:[.22222,.43056,0,0],768:[0,.61111,0,0],769:[0,.61111,0,0],770:[0,.61111,0,0],771:[0,.61111,0,0],772:[0,.56555,0,0],774:[0,.61111,0,0],776:[0,.61111,0,0],778:[0,.61111,0,0],780:[0,.56597,0,0],915:[0,.61111,0,0],916:[0,.61111,0,0],920:[0,.61111,0,0],923:[0,.61111,0,0],926:[0,.61111,0,0],928:[0,.61111,0,0],931:[0,.61111,0,0],933:[0,.61111,0,0],934:[0,.61111,0,0],936:[0,.61111,0,0],937:[0,.61111,0,0],2018:[0,.61111,0,0],2019:[0,.61111,0,0],8242:[0,.61111,0,0]}}},{}],43:[function(e,t){function n(e){return e&&e.__esModule?e:{"default":e}}function r(e,n,r){"string"==typeof e&&(e=[e]),"number"==typeof n&&(n={numArgs:n});for(var i={numArgs:n.numArgs,argTypes:n.argTypes,greediness:n.greediness===undefined?1:n.greediness,allowedInText:!!n.allowedInText,allowedInMath:n.allowedInMath,numOptionalArgs:n.numOptionalArgs||0,infix:!!n.infix,handler:r},a=0;a<e.length;++a)t.exports[e[a]]=i}var i=n(e("./utils")),a=n(e("./ParseError")),o=n(e("./ParseNode")),s=function(e){return"ordgroup"===e.type?e.value:[e]};r("\\sqrt",{numArgs:1,numOptionalArgs:1
},function(e,t){var n=t[0];return{type:"sqrt",body:t[1],index:n}});var l={"\\text":undefined,"\\textrm":"mathrm","\\textsf":"mathsf","\\texttt":"mathtt","\\textnormal":"mathrm","\\textbf":"mathbf","\\textit":"textit"};r(["\\text","\\textrm","\\textsf","\\texttt","\\textnormal","\\textbf","\\textit"],{numArgs:1,argTypes:["text"],greediness:2,allowedInText:!0},function(e,t){var n=t[0];return{type:"text",body:s(n),style:l[e.funcName]}}),r("\\textcolor",{numArgs:2,allowedInText:!0,greediness:3,argTypes:["color","original"]},function(e,t){var n=t[0],r=t[1];return{type:"color",color:n.value,value:s(r)}}),r("\\color",{numArgs:1,allowedInText:!0,greediness:3,argTypes:["color"]},null),r("\\overline",{numArgs:1},function(e,t){return{type:"overline",body:t[0]}}),r("\\underline",{numArgs:1},function(e,t){return{type:"underline",body:t[0]}}),r("\\rule",{numArgs:2,numOptionalArgs:1,argTypes:["size","size","size"]},function(e,t){var n=t[0],r=t[1],i=t[2];return{type:"rule",shift:n&&n.value,width:r.value,height:i.value}}),r(["\\kern","\\mkern"],{numArgs:1,argTypes:["size"]},function(e,t){return{type:"kern",dimension:t[0].value}}),r("\\KaTeX",{numArgs:0},function(){return{type:"katex"}}),r("\\phantom",{numArgs:1},function(e,t){var n=t[0];return{type:"phantom",value:s(n)}}),r(["\\mathord","\\mathbin","\\mathrel","\\mathopen","\\mathclose","\\mathpunct","\\mathinner"],{numArgs:1},function(e,t){var n=t[0];return{type:"mclass",mclass:"m"+e.funcName.substr(5),value:s(n)}}),r("\\stackrel",{numArgs:2},function(e,t){var n=t[0],r=t[1],i=new o["default"]("op",{type:"op",limits:!0,alwaysHandleSupSub:!0,symbol:!1,value:s(r)},r.mode);return{type:"mclass",mclass:"mrel",value:[new o["default"]("supsub",{base:i,sup:n,sub:null},n.mode)]}}),r("\\bmod",{numArgs:0},function(){return{type:"mod",modType:"bmod",value:null}}),r(["\\pod","\\pmod","\\mod"],{numArgs:1},function(e,t){var n=t[0];return{type:"mod",modType:e.funcName.substr(1),value:s(n)}});var u={"\\bigl":{mclass:"mopen",size:1},"\\Bigl":{mclass:"mopen",size:2},"\\biggl":{mclass:"mopen",size:3},"\\Biggl":{mclass:"mopen",size:4},"\\bigr":{mclass:"mclose",size:1},"\\Bigr":{mclass:"mclose",size:2},"\\biggr":{mclass:"mclose",size:3},"\\Biggr":{mclass:"mclose",size:4},"\\bigm":{mclass:"mrel",size:1},"\\Bigm":{mclass:"mrel",size:2},"\\biggm":{mclass:"mrel",size:3},"\\Biggm":{mclass:"mrel",size:4},"\\big":{mclass:"mord",size:1},"\\Big":{mclass:"mord",size:2},"\\bigg":{mclass:"mord",size:3},"\\Bigg":{mclass:"mord",size:4}},d=["(",")","[","\\lbrack","]","\\rbrack","\\{","\\lbrace","\\}","\\rbrace","\\lfloor","\\rfloor","\\lceil","\\rceil","<",">","\\langle","\\rangle","\\lt","\\gt","\\lvert","\\rvert","\\lVert","\\rVert","\\lgroup","\\rgroup","\\lmoustache","\\rmoustache","/","\\backslash","|","\\vert","\\|","\\Vert","\\uparrow","\\Uparrow","\\downarrow","\\Downarrow","\\updownarrow","\\Updownarrow","."],c={"\\Bbb":"\\mathbb","\\bold":"\\mathbf","\\frak":"\\mathfrak"};r(["\\blue","\\orange","\\pink","\\red","\\green","\\gray","\\purple","\\blueA","\\blueB","\\blueC","\\blueD","\\blueE","\\tealA","\\tealB","\\tealC","\\tealD","\\tealE","\\greenA","\\greenB","\\greenC","\\greenD","\\greenE","\\goldA","\\goldB","\\goldC","\\goldD","\\goldE","\\redA","\\redB","\\redC","\\redD","\\redE","\\maroonA","\\maroonB","\\maroonC","\\maroonD","\\maroonE","\\purpleA","\\purpleB","\\purpleC","\\purpleD","\\purpleE","\\mintA","\\mintB","\\mintC","\\grayA","\\grayB","\\grayC","\\grayD","\\grayE","\\grayF","\\grayG","\\grayH","\\grayI","\\kaBlue","\\kaGreen"],{numArgs:1,allowedInText:!0,greediness:3},function(e,t){var n=t[0];return{type:"color",color:"katex-"+e.funcName.slice(1),value:s(n)}}),r(["\\arcsin","\\arccos","\\arctan","\\arctg","\\arcctg","\\arg","\\ch","\\cos","\\cosec","\\cosh","\\cot","\\cotg","\\coth","\\csc","\\ctg","\\cth","\\deg","\\dim","\\exp","\\hom","\\ker","\\lg","\\ln","\\log","\\sec","\\sin","\\sinh","\\sh","\\tan","\\tanh","\\tg","\\th"],{numArgs:0},function(e){return{type:"op",limits:!1,symbol:!1,body:e.funcName}}),r(["\\det","\\gcd","\\inf","\\lim","\\liminf","\\limsup","\\max","\\min","\\Pr","\\sup"],{numArgs:0},function(e){return{type:"op",limits:!0,symbol:!1,body:e.funcName}}),r(["\\int","\\iint","\\iiint","\\oint"],{numArgs:0},function(e){return{type:"op",limits:!1,symbol:!0,body:e.funcName}}),r(["\\coprod","\\bigvee","\\bigwedge","\\biguplus","\\bigcap","\\bigcup","\\intop","\\prod","\\sum","\\bigotimes","\\bigoplus","\\bigodot","\\bigsqcup","\\smallint"],{numArgs:0},function(e){return{type:"op",limits:!0,symbol:!0,body:e.funcName}}),r("\\mathop",{numArgs:1},function(e,t){var n=t[0];return{type:"op",limits:!1,symbol:!1,value:s(n)}}),r(["\\dfrac","\\frac","\\tfrac","\\dbinom","\\binom","\\tbinom","\\\\atopfrac"],{numArgs:2,greediness:2},function(e,t){var n=t[0],r=t[1],i=void 0,a=null,o=null,s="auto";switch(e.funcName){case"\\dfrac":case"\\frac":case"\\tfrac":i=!0;break;case"\\\\atopfrac":i=!1;break;case"\\dbinom":case"\\binom":case"\\tbinom":i=!1,a="(",o=")";break;default:throw new Error("Unrecognized genfrac command")}switch(e.funcName){case"\\dfrac":case"\\dbinom":s="display";break;case"\\tfrac":case"\\tbinom":s="text"}return{type:"genfrac",numer:n,denom:r,hasBarLine:i,leftDelim:a,rightDelim:o,size:s}}),r(["\\llap","\\rlap"],{numArgs:1,allowedInText:!0},function(e,t){var n=t[0];return{type:e.funcName.slice(1),body:n}});var h=function(e,t){if(i["default"].contains(d,e.value))return e;throw new a["default"]("Invalid delimiter: '"+e.value+"' after '"+t.funcName+"'",e)};r(["\\bigl","\\Bigl","\\biggl","\\Biggl","\\bigr","\\Bigr","\\biggr","\\Biggr","\\bigm","\\Bigm","\\biggm","\\Biggm","\\big","\\Big","\\bigg","\\Bigg"],{numArgs:1},function(e,t){var n=h(t[0],e);return{type:"delimsizing",size:u[e.funcName].size,mclass:u[e.funcName].mclass,value:n.value}}),r(["\\left","\\right"],{numArgs:1},function(e,t){return{type:"leftright",value:h(t[0],e).value}}),r("\\middle",{numArgs:1},function(e,t){var n=h(t[0],e);if(!e.parser.leftrightDepth)throw new a["default"]("\\middle without preceding \\left",n);return{type:"middle",value:n.value}}),r(["\\tiny","\\scriptsize","\\footnotesize","\\small","\\normalsize","\\large","\\Large","\\LARGE","\\huge","\\Huge"],0,null),r(["\\displaystyle","\\textstyle","\\scriptstyle","\\scriptscriptstyle"],0,null),r(["\\rm","\\sf","\\tt","\\bf","\\it"],0,null),r(["\\mathrm","\\mathit","\\mathbf","\\mathbb","\\mathcal","\\mathfrak","\\mathscr","\\mathsf","\\mathtt","\\Bbb","\\bold","\\frak"],{numArgs:1,greediness:2},function(e,t){var n=t[0],r=e.funcName;return r in c&&(r=c[r]),{type:"font",font:r.slice(1),body:n}}),r(["\\acute","\\grave","\\ddot","\\tilde","\\bar","\\breve","\\check","\\hat","\\vec","\\dot","\\widehat","\\widetilde","\\overrightarrow","\\overleftarrow","\\Overrightarrow","\\overleftrightarrow","\\overgroup","\\overlinesegment","\\overleftharpoon","\\overrightharpoon"],{numArgs:1},function(e,t){var n=t[0],r=!i["default"].contains(["\\acute","\\grave","\\ddot","\\tilde","\\bar","\\breve","\\check","\\hat","\\vec","\\dot"],e.funcName),a=!r||i["default"].contains(["\\widehat","\\widetilde"],e.funcName);return{type:"accent",label:e.funcName,isStretchy:r,isShifty:a,value:s(n),base:n}}),r(["\\'","\\`","\\^","\\~","\\=","\\u","\\.",'\\"',"\\r","\\H","\\v"],{numArgs:1,allowedInText:!0,allowedInMath:!1},function(e,t){var n=t[0];return{type:"accent",label:e.funcName,isStretchy:!1,isShifty:!0,value:s(n),base:n}}),r(["\\overbrace","\\underbrace"],{numArgs:1},function(e,t){var n=t[0];return{type:"horizBrace",label:e.funcName,isOver:/^\\over/.test(e.funcName),base:n}}),r(["\\underleftarrow","\\underrightarrow","\\underleftrightarrow","\\undergroup","\\underlinesegment","\\undertilde"],{numArgs:1},function(e,t){var n=t[0];return{type:"accentUnder",label:e.funcName,value:s(n),body:n}}),r(["\\xleftarrow","\\xrightarrow","\\xLeftarrow","\\xRightarrow","\\xleftrightarrow","\\xLeftrightarrow","\\xhookleftarrow","\\xhookrightarrow","\\xmapsto","\\xrightharpoondown","\\xrightharpoonup","\\xleftharpoondown","\\xleftharpoonup","\\xrightleftharpoons","\\xleftrightharpoons","\\xLongequal","\\xtwoheadrightarrow","\\xtwoheadleftarrow","\\xLongequal","\\xtofrom"],{numArgs:1,numOptionalArgs:1},function(e,t){var n=t[0],r=t[1];return{type:"xArrow",label:e.funcName,body:r,below:n}}),r(["\\cancel","\\bcancel","\\xcancel","\\sout","\\fbox"],{numArgs:1},function(e,t){var n=t[0];return{type:"enclose",label:e.funcName,body:n}}),r(["\\over","\\choose","\\atop"],{numArgs:0,infix:!0},function(e){var t=void 0;switch(e.funcName){case"\\over":t="\\frac";break;case"\\choose":t="\\binom";break;case"\\atop":t="\\\\atopfrac";break;default:throw new Error("Unrecognized infix genfrac command")}return{type:"infix",replaceWith:t,token:e.token}}),r(["\\\\","\\cr"],{numArgs:0,numOptionalArgs:1,argTypes:["size"]},function(e,t){return{type:"cr",size:t[0]}}),r(["\\begin","\\end"],{numArgs:1,argTypes:["text"]},function(e,t){var n=t[0];if("ordgroup"!==n.type)throw new a["default"]("Invalid environment name",n);for(var r="",i=0;i<n.value.length;++i)r+=n.value[i].value;return{type:"environment",name:r,nameGroup:n}})},{"./ParseError":29,"./ParseNode":30,"./utils":51}],44:[function(e,t){function n(e,n){t.exports[e]=n}n("\\bgroup","{"),n("\\egroup","}"),n("\\begingroup","{"),n("\\endgroup","}"),n("\\mkern","\\kern"),n("\\overset","\\mathop{#2}\\limits^{#1}"),n("\\underset","\\mathop{#2}\\limits_{#1}"),n("\\boxed","\\fbox{\\displaystyle{#1}}"),n("\\iff","\\;\\Longleftrightarrow\\;"),n("\\implies","\\;\\Longrightarrow\\;"),n("\\impliedby","\\;\\Longleftarrow\\;"),n("\\ordinarycolon",":"),n("\\vcentcolon","\\mathrel{\\mathop\\ordinarycolon}"),n("\\dblcolon","\\vcentcolon\\mathrel{\\mkern-.9mu}\\vcentcolon"),n("\\coloneqq","\\vcentcolon\\mathrel{\\mkern-1.2mu}="),n("\\Coloneqq","\\dblcolon\\mathrel{\\mkern-1.2mu}="),n("\\coloneq","\\vcentcolon\\mathrel{\\mkern-1.2mu}\\mathrel{-}"),n("\\Coloneq","\\dblcolon\\mathrel{\\mkern-1.2mu}\\mathrel{-}"),n("\\eqqcolon","=\\mathrel{\\mkern-1.2mu}\\vcentcolon"),n("\\Eqqcolon","=\\mathrel{\\mkern-1.2mu}\\dblcolon"),n("\\eqcolon","\\mathrel{-}\\mathrel{\\mkern-1.2mu}\\vcentcolon"),n("\\Eqcolon","\\mathrel{-}\\mathrel{\\mkern-1.2mu}\\dblcolon"),n("\\colonapprox","\\vcentcolon\\mathrel{\\mkern-1.2mu}\\approx"),n("\\Colonapprox","\\dblcolon\\mathrel{\\mkern-1.2mu}\\approx"),n("\\colonsim","\\vcentcolon\\mathrel{\\mkern-1.2mu}\\sim"),n("\\Colonsim","\\dblcolon\\mathrel{\\mkern-1.2mu}\\sim"),n("\\ratio","\\vcentcolon"),n("\\coloncolon","\\dblcolon"),n("\\colonequals","\\coloneqq"),n("\\coloncolonequals","\\Coloneqq"),n("\\equalscolon","\\eqqcolon"),n("\\equalscoloncolon","\\Eqqcolon"),n("\\colonminus","\\coloneq"),n("\\coloncolonminus","\\Coloneq"),n("\\minuscolon","\\eqcolon"),n("\\minuscoloncolon","\\Eqcolon"),n("\\coloncolonapprox","\\Colonapprox"),n("\\coloncolonsim","\\Colonsim"),n("\\simcolon","\\sim\\mathrel{\\mkern-1.2mu}\\vcentcolon"),n("\\simcoloncolon","\\sim\\mathrel{\\mkern-1.2mu}\\dblcolon"),n("\\approxcolon","\\approx\\mathrel{\\mkern-1.2mu}\\vcentcolon"),n("\\approxcoloncolon","\\approx\\mathrel{\\mkern-1.2mu}\\dblcolon")},{}],45:[function(e,t){function n(e){return e&&e.__esModule?e:{"default":e}}var r=n(e("babel-runtime/helpers/classCallCheck")),i=n(e("babel-runtime/helpers/createClass")),a=n(e("./utils")),o=function(){function e(t,n){(0,r["default"])(this,e),this.type=t,this.attributes={},this.children=n||[]}return(0,i["default"])(e,[{key:"setAttribute",value:function(e,t){this.attributes[e]=t}},{key:"toNode",value:function(){var e=document.createElementNS("http://www.w3.org/1998/Math/MathML",this.type);for(var t in this.attributes)Object.prototype.hasOwnProperty.call(this.attributes,t)&&e.setAttribute(t,this.attributes[t]);for(var n=0;n<this.children.length;n++)e.appendChild(this.children[n].toNode());return e}},{key:"toMarkup",value:function(){var e="<"+this.type;for(var t in this.attributes)Object.prototype.hasOwnProperty.call(this.attributes,t)&&(e+=" "+t+'="',e+=a["default"].escape(this.attributes[t]),e+='"');e+=">";for(var n=0;n<this.children.length;n++)e+=this.children[n].toMarkup();return e+="</"+this.type+">"}}]),e}(),s=function(){function e(t){(0,r["default"])(this,e),this.text=t}return(0,i["default"])(e,[{key:"toNode",value:function(){return document.createTextNode(this.text)}},{key:"toMarkup",value:function(){return a["default"].escape(this.text)}}]),e}();t.exports={MathNode:o,TextNode:s}},{"./utils":51,"babel-runtime/helpers/classCallCheck":4,"babel-runtime/helpers/createClass":5}],46:[function(e,t){function n(e){return e&&e.__esModule?e:{"default":e}}var r=n(e("./Parser")),i=function(e,t){if(!("string"==typeof e||e instanceof String))throw new TypeError("KaTeX can only parse string typed expression");return new r["default"](e,t).parse()};t.exports=i},{"./Parser":31}],47:[function(e,t){var n=e("./buildCommon"),r=e("./mathMLTree"),i=e("./utils"),a={widehat:"^",widetilde:"~",undertilde:"~",overleftarrow:"\u2190",underleftarrow:"\u2190",xleftarrow:"\u2190",overrightarrow:"\u2192",underrightarrow:"\u2192",xrightarrow:"\u2192",underbrace:"\u23b5",overbrace:"\u23de",overleftrightarrow:"\u2194",underleftrightarrow:"\u2194",xleftrightarrow:"\u2194",Overrightarrow:"\u21d2",xRightarrow:"\u21d2",overleftharpoon:"\u21bc",xleftharpoonup:"\u21bc",overrightharpoon:"\u21c0",xrightharpoonup:"\u21c0",xLeftarrow:"\u21d0",xLeftrightarrow:"\u21d4",xhookleftarrow:"\u21a9",xhookrightarrow:"\u21aa",xmapsto:"\u21a6",xrightharpoondown:"\u21c1",xleftharpoondown:"\u21bd",xrightleftharpoons:"\u21cc",xleftrightharpoons:"\u21cb",xtwoheadleftarrow:"\u219e",xtwoheadrightarrow:"\u21a0",xLongequal:"=",xtofrom:"\u21c4"},o=function(e){var t=new r.MathNode("mo",[new r.TextNode(a[e.substr(1)])]);return t.setAttribute("stretchy","true"),t},s={overleftarrow:[.522,0,"leftarrow",.5],underleftarrow:[.522,0,"leftarrow",.5],xleftarrow:[.261,.261,"leftarrow",.783],overrightarrow:[.522,0,"rightarrow",.5],underrightarrow:[.522,0,"rightarrow",.5],xrightarrow:[.261,.261,"rightarrow",.783],overbrace:[.548,0,"overbrace",1.6],underbrace:[.548,0,"underbrace",1.6],overleftrightarrow:[.522,0,"leftrightarrow",.5],underleftrightarrow:[.522,0,"leftrightarrow",.5],xleftrightarrow:[.261,.261,"leftrightarrow",.783],Overrightarrow:[.56,0,"doublerightarrow",.5],xLeftarrow:[.28,.28,"doubleleftarrow",.783],xRightarrow:[.28,.28,"doublerightarrow",.783],xLeftrightarrow:[.28,.28,"doubleleftrightarrow",.955],overleftharpoon:[.522,0,"leftharpoon",.5],overrightharpoon:[.522,0,"rightharpoon",.5],xleftharpoonup:[.261,.261,"leftharpoon",.783],xrightharpoonup:[.261,.261,"rightharpoon",.783],xhookleftarrow:[.261,.261,"hookleftarrow",.87],xhookrightarrow:[.261,.261,"hookrightarrow",.87],overlinesegment:[.414,0,"linesegment",.5],underlinesegment:[.414,0,"linesegment",.5],xmapsto:[.261,.261,"mapsto",.783],xrightharpoondown:[.261,.261,"rightharpoondown",.783],xleftharpoondown:[.261,.261,"leftharpoondown",.783],xrightleftharpoons:[.358,.358,"rightleftharpoons",.716],xleftrightharpoons:[.358,.358,"leftrightharpoons",.716],overgroup:[.342,0,"overgroup",.87],undergroup:[.342,0,"undergroup",.87],xtwoheadleftarrow:[.167,.167,"twoheadleftarrow",.86],xtwoheadrightarrow:[.167,.167,"twoheadrightarrow",.86],xLongequal:[.167,.167,"longequal",.5],xtofrom:[.264,.264,"tofrom",.86]},l={doubleleftarrow:"<path d='M262 157\nl10-10c34-36 62.7-77 86-123 3.3-8 5-13.3 5-16 0-5.3-6.7-8-20-8-7.3\n 0-12.2.5-14.5 1.5-2.3 1-4.8 4.5-7.5 10.5-49.3 97.3-121.7 169.3-217 216-28\n 14-57.3 25-88 33-6.7 2-11 3.8-13 5.5-2 1.7-3 4.2-3 7.5s1 5.8 3 7.5\nc2 1.7 6.3 3.5 13 5.5 68 17.3 128.2 47.8 180.5 91.5 52.3 43.7 93.8 96.2 124.5\n 157.5 9.3 8 15.3 12.3 18 13h6c12-.7 18-4 18-10 0-2-1.7-7-5-15-23.3-46-52-87\n-86-123l-10-10h399738v-40H218c328 0 0 0 0 0l-10-8c-26.7-20-65.7-43-117-69 2.7\n-2 6-3.7 10-5 36.7-16 72.3-37.3 107-64l10-8h399782v-40z\nm8 0v40h399730v-40zm0 194v40h399730v-40z'/>",doublerightarrow:"<path d='M399738 392l\n-10 10c-34 36-62.7 77-86 123-3.3 8-5 13.3-5 16 0 5.3 6.7 8 20 8 7.3 0 12.2-.5\n 14.5-1.5 2.3-1 4.8-4.5 7.5-10.5 49.3-97.3 121.7-169.3 217-216 28-14 57.3-25 88\n-33 6.7-2 11-3.8 13-5.5 2-1.7 3-4.2 3-7.5s-1-5.8-3-7.5c-2-1.7-6.3-3.5-13-5.5-68\n-17.3-128.2-47.8-180.5-91.5-52.3-43.7-93.8-96.2-124.5-157.5-9.3-8-15.3-12.3-18\n-13h-6c-12 .7-18 4-18 10 0 2 1.7 7 5 15 23.3 46 52 87 86 123l10 10H0v40h399782\nc-328 0 0 0 0 0l10 8c26.7 20 65.7 43 117 69-2.7 2-6 3.7-10 5-36.7 16-72.3 37.3\n-107 64l-10 8H0v40zM0 157v40h399730v-40zm0 194v40h399730v-40z'/>",leftarrow:"<path d='M400000 241H110l3-3c68.7-52.7 113.7-120\n 135-202 4-14.7 6-23 6-25 0-7.3-7-11-21-11-8 0-13.2.8-15.5 2.5-2.3 1.7-4.2 5.8\n-5.5 12.5-1.3 4.7-2.7 10.3-4 17-12 48.7-34.8 92-68.5 130S65.3 228.3 18 247\nc-10 4-16 7.7-18 11 0 8.7 6 14.3 18 17 47.3 18.7 87.8 47 121.5 85S196 441.3 208\n 490c.7 2 1.3 5 2 9s1.2 6.7 1.5 8c.3 1.3 1 3.3 2 6s2.2 4.5 3.5 5.5c1.3 1 3.3\n 1.8 6 2.5s6 1 10 1c14 0 21-3.7 21-11 0-2-2-10.3-6-25-20-79.3-65-146.7-135-202\n l-3-3h399890zM100 241v40h399900v-40z'/>",rightarrow:"<path d='M0 241v40h399891c-47.3 35.3-84 78-110 128\n-16.7 32-27.7 63.7-33 95 0 1.3-.2 2.7-.5 4-.3 1.3-.5 2.3-.5 3 0 7.3 6.7 11 20\n 11 8 0 13.2-.8 15.5-2.5 2.3-1.7 4.2-5.5 5.5-11.5 2-13.3 5.7-27 11-41 14.7-44.7\n 39-84.5 73-119.5s73.7-60.2 119-75.5c6-2 9-5.7 9-11s-3-9-9-11c-45.3-15.3-85\n-40.5-119-75.5s-58.3-74.8-73-119.5c-4.7-14-8.3-27.3-11-40-1.3-6.7-3.2-10.8-5.5\n-12.5-2.3-1.7-7.5-2.5-15.5-2.5-14 0-21 3.7-21 11 0 2 2 10.3 6 25 20.7 83.3 67\n 151.7 139 205zm0 0v40h399900v-40z'/>"},u={bcancel:"<line x1='0' y1='0' x2='100%' y2='100%' stroke-width='0.046em'/>",cancel:"<line x1='0' y1='100%' x2='100%' y2='0' stroke-width='0.046em'/>",doubleleftarrow:"><svg viewBox='0 0 400000 549'\npreserveAspectRatio='xMinYMin slice'>"+l.doubleleftarrow+"</svg>",doubleleftrightarrow:"><svg width='50.1%' viewBox='0 0 400000 549'\npreserveAspectRatio='xMinYMin slice'>"+l.doubleleftarrow+"</svg>\n<svg x='50%' width='50%' viewBox='0 0 400000 549' preserveAspectRatio='xMaxYMin\n slice'>"+l.doublerightarrow+"</svg>",doublerightarrow:"><svg viewBox='0 0 400000 549'\npreserveAspectRatio='xMaxYMin slice'>"+l.doublerightarrow+"</svg>",hookleftarrow:"><svg width='50.1%' viewBox='0 0 400000 522'\npreserveAspectRatio='xMinYMin slice'>"+l.leftarrow+"</svg>\n<svg x='50%' width='50%' viewBox='0 0 400000 522' preserveAspectRatio='xMaxYMin\n slice'><path d='M399859 241c-764 0 0 0 0 0 40-3.3 68.7\n -15.7 86-37 10-12 15-25.3 15-40 0-22.7-9.8-40.7-29.5-54-19.7-13.3-43.5-21-71.5\n -23-17.3-1.3-26-8-26-20 0-13.3 8.7-20 26-20 38 0 71 11.2 99 33.5 0 0 7 5.6 21\n 16.7 14 11.2 21 33.5 21 66.8s-14 61.2-42 83.5c-28 22.3-61 33.5-99 33.5L0 241z\n M0 281v-40h399859v40z'/></svg>",hookrightarrow:"><svg width='50.1%' viewBox='0 0 400000 522'\npreserveAspectRatio='xMinYMin slice'><path d='M400000 281\nH103s-33-11.2-61-33.5S0 197.3 0 164s14.2-61.2 42.5-83.5C70.8 58.2 104 47 142 47\nc16.7 0 25 6.7 25 20 0 12-8.7 18.7-26 20-40 3.3-68.7 15.7-86 37-10 12-15 25.3\n-15 40 0 22.7 9.8 40.7 29.5 54 19.7 13.3 43.5 21 71.5 23h399859zM103 281v-40\nh399897v40z'/></svg><svg x='50%' width='50%' viewBox='0 0 400000 522'\npreserveAspectRatio='xMaxYMin slice'>"+l.rightarrow+"</svg>",leftarrow:"><svg viewBox='0 0 400000 522' preserveAspectRatio='xMinYMin\n slice'>"+l.leftarrow+"</svg>",leftharpoon:"><svg viewBox='0 0 400000 522' preserveAspectRatio='xMinYMin\n slice'><path d='M0 267c.7 5.3 3 10 7 14h399993v-40H93c3.3\n-3.3 10.2-9.5 20.5-18.5s17.8-15.8 22.5-20.5c50.7-52 88-110.3 112-175 4-11.3 5\n-18.3 3-21-1.3-4-7.3-6-18-6-8 0-13 .7-15 2s-4.7 6.7-8 16c-42 98.7-107.3 174.7\n-196 228-6.7 4.7-10.7 8-12 10-1.3 2-2 5.7-2 11zm100-26v40h399900v-40z'/></svg>",leftharpoondown:"><svg viewBox='0 0 400000 522'\npreserveAspectRatio='xMinYMin slice'><path d=\"M7 241c-4 4-6.333 8.667-7 14\n 0 5.333.667 9 2 11s5.333 5.333 12 10c90.667 54 156 130 196 228 3.333 10.667\n 6.333 16.333 9 17 2 .667 5 1 9 1h5c10.667 0 16.667-2 18-6 2-2.667 1-9.667-3-21\n -32-87.333-82.667-157.667-152-211l-3-3h399907v-40z\nM93 281 H400000 v-40L7 241z\"/></svg>",leftrightarrow:"><svg width='50.1%' viewBox='0 0 400000 522'\npreserveAspectRatio='xMinYMin slice'>"+l.leftarrow+"</svg>\n<svg x='50%' width='50%' viewBox='0 0 400000 522' preserveAspectRatio='xMaxYMin\n slice'>"+l.rightarrow+"</svg>",leftrightharpoons:"><svg width='50.1%' viewBox='0 0 400000 716'\npreserveAspectRatio='xMinYMin slice'><path d='M0 267c.7 5.3\n 3 10 7 14h399993v-40H93c3.3-3.3 10.2-9.5 20.5-18.5s17.8-15.8 22.5-20.5c50.7-52\n 88-110.3 112-175 4-11.3 5-18.3 3-21-1.3-4-7.3-6-18-6-8 0-13 .7-15 2s-4.7 6.7-8\n 16c-42 98.7-107.3 174.7-196 228-6.7 4.7-10.7 8-12 10-1.3 2-2 5.7-2 11zm100-26\nv40h399900v-40zM0 435v40h400000v-40zm0 0v40h400000v-40z'/></svg>\n<svg x='50%' width='50%' viewBox='0 0 400000 716' preserveAspectRatio='xMaxYMin\n slice'><path d='M399747 705c0 7.3 6.7 11 20 11 8 0 13-.8\n 15-2.5s4.7-6.8 8-15.5c40-94 99.3-166.3 178-217 13.3-8 20.3-12.3 21-13 5.3-3.3\n 8.5-5.8 9.5-7.5 1-1.7 1.5-5.2 1.5-10.5s-2.3-10.3-7-15H0v40h399908c-34 25.3\n-64.7 57-92 95-27.3 38-48.7 77.7-64 119-3.3 8.7-5 14-5 16zM0 435v40h399900v-40z\nm0-194v40h400000v-40zm0 0v40h400000v-40z'/></svg>",linesegment:"><svg width='50.1%' viewBox='0 0 400000 414'\npreserveAspectRatio='xMinYMin slice'><path d='M40 187V40H0\nv334h40V227h399960v-40zm0 0V40H0v334h40V227h399960v-40z'/></svg><svg x='50%'\nwidth='50%' viewBox='0 0 400000 414' preserveAspectRatio='xMaxYMin slice'>\n<path d='M0 187v40h399960v147h40V40h-40v147zm0\n 0v40h399960v147h40V40h-40v147z'/></svg>",longequal:" viewBox='0 0 100 334' preserveAspectRatio='none'>\n<path d='M0 50h100v40H0zm0 194h100v40H0z'/>",mapsto:"><svg width='50.1%' viewBox='0 0 400000 522'\npreserveAspectRatio='xMinYMin slice'><path d='M40 241c740\n 0 0 0 0 0v-75c0-40.7-.2-64.3-.5-71-.3-6.7-2.2-11.7-5.5-15-4-4-8.7-6-14-6-5.3 0\n-10 2-14 6C2.7 83.3.8 91.3.5 104 .2 116.7 0 169 0 261c0 114 .7 172.3 2 175 4 8\n 10 12 18 12 5.3 0 10-2 14-6 3.3-3.3 5.2-8.3 5.5-15 .3-6.7.5-30.3.5-71v-75\nh399960zm0 0v40h399960v-40z'/></svg><svg x='50%' width='50%' viewBox='0 0\n 400000 522' preserveAspectRatio='xMaxYMin slice'>"+l.rightarrow+"</svg>",overbrace:"><svg width='25.5%' viewBox='0 0 400000 548'\npreserveAspectRatio='xMinYMin slice'><path d='M6 548l-6-6\nv-35l6-11c56-104 135.3-181.3 238-232 57.3-28.7 117-45 179-50h399577v120H403\nc-43.3 7-81 15-113 26-100.7 33-179.7 91-237 174-2.7 5-6 9-10 13-.7 1-7.3 1-20 1\nH6z'/></svg><svg x='25%' width='50%' viewBox='0 0 400000 548'\npreserveAspectRatio='xMidYMin slice'><path d='M200428 334\nc-100.7-8.3-195.3-44-280-108-55.3-42-101.7-93-139-153l-9-14c-2.7 4-5.7 8.7-9 14\n-53.3 86.7-123.7 153-211 199-66.7 36-137.3 56.3-212 62H0V214h199568c178.3-11.7\n 311.7-78.3 403-201 6-8 9.7-12 11-12 .7-.7 6.7-1 18-1s17.3.3 18 1c1.3 0 5 4 11\n 12 44.7 59.3 101.3 106.3 170 141s145.3 54.3 229 60h199572v120z'/></svg>\n<svg x='74.9%' width='24.1%' viewBox='0 0 400000 548'\npreserveAspectRatio='xMaxYMin slice'><path d='M400000 542l\n-6 6h-17c-12.7 0-19.3-.3-20-1-4-4-7.3-8.3-10-13-35.3-51.3-80.8-93.8-136.5-127.5\ns-117.2-55.8-184.5-66.5c-.7 0-2-.3-4-1-18.7-2.7-76-4.3-172-5H0V214h399571l6 1\nc124.7 8 235 61.7 331 161 31.3 33.3 59.7 72.7 85 118l7 13v35z'/></svg>",overgroup:"><svg width='50.1%' viewBox='0 0 400000 342'\npreserveAspectRatio='xMinYMin slice'><path d='M400000 80\nH435C64 80 168.3 229.4 21 260c-5.9 1.2-18 0-18 0-2 0-3-1-3-3v-38C76 61 257 0\n 435 0h399565z'/></svg><svg x='50%' width='50%' viewBox='0 0 400000 342'\npreserveAspectRatio='xMaxYMin slice'><path d='M0 80h399565\nc371 0 266.7 149.4 414 180 5.9 1.2 18 0 18 0 2 0 3-1 3-3v-38\nc-76-158-257-219-435-219H0z'/></svg>",rightarrow:"><svg viewBox='0 0 400000 522' preserveAspectRatio='xMaxYMin\n slice'>"+l.rightarrow+"</svg>",rightharpoon:"><svg viewBox='0 0 400000 522' preserveAspectRatio='xMaxYMin\n slice'><path d='M0 241v40h399993c4.7-4.7 7-9.3 7-14 0-9.3\n-3.7-15.3-11-18-92.7-56.7-159-133.7-199-231-3.3-9.3-6-14.7-8-16-2-1.3-7-2-15-2\n-10.7 0-16.7 2-18 6-2 2.7-1 9.7 3 21 15.3 42 36.7 81.8 64 119.5 27.3 37.7 58\n 69.2 92 94.5zm0 0v40h399900v-40z'/></svg>",rightharpoondown:"><svg viewBox='0 0 400000 522'\npreserveAspectRatio='xMaxYMin slice'><path d='M399747 511\nc0 7.3 6.7 11 20 11 8 0 13-.8 15-2.5s4.7-6.8 8-15.5c40-94 99.3-166.3 178-217\n 13.3-8 20.3-12.3 21-13 5.3-3.3 8.5-5.8 9.5-7.5 1-1.7 1.5-5.2 1.5-10.5s-2.3\n -10.3-7-15H0v40h399908c-34 25.3-64.7 57-92 95-27.3 38-48.7 77.7-64 119-3.3\n 8.7-5 14-5 16zM0 241v40h399900v-40z'/></svg>",rightleftharpoons:"><svg width='50%' viewBox='0 0 400000 716'\npreserveAspectRatio='xMinYMin slice'><path d='M7 435c-4 4\n-6.3 8.7-7 14 0 5.3.7 9 2 11s5.3 5.3 12 10c90.7 54 156 130 196 228 3.3 10.7 6.3\n 16.3 9 17 2 .7 5 1 9 1h5c10.7 0 16.7-2 18-6 2-2.7 1-9.7-3-21-32-87.3-82.7\n-157.7-152-211l-3-3h399907v-40H7zm93 0v40h399900v-40zM0 241v40h399900v-40z\nm0 0v40h399900v-40z'/></svg><svg x='50%' width='50%' viewBox='0 0 400000 716'\npreserveAspectRatio='xMaxYMin slice'><path d='M0 241v40\nh399993c4.7-4.7 7-9.3 7-14 0-9.3-3.7-15.3-11-18-92.7-56.7-159-133.7-199-231-3.3\n-9.3-6-14.7-8-16-2-1.3-7-2-15-2-10.7 0-16.7 2-18 6-2 2.7-1 9.7 3 21 15.3 42\n 36.7 81.8 64 119.5 27.3 37.7 58 69.2 92 94.5zm0 0v40h399900v-40z\n m100 194v40h399900v-40zm0 0v40h399900v-40z'/></svg>",tilde1:" viewBox='0 0 600 260' preserveAspectRatio='none'>\n<path d='M200 55.538c-77 0-168 73.953-177 73.953-3 0-7\n-2.175-9-5.437L2 97c-1-2-2-4-2-6 0-4 2-7 5-9l20-12C116 12 171 0 207 0c86 0\n 114 68 191 68 78 0 168-68 177-68 4 0 7 2 9 5l12 19c1 2.175 2 4.35 2 6.525 0\n 4.35-2 7.613-5 9.788l-19 13.05c-92 63.077-116.937 75.308-183 76.128\n-68.267.847-113-73.952-191-73.952z'/>",tilde2:" viewBox='0 0 1033 286' preserveAspectRatio='none'>\n<path d='M344 55.266c-142 0-300.638 81.316-311.5 86.418\n-8.01 3.762-22.5 10.91-23.5 5.562L1 120c-1-2-1-3-1-4 0-5 3-9 8-10l18.4-9C160.9\n 31.9 283 0 358 0c148 0 188 122 331 122s314-97 326-97c4 0 8 2 10 7l7 21.114\nc1 2.14 1 3.21 1 4.28 0 5.347-3 9.626-7 10.696l-22.3 12.622C852.6 158.372 751\n 181.476 676 181.476c-149 0-189-126.21-332-126.21z'/>",tilde3:" viewBox='0 0 2339 306' preserveAspectRatio='none'>\n<path d='M786 59C457 59 32 175.242 13 175.242c-6 0-10-3.457\n-11-10.37L.15 138c-1-7 3-12 10-13l19.2-6.4C378.4 40.7 634.3 0 804.3 0c337 0\n 411.8 157 746.8 157 328 0 754-112 773-112 5 0 10 3 11 9l1 14.075c1 8.066-.697\n 16.595-6.697 17.492l-21.052 7.31c-367.9 98.146-609.15 122.696-778.15 122.696\n -338 0-409-156.573-744-156.573z'/>",tilde4:" viewBox='0 0 2340 312' preserveAspectRatio='none'>\n<path d='M786 58C457 58 32 177.487 13 177.487c-6 0-10-3.345\n-11-10.035L.15 143c-1-7 3-12 10-13l22-6.7C381.2 35 637.15 0 807.15 0c337 0 409\n 177 744 177 328 0 754-127 773-127 5 0 10 3 11 9l1 14.794c1 7.805-3 13.38-9\n 14.495l-20.7 5.574c-366.85 99.79-607.3 139.372-776.3 139.372-338 0-409\n -175.236-744-175.236z'/>",tofrom:"><svg width='50.1%' viewBox='0 0 400000 528'\npreserveAspectRatio='xMinYMin slice'><path d='M0 147h400000\nv40H0zm0 214c68 40 115.7 95.7 143 167h22c15.3 0 23-.3 23-1 0-1.3-5.3-13.7-16-37\n-18-35.3-41.3-69-70-101l-7-8h399905v-40H95l7-8c28.7-32 52-65.7 70-101 10.7-23.3\n 16-35.7 16-37 0-.7-7.7-1-23-1h-22C115.7 265.3 68 321 0 361zm0-174v-40h399900\nv40zm100 154v40h399900v-40z'/></svg><svg x='50%' width='50%' viewBox='0 0\n 400000 528' preserveAspectRatio='xMaxYMin slice'><path\nd='M400000 167c-70.7-42-118-97.7-142-167h-23c-15.3 0-23 .3-23 1 0 1.3 5.3 13.7\n 16 37 18 35.3 41.3 69 70 101l7 8H0v40h399905l-7 8c-28.7 32-52 65.7-70 101-10.7\n 23.3-16 35.7-16 37 0 .7 7.7 1 23 1h23c24-69.3 71.3-125 142-167z\n M100 147v40h399900v-40zM0 341v40h399900v-40z'/></svg>",twoheadleftarrow:"><svg viewBox='0 0 400000 334'\npreserveAspectRatio='xMinYMin slice'><path d='M0 167c68 40\n 115.7 95.7 143 167h22c15.3 0 23-.3 23-1 0-1.3-5.3-13.7-16-37-18-35.3-41.3-69\n-70-101l-7-8h125l9 7c50.7 39.3 85 86 103 140h46c0-4.7-6.3-18.7-19-42-18-35.3\n-40-67.3-66-96l-9-9h399716v-40H284l9-9c26-28.7 48-60.7 66-96 12.7-23.333 19\n-37.333 19-42h-46c-18 54-52.3 100.7-103 140l-9 7H95l7-8c28.7-32 52-65.7 70-101\n 10.7-23.333 16-35.7 16-37 0-.7-7.7-1-23-1h-22C115.7 71.3 68 127 0 167z'/>\n</svg>",twoheadrightarrow:"><svg viewBox='0 0 400000 334'\npreserveAspectRatio='xMaxYMin slice'><path d='M400000 167\nc-68-40-115.7-95.7-143-167h-22c-15.3 0-23 .3-23 1 0 1.3 5.3 13.7 16 37 18 35.3\n 41.3 69 70 101l7 8h-125l-9-7c-50.7-39.3-85-86-103-140h-46c0 4.7 6.3 18.7 19 42\n 18 35.3 40 67.3 66 96l9 9H0v40h399716l-9 9c-26 28.7-48 60.7-66 96-12.7 23.333\n-19 37.333-19 42h46c18-54 52.3-100.7 103-140l9-7h125l-7 8c-28.7 32-52 65.7-70\n 101-10.7 23.333-16 35.7-16 37 0 .7 7.7 1 23 1h22c27.3-71.3 75-127 143-167z'/>\n</svg>",underbrace:"><svg width='25.1%' viewBox='0 0 400000 548'\npreserveAspectRatio='xMinYMin slice'><path d='M0 6l6-6h17\nc12.688 0 19.313.3 20 1 4 4 7.313 8.3 10 13 35.313 51.3 80.813 93.8 136.5 127.5\n 55.688 33.7 117.188 55.8 184.5 66.5.688 0 2 .3 4 1 18.688 2.7 76 4.3 172 5\nh399450v120H429l-6-1c-124.688-8-235-61.7-331-161C60.687 138.7 32.312 99.3 7 54\nL0 41V6z'/></svg><svg x='25%' width='50%' viewBox='0 0 400000 548'\npreserveAspectRatio='xMidYMin slice'><path d='M199572 214\nc100.7 8.3 195.3 44 280 108 55.3 42 101.7 93 139 153l9 14c2.7-4 5.7-8.7 9-14\n 53.3-86.7 123.7-153 211-199 66.7-36 137.3-56.3 212-62h199568v120H200432c-178.3\n 11.7-311.7 78.3-403 201-6 8-9.7 12-11 12-.7.7-6.7 1-18 1s-17.3-.3-18-1c-1.3 0\n-5-4-11-12-44.7-59.3-101.3-106.3-170-141s-145.3-54.3-229-60H0V214z'/></svg>\n<svg x='74.9%' width='25.1%' viewBox='0 0 400000 548'\npreserveAspectRatio='xMaxYMin slice'><path d='M399994 0l6 6\nv35l-6 11c-56 104-135.3 181.3-238 232-57.3 28.7-117 45-179 50H-300V214h399897\nc43.3-7 81-15 113-26 100.7-33 179.7-91 237-174 2.7-5 6-9 10-13 .7-1 7.3-1 20-1\nh17z'/></svg>",undergroup:"><svg width='50.1%' viewBox='0 0 400000 342'\npreserveAspectRatio='xMinYMin slice'><path d='M400000 262\nH435C64 262 168.3 112.6 21 82c-5.9-1.2-18 0-18 0-2 0-3 1-3 3v38c76 158 257 219\n 435 219h399565z'/></svg><svg x='50%' width='50%' viewBox='0 0 400000 342'\npreserveAspectRatio='xMaxYMin slice'><path d='M0 262h399565\nc371 0 266.7-149.4 414-180 5.9-1.2 18 0 18 0 2 0 3 1 3 3v38c-76 158-257\n 219-435 219H0z'/></svg>",widehat1:" viewBox='0 0 1062 239' preserveAspectRatio='none'>\n<path d='M529 0h5l519 115c5 1 9 5 9 10 0 1-1 2-1 3l-4 22\nc-1 5-5 9-11 9h-2L532 67 19 159h-2c-5 0-9-4-11-9l-5-22c-1-6 2-12 8-13z'/>",widehat2:" viewBox='0 0 2364 300' preserveAspectRatio='none'>\n<path d='M1181 0h2l1171 176c6 0 10 5 10 11l-2 23c-1 6-5 10\n-11 10h-1L1182 67 15 220h-1c-6 0-10-4-11-10l-2-23c-1-6 4-11 10-11z'/>",widehat3:" viewBox='0 0 2364 360' preserveAspectRatio='none'>\n<path d='M1181 0h2l1171 236c6 0 10 5 10 11l-2 23c-1 6-5 10\n-11 10h-1L1182 67 15 280h-1c-6 0-10-4-11-10l-2-23c-1-6 4-11 10-11z'/>",widehat4:" viewBox='0 0 2364 420' preserveAspectRatio='none'>\n<path d='M1181 0h2l1171 296c6 0 10 5 10 11l-2 23c-1 6-5 10\n-11 10h-1L1182 67 15 340h-1c-6 0-10-4-11-10l-2-23c-1-6 4-11 10-11z'/>",xcancel:"<line x1='0' y1='0' x2='100%' y2='100%' stroke-width='0.046em'/>\n<line x1='0' y1='100%' x2='100%' y2='0' stroke-width='0.046em'/>"},d=function(e,t){var r=e.value.label.substr(1),a=0,o=0,l="",d=0;if(i.contains(["widehat","widetilde","undertilde"],r)){var c=e.value.value.length;if(c>5)a=.312,l=("widehat"===r?"widehat":"tilde")+"4";else{var h=[1,1,2,2,3,3][c];"widehat"===r?(a=[0,.24,.3,.3,.36,.36][c],l="widehat"+h):(a=[0,.26,.3,.3,.34,.34][c],l="tilde"+h)}}else{var p=s[r];a=p[0],o=p[1],l=p[2],d=p[3]}var f=n.makeSpan([],[],t);f.height=a,f.depth=o;var m=a+o;return f.style.height=m+"em",d>0&&(f.style.minWidth=d+"em"),f.innerHTML="<svg width='100%' height='"+m+"em'"+u[l]+"</svg>",f},c=function(e,t,r,i){var a=void 0,o=e.height+e.depth+2*r;return"fbox"===t?(a=n.makeSpan(["stretchy",t],[],i),i.color&&(a.style.borderColor=i.getColor())):(a=n.makeSpan([],[],i)).innerHTML="<svg width='100%' height='"+o+"em'>"+u[t]+"</svg>",a.height=o,a.style.height=o+"em",a};t.exports={encloseSpan:c,mathMLnode:o,svgSpan:d}},{"./buildCommon":34,"./mathMLTree":45,"./utils":51}],48:[function(e,t){function n(e,n,r,i,a,o){t.exports[e][a]={font:n,group:r,replace:i},o&&(t.exports[e][i]=t.exports[e][a])}t.exports={math:{},text:{}};var r="math",i="text",a="main",o="ams",s="accent",l="bin",u="close",d="inner",c="mathord",h="op",p="open",f="punct",m="rel",g="spacing",v="textord";n(r,a,m,"\u2261","\\equiv"),n(r,a,m,"\u227a","\\prec"),n(r,a,m,"\u227b","\\succ"),n(r,a,m,"\u223c","\\sim"),n(r,a,m,"\u22a5","\\perp"),n(r,a,m,"\u2aaf","\\preceq"),n(r,a,m,"\u2ab0","\\succeq"),n(r,a,m,"\u2243","\\simeq"),n(r,a,m,"\u2223","\\mid"),n(r,a,m,"\u226a","\\ll"),n(r,a,m,"\u226b","\\gg"),n(r,a,m,"\u224d","\\asymp"),n(r,a,m,"\u2225","\\parallel"),n(r,a,m,"\u22c8","\\bowtie"),n(r,a,m,"\u2323","\\smile"),n(r,a,m,"\u2291","\\sqsubseteq"),n(r,a,m,"\u2292","\\sqsupseteq"),n(r,a,m,"\u2250","\\doteq"),n(r,a,m,"\u2322","\\frown"),n(r,a,m,"\u220b","\\ni"),n(r,a,m,"\u221d","\\propto"),n(r,a,m,"\u22a2","\\vdash"),n(r,a,m,"\u22a3","\\dashv"),
n(r,a,m,"\u220b","\\owns"),n(r,a,f,".","\\ldotp"),n(r,a,f,"\u22c5","\\cdotp"),n(r,a,v,"#","\\#"),n(i,a,v,"#","\\#"),n(r,a,v,"&","\\&"),n(i,a,v,"&","\\&"),n(r,a,v,"\u2135","\\aleph"),n(r,a,v,"\u2200","\\forall"),n(r,a,v,"\u210f","\\hbar"),n(r,a,v,"\u2203","\\exists"),n(r,a,v,"\u2207","\\nabla"),n(r,a,v,"\u266d","\\flat"),n(r,a,v,"\u2113","\\ell"),n(r,a,v,"\u266e","\\natural"),n(r,a,v,"\u2663","\\clubsuit"),n(r,a,v,"\u2118","\\wp"),n(r,a,v,"\u266f","\\sharp"),n(r,a,v,"\u2662","\\diamondsuit"),n(r,a,v,"\u211c","\\Re"),n(r,a,v,"\u2661","\\heartsuit"),n(r,a,v,"\u2111","\\Im"),n(r,a,v,"\u2660","\\spadesuit"),n(r,a,v,"\u2020","\\dag"),n(i,a,v,"\u2020","\\dag"),n(i,a,v,"\u2020","\\textdagger"),n(r,a,v,"\u2021","\\ddag"),n(i,a,v,"\u2021","\\ddag"),n(i,a,v,"\u2020","\\textdaggerdbl"),n(r,a,u,"\u23b1","\\rmoustache"),n(r,a,p,"\u23b0","\\lmoustache"),n(r,a,u,"\u27ef","\\rgroup"),n(r,a,p,"\u27ee","\\lgroup"),n(r,a,l,"\u2213","\\mp"),n(r,a,l,"\u2296","\\ominus"),n(r,a,l,"\u228e","\\uplus"),n(r,a,l,"\u2293","\\sqcap"),n(r,a,l,"\u2217","\\ast"),n(r,a,l,"\u2294","\\sqcup"),n(r,a,l,"\u25ef","\\bigcirc"),n(r,a,l,"\u2219","\\bullet"),n(r,a,l,"\u2021","\\ddagger"),n(r,a,l,"\u2240","\\wr"),n(r,a,l,"\u2a3f","\\amalg"),n(r,a,m,"\u27f5","\\longleftarrow"),n(r,a,m,"\u21d0","\\Leftarrow"),n(r,a,m,"\u27f8","\\Longleftarrow"),n(r,a,m,"\u27f6","\\longrightarrow"),n(r,a,m,"\u21d2","\\Rightarrow"),n(r,a,m,"\u27f9","\\Longrightarrow"),n(r,a,m,"\u2194","\\leftrightarrow"),n(r,a,m,"\u27f7","\\longleftrightarrow"),n(r,a,m,"\u21d4","\\Leftrightarrow"),n(r,a,m,"\u27fa","\\Longleftrightarrow"),n(r,a,m,"\u21a6","\\mapsto"),n(r,a,m,"\u27fc","\\longmapsto"),n(r,a,m,"\u2197","\\nearrow"),n(r,a,m,"\u21a9","\\hookleftarrow"),n(r,a,m,"\u21aa","\\hookrightarrow"),n(r,a,m,"\u2198","\\searrow"),n(r,a,m,"\u21bc","\\leftharpoonup"),n(r,a,m,"\u21c0","\\rightharpoonup"),n(r,a,m,"\u2199","\\swarrow"),n(r,a,m,"\u21bd","\\leftharpoondown"),n(r,a,m,"\u21c1","\\rightharpoondown"),n(r,a,m,"\u2196","\\nwarrow"),n(r,a,m,"\u21cc","\\rightleftharpoons"),n(r,o,m,"\u226e","\\nless"),n(r,o,m,"\ue010","\\nleqslant"),n(r,o,m,"\ue011","\\nleqq"),n(r,o,m,"\u2a87","\\lneq"),n(r,o,m,"\u2268","\\lneqq"),n(r,o,m,"\ue00c","\\lvertneqq"),n(r,o,m,"\u22e6","\\lnsim"),n(r,o,m,"\u2a89","\\lnapprox"),n(r,o,m,"\u2280","\\nprec"),n(r,o,m,"\u22e0","\\npreceq"),n(r,o,m,"\u22e8","\\precnsim"),n(r,o,m,"\u2ab9","\\precnapprox"),n(r,o,m,"\u2241","\\nsim"),n(r,o,m,"\ue006","\\nshortmid"),n(r,o,m,"\u2224","\\nmid"),n(r,o,m,"\u22ac","\\nvdash"),n(r,o,m,"\u22ad","\\nvDash"),n(r,o,m,"\u22ea","\\ntriangleleft"),n(r,o,m,"\u22ec","\\ntrianglelefteq"),n(r,o,m,"\u228a","\\subsetneq"),n(r,o,m,"\ue01a","\\varsubsetneq"),n(r,o,m,"\u2acb","\\subsetneqq"),n(r,o,m,"\ue017","\\varsubsetneqq"),n(r,o,m,"\u226f","\\ngtr"),n(r,o,m,"\ue00f","\\ngeqslant"),n(r,o,m,"\ue00e","\\ngeqq"),n(r,o,m,"\u2a88","\\gneq"),n(r,o,m,"\u2269","\\gneqq"),n(r,o,m,"\ue00d","\\gvertneqq"),n(r,o,m,"\u22e7","\\gnsim"),n(r,o,m,"\u2a8a","\\gnapprox"),n(r,o,m,"\u2281","\\nsucc"),n(r,o,m,"\u22e1","\\nsucceq"),n(r,o,m,"\u22e9","\\succnsim"),n(r,o,m,"\u2aba","\\succnapprox"),n(r,o,m,"\u2246","\\ncong"),n(r,o,m,"\ue007","\\nshortparallel"),n(r,o,m,"\u2226","\\nparallel"),n(r,o,m,"\u22af","\\nVDash"),n(r,o,m,"\u22eb","\\ntriangleright"),n(r,o,m,"\u22ed","\\ntrianglerighteq"),n(r,o,m,"\ue018","\\nsupseteqq"),n(r,o,m,"\u228b","\\supsetneq"),n(r,o,m,"\ue01b","\\varsupsetneq"),n(r,o,m,"\u2acc","\\supsetneqq"),n(r,o,m,"\ue019","\\varsupsetneqq"),n(r,o,m,"\u22ae","\\nVdash"),n(r,o,m,"\u2ab5","\\precneqq"),n(r,o,m,"\u2ab6","\\succneqq"),n(r,o,m,"\ue016","\\nsubseteqq"),n(r,o,l,"\u22b4","\\unlhd"),n(r,o,l,"\u22b5","\\unrhd"),n(r,o,m,"\u219a","\\nleftarrow"),n(r,o,m,"\u219b","\\nrightarrow"),n(r,o,m,"\u21cd","\\nLeftarrow"),n(r,o,m,"\u21cf","\\nRightarrow"),n(r,o,m,"\u21ae","\\nleftrightarrow"),n(r,o,m,"\u21ce","\\nLeftrightarrow"),n(r,o,m,"\u25b3","\\vartriangle"),n(r,o,v,"\u210f","\\hslash"),n(r,o,v,"\u25bd","\\triangledown"),n(r,o,v,"\u25ca","\\lozenge"),n(r,o,v,"\u24c8","\\circledS"),n(r,o,v,"\xae","\\circledR"),n(i,o,v,"\xae","\\circledR"),n(r,o,v,"\u2221","\\measuredangle"),n(r,o,v,"\u2204","\\nexists"),n(r,o,v,"\u2127","\\mho"),n(r,o,v,"\u2132","\\Finv"),n(r,o,v,"\u2141","\\Game"),n(r,o,v,"k","\\Bbbk"),n(r,o,v,"\u2035","\\backprime"),n(r,o,v,"\u25b2","\\blacktriangle"),n(r,o,v,"\u25bc","\\blacktriangledown"),n(r,o,v,"\u25a0","\\blacksquare"),n(r,o,v,"\u29eb","\\blacklozenge"),n(r,o,v,"\u2605","\\bigstar"),n(r,o,v,"\u2222","\\sphericalangle"),n(r,o,v,"\u2201","\\complement"),n(r,o,v,"\xf0","\\eth"),n(r,o,v,"\u2571","\\diagup"),n(r,o,v,"\u2572","\\diagdown"),n(r,o,v,"\u25a1","\\square"),n(r,o,v,"\u25a1","\\Box"),n(r,o,v,"\u25ca","\\Diamond"),n(r,o,v,"\xa5","\\yen"),n(r,o,v,"\u2713","\\checkmark"),n(i,o,v,"\u2713","\\checkmark"),n(r,o,v,"\u2136","\\beth"),n(r,o,v,"\u2138","\\daleth"),n(r,o,v,"\u2137","\\gimel"),n(r,o,v,"\u03dd","\\digamma"),n(r,o,v,"\u03f0","\\varkappa"),n(r,o,p,"\u250c","\\ulcorner"),n(r,o,u,"\u2510","\\urcorner"),n(r,o,p,"\u2514","\\llcorner"),n(r,o,u,"\u2518","\\lrcorner"),n(r,o,m,"\u2266","\\leqq"),n(r,o,m,"\u2a7d","\\leqslant"),n(r,o,m,"\u2a95","\\eqslantless"),n(r,o,m,"\u2272","\\lesssim"),n(r,o,m,"\u2a85","\\lessapprox"),n(r,o,m,"\u224a","\\approxeq"),n(r,o,l,"\u22d6","\\lessdot"),n(r,o,m,"\u22d8","\\lll"),n(r,o,m,"\u2276","\\lessgtr"),n(r,o,m,"\u22da","\\lesseqgtr"),n(r,o,m,"\u2a8b","\\lesseqqgtr"),n(r,o,m,"\u2251","\\doteqdot"),n(r,o,m,"\u2253","\\risingdotseq"),n(r,o,m,"\u2252","\\fallingdotseq"),n(r,o,m,"\u223d","\\backsim"),n(r,o,m,"\u22cd","\\backsimeq"),n(r,o,m,"\u2ac5","\\subseteqq"),n(r,o,m,"\u22d0","\\Subset"),n(r,o,m,"\u228f","\\sqsubset"),n(r,o,m,"\u227c","\\preccurlyeq"),n(r,o,m,"\u22de","\\curlyeqprec"),n(r,o,m,"\u227e","\\precsim"),n(r,o,m,"\u2ab7","\\precapprox"),n(r,o,m,"\u22b2","\\vartriangleleft"),n(r,o,m,"\u22b4","\\trianglelefteq"),n(r,o,m,"\u22a8","\\vDash"),n(r,o,m,"\u22aa","\\Vvdash"),n(r,o,m,"\u2323","\\smallsmile"),n(r,o,m,"\u2322","\\smallfrown"),n(r,o,m,"\u224f","\\bumpeq"),n(r,o,m,"\u224e","\\Bumpeq"),n(r,o,m,"\u2267","\\geqq"),n(r,o,m,"\u2a7e","\\geqslant"),n(r,o,m,"\u2a96","\\eqslantgtr"),n(r,o,m,"\u2273","\\gtrsim"),n(r,o,m,"\u2a86","\\gtrapprox"),n(r,o,l,"\u22d7","\\gtrdot"),n(r,o,m,"\u22d9","\\ggg"),n(r,o,m,"\u2277","\\gtrless"),n(r,o,m,"\u22db","\\gtreqless"),n(r,o,m,"\u2a8c","\\gtreqqless"),n(r,o,m,"\u2256","\\eqcirc"),n(r,o,m,"\u2257","\\circeq"),n(r,o,m,"\u225c","\\triangleq"),n(r,o,m,"\u223c","\\thicksim"),n(r,o,m,"\u2248","\\thickapprox"),n(r,o,m,"\u2ac6","\\supseteqq"),n(r,o,m,"\u22d1","\\Supset"),n(r,o,m,"\u2290","\\sqsupset"),n(r,o,m,"\u227d","\\succcurlyeq"),n(r,o,m,"\u22df","\\curlyeqsucc"),n(r,o,m,"\u227f","\\succsim"),n(r,o,m,"\u2ab8","\\succapprox"),n(r,o,m,"\u22b3","\\vartriangleright"),n(r,o,m,"\u22b5","\\trianglerighteq"),n(r,o,m,"\u22a9","\\Vdash"),n(r,o,m,"\u2223","\\shortmid"),n(r,o,m,"\u2225","\\shortparallel"),n(r,o,m,"\u226c","\\between"),n(r,o,m,"\u22d4","\\pitchfork"),n(r,o,m,"\u221d","\\varpropto"),n(r,o,m,"\u25c0","\\blacktriangleleft"),n(r,o,m,"\u2234","\\therefore"),n(r,o,m,"\u220d","\\backepsilon"),n(r,o,m,"\u25b6","\\blacktriangleright"),n(r,o,m,"\u2235","\\because"),n(r,o,m,"\u22d8","\\llless"),n(r,o,m,"\u22d9","\\gggtr"),n(r,o,l,"\u22b2","\\lhd"),n(r,o,l,"\u22b3","\\rhd"),n(r,o,m,"\u2242","\\eqsim"),n(r,a,m,"\u22c8","\\Join"),n(r,o,m,"\u2251","\\Doteq"),n(r,o,l,"\u2214","\\dotplus"),n(r,o,l,"\u2216","\\smallsetminus"),n(r,o,l,"\u22d2","\\Cap"),n(r,o,l,"\u22d3","\\Cup"),n(r,o,l,"\u2a5e","\\doublebarwedge"),n(r,o,l,"\u229f","\\boxminus"),n(r,o,l,"\u229e","\\boxplus"),n(r,o,l,"\u22c7","\\divideontimes"),n(r,o,l,"\u22c9","\\ltimes"),n(r,o,l,"\u22ca","\\rtimes"),n(r,o,l,"\u22cb","\\leftthreetimes"),n(r,o,l,"\u22cc","\\rightthreetimes"),n(r,o,l,"\u22cf","\\curlywedge"),n(r,o,l,"\u22ce","\\curlyvee"),n(r,o,l,"\u229d","\\circleddash"),n(r,o,l,"\u229b","\\circledast"),n(r,o,l,"\u22c5","\\centerdot"),n(r,o,l,"\u22ba","\\intercal"),n(r,o,l,"\u22d2","\\doublecap"),n(r,o,l,"\u22d3","\\doublecup"),n(r,o,l,"\u22a0","\\boxtimes"),n(r,o,m,"\u21e2","\\dashrightarrow"),n(r,o,m,"\u21e0","\\dashleftarrow"),n(r,o,m,"\u21c7","\\leftleftarrows"),n(r,o,m,"\u21c6","\\leftrightarrows"),n(r,o,m,"\u21da","\\Lleftarrow"),n(r,o,m,"\u219e","\\twoheadleftarrow"),n(r,o,m,"\u21a2","\\leftarrowtail"),n(r,o,m,"\u21ab","\\looparrowleft"),n(r,o,m,"\u21cb","\\leftrightharpoons"),n(r,o,m,"\u21b6","\\curvearrowleft"),n(r,o,m,"\u21ba","\\circlearrowleft"),n(r,o,m,"\u21b0","\\Lsh"),n(r,o,m,"\u21c8","\\upuparrows"),n(r,o,m,"\u21bf","\\upharpoonleft"),n(r,o,m,"\u21c3","\\downharpoonleft"),n(r,o,m,"\u22b8","\\multimap"),n(r,o,m,"\u21ad","\\leftrightsquigarrow"),n(r,o,m,"\u21c9","\\rightrightarrows"),n(r,o,m,"\u21c4","\\rightleftarrows"),n(r,o,m,"\u21a0","\\twoheadrightarrow"),n(r,o,m,"\u21a3","\\rightarrowtail"),n(r,o,m,"\u21ac","\\looparrowright"),n(r,o,m,"\u21b7","\\curvearrowright"),n(r,o,m,"\u21bb","\\circlearrowright"),n(r,o,m,"\u21b1","\\Rsh"),n(r,o,m,"\u21ca","\\downdownarrows"),n(r,o,m,"\u21be","\\upharpoonright"),n(r,o,m,"\u21c2","\\downharpoonright"),n(r,o,m,"\u21dd","\\rightsquigarrow"),n(r,o,m,"\u21dd","\\leadsto"),n(r,o,m,"\u21db","\\Rrightarrow"),n(r,o,m,"\u21be","\\restriction"),n(r,a,v,"\u2018","`"),n(r,a,v,"$","\\$"),n(i,a,v,"$","\\$"),n(i,a,v,"$","\\textdollar"),n(r,a,v,"%","\\%"),n(i,a,v,"%","\\%"),n(r,a,v,"_","\\_"),n(i,a,v,"_","\\_"),n(i,a,v,"_","\\textunderscore"),n(r,a,v,"\u2220","\\angle"),n(r,a,v,"\u221e","\\infty"),n(r,a,v,"\u2032","\\prime"),n(r,a,v,"\u25b3","\\triangle"),n(r,a,v,"\u0393","\\Gamma",!0),n(r,a,v,"\u0394","\\Delta",!0),n(r,a,v,"\u0398","\\Theta",!0),n(r,a,v,"\u039b","\\Lambda",!0),n(r,a,v,"\u039e","\\Xi",!0),n(r,a,v,"\u03a0","\\Pi",!0),n(r,a,v,"\u03a3","\\Sigma",!0),n(r,a,v,"\u03a5","\\Upsilon",!0),n(r,a,v,"\u03a6","\\Phi",!0),n(r,a,v,"\u03a8","\\Psi",!0),n(r,a,v,"\u03a9","\\Omega",!0),n(r,a,v,"\xac","\\neg"),n(r,a,v,"\xac","\\lnot"),n(r,a,v,"\u22a4","\\top"),n(r,a,v,"\u22a5","\\bot"),n(r,a,v,"\u2205","\\emptyset"),n(r,o,v,"\u2205","\\varnothing"),n(r,a,c,"\u03b1","\\alpha",!0),n(r,a,c,"\u03b2","\\beta",!0),n(r,a,c,"\u03b3","\\gamma",!0),n(r,a,c,"\u03b4","\\delta",!0),n(r,a,c,"\u03f5","\\epsilon",!0),n(r,a,c,"\u03b6","\\zeta",!0),n(r,a,c,"\u03b7","\\eta",!0),n(r,a,c,"\u03b8","\\theta",!0),n(r,a,c,"\u03b9","\\iota",!0),n(r,a,c,"\u03ba","\\kappa",!0),n(r,a,c,"\u03bb","\\lambda",!0),n(r,a,c,"\u03bc","\\mu",!0),n(r,a,c,"\u03bd","\\nu",!0),n(r,a,c,"\u03be","\\xi",!0),n(r,a,c,"\u03bf","\\omicron",!0),n(r,a,c,"\u03c0","\\pi",!0),n(r,a,c,"\u03c1","\\rho",!0),n(r,a,c,"\u03c3","\\sigma",!0),n(r,a,c,"\u03c4","\\tau",!0),n(r,a,c,"\u03c5","\\upsilon",!0),n(r,a,c,"\u03d5","\\phi",!0),n(r,a,c,"\u03c7","\\chi",!0),n(r,a,c,"\u03c8","\\psi",!0),n(r,a,c,"\u03c9","\\omega",!0),n(r,a,c,"\u03b5","\\varepsilon",!0),n(r,a,c,"\u03d1","\\vartheta",!0),n(r,a,c,"\u03d6","\\varpi",!0),n(r,a,c,"\u03f1","\\varrho",!0),n(r,a,c,"\u03c2","\\varsigma",!0),n(r,a,c,"\u03c6","\\varphi",!0),n(r,a,l,"\u2217","*"),n(r,a,l,"+","+"),n(r,a,l,"\u2212","-"),n(r,a,l,"\u22c5","\\cdot"),n(r,a,l,"\u2218","\\circ"),n(r,a,l,"\xf7","\\div"),n(r,a,l,"\xb1","\\pm"),n(r,a,l,"\xd7","\\times"),n(r,a,l,"\u2229","\\cap"),n(r,a,l,"\u222a","\\cup"),n(r,a,l,"\u2216","\\setminus"),n(r,a,l,"\u2227","\\land"),n(r,a,l,"\u2228","\\lor"),n(r,a,l,"\u2227","\\wedge"),n(r,a,l,"\u2228","\\vee"),n(r,a,v,"\u221a","\\surd"),n(r,a,p,"(","("),n(r,a,p,"[","["),n(r,a,p,"\u27e8","\\langle"),n(r,a,p,"\u2223","\\lvert"),n(r,a,p,"\u2225","\\lVert"),n(r,a,u,")",")"),n(r,a,u,"]","]"),n(r,a,u,"?","?"),n(r,a,u,"!","!"),n(r,a,u,"\u27e9","\\rangle"),n(r,a,u,"\u2223","\\rvert"),n(r,a,u,"\u2225","\\rVert"),n(r,a,m,"=","="),n(r,a,m,"<","<"),n(r,a,m,">",">"),n(r,a,m,":",":"),n(r,a,m,"\u2248","\\approx"),n(r,a,m,"\u2245","\\cong"),n(r,a,m,"\u2265","\\ge"),n(r,a,m,"\u2265","\\geq"),n(r,a,m,"\u2190","\\gets"),n(r,a,m,">","\\gt"),n(r,a,m,"\u2208","\\in"),n(r,a,m,"\u2209","\\notin"),n(r,a,m,"\u0338","\\not"),n(r,a,m,"\u2282","\\subset"),n(r,a,m,"\u2283","\\supset"),n(r,a,m,"\u2286","\\subseteq"),n(r,a,m,"\u2287","\\supseteq"),n(r,o,m,"\u2288","\\nsubseteq"),n(r,o,m,"\u2289","\\nsupseteq"),n(r,a,m,"\u22a8","\\models"),n(r,a,m,"\u2190","\\leftarrow"),n(r,a,m,"\u2264","\\le"),n(r,a,m,"\u2264","\\leq"),n(r,a,m,"<","\\lt"),n(r,a,m,"\u2260","\\ne"),n(r,a,m,"\u2260","\\neq"),n(r,a,m,"\u2192","\\rightarrow"),n(r,a,m,"\u2192","\\to"),n(r,o,m,"\u2271","\\ngeq"),n(r,o,m,"\u2270","\\nleq"),n(r,a,g,null,"\\!"),n(r,a,g,"\xa0","\\ "),n(r,a,g,"\xa0","~"),n(r,a,g,null,"\\,"),n(r,a,g,null,"\\:"),n(r,a,g,null,"\\;"),n(r,a,g,null,"\\enspace"),n(r,a,g,null,"\\qquad"),n(r,a,g,null,"\\quad"),n(r,a,g,"\xa0","\\space"),n(r,a,f,",",","),n(r,a,f,";",";"),n(r,a,f,":","\\colon"),n(r,o,l,"\u22bc","\\barwedge"),n(r,o,l,"\u22bb","\\veebar"),n(r,a,l,"\u2299","\\odot"),n(r,a,l,"\u2295","\\oplus"),n(r,a,l,"\u2297","\\otimes"),n(r,a,v,"\u2202","\\partial"),n(r,a,l,"\u2298","\\oslash"),n(r,o,l,"\u229a","\\circledcirc"),n(r,o,l,"\u22a1","\\boxdot"),n(r,a,l,"\u25b3","\\bigtriangleup"),n(r,a,l,"\u25bd","\\bigtriangledown"),n(r,a,l,"\u2020","\\dagger"),n(r,a,l,"\u22c4","\\diamond"),n(r,a,l,"\u22c6","\\star"),n(r,a,l,"\u25c3","\\triangleleft"),n(r,a,l,"\u25b9","\\triangleright"),n(r,a,p,"{","\\{"),n(i,a,v,"{","\\{"),n(i,a,v,"{","\\textbraceleft"),n(r,a,u,"}","\\}"),n(i,a,v,"}","\\}"),n(i,a,v,"}","\\textbraceright"),n(r,a,p,"{","\\lbrace"),n(r,a,u,"}","\\rbrace"),n(r,a,p,"[","\\lbrack"),n(r,a,u,"]","\\rbrack"),n(i,a,v,"<","\\textless"),n(i,a,v,">","\\textgreater"),n(r,a,p,"\u230a","\\lfloor"),n(r,a,u,"\u230b","\\rfloor"),n(r,a,p,"\u2308","\\lceil"),n(r,a,u,"\u2309","\\rceil"),n(r,a,v,"\\","\\backslash"),n(r,a,v,"\u2223","|"),n(r,a,v,"\u2223","\\vert"),n(i,a,v,"|","\\textbar"),n(r,a,v,"\u2225","\\|"),n(r,a,v,"\u2225","\\Vert"),n(i,a,v,"\u2225","\\textbardbl"),n(r,a,m,"\u2191","\\uparrow"),n(r,a,m,"\u21d1","\\Uparrow"),n(r,a,m,"\u2193","\\downarrow"),n(r,a,m,"\u21d3","\\Downarrow"),n(r,a,m,"\u2195","\\updownarrow"),n(r,a,m,"\u21d5","\\Updownarrow"),n(r,a,h,"\u2210","\\coprod"),n(r,a,h,"\u22c1","\\bigvee"),n(r,a,h,"\u22c0","\\bigwedge"),n(r,a,h,"\u2a04","\\biguplus"),n(r,a,h,"\u22c2","\\bigcap"),n(r,a,h,"\u22c3","\\bigcup"),n(r,a,h,"\u222b","\\int"),n(r,a,h,"\u222b","\\intop"),n(r,a,h,"\u222c","\\iint"),n(r,a,h,"\u222d","\\iiint"),n(r,a,h,"\u220f","\\prod"),n(r,a,h,"\u2211","\\sum"),n(r,a,h,"\u2a02","\\bigotimes"),n(r,a,h,"\u2a01","\\bigoplus"),n(r,a,h,"\u2a00","\\bigodot"),n(r,a,h,"\u222e","\\oint"),n(r,a,h,"\u2a06","\\bigsqcup"),n(r,a,h,"\u222b","\\smallint"),n(i,a,d,"\u2026","\\textellipsis"),n(r,a,d,"\u2026","\\mathellipsis"),n(i,a,d,"\u2026","\\ldots",!0),n(r,a,d,"\u2026","\\ldots",!0),n(r,a,d,"\u22ef","\\cdots",!0),n(r,a,d,"\u22f1","\\ddots",!0),n(r,a,v,"\u22ee","\\vdots",!0),n(r,a,s,"\xb4","\\acute"),n(r,a,s,"`","\\grave"),n(r,a,s,"\xa8","\\ddot"),n(r,a,s,"~","\\tilde"),n(r,a,s,"\xaf","\\bar"),n(r,a,s,"\u02d8","\\breve"),n(r,a,s,"\u02c7","\\check"),n(r,a,s,"^","\\hat"),n(r,a,s,"\u20d7","\\vec"),n(r,a,s,"\u02d9","\\dot"),n(r,a,c,"\u0131","\\imath"),n(r,a,c,"\u0237","\\jmath"),n(i,a,s,"\u02ca","\\'"),n(i,a,s,"\u02cb","\\`"),n(i,a,s,"\u02c6","\\^"),n(i,a,s,"\u02dc","\\~"),n(i,a,s,"\u02c9","\\="),n(i,a,s,"\u02d8","\\u"),n(i,a,s,"\u02d9","\\."),n(i,a,s,"\u02da","\\r"),n(i,a,s,"\u02c7","\\v"),n(i,a,s,"\xa8",'\\"'),n(i,a,s,"\u030b","\\H"),n(i,a,v,"\u2013","--"),n(i,a,v,"\u2013","\\textendash"),n(i,a,v,"\u2014","---"),n(i,a,v,"\u2014","\\textemdash"),n(i,a,v,"\u2018","`"),n(i,a,v,"\u2018","\\textquoteleft"),n(i,a,v,"\u2019","'"),n(i,a,v,"\u2019","\\textquoteright"),n(i,a,v,"\u201c","``"),n(i,a,v,"\u201c","\\textquotedblleft"),n(i,a,v,"\u201d","''"),n(i,a,v,"\u201d","\\textquotedblright"),n(r,a,v,"\xb0","\\degree"),n(i,a,v,"\xb0","\\degree"),n(r,a,c,"\xa3","\\pounds"),n(r,a,c,"\xa3","\\mathsterling"),n(i,a,c,"\xa3","\\pounds"),n(i,a,c,"\xa3","\\textsterling"),n(r,o,v,"\u2720","\\maltese"),n(i,o,v,"\u2720","\\maltese"),n(i,a,g,"\xa0","\\ "),n(i,a,g,"\xa0"," "),n(i,a,g,"\xa0","~");for(var b='0123456789/@."',y=0;y<b.length;y++){var x=b.charAt(y);n(r,a,v,x,x)}for(var w='0123456789!@*()-=+[]<>|";:?/.,',k=0;k<w.length;k++){var M=w.charAt(k);n(i,a,v,M,M)}for(var S="abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ",z=0;z<S.length;z++){var A=S.charAt(z);n(r,a,c,A,A),n(i,a,v,A,A)}for(var C=192;C<=214;C++){var T=String.fromCharCode(C);n(r,a,c,T,T),n(i,a,v,T,T)}for(var N=216;N<=246;N++){var E=String.fromCharCode(N);n(r,a,c,E,E),n(i,a,v,E,E)}for(var R=248;R<=255;R++){var L=String.fromCharCode(R);n(r,a,c,L,L),n(i,a,v,L,L)}for(var O=1040;O<=1103;O++){var q=String.fromCharCode(O);n(i,a,v,q,q)}n(i,a,v,"\u2013","\u2013"),n(i,a,v,"\u2014","\u2014"),n(i,a,v,"\u2018","\u2018"),n(i,a,v,"\u2019","\u2019"),n(i,a,v,"\u201c","\u201c"),n(i,a,v,"\u201d","\u201d")},{}],49:[function(e,t){var n=/[\uAC00-\uD7AF]/,r=/[\u3000-\u30FF\u4E00-\u9FAF\uAC00-\uD7AF\uFF00-\uFF60]/;t.exports={cjkRegex:r,hangulRegex:n}},{}],50:[function(e,t){function n(e){return e&&e.__esModule?e:{"default":e}}var r=n(e("./ParseError")),i={pt:1,mm:7227/2540,cm:7227/254,"in":72.27,bp:1.00375,pc:12,dd:1238/1157,cc:14856/1157,nd:685/642,nc:1370/107,sp:1/65536,px:1.00375},a={ex:!0,em:!0,mu:!0},o=function(e){return e.unit&&(e=e.unit),e in i||e in a||"ex"===e},s=function(e,t){var n=void 0;if(e.unit in i)n=i[e.unit]/t.fontMetrics().ptPerEm/t.sizeMultiplier;else if("mu"===e.unit)n=t.fontMetrics().cssEmPerMu;else{var a=void 0;if(a=t.style.isTight()?t.havingStyle(t.style.text()):t,"ex"===e.unit)n=a.fontMetrics().xHeight;else{if("em"!==e.unit)throw new r["default"]("Invalid unit: '"+e.unit+"'");n=a.fontMetrics().quad}a!==t&&(n*=a.sizeMultiplier/t.sizeMultiplier)}return e.number*n};t.exports={validUnit:o,calculateSize:s}},{"./ParseError":29}],51:[function(e,t){function n(e){return c[e]}function r(e){return(""+e).replace(h,n)}function i(e){p(e,"")}var a=Array.prototype.indexOf,o=function(e,t){if(null==e)return-1;if(a&&e.indexOf===a)return e.indexOf(t);for(var n=e.length,r=0;r<n;r++)if(e[r]===t)return r;return-1},s=function(e,t){return-1!==o(e,t)},l=function(e,t){return e===undefined?t:e},u=/([A-Z])/g,d=function(e){return e.replace(u,"-$1").toLowerCase()},c={"&":"&amp;",">":"&gt;","<":"&lt;",'"':"&quot;","'":"&#x27;"},h=/[&><"']/g,p=void 0;if("undefined"!=typeof document){var f=document.createElement("span");p="textContent"in f?function(e,t){e.textContent=t}:function(e,t){e.innerText=t}}t.exports={contains:s,deflt:l,escape:r,hyphenate:d,indexOf:o,setTextContent:p,clearNode:i}},{}]},{},[1])(1)},e.exports=t()}));
// Copyright 2018 The Distill Template Authors
const ae=function(e,t,n){let r=n,i=0;const a=e.length;for(;r<t.length;){const n=t[r];if(i<=0&&t.slice(r,r+a)===e)return r;"\\"===n?r++:"{"===n?i++:"}"===n&&i--,r++}return-1},oe=function(e,t,n,r){const i=[];for(let a=0;a<e.length;a++)if("text"===e[a].type){const o=e[a].data;let s,l=!0,u=0;for(-1!==(s=o.indexOf(t))&&(u=s,i.push({type:"text",data:o.slice(0,u)}),l=!1);;){if(l){if(-1===(s=o.indexOf(t,u)))break;i.push({type:"text",data:o.slice(u,s)}),u=s}else{if(-1===(s=ae(n,o,u+t.length)))break;i.push({type:"math",data:o.slice(u+t.length,s),rawData:o.slice(u,s+n.length),display:r}),u=s+n.length}l=!l}i.push({type:"text",data:o.slice(u)})}else i.push(e[a]);return i},se=function(e,t){let n=[{type:"text",data:e}];for(let e=0;e<t.length;e++){const r=t[e];n=oe(n,r.left,r.right,r.display||!1)}return n},le=function(e,t){const n=se(e,t.delimiters),r=document.createDocumentFragment();for(let e=0;e<n.length;e++)if("text"===n[e].type)r.appendChild(document.createTextNode(n[e].data));else{const a=document.createElement("d-math"),o=n[e].data;t.displayMode=n[e].display;try{a.textContent=o,t.displayMode&&a.setAttribute("block","")}catch(i){if(!(i instanceof katex.ParseError))throw i;t.errorCallback("KaTeX auto-render: Failed to parse `"+n[e].data+"` with ",i),r.appendChild(document.createTextNode(n[e].rawData));continue}r.appendChild(a)}return r},ue=function(e,t){for(let n=0;n<e.childNodes.length;n++){const r=e.childNodes[n];if(3===r.nodeType){const i=r.textContent;if(t.mightHaveMath(i)){const a=le(i,t);n+=a.childNodes.length-1,e.replaceChild(a,r)}}else if(1===r.nodeType){-1===t.ignoredTags.indexOf(r.nodeName.toLowerCase())&&ue(r,t)}}},de={delimiters:[{left:"$$",right:"$$",display:!0},{left:"\\[",right:"\\]",display:!0},{left:"\\(",right:"\\)",display:!1}],ignoredTags:["script","noscript","style","textarea","pre","code","svg"],errorCallback:function(e,t){console.error(e,t)}},ce=function(e,t){if(!e)throw new Error("No element provided to render");const n=Object.assign({},de,t),r=n.delimiters.flatMap(e=>[e.left,e.right]),i=e=>r.some(t=>-1!==e.indexOf(t));n.mightHaveMath=i,ue(e,n)};var he="iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA99JREFUeNrsG4t1ozDMzQSM4A2ODUonKBucN2hugtIJ6E1AboLcBiQTkJsANiAb9OCd/OpzMWBJBl5TvaeXPiiyJetry0J8wW3D3QpjRh3GjneXDq+fSQA9s2mH9x3KDhN4foJfCb8N/Jrv+2fnDn8vLRQOplWHVYdvHZYdZsBcZP1vBmh/n8DzEmhUQDPaOuP9pFuY+JwJHwHnCLQE2tnWBGEyXozY9xCUgHMhhjE2I4heVWtgIkZ83wL6Qgxj1obfWBxymPwe+b00BCCRNPbwfb60yleAkkBHGT5AEehIYz7eJrFDMF9CvH4wwhcGHiHMneFvLDQwlwvMLQq58trRcYBWfYn0A0OgHWQUSu25mE+BnoYKnnEJoeIWAifzOv7vLWd2ZKRfWAIme3tOiUaQ3UnLkb0xj1FxRIeEGKaGIHOs9nEgLaaA9i0JRYo1Ic67wJW86KSKE/ZAM8KuVMk8ITVhmxUxJ3Cl2xlm9Vtkeju1+mpCQNxaEGNCY8bs9X2YqwNoQeGjBWut/ma0QAWy/TqAsHx9wSya3I5IRxOfTC+leG+kA/4vSeEcGBtNUN6byhu3+keEZCQJUNh8MAO7HL6H8pQLnsW/Hd4T4lv93TPjfM7A46iEEqbB5EDOvwYNW6tGNZzT/o+CZ6sqZ6wUtR/wf7mi/VL8iNciT6rHih48Y55b4nKCHJCCzb4y0nwFmin3ZEMIoLfZF8F7nncFmvnWBaBj7CGAYA/WGJsUwHdYqVDwAmNsUgAx4CGgAA7GOOxADYOFWOaIKifuVYzmOpREqA21Mo7aPsgiY1PhOMAmxtR+AUbYH3Id2wc0SAFIQTsn9IUGWR8k9jx3vtXSiAacFxTAGakBk9UudkNECd6jLe+6HrshshvIuC6IlLMRy7er+JpcKma24SlE4cFZSZJDGVVrsNvitQhQrDhW0jfiOLfFd47C42eHT56D/BK0To+58Ahj+cAT8HT1UWlfLZCCd/uKawzU0Rh2EyIX/Icqth3niG8ybNroezwe6khdCNxRN+l4XGdOLVLlOOt2hTRJlr1ETIuMAltVTMz70mJrkdGAaZLSmnBEqmAE32JCMmuTlCnRgsBENtOUpHhvvsYIL0ibnBkaC6QvKcR7738GKp0AKnim7xgUSNv1bpS8QwhBt8r+EP47v/oyRK/S34yJ9nT+AN0Tkm4OdB9E4BsmXM3SnMlRFUrtp6IDpV2eKzdYvF3etm3KhQksbOLChGkSmcBdmcEwvqkrMy5BzL00NZeu3qPYJOOuCc+5NjcWKXQxFvTa3NoXJ4d8in7fiAUuTt781dkvuHX4K8AA2Usy7yNKLy0AAAAASUVORK5CYII=\n",pe=/["'&<>]/,fe=C;
/*!
=======
(function (global, factory) {
  typeof exports === "object" && typeof module !== "undefined"
    ? factory(exports, require("fs"))
    : typeof define === "function" && define.amd
      ? define(["exports", "fs"], factory)
      : ((global = global || self), factory((global.dl = {}), global.fs));
})(this, function (exports, fs) {
  "use strict";

  fs = fs && Object.prototype.hasOwnProperty.call(fs, "default") ? fs["default"] : fs;

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

  // Copyright 2018 The Distill Template Authors

  function ExtractFrontmatter(dom, data) {
    const frontMatterTag = dom.querySelector("d-front-matter");
    if (!frontMatterTag) {
      console.warn("No front matter tag found!");
      return;
    }
    const extractedData = parseFrontmatter(frontMatterTag);
    mergeFromYMLFrontmatter(data, extractedData);
  }

  function commonjsRequire() {
    throw new Error("Dynamic requires are not currently supported by rollup-plugin-commonjs");
  }

  function unwrapExports(x) {
    return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, "default") ? x["default"] : x;
  }

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

  function parseBibliography(element) {
    const scriptTag = element.firstElementChild;
    if (scriptTag && scriptTag.tagName === "SCRIPT") {
      if (scriptTag.type == "text/bibtex") {
        const bibtex = element.firstElementChild.textContent;
        return parseBibtex(bibtex);
      } else if (scriptTag.type == "text/json") {
        return new Map(JSON.parse(scriptTag.textContent));
      } else {
        console.warn("Unsupported bibliography script tag type: " + scriptTag.type);
      }
    } else {
      console.warn("Bibliography did not have any script tag.");
    }
  }

  // Copyright 2018 The Distill Template Authors

  function ExtractBibliography(dom, data) {
    const bibliographyTag = dom.querySelector("d-bibliography");
    if (!bibliographyTag) {
      console.warn("No bibliography tag found!");
      return;
    }

    const src = bibliographyTag.getAttribute("src");
    if (src) {
      const path = data.inputDirectory + "/" + src;
      const text = fs.readFileSync(path, "utf-8");
      const bibliography = parseBibtex(text);
      const scriptTag = dom.createElement("script");
      scriptTag.type = "text/json";
      scriptTag.textContent = JSON.stringify([...bibliography]);
      bibliographyTag.appendChild(scriptTag);
      bibliographyTag.removeAttribute("src");
    }

    data.bibliography = parseBibliography(bibliographyTag);
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

  // Copyright 2018 The Distill Template Authors

  function ExtractCitations(dom, data) {
    const citations = new Set(data.citations);
    const newCitations = collect_citations(dom);
    for (const citation of newCitations) {
      citations.add(citation);
    }
    data.citations = Array.from(citations);
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

  function HTML(dom) {
    const head = dom.querySelector("head");

    // set language to 'en'
    if (!dom.querySelector("html").getAttribute("lang")) {
      dom.querySelector("html").setAttribute("lang", "en");
    }

    // set charset to 'utf-8'
    if (!dom.querySelector("meta[charset]")) {
      const meta = dom.createElement("meta");
      meta.setAttribute("charset", "utf-8");
      head.appendChild(meta);
    }

    // set viewport
    if (!dom.querySelector("meta[name=viewport]")) {
      const meta = dom.createElement("meta");
      meta.setAttribute("name", "viewport");
      meta.setAttribute("content", "width=device-width, initial-scale=1");
      head.appendChild(meta);
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

  // Copyright 2018 The Distill Template Authors

  function Byline(dom, data) {
    const byline = dom.querySelector("d-byline");
    if (byline) {
      byline.innerHTML = bylineTemplate(data);
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

  function OptionalComponents(dom, data) {
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
        body.insertBefore(byline, article);
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

  var katex$1 = createCommonjsModule(function (module, exports) {
    (function (f) {
      {
        module.exports = f();
      }
    })(function () {
      return (function e(t, n, r) {
        function s(o, u) {
          if (!n[o]) {
            if (!t[o]) {
              var a = typeof commonjsRequire == "function" && commonjsRequire;
              if (!u && a) return a(o, !0);
              if (i) return i(o, !0);
              var f = new Error("Cannot find module '" + o + "'");
              throw ((f.code = "MODULE_NOT_FOUND"), f);
            }
            var l = (n[o] = { exports: {} });
            t[o][0].call(
              l.exports,
              function (e) {
                var n = t[o][1][e];
                return s(n ? n : e);
              },
              l,
              l.exports,
              e,
              t,
              n,
              r
            );
          }
          return n[o].exports;
        }
        var i = typeof commonjsRequire == "function" && commonjsRequire;
        for (var o = 0; o < r.length; o++) s(r[o]);
        return s;
      })(
        {
          1: [
            function (require, module, exports) {
              var _ParseError = require("./src/ParseError");

              var _ParseError2 = _interopRequireDefault(_ParseError);

              var _Settings = require("./src/Settings");

              var _Settings2 = _interopRequireDefault(_Settings);

              var _buildTree = require("./src/buildTree");

              var _buildTree2 = _interopRequireDefault(_buildTree);

              var _parseTree = require("./src/parseTree");

              var _parseTree2 = _interopRequireDefault(_parseTree);

              var _utils = require("./src/utils");

              var _utils2 = _interopRequireDefault(_utils);

              function _interopRequireDefault(obj) {
                return obj && obj.__esModule ? obj : { default: obj };
              }

              /**
               * Parse and build an expression, and place that expression in the DOM node
               * given.
               */
              var render = function render(expression, baseNode, options) {
                _utils2.default.clearNode(baseNode);

                var settings = new _Settings2.default(options);

                var tree = (0, _parseTree2.default)(expression, settings);
                var node = (0, _buildTree2.default)(tree, expression, settings).toNode();

                baseNode.appendChild(node);
              };

              // KaTeX's styles don't work properly in quirks mode. Print out an error, and
              // disable rendering.
              /* eslint no-console:0 */
              /**
               * This is the main entry point for KaTeX. Here, we expose functions for
               * rendering expressions either to DOM nodes or to markup strings.
               *
               * We also expose the ParseError class to check if errors thrown from KaTeX are
               * errors in the expression, or errors in javascript handling.
               */

              if (typeof document !== "undefined") {
                if (document.compatMode !== "CSS1Compat") {
                  typeof console !== "undefined" &&
                    console.warn("Warning: KaTeX doesn't work in quirks mode. Make sure your " + "website has a suitable doctype.");

                  render = function render() {
                    throw new _ParseError2.default("KaTeX doesn't work in quirks mode.");
                  };
                }
              }

              /**
               * Parse and build an expression, and return the markup for that.
               */
              var renderToString = function renderToString(expression, options) {
                var settings = new _Settings2.default(options);

                var tree = (0, _parseTree2.default)(expression, settings);
                return (0, _buildTree2.default)(tree, expression, settings).toMarkup();
              };

              /**
               * Parse an expression and return the parse tree.
               */
              var generateParseTree = function generateParseTree(expression, options) {
                var settings = new _Settings2.default(options);
                return (0, _parseTree2.default)(expression, settings);
              };

              module.exports = {
                render: render,
                renderToString: renderToString,
                /**
                 * NOTE: This method is not currently recommended for public use.
                 * The internal tree representation is unstable and is very likely
                 * to change. Use at your own risk.
                 */
                __parse: generateParseTree,
                ParseError: _ParseError2.default,
              };
            },
            {
              "./src/ParseError": 29,
              "./src/Settings": 32,
              "./src/buildTree": 37,
              "./src/parseTree": 46,
              "./src/utils": 51,
            },
          ],
          2: [
            function (require, module, exports) {
              module.exports = {
                default: require("core-js/library/fn/json/stringify"),
                __esModule: true,
              };
            },
            { "core-js/library/fn/json/stringify": 6 },
          ],
          3: [
            function (require, module, exports) {
              module.exports = {
                default: require("core-js/library/fn/object/define-property"),
                __esModule: true,
              };
            },
            { "core-js/library/fn/object/define-property": 7 },
          ],
          4: [
            function (require, module, exports) {
              exports.__esModule = true;

              exports.default = function (instance, Constructor) {
                if (!(instance instanceof Constructor)) {
                  throw new TypeError("Cannot call a class as a function");
                }
              };
            },
            {},
          ],
          5: [
            function (require, module, exports) {
              exports.__esModule = true;

              var _defineProperty = require("../core-js/object/define-property");

              var _defineProperty2 = _interopRequireDefault(_defineProperty);

              function _interopRequireDefault(obj) {
                return obj && obj.__esModule ? obj : { default: obj };
              }

              exports.default = (function () {
                function defineProperties(target, props) {
                  for (var i = 0; i < props.length; i++) {
                    var descriptor = props[i];
                    descriptor.enumerable = descriptor.enumerable || false;
                    descriptor.configurable = true;
                    if ("value" in descriptor) descriptor.writable = true;
                    (0, _defineProperty2.default)(target, descriptor.key, descriptor);
                  }
                }

                return function (Constructor, protoProps, staticProps) {
                  if (protoProps) defineProperties(Constructor.prototype, protoProps);
                  if (staticProps) defineProperties(Constructor, staticProps);
                  return Constructor;
                };
              })();
            },
            { "../core-js/object/define-property": 3 },
          ],
          6: [
            function (require, module, exports) {
              var core = require("../../modules/_core"),
                $JSON = core.JSON || (core.JSON = { stringify: JSON.stringify });
              module.exports = function stringify(it) {
                // eslint-disable-line no-unused-vars
                return $JSON.stringify.apply($JSON, arguments);
              };
            },
            { "../../modules/_core": 10 },
          ],
          7: [
            function (require, module, exports) {
              require("../../modules/es6.object.define-property");
              var $Object = require("../../modules/_core").Object;
              module.exports = function defineProperty(it, key, desc) {
                return $Object.defineProperty(it, key, desc);
              };
            },
            {
              "../../modules/_core": 10,
              "../../modules/es6.object.define-property": 23,
            },
          ],
          8: [
            function (require, module, exports) {
              module.exports = function (it) {
                if (typeof it != "function") throw TypeError(it + " is not a function!");
                return it;
              };
            },
            {},
          ],
          9: [
            function (require, module, exports) {
              var isObject = require("./_is-object");
              module.exports = function (it) {
                if (!isObject(it)) throw TypeError(it + " is not an object!");
                return it;
              };
            },
            { "./_is-object": 19 },
          ],
          10: [
            function (require, module, exports) {
              var core = (module.exports = { version: "2.4.0" });
              if (typeof __e == "number") __e = core; // eslint-disable-line no-undef
            },
            {},
          ],
          11: [
            function (require, module, exports) {
              // optional / simple context binding
              var aFunction = require("./_a-function");
              module.exports = function (fn, that, length) {
                aFunction(fn);
                if (that === undefined) return fn;
                switch (length) {
                  case 1:
                    return function (a) {
                      return fn.call(that, a);
                    };
                  case 2:
                    return function (a, b) {
                      return fn.call(that, a, b);
                    };
                  case 3:
                    return function (a, b, c) {
                      return fn.call(that, a, b, c);
                    };
                }
                return function (/* ...args */) {
                  return fn.apply(that, arguments);
                };
              };
            },
            { "./_a-function": 8 },
          ],
          12: [
            function (require, module, exports) {
              // Thank's IE8 for his funny defineProperty
              module.exports = !require("./_fails")(function () {
                return (
                  Object.defineProperty({}, "a", {
                    get: function () {
                      return 7;
                    },
                  }).a != 7
                );
              });
            },
            { "./_fails": 15 },
          ],
          13: [
            function (require, module, exports) {
              var isObject = require("./_is-object"),
                document = require("./_global").document,
                // in old IE typeof document.createElement is 'object'
                is = isObject(document) && isObject(document.createElement);
              module.exports = function (it) {
                return is ? document.createElement(it) : {};
              };
            },
            { "./_global": 16, "./_is-object": 19 },
          ],
          14: [
            function (require, module, exports) {
              var global = require("./_global"),
                core = require("./_core"),
                ctx = require("./_ctx"),
                hide = require("./_hide"),
                PROTOTYPE = "prototype";

              var $export = function (type, name, source) {
                var IS_FORCED = type & $export.F,
                  IS_GLOBAL = type & $export.G,
                  IS_STATIC = type & $export.S,
                  IS_PROTO = type & $export.P,
                  IS_BIND = type & $export.B,
                  IS_WRAP = type & $export.W,
                  exports = IS_GLOBAL ? core : core[name] || (core[name] = {}),
                  expProto = exports[PROTOTYPE],
                  target = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE],
                  key,
                  own,
                  out;
                if (IS_GLOBAL) source = name;
                for (key in source) {
                  // contains in native
                  own = !IS_FORCED && target && target[key] !== undefined;
                  if (own && key in exports) continue;
                  // export native or passed
                  out = own ? target[key] : source[key];
                  // prevent global pollution for namespaces
                  exports[key] =
                    IS_GLOBAL && typeof target[key] != "function"
                      ? source[key]
                      : // bind timers to global for call from export context
                        IS_BIND && own
                        ? ctx(out, global)
                        : // wrap global constructors for prevent change them in library
                          IS_WRAP && target[key] == out
                          ? (function (C) {
                              var F = function (a, b, c) {
                                if (this instanceof C) {
                                  switch (arguments.length) {
                                    case 0:
                                      return new C();
                                    case 1:
                                      return new C(a);
                                    case 2:
                                      return new C(a, b);
                                  }
                                  return new C(a, b, c);
                                }
                                return C.apply(this, arguments);
                              };
                              F[PROTOTYPE] = C[PROTOTYPE];
                              return F;
                              // make static versions for prototype methods
                            })(out)
                          : IS_PROTO && typeof out == "function"
                            ? ctx(Function.call, out)
                            : out;
                  // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%
                  if (IS_PROTO) {
                    (exports.virtual || (exports.virtual = {}))[key] = out;
                    // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
                    if (type & $export.R && expProto && !expProto[key]) hide(expProto, key, out);
                  }
                }
              };
              // type bitmap
              $export.F = 1; // forced
              $export.G = 2; // global
              $export.S = 4; // static
              $export.P = 8; // proto
              $export.B = 16; // bind
              $export.W = 32; // wrap
              $export.U = 64; // safe
              $export.R = 128; // real proto method for `library`
              module.exports = $export;
            },
            {
              "./_core": 10,
              "./_ctx": 11,
              "./_global": 16,
              "./_hide": 17,
            },
          ],
          15: [
            function (require, module, exports) {
              module.exports = function (exec) {
                try {
                  return !!exec();
                } catch (e) {
                  return true;
                }
              };
            },
            {},
          ],
          16: [
            function (require, module, exports) {
              // https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
              var global = (module.exports =
                typeof window != "undefined" && window.Math == Math
                  ? window
                  : typeof self != "undefined" && self.Math == Math
                    ? self
                    : Function("return this")());
              if (typeof __g == "number") __g = global; // eslint-disable-line no-undef
            },
            {},
          ],
          17: [
            function (require, module, exports) {
              var dP = require("./_object-dp"),
                createDesc = require("./_property-desc");
              module.exports = require("./_descriptors")
                ? function (object, key, value) {
                    return dP.f(object, key, createDesc(1, value));
                  }
                : function (object, key, value) {
                    object[key] = value;
                    return object;
                  };
            },
            {
              "./_descriptors": 12,
              "./_object-dp": 20,
              "./_property-desc": 21,
            },
          ],
          18: [
            function (require, module, exports) {
              module.exports =
                !require("./_descriptors") &&
                !require("./_fails")(function () {
                  return (
                    Object.defineProperty(require("./_dom-create")("div"), "a", {
                      get: function () {
                        return 7;
                      },
                    }).a != 7
                  );
                });
            },
            {
              "./_descriptors": 12,
              "./_dom-create": 13,
              "./_fails": 15,
            },
          ],
          19: [
            function (require, module, exports) {
              module.exports = function (it) {
                return typeof it === "object" ? it !== null : typeof it === "function";
              };
            },
            {},
          ],
          20: [
            function (require, module, exports) {
              var anObject = require("./_an-object"),
                IE8_DOM_DEFINE = require("./_ie8-dom-define"),
                toPrimitive = require("./_to-primitive"),
                dP = Object.defineProperty;

              exports.f = require("./_descriptors")
                ? Object.defineProperty
                : function defineProperty(O, P, Attributes) {
                    anObject(O);
                    P = toPrimitive(P, true);
                    anObject(Attributes);
                    if (IE8_DOM_DEFINE)
                      try {
                        return dP(O, P, Attributes);
                      } catch (e) {
                        /* empty */
                      }
                    if ("get" in Attributes || "set" in Attributes) throw TypeError("Accessors not supported!");
                    if ("value" in Attributes) O[P] = Attributes.value;
                    return O;
                  };
            },
            {
              "./_an-object": 9,
              "./_descriptors": 12,
              "./_ie8-dom-define": 18,
              "./_to-primitive": 22,
            },
          ],
          21: [
            function (require, module, exports) {
              module.exports = function (bitmap, value) {
                return {
                  enumerable: !(bitmap & 1),
                  configurable: !(bitmap & 2),
                  writable: !(bitmap & 4),
                  value: value,
                };
              };
            },
            {},
          ],
          22: [
            function (require, module, exports) {
              // 7.1.1 ToPrimitive(input [, PreferredType])
              var isObject = require("./_is-object");
              // instead of the ES6 spec version, we didn't implement @@toPrimitive case
              // and the second argument - flag - preferred type is a string
              module.exports = function (it, S) {
                if (!isObject(it)) return it;
                var fn, val;
                if (S && typeof (fn = it.toString) == "function" && !isObject((val = fn.call(it)))) return val;
                if (typeof (fn = it.valueOf) == "function" && !isObject((val = fn.call(it)))) return val;
                if (!S && typeof (fn = it.toString) == "function" && !isObject((val = fn.call(it)))) return val;
                throw TypeError("Can't convert object to primitive value");
              };
            },
            { "./_is-object": 19 },
          ],
          23: [
            function (require, module, exports) {
              var $export = require("./_export");
              // 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
              $export($export.S + $export.F * !require("./_descriptors"), "Object", { defineProperty: require("./_object-dp").f });
            },
            {
              "./_descriptors": 12,
              "./_export": 14,
              "./_object-dp": 20,
            },
          ],
          24: [
            function (require, module, exports) {
              function getRelocatable(re) {
                // In the future, this could use a WeakMap instead of an expando.
                if (!re.__matchAtRelocatable) {
                  // Disjunctions are the lowest-precedence operator, so we can make any
                  // pattern match the empty string by appending `|()` to it:
                  // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-patterns
                  var source = re.source + "|()";

                  // We always make the new regex global.
                  var flags = "g" + (re.ignoreCase ? "i" : "") + (re.multiline ? "m" : "") + (re.unicode ? "u" : "");
                  // sticky (/.../y) doesn't make sense in conjunction with our relocation
                  // logic, so we ignore it here.
                  re.__matchAtRelocatable = new RegExp(source, flags);
                }
                return re.__matchAtRelocatable;
              }

              function matchAt(re, str, pos) {
                if (re.global || re.sticky) {
                  throw new Error("matchAt(...): Only non-global regexes are supported");
                }
                var reloc = getRelocatable(re);
                reloc.lastIndex = pos;
                var match = reloc.exec(str);
                // Last capturing group is our sentinel that indicates whether the regex
                // matched at the given location.
                if (match[match.length - 1] == null) {
                  // Original regex matched.
                  match.length = match.length - 1;
                  return match;
                } else {
                  return null;
                }
              }

              module.exports = matchAt;
            },
            {},
          ],
          25: [
            function (require, module, exports) {
              /* eslint-disable no-unused-vars */
              var hasOwnProperty = Object.prototype.hasOwnProperty;
              var propIsEnumerable = Object.prototype.propertyIsEnumerable;

              function toObject(val) {
                if (val === null || val === undefined) {
                  throw new TypeError("Object.assign cannot be called with null or undefined");
                }

                return Object(val);
              }

              function shouldUseNative() {
                try {
                  if (!Object.assign) {
                    return false;
                  }

                  // Detect buggy property enumeration order in older V8 versions.

                  // https://bugs.chromium.org/p/v8/issues/detail?id=4118
                  var test1 = new String("abc"); // eslint-disable-line
                  test1[5] = "de";
                  if (Object.getOwnPropertyNames(test1)[0] === "5") {
                    return false;
                  }

                  // https://bugs.chromium.org/p/v8/issues/detail?id=3056
                  var test2 = {};
                  for (var i = 0; i < 10; i++) {
                    test2["_" + String.fromCharCode(i)] = i;
                  }
                  var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
                    return test2[n];
                  });
                  if (order2.join("") !== "0123456789") {
                    return false;
                  }

                  // https://bugs.chromium.org/p/v8/issues/detail?id=3056
                  var test3 = {};
                  "abcdefghijklmnopqrst".split("").forEach(function (letter) {
                    test3[letter] = letter;
                  });
                  if (Object.keys(Object.assign({}, test3)).join("") !== "abcdefghijklmnopqrst") {
                    return false;
                  }

                  return true;
                } catch (e) {
                  // We don't expect any of the above to throw, but better to be safe.
                  return false;
                }
              }

              module.exports = shouldUseNative()
                ? Object.assign
                : function (target, source) {
                    var from;
                    var to = toObject(target);
                    var symbols;

                    for (var s = 1; s < arguments.length; s++) {
                      from = Object(arguments[s]);

                      for (var key in from) {
                        if (hasOwnProperty.call(from, key)) {
                          to[key] = from[key];
                        }
                      }

                      if (Object.getOwnPropertySymbols) {
                        symbols = Object.getOwnPropertySymbols(from);
                        for (var i = 0; i < symbols.length; i++) {
                          if (propIsEnumerable.call(from, symbols[i])) {
                            to[symbols[i]] = from[symbols[i]];
                          }
                        }
                      }
                    }

                    return to;
                  };
            },
            {},
          ],
          26: [
            function (require, module, exports) {
              var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

              var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

              var _createClass2 = require("babel-runtime/helpers/createClass");

              var _createClass3 = _interopRequireDefault(_createClass2);

              var _matchAt = require("match-at");

              var _matchAt2 = _interopRequireDefault(_matchAt);

              var _ParseError = require("./ParseError");

              var _ParseError2 = _interopRequireDefault(_ParseError);

              function _interopRequireDefault(obj) {
                return obj && obj.__esModule ? obj : { default: obj };
              }

              /**
               * The resulting token returned from `lex`.
               *
               * It consists of the token text plus some position information.
               * The position information is essentially a range in an input string,
               * but instead of referencing the bare input string, we refer to the lexer.
               * That way it is possible to attach extra metadata to the input string,
               * like for example a file name or similar.
               *
               * The position information (all three parameters) is optional,
               * so it is OK to construct synthetic tokens if appropriate.
               * Not providing available position information may lead to
               * degraded error reporting, though.
               *
               * @param {string}  text   the text of this token
               * @param {number=} start  the start offset, zero-based inclusive
               * @param {number=} end    the end offset, zero-based exclusive
               * @param {Lexer=}  lexer  the lexer which in turn holds the input string
               */
              /**
               * The Lexer class handles tokenizing the input in various ways. Since our
               * parser expects us to be able to backtrack, the lexer allows lexing from any
               * given starting point.
               *
               * Its main exposed function is the `lex` function, which takes a position to
               * lex from and a type of token to lex. It defers to the appropriate `_innerLex`
               * function.
               *
               * The various `_innerLex` functions perform the actual lexing of different
               * kinds.
               */

              var Token = (function () {
                function Token(text, start, end, lexer) {
                  (0, _classCallCheck3.default)(this, Token);

                  this.text = text;
                  this.start = start;
                  this.end = end;
                  this.lexer = lexer;
                }

                /**
                 * Given a pair of tokens (this and endToken), compute a “Token” encompassing
                 * the whole input range enclosed by these two.
                 *
                 * @param {Token}  endToken  last token of the range, inclusive
                 * @param {string} text      the text of the newly constructed token
                 */

                (0, _createClass3.default)(Token, [
                  {
                    key: "range",
                    value: function range(endToken, text) {
                      if (endToken.lexer !== this.lexer) {
                        return new Token(text); // sorry, no position information available
                      }
                      return new Token(text, this.start, endToken.end, this.lexer);
                    },
                  },
                ]);
                return Token;
              })();

              /* The following tokenRegex
               * - matches typical whitespace (but not NBSP etc.) using its first group
               * - does not match any control character \x00-\x1f except whitespace
               * - does not match a bare backslash
               * - matches any ASCII character except those just mentioned
               * - does not match the BMP private use area \uE000-\uF8FF
               * - does not match bare surrogate code units
               * - matches any BMP character except for those just described
               * - matches any valid Unicode surrogate pair
               * - matches a backslash followed by one or more letters
               * - matches a backslash followed by any BMP character, including newline
               * Just because the Lexer matches something doesn't mean it's valid input:
               * If there is no matching function or symbol definition, the Parser will
               * still reject the input.
               */

              var tokenRegex = new RegExp(
                "([ \r\n\t]+)|" + // whitespace
                  "([!-\\[\\]-\u2027\u202A-\uD7FF\uF900-\uFFFF]" + // single codepoint
                  "|[\uD800-\uDBFF][\uDC00-\uDFFF]" + // surrogate pair
                  "|\\\\(?:[a-zA-Z]+|[^\uD800-\uDFFF])" + // function name
                  ")"
              );

              /*
               * Main Lexer class
               */

              var Lexer = (function () {
                function Lexer(input) {
                  (0, _classCallCheck3.default)(this, Lexer);

                  this.input = input;
                  this.pos = 0;
                }

                /**
                 * This function lexes a single token.
                 */

                (0, _createClass3.default)(Lexer, [
                  {
                    key: "lex",
                    value: function lex() {
                      var input = this.input;
                      var pos = this.pos;
                      if (pos === input.length) {
                        return new Token("EOF", pos, pos, this);
                      }
                      var match = (0, _matchAt2.default)(tokenRegex, input, pos);
                      if (match === null) {
                        throw new _ParseError2.default("Unexpected character: '" + input[pos] + "'", new Token(input[pos], pos, pos + 1, this));
                      }
                      var text = match[2] || " ";
                      var start = this.pos;
                      this.pos += match[0].length;
                      var end = this.pos;
                      return new Token(text, start, end, this);
                    },
                  },
                ]);
                return Lexer;
              })();

              module.exports = Lexer;
            },
            {
              "./ParseError": 29,
              "babel-runtime/helpers/classCallCheck": 4,
              "babel-runtime/helpers/createClass": 5,
              "match-at": 24,
            },
          ],
          27: [
            function (require, module, exports) {
              var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

              var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

              var _createClass2 = require("babel-runtime/helpers/createClass");

              var _createClass3 = _interopRequireDefault(_createClass2);

              var _Lexer = require("./Lexer");

              var _Lexer2 = _interopRequireDefault(_Lexer);

              var _macros = require("./macros");

              var _macros2 = _interopRequireDefault(_macros);

              var _ParseError = require("./ParseError");

              var _ParseError2 = _interopRequireDefault(_ParseError);

              var _objectAssign = require("object-assign");

              var _objectAssign2 = _interopRequireDefault(_objectAssign);

              function _interopRequireDefault(obj) {
                return obj && obj.__esModule ? obj : { default: obj };
              }

              /**
               * This file contains the “gullet” where macros are expanded
               * until only non-macro tokens remain.
               */

              var MacroExpander = (function () {
                function MacroExpander(input, macros) {
                  (0, _classCallCheck3.default)(this, MacroExpander);

                  this.lexer = new _Lexer2.default(input);
                  this.macros = (0, _objectAssign2.default)({}, _macros2.default, macros);
                  this.stack = []; // contains tokens in REVERSE order
                  this.discardedWhiteSpace = [];
                }

                /**
                 * Recursively expand first token, then return first non-expandable token.
                 *
                 * At the moment, macro expansion doesn't handle delimited macros,
                 * i.e. things like those defined by \def\foo#1\end{…}.
                 * See the TeX book page 202ff. for details on how those should behave.
                 */

                (0, _createClass3.default)(MacroExpander, [
                  {
                    key: "nextToken",
                    value: function nextToken() {
                      for (;;) {
                        if (this.stack.length === 0) {
                          this.stack.push(this.lexer.lex());
                        }
                        var topToken = this.stack.pop();
                        var name = topToken.text;
                        if (!(name.charAt(0) === "\\" && this.macros.hasOwnProperty(name))) {
                          return topToken;
                        }
                        var tok = void 0;
                        var expansion = this.macros[name];
                        if (typeof expansion === "string") {
                          var numArgs = 0;
                          if (expansion.indexOf("#") !== -1) {
                            var stripped = expansion.replace(/##/g, "");
                            while (stripped.indexOf("#" + (numArgs + 1)) !== -1) {
                              ++numArgs;
                            }
                          }
                          var bodyLexer = new _Lexer2.default(expansion);
                          expansion = [];
                          tok = bodyLexer.lex();
                          while (tok.text !== "EOF") {
                            expansion.push(tok);
                            tok = bodyLexer.lex();
                          }
                          expansion.reverse(); // to fit in with stack using push and pop
                          expansion.numArgs = numArgs;
                          this.macros[name] = expansion;
                        }
                        if (expansion.numArgs) {
                          var args = [];
                          var i = void 0;
                          // obtain arguments, either single token or balanced {…} group
                          for (i = 0; i < expansion.numArgs; ++i) {
                            var startOfArg = this.get(true);
                            if (startOfArg.text === "{") {
                              var arg = [];
                              var depth = 1;
                              while (depth !== 0) {
                                tok = this.get(false);
                                arg.push(tok);
                                if (tok.text === "{") {
                                  ++depth;
                                } else if (tok.text === "}") {
                                  --depth;
                                } else if (tok.text === "EOF") {
                                  throw new _ParseError2.default("End of input in macro argument", startOfArg);
                                }
                              }
                              arg.pop(); // remove last }
                              arg.reverse(); // like above, to fit in with stack order
                              args[i] = arg;
                            } else if (startOfArg.text === "EOF") {
                              throw new _ParseError2.default("End of input expecting macro argument", topToken);
                            } else {
                              args[i] = [startOfArg];
                            }
                          }
                          // paste arguments in place of the placeholders
                          expansion = expansion.slice(); // make a shallow copy
                          for (i = expansion.length - 1; i >= 0; --i) {
                            tok = expansion[i];
                            if (tok.text === "#") {
                              if (i === 0) {
                                throw new _ParseError2.default("Incomplete placeholder at end of macro body", tok);
                              }
                              tok = expansion[--i]; // next token on stack
                              if (tok.text === "#") {
                                // ## → #
                                expansion.splice(i + 1, 1); // drop first #
                              } else if (/^[1-9]$/.test(tok.text)) {
                                // expansion.splice(i, 2, arg[0], arg[1], …)
                                // to replace placeholder with the indicated argument.
                                // TODO: use spread once we move to ES2015
                                expansion.splice.apply(expansion, [i, 2].concat(args[tok.text - 1]));
                              } else {
                                throw new _ParseError2.default("Not a valid argument number", tok);
                              }
                            }
                          }
                        }
                        this.stack = this.stack.concat(expansion);
                      }
                    },
                  },
                  {
                    key: "get",
                    value: function get(ignoreSpace) {
                      this.discardedWhiteSpace = [];
                      var token = this.nextToken();
                      if (ignoreSpace) {
                        while (token.text === " ") {
                          this.discardedWhiteSpace.push(token);
                          token = this.nextToken();
                        }
                      }
                      return token;
                    },

                    /**
                     * Undo the effect of the preceding call to the get method.
                     * A call to this method MUST be immediately preceded and immediately followed
                     * by a call to get.  Only used during mode switching, i.e. after one token
                     * was got in the old mode but should get got again in a new mode
                     * with possibly different whitespace handling.
                     */
                  },
                  {
                    key: "unget",
                    value: function unget(token) {
                      this.stack.push(token);
                      while (this.discardedWhiteSpace.length !== 0) {
                        this.stack.push(this.discardedWhiteSpace.pop());
                      }
                    },
                  },
                ]);
                return MacroExpander;
              })();

              module.exports = MacroExpander;
            },
            {
              "./Lexer": 26,
              "./ParseError": 29,
              "./macros": 44,
              "babel-runtime/helpers/classCallCheck": 4,
              "babel-runtime/helpers/createClass": 5,
              "object-assign": 25,
            },
          ],
          28: [
            function (require, module, exports) {
              var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

              var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

              var _createClass2 = require("babel-runtime/helpers/createClass");

              var _createClass3 = _interopRequireDefault(_createClass2);

              var _fontMetrics2 = require("./fontMetrics");

              var _fontMetrics3 = _interopRequireDefault(_fontMetrics2);

              function _interopRequireDefault(obj) {
                return obj && obj.__esModule ? obj : { default: obj };
              }

              var BASESIZE = 6; /**
               * This file contains information about the options that the Parser carries
               * around with it while parsing. Data is held in an `Options` object, and when
               * recursing, a new `Options` object can be created with the `.with*` and
               * `.reset` functions.
               */

              var sizeStyleMap = [
                // Each element contains [textsize, scriptsize, scriptscriptsize].
                // The size mappings are taken from TeX with \normalsize=10pt.
                [1, 1, 1], // size1: [5, 5, 5]              \tiny
                [2, 1, 1], // size2: [6, 5, 5]
                [3, 1, 1], // size3: [7, 5, 5]              \scriptsize
                [4, 2, 1], // size4: [8, 6, 5]              \footnotesize
                [5, 2, 1], // size5: [9, 6, 5]              \small
                [6, 3, 1], // size6: [10, 7, 5]             \normalsize
                [7, 4, 2], // size7: [12, 8, 6]             \large
                [8, 6, 3], // size8: [14.4, 10, 7]          \Large
                [9, 7, 6], // size9: [17.28, 12, 10]        \LARGE
                [10, 8, 7], // size10: [20.74, 14.4, 12]     \huge
                [11, 10, 9],
              ];

              var sizeMultipliers = [
                // fontMetrics.js:getFontMetrics also uses size indexes, so if
                // you change size indexes, change that function.
                0.5, 0.6, 0.7, 0.8, 0.9, 1.0, 1.2, 1.44, 1.728, 2.074, 2.488,
              ];

              var sizeAtStyle = function sizeAtStyle(size, style) {
                return style.size < 2 ? size : sizeStyleMap[size - 1][style.size - 1];
              };

              /**
               * This is the main options class. It contains the current style, size, color,
               * and font.
               *
               * Options objects should not be modified. To create a new Options with
               * different properties, call a `.having*` method.
               */

              var Options = (function () {
                function Options(data) {
                  (0, _classCallCheck3.default)(this, Options);

                  this.style = data.style;
                  this.color = data.color;
                  this.size = data.size || BASESIZE;
                  this.textSize = data.textSize || this.size;
                  this.phantom = data.phantom;
                  this.font = data.font;
                  this.sizeMultiplier = sizeMultipliers[this.size - 1];
                  this._fontMetrics = null;
                }

                /**
                 * Returns a new options object with the same properties as "this".  Properties
                 * from "extension" will be copied to the new options object.
                 */

                (0, _createClass3.default)(Options, [
                  {
                    key: "extend",
                    value: function extend(extension) {
                      var data = {
                        style: this.style,
                        size: this.size,
                        textSize: this.textSize,
                        color: this.color,
                        phantom: this.phantom,
                        font: this.font,
                      };

                      for (var key in extension) {
                        if (extension.hasOwnProperty(key)) {
                          data[key] = extension[key];
                        }
                      }

                      return new Options(data);
                    },

                    /**
                     * Return an options object with the given style. If `this.style === style`,
                     * returns `this`.
                     */
                  },
                  {
                    key: "havingStyle",
                    value: function havingStyle(style) {
                      if (this.style === style) {
                        return this;
                      } else {
                        return this.extend({
                          style: style,
                          size: sizeAtStyle(this.textSize, style),
                        });
                      }
                    },

                    /**
                     * Return an options object with a cramped version of the current style. If
                     * the current style is cramped, returns `this`.
                     */
                  },
                  {
                    key: "havingCrampedStyle",
                    value: function havingCrampedStyle() {
                      return this.havingStyle(this.style.cramp());
                    },

                    /**
                     * Return an options object with the given size and in at least `\textstyle`.
                     * Returns `this` if appropriate.
                     */
                  },
                  {
                    key: "havingSize",
                    value: function havingSize(size) {
                      if (this.size === size && this.textSize === size) {
                        return this;
                      } else {
                        return this.extend({
                          style: this.style.text(),
                          size: size,
                          textSize: size,
                        });
                      }
                    },

                    /**
                     * Like `this.havingSize(BASESIZE).havingStyle(style)`. If `style` is omitted,
                     * changes to at least `\textstyle`.
                     */
                  },
                  {
                    key: "havingBaseStyle",
                    value: function havingBaseStyle(style) {
                      style = style || this.style.text();
                      var wantSize = sizeAtStyle(BASESIZE, style);
                      if (this.size === wantSize && this.textSize === BASESIZE && this.style === style) {
                        return this;
                      } else {
                        return this.extend({
                          style: style,
                          size: wantSize,
                          baseSize: BASESIZE,
                        });
                      }
                    },

                    /**
                     * Create a new options object with the given color.
                     */
                  },
                  {
                    key: "withColor",
                    value: function withColor(color) {
                      return this.extend({
                        color: color,
                      });
                    },

                    /**
                     * Create a new options object with "phantom" set to true.
                     */
                  },
                  {
                    key: "withPhantom",
                    value: function withPhantom() {
                      return this.extend({
                        phantom: true,
                      });
                    },

                    /**
                     * Create a new options objects with the give font.
                     */
                  },
                  {
                    key: "withFont",
                    value: function withFont(font) {
                      return this.extend({
                        font: font || this.font,
                      });
                    },

                    /**
                     * Return the CSS sizing classes required to switch from enclosing options
                     * `oldOptions` to `this`. Returns an array of classes.
                     */
                  },
                  {
                    key: "sizingClasses",
                    value: function sizingClasses(oldOptions) {
                      if (oldOptions.size !== this.size) {
                        return ["sizing", "reset-size" + oldOptions.size, "size" + this.size];
                      } else {
                        return [];
                      }
                    },

                    /**
                     * Return the CSS sizing classes required to switch to the base size. Like
                     * `this.havingSize(BASESIZE).sizingClasses(this)`.
                     */
                  },
                  {
                    key: "baseSizingClasses",
                    value: function baseSizingClasses() {
                      if (this.size !== BASESIZE) {
                        return ["sizing", "reset-size" + this.size, "size" + BASESIZE];
                      } else {
                        return [];
                      }
                    },

                    /**
                     * Return the font metrics for this size.
                     */
                  },
                  {
                    key: "fontMetrics",
                    value: function fontMetrics() {
                      if (!this._fontMetrics) {
                        this._fontMetrics = _fontMetrics3.default.getFontMetrics(this.size);
                      }
                      return this._fontMetrics;
                    },

                    /**
                     * A map of color names to CSS colors.
                     * TODO(emily): Remove this when we have real macros
                     */
                  },
                  {
                    key: "getColor",

                    /**
                     * Gets the CSS color of the current options object, accounting for the
                     * `colorMap`.
                     */
                    value: function getColor() {
                      if (this.phantom) {
                        return "transparent";
                      } else {
                        return Options.colorMap[this.color] || this.color;
                      }
                    },
                  },
                ]);
                return Options;
              })();

              /**
               * The base size index.
               */

              Options.colorMap = {
                "katex-blue": "#6495ed",
                "katex-orange": "#ffa500",
                "katex-pink": "#ff00af",
                "katex-red": "#df0030",
                "katex-green": "#28ae7b",
                "katex-gray": "gray",
                "katex-purple": "#9d38bd",
                "katex-blueA": "#ccfaff",
                "katex-blueB": "#80f6ff",
                "katex-blueC": "#63d9ea",
                "katex-blueD": "#11accd",
                "katex-blueE": "#0c7f99",
                "katex-tealA": "#94fff5",
                "katex-tealB": "#26edd5",
                "katex-tealC": "#01d1c1",
                "katex-tealD": "#01a995",
                "katex-tealE": "#208170",
                "katex-greenA": "#b6ffb0",
                "katex-greenB": "#8af281",
                "katex-greenC": "#74cf70",
                "katex-greenD": "#1fab54",
                "katex-greenE": "#0d923f",
                "katex-goldA": "#ffd0a9",
                "katex-goldB": "#ffbb71",
                "katex-goldC": "#ff9c39",
                "katex-goldD": "#e07d10",
                "katex-goldE": "#a75a05",
                "katex-redA": "#fca9a9",
                "katex-redB": "#ff8482",
                "katex-redC": "#f9685d",
                "katex-redD": "#e84d39",
                "katex-redE": "#bc2612",
                "katex-maroonA": "#ffbde0",
                "katex-maroonB": "#ff92c6",
                "katex-maroonC": "#ed5fa6",
                "katex-maroonD": "#ca337c",
                "katex-maroonE": "#9e034e",
                "katex-purpleA": "#ddd7ff",
                "katex-purpleB": "#c6b9fc",
                "katex-purpleC": "#aa87ff",
                "katex-purpleD": "#7854ab",
                "katex-purpleE": "#543b78",
                "katex-mintA": "#f5f9e8",
                "katex-mintB": "#edf2df",
                "katex-mintC": "#e0e5cc",
                "katex-grayA": "#f6f7f7",
                "katex-grayB": "#f0f1f2",
                "katex-grayC": "#e3e5e6",
                "katex-grayD": "#d6d8da",
                "katex-grayE": "#babec2",
                "katex-grayF": "#888d93",
                "katex-grayG": "#626569",
                "katex-grayH": "#3b3e40",
                "katex-grayI": "#21242c",
                "katex-kaBlue": "#314453",
                "katex-kaGreen": "#71B307",
              };
              Options.BASESIZE = BASESIZE;

              module.exports = Options;
            },
            {
              "./fontMetrics": 41,
              "babel-runtime/helpers/classCallCheck": 4,
              "babel-runtime/helpers/createClass": 5,
            },
          ],
          29: [
            function (require, module, exports) {
              var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

              var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

              function _interopRequireDefault(obj) {
                return obj && obj.__esModule ? obj : { default: obj };
              }

              /**
               * This is the ParseError class, which is the main error thrown by KaTeX
               * functions when something has gone wrong. This is used to distinguish internal
               * errors from errors in the expression that the user provided.
               *
               * If possible, a caller should provide a Token or ParseNode with information
               * about where in the source string the problem occurred.
               *
               * @param {string} message  The error message
               * @param {(Token|ParseNode)=} token  An object providing position information
               */
              var ParseError = function ParseError(message, token) {
                (0, _classCallCheck3.default)(this, ParseError);

                var error = "KaTeX parse error: " + message;
                var start = void 0;
                var end = void 0;

                if (token && token.lexer && token.start <= token.end) {
                  // If we have the input and a position, make the error a bit fancier

                  // Get the input
                  var input = token.lexer.input;

                  // Prepend some information
                  start = token.start;
                  end = token.end;
                  if (start === input.length) {
                    error += " at end of input: ";
                  } else {
                    error += " at position " + (start + 1) + ": ";
                  }

                  // Underline token in question using combining underscores
                  var underlined = input.slice(start, end).replace(/[^]/g, "$&\u0332");

                  // Extract some context from the input and add it to the error
                  var left = void 0;
                  if (start > 15) {
                    left = "…" + input.slice(start - 15, start);
                  } else {
                    left = input.slice(0, start);
                  }
                  var right = void 0;
                  if (end + 15 < input.length) {
                    right = input.slice(end, end + 15) + "…";
                  } else {
                    right = input.slice(end);
                  }
                  error += left + underlined + right;
                }

                // Some hackery to make ParseError a prototype of Error
                // See http://stackoverflow.com/a/8460753
                var self = new Error(error);
                self.name = "ParseError";
                self.__proto__ = ParseError.prototype;

                self.position = start;
                return self;
              };

              // More hackery

              ParseError.prototype.__proto__ = Error.prototype;

              module.exports = ParseError;
            },
            { "babel-runtime/helpers/classCallCheck": 4 },
          ],
          30: [
            function (require, module, exports) {
              Object.defineProperty(exports, "__esModule", {
                value: true,
              });

              var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

              var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

              function _interopRequireDefault(obj) {
                return obj && obj.__esModule ? obj : { default: obj };
              }

              /**
               * The resulting parse tree nodes of the parse tree.
               *
               * It is possible to provide position information, so that a ParseNode can
               * fulfil a role similar to a Token in error reporting.
               * For details on the corresponding properties see Token constructor.
               * Providing such information can lead to better error reporting.
               *
               * @param {string}  type       type of node, like e.g. "ordgroup"
               * @param {?object} value      type-specific representation of the node
               * @param {string}  mode       parse mode in action for this node,
               *                             "math" or "text"
               * @param {Token=} firstToken  first token of the input for this node,
               *                             will omit position information if unset
               * @param {Token=} lastToken   last token of the input for this node,
               *                             will default to firstToken if unset
               */
              var ParseNode = function ParseNode(type, value, mode, firstToken, lastToken) {
                (0, _classCallCheck3.default)(this, ParseNode);

                this.type = type;
                this.value = value;
                this.mode = mode;
                if (firstToken && (!lastToken || lastToken.lexer === firstToken.lexer)) {
                  this.lexer = firstToken.lexer;
                  this.start = firstToken.start;
                  this.end = (lastToken || firstToken).end;
                }
              };

              exports.default = ParseNode;
            },
            { "babel-runtime/helpers/classCallCheck": 4 },
          ],
          31: [
            function (require, module, exports) {
              var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

              var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

              var _createClass2 = require("babel-runtime/helpers/createClass");

              var _createClass3 = _interopRequireDefault(_createClass2);

              var _functions = require("./functions");

              var _functions2 = _interopRequireDefault(_functions);

              var _environments = require("./environments");

              var _environments2 = _interopRequireDefault(_environments);

              var _MacroExpander = require("./MacroExpander");

              var _MacroExpander2 = _interopRequireDefault(_MacroExpander);

              var _symbols = require("./symbols");

              var _symbols2 = _interopRequireDefault(_symbols);

              var _utils = require("./utils");

              var _utils2 = _interopRequireDefault(_utils);

              var _units = require("./units");

              var _units2 = _interopRequireDefault(_units);

              var _unicodeRegexes = require("./unicodeRegexes");

              var _ParseNode = require("./ParseNode");

              var _ParseNode2 = _interopRequireDefault(_ParseNode);

              var _ParseError = require("./ParseError");

              var _ParseError2 = _interopRequireDefault(_ParseError);

              function _interopRequireDefault(obj) {
                return obj && obj.__esModule ? obj : { default: obj };
              }

              /**
               * This file contains the parser used to parse out a TeX expression from the
               * input. Since TeX isn't context-free, standard parsers don't work particularly
               * well.
               *
               * The strategy of this parser is as such:
               *
               * The main functions (the `.parse...` ones) take a position in the current
               * parse string to parse tokens from. The lexer (found in Lexer.js, stored at
               * this.lexer) also supports pulling out tokens at arbitrary places. When
               * individual tokens are needed at a position, the lexer is called to pull out a
               * token, which is then used.
               *
               * The parser has a property called "mode" indicating the mode that
               * the parser is currently in. Currently it has to be one of "math" or
               * "text", which denotes whether the current environment is a math-y
               * one or a text-y one (e.g. inside \text). Currently, this serves to
               * limit the functions which can be used in text mode.
               *
               * The main functions then return an object which contains the useful data that
               * was parsed at its given point, and a new position at the end of the parsed
               * data. The main functions can call each other and continue the parsing by
               * using the returned position as a new starting point.
               *
               * There are also extra `.handle...` functions, which pull out some reused
               * functionality into self-contained functions.
               *
               * The earlier functions return ParseNodes.
               * The later functions (which are called deeper in the parse) sometimes return
               * ParseFuncOrArgument, which contain a ParseNode as well as some data about
               * whether the parsed object is a function which is missing some arguments, or a
               * standalone object which can be used as an argument to another function.
               */

              /**
               * An initial function (without its arguments), or an argument to a function.
               * The `result` argument should be a ParseNode.
               */
              function ParseFuncOrArgument(result, isFunction, token) {
                this.result = result;
                // Is this a function (i.e. is it something defined in functions.js)?
                this.isFunction = isFunction;
                this.token = token;
              } /* eslint no-constant-condition:0 */

              var Parser = (function () {
                function Parser(input, settings) {
                  (0, _classCallCheck3.default)(this, Parser);

                  // Create a new macro expander (gullet) and (indirectly via that) also a
                  // new lexer (mouth) for this parser (stomach, in the language of TeX)
                  this.gullet = new _MacroExpander2.default(input, settings.macros);
                  // Use old \color behavior (same as LaTeX's \textcolor) if requested.
                  // We do this after the macros object has been copied by MacroExpander.
                  if (settings.colorIsTextColor) {
                    this.gullet.macros["\\color"] = "\\textcolor";
                  }
                  // Store the settings for use in parsing
                  this.settings = settings;
                  // Count leftright depth (for \middle errors)
                  this.leftrightDepth = 0;
                }

                /**
                 * Checks a result to make sure it has the right type, and throws an
                 * appropriate error otherwise.
                 *
                 * @param {boolean=} consume whether to consume the expected token,
                 *                           defaults to true
                 */

                (0, _createClass3.default)(Parser, [
                  {
                    key: "expect",
                    value: function expect(text, consume) {
                      if (this.nextToken.text !== text) {
                        throw new _ParseError2.default("Expected '" + text + "', got '" + this.nextToken.text + "'", this.nextToken);
                      }
                      if (consume !== false) {
                        this.consume();
                      }
                    },

                    /**
                     * Considers the current look ahead token as consumed,
                     * and fetches the one after that as the new look ahead.
                     */
                  },
                  {
                    key: "consume",
                    value: function consume() {
                      this.nextToken = this.gullet.get(this.mode === "math");
                    },
                  },
                  {
                    key: "switchMode",
                    value: function switchMode(newMode) {
                      this.gullet.unget(this.nextToken);
                      this.mode = newMode;
                      this.consume();
                    },

                    /**
                     * Main parsing function, which parses an entire input.
                     *
                     * @return {?Array.<ParseNode>}
                     */
                  },
                  {
                    key: "parse",
                    value: function parse() {
                      // Try to parse the input
                      this.mode = "math";
                      this.consume();
                      var parse = this.parseInput();
                      return parse;
                    },

                    /**
                     * Parses an entire input tree.
                     */
                  },
                  {
                    key: "parseInput",
                    value: function parseInput() {
                      // Parse an expression
                      var expression = this.parseExpression(false);
                      // If we succeeded, make sure there's an EOF at the end
                      this.expect("EOF", false);
                      return expression;
                    },
                  },
                  {
                    key: "parseExpression",

                    /**
                     * Parses an "expression", which is a list of atoms.
                     *
                     * @param {boolean} breakOnInfix  Should the parsing stop when we hit infix
                     *                  nodes? This happens when functions have higher precendence
                     *                  than infix nodes in implicit parses.
                     *
                     * @param {?string} breakOnTokenText  The text of the token that the expression
                     *                  should end with, or `null` if something else should end the
                     *                  expression.
                     *
                     * @return {ParseNode}
                     */
                    value: function parseExpression(breakOnInfix, breakOnTokenText) {
                      var body = [];
                      // Keep adding atoms to the body until we can't parse any more atoms (either
                      // we reached the end, a }, or a \right)
                      while (true) {
                        var lex = this.nextToken;
                        if (Parser.endOfExpression.indexOf(lex.text) !== -1) {
                          break;
                        }
                        if (breakOnTokenText && lex.text === breakOnTokenText) {
                          break;
                        }
                        if (breakOnInfix && _functions2.default[lex.text] && _functions2.default[lex.text].infix) {
                          break;
                        }
                        var atom = this.parseAtom();
                        if (!atom) {
                          if (!this.settings.throwOnError && lex.text[0] === "\\") {
                            var errorNode = this.handleUnsupportedCmd();
                            body.push(errorNode);
                            continue;
                          }

                          break;
                        }
                        body.push(atom);
                      }
                      return this.handleInfixNodes(body);
                    },

                    /**
                     * Rewrites infix operators such as \over with corresponding commands such
                     * as \frac.
                     *
                     * There can only be one infix operator per group.  If there's more than one
                     * then the expression is ambiguous.  This can be resolved by adding {}.
                     *
                     * @returns {Array}
                     */
                  },
                  {
                    key: "handleInfixNodes",
                    value: function handleInfixNodes(body) {
                      var overIndex = -1;
                      var funcName = void 0;

                      for (var i = 0; i < body.length; i++) {
                        var node = body[i];
                        if (node.type === "infix") {
                          if (overIndex !== -1) {
                            throw new _ParseError2.default("only one infix operator per group", node.value.token);
                          }
                          overIndex = i;
                          funcName = node.value.replaceWith;
                        }
                      }

                      if (overIndex !== -1) {
                        var numerNode = void 0;
                        var denomNode = void 0;

                        var numerBody = body.slice(0, overIndex);
                        var denomBody = body.slice(overIndex + 1);

                        if (numerBody.length === 1 && numerBody[0].type === "ordgroup") {
                          numerNode = numerBody[0];
                        } else {
                          numerNode = new _ParseNode2.default("ordgroup", numerBody, this.mode);
                        }

                        if (denomBody.length === 1 && denomBody[0].type === "ordgroup") {
                          denomNode = denomBody[0];
                        } else {
                          denomNode = new _ParseNode2.default("ordgroup", denomBody, this.mode);
                        }

                        var value = this.callFunction(funcName, [numerNode, denomNode], null);
                        return [new _ParseNode2.default(value.type, value, this.mode)];
                      } else {
                        return body;
                      }
                    },

                    // The greediness of a superscript or subscript
                  },
                  {
                    key: "handleSupSubscript",

                    /**
                     * Handle a subscript or superscript with nice errors.
                     */
                    value: function handleSupSubscript(name) {
                      var symbolToken = this.nextToken;
                      var symbol = symbolToken.text;
                      this.consume();
                      var group = this.parseGroup();

                      if (!group) {
                        if (!this.settings.throwOnError && this.nextToken.text[0] === "\\") {
                          return this.handleUnsupportedCmd();
                        } else {
                          throw new _ParseError2.default("Expected group after '" + symbol + "'", symbolToken);
                        }
                      } else if (group.isFunction) {
                        // ^ and _ have a greediness, so handle interactions with functions'
                        // greediness
                        var funcGreediness = _functions2.default[group.result].greediness;
                        if (funcGreediness > Parser.SUPSUB_GREEDINESS) {
                          return this.parseFunction(group);
                        } else {
                          throw new _ParseError2.default("Got function '" + group.result + "' with no arguments " + "as " + name, symbolToken);
                        }
                      } else {
                        return group.result;
                      }
                    },

                    /**
                     * Converts the textual input of an unsupported command into a text node
                     * contained within a color node whose color is determined by errorColor
                     */
                  },
                  {
                    key: "handleUnsupportedCmd",
                    value: function handleUnsupportedCmd() {
                      var text = this.nextToken.text;
                      var textordArray = [];

                      for (var i = 0; i < text.length; i++) {
                        textordArray.push(new _ParseNode2.default("textord", text[i], "text"));
                      }

                      var textNode = new _ParseNode2.default(
                        "text",
                        {
                          body: textordArray,
                          type: "text",
                        },
                        this.mode
                      );

                      var colorNode = new _ParseNode2.default(
                        "color",
                        {
                          color: this.settings.errorColor,
                          value: [textNode],
                          type: "color",
                        },
                        this.mode
                      );

                      this.consume();
                      return colorNode;
                    },

                    /**
                     * Parses a group with optional super/subscripts.
                     *
                     * @return {?ParseNode}
                     */
                  },
                  {
                    key: "parseAtom",
                    value: function parseAtom() {
                      // The body of an atom is an implicit group, so that things like
                      // \left(x\right)^2 work correctly.
                      var base = this.parseImplicitGroup();

                      // In text mode, we don't have superscripts or subscripts
                      if (this.mode === "text") {
                        return base;
                      }

                      // Note that base may be empty (i.e. null) at this point.

                      var superscript = void 0;
                      var subscript = void 0;
                      while (true) {
                        // Lex the first token
                        var lex = this.nextToken;

                        if (lex.text === "\\limits" || lex.text === "\\nolimits") {
                          // We got a limit control
                          if (!base || base.type !== "op") {
                            throw new _ParseError2.default("Limit controls must follow a math operator", lex);
                          } else {
                            var limits = lex.text === "\\limits";
                            base.value.limits = limits;
                            base.value.alwaysHandleSupSub = true;
                          }
                          this.consume();
                        } else if (lex.text === "^") {
                          // We got a superscript start
                          if (superscript) {
                            throw new _ParseError2.default("Double superscript", lex);
                          }
                          superscript = this.handleSupSubscript("superscript");
                        } else if (lex.text === "_") {
                          // We got a subscript start
                          if (subscript) {
                            throw new _ParseError2.default("Double subscript", lex);
                          }
                          subscript = this.handleSupSubscript("subscript");
                        } else if (lex.text === "'") {
                          // We got a prime
                          if (superscript) {
                            throw new _ParseError2.default("Double superscript", lex);
                          }
                          var prime = new _ParseNode2.default("textord", "\\prime", this.mode);

                          // Many primes can be grouped together, so we handle this here
                          var primes = [prime];
                          this.consume();
                          // Keep lexing tokens until we get something that's not a prime
                          while (this.nextToken.text === "'") {
                            // For each one, add another prime to the list
                            primes.push(prime);
                            this.consume();
                          }
                          // If there's a superscript following the primes, combine that
                          // superscript in with the primes.
                          if (this.nextToken.text === "^") {
                            primes.push(this.handleSupSubscript("superscript"));
                          }
                          // Put everything into an ordgroup as the superscript
                          superscript = new _ParseNode2.default("ordgroup", primes, this.mode);
                        } else {
                          // If it wasn't ^, _, or ', stop parsing super/subscripts
                          break;
                        }
                      }

                      if (superscript || subscript) {
                        // If we got either a superscript or subscript, create a supsub
                        return new _ParseNode2.default(
                          "supsub",
                          {
                            base: base,
                            sup: superscript,
                            sub: subscript,
                          },
                          this.mode
                        );
                      } else {
                        // Otherwise return the original body
                        return base;
                      }
                    },

                    // A list of the size-changing functions, for use in parseImplicitGroup

                    // A list of the style-changing functions, for use in parseImplicitGroup

                    // Old font functions
                  },
                  {
                    key: "parseImplicitGroup",

                    /**
                     * Parses an implicit group, which is a group that starts at the end of a
                     * specified, and ends right before a higher explicit group ends, or at EOL. It
                     * is used for functions that appear to affect the current style, like \Large or
                     * \textrm, where instead of keeping a style we just pretend that there is an
                     * implicit grouping after it until the end of the group. E.g.
                     *   small text {\Large large text} small text again
                     * It is also used for \left and \right to get the correct grouping.
                     *
                     * @return {?ParseNode}
                     */
                    value: function parseImplicitGroup() {
                      var start = this.parseSymbol();

                      if (start == null) {
                        // If we didn't get anything we handle, fall back to parseFunction
                        return this.parseFunction();
                      }

                      var func = start.result;

                      if (func === "\\left") {
                        // If we see a left:
                        // Parse the entire left function (including the delimiter)
                        var left = this.parseFunction(start);
                        // Parse out the implicit body
                        ++this.leftrightDepth;
                        var body = this.parseExpression(false);
                        --this.leftrightDepth;
                        // Check the next token
                        this.expect("\\right", false);
                        var right = this.parseFunction();
                        return new _ParseNode2.default(
                          "leftright",
                          {
                            body: body,
                            left: left.value.value,
                            right: right.value.value,
                          },
                          this.mode
                        );
                      } else if (func === "\\begin") {
                        // begin...end is similar to left...right
                        var begin = this.parseFunction(start);
                        var envName = begin.value.name;
                        if (!_environments2.default.hasOwnProperty(envName)) {
                          throw new _ParseError2.default("No such environment: " + envName, begin.value.nameGroup);
                        }
                        // Build the environment object. Arguments and other information will
                        // be made available to the begin and end methods using properties.
                        var env = _environments2.default[envName];
                        var args = this.parseArguments("\\begin{" + envName + "}", env);
                        var context = {
                          mode: this.mode,
                          envName: envName,
                          parser: this,
                          positions: args.pop(),
                        };
                        var result = env.handler(context, args);
                        this.expect("\\end", false);
                        var endNameToken = this.nextToken;
                        var end = this.parseFunction();
                        if (end.value.name !== envName) {
                          throw new _ParseError2.default(
                            "Mismatch: \\begin{" + envName + "} matched " + "by \\end{" + end.value.name + "}",
                            endNameToken
                          );
                        }
                        result.position = end.position;
                        return result;
                      } else if (_utils2.default.contains(Parser.sizeFuncs, func)) {
                        // If we see a sizing function, parse out the implicit body
                        this.consumeSpaces();
                        var _body = this.parseExpression(false);
                        return new _ParseNode2.default(
                          "sizing",
                          {
                            // Figure out what size to use based on the list of functions above
                            size: _utils2.default.indexOf(Parser.sizeFuncs, func) + 1,
                            value: _body,
                          },
                          this.mode
                        );
                      } else if (_utils2.default.contains(Parser.styleFuncs, func)) {
                        // If we see a styling function, parse out the implicit body
                        this.consumeSpaces();
                        var _body2 = this.parseExpression(true);
                        return new _ParseNode2.default(
                          "styling",
                          {
                            // Figure out what style to use by pulling out the style from
                            // the function name
                            style: func.slice(1, func.length - 5),
                            value: _body2,
                          },
                          this.mode
                        );
                      } else if (func in Parser.oldFontFuncs) {
                        var style = Parser.oldFontFuncs[func];
                        // If we see an old font function, parse out the implicit body
                        this.consumeSpaces();
                        var _body3 = this.parseExpression(true);
                        if (style.slice(0, 4) === "text") {
                          return new _ParseNode2.default(
                            "text",
                            {
                              style: style,
                              body: new _ParseNode2.default("ordgroup", _body3, this.mode),
                            },
                            this.mode
                          );
                        } else {
                          return new _ParseNode2.default(
                            "font",
                            {
                              font: style,
                              body: new _ParseNode2.default("ordgroup", _body3, this.mode),
                            },
                            this.mode
                          );
                        }
                      } else if (func === "\\color") {
                        // If we see a styling function, parse out the implicit body
                        var color = this.parseColorGroup(false);
                        if (!color) {
                          throw new _ParseError2.default("\\color not followed by color");
                        }
                        var _body4 = this.parseExpression(true);
                        return new _ParseNode2.default(
                          "color",
                          {
                            type: "color",
                            color: color.result.value,
                            value: _body4,
                          },
                          this.mode
                        );
                      } else if (func === "$") {
                        if (this.mode === "math") {
                          throw new _ParseError2.default("$ within math mode");
                        }
                        this.consume();
                        var outerMode = this.mode;
                        this.switchMode("math");
                        var _body5 = this.parseExpression(false, "$");
                        this.expect("$", true);
                        this.switchMode(outerMode);
                        return new _ParseNode2.default(
                          "styling",
                          {
                            style: "text",
                            value: _body5,
                          },
                          "math"
                        );
                      } else {
                        // Defer to parseFunction if it's not a function we handle
                        return this.parseFunction(start);
                      }
                    },

                    /**
                     * Parses an entire function, including its base and all of its arguments.
                     * The base might either have been parsed already, in which case
                     * it is provided as an argument, or it's the next group in the input.
                     *
                     * @param {ParseFuncOrArgument=} baseGroup optional as described above
                     * @return {?ParseNode}
                     */
                  },
                  {
                    key: "parseFunction",
                    value: function parseFunction(baseGroup) {
                      if (!baseGroup) {
                        baseGroup = this.parseGroup();
                      }

                      if (baseGroup) {
                        if (baseGroup.isFunction) {
                          var func = baseGroup.result;
                          var funcData = _functions2.default[func];
                          if (this.mode === "text" && !funcData.allowedInText) {
                            throw new _ParseError2.default("Can't use function '" + func + "' in text mode", baseGroup.token);
                          } else if (this.mode === "math" && funcData.allowedInMath === false) {
                            throw new _ParseError2.default("Can't use function '" + func + "' in math mode", baseGroup.token);
                          }

                          var args = this.parseArguments(func, funcData);
                          var token = baseGroup.token;
                          var result = this.callFunction(func, args, args.pop(), token);
                          return new _ParseNode2.default(result.type, result, this.mode);
                        } else {
                          return baseGroup.result;
                        }
                      } else {
                        return null;
                      }
                    },

                    /**
                     * Call a function handler with a suitable context and arguments.
                     */
                  },
                  {
                    key: "callFunction",
                    value: function callFunction(name, args, positions, token) {
                      var context = {
                        funcName: name,
                        parser: this,
                        positions: positions,
                        token: token,
                      };
                      return _functions2.default[name].handler(context, args);
                    },

                    /**
                     * Parses the arguments of a function or environment
                     *
                     * @param {string} func  "\name" or "\begin{name}"
                     * @param {{numArgs:number,numOptionalArgs:number|undefined}} funcData
                     * @return the array of arguments, with the list of positions as last element
                     */
                  },
                  {
                    key: "parseArguments",
                    value: function parseArguments(func, funcData) {
                      var totalArgs = funcData.numArgs + funcData.numOptionalArgs;
                      if (totalArgs === 0) {
                        return [[this.pos]];
                      }

                      var baseGreediness = funcData.greediness;
                      var positions = [this.pos];
                      var args = [];

                      for (var i = 0; i < totalArgs; i++) {
                        var nextToken = this.nextToken;
                        var argType = funcData.argTypes && funcData.argTypes[i];
                        var arg = void 0;
                        if (i < funcData.numOptionalArgs) {
                          if (argType) {
                            arg = this.parseGroupOfType(argType, true);
                          } else {
                            arg = this.parseGroup(true);
                          }
                          if (!arg) {
                            args.push(null);
                            positions.push(this.pos);
                            continue;
                          }
                        } else {
                          if (argType) {
                            arg = this.parseGroupOfType(argType);
                          } else {
                            arg = this.parseGroup();
                          }
                          if (!arg) {
                            if (!this.settings.throwOnError && this.nextToken.text[0] === "\\") {
                              arg = new ParseFuncOrArgument(this.handleUnsupportedCmd(this.nextToken.text), false);
                            } else {
                              throw new _ParseError2.default("Expected group after '" + func + "'", nextToken);
                            }
                          }
                        }
                        var argNode = void 0;
                        if (arg.isFunction) {
                          var argGreediness = _functions2.default[arg.result].greediness;
                          if (argGreediness > baseGreediness) {
                            argNode = this.parseFunction(arg);
                          } else {
                            throw new _ParseError2.default("Got function '" + arg.result + "' as " + "argument to '" + func + "'", nextToken);
                          }
                        } else {
                          argNode = arg.result;
                        }
                        args.push(argNode);
                        positions.push(this.pos);
                      }

                      args.push(positions);

                      return args;
                    },

                    /**
                     * Parses a group when the mode is changing.
                     *
                     * @return {?ParseFuncOrArgument}
                     */
                  },
                  {
                    key: "parseGroupOfType",
                    value: function parseGroupOfType(innerMode, optional) {
                      var outerMode = this.mode;
                      // Handle `original` argTypes
                      if (innerMode === "original") {
                        innerMode = outerMode;
                      }

                      if (innerMode === "color") {
                        return this.parseColorGroup(optional);
                      }
                      if (innerMode === "size") {
                        return this.parseSizeGroup(optional);
                      }

                      this.switchMode(innerMode);
                      if (innerMode === "text") {
                        // text mode is special because it should ignore the whitespace before
                        // it
                        this.consumeSpaces();
                      }
                      // By the time we get here, innerMode is one of "text" or "math".
                      // We switch the mode of the parser, recurse, then restore the old mode.
                      var res = this.parseGroup(optional);
                      this.switchMode(outerMode);
                      return res;
                    },
                  },
                  {
                    key: "consumeSpaces",
                    value: function consumeSpaces() {
                      while (this.nextToken.text === " ") {
                        this.consume();
                      }
                    },

                    /**
                     * Parses a group, essentially returning the string formed by the
                     * brace-enclosed tokens plus some position information.
                     *
                     * @param {string} modeName  Used to describe the mode in error messages
                     * @param {boolean=} optional  Whether the group is optional or required
                     */
                  },
                  {
                    key: "parseStringGroup",
                    value: function parseStringGroup(modeName, optional) {
                      if (optional && this.nextToken.text !== "[") {
                        return null;
                      }
                      var outerMode = this.mode;
                      this.mode = "text";
                      this.expect(optional ? "[" : "{");
                      var str = "";
                      var firstToken = this.nextToken;
                      var lastToken = firstToken;
                      while (this.nextToken.text !== (optional ? "]" : "}")) {
                        if (this.nextToken.text === "EOF") {
                          throw new _ParseError2.default("Unexpected end of input in " + modeName, firstToken.range(this.nextToken, str));
                        }
                        lastToken = this.nextToken;
                        str += lastToken.text;
                        this.consume();
                      }
                      this.mode = outerMode;
                      this.expect(optional ? "]" : "}");
                      return firstToken.range(lastToken, str);
                    },

                    /**
                     * Parses a regex-delimited group: the largest sequence of tokens
                     * whose concatenated strings match `regex`. Returns the string
                     * formed by the tokens plus some position information.
                     *
                     * @param {RegExp} regex
                     * @param {string} modeName  Used to describe the mode in error messages
                     */
                  },
                  {
                    key: "parseRegexGroup",
                    value: function parseRegexGroup(regex, modeName) {
                      var outerMode = this.mode;
                      this.mode = "text";
                      var firstToken = this.nextToken;
                      var lastToken = firstToken;
                      var str = "";
                      while (this.nextToken.text !== "EOF" && regex.test(str + this.nextToken.text)) {
                        lastToken = this.nextToken;
                        str += lastToken.text;
                        this.consume();
                      }
                      if (str === "") {
                        throw new _ParseError2.default("Invalid " + modeName + ": '" + firstToken.text + "'", firstToken);
                      }
                      this.mode = outerMode;
                      return firstToken.range(lastToken, str);
                    },

                    /**
                     * Parses a color description.
                     */
                  },
                  {
                    key: "parseColorGroup",
                    value: function parseColorGroup(optional) {
                      var res = this.parseStringGroup("color", optional);
                      if (!res) {
                        return null;
                      }
                      var match = /^(#[a-z0-9]+|[a-z]+)$/i.exec(res.text);
                      if (!match) {
                        throw new _ParseError2.default("Invalid color: '" + res.text + "'", res);
                      }
                      return new ParseFuncOrArgument(new _ParseNode2.default("color", match[0], this.mode), false);
                    },

                    /**
                     * Parses a size specification, consisting of magnitude and unit.
                     */
                  },
                  {
                    key: "parseSizeGroup",
                    value: function parseSizeGroup(optional) {
                      var res = void 0;
                      if (!optional && this.nextToken.text !== "{") {
                        res = this.parseRegexGroup(/^[-+]? *(?:$|\d+|\d+\.\d*|\.\d*) *[a-z]{0,2} *$/, "size");
                      } else {
                        res = this.parseStringGroup("size", optional);
                      }
                      if (!res) {
                        return null;
                      }
                      var match = /([-+]?) *(\d+(?:\.\d*)?|\.\d+) *([a-z]{2})/.exec(res.text);
                      if (!match) {
                        throw new _ParseError2.default("Invalid size: '" + res.text + "'", res);
                      }
                      var data = {
                        number: +(match[1] + match[2]), // sign + magnitude, cast to number
                        unit: match[3],
                      };
                      if (!_units2.default.validUnit(data)) {
                        throw new _ParseError2.default("Invalid unit: '" + data.unit + "'", res);
                      }
                      return new ParseFuncOrArgument(new _ParseNode2.default("size", data, this.mode), false);
                    },

                    /**
                     * If the argument is false or absent, this parses an ordinary group,
                     * which is either a single nucleus (like "x") or an expression
                     * in braces (like "{x+y}").
                     * If the argument is true, it parses either a bracket-delimited expression
                     * (like "[x+y]") or returns null to indicate the absence of a
                     * bracket-enclosed group.
                     *
                     * @param {boolean=} optional  Whether the group is optional or required
                     * @return {?ParseFuncOrArgument}
                     */
                  },
                  {
                    key: "parseGroup",
                    value: function parseGroup(optional) {
                      var firstToken = this.nextToken;
                      // Try to parse an open brace
                      if (this.nextToken.text === (optional ? "[" : "{")) {
                        // If we get a brace, parse an expression
                        this.consume();
                        var expression = this.parseExpression(false, optional ? "]" : null);
                        var lastToken = this.nextToken;
                        // Make sure we get a close brace
                        this.expect(optional ? "]" : "}");
                        if (this.mode === "text") {
                          this.formLigatures(expression);
                        }
                        return new ParseFuncOrArgument(new _ParseNode2.default("ordgroup", expression, this.mode, firstToken, lastToken), false);
                      } else {
                        // Otherwise, just return a nucleus, or nothing for an optional group
                        return optional ? null : this.parseSymbol();
                      }
                    },

                    /**
                     * Form ligature-like combinations of characters for text mode.
                     * This includes inputs like "--", "---", "``" and "''".
                     * The result will simply replace multiple textord nodes with a single
                     * character in each value by a single textord node having multiple
                     * characters in its value.  The representation is still ASCII source.
                     *
                     * @param {Array.<ParseNode>} group  the nodes of this group,
                     *                                   list will be moified in place
                     */
                  },
                  {
                    key: "formLigatures",
                    value: function formLigatures(group) {
                      var n = group.length - 1;
                      for (var i = 0; i < n; ++i) {
                        var a = group[i];
                        var v = a.value;
                        if (v === "-" && group[i + 1].value === "-") {
                          if (i + 1 < n && group[i + 2].value === "-") {
                            group.splice(i, 3, new _ParseNode2.default("textord", "---", "text", a, group[i + 2]));
                            n -= 2;
                          } else {
                            group.splice(i, 2, new _ParseNode2.default("textord", "--", "text", a, group[i + 1]));
                            n -= 1;
                          }
                        }
                        if ((v === "'" || v === "`") && group[i + 1].value === v) {
                          group.splice(i, 2, new _ParseNode2.default("textord", v + v, "text", a, group[i + 1]));
                          n -= 1;
                        }
                      }
                    },

                    /**
                     * Parse a single symbol out of the string. Here, we handle both the functions
                     * we have defined, as well as the single character symbols
                     *
                     * @return {?ParseFuncOrArgument}
                     */
                  },
                  {
                    key: "parseSymbol",
                    value: function parseSymbol() {
                      var nucleus = this.nextToken;

                      if (_functions2.default[nucleus.text]) {
                        this.consume();
                        // If there exists a function with this name, we return the function and
                        // say that it is a function.
                        return new ParseFuncOrArgument(nucleus.text, true, nucleus);
                      } else if (_symbols2.default[this.mode][nucleus.text]) {
                        this.consume();
                        // Otherwise if this is a no-argument function, find the type it
                        // corresponds to in the symbols map
                        return new ParseFuncOrArgument(
                          new _ParseNode2.default(_symbols2.default[this.mode][nucleus.text].group, nucleus.text, this.mode, nucleus),
                          false,
                          nucleus
                        );
                      } else if (this.mode === "text" && _unicodeRegexes.cjkRegex.test(nucleus.text)) {
                        this.consume();
                        return new ParseFuncOrArgument(new _ParseNode2.default("textord", nucleus.text, this.mode, nucleus), false, nucleus);
                      } else if (nucleus.text === "$") {
                        return new ParseFuncOrArgument(nucleus.text, false, nucleus);
                      } else {
                        return null;
                      }
                    },
                  },
                ]);
                return Parser;
              })();

              Parser.endOfExpression = ["}", "\\end", "\\right", "&", "\\\\", "\\cr"];
              Parser.SUPSUB_GREEDINESS = 1;
              Parser.sizeFuncs = [
                "\\tiny",
                "\\sixptsize",
                "\\scriptsize",
                "\\footnotesize",
                "\\small",
                "\\normalsize",
                "\\large",
                "\\Large",
                "\\LARGE",
                "\\huge",
                "\\Huge",
              ];
              Parser.styleFuncs = ["\\displaystyle", "\\textstyle", "\\scriptstyle", "\\scriptscriptstyle"];
              Parser.oldFontFuncs = {
                "\\rm": "mathrm",
                "\\sf": "mathsf",
                "\\tt": "mathtt",
                "\\bf": "mathbf",
                "\\it": "mathit",
              };

              Parser.prototype.ParseNode = _ParseNode2.default;

              module.exports = Parser;
            },
            {
              "./MacroExpander": 27,
              "./ParseError": 29,
              "./ParseNode": 30,
              "./environments": 40,
              "./functions": 43,
              "./symbols": 48,
              "./unicodeRegexes": 49,
              "./units": 50,
              "./utils": 51,
              "babel-runtime/helpers/classCallCheck": 4,
              "babel-runtime/helpers/createClass": 5,
            },
          ],
          32: [
            function (require, module, exports) {
              var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

              var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

              var _utils = require("./utils");

              var _utils2 = _interopRequireDefault(_utils);

              function _interopRequireDefault(obj) {
                return obj && obj.__esModule ? obj : { default: obj };
              }

              /**
               * The main Settings object
               *
               * The current options stored are:
               *  - displayMode: Whether the expression should be typeset as inline math
               *                 (false, the default), meaning that the math starts in
               *                 \textstyle and is placed in an inline-block); or as display
               *                 math (true), meaning that the math starts in \displaystyle
               *                 and is placed in a block with vertical margin.
               */
              var Settings = function Settings(options) {
                (0, _classCallCheck3.default)(this, Settings);

                // allow null options
                options = options || {};
                this.displayMode = _utils2.default.deflt(options.displayMode, false);
                this.throwOnError = _utils2.default.deflt(options.throwOnError, true);
                this.errorColor = _utils2.default.deflt(options.errorColor, "#cc0000");
                this.macros = options.macros || {};
                this.colorIsTextColor = _utils2.default.deflt(options.colorIsTextColor, false);
              }; /**
               * This is a module for storing settings passed into KaTeX. It correctly handles
               * default settings.
               */

              module.exports = Settings;
            },
            {
              "./utils": 51,
              "babel-runtime/helpers/classCallCheck": 4,
            },
          ],
          33: [
            function (require, module, exports) {
              var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

              var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

              var _createClass2 = require("babel-runtime/helpers/createClass");

              var _createClass3 = _interopRequireDefault(_createClass2);

              function _interopRequireDefault(obj) {
                return obj && obj.__esModule ? obj : { default: obj };
              }

              /**
               * This file contains information and classes for the various kinds of styles
               * used in TeX. It provides a generic `Style` class, which holds information
               * about a specific style. It then provides instances of all the different kinds
               * of styles possible, and provides functions to move between them and get
               * information about them.
               */

              /**
               * The main style class. Contains a unique id for the style, a size (which is
               * the same for cramped and uncramped version of a style), and a cramped flag.
               */
              var Style = (function () {
                function Style(id, size, cramped) {
                  (0, _classCallCheck3.default)(this, Style);

                  this.id = id;
                  this.size = size;
                  this.cramped = cramped;
                }

                /**
                 * Get the style of a superscript given a base in the current style.
                 */

                (0, _createClass3.default)(Style, [
                  {
                    key: "sup",
                    value: function sup() {
                      return styles[_sup[this.id]];
                    },

                    /**
                     * Get the style of a subscript given a base in the current style.
                     */
                  },
                  {
                    key: "sub",
                    value: function sub() {
                      return styles[_sub[this.id]];
                    },

                    /**
                     * Get the style of a fraction numerator given the fraction in the current
                     * style.
                     */
                  },
                  {
                    key: "fracNum",
                    value: function fracNum() {
                      return styles[_fracNum[this.id]];
                    },

                    /**
                     * Get the style of a fraction denominator given the fraction in the current
                     * style.
                     */
                  },
                  {
                    key: "fracDen",
                    value: function fracDen() {
                      return styles[_fracDen[this.id]];
                    },

                    /**
                     * Get the cramped version of a style (in particular, cramping a cramped style
                     * doesn't change the style).
                     */
                  },
                  {
                    key: "cramp",
                    value: function cramp() {
                      return styles[_cramp[this.id]];
                    },

                    /**
                     * Get a text or display version of this style.
                     */
                  },
                  {
                    key: "text",
                    value: function text() {
                      return styles[_text[this.id]];
                    },

                    /**
                     * Return if this style is tightly spaced (scriptstyle/scriptscriptstyle)
                     */
                  },
                  {
                    key: "isTight",
                    value: function isTight() {
                      return this.size >= 2;
                    },
                  },
                ]);
                return Style;
              })();

              // IDs of the different styles

              var D = 0;
              var Dc = 1;
              var T = 2;
              var Tc = 3;
              var S = 4;
              var Sc = 5;
              var SS = 6;
              var SSc = 7;

              // Instances of the different styles
              var styles = [
                new Style(D, 0, false),
                new Style(Dc, 0, true),
                new Style(T, 1, false),
                new Style(Tc, 1, true),
                new Style(S, 2, false),
                new Style(Sc, 2, true),
                new Style(SS, 3, false),
                new Style(SSc, 3, true),
              ];

              // Lookup tables for switching from one style to another
              var _sup = [S, Sc, S, Sc, SS, SSc, SS, SSc];
              var _sub = [Sc, Sc, Sc, Sc, SSc, SSc, SSc, SSc];
              var _fracNum = [T, Tc, S, Sc, SS, SSc, SS, SSc];
              var _fracDen = [Tc, Tc, Sc, Sc, SSc, SSc, SSc, SSc];
              var _cramp = [Dc, Dc, Tc, Tc, Sc, Sc, SSc, SSc];
              var _text = [D, Dc, T, Tc, T, Tc, T, Tc];

              // We only export some of the styles. Also, we don't export the `Style` class so
              // no more styles can be generated.
              module.exports = {
                DISPLAY: styles[D],
                TEXT: styles[T],
                SCRIPT: styles[S],
                SCRIPTSCRIPT: styles[SS],
              };
            },
            {
              "babel-runtime/helpers/classCallCheck": 4,
              "babel-runtime/helpers/createClass": 5,
            },
          ],
          34: [
            function (require, module, exports) {
              var _domTree = require("./domTree");

              var _domTree2 = _interopRequireDefault(_domTree);

              var _fontMetrics = require("./fontMetrics");

              var _fontMetrics2 = _interopRequireDefault(_fontMetrics);

              var _symbols = require("./symbols");

              var _symbols2 = _interopRequireDefault(_symbols);

              var _utils = require("./utils");

              var _utils2 = _interopRequireDefault(_utils);

              function _interopRequireDefault(obj) {
                return obj && obj.__esModule ? obj : { default: obj };
              }

              // The following have to be loaded from Main-Italic font, using class mainit
              /* eslint no-console:0 */
              /**
               * This module contains general functions that can be used for building
               * different kinds of domTree nodes in a consistent manner.
               */

              var mainitLetters = [
                "\\imath", // dotless i
                "\\jmath", // dotless j
                "\\pounds",
              ];

              /**
               * Looks up the given symbol in fontMetrics, after applying any symbol
               * replacements defined in symbol.js
               */
              var lookupSymbol = function lookupSymbol(value, fontFamily, mode) {
                // Replace the value with its replaced value from symbol.js
                if (_symbols2.default[mode][value] && _symbols2.default[mode][value].replace) {
                  value = _symbols2.default[mode][value].replace;
                }
                return {
                  value: value,
                  metrics: _fontMetrics2.default.getCharacterMetrics(value, fontFamily),
                };
              };

              /**
               * Makes a symbolNode after translation via the list of symbols in symbols.js.
               * Correctly pulls out metrics for the character, and optionally takes a list of
               * classes to be attached to the node.
               *
               * TODO: make argument order closer to makeSpan
               * TODO: add a separate argument for math class (e.g. `mop`, `mbin`), which
               * should if present come first in `classes`.
               */
              var makeSymbol = function makeSymbol(value, fontFamily, mode, options, classes) {
                var lookup = lookupSymbol(value, fontFamily, mode);
                var metrics = lookup.metrics;
                value = lookup.value;

                var symbolNode = void 0;
                if (metrics) {
                  var italic = metrics.italic;
                  if (mode === "text") {
                    italic = 0;
                  }
                  symbolNode = new _domTree2.default.symbolNode(value, metrics.height, metrics.depth, italic, metrics.skew, classes);
                } else {
                  // TODO(emily): Figure out a good way to only print this in development
                  typeof console !== "undefined" && console.warn("No character metrics for '" + value + "' in style '" + fontFamily + "'");
                  symbolNode = new _domTree2.default.symbolNode(value, 0, 0, 0, 0, classes);
                }

                if (options) {
                  symbolNode.maxFontSize = options.sizeMultiplier;
                  if (options.style.isTight()) {
                    symbolNode.classes.push("mtight");
                  }
                  if (options.getColor()) {
                    symbolNode.style.color = options.getColor();
                  }
                }

                return symbolNode;
              };

              /**
               * Makes a symbol in Main-Regular or AMS-Regular.
               * Used for rel, bin, open, close, inner, and punct.
               */
              var mathsym = function mathsym(value, mode, options, classes) {
                // Decide what font to render the symbol in by its entry in the symbols
                // table.
                // Have a special case for when the value = \ because the \ is used as a
                // textord in unsupported command errors but cannot be parsed as a regular
                // text ordinal and is therefore not present as a symbol in the symbols
                // table for text
                if (value === "\\" || _symbols2.default[mode][value].font === "main") {
                  return makeSymbol(value, "Main-Regular", mode, options, classes);
                } else {
                  return makeSymbol(value, "AMS-Regular", mode, options, classes.concat(["amsrm"]));
                }
              };

              /**
               * Makes a symbol in the default font for mathords and textords.
               */
              var mathDefault = function mathDefault(value, mode, options, classes, type) {
                if (type === "mathord") {
                  var fontLookup = mathit(value);
                  return makeSymbol(value, fontLookup.fontName, mode, options, classes.concat([fontLookup.fontClass]));
                } else if (type === "textord") {
                  var font = _symbols2.default[mode][value] && _symbols2.default[mode][value].font;
                  if (font === "ams") {
                    return makeSymbol(value, "AMS-Regular", mode, options, classes.concat(["amsrm"]));
                  } else {
                    // if (font === "main") {
                    return makeSymbol(value, "Main-Regular", mode, options, classes.concat(["mathrm"]));
                  }
                } else {
                  throw new Error("unexpected type: " + type + " in mathDefault");
                }
              };

              /**
               * Determines which of the two font names (Main-Italic and Math-Italic) and
               * corresponding style tags (mainit or mathit) to use for font "mathit",
               * depending on the symbol.  Use this function instead of fontMap for font
               * "mathit".
               */
              var mathit = function mathit(value, mode, options, classes) {
                if (
                  /[0-9]/.test(value.charAt(0)) ||
                  // glyphs for \imath and \jmath do not exist in Math-Italic so we
                  // need to use Main-Italic instead
                  _utils2.default.contains(mainitLetters, value)
                ) {
                  return {
                    fontName: "Main-Italic",
                    fontClass: "mainit",
                  };
                } else {
                  return {
                    fontName: "Math-Italic",
                    fontClass: "mathit",
                  };
                }
              };

              /**
               * Makes either a mathord or textord in the correct font and color.
               */
              var makeOrd = function makeOrd(group, options, type) {
                var mode = group.mode;
                var value = group.value;

                var classes = ["mord"];

                var font = options.font;
                if (font) {
                  var fontLookup = void 0;
                  if (font === "mathit" || _utils2.default.contains(mainitLetters, value)) {
                    fontLookup = mathit(value);
                  } else {
                    fontLookup = fontMap[font];
                  }
                  if (lookupSymbol(value, fontLookup.fontName, mode).metrics) {
                    return makeSymbol(value, fontLookup.fontName, mode, options, classes.concat([fontLookup.fontClass || font]));
                  } else {
                    return mathDefault(value, mode, options, classes, type);
                  }
                } else {
                  return mathDefault(value, mode, options, classes, type);
                }
              };

              /**
               * Calculate the height, depth, and maxFontSize of an element based on its
               * children.
               */
              var sizeElementFromChildren = function sizeElementFromChildren(elem) {
                var height = 0;
                var depth = 0;
                var maxFontSize = 0;

                if (elem.children) {
                  for (var i = 0; i < elem.children.length; i++) {
                    if (elem.children[i].height > height) {
                      height = elem.children[i].height;
                    }
                    if (elem.children[i].depth > depth) {
                      depth = elem.children[i].depth;
                    }
                    if (elem.children[i].maxFontSize > maxFontSize) {
                      maxFontSize = elem.children[i].maxFontSize;
                    }
                  }
                }

                elem.height = height;
                elem.depth = depth;
                elem.maxFontSize = maxFontSize;
              };

              /**
               * Makes a span with the given list of classes, list of children, and options.
               *
               * TODO: Ensure that `options` is always provided (currently some call sites
               * don't pass it).
               * TODO: add a separate argument for math class (e.g. `mop`, `mbin`), which
               * should if present come first in `classes`.
               */
              var makeSpan = function makeSpan(classes, children, options) {
                var span = new _domTree2.default.span(classes, children, options);

                sizeElementFromChildren(span);

                return span;
              };

              /**
               * Prepends the given children to the given span, updating height, depth, and
               * maxFontSize.
               */
              var prependChildren = function prependChildren(span, children) {
                span.children = children.concat(span.children);

                sizeElementFromChildren(span);
              };

              /**
               * Makes a document fragment with the given list of children.
               */
              var makeFragment = function makeFragment(children) {
                var fragment = new _domTree2.default.documentFragment(children);

                sizeElementFromChildren(fragment);

                return fragment;
              };

              /**
               * Makes a vertical list by stacking elements and kerns on top of each other.
               * Allows for many different ways of specifying the positioning method.
               *
               * Arguments:
               *  - children: A list of child or kern nodes to be stacked on top of each other
               *              (i.e. the first element will be at the bottom, and the last at
               *              the top). Element nodes are specified as
               *                {type: "elem", elem: node}
               *              while kern nodes are specified as
               *                {type: "kern", size: size}
               *  - positionType: The method by which the vlist should be positioned. Valid
               *                  values are:
               *                   - "individualShift": The children list only contains elem
               *                                        nodes, and each node contains an extra
               *                                        "shift" value of how much it should be
               *                                        shifted (note that shifting is always
               *                                        moving downwards). positionData is
               *                                        ignored.
               *                   - "top": The positionData specifies the topmost point of
               *                            the vlist (note this is expected to be a height,
               *                            so positive values move up)
               *                   - "bottom": The positionData specifies the bottommost point
               *                               of the vlist (note this is expected to be a
               *                               depth, so positive values move down
               *                   - "shift": The vlist will be positioned such that its
               *                              baseline is positionData away from the baseline
               *                              of the first child. Positive values move
               *                              downwards.
               *                   - "firstBaseline": The vlist will be positioned such that
               *                                      its baseline is aligned with the
               *                                      baseline of the first child.
               *                                      positionData is ignored. (this is
               *                                      equivalent to "shift" with
               *                                      positionData=0)
               *  - positionData: Data used in different ways depending on positionType
               *  - options: An Options object
               *
               */
              var makeVList = function makeVList(children, positionType, positionData, options) {
                var depth = void 0;
                var currPos = void 0;
                var i = void 0;
                if (positionType === "individualShift") {
                  var oldChildren = children;
                  children = [oldChildren[0]];

                  // Add in kerns to the list of children to get each element to be
                  // shifted to the correct specified shift
                  depth = -oldChildren[0].shift - oldChildren[0].elem.depth;
                  currPos = depth;
                  for (i = 1; i < oldChildren.length; i++) {
                    var diff = -oldChildren[i].shift - currPos - oldChildren[i].elem.depth;
                    var size = diff - (oldChildren[i - 1].elem.height + oldChildren[i - 1].elem.depth);

                    currPos = currPos + diff;

                    children.push({
                      type: "kern",
                      size: size,
                    });
                    children.push(oldChildren[i]);
                  }
                } else if (positionType === "top") {
                  // We always start at the bottom, so calculate the bottom by adding up
                  // all the sizes
                  var bottom = positionData;
                  for (i = 0; i < children.length; i++) {
                    if (children[i].type === "kern") {
                      bottom -= children[i].size;
                    } else {
                      bottom -= children[i].elem.height + children[i].elem.depth;
                    }
                  }
                  depth = bottom;
                } else if (positionType === "bottom") {
                  depth = -positionData;
                } else if (positionType === "shift") {
                  depth = -children[0].elem.depth - positionData;
                } else if (positionType === "firstBaseline") {
                  depth = -children[0].elem.depth;
                } else {
                  depth = 0;
                }

                // Create a strut that is taller than any list item. The strut is added to
                // each item, where it will determine the item's baseline. Since it has
                // `overflow:hidden`, the strut's top edge will sit on the item's line box's
                // top edge and the strut's bottom edge will sit on the item's baseline,
                // with no additional line-height spacing. This allows the item baseline to
                // be positioned precisely without worrying about font ascent and
                // line-height.
                var pstrutSize = 0;
                for (i = 0; i < children.length; i++) {
                  if (children[i].type === "elem") {
                    var child = children[i].elem;
                    pstrutSize = Math.max(pstrutSize, child.maxFontSize, child.height);
                  }
                }
                pstrutSize += 2;
                var pstrut = makeSpan(["pstrut"], []);
                pstrut.style.height = pstrutSize + "em";

                // Create a new list of actual children at the correct offsets
                var realChildren = [];
                var minPos = depth;
                var maxPos = depth;
                currPos = depth;
                for (i = 0; i < children.length; i++) {
                  if (children[i].type === "kern") {
                    currPos += children[i].size;
                  } else {
                    var _child = children[i].elem;

                    var childWrap = makeSpan([], [pstrut, _child]);
                    childWrap.style.top = -pstrutSize - currPos - _child.depth + "em";
                    if (children[i].marginLeft) {
                      childWrap.style.marginLeft = children[i].marginLeft;
                    }
                    if (children[i].marginRight) {
                      childWrap.style.marginRight = children[i].marginRight;
                    }

                    realChildren.push(childWrap);
                    currPos += _child.height + _child.depth;
                  }
                  minPos = Math.min(minPos, currPos);
                  maxPos = Math.max(maxPos, currPos);
                }

                // The vlist contents go in a table-cell with `vertical-align:bottom`.
                // This cell's bottom edge will determine the containing table's baseline
                // without overly expanding the containing line-box.
                var vlist = makeSpan(["vlist"], realChildren);
                vlist.style.height = maxPos + "em";

                // A second row is used if necessary to represent the vlist's depth.
                var rows = void 0;
                if (minPos < 0) {
                  var depthStrut = makeSpan(["vlist"], []);
                  depthStrut.style.height = -minPos + "em";

                  // Safari wants the first row to have inline content; otherwise it
                  // puts the bottom of the *second* row on the baseline.
                  var topStrut = makeSpan(["vlist-s"], [new _domTree2.default.symbolNode("\u200B")]);

                  rows = [makeSpan(["vlist-r"], [vlist, topStrut]), makeSpan(["vlist-r"], [depthStrut])];
                } else {
                  rows = [makeSpan(["vlist-r"], [vlist])];
                }

                var vtable = makeSpan(["vlist-t"], rows);
                if (rows.length === 2) {
                  vtable.classes.push("vlist-t2");
                }
                vtable.height = maxPos;
                vtable.depth = -minPos;
                return vtable;
              };

              // A map of spacing functions to their attributes, like size and corresponding
              // CSS class
              var spacingFunctions = {
                "\\qquad": {
                  size: "2em",
                  className: "qquad",
                },
                "\\quad": {
                  size: "1em",
                  className: "quad",
                },
                "\\enspace": {
                  size: "0.5em",
                  className: "enspace",
                },
                "\\;": {
                  size: "0.277778em",
                  className: "thickspace",
                },
                "\\:": {
                  size: "0.22222em",
                  className: "mediumspace",
                },
                "\\,": {
                  size: "0.16667em",
                  className: "thinspace",
                },
                "\\!": {
                  size: "-0.16667em",
                  className: "negativethinspace",
                },
              };

              /**
               * Maps TeX font commands to objects containing:
               * - variant: string used for "mathvariant" attribute in buildMathML.js
               * - fontName: the "style" parameter to fontMetrics.getCharacterMetrics
               */
              // A map between tex font commands an MathML mathvariant attribute values
              var fontMap = {
                // styles
                mathbf: {
                  variant: "bold",
                  fontName: "Main-Bold",
                },
                mathrm: {
                  variant: "normal",
                  fontName: "Main-Regular",
                },
                textit: {
                  variant: "italic",
                  fontName: "Main-Italic",
                },

                // "mathit" is missing because it requires the use of two fonts: Main-Italic
                // and Math-Italic.  This is handled by a special case in makeOrd which ends
                // up calling mathit.

                // families
                mathbb: {
                  variant: "double-struck",
                  fontName: "AMS-Regular",
                },
                mathcal: {
                  variant: "script",
                  fontName: "Caligraphic-Regular",
                },
                mathfrak: {
                  variant: "fraktur",
                  fontName: "Fraktur-Regular",
                },
                mathscr: {
                  variant: "script",
                  fontName: "Script-Regular",
                },
                mathsf: {
                  variant: "sans-serif",
                  fontName: "SansSerif-Regular",
                },
                mathtt: {
                  variant: "monospace",
                  fontName: "Typewriter-Regular",
                },
              };

              module.exports = {
                fontMap: fontMap,
                makeSymbol: makeSymbol,
                mathsym: mathsym,
                makeSpan: makeSpan,
                makeFragment: makeFragment,
                makeVList: makeVList,
                makeOrd: makeOrd,
                prependChildren: prependChildren,
                spacingFunctions: spacingFunctions,
              };
            },
            {
              "./domTree": 39,
              "./fontMetrics": 41,
              "./symbols": 48,
              "./utils": 51,
            },
          ],
          35: [
            function (require, module, exports) {
              var _stringify = require("babel-runtime/core-js/json/stringify");

              var _stringify2 = _interopRequireDefault(_stringify);

              var _ParseError = require("./ParseError");

              var _ParseError2 = _interopRequireDefault(_ParseError);

              var _Style = require("./Style");

              var _Style2 = _interopRequireDefault(_Style);

              var _buildCommon = require("./buildCommon");

              var _buildCommon2 = _interopRequireDefault(_buildCommon);

              var _delimiter = require("./delimiter");

              var _delimiter2 = _interopRequireDefault(_delimiter);

              var _domTree = require("./domTree");

              var _domTree2 = _interopRequireDefault(_domTree);

              var _units = require("./units");

              var _units2 = _interopRequireDefault(_units);

              var _utils = require("./utils");

              var _utils2 = _interopRequireDefault(_utils);

              var _stretchy = require("./stretchy");

              var _stretchy2 = _interopRequireDefault(_stretchy);

              function _interopRequireDefault(obj) {
                return obj && obj.__esModule ? obj : { default: obj };
              }

              /* eslint no-console:0 */
              /**
               * This file does the main work of building a domTree structure from a parse
               * tree. The entry point is the `buildHTML` function, which takes a parse tree.
               * Then, the buildExpression, buildGroup, and various groupTypes functions are
               * called, to produce a final HTML tree.
               */

              var isSpace = function isSpace(node) {
                return node instanceof _domTree2.default.span && node.classes[0] === "mspace";
              };

              // Binary atoms (first class `mbin`) change into ordinary atoms (`mord`)
              // depending on their surroundings. See TeXbook pg. 442-446, Rules 5 and 6,
              // and the text before Rule 19.
              var isBin = function isBin(node) {
                return node && node.classes[0] === "mbin";
              };

              var isBinLeftCanceller = function isBinLeftCanceller(node, isRealGroup) {
                // TODO: This code assumes that a node's math class is the first element
                // of its `classes` array. A later cleanup should ensure this, for
                // instance by changing the signature of `makeSpan`.
                if (node) {
                  return _utils2.default.contains(["mbin", "mopen", "mrel", "mop", "mpunct"], node.classes[0]);
                } else {
                  return isRealGroup;
                }
              };

              var isBinRightCanceller = function isBinRightCanceller(node, isRealGroup) {
                if (node) {
                  return _utils2.default.contains(["mrel", "mclose", "mpunct"], node.classes[0]);
                } else {
                  return isRealGroup;
                }
              };

              /**
               * Splice out any spaces from `children` starting at position `i`, and return
               * the spliced-out array. Returns null if `children[i]` does not exist or is not
               * a space.
               */
              var spliceSpaces = function spliceSpaces(children, i) {
                var j = i;
                while (j < children.length && isSpace(children[j])) {
                  j++;
                }
                if (j === i) {
                  return null;
                } else {
                  return children.splice(i, j - i);
                }
              };

              /**
               * Take a list of nodes, build them in order, and return a list of the built
               * nodes. documentFragments are flattened into their contents, so the
               * returned list contains no fragments. `isRealGroup` is true if `expression`
               * is a real group (no atoms will be added on either side), as opposed to
               * a partial group (e.g. one created by \color).
               */
              var buildExpression = function buildExpression(expression, options, isRealGroup) {
                // Parse expressions into `groups`.
                var groups = [];
                for (var i = 0; i < expression.length; i++) {
                  var group = expression[i];
                  var output = buildGroup(group, options);
                  if (output instanceof _domTree2.default.documentFragment) {
                    Array.prototype.push.apply(groups, output.children);
                  } else {
                    groups.push(output);
                  }
                }
                // At this point `groups` consists entirely of `symbolNode`s and `span`s.

                // Explicit spaces (e.g., \;, \,) should be ignored with respect to atom
                // spacing (e.g., "add thick space between mord and mrel"). Since CSS
                // adjacency rules implement atom spacing, spaces should be invisible to
                // CSS. So we splice them out of `groups` and into the atoms themselves.
                for (var _i = 0; _i < groups.length; _i++) {
                  var spaces = spliceSpaces(groups, _i);
                  if (spaces) {
                    // Splicing of spaces may have removed all remaining groups.
                    if (_i < groups.length) {
                      // If there is a following group, move space within it.
                      if (groups[_i] instanceof _domTree2.default.symbolNode) {
                        groups[_i] = (0, _buildCommon.makeSpan)([].concat(groups[_i].classes), [groups[_i]]);
                      }
                      _buildCommon2.default.prependChildren(groups[_i], spaces);
                    } else {
                      // Otherwise, put any spaces back at the end of the groups.
                      Array.prototype.push.apply(groups, spaces);
                      break;
                    }
                  }
                }

                // Binary operators change to ordinary symbols in some contexts.
                for (var _i2 = 0; _i2 < groups.length; _i2++) {
                  if (isBin(groups[_i2]) && (isBinLeftCanceller(groups[_i2 - 1], isRealGroup) || isBinRightCanceller(groups[_i2 + 1], isRealGroup))) {
                    groups[_i2].classes[0] = "mord";
                  }
                }

                // Process \\not commands within the group.
                // TODO(kevinb): Handle multiple \\not commands in a row.
                // TODO(kevinb): Handle \\not{abc} correctly.  The \\not should appear over
                // the 'a' instead of the 'c'.
                for (var _i3 = 0; _i3 < groups.length; _i3++) {
                  if (groups[_i3].value === "\u0338" && _i3 + 1 < groups.length) {
                    var children = groups.slice(_i3, _i3 + 2);

                    children[0].classes = ["mainrm"];
                    // \u0338 is a combining glyph so we could reorder the children so
                    // that it comes after the other glyph.  This works correctly on
                    // most browsers except for Safari.  Instead we absolutely position
                    // the glyph and set its right side to match that of the other
                    // glyph which is visually equivalent.
                    children[0].style.position = "absolute";
                    children[0].style.right = "0";

                    // Copy the classes from the second glyph to the new container.
                    // This is so it behaves the same as though there was no \\not.
                    var classes = groups[_i3 + 1].classes;
                    var container = (0, _buildCommon.makeSpan)(classes, children);

                    // LaTeX adds a space between ords separated by a \\not.
                    if (classes.indexOf("mord") !== -1) {
                      // \glue(\thickmuskip) 2.77771 plus 2.77771
                      container.style.paddingLeft = "0.277771em";
                    }

                    // Ensure that the \u0338 is positioned relative to the container.
                    container.style.position = "relative";
                    groups.splice(_i3, 2, container);
                  }
                }

                return groups;
              };

              // Return math atom class (mclass) of a domTree.
              var getTypeOfDomTree = function getTypeOfDomTree(node) {
                if (node instanceof _domTree2.default.documentFragment) {
                  if (node.children.length) {
                    return getTypeOfDomTree(node.children[node.children.length - 1]);
                  }
                } else {
                  if (_utils2.default.contains(["mord", "mop", "mbin", "mrel", "mopen", "mclose", "mpunct", "minner"], node.classes[0])) {
                    return node.classes[0];
                  }
                }
                return null;
              };

              /**
               * Sometimes, groups perform special rules when they have superscripts or
               * subscripts attached to them. This function lets the `supsub` group know that
               * its inner element should handle the superscripts and subscripts instead of
               * handling them itself.
               */
              var shouldHandleSupSub = function shouldHandleSupSub(group, options) {
                if (!group.value.base) {
                  return false;
                } else {
                  var base = group.value.base;
                  if (base.type === "op") {
                    // Operators handle supsubs differently when they have limits
                    // (e.g. `\displaystyle\sum_2^3`)
                    return base.value.limits && (options.style.size === _Style2.default.DISPLAY.size || base.value.alwaysHandleSupSub);
                  } else if (base.type === "accent") {
                    return isCharacterBox(base.value.base);
                  } else if (base.type === "horizBrace") {
                    var isSup = group.value.sub ? false : true;
                    return isSup === base.value.isOver;
                  } else {
                    return null;
                  }
                }
              };

              /**
               * Sometimes we want to pull out the innermost element of a group. In most
               * cases, this will just be the group itself, but when ordgroups and colors have
               * a single element, we want to pull that out.
               */
              var getBaseElem = function getBaseElem(group) {
                if (!group) {
                  return false;
                } else if (group.type === "ordgroup") {
                  if (group.value.length === 1) {
                    return getBaseElem(group.value[0]);
                  } else {
                    return group;
                  }
                } else if (group.type === "color") {
                  if (group.value.value.length === 1) {
                    return getBaseElem(group.value.value[0]);
                  } else {
                    return group;
                  }
                } else if (group.type === "font") {
                  return getBaseElem(group.value.body);
                } else {
                  return group;
                }
              };

              /**
               * TeXbook algorithms often reference "character boxes", which are simply groups
               * with a single character in them. To decide if something is a character box,
               * we find its innermost group, and see if it is a single character.
               */
              var isCharacterBox = function isCharacterBox(group) {
                var baseElem = getBaseElem(group);

                // These are all they types of groups which hold single characters
                return (
                  baseElem.type === "mathord" ||
                  baseElem.type === "textord" ||
                  baseElem.type === "bin" ||
                  baseElem.type === "rel" ||
                  baseElem.type === "inner" ||
                  baseElem.type === "open" ||
                  baseElem.type === "close" ||
                  baseElem.type === "punct"
                );
              };

              var makeNullDelimiter = function makeNullDelimiter(options, classes) {
                var moreClasses = ["nulldelimiter"].concat(options.baseSizingClasses());
                return (0, _buildCommon.makeSpan)(classes.concat(moreClasses));
              };

              /**
               * This is a map of group types to the function used to handle that type.
               * Simpler types come at the beginning, while complicated types come afterwards.
               */
              var groupTypes = {};

              groupTypes.mathord = function (group, options) {
                return _buildCommon2.default.makeOrd(group, options, "mathord");
              };

              groupTypes.textord = function (group, options) {
                return _buildCommon2.default.makeOrd(group, options, "textord");
              };

              groupTypes.bin = function (group, options) {
                return _buildCommon2.default.mathsym(group.value, group.mode, options, ["mbin"]);
              };

              groupTypes.rel = function (group, options) {
                return _buildCommon2.default.mathsym(group.value, group.mode, options, ["mrel"]);
              };

              groupTypes.open = function (group, options) {
                return _buildCommon2.default.mathsym(group.value, group.mode, options, ["mopen"]);
              };

              groupTypes.close = function (group, options) {
                return _buildCommon2.default.mathsym(group.value, group.mode, options, ["mclose"]);
              };

              groupTypes.inner = function (group, options) {
                return _buildCommon2.default.mathsym(group.value, group.mode, options, ["minner"]);
              };

              groupTypes.punct = function (group, options) {
                return _buildCommon2.default.mathsym(group.value, group.mode, options, ["mpunct"]);
              };

              groupTypes.ordgroup = function (group, options) {
                return (0, _buildCommon.makeSpan)(["mord"], buildExpression(group.value, options, true), options);
              };

              groupTypes.text = function (group, options) {
                var newOptions = options.withFont(group.value.style);
                var inner = buildExpression(group.value.body, newOptions, true);
                for (var i = 0; i < inner.length - 1; i++) {
                  if (inner[i].tryCombine(inner[i + 1])) {
                    inner.splice(i + 1, 1);
                    i--;
                  }
                }
                return (0, _buildCommon.makeSpan)(["mord", "text"], inner, newOptions);
              };

              groupTypes.color = function (group, options) {
                var elements = buildExpression(group.value.value, options.withColor(group.value.color), false);

                // \color isn't supposed to affect the type of the elements it contains.
                // To accomplish this, we wrap the results in a fragment, so the inner
                // elements will be able to directly interact with their neighbors. For
                // example, `\color{red}{2 +} 3` has the same spacing as `2 + 3`
                return new _buildCommon2.default.makeFragment(elements);
              };

              groupTypes.supsub = function (group, options) {
                // Superscript and subscripts are handled in the TeXbook on page
                // 445-446, rules 18(a-f).

                // Here is where we defer to the inner group if it should handle
                // superscripts and subscripts itself.
                if (shouldHandleSupSub(group, options)) {
                  return groupTypes[group.value.base.type](group, options);
                }

                var base = buildGroup(group.value.base, options);
                var supm = void 0;
                var subm = void 0;

                var metrics = options.fontMetrics();
                var newOptions = void 0;

                // Rule 18a
                var supShift = 0;
                var subShift = 0;

                if (group.value.sup) {
                  newOptions = options.havingStyle(options.style.sup());
                  supm = buildGroup(group.value.sup, newOptions, options);
                  if (!isCharacterBox(group.value.base)) {
                    supShift = base.height - (newOptions.fontMetrics().supDrop * newOptions.sizeMultiplier) / options.sizeMultiplier;
                  }
                }

                if (group.value.sub) {
                  newOptions = options.havingStyle(options.style.sub());
                  subm = buildGroup(group.value.sub, newOptions, options);
                  if (!isCharacterBox(group.value.base)) {
                    subShift = base.depth + (newOptions.fontMetrics().subDrop * newOptions.sizeMultiplier) / options.sizeMultiplier;
                  }
                }

                // Rule 18c
                var minSupShift = void 0;
                if (options.style === _Style2.default.DISPLAY) {
                  minSupShift = metrics.sup1;
                } else if (options.style.cramped) {
                  minSupShift = metrics.sup3;
                } else {
                  minSupShift = metrics.sup2;
                }

                // scriptspace is a font-size-independent size, so scale it
                // appropriately
                var multiplier = options.sizeMultiplier;
                var scriptspace = 0.5 / metrics.ptPerEm / multiplier + "em";

                var supsub = void 0;
                if (!group.value.sup) {
                  // Rule 18b
                  subShift = Math.max(subShift, metrics.sub1, subm.height - 0.8 * metrics.xHeight);

                  var vlistElem = [
                    {
                      type: "elem",
                      elem: subm,
                      marginRight: scriptspace,
                    },
                  ];
                  // Subscripts shouldn't be shifted by the base's italic correction.
                  // Account for that by shifting the subscript back the appropriate
                  // amount. Note we only do this when the base is a single symbol.
                  if (base instanceof _domTree2.default.symbolNode) {
                    vlistElem[0].marginLeft = -base.italic + "em";
                  }

                  supsub = _buildCommon2.default.makeVList(vlistElem, "shift", subShift, options);
                } else if (!group.value.sub) {
                  // Rule 18c, d
                  supShift = Math.max(supShift, minSupShift, supm.depth + 0.25 * metrics.xHeight);

                  supsub = _buildCommon2.default.makeVList(
                    [
                      {
                        type: "elem",
                        elem: supm,
                        marginRight: scriptspace,
                      },
                    ],
                    "shift",
                    -supShift,
                    options
                  );
                } else {
                  supShift = Math.max(supShift, minSupShift, supm.depth + 0.25 * metrics.xHeight);
                  subShift = Math.max(subShift, metrics.sub2);

                  var ruleWidth = metrics.defaultRuleThickness;

                  // Rule 18e
                  if (supShift - supm.depth - (subm.height - subShift) < 4 * ruleWidth) {
                    subShift = 4 * ruleWidth - (supShift - supm.depth) + subm.height;
                    var psi = 0.8 * metrics.xHeight - (supShift - supm.depth);
                    if (psi > 0) {
                      supShift += psi;
                      subShift -= psi;
                    }
                  }

                  var _vlistElem = [
                    {
                      type: "elem",
                      elem: subm,
                      shift: subShift,
                      marginRight: scriptspace,
                    },
                    {
                      type: "elem",
                      elem: supm,
                      shift: -supShift,
                      marginRight: scriptspace,
                    },
                  ];
                  // See comment above about subscripts not being shifted
                  if (base instanceof _domTree2.default.symbolNode) {
                    _vlistElem[0].marginLeft = -base.italic + "em";
                  }

                  supsub = _buildCommon2.default.makeVList(_vlistElem, "individualShift", null, options);
                }

                // We ensure to wrap the supsub vlist in a span.msupsub to reset text-align
                var mclass = getTypeOfDomTree(base) || "mord";
                return (0, _buildCommon.makeSpan)([mclass], [base, (0, _buildCommon.makeSpan)(["msupsub"], [supsub])], options);
              };

              groupTypes.genfrac = function (group, options) {
                // Fractions are handled in the TeXbook on pages 444-445, rules 15(a-e).
                // Figure out what style this fraction should be in based on the
                // function used
                var style = options.style;
                if (group.value.size === "display") {
                  style = _Style2.default.DISPLAY;
                } else if (group.value.size === "text") {
                  style = _Style2.default.TEXT;
                }

                var nstyle = style.fracNum();
                var dstyle = style.fracDen();
                var newOptions = void 0;

                newOptions = options.havingStyle(nstyle);
                var numerm = buildGroup(group.value.numer, newOptions, options);

                newOptions = options.havingStyle(dstyle);
                var denomm = buildGroup(group.value.denom, newOptions, options);

                var rule = void 0;
                var ruleWidth = void 0;
                var ruleSpacing = void 0;
                if (group.value.hasBarLine) {
                  rule = makeLineSpan("frac-line", options);
                  ruleWidth = rule.height;
                  ruleSpacing = rule.height;
                } else {
                  rule = null;
                  ruleWidth = 0;
                  ruleSpacing = options.fontMetrics().defaultRuleThickness;
                }

                // Rule 15b
                var numShift = void 0;
                var clearance = void 0;
                var denomShift = void 0;
                if (style.size === _Style2.default.DISPLAY.size) {
                  numShift = options.fontMetrics().num1;
                  if (ruleWidth > 0) {
                    clearance = 3 * ruleSpacing;
                  } else {
                    clearance = 7 * ruleSpacing;
                  }
                  denomShift = options.fontMetrics().denom1;
                } else {
                  if (ruleWidth > 0) {
                    numShift = options.fontMetrics().num2;
                    clearance = ruleSpacing;
                  } else {
                    numShift = options.fontMetrics().num3;
                    clearance = 3 * ruleSpacing;
                  }
                  denomShift = options.fontMetrics().denom2;
                }

                var frac = void 0;
                if (ruleWidth === 0) {
                  // Rule 15c
                  var candidateClearance = numShift - numerm.depth - (denomm.height - denomShift);
                  if (candidateClearance < clearance) {
                    numShift += 0.5 * (clearance - candidateClearance);
                    denomShift += 0.5 * (clearance - candidateClearance);
                  }

                  frac = _buildCommon2.default.makeVList(
                    [
                      {
                        type: "elem",
                        elem: denomm,
                        shift: denomShift,
                      },
                      {
                        type: "elem",
                        elem: numerm,
                        shift: -numShift,
                      },
                    ],
                    "individualShift",
                    null,
                    options
                  );
                } else {
                  // Rule 15d
                  var axisHeight = options.fontMetrics().axisHeight;

                  if (numShift - numerm.depth - (axisHeight + 0.5 * ruleWidth) < clearance) {
                    numShift += clearance - (numShift - numerm.depth - (axisHeight + 0.5 * ruleWidth));
                  }

                  if (axisHeight - 0.5 * ruleWidth - (denomm.height - denomShift) < clearance) {
                    denomShift += clearance - (axisHeight - 0.5 * ruleWidth - (denomm.height - denomShift));
                  }

                  var midShift = -(axisHeight - 0.5 * ruleWidth);

                  frac = _buildCommon2.default.makeVList(
                    [
                      {
                        type: "elem",
                        elem: denomm,
                        shift: denomShift,
                      },
                      {
                        type: "elem",
                        elem: rule,
                        shift: midShift,
                      },
                      {
                        type: "elem",
                        elem: numerm,
                        shift: -numShift,
                      },
                    ],
                    "individualShift",
                    null,
                    options
                  );
                }

                // Since we manually change the style sometimes (with \dfrac or \tfrac),
                // account for the possible size change here.
                newOptions = options.havingStyle(style);
                frac.height *= newOptions.sizeMultiplier / options.sizeMultiplier;
                frac.depth *= newOptions.sizeMultiplier / options.sizeMultiplier;

                // Rule 15e
                var delimSize = void 0;
                if (style.size === _Style2.default.DISPLAY.size) {
                  delimSize = options.fontMetrics().delim1;
                } else {
                  delimSize = options.fontMetrics().delim2;
                }

                var leftDelim = void 0;
                var rightDelim = void 0;
                if (group.value.leftDelim == null) {
                  leftDelim = makeNullDelimiter(options, ["mopen"]);
                } else {
                  leftDelim = _delimiter2.default.customSizedDelim(group.value.leftDelim, delimSize, true, options.havingStyle(style), group.mode, [
                    "mopen",
                  ]);
                }
                if (group.value.rightDelim == null) {
                  rightDelim = makeNullDelimiter(options, ["mclose"]);
                } else {
                  rightDelim = _delimiter2.default.customSizedDelim(group.value.rightDelim, delimSize, true, options.havingStyle(style), group.mode, [
                    "mclose",
                  ]);
                }

                return (0, _buildCommon.makeSpan)(
                  ["mord"].concat(newOptions.sizingClasses(options)),
                  [leftDelim, (0, _buildCommon.makeSpan)(["mfrac"], [frac]), rightDelim],
                  options
                );
              };

              groupTypes.array = function (group, options) {
                var r = void 0;
                var c = void 0;
                var nr = group.value.body.length;
                var nc = 0;
                var body = new Array(nr);

                // Horizontal spacing
                var pt = 1 / options.fontMetrics().ptPerEm;
                var arraycolsep = 5 * pt; // \arraycolsep in article.cls

                // Vertical spacing
                var baselineskip = 12 * pt; // see size10.clo
                // Default \jot from ltmath.dtx
                // TODO(edemaine): allow overriding \jot via \setlength (#687)
                var jot = 3 * pt;
                // Default \arraystretch from lttab.dtx
                // TODO(gagern): may get redefined once we have user-defined macros
                var arraystretch = _utils2.default.deflt(group.value.arraystretch, 1);
                var arrayskip = arraystretch * baselineskip;
                var arstrutHeight = 0.7 * arrayskip; // \strutbox in ltfsstrc.dtx and
                var arstrutDepth = 0.3 * arrayskip; // \@arstrutbox in lttab.dtx

                var totalHeight = 0;
                for (r = 0; r < group.value.body.length; ++r) {
                  var inrow = group.value.body[r];
                  var height = arstrutHeight; // \@array adds an \@arstrut
                  var depth = arstrutDepth; // to each tow (via the template)

                  if (nc < inrow.length) {
                    nc = inrow.length;
                  }

                  var outrow = new Array(inrow.length);
                  for (c = 0; c < inrow.length; ++c) {
                    var elt = buildGroup(inrow[c], options);
                    if (depth < elt.depth) {
                      depth = elt.depth;
                    }
                    if (height < elt.height) {
                      height = elt.height;
                    }
                    outrow[c] = elt;
                  }

                  var gap = 0;
                  if (group.value.rowGaps[r]) {
                    gap = _units2.default.calculateSize(group.value.rowGaps[r].value, options);
                    if (gap > 0) {
                      // \@argarraycr
                      gap += arstrutDepth;
                      if (depth < gap) {
                        depth = gap; // \@xargarraycr
                      }
                      gap = 0;
                    }
                  }
                  // In AMS multiline environments such as aligned and gathered, rows
                  // correspond to lines that have additional \jot added to the
                  // \baselineskip via \openup.
                  if (group.value.addJot) {
                    depth += jot;
                  }

                  outrow.height = height;
                  outrow.depth = depth;
                  totalHeight += height;
                  outrow.pos = totalHeight;
                  totalHeight += depth + gap; // \@yargarraycr
                  body[r] = outrow;
                }

                var offset = totalHeight / 2 + options.fontMetrics().axisHeight;
                var colDescriptions = group.value.cols || [];
                var cols = [];
                var colSep = void 0;
                var colDescrNum = void 0;
                for (
                  c = 0, colDescrNum = 0;
                  // Continue while either there are more columns or more column
                  // descriptions, so trailing separators don't get lost.
                  c < nc || colDescrNum < colDescriptions.length;
                  ++c, ++colDescrNum
                ) {
                  var colDescr = colDescriptions[colDescrNum] || {};

                  var firstSeparator = true;
                  while (colDescr.type === "separator") {
                    // If there is more than one separator in a row, add a space
                    // between them.
                    if (!firstSeparator) {
                      colSep = (0, _buildCommon.makeSpan)(["arraycolsep"], []);
                      colSep.style.width = options.fontMetrics().doubleRuleSep + "em";
                      cols.push(colSep);
                    }

                    if (colDescr.separator === "|") {
                      var separator = (0, _buildCommon.makeSpan)(["vertical-separator"], []);
                      separator.style.height = totalHeight + "em";
                      separator.style.verticalAlign = -(totalHeight - offset) + "em";

                      cols.push(separator);
                    } else {
                      throw new _ParseError2.default("Invalid separator type: " + colDescr.separator);
                    }

                    colDescrNum++;
                    colDescr = colDescriptions[colDescrNum] || {};
                    firstSeparator = false;
                  }

                  if (c >= nc) {
                    continue;
                  }

                  var sepwidth = void 0;
                  if (c > 0 || group.value.hskipBeforeAndAfter) {
                    sepwidth = _utils2.default.deflt(colDescr.pregap, arraycolsep);
                    if (sepwidth !== 0) {
                      colSep = (0, _buildCommon.makeSpan)(["arraycolsep"], []);
                      colSep.style.width = sepwidth + "em";
                      cols.push(colSep);
                    }
                  }

                  var col = [];
                  for (r = 0; r < nr; ++r) {
                    var row = body[r];
                    var elem = row[c];
                    if (!elem) {
                      continue;
                    }
                    var shift = row.pos - offset;
                    elem.depth = row.depth;
                    elem.height = row.height;
                    col.push({
                      type: "elem",
                      elem: elem,
                      shift: shift,
                    });
                  }

                  col = _buildCommon2.default.makeVList(col, "individualShift", null, options);
                  col = (0, _buildCommon.makeSpan)(["col-align-" + (colDescr.align || "c")], [col]);
                  cols.push(col);

                  if (c < nc - 1 || group.value.hskipBeforeAndAfter) {
                    sepwidth = _utils2.default.deflt(colDescr.postgap, arraycolsep);
                    if (sepwidth !== 0) {
                      colSep = (0, _buildCommon.makeSpan)(["arraycolsep"], []);
                      colSep.style.width = sepwidth + "em";
                      cols.push(colSep);
                    }
                  }
                }
                body = (0, _buildCommon.makeSpan)(["mtable"], cols);
                return (0, _buildCommon.makeSpan)(["mord"], [body], options);
              };

              groupTypes.spacing = function (group, options) {
                if (group.value === "\\ " || group.value === "\\space" || group.value === " " || group.value === "~") {
                  // Spaces are generated by adding an actual space. Each of these
                  // things has an entry in the symbols table, so these will be turned
                  // into appropriate outputs.
                  if (group.mode === "text") {
                    return _buildCommon2.default.makeOrd(group, options, "textord");
                  } else {
                    return (0, _buildCommon.makeSpan)(["mspace"], [_buildCommon2.default.mathsym(group.value, group.mode, options)], options);
                  }
                } else {
                  // Other kinds of spaces are of arbitrary width. We use CSS to
                  // generate these.
                  return (0, _buildCommon.makeSpan)(["mspace", _buildCommon2.default.spacingFunctions[group.value].className], [], options);
                }
              };

              groupTypes.llap = function (group, options) {
                var inner = (0, _buildCommon.makeSpan)(["inner"], [buildGroup(group.value.body, options)]);
                var fix = (0, _buildCommon.makeSpan)(["fix"], []);
                return (0, _buildCommon.makeSpan)(["mord", "llap"], [inner, fix], options);
              };

              groupTypes.rlap = function (group, options) {
                var inner = (0, _buildCommon.makeSpan)(["inner"], [buildGroup(group.value.body, options)]);
                var fix = (0, _buildCommon.makeSpan)(["fix"], []);
                return (0, _buildCommon.makeSpan)(["mord", "rlap"], [inner, fix], options);
              };

              groupTypes.op = function (group, options) {
                // Operators are handled in the TeXbook pg. 443-444, rule 13(a).
                var supGroup = void 0;
                var subGroup = void 0;
                var hasLimits = false;
                if (group.type === "supsub") {
                  // If we have limits, supsub will pass us its group to handle. Pull
                  // out the superscript and subscript and set the group to the op in
                  // its base.
                  supGroup = group.value.sup;
                  subGroup = group.value.sub;
                  group = group.value.base;
                  hasLimits = true;
                }

                var style = options.style;

                // Most operators have a large successor symbol, but these don't.
                var noSuccessor = ["\\smallint"];

                var large = false;
                if (style.size === _Style2.default.DISPLAY.size && group.value.symbol && !_utils2.default.contains(noSuccessor, group.value.body)) {
                  // Most symbol operators get larger in displaystyle (rule 13)
                  large = true;
                }

                var base = void 0;
                if (group.value.symbol) {
                  // If this is a symbol, create the symbol.
                  var fontName = large ? "Size2-Regular" : "Size1-Regular";
                  base = _buildCommon2.default.makeSymbol(group.value.body, fontName, "math", options, [
                    "mop",
                    "op-symbol",
                    large ? "large-op" : "small-op",
                  ]);
                } else if (group.value.value) {
                  // If this is a list, compose that list.
                  var inner = buildExpression(group.value.value, options, true);
                  if (inner.length === 1 && inner[0] instanceof _domTree2.default.symbolNode) {
                    base = inner[0];
                    base.classes[0] = "mop"; // replace old mclass
                  } else {
                    base = (0, _buildCommon.makeSpan)(["mop"], inner, options);
                  }
                } else {
                  // Otherwise, this is a text operator. Build the text from the
                  // operator's name.
                  // TODO(emily): Add a space in the middle of some of these
                  // operators, like \limsup
                  var output = [];
                  for (var i = 1; i < group.value.body.length; i++) {
                    output.push(_buildCommon2.default.mathsym(group.value.body[i], group.mode));
                  }
                  base = (0, _buildCommon.makeSpan)(["mop"], output, options);
                }

                // If content of op is a single symbol, shift it vertically.
                var baseShift = 0;
                var slant = 0;
                if (base instanceof _domTree2.default.symbolNode) {
                  // Shift the symbol so its center lies on the axis (rule 13). It
                  // appears that our fonts have the centers of the symbols already
                  // almost on the axis, so these numbers are very small. Note we
                  // don't actually apply this here, but instead it is used either in
                  // the vlist creation or separately when there are no limits.
                  baseShift = (base.height - base.depth) / 2 - options.fontMetrics().axisHeight;

                  // The slant of the symbol is just its italic correction.
                  slant = base.italic;
                }

                if (hasLimits) {
                  // IE 8 clips \int if it is in a display: inline-block. We wrap it
                  // in a new span so it is an inline, and works.
                  base = (0, _buildCommon.makeSpan)([], [base]);

                  var supm = void 0;
                  var supKern = void 0;
                  var subm = void 0;
                  var subKern = void 0;
                  var newOptions = void 0;
                  // We manually have to handle the superscripts and subscripts. This,
                  // aside from the kern calculations, is copied from supsub.
                  if (supGroup) {
                    newOptions = options.havingStyle(style.sup());
                    supm = buildGroup(supGroup, newOptions, options);

                    supKern = Math.max(options.fontMetrics().bigOpSpacing1, options.fontMetrics().bigOpSpacing3 - supm.depth);
                  }

                  if (subGroup) {
                    newOptions = options.havingStyle(style.sub());
                    subm = buildGroup(subGroup, newOptions, options);

                    subKern = Math.max(options.fontMetrics().bigOpSpacing2, options.fontMetrics().bigOpSpacing4 - subm.height);
                  }

                  // Build the final group as a vlist of the possible subscript, base,
                  // and possible superscript.
                  var finalGroup = void 0;
                  var top = void 0;
                  var bottom = void 0;
                  if (!supGroup) {
                    top = base.height - baseShift;

                    // Shift the limits by the slant of the symbol. Note
                    // that we are supposed to shift the limits by 1/2 of the slant,
                    // but since we are centering the limits adding a full slant of
                    // margin will shift by 1/2 that.
                    finalGroup = _buildCommon2.default.makeVList(
                      [
                        {
                          type: "kern",
                          size: options.fontMetrics().bigOpSpacing5,
                        },
                        {
                          type: "elem",
                          elem: subm,
                          marginLeft: -slant + "em",
                        },
                        {
                          type: "kern",
                          size: subKern,
                        },
                        {
                          type: "elem",
                          elem: base,
                        },
                      ],
                      "top",
                      top,
                      options
                    );
                  } else if (!subGroup) {
                    bottom = base.depth + baseShift;

                    finalGroup = _buildCommon2.default.makeVList(
                      [
                        {
                          type: "elem",
                          elem: base,
                        },
                        {
                          type: "kern",
                          size: supKern,
                        },
                        {
                          type: "elem",
                          elem: supm,
                          marginLeft: slant + "em",
                        },
                        {
                          type: "kern",
                          size: options.fontMetrics().bigOpSpacing5,
                        },
                      ],
                      "bottom",
                      bottom,
                      options
                    );
                  } else if (!supGroup && !subGroup) {
                    // This case probably shouldn't occur (this would mean the
                    // supsub was sending us a group with no superscript or
                    // subscript) but be safe.
                    return base;
                  } else {
                    bottom = options.fontMetrics().bigOpSpacing5 + subm.height + subm.depth + subKern + base.depth + baseShift;

                    finalGroup = _buildCommon2.default.makeVList(
                      [
                        {
                          type: "kern",
                          size: options.fontMetrics().bigOpSpacing5,
                        },
                        {
                          type: "elem",
                          elem: subm,
                          marginLeft: -slant + "em",
                        },
                        {
                          type: "kern",
                          size: subKern,
                        },
                        {
                          type: "elem",
                          elem: base,
                        },
                        {
                          type: "kern",
                          size: supKern,
                        },
                        {
                          type: "elem",
                          elem: supm,
                          marginLeft: slant + "em",
                        },
                        {
                          type: "kern",
                          size: options.fontMetrics().bigOpSpacing5,
                        },
                      ],
                      "bottom",
                      bottom,
                      options
                    );
                  }

                  return (0, _buildCommon.makeSpan)(["mop", "op-limits"], [finalGroup], options);
                } else {
                  if (baseShift) {
                    base.style.position = "relative";
                    base.style.top = baseShift + "em";
                  }

                  return base;
                }
              };

              groupTypes.mod = function (group, options) {
                var inner = [];

                if (group.value.modType === "bmod") {
                  // “\nonscript\mskip-\medmuskip\mkern5mu”
                  if (!options.style.isTight()) {
                    inner.push((0, _buildCommon.makeSpan)(["mspace", "negativemediumspace"], [], options));
                  }
                  inner.push((0, _buildCommon.makeSpan)(["mspace", "thickspace"], [], options));
                } else if (options.style.size === _Style2.default.DISPLAY.size) {
                  inner.push((0, _buildCommon.makeSpan)(["mspace", "quad"], [], options));
                } else if (group.value.modType === "mod") {
                  inner.push((0, _buildCommon.makeSpan)(["mspace", "twelvemuspace"], [], options));
                } else {
                  inner.push((0, _buildCommon.makeSpan)(["mspace", "eightmuspace"], [], options));
                }

                if (group.value.modType === "pod" || group.value.modType === "pmod") {
                  inner.push(_buildCommon2.default.mathsym("(", group.mode));
                }

                if (group.value.modType !== "pod") {
                  var modInner = [
                    _buildCommon2.default.mathsym("m", group.mode),
                    _buildCommon2.default.mathsym("o", group.mode),
                    _buildCommon2.default.mathsym("d", group.mode),
                  ];
                  if (group.value.modType === "bmod") {
                    inner.push((0, _buildCommon.makeSpan)(["mbin"], modInner, options));
                    // “\mkern5mu\nonscript\mskip-\medmuskip”
                    inner.push((0, _buildCommon.makeSpan)(["mspace", "thickspace"], [], options));
                    if (!options.style.isTight()) {
                      inner.push((0, _buildCommon.makeSpan)(["mspace", "negativemediumspace"], [], options));
                    }
                  } else {
                    Array.prototype.push.apply(inner, modInner);
                    inner.push((0, _buildCommon.makeSpan)(["mspace", "sixmuspace"], [], options));
                  }
                }

                if (group.value.value) {
                  Array.prototype.push.apply(inner, buildExpression(group.value.value, options, false));
                }

                if (group.value.modType === "pod" || group.value.modType === "pmod") {
                  inner.push(_buildCommon2.default.mathsym(")", group.mode));
                }

                return _buildCommon2.default.makeFragment(inner);
              };

              groupTypes.katex = function (group, options) {
                // The KaTeX logo. The offsets for the K and a were chosen to look
                // good, but the offsets for the T, E, and X were taken from the
                // definition of \TeX in TeX (see TeXbook pg. 356)
                var k = (0, _buildCommon.makeSpan)(["k"], [_buildCommon2.default.mathsym("K", group.mode)], options);
                var a = (0, _buildCommon.makeSpan)(["a"], [_buildCommon2.default.mathsym("A", group.mode)], options);

                a.height = (a.height + 0.2) * 0.75;
                a.depth = (a.height - 0.2) * 0.75;

                var t = (0, _buildCommon.makeSpan)(["t"], [_buildCommon2.default.mathsym("T", group.mode)], options);
                var e = (0, _buildCommon.makeSpan)(["e"], [_buildCommon2.default.mathsym("E", group.mode)], options);

                e.height = e.height - 0.2155;
                e.depth = e.depth + 0.2155;

                var x = (0, _buildCommon.makeSpan)(["x"], [_buildCommon2.default.mathsym("X", group.mode)], options);

                return (0, _buildCommon.makeSpan)(["mord", "katex-logo"], [k, a, t, e, x], options);
              };

              var makeLineSpan = function makeLineSpan(className, options, thickness) {
                var line = (0, _buildCommon.makeSpan)([className], [], options);
                line.height = thickness || options.fontMetrics().defaultRuleThickness;
                line.style.borderBottomWidth = line.height + "em";
                line.maxFontSize = 1.0;
                return line;
              };

              groupTypes.overline = function (group, options) {
                // Overlines are handled in the TeXbook pg 443, Rule 9.

                // Build the inner group in the cramped style.
                var innerGroup = buildGroup(group.value.body, options.havingCrampedStyle());

                // Create the line above the body
                var line = makeLineSpan("overline-line", options);

                // Generate the vlist, with the appropriate kerns
                var vlist = _buildCommon2.default.makeVList(
                  [
                    { type: "elem", elem: innerGroup },
                    { type: "kern", size: 3 * line.height },
                    { type: "elem", elem: line },
                    { type: "kern", size: line.height },
                  ],
                  "firstBaseline",
                  null,
                  options
                );

                return (0, _buildCommon.makeSpan)(["mord", "overline"], [vlist], options);
              };

              groupTypes.underline = function (group, options) {
                // Underlines are handled in the TeXbook pg 443, Rule 10.
                // Build the inner group.
                var innerGroup = buildGroup(group.value.body, options);

                // Create the line above the body
                var line = makeLineSpan("underline-line", options);

                // Generate the vlist, with the appropriate kerns
                var vlist = _buildCommon2.default.makeVList(
                  [
                    { type: "kern", size: line.height },
                    { type: "elem", elem: line },
                    { type: "kern", size: 3 * line.height },
                    { type: "elem", elem: innerGroup },
                  ],
                  "top",
                  innerGroup.height,
                  options
                );

                return (0, _buildCommon.makeSpan)(["mord", "underline"], [vlist], options);
              };

              groupTypes.sqrt = function (group, options) {
                // Square roots are handled in the TeXbook pg. 443, Rule 11.

                // First, we do the same steps as in overline to build the inner group
                // and line
                var inner = buildGroup(group.value.body, options.havingCrampedStyle());

                // Some groups can return document fragments.  Handle those by wrapping
                // them in a span.
                if (inner instanceof _domTree2.default.documentFragment) {
                  inner = (0, _buildCommon.makeSpan)([], [inner], options);
                }

                // Calculate the minimum size for the \surd delimiter
                var metrics = options.fontMetrics();
                var theta = metrics.defaultRuleThickness;

                var phi = theta;
                if (options.style.id < _Style2.default.TEXT.id) {
                  phi = options.fontMetrics().xHeight;
                }

                // Calculate the clearance between the body and line
                var lineClearance = theta + phi / 4;

                var minDelimiterHeight = (inner.height + inner.depth + lineClearance + theta) * options.sizeMultiplier;

                // Create a sqrt SVG of the required minimum size
                var img = _delimiter2.default.customSizedDelim("\\surd", minDelimiterHeight, false, options, group.mode);

                // Calculate the actual line width.
                // This actually should depend on the chosen font -- e.g. \boldmath
                // should use the thicker surd symbols from e.g. KaTeX_Main-Bold, and
                // have thicker rules.
                var ruleWidth = options.fontMetrics().sqrtRuleThickness * img.sizeMultiplier;

                var delimDepth = img.height - ruleWidth;

                // Adjust the clearance based on the delimiter size
                if (delimDepth > inner.height + inner.depth + lineClearance) {
                  lineClearance = (lineClearance + delimDepth - inner.height - inner.depth) / 2;
                }

                // Shift the sqrt image
                var imgShift = img.height - inner.height - lineClearance - ruleWidth;

                // We add a special case here, because even when `inner` is empty, we
                // still get a line. So, we use a simple heuristic to decide if we
                // should omit the body entirely. (note this doesn't work for something
                // like `\sqrt{\rlap{x}}`, but if someone is doing that they deserve for
                // it not to work.
                var body = void 0;
                if (inner.height === 0 && inner.depth === 0) {
                  body = (0, _buildCommon.makeSpan)();
                } else {
                  inner.style.paddingLeft = img.surdWidth + "em";

                  // Overlay the image and the argument.
                  body = _buildCommon2.default.makeVList(
                    [
                      { type: "elem", elem: inner },
                      {
                        type: "kern",
                        size: -(inner.height + imgShift),
                      },
                      { type: "elem", elem: img },
                      { type: "kern", size: ruleWidth },
                    ],
                    "firstBaseline",
                    null,
                    options
                  );
                  body.children[0].children[0].classes.push("svg-align");
                }

                if (!group.value.index) {
                  return (0, _buildCommon.makeSpan)(["mord", "sqrt"], [body], options);
                } else {
                  // Handle the optional root index

                  // The index is always in scriptscript style
                  var newOptions = options.havingStyle(_Style2.default.SCRIPTSCRIPT);
                  var rootm = buildGroup(group.value.index, newOptions, options);

                  // The amount the index is shifted by. This is taken from the TeX
                  // source, in the definition of `\r@@t`.
                  var toShift = 0.6 * (body.height - body.depth);

                  // Build a VList with the superscript shifted up correctly
                  var rootVList = _buildCommon2.default.makeVList([{ type: "elem", elem: rootm }], "shift", -toShift, options);
                  // Add a class surrounding it so we can add on the appropriate
                  // kerning
                  var rootVListWrap = (0, _buildCommon.makeSpan)(["root"], [rootVList]);

                  return (0, _buildCommon.makeSpan)(["mord", "sqrt"], [rootVListWrap, body], options);
                }
              };

              function sizingGroup(value, options, baseOptions) {
                var inner = buildExpression(value, options, false);
                var multiplier = options.sizeMultiplier / baseOptions.sizeMultiplier;

                // Add size-resetting classes to the inner list and set maxFontSize
                // manually. Handle nested size changes.
                for (var i = 0; i < inner.length; i++) {
                  var pos = _utils2.default.indexOf(inner[i].classes, "sizing");
                  if (pos < 0) {
                    Array.prototype.push.apply(inner[i].classes, options.sizingClasses(baseOptions));
                  } else if (inner[i].classes[pos + 1] === "reset-size" + options.size) {
                    // This is a nested size change: e.g., inner[i] is the "b" in
                    // `\Huge a \small b`. Override the old size (the `reset-` class)
                    // but not the new size.
                    inner[i].classes[pos + 1] = "reset-size" + baseOptions.size;
                  }

                  inner[i].height *= multiplier;
                  inner[i].depth *= multiplier;
                }

                return _buildCommon2.default.makeFragment(inner);
              }

              groupTypes.sizing = function (group, options) {
                // Handle sizing operators like \Huge. Real TeX doesn't actually allow
                // these functions inside of math expressions, so we do some special
                // handling.
                var newOptions = options.havingSize(group.value.size);
                return sizingGroup(group.value.value, newOptions, options);
              };

              groupTypes.styling = function (group, options) {
                // Style changes are handled in the TeXbook on pg. 442, Rule 3.

                // Figure out what style we're changing to.
                var styleMap = {
                  display: _Style2.default.DISPLAY,
                  text: _Style2.default.TEXT,
                  script: _Style2.default.SCRIPT,
                  scriptscript: _Style2.default.SCRIPTSCRIPT,
                };

                var newStyle = styleMap[group.value.style];
                var newOptions = options.havingStyle(newStyle);
                return sizingGroup(group.value.value, newOptions, options);
              };

              groupTypes.font = function (group, options) {
                var font = group.value.font;
                return buildGroup(group.value.body, options.withFont(font));
              };

              groupTypes.delimsizing = function (group, options) {
                var delim = group.value.value;

                if (delim === ".") {
                  // Empty delimiters still count as elements, even though they don't
                  // show anything.
                  return (0, _buildCommon.makeSpan)([group.value.mclass]);
                }

                // Use delimiter.sizedDelim to generate the delimiter.
                return _delimiter2.default.sizedDelim(delim, group.value.size, options, group.mode, [group.value.mclass]);
              };

              groupTypes.leftright = function (group, options) {
                // Build the inner expression
                var inner = buildExpression(group.value.body, options, true);

                var innerHeight = 0;
                var innerDepth = 0;
                var hadMiddle = false;

                // Calculate its height and depth
                for (var i = 0; i < inner.length; i++) {
                  if (inner[i].isMiddle) {
                    hadMiddle = true;
                  } else {
                    innerHeight = Math.max(inner[i].height, innerHeight);
                    innerDepth = Math.max(inner[i].depth, innerDepth);
                  }
                }

                // The size of delimiters is the same, regardless of what style we are
                // in. Thus, to correctly calculate the size of delimiter we need around
                // a group, we scale down the inner size based on the size.
                innerHeight *= options.sizeMultiplier;
                innerDepth *= options.sizeMultiplier;

                var leftDelim = void 0;
                if (group.value.left === ".") {
                  // Empty delimiters in \left and \right make null delimiter spaces.
                  leftDelim = makeNullDelimiter(options, ["mopen"]);
                } else {
                  // Otherwise, use leftRightDelim to generate the correct sized
                  // delimiter.
                  leftDelim = _delimiter2.default.leftRightDelim(group.value.left, innerHeight, innerDepth, options, group.mode, ["mopen"]);
                }
                // Add it to the beginning of the expression
                inner.unshift(leftDelim);

                // Handle middle delimiters
                if (hadMiddle) {
                  for (var _i4 = 1; _i4 < inner.length; _i4++) {
                    var middleDelim = inner[_i4];
                    if (middleDelim.isMiddle) {
                      // Apply the options that were active when \middle was called
                      inner[_i4] = _delimiter2.default.leftRightDelim(
                        middleDelim.isMiddle.value,
                        innerHeight,
                        innerDepth,
                        middleDelim.isMiddle.options,
                        group.mode,
                        []
                      );
                      // Add back spaces shifted into the delimiter
                      var spaces = spliceSpaces(middleDelim.children, 0);
                      if (spaces) {
                        _buildCommon2.default.prependChildren(inner[_i4], spaces);
                      }
                    }
                  }
                }

                var rightDelim = void 0;
                // Same for the right delimiter
                if (group.value.right === ".") {
                  rightDelim = makeNullDelimiter(options, ["mclose"]);
                } else {
                  rightDelim = _delimiter2.default.leftRightDelim(group.value.right, innerHeight, innerDepth, options, group.mode, ["mclose"]);
                }
                // Add it to the end of the expression.
                inner.push(rightDelim);

                return (0, _buildCommon.makeSpan)(["minner"], inner, options);
              };

              groupTypes.middle = function (group, options) {
                var middleDelim = void 0;
                if (group.value.value === ".") {
                  middleDelim = makeNullDelimiter(options, []);
                } else {
                  middleDelim = _delimiter2.default.sizedDelim(group.value.value, 1, options, group.mode, []);
                  middleDelim.isMiddle = {
                    value: group.value.value,
                    options: options,
                  };
                }
                return middleDelim;
              };

              groupTypes.rule = function (group, options) {
                // Make an empty span for the rule
                var rule = (0, _buildCommon.makeSpan)(["mord", "rule"], [], options);

                // Calculate the shift, width, and height of the rule, and account for units
                var shift = 0;
                if (group.value.shift) {
                  shift = _units2.default.calculateSize(group.value.shift, options);
                }

                var width = _units2.default.calculateSize(group.value.width, options);
                var height = _units2.default.calculateSize(group.value.height, options);

                // Style the rule to the right size
                rule.style.borderRightWidth = width + "em";
                rule.style.borderTopWidth = height + "em";
                rule.style.bottom = shift + "em";

                // Record the height and width
                rule.width = width;
                rule.height = height + shift;
                rule.depth = -shift;
                // Font size is the number large enough that the browser will
                // reserve at least `absHeight` space above the baseline.
                // The 1.125 factor was empirically determined
                rule.maxFontSize = height * 1.125 * options.sizeMultiplier;

                return rule;
              };

              groupTypes.kern = function (group, options) {
                // Make an empty span for the rule
                var rule = (0, _buildCommon.makeSpan)(["mord", "rule"], [], options);

                if (group.value.dimension) {
                  var dimension = _units2.default.calculateSize(group.value.dimension, options);
                  rule.style.marginLeft = dimension + "em";
                }

                return rule;
              };

              groupTypes.accent = function (group, options) {
                // Accents are handled in the TeXbook pg. 443, rule 12.
                var base = group.value.base;

                var supsubGroup = void 0;
                if (group.type === "supsub") {
                  // If our base is a character box, and we have superscripts and
                  // subscripts, the supsub will defer to us. In particular, we want
                  // to attach the superscripts and subscripts to the inner body (so
                  // that the position of the superscripts and subscripts won't be
                  // affected by the height of the accent). We accomplish this by
                  // sticking the base of the accent into the base of the supsub, and
                  // rendering that, while keeping track of where the accent is.

                  // The supsub group is the group that was passed in
                  var supsub = group;
                  // The real accent group is the base of the supsub group
                  group = supsub.value.base;
                  // The character box is the base of the accent group
                  base = group.value.base;
                  // Stick the character box into the base of the supsub group
                  supsub.value.base = base;

                  // Rerender the supsub group with its new base, and store that
                  // result.
                  supsubGroup = buildGroup(supsub, options);
                }

                // Build the base group
                var body = buildGroup(base, options.havingCrampedStyle());

                // Does the accent need to shift for the skew of a character?
                var mustShift = group.value.isShifty && isCharacterBox(base);

                // Calculate the skew of the accent. This is based on the line "If the
                // nucleus is not a single character, let s = 0; otherwise set s to the
                // kern amount for the nucleus followed by the \skewchar of its font."
                // Note that our skew metrics are just the kern between each character
                // and the skewchar.
                var skew = 0;
                if (mustShift) {
                  // If the base is a character box, then we want the skew of the
                  // innermost character. To do that, we find the innermost character:
                  var baseChar = getBaseElem(base);
                  // Then, we render its group to get the symbol inside it
                  var baseGroup = buildGroup(baseChar, options.havingCrampedStyle());
                  // Finally, we pull the skew off of the symbol.
                  skew = baseGroup.skew;
                  // Note that we now throw away baseGroup, because the layers we
                  // removed with getBaseElem might contain things like \color which
                  // we can't get rid of.
                  // TODO(emily): Find a better way to get the skew
                }

                // calculate the amount of space between the body and the accent
                var clearance = Math.min(body.height, options.fontMetrics().xHeight);

                // Build the accent
                var accentBody = void 0;
                if (!group.value.isStretchy) {
                  var accent = _buildCommon2.default.makeSymbol(group.value.label, "Main-Regular", group.mode, options);
                  // Remove the italic correction of the accent, because it only serves to
                  // shift the accent over to a place we don't want.
                  accent.italic = 0;

                  // The \vec character that the fonts use is a combining character, and
                  // thus shows up much too far to the left. To account for this, we add a
                  // specific class which shifts the accent over to where we want it.
                  // TODO(emily): Fix this in a better way, like by changing the font
                  // Similarly, text accent \H is a combining character and
                  // requires a different adjustment.
                  var accentClass = null;
                  if (group.value.label === "\\vec") {
                    accentClass = "accent-vec";
                  } else if (group.value.label === "\\H") {
                    accentClass = "accent-hungarian";
                  }

                  accentBody = (0, _buildCommon.makeSpan)([], [accent]);
                  accentBody = (0, _buildCommon.makeSpan)(["accent-body", accentClass], [accentBody]);

                  // Shift the accent over by the skew. Note we shift by twice the skew
                  // because we are centering the accent, so by adding 2*skew to the left,
                  // we shift it to the right by 1*skew.
                  accentBody.style.marginLeft = 2 * skew + "em";

                  accentBody = _buildCommon2.default.makeVList(
                    [
                      { type: "elem", elem: body },
                      {
                        type: "kern",
                        size: -clearance,
                      },
                      {
                        type: "elem",
                        elem: accentBody,
                      },
                    ],
                    "firstBaseline",
                    null,
                    options
                  );
                } else {
                  accentBody = _stretchy2.default.svgSpan(group, options);

                  accentBody = _buildCommon2.default.makeVList(
                    [
                      { type: "elem", elem: body },
                      {
                        type: "elem",
                        elem: accentBody,
                      },
                    ],
                    "firstBaseline",
                    null,
                    options
                  );

                  var styleSpan = accentBody.children[0].children[0].children[1];
                  styleSpan.classes.push("svg-align"); // text-align: left;
                  if (skew > 0) {
                    // Shorten the accent and nudge it to the right.
                    styleSpan.style.width = "calc(100% - " + 2 * skew + "em)";
                    styleSpan.style.marginLeft = 2 * skew + "em";
                  }
                }

                var accentWrap = (0, _buildCommon.makeSpan)(["mord", "accent"], [accentBody], options);

                if (supsubGroup) {
                  // Here, we replace the "base" child of the supsub with our newly
                  // generated accent.
                  supsubGroup.children[0] = accentWrap;

                  // Since we don't rerun the height calculation after replacing the
                  // accent, we manually recalculate height.
                  supsubGroup.height = Math.max(accentWrap.height, supsubGroup.height);

                  // Accents should always be ords, even when their innards are not.
                  supsubGroup.classes[0] = "mord";

                  return supsubGroup;
                } else {
                  return accentWrap;
                }
              };

              groupTypes.horizBrace = function (group, options) {
                var style = options.style;

                var hasSupSub = group.type === "supsub";
                var supSubGroup = void 0;
                var newOptions = void 0;
                if (hasSupSub) {
                  // Ref: LaTeX source2e: }}}}\limits}
                  // i.e. LaTeX treats the brace similar to an op and passes it
                  // with \limits, so we need to assign supsub style.
                  if (group.value.sup) {
                    newOptions = options.havingStyle(style.sup());
                    supSubGroup = buildGroup(group.value.sup, newOptions, options);
                  } else {
                    newOptions = options.havingStyle(style.sub());
                    supSubGroup = buildGroup(group.value.sub, newOptions, options);
                  }
                  group = group.value.base;
                }

                // Build the base group
                var body = buildGroup(group.value.base, options.havingBaseStyle(_Style2.default.DISPLAY));

                // Create the stretchy element
                var braceBody = _stretchy2.default.svgSpan(group, options);

                // Generate the vlist, with the appropriate kerns               ┏━━━━━━━━┓
                // This first vlist contains the subject matter and the brace:   equation
                var vlist = void 0;
                if (group.value.isOver) {
                  vlist = _buildCommon2.default.makeVList(
                    [
                      { type: "elem", elem: body },
                      { type: "kern", size: 0.1 },
                      { type: "elem", elem: braceBody },
                    ],
                    "firstBaseline",
                    null,
                    options
                  );
                  vlist.children[0].children[0].children[1].classes.push("svg-align");
                } else {
                  vlist = _buildCommon2.default.makeVList(
                    [
                      { type: "elem", elem: braceBody },
                      { type: "kern", size: 0.1 },
                      { type: "elem", elem: body },
                    ],
                    "bottom",
                    body.depth + 0.1 + braceBody.height,
                    options
                  );
                  vlist.children[0].children[0].children[0].classes.push("svg-align");
                }

                if (hasSupSub) {
                  // In order to write the supsub, wrap the first vlist in another vlist:
                  // They can't all go in the same vlist, because the note might be wider
                  // than the equation. We want the equation to control the brace width.

                  //      note          long note           long note
                  //   ┏━━━━━━━━┓   or    ┏━━━┓     not    ┏━━━━━━━━━┓
                  //    equation           eqn                 eqn

                  var vSpan = (0, _buildCommon.makeSpan)(["mord", group.value.isOver ? "mover" : "munder"], [vlist], options);

                  if (group.value.isOver) {
                    vlist = _buildCommon2.default.makeVList(
                      [
                        { type: "elem", elem: vSpan },
                        { type: "kern", size: 0.2 },
                        {
                          type: "elem",
                          elem: supSubGroup,
                        },
                      ],
                      "firstBaseline",
                      null,
                      options
                    );
                  } else {
                    vlist = _buildCommon2.default.makeVList(
                      [
                        {
                          type: "elem",
                          elem: supSubGroup,
                        },
                        { type: "kern", size: 0.2 },
                        { type: "elem", elem: vSpan },
                      ],
                      "bottom",
                      vSpan.depth + 0.2 + supSubGroup.height,
                      options
                    );
                  }
                }

                return (0, _buildCommon.makeSpan)(["mord", group.value.isOver ? "mover" : "munder"], [vlist], options);
              };

              groupTypes.accentUnder = function (group, options) {
                // Treat under accents much like underlines.
                var innerGroup = buildGroup(group.value.body, options);

                var accentBody = _stretchy2.default.svgSpan(group, options);
                var kern = /tilde/.test(group.value.label) ? 0.12 : 0;

                // Generate the vlist, with the appropriate kerns
                var vlist = _buildCommon2.default.makeVList(
                  [
                    { type: "elem", elem: accentBody },
                    { type: "kern", size: kern },
                    { type: "elem", elem: innerGroup },
                  ],
                  "bottom",
                  accentBody.height + kern,
                  options
                );

                vlist.children[0].children[0].children[0].classes.push("svg-align");

                return (0, _buildCommon.makeSpan)(["mord", "accentunder"], [vlist], options);
              };

              groupTypes.enclose = function (group, options) {
                // \cancel, \bcancel, \xcancel, \sout, \fbox
                var inner = buildGroup(group.value.body, options);

                var label = group.value.label.substr(1);
                var scale = options.sizeMultiplier;
                var img = void 0;
                var pad = 0;
                var imgShift = 0;

                if (label === "sout") {
                  img = (0, _buildCommon.makeSpan)(["stretchy", "sout"]);
                  img.height = options.fontMetrics().defaultRuleThickness / scale;
                  imgShift = -0.5 * options.fontMetrics().xHeight;
                } else {
                  // Add horizontal padding
                  inner.classes.push(label === "fbox" ? "boxpad" : "cancel-pad");

                  // Add vertical padding
                  var isCharBox = isCharacterBox(group.value.body);
                  // ref: LaTeX source2e: \fboxsep = 3pt;  \fboxrule = .4pt
                  // ref: cancel package: \advance\totalheight2\p@ % "+2"
                  pad = label === "fbox" ? 0.34 : isCharBox ? 0.2 : 0;
                  imgShift = inner.depth + pad;

                  img = _stretchy2.default.encloseSpan(inner, label, pad, options);
                }

                var vlist = _buildCommon2.default.makeVList(
                  [
                    { type: "elem", elem: inner, shift: 0 },
                    {
                      type: "elem",
                      elem: img,
                      shift: imgShift,
                    },
                  ],
                  "individualShift",
                  null,
                  options
                );

                if (label !== "fbox") {
                  vlist.children[0].children[0].children[1].classes.push("svg-align");
                }

                if (/cancel/.test(label)) {
                  // cancel does not create horiz space for its line extension.
                  // That is, not when adjacent to a mord.
                  return (0, _buildCommon.makeSpan)(["mord", "cancel-lap"], [vlist], options);
                } else {
                  return (0, _buildCommon.makeSpan)(["mord"], [vlist], options);
                }
              };

              groupTypes.xArrow = function (group, options) {
                var style = options.style;

                // Build the argument groups in the appropriate style.
                // Ref: amsmath.dtx:   \hbox{$\scriptstyle\mkern#3mu{#6}\mkern#4mu$}%

                var newOptions = options.havingStyle(style.sup());
                var upperGroup = buildGroup(group.value.body, newOptions, options);
                upperGroup.classes.push("x-arrow-pad");

                var lowerGroup = void 0;
                if (group.value.below) {
                  // Build the lower group
                  newOptions = options.havingStyle(style.sub());
                  lowerGroup = buildGroup(group.value.below, newOptions, options);
                  lowerGroup.classes.push("x-arrow-pad");
                }

                var arrowBody = _stretchy2.default.svgSpan(group, options);

                var arrowShift = -options.fontMetrics().axisHeight + arrowBody.depth;
                var upperShift = -options.fontMetrics().axisHeight - arrowBody.height - 0.111; // 2 mu. Ref: amsmath.dtx: #7\if0#2\else\mkern#2mu\fi

                // Generate the vlist
                var vlist = void 0;
                if (group.value.below) {
                  var lowerShift = -options.fontMetrics().axisHeight + lowerGroup.height + arrowBody.height + 0.111;
                  vlist = _buildCommon2.default.makeVList(
                    [
                      {
                        type: "elem",
                        elem: upperGroup,
                        shift: upperShift,
                      },
                      {
                        type: "elem",
                        elem: arrowBody,
                        shift: arrowShift,
                      },
                      {
                        type: "elem",
                        elem: lowerGroup,
                        shift: lowerShift,
                      },
                    ],
                    "individualShift",
                    null,
                    options
                  );
                } else {
                  vlist = _buildCommon2.default.makeVList(
                    [
                      {
                        type: "elem",
                        elem: upperGroup,
                        shift: upperShift,
                      },
                      {
                        type: "elem",
                        elem: arrowBody,
                        shift: arrowShift,
                      },
                    ],
                    "individualShift",
                    null,
                    options
                  );
                }

                vlist.children[0].children[0].children[1].classes.push("svg-align");

                return (0, _buildCommon.makeSpan)(["mrel", "x-arrow"], [vlist], options);
              };

              groupTypes.phantom = function (group, options) {
                var elements = buildExpression(group.value.value, options.withPhantom(), false);

                // \phantom isn't supposed to affect the elements it contains.
                // See "color" for more details.
                return new _buildCommon2.default.makeFragment(elements);
              };

              groupTypes.mclass = function (group, options) {
                var elements = buildExpression(group.value.value, options, true);

                return (0, _buildCommon.makeSpan)([group.value.mclass], elements, options);
              };

              /**
               * buildGroup is the function that takes a group and calls the correct groupType
               * function for it. It also handles the interaction of size and style changes
               * between parents and children.
               */
              var buildGroup = function buildGroup(group, options, baseOptions) {
                if (!group) {
                  return (0, _buildCommon.makeSpan)();
                }

                if (groupTypes[group.type]) {
                  // Call the groupTypes function
                  var groupNode = groupTypes[group.type](group, options);

                  // If the size changed between the parent and the current group, account
                  // for that size difference.
                  if (baseOptions && options.size !== baseOptions.size) {
                    groupNode = (0, _buildCommon.makeSpan)(options.sizingClasses(baseOptions), [groupNode], options);

                    var multiplier = options.sizeMultiplier / baseOptions.sizeMultiplier;

                    groupNode.height *= multiplier;
                    groupNode.depth *= multiplier;
                  }

                  return groupNode;
                } else {
                  throw new _ParseError2.default("Got group of unknown type: '" + group.type + "'");
                }
              };

              /**
               * Take an entire parse tree, and build it into an appropriate set of HTML
               * nodes.
               */
              var buildHTML = function buildHTML(tree, options) {
                // buildExpression is destructive, so we need to make a clone
                // of the incoming tree so that it isn't accidentally changed
                tree = JSON.parse((0, _stringify2.default)(tree));

                // Build the expression contained in the tree
                var expression = buildExpression(tree, options, true);
                var body = (0, _buildCommon.makeSpan)(["base"], expression, options);

                // Add struts, which ensure that the top of the HTML element falls at the
                // height of the expression, and the bottom of the HTML element falls at the
                // depth of the expression.
                var topStrut = (0, _buildCommon.makeSpan)(["strut"]);
                var bottomStrut = (0, _buildCommon.makeSpan)(["strut", "bottom"]);

                topStrut.style.height = body.height + "em";
                bottomStrut.style.height = body.height + body.depth + "em";
                // We'd like to use `vertical-align: top` but in IE 9 this lowers the
                // baseline of the box to the bottom of this strut (instead staying in the
                // normal place) so we use an absolute value for vertical-align instead
                bottomStrut.style.verticalAlign = -body.depth + "em";

                // Wrap the struts and body together
                var htmlNode = (0, _buildCommon.makeSpan)(["katex-html"], [topStrut, bottomStrut, body]);

                htmlNode.setAttribute("aria-hidden", "true");

                return htmlNode;
              };

              module.exports = buildHTML;
            },
            {
              "./ParseError": 29,
              "./Style": 33,
              "./buildCommon": 34,
              "./delimiter": 38,
              "./domTree": 39,
              "./stretchy": 47,
              "./units": 50,
              "./utils": 51,
              "babel-runtime/core-js/json/stringify": 2,
            },
          ],
          36: [
            function (require, module, exports) {
              var _buildCommon = require("./buildCommon");

              var _buildCommon2 = _interopRequireDefault(_buildCommon);

              var _fontMetrics = require("./fontMetrics");

              var _fontMetrics2 = _interopRequireDefault(_fontMetrics);

              var _mathMLTree = require("./mathMLTree");

              var _mathMLTree2 = _interopRequireDefault(_mathMLTree);

              var _ParseError = require("./ParseError");

              var _ParseError2 = _interopRequireDefault(_ParseError);

              var _Style = require("./Style");

              var _Style2 = _interopRequireDefault(_Style);

              var _symbols = require("./symbols");

              var _symbols2 = _interopRequireDefault(_symbols);

              var _utils = require("./utils");

              var _utils2 = _interopRequireDefault(_utils);

              var _stretchy = require("./stretchy");

              var _stretchy2 = _interopRequireDefault(_stretchy);

              function _interopRequireDefault(obj) {
                return obj && obj.__esModule ? obj : { default: obj };
              }

              /**
               * Takes a symbol and converts it into a MathML text node after performing
               * optional replacement from symbols.js.
               */
              /**
               * This file converts a parse tree into a cooresponding MathML tree. The main
               * entry point is the `buildMathML` function, which takes a parse tree from the
               * parser.
               */

              var makeText = function makeText(text, mode) {
                if (_symbols2.default[mode][text] && _symbols2.default[mode][text].replace) {
                  text = _symbols2.default[mode][text].replace;
                }

                return new _mathMLTree2.default.TextNode(text);
              };

              /**
               * Returns the math variant as a string or null if none is required.
               */
              var getVariant = function getVariant(group, options) {
                var font = options.font;
                if (!font) {
                  return null;
                }

                var mode = group.mode;
                if (font === "mathit") {
                  return "italic";
                }

                var value = group.value;
                if (_utils2.default.contains(["\\imath", "\\jmath"], value)) {
                  return null;
                }

                if (_symbols2.default[mode][value] && _symbols2.default[mode][value].replace) {
                  value = _symbols2.default[mode][value].replace;
                }

                var fontName = _buildCommon.fontMap[font].fontName;
                if (_fontMetrics2.default.getCharacterMetrics(value, fontName)) {
                  return _buildCommon.fontMap[options.font].variant;
                }

                return null;
              };

              /**
               * Functions for handling the different types of groups found in the parse
               * tree. Each function should take a parse group and return a MathML node.
               */
              var groupTypes = {};

              var defaultVariant = {
                mi: "italic",
                mn: "normal",
                mtext: "normal",
              };

              groupTypes.mathord = function (group, options) {
                var node = new _mathMLTree2.default.MathNode("mi", [makeText(group.value, group.mode)]);

                var variant = getVariant(group, options) || "italic";
                if (variant !== defaultVariant[node.type]) {
                  node.setAttribute("mathvariant", variant);
                }
                return node;
              };

              groupTypes.textord = function (group, options) {
                var text = makeText(group.value, group.mode);

                var variant = getVariant(group, options) || "normal";

                var node = void 0;
                if (group.mode === "text") {
                  node = new _mathMLTree2.default.MathNode("mtext", [text]);
                } else if (/[0-9]/.test(group.value)) {
                  // TODO(kevinb) merge adjacent <mn> nodes
                  // do it as a post processing step
                  node = new _mathMLTree2.default.MathNode("mn", [text]);
                } else if (group.value === "\\prime") {
                  node = new _mathMLTree2.default.MathNode("mo", [text]);
                } else {
                  node = new _mathMLTree2.default.MathNode("mi", [text]);
                }
                if (variant !== defaultVariant[node.type]) {
                  node.setAttribute("mathvariant", variant);
                }

                return node;
              };

              groupTypes.bin = function (group) {
                var node = new _mathMLTree2.default.MathNode("mo", [makeText(group.value, group.mode)]);

                return node;
              };

              groupTypes.rel = function (group) {
                var node = new _mathMLTree2.default.MathNode("mo", [makeText(group.value, group.mode)]);

                return node;
              };

              groupTypes.open = function (group) {
                var node = new _mathMLTree2.default.MathNode("mo", [makeText(group.value, group.mode)]);

                return node;
              };

              groupTypes.close = function (group) {
                var node = new _mathMLTree2.default.MathNode("mo", [makeText(group.value, group.mode)]);

                return node;
              };

              groupTypes.inner = function (group) {
                var node = new _mathMLTree2.default.MathNode("mo", [makeText(group.value, group.mode)]);

                return node;
              };

              groupTypes.punct = function (group) {
                var node = new _mathMLTree2.default.MathNode("mo", [makeText(group.value, group.mode)]);

                node.setAttribute("separator", "true");

                return node;
              };

              groupTypes.ordgroup = function (group, options) {
                var inner = buildExpression(group.value, options);

                var node = new _mathMLTree2.default.MathNode("mrow", inner);

                return node;
              };

              groupTypes.text = function (group, options) {
                var body = group.value.body;

                // Convert each element of the body into MathML, and combine consecutive
                // <mtext> outputs into a single <mtext> tag.  In this way, we don't
                // nest non-text items (e.g., $nested-math$) within an <mtext>.
                var inner = [];
                var currentText = null;
                for (var i = 0; i < body.length; i++) {
                  var _group = buildGroup(body[i], options);
                  if (_group.type === "mtext" && currentText != null) {
                    Array.prototype.push.apply(currentText.children, _group.children);
                  } else {
                    inner.push(_group);
                    if (_group.type === "mtext") {
                      currentText = _group;
                    }
                  }
                }

                // If there is a single tag in the end (presumably <mtext>),
                // just return it.  Otherwise, wrap them in an <mrow>.
                if (inner.length === 1) {
                  return inner[0];
                } else {
                  return new _mathMLTree2.default.MathNode("mrow", inner);
                }
              };

              groupTypes.color = function (group, options) {
                var inner = buildExpression(group.value.value, options);

                var node = new _mathMLTree2.default.MathNode("mstyle", inner);

                node.setAttribute("mathcolor", group.value.color);

                return node;
              };

              groupTypes.supsub = function (group, options) {
                // Is the inner group a relevant horizonal brace?
                var isBrace = false;
                var isOver = void 0;
                var isSup = void 0;
                if (group.value.base) {
                  if (group.value.base.value.type === "horizBrace") {
                    isSup = group.value.sup ? true : false;
                    if (isSup === group.value.base.value.isOver) {
                      isBrace = true;
                      isOver = group.value.base.value.isOver;
                    }
                  }
                }

                var removeUnnecessaryRow = true;
                var children = [buildGroup(group.value.base, options, removeUnnecessaryRow)];

                if (group.value.sub) {
                  children.push(buildGroup(group.value.sub, options, removeUnnecessaryRow));
                }

                if (group.value.sup) {
                  children.push(buildGroup(group.value.sup, options, removeUnnecessaryRow));
                }

                var nodeType = void 0;
                if (isBrace) {
                  nodeType = isOver ? "mover" : "munder";
                } else if (!group.value.sub) {
                  nodeType = "msup";
                } else if (!group.value.sup) {
                  nodeType = "msub";
                } else {
                  var base = group.value.base;
                  if (base && base.value.limits && options.style === _Style2.default.DISPLAY) {
                    nodeType = "munderover";
                  } else {
                    nodeType = "msubsup";
                  }
                }

                var node = new _mathMLTree2.default.MathNode(nodeType, children);

                return node;
              };

              groupTypes.genfrac = function (group, options) {
                var node = new _mathMLTree2.default.MathNode("mfrac", [
                  buildGroup(group.value.numer, options),
                  buildGroup(group.value.denom, options),
                ]);

                if (!group.value.hasBarLine) {
                  node.setAttribute("linethickness", "0px");
                }

                if (group.value.leftDelim != null || group.value.rightDelim != null) {
                  var withDelims = [];

                  if (group.value.leftDelim != null) {
                    var leftOp = new _mathMLTree2.default.MathNode("mo", [new _mathMLTree2.default.TextNode(group.value.leftDelim)]);

                    leftOp.setAttribute("fence", "true");

                    withDelims.push(leftOp);
                  }

                  withDelims.push(node);

                  if (group.value.rightDelim != null) {
                    var rightOp = new _mathMLTree2.default.MathNode("mo", [new _mathMLTree2.default.TextNode(group.value.rightDelim)]);

                    rightOp.setAttribute("fence", "true");

                    withDelims.push(rightOp);
                  }

                  var outerNode = new _mathMLTree2.default.MathNode("mrow", withDelims);

                  return outerNode;
                }

                return node;
              };

              groupTypes.array = function (group, options) {
                return new _mathMLTree2.default.MathNode(
                  "mtable",
                  group.value.body.map(function (row) {
                    return new _mathMLTree2.default.MathNode(
                      "mtr",
                      row.map(function (cell) {
                        return new _mathMLTree2.default.MathNode("mtd", [buildGroup(cell, options)]);
                      })
                    );
                  })
                );
              };

              groupTypes.sqrt = function (group, options) {
                var node = void 0;
                if (group.value.index) {
                  node = new _mathMLTree2.default.MathNode("mroot", [buildGroup(group.value.body, options), buildGroup(group.value.index, options)]);
                } else {
                  node = new _mathMLTree2.default.MathNode("msqrt", [buildGroup(group.value.body, options)]);
                }

                return node;
              };

              groupTypes.leftright = function (group, options) {
                var inner = buildExpression(group.value.body, options);

                if (group.value.left !== ".") {
                  var leftNode = new _mathMLTree2.default.MathNode("mo", [makeText(group.value.left, group.mode)]);

                  leftNode.setAttribute("fence", "true");

                  inner.unshift(leftNode);
                }

                if (group.value.right !== ".") {
                  var rightNode = new _mathMLTree2.default.MathNode("mo", [makeText(group.value.right, group.mode)]);

                  rightNode.setAttribute("fence", "true");

                  inner.push(rightNode);
                }

                var outerNode = new _mathMLTree2.default.MathNode("mrow", inner);

                return outerNode;
              };

              groupTypes.middle = function (group, options) {
                var middleNode = new _mathMLTree2.default.MathNode("mo", [makeText(group.value.middle, group.mode)]);
                middleNode.setAttribute("fence", "true");
                return middleNode;
              };

              groupTypes.accent = function (group, options) {
                var accentNode = void 0;
                if (group.value.isStretchy) {
                  accentNode = _stretchy2.default.mathMLnode(group.value.label);
                } else {
                  accentNode = new _mathMLTree2.default.MathNode("mo", [makeText(group.value.label, group.mode)]);
                }

                var node = new _mathMLTree2.default.MathNode("mover", [buildGroup(group.value.base, options), accentNode]);

                node.setAttribute("accent", "true");

                return node;
              };

              groupTypes.spacing = function (group) {
                var node = void 0;

                if (group.value === "\\ " || group.value === "\\space" || group.value === " " || group.value === "~") {
                  node = new _mathMLTree2.default.MathNode("mtext", [new _mathMLTree2.default.TextNode("\xA0")]);
                } else {
                  node = new _mathMLTree2.default.MathNode("mspace");

                  node.setAttribute("width", _buildCommon2.default.spacingFunctions[group.value].size);
                }

                return node;
              };

              groupTypes.op = function (group, options) {
                var node = void 0;

                // TODO(emily): handle big operators using the `largeop` attribute

                if (group.value.symbol) {
                  // This is a symbol. Just add the symbol.
                  node = new _mathMLTree2.default.MathNode("mo", [makeText(group.value.body, group.mode)]);
                } else if (group.value.value) {
                  // This is an operator with children. Add them.
                  node = new _mathMLTree2.default.MathNode("mo", buildExpression(group.value.value, options));
                } else {
                  // This is a text operator. Add all of the characters from the
                  // operator's name.
                  // TODO(emily): Add a space in the middle of some of these
                  // operators, like \limsup.
                  node = new _mathMLTree2.default.MathNode("mi", [new _mathMLTree2.default.TextNode(group.value.body.slice(1))]);
                }

                return node;
              };

              groupTypes.mod = function (group, options) {
                var inner = [];

                if (group.value.modType === "pod" || group.value.modType === "pmod") {
                  inner.push(new _mathMLTree2.default.MathNode("mo", [makeText("(", group.mode)]));
                }
                if (group.value.modType !== "pod") {
                  inner.push(new _mathMLTree2.default.MathNode("mo", [makeText("mod", group.mode)]));
                }
                if (group.value.value) {
                  var space = new _mathMLTree2.default.MathNode("mspace");
                  space.setAttribute("width", "0.333333em");
                  inner.push(space);
                  inner = inner.concat(buildExpression(group.value.value, options));
                }
                if (group.value.modType === "pod" || group.value.modType === "pmod") {
                  inner.push(new _mathMLTree2.default.MathNode("mo", [makeText(")", group.mode)]));
                }

                return new _mathMLTree2.default.MathNode("mo", inner);
              };

              groupTypes.katex = function (group) {
                var node = new _mathMLTree2.default.MathNode("mtext", [new _mathMLTree2.default.TextNode("KaTeX")]);

                return node;
              };

              groupTypes.font = function (group, options) {
                var font = group.value.font;
                return buildGroup(group.value.body, options.withFont(font));
              };

              groupTypes.delimsizing = function (group) {
                var children = [];

                if (group.value.value !== ".") {
                  children.push(makeText(group.value.value, group.mode));
                }

                var node = new _mathMLTree2.default.MathNode("mo", children);

                if (group.value.mclass === "mopen" || group.value.mclass === "mclose") {
                  // Only some of the delimsizing functions act as fences, and they
                  // return "mopen" or "mclose" mclass.
                  node.setAttribute("fence", "true");
                } else {
                  // Explicitly disable fencing if it's not a fence, to override the
                  // defaults.
                  node.setAttribute("fence", "false");
                }

                return node;
              };

              groupTypes.styling = function (group, options) {
                // Figure out what style we're changing to.
                // TODO(kevinb): dedupe this with buildHTML.js
                // This will be easier of handling of styling nodes is in the same file.
                var styleMap = {
                  display: _Style2.default.DISPLAY,
                  text: _Style2.default.TEXT,
                  script: _Style2.default.SCRIPT,
                  scriptscript: _Style2.default.SCRIPTSCRIPT,
                };

                var newStyle = styleMap[group.value.style];
                var newOptions = options.havingStyle(newStyle);

                var inner = buildExpression(group.value.value, newOptions);

                var node = new _mathMLTree2.default.MathNode("mstyle", inner);

                var styleAttributes = {
                  display: ["0", "true"],
                  text: ["0", "false"],
                  script: ["1", "false"],
                  scriptscript: ["2", "false"],
                };

                var attr = styleAttributes[group.value.style];

                node.setAttribute("scriptlevel", attr[0]);
                node.setAttribute("displaystyle", attr[1]);

                return node;
              };

              groupTypes.sizing = function (group, options) {
                var newOptions = options.havingSize(group.value.size);
                var inner = buildExpression(group.value.value, newOptions);

                var node = new _mathMLTree2.default.MathNode("mstyle", inner);

                // TODO(emily): This doesn't produce the correct size for nested size
                // changes, because we don't keep state of what style we're currently
                // in, so we can't reset the size to normal before changing it.  Now
                // that we're passing an options parameter we should be able to fix
                // this.
                node.setAttribute("mathsize", newOptions.sizeMultiplier + "em");

                return node;
              };

              groupTypes.overline = function (group, options) {
                var operator = new _mathMLTree2.default.MathNode("mo", [new _mathMLTree2.default.TextNode("\u203E")]);
                operator.setAttribute("stretchy", "true");

                var node = new _mathMLTree2.default.MathNode("mover", [buildGroup(group.value.body, options), operator]);
                node.setAttribute("accent", "true");

                return node;
              };

              groupTypes.underline = function (group, options) {
                var operator = new _mathMLTree2.default.MathNode("mo", [new _mathMLTree2.default.TextNode("\u203E")]);
                operator.setAttribute("stretchy", "true");

                var node = new _mathMLTree2.default.MathNode("munder", [buildGroup(group.value.body, options), operator]);
                node.setAttribute("accentunder", "true");

                return node;
              };

              groupTypes.accentUnder = function (group, options) {
                var accentNode = _stretchy2.default.mathMLnode(group.value.label);
                var node = new _mathMLTree2.default.MathNode("munder", [buildGroup(group.value.body, options), accentNode]);
                node.setAttribute("accentunder", "true");
                return node;
              };

              groupTypes.enclose = function (group, options) {
                var node = new _mathMLTree2.default.MathNode("menclose", [buildGroup(group.value.body, options)]);
                var notation = "";
                switch (group.value.label) {
                  case "\\bcancel":
                    notation = "downdiagonalstrike";
                    break;
                  case "\\sout":
                    notation = "horizontalstrike";
                    break;
                  case "\\fbox":
                    notation = "box";
                    break;
                  default:
                    notation = "updiagonalstrike";
                }
                node.setAttribute("notation", notation);
                return node;
              };

              groupTypes.horizBrace = function (group, options) {
                var accentNode = _stretchy2.default.mathMLnode(group.value.label);
                return new _mathMLTree2.default.MathNode(group.value.isOver ? "mover" : "munder", [
                  buildGroup(group.value.base, options),
                  accentNode,
                ]);
              };

              groupTypes.xArrow = function (group, options) {
                var arrowNode = _stretchy2.default.mathMLnode(group.value.label);
                var node = void 0;
                var lowerNode = void 0;

                if (group.value.body) {
                  var upperNode = buildGroup(group.value.body, options);
                  if (group.value.below) {
                    lowerNode = buildGroup(group.value.below, options);
                    node = new _mathMLTree2.default.MathNode("munderover", [arrowNode, lowerNode, upperNode]);
                  } else {
                    node = new _mathMLTree2.default.MathNode("mover", [arrowNode, upperNode]);
                  }
                } else if (group.value.below) {
                  lowerNode = buildGroup(group.value.below, options);
                  node = new _mathMLTree2.default.MathNode("munder", [arrowNode, lowerNode]);
                } else {
                  node = new _mathMLTree2.default.MathNode("mover", [arrowNode]);
                }
                return node;
              };

              groupTypes.rule = function (group) {
                // TODO(emily): Figure out if there's an actual way to draw black boxes
                // in MathML.
                var node = new _mathMLTree2.default.MathNode("mrow");

                return node;
              };

              groupTypes.kern = function (group) {
                // TODO(kevin): Figure out if there's a way to add space in MathML
                var node = new _mathMLTree2.default.MathNode("mrow");

                return node;
              };

              groupTypes.llap = function (group, options) {
                var node = new _mathMLTree2.default.MathNode("mpadded", [buildGroup(group.value.body, options)]);

                node.setAttribute("lspace", "-1width");
                node.setAttribute("width", "0px");

                return node;
              };

              groupTypes.rlap = function (group, options) {
                var node = new _mathMLTree2.default.MathNode("mpadded", [buildGroup(group.value.body, options)]);

                node.setAttribute("width", "0px");

                return node;
              };

              groupTypes.phantom = function (group, options) {
                var inner = buildExpression(group.value.value, options);
                return new _mathMLTree2.default.MathNode("mphantom", inner);
              };

              groupTypes.mclass = function (group, options) {
                var inner = buildExpression(group.value.value, options);
                return new _mathMLTree2.default.MathNode("mstyle", inner);
              };

              /**
               * Takes a list of nodes, builds them, and returns a list of the generated
               * MathML nodes. A little simpler than the HTML version because we don't do any
               * previous-node handling.
               */
              var buildExpression = function buildExpression(expression, options) {
                var groups = [];
                for (var i = 0; i < expression.length; i++) {
                  var group = expression[i];
                  groups.push(buildGroup(group, options));
                }

                // TODO(kevinb): combine \\not with mrels and mords

                return groups;
              };

              /**
               * Takes a group from the parser and calls the appropriate groupTypes function
               * on it to produce a MathML node.
               */
              // TODO(kevinb): determine if removeUnnecessaryRow should always be true
              var buildGroup = function buildGroup(group, options) {
                var removeUnnecessaryRow = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

                if (!group) {
                  return new _mathMLTree2.default.MathNode("mrow");
                }

                if (groupTypes[group.type]) {
                  // Call the groupTypes function
                  var result = groupTypes[group.type](group, options);
                  if (removeUnnecessaryRow) {
                    if (result.type === "mrow" && result.children.length === 1) {
                      return result.children[0];
                    }
                  }
                  return result;
                } else {
                  throw new _ParseError2.default("Got group of unknown type: '" + group.type + "'");
                }
              };

              /**
               * Takes a full parse tree and settings and builds a MathML representation of
               * it. In particular, we put the elements from building the parse tree into a
               * <semantics> tag so we can also include that TeX source as an annotation.
               *
               * Note that we actually return a domTree element with a `<math>` inside it so
               * we can do appropriate styling.
               */
              var buildMathML = function buildMathML(tree, texExpression, options) {
                var expression = buildExpression(tree, options);

                // Wrap up the expression in an mrow so it is presented in the semantics
                // tag correctly.
                var wrapper = new _mathMLTree2.default.MathNode("mrow", expression);

                // Build a TeX annotation of the source
                var annotation = new _mathMLTree2.default.MathNode("annotation", [new _mathMLTree2.default.TextNode(texExpression)]);

                annotation.setAttribute("encoding", "application/x-tex");

                var semantics = new _mathMLTree2.default.MathNode("semantics", [wrapper, annotation]);

                var math = new _mathMLTree2.default.MathNode("math", [semantics]);

                // You can't style <math> nodes, so we wrap the node in a span.
                return (0, _buildCommon.makeSpan)(["katex-mathml"], [math]);
              };

              module.exports = buildMathML;
            },
            {
              "./ParseError": 29,
              "./Style": 33,
              "./buildCommon": 34,
              "./fontMetrics": 41,
              "./mathMLTree": 45,
              "./stretchy": 47,
              "./symbols": 48,
              "./utils": 51,
            },
          ],
          37: [
            function (require, module, exports) {
              var _buildHTML = require("./buildHTML");

              var _buildHTML2 = _interopRequireDefault(_buildHTML);

              var _buildMathML = require("./buildMathML");

              var _buildMathML2 = _interopRequireDefault(_buildMathML);

              var _buildCommon = require("./buildCommon");

              var _Options = require("./Options");

              var _Options2 = _interopRequireDefault(_Options);

              var _Settings = require("./Settings");

              var _Settings2 = _interopRequireDefault(_Settings);

              var _Style = require("./Style");

              var _Style2 = _interopRequireDefault(_Style);

              function _interopRequireDefault(obj) {
                return obj && obj.__esModule ? obj : { default: obj };
              }

              var buildTree = function buildTree(tree, expression, settings) {
                settings = settings || new _Settings2.default({});

                var startStyle = _Style2.default.TEXT;
                if (settings.displayMode) {
                  startStyle = _Style2.default.DISPLAY;
                }

                // Setup the default options
                var options = new _Options2.default({
                  style: startStyle,
                });

                // `buildHTML` sometimes messes with the parse tree (like turning bins ->
                // ords), so we build the MathML version first.
                var mathMLNode = (0, _buildMathML2.default)(tree, expression, options);
                var htmlNode = (0, _buildHTML2.default)(tree, options);

                var katexNode = (0, _buildCommon.makeSpan)(["katex"], [mathMLNode, htmlNode]);

                if (settings.displayMode) {
                  return (0, _buildCommon.makeSpan)(["katex-display"], [katexNode]);
                } else {
                  return katexNode;
                }
              };

              module.exports = buildTree;
            },
            {
              "./Options": 28,
              "./Settings": 32,
              "./Style": 33,
              "./buildCommon": 34,
              "./buildHTML": 35,
              "./buildMathML": 36,
            },
          ],
          38: [
            function (require, module, exports) {
              var _ParseError = require("./ParseError");

              var _ParseError2 = _interopRequireDefault(_ParseError);

              var _Style = require("./Style");

              var _Style2 = _interopRequireDefault(_Style);

              var _buildCommon = require("./buildCommon");

              var _buildCommon2 = _interopRequireDefault(_buildCommon);

              var _fontMetrics = require("./fontMetrics");

              var _fontMetrics2 = _interopRequireDefault(_fontMetrics);

              var _symbols = require("./symbols");

              var _symbols2 = _interopRequireDefault(_symbols);

              var _utils = require("./utils");

              var _utils2 = _interopRequireDefault(_utils);

              function _interopRequireDefault(obj) {
                return obj && obj.__esModule ? obj : { default: obj };
              }

              /**
               * Get the metrics for a given symbol and font, after transformation (i.e.
               * after following replacement from symbols.js)
               */
              /**
               * This file deals with creating delimiters of various sizes. The TeXbook
               * discusses these routines on page 441-442, in the "Another subroutine sets box
               * x to a specified variable delimiter" paragraph.
               *
               * There are three main routines here. `makeSmallDelim` makes a delimiter in the
               * normal font, but in either text, script, or scriptscript style.
               * `makeLargeDelim` makes a delimiter in textstyle, but in one of the Size1,
               * Size2, Size3, or Size4 fonts. `makeStackedDelim` makes a delimiter out of
               * smaller pieces that are stacked on top of one another.
               *
               * The functions take a parameter `center`, which determines if the delimiter
               * should be centered around the axis.
               *
               * Then, there are three exposed functions. `sizedDelim` makes a delimiter in
               * one of the given sizes. This is used for things like `\bigl`.
               * `customSizedDelim` makes a delimiter with a given total height+depth. It is
               * called in places like `\sqrt`. `leftRightDelim` makes an appropriate
               * delimiter which surrounds an expression of a given height an depth. It is
               * used in `\left` and `\right`.
               */

              var getMetrics = function getMetrics(symbol, font) {
                if (_symbols2.default.math[symbol] && _symbols2.default.math[symbol].replace) {
                  return _fontMetrics2.default.getCharacterMetrics(_symbols2.default.math[symbol].replace, font);
                } else {
                  return _fontMetrics2.default.getCharacterMetrics(symbol, font);
                }
              };

              /**
               * Puts a delimiter span in a given style, and adds appropriate height, depth,
               * and maxFontSizes.
               */
              var styleWrap = function styleWrap(delim, toStyle, options, classes) {
                var newOptions = options.havingBaseStyle(toStyle);

                var span = (0, _buildCommon.makeSpan)((classes || []).concat(newOptions.sizingClasses(options)), [delim], options);

                span.delimSizeMultiplier = newOptions.sizeMultiplier / options.sizeMultiplier;
                span.height *= span.delimSizeMultiplier;
                span.depth *= span.delimSizeMultiplier;
                span.maxFontSize = newOptions.sizeMultiplier;

                return span;
              };

              var centerSpan = function centerSpan(span, options, style) {
                var newOptions = options.havingBaseStyle(style);
                var shift = (1 - options.sizeMultiplier / newOptions.sizeMultiplier) * options.fontMetrics().axisHeight;

                span.classes.push("delimcenter");
                span.style.top = shift + "em";
                span.height -= shift;
                span.depth += shift;
              };

              /**
               * Makes a small delimiter. This is a delimiter that comes in the Main-Regular
               * font, but is restyled to either be in textstyle, scriptstyle, or
               * scriptscriptstyle.
               */
              var makeSmallDelim = function makeSmallDelim(delim, style, center, options, mode, classes) {
                var text = _buildCommon2.default.makeSymbol(delim, "Main-Regular", mode, options);
                var span = styleWrap(text, style, options, classes);
                if (center) {
                  centerSpan(span, options, style);
                }
                return span;
              };

              /**
               * Builds a symbol in the given font size (note size is an integer)
               */
              var mathrmSize = function mathrmSize(value, size, mode, options) {
                return _buildCommon2.default.makeSymbol(value, "Size" + size + "-Regular", mode, options);
              };

              /**
               * Makes a large delimiter. This is a delimiter that comes in the Size1, Size2,
               * Size3, or Size4 fonts. It is always rendered in textstyle.
               */
              var makeLargeDelim = function makeLargeDelim(delim, size, center, options, mode, classes) {
                var inner = mathrmSize(delim, size, mode, options);
                var span = styleWrap(
                  (0, _buildCommon.makeSpan)(["delimsizing", "size" + size], [inner], options),
                  _Style2.default.TEXT,
                  options,
                  classes
                );
                if (center) {
                  centerSpan(span, options, _Style2.default.TEXT);
                }
                return span;
              };

              /**
               * Make an inner span with the given offset and in the given font. This is used
               * in `makeStackedDelim` to make the stacking pieces for the delimiter.
               */
              var makeInner = function makeInner(symbol, font, mode) {
                var sizeClass = void 0;
                // Apply the correct CSS class to choose the right font.
                if (font === "Size1-Regular") {
                  sizeClass = "delim-size1";
                } else if (font === "Size4-Regular") {
                  sizeClass = "delim-size4";
                }

                var inner = (0, _buildCommon.makeSpan)(
                  ["delimsizinginner", sizeClass],
                  [(0, _buildCommon.makeSpan)([], [_buildCommon2.default.makeSymbol(symbol, font, mode)])]
                );

                // Since this will be passed into `makeVList` in the end, wrap the element
                // in the appropriate tag that VList uses.
                return { type: "elem", elem: inner };
              };

              /**
               * Make a stacked delimiter out of a given delimiter, with the total height at
               * least `heightTotal`. This routine is mentioned on page 442 of the TeXbook.
               */
              var makeStackedDelim = function makeStackedDelim(delim, heightTotal, center, options, mode, classes) {
                // There are four parts, the top, an optional middle, a repeated part, and a
                // bottom.
                var top = void 0;
                var middle = void 0;
                var repeat = void 0;
                var bottom = void 0;
                top = repeat = bottom = delim;
                middle = null;
                // Also keep track of what font the delimiters are in
                var font = "Size1-Regular";

                // We set the parts and font based on the symbol. Note that we use
                // '\u23d0' instead of '|' and '\u2016' instead of '\\|' for the
                // repeats of the arrows
                if (delim === "\\uparrow") {
                  repeat = bottom = "\u23D0";
                } else if (delim === "\\Uparrow") {
                  repeat = bottom = "\u2016";
                } else if (delim === "\\downarrow") {
                  top = repeat = "\u23D0";
                } else if (delim === "\\Downarrow") {
                  top = repeat = "\u2016";
                } else if (delim === "\\updownarrow") {
                  top = "\\uparrow";
                  repeat = "\u23D0";
                  bottom = "\\downarrow";
                } else if (delim === "\\Updownarrow") {
                  top = "\\Uparrow";
                  repeat = "\u2016";
                  bottom = "\\Downarrow";
                } else if (delim === "[" || delim === "\\lbrack") {
                  top = "\u23A1";
                  repeat = "\u23A2";
                  bottom = "\u23A3";
                  font = "Size4-Regular";
                } else if (delim === "]" || delim === "\\rbrack") {
                  top = "\u23A4";
                  repeat = "\u23A5";
                  bottom = "\u23A6";
                  font = "Size4-Regular";
                } else if (delim === "\\lfloor") {
                  repeat = top = "\u23A2";
                  bottom = "\u23A3";
                  font = "Size4-Regular";
                } else if (delim === "\\lceil") {
                  top = "\u23A1";
                  repeat = bottom = "\u23A2";
                  font = "Size4-Regular";
                } else if (delim === "\\rfloor") {
                  repeat = top = "\u23A5";
                  bottom = "\u23A6";
                  font = "Size4-Regular";
                } else if (delim === "\\rceil") {
                  top = "\u23A4";
                  repeat = bottom = "\u23A5";
                  font = "Size4-Regular";
                } else if (delim === "(") {
                  top = "\u239B";
                  repeat = "\u239C";
                  bottom = "\u239D";
                  font = "Size4-Regular";
                } else if (delim === ")") {
                  top = "\u239E";
                  repeat = "\u239F";
                  bottom = "\u23A0";
                  font = "Size4-Regular";
                } else if (delim === "\\{" || delim === "\\lbrace") {
                  top = "\u23A7";
                  middle = "\u23A8";
                  bottom = "\u23A9";
                  repeat = "\u23AA";
                  font = "Size4-Regular";
                } else if (delim === "\\}" || delim === "\\rbrace") {
                  top = "\u23AB";
                  middle = "\u23AC";
                  bottom = "\u23AD";
                  repeat = "\u23AA";
                  font = "Size4-Regular";
                } else if (delim === "\\lgroup") {
                  top = "\u23A7";
                  bottom = "\u23A9";
                  repeat = "\u23AA";
                  font = "Size4-Regular";
                } else if (delim === "\\rgroup") {
                  top = "\u23AB";
                  bottom = "\u23AD";
                  repeat = "\u23AA";
                  font = "Size4-Regular";
                } else if (delim === "\\lmoustache") {
                  top = "\u23A7";
                  bottom = "\u23AD";
                  repeat = "\u23AA";
                  font = "Size4-Regular";
                } else if (delim === "\\rmoustache") {
                  top = "\u23AB";
                  bottom = "\u23A9";
                  repeat = "\u23AA";
                  font = "Size4-Regular";
                }

                // Get the metrics of the four sections
                var topMetrics = getMetrics(top, font);
                var topHeightTotal = topMetrics.height + topMetrics.depth;
                var repeatMetrics = getMetrics(repeat, font);
                var repeatHeightTotal = repeatMetrics.height + repeatMetrics.depth;
                var bottomMetrics = getMetrics(bottom, font);
                var bottomHeightTotal = bottomMetrics.height + bottomMetrics.depth;
                var middleHeightTotal = 0;
                var middleFactor = 1;
                if (middle !== null) {
                  var middleMetrics = getMetrics(middle, font);
                  middleHeightTotal = middleMetrics.height + middleMetrics.depth;
                  middleFactor = 2; // repeat symmetrically above and below middle
                }

                // Calcuate the minimal height that the delimiter can have.
                // It is at least the size of the top, bottom, and optional middle combined.
                var minHeight = topHeightTotal + bottomHeightTotal + middleHeightTotal;

                // Compute the number of copies of the repeat symbol we will need
                var repeatCount = Math.ceil((heightTotal - minHeight) / (middleFactor * repeatHeightTotal));

                // Compute the total height of the delimiter including all the symbols
                var realHeightTotal = minHeight + repeatCount * middleFactor * repeatHeightTotal;

                // The center of the delimiter is placed at the center of the axis. Note
                // that in this context, "center" means that the delimiter should be
                // centered around the axis in the current style, while normally it is
                // centered around the axis in textstyle.
                var axisHeight = options.fontMetrics().axisHeight;
                if (center) {
                  axisHeight *= options.sizeMultiplier;
                }
                // Calculate the depth
                var depth = realHeightTotal / 2 - axisHeight;

                // Now, we start building the pieces that will go into the vlist

                // Keep a list of the inner pieces
                var inners = [];

                // Add the bottom symbol
                inners.push(makeInner(bottom, font, mode));

                if (middle === null) {
                  // Add that many symbols
                  for (var i = 0; i < repeatCount; i++) {
                    inners.push(makeInner(repeat, font, mode));
                  }
                } else {
                  // When there is a middle bit, we need the middle part and two repeated
                  // sections
                  for (var _i = 0; _i < repeatCount; _i++) {
                    inners.push(makeInner(repeat, font, mode));
                  }
                  inners.push(makeInner(middle, font, mode));
                  for (var _i2 = 0; _i2 < repeatCount; _i2++) {
                    inners.push(makeInner(repeat, font, mode));
                  }
                }

                // Add the top symbol
                inners.push(makeInner(top, font, mode));

                // Finally, build the vlist
                var newOptions = options.havingBaseStyle(_Style2.default.TEXT);
                var inner = _buildCommon2.default.makeVList(inners, "bottom", depth, newOptions);

                return styleWrap((0, _buildCommon.makeSpan)(["delimsizing", "mult"], [inner], newOptions), _Style2.default.TEXT, options, classes);
              };

              var sqrtInnerSVG = {
                // The main path geometry is from glyph U221A in the font KaTeX Main
                main: "<svg viewBox='0 0 400000 1000' preserveAspectRatio='xMinYMin\nslice'><path d='M95 622c-2.667 0-7.167-2.667-13.5\n-8S72 604 72 600c0-2 .333-3.333 1-4 1.333-2.667 23.833-20.667 67.5-54s\n65.833-50.333 66.5-51c1.333-1.333 3-2 5-2 4.667 0 8.667 3.333 12 10l173\n378c.667 0 35.333-71 104-213s137.5-285 206.5-429S812 17.333 812 14c5.333\n-9.333 12-14 20-14h399166v40H845.272L620 507 385 993c-2.667 4.667-9 7-19\n7-6 0-10-1-12-3L160 575l-65 47zM834 0h399166v40H845z'/></svg>",

                // size1 is from glyph U221A in the font KaTeX_Size1-Regular
                1: "<svg viewBox='0 0 400000 1200' preserveAspectRatio='xMinYMin\nslice'><path d='M263 601c.667 0 18 39.667 52 119s68.167\n 158.667 102.5 238 51.833 119.333 52.5 120C810 373.333 980.667 17.667 982 11\nc4.667-7.333 11-11 19-11h398999v40H1012.333L741 607c-38.667 80.667-84 175-136\n 283s-89.167 185.333-111.5 232-33.833 70.333-34.5 71c-4.667 4.667-12.333 7-23\n 7l-12-1-109-253c-72.667-168-109.333-252-110-252-10.667 8-22 16.667-34 26-22\n 17.333-33.333 26-34 26l-26-26 76-59 76-60zM1001 0h398999v40H1012z'/></svg>",

                // size2 is from glyph U221A in the font KaTeX_Size2-Regular
                2: "<svg viewBox='0 0 400000 1800' preserveAspectRatio='xMinYMin\nslice'><path d='M1001 0h398999v40H1013.084S929.667 308 749\n 880s-277 876.333-289 913c-4.667 4.667-12.667 7-24 7h-12c-1.333-3.333-3.667\n-11.667-7-25-35.333-125.333-106.667-373.333-214-744-10 12-21 25-33 39l-32 39\nc-6-5.333-15-14-27-26l25-30c26.667-32.667 52-63 76-91l52-60 208 722c56-175.333\n 126.333-397.333 211-666s153.833-488.167 207.5-658.5C944.167 129.167 975 32.667\n 983 10c4-6.667 10-10 18-10zm0 0h398999v40H1013z'/></svg>",

                // size3 is from glyph U221A in the font KaTeX_Size3-Regular
                3: "<svg viewBox='0 0 400000 2400' preserveAspectRatio='xMinYMin\nslice'><path d='M424 2398c-1.333-.667-38.5-172-111.5-514\nS202.667 1370.667 202 1370c0-2-10.667 14.333-32 49-4.667 7.333-9.833 15.667\n-15.5 25s-9.833 16-12.5 20l-5 7c-4-3.333-8.333-7.667-13-13l-13-13 76-122 77-121\n 209 968c0-2 84.667-361.667 254-1079C896.333 373.667 981.667 13.333 983 10\nc4-6.667 10-10 18-10h398999v40H1014.622S927.332 418.667 742 1206c-185.333\n 787.333-279.333 1182.333-282 1185-2 6-10 9-24 9-8 0-12-.667-12-2z\nM1001 0h398999v40H1014z'/></svg>",

                // size4 is from glyph U221A in the font KaTeX_Size4-Regular
                4: "<svg viewBox='0 0 400000 3000' preserveAspectRatio='xMinYMin\nslice'><path d='M473 2713C812.333 913.667 982.333 13 983 11\nc3.333-7.333 9.333-11 18-11h399110v40H1017.698S927.168 518 741.5 1506C555.833\n 2494 462 2989 460 2991c-2 6-10 9-24 9-8 0-12-.667-12-2s-5.333-32-16-92c-50.667\n-293.333-119.667-693.333-207-1200 0-1.333-5.333 8.667-16 30l-32 64-16 33-26-26\n 76-153 77-151c.667.667 35.667 202 105 604 67.333 400.667 102 602.667 104 606z\nM1001 0h398999v40H1017z'/></svg>",

                // tall is from glyph U23B7 in the font KaTeX_Size4-Regular
                tall: "l-4 4-4 4c-.667.667-2 1.5-4 2.5s-4.167 1.833-6.5 2.5-5.5 1-9.5 1h\n-12l-28-84c-16.667-52-96.667 -294.333-240-727l-212 -643 -85 170c-4-3.333-8.333\n-7.667-13 -13l-13-13l77-155 77-156c66 199.333 139 419.667 219 661 l218 661z\nM702 0H400000v40H742z'/></svg>",
              };

              var sqrtSpan = function sqrtSpan(height, delim, options) {
                // Create a span containing an SVG image of a sqrt symbol.
                var span = _buildCommon2.default.makeSpan([], [], options);
                var sizeMultiplier = options.sizeMultiplier; // default

                if (delim.type === "small") {
                  // Get an SVG that is derived from glyph U+221A in font KaTeX-Main.
                  var newOptions = options.havingBaseStyle(delim.style);
                  sizeMultiplier = newOptions.sizeMultiplier / options.sizeMultiplier;

                  span.height = 1 * sizeMultiplier;
                  span.style.height = span.height + "em";
                  span.surdWidth = 0.833 * sizeMultiplier; // from the font.
                  //In the font, the glyph is 1000 units tall. The font scale is 1:1000.

                  span.innerHTML = "<svg width='100%' height='" + span.height + "em'>\n            " + sqrtInnerSVG["main"] + "</svg>";
                } else if (delim.type === "large") {
                  // These SVGs come from fonts: KaTeX_Size1, _Size2, etc.
                  // Get sqrt height from font data
                  span.height = sizeToMaxHeight[delim.size] / sizeMultiplier;
                  span.style.height = span.height + "em";
                  span.surdWidth = 1.0 / sizeMultiplier; // from the font

                  span.innerHTML = '<svg width="100%" height="' + span.height + 'em">\n            ' + sqrtInnerSVG[delim.size] + "</svg>";
                } else {
                  // Tall sqrt. In TeX, this would be stacked using multiple glyphs.
                  // We'll use a single SVG to accomplish the same thing.
                  span.height = height / sizeMultiplier;
                  span.style.height = span.height + "em";
                  span.surdWidth = 1.056 / sizeMultiplier;
                  var viewBoxHeight = Math.floor(span.height * 1000); // scale = 1:1000
                  var vertSegment = viewBoxHeight - 54;

                  // This \sqrt is customized in both height and width. We set the
                  // height now. Then CSS will stretch the image to the correct width.
                  // This SVG path comes from glyph U+23B7, font KaTeX_Size4-Regular.
                  span.innerHTML =
                    "<svg width='100%' height='" +
                    span.height +
                    "em'>\n            <svg viewBox='0 0 400000 " +
                    viewBoxHeight +
                    "'\n            preserveAspectRatio='xMinYMax slice'>\n            <path d='M702 0H400000v40H742v" +
                    vertSegment +
                    "\n            " +
                    sqrtInnerSVG["tall"] +
                    "</svg>";
                }

                span.sizeMultiplier = sizeMultiplier;

                return span;
              };

              // There are three kinds of delimiters, delimiters that stack when they become
              // too large
              var stackLargeDelimiters = [
                "(",
                ")",
                "[",
                "\\lbrack",
                "]",
                "\\rbrack",
                "\\{",
                "\\lbrace",
                "\\}",
                "\\rbrace",
                "\\lfloor",
                "\\rfloor",
                "\\lceil",
                "\\rceil",
                "\\surd",
              ];

              // delimiters that always stack
              var stackAlwaysDelimiters = [
                "\\uparrow",
                "\\downarrow",
                "\\updownarrow",
                "\\Uparrow",
                "\\Downarrow",
                "\\Updownarrow",
                "|",
                "\\|",
                "\\vert",
                "\\Vert",
                "\\lvert",
                "\\rvert",
                "\\lVert",
                "\\rVert",
                "\\lgroup",
                "\\rgroup",
                "\\lmoustache",
                "\\rmoustache",
              ];

              // and delimiters that never stack
              var stackNeverDelimiters = ["<", ">", "\\langle", "\\rangle", "/", "\\backslash", "\\lt", "\\gt"];

              // Metrics of the different sizes. Found by looking at TeX's output of
              // $\bigl| // \Bigl| \biggl| \Biggl| \showlists$
              // Used to create stacked delimiters of appropriate sizes in makeSizedDelim.
              var sizeToMaxHeight = [0, 1.2, 1.8, 2.4, 3.0];

              /**
               * Used to create a delimiter of a specific size, where `size` is 1, 2, 3, or 4.
               */
              var makeSizedDelim = function makeSizedDelim(delim, size, options, mode, classes) {
                // < and > turn into \langle and \rangle in delimiters
                if (delim === "<" || delim === "\\lt") {
                  delim = "\\langle";
                } else if (delim === ">" || delim === "\\gt") {
                  delim = "\\rangle";
                }

                // Sized delimiters are never centered.
                if (_utils2.default.contains(stackLargeDelimiters, delim) || _utils2.default.contains(stackNeverDelimiters, delim)) {
                  return makeLargeDelim(delim, size, false, options, mode, classes);
                } else if (_utils2.default.contains(stackAlwaysDelimiters, delim)) {
                  return makeStackedDelim(delim, sizeToMaxHeight[size], false, options, mode, classes);
                } else {
                  throw new _ParseError2.default("Illegal delimiter: '" + delim + "'");
                }
              };

              /**
               * There are three different sequences of delimiter sizes that the delimiters
               * follow depending on the kind of delimiter. This is used when creating custom
               * sized delimiters to decide whether to create a small, large, or stacked
               * delimiter.
               *
               * In real TeX, these sequences aren't explicitly defined, but are instead
               * defined inside the font metrics. Since there are only three sequences that
               * are possible for the delimiters that TeX defines, it is easier to just encode
               * them explicitly here.
               */

              // Delimiters that never stack try small delimiters and large delimiters only
              var stackNeverDelimiterSequence = [
                {
                  type: "small",
                  style: _Style2.default.SCRIPTSCRIPT,
                },
                {
                  type: "small",
                  style: _Style2.default.SCRIPT,
                },
                { type: "small", style: _Style2.default.TEXT },
                { type: "large", size: 1 },
                { type: "large", size: 2 },
                { type: "large", size: 3 },
                { type: "large", size: 4 },
              ];

              // Delimiters that always stack try the small delimiters first, then stack
              var stackAlwaysDelimiterSequence = [
                {
                  type: "small",
                  style: _Style2.default.SCRIPTSCRIPT,
                },
                {
                  type: "small",
                  style: _Style2.default.SCRIPT,
                },
                { type: "small", style: _Style2.default.TEXT },
                { type: "stack" },
              ];

              // Delimiters that stack when large try the small and then large delimiters, and
              // stack afterwards
              var stackLargeDelimiterSequence = [
                {
                  type: "small",
                  style: _Style2.default.SCRIPTSCRIPT,
                },
                {
                  type: "small",
                  style: _Style2.default.SCRIPT,
                },
                { type: "small", style: _Style2.default.TEXT },
                { type: "large", size: 1 },
                { type: "large", size: 2 },
                { type: "large", size: 3 },
                { type: "large", size: 4 },
                { type: "stack" },
              ];

              /**
               * Get the font used in a delimiter based on what kind of delimiter it is.
               */
              var delimTypeToFont = function delimTypeToFont(type) {
                if (type.type === "small") {
                  return "Main-Regular";
                } else if (type.type === "large") {
                  return "Size" + type.size + "-Regular";
                } else if (type.type === "stack") {
                  return "Size4-Regular";
                }
              };

              /**
               * Traverse a sequence of types of delimiters to decide what kind of delimiter
               * should be used to create a delimiter of the given height+depth.
               */
              var traverseSequence = function traverseSequence(delim, height, sequence, options) {
                // Here, we choose the index we should start at in the sequences. In smaller
                // sizes (which correspond to larger numbers in style.size) we start earlier
                // in the sequence. Thus, scriptscript starts at index 3-3=0, script starts
                // at index 3-2=1, text starts at 3-1=2, and display starts at min(2,3-0)=2
                var start = Math.min(2, 3 - options.style.size);
                for (var i = start; i < sequence.length; i++) {
                  if (sequence[i].type === "stack") {
                    // This is always the last delimiter, so we just break the loop now.
                    break;
                  }

                  var metrics = getMetrics(delim, delimTypeToFont(sequence[i]));
                  var heightDepth = metrics.height + metrics.depth;

                  // Small delimiters are scaled down versions of the same font, so we
                  // account for the style change size.

                  if (sequence[i].type === "small") {
                    var newOptions = options.havingBaseStyle(sequence[i].style);
                    heightDepth *= newOptions.sizeMultiplier;
                  }

                  // Check if the delimiter at this size works for the given height.
                  if (heightDepth > height) {
                    return sequence[i];
                  }
                }

                // If we reached the end of the sequence, return the last sequence element.
                return sequence[sequence.length - 1];
              };

              /**
               * Make a delimiter of a given height+depth, with optional centering. Here, we
               * traverse the sequences, and create a delimiter that the sequence tells us to.
               */
              var makeCustomSizedDelim = function makeCustomSizedDelim(delim, height, center, options, mode, classes) {
                if (delim === "<" || delim === "\\lt") {
                  delim = "\\langle";
                } else if (delim === ">" || delim === "\\gt") {
                  delim = "\\rangle";
                }

                // Decide what sequence to use
                var sequence = void 0;
                if (_utils2.default.contains(stackNeverDelimiters, delim)) {
                  sequence = stackNeverDelimiterSequence;
                } else if (_utils2.default.contains(stackLargeDelimiters, delim)) {
                  sequence = stackLargeDelimiterSequence;
                } else {
                  sequence = stackAlwaysDelimiterSequence;
                }

                // Look through the sequence
                var delimType = traverseSequence(delim, height, sequence, options);

                if (delim === "\\surd") {
                  // Get an SVG image for
                  return sqrtSpan(height, delimType, options);
                } else {
                  // Get the delimiter from font glyphs.
                  // Depending on the sequence element we decided on, call the
                  // appropriate function.
                  if (delimType.type === "small") {
                    return makeSmallDelim(delim, delimType.style, center, options, mode, classes);
                  } else if (delimType.type === "large") {
                    return makeLargeDelim(delim, delimType.size, center, options, mode, classes);
                  } else if (delimType.type === "stack") {
                    return makeStackedDelim(delim, height, center, options, mode, classes);
                  }
                }
              };

              /**
               * Make a delimiter for use with `\left` and `\right`, given a height and depth
               * of an expression that the delimiters surround.
               */
              var makeLeftRightDelim = function makeLeftRightDelim(delim, height, depth, options, mode, classes) {
                // We always center \left/\right delimiters, so the axis is always shifted
                var axisHeight = options.fontMetrics().axisHeight * options.sizeMultiplier;

                // Taken from TeX source, tex.web, function make_left_right
                var delimiterFactor = 901;
                var delimiterExtend = 5.0 / options.fontMetrics().ptPerEm;

                var maxDistFromAxis = Math.max(height - axisHeight, depth + axisHeight);

                var totalHeight = Math.max(
                  // In real TeX, calculations are done using integral values which are
                  // 65536 per pt, or 655360 per em. So, the division here truncates in
                  // TeX but doesn't here, producing different results. If we wanted to
                  // exactly match TeX's calculation, we could do
                  //   Math.floor(655360 * maxDistFromAxis / 500) *
                  //    delimiterFactor / 655360
                  // (To see the difference, compare
                  //    x^{x^{\left(\rule{0.1em}{0.68em}\right)}}
                  // in TeX and KaTeX)
                  (maxDistFromAxis / 500) * delimiterFactor,
                  2 * maxDistFromAxis - delimiterExtend
                );

                // Finally, we defer to `makeCustomSizedDelim` with our calculated total
                // height
                return makeCustomSizedDelim(delim, totalHeight, true, options, mode, classes);
              };

              module.exports = {
                sizedDelim: makeSizedDelim,
                customSizedDelim: makeCustomSizedDelim,
                leftRightDelim: makeLeftRightDelim,
              };
            },
            {
              "./ParseError": 29,
              "./Style": 33,
              "./buildCommon": 34,
              "./fontMetrics": 41,
              "./symbols": 48,
              "./utils": 51,
            },
          ],
          39: [
            function (require, module, exports) {
              var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

              var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

              var _createClass2 = require("babel-runtime/helpers/createClass");

              var _createClass3 = _interopRequireDefault(_createClass2);

              var _unicodeRegexes = require("./unicodeRegexes");

              var _unicodeRegexes2 = _interopRequireDefault(_unicodeRegexes);

              var _utils = require("./utils");

              var _utils2 = _interopRequireDefault(_utils);

              function _interopRequireDefault(obj) {
                return obj && obj.__esModule ? obj : { default: obj };
              }

              /**
               * Create an HTML className based on a list of classes. In addition to joining
               * with spaces, we also remove null or empty classes.
               */
              /**
               * These objects store the data about the DOM nodes we create, as well as some
               * extra data. They can then be transformed into real DOM nodes with the
               * `toNode` function or HTML markup using `toMarkup`. They are useful for both
               * storing extra properties on the nodes, as well as providing a way to easily
               * work with the DOM.
               *
               * Similar functions for working with MathML nodes exist in mathMLTree.js.
               */
              var createClass = function createClass(classes) {
                classes = classes.slice();
                for (var i = classes.length - 1; i >= 0; i--) {
                  if (!classes[i]) {
                    classes.splice(i, 1);
                  }
                }

                return classes.join(" ");
              };

              /**
               * This node represents a span node, with a className, a list of children, and
               * an inline style. It also contains information about its height, depth, and
               * maxFontSize.
               */

              var span = (function () {
                function span(classes, children, options) {
                  (0, _classCallCheck3.default)(this, span);

                  this.classes = classes || [];
                  this.children = children || [];
                  this.height = 0;
                  this.depth = 0;
                  this.maxFontSize = 0;
                  this.style = {};
                  this.attributes = {};
                  this.innerHTML; // used for inline SVG code.
                  if (options) {
                    if (options.style.isTight()) {
                      this.classes.push("mtight");
                    }
                    if (options.getColor()) {
                      this.style.color = options.getColor();
                    }
                  }
                }

                /**
                 * Sets an arbitrary attribute on the span. Warning: use this wisely. Not all
                 * browsers support attributes the same, and having too many custom attributes
                 * is probably bad.
                 */

                (0, _createClass3.default)(span, [
                  {
                    key: "setAttribute",
                    value: function setAttribute(attribute, value) {
                      this.attributes[attribute] = value;
                    },
                  },
                  {
                    key: "tryCombine",
                    value: function tryCombine(sibling) {
                      return false;
                    },

                    /**
                     * Convert the span into an HTML node
                     */
                  },
                  {
                    key: "toNode",
                    value: function toNode() {
                      var span = document.createElement("span");

                      // Apply the class
                      span.className = createClass(this.classes);

                      // Apply inline styles
                      for (var style in this.style) {
                        if (Object.prototype.hasOwnProperty.call(this.style, style)) {
                          span.style[style] = this.style[style];
                        }
                      }

                      // Apply attributes
                      for (var attr in this.attributes) {
                        if (Object.prototype.hasOwnProperty.call(this.attributes, attr)) {
                          span.setAttribute(attr, this.attributes[attr]);
                        }
                      }

                      if (this.innerHTML) {
                        span.innerHTML = this.innerHTML;
                      }

                      // Append the children, also as HTML nodes
                      for (var i = 0; i < this.children.length; i++) {
                        span.appendChild(this.children[i].toNode());
                      }

                      return span;
                    },

                    /**
                     * Convert the span into an HTML markup string
                     */
                  },
                  {
                    key: "toMarkup",
                    value: function toMarkup() {
                      var markup = "<span";

                      // Add the class
                      if (this.classes.length) {
                        markup += ' class="';
                        markup += _utils2.default.escape(createClass(this.classes));
                        markup += '"';
                      }

                      var styles = "";

                      // Add the styles, after hyphenation
                      for (var style in this.style) {
                        if (this.style.hasOwnProperty(style)) {
                          styles += _utils2.default.hyphenate(style) + ":" + this.style[style] + ";";
                        }
                      }

                      if (styles) {
                        markup += ' style="' + _utils2.default.escape(styles) + '"';
                      }

                      // Add the attributes
                      for (var attr in this.attributes) {
                        if (Object.prototype.hasOwnProperty.call(this.attributes, attr)) {
                          markup += " " + attr + '="';
                          markup += _utils2.default.escape(this.attributes[attr]);
                          markup += '"';
                        }
                      }

                      markup += ">";

                      if (this.innerHTML) {
                        markup += this.innerHTML;
                      }

                      // Add the markup of the children, also as markup
                      for (var i = 0; i < this.children.length; i++) {
                        markup += this.children[i].toMarkup();
                      }

                      markup += "</span>";

                      return markup;
                    },
                  },
                ]);
                return span;
              })();

              /**
               * This node represents a document fragment, which contains elements, but when
               * placed into the DOM doesn't have any representation itself. Thus, it only
               * contains children and doesn't have any HTML properties. It also keeps track
               * of a height, depth, and maxFontSize.
               */

              var documentFragment = (function () {
                function documentFragment(children) {
                  (0, _classCallCheck3.default)(this, documentFragment);

                  this.children = children || [];
                  this.height = 0;
                  this.depth = 0;
                  this.maxFontSize = 0;
                }

                /**
                 * Convert the fragment into a node
                 */

                (0, _createClass3.default)(documentFragment, [
                  {
                    key: "toNode",
                    value: function toNode() {
                      // Create a fragment
                      var frag = document.createDocumentFragment();

                      // Append the children
                      for (var i = 0; i < this.children.length; i++) {
                        frag.appendChild(this.children[i].toNode());
                      }

                      return frag;
                    },

                    /**
                     * Convert the fragment into HTML markup
                     */
                  },
                  {
                    key: "toMarkup",
                    value: function toMarkup() {
                      var markup = "";

                      // Simply concatenate the markup for the children together
                      for (var i = 0; i < this.children.length; i++) {
                        markup += this.children[i].toMarkup();
                      }

                      return markup;
                    },
                  },
                ]);
                return documentFragment;
              })();

              var iCombinations = {
                î: "\u0131\u0302",
                ï: "\u0131\u0308",
                í: "\u0131\u0301",
                // 'ī': '\u0131\u0304', // enable when we add Extended Latin
                ì: "\u0131\u0300",
              };

              /**
               * A symbol node contains information about a single symbol. It either renders
               * to a single text node, or a span with a single text node in it, depending on
               * whether it has CSS classes, styles, or needs italic correction.
               */

              var symbolNode = (function () {
                function symbolNode(value, height, depth, italic, skew, classes, style) {
                  (0, _classCallCheck3.default)(this, symbolNode);

                  this.value = value || "";
                  this.height = height || 0;
                  this.depth = depth || 0;
                  this.italic = italic || 0;
                  this.skew = skew || 0;
                  this.classes = classes || [];
                  this.style = style || {};
                  this.maxFontSize = 0;

                  // Mark CJK characters with specific classes so that we can specify which
                  // fonts to use.  This allows us to render these characters with a serif
                  // font in situations where the browser would either default to a sans serif
                  // or render a placeholder character.
                  if (_unicodeRegexes2.default.cjkRegex.test(value)) {
                    // I couldn't find any fonts that contained Hangul as well as all of
                    // the other characters we wanted to test there for it gets its own
                    // CSS class.
                    if (_unicodeRegexes2.default.hangulRegex.test(value)) {
                      this.classes.push("hangul_fallback");
                    } else {
                      this.classes.push("cjk_fallback");
                    }
                  }

                  if (/[îïíì]/.test(this.value)) {
                    // add ī when we add Extended Latin
                    this.value = iCombinations[this.value];
                  }
                }

                (0, _createClass3.default)(symbolNode, [
                  {
                    key: "tryCombine",
                    value: function tryCombine(sibling) {
                      if (
                        !sibling ||
                        !(sibling instanceof symbolNode) ||
                        this.italic > 0 ||
                        createClass(this.classes) !== createClass(sibling.classes) ||
                        this.skew !== sibling.skew ||
                        this.maxFontSize !== sibling.maxFontSize
                      ) {
                        return false;
                      }
                      for (var style in this.style) {
                        if (this.style.hasOwnProperty(style) && this.style[style] !== sibling.style[style]) {
                          return false;
                        }
                      }
                      for (var _style in sibling.style) {
                        if (sibling.style.hasOwnProperty(_style) && this.style[_style] !== sibling.style[_style]) {
                          return false;
                        }
                      }
                      this.value += sibling.value;
                      this.height = Math.max(this.height, sibling.height);
                      this.depth = Math.max(this.depth, sibling.depth);
                      this.italic = sibling.italic;
                      return true;
                    },

                    /**
                     * Creates a text node or span from a symbol node. Note that a span is only
                     * created if it is needed.
                     */
                  },
                  {
                    key: "toNode",
                    value: function toNode() {
                      var node = document.createTextNode(this.value);
                      var span = null;

                      if (this.italic > 0) {
                        span = document.createElement("span");
                        span.style.marginRight = this.italic + "em";
                      }

                      if (this.classes.length > 0) {
                        span = span || document.createElement("span");
                        span.className = createClass(this.classes);
                      }

                      for (var style in this.style) {
                        if (this.style.hasOwnProperty(style)) {
                          span = span || document.createElement("span");
                          span.style[style] = this.style[style];
                        }
                      }

                      if (span) {
                        span.appendChild(node);
                        return span;
                      } else {
                        return node;
                      }
                    },

                    /**
                     * Creates markup for a symbol node.
                     */
                  },
                  {
                    key: "toMarkup",
                    value: function toMarkup() {
                      // TODO(alpert): More duplication than I'd like from
                      // span.prototype.toMarkup and symbolNode.prototype.toNode...
                      var needsSpan = false;

                      var markup = "<span";

                      if (this.classes.length) {
                        needsSpan = true;
                        markup += ' class="';
                        markup += _utils2.default.escape(createClass(this.classes));
                        markup += '"';
                      }

                      var styles = "";

                      if (this.italic > 0) {
                        styles += "margin-right:" + this.italic + "em;";
                      }
                      for (var style in this.style) {
                        if (this.style.hasOwnProperty(style)) {
                          styles += _utils2.default.hyphenate(style) + ":" + this.style[style] + ";";
                        }
                      }

                      if (styles) {
                        needsSpan = true;
                        markup += ' style="' + _utils2.default.escape(styles) + '"';
                      }

                      var escaped = _utils2.default.escape(this.value);
                      if (needsSpan) {
                        markup += ">";
                        markup += escaped;
                        markup += "</span>";
                        return markup;
                      } else {
                        return escaped;
                      }
                    },
                  },
                ]);
                return symbolNode;
              })();

              module.exports = {
                span: span,
                documentFragment: documentFragment,
                symbolNode: symbolNode,
              };
            },
            {
              "./unicodeRegexes": 49,
              "./utils": 51,
              "babel-runtime/helpers/classCallCheck": 4,
              "babel-runtime/helpers/createClass": 5,
            },
          ],
          40: [
            function (require, module, exports) {
              var _ParseNode = require("./ParseNode");

              var _ParseNode2 = _interopRequireDefault(_ParseNode);

              var _ParseError = require("./ParseError");

              var _ParseError2 = _interopRequireDefault(_ParseError);

              function _interopRequireDefault(obj) {
                return obj && obj.__esModule ? obj : { default: obj };
              }

              /**
               * Parse the body of the environment, with rows delimited by \\ and
               * columns delimited by &, and create a nested list in row-major order
               * with one group per cell.  If given an optional argument style
               * ("text", "display", etc.), then each cell is cast into that style.
               */
              /* eslint no-constant-condition:0 */
              function parseArray(parser, result, style) {
                var row = [];
                var body = [row];
                var rowGaps = [];
                while (true) {
                  var cell = parser.parseExpression(false, null);
                  cell = new _ParseNode2.default("ordgroup", cell, parser.mode);
                  if (style) {
                    cell = new _ParseNode2.default(
                      "styling",
                      {
                        style: style,
                        value: [cell],
                      },
                      parser.mode
                    );
                  }
                  row.push(cell);
                  var next = parser.nextToken.text;
                  if (next === "&") {
                    parser.consume();
                  } else if (next === "\\end") {
                    break;
                  } else if (next === "\\\\" || next === "\\cr") {
                    var cr = parser.parseFunction();
                    rowGaps.push(cr.value.size);
                    row = [];
                    body.push(row);
                  } else {
                    throw new _ParseError2.default("Expected & or \\\\ or \\end", parser.nextToken);
                  }
                }
                result.body = body;
                result.rowGaps = rowGaps;
                return new _ParseNode2.default(result.type, result, parser.mode);
              }

              /*
               * An environment definition is very similar to a function definition:
               * it is declared with a name or a list of names, a set of properties
               * and a handler containing the actual implementation.
               *
               * The properties include:
               *  - numArgs: The number of arguments after the \begin{name} function.
               *  - argTypes: (optional) Just like for a function
               *  - allowedInText: (optional) Whether or not the environment is allowed inside
               *                   text mode (default false) (not enforced yet)
               *  - numOptionalArgs: (optional) Just like for a function
               * A bare number instead of that object indicates the numArgs value.
               *
               * The handler function will receive two arguments
               *  - context: information and references provided by the parser
               *  - args: an array of arguments passed to \begin{name}
               * The context contains the following properties:
               *  - envName: the name of the environment, one of the listed names.
               *  - parser: the parser object
               *  - lexer: the lexer object
               *  - positions: the positions associated with these arguments from args.
               * The handler must return a ParseResult.
               */
              function defineEnvironment(names, props, handler) {
                if (typeof names === "string") {
                  names = [names];
                }
                if (typeof props === "number") {
                  props = { numArgs: props };
                }
                // Set default values of environments
                var data = {
                  numArgs: props.numArgs || 0,
                  argTypes: props.argTypes,
                  greediness: 1,
                  allowedInText: !!props.allowedInText,
                  numOptionalArgs: props.numOptionalArgs || 0,
                  handler: handler,
                };
                for (var i = 0; i < names.length; ++i) {
                  module.exports[names[i]] = data;
                }
              }

              // Decides on a style for cells in an array according to whether the given
              // environment name starts with the letter 'd'.
              function dCellStyle(envName) {
                if (envName.substr(0, 1) === "d") {
                  return "display";
                } else {
                  return "text";
                }
              }

              // Arrays are part of LaTeX, defined in lttab.dtx so its documentation
              // is part of the source2e.pdf file of LaTeX2e source documentation.
              // {darray} is an {array} environment where cells are set in \displaystyle,
              // as defined in nccmath.sty.
              defineEnvironment(
                ["array", "darray"],
                {
                  numArgs: 1,
                },
                function (context, args) {
                  var colalign = args[0];
                  colalign = colalign.value.map ? colalign.value : [colalign];
                  var cols = colalign.map(function (node) {
                    var ca = node.value;
                    if ("lcr".indexOf(ca) !== -1) {
                      return {
                        type: "align",
                        align: ca,
                      };
                    } else if (ca === "|") {
                      return {
                        type: "separator",
                        separator: "|",
                      };
                    }
                    throw new _ParseError2.default("Unknown column alignment: " + node.value, node);
                  });
                  var res = {
                    type: "array",
                    cols: cols,
                    hskipBeforeAndAfter: true,
                  };
                  res = parseArray(context.parser, res, dCellStyle(context.envName));
                  return res;
                }
              );

              // The matrix environments of amsmath builds on the array environment
              // of LaTeX, which is discussed above.
              defineEnvironment(["matrix", "pmatrix", "bmatrix", "Bmatrix", "vmatrix", "Vmatrix"], {}, function (context) {
                var delimiters = {
                  matrix: null,
                  pmatrix: ["(", ")"],
                  bmatrix: ["[", "]"],
                  Bmatrix: ["\\{", "\\}"],
                  vmatrix: ["|", "|"],
                  Vmatrix: ["\\Vert", "\\Vert"],
                }[context.envName];
                var res = {
                  type: "array",
                  hskipBeforeAndAfter: false,
                };
                res = parseArray(context.parser, res, dCellStyle(context.envName));
                if (delimiters) {
                  res = new _ParseNode2.default(
                    "leftright",
                    {
                      body: [res],
                      left: delimiters[0],
                      right: delimiters[1],
                    },
                    context.mode
                  );
                }
                return res;
              });

              // A cases environment (in amsmath.sty) is almost equivalent to
              // \def\arraystretch{1.2}%
              // \left\{\begin{array}{@{}l@{\quad}l@{}} … \end{array}\right.
              // {dcases} is a {cases} environment where cells are set in \displaystyle,
              // as defined in mathtools.sty.
              defineEnvironment(["cases", "dcases"], {}, function (context) {
                var res = {
                  type: "array",
                  arraystretch: 1.2,
                  cols: [
                    {
                      type: "align",
                      align: "l",
                      pregap: 0,
                      // TODO(kevinb) get the current style.
                      // For now we use the metrics for TEXT style which is what we were
                      // doing before.  Before attempting to get the current style we
                      // should look at TeX's behavior especially for \over and matrices.
                      postgap: 1.0,
                    },
                    {
                      type: "align",
                      align: "l",
                      pregap: 0,
                      postgap: 0,
                    },
                  ],
                };
                res = parseArray(context.parser, res, dCellStyle(context.envName));
                res = new _ParseNode2.default(
                  "leftright",
                  {
                    body: [res],
                    left: "\\{",
                    right: ".",
                  },
                  context.mode
                );
                return res;
              });

              // An aligned environment is like the align* environment
              // except it operates within math mode.
              // Note that we assume \nomallineskiplimit to be zero,
              // so that \strut@ is the same as \strut.
              defineEnvironment("aligned", {}, function (context) {
                var res = {
                  type: "array",
                  cols: [],
                  addJot: true,
                };
                res = parseArray(context.parser, res, "display");
                // Count number of columns = maximum number of cells in each row.
                // At the same time, prepend empty group {} at beginning of every second
                // cell in each row (starting with second cell) so that operators become
                // binary.  This behavior is implemented in amsmath's \start@aligned.
                var emptyGroup = new _ParseNode2.default("ordgroup", [], context.mode);
                var numCols = 0;
                res.value.body.forEach(function (row) {
                  for (var i = 1; i < row.length; i += 2) {
                    // Modify ordgroup node within styling node
                    var ordgroup = row[i].value.value[0];
                    ordgroup.value.unshift(emptyGroup);
                  }
                  if (numCols < row.length) {
                    numCols = row.length;
                  }
                });
                for (var i = 0; i < numCols; ++i) {
                  var align = "r";
                  var pregap = 0;
                  if (i % 2 === 1) {
                    align = "l";
                  } else if (i > 0) {
                    pregap = 2; // one \qquad between columns
                  }
                  res.value.cols[i] = {
                    type: "align",
                    align: align,
                    pregap: pregap,
                    postgap: 0,
                  };
                }
                return res;
              });

              // A gathered environment is like an array environment with one centered
              // column, but where rows are considered lines so get \jot line spacing
              // and contents are set in \displaystyle.
              defineEnvironment("gathered", {}, function (context) {
                var res = {
                  type: "array",
                  cols: [
                    {
                      type: "align",
                      align: "c",
                    },
                  ],
                  addJot: true,
                };
                res = parseArray(context.parser, res, "display");
                return res;
              });
            },
            { "./ParseError": 29, "./ParseNode": 30 },
          ],
          41: [
            function (require, module, exports) {
              var _unicodeRegexes = require("./unicodeRegexes");

              var _fontMetricsData = require("./fontMetricsData");

              var _fontMetricsData2 = _interopRequireDefault(_fontMetricsData);

              function _interopRequireDefault(obj) {
                return obj && obj.__esModule ? obj : { default: obj };
              }

              /**
               * This file contains metrics regarding fonts and individual symbols. The sigma
               * and xi variables, as well as the metricMap map contain data extracted from
               * TeX, TeX font metrics, and the TTF files. These data are then exposed via the
               * `metrics` variable and the getCharacterMetrics function.
               */

              // In TeX, there are actually three sets of dimensions, one for each of
              // textstyle (size index 5 and higher: >=9pt), scriptstyle (size index 3 and 4:
              // 7-8pt), and scriptscriptstyle (size index 1 and 2: 5-6pt).  These are
              // provided in the the arrays below, in that order.
              //
              // The font metrics are stored in fonts cmsy10, cmsy7, and cmsy5 respsectively.
              // This was determined by running the following script:
              //
              //     latex -interaction=nonstopmode \
              //     '\documentclass{article}\usepackage{amsmath}\begin{document}' \
              //     '$a$ \expandafter\show\the\textfont2' \
              //     '\expandafter\show\the\scriptfont2' \
              //     '\expandafter\show\the\scriptscriptfont2' \
              //     '\stop'
              //
              // The metrics themselves were retreived using the following commands:
              //
              //     tftopl cmsy10
              //     tftopl cmsy7
              //     tftopl cmsy5
              //
              // The output of each of these commands is quite lengthy.  The only part we
              // care about is the FONTDIMEN section. Each value is measured in EMs.
              var sigmasAndXis = {
                slant: [0.25, 0.25, 0.25], // sigma1
                space: [0.0, 0.0, 0.0], // sigma2
                stretch: [0.0, 0.0, 0.0], // sigma3
                shrink: [0.0, 0.0, 0.0], // sigma4
                xHeight: [0.431, 0.431, 0.431], // sigma5
                quad: [1.0, 1.171, 1.472], // sigma6
                extraSpace: [0.0, 0.0, 0.0], // sigma7
                num1: [0.677, 0.732, 0.925], // sigma8
                num2: [0.394, 0.384, 0.387], // sigma9
                num3: [0.444, 0.471, 0.504], // sigma10
                denom1: [0.686, 0.752, 1.025], // sigma11
                denom2: [0.345, 0.344, 0.532], // sigma12
                sup1: [0.413, 0.503, 0.504], // sigma13
                sup2: [0.363, 0.431, 0.404], // sigma14
                sup3: [0.289, 0.286, 0.294], // sigma15
                sub1: [0.15, 0.143, 0.2], // sigma16
                sub2: [0.247, 0.286, 0.4], // sigma17
                supDrop: [0.386, 0.353, 0.494], // sigma18
                subDrop: [0.05, 0.071, 0.1], // sigma19
                delim1: [2.39, 1.7, 1.98], // sigma20
                delim2: [1.01, 1.157, 1.42], // sigma21
                axisHeight: [0.25, 0.25, 0.25], // sigma22

                // These font metrics are extracted from TeX by using tftopl on cmex10.tfm;
                // they correspond to the font parameters of the extension fonts (family 3).
                // See the TeXbook, page 441. In AMSTeX, the extension fonts scale; to
                // match cmex7, we'd use cmex7.tfm values for script and scriptscript
                // values.
                defaultRuleThickness: [0.04, 0.049, 0.049], // xi8; cmex7: 0.049
                bigOpSpacing1: [0.111, 0.111, 0.111], // xi9
                bigOpSpacing2: [0.166, 0.166, 0.166], // xi10
                bigOpSpacing3: [0.2, 0.2, 0.2], // xi11
                bigOpSpacing4: [0.6, 0.611, 0.611], // xi12; cmex7: 0.611
                bigOpSpacing5: [0.1, 0.143, 0.143], // xi13; cmex7: 0.143

                // The \sqrt rule width is taken from the height of the surd character.
                // Since we use the same font at all sizes, this thickness doesn't scale.
                sqrtRuleThickness: [0.04, 0.04, 0.04],

                // This value determines how large a pt is, for metrics which are defined
                // in terms of pts.
                // This value is also used in katex.less; if you change it make sure the
                // values match.
                ptPerEm: [10.0, 10.0, 10.0],

                // The space between adjacent `|` columns in an array definition. From
                // `\showthe\doublerulesep` in LaTeX. Equals 2.0 / ptPerEm.
                doubleRuleSep: [0.2, 0.2, 0.2],
              };

              // This map contains a mapping from font name and character code to character
              // metrics, including height, depth, italic correction, and skew (kern from the
              // character to the corresponding \skewchar)
              // This map is generated via `make metrics`. It should not be changed manually.

              // These are very rough approximations.  We default to Times New Roman which
              // should have Latin-1 and Cyrillic characters, but may not depending on the
              // operating system.  The metrics do not account for extra height from the
              // accents.  In the case of Cyrillic characters which have both ascenders and
              // descenders we prefer approximations with ascenders, primarily to prevent
              // the fraction bar or root line from intersecting the glyph.
              // TODO(kevinb) allow union of multiple glyph metrics for better accuracy.
              var extraCharacterMap = {
                // Latin-1
                À: "A",
                Á: "A",
                Â: "A",
                Ã: "A",
                Ä: "A",
                Å: "A",
                Æ: "A",
                Ç: "C",
                È: "E",
                É: "E",
                Ê: "E",
                Ë: "E",
                Ì: "I",
                Í: "I",
                Î: "I",
                Ï: "I",
                Ð: "D",
                Ñ: "N",
                Ò: "O",
                Ó: "O",
                Ô: "O",
                Õ: "O",
                Ö: "O",
                Ø: "O",
                Ù: "U",
                Ú: "U",
                Û: "U",
                Ü: "U",
                Ý: "Y",
                Þ: "o",
                ß: "B",
                à: "a",
                á: "a",
                â: "a",
                ã: "a",
                ä: "a",
                å: "a",
                æ: "a",
                ç: "c",
                è: "e",
                é: "e",
                ê: "e",
                ë: "e",
                ì: "i",
                í: "i",
                î: "i",
                ï: "i",
                ð: "d",
                ñ: "n",
                ò: "o",
                ó: "o",
                ô: "o",
                õ: "o",
                ö: "o",
                ø: "o",
                ù: "u",
                ú: "u",
                û: "u",
                ü: "u",
                ý: "y",
                þ: "o",
                ÿ: "y",

                // Cyrillic
                А: "A",
                Б: "B",
                В: "B",
                Г: "F",
                Д: "A",
                Е: "E",
                Ж: "K",
                З: "3",
                И: "N",
                Й: "N",
                К: "K",
                Л: "N",
                М: "M",
                Н: "H",
                О: "O",
                П: "N",
                Р: "P",
                С: "C",
                Т: "T",
                У: "y",
                Ф: "O",
                Х: "X",
                Ц: "U",
                Ч: "h",
                Ш: "W",
                Щ: "W",
                Ъ: "B",
                Ы: "X",
                Ь: "B",
                Э: "3",
                Ю: "X",
                Я: "R",
                а: "a",
                б: "b",
                в: "a",
                г: "r",
                д: "y",
                е: "e",
                ж: "m",
                з: "e",
                и: "n",
                й: "n",
                к: "n",
                л: "n",
                м: "m",
                н: "n",
                о: "o",
                п: "n",
                р: "p",
                с: "c",
                т: "o",
                у: "y",
                ф: "b",
                х: "x",
                ц: "n",
                ч: "n",
                ш: "w",
                щ: "w",
                ъ: "a",
                ы: "m",
                ь: "a",
                э: "e",
                ю: "m",
                я: "r",
              };

              /**
               * This function is a convenience function for looking up information in the
               * metricMap table. It takes a character as a string, and a style.
               *
               * Note: the `width` property may be undefined if fontMetricsData.js wasn't
               * built using `Make extended_metrics`.
               */
              var getCharacterMetrics = function getCharacterMetrics(character, style) {
                var ch = character.charCodeAt(0);
                if (character[0] in extraCharacterMap) {
                  ch = extraCharacterMap[character[0]].charCodeAt(0);
                } else if (_unicodeRegexes.cjkRegex.test(character[0])) {
                  ch = "M".charCodeAt(0);
                }
                var metrics = _fontMetricsData2.default[style][ch];
                if (metrics) {
                  return {
                    depth: metrics[0],
                    height: metrics[1],
                    italic: metrics[2],
                    skew: metrics[3],
                    width: metrics[4],
                  };
                }
              };

              var fontMetricsBySizeIndex = {};

              /**
               * Get the font metrics for a given size.
               */
              var getFontMetrics = function getFontMetrics(size) {
                var sizeIndex = void 0;
                if (size >= 5) {
                  sizeIndex = 0;
                } else if (size >= 3) {
                  sizeIndex = 1;
                } else {
                  sizeIndex = 2;
                }
                if (!fontMetricsBySizeIndex[sizeIndex]) {
                  var metrics = (fontMetricsBySizeIndex[sizeIndex] = {});
                  for (var key in sigmasAndXis) {
                    if (sigmasAndXis.hasOwnProperty(key)) {
                      metrics[key] = sigmasAndXis[key][sizeIndex];
                    }
                  }
                  metrics.cssEmPerMu = metrics.quad / 18;
                }
                return fontMetricsBySizeIndex[sizeIndex];
              };

              module.exports = {
                getFontMetrics: getFontMetrics,
                getCharacterMetrics: getCharacterMetrics,
              };
            },
            { "./fontMetricsData": 42, "./unicodeRegexes": 49 },
          ],
          42: [
            function (require, module, exports) {
              module.exports = {
                "AMS-Regular": {
                  65: [0, 0.68889, 0, 0],
                  66: [0, 0.68889, 0, 0],
                  67: [0, 0.68889, 0, 0],
                  68: [0, 0.68889, 0, 0],
                  69: [0, 0.68889, 0, 0],
                  70: [0, 0.68889, 0, 0],
                  71: [0, 0.68889, 0, 0],
                  72: [0, 0.68889, 0, 0],
                  73: [0, 0.68889, 0, 0],
                  74: [0.16667, 0.68889, 0, 0],
                  75: [0, 0.68889, 0, 0],
                  76: [0, 0.68889, 0, 0],
                  77: [0, 0.68889, 0, 0],
                  78: [0, 0.68889, 0, 0],
                  79: [0.16667, 0.68889, 0, 0],
                  80: [0, 0.68889, 0, 0],
                  81: [0.16667, 0.68889, 0, 0],
                  82: [0, 0.68889, 0, 0],
                  83: [0, 0.68889, 0, 0],
                  84: [0, 0.68889, 0, 0],
                  85: [0, 0.68889, 0, 0],
                  86: [0, 0.68889, 0, 0],
                  87: [0, 0.68889, 0, 0],
                  88: [0, 0.68889, 0, 0],
                  89: [0, 0.68889, 0, 0],
                  90: [0, 0.68889, 0, 0],
                  107: [0, 0.68889, 0, 0],
                  165: [0, 0.675, 0.025, 0],
                  174: [0.15559, 0.69224, 0, 0],
                  240: [0, 0.68889, 0, 0],
                  295: [0, 0.68889, 0, 0],
                  710: [0, 0.825, 0, 0],
                  732: [0, 0.9, 0, 0],
                  770: [0, 0.825, 0, 0],
                  771: [0, 0.9, 0, 0],
                  989: [0.08167, 0.58167, 0, 0],
                  1008: [0, 0.43056, 0.04028, 0],
                  8245: [0, 0.54986, 0, 0],
                  8463: [0, 0.68889, 0, 0],
                  8487: [0, 0.68889, 0, 0],
                  8498: [0, 0.68889, 0, 0],
                  8502: [0, 0.68889, 0, 0],
                  8503: [0, 0.68889, 0, 0],
                  8504: [0, 0.68889, 0, 0],
                  8513: [0, 0.68889, 0, 0],
                  8592: [-0.03598, 0.46402, 0, 0],
                  8594: [-0.03598, 0.46402, 0, 0],
                  8602: [-0.13313, 0.36687, 0, 0],
                  8603: [-0.13313, 0.36687, 0, 0],
                  8606: [0.01354, 0.52239, 0, 0],
                  8608: [0.01354, 0.52239, 0, 0],
                  8610: [0.01354, 0.52239, 0, 0],
                  8611: [0.01354, 0.52239, 0, 0],
                  8619: [0, 0.54986, 0, 0],
                  8620: [0, 0.54986, 0, 0],
                  8621: [-0.13313, 0.37788, 0, 0],
                  8622: [-0.13313, 0.36687, 0, 0],
                  8624: [0, 0.69224, 0, 0],
                  8625: [0, 0.69224, 0, 0],
                  8630: [0, 0.43056, 0, 0],
                  8631: [0, 0.43056, 0, 0],
                  8634: [0.08198, 0.58198, 0, 0],
                  8635: [0.08198, 0.58198, 0, 0],
                  8638: [0.19444, 0.69224, 0, 0],
                  8639: [0.19444, 0.69224, 0, 0],
                  8642: [0.19444, 0.69224, 0, 0],
                  8643: [0.19444, 0.69224, 0, 0],
                  8644: [0.1808, 0.675, 0, 0],
                  8646: [0.1808, 0.675, 0, 0],
                  8647: [0.1808, 0.675, 0, 0],
                  8648: [0.19444, 0.69224, 0, 0],
                  8649: [0.1808, 0.675, 0, 0],
                  8650: [0.19444, 0.69224, 0, 0],
                  8651: [0.01354, 0.52239, 0, 0],
                  8652: [0.01354, 0.52239, 0, 0],
                  8653: [-0.13313, 0.36687, 0, 0],
                  8654: [-0.13313, 0.36687, 0, 0],
                  8655: [-0.13313, 0.36687, 0, 0],
                  8666: [0.13667, 0.63667, 0, 0],
                  8667: [0.13667, 0.63667, 0, 0],
                  8669: [-0.13313, 0.37788, 0, 0],
                  8672: [-0.064, 0.437, 0, 0],
                  8674: [-0.064, 0.437, 0, 0],
                  8705: [0, 0.825, 0, 0],
                  8708: [0, 0.68889, 0, 0],
                  8709: [0.08167, 0.58167, 0, 0],
                  8717: [0, 0.43056, 0, 0],
                  8722: [-0.03598, 0.46402, 0, 0],
                  8724: [0.08198, 0.69224, 0, 0],
                  8726: [0.08167, 0.58167, 0, 0],
                  8733: [0, 0.69224, 0, 0],
                  8736: [0, 0.69224, 0, 0],
                  8737: [0, 0.69224, 0, 0],
                  8738: [0.03517, 0.52239, 0, 0],
                  8739: [0.08167, 0.58167, 0, 0],
                  8740: [0.25142, 0.74111, 0, 0],
                  8741: [0.08167, 0.58167, 0, 0],
                  8742: [0.25142, 0.74111, 0, 0],
                  8756: [0, 0.69224, 0, 0],
                  8757: [0, 0.69224, 0, 0],
                  8764: [-0.13313, 0.36687, 0, 0],
                  8765: [-0.13313, 0.37788, 0, 0],
                  8769: [-0.13313, 0.36687, 0, 0],
                  8770: [-0.03625, 0.46375, 0, 0],
                  8774: [0.30274, 0.79383, 0, 0],
                  8776: [-0.01688, 0.48312, 0, 0],
                  8778: [0.08167, 0.58167, 0, 0],
                  8782: [0.06062, 0.54986, 0, 0],
                  8783: [0.06062, 0.54986, 0, 0],
                  8785: [0.08198, 0.58198, 0, 0],
                  8786: [0.08198, 0.58198, 0, 0],
                  8787: [0.08198, 0.58198, 0, 0],
                  8790: [0, 0.69224, 0, 0],
                  8791: [0.22958, 0.72958, 0, 0],
                  8796: [0.08198, 0.91667, 0, 0],
                  8806: [0.25583, 0.75583, 0, 0],
                  8807: [0.25583, 0.75583, 0, 0],
                  8808: [0.25142, 0.75726, 0, 0],
                  8809: [0.25142, 0.75726, 0, 0],
                  8812: [0.25583, 0.75583, 0, 0],
                  8814: [0.20576, 0.70576, 0, 0],
                  8815: [0.20576, 0.70576, 0, 0],
                  8816: [0.30274, 0.79383, 0, 0],
                  8817: [0.30274, 0.79383, 0, 0],
                  8818: [0.22958, 0.72958, 0, 0],
                  8819: [0.22958, 0.72958, 0, 0],
                  8822: [0.1808, 0.675, 0, 0],
                  8823: [0.1808, 0.675, 0, 0],
                  8828: [0.13667, 0.63667, 0, 0],
                  8829: [0.13667, 0.63667, 0, 0],
                  8830: [0.22958, 0.72958, 0, 0],
                  8831: [0.22958, 0.72958, 0, 0],
                  8832: [0.20576, 0.70576, 0, 0],
                  8833: [0.20576, 0.70576, 0, 0],
                  8840: [0.30274, 0.79383, 0, 0],
                  8841: [0.30274, 0.79383, 0, 0],
                  8842: [0.13597, 0.63597, 0, 0],
                  8843: [0.13597, 0.63597, 0, 0],
                  8847: [0.03517, 0.54986, 0, 0],
                  8848: [0.03517, 0.54986, 0, 0],
                  8858: [0.08198, 0.58198, 0, 0],
                  8859: [0.08198, 0.58198, 0, 0],
                  8861: [0.08198, 0.58198, 0, 0],
                  8862: [0, 0.675, 0, 0],
                  8863: [0, 0.675, 0, 0],
                  8864: [0, 0.675, 0, 0],
                  8865: [0, 0.675, 0, 0],
                  8872: [0, 0.69224, 0, 0],
                  8873: [0, 0.69224, 0, 0],
                  8874: [0, 0.69224, 0, 0],
                  8876: [0, 0.68889, 0, 0],
                  8877: [0, 0.68889, 0, 0],
                  8878: [0, 0.68889, 0, 0],
                  8879: [0, 0.68889, 0, 0],
                  8882: [0.03517, 0.54986, 0, 0],
                  8883: [0.03517, 0.54986, 0, 0],
                  8884: [0.13667, 0.63667, 0, 0],
                  8885: [0.13667, 0.63667, 0, 0],
                  8888: [0, 0.54986, 0, 0],
                  8890: [0.19444, 0.43056, 0, 0],
                  8891: [0.19444, 0.69224, 0, 0],
                  8892: [0.19444, 0.69224, 0, 0],
                  8901: [0, 0.54986, 0, 0],
                  8903: [0.08167, 0.58167, 0, 0],
                  8905: [0.08167, 0.58167, 0, 0],
                  8906: [0.08167, 0.58167, 0, 0],
                  8907: [0, 0.69224, 0, 0],
                  8908: [0, 0.69224, 0, 0],
                  8909: [-0.03598, 0.46402, 0, 0],
                  8910: [0, 0.54986, 0, 0],
                  8911: [0, 0.54986, 0, 0],
                  8912: [0.03517, 0.54986, 0, 0],
                  8913: [0.03517, 0.54986, 0, 0],
                  8914: [0, 0.54986, 0, 0],
                  8915: [0, 0.54986, 0, 0],
                  8916: [0, 0.69224, 0, 0],
                  8918: [0.0391, 0.5391, 0, 0],
                  8919: [0.0391, 0.5391, 0, 0],
                  8920: [0.03517, 0.54986, 0, 0],
                  8921: [0.03517, 0.54986, 0, 0],
                  8922: [0.38569, 0.88569, 0, 0],
                  8923: [0.38569, 0.88569, 0, 0],
                  8926: [0.13667, 0.63667, 0, 0],
                  8927: [0.13667, 0.63667, 0, 0],
                  8928: [0.30274, 0.79383, 0, 0],
                  8929: [0.30274, 0.79383, 0, 0],
                  8934: [0.23222, 0.74111, 0, 0],
                  8935: [0.23222, 0.74111, 0, 0],
                  8936: [0.23222, 0.74111, 0, 0],
                  8937: [0.23222, 0.74111, 0, 0],
                  8938: [0.20576, 0.70576, 0, 0],
                  8939: [0.20576, 0.70576, 0, 0],
                  8940: [0.30274, 0.79383, 0, 0],
                  8941: [0.30274, 0.79383, 0, 0],
                  8994: [0.19444, 0.69224, 0, 0],
                  8995: [0.19444, 0.69224, 0, 0],
                  9416: [0.15559, 0.69224, 0, 0],
                  9484: [0, 0.69224, 0, 0],
                  9488: [0, 0.69224, 0, 0],
                  9492: [0, 0.37788, 0, 0],
                  9496: [0, 0.37788, 0, 0],
                  9585: [0.19444, 0.68889, 0, 0],
                  9586: [0.19444, 0.74111, 0, 0],
                  9632: [0, 0.675, 0, 0],
                  9633: [0, 0.675, 0, 0],
                  9650: [0, 0.54986, 0, 0],
                  9651: [0, 0.54986, 0, 0],
                  9654: [0.03517, 0.54986, 0, 0],
                  9660: [0, 0.54986, 0, 0],
                  9661: [0, 0.54986, 0, 0],
                  9664: [0.03517, 0.54986, 0, 0],
                  9674: [0.11111, 0.69224, 0, 0],
                  9733: [0.19444, 0.69224, 0, 0],
                  10003: [0, 0.69224, 0, 0],
                  10016: [0, 0.69224, 0, 0],
                  10731: [0.11111, 0.69224, 0, 0],
                  10846: [0.19444, 0.75583, 0, 0],
                  10877: [0.13667, 0.63667, 0, 0],
                  10878: [0.13667, 0.63667, 0, 0],
                  10885: [0.25583, 0.75583, 0, 0],
                  10886: [0.25583, 0.75583, 0, 0],
                  10887: [0.13597, 0.63597, 0, 0],
                  10888: [0.13597, 0.63597, 0, 0],
                  10889: [0.26167, 0.75726, 0, 0],
                  10890: [0.26167, 0.75726, 0, 0],
                  10891: [0.48256, 0.98256, 0, 0],
                  10892: [0.48256, 0.98256, 0, 0],
                  10901: [0.13667, 0.63667, 0, 0],
                  10902: [0.13667, 0.63667, 0, 0],
                  10933: [0.25142, 0.75726, 0, 0],
                  10934: [0.25142, 0.75726, 0, 0],
                  10935: [0.26167, 0.75726, 0, 0],
                  10936: [0.26167, 0.75726, 0, 0],
                  10937: [0.26167, 0.75726, 0, 0],
                  10938: [0.26167, 0.75726, 0, 0],
                  10949: [0.25583, 0.75583, 0, 0],
                  10950: [0.25583, 0.75583, 0, 0],
                  10955: [0.28481, 0.79383, 0, 0],
                  10956: [0.28481, 0.79383, 0, 0],
                  57350: [0.08167, 0.58167, 0, 0],
                  57351: [0.08167, 0.58167, 0, 0],
                  57352: [0.08167, 0.58167, 0, 0],
                  57353: [0, 0.43056, 0.04028, 0],
                  57356: [0.25142, 0.75726, 0, 0],
                  57357: [0.25142, 0.75726, 0, 0],
                  57358: [0.41951, 0.91951, 0, 0],
                  57359: [0.30274, 0.79383, 0, 0],
                  57360: [0.30274, 0.79383, 0, 0],
                  57361: [0.41951, 0.91951, 0, 0],
                  57366: [0.25142, 0.75726, 0, 0],
                  57367: [0.25142, 0.75726, 0, 0],
                  57368: [0.25142, 0.75726, 0, 0],
                  57369: [0.25142, 0.75726, 0, 0],
                  57370: [0.13597, 0.63597, 0, 0],
                  57371: [0.13597, 0.63597, 0, 0],
                },
                "Caligraphic-Regular": {
                  48: [0, 0.43056, 0, 0],
                  49: [0, 0.43056, 0, 0],
                  50: [0, 0.43056, 0, 0],
                  51: [0.19444, 0.43056, 0, 0],
                  52: [0.19444, 0.43056, 0, 0],
                  53: [0.19444, 0.43056, 0, 0],
                  54: [0, 0.64444, 0, 0],
                  55: [0.19444, 0.43056, 0, 0],
                  56: [0, 0.64444, 0, 0],
                  57: [0.19444, 0.43056, 0, 0],
                  65: [0, 0.68333, 0, 0.19445],
                  66: [0, 0.68333, 0.03041, 0.13889],
                  67: [0, 0.68333, 0.05834, 0.13889],
                  68: [0, 0.68333, 0.02778, 0.08334],
                  69: [0, 0.68333, 0.08944, 0.11111],
                  70: [0, 0.68333, 0.09931, 0.11111],
                  71: [0.09722, 0.68333, 0.0593, 0.11111],
                  72: [0, 0.68333, 0.00965, 0.11111],
                  73: [0, 0.68333, 0.07382, 0],
                  74: [0.09722, 0.68333, 0.18472, 0.16667],
                  75: [0, 0.68333, 0.01445, 0.05556],
                  76: [0, 0.68333, 0, 0.13889],
                  77: [0, 0.68333, 0, 0.13889],
                  78: [0, 0.68333, 0.14736, 0.08334],
                  79: [0, 0.68333, 0.02778, 0.11111],
                  80: [0, 0.68333, 0.08222, 0.08334],
                  81: [0.09722, 0.68333, 0, 0.11111],
                  82: [0, 0.68333, 0, 0.08334],
                  83: [0, 0.68333, 0.075, 0.13889],
                  84: [0, 0.68333, 0.25417, 0],
                  85: [0, 0.68333, 0.09931, 0.08334],
                  86: [0, 0.68333, 0.08222, 0],
                  87: [0, 0.68333, 0.08222, 0.08334],
                  88: [0, 0.68333, 0.14643, 0.13889],
                  89: [0.09722, 0.68333, 0.08222, 0.08334],
                  90: [0, 0.68333, 0.07944, 0.13889],
                },
                "Fraktur-Regular": {
                  33: [0, 0.69141, 0, 0],
                  34: [0, 0.69141, 0, 0],
                  38: [0, 0.69141, 0, 0],
                  39: [0, 0.69141, 0, 0],
                  40: [0.24982, 0.74947, 0, 0],
                  41: [0.24982, 0.74947, 0, 0],
                  42: [0, 0.62119, 0, 0],
                  43: [0.08319, 0.58283, 0, 0],
                  44: [0, 0.10803, 0, 0],
                  45: [0.08319, 0.58283, 0, 0],
                  46: [0, 0.10803, 0, 0],
                  47: [0.24982, 0.74947, 0, 0],
                  48: [0, 0.47534, 0, 0],
                  49: [0, 0.47534, 0, 0],
                  50: [0, 0.47534, 0, 0],
                  51: [0.18906, 0.47534, 0, 0],
                  52: [0.18906, 0.47534, 0, 0],
                  53: [0.18906, 0.47534, 0, 0],
                  54: [0, 0.69141, 0, 0],
                  55: [0.18906, 0.47534, 0, 0],
                  56: [0, 0.69141, 0, 0],
                  57: [0.18906, 0.47534, 0, 0],
                  58: [0, 0.47534, 0, 0],
                  59: [0.12604, 0.47534, 0, 0],
                  61: [-0.13099, 0.36866, 0, 0],
                  63: [0, 0.69141, 0, 0],
                  65: [0, 0.69141, 0, 0],
                  66: [0, 0.69141, 0, 0],
                  67: [0, 0.69141, 0, 0],
                  68: [0, 0.69141, 0, 0],
                  69: [0, 0.69141, 0, 0],
                  70: [0.12604, 0.69141, 0, 0],
                  71: [0, 0.69141, 0, 0],
                  72: [0.06302, 0.69141, 0, 0],
                  73: [0, 0.69141, 0, 0],
                  74: [0.12604, 0.69141, 0, 0],
                  75: [0, 0.69141, 0, 0],
                  76: [0, 0.69141, 0, 0],
                  77: [0, 0.69141, 0, 0],
                  78: [0, 0.69141, 0, 0],
                  79: [0, 0.69141, 0, 0],
                  80: [0.18906, 0.69141, 0, 0],
                  81: [0.03781, 0.69141, 0, 0],
                  82: [0, 0.69141, 0, 0],
                  83: [0, 0.69141, 0, 0],
                  84: [0, 0.69141, 0, 0],
                  85: [0, 0.69141, 0, 0],
                  86: [0, 0.69141, 0, 0],
                  87: [0, 0.69141, 0, 0],
                  88: [0, 0.69141, 0, 0],
                  89: [0.18906, 0.69141, 0, 0],
                  90: [0.12604, 0.69141, 0, 0],
                  91: [0.24982, 0.74947, 0, 0],
                  93: [0.24982, 0.74947, 0, 0],
                  94: [0, 0.69141, 0, 0],
                  97: [0, 0.47534, 0, 0],
                  98: [0, 0.69141, 0, 0],
                  99: [0, 0.47534, 0, 0],
                  100: [0, 0.62119, 0, 0],
                  101: [0, 0.47534, 0, 0],
                  102: [0.18906, 0.69141, 0, 0],
                  103: [0.18906, 0.47534, 0, 0],
                  104: [0.18906, 0.69141, 0, 0],
                  105: [0, 0.69141, 0, 0],
                  106: [0, 0.69141, 0, 0],
                  107: [0, 0.69141, 0, 0],
                  108: [0, 0.69141, 0, 0],
                  109: [0, 0.47534, 0, 0],
                  110: [0, 0.47534, 0, 0],
                  111: [0, 0.47534, 0, 0],
                  112: [0.18906, 0.52396, 0, 0],
                  113: [0.18906, 0.47534, 0, 0],
                  114: [0, 0.47534, 0, 0],
                  115: [0, 0.47534, 0, 0],
                  116: [0, 0.62119, 0, 0],
                  117: [0, 0.47534, 0, 0],
                  118: [0, 0.52396, 0, 0],
                  119: [0, 0.52396, 0, 0],
                  120: [0.18906, 0.47534, 0, 0],
                  121: [0.18906, 0.47534, 0, 0],
                  122: [0.18906, 0.47534, 0, 0],
                  8216: [0, 0.69141, 0, 0],
                  8217: [0, 0.69141, 0, 0],
                  58112: [0, 0.62119, 0, 0],
                  58113: [0, 0.62119, 0, 0],
                  58114: [0.18906, 0.69141, 0, 0],
                  58115: [0.18906, 0.69141, 0, 0],
                  58116: [0.18906, 0.47534, 0, 0],
                  58117: [0, 0.69141, 0, 0],
                  58118: [0, 0.62119, 0, 0],
                  58119: [0, 0.47534, 0, 0],
                },
                "Main-Bold": {
                  33: [0, 0.69444, 0, 0],
                  34: [0, 0.69444, 0, 0],
                  35: [0.19444, 0.69444, 0, 0],
                  36: [0.05556, 0.75, 0, 0],
                  37: [0.05556, 0.75, 0, 0],
                  38: [0, 0.69444, 0, 0],
                  39: [0, 0.69444, 0, 0],
                  40: [0.25, 0.75, 0, 0],
                  41: [0.25, 0.75, 0, 0],
                  42: [0, 0.75, 0, 0],
                  43: [0.13333, 0.63333, 0, 0],
                  44: [0.19444, 0.15556, 0, 0],
                  45: [0, 0.44444, 0, 0],
                  46: [0, 0.15556, 0, 0],
                  47: [0.25, 0.75, 0, 0],
                  48: [0, 0.64444, 0, 0],
                  49: [0, 0.64444, 0, 0],
                  50: [0, 0.64444, 0, 0],
                  51: [0, 0.64444, 0, 0],
                  52: [0, 0.64444, 0, 0],
                  53: [0, 0.64444, 0, 0],
                  54: [0, 0.64444, 0, 0],
                  55: [0, 0.64444, 0, 0],
                  56: [0, 0.64444, 0, 0],
                  57: [0, 0.64444, 0, 0],
                  58: [0, 0.44444, 0, 0],
                  59: [0.19444, 0.44444, 0, 0],
                  60: [0.08556, 0.58556, 0, 0],
                  61: [-0.10889, 0.39111, 0, 0],
                  62: [0.08556, 0.58556, 0, 0],
                  63: [0, 0.69444, 0, 0],
                  64: [0, 0.69444, 0, 0],
                  65: [0, 0.68611, 0, 0],
                  66: [0, 0.68611, 0, 0],
                  67: [0, 0.68611, 0, 0],
                  68: [0, 0.68611, 0, 0],
                  69: [0, 0.68611, 0, 0],
                  70: [0, 0.68611, 0, 0],
                  71: [0, 0.68611, 0, 0],
                  72: [0, 0.68611, 0, 0],
                  73: [0, 0.68611, 0, 0],
                  74: [0, 0.68611, 0, 0],
                  75: [0, 0.68611, 0, 0],
                  76: [0, 0.68611, 0, 0],
                  77: [0, 0.68611, 0, 0],
                  78: [0, 0.68611, 0, 0],
                  79: [0, 0.68611, 0, 0],
                  80: [0, 0.68611, 0, 0],
                  81: [0.19444, 0.68611, 0, 0],
                  82: [0, 0.68611, 0, 0],
                  83: [0, 0.68611, 0, 0],
                  84: [0, 0.68611, 0, 0],
                  85: [0, 0.68611, 0, 0],
                  86: [0, 0.68611, 0.01597, 0],
                  87: [0, 0.68611, 0.01597, 0],
                  88: [0, 0.68611, 0, 0],
                  89: [0, 0.68611, 0.02875, 0],
                  90: [0, 0.68611, 0, 0],
                  91: [0.25, 0.75, 0, 0],
                  92: [0.25, 0.75, 0, 0],
                  93: [0.25, 0.75, 0, 0],
                  94: [0, 0.69444, 0, 0],
                  95: [0.31, 0.13444, 0.03194, 0],
                  96: [0, 0.69444, 0, 0],
                  97: [0, 0.44444, 0, 0],
                  98: [0, 0.69444, 0, 0],
                  99: [0, 0.44444, 0, 0],
                  100: [0, 0.69444, 0, 0],
                  101: [0, 0.44444, 0, 0],
                  102: [0, 0.69444, 0.10903, 0],
                  103: [0.19444, 0.44444, 0.01597, 0],
                  104: [0, 0.69444, 0, 0],
                  105: [0, 0.69444, 0, 0],
                  106: [0.19444, 0.69444, 0, 0],
                  107: [0, 0.69444, 0, 0],
                  108: [0, 0.69444, 0, 0],
                  109: [0, 0.44444, 0, 0],
                  110: [0, 0.44444, 0, 0],
                  111: [0, 0.44444, 0, 0],
                  112: [0.19444, 0.44444, 0, 0],
                  113: [0.19444, 0.44444, 0, 0],
                  114: [0, 0.44444, 0, 0],
                  115: [0, 0.44444, 0, 0],
                  116: [0, 0.63492, 0, 0],
                  117: [0, 0.44444, 0, 0],
                  118: [0, 0.44444, 0.01597, 0],
                  119: [0, 0.44444, 0.01597, 0],
                  120: [0, 0.44444, 0, 0],
                  121: [0.19444, 0.44444, 0.01597, 0],
                  122: [0, 0.44444, 0, 0],
                  123: [0.25, 0.75, 0, 0],
                  124: [0.25, 0.75, 0, 0],
                  125: [0.25, 0.75, 0, 0],
                  126: [0.35, 0.34444, 0, 0],
                  168: [0, 0.69444, 0, 0],
                  172: [0, 0.44444, 0, 0],
                  175: [0, 0.59611, 0, 0],
                  176: [0, 0.69444, 0, 0],
                  177: [0.13333, 0.63333, 0, 0],
                  180: [0, 0.69444, 0, 0],
                  215: [0.13333, 0.63333, 0, 0],
                  247: [0.13333, 0.63333, 0, 0],
                  305: [0, 0.44444, 0, 0],
                  567: [0.19444, 0.44444, 0, 0],
                  710: [0, 0.69444, 0, 0],
                  711: [0, 0.63194, 0, 0],
                  713: [0, 0.59611, 0, 0],
                  714: [0, 0.69444, 0, 0],
                  715: [0, 0.69444, 0, 0],
                  728: [0, 0.69444, 0, 0],
                  729: [0, 0.69444, 0, 0],
                  730: [0, 0.69444, 0, 0],
                  732: [0, 0.69444, 0, 0],
                  768: [0, 0.69444, 0, 0],
                  769: [0, 0.69444, 0, 0],
                  770: [0, 0.69444, 0, 0],
                  771: [0, 0.69444, 0, 0],
                  772: [0, 0.59611, 0, 0],
                  774: [0, 0.69444, 0, 0],
                  775: [0, 0.69444, 0, 0],
                  776: [0, 0.69444, 0, 0],
                  778: [0, 0.69444, 0, 0],
                  779: [0, 0.69444, 0, 0],
                  780: [0, 0.63194, 0, 0],
                  824: [0.19444, 0.69444, 0, 0],
                  915: [0, 0.68611, 0, 0],
                  916: [0, 0.68611, 0, 0],
                  920: [0, 0.68611, 0, 0],
                  923: [0, 0.68611, 0, 0],
                  926: [0, 0.68611, 0, 0],
                  928: [0, 0.68611, 0, 0],
                  931: [0, 0.68611, 0, 0],
                  933: [0, 0.68611, 0, 0],
                  934: [0, 0.68611, 0, 0],
                  936: [0, 0.68611, 0, 0],
                  937: [0, 0.68611, 0, 0],
                  8211: [0, 0.44444, 0.03194, 0],
                  8212: [0, 0.44444, 0.03194, 0],
                  8216: [0, 0.69444, 0, 0],
                  8217: [0, 0.69444, 0, 0],
                  8220: [0, 0.69444, 0, 0],
                  8221: [0, 0.69444, 0, 0],
                  8224: [0.19444, 0.69444, 0, 0],
                  8225: [0.19444, 0.69444, 0, 0],
                  8242: [0, 0.55556, 0, 0],
                  8407: [0, 0.72444, 0.15486, 0],
                  8463: [0, 0.69444, 0, 0],
                  8465: [0, 0.69444, 0, 0],
                  8467: [0, 0.69444, 0, 0],
                  8472: [0.19444, 0.44444, 0, 0],
                  8476: [0, 0.69444, 0, 0],
                  8501: [0, 0.69444, 0, 0],
                  8592: [-0.10889, 0.39111, 0, 0],
                  8593: [0.19444, 0.69444, 0, 0],
                  8594: [-0.10889, 0.39111, 0, 0],
                  8595: [0.19444, 0.69444, 0, 0],
                  8596: [-0.10889, 0.39111, 0, 0],
                  8597: [0.25, 0.75, 0, 0],
                  8598: [0.19444, 0.69444, 0, 0],
                  8599: [0.19444, 0.69444, 0, 0],
                  8600: [0.19444, 0.69444, 0, 0],
                  8601: [0.19444, 0.69444, 0, 0],
                  8636: [-0.10889, 0.39111, 0, 0],
                  8637: [-0.10889, 0.39111, 0, 0],
                  8640: [-0.10889, 0.39111, 0, 0],
                  8641: [-0.10889, 0.39111, 0, 0],
                  8656: [-0.10889, 0.39111, 0, 0],
                  8657: [0.19444, 0.69444, 0, 0],
                  8658: [-0.10889, 0.39111, 0, 0],
                  8659: [0.19444, 0.69444, 0, 0],
                  8660: [-0.10889, 0.39111, 0, 0],
                  8661: [0.25, 0.75, 0, 0],
                  8704: [0, 0.69444, 0, 0],
                  8706: [0, 0.69444, 0.06389, 0],
                  8707: [0, 0.69444, 0, 0],
                  8709: [0.05556, 0.75, 0, 0],
                  8711: [0, 0.68611, 0, 0],
                  8712: [0.08556, 0.58556, 0, 0],
                  8715: [0.08556, 0.58556, 0, 0],
                  8722: [0.13333, 0.63333, 0, 0],
                  8723: [0.13333, 0.63333, 0, 0],
                  8725: [0.25, 0.75, 0, 0],
                  8726: [0.25, 0.75, 0, 0],
                  8727: [-0.02778, 0.47222, 0, 0],
                  8728: [-0.02639, 0.47361, 0, 0],
                  8729: [-0.02639, 0.47361, 0, 0],
                  8730: [0.18, 0.82, 0, 0],
                  8733: [0, 0.44444, 0, 0],
                  8734: [0, 0.44444, 0, 0],
                  8736: [0, 0.69224, 0, 0],
                  8739: [0.25, 0.75, 0, 0],
                  8741: [0.25, 0.75, 0, 0],
                  8743: [0, 0.55556, 0, 0],
                  8744: [0, 0.55556, 0, 0],
                  8745: [0, 0.55556, 0, 0],
                  8746: [0, 0.55556, 0, 0],
                  8747: [0.19444, 0.69444, 0.12778, 0],
                  8764: [-0.10889, 0.39111, 0, 0],
                  8768: [0.19444, 0.69444, 0, 0],
                  8771: [0.00222, 0.50222, 0, 0],
                  8776: [0.02444, 0.52444, 0, 0],
                  8781: [0.00222, 0.50222, 0, 0],
                  8801: [0.00222, 0.50222, 0, 0],
                  8804: [0.19667, 0.69667, 0, 0],
                  8805: [0.19667, 0.69667, 0, 0],
                  8810: [0.08556, 0.58556, 0, 0],
                  8811: [0.08556, 0.58556, 0, 0],
                  8826: [0.08556, 0.58556, 0, 0],
                  8827: [0.08556, 0.58556, 0, 0],
                  8834: [0.08556, 0.58556, 0, 0],
                  8835: [0.08556, 0.58556, 0, 0],
                  8838: [0.19667, 0.69667, 0, 0],
                  8839: [0.19667, 0.69667, 0, 0],
                  8846: [0, 0.55556, 0, 0],
                  8849: [0.19667, 0.69667, 0, 0],
                  8850: [0.19667, 0.69667, 0, 0],
                  8851: [0, 0.55556, 0, 0],
                  8852: [0, 0.55556, 0, 0],
                  8853: [0.13333, 0.63333, 0, 0],
                  8854: [0.13333, 0.63333, 0, 0],
                  8855: [0.13333, 0.63333, 0, 0],
                  8856: [0.13333, 0.63333, 0, 0],
                  8857: [0.13333, 0.63333, 0, 0],
                  8866: [0, 0.69444, 0, 0],
                  8867: [0, 0.69444, 0, 0],
                  8868: [0, 0.69444, 0, 0],
                  8869: [0, 0.69444, 0, 0],
                  8900: [-0.02639, 0.47361, 0, 0],
                  8901: [-0.02639, 0.47361, 0, 0],
                  8902: [-0.02778, 0.47222, 0, 0],
                  8968: [0.25, 0.75, 0, 0],
                  8969: [0.25, 0.75, 0, 0],
                  8970: [0.25, 0.75, 0, 0],
                  8971: [0.25, 0.75, 0, 0],
                  8994: [-0.13889, 0.36111, 0, 0],
                  8995: [-0.13889, 0.36111, 0, 0],
                  9651: [0.19444, 0.69444, 0, 0],
                  9657: [-0.02778, 0.47222, 0, 0],
                  9661: [0.19444, 0.69444, 0, 0],
                  9667: [-0.02778, 0.47222, 0, 0],
                  9711: [0.19444, 0.69444, 0, 0],
                  9824: [0.12963, 0.69444, 0, 0],
                  9825: [0.12963, 0.69444, 0, 0],
                  9826: [0.12963, 0.69444, 0, 0],
                  9827: [0.12963, 0.69444, 0, 0],
                  9837: [0, 0.75, 0, 0],
                  9838: [0.19444, 0.69444, 0, 0],
                  9839: [0.19444, 0.69444, 0, 0],
                  10216: [0.25, 0.75, 0, 0],
                  10217: [0.25, 0.75, 0, 0],
                  10815: [0, 0.68611, 0, 0],
                  10927: [0.19667, 0.69667, 0, 0],
                  10928: [0.19667, 0.69667, 0, 0],
                },
                "Main-Italic": {
                  33: [0, 0.69444, 0.12417, 0],
                  34: [0, 0.69444, 0.06961, 0],
                  35: [0.19444, 0.69444, 0.06616, 0],
                  37: [0.05556, 0.75, 0.13639, 0],
                  38: [0, 0.69444, 0.09694, 0],
                  39: [0, 0.69444, 0.12417, 0],
                  40: [0.25, 0.75, 0.16194, 0],
                  41: [0.25, 0.75, 0.03694, 0],
                  42: [0, 0.75, 0.14917, 0],
                  43: [0.05667, 0.56167, 0.03694, 0],
                  44: [0.19444, 0.10556, 0, 0],
                  45: [0, 0.43056, 0.02826, 0],
                  46: [0, 0.10556, 0, 0],
                  47: [0.25, 0.75, 0.16194, 0],
                  48: [0, 0.64444, 0.13556, 0],
                  49: [0, 0.64444, 0.13556, 0],
                  50: [0, 0.64444, 0.13556, 0],
                  51: [0, 0.64444, 0.13556, 0],
                  52: [0.19444, 0.64444, 0.13556, 0],
                  53: [0, 0.64444, 0.13556, 0],
                  54: [0, 0.64444, 0.13556, 0],
                  55: [0.19444, 0.64444, 0.13556, 0],
                  56: [0, 0.64444, 0.13556, 0],
                  57: [0, 0.64444, 0.13556, 0],
                  58: [0, 0.43056, 0.0582, 0],
                  59: [0.19444, 0.43056, 0.0582, 0],
                  61: [-0.13313, 0.36687, 0.06616, 0],
                  63: [0, 0.69444, 0.1225, 0],
                  64: [0, 0.69444, 0.09597, 0],
                  65: [0, 0.68333, 0, 0],
                  66: [0, 0.68333, 0.10257, 0],
                  67: [0, 0.68333, 0.14528, 0],
                  68: [0, 0.68333, 0.09403, 0],
                  69: [0, 0.68333, 0.12028, 0],
                  70: [0, 0.68333, 0.13305, 0],
                  71: [0, 0.68333, 0.08722, 0],
                  72: [0, 0.68333, 0.16389, 0],
                  73: [0, 0.68333, 0.15806, 0],
                  74: [0, 0.68333, 0.14028, 0],
                  75: [0, 0.68333, 0.14528, 0],
                  76: [0, 0.68333, 0, 0],
                  77: [0, 0.68333, 0.16389, 0],
                  78: [0, 0.68333, 0.16389, 0],
                  79: [0, 0.68333, 0.09403, 0],
                  80: [0, 0.68333, 0.10257, 0],
                  81: [0.19444, 0.68333, 0.09403, 0],
                  82: [0, 0.68333, 0.03868, 0],
                  83: [0, 0.68333, 0.11972, 0],
                  84: [0, 0.68333, 0.13305, 0],
                  85: [0, 0.68333, 0.16389, 0],
                  86: [0, 0.68333, 0.18361, 0],
                  87: [0, 0.68333, 0.18361, 0],
                  88: [0, 0.68333, 0.15806, 0],
                  89: [0, 0.68333, 0.19383, 0],
                  90: [0, 0.68333, 0.14528, 0],
                  91: [0.25, 0.75, 0.1875, 0],
                  93: [0.25, 0.75, 0.10528, 0],
                  94: [0, 0.69444, 0.06646, 0],
                  95: [0.31, 0.12056, 0.09208, 0],
                  97: [0, 0.43056, 0.07671, 0],
                  98: [0, 0.69444, 0.06312, 0],
                  99: [0, 0.43056, 0.05653, 0],
                  100: [0, 0.69444, 0.10333, 0],
                  101: [0, 0.43056, 0.07514, 0],
                  102: [0.19444, 0.69444, 0.21194, 0],
                  103: [0.19444, 0.43056, 0.08847, 0],
                  104: [0, 0.69444, 0.07671, 0],
                  105: [0, 0.65536, 0.1019, 0],
                  106: [0.19444, 0.65536, 0.14467, 0],
                  107: [0, 0.69444, 0.10764, 0],
                  108: [0, 0.69444, 0.10333, 0],
                  109: [0, 0.43056, 0.07671, 0],
                  110: [0, 0.43056, 0.07671, 0],
                  111: [0, 0.43056, 0.06312, 0],
                  112: [0.19444, 0.43056, 0.06312, 0],
                  113: [0.19444, 0.43056, 0.08847, 0],
                  114: [0, 0.43056, 0.10764, 0],
                  115: [0, 0.43056, 0.08208, 0],
                  116: [0, 0.61508, 0.09486, 0],
                  117: [0, 0.43056, 0.07671, 0],
                  118: [0, 0.43056, 0.10764, 0],
                  119: [0, 0.43056, 0.10764, 0],
                  120: [0, 0.43056, 0.12042, 0],
                  121: [0.19444, 0.43056, 0.08847, 0],
                  122: [0, 0.43056, 0.12292, 0],
                  126: [0.35, 0.31786, 0.11585, 0],
                  163: [0, 0.69444, 0, 0],
                  305: [0, 0.43056, 0, 0.02778],
                  567: [0.19444, 0.43056, 0, 0.08334],
                  768: [0, 0.69444, 0, 0],
                  769: [0, 0.69444, 0.09694, 0],
                  770: [0, 0.69444, 0.06646, 0],
                  771: [0, 0.66786, 0.11585, 0],
                  772: [0, 0.56167, 0.10333, 0],
                  774: [0, 0.69444, 0.10806, 0],
                  775: [0, 0.66786, 0.11752, 0],
                  776: [0, 0.66786, 0.10474, 0],
                  778: [0, 0.69444, 0, 0],
                  779: [0, 0.69444, 0.1225, 0],
                  780: [0, 0.62847, 0.08295, 0],
                  915: [0, 0.68333, 0.13305, 0],
                  916: [0, 0.68333, 0, 0],
                  920: [0, 0.68333, 0.09403, 0],
                  923: [0, 0.68333, 0, 0],
                  926: [0, 0.68333, 0.15294, 0],
                  928: [0, 0.68333, 0.16389, 0],
                  931: [0, 0.68333, 0.12028, 0],
                  933: [0, 0.68333, 0.11111, 0],
                  934: [0, 0.68333, 0.05986, 0],
                  936: [0, 0.68333, 0.11111, 0],
                  937: [0, 0.68333, 0.10257, 0],
                  8211: [0, 0.43056, 0.09208, 0],
                  8212: [0, 0.43056, 0.09208, 0],
                  8216: [0, 0.69444, 0.12417, 0],
                  8217: [0, 0.69444, 0.12417, 0],
                  8220: [0, 0.69444, 0.1685, 0],
                  8221: [0, 0.69444, 0.06961, 0],
                  8463: [0, 0.68889, 0, 0],
                },
                "Main-Regular": {
                  32: [0, 0, 0, 0],
                  33: [0, 0.69444, 0, 0],
                  34: [0, 0.69444, 0, 0],
                  35: [0.19444, 0.69444, 0, 0],
                  36: [0.05556, 0.75, 0, 0],
                  37: [0.05556, 0.75, 0, 0],
                  38: [0, 0.69444, 0, 0],
                  39: [0, 0.69444, 0, 0],
                  40: [0.25, 0.75, 0, 0],
                  41: [0.25, 0.75, 0, 0],
                  42: [0, 0.75, 0, 0],
                  43: [0.08333, 0.58333, 0, 0],
                  44: [0.19444, 0.10556, 0, 0],
                  45: [0, 0.43056, 0, 0],
                  46: [0, 0.10556, 0, 0],
                  47: [0.25, 0.75, 0, 0],
                  48: [0, 0.64444, 0, 0],
                  49: [0, 0.64444, 0, 0],
                  50: [0, 0.64444, 0, 0],
                  51: [0, 0.64444, 0, 0],
                  52: [0, 0.64444, 0, 0],
                  53: [0, 0.64444, 0, 0],
                  54: [0, 0.64444, 0, 0],
                  55: [0, 0.64444, 0, 0],
                  56: [0, 0.64444, 0, 0],
                  57: [0, 0.64444, 0, 0],
                  58: [0, 0.43056, 0, 0],
                  59: [0.19444, 0.43056, 0, 0],
                  60: [0.0391, 0.5391, 0, 0],
                  61: [-0.13313, 0.36687, 0, 0],
                  62: [0.0391, 0.5391, 0, 0],
                  63: [0, 0.69444, 0, 0],
                  64: [0, 0.69444, 0, 0],
                  65: [0, 0.68333, 0, 0],
                  66: [0, 0.68333, 0, 0],
                  67: [0, 0.68333, 0, 0],
                  68: [0, 0.68333, 0, 0],
                  69: [0, 0.68333, 0, 0],
                  70: [0, 0.68333, 0, 0],
                  71: [0, 0.68333, 0, 0],
                  72: [0, 0.68333, 0, 0],
                  73: [0, 0.68333, 0, 0],
                  74: [0, 0.68333, 0, 0],
                  75: [0, 0.68333, 0, 0],
                  76: [0, 0.68333, 0, 0],
                  77: [0, 0.68333, 0, 0],
                  78: [0, 0.68333, 0, 0],
                  79: [0, 0.68333, 0, 0],
                  80: [0, 0.68333, 0, 0],
                  81: [0.19444, 0.68333, 0, 0],
                  82: [0, 0.68333, 0, 0],
                  83: [0, 0.68333, 0, 0],
                  84: [0, 0.68333, 0, 0],
                  85: [0, 0.68333, 0, 0],
                  86: [0, 0.68333, 0.01389, 0],
                  87: [0, 0.68333, 0.01389, 0],
                  88: [0, 0.68333, 0, 0],
                  89: [0, 0.68333, 0.025, 0],
                  90: [0, 0.68333, 0, 0],
                  91: [0.25, 0.75, 0, 0],
                  92: [0.25, 0.75, 0, 0],
                  93: [0.25, 0.75, 0, 0],
                  94: [0, 0.69444, 0, 0],
                  95: [0.31, 0.12056, 0.02778, 0],
                  96: [0, 0.69444, 0, 0],
                  97: [0, 0.43056, 0, 0],
                  98: [0, 0.69444, 0, 0],
                  99: [0, 0.43056, 0, 0],
                  100: [0, 0.69444, 0, 0],
                  101: [0, 0.43056, 0, 0],
                  102: [0, 0.69444, 0.07778, 0],
                  103: [0.19444, 0.43056, 0.01389, 0],
                  104: [0, 0.69444, 0, 0],
                  105: [0, 0.66786, 0, 0],
                  106: [0.19444, 0.66786, 0, 0],
                  107: [0, 0.69444, 0, 0],
                  108: [0, 0.69444, 0, 0],
                  109: [0, 0.43056, 0, 0],
                  110: [0, 0.43056, 0, 0],
                  111: [0, 0.43056, 0, 0],
                  112: [0.19444, 0.43056, 0, 0],
                  113: [0.19444, 0.43056, 0, 0],
                  114: [0, 0.43056, 0, 0],
                  115: [0, 0.43056, 0, 0],
                  116: [0, 0.61508, 0, 0],
                  117: [0, 0.43056, 0, 0],
                  118: [0, 0.43056, 0.01389, 0],
                  119: [0, 0.43056, 0.01389, 0],
                  120: [0, 0.43056, 0, 0],
                  121: [0.19444, 0.43056, 0.01389, 0],
                  122: [0, 0.43056, 0, 0],
                  123: [0.25, 0.75, 0, 0],
                  124: [0.25, 0.75, 0, 0],
                  125: [0.25, 0.75, 0, 0],
                  126: [0.35, 0.31786, 0, 0],
                  160: [0, 0, 0, 0],
                  168: [0, 0.66786, 0, 0],
                  172: [0, 0.43056, 0, 0],
                  175: [0, 0.56778, 0, 0],
                  176: [0, 0.69444, 0, 0],
                  177: [0.08333, 0.58333, 0, 0],
                  180: [0, 0.69444, 0, 0],
                  215: [0.08333, 0.58333, 0, 0],
                  247: [0.08333, 0.58333, 0, 0],
                  305: [0, 0.43056, 0, 0],
                  567: [0.19444, 0.43056, 0, 0],
                  710: [0, 0.69444, 0, 0],
                  711: [0, 0.62847, 0, 0],
                  713: [0, 0.56778, 0, 0],
                  714: [0, 0.69444, 0, 0],
                  715: [0, 0.69444, 0, 0],
                  728: [0, 0.69444, 0, 0],
                  729: [0, 0.66786, 0, 0],
                  730: [0, 0.69444, 0, 0],
                  732: [0, 0.66786, 0, 0],
                  768: [0, 0.69444, 0, 0],
                  769: [0, 0.69444, 0, 0],
                  770: [0, 0.69444, 0, 0],
                  771: [0, 0.66786, 0, 0],
                  772: [0, 0.56778, 0, 0],
                  774: [0, 0.69444, 0, 0],
                  775: [0, 0.66786, 0, 0],
                  776: [0, 0.66786, 0, 0],
                  778: [0, 0.69444, 0, 0],
                  779: [0, 0.69444, 0, 0],
                  780: [0, 0.62847, 0, 0],
                  824: [0.19444, 0.69444, 0, 0],
                  915: [0, 0.68333, 0, 0],
                  916: [0, 0.68333, 0, 0],
                  920: [0, 0.68333, 0, 0],
                  923: [0, 0.68333, 0, 0],
                  926: [0, 0.68333, 0, 0],
                  928: [0, 0.68333, 0, 0],
                  931: [0, 0.68333, 0, 0],
                  933: [0, 0.68333, 0, 0],
                  934: [0, 0.68333, 0, 0],
                  936: [0, 0.68333, 0, 0],
                  937: [0, 0.68333, 0, 0],
                  8211: [0, 0.43056, 0.02778, 0],
                  8212: [0, 0.43056, 0.02778, 0],
                  8216: [0, 0.69444, 0, 0],
                  8217: [0, 0.69444, 0, 0],
                  8220: [0, 0.69444, 0, 0],
                  8221: [0, 0.69444, 0, 0],
                  8224: [0.19444, 0.69444, 0, 0],
                  8225: [0.19444, 0.69444, 0, 0],
                  8230: [0, 0.12, 0, 0],
                  8242: [0, 0.55556, 0, 0],
                  8407: [0, 0.71444, 0.15382, 0],
                  8463: [0, 0.68889, 0, 0],
                  8465: [0, 0.69444, 0, 0],
                  8467: [0, 0.69444, 0, 0.11111],
                  8472: [0.19444, 0.43056, 0, 0.11111],
                  8476: [0, 0.69444, 0, 0],
                  8501: [0, 0.69444, 0, 0],
                  8592: [-0.13313, 0.36687, 0, 0],
                  8593: [0.19444, 0.69444, 0, 0],
                  8594: [-0.13313, 0.36687, 0, 0],
                  8595: [0.19444, 0.69444, 0, 0],
                  8596: [-0.13313, 0.36687, 0, 0],
                  8597: [0.25, 0.75, 0, 0],
                  8598: [0.19444, 0.69444, 0, 0],
                  8599: [0.19444, 0.69444, 0, 0],
                  8600: [0.19444, 0.69444, 0, 0],
                  8601: [0.19444, 0.69444, 0, 0],
                  8614: [0.011, 0.511, 0, 0],
                  8617: [0.011, 0.511, 0, 0],
                  8618: [0.011, 0.511, 0, 0],
                  8636: [-0.13313, 0.36687, 0, 0],
                  8637: [-0.13313, 0.36687, 0, 0],
                  8640: [-0.13313, 0.36687, 0, 0],
                  8641: [-0.13313, 0.36687, 0, 0],
                  8652: [0.011, 0.671, 0, 0],
                  8656: [-0.13313, 0.36687, 0, 0],
                  8657: [0.19444, 0.69444, 0, 0],
                  8658: [-0.13313, 0.36687, 0, 0],
                  8659: [0.19444, 0.69444, 0, 0],
                  8660: [-0.13313, 0.36687, 0, 0],
                  8661: [0.25, 0.75, 0, 0],
                  8704: [0, 0.69444, 0, 0],
                  8706: [0, 0.69444, 0.05556, 0.08334],
                  8707: [0, 0.69444, 0, 0],
                  8709: [0.05556, 0.75, 0, 0],
                  8711: [0, 0.68333, 0, 0],
                  8712: [0.0391, 0.5391, 0, 0],
                  8715: [0.0391, 0.5391, 0, 0],
                  8722: [0.08333, 0.58333, 0, 0],
                  8723: [0.08333, 0.58333, 0, 0],
                  8725: [0.25, 0.75, 0, 0],
                  8726: [0.25, 0.75, 0, 0],
                  8727: [-0.03472, 0.46528, 0, 0],
                  8728: [-0.05555, 0.44445, 0, 0],
                  8729: [-0.05555, 0.44445, 0, 0],
                  8730: [0.2, 0.8, 0, 0],
                  8733: [0, 0.43056, 0, 0],
                  8734: [0, 0.43056, 0, 0],
                  8736: [0, 0.69224, 0, 0],
                  8739: [0.25, 0.75, 0, 0],
                  8741: [0.25, 0.75, 0, 0],
                  8743: [0, 0.55556, 0, 0],
                  8744: [0, 0.55556, 0, 0],
                  8745: [0, 0.55556, 0, 0],
                  8746: [0, 0.55556, 0, 0],
                  8747: [0.19444, 0.69444, 0.11111, 0],
                  8764: [-0.13313, 0.36687, 0, 0],
                  8768: [0.19444, 0.69444, 0, 0],
                  8771: [-0.03625, 0.46375, 0, 0],
                  8773: [-0.022, 0.589, 0, 0],
                  8776: [-0.01688, 0.48312, 0, 0],
                  8781: [-0.03625, 0.46375, 0, 0],
                  8784: [-0.133, 0.67, 0, 0],
                  8800: [0.215, 0.716, 0, 0],
                  8801: [-0.03625, 0.46375, 0, 0],
                  8804: [0.13597, 0.63597, 0, 0],
                  8805: [0.13597, 0.63597, 0, 0],
                  8810: [0.0391, 0.5391, 0, 0],
                  8811: [0.0391, 0.5391, 0, 0],
                  8826: [0.0391, 0.5391, 0, 0],
                  8827: [0.0391, 0.5391, 0, 0],
                  8834: [0.0391, 0.5391, 0, 0],
                  8835: [0.0391, 0.5391, 0, 0],
                  8838: [0.13597, 0.63597, 0, 0],
                  8839: [0.13597, 0.63597, 0, 0],
                  8846: [0, 0.55556, 0, 0],
                  8849: [0.13597, 0.63597, 0, 0],
                  8850: [0.13597, 0.63597, 0, 0],
                  8851: [0, 0.55556, 0, 0],
                  8852: [0, 0.55556, 0, 0],
                  8853: [0.08333, 0.58333, 0, 0],
                  8854: [0.08333, 0.58333, 0, 0],
                  8855: [0.08333, 0.58333, 0, 0],
                  8856: [0.08333, 0.58333, 0, 0],
                  8857: [0.08333, 0.58333, 0, 0],
                  8866: [0, 0.69444, 0, 0],
                  8867: [0, 0.69444, 0, 0],
                  8868: [0, 0.69444, 0, 0],
                  8869: [0, 0.69444, 0, 0],
                  8872: [0.249, 0.75, 0, 0],
                  8900: [-0.05555, 0.44445, 0, 0],
                  8901: [-0.05555, 0.44445, 0, 0],
                  8902: [-0.03472, 0.46528, 0, 0],
                  8904: [0.005, 0.505, 0, 0],
                  8942: [0.03, 0.9, 0, 0],
                  8943: [-0.19, 0.31, 0, 0],
                  8945: [-0.1, 0.82, 0, 0],
                  8968: [0.25, 0.75, 0, 0],
                  8969: [0.25, 0.75, 0, 0],
                  8970: [0.25, 0.75, 0, 0],
                  8971: [0.25, 0.75, 0, 0],
                  8994: [-0.14236, 0.35764, 0, 0],
                  8995: [-0.14236, 0.35764, 0, 0],
                  9136: [0.244, 0.744, 0, 0],
                  9137: [0.244, 0.744, 0, 0],
                  9651: [0.19444, 0.69444, 0, 0],
                  9657: [-0.03472, 0.46528, 0, 0],
                  9661: [0.19444, 0.69444, 0, 0],
                  9667: [-0.03472, 0.46528, 0, 0],
                  9711: [0.19444, 0.69444, 0, 0],
                  9824: [0.12963, 0.69444, 0, 0],
                  9825: [0.12963, 0.69444, 0, 0],
                  9826: [0.12963, 0.69444, 0, 0],
                  9827: [0.12963, 0.69444, 0, 0],
                  9837: [0, 0.75, 0, 0],
                  9838: [0.19444, 0.69444, 0, 0],
                  9839: [0.19444, 0.69444, 0, 0],
                  10216: [0.25, 0.75, 0, 0],
                  10217: [0.25, 0.75, 0, 0],
                  10222: [0.244, 0.744, 0, 0],
                  10223: [0.244, 0.744, 0, 0],
                  10229: [0.011, 0.511, 0, 0],
                  10230: [0.011, 0.511, 0, 0],
                  10231: [0.011, 0.511, 0, 0],
                  10232: [0.024, 0.525, 0, 0],
                  10233: [0.024, 0.525, 0, 0],
                  10234: [0.024, 0.525, 0, 0],
                  10236: [0.011, 0.511, 0, 0],
                  10815: [0, 0.68333, 0, 0],
                  10927: [0.13597, 0.63597, 0, 0],
                  10928: [0.13597, 0.63597, 0, 0],
                },
                "Math-BoldItalic": {
                  47: [0.19444, 0.69444, 0, 0],
                  65: [0, 0.68611, 0, 0],
                  66: [0, 0.68611, 0.04835, 0],
                  67: [0, 0.68611, 0.06979, 0],
                  68: [0, 0.68611, 0.03194, 0],
                  69: [0, 0.68611, 0.05451, 0],
                  70: [0, 0.68611, 0.15972, 0],
                  71: [0, 0.68611, 0, 0],
                  72: [0, 0.68611, 0.08229, 0],
                  73: [0, 0.68611, 0.07778, 0],
                  74: [0, 0.68611, 0.10069, 0],
                  75: [0, 0.68611, 0.06979, 0],
                  76: [0, 0.68611, 0, 0],
                  77: [0, 0.68611, 0.11424, 0],
                  78: [0, 0.68611, 0.11424, 0],
                  79: [0, 0.68611, 0.03194, 0],
                  80: [0, 0.68611, 0.15972, 0],
                  81: [0.19444, 0.68611, 0, 0],
                  82: [0, 0.68611, 0.00421, 0],
                  83: [0, 0.68611, 0.05382, 0],
                  84: [0, 0.68611, 0.15972, 0],
                  85: [0, 0.68611, 0.11424, 0],
                  86: [0, 0.68611, 0.25555, 0],
                  87: [0, 0.68611, 0.15972, 0],
                  88: [0, 0.68611, 0.07778, 0],
                  89: [0, 0.68611, 0.25555, 0],
                  90: [0, 0.68611, 0.06979, 0],
                  97: [0, 0.44444, 0, 0],
                  98: [0, 0.69444, 0, 0],
                  99: [0, 0.44444, 0, 0],
                  100: [0, 0.69444, 0, 0],
                  101: [0, 0.44444, 0, 0],
                  102: [0.19444, 0.69444, 0.11042, 0],
                  103: [0.19444, 0.44444, 0.03704, 0],
                  104: [0, 0.69444, 0, 0],
                  105: [0, 0.69326, 0, 0],
                  106: [0.19444, 0.69326, 0.0622, 0],
                  107: [0, 0.69444, 0.01852, 0],
                  108: [0, 0.69444, 0.0088, 0],
                  109: [0, 0.44444, 0, 0],
                  110: [0, 0.44444, 0, 0],
                  111: [0, 0.44444, 0, 0],
                  112: [0.19444, 0.44444, 0, 0],
                  113: [0.19444, 0.44444, 0.03704, 0],
                  114: [0, 0.44444, 0.03194, 0],
                  115: [0, 0.44444, 0, 0],
                  116: [0, 0.63492, 0, 0],
                  117: [0, 0.44444, 0, 0],
                  118: [0, 0.44444, 0.03704, 0],
                  119: [0, 0.44444, 0.02778, 0],
                  120: [0, 0.44444, 0, 0],
                  121: [0.19444, 0.44444, 0.03704, 0],
                  122: [0, 0.44444, 0.04213, 0],
                  915: [0, 0.68611, 0.15972, 0],
                  916: [0, 0.68611, 0, 0],
                  920: [0, 0.68611, 0.03194, 0],
                  923: [0, 0.68611, 0, 0],
                  926: [0, 0.68611, 0.07458, 0],
                  928: [0, 0.68611, 0.08229, 0],
                  931: [0, 0.68611, 0.05451, 0],
                  933: [0, 0.68611, 0.15972, 0],
                  934: [0, 0.68611, 0, 0],
                  936: [0, 0.68611, 0.11653, 0],
                  937: [0, 0.68611, 0.04835, 0],
                  945: [0, 0.44444, 0, 0],
                  946: [0.19444, 0.69444, 0.03403, 0],
                  947: [0.19444, 0.44444, 0.06389, 0],
                  948: [0, 0.69444, 0.03819, 0],
                  949: [0, 0.44444, 0, 0],
                  950: [0.19444, 0.69444, 0.06215, 0],
                  951: [0.19444, 0.44444, 0.03704, 0],
                  952: [0, 0.69444, 0.03194, 0],
                  953: [0, 0.44444, 0, 0],
                  954: [0, 0.44444, 0, 0],
                  955: [0, 0.69444, 0, 0],
                  956: [0.19444, 0.44444, 0, 0],
                  957: [0, 0.44444, 0.06898, 0],
                  958: [0.19444, 0.69444, 0.03021, 0],
                  959: [0, 0.44444, 0, 0],
                  960: [0, 0.44444, 0.03704, 0],
                  961: [0.19444, 0.44444, 0, 0],
                  962: [0.09722, 0.44444, 0.07917, 0],
                  963: [0, 0.44444, 0.03704, 0],
                  964: [0, 0.44444, 0.13472, 0],
                  965: [0, 0.44444, 0.03704, 0],
                  966: [0.19444, 0.44444, 0, 0],
                  967: [0.19444, 0.44444, 0, 0],
                  968: [0.19444, 0.69444, 0.03704, 0],
                  969: [0, 0.44444, 0.03704, 0],
                  977: [0, 0.69444, 0, 0],
                  981: [0.19444, 0.69444, 0, 0],
                  982: [0, 0.44444, 0.03194, 0],
                  1009: [0.19444, 0.44444, 0, 0],
                  1013: [0, 0.44444, 0, 0],
                },
                "Math-Italic": {
                  47: [0.19444, 0.69444, 0, 0],
                  65: [0, 0.68333, 0, 0.13889],
                  66: [0, 0.68333, 0.05017, 0.08334],
                  67: [0, 0.68333, 0.07153, 0.08334],
                  68: [0, 0.68333, 0.02778, 0.05556],
                  69: [0, 0.68333, 0.05764, 0.08334],
                  70: [0, 0.68333, 0.13889, 0.08334],
                  71: [0, 0.68333, 0, 0.08334],
                  72: [0, 0.68333, 0.08125, 0.05556],
                  73: [0, 0.68333, 0.07847, 0.11111],
                  74: [0, 0.68333, 0.09618, 0.16667],
                  75: [0, 0.68333, 0.07153, 0.05556],
                  76: [0, 0.68333, 0, 0.02778],
                  77: [0, 0.68333, 0.10903, 0.08334],
                  78: [0, 0.68333, 0.10903, 0.08334],
                  79: [0, 0.68333, 0.02778, 0.08334],
                  80: [0, 0.68333, 0.13889, 0.08334],
                  81: [0.19444, 0.68333, 0, 0.08334],
                  82: [0, 0.68333, 0.00773, 0.08334],
                  83: [0, 0.68333, 0.05764, 0.08334],
                  84: [0, 0.68333, 0.13889, 0.08334],
                  85: [0, 0.68333, 0.10903, 0.02778],
                  86: [0, 0.68333, 0.22222, 0],
                  87: [0, 0.68333, 0.13889, 0],
                  88: [0, 0.68333, 0.07847, 0.08334],
                  89: [0, 0.68333, 0.22222, 0],
                  90: [0, 0.68333, 0.07153, 0.08334],
                  97: [0, 0.43056, 0, 0],
                  98: [0, 0.69444, 0, 0],
                  99: [0, 0.43056, 0, 0.05556],
                  100: [0, 0.69444, 0, 0.16667],
                  101: [0, 0.43056, 0, 0.05556],
                  102: [0.19444, 0.69444, 0.10764, 0.16667],
                  103: [0.19444, 0.43056, 0.03588, 0.02778],
                  104: [0, 0.69444, 0, 0],
                  105: [0, 0.65952, 0, 0],
                  106: [0.19444, 0.65952, 0.05724, 0],
                  107: [0, 0.69444, 0.03148, 0],
                  108: [0, 0.69444, 0.01968, 0.08334],
                  109: [0, 0.43056, 0, 0],
                  110: [0, 0.43056, 0, 0],
                  111: [0, 0.43056, 0, 0.05556],
                  112: [0.19444, 0.43056, 0, 0.08334],
                  113: [0.19444, 0.43056, 0.03588, 0.08334],
                  114: [0, 0.43056, 0.02778, 0.05556],
                  115: [0, 0.43056, 0, 0.05556],
                  116: [0, 0.61508, 0, 0.08334],
                  117: [0, 0.43056, 0, 0.02778],
                  118: [0, 0.43056, 0.03588, 0.02778],
                  119: [0, 0.43056, 0.02691, 0.08334],
                  120: [0, 0.43056, 0, 0.02778],
                  121: [0.19444, 0.43056, 0.03588, 0.05556],
                  122: [0, 0.43056, 0.04398, 0.05556],
                  915: [0, 0.68333, 0.13889, 0.08334],
                  916: [0, 0.68333, 0, 0.16667],
                  920: [0, 0.68333, 0.02778, 0.08334],
                  923: [0, 0.68333, 0, 0.16667],
                  926: [0, 0.68333, 0.07569, 0.08334],
                  928: [0, 0.68333, 0.08125, 0.05556],
                  931: [0, 0.68333, 0.05764, 0.08334],
                  933: [0, 0.68333, 0.13889, 0.05556],
                  934: [0, 0.68333, 0, 0.08334],
                  936: [0, 0.68333, 0.11, 0.05556],
                  937: [0, 0.68333, 0.05017, 0.08334],
                  945: [0, 0.43056, 0.0037, 0.02778],
                  946: [0.19444, 0.69444, 0.05278, 0.08334],
                  947: [0.19444, 0.43056, 0.05556, 0],
                  948: [0, 0.69444, 0.03785, 0.05556],
                  949: [0, 0.43056, 0, 0.08334],
                  950: [0.19444, 0.69444, 0.07378, 0.08334],
                  951: [0.19444, 0.43056, 0.03588, 0.05556],
                  952: [0, 0.69444, 0.02778, 0.08334],
                  953: [0, 0.43056, 0, 0.05556],
                  954: [0, 0.43056, 0, 0],
                  955: [0, 0.69444, 0, 0],
                  956: [0.19444, 0.43056, 0, 0.02778],
                  957: [0, 0.43056, 0.06366, 0.02778],
                  958: [0.19444, 0.69444, 0.04601, 0.11111],
                  959: [0, 0.43056, 0, 0.05556],
                  960: [0, 0.43056, 0.03588, 0],
                  961: [0.19444, 0.43056, 0, 0.08334],
                  962: [0.09722, 0.43056, 0.07986, 0.08334],
                  963: [0, 0.43056, 0.03588, 0],
                  964: [0, 0.43056, 0.1132, 0.02778],
                  965: [0, 0.43056, 0.03588, 0.02778],
                  966: [0.19444, 0.43056, 0, 0.08334],
                  967: [0.19444, 0.43056, 0, 0.05556],
                  968: [0.19444, 0.69444, 0.03588, 0.11111],
                  969: [0, 0.43056, 0.03588, 0],
                  977: [0, 0.69444, 0, 0.08334],
                  981: [0.19444, 0.69444, 0, 0.08334],
                  982: [0, 0.43056, 0.02778, 0],
                  1009: [0.19444, 0.43056, 0, 0.08334],
                  1013: [0, 0.43056, 0, 0.05556],
                },
                "Math-Regular": {
                  65: [0, 0.68333, 0, 0.13889],
                  66: [0, 0.68333, 0.05017, 0.08334],
                  67: [0, 0.68333, 0.07153, 0.08334],
                  68: [0, 0.68333, 0.02778, 0.05556],
                  69: [0, 0.68333, 0.05764, 0.08334],
                  70: [0, 0.68333, 0.13889, 0.08334],
                  71: [0, 0.68333, 0, 0.08334],
                  72: [0, 0.68333, 0.08125, 0.05556],
                  73: [0, 0.68333, 0.07847, 0.11111],
                  74: [0, 0.68333, 0.09618, 0.16667],
                  75: [0, 0.68333, 0.07153, 0.05556],
                  76: [0, 0.68333, 0, 0.02778],
                  77: [0, 0.68333, 0.10903, 0.08334],
                  78: [0, 0.68333, 0.10903, 0.08334],
                  79: [0, 0.68333, 0.02778, 0.08334],
                  80: [0, 0.68333, 0.13889, 0.08334],
                  81: [0.19444, 0.68333, 0, 0.08334],
                  82: [0, 0.68333, 0.00773, 0.08334],
                  83: [0, 0.68333, 0.05764, 0.08334],
                  84: [0, 0.68333, 0.13889, 0.08334],
                  85: [0, 0.68333, 0.10903, 0.02778],
                  86: [0, 0.68333, 0.22222, 0],
                  87: [0, 0.68333, 0.13889, 0],
                  88: [0, 0.68333, 0.07847, 0.08334],
                  89: [0, 0.68333, 0.22222, 0],
                  90: [0, 0.68333, 0.07153, 0.08334],
                  97: [0, 0.43056, 0, 0],
                  98: [0, 0.69444, 0, 0],
                  99: [0, 0.43056, 0, 0.05556],
                  100: [0, 0.69444, 0, 0.16667],
                  101: [0, 0.43056, 0, 0.05556],
                  102: [0.19444, 0.69444, 0.10764, 0.16667],
                  103: [0.19444, 0.43056, 0.03588, 0.02778],
                  104: [0, 0.69444, 0, 0],
                  105: [0, 0.65952, 0, 0],
                  106: [0.19444, 0.65952, 0.05724, 0],
                  107: [0, 0.69444, 0.03148, 0],
                  108: [0, 0.69444, 0.01968, 0.08334],
                  109: [0, 0.43056, 0, 0],
                  110: [0, 0.43056, 0, 0],
                  111: [0, 0.43056, 0, 0.05556],
                  112: [0.19444, 0.43056, 0, 0.08334],
                  113: [0.19444, 0.43056, 0.03588, 0.08334],
                  114: [0, 0.43056, 0.02778, 0.05556],
                  115: [0, 0.43056, 0, 0.05556],
                  116: [0, 0.61508, 0, 0.08334],
                  117: [0, 0.43056, 0, 0.02778],
                  118: [0, 0.43056, 0.03588, 0.02778],
                  119: [0, 0.43056, 0.02691, 0.08334],
                  120: [0, 0.43056, 0, 0.02778],
                  121: [0.19444, 0.43056, 0.03588, 0.05556],
                  122: [0, 0.43056, 0.04398, 0.05556],
                  915: [0, 0.68333, 0.13889, 0.08334],
                  916: [0, 0.68333, 0, 0.16667],
                  920: [0, 0.68333, 0.02778, 0.08334],
                  923: [0, 0.68333, 0, 0.16667],
                  926: [0, 0.68333, 0.07569, 0.08334],
                  928: [0, 0.68333, 0.08125, 0.05556],
                  931: [0, 0.68333, 0.05764, 0.08334],
                  933: [0, 0.68333, 0.13889, 0.05556],
                  934: [0, 0.68333, 0, 0.08334],
                  936: [0, 0.68333, 0.11, 0.05556],
                  937: [0, 0.68333, 0.05017, 0.08334],
                  945: [0, 0.43056, 0.0037, 0.02778],
                  946: [0.19444, 0.69444, 0.05278, 0.08334],
                  947: [0.19444, 0.43056, 0.05556, 0],
                  948: [0, 0.69444, 0.03785, 0.05556],
                  949: [0, 0.43056, 0, 0.08334],
                  950: [0.19444, 0.69444, 0.07378, 0.08334],
                  951: [0.19444, 0.43056, 0.03588, 0.05556],
                  952: [0, 0.69444, 0.02778, 0.08334],
                  953: [0, 0.43056, 0, 0.05556],
                  954: [0, 0.43056, 0, 0],
                  955: [0, 0.69444, 0, 0],
                  956: [0.19444, 0.43056, 0, 0.02778],
                  957: [0, 0.43056, 0.06366, 0.02778],
                  958: [0.19444, 0.69444, 0.04601, 0.11111],
                  959: [0, 0.43056, 0, 0.05556],
                  960: [0, 0.43056, 0.03588, 0],
                  961: [0.19444, 0.43056, 0, 0.08334],
                  962: [0.09722, 0.43056, 0.07986, 0.08334],
                  963: [0, 0.43056, 0.03588, 0],
                  964: [0, 0.43056, 0.1132, 0.02778],
                  965: [0, 0.43056, 0.03588, 0.02778],
                  966: [0.19444, 0.43056, 0, 0.08334],
                  967: [0.19444, 0.43056, 0, 0.05556],
                  968: [0.19444, 0.69444, 0.03588, 0.11111],
                  969: [0, 0.43056, 0.03588, 0],
                  977: [0, 0.69444, 0, 0.08334],
                  981: [0.19444, 0.69444, 0, 0.08334],
                  982: [0, 0.43056, 0.02778, 0],
                  1009: [0.19444, 0.43056, 0, 0.08334],
                  1013: [0, 0.43056, 0, 0.05556],
                },
                "SansSerif-Regular": {
                  33: [0, 0.69444, 0, 0],
                  34: [0, 0.69444, 0, 0],
                  35: [0.19444, 0.69444, 0, 0],
                  36: [0.05556, 0.75, 0, 0],
                  37: [0.05556, 0.75, 0, 0],
                  38: [0, 0.69444, 0, 0],
                  39: [0, 0.69444, 0, 0],
                  40: [0.25, 0.75, 0, 0],
                  41: [0.25, 0.75, 0, 0],
                  42: [0, 0.75, 0, 0],
                  43: [0.08333, 0.58333, 0, 0],
                  44: [0.125, 0.08333, 0, 0],
                  45: [0, 0.44444, 0, 0],
                  46: [0, 0.08333, 0, 0],
                  47: [0.25, 0.75, 0, 0],
                  48: [0, 0.65556, 0, 0],
                  49: [0, 0.65556, 0, 0],
                  50: [0, 0.65556, 0, 0],
                  51: [0, 0.65556, 0, 0],
                  52: [0, 0.65556, 0, 0],
                  53: [0, 0.65556, 0, 0],
                  54: [0, 0.65556, 0, 0],
                  55: [0, 0.65556, 0, 0],
                  56: [0, 0.65556, 0, 0],
                  57: [0, 0.65556, 0, 0],
                  58: [0, 0.44444, 0, 0],
                  59: [0.125, 0.44444, 0, 0],
                  61: [-0.13, 0.37, 0, 0],
                  63: [0, 0.69444, 0, 0],
                  64: [0, 0.69444, 0, 0],
                  65: [0, 0.69444, 0, 0],
                  66: [0, 0.69444, 0, 0],
                  67: [0, 0.69444, 0, 0],
                  68: [0, 0.69444, 0, 0],
                  69: [0, 0.69444, 0, 0],
                  70: [0, 0.69444, 0, 0],
                  71: [0, 0.69444, 0, 0],
                  72: [0, 0.69444, 0, 0],
                  73: [0, 0.69444, 0, 0],
                  74: [0, 0.69444, 0, 0],
                  75: [0, 0.69444, 0, 0],
                  76: [0, 0.69444, 0, 0],
                  77: [0, 0.69444, 0, 0],
                  78: [0, 0.69444, 0, 0],
                  79: [0, 0.69444, 0, 0],
                  80: [0, 0.69444, 0, 0],
                  81: [0.125, 0.69444, 0, 0],
                  82: [0, 0.69444, 0, 0],
                  83: [0, 0.69444, 0, 0],
                  84: [0, 0.69444, 0, 0],
                  85: [0, 0.69444, 0, 0],
                  86: [0, 0.69444, 0.01389, 0],
                  87: [0, 0.69444, 0.01389, 0],
                  88: [0, 0.69444, 0, 0],
                  89: [0, 0.69444, 0.025, 0],
                  90: [0, 0.69444, 0, 0],
                  91: [0.25, 0.75, 0, 0],
                  93: [0.25, 0.75, 0, 0],
                  94: [0, 0.69444, 0, 0],
                  95: [0.35, 0.09444, 0.02778, 0],
                  97: [0, 0.44444, 0, 0],
                  98: [0, 0.69444, 0, 0],
                  99: [0, 0.44444, 0, 0],
                  100: [0, 0.69444, 0, 0],
                  101: [0, 0.44444, 0, 0],
                  102: [0, 0.69444, 0.06944, 0],
                  103: [0.19444, 0.44444, 0.01389, 0],
                  104: [0, 0.69444, 0, 0],
                  105: [0, 0.67937, 0, 0],
                  106: [0.19444, 0.67937, 0, 0],
                  107: [0, 0.69444, 0, 0],
                  108: [0, 0.69444, 0, 0],
                  109: [0, 0.44444, 0, 0],
                  110: [0, 0.44444, 0, 0],
                  111: [0, 0.44444, 0, 0],
                  112: [0.19444, 0.44444, 0, 0],
                  113: [0.19444, 0.44444, 0, 0],
                  114: [0, 0.44444, 0.01389, 0],
                  115: [0, 0.44444, 0, 0],
                  116: [0, 0.57143, 0, 0],
                  117: [0, 0.44444, 0, 0],
                  118: [0, 0.44444, 0.01389, 0],
                  119: [0, 0.44444, 0.01389, 0],
                  120: [0, 0.44444, 0, 0],
                  121: [0.19444, 0.44444, 0.01389, 0],
                  122: [0, 0.44444, 0, 0],
                  126: [0.35, 0.32659, 0, 0],
                  305: [0, 0.44444, 0, 0],
                  567: [0.19444, 0.44444, 0, 0],
                  768: [0, 0.69444, 0, 0],
                  769: [0, 0.69444, 0, 0],
                  770: [0, 0.69444, 0, 0],
                  771: [0, 0.67659, 0, 0],
                  772: [0, 0.60889, 0, 0],
                  774: [0, 0.69444, 0, 0],
                  775: [0, 0.67937, 0, 0],
                  776: [0, 0.67937, 0, 0],
                  778: [0, 0.69444, 0, 0],
                  779: [0, 0.69444, 0, 0],
                  780: [0, 0.63194, 0, 0],
                  915: [0, 0.69444, 0, 0],
                  916: [0, 0.69444, 0, 0],
                  920: [0, 0.69444, 0, 0],
                  923: [0, 0.69444, 0, 0],
                  926: [0, 0.69444, 0, 0],
                  928: [0, 0.69444, 0, 0],
                  931: [0, 0.69444, 0, 0],
                  933: [0, 0.69444, 0, 0],
                  934: [0, 0.69444, 0, 0],
                  936: [0, 0.69444, 0, 0],
                  937: [0, 0.69444, 0, 0],
                  8211: [0, 0.44444, 0.02778, 0],
                  8212: [0, 0.44444, 0.02778, 0],
                  8216: [0, 0.69444, 0, 0],
                  8217: [0, 0.69444, 0, 0],
                  8220: [0, 0.69444, 0, 0],
                  8221: [0, 0.69444, 0, 0],
                },
                "Script-Regular": {
                  65: [0, 0.7, 0.22925, 0],
                  66: [0, 0.7, 0.04087, 0],
                  67: [0, 0.7, 0.1689, 0],
                  68: [0, 0.7, 0.09371, 0],
                  69: [0, 0.7, 0.18583, 0],
                  70: [0, 0.7, 0.13634, 0],
                  71: [0, 0.7, 0.17322, 0],
                  72: [0, 0.7, 0.29694, 0],
                  73: [0, 0.7, 0.19189, 0],
                  74: [0.27778, 0.7, 0.19189, 0],
                  75: [0, 0.7, 0.31259, 0],
                  76: [0, 0.7, 0.19189, 0],
                  77: [0, 0.7, 0.15981, 0],
                  78: [0, 0.7, 0.3525, 0],
                  79: [0, 0.7, 0.08078, 0],
                  80: [0, 0.7, 0.08078, 0],
                  81: [0, 0.7, 0.03305, 0],
                  82: [0, 0.7, 0.06259, 0],
                  83: [0, 0.7, 0.19189, 0],
                  84: [0, 0.7, 0.29087, 0],
                  85: [0, 0.7, 0.25815, 0],
                  86: [0, 0.7, 0.27523, 0],
                  87: [0, 0.7, 0.27523, 0],
                  88: [0, 0.7, 0.26006, 0],
                  89: [0, 0.7, 0.2939, 0],
                  90: [0, 0.7, 0.24037, 0],
                },
                "Size1-Regular": {
                  40: [0.35001, 0.85, 0, 0],
                  41: [0.35001, 0.85, 0, 0],
                  47: [0.35001, 0.85, 0, 0],
                  91: [0.35001, 0.85, 0, 0],
                  92: [0.35001, 0.85, 0, 0],
                  93: [0.35001, 0.85, 0, 0],
                  123: [0.35001, 0.85, 0, 0],
                  125: [0.35001, 0.85, 0, 0],
                  710: [0, 0.72222, 0, 0],
                  732: [0, 0.72222, 0, 0],
                  770: [0, 0.72222, 0, 0],
                  771: [0, 0.72222, 0, 0],
                  8214: [-0.00099, 0.601, 0, 0],
                  8593: [1e-5, 0.6, 0, 0],
                  8595: [1e-5, 0.6, 0, 0],
                  8657: [1e-5, 0.6, 0, 0],
                  8659: [1e-5, 0.6, 0, 0],
                  8719: [0.25001, 0.75, 0, 0],
                  8720: [0.25001, 0.75, 0, 0],
                  8721: [0.25001, 0.75, 0, 0],
                  8730: [0.35001, 0.85, 0, 0],
                  8739: [-0.00599, 0.606, 0, 0],
                  8741: [-0.00599, 0.606, 0, 0],
                  8747: [0.30612, 0.805, 0.19445, 0],
                  8748: [0.306, 0.805, 0.19445, 0],
                  8749: [0.306, 0.805, 0.19445, 0],
                  8750: [0.30612, 0.805, 0.19445, 0],
                  8896: [0.25001, 0.75, 0, 0],
                  8897: [0.25001, 0.75, 0, 0],
                  8898: [0.25001, 0.75, 0, 0],
                  8899: [0.25001, 0.75, 0, 0],
                  8968: [0.35001, 0.85, 0, 0],
                  8969: [0.35001, 0.85, 0, 0],
                  8970: [0.35001, 0.85, 0, 0],
                  8971: [0.35001, 0.85, 0, 0],
                  9168: [-0.00099, 0.601, 0, 0],
                  10216: [0.35001, 0.85, 0, 0],
                  10217: [0.35001, 0.85, 0, 0],
                  10752: [0.25001, 0.75, 0, 0],
                  10753: [0.25001, 0.75, 0, 0],
                  10754: [0.25001, 0.75, 0, 0],
                  10756: [0.25001, 0.75, 0, 0],
                  10758: [0.25001, 0.75, 0, 0],
                },
                "Size2-Regular": {
                  40: [0.65002, 1.15, 0, 0],
                  41: [0.65002, 1.15, 0, 0],
                  47: [0.65002, 1.15, 0, 0],
                  91: [0.65002, 1.15, 0, 0],
                  92: [0.65002, 1.15, 0, 0],
                  93: [0.65002, 1.15, 0, 0],
                  123: [0.65002, 1.15, 0, 0],
                  125: [0.65002, 1.15, 0, 0],
                  710: [0, 0.75, 0, 0],
                  732: [0, 0.75, 0, 0],
                  770: [0, 0.75, 0, 0],
                  771: [0, 0.75, 0, 0],
                  8719: [0.55001, 1.05, 0, 0],
                  8720: [0.55001, 1.05, 0, 0],
                  8721: [0.55001, 1.05, 0, 0],
                  8730: [0.65002, 1.15, 0, 0],
                  8747: [0.86225, 1.36, 0.44445, 0],
                  8748: [0.862, 1.36, 0.44445, 0],
                  8749: [0.862, 1.36, 0.44445, 0],
                  8750: [0.86225, 1.36, 0.44445, 0],
                  8896: [0.55001, 1.05, 0, 0],
                  8897: [0.55001, 1.05, 0, 0],
                  8898: [0.55001, 1.05, 0, 0],
                  8899: [0.55001, 1.05, 0, 0],
                  8968: [0.65002, 1.15, 0, 0],
                  8969: [0.65002, 1.15, 0, 0],
                  8970: [0.65002, 1.15, 0, 0],
                  8971: [0.65002, 1.15, 0, 0],
                  10216: [0.65002, 1.15, 0, 0],
                  10217: [0.65002, 1.15, 0, 0],
                  10752: [0.55001, 1.05, 0, 0],
                  10753: [0.55001, 1.05, 0, 0],
                  10754: [0.55001, 1.05, 0, 0],
                  10756: [0.55001, 1.05, 0, 0],
                  10758: [0.55001, 1.05, 0, 0],
                },
                "Size3-Regular": {
                  40: [0.95003, 1.45, 0, 0],
                  41: [0.95003, 1.45, 0, 0],
                  47: [0.95003, 1.45, 0, 0],
                  91: [0.95003, 1.45, 0, 0],
                  92: [0.95003, 1.45, 0, 0],
                  93: [0.95003, 1.45, 0, 0],
                  123: [0.95003, 1.45, 0, 0],
                  125: [0.95003, 1.45, 0, 0],
                  710: [0, 0.75, 0, 0],
                  732: [0, 0.75, 0, 0],
                  770: [0, 0.75, 0, 0],
                  771: [0, 0.75, 0, 0],
                  8730: [0.95003, 1.45, 0, 0],
                  8968: [0.95003, 1.45, 0, 0],
                  8969: [0.95003, 1.45, 0, 0],
                  8970: [0.95003, 1.45, 0, 0],
                  8971: [0.95003, 1.45, 0, 0],
                  10216: [0.95003, 1.45, 0, 0],
                  10217: [0.95003, 1.45, 0, 0],
                },
                "Size4-Regular": {
                  40: [1.25003, 1.75, 0, 0],
                  41: [1.25003, 1.75, 0, 0],
                  47: [1.25003, 1.75, 0, 0],
                  91: [1.25003, 1.75, 0, 0],
                  92: [1.25003, 1.75, 0, 0],
                  93: [1.25003, 1.75, 0, 0],
                  123: [1.25003, 1.75, 0, 0],
                  125: [1.25003, 1.75, 0, 0],
                  710: [0, 0.825, 0, 0],
                  732: [0, 0.825, 0, 0],
                  770: [0, 0.825, 0, 0],
                  771: [0, 0.825, 0, 0],
                  8730: [1.25003, 1.75, 0, 0],
                  8968: [1.25003, 1.75, 0, 0],
                  8969: [1.25003, 1.75, 0, 0],
                  8970: [1.25003, 1.75, 0, 0],
                  8971: [1.25003, 1.75, 0, 0],
                  9115: [0.64502, 1.155, 0, 0],
                  9116: [1e-5, 0.6, 0, 0],
                  9117: [0.64502, 1.155, 0, 0],
                  9118: [0.64502, 1.155, 0, 0],
                  9119: [1e-5, 0.6, 0, 0],
                  9120: [0.64502, 1.155, 0, 0],
                  9121: [0.64502, 1.155, 0, 0],
                  9122: [-0.00099, 0.601, 0, 0],
                  9123: [0.64502, 1.155, 0, 0],
                  9124: [0.64502, 1.155, 0, 0],
                  9125: [-0.00099, 0.601, 0, 0],
                  9126: [0.64502, 1.155, 0, 0],
                  9127: [1e-5, 0.9, 0, 0],
                  9128: [0.65002, 1.15, 0, 0],
                  9129: [0.90001, 0, 0, 0],
                  9130: [0, 0.3, 0, 0],
                  9131: [1e-5, 0.9, 0, 0],
                  9132: [0.65002, 1.15, 0, 0],
                  9133: [0.90001, 0, 0, 0],
                  9143: [0.88502, 0.915, 0, 0],
                  10216: [1.25003, 1.75, 0, 0],
                  10217: [1.25003, 1.75, 0, 0],
                  57344: [-0.00499, 0.605, 0, 0],
                  57345: [-0.00499, 0.605, 0, 0],
                  57680: [0, 0.12, 0, 0],
                  57681: [0, 0.12, 0, 0],
                  57682: [0, 0.12, 0, 0],
                  57683: [0, 0.12, 0, 0],
                },
                "Typewriter-Regular": {
                  33: [0, 0.61111, 0, 0],
                  34: [0, 0.61111, 0, 0],
                  35: [0, 0.61111, 0, 0],
                  36: [0.08333, 0.69444, 0, 0],
                  37: [0.08333, 0.69444, 0, 0],
                  38: [0, 0.61111, 0, 0],
                  39: [0, 0.61111, 0, 0],
                  40: [0.08333, 0.69444, 0, 0],
                  41: [0.08333, 0.69444, 0, 0],
                  42: [0, 0.52083, 0, 0],
                  43: [-0.08056, 0.53055, 0, 0],
                  44: [0.13889, 0.125, 0, 0],
                  45: [-0.08056, 0.53055, 0, 0],
                  46: [0, 0.125, 0, 0],
                  47: [0.08333, 0.69444, 0, 0],
                  48: [0, 0.61111, 0, 0],
                  49: [0, 0.61111, 0, 0],
                  50: [0, 0.61111, 0, 0],
                  51: [0, 0.61111, 0, 0],
                  52: [0, 0.61111, 0, 0],
                  53: [0, 0.61111, 0, 0],
                  54: [0, 0.61111, 0, 0],
                  55: [0, 0.61111, 0, 0],
                  56: [0, 0.61111, 0, 0],
                  57: [0, 0.61111, 0, 0],
                  58: [0, 0.43056, 0, 0],
                  59: [0.13889, 0.43056, 0, 0],
                  60: [-0.05556, 0.55556, 0, 0],
                  61: [-0.19549, 0.41562, 0, 0],
                  62: [-0.05556, 0.55556, 0, 0],
                  63: [0, 0.61111, 0, 0],
                  64: [0, 0.61111, 0, 0],
                  65: [0, 0.61111, 0, 0],
                  66: [0, 0.61111, 0, 0],
                  67: [0, 0.61111, 0, 0],
                  68: [0, 0.61111, 0, 0],
                  69: [0, 0.61111, 0, 0],
                  70: [0, 0.61111, 0, 0],
                  71: [0, 0.61111, 0, 0],
                  72: [0, 0.61111, 0, 0],
                  73: [0, 0.61111, 0, 0],
                  74: [0, 0.61111, 0, 0],
                  75: [0, 0.61111, 0, 0],
                  76: [0, 0.61111, 0, 0],
                  77: [0, 0.61111, 0, 0],
                  78: [0, 0.61111, 0, 0],
                  79: [0, 0.61111, 0, 0],
                  80: [0, 0.61111, 0, 0],
                  81: [0.13889, 0.61111, 0, 0],
                  82: [0, 0.61111, 0, 0],
                  83: [0, 0.61111, 0, 0],
                  84: [0, 0.61111, 0, 0],
                  85: [0, 0.61111, 0, 0],
                  86: [0, 0.61111, 0, 0],
                  87: [0, 0.61111, 0, 0],
                  88: [0, 0.61111, 0, 0],
                  89: [0, 0.61111, 0, 0],
                  90: [0, 0.61111, 0, 0],
                  91: [0.08333, 0.69444, 0, 0],
                  92: [0.08333, 0.69444, 0, 0],
                  93: [0.08333, 0.69444, 0, 0],
                  94: [0, 0.61111, 0, 0],
                  95: [0.09514, 0, 0, 0],
                  96: [0, 0.61111, 0, 0],
                  97: [0, 0.43056, 0, 0],
                  98: [0, 0.61111, 0, 0],
                  99: [0, 0.43056, 0, 0],
                  100: [0, 0.61111, 0, 0],
                  101: [0, 0.43056, 0, 0],
                  102: [0, 0.61111, 0, 0],
                  103: [0.22222, 0.43056, 0, 0],
                  104: [0, 0.61111, 0, 0],
                  105: [0, 0.61111, 0, 0],
                  106: [0.22222, 0.61111, 0, 0],
                  107: [0, 0.61111, 0, 0],
                  108: [0, 0.61111, 0, 0],
                  109: [0, 0.43056, 0, 0],
                  110: [0, 0.43056, 0, 0],
                  111: [0, 0.43056, 0, 0],
                  112: [0.22222, 0.43056, 0, 0],
                  113: [0.22222, 0.43056, 0, 0],
                  114: [0, 0.43056, 0, 0],
                  115: [0, 0.43056, 0, 0],
                  116: [0, 0.55358, 0, 0],
                  117: [0, 0.43056, 0, 0],
                  118: [0, 0.43056, 0, 0],
                  119: [0, 0.43056, 0, 0],
                  120: [0, 0.43056, 0, 0],
                  121: [0.22222, 0.43056, 0, 0],
                  122: [0, 0.43056, 0, 0],
                  123: [0.08333, 0.69444, 0, 0],
                  124: [0.08333, 0.69444, 0, 0],
                  125: [0.08333, 0.69444, 0, 0],
                  126: [0, 0.61111, 0, 0],
                  127: [0, 0.61111, 0, 0],
                  305: [0, 0.43056, 0, 0],
                  567: [0.22222, 0.43056, 0, 0],
                  768: [0, 0.61111, 0, 0],
                  769: [0, 0.61111, 0, 0],
                  770: [0, 0.61111, 0, 0],
                  771: [0, 0.61111, 0, 0],
                  772: [0, 0.56555, 0, 0],
                  774: [0, 0.61111, 0, 0],
                  776: [0, 0.61111, 0, 0],
                  778: [0, 0.61111, 0, 0],
                  780: [0, 0.56597, 0, 0],
                  915: [0, 0.61111, 0, 0],
                  916: [0, 0.61111, 0, 0],
                  920: [0, 0.61111, 0, 0],
                  923: [0, 0.61111, 0, 0],
                  926: [0, 0.61111, 0, 0],
                  928: [0, 0.61111, 0, 0],
                  931: [0, 0.61111, 0, 0],
                  933: [0, 0.61111, 0, 0],
                  934: [0, 0.61111, 0, 0],
                  936: [0, 0.61111, 0, 0],
                  937: [0, 0.61111, 0, 0],
                  2018: [0, 0.61111, 0, 0],
                  2019: [0, 0.61111, 0, 0],
                  8242: [0, 0.61111, 0, 0],
                },
              };
            },
            {},
          ],
          43: [
            function (require, module, exports) {
              var _utils = require("./utils");

              var _utils2 = _interopRequireDefault(_utils);

              var _ParseError = require("./ParseError");

              var _ParseError2 = _interopRequireDefault(_ParseError);

              var _ParseNode = require("./ParseNode");

              var _ParseNode2 = _interopRequireDefault(_ParseNode);

              function _interopRequireDefault(obj) {
                return obj && obj.__esModule ? obj : { default: obj };
              }

              /* This file contains a list of functions that we parse, identified by
               * the calls to defineFunction.
               *
               * The first argument to defineFunction is a single name or a list of names.
               * All functions named in such a list will share a single implementation.
               *
               * Each declared function can have associated properties, which
               * include the following:
               *
               *  - numArgs: The number of arguments the function takes.
               *             If this is the only property, it can be passed as a number
               *             instead of an element of a properties object.
               *  - argTypes: (optional) An array corresponding to each argument of the
               *              function, giving the type of argument that should be parsed. Its
               *              length should be equal to `numArgs + numOptionalArgs`. Valid
               *              types:
               *               - "size": A size-like thing, such as "1em" or "5ex"
               *               - "color": An html color, like "#abc" or "blue"
               *               - "original": The same type as the environment that the
               *                             function being parsed is in (e.g. used for the
               *                             bodies of functions like \textcolor where the
               *                             first argument is special and the second
               *                             argument is parsed normally)
               *              Other possible types (probably shouldn't be used)
               *               - "text": Text-like (e.g. \text)
               *               - "math": Normal math
               *              If undefined, this will be treated as an appropriate length
               *              array of "original" strings
               *  - greediness: (optional) The greediness of the function to use ungrouped
               *                arguments.
               *
               *                E.g. if you have an expression
               *                  \sqrt \frac 1 2
               *                since \frac has greediness=2 vs \sqrt's greediness=1, \frac
               *                will use the two arguments '1' and '2' as its two arguments,
               *                then that whole function will be used as the argument to
               *                \sqrt. On the other hand, the expressions
               *                  \frac \frac 1 2 3
               *                and
               *                  \frac \sqrt 1 2
               *                will fail because \frac and \frac have equal greediness
               *                and \sqrt has a lower greediness than \frac respectively. To
               *                make these parse, we would have to change them to:
               *                  \frac {\frac 1 2} 3
               *                and
               *                  \frac {\sqrt 1} 2
               *
               *                The default value is `1`
               *  - allowedInText: (optional) Whether or not the function is allowed inside
               *                   text mode (default false)
               *  - numOptionalArgs: (optional) The number of optional arguments the function
               *                     should parse. If the optional arguments aren't found,
               *                     `null` will be passed to the handler in their place.
               *                     (default 0)
               *  - infix: (optional) Must be true if the function is an infix operator.
               *
               * The last argument is that implementation, the handler for the function(s).
               * It is called to handle these functions and their arguments.
               * It receives two arguments:
               *  - context contains information and references provided by the parser
               *  - args is an array of arguments obtained from TeX input
               * The context contains the following properties:
               *  - funcName: the text (i.e. name) of the function, including \
               *  - parser: the parser object
               *  - lexer: the lexer object
               *  - positions: the positions in the overall string of the function
               *               and the arguments.
               * The latter three should only be used to produce error messages.
               *
               * The function should return an object with the following keys:
               *  - type: The type of element that this is. This is then used in
               *          buildHTML/buildMathML to determine which function
               *          should be called to build this node into a DOM node
               * Any other data can be added to the object, which will be passed
               * in to the function in buildHTML/buildMathML as `group.value`.
               */

              function defineFunction(names, props, handler) {
                if (typeof names === "string") {
                  names = [names];
                }
                if (typeof props === "number") {
                  props = { numArgs: props };
                }
                // Set default values of functions
                var data = {
                  numArgs: props.numArgs,
                  argTypes: props.argTypes,
                  greediness: props.greediness === undefined ? 1 : props.greediness,
                  allowedInText: !!props.allowedInText,
                  allowedInMath: props.allowedInMath,
                  numOptionalArgs: props.numOptionalArgs || 0,
                  infix: !!props.infix,
                  handler: handler,
                };
                for (var i = 0; i < names.length; ++i) {
                  module.exports[names[i]] = data;
                }
              }

              // Since the corresponding buildHTML/buildMathML function expects a
              // list of elements, we normalize for different kinds of arguments
              var ordargument = function ordargument(arg) {
                if (arg.type === "ordgroup") {
                  return arg.value;
                } else {
                  return [arg];
                }
              };

              // A normal square root
              defineFunction(
                "\\sqrt",
                {
                  numArgs: 1,
                  numOptionalArgs: 1,
                },
                function (context, args) {
                  var index = args[0];
                  var body = args[1];
                  return {
                    type: "sqrt",
                    body: body,
                    index: index,
                  };
                }
              );

              // Non-mathy text, possibly in a font
              var textFunctionStyles = {
                "\\text": undefined,
                "\\textrm": "mathrm",
                "\\textsf": "mathsf",
                "\\texttt": "mathtt",
                "\\textnormal": "mathrm",
                "\\textbf": "mathbf",
                "\\textit": "textit",
              };

              defineFunction(
                ["\\text", "\\textrm", "\\textsf", "\\texttt", "\\textnormal", "\\textbf", "\\textit"],
                {
                  numArgs: 1,
                  argTypes: ["text"],
                  greediness: 2,
                  allowedInText: true,
                },
                function (context, args) {
                  var body = args[0];
                  return {
                    type: "text",
                    body: ordargument(body),
                    style: textFunctionStyles[context.funcName],
                  };
                }
              );

              // A two-argument custom color
              defineFunction(
                "\\textcolor",
                {
                  numArgs: 2,
                  allowedInText: true,
                  greediness: 3,
                  argTypes: ["color", "original"],
                },
                function (context, args) {
                  var color = args[0];
                  var body = args[1];
                  return {
                    type: "color",
                    color: color.value,
                    value: ordargument(body),
                  };
                }
              );

              // \color is handled in Parser.js's parseImplicitGroup
              defineFunction(
                "\\color",
                {
                  numArgs: 1,
                  allowedInText: true,
                  greediness: 3,
                  argTypes: ["color"],
                },
                null
              );

              // An overline
              defineFunction(
                "\\overline",
                {
                  numArgs: 1,
                },
                function (context, args) {
                  var body = args[0];
                  return {
                    type: "overline",
                    body: body,
                  };
                }
              );

              // An underline
              defineFunction(
                "\\underline",
                {
                  numArgs: 1,
                },
                function (context, args) {
                  var body = args[0];
                  return {
                    type: "underline",
                    body: body,
                  };
                }
              );

              // A box of the width and height
              defineFunction(
                "\\rule",
                {
                  numArgs: 2,
                  numOptionalArgs: 1,
                  argTypes: ["size", "size", "size"],
                },
                function (context, args) {
                  var shift = args[0];
                  var width = args[1];
                  var height = args[2];
                  return {
                    type: "rule",
                    shift: shift && shift.value,
                    width: width.value,
                    height: height.value,
                  };
                }
              );

              // TODO: In TeX, \mkern only accepts mu-units, and \kern does not accept
              // mu-units. In current KaTeX we relax this; both commands accept any unit.
              defineFunction(
                ["\\kern", "\\mkern"],
                {
                  numArgs: 1,
                  argTypes: ["size"],
                },
                function (context, args) {
                  return {
                    type: "kern",
                    dimension: args[0].value,
                  };
                }
              );

              // A KaTeX logo
              defineFunction(
                "\\KaTeX",
                {
                  numArgs: 0,
                },
                function (context) {
                  return {
                    type: "katex",
                  };
                }
              );

              defineFunction(
                "\\phantom",
                {
                  numArgs: 1,
                },
                function (context, args) {
                  var body = args[0];
                  return {
                    type: "phantom",
                    value: ordargument(body),
                  };
                }
              );

              // Math class commands except \mathop
              defineFunction(
                ["\\mathord", "\\mathbin", "\\mathrel", "\\mathopen", "\\mathclose", "\\mathpunct", "\\mathinner"],
                {
                  numArgs: 1,
                },
                function (context, args) {
                  var body = args[0];
                  return {
                    type: "mclass",
                    mclass: "m" + context.funcName.substr(5),
                    value: ordargument(body),
                  };
                }
              );

              // Build a relation by placing one symbol on top of another
              defineFunction(
                "\\stackrel",
                {
                  numArgs: 2,
                },
                function (context, args) {
                  var top = args[0];
                  var bottom = args[1];

                  var bottomop = new _ParseNode2.default(
                    "op",
                    {
                      type: "op",
                      limits: true,
                      alwaysHandleSupSub: true,
                      symbol: false,
                      value: ordargument(bottom),
                    },
                    bottom.mode
                  );

                  var supsub = new _ParseNode2.default(
                    "supsub",
                    {
                      base: bottomop,
                      sup: top,
                      sub: null,
                    },
                    top.mode
                  );

                  return {
                    type: "mclass",
                    mclass: "mrel",
                    value: [supsub],
                  };
                }
              );

              // \mod-type functions
              defineFunction(
                "\\bmod",
                {
                  numArgs: 0,
                },
                function (context, args) {
                  return {
                    type: "mod",
                    modType: "bmod",
                    value: null,
                  };
                }
              );

              defineFunction(
                ["\\pod", "\\pmod", "\\mod"],
                {
                  numArgs: 1,
                },
                function (context, args) {
                  var body = args[0];
                  return {
                    type: "mod",
                    modType: context.funcName.substr(1),
                    value: ordargument(body),
                  };
                }
              );

              // Extra data needed for the delimiter handler down below
              var delimiterSizes = {
                "\\bigl": { mclass: "mopen", size: 1 },
                "\\Bigl": { mclass: "mopen", size: 2 },
                "\\biggl": { mclass: "mopen", size: 3 },
                "\\Biggl": { mclass: "mopen", size: 4 },
                "\\bigr": { mclass: "mclose", size: 1 },
                "\\Bigr": { mclass: "mclose", size: 2 },
                "\\biggr": { mclass: "mclose", size: 3 },
                "\\Biggr": { mclass: "mclose", size: 4 },
                "\\bigm": { mclass: "mrel", size: 1 },
                "\\Bigm": { mclass: "mrel", size: 2 },
                "\\biggm": { mclass: "mrel", size: 3 },
                "\\Biggm": { mclass: "mrel", size: 4 },
                "\\big": { mclass: "mord", size: 1 },
                "\\Big": { mclass: "mord", size: 2 },
                "\\bigg": { mclass: "mord", size: 3 },
                "\\Bigg": { mclass: "mord", size: 4 },
              };

              var delimiters = [
                "(",
                ")",
                "[",
                "\\lbrack",
                "]",
                "\\rbrack",
                "\\{",
                "\\lbrace",
                "\\}",
                "\\rbrace",
                "\\lfloor",
                "\\rfloor",
                "\\lceil",
                "\\rceil",
                "<",
                ">",
                "\\langle",
                "\\rangle",
                "\\lt",
                "\\gt",
                "\\lvert",
                "\\rvert",
                "\\lVert",
                "\\rVert",
                "\\lgroup",
                "\\rgroup",
                "\\lmoustache",
                "\\rmoustache",
                "/",
                "\\backslash",
                "|",
                "\\vert",
                "\\|",
                "\\Vert",
                "\\uparrow",
                "\\Uparrow",
                "\\downarrow",
                "\\Downarrow",
                "\\updownarrow",
                "\\Updownarrow",
                ".",
              ];

              var fontAliases = {
                "\\Bbb": "\\mathbb",
                "\\bold": "\\mathbf",
                "\\frak": "\\mathfrak",
              };

              // Single-argument color functions
              defineFunction(
                [
                  "\\blue",
                  "\\orange",
                  "\\pink",
                  "\\red",
                  "\\green",
                  "\\gray",
                  "\\purple",
                  "\\blueA",
                  "\\blueB",
                  "\\blueC",
                  "\\blueD",
                  "\\blueE",
                  "\\tealA",
                  "\\tealB",
                  "\\tealC",
                  "\\tealD",
                  "\\tealE",
                  "\\greenA",
                  "\\greenB",
                  "\\greenC",
                  "\\greenD",
                  "\\greenE",
                  "\\goldA",
                  "\\goldB",
                  "\\goldC",
                  "\\goldD",
                  "\\goldE",
                  "\\redA",
                  "\\redB",
                  "\\redC",
                  "\\redD",
                  "\\redE",
                  "\\maroonA",
                  "\\maroonB",
                  "\\maroonC",
                  "\\maroonD",
                  "\\maroonE",
                  "\\purpleA",
                  "\\purpleB",
                  "\\purpleC",
                  "\\purpleD",
                  "\\purpleE",
                  "\\mintA",
                  "\\mintB",
                  "\\mintC",
                  "\\grayA",
                  "\\grayB",
                  "\\grayC",
                  "\\grayD",
                  "\\grayE",
                  "\\grayF",
                  "\\grayG",
                  "\\grayH",
                  "\\grayI",
                  "\\kaBlue",
                  "\\kaGreen",
                ],
                {
                  numArgs: 1,
                  allowedInText: true,
                  greediness: 3,
                },
                function (context, args) {
                  var body = args[0];
                  return {
                    type: "color",
                    color: "katex-" + context.funcName.slice(1),
                    value: ordargument(body),
                  };
                }
              );

              // There are 2 flags for operators; whether they produce limits in
              // displaystyle, and whether they are symbols and should grow in
              // displaystyle. These four groups cover the four possible choices.

              // No limits, not symbols
              defineFunction(
                [
                  "\\arcsin",
                  "\\arccos",
                  "\\arctan",
                  "\\arctg",
                  "\\arcctg",
                  "\\arg",
                  "\\ch",
                  "\\cos",
                  "\\cosec",
                  "\\cosh",
                  "\\cot",
                  "\\cotg",
                  "\\coth",
                  "\\csc",
                  "\\ctg",
                  "\\cth",
                  "\\deg",
                  "\\dim",
                  "\\exp",
                  "\\hom",
                  "\\ker",
                  "\\lg",
                  "\\ln",
                  "\\log",
                  "\\sec",
                  "\\sin",
                  "\\sinh",
                  "\\sh",
                  "\\tan",
                  "\\tanh",
                  "\\tg",
                  "\\th",
                ],
                {
                  numArgs: 0,
                },
                function (context) {
                  return {
                    type: "op",
                    limits: false,
                    symbol: false,
                    body: context.funcName,
                  };
                }
              );

              // Limits, not symbols
              defineFunction(
                ["\\det", "\\gcd", "\\inf", "\\lim", "\\liminf", "\\limsup", "\\max", "\\min", "\\Pr", "\\sup"],
                {
                  numArgs: 0,
                },
                function (context) {
                  return {
                    type: "op",
                    limits: true,
                    symbol: false,
                    body: context.funcName,
                  };
                }
              );

              // No limits, symbols
              defineFunction(
                ["\\int", "\\iint", "\\iiint", "\\oint"],
                {
                  numArgs: 0,
                },
                function (context) {
                  return {
                    type: "op",
                    limits: false,
                    symbol: true,
                    body: context.funcName,
                  };
                }
              );

              // Limits, symbols
              defineFunction(
                [
                  "\\coprod",
                  "\\bigvee",
                  "\\bigwedge",
                  "\\biguplus",
                  "\\bigcap",
                  "\\bigcup",
                  "\\intop",
                  "\\prod",
                  "\\sum",
                  "\\bigotimes",
                  "\\bigoplus",
                  "\\bigodot",
                  "\\bigsqcup",
                  "\\smallint",
                ],
                {
                  numArgs: 0,
                },
                function (context) {
                  return {
                    type: "op",
                    limits: true,
                    symbol: true,
                    body: context.funcName,
                  };
                }
              );

              // \mathop class command
              defineFunction(
                "\\mathop",
                {
                  numArgs: 1,
                },
                function (context, args) {
                  var body = args[0];
                  return {
                    type: "op",
                    limits: false,
                    symbol: false,
                    value: ordargument(body),
                  };
                }
              );

              // Fractions
              defineFunction(
                ["\\dfrac", "\\frac", "\\tfrac", "\\dbinom", "\\binom", "\\tbinom", "\\\\atopfrac"],
                {
                  numArgs: 2,
                  greediness: 2,
                },
                function (context, args) {
                  var numer = args[0];
                  var denom = args[1];
                  var hasBarLine = void 0;
                  var leftDelim = null;
                  var rightDelim = null;
                  var size = "auto";

                  switch (context.funcName) {
                    case "\\dfrac":
                    case "\\frac":
                    case "\\tfrac":
                      hasBarLine = true;
                      break;
                    case "\\\\atopfrac":
                      hasBarLine = false;
                      break;
                    case "\\dbinom":
                    case "\\binom":
                    case "\\tbinom":
                      hasBarLine = false;
                      leftDelim = "(";
                      rightDelim = ")";
                      break;
                    default:
                      throw new Error("Unrecognized genfrac command");
                  }

                  switch (context.funcName) {
                    case "\\dfrac":
                    case "\\dbinom":
                      size = "display";
                      break;
                    case "\\tfrac":
                    case "\\tbinom":
                      size = "text";
                      break;
                  }

                  return {
                    type: "genfrac",
                    numer: numer,
                    denom: denom,
                    hasBarLine: hasBarLine,
                    leftDelim: leftDelim,
                    rightDelim: rightDelim,
                    size: size,
                  };
                }
              );

              // Left and right overlap functions
              defineFunction(
                ["\\llap", "\\rlap"],
                {
                  numArgs: 1,
                  allowedInText: true,
                },
                function (context, args) {
                  var body = args[0];
                  return {
                    type: context.funcName.slice(1),
                    body: body,
                  };
                }
              );

              // Delimiter functions
              var checkDelimiter = function checkDelimiter(delim, context) {
                if (_utils2.default.contains(delimiters, delim.value)) {
                  return delim;
                } else {
                  throw new _ParseError2.default("Invalid delimiter: '" + delim.value + "' after '" + context.funcName + "'", delim);
                }
              };

              defineFunction(
                [
                  "\\bigl",
                  "\\Bigl",
                  "\\biggl",
                  "\\Biggl",
                  "\\bigr",
                  "\\Bigr",
                  "\\biggr",
                  "\\Biggr",
                  "\\bigm",
                  "\\Bigm",
                  "\\biggm",
                  "\\Biggm",
                  "\\big",
                  "\\Big",
                  "\\bigg",
                  "\\Bigg",
                ],
                {
                  numArgs: 1,
                },
                function (context, args) {
                  var delim = checkDelimiter(args[0], context);

                  return {
                    type: "delimsizing",
                    size: delimiterSizes[context.funcName].size,
                    mclass: delimiterSizes[context.funcName].mclass,
                    value: delim.value,
                  };
                }
              );

              defineFunction(
                ["\\left", "\\right"],
                {
                  numArgs: 1,
                },
                function (context, args) {
                  var delim = checkDelimiter(args[0], context);

                  // \left and \right are caught somewhere in Parser.js, which is
                  // why this data doesn't match what is in buildHTML.
                  return {
                    type: "leftright",
                    value: delim.value,
                  };
                }
              );

              defineFunction(
                "\\middle",
                {
                  numArgs: 1,
                },
                function (context, args) {
                  var delim = checkDelimiter(args[0], context);
                  if (!context.parser.leftrightDepth) {
                    throw new _ParseError2.default("\\middle without preceding \\left", delim);
                  }

                  return {
                    type: "middle",
                    value: delim.value,
                  };
                }
              );

              // Sizing functions (handled in Parser.js explicitly, hence no handler)
              defineFunction(
                ["\\tiny", "\\scriptsize", "\\footnotesize", "\\small", "\\normalsize", "\\large", "\\Large", "\\LARGE", "\\huge", "\\Huge"],
                0,
                null
              );

              // Style changing functions (handled in Parser.js explicitly, hence no
              // handler)
              defineFunction(["\\displaystyle", "\\textstyle", "\\scriptstyle", "\\scriptscriptstyle"], 0, null);

              // Old font changing functions
              defineFunction(["\\rm", "\\sf", "\\tt", "\\bf", "\\it"], 0, null);

              defineFunction(
                [
                  // styles
                  "\\mathrm",
                  "\\mathit",
                  "\\mathbf",

                  // families
                  "\\mathbb",
                  "\\mathcal",
                  "\\mathfrak",
                  "\\mathscr",
                  "\\mathsf",
                  "\\mathtt",

                  // aliases
                  "\\Bbb",
                  "\\bold",
                  "\\frak",
                ],
                {
                  numArgs: 1,
                  greediness: 2,
                },
                function (context, args) {
                  var body = args[0];
                  var func = context.funcName;
                  if (func in fontAliases) {
                    func = fontAliases[func];
                  }
                  return {
                    type: "font",
                    font: func.slice(1),
                    body: body,
                  };
                }
              );

              // Accents
              defineFunction(
                [
                  "\\acute",
                  "\\grave",
                  "\\ddot",
                  "\\tilde",
                  "\\bar",
                  "\\breve",
                  "\\check",
                  "\\hat",
                  "\\vec",
                  "\\dot",
                  "\\widehat",
                  "\\widetilde",
                  "\\overrightarrow",
                  "\\overleftarrow",
                  "\\Overrightarrow",
                  "\\overleftrightarrow",
                  "\\overgroup",
                  "\\overlinesegment",
                  "\\overleftharpoon",
                  "\\overrightharpoon",
                ],
                {
                  numArgs: 1,
                },
                function (context, args) {
                  var base = args[0];

                  var isStretchy = !_utils2.default.contains(
                    ["\\acute", "\\grave", "\\ddot", "\\tilde", "\\bar", "\\breve", "\\check", "\\hat", "\\vec", "\\dot"],
                    context.funcName
                  );

                  var isShifty = !isStretchy || _utils2.default.contains(["\\widehat", "\\widetilde"], context.funcName);

                  return {
                    type: "accent",
                    label: context.funcName,
                    isStretchy: isStretchy,
                    isShifty: isShifty,
                    value: ordargument(base),
                    base: base,
                  };
                }
              );

              // Text-mode accents
              defineFunction(
                ["\\'", "\\`", "\\^", "\\~", "\\=", "\\u", "\\.", '\\"', "\\r", "\\H", "\\v"],
                {
                  numArgs: 1,
                  allowedInText: true,
                  allowedInMath: false,
                },
                function (context, args) {
                  var base = args[0];

                  return {
                    type: "accent",
                    label: context.funcName,
                    isStretchy: false,
                    isShifty: true,
                    value: ordargument(base),
                    base: base,
                  };
                }
              );

              // Horizontal stretchy braces
              defineFunction(
                ["\\overbrace", "\\underbrace"],
                {
                  numArgs: 1,
                },
                function (context, args) {
                  var base = args[0];
                  return {
                    type: "horizBrace",
                    label: context.funcName,
                    isOver: /^\\over/.test(context.funcName),
                    base: base,
                  };
                }
              );

              // Stretchy accents under the body
              defineFunction(
                ["\\underleftarrow", "\\underrightarrow", "\\underleftrightarrow", "\\undergroup", "\\underlinesegment", "\\undertilde"],
                {
                  numArgs: 1,
                },
                function (context, args) {
                  var body = args[0];
                  return {
                    type: "accentUnder",
                    label: context.funcName,
                    value: ordargument(body),
                    body: body,
                  };
                }
              );

              // Stretchy arrows with an optional argument
              defineFunction(
                [
                  "\\xleftarrow",
                  "\\xrightarrow",
                  "\\xLeftarrow",
                  "\\xRightarrow",
                  "\\xleftrightarrow",
                  "\\xLeftrightarrow",
                  "\\xhookleftarrow",
                  "\\xhookrightarrow",
                  "\\xmapsto",
                  "\\xrightharpoondown",
                  "\\xrightharpoonup",
                  "\\xleftharpoondown",
                  "\\xleftharpoonup",
                  "\\xrightleftharpoons",
                  "\\xleftrightharpoons",
                  "\\xLongequal",
                  "\\xtwoheadrightarrow",
                  "\\xtwoheadleftarrow",
                  "\\xLongequal",
                  "\\xtofrom",
                ],
                {
                  numArgs: 1,
                  numOptionalArgs: 1,
                },
                function (context, args) {
                  var below = args[0];
                  var body = args[1];
                  return {
                    type: "xArrow", // x for extensible
                    label: context.funcName,
                    body: body,
                    below: below,
                  };
                }
              );

              // enclose
              defineFunction(
                ["\\cancel", "\\bcancel", "\\xcancel", "\\sout", "\\fbox"],
                {
                  numArgs: 1,
                },
                function (context, args) {
                  var body = args[0];
                  return {
                    type: "enclose",
                    label: context.funcName,
                    body: body,
                  };
                }
              );

              // Infix generalized fractions
              defineFunction(
                ["\\over", "\\choose", "\\atop"],
                {
                  numArgs: 0,
                  infix: true,
                },
                function (context) {
                  var replaceWith = void 0;
                  switch (context.funcName) {
                    case "\\over":
                      replaceWith = "\\frac";
                      break;
                    case "\\choose":
                      replaceWith = "\\binom";
                      break;
                    case "\\atop":
                      replaceWith = "\\\\atopfrac";
                      break;
                    default:
                      throw new Error("Unrecognized infix genfrac command");
                  }
                  return {
                    type: "infix",
                    replaceWith: replaceWith,
                    token: context.token,
                  };
                }
              );

              // Row breaks for aligned data
              defineFunction(
                ["\\\\", "\\cr"],
                {
                  numArgs: 0,
                  numOptionalArgs: 1,
                  argTypes: ["size"],
                },
                function (context, args) {
                  var size = args[0];
                  return {
                    type: "cr",
                    size: size,
                  };
                }
              );

              // Environment delimiters
              defineFunction(
                ["\\begin", "\\end"],
                {
                  numArgs: 1,
                  argTypes: ["text"],
                },
                function (context, args) {
                  var nameGroup = args[0];
                  if (nameGroup.type !== "ordgroup") {
                    throw new _ParseError2.default("Invalid environment name", nameGroup);
                  }
                  var name = "";
                  for (var i = 0; i < nameGroup.value.length; ++i) {
                    name += nameGroup.value[i].value;
                  }
                  return {
                    type: "environment",
                    name: name,
                    nameGroup: nameGroup,
                  };
                }
              );
            },
            {
              "./ParseError": 29,
              "./ParseNode": 30,
              "./utils": 51,
            },
          ],
          44: [
            function (require, module, exports) {
              /**
               * Predefined macros for KaTeX.
               * This can be used to define some commands in terms of others.
               */

              // This function might one day accept additional argument and do more things.
              function defineMacro(name, body) {
                module.exports[name] = body;
              }

              //////////////////////////////////////////////////////////////////////
              // basics
              defineMacro("\\bgroup", "{");
              defineMacro("\\egroup", "}");
              defineMacro("\\begingroup", "{");
              defineMacro("\\endgroup", "}");

              // We don't distinguish between math and nonmath kerns.
              // (In TeX, the mu unit works only with \mkern.)
              defineMacro("\\mkern", "\\kern");

              //////////////////////////////////////////////////////////////////////
              // amsmath.sty

              // \def\overset#1#2{\binrel@{#2}\binrel@@{\mathop{\kern\z@#2}\limits^{#1}}}
              defineMacro("\\overset", "\\mathop{#2}\\limits^{#1}");
              defineMacro("\\underset", "\\mathop{#2}\\limits_{#1}");

              // \newcommand{\boxed}[1]{\fbox{\m@th$\displaystyle#1$}}
              defineMacro("\\boxed", "\\fbox{\\displaystyle{#1}}");

              //TODO: When implementing \dots, should ideally add the \DOTSB indicator
              //      into the macro, to indicate these are binary operators.
              // \def\iff{\DOTSB\;\Longleftrightarrow\;}
              // \def\implies{\DOTSB\;\Longrightarrow\;}
              // \def\impliedby{\DOTSB\;\Longleftarrow\;}
              defineMacro("\\iff", "\\;\\Longleftrightarrow\\;");
              defineMacro("\\implies", "\\;\\Longrightarrow\\;");
              defineMacro("\\impliedby", "\\;\\Longleftarrow\\;");

              //////////////////////////////////////////////////////////////////////
              // mathtools.sty

              //\providecommand\ordinarycolon{:}
              defineMacro("\\ordinarycolon", ":");
              //\def\vcentcolon{\mathrel{\mathop\ordinarycolon}}
              //TODO(edemaine): Not yet centered. Fix via \raisebox or #726
              defineMacro("\\vcentcolon", "\\mathrel{\\mathop\\ordinarycolon}");
              // \providecommand*\dblcolon{\vcentcolon\mathrel{\mkern-.9mu}\vcentcolon}
              defineMacro("\\dblcolon", "\\vcentcolon\\mathrel{\\mkern-.9mu}\\vcentcolon");
              // \providecommand*\coloneqq{\vcentcolon\mathrel{\mkern-1.2mu}=}
              defineMacro("\\coloneqq", "\\vcentcolon\\mathrel{\\mkern-1.2mu}=");
              // \providecommand*\Coloneqq{\dblcolon\mathrel{\mkern-1.2mu}=}
              defineMacro("\\Coloneqq", "\\dblcolon\\mathrel{\\mkern-1.2mu}=");
              // \providecommand*\coloneq{\vcentcolon\mathrel{\mkern-1.2mu}\mathrel{-}}
              defineMacro("\\coloneq", "\\vcentcolon\\mathrel{\\mkern-1.2mu}\\mathrel{-}");
              // \providecommand*\Coloneq{\dblcolon\mathrel{\mkern-1.2mu}\mathrel{-}}
              defineMacro("\\Coloneq", "\\dblcolon\\mathrel{\\mkern-1.2mu}\\mathrel{-}");
              // \providecommand*\eqqcolon{=\mathrel{\mkern-1.2mu}\vcentcolon}
              defineMacro("\\eqqcolon", "=\\mathrel{\\mkern-1.2mu}\\vcentcolon");
              // \providecommand*\Eqqcolon{=\mathrel{\mkern-1.2mu}\dblcolon}
              defineMacro("\\Eqqcolon", "=\\mathrel{\\mkern-1.2mu}\\dblcolon");
              // \providecommand*\eqcolon{\mathrel{-}\mathrel{\mkern-1.2mu}\vcentcolon}
              defineMacro("\\eqcolon", "\\mathrel{-}\\mathrel{\\mkern-1.2mu}\\vcentcolon");
              // \providecommand*\Eqcolon{\mathrel{-}\mathrel{\mkern-1.2mu}\dblcolon}
              defineMacro("\\Eqcolon", "\\mathrel{-}\\mathrel{\\mkern-1.2mu}\\dblcolon");
              // \providecommand*\colonapprox{\vcentcolon\mathrel{\mkern-1.2mu}\approx}
              defineMacro("\\colonapprox", "\\vcentcolon\\mathrel{\\mkern-1.2mu}\\approx");
              // \providecommand*\Colonapprox{\dblcolon\mathrel{\mkern-1.2mu}\approx}
              defineMacro("\\Colonapprox", "\\dblcolon\\mathrel{\\mkern-1.2mu}\\approx");
              // \providecommand*\colonsim{\vcentcolon\mathrel{\mkern-1.2mu}\sim}
              defineMacro("\\colonsim", "\\vcentcolon\\mathrel{\\mkern-1.2mu}\\sim");
              // \providecommand*\Colonsim{\dblcolon\mathrel{\mkern-1.2mu}\sim}
              defineMacro("\\Colonsim", "\\dblcolon\\mathrel{\\mkern-1.2mu}\\sim");

              //////////////////////////////////////////////////////////////////////
              // colonequals.sty

              // Alternate names for mathtools's macros:
              defineMacro("\\ratio", "\\vcentcolon");
              defineMacro("\\coloncolon", "\\dblcolon");
              defineMacro("\\colonequals", "\\coloneqq");
              defineMacro("\\coloncolonequals", "\\Coloneqq");
              defineMacro("\\equalscolon", "\\eqqcolon");
              defineMacro("\\equalscoloncolon", "\\Eqqcolon");
              defineMacro("\\colonminus", "\\coloneq");
              defineMacro("\\coloncolonminus", "\\Coloneq");
              defineMacro("\\minuscolon", "\\eqcolon");
              defineMacro("\\minuscoloncolon", "\\Eqcolon");
              // \colonapprox name is same in mathtools and colonequals.
              defineMacro("\\coloncolonapprox", "\\Colonapprox");
              // \colonsim name is same in mathtools and colonequals.
              defineMacro("\\coloncolonsim", "\\Colonsim");

              // Additional macros, implemented by analogy with mathtools definitions:
              defineMacro("\\simcolon", "\\sim\\mathrel{\\mkern-1.2mu}\\vcentcolon");
              defineMacro("\\simcoloncolon", "\\sim\\mathrel{\\mkern-1.2mu}\\dblcolon");
              defineMacro("\\approxcolon", "\\approx\\mathrel{\\mkern-1.2mu}\\vcentcolon");
              defineMacro("\\approxcoloncolon", "\\approx\\mathrel{\\mkern-1.2mu}\\dblcolon");
            },
            {},
          ],
          45: [
            function (require, module, exports) {
              var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

              var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

              var _createClass2 = require("babel-runtime/helpers/createClass");

              var _createClass3 = _interopRequireDefault(_createClass2);

              var _utils = require("./utils");

              var _utils2 = _interopRequireDefault(_utils);

              function _interopRequireDefault(obj) {
                return obj && obj.__esModule ? obj : { default: obj };
              }

              /**
               * This node represents a general purpose MathML node of any type. The
               * constructor requires the type of node to create (for example, `"mo"` or
               * `"mspace"`, corresponding to `<mo>` and `<mspace>` tags).
               */
              var MathNode = (function () {
                function MathNode(type, children) {
                  (0, _classCallCheck3.default)(this, MathNode);

                  this.type = type;
                  this.attributes = {};
                  this.children = children || [];
                }

                /**
                 * Sets an attribute on a MathML node. MathML depends on attributes to convey a
                 * semantic content, so this is used heavily.
                 */

                (0, _createClass3.default)(MathNode, [
                  {
                    key: "setAttribute",
                    value: function setAttribute(name, value) {
                      this.attributes[name] = value;
                    },

                    /**
                     * Converts the math node into a MathML-namespaced DOM element.
                     */
                  },
                  {
                    key: "toNode",
                    value: function toNode() {
                      var node = document.createElementNS("http://www.w3.org/1998/Math/MathML", this.type);

                      for (var attr in this.attributes) {
                        if (Object.prototype.hasOwnProperty.call(this.attributes, attr)) {
                          node.setAttribute(attr, this.attributes[attr]);
                        }
                      }

                      for (var i = 0; i < this.children.length; i++) {
                        node.appendChild(this.children[i].toNode());
                      }

                      return node;
                    },

                    /**
                     * Converts the math node into an HTML markup string.
                     */
                  },
                  {
                    key: "toMarkup",
                    value: function toMarkup() {
                      var markup = "<" + this.type;

                      // Add the attributes
                      for (var attr in this.attributes) {
                        if (Object.prototype.hasOwnProperty.call(this.attributes, attr)) {
                          markup += " " + attr + '="';
                          markup += _utils2.default.escape(this.attributes[attr]);
                          markup += '"';
                        }
                      }

                      markup += ">";

                      for (var i = 0; i < this.children.length; i++) {
                        markup += this.children[i].toMarkup();
                      }

                      markup += "</" + this.type + ">";

                      return markup;
                    },
                  },
                ]);
                return MathNode;
              })();

              /**
               * This node represents a piece of text.
               */
              /**
               * These objects store data about MathML nodes. This is the MathML equivalent
               * of the types in domTree.js. Since MathML handles its own rendering, and
               * since we're mainly using MathML to improve accessibility, we don't manage
               * any of the styling state that the plain DOM nodes do.
               *
               * The `toNode` and `toMarkup` functions work simlarly to how they do in
               * domTree.js, creating namespaced DOM nodes and HTML text markup respectively.
               */

              var TextNode = (function () {
                function TextNode(text) {
                  (0, _classCallCheck3.default)(this, TextNode);

                  this.text = text;
                }

                /**
                 * Converts the text node into a DOM text node.
                 */

                (0, _createClass3.default)(TextNode, [
                  {
                    key: "toNode",
                    value: function toNode() {
                      return document.createTextNode(this.text);
                    },

                    /**
                     * Converts the text node into HTML markup (which is just the text itself).
                     */
                  },
                  {
                    key: "toMarkup",
                    value: function toMarkup() {
                      return _utils2.default.escape(this.text);
                    },
                  },
                ]);
                return TextNode;
              })();

              module.exports = {
                MathNode: MathNode,
                TextNode: TextNode,
              };
            },
            {
              "./utils": 51,
              "babel-runtime/helpers/classCallCheck": 4,
              "babel-runtime/helpers/createClass": 5,
            },
          ],
          46: [
            function (require, module, exports) {
              var _Parser = require("./Parser");

              var _Parser2 = _interopRequireDefault(_Parser);

              function _interopRequireDefault(obj) {
                return obj && obj.__esModule ? obj : { default: obj };
              }

              /**
               * Parses an expression using a Parser, then returns the parsed result.
               */
              var parseTree = function parseTree(toParse, settings) {
                if (!(typeof toParse === "string" || toParse instanceof String)) {
                  throw new TypeError("KaTeX can only parse string typed expression");
                }
                var parser = new _Parser2.default(toParse, settings);

                return parser.parse();
              }; /**
               * Provides a single function for parsing an expression using a Parser
               * TODO(emily): Remove this
               */

              module.exports = parseTree;
            },
            { "./Parser": 31 },
          ],
          47: [
            function (require, module, exports) {
              /**
               * This file provides support to buildMathML.js and buildHTML.js
               * for stretchy wide elements rendered from SVG files
               * and other CSS trickery.
               */

              var buildCommon = require("./buildCommon");
              var mathMLTree = require("./mathMLTree");
              var utils = require("./utils");

              var stretchyCodePoint = {
                widehat: "^",
                widetilde: "~",
                undertilde: "~",
                overleftarrow: "\u2190",
                underleftarrow: "\u2190",
                xleftarrow: "\u2190",
                overrightarrow: "\u2192",
                underrightarrow: "\u2192",
                xrightarrow: "\u2192",
                underbrace: "\u23B5",
                overbrace: "\u23DE",
                overleftrightarrow: "\u2194",
                underleftrightarrow: "\u2194",
                xleftrightarrow: "\u2194",
                Overrightarrow: "\u21D2",
                xRightarrow: "\u21D2",
                overleftharpoon: "\u21BC",
                xleftharpoonup: "\u21BC",
                overrightharpoon: "\u21C0",
                xrightharpoonup: "\u21C0",
                xLeftarrow: "\u21D0",
                xLeftrightarrow: "\u21D4",
                xhookleftarrow: "\u21A9",
                xhookrightarrow: "\u21AA",
                xmapsto: "\u21A6",
                xrightharpoondown: "\u21C1",
                xleftharpoondown: "\u21BD",
                xrightleftharpoons: "\u21CC",
                xleftrightharpoons: "\u21CB",
                xtwoheadleftarrow: "\u219E",
                xtwoheadrightarrow: "\u21A0",
                xLongequal: "=",
                xtofrom: "\u21C4",
              };

              var mathMLnode = function mathMLnode(label) {
                var node = new mathMLTree.MathNode("mo", [new mathMLTree.TextNode(stretchyCodePoint[label.substr(1)])]);
                node.setAttribute("stretchy", "true");
                return node;
              };

              // In the katexImagesData object just below, the dimensions all
              // correspond to path geometry inside the relevant SVG.
              // For example, \rightarrow uses the same arrowhead as glyph U+2192
              // from the KaTeX Main font. The scaling factor is 1000.
              // That is, inside the font, that arrowhead is 522 units tall, which
              // corresponds to 0.522 em inside the document.
              // And for extensible arrows, we split that distance around the math axis.

              var katexImagesData = {
                // height, depth, imageName, minWidth
                overleftarrow: [0.522, 0, "leftarrow", 0.5],
                underleftarrow: [0.522, 0, "leftarrow", 0.5],
                xleftarrow: [0.261, 0.261, "leftarrow", 0.783],
                overrightarrow: [0.522, 0, "rightarrow", 0.5],
                underrightarrow: [0.522, 0, "rightarrow", 0.5],
                xrightarrow: [0.261, 0.261, "rightarrow", 0.783],
                overbrace: [0.548, 0, "overbrace", 1.6],
                underbrace: [0.548, 0, "underbrace", 1.6],
                overleftrightarrow: [0.522, 0, "leftrightarrow", 0.5],
                underleftrightarrow: [0.522, 0, "leftrightarrow", 0.5],
                xleftrightarrow: [0.261, 0.261, "leftrightarrow", 0.783],
                Overrightarrow: [0.56, 0, "doublerightarrow", 0.5],
                xLeftarrow: [0.28, 0.28, "doubleleftarrow", 0.783],
                xRightarrow: [0.28, 0.28, "doublerightarrow", 0.783],
                xLeftrightarrow: [0.28, 0.28, "doubleleftrightarrow", 0.955],
                overleftharpoon: [0.522, 0, "leftharpoon", 0.5],
                overrightharpoon: [0.522, 0, "rightharpoon", 0.5],
                xleftharpoonup: [0.261, 0.261, "leftharpoon", 0.783],
                xrightharpoonup: [0.261, 0.261, "rightharpoon", 0.783],
                xhookleftarrow: [0.261, 0.261, "hookleftarrow", 0.87],
                xhookrightarrow: [0.261, 0.261, "hookrightarrow", 0.87],
                overlinesegment: [0.414, 0, "linesegment", 0.5],
                underlinesegment: [0.414, 0, "linesegment", 0.5],
                xmapsto: [0.261, 0.261, "mapsto", 0.783],
                xrightharpoondown: [0.261, 0.261, "rightharpoondown", 0.783],
                xleftharpoondown: [0.261, 0.261, "leftharpoondown", 0.783],
                xrightleftharpoons: [0.358, 0.358, "rightleftharpoons", 0.716],
                xleftrightharpoons: [0.358, 0.358, "leftrightharpoons", 0.716],
                overgroup: [0.342, 0, "overgroup", 0.87],
                undergroup: [0.342, 0, "undergroup", 0.87],
                xtwoheadleftarrow: [0.167, 0.167, "twoheadleftarrow", 0.86],
                xtwoheadrightarrow: [0.167, 0.167, "twoheadrightarrow", 0.86],
                xLongequal: [0.167, 0.167, "longequal", 0.5],
                xtofrom: [0.264, 0.264, "tofrom", 0.86],
              };

              // Many of the KaTeX SVG images have been adapted from glyphs in KaTeX fonts.
              // Copyright (c) 2009-2010, Design Science, Inc. (<www.mathjax.org>)
              // Copyright (c) 2014-2017 Khan Academy (<www.khanacademy.org>)
              // Licensed under the SIL Open Font License, Version 1.1.
              // See \nhttp://scripts.sil.org/OFL

              // Nested SVGs
              //    Many of the KaTeX SVG images contain a nested SVG. This is done to
              //    achieve a stretchy image while avoiding distortion of arrowheads or
              //    brace corners.

              //    The inner SVG typically contains a very long (400 em) arrow.

              //    The outer SVG acts like a window that exposes only part of the inner SVG.
              //    The outer SVG will grow or shrink to match the dimensions set by CSS.

              //    The inner SVG always has a longer, thinner aspect ratio than the outer
              //    SVG. After the inner SVG fills 100% of the height of the outer SVG,
              //    there is a long arrow shaft left over. That left-over shaft is not shown.
              //    Instead, it is sliced off because the inner SVG is set to
              //    "preserveAspectRatio='... slice'".

              //    Thus, the reader sees an arrow that matches the subject matter width
              //    without distortion.

              //    Some functions, such as \cancel, need to vary their aspect ratio. These
              //    functions do not get the nested SVG treatment.

              // Second Brush Stroke
              //    Low resolution monitors struggle to display images in fine detail.
              //    So browsers apply anti-aliasing. A long straight arrow shaft therefore
              //    will sometimes appear as if it has a blurred edge.

              //    To mitigate this, these SVG files contain a second "brush-stroke" on the
              //    arrow shafts. That is, a second long thin rectangular SVG path has been
              //    written directly on top of each arrow shaft. This reinforcement causes
              //    some of the screen pixels to display as black instead of the anti-aliased
              //    gray pixel that a  single path would generate. So we get arrow shafts
              //    whose edges appear to be sharper.

              var svgPath = {
                doubleleftarrow:
                  "<path d='M262 157\nl10-10c34-36 62.7-77 86-123 3.3-8 5-13.3 5-16 0-5.3-6.7-8-20-8-7.3\n 0-12.2.5-14.5 1.5-2.3 1-4.8 4.5-7.5 10.5-49.3 97.3-121.7 169.3-217 216-28\n 14-57.3 25-88 33-6.7 2-11 3.8-13 5.5-2 1.7-3 4.2-3 7.5s1 5.8 3 7.5\nc2 1.7 6.3 3.5 13 5.5 68 17.3 128.2 47.8 180.5 91.5 52.3 43.7 93.8 96.2 124.5\n 157.5 9.3 8 15.3 12.3 18 13h6c12-.7 18-4 18-10 0-2-1.7-7-5-15-23.3-46-52-87\n-86-123l-10-10h399738v-40H218c328 0 0 0 0 0l-10-8c-26.7-20-65.7-43-117-69 2.7\n-2 6-3.7 10-5 36.7-16 72.3-37.3 107-64l10-8h399782v-40z\nm8 0v40h399730v-40zm0 194v40h399730v-40z'/>",

                doublerightarrow:
                  "<path d='M399738 392l\n-10 10c-34 36-62.7 77-86 123-3.3 8-5 13.3-5 16 0 5.3 6.7 8 20 8 7.3 0 12.2-.5\n 14.5-1.5 2.3-1 4.8-4.5 7.5-10.5 49.3-97.3 121.7-169.3 217-216 28-14 57.3-25 88\n-33 6.7-2 11-3.8 13-5.5 2-1.7 3-4.2 3-7.5s-1-5.8-3-7.5c-2-1.7-6.3-3.5-13-5.5-68\n-17.3-128.2-47.8-180.5-91.5-52.3-43.7-93.8-96.2-124.5-157.5-9.3-8-15.3-12.3-18\n-13h-6c-12 .7-18 4-18 10 0 2 1.7 7 5 15 23.3 46 52 87 86 123l10 10H0v40h399782\nc-328 0 0 0 0 0l10 8c26.7 20 65.7 43 117 69-2.7 2-6 3.7-10 5-36.7 16-72.3 37.3\n-107 64l-10 8H0v40zM0 157v40h399730v-40zm0 194v40h399730v-40z'/>",

                leftarrow:
                  "<path d='M400000 241H110l3-3c68.7-52.7 113.7-120\n 135-202 4-14.7 6-23 6-25 0-7.3-7-11-21-11-8 0-13.2.8-15.5 2.5-2.3 1.7-4.2 5.8\n-5.5 12.5-1.3 4.7-2.7 10.3-4 17-12 48.7-34.8 92-68.5 130S65.3 228.3 18 247\nc-10 4-16 7.7-18 11 0 8.7 6 14.3 18 17 47.3 18.7 87.8 47 121.5 85S196 441.3 208\n 490c.7 2 1.3 5 2 9s1.2 6.7 1.5 8c.3 1.3 1 3.3 2 6s2.2 4.5 3.5 5.5c1.3 1 3.3\n 1.8 6 2.5s6 1 10 1c14 0 21-3.7 21-11 0-2-2-10.3-6-25-20-79.3-65-146.7-135-202\n l-3-3h399890zM100 241v40h399900v-40z'/>",

                rightarrow:
                  "<path d='M0 241v40h399891c-47.3 35.3-84 78-110 128\n-16.7 32-27.7 63.7-33 95 0 1.3-.2 2.7-.5 4-.3 1.3-.5 2.3-.5 3 0 7.3 6.7 11 20\n 11 8 0 13.2-.8 15.5-2.5 2.3-1.7 4.2-5.5 5.5-11.5 2-13.3 5.7-27 11-41 14.7-44.7\n 39-84.5 73-119.5s73.7-60.2 119-75.5c6-2 9-5.7 9-11s-3-9-9-11c-45.3-15.3-85\n-40.5-119-75.5s-58.3-74.8-73-119.5c-4.7-14-8.3-27.3-11-40-1.3-6.7-3.2-10.8-5.5\n-12.5-2.3-1.7-7.5-2.5-15.5-2.5-14 0-21 3.7-21 11 0 2 2 10.3 6 25 20.7 83.3 67\n 151.7 139 205zm0 0v40h399900v-40z'/>",
              };

              var innerSVG = {
                // Since bcancel's SVG is inline and it omits the viewBox attribute,
                // it's stroke-width will not vary with span area.
                bcancel: "<line x1='0' y1='0' x2='100%' y2='100%' stroke-width='0.046em'/>",

                cancel: "<line x1='0' y1='100%' x2='100%' y2='0' stroke-width='0.046em'/>",

                // The doubleleftarrow geometry is from glyph U+21D0 in the font KaTeX Main
                doubleleftarrow: "><svg viewBox='0 0 400000 549'\npreserveAspectRatio='xMinYMin slice'>" + svgPath["doubleleftarrow"] + "</svg>",

                // doubleleftrightarrow is from glyph U+21D4 in font KaTeX Main
                doubleleftrightarrow:
                  "><svg width='50.1%' viewBox='0 0 400000 549'\npreserveAspectRatio='xMinYMin slice'>" +
                  svgPath["doubleleftarrow"] +
                  "</svg>\n<svg x='50%' width='50%' viewBox='0 0 400000 549' preserveAspectRatio='xMaxYMin\n slice'>" +
                  svgPath["doublerightarrow"] +
                  "</svg>",

                // doublerightarrow is from glyph U+21D2 in font KaTeX Main
                doublerightarrow: "><svg viewBox='0 0 400000 549'\npreserveAspectRatio='xMaxYMin slice'>" + svgPath["doublerightarrow"] + "</svg>",

                // hookleftarrow is from glyph U+21A9 in font KaTeX Main
                hookleftarrow:
                  "><svg width='50.1%' viewBox='0 0 400000 522'\npreserveAspectRatio='xMinYMin slice'>" +
                  svgPath["leftarrow"] +
                  "</svg>\n<svg x='50%' width='50%' viewBox='0 0 400000 522' preserveAspectRatio='xMaxYMin\n slice'><path d='M399859 241c-764 0 0 0 0 0 40-3.3 68.7\n -15.7 86-37 10-12 15-25.3 15-40 0-22.7-9.8-40.7-29.5-54-19.7-13.3-43.5-21-71.5\n -23-17.3-1.3-26-8-26-20 0-13.3 8.7-20 26-20 38 0 71 11.2 99 33.5 0 0 7 5.6 21\n 16.7 14 11.2 21 33.5 21 66.8s-14 61.2-42 83.5c-28 22.3-61 33.5-99 33.5L0 241z\n M0 281v-40h399859v40z'/></svg>",

                // hookrightarrow is from glyph U+21AA in font KaTeX Main
                hookrightarrow:
                  "><svg width='50.1%' viewBox='0 0 400000 522'\npreserveAspectRatio='xMinYMin slice'><path d='M400000 281\nH103s-33-11.2-61-33.5S0 197.3 0 164s14.2-61.2 42.5-83.5C70.8 58.2 104 47 142 47\nc16.7 0 25 6.7 25 20 0 12-8.7 18.7-26 20-40 3.3-68.7 15.7-86 37-10 12-15 25.3\n-15 40 0 22.7 9.8 40.7 29.5 54 19.7 13.3 43.5 21 71.5 23h399859zM103 281v-40\nh399897v40z'/></svg><svg x='50%' width='50%' viewBox='0 0 400000 522'\npreserveAspectRatio='xMaxYMin slice'>" +
                  svgPath["rightarrow"] +
                  "</svg>",

                // leftarrow is from glyph U+2190 in font KaTeX Main
                leftarrow: "><svg viewBox='0 0 400000 522' preserveAspectRatio='xMinYMin\n slice'>" + svgPath["leftarrow"] + "</svg>",

                // leftharpoon is from glyph U+21BD in font KaTeX Main
                leftharpoon:
                  "><svg viewBox='0 0 400000 522' preserveAspectRatio='xMinYMin\n slice'><path d='M0 267c.7 5.3 3 10 7 14h399993v-40H93c3.3\n-3.3 10.2-9.5 20.5-18.5s17.8-15.8 22.5-20.5c50.7-52 88-110.3 112-175 4-11.3 5\n-18.3 3-21-1.3-4-7.3-6-18-6-8 0-13 .7-15 2s-4.7 6.7-8 16c-42 98.7-107.3 174.7\n-196 228-6.7 4.7-10.7 8-12 10-1.3 2-2 5.7-2 11zm100-26v40h399900v-40z'/></svg>",

                // leftharpoondown is from glyph U+21BD in font KaTeX Main
                leftharpoondown:
                  "><svg viewBox='0 0 400000 522'\npreserveAspectRatio='xMinYMin slice'><path d=\"M7 241c-4 4-6.333 8.667-7 14\n 0 5.333.667 9 2 11s5.333 5.333 12 10c90.667 54 156 130 196 228 3.333 10.667\n 6.333 16.333 9 17 2 .667 5 1 9 1h5c10.667 0 16.667-2 18-6 2-2.667 1-9.667-3-21\n -32-87.333-82.667-157.667-152-211l-3-3h399907v-40z\nM93 281 H400000 v-40L7 241z\"/></svg>",

                // leftrightarrow is from glyph U+2194 in font KaTeX Main
                leftrightarrow:
                  "><svg width='50.1%' viewBox='0 0 400000 522'\npreserveAspectRatio='xMinYMin slice'>" +
                  svgPath["leftarrow"] +
                  "</svg>\n<svg x='50%' width='50%' viewBox='0 0 400000 522' preserveAspectRatio='xMaxYMin\n slice'>" +
                  svgPath["rightarrow"] +
                  "</svg>",

                // leftrightharpoons is from glyphs U+21BC/21B1 in font KaTeX Main
                leftrightharpoons:
                  "><svg width='50.1%' viewBox='0 0 400000 716'\npreserveAspectRatio='xMinYMin slice'><path d='M0 267c.7 5.3\n 3 10 7 14h399993v-40H93c3.3-3.3 10.2-9.5 20.5-18.5s17.8-15.8 22.5-20.5c50.7-52\n 88-110.3 112-175 4-11.3 5-18.3 3-21-1.3-4-7.3-6-18-6-8 0-13 .7-15 2s-4.7 6.7-8\n 16c-42 98.7-107.3 174.7-196 228-6.7 4.7-10.7 8-12 10-1.3 2-2 5.7-2 11zm100-26\nv40h399900v-40zM0 435v40h400000v-40zm0 0v40h400000v-40z'/></svg>\n<svg x='50%' width='50%' viewBox='0 0 400000 716' preserveAspectRatio='xMaxYMin\n slice'><path d='M399747 705c0 7.3 6.7 11 20 11 8 0 13-.8\n 15-2.5s4.7-6.8 8-15.5c40-94 99.3-166.3 178-217 13.3-8 20.3-12.3 21-13 5.3-3.3\n 8.5-5.8 9.5-7.5 1-1.7 1.5-5.2 1.5-10.5s-2.3-10.3-7-15H0v40h399908c-34 25.3\n-64.7 57-92 95-27.3 38-48.7 77.7-64 119-3.3 8.7-5 14-5 16zM0 435v40h399900v-40z\nm0-194v40h400000v-40zm0 0v40h400000v-40z'/></svg>",

                linesegment:
                  "><svg width='50.1%' viewBox='0 0 400000 414'\npreserveAspectRatio='xMinYMin slice'><path d='M40 187V40H0\nv334h40V227h399960v-40zm0 0V40H0v334h40V227h399960v-40z'/></svg><svg x='50%'\nwidth='50%' viewBox='0 0 400000 414' preserveAspectRatio='xMaxYMin slice'>\n<path d='M0 187v40h399960v147h40V40h-40v147zm0\n 0v40h399960v147h40V40h-40v147z'/></svg>",

                longequal: " viewBox='0 0 100 334' preserveAspectRatio='none'>\n<path d='M0 50h100v40H0zm0 194h100v40H0z'/>",

                // mapsto is from glyph U+21A6 in font KaTeX Main
                mapsto:
                  "><svg width='50.1%' viewBox='0 0 400000 522'\npreserveAspectRatio='xMinYMin slice'><path d='M40 241c740\n 0 0 0 0 0v-75c0-40.7-.2-64.3-.5-71-.3-6.7-2.2-11.7-5.5-15-4-4-8.7-6-14-6-5.3 0\n-10 2-14 6C2.7 83.3.8 91.3.5 104 .2 116.7 0 169 0 261c0 114 .7 172.3 2 175 4 8\n 10 12 18 12 5.3 0 10-2 14-6 3.3-3.3 5.2-8.3 5.5-15 .3-6.7.5-30.3.5-71v-75\nh399960zm0 0v40h399960v-40z'/></svg><svg x='50%' width='50%' viewBox='0 0\n 400000 522' preserveAspectRatio='xMaxYMin slice'>" +
                  svgPath["rightarrow"] +
                  "</svg>",

                // overbrace is from glyphs U+23A9/23A8/23A7 in font KaTeX_Size4-Regular
                overbrace:
                  "><svg width='25.5%' viewBox='0 0 400000 548'\npreserveAspectRatio='xMinYMin slice'><path d='M6 548l-6-6\nv-35l6-11c56-104 135.3-181.3 238-232 57.3-28.7 117-45 179-50h399577v120H403\nc-43.3 7-81 15-113 26-100.7 33-179.7 91-237 174-2.7 5-6 9-10 13-.7 1-7.3 1-20 1\nH6z'/></svg><svg x='25%' width='50%' viewBox='0 0 400000 548'\npreserveAspectRatio='xMidYMin slice'><path d='M200428 334\nc-100.7-8.3-195.3-44-280-108-55.3-42-101.7-93-139-153l-9-14c-2.7 4-5.7 8.7-9 14\n-53.3 86.7-123.7 153-211 199-66.7 36-137.3 56.3-212 62H0V214h199568c178.3-11.7\n 311.7-78.3 403-201 6-8 9.7-12 11-12 .7-.7 6.7-1 18-1s17.3.3 18 1c1.3 0 5 4 11\n 12 44.7 59.3 101.3 106.3 170 141s145.3 54.3 229 60h199572v120z'/></svg>\n<svg x='74.9%' width='24.1%' viewBox='0 0 400000 548'\npreserveAspectRatio='xMaxYMin slice'><path d='M400000 542l\n-6 6h-17c-12.7 0-19.3-.3-20-1-4-4-7.3-8.3-10-13-35.3-51.3-80.8-93.8-136.5-127.5\ns-117.2-55.8-184.5-66.5c-.7 0-2-.3-4-1-18.7-2.7-76-4.3-172-5H0V214h399571l6 1\nc124.7 8 235 61.7 331 161 31.3 33.3 59.7 72.7 85 118l7 13v35z'/></svg>",

                // overgroup is from the MnSymbol package (public domain)
                overgroup:
                  "><svg width='50.1%' viewBox='0 0 400000 342'\npreserveAspectRatio='xMinYMin slice'><path d='M400000 80\nH435C64 80 168.3 229.4 21 260c-5.9 1.2-18 0-18 0-2 0-3-1-3-3v-38C76 61 257 0\n 435 0h399565z'/></svg><svg x='50%' width='50%' viewBox='0 0 400000 342'\npreserveAspectRatio='xMaxYMin slice'><path d='M0 80h399565\nc371 0 266.7 149.4 414 180 5.9 1.2 18 0 18 0 2 0 3-1 3-3v-38\nc-76-158-257-219-435-219H0z'/></svg>",

                // rightarrow is from glyph U+2192 in font KaTeX Main
                rightarrow: "><svg viewBox='0 0 400000 522' preserveAspectRatio='xMaxYMin\n slice'>" + svgPath["rightarrow"] + "</svg>",

                // rightharpoon is from glyph U+21C0 in font KaTeX Main
                rightharpoon:
                  "><svg viewBox='0 0 400000 522' preserveAspectRatio='xMaxYMin\n slice'><path d='M0 241v40h399993c4.7-4.7 7-9.3 7-14 0-9.3\n-3.7-15.3-11-18-92.7-56.7-159-133.7-199-231-3.3-9.3-6-14.7-8-16-2-1.3-7-2-15-2\n-10.7 0-16.7 2-18 6-2 2.7-1 9.7 3 21 15.3 42 36.7 81.8 64 119.5 27.3 37.7 58\n 69.2 92 94.5zm0 0v40h399900v-40z'/></svg>",

                // rightharpoondown is from glyph U+21C1 in font KaTeX Main
                rightharpoondown:
                  "><svg viewBox='0 0 400000 522'\npreserveAspectRatio='xMaxYMin slice'><path d='M399747 511\nc0 7.3 6.7 11 20 11 8 0 13-.8 15-2.5s4.7-6.8 8-15.5c40-94 99.3-166.3 178-217\n 13.3-8 20.3-12.3 21-13 5.3-3.3 8.5-5.8 9.5-7.5 1-1.7 1.5-5.2 1.5-10.5s-2.3\n -10.3-7-15H0v40h399908c-34 25.3-64.7 57-92 95-27.3 38-48.7 77.7-64 119-3.3\n 8.7-5 14-5 16zM0 241v40h399900v-40z'/></svg>",

                // rightleftharpoons is from glyph U+21CC in font KaTeX Main
                rightleftharpoons:
                  "><svg width='50%' viewBox='0 0 400000 716'\npreserveAspectRatio='xMinYMin slice'><path d='M7 435c-4 4\n-6.3 8.7-7 14 0 5.3.7 9 2 11s5.3 5.3 12 10c90.7 54 156 130 196 228 3.3 10.7 6.3\n 16.3 9 17 2 .7 5 1 9 1h5c10.7 0 16.7-2 18-6 2-2.7 1-9.7-3-21-32-87.3-82.7\n-157.7-152-211l-3-3h399907v-40H7zm93 0v40h399900v-40zM0 241v40h399900v-40z\nm0 0v40h399900v-40z'/></svg><svg x='50%' width='50%' viewBox='0 0 400000 716'\npreserveAspectRatio='xMaxYMin slice'><path d='M0 241v40\nh399993c4.7-4.7 7-9.3 7-14 0-9.3-3.7-15.3-11-18-92.7-56.7-159-133.7-199-231-3.3\n-9.3-6-14.7-8-16-2-1.3-7-2-15-2-10.7 0-16.7 2-18 6-2 2.7-1 9.7 3 21 15.3 42\n 36.7 81.8 64 119.5 27.3 37.7 58 69.2 92 94.5zm0 0v40h399900v-40z\n m100 194v40h399900v-40zm0 0v40h399900v-40z'/></svg>",

                // tilde1 is a modified version of a glyph from the MnSymbol package
                tilde1:
                  " viewBox='0 0 600 260' preserveAspectRatio='none'>\n<path d='M200 55.538c-77 0-168 73.953-177 73.953-3 0-7\n-2.175-9-5.437L2 97c-1-2-2-4-2-6 0-4 2-7 5-9l20-12C116 12 171 0 207 0c86 0\n 114 68 191 68 78 0 168-68 177-68 4 0 7 2 9 5l12 19c1 2.175 2 4.35 2 6.525 0\n 4.35-2 7.613-5 9.788l-19 13.05c-92 63.077-116.937 75.308-183 76.128\n-68.267.847-113-73.952-191-73.952z'/>",

                // Ditto tilde2, tilde3, and tilde 4
                tilde2:
                  " viewBox='0 0 1033 286' preserveAspectRatio='none'>\n<path d='M344 55.266c-142 0-300.638 81.316-311.5 86.418\n-8.01 3.762-22.5 10.91-23.5 5.562L1 120c-1-2-1-3-1-4 0-5 3-9 8-10l18.4-9C160.9\n 31.9 283 0 358 0c148 0 188 122 331 122s314-97 326-97c4 0 8 2 10 7l7 21.114\nc1 2.14 1 3.21 1 4.28 0 5.347-3 9.626-7 10.696l-22.3 12.622C852.6 158.372 751\n 181.476 676 181.476c-149 0-189-126.21-332-126.21z'/>",

                tilde3:
                  " viewBox='0 0 2339 306' preserveAspectRatio='none'>\n<path d='M786 59C457 59 32 175.242 13 175.242c-6 0-10-3.457\n-11-10.37L.15 138c-1-7 3-12 10-13l19.2-6.4C378.4 40.7 634.3 0 804.3 0c337 0\n 411.8 157 746.8 157 328 0 754-112 773-112 5 0 10 3 11 9l1 14.075c1 8.066-.697\n 16.595-6.697 17.492l-21.052 7.31c-367.9 98.146-609.15 122.696-778.15 122.696\n -338 0-409-156.573-744-156.573z'/>",

                tilde4:
                  " viewBox='0 0 2340 312' preserveAspectRatio='none'>\n<path d='M786 58C457 58 32 177.487 13 177.487c-6 0-10-3.345\n-11-10.035L.15 143c-1-7 3-12 10-13l22-6.7C381.2 35 637.15 0 807.15 0c337 0 409\n 177 744 177 328 0 754-127 773-127 5 0 10 3 11 9l1 14.794c1 7.805-3 13.38-9\n 14.495l-20.7 5.574c-366.85 99.79-607.3 139.372-776.3 139.372-338 0-409\n -175.236-744-175.236z'/>",

                // tofrom is from glyph U+21C4 in font KaTeX AMS Regular
                tofrom:
                  "><svg width='50.1%' viewBox='0 0 400000 528'\npreserveAspectRatio='xMinYMin slice'><path d='M0 147h400000\nv40H0zm0 214c68 40 115.7 95.7 143 167h22c15.3 0 23-.3 23-1 0-1.3-5.3-13.7-16-37\n-18-35.3-41.3-69-70-101l-7-8h399905v-40H95l7-8c28.7-32 52-65.7 70-101 10.7-23.3\n 16-35.7 16-37 0-.7-7.7-1-23-1h-22C115.7 265.3 68 321 0 361zm0-174v-40h399900\nv40zm100 154v40h399900v-40z'/></svg><svg x='50%' width='50%' viewBox='0 0\n 400000 528' preserveAspectRatio='xMaxYMin slice'><path\nd='M400000 167c-70.7-42-118-97.7-142-167h-23c-15.3 0-23 .3-23 1 0 1.3 5.3 13.7\n 16 37 18 35.3 41.3 69 70 101l7 8H0v40h399905l-7 8c-28.7 32-52 65.7-70 101-10.7\n 23.3-16 35.7-16 37 0 .7 7.7 1 23 1h23c24-69.3 71.3-125 142-167z\n M100 147v40h399900v-40zM0 341v40h399900v-40z'/></svg>",

                // twoheadleftarrow is from glyph U+219E in font KaTeX AMS Regular
                twoheadleftarrow:
                  "><svg viewBox='0 0 400000 334'\npreserveAspectRatio='xMinYMin slice'><path d='M0 167c68 40\n 115.7 95.7 143 167h22c15.3 0 23-.3 23-1 0-1.3-5.3-13.7-16-37-18-35.3-41.3-69\n-70-101l-7-8h125l9 7c50.7 39.3 85 86 103 140h46c0-4.7-6.3-18.7-19-42-18-35.3\n-40-67.3-66-96l-9-9h399716v-40H284l9-9c26-28.7 48-60.7 66-96 12.7-23.333 19\n-37.333 19-42h-46c-18 54-52.3 100.7-103 140l-9 7H95l7-8c28.7-32 52-65.7 70-101\n 10.7-23.333 16-35.7 16-37 0-.7-7.7-1-23-1h-22C115.7 71.3 68 127 0 167z'/>\n</svg>",

                // twoheadrightarrow is from glyph U+21A0 in font KaTeX AMS Regular
                twoheadrightarrow:
                  "><svg viewBox='0 0 400000 334'\npreserveAspectRatio='xMaxYMin slice'><path d='M400000 167\nc-68-40-115.7-95.7-143-167h-22c-15.3 0-23 .3-23 1 0 1.3 5.3 13.7 16 37 18 35.3\n 41.3 69 70 101l7 8h-125l-9-7c-50.7-39.3-85-86-103-140h-46c0 4.7 6.3 18.7 19 42\n 18 35.3 40 67.3 66 96l9 9H0v40h399716l-9 9c-26 28.7-48 60.7-66 96-12.7 23.333\n-19 37.333-19 42h46c18-54 52.3-100.7 103-140l9-7h125l-7 8c-28.7 32-52 65.7-70\n 101-10.7 23.333-16 35.7-16 37 0 .7 7.7 1 23 1h22c27.3-71.3 75-127 143-167z'/>\n</svg>",

                // underbrace is from glyphs U+23A9/23A8/23A7 in font KaTeX_Size4-Regular
                underbrace:
                  "><svg width='25.1%' viewBox='0 0 400000 548'\npreserveAspectRatio='xMinYMin slice'><path d='M0 6l6-6h17\nc12.688 0 19.313.3 20 1 4 4 7.313 8.3 10 13 35.313 51.3 80.813 93.8 136.5 127.5\n 55.688 33.7 117.188 55.8 184.5 66.5.688 0 2 .3 4 1 18.688 2.7 76 4.3 172 5\nh399450v120H429l-6-1c-124.688-8-235-61.7-331-161C60.687 138.7 32.312 99.3 7 54\nL0 41V6z'/></svg><svg x='25%' width='50%' viewBox='0 0 400000 548'\npreserveAspectRatio='xMidYMin slice'><path d='M199572 214\nc100.7 8.3 195.3 44 280 108 55.3 42 101.7 93 139 153l9 14c2.7-4 5.7-8.7 9-14\n 53.3-86.7 123.7-153 211-199 66.7-36 137.3-56.3 212-62h199568v120H200432c-178.3\n 11.7-311.7 78.3-403 201-6 8-9.7 12-11 12-.7.7-6.7 1-18 1s-17.3-.3-18-1c-1.3 0\n-5-4-11-12-44.7-59.3-101.3-106.3-170-141s-145.3-54.3-229-60H0V214z'/></svg>\n<svg x='74.9%' width='25.1%' viewBox='0 0 400000 548'\npreserveAspectRatio='xMaxYMin slice'><path d='M399994 0l6 6\nv35l-6 11c-56 104-135.3 181.3-238 232-57.3 28.7-117 45-179 50H-300V214h399897\nc43.3-7 81-15 113-26 100.7-33 179.7-91 237-174 2.7-5 6-9 10-13 .7-1 7.3-1 20-1\nh17z'/></svg>",

                // undergroup is from the MnSymbol package (public domain)
                undergroup:
                  "><svg width='50.1%' viewBox='0 0 400000 342'\npreserveAspectRatio='xMinYMin slice'><path d='M400000 262\nH435C64 262 168.3 112.6 21 82c-5.9-1.2-18 0-18 0-2 0-3 1-3 3v38c76 158 257 219\n 435 219h399565z'/></svg><svg x='50%' width='50%' viewBox='0 0 400000 342'\npreserveAspectRatio='xMaxYMin slice'><path d='M0 262h399565\nc371 0 266.7-149.4 414-180 5.9-1.2 18 0 18 0 2 0 3 1 3 3v38c-76 158-257\n 219-435 219H0z'/></svg>",

                // widehat1 is a modified version of a glyph from the MnSymbol package
                widehat1:
                  " viewBox='0 0 1062 239' preserveAspectRatio='none'>\n<path d='M529 0h5l519 115c5 1 9 5 9 10 0 1-1 2-1 3l-4 22\nc-1 5-5 9-11 9h-2L532 67 19 159h-2c-5 0-9-4-11-9l-5-22c-1-6 2-12 8-13z'/>",

                // Ditto widehat2, widehat3, and widehat4
                widehat2:
                  " viewBox='0 0 2364 300' preserveAspectRatio='none'>\n<path d='M1181 0h2l1171 176c6 0 10 5 10 11l-2 23c-1 6-5 10\n-11 10h-1L1182 67 15 220h-1c-6 0-10-4-11-10l-2-23c-1-6 4-11 10-11z'/>",

                widehat3:
                  " viewBox='0 0 2364 360' preserveAspectRatio='none'>\n<path d='M1181 0h2l1171 236c6 0 10 5 10 11l-2 23c-1 6-5 10\n-11 10h-1L1182 67 15 280h-1c-6 0-10-4-11-10l-2-23c-1-6 4-11 10-11z'/>",

                widehat4:
                  " viewBox='0 0 2364 420' preserveAspectRatio='none'>\n<path d='M1181 0h2l1171 296c6 0 10 5 10 11l-2 23c-1 6-5 10\n-11 10h-1L1182 67 15 340h-1c-6 0-10-4-11-10l-2-23c-1-6 4-11 10-11z'/>",

                xcancel:
                  "<line x1='0' y1='0' x2='100%' y2='100%' stroke-width='0.046em'/>\n<line x1='0' y1='100%' x2='100%' y2='0' stroke-width='0.046em'/>",
              };

              var svgSpan = function svgSpan(group, options) {
                // Create a span with inline SVG for the element.
                var label = group.value.label.substr(1);
                var height = 0;
                var depth = 0;
                var imageName = "";
                var minWidth = 0;

                if (utils.contains(["widehat", "widetilde", "undertilde"], label)) {
                  // There are four SVG images available for each function.
                  // Choose a taller image when there are more characters.
                  var numChars = group.value.value.length;
                  if (numChars > 5) {
                    height = 0.312;
                    imageName = (label === "widehat" ? "widehat" : "tilde") + "4";
                  } else {
                    var imgIndex = [1, 1, 2, 2, 3, 3][numChars];
                    if (label === "widehat") {
                      height = [0, 0.24, 0.3, 0.3, 0.36, 0.36][numChars];
                      imageName = "widehat" + imgIndex;
                    } else {
                      height = [0, 0.26, 0.3, 0.3, 0.34, 0.34][numChars];
                      imageName = "tilde" + imgIndex;
                    }
                  }
                } else {
                  var imgData = katexImagesData[label];
                  height = imgData[0];
                  depth = imgData[1];
                  imageName = imgData[2];
                  minWidth = imgData[3];
                }

                var span = buildCommon.makeSpan([], [], options);
                span.height = height;
                span.depth = depth;
                var totalHeight = height + depth;
                span.style.height = totalHeight + "em";
                if (minWidth > 0) {
                  span.style.minWidth = minWidth + "em";
                }

                span.innerHTML = "<svg width='100%' height='" + totalHeight + "em'" + innerSVG[imageName] + "</svg>";

                return span;
              };

              var encloseSpan = function encloseSpan(inner, label, pad, options) {
                // Return an image span for \cancel, \bcancel, \xcancel, or \fbox
                var img = void 0;
                var totalHeight = inner.height + inner.depth + 2 * pad;

                if (label === "fbox") {
                  img = buildCommon.makeSpan(["stretchy", label], [], options);
                  if (options.color) {
                    img.style.borderColor = options.getColor();
                  }
                } else {
                  img = buildCommon.makeSpan([], [], options);
                  img.innerHTML = "<svg width='100%' height='" + totalHeight + "em'>" + innerSVG[label] + "</svg>";
                }

                img.height = totalHeight;
                img.style.height = totalHeight + "em";

                return img;
              };

              module.exports = {
                encloseSpan: encloseSpan,
                mathMLnode: mathMLnode,
                svgSpan: svgSpan,
              };
            },
            {
              "./buildCommon": 34,
              "./mathMLTree": 45,
              "./utils": 51,
            },
          ],
          48: [
            function (require, module, exports) {
              /**
   * This file holds a list of all no-argument functions and single-character
   * symbols (like 'a' or ';').
   *
   * For each of the symbols, there are three properties they can have:
   * - font (required): the font to be used for this symbol. Either "main" (the
       normal font), or "ams" (the ams fonts).
   * - group (required): the ParseNode group type the symbol should have (i.e.
       "textord", "mathord", etc).
       See https://github.com/Khan/KaTeX/wiki/Examining-TeX#group-types
   * - replace: the character that this symbol or function should be
   *   replaced with (i.e. "\phi" has a replace value of "\u03d5", the phi
   *   character in the main font).
   *
   * The outermost map in the table indicates what mode the symbols should be
   * accepted in (e.g. "math" or "text").
   */

              module.exports = {
                math: {},
                text: {},
              };

              function defineSymbol(mode, font, group, replace, name, acceptUnicodeChar) {
                module.exports[mode][name] = {
                  font: font,
                  group: group,
                  replace: replace,
                };

                if (acceptUnicodeChar) {
                  module.exports[mode][replace] = module.exports[mode][name];
                }
              }

              // Some abbreviations for commonly used strings.
              // This helps minify the code, and also spotting typos using jshint.

              // modes:
              var math = "math";
              var text = "text";

              // fonts:
              var main = "main";
              var ams = "ams";

              // groups:
              var accent = "accent";
              var bin = "bin";
              var close = "close";
              var inner = "inner";
              var mathord = "mathord";
              var op = "op";
              var open = "open";
              var punct = "punct";
              var rel = "rel";
              var spacing = "spacing";
              var textord = "textord";

              // Now comes the symbol table

              // Relation Symbols
              defineSymbol(math, main, rel, "\u2261", "\\equiv");
              defineSymbol(math, main, rel, "\u227A", "\\prec");
              defineSymbol(math, main, rel, "\u227B", "\\succ");
              defineSymbol(math, main, rel, "\u223C", "\\sim");
              defineSymbol(math, main, rel, "\u22A5", "\\perp");
              defineSymbol(math, main, rel, "\u2AAF", "\\preceq");
              defineSymbol(math, main, rel, "\u2AB0", "\\succeq");
              defineSymbol(math, main, rel, "\u2243", "\\simeq");
              defineSymbol(math, main, rel, "\u2223", "\\mid");
              defineSymbol(math, main, rel, "\u226A", "\\ll");
              defineSymbol(math, main, rel, "\u226B", "\\gg");
              defineSymbol(math, main, rel, "\u224D", "\\asymp");
              defineSymbol(math, main, rel, "\u2225", "\\parallel");
              defineSymbol(math, main, rel, "\u22C8", "\\bowtie");
              defineSymbol(math, main, rel, "\u2323", "\\smile");
              defineSymbol(math, main, rel, "\u2291", "\\sqsubseteq");
              defineSymbol(math, main, rel, "\u2292", "\\sqsupseteq");
              defineSymbol(math, main, rel, "\u2250", "\\doteq");
              defineSymbol(math, main, rel, "\u2322", "\\frown");
              defineSymbol(math, main, rel, "\u220B", "\\ni");
              defineSymbol(math, main, rel, "\u221D", "\\propto");
              defineSymbol(math, main, rel, "\u22A2", "\\vdash");
              defineSymbol(math, main, rel, "\u22A3", "\\dashv");
              defineSymbol(math, main, rel, "\u220B", "\\owns");

              // Punctuation
              defineSymbol(math, main, punct, ".", "\\ldotp");
              defineSymbol(math, main, punct, "\u22C5", "\\cdotp");

              // Misc Symbols
              defineSymbol(math, main, textord, "#", "\\#");
              defineSymbol(text, main, textord, "#", "\\#");
              defineSymbol(math, main, textord, "&", "\\&");
              defineSymbol(text, main, textord, "&", "\\&");
              defineSymbol(math, main, textord, "\u2135", "\\aleph");
              defineSymbol(math, main, textord, "\u2200", "\\forall");
              defineSymbol(math, main, textord, "\u210F", "\\hbar");
              defineSymbol(math, main, textord, "\u2203", "\\exists");
              defineSymbol(math, main, textord, "\u2207", "\\nabla");
              defineSymbol(math, main, textord, "\u266D", "\\flat");
              defineSymbol(math, main, textord, "\u2113", "\\ell");
              defineSymbol(math, main, textord, "\u266E", "\\natural");
              defineSymbol(math, main, textord, "\u2663", "\\clubsuit");
              defineSymbol(math, main, textord, "\u2118", "\\wp");
              defineSymbol(math, main, textord, "\u266F", "\\sharp");
              defineSymbol(math, main, textord, "\u2662", "\\diamondsuit");
              defineSymbol(math, main, textord, "\u211C", "\\Re");
              defineSymbol(math, main, textord, "\u2661", "\\heartsuit");
              defineSymbol(math, main, textord, "\u2111", "\\Im");
              defineSymbol(math, main, textord, "\u2660", "\\spadesuit");

              // Math and Text
              defineSymbol(math, main, textord, "\u2020", "\\dag");
              defineSymbol(text, main, textord, "\u2020", "\\dag");
              defineSymbol(text, main, textord, "\u2020", "\\textdagger");
              defineSymbol(math, main, textord, "\u2021", "\\ddag");
              defineSymbol(text, main, textord, "\u2021", "\\ddag");
              defineSymbol(text, main, textord, "\u2020", "\\textdaggerdbl");

              // Large Delimiters
              defineSymbol(math, main, close, "\u23B1", "\\rmoustache");
              defineSymbol(math, main, open, "\u23B0", "\\lmoustache");
              defineSymbol(math, main, close, "\u27EF", "\\rgroup");
              defineSymbol(math, main, open, "\u27EE", "\\lgroup");

              // Binary Operators
              defineSymbol(math, main, bin, "\u2213", "\\mp");
              defineSymbol(math, main, bin, "\u2296", "\\ominus");
              defineSymbol(math, main, bin, "\u228E", "\\uplus");
              defineSymbol(math, main, bin, "\u2293", "\\sqcap");
              defineSymbol(math, main, bin, "\u2217", "\\ast");
              defineSymbol(math, main, bin, "\u2294", "\\sqcup");
              defineSymbol(math, main, bin, "\u25EF", "\\bigcirc");
              defineSymbol(math, main, bin, "\u2219", "\\bullet");
              defineSymbol(math, main, bin, "\u2021", "\\ddagger");
              defineSymbol(math, main, bin, "\u2240", "\\wr");
              defineSymbol(math, main, bin, "\u2A3F", "\\amalg");

              // Arrow Symbols
              defineSymbol(math, main, rel, "\u27F5", "\\longleftarrow");
              defineSymbol(math, main, rel, "\u21D0", "\\Leftarrow");
              defineSymbol(math, main, rel, "\u27F8", "\\Longleftarrow");
              defineSymbol(math, main, rel, "\u27F6", "\\longrightarrow");
              defineSymbol(math, main, rel, "\u21D2", "\\Rightarrow");
              defineSymbol(math, main, rel, "\u27F9", "\\Longrightarrow");
              defineSymbol(math, main, rel, "\u2194", "\\leftrightarrow");
              defineSymbol(math, main, rel, "\u27F7", "\\longleftrightarrow");
              defineSymbol(math, main, rel, "\u21D4", "\\Leftrightarrow");
              defineSymbol(math, main, rel, "\u27FA", "\\Longleftrightarrow");
              defineSymbol(math, main, rel, "\u21A6", "\\mapsto");
              defineSymbol(math, main, rel, "\u27FC", "\\longmapsto");
              defineSymbol(math, main, rel, "\u2197", "\\nearrow");
              defineSymbol(math, main, rel, "\u21A9", "\\hookleftarrow");
              defineSymbol(math, main, rel, "\u21AA", "\\hookrightarrow");
              defineSymbol(math, main, rel, "\u2198", "\\searrow");
              defineSymbol(math, main, rel, "\u21BC", "\\leftharpoonup");
              defineSymbol(math, main, rel, "\u21C0", "\\rightharpoonup");
              defineSymbol(math, main, rel, "\u2199", "\\swarrow");
              defineSymbol(math, main, rel, "\u21BD", "\\leftharpoondown");
              defineSymbol(math, main, rel, "\u21C1", "\\rightharpoondown");
              defineSymbol(math, main, rel, "\u2196", "\\nwarrow");
              defineSymbol(math, main, rel, "\u21CC", "\\rightleftharpoons");

              // AMS Negated Binary Relations
              defineSymbol(math, ams, rel, "\u226E", "\\nless");
              defineSymbol(math, ams, rel, "\uE010", "\\nleqslant");
              defineSymbol(math, ams, rel, "\uE011", "\\nleqq");
              defineSymbol(math, ams, rel, "\u2A87", "\\lneq");
              defineSymbol(math, ams, rel, "\u2268", "\\lneqq");
              defineSymbol(math, ams, rel, "\uE00C", "\\lvertneqq");
              defineSymbol(math, ams, rel, "\u22E6", "\\lnsim");
              defineSymbol(math, ams, rel, "\u2A89", "\\lnapprox");
              defineSymbol(math, ams, rel, "\u2280", "\\nprec");
              defineSymbol(math, ams, rel, "\u22E0", "\\npreceq");
              defineSymbol(math, ams, rel, "\u22E8", "\\precnsim");
              defineSymbol(math, ams, rel, "\u2AB9", "\\precnapprox");
              defineSymbol(math, ams, rel, "\u2241", "\\nsim");
              defineSymbol(math, ams, rel, "\uE006", "\\nshortmid");
              defineSymbol(math, ams, rel, "\u2224", "\\nmid");
              defineSymbol(math, ams, rel, "\u22AC", "\\nvdash");
              defineSymbol(math, ams, rel, "\u22AD", "\\nvDash");
              defineSymbol(math, ams, rel, "\u22EA", "\\ntriangleleft");
              defineSymbol(math, ams, rel, "\u22EC", "\\ntrianglelefteq");
              defineSymbol(math, ams, rel, "\u228A", "\\subsetneq");
              defineSymbol(math, ams, rel, "\uE01A", "\\varsubsetneq");
              defineSymbol(math, ams, rel, "\u2ACB", "\\subsetneqq");
              defineSymbol(math, ams, rel, "\uE017", "\\varsubsetneqq");
              defineSymbol(math, ams, rel, "\u226F", "\\ngtr");
              defineSymbol(math, ams, rel, "\uE00F", "\\ngeqslant");
              defineSymbol(math, ams, rel, "\uE00E", "\\ngeqq");
              defineSymbol(math, ams, rel, "\u2A88", "\\gneq");
              defineSymbol(math, ams, rel, "\u2269", "\\gneqq");
              defineSymbol(math, ams, rel, "\uE00D", "\\gvertneqq");
              defineSymbol(math, ams, rel, "\u22E7", "\\gnsim");
              defineSymbol(math, ams, rel, "\u2A8A", "\\gnapprox");
              defineSymbol(math, ams, rel, "\u2281", "\\nsucc");
              defineSymbol(math, ams, rel, "\u22E1", "\\nsucceq");
              defineSymbol(math, ams, rel, "\u22E9", "\\succnsim");
              defineSymbol(math, ams, rel, "\u2ABA", "\\succnapprox");
              defineSymbol(math, ams, rel, "\u2246", "\\ncong");
              defineSymbol(math, ams, rel, "\uE007", "\\nshortparallel");
              defineSymbol(math, ams, rel, "\u2226", "\\nparallel");
              defineSymbol(math, ams, rel, "\u22AF", "\\nVDash");
              defineSymbol(math, ams, rel, "\u22EB", "\\ntriangleright");
              defineSymbol(math, ams, rel, "\u22ED", "\\ntrianglerighteq");
              defineSymbol(math, ams, rel, "\uE018", "\\nsupseteqq");
              defineSymbol(math, ams, rel, "\u228B", "\\supsetneq");
              defineSymbol(math, ams, rel, "\uE01B", "\\varsupsetneq");
              defineSymbol(math, ams, rel, "\u2ACC", "\\supsetneqq");
              defineSymbol(math, ams, rel, "\uE019", "\\varsupsetneqq");
              defineSymbol(math, ams, rel, "\u22AE", "\\nVdash");
              defineSymbol(math, ams, rel, "\u2AB5", "\\precneqq");
              defineSymbol(math, ams, rel, "\u2AB6", "\\succneqq");
              defineSymbol(math, ams, rel, "\uE016", "\\nsubseteqq");
              defineSymbol(math, ams, bin, "\u22B4", "\\unlhd");
              defineSymbol(math, ams, bin, "\u22B5", "\\unrhd");

              // AMS Negated Arrows
              defineSymbol(math, ams, rel, "\u219A", "\\nleftarrow");
              defineSymbol(math, ams, rel, "\u219B", "\\nrightarrow");
              defineSymbol(math, ams, rel, "\u21CD", "\\nLeftarrow");
              defineSymbol(math, ams, rel, "\u21CF", "\\nRightarrow");
              defineSymbol(math, ams, rel, "\u21AE", "\\nleftrightarrow");
              defineSymbol(math, ams, rel, "\u21CE", "\\nLeftrightarrow");

              // AMS Misc
              defineSymbol(math, ams, rel, "\u25B3", "\\vartriangle");
              defineSymbol(math, ams, textord, "\u210F", "\\hslash");
              defineSymbol(math, ams, textord, "\u25BD", "\\triangledown");
              defineSymbol(math, ams, textord, "\u25CA", "\\lozenge");
              defineSymbol(math, ams, textord, "\u24C8", "\\circledS");
              defineSymbol(math, ams, textord, "\xAE", "\\circledR");
              defineSymbol(text, ams, textord, "\xAE", "\\circledR");
              defineSymbol(math, ams, textord, "\u2221", "\\measuredangle");
              defineSymbol(math, ams, textord, "\u2204", "\\nexists");
              defineSymbol(math, ams, textord, "\u2127", "\\mho");
              defineSymbol(math, ams, textord, "\u2132", "\\Finv");
              defineSymbol(math, ams, textord, "\u2141", "\\Game");
              defineSymbol(math, ams, textord, "k", "\\Bbbk");
              defineSymbol(math, ams, textord, "\u2035", "\\backprime");
              defineSymbol(math, ams, textord, "\u25B2", "\\blacktriangle");
              defineSymbol(math, ams, textord, "\u25BC", "\\blacktriangledown");
              defineSymbol(math, ams, textord, "\u25A0", "\\blacksquare");
              defineSymbol(math, ams, textord, "\u29EB", "\\blacklozenge");
              defineSymbol(math, ams, textord, "\u2605", "\\bigstar");
              defineSymbol(math, ams, textord, "\u2222", "\\sphericalangle");
              defineSymbol(math, ams, textord, "\u2201", "\\complement");
              defineSymbol(math, ams, textord, "\xF0", "\\eth");
              defineSymbol(math, ams, textord, "\u2571", "\\diagup");
              defineSymbol(math, ams, textord, "\u2572", "\\diagdown");
              defineSymbol(math, ams, textord, "\u25A1", "\\square");
              defineSymbol(math, ams, textord, "\u25A1", "\\Box");
              defineSymbol(math, ams, textord, "\u25CA", "\\Diamond");
              defineSymbol(math, ams, textord, "\xA5", "\\yen");
              defineSymbol(math, ams, textord, "\u2713", "\\checkmark");
              defineSymbol(text, ams, textord, "\u2713", "\\checkmark");

              // AMS Hebrew
              defineSymbol(math, ams, textord, "\u2136", "\\beth");
              defineSymbol(math, ams, textord, "\u2138", "\\daleth");
              defineSymbol(math, ams, textord, "\u2137", "\\gimel");

              // AMS Greek
              defineSymbol(math, ams, textord, "\u03DD", "\\digamma");
              defineSymbol(math, ams, textord, "\u03F0", "\\varkappa");

              // AMS Delimiters
              defineSymbol(math, ams, open, "\u250C", "\\ulcorner");
              defineSymbol(math, ams, close, "\u2510", "\\urcorner");
              defineSymbol(math, ams, open, "\u2514", "\\llcorner");
              defineSymbol(math, ams, close, "\u2518", "\\lrcorner");

              // AMS Binary Relations
              defineSymbol(math, ams, rel, "\u2266", "\\leqq");
              defineSymbol(math, ams, rel, "\u2A7D", "\\leqslant");
              defineSymbol(math, ams, rel, "\u2A95", "\\eqslantless");
              defineSymbol(math, ams, rel, "\u2272", "\\lesssim");
              defineSymbol(math, ams, rel, "\u2A85", "\\lessapprox");
              defineSymbol(math, ams, rel, "\u224A", "\\approxeq");
              defineSymbol(math, ams, bin, "\u22D6", "\\lessdot");
              defineSymbol(math, ams, rel, "\u22D8", "\\lll");
              defineSymbol(math, ams, rel, "\u2276", "\\lessgtr");
              defineSymbol(math, ams, rel, "\u22DA", "\\lesseqgtr");
              defineSymbol(math, ams, rel, "\u2A8B", "\\lesseqqgtr");
              defineSymbol(math, ams, rel, "\u2251", "\\doteqdot");
              defineSymbol(math, ams, rel, "\u2253", "\\risingdotseq");
              defineSymbol(math, ams, rel, "\u2252", "\\fallingdotseq");
              defineSymbol(math, ams, rel, "\u223D", "\\backsim");
              defineSymbol(math, ams, rel, "\u22CD", "\\backsimeq");
              defineSymbol(math, ams, rel, "\u2AC5", "\\subseteqq");
              defineSymbol(math, ams, rel, "\u22D0", "\\Subset");
              defineSymbol(math, ams, rel, "\u228F", "\\sqsubset");
              defineSymbol(math, ams, rel, "\u227C", "\\preccurlyeq");
              defineSymbol(math, ams, rel, "\u22DE", "\\curlyeqprec");
              defineSymbol(math, ams, rel, "\u227E", "\\precsim");
              defineSymbol(math, ams, rel, "\u2AB7", "\\precapprox");
              defineSymbol(math, ams, rel, "\u22B2", "\\vartriangleleft");
              defineSymbol(math, ams, rel, "\u22B4", "\\trianglelefteq");
              defineSymbol(math, ams, rel, "\u22A8", "\\vDash");
              defineSymbol(math, ams, rel, "\u22AA", "\\Vvdash");
              defineSymbol(math, ams, rel, "\u2323", "\\smallsmile");
              defineSymbol(math, ams, rel, "\u2322", "\\smallfrown");
              defineSymbol(math, ams, rel, "\u224F", "\\bumpeq");
              defineSymbol(math, ams, rel, "\u224E", "\\Bumpeq");
              defineSymbol(math, ams, rel, "\u2267", "\\geqq");
              defineSymbol(math, ams, rel, "\u2A7E", "\\geqslant");
              defineSymbol(math, ams, rel, "\u2A96", "\\eqslantgtr");
              defineSymbol(math, ams, rel, "\u2273", "\\gtrsim");
              defineSymbol(math, ams, rel, "\u2A86", "\\gtrapprox");
              defineSymbol(math, ams, bin, "\u22D7", "\\gtrdot");
              defineSymbol(math, ams, rel, "\u22D9", "\\ggg");
              defineSymbol(math, ams, rel, "\u2277", "\\gtrless");
              defineSymbol(math, ams, rel, "\u22DB", "\\gtreqless");
              defineSymbol(math, ams, rel, "\u2A8C", "\\gtreqqless");
              defineSymbol(math, ams, rel, "\u2256", "\\eqcirc");
              defineSymbol(math, ams, rel, "\u2257", "\\circeq");
              defineSymbol(math, ams, rel, "\u225C", "\\triangleq");
              defineSymbol(math, ams, rel, "\u223C", "\\thicksim");
              defineSymbol(math, ams, rel, "\u2248", "\\thickapprox");
              defineSymbol(math, ams, rel, "\u2AC6", "\\supseteqq");
              defineSymbol(math, ams, rel, "\u22D1", "\\Supset");
              defineSymbol(math, ams, rel, "\u2290", "\\sqsupset");
              defineSymbol(math, ams, rel, "\u227D", "\\succcurlyeq");
              defineSymbol(math, ams, rel, "\u22DF", "\\curlyeqsucc");
              defineSymbol(math, ams, rel, "\u227F", "\\succsim");
              defineSymbol(math, ams, rel, "\u2AB8", "\\succapprox");
              defineSymbol(math, ams, rel, "\u22B3", "\\vartriangleright");
              defineSymbol(math, ams, rel, "\u22B5", "\\trianglerighteq");
              defineSymbol(math, ams, rel, "\u22A9", "\\Vdash");
              defineSymbol(math, ams, rel, "\u2223", "\\shortmid");
              defineSymbol(math, ams, rel, "\u2225", "\\shortparallel");
              defineSymbol(math, ams, rel, "\u226C", "\\between");
              defineSymbol(math, ams, rel, "\u22D4", "\\pitchfork");
              defineSymbol(math, ams, rel, "\u221D", "\\varpropto");
              defineSymbol(math, ams, rel, "\u25C0", "\\blacktriangleleft");
              defineSymbol(math, ams, rel, "\u2234", "\\therefore");
              defineSymbol(math, ams, rel, "\u220D", "\\backepsilon");
              defineSymbol(math, ams, rel, "\u25B6", "\\blacktriangleright");
              defineSymbol(math, ams, rel, "\u2235", "\\because");
              defineSymbol(math, ams, rel, "\u22D8", "\\llless");
              defineSymbol(math, ams, rel, "\u22D9", "\\gggtr");
              defineSymbol(math, ams, bin, "\u22B2", "\\lhd");
              defineSymbol(math, ams, bin, "\u22B3", "\\rhd");
              defineSymbol(math, ams, rel, "\u2242", "\\eqsim");
              defineSymbol(math, main, rel, "\u22C8", "\\Join");
              defineSymbol(math, ams, rel, "\u2251", "\\Doteq");

              // AMS Binary Operators
              defineSymbol(math, ams, bin, "\u2214", "\\dotplus");
              defineSymbol(math, ams, bin, "\u2216", "\\smallsetminus");
              defineSymbol(math, ams, bin, "\u22D2", "\\Cap");
              defineSymbol(math, ams, bin, "\u22D3", "\\Cup");
              defineSymbol(math, ams, bin, "\u2A5E", "\\doublebarwedge");
              defineSymbol(math, ams, bin, "\u229F", "\\boxminus");
              defineSymbol(math, ams, bin, "\u229E", "\\boxplus");
              defineSymbol(math, ams, bin, "\u22C7", "\\divideontimes");
              defineSymbol(math, ams, bin, "\u22C9", "\\ltimes");
              defineSymbol(math, ams, bin, "\u22CA", "\\rtimes");
              defineSymbol(math, ams, bin, "\u22CB", "\\leftthreetimes");
              defineSymbol(math, ams, bin, "\u22CC", "\\rightthreetimes");
              defineSymbol(math, ams, bin, "\u22CF", "\\curlywedge");
              defineSymbol(math, ams, bin, "\u22CE", "\\curlyvee");
              defineSymbol(math, ams, bin, "\u229D", "\\circleddash");
              defineSymbol(math, ams, bin, "\u229B", "\\circledast");
              defineSymbol(math, ams, bin, "\u22C5", "\\centerdot");
              defineSymbol(math, ams, bin, "\u22BA", "\\intercal");
              defineSymbol(math, ams, bin, "\u22D2", "\\doublecap");
              defineSymbol(math, ams, bin, "\u22D3", "\\doublecup");
              defineSymbol(math, ams, bin, "\u22A0", "\\boxtimes");

              // AMS Arrows
              defineSymbol(math, ams, rel, "\u21E2", "\\dashrightarrow");
              defineSymbol(math, ams, rel, "\u21E0", "\\dashleftarrow");
              defineSymbol(math, ams, rel, "\u21C7", "\\leftleftarrows");
              defineSymbol(math, ams, rel, "\u21C6", "\\leftrightarrows");
              defineSymbol(math, ams, rel, "\u21DA", "\\Lleftarrow");
              defineSymbol(math, ams, rel, "\u219E", "\\twoheadleftarrow");
              defineSymbol(math, ams, rel, "\u21A2", "\\leftarrowtail");
              defineSymbol(math, ams, rel, "\u21AB", "\\looparrowleft");
              defineSymbol(math, ams, rel, "\u21CB", "\\leftrightharpoons");
              defineSymbol(math, ams, rel, "\u21B6", "\\curvearrowleft");
              defineSymbol(math, ams, rel, "\u21BA", "\\circlearrowleft");
              defineSymbol(math, ams, rel, "\u21B0", "\\Lsh");
              defineSymbol(math, ams, rel, "\u21C8", "\\upuparrows");
              defineSymbol(math, ams, rel, "\u21BF", "\\upharpoonleft");
              defineSymbol(math, ams, rel, "\u21C3", "\\downharpoonleft");
              defineSymbol(math, ams, rel, "\u22B8", "\\multimap");
              defineSymbol(math, ams, rel, "\u21AD", "\\leftrightsquigarrow");
              defineSymbol(math, ams, rel, "\u21C9", "\\rightrightarrows");
              defineSymbol(math, ams, rel, "\u21C4", "\\rightleftarrows");
              defineSymbol(math, ams, rel, "\u21A0", "\\twoheadrightarrow");
              defineSymbol(math, ams, rel, "\u21A3", "\\rightarrowtail");
              defineSymbol(math, ams, rel, "\u21AC", "\\looparrowright");
              defineSymbol(math, ams, rel, "\u21B7", "\\curvearrowright");
              defineSymbol(math, ams, rel, "\u21BB", "\\circlearrowright");
              defineSymbol(math, ams, rel, "\u21B1", "\\Rsh");
              defineSymbol(math, ams, rel, "\u21CA", "\\downdownarrows");
              defineSymbol(math, ams, rel, "\u21BE", "\\upharpoonright");
              defineSymbol(math, ams, rel, "\u21C2", "\\downharpoonright");
              defineSymbol(math, ams, rel, "\u21DD", "\\rightsquigarrow");
              defineSymbol(math, ams, rel, "\u21DD", "\\leadsto");
              defineSymbol(math, ams, rel, "\u21DB", "\\Rrightarrow");
              defineSymbol(math, ams, rel, "\u21BE", "\\restriction");

              defineSymbol(math, main, textord, "\u2018", "`");
              defineSymbol(math, main, textord, "$", "\\$");
              defineSymbol(text, main, textord, "$", "\\$");
              defineSymbol(text, main, textord, "$", "\\textdollar");
              defineSymbol(math, main, textord, "%", "\\%");
              defineSymbol(text, main, textord, "%", "\\%");
              defineSymbol(math, main, textord, "_", "\\_");
              defineSymbol(text, main, textord, "_", "\\_");
              defineSymbol(text, main, textord, "_", "\\textunderscore");
              defineSymbol(math, main, textord, "\u2220", "\\angle");
              defineSymbol(math, main, textord, "\u221E", "\\infty");
              defineSymbol(math, main, textord, "\u2032", "\\prime");
              defineSymbol(math, main, textord, "\u25B3", "\\triangle");
              defineSymbol(math, main, textord, "\u0393", "\\Gamma", true);
              defineSymbol(math, main, textord, "\u0394", "\\Delta", true);
              defineSymbol(math, main, textord, "\u0398", "\\Theta", true);
              defineSymbol(math, main, textord, "\u039B", "\\Lambda", true);
              defineSymbol(math, main, textord, "\u039E", "\\Xi", true);
              defineSymbol(math, main, textord, "\u03A0", "\\Pi", true);
              defineSymbol(math, main, textord, "\u03A3", "\\Sigma", true);
              defineSymbol(math, main, textord, "\u03A5", "\\Upsilon", true);
              defineSymbol(math, main, textord, "\u03A6", "\\Phi", true);
              defineSymbol(math, main, textord, "\u03A8", "\\Psi", true);
              defineSymbol(math, main, textord, "\u03A9", "\\Omega", true);
              defineSymbol(math, main, textord, "\xAC", "\\neg");
              defineSymbol(math, main, textord, "\xAC", "\\lnot");
              defineSymbol(math, main, textord, "\u22A4", "\\top");
              defineSymbol(math, main, textord, "\u22A5", "\\bot");
              defineSymbol(math, main, textord, "\u2205", "\\emptyset");
              defineSymbol(math, ams, textord, "\u2205", "\\varnothing");
              defineSymbol(math, main, mathord, "\u03B1", "\\alpha", true);
              defineSymbol(math, main, mathord, "\u03B2", "\\beta", true);
              defineSymbol(math, main, mathord, "\u03B3", "\\gamma", true);
              defineSymbol(math, main, mathord, "\u03B4", "\\delta", true);
              defineSymbol(math, main, mathord, "\u03F5", "\\epsilon", true);
              defineSymbol(math, main, mathord, "\u03B6", "\\zeta", true);
              defineSymbol(math, main, mathord, "\u03B7", "\\eta", true);
              defineSymbol(math, main, mathord, "\u03B8", "\\theta", true);
              defineSymbol(math, main, mathord, "\u03B9", "\\iota", true);
              defineSymbol(math, main, mathord, "\u03BA", "\\kappa", true);
              defineSymbol(math, main, mathord, "\u03BB", "\\lambda", true);
              defineSymbol(math, main, mathord, "\u03BC", "\\mu", true);
              defineSymbol(math, main, mathord, "\u03BD", "\\nu", true);
              defineSymbol(math, main, mathord, "\u03BE", "\\xi", true);
              defineSymbol(math, main, mathord, "\u03BF", "\\omicron", true);
              defineSymbol(math, main, mathord, "\u03C0", "\\pi", true);
              defineSymbol(math, main, mathord, "\u03C1", "\\rho", true);
              defineSymbol(math, main, mathord, "\u03C3", "\\sigma", true);
              defineSymbol(math, main, mathord, "\u03C4", "\\tau", true);
              defineSymbol(math, main, mathord, "\u03C5", "\\upsilon", true);
              defineSymbol(math, main, mathord, "\u03D5", "\\phi", true);
              defineSymbol(math, main, mathord, "\u03C7", "\\chi", true);
              defineSymbol(math, main, mathord, "\u03C8", "\\psi", true);
              defineSymbol(math, main, mathord, "\u03C9", "\\omega", true);
              defineSymbol(math, main, mathord, "\u03B5", "\\varepsilon", true);
              defineSymbol(math, main, mathord, "\u03D1", "\\vartheta", true);
              defineSymbol(math, main, mathord, "\u03D6", "\\varpi", true);
              defineSymbol(math, main, mathord, "\u03F1", "\\varrho", true);
              defineSymbol(math, main, mathord, "\u03C2", "\\varsigma", true);
              defineSymbol(math, main, mathord, "\u03C6", "\\varphi", true);
              defineSymbol(math, main, bin, "\u2217", "*");
              defineSymbol(math, main, bin, "+", "+");
              defineSymbol(math, main, bin, "\u2212", "-");
              defineSymbol(math, main, bin, "\u22C5", "\\cdot");
              defineSymbol(math, main, bin, "\u2218", "\\circ");
              defineSymbol(math, main, bin, "\xF7", "\\div");
              defineSymbol(math, main, bin, "\xB1", "\\pm");
              defineSymbol(math, main, bin, "\xD7", "\\times");
              defineSymbol(math, main, bin, "\u2229", "\\cap");
              defineSymbol(math, main, bin, "\u222A", "\\cup");
              defineSymbol(math, main, bin, "\u2216", "\\setminus");
              defineSymbol(math, main, bin, "\u2227", "\\land");
              defineSymbol(math, main, bin, "\u2228", "\\lor");
              defineSymbol(math, main, bin, "\u2227", "\\wedge");
              defineSymbol(math, main, bin, "\u2228", "\\vee");
              defineSymbol(math, main, textord, "\u221A", "\\surd");
              defineSymbol(math, main, open, "(", "(");
              defineSymbol(math, main, open, "[", "[");
              defineSymbol(math, main, open, "\u27E8", "\\langle");
              defineSymbol(math, main, open, "\u2223", "\\lvert");
              defineSymbol(math, main, open, "\u2225", "\\lVert");
              defineSymbol(math, main, close, ")", ")");
              defineSymbol(math, main, close, "]", "]");
              defineSymbol(math, main, close, "?", "?");
              defineSymbol(math, main, close, "!", "!");
              defineSymbol(math, main, close, "\u27E9", "\\rangle");
              defineSymbol(math, main, close, "\u2223", "\\rvert");
              defineSymbol(math, main, close, "\u2225", "\\rVert");
              defineSymbol(math, main, rel, "=", "=");
              defineSymbol(math, main, rel, "<", "<");
              defineSymbol(math, main, rel, ">", ">");
              defineSymbol(math, main, rel, ":", ":");
              defineSymbol(math, main, rel, "\u2248", "\\approx");
              defineSymbol(math, main, rel, "\u2245", "\\cong");
              defineSymbol(math, main, rel, "\u2265", "\\ge");
              defineSymbol(math, main, rel, "\u2265", "\\geq");
              defineSymbol(math, main, rel, "\u2190", "\\gets");
              defineSymbol(math, main, rel, ">", "\\gt");
              defineSymbol(math, main, rel, "\u2208", "\\in");
              defineSymbol(math, main, rel, "\u2209", "\\notin");
              defineSymbol(math, main, rel, "\u0338", "\\not");
              defineSymbol(math, main, rel, "\u2282", "\\subset");
              defineSymbol(math, main, rel, "\u2283", "\\supset");
              defineSymbol(math, main, rel, "\u2286", "\\subseteq");
              defineSymbol(math, main, rel, "\u2287", "\\supseteq");
              defineSymbol(math, ams, rel, "\u2288", "\\nsubseteq");
              defineSymbol(math, ams, rel, "\u2289", "\\nsupseteq");
              defineSymbol(math, main, rel, "\u22A8", "\\models");
              defineSymbol(math, main, rel, "\u2190", "\\leftarrow");
              defineSymbol(math, main, rel, "\u2264", "\\le");
              defineSymbol(math, main, rel, "\u2264", "\\leq");
              defineSymbol(math, main, rel, "<", "\\lt");
              defineSymbol(math, main, rel, "\u2260", "\\ne");
              defineSymbol(math, main, rel, "\u2260", "\\neq");
              defineSymbol(math, main, rel, "\u2192", "\\rightarrow");
              defineSymbol(math, main, rel, "\u2192", "\\to");
              defineSymbol(math, ams, rel, "\u2271", "\\ngeq");
              defineSymbol(math, ams, rel, "\u2270", "\\nleq");
              defineSymbol(math, main, spacing, null, "\\!");
              defineSymbol(math, main, spacing, "\xA0", "\\ ");
              defineSymbol(math, main, spacing, "\xA0", "~");
              defineSymbol(math, main, spacing, null, "\\,");
              defineSymbol(math, main, spacing, null, "\\:");
              defineSymbol(math, main, spacing, null, "\\;");
              defineSymbol(math, main, spacing, null, "\\enspace");
              defineSymbol(math, main, spacing, null, "\\qquad");
              defineSymbol(math, main, spacing, null, "\\quad");
              defineSymbol(math, main, spacing, "\xA0", "\\space");
              defineSymbol(math, main, punct, ",", ",");
              defineSymbol(math, main, punct, ";", ";");
              defineSymbol(math, main, punct, ":", "\\colon");
              defineSymbol(math, ams, bin, "\u22BC", "\\barwedge");
              defineSymbol(math, ams, bin, "\u22BB", "\\veebar");
              defineSymbol(math, main, bin, "\u2299", "\\odot");
              defineSymbol(math, main, bin, "\u2295", "\\oplus");
              defineSymbol(math, main, bin, "\u2297", "\\otimes");
              defineSymbol(math, main, textord, "\u2202", "\\partial");
              defineSymbol(math, main, bin, "\u2298", "\\oslash");
              defineSymbol(math, ams, bin, "\u229A", "\\circledcirc");
              defineSymbol(math, ams, bin, "\u22A1", "\\boxdot");
              defineSymbol(math, main, bin, "\u25B3", "\\bigtriangleup");
              defineSymbol(math, main, bin, "\u25BD", "\\bigtriangledown");
              defineSymbol(math, main, bin, "\u2020", "\\dagger");
              defineSymbol(math, main, bin, "\u22C4", "\\diamond");
              defineSymbol(math, main, bin, "\u22C6", "\\star");
              defineSymbol(math, main, bin, "\u25C3", "\\triangleleft");
              defineSymbol(math, main, bin, "\u25B9", "\\triangleright");
              defineSymbol(math, main, open, "{", "\\{");
              defineSymbol(text, main, textord, "{", "\\{");
              defineSymbol(text, main, textord, "{", "\\textbraceleft");
              defineSymbol(math, main, close, "}", "\\}");
              defineSymbol(text, main, textord, "}", "\\}");
              defineSymbol(text, main, textord, "}", "\\textbraceright");
              defineSymbol(math, main, open, "{", "\\lbrace");
              defineSymbol(math, main, close, "}", "\\rbrace");
              defineSymbol(math, main, open, "[", "\\lbrack");
              defineSymbol(math, main, close, "]", "\\rbrack");
              defineSymbol(text, main, textord, "<", "\\textless"); // in T1 fontenc
              defineSymbol(text, main, textord, ">", "\\textgreater"); // in T1 fontenc
              defineSymbol(math, main, open, "\u230A", "\\lfloor");
              defineSymbol(math, main, close, "\u230B", "\\rfloor");
              defineSymbol(math, main, open, "\u2308", "\\lceil");
              defineSymbol(math, main, close, "\u2309", "\\rceil");
              defineSymbol(math, main, textord, "\\", "\\backslash");
              defineSymbol(math, main, textord, "\u2223", "|");
              defineSymbol(math, main, textord, "\u2223", "\\vert");
              defineSymbol(text, main, textord, "|", "\\textbar"); // in T1 fontenc
              defineSymbol(math, main, textord, "\u2225", "\\|");
              defineSymbol(math, main, textord, "\u2225", "\\Vert");
              defineSymbol(text, main, textord, "\u2225", "\\textbardbl");
              defineSymbol(math, main, rel, "\u2191", "\\uparrow");
              defineSymbol(math, main, rel, "\u21D1", "\\Uparrow");
              defineSymbol(math, main, rel, "\u2193", "\\downarrow");
              defineSymbol(math, main, rel, "\u21D3", "\\Downarrow");
              defineSymbol(math, main, rel, "\u2195", "\\updownarrow");
              defineSymbol(math, main, rel, "\u21D5", "\\Updownarrow");
              defineSymbol(math, main, op, "\u2210", "\\coprod");
              defineSymbol(math, main, op, "\u22C1", "\\bigvee");
              defineSymbol(math, main, op, "\u22C0", "\\bigwedge");
              defineSymbol(math, main, op, "\u2A04", "\\biguplus");
              defineSymbol(math, main, op, "\u22C2", "\\bigcap");
              defineSymbol(math, main, op, "\u22C3", "\\bigcup");
              defineSymbol(math, main, op, "\u222B", "\\int");
              defineSymbol(math, main, op, "\u222B", "\\intop");
              defineSymbol(math, main, op, "\u222C", "\\iint");
              defineSymbol(math, main, op, "\u222D", "\\iiint");
              defineSymbol(math, main, op, "\u220F", "\\prod");
              defineSymbol(math, main, op, "\u2211", "\\sum");
              defineSymbol(math, main, op, "\u2A02", "\\bigotimes");
              defineSymbol(math, main, op, "\u2A01", "\\bigoplus");
              defineSymbol(math, main, op, "\u2A00", "\\bigodot");
              defineSymbol(math, main, op, "\u222E", "\\oint");
              defineSymbol(math, main, op, "\u2A06", "\\bigsqcup");
              defineSymbol(math, main, op, "\u222B", "\\smallint");
              defineSymbol(text, main, inner, "\u2026", "\\textellipsis");
              defineSymbol(math, main, inner, "\u2026", "\\mathellipsis");
              defineSymbol(text, main, inner, "\u2026", "\\ldots", true);
              defineSymbol(math, main, inner, "\u2026", "\\ldots", true);
              defineSymbol(math, main, inner, "\u22EF", "\\cdots", true);
              defineSymbol(math, main, inner, "\u22F1", "\\ddots", true);
              defineSymbol(math, main, textord, "\u22EE", "\\vdots", true);
              defineSymbol(math, main, accent, "\xB4", "\\acute");
              defineSymbol(math, main, accent, "`", "\\grave");
              defineSymbol(math, main, accent, "\xA8", "\\ddot");
              defineSymbol(math, main, accent, "~", "\\tilde");
              defineSymbol(math, main, accent, "\xAF", "\\bar");
              defineSymbol(math, main, accent, "\u02D8", "\\breve");
              defineSymbol(math, main, accent, "\u02C7", "\\check");
              defineSymbol(math, main, accent, "^", "\\hat");
              defineSymbol(math, main, accent, "\u20D7", "\\vec");
              defineSymbol(math, main, accent, "\u02D9", "\\dot");
              defineSymbol(math, main, mathord, "\u0131", "\\imath");
              defineSymbol(math, main, mathord, "\u0237", "\\jmath");
              defineSymbol(text, main, accent, "\u02CA", "\\'"); // acute
              defineSymbol(text, main, accent, "\u02CB", "\\`"); // grave
              defineSymbol(text, main, accent, "\u02C6", "\\^"); // circumflex
              defineSymbol(text, main, accent, "\u02DC", "\\~"); // tilde
              defineSymbol(text, main, accent, "\u02C9", "\\="); // macron
              defineSymbol(text, main, accent, "\u02D8", "\\u"); // breve
              defineSymbol(text, main, accent, "\u02D9", "\\."); // dot above
              defineSymbol(text, main, accent, "\u02DA", "\\r"); // ring above
              defineSymbol(text, main, accent, "\u02C7", "\\v"); // caron
              defineSymbol(text, main, accent, "\xA8", '\\"'); // diaresis
              defineSymbol(text, main, accent, "\u030B", "\\H"); // double acute

              defineSymbol(text, main, textord, "\u2013", "--");
              defineSymbol(text, main, textord, "\u2013", "\\textendash");
              defineSymbol(text, main, textord, "\u2014", "---");
              defineSymbol(text, main, textord, "\u2014", "\\textemdash");
              defineSymbol(text, main, textord, "\u2018", "`");
              defineSymbol(text, main, textord, "\u2018", "\\textquoteleft");
              defineSymbol(text, main, textord, "\u2019", "'");
              defineSymbol(text, main, textord, "\u2019", "\\textquoteright");
              defineSymbol(text, main, textord, "\u201C", "``");
              defineSymbol(text, main, textord, "\u201C", "\\textquotedblleft");
              defineSymbol(text, main, textord, "\u201D", "''");
              defineSymbol(text, main, textord, "\u201D", "\\textquotedblright");
              defineSymbol(math, main, textord, "\xB0", "\\degree");
              defineSymbol(text, main, textord, "\xB0", "\\degree");
              // TODO: In LaTeX, \pounds can generate a different character in text and math
              // mode, but among our fonts, only Main-Italic defines this character "163".
              defineSymbol(math, main, mathord, "\xA3", "\\pounds");
              defineSymbol(math, main, mathord, "\xA3", "\\mathsterling");
              defineSymbol(text, main, mathord, "\xA3", "\\pounds");
              defineSymbol(text, main, mathord, "\xA3", "\\textsterling");
              defineSymbol(math, ams, textord, "\u2720", "\\maltese");
              defineSymbol(text, ams, textord, "\u2720", "\\maltese");

              defineSymbol(text, main, spacing, "\xA0", "\\ ");
              defineSymbol(text, main, spacing, "\xA0", " ");
              defineSymbol(text, main, spacing, "\xA0", "~");

              // There are lots of symbols which are the same, so we add them in afterwards.

              // All of these are textords in math mode
              var mathTextSymbols = '0123456789/@."';
              for (var i = 0; i < mathTextSymbols.length; i++) {
                var ch = mathTextSymbols.charAt(i);
                defineSymbol(math, main, textord, ch, ch);
              }

              // All of these are textords in text mode
              var textSymbols = '0123456789!@*()-=+[]<>|";:?/.,';
              for (var _i = 0; _i < textSymbols.length; _i++) {
                var _ch = textSymbols.charAt(_i);
                defineSymbol(text, main, textord, _ch, _ch);
              }

              // All of these are textords in text mode, and mathords in math mode
              var letters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
              for (var _i2 = 0; _i2 < letters.length; _i2++) {
                var _ch2 = letters.charAt(_i2);
                defineSymbol(math, main, mathord, _ch2, _ch2);
                defineSymbol(text, main, textord, _ch2, _ch2);
              }

              // Latin-1 letters
              for (var _i3 = 0x00c0; _i3 <= 0x00d6; _i3++) {
                var _ch3 = String.fromCharCode(_i3);
                defineSymbol(math, main, mathord, _ch3, _ch3);
                defineSymbol(text, main, textord, _ch3, _ch3);
              }

              for (var _i4 = 0x00d8; _i4 <= 0x00f6; _i4++) {
                var _ch4 = String.fromCharCode(_i4);
                defineSymbol(math, main, mathord, _ch4, _ch4);
                defineSymbol(text, main, textord, _ch4, _ch4);
              }

              for (var _i5 = 0x00f8; _i5 <= 0x00ff; _i5++) {
                var _ch5 = String.fromCharCode(_i5);
                defineSymbol(math, main, mathord, _ch5, _ch5);
                defineSymbol(text, main, textord, _ch5, _ch5);
              }

              // Cyrillic
              for (var _i6 = 0x0410; _i6 <= 0x044f; _i6++) {
                var _ch6 = String.fromCharCode(_i6);
                defineSymbol(text, main, textord, _ch6, _ch6);
              }

              // Unicode versions of existing characters
              defineSymbol(text, main, textord, "\u2013", "–");
              defineSymbol(text, main, textord, "\u2014", "—");
              defineSymbol(text, main, textord, "\u2018", "‘");
              defineSymbol(text, main, textord, "\u2019", "’");
              defineSymbol(text, main, textord, "\u201C", "“");
              defineSymbol(text, main, textord, "\u201D", "”");
            },
            {},
          ],
          49: [
            function (require, module, exports) {
              var hangulRegex = /[\uAC00-\uD7AF]/;

              // This regex combines
              // - CJK symbols and punctuation: [\u3000-\u303F]
              // - Hiragana: [\u3040-\u309F]
              // - Katakana: [\u30A0-\u30FF]
              // - CJK ideograms: [\u4E00-\u9FAF]
              // - Hangul syllables: [\uAC00-\uD7AF]
              // - Fullwidth punctuation: [\uFF00-\uFF60]
              // Notably missing are halfwidth Katakana and Romanji glyphs.
              var cjkRegex = /[\u3000-\u30FF\u4E00-\u9FAF\uAC00-\uD7AF\uFF00-\uFF60]/;

              module.exports = {
                cjkRegex: cjkRegex,
                hangulRegex: hangulRegex,
              };
            },
            {},
          ],
          50: [
            function (require, module, exports) {
              var _ParseError = require("./ParseError");

              var _ParseError2 = _interopRequireDefault(_ParseError);

              function _interopRequireDefault(obj) {
                return obj && obj.__esModule ? obj : { default: obj };
              }

              // This table gives the number of TeX pts in one of each *absolute* TeX unit.
              // Thus, multiplying a length by this number converts the length from units
              // into pts.  Dividing the result by ptPerEm gives the number of ems
              // *assuming* a font size of ptPerEm (normal size, normal style).
              var ptPerUnit = {
                // https://en.wikibooks.org/wiki/LaTeX/Lengths and
                // https://tex.stackexchange.com/a/8263
                pt: 1, // TeX point
                mm: 7227 / 2540, // millimeter
                cm: 7227 / 254, // centimeter
                in: 72.27, // inch
                bp: 803 / 800, // big (PostScript) points
                pc: 12, // pica
                dd: 1238 / 1157, // didot
                cc: 14856 / 1157, // cicero (12 didot)
                nd: 685 / 642, // new didot
                nc: 1370 / 107, // new cicero (12 new didot)
                sp: 1 / 65536, // scaled point (TeX's internal smallest unit)
                // https://tex.stackexchange.com/a/41371
                px: 803 / 800,
              };

              // Dictionary of relative units, for fast validity testing.
              /* eslint no-console:0 */

              /**
               * This file does conversion between units.  In particular, it provides
               * calculateSize to convert other units into ems.
               */

              var relativeUnit = {
                ex: true,
                em: true,
                mu: true,
              };

              /**
               * Determine whether the specified unit (either a string defining the unit
               * or a "size" parse node containing a unit field) is valid.
               */
              var validUnit = function validUnit(unit) {
                if (unit.unit) {
                  unit = unit.unit;
                }
                return unit in ptPerUnit || unit in relativeUnit || unit === "ex";
              };

              /*
               * Convert a "size" parse node (with numeric "number" and string "unit" fields,
               * as parsed by functions.js argType "size") into a CSS em value for the
               * current style/scale.  `options` gives the current options.
               */
              var calculateSize = function calculateSize(sizeValue, options) {
                var scale = void 0;
                if (sizeValue.unit in ptPerUnit) {
                  // Absolute units
                  scale =
                    ptPerUnit[sizeValue.unit] / // Convert unit to pt
                    options.fontMetrics().ptPerEm / // Convert pt to CSS em
                    options.sizeMultiplier; // Unscale to make absolute units
                } else if (sizeValue.unit === "mu") {
                  // `mu` units scale with scriptstyle/scriptscriptstyle.
                  scale = options.fontMetrics().cssEmPerMu;
                } else {
                  // Other relative units always refer to the *textstyle* font
                  // in the current size.
                  var unitOptions = void 0;
                  if (options.style.isTight()) {
                    // isTight() means current style is script/scriptscript.
                    unitOptions = options.havingStyle(options.style.text());
                  } else {
                    unitOptions = options;
                  }
                  // TODO: In TeX these units are relative to the quad of the current
                  // *text* font, e.g. cmr10. KaTeX instead uses values from the
                  // comparably-sized *Computer Modern symbol* font. At 10pt, these
                  // match. At 7pt and 5pt, they differ: cmr7=1.138894, cmsy7=1.170641;
                  // cmr5=1.361133, cmsy5=1.472241. Consider $\scriptsize a\kern1emb$.
                  // TeX \showlists shows a kern of 1.13889 * fontsize;
                  // KaTeX shows a kern of 1.171 * fontsize.
                  if (sizeValue.unit === "ex") {
                    scale = unitOptions.fontMetrics().xHeight;
                  } else if (sizeValue.unit === "em") {
                    scale = unitOptions.fontMetrics().quad;
                  } else {
                    throw new _ParseError2.default("Invalid unit: '" + sizeValue.unit + "'");
                  }
                  if (unitOptions !== options) {
                    scale *= unitOptions.sizeMultiplier / options.sizeMultiplier;
                  }
                }
                return sizeValue.number * scale;
              };

              module.exports = {
                validUnit: validUnit,
                calculateSize: calculateSize,
              };
            },
            { "./ParseError": 29 },
          ],
          51: [
            function (require, module, exports) {
              /**
               * This file contains a list of utility functions which are useful in other
               * files.
               */

              /**
               * Provide an `indexOf` function which works in IE8, but defers to native if
               * possible.
               */
              var nativeIndexOf = Array.prototype.indexOf;
              var indexOf = function indexOf(list, elem) {
                if (list == null) {
                  return -1;
                }
                if (nativeIndexOf && list.indexOf === nativeIndexOf) {
                  return list.indexOf(elem);
                }
                var l = list.length;
                for (var i = 0; i < l; i++) {
                  if (list[i] === elem) {
                    return i;
                  }
                }
                return -1;
              };

              /**
               * Return whether an element is contained in a list
               */
              var contains = function contains(list, elem) {
                return indexOf(list, elem) !== -1;
              };

              /**
               * Provide a default value if a setting is undefined
               */
              var deflt = function deflt(setting, defaultIfUndefined) {
                return setting === undefined ? defaultIfUndefined : setting;
              };

              // hyphenate and escape adapted from Facebook's React under Apache 2 license

              var uppercase = /([A-Z])/g;
              var hyphenate = function hyphenate(str) {
                return str.replace(uppercase, "-$1").toLowerCase();
              };

              var ESCAPE_LOOKUP = {
                "&": "&amp;",
                ">": "&gt;",
                "<": "&lt;",
                '"': "&quot;",
                "'": "&#x27;",
              };

              var ESCAPE_REGEX = /[&><"']/g;

              function escaper(match) {
                return ESCAPE_LOOKUP[match];
              }

              /**
               * Escapes text to prevent scripting attacks.
               *
               * @param {*} text Text value to escape.
               * @return {string} An escaped string.
               */
              function escape(text) {
                return ("" + text).replace(ESCAPE_REGEX, escaper);
              }

              /**
               * A function to set the text content of a DOM element in all supported
               * browsers. Note that we don't define this if there is no document.
               */
              var setTextContent = void 0;
              if (typeof document !== "undefined") {
                var testNode = document.createElement("span");
                if ("textContent" in testNode) {
                  setTextContent = function setTextContent(node, text) {
                    node.textContent = text;
                  };
                } else {
                  setTextContent = function setTextContent(node, text) {
                    node.innerText = text;
                  };
                }
              }

              /**
               * A function to clear a node.
               */
              function clearNode(node) {
                setTextContent(node, "");
              }

              module.exports = {
                contains: contains,
                deflt: deflt,
                escape: escape,
                hyphenate: hyphenate,
                indexOf: indexOf,
                setTextContent: setTextContent,
                clearNode: clearNode,
              };
            },
            {},
          ],
        },
        {},
        [1]
      )(1);
    });
  });

  var katex$2 = unwrapExports(katex$1);

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

  function Mathematics(dom, data) {
    let needsCSS = false;
    const body = dom.querySelector("body");

    if (!body) {
      console.warn("No body tag found!");
      return;
    }

    if (data.katex && data.katex.delimiters) {
      global.document = dom;
      renderMathInElement(body, data.katex);
    }

    // render d-math tags
    const mathTags = body.querySelectorAll("d-math");
    if (mathTags.length > 0) {
      needsCSS = true;
      console.warn(`Prerendering ${mathTags.length} math tags...`);
      for (const mathTag of mathTags) {
        const localOptions = {
          displayMode: mathTag.hasAttribute("block"),
        };
        const options = Object.assign(localOptions, data.katex);
        const html = katex$2.renderToString(mathTag.textContent, options);
        const container = dom.createElement("span");
        container.innerHTML = html;
        mathTag.parentElement.insertBefore(container, mathTag);
        mathTag.parentElement.removeChild(mathTag);
      }
    }

    if (needsCSS) {
      const katexCSSTag = '<link rel="stylesheet" href="https://distill.pub/third-party/katex/katex.min.css" crossorigin="anonymous">';
      dom.head.insertAdjacentHTML("beforeend", katexCSSTag);
    }
  }

  var favicon =
    "iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA99JREFUeNrsG4t1ozDMzQSM4A2ODUonKBucN2hugtIJ6E1AboLcBiQTkJsANiAb9OCd/OpzMWBJBl5TvaeXPiiyJetry0J8wW3D3QpjRh3GjneXDq+fSQA9s2mH9x3KDhN4foJfCb8N/Jrv+2fnDn8vLRQOplWHVYdvHZYdZsBcZP1vBmh/n8DzEmhUQDPaOuP9pFuY+JwJHwHnCLQE2tnWBGEyXozY9xCUgHMhhjE2I4heVWtgIkZ83wL6Qgxj1obfWBxymPwe+b00BCCRNPbwfb60yleAkkBHGT5AEehIYz7eJrFDMF9CvH4wwhcGHiHMneFvLDQwlwvMLQq58trRcYBWfYn0A0OgHWQUSu25mE+BnoYKnnEJoeIWAifzOv7vLWd2ZKRfWAIme3tOiUaQ3UnLkb0xj1FxRIeEGKaGIHOs9nEgLaaA9i0JRYo1Ic67wJW86KSKE/ZAM8KuVMk8ITVhmxUxJ3Cl2xlm9Vtkeju1+mpCQNxaEGNCY8bs9X2YqwNoQeGjBWut/ma0QAWy/TqAsHx9wSya3I5IRxOfTC+leG+kA/4vSeEcGBtNUN6byhu3+keEZCQJUNh8MAO7HL6H8pQLnsW/Hd4T4lv93TPjfM7A46iEEqbB5EDOvwYNW6tGNZzT/o+CZ6sqZ6wUtR/wf7mi/VL8iNciT6rHih48Y55b4nKCHJCCzb4y0nwFmin3ZEMIoLfZF8F7nncFmvnWBaBj7CGAYA/WGJsUwHdYqVDwAmNsUgAx4CGgAA7GOOxADYOFWOaIKifuVYzmOpREqA21Mo7aPsgiY1PhOMAmxtR+AUbYH3Id2wc0SAFIQTsn9IUGWR8k9jx3vtXSiAacFxTAGakBk9UudkNECd6jLe+6HrshshvIuC6IlLMRy7er+JpcKma24SlE4cFZSZJDGVVrsNvitQhQrDhW0jfiOLfFd47C42eHT56D/BK0To+58Ahj+cAT8HT1UWlfLZCCd/uKawzU0Rh2EyIX/Icqth3niG8ybNroezwe6khdCNxRN+l4XGdOLVLlOOt2hTRJlr1ETIuMAltVTMz70mJrkdGAaZLSmnBEqmAE32JCMmuTlCnRgsBENtOUpHhvvsYIL0ibnBkaC6QvKcR7738GKp0AKnim7xgUSNv1bpS8QwhBt8r+EP47v/oyRK/S34yJ9nT+AN0Tkm4OdB9E4BsmXM3SnMlRFUrtp6IDpV2eKzdYvF3etm3KhQksbOLChGkSmcBdmcEwvqkrMy5BzL00NZeu3qPYJOOuCc+5NjcWKXQxFvTa3NoXJ4d8in7fiAUuTt781dkvuHX4K8AA2Usy7yNKLy0AAAAASUVORK5CYII=\n";

  /*!
>>>>>>> master
   * escape-html
   * Copyright(c) 2012-2013 TJ Holowaychuk
   * Copyright(c) 2015 Andreas Lubbe
   * Copyright(c) 2015 Tiancheng "Timothy" Gu
   * MIT Licensed
   */
<<<<<<< HEAD
// Copyright 2018 The Distill Template Authors
const me='/*\n * Copyright 2018 The Distill Template Authors\n *\n * Licensed under the Apache License, Version 2.0 (the "License");\n * you may not use this file except in compliance with the License.\n * You may obtain a copy of the License at\n *\n *      http://www.apache.org/licenses/LICENSE-2.0\n *\n * Unless required by applicable law or agreed to in writing, software\n * distributed under the License is distributed on an "AS IS" BASIS,\n * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n * See the License for the specific language governing permissions and\n * limitations under the License.\n */\n\nhtml {\n  font-size: 14px;\n\tline-height: 1.6em;\n  /* font-family: "Libre Franklin", "Helvetica Neue", sans-serif; */\n  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", Arial, sans-serif;\n  /*, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";*/\n  text-size-adjust: 100%;\n  -ms-text-size-adjust: 100%;\n  -webkit-text-size-adjust: 100%;\n}\n\n@media(min-width: 768px) {\n  html {\n    font-size: 16px;\n  }\n}\n\nbody {\n  margin: 0;\n}\n\na {\n  color: #004276;\n}\n\nfigure {\n  margin: 0;\n}\n\ntable {\n\tborder-collapse: collapse;\n\tborder-spacing: 0;\n}\n\ntable th {\n\ttext-align: left;\n}\n\ntable thead {\n  border-bottom: 1px solid rgba(0, 0, 0, 0.05);\n}\n\ntable thead th {\n  padding-bottom: 0.5em;\n}\n\ntable tbody :first-child td {\n  padding-top: 0.5em;\n}\n\npre {\n  overflow: auto;\n  max-width: 100%;\n}\n\np {\n  margin-top: 0;\n  margin-bottom: 1em;\n}\n\nsup, sub {\n  vertical-align: baseline;\n  position: relative;\n  top: -0.4em;\n  line-height: 1em;\n}\n\nsub {\n  top: 0.4em;\n}\n\n.kicker,\n.marker {\n  font-size: 15px;\n  font-weight: 600;\n  color: rgba(0, 0, 0, 0.5);\n}\n\n\n/* Headline */\n\n@media(min-width: 1024px) {\n  d-title h1 span {\n    display: block;\n  }\n}\n\n/* Figure */\n\nfigure {\n  position: relative;\n  margin-bottom: 2.5em;\n  margin-top: 1.5em;\n}\n\nfigcaption+figure {\n\n}\n\nfigure img {\n  width: 100%;\n}\n\nfigure svg text,\nfigure svg tspan {\n}\n\nfigcaption,\n.figcaption {\n  color: rgba(0, 0, 0, 0.6);\n  font-size: 12px;\n  line-height: 1.5em;\n}\n\n@media(min-width: 1024px) {\nfigcaption,\n.figcaption {\n    font-size: 13px;\n  }\n}\n\nfigure.external img {\n  background: white;\n  border: 1px solid rgba(0, 0, 0, 0.1);\n  box-shadow: 0 1px 8px rgba(0, 0, 0, 0.1);\n  padding: 18px;\n  box-sizing: border-box;\n}\n\nfigcaption a {\n  color: rgba(0, 0, 0, 0.6);\n}\n\nfigcaption b,\nfigcaption strong, {\n  font-weight: 600;\n  color: rgba(0, 0, 0, 1.0);\n}\n'+'/*\n * Copyright 2018 The Distill Template Authors\n *\n * Licensed under the Apache License, Version 2.0 (the "License");\n * you may not use this file except in compliance with the License.\n * You may obtain a copy of the License at\n *\n *      http://www.apache.org/licenses/LICENSE-2.0\n *\n * Unless required by applicable law or agreed to in writing, software\n * distributed under the License is distributed on an "AS IS" BASIS,\n * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n * See the License for the specific language governing permissions and\n * limitations under the License.\n */\n\n@supports not (display: grid) {\n  .base-grid,\n  distill-header,\n  d-title,\n  d-abstract,\n  d-article,\n  d-appendix,\n  distill-appendix,\n  d-byline,\n  d-footnote-list,\n  d-citation-list,\n  distill-footer {\n    display: block;\n    padding: 8px;\n  }\n}\n\n.base-grid,\ndistill-header,\nd-title,\nd-abstract,\nd-article,\nd-appendix,\ndistill-appendix,\nd-byline,\nd-footnote-list,\nd-citation-list,\ndistill-footer {\n  display: grid;\n  justify-items: stretch;\n  grid-template-columns: [screen-start] 8px [page-start kicker-start text-start gutter-start middle-start] 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr [text-end page-end gutter-end kicker-end middle-end] 8px [screen-end];\n  grid-column-gap: 8px;\n}\n\n.grid {\n  display: grid;\n  grid-column-gap: 8px;\n}\n\n@media(min-width: 768px) {\n  .base-grid,\n  distill-header,\n  d-title,\n  d-abstract,\n  d-article,\n  d-appendix,\n  distill-appendix,\n  d-byline,\n  d-footnote-list,\n  d-citation-list,\n  distill-footer {\n    grid-template-columns: [screen-start] 1fr [page-start kicker-start middle-start text-start] 45px 45px 45px 45px 45px 45px 45px 45px [ kicker-end text-end gutter-start] 45px [middle-end] 45px [page-end gutter-end] 1fr [screen-end];\n    grid-column-gap: 16px;\n  }\n\n  .grid {\n    grid-column-gap: 16px;\n  }\n}\n\n@media(min-width: 1000px) {\n  .base-grid,\n  distill-header,\n  d-title,\n  d-abstract,\n  d-article,\n  d-appendix,\n  distill-appendix,\n  d-byline,\n  d-footnote-list,\n  d-citation-list,\n  distill-footer {\n    grid-template-columns: [screen-start] 1fr [page-start kicker-start] 50px [middle-start] 50px [text-start kicker-end] 50px 50px 50px 50px 50px 50px 50px 50px [text-end gutter-start] 50px [middle-end] 50px [page-end gutter-end] 1fr [screen-end];\n    grid-column-gap: 16px;\n  }\n\n  .grid {\n    grid-column-gap: 16px;\n  }\n}\n\n@media(min-width: 1180px) {\n  .base-grid,\n  distill-header,\n  d-title,\n  d-abstract,\n  d-article,\n  d-appendix,\n  distill-appendix,\n  d-byline,\n  d-footnote-list,\n  d-citation-list,\n  distill-footer {\n    grid-template-columns: [screen-start] 1fr [page-start kicker-start] 60px [middle-start] 60px [text-start kicker-end] 60px 60px 60px 60px 60px 60px 60px 60px [text-end gutter-start] 60px [middle-end] 60px [page-end gutter-end] 1fr [screen-end];\n    grid-column-gap: 32px;\n  }\n\n  .grid {\n    grid-column-gap: 32px;\n  }\n}\n\n\n\n\n.base-grid {\n  grid-column: screen;\n}\n\n/* .l-body,\nd-article > *  {\n  grid-column: text;\n}\n\n.l-page,\nd-title > *,\nd-figure {\n  grid-column: page;\n} */\n\n.l-gutter {\n  grid-column: gutter;\n}\n\n.l-text,\n.l-body {\n  grid-column: text;\n}\n\n.l-page {\n  grid-column: page;\n}\n\n.l-body-outset {\n  grid-column: middle;\n}\n\n.l-page-outset {\n  grid-column: page;\n}\n\n.l-screen {\n  grid-column: screen;\n}\n\n.l-screen-inset {\n  grid-column: screen;\n  padding-left: 16px;\n  padding-left: 16px;\n}\n\n\n/* Aside */\n\nd-article aside {\n  grid-column: gutter;\n  font-size: 12px;\n  line-height: 1.6em;\n  color: rgba(0, 0, 0, 0.6)\n}\n\n@media(min-width: 768px) {\n  aside {\n    grid-column: gutter;\n  }\n\n  .side {\n    grid-column: gutter;\n  }\n}\n'+'/*\n * Copyright 2018 The Distill Template Authors\n *\n * Licensed under the Apache License, Version 2.0 (the "License");\n * you may not use this file except in compliance with the License.\n * You may obtain a copy of the License at\n *\n *      http://www.apache.org/licenses/LICENSE-2.0\n *\n * Unless required by applicable law or agreed to in writing, software\n * distributed under the License is distributed on an "AS IS" BASIS,\n * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n * See the License for the specific language governing permissions and\n * limitations under the License.\n */\n\nd-title {\n  padding: 2rem 0 1.5rem;\n  contain: layout style;\n  overflow-x: hidden;\n}\n\n@media(min-width: 768px) {\n  d-title {\n    padding: 4rem 0 1.5rem;\n  }\n}\n\nd-title h1 {\n  grid-column: text;\n  font-size: 40px;\n  font-weight: 700;\n  line-height: 1.1em;\n  margin: 0 0 0.5rem;\n}\n\n@media(min-width: 768px) {\n  d-title h1 {\n    font-size: 50px;\n  }\n}\n\nd-title p {\n  font-weight: 300;\n  font-size: 1.2rem;\n  line-height: 1.55em;\n  grid-column: text;\n}\n\nd-title .status {\n  margin-top: 0px;\n  font-size: 12px;\n  color: #009688;\n  opacity: 0.8;\n  grid-column: kicker;\n}\n\nd-title .status span {\n  line-height: 1;\n  display: inline-block;\n  padding: 6px 0;\n  border-bottom: 1px solid #80cbc4;\n  font-size: 11px;\n  text-transform: uppercase;\n}\n'+'/*\n * Copyright 2018 The Distill Template Authors\n *\n * Licensed under the Apache License, Version 2.0 (the "License");\n * you may not use this file except in compliance with the License.\n * You may obtain a copy of the License at\n *\n *      http://www.apache.org/licenses/LICENSE-2.0\n *\n * Unless required by applicable law or agreed to in writing, software\n * distributed under the License is distributed on an "AS IS" BASIS,\n * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n * See the License for the specific language governing permissions and\n * limitations under the License.\n */\n\nd-byline {\n  contain: style;\n  overflow: hidden;\n  border-top: 1px solid rgba(0, 0, 0, 0.1);\n  font-size: 0.8rem;\n  line-height: 1.8em;\n  padding: 1.5rem 0;\n  min-height: 1.8em;\n}\n\n\nd-byline .byline {\n  grid-template-columns: 1fr 1fr;\n  grid-column: text;\n}\n\n@media(min-width: 768px) {\n  d-byline .byline {\n    grid-template-columns: 1fr 1fr 1fr 1fr;\n  }\n}\n\nd-byline .authors-affiliations {\n  grid-column-end: span 2;\n  grid-template-columns: 1fr 1fr;\n  margin-bottom: 1em;\n}\n\n@media(min-width: 768px) {\n  d-byline .authors-affiliations {\n    margin-bottom: 0;\n  }\n}\n\nd-byline h3 {\n  font-size: 0.6rem;\n  font-weight: 400;\n  color: rgba(0, 0, 0, 0.5);\n  margin: 0;\n  text-transform: uppercase;\n}\n\nd-byline p {\n  margin: 0;\n}\n\nd-byline a,\nd-article d-byline a {\n  color: rgba(0, 0, 0, 0.8);\n  text-decoration: none;\n  border-bottom: none;\n}\n\nd-article d-byline a:hover {\n  text-decoration: underline;\n  border-bottom: none;\n}\n\nd-byline p.author {\n  font-weight: 500;\n}\n\nd-byline .affiliations {\n\n}\n'+'/*\n * Copyright 2018 The Distill Template Authors\n *\n * Licensed under the Apache License, Version 2.0 (the "License");\n * you may not use this file except in compliance with the License.\n * You may obtain a copy of the License at\n *\n *      http://www.apache.org/licenses/LICENSE-2.0\n *\n * Unless required by applicable law or agreed to in writing, software\n * distributed under the License is distributed on an "AS IS" BASIS,\n * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n * See the License for the specific language governing permissions and\n * limitations under the License.\n */\n\nd-article {\n  contain: layout style;\n  overflow-x: hidden;\n  border-top: 1px solid rgba(0, 0, 0, 0.1);\n  padding-top: 2rem;\n  color: rgba(0, 0, 0, 0.8);\n}\n\nd-article > * {\n  grid-column: text;\n}\n\n@media(min-width: 768px) {\n  d-article {\n    font-size: 16px;\n  }\n}\n\n@media(min-width: 1024px) {\n  d-article {\n    font-size: 1.06rem;\n    line-height: 1.7em;\n  }\n}\n\n\n/* H2 */\n\n\nd-article .marker {\n  text-decoration: none;\n  border: none;\n  counter-reset: section;\n  grid-column: kicker;\n  line-height: 1.7em;\n}\n\nd-article .marker:hover {\n  border: none;\n}\n\nd-article .marker span {\n  padding: 0 3px 4px;\n  border-bottom: 1px solid rgba(0, 0, 0, 0.2);\n  position: relative;\n  top: 4px;\n}\n\nd-article .marker:hover span {\n  color: rgba(0, 0, 0, 0.7);\n  border-bottom: 1px solid rgba(0, 0, 0, 0.7);\n}\n\nd-article h2 {\n  font-weight: 600;\n  font-size: 24px;\n  line-height: 1.25em;\n  margin: 2rem 0 1.5rem 0;\n  border-bottom: 1px solid rgba(0, 0, 0, 0.1);\n  padding-bottom: 1rem;\n}\n\n@media(min-width: 1024px) {\n  d-article h2 {\n    font-size: 36px;\n  }\n}\n\n/* H3 */\n\nd-article h3 {\n  font-weight: 700;\n  font-size: 18px;\n  line-height: 1.4em;\n  margin-bottom: 1em;\n  margin-top: 2em;\n}\n\n@media(min-width: 1024px) {\n  d-article h3 {\n    font-size: 20px;\n  }\n}\n\n/* H4 */\n\nd-article h4 {\n  font-weight: 600;\n  text-transform: uppercase;\n  font-size: 14px;\n  line-height: 1.4em;\n}\n\nd-article a {\n  color: inherit;\n}\n\nd-article p,\nd-article ul,\nd-article ol,\nd-article blockquote {\n  margin-top: 0;\n  margin-bottom: 1em;\n  margin-left: 0;\n  margin-right: 0;\n}\n\nd-article blockquote {\n  border-left: 2px solid rgba(0, 0, 0, 0.2);\n  padding-left: 2em;\n  font-style: italic;\n  color: rgba(0, 0, 0, 0.6);\n}\n\nd-article a {\n  border-bottom: 1px solid rgba(0, 0, 0, 0.4);\n  text-decoration: none;\n}\n\nd-article a:hover {\n  border-bottom: 1px solid rgba(0, 0, 0, 0.8);\n}\n\nd-article .link {\n  text-decoration: underline;\n  cursor: pointer;\n}\n\nd-article ul,\nd-article ol {\n  padding-left: 24px;\n}\n\nd-article li {\n  margin-bottom: 1em;\n  margin-left: 0;\n  padding-left: 0;\n}\n\nd-article li:last-child {\n  margin-bottom: 0;\n}\n\nd-article pre {\n  font-size: 14px;\n  margin-bottom: 20px;\n}\n\nd-article hr {\n  grid-column: screen;\n  width: 100%;\n  border: none;\n  border-bottom: 1px solid rgba(0, 0, 0, 0.1);\n  margin-top: 60px;\n  margin-bottom: 60px;\n}\n\nd-article section {\n  margin-top: 60px;\n  margin-bottom: 60px;\n}\n\nd-article span.equation-mimic {\n  font-family: georgia;\n  font-size: 115%;\n  font-style: italic;\n}\n\nd-article > d-code,\nd-article section > d-code  {\n  display: block;\n}\n\nd-article > d-math[block],\nd-article section > d-math[block]  {\n  display: block;\n}\n\n@media (max-width: 768px) {\n  d-article > d-code,\n  d-article section > d-code,\n  d-article > d-math[block],\n  d-article section > d-math[block] {\n      overflow-x: scroll;\n      -ms-overflow-style: none;  // IE 10+\n      overflow: -moz-scrollbars-none;  // Firefox\n  }\n\n  d-article > d-code::-webkit-scrollbar,\n  d-article section > d-code::-webkit-scrollbar,\n  d-article > d-math[block]::-webkit-scrollbar,\n  d-article section > d-math[block]::-webkit-scrollbar {\n    display: none;  // Safari and Chrome\n  }\n}\n\nd-article .citation {\n  color: #668;\n  cursor: pointer;\n}\n\nd-include {\n  width: auto;\n  display: block;\n}\n\nd-figure {\n  contain: layout style;\n}\n\n/* KaTeX */\n\n.katex, .katex-prerendered {\n  contain: style;\n  display: inline-block;\n}\n\n/* Tables */\n\nd-article table {\n  border-collapse: collapse;\n  margin-bottom: 1.5rem;\n  border-bottom: 1px solid rgba(0, 0, 0, 0.2);\n}\n\nd-article table th {\n  border-bottom: 1px solid rgba(0, 0, 0, 0.2);\n}\n\nd-article table td {\n  border-bottom: 1px solid rgba(0, 0, 0, 0.05);\n}\n\nd-article table tr:last-of-type td {\n  border-bottom: none;\n}\n\nd-article table th,\nd-article table td {\n  font-size: 15px;\n  padding: 2px 8px;\n}\n\nd-article table tbody :first-child td {\n  padding-top: 2px;\n}\n'+'/*\n * Copyright 2018 The Distill Template Authors\n *\n * Licensed under the Apache License, Version 2.0 (the "License");\n * you may not use this file except in compliance with the License.\n * You may obtain a copy of the License at\n *\n *      http://www.apache.org/licenses/LICENSE-2.0\n *\n * Unless required by applicable law or agreed to in writing, software\n * distributed under the License is distributed on an "AS IS" BASIS,\n * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n * See the License for the specific language governing permissions and\n * limitations under the License.\n */\n\nspan.katex-display {\n  text-align: left;\n  padding: 8px 0 8px 0;\n  margin: 0.5em 0 0.5em 1em;\n}\n\nspan.katex {\n  -webkit-font-smoothing: antialiased;\n  color: rgba(0, 0, 0, 0.8);\n  font-size: 1.18em;\n}\n'+'/*\n * Copyright 2018 The Distill Template Authors\n *\n * Licensed under the Apache License, Version 2.0 (the "License");\n * you may not use this file except in compliance with the License.\n * You may obtain a copy of the License at\n *\n *      http://www.apache.org/licenses/LICENSE-2.0\n *\n * Unless required by applicable law or agreed to in writing, software\n * distributed under the License is distributed on an "AS IS" BASIS,\n * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n * See the License for the specific language governing permissions and\n * limitations under the License.\n */\n\n@media print {\n\n  @page {\n    size: 8in 11in;\n    @bottom-right {\n      content: counter(page) " of " counter(pages);\n    }\n  }\n\n  html {\n    /* no general margins -- CSS Grid takes care of those */\n  }\n\n  p, code {\n    page-break-inside: avoid;\n  }\n\n  h2, h3 {\n    page-break-after: avoid;\n  }\n\n  d-header {\n    visibility: hidden;\n  }\n\n  d-footer {\n    display: none!important;\n  }\n\n}\n',ge="\nwindow.addEventListener('WebComponentsReady', function() {\n  console.warn('WebComponentsReady');\n  const loaderTag = document.createElement('script');\n  loaderTag.src = 'https://distill.pub/template.v2.js';\n  document.head.insertBefore(loaderTag, document.head.firstChild);\n});\n",ve="\nd-citation-list {\n  contain: style;\n}\n\nd-citation-list .references {\n  grid-column: text;\n}\n\nd-citation-list .references .title {\n  font-weight: 500;\n}\n";var be='<svg viewBox="-607 419 64 64">\n  <path d="M-573.4,478.9c-8,0-14.6-6.4-14.6-14.5s14.6-25.9,14.6-40.8c0,14.9,14.6,32.8,14.6,40.8S-565.4,478.9-573.4,478.9z"/>\n</svg>\n';const ye=`\n<style>\ndistill-header {\n  position: relative;\n  height: 60px;\n  background-color: hsl(200, 60%, 15%);\n  width: 100%;\n  box-sizing: border-box;\n  z-index: 2;\n  color: rgba(0, 0, 0, 0.8);\n  border-bottom: 1px solid rgba(0, 0, 0, 0.08);\n  box-shadow: 0 1px 6px rgba(0, 0, 0, 0.05);\n}\ndistill-header .content {\n  height: 70px;\n  grid-column: page;\n}\ndistill-header a {\n  font-size: 16px;\n  height: 60px;\n  line-height: 60px;\n  text-decoration: none;\n  color: rgba(255, 255, 255, 0.8);\n  padding: 22px 0;\n}\ndistill-header a:hover {\n  color: rgba(255, 255, 255, 1);\n}\ndistill-header svg {\n  width: 24px;\n  position: relative;\n  top: 4px;\n  margin-right: 2px;\n}\n@media(min-width: 1080px) {\n  distill-header {\n    height: 70px;\n  }\n  distill-header a {\n    height: 70px;\n    line-height: 70px;\n    padding: 28px 0;\n  }\n  distill-header .logo {\n  }\n}\ndistill-header svg path {\n  fill: none;\n  stroke: rgba(255, 255, 255, 0.8);\n  stroke-width: 3px;\n}\ndistill-header .logo {\n  font-size: 17px;\n  font-weight: 200;\n}\ndistill-header .nav {\n  float: right;\n  font-weight: 300;\n}\ndistill-header .nav a {\n  font-size: 12px;\n  margin-left: 24px;\n  text-transform: uppercase;\n}\n</style>\n<div class="content">\n  <a href="/" class="logo">\n    ${be}\n    Distill\n  </a>\n  <nav class="nav">\n    <a href="/about/">About</a>\n    <a href="/prize/">Prize</a>\n    <a href="/journal/">Submit</a>\n  </nav>\n</div>\n`,xe="\n<style>\n  distill-appendix {\n    contain: layout style;\n  }\n\n  distill-appendix .citation {\n    font-size: 11px;\n    line-height: 15px;\n    border-left: 1px solid rgba(0, 0, 0, 0.1);\n    padding-left: 18px;\n    border: 1px solid rgba(0,0,0,0.1);\n    background: rgba(0, 0, 0, 0.02);\n    padding: 10px 18px;\n    border-radius: 3px;\n    color: rgba(150, 150, 150, 1);\n    overflow: hidden;\n    margin-top: -12px;\n    white-space: pre-wrap;\n    word-wrap: break-word;\n  }\n\n  distill-appendix > * {\n    grid-column: text;\n  }\n</style>\n",we=`\n<style>\n\n:host {\n  color: rgba(255, 255, 255, 0.5);\n  font-weight: 300;\n  padding: 2rem 0;\n  border-top: 1px solid rgba(0, 0, 0, 0.1);\n  background-color: hsl(180, 5%, 15%); /*hsl(200, 60%, 15%);*/\n  text-align: left;\n  contain: content;\n}\n\n.footer-container .logo svg {\n  width: 24px;\n  position: relative;\n  top: 4px;\n  margin-right: 2px;\n}\n\n.footer-container .logo svg path {\n  fill: none;\n  stroke: rgba(255, 255, 255, 0.8);\n  stroke-width: 3px;\n}\n\n.footer-container .logo {\n  font-size: 17px;\n  font-weight: 200;\n  color: rgba(255, 255, 255, 0.8);\n  text-decoration: none;\n  margin-right: 6px;\n}\n\n.footer-container {\n  grid-column: text;\n}\n\n.footer-container .nav {\n  font-size: 0.9em;\n  margin-top: 1.5em;\n}\n\n.footer-container .nav a {\n  color: rgba(255, 255, 255, 0.8);\n  margin-right: 6px;\n  text-decoration: none;\n}\n\n</style>\n\n<div class='footer-container'>\n\n  <a href="/" class="logo">\n    ${be}\n    Distill\n  </a> is dedicated to clear explanations of machine learning\n\n  <div class="nav">\n    <a href="https://distill.pub/about/">About</a>\n    <a href="https://distill.pub/journal/">Submit</a>\n    <a href="https://distill.pub/prize/">Prize</a>\n    <a href="https://distill.pub/archive/">Archive</a>\n    <a href="https://distill.pub/rss.xml">RSS</a>\n    <a href="https://github.com/distillpub">GitHub</a>\n    <a href="https://twitter.com/distillpub">Twitter</a>\n    &nbsp;&nbsp;&nbsp;&nbsp; ISSN 2476-0757\n  </div>\n\n</div>\n\n`,ke=new Map([["ExtractFrontmatter",a],["ExtractBibliography",p],["ExtractCitations",w]]),Me=new Map([["HTML",k],["makeStyleTag",R],["OptionalComponents",z],["TOC",O],["Byline",S],["Mathematics",A],["Meta",T],["Typeset",q],["Polyfills",I],["CitationList",P],["Reorder",j]]),Se=new Map([["DistillHeader",F],["DistillAppendix",U],["DistillFooter",Y]]),ze={extractors:ke,transforms:Me,distillTransforms:Se};e.FrontMatter=ne,e.distillify=G,e.render=V,e.testing=ze,e.usesTemplateV2=W,Object.defineProperty(e,"__esModule",{value:!0})});
=======

  /**
   * Module variables.
   * @private
   */

  var matchHtmlRegExp = /["'&<>]/;

  /**
   * Module exports.
   * @public
   */

  var escapeHtml_1 = escapeHtml;

  /**
   * Escape special characters in the given string of html.
   *
   * @param  {string} string The string to escape for inserting into HTML
   * @return {string}
   * @public
   */

  function escapeHtml(string) {
    var str = "" + string;
    var match = matchHtmlRegExp.exec(str);

    if (!match) {
      return str;
    }

    var escape;
    var html = "";
    var index = 0;
    var lastIndex = 0;

    for (index = match.index; index < str.length; index++) {
      switch (str.charCodeAt(index)) {
        case 34: // "
          escape = "&quot;";
          break;
        case 38: // &
          escape = "&amp;";
          break;
        case 39: // '
          escape = "&#39;";
          break;
        case 60: // <
          escape = "&lt;";
          break;
        case 62: // >
          escape = "&gt;";
          break;
        default:
          continue;
      }

      if (lastIndex !== index) {
        html += str.substring(lastIndex, index);
      }

      lastIndex = index + 1;
      html += escape;
    }

    return lastIndex !== index ? html + str.substring(lastIndex, index) : html;
  }

  // Copyright 2018 The Distill Template Authors

  function Meta(dom, data) {
    let head = dom.querySelector("head");
    let appendHead = (html) => appendHtml(head, html);

    function meta(name, content, force) {
      if (content || force) appendHead(`    <meta name="${name}" content="${escapeHtml_1(content)}" >\n`);
    }

    appendHead(`
    <meta http-equiv="X-UA-Compatible" content="IE=Edge,chrome=1">
    <link rel="icon" type="image/png" href="data:image/png;base64,${favicon}">
    <link href="/rss.xml" rel="alternate" type="application/rss+xml" title="Articles from Distill">
  `);

    if (data.title) {
      appendHead(`
    <title>${escapeHtml_1(data.title)}</title>
    `);
    }

    if (data.url) {
      appendHead(`
    <link rel="canonical" href="${data.url}">
    `);
    }

    if (data.publishedDate) {
      appendHead(`
    <!--  https://schema.org/Article -->
    <meta property="description"       itemprop="description"   content="${escapeHtml_1(data.description)}" />
    <meta property="article:published" itemprop="datePublished" content="${data.publishedISODateOnly}" />
    <meta property="article:created"   itemprop="dateCreated"   content="${data.publishedISODateOnly}" />
    `);
    }

    if (data.updatedDate) {
      appendHead(`
    <meta property="article:modified"  itemprop="dateModified"  content="${data.updatedDate.toISOString()}" />
    `);
    }

    (data.authors || []).forEach((a) => {
      appendHtml(
        head,
        `
    <meta property="article:author" content="${escapeHtml_1(a.firstName)} ${escapeHtml_1(a.lastName)}" />`
      );
    });

    appendHead(`
    <!--  https://developers.facebook.com/docs/sharing/webmasters#markup -->
    <meta property="og:type" content="article"/>
    <meta property="og:title" content="${escapeHtml_1(data.title)}"/>
    <meta property="og:description" content="${escapeHtml_1(data.description)}">
    <meta property="og:url" content="${data.url}"/>
    <meta property="og:image" content="${data.previewURL}"/>
    <meta property="og:locale" content="en_US" />
    <meta property="og:site_name" content="Distill" />
  `);

    appendHead(`
    <!--  https://dev.twitter.com/cards/types/summary -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="${escapeHtml_1(data.title)}">
    <meta name="twitter:description" content="${escapeHtml_1(data.description)}">
    <meta name="twitter:url" content="${data.url}">
    <meta name="twitter:image" content="${data.previewURL}">
    <meta name="twitter:image:width" content="560">
    <meta name="twitter:image:height" content="295">
  `);

    // if this is a proprer article, generate Google Scholar meta data
    if (data.doiSuffix) {
      appendHead(`
      <!--  https://scholar.google.com/intl/en/scholar/inclusion.html#indexing -->\n`);

      meta("citation_title", data.title);
      meta("citation_fulltext_html_url", data.url);
      meta("citation_volume", data.volume);
      meta("citation_issue", data.issue);
      meta("citation_firstpage", data.doiSuffix ? `e${data.doiSuffix}` : undefined);
      meta("citation_doi", data.doi);

      let journal = data.journal || {};
      meta("citation_journal_title", journal.full_title || journal.title);
      meta("citation_journal_abbrev", journal.abbrev_title);
      meta("citation_issn", journal.issn);
      meta("citation_publisher", journal.publisher);
      meta("citation_fulltext_world_readable", "", true);

      if (data.publishedDate) {
        meta("citation_online_date", `${data.publishedYear}/${data.publishedMonthPadded}/${data.publishedDayPadded}`);
        meta("citation_publication_date", `${data.publishedYear}/${data.publishedMonthPadded}/${data.publishedDayPadded}`);
      }

      (data.authors || []).forEach((a) => {
        meta("citation_author", `${a.lastName}, ${a.firstName}`);
        meta("citation_author_institution", a.affiliation);
      });
    } else {
      console.warn("No DOI suffix in data; not adding citation meta tags!");
    }

    if (data.citations) {
      data.citations.forEach((key) => {
        if (data.bibliography && data.bibliography.has(key)) {
          const entry = data.bibliography.get(key);
          meta("citation_reference", citation_meta_content(entry));
        } else {
          console.warn("No bibliography data found for " + key);
        }
      });
    } else {
      console.warn("No citations found; not adding any references meta tags!");
    }
  }

  function appendHtml(el, html) {
    el.innerHTML += html;
  }

  function citation_meta_content(ref) {
    var content = `citation_title=${ref.title};`;

    if (ref.author && ref.author !== "") {
      ref.author.split(" and ").forEach((name) => {
        name = name.trim();
        let last, firsts;
        if (name.indexOf(",") != -1) {
          last = name.split(",")[0].trim();
          firsts = name.split(",")[1].trim();
        } else {
          last = name.split(" ").slice(-1)[0].trim();
          firsts = name.split(" ").slice(0, -1).join(" ");
        }
        content += `citation_author=${firsts} ${last};`;
      });
    }

    if ("year" in ref) {
      content += `citation_publication_date=${ref.year};`;
    }

    // Special test for arxiv
    let arxiv_id_search = /https?:\/\/arxiv\.org\/pdf\/([0-9]*\.[0-9]*)\.pdf/.exec(ref.url);
    arxiv_id_search = arxiv_id_search || /https?:\/\/arxiv\.org\/abs\/([0-9]*\.[0-9]*)/.exec(ref.url);
    arxiv_id_search = arxiv_id_search || /arXiv preprint arXiv:([0-9]*\.[0-9]*)/.exec(ref.journal);
    if (arxiv_id_search && arxiv_id_search[1]) {
      content += `citation_arxiv_id=${arxiv_id_search[1]};`;
      return content; // arXiv is not considered a journal, so we don't need journal/volume/issue
    }
    if ("journal" in ref) {
      content += `citation_journal_title=${escapeHtml_1(ref.journal)};`;
    }
    if ("volume" in ref) {
      content += `citation_volume=${escapeHtml_1(ref.volume)};`;
    }
    if ("issue" in ref || "number" in ref) {
      content += `citation_number=${escapeHtml_1(ref.issue || ref.number)};`;
    }
    return content;
  }

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

  var math =
    '/*\n * Copyright 2018 The Distill Template Authors\n *\n * Licensed under the Apache License, Version 2.0 (the "License");\n * you may not use this file except in compliance with the License.\n * You may obtain a copy of the License at\n *\n *      http://www.apache.org/licenses/LICENSE-2.0\n *\n * Unless required by applicable law or agreed to in writing, software\n * distributed under the License is distributed on an "AS IS" BASIS,\n * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n * See the License for the specific language governing permissions and\n * limitations under the License.\n */\n\nspan.katex-display {\n  text-align: left;\n  padding: 8px 0 8px 0;\n  margin: 0.5em 0 0.5em 1em;\n}\n\nspan.katex {\n  -webkit-font-smoothing: antialiased;\n  color: rgba(0, 0, 0, 0.8);\n  font-size: 1.18em;\n}\n';

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

  function TOC(dom) {
    const article = dom.querySelector("d-article");
    const toc = dom.querySelector("d-toc");
    if (toc) {
      const headings = article.querySelectorAll("h2, h3");
      renderTOC(toc, headings);
      toc.setAttribute("prerendered", "true");
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

  function Typeset(dom) {
    var textNodes = dom.createTreeWalker(dom.body, dom.defaultView.NodeFilter.SHOW_TEXT);
    while (textNodes.nextNode()) {
      var n = textNodes.currentNode,
        text = n.nodeValue;
      if (text && acceptNode(n)) {
        text = quotes(text);
        text = punctuation(text);
        // TODO: Add back support for ligatures once their uppercased versions don't hang Chrome search anymore
        // see: https://bugs.chromium.org/p/chromium/issues/detail?id=862648
        // text = ligatures(text);
        n.nodeValue = text;
      }
    }
  }

  // 2018-07-11 shancarter@ and ludwigschubert@ no longer know what this was meant to accomplish
  // if it was trying to not replace text in any child nodes of those listed here,
  // then it does not accomplish that.
  function acceptNode(node) {
    var parent = node.parentElement;
    var isMath =
      parent && parent.getAttribute && parent.getAttribute("class")
        ? parent.getAttribute("class").includes("katex") || parent.getAttribute("class").includes("MathJax")
        : false;
    return (
      parent &&
      parent.nodeName !== "SCRIPT" &&
      parent.nodeName !== "STYLE" &&
      parent.nodeName !== "CODE" &&
      parent.nodeName !== "PRE" &&
      parent.nodeName !== "SPAN" &&
      parent.nodeName !== "D-HEADER" &&
      parent.nodeName !== "D-BYLINE" &&
      parent.nodeName !== "D-MATH" &&
      parent.nodeName !== "D-CODE" &&
      parent.nodeName !== "D-BIBLIOGRAPHY" &&
      parent.nodeName !== "D-FOOTER" &&
      parent.nodeName !== "D-APPENDIX" &&
      parent.nodeName !== "D-FRONTMATTER" &&
      parent.nodeName !== "D-TOC" &&
      parent.nodeType !== 8 && //comment nodes
      !isMath
    );
  }

  /*!
   * typeset - Typesetting for the web
   * @version v0.1.6
   * @link https://github.com/davidmerfield/Typeset.js
   * @author David Merfield
   */
  // which has a CC0 license
  // http://creativecommons.org/publicdomain/zero/1.0/

  function punctuation(text) {
    // Dashes
    text = text.replace(/--/g, "\u2014");
    text = text.replace(/\s*\u2014\s*/g, "\u2009\u2014\u2009"); //this has thin spaces

    // Elipses
    text = text.replace(/\.\.\./g, "…");

    // Nbsp for punc with spaces
    var NBSP = "\u00a0";
    var NBSP_PUNCTUATION_START = /([«¿¡]) /g;
    var NBSP_PUNCTUATION_END = / ([!?:;.,‽»])/g;

    text = text.replace(NBSP_PUNCTUATION_START, "$1" + NBSP);
    text = text.replace(NBSP_PUNCTUATION_END, NBSP + "$1");

    return text;
  }

  function quotes(text) {
    text = text
      .replace(/(\W|^)"([^\s!?:;.,‽»])/g, "$1\u201c$2") // beginning "
      .replace(/(\u201c[^"]*)"([^"]*$|[^\u201c"]*\u201c)/g, "$1\u201d$2") // ending "
      .replace(/([^0-9])"/g, "$1\u201d") // remaining " at end of word
      .replace(/(\W|^)'(\S)/g, "$1\u2018$2") // beginning '
      .replace(/([a-z])'([a-z])/gi, "$1\u2019$2") // conjunction's possession
      .replace(/((\u2018[^']*)|[a-z])'([^0-9]|$)/gi, "$1\u2019$3") // ending '
      .replace(/(\u2018)([0-9]{2}[^\u2019]*)(\u2018([^0-9]|$)|$|\u2019[a-z])/gi, "\u2019$2$3") // abbrev. years like '93
      .replace(/(\B|^)\u2018(?=([^\u2019]*\u2019\b)*([^\u2019\u2018]*\W[\u2019\u2018]\b|[^\u2019\u2018]*$))/gi, "$1\u2019") // backwards apostrophe
      .replace(/'''/g, "\u2034") // triple prime
      .replace(/("|'')/g, "\u2033") // double prime
      .replace(/'/g, "\u2032");

    // Allow escaped quotes
    text = text.replace(/\\“/, '"');
    text = text.replace(/\\”/, '"');
    text = text.replace(/\\’/, "'");
    text = text.replace(/\\‘/, "'");

    return text;
  }

  // Copyright 2018 The Distill Template Authors

  // const template = `
  // if ('IntersectionObserver' in window &&
  //   'IntersectionObserverEntry' in window &&
  //   'intersectionRatio' in IntersectionObserverEntry.prototype) {
  //     // Platform supports IntersectionObserver natively! :-)
  //     if (!('isIntersecting' in IntersectionObserverEntry.prototype)) {
  //       Object.defineProperty(IntersectionObserverEntry.prototype,
  //         'isIntersecting', {
  //         get: function () {
  //           return this.intersectionRatio > 0;
  //         }
  //       });
  //     }
  // } else {
  //   // Platform does not support webcomponents--loading polyfills synchronously.
  //   const scriptTag = document.createElement('script');
  //   scriptTag.src = '${intersectionObserverPath}';
  //   scriptTag.async = false;
  //   document.currentScript.parentNode.insertBefore(scriptTag, document.currentScript.nextSibling);
  // }
  //
  // if ('registerElement' in document &&
  //     'import' in document.createElement('link') &&
  //     'content' in document.createElement('template')) {
  //   // Platform supports webcomponents natively! :-)
  // } else {
  //   // Platform does not support webcomponents--loading polyfills synchronously.
  //   const scriptTag = document.createElement('script');
  //   scriptTag.src = '${webcomponentPath}';
  //   scriptTag.async = false;
  //   document.currentScript.parentNode.insertBefore(scriptTag, document.currentScript.nextSibling);
  // }
  //
  //
  // `;

  const addBackIn = `
window.addEventListener('WebComponentsReady', function() {
  console.warn('WebComponentsReady');
  const loaderTag = document.createElement('script');
  loaderTag.src = 'https://distill.pub/template.v2.js';
  document.head.insertBefore(loaderTag, document.head.firstChild);
});
`;

  function render(dom) {
    // pull out template script tag
    const templateTag = dom.querySelector('script[src*="template.v2.js"]');
    if (templateTag) {
      templateTag.parentNode.removeChild(templateTag);
    } else {
      console.debug("FYI: Did not find template tag when trying to remove it. You may not have added it. Be aware that our polyfills will add it.");
    }

    // add loader
    const loaderTag = dom.createElement("script");
    loaderTag.src = "https://cdnjs.cloudflare.com/ajax/libs/webcomponentsjs/1.0.17/webcomponents-loader.js";
    dom.head.insertBefore(loaderTag, dom.head.firstChild);

    // add loader event listener to add tempalrte back in
    const addTag = dom.createElement("script");
    addTag.innerHTML = addBackIn;
    dom.head.insertBefore(addTag, dom.head.firstChild);

    // create polyfill script tag
    // const polyfillScriptTag = dom.createElement('script');
    // polyfillScriptTag.innerHTML = template;
    // polyfillScriptTag.id = 'polyfills';

    // insert at appropriate position--before any other script tag
    // const firstScriptTag = dom.head.querySelector('script');
    // dom.head.insertBefore(polyfillScriptTag, firstScriptTag);
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

  // Copyright 2018 The Distill Template Authors

  function CitationList(dom, data) {
    const citationListTag = dom.querySelector("d-citation-list");
    if (citationListTag) {
      const entries = new Map(
        data.citations.map((citationKey) => {
          return [citationKey, data.bibliography.get(citationKey)];
        })
      );
      renderCitationList(citationListTag, entries, dom);
      citationListTag.setAttribute("distill-prerendered", "true");
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

  /*
    Try to only reorder things that MAY be user defined.
    Try to use templates etc to define the order of our own tags.
  */

  function render$1(dom) {
    const head = dom.head;

    const metaIE = head.querySelector("meta[http-equiv]");
    head.insertBefore(metaIE, head.firstChild);

    const metaViewport = head.querySelector("meta[name=viewport]");
    head.insertBefore(metaViewport, head.firstChild);

    const metaCharset = head.querySelector("meta[charset]");
    head.insertBefore(metaCharset, head.firstChild);
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

  function DistillHeader(dom, data) {
    const headerTag = dom.querySelector("distill-header");
    if (!headerTag) {
      const header = dom.createElement("distill-header");
      header.innerHTML = headerTemplate;
      header.setAttribute("distill-prerendered", "");
      const body = dom.querySelector("body");
      body.insertBefore(header, body.firstChild);
    }
  }

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

  // Copyright 2018 The Distill Template Authors

  function DistillAppendix(dom, data) {
    const appendixTag = dom.querySelector("d-appendix");
    if (!appendixTag) {
      console.warn("No appendix tag found!");
      return;
    }
    const distillAppendixTag = appendixTag.querySelector("distill-appendix");
    if (!distillAppendixTag) {
      const distillAppendix = dom.createElement("distill-appendix");
      appendixTag.appendChild(distillAppendix);
      distillAppendix.innerHTML = appendixTemplate(data);
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

  function DistillFooter(dom) {
    const footerTag = dom.querySelector("distill-footer");
    if (!footerTag) {
      const footer = dom.createElement("distill-footer");
      footer.innerHTML = footerTemplate;
      const body = dom.querySelector("body");
      body.appendChild(footer);
    }
  }

  // Copyright 2018 The Distill Template Authors

  const extractors = new Map([
    ["ExtractFrontmatter", ExtractFrontmatter],
    ["ExtractBibliography", ExtractBibliography],
    ["ExtractCitations", ExtractCitations],
  ]);

  const transforms = new Map([
    ["HTML", HTML],
    ["makeStyleTag", makeStyleTag],
    ["OptionalComponents", OptionalComponents],
    ["TOC", TOC],
    ["Byline", Byline],
    ["Mathematics", Mathematics],
    ["Meta", Meta],
    ["Typeset", Typeset],
    ["Polyfills", render],
    ["CitationList", CitationList],
    ["Reorder", render$1], // keep last
  ]);

  const distillTransforms = new Map([
    ["DistillHeader", DistillHeader],
    ["DistillAppendix", DistillAppendix],
    ["DistillFooter", DistillFooter],
  ]);

  /* Exported functions */

  function render$2(dom, data, verbose = true) {
    let frontMatter;
    if (data instanceof FrontMatter) {
      frontMatter = data;
    } else {
      frontMatter = FrontMatter.fromObject(data);
    }
    // first, we collect static data from the dom
    for (const [name, extract] of extractors.entries()) {
      if (verbose) console.warn("Running extractor: " + name);
      extract(dom, frontMatter, verbose);
    }
    // secondly we use it to transform parts of the dom
    for (const [name, transform] of transforms.entries()) {
      if (verbose) console.warn("Running transform: " + name);
      // console.warn('Running transform: ', transform);
      transform(dom, frontMatter, verbose);
    }
    dom.body.setAttribute("distill-prerendered", "");
    // the function calling us can now use the transformed dom and filled data object
    if (data instanceof FrontMatter);
    else {
      frontMatter.assignToObject(data);
    }
  }

  function distillify(dom, data, verbose = true) {
    // thirdly, we can use these additional transforms when publishing on the Distill website
    for (const [name, transform] of distillTransforms.entries()) {
      if (verbose) console.warn("Running distillify: ", name);
      transform(dom, data, verbose);
    }
  }

  function usesTemplateV2(dom) {
    const tags = dom.querySelectorAll("script");
    let usesV2 = undefined;
    for (const tag of tags) {
      const src = tag.src;
      if (src.includes("template.v1.js")) {
        usesV2 = false;
      } else if (src.includes("template.v2.js")) {
        usesV2 = true;
      } else if (src.includes("template.")) {
        throw new Error("Uses distill template, but unknown version?!");
      }
    }

    if (usesV2 === undefined) {
      throw new Error("Does not seem to use Distill template at all.");
    } else {
      return usesV2;
    }
  }

  const testing = {
    extractors: extractors,
    transforms: transforms,
    distillTransforms: distillTransforms,
  };

  exports.FrontMatter = FrontMatter;
  exports.distillify = distillify;
  exports.render = render$2;
  exports.testing = testing;
  exports.usesTemplateV2 = usesTemplateV2;

  Object.defineProperty(exports, "__esModule", { value: true });
});
//# sourceMappingURL=transforms.v2.js.map
>>>>>>> master
