import React from 'react'
import { Form, Row, Col, Input, Button, Icon , Divider , Select , DatePicker , Switch , TreeSelect , TreeNode} from 'antd';
import { Link } from 'react-router-dom';

const treeData = [{
    label: '总公司',
    value: '0-0',
    key: '0-0',
    children: [{
      label: '第一分公司',
      value: '0-0-1',
      key: '0-0-1',
      children: [{
            label: '财务部',
            value: '0-0-1-1',
            key: '0-0-1-1',
        },{
            label: '研发部',
            value: '0-0-1-2',
            key: '0-0-1-2',
        }
      ]
    }, {
      label: '第二分公司',
      value: '0-0-2',
      key: '0-0-2',
    }],
  }];


class FormLayout extends React.Component {

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
                        <Input disabled/>
                    </Col>
                    <Col className="gutter-row" span={2}>
                    </Col>
                    <Col className="gutter-row" span={2} style={{fontWeight:"bold"}}>
                        用户名：
                    </Col>
                    <Col className="gutter-row" span={7}>
                        <Input/>
                    </Col>
                </Row>
                <Row gutter={16} style={{padding:"6px 0px 6px 0px"}}>
                    <Col className="gutter-row" span={2} style={{fontWeight:"bold"}}>
                        性别
                    </Col>
                    <Col className="gutter-row" span={7}>
                        <Select defaultValue="male" style={{ width: 120 }} >
                            <Option value="male">男</Option>
                            <Option value="famale">女</Option>
                        </Select>
                    </Col>
                    <Col className="gutter-row" span={2}>
                    </Col>
                    <Col className="gutter-row" span={2} style={{fontWeight:"bold"}}>
                        出生年月
                    </Col>
                    <Col className="gutter-row" span={7}>
                        <DatePicker />
                    </Col>
                </Row>
                <Row gutter={16} style={{padding:"6px 0px 6px 0px"}}>
                    <Col className="gutter-row" span={2} style={{fontWeight:"bold"}}>
                        状态
                    </Col>
                    <Col className="gutter-row" span={7}>
                        <Switch defaultChecked />
                    </Col>
                    <Col className="gutter-row" span={2}>
                    </Col>
                    <Col className="gutter-row" span={2} style={{fontWeight:"bold"}}>
                        组织机构
                    </Col>
                    <Col className="gutter-row" span={7}>
                    <TreeSelect
                        showSearch
                        style={{ width: 300 }}
                        dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                        placeholder="请选择"
                        allowClear
                        treeDefaultExpandAll
                        treeData={treeData}
                    />
                    </Col>
                </Row>
                <Row gutter={16} style={{padding:"26px 0px 6px 0px"}}>
                    <Col span={7}></Col>
                    <Col span={3}>
                        <Link to='/demo/busiTableDemo' title='提交' >
                            <Button type="primary">提交</Button>
                        </Link>
                    </Col>
                    <Col span={3}>
                            <Button>重置</Button>
                    </Col>
                    <Col span={8}></Col>
                    
                    
                    
                </Row>
            </div>
        )


    }


}



class BusiFormDemo extends React.Component{
    render(){
        return (
            <div><FormLayout/> </div>
        );
    }
}
export default BusiFormDemo;