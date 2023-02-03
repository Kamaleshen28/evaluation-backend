'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class score extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      score.belongsTo(models.company, {
        foreignKey: 'idScore',
        onDelete: 'CASCADE'
      });
    }
  }
  score.init({
    idScore: {
      type:DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },    score: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'score',
  });
  return score;
};