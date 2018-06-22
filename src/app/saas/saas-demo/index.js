import Loadable from 'react-loadable';
import Loading from '../../components/loading/RemoteComponentLoading';

const SaasDemoIndex = Loadable({
    loader: () =>
      import(/* webpackChunkName: "saas-demo/demoIndex" */ "./components/DemoIndex.js"),
      loading: Loading
});
const IFrameDemo = Loadable({
    loader: () =>
      import(/* webpackChunkName: "saas-demo/iframeDemo" */ "./components/IFrameDemo"),
      loading: Loading
});
const ParamDemo = Loadable({
    loader: () =>
      import(/* webpackChunkName: "saas-demo/paramDemo" */ "./components/ParamDemo"),
      loading: Loading
});
const HttpUtilsDemo = Loadable({
    loader: () =>
      import(/* webpackChunkName: "saas-demo/httpUtilsDemo" */ "./components/HttpUtilsDemo"),
      loading: Loading
});
const BusiFormDemo = Loadable({
    loader: () =>
      import(/* webpackChunkName: "saas-demo/busiFormDemo" */ "./components/BusiFormDemo"),
      loading: Loading
});
const BusiTableDemo = Loadable({
    loader: () =>
      import(/* webpackChunkName: "saas-demo/busiTableDemo" */ "./components/BusiTableDemo"),
      loading: Loading
});
const BusiDetailDemo = Loadable({
    loader: () =>
      import(/* webpackChunkName: "saas-demo/busiDetailDemo" */ "./components/BusiDetailDemo"),
      loading: Loading
});



export default {
    SaasDemoIndex,
    IFrameDemo,
    ParamDemo,
    HttpUtilsDemo,
    BusiFormDemo,
    BusiTableDemo,
    BusiDetailDemo
}