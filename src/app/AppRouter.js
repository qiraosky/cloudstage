import React from 'react'
import { Route } from 'react-router-dom';
import PaasPortal from './paas/paas-portal';
//最小化启动模式（无菜单，布局等）
const MINI_FRAMEWORK = false;

// SaasDemo 配置
import SaasDemo from './saas/saas-demo';


class AppRouter extends React.Component {
    resloveRouter = (saasImport,routeMapper) => {
        if(!routeMapper){
            routeMapper = saasImport.ROUTE_MAPPER;
        }
        if(!routeMapper || !routeMapper.routerList 
            || !(routeMapper.routerList instanceof Array) 
            || routeMapper.routerList.lenth <=0){
            console.error(`BasePath = ${routeMapper?routeMapper.basePath:"undefined"},RouteMapper.routerList is not an Array or is empty,RouteMapper=`,routeMapper)
            return (<span></span>)
        }

        return routeMapper.routerList.map((item,index) => {
            let key = `${routeMapper.basePath}_${index}`;
            let url = `/${routeMapper.basePath}/${item.url}`;
            return (
                <Route key={key} path={url} component={saasImport[item.componentName]} />
            )
        })
    }

    routeContent = ()=>(
        <div>
            <Route exact path="/" component={PaasPortal.Home} />
            {this.resloveRouter(SaasDemo)}
        </div>
    )

    render() {
        if(MINI_FRAMEWORK){
            return (
                <div>
                    {this.routeContent()}
                </div>
            )
        }else{
            return (
                <PaasPortal.AppLayout>
                    {this.routeContent()}
                </PaasPortal.AppLayout>
            )
        }

    }
}
export default AppRouter;