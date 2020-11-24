<template>
  <component v-bind="$props" v-bind:is="`a-row`" style="padding:10px">
    <a-col :span="18" style="margin-bottom:10px;text-align:left;">
      <span>会议室名称：</span>
      <a-input placehoder="请输入关键字" style="width:20vw"></a-input>
    </a-col>
    <a-col :span="18" style="margin-bottom:10px;text-align:left;">
      <span>会议室名称：</span>
      <a-input placehoder="请输入关键字" style="width:20vw"></a-input>
    </a-col>
    <a-col :span="18" style="margin-bottom:10px;text-align:left;">
      <span>会议室名称：</span>
      <a-input placehoder="请输入关键字" style="width:20vw"></a-input>
    </a-col>
    <a-col :span="6">
      <a-button>搜索</a-button>
    </a-col>
  </component>
</template>
<script>
import PropTypes from '@luban-h5/plugin-common-props'
import index from '../../../common/header/index.vue'

export default {
  components: { index },
  name: 'boe-row',
  props: {
    enableResize:
    {
      type: Boolean,
      default: function () {
        return false
      }
    },
    type: PropTypes.string({ label: 'type', defaultValue: 'flex' }),
    width: PropTypes.string({ label: 'staticWidth', defaultValue: '100%' }),
    height: PropTypes.string({ label: 'staticHeight', defaultValue: 'auto' }),
    _style:
    {
      type: Object,
      default: function () {
        return {
          // wdith: 'auto !important',
          padding: '10px',
          boxShadow: '3px 3px 3px #ccc'
        }
      }
    }
  }
}
</script>
