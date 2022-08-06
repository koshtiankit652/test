//import Vue from "vue";
import axios from "axios";

export const docUpload = {
        state: {
            documentUploadingStatus: 'false',
            docsToUpload: [

            ],
            readyDocument: [],
            docData:[],
            uploadingItemsCheck:[],
            uploadNew: false,
            generalDocType: "Agreements",
            openUploadType:0,
        },
        mutations: {
            setDocumentUploadingStatus(state, data){
                state.documentUploadingStatus = data;
            },
            clearDocsToUpload (state) {
              // mutate state
              state.docsToUpload = [];
            },
            removereadyDocFromUploading(state, data){
                state.docsToUpload.forEach(function(el, index){
                    if(el.id == data){
                        state.docsToUpload.splice(index, 1);
                    }
                });

            },
            uploadingItemsCheck(state, uploadStatus){
                if(uploadStatus){
                    state.uploadingItemsCheck.push("uplaoding");

                }
            },
            uploadingItemsCheckRemove(state, uploadStatus){
                if(uploadStatus){
                    state.uploadingItemsCheck.pop();

                }
            },
            addDocsToUpload(state, doc){
                    state.docsToUpload.push({"name":doc.name,"id":state.docsToUpload.length,"source":doc.source,"file":doc.file,"status": "Classifying"});
            },
            setDocsToUploadStatus(state, doc){
                if(doc){
                    state.docsToUpload.forEach(function(el, index){
                        if(el){
                            if(el.id == doc.id){
                                state.docsToUpload[index].status = doc.status;
                            }
                        }
                    });
                }
            },
            setDocUuid(state, {id,uuid}){
                state.docsToUpload.forEach((element, index) => {
                    if(element.id === id) {
                        state.docsToUpload[index].uuid = uuid;
                        state.docsToUpload[index].status = "Uploaded";
                    }
                });
            },
            addDocsReady(state, data){
                state.readyDocument = data;
            },
            setDocReadyDoc(state, data){
                state.readyDocument[data.index].doc = data.doc;
                state.readyDocument[data.index].source = data.source;
            },
            clearReadyDoc(state){
                state.readyDocument = [];
            },
            setGenAgreement(state, newval){
                if(newval) {
                     state.generalDocType = newval;
                 }
            },
            setOpenUploadType(state, newval){
                if(newval) {
                     state.openUploadType = 0;
                     /*Vue.nextTick(function(){
                        state.openUploadType = newval;
                     });*/

                 }
            },
            setUploadNew(state, newval){

                state.uploadNew = newval;

            },
            setDocInViewById(state, data){
                if(typeof state.readyDocument.find(element => element.id == data) != "undefined"){
                    state.docData = []
                    state.docData = state.readyDocument.find(element => element.id == data);
                }else{
                    state.docData = []
                }

            } ,
          },
    actions: {
        async addDoc({ commit }, {doc, source}) {

            commit("setDocumentUploadingStatus", "true");

            const data = new FormData();
            let response = {};
            console.log(source);
            for( var i = 0; i < doc.length; i++ ){
                data.append("files", doc[i]);
            }

            const options = {
                method: "POST",
                url: `${process.env.VUE_APP_API_BASE_URL}/user/documents/upload/`,
                headers: { "Content-Type": "multipart/form-data" },
                data: data ,
            };
            options.headers = {
                "Accept": "application/json",
                "Content-Type": "application/json",
            };

                axios.defaults.headers.common["Authorization"] = localStorage.getItem("token") || "";
               await axios
                    .request(options)
                    .then(({ data }) => {
                        commit("addDocsReady", data);
                        commit("setDocumentUploadingStatus", "false");
                        response = data;

                    })
                    .catch((error) => {
                        response = error;
                        commit("setDocumentUploadingStatus", "false");


                    })
                    .then(() => {
                        commit("setDocumentUploadingStatus", "false");
                    });
            return response;
        },
        setDocInViewById({ commit }, data){

            commit("setDocInViewById", data)


        } ,
        setDocUuidAction({ commit }, {id,uuid}){
            commit("setDocUuid",{id: id , uuid: uuid});

        } ,
        removereadyDocFromUploading({commit}, data){
            commit("removereadyDocFromUploading", data);
        },
        setDocReadyDoc({commit}, data){
            commit("setDocReadyDoc", data);
        },
        setDocsToUploadStatus({commit}, data){
              commit("setDocsToUploadStatus", data);
        },
        clearDocsToUpload({commit}){
              commit("clearDocsToUpload");
        },
        clearReadyDoc({commit}){
            commit("clearReadyDoc");
        },
    }
}
