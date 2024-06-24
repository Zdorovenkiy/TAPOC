export default  (sequelize, Sequelize) => {
    const DailyReward = sequelize.define("daily_rewards", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      reward: {
        type: Sequelize.INTEGER
      },
    });
  
    return DailyReward;
  };