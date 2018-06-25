import React from 'react'
import { Menu, Icon  } from 'antd';
import CloudMenuService from '../services/CloudMenuService';


class CloudTopMenu extends React.Component {
    constructor(props){
        super(props)
        this.renderMenu = this.renderMenu.bind(this);
    }

    renderMenu () {
        let topMenuData = CloudMenuService.getTopMenuData();
        if(!(topMenuData instanceof Array)){
            return null;
        }
        return topMenuData.map((item,index) => {
            return (<Menu.Item key={index} 
                        onClick={this.props.onMenuSwitchKey(item.keyCode)}>
                        {item.name}
                    </Menu.Item>);
        })
    }

    render(){
        return(
            <Menu
                theme="dark"
                mode="horizontal"
                defaultSelectedKeys={['0']}
                style={{ lineHeight: '64px', width:'800px' }}
            >
            {this.renderMenu()}
            </Menu>
        )
    }
}

export default CloudTopMenu;