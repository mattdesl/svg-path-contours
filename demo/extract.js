var extract = require('extract-svg-path')
var fs = require('fs')
var path = require('path')

var FOLDER = 'font-awesome'

var files = fs.readdirSync(path.join(__dirname,FOLDER)).filter(function(f) {
    return path.extname(f) === '.svg'
})

var results = files.map(function(f) {
    return extract(path.join(__dirname, FOLDER, f))
})

fs.writeFileSync(__dirname+'/data.json', JSON.stringify(results))