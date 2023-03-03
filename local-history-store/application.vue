<template>
<div>
  搜索内容，进本地的localStorage，
</div>
</template>

<script>
import {getStore} from "./Utils";
export default {
  name: "application",
  data(){
    return{
      searchValue: '', // 搜索内容
      searchHistory: [], // 搜索历史记录
      restaurantList: [], // 搜索返回的结果
      showHistory: true, // 是否显示历史记录，只有在返回搜索结果后隐藏
      emptyResult: false, // 搜索结果为空时显示
    }
  },
  created(){

  },
  mounted(){
    // 判断内部是否有曾经加入过历史搜索记录，如果有就加入searchHistory内，方便展示
    if (getStore('searchHistory')) {
      this.searchHistory = JSON.parse(getStore('searchHistory'));
    }
  },
  methods:{
    //点击提交按钮，搜索结果并显示，同时将搜索内容存入历史记录,Value是要搜索的内容,搜索的内容限制string

    async searchTarget(Value){
      let TargetValue = Value.trim();
      if (TargetValue){
        this.searchValue = TargetValue
      }
      else if (!this.searchValue){
          return
      }
      //隐藏历史记录
      this.showHistory = false;
      //获取搜索结果
      this.restaurantList = await searchRestaurant(this.geohash, this.searchValue);
      this.emptyResult = !this.restaurantList[0];
      /*判断是否有searchHistory，如果没有就把输入的内容加进去，然后存到localStorage中，
      如果存在，就判断输入的内容是否重复，如果重复就不添加，最后更新localStorage*/
      let history = getStore('searchHistory');
      if (history) {
        let checkrepeat = false;
        this.searchHistory = JSON.parse(history);
        this.searchHistory.forEach(item => {
          if (item == this.searchValue) {
            checkrepeat = true;
          }
        })
        if (!checkrepeat) {
          this.searchHistory.unshift(this.searchValue)
        }
      }else {
        this.searchHistory.unshift(this.searchValue)
      }
      setStore('searchHistory',this.searchHistory)
    },

    // @input事件触发，搜索结束后，删除搜索内容直到为空时清空搜索结果，并显示历史记录
    checkInput(){
      if (this.searchValue.trim() === '') {
        this.showHistory = true; //显示历史记录
        this.restaurantList = []; //清空搜索结果
        this.emptyResult = false; //隐藏搜索为空提示
      }
    },
    //点击删除按钮，删除当前历史记录
    deleteHistory(index){
      this.searchHistory.splice(index, 1);
      setStore('searchHistory',this.searchHistory);
    },

    //清除所有历史记录
    clearAllHistory(){
      this.searchHistory = [];
      setStore('searchHistory',this.searchHistory);
    }
  }
}
</script>

<style scoped>

</style>