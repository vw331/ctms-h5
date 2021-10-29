<template>
  <div class="bg-gray-100 min-h-screen">
    <van-nav-bar v-if="showNavBar" fixed placeholder :title="title" />
    <router-view v-slot="{ Component }">
      <keep-alive>
        <component :is="Component" />
      </keep-alive>
    </router-view>
    <van-tabbar placeholder route>
      <van-tabbar-item replace to="/projectList" icon="medal-o"
        >项目</van-tabbar-item
      >
      <van-tabbar-item replace to="/todo" icon="todo-list-o"
        >待办</van-tabbar-item
      >
      <div class="start-action-bar">
        <van-icon
          size="20px"
          @click="handleShowPopup"
          class="start-bar font-bold shadow-md"
          name="plus"
        />
      </div>
      <van-tabbar-item replace to="/message" icon="chat-o"
        >消息</van-tabbar-item
      >
      <van-tabbar-item replace to="/me" icon="user-o">我的</van-tabbar-item>
    </van-tabbar>
    <van-popup
      v-model:show="showPopup"
      position="bottom"
      :style="{ minHeight: '65%' }"
    >
      <van-grid :column-num="3" square :border="false" clickable>
        <van-grid-item icon="map-marked" icon-color="#409EFF" text="签到" />
        <van-grid-item icon="photograph" icon-color="#67C23A" text="拍照" />
        <van-grid-item icon="bookmark" icon-color="#E6A23C" text="常用公式" />
        <van-grid-item icon="font" icon-color="#F56C6C" text="记事本" />
        <van-grid-item icon="friends" icon-color="#409EFF" text="通讯录" />
      </van-grid>
    </van-popup>
  </div>
</template>

<script setup>
import { ref, inject, computed } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const showPopup = ref(false);
const isMiniprogram = inject("isMiniprogram");

const title = computed(() => route.meta.title);
const showNavBar = computed(() => {
  if (isMiniprogram.value) return false;
  const { showNavBar = true } = route.meta;
  return showNavBar;
});

const handleShowPopup = () => {
  showPopup.value = true;
};
</script>

<style lang="less" scoped>
.start-action-bar {
  flex: 0.5;
  position: relative;
  .start-bar {
    position: absolute;
    top: -10px;
    left: 50%;
    z-index: 99;
    outline: 15px;
    transform: translateX(-50%);
    display: flex;
    justify-content: center;
    align-items: center;
    width: 40px;
    height: 40px;
    background: rgb(0, 132, 255);
    color: #ffffff;
    border-radius: 50%;
  }
}
</style>