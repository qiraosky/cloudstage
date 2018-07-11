import React from 'react';
import { Form, Row, Col, Input, Button, Icon , Select , DatePicker , TreeSelect} from 'antd';
import AutoForm from '../../../../../components/autoform';

class CommonSearch extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            expand: false
        };
    }//end of constructor

    searchFrom = []

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

    getFields = ()=> {
        const { getFieldDecorator } = this.props.form;
        const children = this.searchFrom
        return (
            <AutoForm.AutoSearchForm.SearchForm
                formItems = {children}
                getFieldDecorator = {getFieldDecorator}
            />
        )
        
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


export default CommonSearch;