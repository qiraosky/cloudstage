import React from 'react';
import moment from 'moment';
import UrlUtils from '../../../../utils/UrlUtils';
import ProjectManagementService from '../../services/ProjectManagementService';
import { Card , Row , Col} from 'antd';
import '../../index.css';

class ProjectDetail extends React.Component{
    constructor(props){
        super(props)
        this.state ={
            projectEntity:{}
        }
    }

    componentDidMount() {
        let search = this.props.location.search;
        this.getProject(UrlUtils.getUrlParam(search))
    }

    getProject = (paramEntity)=>{
        ProjectManagementService.getProject(paramEntity.projectId).then((req)=>{
            this.setState({
                projectEntity:req.data.project
            })
         })
    }

    render(){
        return (
            <Card title="项目详情" extra={<a href="#/demo/projectmanagement">返回</a>} style={{ width: "100%" }}>
                <Row gutter={16} className="project_detail_row">
                    <Col className="gutter-row" span={4} className="project_detail_col_key">
                        项目编码：
                    </Col>
                    <Col className="gutter-row" span={7}>
                        {this.state.projectEntity.projectCode}
                    </Col>
                    <Col className="gutter-row" span={2}>
                    </Col>
                    <Col className="gutter-row" span={4} className="project_detail_col_key">
                        项目名称：
                    </Col>
                    <Col className="gutter-row" span={7}>
                        {this.state.projectEntity.name}
                    </Col>
                </Row>
                <Row gutter={16} className="project_detail_row">
                    <Col className="gutter-row" span={4} className="project_detail_col_key">
                        项目状态：
                    </Col>
                    <Col className="gutter-row" span={7}>
                        {(()=>{
                            let statusStr = "";
                            switch(this.state.projectEntity.status){
                                case "start":statusStr = "开始";break;
                                case "end":statusStr = "结束";break;
                                case "pending":statusStr = "实施中";break;
                                default:statusStr = "未知状态";break;
                            }

                            return(<span>{statusStr}</span>)}
                        )()}
                    </Col>
                    <Col className="gutter-row" span={2}>
                    </Col>
                    <Col className="gutter-row" span={4} className="project_detail_col_key">
                        负责人：
                    </Col>
                    <Col className="gutter-row" span={7}>
                        {this.state.projectEntity.principal}
                    </Col>
                </Row>
                <Row gutter={16} className="project_detail_row">
                    <Col className="gutter-row" span={4} className="project_detail_col_key">
                        开始时间：
                    </Col>
                    <Col className="gutter-row" span={7}>
                        {moment(this.state.projectEntity.starttime).format("YYYY-MM-DD")}
                    </Col>
                    <Col className="gutter-row" span={2}>
                    </Col>
                    <Col className="gutter-row" span={4} className="project_detail_col_key">
                        结束时间：
                    </Col>
                    <Col className="gutter-row" span={7}>
                        {moment(this.state.projectEntity.endtime).format("YYYY-MM-DD")}
                    </Col>
                </Row>
                <Row gutter={16} className="project_detail_row">
                    <Col className="gutter-row" span={4} className="project_detail_col_key">
                        项目位置：
                    </Col>
                    <Col className="gutter-row" span={7}>
                        {this.state.projectEntity.location}
                    </Col>
                    <Col className="gutter-row" span={2}>
                    </Col>
                    <Col className="gutter-row" span={4} className="project_detail_col_key">
                        
                    </Col>
                    <Col className="gutter-row" span={7}>
                        
                    </Col>
                </Row>                
            </Card>
        );
    }
}
export default ProjectDetail;