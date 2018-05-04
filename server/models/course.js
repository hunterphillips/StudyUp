'use strict';
module.exports = (sequelize, DataTypes) => {
  var Course = sequelize.define(
    'Course',
    {
      title: DataTypes.STRING
    },
    { tableName: 'courses', timestamps: false }
  );
  Course.associate = function(models) {
    Course.belongsToMany(models.User, {
      through: 'user_courses'
    });
  };
  return Course;
};
