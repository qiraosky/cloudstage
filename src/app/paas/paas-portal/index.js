import Loadable from 'react-loadable';
import Loading from '../../components/loading/RemoteComponentLoading';

const AppLayout = Loadable({
    loader: () =>
      import(/* webpackChunkName: "paas-portal/appLayout" */ "./components/layout1/AppLayout"),
      loading: Loading
});

export default {
    AppLayout
}