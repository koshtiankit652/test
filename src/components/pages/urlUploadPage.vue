<template>
    <urlUploadPage

        :urlInput="computedUrlInput"
        :addUrlInputFunc="addUrlInput"
        :onFormSubmit="uploadUrlInputs"

    />
</template>
<script>
    export default {
        name: 'document-card',
        props:{

        },
        data() {
            return{
                docs: [],
            }
        },
        computed: {
            computedUrlInput(){
                return this.docs;//this.$apogeeActions.apiManager.docs;
            },
            getDocumentCard: function(){
                return this.$store.state.docs;
            }
        },
        watch: {
            '$store.state.docs': function(va){
            },
        },
        methods: {
            view(e){
                const vuecomp = this;
                this.$router.push({
                    path: "/view-document/"+vuecomp.$store.state.docs[e.currentTarget.getAttribute("data-id")].uploadId
                })

            },
            urlArrayToDocument(arr){
                const arrFormated = [];
                const vuecomp = this;

                arr.forEach(function(el, index){
                    arrFormated.push(
                        {
                            id: index,
                            uploadId: null,
                            title: arr[index],
                            text: arr[index],
                            file: arr[index],
                            uploaded: false,
                            objType: 'string',
                            onclick: vuecomp.view,
                        }
                    )
                });
                return arrFormated;
            },
            addUrlInput(){
                this.docs.push(this.$apogeeActions.apiManager.newUrlInput(this.docs));
                console.log(this.docs)
            },
            uploadUrlInputs: async function(e){

                const vuecomp = this;

                if(!e)
                return


                await this.$store.dispatch('addDocs', this.urlArrayToDocument(e));
                this.$router.push({path: "/document-uploads"});

                vuecomp.$apogeeActions.apiManager.uploadDocument(e,"url")
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
            sleep(ms) {
                return new Promise((resolve) => {
                    setTimeout(resolve, ms);
                });
            }
        },
        mounted(){
        }

    }
</script>
<style>
</style>
