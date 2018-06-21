import React from 'react'
import { Layout  } from 'antd';
const { Content } = Layout;

class AppContent extends React.Component {
    constructor(props){
        super(props)
    }

    render(){
        return(
            <Content style={{ background: '#fff', padding: 24, margin: 0, minHeight: 280 }}>
                {this.props.children}
            </Content>
        )
    }
}
export default AppContent;