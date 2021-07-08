'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Collection extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.users,{
        foreignKey: "user_id",
        as: "user"
      })

      this.hasMany(models.tasks,{
        foreignKey: "collection_id",
        as: "task",
        onDelete: 'CASCADE'
      })
    }
  };
  Collection.init({
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    name: DataTypes.STRING,
    color: DataTypes.STRING,
    user_id: DataTypes.STRING
  }, {
    sequelize,
    freezeTableName: true,
    modelName: 'collections',
  });
  return Collection;
};