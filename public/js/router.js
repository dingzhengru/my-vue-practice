import { Product } from "./product.js"
import { Order } from "./order.js"
 
const HomeTemplate = readFile('./public/html/home.html');
const ProductTemplate = readFile('./public/html/product.html');
const OrderTemplate = readFile('./public/html/order.html');


// set Template
const Home = { template: HomeTemplate };
Product.template = ProductTemplate;
Order.template = OrderTemplate;

// const Product = { 
//     template: ProductTemplate ,
//     data: function() {
//         return {
//             searchText: '',
//             product: { name: '', price: null }, 
//             isEdit: false,
//             products: [
//                 {
//                     id: 0,
//                     name: 'Cookie',
//                     price: 100
//                 },
//                 {
//                     id: 1,
//                     name: 'Tea',
//                     price: 200
//                 },
//                 {
//                     id: 2,
//                     name: 'BaseBall',
//                     price: 500
//                 }
//             ]
//         }
//     },
//     computed: {
//         productsFilter: function () {
//             return this.searchProductsByAll(this.searchText);
//         }
//     },
//     methods:{
//         searchProductsByAll: function(searchText) {
//             return this.products.filter(function(p) {
//                 for(let x in p) {
//                     if(String(p[x]).toLowerCase().includes(searchText.toLowerCase())) return p;
//                 }
//             })
//         },
//         addProduct: function(product) {
//             product.id = this.products.length; 
//             this.products.push(product);
//         },
//         removeProduct: function(product) {
//             this.products.splice(this.products.indexOf(product), 1);
//         },
//         editProduct: function(product) {
//             this.products[this.products.indexOf(product)] = product;
//         }
//     }
// };

// 重定向 redirect: '/b', redirect: { name: 'foo' } 也可用 alias: '/b'
const routes = [
    { path: '/', component: Home },
    { path: '/product', component: Product },
    { path: '/order', component: Order },
    // { path: '/user/:id', component: User,
    //     // /user/:id/profile, /user/:id/posts
    //     children: [
    //         {
    //             path: '/',
    //             name: 'userHome',
    //             component: UserHome
    //         },
    //         {
    //             path: 'profile',
    //             component: UserProfile
    //         },
    //         {
    //             path: 'posts',
    //             component: UserPosts
    //         }
    //     ]
    // }
];

// 要在後端直接換網址可以用 router.push()

// literal string path
// router.push('home')

// object
// router.push({ path: 'home' })

// named route
// router.push({ name: 'user', params: { userId: '123' } })

// with query, resulting in /register?plan=private
// router.push({ path: 'register', query: { plan: 'private' } })

const router = new VueRouter({ routes });
const app = new Vue({ router }).$mount('#app');