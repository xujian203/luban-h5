<template>
  <component v-bind="$props" v-bind:is="`a-table`" :style="_style" :columns="_columns" :data-source="_dataSource"></component>
</template>
<script>
import PropTypes from '@luban-h5/plugin-common-props'

export default {
  name: 'ant-table',
  data: function () {
    return {
      abc: []
    }
  },
  props: {
    text: PropTypes.string({ label: '属性名(英文)' }),
    borderColor: PropTypes.color({ label: '边框颜色', defaultValue: '#ced4da' }),
    _style: Object,
    _columns: Array,
    _dataSource: Array
  }
}
</script>
