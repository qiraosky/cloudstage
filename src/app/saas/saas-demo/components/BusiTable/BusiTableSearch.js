import React from 'react'
import { Form, Row, Col, Input, Button, Icon , Divider, Select , DatePicker , Switch , TreeSelect} from 'antd';
const FormItem = Form.Item;
import BusiTableGrid from './BusiTableGrid';

const SearchFormItem = (props)=>{
    return (
      <Col span={props.span} key={props.key} style={{ padding:"0px 12px",display: props.display ? 'block' : 'none' }}>
        <FormItem label={props.name}>
              {props.children}
        </FormItem>
    </Col>
    )
}


class AdvancedSearchForm extends React.Component {
    state = {
      expand: false,
      gridSearchParam:{}
    };
  
    handleSearch = (e) => {
      e.preventDefault();
      this.props.form.validateFields((err, values) => {
        //console.log('Received values of form: ', values);
        //console.log(this.state)
        this.setState({
           gridSearchParam:{...this.state.gridSearchParam}
        })
      });
    }
  
    handleReset = () => {
      this.props.form.resetFields();
    }
  
    toggle = () => {
      const { expand } = this.state;
      this.setState({ expand: !expand });
    }

    handleInputChange = (paramName) => ((event) => {
      this.state.gridSearchParam[paramName] = event.target.value;
      this.setState({
        gridSearchParam:this.state.gridSearchParam
      }); 
    })
  
    // To generate mock Form.Item
    getFields() {
      const count = this.state.expand ? 5 : 3;
      const { getFieldDecorator } = this.props.form;
      const children = [];

      children.push(
          <SearchFormItem
            span={8}
            key="f1"
            itemKey="f1"
            display={true}
            FieldDecorator = {getFieldDecorator}
            name="姓名">
            <Input span={6} placeholder="请输入查询条件" value={this.state.gridSearchParam.name} onChange={this.handleInputChange("name")} />
          </SearchFormItem>
      );

      children.push(
        <SearchFormItem
            span={8}
            key="f2"
            itemKey="f2"
            display={true}
            FieldDecorator = {getFieldDecorator}
            name="账号">
            <Input span={6} placeholder="请输入查询条件"  />
          </SearchFormItem>
      );

      children.push(
        <SearchFormItem
            span={8}
            key="f3"
            itemKey="f3"
            display={true}
            FieldDecorator = {getFieldDecorator}
            name="性别">
              <Select span={6} defaultValue="male">
                      <Select.Option value="male">男</Select.Option>
                      <Select.Option value="famale">女</Select.Option>
               </Select>
          </SearchFormItem>
      );

      children.push(
        <SearchFormItem
            span={8}
            key="f4"
            itemKey="f4"
            display={this.state.expand}
            FieldDecorator = {getFieldDecorator}
            name="出生年月">
               <DatePicker.RangePicker />
          </SearchFormItem>
      );
      
      children.push(
        <SearchFormItem
            span={8}
            key="f5"
            itemKey="f5"
            display={this.state.expand}
            FieldDecorator = {getFieldDecorator}
            name="状态">
               <Switch defaultChecked />
          </SearchFormItem>
      );

      return children;
    }
  
    render() {
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
            <BusiTableGrid searchData={this.state.gridSearchParam}/>
        </div>
      );
    }
  }

AdvancedSearchForm = Form.create()(AdvancedSearchForm);

class BusiTableSearch extends React.Component {

    render(){
        return (
            <div><AdvancedSearchForm/></div>
        )
    }
}
export default BusiTableSearch;