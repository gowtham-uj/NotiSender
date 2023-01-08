const fs = require("fs");

require.extensions[".html"] = function (module, filename) {
  module.exports = fs.readFileSync(filename, "utf8");
};

const { BigPromise } = require("../utils/BigPromise");
const nodeMailer = require("../configs/nodeMailer");
const Mustache = require("mustache");
const cron = require("node-cron");
const TemplateDetail = require("../models/TemplateDetail");
const isDeepEqual = require("../utils/isDeepEqual");
const dateToCronExp = require("../utils/dateToCronExp");
const Email = require("../models/Email");

const NotificationSchedule = require("../models/NotificationSchedule");

// const PPTemplate = require("../mail-templates/privacy-policy/index.html");

const scheduleGroupNotifications = BigPromise(async (req, res, next) => {
  let body = req.body;
  let timeToSend = new Date(body.timeToSend);
  if (!body.templateDetails.name || !body.templateDetails.fields) {
    res.status(200).json({
      success: false,
      msg: "please provide the template details",
    });
  }

  const templateDetails = await TemplateDetail.findOne({
    where: {
      template_name: body.templateDetails.name,
    },
  });

  if (!templateDetails) {
    res.status(200).json({
      success: false,
      msg: "please provide the valid template name",
    });
  }

  if (
    !isDeepEqual(
      Object.keys(body.templateDetails.fields),
      templateDetails.fields
    )
  ) {
    // console.log(body.templateDetails.fields);
    // console.log(templateDetails.fields);

    res.status(200).json({
      success: false,
      msg: "please provide the valid template fields",
    });
  }

  let emailGroup = await Email.findAll({
    where: {
      group_name: body.group_name,
    },
  });

  if (emailGroup.length === 0) {
    res.status(200).json({
      success: false,
      msg: "please provide the valid group name",
    });
  }

  const templateFile = require(`../mail-templates/${body.templateDetails.name}/${body.templateDetails.name}.html`);

  const rendered = Mustache.render(templateFile, body.templateDetails.fields);

  let extractedEmailsArr = [];

  // console.log(JSON.parse(JSON.stringify(emailGroup)));
  for (let index = 0; index < emailGroup.length; index++) {
    const element = emailGroup[index];
    extractedEmailsArr.push(element.email);
  }

  let mailDetails = {
    from: body.notification.from, // sender address
    to: extractedEmailsArr, // list of receivers
    subject: body.notification.subject, // Subject line
    html: rendered,
  };

  let add_minutes = function (dt, minutes) {
    return new Date(dt.getTime() + minutes * 60000);
  };

  let notificationRecord = {
    notification_id: short.generate(),
    template_name: body.templateDetails.name,
    notification_status: "scheduled",
    template_data: JSON.stringify(body.templateDetails.fields),
    notification_scheduled_on: new Date().toString(),
    notification_sending_time: "null",
    email_group_id: "null",
  };

  await NotificationSchedule.create(notificationRecord);

  cron.schedule(dateToCronExp(timeToSend), async function () {
    await nodeMailer.sendMail(mailDetails);

    let updatedNotificationRecord = await NotificationSchedule.findOne({
      where: {
        notification_id: notificationRecord.notification_id,
      },
    });

    updatedNotificationRecord.notification_status = "sent";
    updatedNotificationRecord.notification_sending_time = timeToSend;

    await updatedNotificationRecord.save();
    // await NotificationSchedule.create(notificationRecord);
  });

  res.status(200).json({
    success: true,
  });
});

module.exports = scheduleGroupNotifications;
