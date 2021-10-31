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
	<div :class="[labelClass, label.color ? `bg-${label.color}-100 border-${label.color}-200 text-${label.color}-800` : 'bg-teal-200 bg-teal-300 text-teal-700']">
		{{ label.text }}
	</div>
</template>
