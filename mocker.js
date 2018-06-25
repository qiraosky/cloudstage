//引用的接口，重启 webpack 才会生效
const legcy = require('./mocker/legcy');
const paasPortal = require('./mocker/paas-portal');
const paasIam = require('./mocker/paas-iam');
const saasDemo = require('./mocker/saas-demo');

//在此页面的接口调整保存即生效
const fastApi = {
    'GET /demo/test': (req, res) => {
        res.send({ status: 'ok', message: '333保存成功 ！' });
    }
}
 
module.exports = Object.assign(
    fastApi
    ,legcy
    ,paasPortal
    ,paasIam
    ,saasDemo
);