import React from 'react'
import ProjectManagement from './ProjectManagement';

class Index extends React.Component{
    constructor(props){
        super(props);
    }//end of constructor

    render(){
        return (
            <div>
                <ProjectManagement superProps={this.props}/>
            </div>
        );
    }
}
export default Index;
