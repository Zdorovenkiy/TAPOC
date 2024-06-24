<template>
    <div class="week-container">
        <h6 class="section-title">{{ $t('week.title') }}</h6>
        <div class="week">
            <div class="week-item">
                <span>{{ $t('week.totalGames') }}</span>
                <p ref="gamesIncrement">{{rating.games}}</p>
            </div>
            <div class="week-item">
                <span>{{ $t('week.totalWins') }}</span>
                <p ref="winsIncrement">{{rating.wins}}</p>
            </div>
            <div class="week-item">
                <span>{{ $t('week.totalDefeat') }}</span>
                <p ref="defeatIncrement">{{rating.defeat}}</p>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import {incrementAnimation} from '@gsap/animation'

import { userStore } from "@stores/user";
import { mapActions, mapState } from "pinia";
import { socket } from "@stores/wss"

export default {
    name: "UserWeek",
    async created(){
        const userStorage = userStore();
        await window.console.log('userWeekUser: ', userStorage.user);
        


        
        // await socket.emit('rating', 
        //     {type: "getUserRating", data: {id: userStorage.user.tg_id, teamId: userStorage.user.team_id}}, 
        //     (response: any) => {
        //         // console.log(response);
                
        //         this.setUserRating(response.data.rating.total, response.data.rating.victories, response.data.rating.loses, response.data.place, response.data.rating.scores)
        //     }
        // );

        // await console.log('getUserRating: ', userStorage.rating);

    },
    setup() {

    },
    data() {
        return {
            prevGames: 0,
            prevWins: 0,
            prevDefeat: 0,

            games: 0 as number,
            wins: 0 as number,
            defeat: 0 as number,
        }
    },
    computed: {
        ...mapState(userStore, [
            "user",
            "rating"
        ])
    },
    watch: {
        games(currNumber){
            this.prevGames = incrementAnimation(this.$refs.gamesIncrement, currNumber, this.prevGames, 1)
        },
        wins(currNumber){
            this.prevWins = incrementAnimation(this.$refs.winsIncrement, currNumber, this.prevWins, 1)
        },
        defeat(currNumber){
            this.prevDefeat = incrementAnimation(this.$refs.defeatIncrement, currNumber, this.prevDefeat, 1)
        },
    },
    methods: {
        ...mapActions(userStore, [
            'setUserRating',
        ]),
    },
    updated() {
        this.$nextTick(function () {
            setTimeout(() => {
                socket.emit('rating', 
                    {type: "getUserRating", data: {id: this.user.tg_id, teamId: this.user.team_id}}, 
                    (response: any) => {
                        // console.log(response);
                        
                        this.setUserRating(response.data.rating.total, response.data.rating.victories, response.data.rating.loses, response.data.place, response.data.rating.scores)
                    }
                );
            }, 500);
        })
    },
    async mounted() {



        this.$nextTick(function () {
            
            setTimeout(() => {
                socket.emit('rating', 
                    {type: "getUserRating", data: {id: this.user.tg_id, teamId: this.user.team_id}}, 
                    (response: any) => {
                        // console.log(response);
                        
                        this.setUserRating(response.data.rating.total, response.data.rating.victories, response.data.rating.loses, response.data.place, response.data.rating.scores)
                    }
                );
            }, 500);
        })
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
