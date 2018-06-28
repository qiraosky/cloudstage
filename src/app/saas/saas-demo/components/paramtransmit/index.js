import React from 'react'
import { Card } from 'antd';

class ParamTransmit extends React.Component {
    constructor(props){
        super(props)
    }
    render() {
        
        return (
            <Card title="传参演示" style={{ width:'100%',height:'100%' }} extra={<a href="#/demo/index">返回</a>}>
                <h1>Param Demo</h1>
                <h3>显式传值（search）:{this.props.location.search}    &nbsp;&nbsp;&nbsp;//浏览器刷新后仍然存在</h3>
                <h3>隐式传值（payload）:{ JSON.stringify(this.props.location.payload)}    &nbsp;&nbsp;&nbsp;//浏览器刷新后不存在,必须通过点击才能够传值，浏览器的前进后退值会丢失</h3>

            </Card>
        )
    }
}
export default ParamTransmit;