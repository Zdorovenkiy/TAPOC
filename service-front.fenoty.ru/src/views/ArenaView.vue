<template>
    
    <section class="arena">

        


        <div class="user">
            
            <RouterLink to="/" class="flag-url">{{ $t('arena.top') }}</RouterLink>

            <div class="user-avatar">
                <img :src="team.imageSmall" :alt="team.name" />
            </div>
            <div class="user-info">
                <div class="user-info-top">
                    <span>{{ $t('user.level') }} {{ user.level_id }}</span>
                </div>
                <ScaleArena :score="user.balance" :level="user.levelLimit" />
            </div>
        </div>

        <div class="buttons">
            <DefaultButton link="/game" class="btn start_game active">{{ $t('arena.buttons.startNewGame') }}</DefaultButton>
        </div>

        <div class="history-top">
            <div class="history-top-title">
                <h1 class="side-title">{{ $t('arena.gameHistory') }}</h1>

                
                <DefaultButton v-if="totalReward > 0" @click="claimReward(lobbyIds)" :score="totalReward" class="btn claim small active">{{ $t('arena.buttons.claimBonus') }}</DefaultButton>
                <DefaultButton v-else-if="totalReward == 0" :score="totalReward" class="btn claim small disabled">{{ $t('arena.buttons.claimBonus') }}</DefaultButton>
                
            </div>
        </div>
        <div class="history">
            
            <div class="history-list">

                <div v-if="totalLobbies == 0" class="no-games">
                    <h5>{{ $t('arena.noGames.title') }}</h5>
                    <p>{{ $t('arena.noGames.text') }}</p>
                    <div class="image">
                        <img src="@images/no-games.png" alt="No games" />
                    </div>
                </div>

                <TransitionGroup name="history">
                    
                    <div v-for="item in history" :key="item.id" class="game">
                        <div class="game-players">

                            <div class="player" :class="item.winner == user.tg_id && 'winner'">
                                <div class="player-avatar">
                                    <img :src="team.imageSmall" :alt="team.name">
                                </div>
                                <div class="player-info">
                                    <div class="name">{{ truncate(user.tg_name, 6) }}</div>
                                    <div class="score"><span>{{item.currentUser.score}}</span><TapacCoin /></div>
                                </div>
                            </div>

                            <div class="versus"><img src="@images/icons/versus.svg" alt="Versus"></div>
                        

                            <div class="player opponent" :class="[item.winner == item.opponentUser.id && 'winner', item.opponentUser.id == null && 'running']">
                                <div class="player-avatar" v-if="item.opponentUser.id == null">
                                    <img src="@images/icons/user-not-found.svg" alt="Not found">
                                </div>
                                <div class="player-avatar" v-else>
                                    <img :src="item.opponentUser.teamImage" :alt="item.opponentUser.teamName">
                                </div>
                                <div class="player-info">
                                    <div class="name">{{ item.opponentUser.name && truncate(item.opponentUser.name,6) }}</div>
                                    <div class="score"><span>{{item.opponentUser.score}}</span><TapacCoin /></div>
                                </div>
                            </div>

                        </div>
                    


                        <!-- Игра еще идет -->
                        <GameButton v-if="item.opponentUser.id == null" type="running"></GameButton>

                        <!-- Награда получена -->
                        <GameButton v-else-if="(item.rewardClaimed && item.winner == user.tg_id) || (item.winner == null && item.firstUser == user.tg_id && item.rewardClaimed) || (item.winner == null && item.secondUser == user.tg_id && item.secondRewardClaimed)" type="claimed"></GameButton>

                        <!-- Получить награду если есть победитель 1 -->
                        <GameButton 
                            v-else-if="(item.winner == user.tg_id && !item.rewardClaimed)" 
                            type="claim" 
                            :score="item.winnerScore" 
                            @click.native="claimReward(item.id)"
                        >
                        </GameButton>

                        <!-- Получить награду, если ничья -->
                        <GameButton 
                            v-else-if="(item.winner == null && item.firstUser == user.tg_id && !item.rewardClaimed) || (item.winner == null && item.secondUser == user.tg_id && !item.secondRewardClaimed)" 
                            type="claim" 
                            :score="item.winnerScore / 2" 
                            @click.native="claimReward(item.id)"
                        >
                        </GameButton>
    
                        <GameButton v-else-if="item.winner != user.tg_id && item.winner != null" type="defeat"></GameButton>

                    </div>

                </TransitionGroup>

            </div>

            <Vueginate
                :total-items="pagination.totalItems"
                :current-page="pagination.currentPage"
                :items-per-page="pagination.itemsPerPage"
                :pages-to-show="pagination.toShow"
                @page-change="paginationHandler"
            />


            
            <Loader type="content" :active="historyLoader"/>
            
        </div>

        

    </section>
</template>

<script lang="ts">
import { mapState, mapActions, storeToRefs } from "pinia";
import ScaleArena from "@components/user/ScaleArena.vue";
import DefaultButton from "@components/buttons/Default.vue";
import GameButton from "@components/buttons/GameButton.vue";
import TapacCoin from '@components/icons/iconTapac.vue'
import Loader from '@components/loader/Loader.vue'

import { Vueginate } from 'vueginate'
import '@assets/styles/_pagination.scss'

import { telegramUserStore, userStore } from "@stores/user";
import { gameStore } from '@stores/game'
// import SocketioService from "@stores/wss";

export default {
    name: "Arena",
    components: {
        ScaleArena,
        DefaultButton,
        GameButton,
        TapacCoin,
        Vueginate,
        Loader,
    
    },
    emits: ['claimReward'],
    setup() {
        const userStorage = userStore();
        const user = userStorage.user;

        // const gameStorage = gameStore();
        // const gamesHistory = gameStorage.gamesHistory(user.tg_id, 0, 6);

        // return {
        //     gamesHistory
        // }
    },

    data() {
        return {
            pagination: {
                totalItems: 0,
                currentPage: 1,
                itemsPerPage: 10,
                toShow: 1,
            },
            history: [] as any,
            totalReward: 0 as number,
            lobbyIds: 0 as number,
            totalLobbies: 0 as number,

            historyLoader: true as boolean,
        };
    },
    watch: {},
    computed: {
        ...mapState(userStore, [
            "user", 
            "team", 
            "week", 
            "stats",
            
        ]),
    },
    methods: {
        ...mapActions(gameStore, [
            'toggleGame',
            'gamesHistory',
            'getLobbyStat',
            'getWinnersReward', 
        ]),
        ...mapActions(userStore, [
            'getUserData',
            'getLevelLimit',
            'truncate',
        ]),
        async paginationHandler(page: number){
            console.log(page);
            
            this.pagination.currentPage = page
            this.history = []
            let response = await this.gamesHistory(this.user.tg_id, page - 1, this.pagination.itemsPerPage) as any
            this.history = response

            
        },
        async setGameHistory(){
            this.history = []
            let response = await this.gamesHistory(this.user.tg_id, this.pagination.currentPage - 1, this.pagination.itemsPerPage) as any
            this.history = response
        },
        async getHistoryStat(){
            console.log(this.user);

            let stat = await this.getLobbyStat(this.user.tg_id)

            
            console.log(stat);
            this.lobbyIds = stat.lobbyList
            this.pagination.totalItems = stat.totalLobbies > 100 ? 100 : stat.totalLobbies
            this.totalLobbies = stat.totalLobbies
            this.totalReward = stat.totalScore

        },
        async claimReward(lobbies: any){
            let arr = []
            if (typeof lobbies == 'number') {
                arr.push(lobbies)
            }
            else{
                arr = lobbies
            }
            console.log(arr);
            
            
            await this.getWinnersReward(this.user.tg_id, arr)
            await this.getUserData(this.user.tg_id)
            await this.getLevelLimit(this.user.tg_id)
            await this.getHistoryStat()
            await this.setGameHistory()
            // await this.reloadHistory(this.user.tg_id)
        },
    },
    async mounted() {
        await this.$nextTick(function () {
            setTimeout(async (event) => {
                await this.getHistoryStat()
                await this.setGameHistory()

                this.historyLoader = false
            }, 500)
        })  
    },
};
</script>

<style lang="scss" scoped>


.arena {
    .user {
        width: 100%;
        display: flex;
        flex-direction: row;
        gap: 16px;
        margin-bottom: 24px;
        position: relative;
        .flag-url{
            position: absolute;
            right: 0;
            top: -26px;

            display: flex;
            justify-content: center;
            align-items: center;

            color: $yellow;
            font-family: $font-primary;
            font-weight: 400;
            z-index: 2;

            height: 56px;
            width: 49px;

            background-image: url('@images/icons/flag.svg');
            background-repeat: no-repeat;
            background-size: contain;
            background-position: center;
        }

        &-avatar {
            max-width: 78px;
            max-height: 78px;
            border-radius: 10px;
            overflow: hidden;
            img {
                max-width: inherit;
                max-height: inherit;
            }
        }
        &-info {
            flex-grow: 1;
            display: flex;
            flex-direction: column;
            gap: 10px;
            margin-top: 8px;
            &-top {
                display: flex;
                flex-direction: row;
                justify-content: space-between;
                align-items: flex-end;
                gap: 10px;
                span {
                    color: $yellow;
                    font-family: $font-primary;
                    font-size: 18px;
                    font-weight: 400;
                }
                a {
                    display: block;

                    background-image: url("@images/icons/settings.svg");
                    background-position: center;
                    background-repeat: no-repeat;
                    background-size: contain;

                    max-width: 22px;
                    max-height: 22px;
                    min-width: 22px;
                    min-height: 22px;

                    margin-bottom: 8px;
                }
            }
        }
    }
    .buttons {
        display: grid;
        grid-template-columns: 1fr;
        gap: 7px;

        margin-top: 16px;
    }
    .history-top{
        position: relative;
        margin-top: 32px;
        display: flex;
        flex-direction: column;
        gap: 16px;
        &-title{
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
            gap: 15px;
        }
    }
    .history {
        position: relative;
        margin-top: 16px;
        display: flex;
        flex-direction: column;
        gap: 16px;
        &-title{
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
            gap: 15px;
        }
        &-list{
           
            display: flex;
            flex-direction: column;
            gap: 8px;
            .game{
                width: 100%;
                background: $gray-dark;
                border-radius: 15px;
                padding: 6px;

                display: flex;
                flex-direction: column;
                gap: 16px;
                &-players{
                    display: grid;
                    grid-template-columns: 1fr 47px 1fr;
                    gap: 10px;
                    .player{
                        display: flex;
                        flex-direction: row;
                        gap: 8px;
                        &-avatar{
                            max-width: 55px;
                            max-height: 55px;
                            overflow: hidden;
                            border-radius: 10px;
                            img{
                                max-width: inherit;
                                max-height: inherit;

                            }
                        }
                        &-info{
                            display: flex;
                            flex-direction: column;
                            gap: 4px;
                            .name{
                                color: $white;
                                font-weight: 600;
                                font-family: $font-primary;
                                font-size: 14px;
                            }
                            .score{
                                display: flex;
                                flex-direction: row;
                                align-items: center;
                                gap: 2px;
                                span{
                                    color: $gray;
                                    font-weight: 400;
                                    font-family: $font-primary;
                                    font-size: 12px;
                                }
                                svg{
                                    width: 12px;
                                    height: 12px;
                                }
                            }
                        }

                        &.opponent{
                            flex-direction: row-reverse;
                            .player-info{
                                flex-direction: column-reverse;
                                .name{
                                    text-align: right;
                                }
                                .score{
                                    justify-content: flex-end;
                                }
                            }
                        }

                        &.winner{
                            .player-info{
                                .name{
                                    color: $yellow;
                                }
                                .score{
                                    span{
                                        color: $yellow;
                                    }
                                }
                            }
                        }
                        &.running{
                            .player-info{
                                display: none;
                            }
                        }

                    }
                    .versus{
                        display: flex;
                        justify-content: center;
                        align-items: center;

                    }
                }
            }
        }

        .no-games {
            background: $gray-dark;
            border-radius: 10px;
            padding: 24px 32px;
            display: flex;
            flex-direction: column;
            gap: 8px;
            font-family: $font-primary;
            h5 {
                text-align: center;
                font-size: 16px;
                font-weight: 500;
                color: $yellow;
            }
            p {
                text-align: center;
                font-size: 12px;
                font-weight: 400;
                color: $white;

                margin-bottom: 16px;
            }
            .image {
                width: 100%;
                max-width: 185px;
                min-width: 185px;

                margin: 0 auto;
                img {
                    max-width: inherit;
                    min-width: inherit;
                    object-fit: contain;
                }
            }
        }
    }
}


.history-move,
.history-enter-active,
.history-leave-active {
  transition: all 0.5s cubic-bezier(0.55, 0, 0.1, 1);
}

/* 2. declare enter from and leave to state */
.history-enter-from,
.history-leave-to {
  opacity: 0;
  transform: translate(0, 10px);
}

/* 3. ensure leaving items are taken out of layout flow so that moving
      animations can be calculated correctly. */
.history-leave-active {
  position: absolute;
}

</style>
