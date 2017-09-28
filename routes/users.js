var express = require('express');
var router = express.Router();

var fileData = [];
var fs = require('fs');
var data = fs.readFileSync(__dirname + '/file.txt', 'utf-8');
var row = data.split('\n');

// step 1: remember the property names to 'eachProp', its on the first row
var eachProp = row[0].split('\t');

// step 2: go through other rows to store them in the 'fileData' as json
for (var i = 1; i < row.length; i++) {
  var eachValue = row[i].split('\t');
  var object = {};
  for (var j = 0; j < eachValue.length; j++) {
    object[eachProp[j]] = eachValue[j];
  }
  fileData.push(object);
}

// step 3, at this point, data is stored in fileData
// pass the file Data as a get request
// router.get('/', function(req, res, next) {
//   res.json(fileData);
// });

router.get('/process_get', function (req, res) {
  if (!req._parsedUrl.query) {
    res.json(['nothing found']);
  }

  var result = [];

  for (var i = 0; i < fileData.length; i++) {
    if (fileData[i].securityGroup == req._parsedUrl.query) {
      result.push(fileData[i]);
    }
  }
  res.json(result);
})

module.exports = router;
