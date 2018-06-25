//引用的接口，重启 webpack 才会生效
const legcy = require('./mocker/legcy');
const paasPortal = require('./mocker/paas-portal');
const paasIam = require('./mocker/paas-iam');
const saasDemo = require('./mocker/saas-demo');

//在此页面的接口调整保存即生效
const fastApi = {
    'GET /demo/test': (req, res) => {
        res.send({ status: 'ok', message: '333保存成功 ！' });
    },
    //顶部menu
    'POST /paas-iam/menu/getTopMenu':(req, res) =>{
        const topMenuData = [
            {name:"项目管理",keyCode:"key1"},
            {name:"预算管理",keyCode:"key2"},
            {name:"统计分析",keyCode:"key3"},
            {name:"系统管理",keyCode:"key4"}
        ]
        return res.send(topMenuData);
    }
}
 
module.exports = Object.assign(
    fastApi
    ,legcy
    ,paasPortal
    ,paasIam
    ,saasDemo
);