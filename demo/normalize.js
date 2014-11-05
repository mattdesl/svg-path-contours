var bounds = require('getboundingbox')
var unlerp = require('unlerp')

module.exports = function normalize(path) {
    var b = bounds(path)
    var aspect = (b.maxX-b.minX)/(b.maxY-b.minY)

    return path.map(function(p) {
        return [
            range(b.minX, b.maxX, p[0]),
            range(b.minY, b.maxY, p[1])*1/aspect
        ]
    })
}

function range(min, max, value) {
    return ((max-min===0) ? value : unlerp(min, max, value))*2-1
}