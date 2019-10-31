var SignIn = { 
    template: '' ,
    data: function() {
        return {
            user: {
                email: '',
                password: ''
            },
            error: '',
            message: '',
            success: ''
        }
    },
    beforeCreate: function() {
        // console.log(window.sessionStorage.getItem('isLogin'));
        // if(window.sessionStorage.getItem('isLogin'))
        //     this.$router.push('/');
        setTimeout(() => {
            if(!_.isEmpty(this.$store.state.user.data))
                this.$router.push('/');
        }, 2000);
    },
    created: function() {

    },
    computed: {
        
    },
    methods:{
        signIn: function(user) {
            this.$store.dispatch('user/signInAction', user)
            .then((result) => {
                this.success = '登入成功: ' + result.user.displayName;
            })
            .catch((error) => {
                this.error = error
            })



            // let email = user.email;
            // let password = user.password;
            // firebase.auth().signInWithEmailAndPassword(email, password)
            // .then((result) => {
            //     this.success = '登入成功'
            //     console.log('sign in:', result.user.email);
            //     // 設置延遲回主頁
            //     setTimeout(() => {
            //         window.location.replace(window.location.origin);
            //     }, 1000);
            // })
            // .catch((error) => {
            //     console.log('sign in error:', error.message);
            // });
        }
    }

};


export { SignIn }