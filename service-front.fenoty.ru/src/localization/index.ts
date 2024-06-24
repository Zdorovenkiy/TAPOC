import { createI18n } from "vue-i18n";
import {userStore} from '@stores/user'

declare var window: any;
const tg = window.Telegram;
const WebApp = tg.WebApp;
var language_code = 'en'
if (WebApp.initData) {
    var language_code = WebApp.initDataUnsafe.user.language_code == "ru" ? "ru" : "en";
}



const i18n = createI18n({
    // default locale
    locale: language_code,

    // translations
    messages: {
        ru: {
            navigation: {
                general: "Главная",
                arena: "Арена",
                tasks: "Задания",
                friends: "Друзья",

                game: "Игра",

                welcome: "Начальная страница",
                selectTeam: "Выбор команды",
                switchTeam: "Смена команды",
                levelUp: "Повышение уровня",

            },
            welcome: {
                title: "Добро пожаловать!",
                text: "Вы готовы погрузиться в увлекательный мир соревнований и выигрывать? Выбирайте команду и начните зарабатывать!",
                firstSlide: {
                    title: 'Выбирайте команду за которую будете играть',
                    text: 'Раз в неделю лучший игрок команды будет попадать в рейтинг.',
                },
                secondSlide: {
                    title: 'Просто играйте в игру и выигрывайте!',
                    text: 'Тапайте и лопайте пузырьки, за каждым пузырьком вас ждет награда. Соберите больше, чем ваш противник и забирайте награду!',
                    result: 'Ваш результат: 80',
                },
                thirdSlide: {
                    title: 'Заходи каждый день и рассказывай о нас своим друзьям',
                    text: 'Заходи в игру каждый день без пропусков. И забирай свои награды не только за дни, но и за друзей.',
                },
                buttons: {
                    next: 'Далее',
                    start: 'Начать играть',
                }
            },
            selectTeam: {
                title: "Выберите команду",
                yourTeam: "Ваша команда",
            },
            switchTeam: {
                title: "Выбор команды",
                modalTitle: "Вы уверенны, что хотите сменить команду?",
                team: 'Команда',
                button: "Сменить команду",
            },
            week: {
                title: "Как прошла неделя",
                totalGames: "Всего игр",
                totalWins: "Победы",
                totalDefeat: "Поражения",
            },
            rating: {
                title: "Рейтинг",
                yourPlace: "Ваше место в рейтинге",
                clue: {
                    global: 'Глобальный рейтинг',
                    globalText: '- онлайн рейтинг всех игроков разделенный на команды.',
                    best: 'Лучшие игроки',
                    bestText: 'рейтинг лучших игроков из каждой команды за прошлую неделю.',
                },
                global: "Глобальный рейтинг",
                best: "Лучшие игроки",
            },
            levelUp: {
                textFull:
                    "Вы достигли цели для перехода на новый уровень! Выполните задания, чтобы увеличить лимит банка и стать еще круче!",
                textNotFull:
                    "Вы не достигли цели для перехода на новый уровень. Зарабатывайте, побеждая на Арене и выполняя задания, чтобы увеличить лимит банка и стать еще круче!",
                modal: {
                    title: "Вы перешли на новый уровень!",
                    text: "Лимит вашего банка увеличен. Продолжайте играть и побеждать, чтобы перейти на новый уровень!",
                },
                modalLevel: {
                    title: 'Самое время для роста!',
                    text: 'Для перехода на новый уровень вам нужно увеличить лимит своего банка. Внесите {score} монет для увеличения лимита и повышения уровня.',
                    button: 'Увеличить лимит банка',
                }
            },

            user: {
                level: "Уровень",
            },
            arena: {
                top: "Топ",
                gameHistory: 'История игр',
                noGames: {
                    title: 'Вы еще не играли',
                    text: 'Начините играть, чтобы увидеть историю ваших игр',
                },
                buttons: {
                    startNewGame: "Начать новую игру!",
                    claimBonus: "Забрать бонус",
                    claim: "Забрать",
                    claimed: "Награда получена",
                    running: "Игра еще идет",
                    defeat: "Вы проиграли",
                },
            },
            game: {
                ready: {
                    title: "Вы готовы начать игру?",
                    text: "Ваша задача за 15 секунд собрать больше бонусов, чем ваш противник.",
                    textEnd: "Победитель забирает все!",
                },
                play: {
                    timerText: "До конца раунда",
                    timerLastMessage: "Игра",
                },
                final: {
                    title: "Время вышло!",
                    text: "Результат этого турнира вы можете увидеть в истории игр",
                    result: "Ваш результат:",
                },
                bankFull: {
                    title: "Банк переполнен!",
                    text: "Лимит вашего банка кончился. Повысьте уровень, чтобы продолжать играть на Арене",
                },
                buttons: {
                    startGame: "Начать игру!",
                    startAnotherGame: "Сыграть еще раз",
                },
            },
            friends: {
                invite: {
                    title: "Пригласите друзей",
                    text: "Приглашайте своих друзей в игру и получайте бонус в 1% от их заработка!",
                    copied: "Скопированно",
                    share: "Присоединяйся к игре PAC: Tap Arena и зарабатывай: {url}",
                },
                your: {
                    title: "Ваши друзья",
                    titleNotHave: "У вас пока нет друзей",
                    text: "Отправьте приглашение вашим друзьям и играйте вместе!",
                    bonusText: "Ваш бонус:",
                    button: "Забрать бонус",
                    modal: {
                        title: "Ваш бонус от заработка друзей",
                        text: "Приглашайте своих друзей чтобы получать больше бонусов!",
                        button: "Вернуться к друзьям",
                    },
                },
            },
            tasks: {
                daily: {
                    title: "Ежедневная награда",
                    day: "День",
                    buttons: {
                        claimed: "Получено",
                        claim: "Получить",
                    },
                },
                missions: {
                    title: 'Задания',
                    subscribeTelegram: "Подпишитесь на наш Telegram канал",
                    subscribeYoutube: "Подпишитесь на наш Youtube канал",
                    enteredScore: "Внесите {score} монет из вашего банка",
                    buttons: {
                        perform: "Выполнить",
                        complete: "Выполнено",
                        entered: "Внесено",
                    },
                },
                modalDaily: {
                    title: "Ежедневная награда получена!",
                    text: "Заходите в игру каждый день и увеличивайте вашу награду!",
                    button: "Играть дальше",
                },
                modalTask: {
                    title: "Задание выполнено!",
                    text: "Выполняйте другие задания и получайте награду",
                    button: "К заданиям",
                },
            },
            network: {
                title: 'Плохое соединение',
                text: 'Повторите попытку или зайдите позже',
                button: 'Повторить попытку'
            },
            buttons: {
                start_earn: "Начать зарабатывать",
                continue: "Продолжить",
                level_up: "Повысить уровень",
                to_level_up: "Перейти на новый уровень",
                claim_all: "Забрать все",
                
            },
        },

        en: {
            navigation: {
                general: "Home",
                arena: "Arena",
                tasks: "Tasks",
                friends: "Friends",

                game: "Game",

                welcome: "Welcome",
                selectTeam: "The choice of the team",
                switchTeam: "Change of team",
                levelUp: "Level up",

            },
            welcome: {
                title: "Welcome!",
                text: "Are you ready to plunge into the fascinating world of competitions and win? Choose a command and start earning!",
                firstSlide: {
                    title: 'Choose a team for which you will play',
                    text: 'Once a week, the best player of the team will fall into the rating.',
                },
                secondSlide: {
                    title: 'Just play the game and win!',
                    text: 'Tap and burst the bubbles, behind each bubble you will find a reward.Collect more than your enemy and take the award!',
                    result: 'Your result: 80',
                },
                thirdSlide: {
                    title: 'Come in every day and tell your friends about us',
                    text: 'Come into the game every day without passes.And take your awards not only in days, but also for friends.',
                },
                buttons: {
                    next: 'Next',
                    start: 'Begin',
                }
            },
            selectTeam: {
                title: "Select the team",
                yourTeam: "Your team",
            },
            switchTeam: {
                title: "The choice of the team",
                modalTitle: "Are you sure you want to change the team?",
                team: 'Team',
                button: "Change the team",
            },
            week: {
                title: "How a week has passed",
                totalGames: "All games",
                totalWins: "Victory",
                totalDefeat: "Defeat",
            },
            rating: {
                title: "Rating",
                yourPlace: "Your place in the ranking",
                clue: {
                    global: 'Global rating',
                    globalText: '- online rating of all players divided into teams.',
                    best: 'Best players',
                    bestText: 'rating of the best players from each team last week.',
                },
                global: "Global rating",
                best: "Best players",
            },
            levelUp: {
                textFull:
                    "You have reached the goal to switch to a new level! Full tasks to increase the bank limit and become even cooler!",
                textNotFull:
                    "You have not reached the goal to switch to a new level. Earn, winning in the arena and completing tasks to increase the bank limit and become even cooler!",
                modal: {
                    title: "You switched to a new level!",
                    text: "The limit of your bank is increased. Continue to play and win to go to a new level!",
                },
                modalLevel: {
                    title: `It's time for growth!`,
                    text: 'To switch to a new level, you need to increase the limit of your bank. Make {score} coins to increase the limit and increase the level.',
                    button: 'Increase limit',
                }
            },
            user: {
                level: "Level",
            },
            arena: {
                top: "Up",
                gameHistory: 'Games history',
                noGames: {
                    title: "You haven't played yet",
                    text: 'Start playing to see the history of your games',
                },
                buttons: {
                    startNewGame: "Start a new game!",
                    claimBonus: "Take a bonus",
                    claim: "Take",
                    claimed: "Received",
                    running: "Still coming",
                    defeat: "You lose",
                },
            },
            game: {
                ready: {
                    title: "Are you ready to start the game?",
                    text: "Your task in 15 seconds to collect more bonuses than your opponent.",
                    textEnd: "The winner takes everything!",
                },
                play: {
                    timerText: "Until the end of the round",
                    timerLastMessage: "Game",
                },
                final: {
                    title: "Time is over!",
                    text: "You can see the result of this tournament in the history of games",
                    result: "Your result:",
                },
                bankFull: {
                    title: "The bank is crowded!",
                    text: "The limit of your bank is over. Increase the level to continue playing in the arena",
                },
                buttons: {
                    startGame: "Start the game!",
                    startAnotherGame: "Play again",
                },
            },
            friends: {
                invite: {
                    title: "Invite friends",
                    text: "Invite your friends to the game and get a bonus of 1% of their earnings!",
                    copied: "Сopied",
                    share: "Join the game PAC: Tap Arena and earn: {url}",
                },
                your: {
                    title: "Your friends",
                    titleNotHave: "You have no friends yet",
                    text: "Send an invitation to your friends and play together!",
                    bonusText: "Your bonus:",
                    button: "Take a bonus",
                    modal: {
                        title: "Your bonus from making friends",
                        text: "Invite your friends to receive more bonuses!",
                        button: "Return to friends",
                    },
                },
            },
            tasks: {
                daily: {
                    title: "Daily reward",
                    day: "Day",
                    buttons: {
                        claimed: "Obtained",
                        claim: "Get",
                    },
                },
                missions: {
                    title: 'Tasks',
                    subscribeTelegram: "Subscribe to our Telegram channel",
                    subscribeYoutube: "Subscribe to our Youtube channel",
                    enteredScore: "Make {score} coins from your bank",
                    buttons: {
                        perform: "Perform",
                        complete: "Done",
                        entered: "Entered",
                    },
                },
                modalDaily: {
                    title: "Daily reward received!",
                    text: "Go to the game every day and increase your award!",
                    button: "Play on",
                },
                modalTask: {
                    title: "The task is completed!",
                    text: "Perform other tasks and get a reward",
                    button: "To tasks",
                },
            },
            network: {
                title: 'Bad connection',
                text: 'Repeat the attempt or go later',
                button: 'Retry'
            },
            buttons: {
                start_earn: "Start earn",
                continue: "Continue",
                level_up: "Level up",
                to_level_up: "Increase level",
                claim_all: "Claim all",
            },
        },
    },
});

export default i18n;
