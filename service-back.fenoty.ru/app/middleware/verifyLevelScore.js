import db from "../utils/db.js";

const user = db.user;
const level = db.level;

export function verifyLevelScore(req, res,  next) {
    try {
        level.findOne({
            include: [{
                model: user,
                where: {
                    tg_id: req.body.id,
                },
            }],
        }).then(item => {
            const limit = item.dataValues.limits;
            const balance = item.dataValues.user.dataValues.balance;
            if (limit > balance) {
                console.log(balance);
                res.status(407).send('Недостаточно средств');
            } else {
                console.log(balance);
                next();
            }
            
        })     
    } catch (e) {
        res.status(400).send('Ошибка!');
    }
  }