(this.webpackJsonpim17a=this.webpackJsonpim17a||[]).push([[0],{102:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),c=a(9),l=a.n(c),i=(a(94),a(95),a(4)),o=a(148),s=a(149),u=a(150),m=a(28),h=a(47),g=a(30),d=a(34),p=a(33),b=a(134),v=a(138),E=a(139),f=a(62),j=a(140),w=a(163),k=a(141),y=a(142),O=a(143),x=a(144),P=a(145),I=a(76),D=a.n(I),S=a(78),N=a.n(S),C=a(40),A=function(e){Object(d.a)(a,e);var t=Object(p.a)(a);function a(e){var n;return Object(m.a)(this,a),(n=t.call(this,e)).state={drawerOpen:!1},n.toggleDrawer=n.toggleDrawer.bind(Object(g.a)(n)),n}return Object(h.a)(a,[{key:"toggleDrawer",value:function(e){this.setState({drawerOpen:e})}},{key:"render",value:function(){var e=this,t=this.props.classes;return n.createElement(n.Fragment,null,n.createElement(b.a,null,n.createElement(v.a,null,n.createElement(E.a,{onClick:function(){return e.toggleDrawer(!0)},edge:"start",className:t.menuButton,color:"inherit","aria-label":"menu"},n.createElement(D.a,null)),n.createElement(f.a,{variant:"h6",className:t.title},"Im17A"),n.createElement("div",{className:t.grow}),n.createElement(j.a,{color:"inherit",component:C.b,to:"/"},"Startseite"))),n.createElement(v.a,{id:"back-to-top-anchor"}),n.createElement(w.a,{anchor:"left",open:this.state.drawerOpen,onClose:function(){return e.toggleDrawer(!1)},onOpen:function(){return e.toggleDrawer(!0)},classes:{paper:t.drawerPaper}},n.createElement(k.a,null,n.createElement(y.a,{button:!0,component:C.b,to:"/"},n.createElement(O.a,{primary:"Im17A",classes:{primary:t.drawerTitle}}))),n.createElement(x.a,null),n.createElement(k.a,null,n.createElement(y.a,{button:!0,component:C.b,to:"/calculator"},n.createElement(P.a,null,n.createElement(N.a,null)),n.createElement(O.a,null,"Notenrechner")))))}}]),a}(n.Component),F=a(79),M=a.n(F),R=a(146),G=a(147);function W(e){var t=e.children,a=Object(R.a)({disableHysteresis:!0,threshold:100});return r.a.createElement(G.a,{in:a},r.a.createElement("div",{onClick:function(e){var t=(e.target.ownerDocument||document).querySelector("#back-to-top-anchor");t&&t.scrollIntoView({behavior:"smooth",block:"center"})},role:"presentation",className:e.classes.root},t))}function z(e){var t=e.classes;return n.createElement(n.Fragment,null,n.createElement(o.a,null),n.createElement(A,{classes:t}),n.createElement("br",null),n.createElement(s.a,{maxWidth:"lg"},e.children),n.createElement("br",null),n.createElement(W,e,n.createElement(u.a,{color:"secondary",size:"small","aria-label":"scroll back to top"},n.createElement(M.a,null))))}var L=a(35),B=a(165),T=a(11),J=a(20),V=a(151),q=a(103),H=a(152),U=a(153),$=a(154),K=a(155),Q=a(156),X=a(161),Y=a(157),Z=function(){function e(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"";Object(m.a)(this,e),this.grades=[0,0,0,0,0,0,0],this.name=void 0,this.name=t}return Object(h.a)(e,[{key:"copyInto",value:function(e){return this.grades=e.grades,this.name=e.name,this}},{key:"average",value:function(){for(var e=0,t=0,a=0;a<this.grades.length-1;a++){var n=this.grades[a];0!==n&&-1!==n&&(e+=n,t++)}var r=this.grades[this.grades.length-1],c=0;return c=0===t&&0!==r&&-1!==r?r:0!==r&&-1!==r?(e/t+r)/2:e/t,c=Math.round(2*c)/2,isNaN(c)?0:c}}]),e}(),_=function(e){Object(d.a)(a,e);var t=Object(p.a)(a);function a(){var e;return Object(m.a)(this,a),(e=t.call(this,"Geschichte und Politik")).grades=[0,0,0,0,-1,-1,-1],e}return a}(Z),ee=function(e){Object(d.a)(a,e);var t=Object(p.a)(a);function a(){var e;return Object(m.a)(this,a),(e=t.call(this,"Technik und Umwelt")).grades=[0,0,-1,-1,-1,-1,-1],e}return a}(Z),te=function(e){Object(d.a)(a,e);var t=Object(p.a)(a);function a(e,n){var r;return Object(m.a)(this,a),(r=t.call(this,e)).grades=[-1,-1,-1,-1,-1,-1,-1],r.grades[n]=0,r}return a}(Z),ae=function(e){Object(d.a)(a,e);var t=Object(p.a)(a);function a(e){var n,r;Object(m.a)(this,a),(n=t.call(this,e)).setGrade=n.setGrade.bind(Object(g.a)(n)),n.calculate=n.calculate.bind(Object(g.a)(n));var c=n.props.cookies;if(r=c?c.get("subjects"):void 0)for(var l=0;l<r.length;l++){var i=new Z;r[l]=i.copyInto(r[l])}else r=[new Z("Deutsch"),new Z("Franz\xf6sisch"),new Z("Englisch"),new Z("Mathematik"),new Z("Finanz- und Rechnungswesen"),new Z("Wirtschaft und Recht"),new _,new ee,new te("IDAF FRW",2),new te("IDAF Informatik",2),new te("IDAF Deutsch",4),new te("IDAF Wirtschaft",4),new te("IDPA",6)];return n.state={subjects:r,average:0,minusPoints:0,projectMinusPoints:0},n}return Object(h.a)(a,[{key:"componentDidMount",value:function(){this.calculate()}},{key:"setGrade",value:function(e,t,a){var n=Number(e),r=this.state.subjects;r[t].grades[a]=n,this.setState({subjects:r},this.calculate)}},{key:"calculate",value:function(){for(var e=0,t=0,a=0,n=this.state.subjects,r=0,c=0,l=0,i=0;i<n.length;i++){var o=n[i].average();0!==o&&(i<n.length-5?(console.log("Subject: ".concat(o)),t+=o,a++,o<4&&(e+=4-o)):i===n.length-1?(console.log("Final project: ".concat(o)),l=o):(console.log("Project: ".concat(o)),r+=o,c++))}var s=0,u=0;0!==c&&0!==l&&(s=(r/c+l)/2,(s=Math.round(2*s)/2)<4&&(u=4-s),e+=u);var m=0;0!==a&&0!==s&&(m=(t+s)/(a+1),console.log("Average: ".concat(m))),this.setState({average:m,minusPoints:e,projectMinusPoints:u})}},{key:"render",value:function(){var e=this,t=this.props.classes;return n.createElement(n.Fragment,null,n.createElement(f.a,{variant:"h5"},"Notenrechner"),n.createElement("br",null),n.createElement(V.a,{component:q.a},n.createElement(H.a,{className:t.table,"aria-label":"simple table"},n.createElement(U.a,null,n.createElement($.a,null,n.createElement(K.a,null,"Fach"),n.createElement(K.a,{align:"right"},"1. Semester"),n.createElement(K.a,{align:"right"},"2. Semester"),n.createElement(K.a,{align:"right"},"3. Semester"),n.createElement(K.a,{align:"right"},"4. Semester"),n.createElement(K.a,{align:"right"},"5. Semester"),n.createElement(K.a,{align:"right"},"6. Semester"),n.createElement(K.a,{align:"right"},"Schlusspr\xfcfung"),n.createElement(K.a,{align:"right"},"Durchschnitt"))),n.createElement(Q.a,null,this.state.subjects.map((function(t,a){return n.createElement($.a,{key:a},n.createElement(K.a,{component:"th",scope:"row"},t.name),Array.from({length:7},(function(r,c){return n.createElement(K.a,{align:"right",key:c},-1!==t.grades[c]?n.createElement(X.a,{size:"small",id:"grade-".concat(a,"-").concat(c),label:"Note",variant:"outlined",value:t.grades[c],inputProps:{min:"1",max:"6",step:"0.5"},onChange:function(t){e.setGrade(t.target.value,a,c)},type:"number",InputLabelProps:{shrink:!0}}):null)})),n.createElement(K.a,{align:"right",style:{width:"140px"}},n.createElement(Y.a,{color:"secondary",badgeContent:-(a<e.state.subjects.length-5&&t.average()>0?Math.max(4-t.average(),0):e.state.projectMinusPoints)},n.createElement(X.a,{size:"small",id:"grade-".concat(a,"-average"),label:"Durchschnitt",variant:"outlined",value:t.average(),InputProps:{readOnly:!0},error:a<e.state.subjects.length-5&&t.average()<4&&t.average()>0||a>=e.state.subjects.length-5&&e.state.projectMinusPoints>0,type:"number",InputLabelProps:{shrink:!0}}))))})),n.createElement($.a,null,n.createElement(K.a,{component:"th",scope:"row"},"Gesamtschnitt"),Array.from({length:7},(function(e,t){return n.createElement(K.a,{align:"right",key:t})})),n.createElement(K.a,{align:"right"},n.createElement(X.a,{size:"small",id:"average",label:"Durchschnitt",variant:"outlined",value:this.state.average.toPrecision(2),InputProps:{readOnly:!0},type:"number",InputLabelProps:{shrink:!0}}))),n.createElement($.a,null,n.createElement(K.a,{align:"right",colSpan:9},n.createElement(f.a,{variant:"body1",color:this.state.minusPoints<=2?"textPrimary":"error"},"Minuspunkte: ",this.state.minusPoints)))))),n.createElement("br",null),n.createElement("div",{style:{textAlign:"right",paddingBottom:"50px"}},n.createElement(j.a,{variant:"contained",color:"primary",onClick:function(){var t=e.props.cookies;t&&t.set("subjects",JSON.stringify(e.state.subjects))}},"Save")))}}]),a}(n.Component),ne=a(159),re=a(80),ce=a(82),le=a(83),ie=a(162),oe=a(158);function se(e){var t=e.children,a=e.value,n=e.index,c=Object(le.a)(e,["children","value","index"]);return r.a.createElement("div",Object.assign({role:"tabpanel",hidden:a!==n,id:"vertical-tabpanel-".concat(n),"aria-labelledby":"vertical-tab-".concat(n),style:{padding:"10px"}},c),t)}function ue(e){var t,a=e.classes,n=e.cookies,c=r.a.useState(0),l=Object(ce.a)(c,2),i=l[0],o=l[1];return r.a.createElement("div",{className:a.verticalTabsRoot},r.a.createElement(ie.a,{orientation:"vertical",variant:"scrollable",value:i,onChange:function(e,t){o(t)},"aria-label":"Vertical tabs example",className:a.tabs},r.a.createElement(oe.a,Object.assign({label:"Notenrechner"},{id:"vertical-tab-".concat(t=0),"aria-controls":"vertical-tabpanel-".concat(t)}))),r.a.createElement(se,{value:i,index:0},r.a.createElement(ae,{classes:a,cookies:n})))}var me=Object(re.a)(ne.a,Object(i.a)((function(e){return Object(B.a)({root:{position:"fixed",bottom:e.spacing(2),right:e.spacing(2)},drawer:Object(L.a)({},e.breakpoints.up("sm"),{width:240,flexShrink:0}),drawerTitle:{fontWeight:"bold"},grow:{flexGrow:1},menuButton:{marginRight:e.spacing(2)},title:Object(L.a)({display:"none"},e.breakpoints.up("sm"),{display:"block"}),search:Object(L.a)({position:"relative",borderRadius:e.shape.borderRadius,backgroundColor:Object(T.b)(e.palette.common.white,.15),"&:hover":{backgroundColor:Object(T.b)(e.palette.common.white,.25)},marginRight:e.spacing(2),marginLeft:0,width:"100%"},e.breakpoints.up("sm"),{marginLeft:e.spacing(3),width:"auto"}),searchIcon:{padding:e.spacing(0,2),height:"100%",position:"absolute",pointerEvents:"none",display:"flex",alignItems:"center",justifyContent:"center"},inputRoot:{color:"inherit"},inputInput:Object(L.a)({padding:e.spacing(1,1,1,0),paddingLeft:"calc(1em + ".concat(e.spacing(4),"px)"),transition:e.transitions.create("width"),width:"100%"},e.breakpoints.up("md"),{width:"20ch"}),sectionDesktop:Object(L.a)({display:"none"},e.breakpoints.up("md"),{display:"flex"}),sectionMobile:Object(L.a)({display:"flex"},e.breakpoints.up("md"),{display:"none"}),toolbar:e.mixins.toolbar,drawerPaper:{width:240},content:{flexGrow:1,padding:e.spacing(3)},paper:{padding:e.spacing(2),textAlign:"center",color:e.palette.text.secondary},table:{minWidth:650},verticalTabsRoot:{flexGrow:1,backgroundColor:e.palette.background.paper,display:"flex"},tabs:{minWidth:150,borderRight:"1px solid ".concat(e.palette.divider)}})})))((function(e){var t=e.classes;return r.a.createElement(z,{classes:t},r.a.createElement(J.c,null,r.a.createElement(J.a,{path:"/",exact:!0},r.a.createElement(ue,{classes:t,cookies:e.cookies})),r.a.createElement(J.a,{path:"/calculator"},r.a.createElement(ae,{classes:t,cookies:e.cookies}))))}));Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var he=a(160);l.a.render(r.a.createElement(he.a,null,r.a.createElement(C.a,null,r.a.createElement(me,null))),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))},89:function(e,t,a){e.exports=a(102)},94:function(e,t,a){},95:function(e,t,a){}},[[89,1,2]]]);
//# sourceMappingURL=main.40ee1fcd.chunk.js.map