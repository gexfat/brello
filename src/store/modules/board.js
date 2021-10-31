/* module.js */
const state = {
	board: {
		name: 'Untitled board',
		image: 'https://i.imgur.com/ywjyCBQ.jpg',
		labels: [
		{
			id: 1,
			text: 'design',
			color: 'orange'
		},
		{
			id: 2,
			text: 'deployment',
			color: 'blue'
		},
		{
			id: 3,
			text: 'code',
			color: 'red'
		}
		]
	}
}

const getters = {
}

const mutations = {
	updateName(state, payload) {
		state.board.name = payload
	}
}

const actions = {
}

export default {
	state,
	getters,
	mutations,
	actions
}
