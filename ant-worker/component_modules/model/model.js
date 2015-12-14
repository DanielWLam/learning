var fs = require('fs'),
    path = require('path'),

    _ = require('underscore'),

    isInit = false,
    
    modelFiles = [],
    models = {},

    rRequire = /^@(.*)/,
    rArray = /^(.*)\[\]$/,

    errMsg = {
        isRequire: '该字段必须存在!',
        arr: '数据类型不是Array { $content }',
        obj: '数据类型不是Object { $content }',
        reg: '正则{ $r }校验不通过! { $content } ',
        ty: '类型{ $t }校验不通过! { $content } '
    };

function _type(obj) {
    var toString = Object.prototype.toString;
    
    var type;
    if (obj == null) {
        type = String(obj);
    } else {
        type = toString.call(obj).toLowerCase();
        type = type.substring(8, type.length - 1);
    }

    return type;
}

function _isObject(obj) {
    return _type(obj) === 'object';
}

function fetchModel(p) {
    var _p = path.resolve(__dirname, p),
        stats = fs.statSync(_p);

    if (stats.isFile()) {
        if (_p.indexOf('.js') > 0) {
            modelFiles.push(p.replace('.js', ''));
        }
    } else {
        var files = fs.readdirSync(_p);
        files.forEach(function (file) {
            fetchModel(p + '/' + file);
        });
    }
}

// 加载模型
function loadModel() {
    fetchModel('../../model');

    _.each(modelFiles, function (filename) {
        var model = require(filename),
            parts = filename.split('/'),
            tag = parts[parts.length - 1];
            console.log(tag)
        models[tag] = model;
    });
}

// 检测 honey 数据
function checkHoney(data, template) {
    var result = {};

    _.each(template, function (exp, key) {
        var k = key;
        var isRequire = false;
        var isArr = false;

        // 获取是否为不可缺失字段
        if (rRequire.test(key)) {
            k = key.slice(1);
            isRequire = true;
        }

        // 获取是否为数组类型的判断规则
        if (rArray.test(k)) {
            k = k.slice(0, k.length - 2);
            isArr = true;
        }

        var content = data[k];

        // content 是否存在
        if (_.isUndefined(content)) {
            if (isRequire) {
                return result[key] = errMsg.isRequire;
            }
            return;
        }
        // 遍历数组找出错误
        if (isArr) {
            if (!_.isArray(content)) {
                return result[key] = errMsg.arr;
            }
            
            var errChkArr = [];
            var arrErrIndex = [];

            _.each(content, function (item, index) {
                var chkArr = checkHoney(item, exp);
                if (!_.isEmpty(chkArr)) {
                    arrErrIndex.push(index);
                    errChkArr.push(chkArr);
                }
                
            });

            if (errChkArr.length === 0) {
                return;
            } else {
                var nkey = key.replace('[]', '[' + arrErrIndex.join(',') + ']');
                return result[nkey] = errChkArr;
            }
        }

        // 遍历Obj 找出错误
        if (_isObject(exp)) {
            if (!_isObject(content)) {
                return result[key] = errMsg.obj;
            }
            var chkObj = checkHoney(content, exp);
            if (!_.isEmpty(chkObj)) {
                result[key] = chkObj;
            }
        }

        // 判断规则为 function
        if (_.isFunction(exp)) {
            var re = exp(content)
            if (!_.isBoolean(re) || !re) {
                return result[key] = re;
            }
        }

        // 判断规则为正则
        if (_.isRegExp(exp) && !exp.test(content)) {
            return result[key] = errMsg.reg.replace('$r', exp).replace('$content', content);
        }

        // 判断规则为字符串 String 
        var judge = _['is' + exp];
        if (_.isFunction(judge) && !judge(content)) {
            return result[key] = errMsg.ty.replace('$t', exp).replace('$content', content);
        }
    });
    
    return result;
}

// 检查 harvest 数据
function checkHarvest(harvest) {
    // 整个对象为空
    if (!harvest) {
        return {
            harvest: '整个对象为空'
        };
    }

    var tag = harvest.tag,
        flower = harvest.flower,
        honey = harvest.honey;

    // 所有数据都为空
    if (!flower && !honey) {
        return {
            flower: 'flower 为空',
            honey: 'honey 为空'
        };
    }

    // 只有 flower 的情况，长度不能为 0
    if (!honey && flower && flower.length === 0) {
        return {
            flower: '只有 flower 的情况，长度不能为 0'
        };
    }

    // 有 honey 的情况，对应的 Tag 不能为空
    if (honey) {
        if (!tag) {
            return {
                tag: '有 honey 的情况，对应的 tag 不能为空'
            };
        }

        var checkTpl = models[tag];

        // 检查校验方法是否存在
        if (!_.isObject(checkTpl)) {
            // 没有对应的数据模型定义，不做校验
            return null;
        }

        // honey 为数组的情况
        if (_.isArray(honey)) {
            var cb = []
            _.each(honey, function(item) {
                var chkRe = checkHoney(item, checkTpl);
                if (!_.isEmpty(chkRe)) {
                    cb.push(chkRe);
                }
            })
            return cb;

        } else {
            // 返回校验结果
            return checkHoney(honey, checkTpl);
        }
    // 没有 honey 的情况，已经通过 flower 检查
    } else {
        return null;
    }
}

// 初始化
function init() {
    // 加载模型
    loadModel();

    isInit = true;
}

/**
 * @params {Object} harvest 
 * @return {Object}
 * {
        pass: {Boolean}, // ture 无错通过 || false 有错
        message: {} // 错误信息
    }    
 */
function check(harvest) {
    if (!isInit) {
        init();
    }

    var pass = true;
    var messages = [];
    var result;
    
    // 处理 harvest 是数组的情况
    if (_.isArray(harvest)) {
        _.each(harvest, function (item) {
            result = checkHarvest(item);
            if (!_.isEmpty(result)) {
                pass = false;
                messages.push(result);
            }
        });

    // 处理单个 harvest 的情况
    } else {
        result = checkHarvest(harvest);
        if (!_.isEmpty(result)) {
            pass = false;
            messages.push(result);
        }
    }

    return {
        pass: pass,
        message: messages
    };
};

exports.check = check;
