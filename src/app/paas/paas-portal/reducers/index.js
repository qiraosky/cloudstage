import TopMenuSwitchReducer from './TopMenuSwitchReducer'
import { combineReducers } from 'redux';
import React from 'react'

class Reducers extends React.Component{
    data = combineReducers({
        TopMenuSwitchReducer
    })
    
}

export default Reducers