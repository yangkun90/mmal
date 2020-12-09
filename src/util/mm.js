/**
 * yangkun
 *公共代码
 */
var Hogan = require('hogan.js')
var conf = {
    serverHost: ''
}
var _mm = {
    //ajax请求
    request: function (param) {
        var _this = this;
        $.ajax({
            type: param.method || 'get',
            url: param.url || '',
            dataType: param.type || 'json',
            data: param.data || '',
            success: (res) => {
                if (res.status === 0) { //判断返回值是否正确，默认0表示正确返回
                    //判断success是否是一个函数，如果是，使用回调传值
                    typeof param.success === 'function' && param.success(res.data, res.msg)
                } else if (res.status === 10) { //没有登录成功
                    _this.doLogin();
                } else if (res.status === 1) { //错误 一般是没有获取指定信息
                    typeof param.error === 'function' && param.error(res.msg)
                }
            },
            //错误回调，一般是服务器错误
            error: function (err) {
                typeof param.error === 'function' && param.error(err.statusText) //获取状态码
            }
        })
    },
    //服务器地址
    getServerUrl: function (path) {
        return conf.serverHost + path;
    },
    //获取url的参数
    getUrlParam: function (name) {
        //分组匹配四个值，其中第三个为我们需要的值
        var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)')
        var result = window.location.search.substr(1).match(reg);
        console.log(result);
        return result ? decodeURIComponent(result[2]) : null
    },
    //渲染html模板 
    renderHtml: function (htmlTemplate, data) {
        var template = Hogan.compile(htmlTemplate),
            result = template.render(data);
        return result;
    },
    //成功提示
    successTips: function (msg) {
        alert(msg || '操作成功')
    },
    //错误提示
    errorTips: function (msg) {
        alert(msg || '出错了')
    },
    //字段验证
    validate: function (value, type) {
        var value = $.trim(value);
        //非空验证
        if ('require' === type) {
            return !!value;
        }
        //手机号验证
        if ('phone' === type) {
            return /^1\d{10}$/.test(value);
        }
        //邮箱
        if ('email' === type) {
            return /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/.test(value);
        }
    },
    //登录失败跳转 get参数方式记录跳转地址 登录处理
    doLogin: function () {
        window.location.href = './login.html?redirect=' + encodeURIComponent(window.location.href);
    },
    //跳回主页
    goHome: function () {
        window.location.href = './index.html';
    }
};
module.exports = _mm;