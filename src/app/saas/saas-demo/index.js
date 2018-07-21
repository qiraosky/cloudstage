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
/*************************************************************************************************** */

const AutoProjectManagement = Loadable({
    loader: () =>
      import(/* webpackChunkName: "saas-demo/autoprojectmanagement" */ "./components/autoprojectmanagement"),
      loading: Loading
});

const AutoProjectOperation = Loadable({
    loader: () =>
      import(/* webpackChunkName: "saas-demo/autoprojectmanagement" */ "./components/autoprojectmanagement/AutoProjectOperation"),
      loading: Loading
});

const AutoProjectDetail = Loadable({
    loader: () =>
      import(/* webpackChunkName: "saas-demo/autoprojectmanagement" */ "./components/autoprojectmanagement/AutoProjectDetail"),
      loading: Loading
});

/************************************************************************************************** */


const CommonCrud = Loadable({
    loader: () =>
      import(/* webpackChunkName: "saas-demo/commoncrud" */ "./components/commoncrud"),
      loading: Loading
});


const ProjectManagementSave = Loadable({
    loader: () =>
      import(/* webpackChunkName: "saas-demo/commoncrud/save" */ "./components/commoncrud/ProjectManagementSave"),
      loading: Loading
});

const ProjectManagementUpdate = Loadable({
    loader: () =>
      import(/* webpackChunkName: "saas-demo/commoncrud/update" */ "./components/commoncrud/ProjectManagementUpdate"),
      loading: Loading
});

const ProjectManagementDetail = Loadable({
    loader: () =>
      import(/* webpackChunkName: "saas-demo/commoncrud/detail" */ "./components/commoncrud/ProjectManagementDetail"),
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
        {url:'autoprojectmanagement',componentName:'AutoProjectManagement'},
        {url:'autoprojectadd',componentName:'AutoProjectOperation'},
        {url:'autoprojectupdate',componentName:'AutoProjectOperation'},
        {url:'autoprojectdetail',componentName:'AutoProjectDetail'},
        {url:'commoncrud/index',componentName:'CommonCrud'},
        {url:'commoncrud/save',componentName:'ProjectManagementSave'},
        {url:'commoncrud/update',componentName:'ProjectManagementUpdate'},
        {url:'commoncrud/detail',componentName:'ProjectManagementDetail'},
        
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
    AutoProjectManagement,
    AutoProjectOperation,
    AutoProjectDetail,
    CommonCrud,
    ProjectManagementSave,
    ProjectManagementUpdate,
    ProjectManagementDetail,
    ROUTE_MAPPER
}