
var Customize = Vue.component("Customize", {
  components : {
    'image-control': ImageControl,
    'image-loader': ImageLoader
  },
  props: ['data'],
	template: `
    <div class="customize" @click="resetTimer">
      <div class="container header-margin wide">
        <div></div>
        <image-loader  v-show="loading" :text="loadingText"/>
        <div v-show="!loading" class="tab-view">
          <div class="side-bar">
            <div class="flex mb-1">
              <div class="main-text">Original:</div>
              <div class="">
                {{data?.category}}, {{data?.categoryInput}}, {{data?.styleInput}}
              </div>
            </div>
            <div>
              <div class="tab-item" @click="changePreview('imagine')">
                <image-control
                  :imageUrl="firstImagine"
                  :showVariation="!hasRequestVariation"
                  :showUpscale="!hasRequestUpscale"
                  :onRequestVaration="requestVariation"
                  :onRequestUpscale="requestUpscale"
                  :sm="true"
                />
              </div>
              <div v-if="hasRequestUpscale" class="tab-item">
                <h4 class="imagine-title">Upscaled Image {{hasRequestUpscale}}</h4>
                <img :src="upscaledImageUrl || 'assets/img/painter.png'" class="imagine-img" alt="upscaling" @click="changePreview('upscale')">
              </div>
              <div v-if="hasRequestVariation" class="tab-item">
                <h4 class="imagine-title">Variated Image {{hasRequestVariation}}</h4>
                <img :src="variatedImageUrl || 'assets/img/painter.png'" class="imagine-img" alt="variating"  @click="changePreview('variate')">
              </div>
            </div>
          </div>
          <div v-if="hasRequestUpscale || hasRequestVariation" class="tab-preview">
            <div class="imagine-title main-text">{{previewImageText}} Image</div>
            <img :src="previewImage || 'assets/img/painter.png'" class="imagine-img" alt="upscaling">
          </div>
        </div>
      </div>
    </div>
  `,
	async mounted() {
    const params = new URLSearchParams(window.location.search);
    this.sessionId = params.get("sessionId")
    this.cmd = params.get("cmd")
    this.imageNumber = params.get("imageNumber")

    this.firstImagine = this.data?.imagineUrl
    this.variatedImageUrl = this.data?.variateUrl
    this.upscaledImageUrl = this.data?.upscaleUrl
    if (this.upscaledImageUrl) this.changePreview('upscale')
    if (this.variatedImageUrl) this.changePreview('variate')
    this.hasRequestUpscale = this.data?.upscaledImage
    this.hasRequestVariation = this.data?.variatedImage

    /** if no existing variate or upscale in firebase, hit the API */
    if (this.cmd === 'variate' && !this.variatedImageUrl) {
      try {
        this.loading = true
        localStorage.setItem('imagineUserId', this.sessionId)
        const imageUrl = await this.requestVariation(this.imageNumber, this.sessionId)
        this.variatedImageUrl = imageUrl
      } catch (err) {
        console.error('Failed to variate', err)
      } finally {
        this.loadingText = null
        this.loading = false
      }
    } else if (this.cmd === 'upscale' && !this.upscaledImageUrl) {
      try {
        this.loading = true
        localStorage.setItem('imagineUserId', this.sessionId)
        const imageUrl = await this.requestUpscale(this.imageNumber, this.sessionId)
        this.upscaledImageUrl = imageUrl
      } catch (err) {
        console.error('Failed to upscale the prompt', err)
      } finally {
        this.loadingText = null
        this.loading = false
      }
    }
    const userInfo = localStorage.getItem('userInfo')
    if (userInfo) this.user = JSON.parse(userInfo)
    this.loading = false
	},
	beforeDestroy() {
		$(window).unbind("scroll");
	},
	data() {
		return {
      disableInput: false,
      categoryType: this.category,
      name: this.categoryInput,
      imagineStyle: this.styleInput,
      loading: true,
      firstImagine: null,
      hasRequestUpscale: 0,
      hasRequestVariation: 0,
      customizeList: [], // { type: 'variate', imageNumber: 1, url: '' }
      imagineUserId: null,
      user: null,
      loadingText: null,
      upscaledImageUrl: null,
      variatedImageUrl: null,
      isTabView: false,
      previewImage: null,
      previewImageText: null,
      sessionId: null,
      cmd: null,
      imageNumber: null
		};
	},
  watch: {
    data(newVal, oldVal) {
      if (newVal) this.firstImagine = newVal.imagineUrl
    },
    hasRequestUpscale(newVal, oldVal) {
      this.isTabView = this.checkTabView()
      if (newVal && this.hasRequestVariation) {
        this.loading = true
        console.log("is it here?", newVal)
        this.endSession()
          .catch(err => alert(`${err}`))
          .finally(() => this.loading = false)
      }
    },
    hasRequestVariation(newVal, oldVal) {
      this.isTabView = this.checkTabView()
      if (newVal && this.hasRequestUpscale) {
        this.loading = true
        console.log("is it here 2?")
        this.endSession()
          .catch(err => alert(`${err}`))
          .finally(() => this.loading = false)
      }
    },
    firstImagine(newVal, oldVal) {
      this.isTabView = this.checkTabView()
    },
    upscaledImageUrl(newVal) {
      this.previewImage = newVal
      this.previewImageText = 'Upscaled'
    },
    variatedImageUrl(newVal) {
      this.previewImage = newVal
      this.previewImageText = 'Variated'
    }
  },
	methods: {
    resetTimer() {
      this.$emit('resettimer', this.imagineUserId)
    },
    changePreview(type) {
      if (type === 'variate') {
        this.previewImage = this.variatedImageUrl
        this.previewImageText = 'Variated'
      } else if (type === 'upscale') {
        this.previewImage = this.upscaledImageUrl
        this.previewImageText = 'Upscaled'
      } else if (type === 'imagine') {
        this.previewImage = this.firstImagine
        this.previewImageText = 'Original'
      }
    },
    checkTabView() {
      return this.firstImagine && ((this.hasRequestUpscale || this.hasRequestVariation))
    },
    inputClicked() {

    },
    onInputEnter() {

    },
    reduceCredits() {
      this.$emit('updatecredits')
    },
    // async startSession() {
    //   const endpoint = `${BACKEND_POOL_URL}/start_session`
    //   // Send a POST request
    //   this.loadingText = 'Starting new session...'
    //   // const response = await axios.post(endpoint, {
    //   //   email: this.user.email,
    //   //   prompt
    //   // });
    //   // this.$emit('sessionstarted', response?.data?.data?.user_id)
    //   // const response = await axios.get(endpoint, {});
    //   // console.log("session started", response)
    //   // return response?.data?.data?.user_id
    //   return new Promise((res,rej) => {
    //     setTimeout(() => {
    //       const dummySession = "478a7096-62bf-4bc8-9734-5fcb6ba145ad"
    //       res(dummySession)
    //       this.$emit('sessionstarted', dummySession)
    //     }, 1000, this)
    //   })
    // },
    async endSession(user_id, displayLoading=false) {
      // json={"user_id": user_id}
      if (!user_id) user_id = this.sessionId
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
      //     this.$emit('sessionupdated', user_id, 'ended', true)
      //     res("Ok")
      //   }, 1000)
      // })
    },
    async requestUpscale(imageNumber=1, user_id) {
      if (!user_id) user_id = this.sessionId
      this.loadingText = 'Upscaling selected image...'
      this.loading = true
      const endpoint = `${BACKEND_POOL_URL}/upscale`
      const response = await axios.post(endpoint, {
        image_number: imageNumber - 1, user_id
      });
      this.reduceCredits()
      this.hasRequestUpscale = imageNumber
      this.upscaledImageUrl = response?.data?.url
      // this.$emit('sessionupdated', user_id, 'upscaleUrl', response?.data?.url)
      // this.$emit('sessionupdated', user_id, 'upscaledImage', imageNumber)
      this.customizeList = [...this.customizeList, { type: 'Upscaled', imageNumber, url: response?.data?.url }]
      this.loading = false
      return response?.data?.url
      // return new Promise((res,rej) => {
      //   setTimeout(() => {
      //     const mock = "https://cdn.midjourney.com/be400788-d989-45e3-af34-d9d4a2f25aa1/grid_0.png"
      //     // this.$emit('sessionupdated', user_id, 'variateUrl', mock)
      //     // this.$emit('sessionupdated', user_id, 'upscaledImage', imageNumber)
      //     this.hasRequestUpscale = imageNumber
      //     this.upscaledImageUrl = mock
      //     this.customizeList = [...this.customizeList, { type: 'Upscaled', imageNumber, url: mock }]
      //     this.loading = false
      //     res(mock)
      //   }, 1000, this)
      // })
      // console.log(`Upscale quadrant ${imageNumber}`)
    },
    async requestVariation(imageNumber=1, user_id) {
      if (!user_id) user_id = this.sessionId
      this.loadingText = 'Variating selected image...'
      this.loading = true
      const endpoint = `${BACKEND_POOL_URL}/variation`
      console.log(`Variate quadrant ${imageNumber}`)
      const response = await axios.post(endpoint, {
        image_number: imageNumber - 1, user_id
      });
      this.reduceCredits()
      this.hasRequestVariation = imageNumber
      this.variatedImageUrl = response?.data?.url
      this.$emit('sessionupdated', user_id, 'variateUrl', response?.data?.url)
      this.$emit('sessionupdated', user_id, 'variatedImage', imageNumber)
      this.customizeList = [...this.customizeList, { type: 'Variated', imageNumber, url: response?.data?.url }]
      this.loading = false
      return response?.data?.url
      // return new Promise((res,rej) => {
      //   setTimeout(() => {
      //     // const mock = "https://www.water-sports-bali.com/wp-content/uploads/2021/09/20-Best-Places-To-Visit-In-Bali-Feature-Image.jpg"
      //     const mock = "https://cdn.discordapp.com/attachments/1087380953430765691/1087381879721832538/paul_Best_Posters_ever_for_tesla_truck_running_from_catastrophi_ef2485b2-edca-4816-a764-27f74d118b81.png"
      //     this.hasRequestVariation = imageNumber
      //     this.customizeList = [...this.customizeList, { type: 'Variated', imageNumber, url: mock }]
      //     this.variatedImageUrl = mock
      //     res(mock)
      //     this.loading = false
      //   }, 1000, false)
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
        const endSession = confirm('Would you like to end this session before closing? (if yes, you won\'t be able to modify the image anymore)')
        if (endSession) await this.endSession(this.userId, true);
        this.$emit('returnhome', true)
      }
    }
	},
});
