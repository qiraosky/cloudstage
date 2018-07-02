# cloudstage
a framework with react react-route redux and antd ect...


Router 配置文件：  
1）全局配置：/src/app/AppRouter.js  
其中 const MINI_FRAMEWORK = false;   
true:为最小模式，不显示菜单布局，不依赖 paas-protal   
false:为普通模式，显示菜单和布局，依赖 paas-portal  

2）SaaS系统配置：/src/app/saas/saas-demo/index.js
配置路由URL和组件的对应关系，加载组件和路由都由各SAAS系统自行管理
  
reducer 配置文件：  
/src/app/AppRootReducer.js  



