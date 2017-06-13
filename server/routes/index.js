var express = require('express')
var router = express.Router()
var axios = require('axios')
var io = require('socket.io')(8888)

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', {
    title: '偷偷告诉你下班了'
  })
})

// {
//     'perception': {
//         'inputText': {
//             'text': '附近的酒店'
//         },
//         'selfInfo': {
//             'location': {
//                 'city': '北京',
//                 'latitude': '39.45492',
//                 'longitude': '119.239293',
//                 'nearest_poi_name': '上地环岛南',
//                 'province': '北京',
//                 'street': '信息路'
//             },
//         }
//     },
//     'userInfo': {
//         'apiKey': '',
//         'userId': 
//     }
// }

var crypto = require('crypto')
const timestamp = new Date().getTime()
var key = md5('67996387e89654d0ONOFF' + timestamp + '55cc6a37f47f4fa7be4c46d9f942b648')
var iv = '' // 替换成自己需要的iv
var algorithm = 'aes-128-cbc'

function encrypt (text) {
  var cipher = crypto.createCipher(algorithm, key)
  var crypted = cipher.update(text, 'utf8', 'binary')
  crypted += cipher.final('binary')
  crypted = new Buffer(crypted, 'binary').toString('base64')
  return crypted
}

function md5 (text) {
  var md5sum = crypto.createHash('md5')
  md5sum.update(text)
  text = md5sum.digest('hex')
  return text
}

function decrypt (encrypted) {
  var decipher = crypto.createDecipheriv(algorithm, key, iv)
  decipher.update(encrypted, 'hex')
  return decipher.final('utf8')
}

io.on('connection', function (socket) {
  socket.on('news', function (data) {
    // let obj = {
    //   'perception': {
    //     'inputText': {
    //       'text': data.msg
    //     },
    //     'selfInfo': {
    //       'location': {
    //         'city': data.city,
    //         'province': data.province
    //       }
    //     }
    //   },
    //   'userInfo': {
    //     'key': '55cc6a37f47f4fa7be4c46d9f942b648',
    //     'userId': data.userId
    //   }
    // }
    // obj = encrypt(JSON.stringify(obj))
    // console.log(obj)
    // const form = {
    //   key: '55cc6a37f47f4fa7be4c46d9f942b648',
    //   timestamp: timestamp,
    //   data: obj
    // }
    const form = {
      key: '55cc6a37f47f4fa7be4c46d9f942b648',
      info: data.msg,
      userid: data.userId
    }
    axios.post('http://www.tuling123.com/openapi/api', form).then((data) => {
      socket.emit('news', data.data)
    })
  })
})

module.exports = router
