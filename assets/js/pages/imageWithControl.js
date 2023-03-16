
var ImageControl = Vue.component("ImageControl", {
  components : {},
  props: ['imageUrl', 'onRequestVaration', 'onRequestUpscale', 'showVariation', 'showUpscale', 'sm'],
	template: `
    <div class="first-imagine">
      <img :src="imageUrl || 'assets/img/painter.png'" class="imagine-img" alt="first imagine">
      <div
        class="first-quadrant"
        id="quadrant-1"
      >
        <div>1</div>
        <button v-if="showVariation" :class="sm ? 'sm':''" @click="onRequestVaration(1)">make variation of this design</button>
        <button v-if="showUpscale" :class="sm ? 'sm':''" @click="onRequestUpscale(1)">make this design bigger</button>
      </div>
      <div class="second-quadrant">
        <div>2</div>
        <button v-if="showVariation" :class="sm ? 'sm':''" @click="onRequestVaration(2)">make variation of this design</button>
        <button v-if="showUpscale" :class="sm ? 'sm':''" @click="onRequestUpscale(2)">make this design bigger</button>
      </div>
      <div class="third-quadrant">
        <div>3</div>
        <button v-if="showVariation" :class="sm ? 'sm':''" @click="onRequestVaration(3)">make variation of this design</button>
        <button v-if="showUpscale" :class="sm ? 'sm':''" @click="onRequestUpscale(3)">make this design bigger</button>
      </div>
      <div class="forth-quadrant">
        <div>4</div>
        <button v-if="showVariation" :class="sm ? 'sm':''" @click="onRequestVaration(4)">make variation of this design</button>
        <button v-if="showUpscale" :class="sm ? 'sm':''" @click="onRequestUpscale(4)">make this design bigger</button>
      </div>
    </div>
  `,
	async mounted() {
    // const existingUser = localStorage.getItem('activeUserId')
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
