import React from 'react'
import { Card } from 'antd';

class IframeImport extends React.Component {
    render() {
        return (
        <Card title="框架导入演示" style={{ width:'100%' }} extra={<a href="#/demo/index">返回</a>}>
                <iframe style={{width:'100%',height:'1000px',border:"0px"}} src="http://www.baidu.com"></iframe>
          </Card>
        )
    }
}
export default IframeImport;