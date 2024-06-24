import { defineStore } from "pinia";
import axios from "axios";
import type { User, Teams, TelegramData } from "#types/default";
import { warningAlert, errorAlert, successAlert } from "@notyf/answers";
import { authStore } from "@stores/auth";
import { socket } from "@stores/wss"
import { teamsNames, language_code} from '@/localization/teams'

declare var window: any;

export const userStore = defineStore("UserStore", {
    state: () => ({
        user: {} as User,
        team: {} as Teams,
        week: {} as any,
        stats: {} as any,
        dailyRewards: [] as any,
        friends: [] as any,
        friendsCount: 0 as any,
        friendsTotalReward: 0 as number,

        rating: {
            games: 0 as any,
            wins: 0 as any,
            defeat: 0 as any,
            place: 0 as any,
            scores: 0 as any,
        },


        levelTasks: [] as any,
        permanentTasks: [] as any,

    }),
    getters: {
        // getUsers(state){
        //   return state.user
        // }
    },
    actions: {

        setUserRating(games: number, wins: number, defeat: number, place: number, scores: number){
            this.rating.games = games
            this.rating.wins = wins
            this.rating.defeat = defeat
            this.rating.place = place
            this.rating.scores = scores
        },

        truncate(value: string, length: number) {            
            if (value.length > length) {
                return value.substring(0, length) + "...";
            } 
            else {
                return value;
            }
        },
        async addUser(tgUserData: TelegramData, team: number) {
            let userData = tgUserData;
            userData.team_id = team;

            return await axios
                .post(`${import.meta.env.VITE_API_URL}/setUser`,userData)             
                .then(async (response: any) => {
                    console.log('setUser');
                    console.log(response);

                    // await this.getUserData(userData.id)
                })
                .catch((error) => {
                    console.log(error);
                });
        }, 

        async getUserData(tg_id: number) {
            return await axios({
                method: "get",
                url: `${import.meta.env.VITE_API_URL}/getUser`,
                params: {
                    id: tg_id,
                },
            })
                .then(async (response) => {
                    this.user = response.data;

                    // await this.getLevelLimit(response.data.tg_id)
                    // await this.getUserTeam(response.data.tg_id)
 
                    // setTimeout(() => {
                    // this.getUserRating(tg_id, this.user.team_id)
                    // }, 500);
                })
                .catch((error) => console.log(error));

            
            
        },
        getUserRating(tg_id: number, team_id: number){
            socket.emit('rating', 
                {type: "getUserRating", data: {id: tg_id, teamId: team_id}}, 
                (response: any) => {
                    // console.log(response);
                    
                    this.setUserRating(response.data.rating.total, response.data.rating.victories, response.data.rating.loses, response.data.place, response.data.rating.scores)
                }
            );
        },
        async getLevelLimit(tg_id: number) {
            
            return await axios({
                method: "get",
                url: `${import.meta.env.VITE_API_URL}/getLevelLimit`,
                params: {
                    id: tg_id,
                },
            })
                .then((response) => {
                    this.user.levelLimit = response.data.limit;


                })
                .catch((error) => console.log(error));
        },
        async getUserTeam(tg_id: number) {
            return await axios({
                method: "get",
                url: `${import.meta.env.VITE_API_URL}/getUserTeam`,
                params: {
                    id: tg_id,
                },
            })
                .then((response) => {                    
                    this.team = response.data;

                    let name = response.data.name

                    this.team.name = teamsNames[name][language_code]
                    this.team.imageBig =
                        import.meta.env.VITE_STORAGE_URL + this.team.imageBig;
                    this.team.imageSmall =
                        import.meta.env.VITE_STORAGE_URL + this.team.imageSmall;

                    this.week = {
                        games: 90,
                        wins: 50,
                        defeat: 40,
                    };
                    this.stats = {
                        level: 1,
                        levelScore: 1000,
                        score: 200,
                    };
                })
                .catch((error) => console.log(error));
        },
        async changeUserTeam(team_id: number) {
            await axios({
                method: "post",
                url: `${import.meta.env.VITE_API_URL}/changeUserTeam`,
                data: {
                    id: this.user.tg_id,
                    team_id: team_id,
                },
            })
            .then((response) => {
                this.getUserTeam(this.user.tg_id)
                
                // this.team = response.data;
            })
            .catch((error) => console.log(error));

        },
        async userDailyReward() {
            await axios({
                method: "post",
                url: `${import.meta.env.VITE_API_URL}/userDailyReward`,
                data: {
                    id: this.user.tg_id,
                },
            })
            .then((response) => {
                console.log(response);
                
                
                // this.team = response.data;
            })
            .catch((error) => console.log(error));

        },
        async checkDailyReward() {
            await axios({
                method: "post",
                url: `${import.meta.env.VITE_API_URL}/checkDailyReward`,
                data: {
                    id: this.user.tg_id,
                },
            })
            .then((response) => {
                console.log(response);
                
                
                // this.team = response.data;
            })
            .catch((error) => console.log(error));

        },
        async getDailyRewards() {
            await axios({
                method: "get",
                url: `${import.meta.env.VITE_API_URL}/getDailyRewards`,
            })
            .then((response) => {
                this.dailyRewards = response.data
            })
            .catch((error) => console.log(error));

        },
        async getFriends(offset: number, limit: number) {
            await axios({
                method: "post",
                url: `${import.meta.env.VITE_API_URL}/getFriends`,
                data: {
                    id: this.user.tg_id,
                    offset: offset,
                    limit: limit,
                }
            })
            .then(async (response) => {
                console.log('getFriends: ' + response);
                
                for (let index = 0; index < response.data.length; index++) {
                    response.data[index].team.imageSmall = import.meta.env.VITE_STORAGE_URL + response.data[index].team.imageSmall
                    response.data[index].team.imageBig = import.meta.env.VITE_STORAGE_URL + response.data[index].team.imageBig
                    
                }
                this.friends = await response.data  
                console.log(this.friends.length);
                
            })
            .catch((error) => console.log(error));

        },
        async getFriendStat() {
            await axios({
                method: "get",
                url: `${import.meta.env.VITE_API_URL}/getFriendStat`,
                params: {
                    id: this.user.tg_id,
                }
            })
            .then(async (response) => {
                this.friendsCount = response.data.totalFriends > 100 ? 100 : response.data.totalFriends
                this.friendsTotalReward = response.data.totalBonus       
            })
            .catch((error) => console.log(error));

        },

        
        async claimFriendsBonus(score: number) {
            await axios({
                method: "post",
                url: `${import.meta.env.VITE_API_URL}/setUserBalance`,
                data: {
                    id: this.user.tg_id,
                    balance: score
                }
            })
            .then((response) => {
                this.friendsResetReward()
            })
            .catch((error) => console.log(error));

        },
        async friendsResetReward() {
            await axios({
                method: "post",
                url: `${import.meta.env.VITE_API_URL}/friendsResetReward`,
                data: {
                    id: this.user.tg_id,
                }
            })
            .then(async (response) => {
                console.log(response);              
                
                
            })
            .catch((error) => console.log(error));

        },
        async userLevelUp() {
            await axios({
                method: "post",
                url: `${import.meta.env.VITE_API_URL}/userLevelUp`,
                data: {
                    id: this.user.tg_id,
                }
            })
            .then((response) => {
                console.log(response);               
            })
            .catch((error) => console.log(error));

        },


        async getLevelTask(){
            return await axios({
                method: "get",
                url: `${import.meta.env.VITE_API_URL}/getLevelTasks`,
                params: {
                    id: this.user.tg_id
                }
            })
            .then(async (response) => {
                console.log(response);
                this.levelTasks = await response.data 
                return true
                // if (response.data.result.status == 'member') {
                //     return true
                // }
                // else{
                //     return false
                // }
            })
            .catch((error) => console.log(error));
        },
        async getPermanentTasks(){
            return await axios({
                method: "get",
                url: `${import.meta.env.VITE_API_URL}/getPermanentTasks`,
                params: {
                    id: this.user.tg_id
                }
            })
            .then(async (response) => {
                console.log(response);
                this.permanentTasks = await response.data 
                return true
                // if (response.data.result.status == 'member') {
                //     return true
                // }
                // else{
                //     return false
                // }
            })
            .catch((error) => console.log(error));
        },

        async checkUserSubscription(chat_id: string){
            return await axios({
                method: "post",
                url: `${import.meta.env.VITE_API_URL}/checkTelegramSubscription`,
                data: {
                    "chat_id": chat_id,
                    "user_id": this.user.tg_id
                }
            })
            .then(async (response) => {
                console.log(response); 
                return await response.data
                // if (response.data.result.status == 'member') {
                //     return true
                // }
                // else{
                //     return false
                // }
            })
            .catch((error) => console.log(error));
        },
        async changeTaskStatus(task_id: number, isLevel: boolean){
            return await axios({
                method: "post",
                url: `${import.meta.env.VITE_API_URL}/changeTaskStatus`,
                data: {
                    userId: this.user.tg_id,
                    taskId: task_id,
                    isLevel: isLevel
                }
            })
            .then(async (response) => {
                console.log(response); 

                
            })
            .catch((error) => console.log(error));
        },
    },
});

export const telegramUserStore = defineStore("TelegramUserStore", {
    state: () => ({
        telegramUser: {} as any,
    }),
    actions: {
        setTelegramUser() {
            
            const tg = window.Telegram;
            const WebApp = tg.WebApp;            
            if (WebApp.initData) {
                // var tgUser = WebApp.initData;
                // var converted = JSON.parse(
                //     '{"' +
                //         tgUser.replace(/&/g, '","').replace(/=/g, '":"') +
                //         '"}',
                //     function (key, value) {
                //         return key === "" ? value : decodeURIComponent(value);
                //     }
                // );
                this.telegramUser = WebApp.initDataUnsafe.user;
                if (WebApp.initDataUnsafe.start_param) {
                    const friend_id = Number(decodeURIComponent(escape(window.atob(WebApp.initDataUnsafe.start_param))))
                    if (friend_id != this.telegramUser.id) {
                        this.telegramUser.friend_id = friend_id
                        this.telegramUser.friend_reward = 0
                    }
                }
                console.log(this.telegramUser);
                
            } else {
                this.telegramUser = {
                    id: 906308044,
                    username: "Fenoty",
                    first_name: "Илья Андреевич",
                    last_name: "",
                    language_code: "ru",
                    team_id: 5,
                };
            }
        },
    },
});
