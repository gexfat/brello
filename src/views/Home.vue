<script>
import { mapState } from "vuex"
// @ is an alias to /src
import Column from "@/components/Column.vue";
import BoardMenu from "@/components/BoardMenu.vue";
import { mapActions } from "vuex";

import ModalEditName from '@/components/ModalEditName.vue';
import Drawer from "@/components/DrawerSettings.vue";

export default {
	name: 'Home',
	data() {
		return {
			edit: false
		}
	},
	components: {
		Column,
		BoardMenu,
		ModalEditName,
		Drawer
	},
	watch: {
		lists: {
			handler: function(val, oldVal) {
				this.$store.dispatch('list/updateList', val)
				console.log('update lists get set triggered')
				return oldVal
			},
			deep: true
		}
	},
	computed: {
		...mapState("list", ["lists"]),
		name: { // getter setter for retreiving and modifying the board's name
			get() {
				return this.$store.state.board.board.name
			},
			set(value) {
				this.$store.commit('board/updateName', value)
			}
		},
		boardImage: { // getter setter for retrieving and modifying the board's image
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
		toggleForm() { // toggle the edit form
			this.edit = !this.edit;
		}
	}
	// created() {
	// 	console.log(this.lists)
	// }
}
</script>

<template>
	<div class="2xl:container 2xl:mx-auto">
		<div class="flex items-center h-16 px-6 bg-white shadow-sm">
			<!-- Edit board name modal -->
			<ModalEditName>
				<template #default="{ openModal }">
					<div class="group flex items-center cursor-pointer" @click="openModal">
						<!-- Board name -->
						<h1 class="text-xl text-gray-800 font-medium">
							{{ name }}
						</h1>
					</div>
				</template>
			</ModalEditName>
			<!-- Board options dropdown menu -->
			<div class="ml-auto flex items-center space-x-2">
				<!-- Dropdown component -->
				<BoardMenu/>
			</div>
		</div>
	</div>
	<div class="relative 2xl:container 2xl:mx-auto h-full overflow-x-auto overflow-y-hidden bg-cover bg-center" :style="{ backgroundImage: `url(${boardImage})` }">
		<!-- Board image -->
		<div v-show="boardImage" class="fixed w-full h-full bg-white bg-opacity-80"></div>
		<div class="flex -mt-2 h-full pt-10 p-4">
			<!-- List of columns. Pass our individual lists meta info via the list-prop -->
			<div v-for="list in lists" :key="list.meta.id" class="mx-1 h-full flex-shrink-0" style="width: 272px">
				<!-- Column component -->
				<Column :list-prop="list.meta"/>
			</div>
		</div>
	</div>
	<Drawer/>
</template>
