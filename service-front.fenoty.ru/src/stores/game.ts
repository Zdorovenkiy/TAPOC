import { defineStore } from "pinia";
import axios from "axios";
import {warningAlert, errorAlert, successAlert} from '@notyf/answers'
import i18n from '@/localization'

import { socket } from "@stores/wss"


declare var window: any


export const gameStore = defineStore('GameStore', {
  state: () => ({
    gameActivity: false as boolean,
    gameStatus: 'ready' as string,

    score: 0 as number,

    beforeGame: {
        countdown: {
            name: 3 as any,
            final: i18n.global.t('game.play.timerLastMessage') as string,
            status: true as boolean,
        }
    },

    pagination: {
        totalItems: 100,
        currentPage: 1,
        itemsPerPage: 15,
        toShow: 1,
    },
    history: [] as any,
    totalReward: 0 as number,
    lobbyIds: 0 as number,


  }),
  getters: {
   
  },
  actions: {



    // async reloadHistory(tg_id: number){
    //     await this.getHistoryStat(tg_id)
    //     await this.setGameHistory(tg_id)
    // },
    // async getHistoryStat(tg_id: number){
    //     let stat = await this.getLobbyStat(tg_id) as any
    //     console.log(stat);
    //     console.log('stat: '+tg_id);
        
    //     this.pagination.totalItems = stat.totalLobbies
    //     this.totalReward = stat.totalScore
    // },
    // async setGameHistory(tg_id: number){
    //     let response = await this.gamesHistory(tg_id, this.pagination.currentPage - 1, this.pagination.itemsPerPage) as any
    //     this.history = response.data
    //     this.lobbyIds = response.lobbyIds
    // },


    async setCountdownDefault(){
        this.beforeGame.countdown.name = 3
        this.beforeGame.countdown.status = true
    },
    async setActivity(value: boolean){
        this.gameActivity = value
    },
    async setScore(score: number){
        this.score = score
    },
    async setStatusGame(status: string){
        this.gameStatus = status
    },
    toggleGame(){
        this.gameActivity = false
        this.score = 0
        this.gameStatus = 'ready'
        this.beforeGame.countdown.name = 3
        this.beforeGame.countdown.status = true

        
    },
    async checkExistLobby(tg_id: number, score: number) {
        await axios({
            method: "get",
            url: `${import.meta.env.VITE_API_URL}/searchExistLobby`,
            params: {
                id: tg_id
            }
        })
        .then(async (response) => {
            if (response.data == false) {
                this.setLobby(tg_id, score)
            }
            else{
                this.addUserToLobby(response.data.id, tg_id, score)
            }
            

            // alert && successAlert(response.data);
            return response
        })
        .catch((error) => {
            console.log(error);
            // alert && errorAlert(error.response.data);
            return false
        });

    },
    async setLobby(tg_id: number, score: number) {
        await axios({
            method: "post",
            url: `${import.meta.env.VITE_API_URL}/setLobby`,
            data: {
                id: tg_id,
                first_score: score,
            }
        })
        .then((response) => {
            return true
        })
        .catch((error) => {
            console.log(error);
            return false
        });

    },
    async addUserToLobby(lobby_id: number, user_id: number, score: number) {
        await axios({
            method: "post",
            url: `${import.meta.env.VITE_API_URL}/addUserToLobby`,
            data: {
                id: lobby_id,
                user_id: user_id,
                second_score: score,
            }
        })
        .then((response) => {

            console.log("СТатА ОбНоВиЛаСь");
            
            socket.emit('rating', 
                {
                    type: "updateAfterGameStat", 
                    data: lobby_id
                }
            );

            return true
        })
        .catch((error) => {
            console.log(error);
            return false
        });

    },

    // история игр
    async gamesHistory(tg_id: number, offset: number, count: number) {
        
        return await axios({
            method: "post",
            url: `${import.meta.env.VITE_API_URL}/getLobbies`,
            data: {
                id: tg_id,
                offset: offset,
                limit: count,
            }
        })
        .then((response) => {
            console.log(response.data);
            const currentUserId = response.data.currentUser
            let data = [] as any
            let opponent_id = 0;
            let currentUser = {} as any
            let opponentUser = {} as any

            let lobbyIds = [] as any

            response.data.lobbies.forEach((element: any) => {
                opponent_id = element.first_user === currentUserId 
                    ? element.second_user
                    : element.first_user


                currentUser = element.first_user === currentUserId 
                    ? {
                        id: element.first_user,
                        name: element.tg_user,
                        score: element.first_score
                    }
                    : {
                        id: element.second_user,
                        name: element.tg_user,
                        score: element.second_score
                    }

                opponentUser = element.first_user !== currentUserId 
                    ? {
                        id: element.first_user,
                        score: element.first_score
                    }
                    : {
                        id: element.second_user,
                        score: element.second_score
                    }

                response.data.opponents.forEach((opponent: any) => {
                    if (opponent.tg_id == opponent_id) {
                        opponentUser.name = opponent.tg_name
                        opponentUser.username = opponent.tg_username
                        opponentUser.teamImage = import.meta.env.VITE_STORAGE_URL + opponent.team.imageSmall
                        opponentUser.teamName = import.meta.env.VITE_STORAGE_URL + opponent.team.imageSmall
                    }
                });



                // if (
                //     (element.winner_id == null && element.first_user == currentUserId && !element.reward_accepted) || 
                //     (element.winner_id == null && element.second_user == currentUserId && !element.second_reward_accepted) ||
                //     (element.winner_id !== null &&element.winner_id == currentUserId && !element.reward_accepted)
                // ) {
                //     lobbyIds.push(element.id)
                // }

                data.push({
                    id: element.id,
                    currentUser,
                    opponentUser,
                    firstUser: element.first_user,
                    secondUser: element.second_user,
                    rewardClaimed: element.reward_accepted,
                    secondRewardClaimed: element.second_reward_accepted,
                    winner: element.winner_id,
                    winnerScore: currentUser.score + opponentUser.score
                })
            });


            return data;
        })
        .catch((error) => {
            console.log(error);
            
        }); 

    },
    async getLobbyStat(tg_id: number) {
        console.log('getLobbyStat: '+tg_id);
        
        return await axios({
            method: "get",
            url: `${import.meta.env.VITE_API_URL}/getLobbyStat`,
            params: {
                id: tg_id,
            }
        })
        .then((response) => {
            console.log(response);
            
            return response.data
        })
        .catch((error) => {
            console.log(error);
            
        });

    },
    async getWinnersReward(tg_id: number, lobbyIds: Array<Number>) {
        await axios({
            method: "get",
            url: `${import.meta.env.VITE_API_URL}/getWinnersReward`,
            params: {
                id: tg_id,
                lobbyList: lobbyIds,
            }
        })
        .then((response) => {
            
            return response.data
        })
        .catch((error) => {
            console.log(error);
            
        });

    },


  },

});
