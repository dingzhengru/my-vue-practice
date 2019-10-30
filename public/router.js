import { Product } from './components/product.js'
import { Order } from './components/order.js'
import { FirebaseProduct } from './components/firebase-product.js'
import { FirebaseOrder } from './components/firebase-order.js'
import { User } from './components/user.js'
import { UserHome } from './components/user-home.js'
import { UserProfile } from './components/user-profile.js'
import { SignUp } from './components/sign-up.js'
import { SignIn } from './components/sign-in.js'
import { SignOut } from './components/sign-out.js'

const HomeTemplate = readFile('./public/html/home.html');
const ProductTemplate = readFile('./public/html/product.html');
const OrderTemplate = readFile('./public/html/order.html');
const FirebaseProductTemplate = readFile('./public/html/firebase-product.html');
const FirebaseOrderTemplate = readFile('./public/html/firebase-order.html');
const UserTemplate = readFile('./public/html/user.html');
const UserHomeTemplate = readFile('./public/html/user-home.html');
const UserProfileTemplate = readFile('./public/html/user-profile.html');
const SignUpTemplate = readFile('./public/html/sign-up.html');
const SignInTemplate = readFile('./public/html/sign-in.html');
// set Template
const Home = { template: HomeTemplate };
Product.template = ProductTemplate;
Order.template = OrderTemplate;
FirebaseProduct.template = FirebaseProductTemplate;
FirebaseOrder.template = FirebaseOrderTemplate;
User.template = UserTemplate;
UserHome.template = UserHomeTemplate;
UserProfile.template = UserProfileTemplate;
SignUp.template = SignUpTemplate;
SignIn.template = SignInTemplate;
// 重定向 redirect: '/b', redirect: { name: 'foo' } 也可用 alias: '/b'
const routes = [
    { path: '/', component: Home },
    { path: '/product', component: Product },
    { path: '/order', component: Order },
    { path: '/firebase-product', component: FirebaseProduct },
    { path: '/firebase-order', component: FirebaseOrder },
    { path: '/sign-up', component: SignUp },
    { path: '/sign-in', component: SignIn },
    { path: '/sign-out', component: SignOut },
    { path: '/user/:id', component: User,
        // /user/:id/profile, /user/:id/posts
        children: [
            {
                path: '/',
                name: 'userHome',
                component: UserHome
            },
            {
                path: 'profile',
                component: UserProfile
            },
            // {
            //     path: 'posts',
            //     component: UserPosts
            // }
        ]
    }
];


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
// const app = new Vue({ 
//     router,
//     store
// }).$mount('#app');

export { router }