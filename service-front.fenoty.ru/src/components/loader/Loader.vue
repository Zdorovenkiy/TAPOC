<template>
    <transition name="fade" >
        <div class="loader full" v-if="type == 'full' && active">
            <span class="loader"></span>
        </div>
    </transition>

    <transition name="fade-content" >
        <div class="loader content" v-if="type == 'content' && active">
            <div class="loader-sticky">
                <span class="loader"></span>
            </div>
        </div>
    </transition>
</template>


<script lang="ts">
import { mapState } from "pinia";
import { teamsStore } from "@stores/teams";


export default {
    name: "Loader",
    props: {
        active: {
            type: Boolean,
            required: true,
        },
        type: {
            type: String,
            required: true,
        }
    },
    components: {

    },
    data() {
        return {};
    },
    setup() {    
      
    },
    computed: {
       
    },
    methods: {

    },
    mounted() {

    },
};
</script>



<style lang="scss" scoped>
.loader{
    background: $black;
    
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 9999;

    
    &.full{
        position: fixed;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    &.content{
        z-index: 99;
        position: absolute;
        min-height: 300px;
        height: 100%;
        .loader-sticky{
            position: sticky;
            top: 30vh;
            left: 0;

            margin-top: 24px;

            display: flex;
            justify-content: center;
        }
    }
    .loader {
        
        width: 48px;
        height: 48px;
        border: 5px solid $yellow;
        border-bottom-color: transparent;
        border-radius: 50%;
        display: inline-block;
        box-sizing: border-box;
        animation: rotation 1s linear infinite;
    }
}


@keyframes rotation {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
} 


.fade-enter-from,
.fade-leave-to{
    opacity: 0;
}
.fade-enter-to,
.fade-leave-from{
    opacity: 1;
}
.fade-enter-active,
.fade-leave-active{
    transition: all 0.3s ease;
}

.fade-content-enter-from,
.fade-content-leave-to{
    opacity: 0;
}
.fade-content-enter-to,
.fade-content-leave-from{
    opacity: 1;
}
.fade-content-enter-active{
    transition: all 0.3s ease;
}
.fade-content-leave-active{
    transition: all 0s ease;
}



</style>
