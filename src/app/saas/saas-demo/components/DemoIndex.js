import React from 'react';
import { Link } from 'react-router-dom';
import { List } from 'antd';

const data = [
    {name:"框架测试",uri:"/demo/iframeDemo"}, 
    {name:"传参测试",uri:{pathname:"/demo/paramDemo",search:"?param1=100&param2=test",payload:{var1:100,var2:"test2"}}}, //paramDemo
    {name:"http测试",uri:"/demo/httpUtilsDemo"}, 
    {name:"综合演示",uri:"/demo/busiTableDemo"}
  ];

const Demo = (props) =>{
    return (
            <div>
                <h1>演示索引页:</h1>
                <List
                    bordered
                    dataSource={data}
                    renderItem={item => (
                            <List.Item>
                                <Link to={item.uri} >
                                    {item.name}
                                </Link>
                            </List.Item>
                    )}
                />
            </div>
    )
}
export default Demo;