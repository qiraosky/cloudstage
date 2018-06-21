import React from 'react'
import { Layout } from 'antd';
const { Sider } = Layout;

import AppMenu from './AppMenu';

class AppLeftSider extends React.Component {
    state = {
        collapsed: false,
      };
      onCollapse = (collapsed) => {
        this.setState({ collapsed });
      }
    render(){
        return(
                <Sider 
                        width={200} 
                        style={{ background: '#fff' }}
                        collapsible
                        collapsed={this.state.collapsed}
                        onCollapse={this.onCollapse}
                        >
                      <AppMenu inlineCollapsed = {this.state.collapsed}/>
                    </Sider>
        )
    }
 }
 export default AppLeftSider;