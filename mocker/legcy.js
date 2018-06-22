let dataTemp = []

const legcy = {
    'GET /api/save': (req, res) => {
        let now = new Date()
        dataTemp.push(`${now.toLocaleDateString()} ${now.toLocaleTimeString()}`)
        res.send({ status: 'ok', message: '保存成功1！' });
    },
    'GET /api/detail': dataTemp,
    'GET /api/getGridList': (req, res)=>{
        const entitylist = [];
        for (let i = 0; i < 100; i++) {
            entitylist.push({
                key: i.toString(),
                name: `Edrward ${i}`,
                age: 32,
                address: `London Park no. ${i}`,
            });
        }
        throw new Error({"name":1})
        return res.send(entitylist);
    },
    'GET /api/someReqSendError': (req, res)=>{
        const entitylist = [];
        throw new Error({"name":1})
        return res.send(entitylist);
    },
    'GET /api/user': { id: 1, username: 'kenny', sex: 6 , text : 'this is a text from server' },
    'GET /api/user/getlist': (req,res) => { 
        let now = new Date()
        let data = `This is a Get Request --- ${now.toLocaleDateString()} ${now.toLocaleTimeString()}`;
        return res.send(data)
    },
    'POST /api/user/postlist': (req,res) => { 
        let now = new Date()
        let data = `This is a Post Request --- ${now.toLocaleDateString()} ${now.toLocaleTimeString()}`;
        return res.send(data)
    },
    'POST /api/login/account': (req, res) => {
        const { password, username } = req.body;
        if (password === '888888' && username === 'admin') {
            return res.send({
                status: 'ok',
                code: 0,
                token: "sdfsdfsdfdsf",
                data: { id: 1, username: 'kenny', sex: 6 }
            });
        } else {
            return res.send({ status: 'error', code: 403 });
        }
    },
    'DELETE /api/user/:id': (req, res) => { 
        console.log('---->', req.body)
        console.log('---->', req.params.id)
        res.send({ status: 'ok', message: '删除成功！' });
    }
}

module.exports = legcy