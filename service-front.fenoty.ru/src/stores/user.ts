import { ref, computed, watch } from "vue";
import { defineStore } from "pinia";
import axios from "axios";
import type {Teams, TelegramData} from '#types/default'




export const userStore = defineStore('UserStore', {
  state: () => ({
    user: {
      tgData: {},
      week: {
        games:  90,
        wins:   50,
        defeat: 40,
      },
      stats: {
        level: 1,
        levelScore: 1000,
        score: 200,
      }
    },
  }),
  getters: {
    getUsers(state){
      return state.user
    }
  },
  actions: {
    setUser(tgUserData: TelegramData, team: number) {  
      tgUserData.team_id = team
      this.user.tgData = tgUserData;
      console.log(this.user.tgData);
      
    },
    // setBalance(newValue: number) {
    //   this.balance = newValue
    // },
    startIntervalUpdate() {
      setInterval(() => {
          this.user.stats.score=Math.floor(Math.random() * 1500)
          this.user.week.games = Math.floor(Math.random() * 10000)
          this.user.week.wins = Math.floor(Math.random() * 10000)
          this.user.week.defeat = Math.floor(Math.random() * 10000)
      }, 2000);
    },
    // Другие действия
  },

});


export const telegramUserStore = defineStore('TelegramUserStore', {
  state: () => ({
    telegramUser: {} as any
  }),
  // getters: {
  //   getUser(state){
  //     return state.telegramUser
  //   }
  // },
  actions: {
    setTelegramUser(){
      const tg = window.Telegram;
      const WebApp = tg.WebApp;
      if (WebApp.initData) {
          var tgUser = WebApp.initData
          var converted = JSON.parse('{"' + tgUser.replace(/&/g, '","').replace(/=/g,'":"') + '"}', function(key, value) { return key===""?value:decodeURIComponent(value) })
          this.telegramUser = JSON.parse(converted.user);
          
      }
      else{
        this.telegramUser = {
          id: 1,
          username: 'string',
          first_name: 'string',
          last_name: 'string',
          language_code: 'string',
        };
      }
    }
  },

});