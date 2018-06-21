import React from 'react'
import { Layout } from 'antd';
const { Footer} = Layout;

class AppFooter extends React.Component {
    render(){
        return(
            <Footer style={{ textAlign: 'center' }}>
                 CloudStage ©2018  Created by qiraosky
            </Footer>
        )
    }
}
export default AppFooter;