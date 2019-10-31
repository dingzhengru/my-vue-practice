var FirebaseProduct = { 
    template: '' ,
    data: function() {
        return {
            searchText: '',
            product: { name: '', price: null }, 
            isEdit: false,
            products: [],
            sort: 'id',
            isAsc: true,
            currentPage: 1,
            pageSize: 3,
        }
    },
    beforeCreate: function() { },
    created: function() {
        console.log('created'); 
        this.getProducts();
        // this.$store.dispatch('fireProduct/getDataAction');
    },
    computed: {
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
            // 直接從資料庫找最大的ID，+1之後當新資料的ID
            db.collection('products').orderBy('id', 'desc').limit(1).get().then((shotsnap) => {
                shotsnap.forEach((doc) => {
                    product.id = String(Number(doc.data().id) + 1);
                    product.price = Number(product.price);
                    this.products.push(_.cloneDeep(product));
                    db.collection('products').add(product);
                })
            })
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
            db.collection('products').orderBy(this.sort).get().then((shotsnap) => {
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
        sortProducts: function(field) {
            this.sort = field;
            this.isAsc = !this.isAsc;
            // 1.利用firebase重新取得排序後的資料
            // if(this.isAsc)
            //     db.collection('products').orderBy(field).get().then((shotsnap) => {
            //         this.products = shotsnap.docs.map(doc => doc.data());
            //     })
            // else
            //     db.collection('products').orderBy(field,'desc').get().then((shotsnap) => {
            //         this.products = shotsnap.docs.map(doc => doc.data());
            //     })

            // 2.直接對this.products排序
            let sort = this.sort;
            let isAsc = this.isAsc;
            this.products =  this.products.sort(function (a, b) {
                if(isAsc)
                    return a[sort] > b[sort] ? 1 : -1;
                else
                    return a[sort] < b[sort] ? 1 : -1;
            });
        },
        totalPage: function() {
            // ceil 無條件進位
            return Math.ceil(this.searchProductsByAll(this.searchText).length / this.pageSize);
        }
    }

};


export { FirebaseProduct }