(this.webpackJsonpphonebook=this.webpackJsonpphonebook||[]).push([[0],{39:function(t,e,n){},40:function(t,e,n){"use strict";n.r(e);var r=n(2),c=n(15),o=n.n(c),i=n(6),a=n(3),u=n(4),s=n.n(u),j="/api/notes",l={getAll:function(){var t=s.a.get(j),e={id:1e4,content:"This note is not saved to server",date:"2019-05-30T17:30:31.098Z",important:!0};return t.then((function(t){return t.data.concat(e)}))},create:function(t){return s.a.post(j,t).then((function(t){return t.data}))},update:function(t,e){return s.a.put("".concat(j,"/").concat(t),e).then((function(t){return t.data}))}},f=n(0),b=function(t){var e=t.message;return null===e?null:Object(f.jsx)("div",{className:"error",children:e})},d=function(t){var e=t.note,n=t.toggleImportance,r=e.important?"make not important":"make important";return Object(f.jsxs)("li",{className:"note",children:[e.content,Object(f.jsx)("button",{onClick:n,children:r})]})},p=function(){return Object(f.jsxs)("div",{style:{color:"green",fontStyle:"italic",fontSize:16},children:[Object(f.jsx)("br",{}),Object(f.jsx)("em",{children:"Note app, Department of Computer Science, University of Helsinki 2020"})]})},m=function(t){var e=Object(r.useState)([]),n=Object(a.a)(e,2),c=n[0],o=n[1],u=Object(r.useState)("a new note..."),s=Object(a.a)(u,2),j=s[0],m=s[1],h=Object(r.useState)(!0),O=Object(a.a)(h,2),v=O[0],x=O[1],g=Object(r.useState)("some error happened..."),S=Object(a.a)(g,2),k=S[0],w=S[1];Object(r.useEffect)((function(){l.getAll().then((function(t){return o(t)}))}),[]);var y=v?c:c.filter((function(t){return t.important}));return Object(f.jsxs)("div",{children:[Object(f.jsx)("h1",{children:"Notes"}),Object(f.jsx)(b,{message:k}),Object(f.jsx)("div",{children:Object(f.jsxs)("button",{onClick:function(){return x(!v)},children:["show ",v?"important":"all"]})}),Object(f.jsx)("ul",{children:y.map((function(t){return Object(f.jsx)(d,{note:t,toggleImportance:function(){return function(t){var e=c.find((function(e){return e.id===t})),n=Object(i.a)(Object(i.a)({},e),{},{important:!e.important});l.update(t,n).then((function(e){return o(c.map((function(n){return n.id!==t?n:e})))})).catch((function(n){w("Note '".concat(e.content,"' was already removed from server")),setTimeout((function(){return w(null)}),5e3),o(c.filter((function(e){return e.id!==t})))}))}(t.id)}},t.id)}))}),Object(f.jsxs)("form",{onSubmit:function(t){t.preventDefault();var e={content:j,date:(new Date).toISOString(),important:Math.random()<.5};l.create(e).then((function(t){o(c.concat(t)),m("")}))},children:[Object(f.jsx)("input",{value:j,onChange:function(t){m(t.target.value)}}),Object(f.jsx)("button",{type:"submit",children:"save"})]}),Object(f.jsx)(p,{})]})};n(39);o.a.render(Object(f.jsx)(m,{}),document.getElementById("root"))}},[[40,1,2]]]);
//# sourceMappingURL=main.408d3e67.chunk.js.map