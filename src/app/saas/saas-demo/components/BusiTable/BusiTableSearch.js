import React from 'react'
import { Form, Row, Col, Input, Button, Icon , Divider} from 'antd';
const FormItem = Form.Item;

class AdvancedSearchForm extends React.Component {
    state = {
      expand: false,
    };
  
    handleSearch = (e) => {
      e.preventDefault();
      this.props.form.validateFields((err, values) => {
        console.log('Received values of form: ', values);
      });
    }
  
    handleReset = () => {
      this.props.form.resetFields();
    }
  
    toggle = () => {
      const { expand } = this.state;
      this.setState({ expand: !expand });
    }
  
    // To generate mock Form.Item
    getFields() {
      const count = this.state.expand ? 6 : 2;
      const { getFieldDecorator } = this.props.form;
      const children = [];
      for (let i = 0; i < 10; i++) {
        children.push(
          <Col span={8} key={i} style={{ display: i < count ? 'block' : 'none' }}>
            <FormItem label={`属性 ${i}`}>
              {getFieldDecorator(`field-${i}`, {
                rules: [{
                  required: true,
                  message: 'Input something!',
                }],
              })(
                <Input placeholder="placeholder" />
              )}
            </FormItem>
          </Col>
        );
      }
      return children;
    }
  
    render() {
      return (
        <Form
          className="ant-advanced-search-form"
          onSubmit={this.handleSearch}
        >
          <Row gutter={24}>{this.getFields()}</Row>
          <Row>
            <Col span={24} style={{ textAlign: 'right' }}>
              <Button type="primary" htmlType="submit">查询</Button>
              <Button style={{ marginLeft: 8 }} onClick={this.handleReset}>
                请空
              </Button>
            </Col>
          </Row>
          <Divider><a style={{ marginLeft: 8, fontSize: 12 }} onClick={this.toggle}>
              {!this.state.expand ? '展开查询' : '收起查询'} <Icon type={this.state.expand ? 'up' : 'down'} />
              </a>
         </Divider>
        </Form>
        
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
/* import { Form, Row, Col, Input, Button, Icon } from 'antd';
const FormItem = Form.Item;

class AdvancedSearchForm extends React.Component {
  state = {
    expand: false,
  };

  handleSearch = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      console.log('Received values of form: ', values);
    });
  }

  handleReset = () => {
    this.props.form.resetFields();
  }

  toggle = () => {
    const { expand } = this.state;
    this.setState({ expand: !expand });
  }

  // To generate mock Form.Item
  getFields() {
    const count = this.state.expand ? 10 : 6;
    const { getFieldDecorator } = this.props.form;
    const children = [];
    for (let i = 0; i < 10; i++) {
      children.push(
        <Col span={8} key={i} style={{ display: i < count ? 'block' : 'none' }}>
          <FormItem label={`Field ${i}`}>
            {getFieldDecorator(`field-${i}`, {
              rules: [{
                required: true,
                message: 'Input something!',
              }],
            })(
              <Input placeholder="placeholder" />
            )}
          </FormItem>
        </Col>
      );
    }
    return children;
  }

  render() {
    return (
      <Form
        className="ant-advanced-search-form"
        onSubmit={this.handleSearch}
      >
        <Row gutter={24}>{this.getFields()}</Row>
        <Row>
          <Col span={24} style={{ textAlign: 'right' }}>
            <Button type="primary" htmlType="submit">Search</Button>
            <Button style={{ marginLeft: 8 }} onClick={this.handleReset}>
              Clear
            </Button>
            <a style={{ marginLeft: 8, fontSize: 12 }} onClick={this.toggle}>
              Collapse <Icon type={this.state.expand ? 'up' : 'down'} />
            </a>
          </Col>
        </Row>
      </Form>
    );
  }
}

const WrappedAdvancedSearchForm = Form.create()(AdvancedSearchForm);


class BusiTableSearch extends React.Component {
    render(){
        return(
            <WrappedAdvancedSearchForm/>
        )
    }
}
export default BusiTableSearch; */