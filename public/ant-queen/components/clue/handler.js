var _ = require('underscore'),
	async = require('async'),
	Chain = require('chainjs'),

	stat = require('../../components/stat/stat'),
	logger = require('../../components/log/logger'),
	md5 = require('../../components/md5/md5'),
	apiLogger = logger.apiLogger,

	task = require('../../components/task/task'),
	wa = require('../../components/wa/wa'),
	flower = require('../../components/flower/flower'),
	honey = require('../../components/honey/honey');

/**
 * item is a flower
 * item {Object} 
 * {
		url : 'http://www.xxx.com'
    }
 */
exports.judgeFlower = function(item, callback){	
	var id = md5(item.bid + item.url),
		param = {
			id: id
		};

	Chain(function (chain){
		// 判断id是否存在于 flower
		flower.find(param, function (err, result){
			if(err || result.length > 0){
				return chain.end(err, result);
			}

			chain.next()
		});
	})
	.then(function (chain, data){
		// 判断id是否存在于 honey
		honey.find(param, function (err, result){
			chain.end(err, result);
		});
	})
	.final(function (chain, err, data){
		// 不存在错误 和 id 不存在于flower 和 honey列表中
		if(!err && data.length === 0){
			return callback && callback();
		}
		
		callback && callback('flower already exist!');
	})
	.start();
}

/**
 * saveHoney 判断 honey数据没有变化不做更新处理	
 */
exports.saveHoney = function(item, callback){
	var id = md5(item.bid + item.url);

    wa.statHoney(item);
	honey.find({
		id: id
	}, function (err, result){

		// honey 数据没有变化 无需保存
		if(!err && result.length > 0 && result[0].data === item.data ){
			return callback(null, result);
		}

		// 更新或保存 honey 
		honey.create(item, function (err, re) {
            callback(err, re);
        });

	});
}

exports.appendErrorHoney = function (item, callback) {
    var id = md5(item.bid + item.url);
    honey.find({ id: id }, function (err, result) {
        if (err) {
            callback(err, result);
            return;
        }

        // 如果honey已存在则追加错误信息到data列中
        if (result && result[0]) {
            var h = result[0];
            if (h.tag !== 'error') { // 当已有成功入库的业务数据时，对该错误不予理会
                callback(null, null);
                return;
            }
            var data = JSON.parse(h.data).concat(item.data);
            honey.updateData(h.id, JSON.stringify(data), callback);
        } else {
            item.data = JSON.stringify([item.data]); // 保证在data列中的数据是一个数组
            honey.create(item, callback);
        }
    });
};