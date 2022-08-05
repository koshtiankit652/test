
<template>

  <notifications  position="center center" width="50%"  />
  <!--
  <partitionListItemCard
                        :itemId="1"
                        :title="'hello'"
                        :pageNumber="2"
                    />
-->

  <component
    :is="currentLayout"
    layoutApp="zenith"
    :profileMenuItem="[
      {
        id: 0,
        name: 'logout',
        optionLabel: 'Logout',
        onclick: this.profileMenuItemClick,
      }
    ]"
    :headerMenu="headerMenuItems"
    :onMultiFormInputChanged="getAllFiles"
    :logoSrc="$apogeeMedia.zenith_logo"
    :buttonInputVarient="'cta-button-outlined'"
    :buttonInputIconSrc="$apogeeMedia.add_documents_icon"
    :smallDesc="'Data extraction & Smart annotation'"

    >

    <router-view></router-view>

  </component>


</template>

<script>
import VueSimpleAlert from "vue3-simple-alert";
import { mapState } from 'vuex';
import { mainLayout }  from "@1000ml-io/vue3-ui";
import { infoContentGridLayout }  from "@1000ml-io/vue3-ui";

export default {
  name: 'App',
  data (){
    return{
      inView: "",
      headerMenuItems: this.$apogeeActions.actionsHelper.actionsCreateZenithHeaderMenu(this.headerMenuClick),
    }
  },
  components: {
    mainLayout,
    infoContentGridLayout
  },
  watch:{
     watchReadyDocument(newVal){
        const vuecomp = this;
        var getData = [];
        getData.id = [];
        getData.el = [];
        if(newVal){

            vuecomp.$store.state.readyDocument.forEach(function(el,index){
                if(typeof el.id != "undefined"){
                 if(typeof vuecomp.$store.state.documentInUpload[index] != "undefined"){
                    getData.id.push(vuecomp.$store.state.documentInUpload[index].id);
                    getData.el = [];
                    getData.el.index = index;
                    getData.el.doc = vuecomp.$store.state.documentInUpload[index].file;
                    vuecomp.$store.dispatch("setDocReadyDoc",getData.el);

                 }

                }

            });
            getData.id.forEach(function(el,index){
              if(el => 0){

                  vuecomp.$store.dispatch("removereadyDocFromUploading", el);

              }
            });

        }

    },
    InViewDocumentId(newVal){
     this.inView = newVal;
    },
    '$store.state.docs': {
      handler: function(val){
          const vuecomp = this;
          if(vuecomp.$store.state.docs){
            vuecomp.$store.state.docs.forEach(function(el, index){
              if(el.onclick === undefined)
                  el.onclick = vuecomp.view;
            })
          }
          if(vuecomp.$store.state.partitions){
            vuecomp.$store.state.partitions.forEach(function(el, index){
              if(el.onclick === undefined)
                 // el.onclick = vuecomp.view;
                  el.removeBtnClickFunc = vuecomp.partitionSubmited;
                  el.extractBtnClickFunc =  vuecomp.partitionSubmited;
                  el.gotoPage =  vuecomp.partitionGotoPage;
            })
          }
      },
      deep: true,
      immediate: true
    },
    '$route':{
      handler: function(val){
        const vuecomp = this;
          //console.log(val)
          if(val){
            if(val.name != "view-document" && val.name != "document-uploads"){
              if(vuecomp.$store.state.docs){
                vuecomp.$store.dispatch("clearDoc");
                vuecomp.$store.dispatch("clearPartition");
                vuecomp.$store.dispatch("clearInViewDocumentId");
                vuecomp.$store.dispatch("clearPartitionPageNumber");
                vuecomp.$store.dispatch("clearExtractedTableData");
                vuecomp.$store.dispatch("clearAnnotations");
              }
            }
            //if(val.name != "view-document")

          }
      },
      deep: true,
    }
  },
  computed:{
    ...mapState(['InViewDocumentId']),
    watchReadyDocument(){
        return this.$store.state.readyDocument;
    },
    currentLayout() {
      return this.$route.meta.layout;
    },
  },
  created (){
  },
  methods: {
    getDocumentIdFromUrl(){
            return location.href.split("/")[location.href.split("/").length-1]
    },
     headerMenuClick: async function(e){

      const vuecomp = this;

      if(vuecomp.headerMenuItems[e.currentTarget.getAttribute("data-id")].name == "profile"){
        vuecomp.$router.push(
          {
            path: '/user-profile'
          }
        )
      }else if(vuecomp.headerMenuItems[e.currentTarget.getAttribute("data-id")].name == "task"){
        vuecomp.$router.push(
          {
            //path: '/document-source-option'
            path: 'document-uploads'
          }
        )
      }else if(vuecomp.headerMenuItems[e.currentTarget.getAttribute("data-id")].name == "dashboard"){
        vuecomp.$router.push(
          {
            path: '/dashboard'
          }
        )
      }
    },
    profileMenuItemClick: async function(e){
      const vuecomp = this;
      const getName = e.currentTarget.getAttribute("data-name");
      let response = {};
      if(getName == "logout")
        response = await vuecomp.$apogeeActions.apiManager.logout();

      if(response.status === "success"){
        alert("Successfully logged out")
      }

      this.$router.push({path: "/login"});

    },
    view(e){
                const vuecomp = this;
                this.$router.push({
                    path: "/view-document/"+vuecomp.$store.state.docs[e.currentTarget.getAttribute("data-id")].uploadId
                })

    },
    getBase64: async function(file) {
      var reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = function () {
        return reader.result;
        console.log(reader.result);
      };
      reader.onerror = function (error) {
        console.log('Error: ', error);
      };
    },
   toBase64: async function(file){
     new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
    })
   },

  readUploadedFileAsText: (inputFile) => {
    const temporaryFileReader = new FileReader();

    return new Promise((resolve, reject) => {
      temporaryFileReader.onerror = () => {
        temporaryFileReader.abort();
        reject(new DOMException("Problem parsing input file."));
      };

      temporaryFileReader.onload = () => {
        resolve(temporaryFileReader.result);
      };
      temporaryFileReader.readAsDataURL(inputFile);
    });
},
    async filesArrayToDocument(files){
      const arrFormated = [];
      const vuecomp = this;

       for (var i = 0; i < files.length; i++) {
          //console.log(files[i]);
          //console.log(await vuecomp.toBase64(files[i]))
          /*
          vuecomp.toBase64(files[i]).then(function(base){
            alert(base);
          })*/
         // const reader = new FileReader();
         // reader.readAsDataURL(files[i]);
          //reader.onload =  await async  function(e){
          //  reader.readAsDataURL(files[i]);
          // alert(reader.result)
        //  };
        //  alert(typeof reader.result)
          /*
         while(reader.result == null ){
            //alert(reader.result)typeof reader.result == "undefined" ||

         }*/

         const getReader = await vuecomp.readUploadedFileAsText(files[i]);
          console.log(getReader)
         // alert(reader.result)
        //  var getReader = reader.onload;
          //const getReader = await reader.onload ;
         //  alert("okay")
         // alert(getReader)
        /* getReader.then(function(e){
           alert(e.target.value)
         })*/
          const getFileType = await vuecomp.$apogeeActions.actionsHelper.actionsFileTypeFinder(files[i]);
          arrFormated.push(
              {
                  id: i,
                  uploadId: null,
                  title: files[i]['name'],
                  text: files[i]['name'],
                  file: files[i],
                  uploaded: false,
                  objType: 'file',
                  fileExt: getFileType,
                  fileUrlObject: getReader, //await vuecomp.toBase64(files[i]), //URL.createObjectURL(files[i]),
                  metadata: {},
                  viewMetadata: false,
                  onclick: vuecomp.view,
              }
          )
      }

      return arrFormated;
    },
    async getAllFiles(files){
      const vuecomp = this;
      await this.$store.dispatch('addDocs', await this.filesArrayToDocument(files));
      this.$router.push({path: "/document-uploads"});

        this.$apogeeActions.apiManager.uploadDocument(files)
       .then(function(data){
          var sleepTimer = 1000;
          data.forEach(function(el, index){
              sleepTimer = sleepTimer+1000;
              setTimeout(() => {
                    var getEdit = {uuid: index, data: data[index]};
                    vuecomp.$store.dispatch('editDocsScheme', getEdit)

                }, sleepTimer);

          })
        });
    },
    async partitionSubmited(data){
       // alert(data)
      console.log(data);
      const vuecomp = this;

        if(data.actionName == "edit"){

        }else if(data.actionName == "remove"){
          //alert(data)

          await vuecomp.$store.dispatch('removePartition', data);

          /*vuecomp.partitionListRow.forEach(function(el, index){
            if(el.id == data.itemId){
              vuecomp.partitionListRow.splice(data.itemId, 1);
              console.log("partition remove")
              console.log(vuecomp.partitionListRow)
            }
          });*/



      }else if(data.actionName == "extract"){

          vuecomp.$store.state.partitions.forEach(await async function(el, index){

            if(el.id == data.itemId){
              var blob;
              var getSection = [];
              var getCvsSTring = "";

              el.sections.forEach(function(secEl, secIndex){
                  var getSecEl = {};
                getSecEl.page = secEl.page;
                getSecEl.title = el.title;

                getSecEl.text = secEl.text;
                getSection.push({...getSecEl});
              })

              if(data.fileExt == "csv"){

                getCvsSTring = await vuecomp.$apogeeActions.actionsHelper.actionCreateCvsFromJSon(getSection);
                blob = new Blob([getCvsSTring], { type: "text/plain" });

              }else if(data.fileExt == "json"){

                  const data = JSON.stringify(getSection, null, "\t");
                  blob = new Blob([data], { type: "text/plain" });
              }

              vuecomp.downloadDocument(
                                data.fileName,
                                data.fileExt,
                                blob
                              )
          }
        })

      }
    },
    downloadDocument: async function(filename, ext, content){


      const href = URL.createObjectURL(content); // URL.createObjectURL('http://www.africau.edu/images/default/sample.pdf');
      //URL.revokeObjectURL(href);

      const a = document.createElement("a");
      a.style.display = "none";
      a.href = href;
      a.download = filename+"."+ext;

      document.body.appendChild(a);
      a.click();

      setTimeout(() => {
          URL.revokeObjectURL(href);
          console.log('document download ended')
          a.remove();
      }, 0);

    },
    async partitionGotoPage(data){

      const vuecomp = this;
       // alert("okay")
        console.log(data)
       vuecomp.$store.state.partitions.forEach(await async function(el, index){

        if(el.id == data.itemId){
        //  alert(vuecomp.getDocumentIdFromUrl+" "+data.uploadId)
           if(vuecomp.getDocumentIdFromUrl() == data.uploadId){
             //           alert("yes")
              await vuecomp.$apogeeActions.pdfManager.gotoPage(data.pageNumber);
              vuecomp.$store.dispatch("clearPartitionPageNumber");
              await vuecomp.$apogeeActions.pdfManager.createNotationBoundingBox(vuecomp.$store.state.partitions, true, vuecomp.getDocumentIdFromUrl());

          }else{

            await  vuecomp.$store.dispatch("setPartitionPageNumber", data.pageNumber);
            vuecomp.$router.push({
              path: "/view-document/"+data.uploadId
            })

          }

        }
      })
    },
  },
  mounted(){
  },
};
</script>

<style>

</style>
