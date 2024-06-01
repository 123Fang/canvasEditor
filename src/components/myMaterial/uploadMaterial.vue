<template>
  <div class="my-material">
    <Button icon="md-cloud-upload long type="primary">
      {{ $t('myMaterial.uploadBtn') }}
    </Button>
    <div class="img-group" v-if="fileList.length">
      <Tooltip
        :content="info.name"
        v-for="(info, i) in fileList"
        :key="`${i}-bai1-button`"
        placement="top"
      >
        <div class="tmpl-img-box">
          <Icon
            type="ios-trash"
            class="del-btn"
            color="red"
            @click="removeMaterialHandle(info.id)"
          />
          <Image
            lazy
            :src="info.imgUrl"
            fit="contain"
            height="100%"
            :alt="info.name"
            @click="addImgByElement"
          />
        </div>
      </Tooltip>
    </div>
    <div class="tip" v-else>暂无素材</div>
  </div>
</template>

<script setup name="ImportTmpl">
const APP_APIHOST = import.meta.env.APP_APIHOST;

const canvasEditor = inject('canvasEditor');

const fileList = ref([]);
const isLogin = ref(false);
const getFileListHandle = () => {};

getFileListHandle();


</script>

<style scoped lang="less">
.my-material {
  padding-top: 10px;
}

.img-group {
  background: #eeeeeea1;
  border-radius: 10px;
  padding: 10px;
  margin-top: 10px;
}
.tmpl-img-box {
  width: 134px;
  height: 180px;
  padding: 5px;
  cursor: pointer;
  border-radius: 10px;

  &:hover {
    background: #e3e3e3;
    .del-btn {
      // opacity: 1;
      right: 5px;
    }
  }
}

.del-btn {
  z-index: 1;
  position: absolute;
  top: 5px;
  right: 1000000px;
}

.tip {
  text-align: center;
  padding: 10px;
}
</style>
