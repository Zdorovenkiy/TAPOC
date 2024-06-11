<template>
    <div class="first-select">
        <h1 class="title">Выберите команду</h1>

        <div class="team">
            <div class="team-image">
                <div class="slider-image">
                    <div class="swiper-button-prev"></div>
                    <swiper
                        class="top-swiper"
                        :modules="modules"
                        :slides-per-view="1"
                        :space-between="8"
                        :navigation="{
                            prevEl: '.swiper-button-prev',
                            nextEl: '.swiper-button-next',
                        }"
                        :pagination="{ type: 'fraction' }"
                        :loop="true"
                        :prevent-interaction-on-transition="true"
                        @swiper="onSwiperMain"
                        @slide-change="onSlideChange"
                        @slide-next-transition-start="onSlideNext"
                        @slide-prev-transition-start="onSlidePrev"
                    >
                        <swiper-slide
                            class="slide"
                            v-for="team in teams"
                            :key="team.id"
                        >
                            <img :src="team.imageBig" :alt="team.name" />
                        </swiper-slide>
                    </swiper>
                    <div class="swiper-button-next"></div>
                </div>

                <div class="slider-thumbs">
                    <swiper
                        class="thumbs-swiper"
                        :space-between="8"
                        :slides-per-view="4"
                        :watch-slides-progress="true"
                        :prevent-clicks="false"
                        :prevent-clicks-propagation="false"
                        :initial-slide="1"
                        :allowTouchMove="false"
                        :noSwiping="true"
                        :loop="true"
                        @swiper="onSwiperThumbs"
                    >
                        <swiper-slide
                            v-for="(team, index) in teams"
                            :key="team.id"
                            @click="onSlideTo(index)"
                        >
                            <img :src="team.imageBig" :alt="team.name" />
                        </swiper-slide>
                    </swiper>
                </div>
            </div>

            <div class="team-name">
                <h2>Ваша команда</h2>

                <swiper
                    class="name-swiper"
                    :space-between="0"
                    :slides-per-view="1"
                    :watch-slides-progress="true"
                    :prevent-clicks="false"
                    :prevent-clicks-propagation="false"
                    :allowTouchMove="false"
                    :noSwiping="true"
                    :loop="true"
                    @swiper="onSwiperName"
                >
                    <swiper-slide
                        class="slide"
                        v-for="team in teams"
                        :key="team.id"
                    >
                        <span>{{ team.name }}</span>
                    </swiper-slide>
                </swiper>
            </div>
        </div>
        
        <DefaultButton @click="setUser(telegramUser, currentTeam.id)" class="btn default">Продолжить</DefaultButton>
    </div>
</template>


<script lang="ts">
import { ref } from "vue";
import axios from "axios";

import { Swiper, SwiperSlide } from "swiper/vue";
import type { Swiper as SwiperClass } from "swiper/types";
import { Navigation, Thumbs, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

import { mapState, mapActions, storeToRefs } from "pinia";
import { teamsStore } from "@stores/teams";
import { userStore, telegramUserStore } from "@stores/user";

import DefaultButton from "@components/buttons/Default.vue";

import type {Teams} from '#types/default'


export default {
    name: "SelectTeam",
    components: {
        Swiper,
        SwiperSlide,
        DefaultButton,
    },
    data() {
        return {
            currentTeam: {} as Teams,
        };
    },
    setup() {    
        const teamStorage = teamsStore();
        teamStorage.fetchTeams();
        const teams = teamStorage.teams;
        const slidesCount = teams.length;

        const swiperMain = ref<SwiperClass>();
        const onSwiperMain = (swiper: SwiperClass) => {
            swiperMain.value = swiper;
        };

        const swiperThumbs = ref<SwiperClass>();
        const onSwiperThumbs = (swiper: SwiperClass) => {
            swiperThumbs.value = swiper;
        };

        const swiperName = ref<SwiperClass>();
        const onSwiperName = (swiper: SwiperClass) => {
            swiperName.value = swiper;
        };

        const onSlideNext = () => {
            swiperThumbs.value?.slideNext();
            swiperName.value?.slideNext();
        };
        const onSlidePrev = () => {
            swiperThumbs.value?.slidePrev();
            swiperName.value?.slidePrev();
        };

        const onSlideTo = (index: number) => {
            if (index + 1 == slidesCount) {
                swiperThumbs.value?.slideToLoop(0);
            } else {
                swiperThumbs.value?.slideToLoop(index + 1);
            }

            swiperName.value?.slideToLoop(index);
            swiperMain.value?.slideToLoop(index);
        };

        return {
            teams,

            modules: [Navigation, Pagination],
            swiperMain,
            onSwiperMain,

            swiperThumbs,
            onSwiperThumbs,

            swiperName,
            onSwiperName,

            onSlideNext,
            onSlidePrev,
            onSlideTo,
        };
    },
    computed: {
        ...mapState(telegramUserStore, [
            'telegramUser',
        ]),  
        
    },
    methods: {
        onSlideChange(swiper: any) {
            this.currentTeam = this.teams[swiper.realIndex];
        },
        ...mapActions(userStore, [
            'setUser',
        ]),
    },
    mounted() {
        // console.log(this.telegramUser);
        // this.setUser(this.telegramUser, this.currentTeam.id)
    },
};
</script>



<style lang="scss">
.first-select {
    margin-top: 20px;
    .title {
        margin-bottom: 16px;
    }
    .team {
        display: flex;
        flex-direction: column;
        gap: 32px;
        margin-bottom: 44px;
        &-image {
            display: inherit;
            flex-direction: inherit;
            justify-content: center;
            align-items: center;
            gap: 12px;
            .slider-image {
                display: flex;
                flex-direction: row;
                justify-content: space-between;
                align-items: center;
                gap: 24px;

                .swiper-button-prev,
                .swiper-button-next {
                    position: relative;
                    inset: 0;
                    width: 32px;
                    height: 32px;
                    background: $yellow;
                    border-radius: 5px;
                    margin: 0;

                    display: flex;
                    justify-content: center;
                    align-items: center;

                    transition: background 0.3s ease;
                    &::after {
                        content: "";
                        display: block;
                        width: 8px;
                        height: 12px;
                        background: $black;
                        clip-path: path(
                            "M0 1.35077V0.126917C0 0.0208385 0.129412 -0.037742 0.216806 0.0271714L7.79325 5.60181C7.85763 5.64897 7.90971 5.70936 7.94554 5.77837C7.98137 5.84737 8 5.92318 8 6C8 6.07682 7.98137 6.15263 7.94554 6.22163C7.90971 6.29064 7.85763 6.35103 7.79325 6.39819L0.216806 11.9728C0.127731 12.0377 0 11.9792 0 11.8731V10.6492C0 10.5716 0.0386548 10.4972 0.10252 10.4497L6.15292 6.00079L0.10252 1.55026C0.0386548 1.50276 0 1.42835 0 1.35077Z"
                        );
                        transition: background 0.3s ease;
                    }
                }
                .swiper-button-disabled {
                    opacity: 1;
                    background: $gray-dark;
                    &::after {
                        background: $gray;
                    }
                }
                .swiper-button-prev {
                    &::after {
                        rotate: 180deg;
                    }
                }
                .swiper-pagination-fraction {
                    z-index: 2;
                    position: absolute;
                    right: 8px;
                    bottom: 8px;
                    background: rgba(39, 39, 39, 0.5);
                    padding: 5px;

                    color: $white;
                    font-family: $font-primary;
                    font-size: 12px;
                    font-weight: 400;

                    max-width: 44px;
                    width: 100%;

                    display: flex;
                    justify-content: center;

                    border-radius: 29px;
                }
                .swiper {
                    max-width: 220px;
                    border-radius: 20px;
                    position: relative;
                    &-slide {
                        border-radius: 20px;
                        overflow: hidden;
                        max-width: inherit;
                        max-height: 220px;
                        img {
                            max-width: inherit;
                            max-height: inherit;
                            width: 100%;
                        }
                    }
                }
            }
            .slider-thumbs {
                .swiper {
                    max-width: 220px;

                    &-slide {
                        cursor: pointer;
                        border-radius: 10px;
                        overflow: hidden;
                        max-height: 49px;
                        max-width: 49px;
                        min-height: 49px;
                        min-width: 49px;
                        img {
                            max-height: inherit;
                            max-width: inherit;
                            min-height: inherit;
                            min-width: inherit;
                        }
                    }
                }
            }
        }
        &-name {
            h2 {
                text-align: center;
                color: $gray;
                font-family: $font-primary;
                font-size: 12px;
                font-weight: 400;

                margin-bottom: 4px;
            }
            .name-swiper {
                .swiper-wrapper {
                    .swiper-slide {
                        span {
                            display: block;
                            color: $yellow;
                            font-family: $font-primary;
                            font-size: 24px;
                            font-weight: 700;

                            width: 100%;
                            text-align: center;
                        }
                    }
                }
            }
        }
    }
}
</style>
