import React from 'react'

class IFrameDemo extends React.Component {
    render() {
        return (
            <div><iframe style={{width:'100%',height:'1000px',border:"0px"}} src="http://www.baidu.com"></iframe></div>
        )
    }
}
export default IFrameDemo;