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
        <image-loader v-show="loading" :text="loadingText" :text2="loadingText2" :source="imageSource"/>
        <div v-show="!loading && ((imagineUserId && category) || imagineUrl)">
          <div>
            <div class="flex space-between">
              <div>
                <div class="main-text" @click="resetTimer">Original:</div>
                <div class="mb-1">
                  {{category}}, {{categoryInput}}, {{styleInput}}
                </div>
              </div>
              <div>
                <button @click="redoDesign" class="pointer bg-green2 box-shadow">Not happy with the design? - try again!</button>
              </div>
            </div>
            <div>
              <image-control
                :imageUrl="firstImagine"
                :onRequestVaration="requestVariation"
                :onRequestUpscale="requestUpscale"
                :hideSectionUpscale="hideSectionUpscale"
                :showVariation="false"
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
    // const existingUser = localStorage.getItem('imagineUserId')
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
        // let userId = localStorage.getItem('imagineUserId')
        const response = await this.imagineThePrompt(prompt)
        const imageUrl = response?.url
        this.imagineUserId = response?.imagine_id
        let imagineId = response?.imagine_id

        if (response && response?.status?.toLowerCase() === 'pending') {
          this.$emit('showpendingnotif')
        } else if (imagineId) {
          this.$emit('resettimer', imagineId)
          localStorage.setItem('imagineUserId', imagineId)
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
      hideSectionUpscale: [],
      imageSource: null
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
      this.loadingText = 'Starting new session... Note this might take a while!'
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
        console.log("session started", response)
        if (response?.data?.status.toLowerCase() === 'pending') return 'pending'
        result = response?.data?.data?.user_id
      } catch(err) {
        console.error(err)
        this.$emit("showalert", 'Something went wrong :(', '')
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
    async imagineThePrompt(prompt) {
      console.log("imagine the prompt: ", prompt)
      const endpoint = `${BACKEND_POOL_URL}/imagine`
      this.loadingText = `Imagining... This step may take some time.`
      return new Promise(async (resolve,reject) => {
        console.log("wait to imagine...")
        this.loadingText = 'Commencing generation process now.'
        setTimeout(async () => {
          this.loadingText = "We will email you when it's ready."
          this.loadingText2 = MESSAGES.WILL_EMAIL_2
          this.imageSource = 'assets/img/email.png'
        }, 5000, this)
          console.log("executing imagine...")
          
          try {
            const response = await axios.post(endpoint, {
              user_id: this.user.uid,
              email: this.user.email,
              category: this.categoryType,
              category_input: this.name,
              chosen_style: this.imagineStyle,
                // prompt
            });
            // this.$emit('sessionupdated', user_id, 'imagineUrl', response?.data?.url)
            this.reduceCredits()
            resolve(response?.data)
          } catch (err) {
            console.error(err)
            this.$emit("showalert", 'Something went wrong :(', '')
            reject(err)
          }
      })
      // return new Promise((res,rej) => {
      //   setTimeout(() => {
      //     const mock = "https://cdn.discordapp.com/attachments/1087900091915964507/1087970128903282728/paulie3000_3740ba1a-3861-473f-aab6-5e894cfedafe_Best_Posters_ev_d58c02e8-da89-4ab5-a7a3-c3bd3cd4e393.png"
      //     // this.$emit('sessionupdated', user_id, 'imagineUrl', mock)
      //     this.loading = false
      //     res({url: mock, imagine_id: 'lalala'})
      //   }, 1000, this)
      // })
    },
    getCredits() {
      const userStorage = localStorage.getItem('userInfo')
      const userObj = JSON.parse(userStorage)
      return userObj.imagineCredits || 0 
    },
    async requestUpscale(image_number=1, imagineId) {
      if (!imagineId) imagineId = this.imagineUserId
      // this.reduceCredits()
      const credits = this.getCredits()
      if (credits > 0) {
        this.loadingText = 'Upscaling selected image...'
        this.loading = true
        let url = new URLSearchParams()
        url.set('imagineId', imagineId)
        url.set('cmd', 'upscale')
        url.set('imageNumber', image_number)
        this.resetTimer()
        window.location.assign('/customize?'+url)
      } else {
        this.$emit("showalert", 'No Credits', MESSAGES.NO_CREDIT)
      }
    },
    async requestVariation(image_number=1, imagineId) {
      if (!imagineId) imagineId = this.imagineUserId
      const credits = this.getCredits()
      if (credits) {
        this.loadingText = 'Variating selected image...'
        this.loading = true
        console.log(`Variate quadrant ${image_number}`)
        const url = new URLSearchParams()
        url.set('imagineId', imagineId)
        url.set('cmd', 'variate')
        url.set('imageNumber', image_number)
        this.resetTimer()
        window.location.assign('/customize?'+url)
      } else {
        this.$emit("showalert", 'No Credits', MESSAGES.NO_CREDIT)
      }
    },
    async returnHome() {
      const res = confirm('Are you sure you want to cancel this?')
      if (res) {
        // const endSession = confirm('Would you like to end this session before closing? (if yes, you won\'t be able to modify the image anymore)')
        // if (endSession) await this.endSession(this.userId, true);
        this.$emit('returnhome', true)
      }
    },
    redoDesign() {
      window.location.reload()
    }
	},
});
