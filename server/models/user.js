'use strict';
module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define(
    'User',
    {
      username: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING
    },
    { tableName: 'users' }
  );
  User.associate = function(models) {
    User.belongsTo(models.Role, {
      foreignKey: 'role_id',
      constraints: false
    });
    // User.hasMany(models.Movie, {
    //   foreignKey: 'user_id'
    // });
  };
  return User;
};
