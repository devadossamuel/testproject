const routes=[
    {path:'/molecule',component:molecule},
    {path:'/activity',component:activity}
]

const router=new VueRouter({
    routes
})

const app = new Vue({
    router
}).$mount('#app')