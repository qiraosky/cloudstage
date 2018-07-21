import React from 'react';
import moment from 'moment';
import { Form, Row, Col, Input, Button, Icon , Select , DatePicker , TreeSelect, Divider , Popconfirm } from 'antd';
import { Link } from 'react-router-dom';
import '../../index.css';
import CommonGrid from './commoncrud/CommonGrid';
import CommonSearch from './commoncrud/CommonSearch';

/**
 * 查询域
 */
class ProjectSearch extends CommonSearch {
    constructor(props){
        super(props)
    }
    searchFrom =  [{
                itemKey:"projectCode",
                name:"项目编码",
                hide:()=>(false),
                render:(item)=>(<Input placeholder={item.name} />)
            },{
                itemKey:"name",
                name:"项目名称",
                hide:()=>(false),
                render:(item)=>(<Input placeholder={item.name} />)
            },{
                itemKey:"starttime",
                name:"开始时间",
                hide:()=>(false),
                render:(item)=>(<DatePicker.RangePicker />)
            },{
                itemKey:"principal",
                name:"负责人",
                hide:()=>(!this.state.expand),
                render:(item)=>(
                <Select span={6} placeholder={item.name}>
                    <Select.Option value="约翰">约翰</Select.Option>
                    <Select.Option value="杰克">杰克</Select.Option>
                    <Select.Option value="彼得">彼得</Select.Option>
                </Select>)
            },{
                itemKey:"status",
                name:"项目状态",
                hide:()=>(!this.state.expand),
                render:(item)=>(<Select span={6} placeholder={item.name}>
                    <Select.Option value="start">开始</Select.Option>
                    <Select.Option value="end">结束</Select.Option>
                    <Select.Option value="pending">实施中</Select.Option>
                </Select>)
            }]
}

/**
 * 绑定表单域
 */
ProjectSearch = Form.create()(ProjectSearch);

/**
 * 列表域
 */
class ProjectGrid extends CommonGrid {
    constructor(props){
        super(props)
    }

    columns =  [
        {
          title: (<span className="antd-custom-table-head">项目编码1</span>), 
          dataIndex: 'projectCode',
          sorter: true,
          fixed: 'left',
          width: 120,
          className:"antd-custom-table-body",
          render: (projectCode) => (projectCode),
        },{
          title: (<span className="antd-custom-table-head">项目名称2</span>),
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
              <Link to={{pathname:'/demo/commoncrud/detail',search:`?primaryKey=${record.projectId}`}} title='详情'  >详情</Link>
              <Divider type="vertical" />
              <Link to={{pathname:'/demo/commoncrud/update',search:`?primaryKey=${record.projectId}`}} title='更新'  >更新</Link>
              <Divider type="vertical" />
              <Popconfirm title="是否删除?" onConfirm={() => this.deleteProject(record.projectId)}>
                <a href="javascript:;">删除</a>
              </Popconfirm>
            </span>
          )}}
    ]

   getCommonSearch = ()=>(<ProjectSearch 
                            {...{
                                onSearch:this.listEntity,
                                ...this.props.search
                            }}
                            />)
    
   
}




class ProjectManagement extends React.Component{
    render(){
        return (
            <ProjectGrid
                {...{
                    grid:{
                        columns:this.columns,
                        listUrl:"/demo/listProject",
                        deleteUrl:"/demo/deleteProject",
                        addPage:"/demo/commoncrud/save",
                        antdTableCofnig:{
                            rowKey:(record)=>(record.projectId)
                        },
                        handleListRes:(res)=>{
                            return {
                                total:res.data.info.total,
                                results:res.data.results
                            }
                        },beforeHandle:(value)=>{
                            return value;
                        }
                    },
                    search:{
                        hidetoggle:false,
                        rowColNumber:3,
                        searchForm:{
                            /* searchFormPropConfig:{
                                colSpan:6
                            } */
                        }
                    }
                }}
            />
        )
    }
}


export default ProjectManagement