module.exports = (sequelize, Sequelize) => {
  const LogRequest = sequelize.define(
    "LogRequest",
    {
      // I don't want createdAt
      ip: {
        type: Sequelize.STRING,
      },
      endpoint: {
        type: Sequelize.STRING,
      },
    },
    {
      updatedAt: false,
    }
  );

  return LogRequest;
};
