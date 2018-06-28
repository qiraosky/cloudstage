import React from 'react';
import moment from 'moment';
import { Table , Button , Divider , Popconfirm ,message } from 'antd';
import { Link } from 'react-router-dom';
import { listProject } from '../../services/ProjectManagementService';
import ProjectManagementSearch from './ProjectManagementSearch';

class ProjectManagementGrid extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            search:{},
            queryParam:{},
            data: [],
            pagination: {showQuickJumper:true,pageSize:5},
            loading: false
        };
    }

    columns = [
          {
            title: '项目编码',
            dataIndex: 'projectCode',
            sorter: true,
            fixed: 'left',
            width: 120,
            render: (projectCode) => (projectCode),
          },{
            title: '项目名称',
            dataIndex: 'name',
            sorter: true,
            fixed: 'left',
            width: 220,
          },{
            title: '项目状态',
            dataIndex: 'status',
            sorter: true,
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
            title: '开始时间',
            dataIndex: 'starttime',
            sorter: true,
            render: (starttime) => (moment(starttime).format("YYYY-MM-DD")),
          },{
            title: '结束时间',
            dataIndex: 'endtime',
            sorter: true,
            render: (endtime) => (moment(endtime).format("YYYY-MM-DD")),
          },{
            title: '项目所在地',
            dataIndex: 'location',
            sorter: true
          },{
            title: '负责人',
            dataIndex: 'principal',
            sorter: true
          },{
            title: '操作',
            key: 'action',
            fixed: 'right',
            width:170,
            render: (text, record) => {
              return (
              <span>
                <Link to={{pathname:'/demo/projectdetail',search:`?projectId=${record.projectId}`}} title='详情'  >详情</Link>
                <Divider type="vertical" />
                <Link to={{pathname:'/demo/projectupdate',search:`?projectId=${record.projectId}`}} title='更新'  >更新</Link>
                <Divider type="vertical" />
                <Popconfirm title="是否删除?" onConfirm={() => this.deleteData(record.projectId)}>
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
        this.fetch(this.state.queryParam);
      }

    fetch = (params={},err,commond) => {
        if(commond == "clear"){
          this.state.queryParam = {};
        }
        this.state.queryParam = Object.assign(this.state.queryParam,params)
        console.log("fatch param",this.state.queryParam)
        this.setState({ loading: true });
        listProject(this.state.queryParam).then((req) => {
          const info = req.data.info;
          const results = req.data.results;
          if(commond == "clear"){
            this.state.pagination.current = 1;
          }
          this.state.pagination.total = info.total;
          this.setState({
            loading: false,
            data: results,
            pagination:this.state.pagination,
          });
        });
      }

      componentDidMount() {
        this.fetch(this.state.queryParam);
      }

    render(){
        return(
            <div>
            <ProjectManagementSearch onSearch={this.fetch}/>
            <Link to='/demo/projectadd' title='新增' >
              <Button style={{marginTop:'16px'}} type="primary">新增</Button>
            </Link>
            <Table
                    columns={this.columns}
                    bordered
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