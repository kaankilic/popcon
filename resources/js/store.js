import axios from 'axios';
import Vue from 'vue';
import Vuex from 'vuex';
const state = {
	contacts:[],
	contact:{
		fullname:null,
		name:null,
		surname:null,
		mobile:null,
		company:null,
		title:null
	},
	pagination: {
		total: 10,
		count: 10,
		per_page: 15,
		current_page: 1,
		total_pages: 1,
		links: []
	},
	query:{
		keyword: null
	}
}

const getters = {
	getContacts: state => {
		return state.contacts
	},
	getContact: state => {
		return state.contact
	},
	getQuery: state => {
		return state.query
	},
	hasMore: state => {
		return state.pagination.current_page<state.pagination.total_pages
	},
}

const mutations = {
	setContacts(state, contacts){
		state.contacts = contacts;
	},
	setContact(state, contact){
		state.contact = contact;
	},
	mergeContacts(state, contacts){
		state.contacts = state.contacts.concat(contacts);
	},
	setPagination(state, pagination){
		state.pagination = pagination;
	},
	setQuery(state, query){
		state.pagination.current_page = 1;
		Object.assign(state.query, query);
	},
	nextPage(){
		state.pagination.current_page++;
	}
}

const actions = {
	SET_CONTACTS(context, data) {
		context.commit('setContacts', data)
	},
	SET_CONTACT(context, data) {
		context.commit('setContact', data)
	},
	async LOAD_CONTACTS(context, data){
		var response = await axios.get("/api/contacts",{
			params: {
				keyword: context.state.query.keyword,
				page: context.state.pagination.current_page
			}
		});
		if(typeof data=="undefined"){
			context.commit("mergeContacts",response.data.objects);
		}else{
			context.commit("setContacts",response.data.objects);
		}
		context.commit("setPagination",response.data.meta.pagination);
	},
	async LOAD_CONTACT(context, data){
		var response = await axios.get("/api/contacts/view/"+data);
		context.commit("setContact",response.data);
	},
	UPDATE_CONTACT(context, data){
		axios.post("/api/contacts/update/"+data.id,data).then((response)=>{
			context.commit("setContact",response.data);
		});
	},
	DELETE_CONTACT(context, data){
		axios.get("/api/contacts/delete/"+data.id);
	}
}
export default new Vuex.Store({
	state,
	getters,
	mutations,
	actions
})
