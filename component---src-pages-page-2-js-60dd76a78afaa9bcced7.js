(window.webpackJsonp=window.webpackJsonp||[]).push([[6],{140:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),i=n(144),o=n(150);t.default=function(){return r.a.createElement(o.a,null,r.a.createElement("h1",null,"Hi from the second page"),r.a.createElement("p",null,"Welcome to page 2"),r.a.createElement(i.Link,{to:"/"},"Go back to the homepage"))}},144:function(e,t,n){"use strict";n.r(t),n.d(t,"graphql",function(){return f}),n.d(t,"StaticQueryContext",function(){return m}),n.d(t,"StaticQuery",function(){return p});var a=n(0),r=n.n(a),i=n(4),o=n.n(i),c=n(143),u=n.n(c);n.d(t,"Link",function(){return u.a}),n.d(t,"withPrefix",function(){return c.withPrefix}),n.d(t,"navigate",function(){return c.navigate}),n.d(t,"push",function(){return c.push}),n.d(t,"replace",function(){return c.replace}),n.d(t,"navigateTo",function(){return c.navigateTo});var l=n(145),s=n.n(l);n.d(t,"PageRenderer",function(){return s.a});var d=n(33);n.d(t,"parsePath",function(){return d.a});var m=r.a.createContext({}),p=function(e){return r.a.createElement(m.Consumer,null,function(t){return e.data||t[e.query]&&t[e.query].data?(e.render||e.children)(e.data?e.data.data:t[e.query].data):r.a.createElement("div",null,"Loading (StaticQuery)")})};function f(){throw new Error("It appears like Gatsby is misconfigured. Gatsby related `graphql` calls are supposed to only be evaluated at compile time, and then compiled away,. Unfortunately, something went wrong and the query was left in the compiled code.\n\n.Unless your site has a complex or custom babel/Gatsby configuration this is likely a bug in Gatsby.")}p.propTypes={data:o.a.object,query:o.a.string.isRequired,render:o.a.func,children:o.a.func}},145:function(e,t,n){var a;e.exports=(a=n(147))&&a.default||a},146:function(e){e.exports={data:{site:{siteMetadata:{title:"The Mush"}}}}},147:function(e,t,n){"use strict";n.r(t);n(34);var a=n(0),r=n.n(a),i=n(4),o=n.n(i),c=n(48),u=n(2),l=function(e){var t=e.location,n=u.default.getResourcesForPathnameSync(t.pathname);return r.a.createElement(c.a,Object.assign({location:t,pageResources:n},n.json))};l.propTypes={location:o.a.shape({pathname:o.a.string.isRequired}).isRequired},t.default=l},148:function(e,t,n){},150:function(e,t,n){"use strict";var a=n(146),r=n(0),i=n.n(r),o=n(4),c=n.n(o),u=n(151),l=n.n(u),s=n(144),d=function(e){return i.a.createElement("li",{style:{display:"inline-block",marginRight:"1rem"}},i.a.createElement(s.Link,{to:e.to},e.children))},m=function(e){var t=e.siteTitle;return i.a.createElement("div",{style:{background:"#2f3143",marginBottom:"1.45rem"}},i.a.createElement("div",{style:{margin:"0 auto",maxWidth:960,padding:"1.45rem 1.0875rem"}},i.a.createElement("header",{style:{marginBottom:"0rem"}},i.a.createElement("ul",{style:{listStyle:"none",float:"right"}},i.a.createElement(d,{to:"/"},"Home"),i.a.createElement(d,{to:"/about/"},"About"),i.a.createElement(d,{to:"/projects/"},"Projects"),i.a.createElement("a",{href:"http://app.simonxu.com"},"WebApp"))),i.a.createElement("h1",{style:{margin:0}},i.a.createElement(s.Link,{to:"/",style:{color:"white",textDecoration:"none"}},t))))},p=(n(148),function(e){var t=e.children;return i.a.createElement(s.StaticQuery,{query:"755544856",render:function(e){return i.a.createElement(i.a.Fragment,null,i.a.createElement(l.a,{title:e.site.siteMetadata.title,meta:[{name:"description",content:"Sample"},{name:"keywords",content:"sample, something"}]},i.a.createElement("html",{lang:"en"})),i.a.createElement(m,{siteTitle:e.site.siteMetadata.title}),i.a.createElement("div",{style:{margin:"0 auto",maxWidth:960,padding:"0px 1.0875rem 1.45rem",paddingTop:0}},t))},data:a})});p.propTypes={children:c.a.node.isRequired};t.a=p}}]);
//# sourceMappingURL=component---src-pages-page-2-js-60dd76a78afaa9bcced7.js.map