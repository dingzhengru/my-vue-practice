var SignOut = { 
    template: '' ,
    data: function() {
        return {}
    },
    beforeCreate: function() {
        this.$store.dispatch('user/signOutAction')
        .then(() => {
            console.log('sign out');
            this.$router.push('/');
        })
        .catch((error) => {
            console.log(error);
        })
    },
    created: function() {

    },
    computed: {
        
    },
    methods:{
        
    }

};


export { SignOut }