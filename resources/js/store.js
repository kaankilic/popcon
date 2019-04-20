import axios from 'axios';
import Vue from 'vue';
import Vuex from 'vuex';
const state = {
	contacts:[],
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
	}
}

const mutations = {
	setPosts(state, posts){
		state.posts = posts;
	},
	mergePosts(state, posts){
		state.posts = state.posts.concat(posts);
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
	async LOAD_CONTACTS(context, data){
		var response = await axios.get("/api/contacts",{
			params: {
				keyword: context.state.query.keyword,
				locations: context.state.query.locations,
				categories: context.state.query.categories,
				page: context.state.pagination.current_page
			}
		});
		context.commit("mergePosts",response.data.objects);
		context.commit("setPagination",response.data.meta.pagination);
	}
}
export default new Vuex.Store({
	state,
	getters,
	mutations,
	actions
})
