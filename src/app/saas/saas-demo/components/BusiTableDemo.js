import React from 'react'
import BusiTableGrid from './BusiTable/BusiTableGrid';
import BusiTableSearch from './BusiTable/BusiTableSearch';

class BusiTableDemo extends React.Component{
    constructor(props){
        super(props);
    }//end of constructor

    render(){
        return (
            <div>
                <BusiTableSearch/>
                <BusiTableGrid/> 
            </div>
        );
    }
}
export default BusiTableDemo;


