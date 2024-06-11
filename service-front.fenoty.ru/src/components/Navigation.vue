<script lang="ts">
import NavElem from "@components/NavElem.vue";

export default {
    name: "Navigation",
    components: {
        NavElem,
    },
    data() {
        return {};
    },
};
</script>

<template>
    <div class="container">
        <nav>
            <RouterLink to="/" v-slot="{ route, isActive }">
                <NavElem
                    :text="route.name as string"
                    type="General"
                    :color="isActive ? 'Yellow' : 'Gray'"
                />
            </RouterLink>
            <RouterLink to="/arena" v-slot="{ route, isActive }">
                <NavElem
                    :text="route.name as string"
                    type="Arena"
                    :color="isActive ? 'Yellow' : 'Gray'"
                />
            </RouterLink>
            <RouterLink to="/tasks" v-slot="{ route, isActive }">
                <NavElem
                    :text="route.name as string"
                    type="Tasks"
                    :color="isActive ? 'Yellow' : 'Gray'"
                />
            </RouterLink>
            <RouterLink to="/friends" v-slot="{ route, isActive }">
                <NavElem
                    :text="route.name as string"
                    type="Friends"
                    :color="isActive ? 'Yellow' : 'Gray'"
                />
            </RouterLink>
        </nav>
    </div>
</template>

<style lang="scss" scoped>

nav {
    width: 100%;
    box-sizing: border-box;

    border-radius: 15px;
    box-shadow: inset 0px 1px 2px 0px rgba(255, 255, 255, 0.1);
    background: $gray-dark;

    display: grid;
    grid-template-columns: repeat(4, 1fr);
    align-items: center;

    padding: 8px 20px;
    a {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }
}

</style>
