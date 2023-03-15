
var ImageLoader = Vue.component("ImageLoader", {
  components : {},
  props: ['text', 'source', 'static'],
	template: `
		<div class="loader-container">
			<div v-if="!static" class="dot-loader" :style="{backgroundImage: 'url('+imageSource+')'}"></div>
			<div v-else class="image-loader">
				<img :src="imageSource" alt="" />
			</div>
			<div class="loading-text">{{text}}</div>
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
});