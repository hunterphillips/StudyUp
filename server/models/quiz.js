'use strict';
module.exports = (sequelize, DataTypes) => {
  var Quiz = sequelize.define(
    'Quiz',
    {
      title: DataTypes.STRING
    },
    { tableName: 'quizzes', timestamps: false }
  );
  Quiz.associate = function(models) {
    Quiz.belongsTo(models.Course, {
      foreignKey: 'course_id',
      constraints: false
    });
  };
  return Quiz;
};
