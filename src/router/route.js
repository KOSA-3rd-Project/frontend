import HomePage from '@/views/HomePage.vue';
import ChatPage from '@/views/ChatPage.vue';
import ProductPaymentPage from '@/views/ProductPaymentPage.vue';
import ProductDetailPage from '@/views/ProductDetailPage.vue';

export default [
    {
        path: '/',
        name: 'HomePage',
        component: HomePage,
    },
    {
        path: '/chat',
        name: 'ChatPage',
        component: ChatPage,
    },
    {
        path: '/product/detail',
        name: 'ProductDetailPage',
        component: ProductDetailPage,
    },
    {
        path: '/product/payment',
        name: 'ProductPaymentPage',
        component: ProductPaymentPage,
    },
];
