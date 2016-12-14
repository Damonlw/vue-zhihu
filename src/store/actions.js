
import * as v from './mutation-types.js'

export default {

	async getData({commit}){
		const getNews = new Promise((resolve, reject) => {
			$.ajax({
				url:'api/4/news/latest',
				type:'GET',
				dataType:'JSON',
				success: (data)=>{
					resolve(data)
				}
			})
		})
		commit(v.GET_DATA, await getNews)
	},

	async	getBody({commit}, id){
		const getMessage = new Promise((resolve, reject) => {
			$.ajax({
				url:'api/4/news/'+id,
				type:'GET',
				dataType:'JSON',
				success: (data)=>{
					resolve(data);
				}
			})
		});
		commit(v.GET_BODY, await getMessage)
	},

	async getBeforeData({commit}, date){
		const getNews = new Promise((resolve, reject) => {
			$.ajax({
				url:'api/4/news/before/'+ date,
				type:'GET',
				dataType:'JSON',
				success: (data)=>{
					resolve(data)
				}
			})
		})
		commit(v.GET_BEFORE_DATA, await getNews)
	},

	closeAfter({commit}){
		commit(v.CHANGE_STATUS);
	},
	changeColor({commit}, obj){
		commit(v.CHANGE_COLOR, obj);
	},
	swiperChangeColor({commit}, title){
		commit(v.SWIPER_CHANGE_COLOR, title);
	},
	changeNightModel({commit}){
		commit(v.CHANGE_NIGHT_MODEL)
	}
}
