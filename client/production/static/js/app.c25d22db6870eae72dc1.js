webpackJsonp([1],{"/Bag":function(t,e,n){"use strict";var s=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{attrs:{id:"app"}},[n("div",[n("b-navbar",{attrs:{toggleable:"",type:"light",variant:"light"}},[n("b-nav-toggle",{attrs:{target:"nav_text_collapse"}}),t._v(" "),n("b-collapse",{attrs:{"is-nav":"",id:"nav_text_collapse"}},[n("b-nav",{attrs:{"is-nav-bar":""}},[n("b-nav-item",[n("b-btn",{attrs:{to:{name:"Register"},variant:"primary"}},[t._v("\n                    Register\n                  ")]),t._v(" "),n("b-btn",{attrs:{to:{name:"Login"},variant:"primary"}},[t._v("\n                    Login\n                  ")])],1)],1),t._v(" "),n("b-nav",{attrs:{"is-nav-bar":""}},[n("b-btn",{attrs:{to:{name:"Community"}}},[t._v("\n                Start Your Own Community\n              ")])],1),t._v(" "),n("b-nav",{staticClass:"ml-auto",attrs:{"is-nav-bar":""}},[n("b-row",[n("b-form",[n("b-form-group",{staticClass:"search_field"},[n("b-form-input",{attrs:{type:"text",placeholder:"Search..."},nativeOn:{keyup:function(e){if(!("button"in e)&&t._k(e.keyCode,"enter",13))return null;t.send(e)}},model:{value:t.search,callback:function(e){t.search=e},expression:"search"}})],1)],1),t._v(" "),n("b-btn",{staticClass:"search_btn",attrs:{variant:"primary"},on:{click:function(e){e.stopPropagation(),t.Search(e)}}},[t._v("\n                  Search\n                  ")])],1)],1)],1)],1)],1),t._v(" "),n("main",[n("b-container",{attrs:{fluid:""}},[n("router-view")],1)],1)])},r=[],a={render:s,staticRenderFns:r};e.a=a},"/KFX":function(t,e,n){"use strict";function s(t){n("8wWg")}var r=n("AHJT"),a=n("853a"),o=n("VU/8"),c=s,i=o(r.a,a.a,c,null,null);e.a=i.exports},"42Hy":function(t,e,n){"use strict";function s(t){n("Bv5R")}var r=n("DK6z"),a=n("rdrv"),o=n("VU/8"),c=s,i=o(r.a,a.a,c,null,null);e.a=i.exports},"5ECI":function(t,e,n){"use strict";function s(t){n("dvdC")}var r=n("ZXIq"),a=n("b2oC"),o=n("VU/8"),c=s,i=o(r.a,a.a,c,null,null);e.a=i.exports},"853a":function(t,e,n){"use strict";var s=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("b-row",[n("b-col",{staticClass:"m-auto",attrs:{sm:"6"}},[n("b-list-group",t._l(t.result,function(e,s,r){return n("b-list-group-item",{key:e,attrs:{to:{name:"Index",params:{community:e.name}}}},[n("b-row",[n("b-col",[t._v("\n            "+t._s(e.name)+"\n          ")])],1)],1)}))],1)],1)},r=[],a={render:s,staticRenderFns:r};e.a=a},"8wWg":function(t,e){},"9M+g":function(t,e){},AHJT:function(t,e,n){"use strict";var s=n("Xxa5"),r=n.n(s),a=n("exGp"),o=n.n(a),c=n("mEEx");e.a={data:function(){return{userCount:null,result:null}},sockets:{updateLocal:function(t){this.$store.dispatch("socket_users",t.users)},updateRoom:function(t){this.$store.dispatch("socket_room",t)}},watch:{"$route.query.search":{immediate:!0,handler:function(t){var e=this;return o()(r.a.mark(function n(){var s;return r.a.wrap(function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,c.a.search(t);case 2:s=n.sent,e.result=s.data;case 4:case"end":return n.stop()}},n,e)}))()}}},mounted:function(){var t=this;return o()(r.a.mark(function e(){var n;return r.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,c.a.home();case 2:n=e.sent,t.result=n.data,console.log(t.result);case 5:case"end":return e.stop()}},e,t)}))()}}},AJqI:function(t,e,n){"use strict";function s(t){n("WE32")}var r=n("wQ0S"),a=n("ZW2k"),o=n("VU/8"),c=s,i=o(r.a,a.a,c,null,null);e.a=i.exports},Bv5R:function(t,e){},CLm6:function(t,e,n){"use strict";var s=n("H/Zg");e.a={register:function(t){return n.i(s.a)().post("register",t)},login:function(t){return n.i(s.a)().post("login",t)}}},DK6z:function(t,e,n){"use strict";var s=n("Xxa5"),r=n.n(s),a=n("exGp"),o=n.n(a),c=n("YcJa"),i=n("mEEx"),u=n("M4fF"),m=n.n(u);e.a={components:{NotFound:c.a},data:function(){return{owner:!1,message:"",sentMessage:[]}},sockets:{connect:function(){console.log("Connected to socket!")},disconnect:function(){this.$socket.emit("leave",{c:this.$store.state.room})},newMessage:function(t){this.sentMessage.push({username:t.username,message:t.message,isAdmin:t.status.isAdmin,superAdmin:t.status.superAdmin});var e=this.$el.querySelector("#chat");e.scrollTop+e.clientHeight===e.scrollHeight||this.scrollToEnd()},update:function(t){this.sentMessage.push({username:t.username,message:t.message,isAdmin:t.status.isAdmin,superAdmin:t.status.superAdmin});var e=this.$el.querySelector("#chat");e.scrollTop+e.clientHeight===e.scrollHeight||this.scrollToEnd()},updateUsers:function(t){this.$store.dispatch("socket_users",t)},updateLocal:function(t){this.$store.dispatch("socket_users",t.users)},updateRoom:function(t){this.$store.dispatch("socket_room",t)},greeting:function(t){this.sentMessage.push({message:t.message})}},methods:{scrollToEnd:m.a.debounce(function(){var t=this.$el.querySelector("#chat");t.scrollTop=t.scrollHeight},50),send:function(){""!==this.message&&this.$socket.emit("message",{message:this.message,name:this.$route.path})},connect:function(){var t=this;return o()(r.a.mark(function e(){return r.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:t.$store.state.room||t.$socket.emit("join",t.$route.params.community);case 1:case"end":return e.stop()}},e,t)}))()},disconnect:function(){this.$socket.emit("leave",{c:this.$route.params.community})}},watch:{$route:function(){function t(){return e.apply(this,arguments)}var e=o()(r.a.mark(function t(){var e;return r.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,i.a.index(this.$route.path);case 3:e=t.sent,e.data.error&&this.$router.push({name:"Search"}),t.next=10;break;case 7:t.prev=7,t.t0=t.catch(0),console.log("error with request");case 10:case"end":return t.stop()}},t,this,[[0,7]])}));return t}()},beforeMount:function(){var t=this;return o()(r.a.mark(function e(){var n;return r.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,i.a.index(t.$route.path);case 3:n=e.sent,n.data.error?t.$router.push({name:"Search"}):n.data.UserId===t.$store.state.user.id&&(t.owner=!0),e.next=10;break;case 7:e.prev=7,e.t0=e.catch(0),console.log("error with request");case 10:case"end":return e.stop()}},e,t,[[0,7]])}))()},beforeDestroy:function(){this.$socket.emit("leave",{c:this.$store.state.room})}}},E9VF:function(t,e){},"H/Zg":function(t,e,n){"use strict";var s=n("mtWM"),r=n.n(s),a=n("wtEF"),o=n("d2gY"),c=n.n(o);e.a=function(){return r.a.create({baseURL:""+c.a.url,headers:{Authorization:"Bearer "+a.a.state.token}})}},JJT7:function(t,e,n){"use strict";var s=n("Xxa5"),r=n.n(s),a=n("exGp"),o=n.n(a),c=n("CLm6");e.a={data:function(){return{username:"",password:""}},sockets:{updateLocal:function(t){this.$store.dispatch("socket_users",t.users)},updateRoom:function(t){this.$store.dispatch("socket_room",t)}},methods:{register:function(){var t=this;return o()(r.a.mark(function e(){return r.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,c.a.register({username:t.username,password:t.password});case 2:case"end":return e.stop()}},e,t)}))()}}}},Jmt5:function(t,e){},M93x:function(t,e,n){"use strict";function s(t){n("Pxcp")}var r=n("xJD8"),a=n("/Bag"),o=n("VU/8"),c=s,i=o(r.a,a.a,c,null,null);e.a=i.exports},NHnr:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s=n("sCSS"),r=n("Jmt5"),a=(n.n(r),n("9M+g")),o=(n.n(a),n("7+uW")),c=n("M93x"),i=n("YaEn"),u=n("9JMe"),m=(n.n(u),n("wtEF"));n.i(u.sync)(m.a,i.a),o.a.use(s.a),o.a.config.productionTip=!1,new o.a({el:"#app",router:i.a,store:m.a,template:"<App/>",components:{App:c.a}})},Pxcp:function(t,e){},WE32:function(t,e){},WoGI:function(t,e,n){"use strict";e.a={}},YaEn:function(t,e,n){"use strict";var s=n("7+uW"),r=n("/ocq"),a=n("xJsL"),o=n("dIqY"),c=n("5ECI"),i=n("42Hy"),u=n("/KFX"),m=n("AJqI"),l=n("YcJa");s.a.use(r.a),e.a=new r.a({routes:[{path:"/login",name:"Login",component:a.a},{path:"/register",name:"Register",component:o.a},{path:"/community",name:"Community",component:c.a},{path:"/c/:community",name:"Index",component:i.a},{path:"/c/:community/edit",name:"Edit",component:m.a},{path:"/",name:"Search",component:u.a},{path:"/notfound",name:"NotFound",component:l.a}]})},YcJa:function(t,e,n){"use strict";function s(t){n("oVLU")}var r=n("WoGI"),a=n("mcMK"),o=n("VU/8"),c=s,i=o(r.a,a.a,c,null,null);e.a=i.exports},ZW2k:function(t,e,n){"use strict";var s=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("b-row",[n("b-col",{attrs:{sm:"6"}},[n("b-row",[t.success?n("b-col",{attrs:{sm:"5"}},[n("b-alert",{staticClass:"success",attrs:{show:"",variant:"success"}},[t._v("\n          Changes saved!\n        ")])],1):t._e(),t._v(" "),n("b-nav",{staticClass:"ml-auto mr-3",attrs:{tabs:""}},[n("b-nav-item",{staticClass:"notActive",attrs:{to:{name:"Index",params:{community:t.$route.params.community}}}},[t._v("\n          "+t._s(this.$route.params.community)+"\n        ")]),t._v(" "),n("b-nav-item",{attrs:{to:{name:"Edit"}}},[t._v("\n          edit\n        ")])],1)],1),t._v(" "),n("b-card",{attrs:{id:"chat"}},[n("b-col",{attrs:{sm:"6"}},[n("b-form-textarea",{attrs:{placeholder:"Greeting Message",rows:"3"},model:{value:t.greeting,callback:function(e){t.greeting=e},expression:"greeting"}}),t._v(" "),n("b-col",{staticClass:"save",attrs:{sm:"4"}},[n("b-btn",{attrs:{variant:"success"},on:{click:function(e){e.stopPropagation(),t.save(e)}}},[t._v("\n              Save\n            ")])],1)],1)],1)],1)],1)},r=[],a={render:s,staticRenderFns:r};e.a=a},ZXIq:function(t,e,n){"use strict";var s=n("Xxa5"),r=n.n(s),a=n("exGp"),o=n.n(a),c=n("mEEx");e.a={data:function(){return{name:""}},sockets:{updateLocal:function(t){this.$store.dispatch("socket_users",t.users)},updateRoom:function(t){this.$store.dispatch("socket_room",t)}},methods:{create:function(){var t=this;return o()(r.a.mark(function e(){var n;return r.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,c.a.create({name:t.name,user:t.$store.state.user});case 3:n=e.sent,t.$router.push({name:"Index",params:{community:n.data.name}}),t.$socket.emit("join",{user:t.$store.state.user,name:"/c/"+n.data.name}),e.next=11;break;case 8:e.prev=8,e.t0=e.catch(0),console.log(e.t0);case 11:case"end":return e.stop()}},e,t,[[0,8]])}))()}}}},b2oC:function(t,e,n){"use strict";var s=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("b-row",[n("b-col",{staticClass:"m-auto",attrs:{sm:"5"}},[n("b-form-group",[n("b-form-input",{attrs:{placeholder:"Enter Community Name"},model:{value:t.name,callback:function(e){t.name=e},expression:"name"}})],1),t._v(" "),n("b-btn",{attrs:{variant:"primary"},on:{click:t.create}},[t._v("\n        Create\n      ")])],1)],1)},r=[],a={render:s,staticRenderFns:r};e.a=a},d2gY:function(t,e){t.exports={url:"https://project-zero147x.c9users.io:8081"}},dIqY:function(t,e,n){"use strict";function s(t){n("gbbX")}var r=n("JJT7"),a=n("kg/s"),o=n("VU/8"),c=s,i=o(r.a,a.a,c,null,null);e.a=i.exports},dvdC:function(t,e){},gbbX:function(t,e){},"kg/s":function(t,e,n){"use strict";var s=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("b-row",[n("b-col",{staticClass:"m-auto",attrs:{sm:"3"}},[n("b-form",[n("b-form-group",[n("b-form-input",{attrs:{type:"text",placeholder:"username"},model:{value:t.username,callback:function(e){t.username=e},expression:"username"}}),t._v(" "),n("b-form-input",{attrs:{type:"password",placeholder:"password"},model:{value:t.password,callback:function(e){t.password=e},expression:"password"}})],1)],1),t._v(" "),n("b-row",[n("b-col",{attrs:{sm:"12"}},[n("b-btn",{attrs:{variant:"primary"},on:{click:t.register}},[t._v("\n            Register\n          ")])],1)],1)],1)],1)},r=[],a={render:s,staticRenderFns:r};e.a=a},mEEx:function(t,e,n){"use strict";var s=n("H/Zg");e.a={create:function(t){return n.i(s.a)().post("community",t)},index:function(t){return n.i(s.a)().get(""+t,t)},edit:function(t){return n.i(s.a)().post(t.path,{greeting:t.greeting})},editIndex:function(t){return n.i(s.a)().get("/c/"+t.community+"/edit",t)},home:function(){return n.i(s.a)().get("/home")},search:function(t){return n.i(s.a)().get("/",{params:{search:t}})}}},mcMK:function(t,e,n){"use strict";var s=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("b-row",[n("b-col",{staticClass:"m-auto",attrs:{sm:"6"}},[t._v("\n    forbidden!\n  ")])],1)},r=[],a={render:s,staticRenderFns:r};e.a=a},"nKb+":function(t,e,n){"use strict";var s=n("Xxa5"),r=n.n(s),a=n("exGp"),o=n.n(a),c=n("d2gY"),i=n.n(c),u=n("CLm6"),m=n("7+uW"),l=n("hMcO"),p=n.n(l),d=n("wtEF");e.a={data:function(){return{username:"",password:""}},sockets:{updateLocal:function(t){this.$store.dispatch("socket_users",t.users)},updateRoom:function(t){this.$store.dispatch("socket_room",t)}},methods:{login:function(){var t=this;return o()(r.a.mark(function e(){var n;return r.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,u.a.login({username:t.username,password:t.password});case 2:n=e.sent,t.$store.dispatch("setToken",n.data.token),t.$store.dispatch("setUser",n.data.user),m.a.use(p.a,i.a.url+"?auth_token="+t.$store.state.token,d.a),t.$router.push({name:"Search"});case 6:case"end":return e.stop()}},e,t)}))()}}}},oVLU:function(t,e){},rdrv:function(t,e,n){"use strict";var s=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("b-row",[n("b-col",{attrs:{sm:"6"}},[n("b-row",[n("b-nav",{staticClass:"ml-auto mr-3",attrs:{tabs:"",fill:""}},[n("b-nav-item",{attrs:{to:{name:"Index",params:{community:t.$route.params.community}}}},[t._v("\n                "+t._s(this.$route.params.community)+"\n              ")]),t._v(" "),this.owner?n("b-nav-item",{attrs:{to:{name:"Edit"}}},[t._v("\n                edit\n              ")]):t._e()],1)],1),t._v(" "),n("b-card",{staticClass:"text-left",attrs:{id:"chat"}},[n("ul",{staticClass:"pl-2 pb-0"},t._l(t.sentMessage,function(e){return n("li",[n("span",{class:{admin:e.isAdmin,superAdmin:e.superAdmin},domProps:{innerHTML:t._s(e.username)}}),t._v(" -- "),n("span",{domProps:{innerHTML:t._s(e.message)}})])}))]),t._v(" "),n("b-row",[n("b-col",{attrs:{sm:"11 pr-0"}},[n("b-form-input",{attrs:{type:"text",placeholder:"type something"},nativeOn:{keyup:function(e){if(!("button"in e)&&t._k(e.keyCode,"enter",13))return null;t.send(e)}},model:{value:t.message,callback:function(e){t.message=e},expression:"message"}})],1),t._v(" "),n("b-col",{attrs:{sm:"1 pl-0"}},[n("b-btn",{staticClass:"send_btn",attrs:{variant:"success"},on:{click:t.send}},[t._v("\n            SEND\n          ")])],1)],1)],1),t._v(" "),n("b-col",{attrs:{sm:"4",md:"3",lg:"2"}},[n("b-row",[n("b-button",{attrs:{block:"",variant:"primary"},on:{click:t.connect}},[t._v("\n              Connect\n            ")])],1),t._v(" "),n("b-row",[n("b-button",{attrs:{block:"",variant:"primary"},on:{click:t.disconnect}},[t._v("\n              Disconnect\n            ")])],1),t._v(" "),n("b-row",[n("div",{staticClass:"text-xs-left",attrs:{id:"usersList"}},[n("ul",t._l(this.$store.state.users,function(e){return n("li",[e.status.isAdmin?n("span",{class:{admin:e.status.isAdmin},domProps:{innerHTML:t._s(e.username)}}):t._e(),t._v(" "),e.status.superAdmin?n("span",{class:{superAdmin:e.status.superAdmin},domProps:{innerHTML:t._s(e.username)}}):t._e(),t._v(" "),e.status.isAdmin||e.status.superAdmin?t._e():n("span",{domProps:{innerHTML:t._s(e.username)}}),n("b-badge",[t._v("1")])],1)}))])])],1)],1)},r=[],a={render:s,staticRenderFns:r};e.a=a},uuib:function(t,e,n){"use strict";var s=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("b-row",[n("b-col",{staticClass:"m-auto",attrs:{sm:"3"}},[n("b-form",[n("b-form-group",[n("b-form-input",{attrs:{type:"text",placeholder:"username"},model:{value:t.username,callback:function(e){t.username=e},expression:"username"}}),t._v(" "),n("b-form-input",{attrs:{type:"password",placeholder:"password"},model:{value:t.password,callback:function(e){t.password=e},expression:"password"}})],1)],1),t._v(" "),n("b-row",[n("b-col",{attrs:{sm:"12"}},[n("b-btn",{attrs:{variant:"primary"},on:{click:t.login}},[t._v("\n            Login\n          ")])],1)],1)],1)],1)},r=[],a={render:s,staticRenderFns:r};e.a=a},wQ0S:function(t,e,n){"use strict";var s=n("Xxa5"),r=n.n(s),a=n("exGp"),o=n.n(a),c=n("mEEx");e.a={data:function(){return{success:!1,greeting:"",description:""}},sockets:{updateLocal:function(t){this.$store.dispatch("socket_users",t.users)},updateRoom:function(t){this.$store.dispatch("socket_room",t)}},methods:{save:function(){var t=this;return o()(r.a.mark(function e(){var n;return r.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,c.a.edit({greeting:t.greeting,path:t.$route.path});case 2:n=e.sent,n&&(t.success=!0);case 4:case"end":return e.stop()}},e,t)}))()}},beforeMount:function(){var t=this;return o()(r.a.mark(function e(){var n;return r.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,c.a.editIndex(t.$route.params);case 2:n=e.sent,console.log(n),n.data.error&&t.$router.push({name:"NotFound"});case 5:case"end":return e.stop()}},e,t)}))()}}},wtEF:function(t,e,n){"use strict";var s=n("7+uW"),r=n("NYxO");s.a.use(r.a),e.a=new r.a.Store({strict:!0,state:{token:null,user:null,isUserLoggedIn:!1,users:null,room:null},mutations:{setToken:function(t,e){t.token=e,t.isUserLoggedIn=!!e},setUser:function(t,e){t.user=e},SOCKET_USERS:function(t,e){t.users=e},SOCKET_ROOM:function(t,e){t.room=e}},actions:{setToken:function(t,e){(0,t.commit)("setToken",e)},setUser:function(t,e){(0,t.commit)("setUser",e)},socket_users:function(t,e){(0,t.commit)("SOCKET_USERS",e)},socket_room:function(t,e){(0,t.commit)("SOCKET_ROOM",e)}}})},xJD8:function(t,e,n){"use strict";e.a={data:function(){return{search:""}},sockets:{updateRoom:function(t){this.$store.dispatch("socket_room",t.room)},updateLocal:function(t){this.$store.dispatch("socket_users",t.users)}},methods:{Search:function(){var t={name:"Search"};""!==this.search&&(t.query={search:this.search}),this.$router.push(t)}},name:"app"}},xJsL:function(t,e,n){"use strict";function s(t){n("E9VF")}var r=n("nKb+"),a=n("uuib"),o=n("VU/8"),c=s,i=o(r.a,a.a,c,null,null);e.a=i.exports}},["NHnr"]);
//# sourceMappingURL=app.c25d22db6870eae72dc1.js.map