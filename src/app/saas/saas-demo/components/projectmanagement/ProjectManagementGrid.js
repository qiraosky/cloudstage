import React from 'react';


class ProjectManagement extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            search:{}
        };
    }

    render(){
        if(this.state.search != this.props.search){
            console.log(this.props);
            this.state.search = this.props.search;
        }
        return(<div>ProjectManagementGrid</div>)
    }
}

export default ProjectManagement;