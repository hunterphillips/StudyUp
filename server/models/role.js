'use strict';
module.exports = (sequelize, DataTypes) => {
  var Role = sequelize.define(
    'Role',
    {
      title: DataTypes.STRING
    },
    { tableName: 'roles', timestamps: false }
  );
  Role.associate = function(models) {
    Role.hasMany(models.User, {
      foreignKey: 'role_id',
      constraints: false
    });
  };
  return Role;
};
