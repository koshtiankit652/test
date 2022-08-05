import {  createWebHistory, createRouter } from "vue-router";

import login  from "../components/pages/loginPage.vue"; //"@1000ml-io/assets";
import uploadingPage  from "../components/pages/uploadingPage.vue"; //"@1000ml-io/assets";
import documentSrcOptions  from "../components/pages/documentSrcOptionsPage.vue"; //"@1000ml-io/assets";
import urlUploadPage  from "../components/pages/urlUploadPage.vue"; //"@1000ml-io/assets";
import viewDocumentPage from "../components/pages/viewDocumentPage.vue";
import profilePage from "../components/pages/profilePage.vue";

import userController from "../helpers/user-controller";
import { billingPanel, domainPanel } from "@1000ml-io/vue3-ui"

const router = createRouter({
  history: createWebHistory(),
  routes:[
    {
      path: "/",
      name: "/",
      meta: {
        layout: "infoContentGridLayout",
      },
      component: login,
    },
    {
      path: "/login",
      name: "login",
      meta: {
        layout: "infoContentGridLayout",
      },
      component: login,
    },
    {
      path: "/document-uploads",
      name: "document-uploads",
      component: uploadingPage,
      meta: {
        layout: "mainLayout",
        requiresAuth: true
      },

    },
    /*{
      path: '/document-source-option',
      name: 'document-source-option',
      component: documentSrcOptions,
      meta: {
        layout: "mainLayout",
        requiresAuth: true
      },
    },*/
    {
      path: '/url-uploads',
      name: 'url-uploads',
      component: urlUploadPage,
      meta: {
        layout: "mainLayout",
        requiresAuth: true
      }
    },
    {
      path: '/view-document/:id',
      name: 'view-document',
      component: viewDocumentPage,
      meta: {
        layout: "mainLayout",
        requiresAuth: true,
      }
    },
    {
      path: '/user-profile/',
      name: 'user-profile',
      component: profilePage,
      meta: {
        layout: "mainLayout",
        requiresAuth: true,
      },
      children: [
        {
          path: '',
          name: 'billing',
          component: billingPanel
        },
      ]

    }
  ]
});

router.beforeEach((to, from, next) => {

  userController.actions.isLogin().then(function(data){
    //console.log(data)
    if (to.matched.some(record => record.meta.requiresAuth)) {
          if (data.status == true) {
              next();
              return;
          }else{
            next("/login");
          }
    }else{
      next();
      return;
    }
  });

});
export default router;
