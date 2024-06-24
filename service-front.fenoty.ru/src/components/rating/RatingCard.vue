<template>
    <div>
        <div v-if="type == 'global'" class="player-card">
            <div class="avatar">
                <img :src="teamImage" :alt="teamName">
            </div>
            <div class="info">
                <div class="info-top">
                    <div class="name">{{truncate(username, 20)}}</div>
                    <div class="level">{{ $t('user.level') }} {{level}}</div>
                </div>
                <div class="info-bottom">
                    <div class="wins">{{wins}}</div>
                    <div class="earned">
                        <span>{{earned}}</span>
                        <TapacCoin/>
                    </div>
                </div>
            </div>
            <div class="placement">{{place}}</div>
        </div>

        <div v-if="type == 'best'" class="player-card">
            <div class="avatar">
                <img :src="teamImage" :alt="teamName">
            </div>
            <div class="info">
                <div class="info-top">
                    <div class="name">{{username}}</div>
                    <div class="level">{{ $t('user.level') }} {{level}}</div>
                </div>
                <div class="info-bottom">
                    <div class="earned">
                        <span>{{earned}}</span>
                        <TapacCoin/>
                    </div>
                </div>
            </div>
            <div class="best-wins">
                <div class="wins">{{wins}}</div>
                <div class="cup"></div>
            </div>
        </div>

    </div>
</template>

<script lang="ts">
import { mapState, mapActions, storeToRefs } from "pinia";
import { telegramUserStore, userStore } from "@stores/user";
import TapacCoin from '@components/icons/iconTapac.vue'

export default {
    name: "RatingCard",
    components: {
        TapacCoin
    },
    props: {
        type: {
            type: String,
            required: true,
        },
        teamName: {
            type: String,
            required: true,
        },
        teamImage: {
            type: String,
            required: true,
        },
        username: {
            type: String,
            required: true,
        },
        level: {
            type: Number,
            required: true,
        },
        wins: {
            type: Number,
            required: true,
        },
        earned: {
            type: Number,
            required: true,
        },
        place: {
            type: Number,
            required: true,
        },
    },
    data() {
        return {
            info: false as boolean,
        }
    },
    methods: {
        ...mapActions(userStore, [
            "truncate"
        ])
    },
    mounted() {

        
    },
};
</script>

<style lang="scss" scoped>
.player-card{
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 8px;

    background: $gray-dark;
    border-radius: 15px;
    padding: 8px;
    .avatar{
        max-width:  42px;
        max-height: 42px;
        min-width:  42px;
        min-height: 42px;
        border-radius: 10px;
        overflow: hidden;
        img{
            max-width:  inherit;
            max-height: inherit;
            min-width:  inherit;
            min-height: inherit;
            object-fit: contain;
        }
    }
    .info{
        flex-grow: 1;
        display: flex;
        flex-direction: column;
        gap: 4px;
        &-top{
            display: flex;
            flex-direction: column;
            gap: 2px;
            font-family: $font-primary;
            .name{
                font-weight: 500;
                font-size: 12px;
                color: $yellow;
            }
            .level{
                font-weight: 400;
                font-size: 8px;
                color: $gray;
            }
        }
        &-bottom{
            font-family: $font-primary;
            font-weight: 400;
            font-size: 10px;

            display: flex;
            flex-direction: row;
            align-items: center;
            gap: 8px;
            .wins{
                display: flex;
                flex-direction: row;
                align-items: center;
                gap: 4px;
                &::before{
                    content: '';
                    display: block;

                    background-image: url('@images/rating/cup.svg');
                    background-position: center;
                    background-repeat: no-repeat;
                    background-size: contain;

                    max-width:  10px;
                    max-height: 10px;
                    min-width:  10px;
                    min-height: 10px;
                }
            }
            .earned{
                display: flex;
                flex-direction: row;
                align-items: center;
                gap: 4px;
                span{
                    display: inherit;
                    flex-direction: inherit;
                    align-items: inherit;
                    gap: inherit;
                    &::before{
                        content: '';
                        display: block;
    
                        background-image: url('@images/rating/cash.svg');
                        background-position: center;
                        background-repeat: no-repeat;
                        background-size: contain;
    
                        max-width:  12px;
                        max-height: 12px;
                        min-width:  12px;
                        min-height: 12px;
                    }
                }
                svg{
                    max-width:  12px;
                    max-height: 12px;
                    min-width:  12px;
                    min-height: 12px;
                }
            }
        }
    }
    .placement{
        font-family: $font-primary;
        font-weight: 600;
        font-size: 18px;
        color: $yellow;
    }
    .best-wins{
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 6px;
        .wins{
            font-family: $font-primary;
            font-weight: 600;
            font-size: 18px;
            color: $yellow
        }
        .cup{
            max-width:  22px;
            max-height: 22px;
            min-width:  22px;
            min-height: 22px;

            background: $yellow;
            border-radius: 5px;
            &::before{
                content: '';
                display: block;
    
                background-image: url('@images/rating/black-cup.svg');
                background-position: center;
                background-repeat: no-repeat;
                background-size: 50%;
    
                max-width:  inherit;
                max-height: inherit;
                min-width:  inherit;
                min-height: inherit;
            }
        }
    }
}
</style>
