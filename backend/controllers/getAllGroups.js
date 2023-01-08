const { BigPromise } = require("../utils/BigPromise");
const Email = require("../models/Email");

const getAllAvailableTemplates = BigPromise(async (req, res, next) => {
  let body = req.body;

  let groupNames = [];

  const allGroups = await Email.findAll({
    group: ["group_name"],
  });

  // console.log(allGroups);
  for (let index = 0; index < allGroups.length; index++) {
    groupNames.push(allGroups[index].group_name);
  }

  let EmailGroups = [];

  const allEmails = await Email.findAll();

  for (let index1 = 0; index1 < groupNames.length; index1++) {
    let groupObj = {
      groupName: groupNames[index1],
      emails: [],
    };
    for (let index = 0; index < allEmails.length; index++) {
      if (allEmails[index].group_name === groupNames[index1]) {
        groupObj.emails.push(allEmails[index].email);
      }
    }
    EmailGroups.push(groupObj);
  }

  res.status(200).json({
    success: true,
    msg: EmailGroups,
  });
});

module.exports = getAllAvailableTemplates;
