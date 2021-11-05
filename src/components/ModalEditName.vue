<script>
import { ref } from "vue";
import {
	TransitionRoot,
	TransitionChild,
	Dialog,
	DialogOverlay,
	DialogTitle,
} from "@headlessui/vue";

import { mapState } from "vuex";

export default {
	components: {
		TransitionRoot,
		TransitionChild,
		Dialog,
		DialogOverlay,
		DialogTitle,
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
	computed: {
		...mapState("board", ["board"]),
	},
	methods: {
		submit() {
			let name = this.$refs.name.value
			this.$store.commit('board/updateName', name)
		}
	}
};
</script>


<template>
	<slot :openModal="openModal">
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
			<div class="fixed inset-0 z-10 overflow-y-auto">
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
							class="inline-block w-full max-w-md my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-lg rounded"
						>
							<DialogTitle class="div p-4">
								<h3 class="text-lg font-medium leading-6 text-gray-900">Board settings</h3>
								<p class="text-sm text-gray-500 mt-1">
									Manage your board details.
								</p>
							</DialogTitle>
							<div class="p-4">
								<label class="block text-xs text-gray-500 uppercase font-medium tracking-wide mb-1">Name</label>
								<input type="text" ref="name" class="block w-full rounded border border-gray-200 shadow-xs focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" :value="board.name" :placeholder="board.name || 'Give your board a name'" @keyup.enter="closeModal(); submit();"/>
							</div>

							<div class="mt-4 flex items-center justify-end w-full space-x-2 border-t p-3 bg-gray-50">
								<button
									type="button"
									class="inline-flex justify-center px-4 py-2 text-sm font-medium leading-4 text-gray-600 bg-transparent border border-transparent rounded hover:bg-gray-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
									@click="closeModal"
								>
									Cancel
								</button>
								<button
									type="button"
									class="light"
									@click="closeModal(); submit();"
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