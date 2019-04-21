import VueRouter from 'vue-router'
export default new VueRouter({
    routes: [
        // dynamic segments start with a colon
        {
            name:'card',
            path: '/card/:id',
            component: require('./components/Card').default,
            beforeEnter: (to, from, next) => {
                next(vm => {
                    vm.$store.dispatch("LOAD_CONTACT",to.params.id);
                });
            }

        }
    ]
});
