// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import BootstrapVue from 'bootstrap-vue'
import moment from 'moment'
import VueMoment from 'vue-moment'
Vue.config.productionTip = false

/* eslint-disable no-new */
Vue.use(BootstrapVue);
Vue.use(VueMoment, {
    moment,
})
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
   
})
