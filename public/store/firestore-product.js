const firestoreProduct = {
    namespaced: true,
    state: {
        data: null,
        status: null,
        error: null
    },
    getters: {
        
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
        }
    },
    actions: {
        getDataAction({ commit }, payload) {
            console.log('getDataAction')
            db.collection('products').get().then((shotsnap) => {
                commit('setData', shotsnap.docs.map(doc => doc.data()));
            });
        }
    },
}


export { firestoreProduct }