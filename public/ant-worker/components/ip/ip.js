var os = require('os'),

    _ = require('underscore');

function get() {
    var ifaces = os.networkInterfaces(),
        ips = [],
        r = /\d+\.\d+\.\d+\.\d+/;

    _.each(ifaces, function (array, device) {
        _.each(array, function (o) {
            var address = o.address;
            if (r.test(address) &&
                address.indexOf('127.') !== 0) {
                ips.push(address);
            }
        });
    });

    return ips.join(',');
}
module.exports = get;