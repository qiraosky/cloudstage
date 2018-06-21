import axios from 'axios';
import React from 'react'
import { Modal, Button, notification, Icon } from 'antd';
import jQuery from 'jquery';


/**
 * 弹出错误详情窗口
 * @TODO: 需要把错误提示传入此组件
 * @TODO: 此组件的父组件是 notification, 因此 notification 关闭时，也会关闭模态窗口
 */
class ErrorDetailModel extends React.Component{
    constructor(props){
      super(props)
      this.state = { visible: props.visible }
    }
    
    showModal = () => {
        let $ = jQuery;
        $(".ant-notification-notice").hide();
      this.setState({
        visible: true,
      });
    }
    handleOk = (e) => {
      let $ = jQuery;
      notification.close("errorNotice")
      this.setState({
        visible: false,
      });
    }
    handleCancel = (e) => {
      let $ = jQuery;
      notification.close("errorNotice")
      this.setState({
        visible: false,
      });
    }
    render(){
        return (
            <div>
               <Button type="primary" size="small" onClick={this.showModal}>
                    详情
               </Button>
                <Modal
                    title="错误信息详情"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    footer={[
                      <Button key="确定" onClick={this.handleOk}>确定</Button>
                    ]}
                    >
                <div style={{width:"472px",height:"100px",border:"1px soild #000"}}>
                  此处为报错的详细信息：XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
                  XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX<br/>
                </div>
                </Modal>
            </div>
        )
    }

}

const openNotification = (err) => {
  notification.error({
    key:"errorNotice",
    message: err.message,
    description: <div>{err.response.statusText}</div>,
    //icon: <Icon type="frown" style={{ color: '#ff0000' }} />,
    btn: <ErrorDetailModel/>
  });
};

  //添加响应拦截器
  axios.interceptors.response.use(function(response){
    //对响应数据做些事
    return response;
  },function(err){
    //请求错误时做些事
    if (err && err.response) {
        switch (err.response.status) {
            case 400: err.message = '请求错误(400)' ; break;
            case 401: err.message = '未授权，请重新登录(401)'; break;
            case 403: err.message = '拒绝访问(403)'; break;
            case 404: err.message = '请求出错(404)'; break;
            case 408: err.message = '请求超时(408)'; break;
            case 500: err.message = '服务器错误(500)'; break;
            case 501: err.message = '服务未实现(501)'; break;
            case 502: err.message = '网络错误(502)'; break;
            case 503: err.message = '服务不可用(503)'; break;
            case 504: err.message = '网络超时(504)'; break;
            case 505: err.message = 'HTTP版本不受支持(505)'; break;
            default: err.message = `连接出错(${err.response.status})!`;
        }
    }else{
        err.message = '连接服务器失败!'
    }
    console.error(err.response)
    openNotification(err)
    return Promise.reject(err);
  });



  export {
    ErrorDetailModel
  }