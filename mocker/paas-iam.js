const iam = {
    'GET /paas-iam/test': (req, res) => {
        res.send({ status: 'ok', message: 'IAM测试1 ！' });
    },
    //侧边栏menu
    'POST /paas-iam/menu/getMenu':(req, res) =>{
        const { menuTag } = req.body;
        let rootMenu = {}
        let menuList = [];
        switch(menuTag){
            case "menu1":menuList = siderMenuJson1;break;
            case "menu2":menuList = siderMenuJson2;break;
            case "menu3":menuList = siderMenuJson3;break;
            case "menu4":menuList = siderMenuJson4;break;
            default: menuList = siderMenuJson1;
        }
        if(menuList instanceof Array && menuList.length > 0){
            rootMenu = {
                key:"rootMenu",
                name:"根菜单",
                children:menuList
            }
        }
        return res.send(rootMenu);
    },
    //顶部menu
    'POST /paas-iam/menu/getTopMenu':(req, res) =>{
        const topMenuData = [
            {name:"系统演示",keyCode:"key1"},
            {name:"项目管理",keyCode:"key2"},
            {name:"工作流管理",keyCode:"key3"},
            {name:"权限管理",keyCode:"key4"}
        ]
        return res.send(topMenuData);
    }
}






//******************************************************************************************* */
//菜单数据

const siderMenuJson1 = [
    {key:"a1",name:'演示菜单',icon:'tag',
        children:[
            {key:"a11",name:'索引页',uri:{pathname:'/demo/index'}},
            {key:"a12",name:'框架引入演示',uri:{pathname:'/demo/iframeimport'}},
            {key:"a13",name:'传参演示',uri:{pathname:'/demo/paramtransmit',search:'?name=1'}},
            {key:"a14",name:'Http调用演示',uri:{pathname:'/demo/httpcall'}},
        ]
    },
    {key:"a2",name:'多级菜单演示',icon:'tool',
        children:[
            {key:"a21",name:'二级菜单1'},
            {key:"a22",name:'二级菜单2'},
            {key:"a23",name:'一二三四五六七八九十',children:[
                {key:"a231",name:'三级菜单6',children:[
                    {key:"a2311",name:'四级菜单1'},
                    {key:"a2312",name:'一二三四五六七八九十'}
                ]},
            {key:"a24",name:'三级菜单7'},
            {key:"a25",name:'三级菜单8'},
            {key:"a26",name:'三级菜单9'},
            {key:"a27",name:'三级菜单10'},
            ]}
        ]
    }
    
];

const siderMenuJson2 = [
    {key:"b1",name:'项目管理',icon:'book',
        children:[
            {key:"b11",name:'概况'},
            {key:"b12",name:'团队',uri:{pathname:'/demo/ParamDemo',search:'?name=1'}},
            {key:"b13",name:'动态'},
            {key:"b14",name:'任务'}
        ]
    },
    {key:"b2",name:'文档管理',icon:'compass',
            children:[
                {key:"b21",name:'需求文档'},
                {key:"b22",name:'设计文档'},
                {key:"b23",name:'开发文档'},
                {key:"b24",name:'测试用例'}
            ]
    },
    {key:"b3",name:'缺陷管理',icon:'share-alt',
        children: [
                {key:"b31",name:'缺陷列表'}
            ]
    },
    {key:"b4",name:'组织管理',icon:'tool',
        children:[
            {key:"b41",name:'部门'},
            {key:"b42",name:'权限'},
            {key:"b43",name:'公司'},
            {key:"b44",name:'动态'}
        ]
    }
];


const siderMenuJson3 = [
    {key:"c1",name:'流程定义',icon:'tool',
        children:[
            {key:"c11",name:'流程定义列表'},
            {key:"c12",name:'参与者配置'},
            {key:"c13",name:'流程分类'}
        ]
    },
    {key:"c2",name:'流程实例',icon:'tag',
        children:[
            {key:"c21",name:'流程实例列表'}
        ]
    }
]; 


const siderMenuJson4 = [
    {key:"d1",name:'用户管理',icon:'tag',
        children:[
            {key:"d11",name:'账号管理'},
            {key:"d12",name:'用户管理'}
        ]
    },
    {key:"d2",name:'权限管理',icon:'tool',
        children:[
            {key:"d21",name:'角色管理'},
            {key:"d22",name:'功能权限'},
            {key:"d23",name:'数据权限'},
            {key:"d24",name:'资源管理'}
        ]
    }
];





/* const menuJson1 = [
    {key:"a",name:'申报管理',icon:'book',
        children:[
            {key:"a1",name:'投资立项申请',uri:'/demo/saasDemoIndex'},
            {key:"a2",name:'投资项目立项计划',uri:{pathname:'/demo/ParamDemo',search:'?name=1'}},
            {key:"a3",name:'项目咨询',uri:'/demo/iframeDemo'},
            {key:"a4",name:'项目申报',uri:''}
        ]
    },
    {key:"b",name:'项目计划',icon:'compass',
            children:[
                {key:"b1",name:'预算分配'},
                {key:"b2",name:'资金计划上报'},
                {key:"b3",name:'付款管理'},
                {key:"b4",name:'付款计划'}
            ]
    },
    {key:"c",name:'项目设计',icon:'share-alt',
        children: [
                {key:"c1",name:'项目设计'},
                {key:"c2",name:'项目变更'}
            ]
    },
    {key:"d",name:'项目实施',icon:'tool',
        children:[
            {key:"d1",name:'项目开工'},
            {key:"d2",name:'项目完工'},
            {key:"d3",name:'项目预警'},
            {key:"d4",name:'工作量管理'},
            {key:"d5",name:'委托施工'}
        ]
    },
    {key:"e",name:'领退料管理',icon:'tag',
        children:[
            {key:"e1",name:'领退料管理'},
            {key:"e2",name:'库存余额查询'}
        ]
    }
];


const menuJson2 = [
    {key:"d",name:'一级菜单二A',icon:'tool',
        children:[
            {key:"d1",name:'二级菜单1'},
            {key:"d2",name:'二级菜单2'},
            {key:"d3",name:'二级菜单3'},
            {key:"d4",name:'二级菜单4'},
            {key:"d5",name:'一二三四五六七八九十',children:[
                {key:"da1",name:'三级菜单6',children:[
                    {key:"daa1",name:'四级菜单1'},
                    {key:"daa2",name:'一二三四五六七八九十'}
                ]},
            {key:"da2",name:'三级菜单7'},
            ]}
        ]
    },
    {key:"e",name:'一级菜单二B',icon:'tag',
        children:[
            {key:"e1",name:'领退料管理'},
            {key:"e2",name:'库存余额查询'}
        ]
    }
];


const menuJson3 = [
    {key:"d",name:'一级菜单三A',icon:'tool',
        children:[
            {key:"d1",name:'项目开工'},
            {key:"d2",name:'项目完工'},
            {key:"d3",name:'项目预警'},
            {key:"d4",name:'工作量管理'},
            {key:"d5",name:'委托施工'}
        ]
    },
    {key:"e",name:'一级菜单三B',icon:'tag',
        children:[
            {key:"e1",name:'领退料管理'},
            {key:"e2",name:'库存余额查询'}
        ]
    }
];


const menuJson4 = [
    {key:"d",name:'一级菜单四A',icon:'tool',
        children:[
            {key:"d1",name:'项目开工'},
            {key:"d2",name:'项目完工'},
            {key:"d3",name:'项目预警'},
            {key:"d4",name:'工作量管理'},
            {key:"d5",name:'委托施工'}
        ]
    },
    {key:"e",name:'一级菜单四B',icon:'tag',
        children:[
            {key:"e1",name:'领退料管理'},
            {key:"e2",name:'库存余额查询'}
        ]
    }
];  */

/******************************************************************************************* */

module.exports = iam