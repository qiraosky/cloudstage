const demo = {
    'GET /saas-demo/test': (req, res) => {
        res.send({ status: 'ok', message: 'Demo测试 ！' });
    }
}
module.exports = demo