//import lodashClonedeep from 'lodash/cloneDeep';

/* module.js */
const state = {
	lists: [
	{
		meta: {
			id: 0,
			name: 'bucket list'
		},
		items: []
	},
	{
		meta: {
			id: 1,
			name: 'to do'
		},
		items: []
	},
	{
		meta: {
			id: 2,
			name: 'in progress'
		},
		items: []
	},
	{
		meta: {
			id: 3,
			name: 'in review'
		},
		items: []
	},
	{
		meta: {
			id: 4,
			name: 'done'
		},
		items: []
	}
	]
}

const getters = {
	getListById: (state) => (id) => {
		return state.lists.find(list => list.meta.id === id)
	},
	getItemById: (state) => (listId, id) => {
		const list = state.lists.find(list => list.meta.id === listId)
		//let list = state.lists[listId]
		return list.items.find(item => item.id === id)
	}
}

const mutations = {
	MUTATE_LIST(state, list) {
		state.lists = list;
		//console.log(`updateList triggered for ${payload.id}`);
		//console.log(state.selected)
	},
	// updateList(state, payload) {
	// 	let list = state.lists.find(list => list.meta.id === payload.meta.id);
	// 	this.list = Object.assign({},list,payload)
	// 	//console.log(`updateList triggered for ${payload.id}`);
	// 	//console.log(state.selected)
	// },
	MUTATE_ITEM(state, obj) {
		let index = state.lists[obj.list.id].items.findIndex(x => x.id === obj.id);

		state.lists[obj.list.id].items[index] = Object.assign({},obj)

		console.log(obj)

		console.log(state.lists[obj.list.id].items[index])
	}
}

const actions = {
	updateList: (context, list) => {
		context.commit('MUTATE_LIST', list);
	},
	updateItem: (context, obj) => {
		context.commit('MUTATE_ITEM', obj);
	},
	exportList({state, rootState}) {
		let blob = new Blob([JSON.stringify(state.lists)], {'type':'application/json'});

		let link = document.createElement('a')
		link.href = window.URL.createObjectURL(blob)
		link.download = `${rootState.board.board.name}.json`
		link.click()
	}
}

export default {
	state,
	getters,
	mutations,
	actions
}
