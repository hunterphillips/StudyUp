'use strict';
module.exports = (sequelize, DataTypes) => {
  var Question = sequelize.define(
    'Question',
    {
      answer_id: DataTypes.INTEGER,
      description: DataTypes.STRING
    },
    { tableName: 'questions', timestamps: false }
  );
  Question.associate = function(models) {
    Question.belongsTo(models.Quiz, {
      foreignKey: 'quiz_id',
      constraints: false
    });
    Question.hasMany(models.Answer, {
      foreignKey: 'question_id',
      constraints: false
    });
  };
  return Question;
};
