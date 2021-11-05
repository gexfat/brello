<script>
//import { mapState } from "vuex"
// @ is an alias to /src
import { mapActions } from "vuex";

import { ArrowLeftIcon } from '@heroicons/vue/solid'

export default {
	name: 'Home',
	data() {
		return {
			edit: false,
			navigation: [
			{
				name: 'info',
				route: {
					name: 'Settings-Info'
				}
			},
			{
				name: 'labels',
				route: {
					name: 'Settings-Labels'
				}
			},
			{
				name: 'theme',
				route: {
					name: 'Settings-Theme'
				}
			}
			]
		}
	},
	components: {
		ArrowLeftIcon
	},
	watch: {
	},
	computed: {
		name: {
			get() {
				return this.$store.state.board.board.name
			},
			set(value) {
				this.$store.commit('board/updateName', value)
			}
		},
		boardImage: {
			get() {
				return this.$store.state.board.board.image
			},
			set(value) {
				this.$store.commit('board/updateBackground', value)
			}
		}
	},
	methods: {
		...mapActions("list", ["exportList"]),
		toggleForm() {
			this.edit = !this.edit;
		}
	},
	created() {
		//console.log(this.lists)
	}
}
</script>

<template>
	<div class="2xl:container 2xl:mx-auto">
		<div class="flex items-center h-16 px-4 bg-white shadow-sm">
			<div class="flex items-center space-x-2">
				<router-link class="flex items-center w-8 h-8 justify-center bg-transparent hover:bg-gray-100 rounded text-sm text-gray-500 leading-4 font-medium transition duration-100" to="/">
					<ArrowLeftIcon class="h-4 w-4"/>
				</router-link>
				<h1 class="text-xl text-gray-800 font-medium">
					Board Settings
				</h1>
			</div>
		</div>
	</div>
	<div class="2xl:container 2xl:mx-auto h-full">
		<div class="grid grid-cols-10 gap-4 h-full">
			<div class="col-span-2 hidden md:block">
				<div class="shadow-sm border-r overflow-hidden h-full p-4">
						<router-link
						v-for="item in navigation"
						:key="item.name" 
						:to="item.route"
						custom
						v-slot="{ href, navigate, isActive }">
						<a :href="href" @click="navigate" class="block px-4 py-2 text-left transition duration-100 border-l-2" :class="isActive ? 'text-teal-700 bg-white border-teal-700' : 'text-gray-500 hover:text-gray-700 border-transparent'">
							<span class="text-sm font-medium capitalize">{{ item.name }}</span>
						</a>
					</router-link>
				</div>
			</div>
		<div class="col-span-8 p-3 text-gray-600 italic">
			This interface is under construction
		</div>
	</div>
</div>
</template>
