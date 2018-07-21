import React from "react";
import {Upload, Icon, Button} from 'antd';
import "./FileUpload.less";

class FileUpload extends React.Component {
    constructor(props) {
        super(props);

        //批量改变this指向
        let events = [];
        this.onBind(events);
    }

    onBind(events) {
        let _this = this;
        events.map(event => {
            _this[event] = _this[event].bind(_this);
        });
    }

    render() {
        let {uploadConfig, children, btnTxt, hideFileList} = this.props;

        return (
            <Upload {...uploadConfig} className={`epm-fileupload ${hideFileList && 'epm-fileupload-hidelist'}`}>
                <Button>
                    <Icon type="upload" /> {btnTxt}
                </Button>
                {children}
            </Upload>
        )
    }
}

export default FileUpload;