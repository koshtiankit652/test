<template>
   <loginPage
    :usernameError="false"
    userameErrorMsg=""
      passwordTitle="Password"
      :passwordError="false"
      passwordErrorMsg=""
    :onSubmit="login"
   />
</template>
<script>
    export default {
        name: '',
        props:{

        },
        methods: {
            async login(e) {
                const vuecomp = this;

                const loginResult = await this.$apogeeActions.apiManager.login(e);
                if(loginResult.access_token !== undefined){
                    vuecomp.$router.push({
                        //path: '/document-source-option'
                        path: '/document-uploads'
                    });
                }
            }
        }
    }
</script>
<style>
</style>
