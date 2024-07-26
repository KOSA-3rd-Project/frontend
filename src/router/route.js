import HomePage from '@/views/HomePage.vue';
import Chat from '@/views/Chat.vue';
import ChatRoom from '@/components/chat/ChatRoom.vue';
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
        component: Chat,
        props: true,
        children: [
            {
                path: ':chatRoomId',
                name: 'ChatRoom',
                component: ChatRoom,
                props: true
            }
        ]
    }
];
