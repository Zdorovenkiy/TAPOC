import { where } from "sequelize";
import db from "../utils/db.js";
import { format } from "@formkit/tempo"
import axios from "axios";

const user = db.user;
const level = db.level;
const userTasks = db.userTasks;

export async function checkTelegramSubscription(req, res) {
    let chatId = req.body.chat_id;
    let userId = req.body.user_id;

    await axios({
        method: "post",
        url: `https://api.telegram.org/bot6754478339:AAFFdocjoCL-r6D7a0WvaexJe1pZdRlximI/getChatMember`,
        data: {
            "chat_id": chatId,
            "user_id": userId    
        }
    })
    .then(async (response) => {
        console.log(response); 
        if (response.data.result.status != 'left' &&  response.data.result.status != 'kicked') {
                res.status(200).send(true);
        } else {
            res.status(200).send(false);
        }
        console.log(response);               
    })
    .catch((error) => console.log(error));
} 

export function changeTaskStatus(req, res) {
    const userTasks = db.userTasks;
    userTasks.update({ task_active: false }, {
        where: {
            user_id: req.body.userId,
            task_id: req.body.taskId,
            is_per_level: req.body.isLevel,
        }    
    }).then(item => {
        res.status(200).send("Задание выполнено");
    })
}


export function getLevelTasks(req, res) {
    try {
        const userTasks = db.userTasks;
        const tasksPerLevel = db.tasksPerLevel;
        userTasks.findAll({
            include:[{
                model: tasksPerLevel
            }],
            where: {
                user_id: req.query.id,
                is_per_level: true
            }
        }).then(item => {
            res.status(200).send(item);
        })        
    } catch (e) {
        res.status(401).send('401: Ошибка!,');
    }
}  

export function getPermanentTasks(req, res) {
    try {
        const userTasks = db.userTasks;
        const tasksPermanent = db.tasksPermanent;
        userTasks.findAll({
            include:[{
                model: tasksPermanent
            }],
            where: {
                user_id: req.query.id,
                is_per_level: false
            }
        }).then(item => {
            res.status(200).send(item);
        })        
    } catch (e) {
        res.status(401).send('401: Ошибка!,');
    }
}  

// параметры: id = телеграм друга,  limit = количество лооби, offset = шаг пагинации
export function getFriends(req, res) {
    try {
        console.log("fr2" , req.body);
        const team = db.team
        user.findAll({
            include:[{
                model: team
            }],
            limit: req.body.limit,
            offset: req.body.offset * req.body.limit,
            where: {
                friend_id: req.body.id 
            }
        }).then(item => {
            res.status(200).send(item);
        })        
    } catch (e) {
        res.status(401).send('401: Ошибка авторизации!');
    }
}  

export function getFriendStat(req, res) {
    try {
        console.log("fr3" , req.query);
        if (!req.query.id) {
            res.status(401).send('401: Ошибка !');
            return;
        }

        const team = db.team
        user.findAll({  
            include:[{
                model: team 
            }],
            where: {
                friend_id: req.query.id
            } 
        }).then(item => {
            // if (item.length > 1) {
                // console.log(item);
                const data = {
                    totalFriends: item.length, 
                    totalBonus: 0,
                };            
                item.forEach((step) => {
                    const currentfriend = step.dataValues;
                    data.totalBonus += currentfriend.friend_reward
                });
                res.status(200).send(data);
            // }
           
        })        
    } catch (e) {
        res.status(401).send('401: Ошибка авторизации!');
    }
}  

// параметры: id = телеграм пользователя
export function userLevelUp(req, res) {
    try {
        console.log("5", req.body);
        user.findOne({
            include: [{
                model: level
            }],
            where: {
                tg_id: req.body.id,
            },  
        }).then(item => {
            const level = db.level;
            level.findOne({
                where: {
                    id: item.dataValues.level_id + 1,
                },  
            })
            .then(lvl => {
                const currentLimit = item.dataValues.level.dataValues.limits;
                if (lvl) {
                    console.log("6", req.body);
                    user.update({
                        level_id: ++item.dataValues.level_id,
                        balance: item.dataValues.balance - (currentLimit / 2)
                    }, {
                        where: {
                            tg_id: req.body.id,
                        },
                    }).then(item => {
                        res.status(200).send('Уровень повышен!');
                    })                    
                } else {
                    
                    let currentTask = item.dataValues.level.dataValues.task_id;

                    const round = (a, b) => Math.round(a/b)*b
                    let multiplier = 1.5
                    let value = currentLimit * multiplier
                    let rounded = Math.pow(10, value.toString().length - 1)
                    
                    level.create({
                        limits: round(value, rounded),
                        task_id: ++currentTask,
                    }).then(result => {
                        console.log("7", req.body);
                        user.update({
                            level_id: ++item.dataValues.level_id,
                            balance: item.dataValues.balance - (currentLimit / 2)
                        }, {
                            where: {
                                tg_id: req.body.id,
                            },
                        }).then(item => {
                            res.status(200).send('Уровень добавлен!');
                        })  
                    });                    
                } 
            })
        })       
    } catch (e) {
        console.log(e);
        res.status(401).send(e);
    }
  }

export function getLevelLimit(req, res) {
    console.log("levelLimit", req.query);
    try {
        const level = db.level;
        level.findOne({
            include: [{
                model: user,
                where: {
                    tg_id: req.query.id,
                },  
            }],
        }).then(item => {
            console.log("5", req.query.id);
                res.status(200).send({limit: item?.dataValues?.limits});
            })      
    } catch (e) {
        res.status(401).send('401: Ошибка авторизации!');
    }
  }

// параметры: id = телеграм пользователя
export function checkAuth(req, res) {
  try { 
    console.log("9", req.query);
      user.findOne({
          where: {
              tg_id: req.query.id,
          },
      }).then(async (item) => {
          if (item) {
            checkDailyReward(item);
            res.status(200).send('Успешная авторизация');
          }
          else{
            res.status(401).send('401: Ошибка авторизации!');
          }
      });
  } catch (e) {
      res.status(500).send(e);
  }
}

// параметры: id = телеграм пользователя
export function getUserTeam(req, res) {
    try {
        console.log("10", req.query);
        const team = db.team;
        team.findOne({
            include: [{
                    model: user,
                    attributes: [],
                    where: {
                        tg_id: req.query.id,
                    },
                },
            ],
        }).then((item) => {
            res.status(200).send(item);
        });
    } catch (e) {
        res.status(500).send({ message: e });
    }
}

// параметры: id = телеграм пользователя
export function getUser(req, res) {
    try {
        console.log("15, " ,req.query);
        user.findOne({
            where: {
                tg_id: req.query.id,
            },
        }).then(async (item) => {
            res.status(200).send(item);
        });
    } catch (e) {
        res.status(500).send({ message: e });
    }
}

// параметры: id = телеграм пользователя, team_id = новая команда
export async function changeUserTeam(req, res) {
    try {
        console.log("14, " ,req.body);
        const newTeam = req.body.team_id
        await user.update({ team_id: newTeam }, {
                where: {
                    tg_id: req.body.id,
                },
            }
        ).then( (item) => {
            res.status(200).send(item);
        })
    } catch (e) {
        res.status(500).send({ message: e });
    }
}

// параметры: id = телеграм пользователя, balance = новый баланс
export async function setUserBalance(req, res) {
    try {
        console.log("17, " ,req.body);
        let newBalance = req.body.balance
        await user.findOne({
            where: {
                tg_id: req.body.id,
            },
        }).then(item => {
            newBalance +=  item.dataValues.balance;
        })
        console.log("18, " ,req.body);
        await user.update({ balance: newBalance }, {
                where: {
                    tg_id: req.body.id,
                },
            }
        ).then((item) => {
            res.status(200).send(true);
        })
    } catch (e) {
        res.status(500).send({ message: e });
    }
}

// параметры: id = телеграм друга
export async function friendsResetReward(req, res) {
    try {
        console.log("fr1" , req.body);
        await user.update({friend_reward: 0}, {
                where: {
                    friend_id: req.body.id,
                },
        }).then(item => {
            res.status(200).send(item);
        })
    } catch (e) {
        res.status(500).send({ message: e });
    }
}

export async function setUser(req, res) {
    try {
        const rating = db.rating;
        const tasksPermanent = db.tasksPermanent;
        const userTasks = db.userTasks;
        const levelTasks = db.levelTasks;
        let haveUser = await checkUser(req);
        let date = new Date();
        let currentDate = format(date, "YYYY-MM-DD", "en")
        if (!haveUser) {
            const newUser = req.body;
            await user.create({
                tg_id: newUser.id,
                tg_username: newUser.username,
                tg_name: newUser.first_name,
                tg_surname: newUser.last_name,
                team_id: newUser.team_id,
                language_code: newUser.language_code,
                friend_id: newUser.friend_id,
                friend_reward: newUser.friend_reward,
                daily_id: 1,
                last_session: currentDate,
            })

            await rating.create({
                user_id: newUser.id,
            });

            await tasksPermanent.findAll().then(item => {
                console.log("CHEHHHHHHHHHHHHHHHHHHHH",item);
                item.forEach(task => {
                    userTasks.create({
                        user_id: newUser.id,
                        task_id: task.dataValues.id,
                        is_per_level: false
                    })                   
                })
            });

            await levelTasks.findAll({
                where: {
                    level_id: 1
                }
            }).then(item => {
                console.log(item);
                item.forEach(task => {
                    userTasks.create({
                        user_id: newUser.id,
                        task_id: task.dataValues.task_id,
                        is_per_level: true
                    })                   
                })
                res.status(200).send("Аккаунт зарегистрирован");
            })

        } else {
            res.status(409).send("409: Аккаунт уже зарегистрирован");
        }
    } catch (e) {
        res.status(500).send({ message: e });
    }
}

// параметры: id = телеграм пользователя
export function userDailyReward(req, res) {
    try {
        const dailyReward = db.dailyReward;
        console.log("19, " ,req.body);
        dailyReward.findOne({
            include: [{
                    model: user,
                    where: {
                        tg_id: req.body.id,
                    },
                },
            ],
        }).then(item => {
            let reward = item.dataValues.reward + item.user.dataValues.balance;
            let reward_id = item.user.dataValues.daily_id;

            user.update({ 
                balance: reward,
                daily_id: reward_id,
                daily_accepted: 1,
                }, {
                    where: {
                        tg_id: item.user.dataValues.tg_id,
                    },
                }).then(result => {
                    res.status(200).send("Награда добавлена");
                })
            })                
        } catch (e) {
            res.status(401).send('401: Ошибка авторизации!');
        }
    }
    
// параметры: id = телеграм пользователя
async function checkUser(req) {
        try {
            console.log("20, " ,req.body);
            return await user.findOne({
                where: {
                    tg_id: req.body.id,
                },
            })
              .then((item) => {
                  return item ? true : false;
                });
            } catch (e) {
                return { message: e };
      }
}

function checkDailyReward(item) {
    try {
        const date = new Date(2024, 6, 26);
        const currentDate = format(date, "YYYY-MM-DD", "en")
        const oldDate = new Date(item.last_session).getDate()
        const daysFromLast = date.getDate() - oldDate;
        let reward = item.daily_id;
        if (daysFromLast > 1 || (daysFromLast === 1 && !item.daily_accepted)) {
            reward = 1; 
            item.daily_accepted = false;
        } else if ((daysFromLast === 1 && item.daily_accepted)) {
            item.daily_accepted = false;
            reward++
        }

        user.update({ 
                daily_id: reward,
                // daily_accepted: item.daily_accepted,
                last_session: currentDate,
            }, {
                where: {
                    tg_id: item.tg_id,
                },
            })
    } catch (e) {
        throw e;
    }
  }


export function getDailyRewards(req, res) {
    try {
        const dailyReward = db.dailyReward;
        dailyReward.findAll().then(item => {
            res.status(200).send(item);
        })
    } catch (e) {
        res.status(500).send({ message: e });
    } 
}

// параметры: tg_id = телеграм пользователя, score = очки после игры
export function setFriendsRewards( id, score) {
    try {
        console.log("21, " , id);
        const rewardProcent = score / 100;
        user.findOne({
            where: {
                tg_id: id
            }     
        }).then (item => {
            const reward = item.dataValues.friend_reward + rewardProcent;
            user.update({friend_reward: reward}, {
                where: {
                    tg_id: id
                }
            })

            return;
        })
    } catch (e) {
        throw e
    } 
}