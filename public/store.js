const store = new Vuex.Store({
    state: {
        count: 0, 
        todos: [
            { id: 1, text: 'todos1', done: true },
            { id: 2, text: 'todos2', done: false },
            { id: 3, text: 'todos3', done: true }
        ],
        msg: 'defaultMsg'
    },
    getters: {
        
    },
    mutations: {
        
    },
    actions: {
        
    },
    plugins:[]
})


export { store }