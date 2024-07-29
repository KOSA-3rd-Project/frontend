import HomePage from '@/views/HomePage.vue';

import SignInPage from '@/views/SignInPage.vue';
import SignUpPage from '@/views/SignUpPage.vue';
import SearchResults from '@/views/SearchResults.vue';

import RegisterAuctionPage from '@/views/RegisterAuctionPage.vue';
import ModifyAuctionPage from '@/views/ModifyAuctionPage.vue';
import DetailPage from '@/views/DetailPage.vue';
import PaymentPage from '@/views/PaymentPage.vue';
import PaymentStatusPage from '@/views/PaymentStatusPage.vue';


import ChatPage from '@/views/ChatPage.vue';

export default [
    {
        path: '/',
        name: 'HomePage',
        component: HomePage,
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
        path: '/auction/paymentstatus',
        name: 'PaymentStatusPage',
        component: PaymentStatusPage,
    },
    {
        path: '/chat/:chatRoomId',
        name: 'ChatPage',
        component: ChatPage,
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
