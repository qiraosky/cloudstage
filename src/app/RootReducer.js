import { combineReducers } from 'redux';
import Loadable from 'react-loadable';
import Loading from './components/loading/RemoteComponentLoading';

Promise.all(
    import('./paas/paas-portal/reducers/index.js')
).then(function(args){
     console.log(args)
})


console.log(PaasPortal)
const rootReducer = combineReducers({
});

export default rootReducer;