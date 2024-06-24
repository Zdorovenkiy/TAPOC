import { where } from "sequelize";
import db from "../utils/db.js";
import { Op } from "@sequelize/core";
import { setFriendsRewards } from "./users.controller.js";
import { format, offset } from "@formkit/tempo";
import Sequelize from "sequelize";
import axios from "axios";

// import request from "request"

const lobby = db.lobby;
const userLobbies = db.userLobbies;
const user = db.user;

export async function getTest(req, res) {
        try {
            const tasksPermanent = db.tasksPermanent;
            let chatId = req.body.chat_id;
            let userId = req.body.user_id;

            tasksPermanent.findAll().then(item => {
                res.status(200).send(item);
            })
        }

            // async checkUserSubscribtion(){
            //     await axios({
            //         method: "post",
            //         url: `https://api.telegram.org/bot6754478339:AAFFdocjoCL-r6D7a0WvaexJe1pZdRlximI/getChatMember`,
            //         data: {
            //             "chat_id": "@tarac_test",
            //             "user_id": "906308044"     
            //         }
            //     })
            //     .then((response) => {

            //         console.log(response);               
            //     })
            //     .catch((error) => console.log(error));
            // },

            // task.findOne({
            //     include: [{
            //         model: levelTasks,
            //         include: [{
            //             model: level,
            //             where: {
            //                 id: 1
            //             }
            //         }]

            //     }],

            // }).then(result => {
            //     res.status(200).send(result);
            // })
        //   console.log(__dirname);

        //   res.download(fileName);
        //   res.status(200).send("data");
         catch (e) {
            // возможно, исключение-таки стоит обработать, вернув статус 500, например
        }
      }


export async function checkConnectionSpeed(req, res) {
        try {
          const fileName = "/var/www/fenoty/data/www/service-back.fenoty.ru/storage/speedTest.png"
          res.download(fileName);
        } catch (e) {
            // возможно, исключение-таки стоит обработать, вернув статус 500, например
        }
}
    


// параметры: id = телеграм пользователя, limit = количество лооби, offset = шаг пагинации
export function getLobbies(req, res) {
    try {
        console.log("2", req.body); 
        const team = db.team;
        user.findOne({
            include: [
                {
                    model: userLobbies,
                    include: [
                        {
                            model: lobby,
                        },
                    ],
                    limit: req.body.limit,
                    offset: req.body.offset * req.body.limit,
                    order: [
                        ['id', 'DESC'],
                    ],
                },
            ],
            where: {
                tg_id: req.body.id,
            },
        }).then(async (item) => {
            const userData = item.dataValues;
            const userLobbyData = userData.user_lobbies;
            const data = {
                currentUser: userData.tg_id,
            };

            let lobbies = [];
            let opponents = [];
            let opponentsID = new Set();

            userLobbyData.forEach((userLobby) => {
                const lobby = userLobby?.dataValues?.lobby?.dataValues;
                if (lobby) {
                    lobbies.push(lobby);
                    if (lobby.second_user && lobby.first_user == req.body.id) {
                        opponentsID.add(lobby.second_user);
                    } else if (lobby.second_user) {
                        opponentsID.add(lobby.first_user);
                    }
                }
            });
            console.log("3", req.body); 
            await user
                .findAll({
                    include: [
                        {
                            model: team,
                        },
                    ],
                    where: {
                        tg_id: [...opponentsID],
                    },
                })
                .then((entities) => {
                    entities.forEach((entity) => {
                        const {
                            tg_id,
                            tg_username,
                            tg_name,
                            tg_surname,
                            balance,
                            friend_id,
                            friend_reward,
                        } = entity.dataValues;
                        const team = entity.dataValues.team.dataValues;
                        opponents.push({ tg_id, tg_username, tg_name, team });
                    });
                    data.lobbies = lobbies;
                    data.opponents = opponents;
                });

            res.status(200).send(data);
        });
    } catch (e) {
        res.status(401).send("401: Ошибка!");
    }
}

// параметры: id = телеграм пользователя, first_score = очки пользователя
export function setLobby(req, res) {
    try {
        console.log("111", req.body);
        lobby
            .create({
                first_user: req.body.id,
                first_score: req.body.first_score,
            })
            .then((item) => {
                const data = {
                    lobby_id: item.dataValues.id,
                    user_id: req.body.id,
                };
                setUserLobbies(data);
            })
            .then((item) => {
                res.status(200).send("Лобби создано");
            });
    } catch (e) {
        res.status(401).send("401: Ошибка!");
    }
}

function setUserLobbies(item) {
    try {
        userLobbies.create({
            user_id: item.user_id,
            lobby_id: item.lobby_id,
        });
    } catch (e) {
        throw e;
    }
}

// вернуть обьект лобби
// параметры: id = идентификатор лобби, user_id = телеграым пользователя, second_score = очки пользователя
export async function addUserToLobby(req, res) {
    try {
        console.log("112", req.body);
        let winnerData = {};
        await lobby
            .findOne({
                where: {
                    id: req.body.id,
                },
            })
            .then((item) => {
                const firstScore = item.dataValues.first_score;
                const secondScore = req.body.second_score;
                if (firstScore > secondScore) {
                    winnerData = {
                        winnerId: item.dataValues.first_user,
                        winnerScore: firstScore + secondScore,
                    };
                } else if (firstScore < secondScore) {
                    winnerData = {
                        winnerId: req.body.user_id,
                        winnerScore: firstScore + secondScore,
                    };
                } else {
                    winnerData = {
                        winnerId: null,
                        winnerScore: secondScore,
                        firstPlayer: item.dataValues.first_user,
                        secondPlayer: req.body.user_id,
                    };
                }
                return item;
            })
            .then((item) => {
                const data = {
                    lobby_id: item.dataValues.id,
                    user_id: req.body.user_id,
                };
                setUserLobbies(data);
            });
        await lobby
            .update(
                {
                    second_user: req.body.user_id,
                    second_score: req.body.second_score,
                    winner_id: winnerData?.winnerId,
                },
                { where: { id: req.body.id } }
            )
            .then(async (item) => {
                if (winnerData.winnerId) {
                    await setFriendsRewards(winnerData.winnerId, winnerData.winnerScore);
                }
                await res.status(200).send("Пользователь добавлен");
            })
            .catch((err) => {
                console.log(err);
            });
    } catch (e) {
        res.status(401).send(e);
    }
}

export async function getLobbyStat(req, res) {
    try {
        console.log("211", req.query);
        lobby
            .findAll({
                include: [
                    {
                        model: userLobbies,
                        include: [
                            {
                                model: user,
                            },
                        ],
                        where: {
                            user_id: req.query.id,
                        },
                    },
                ],
            })
            .then((item) => {
                const data = {
                    totalLobbies: item.length,
                    totalScore: 0,
                    lobbyList: [],
                    existLobby: false
                };
                if (item) {
                    item.forEach((step) => {
                        const currentLobby = step.dataValues;
                        if (!currentLobby.reward_accepted) {
                            if (currentLobby.winner_id == req.query.id) {
                                data.lobbyList.push(currentLobby.id)
                                data.totalScore +=
                                    currentLobby.first_score +
                                    currentLobby.second_score;
                            } else if (
                                !currentLobby.winner_id &&
                                currentLobby.second_score
                            ) {
                                if (currentLobby.first_user = req.query.id) {
                                    data.lobbyList.push(currentLobby.id)
                                } else if (currentLobby.second_user = req.query.id && !currentLobby.second_reward_accepted) {
                                    data.lobbyList.push(currentLobby.id)
                                }

                                data.totalScore += currentLobby.first_score;
                            }
                        }
                    });                    
                }

                console.log("erer" , data);
                res.status(200).send(data);
            });
    } catch (e) {
        res.status(200).send("Ошибка");
    }
}

// массив-лобби и телега
export async function getWinnersReward(req, res) {
    if (!req?.query?.lobbyList) return;

    console.log("winnerReward", req.query); 
    let winnerData = {
        winnerId: req.query.id,
        winnerScore: 0,
    };
    let lobbyList = []
    lobby
        .findAll({
            include: [
                {
                    model: userLobbies,
                    include: [
                        {
                            model: user,
                        },
                    ],
                    where: {
                        user_id: req.query.id,
                    },
                },
            ],
            where: {
                id: [...req.query.lobbyList],
            },
        })
        .then((item) => {
            // res.status(200).send(item);
            item.forEach((step) => {
                const currentLobby = step.dataValues;
                const firstScore = currentLobby.first_score;
                const secondScore = currentLobby.second_score;
                if (!currentLobby.winner_id && currentLobby.second_user) {
                    if (currentLobby.first_user == req.query.id && !currentLobby.reward_accepted) {
                        winnerData.winnerScore += secondScore;
                        lobby.update({ reward_accepted: true }, {
                            where: {
                                id: currentLobby.id,
                            },
                        }) 
                    } else if (currentLobby.second_user == req.query.id && !currentLobby.second_reward_accepted) {
                        winnerData.winnerScore += secondScore;
                        lobby.update({ second_reward_accepted: true }, {
                            where: {
                                id: currentLobby.id,
                            },
                        }) 
                    }
                    
                } else if (!currentLobby.reward_accepted && currentLobby.winner_id == req.query.id) {
                    winnerData.winnerScore += secondScore + firstScore;
                    lobbyList.push(currentLobby.id)

                }
            });
            if (winnerData.winnerScore) {
                winnersReward(winnerData);
                lobby.update({ reward_accepted: true }, {
                            where: {
                                id: lobbyList,
                            },
                        })
                    .then((item) => {
                        res.status(200).send("Баланс добавлен " + winnerData.winnerScore);
                    });                
            } else {
                res.status(200).send("Баланс нулевой " + winnerData.winnerScore);
            }

        });
}

function winnersReward(data) {
    try {
        console.log("4", data.winnerId); 
        user.findOne({
            where: {
                tg_id: data.winnerId,
            },
        }).then((winner) => {
            let winnerReward = data.winnerScore + winner.dataValues.balance;
            user.update({ balance: winnerReward }, {
                    where: {
                        tg_id: data.winnerId,
                    },
                }
            );    
        });
    } catch (e) {
        throw e;
    }
}


export function searchExistLobby(req, res) {
    try {
        lobby
            .findOne({
                where: {
                    second_user: null,
                    first_user: { [Op.ne]: req.query.id },
                },
            })
            .then((item) => {
                if (item) {
                    const id = item.dataValues.id;
                    res.status(200).send({ id });
                    // setLobby(id, first_score);
                } else {
                    res.status(200).send(false);
                    // addUserToLobby(id, user_id, second_score);
                }
            });
    } catch (e) {
        res.status(401).send("401: Ошибка!");
    }
}
