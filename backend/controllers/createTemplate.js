const fs = require("fs").promises;

// require.extensions[".html"] = function (module, filename) {
//   module.exports = fs.readFileSync(filename, "utf8");
// };

const { BigPromise } = require("../utils/BigPromise");
const Mustache = require("mustache");
const TemplateDetail = require("../models/TemplateDetail");

const templatesDetails = {
  privacyPolicy: {
    path: "../mail-templates/privacy-policy/index.html",
    fields: {
      updateTitle: "",
      updateName: "",
      updateText: "",
    },
  },
};

const createTemplate = BigPromise(async (req, res, next) => {
  let body = req.body;
  if (!body.name || !body.fields) {
    res.status(200).json({
      success: false,
      msg: "please provide the template details",
    });
  }

  // try {
  //   const rendered = Mustache.render(body.htmlCode, body.fields);
  // } catch (e) {
  //   res.status(200).json({
  //     success: false,
  //     msg: "template syntax error , please provide the valid html code",
  //   });
  // }

  // let createTemplateFile = await fs.writeFile(
  //   `../mail-templates/${body.name}/index.html`,
  //   body.htmlCode
  // );

  const createTemplateRecord = await TemplateDetail.create({
    template_name: body.name,
    fields: body.fields,
  }).catch((e) => console.log(e));

  res.status(200).json({
    success: true,
  });
});

const createTemplateHtml = BigPromise(async (req, res, next) => {
  let body = req.body;

  console.log(req.file, req.body);

  if (!req.file) {
    res.status(200).json({
      success: false,
      msg: "please provide the valid html file to create the template.",
    });
  }

  const htmlCode = await fs.readFile(req.file.path, "utf8");

  // console.log(htmlCode);
  try {
    const rendered = Mustache.render(htmlCode, {
      updateTitle: "HII",
      updateName: "BOOM",
      updateText: "BRRRRRRRRRRRROOOOOOOOOOOM",
    });
  } catch (e) {
    res.status(200).json({
      success: false,
      msg: "template syntax error , please provide the valid html code",
    });
    return;
  }

  let findTemplate = await TemplateDetail.findOne({
    where: {
      template_name: req.body.name,
    },
  });
  if (!findTemplate) {
    res.status(200).json({
      success: false,
      msg: "please provide the valid template name.",
    });
  }

  try {
    await fs.mkdir(`./backend/mail-templates/${req.body.name}/`);

    let createTemplateFile = await fs.rename(
      req.file.path,
      `./backend/mail-templates/${req.body.name}/${req.body.name}.html`
    );
  } catch (err) {
    console.error(err);
  }

  res.status(200).json({
    success: true,
  });
});

module.exports = {
  createTemplate,
  createTemplateHtml,
};
