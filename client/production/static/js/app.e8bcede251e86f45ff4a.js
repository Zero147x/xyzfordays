webpackJsonp([1],{"/Bag":function(t,e,n){"use strict";var s=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{attrs:{id:"app"}},[n("div",[n("b-navbar",{attrs:{toggleable:"",type:"light",variant:"light"}},[n("b-nav-toggle",{attrs:{target:"nav_text_collapse"}}),t._v(" "),n("b-collapse",{attrs:{"is-nav":"",id:"nav_text_collapse"}},[n("b-nav",{attrs:{"is-nav-bar":""}},[n("b-nav-item",[n("b-btn",{attrs:{to:{name:"Register"},variant:"primary"}},[t._v("\n                    Register\n                  ")]),t._v(" "),n("b-btn",{attrs:{to:{name:"Login"},variant:"primary"}},[t._v("\n                    Login\n                  ")])],1)],1),t._v(" "),n("b-nav",{staticClass:"ml-auto",attrs:{"is-nav-bar":""}},[n("b-col",{attrs:{sm:"8"}},[n("b-form-input",{attrs:{type:"text",placeholder:"Search..."},nativeOn:{keyup:function(e){if(!("button"in e)&&t._k(e.keyCode,"enter",13))return null;t.send(e)}},model:{value:t.search,callback:function(e){t.search=e},expression:"search"}})],1),t._v(" "),n("b-col",[n("b-btn",{attrs:{variant:"primary"},on:{click:function(e){e.stopPropagation(),t.Search(e)}}},[t._v("\n                Search\n                ")])],1)],1)],1)],1)],1),t._v(" "),n("main",[n("b-container",{attrs:{fluid:""}},[n("router-view")],1)],1)])},a=[],r={render:s,staticRenderFns:a};e.a=r},"/KFX":function(t,e,n){"use strict";function s(t){n("8wWg")}var a=n("AHJT"),r=n("853a"),o=n("VU/8"),i=s,c=o(a.a,r.a,i,null,null);e.a=c.exports},"42Hy":function(t,e,n){"use strict";function s(t){n("Bv5R")}var a=n("DK6z"),r=n("rdrv"),o=n("VU/8"),i=s,c=o(a.a,r.a,i,null,null);e.a=c.exports},"5ECI":function(t,e,n){"use strict";function s(t){n("dvdC")}var a=n("ZXIq"),r=n("b2oC"),o=n("VU/8"),i=s,c=o(a.a,r.a,i,null,null);e.a=c.exports},"84kS":function(t,e,n){"use strict";e.a={data:function(){return{drawer:this.drawer}},props:["drawer"]}},"853a":function(t,e,n){"use strict";var s=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-layout",[n("v-flex",{attrs:{xs12:"",sm10:"",md8:"","offset-sm1":"","offset-md2":""}},[n("v-card",[n("v-list",{attrs:{"three-line":""}},[t._l(t.result,function(e){return[e.header?n("v-subheader",{domProps:{textContent:t._s(e.header)}}):t._e(),t._v(" "),n("v-divider"),t._v(" "),n("v-list-tile",{attrs:{to:{name:"Index",params:{community:e.name}}},on:{click:function(t){}}},[n("v-list-tile-avatar"),t._v(" "),n("v-list-tile-content",[n("v-list-tile-title",{domProps:{innerHTML:t._s(e.name)}}),t._v(" "),n("v-list-tile-sub-title",{domProps:{innerHTML:t._s(e.subtitle)}})],1)],1)]})],2)],1)],1)],1)},a=[],r={render:s,staticRenderFns:a};e.a=r},"8wWg":function(t,e){},"9M+g":function(t,e){},AHJT:function(t,e,n){"use strict";var s=n("Xxa5"),a=n.n(s),r=n("exGp"),o=n.n(r),i=n("mEEx");e.a={data:function(){return{result:""}},watch:{"$route.query.search":{immediate:!0,handler:function(t){var e=this;return o()(a.a.mark(function n(){var s;return a.a.wrap(function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,i.a.search(t);case 2:s=n.sent,e.result=s.data;case 4:case"end":return n.stop()}},n,e)}))()}}}}},AJqI:function(t,e,n){"use strict";function s(t){n("WE32")}var a=n("wQ0S"),r=n("ZW2k"),o=n("VU/8"),i=s,c=o(a.a,r.a,i,null,null);e.a=c.exports},Bv5R:function(t,e){},CLm6:function(t,e,n){"use strict";var s=n("H/Zg");e.a={register:function(t){return n.i(s.a)().post("register",t)},login:function(t){return n.i(s.a)().post("login",t)}}},DK6z:function(t,e,n){"use strict";var s=n("Xxa5"),a=n.n(s),r=n("exGp"),o=n.n(r),i=n("YcJa"),c=n("mEEx"),u=n("M4fF"),l=n.n(u);e.a={components:{NotFound:i.a},data:function(){return{active:!1,user:[],message:"",sentMessage:[]}},sockets:{connect:function(){console.log("Connected to socket!")},disconnect:function(){this.$socket.emit("leave",{username:this.$store.state.user,name:this.$store.state.room})},newMessage:function(t){this.sentMessage.push({username:t.user.username,message:t.message,isAdmin:t.user.isAdmin}),this.scrollToEnd()},update:function(t){this.sentMessage.push({username:t.user.username,message:t.message,isAdmin:t.user.isAdmin}),this.scrollToEnd()},updateUsers:function(t){this.$store.dispatch("socket_users",t.users),this.users=t.users},updateRoom:function(t){this.$store.dispatch("socket_room",t.room)},updateLocal:function(t){this.$store.dispatch("socket_users",t.users)}},methods:{scrollToEnd:l.a.debounce(function(){var t=this.$el.querySelector("#chat");t.scrollTop=t.scrollHeight},50),send:function(){""!==this.message&&this.$socket.emit("message",{message:this.message,name:this.$route.path})},connect:function(){var t=this;return o()(a.a.mark(function e(){return a.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:t.$store.state.room||t.$socket.emit("join",{user:t.$store.state.user,name:t.$route.path},t.$route.params);case 1:case"end":return e.stop()}},e,t)}))()},disconnect:function(){this.$store.state.room===this.$route.path&&this.$socket.emit("leave",{username:this.$store.state.user,name:this.$store.state.room})}},watch:{$route:function(){function t(t){return e.apply(this,arguments)}var e=o()(a.a.mark(function t(e){var n;return a.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,this.$socket.emit("leave",{name:this.$store.state.room}),t.next=4,c.a.index(this.$route.path);case 4:n=t.sent,n.data.error&&this.$router.push({name:"Community"}),t.next=11;break;case 8:t.prev=8,t.t0=t.catch(0),console.log("error with request");case 11:case"end":return t.stop()}},t,this,[[0,8]])}));return t}()},beforeMount:function(){var t=this;return o()(a.a.mark(function e(){var n;return a.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,c.a.index(t.$route.path);case 3:n=e.sent,n.data.error&&t.$router.push({name:"Community"}),e.next=10;break;case 7:e.prev=7,e.t0=e.catch(0),console.log("error with request");case 10:case"end":return e.stop()}},e,t,[[0,7]])}))()}}},E9VF:function(t,e){},"H/Zg":function(t,e,n){"use strict";var s=n("mtWM"),a=n.n(s),r=n("wtEF"),o=n("d2gY"),i=n.n(o);e.a=function(){return a.a.create({baseURL:""+i.a.url,headers:{Authorization:"Bearer "+r.a.state.token}})}},JJT7:function(t,e,n){"use strict";var s=n("Xxa5"),a=n.n(s),r=n("exGp"),o=n.n(r),i=n("CLm6");e.a={data:function(){return{username:"",password:""}},methods:{register:function(){var t=this;return o()(a.a.mark(function e(){return a.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,i.a.register({username:t.username,password:t.password});case 2:case"end":return e.stop()}},e,t)}))()}}}},Jmt5:function(t,e){},M93x:function(t,e,n){"use strict";function s(t){n("Pxcp")}var a=n("xJD8"),r=n("/Bag"),o=n("VU/8"),i=s,c=o(a.a,r.a,i,null,null);e.a=c.exports},NHnr:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s=n("sCSS"),a=n("Jmt5"),r=(n.n(a),n("9M+g")),o=(n.n(r),n("7+uW")),i=n("M93x"),c=n("YaEn"),u=n("9JMe"),l=(n.n(u),n("3EgV")),m=n.n(l),d=n("wtEF");n.i(u.sync)(d.a,c.a),o.a.use(s.a),o.a.config.productionTip=!1,o.a.use(m.a),new o.a({el:"#app",router:c.a,store:d.a,template:"<App/>",components:{App:i.a}})},Pxcp:function(t,e){},WE32:function(t,e){},WUgh:function(t,e,n){"use strict";var s=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-navigation-drawer",{attrs:{temporary:"",absolute:"",light:"",overflow:""},model:{value:t.drawer,callback:function(e){t.drawer=e},expression:"drawer"}},[n("v-toolbar",{staticClass:"transparent",attrs:{flat:""}},[n("v-list",{staticClass:"pa-0"},[n("v-list-tile",{attrs:{avatar:""}},[n("v-list-tile-avatar",[n("img",{attrs:{src:"https://randomuser.me/api/portraits/men/85.jpg"}})]),t._v(" "),n("v-list-tile-content",[n("v-list-tile-title",[t._v("John Leider")])],1)],1)],1)],1),t._v(" "),n("v-list",{staticClass:"pt-0",attrs:{dense:""}},[n("v-divider"),t._v(" "),n("v-list-tile",{on:{click:function(t){}}},[n("v-list-tile-action",[n("v-icon")],1),t._v(" "),n("v-list-tile-content",[n("v-list-tile-title")],1)],1)],1)],1)},a=[],r={render:s,staticRenderFns:a};e.a=r},WoGI:function(t,e,n){"use strict";e.a={}},YaEn:function(t,e,n){"use strict";var s=n("7+uW"),a=n("/ocq"),r=n("xJsL"),o=n("dIqY"),i=n("5ECI"),c=n("42Hy"),u=n("/KFX"),l=n("AJqI");s.a.use(a.a),e.a=new a.a({routes:[{path:"/login",name:"Login",component:r.a},{path:"/register",name:"Register",component:o.a},{path:"/community",name:"Community",component:i.a},{path:"/c/:community",name:"Index",component:c.a},{path:"/c/:community/edit",name:"Edit",component:l.a},{path:"/",name:"Search",component:u.a}]})},YcJa:function(t,e,n){"use strict";function s(t){n("oVLU")}var a=n("WoGI"),r=n("VU/8"),o=s,i=r(a.a,null,o,null,null);e.a=i.exports},ZW2k:function(t,e,n){"use strict";var s=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("b-row",[n("b-col",{attrs:{sm:"6"}},[n("b-row",[n("b-nav",{staticClass:"ml-auto mr-3",attrs:{tabs:""}},[n("b-nav-item",{staticClass:"notActive",attrs:{to:{name:"Index",params:{community:"omg"}}}},[t._v("\n            omg\n          ")]),t._v(" "),n("b-nav-item",{attrs:{to:{name:"Edit"}}},[t._v("\n            edit\n          ")])],1)],1),t._v(" "),n("b-card",{attrs:{id:"chat"}},[n("b-row",[n("b-col",{attrs:{sm:"6"}},[n("b-form-textarea",{attrs:{placeholder:"Greeting Message",rows:"3"},model:{value:t.greeting,callback:function(e){t.greeting=e},expression:"greeting"}}),t._v(" "),n("b-btn",{staticClass:"save",attrs:{variant:"success"},on:{click:[function(e){e.stopPropagation(),t.save(e)},t.test]}},[t._v("\n            Save\n          ")])],1)],1)],1)],1)],1)},a=[],r={render:s,staticRenderFns:a};e.a=r},ZXIq:function(t,e,n){"use strict";var s=n("Xxa5"),a=n.n(s),r=n("exGp"),o=n.n(r),i=n("mEEx");e.a={data:function(){return{name:""}},methods:{create:function(){var t=this;return o()(a.a.mark(function e(){var n;return a.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,i.a.create({name:t.name,user:t.$store.state.user});case 3:n=e.sent,t.$router.push({name:"Index",params:{community:n.data.name}}),t.$socket.emit("join",{user:t.$store.state.user,name:"/c/"+n.data.name}),e.next=11;break;case 8:e.prev=8,e.t0=e.catch(0),console.log(e.t0);case 11:case"end":return e.stop()}},e,t,[[0,8]])}))()}}}},a1CX:function(t,e,n){"use strict";var s=n("84kS"),a=n("WUgh"),r=n("VU/8"),o=r(s.a,a.a,null,null,null);e.a=o.exports},b2oC:function(t,e,n){"use strict";var s=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-layout",[n("v-flex",{attrs:{xs12:"",sm10:"",md8:"","offset-sm1":"","offset-md2":""}},[n("v-card",{attrs:{height:"200px"}},[n("v-text-field",{attrs:{label:"Enter Community Name","single-line":"","full-width":"","hide-details":""},model:{value:t.name,callback:function(e){t.name=e},expression:"name"}}),t._v(" "),n("v-btn",{attrs:{primary:""},on:{click:t.create}},[t._v("\n        Create\n      ")])],1)],1)],1)},a=[],r={render:s,staticRenderFns:a};e.a=r},d2gY:function(t,e){t.exports={url:"https://project-zero147x.c9users.io:8081"}},dIqY:function(t,e,n){"use strict";function s(t){n("gbbX")}var a=n("JJT7"),r=n("kg/s"),o=n("VU/8"),i=s,c=o(a.a,r.a,i,null,null);e.a=c.exports},dvdC:function(t,e){},gbbX:function(t,e){},"kg/s":function(t,e,n){"use strict";var s=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-layout",[n("v-flex",{attrs:{xs6:"",md3:"","offset-xs4":""}},[n("v-text-field",{attrs:{label:"username","single-line":"",required:"","full-width":"","hide-details":""},model:{value:t.username,callback:function(e){t.username=e},expression:"username"}}),t._v(" "),n("v-text-field",{attrs:{label:"password",type:"password","single-line":"",required:"","full-width":"","hide-details":""},model:{value:t.password,callback:function(e){t.password=e},expression:"password"}}),t._v(" "),n("v-btn",{attrs:{primary:"",medium:""},on:{click:t.register}},[t._v("\n      Register\n    ")])],1)],1)},a=[],r={render:s,staticRenderFns:a};e.a=r},mEEx:function(t,e,n){"use strict";var s=n("H/Zg");e.a={create:function(t){return n.i(s.a)().post("community",t)},index:function(t){return n.i(s.a)().get(""+t,t)},edit:function(t){return n.i(s.a)().post(t.path,{greeting:t.greeting})},search:function(t){return n.i(s.a)().get("/",{params:{search:t}})}}},"nKb+":function(t,e,n){"use strict";var s=n("Xxa5"),a=n.n(s),r=n("exGp"),o=n.n(r),i=n("d2gY"),c=n.n(i),u=n("CLm6"),l=n("7+uW"),m=n("hMcO"),d=n.n(m),v=n("wtEF");e.a={data:function(){return{username:"",password:""}},methods:{login:function(){var t=this;return o()(a.a.mark(function e(){var n;return a.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,u.a.login({username:t.username,password:t.password});case 2:n=e.sent,t.$store.dispatch("setToken",n.data.token),t.$store.dispatch("setUser",n.data.user),l.a.use(d.a,c.a.url+"?auth_token="+t.$store.state.token,v.a,{reconnection:!0,reconnectionDelay:1e3,reconnectionDelayMax:5e3,reconnectionAttempts:99999}),t.$router.push({name:"Chat"});case 7:case"end":return e.stop()}},e,t)}))()}}}},oVLU:function(t,e){},rdrv:function(t,e,n){"use strict";var s=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("b-row",[n("b-col",{attrs:{sm:"6"}},[n("b-row",[n("b-nav",{staticClass:"ml-auto mr-3",attrs:{tabs:"",fill:""}},[n("b-nav-item",{attrs:{to:{name:"Index",params:{community:t.$route.params.community}}}},[t._v("\n                omg\n              ")]),t._v(" "),n("b-nav-item",{attrs:{to:{name:"Edit"}}},[t._v("\n                edit\n              ")])],1)],1),t._v(" "),n("b-card",{staticClass:"text-left",attrs:{id:"chat"}},[n("ul",{staticClass:"pl-2 pb-0"},t._l(t.sentMessage,function(e){return n("li",[n("span",{class:{admin:e.isAdmin},domProps:{innerHTML:t._s(e.username)}}),t._v(" -- "),n("span",{domProps:{innerHTML:t._s(e.message)}})])}))]),t._v(" "),n("b-row",[n("b-col",{attrs:{sm:"11 pr-0"}},[n("b-form-input",{attrs:{type:"text",placeholder:"type something"},nativeOn:{keyup:function(e){if(!("button"in e)&&t._k(e.keyCode,"enter",13))return null;t.send(e)}},model:{value:t.message,callback:function(e){t.message=e},expression:"message"}})],1),t._v(" "),n("b-col",{attrs:{sm:"1 pl-0"}},[n("b-btn",{staticClass:"send_btn",attrs:{variant:"success"},on:{click:t.send}},[t._v("\n            SEND\n          ")])],1)],1)],1),t._v(" "),n("b-col",{attrs:{sm:"4",md:"3",lg:"2"}},[n("b-row",[n("b-button",{attrs:{block:"",variant:"primary"},on:{click:t.connect}},[t._v("\n              Connect\n            ")])],1),t._v(" "),n("b-row",[n("b-button",{attrs:{block:"",variant:"primary"},on:{click:t.disconnect}},[t._v("\n              Disconnect\n            ")])],1),t._v(" "),n("b-row",[n("div",{staticClass:"text-xs-left",attrs:{id:"usersList"}},[n("ul",t._l(this.$store.state.users,function(e){return n("li",[e.isAdmin?n("span",{class:{admin:e.isAdmin},domProps:{innerHTML:t._s(e.username)}}):t._e(),t._v(" "),e.isAdmin?t._e():n("span",{domProps:{innerHTML:t._s(e.username)}}),n("b-badge",[t._v("1")])],1)}))])])],1)],1)},a=[],r={render:s,staticRenderFns:a};e.a=r},uuib:function(t,e,n){"use strict";var s=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-layout",[n("v-flex",{attrs:{xs6:"",md3:"","offset-xs4":""}},[n("v-text-field",{attrs:{label:"username","single-line":"",required:"","full-width":"","hide-details":""},model:{value:t.username,callback:function(e){t.username=e},expression:"username"}}),t._v(" "),n("v-text-field",{attrs:{label:"password",type:"password","single-line":"",required:"","full-width":"","hide-details":""},model:{value:t.password,callback:function(e){t.password=e},expression:"password"}}),t._v(" "),n("v-btn",{attrs:{primary:"",medium:""},on:{click:t.login}},[t._v("\n      Login\n    ")])],1)],1)},a=[],r={render:s,staticRenderFns:a};e.a=r},wQ0S:function(t,e,n){"use strict";var s=n("Xxa5"),a=n.n(s),r=n("exGp"),o=n.n(r),i=n("mEEx");e.a={data:function(){return{greeting:"",description:""}},methods:{save:function(){var t=this;return o()(a.a.mark(function e(){return a.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,i.a.edit({greeting:t.greeting,path:t.$route.path});case 2:case"end":return e.stop()}},e,t)}))()},test:function(){console.log(this.$route.params)}}}},wtEF:function(t,e,n){"use strict";var s=n("7+uW"),a=n("NYxO");s.a.use(a.a),e.a=new a.a.Store({strict:!0,state:{token:null,user:null,isUserLoggedIn:!1,users:[],room:null},mutations:{setToken:function(t,e){t.token=e,t.isUserLoggedIn=!!e},setUser:function(t,e){t.user=e},SOCKET_USERS:function(t,e){t.users=e},SOCKET_ROOM:function(t,e){t.room=e}},actions:{setToken:function(t,e){(0,t.commit)("setToken",e)},setUser:function(t,e){(0,t.commit)("setUser",e)},socket_users:function(t,e){(0,t.commit)("SOCKET_USERS",e)},socket_room:function(t,e){(0,t.commit)("SOCKET_ROOM",e)}}})},xJD8:function(t,e,n){"use strict";var s=n("a1CX");e.a={data:function(){return{drawer:!0,search:""}},sockets:{updateRoom:function(t){this.$store.dispatch("socket_room",t.room)},updateLocal:function(t){this.$store.dispatch("socket_users",t.users)}},components:{SideMenu:s.a},methods:{Search:function(){var t={name:"Search"};""!==this.search&&(t.query={search:this.search}),this.$router.push(t)}},watch:{$route:function(){if(null!==this.$store.state.room&&"Index"!==this.$route.name)try{this.$socket.emit("leave",{username:this.$store.state.user.username,name:this.$store.state.room})}catch(t){console.log("error with request")}}},name:"app"}},xJsL:function(t,e,n){"use strict";function s(t){n("E9VF")}var a=n("nKb+"),r=n("uuib"),o=n("VU/8"),i=s,c=o(a.a,r.a,i,null,null);e.a=c.exports}},["NHnr"]);
//# sourceMappingURL=app.e8bcede251e86f45ff4a.js.map