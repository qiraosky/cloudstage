import Loadable from 'react-loadable';
import Loading from '../../components/loading/RemoteComponentLoading';
/*************************************************************************************************** */
const Index = Loadable({
    loader: () =>
      import(/* webpackChunkName: "saas-demo/index" */ "./components"),
      loading: Loading
});
/*************************************************************************************************** */
const IframeImport = Loadable({
    loader: () =>
      import(/* webpackChunkName: "saas-demo/iframeimport" */ "./components/iframeimport"),
      loading: Loading
});
/*************************************************************************************************** */
const ParamTransmit = Loadable({
    loader: () =>
      import(/* webpackChunkName: "saas-demo/paramtransmit" */ "./components/paramtransmit"),
      loading: Loading
});
/*************************************************************************************************** */
const HttpCall = Loadable({
    loader: () =>
      import(/* webpackChunkName: "saas-demo/httpcall" */ "./components/httpcall"),
      loading: Loading
});
/*************************************************************************************************** */
const ProjectManagement = Loadable({
    loader: () =>
      import(/* webpackChunkName: "saas-demo/projectmanagement" */ "./components/projectmanagement"),
      loading: Loading
});

const ProjectOperation = Loadable({
    loader: () =>
      import(/* webpackChunkName: "saas-demo/projectmanagement" */ "./components/projectmanagement/ProjectOperation"),
      loading: Loading
});

const ProjectDetail = Loadable({
    loader: () =>
      import(/* webpackChunkName: "saas-demo/projectmanagement" */ "./components/projectmanagement/ProjectDetail"),
      loading: Loading
});

/************************************************************************************************** */
const ROUTE_MAPPER = {
    basePath:'demo',
    routerList: [
        {url:'index',componentName:'Index'},
        {url:'iframeimport',componentName:'IframeImport'},
        {url:'paramtransmit',componentName:'ParamTransmit'},
        {url:'httpcall',componentName:'HttpCall'},
        {url:'projectmanagement',componentName:'ProjectManagement'},
        {url:'projectadd',componentName:'ProjectOperation'},
        {url:'projectupdate',componentName:'ProjectOperation'},
        {url:'projectdetail',componentName:'ProjectDetail'},
    ]
}
/************************************************************************************************** */
export default {
    Index,
    IframeImport,
    ParamTransmit,
    HttpCall,
    ProjectManagement,
    ProjectOperation,
    ProjectDetail,
    ROUTE_MAPPER
}