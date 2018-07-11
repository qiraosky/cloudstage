import React from 'react';
import { Table , Button , message } from 'antd';
import { Link } from 'react-router-dom';
import '../../../index.css';
import { AutoDataTableUtils } from '../../../../../utils/AutoComponentUtils';

class CommonGrid extends React.Component {
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

    columns = []

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
          this.props.grid.listUrl,
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
          this.props.grid.deleteUrl,projectId).then((req)=>{
          message.success('删除成功');
          this.listEntity(this.state.queryParam);
        });
    }

    getCommonSearch = ()=>(<div></div>)

      componentDidMount() {
        this.listEntity(this.state.queryParam);
      }

    render(){
        return(
            <div>
              {this.getCommonSearch()}
            {/* <CommonSearch 
              {...{
                onSearch:this.listEntity,
                ...this.props.search
              }}
            /> */}
            <Link to={this.props.grid.addPage} title='新增' >
              <Button style={{marginTop:'16px'}} type="primary">新增</Button>
            </Link>
            <Table
                  {...(()=>{
                    return {
                      columns:this.columns,
                      bordered:true,
                      size:"small",
                      rowKey:(record => record.projectId),
                      dataSource:this.state.data,
                      pagination:this.state.pagination,
                      loading:this.state.loading,
                      onChange:this.handleTableChange,
                      scroll:{ x: 1150 },
                      style:{margin:"16px 16px 16px 0px"},
                      ...this.props.grid.antdTableCofnig,
                    }
                  })()}
                />
        </div>
        )
    }
}

export default CommonGrid;