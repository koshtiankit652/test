
import userObj from "../helpers/user-schema.js"
import { reactive  } from "@vue/reactivity"
const userController = {
    userObj: reactive(Object.create(userObj)),
    actions:{
        parent: Object,
        isLogin: async function(){
            const obj = this.parent;
            if(localStorage.getItem("token")){
                return {
                            status: true,
                            user: obj.userObj
                        };
            }else{
                return {
                        status: false,
                        user: obj.userObj
                    };
            }
        }
    },
    init: function(){
        this.actions.parent = this;
    }
}

export default userController;
