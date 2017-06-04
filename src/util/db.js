// 本地數據庫
export const db = {
  creatDb: (name, size = 1024 * 1024, cb) => {
    const dataBase = openDatabase(name, name, size, cb)
    return dataBase
  }
}
