import React from 'react'
import { Table , Button , Divider , Icon } from 'antd';
import { http } from '../../../../utils/HttpUtils';

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
      { text: 'Male', value: 'male' },
      { text: 'Female', value: 'female' },
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
      <a href="javascript:;">详情</a>
      <Divider type="vertical" />
      <a href="javascript:;">更新</a>
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
                <Button type="primary">新增</Button>
                <Table
                        columns={columns}
                        bordered
                        //rowKey={record => record.login.uuid}
                        dataSource={this.state.data}
                        pagination={this.state.pagination}
                        loading={this.state.loading}
                        onChange={this.handleTableChange}
                    />
            </div>
        );
    }
}
export default BusiTableGrid;


