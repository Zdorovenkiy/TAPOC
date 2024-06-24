import { createI18n } from "vue-i18n";

declare var window: any;

const tg = window.Telegram;
const WebApp = tg.WebApp;

export const language_code = WebApp.initData && WebApp.initDataUnsafe.user.language_code == "ru" ? "ru" : "en"

export const teamsNames: any = {
    "Медведи":  {
        ru: "Медведи",
        en: "Bears",
    },
    "Капибары":  {
        ru: "Капибары",
        en: "Capybars",
    },
    "Утки":  {
        ru: "Утки",
        en: "Ducks",
    },
    "Лоси":  {
        ru: "Лоси",
        en: "Moose",
    },
    "Львицы":  {
        ru: "Львицы",
        en: "Lionesses",
    },
    "Сурки":  {
        ru: "Сурки",
        en: "Storm",
    },
    "Панды":  {
        ru: "Панды",
        en: "Panda",
    },
    "Пантеры":  {
        ru: "Пантеры",
        en: "Panthers",
    },
    "Еноты":  {
        ru: "Еноты",
        en: "Raccoons",
    },
    "Носороги": {
        ru: "Носороги",
        en: "Rhino",
    },

}
    
    




export default teamsNames;