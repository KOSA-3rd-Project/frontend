import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '@/store';

import route from './route';
import PageNotFound from '@/components/PageNotFound.vue';

Vue.use(VueRouter);

const base_router = [{ path: '*', component: PageNotFound }];

const router = new VueRouter({
    mode: 'history',
    routes: [...route, ...base_router],
});

// 전역 네비게이션 가드 추가
router.beforeEach((to, from, next) => {
    // 라우트가 변경되는 경우
    if (to.name !== from.name) {
        // 검색 파라미터 초기화
        store.dispatch('search/resetSearchState');
    }
    next();
});

export default router;
