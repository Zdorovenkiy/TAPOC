<template>
    
    <div class="rating">

        <div class="tab">
            <button :class="tab && 'active'" @click="tab = true">{{ $t('rating.global') }}</button>
            <button :class="!tab && 'active'" @click="tab = false">{{ $t('rating.best') }}</button>
        </div>



        <div v-if="tab" class="rating-global">
            <div class="teams-slider">
                <div class="slide"
                    v-for="(item, index) in teams"
                    :key="item.id"
                    :class="activeTeam == item.id && 'active'"
                    @click="selectTeam(item.id)"
                >
                    {{ item.name }}
                </div>
            </div>
        </div>
        <div v-if="tab" class="rating-global">

            

            <div class="team-rating">
                <TransitionGroup name="rating-fade">
                    <RatingCard 
                        v-for="item in ratingTeam"
                        type="global"
                        :teamName="item.name"
                        :teamImage="item.imageSmall"
                        :username="item.name"
                        :level="item.level_id"
                        :wins="item.wins || 0"
                        :earned="item.score"
                        :place="item.place"
                    />
                </TransitionGroup>
            </div>

            <Vueginate
                :total-items="pagination.totalItems"
                :current-page="pagination.currentPage"
                :items-per-page="pagination.itemsPerPage"
                :pages-to-show="pagination.toShow"
                @page-change="paginationHandler"
            />

            <Loader type="content" :active="globalLoader"/>

        </div>

        <div v-if="!tab" class="rating-best">
            <TransitionGroup name="rating-fade">
                <RatingCard 
                    v-for="item in ratingBest"
                    :key="item.id"
                    type="best"
                    :teamName="item.name"
                    :teamImage="item.imageSmall"
                    :username="item.name"
                    :level="item.level_id"
                    :wins="item.wins || 0"
                    :earned="item.score"
                    :place="item.place"
                />
            </TransitionGroup>
        </div>

        
    </div>

</template>

<script lang="ts">
import { mapState, mapActions, storeToRefs } from "pinia";

import { Vueginate } from 'vueginate'
import '@assets/styles/_pagination.scss'

import { teamsStore } from "@stores/teams";
import { telegramUserStore, userStore } from "@stores/user";
import { loaderStore } from "@stores/loader";
import RatingCard from '@components/rating/RatingCard.vue'
import { socket } from "@stores/wss"


import Loader from '@components/loader/Loader.vue'


export default {
    name: "RatingView",
    components: {
        RatingCard,
        Vueginate,
        Loader,
    },
    setup() {
        const teamStorage = teamsStore();
        teamStorage.teams = [];
        teamStorage.fetchTeams();
        // const teams = teamStorage?.teams;
        
        // return {
        //     teams
        // }
    },
    data() {
        return {
            tab: true as boolean,
            activeTeam: 1 as number,

            pagination: {
                totalItems: 0,
                currentPage: 1,
                itemsPerPage: 10,
                toShow: 1,
            },

            ratingTeam: [] as any,
            ratingBest: [] as any,

            globalLoader: true as boolean,
        };
    },
    watch: {
        async activeTeam(team: number){
            this.globalLoader = true

            this.pagination.currentPage = 1
            console.log(team);
            await this.getTeamRating(this.pagination.itemsPerPage, this.pagination.currentPage - 1, team)

            setTimeout(() => {
                this.globalLoader = false
            }, 300)
        }
    },
    computed: {
        ...mapState(userStore, [
            'user',
            'team',
            'week',
            'stats',
        ]),
        ...mapState(teamsStore, [
            'teams',
        ]),
    },
    methods: {

        async paginationHandler(page: number){
            this.globalLoader = true

            console.log(page);
            this.pagination.currentPage = page
            await this.getTeamRating(this.pagination.itemsPerPage, page - 1, this.activeTeam)

            setTimeout(() => {
                this.globalLoader = false
            }, 300)
        },
        selectTeam(id: number){
            this.activeTeam = id
        },
        async getTeamRating(limit: number, offset: number, team: number){
            this.ratingTeam.length = 0
            socket.emit('rating', 
                {type: "getRatingsByTeam", 
                    data: {
                        id: team, 
                        // teamId: this.activeTeam,
                        limit: limit,
                        offset: offset,
                    }
                }, 
                (response: any) => {
                    console.log("erer",response);
                    
                    
                    var index = this.pagination.itemsPerPage * (this.pagination.currentPage - 1) + 1
                    response.data.forEach((element: any) => {
                        if (index == 1) {
                            this.pagination.totalItems = element.team.totalUser > 100 ? 100 : element.team.totalUser
                        }
                        if (element.rating !== null) {
                            
                            this.ratingTeam.push({
                                name: element.tg_name,
                                wins: element.rating.victories,
                                score: element.rating.scores,
                                place: index,
                                level_id: element.level_id,
                                imageSmall: import.meta.env.VITE_STORAGE_URL + element.team.imageSmall
                            })
                            index++
                        }

                    });

                    

                    // this.setUserRating(response.data.rating.total, response.data.rating.victories, response.data.rating.loses, response.data.place, response.data.rating.scores)
                }
            );
        },
        getBestPlayers(){
            socket.emit('rating', 
                {type: "getRatingFromAllTeams"}, 
                (response: any) => {
                    console.log(response);
                    
                    var index = 0
                    console.log("qweqwe" ,response);
                    
                    response.data.forEach((element: any) => {
                        index++
                        if (!Array.isArray(element)) {  
                            
                            this.ratingBest.push({
                                name: element.user.tg_name,
                                wins: element.victories,
                                score: element.scores,
                                place: index,
                                level_id: element.user.level_id,
                                imageSmall: this.teams[element.user.team_id - 1].imageSmall
                            })

                        }
                    });

                    
                }
            );
        },

        // ...mapActions(userStore, [
        //     'setBalance',
        // ])
    },
    async mounted() {
        await this.$nextTick(async function () {
            this.globalLoader = true

            await this.getTeamRating(this.pagination.itemsPerPage, this.pagination.currentPage - 1, this.activeTeam)
            
            await this.getBestPlayers()

            this.globalLoader = false
        })
        
    },
};
</script>

<style lang="scss" scoped>


.rating{
    margin-top: 24px;
    
    .tab{
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        margin-bottom: 16px;
        button{
            cursor: pointer;
            background: none;
            border: none;
            border-bottom: 1px solid $gray-light;
            padding: 0;
            padding-bottom: 8px;

            color: $gray-light;
            font-family: $font-primary;
            font-size: 12px;
            font-weight: 400;
            text-align: center;
            &.active{
                border-bottom: 1px solid $white;
                color: $white;
            }
        }
    }
    &-global{
        position: relative;
        .teams-slider{
            width: 100%;
            max-width: 100%;
            overflow-x: scroll;

            display: flex;
            flex-direction: row;
            gap: 4px;
            -ms-overflow-style: none;  /* IE и Edge */
            scrollbar-width: none;  /* Firefox */
            &::-webkit-scrollbar {
                display: none;
            }
            .slide{
                max-width: fit-content;
                width: 100%;
                background: $gray-dark;
                border-radius: 15px;
                padding: 8px 16px;

                font-family: $font-primary;
                font-weight: 500;
                font-size: 10px;
                color: $gray;
                text-align: center;
                margin: 2px;
                cursor: pointer;
                &.active{
                    background: $black;
                    outline: 1px solid $yellow;
                    color: $yellow;
                }
            }
        }
        .team-rating{
            position: relative;
           
            margin: 16px 0;
            display: flex;
            flex-direction: column;

            //display: grid;
            //grid-template-rows: repeat(10, 1fr);
            width: 100%;
            height: 100%;
            
            gap: 8px;
            ul{
                position: relative;

                
            }
        }
    }
    &-best{
        display: flex;
        flex-direction: column;
        gap: 8px;
    }
}


.fade-enter-active,
.fade-leave-active {
    transition: all 0.5s ease;
}
.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
.fade-enter-to,
.fade-leave-from {
    opacity: 1;
}



.rating-fade-move,
.rating-fade-enter-active,
.rating-fade-leave-active {
    transition: all 0.3s ease;
}

.rating-fade-enter-from,
.rating-fade-leave-to {
    opacity: 0;
}
.rating-fade-enter-to,
.rating-fade-leave-from {
    opacity: 1;
}


/* 2. declare enter from and leave to state */
//.rating-fade-enter-from,
//.rating-fade-leave-to {
//    opacity: 0;
//}

/* 3. ensure leaving items are taken out of layout flow so that moving
      animations can be calculated correctly. */
.rating-fade-leave-active {
    //position: absolute;
}

</style>
