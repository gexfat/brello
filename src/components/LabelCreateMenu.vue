<script>
	import { mapState } from "vuex";
	import { Menu, MenuButton, MenuItems } from "@headlessui/vue";
	import { TagIcon } from "@heroicons/vue/outline";
	import { CheckIcon } from "@heroicons/vue/solid";
	//import LabelBlock from "@/components/Label.vue";

	export default {
		props: {
			checkedLabelsProp: Array
		},
		components: {
			//LabelBlock,
			Menu,
			MenuButton,
			MenuItems,
			TagIcon,
			CheckIcon
			//MenuItem,
		},
		data() {
			return {
				searchTerm: ""
			}
		},
		computed: {
			...mapState("board", ["board"]),
			filterLabels() {
				return this.board.labels.filter(label => {
					return label.text.toLowerCase().includes(this.searchTerm);
				});
			},
			checkedLabels: { // getter setter for retrieving and appending checked labels
				get() {
					return this.checkedLabelsProp
				},
				set(value) {
					this.$emit('post-labels', value)
				}
			}
		},
		methods: {
		}
	};
</script>

<template>
	<div class="w-full">
		<Menu as="div" class="relative w-full">
			<!-- Add tag button -->
			<MenuButton class="flex items-center w-full px-4 py-2 text-sm font-medium leading-4 text-gray-800 bg-gray-200 border border-transparent rounded hover:bg-gray-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500">
				<!-- Tag icon -->
				<TagIcon class="h-4 w-4 mr-2 text-gray-500"/>
				Add labels
			</MenuButton>

			<transition
			enter-active-class="transition duration-100 ease-out"
			enter-from-class="transform scale-95 opacity-0"
			enter-to-class="transform scale-100 opacity-100"
			leave-active-class="transition duration-75 ease-in"
			leave-from-class="transform scale-100 opacity-100"
			leave-to-class="transform scale-95 opacity-0"
			>
			<MenuItems
			class="absolute right-0 w-full mt-2 origin-top bg-white divide-y divide-gray-100 rounded shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50"
			as="div"
			>
			<div class="flex items-center justify-center py-2">
				<!-- Menu header text -->
				<h4 class="text-base font-medium leading-tight text-gray-500">Labels</h4>
			</div>
			<div class="p-3">
				<div class="mb-3">
					<input type="text" ref="name" class="block w-full rounded border border-gray-200 shadow-xs focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" v-model="searchTerm" placeholder="Search labels"/>
				</div>
				<!-- Render array of labels -->
				<div class="select-none" v-for="label in filterLabels" :key="label.id">
					<input type="checkbox" :id="label.id" :value="label" v-model="checkedLabels" class="hidden"/>
					<label :for="label.id" class="group relative block cursor-pointer">
						<!-- Render the label -->
						<div class="block px-3 py-2 leading-tight font-medium text-sm rounded border border-transparent" :class="`text-${label.color}-800 hover:bg-${label.color}-200 hover:border hover:border-${label.color}-300`">
							{{ label.text }}
						</div>
						<!-- If checked array (from store) includes current label, apply check icon -->
						<div v-show="checkedLabels.includes(label)" class="absolute top-2.5 right-3">
							<!-- Check icon -->
							<CheckIcon class="h-4 w-4" :class="`text-gray-500 group-hover:text-${label.color}-800`"/>
						</div>
					</label>
				</div>
			</div>
		</MenuItems>
	</transition>
</Menu>
</div>
</template>