import React from 'react'
import { Breadcrumb } from 'antd';

class AppBreadcrumb extends React.Component {

    render(){
        return(
            <Breadcrumb style={{ margin: '16px 0' }}>
                <Breadcrumb.Item>首页</Breadcrumb.Item>
                <Breadcrumb.Item>列表</Breadcrumb.Item>
                <Breadcrumb.Item>应用</Breadcrumb.Item>
            </Breadcrumb>
        )
    }
}
export default AppBreadcrumb;