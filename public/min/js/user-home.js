"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.UserHome=void 0;var UserHome={template:"",data:function(){return{user:{}}},beforeCreate:function(){},created:function(){console.log("created"),this.getUser(this.$route.params.id)},computed:{},watch:{$route:function(e){console.log("change userid:",e.params.id),this.getUser(this.$route.params.id)}},methods:{getUser:function(e){var t=this;db.collection("users").where("id","==",String(e)).get().then(function(e){e.forEach(function(e){t.user=e.data()})})}}};exports.UserHome=UserHome;