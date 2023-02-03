'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class company extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      company.hasOne(models.score, {
        foreignKey: 'idScore',
      });
    }
  }
  company.init({
    id: {
      type:DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },
    name: DataTypes.STRING,
    tags: DataTypes.ARRAY(DataTypes.STRING)    ,
    ceo: DataTypes.STRING,
    address: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'company',
  });
  return company;
};