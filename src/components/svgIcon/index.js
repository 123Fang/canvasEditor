import svgIcon from './svgIcon/index.vue';

export default {
  install(Vue) {
    Vue.component(svgIcon.name, svgIcon);
  },
};
