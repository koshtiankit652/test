<template>
   <profilePage
      :userProfileTabInfo="{
        name: 'John Does',
        organisationName: '1000ml',
        jobTitle:'Data visualizer',
        department: 'Development',
        email: '1000ml@google.com',
        phone: '64722933503',
        location: 'Toronto Ontario Downtown',
      }"


    >

         <router-view
            :title="'DOMAINS'"
            :subTitle="'Domain Whitelist'"
           :documentListRow="[
                {
                    id: 0,
                    text: 'www.mlBingo-io-milton.com',
                    fileExt: 'pdf',
                    onclick: documentCardClick,
                }
            ]"
         >
         </router-view>

    </profilePage>
</template>
<script>
    export default {
        name: 'document-card',
        props:{

        }
    }
</script>
<style>
</style>
