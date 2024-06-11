<template>
    <div class="week-container">
        <h6 class="section-title">Как прошла неделя</h6>
        <div class="week">
            <div class="week-item">
                <span>Всего игр</span>
                <p>{{games}}</p>
            </div>
            <div class="week-item">
                <span>Победы</span>
                <p>{{wins}}</p>
            </div>
            <div class="week-item">
                <span>Поражения</span>
                <p>{{defeat}}</p>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { userStore } from "@stores/user";
import { mapState } from "pinia";

export default {
    name: "UserWeek",
    props: {
        games: {
            type: Number,
            required: true,
        },
        wins: {
            type: Number,
            required: true,
        },
        defeat: {
            type: Number,
            required: true,
        },
    },
};
</script>

<style lang="scss" scoped>
.week-container{
    display: flex;
    flex-direction: column;
    gap: 12px;

    margin-top: 24px;
    .week{
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 8px;

        &-item{
            background: $gray-dark;
            padding: 14px 5px;
            border-radius: 15px;
            font-family: $font-primary;
            font-weight: 500;

            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            gap: 6px;
            span{
                color: $white;
                font-family: inherit;
                font-size: 10px;
                font-weight: inherit;
            }
            p{
                color: $yellow;
                font-family: inherit;
                font-size: 18px;
                font-weight: inherit;
            }

        }
    }
}
</style>
