import React from 'react';
import {Row, Col, Input, Form} from 'antd';

const AppFormItem = (props) => {

    let {
        type,
        required,
        message,
        name,
        initValue,
        children,
        formItemConfig,
        getFieldDecorator,
        _formItemConfig,
        _decoratorConfig,
        _AppFormsConfig
    } = props;

    // 全部隐藏表单组的label
    let {labelHide} = _AppFormsConfig;

    let itemConfig = {
        labelCol: {
            span: labelHide ? 0 : 6
        },
        wrapperCol: {
            span: labelHide ? 24 : 18
        }
    };

    let basicConfig = {
        rules: [{
            type: type ? type : "string",
            required,
            message: message ? message : `必须输入${name}`,
        }]
    };

    if (initValue) {
        basicConfig = $.extend({}, basicConfig, {initValue})
    }

    let config = $.extend({}, _decoratorConfig, basicConfig);
    _formItemConfig = $.extend({}, itemConfig, _formItemConfig);
    return (
        <Form.Item
            label={labelHide ? '' : name}
            required={required}
            className={'epm-form-item'}
            {..._formItemConfig} {...formItemConfig}
        >
            {getFieldDecorator(props.itemKey, config)(children)}
        </Form.Item>
    );
};


const ColFormItem = (props) => {

    let {
        cols,
        getFieldDecorator,
        _colConfig,
        _formItemConfig,
        _decoratorConfig,
        _AppFormsConfig
    } = props;

    let {colsCount} = _AppFormsConfig;
    if (!colsCount) colsCount = 2;
    let colConfig = {
        md: {
            span: Math.floor(24/colsCount)
        },
        sm: {
            span: 24
        }
    };

    _colConfig = $.extend({}, colConfig, _colConfig);

    return (
        cols.map((item, index) => {
            let {itemKey, name, initValue, invisiable, message, rules, type, required, colConfig, formItemConfig, render} = item;
            return (
                <Col style={{display:invisiable ? 'none' : 'block'}} key={`${item.itemKey}_${index}`} {..._colConfig} {...colConfig}>
                    <AppFormItem
                        {...{
                            key: itemKey,
                            itemKey,
                            name,
                            required,
                            initValue,
                            rules,
                            type,
                            message,
                            formItemConfig,
                            getFieldDecorator,
                            _formItemConfig: _formItemConfig ? _formItemConfig : {},
                            _decoratorConfig: _decoratorConfig ? _decoratorConfig : {},
                            _AppFormsConfig: _AppFormsConfig ? _AppFormsConfig : {}
                        }}
                    >
                        {"function" === typeof(render) ? render(item) : <Input/>}
                    </AppFormItem>
                </Col>
            )
        }));
};

const RowFormItem = (props) => {

    let {
        rowConfig,
        cols,
        children,
        getFieldDecorator,
        _rowConfig,
        _colConfig,
        _formItemConfig,
        _decoratorConfig,
        _AppFormsConfig
    } = props;

    return (
        // 不能组件式调用，不然栅格间距无法生成
        <Row {..._rowConfig} {...rowConfig} gutter={28}>
            {ColFormItem(
                {...{
                    cols,
                    getFieldDecorator,
                    _colConfig: _colConfig ? _colConfig : {},
                    _formItemConfig: _formItemConfig ? _formItemConfig : {},
                    _decoratorConfig: _decoratorConfig ? _decoratorConfig : {},
                    _AppFormsConfig: _AppFormsConfig ? _AppFormsConfig : {}
                }})
            }
            {children}
        </Row>
    );
};

const AppForms = (props) => {
    let {
        rows,
        getFieldDecorator,
        children,
        _rowConfig,
        _colConfig,
        _decoratorConfig,
        _formItemConfig,
        _AppFormsConfig
    } = props;

    return (
        rows.map((item, index) => {
            let {cols, rowConfig} = item;
            return (
                <RowFormItem
                    {...{
                        key: index,
                        cols,
                        rowConfig,
                        getFieldDecorator,
                        _rowConfig: _rowConfig ? _rowConfig : {},
                        _colConfig: _colConfig ? _colConfig : {},
                        _formItemConfig: _formItemConfig ? _formItemConfig : {},
                        _decoratorConfig: _decoratorConfig ? _decoratorConfig : {},
                        _AppFormsConfig: _AppFormsConfig ? _AppFormsConfig : {}
                    }}
                >{children}</RowFormItem>
            )
        })
    );
};

export {
    AppFormItem,
    ColFormItem,
    RowFormItem,
    AppForms
}