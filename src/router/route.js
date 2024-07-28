import HomePage from '@/views/HomePage.vue';
import ChatPage from '@/views/ChatPage.vue';
import PaymentPage from '@/views/PaymentPage.vue';
import DetailPage from '@/views/DetailPage.vue';
import RegisterAuctionPage from '@/views/RegisterAuctionPage.vue';
import ModifyAuctionPage from '@/views/ModifyAuctionPage.vue';
import SignInPage from '@/views/SignInPage.vue';
import SignUpPage from '@/views/SignUpPage.vue';
import SearchResults from '@/views/SearchResults.vue';

export default [
    {
        path: '/',
        name: 'HomePage',
        component: HomePage,
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
    },
    {

        path: '/chat/:roomId',
        name: 'ChatPage',
        component: ChatPage,
        props: true
    },
    {
        path: '/signin',
        name: 'SignInPage',
        component: SignInPage,
    },
    {
        path: '/signup',
        name: 'SignUpPage',
        component: SignUpPage,
    },
    {
        path: '/search',
        name: 'SearchResults',
        component: SearchResults,
    },
];
