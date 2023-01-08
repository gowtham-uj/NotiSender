const sequelize = require("../configs/db.js");

const { Sequelize, DataTypes, Model } = require("sequelize");

class EmailGroup extends Model {}

EmailGroup.init(
  {
    group_id: {
      type: DataTypes.STRING,
    },
    group_name: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    modelName: "EmailGroup",
  }
);

module.exports = EmailGroup;

/*
create an object of the group names and and group id and all the emails that are going to store should have a group name and group id attached to it.

identify the group of the emails using the group id or group name


*/
