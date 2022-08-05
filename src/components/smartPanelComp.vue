<template>
    <section id="pdfSmartPanel">
        <section class="pdfSmartPanelFirstChild">

            <section class="smartPanelHder">
                <h3> {{ panelName }} </h3>
            </section>
            <section class="smartPanelBtnCont" v-if="panelName == 'Smart Panel'">
                <div class="smartPanellBtn" @click="showBackLinks" :style="{backgroundColor: (showBackLink != true ) ? '':'#4492FD', color:(showBackLink == true ) ? 'white':'' }">Partition</div>
                 <div class="smartPanellBtn">Table Extract</div>
            </section>
            <section class="smartPanelNav" v-show="showBackLink == true" >
                <div class="smartPanelNavBtn" @click="closeBackLinks">&lt; Go Back</div>
            </section>
            <section class="loadingDocContainer">

                <docreadyitem  v-show="showBackLink == false"  v-for="item in watchdocsToUpload" :key="item.id" :idprop="item.id" :docitem="item"  v-on:resetcurrentpage="resetCurrentPage" :style="{marginBottom: '5px',marginTop:'5px',height:'fit-content'}"  />

                <documentLinkBack :showme="showBackLink" :numbOfPage="numbOfPage" :setCurrentPage="setCurrentPage" :currentPage="currentPage" />
            </section>
        </section>
    </section>
</template>
<script>
import documentLinkBack from './documentLinkBack.vue';
import docreadyitem from './docReadyItem.vue';

export default {
    name: 'smart-panel',
    props: ['doc','numbOfPage','setCurrentPage','currentPage','panelName'],
    components: {
      documentLinkBack,
      docreadyitem
    },
    data() {
        return {
            showBackLink: false,

        };

    },
    watch: {
    },
    computed: {
        watchdocsToUpload(){
            return this.$store.state.readyDocument; //this.$store.state.docsToUpload.filter(el=> el.status == "Uploaded" && typeof el.uuid != "undefined");
        },
    },
    methods: {
        showBackLinks(){
            this.showBackLink = true;
        },
        closeBackLinks(){
            this.showBackLink = false;
        },
        closeMe(){
            this.$emit('closesmartpanel');
        },
        resetCurrentPage(){
           this.$emit('resetcurrentpage');
        },
    },
    created(){
    },
    mounted(){

    },

}
</script>
 <style scoped>
    @import '../sass/smartPanelComp.scss';
</style>
