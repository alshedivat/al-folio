<<<<<<< HEAD
function grid(t,e){const n=document.createElementNS("http://www.w3.org/2000/svg","g"),s=document.createElementNS("http://www.w3.org/2000/svg","line");s.setAttribute("x1",15),s.setAttribute("y1",0),s.setAttribute("x2",15),s.setAttribute("y2",54),s.setAttribute("class","center");const r=document.createElementNS("http://www.w3.org/2000/svg","line");r.setAttribute("x1",0),r.setAttribute("y1",30),r.setAttribute("x2",30),r.setAttribute("y2",54),r.setAttribute("class","center");for(let s=0;s<=30*t;s+=3){const t=document.createElementNS("http://www.w3.org/2000/svg","line");t.setAttribute("x1",s),t.setAttribute("y1",0),t.setAttribute("x2",s),t.setAttribute("y2",54*e),t.setAttribute("class","grid"),n.appendChild(t)}for(let s=0;s<=54*e;s+=3){const e=document.createElementNS("http://www.w3.org/2000/svg","line");e.setAttribute("x1",0),e.setAttribute("y1",s),e.setAttribute("x2",30*t),e.setAttribute("y2",s),e.setAttribute("class","grid"),n.appendChild(e)}return n}function cross([t,e,n,s,r,i,o,c]){const p=document.createElementNS("http://www.w3.org/2000/svg","g");if(t){const t=document.createElementNS("http://www.w3.org/2000/svg","line");t.setAttribute("x1",15),t.setAttribute("y1",0),t.setAttribute("x2",15),t.setAttribute("y2",27),t.setAttribute("class","part"),p.appendChild(t)}if(e){const t=document.createElementNS("http://www.w3.org/2000/svg","line");t.setAttribute("x1",15),t.setAttribute("y1",27),t.setAttribute("x2",30),t.setAttribute("y2",27),t.setAttribute("class","part"),p.appendChild(t)}if(n){const t=document.createElementNS("http://www.w3.org/2000/svg","line");t.setAttribute("x1",15),t.setAttribute("y1",27),t.setAttribute("x2",15),t.setAttribute("y2",54),t.setAttribute("class","part"),p.appendChild(t)}if(s){const t=document.createElementNS("http://www.w3.org/2000/svg","line");t.setAttribute("x1",0),t.setAttribute("y1",27),t.setAttribute("x2",15),t.setAttribute("y2",27),t.setAttribute("class","part"),p.appendChild(t)}if(document.createElementNS("http://www.w3.org/2000/svg","polygon").setAttribute("points",[[0,0],[20.6,0],[20.6,3],[0,3]].map(([t,e])=>`${t},${e}`).join(" ")),r){const t=document.createElementNS("http://www.w3.org/2000/svg","line");t.setAttribute("x1",30),t.setAttribute("y1",0),t.setAttribute("x2",15),t.setAttribute("y2",27),t.setAttribute("class","part"),p.appendChild(t)}if(i){const t=document.createElementNS("http://www.w3.org/2000/svg","line");t.setAttribute("x1",15),t.setAttribute("y1",27),t.setAttribute("x2",30),t.setAttribute("y2",54),t.setAttribute("class","part"),p.appendChild(t)}if(o){const t=document.createElementNS("http://www.w3.org/2000/svg","line");t.setAttribute("x1",15),t.setAttribute("y1",27),t.setAttribute("x2",0),t.setAttribute("y2",54),t.setAttribute("class","part"),p.appendChild(t)}if(c){const t=document.createElementNS("http://www.w3.org/2000/svg","line");t.setAttribute("x1",0),t.setAttribute("y1",0),t.setAttribute("x2",15),t.setAttribute("y2",27),t.setAttribute("class","part"),p.appendChild(t)}return p}function text(t,e){const n=document.createElementNS("http://www.w3.org/2000/svg","g"),s=document.createElementNS("http://www.w3.org/2000/svg","text"),r=document.createTextNode(t);s.appendChild(r),e&&s.setAttribute("class","reserved");const i=[[15,24]];return s.setAttribute("transform",i.map(([t,e])=>`translate(${t}, ${e})`).join(" ")),n.appendChild(s),n}function render(t){const e=document.createElementNS("http://www.w3.org/2000/svg","g");for(let n=0;n<t.length;n++)for(let s=0;s<t[n].length;s++){const r=t[n][s];if(" "==r||'"'==r)continue;let i=glyphs[r];const o=document.createElementNS("http://www.w3.org/2000/svg","g");let c=!1;for(let e=0;e<s;e++)'"'==t[n][e]&&(c=!c);const p=around(t,[s,n]);if(r.match(/[A-Za-z0-9]/)){const[,t,,e]=p;c=c||e.match(/[A-Za-uw-z0-9]/)||t.match(/[A-Za-uw-z0-9]/)}(i=i&&!c)&&o.appendChild(glyphs[r](p)),o.appendChild(text(r,i)),o.setAttribute("transform",`translate(${30*s} ${54*n})`),e.appendChild(o)}return e}function create(t,e,n){const s=t.split("\n").map(t=>t.trimEnd().split(""));s.shift(),s.splice(-1);let r=0;const i=s.length;for(let t=0;t<s.length;t++)for(let e=0;e<s[t].length;e++)s[t].length>r&&(r=s[e].length);var o=document.createElementNS("http://www.w3.org/2000/svg","svg");o.setAttribute("width",30*r*e),o.setAttribute("height",54*i*e),o.setAttribute("debug",n);const c=0;return o.setAttribute("viewBox",`${-c} ${-c} ${30*r+2*c} ${54*i+2*c}`),o.setAttribute("class","debug"),o.appendChild(render(s)),n&&o.appendChild(grid(r,i)),o}function around(t,[e,n]){let s=" ",r=" ",i=" ",o=" ",c=" ",p=" ",l=" ",u=" ";return n>0&&(r=t[n-1][e]||" "),e<t[n].length-1&&(i=t[n][e+1]||" "),n<t.length-1&&(o=t[n+1][e]||" "),e>0&&(s=t[n][e-1]||" "),n>0&&e<t[n-1].length-1&&(c=t[n-1][e+1]||" "),n+1<t.length&&e<t[n+1].length&&(p=t[n+1][e+1]||" "),n<t.length-1&&e>0&&(l=t[n+1][e-1]||" "),n>0&&e>0&&(u=t[n-1][e-1]||" "),[r,i,o,s,c,p,l,u]}const ratio=2,glyphs={"|":([t,e,n,s,r,i,o,c])=>{const p=document.createElementNS("http://www.w3.org/2000/svg","g");if("_"==e){const t=document.createElementNS("http://www.w3.org/2000/svg","line");t.setAttribute("x1","18"),t.setAttribute("y1","51"),t.setAttribute("x2","30"),t.setAttribute("y2","51"),t.setAttribute("class","part"),p.appendChild(t)}if("_"==s){const t=document.createElementNS("http://www.w3.org/2000/svg","line");t.setAttribute("x1","0"),t.setAttribute("y1","51"),t.setAttribute("x2","12"),t.setAttribute("y2","51"),t.setAttribute("class","part"),p.appendChild(t)}if("_"==r){const t=document.createElementNS("http://www.w3.org/2000/svg","line");t.setAttribute("x1","12"),t.setAttribute("y1","-3"),t.setAttribute("x2","30"),t.setAttribute("y2","-3"),t.setAttribute("class","part"),p.appendChild(t)}if("_"==c){const t=document.createElementNS("http://www.w3.org/2000/svg","line");t.setAttribute("x1","0"),t.setAttribute("y1","-3"),t.setAttribute("x2","18"),t.setAttribute("y2","-3"),t.setAttribute("class","part"),p.appendChild(t)}return p.appendChild(cross([!("/"==r&&"\\"==c),["-"].includes(e),!("/"==o&&"\\"==i),["-"].includes(s),"/"==r,"\\"==i,"/"==o,"\\"==c])),p},"-":([t,e,n,s,r,i,o,c])=>cross([["|"].includes(t),!0,["|"].includes(n),!0,!1,!1,!1,!1]),"~":([t,e,n,s,r,i,o,c])=>{const p=document.createElementNS("http://www.w3.org/2000/svg","g"),l=document.createElementNS("http://www.w3.org/2000/svg","line");return l.setAttribute("x1","9"),l.setAttribute("y1","27"),l.setAttribute("x2","24"),l.setAttribute("y2","27"),l.setAttribute("class","part"),p.appendChild(l),p},_:t=>{const e=glyphs["-"](t);return e.setAttribute("transform","translate(0 24)"),e},":":([t,e,n,s,r,i,o,c])=>{const p=document.createElementNS("http://www.w3.org/2000/svg","g"),l=document.createElementNS("http://www.w3.org/2000/svg","line");if(l.setAttribute("x1","15"),l.setAttribute("y1","0"),l.setAttribute("x2","15"),l.setAttribute("y2","60"),l.setAttribute("class","part"),l.setAttribute("style","stroke-dasharray: 15; stroke-dashoffset: 0;"),p.appendChild(l),"+"==t){const t=document.createElementNS("http://www.w3.org/2000/svg","line");t.setAttribute("x1","15"),t.setAttribute("y1","-24"),t.setAttribute("x2","15"),t.setAttribute("y2","-15"),t.setAttribute("class","part"),p.appendChild(t)}if("+"==n){const t=document.createElementNS("http://www.w3.org/2000/svg","line");t.setAttribute("x1","15"),t.setAttribute("y1","60"),t.setAttribute("x2","15"),t.setAttribute("y2","78"),t.setAttribute("class","part"),p.appendChild(t)}return p},"=":()=>{const t=document.createElementNS("http://www.w3.org/2000/svg","g"),e=document.createElementNS("http://www.w3.org/2000/svg","line");e.setAttribute("x1","0"),e.setAttribute("y1","21"),e.setAttribute("x2","30"),e.setAttribute("y2","21"),e.setAttribute("class","part"),t.appendChild(e);const n=document.createElementNS("http://www.w3.org/2000/svg","line");return n.setAttribute("x1","0"),n.setAttribute("y1","30"),n.setAttribute("x2","30"),n.setAttribute("y2","30"),n.setAttribute("class","part"),t.appendChild(n),t},"*":([t,e,n,s,r,i,o,c])=>{const p=document.createElementNS("http://www.w3.org/2000/svg","g"),l=document.createElementNS("http://www.w3.org/2000/svg","circle");return l.setAttribute("cx","0"),l.setAttribute("cy","0"),l.setAttribute("r","21"),l.setAttribute("stroke","none"),l.setAttribute("transform","translate(15, 27)"),p.appendChild(l),p.appendChild(cross([["+","|"].includes(t),["+","-"].includes(e),["+","|"].includes(n),["+","-"].includes(s),["/"].includes(r),["\\"].includes(i),["/"].includes(o),["\\"].includes(c)])),p},o:([t,e,n,s,r,i,o,c])=>{const p=document.createElementNS("http://www.w3.org/2000/svg","g"),l=document.createElementNS("http://www.w3.org/2000/svg","circle");l.setAttribute("cx","0"),l.setAttribute("cy","0"),l.setAttribute("r","18"),l.setAttribute("stroke-width","6"),l.setAttribute("fill","none"),l.setAttribute("stroke","var(--global-text-color)"),l.setAttribute("transform","translate(15, 27)"),p.appendChild(l);const u=cross([["+","|"].includes(t),["+","-"].includes(e),["+","|"].includes(n),["+","-"].includes(s),["/"].includes(r),["\\"].includes(i),["/"].includes(o),["\\"].includes(c)]);p.appendChild(u);const a=document.createElementNS("http://www.w3.org/2000/svg","circle");return a.setAttribute("cx","0"),a.setAttribute("cy","0"),a.setAttribute("r","15"),a.setAttribute("fill","white"),a.setAttribute("opacity","100%"),a.setAttribute("transform","translate(15, 27)"),p.appendChild(a),p},"/":t=>{const[e,n,s,r,i,o,c,p]=t,l=document.createElementNS("http://www.w3.org/2000/svg","g");if(l.appendChild(cross([["|"].includes(e),!1,["|"].includes(s),!1,!0,!1,!0,!1])),"\\"==n){const t=cross([!1,!1,!1,!1,!1,!1,!0,!1]);t.setAttribute("transform","translate(30 -54)"),t.setAttribute("clip-path","polygon(-3 0, 0 0, 0 54, -3 54)"),l.appendChild(t)}if("\\"==r){const t=cross([!1,!1,!1,!1,!0,!1,!1,!1]);t.setAttribute("transform","translate(-30 54)"),t.setAttribute("clip-path","polygon(15 -6, 33 -6, 33 6, 15 6)"),l.appendChild(t)}if("_"==n){const e=glyphs._(t);l.appendChild(e)}return l},"\\":t=>{const[e,n,s,r,i,o,c,p]=t,l=document.createElementNS("http://www.w3.org/2000/svg","g");if(l.appendChild(cross([["|"].includes(e),!1,["|"].includes(s),!1,!1,!0,!1,!0])),"/"==r){const t=cross([!1,!1,!1,!1,!1,!0,!1,!1]);t.setAttribute("transform","translate(-30 -54)"),t.setAttribute("clip-path","polygon(15 0, 30 0, 30 54, 15 54)"),l.appendChild(t)}if("/"==n){const t=cross([!1,!1,!1,!1,!1,!1,!1,!0]);t.setAttribute("transform","translate(30 54)"),t.setAttribute("clip-path","polygon(-3 0, 0 0, 0 6, -3 6)"),l.appendChild(t)}if("_"==r){const e=glyphs._(t);l.appendChild(e)}return l},"#":([t,e,n,s,r,i,o,c])=>{const p=document.createElementNS("http://www.w3.org/2000/svg","g"),l=document.createElementNS("http://www.w3.org/2000/svg","polygon"),u=[[0,0],[42,0],[42,42],[0,42]];return l.setAttribute("points",u.map(([t,e])=>`${t},${e}`).join(" ")),l.setAttribute("transform","translate(-6, 6)"),p.appendChild(l),p.appendChild(cross([["+","|"].includes(t),["+","-"].includes(e),["+","|"].includes(n),["+","-"].includes(s),["/"].includes(r),["\\"].includes(i),["/"].includes(o),["\\"].includes(c)])),p},"+":([t,e,n,s,r,i,o,c])=>{const p=document.createElementNS("http://www.w3.org/2000/svg","g"),l=["*","#","-","+","~",">",".","'","`"].includes(e),u=["*","#","-","+","~","<",".","'","`"].includes(s),a=["*","#","|","+",".","`","^"].includes(t),d=["*","#","|","+","'","`","v"].includes(n),w=["/","*","#"].includes(r),A=["\\","*","#"].includes(i),h=["\\","*","#"].includes(c),g=["/","*","#"].includes(o);if(p.appendChild(cross([a,l,d,u,w,A,g,h])),(u||l)&&(d||a)){const t=document.createElementNS("http://www.w3.org/2000/svg","polygon");t.setAttribute("points","0,0 6,0 6,6 0,6"),t.setAttribute("transform","translate(-3 -3) translate(15 27)"),p.appendChild(t)}if(w||h){const t=cross([!1,!1,!1,!1,!1,h,w,!1]);t.setAttribute("clip-path","polygon(0 -3, 30 -3, 30 0, 0 0)"),p.appendChild(t)}if(A||g){const t=cross([!1,!1,!1,!1,g,!1,!1,A]);t.setAttribute("clip-path","polygon(0 27, 15 27, 15 30, 0 30)"),p.appendChild(t)}if(g||h){const t=cross([!1,!1,!1,!1,g&&A,h&&w,!1,!1]);t.setAttribute("clip-path","polygon(-3 0, 0 0, 0 54, -3 54)"),p.appendChild(t)}if(A||w){const t=cross([!1,!1,!1,!1,!1,!1,w&&h,A&&g]);t.setAttribute("clip-path","polygon(15 0, 30 0, 30 54, 15 54)"),p.appendChild(t)}if(l||u){const t=cross([!1,!1,!1,!1,l||g,h,w,u||A]);t.setAttribute("clip-path","polygon(-3 24, 30 24, 30 30, -3 30)"),p.appendChild(t)}return p},".":([t,e,n,s,r,i,o,c])=>{const p=document.createElementNS("http://www.w3.org/2000/svg","g");if(!("-"!=e&&"+"!=e||"|"!=n&&"'"!=n&&"`"!=n&&"+"!=n)){const t=document.createElementNS("http://www.w3.org/2000/svg","path");t.setAttribute("d","\n        M 30 24\n        A 18 18, 0, 0, 0, 12 42\n        L 12 54\n        L 18 54\n        L 18 42\n        A 12 12, 0, 0, 1, 30 30\n        Z"),p.appendChild(t)}if(!("-"!=s&&"+"!=s||"|"!=n&&"'"!=n&&"`"!=n&&"+"!=n)){const t=document.createElementNS("http://www.w3.org/2000/svg","path");t.setAttribute("d","\n        M 0 24\n        A 18 18, 0, 0, 1, 18 42\n        L 18 54\n        L 12 54\n        L 12 42\n        A 12 12, 0, 0, 0, 0 30\n        Z"),p.appendChild(t)}if(!("-"!=e&&"+"!=e||"|"!=t&&"."!=t&&"+"!=t)){const t=document.createElementNS("http://www.w3.org/2000/svg","path");t.setAttribute("d","\n        M 30 30\n        A 18 18, 0, 0, 1, 12 12\n        L 12 0\n        L 18 0\n        L 18 12\n        A 12 12, 0, 0, 0, 30 24\n        Z"),p.appendChild(t)}if(!("-"!=s&&"+"!=s||"|"!=t&&"."!=t&&"+"!=t)){const t=document.createElementNS("http://www.w3.org/2000/svg","path");t.setAttribute("d","\n        M 0 30\n        A 18 18, 0, 0, 0, 18 12\n        L 18 0\n        L 12 0\n        L 12 12\n        A 12 12, 0, 0, 1, 0 24\n        Z"),p.appendChild(t)}if("-"==e&&"/"==r){const t=document.createElementNS("http://www.w3.org/2000/svg","path");t.setAttribute("d","\n        M 30 30\n        A 12 12, 0, 0, 1, 18 18\n        L 18 15\n        L 24 15\n        L 24 18\n        A 6 6, 0, 0, 0, 30 24\n        Z"),p.appendChild(t);const e=cross([!1,!1,!1,!1,!0,!1,!1,!1]);e.setAttribute("clip-path","polygon(15px -10px, 30px -10px, 30px 30px, 2px 15px)"),p.appendChild(e)}if("-"==e&&"\\"==c){const t=document.createElementNS("http://www.w3.org/2000/svg","path");t.setAttribute("d","\n        M -3 0\n        A 60 60, 0, 0, 0, 30 30\n        L 30 24\n        A 60 60, 0, 0, 1, 0 -6\n        Z"),p.appendChild(t)}if("-"==s&&"/"==r){const t=document.createElementNS("http://www.w3.org/2000/svg","path");t.setAttribute("d","\n        M 0 30\n        A 60 60, 0, 0, 0, 33 0\n        L 30 -6\n        A 60 60, 0, 0, 1, 0 24\n        Z"),p.appendChild(t)}if("-"==s&&"\\"==c){const t=document.createElementNS("http://www.w3.org/2000/svg","path");t.setAttribute("d","\n        M 0 30\n        A 12 12, 0, 0, 0, 12 18\n        L 12 15\n        L 6 15\n        L 6 18\n        A 6 6, 0, 0, 1, 0 24\n        Z"),p.appendChild(t);const e=cross([!1,!1,!1,!1,!1,!1,!1,!0]);e.setAttribute("clip-path","polygon(-3 -3, 12 -3, 12 18, -3 18)"),p.appendChild(e)}if("|"==n&&"/"==r){const t=document.createElementNS("http://www.w3.org/2000/svg","path");t.setAttribute("d","\n        M 12 54\n        A 120 120, 0, 0, 1, 30 -6\n        L 37 -6\n        A 120 120, 0, 0, 0, 18 54\n        Z"),p.appendChild(t)}if("|"==t&&"\\"==i){const t=document.createElementNS("http://www.w3.org/2000/svg","path");t.setAttribute("d","\n        M 30 60\n        A 120 120, 0, 0, 1, 12 0\n        L 18 0\n        A 120 120, 0, 0, 0, 37 60\n        Z"),p.appendChild(t)}if("|"==t&&"/"==o){const t=document.createElementNS("http://www.w3.org/2000/svg","path");t.setAttribute("d","\n        M 0 60\n        A 120 120, 0, 0, 0, 18 0\n        L 12 0\n        A 120 120, 0, 0, 1, -7 60\n        Z"),p.appendChild(t)}if("|"==n&&"\\"==c){const t=document.createElementNS("http://www.w3.org/2000/svg","path");t.setAttribute("d","\n        M 12 54\n        A 120 120, 0, 0, 0, -7 -6\n        L 0 -6\n        A 120 120, 0, 0, 1, 18 54\n        Z"),p.appendChild(t)}if("-"==e&&"/"==o){const t=document.createElementNS("http://www.w3.org/2000/svg","path");t.setAttribute("d","\n        M 0 48\n        A 42 42, 0, 0, 1, 30 24\n        L 30 30\n        A 42 42, 0, 0, 0, 6 48\n        Z"),p.appendChild(t);const e=cross([!1,!1,!1,!1,!1,!1,!0,!1]);e.setAttribute("clip-path","polygon(-3 15, 12 15, 12 30, -3 30)"),p.appendChild(e)}if("-"==s&&"\\"==i){const t=document.createElementNS("http://www.w3.org/2000/svg","path");t.setAttribute("d","\n        M 0 24\n        A 42 42, 0, 0, 1, 30 48\n        L 24 48\n        A 42 42, 0, 0, 0, 0 30\n        Z"),p.appendChild(t);const e=cross([!1,!1,!1,!1,!1,!0,!1,!1]);e.setAttribute("clip-path","polygon(-3 15, 12 15, 21 30, -3 30)"),p.appendChild(e)}if("-"==s&&"/"==o){const t=document.createElementNS("http://www.w3.org/2000/svg","path");t.setAttribute("d","\n        M 0 24\n        A 12 12, 0, 0, 1, 12 39\n        L 6 39\n        A 6 6, 0, 0, 0, 0 30\n        Z"),p.appendChild(t);const e=cross([!1,!1,!1,!1,!1,!1,!0,!1]);e.setAttribute("clip-path","polygon(-3 6, 12 6, 12 30, -3 30)"),p.appendChild(e)}if("-"==e&&"\\"==i){const t=document.createElementNS("http://www.w3.org/2000/svg","path");t.setAttribute("d","\n        M 30 24\n        A 12 12, 0, 0, 0, 18 39\n        L 24 39\n        A 6 6, 0, 0, 1, 30 30\n        Z"),p.appendChild(t);const e=cross([!1,!1,!1,!1,!1,!0,!1,!1]);e.setAttribute("clip-path","polygon(3 6, 18 6, 18 30, 3 30)"),p.appendChild(e)}if("/"==o&&"\\"==i){const t=document.createElementNS("http://www.w3.org/2000/svg","path");t.setAttribute("d","\n        M 3 42\n        A 15 15, 0, 0, 1, 27 42\n        L 25 51\n        A 9 9, 0, 0, 0, 5 51\n        Z"),p.appendChild(t);const e=cross([!1,!1,!1,!1,!1,!0,!0,!1]);e.setAttribute("clip-path","polygon(-3 15, 33 15, 33 30, -3 30)"),p.appendChild(e)}if("\\"==c&&"/"==r){const t=document.createElementNS("http://www.w3.org/2000/svg","path");t.setAttribute("d","\n        M 3 12\n        A 15 15, 0, 0, 0, 27 12\n        L 22 9\n        A 9 9, 0, 0, 1, 8 9\n        Z"),p.appendChild(t);const e=cross([!1,!1,!1,!1,!0,!1,!1,!0]);e.setAttribute("clip-path","polygon(-3 -3, 33 -3, 33 12, -3 12)"),p.appendChild(e)}if("/"==r&&"\\"==i){const t=document.createElementNS("http://www.w3.org/2000/svg","path");t.setAttribute("d","\n        M 22 9\n        A 30 30, 0, 0, 0, 22 45\n        L 28 45\n        A 30 30, 0, 0, 1, 28 9\n        Z"),p.appendChild(t);const e=cross([!1,!1,!1,!1,!0,!0,!1,!1]);e.setAttribute("clip-path","polygon(6 -3, 33 -3, 33 57, 6 57)"),p.appendChild(e)}if("\\"==c&&"/"==o){const t=document.createElementNS("http://www.w3.org/2000/svg","path");t.setAttribute("d","\n        M 8 9\n        A 30 30, 0, 0, 1, 8 45\n        L 2 45\n        A 30 30, 0, 0, 0, 2 9\n        Z"),p.appendChild(t);const e=cross([!1,!1,!1,!1,!1,!1,!0,!0]);e.setAttribute("clip-path","polygon(-3 -3, 9 -3, 9 57, -3 57)"),p.appendChild(e)}return p}},alias={"\u250c":"+","\u2510":"+","\u2514":"+","\u2518":"+","\u2500":"-","\u25ba":">","'":".","`":".",V:"v"};for(const[t,e]of Object.entries(alias))glyphs[t]=(t=>glyphs[e](t));glyphs[">"]=(([t,e,n,s,r,i,o,c])=>{const p=document.createElementNS("http://www.w3.org/2000/svg","g"),l=document.createElementNS("http://www.w3.org/2000/svg","polygon");l.setAttribute("points","0,0 42,18 0,36");let u=0;return"*"!=e&&"o"!=e&&"#"!=e||(u-=18),l.setAttribute("transform",`translate(${u} 9)`),p.appendChild(l),p}),glyphs["<"]=(([t,e,n,s,r,i,o,c])=>{const p=document.createElementNS("http://www.w3.org/2000/svg","g"),l=document.createElementNS("http://www.w3.org/2000/svg","polygon");l.setAttribute("points","0,0 42,18 0,36");let u=30;return"*"!=s&&"o"!=s&&"#"!=s||(u+=18),l.setAttribute("transform",`translate(${u} 9) translate(0 36) rotate(180)`),p.appendChild(l),p}),glyphs.v=(([t,e,n,s,r,i,o,c])=>{const p=document.createElementNS("http://www.w3.org/2000/svg","g"),l=document.createElementNS("http://www.w3.org/2000/svg","polygon");l.setAttribute("points","0,0 42,18 0,36");let u=36;return" "==n?u=12:"_"==n?u+=18:"*"!=n&&"o"!=n&&"#"!=n||(u-=18),"/"==r?l.setAttribute("transform","translate(-36 33) rotate(112.5, 42, 18)"):"\\"==c?l.setAttribute("transform","translate(-18 33) rotate(67.5, 42, 18)"):l.setAttribute("transform",`translate(33 ${u}) rotate(90)`),p.appendChild(l),p.appendChild(cross([["|","+"].includes(t),!1,["|","+"].includes(t),!1,["/"].includes(r),!1,!1,["\\"].includes(c)])),p}),glyphs["^"]=(([t,e,n,s,r,i,o,c])=>{const p=document.createElementNS("http://www.w3.org/2000/svg","g"),l=document.createElementNS("http://www.w3.org/2000/svg","polygon");l.setAttribute("points","0,0 42,18 0,36");let u=42;return"-"==t&&(u-=15),"/"==o?l.setAttribute("transform","translate(-18 -15) rotate(-67.5, 42, 18)"):"\\"==i?l.setAttribute("transform","translate(-36 -15) rotate(-112.5, 42, 18)"):l.setAttribute("transform",`translate(-3 ${u}) rotate(-90)`),p.appendChild(l),p.appendChild(cross([!1,!1,["+","|"].includes(n),!1,!1,["\\"].includes(i),["/"].includes(o),!1])),p});
=======
// based on the original typograms code from https://github.com/google/typograms/blob/main/src/typograms.js
// only moved the css to its own file (_sass/_typograms.scss) and commented the last line of the file
const ratio = 2;

function grid(width, height) {
  const result = document.createElementNS("http://www.w3.org/2000/svg", "g");

  const vertical = document.createElementNS("http://www.w3.org/2000/svg", "line");
  vertical.setAttribute("x1", 15);
  vertical.setAttribute("y1", 0);
  vertical.setAttribute("x2", 15);
  vertical.setAttribute("y2", 54);
  vertical.setAttribute("class", "center");
  //result.appendChild(vertical);

  const horizontal = document.createElementNS("http://www.w3.org/2000/svg", "line");
  horizontal.setAttribute("x1", 0);
  horizontal.setAttribute("y1", 30);
  horizontal.setAttribute("x2", 30);
  horizontal.setAttribute("y2", 54);
  horizontal.setAttribute("class", "center");
  //result.appendChild(horizontal);

  for (let i = 0; i <= width * 30; i += 3) {
    const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
    line.setAttribute("x1", i);
    line.setAttribute("y1", 0);
    line.setAttribute("x2", i);
    line.setAttribute("y2", 54 * height);
    line.setAttribute("class", "grid");
    result.appendChild(line);
  }

  for (let i = 0; i <= height * 54; i += 3) {
    const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
    line.setAttribute("x1", 0);
    line.setAttribute("y1", i);
    line.setAttribute("x2", 30 * width);
    line.setAttribute("y2", i);
    line.setAttribute("class", "grid");
    result.appendChild(line);
  }

  return result;
}

const glyphs = {};

glyphs["|"] = ([top, right, bottom, left, topRight, bottomRight, bottomLeft, topLeft]) => {
  const result = document.createElementNS("http://www.w3.org/2000/svg", "g");
  if (right == "_") {
    const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
    line.setAttribute("x1", "18");
    line.setAttribute("y1", "51");
    line.setAttribute("x2", "30");
    line.setAttribute("y2", "51");
    line.setAttribute("class", "part");
    result.appendChild(line);
  }
  if (left == "_") {
    const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
    line.setAttribute("x1", "0");
    line.setAttribute("y1", "51");
    line.setAttribute("x2", "12");
    line.setAttribute("y2", "51");
    line.setAttribute("class", "part");
    result.appendChild(line);
  }
  if (topRight == "_") {
    const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
    line.setAttribute("x1", "12");
    line.setAttribute("y1", "-3");
    line.setAttribute("x2", "30");
    line.setAttribute("y2", "-3");
    line.setAttribute("class", "part");
    result.appendChild(line);
  }
  if (topLeft == "_") {
    const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
    line.setAttribute("x1", "0");
    line.setAttribute("y1", "-3");
    line.setAttribute("x2", "18");
    line.setAttribute("y2", "-3");
    line.setAttribute("class", "part");
    result.appendChild(line);
  }
  // const leg =  && ;
  // const head =  && ;
  //console.log(!(bottomLeft == "/" && bottomRight == "\\"));
  //console.log(!(topRight == "/" && topLeft == "\\"));
  result.appendChild(
    cross([
      !(topRight == "/" && topLeft == "\\"), // top
      ["-"].includes(right), // right
      !(bottomLeft == "/" && bottomRight == "\\"), // bottom
      ["-"].includes(left), // left
      topRight == "/", // topRight
      bottomRight == "\\", // bottomRight
      bottomLeft == "/", // bottomLeft
      topLeft == "\\", // topLeft
    ])
  );
  return result;
};

glyphs["-"] = ([top, right, bottom, left, topRight, bottomRight, bottomLeft, topLeft]) => {
  return cross([
    ["|"].includes(top), // top
    true, // right
    ["|"].includes(bottom), // bottom
    true, // left
    false, // topRight
    false, // bottomRight
    false, // bottomLeft
    false, // topLeft
  ]);
};

glyphs["~"] = ([top, right, bottom, left, topRight, bottomRight, bottomLeft, topLeft]) => {
  const result = document.createElementNS("http://www.w3.org/2000/svg", "g");
  const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
  line.setAttribute("x1", "9");
  line.setAttribute("y1", "27");
  line.setAttribute("x2", "24");
  line.setAttribute("y2", "27");
  line.setAttribute("class", "part");
  result.appendChild(line);
  return result;
};

glyphs["_"] = (around) => {
  const line = glyphs["-"](around);
  line.setAttribute("transform", "translate(0 24)");
  return line;
};

glyphs[":"] = ([top, right, bottom, left, topRight, bottomRight, bottomLeft, topLeft]) => {
  const result = document.createElementNS("http://www.w3.org/2000/svg", "g");
  const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
  line.setAttribute("x1", "15");
  line.setAttribute("y1", "0");
  line.setAttribute("x2", "15");
  line.setAttribute("y2", "60");
  line.setAttribute("class", "part");
  line.setAttribute("style", "stroke-dasharray: 15; stroke-dashoffset: 0;");
  result.appendChild(line);
  if (top == "+") {
    const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
    line.setAttribute("x1", "15");
    line.setAttribute("y1", "-24");
    line.setAttribute("x2", "15");
    line.setAttribute("y2", "-15");
    line.setAttribute("class", "part");
    result.appendChild(line);
  }
  if (bottom == "+") {
    const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
    line.setAttribute("x1", "15");
    line.setAttribute("y1", "60");
    line.setAttribute("x2", "15");
    line.setAttribute("y2", "78");
    line.setAttribute("class", "part");
    result.appendChild(line);
  }
  return result;
};

glyphs["="] = (around) => {
  const result = document.createElementNS("http://www.w3.org/2000/svg", "g");
  const first = document.createElementNS("http://www.w3.org/2000/svg", "line");
  first.setAttribute("x1", "0");
  first.setAttribute("y1", "21");
  first.setAttribute("x2", "30");
  first.setAttribute("y2", "21");
  first.setAttribute("class", "part");
  result.appendChild(first);
  const second = document.createElementNS("http://www.w3.org/2000/svg", "line");
  second.setAttribute("x1", "0");
  second.setAttribute("y1", "30");
  second.setAttribute("x2", "30");
  second.setAttribute("y2", "30");
  second.setAttribute("class", "part");
  result.appendChild(second);
  return result;
};

glyphs["*"] = ([top, right, bottom, left, topRight, bottomRight, bottomLeft, topLeft]) => {
  const result = document.createElementNS("http://www.w3.org/2000/svg", "g");
  const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
  circle.setAttribute("cx", "0");
  circle.setAttribute("cy", "0");
  circle.setAttribute("r", "21");
  circle.setAttribute("stroke", "none");
  circle.setAttribute("transform", "translate(15, 27)");
  result.appendChild(circle);

  result.appendChild(
    cross([
      ["+", "|"].includes(top),
      ["+", "-"].includes(right),
      ["+", "|"].includes(bottom),
      ["+", "-"].includes(left),
      ["/"].includes(topRight),
      ["\\"].includes(bottomRight),
      ["/"].includes(bottomLeft),
      ["\\"].includes(topLeft),
    ])
  );

  return result;
};

glyphs["o"] = ([top, right, bottom, left, topRight, bottomRight, bottomLeft, topLeft]) => {
  const result = document.createElementNS("http://www.w3.org/2000/svg", "g");
  const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
  circle.setAttribute("cx", "0");
  circle.setAttribute("cy", "0");
  circle.setAttribute("r", "18");
  circle.setAttribute("stroke-width", "6");
  circle.setAttribute("fill", "none");
  circle.setAttribute("stroke", "var(--global-text-color)");
  circle.setAttribute("transform", "translate(15, 27)");
  result.appendChild(circle);

  const connectors = cross([
    ["+", "|"].includes(top),
    ["+", "-"].includes(right),
    ["+", "|"].includes(bottom),
    ["+", "-"].includes(left),
    ["/"].includes(topRight),
    ["\\"].includes(bottomRight),
    ["/"].includes(bottomLeft),
    ["\\"].includes(topLeft),
  ]);

  result.appendChild(connectors);

  const inner = document.createElementNS("http://www.w3.org/2000/svg", "circle");
  inner.setAttribute("cx", "0");
  inner.setAttribute("cy", "0");
  inner.setAttribute("r", "15");
  inner.setAttribute("fill", "white");
  inner.setAttribute("opacity", "100%");
  inner.setAttribute("transform", "translate(15, 27)");
  result.appendChild(inner);

  return result;
};

glyphs["/"] = (around) => {
  const [top, right, bottom, left, topRight, bottomRight, bottomLeft, topLeft] = around;
  const result = document.createElementNS("http://www.w3.org/2000/svg", "g");
  result.appendChild(
    cross([
      ["|"].includes(top), // top
      false, // right
      ["|"].includes(bottom), // bottom
      false, // left
      true, // topRight
      false, // bottomRight
      true, // bottomLeft
      false, // topLeft
    ])
  );
  if (right == "\\") {
    const tip = cross([
      false,
      false,
      false,
      false,
      false,
      false,
      true, // bottomLeft
      false,
    ]);
    tip.setAttribute("transform", "translate(30 -54)");
    tip.setAttribute("clip-path", "polygon(-3 0, 0 0, 0 54, -3 54)");
    result.appendChild(tip);
  }
  if (left == "\\") {
    const tip = cross([
      false,
      false,
      false,
      false,
      true, // topRight
      false,
      false, // bottomLeft
      false,
    ]);
    tip.setAttribute("transform", "translate(-30 54)");
    tip.setAttribute("clip-path", "polygon(15 -6, 33 -6, 33 6, 15 6)");
    result.appendChild(tip);
  }

  if (right == "_") {
    const line = glyphs["_"](around);
    result.appendChild(line);
  }

  return result;
};

glyphs["\\"] = (around) => {
  const [top, right, bottom, left, topRight, bottomRight, bottomLeft, topLeft] = around;
  const result = document.createElementNS("http://www.w3.org/2000/svg", "g");
  result.appendChild(
    cross([
      ["|"].includes(top), // top
      false, // right
      ["|"].includes(bottom), // bottom
      false, // left
      false, // topRight
      true, // bottomRight
      false, // bottomLeft
      true, // topLeft
    ])
  );
  if (left == "/") {
    const tip = cross([
      false,
      false,
      false,
      false,
      false,
      true, // bottomRight
      false,
      false,
    ]);
    tip.setAttribute("transform", "translate(-30 -54)");
    tip.setAttribute("clip-path", "polygon(15 0, 30 0, 30 54, 15 54)");
    result.appendChild(tip);
  }
  if (right == "/") {
    const tip = cross([false, false, false, false, false, false, false, true]);
    tip.setAttribute("transform", "translate(30 54)");
    tip.setAttribute("clip-path", "polygon(-3 0, 0 0, 0 6, -3 6)");
    result.appendChild(tip);
  }

  if (left == "_") {
    const line = glyphs["_"](around);
    result.appendChild(line);
  }

  return result;
};

glyphs["#"] = ([top, right, bottom, left, topRight, bottomRight, bottomLeft, topLeft]) => {
  const result = document.createElementNS("http://www.w3.org/2000/svg", "g");
  const polygon = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
  const points = [
    [0, 0],
    [42, 0],
    [42, 42],
    [0, 42],
  ];
  polygon.setAttribute("points", points.map(([x, y]) => `${x},${y}`).join(" "));
  polygon.setAttribute("transform", "translate(-6, 6)");
  result.appendChild(polygon);

  result.appendChild(
    cross([
      ["+", "|"].includes(top),
      ["+", "-"].includes(right),
      ["+", "|"].includes(bottom),
      ["+", "-"].includes(left),
      ["/"].includes(topRight),
      ["\\"].includes(bottomRight),
      ["/"].includes(bottomLeft),
      ["\\"].includes(topLeft),
    ])
  );

  return result;
};

glyphs["+"] = ([top, right, bottom, left, topRight, bottomRight, bottomLeft, topLeft]) => {
  const result = document.createElementNS("http://www.w3.org/2000/svg", "g");
  const r = ["*", "#", "-", "+", "~", ">", ".", "'", "`"].includes(right);
  const l = ["*", "#", "-", "+", "~", "<", ".", "'", "`"].includes(left);
  const t = ["*", "#", "|", "+", ".", "`", "^"].includes(top);
  const b = ["*", "#", "|", "+", "'", "`", "v"].includes(bottom);
  const tR = ["/", "*", "#"].includes(topRight);
  const bR = ["\\", "*", "#"].includes(bottomRight);
  const tL = ["\\", "*", "#"].includes(topLeft);
  const bL = ["/", "*", "#"].includes(bottomLeft);

  // cross
  result.appendChild(cross([t, r, b, l, tR, bR, bL, tL]));

  // center
  if ((l || r) && (b || t)) {
    const center = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
    center.setAttribute("points", "0,0 6,0 6,6 0,6");
    center.setAttribute("transform", "translate(-3 -3) translate(15 27)");
    result.appendChild(center);
  }

  // tip
  if (tR || tL) {
    const center = cross([
      false, // top
      false, // right
      false, // bottom
      false, // left
      false, // topRight
      tL, // bottomRight
      tR, // bottomLeft
      false, // topLeft
    ]);
    center.setAttribute("clip-path", "polygon(0 -3, 30 -3, 30 0, 0 0)");
    result.appendChild(center);
  }

  if (bR || bL) {
    const center = cross([
      false, // top
      false, // right
      false, // bottom
      false, // left
      bL, // topRight
      false, // bottomRight
      false, // bottomLeft
      bR, // topLeft
    ]);
    center.setAttribute("clip-path", "polygon(0 27, 15 27, 15 30, 0 30)");
    result.appendChild(center);
  }

  if (bL || tL) {
    const center = cross([
      false, // top
      false, // right
      false, // bottom
      false, // left
      bL && bR, // topRight
      tL && tR, // bottomRight
      false, // bottomLeft
      false, // topLeft
    ]);
    center.setAttribute("clip-path", "polygon(-3 0, 0 0, 0 54, -3 54)");
    result.appendChild(center);
  }

  if (bR || tR) {
    const center = cross([
      false, // top
      false, // right
      false, // bottom
      false, // left
      false, // topRight
      false, // bottomRight
      tR && tL, // bottomLeft
      bR && bL, // topLeft
    ]);
    //console.log(center);
    center.setAttribute("clip-path", "polygon(15 0, 30 0, 30 54, 15 54)");
    result.appendChild(center);
  }

  if (r || l) {
    const center = cross([
      false, // top
      false, // right
      false, // bottom
      false, // left
      r || bL, // topRight
      tL, // bottomRight
      tR, // bottomLeft
      l || bR, // topLeft
    ]);
    center.setAttribute("clip-path", "polygon(-3 24, 30 24, 30 30, -3 30)");
    result.appendChild(center);
  }
  return result;
};

glyphs["."] = ([top, right, bottom, left, topRight, bottomRight, bottomLeft, topLeft]) => {
  const result = document.createElementNS("http://www.w3.org/2000/svg", "g");

  // top-right
  if ((right == "-" || right == "+") && (bottom == "|" || bottom == "'" || bottom == "`" || bottom == "+")) {
    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute(
      "d",
      `
        M 30 24
        A 18 18, 0, 0, 0, 12 42
        L 12 54
        L 18 54
        L 18 42
        A 12 12, 0, 0, 1, 30 30
        Z`
    );
    result.appendChild(path);
  }

  // top-left
  if ((left == "-" || left == "+") && (bottom == "|" || bottom == "'" || bottom == "`" || bottom == "+")) {
    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute(
      "d",
      `
        M 0 24
        A 18 18, 0, 0, 1, 18 42
        L 18 54
        L 12 54
        L 12 42
        A 12 12, 0, 0, 0, 0 30
        Z`
    );
    result.appendChild(path);
  }

  // top-right
  if ((right == "-" || right == "+") && (top == "|" || top == "." || top == "+")) {
    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute(
      "d",
      `
        M 30 30
        A 18 18, 0, 0, 1, 12 12
        L 12 0
        L 18 0
        L 18 12
        A 12 12, 0, 0, 0, 30 24
        Z`
    );
    result.appendChild(path);
  }

  // bottom-left
  if ((left == "-" || left == "+") && (top == "|" || top == "." || top == "+")) {
    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute(
      "d",
      `
        M 0 30
        A 18 18, 0, 0, 0, 18 12
        L 18 0
        L 12 0
        L 12 12
        A 12 12, 0, 0, 1, 0 24
        Z`
    );
    result.appendChild(path);
  }

  // bottom right-topRight
  if (right == "-" && topRight == "/") {
    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute(
      "d",
      `
        M 30 30
        A 12 12, 0, 0, 1, 18 18
        L 18 15
        L 24 15
        L 24 18
        A 6 6, 0, 0, 0, 30 24
        Z`
    );
    result.appendChild(path);
    const line = cross([
      false, // top
      false, // right
      false, // bottom
      false, // left
      true, // topRight
      false, // bottomRight
      false, // bottomLeft
      false, // topLeft
    ]);
    line.setAttribute("clip-path", "polygon(15px -10px, 30px -10px, 30px 30px, 2px 15px)");
    result.appendChild(line);
  }

  // right-topLeft
  if (right == "-" && topLeft == "\\") {
    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute(
      "d",
      `
        M -3 0
        A 60 60, 0, 0, 0, 30 30
        L 30 24
        A 60 60, 0, 0, 1, 0 -6
        Z`
    );
    result.appendChild(path);
  }

  // left-topRight
  if (left == "-" && topRight == "/") {
    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute(
      "d",
      `
        M 0 30
        A 60 60, 0, 0, 0, 33 0
        L 30 -6
        A 60 60, 0, 0, 1, 0 24
        Z`
    );
    result.appendChild(path);
  }

  // bottom left-topLeft
  if (left == "-" && topLeft == "\\") {
    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute(
      "d",
      `
        M 0 30
        A 12 12, 0, 0, 0, 12 18
        L 12 15
        L 6 15
        L 6 18
        A 6 6, 0, 0, 1, 0 24
        Z`
    );
    result.appendChild(path);
    const line = cross([
      false, // top
      false, // right
      false, // bottom
      false, // left
      false, // topRight
      false, // bottomRight
      false, // bottomLeft
      true, // topLeft
    ]);
    line.setAttribute("clip-path", "polygon(-3 -3, 12 -3, 12 18, -3 18)");
    result.appendChild(line);
  }

  // bottom-topRight
  if (bottom == "|" && topRight == "/") {
    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute(
      "d",
      `
        M 12 54
        A 120 120, 0, 0, 1, 30 -6
        L 37 -6
        A 120 120, 0, 0, 0, 18 54
        Z`
    );
    result.appendChild(path);
  }

  // top-bottomRight
  if (top == "|" && bottomRight == "\\") {
    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute(
      "d",
      `
        M 30 60
        A 120 120, 0, 0, 1, 12 0
        L 18 0
        A 120 120, 0, 0, 0, 37 60
        Z`
    );
    result.appendChild(path);
  }

  // top-bottomLeft
  if (top == "|" && bottomLeft == "/") {
    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute(
      "d",
      `
        M 0 60
        A 120 120, 0, 0, 0, 18 0
        L 12 0
        A 120 120, 0, 0, 1, -7 60
        Z`
    );
    result.appendChild(path);
  }

  // bottom-topLeft
  if (bottom == "|" && topLeft == "\\") {
    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute(
      "d",
      `
        M 12 54
        A 120 120, 0, 0, 0, -7 -6
        L 0 -6
        A 120 120, 0, 0, 1, 18 54
        Z`
    );
    result.appendChild(path);
  }

  // right-bottomLeft
  if (right == "-" && bottomLeft == "/") {
    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute(
      "d",
      `
        M 0 48
        A 42 42, 0, 0, 1, 30 24
        L 30 30
        A 42 42, 0, 0, 0, 6 48
        Z`
    );
    result.appendChild(path);
    const line = cross([
      false, // top
      false, // right
      false, // bottom
      false, // left
      false, // topRight
      false, // bottomRight
      true, // bottomLeft
      false, // topLeft
    ]);
    line.setAttribute("clip-path", "polygon(-3 15, 12 15, 12 30, -3 30)");
    result.appendChild(line);
  }

  // left-bottomRight
  if (left == "-" && bottomRight == "\\") {
    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute(
      "d",
      `
        M 0 24
        A 42 42, 0, 0, 1, 30 48
        L 24 48
        A 42 42, 0, 0, 0, 0 30
        Z`
    );

    result.appendChild(path);
    const line = cross([
      false, // top
      false, // right
      false, // bottom
      false, // left
      false, // topRight
      true, // bottomRight
      false, // bottomLeft
      false, // topLeft
    ]);
    line.setAttribute("clip-path", "polygon(-3 15, 12 15, 21 30, -3 30)");
    result.appendChild(line);
  }

  // left-bottomLeft
  if (left == "-" && bottomLeft == "/") {
    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute(
      "d",
      `
        M 0 24
        A 12 12, 0, 0, 1, 12 39
        L 6 39
        A 6 6, 0, 0, 0, 0 30
        Z`
    );
    result.appendChild(path);
    const line = cross([
      false, // top
      false, // right
      false, // bottom
      false, // left
      false, // topRight
      false, // bottomRight
      true, // bottomLeft
      false, // topLeft
    ]);
    line.setAttribute("clip-path", "polygon(-3 6, 12 6, 12 30, -3 30)");
    result.appendChild(line);
  }

  // right-bottomRight
  if (right == "-" && bottomRight == "\\") {
    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute(
      "d",
      `
        M 30 24
        A 12 12, 0, 0, 0, 18 39
        L 24 39
        A 6 6, 0, 0, 1, 30 30
        Z`
    );
    result.appendChild(path);
    const line = cross([
      false, // top
      false, // right
      false, // bottom
      false, // left
      false, // topRight
      true, // bottomRight
      false, // bottomLeft
      false, // topLeft
    ]);
    line.setAttribute("clip-path", "polygon(3 6, 18 6, 18 30, 3 30)");
    result.appendChild(line);
  }

  // bottomLeft-bottomRight
  if (bottomLeft == "/" && bottomRight == "\\") {
    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute(
      "d",
      `
        M 3 42
        A 15 15, 0, 0, 1, 27 42
        L 25 51
        A 9 9, 0, 0, 0, 5 51
        Z`
    );
    result.appendChild(path);
    const line = cross([
      false, // top
      false, // right
      false, // bottom
      false, // left
      false, // topRight
      true, // bottomRight
      true, // bottomLeft
      false, // topLeft
    ]);
    line.setAttribute("clip-path", "polygon(-3 15, 33 15, 33 30, -3 30)");
    result.appendChild(line);
  }

  // topLeft-topRight
  if (topLeft == "\\" && topRight == "/") {
    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute(
      "d",
      `
        M 3 12
        A 15 15, 0, 0, 0, 27 12
        L 22 9
        A 9 9, 0, 0, 1, 8 9
        Z`
    );
    result.appendChild(path);
    const line = cross([
      false, // top
      false, // right
      false, // bottom
      false, // left
      true, // topRight
      false, // bottomRight
      false, // bottomLeft
      true, // topLeft
    ]);
    line.setAttribute("clip-path", "polygon(-3 -3, 33 -3, 33 12, -3 12)");
    result.appendChild(line);
  }

  // topRight-bottomRight
  if (topRight == "/" && bottomRight == "\\") {
    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute(
      "d",
      `
        M 22 9
        A 30 30, 0, 0, 0, 22 45
        L 28 45
        A 30 30, 0, 0, 1, 28 9
        Z`
    );
    result.appendChild(path);
    const line = cross([
      false, // top
      false, // right
      false, // bottom
      false, // left
      true, // topRight
      true, // bottomRight
      false, // bottomLeft
      false, // topLeft
    ]);
    line.setAttribute("clip-path", "polygon(6 -3, 33 -3, 33 57, 6 57)");
    result.appendChild(line);
  }

  // topLeft-bottomLeft
  if (topLeft == "\\" && bottomLeft == "/") {
    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute(
      "d",
      `
        M 8 9
        A 30 30, 0, 0, 1, 8 45
        L 2 45
        A 30 30, 0, 0, 0, 2 9
        Z`
    );
    result.appendChild(path);
    const line = cross([
      false, // top
      false, // right
      false, // bottom
      false, // left
      false, // topRight
      false, // bottomRight
      true, // bottomLeft
      true, // topLeft
    ]);
    line.setAttribute("clip-path", "polygon(-3 -3, 9 -3, 9 57, -3 57)");
    result.appendChild(line);
  }

  return result;
};

const alias = {
  "┌": "+",
  "┐": "+",
  "└": "+",
  "┘": "+",
  "─": "-",
  "►": ">",
  "'": ".",
  "`": ".",
  V: "v",
};

for (const [key, value] of Object.entries(alias)) {
  glyphs[key] = (around) => {
    return glyphs[value](around);
  };
}

glyphs[">"] = ([top, right, bottom, left, topRight, bottomRight, bottomLeft, topLeft]) => {
  const result = document.createElementNS("http://www.w3.org/2000/svg", "g");
  const arrow = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
  arrow.setAttribute("points", "0,0 42,18 0,36");
  let reach = 0;
  if (right == "*" || right == "o" || right == "#") {
    reach -= 18;
  }
  arrow.setAttribute("transform", `translate(${reach} 9)`);
  result.appendChild(arrow);
  return result;
  const center = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
  center.setAttribute("points", "-3,0 6,0 6,6 -3,6");
  center.setAttribute("transform", "translate(15 24)");
  result.appendChild(center);
  result.appendChild(
    cross([
      false, // top
      false, // right
      false, // bottom
      ["-", "+"].includes(left), // left
      false, // topRight
      false, // bottomRight
      ["/"].includes(bottomLeft), // bottomLeft
      ["\\"].includes(topLeft), // topLeft
    ])
  );
  return result;
};

glyphs["<"] = ([top, right, bottom, left, topRight, bottomRight, bottomLeft, topLeft]) => {
  const result = document.createElementNS("http://www.w3.org/2000/svg", "g");
  const arrow = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
  arrow.setAttribute("points", "0,0 42,18 0,36");
  let reach = 30;
  if (left == "*" || left == "o" || left == "#") {
    reach += 18;
  }
  arrow.setAttribute("transform", `translate(${reach} 9) translate(0 36) rotate(180)`);
  result.appendChild(arrow);
  return result;
  //const center = document.createElementNS(
  //  "http://www.w3.org/2000/svg", "polygon");
  //center.setAttribute("points", "0,0 9,0 9,6 0,6");
  //center.setAttribute("transform", "translate(9 24)");
  //result.appendChild(center);
  result.appendChild(
    cross([
      false, // top
      ["-", "+"].includes(right), // right
      false, // bottom
      false, // left
      ["/"].includes(topRight), // topRight
      ["\\"].includes(bottomRight), // bottomRight
      false, // bottomLeft
      false, // topLeft
    ])
  );
  return result;
};

glyphs["v"] = ([top, right, bottom, left, topRight, bottomRight, bottomLeft, topLeft]) => {
  const result = document.createElementNS("http://www.w3.org/2000/svg", "g");
  const arrow = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
  arrow.setAttribute("points", "0,0 42,18 0,36");
  let reach = 36;
  if (bottom == " ") {
    reach = 12;
  } else if (bottom == "_") {
    reach += 18;
  } else if (bottom == "*" || bottom == "o" || bottom == "#") {
    reach -= 18;
  }
  if (topRight == "/") {
    arrow.setAttribute("transform", `translate(-36 33) rotate(${90 + 22.5}, 42, 18)`);
  } else if (topLeft == "\\") {
    arrow.setAttribute("transform", `translate(-18 33) rotate(${90 - 22.5}, 42, 18)`);
  } else {
    arrow.setAttribute("transform", `translate(33 ${reach}) rotate(90)`);
  }
  result.appendChild(arrow);
  result.appendChild(
    cross([
      ["|", "+"].includes(top), // top
      false, // right
      ["|", "+"].includes(top), // bottom
      false, // left
      ["/"].includes(topRight), // topRight
      false, // bottomRight
      false, // bottomLeft
      ["\\"].includes(topLeft), // topLeft
    ])
  );
  return result;
};

glyphs["^"] = ([top, right, bottom, left, topRight, bottomRight, bottomLeft, topLeft]) => {
  const result = document.createElementNS("http://www.w3.org/2000/svg", "g");
  const arrow = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
  arrow.setAttribute("points", "0,0 42,18 0,36");
  let reach = 42;
  if (top == "-") {
    reach -= 15;
  }
  if (bottomLeft == "/") {
    arrow.setAttribute("transform", `translate(-18 -15) rotate(${-45 - 22.5}, 42, 18)`);
  } else if (bottomRight == "\\") {
    arrow.setAttribute("transform", `translate(-36 -15) rotate(${-90 - 22.5}, 42, 18)`);
  } else {
    arrow.setAttribute("transform", `translate(-3 ${reach}) rotate(-90)`);
  }
  result.appendChild(arrow);
  result.appendChild(
    cross([
      false, // top
      false, // right
      ["+", "|"].includes(bottom), // bottom
      false, // left
      false, // topRight
      ["\\"].includes(bottomRight), // bottomRight
      ["/"].includes(bottomLeft), // bottomLeft
      false, // topLeft
    ])
  );
  return result;
};

function cross([top, right, bottom, left, topRight, bottomRight, bottomLeft, topLeft]) {
  const result = document.createElementNS("http://www.w3.org/2000/svg", "g");
  if (top) {
    // {
    const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
    line.setAttribute("x1", 15);
    line.setAttribute("y1", 0);
    line.setAttribute("x2", 15);
    line.setAttribute("y2", 27);
    line.setAttribute("class", "part");
    result.appendChild(line);
  }

  if (right) {
    //{
    const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
    line.setAttribute("x1", 15);
    line.setAttribute("y1", 27);
    line.setAttribute("x2", 30);
    line.setAttribute("y2", 27);
    line.setAttribute("class", "part");
    result.appendChild(line);
  }

  if (bottom) {
    //{
    const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
    line.setAttribute("x1", 15);
    line.setAttribute("y1", 27);
    line.setAttribute("x2", 15);
    line.setAttribute("y2", 54);
    line.setAttribute("class", "part");
    result.appendChild(line);
  }

  if (left) {
    //{
    const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
    line.setAttribute("x1", 0);
    line.setAttribute("y1", 27);
    line.setAttribute("x2", 15);
    line.setAttribute("y2", 27);
    line.setAttribute("class", "part");
    result.appendChild(line);
  }

  const diagonal = document.createElementNS("http://www.w3.org/2000/svg", "polygon");

  diagonal.setAttribute(
    "points",
    [
      [0, 0],
      [20.6, 0],
      [20.6, 3],
      [0, 3],
    ]
      .map(([x, y]) => `${x},${y}`)
      .join(" ")
  );

  if (topRight) {
    //{
    const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
    line.setAttribute("x1", 30);
    line.setAttribute("y1", 0);
    line.setAttribute("x2", 15);
    line.setAttribute("y2", 27);
    line.setAttribute("class", "part");
    // line.setAttribute("transform", "scale(1, 1)");
    // line.setAttribute("clip-path", "polygon(-6 -6, 15 -6, 15 30, -6 30)");
    // line.setAttribute("stroke-linecap", "square !important");
    result.appendChild(line);
    //const mask = document.createElementNS(
    //  "http://www.w3.org/2000/svg", "polygon");
    //mask.setAttribute("points", "0 0, 15 0, 15 18, 0 18");
    //result.appendChild(mask);
    //console.log("hi");
  }

  if (bottomRight) {
    //{
    const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
    line.setAttribute("x1", 15);
    line.setAttribute("y1", 27);
    line.setAttribute("x2", 30);
    line.setAttribute("y2", 54);
    line.setAttribute("class", "part");
    result.appendChild(line);
  }

  if (bottomLeft) {
    // {
    const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
    line.setAttribute("x1", 15);
    line.setAttribute("y1", 27);
    line.setAttribute("x2", 0);
    line.setAttribute("y2", 54);
    line.setAttribute("class", "part");
    result.appendChild(line);
  }

  if (topLeft) {
    //{
    const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
    line.setAttribute("x1", 0);
    line.setAttribute("y1", 0);
    line.setAttribute("x2", 15);
    line.setAttribute("y2", 27);
    line.setAttribute("class", "part");
    result.appendChild(line);
  }

  return result;
}

function text(char, reserved) {
  const g = document.createElementNS("http://www.w3.org/2000/svg", "g");
  const result = document.createElementNS("http://www.w3.org/2000/svg", "text");
  //result.setAttribute("xml:space", "preserve");
  //result.setAttributeNS("http://www.w3.org/XML/1998/namespace", "xml:space", "preserve");
  const value = document.createTextNode(char);
  result.appendChild(value);
  if (reserved) {
    result.setAttribute("class", "reserved");
  }
  const translation = [
    [15, 24],
    //[1.5, 1.5 * ratio]
  ];
  result.setAttribute("transform", translation.map(([x, y]) => `translate(${x}, ${y})`).join(" "));
  g.appendChild(result);
  return g;
}

function render(diagram) {
  const result = document.createElementNS("http://www.w3.org/2000/svg", "g");

  for (let y = 0; y < diagram.length; y++) {
    for (let x = 0; x < diagram[y].length; x++) {
      const char = diagram[y][x];

      if (char == " " || char == '"') {
        continue;
      }

      let reserved = glyphs[char];

      const g = document.createElementNS("http://www.w3.org/2000/svg", "g");

      let str = false;
      for (let i = 0; i < x; i++) {
        if (diagram[y][i] == '"') {
          str = !str;
        }
      }

      const neighbors = around(diagram, [x, y]);

      if (char.match(/[A-Za-z0-9]/)) {
        const [, right, , left] = neighbors;
        // We special case "v", which is a down arrow, and also a text character.
        str = str || left.match(/[A-Za-uw-z0-9]/) || right.match(/[A-Za-uw-z0-9]/);
      }

      reserved = reserved && !str;

      if (reserved) {
        g.appendChild(glyphs[char](neighbors));
      }

      g.appendChild(text(char, reserved));

      g.setAttribute("transform", `translate(${x * 30} ${y * 54})`);
      result.appendChild(g);
    }
  }
  return result;
}

function create(source, zoom, debug) {
  const diagram = source.split("\n").map((line) => line.trimEnd().split(""));

  diagram.shift();
  diagram.splice(-1);

  let width = 0;
  const height = diagram.length;

  for (let y = 0; y < diagram.length; y++) {
    for (let x = 0; x < diagram[y].length; x++) {
      if (diagram[y].length > width) {
        width = diagram[x].length;
      }
    }
  }

  var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("width", width * 30 * zoom);
  svg.setAttribute("height", height * 54 * zoom);
  svg.setAttribute("debug", debug);
  const padding = 0;

  svg.setAttribute("viewBox", `${-padding} ${-padding} ${width * 30 + 2 * padding} ${height * 54 + 2 * padding}`);
  svg.setAttribute("class", "debug");
  svg.appendChild(render(diagram));

  if (debug) {
    svg.appendChild(grid(width, height));
  }

  return svg;
}

function around(diagram, [x, y]) {
  let left = " ";
  let top = " ";
  let right = " ";
  let bottom = " ";
  let topRight = " ";
  let bottomRight = " ";
  let bottomLeft = " ";
  let topLeft = " ";
  if (y > 0) {
    top = diagram[y - 1][x] || " ";
  }
  if (x < diagram[y].length - 1) {
    right = diagram[y][x + 1] || " ";
  }
  if (y < diagram.length - 1) {
    bottom = diagram[y + 1][x] || " ";
  }
  if (x > 0) {
    left = diagram[y][x - 1] || " ";
  }
  if (y > 0 && x < diagram[y - 1].length - 1) {
    // console.log(`@${diagram[y][x]}: ${diagram[y - 1][x + 1]}`);
    topRight = diagram[y - 1][x + 1] || " ";
  }
  //if (diagram[y][x] == ".") {
  //console.log(`${diagram[y][x]}}: ${(y + 1) < (diagram.length)}`);
  //console.log(diagram[y + 1]);
  //throw new Error("hi");
  //}
  if (y + 1 < diagram.length && x < diagram[y + 1].length) {
    bottomRight = diagram[y + 1][x + 1] || " ";
    //console.log(diagram[y + 1]);
    //console.log(`${diagram[y][x]}: ${x} ${y} ${bottomRight}`);
    //throw new Error("hi");
  }
  if (y < diagram.length - 1 && x > 0) {
    bottomLeft = diagram[y + 1][x - 1] || " ";
  }
  if (y > 0 && x > 0) {
    topLeft = diagram[y - 1][x - 1] || " ";
  }
  return [top, right, bottom, left, topRight, bottomRight, bottomLeft, topLeft];
  //.map((el) => alias[el] ? alias[el] : el);
}

// module.exports = create;
>>>>>>> master
