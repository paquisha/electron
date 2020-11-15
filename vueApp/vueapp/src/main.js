import Vue from 'vue'
import App from './App.vue'
import router from './router'
import VueMaterial from 'vue-material'
import { MdList } from 'vue-material/dist/components'
//css
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default-dark.css'

Vue.config.productionTip = false

Vue.use(VueMaterial)
Vue.use(MdList)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
