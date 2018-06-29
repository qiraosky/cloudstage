//引用的接口，重启 webpack 才会生效
const legcy = require('./mocker/legcy');
const paasPortal = require('./mocker/paas-portal');
const paasIam = require('./mocker/paas-iam');
const saasDemo = require('./mocker/saas-demo');
const uuid = require('node-uuid');
const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://appuser:111111@140.143.187.43:27017/gcable";
const version = '0.1';
/* 
//数据生成代码，请使用 node 运行
//依赖库：
//node install mongodb
//node install node-uuid

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://appuser:111111@140.143.187.43:27017/gcable";
const uuid = require('node-uuid');

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("gcable");

  	const projectList = [];
	for(let i=1;i<=60;i++){
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

  dbo.collection("project").insertMany(projectList, function(err, res) {
      if (err) throw err;
      console.log("文档插入成功");
      db.close()
  });
}); */


//在此页面的接口调整保存即生效
const fastApi = {
    'GET /demo/test': (req, res) => {
        res.send({ status: 'ok', message: '测试成功 ！' });
    },
    'POST /demo/listProject': (req, res) => {
        let param = req.body;
        let returnVal = {
            info: {
                "seed": "0e03f93fd1dad64e", 
                "pageSize": 10, 
                "total":0, 
                "page": 1, 
                "version": version
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

        MongoClient.connect(url, function(err, db) {
            if (err) throw err;
            var dbo = db.db("gcable");
             var whereStr = {};  // 查询条件
            dbo.collection("project").find(whereStr).skip(start).limit(param.pageSize).toArray(function(err, result) {
                if (err) throw err;
                db.close();
                returnVal.results = result;
                MongoClient.connect(url, function(err, db) {
                    if (err) throw err;
                    var dbo = db.db("gcable");
                     var whereStr = {};  // 查询条件
                    dbo.collection("project").count(whereStr,function(err, result) {
                        if (err) throw err;
                        db.close();
                        console.log(result)
                        returnVal.info.total = result;
                        res.send(returnVal);
                    });
                });
                
            });
        });

        


        //res.send({ status: 'ok', message: '测试成功 ！' });
    },
    'POST /demo/deleteProject':(req, res) => {
        let param = req.body;
        MongoClient.connect(url, function(err, db) {
            if (err) throw err;
            var dbo = db.db("gcable");
            var whereStr = {projectId:param.projectId};  // 查询条件
            console.log(whereStr)
            dbo.collection("project").remove(whereStr,function(err, result) {
                if (err) throw err;
                db.close();
                console.log(result)
                res.send({ status: 'ok', message: '删除成功 ！' ,deleteCount: result.result.n});
            });
        });
    },
    'POST /demo/getProject':(req, res) => {
        let param = req.body;
        MongoClient.connect(url, function(err, db) {
            if (err) throw err;
            var dbo = db.db("gcable");
            var whereStr = {projectId:param.projectId};  // 查询条件
            console.log(whereStr)
            dbo.collection("project").find(whereStr).limit(1).toArray(function(err, result) {
                if (err) throw err;
                db.close();
                let bean = {};
                if(result && result instanceof Array && result.length > 0){
                    bean = result[0]
                }
                res.send({ status: 'ok', project: bean});
            });
        });
    },
    'POST /demo/saveProject':(req, res) => {
        let param = req.body;
        param.projectId = uuid.v4()
        MongoClient.connect(url, function(err, db) {
            if (err) throw err;
            var dbo = db.db("gcable");
          
            dbo.collection("project").insertOne(param, function(err, result) {
                if (err) throw err;
                db.close()
                res.send({ status: 'ok', project: param});
            });
        });
    },
    'POST /demo/updateProject':(req, res) => {
        let param = req.body;
        MongoClient.connect(url, function(err, db) {
            if (err) throw err;
            let dbo = db.db("gcable");
            let whereData = {projectId:param.projectId}; 
            dbo.collection("project").update(whereData, param , function(err, result) {
                if (err) throw err;
                db.close()
                res.send({ status: 'ok', project: param});
            });
        });
    }
}
 
module.exports = Object.assign(
    fastApi
    ,legcy
    ,paasPortal
    ,paasIam
    ,saasDemo
);