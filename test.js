var parse = require('parse-svg-path')
var discretize = require('./')
var test = require('tape').test
var svg = require('fs').readFileSync(__dirname+'/test/path1.txt', 'utf8')
var simplify = require('simplify-path')

test('gets a discrete list of points from svg', function(t) {
    
    // var points = toPoints(parse(svg))
    
    var expected = [ [ 10, 10 ], [ 10, 10 ], [ 10, 10.44921875 ], [ 10, 13.69140625 ], [ 10, 22.65625 ], [ 10, 37.34375 ], [ 10, 46.30859375 ], [ 10, 49.55078125 ], [ 10, 50 ], [ 10, 50 ], [ 10.44921875, 50 ], [ 13.69140625, 50 ], [ 22.65625, 50 ], [ 37.34375, 50 ], [ 46.30859375, 50 ], [ 49.55078125, 50 ], [ 50, 50 ], [ 50, 50 ], [ 49.55078125, 49.55078125 ], [ 46.30859375, 46.30859375 ], [ 37.34375, 37.34375 ], [ 22.65625, 22.65625 ], [ 13.69140625, 13.69140625 ], [ 10.44921875, 10.44921875 ], [ 10, 10 ] ]
    t.deepEqual( discretize(parse('M10,10 L10,50 L50,50z')), expected )

    expected = [ [ 50, 50 ], [ 10, 10 ], [ 10, 10.44921875 ], [ 10, 13.69140625 ], [ 10, 22.65625 ], [ 10, 37.34375 ], [ 10, 46.30859375 ], [ 10, 49.55078125 ], [ 10, 50 ], [ 10, 50 ], [ 10.44921875, 50 ], [ 13.69140625, 50 ], [ 22.65625, 50 ], [ 37.34375, 50 ], [ 46.30859375, 50 ], [ 49.55078125, 50 ], [ 50, 50 ] ]
    t.deepEqual( discretize(parse('M10,10 L10,50 L50,50')), expected )

    t.deepEqual( decompose('M10,10 L10,50 L50,50'), [ [ 50, 50 ], [ 10, 10 ], [ 10, 50 ], [ 50, 50 ] ] )    
    t.deepEqual( decompose('M10,10 L10,50 L50,50z'), [ [ 10, 10 ], [ 10, 50 ], [ 50, 50 ], [ 10, 10 ] ] )    
    t.deepEqual( decompose('M0,0 L10,50') )    

    // var points = toPoints(parse('M10,10 L10,50 L50,50z'))

    // points = points.map(function(p) {
    //     return p.map(Math.round)
    // })

    // console.log(simplify(points, 1))
    t.end()
})

//produce a nice clean path without redundant points
function decompose(svg, tolerance) {
    var points = discretize(parse(svg))
    return round(simplify(points, tolerance))
}   

function round(path) {
    return path.map(function(p) {
        return p.map(Math.round)
    })
}