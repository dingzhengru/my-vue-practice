var SignOut = { 
    template: '' ,
    data: function() {
        return {}
    },
    beforeCreate: function() {
        firebase.auth().signOut().then(function() {
            console.log('sign out');
            window.location.replace(window.location.origin);
        }).catch(function(error) {
            console.log('sign out error:', error.message);
        });
    },
    created: function() {

    },
    computed: {
        
    },
    methods:{
        
    }

};


export { SignOut }