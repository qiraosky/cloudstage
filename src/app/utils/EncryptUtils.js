import md5 from "md5";

const constUtils = {
    DEFAULT_ENCRYPT_ALGORITHM: "MD5",
    SALT_VALUE: "11001015"
};

class EncryptUtils {
    constructor(SALT_POS_PREFIX = "prefix", SALT_POS_SUFFIX = "suffix", ConstUtils = constUtils){
        this.SALT_POS_PREFIX = SALT_POS_PREFIX;
        this.SALT_POS_SUFFIX = SALT_POS_SUFFIX;
        this.ConstUtils = ConstUtils;

        let events = ['encrypt', 'md5Encrypt'];
        this.onBind(this, events);
    }

    onBind(that, events) {
        let _this = that;
        events.map(event => {
            _this[event] = _this[event].bind(_this);
        });
    }

    encrypt (str){

        let {ConstUtils, md5Encrypt, SALT_POS_SUFFIX} = this;

        switch(ConstUtils.DEFAULT_ENCRYPT_ALGORITHM){
            case "MD5":{
                return md5Encrypt(str,ConstUtils.SALT_VALUE);
            }
            case "MD5_TWICE":{
                return md5Encrypt(md5Encrypt(str,ConstUtils.SALT_VALUE),ConstUtils.SALT_VALUE,SALT_POS_SUFFIX);
            }
            default:return str;
        }
    }

    md5Encrypt (str,saltValue,saltPos){

        let {SALT_POS_SUFFIX, SALT_POS_PREFIX} = this;

        saltPos = (saltPos==null?SALT_POS_SUFFIX:saltPos);
        saltValue = (saltValue == null ?"":saltValue);

        let clearText = "";

        switch(saltPos){
            case SALT_POS_PREFIX:{
                clearText = saltValue + "" + str;
                break;
            }
            case SALT_POS_SUFFIX:{
                clearText = str + "" + saltValue;
                break;
            }
        }

        return md5(clearText);
    }
}

export default EncryptUtils;