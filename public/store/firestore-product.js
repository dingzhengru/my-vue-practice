const firestoreProduct = {
    namespaced: true,
    state: {
        data: null,
        status: null,
        error: null,
        sort: {
            orderByField: 'id',
            isAsc: true
        }
    },
    getters: {
        getProducts: (state) => {
            return state.data;
        }
    },
    mutations: {
        setData(state, payload) {
            console.log('setData', payload);
            state.data = payload;
        },
        setStatus(state, payload) {
            state.status = payload;
        },
        setError(state, payload) {
            state.error = payload
        },
        sortData(state, payload) {
            let field = payload;
            let isAsc = !state.sort.isAsc

            state.sort.orderByField = field;
            state.sort.isAsc = isAsc;

            state.data = state.data.sort(function (a, b) {
                if(isAsc)
                    return a[field] > b[field] ? 1 : -1;
                else
                    return a[field] < b[field] ? 1 : -1;
            });
        }
    },
    actions: {
        getDataAction({ state, commit }, payload) {
            console.log('getDataAction');


            // Order (使用state.sort排序)
            let orderByField = state.sort.orderByField;
            let isAsc = state.sort.isAsc;
            let sort = 'asc'
            if(!isAsc)
                sort = 'desc'

            return new Promise((resolve, reject) => {
                db.collection('products')
                .orderBy(orderByField, sort)
                .get()
                .then((shotsnap) => {
                    let products = shotsnap.docs.map(doc => doc.data());
                    commit('setData', products);
                    resolve(products);
                })
                .catch((error) => {
                    reject(error);
                })
            })
        },
        addDataAction({ dispatch, commit }, payload) {
            console.log('addDataAction');

            let product = payload;

            // 直接從資料庫找最大的ID，+1之後當新資料的ID
            return new Promise((resolve, reject) => {
                db.collection('products').orderBy('id', 'desc').limit(1).get()
                .then((shotsnap) => {
                    shotsnap.forEach((doc) => {
                        product.id = Number(doc.data().id) + 1;
                        product.price = Number(product.price);
                        db.collection('products').add(product);

                        // update data(更新state的資料)
                        dispatch('getDataAction');

                        resolve(product);
                    })
                })
                .catch((error) => {
                    reject(error.message);
                })
            })
        },
        removeDataAction({ dispatch, commit }, payload) {
            console.log('removeDataAction');

            let product = payload;

            return new Promise((resolve, reject) => {
                db.collection('products').where('id', '==', product.id).get()
                .then((shotsnap) => {
                    shotsnap.forEach((doc) => {
                        doc.ref.delete();

                        // update data(更新state的資料)
                        dispatch('getDataAction');

                        resolve(product);
                    })
                })
                .catch((error) => {
                    reject(error.message);
                })
            })
        },
        updateDataAction({ dispatch, commit }, payload) {
            console.log('updateDataAction');
            // 這裡不使用 dispatch('getDataAction') 更新，避免執行太多次

            let product = payload;

            return new Promise((resolve, reject) => {
                db.collection('products')
                .where('id', '==', product.id).get()
                .then((shotsnap) => {
                    shotsnap.forEach((doc) => {
                        doc.ref.update(product);
                        resolve(product);
                    })
                })
                .catch((error) => {
                    reject(error);
                })
            })
        }
    },
}


export { firestoreProduct }