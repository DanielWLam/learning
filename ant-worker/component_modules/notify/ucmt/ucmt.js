var _ = require('underscore'),
    request = require('request'),
    template = require('./template');

// 发出通知
function send(options, callback) {
    var conf = options.config,
        templateId = options.template.id,
        sender = options.sender,
        receiver = options.receiver,
        data = options.data;

    request.post({
        url:'http://passive.ucmo.ucweb.com:9294/send_mon.php', 
        form: template.compile(templateId, data)
    }, function(err, res, body) {
        if (callback) {
            callback(err, body);
        }
    });
}

exports.send = send;