import React from 'react';
import { Col , Form } from 'antd';

const SearchFormItem = (props)=>{
    return (<Col span={props.colSpan?props.colSpan:props.rowColNumber?(24/props.rowColNumber):8} style={{ padding:"0px 12px",display: !props.hide ? 'block' : 'none' }}>
                <Form.Item label={props.name}>
                {props.getFieldDecorator(props.itemKey, {
                    rules: [{
                    required: props.required,
                    message: props.message,
                    }],
                    ...(props.searchFormConfig?props.searchFormConfig:{})
                })(props.children)}
                </Form.Item>
            </Col>);
}

const SearchForm = (props) => {
    return (props.formItems.map((item,index)=>{
        if(!item.hide){
            item.hide = ()=>(false)
        }
        let searchFormConfig = item.searchFormConfig
        searchFormConfig = (searchFormConfig?searchFormConfig:{})
        return (
            <SearchFormItem  
                {...{
                    key:`${item.itemKey}-${index}`,
                    itemKey:item.itemKey,
                    name:item.name,
                    hide:item.hide(),
                    getFieldDecorator:props.getFieldDecorator,
                    searchFormConfig,
                    colSpan:props.colSpan,
                    ...(props.searchFormPropConfig?props.searchFormPropConfig:{})
                }}
                >
                {item.render(item)}
            </SearchFormItem>
        )
    }))
}

export {
    SearchFormItem,
    SearchForm
}