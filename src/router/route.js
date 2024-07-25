import HomePage from '@/views/HomePage.vue';
import ChatPage from '@/views/ChatPage.vue';
import PaymentPage from '@/views/PaymentPage.vue';
import DetailPage from '@/views/DetailPage.vue';
import AuctionForm from '@/views/AuctionForm.vue';

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
        path: '/auctions',
        name: 'Auction',
        component: AuctionForm,
    },
];
