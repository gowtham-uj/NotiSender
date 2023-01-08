require("dotenv").config();

const { BigPromiseNormal } = require("./utils/BigPromise.js");
const sequelize = require("./configs/db.js");

const Email = require("./models/Email");
const NotificationSchedule = require("./models/NotificationSchedule");
const TemplateDetail = require("./models/TemplateDetail");

const app = require("./app.js");

const PORT = process.env.PORT || 80;

const appStarter = async () => {
  await sequelize.authenticate();
  // await sequelize.sync({ force: true });
  app.listen(PORT, () => console.log(`server running at ${PORT}...`));
};

BigPromiseNormal(appStarter);
