import Loadable from 'react-loadable';
import Loading from '../../components/loading/RemoteComponentLoading';

const CloudMenu = Loadable({
    loader: () =>
      import(/* webpackChunkName: "paas-iam/menu" */ "./components/CloudMenu"),
      loading: Loading
});

export default {
    CloudMenu
}