require('canvas-testbed')(render, update)

var discretize = require('../')
var parse = require('parse-svg-path')
var simplify = require('simplify-path')
var normalize = require('normalize-path-scale')
var triangulate = require('triangulate-contours')

var shapes = require('./data.json')
        .slice(0, 60)
        .map(toMesh)
        .filter(function(m) {
            return m.positions.length>0
        })

var timer = 0, 
    index = 1,
    curShape

function render(ctx, width, height, dt) {
    timer += dt

    if (timer > 1000) {
        timer = 0
        index++
        update()
    }

    ctx.clearRect(0, 0, width, height)
    ctx.fillStyle = '#eee'
    ctx.fillRect(0,0, width, height)

    ctx.fillStyle = '#121212'
    ctx.globalAlpha = 0.9
    ctx.save()
    var s = 30
    ctx.scale(s, s)
    ctx.lineWidth = 1/s
        
    var cols = 6
    var size = 3

    ctx.translate(2, 2)
    shapes.forEach(function(shape, i) {
        var x = (i % cols),
            y = ~~( i / cols )

        ctx.save()
        ctx.translate(x*size, y*size)
        ctx.beginPath()
        drawTriangles(ctx, shape)
        ctx.lineWidth = 1/s
        ctx.lineJoin = 'round'
        ctx.lineCap = 'round'
        ctx.stroke()
        ctx.restore()
    })

    ctx.restore()
}

function drawTriangles(ctx, complex) {
    var v = complex.positions

    complex.cells.forEach(function(f) {
        var v0 = v[f[0]],
            v1 = v[f[1]],
            v2 = v[f[2]]
        ctx.moveTo(v0[0], v0[1])
        ctx.lineTo(v1[0], v1[1])
        ctx.lineTo(v2[0], v2[1])
        ctx.lineTo(v0[0], v0[1])
    })
}

function toMesh(contents) {
    var threshold = 2
    var scale = 10
    var contours = discretize(parse(contents), scale)

    contours = contours.map(function(c) {
        return simplify(c, threshold)
    })

    var c = triangulate(contours)
    c.positions = normalize(c.positions)
    return c
}

function update() {
    curShape = shapes[index%shapes.length]
}