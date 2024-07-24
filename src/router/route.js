import HomePage from '@/views/HomePage.vue';
import ChatPage from '@/views/ChatPage.vue';

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
];
