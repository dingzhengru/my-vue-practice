import { Product } from './product.js'
import { Order } from './order.js'
import { FirebaseProduct } from './firebase-product.js'
import { FirebaseOrder } from './firebase-order.js'
import { User } from './user.js'
import { UserHome } from './user-home.js'
import { UserProfile } from './user-profile.js'
import { SignUp } from './sign-up.js'
import { SignIn } from './sign-in.js'
import { SignOut } from './sign-out.js'

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