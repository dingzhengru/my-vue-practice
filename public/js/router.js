import { Product } from './product.js'
import { Order } from './order.js'
import { ProductFirebase } from './firebase-product.js'

const HomeTemplate = readFile('./public/html/home.html');
const ProductTemplate = readFile('./public/html/product.html');
const OrderTemplate = readFile('./public/html/order.html');
const FirebaseProductTemplate = readFile('./public/html/firebase-product.html');

// set Template
const Home = { template: HomeTemplate };
Product.template = ProductTemplate;
Order.template = OrderTemplate;
ProductFirebase.template = FirebaseProductTemplate;

// 重定向 redirect: '/b', redirect: { name: 'foo' } 也可用 alias: '/b'
const routes = [
    { path: '/', component: Home },
    { path: '/product', component: Product },
    { path: '/order', component: Order },
    { path: '/firebase-product', component: ProductFirebase },
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