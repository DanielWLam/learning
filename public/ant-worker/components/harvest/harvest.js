var _ = require('underscore'),
    request = require('request'),

    md5 = require('../../component_modules/md5/md5'),
    log = require('../../component_modules/log/log'),
    stat = require('../../component_modules/stat/stat'),
    
    conf = require('../../conf');

function harvest(task) {
    var queen = conf.queen,
        host = queen.host,
        port = queen.port,
        secret = queen.secret,
        api = 'http://' + host + ':' + port + '/task?secret=' + secret;

    // 移除不必要的内容
    delete task.grab;
    delete task.done;

    // 增加内容校验串
    if (task.harvest) {
        if (_.isArray(task.harvest)) {
            _.each(task.harvest, function (harvest) {
                if (harvest.honey) {
                    harvest.honeyHash = md5(JSON.stringify(harvest.honey));
                }
            });
        } else if (task.harvest.honey) {
            task.harvest.honeyHash = md5(JSON.stringify(task.harvest.honey));
        }
    }

    request({
        method: 'PUT',
        url: api,
        body: task,
        json: true
    }, function (err, res, body) {
        if (err || !res || res.statusCode !== 200 || !body) {
            log.error('{{PUT_HARVEST_ERROR}}', task, err, res && res.statusCode, body);
            stat.tick('task', 'finish', 'error');
            return;
        }
        stat.tick('task', 'finish', 'ok');
    });
}

module.exports = harvest;