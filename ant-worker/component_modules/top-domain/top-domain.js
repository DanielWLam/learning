var fs = require('fs'),
    path = require('path'),

    punycode = require('./punycode'),
    suffixList = require('./publicsuffixlist'),

    suffixData = fs.readFileSync(path.resolve(__dirname, 'tld.dat'), 'utf8'),

    // 1 = protocol, 2 = auth, 3 = domain, 4 = port, 5 = path
    urlParts = /^(https?:\/\/)?(.+@)?(.+?)(:\d{2,5})?(\/.*)?$/,
    isInit = false;

function init(argument) {
    suffixList.parse(suffixData, punycode.toASCII);

    isInit = true;
}

function get(url) {
    if (!isInit) {
        init();
    }

    if (!url
        || typeof url !== "string") {
        return null;
    }

    var urlSplit = url.toLowerCase().match(urlParts),
        domain = urlSplit[3];

    return suffixList.getDomain(domain) || null;
}
exports.get = get;