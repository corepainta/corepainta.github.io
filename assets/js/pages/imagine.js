//'http://localhost:4001'

var Imagine = Vue.component("Imagine", {
  components : {
    'image-control': ImageControl,
    'image-loader': ImageLoader
  },
  props: ['category', 'categoryInput', 'styleInput'],
	template: `
    <div class="customize">
      <div class="container header-margin">
        <div></div>
        <image-loader v-show="loading" :text="loadingText"/>
        <div v-show="!imagineUserId && failedMessage" class="loader-container">
          <div class="loading-text">{{failedMessage}}</div>
        </div>
        <div v-show="!loading && imagineUserId && category">
          <div>
            <div>
              {{category}}, {{categoryInput}}, {{styleInput}}
            </div>
            <div>
              <image-control
                :imageUrl="firstImagine"
                :onRequestVaration="requestVariation"
                :onRequestUpscale="requestUpscale"
                :showVariation="true"
                :showUpscale="true"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
	async mounted() {
    const prompt = this.createPrompt()
    const existingUser = localStorage.getItem('imagineUserId')
    // if (existingUser) {
    //   console.log("Previous session is active. Killing the session")
    //   try {
    //     await this.endSession(existingUser)
    //   } catch (err) {
    //     console.error('Failed to end previous session')
    //   } finally {
    //   }
    // }
    const userInfo = localStorage.getItem('userInfo')
    if (userInfo) this.user = JSON.parse(userInfo)

    try {
      this.loading = true
      const userId = await this.startSession()
      if (userId) {
        this.imagineUserId = userId
        localStorage.setItem('imagineUserId', userId)
        const imageUrl = await this.imagineThePrompt(prompt, userId)
        this.firstImagine = imageUrl
      } else {
        this.failedMessage = "We have a lot request at the moment. We will email you when it's finished"
      }
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
			showPopup: false,
      searching: false,
      keyword: '',
      disableInput: false,
      categoryType: this.category,
      name: this.categoryInput,
      imagineStyle: this.styleInput,
      loading: true,
      firstImagine: null,
      imagineUserId: null,
      user: null,
      loadingText: null,
      failedMessage: null,
		};
	},
  watch: {
  },
	methods: {
    createPrompt() {
      console.log("lah why", this.categoryType)
      const category = this.categoryType
      const categoryInput = this.name
      const styleInput = this.imagineStyle
      const prompt = `Best ${category} ever for ${categoryInput}, ${styleInput}, vector, ui design, ux design, ux/ui, flat design, simple, elegant, trending, beautiful, clean background --v 4 --aspect 16:9`
      return prompt
    },
    reduceCredits() {
      this.$emit('updatecredits')
    },
    async startSession() {
      const endpoint = `${BACKEND_POOL_URL}/start_session`
      // Send a POST request
      const prompt = this.createPrompt()
      this.loadingText = 'Starting new session...'
      const response = await axios.post(endpoint, {
        email: this.user.email,
        prompt
      });
      this.$emit('sessionstarted', response?.data?.data?.user_id, this.categoryType, this.name, this.imagineStyle)
      // const response = await axios.get(endpoint, {});
      console.log("session started", response)
      if (response?.data?.status.toLowerCase() === 'pending') return null
      return response?.data?.data?.user_id
      // return new Promise((res,rej) => {
      //   setTimeout(() => {
      //     res("1f23d9b0-e7e1-403d-91c9-aea6e8c1376c")
      //   }, 1000, this)
      // })
    },
    async endSession(user_id, displayLoading=false) {
      // json={"user_id": user_id}
      if (!user_id) user_id = this.imagineUserId
      console.log("ending session")
      if (displayLoading) this.loading = true
      this.loadingText = 'Ending previous session...'
      let response = closeUserSession(user_id)
      localStorage.removeItem('imagineUserId')
      this.$emit('sessionupdated', user_id, 'ended', true)
      if (displayLoading) this.loading = false
      return response
      // return new Promise((res,rej) => {
      //   setTimeout(() => {
      //     if (displayLoading) this.loading = false
      //     res("Ok")
      //   }, 1000)
      // })
    },
    async imagineThePrompt(prompt, user_id) {
      console.log("imagine the prompt: ", prompt, user_id)
      // json={"prompt": prompt, "user_id": user_id}
      const endpoint = `${BACKEND_URL}/imagine`
      this.loadingText = `Imagining the prompt... This step may take some time.`
      return new Promise((resolve,reject) => {
        console.log("wait to imagine...")
        setTimeout(async () => {
          console.log("executing imagine...")
          this.loadingText = `Imagining the prompt... This step may take some time. Commencing generation process now`
          try {
            const response = await axios.post(endpoint, {
              prompt: prompt, user_id: user_id
            });
            console.log('imagine', response)
            this.$emit('sessionupdated', user_id, 'imagineUrl', response?.data?.url)
            this.reduceCredits()
            resolve(response?.data?.url)
          } catch (err) {
            console.log("should reject")
            alert('Something went wrong :(')
            reject(err)
          }
        }, 8500)
      })
      // return new Promise((res,rej) => {
      //   setTimeout(() => {
      //     const mock = "https://cdn.midjourney.com/be400788-d989-45e3-af34-d9d4a2f25aa1/grid_0.png"
      //     this.$emit('sessionupdated', user_id, 'imagineUrl', mock)
      //     this.loading = false
      //     res(mock)
      //   }, 1000, this)
      // })
    },
    async requestUpscale(image_number=1, user_id) {
      if (!user_id) user_id = this.imagineUserId
      this.loadingText = 'Upscaling selected image...'
      this.loading = true
      // this.reduceCredits()
      let url = new URLSearchParams()
      url.set('sessionId', user_id)
      url.set('cmd', 'upscale')
      url.set('imageNumber', image_number)
      window.location.assign('/customize?'+url)
      // return new Promise((res,rej) => {
      //   setTimeout(() => {
      //     const mock = "https://cdn.discordapp.com/attachments/1085124606383370310/1085125868734656532/paul_Best_Posters_ever_for_new_marvel_heroes_cute_cat_man_carto_483b22a5-5740-4d52-bb65-57bff7acc7fd.png"
      //     this.loading = false
      //     let url = new URLSearchParams()
      //     url.set('sessionId', user_id)
      //     url.set('cmd', 'upscale')
      //     url.set('imageNumber', image_number)
      //     window.location.assign('/customize?'+url)
      //     res(mock)
      //   }, 1000, this)
      // })
      // console.log(`Upscale quadrant ${image_number}`)
    },
    async requestVariation(image_number=1, user_id) {
      if (!user_id) user_id = this.imagineUserId
      this.loadingText = 'Variating selected image...'
      this.loading = true
      const endpoint = `${BACKEND_URL}/variation`
      console.log(`Variate quadrant ${image_number}`)
      const url = new URLSearchParams()
      url.set('sessionId', user_id)
      url.set('cmd', 'variate')
      url.set('imageNumber', image_number)
      window.location.assign('/customize?'+url)
      // return new Promise((res,rej) => {
      //   setTimeout(() => {
      //     const mock = "https://cdn.discordapp.com/attachments/1085124606383370310/1085125313115209778/paul_Best_Posters_ever_for_new_marvel_heroes_cute_cat_man_carto_55da9741-d958-4413-8d1e-1197d4991340.png"
      //     this.variatedImageUrl = mock
      //     const url = new URLSearchParams()
      //     url.set('sessionId', user_id)
      //     url.set('cmd', 'variate')
      //     url.set('imageNumber', image_number)
      //     window.location.assign('/customize?'+url)
      //     res(mock)
      //     this.loading = false
      //   }, 1000, false)
      // })
    },
    async returnHome() {
      const res = confirm('Are you sure you want to cancel this?')
      if (res) {
        const endSession = confirm('Would you like to end this session before closing? (if yes, you won\'t be able to modify the image anymore)')
        if (endSession) await this.endSession(this.userId, true);
        this.$emit('returnhome', true)
      }
    }
	},
});
