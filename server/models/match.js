'use strict';
module.exports = (sequelize, DataTypes) => {
  var Match = sequelize.define('Match', {}, { tableName: 'matches' });
  Match.associate = function(models) {
    Match.hasMany(models.User, {
      foreignKey: 'match_id',
      constraints: false
    });
    Match.belongsTo(models.Quiz, {
      foreignKey: 'quiz_id',
      constraints: false
    });
  };
  return Match;
};
