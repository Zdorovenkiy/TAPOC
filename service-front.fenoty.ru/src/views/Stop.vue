<template>
    <section class="stop">
        <span>ТЕСТ ЗАКОНЧЕН, СПАСИБО ЗА ИГРЫ</span>
    </section>
</template>

<script lang="ts">

export default {
    name: "Stop",
    components: {
        
    },
    setup() {},
    data() {
      
    },
    computed: {
        
    },
    methods: {
       
    },
    mounted() {
       
    },
};
</script>

<style lang="scss">
.stop{
    position: absolute;
    top: 0;
    left: 0;
    z-index: 99999;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background: $black;
    span{
        padding: 50px 0;
        text-align: center;
        color: red;
        font-family: $font-primary;
        font-size: 20px;
    }
}
</style>
