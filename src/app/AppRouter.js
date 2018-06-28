import React from 'react'
import { Route } from 'react-router-dom';

import PaasPortal from './paas/paas-portal';
import SaasDemo from './saas/saas-demo';


const SAAS_DEMO_ROUTER = {
    basePath:'demo',
    routerList: [
        {url:'index',componentName:'Index'},
        {url:'iframeimport',componentName:'IframeImport'},
        {url:'paramtransmit',componentName:'ParamTransmit'},
        {url:'httpcall',componentName:'HttpCall'},
        {url:'projectmanagement',componentName:'ProjectManagement'},
        {url:'projectoperation',componentName:'ProjectOperation'},
        {url:'projectdetail',componentName:'ProjectDetail'},
    ]
}

class AppRouter extends React.Component {
    resloveRouter = (component,routerData) => {
        return routerData.routerList.map((item,index) => {
            let key = `${routerData.basePath}_${index}`;
            let url = `/${routerData.basePath}/${item.url}`;
            return (
                <Route key={key} path={url} component={component[item.componentName]} />
            )
        })
    }

    render() {
        return (
            <PaasPortal.AppLayout>
                <div>
                    <Route exact path="/" component={PaasPortal.Home} />
                    {this.resloveRouter(SaasDemo,SAAS_DEMO_ROUTER)}
                </div>
            </PaasPortal.AppLayout>
        )
    }
}
export default AppRouter;