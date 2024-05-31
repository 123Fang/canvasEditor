<template>
  <div class="home">
    <Layout>
      <!-- 头部区域 -->
      <Header>
      </Header>
      <Content style="display: flex; height: calc(100vh - 64px)">
        <!-- 左侧区域 -->
        <div v-if="state.show" :class="`left-bar ${state.toolsBarShow && 'show-tools-bar'}`">
          <!-- 左侧菜单 -->
          <Menu :active-name="menuActive" accordion @on-select="showToolsBar" width="65px">
            <MenuItem v-for="item in leftBar" :key="item.key" :name="item.key" class="menu-item">
            <Icon :type="item.icon" size="24" />
            <div>{{ item.name }}</div>
            </MenuItem>
          </Menu>
          <!-- 左侧组件 -->
          <div class="content" v-show="state.toolsBarShow">
            <div class="left-panel">
              <KeepAlive>
                <component :is="leftBarComponent[menuActive]"></component>
              </KeepAlive>
            </div>
          </div>
          <!-- 关闭按钮 -->
          <div :class="`close-btn left-btn ${state.toolsBarShow && 'left-btn-open'}`" @click="hideToolsBar"></div>
        </div>

        <!-- 画布区域 -->
        <div id="workspace">
          <div class="canvas-box">
            <div class="inside-shadow"></div>
            <canvas id="canvas" :class="state.ruler ? 'design-stage-grid' : ''"></canvas>
          </div>
        </div>

        <!-- 属性区域 -->
        <div class="right-bar">
        </div>
        <div :class="`close-btn right-btn ${state.attrBarShow && 'right-btn-open'}`" @click="switchAttrBar"></div>
      </Content>
    </Layout>
  </div>
</template>

<script name="Home" setup>

import layer from '@/components/layer.vue';

// 功能组件
import { fabric } from 'fabric';

// hooks
import useSelectListen from '@/hooks/useSelectListen';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

const APIHOST = import.meta.env.APP_APIHOST;




const state = reactive({
  menuActive: 1,
  show: false,
  toolsBarShow: true,
  attrBarShow: true,
  select: null,
  ruler: true,
});

// 左侧菜单渲染
const menuActive = ref('importTmpl');
const leftBarComponent = {
  importTmpl,
  tools,
  importSvgEl,
  fontStyle,
  layer,
  myMaterial,
};

const showToolsBar = (val) => {
  menuActive.value = val;
  state.toolsBarShow = true;
};
// 隐藏工具条
const hideToolsBar = () => {
  state.toolsBarShow = !state.toolsBarShow;
};

const leftBar = ref([
  {
    //模板
    key: 'importTmpl',
    name: t('templates'),
    icon: 'md-book',
  },
  {
    //基础元素
    key: 'tools',
    name: t('elements'),
    icon: 'md-images',
  },
  {
    //字体样式
    key: 'fontStyle',
    name: t('font_style'),
    icon: 'ios-pulse',
  },
  {
    // 图片元素
    key: 'importSvgEl',
    name: t('material.cartoon'),
    icon: 'ios-leaf-outline',
  },
  {
    // 图层
    key: 'layer',
    name: t('layers'),
    icon: 'md-reorder',
  },
  {
    // 用户素材
    key: 'myMaterial',
    name: t('mymaterial'),
    icon: 'ios-contact-outline',
  },
]);

onMounted(() => {
  // 初始化fabric
  const canvas = new fabric.Canvas('canvas', {
    fireRightClick: true, // 启用右键，button的数字为3
    stopContextMenu: true, // 禁止默认右键菜单
    controlsAboveOverlay: true, // 超出clipPath后仍然展示控制条
    imageSmoothingEnabled: false, // 解决文字导出后不清晰问题
    preserveObjectStacking: true, // 当选择画布中的对象时，让对象不在顶层。
  });

});

onUnmounted();





provide('fabric', fabric);

</script>
<style lang="less" scoped>
.home,
.ivu-layout {
  height: 100vh;
}

.icon {
  display: block;
}

.canvas-box {
  position: relative;
}


#canvas {
  width: 300px;
  height: 300px;
  margin: 0 auto;
}

#workspace {
  flex: 1;
  width: 100%;
  position: relative;
  background: #f1f1f1;
  overflow: hidden;
}

.content {
  flex: 1;
  width: 220px;
  padding: 10px;
  padding-top: 0;
  height: 100%;
  overflow-y: auto;
}
</style>
