//引用的接口，重启 webpack 才会生效
const legcy = require('./mocker/legcy');
const paasPortal = require('./mocker/paas-portal');
const paasIam = require('./mocker/paas-iam');
const saasDemo = require('./mocker/saas-demo');

const uuid = require('node-uuid');

const projectList = [];

for(let i=1;i<=30;i++){
    let bean = {
        projectId:uuid.v4(),
        projectCode:`AWVBD${i<10?"0"+i:i}`,
        name:`项目${i}`,
        status:i%3==0?'end':i%2==0?'pending':'start',
        starttime:new Date(),
        endtime:new Date(),
        location:i%3==0?'北京':i%2==0?'上海':'广州',
        principal:i%3==0?'杰克':i%2==0?'约翰':'彼得',
    }
    projectList.push(
        bean
    )
    console.log(JSON.stringify(bean))
}


//在此页面的接口调整保存即生效
const fastApi = {
    'GET /demo/test': (req, res) => {
        res.send({ status: 'ok', message: '测试成功 ！' });
    },
    'POST /demo/listProject':(req, res) => {
        let param = req.body;
        console.log(param)
        let returnVal = {
            info: {
                "seed": "0e03f93fd1dad64e", 
                "pageSize": 10, 
                "total":projectList.length,
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
               if(projectList[i])
                    returnVal.results.push(projectList[i]);
        }

        res.send(returnVal);
    },
    'POST /demo/deleteProject':(req, res) => {
        let param = req.body;
        let deleteCount = 0;
        for(let i=0;i<projectList.length;i++){
            if(param.projectId == projectList[i].projectId){
                let bean = projectList.splice(i,1);
                deleteCount ++ ;
                console.log(bean)
                break;
            } 
        }
        res.send({ status: 'ok', message: '删除成功 ！' ,deleteCount: deleteCount}); 
    },
    'POST /demo/getProject':(req, res) => {
        let param = req.body;
        for(let i=0;i<projectList.length;i++){
            if(param.projectId == projectList[i].projectId){
                let bean = projectList[i];
                res.send({ status: 'ok', user: bean}); 
                return;
            }
        }
        res.send({ status: 'not found', user: {}}); 
    },
    'POST /demo/saveProject':(req, res) => {
        console.log("saveData processing")
        let param = req.body;
        param.projectId = uuid.v4()
        projectList.unshift(param)
        res.send({ status: 'ok', user: projectList[projectList.length-1]}); 
    },
    'POST /demo/updateProject':(req, res) => {
        console.log("updateData processing")
        let param = req.body;
        for(let i=0;i<projectList.length;i++){
            if(param.projectId == projectList[i].projectId){
                projectList[i] = param;
                res.send({ status: 'ok', user: projectList[i]}); 
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