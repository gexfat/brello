import { createStore } from "vuex";
import createPersistedState from "vuex-persistedstate";

const files = require.context('./modules', false, /\.js$/)
const modules = {}

// Import modules from ./modules folder

files.keys().forEach(file => {
  const key = file.replace(/(\.\/|\.js)/g, '')
  modules[key] = files(file).default
  modules[key].namespaced = true
})

const persist = createPersistedState({
	key: 'brello'
})

const store = createStore({
	modules,
	plugins: [persist]
});

export default store