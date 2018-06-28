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



export default {
    Index,
    IframeImport,
    ParamTransmit,
    HttpCall
}