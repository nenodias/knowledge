import 'font-awesome/css/font-awesome.css'
import Vue from 'vue'

import App from './App'
import './config/bootstrap'
import './config/msgs'
import store from './config/store'
import router from './config/router'

Vue.config.productionTip = false

//Temporário
require('axios').defaults.headers.common['Authorization'] = 'bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MywibmFtZSI6IkhvcsOhY2lvIERpYXMgQmFwdGlzdGEgTmV0byIsImVtYWlsIjoiaG9yYWNpby5kaWFzOTJAZ21haWwuY29tIiwiYWRtaW4iOnRydWUsImlhdCI6MTU0NjE3OTM1MSwiZXhwIjoxNTQ2NDM4NTUxfQ.WsO2GNFgoHY9To3aOWbpKtgkswRaFOXJpOUq-DjLhj4';

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')