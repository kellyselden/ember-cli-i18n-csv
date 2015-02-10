var fs = require('fs');
var path = require('path');
var parse = require('csv-parse');

var localesPath = process.argv[2];

var csv = fs.readFileSync('i18n.csv', 'utf8');

parse(csv, function(err, lines) {
  var locales = lines.shift().slice(1);

  var objs = [];
  for (var i in locales) {
    objs.push({});
  }

  function recurse(keySections, obj, value) {
    var key = keySections[0];
    if (keySections.length > 1) {
      if (!obj[key]) {
        obj[key] = {};
      }
      recurse(keySections.slice(1), obj[key], value);
    } else {
      obj[key] = value;
    }
  }

  for (var i in lines) {
    var line = lines[i];
    var key = line.shift();
    var keySections = key.split('.');
    for (var columnIndex in line) {
      var obj = objs[columnIndex];
      var value = line[columnIndex];
      recurse(keySections, obj, value);
    }
  }

  for (var columnIndex in locales) {
    var locale = locales[columnIndex];
    var fileName = path.join(localesPath, locale + '.js');
    var jsonString = JSON.stringify(objs[columnIndex], null, 2);
    var string = 'export default ' + jsonString + ';\n';
    fs.writeFileSync(fileName, string, 'utf8');
  }
});