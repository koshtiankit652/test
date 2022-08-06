<template>
    <section class="docReadyItem">
        <section class="docReadyItemFirstChild"  @click="viewItem()" :style="{backgroundColor: (typeof $store.state.docData.id != 'undefined' && typeof docitem.id != 'undefined') ? ( $store.state.docData.id  == docitem.id ? 'lightblue':'#F5F9FF'):'#F5F9FF'}">
          {{ docitem.filename }}
        </section>
    </section>
</template>

<script>
export default {
  name: 'docreadyitem',
  props: ['idprop','docitem'],
  data() {
    return {

    };
  },
  components: {

  },
  watch: {

  },
  methods: {

    viewItem: function(){
      const vuecomp = this;
      this.$store.dispatch("setDocInViewById",vuecomp.docitem.id).then(function(){
        if(vuecomp.$route.name != "document-view"){
           vuecomp.$router.push("/document-view/"+vuecomp.docitem.id);
        }
      });
    },
  },
  created() {

  },
  mounted() {
  },
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  @import '../sass/docReadyItem.scss';
</style>
