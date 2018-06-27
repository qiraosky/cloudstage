import React from 'react'
import { Form, Row, Col, Input, Button, Icon , Divider , Select , DatePicker , Switch , TreeSelect , TreeNode} from 'antd';
import { Link } from 'react-router-dom';
import { getUrlParam } from '../../../utils/UrlUtils';
import { http } from '../../../utils/HttpUtils';

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
        if(this.props.operType == 'update'){
            console.log(this.props.paramobj)
            this.state.userId = this.props.paramobj.userId;
            this.state.name = this.props.paramobj.name;
            this.loadUser(this.state.userId);
        }

        this.handleChange = this.handleChange.bind(this);
        this.saveBean = this.saveBean.bind(this);
    }

    handleChange = (formName) => ((event) => {
        if(formName == "name"){
            console.log(event)
            let value = event.target.value;
            this.state.user.name.first = value.substr(0,1)
            this.state.user.name.last = value.substr(1)
        }else{
            this.state.user[formName] = event.target.value;
        }
        this.setState({user:this.state.user}); 
    })
    
    handleSelectChange = (formName) => ((value) => {
        this.state.user[formName] = value;
        this.setState({user:this.state.user}); 
    })


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

    saveBean = ()=>{
        http({
            url:this.props.operType == 'add'?'/demo/saveData':'/demo/updateData',
            data:this.state.user
          }).then((req)=>{
            message.success("保存成功");
          })
    }

    render(){
        var value = this.state.user.name.first;
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
                        <Input disabled value={this.state.user.userId}/>
                    </Col>
                    <Col className="gutter-row" span={2}>
                    </Col>
                    <Col className="gutter-row" span={2} style={{fontWeight:"bold"}}>
                        用户名：
                    </Col>
                    <Col className="gutter-row" span={7}>
                        <Input value={this.state.user.name.first + this.state.user.name.last} onChange={this.handleChange("name")}/>
                    </Col>
                </Row>
                <Row gutter={16} style={{padding:"6px 0px 6px 0px"}}>
                    <Col className="gutter-row" span={2} style={{fontWeight:"bold"}}>
                        性别
                    </Col>
                    <Col className="gutter-row" span={7}>
                        <Select defaultValue="male" style={{ width: 120 }} value={this.state.user.gender} onSelect={this.handleSelectChange("gender")}>
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
                <Row gutter={16} style={{padding:"6px 0px 6px 0px"}}>
                    <Col className="gutter-row" span={2} style={{fontWeight:"bold"}}>
                        电子邮箱
                    </Col>
                    <Col className="gutter-row" span={7}>
                        <Input value={this.state.user.email} onChange={this.handleChange("email")}/>
                    </Col>
                    <Col className="gutter-row" span={2}>
                    </Col>
                    <Col className="gutter-row" span={2} style={{fontWeight:"bold"}}>
                    </Col>
                    <Col className="gutter-row" span={7}>
                    </Col>
                </Row>
                <Row gutter={16} style={{padding:"26px 0px 6px 0px"}}>
                    <Col span={7}></Col>
                    <Col span={3}>
                        <Link to='/demo/busiTableDemo' title='提交' >
                            <Button type="primary" onClick={this.saveBean} >提交</Button>
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
        let operType = "";
        let paramobj = {};
        if("/demo/busiFormDemoAdd" == this.props.location.pathname){
            operType = 'add';
        }
        if("/demo/busiFormDemoUpdate" == this.props.location.pathname){
            operType = 'update';
            paramobj = getUrlParam(this.props.location.search);
        }
        return (
            <div><FormLayout operType={operType} paramobj={paramobj} /> </div>
        );
    }
}
export default BusiFormDemo;