'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Task extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.collections,{
        foreignKey: "collection_id",
        as: "collection",
        onDelete: 'CASCADE'
      })

      this.belongsTo(models.users,{
        foreignKey: "user_id",
        as: "user"
      })
    }
  };
  Task.init({
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    name: DataTypes.STRING,
    isCompleted: DataTypes.BOOLEAN,
    user_id: DataTypes.STRING,
    collection_id: DataTypes.STRING,
    dueDate: DataTypes.STRING
  }, {
    sequelize,
    freezeTableName: true,
    modelName: 'tasks',
  });
  return Task;
};