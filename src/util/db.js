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
      rs.createObjectStore('todo_list', {
        autoIncrement: 'task_id' // 指明当前数据id自增长（indexdb）
      })
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
    return new Promise((resolve) => {
      let trans = db.curDb.transaction('todo_list', 'readwrite')
      let store = trans.objectStore('todo_list')
      var request = store.getAll()
      request.onsuccess = function (e) {
        var list = e.target.result
        resolve(list)
      }
    })
  }
}
