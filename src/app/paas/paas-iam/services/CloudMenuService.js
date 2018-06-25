import { syncHttp } from '../../../utils/HttpUtils';


//得到菜单数据
const  getMenuData = (menuTag) => {
    let rootMenu = syncHttp({
        url:"/paas-iam/menu/getMenu",
        data:JSON.stringify({menuTag:menuTag})
    });
        return rootMenu;
    }


//菜单数据
export default {
    getMenuData
};
