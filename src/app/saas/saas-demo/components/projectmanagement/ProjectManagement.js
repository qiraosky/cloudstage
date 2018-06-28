import React from 'react';
import { Form, Row, Col, Input, Button, Icon , Divider, Select , DatePicker , Switch , TreeSelect} from 'antd';
import ProjectManagementGrid from './ProjectManagementGrid';

const SearchFormItem = (props)=>{
    return (<Col span={8} style={{ padding:"0px 12px",display: !props.hide ? 'block' : 'none' }}>
                <Form.Item label={props.name}>
                {props.getFieldDecorator(props.itemKey, {
                    rules: [{
                    required: props.required,
                    message: props.message,
                    }],
                })(props.children)}
                </Form.Item>
            </Col>);
}


class ProjectManagement extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            expand: false,
            gridSearchParam:{}
        };
        this.searchData = this.searchData.bind(this);
    }//end of constructor

    toggle = () => {
        const { expand } = this.state;
        this.setState({ expand: !expand });
    }

    handleReset = () => {
        this.props.form.resetFields();
        this.searchData({})
    }

    handleSearch = () => {
        this.props.form.validateFields((err, values) => {
            this.searchData(values,err)
        });
    }

    searchData = (fromValues,err) =>{
        this.setState({
            gridSearchParam:{...fromValues}
        })
    }

    getFields() {
        const { getFieldDecorator } = this.props.form;
        const children = [];
        
        children.push(
            <SearchFormItem  key="projectCode"  itemKey="projectCode" name="项目编码"
                getFieldDecorator={getFieldDecorator}>
                <Input placeholder="项目编码" />
            </SearchFormItem>
        );

        children.push(
            <SearchFormItem key="name" itemKey="name" name="项目名称"
                getFieldDecorator={getFieldDecorator}>
                <Input placeholder="项目名称" />
            </SearchFormItem>
        );

        children.push(
            <SearchFormItem key="starttime" itemKey="starttime" name="开始时间"
                getFieldDecorator={getFieldDecorator}>
                <DatePicker.RangePicker />
            </SearchFormItem>
        );

        children.push(
            <SearchFormItem key="endtime" itemKey="endtime" name="结束时间" hide={!this.state.expand}
                getFieldDecorator={getFieldDecorator}>
                <DatePicker.RangePicker />
            </SearchFormItem>
        );

        children.push(
            <SearchFormItem key="principal" itemKey="principal" name="负责人" hide={!this.state.expand}
                getFieldDecorator={getFieldDecorator}>
                <Select span={6}>
                      <Select.Option value="zhangsan">张三</Select.Option>
                      <Select.Option value="lisi">李四</Select.Option>
               </Select>
            </SearchFormItem>
        );

        return children;
    }

    render(){
        return (
        <div>
            <Form
                className="ant-advanced-search-form"
                onSubmit={this.handleSearch}
            >
            <Row gutter={24}>{this.getFields()}</Row>
            <Row>
                <Col span={24} style={{ textAlign: 'right' }}>
                <Button type="primary" htmlType="submit">查询</Button>
                <Button style={{ marginLeft: 8 }} onClick={this.handleReset}>
                    清空
                </Button>
                </Col>
            </Row>
            <div style={{width:"100%",textAlign:"center"}}>
                <a style={{ marginLeft: 8, fontSize: 12 }} onClick={this.toggle}>
                {!this.state.expand ? '展开查询' : '收起查询'} <Icon type={this.state.expand ? 'up' : 'down'} />
                </a>
            </div>
            </Form>
            <ProjectManagementGrid search={this.state.gridSearchParam}/>
        </div>
        )
    }
}

ProjectManagement = Form.create()(ProjectManagement);
export default ProjectManagement;