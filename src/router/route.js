import HomePage from '@/views/HomePage.vue';
import ChatPage from '@/views/ChatPage.vue';
import PaymentPage from '@/views/PaymentPage.vue';

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
        path: '/payment',
        name: 'PaymentPage',
        component: PaymentPage,
    },
];
