<template>

    <documentSrcOptionsPage
        :urlBtnCLick="urlBtnCLickMethod"
        :onMultiFormInputChanged="onMultiFormInputChangedMethod"
        :buttonInputVarient="'cta-button-outlined'"
        appName="zenith"
    />
</template>
<script>
    export default {
        name: '',
        props:{

        },
        methods: {
            urlBtnCLickMethod(){
                this.$router.push({path: "/url-uploads"})
            },
            async onMultiFormInputChangedMethod(files){
                console.log(files)
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
        view(e){
            const vuecomp = this;
            this.$router.push({
                path: "/view-document/"+vuecomp.$store.state.docs[e.currentTarget.getAttribute("data-id")].uploadId
            })

        },
        async filesArrayToDocument(files){

            const arrFormated = [];
            const vuecomp = this;
            for (var i = 0; i < files.length; i++) {
                console.log(files[i]);
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
                        metadata: {},
                        viewMetadata: true,
                        viewMetadataItems: false,
                        onclick: vuecomp.view,
                    }
                )
            }

            return arrFormated;
        },
        },
        created() {
        }
    }
</script>
<style>
</style>
