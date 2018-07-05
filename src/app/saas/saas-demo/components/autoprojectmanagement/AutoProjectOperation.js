import React from 'react';
import moment from 'moment';
import UrlUtils from '../../../../utils/UrlUtils';
import ProjectManagementService from '../../services/ProjectManagementService';
import { Card , Row , Col , Input , Form , Button , Select , DatePicker , message} from 'antd';
import '../../index.css';
import AutoForm from '../../../../components/autoform';
import { AutoDataFromUtils } from '../../../../utils/AutoComponentUtils';

class AutoProjectOperation extends React.Component{
    constructor(props){
        super(props)
        this.state ={title:"",dataEntity:{},isUpdate:false}
        this.state.hideForms = [
            {
                itemKey:"projectId",
                name:"项目ID",
                initValue:()=>(this.state.dataEntity.projectId)
             }
        ];

        this.state.forms = [
            {cols:[
                 {
                   itemKey:"projectCode",
                   name:"项目编码",
                   className:"project_operation_col_key",
                   initValue:()=>this.state.dataEntity.projectCode,
                   rules:{
                    required:true,
                    message:"必须输入项目编码",
                   },
                   render:()=>(<Input disabled={this.state.isUpdate}/>)
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
            ]}
        ];


        
    }

    componentDidMount() {
        let location =  this.props.location;
        if("/demo/autoprojectadd" == location.pathname){
            this.setState({title:"新增项目"})
            this.autoDataFromUtils = new AutoDataFromUtils({
                type:"SAVE",
                saveUrl:"/demo/saveProject",
            })
        }else if ("/demo/autoprojectupdate" == location.pathname){
            this.setState({title:"更新项目"})
            let parameters = UrlUtils.getUrlParam(location.search);
            this.autoDataFromUtils = new AutoDataFromUtils({
                type:"UPDATE",
                updateUrl:"/demo/updateProject",
                primaryKey:parameters.primaryKey
            })
            this.setState({isUpdate:true})
            this.getEntity(parameters.primaryKey);
        }
    }

    getEntity = (primaryKey)=>{
         this.autoDataFromUtils.getEntity(this,"/demo/getProject",{projectId:primaryKey},(req)=>(req.data.project))
    }

    handleSubmit = () =>{
        this.props.form.validateFields((err, values) => {
            let _this=this,
            afterCallback = (req)=>{
                 this.props.history.push({
                     pathname:"/demo/autoprojectupdate",
                     search:`?primaryKey=${req.data.project.projectId}`
                 })
            }
            this.autoDataFromUtils.saveEntity({
                _this,afterCallback,err,values
            })
            /* if(err){
                message.warning("请按提示正确填写表单");
            }else{
                let submitEntity = {
                    ...values,
                    starttime:values.starttime?values.starttime.toDate():null,
                    endtime:values.endtime?values.endtime.toDate():null
                }
                //console.log("handleSubmit",submitEntity)
                let httpCallPromise = null;
                if(this.state.isAdd){
                    httpCallPromise = ProjectManagementService.saveProject(submitEntity);
                }
                if(this.state.isUpdate){
                    httpCallPromise = ProjectManagementService.updateProject(submitEntity);
                }
                
                if(httpCallPromise){
                    httpCallPromise.then((req)=>{
                        let projectEntity = req.data.project;
                        this.setState({
                            projectEntity
                        })
                        message.success("保存成功");
                      })
                }
            } */

             
        });
    }

    handleReset = () => {
        this.props.form.resetFields();
    }

    render(){
        return (
            <Form>
                <Card title={this.state.title} extra={<a href="#/demo/autoprojectmanagement">返回</a>} style={{ width: "100%" }}>
                    <AutoForm.AutoDataForm.AppHideFroms
                        getFieldDecorator={this.props.form.getFieldDecorator}
                        hideForms={this.state.hideForms}
                    />
                    <AutoForm.AutoDataForm.AppForms
                        rowClassName="project_operation_row"
                        getFieldDecorator={this.props.form.getFieldDecorator}
                        rows={this.state.forms}
                    />  
                    {/* <SearchFormItem  key="projectId"  itemKey="projectId" name="项目ID"
                        initValue = {this.state.projectEntity.projectId}
                        invisiable = {true}
                        getFieldDecorator={this.props.form.getFieldDecorator}>
                        <Input disabled />
                    </SearchFormItem>
                    <Row gutter={16} className="project_operation_row">
                        <Col className="gutter-row" span={3} className="project_operation_col_key">
                            项目编码：
                        </Col>
                        <Col className="gutter-row" span={8}>
                            <SearchFormItem  key="projectCode"  itemKey="projectCode" name="项目编码"
                                required = {true} message="必须输入项目编码"
                                initValue = {this.state.projectEntity.projectCode}
                                getFieldDecorator={this.props.form.getFieldDecorator}>
                                <Input disabled={this.state.isUpdate}/>
                            </SearchFormItem>
                        </Col>
                        <Col className="gutter-row" span={2}>
                        </Col>
                        <Col className="gutter-row" span={3} className="project_operation_col_key">
                            项目名称：
                        </Col>
                        <Col className="gutter-row" span={8}>
                            <SearchFormItem  key="name"  itemKey="name" name="项目编码"
                                required = {true} message="必须输入项目名称"
                                initValue = {this.state.projectEntity.name}
                                getFieldDecorator={this.props.form.getFieldDecorator}>
                                <Input />
                            </SearchFormItem>
                        </Col>
                    </Row>
                    <Row gutter={16} className="project_operation_row">
                        <Col className="gutter-row" span={3} className="project_operation_col_key">
                            项目状态：
                        </Col>
                        <Col className="gutter-row" span={8}>
                            <SearchFormItem  key="status"  itemKey="status" name="项目状态"
                                required = {true} message="必须选择项目状态"
                                initValue = {this.state.projectEntity.status}
                                getFieldDecorator={this.props.form.getFieldDecorator}>
                                 <Select span={6} >
                                        <Select.Option value="start">开始</Select.Option>
                                        <Select.Option value="pending">实施中</Select.Option>
                                        <Select.Option value="end">结束</Select.Option>
                                </Select>
                            </SearchFormItem>
                        </Col>
                        <Col className="gutter-row" span={2}>
                        </Col>
                        <Col className="gutter-row" span={3} className="project_operation_col_key">
                            负责人：
                        </Col>
                        <Col className="gutter-row" span={8}>
                            <SearchFormItem  key="principal"  itemKey="principal" name="负责人"
                                initValue = {this.state.projectEntity.principal}
                                getFieldDecorator={this.props.form.getFieldDecorator}>
                                <Select span={6} >
                                        <Select.Option value="约翰">约翰</Select.Option>
                                        <Select.Option value="杰克">杰克</Select.Option>
                                        <Select.Option value="彼得">彼得</Select.Option>
                                </Select>
                            </SearchFormItem>
                        </Col>
                    </Row>    
                    <Row gutter={16} className="project_operation_row">
                        <Col className="gutter-row" span={3} className="project_operation_col_key">
                            开始时间：
                        </Col>
                        <Col className="gutter-row" span={8}>
                            <SearchFormItem  key="starttime"  itemKey="starttime" name="开始时间"
                                type="object" required = {true}  message="必须选择项目开始时间"
                                initValue = {this.state.projectEntity.starttime?moment(this.state.projectEntity.starttime):null}
                                getFieldDecorator={this.props.form.getFieldDecorator}>
                                 <DatePicker className="project_datepicker_input"/>
                            </SearchFormItem>
                        </Col>
                        <Col className="gutter-row" span={2}>
                        </Col>
                        <Col className="gutter-row" span={3} className="project_operation_col_key">
                            结束时间：
                        </Col>
                        <Col className="gutter-row" span={8}>
                            <SearchFormItem  key="endtime"  itemKey="endtime" name="结束时间"
                                type="object" 
                                initValue = {this.state.projectEntity.endtime?moment(this.state.projectEntity.endtime):null}
                                getFieldDecorator={this.props.form.getFieldDecorator}>
                                <DatePicker className="project_datepicker_input"/>
                            </SearchFormItem>
                        </Col>
                    </Row>   
                    <Row gutter={16} className="project_operation_row">
                        <Col className="gutter-row" span={3} className="project_operation_col_key">
                            项目位置：
                        </Col>
                        <Col className="gutter-row" span={8}>
                            <SearchFormItem  key="location"  itemKey="location" name="项目位置"
                                initValue = {this.state.projectEntity.location}
                                getFieldDecorator={this.props.form.getFieldDecorator}>
                                 <Input />
                            </SearchFormItem>
                        </Col>
                        <Col className="gutter-row" span={2}>
                        </Col>
                        <Col className="gutter-row" span={3} className="project_operation_col_key">
                           
                        </Col>
                        <Col className="gutter-row" span={8}>
                        </Col>
                    </Row>    */}                                                     
                    <Button type="primary" htmlType="submit" onClick={this.handleSubmit}>提交</Button>
                    <Button style={{marginLeft:"6px"}} onClick={this.handleReset}>重置</Button>
                </Card>
            </Form> 
        )
    }
}
AutoProjectOperation =  Form.create()(AutoProjectOperation);
export default AutoProjectOperation;