<template>
    <ul class="users">
        <li v-for="(contact,$index) in contacts" :key="$index">
            <router-link :to="{name:'card',params:{id:contact.id}}">
                <img src="https://www.pexl.io/themes/swipe/dist/img/avatars/avatar-male-1.jpg" alt="avatar">
                <div class="content">
                    <h5 class="title">{{contact.fullname}}</h5>
                    <p class="subtitle">{{contact.title}}</p>
                </div>
            </router-link>
        </li>
        <infinite-loading @infinite="loadMore"></infinite-loading>
    </ul>
</template>
<script>
import { mapGetters } from 'vuex'
import { mapWaitingActions, mapWaitingGetters } from 'vue-wait'
import InfiniteLoading from 'vue-infinite-loading';
export default {
    computed:{
        ...mapGetters({
            contacts:'getContacts',
            hasMore: 'hasMore'
        }),
        ...mapWaitingGetters({
            getContacts: 'LOADING_CONTACTS',
        })
    },
    components:{
        InfiniteLoading
    },
    mounted() {
        this.$store.dispatch("LOAD_CONTACTS");
        console.log('Component mounted.')
    },
    methods:{
        ...mapWaitingActions( {
            loadContacts: { action: 'LOAD_CONTACTS', loader: 'LOADING_CONTACTS' }
        }),
        async loadMore($state){
            this.$store.commit('nextPage');
            await this.loadContacts();
            $state.loaded();
            if(!this.hasMore){
                $state.completed();
            }
        }
    },
    async created(){
        await this.loadContacts()
    }
}
</script>
