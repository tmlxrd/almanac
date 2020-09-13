const express = require("express");
const router = express.Router();
const AWS = require("aws-sdk");
const fs = require("fs");
const moment = require("moment");
const infoAboutUlpoadFileDB = require("../../mongodb/sheme/information-about-upload-to-amazon-file");

let hour;
      let day
      let month
      let reqBodyData
      let dayForDelete;
      let monthForDelete;
      let oneDownload;

AWS.config.update({
  secretAccessKey: process.env.secretAccessKey,
  accessKeyId: process.env.accessKeyId,
  region: process.env.region,
  ACL: "public-read",
});

s3 = new AWS.S3({ apiVersion: process.env.apiVersion });

const uploadParams = { Bucket: process.env.Bucket, ACL: "public-read" };

let filePath;

const uploadFileToBucket = (req, res) => {
  filePath = `./delete/${req.file.filename}`;
  // console.log(req.file)
  var fileStream = fs.createReadStream(filePath);

  fileStream.on("error", function (err) {
    console.log("File Error", err);
  });
  uploadParams.Body = fileStream;
  var path = require("path");
  uploadParams.Key = path.basename(filePath);

  s3.upload(uploadParams, function (err, data) {
    if (err) {
      console.log("Error", err);
    }
    if (data) {
      hour = new Date().getHours();
       day = new Date().getDate();
       month = new Date().getMonth() + 1;
       reqBodyData
      req.body.maxData === '0' ? reqBodyData = 0 : req.body.maxData === '1' ? reqBodyData = 1 : req.body.maxData === '7' ? reqBodyData = 7 : reqBodyData = 30
      console.log(reqBodyData === 0)
      if (reqBodyData === 0) {
        oneDownload = true;
      } else {
        oneDownload = false
        if (
          new Date().getDate() + reqBodyData >
          new Date(
            new Date().getFullYear(),
            new Date().getMonth() + 1,
            0
          ).getDate()
        ) {
          dayForDelete =new Date().getDate() +reqBodyData -new Date(new Date().getFullYear(), new Date().getMonth() + 1,0).getDate();
          monthForDelete = new Date().getMonth() + 2;
        } else {
          dayForDelete = new Date().getDate() + reqBodyData;
          monthForDelete = new Date().getMonth() + 1;
        }
      }
      infoAboutUlpoadFileDB.create({
        fieldname: req.file.fieldname,
        originalname: req.file.originalname,
        encoding: req.file.encoding,
        mimetype: req.file.mimetype,
        from: "browser",
        filename: req.file.filename,
        size: req.file.size,
        code: Buffer.from(req.file.filename).toString("base64"),
        pathInAmazon: data.Location,
        dateInfo: {
          hour:hour,
          day: day,
          dayForDelete: dayForDelete,
          month: month,
          monthForDelete: monthForDelete,
          oneDownload: false,
          maxData: reqBodyData,
        },
        download: false,
        numberDownload: 0,
      });
    }
  });

  console.log(filePath);
  fs.unlink(filePath, function (err) {
    if (err) throw err;

    console.log("file deleted");
  });
  // res.send(Buffer.from(req.file.filename).toString("base64"));
  res.write(`<div>
  <input type="text" value="${Buffer.from(req.file.filename).toString("base64")}" id="myInput">

  <button onclick="myFunction()">Copy</button>

<script>
function myFunction() {
  /* Get the text field */
  var copyText = document.getElementById("myInput");

  /* Select the text field */
  copyText.select();

  /* Copy the text inside the text field */
  document.execCommand("copy");

  /* Alert the copied text */
  alert("Copied the text: " + copyText.value);
}
</script>
  </div>`)
};

router.post("/api/upload-file", function (req, res, next) {
  if (!req.file) res.send("Ошибка при загрузке файла");
  else {
    uploadFileToBucket(req, res);
    console.log(req.body);
  }
});

module.exports = router;
