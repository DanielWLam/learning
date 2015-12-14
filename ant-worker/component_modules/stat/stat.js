var storage = {};

function tick(ns, type, action) {
    if (!storage[ns]) {
        storage[ns] = {};
    }
    if (!storage[ns][type]) {
        storage[ns][type] = {};
    }
    if (!storage[ns][type][action]) {
        storage[ns][type][action] = 1;
    } else {
        storage[ns][type][action]++;
    }
}

function get () {
    return storage;
}

function flush() {
    var data = storage;
    storage = {};
    return data;
}

exports.tick = tick;
exports.get = get;
exports.flush = flush;