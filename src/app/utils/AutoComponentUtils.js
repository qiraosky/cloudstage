import { http } from './HttpUtils';
import { message} from 'antd';

class AutoDataFromUtils {
    constructor(config){
        if(config){
            for(let item in config){
                this[item] = config[item]
            }
        }
    }

    getEntity = (_this,url,data,getEntityFromReq) =>{
        data = data?data:this.primaryKey;
        return http({
            url:url,
            data:data
        }).then((req)=>{
            let dataEntity = {};
            if("function" == typeof(getEntityFromReq)){
                dataEntity = getEntityFromReq(req)
            }else{
                dataEntity = req.data;
            }
            _this.setState({
                dataEntity
            })
         })
    };

    saveEntity = (saveParam) => {
        let {_this, err, values, handleValues ,handleCallback, afterCallback, successMessage} = saveParam;
        if(err){
            message.warning("请按提示正确填写表单");
        }else{
            let submitEntity = values;
            if("function" == typeof(handleValues)){
                submitEntity = handleValues(submitEntity)
            }
            let httpCallPromise = null;
            if(this.type=='SAVE'){
                httpCallPromise = http({
                    url:this.saveUrl,
                    data:submitEntity
                  })
            }
            if(this.type=='UPDATE'){
                httpCallPromise = http({
                    url:this.updateUrl,
                    data:submitEntity
                  })
            }
            
            if(httpCallPromise){
                httpCallPromise.then((req)=>{
                    let dataEntity = req.data.project;
                    if("function"==typeof(handleCallback)){
                        dataEntity = handleCallback(req);
                    }else{
                        dataEntity = req.data;
                    }
                    _this.setState({
                        dataEntity
                    })
                    message.success(successMessage?successMessage:"保存成功");
                    if("function"==typeof(afterCallback)){
                        dataEntity = afterCallback(req);
                    }
                  })
            }
        }
    }//end of saveEntity
}


class AutoDataTableUtils {
    constructor(config){
        if(config){
            for(let item in config){
                this[item] = config[item]
            }
        }
    }

    listEntity = (url,params)=>(http({
        url: url,
        method: 'post',
        data: {
          pageSize: 10,
          page:1,
          ...params,
        },
        type: 'json',
      }))
    
    deleteEntity = (url,primaryKey)=>(
      http({
        url:url,
        data:primaryKey
      })
    )

}

export {
    AutoDataFromUtils,
    AutoDataTableUtils
}