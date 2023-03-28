
var ImageLoader = Vue.component("ImageLoader", {
  components : {},
  props: ['text', 'text2', 'source', 'static'],
	template: `
		<div class="loader-container fade-in-top-center">
			<div v-if="!static" class="dot-loader fade-in-top-center" :style="{backgroundImage: 'url('+imageSource+')'}"></div>
			<div v-else class="image-loader">
				<img :src="imageSource" alt="" />
			</div>
			<div class="loading-text fade-in-top-center" v-html="text"></div>
			<div class="loading-text fade-in-top-center" v-html="text2"></div>
			<div v-if="!static" class="search-loader">
				<img src="assets/img/loader.svg" alt="" />
			</div>
		</div>
  `,
	async mounted() {
    // const existingUser = localStorage.getItem('activeUserId')
		if(!this.source) this.imageSource = "assets/img/painter.png"
	},
	beforeDestroy() {
	},
	data() {
		return {
			imageSource: this.source
		};
	},
	methods: {
	},
	watch: {
		source(newVal, oldVal) {
			this.imageSource = newVal
		}
	}
});
