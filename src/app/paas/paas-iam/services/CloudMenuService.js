import { syncHttp } from '../../../utils/HttpUtils';

//得到侧边栏菜单数据
const  getMenuData = (menuTag) => {
    let rootMenu = syncHttp({
        url:"/paas-iam/menu/getMenu",
        data:JSON.stringify({menuTag:menuTag})
    });
    return rootMenu;
}

let topMenuData = null;
const getTopMenuData = () =>{
    if(!topMenuData){
        topMenuData = syncHttp({
            url:"/paas-iam/menu/getTopMenu"
        });
    }
    return topMenuData;
}


//菜单数据
export default {
    getMenuData,
    getTopMenuData
};
