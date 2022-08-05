<template>
   <uploadingPage
    :loadingDocument="getDocumentCard"
    :documentListRow="getDocumentList"
    :smartQueueTitle="'Smart Queue'"
    :type="'smartQueue'"
    :imgListPlaceHolderImgs="[
        {
          id: 0,
          img: $apogeeMedia.zenith_logo,
          class: 'component-large-size',
          style: 'width: 300px;height:70px'
        },
        {
          id: 1,
          img: $apogeeMedia.apogee_o_transparent,
          class: 'component-large-size',
          style: 'width: 50px;height:50px'
        },
      ]"
   />

</template>
<script>

    export default {
        name: '',
        props:{

        },
        computed: {
            getDocumentCard(){
                return this.$store.state.docs.filter(function(el){
                    return el.uploaded == false;
                });
            },
            getDocumentList(){
                return this.$store.state.docs.filter(function(el){
                    return el.uploaded == true;
                });
            },
        },
        methods: {

        },
        mounted(){

        }
    }
</script>
<style>
</style>
