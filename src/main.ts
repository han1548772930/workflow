import { createApp } from 'vue'
import './style.css'
import Antd from 'ant-design-vue';
import App from './App.vue'
import { createPinia } from 'pinia'
import 'ant-design-vue/dist/reset.css';
import '@grapecity/activereports/styles/ar-js-ui.css'
import '@grapecity/activereports/styles/ar-js-viewer.css'
import '@grapecity/activereports/styles/ar-js-designer.css'
import "@grapecity/activereports-localization/dist/designer/zh-locale";
import { router } from "./router";
const pinia = createPinia()
const app = createApp(App);
app.use(pinia);
app.use(Antd)
app.use(router)
app.mount('#app')
