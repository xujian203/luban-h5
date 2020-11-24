<template>
  <component v-bind="$props" v-bind:is="`a-table`" style="padding: 10px" height="50vh" :columns="_columns" :data-source="_dataSource" :scroll="{y: '50vh' }"></component>
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
    enableResize:
    {
      type: Boolean,
      default: function () {
        return false
      }
    },
    dataKey: PropTypes.string({ label: 'dataKey', defaultValue: 'list' }),
    width: PropTypes.string({ label: 'staticWidth', defaultValue: '100%' }),
    text: PropTypes.string({ label: 'dataKey' }),
    borderColor: PropTypes.color({ label: '边框颜色', defaultValue: '#ced4da' }),
    _columns: Array,
    _style:
    {
      type: Object,
      default: function () {
        return {
          padding: '10px'
        }
      }
    },
    _dataSource: Array
  }
}
</script>
