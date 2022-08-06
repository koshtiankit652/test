<template>
    <section id="loadingDocsParent">

        <section id="loadingDocsNavCont">
           <vSelect class="currentTypeVselect" :value="watchdocsGenType" :options="pagesTitlesReturn" @input="PaginationSelect($event)"  :disabled="(this.$store.state.uploadingItemsCheck.length > 0)" v-show="(this.$store.state.uploadingItemsCheck.length <= 0)"/>
             <pulse-loader :loading="(this.$store.state.uploadingItemsCheck.length > 0)" :color="spinnerController.color" :size="spinnerController.size"></pulse-loader>
        </section>

        <section id="loadingDocsNavSeparator"></section>

        <section class="loadingDocContParent">
            <section class="docItemsCont">
                <section class="loadingDocCont" v-for="item in watchdocsToUpload" :key="item.id">
                    <loadingDoc  :doc="item" class="loadingDocItem"></loadingDoc>
                </section>

                 <section class="docItemsContEmpty" v-show="watchdocsToUpload.length <= 0" >
                    <img src="@/assets/zenith.svg" />
                    <img src="@/assets/apogee-logo.svg" />
                </section>

            </section>
            <section>
                <img src="@/assets/zenith.svg" />
                <img src="@/assets/apogee-logo.svg" />
            </section>
            <smartpanel :numbOfPage="watchdocsToUpload.length" panelName="Smart Queue"></smartpanel>
        </section>

    </section>
</template>
<script>
import loadingDoc from './loadingDoc.vue'
import { mapGetters } from "vuex";
import vSelect from 'vue-select';
import 'vue-select/dist/vue-select.css';
import PulseLoader from 'vue-spinner/src/PulseLoader.vue'
import smartpanel from './smartPanelComp.vue';

export default {
    name: 'loadingDocsParent',
    props: [],
    components: {
        loadingDoc,
        vSelect,
        PulseLoader,
        smartpanel
    },
    data() {
        return {
           docList: [],
           docTypes: [
             "Agreements",
           "Applications",
           "Arbitration",
             "Bids",
            "Certificates",
            "Contracts",
             "Leases",
            "Memos",
           "Proposals",
             "Reports",
            "Resumes",
           "Waivers",
             "Others",
           ],
            currentDocType: "Agreements",
            spinnerController: {
               status: false,
               color: 'blue',
               size: '10px'
           },
        };
    },
    computed: {
         ...mapGetters(["getdocsToUpload"]),
        watchdocsToUpload(){
            return this.$store.state.docsToUpload;
        },
         watchdocsGenType(){
            return this.$store.state.generalDocType;
        },
        pagesTitlesReturn(){
            return this.docTypes;
        },
    },
    watch: {
        watchdocsGenType: function(newVal){
            const vuecomp = this;

            if(newVal){
                vuecomp.currentDocType = newVal;
            }

        },
    },
    methods: {
         PaginationSelect(e){

            const vuecomp = this;

            if(e){
               if(typeof e != "undefined" || e != null){
                   vuecomp.$store.commit("setGenAgreement", e);
               }
            }
        },
    },
    mounted(){
           let widthVal = document.getElementById('loadingDocsParent');
            widthVal.style.marginTop =  (document.getElementById('hder').offsetHeight+0)+'px';

            window.addEventListener('resize', function() {

                widthVal.style.marginTop =  (document.getElementById("hder").offsetHeight+0)+"px";

            }, true);


    },

}
</script>
 <style scoped>
    @import '../sass/loadingDocsParent.scss';
</style>
