'use strict';
module.exports = (sequelize, DataTypes) => {
  var Answer = sequelize.define(
    'Answer',
    {
      description: DataTypes.STRING
    },
    { tableName: 'answers', timestamps: false }
  );
  Answer.associate = function(models) {
    Answer.belongsTo(models.Question, {
      foreignKey: 'question_id',
      constraints: false
    });
  };
  return Answer;
};
