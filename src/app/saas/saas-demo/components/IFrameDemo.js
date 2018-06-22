import React from 'react'

class IFrameDemo extends React.Component {
    render() {
        return (
            <div><iframe style={{width:'100%',height:'100%'}} src="http://www.baidu.com"></iframe></div>
        )
    }
}
export default IFrameDemo;