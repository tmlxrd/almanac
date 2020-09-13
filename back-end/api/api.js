const uploadToAmazonFile =  require("./upload/upload-to-amazon-file");
const downloadFromAmazon =  require("./upload/download-from-amazon");
const test =  require("./upload/test");

module.exports  = [uploadToAmazonFile,downloadFromAmazon,test]