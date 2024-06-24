<template>
    
    <div class="rating">
        <div class="rating-top">
            <h4 class="section-title">{{ $t('rating.title') }}</h4>
            <span class="info" @click="info = !info">
                <img src="@images/icons/info.svg" alt="Info">
                <div class="info-modal" :class="info && 'active'">
                    <b>{{ $t('rating.clue.global') }}</b> {{ $t('rating.clue.globalText') }}
                    <br/>
                    <b>{{ $t('rating.clue.best') }}</b> {{ $t('rating.clue.bestText') }}
                </div>
            </span>
        </div>
        <div class="rating-subtitle">{{ $t('rating.yourPlace') }}</div>

        <RatingCard 
            type="global"
            :teamName="team.name"
            :teamImage="team.imageSmall"
            :username="user.tg_name"
            :level="user.level_id"
            :wins="rating.wins || 0"
            :earned="rating.scores"
            :place="rating.place"
        />

    </div>

</template>

<script lang="ts">
import RatingCard from '@components/rating/RatingCard.vue'
import { mapState } from "pinia";
import { userStore } from "@stores/user";
import { socket } from "@stores/wss"


export default {
    name: "Rating",
    components: {
        RatingCard
    },
    data() {
        return {
            info: false as boolean,
        }
    },
    computed: {
        ...mapState(userStore, [
            'user',
            'team',
            'rating'
        ]),
    },
    mounted() {
        // socket.emit('rating', 
        //     {type: "getUserRating", data: {id: this.user.tg_id, teamId: this.user.team_id}}, 
        //     (response: any) => {
        //         this.games = response.data.rating.total
        //         this.wins = response.data.rating.victories
        //         this.defeat = response.data.rating.loses
        //     }
        // );
    },
};
</script>

<style lang="scss" scoped>

.rating{
    margin-top: 24px;
 
    &-top{
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        gap: 10px;

        margin-bottom: 12px;
        .info{
            cursor: pointer;
            max-width:  22px;
            max-height: 22px;
            min-width:  22px;
            min-height: 22px;

            position: relative;
            img{
                max-width:  inherit;
                max-height: inherit;
                min-width:  inherit;
                min-height: inherit;
                object-fit: contain;
            }
            &-modal{
                position: absolute;
                top: -1.25rem;
                right: calc(100% + 12px);
                width: 244px;

                font-family: $font-primary;
                font-weight: 500;
                font-size: 8px;
                color: $black;
                text-align: center;

                background: $white;
                border-radius: 8px;
                padding: 12px;
                visibility: hidden;
                transition: 
                    visibility .3s ease,
                    opacity .3s ease;
                opacity: 0;
                &.active{
                    visibility: visible;
                    opacity: 1;
                }
                b{
                    font-weight: 700;
                }
                &::after{
                    position: absolute;
                    left: calc(100% - 1px);
                    top: 50%;
                    transform: translateY(-50%);

                    content: '';
                    display: block;
                    clip-path: polygon(0 0, 0 100%, 100% 50%);
                    background: $white;
                    
                    min-width: 10px;
                    min-height: 12px;
                    max-width: 10px;
                    max-height: 12px;
                }

            }
        }
    }
    &-subtitle{
        font-family: $font-primary;
        font-weight: 400;
        font-size: 10px;
        color: $gray;

        margin-bottom: 4px;
    }
}

   
</style>
