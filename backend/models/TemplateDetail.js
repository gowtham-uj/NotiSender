const sequelize = require("../configs/db.js");

const { Sequelize, DataTypes, Model } = require("sequelize");

class templateDetail extends Model {}

templateDetail.init(
  {
    template_name: {
      type: DataTypes.STRING,
    },
    fields: {
      type: DataTypes.JSON,
    },
  },
  {
    sequelize,
    modelName: "templateDetail",
  }
);

module.exports = templateDetail;

/*
create an object of the group names and and group id and all the emails that are going to store should have a group name and group id attached to it.

identify the group of the emails using the group id or group name


*/
