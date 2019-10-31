import { firestoreProduct } from './store/firestore-product.js'
import { storeUser } from './store/store-user.js'

const store = new Vuex.Store({
    modules: {
        'fireProduct': firestoreProduct,
        'user': storeUser
    }
})
export { store }