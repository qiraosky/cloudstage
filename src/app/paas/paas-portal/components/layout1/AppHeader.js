import React from 'react'
import { Layout, Menu , Avatar , Badge , Popover , Icon} from 'antd';
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
    messageContent = (
        <div style={{textAlign:"left"}}>
          <p>您有一条待办流程</p>
          <p>流程《ABC》已办结</p>
        </div>
      );
    accountContent = (
        <div style={{width:"130px"}}>
          <p style={{cursor: "pointer"}}><Icon type="user" /> <span style={{marginLeft:"10px"}}>个人中心</span> </p>
          <p style={{cursor: "pointer"}}><Icon type="setting" /> <span style={{marginLeft:"10px"}}>设置</span></p>
          <p style={{cursor: "pointer"}}><Icon type="logout" /> <span style={{marginLeft:"10px"}}>退出登陆</span> </p>
        </div>
    )

    render(){
        return(
            <Header className="header" style={{paddingLeft:"0px"}}>
            <div className="logo" > CLOUD STAGE LOGO</div>
            <div style={{width:"100px",height:"64px",color:"#FFF",float:"right",cursor: "pointer"}}>

                <Popover content={this.messageContent} placement="bottomRight">
                    <Badge style={{marginTop:"20px",zIndex:"10000",marginLeft:"-20px"}} 
                        count={1000}>
                        <Avatar size="large" style={{marginTop:"12px",background:"#001529",marginRight:"10px",cursor: "pointer"}} icon="bell" />
                    </Badge>
                </Popover>

                <Popover content={this.accountContent} placement="bottomRight">
                    <Avatar size="large" icon="user" style={{marginTop:"12px",background:"#001529", cursor: "pointer"}}/>
                </Popover>

            </div>
            <Menu
                theme="dark"
                mode="horizontal"
                defaultSelectedKeys={['1']}
                style={{ lineHeight: '64px', width:'800px' }}
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