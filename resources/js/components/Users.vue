<template>
    <ul class="users">
        <li v-for="contact in contacts">
            <a href="#">
                <img src="https://www.pexl.io/themes/swipe/dist/img/avatars/avatar-male-1.jpg" alt="avatar">
                <div class="content">
                    <h5 class="title">{{contact.fullname}}</h5>
                    <p class="subtitle">{{contact.mobile}}</p>
                </div>
            </a>
        </li>
    </ul>
</template>

<script>
export default {
    computed:{
        contacts(){
            return this.$store.getters.getContacts;
        }
    },
    mounted() {
        this.$store.dispatch("LOAD_CONTACTS");
        console.log('Component mounted.')
    }
}
</script>
