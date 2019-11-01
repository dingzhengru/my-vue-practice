var FirebaseProduct = { 
    template: '' ,
    data: function() {
        return {
            searchText: '',
            isEdit: false,
            currentPage: 1,
            pageSize: 3,
            product: { name: '', price: null }, 
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
            let startAt = this.pageSize * (this.currentPage - 1);
            let endAt = startAt + this.pageSize;
            return this.searchProductsByAll(this.searchText).slice(startAt, endAt);
            
            // no page return
            // return this.searchProductsByAll(this.searchText);
        }
    },
    methods:{
        searchProductsByAll: function(searchText) {
            let products = this.$store.state.product.data || [];
            return products.filter(function(p) {
                for(let x in p) {
                    if(String(p[x]).toLowerCase().includes(searchText.toLowerCase())) return p;
                }
            })
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
        editProducts: function(products) {
            // update all Data
            for(let i in products) {
                this.updateProduct(products[i]);
            }
            // update Data
            this.$store.dispatch('getDataAction');
        },
        updateProduct: function(product) {
            this.$store.dispatch('product/updateDataAction', product)
            .then((data) => {  })
            .catch((error) => console.log('updateProduct error:', error))
        },
        sortProducts: function(field) {
            this.$store.commit('product/sortData', field);
        },
        totalPage: function() {
            // ceil 無條件進位
            return Math.ceil(this.searchProductsByAll(this.searchText).length / this.pageSize);
        }
    }

};


export { FirebaseProduct }