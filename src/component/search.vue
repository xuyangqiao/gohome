<template>
  <div class="search-wrap">
    <!--<form method=get action="http://www.google.com/search" target="_blank">
        <input type=text name=q size=40 maxlength=255 value="">
        <input type=submit name=btnG value="谷歌搜索">
      </form>-->
    <div class="search-type">
      <span class="search-item" :class='{active: activeFlag === 1}' @click='searchNav(1)'>百度</span>
      <span class="search-item" :class='{active: activeFlag === 2}' @click='searchNav(2)'>Google</span>
    </div>
    <form :action="searchConfigBox.url" target="_blank" class="search-form">
      <input type=text :name='searchConfigBox.name' size=40 :placeholder='searchConfigBox.placeholder' class="search-box">
      <!--<input type="submit" value="" class="search-brn">-->
      <div class="search-icon-wrap">
        <i class="iconfont icon-search"></i>
      </div>
    </form>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        activeFlag: 1,
        searchConfig: {
          baidu: {
            'url': 'http://www.baidu.com/baidu',
            'name': 'word',
            'placeholder': 'BaiDu搜索'
          },
          google: {
            'url': 'http://www.google.com/search',
            'name': 'q',
            'placeholder': 'Google搜索'
          }
        }
      }
    },
    computed: {
      searchConfigBox () {
        if (this.activeFlag === 1) {
          return this.searchConfig.baidu
        } else {
          return this.searchConfig.google
        }
      }
    },
    methods: {
      searchNav (flag) {
        this.activeFlag = flag
      }
    }
  }
</script>

<style lang="scss">
.search-wrap {
  display: inline-block;
  .search-type {
    margin-bottom: 15px;
    text-align: left;
    .search-item {
      transition: all linear .3s;
      cursor: pointer;
      border-radius: 3px;
      font-size: 13px;
      padding: 7px 15px;
      font-weight: 500;
      color: #fff;
      text-transform: uppercase;
      &:hover {
        background-color: rgba(0, 0, 0, .4);
      }
      &.active {
        background-color: rgba(0, 0, 0, .4);
      }
    }
  }
}

.search-form {
  position: relative;
  .search-box {
    border: none;
    padding: 0 15px;
    width: 490px;
    font-size: 14px;
    line-height: 20px;
    height: 45px;
    color: #000;
    border-radius: 3px;
    box-shadow: 0 2px 2px 0 rgba(0, 0, 0, .16), 0 0 0 1px rgba(0, 0, 0, .08);
    outline: none;
  }
  .search-icon-wrap {
    position: absolute;
    top: 0;
    right: 0;
    width: 45px;
    height: 45px;
    line-height: 45px;
    text-align: center;
    background: 0 0;
    border: none;
    .iconfont {
      transition: all .2s linear;
      font-size: 24px;
      cursor: pointer;
      color: #666;
      opacity: .5;
      &:hover {
        opacity: 1;
      }
    }
  }
}
</style>
