<script>
	import { ref } from 'vue'
	import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/vue'
	import { MenuIcon, XIcon } from '@heroicons/vue/outline'

	const navigation = [
	{ name: 'Board', route: '/', current: true },
	{ name: 'About', route: '/about', current: false },
	{ name: 'Docs', route: '/docs', current: false }
	]

	export default {
		components: {
			Disclosure,
			DisclosureButton,
			DisclosurePanel,
			MenuIcon,
			XIcon,
		},
		setup() {
			const open = ref(false)
			return {
				navigation,
				open,
			}
		},
	}
</script>

<template>
	<Disclosure as="nav" class="bg-teal-700 shadow-sm" v-slot="{ open }">
		<div class="max-w-full mx-auto px-2 sm:px-6 lg:px-4">
			<div class="relative flex items-center justify-between h-14">
				<div class="absolute inset-y-0 left-0 flex items-center sm:hidden">
					<!-- Mobile menu button-->
					<DisclosureButton class="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
						<span class="sr-only">Open main menu</span>
						<MenuIcon v-if="!open" class="block h-6 w-6" aria-hidden="true" />
						<XIcon v-else class="block h-6 w-6" aria-hidden="true" />
					</DisclosureButton>
				</div>
				<div class="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
					<div class="group flex-shrink-0 flex items-center">
						<!-- Brello Logo -->
						<div class="flex space-x-0.5 mr-2 h-4">
							<div class="flex items-center justify-center rounded-xs bg-white bg-opacity-30 w-1.5 h-2.5 group-hover:h-4 transition-all duration-200"/>
							<div class="flex items-center justify-center rounded-xs bg-white bg-opacity-60 w-1.5 h-4 group-hover:h-2.5 transition-all duration-200"/>
						</div>
						<span class="text-white text-xl font-medium tracking-wide">
							brello
						</span>
					</div>
					<div class="hidden sm:block sm:ml-6">
						<div class="flex space-x-3">
							<router-link v-for="item in navigation" :key="item.name" :to="item.route" :class="[item.current ? 'bg-white bg-opacity-20 text-white' : 'text-white text-opacity-70 hover:text-opacity-100', 'px-3 py-2 rounded text-sm font-medium']" :aria-current="item.current ? 'page' : undefined">
								{{ item.name }}
							</router-link>
						</div>
					</div>
				</div>
				<div class="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
					<!-- Twitter share -->
					<a href="https://twitter.com/intent/tweet?url=https%3A%2F%2Fbrello.io&text=Check%20out%20Brello.io%2C%20a%20local-storage%20kanban%20board&hashtags=brello%2Cmadewithvue%2Ctailwindcss" class="flex items-center space-x-2 text-white hover:text-gray-200 transition-colors duration-150 text-sm">
						<!-- Twitter icon -->
						<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor" class="text-teal-50 opacity-40">
							<path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path>
						</svg>
						<!-- CTA copy text -->
						<p>
							Tweet
							<span class="sr-only sm:not-sr-only"> this project</span>
						</p>
					</a>

					<!-- Github link and copy text-->
					<a href="https://classic.heroicons.com" class="hidden md:block group text-white text-opacity-70 text-sm ml-10">
						Want to contribute?
						<div class="inline-block font-medium text-white group-hover:text-gray-200 transition-colors duration-100">
							Explore the repo →
						</div>
					</a>
					
				</div>
			</div>
		</div>

		<DisclosurePanel class="sm:hidden">
			<div class="px-2 pt-2 pb-3 space-y-1">
				<a v-for="item in navigation" :key="item.name" :href="item.href" :class="[item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white', 'block px-3 py-2 rounded-md text-base font-medium']" :aria-current="item.current ? 'page' : undefined">{{ item.name }}
				</a>
			</div>
		</DisclosurePanel>
	</Disclosure>
</template>