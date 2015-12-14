var _ = require('underscore'),
    nodemailer = require('nodemailer'),

    template = require('./template');

// 发出通知
function send(options, callback) {
    var conf = options.config,
        templateId = options.template.id,
        sender = options.sender,
        receiver = options.receiver,
        data = options.data,

        // SMTP服务器地址
        host = conf.host,
        // SMTP服务器端口
        port = conf.port,
        // SMTP服务器验证用户名
        user = conf.auth.user,
        // SMTP服务器验证密码
        password = conf.auth.password,
        secure = conf.secure,
        
        senderEmail = sender.account,
        receiverEmails,

        // 邮件标题
        subject = data.subject;

    if (!host || !port || !user || !password) {
        console.log('消息中心 - 邮件发送配置错误');
        return;
    }

    receiverEmails = _.map(receiver, function (r) {
        return r.email;
    });

    var transporter = nodemailer.createTransport({
            host: host,
            port: port,
            secure: secure,
            auth: {
                user: user,
                pass: password
            }
        }),
        mailOptions = {
            from: senderEmail,
            to: receiverEmails.join(', '),
            subject: subject,
            text: subject,
            html: template.compile(templateId, data.data)
        };

    console.log('将从', mailOptions.from, '发邮件到', mailOptions.to);
    transporter.sendMail(mailOptions, function (err, info) {
        if (err) {
            console.log('邮件发送错误', err);
            return;
        }
        console.log('邮件已发送', info.response);
        if (callback) {
            callback(err, info.response);
        }
    });
}

exports.send = send;