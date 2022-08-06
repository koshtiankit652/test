<template>
    <section class="docItem" ref="docItem" :style="{borderColor: (doc.status=='done') ? 'red':''}">
        <section class="docItemFirstChild">
            <div style="width: 100%;" class="docTitleContainer">
                <span class="docTitle" style="width: 100%;" @click="docTitleClick($event)">{{ doc.name }}</span>
            </div>
             <br/>

        <div class="docItemSource" ><div class="docItemSourcePercent" :style="{ backgroundColor: (doc.status=='done') ? '#FF6347':'',color:(doc.status=='done') ? 'white':'' ,width: docItemSourcePercentCss.width}" ></div> <b>File Source:<span> {{ (doc.source == 0) ? "Computer":"URLs"}} </span></b></div>

         <br/>
        <pulse-loader class="docItemLoader" :loading="spinnerController.status && doc.status!='done'" :color="spinnerController.color" :size="spinnerController.size"></pulse-loader>
        <br/>

        </section>
    </section>
</template>
<script>
import PulseLoader from 'vue-spinner/src/PulseLoader.vue'

export default {
  name: 'doc-item',
  props: ['statusprop','doc'],
  data() {
    return {

          doctype: "Agreements",
           docData: this.doc,
           status:"inactive",
           //type: "Agreements"
           showdoctypes: false,
           spinnerController: {
               status: true,
               color: 'blue',
               size: '10px'
           },
           docTypes: {
            agreements: "Agreements",
            applications: "Applications",
            arbitration: "Arbitration",
            bids: "Bids",
            certificates: "Certificates",
            contracts: "Contracts",
            leases: "Leases",
            memos: "Memos",
            proposals: "Proposals",
            reports: "Reports",
            resumes: "Resumes",
            waivers: "Waivers",
            others: "Others",
        },
        docItemSourcePercentCss: {
            width: '100%',
        }
    };
  },
  components: {
      PulseLoader,
  },
  watch: {
      watchLoading(newVal){
          const vuecomp = this;
          if(newVal == "true"  ){
            if( vuecomp.statusprop == "docInUpload"){
                vuecomp.spinnerController.status = true;
            }
          }else if(newVal == "false" ){
              //vuecomp.$ref.docItem.style.backgroundColor = "red";
              vuecomp.spinnerController.status = false;
              vuecomp.$store.dispatch("setDocsToUploadStatus",{id: vuecomp.doc.id, status:"done"});
          }
    },
  },
  computed:{
    watchLoading(){
        return this.$store.state.documentUploadingStatus;
    },
  },
  methods: {

  },
  created() {

  },
  mounted() {
  },
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  @import '../sass/docItem.scss';
</style>
