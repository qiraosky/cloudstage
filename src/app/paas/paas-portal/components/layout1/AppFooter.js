import React from 'react'
import { Layout } from 'antd';
const { Footer} = Layout;

class AppFooter extends React.Component {
    render(){
        return(
            <Footer style={{ textAlign: 'center' }}>
                 ©2018 WebStage CloudStage
            </Footer>
        )
    }
}
export default AppFooter;