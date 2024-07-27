import HomePage from '@/views/HomePage.vue';
import ChatPage from '@/views/ChatPage.vue';
import PaymentPage from '@/views/PaymentPage.vue';
import DetailPage from '@/views/DetailPage.vue';
import RegisterAuctionPage from '@/views/RegisterAuctionPage.vue';
import ModifyAuctionPage from '@/views/ModifyAuctionPage.vue';

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
        path: '/auction/detail',
        name: 'DetailPage',
        component: DetailPage,
    },
    {
        path: '/auction/payment',
        name: 'PaymentPage',
        component: PaymentPage,
    },
    {
        path: '/auction',
        name: 'RegisterAuctionPage',
        component: RegisterAuctionPage,
    },
    {
        path: '/auction/:id/modify',
        name: 'ModifyAuctionPage',
        component: ModifyAuctionPage,
    }
];
