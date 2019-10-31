var Product = { 
    template: '' ,
    data: function() {
        return {
            searchText: '',
            product: { name: '', price: null }, 
            isEdit: false,
            products: [
                {
                    id: 0,
                    name: 'Cookie',
                    price: 300
                },
                {
                    id: 1,
                    name: 'Tea',
                    price: 200
                },
                {
                    id: 2,
                    name: 'BaseBall',
                    price: 500
                }
            ]
        }
    },
    created: function() {
        
    },
    computed: {
        productsFilter: function () {
            return this.searchProductsByAll(this.searchText);
        }
    },
    methods:{
        searchProductsByAll: function(searchText) {
            return this.products.filter(function(p) {
                for(let x in p) {
                    if(String(p[x]).toLowerCase().includes(searchText.toLowerCase())) return p;
                }
            })
        },
        addProduct: function(product) {
            product.id = this.products.length; 
            this.products.push(_.cloneDeep(product));
        },
        removeProduct: function(product) {
            this.products.splice(this.products.indexOf(product), 1);
        },
        editProduct: function(product) {
            this.products[this.products.indexOf(product)] = product;
        }
    }

};


export { Product }