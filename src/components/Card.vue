<script>
	import { defineAsyncComponent } from 'vue'
	import { PencilIcon, XIcon, CogIcon, MenuAlt2Icon } from '@heroicons/vue/solid'

	const ModalEditCard = defineAsyncComponent(() => import('@/components/ModalEditCard.vue'))

	export default {
		name: 'Home',
		props: {
			listProp: Object,
			itemProp: Object
		},
		data() {
			return {
				edit: false,
				//itemBeforeEdit: null
			}
		},
		components: {
			PencilIcon,
			XIcon,
			CogIcon,
			MenuAlt2Icon,
			ModalEditCard
		},
		computed: {
			item() {
				return this.$store.getters['list/getItemById'](this.listProp.id, this.itemProp.id);
			},
			list() {
				return this.$store.getters['list/getListById'](this.listProp.id);
			},
			validated() {
				return this.item.text.length > 0;
			}
		},
		methods: {
			// setData() {
			// 	this.list = Object.assign({}, this.listProp);
			// 	this.item = Object.assign({}, this.itemProp);
			// },
			// toggleForm() {
			// 	this.$refs.text.focus();
			// 	this.edit = !this.edit
			// 	this.$emit('editing');
			// },
			openForm() { // opens the task edit form
				//this.$refs.text.focus();
				this.edit = true;
				this.$emit('editing');
			},
			closeForm() { // closes the task edit form
				this.$refs.text.blur();
				this.edit = false;
				this.$emit('editing');
			},
			updateItem() { // passes local object to the store and updates the task
				const obj = {
					list: { id: this.listProp.id, name: this.listProp.name },
					id: this.item.id,
					text: this.$refs.text.value,
					description: this.item.description,
					labels: this.item.labels
				}
				this.$store.dispatch('list/updateItem', obj)
				this.closeForm()
				//this.itemBeforeEdit = Object.assign({}, obj)
			},
			log() { // logs the current task object to the console
				console.log(this.item)
			}
		}
	}
</script>

<template>
	<div>
		<div class="relative group p-2 border border-gray-200 rounded shadow-xs transition duration-100 cursor-pointer mb-2 break-words" :class="edit ? 'z-50 shadow-lg bg-white border-0' : 'bg-white hover:bg-gray-100 hover:bg-opacity-70 hover:shadow-sm'">
			<div v-show="!edit" class="pr-5">
				<!-- Task labels -->
				<div v-if="item.labels.length" class="flex items-center space-x-1 mb-2">
					<!-- Render the labels array -->
					<div v-for="(label,index) in item.labels" :key="`label-${index}`" :class="`flex items-center justify-center rounded-full bg-${label.color}-300 border border-${label.color}-400 w-8 h-1.5`">
					</div>
				</div>
				<!-- Task title -->
				<p class="leading-4 text-gray-800 text-base mb-3">
					{{ item.text }}
				</p>
				<!-- Task description -->
				<div v-if="item.description">
					<MenuAlt2Icon class="h-3.5 w-3.5 text-gray-400"/>
				</div>
			</div>
			<!-- Edit form -->
			<div v-show="edit" class="relative space-y-2">
				<!-- Task description text area -->
				<textarea ref="text" rows="4" class="block w-full rounded border border-gray-200 shadow-xs focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" :value="item.text" placeholder="Give your card a title" @keyup.enter="updateItem()" @keydown.enter.exact.prevent/>
				<div class="flex items-center">
					<!-- Save button. Updates changes to the store. -->
					<button class="flex items-center justify-center px-4 py-2 bg-teal-700 hover:bg-teal-500 rounded text-sm text-white leading-4 font-medium transition duration-100 disabled:opacity-50 disabled:cursor-not-allowed" @click="updateItem()" :disabled="!validated">
						Save
					</button>
					<!-- Cancel button. Discards any changes and closes teh form. -->
					<button class="ml-1 flex items-center w-8 h-8 justify-center bg-transparent hover:bg-gray-200 rounded text-sm text-gray-500 leading-4 font-medium transition duration-100" @click="closeForm()">
						<XIcon class="h-5 w-5"/>
					</button>
					<!-- More options modal trigger -->
					<ModalEditCard v-if="edit" :list-prop="list" :item-prop="item">
						<template #default="{ openModal }">
							<!-- Open modal button -->
							<button class="ml-auto flex items-center justify-center bg-transparent hover:underline text-sm text-gray-500 leading-4 transition duration-100" @click="openModal">
								More options
							</button>
						</template>
					</ModalEditCard>
				</div>
			</div>
			<!-- Buttons -->
			<div v-show="!edit" class="hidden group-hover:flex absolute right-0.5 top-0.5 ignore-edit items-center">
				<!-- Delete confirmation modal -->
				<ModalEditCard v-if="!edit" :list-prop="list" :item-prop="item">
					<template #default="{ openModal }">
						<button class="flex items-center justify-center w-6 h-6 hover:bg-gray-300 text-gray-400 hover:text-gray-600 rounded-sm leading-4 transition duration-100" @click="openModal">
							<CogIcon class="h-3.5 w-3.5"/>
						</button>
					</template>
				</ModalEditCard>
				<!-- Edit button -->
				<button class="flex items-center justify-center w-6 h-6 hover:bg-gray-300 text-gray-400 hover:text-gray-600 rounded-sm leading-4 transition duration-100" @click="openForm();">
					<PencilIcon class="h-3.5 w-3.5"/>
				</button>
			</div>
		</div>
		<!-- Overlay -->
		<div v-show="edit" class="fixed bottom-0 left-0 h-full w-full pin z-40 overflow-auto bg-gray-900 bg-opacity-70 flex" @click="closeForm()"></div>
	</div>
</template>