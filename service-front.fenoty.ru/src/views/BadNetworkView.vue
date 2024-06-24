<template>
<div>
    <div class="network">
        <div class="logo">
            <img alt="Logo" :src="Logo" />
        </div>
        <div class="content">
            <h1 class="title">{{ $t('network.title') }}</h1>
            <p>
                {{ $t('network.text') }}
            </p>
            <div class="image">
                <img src="@images/icons/bad-network.svg" alt="Bad network">
            </div>
            <div class="image player">
                <img src="@images/bad-network-image.png" alt="Suslik">
            </div>
        </div>

        <DefaultButton link='/' class="default">{{ $t('network.button') }}</DefaultButton>
    </div>
</div>
</template>



<script lang="ts">
import Logo from "@icons/logo.svg";
import DefaultButton from "@components/buttons/Default.vue";
import { authStore } from "@stores/auth";
import { mapState } from "pinia";
import router from "@/router";



export default {
    name: "BadNetwork",
    components: {
        DefaultButton,
    },
    setup(){
       
    },
    data() {
        return {
            Logo: Logo,
        };
    },
    computed:{
        
    },
    methods: {
        
    },
    mounted() {
        
    },
};
</script>



<style lang="scss" scoped>
@mixin animate($animation, $duration, $method, $times) {
    animation: $animation $duration $method $times;
}
@mixin keyframes($name) {
    @keyframes #{$name} {
        @content;
    }
}

main{
    padding-bottom: 0;
}
.network {
    z-index: 99999;
    padding: 30px 0 30px 0;
    height: 100%;
    display: grid;
    gap: 32px;
    align-items: center;
    width: 100%;
    .logo {
        width: 100%;
        max-width: 100%;
        img {
            width: 100%;
            object-fit: contain;
        }
    }
    .content {
        display: flex;
        flex-direction: column;
        gap: 16px;
        text-align: center;
        p {
            text-align: center;
            color: $white;
            font-family: $font-primary;
            font-size: 16px;
            font-weight: 400;
        }
        .player{
            max-width: 189px;
        }
    }
}



</style>
