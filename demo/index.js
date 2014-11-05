require('canvas-testbed')(render, update)

var parse = require('parse-svg-path')
var simplify = require('simplify-path')
var normalize = require('./normalize')
var discretize = require('../')
var triangulate = require('./triangulate-contours')

var shapes = require('./data.json').slice(0, 100).map(toMesh)

var time = 0, 
    index = 1,
    curShape

function render(ctx, width, height, dt) {
    time += dt

    if (time > 1000) {
        time = 0
        index++
        update()
    }

    ctx.clearRect(0, 0, width, height)
    ctx.fillStyle = '#eee'
    ctx.fillRect(0,0, width, height)

    ctx.fillStyle = '#121212'
    ctx.globalAlpha = 0.9
    ctx.save()
    // ctx.translate(width/2, height/2)
    var s = 30
    ctx.scale(s, s)
    ctx.lineWidth = 1/s
    
    // strokePath(ctx, curShape.positions)
    
    var cols = 6
    var size = 3

    ctx.translate(2, 2)
    shapes.forEach(function(shape, i) {
        var x = (i % cols),
            y = ~~( i / cols )

        ctx.save()
        ctx.translate(x*size, y*size)
        drawTriangles(ctx, shape)
        ctx.restore()
    })

    //drawTriangles(ctx, curShape)

    ctx.restore()
}

function drawTriangles(ctx, complex) {
    var v = complex.positions

    ctx.beginPath()
    complex.cells.forEach(function(f) {
        var v0 = v[f[0]],
            v1 = v[f[1]],
            v2 = v[f[2]]
        ctx.moveTo(v0[0], v0[1])
        ctx.lineTo(v1[0], v1[1])
        ctx.lineTo(v2[0], v2[1])
        ctx.lineTo(v0[0], v0[1])
    })
    ctx.stroke()
}

function strokePath(ctx, positions) {
    ctx.beginPath()
    positions.forEach(function(p) {
        ctx.lineTo(p[0], p[1])
    })
    ctx.fill()
}

function toMesh(contents) {
    var threshold = 2
    var scale = 10
    var contours = discretize.contours(parse(contents), scale)

    contours = contours.map(function(c) {
        return simplify(c, threshold)
    })

    var c = triangulate(contours)
    c.positions = normalize(c.positions)
    return c
}

// function toPath(contents) {
//     var threshold = 0.01
//     var scale = 10
//     var path = discretize(parse(contents), scale)
//     path = simplify.radialDistance(path, threshold)
//     return normalize(path)
// }

function update() {
    curShape = shapes[index%shapes.length]
}