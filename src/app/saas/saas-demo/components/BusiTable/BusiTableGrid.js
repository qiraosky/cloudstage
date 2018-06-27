import React from 'react'
import { Table , Button , Divider , Popconfirm ,message } from 'antd';
import { http } from '../../../../utils/HttpUtils';
import { Link } from 'react-router-dom';


class BusiTableGrid extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            data: [],
            pagination: {showQuickJumper:true,pageSize:5},
            loading: false,
        };
    }//end of constructor


    deleteData = (userId) => {
        http({
          url:'/demo/deleteGridData',
          data:{
            userId:userId
          }
        }).then((req)=>{
          message.success('删除成功');
          console.log("pagination",this.state.pagination)
          this.fetch({
            pageSize:this.state.pagination.pageSize,
            page:this.state.pagination.current
          });
        },(error)=>{
          message.error('删除失败');
        })
    }

    columns = [{
      title: '姓名',
      dataIndex: 'name',
      sorter: true,
      render: name => `${name.first} ${name.last}`,
      width: '20%',
    }, {
      title: '性别',
      dataIndex: 'gender',
      filters: [
        { text: '男', value: 'male' },
        { text: '女', value: 'female' },
      ],
      width: '20%',
      render: gender => (gender=='male'?"男":(gender=="famale"?"女":"未知")),
    }, {
      title: '电子邮箱(账号)',
      dataIndex: 'email',
  },{
    title: '操作',
    key: 'action',
    render: (text, record) => {
      return (
      <span>
        <Link to={{pathname:'/demo/BusiDetailDemo',search:`?userId=${record.userId}&name=abc`}} title='详情'  >详情</Link>
        <Divider type="vertical" />
        <Link to={{pathname:'/demo/busiFormDemoUpdate',search:`?userId=${record.userId}&name=abc`}} title='更新'  >更新</Link>
        <Divider type="vertical" />
        <Popconfirm title="是否删除?" onConfirm={() => this.deleteData(record.userId)}>
          <a href="javascript:;">删除</a>
        </Popconfirm>
      </span>
    )}}
  ];



    handleTableChange = (pagination, filters, sorter) => {
        const pager = { ...this.state.pagination };
        pager.current = pagination.current;
        this.setState({
          pagination: pager,
        });
        this.state.pagination = pagination;
        this.fetch({
          pageSize: pagination.pageSize,
          page: pagination.current,
          sortField: sorter.field,
          sortOrder: sorter.order,
          ...filters,
        });
      }
      fetch = (params = {}) => {
        console.log('params:', params);
        this.setState({ loading: true });
        http({
          url: 'http://127.0.0.1:3001/demo/gridData',
          method: 'post',
          data: {
            pageSize: 10,
            ...params,
          },
          type: 'json',
        }).then((req) => {
          const pagination = { ...this.state.pagination };
          const info = req.data.info;
          const results = req.data.results;
          // Read total count from server
          // pagination.total = data.totalCount;
          console.log(req.data)
          pagination.total = info.total;
          this.setState({
            loading: false,
            data: results,
            pagination,
          });
        });
      }
      componentDidMount() {
        this.fetch();
      }
    

    
    render(){
        return (
            <div>
                <Link to='/demo/busiFormDemoAdd' title='新增' >
                  <Button style={{marginTop:'16px'}} type="primary">新增</Button>
                </Link>
                <Table
                        columns={this.columns}
                        bordered
                        rowKey={record => record.userId}
                        dataSource={this.state.data}
                        pagination={this.state.pagination}
                        loading={this.state.loading}
                        onChange={this.handleTableChange}
                        style={{margin:"16px 16px 16px 0px"}}
                    />
            </div>
        );
    }
}
export default BusiTableGrid;