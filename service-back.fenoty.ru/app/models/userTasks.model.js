export default  (sequelize, Sequelize) => {
    const UserTasks = sequelize.define("user_tasks", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      user_id: {
        type: Sequelize.BIGINT
      },
      task_id: {
        type: Sequelize.INTEGER
      },
      is_per_level: {
        type: Sequelize.BOOLEAN,
      },
      task_active: {
        type: Sequelize.BOOLEAN,
        defaultValue: 1
      },
    },
  );
  
    return UserTasks;
  };