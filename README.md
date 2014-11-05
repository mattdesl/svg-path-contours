# discretize-svg-path

[![stable](http://badges.github.io/stability-badges/dist/stable.svg)](http://github.com/badges/stability-badges)

WORK IN PROGRESS.

Approximates an SVG path into a discrete list of 2D points. This is useful for collision detection, intersection, triangulation & WebGL rendering, etc. It does not attempt to clean or optimize the discretized points. 

Usage:

```js
var parse = require('parse-svg-path')
var points = require('discretize-svg-path')

var path = 'm10,10C45.812,24.024,45.673,24,45.529,24H31.625
   c0.482-3.325,6.464-2.758,8.913-3.155z'

var result = points(parse(path))
```

## Usage

[![NPM](https://nodei.co/npm/discretize-svg-path.png)](https://nodei.co/npm/discretize-svg-path/)

## License

MIT, see [LICENSE.md](http://github.com/mattdesl/discretize-svg-path/blob/master/LICENSE.md) for details.
