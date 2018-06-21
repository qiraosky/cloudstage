import React from 'react'
import { httpGet, httpPost } from '../../utils/HttpUtils';
import { Button } from 'antd';

class HttpUtilsDemo extends React.Component {
    constructor(props){
        super(props)
        this.state = { 
            dataGetUserList:[],
            dataPostUserList:[]
        }
        this.getUserList = this.getUserList.bind(this)
        this.postUserList = this.postUserList.bind(this)
    }
    

    getUserList(){
        let _this = this;
        httpGet({
            url:"/api/user/getlist",
            data:{
                id:100,
                name:"get request"
            }
        }).then(function(resp){
            _this.setState({
                dataGetUserList:JSON.stringify(resp.data)
            })
            console.log(resp)
        }).catch(function(err){
            console.log(err)
        }); 

    }

    postUserList(){
        let _this = this;
        httpPost({
            url:"/api/user/postlist",
            data:{
                id:100,
                name:"post request"
            }
        }).then(function(resp){
            _this.setState({
                dataPostUserList:JSON.stringify(resp.data)
            })
            console.log(resp)
        }).catch(function(err){
            console.log(err)
        }); 
    }

    getSomeReqSendError(){
        httpGet({
            url:"/api/someReqSendError",
            data:{
                id:100
            }
        }).then(function(resp){
            console.log(resp)
        }).catch(function(err){
            console.log(err)
        }); 

    }

    render() {
        return (
            <div>
                <Button type="primary" onClick={this.getUserList}>点击Get查询</Button><br/>
                {this.state.dataGetUserList}<br/><br/>
                <Button type="primary" onClick={this.postUserList}>点击Postt查询</Button><br/>
                {this.state.dataPostUserList}<br/><br/>
                <Button type="primary" onClick={this.getSomeReqSendError}>点击报错提示</Button>
                
            </div>
        )
    } 
}
export default HttpUtilsDemo;