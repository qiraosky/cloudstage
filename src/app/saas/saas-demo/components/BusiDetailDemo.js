import React from 'react';
import { Form, Row, Col, Input, Button, Icon , Divider , Select , DatePicker , Switch , TreeSelect , TreeNode} from 'antd';
import { Link } from 'react-router-dom';
import { getUrlParam } from '../../../utils/UrlUtils';
import { http } from '../../../utils/HttpUtils';

class DetailLayout extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            user:{
                userId:"",
                name:{
                    first:"",
                    last:""
                },
                email:""
            }
        }
        console.log(this.props)
        this.state.userId = this.props.paramobj.userId;
        this.state.name = this.props.paramobj.name;
        this.loadUser(this.state.userId);
    }

    loadUser(userId){
        http({
            url:'/demo/getData',
            data:{
              userId:userId
            }
          }).then((req)=>{
             this.setState({
                 user:req.data.user
             })
          })
    }

    render(){
        return(
            <div style={{padding:"0px 10px 10px 10px"}}>
                <Divider orientation="right">
                    <Link to='/demo/busiTableDemo' title='返回' >
                        返回
                    </Link>
                </Divider>
                <Row gutter={16} style={{padding:"6px 0px 6px 0px"}}>
                    <Col className="gutter-row" span={2} style={{fontWeight:"bold"}}>
                        用户ID：
                    </Col>
                    <Col className="gutter-row" span={7}>
                        {this.state.user.userId}
                    </Col>
                    <Col className="gutter-row" span={2}>
                    </Col>
                    <Col className="gutter-row" span={2} style={{fontWeight:"bold"}}>
                        用户名：
                    </Col>
                    <Col className="gutter-row" span={7}>
                            {this.state.user.name.first + this.state.user.name.last}
                    </Col>
                </Row>
                <Row gutter={16} style={{padding:"6px 0px 6px 0px"}}>
                    <Col className="gutter-row" span={2} style={{fontWeight:"bold"}}>
                        性别
                    </Col>
                    <Col className="gutter-row" span={7}>
                        {this.state.user.gender}
                    </Col>
                    <Col className="gutter-row" span={2}>
                    </Col>
                    <Col className="gutter-row" span={2} style={{fontWeight:"bold"}}>
                        出生年月
                    </Col>
                    <Col className="gutter-row" span={7}>
                        1990-01-01
                    </Col>
                </Row>
                <Row gutter={16} style={{padding:"6px 0px 6px 0px"}}>
                    <Col className="gutter-row" span={2} style={{fontWeight:"bold"}}>
                        状态
                    </Col>
                    <Col className="gutter-row" span={7}>
                        启用
                    </Col>
                    <Col className="gutter-row" span={2}>
                    </Col>
                    <Col className="gutter-row" span={2} style={{fontWeight:"bold"}}>
                        组织机构
                    </Col>
                    <Col className="gutter-row" span={7}>
                        第一分公司-研发部
                    </Col>
                </Row>
                <Row gutter={16} style={{padding:"6px 0px 6px 0px"}}>
                    <Col className="gutter-row" span={2} style={{fontWeight:"bold"}}>
                        电子邮箱
                    </Col>
                    <Col className="gutter-row" span={7}>
                            {this.state.user.email}
                    </Col>
                    <Col className="gutter-row" span={2}>
                    </Col>
                    <Col className="gutter-row" span={2} style={{fontWeight:"bold"}}>
                    
                    </Col>
                    <Col className="gutter-row" span={7}>
                       
                    </Col>
                </Row>
            </div>
        )


    }


}




class BusiDetailDemo extends React.Component{
    render(){
        let paramobj = getUrlParam(this.props.location.search);
        return (
            <div><DetailLayout paramobj={paramobj}/> </div>
        );
    }
}
export default BusiDetailDemo;