var UserHome = { 
    template: '' ,
    data: function() {
        return {
            user:{}
        }
    },
    beforeCreate: function() { },
    created: function() {
        console.log('created'); 
        this.getUser(this.$route.params.id);
    },
    computed: {
        
    },
    watch: {
        $route: function(route) {
            console.log('change userid:', route.params.id);
            this.getUser(this.$route.params.id);
        }
    },
    methods:{
        getUser: function(userid) {
            db.collection('users').where('id', '==', String(userid)).get().then((snapshot) => {
                snapshot.forEach((user) => {
                    this.user = user.data();
                })
            })
        } 
    }
};


export { UserHome }