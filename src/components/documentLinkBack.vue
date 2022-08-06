<template>
    <section class="documentLinkBack" v-show="showme == true">
        <section class="docLinkBackFirstChild">
            <div class="docLinkItem"  v-for="item in backlink" :key="item.id" data-value="item.pageNumb" @click="setCurrentPage(item.pageNumb)" :style="{backgroundColor: (currentPage == item.pageNumb ) ? 'lightblue':'transparent'}">
                <section class="documentLinkBackCardSection">
                    <div>Table "placeholder"</div>
                    <div></div>
                    <div>p.{{ item.pageNumb }} / {{ numbOfPage }}</div>
                </section>
                <section class="documentLinkBackCardSection">
                     <div>Assoc Text: "placeholder"</div>
                      <div></div>
                </section>

            </div>
        </section>
    </section>
</template>

<script>
export default {
  name: 'documentLinkBack',
  props: ['showme',"currentPage","numbOfPage","setCurrentPage"],
  data (){
      return{
          filename: "",
          backlink: [],
      }
  },
  watch:{
    showme(newVal){
        const vuecomp = this;
        if(newVal){
            if(newVal == true){
                vuecomp.backlink = [];
                if(vuecomp.$store.state.docData.source == 0){
                    vuecomp.filename =vuecomp.$store.state.docData.doc.name;
                }else{

                    var getFileNameFromUrl = new URL(vuecomp.$store.state.docData.name);

                    vuecomp.filename = getFileNameFromUrl.pathname.split('/').pop;

                }

                if(vuecomp.numbOfPage){
                    for(var i = 1;i <= vuecomp.numbOfPage;i++){
                        vuecomp.backlink.push({"id": i,"pageNumb": i});
                    }
                }

            }
        }
    },

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    @import '../sass/documentLinkBack.scss';
</style>
