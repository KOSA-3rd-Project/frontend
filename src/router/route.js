import HomePage from '@/views/HomePage.vue';
import ChatPage from '@/views/ChatPage.vue';
import ChatRoom from '@/components/chat/ChatRoom.vue';
import PaymentPage from '@/views/PaymentPage.vue';
import DetailPage from '@/views/DetailPage.vue';
import AuctionForm from '@/views/AuctionForm.vue';
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
        path: '/auctions',
        name: 'Auction',
        component: AuctionForm,
    },
    {
        path: '/chat',
        name: 'Chat',
        component: ChatPage,
        props: true,
        children: [
            {
                path: ':chatRoomId',
                name: 'ChatRoom',
                component: ChatRoom,
                props: true,
            },
        ],
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
