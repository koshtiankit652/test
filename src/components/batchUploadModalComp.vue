<template>
    <section id="batchUploadModal">
        <section class="hdrFirstChild">
           <section class="batchUploadModalItemCont">
                <section class="batchUploadModalItems">
                    <div class="batchUploadModalItem" v-for="items in urlData" :key="items.id">
                        <input type="text"  placeholder="" v-model="items.value" />
                        <div class="batchUploadModalItemDeleteBtn" data-id="items.id" @click="removeUrlPath(items.id)" >&#x000D7;</div>
                    </div>
                </section>
                <div class="batchUploadModalItemAddBtn" @click="insertPath" >&#43;</div>
           </section>
           <section class="batchUploadModalBottomBtnCont">
                <section class="batchUploadModalBottomBtnSection">
                    <div class="batchUploadModalBottomBtn" @click="addFiles" >Open</div>
                    <div class="batchUploadModalBottomBtn" @click="closeMe" >Cancel</div>
                </section>
           </section>
        </section>

    </section>
</template>
<script>

export default {
    name: 'batch-upload-modal-comp',
    props: [],
    components: {

    },
    data() {
        return {

           urlData:[
               {
                   id: 0,
                   value:"",

               },
           ],
           urlDataAddedVolume: 1,
        };
    },
    computed: {

    },
    watch: {

    },
    methods: {
        insertPath(){

            this.urlData.push({id:this.urlDataAddedVolume,value:""});
            this.urlDataAddedVolume++;
        },
        removeUrlPath(itemId){
            const vuecomp = this;
            for(var i = 0; i < vuecomp.urlData.length; i++) {
                if( vuecomp.urlData[i].id == itemId && i != 0) {
                     vuecomp.urlData.splice(i, 1);
                    break;
                }else if( i == 0 && vuecomp.urlData[i].id == itemId){
                     vuecomp.$alert("Can not remove the first url field.");
                }
            }
        },
        closeMe(){
            const vuecomp = this;
            vuecomp.$emit('closebatchuploadmodal');
        },
         addFiles() {

            const vuecomp = this;
            for( var i = 0; i < vuecomp.urlData.length; i++ ){
                if(typeof vuecomp.urlData[i] != "undefined"){

                    if(typeof vuecomp.urlData[i].id != "undefined"){
                        if(vuecomp.urlData[i].value != "" && (vuecomp.urlData[i].id >= 0)){
                            var getfile =[];
                            getfile.name =  vuecomp.urlData[i].value;
                            getfile.source =  1;
                            getfile.file =  vuecomp.urlData[i].value;
                            vuecomp.$store.commit("addDocsToUpload",getfile);
                        }
                    }

                }

            }

            vuecomp.$store.commit("setUploadNew",true);
            if(this.$router.history.current.name != "documents-upload" /*&& this.$router.history.current.name != "document-view"*/){

                this.$router.push({name:"documents-upload"});

            }
            vuecomp.closeMe();
        },
    },
    mounted(){


    },

}
</script >
 <style scoped >
    @import '../sass/batchUploadModalComp.scss';
</style>
