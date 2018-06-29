import React from 'react';
import { Form, Row, Col, Input, Button, Icon , Select , DatePicker , TreeSelect} from 'antd';

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


class ProjectManagementSearch extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            expand: false,
            gridSearchParam:{}
        };
    }//end of constructor

    toggle = () => {
        const { expand } = this.state;
        this.setState({ expand: !expand });
    }

    handleReset = () => {
        this.props.form.resetFields();
        this.props.onSearch(null,null,"clear");
    }

    handleSearch = () => {
        this.props.form.validateFields((err, values) => {
            this.props.onSearch(values,err);
        });
        
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
                      <Select.Option value="john">约翰</Select.Option>
                      <Select.Option value="jack">杰克</Select.Option>
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
            >
            <Row gutter={24}>{this.getFields()}</Row>
            <Row>
                <Col span={24} style={{ textAlign: 'right' }}>
                <Button type="primary" htmlType="submit" onClick={this.handleSearch}>查询</Button>
                <Button style={{ marginLeft: 8 }} onClick={this.handleReset}>重置</Button>
                </Col>
            </Row>
            <div style={{width:"100%",textAlign:"center"}}>
                <a style={{ marginLeft: 8, fontSize: 12 }} onClick={this.toggle}>
                {!this.state.expand ? '展开查询' : '收起查询'} <Icon type={this.state.expand ? 'up' : 'down'} />
                </a>
            </div>
            </Form>
        </div>
        )
    }
}

ProjectManagementSearch = Form.create()(ProjectManagementSearch);
export default ProjectManagementSearch;