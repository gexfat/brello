<script>
	export default {
		name: 'export-json',
		props: {
			name: String,
			data: Array,
			download: Boolean
		},
		data() {
			return {
				dataToExport: this.data
			}
		},
		methods: {
			export() { // creates .JSON file and downloads it onclick
				let blob = new Blob([JSON.stringify(this.data)], {'type':'application\/json'}); // create exportable .JSON file via blob
				let link = document.createElement('a') // create the download link
				link.href = window.URL.createObjectURL(blob)
				link.download = this.name
				link.click() // simulate user click and download the file
			}
		}
	}
</script>

<template>
	<div>
		<slot>
		</slot>
	</div>
</template>