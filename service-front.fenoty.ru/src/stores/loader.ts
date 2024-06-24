import { defineStore } from "pinia";

export const loaderStore = defineStore("Loader", {
    state: () => ({
        activity: false as boolean,
    }),
    actions: {
        startLoader(){
            this.activity = true
        },
        stopLoader(){
            this.activity = false
        },
    },
});
