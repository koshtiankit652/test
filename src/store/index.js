"use strict";
import Vue from "vue";
import Vuex from "vuex";
//import { docUpload } from "./doc-upload.js"
import documentController  from "./doc-controller"
import { userEntry } from "./user_entry"
//Vue.use(Vuex);




const mergedStore = {
    state: { ...documentController.state, ...userEntry.state },
    mutations: { ...documentController.mutations, ...userEntry.mutations },
    actions: { ...documentController.actions, ...userEntry.actions },
};

export default new Vuex.Store(mergedStore);
