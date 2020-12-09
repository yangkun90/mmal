require('./index.css')
var _mm = require('util/mm.js')
var templateIndex=require('./index.string')
//页面头部
var navSide = {
    option:{
        name:'',
        navList:[
            {name:'user-center',desc:'个人中心',href:'./user-center.html'},
            {name:'order-list',desc:'我的密码',href:'./order-list.html'},
            {name:'pass-update',desc:'修改密码',href:'./pass-update.html'},
            {name:'about',desc:'关于YKMALL',href:'./about.html'},
        ]
    },
    init: function (option) {
        //合并
        $.extend(this.option,option);
        this.renderNav();
    },
    renderNav: function () {
        for(var i=0,iLength=this.option.navList.length;i<iLength;i++){
            if(this.option.navList[i].name===this.option.name){
                this.option.navList[i].isActive=true
            }
        }
        //渲染list数据
        var navHtml=_mm.renderHtml(templateIndex,{
            navList:this.option.navList
        });
        $('.nav-side').html(navHtml)
    }

};

module.exports=navSide;