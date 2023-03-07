
var Imagine = Vue.component("Imagine", {
  components : {},
  props: ['imageUrl', 'onRequestVaration', 'onRequestUpscale', 'showVariation', 'showUpscale'],
	template: `
    <div class="first-imagine">
      <img :src="imageUrl || 'assets/img/logos/Gsuite.png'" class="imagine-img" alt="first imagine">
      <div
        class="first-quadrant"
        id="quadrant-1"
      >
        <div>1</div>
        <button v-if="showVariation" @click="onRequestVaration(1)">Variate</button>
        <button v-if="showUpscale" @click="onRequestUpscale(1)">Upscale</button>
      </div>
      <div class="second-quadrant">
        <div>2</div>
        <button v-if="showVariation" @click="onRequestVaration(2)">Variate</button>
        <button v-if="showUpscale" @click="onRequestUpscale(2)">Upscale</button>
      </div>
      <div class="third-quadrant">
        <div>3</div>
        <button v-if="showVariation" @click="onRequestVaration(3)">Variate</button>
        <button v-if="showUpscale" @click="onRequestUpscale(3)">Upscale</button>
      </div>
      <div class="forth-quadrant">
        <div>4</div>
        <button v-if="showVariation" @click="onRequestVaration(4)">Variate</button>
        <button v-if="showUpscale" @click="onRequestUpscale(4)">Upscale</button>
      </div>
    </div>
  `,
	async mounted() {
    const existingUser = localStorage.getItem('activeUserId')
    console.log("CEK UPSCLAE", this.showUpscale)
	},
	beforeDestroy() {
		$(window).unbind("scroll");
	},
	data() {
		return {
			homePath: ['/', '/about/'],
      disableInput: false,
      categoryType: this.category,
      name: this.categoryInput,
      imagineStyle: this.styleInput,
      loading: true,
      firstImagine: null,
      hasRequestUpscale: 0,
      hasRequestVariation: 0,
      userId: null,
      loadingText: 'Starting session...',
      upscaledImageUrl: null,
      variatedImageUrl: null,
		};
	},
	methods: {
	},
});
