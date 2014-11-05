var Tess2 = require('tess2')

module.exports = function(contours) {
    //flatten for tess2.js
    contours = contours.map(function(c) {
        return c.reduce(function(a, b) {
            return a.concat(b)
        })
    })

    var vertSize = 2

    // Tesselate
    var res = Tess2.tesselate({
        contours: contours,
        windingRule: Tess2.WINDING_ODD,
        elementType: Tess2.POLYGONS,
        polySize: 3,
        vertexSize: vertSize
    });
    
    var positions = []
    for (var i=0; i<res.vertices.length; i+=2)
        positions.push([res.vertices[i], res.vertices[i+1]])
    
    var cells = []
    for (i=0; i<res.elements.length; i+=3) {
        var a = res.elements[i],
            b = res.elements[i+1],
            c = res.elements[i+2]
        cells.push([a, b, c])
    }
    return {
        positions: positions,
        cells: cells
    }
}