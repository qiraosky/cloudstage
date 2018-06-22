import React from 'react'
import { connect } from 'react-redux';
import PaasIam from '../../../paas-iam';


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

class AppMenu extends React.Component {
    constructor(props){
        super(props)
    }
    render(){
        return(
            <PaasIam.CloudMenu 
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