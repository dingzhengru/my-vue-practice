var test = new Vue({
    el: '#test',
    methods: {
        googleLogin: function() {
            firebase.auth().signInWithPopup(providerGoogle).then(function(result) {
                // This gives you a Google Access Token. You can use it to access the Google API.
                var token = result.credential.accessToken;
                // The signed-in user info.
                var user = result.user;
                console.log('token', token);
                console.log('user', user);
                firebase.auth().signOut().then(function() {
                    console.log('signout');
                }).catch(function(error) {
                    console.log('signout error', error)
                });
                // ...
            })
        },
    }
})

// var headerApp = new Vue({
//     el: 'header',
//     router: router,
//     data: {

//     }
// })

// var navApp = new Vue({
//     el: 'nav',
//     router: router,
//     data: {
        
//     }
// })

// var mainApp = new Vue({
//     el: 'main',
//     router: router,
//     data: {
//         products: [
//             {
//                 name: 'product01',
//                 price: 100
//             },
//             {
//                 name: 'product02',
//                 price: 200
//             }
//         ]
//     }
// })


// var footerApp = new Vue({
//     el: 'footer',
//     data: {
        
//     }
// })

