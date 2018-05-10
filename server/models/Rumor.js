module.exports = function (sequelize, DataTypes) {

  const Rumor = sequelize.define('rumor', {
    body: {type: DataTypes.STRING},
    points: {type: DataTypes.INTEGER, defaultValue: 0},
    user_id: {type: DataTypes.INTEGER, allowNull: true},
    offensive: {type: DataTypes.INTEGER, defaultValue: 0},
    flag_one: {type: DataTypes.INTEGER, defaultValue: null},
    flag_two: {type: DataTypes.INTEGER, defaultValue: null},
    flag_three: {type: DataTypes.INTEGER, defaultValue: null}
  }, {
    tableName: 'rumors'
  });

  Rumor.associate = function (models) {
    Rumor.belongsTo(models.user, {
      foreignKey: 'user_id',
      as: 'user'
    });
    Rumor.belongsTo(models.user, {
      foreignKey: 'flag_one',
      as: 'flagOne'
    });
    Rumor.belongsTo(models.user, {
      foreignKey: 'flag_two',
      as: 'flagTwo'
    });
    Rumor.belongsTo(models.user, {
      foreignKey: 'flag_three',
      as: 'flagThree'
    });
  };

  return Rumor;
};