var express = require('express')
var router = express.Router()
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

module.exports = router
