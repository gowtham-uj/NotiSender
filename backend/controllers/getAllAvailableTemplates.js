const { BigPromise } = require("../utils/BigPromise");
const TemplateDetail = require("../models/TemplateDetail");

const getAllAvailableTemplates = BigPromise(async (req, res, next) => {
  let body = req.body;

  const allTemplateRecords = await TemplateDetail.findAll();

  res.status(200).json({
    success: true,
    msg: allTemplateRecords,
  });
});

module.exports = getAllAvailableTemplates;
