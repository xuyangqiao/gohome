<template>
  <div>
    <ul class="btn-nav">
      <li class="nav-item">TO DO</li>
      <li class="nav-item">History</li>
      <li class="nav-item">
        <i class="iconfont icon-iconziti09"></i>
      </li>
    </ul>
  
    <div class="todolist tab-content">
      <h2 class="title">MY TODO LIST</h2>
  
      <ul class="todolist-wrap">
        <li class="item">
          <div class="item-row">
            <i class="iconfont icon-liebiaoqianzhui"></i>
          </div>
          <input type="checkbox" class="complete">
          <div contenteditable class="item-content"></div>
          <div class="delete-btn">
            <i class="iconfont icon-shanchu"></i>
          </div>
        </li>
      </ul>
  
      <div class="new-task">
        <textarea ref="new" v-model.trim="newContent" :style='{ height: newHeight }' @keyup.enter='newTask()' class="new-content" placeholder="添加您的日程安排"></textarea>
        <div class="new-btn">
          <i class="iconfont icon-iconfontbofang1"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { db } from '@/util/db'
export default {
  data () {
    return {
      newHeight: '40px',
      newContent: ''
    }
  },
  watch: {
    newContent (newval) {
      this.newHeight = this.$refs.new.scrollHeight + 'px'
    }
  },
  methods: {
    newTask () {
      let dataBase = db.creatDb('todo_list', function () {
        console.log('數據庫創建成功')
      })

      dataBase.transaction((ts) => {
        ts.executeSql('create table if not exists todo_list(content text null,is_complete boolean false,add_time text null)', [], function (ts, result) {
          console.log(result)
        })
      })
      // let taskArr = []
      // let obj = {
      //   isComplete: false,
      //   content: this.newContent,
      //   addTime: new Date().getTime()
      // }
      // taskArr.push(obj)
      // localStorage.setItem('todoList', JSON.stringify(taskArr))
    }
  }
}
</script>

<style lang="scss" scoped>
.btn-nav {
  position: absolute;
  right: 30px;
  top: 30px;
  transition: all .2s ease-in-out;
  .nav-item {
    color: #fff;
    line-height: 30px;
    padding: 0 10px;
    float: left;
    margin: 0 10px;
    text-shadow: 0 1px 5px rgba(0, 0, 0, .5);
    transition: all .2s ease-in-out;
    text-transform: uppercase;
    border-radius: 2px;
    cursor: pointer;
    &:hover {
      background-color: rgba(0, 0, 0, .4);
    }
  }
}

.tab-content {
  border-radius: 3px;
  float: right;
  color: #333;
  position: absolute;
  right: 220px;
  top: 80px;
  opacity: 1;
  background-color: rgba(255, 255, 255, .95);
  width: 285px;
  padding: 30px 0;
  z-index: 2;
  transition: .2s;
  .title {
    margin-bottom: 17px;
    font-weight: bold;
    padding-left: 30px;
    font-size: 15px;
  }
  .todolist-wrap {
    transition: all .2s ease-in-out;
    overflow-y: scroll;
    max-height: 280px;
    .item {
      position: relative;
      padding: 5px 45px;
      transition: all 0s ease-in-out;
      &:hover {
        .item-row {
          opacity: 1;
        }
        .delete-btn {
          opacity: 1;
        }
      }
      .complete {
        position: absolute;
        top: 7px;
        left: 30px;
        width: 15px;
        height: 15px;
      }
      .item-row {
        position: absolute;
        top: 6px;
        left: 7px;
        opacity: 0;
      }
      .item-content {
        width: 100%;
        padding-left: 5px;
        padding-right: 5px;
        resize: none;
        font-size: 11px;
        line-height: 18px;
        min-height: 18px;
        color: #999;
        border: none;
        outline: none;
        background: 0 0;
      }
      .delete-btn {
        width: 30px;
        height: 30px;
        cursor: pointer;
        position: absolute;
        right: 14px;
        top: 0;
        opacity: 0;
        text-align: center;
        line-height: 30px;
        transition: all .3s ease-in-out;
      }
    }
  }
  .new-task {
    margin-right: 30px;
    margin-left: 30px;
    position: relative;
    margin-top: 20px;
    padding-top: 20px;
    border-top: 1px solid #fff;
    .new-content {
      width: 100%;
      padding-right: 28px;
      resize: none;
      font-size: 11px;
      line-height: 18px;
      color: #333;
      overflow: hidden;
      border: none;
      outline: none;
      background: 0 0;
      box-sizing: border-box;
      height: auto;
    }
    .new-btn {
      width: 30px;
      height: 30px;
      background-color: transparent;
      position: absolute;
      right: -5px;
      top: 16px;
      cursor: pointer;
      text-align: center;
      line-height: 30px;
    }
  }
}
</style>
