const express = require("express");
const router = express.Router();

router.post("/api/test", function (req, res) {
  console.log(req.body)
  res.json(req.body)
});

module.exports = router;
