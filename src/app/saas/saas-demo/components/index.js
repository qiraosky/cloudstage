import React from 'react';
import { Link } from 'react-router-dom';
import { List } from 'antd';

const data = [
    {name:"框架引入演示",uri:"/demo/iframeimport"}, 
    {name:"传参演示",uri:{pathname:"/demo/paramtransmit",search:"?param1=100&param2=test",payload:{var1:100,var2:"test2"}}}, //paramDemo
    {name:"Http调用演示",uri:"/demo/httpcall"}, 
    {name:"增删改查综合演示（项目管理）",uri:"/demo/projectmanagement"},
    {name:"通用增删改查",uri:"/demo/commoncrud/index"}
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