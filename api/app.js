const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");

const authRoute = require("./routes/auth");
const orgRoute = require("./routes/organization");
const departmentRoute = require("./routes/department");
const benefitRoute = require("./routes/benefit");
const disciplinaryRoute = require("./routes/disciplinary");
const leaveTypeRoute = require("./routes/leaveType");

const superAdminRoute = require("./routes/superAdmin");
const orgAdminRoute = require("./routes/orgAdmin");
const employeeRoute = require("./routes/employee");
const employeeTypeRoute = require("./routes/employeeType");
const dashboardRoute = require("./routes/dashboard");
const leaveRoute = require("./routes/leaves");
const notificationRoute = require("./routes/notification");
const taskRoute = require("./routes/task");
const documentTagRoute = require("./routes/documentTag");
const documentRoute = require("./routes/document");
const jobRoute = require("./routes/job");
const announcementRoute = require("./routes/announcement");
const {
  startCron,
  startCronForJobEnd,
  startCronForNextReview,
} = require("./controllers/cronJob");
const swagger = require("./swagger");
const swaggerUi = require("swagger-ui-express");

const loggerMiddleware = require("./middlewares/loggerMiddleware");

dotenv.config();

const app = express();

app.use(express.json());

var originsWhitelist = ["*", "http://localhost:3001", "http://localhost:3000"];
var corsOptions = {
  origin: function (origin, callback) {
    var isWhitelisted = originsWhitelist.indexOf(origin) !== -1;
    // callback(null, isWhitelisted);
    callback(null, true);
  },
  credentials: true,
};
app.use(cors(corsOptions));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swagger));

mongoose.connect(process.env.MONGODB_URI);
mongoose.connection.on("connected", () => {
  console.log("Connected to DB");
});
mongoose.connection.on("error", (err) => {
  console.log("DB connection failed: ", err);
});
app.use(loggerMiddleware);

app.use("/api/auth", authRoute);
app.use("/api/organization", orgRoute);
app.use("/api/department", departmentRoute);
app.use("/api/benefit", benefitRoute);
app.use("/api/employee-type", employeeTypeRoute);
app.use("/api/leave-type", leaveTypeRoute);
app.use("/api/leave", leaveRoute);
app.use("/api/disciplinary", disciplinaryRoute);
app.use("/api/super-admin", superAdminRoute);
app.use("/api/organization-admin", orgAdminRoute);
app.use("/api/employee", employeeRoute);
app.use("/api/dashboard", dashboardRoute);
app.use("/api/notification", notificationRoute);
app.use("/api/task", taskRoute);
app.use("/api/document-tag", documentTagRoute);
app.use("/api/document", documentRoute);
app.use("/api/job", jobRoute);
app.use("/api/announcement", announcementRoute);

app.use("/api", express.static(path.join(__dirname, "../wagmatcook")));
app.use("/api/media", express.static(path.join(__dirname, "assets")));
app.use("/api/public", express.static(path.join(__dirname, "public")));
app.use("/api/temp", express.static(path.join(__dirname, "temp")));
app.use("/api/uploads", express.static(path.join(__dirname, "uploads")));
// app.use(express.static(path.join(__dirname, 'build')));
// crons jobs
startCron();
startCronForJobEnd();
startCronForNextReview();

app.listen(process.env.PORT, () => {
  console.log("Server started on port " + process.env.PORT);
});
