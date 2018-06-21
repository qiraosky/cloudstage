const TopMenuSwitchReducer = (state = {initMenu:"menu1"}, action) => {
    if(action.type==="PAAS_PORTAL_TOP_MENU_SWITCH" && action.key)
    switch (action.key) {
        case 'key1':{ 
            return {
                initMenu : "menu1"   
            };
        }
        case 'key2':{
            return {
                initMenu : "menu2"   
            };
        }
        case 'key3':{
            return {
                initMenu : "menu3"   
            };
        }
        case 'key4':{
            return {
                initMenu : "menu4"   
            };
        }
    }
    return state;
}
export default TopMenuSwitchReducer;