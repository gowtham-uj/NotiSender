const router = require("express").Router();
const multer = require("multer");
const short = require("short-uuid");

const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, "./backend/uploads/");
  },
  filename: function (req, file, callback) {
    callback(null, `${short.generate()}.html`);
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype == "text/html" || file.mimetype == "text/htm") {
      cb(null, true);
    } else {
      cb(null, false);
    }
  },
});

const upload = multer({ storage });

const sendNotifications = require("../controllers/sendNotifications");
const {
  createTemplate,
  createTemplateHtml,
} = require("../controllers/createTemplate");
const scheduleNotification = require("../controllers/scheduleNotification");
const createGroup = require("../controllers/createGroup");
const sendGroupNotification = require("../controllers/sendGroupNotification");
const scheduleGroupNotification = require("../controllers/scheduleGroupNotification");
const getAllAvailableTemplates = require("../controllers/getAllAvailableTemplates");
const getAllGroups = require("../controllers/getAllGroups");

router.route("/create-template").post(createTemplate);
router
  .route("/create-template-html")
  .post(upload.single("html"), createTemplateHtml);
router.route("/get-all-templates").get(getAllAvailableTemplates);

router.route("/send-notification").post(sendNotifications);
router.route("/schedule-notification").post(scheduleNotification);
router.route("/send-group-notification").post(sendGroupNotification);
router.route("/schedule-group-notification").post(scheduleGroupNotification);

router.route("/create-group").post(createGroup);
router.route("/get-all-groups").get(getAllGroups);

module.exports = router;
