//引用的接口，重启 webpack 才会生效
const legcy = require('./mocker/legcy');
const paasPortal = require('./mocker/paas-portal');
const paasIam = require('./mocker/paas-iam');
const saasDemo = require('./mocker/saas-demo');

const uuid = require('node-uuid');

const demoGridDataList = [];

for(let i=1;i<=30;i++){
    let bean = {
        userId:uuid.v4(),
        gender:i%2?'男':'女',
        name:{
            first:"姓名",
            last:i
        },
        email:`admin${i}@admin.com`
    }
    demoGridDataList.push(
        bean
    )
    console.log(JSON.stringify(bean))
}


//在此页面的接口调整保存即生效
const fastApi = {
    'GET /demo/test': (req, res) => {
        res.send({ status: 'ok', message: '333保存成功 ！' });
    },
    'POST /demo/gridData':(req, res) => {
        let param = req.body;
        console.log(param)
        let returnVal = {
            info: {
                "seed": "0e03f93fd1dad64e", 
                "pageSize": 10, 
                "total":demoGridDataList.length,
                "page": 1, 
                "version": "1.2"
            },
            results:[]
        };

        if(!param.pageSize){
            param.pageSize = 5;
        }
        if(!param.page){
            param.page = 0
        }else{
            param.page = param.page -1;
        }
        let start = param.pageSize * param.page ;
        for(let i = start  ;i< start + param.pageSize; i++){
               if(demoGridDataList[i])
                    returnVal.results.push(demoGridDataList[i]);
        }

        res.send(returnVal);
    },
    'POST /demo/deleteGridData':(req, res) => {
        let param = req.body;
        let deleteCount = 0;
        for(let i=0;i<demoGridDataList.length;i++){
            if(param.userId == demoGridDataList[i].userId){
                let bean = demoGridDataList.splice(i,1);
                deleteCount ++ ;
                console.log(bean)
                break;
            } 
        }
        res.send({ status: 'ok', message: '删除成功 ！' ,deleteCount: deleteCount}); 
    },
    'POST /demo/getData':(req, res) => {
        let param = req.body;
        for(let i=0;i<demoGridDataList.length;i++){
            if(param.userId == demoGridDataList[i].userId){
                let bean = demoGridDataList[i];
                res.send({ status: 'ok', user: bean}); 
                return;
            }
        }
        res.send({ status: 'not found', user: {}}); 
    },
    'POST /demo/saveData':(req, res) => {
        let param = req.body;
        param.userId = uuid.v4()
        demoGridDataList.push(param)
        res.send({ status: 'ok', user: demoGridDataList[demoGridDataList.length-1]}); 
    },
    'POST /demo/updateData':(req, res) => {
        let param = req.body;
        for(let i=0;i<demoGridDataList.length;i++){
            if(param.userId == demoGridDataList[i].userId){
                demoGridDataList[i] = param;
                res.send({ status: 'ok', user: demoGridDataList[i]}); 
                return;
            }
        }
        res.send({ status: 'not found', user: {}}); 
    }
}
 
module.exports = Object.assign(
    fastApi
    ,legcy
    ,paasPortal
    ,paasIam
    ,saasDemo
);