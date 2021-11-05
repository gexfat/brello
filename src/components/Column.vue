<script>
	import { nextTick } from 'vue'

	import draggable from 'vuedraggable';
	import Card from '@/components/Card.vue';
	import { PlusIcon, XIcon } from '@heroicons/vue/solid';

	export default {
		name: 'Home',
		props: {
			listProp: Object
		},
		data() {
			return {
				drag: false,
				//canDrag: true,
				form: {
					visible: false,
					text: null
				}
			}
		},
		components: {
			draggable,
			Card,
			PlusIcon,
			XIcon
		},
		// watch: {
		// 	list: {
		// 		handler: function(val, oldVal) {
		// 			this.$store.commit('list/updateList', val)
		// 			console.log('updateList mutation was triggered without dragging!!')
		// 			return oldVal
		// 		},
		// 		deep: true
		// 	}
		// },
		computed: {
			dragOptions() {
				return {
					name: 'transition-group',
					animation: 150,
					disabled: this.drag,
					ghostClass: "ghost",
					chosenClass: "chosen",
					filter: ".ignore-edit",
					delay: 50
				};
			},
			list() {
				return this.$store.getters['list/getListById'](this.listProp.id);
			},
			// list: {
			// 	get() {
			// 		return this.$store.getters['list/getListById'](this.listProp.id);
			// 	},
			// 	set(value) {
			// 		this.$store.commit('list/updateList', value)
			// 	}
			// }
		},
		methods: {
			toggleForm() {
				nextTick(() => {
					this.$refs.form.focus();
				});
				this.form.visible = !this.form.visible;
			},
			addItem() {
				let obj = {
					list: { id: this.listProp.id, name: this.listProp.name },
					id: (Math.random().toString(36) + Date.now().toString(36)).substr(2),
					text: this.form.text,
					description: null,
					labels: []
				};
				if (this.form.text === null || this.form.text.match(/^ *$/)) {
					console.log('empty')
				} else {
					this.list.items.push(obj);
					console.log('added item')
				}
				this.resetForm();
			},
			// updateItem(obj) {
			// 	// console.log('update item method triggered via emit')
			// 	// console.log(obj.id)
			// 	let item = this.list.items.find(item => item.id === obj.id)
			// 	this.item = Object.assign({},item,obj)
			// 	console.log(this.list)
			// },
			removeItem(id) {
				this.$delete(this.list.items, id)
			},
			resetForm() {
				this.form = {};
			},
			//onAdd (e) { e.item.classList.add('hidden') }
		}
	}
</script>

<template>
	<div class="relative flex flex-col h-full">
		<div class="flex items-center flex-shrink-0 h-8 px-4">
			<div class="text-gray-600 text-uppercase text-xs font-semibold uppercase tracking-wide">
				{{ list.meta.name }}
				<span class="text-gray-500 text-xs font-normal pl-1">
					{{ list.items.length || 0 }}
				</span>
			</div>
			<!-- Edit button -->
			<div class="ml-auto">
				<button class="flex items-center justify-center w-6 h-6 hover:bg-gray-100 text-gray-500 hover:text-gray-700 rounded-sm leading-4 transition duration-100 capitalize" :class="{ 'pointer-events-none':form.visible }" @click="toggleForm();">
					<PlusIcon class="h-5 w-5"/>
				</button>
			</div>
		</div>

		<div class="h-full -mx-2 -mt-1 py-2 px-4 overflow-y-auto select-none">
			<draggable :id="list.meta.name" v-model="list.items" class="h-full" group='cols' item-key="id" :force-fallback="true" v-bind="dragOptions">
				<template #item="{ element }">
					<Card :list-prop="list.meta" :item-prop="element" @editing="drag = !drag"/>
				</template>
				<template #footer>
					<div class="mb-2">
						<div v-show="!form.visible" class="w-full">
							<button class="group flex items-center justify-start w-full px-2 py-2 bg-transparent hover:bg-gray-100 rounded text-gray-500 hover:text-gray-700 text-sm transition duration-100" @click="toggleForm()">
								<PlusIcon class="h-5 w-5"/>
								<span class="pl-1">New card</span>
							</button>
						</div>

						<div v-show="form.visible" class="space-y-2">
							<textarea ref="form" rows="4" class="block w-full rounded border border-gray-200 shadow-xs focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" v-model="form.text" placeholder="Give your card a title" @keyup.enter="addItem()" @keydown.enter.exact.prevent/>
							<div class="flex items-center space-x-1">
								<button class="light" @click="addItem()">
									Add card
								</button>
								<button class="flex items-center w-8 h-8 justify-center bg-transparent hover:bg-gray-100 rounded text-sm text-gray-500 leading-4 font-medium transition duration-100" @click="toggleForm(); resetForm()">
									<XIcon class="h-5 w-5"/>
								</button>
							</div>
						</div>
					</div>
				</template>
			</draggable>

		</div>

	</div>
</template>

<style scoped>
.flip-list {
	transition: transform 0.5s;
}
.sortable-fallback { opacity: 1 !important }
.ghost {
	@apply invisible
}
.chosen {
	@apply opacity-100 transform scale-105 rotate-3 origin-left
}
</style>