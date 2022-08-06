import Vue, {createApp } from 'vue';
import App from './App.vue';
import store from './store/index';
import router from './routes/router-helper.js';
import VueSimpleAlert from "vue-simple-alert";
import Vuex from "vuex";

import _1000mlIoVue3Ui from "@1000ml-io/vue3-ui"
import {style, apogeeActions, apogeeMedia} from "@1000ml-io/assets"
import userController from "./helpers/user-controller"
import documentController from "./store/doc-controller.js";

export const app = createApp({
    extends: App,
    router: [router],

}).use(Vuex).use(router).use(documentController);
app.use(_1000mlIoVue3Ui);
app.config.globalProperties.$userController = userController;

app.config.globalProperties.$style = style;
app.config.globalProperties.$apogeeActions = apogeeActions;
app.config.globalProperties.$apogeeMedia = apogeeMedia;
//console.log(app.config.globalProperties.$apogeeActions.actionsHelper )

app.mount('#app');

const getInitResult = app.config.globalProperties.$apogeeActions.apiManager.init("zenith", "test");

document.title = "Apogee Suite - Zenith AI Extractions";
