<template>
  <div>
    <div class="mask" @click='activeNav = -1'></div>
    <ul class="btn-nav">
      <li class="nav-item" :class='{active: activeNav === 1}' @click='navClick($event, 1)'>TO DO</li>
      <!--<li class="nav-item">History</li>-->
      <li class="nav-item">
        <i class="iconfont icon-iconziti09"></i>
      </li>
    </ul>
  
    <div class="todolist tab-content animated" :style='{ right: menuright }' :class="activeNav === 1 ? 'fadeIn' : 'fadeOut'" v-if="activeNav === 1">
      <h2 class="title">MY TODO LIST</h2>
  
      <ul class="todolist-wrap">
        <li class="item" v-for="(item, index) in taskList">
          <div class="item-row">
            <i class="iconfont icon-liebiaoqianzhui"></i>
          </div>
          <input type="checkbox" class="complete" :checked='item.isComplete' @change='taskComplete($event, index)'>
          <div contenteditable @blur='updateTask($event, index)' class="item-content" :class='{ "content-complete": item.isComplete }'>{{item.content}}</div>
          <div class="delete-btn" @click='deleteTask(index)'>
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
      newContent: '',
      taskList: '',
      activeNav: -1,
      menuright: ''
    }
  },
  watch: {
    newContent (newval) {
      this.newHeight = this.$refs.new.scrollHeight + 'px'
    }
  },
  created () {
    this.fetchData()
  },
  methods: {
    navClick (e, flag) {
      const obj = e.srcElement
      var tmp = obj.offsetLeft
      var val = obj.offsetParent
      while (val != null) {
        tmp += val.offsetLeft
        val = val.offsetParent
      }
      this.menuright = window.innerWidth - tmp - e.target.clientWidth + 'px'
      this.activeNav = this.activeNav === flag ? -1 : flag
    },
    async newTask () {
      const obj = {
        isComplete: false,
        content: this.newContent,
        addTime: new Date().getTime()
      }
      db.insertTask(obj)
      this.newContent = ''
      const list = await db.getTaskList()
      this.taskList = list
    },
    taskComplete (e, index) {
      const status = e.target.checked
      db.completeTask(this.taskList[index], status)
      this.fetchData()
    },
    async fetchData () {
      const list = await db.getTaskList()
      this.taskList = list
    },
    deleteTask (index) {
      db.deleteTask(this.taskList[index])
      this.taskList.splice(index, 1)
    },
    updateTask (e, index) {
      const content = e.target.innerHTML
      db.updateTask(this.taskList[index], content)
    }
  }
}
</script>

<style lang="scss" scoped>
.mask{
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #000;
  opacity: .3;
}
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
    &.active {
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
        &.content-complete{
          text-decoration: line-through;
        }
      }
      .delete-btn {
        width: 30px;
        height: 30px;
        cursor: pointer;
        position: absolute;
        right: 14px;
        top: -2px;
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
