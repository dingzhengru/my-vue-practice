import { router } from './router.js'
import { store } from './store.js'



const app = new Vue({ 
    router,
    store,
    created: function() {
        // set firebase.auth().onAuthStateChanged 當auth有改變時，就改變user狀態
        this.$store.dispatch('user/setAuthStateChanged')
        .then((user) => {
            console.log('user:', user);
        }).catch((error) => {
            console.log(error)
        })
    },
}).$mount('#app');