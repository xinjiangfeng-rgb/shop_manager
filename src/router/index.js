import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

const routes = [{

        path: '/',
        redirect: '/login'
    },

    {
        path: '/login',
        component: () =>
            import ('../views/login/LoginView.vue')

    },
    {
        path: '/home',
        component: () =>
            import ('../views/home/Home.vue')
    }

]

const router = new VueRouter({
    routes
})

//利用路由导航守卫，判断token，从而决定是否才需要重新登录


router.beforeEach((to, from, next) => {

    if (to.path === '/login') return next()
    const token = window.sessionStorage.getItem('token');

    if (!token) return next('/login')
    next();

})




export default router