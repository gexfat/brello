<script>
	import { ref } from 'vue'
	import {
		TransitionRoot,
		TransitionChild,
		Dialog,
		DialogOverlay,
		DialogTitle,
	} from "@headlessui/vue";

	import { mapState } from "vuex";

	import { XIcon } from '@heroicons/vue/solid'
	import { MenuAlt2Icon, TagIcon } from '@heroicons/vue/outline'

	import Tag from '@/components/Label.vue'
	import LabelCreateMenu from '@/components/LabelCreateMenu.vue'

	export default {
		props: {
			listProp: Object,
			itemProp: Object
		},
		components: {
			TransitionRoot,
			TransitionChild,
			Dialog,
			DialogOverlay,
			DialogTitle,
			XIcon,
			MenuAlt2Icon,
			TagIcon,
			//AnnotationIcon,
			Tag,
			LabelCreateMenu
		},
		data() {
			return {
				list: null,
				item: null,
				itemBeforeEdit: null,
				editDescription: null
			}
		},
		setup() {
			const isOpen = ref(false);
			return {
				isOpen,
				closeModal() {
					isOpen.value = false;
				},
				openModal() {
					isOpen.value = true;
				},
			};
		},
		watch: {
			isOpen: {
				handler: function() {
					setTimeout( () => this.resetData(), 500 );
				}
			}
		},
		computed: {
			...mapState("board", ["board"]),
		},
		methods: {
			resetData() {
				this.item = Object.assign({}, this.itemBeforeEdit)
			},
			submit() {
				let obj = {
					list: { id: this.list.meta.id, name: this.list.meta.name },
					id: this.item.id,
					text: this.item.text,
					description: this.item.description,
					labels: this.item.labels
				};
				this.$store.dispatch('list/updateItem', obj)
				this.closeModal();
				this.itemBeforeEdit = Object.assign({}, this.item)
			}
		},
		mounted() {
			this.editDescription = false;
			this.list = Object.assign({}, this.listProp);
			this.item = Object.assign({}, this.itemProp);
		},
		created() {
			this.itemBeforeEdit = Object.assign({}, this.itemProp);
		}
	};
</script>

<template>
	<slot :openModal="openModal">
		<!-- Open modal button -->
		<button
			type="button"
			@click="openModal"
			class="px-4 py-2 text-sm font-medium text-white bg-black rounded-md bg-opacity-20 hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
		>
			Open dialog
		</button>
	</slot>
	<TransitionRoot appear :show="isOpen" as="template">
		<Dialog as="div" static :open="isOpen" @close="closeModal">
			<div class="fixed inset-0 z-50 overflow-y-auto">
				<div class="min-h-screen px-4 text-center">
					<TransitionChild
						as="template"
						enter="duration-200 ease-out"
						enter-from="opacity-0"
						enter-to="opacity-100"
						leave="duration-200 ease-in"
						leave-from="opacity-100"
						leave-to="opacity-0"
					>
						<DialogOverlay class="fixed inset-0 bg-gray-900 bg-opacity-70" />
					</TransitionChild>

					<span class="inline-block h-screen align-middle" aria-hidden="true">
						&#8203;
					</span>

					<TransitionChild
						as="template"
						enter="duration-200 ease-out"
						enter-from="opacity-0 scale-95"
						enter-to="opacity-100 scale-100"
						leave="duration-100 ease-in"
						leave-from="opacity-100 scale-100"
						leave-to="opacity-0 scale-95"
					>
						<div
							class="relative inline-block w-full max-w-4xl my-8 text-left align-middle transition-all transform bg-gray-50 shadow-lg rounded-md"
						>
						<DialogTitle class="div p-4">
							<h3 class="text-lg font-medium leading-6 text-gray-800">{{ item.text }}</h3>
							<p class="text-sm text-gray-500 mt-1">
								in list <span class="capitalize underline">{{ list.meta.name }}</span>
							</p>
						</DialogTitle>

						<div class="mt-10 sm:mt-0 px-4">
							<div class="md:grid md:grid-cols-3 md:gap-6">
								<div class="mt-5 md:mt-0 md:col-span-2 space-y-12">
										<div class="space-y-4">
											<div class="flex items-center border-b border-gray-200 pb-2">
												<TagIcon class="h-5 w-5 text-gray-500 ml-1 mr-2"/>
												<h3 class="text-lg font-medium leading-6 text-gray-900">Labels</h3>
											</div>
											<div class="col-span-6">
												<div v-if="item.labels.length"  class="flex items-center space-x-1.5">
													<div v-for="label in item.labels" :key="label.id" class="relative">
														<Tag :label-prop="label" style-prop="inline-block pl-2 pr-7 py-2 leading-tight font-medium text-sm border rounded"/>
														<div class="absolute right-2" style="top: 11px;">
															<input type="checkbox" :id="label.id" :value="label" v-model="item.labels" class="hidden">
															<label :for="label.id" :class="`text-${label.color}-500 hover:text-${label.color}-600 cursor-pointer`">
																<XIcon class="h-3.5 w-3.5"/>
															</label>
														</div>
													</div>
												</div>
												<div v-else>
													<p class="text-gray-500 text-sm italic">No labels</p>
												</div>
											</div>
										</div>
										<div class="space-y-4">
											<div class="flex items-center border-b border-gray-200 pb-2">
												<MenuAlt2Icon class="h-5 w-5 text-gray-500 mr-2"/>
												<h3 class="text-lg font-medium leading-6 text-gray-800">Description</h3>
												<button class="ml-auto text-sm text-gray-700 hover:underline" @click="editDescription = true">
													Edit
												</button>
											</div>
											<div class="col-span-6">
												<div v-show="!editDescription">
													<p :class="item.description ? 'text-base text-gray-800' : 'text-sm text-gray-500 italic'">
														{{ item.description || 'This card has no description...'}}
													</p>
												</div>
												<textarea v-show="editDescription" rows="3" class="block w-full rounded border border-gray-200 shadow-xs focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" v-model="item.description" placeholder="Enter a description..."/>
											</div>
										</div>
										<!-- <div class="space-y-4">
											<div class="flex items-center border-b border-gray-200 pb-2">
												<AnnotationIcon class="h-5 w-5 text-gray-500 mr-2"/>
												<h3 class="text-lg font-medium leading-6 text-gray-800">Comments</h3>
											</div>
												<div class="col-span-6">
													<textarea ref="text" rows="4" class="block w-full rounded border border-gray-200 shadow-xs focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" :value="item.text" placeholder="Give your card a title"/>
												</div>
										</div> -->
								</div>
								<div class="md:col-span-1">
									<div class="px-4 sm:px-0">
										<h3 class="text-lg font-medium leading-6 text-gray-900 mb-2">Add</h3>
										<LabelCreateMenu ref="labelMenu" :checked-labels-prop="item.labels" @post-labels="item.labels = $event"/>
									</div>
								</div>
							</div>
						</div>

							<div class="mt-4 flex items-center justify-end w-full space-x-2 border-t border-gray-200 p-3 bg-gray-100 rounded-b-md">
								<button
									type="button"
									class="inline-flex justify-center px-4 py-2 text-sm font-medium leading-4 text-gray-600 bg-transparent border border-transparent rounded hover:bg-gray-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
									@click="closeModal();"
								>
									Cancel
								</button>
								<button
									type="button"
									class="light"
									@click="submit();"
								>
									Save
								</button>
							</div>
						</div>
					</TransitionChild>
				</div>
			</div>
		</Dialog>
	</TransitionRoot>
</template>
