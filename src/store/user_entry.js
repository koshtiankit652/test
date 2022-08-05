

import axios from "axios";

export const userEntry = {
    state: {
        user: false,
        token: localStorage.getItem("token") || "",
    },
    mutations:{
        AUTH_SUCCESS(state, token) {
            state.token = token;
            state.user = true;
        },
        LOGOUT(state) {
            state.token = "";
            state.user = false;
        },
    },
    actions: {
        login({ commit }, user) {
            return new Promise((resolve, reject) => {
                axios({ url: `${process.env.VUE_APP_API_BASE_URL}/login`, data: user, method: "POST" })
                    .then((resp) => {
                        const tokenType = resp.data.token_type[0].toUpperCase() + resp.data.token_type.slice(1);
                        const token = `${tokenType} ${resp.data.access_token}`;
                        localStorage.setItem("token", token);
                        axios.defaults.headers.common["Authorization"] = token;
                        commit("AUTH_SUCCESS", token);
                        resolve(resp);
                    })
                    .catch((err) => {
                        commit("LOGOUT");
                        localStorage.removeItem("token");
                        reject(err);
                    });
            });
        },
        logout({ commit }) {
            return new Promise((resolve) => {
                commit("LOGOUT");
                localStorage.removeItem("token");
                delete axios.defaults.headers.common["Authorization"];
                resolve();
            });
        },
    }
}
