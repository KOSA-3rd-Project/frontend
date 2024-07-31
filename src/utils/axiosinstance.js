import axios from 'axios';
import store from '@/store';
import router from '@/router';

const axiosInstance = axios.create();

axiosInstance.interceptors.request.use(
    function (config) {
        const accessToken = localStorage.getItem('accessToken');

        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }

        return config;
    },
    function (error) {
        return Promise.reject(error);
    },
);

axiosInstance.interceptors.response.use(
    function (response) {
        return response;
    },

    function (error) {
        const originalRequest = error.config;

        if (error.response.status === 401) {
            return axiosInstance
                .post('/members/checks/refresh-token', {
                    withCredentials: true,
                })
                .then((result) => {
                    store.dispatch('member/login', { access_token: result.data });

                    return axiosInstance(originalRequest);
                })
                .catch(() => {
                    store.dispatch('member/logout');
                    if (router.currentRoute.path !== '/signin') {
                        router.push('/signin');
                    }
                });
        }
        return Promise.reject(error);
    },
);

export default axiosInstance;
