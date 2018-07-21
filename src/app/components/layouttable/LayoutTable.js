import {Table} from "antd";

class LayoutTable extends React.Component {
    constructor(props) {
        super(props);

        //批量改变this指向
        let events = [];
        this.onBind(events);
    }

    onBind(events) {
        let _this = this;
        events.map(event => {
            _this[event] = _this[event].bind(_this);
        });
    }

    render() {

        let {
            // 列格式配置
            columns,
            // 数据源
            dataSource,
            // 渲染的唯一key
            rowKey,
            // 滚动
            scroll,
            // 翻页
            pagination,
            // 通用配置方便扩展
            _layoutTableConfig,
        } = this.props;

        let paginationBasic = {
            total: 0,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total, range) => <span>{`显示第`}<span style={{color: '#0093f7'}}>{range[0]}</span>{`条到第`}<span style={{color: '#0093f7'}}>{range[1]}</span>{`条，共`}<span>{total}</span>{`条记录`}</span>
        };

        pagination = $.extend({}, paginationBasic, pagination);
        return (
            <Table className={'epm-table'}
                {...{
                    columns,
                    dataSource,
                    rowKey,
                    bordered:false,
                    size: 'small',
                    pagination,
                    scroll,
                    ..._layoutTableConfig
                }}
            />
        )
    }
}

export default LayoutTable;