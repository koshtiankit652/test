<template>
    <section id="docViewParent">
       <section class="docViewParentFirstChildSection">
            <section id="pdfManager">
                <div class="docViewFilename">
                    <h2>{{ fileName }}</h2>
                </div>

                <section class="pdfViwerNavCont">

                    <div class="pdfViwernavBtn" @click="gotoPage('down')"> &lsaquo;	</div>
                    <div class="pdfViwernavBtn" @click="gotoPage('up')"> &rsaquo;	</div>
                    <div class="pdfViwernavBtn" @click="zoomPdfViewer('out')"> -	</div>
                    <div class="pdfViwernavBtn" @click="zoomPdfViewer('in')"> +	</div>
                </section>
                <section class="currentAndLastPage">
                    <vSelect class="currentAndLastPageVselect" :value="pdfCurrentPage" :options="pagesTitlesReturn" @input="PaginationSelect($event)" />
                    <b>{{ parseInt(((pdfManagerWidth+pdfManagerHeight)*(100)) /(50+130)) }}%</b>
                    <b>{{ pdfCurrentPage }} of {{ numbOfPage }} </b>
                </section>
                <div id="pdfContainer">
                    <canvas id="pdf"></canvas>
                </div>
            </section>

       </section>
       <!-- v-show="smartPanelShow == true" -->
       <smartpanel :currentPage="pdfCurrentPage" v-on:closesmartpanel="closeSmartPanel" v-on:resetcurrentpage="resetCurrentPage" :numbOfPage="numbOfPage" :setCurrentPage="setCurrentPage"  panelName="Smart Panel"></smartpanel>
    </section>
</template>
<script>

import vSelect from 'vue-select';
import 'vue-select/dist/vue-select.css';
import smartpanel from './smartPanelComp.vue';

import pdfjsLib from "pdfjs-dist/build/pdf";


// The workerSrc property shall be specified.

pdfjsLib.GlobalWorkerOptions.workerSrc = "https://cdn.jsdelivr.net/npm/pdfjs-dist/build/pdf.worker.min.js";


export default {
    name: 'loadingDocsParent',
    props: ['id'],
    components: {
        vSelect,
        smartpanel
    },
    data() {
        return {
          fileName: '',
           pdfViewer: null,
           pdfLoadingTask: 1,
           pdfCurrentPage: 1,
           numbOfPage: 1,
           pdf: null,
           pagesTitles:[],
           currentScale: 1,
           smartPanelShow: false,
            currentDocId: 0,
            pdfManagerWidth: 50,
            pdfManagerHeight: 130,
        };
    },
    computed: {
       docData() {
            return this.$store.state.docData;
        },
        pagesTitlesReturn(){
            return this.pagesTitles;
        },
    },
    watch: {
        docData(newDocData) {
            const vuecomp = this;
            if (newDocData) {
                if(vuecomp.$store.state.docData.source == 0){
                    vuecomp.fileName = vuecomp.$store.state.docData.doc.name;
                }else{
                    vuecomp.fileName = vuecomp.$store.state.docData.name;
                }

                vuecomp.pdfCurrentPage =1;
                vuecomp.getPdf();

            }
        },
        pdfCurrentPage: function(newVal){
            const vuecomp = this;

            if(newVal){
                vuecomp.pdf
                    .getPage(newVal)
                    .then( page => {
                         const scale = 4;
                        const viewport = page.getViewport(scale);

                        // Apply page dimensions to the <canvas> element.
                        const canvas = document.getElementById("pdf");
                        const context = canvas.getContext("2d");
                        canvas.height = viewport.height;
                        canvas.width = viewport.width;
                        const renderContext = {
                            canvasContext: context,
                            viewport: viewport
                        };
                        page
                        .render(renderContext)
                        .promise
                        .then(()=> {


                        });
                });


            }
        },
        numbOfPage: function(newVal){
            const vuecomp = this;
            if(newVal){
                vuecomp.pagesTitles = []
                for(var i=1;i<=newVal;i++){

                    vuecomp.pagesTitles[i] = i;
                }
            }

        },

    },
    methods: {
        async getPdf() {
            const vuecomp = this;

            if(vuecomp.$store.state.docData.doc){
                var pdfURL;
                if(vuecomp.$store.state.docData.source == 0){

                    pdfURL = URL.createObjectURL(vuecomp.$store.state.docData.doc);
                }else{

                   pdfURL = vuecomp.$store.state.docData.doc;

                }
                const loadingTask = pdfjsLib.getDocument(pdfURL);
                vuecomp.pdf = await loadingTask.promise;

                // Load information from the first page.

                const page =  await vuecomp.pdf.getPage(vuecomp.pdfCurrentPage); //
                const scale = 1;
                const viewport = page.getViewport(scale);

                // Apply page dimensions to the <canvas> element.
                const canvas = document.getElementById("pdf");
                const context = canvas.getContext("2d");
                canvas.height = viewport.height;
                canvas.width = viewport.width;

                // Render the page into the <canvas> element.
                const renderContext = {
                    canvasContext: context,
                    viewport: viewport
                };
                await page.render(renderContext);

                vuecomp.numbOfPage = vuecomp.pdf._pdfInfo.numPages; //vuecomp.pdfViewer._pages.length;
                 if(vuecomp.$store.state.docData.source == 0){
                   URL.revokeObjectURL(vuecomp.$store.state.docData.doc);
                }

                vuecomp.resetInnerViewerSize();

            }
        },
        reset()
        {
            const vuecomp = this;
            var canvas = document.getElementById("pdf");
            var context = canvas.getContext("2d");
            context.clearRect(0,0, canvas.width, canvas.height);
            if(vuecomp.pdf){
                this.pdf.loadingTask.destroy();
                this.pdf = null;
            }

        },
        gotoPage(navDirection) {
            const vuecomp = this;
            if(navDirection == "up"){
                if(vuecomp.pdfCurrentPage < vuecomp.numbOfPage){
                    vuecomp.pdfCurrentPage = vuecomp.pdfCurrentPage+1;
                }
            }else{
                if(vuecomp.pdfCurrentPage > 1){
                    vuecomp.pdfCurrentPage = vuecomp.pdfCurrentPage-1;
                }
            }

        },
        zoomPdfViewer(inOrOut){

             const vuecomp = this;
            if(inOrOut == "in"){
                vuecomp.pdfManagerWidth +=10;

                vuecomp.pdfManagerHeight+=15;

            }else if(inOrOut == "out"){
                vuecomp.pdfManagerWidth -=10;

                vuecomp.pdfManagerHeight -=15;
            }

        },
        resetPDF() {
            const vuecomp = this
            const existingViewer = document.getElementById("pdfViewer"); //container.querySelector("#pdfViewer");
            if (existingViewer) {
                existingViewer.innerHTML = '';
            }
            if (vuecomp.pdfViewer) {
                vuecomp.pdfViewer = null;
                vuecomp.pdfLoadingTask.destroy();
            }
        },
        resetInnerViewerSize(){
            document.getElementById("pdfManager").querySelector("#pdfContainer #pdf").style.width = "100%"
            document.getElementById("pdfManager").querySelector("#pdfContainer #pdf").style.height = "100%"
            /*document.getElementById("pdfManager").querySelector("#pdfContainer #pdfViewer .page").style.width = "100%"
            document.getElementById("pdfManager").querySelector("#pdfContainer #pdfViewer .page .canvasWrapper").style.width = "100%"
            document.getElementById("pdfManager").querySelector("#pdfContainer #pdfViewer .page .canvasWrapper canvas").style.width = "100%"

            document.getElementById("pdfManager").querySelector("#pdfContainer #pdfViewer .page").style.height = "100%"
            document.getElementById("pdfManager").querySelector("#pdfContainer #pdfViewer .page .canvasWrapper").style.height = "200%"
            document.getElementById("pdfManager").querySelector("#pdfContainer #pdfViewer .page .canvasWrapper canvas").style.height = "100%"
            */
        },
        PaginationSelect(e){

            const vuecomp = this;
            if(e){
               if(typeof e != "undefined" || e != null){
                   vuecomp.pdfCurrentPage = e;
               }
            }
        },
        closeSmartPanel(){
            this.smartPanelShow = false;
        },
        checkOverflow(el)
        {
            var curOverflow = el.style.overflow;

            if ( !curOverflow || curOverflow === "visible" )
                el.style.overflow = "hidden";

            var isOverflowing = el.clientWidth < el.scrollWidth
                || el.clientHeight < el.scrollHeight;

            el.style.overflow = curOverflow;

            return isOverflowing;
        },
        setCurrentPage(newVal){
            const vuecomp = this;
            if(newVal != vuecomp.pdfCurrentPage){
                 vuecomp.pdfCurrentPage = newVal;
            }

        },
        resetCurrentPage(){
            this.pdfCurrentPage = 1;
        },

    },
    created(){
        this.$store.dispatch("setDocInViewById",this.id);
    },
    mounted(){

            let widthVal = document.getElementById('docViewParent');
            widthVal.style.marginTop =  (document.getElementById('hder').offsetHeight)+'px';

            window.addEventListener('resize', function() {

                widthVal.style.marginTop =  (document.getElementById("hder").offsetHeight)+"px";

            }, true);

    },

}
</script>
 <style  scoped >
    @import '../sass/documentViewComp.scss';
</style>
