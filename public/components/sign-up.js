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
    beforeCreate: function() {
        setTimeout(() => {
            if(!_.isEmpty(this.$store.state.user.data))
                this.$router.push('/');
        }, 1000);
    },
    created: function() { },
    computed: { },
    methods: {
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
        }
    }

};


export { SignUp }