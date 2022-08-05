<template>
    <header id="hder">
        <section class="hdrFirstChild">

            <div class="uploadCont">

                <button class="uploadBtn" @click="initFileSelector">Upload Your Documents</button>
                <input type="file" class="uploadInput" @change="addFiles" multiple="multiple" ref="docSelector" />
                <div class="uploadContSelect" v-show="showUploadSource == true">
                    <section class="uploadContSelectItem">
                            <b>Document source:</b>
                    </section>
                     <section class="uploadContSelectItem" v-for="item in uploadSource" :key="item"  @click="setUploadType($event)">
                            <b :data-id="item">{{ item }}</b>
                    </section>
                </div>
            </div>

            <section class="headerActions">
                <div class="headerProfileMenuBtn" @click="showCloseBtnMenu">
                    <section class="headerProfileMenuBtnMenu" v-show="showBtnMenu == true">
                        <div @click="logout">Logout</div>
                    </section>
                </div>

            </section>

            <batchUploadModal v-on:closebatchuploadmodal="closeOpenUrlBatchModal" v-if="showUrlUploadSource == true" ></batchUploadModal>
        </section>
    </header>
</template>
<script>
import batchUploadModal from './batchUploadModalComp.vue'

export default {
    name: 'headerComp',
    props: [],
    components: {
        batchUploadModal,
    },
    data() {
        return {
           docList: [],
           uploadSource: [
               "Computer",
           ],
           showUploadSource: false,
           showUrlUploadSource: false,
           showBtnMenu: false,
        };
    },
    computed: {
        watchopenUploadType(){
            return this.$store.state.openUploadType;
        },
    },
    watch: {
      watchopenUploadType(newVal){
          const vuecomp = this;
          if(newVal){
              if(vuecomp.$store.state.openUploadType == 1){
                    vuecomp.initFileSelector();
                    vuecomp.$store.commit("setOpenUploadType",0);
              }else if(vuecomp.$store.state.openUploadType == 2){
                    vuecomp.$store.commit("setOpenUploadType",0);
                    vuecomp.showUrlUploadSource = true;
              }

          }
      }
    },
    methods: {
        initFileSelector() {
            this.$refs.docSelector.click();
        },
        openUploadSelect(){
            const vuecomp = this;
            if(this.showUploadSource == true){
                vuecomp.showUploadSource = false;
            }else{
                vuecomp.showUploadSource = true;
            }


        },
        closeOpenUrlBatchModal(){
            const vuecomp = this;
            if(this.showUrlUploadSource == true){
                vuecomp.showUrlUploadSource = false;
            }else{
                vuecomp.showUrlUploadSource = true;
            }
        },
        setUploadType(e){
            const vuecomp = this;
            if(e.currentTarget.querySelector("b").getAttribute("data-id")){
                if(e.currentTarget.querySelector("b").getAttribute("data-id") == "Computer"){
                    vuecomp.initFileSelector();
                    vuecomp.openUploadSelect()
                }else if(e.currentTarget.querySelector("b").getAttribute("data-id") == "Url Link"){
                    vuecomp.showUrlUploadSource = true;
                    vuecomp.openUploadSelect();
                }
            }
        },
        async addFiles(e) {

            const file = e.currentTarget.files;
            const vuecomp = this;
            //await vuecomp.$store.dispatch("clearDocsToUpload");
            //await vuecomp.$store.dispatch("clearReadyDoc");

            await vuecomp.$store.dispatch("clearPartition");
            if(this.$router.history.current.name != "documents-upload" ){
                vuecomp.$router.push({name:"documents-upload"});

            }
            for( var i = 0; i < file.length; i++ ){
                var getfile = [];
                getfile.file = file[i];
                getfile.name = file[i].name;
                getfile.source = 0;
                getfile.id = 0;
                vuecomp.$store.commit("addDocsToUpload",getfile);
            }
            var getRequest = await vuecomp.$store.dispatch("addDoc",{doc: file, source: "computer"});
             if(getRequest){
                     if(getRequest.response){
                            if(getRequest.response.status == 401){

                                this.$fire({
                                    title: "Login is required. Redirecting to login page.",
                                    type: "error",
                                    timer: 5000
                                }).then(function(){
                                    if(vuecomp.$router.name != "login"){
                                        window.location.reload();
                                    }
                                })

                            }
                        }
                }

            if( e.currentTarget){
                e.currentTarget.value = null;
            }

        },
        logout(){
            const vuecomp = this;
            vuecomp.$store
                    .dispatch("logout")
                    .then(function(){
                        if(vuecomp.$router.name !="login"){
                             vuecomp.$router.push({name:"login"});
                        }

                    })
                    .catch((err) => {
                        console.error(err);

            });
        },
        showCloseBtnMenu(){
            const vuecomp = this;
            if(vuecomp.showBtnMenu == true){
                vuecomp.showBtnMenu = false
            }else{
                vuecomp.showBtnMenu = true;
            }
        }
    },
    mounted(){

    },

}
</script>
 <style scoped>
    @import '../sass/headerComp.scss';
</style>
