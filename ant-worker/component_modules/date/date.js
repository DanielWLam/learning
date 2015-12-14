var timezone = {
        'us': -8,
        'br': -2,
        'ru': +3,
        'in': +5.5,
        'id': +7,
        'th': +7,
        'vn': +7,
        'cn': +8
    };

function updateTimezone(date, code) {
    var millisecondsOffset = millisecondsOffsetWith(code);
    date.setTime(date.getTime() - millisecondsOffset);
    return date;
}
exports.updateTimezone = updateTimezone;

function minutesOffsetWith(code) {
    var date = new Date(),

        timezoneOffset = - timezone[code] * 60,
        localeTimezoneOffset = date.getTimezoneOffset(),
        minutesOffset = timezoneOffset - localeTimezoneOffset;

    return minutesOffset;
}
exports.minutesOffsetWith = minutesOffsetWith;

function secondsOffsetWith(code) {
    return minutesOffsetWith(code) * 60;
}
exports.secondsOffsetWith = secondsOffsetWith;

function millisecondsOffsetWith(code) {
    return minutesOffsetWith(code) * 60 * 1000;
}
exports.millisecondsOffsetWith = millisecondsOffsetWith;