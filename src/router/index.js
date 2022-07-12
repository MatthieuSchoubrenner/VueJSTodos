import Vue from 'vue'

import VueRouter from 'vue-router'
import TodoPage from "@/pages/TodosPage";

Vue.use(VueRouter)

const routes = [
    {
        name: 'home',
        path: '/',
        component: TodoPage
    },
    {
        name: 'todo',
        path: '/Todo/:id',
        component: () => import ('../pages/TodoEditPage.vue')
    }
]

const router = new VueRouter({
    mode: 'history',
    routes
})

export default router;