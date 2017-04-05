var _ = require('underscore'),
    dateFormat = require('dateformat');

// 中文月份、英文月份、印地语月份、俄文月份、印尼语月份
// 同一行中不同语种的本地化月份名称的排列顺序不影响结果
// 嵌套一层的数组会被展开，因此写成['January', 'Jan']和写成'January', 'Jan'是一样的效果
var MONTHS_ARRAY = [
    ['一月', ['January', 'Jan'], 'जनवरी', 'январь', 'jan'],
    ['二月', ['February', 'Feb'], 'फरवरी', 'февраль', 'Februari'],
    ['三月', ['March', 'Mar'], 'मार्च', 'март', 'Maret'],
    ['四月', ['April', 'Apr'], 'अप्रैल', 'апреля', 'April'],
    ['五月', 'May', 'मई', 'мая', 'Mei'],
    ['六月', ['June', 'Jun'], 'जून', 'июнь', 'Juni'],
    ['七月', ['July', 'Jul'], 'जुलाई', 'июль', 'Juli'],
    ['八月', ['August', 'Aug'], 'अगस्त', 'август', 'Agustus'],
    ['九月', ['September', 'Sep'], ['सितंबर', 'सितम्बर'], ['сентябрь', 'сентября'], 'September'],
    ['十月', ['October', 'Oct'], 'अक्टूबर', 'октября', 'Oktober'],
    ['十一月', ['November', 'Nov'], 'नवंबर', 'ноября', 'November'],
    ['十二月', ['December', 'Dec'], 'दिसंबर', 'декабрь', 'Desember']
];
var MONTHS_MAP = {};
var PATTERN = {
    'yyyy' : ['([0-9]{4})', 'year'],
    'mm' : ['([0-9]{1,2})', 'month'],
    'MM' : ['([^0-9]*)', 'month'],
    'dd' : ['([0-9]{1,2})', 'day'],
    'H' : ['([0-9]{1,2})', 'hour'],
    'I' : ['([0-9]{1,2})', 'minute'],
    'S' : ['([0-9]{1,2})', 'second'],
    'X' : ['([APap][Mm])', 'noon']
};

function init() {
    _.each(MONTHS_ARRAY, function (names, index) {
        _.each(names, function (name) {
            if (_.isArray(name)) {
                _.each(name, function (n) {
                    MONTHS_MAP[n] = index + 1;
                })
            } else {
                MONTHS_MAP[name] = index + 1;
            }
        });
    });
}

function fmt2regex(fmt, pos) {
    var arr = [];
    var regex = fmt.replace('(', '\\(').replace(')', '\\)');
    _.each(PATTERN, function (pat, cat) {
        regex = regex.replace(cat, pat[0]);
        var index = fmt.indexOf(cat);
        if (index !== -1) {
            arr.push({
                cat: pat[1],
                index: index
            });
        }
    });
    arr = _.sortBy(arr, 'index');
    _.each(arr, function (data, index) {
        pos[ data['cat'] ] = index;
    });
    return regex;
}

function monthByMM(month) {
    var m = MONTHS_MAP[month];
    return m || 0;
}

function resultByPos(results, pos, cat) {
    var index = pos[cat];
    if (index != 0 && !index) {
        if (cat === 'year') {
            return (new Date()).getFullYear();
        } else {
            return 0;
        }
    }
    index++;
    var val = results[index];
    var n = parseInt(val), result;
    if (!isNaN(n)) {
        if (cat === 'hour' && pos['noon']) {
            var noon = results[ pos['noon'] + 1 ];
            if (noon.match(/PM/i) && n < 12) {
                n += 12;
            }
        }
        result = n;
    } else if (cat === 'month') { // 对于不能解析为数字的月份信息，尝试按照本地化的方式查表转换
        result = monthByMM(val);
    } else {
        result = 0;
    }
    return result;
}

// 将给定的字符串解析为时间
function from(str, fmt) {
    var pos = {},
        regex = fmt2regex(fmt, pos),
        results = str.match(regex);

    if (!results) {
        console.log('Pattern `' + fmt + '\' not match string `' + str + '\'');
        return null;
    }

    var year = resultByPos(results, pos, 'year'),
        month = resultByPos(results, pos, 'month'),
        day = resultByPos(results, pos, 'day'),
        hour = resultByPos(results, pos, 'hour'),
        minute = resultByPos(results, pos, 'minute'),
        second = resultByPos(results, pos, 'second');

    var tm = year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second;
    return Date.parse(tm);
}

// TODO
// 格式化时间
// 暂时不需要做
function format() {

}

exports.init = init;
exports.from = from;
exports.format = format;
