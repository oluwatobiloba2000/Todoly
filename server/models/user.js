'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.collections, 
        {
          as: 'collection',
          foreignKey:'user_id',
          onDelete: 'CASCADE'
      })

      this.hasMany(models.tasks, 
        {
          as: 'task',
          foreignKey:'user_id',
          onDelete: 'CASCADE'
      })

    }
  };
  User.init({
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    tokenId: DataTypes.STRING
  }, {
    sequelize,
    freezeTableName: true,
    modelName: 'users',
  });
  return User;
};