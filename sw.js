if(!self.define){let e,i={};const n=(n,s)=>(n=new URL(n+".js",s).href,i[n]||new Promise((i=>{if("document"in self){const e=document.createElement("script");e.src=n,e.onload=i,document.head.appendChild(e)}else e=n,importScripts(n),i()})).then((()=>{let e=i[n];if(!e)throw new Error(`Module ${n} didn’t register its module`);return e})));self.define=(s,t)=>{const o=e||("document"in self?document.currentScript.src:"")||location.href;if(i[o])return;let r={};const c=e=>n(e,o),d={module:{uri:o},exports:r,require:c};i[o]=Promise.all(s.map((e=>d[e]||c(e)))).then((e=>(t(...e),r)))}}define(["./workbox-a523fd56"],(function(e){"use strict";self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"055d1376.js",revision:"43b81e2ec907cda9b9a4e0cd3ebaace6"},{url:"d9a50343.css",revision:"dbc77daf899c5cb11b98a37adbcaa487"},{url:"index.html",revision:"005512c23e057c4aeefbd0115d338c36"}],{}),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("/index.html"))),e.registerRoute("polyfills/*.js",new e.CacheFirst,"GET")}));
//# sourceMappingURL=sw.js.map
