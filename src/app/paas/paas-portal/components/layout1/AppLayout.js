import React from 'react'
import { Layout } from 'antd';
import { hashHistory } from 'react-router';


import './AppLayout.css';

import AppHeader from './AppHeader';
import AppLeftSider from './AppLeftSider';
import AppFooter from './AppFooter';
import AppBreadcrumb from './AppBreadcrumb';
import AppContent from './AppContent';

class AppLayout extends React.Component {
    constructor(props){
        super(props)
    }

    render(){
        return(
            <Layout>
                <AppHeader/>
                <Layout>
                    <AppLeftSider/>
                    <Layout style={{ padding: '0 24px 24px' }}>
                        <AppBreadcrumb/>
                        <AppContent>
                            {this.props.children}
                        </AppContent>
                        <AppFooter/>
                    </Layout>
                </Layout>
            </Layout>
        )
    }
}
export default AppLayout;