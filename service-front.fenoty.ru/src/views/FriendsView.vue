<template>
    
        <section class="friends">
            <div class="friends-invite">
                <h1>{{ $t('friends.invite.title') }}</h1>
                <p>
                    {{ $t('friends.invite.text') }}
                </p>
                <!-- {{`t.me/PAC_TapArena_bot/TAPAC?startapp=${hash_id}`}} -->
                <div class="link">
                    <div
                        v-if="!copied"
                        v-clipboard="link_url"
                        @click="[copiedHandler(), toClipboard(link_url)]"
                        class="link-text"
                    >
                        {{ hash_id }}
                    </div>
                    <div v-if="copied" class="link-text">{{ $t('friends.invite.copied') }}</div>
                    <a
                        :href="`https://telegram.me/share/url?text=${ $t('friends.invite.share', {url: link_url}) }&url=PAC: Tap Arena`"
                        class="link-copy"></a>
                </div>
                <!-- <a :href="`t.me/PAC_TapArena_bot/TAPAC?startapp=${hash_id}`">LINK</a> -->
            </div>

            <div class="friends-your">
                <div class="top">
                    <h2>{{ $t('friends.your.title') }}</h2>
                    <DefaultButton
                        v-if="friends.length > 0 && friendsTotalReward > 0"
                        :score="friendsTotalReward && friendsTotalReward"
                        @click="
                            [
                                claimBonus(friendsTotalReward),
                                (modal = !modal),
                            ]
                        "
                        class="claim small"
                        :class="friendsTotalReward == 0 ? 'disabled' : 'active'"
                    >
                        {{ $t('friends.your.button') }}
                    </DefaultButton>
                    <DefaultButton
                        v-if="friends.length > 0 && friendsTotalReward == 0"
                        :score="friendsTotalReward && friendsTotalReward"
                        class="claim small"
                        :class="friendsTotalReward == 0 ? 'disabled' : 'active'"
                    >
                        {{ $t('friends.your.button') }}
                    </DefaultButton>
                </div>
                <div v-if="friends.length == 0" class="no-friends">
                    <h5>{{ $t('friends.your.titleNotHave') }}</h5>
                    <p>{{ $t('friends.your.text') }}</p>
                    <div class="image">
                        <img src="@images/no-friends.png" alt="No friends" />
                    </div>
                </div>
                <ul v-if="friends.length > 0">
                    <li v-for="friend in friends" :key="friend.id">
                        <div class="avatar">
                            <img
                                :src="friend.team.imageSmall"
                                :alt="friend.team.name"
                            />
                        </div>
                        <div class="info">
                            <div class="info-name">
                                {{ truncate(friend.tg_name, 10) }}
                            </div>
                            <div class="info-level">
                                {{ $t('user.level') }} {{ friend.level_id }}
                            </div>
                        </div>
                        <div class="bonus">
                            <div class="bonus-title">{{ $t('friends.your.bonusText') }}</div>
                            <div class="bonus-score">
                                <span>{{
                                    friend.friend_reward == null
                                        ? 0
                                        : friend.friend_reward
                                }}</span>
                                <TapacCoin />
                            </div>
                        </div>
                    </li>
                </ul>
            </div>


            <Vueginate
                :total-items="friendsCount"
                :current-page="pagination.currentPage"
                :items-per-page="pagination.itemsPerPage"
                :pages-to-show="pagination.toShow"
                @page-change="paginationHandler"
            />


            <transition name="fade">
                <div v-if="modal" class="modal">
                    <div class="modal-friends">
                        <h5>{{ $t('friends.your.modal.title') }}</h5>
                        <p>{{ $t('friends.your.modal.text') }}</p>
                        <div class="wallet">
                            <img src="@images/wallet-friends.png" alt="Wallet" />
                        </div>
    
                        <div class="bonus">
                            <span>{{ friendsTotalReward }}</span>
                            <TapacCoin />
                        </div>
    
                        <DefaultButton @click="[getFriendStat(),getFriends(pagination.currentPage - 1, pagination.itemsPerPage), modal = !modal]" class="default tiny">
                            {{ $t('friends.your.modal.button') }}
                        </DefaultButton>
                    </div>
                </div>
            </transition>
        </section>

        

</template>

<script lang="ts">
import { toClipboard } from '@soerenmartius/vue3-clipboard'
import TapacCoin from "@components/icons/iconTapac.vue";
import { userStore } from "@stores/user";
import { mapActions, mapState } from "pinia";
import DefaultButton from "@components/buttons/Default.vue";


import { Vueginate } from 'vueginate'
import '@assets/styles/_pagination.scss'


export default {
    name: "Friends",
    components: {
        TapacCoin,
        DefaultButton,
        Vueginate,
    },
    setup() {
        const userStorage = userStore();
        // userStorage.getFriends(0, 9);
        userStorage.getFriendStat();
        userStorage.getFriends(0, 9);

        return {
            toClipboard
        }
    },
    computed: {
        ...mapState(userStore, [
            "user", 
            "friends", 
            "friendsTotalReward",
            "friendsCount",
        ]),
    },
    data() {
        return {
            pagination: {
                totalItems: 0,
                currentPage: 1,
                itemsPerPage: 9,
                toShow: 1,
            },

            default_url: "t.me/PAC_TapArena_bot/TAPAC?startapp=" as string,
            hash_id: "" as any,
            link_url: "" as string,
            copied: false as boolean,
            modal: false as boolean,
            text: `Присоединяйся к игре PAC: Tap Arena и зарабатывай: https://t.me/PAC_TapArena_bot. Твоя реферальная ссылка: `,
        };
    },
    methods: {
        ...mapActions(userStore, [
            "getFriends", 
            "claimFriendsBonus", 
            "getFriendStat",
            "truncate"
        ]),
        async paginationHandler(page: number){
            this.pagination.currentPage = page
            await this.getFriends(page - 1, this.pagination.itemsPerPage) as any
        },
        async claimBonus(bonus: number){
            await this.claimFriendsBonus(bonus)
            await this.getFriendStat();
        },
        utf8_to_b64(str: any) {
            return window.btoa(unescape(encodeURIComponent(str)));
        },
        copiedHandler() {
            this.copied = true;
            setTimeout(() => {
                this.copied = false;
            }, 3000);
        },

        // countAllReward(){
        //     for (let index = 0; index < this.friends.length; index++) {
        //         this.totalReward += this.friends[index].friend_reward
        //     }
        // }
    },
    mounted() {

        // this.getFriends(0, 9)

        

        // this.countAllReward()
        this.hash_id = this.utf8_to_b64(this.user.tg_id);
        this.link_url = this.default_url + this.utf8_to_b64(this.user.tg_id);
    },
};
</script>

<style lang="scss">
.friends {
    display: flex;
    flex-direction: column;
    gap: 24px;
    &-invite {
        background: $gray-dark;
        border-radius: 10px;
        padding: 12px 24px 27px 24px;

        font-family: $font-primary;
        font-weight: 500;

        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 8px;
        h1 {
            font-size: 16px;
            font-weight: 500;
            color: $yellow;
            text-align: center;
        }
        p {
            text-align: center;
            font-size: 12px;
            max-width: 90%;

            margin-bottom: 18px;
        }
        .link {
            display: flex;
            flex-direction: row;
            gap: 8px;
            width: 100%;
            &-text {
                cursor: pointer;
                padding: 0 10px;
                border-radius: 5px;
                border: 1px solid $gray-light;
                overflow: hidden;
                text-wrap: nowrap;

                text-align: center;
                flex-grow: 1;

                width: 100%;
                max-width: 100%;

                font-family: $font-primary;
                font-size: 14px;
                font-weight: 400;

                max-height: 32px;
                min-height: 32px;

                display: flex;
                justify-content: center;
                align-items: center;
            }
            &-copy {
                cursor: pointer;
                background: $yellow;
                border-radius: 5px;
                border: none;

                max-width: 32px;
                max-height: 32px;
                min-width: 32px;
                min-height: 32px;
                &::before {
                    content: "";
                    display: block;

                    background-image: url("@images/icons/copy.svg");
                    background-position: center;
                    background-repeat: no-repeat;
                    background-size: 50%;

                    max-width: inherit;
                    max-height: inherit;
                    min-width: inherit;
                    min-height: inherit;
                }
            }
        }
    }
    &-your {
        display: flex;
        flex-direction: column;
        gap: 18px;
        .top {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
            gap: 10px;
            h2 {
                font-family: $font-primary;
                font-size: 16px;
                font-weight: 500;
                color: $yellow;
            }
        }
        .no-friends {
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
        ul {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            grid-template-rows: repeat(3, 1fr);
            gap: 8px;
            li {
                background: $gray-dark;
                border-radius: 10px;
                padding: 8px;

                display: flex;
                flex-direction: column;
                align-items: center;
                gap: 8px;
                .avatar {
                    max-width: 42px;
                    max-height: 42px;
                    min-width: 42px;
                    min-height: 42px;
                    border-radius: 10px;
                    overflow: hidden;
                    img {
                        max-width: inherit;
                        max-height: inherit;
                        min-width: inherit;
                        min-height: inherit;
                        object-fit: contain;
                    }
                }
                .info {
                    font-family: $font-primary;
                    font-size: 10px;

                    display: flex;
                    flex-direction: column;
                    gap: 4px;
                    &-name {
                        text-align: center;
                        color: $yellow;
                        font-weight: 500;
                    }
                    &-level {
                        text-align: center;
                        font-weight: 400;
                        color: $gray;
                    }
                }
                .bonus {
                    font-family: $font-primary;
                    font-size: 10px;
                    color: $yellow;

                    display: flex;
                    flex-direction: column;
                    gap: 4px;
                    &-title {
                        font-weight: 500;
                    }
                    &-score {
                        display: flex;
                        flex-direction: row;
                        align-items: center;
                        justify-content: center;
                        gap: 2px;
                        font-weight: 400;
                        svg {
                            max-width: 10px;
                            max-height: 10px;
                            min-width: 10px;
                            min-height: 10px;
                        }
                    }
                }
            }
        }
    }
}

.modal {
    z-index: 99;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;

    background: rgba(0, 0, 0, 0.6);

    display: flex;
    justify-content: center;
    align-items: center;
    &-friends {
        position: relative;
        width: 100%;
        max-width: 277px;
        background: $gray-dark;
        border-radius: 15px;
        padding: 44px 32px;

        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 16px;
        font-family: $font-primary;
        font-weight: 500;
        h5 {
            text-align: center;
            font-size: 16px;
            font-weight: 600;
            color: $white;
            max-width: 98%;
        }
        p {
            text-align: center;
            font-weight: 400;
            font-size: 12px;
            color: $white;
        }
        .wallet {
            position: relative;
            max-width: 132px;
            max-height: 132px;
            min-width: 132px;
            min-height: 132px;
            width: 100%;
            &::before {
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                content: "";
                display: block;

                background-image: url("@images/safe-shadow.png");
                background-position: center;
                background-repeat: no-repeat;
                background-size: 100%;

                max-width: 200px;
                max-height: 200px;
                min-width: 200px;
                min-height: 200px;
            }
            img {
                max-width: inherit;
                max-height: inherit;
                min-width: inherit;
                min-height: inherit;
                object-fit: contain;
            }
        }
        .bonus {
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: center;
            gap: 8px;
            span {
                font-family: $font-primary;
                font-weight: 700;
                color: $yellow;
                font-size: 32px;
            }
            svg {
                max-width: 26px;
                max-height: 26px;
                min-width: 26px;
                min-height: 26px;
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
