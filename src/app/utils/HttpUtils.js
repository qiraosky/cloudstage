import axios from 'axios';
import jQuery from 'jquery';

const http = (config) => {
  if(!config){
    config = {}
  }
  //默认请求为 post 请求
  config.method = config.method?config.method:'post';
  //实现params 和 data 的混写
  if('get'==config.method && !config.params && config.data){
    config.params = config.data
  }
  //实现params 和 data 的混写
  if('post'==config.method && config.params && !config.data ){
    config.data = config.params
  }
  if(!config.headers){
    config = {
      headers:{
        'Content-Type': 'application/json'
      },
      ...config
    };
  }
  return axios(config);
}

//get 别名
const httpGet = (config) => {
  config.method = 'get';
  return  http(config)
}
//post 别名
const httpPost = (config) => {
  config.method = 'post';
  return  http(config)
}

//同步方法别名
//注意同步方法使用了 jquery 实现，因此不受拦截器的限制，所以出错不会弹出错误框
const syncHttp = (httpParam) =>{
  var $ = jQuery;
  $.support.cors = true;
  var data={};
  var _httpParam = {
             type:"POST",
             async: false,
             dataType:"json",
             contentType: "application/json"
      };
      
      if(httpParam){
          for(var item in httpParam){
              if(httpParam[item]){
                  _httpParam[item] = httpParam[item];
              }
          }
      }

      if("function" == typeof(httpParam.success)){
          _httpParam.success = function(msg){
                 data=msg;
                 httpParam.success(data);
          }
      }else{
          _httpParam.success = function(msg){
                 data=msg;
          }
      }
     
      _httpParam.async = false;
      $.ajax(_httpParam);
      return data;
}



export {
  http,
  httpGet,
  httpPost,
  syncHttp
}