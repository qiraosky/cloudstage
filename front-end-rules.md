# 基本规则
1，文件夹名必须小写，系统总文件夹例外，如 paas-portal, saas-demo,可以使用中横线分隔  
2，文件首字母大写，采用驼峰命名方式； 默认index 除外  
3，类名（组件名）要大写，文件名要与导出的类名相同； 
4，属性名首字母小写，采用驼峰命名方式； 方法名首字母小写，采用驼峰命名方式，方法名命名为 “动词-名词”，如列出用户为，listUser,保存用户为 saveUser; 常用命名英文：增加：add 删除 delete，修改 update，列出 list 
5，app/components 存放框架相关的组件，应用系统不能将代码放置在此目录中
6，app/utils 存放系统工具类，应用系统不能将代码放置在此目录中，Utils 文件夹中，utils 结尾的为工具类，Config结尾的为配置类，Interceptors结尾的为切面
7，redux reducer 定义首字母大写，在 combineReducers 时首字母改为小写，以表示为一个属性
8，路径的URL名应该全为小写

# 代码目录结构
-- src //源代码文件夹
|-- actions //系统redux actions
|-- components //系统组件
|-- reducers //系统 reducer
|-- utils //系统工具库
|-- paas //paas服务相关目录
    |-- paas-aim //AIM 组件
    |-- paas-portal //portal相关组件，包括布局，首页等
|-- saas //业务系统相关目录
    |-- saas-demo //演示系统


# 业务系统标准目录
|-- saas-demo
    |-- actions //本Saas系统 action 
        -- index.js // 一般情况下目录下只有一个 index.js 文件，如果 Action 过多，index.js 为暴露出的接口文件
    |-- components //组件目录，不区分 components 和 container，统一为 components
    |-- reducers //本服务要使用到的 reducer 【注意：此目录需要提交到主系统】
        -- index.js //为暴露出去的 reducers 文件
    |-- services //存放与服务器交互的请求方法
    -- index.js  //放置本Saas系统要暴露出去的组件，并 export 相关组件,修改记录