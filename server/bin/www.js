#!/usr/bin/env node

/**
 * Module dependencies.
 */

var app = require('../app')
var debug = require('debug')('server:server')
var http = require('http')
var axios = require('axios')

/**
 * Get port from environment and store in Express.
 */

var port = normalizePort(process.env.PORT || '80')
app.set('port', port)

/**
 * Create HTTP server.
 */

var server = http.createServer(app)

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port)
server.on('error', onError)
server.on('listening', onListening)
var io = require('socket.io')(server)

var crypto = require('crypto')
const timestamp = Date.parse(Date())
var key = md5('67996387e89654d0ONOFF' + timestamp + '55cc6a37f47f4fa7be4c46d9f942b648')
var algorithm = 'aes128'

function encrypt (text) {
  var cipher = crypto.createCipher(algorithm, key)
  var crypted = cipher.update(text, 'utf8', 'binary')
  crypted += cipher.final('binary')
  crypted = new Buffer(crypted, 'binary').toString('base64')
  return crypted
}

function md5 (text) {
  return crypto.createHash('md5').update(text).digest('hex')
}

function decrypt(encrypted) {
  var decipher = crypto.createDecipheriv(algorithm, key, iv)
  decipher.update(encrypted, 'hex')
  return decipher.final('utf8')
}

io.on('connection', function (socket) {
  socket.emit('news', {uesr: 2, msg: '我只对你说一件事，那就是这个世界上许扬桥最帅，最聪明，最厉害了！'})
  socket.on('news', function (data) {
    let obj =
      {
        'perception': {
          'inputText': {
            'text': data.msg
          },
          'selfInfo': {
            'location': {
              'city': data.city,
              'province': data.province
            }
          }
        },
        'userInfo': {
          'apiKey': '55cc6a37f47f4fa7be4c46d9f942b648',
          'userId': data.userId
        }
      }
    // obj = encrypt(JSON.stringify(obj))
    // const form = {
    //   key: '55cc6a37f47f4fa7be4c46d9f942b648',
    //   timestamp: timestamp,
    //   data: obj
    // }
    // console.log(form)
    axios.post('http://openapi.tuling123.com/openapi/api/v2', obj).then((data) => {
      const datas = data.data.results
      let obj = {uesr: 2}
      for (let i = 0; i < datas.length; i++) {
        if (datas[i].resultType === 'text') {
          obj['msg'] = datas[i].values.text
        } if (datas[i].resultType === 'url') {
          obj['url'] = datas[i].values.url
        }
      }
      socket.emit('news', obj)
    })
  })
})

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  debug('Listening on ' + bind);
}
