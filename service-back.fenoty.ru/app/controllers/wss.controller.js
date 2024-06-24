import db from "../utils/db.js";
import { Op } from "@sequelize/core";
import { format} from "@formkit/tempo";
import Sequelize from "sequelize";

const lobby = db.lobby;
const userLobbies = db.userLobbies;
const user = db.user;
const rating = db.rating;
const team = db.team;


// параметры: id = телеграм пользователя
export function updateUserStat(req, socket) {
    const dateCurrent = new Date();
    const currentDate = format(dateCurrent, "YYYY-MM-DD", "en")
    const dateWeekAgo = new Date(dateCurrent.setDate(dateCurrent.getDate() - 7));
    const weekAgoDate = format(dateWeekAgo, "YYYY-MM-DD", "en")
    user.findOne({
        include: [{
            model: userLobbies,
            include: [{
                model: lobby,
            }],
            where: {
                created_at: {
                    [Op.between]: [weekAgoDate, currentDate] 
                }
            }
        }],
        where: {
            tg_id: req.id
        }
    }).then(result => {
        if (result) {
            console.log("TEEEEEEEEEEEEEEEEEEST", result);
            const lobbies = result.dataValues.user_lobbies;
            const data = {
                totalGames: lobbies.length,
                gamesWon: 0,
                gamesLose: 0,
                gamesScore: 0
            }
            lobbies.forEach(userLobby => {
                if (userLobby.dataValues.lobby != null) {
                    let winner = userLobby.dataValues.lobby.winner_id;
                    let secondUser = userLobby.dataValues.lobby.second_user;
                    let firstScore = userLobby.dataValues.lobby.first_score;
                    let secondScore = userLobby.dataValues.lobby.second_score;

                    if (winner && winner == req.id) {
                        data.gamesWon++
                        data.gamesScore += firstScore + secondScore;
                    } else if (winner) {
                        data.gamesLose++
                    } else if (!winner && secondUser) {
                        data.gameScore += firstScore;
                    }  
                }            
            })
            rating.update({
                victories: data.gamesWon,
                loses: data.gamesLose,
                total: data.totalGames,
                scores: data.gamesScore
            } ,{
                where: {
                    user_id: req.id,
                }
            })            
        }

        // socket.emit('updateStat', data);
    })
}  

// параметры: id = идентификатор лобби
export function updateAfterGameStat(id, socket) {
    lobby.findOne({
        where: {
            id: id
        }
    }).then(async result => {
        let winner = result.dataValues.winner_id;
        let firstUser = result.dataValues.first_user;
        let secondUser = result.dataValues.second_user;
        let firstScore = result.dataValues.first_score;
        let secondScore = result.dataValues.second_score;
        if (winner && winner == firstUser) {
            await rating.increment({
                victories: 1,
                total: 1,
                scores: firstScore + secondScore
            }, {
                where: {
                    user_id: firstUser
                }
            })

            await rating.increment({
                loses: 1,
                total: 1,
            }, {
                where: {
                    user_id: secondUser
                }
            })
        } else if (winner && winner == secondUser) {
            await rating.increment({
                victories: 1,
                total: 1,
                scores: firstScore + secondScore
            }, {
                where: {
                    user_id: secondUser
                }
            })

            await rating.increment({
                loses: 1,
                total: 1,
            }, {
                where: {
                    user_id: firstUser
                }
            })
        } else if (!winner && secondUser) {
            await rating.increment({
                victories: 1,
                total: 1,
                scores: firstScore
            }, {
                where: {
                    user_id: [firstUser, secondUser]
                }
            })
        }  
        // socket.emit('updateStat', data);
    })
}  


// параметры: id = телеграм пользователя, limit = количество лооби, offset = шаг пагинации 
export async function getRatingsByTeam(req, socket) {
    let userTeam = {}
    await team.findOne({
        where: {
            id: req.id
        },
    }).then(item => {
        userTeam = item.dataValues;
    })

    await user.count({
        where: {
            team_id: req.id
        },
    }).then(item => {
        userTeam.totalUser = item;
    })

    return await user.findAll({
        include: [{ 
            model: rating,
            
        }],
        where: {  
            team_id: req.id 
        },
        limit: req.limit, 
        offset: req.offset * req.limit,
    }).then(item => { 
        // userTeam.totalUser = item.length;
        item.forEach(user => {
            user.dataValues.team = {...userTeam}
        })
        // console.log("qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq", item[0].dataValues.rating.dataValues);
        return item.sort((a, b) => {
            const victoryA = a.dataValues.rating.dataValues.victories;
            const victoryB = b.dataValues.rating.dataValues.victories;
            const scoreA = a.dataValues.rating.dataValues.scores;
            const scoreB = b.dataValues.rating.dataValues.scores;
            
            return victoryB - victoryA || scoreB - scoreA;
        })
    })
}

// параметры: id = телеграм пользователя, teamId = телеграм пользователя,
export async function getUserRating(req, socket) {
    console.log(Object.keys(req).length === 0);
    if (Object.keys(req).length === 0) {
        throw "Errors";
    }
    const rating = db.rating;
    let data = {}
    return await user.findAll({
        include: [{
            model: rating,
        }],
        where: {
            team_id: req.teamId
        },
    }).then(item => {
        item.forEach((user, index) => {
            if (user.dataValues.tg_id == req.id) {
                const place = index + 1;
                user.dataValues.place = place;
                data = user;
                return;
            }
        })
        return data;
    })
}

export async function getRatingFromAllTeams(socket) {
    const rating = db.rating;
    let data = []

    for (let i = 1; i <= 10; i++) {
        await rating.findAll({
            include: [{
                model: user,
                where: {
                    team_id: i
                },
            }],
        }).then(item => {
            const max = item.reduce((prev, current) => {
                // console.log(prev);
                return (prev && prev?.dataValues?.scores > current?.dataValues?.scores) ? prev : current
              }, [])
            data.push(max) 
        })   
        

}
    return data.sort((a, b) => b.victories - a.victories || b.scores - a.scores);
    // return data.sort(testSort);
          
    // }
    // return await user.findAll({
    //     include: [{
    //         model: rating,
    //     }],
    //     where: {
    //         balance: data 
    //     },  
    //     order: [  
    //         ['balance', 'DESC'],
    //     ],
    // }).then(async (item) => { 
    //     return item;
    //     // socket.emit('getRatingFromAllTeams', item);
    // })
}     