<template>
    <div class="profile">
        <header>
            <div class="headline">
                <img src="https://www.pexl.io/themes/swipe/dist/img/avatars/avatar-male-1.jpg" alt="avatar">
                <div class="content">
                    <h5 class="title">{{contact.fullname}}</h5>
                    <p class="subtitle">{{contact.title}}, @{{contact.company}}</p>
                </div>
            </div>
            <ul>
                <li>
                    <b-icon icon="home"></b-icon>
                </li>
            </ul>
        </header>
        <div class="details">
            <p><strong>Mobile:</strong> {{contact.mobile}}</p>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    computed:{
        ...mapGetters({
            contact:'getContact',
        })
    },
    mounted() {
        console.log('Component mounted.')
    },
    beforeRouteEnter (to, from, next) {
        next(vm => {
            vm.$store.dispatch("LOAD_CONTACT",to.params.id);
        });
    },
    beforeRouteEnter (to, from, next) {
        next(vm => {
            vm.$store.dispatch("LOAD_CONTACT",to.params.id);
        });
    }
}
</script>
