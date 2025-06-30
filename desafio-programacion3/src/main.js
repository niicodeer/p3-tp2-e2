import './assets/style.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import VueBarcode from '@chenfengyuan/vue-barcode';

const app = createApp(App)

app.use(router)
app.component(VueBarcode.name, VueBarcode);

app.mount('#app')
