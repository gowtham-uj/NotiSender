const fs = require("fs").promises;

const { BigPromise } = require("../utils/BigPromise");
const Mustache = require("mustache");
const TemplateDetail = require("../models/TemplateDetail");
const short = require("short-uuid");
const Email = require("../models/Email");

const createGroup = BigPromise(async (req, res, next) => {
  let body = req.body;
  let groupId = short.generate();
  console.log(body.emailsArr.length);
  if (!body.group_name || !body.emailsArr) {
    res.status(200).json({
      success: false,
      msg: "please provide the group name and emails list",
    });
  }

  let checkIfGroupAlreadyExists = await Email.findOne({
    where: {
      group_name: body.group_name,
    },
  });
  if (checkIfGroupAlreadyExists) {
    res.status(200).json({
      success: false,
      msg: "group already exists",
    });
  }

  const processedBulkEmail = [];

  for (let index = 0; index < body.emailsArr.length; index++) {
    let emailObj = {
      group_id: groupId,
      group_name: body.group_name,
      email: body.emailsArr[index],
    };
    processedBulkEmail.push(emailObj);
  }

  let insertBulk = await Email.bulkCreate(processedBulkEmail);

  res.status(200).json({
    success: true,
  });
});

module.exports = createGroup;
