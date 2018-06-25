const portal = {
    'GET /paas-portal/test': (req, res) => {
        res.send({ status: 'ok', message: 'Portal测试 ！' });
    }
}
module.exports = portal