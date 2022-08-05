<template>
    <section id="frontPageComp">
        <section class="hdrFirstChild">
            <section class="frontPageAddDocBtnCont" >
                <div class="frontPageAddDocBtn" v-for="items in addFilesBtn" :key="items.id" :data-key="items.id" @click="openUploadSelect($event)"  @mouseover="frontPageAddDocBtnHover($event)" @mouseleave="frontPageAddDocBtnHover($event)">
                    <span class="frontPageAddDocIcon" v-bind:style="{ backgroundColor: frontPageAddDocBtnHoverColor[items.id] }" >&#43;</span>
                    <div class="frontPageAddDocText" v-bind:style="{ borderColor: frontPageAddDocBtnHoverColor[items.id] }">{{ items.text }}</div>
                </div>
            </section>
        </section>
    </section>
</template>
<script>

export default {
    name: 'frontPageComp',
    props: [],
    components: {
    },
    data() {
        return {
            addFilesBtn:[
                {
                    id:0,
                    text:"Computer",

                },
                {
                id:1,
                text:"Url link",

                }
            ],
            frontPageAddDocBtnHoverColor:[
                "black",
                "black",
            ]
        };
    },
    computed: {
        getfrontPageAddDocBtnHoverColor(){

            return function (id) {
                return this.frontPageAddDocBtnHoverColor[id]; //salut + ' ' + vm.firstName + ' ' + vm.lastName;
            };
        }
    },
    watch: {

    },
    methods: {
        openUploadSelect(e){
            const vuecomp = this;

            if(e.currentTarget){
                if(e.currentTarget.getAttribute("data-key") == 0){
                    vuecomp.$store.commit("setOpenUploadType",(parseInt(e.currentTarget.getAttribute("data-key"))+1));
                }else if(e.currentTarget.getAttribute("data-key") == 1){
                    vuecomp.$store.commit("setOpenUploadType",(parseInt(e.currentTarget.getAttribute("data-key"))+1));
                }
            }
        },
        frontPageAddDocBtnHover(e){
            const vuecomp = this;

            if(e.type == "mouseover"){
                 vuecomp.$set(vuecomp.frontPageAddDocBtnHoverColor, parseInt(e.currentTarget.getAttribute("data-key")), "blue");
            }else if(e.type == "mouseleave"){
                vuecomp.$set(vuecomp.frontPageAddDocBtnHoverColor, parseInt(e.currentTarget.getAttribute("data-key")), "black");
            }
        }
    },
    mounted(){
        let widthVal = document.getElementById('frontPageComp');
        widthVal.style.marginTop =  (document.getElementById('hder').offsetHeight+100)+'px';

        window.addEventListener('resize', function() {

            widthVal.style.marginTop =  (document.getElementById("hder").offsetHeight+100)+"px";

        }, true);

    },

}
</script>
 <style scoped >
    @import '../sass/frontPageComp.scss';
</style>
