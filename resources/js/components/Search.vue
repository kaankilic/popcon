<template>
    <b-field>
        <b-input placeholder="Search..." v-model="query" type="search" icon="magnify">
        </b-input>
    </b-field>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    computed:{
        query:{
            get(){
                return this.$store.getters.getQuery.keyword;
            },
            set(val){
                return this.$store.commit("setQuery",{keyword:val});
            }
        }
    },
    mounted(){
        this.$store.subscribe((mutation, state) => {
            if(mutation.type=="setQuery"){
                this.loadContacts();
            }
        });
    },
    methods:{
        async loadContacts(){
            await this.$store.dispatch("LOAD_CONTACTS",{reset:true});
        }
    }
}
</script>
