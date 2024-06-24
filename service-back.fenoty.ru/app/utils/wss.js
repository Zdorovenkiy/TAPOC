import pkg, { WebSocketServer } from 'ws';
import { createServer } from "http";

const { Server } = pkg;

const PORT = process.env.WSS_PORT || 9190;
// const wss = new WebSocketServer ({
//     port: PORT,
// }, () => {
//     console.log(`websocket started on ${PORT}.`);
// })

// const wssInit = (app) => {
//     const server = createServer(app, function (req, res) {
//         res.write("Hello World!"); //write a response to the client
//         res.end(); //end the response]
//         console.log("started ws server");
//     });

//     const wss = new WebSocketServer( {server} );
//     wss.on('connection', (ws) => {
//         console.log('Client connected');
//         ws.on('message', (message) => {
//             console.log(`Received: ${message}`);
//             ws.send(`You sent: ${message}`);
//         });
    
//         ws.on('close', () => {
//             console.log('Client disconnected');
//         });
//     });
//     // const wss = new WebSocketServer ({
//     //     port: PORT,
//     // }, () => {
//     //     console.log(`websocket started on ${PORT}.`);
//     // })

//     // wss.on("connection", async (ws) => {
//     //     ws.send(JSON.stringify({ type: "connect", message: "wss connection successful" }));

//         ws.on("message", function (message) {
//             const msg = JSON.parse(message);
//             switch (msg.type) {
//                 case "auth":
//                     export function getTest(req, res) {
//                         const dateCurrent = new Date();
//                         const currentDate = format(dateCurrent, "YYYY-MM-DD", "en")
//                         const dateWeekAgo = new Date(dateCurrent.setDate(dateCurrent.getDate() - 7));
//                         const weekAgoDate = format(dateWeekAgo, "YYYY-MM-DD", "en")
                    
//                         user.findOne({
//                             include: [{
//                                 model: userLobbies,
//                                 include: [{
//                                     model: lobby,
//                                 }],
//                                 where: {
//                                     created_at: {
//                                         [Op.between]: [weekAgoDate, currentDate] 
//                                     }
//                                 }
//                             }],
//                             where: {
//                                 tg_id: req.body.id
//                             }
//                         }).then(result => {
//                             const lobbies = result.dataValues.user_lobbies;
//                             const data = {
//                                 totalGames: lobbies.length,
//                                 gamesWon: 0,
//                                 gamesLose: 0,
//                             }
//                             lobbies.forEach(userLobby => {
//                                 let winner = userLobby.dataValues.lobby.winner_id;
//                                 if (winner && winner == req.body.id) {
//                                     data.gamesWon++
//                                 } else if (winner) {
//                                     data.gamesLose++
//                                 }
//                             })
//                             res.status(200).send(data)
//                         })
//                     }  
//                     break;
//                 default:
//                     break;
//             }

//     //     });
//     // });

// }

// export default wssInit;