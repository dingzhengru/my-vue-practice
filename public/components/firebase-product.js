var FirebaseProduct = { 
    template: '' ,
    data: function() {
        return {
            search: {
                text: '',
                field: ''
            },
            pagination :{
                currentPage: 1,
                pageSize: 4
            },
            isEdit: false,
            currentPage: 1,
            pageSize: 4,
            product: { name: '', price: null }, 
            // searchText: '',
            // products: [],
            // sort: 'id',
            // isAsc: true,
        }
    },
    beforeCreate: function() { 
        // get data
        this.$store.dispatch('product/getDataAction')
        .then((data) => {  })
        .catch((error) => console.log('getData error:', error));
    },
    created: function() {},
    computed: {
        products: function() {
            return this.$store.state.product.data;
        },
        productsFilter: function () {
            // 從第幾個開始列 ex:假設一頁列出兩個(第一頁從第0個, 第二頁從第2個)
            // page return
            // 如果是空的 就重新放置一次pagination
            if(_.isEmpty(this.getFilterData())){
                this.$store.commit('product/setPage', this.pagination);
                return;
            }
            else
                return this.getFilterData();
            // no page return
            // return this.searchProductsByAll(this.searchText);
        }
    },
    methods:{
        searchProductsByAll: function() {
            return this.$store.getters['product/getSearchData'];
        },
        getFilterData: function() {
            return this.$store.getters['product/getFilterData'];
        },
        sortProducts: function(field) {
            // set new sort(change asc <=> desc)
            let sort = this.$store.state.product.sort;
            sort.orderByField = field;
            sort.isAsc = !sort.isAsc;
            this.$store.commit('product/setSort', sort);
        },
        addProduct: function(product) {
            this.$store.dispatch('product/addDataAction', product)
            .then((data) => {  })
            .catch((error) => console.log('addProduct error:', error))
        },
        removeProduct: function(product) {
            this.$store.dispatch('product/removeDataAction', product)
            .then((data) => {  })
            .catch((error) => console.log('removeProduct error:', error))
        },
        saveProducts: function(products) {
            // update all Data
            for(let i in products) {
                this.updateProduct(products[i]);
            }
            // update Data
            this.$store.dispatch('product/getDataAction');
        },
        updateProduct: function(product) {
            this.$store.dispatch('product/updateDataAction', product)
            .then((data) => {  })
            .catch((error) => console.log('updateProduct error:', error))
        },
        totalPage: function() {
            // ceil 無條件進位
            return Math.ceil(this.searchProductsByAll(this.searchText).length / this.pagination.pageSize);
        }
    },
    watch: {
        'search.text': function(value, oldValue) {
            this.$store.commit('product/setSearch', this.search);
        }, 
        'search.field': function(value, oldValue) {
            this.$store.commit('product/setSearch', this.search);
        },
        'pagination.currentPage': function(value, oldValue) {
            this.$store.commit('product/setPage', this.pagination);
        },
        'pagination.pageSize': function(value, oldValue) {
            this.$store.commit('product/setPage', this.pagination);
        },
    }
};


export { FirebaseProduct }