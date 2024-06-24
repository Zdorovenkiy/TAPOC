import { defineStore } from "pinia";
import axios from "axios";
import { warningAlert, errorAlert, successAlert } from "@notyf/answers";
import { Thumbs } from "swiper/modules";

export const authStore = defineStore("AuthStore", {
    state: () => ({
        isLoggedIn: false as boolean,
        admin: false as boolean,
        network: true as boolean
    }),
    getters:{
        getAuth(state){
            return state.isLoggedIn
        }
    },
    actions: {
        setNetwork(value: boolean){
            this.network = value
        },
        async checkAuthReturn(tg_id: number) {
            return await axios({
                method: "post",
                url: `${import.meta.env.VITE_API_URL}/checkAuth`,
                params: {
                    id: tg_id,
                },
            })
            .then((response) => {
                return true
            })
            .catch((error) => {
                return error.code
            });

        },
        async checkUserAuth(tg_id: number) {
            return await axios({
                method: "post",
                url: `${import.meta.env.VITE_API_URL}/checkAuth`,
                params: {
                    id: tg_id,
                },
            })
            .then((response) => {
                this.isLoggedIn = true
                
                return true
            })
            .catch((error) => {
                this.isLoggedIn = false

                return false               
            });

        },
    },
});
