/* JS by Mamo YZ
https://mamoyz.com/ */
const baseApiUrl = "https://main.hypergraph.so/api";
const baseFrontendUrl =
  "https://main.hypergraph.so/editor/node";
// const baseApiUrl = "http://localhost:8080/api";
// const baseFrontendUrl = "http://localhost:3001/editor/node";
// Vue.use(VueTypedJs.VueTypedJs)

// const vueTypedJs = Vue.component('vue-typed-js', VueTypedJs.VueTypedJs);
function apiCall (code) {
  console.log("api called", code)
  alert('Calling our API! ' + code)
}

var app = new Vue({
  el: "#app",
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
    strings: [
      "design beautiful Logos",
      "design beautiful Flyers",
      "design beautiful Banners",
      "design beautiful Posters",
      "design beautiful Invitation cards",
      "design beautiful Business cards",
      "design beautiful Memes",
      "design beautiful Collages",
    ],
    // { "name": "Logos", "color": "#F44E3B", "background": "#FBE8A6" },
    // { "name": "Website Landing Pages", "color": "#34495E", "background": "#D1D8E0" },
    // { "name": "Flyers", "color": "#FFC300", "background": "#3498DB" },
    // { "name": "Banner", "color": "#F7DC6F", "background": "#27AE60" },
    // { "name": "Posters", "color": "#C0392B", "background": "#FADBD8" },
    // { "name": "Invitation cards", "color": "#8E44AD", "background": "#F5EEF8" },
    // { "name": "Business cards", "color": "#2E86C1", "background": "#D6EAF8" },
    // { "name": "Memes", "color": "#F5B041", "background": "#F9E79F" },
    // { "name": "Collages", "color": "#27AE60", "background": "#D4EFDF" }
    quickAcesses: [
      {
        "name": "Logos", "color": "#FFFFFF", "background": "#95D03A",
        "children": [
          {"name": "cartoonish", "color": "#FFFFFF", "background": "#95D03A"},
          { "name": "hand-drawn", "color": "#FFFFFF", "background": "#CB2027" },
          { "name": "minimalistic", "color": "#FFFFFF", "background": "#FFC107" },
          { "name": "abstract", "color": "#FFFFFF", "background": "#9C27B0" }
        ]
      },
      { "name": "Website Landing Pages", "color": "#FFFFFF", "background": "#CB2027",
        "children": [
          { "name": "cartoonish1", "color": "#FFFFFF", "background": "#95D03A", onClick: apiCall },
          { "name": "minimalistic1", "color": "#FFFFFF", "background": "#FFC107", onClick: apiCall },
          { "name": "abstract1", "color": "#FFFFFF", "background": "#9C27B0", onClick: apiCall }
        ]
      },
      { "name": "Flyers", "color": "#FFFFFF", "background": "#FFC107",
        "children": [
          {"name": "cartoonish2", "color": "#FFFFFF", "background": "#95D03A", onClick: apiCall},
          { "name": "hand-drawn2", "color": "#FFFFFF", "background": "#CB2027", onClick: apiCall },
          { "name": "abstract2", "color": "#FFFFFF", "background": "#9C27B0", onClick: apiCall }
        ]
      },
      { "name": "Banner", "color": "#FFFFFF", "background": "#9C27B0",
        "children": [
          {"name": "cartoonish3", "color": "#FFFFFF", "background": "#95D03A", onClick: apiCall},
          { "name": "minimalistic3", "color": "#FFFFFF", "background": "#FFC107", onClick: apiCall },
          { "name": "abstract3", "color": "#FFFFFF", "background": "#9C27B0", onClick: apiCall }
        ]
      },
      { "name": "Posters", "color": "#FFFFFF", "background": "#4CAF50",
        "children": [
          {"name": "cartoonish4", "color": "#FFFFFF", "background": "#95D03A", onClick: apiCall},
          { "name": "hand-drawn4", "color": "#FFFFFF", "background": "#CB2027", onClick: apiCall },
          { "name": "minimalistic4", "color": "#FFFFFF", "background": "#FFC107", onClick: apiCall }
        ]
      },
      { "name": "Invitation cards", "color": "#FFFFFF", "background": "#3F51B5",
        "children": [
          { "name": "hand-drawn5", "color": "#FFFFFF", "background": "#CB2027", onClick: apiCall },
          { "name": "minimalistic5", "color": "#FFFFFF", "background": "#FFC107", onClick: apiCall },
          { "name": "abstract5", "color": "#FFFFFF", "background": "#9C27B0", onClick: apiCall }
        ]
      },
      { "name": "Business cards", "color": "#FFFFFF", "background": "#FF5722",
        "children": [
          {"name": "cartoonish6", "color": "#FFFFFF", "background": "#95D03A", onClick: apiCall},
          { "name": "hand-drawn6", "color": "#FFFFFF", "background": "#CB2027", onClick: apiCall },
          { "name": "minimalistic6", "color": "#FFFFFF", "background": "#FFC107", onClick: apiCall },
          { "name": "abstract6", "color": "#FFFFFF", "background": "#9C27B0", onClick: apiCall }
        ]
      },
      { "name": "Memes", "color": "#FFFFFF", "background": "#E91E63",
        "children": [
          {"name": "cartoonish7", "color": "#FFFFFF", "background": "#95D03A", onClick: apiCall},
          { "name": "minimalistic7", "color": "#FFFFFF", "background": "#FFC107", onClick: apiCall },
          { "name": "hand-drawn7", "color": "#FFFFFF", "background": "#CB2027", onClick: apiCall },
          { "name": "abstract7", "color": "#FFFFFF", "background": "#9C27B0", onClick: apiCall }
        ]
      },
      { "name": "Collages", "color": "#FFFFFF", "background": "#00BCD4",
        "children": [
          { "name": "abstract8", "color": "#FFFFFF", "background": "#9C27B0", onClick: apiCall },
          { "name": "hand-drawn8", "color": "#FFFFFF", "background": "#CB2027", onClick: apiCall },
          {"name": "cartoonish8", "color": "#FFFFFF", "background": "#95D03A", onClick: apiCall},
          { "name": "minimalistic8", "color": "#FFFFFF", "background": "#FFC107", onClick: apiCall }
        ]
      }
    ],
    typedStrings: ['Click here to start your design now'],
    dummyResponse: [
      {
        title: "Bla bla bla 1",
        url: "https://google.com/1",
      },
      {
        title: "Bla bla bla 2",
        url: "https://google.com/2",
      },
      {
        title: "Bla bla bla 3",
        url: "https://google.com/3",
      },
      {
        title: "Bla bla bla 4",
        url: "https://google.com/4",
      },
      {
        title: "Bla bla bla 5",
        url: "https://google.com/5",
      },
    ],
    mainPlaceholder: true,
    mainTyped: null,
    childTyped: null,
    clickedQuickAccess: null, // track what button list should be shown
    previousClickedQuickAccess: null, // track previous clicked to reanimate when input focused/clicked
    childrenQuickAccess: null, // to separate between what text should be animated and what button list should be shown
    showQuickAccess: false,
    categoryInputted: null, 
  },
  methods: {
    /* Main function : Trigger search and show results */
    spanQuickAccess(idx) {
      this.inputPlaceholder = null
      this.clickedQuickAccess = idx + 1
      this.previousClickedQuickAccess = idx + 1
      const target = this.quickAcesses[idx]
      this.childrenQuickAccess = target.children
      if (target && target.children) {
        // this.childrenQuickAccess = target.children
        // this.$refs.keyword.setAttribute("placeholder", placeholder)
      }
    },
    onInputEnter() {
      this.categoryInputted = this.keyword
      this.showQuickAccess = true
      this.keyword = null
      const chosenCategory = this.quickAcesses[this.previousClickedQuickAccess - 1]?.name
      this.clickedQuickAccess = true
      const placeholder = `In what style would you like your ${chosenCategory} rendered in?`
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
      if(typeof quickAccess.onClick === 'function') quickAccess.onClick(quickAccess.name)
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
      } else {
        // inputDom.setAttribute('placeholder', this.typedStrings[0])
        this.clickedQuickAccess = null
        this.childrenQuickAccess = null
        this.mainPlaceholder = true
        this.showQuickAccess = false
        // if (typedDom[0]) typedDom[0].removeAttribute('hidden')
      }
    },
    clickedQuickAccess(newVal, oldVal) {
      if (newVal && typeof newVal !== 'boolean') {
        const placeholder = `What ${this.quickAcesses[newVal - 1].name}, would you like to design today? Eg pizza company, design studio company etc - Type it here`
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
    },
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
    /**
    particlesJS("particles-js", {
      particles: {
        number: {
          value: 125,
          density: {
            enable: false,
            value_area: 800,
          },
        },
        color: {
          value: "#000000",
        },
        shape: {
          type: "circle",
          stroke: {
            width: 0,
            color: "#000000",
          },
          polygon: {
            nb_sides: 5,
          },
          image: {
            src: "img/github.svg",
            width: 100,
            height: 100,
          },
        },
        opacity: {
          value: 0.5,
          random: false,
          anim: {
            enable: false,
            speed: 1,
            opacity_min: 0.1,
            sync: false,
          },
        },
        size: {
          value: 3,
          random: true,
          anim: {
            enable: false,
            speed: 40,
            size_min: 0.1,
            sync: false,
          },
        },
        line_linked: {
          enable: true,
          distance: 150,
          color: "#000000",
          opacity: 0.4,
          width: 1,
        },
        move: {
          enable: true,
          speed: 6,
          direction: "none",
          random: false,
          straight: false,
          out_mode: "out",
          bounce: false,
          attract: {
            enable: false,
            rotateX: 600,
            rotateY: 1200,
          },
        },
      },
      interactivity: {
        detect_on: "canvas",
        events: {
          onhover: {
            enable: false,
            mode: "repulse",
          },
          onclick: {
            enable: true,
            mode: "push",
          },
          resize: true,
        },
        modes: {
          grab: {
            distance: 400,
            line_linked: {
              opacity: 1,
            },
          },
          bubble: {
            distance: 400,
            size: 40,
            duration: 2,
            opacity: 8,
            speed: 3,
          },
          repulse: {
            distance: 200,
            duration: 0.4,
          },
          push: {
            particles_nb: 4,
          },
          remove: {
            particles_nb: 2,
          },
        },
      },
      retina_detect: true,
    });
     */
  },
});
