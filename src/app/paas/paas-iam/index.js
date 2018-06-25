import Loadable from 'react-loadable';
import Loading from '../../components/loading/RemoteComponentLoading';

const CloudSiderMenu = Loadable({
    loader: () =>
      import(/* webpackChunkName: "paas-iam/menu" */ "./components/CloudSiderMenu"),
      loading: Loading
});

const CloudTopMenu = Loadable({
    loader: () =>
      import(/* webpackChunkName: "paas-iam/topmenu" */ "./components/CloudTopMenu"),
      loading: Loading
});

export default {
    CloudSiderMenu,
    CloudTopMenu
}