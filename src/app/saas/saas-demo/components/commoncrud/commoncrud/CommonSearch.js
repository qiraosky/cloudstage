import React from 'react';
import { Form, Row, Col, Card, Button, Icon } from 'antd';
import AutoForm from '../../../../../components/autoform';

class CommonSearch extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            expand: false
        };
    }//end of constructor

    searchFrom = []

    renderAppend = () => ("")

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
        let colSpan = null;
        if(24%this.props.rowColNumber == 0){
            colSpan = 24 / this.props.rowColNumber
        }else{
            colSpan = 8
        }
       
        return (
            <AutoForm.AutoSearchForm.SearchForm
                {...{
                    formItems:children,
                    getFieldDecorator,
                    colSpan,
                    ...(this.props.searchForm?this.props.searchForm:{})
                }}
            />
        )
    }

    getSearchBtnPosition = ()=>{
        if(this.searchFrom instanceof Array 
            && !isNaN(this.props.rowColNumber) 
            && 24% this.props.rowColNumber == 0
        ){
            let visibleFormLenth = 0
            for(let item in this.searchFrom){
                if(!this.searchFrom[item].hide()){
                    visibleFormLenth ++ 
                }
            }

            let rowColNumber = parseInt(this.props.rowColNumber);
            let searchBtnPos = (rowColNumber - visibleFormLenth % rowColNumber) * (24 / rowColNumber);
            return searchBtnPos<=0?24:searchBtnPos;
        }
        return 24;
    }

    render(){
        return (
        <Card className="epm-card" style={{marginBottom:"24px"}}>
            <Form
                className="ant-advanced-search-form"
            >
            <Row style={{fontSize:21,fontWeight:"bolder",paddingBottom:"18px"}}>
                    查询条件
            </Row>
            <Row gutter={24}>{this.getFields()}
                <Col span={this.getSearchBtnPosition()} style={{ textAlign: 'right' }}>
                    <Button type="primary" htmlType="submit" onClick={this.handleSearch}>查询</Button>
                    <Button style={{ marginLeft: 8 }} onClick={this.handleReset}>重置</Button>
                </Col>
            </Row>

            <div style={{width:"100%",textAlign:"center",display:this.props.hidetoggle?"none":"block"}}>
                <a style={{ marginLeft: 8, fontSize: 12 }} onClick={this.toggle}>
                {!this.state.expand ? '展开查询' : '收起查询'} <Icon type={this.state.expand ? 'up' : 'down'} />
                </a>
            </div>
            </Form>
            {this.renderAppend()}
        </Card>
        )
    }
}


export default CommonSearch;