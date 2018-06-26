import React from 'react'
import { Table , Button , Divider , Icon } from 'antd';
import { http } from '../../../../utils/HttpUtils';
import { Link } from 'react-router-dom';


const columns = [{
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
  }, {
    title: '电子邮箱',
    dataIndex: 'email',
},{
  title: '操作',
  key: 'action',
  render: (text, record) => (
    <span>
      <Link to={{pathname:'/demo/BusiDetailDemo',search:`?name=${record.login.uuid}`}} title='详情'  >详情</Link>
      <Divider type="vertical" />
      <Link to={{pathname:'/demo/busiFormDemo',search:`?name=${record.login.uuid}`}} title='更新'  >更新</Link>
      <Divider type="vertical" />
      <a href="javascript:;">删除</a>
    </span>
  )}
];

class BusiTableGrid extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            data: [],
            pagination: {showQuickJumper:true,pageSize:5},
            loading: false,
        };
    }//end of constructor

      handleTableChange = (pagination, filters, sorter) => {
        const pager = { ...this.state.pagination };
        pager.current = pagination.current;
        this.setState({
          pagination: pager,
        });
        this.fetch({
          results: pagination.pageSize,
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
          url: 'https://randomuser.me/api',
          method: 'get',
          data: {
            results: 10,
            ...params,
          },
          type: 'json',
        }).then((req) => {
          const pagination = { ...this.state.pagination };
          // Read total count from server
          // pagination.total = data.totalCount;
          console.log(req.data)
          pagination.total = 200;
          this.setState({
            loading: false,
            data: req.data.results,
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
                <Link to='/demo/busiFormDemo' title='新增' >
                  <Button style={{marginTop:'16px'}} type="primary">新增</Button>
                </Link>
                <Table
                        columns={columns}
                        bordered
                        //rowKey={record => record.login.uuid}
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


