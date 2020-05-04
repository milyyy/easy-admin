<template>
  <div class="slider-bar">
    <el-menu
      default-active="2"
      class="el-menu"
      background-color="#97a7df"
      text-color="#333"
      active-text-color="#fff">
      <!-- 多层级 -->
      <template v-for="item in items">

        <!-- 有子级 -->
        <el-submenu v-if="item.children" :index="item.path" :key="item.path">
          <!-- 外层 -->
          <template slot="title">
            <i :class="item.icon"></i>
            <span>{{item.name}}</span>
          </template>
          <!-- 内层 -->
          <router-link v-for="(child,index) in item.children" :to="child.path" :key="child.path">
            <el-menu-item :index="child.path">
              <span>{{child.name}}</span>
            </el-menu-item>
          </router-link>
        </el-submenu>

        <!-- 无子级 -->
        <router-link :to="item.path" v-else>
          <el-menu-item :index="item.path">
            <i class="el-icon-menu"></i>
            <span>{{item.name}}</span>
          </el-menu-item>
        </router-link>

      </template>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: 'sider-bar',
  data(){
    return {
      items: [
        { 
          icon: 'el-icon-s-data',
          name: '首页',
          path: 'home',
        },
        { 
          icon: 'el-icon-s-data',
          name: '资金管理',
          path: 'fund',
          children: [
            {
              path: 'fundlist',
              name: '资金明细'
            }
          ]
        },
        { 
          icon: 'el-icon-s-custom',
          name: '信息管理',
          path: 'info',
          children: [
            {
              path: 'profile',
              name: '个人信息'
            }
          ]
        },
        { 
          icon: 'el-icon-s-data',
          name: '404',
          path: 'not-found',
        },
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.slider-bar {
  background-color: #97a7df;
  width: 240px;
  /deep/ {
    i[class*='el-icon'] {
      color: #333;
    }
  }
  .el-menu {
    width: 240px;
  }
}
</style>