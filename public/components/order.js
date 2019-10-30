var Order = {
    template: '' ,
    data: function() {
        return {
            searchText: '',
            order: { user: { id: null }, products: [] }, 
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
            ],
            orders: [
                {
                    id: 0,
                    user: {
                        id: 0
                    },
                    products: [
                        {
                            id: 0,
                            name: 'Cookie',
                            price: 300
                        },
                        {
                            id: 2,
                            name: 'BaseBall',
                            price: 500
                        }
                    ],
                },
                {
                    id: 1,
                    user: {
                        id: 0
                    },
                    products: [
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
                    ],
                }
            ]
        }
    },
    computed: {
        ordersFilter: function () {
            return this.searchordersByAll(this.searchText);
        }
    },
    methods:{
        searchordersByAll: function(searchText) {
            return this.orders.filter(function(p) {
                for(let x in p) {
                    if(String(p[x]).toLowerCase().includes(searchText.toLowerCase())) return p;
                }
            })
        },
        addOrder: function(order) {
            order.id = this.orders.length;
            this.orders.push(_.cloneDeep(order));
        },
        removeOrder: function(order) {
            this.orders.splice(this.orders.indexOf(order), 1);
        },
        // editorder: function(order) {
        //     this.orders[this.orders.indexOf(order)] = order;
        // }
        changeProduct: function(products, checked, index) {
            if(checked) {
                products.push(products[index]);
            } else {
                products.splice(index, 1);
            }
        }
    }
}


export { Order }