var FirebaseOrder = { 
    template: '' ,
    data: function() {
        return {
            searchText: '',
            isEdit: false,
            products: [],
            order: { id: '' },
            orders: [],
            sort: 'id',
            isAsc: true,
            currentPage: 1,
            pageSize: 2,
            showDetailList: []
        }
    },
    beforeCreate: function() { },
    created: function() {
        console.log('created'); 
        this.getOrders();
        this.getProducts();
    },
    computed: {
        ordersFilter: function () {
            // 從第幾個開始列 ex:假設一頁列出兩個(第一頁從第0個, 第二頁從第2個)
            // page return
            let startAt = this.pageSize * (this.currentPage - 1);
            let endAt = startAt + this.pageSize;
            return this.searchOrdersByAll(this.searchText).slice(startAt, endAt);
            
            // no page return
            // return this.searchOrdersByAll(this.searchText);
        }, 

    },
    methods:{
        getOrders: function() {
            // 從資料庫拉Order
            db.collection('orders').orderBy('id').get().then((shotsnap) => {
                this.orders = shotsnap.docs.map(doc => doc.data());
            })
        },
        getProducts: function() {
            // 從資料庫拉Product
            db.collection('products').orderBy('id').get().then((shotsnap) => {
                this.products = shotsnap.docs.map(doc => doc.data());
            })
        },
        getOrderProducts: function(productIDs) {
            // 利用ID找出product
            return this.products.filter((p) => {
                return productIDs.includes(p.id)
            });
        },
        getOrderSum: function(productIDs) {
            // 利用ID找出product並算出總合
            let sum = 0;
            for(let i in this.products) {
                if(productIDs.includes(this.products[i].id)){
                    sum = sum + Number(this.products[i].price);
                }
            }
            return sum;
        },
        searchOrdersByAll: function(searchText) {
            // 搜尋任何有出現這段文字的結果
            return this.orders.filter(function(o) {
                for(let x in o) {
                    if(String(o[x]).toLowerCase().includes(searchText.toLowerCase())) return o;
                }
            })
        },
        addProduct: function(product) {
            // 直接從資料庫找最大的ID，+1之後當新資料的ID
            db.collection('products').orderBy('id', 'desc').limit(1).get().then((shotsnap) => {
                shotsnap.forEach((doc) => {
                    product.id = String(Number(doc.data().id) + 1);
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
            return Math.ceil(this.searchOrdersByAll(this.searchText).length / this.pageSize);
        },
        toggleDetail: function(index) {
            Vue.set(this.showDetailList, index, !this.showDetailList[index])
        },
        isShowDetail: function(index) {
            return this.showDetailList[index];
        }
    }

};


export { FirebaseOrder }