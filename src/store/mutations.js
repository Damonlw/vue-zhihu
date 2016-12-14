import * as v from './mutation-types.js'
import '../../static/js/common.js'


export default{

	[v.GET_DATA] (state, data) {
		for (let list of data.stories) {
			const imgIndex = replaceImg(list.images[0]);
			const listItem = { 'img':imgIndex,'title':list.title, 'id':list.id, 'isChange': false };
			state.news.push(listItem);
		}
		for (let swiper of data.top_stories) {
			const swiperIndex = replaceImg(swiper.image);
			const swiperItem = { 'img':swiperIndex, 'title':swiper.title, 'id': swiper.id };
			state.swiperImg.push(swiperItem);
		}

		const swiperIndex = replaceImg(data.top_stories[0].image);
		const swiperItem = { 'img':swiperIndex, 'title':data.top_stories[0].title, 'id': data.top_stories[0].id };
		state.swiperImg.push(swiperItem);
		state.lastedDate = regForTime(data.date);
	},
	[v.GET_BODY] (state, data) {
		const image = replaceImg(data.image);
		const body = replaceImgTwo(data.body);
		state.newsMessage = { 'body': body, 'title': data.title, 'image': image }
	},
	[v.CHANGE_STATUS] (state) {
		state.isShow = true
	},
	[v.CHANGE_COLOR] (state, obj) {
		for (let item of state.news) {
			if(item == obj){
				item.isChange = true
			}
		}
		for (let item of state.beforeNews) {
			for (let temp of item.stories) {
				if(temp == obj){
					temp.isChange = true
				}
			}
		}
	},
	[v.SWIPER_CHANGE_COLOR] (state, title) {
		for (let item of state.news) {
			if(item.title == title){
				item.isChange = true
			}
		}
	},
	[v.GET_BEFORE_DATA] (state, data) {
		const listItems = data.stories.map((list) =>{
			const getImg = replaceImg(list.images[0]);
			return { 'images': getImg, 'title': list.title, 'id': list.id, 'isChange': false }
		})
		let stories = [...listItems];
		const finalDateResult = regForDate(data.date);
		state.beforeNews.push({'date': finalDateResult, 'stories': stories});
	},
	[v.CHANGE_NIGHT_MODEL] (state) {
		state.nightModel = !state.nightModel
	}
}


function replaceImg(str) {
 	return str.replace(/(https?:\/\/)?(.*)\.zhimg\.com/, '/$2/zhimg')
}

function replaceImgTwo(str) {
 	return str.replace(/(https?:\/\/)(.*?)\.zhimg\.com/g, '/$2/zhimg')
}

function regForDate(str) {
	const date = new Date(str.replace(/(\d{4})(\d{2})(\d{2})/, '$1-$2-$3'));
		let week = new Map([
			[ 0, '星期日' ],
			[ 6, '星期六' ],
			[ 5, '星期五' ],
			[ 4, '星期四' ],
			[ 3, '星期三' ],
			[ 2, '星期二' ],
			[ 1, '星期一' ]
		]);
		let day = date.getDay();
		for (let [key, value] of week.entries()){
			if(key === day){
				day = value
			}
		}
		return (date.getMonth() + 1) + '月' + date.getDate() + '日' + ' '+day;
}
function regForTime(str) {
	const date = new Date(str.replace(/(\d{4})(\d{2})(\d{2})/, '$1-$2-$3'));
	return date.getTime()+86400000
}
