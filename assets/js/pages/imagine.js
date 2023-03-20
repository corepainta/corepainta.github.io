//'http://localhost:4001'

var Imagine = Vue.component("Imagine", {
  components : {
    'image-control': ImageControl,
    'image-loader': ImageLoader
  },
  props: ['category', 'categoryInput', 'styleInput', 'imagineUrl'],
	template: `
    <div class="customize">
      <div class="container header-margin">
        <div></div>
        <image-loader v-show="loading" :text="loadingText" :text2="loadingText2"/>
        <div v-show="!loading && ((imagineUserId && category) || imagineUrl)">
          <div>
          <div class="main-text" @click="resetTimer">Original:</div>
            <div class="mb-1">
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
    if (this.imagineUrl) {
      this.firstImagine = this.imagineUrl
    } else {
      try {
        this.loading = true
        const userId = await this.startSession()
        if (userId && userId.toLowerCase() === 'pending') {
          this.$emit('showpendingnotif')
        } else if (userId) {
          this.imagineUserId = userId
          localStorage.setItem('imagineUserId', userId)
          const imageUrl = await this.imagineThePrompt(prompt, userId)
          this.firstImagine = imageUrl
        }
      } catch (err) {
        console.error('Failed to imagine the prompt', err)
      } finally {
        this.loadingText = null
      }
    }
    this.loading = false
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
      loadingText2: null,
		};
	},
  watch: {
  },
	methods: {
    resetTimer() {
      this.$emit('resettimer', this.imagineUserId)
    },
    createPrompt() {
      const category = this.categoryType
      const categoryInput = this.name
      const styleInput = this.imagineStyle
      const prompt = `Best ${category} ever for ${categoryInput}, ${styleInput}, vector, ui design, ux design, ux/ui, flat design, simple, elegant, trending, beautiful, clean background --v 5 --aspect 16:9`
      return prompt
    },
    reduceCredits() {
      this.$emit('updatecredits')
    },
    async startSession() {
      const endpoint = `${BACKEND_POOL_URL}/start_session`
      // Send a POST request
      // const prompt = this.createPrompt()
      this.loadingText = 'Starting new session...'
      let result
      try {
        const response = await axios.post(endpoint, {
          user_id: this.user.uid,
          email: this.user.email,
          category: this.categoryType,
          category_input: this.name,
          chosen_style: this.imagineStyle,
          // prompt
        });
        // this.$emit('sessionstarted', response?.data?.data?.user_id, this.categoryType, this.name, this.imagineStyle)
        this.$emit('resettimer', response?.data?.data?.user_id)
        // const response = await axios.get(endpoint, {});
        console.log("session started", response)
        if (response?.data?.status.toLowerCase() === 'pending') return 'pending'
        result = response?.data?.data?.user_id
      } catch(err) {
        alert(err)
      }
      return result
      // return new Promise((res,rej) => {
      //   setTimeout(() => {
      //     const dummySession = '1cffea14-2652-4188-a523-8f73c2e21d05'
      //     res(dummySession)
      //     this.$emit('resettimer', dummySession)

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
      // this.$emit('sessionupdated', user_id, 'ended', true)
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
      const endpoint = `${BACKEND_POOL_URL}/imagine`
      this.loadingText = `Imagining... This step may take some time.`
      return new Promise((resolve,reject) => {
        console.log("wait to imagine...")
        setTimeout(async () => {
          console.log("executing imagine...")
          this.loadingText = 'Commencing generation process now.'
          try {
            const response = await axios.post(endpoint, {
              prompt: prompt, user_id: user_id
            });
            console.log('imagine', response)
            // this.$emit('sessionupdated', user_id, 'imagineUrl', response?.data?.url)
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
      //     const mock = "https://a.cdn-hotels.com/gdcs/production143/d1112/c4fedab1-4041-4db5-9245-97439472cf2c.jpg"
      //     // this.$emit('sessionupdated', user_id, 'imagineUrl', mock)
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
      this.resetTimer()
      window.location.assign('/customize?'+url)
    },
    async requestVariation(image_number=1, user_id) {
      if (!user_id) user_id = this.imagineUserId
      this.loadingText = 'Variating selected image...'
      this.loading = true
      console.log(`Variate quadrant ${image_number}`)
      const url = new URLSearchParams()
      url.set('sessionId', user_id)
      url.set('cmd', 'variate')
      url.set('imageNumber', image_number)
      this.resetTimer()
      window.location.assign('/customize?'+url)
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
