<template>
    <ul class="users">

        <v-wait for="LOADING_CONTACTS">
            <template slot="waiting">
                loading
            </template>
            <li v-for="(contact,index) in contacts" :key="index">
                <a href="#">
                    <img src="https://www.pexl.io/themes/swipe/dist/img/avatars/avatar-male-1.jpg" alt="avatar">
                    <div class="content">
                        <h5 class="title">{{contact.fullname}}</h5>
                        <p class="subtitle">{{contact.title}}</p>
                    </div>
                </a>
            </li>
        </v-wait>
        <infinite-loading @infinite="loadMore">
            <template slot="no-more"></template>
            <template slot="no-results">
                ...
            </template>
        </infinite-loading>
    </ul>
</template>
<script>
import { mapGetters } from 'vuex'
import { mapWaitingActions, mapWaitingGetters } from 'vue-wait'
import InfiniteLoading from 'vue-infinite-loading';
export default {
    computed:{
        ...mapGetters({
            contacts:'getContacts'
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
            if (this.hasMore) {
                this.$store.commit('nextPage');
                await this.loadContacts();
                $state.loaded();
            }else{
                $state.complete();
            }
        }
    },
    async created(){
        await this.loadContacts()
    }
}
</script>
