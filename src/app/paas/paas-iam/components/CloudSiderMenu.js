import React from 'react'
import { Menu, Icon  } from 'antd';
import { Link } from 'react-router-dom';
import CloudMenuService from '../services/CloudMenuService';
const { SubMenu } = Menu;

//菜单渲染
class CloudSiderMenu extends React.Component {
    constructor(props){
        super(props)
    }

    getMenuJsx(menuTreeData){
        if(menuTreeData){
            if(menuTreeData.children instanceof Array ){
                if(menuTreeData.children.length >= 0){
                   return (<SubMenu
                        key={menuTreeData.key}
                        title={<span title={menuTreeData.name} >{menuTreeData.icon?<Icon type={menuTreeData.icon} />:""}<span>{menuTreeData.name}</span></span>}
                        >
                        {menuTreeData.children.map((item,index) => (this.getMenuJsx(item)))}
                        </SubMenu>)
                }
            }else{
               return(<Menu.Item key={menuTreeData.key}>
                    <Link to={menuTreeData.uri?menuTreeData.uri:'/'} title={menuTreeData.name} >
                         {menuTreeData.name}
                    </Link>
                </Menu.Item>)
            }
        }
        
    }

    getMenu(menuTag){
        let menuTreeData = CloudMenuService.getMenuData(menuTag);
        if(!menuTreeData || !menuTreeData.children){
            return null;
        }

        return menuTreeData.children.map((menuData)=>{
            return this.getMenuJsx(menuData)
        });
       /*  let menuJson = menuTreeData.children;

         let menuJsx  = menuJson.map((item,index) => {
            let menuItem = item.children.map((item1,index1) => {
                return (<Menu.Item key={item1.key}>
                            <Link to={item1.uri?item1.uri:'/'} title={item1.name} >
                                 {item1.name}
                            </Link>
                        </Menu.Item>);
            });

            let submenu = (<SubMenu
                key={item.key}
                title={<span><Icon type={item.icon} /><span>{item.name}</span></span>}
                >
                    {menuItem}
                </SubMenu>
            )
            return submenu;
        }) 
        return menuJsx; */
    }

    render(){
        let menuJsx = this.getMenu(this.props.initMenu);
        return(
            <Menu 
                defaultSelectedKeys={['a1','a11']} 
                defaultOpenKeys={[]}
                mode={this.props.mode ? this.props.mode : "inline"}
                inlineCollapsed = {this.props.inlineCollapsed}
                >
                {menuJsx}
            </Menu>
        )
    }
 }
 export default CloudSiderMenu;