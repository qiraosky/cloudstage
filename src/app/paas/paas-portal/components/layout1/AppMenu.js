import React from 'react'
import Loadable from 'react-loadable';
import Loading from '../../../../components/loading/RemoteComponentLoading'; 
import { connect } from 'react-redux';

//映射Redux state到组件的属性  
function mapStateToProps(state) {
    return {
        initMenu: state.topMenuSwitchReducer.initMenu
    }
}
//映射Redux actions到组件的属性  
function mapDispatchToProps(dispatch) {
    return {}
}


const CloudMenu = Loadable({
    loader: () =>
      import(/* webpackChunkName: "paas-iam/menu" */ "../../../paas-iam/components/CloudMenu"),
      loading: Loading
});


class AppMenu extends React.Component {
    constructor(props){
        super(props)
    }
    render(){
        return(
            <CloudMenu 
                mode='inline' 
                initMenu={this.props.initMenu} 
                inlineCollapsed={this.props.inlineCollapsed}
            /> //vertical  inline
        )
    }
 }
 //connect to container
 AppMenu = connect(mapStateToProps, mapDispatchToProps)(AppMenu) 
 export default AppMenu;