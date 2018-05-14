'use strict';
module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define(
    'User',
    {
      username: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      score: DataTypes.INTEGER
    },
    { tableName: 'users', timestamps: false }
  );
  User.associate = function(models) {
    User.belongsTo(models.Role, {
      foreignKey: 'role_id',
      constraints: false
    });
    User.belongsToMany(models.Match, {
      as: 'Matches',
      through: 'user_matches'
    });
    User.belongsToMany(models.Course, {
      as: 'Courses',
      through: 'user_courses'
    });
  };
  return User;
};
