import React from 'react'
import AutoProjectManagement from './AutoProjectManagement';

class Index extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return (
            <div>
                <AutoProjectManagement superProps={this.props}/>
            </div>
        );
    }
}
export default Index;
