<template>
  <div class="my-material" >
    <Tabs size="small" v-model="type">
      <TabPane label="模板" name="templ">
        <myTempl v-if="type === 'templ'"></myTempl>
      </TabPane>
      <TabPane label="图片" name="img">
        <uploadMaterial v-if="type === 'img'"></uploadMaterial>
      </TabPane>
    </Tabs>
  </div>
</template>

<script setup name="ImportTmpl">
import uploadMaterial from './uploadMaterial';
import myTempl from './myTempl';

const type = ref('templ');

getFileListHandle();
</script>

<style scoped lang="less">
.my-material {
  padding-top: 10px;
}
.tip {
  padding: 20px;
  text-align: center;
}
</style>
