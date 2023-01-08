const fs = require("fs");

require.extensions[".html"] = function (module, filename) {
  module.exports = fs.readFileSync(filename, "utf8");
};

const { BigPromise } = require("../utils/BigPromise");
const nodeMailer = require("../configs/nodeMailer");
const Mustache = require("mustache");
const TemplateDetail = require("../models/TemplateDetail");
const isDeepEqual = require("../utils/isDeepEqual");
const short = require("short-uuid");
const NotificationSchedule = require("../models/NotificationSchedule");

// const PPTemplate = require("../mail-templates/privacy-policy/index.html");

const sendNotifications = BigPromise(async (req, res, next) => {
  let body = req.body;
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
    console.log(body.templateDetails.fields);
    console.log(templateDetails.fields);

    res.status(200).json({
      success: false,
      msg: "please provide the valid template fields",
    });
  }

  const templateFile = require(`../mail-templates/${body.templateDetails.name}/${body.templateDetails.name}.html`);

  const rendered = Mustache.render(templateFile, body.templateDetails.fields);

  let mailDetails = {
    from: body.notification.from, // sender address
    to: body.notification.toArr, // list of receivers
    subject: body.notification.subject, // Subject line
    html: rendered,
  };

  await nodeMailer.sendMail(mailDetails);

  let notificationRecord = {
    notification_id: short.generate(),
    template_name: body.templateDetails.name,
    notification_status: "sent",
    template_data: JSON.stringify(body.templateDetails.fields),
    notification_scheduled_on: "instant",
    notification_sending_time: new Date().toString(),
    email_group_id: "null",
  };

  await NotificationSchedule.create(notificationRecord);

  res.status(200).json({
    success: true,
  });
});

module.exports = sendNotifications;
