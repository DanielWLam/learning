/* 
 * @Author: daniel
 * @Date:   2015-11-03 15:23:10
 * @Last Modified by:   daniel
 * @Last Modified time: 2015-11-12 10:54:42
 */

'use strict';
var route = [
    [/otosia.com\/berita\/(index)/, 'otoList'],
    [/otosia.com\/berita(\/)*$/,'otoList'],
    [/otosia.com\/berita\/[\w\W]+/, 'otoDetail'],
    [/otosia.com\/galeri/, 'otoPhoto']
]

module.exports = function() {
    return {
        route: route
    };
}