
 const menuJson1 = [
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
]; 



//以上为模拟数据***********************************************************************************************

//得到菜单数据
const  getMenuData = (menuTag) => {
        let rootMenu = {}
        let menuList = [];
        switch(menuTag){
            case "menu1":menuList = menuJson1;break;
            case "menu2":menuList = menuJson2;break;
            case "menu3":menuList = menuJson3;break;
            case "menu4":menuList = menuJson4;break;
            default: menuList = menuJson1;
        }
        if(menuList instanceof Array && menuList.length > 0){
            rootMenu = {
                key:"rootMenu",
                name:"根菜单",
                children:menuList
            }
        }
        return rootMenu;
    }


//菜单数据
export default {
    getMenuData
};
