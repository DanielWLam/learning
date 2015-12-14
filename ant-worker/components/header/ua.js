var _ = require('underscore'),

    conf = require('../../conf'),

    ua = conf.ua;

function get(key) {
    var list = ua[key],
        count = list && list.length || 0,
        index;

    if (count <= 0) {
        return null;
    }

    index = Math.round((count - 1) * Math.random());

    return list[index];
}
exports.get = get;