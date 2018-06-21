import axios from 'axios';

  //添加响应拦截器
  axios.interceptors.response.use(function(response){
    //对响应数据做些事
    //console.log(response)
    console.log("interceptors")
    return response;
  },function(error){
    //请求错误时做些事
    return Promise.reject(error);
  });