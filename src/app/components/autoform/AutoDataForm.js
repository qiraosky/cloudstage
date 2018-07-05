import React from 'react';
import { Row , Col , Input , Form } from 'antd';

const AppFormItem = (props)=>{
    let basicRules = {
        type:props.type?props.type:"string",
        required: props.required,
        message: props.message?props.message:`必须输入${props.name}`,
    };
    let config = {
        rules: [Object.assign(basicRules,props.rules)],
    };
    if(props.initValue){
        config = Object.assign(config,{initialValue:props.initValue()})
    }
    return (<Form.Item style={{display:props.invisiable?"none":"block"}}>
                {props.getFieldDecorator(props.itemKey,config)(props.children)}
            </Form.Item>);
}


const ColFormItem = (props) =>(
    props.cols.map((item,index)=>(
       <div key={`${item.itemKey}_${index}`}>
            <Col className="gutter-row" span={3} className={item.className}>
                    {item.name}
            </Col>
            <Col className="gutter-row" span={8}>
                <AppFormItem  
                    key={item.itemKey}  itemKey={item.itemKey} name={item.name}
                    initValue={item.initValue}  invisiable={item.invisiable}
                    rules={item.rules} type={item.type}
                    getFieldDecorator={props.getFieldDecorator}>
                    {"function"==typeof(item.render)?item.render(item):item.render}
                </AppFormItem>
            </Col>
        </div>
    )));
     
const RowFormItem = (props) =>(
        <Row gutter={16} className={props.className}>
            <ColFormItem
                cols = {props.cols}
                getFieldDecorator = {props.getFieldDecorator}
            />
        </Row>
    );

const AppForms = (props) =>(
    props.rows.map((item,index)=>(
        <RowFormItem
            key={index}
            className={item.className?item.className:props.rowClassName}
            getFieldDecorator={props.getFieldDecorator}
            cols={item.cols}
        />

    ))
)

const AppHideFroms = (props) => (
        props.hideForms.map((item,index)=>(
            <AppFormItem  key={`${item.itemKey}_${index}`}  itemKey={item.itemKey} name={item.name}
                initValue = {item.initValue}
                invisiable = {true}
                getFieldDecorator={props.getFieldDecorator}>
                <Input style={{display:"node"}} disabled />
            </AppFormItem>
)))


export {
    AppFormItem,
    ColFormItem,
    RowFormItem,
    AppForms,
    AppHideFroms
}