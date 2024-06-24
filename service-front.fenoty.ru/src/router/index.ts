import { createRouter, createWebHistory } from "vue-router";
import { authStore } from "@stores/auth";
import { telegramUserStore, userStore } from "@stores/user";
import axios from "axios";
import { warningAlert, errorAlert, successAlert } from "@notyf/answers";
import i18n from '@/localization'



const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/welcome",
            name: i18n.global.t('navigation.welcome'),
            component: () => import("@views/WelcomeView.vue"),
            meta: {
                requiresAuth: false,
                hideForAuth: true,
            },
        },
        {
            path: "/select-team",
            name: i18n.global.t('navigation.selectTeam'),
            component: () => import("@views/SelectTeamView.vue"),
            meta: {
                requiresAuth: false,
                hideForAuth: true,
            },
        },

        {
            path: "/",
            name: i18n.global.t('navigation.general'),
            meta: {
                requiresAuth: true,
                hideForAuth: false,
            },
            children: [
                {
                    path: "",
                    name: i18n.global.t('navigation.general'),
                    component: () => import("@views/GeneralView.vue"),
                    meta: {
                        requiresAuth: true,
                        hideForAuth: false,
                    },
                },
                {
                    path: "/switch-team",
                    name: i18n.global.t('navigation.switchTeam'),
                    component: () => import("@views/SwitchTeamView.vue"),
                    meta: {
                        requiresAuth: true,
                        hideForAuth: false,
                    },
                },
                {
                    path: "/level-up",
                    name: i18n.global.t('navigation.levelUp'),
                    component: () => import("@views/LevelUpView.vue"),
                    meta: {
                        requiresAuth: true,
                        hideForAuth: false,
                    },
                },
            ]
        },
        {
            path: "/arena",
            name: i18n.global.t('navigation.arena'),
            meta: {
                requiresAuth: true,
                hideForAuth: false,
            },
            children: [
                {
                    path: "",
                    name: i18n.global.t('navigation.arena'),
                    component: () => import("@views/ArenaView.vue"),
                    meta: {
                        requiresAuth: true,
                        hideForAuth: false,
                    },
                },
                {
                    path: "/game",
                    name: i18n.global.t('navigation.game'),
                    component: () => import("@views/GameView.vue"),
                    meta: {
                        requiresAuth: true,
                        hideForAuth: false,
                    },
                },
            ]
        },
        
        {
            path: "/tasks",
            name: i18n.global.t('navigation.tasks'),
            component: () => import("@views/TasksView.vue"),
            meta: {
                requiresAuth: true,
                hideForAuth: false,
            },
        },
        {
            path: "/friends",
            name: i18n.global.t('navigation.friends'),
            component: () => import("@views/FriendsView.vue"),
            meta: {
                requiresAuth: true,
                hideForAuth: false,
            },
        },
        {
            path: "/stop",
            name: "Стоп",
            component: () => import("@views/Stop.vue"),
        },
        {
            path: "/network",
            name: "Плохое соединение",
            component: () => import("@views/BadNetworkView.vue"),
        },
    ],
});

router.beforeEach(async (to, from, next) => {
    const telegramStorage = telegramUserStore();
    telegramStorage.setTelegramUser();
    const authStorage = authStore();
    await authStorage.checkUserAuth(telegramStorage.telegramUser.id);
 
    const access = [245156991, 822905120, 432264167, 906308044, 443710991];

    

    if (to.matched.some((record) => record.meta.requiresAuth)) {
        if (!access.includes(telegramStorage.telegramUser.id)) {
            next({path: '/stop'})
        }
        if (!authStorage.isLoggedIn) {
            next({ path: "/welcome" });
        } else {
            next();
        }
    } else { 
        next();
    }
});

export default router;
