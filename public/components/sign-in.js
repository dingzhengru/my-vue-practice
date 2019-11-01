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
        setTimeout(() => {
            if(!_.isEmpty(this.$store.state.user.data))
                this.$router.push('/');
        }, 1000);
    },
    created: function() {},
    computed: {},
    methods: {
        signIn: function(user) {
            this.$store.dispatch('user/signInAction', user)
            .then((result) => {
                this.success = '登入成功: ' + result.user.displayName;
            })
            .catch((error) => {
                this.error = error
            })
        }
    }

};


export { SignIn }