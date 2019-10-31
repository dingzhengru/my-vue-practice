var SignUp = { 
    template: '' ,
    data: function() {
        return {
            user: {
                username: '', 
                email: '',
                password: ''
            },
            error: '',
            message: '',
            success: ''
        }
    },
    beforeCreate: function() { },
    created: function() { },
    computed: { },
    methods:{
        signUp: function(user) {
            this.$store.dispatch('user/signUpAction', user)
            .then((result) => {
                console.log('signUp:', result.user.email);
                this.success = '註冊成功'

                // Sign in
                this.$store.dispatch('user/signInAction', user)
                .then((result) => {

                    console.log('登入成功:', result.user.email);

                    // send Email
                    this.$store.dispatch('user/sendEmailVerification', result.user)
                    .then(() => {
                        console.log('send email:', result.user.email);
                        this.message = '已發送驗證信件，請至信箱驗證'
                    })
                    .catch((error) => {
                        console.log(error);
                    })
                })
            })
            .catch((error) => {
                this.error = error;
            })



            // Create User & Sign in
            // user底下的變數與方法:https://firebase.google.com/docs/reference/js/firebase.User
            // let username = user.username;
            // let email = user.email;
            // let password = user.password;
            // firebase.auth().createUserWithEmailAndPassword(email, password)
            // .then((result) => {

            //     this.success = '註冊完成，並寄送驗證於您的信箱，即將登入回主頁'
            //     // update displayName
            //     result.user.updateProfile({
            //         displayName: username
            //     })
            //     // console.log('uid:', result.user.uid);
            //     // console.log('displayName:', result.user.displayName);
            //     // console.log('email:', result.user.email);
            //     // console.log('emailVerified:', result.user.emailVerified);
            //     // console.log('isAnonymous:', result.user.isAnonymous);

                

            //     firebase.auth().signInWithEmailAndPassword(email, password)
            //     .then((result) => {
            //         console.log('sign in:', result.user.email);

            //         // 送驗證信件
            //         firebase.auth().currentUser.sendEmailVerification(actionCodeSettings).then(function() {
            //             console.log('send email');
            //         }).catch(function(error) {
            //             console.log('email error:', error.message);
            //         });

            //         // 設置延遲回主頁
            //         setTimeout(() => {
            //             window.location.replace(window.location.origin);
            //         }, 5000);
            //     })
            //     .catch((error) =>  {
            //         console.log('Sign in error:', error.message);
            //     });
            // })
            // .catch((error) =>  {
            //     console.log('createUser error:', error.message);
            // });
        }
    }

};


export { SignUp }