<script>
	export default {
		props: {
			labelProp: Object,
			styleProp: String
		},
		components: {
		},
		data() {
			return {
				label: this.labelProp
			}
		},
		setup() {
			return {
			};
		},
		computed: {
			labelClass() { // optional styling prop, otherwise apply default styling
				return this.styleProp ? this.styleProp : 'inline-block px-3 py-1 leading-tight font-medium text-sm border rounded'
			}
		}
	};
</script>

<template>
	<!-- Label component. Accepts styling properties such as color -->
	<div :class="[labelClass, label.color ? `bg-${label.color}-200 border-${label.color}-300 text-${label.color}-800` : 'bg-teal-200 text-teal-800']">
		{{ label.text }}
	</div>
</template>
