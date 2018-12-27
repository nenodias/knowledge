import VueRouter from 'vue-router';
import Vue from 'vue';

import Home from '@/components/home/Home';
import AdminPages from '@/components/admin/AdminPages';

Vue.use(VueRouter);

const routes = [
    { name:'home', path: '/', component: Home },
    { name:'adminPages', path: '/admin', component: AdminPages }
];

const router = new VueRouter({
    mode: 'history',
    routes 
});

export default router;