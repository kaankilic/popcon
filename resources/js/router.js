import VueRouter from 'vue-router'
import store from './store'
export default new VueRouter({
    routes: [
        // dynamic segments start with a colon
        {
            name:'card',
            path: '/card/:id',
            component: require('./components/Card').default

        }
    ]
});
