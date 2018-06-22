import React from 'react'
import { Route } from 'react-router-dom';

import PaaSPortal from './paas/paas-portal';
import SaaSDemo from './saas/saas-demo';


class AppRouter extends React.Component {
    render() {
        return (
            <PaaSPortal.AppLayout>
                <div>
                    <Route exact path="/" component={SaaSDemo.SaasDemoIndex} />
                    <Route path="/saasDemoIndex" component={SaaSDemo.SaasDemoIndex} />
                    <Route path="/iframeDemo" component={SaaSDemo.IFrameDemo} />
                    <Route path="/paramDemo" component={SaaSDemo.ParamDemo} />
                    <Route path="/httpUtilsDemo" component={SaaSDemo.HttpUtilsDemo} />
                    <Route path="/busiFormDemo" component={SaaSDemo.BusiFormDemo} />
                    <Route path="/busiTableDemo" component={SaaSDemo.BusiTableDemo} />
                    <Route path="/busiDetailDemo" component={SaaSDemo.BusiDetailDemo} />
                </div>
            </PaaSPortal.AppLayout>
        )
    }
}
export default AppRouter;