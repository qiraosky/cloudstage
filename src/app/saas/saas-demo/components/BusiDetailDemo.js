import React from 'react';
import { Form, Row, Col, Input, Button, Icon , Divider , Select , DatePicker , Switch , TreeSelect , TreeNode} from 'antd';
import { Link } from 'react-router-dom';

class DetailLayout extends React.Component {

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
                        123456
                    </Col>
                    <Col className="gutter-row" span={2}>
                    </Col>
                    <Col className="gutter-row" span={2} style={{fontWeight:"bold"}}>
                        用户名：
                    </Col>
                    <Col className="gutter-row" span={7}>
                        张三
                    </Col>
                </Row>
                <Row gutter={16} style={{padding:"6px 0px 6px 0px"}}>
                    <Col className="gutter-row" span={2} style={{fontWeight:"bold"}}>
                        性别
                    </Col>
                    <Col className="gutter-row" span={7}>
                        男
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

            </div>
        )


    }


}




class BusiDetailDemo extends React.Component{
    render(){
        return (
            <div><DetailLayout/> </div>
        );
    }
}
export default BusiDetailDemo;