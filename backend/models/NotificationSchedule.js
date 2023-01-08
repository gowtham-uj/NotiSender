const sequelize = require("../configs/db.js");

const { Sequelize, DataTypes, Model } = require("sequelize");

class NotificationSchedule extends Model {}

NotificationSchedule.init(
  {
    notification_id: {
      type: DataTypes.STRING
    },
    template_name: {
      type: DataTypes.STRING
    },
    notification_status: {
      type: DataTypes.STRING
    },
    template_data: {
      type: DataTypes.JSON
    },
    notification_scheduled_on: {
      type: DataTypes.STRING 
      // the time notification schedule has been registered.
    },
    notification_sending_time: {
      type: DataTypes.STRING
      // the sending time of the notification
    },
    email_group_id: {
      type: DataTypes.STRING
    }
  },
  {
    sequelize,
    modelName: "NotificationSchedule",
  }
);

module.exports = NotificationSchedule;


/*
sendNotificationNow: will send the notification immediately
scheduleNotification: will schedule the notification for future time.



*/