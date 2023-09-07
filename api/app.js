const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const authRoute = require('./routes/auth')
const orgRoute = require('./routes/organization')
const departmentRoute = require('./routes/department')
const disciplinaryRoute = require('./routes/disciplinary')
const superAdminRoute = require('./routes/superAdmin')
const orgAdminRoute = require('./routes/orgAdmin')


// const swagger = require('./swagger');
const loggerMiddleware = require('./middlewares/loggerMiddleware');

dotenv.config();

const app = express();

app.use(express.json());

var originsWhitelist = [
    '*',
    'http://localhost:3001',
    'http://localhost:3000',
];
var corsOptions = {
    origin: function (origin, callback) {
        var isWhitelisted = originsWhitelist.indexOf(origin) !== -1;
        // callback(null, isWhitelisted);
        callback(null, true);
    },
    credentials: true
}
app.use(cors(corsOptions));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// swagger(app);

mongoose.connect(process.env.MONGODB_URI);
mongoose.connection.on("connected", () => {
    console.log("Connected to DB");
});
mongoose.connection.on("error", err => {
    console.log("DB connection failed: ", err);
});
app.use(loggerMiddleware);


app.use('/api/auth', authRoute);
app.use('/api/organization', orgRoute);
app.use('/api/department', departmentRoute);
app.use('/api/disciplinary', disciplinaryRoute);
app.use('/api/super-admin', superAdminRoute);
app.use('/api/organization-admin', orgAdminRoute);



app.use("/api", express.static(path.join(__dirname, '../wagmatcook')));
app.use("/api/media", express.static(path.join(__dirname, 'assets')));
app.use("/api/temp", express.static(path.join(__dirname, 'temp')));
app.use("/api/uploads", express.static(path.join(__dirname, 'uploads')));







app.listen(process.env.PORT, () => {
    console.log('Server started on port ' + process.env.PORT);
});
