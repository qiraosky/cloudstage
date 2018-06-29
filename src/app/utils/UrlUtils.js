const getUrlParam =  function (query) {
    query = query.substr(1)
    var reg = /([^=&\s]+)[=\s]*([^&\s]*)/g;
    var obj = {};
    while (reg.exec(query)) {
        obj[RegExp.$1] = RegExp.$2;
    }
    return obj;
}

export default {
    getUrlParam
}