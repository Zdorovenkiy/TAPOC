import { ref, computed } from "vue";
import { defineStore } from "pinia";
import axios from "axios";
import type {Teams} from '#types/default'

export const teamsStore = defineStore('TeamStore', {
  state: () => {
      return {
          teams: [] as Array<Teams>,
      }
  },
  actions: {
    async fetchTeams() {
      await axios.get(`${import.meta.env.VITE_API_URL}/getteams`)
      .then(response => {

        response.data.forEach((element: Teams) => {
          this.teams.push({
            id: element.id,
            name: element.name,
            imageBig: import.meta.env.VITE_STORAGE_URL + element.imageBig,
            imageSmall: import.meta.env.VITE_STORAGE_URL + element.imageSmall,
          })
        });
        
      })
      .catch(error => console.log(error))
    }
  }
})
