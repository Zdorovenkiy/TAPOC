<script lang="ts">
import Logo from "@icons/logo.svg";
import DefaultButton from "@components/buttons/Default.vue";

export default {
    name: "welcome",
    components: {
      DefaultButton,
    },
    data() {
        return {
            Logo: Logo,
        };
    },
};
</script>

<template>
    <div class="welcome">
        <div class="logo">
            <img alt="Logo" :src="Logo" />
        </div>
        <div class="content">
            <h1 class="title">Добро пожаловать!</h1>
            <p>
                Вы готовы погрузиться в увлекательный мир соревнований и
                выигрывать? Выбирайте команду и начните зарабатывать!
            </p>
        </div>
        <DefaultButton link="/select-team" class="start_earn">Начать зарабатывать</DefaultButton>
    </div>
</template>

<style lang="scss" scoped>

.welcome {
    padding: 90px 0 0 0;
    height: 100%;
    display: grid;
    gap: 70px;
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
        gap: 12px;
        text-align: center;
        p {
            color: $white;
            font-family: $font-primary;
            font-size: 16px;
            font-weight: 400;
        }
    }
}
</style>
