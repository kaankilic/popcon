import VueRouter from 'vue-router'
export default new VueRouter({
    routes: [
        // dynamic segments start with a colon
        {
            name:'about',
            path: '/',
            component: require('./components/ExampleComponent').default
        }
    ]
});
