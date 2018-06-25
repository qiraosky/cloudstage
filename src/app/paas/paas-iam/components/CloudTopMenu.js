import React from 'react'
import { Menu, Icon  } from 'antd';
import CloudMenuService from '../services/CloudMenuService';

const topMenuData = [
    {name:"项目管理",keyCode:"key1"},
    {name:"预算管理",keyCode:"key2"},
    {name:"统计分析",keyCode:"key3"},
    {name:"系统管理",keyCode:"key4"}
]



class CloudTopMenu extends React.Component {
    constructor(props){
        super(props)
        this.renderMenu = this.renderMenu.bind(this);
    }

    renderMenu () {
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