<template>
  <div class="search">
    <van-nav-bar title="商品搜索" left-arrow @click-left="$router.go(-1)" />

    <van-search show-action placeholder="请输入搜索关键词" clearable v-model="searchKey">
      <template #action>
        <div @click="goSearch(searchKey)">搜索</div>
      </template>
    </van-search>

    <!-- 搜索历史 -->
    <div class="search-history">
      <div class="title">
        <span>最近搜索</span>
        <van-icon @click="clear" name="delete-o" size="16" />
      </div>
      <div class="list">
        <div v-for="item in datalist" :key="item" class="list-item" @click="goSearch(item)">{{ item }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { getHistoryItem, setHistoryItem } from '@/utils/storage'
export default {
  name: 'SearchIndex',
  data () {
    return {
      searchKey: '',
      datalist: getHistoryItem()
    }
  },
  methods: {
    goSearch (key) {
      console.log('点击事件触发')
      // if (this.searchKey.trim() === '' || ) return
      // 根据数组值获取索引，有则索引，没有则得-1
      const index = this.datalist.indexOf(key)
      if (index === 0) return
      if (index !== -1) {
        this.datalist.splice(index, 1)
      }
      this.datalist.unshift(key)
      setHistoryItem(this.datalist)
      this.$router.push(`/searchlist?search=${key}`)
    },
    clear () {
      this.datalist = []
      setHistoryItem(this.datalist)
    }
  }
}
</script>

<style lang="less" scoped>
.search {
  .searchBtn {
    background-color: #fa2209;
    color: #fff;
  }
  ::v-deep .van-search__action {
    background-color: #c21401;
    color: #fff;
    padding: 0 20px;
    border-radius: 0 5px 5px 0;
    margin-right: 10px;
  }
  ::v-deep .van-icon-arrow-left {
    color: #333;
  }
  .title {
    height: 40px;
    line-height: 40px;
    font-size: 14px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 15px;
  }
  .list {
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    padding: 0 10px;
    gap: 5%;
  }
  .list-item {
    width: 30%;
    text-align: center;
    padding: 7px;
    line-height: 15px;
    border-radius: 50px;
    background: #fff;
    font-size: 13px;
    border: 1px solid #efefef;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    margin-bottom: 10px;
  }
}
</style>
