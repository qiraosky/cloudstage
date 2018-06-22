import React from 'react'

class ParamDemo extends React.Component {
    constructor(props){
        super(props)
    }
    render() {
        
        return (
            <div>
                <h1>Param Demo</h1>
                <h3>显式传值（search）:{this.props.location.search}    &nbsp;&nbsp;&nbsp;//浏览器刷新后仍然存在</h3>
                <h3>隐式传值（payload）:{ JSON.stringify(this.props.location.payload)}    &nbsp;&nbsp;&nbsp;//浏览器刷新后不存在,必须通过点击才能够传值，浏览器的前进后退值会丢失</h3>

            </div>
        )
    }
}
export default ParamDemo;