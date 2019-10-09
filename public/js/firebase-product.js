var ProductFirebase = { 
    template: '' ,
    data: function() {
        return {
            searchText: '',
            product: { name: '', price: null }, 
            isEdit: false,
            products: [],
            sort: 'id',
        }
    },
    beforeCreate: function() { },
    created: function() {
       console.log('created'); 
       this.getProducts();
    },
    computed: {
        productsFilter: function () {
            return this.searchProductsByAll(this.searchText);
        }
    },
    methods:{
        getProducts: function() {
            db.collection('products').orderBy('id').get().then((shotsnap) => {
                this.products = shotsnap.docs.map(doc => doc.data());
            })
        },
        searchProductsByAll: function(searchText) {
            return this.products.filter(function(p) {
                for(let x in p) {
                    if(String(p[x]).toLowerCase().includes(searchText.toLowerCase())) return p;
                }
            })
        },
        addProduct: function(product) {
            product.id = String(this.products.length);
            this.products.push(_.cloneDeep(product));
            db.collection('products').add(product);
            // this.getProducts();
        },
        removeProduct: function(product) {
            // 用where跟product.id來篩選
            this.products.splice(this.products.indexOf(product), 1);
            db.collection('products').where('id', '==', product.id).get().then((shotsnap) => {
                shotsnap.forEach((doc) => {
                    doc.ref.delete();
                })
            })
        },
        editProducts: function(products) {
            // 1. 直接清光再全部set進去(自動ID會改變)
            // initCollection(db, 'products', this.products);

            // 2. 一個一個set(不會改動到原本的自動ID)
            let batch = db.batch();
            let index = 0;
            db.collection('products').orderBy('id').get().then((shotsnap) => {
                shotsnap.forEach((doc) => {
                    // console.log(doc.data().id, this.products[index].id)
                    batch.set(doc.ref, this.products[index]);
                    index++;
                })
                batch.commit()
                .then(() => console.log('batch commit success(editProducts)'))
                .catch(err => console.log('error', err));
            })
        }, 
    }

};


export { ProductFirebase }