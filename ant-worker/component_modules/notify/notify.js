var fs = require('fs'),
    path = require('path'),

    _ = require('underscore'),

    deliverFiles = [],
    delivers = {};

function findDeliver(p) {
    var _p = path.resolve(__dirname, p),
        stats = fs.statSync(_p);

    if (stats.isFile()) {
        if (_p.indexOf('.js') > 0) {
            deliverFiles.push(p.replace('.js', ''));
        }
    } else {
        var files = fs.readdirSync(_p);
        files.forEach(function (file) {
            findDeliver(p + '/' + file);
        });
    }
}

function init() {
    // 查找文件夹中的消息发送器
    findDeliver(__dirname);

    _.each(deliverFiles, function (path) {
        var parts = path.split('/'),
            module = parts[parts.length - 2]
            name = parts[parts.length -1];
        if (module === name && name !== 'notify') {
            delivers[name] = require(path);
        }
    });
}

// 发出通知
// {
//     wx: {
//         config: {
//         },
//         template: {
//             name: ''
//         },
//         sender: {
//                 account: '',
//                 name: ''
//         },
//         receiver: [
//             {
//                 account: '',
//                 name: ''
//             }
//         ],
//         data: {
//         }
//     }
// }
function send(options, callback) {
    _.each(options, function (option, key) {
        var deliver = delivers[key];
        if (deliver && deliver.send) {
            deliver.send(option, callback);
        }
    });
}

exports.init = init;
exports.send = send;