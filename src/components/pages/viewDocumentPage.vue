<template>
<!--
    :currentDocName="getCurentDocumentComputed ? getCurentDocumentComputed[0].title :'Clauses'"
    :viewDocumentList="viewDocumentList"

-->
   <viewDocumentPage

      :goToNextPage="goToNextPage"
      :zoomIn="pdfViewerZoomIn"
      :zoomOut="pdfViewerZoomOut"
      :goToPreviousPage="goToPreviousPage"
    :documentListRow="getDocumentList"
    :viewDocumentList="viewDocumentList"
    :viewDocumenCardtList="viewDocumenCardtList"

    canvasId="pdf"

    :smartQueueTitle="'Smart Panel'"
    :type="'smartPanel'"

    :smartPanelMenuBtnClick="smartPanelMenuBtnMethod"
    :smartPanelHeaderCtaIconSrc="$apogeeMedia.task_icon"
     :smallDesc="'Data extraction & Smart annotation'"

     :viewClassifierCard="viewClassifierCard"
     :classifierCancelBtnMethod="classifierCancel"
    :classifierSaveBtnClick="classifyDocument"
    :classifierTitle="'Classify Document'"
    :classifierSelectLabel="classifierSelectLabel"
    :classifierElementId="classifierElementId"
    :classifierListingOptions="classifierListingOptions"
    :classifierfileList="getDocumentList"

     :partitionListRow="$store.state.partitions"
    :smartPanelDisplayPartition="smartPanelDisplayPartition"
    :smartPanelDisplayAnnotations="smartPanelDisplayAnnotations"

    :onClauseTableFieldChange="onClauseTableFieldChange"
    :smartPanelDisplayMenu="smartPanelMenuDisplayComputed"
    :viewClausesTable="viewClausesTableComputed"

    :clauseTableHeaderBtnClick="clauseTableHeaderBtnClick"
    :viewLoaderIndicator="viewLoaderIndicatorComputed"

    :partTableExtractionSubmit="partitionsExtractionMethod"
    :metadataExtractionSubmit="metadataExtractionSubmit"
    :viewMetadata="viewMetadataComputed"
    :metadataHeaderBtnClick="metadataHeaderBtnClick"

    :navigationTabular="getMergedSectionsCOmputed"
    :navTabularUpdateNavRowPerPage="updateNavRowPerPage"
    :navTabularTextEditModalSaveBtnFunc="textEditModalSaveBtnFunc"

    :annotationsListRow="$store.state.annotations"

    :extractedTableData="extractedTableContentComputed"
    :viewExtractedTableData="viewExtractedTableDataComputed"
    :extractedTableDataNavRowPerPage="extractedTableDataNavRowPerPage"
    :extractedTableDataEditModalSaveBtnFunc="extractedTableDataEditModalSaveBtnFunc"
    :extractedTableHeaderBtnClick="extractedTableHeaderBtnClick"
    :extractedTableDownloadSubmit="extractedTableDownloadMethod"
    :extractedTableDocId="extratedTableDataDocumentIdComputed"
    :extractedTableList="$store.state.extractTableData"
    :viewExtractedTableCard="viewExtractedTableDataComputed"
    :extractedTableClickFunc="extractedTableClickFunc"

    :documentCardListHeaderBtnCLick="documentCardListHeaderBtnCLick"
   />

</template>
<script>
import { useRoute } from 'vue-router';

    export default {
        name: 'document-card',
        props:{

        },
        data(){
            return {
              viewMetadata: false,
              useTheRoute:  useRoute(),
              viewLoaderIndicator: false,
              smartPanelMenuDisplay: false,
              viewClausesTable: false,
              viewClassifierCard: this.$store.batchDocsTypeComputed == "" ? true:false,
              classifierTitle:  '',
              classifierSelectLabel: 'File Type',
              classifierElementId: '',
              navigationTabularData: {},
              viewExtractedTableData: false,
              extractedTableData: {},
              viewDocumenCardtList: false,
              //classifierBtnLabel:'',
              taskWatcher: [
                {
                  id: 0,
                  name: 'partition',
                  value: 'partition',
                  status: false,
                },
                {
                  id: 1,
                  name: 'classifydocument',
                  value: 'classifydocument',
                  status: false,
                }
              ],
              tasksBundler: [
                {
                  id: 0,
                  name: 'partition',
                  tasks: []
                },
                {
                  id: 1,
                  name: 'classifydocument',
                  tasks: []
                },
                {
                  id: 2,
                  name: 'metadata',
                  tasks: []
                },
                {
                  id: 3,
                  name: 'annotations',
                  tasks: []
                },
                ,
                {
                  id: 3,
                  name: 'extract',
                  tasks: []
                }
              ],
              classifierListingOptions: [
                {
                  id: 0,
                  title: "Agreement",
                  name: "Agreement",
                },
                {
                  id: 1,
                  title: "Application",
                  name: "Application",
                },
                {
                  id: 2,
                  title: "Arbitration",
                  name: "Arbitration",
                },
                {
                  id: 3,
                  title: "Bid",
                  name: "Bid",
                },
                {
                  id: 4,
                  title: "Certificate",
                  name: "Certificate",
                },
                {
                  id: 5,
                  title: "Contract",
                  name: "Contract",
                },
                {
                  id: 6,
                  title: "Lease",
                  name: "Lease",
                },
                {
                  id: 7,
                  title: "Memo",
                  name: "Memo",
                },
                {
                  id: 8,
                  title: "Proposal",
                  name: "Proposal",
                },
                {
                  id: 9,
                  title: "Report",
                  name: "Report",
                },
                {
                  id: 10,
                  title: "Resume",
                  name: "Resume",
                },
                {
                  id: 11,
                  title: "Waiver",
                  name: "Waiver",
                },
                {
                  id: 12,
                  title: "Other",
                  name: "Other",
                },
              ],
             partitionListRow: [
                /*
              {
                id: '0',
                title: 'Machine learning is the future',
                pageNumber: '1',
                myStyle: {
                  titleSection: { backgroundColor: ['blue', 'orange','green','purple','violet','pink','brown'][Math.floor(Math.random() * ['blue', 'orange','green','purple','violet','pink','brown'].length)], color: 'white'},
                },
                removeBtnClickFunc: this.partitionSubmited,
                extractBtnClickFunc:  this.partitionSubmited,
              },
              {
                id: '1',
                title: 'AIML learning is the future',
                pageNumber: '1',
                myStyle: {
                  titleSection: { backgroundColor: ['blue', 'orange','green','purple','violet','pink','brown'][Math.floor(Math.random() * ['blue', 'orange','green','purple','violet','pink','brown'].length)], color: 'white'},
                },
                removeBtnClickFunc: this.partitionSubmited,
                extractBtnClickFunc:  this.partitionSubmited,
              },
              {
                id: '2',
                title: 'AI learning is the future',
                pageNumber: '1',
                myStyle: {
                  titleSection: { backgroundColor: ['blue', 'orange','green','purple','violet','pink','brown'][Math.floor(Math.random() * ['blue', 'orange','green','purple','violet','pink','brown'].length)], color: 'white'},
                },
                removeBtnClickFunc: this.partitionSubmited,
                extractBtnClickFunc:  this.partitionSubmited,
              }
              */
            ],
            smartPanelDisplayPartition: false,
            smartPanelDisplayAnnotations: false,
            viewDocumentList: false,
            //  classifierSaveBtnClick:'',


            }
        },
        watch:{
          '$router': {
            handler: async function(search) {
              const vuecomp = this;
              const getDocId = this.getDocumentIdFromUrl();
              if(search){
                //vuecomp.$store.dispatch("clearPartition");
                  //  try {
                           await vuecomp.setPdf(getDocId)
                     //   } catch (e) {
                      //     alert("okay")
                       // } finally {
                       //     console.log('We do cleanup here');
                        //}

                /*
                vuecomp.setPdf(getDocId).catch((error) => {
                  alert(error)
                });*/
                //vuecomp.$store.dispatch("setInViewDocumentId", );
              }

            },
            deep: true,
            immediate: true
          },
          taskWatcher: {
             handler: function(task) {
              const vuecomp = this;
             // const getDocId = this.getDocumentIdFromUrl();
              if(task){
                const getRunningTask = vuecomp.taskWatcher.filter(function(el, index){
                    return el.status == true;
                });
                //console.log(getRunningTask)
                if(getRunningTask[0]){
                 // alert("heool")
                  vuecomp.viewLoaderIndicator = true;
                }else{
                   // alert("heooltrue")
                  vuecomp.viewLoaderIndicator = false;
                }

              }

            },
            deep: true,
            immediate: true
          },
          tasksBundler: {
             handler: function(task) {
              const vuecomp = this;
             // const getDocId = this.getDocumentIdFromUrl();
              if(task){
                const getRunningTask = vuecomp.tasksBundler.filter(function(el, index){
                    return el.tasks.length > 0;
                });
                //console.log(getRunningTask)
                if(getRunningTask[0]){
                 // alert("heool")
                  vuecomp.viewLoaderIndicator = true;
                }else{
                   // alert("heooltrue")
                  vuecomp.viewLoaderIndicator = false;
                }

              }

            },
            deep: true,
            immediate: true
          },
         "$store.partitions": {
           handler: function(val){
             //alert("okay")
             const vuecomp = this;
             var getMergedSections = [];
             //console.log( vuecomp.$store.state.partitions)
             //if(typeof val != "undefined"){
              vuecomp.$store.state.partitions.forEach(function(el, index){

                  el.sections.forEach(function(secEl, secIndex){
                    var getSecEl = {};
                   /* delete secEl["x0"];
                    delete secEl["y0"];
                    delete secEl["x1"];
                    delete secEl["y1"];
                    delete secEl["width"];
                    delete secEl["height"];
                    delete secEl["page_width"];
                    delete secEl["page_height"];
                    delete secEl["section_ref_id"];*/
                    getSecEl.page = secEl.page;
                    getSecEl.title = el.title;
                    getSecEl.text = secEl.text;
                    getSecEl.dataKey = "part_"+index+"_secRef_"+secEl.section_ref_id;
                    //console.log(getSecEl);
                    //secEl.dataKey = "part_"+index+"_secRef_"+secEl.section_ref_id;
                   // getMergedSections.push(getSecEl);
                    getMergedSections.push({...getSecEl});
                  })
                  //console.log(el.text)
                });
                  //console.log(getMergedSections)
                 // alert(getMergedSections.length-1)
                // console.log(vuecomp.$apogeeActions.navigationTabular)
                 vuecomp.navigationTabularData = null;
                vuecomp.navigationTabularData = {};
              vuecomp.navigationTabularData = vuecomp.$apogeeActions.navigationTabular.BuildTableNavigation(
                                              getMergedSections,
                                              "document mania",
                                              (getMergedSections.length-1),
                                              {th: {}, tr:{},td:{}} , 2, "navTable",
                                              ["Page","Title","Text"])

                 // console.log(vuecomp.navigationTabularData)
           // }

           },
           deep: true,
           immediate: true
         },
          "$store.extractTableData": {
           handler: function(val){

             const vuecomp = this;
             var getMergedSections = [];
             //console.log( vuecomp.$store.state.partitions)
             //if(typeof val != "undefined"){
               //alert("okay")

                  //console.log(getMergedSections)

                //Object.entries(vuecomp.$store.state.extractTableData).forEach(([key, value]) => {
                   // console.log(`${key} ${value}`); // "a 5", "b 7", "c 9"

                   vuecomp.$store.state.extractTableData.forEach(function(el, index){
                     if(el.id == vuecomp.$store.state.currentDocumentTableId){
                        el.table_objects[0]?.table_contents?.forEach(function(secEl, secIndex){
                          getMergedSections.push(secEl);
                        })
                      }else{
                        el.table_objects[0]?.table_contents?.forEach(function(secEl, secIndex){
                          getMergedSections.push(secEl);
                        })
                      }
                    })

                   /*
                   if(typeof vuecomp.$store.state.extractTableData.table_objects != "undefined"){
                     //alert("okay")
                    vuecomp.$store.state.extractTableData?.table_objects[0]?.table_contents?.forEach(function(secEl, secIndex){
                      getMergedSections.push(secEl);
                    })
                   }
                   */
                //});
              // console.log(vuecomp.$store.state.extractTableData)
               //console.log(getMergedSections)

              vuecomp.extractedTableData =  vuecomp.$apogeeActions.navigationTabular.BuildTableNavigation(
                                              getMergedSections,
                                              "document mania",
                                              (getMergedSections.length-1),
                                              {th: {}, tr:{},td:{}} , 2, "navTable",
                                              [])

                      //  console.log(vuecomp.extractedTableData)
            //}

           },
           deep: true,
           immediate: true
         },
         extractTableDataComputed(val){
           //alert(val)
            const vuecomp = this;
            var getMergedSections = [];
             //console.log( vuecomp.$store.state.partitions)
            // if(typeof val != "undefined"){

                  //console.log(getMergedSections)

                vuecomp.$store.state.extractTableData.forEach(function(el, index){
                      if(el.id == vuecomp.$store.state.currentDocumentTableId){
                      el.table_objects[0]?.table_contents?.forEach(function(secEl, secIndex){
                        getMergedSections.push(secEl);
                      })
                     }else{
                        el.table_objects[0]?.table_contents?.forEach(function(secEl, secIndex){
                          getMergedSections.push(secEl);
                        })
                      }
                  })

                //Object.entries(vuecomp.$store.state.extractTableData).forEach(([key, value]) => {
                   // console.log(`${key} ${value}`); // "a 5", "b 7", "c 9"
                   /*
                   if(typeof vuecomp.$store.state.extractTableData.table_objects != "undefined"){
                     //alert("okay")
                    vuecomp.$store.state.extractTableData?.table_objects[0]?.table_contents?.forEach(function(secEl, secIndex){
                      getMergedSections.push(secEl);
                    })
                   }*/
                //});
               console.log(vuecomp.$store.state.extractTableData)
              // console.log(getMergedSections)

              vuecomp.extractedTableData =  vuecomp.$apogeeActions.navigationTabular.BuildTableNavigation(
                                              getMergedSections,
                                              "document mania",
                                              (getMergedSections.length-1),
                                              {th: {}, tr:{},td:{}} , 2, "navTable",
                                              [])
         },
         storePartitionComputed(val){
          // alert("if you dare "+val)
         },
         "$store.currentDocumentTableId": function(val){
           const vuecomp = this;
            var getMergedSections = [];

           if(val){
            vuecomp.$store.state.extractTableData.forEach(function(el, index){
                if(el.id == data.id){
                  el.table_objects[0]?.table_contents?.forEach(function(secEl, secIndex){
                    getMergedSections.push(secEl);
                  })
                }
              })

              vuecomp.extractedTableData =  vuecomp.$apogeeActions.navigationTabular.BuildTableNavigation(
                                              getMergedSections,
                                              "document mania",
                                              (getMergedSections.length-1),
                                              {th: {}, tr:{},td:{}} , 2, "navTable",
                                              [])
           }
         }
        },
        computed: {
          extractTableDataComputed(){
            return this.$store.state.extractTableData;
          },
          getDocumentList(){
              return this.$store.state.docs.filter(function(el){
                  return el.uploaded == true;
              });
          },
          getCurentDocumentComputed(){
            const vuecomp = this;
              return this.$store.state.docs.filter(function(el){
                  return el.uploadId == vuecomp.getDocumentIdFromUrl();;
              });
          },
          smartPanelMenuDisplayComputed(){
            return this.smartPanelMenuDisplay;
          },
          viewClausesTableComputed(){
            return this.viewClausesTable;
          },
          viewLoaderIndicatorComputed(){
            return this.viewLoaderIndicator;
          },
          batchDocsTypeComputed(){
            return this.$store.batchDocsType;
          },
          viewMetadataComputed(){
            return this.viewMetadata;
          },
          getMergedSectionsCOmputed(){
            const vuecomp = this;
             // alert("hello")
            return vuecomp.navigationTabularData;
          },
          extractedTableContentComputed(){
            return this.extractedTableData
            //return this.$store.state.extractTableData?.table_objects?.table_contents;
          },
          viewExtractedTableDataComputed(){
            return this.viewExtractedTableData;

          },
          extratedTableDataDocumentIdComputed(){
            //console.log(this.$store.extractTableData)
            //alert(this.$store.extractTableData.document_id+" say what")
            return this.$store.state.extractTableData?.document_id; //this.$store.extractTableData?.document_id
          },
          storePartitionComputed(){
            return this.$store.state.partitions;
          }
        },
        methods: {
          async goToNextPage(){
            const vuecomp = this;

            vuecomp.$apogeeActions.pdfManager.goToNextPage();
            if(vuecomp.$store.state.partitions){
               await vuecomp.$apogeeActions.pdfManager.createNotationBoundingBox(vuecomp.$store.state.partitions, true, vuecomp.getDocumentIdFromUrl())
            }
          },
          async goToPreviousPage(){
            const vuecomp = this;

            vuecomp.$apogeeActions.pdfManager.goToPreviousPage()
            if(vuecomp.$store.state.partitions){
              await vuecomp.$apogeeActions.pdfManager.createNotationBoundingBox(vuecomp.$store.state.partitions,  true, vuecomp.getDocumentIdFromUrl())
            }

          },
          async pdfViewerZoomIn(){
            const vuecomp = this;

            vuecomp.$apogeeActions.pdfManager.zoomIn()
            if(vuecomp.$store.state.partitions){
            await  vuecomp.$apogeeActions.pdfManager.createNotationBoundingBox(vuecomp.$store.state.partitions, true, vuecomp.getDocumentIdFromUrl())
            }

          },
          async pdfViewerZoomOut(){
            const vuecomp = this;

            vuecomp.$apogeeActions.pdfManager.zoomOut()
            if(vuecomp.$store.state.partitions){
              await vuecomp.$apogeeActions.pdfManager.createNotationBoundingBox(vuecomp.$store.state.partitions, true, vuecomp.getDocumentIdFromUrl())
            }

          },
          getDocumentIdFromUrl(){
            return location.href.split("/")[location.href.split("/").length-1]
          },
          setPdf: async function(docId){
            const vuecomp = this;
            if(document.getElementById("pdf"))
              vuecomp.$apogeeActions.pdfManager.resetPdf();

              this.$apogeeActions.apiManager.getDocumentById(docId).then(async function(data){
                if(typeof data === 'object'){
                  if(vuecomp.$store.state.docs.length <= 0)
                    return

                  const getDoc = vuecomp.$store.state.docs.filter(function(el, index){
                                    return el.uploadId == data.id;
                                  });
                  if(getDoc[0])
                    if(getDoc[0].uploadId == data.id){
                     // alert(getDoc[0].file.name)
                     //  console.log(getDoc[0])
                     // const getFileType = await vuecomp.$apogeeActions.actionsHelper.actionsFileTypeFinder(getDoc[0].file);
                      //if(getFileType == "pdf")
                       // vuecomp.$apogeeActions.pdfManager.init(URL.createObjectURL(getDoc[0].file), 1, "pdf");
                       /*let getUrlCreateObject ;
                        try {
                            getUrlCreateObject = vuecomp.getUrlCreateObject(getDoc[0].file)
                        } catch (e) {
                            console.error(e);
                            alert(e)
                        }
                        try {
                            getUrlCreateObject =   vuecomp.getUrlCreateObject(getDoc[0].file)
                        } catch (e) {
                            console.error(e);
                            //alert(e)
                        }*/
                        /*
                        const getUrlCreateObject = await vuecomp.getUrlCreateObject(getDoc[0].file).catch(error=>{
                          //alert(error)
                        })*/
                        //alert(getUrlCreateObject)
                       // console.log(getUrlCreateObject);
                     // if(typeof getUrlCreateObject != "undefined") {

                        if(getDoc[0].objType == "file" && getDoc[0].fileExt == "pdf"){
                          await vuecomp.$apogeeActions.pdfManager.init(getDoc[0].fileUrlObject, 1, "pdf");
                          if(vuecomp.$store.state.partitionPageNumber != ""){
                            await vuecomp.$apogeeActions.pdfManager.gotoPage(vuecomp.$store.state.partitionPageNumber);
                            vuecomp.$store.dispatch("clearPartitionPageNumber");
                          }
                            await vuecomp.$apogeeActions.pdfManager.createNotationBoundingBox(vuecomp.$store.state.partitions, true, vuecomp.getDocumentIdFromUrl());

                        }else{
                          await vuecomp.$apogeeActions.pdfManager.init(getDoc[0].file, 1, "pdf");
                          await vuecomp.$apogeeActions.pdfManager.createNotationBoundingBox(vuecomp.$store.state.partitions, true, vuecomp.getDocumentIdFromUrl());

                        }

                     // }
                    }
                }
              })
          },
          async getUrlCreateObject(obj){
            return URL.createObjectURL(obj);
          },
          smartPanelMenuBtnMethod: async function(e){
            const vuecomp = this;
              const getName = e.currentTarget.getAttribute("data-name");
              //alert("okay")
              if(vuecomp.smartPanelMenuDisplay == "false"){
                //alert("okay")
                vuecomp.smartPanelMenuDisplay = false;

              }else if(vuecomp.smartPanelMenuDisplay == false){
                //alert("okay 2")
                vuecomp.smartPanelMenuDisplay = "false";
              }

              if(getName == "Partition"){

                vuecomp.smartPanelDisplayPartition = true;
                vuecomp.viewDocumentList = false;
                vuecomp.viewDocumenCardtList = false;

                //vuecomp.viewMetadata= false;
                //alert("Partitioning Complete. Bravo!")
                alert("Please wait for the process to finish");
                await vuecomp.$store.state.docs.forEach( await async function(el, index){

                  //vuecomp.setTaskWatcherTaskTrueStatus(getName.toLowerCase());
                  vuecomp.pushToTasksBundler(getName.toLowerCase());

                  //vuecomp.useTheRoute.params.id

                   const uploadResult = await vuecomp.$apogeeActions.apiManager.partitionDocument(el.uploadId);
                 // alert("Please wait for the process to finish");
                  if(uploadResult){

                    if(typeof uploadResult.articles != "undefined"){
                      console.log("partition")
                      console.log(uploadResult)
                   const getformartedPartition =   await vuecomp.formatPartion({partition: uploadResult, uploadId: el.uploadId});

                   getformartedPartition.forEach(await async function(partEl, partIndel) {
                       await vuecomp.$store.dispatch('pushNewPartition', partEl);
                       //vuecomp.setTaskWatcherTaskFalseStatus(getName.toLowerCase());
                    })
                   await vuecomp.$apogeeActions.pdfManager.createNotationBoundingBox(vuecomp.$store.state.partitions, true, vuecomp.getDocumentIdFromUrl());

                      //alert("Partitioning Complete. Bravo!")


                    }else{
                      alert("Document can not be partition")
                      //vuecomp.setTaskWatcherTaskFalseStatus(getName.toLowerCase());

                      vuecomp.popFromTasksBundler(getName.toLowerCase());

                      vuecomp.viewLoaderIndicator = false;
                      return
                    }
                    //vuecomp.setTaskWatcherTaskFalseStatus(getName.toLowerCase());

                    vuecomp.popFromTasksBundler(getName.toLowerCase());

                    //alert("Partitioning Complete. Bravo!")
                    vuecomp.viewLoaderIndicator = false;

                  }else{
                      alert("Document can not be partition")
                      //vuecomp.setTaskWatcherTaskFalseStatus(getName.toLowerCase());

                      vuecomp.popFromTasksBundler(getName.toLowerCase());

                        vuecomp.viewLoaderIndicator = false;
                        return;
                  }
                });
               // alert("Partitioning Complete. Bravo!")
               // vuecomp.viewLoaderIndicator = false;

                // get(filter) current file partitions in order to display
                /* await vuecomp.$apogeeActions.pdfManager.createNotationBoundingBox(vuecomp.$store.state.partitions.filter(el=>{
                        return el.uploadId == vuecomp.useTheRoute.params.id;
                     }), true,false)*/

              //  await vuecomp.$apogeeActions.pdfManager.createNotationBoundingBox(vuecomp.$store.state.partitions, true, vuecomp.getDocumentIdFromUrl());
              }else if(getName == "Extract"){

                const vuecomp = this;
                vuecomp.pushToTasksBundler(getName.toLowerCase());
                vuecomp.viewExtractedTableData = true;
                vuecomp.viewDocumentList = false;
                vuecomp.viewDocumenCardtList = false;
              /*
                const uploadResult = {
                    "id": "d085e482-9686-11ec-abfb-0242ac120004",
                    "document_id": "c39fb608-9686-11ec-abfb-0242ac120004",
                    "datetime_created": "2022-02-25T22:03:51",
                    "table_objects": "[{\"page_num\": 0, \"table_type\": \"border\", \"page_size\": {\"width\": 1700, \"height\": 2200}, \"coords\": {\"x0\": 226, \"y0\": 398, \"x1\": 1514, \"y1\": 956}, \"table_contents\": [{\"0\": \"Disability Category\", \"1\": \"Participants\", \"2\": \"Ballots Completed\", \"3\": \"Ballots Incomplete/ Terminated\", \"4\": \"Results\", \"5\": \"\"}, {\"0\": \"\", \"1\": \"\", \"2\": \"\", \"3\": \"\", \"4\": \"Accuracy\", \"5\": \"Time to complete\"}, {\"0\": \"Blind\", \"1\": \"5\", \"2\": \"1\", \"3\": \"4\", \"4\": \"34.5%, n=1\", \"5\": \"1199 sec, n=1\"}, {\"0\": \"Low Vision\", \"1\": \"5\", \"2\": \"2\", \"3\": \"3\", \"4\": \"98.3% n=2 (97.7%, n=3)\", \"5\": \"1716 sec, n=3 (1934 sec, n=2)\"}, {\"0\": \"Dexterity\", \"1\": \"5\", \"2\": \"4\", \"3\": \"1\", \"4\": \"98.3%, n=4\", \"5\": \"1672.1 sec, n=4\"}, {\"0\": \"Mobility\", \"1\": \"3\", \"2\": \"3\", \"3\": \"0\", \"4\": \"95.4%, n=3\", \"5\": \"1416 sec, n=3\"}], \"assoc_text\": [\"Example table This is an example of a data table\", \"None\"]}]"
                  };*/

                const uploadResult =  await vuecomp.$apogeeActions.apiManager.extractTable(vuecomp.useTheRoute.params.id)

                if(typeof uploadResult.table_objects != "undefined"){
                  //alert("yes")
                  uploadResult.table_objects = JSON.parse(uploadResult.table_objects);
                  await vuecomp.$store.dispatch('addExtractedTableData', uploadResult);
                }

                vuecomp.popFromTasksBundler(getName.toLowerCase());

               // vuecomp.viewExtractedTableData = false;

                //await vuecomp.$store.dispatch('addExtractedTable', partEl);

              }else if(getName == "viewExtractedTable"){
                vuecomp.viewClausesTable = false;
                vuecomp.viewExtractedTableData = false;
                vuecomp.viewExtractedTableData = true;
                vuecomp.smartPanelDisplayPartition = false;
                vuecomp.viewDocumentList = false;
                vuecomp.viewDocumenCardtList = false;
              }else if(getName == "Standardize"){

                const uploadResult = await vuecomp.$apogeeActions.apiManager.standardizeTable(vuecomp.useTheRoute.params.id)
              }else if(getName == "Join"){

                const uploadResult = await vuecomp.$apogeeActions.apiManager.joinTables(vuecomp.useTheRoute.params.id)
              }else if(getName == "UpdateClause"){

                const uploadResult = await vuecomp.$apogeeActions.apiManager.updateClausesDocument(vuecomp.useTheRoute.params.id)

              }else if(getName == "ViewClause"){
                vuecomp.viewClausesTable = false;
                vuecomp.viewClausesTable = true;
                vuecomp.viewExtractedTableData = false;
                vuecomp.viewDocumentList = false;
                vuecomp.viewDocumenCardtList = false;
                //const uploadResult = await vuecomp.$apogeeActions.apiManager.viewClausesDocument(vuecomp.useTheRoute.params.id)

              }else if(getName == "ViewMetadata"){
                vuecomp.viewClausesTable = false;
                vuecomp.viewClausesTable = false;
                vuecomp.viewExtractedTableData = false;
                vuecomp.viewMetadata= true;
                vuecomp.viewDocumentList = true;
                vuecomp.viewDocumenCardtList = true;
                vuecomp.smartPanelDisplayPartition = false;

              }else if(getName == "ClassifyDocument"){
                //alert("hello")
                vuecomp.viewClassifierCard = true;
                   const getDoc = vuecomp.$store.state.docs.filter(function(el, index){
                                    return el.uploadId ==   vuecomp.getDocumentIdFromUrl();
                                  });
                  if(getDoc[0]){
                    //console.log(getDoc[0]);
                    vuecomp.classifierElementId = getDoc[0].uploadId;
                    vuecomp.classifierSelectLabel = "File Type"; //getDoc[0].text;
                    // vuecomp.getDoc[0].document_type;
                  }
                  //vuecomp.classifierSelectLabel: '',
                 // vuecomp.classifierElementId =  vuecomp.getDocumentIdFromUrl();

                 // vuecomp.classifierBtnLabel =  this.getDocumentIdFromUrl();
                //const uploadResult = await vuecomp.$apogeeActions.apiManager.updateDocumentClassification(vuecomp.useTheRoute.params.id)
              }else if( getName == 'documentList'){
                //alert("yes")
                vuecomp.smartPanelDisplayPartition = false;
                vuecomp.smartPanelDisplayAnnotations = false;
                vuecomp.viewExtractedTableData = false;
                vuecomp.viewDocumentList = true;
                vuecomp.viewDocumenCardtList = true;
              }else if( getName == 'metadata'){

                vuecomp.pushToTasksBundler(getName.toLowerCase());
                vuecomp.viewMetadata= true;
                vuecomp.viewDocumentList = false;
                vuecomp.viewDocumenCardtList = false;
                //if()
                //vuecomp.smartPanelDisplayPartition = false;
                //const getUploaded = [{"document_id":"d8d10918-8da9-11ec-9697-0242c0a8de03","project_name":"236-40858-22 (404-0166)-doran","description":"NON I.C.I. AGREEMENT INCLUSIVE OF ALL RESIDENTIAL CONSTRUCTION THESE ARTICLES CONSTITUTE A COLLECTIVE AGREEMENT ENTERED INTO BETWEEN: DORAN CONTRACTORS LTD. (herein referred to as the \"Employer\") and THE LABOURERS' INTERNATIONAL UNION OF NORTH AMERICA, LOCAL 527 (herein referred to as the \"Union\" or","counter_party":"DORAN CONTRACTORS LTD","contract_effective_date":"20","contract_expiration_date":"April 30","legal_entity":"","contract_status":"Inactive","parent_agreement":"Unknown","region":"Canada","term_type":"","contract_amount":"42 ½)","contract_type":"agreements","exceptions":[{"failed_text":"AGREEMENT INCLUSIVE OF ALL RESIDENTIAL CONSTRUCTION THESE ARTICLES CONSTITUTE A COLLECTIVE AGREEMENT ENTERED INTO BETWEEN: <<DORAN CONTRACTORS LTD>>.","exc_position":[[123,144]],"attempted_ner_label":{"_value":"COUNTER_PARTY","_score":0.9351273775100708}},{"failed_text":"2019 until <<April 30>>, 2022 including the Local Union Schedules for Local 527 Ottawa are incorporated into and form part of this Agreement and shall apply to all work covered by this Agreement subject to the provisions set out below.","exc_position":[[11,19]],"attempted_ner_label":{"_value":"CONTRACT_EXPIRATION_DATE","_score":0.8683481812477112}},{"failed_text":"4.02 The regular hours of work are Forty-Two and one-half (<<42 ½)>> per week.","exc_position":[[59,64]],"attempted_ner_label":{"_value":"CONTRACT_AMOUNT","_score":0.7156829237937927}},{"failed_text":"4.04 In the event that forty-two and one-half (<<42 ½)>> hours are not worked between Monday 7:00 a.m. and Friday 4:30 p.m. of each week, make up time may be worked on Saturday of the current work week at the regular rate of pay to a maximum of forty-two and oneMhalf (<<42 ½)>> hours between 7:00 a.m. and 4:30 p.m. by agreement of the parties.","exc_position":[[47,52]],"attempted_ner_label":{"_value":"CONTRACT_AMOUNT","_score":0.7840710580348969}},{"failed_text":".,,, <<tZo b day>> of ~~I.J/i1-'( • II LABOlJRRS' INTER~ NAL UNION OF NORTH AMERICA, LOCAL 527 Non-IC!","exc_position":[[5,14]],"attempted_ner_label":{"_value":"CONTRACT_AMOUNT","_score":0.4499363402525584}},{"failed_text":"2019 to <<April 30th>>• 2022 - Onmn C\"ontmclon.","exc_position":[[8,18]],"attempted_ner_label":{"_value":"CONTRACT_EXPIRATION_DATE","_score":0.7421829402446747}},{"failed_text":"<<20>> 19 tu April 30'11• <<20>>22 - Doran (\\mtmctors Lt<l.","exc_position":[[0,2]],"attempted_ner_label":{"_value":"CONTRACT_EFFECTIVE_DATE","_score":0.893185019493103}}]}];
               /*
                const getUploaded =  [
                                        {
                                            "document_id": "26d50abc-8e4d-11ec-8b1a-0242c0a8de03",
                                            "project_name": "236-40858-22 (404-0166)-doran",
                                            "description": "NON I.C.I. AGREEMENT INCLUSIVE OF ALL RESIDENTIAL CONSTRUCTION THESE ARTICLES CONSTITUTE A COLLECTIVE AGREEMENT ENTERED INTO BETWEEN: DORAN CONTRACTORS LTD. (herein referred to as the \"Employer\") and THE LABOURERS' INTERNATIONAL UNION OF NORTH AMERICA, LOCAL 527 (herein referred to as the \"Union\" or",
                                            "counter_party": "DORAN CONTRACTORS LTD",
                                            "contract_effective_date": "20",
                                            "contract_expiration_date": "April 30",
                                            "legal_entity": "",
                                            "contract_status": "Inactive",
                                            "parent_agreement": "Unknown",
                                            "region": "Canada",
                                            "term_type": "",
                                            "contract_amount": "42 ½)",
                                            "contract_type": "agreements",
                                            "exceptions": [
                                                {
                                                    "failed_text": "AGREEMENT INCLUSIVE OF ALL RESIDENTIAL CONSTRUCTION THESE ARTICLES CONSTITUTE A COLLECTIVE AGREEMENT ENTERED INTO BETWEEN: <<DORAN CONTRACTORS LTD>>.",
                                                    "exc_position": [
                                                        [
                                                            123,
                                                            144
                                                        ]
                                                    ],
                                                    "attempted_ner_label": {
                                                        "_value": "COUNTER_PARTY",
                                                        "_score": 0.9351273775100708
                                                    }
                                                },
                                                {
                                                    "failed_text": "2019 until <<April 30>>, 2022 including the Local Union Schedules for Local 527 Ottawa are incorporated into and form part of this Agreement and shall apply to all work covered by this Agreement subject to the provisions set out below.",
                                                    "exc_position": [
                                                        [
                                                            11,
                                                            19
                                                        ]
                                                    ],
                                                    "attempted_ner_label": {
                                                        "_value": "CONTRACT_EXPIRATION_DATE",
                                                        "_score": 0.8683481812477112
                                                    }
                                                },
                                                {
                                                    "failed_text": "4.02 The regular hours of work are Forty-Two and one-half (<<42 ½)>> per week.",
                                                    "exc_position": [
                                                        [
                                                            59,
                                                            64
                                                        ]
                                                    ],
                                                    "attempted_ner_label": {
                                                        "_value": "CONTRACT_AMOUNT",
                                                        "_score": 0.7156829237937927
                                                    }
                                                },
                                                {
                                                    "failed_text": "4.04 In the event that forty-two and one-half (<<42 ½)>> hours are not worked between Monday 7:00 a.m. and Friday 4:30 p.m. of each week, make up time may be worked on Saturday of the current work week at the regular rate of pay to a maximum of forty-two and oneMhalf (<<42 ½)>> hours between 7:00 a.m. and 4:30 p.m. by agreement of the parties.",
                                                    "exc_position": [
                                                        [
                                                            47,
                                                            52
                                                        ]
                                                    ],
                                                    "attempted_ner_label": {
                                                        "_value": "CONTRACT_AMOUNT",
                                                        "_score": 0.7840710580348969
                                                    }
                                                },
                                                {
                                                    "failed_text": ".,,, <<tZo b day>> of ~~I.J/i1-'( • II LABOlJRRS' INTER~ NAL UNION OF NORTH AMERICA, LOCAL 527 Non-IC!",
                                                    "exc_position": [
                                                        [
                                                            5,
                                                            14
                                                        ]
                                                    ],
                                                    "attempted_ner_label": {
                                                        "_value": "CONTRACT_AMOUNT",
                                                        "_score": 0.4499363402525584
                                                    }
                                                },
                                                {
                                                    "failed_text": "2019 to <<April 30th>>• 2022 - Onmn C\"ontmclon.",
                                                    "exc_position": [
                                                        [
                                                            8,
                                                            18
                                                        ]
                                                    ],
                                                    "attempted_ner_label": {
                                                        "_value": "CONTRACT_EXPIRATION_DATE",
                                                        "_score": 0.7421829402446747
                                                    }
                                                },
                                                {
                                                    "failed_text": "<<20>> 19 tu April 30'11• <<20>>22 - Doran (\\mtmctors Lt<l.",
                                                    "exc_position": [
                                                        [
                                                            0,
                                                            2
                                                        ]
                                                    ],
                                                    "attempted_ner_label": {
                                                        "_value": "CONTRACT_EFFECTIVE_DATE",
                                                        "_score": 0.893185019493103
                                                    }
                                                }
                                            ]
                                        }
                                    ];
                                    */

                const getUploaded = await vuecomp.$apogeeActions.apiManager.extractBatchMetaData(
                  vuecomp.getDocsAllUploadedId()
                );

               // alert("what")
                //delete getUploaded[0]['exceptions'];
                //getUploaded[0].doc_id =  getUploaded[0].document_id;
                console.log(getUploaded[0])
                if(getUploaded[0]){
                  getUploaded.forEach(function(el, index){
                    if(el){
                     // alert("okay")
                     // console.log(el)
                     el.doc_id = el.document_id;
                    /* el.exceptions.forEach(function(el, index){
                      delete el.ner_exception;
                      delete el.match_list;
                     })*/
                     //for(const [metaEl, metaIndex]  el.exceptions])
                      vuecomp.$store.dispatch("addDocMetaData", { uploadId: el.doc_id, metadata: el});
                    }
                  })

                }
                 vuecomp.popFromTasksBundler(getName.toLowerCase());
                // vuecomp.smartPanelDisplayPartition = false;
              }else if(getName == "partitionList"){
                vuecomp.smartPanelDisplayPartition = true;
                vuecomp.smartPanelDisplayAnnotations = false;
                vuecomp.viewExtractedTableData = false;
                vuecomp.viewDocumentList = false;
                vuecomp.viewDocumenCardtList = false;
              }else if(getName == "annotationsList"){
                vuecomp.smartPanelDisplayAnnotations = true;
              }else if( getName == 'annotations'){
                        vuecomp.pushToTasksBundler(getName.toLowerCase());
                //vuecomp.viewMetadata= true;
                  vuecomp.smartPanelDisplayAnnotations = true;
                vuecomp.viewDocumentList = false;
                vuecomp.viewDocumenCardtList = false;

                const getUploaded = await vuecomp.$apogeeActions.apiManager.documentsAnnotations(
                  vuecomp.getDocsAllUploadedId()
                );
                    console.log(getUploaded[0])
                if(getUploaded[0]){
                  getUploaded.forEach(function(el, index){
                    if(el){
                     // alert("okay")
                     // console.log(el)
                     /*el.doc_id = el.document_id;
                     el.exceptions.forEach(function(el, index){
                      delete el.ner_exception;
                      delete el.match_list;
                     })*/

                     vuecomp.$store.dispatch("addAnnotations", el);
                     // vuecomp.$store.dispatch("pushNewAnnotation", { uploadId: el.doc_id, metadata: el});
                    }
                  })

                }

                    //$store.state.annotations.
                    /*vuecomp.$store.dispatch("addAnnotations", [
                        {
                          id: 0,
                          page: 1,
                          value: "John Doe",
                          title: "Owner",
                          editBtnClickFunc: vuecomp.annotationSubmited,
                          removeBtnClickFunc: vuecomp.annotationSubmited,
                          myStyle: {
                            valueColor: {backgroundColor: 'blue',color:'black'},
                          }
                        },
                        {
                          id: 1,
                          page: 2,
                          value: "Not Jone Doe",
                          title: "Partner",
                          editBtnClickFunc: vuecomp.annotationSubmited,
                          removeBtnClickFunc: vuecomp.annotationSubmited,
                          myStyle: {
                            valueColor:  {backgroundColor: 'red',color:'black'},
                          }
                        }
                    ]);*/
                 vuecomp.popFromTasksBundler(getName.toLowerCase());
              }

          },
          getDocsAllUploadedId(){
              const vuecomp = this;
              var getUploadId = [];

              vuecomp.$store.state.docs.forEach(function(el, index){
                if(typeof el.uploadId != 'undefined'){
                  getUploadId.push(el.uploadId);
                }
              })

              return getUploadId;
          },
          pushToTasksBundler(taskname){
            const vuecomp = this;
            vuecomp.tasksBundler.forEach(function(el, index){
              if(el.name == taskname){
                vuecomp.tasksBundler[index].tasks.push(taskname);
                return;
              }
            })
          },
          popFromTasksBundler(taskname){
            const vuecomp = this;
            vuecomp.tasksBundler.forEach(function(el, index){
              //alert(taskname)
              if(el.name == taskname){
                vuecomp.tasksBundler[index].tasks.pop();
                return;
              }
            })
          },
          setTaskWatcherTaskTrueStatus(taskname){
            const vuecomp = this;
            vuecomp.taskWatcher.forEach(function(el, index){
              if(el.name == taskname){
                vuecomp.taskWatcher[index].status = true;
                return;
              }
            })
          },
          setTaskWatcherTaskFalseStatus(taskname){
            const vuecomp = this;
            vuecomp.taskWatcher.forEach(function(el, index){
              //alert(el.name +" "+taskname)
              if(el.name == taskname){
                vuecomp.taskWatcher[index].status = false;
              //  alert("say what")
                return;
              }
            })
          },
          classifierCancel(){
               this.viewClassifierCard = false;
          },
          classifyDocument: async function(data){
            const vuecomp = this;
            vuecomp.classifierCancel();
            vuecomp.viewLoaderIndicator = true;

             const actionName = "ClassifyDocument";
            var getDoc = [];
           // alert(data)
            console.log(data)
            if (data.selectedDoc !== "All"){
              getDoc = vuecomp.$store.state.docs.filter(function(el, index){
                                    return el.uploadId ==   data.selectedDoc;
                                  });
            }

            if(data.selectedDoc == "All"){
             // alert("ww")
              vuecomp.$store.state.docs.forEach(await async function(el, index){

                //vuecomp.setTaskWatcherTaskTrueStatus(actionName.toLowerCase());
                vuecomp.pushToTasksBundler(actionName.toLowerCase());

                                  //  return el.uploadId ==   data.selectedDoc;
                               //   alert(el.uploadId)

              const classifyResult = await vuecomp.$apogeeActions.apiManager.updateDocumentClassification({
                  document_id: el.uploadId,
                  document_class:  data.value, //getDoc[0].data.document_type
                })
               // console.log("ClassifyDocument Ended")

                if(classifyResult){
                  console.log(classifyResult)
                  await vuecomp.$store.dispatch('updateDocClassification',{id: el.id , document_type: classifyResult.document_type});
                  console.log("ClassifyDocument Ended")
                  //vuecomp.setTaskWatcherTaskFalseStatus(actionName.toLowerCase());
                  vuecomp.popFromTasksBundler(actionName.toLowerCase());
                }
                });
                await vuecomp.$store.dispatch('changeBatchDocsType', data.value);

               // vuecomp.viewLoaderIndicator = false;
            }
            else if (getDoc[0]){

              //vuecomp.setTaskWatcherTaskTrueStatus(actionName.toLowerCase());
              vuecomp.pushToTasksBundler(actionName.toLowerCase());
             // alert("say what")
                                  //  return el.uploadId ==   data.selectedDoc;

              const classifyResult = await vuecomp.$apogeeActions.apiManager.updateDocumentClassification({
                  document_id: getDoc[0].uploadId,
                  document_class:  data.value, //getDoc[0].data.document_type
                })
               // console.log("ClassifyDocument Ended")

                if(classifyResult){
                    console.log(classifyResult)
                  await this.$store.dispatch('updateDocClassification',{id: getDoc[0].id , document_type: classifyResult.document_type});
                  console.log("ClassifyDocument Ended")
                  const getDocClassify = vuecomp.$store.state.docs.filter(function(el, index){
                                    return el.uploadId ==   data.elementId;
                                  });
                  console.log(getDocClassify[0])
                   //vuecomp.setTaskWatcherTaskFalseStatus(actionName.toLowerCase());
                   vuecomp.popFromTasksBundler(actionName.toLowerCase());

                }
             //   vuecomp.viewLoaderIndicator = false;
            }
            else if(data.elementId){
             const getDoc = vuecomp.$store.state.docs.filter(function(el, index){
                                    return el.uploadId ==   data.elementId;
                                  });
              if(getDoc[0]){
              //  alert("okay")
                const classifypartitionsExtractionMethodResult = await vuecomp.$apogeeActions.apiManager.updateDocumentClassification({
                  document_id: getDoc[0].uploadId,
                  document_class:  data.value, //getDoc[0].data.document_type
                })
               // console.log("ClassifyDocument Ended")

                if(classifyResult){
                    console.log(classifyResult)
                  await this.$store.dispatch('updateDocClassification',{id: getDoc[0].id , document_type: classifyResult.document_type});
                  console.log("ClassifyDocument Ended")
                  const getDocClassify = vuecomp.$store.state.docs.filter(function(el, index){
                                    return el.uploadId ==   data.elementId;
                                  });
                  console.log(getDocClassify[0])


                }
                //console.log(classifyResult)


              }
              vuecomp.viewLoaderIndicator = false;
            }else{
              vuecomp.viewLoaderIndicator = false;
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
          async formatPartion(partition){
            const vuecomp = this;
           //vuecomp.partitionListRow = [];
            const getFormat = [];
            var counter =(vuecomp.$store.state.partitions.length -1) > 0 ?
                        (vuecomp.$store.state.partitions.length -1): 0;

            partition.partition.articles.forEach(function(el, index){
              //vuecomp.partitionListRow.push(el)
              el.id = counter;
              el.uploadId = partition.uploadId; /*typeof vuecomp.$store.state.partitions[counter] != "undefined" ?
                        vuecomp.$store.state.partitions[counter]: undefined;*/
              el.pageNumber = el.bboxes[0].page;
              el.myStyle = {
                        titleSection: { backgroundColor: ['blue', 'orange','green','purple','violet','pink','brown'][Math.floor(Math.random() * ['blue', 'orange','green','purple','violet','pink','brown'].length)], color: 'white'},
                      };
              el.removeBtnClickFunc = vuecomp.partitionSubmited;
              el.extractBtnClickFunc =  vuecomp.partitionSubmited;
              el.gotoPage = vuecomp.partitionGotoPage;

              el.text = "";
              el.sections.forEach(function(sec, index){
                  if(sec){
                    el.text += sec.text+"\r\n";
                  }
              });
              getFormat.push(el)
              counter++;
            })

            return  getFormat;
          },
          async partitionSubmited(data){
                //alert(data)
                  console.log(data);
                  const vuecomp = this;

                    //data.id = data.itemId;
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
                     // alert("okay")
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
                            //console.log(getSecEl)
                            /*delete secEl["x0"];
                            delete secEl["y0"];
                            delete secEl["x1"];
                            delete secEl["y1"];
                            delete secEl["width"];
                            delete secEl["height"];
                            delete secEl["page_width"];
                            delete secEl["page_height"];
                            delete secEl["section_ref_id"];*/
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
          async annotationSubmited(data){
              const vuecomp = this;
              //alert(data.value)
              data.id = data.itemId;

              if(data.actionName == "edit"){
                  await vuecomp.$store.dispatch('editAnnotations', data);
              }else if(data.actionName == "remove"){

                await vuecomp.$store.dispatch('removeAnnotation', data);

              }
          },
          async partitionGotoPage(data){

            const vuecomp = this;
              //alert("okay")
            vuecomp.$store.state.partitions.forEach(await async function(el, index){

              if(el.id == data.itemId){
              // alert("yes")
                if(vuecomp.getDocumentIdFromUrl() == data.uploadId){
                  //alert("yes")
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
          async onClauseTableFieldChange(data){
            console.log(data)

              const vuecomp = this;

            if(data.column == "text"){

                await vuecomp.$store.dispatch('changePartitionSectionText', data);
                await vuecomp.$store.dispatch('setPartitionText', data.bbox);

            }
          },
          async clauseTableHeaderBtnClick(){
              const vuecomp = this;
              vuecomp.viewClausesTable = true;
              vuecomp.viewClausesTable = false;
          },
          async extractedTableHeaderBtnClick(){
               const vuecomp = this;
              vuecomp.viewExtractedTableData = true;
              vuecomp.viewExtractedTableData = false;
          },
          async documentCardListHeaderBtnCLick(){
            const vuecomp = this;
            vuecomp.viewDocumenCardtList = true;
            vuecomp.viewDocumenCardtList = false;
          },
          async metadataHeaderBtnClick(){
              const vuecomp = this;
              vuecomp.viewMetadata = true;
              vuecomp.viewMetadata = false;
          },
          async partitionsExtractionMethod(data){
            const vuecomp = this;
            var blob;
            var getSection = [];
            var getCvsSTring = "";

           // alert(data.docId)
            if(data.docId == "All"){
              var getMergedSections = "";
                  vuecomp.$store.state.partitions.forEach(function(el, index){
                       /*   getMergedSections += el.title+"\r\n";
                          el.sections.forEach(function(secEl, secIndex){
                              getMergedSections += secEl.text+"\r\n";
                          })*/

                          el.sections.forEach(function(secEl, secIndex){
                            var getSecEl = {};
                            getSecEl.page = secEl.page;
                            getSecEl.title = el.title;

                            getSecEl.text = secEl.text;

                            getSection.push({...getSecEl});
                          })

                        console.log(el.text)

                      //getMergedSections += "\r\n";
                  });
              /*
              const blob = new Blob([getMergedSections], {
                      type: "octet-stream",
                    });*/

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


            }else{
                var getMergedSections = "";
                  const getDoc = vuecomp.$store.state.docs.filter(function(el, index){
                                    return el.uploadId == data.docId;
                                  });
                                  alert("say h")
                                  console.log(getDoc)
                  if(getDoc[0]){

                    vuecomp.$store.state.partitions.forEach(function(el, index){

                        if(el.uploadId == data.docId){

                              /*
                          el.sections.forEach(function(secEl, secIndex){
                              getMergedSections += secEl.text+"\r\n";
                          })*/

                          el.sections.forEach(function(secEl, secIndex){
                            var getSecEl = {};
                            getSecEl.page = secEl.page;
                            getSecEl.title = el.title;

                            getSecEl.text = secEl.text;
                            getSection.push({...getSecEl});
                          })

                           // getMergedSections += secEl.text+"\r\n";
                          //const blob = el.text;

                       // return;
                      }
                    });



                    if(data.fileExt == "csv"){

                      getCvsSTring = await vuecomp.$apogeeActions.actionsHelper.actionCreateCvsFromJSon(getSection);
                      blob = new Blob([getCvsSTring], { type: "text/plain" });

                    }else if(data.fileExt == "json"){

                        const data = JSON.stringify(getSection, null, "\t");
                        blob = new Blob([data], { type: "text/plain" });
                    }
                     console.log(el.text)
                        vuecomp.downloadDocument(
                          data.fileName,
                          data.fileExt,
                          blob
                        )
                  }
            }


          },
          async extractedTableDownloadMethod(data){
                 const vuecomp = this;
            var blob;
            var getSection = [];
            var getCvsSTring = "";

            //alert(data.docId)
            //return;
            if(data.docId != vuecomp.getDocumentIdFromUrl){
              var getMergedSections = "";

                vuecomp.$store.state.extractTableData.table_objects[0]?.table_contents?.forEach(function(secEl, secIndex){
                  getSection.push(secEl);
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
          },
          async metadataExtractionSubmit(data){
             var getMergedMeta = [];
             const vuecomp = this;
              var blob;
              var getSection = [];
              var getCvsSTring = "";

                  vuecomp.$store.state.docs.forEach(function(el, index){
                      //    getMergedSections += el.title+"\r\n";
                        if(el.data){
                          if(data.fileExt == "json"){
                              getMergedMeta.push({
                              id: el.uploadId,
                              fileName: el.title,
                              ...el.data,
                              ...el.metadata,
                            })
                          }else if(data.fileExt == "csv"){
                            var getMeta = el.metadata;
                            console.log(getMeta)

                              delete getMeta['doc_id']
                              /*
                              getMeta.exceptions.forEach(function(excEl, excIndex){
                                delete excEl['exc_position'];
                              });*/


                           console.log(getMeta)
                           getMergedMeta.push({
                             ...getMeta,
                            })

                          }
                        }
                         /* el.sections.forEach(function(secEl, secIndex){
                              getMergedMeta.push({

                              })
                          })
                        */
                        console.log(el.text)

                    //  getMergedSections += "\r\n";
                  });

                  //"octet-stream"
            //alert(data.fileExt)

                  const blobType =  data.fileExt == 'csv' ?  'text/csv, charset=UTF-8' : data.fileExt == 'json' ? "text/plain, charset=UTF-8" : "text/xml, charset=UTF-8";

            //alert(blobType)

                if(data.fileExt == "csv"){
                  //delete getMergedMeta.id;
                  //delete getMergedMeta.fileName;

                  getCvsSTring = await vuecomp.$apogeeActions.actionsHelper.actionCreateCvsFromJSon(getMergedMeta);
                  blob = new Blob([getCvsSTring], { type: "text/plain" });

                }else if(data.fileExt == "json"){

                    const data = JSON.stringify(getMergedMeta, null, "\t");
                    blob = new Blob([data], { type: "text/plain" });
                }
                /*
              const blob = new Blob([getMergedMeta], {
                      type: blobType,
                    });
                    */
                    if(data.fileExt == "json"){
                        vuecomp.$apogeeActions.pdfManager.downloadJson({content: getMergedMeta, filename: data.filename })
                    }else{
                      vuecomp.downloadDocument(
                          data.filename,
                          data.fileExt,
                          blob
                        )
                    }
          },
          textEditModalSaveBtnFunc(data){
           const vuecomp = this;
           //alert(data.value)
            //return;
            if(data){
              var getDataArray = data.elementId.split("_");
              var section_ref_id = (getDataArray.indexOf("Prop")+1); //getDataArray[(getDataArray.indexOf("Prop")+1)];
              var getProp = "";
              getDataArray.forEach(function(el, index){
                  if(index >= section_ref_id ){
                    if(index < (getDataArray.length-1) ){
                      getProp+= el+"_";
                    }else if(index == (getDataArray.length-1) ){
                      getProp+= el;
                    }

                  }

              })
              //alert("passs zero "+data.elementId+' '+getProp)
              if(getProp != "text")
                return

              //alert("passs one")
              if(typeof vuecomp.$store.state.partitions[getDataArray[1]] == "undefined")
                return

               //alert("passs one3")
              if(typeof vuecomp.$store.state.partitions[getDataArray[1]].sections[getDataArray[3]] == "undefined")
                return

              // alert("passs one2")
              if(typeof vuecomp.$store.state.partitions[getDataArray[1]].sections[getDataArray[3]][getProp] == "undefined")
                return

               //  alert("passs one4")
               //alert(getDataArray[3])
               var getSectionIndex = getDataArray[3]-1;
               alert(getSectionIndex+" "+getDataArray[1]);
               vuecomp.$store.dispatch("changePartitionSectionText",
                {
                  partition: getDataArray[1],
                  section: getSectionIndex,
                  prop: getProp,
                  value: data.value
                });
              //vuecomp.$store.state.partitions[getDataArray[1]].sections[getDataArray[3]][getProp] = data.value;
             // alert(vuecomp.$store.state.partitions[getDataArray[1]].sections[getDataArray[3]][getProp])
              console.log( vuecomp.$store.state.partitions[getDataArray[1]].sections[getDataArray[3]-1])
              console.log( vuecomp.$store.state.partitions[getDataArray[1]].sections[getDataArray[3]][getProp])
              /*
              vuecomp.partitionListRow[getDataArray[1]].sections[getDataArray[3]][getProp] = data.value;
              console.log(vuecomp.partitionListRow[getDataArray[1]].sections[getDataArray[3]])
              console.log(vuecomp.partitionListRow[getDataArray[1]].sections[getDataArray[3]][getProp])
              */

            }
          },
          updateNavRowPerPage(data){

            const vuecomp = this;
            var getMergedSections = [];
            //alert("in it "+data)

            //   return;

              vuecomp.$store.state.partitions.forEach(function(el, index){

                  el.sections.forEach(function(secEl, secIndex){
                    delete secEl["x0"];
                    delete secEl["y0"];
                    delete secEl["x1"];
                    delete secEl["y1"];
                    delete secEl["width"];
                    delete secEl["height"];
                    delete secEl["page_width"];
                    delete secEl["page_height"];
                    getMergedSections.push(secEl);
                  })
                  console.log(el.text)
              });

            //console.log(getMergedSections)
            if(data == "all"){
              vuecomp.navigationTabularData =  vuecomp.$apogeeActions.navigationTabular.BuildTableNavigation(getMergedSections, "", (getMergedSections.length-1),{th: {}, tr:{},td:{}} , 2, "navTable", ["Page","Title","Text"])

            }else{
              //alert("hello")
              vuecomp.navigationTabularData =  vuecomp.$apogeeActions.navigationTabular.BuildTableNavigation(getMergedSections, "", data,{th: {}, tr:{},td:{}} , 2, "navTable", ["Page","Title","Text"])
            }
          },
          extractedTableDataNavRowPerPage(data){

            const vuecomp = this;
            var getMergedSections = [];
            //alert("in it "+data)

            //   return;
           /*
            vuecomp.$store.state.extractTableData.table_objects[0]?.table_contents?.forEach(function(secEl, secIndex){
              getMergedSections.push(secEl);
            })*/

              vuecomp.$store.state.extractTableData.forEach(function(el, index){
                //alert(el.id+" "+data.id)
                if(el.id == vuecomp.$store.state.currentDocumentTableId){
                  el.table_objects[0]?.table_contents?.forEach(function(secEl, secIndex){
                    getMergedSections.push(secEl);
                  })
                }else{
                  el.table_objects[0]?.table_contents?.forEach(function(secEl, secIndex){
                    getMergedSections.push(secEl);
                  })
                }
              })
            //console.log(data)
            //console.log(getMergedSections)
             vuecomp.extractedTableData = null;
            if(data == "all"){
              vuecomp.extractedTableData =  vuecomp.$apogeeActions.navigationTabular.BuildTableNavigation(getMergedSections, "", (getMergedSections.length-1),{th: {}, tr:{},td:{}} , 2, "navTable", [])
              //vuecomp.viewExtractedTableData = true;
            }else{
              //alert(data)
              vuecomp.extractedTableData =  vuecomp.$apogeeActions.navigationTabular.BuildTableNavigation(getMergedSections, "", data,{th: {}, tr:{},td:{}} , 2, "navTable", [])
               //vuecomp.viewExtractedTableData = true;
            }
            console.log(vuecomp.extractedTableData)
          },
          extractedTableDataEditModalSaveBtnFunc(data){
           const vuecomp = this;
            //alert(data.value)
            return;
            if(data){
              var getDataArray = data.elementId.split("_");
              var section_ref_id = (getDataArray.indexOf("Prop")+1); //getDataArray[(getDataArray.indexOf("Prop")+1)];
              var getProp = "";
              getDataArray.forEach(function(el, index){
                  if(index >= section_ref_id ){
                    if(index < (getDataArray.length-1) ){
                      getProp+= el+"_";
                    }else if(index == (getDataArray.length-1) ){
                      getProp+= el;
                    }

                  }

              })

              if(getProp != "text" || getProp != "Text")
                return

            //  if(typeof vuecomp.partitionListRow[getDataArray[1]] == "undefined")
             //   return

             // if(typeof vuecomp.partitionListRow[getDataArray[1]].sections[getDataArray[3]] == "undefined")
               // return

             // if(typeof vuecomp.viewExtractedTableData[getDataArray[1]].sections[getDataArray[3]][getProp] == "undefined")
               // return

               //vuecomp.$store.state.extractTableData.table_objects[0]?.table_contents[0][getProp] = data.value;

             // vuecomp.partitionListRow[getDataArray[1]].sections[getDataArray[3]][getProp] = data.value;

              console.log(vuecomp.partitionListRow[getDataArray[1]].sections[getDataArray[3]])
              console.log(vuecomp.partitionListRow[getDataArray[1]].sections[getDataArray[3]][getProp])

            }
          },
          extractedTableClickFunc(data){
            const vuecomp = this;

            if(typeof data.id != "undefined"){
             // alert(data.id)
              //var getMergedSections = [];

              vuecomp.$store.dispatch("changeCurrentTableDocumentId", data.id)

              //vuecomp.$store.state.currentDocumentTableId


            }
          }
        },
        created(){
        },
        mounted(){
            const vuecomp = this;

          this.$watch('$store.state.partitions', function(val){
            //alert("in moiunted watch")

             var getMergedSections = [];
             //console.log( vuecomp.$store.state.partitions)
             //if(typeof val != "undefined"){
              vuecomp.$store.state.partitions.forEach(function(el, index){

                  el.sections.forEach(function(secEl, secIndex){
                    var getSecEl = {};
                    /*delete secEl["x0"];
                    delete secEl["y0"];
                    delete secEl["x1"];
                    delete secEl["y1"];
                    delete secEl["width"];
                    delete secEl["height"];
                    delete secEl["page_width"];
                    delete secEl["page_height"];
                    delete secEl["section_ref_id"];*/
                    getSecEl.page = secEl.page;
                    getSecEl.title = el.title;
                    getSecEl.text = secEl.text;
                    getSecEl.dataKey = "part_"+index+"_secRef_"+secEl.section_ref_id;
                    //console.log(getSecEl);
                    //secEl.dataKey = "part_"+index+"_secRef_"+secEl.section_ref_id;
                   // getMergedSections.push(getSecEl);
                    getMergedSections.push({...getSecEl});
                  })
                  //console.log(el.text)
                });
                  //console.log(getMergedSections)
                 // alert(getMergedSections.length-1)
                // console.log(vuecomp.$apogeeActions.navigationTabular)
                 vuecomp.navigationTabularData = null;
                vuecomp.navigationTabularData = {};
              vuecomp.navigationTabularData = vuecomp.$apogeeActions.navigationTabular.BuildTableNavigation(
                                              getMergedSections,
                                              "document mania",
                                              (getMergedSections.length-1),
                                              {th: {}, tr:{},td:{}} , 2, "navTable",
                                              ["Page","Title","Text"])

                  //console.log(vuecomp.navigationTabularData)

          },{deep: true, immediate: true})

           this.$watch('$store.state.extractTableData', function(val){
            //alert("okay cool")
             var getMergedSections = [];

                  //console.log(getMergedSections)

                //Object.entries(vuecomp.$store.state.extractTableData).forEach(([key, value]) => {
                   // console.log(`${key} ${value}`); // "a 5", "b 7", "c 9"
                   /*
                   if(typeof vuecomp.$store.state.extractTableData.table_objects != "undefined"){
                     //alert("okay")
                    vuecomp.$store.state.extractTableData?.table_objects[0]?.table_contents?.forEach(function(secEl, secIndex){
                      getMergedSections.push(secEl);
                    })
                   }*/
                //});
              // console.log(vuecomp.$store.state.extractTableData)
               //console.log(getMergedSections)
              vuecomp.$store.state.extractTableData.forEach(function(el, index){
                if(el.id == vuecomp.$store.state.currentDocumentTableId){
                  el.table_objects[0]?.table_contents?.forEach(function(secEl, secIndex){
                    getMergedSections.push(secEl);
                  })
                }else{
                  el.table_objects[0]?.table_contents?.forEach(function(secEl, secIndex){
                    getMergedSections.push(secEl);
                  })
                }
              })

              vuecomp.extractedTableData =  vuecomp.$apogeeActions.navigationTabular.BuildTableNavigation(
                                              getMergedSections,
                                              "document mania",
                                              (getMergedSections.length-1),
                                              {th: {}, tr:{},td:{}} , 2, "navTable",
                                              [])
           },{deep: true, immediate: true})

          //this.$apogeeActions.apiManager.extractBatchMetaData([this.getDocumentIdFromUrl()])
        }
    }
</script>
<style>
</style>
