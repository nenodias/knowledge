import 'font-awesome/css/font-awesome.css'
import Vue from 'vue'

import App from './App'
import './config/bootstrap'
import store from './config/store'
import router from './config/router'

Vue.config.productionTip = false

//Temporário
require('axios').defaults.headers.common['Authorization'] = 'bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MywibmFtZSI6IkhvcsOhY2lvIERpYXMgQmFwdGlzdGEgTmV0byIsImVtYWlsIjoiaG9yYWNpby5kaWFzOTJAZ21haWwuY29tIiwiYWRtaW4iOmZhbHNlLCJpYXQiOjE1NDYwMjgzNzcsImV4cCI6MTU0NjI4NzU3N30.oqf5Rmex0YI9t-n1FxkEYbHOBdCRxAaEH25M4mbpW7w';

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')