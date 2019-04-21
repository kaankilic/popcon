import axios from 'axios';
import Vue from 'vue';
import Vuex from 'vuex';
const state = {
	contacts:[],
	contact:{},
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
	}
}

const mutations = {
	setContacts(state, contacts){
		state.contacts = contacts;
	},
	setContact(state, contacts){
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
		state.pagination.current_page += 1;
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
	}
}
export default new Vuex.Store({
	state,
	getters,
	mutations,
	actions
})
