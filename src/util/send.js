export const downClassSend = () => {
  const date = new Date()
  let y = date.getFullYear()
  let m = date.getMonth() + 1
  let d = date.getDate()
  const downTime = y + '/' + m + '/' + d + ' ' + window.localStorage.getItem('downTime')
  const t = new Date(downTime).getTime() - date.getTime()

  if (t <= 60 * 60 * 1000 && t >= 60 * 60 * 1000 - 1000) {
    sendMsg({
      title: '下班倒计时1个小时',
      content: '马上下班了，请开启酱油模式'
    })
  }

  if (t <= 60 * 30 * 1000 && t >= 60 * 30 * 1000 - 1000) {
    sendMsg({
      title: '下班倒计时30分钟',
      content: '马上下班了，请开启酱油模式'
    })
  }

  if (t <= 60 * 1 * 1000 && t >= 60 * 1 * 1000 - 1000) {
    sendMsg({
      title: '请关电脑！',
      content: '打卡机排队，不见不散！'
    })
  }

  if (t <= 0 && t >= -1000) {
    sendMsg({
      title: '下班啦！down class go people!',
      content: '已经下班了，还不赶紧跑路，难道正在加班！'
    })
  }
}

function sendMsg (obj) {
  Notification.requestPermission(function (perm) {
    if (perm === 'granted') {
      /* eslint-disable no-new */
      new Notification(obj.title, {
        dir: 'auto',
        lang: 'hi',
        tag: 'down',
        icon: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1496728870744&di=401a20937595920e7aed8a6be3b2e7e9&imgtype=0&src=http%3A%2F%2Fwww.qqtu8.com%2Ff%2F20130513200302.gif',
        body: obj.content
      })
    }
  })
}

export default {
  downClassSend
}
