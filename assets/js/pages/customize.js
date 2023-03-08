
const BACKEND_URL = 'https://app.painta.io'
var Customize = Vue.component("Customize", {
  components : {
    'imagine-image': Imagine
  },
  props: ['category', 'categoryInput', 'styleInput'],
	template: `
    <div class="customize">
      <div class="container header-margin">
        <div></div>
        <div v-show="loading" class="loader-container">
          <div class="search-loader">
            <img src="assets/img/loader.svg" alt="" />
          </div>
          <div>{{loadingText}}</div>
          <!-- <div>Design will appear shortly, we will send an email when it's ready</div> -->
        </div>
        <div v-show="!loading">
          <div>
            {{category}}, {{categoryInput}}, {{styleInput}}
          </div>
          <imagine-image
            :imageUrl="firstImagine"
            :showVariation="!hasRequestVariation"
            :showUpscale="!hasRequestUpscale"
            :onRequestVaration="requestVariation"
            :onRequestUpscale="requestUpscale"
          />
          <div v-if="hasRequestUpscale">
            <h4 class="imagine-title">Upscaled Image {{hasRequestUpscale}}</h4>
            <img :src="upscaledImageUrl || 'assets/img/logos/Gsuite.png'" class="imagine-img" alt="upscaling">
          </div>
          <div v-if="hasRequestVariation">
            <h4 class="imagine-title">Variated Image {{hasRequestVariation}}</h4>
            <img :src="variatedImageUrl || 'assets/img/logos/Gsuite.png'" class="imagine-img" alt="variating">
          </div>
        </div>
      </div>
    </div>
  `,
	async mounted() {
    const prompt = this.createPrompt()
    const existingUser = localStorage.getItem('userInfo')
    if (existingUser) {
      this.user = existingUser
      console.log("Previous session is active. Killing the session")
      try {
        await this.endSession(existingUser)
      } catch (err) {
        console.error('Failed to end previous session')
      } finally {
      }
    }

    try {
      this.loading = true
      const userId = await this.startSession()
      this.imagineUserId = userId
      localStorage.setItem('imagineUserId', userId)
      const imageUrl = await this.imagineThePrompt(prompt, userId)
      this.firstImagine = imageUrl
    } catch (err) {
      console.error('Failed to imagine the prompt', err)
    } finally {
      this.loadingText = null
      this.loading = false
    }
 
	},
	beforeDestroy() {
		$(window).unbind("scroll");
	},
	data() {
		return {
			homePath: ['/', '/about/'],
			videoID: "",
			originalVideoID: "65JrtwtTOdc",
			showPopup: false,
      searching: false,
      keyword: '',
      disableInput: false,
      categoryType: this.category,
      name: this.categoryInput,
      imagineStyle: this.styleInput,
      loading: true,
      firstImagine: null,
      hasRequestUpscale: 0,
      hasRequestVariation: 0,
      imagineUserId: null,
      user: null,
      loadingText: null,
      upscaledImageUrl: null,
      variatedImageUrl: null,
		};
	},
  watch: {
    hasRequestUpscale(newVal, oldVal) {
      if (newVal && this.hasRequestVariation) {
        this.loading = true
        this.endSession()
          .catch(err => alert(`${err}`))
          .finally(() => this.loading = false)
      }
    },
    hasRequestVariation(newVal, oldVal) {
      if (newVal && this.hasRequestUpscale) {
        this.loading = true
        this.endSession()
          .catch(err => alert(`${err}`))
          .finally(() => this.loading = false)
      }
    }
  },
	methods: {
    createPrompt() {
      const category = this.categoryType
      const categoryInput = this.name
      const styleInput = this.imagineStyle
      const prompt = `Best ${category} ever for ${categoryInput}, ${styleInput}, vector, ui design, ux design, ux/ui, flat design, simple, elegant, trending, beautiful, clean background --v 4 --aspect 16:9`
      return prompt
    },
    inputClicked() {

    },
    onInputEnter() {

    },
    reduceCredits() {
      this.$emit('updatecredits')
    },
    async startSession() {
      const endpoint = `${BACKEND_URL}/start_session`
      // Send a POST request
      this.loadingText = 'Starting new session...'
      const response = await axios.get(endpoint, {});
      console.log("check user id", response)
      return response?.data?.data?.user_id
      // return new Promise((res,rej) => {
      //   setTimeout(() => {
      //     res("c6d3780e-033a-4f17-9ace-ed9059b5b32c")
      //   }, 2000, this)
      // })
    },
    async endSession(user_id, displayLoading=false) {
      // json={"user_id": user_id}
      if (!user_id) user_id = this.imagineUserId
      console.log("ending session")
      if (displayLoading) this.loading = true
      this.loadingText = 'Ending previous session...'
      const endpoint = `${BACKEND_URL}/end_session`
      let response 
      try {
        response = await axios.post(endpoint, {
          user_id
        });
      } catch(err) {
        console.error(err)
      }
      localStorage.removeItem('userInfo')
      if (displayLoading) this.loading = false
      return response
      // return new Promise((res,rej) => {
      //   setTimeout(() => {
      //     res("Ok")
      //   }, 2000)
      // })
    },
    async imagineThePrompt(prompt, user_id) {
      console.log("imagine the prompt: ", prompt, user_id)
      // json={"prompt": prompt, "user_id": user_id}
      const endpoint = `${BACKEND_URL}/imagine`
      this.loadingText = `Imagining the prompt...`
      // const response = await axios.post(endpoint, {
      //   prompt: prompt, user_id: user_id
      // });
      // console.log("CEK IMAGINE", response)
      // return response?.data?.url
      return new Promise((resolve,reject) => {
        console.log("wait to imagine...")
        setTimeout(async () => {
          console.log("executing imagine...")
          try {
            const response = await axios.post(endpoint, {
              prompt: prompt, user_id: user_id
            });
            console.log('got respon', response)
            this.reduceCredits()
            resolve(response?.data?.url)
          } catch (err) {
            console.log("should reject")
            alert('Something went wrong :(')
            reject(err)
          }
        }, 6500)
      })
      // return new Promise((res,rej) => {
      //   setTimeout(() => {
      //     const mock = "https://cdn.discordapp.com/attachments/1082534447422918656/1082535420404965436/paul_cyberpunk_cat_chilling_and_smoking_90df58dd-ce03-4469-a73e-82c8c68eb506.png"
      //     this.loading = false
      //     res(mock)
      //   }, 2000, this)
      // })
    },
    async requestUpscale(image_number=1, user_id) {
      if (!user_id) user_id = this.imagineUserId
      this.loadingText = 'Upscaling selected image...'
      this.loading = true
      const endpoint = `${BACKEND_URL}/upscale`
      const response = await axios.post(endpoint, {
        image_number: image_number - 1, user_id
      });
      this.hasRequestUpscale = image_number
      this.upscaledImageUrl = response?.data?.url
      this.loading = false
      return response?.data?.url
      // return new Promise((res,rej) => {
      //   setTimeout(() => {
      //     const mock = "https://cdn.discordapp.com/attachments/1082534447422918656/1082535420404965436/paul_cyberpunk_cat_chilling_and_smoking_90df58dd-ce03-4469-a73e-82c8c68eb506.png"
      //     this.upscaledImageUrl = mock
      //     this.loading = false
      //     res(mock)
      //   }, 2000, this)
      // })
      // console.log(`Upscale quadrant ${image_number}`)
    },
    async requestVariation(image_number=1, user_id) {
      if (!user_id) user_id = this.imagineUserId
      this.loadingText = 'Variating selected image...'
      this.loading = true
      const endpoint = `${BACKEND_URL}/variation`
      console.log(`Variate quadrant ${image_number}`)
      const response = await axios.post(endpoint, {
        image_number: image_number - 1, user_id
      });
      this.hasRequestVariation = image_number
      this.variatedImageUrl = response?.data?.url
      this.loading = false
      return response?.data?.url
      // return new Promise((res,rej) => {
      //   setTimeout(() => {
      //     const mock = "https://cdn.discordapp.com/attachments/1082534447422918656/1082536101979357194/paul_cyberpunk_cat_chilling_and_smoking_c8bdea5c-1759-447c-83ee-d23120e44e52.png"
      //     this.variatedImageUrl = mock
      //     res(mock)
      //     this.loading = false
      //   }, 2000, false)
      // })
    },
		showPopupHandler(videoId) {
			this.showPopup = true;
			this.videoID = videoId;
		},
		hidePopupHandler() {
			this.showPopup = false;
			this.videoID = "";
		},
    async returnHome() {
      const res = confirm('Are you sure you want to cancel this?')
      if (res) {
        await this.endSession(this.userId, true)
        this.$emit('returnhome', true)
      }
    }
	},
});
