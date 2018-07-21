import React from 'react';
import UrlUtils from '../../../../../utils/UrlUtils';
import { Card , Row , Col , Input , Form , Button , Select , DatePicker , message} from 'antd';
import AutoForm from '../../../../../components/autoform';



class CommonOperation extends React.Component{
    constructor(props){
        super(props)
        this.state ={dataEntity:{}}
    }

    //基本配置，需要重写
    config = {
        title:"",//标题
        backExtra:"",//右上返回位置可设置
        autoDataFromUtils:null,//自动表单工具对象
        getEntityParam:{},//查询实体的参数
        getEntityUrl:"",//查询实体的服务链接
        componentDidMountAfter:()=>{}, //在加载后的处理事件，一般为更新时加载数据
        getEntityFromRes:(res)=>(res.data), //查询到数据实体时的回调方法
    }

    //表单项目，需要重写
    forms = [];

    //将从参数转换来的对象转换成传给后台的对象，可重写
    handleGetEntityParam = (param)=>(param)

    componentDidMount() {
        let location =  this.props.location
        this.config.getEntityParam = this.handleGetEntityParam(UrlUtils.getUrlParam(location.search))
        this.config.componentDidMountAfter()
    }
    
    getEntity = ()=>{
         this.config.autoDataFromUtils.getEntity(
             this,
             this.config.getEntityUrl,
             this.config.getEntityParam,
             this.config.getEntityFromRes
            )
    }

    //提交方法，需要重写
    handleSubmit = () =>{
        this.props.form.validateFields((err, values) => {
                console.log(err,values)
        });
    }

    handleReset = () => {
        this.props.form.resetFields();
    }

    getHideForms = ()=>{
        const hideForms = this.forms.filter((item)=>(item.isHideForm))
        return hideForms
    }
    getShowForms = ()=>{
        const showForms = this.forms.filter((item)=>(!item.isHideForm))
        return showForms
    }

    //保存按钮，可重写
    renderBtnArea = ()=>(<div>
        <Button type="primary" htmlType="submit" onClick={this.handleSubmit}>提交</Button>
        <Button style={{marginLeft:"6px"}} onClick={this.handleReset}>重置</Button>
    </div>)

    render(){
        return (
            <Form>
                <Card title={this.config.title} extra={this.config.backExtra} style={{ width: "100%" }}>
                    <AutoForm.AutoDataForm.AppHideFroms
                        {...{
                            hideForms:this.getHideForms(),
                            ...this.props.form
                        }}
                    />
                    <AutoForm.AutoDataForm.AppForms
                        {...{
                            rowClassName:"project_operation_row",
                            rows:[{
                                cols:this.getShowForms()
                            }],
                            ...this.props.form
                        }}
                    />         
                    {this.renderBtnArea()}                                     

                </Card>
            </Form> 
        )
    }
}
export default CommonOperation;