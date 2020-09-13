const express = require("express");
const router = express.Router();
const infoAboutUlpoadFileDB = require("../../mongodb/sheme/information-about-upload-to-amazon-file");

router.post("/api/download-file", function (req, res) {
  infoAboutUlpoadFileDB.find(
    { code: req.body.code },
    function (err, docs) {
      if (err) {
        console.log(err);
      } else {
        if(docs[0] != undefined){
        console.log(Buffer.from(req.body.code, 'base64').toString('ascii'))
          console.log(docs)
        res.json({path:docs[0].pathInAmazon})
      } else {
        res.json('Файл не знайдено')
      }
    }}
  );
});

module.exports = router;
