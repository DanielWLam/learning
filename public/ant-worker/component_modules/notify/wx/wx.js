var _ = require('underscore'),

    template = require('./template'),

    // https://www.npmjs.com/package/wechat-api
    WX = require('wechat-api');

// 发出通知
function send(options, callback) {
    var conf = options.config,
        templateId = options.template.id,
        sender = options.sender,
        receiver = options.receiver,
        data = options.data;

    var d = template.compile(templateId, data),
        color = '#FF000',
        msgUrl;

    // 加上消息链接
    if (d.msgUrl &&
        d.msgUrl.value) {
        msgUrl = d.msgUrl.value;
    }

    // 标题颜色
    if (d.color &&
        d.color.value) {
        color = d.color.value;
    }

    _.each(receiver, function (receiver) {

        WX.message.sendTemplate(
            // 发信息账号
            sender.account,
            // 收信息账号
            receiver.account,
            // 微信模板
            settings.template,
            // 消息链接
            msgUrl,
            // 标题颜色
            color,
            d,
            callback
        );
    });
}

exports.send = send;