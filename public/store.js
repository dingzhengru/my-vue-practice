import { firestoreProduct } from './store/firestore-product.js'
import { storeUser } from './store/store-user.js'

const store = new Vuex.Store({
    modules: {
        'product': firestoreProduct,
        'user': storeUser
    }
})


export default store
// export {  store }