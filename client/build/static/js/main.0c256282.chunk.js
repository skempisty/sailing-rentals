(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[0],{26:function(e,t){e.exports={baseUrl:Object({NODE_ENV:"production",PUBLIC_URL:"",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0}).REACT_APP_BACKEND_BASE_URL}},75:function(e,t,n){e.exports=n(90)},90:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),c=n(22),o=n.n(c),i=n(35),l=(n(84),n(6)),s=n.n(l),u=n(7),p=n(11),m=n(12),d=n(14),h=n(13),f=n(73),g=n(8),v=n(101),b=n(74),E=n(99),y=n(41);var k=function(e){var t=e.onLogin,n=e.onFailure;return r.a.createElement(y.GoogleLogin,{clientId:"400414767165-htug20sknn027u3oif8cse8262bvclfv.apps.googleusercontent.com",buttonText:"Signup/Login",onSuccess:t,onFailure:n,cookiePolicy:"single_host_origin"})};var j=function(){return r.a.createElement(y.GoogleLogout,{clientId:"400414767165-htug20sknn027u3oif8cse8262bvclfv.apps.googleusercontent.com",buttonText:"Logout",onLogoutSuccess:function(){localStorage.removeItem("tokenId"),window.location="/"}})},O=n(26),x=n.n(O);function w(){return _.apply(this,arguments)}function _(){return(_=Object(u.a)(s.a.mark((function e(){var t,n,a;return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t="".concat(x.a.baseUrl,"/api/users/logged_in"),n={method:"GET",headers:{"Content-Type":"application/x-www-form-urlencoded",Authorization:localStorage.getItem("tokenId")}},e.next=4,fetch(t,n);case 4:return a=e.sent,e.next=7,a.json();case 7:return e.abrupt("return",e.sent);case 8:case"end":return e.stop()}}),e)})))).apply(this,arguments)}var C=n(52),S=Object(C.b)({name:"general",initialState:{loggedInUser:null},reducers:{loginUser:function(e,t){var n=t.payload.userObj,a=n.first_name,r=n.last_name,c=n.email,o=n.image_url,i=n.is_approved,l=n.is_admin;e.loggedInUser={firstName:a,lastName:r,email:c,imageUrl:o,isApproved:i,isAdmin:l}}}}),I=S.actions.loginUser,U=S.reducer,T=function(e){Object(d.a)(n,e);var t=Object(h.a)(n);function n(){return Object(p.a)(this,n),t.apply(this,arguments)}return Object(m.a)(n,[{key:"handleLoginSuccess",value:function(){var e=Object(u.a)(s.a.mark((function e(t){var n,a,r,c;return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=this.props,a=n.loginUser,r=n.history,localStorage.setItem("tokenId",t.tokenId),e.next=4,w();case 4:c=e.sent,a({userObj:c[0]}),c[0].isApproved||r.push("/sign-up");case 7:case"end":return e.stop()}}),e,this)})));return function(t){return e.apply(this,arguments)}}()},{key:"handleLoginFailure",value:function(e){console.log("res",e)}},{key:"render",value:function(){var e=this,t=this.props,n=t.loggedInUser,a=t.history;return r.a.createElement(v.a,{bg:"dark",variant:"dark"},r.a.createElement(v.a.Brand,{href:"#home"},"NPSFYC"),r.a.createElement(b.a,{className:"mr-auto"},r.a.createElement(b.a.Link,{onClick:function(){return a.push("/")}},"Home"),r.a.createElement(b.a.Link,{href:"https://ca-logos.printavo.com/merch/npsfyc",target:"_blank"},"Apparel"),r.a.createElement(b.a.Link,{href:"#pricing"},"Contact Us")),r.a.createElement(b.a,null,n?r.a.createElement(E.a,{alignRight:!0},r.a.createElement(E.a.Toggle,{variant:"dark",id:"dropdown-basic"},r.a.createElement("img",{src:n.imageUrl,style:{height:"3em",marginRight:"1em"}})),r.a.createElement(E.a.Menu,null,r.a.createElement(E.a.Item,{onClick:function(){return a.push("/sign-up")}},"Profile"),r.a.createElement(E.a.Item,{onClick:function(){return a.push("/my-rentals")}},"My Rentals"),!!n.isAdmin&&r.a.createElement(r.a.Fragment,null,r.a.createElement(E.a.Item,{onClick:function(){return a.push("/admin-panel")}},"Admin Panel")),r.a.createElement(E.a.Item,null,r.a.createElement(j,null)))):r.a.createElement(k,{onLogin:function(t){return e.handleLoginSuccess(t)},onFailure:function(t){return e.handleLoginFailure(t)}})))}}]),n}(r.a.Component),L={loginUser:I},A=Object(i.b)((function(e){return{loggedInUser:e.general.loggedInUser}}),L)(Object(g.e)(T)),P=n(100),D=n(102),K=n(67),B=function(e){Object(d.a)(n,e);var t=Object(h.a)(n);function n(){return Object(p.a)(this,n),t.apply(this,arguments)}return Object(m.a)(n,[{key:"render",value:function(){var e=this.props.children;return r.a.createElement("div",{style:{padding:"2em 5em",height:"100%",background:"#004679"}},e)}}]),n}(r.a.Component);function F(){return N.apply(this,arguments)}function N(){return(N=Object(u.a)(s.a.mark((function e(){return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",[{img_src:"http://loremflickr.com/1600/400/sailing",label:"First slide label",sub_text:"Nulla vitae elit libero, a pharetra augue mollis interdum."},{img_src:"http://loremflickr.com/1600/400/boats",label:"Second slide label",sub_text:"Nulla vitae elit libero, a pharetra augue mollis interdum."},{img_src:"http://loremflickr.com/1600/400/navy",label:"Third slide label",sub_text:"Nulla vitae elit libero, a pharetra augue mollis interdum."}]);case 1:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function M(){return R.apply(this,arguments)}function R(){return(R=Object(u.a)(s.a.mark((function e(){return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",[{id:"1",img_src:"http://loremflickr.com/400/600/sailing",title:"Title 1",short_description:"descrip1",description:"descrip1"},{id:"2",img_src:"http://loremflickr.com/400/600/friend",title:"Title 2",short_description:"descrip2",description:"descrip2"},{id:"3",img_src:"http://loremflickr.com/400/600/spongebob",title:"Title 3",short_description:"descrip3",description:"descrip3"}]);case 1:case"end":return e.stop()}}),e)})))).apply(this,arguments)}var W=function(e){Object(d.a)(n,e);var t=Object(h.a)(n);function n(e){var a;return Object(p.a)(this,n),(a=t.call(this,e)).carouselSlides=[],a.posts=[],a.state={loadingPage:!0},a}return Object(m.a)(n,[{key:"componentDidMount",value:function(){var e=Object(u.a)(s.a.mark((function e(){return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,F();case 3:return this.carouselSlides=e.sent,e.next=6,M();case 6:this.posts=e.sent,this.setState({loadingPage:!1}),e.next=13;break;case 10:e.prev=10,e.t0=e.catch(0),alert(e.t0);case 13:case"end":return e.stop()}}),e,this,[[0,10]])})));return function(){return e.apply(this,arguments)}}()},{key:"render",value:function(){var e=this.props.history,t=this.carouselSlides;return r.a.createElement(r.a.Fragment,null,r.a.createElement(P.a,{controls:!0},t.map((function(e){return r.a.createElement(P.a.Item,null,r.a.createElement("img",{className:"d-block w-100",src:e.img_src,style:{height:"22.5em",objectFit:"cover"}}),r.a.createElement(P.a.Caption,null,r.a.createElement("h3",null,e.label),r.a.createElement("p",null,e.sub_text)))}))),r.a.createElement(B,null,r.a.createElement("div",{style:{margin:"0 auto",maxWidth:"45em"}},r.a.createElement("h2",{style:{marginBottom:"1em",color:"white",textAlign:"center"}},"News/Announcements"),r.a.createElement("div",{style:{display:"flex",justifyContent:"space-around",margin:"1em auto 0 auto"}},this.posts.map((function(t){return r.a.createElement(D.a,{style:{width:"18rem"}},r.a.createElement(D.a.Img,{variant:"top",src:t.img_src}),r.a.createElement(D.a.Body,null,r.a.createElement(D.a.Title,null,t.title),r.a.createElement(D.a.Text,null,t.short_description),r.a.createElement(K.a,{variant:"primary",onClick:function(){return e.push("/posts/".concat(t.id))}},"See more")))}))))))}}]),n}(r.a.Component),z=function(e){Object(d.a)(n,e);var t=Object(h.a)(n);function n(){return Object(p.a)(this,n),t.apply(this,arguments)}return Object(m.a)(n,[{key:"componentDidMount",value:function(){console.log("signup mounted")}},{key:"render",value:function(){return r.a.createElement("div",null,"sign up")}}]),n}(r.a.Component);function G(e){return H.apply(this,arguments)}function H(){return(H=Object(u.a)(s.a.mark((function e(t){return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",{id:"1",img_src:"http://loremflickr.com/400/600/sailing",title:"Title 1",short_description:"descrip1",description:"descrip1"});case 1:case"end":return e.stop()}}),e)})))).apply(this,arguments)}var J=n(95),X=function(e){Object(d.a)(n,e);var t=Object(h.a)(n);function n(){return Object(p.a)(this,n),t.apply(this,arguments)}return Object(m.a)(n,[{key:"render",value:function(){return r.a.createElement("div",{style:{display:"flex",alignItems:"center",margin:"2em auto 0 auto"}},r.a.createElement(J.a,{animation:"border"}),r.a.createElement("span",{style:{marginLeft:"1em"}},"Loading\u2026"))}}]),n}(r.a.Component),q=function(e){Object(d.a)(n,e);var t=Object(h.a)(n);function n(e){var a;return Object(p.a)(this,n),(a=t.call(this,e)).state={loading:!0},a}return Object(m.a)(n,[{key:"componentDidMount",value:function(){var e=Object(u.a)(s.a.mark((function e(){var t;return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=this.props.match.params.id,e.prev=1,e.next=4,G(t);case 4:this.post=e.sent,console.log("this.post",this.post),this.setState({loading:!1}),e.next=11;break;case 9:e.prev=9,e.t0=e.catch(1);case 11:case"end":return e.stop()}}),e,this,[[1,9]])})));return function(){return e.apply(this,arguments)}}()},{key:"render",value:function(){var e=this.state.loading,t=this.post;return r.a.createElement(B,null,e?r.a.createElement(X,null):r.a.createElement(r.a.Fragment,null,r.a.createElement("h3",null,t.title),r.a.createElement("img",{src:t.img_src}),r.a.createElement("div",null,t.description)))}}]),n}(r.a.Component),V=n(68),Y=n(69),$=n(97),Q=n(98),Z=n(96);function ee(e){return te.apply(this,arguments)}function te(){return(te=Object(u.a)(s.a.mark((function e(t){var n,a,r;return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n="".concat(x.a.baseUrl,"/api/users/").concat(t,"/approve"),a={method:"PUT",headers:{"Content-Type":"application/json",Authorization:localStorage.getItem("tokenId")}},e.next=4,fetch(n,a);case 4:return r=e.sent,e.next=7,r.json();case 7:return e.abrupt("return",e.sent);case 8:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function ne(e){return ae.apply(this,arguments)}function ae(){return(ae=Object(u.a)(s.a.mark((function e(t){var n,a,r;return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n="".concat(x.a.baseUrl,"/api/users/").concat(t),a={method:"DELETE",headers:{"Content-Type":"application/json",Authorization:localStorage.getItem("tokenId")}},e.next=4,fetch(n,a);case 4:return r=e.sent,e.next=7,r.json();case 7:return e.abrupt("return",e.sent);case 8:case"end":return e.stop()}}),e)})))).apply(this,arguments)}var re=function(e){Object(d.a)(n,e);var t=Object(h.a)(n);function n(){return Object(p.a)(this,n),t.apply(this,arguments)}return Object(m.a)(n,[{key:"handleApproveClick",value:function(){var e=Object(u.a)(s.a.mark((function e(t){return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return console.log("approve",t),e.next=3,ee(t);case 3:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()},{key:"handleDeleteUserClick",value:function(){var e=Object(u.a)(s.a.mark((function e(t){return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return console.log("delete",t),e.next=3,ne(t);case 3:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()},{key:"render",value:function(){var e=this,t=this.props.users;return r.a.createElement(r.a.Fragment,null,r.a.createElement(D.a,null,r.a.createElement(D.a.Body,null,r.a.createElement(Z.a,{striped:!0,bordered:!0,hover:!0,style:{margin:"0"}},r.a.createElement("thead",null,r.a.createElement("tr",null,r.a.createElement("th",null,"Email"),r.a.createElement("th",null,"approve"),r.a.createElement("th",null,"delete"))),r.a.createElement("tbody",null,t.map((function(t,n){return r.a.createElement("tr",{key:"user-row-".concat(t.id,"-").concat(n)},r.a.createElement("td",null,t.email),r.a.createElement("td",{onClick:function(){return e.handleApproveClick(t.id)},style:{cursor:"pointer "}},"X"),r.a.createElement("td",{onClick:function(){return e.handleDeleteUserClick(t.id)},style:{cursor:"pointer "}},"X"))})))))))}}]),n}(r.a.Component);function ce(){return oe.apply(this,arguments)}function oe(){return(oe=Object(u.a)(s.a.mark((function e(){var t,n,a;return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t="".concat(x.a.baseUrl,"/api/users"),n={method:"GET",headers:{"Content-Type":"application/json",Authorization:localStorage.getItem("tokenId")}},e.next=4,fetch(t,n);case 4:return a=e.sent,e.next=7,a.json();case 7:return e.abrupt("return",e.sent);case 8:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function ie(){var e=Object(V.a)(["\n  [role='tab'] {\n    color: white;\n    \n    &.disabled {\n      color: grey;\n    }\n"]);return ie=function(){return e},e}var le=Y.a.div(ie()),se=function(e){Object(d.a)(n,e);var t=Object(h.a)(n);function n(e){var a;return Object(p.a)(this,n),(a=t.call(this,e)).users=[],a.carouselSlides=[],a.posts=[],a.state={activeKey:"users",loadingPage:!0},a}return Object(m.a)(n,[{key:"componentDidMount",value:function(){var e=Object(u.a)(s.a.mark((function e(){return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,ce();case 3:return this.users=e.sent,e.next=6,F();case 6:return this.carouselSlides=e.sent,e.next=9,M();case 9:this.posts=e.sent,this.setState({loadingPage:!1}),e.next=15;break;case 13:e.prev=13,e.t0=e.catch(0);case 15:case"end":return e.stop()}}),e,this,[[0,13]])})));return function(){return e.apply(this,arguments)}}()},{key:"render",value:function(){var e=this,t=this.state,n=t.loadingPage,a=t.activeKey,c=this.users,o=this.carouselSlides,i=this.posts;return r.a.createElement(B,null,r.a.createElement(le,null,n?r.a.createElement(X,null):r.a.createElement($.a,{activeKey:a,onSelect:function(t){return e.setState({activeKey:t})},variant:"pills",style:{marginBottom:"1em",paddingBottom:"1em",borderBottom:"1px solid white"}},r.a.createElement(Q.a,{eventKey:"users",title:"Users"},r.a.createElement(re,{users:c})),r.a.createElement(Q.a,{eventKey:"carousel",title:"Carousel"},"Carousel",o.map((function(e,t){return r.a.createElement("div",{key:"slide-".concat(t)},e.label)}))),r.a.createElement(Q.a,{eventKey:"posts",title:"Posts",style:{color:"white"}},"Posts",i.map((function(e,t){return r.a.createElement("div",{key:"post-".concat(t)},e.title)}))),r.a.createElement(Q.a,{eventKey:"boats",title:"Boats",disabled:!0}),r.a.createElement(Q.a,{eventKey:"calendar",title:"Calendar",disabled:!0}))))}}]),n}(r.a.Component),ue=function(e){Object(d.a)(n,e);var t=Object(h.a)(n);function n(){return Object(p.a)(this,n),t.apply(this,arguments)}return Object(m.a)(n,[{key:"componentDidMount",value:function(){var e=Object(u.a)(s.a.mark((function e(){var t,n;return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(t=this.props.loginUser,!localStorage.getItem("tokenId")){e.next=6;break}return e.next=4,w();case 4:n=e.sent,t({userObj:n[0]});case 6:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"render",value:function(){return r.a.createElement(f.a,null,r.a.createElement(A,null),r.a.createElement(g.a,{exact:!0,path:"/",component:W}),r.a.createElement(g.a,{exact:!0,path:"/sign-up",component:z}),r.a.createElement(g.a,{exact:!0,path:"/posts/:id",component:q}),r.a.createElement(g.a,{exact:!0,path:"/admin-panel",component:se}))}}]),n}(r.a.Component),pe={loginUser:I},me=Object(i.b)((function(e){return{loggedInUser:e.general.loggedInUser}}),pe)(ue);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var de=n(18),he=Object(de.c)({general:U}),fe=Object(C.a)({reducer:he});o.a.render(r.a.createElement(i.a,{store:fe},r.a.createElement(me,null)),document.querySelector("#root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))}},[[75,1,2]]]);
//# sourceMappingURL=main.0c256282.chunk.js.map