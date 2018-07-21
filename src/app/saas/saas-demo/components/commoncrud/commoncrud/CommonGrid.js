import React from 'react';
import { Table , Button , message ,Card } from 'antd';
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

    aboveTableRender = ()=>("")

    getColumns = (columns)=>{
      return columns.map((item,index)=>{
        item.key = `${item.dataIndex}_${index}`
        return item;
      })
    }

    handleTableChange = (pagination, filters, sorter) => {
        const pager = { ...this.state.pagination };
        pager.current = pagination.current;
        this.setState({
          pagination: pager
        });

        let sortParamList = {};
        if (sorter && sorter.field) {
            sortParamList = {
                sortParamList: [{
                    propertyName: sorter.field,
                    sortOption: (sorter.order === 'descend' ? 'DESC' : 'ASC'),
                }]
            };
        }

        this.state.pagination = pagination;
        this.state.queryParam = Object.assign(this.state.queryParam,{
            pageSize: pagination.pageSize,
            page: pagination.current,
            ...sortParamList,
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
          this.state.queryParam,
          this.props.grid.beforeHandle).then((req)=>{
            const {total , results} = ("function" == typeof(this.props.grid.handleListRes)?this.props.grid.handleListRes(req):{
              total:req.data.info.total,
              results:req.data.results
            })
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
            {
              (()=>{
                if(!this.props.grid.hideAddBtn){
                  return (
                    <Link to={this.props.grid.addPage} title='新增' >
                      <Button style={{marginTop:'16px'}} type="primary">新增</Button>
                    </Link>
                  )
                }
              })()
            }
            
            {this.aboveTableRender()}

            <Card className="epm-card">
              <Table className="epm-table"
                    {...(()=>{
                      return {
                        columns:this.getColumns(this.columns),
                        bordered:false,
                        size:"default",
                        dataSource:this.state.data,
                        pagination:this.state.pagination,
                        loading:this.state.loading,
                        onChange:this.handleTableChange,
                        scroll:{ x: 1150 },
                        ...this.props.grid.antdTableCofnig,
                      }
                    })()}
                  />
              </Card>
        </div>
        )
    }
}

export default CommonGrid;