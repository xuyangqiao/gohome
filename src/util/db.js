// 本地數據庫
export const db = {
  curDb: null,
  creatDb: () => {
    const req = window.indexedDB.open('todo_list', 1)
    req.onerror = () => {
      console.log('打开失败')
    }
    req.onsuccess = function () {
      console.log('数据库打开成功')
      db.curDb = req.result
    }
    req.onupgradeneeded = () => {
      let rs = req.result
      let store = rs.createObjectStore('todo_list', {
        keyPath: 'addTime'
      })
      store.createIndex('index', 'addTime', {unique: true})
    }
  },
  insertTask: (obj) => {
    const tran = db.curDb.transaction(['todo_list'], 'readwrite')
    // 通过事务控制对象获取数据表对象
    const objectStore = tran.objectStore('todo_list')
    const addRequest = objectStore.add(obj)
    addRequest.onsuccess = function () {
      return true
    }
  },
  getTaskList: () => {
    if (!db.curDb) {
      return
    }
    return new Promise((resolve) => {
      let trans = db.curDb.transaction('todo_list', 'readwrite')
      let store = trans.objectStore('todo_list')
      var request = store.getAll()
      request.onsuccess = function (e) {
        var list = e.target.result
        resolve(list)
      }
    })
  },
  completeTask: (obj, status) => {
    let trans = db.curDb.transaction('todo_list', 'readwrite')
    let store = trans.objectStore('todo_list')
    let index = store.index('index')
    const request = index.get(obj.addTime)
    request.onsuccess = (e) => {
      let data = e.target.result
      data.isComplete = status
      store.put(data)
    }
  },
  deleteTask: (obj) => {
    let trans = db.curDb.transaction('todo_list', 'readwrite')
    let store = trans.objectStore('todo_list')
    store.delete(obj.addTime)
  },
  updateTask: (obj, content) => {
    let trans = db.curDb.transaction('todo_list', 'readwrite')
    let store = trans.objectStore('todo_list')
    let index = store.index('index')
    const request = index.get(obj.addTime)
    request.onsuccess = (e) => {
      let data = e.target.result
      data.content = content
      store.put(data)
    }
  }
}
