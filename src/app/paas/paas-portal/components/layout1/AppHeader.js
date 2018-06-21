import React from 'react'
import { Layout, Menu } from 'antd';
import { connect } from 'react-redux';
const { Header } = Layout;
import { topMenuSwitchAction  } from '../../actions/Actions';


//映射Redux state到组件的属性  
function mapStateToProps(state) {
    return state
}
//映射Redux actions到组件的属性  
function mapDispatchToProps(dispatch) {
    return {
        onMenuSwitchKey: (key) => {
            return () => dispatch(topMenuSwitchAction(key))
        }
    }
}

//组件
class AppHeader extends React.Component {
    constructor(props){
        super(props)
    }
    render(){
        return(
            <Header className="header" style={{paddingLeft:"0px"}}>
            <div className="logo" > LOGO DIV</div>
            <Menu
                theme="dark"
                mode="horizontal"
                defaultSelectedKeys={['1']}
                style={{ lineHeight: '64px' }}
            >
                <Menu.Item key="1" onClick={this.props.onMenuSwitchKey('key1')}>项目管理</Menu.Item>
                <Menu.Item key="2" onClick={this.props.onMenuSwitchKey('key2')}>预算管理</Menu.Item>
                <Menu.Item key="3" onClick={this.props.onMenuSwitchKey('key3')}>统计分析</Menu.Item>
                <Menu.Item key="4" onClick={this.props.onMenuSwitchKey('key4')}>系统管理</Menu.Item>
            </Menu>
            </Header>
        )
    }
}

//connect to container
AppHeader = connect(mapStateToProps, mapDispatchToProps)(AppHeader) 
export default AppHeader;