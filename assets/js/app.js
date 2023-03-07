/* JS by Mamo YZ
https://mamoyz.com/ */
const baseApiUrl = "https://main.hypergraph.so/api";
const baseFrontendUrl =
  "https://main.hypergraph.so/editor/node";
// const baseApiUrl = "http://localhost:8080/api";
// const baseFrontendUrl = "http://localhost:3001/editor/node";
// Vue.use(VueTypedJs.VueTypedJs)

// const vueTypedJs = Vue.component('vue-typed-js', VueTypedJs.VueTypedJs);

// const routes = [
// 	{ 
// 		path: "/customize", 
// 		component: Customize, 
// 		name: "customize" 
// 	},
// ]

// const router = new VueRouter({
// 	routes,
// 	mode: "history",
// });
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.17.2/firebase-app.js'
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-analytics.js";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/9.17.2/firebase-auth.js";
import {
  getFirestore,
  // collection,
  // addDoc,
  // getDocs,
  setDoc,
  doc,
  getDoc,
  updateDoc,
} from 'https://www.gstatic.com/firebasejs/9.17.2/firebase-firestore.js'

// 9.6.5
// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAKW7SsTSCvAPGJuou5voQln5cn39RJYzg",
  authDomain: "painta-9df83.firebaseapp.com",
  projectId: "painta-9df83",
  storageBucket: "painta-9df83.appspot.com",
  messagingSenderId: "331286606214",
  appId: "1:331286606214:web:6f36d111e79a8d1acdbc07",
  measurementId: "G-VMJHBZGRY3"
};

var firebase = initializeApp(firebaseConfig);
var analytics = getAnalytics(app);
var auth = getAuth(firebase);
var db = getFirestore(app);

var app = new Vue({
  el: "#app",
  components: {
    'customize-section': Customize,
    'imagine-image': Imagine
  },
  data: {
    currentItem: 0,
    keyword: null,
    results: null,
    formDirty: false,
    searching: false,
    loading: false,
    inputPlaceholder: null,
    typedConfig: {
      typeSpeed: 80,
      backSpeed: 30,
      contentType: "html",
    },
    strings: TITLE_STRINGS,
    quickAccesses: QUICK_ACCESS,
    typedStrings: ['Click here to start your design now'],
    dummyResponse: DUMMY_RESPONSES,
    mainPlaceholder: true,
    mainTyped: null,
    childTyped: null,
    clickedQuickAccess: null, // track what button list should be shown
    previousClickedQuickAccess: null, // track previous clicked to reanimate when input focused/clicked
    childrenQuickAccess: null, // to separate between what text should be animated and what button list should be shown
    showQuickAccess: false,
    categoryInputted: null,
    disableInput: false,
    chosenStyle: null,

    // customize section
    isCustomizeSection: false,
    showLoginForm: false,
    isLogin: false,
    user: null,
  },
  methods: {
    resetState() {
      const imagineUserId = localStorage.getItem('imagineUserId')
      if(imagineUserId && this.isCustomizeSection) {
        this.endSession(imagineUserId)
      }

      this.currentItem = 0
      this.keyword = null
      this.results = null
      this.formDirty = false
      this.searching = false
      this.loading = false
      this.inputPlaceholder = null
      this.mainPlaceholder = true
      this.mainTyped = null
      this.childTyped = null
      this.clickedQuickAccess = null // track what button list should be shown
      this.previousClickedQuickAccess = null // track previous clicked to reanimate when input focused/clicked
      this.childrenQuickAccess = null // to separate between what text should be animated and what button list should be shown
      this.showQuickAccess = false
      this.categoryInputted = null
      this.disableInput = false
      this.chosenStyle = null
      this.isCustomizeSection = false
      this.showLoginForm = false
    },
    /* Main function : Trigger search and show results */
    spanQuickAccess(idx) {
      this.inputPlaceholder = null
      this.clickedQuickAccess = idx + 1
      this.previousClickedQuickAccess = idx + 1
      const target = this.quickAccesses[idx]
      this.childrenQuickAccess = target.children
      this.$refs.keyword.click()
      this.$refs.keyword.focus()
      if (target && target.children) {
        // this.childrenQuickAccess = target.children
        // this.$refs.keyword.setAttribute("placeholder", placeholder)
      }
    },
    onInputEnter() {
      this.categoryInputted = this.keyword
      this.showQuickAccess = true
      this.keyword = null
      const chosenCategory = this.quickAccesses[this.previousClickedQuickAccess - 1]?.name
      this.clickedQuickAccess = true
      const placeholder = `In what style would you like your ${chosenCategory} rendered in?`
      this.disableInput = true
      this.keyword = null
      setTimeout(() => {
        this.childTyped = new Typed(".typed-placeholder-child-1", {
          ...this.typedConfig,
          stringsElement: 'child-1',
          strings: [placeholder],
          typeSpeed: 20,
          loop: false
        })
      }, 200)
    },
    searchChangeHandler() {
      if (this.keyword && this.keyword.length > 2) {
        /* Trigger Search when the keyword lenght is 3 or bigger */
        this.formDirty = true;
        /* Set Loading to true */
        this.loading = true;
        /* Do AJAX Call here and put results as JSON to this.results */
        axios({
          method: "post",
          headers: { "Content-Type": "application/json" },
          url: `${baseApiUrl}/get_public_identities`,
          data: {
            searchTerm: this.keyword,
          },
        }).then((response) => {
          setTimeout(() => {
            /* Search Results */
            this.results = response.data;
            /* Set Search suggestions */
            // this.suggestions = response.data;
            /* Set Loading back to false again */
            this.loading = false;

            /* Set selected item back to first one again */
            this.currentItem = 0;
          }, 1000);
        });
      } else {
        this.formDirty = false;
      }
    },
    /* Modify URL */
    getUrl({ id, identity_name }) {
      if (id && identity_name) {
        return `${baseFrontendUrl}/${id}/${this.slugify(identity_name)}`;
      }
      return "";
    },
    /* Reset search and close search box */
    cancelSearchHandler() {
      this.keyword = null;
      this.searching = false;
      // this.suggestions = null;
      this.results = null;
      this.currentItem = 0;
    },
    // handle signup
    submitSignUp() {
      // handle signup
    },
    slideClickHandler(e) {
      this.slideToSection(1);
    },
    slideWheelHandler(e) {
      if (e.wheelDelta > 0 || e.detail < 0) {
      } else {
        e.preventDefault();
        this.slideToSection(1);
      }
    },
    slideToSection(index) {
      /**
      $("body,html")
        .stop()
        .animate(
          // Slide to next section
          {
            scrollTop: $("section").eq(index).offset().top,
          },
          1500
        );
       */
    },
    /* Highligh search results on "Keyboard UP" and "Keyboard DOWN" presser */
    nextItem(e) {
      if (this.searching) {
        e.preventDefault();
        if (e.keyCode == 38) {
          if (this.currentItem == 0) return false;
          this.currentItem--;
        } else if (e.keyCode == 40) {
          if (this.currentItem == this.results.length - 1) return false;
          this.currentItem++;
        }
      }
    },
    setCurrentItem(index) {
      this.currentItem = index;
    },
    /* Slugify your string. Eg: 'Sarthak Joshi**' => 'sarthak-joshi' */
    slugify(string) {
      const a =
        "àáâäæãåāăąçćčđďèéêëēėęěğǵḧîïíīįìłḿñńǹňôöòóœøōõőṕŕřßśšşșťțûüùúūǘůűųẃẍÿýžźż·/_,:;";
      const b =
        "aaaaaaaaaacccddeeeeeeeegghiiiiiilmnnnnoooooooooprrsssssttuuuuuuuuuwxyyzzz------";
      const p = new RegExp(a.split("").join("|"), "g");

      return string
        .toString()
        .toLowerCase()
        .replace(/\s+/g, "-") // Replace spaces with -
        .replace(p, (c) => b.charAt(a.indexOf(c))) // Replace special characters
        .replace(/&/g, "-and-") // Replace & with 'and'
        .replace(/[^\w\-]+/g, "") // Remove all non-word characters
        .replace(/\-\-+/g, "-") // Replace multiple - with single -
        .replace(/^-+/, "") // Trim - from start of text
        .replace(/-+$/, ""); // Trim - from end of text
    },
    inputClicked() {
      this.searching = true
      this.clickedQuickAccess = null
    },
    /** on click the typing animation inside the text input */
    onTypedClick() {
      this.inputClicked()
      // inputDom.setAttribute('placeholder', '')
      // typedDom[0].setAttribute('hidden', true)
      // this.$refs.keyword.focus()
    },
    quickAccessAction(quickAccess) {
      if(this.childTyped) this.childTyped.destroy()
      // if(!this.clickedQuickAccess && this.previousClickedQuickAccess) this.clickedQuickAccess = true
      
      // const placeholder = `In what style would you like your ${quickAccess.name} rendered in?`
      // this.keyword = null
      // setTimeout(() => {
      //   this.childTyped = new Typed(".typed-placeholder-child-1", {
      //     ...this.typedConfig,
      //     stringsElement: 'child-1',
      //     strings: [placeholder],
      //     typeSpeed: 20,
      //     loop: false
      //   })
      // }, 200)
      this.chosenStyle = quickAccess.name
      // const category = this.quickAccesses[this.previousClickedQuickAccess - 1] || {}
      if(!this.isLogin) {
        // quickAccess.onClick(category.name, this.categoryInputted, quickAccess.name)
        this.showLoginForm = true
      } else if(typeof quickAccess.onClick === 'function') {
        this.isCustomizeSection = true
      }
    },

    // AUTH
    signInWithGoogle() {
      // Create a new Google auth provider
      const provider = new GoogleAuthProvider();

      // Sign in with Google using a popup window
      signInWithPopup(auth, provider)
        .catch(error => {
          console.error(error);
        });
    },
    signOut() {
      // Sign out the current user
      signOut(auth)
        .catch(error => {
          console.error(error);
        });
    },
    async checkAndCreateUser(userInfo) {
      const docRef = doc(db, "user", userInfo.uid);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        const data = docSnap.data()
        localStorage.setItem('userInfo', {...userInfo, imagineCredits: data.imagineCredits})
        this.user = {...userInfo, imagineCredits: data.imagineCredits}
      } else {
        // doc.data() will be undefined in this case
        console.warn("No such document!");
        await this.createUser(userInfo)
      }
    },
    async createUser(data) {
      try {
        if (!data.uid) throw 'uid is required'
        data.imagineCredits = 20
        // const docRef = await addDoc(collection(db, "users"), {
        //   first: "Ada",
        //   last: "Lovelace",
        //   born: 1815
        // });
        const payload = {
          displayName: data.displayName || '',
          email: data.email || '',
          emailVerified: data.emailVerified || false,
          isAnonymous: data.isAnonymous || true,
          lastLogin: data.lastLogin || null,
          phoneNumber: data?.providerData?.phoneNumber || null,
          imagineCredits: 20,
        }
        const result = await setDoc(doc(db, "user", data.uid), payload);
        console.log("User document written with ID: ", result);
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    },
    onUpdateCredits() {
      const savedStorage = JSON.parse(localStorage.getItem('userInfo') || '{}')
      const initialCredit = Number(this.user?.imagineCredits) || Number(savedStorage.imagineCredits)
      const newCredits = Math.max((initialCredit || 0) - 1, 0)
      console.log("newCredits", newCredits)
      localStorage.setItem('userInfo', {
        ...savedStorage,
        imagineCredits: newCredits
      })
      const payload = {
        imagineCredits: newCredits,
      }
      this.user = {...this.user, imagineCredits: newCredits}
      // Atomically increment the population of the city by 50.
      const userRef = doc(db, "user", this.user?.uid);
      updateDoc(userRef, payload).then(res=> {
        console.log("succesfully reduced")
      }).catch(err => {
        console.error(err)
      })
    },
    async endSession(user_id, displayLoading=false) {
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
  },
  /* Watch changes on search input  */

  watch: {
    keyword: _.debounce(function (newVal, oldVal) {
      // this.searchChangeHandler();
    }, 500),
    searching(value, oldValue) {
      // const inputDom = document.getElementById('keyword');
      // const typedDom = document.getElementsByClassName('search-with-typed');
      if (value) {
        // inputDom.setAttribute('placeholder', '')
        // typedDom[0].setAttribute('hidden', true)
        this.mainPlaceholder = false
        this.clickedQuickAccess = false
        this.inputPlaceholder = 'What would you like to design today?'
        this.disableInput = true
      } else {
        // inputDom.setAttribute('placeholder', this.typedStrings[0])
        this.clickedQuickAccess = null
        this.childrenQuickAccess = null
        this.mainPlaceholder = true
        this.showQuickAccess = false
        this.inputPlaceholder = null
        this.disableInput = false
        // if (typedDom[0]) typedDom[0].removeAttribute('hidden')
      }
    },
    clickedQuickAccess(newVal, oldVal) {
      if (newVal && typeof newVal !== 'boolean') {
        const data = this.quickAccesses[newVal - 1]
        const placeholder = `What ${data.name}, would you like to design today? Eg ${data.examples} etc - Type it here`
        this.disableInput = false
        this.keyword = null
        setTimeout(() => {
          this.childTyped = new Typed(".typed-placeholder-child-1", {
            ...this.typedConfig,
            stringsElement: 'child-1',
            strings: [placeholder],
            typeSpeed: 20,
            loop: false
          })
        }, 100)
      } else if (this.childTyped) {
        // this.$refs.secondTyped.setAttribute('hidden', true)
        this.childTyped.destroy()
      }
    },
    mainPlaceholder(newVal, oldVal) {
      if (newVal) {
        setTimeout(() => {
          this.mainTyped = new Typed(".typed-placeholder", {
            ...this.typedConfig,
            strings: [this.typedStrings[0]],
            loop: false
          })
          new Typed(".typed", {
            strings: this.strings,
            loop: true,
            backDelay: 1000,
            ...this.typedConfig,
          });
        }, 200)
      } else if (this.mainTyped) {
        this.mainTyped.destroy()
      }
    }
  },
  mounted() {
    document.addEventListener("keyup", this.nextItem);
    $(window).scroll(function () {
      if ($(window).innerWidth() > 1023) {
        if ($(".main").offset()) {
          $(window).scrollTop() > $(".main").offset().top - 20
            ? $("header, .header-search-box").fadeIn(300)
            : $("header, .header-search-box").fadeOut(300);
        }
      }
    });

    let typed = new Typed(".typed", {
      strings: this.strings,
      loop: true,
      backDelay: 1000,
      ...this.typedConfig,
    });
    new Typed(".typed-placeholder", {
      ...this.typedConfig,
      strings: [this.typedStrings[0]],
      loop: false
    })
    onAuthStateChanged(auth, user => {
        console.log("on Auth Change", user, this.searching, this.isLogin)
        if (user) {
        // User is signed in
        this.isLogin = true
        if (this.searching && this.chosenStyle) {
          this.showLoginForm = false
          this.isCustomizeSection = true
        }
        this.checkAndCreateUser(user)
      } else {
        // User is signed out
        this.user = null
        this.isLogin = false
        localStorage.removeItem('userInfo')
      }
    });
    /**
    particlesJS("particles-js", PARTICLES_OPTIONS);
     */
  },
});
