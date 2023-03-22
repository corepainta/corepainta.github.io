var TITLE_STRINGS = [
  "design beautiful Logos",
  "design beautiful Flyers",
  "design beautiful Banners",
  "design beautiful Posters",
  "design beautiful Invitation cards",
  "design beautiful Business cards",
  "design beautiful Memes",
  "design beautiful Collages",
]


const BACKEND_URL = 'https://app.painta.io'
const BACKEND_POOL_URL = 'https://app.painta.io/queue'
// const BACKEND_POOL_URL = 'http://localhost:4001'

const MESSAGES = {
  WILL_EMAIL_1: "We will email you when your design is ready.",
  WILL_EMAIL_2: "Alternatively come back here in a couple of minutes.",
  NO_IMAGINE_PARAMS: 'Not enough parameters to imagine the prompt.',
  NO_CREDIT: 'You are running out of credits :(',
  NO_CUSTOMIZE_PARAMS: 'Not enough parameters. Valid session is required.',
}

function apiCall (type, name, code) {
  console.log("api called", code)
  alert(`Calling our API type: ${type}, with name: ${name}, and style: ${code}`)
}

var QUICK_ACCESS = [
  {
    "name": "Logos",
    "color": "#FFFFFF",
    "background": "#95D03A",
    "examples": "Pizza logo, farm company",
    "children": [
      { "name": "cartoonish", "color": "#FFFFFF", "background": "#95D03A", onClick: apiCall},
      { "name": "hand-drawn", "color": "#FFFFFF", "background": "#CB2027", onClick: apiCall },
      { "name": "minimalistic", "color": "#FFFFFF", "background": "#FFC107", onClick: apiCall },
      { "name": "abstract", "color": "#FFFFFF", "background": "#9C27B0", onClick: apiCall },
      { "name": "retro", "color": "#FFFFFF", "background": "#4287f5", onClick: apiCall },
      { "name": "realistic", "color": "#FFFFFF", "background": "#4d87c5", onClick: apiCall },
      { "name": "3D", "color": "#FFFFFF", "background": "#8742f5", onClick: apiCall },
      { "name": "vintage", "color": "#FFFFFF", "background": "#c842f5", onClick: apiCall },
      { "name": "professional", "color": "#FFFFFF", "background": "#5f97c2", onClick: apiCall },
      { "name": "dark", "color": "#FFFFFF", "background": "#424c54", onClick: apiCall },
      { "name": "monochromatic", "color": "#FFFFFF", "background": "#6dc761", onClick: apiCall },
      { "name": "gothic", "color": "#FFFFFF", "background": "#c7a561", onClick: apiCall },
      { "name": "urban", "color": "#FFFFFF", "background": "#e66355", onClick: apiCall },
      { "name": "geometric", "color": "#FFFFFF", "background": "#55e6aa", onClick: apiCall },
      { "name": "whimsical", "color": "#FFFFFF", "background": "#db488f", onClick: apiCall },
    ]
  },
  { "name": "Website Landing Pages",
    "color": "#FFFFFF",
    "background": "#CB2027",
    "examples": "Software company, candy company",
    "children": [
      { "name": "cartoonish", "color": "#FFFFFF", "background": "#95D03A", onClick: apiCall},
      { "name": "hand-drawn", "color": "#FFFFFF", "background": "#CB2027", onClick: apiCall },
      { "name": "minimalistic", "color": "#FFFFFF", "background": "#FFC107", onClick: apiCall },
      { "name": "abstract", "color": "#FFFFFF", "background": "#9C27B0", onClick: apiCall },
      { "name": "retro", "color": "#FFFFFF", "background": "#4287f5", onClick: apiCall },
      { "name": "realistic", "color": "#FFFFFF", "background": "#4287f5", onClick: apiCall },
      { "name": "3D", "color": "#FFFFFF", "background": "#8742f5", onClick: apiCall },
      { "name": "vintage", "color": "#FFFFFF", "background": "#c842f5", onClick: apiCall },
      { "name": "professional", "color": "#FFFFFF", "background": "#5f97c2", onClick: apiCall },
      { "name": "dark", "color": "#FFFFFF", "background": "#424c54", onClick: apiCall },
      { "name": "monochromatic", "color": "#FFFFFF", "background": "#6dc761", onClick: apiCall },
      { "name": "gothic", "color": "#FFFFFF", "background": "#c7a561", onClick: apiCall },
      { "name": "urban", "color": "#FFFFFF", "background": "#e66355", onClick: apiCall },
      { "name": "geometric", "color": "#FFFFFF", "background": "#55e6aa", onClick: apiCall },
      { "name": "whimsical", "color": "#FFFFFF", "background": "#db488f", onClick: apiCall },
    ]
  },
  { "name": "Flyers",
    "color": "#FFFFFF",
    "background": "#FFC107",
    "examples": "Car marketing, food court",
    "children": [
      { "name": "cartoonish", "color": "#FFFFFF", "background": "#95D03A", onClick: apiCall},
      { "name": "hand-drawn", "color": "#FFFFFF", "background": "#CB2027", onClick: apiCall },
      { "name": "minimalistic", "color": "#FFFFFF", "background": "#FFC107", onClick: apiCall },
      { "name": "abstract", "color": "#FFFFFF", "background": "#9C27B0", onClick: apiCall },
      { "name": "retro", "color": "#FFFFFF", "background": "#4287f5", onClick: apiCall },
      { "name": "realistic", "color": "#FFFFFF", "background": "#4287f5", onClick: apiCall },
      { "name": "3D", "color": "#FFFFFF", "background": "#8742f5", onClick: apiCall },
      { "name": "vintage", "color": "#FFFFFF", "background": "#c842f5", onClick: apiCall },
      { "name": "professional", "color": "#FFFFFF", "background": "#5f97c2", onClick: apiCall },
      { "name": "dark", "color": "#FFFFFF", "background": "#424c54", onClick: apiCall },
      { "name": "monochromatic", "color": "#FFFFFF", "background": "#6dc761", onClick: apiCall },
      { "name": "gothic", "color": "#FFFFFF", "background": "#c7a561", onClick: apiCall },
      { "name": "urban", "color": "#FFFFFF", "background": "#e66355", onClick: apiCall },
      { "name": "geometric", "color": "#FFFFFF", "background": "#55e6aa", onClick: apiCall },
      { "name": "whimsical", "color": "#FFFFFF", "background": "#db488f", onClick: apiCall },
    ]
  },
  { "name": "Banner",
    "color": "#FFFFFF",
    "background": "#9C27B0",
    "examples": "Shop banner, Government banner",
    "children": [
      { "name": "cartoonish", "color": "#FFFFFF", "background": "#95D03A", onClick: apiCall},
      { "name": "hand-drawn", "color": "#FFFFFF", "background": "#CB2027", onClick: apiCall },
      { "name": "minimalistic", "color": "#FFFFFF", "background": "#FFC107", onClick: apiCall },
      { "name": "abstract", "color": "#FFFFFF", "background": "#9C27B0", onClick: apiCall },
      { "name": "retro", "color": "#FFFFFF", "background": "#4287f5", onClick: apiCall },
      { "name": "realistic", "color": "#FFFFFF", "background": "#4287f5", onClick: apiCall },
      { "name": "3D", "color": "#FFFFFF", "background": "#8742f5", onClick: apiCall },
      { "name": "vintage", "color": "#FFFFFF", "background": "#c842f5", onClick: apiCall },
      { "name": "professional", "color": "#FFFFFF", "background": "#5f97c2", onClick: apiCall },
      { "name": "dark", "color": "#FFFFFF", "background": "#424c54", onClick: apiCall },
      { "name": "monochromatic", "color": "#FFFFFF", "background": "#6dc761", onClick: apiCall },
      { "name": "gothic", "color": "#FFFFFF", "background": "#c7a561", onClick: apiCall },
      { "name": "urban", "color": "#FFFFFF", "background": "#e66355", onClick: apiCall },
      { "name": "geometric", "color": "#FFFFFF", "background": "#55e6aa", onClick: apiCall },
      { "name": "whimsical", "color": "#FFFFFF", "background": "#db488f", onClick: apiCall },
    ]
  },
  { "name": "Posters",
    "color": "#FFFFFF",
    "background": "#4CAF50",
    "examples": "Concert poster, missing people poster",
    "children": [
      { "name": "cartoonish", "color": "#FFFFFF", "background": "#95D03A", onClick: apiCall},
      { "name": "hand-drawn", "color": "#FFFFFF", "background": "#CB2027", onClick: apiCall },
      { "name": "minimalistic", "color": "#FFFFFF", "background": "#FFC107", onClick: apiCall },
      { "name": "abstract", "color": "#FFFFFF", "background": "#9C27B0", onClick: apiCall },
      { "name": "retro", "color": "#FFFFFF", "background": "#4287f5", onClick: apiCall },
      { "name": "realistic", "color": "#FFFFFF", "background": "#4287f5", onClick: apiCall },
      { "name": "3D", "color": "#FFFFFF", "background": "#8742f5", onClick: apiCall },
      { "name": "vintage", "color": "#FFFFFF", "background": "#c842f5", onClick: apiCall },
      { "name": "professional", "color": "#FFFFFF", "background": "#5f97c2", onClick: apiCall },
      { "name": "dark", "color": "#FFFFFF", "background": "#424c54", onClick: apiCall },
      { "name": "monochromatic", "color": "#FFFFFF", "background": "#6dc761", onClick: apiCall },
      { "name": "gothic", "color": "#FFFFFF", "background": "#c7a561", onClick: apiCall },
      { "name": "urban", "color": "#FFFFFF", "background": "#e66355", onClick: apiCall },
      { "name": "geometric", "color": "#FFFFFF", "background": "#55e6aa", onClick: apiCall },
      { "name": "whimsical", "color": "#FFFFFF", "background": "#db488f", onClick: apiCall },
    ]
  },
  { "name": "Invitation cards",
    "color": "#FFFFFF",
    "background": "#3F51B5",
    "examples": "Wedding invitation",
    "children": [
      { "name": "cartoonish", "color": "#FFFFFF", "background": "#95D03A", onClick: apiCall},
      { "name": "hand-drawn", "color": "#FFFFFF", "background": "#CB2027", onClick: apiCall },
      { "name": "minimalistic", "color": "#FFFFFF", "background": "#FFC107", onClick: apiCall },
      { "name": "abstract", "color": "#FFFFFF", "background": "#9C27B0", onClick: apiCall },
      { "name": "retro", "color": "#FFFFFF", "background": "#4287f5", onClick: apiCall },
      { "name": "realistic", "color": "#FFFFFF", "background": "#4287f5", onClick: apiCall },
      { "name": "3D", "color": "#FFFFFF", "background": "#8742f5", onClick: apiCall },
      { "name": "vintage", "color": "#FFFFFF", "background": "#c842f5", onClick: apiCall },
      { "name": "professional", "color": "#FFFFFF", "background": "#5f97c2", onClick: apiCall },
      { "name": "dark", "color": "#FFFFFF", "background": "#424c54", onClick: apiCall },
      { "name": "monochromatic", "color": "#FFFFFF", "background": "#6dc761", onClick: apiCall },
      { "name": "gothic", "color": "#FFFFFF", "background": "#c7a561", onClick: apiCall },
      { "name": "urban", "color": "#FFFFFF", "background": "#e66355", onClick: apiCall },
      { "name": "geometric", "color": "#FFFFFF", "background": "#55e6aa", onClick: apiCall },
      { "name": "whimsical", "color": "#FFFFFF", "background": "#db488f", onClick: apiCall },
    ]
  },
  { "name": "Business cards",
    "color": "#FFFFFF",
    "background": "#FF5722",
    "examples": "CEO card",
    "children": [
      { "name": "cartoonish", "color": "#FFFFFF", "background": "#95D03A", onClick: apiCall},
      { "name": "hand-drawn", "color": "#FFFFFF", "background": "#CB2027", onClick: apiCall },
      { "name": "minimalistic", "color": "#FFFFFF", "background": "#FFC107", onClick: apiCall },
      { "name": "abstract", "color": "#FFFFFF", "background": "#9C27B0", onClick: apiCall },
      { "name": "retro", "color": "#FFFFFF", "background": "#4287f5", onClick: apiCall },
      { "name": "realistic", "color": "#FFFFFF", "background": "#4287f5", onClick: apiCall },
      { "name": "3D", "color": "#FFFFFF", "background": "#8742f5", onClick: apiCall },
      { "name": "vintage", "color": "#FFFFFF", "background": "#c842f5", onClick: apiCall },
      { "name": "professional", "color": "#FFFFFF", "background": "#5f97c2", onClick: apiCall },
      { "name": "dark", "color": "#FFFFFF", "background": "#424c54", onClick: apiCall },
      { "name": "monochromatic", "color": "#FFFFFF", "background": "#6dc761", onClick: apiCall },
      { "name": "gothic", "color": "#FFFFFF", "background": "#c7a561", onClick: apiCall },
      { "name": "urban", "color": "#FFFFFF", "background": "#e66355", onClick: apiCall },
      { "name": "geometric", "color": "#FFFFFF", "background": "#55e6aa", onClick: apiCall },
      { "name": "whimsical", "color": "#FFFFFF", "background": "#db488f", onClick: apiCall },
    ]
  },
  { "name": "Memes",
    "color": "#FFFFFF",
    "background": "#E91E63",
    "examples": "lonely Escobar meme",
    "children": [
      { "name": "cartoonish", "color": "#FFFFFF", "background": "#95D03A", onClick: apiCall},
      { "name": "hand-drawn", "color": "#FFFFFF", "background": "#CB2027", onClick: apiCall },
      { "name": "minimalistic", "color": "#FFFFFF", "background": "#FFC107", onClick: apiCall },
      { "name": "abstract", "color": "#FFFFFF", "background": "#9C27B0", onClick: apiCall },
      { "name": "retro", "color": "#FFFFFF", "background": "#4287f5", onClick: apiCall },
      { "name": "realistic", "color": "#FFFFFF", "background": "#4287f5", onClick: apiCall },
      { "name": "3D", "color": "#FFFFFF", "background": "#8742f5", onClick: apiCall },
      { "name": "vintage", "color": "#FFFFFF", "background": "#c842f5", onClick: apiCall },
      { "name": "professional", "color": "#FFFFFF", "background": "#5f97c2", onClick: apiCall },
      { "name": "dark", "color": "#FFFFFF", "background": "#424c54", onClick: apiCall },
      { "name": "monochromatic", "color": "#FFFFFF", "background": "#6dc761", onClick: apiCall },
      { "name": "gothic", "color": "#FFFFFF", "background": "#c7a561", onClick: apiCall },
      { "name": "urban", "color": "#FFFFFF", "background": "#e66355", onClick: apiCall },
      { "name": "geometric", "color": "#FFFFFF", "background": "#55e6aa", onClick: apiCall },
      { "name": "whimsical", "color": "#FFFFFF", "background": "#db488f", onClick: apiCall },
    ]
  },
  { "name": "Collages",
    "color": "#FFFFFF",
    "background": "#00BCD4",
    "examples": "Collages examples",
    "children": [
      { "name": "cartoonish", "color": "#FFFFFF", "background": "#95D03A", onClick: apiCall},
      { "name": "hand-drawn", "color": "#FFFFFF", "background": "#CB2027", onClick: apiCall },
      { "name": "minimalistic", "color": "#FFFFFF", "background": "#FFC107", onClick: apiCall },
      { "name": "abstract", "color": "#FFFFFF", "background": "#9C27B0", onClick: apiCall },
      { "name": "retro", "color": "#FFFFFF", "background": "#4287f5", onClick: apiCall },
      { "name": "realistic", "color": "#FFFFFF", "background": "#4287f5", onClick: apiCall },
      { "name": "3D", "color": "#FFFFFF", "background": "#8742f5", onClick: apiCall },
      { "name": "vintage", "color": "#FFFFFF", "background": "#c842f5", onClick: apiCall },
      { "name": "professional", "color": "#FFFFFF", "background": "#5f97c2", onClick: apiCall },
      { "name": "dark", "color": "#FFFFFF", "background": "#424c54", onClick: apiCall },
      { "name": "monochromatic", "color": "#FFFFFF", "background": "#6dc761", onClick: apiCall },
      { "name": "gothic", "color": "#FFFFFF", "background": "#c7a561", onClick: apiCall },
      { "name": "urban", "color": "#FFFFFF", "background": "#e66355", onClick: apiCall },
      { "name": "geometric", "color": "#FFFFFF", "background": "#55e6aa", onClick: apiCall },
      { "name": "whimsical", "color": "#FFFFFF", "background": "#db488f", onClick: apiCall },
    ]
  }
]


var DUMMY_RESPONSES = [
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
]

var PARTICLES_OPTIONS = {
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
}