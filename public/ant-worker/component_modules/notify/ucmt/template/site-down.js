module.exports = {
    // 采集的时间, 必须是10位的unixtime格式
    timestamp: function (data) {
        return data.timestamp || Math.floor(Date.now() / 1000);
    },
    // 必须为usa-app4,UCMT监控项要求的
    // 必须是监控系统上在线的机器，并且该机器需要添加了对应的监控项
    host_name: function (data) {
        return data.host || 'usa-app4';
    },
    // 监控项名称;必填
    svc_description: function (data) {
        return data.svc || 'usa-app4';
    },
    // 监控脚本执行后的返回值，取值范围为0－4分别对应：OK,Warning,Critical,Unknown,等;必填
    return_code: function (data) {
        return data.code || 2;
    },
    // 指令执行后输出的内容
    plugin_output: function (data) {
        return data.msg;
    }
}