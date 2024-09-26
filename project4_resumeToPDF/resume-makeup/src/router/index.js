import Vue from 'vue'
import VueRouter from 'vue-router'
import personalInfo from '@/components/personalInfo.vue'

Vue.use(VueRouter)

const routes=[
    {
        path:'/',
        redirect:'/personalInfo'
    },
    {
        path:'/personalInfo',
        component:personalInfo
    }
]

const router =new VueRouter(
    {   
        mode: 'hash',
        routes
    }
)
export default router