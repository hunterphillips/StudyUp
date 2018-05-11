'use strict';
module.exports = (sequelize, DataTypes) => {
  var Match = sequelize.define(
    'Match',
    {
      challenger_id: DataTypes.INTEGER,
      opponent_id: DataTypes.INTEGER
    },
    { tableName: 'matches' }
  );
  Match.associate = function(models) {
    Match.belongsToMany(models.User, {
      through: 'user_matches'
    });
    Match.belongsTo(models.Quiz, {
      foreignKey: 'quiz_id',
      constraints: false
    });
  };
  return Match;
};
