
import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations.js'
import actions from './actions.js'

Vue.use(Vuex);

const state = {
	news:[],
	swiperImg:[],
	newsMessage:'',
	isShow:false,
	beforeNews:[],
	lastedDate:'',
	nightModel:false
}

export default new Vuex.Store({
	state,
	mutations,
	actions
});
