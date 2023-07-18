const express = require("express");
const router = express.Router();
const Keys = require("../configurations/Keys");

const ServiceSsId = Keys.SERVER_SSID;
const AccoutSsId = Keys.ACCOUNT_SSID;
const authToken = Keys.AUTH_TOKEN;
const twillio = require("twilio")(AccoutSsId, authToken);
router.get("/", (req, res) => {
  res.send("HOme");
});
router.post("/mobile", (req, res) => {
  console.log("response", req.body);
  Mobile = req.body.state;
  console.log(Mobile, "number");
  twillio.verify.v2
    .services(ServiceSsId)
    .verifications.create({
      to: `+91${req.body.state}`,
      channel: "sms",
    })
    .then((res) => {
      console.log(res, "resop");
    });
});
// req.body.state it is mean by Number
router.post("/otp", (req, res) => {
  console.log("Body of Request", req.body);
  twillio.verify.v2
    .services(ServiceSsId)
    .verificationChecks.create({
      to: `+91${req.body.state}`,
      channel: "sms",
      code: req.body.otp,
    })
    .then((re) => {
      console.log("response is", re);
      if (re.valid) {
        res.json({ re, meassge: "welcome" });
      } else {
        res.json({ re, message: "Expire Otp" });
      }
    });
});
module.exports = router;
