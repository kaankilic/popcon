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
                    <button @click="isCardModalActive=true">
                        <b-icon icon="wrench"></b-icon>
                    </button>
                </li>
                <li>
                    <button @click="deleteCard">
                        <b-icon icon="delete"></b-icon>
                    </button>
                </li>
            </ul>
        </header>
        <div class="details">
            <p>
                <strong>Mobile:</strong>
                <div class="field">
                    {{contact.mobile}}
                </div>
            </p>
        </div>
        <b-modal :active.sync="isCardModalActive"  has-modal-card>
            <form @submit.prevent="cardUpdate">
                <div class="modal-card">
                    <section class="modal-card-body">
                        <div class="columns is-multiline">
                            <div class="column is-half">
                                <b-field label="Name">
                                    <b-input type="title" v-model="contact.name" required></b-input>
                                </b-field>
                            </div>
                            <div class="column is-half">
                                <b-field label="Surname">
                                    <b-input type="title" v-model="contact.surname" required></b-input>
                                </b-field>
                            </div>
                            <div class="column is-half">
                                <b-field label="Organisation">
                                    <b-input type="title" v-model="contact.company" placeholder="Company Name"></b-input>
                                </b-field>
                            </div>
                            <div class="column is-half">
                                <b-field label="Title">
                                    <b-input type="title" v-model="contact.title" placeholder="Tite"></b-input>
                                </b-field>
                            </div>
                            <div class="column is-full">
                                <b-field label="Mobile">
                                    <b-input type="mobile" v-model="contact.mobile" placeholder="Mobile No" required></b-input>
                                </b-field>
                            </div>
                            <div class="column is-full">
                                <button type="submit" class="button is-success">Save</button>
                            </div>
                        </div>
                    </section>
                </div>
            </form>
        </b-modal>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import LabelEdit from 'label-edit'
export default {
    data(){
        return {
            isCardModalActive: false
        }
    },
    computed: mapState({
        contact: state => state.contact
    }),
    components:{
        LabelEdit
    },
    mounted() {
        console.log('Component mounted.')
    },
    created () {
        this.fetchData()
    },
    watch: {
        '$route': 'fetchData'
    },
    methods:{
        fetchData(){
            this.$store.dispatch("LOAD_CONTACT",this.$route.params.id);
        },
        cardUpdate(){
            this.$store.dispatch("UPDATE_CONTACT",this.contact).then(
                () => {
                    this.isCardModalActive = false;
                    this.$toast.open('Card saved');
                }
            );
        },
        deleteCard(){
            this.$dialog.confirm({
                message: 'Continue on this task?',
                onConfirm: () => {
                    this.$store.dispatch("DELETE_CONTACT",this.contact);
                    this.$toast.open('User confirmed')
                }
            })
        }
    }
}
</script>
