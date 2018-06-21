/* react */
import React from 'react';

/* Notification Config */
import './utils/NotificationConfig';

/* HttpAxiosInterceptors */
import './utils/HttpAxiosInterceptors';

/* react-router */
import { HashRouter as Router } from 'react-router-dom';
import AppRouter from './AppRouter';

/* antd */
import 'antd/dist/antd.css';
import { LocaleProvider } from 'antd';
import zh_CN from 'antd/lib/locale-provider/zh_CN';
import 'moment/locale/zh-cn';



/* redux */
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import RootReducer from './RootReducer';
let store = createStore(RootReducer);  


/* application */
class App extends React.Component {
    constructor(props) {
      super(props);
    }
  
    render() {
      return (
      <Provider store={store}> 
              <LocaleProvider locale={zh_CN}>
                  <Router>
                            <AppRouter/>
                  </Router>
              </LocaleProvider>
     </Provider>
      );
    }
}
export default App;