export default  (sequelize, Sequelize) => {
    const Rating = sequelize.define("ratings", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      user_id: {
        type: Sequelize.BIGINT
      },
      victories: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      loses: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      scores: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      total: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
    });
  
    return Rating;
  };