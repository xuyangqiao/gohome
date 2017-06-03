var express = require('express')
var router = express.Router()
var axios = require('axios')

/* GET home page. */
router.get('/main', function (req, res, next) {
  axios.get('http://bing.ioliu.cn/v1/rand?w=1920&h=1080&type=json').then((data) => {
    const list = {
      code: 200,
      data: data.data.data
    }
    res.send(list)
  })
})

module.exports = router
