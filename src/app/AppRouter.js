import React from 'react'
import { Route, IndexRoute } from 'react-router-dom';
import Loadable from 'react-loadable';

import Loading from './components/loading/RemoteComponentLoading';
import AppLayout from './paas/paas-portal/components/layout1/AppLayout';


const SaasDemoIndex = Loadable({
    loader: () =>
      import(/* webpackChunkName: "saas-demo/demoIndex" */ "./saas/saas-demo"),
      loading: Loading
});
const IFrameDemo = Loadable({
    loader: () =>
      import(/* webpackChunkName: "saas-demo/iframeDemo" */ "./saas/saas-demo/IFrameDemo"),
      loading: Loading
});
const ParamDemo = Loadable({
    loader: () =>
      import(/* webpackChunkName: "saas-demo/paramDemo" */ "./saas/saas-demo/ParamDemo"),
      loading: Loading
});
const HttpUtilsDemo = Loadable({
    loader: () =>
      import(/* webpackChunkName: "saas-demo/httpUtilsDemo" */ "./saas/saas-demo/HttpUtilsDemo"),
      loading: Loading
});



class AppRouter extends React.Component {
    render() {
        return (
            <AppLayout>
                <div id="layout">
                    <Route exact path="/" component={SaasDemoIndex} />
                    <Route path="/saasDemoIndex" component={SaasDemoIndex} />
                    <Route path="/iframeDemo" component={IFrameDemo} />
                    <Route path="/paramDemo" component={ParamDemo} />
                    <Route path="/httpUtilsDemo" component={HttpUtilsDemo} />
                </div>
            </AppLayout>
        )
    }
}
export default AppRouter;