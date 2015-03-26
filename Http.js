/**
 * @author  Petrus.Law (petrus.law@outlook.com)
 * @date    2014-03-19 12:05:04
 * @desc    Http请求控件
 */

var session = null;
var Http = Http||{};

/**
 * 原生HTTP请求
 * @param {String} method 请求方式 get || post
 * @param {String} url 请求地址
 * @param {[String|Object]} 请求数据
 * @return {Response} response
 */
Http.ajax = function(method, url, data) {
    var startTime=new Date().getTime();
    data = data || null;

    var request = new XMLHttpRequest();
    request.onreadystatechange = function() {
        /*
         readyState
         0 为初始化——open函数还没调用。
         1 正在加载——open函数已调用，但send函数没有调用。
         2 已加载  ——send函数已调用。
         3 正在交互——服务器正在发送响应。
         4 完成    ——服务器完成发送响应。
         status
         404:“Not Found”
         403:“Forbidden”
         500:“Internal Server Error”
         200:“OK”这个最常用
         304:“Not Modified”   opera浏览器有时返回304
         data://www.trylife.cn/ajaxxmlhttprequest-readystate-status/
         */

        //网络中断
        if(request.status==0){
            if(request.onError) request.onError(request.status);
            return;
        }
        //网络正常
        if(request.readyState == 4) {

            if(request.status == 200 || request.status == 304){
                var endTime=new Date().getTime();
                if(request.onData) {
                    if(url.indexOf("user/status")==-1) Logger.debug("请求地址："+url+" | 耗时："+((endTime-startTime)/1000).toFixed(2)+"秒 | 返回数据长度:"+(request.responseText.length/1024).toFixed(2)+"k");
                    request.onData(request.responseText);
                }
            }else{
                if(request.onError) {
                    request.onError(request.status);
                }
            }
            //释放request对象
            request.abort();
        }
    }
    // 增加对gzip数据的支持
    request.setRequestHeader("Accept-Encoding","gzip,deflate");
    request.open(method, url, true);

    // request.setRequestHeader('Accept', '*/*');
    // request.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    // request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');

    /*
     *  data header
     *  data://en.wikipedia.org/wiki/List_of_HTTP_headers#Requests
     */
    request.setRequestHeader('Cookie', session);

    if (data instanceof Object) {
        data = JSON.stringify(data);
        //data://en.wikipedia.org/wiki/Mime_type
        request.setRequestHeader('Content-Type', 'application/json');
    }
    // request.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    request.send(data);

    return request;
};

/**
 * Make data GET request to server-side
 * @param {String} url
 */
Http.get = function(url) {
    return Http.ajax('GET', url);
};

/**
 * Make data POST request to server-side
 * @param {String} url
 * @param {String|Object} data
 * @param {String|Object} type "Accept" header value
 * @returns {request}
 */
Http.post = function(url, data) {
    return Http.ajax('POST', url, data);
};


