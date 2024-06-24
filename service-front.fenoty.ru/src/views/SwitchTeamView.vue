<template>
<div style="position: relative">
    <ReturnButton link="/" padding="0px" class="gray"/>

    <section class="switch-team">
        <div class="current">
            <div class="current-avatar">
                <img :src="team.imageSmall" :alt="team.name">
            </div>
            <h1 class="current-name">{{truncate(user.tg_name, 20)}}</h1>
        </div>
        <div class="select-team">
            <h2 class="section-title">{{ $t('switchTeam.title') }}</h2>
            <div class="teams">
                <div 
                    v-for="item in teams" 
                    :key="item.id" 
                    class="team" 
                    :class="team.id == item.id && 'active'" 
                    @click="selectTeam(item)"
                >
                    <div class="team-avatar">
                        <img :src="item.imageSmall" :alt="item.name">
                    </div>
                    <div class="team-name">{{ $t('switchTeam.team') }} {{item.name}}</div>
                </div>
            </div>
        </div>
    </section>

    <transition name="fade">
        <div v-if="modal" class="modal">
            <div class="modal-select">
                <CloseButton @click="modal = !modal" padding="12px"/>
                <h5>{{ $t('switchTeam.modalTitle') }}</h5>
                <div class="team">
                    <div class="team-avatar">
                        <img :src="selectedTeam.imageSmall" :alt="selectedTeam.name">
                    </div>
                    <div class="team-name">{{ $t('switchTeam.team') }} {{selectedTeam.name}}</div>
                </div>
                
                <DefaultButton @click="changeTeam(selectedTeam.id)" class="default small max-width" width="143px">{{ $t('switchTeam.button') }}</DefaultButton>
            </div>
        </div>
    </transition>
</div>
</template>


<script lang="ts">
import { mapState, mapActions } from "pinia";
import { teamsStore } from "@stores/teams";
import { userStore, telegramUserStore } from "@stores/user";
import type { Teams } from '#types/default'
import DefaultButton from "@components/buttons/Default.vue";
import CloseButton from "@components/buttons/CloseButton.vue";
import ReturnButton from "@components/buttons/ReturnButton.vue";

export default {
    name: "SwitchTeam",
    components: {
        DefaultButton,
        CloseButton,
        ReturnButton,
    },
    data() {
        return {
            selectedTeam: {} as Teams,
            modal: false,
        };
    },
    setup() {    
        const teamStorage = teamsStore();
        teamStorage.teams = [];
        teamStorage.fetchTeams();
        const teams = teamStorage?.teams;

        return {
            teams,
        };
    },
    computed: {
        ...mapState(userStore, [
            'user',
            'team',
        ]), 
    },
    methods: {
        ...mapActions(userStore, [
            'changeUserTeam',
            'truncate',
        ]), 
        selectTeam(team: Teams){
            this.selectedTeam = team
            this.modal = true
        },
        changeTeam(team_id: number){
            this.changeUserTeam(team_id)
            this.modal = false
        }
    },
    mounted() {

    },
};
</script>



<style lang="scss" scoped>
.switch-team{
    display: flex;
    flex-direction: column;
    gap: 24px;
    .current{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 12px;
        &-avatar{
            max-width:  106px;
            max-height: 106px;
            min-width:  106px;
            min-height: 106px;
            border-radius: 10px;
            overflow: hidden;
            img{
                max-width:  inherit;
                max-height: inherit;
                min-width:  inherit;
                min-height: inherit;
                object-fit: contain;
            }
        }
        &-name{
            font-family: $font-primary;
            font-size: 16px;
            font-weight: 600;
            color: $yellow;
        }
    }
    .select-team{
        display: flex;
        flex-direction: column;
        gap: 12px;
        .teams{
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 8px;
            .team{
                cursor: pointer;
                display: flex;
                flex-direction: column;
                align-items: center;
                gap: 8px;

                &-avatar{
                    max-width:  78px;
                    max-height: 78px;
                    min-width:  78px;
                    min-height: 78px;
                    border-radius: 10px;
                    overflow: hidden;
                    img{
                        max-width:  inherit;
                        max-height: inherit;
                        min-width:  inherit;
                        min-height: inherit;
                        object-fit: contain;
                    }
                }
                &-name{
                    text-align: center;
                    font-family: $font-primary;
                    font-weight: 400;
                    font-size: 12px;
                }
                &.active{
                    .team-avatar{
                        outline: 0.1rem solid $yellow;
                    }
                    .team-name{
                        color: $yellow;
                        font-weight: 500;
                    }
                }
            }
        }
    }
}
.modal{
    z-index: 99;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;

    background: rgba(0,0,0,0.6);

    display: flex;
    justify-content: center;
    align-items: center;
    &-select{
        position: relative;
        max-width: 277px;
        background: $gray-dark;
        border-radius: 15px;
        padding: 44px 14px;

        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 16px;
        font-family: $font-primary;
        font-weight: 500;
        h5{
            text-align: center;
            font-size: 16px;
        }
        .team{
            display: flex;
            flex-direction: column;
            justify-content: baseline;
            align-items: center;
            gap: 8px;
            &-avatar{
                max-width:  106px;
                max-height: 106px;
                min-width:  106px;
                min-height: 106px;
                border-radius: 10px;
                overflow: hidden;
                img{
                    max-width:  inherit;
                    max-height: inherit;
                    min-width:  inherit;
                    min-height: inherit;
                    object-fit: contain;
                }
            }
            &-name{
                text-align: center;
                color: $yellow;
                font-size: 16px;
                font-weight: 600;
            }
        }

    }
}


.fade-enter-active,
.fade-leave-active {
    transition: all 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
.fade-enter-to,
.fade-leave-from {
    opacity: 1;
}
</style>
