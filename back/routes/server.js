const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser');

const auth_router = require('./auth/auth_router'); // register && login
const authenticate = require('./auth/restrict_auth_middleware');
const testCollect = require('./testCollect');

const db = require("../config/keys").mongoURI;
const cors = require('cors');
const app = express();

app.use(bodyParser.json());
app.use(cookieParser())
app.use(cors());
app.use((err, req, res, next) => {
	err.message;
	next(err)
})

mongoose
	.connect(
		db,
		{
			useUnifiedTopology: true,
			useNewUrlParser: true
		}
	)
	.then(() => console.log("MongoDB successfully connected"))
	.catch(err => console.log(err));


app.use('/api', auth_router);
app.use('/api/tests', authenticate, testCollect);


const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server up and running on port ${port} !`));
