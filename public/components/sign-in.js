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
        console.log(window.sessionStorage.getItem('isLogin'));
        if(window.sessionStorage.getItem('isLogin'))
            this.$router.push('/');
    },
    created: function() {

    },
    computed: {
        
    },
    methods:{
        signIn: function(user) {
            let email = user.email;
            let password = user.password;
            firebase.auth().signInWithEmailAndPassword(email, password)
            .then((result) => {
                this.success = '登入成功'
                console.log('sign in:', result.user.email);
                // 設置延遲回主頁
                setTimeout(() => {
                    window.location.replace(window.location.origin);
                }, 1000);
            })
            .catch((error) => {
                console.log('sign in error:', error.message);
            });
        }
    }

};


export { SignIn }