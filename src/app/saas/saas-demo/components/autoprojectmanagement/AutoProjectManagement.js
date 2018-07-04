import React from 'react';
import moment from 'moment';
import { Table , Button , Divider , Popconfirm ,message } from 'antd';
import { Link } from 'react-router-dom';
import AutoProjectManagementSearch from './AutoProjectManagementSearch';
import '../../index.css';
import { AutoDataTableUtils } from '../../../../utils/AutoComponentUtils';

class ProjectManagementGrid extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            search:{},
            queryParam:{},
            data: [],
            pagination: {showQuickJumper:true,pageSize:10},
            loading: false
        };
        this.autoDataTableUtils = new AutoDataTableUtils();
    }

    columns = [
          {
            title: (<span className="antd-custom-table-head">项目编码</span>), 
            dataIndex: 'projectCode',
            sorter: true,
            fixed: 'left',
            width: 120,
            className:"antd-custom-table-body",
            render: (projectCode) => (projectCode),
          },{
            title: (<span className="antd-custom-table-head">项目名称</span>),
            dataIndex: 'name',
            sorter: true,
            fixed: 'left',
            width: 220,
            className:"antd-custom-table-body",
          },{
            title: (<span className="antd-custom-table-head">项目状态</span>),
            dataIndex: 'status',
            sorter: true,
            className:"antd-custom-table-body",
            filters: [
              { text: '开始', value: 'start' },
              { text: '实施中', value: 'pending' },
              { text: '结束', value: 'end' },
            ],render: (status) => {
                switch(status){
                  case "start":return "开始";
                  case "pending":return "实施中";
                  case "end":return "结束";
                  default:return "未知状态";
                }
            },
          },{
            title: (<span className="antd-custom-table-head">开始时间</span>),
            dataIndex: 'starttime',
            className:"antd-custom-table-body",
            sorter: true,
            render: (starttime) => (starttime?moment(starttime).format("YYYY-MM-DD"):""),
          },{
            title: (<span className="antd-custom-table-head">结束时间</span>),
            dataIndex: 'endtime',
            className:"antd-custom-table-body",
            sorter: true,
            render: (endtime) => (endtime?moment(endtime).format("YYYY-MM-DD"):""),
          },{
            title: (<span className="antd-custom-table-head">项目所在地</span>),
            dataIndex: 'location',
            className:"antd-custom-table-body",
            sorter: true
          },{
            title: (<span className="antd-custom-table-head">负责人</span>),
            dataIndex: 'principal',
            className:"antd-custom-table-body",
            sorter: true
          },{
            title: (<span className="antd-custom-table-head">操作</span>),
            key: 'action',
            className:"antd-custom-table-body",
            fixed: 'right',
            width:170,
            render: (text, record) => {
              return (
              <span>
                <Link to={{pathname:'/demo/autoprojectdetail',search:`?primaryKey=${record.projectId}`}} title='详情'  >详情</Link>
                <Divider type="vertical" />
                <Link to={{pathname:'/demo/autoprojectupdate',search:`?primaryKey=${record.projectId}`}} title='更新'  >更新</Link>
                <Divider type="vertical" />
                <Popconfirm title="是否删除?" onConfirm={() => this.deleteProject(record.projectId)}>
                  <a href="javascript:;">删除</a>
                </Popconfirm>
              </span>
            )}}
    ]


    handleTableChange = (pagination, filters, sorter) => {
        const pager = { ...this.state.pagination };
        pager.current = pagination.current;
        this.setState({
          pagination: pager
        });
        this.state.pagination = pagination;
        this.state.queryParam = Object.assign(this.state.queryParam,{
            pageSize: pagination.pageSize,
            page: pagination.current,
            sortField: sorter.field,
            sortOrder: sorter.order,
            ...filters
          });
        this.listEntity(this.state.queryParam);
      }

     listEntity = (params={},err,commond) => {
        if(commond == "clear"){
          this.state.queryParam = {};
        }
        this.state.queryParam = Object.assign(this.state.queryParam,params)
        this.setState({ loading: true });
        this.autoDataTableUtils.listEntity(
          "/demo/listProject",
          this.state.queryParam).then((req)=>{
            const total = req.data.info.total;
            const results = req.data.results;
            if(commond == "clear"){
              this.state.pagination.current = 1;
            }
            this.state.pagination.total = total;
            this.setState({
              loading: false,
              data: results,
              pagination:this.state.pagination,
            });
      })
      }

      deleteProject = (projectId) => {
        this.autoDataTableUtils.deleteEntity(
          "/demo/deleteProject",projectId).then((req)=>{
          message.success('删除成功');
          this.listEntity(this.state.queryParam);
        });
    }

      componentDidMount() {
        this.listEntity(this.state.queryParam);
      }

    render(){
        return(
            <div>
            <AutoProjectManagementSearch onSearch={this.listEntity}/>
            <Link to='/demo/autoprojectadd' title='新增' >
              <Button style={{marginTop:'16px'}} type="primary">新增</Button>
            </Link>
            <Table
                    columns={this.columns}
                    bordered
                    size="small"
                    rowKey={record => record.projectId}
                    dataSource={this.state.data}
                    pagination={this.state.pagination}
                    loading={this.state.loading}
                    onChange={this.handleTableChange}
                    scroll={{ x: 1150 }}
                    style={{margin:"16px 16px 16px 0px"}}
                />
        </div>
        )
    }
}

export default ProjectManagementGrid;