const express = require("express");
const app = express();
const path=require('path')
const bodyParser = require("body-parser");
const cors = require("cors");
const OtpRoute=require('./routers/router')
// Setting Body parser
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname+"public")))
// Setting Corse to Connect Client and Server
app.use(cors({origin:"*"}))
app.use('/',OtpRoute)
let PORT = 8000;
app.listen(PORT, () => console.log(`Server Running on localhost:${PORT}`));
