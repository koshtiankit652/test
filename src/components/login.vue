<template>
    <section id="login" ref="login">
        <section>
            <section>
                <h1 style="margin-bottom:0px;margin-top:0px;margin-left:auto;margin-right;auto;font-family: Nunito,sans-serif!important;font-size: 3.75rem!important;font-weight:normal;letter-spacing: 1rem!important;text-align:center"> ZENITH </h1>
            </section>
             <section>
            <img
                src="@/assets/apogee-text-logo.svg"
                width="110"
                height="30"
                style="filter:  brightness(0) invert(1);-webkit-filter: brightness(0) invert(1);"
            />

            </section>
             <section style="display:flex;flex-direction:column;font-family: Nunito,sans-serif!important;text-align: center!important;color: #fff!important;font-size: 16px">
             <span>Data extraction<br> </span>
                 <span>& </span>
                 <span>Smart annotation </span>
            </section>
        </section>
        <section>
            <form ref="loginForm">
                <section style="/*border: 1px solid;*/margin-right:auto;text-align:left;color: #4492fd !important;font-size: 2.125rem!important;line-height: 2.5rem;letter-spacing: .0073529412em!important;font-weight: 500!important;">
                    <b>Log In to continue</b>
                </section>
                <section
                style="margin-right:auto;font-size: .875rem!important;font-weight: bold;letter-spacing: .0071428571em!important;font-family: Futura,Helvetica,Arial,sans-serif!important;color: #9e9e9e!important;margin-bottom: 16px;">
                    Don’t have an account ? <router-link :to="{ name: 'register'}" style="font-size: bold;color:black;text-decoration:none;"><span class="routerLinks" >Register</span></router-link>
                </section>

                <section class="loginFormInput">
                    <label >
                        <span>Username or Email</span>
                    <input type="text" name="username" required=true />
                    </label>
                    <label >
                        <span>Password</span>
                        <input type="password" name="password" required=true />
                    </label>
                    <section class="formBottomSubtitle">
                        <b>
                            <label class="formCheckbox">
                            <input aria-checked="false" role="checkbox" type="checkbox" value="Remember me">
                                <span>Remember me ?</span>
                            </label>

                        </b>
                        &nbsp;&nbsp;&nbsp;
                        <b >

                            <router-link :to="{ name: 'resetPassword'}" style="font-size: bold;color:black;text-decoration:none;"><span class="routerLinks" >Forgot your password ?</span></router-link>
                        </b>
                    </section>
                    <section>
                        <input type="button" @click="handleLogin" value="Log In" class="loginFormSubmitBtn" >
                    </section>
                </section>
            </form>
        </section>
    </section>
</template>

<script>

export default {
  name: 'login',
  props: {
    msg: String
  },
  components:{
  },
  data() {
        return {
            valid: false,
            invalidCredentials: false,
            username: "",
            password: "",
            rules: {
                required: (value) => !!value || "Required.",
                counter: (value) => value.length <= 20 || "Max 20 characters",
                email: (value) => {
                    const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                    return pattern.test(value) || "Invalid e-mail.";
                },
            },
            currentBorder: {
                errorColor: "red",
                clicked: "blue",
                normal:  "rgba(0,0,0,.42)",
                username: "rgba(0,0,0,.42)",
                password: "rgba(0,0,0,.42)",
            }
        };
    },
     methods: {
        handleLogin() {
            const vuecomp = this;

            const loginData = new FormData(this.$refs.loginForm);
            vuecomp.$store
                .dispatch("login", loginData)
                .then(() => vuecomp.$router.push("/"))
                .catch((err) => {
                    console.error(err);

            });

        },

    },
    mounted(){


    }
}
</script>
<style scoped >
 @import '../sass/login.scss';
</style>
