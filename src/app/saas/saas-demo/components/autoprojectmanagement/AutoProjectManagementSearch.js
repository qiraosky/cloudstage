import React from 'react';
import { Form, Row, Col, Input, Button, Icon , Select , DatePicker , TreeSelect} from 'antd';
import AutoForm from '../../../../components/autoform';

class AutoProjectManagementSearch extends React.Component {
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
        const children = [{
            itemKey:"projectCode",
            name:"项目编码",
            hide:()=>(false),
            render:(item)=>(<Input placeholder={item.name} />)
        },{
            itemKey:"name",
            name:"项目名称",
            hide:()=>(false),
            render:(item)=>(<Input placeholder={item.name} />)
        },{
            itemKey:"starttime",
            name:"开始时间",
            hide:()=>(false),
            render:(item)=>(<DatePicker.RangePicker />)
        },{
            itemKey:"principal",
            name:"负责人",
            hide:()=>(!this.state.expand),
            render:(item)=>(
            <Select span={6} placeholder={item.name}>
                <Select.Option value="约翰">约翰</Select.Option>
                <Select.Option value="杰克">杰克</Select.Option>
                <Select.Option value="彼得">彼得</Select.Option>
             </Select>)
        }];
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

AutoProjectManagementSearch = Form.create()(AutoProjectManagementSearch);
export default AutoProjectManagementSearch;