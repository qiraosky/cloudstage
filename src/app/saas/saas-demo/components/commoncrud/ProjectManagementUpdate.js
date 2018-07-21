import CommonOperation from './commoncrud/CommonOperation';
import { AutoDataFromUtils } from '__root__/utils/AutoComponentUtils';
import {  Input , Form ,  Select , DatePicker } from 'antd';
import moment from 'moment';
import '../../index.css';

class ProjectManagementUpload extends CommonOperation{
 
    config = {
        title:"更新工程",
        backExtra:(<a href="#/demo/commoncrud/index">返回</a>),
        autoDataFromUtils:new AutoDataFromUtils({
            type:"SAVE",
            saveUrl:"/demo/updateProject",
        }),
        getEntityParam:{},
        getEntityUrl:"/demo/getProject",
        componentDidMountAfter:()=>{
            this.getEntity()
        },
        getEntityFromRes:(res)=>(res.data.project),
    }

    handleGetEntityParam = (param)=>({projectId:param.primaryKey})

    handleSubmit = () =>{
        this.props.form.validateFields((err, values) => {
            let _this=this,
            afterCallback = (res)=>{
            },
            handleCallback = (res)=>{
                return  res.data.project;
            }
            this.config.autoDataFromUtils.saveEntity({
                _this,afterCallback,err,values,handleCallback
            })
        });
    }
    

    forms = [
             {
                itemKey:"projectId",
                name:"项目ID",
                isHideForm:true,
                initValue:()=>(this.state.dataEntity.projectId)
             },{
               itemKey:"projectCode",
               name:"项目编码",
               className:"project_operation_col_key",
               initValue:()=>this.state.dataEntity.projectCode,
               rules:{
                required:true,
                message:"必须输入项目编码",
               },
               render:()=>(<Input disabled={true}/>)
            },{
                itemKey:"name",
                name:"项目名称",
                className:"project_operation_col_key",
                initValue:()=>this.state.dataEntity.name,
                rules:{
                 required:true,
                 message:"必须输入项目名称",
                },
                render:(<Input/>)
             },{
                itemKey:"status",
                name:"项目状态",
                className:"project_operation_col_key",
                initValue:()=>this.state.dataEntity.status,
                rules:{
                 required:true,
                 message:"必须输入项目名称",
                },
                render:(
                    <Select span={6} >
                        <Select.Option value="start">开始</Select.Option>
                        <Select.Option value="pending">实施中</Select.Option>
                        <Select.Option value="end">结束</Select.Option>
                    </Select>)
             },{
                itemKey:"principal",
                name:"负责人",
                className:"project_operation_col_key",
                initValue:()=>this.state.dataEntity.principal,
                rules:{
                 required:true,
                 message:"必须输入项目名称",
                },
                render:( 
                    <Select span={6} >
                        <Select.Option value="约翰">约翰</Select.Option>
                        <Select.Option value="杰克">杰克</Select.Option>
                        <Select.Option value="彼得">彼得</Select.Option>
                    </Select>)
             },{
                itemKey:"starttime",
                name:"开始时间",
                className:"project_operation_col_key",
                initValue:()=>(this.state.dataEntity.starttime?moment(this.state.dataEntity.starttime):null),
                type:"object",
                rules:{
                 required:true,
                 message:"必须输入开始时间",
                },
                render:( <DatePicker className="project_datepicker_input"/>)
             },{
                itemKey:"endtime",
                name:"结束时间",
                type:"object",
                className:"project_operation_col_key",
                initValue:()=>(this.state.dataEntity.endtime?moment(this.state.dataEntity.endtime):null),
                render:( <DatePicker className="project_datepicker_input"/>)
             },{
                itemKey:"location",
                name:"项目位置",
                className:"project_operation_col_key",
                initValue:()=>this.state.dataEntity.location,
                render:(<Input />)
             }
    ];

}
ProjectManagementUpload =  Form.create()(ProjectManagementUpload)
export default ProjectManagementUpload;