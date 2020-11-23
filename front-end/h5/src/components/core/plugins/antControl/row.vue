<template>
  <component v-bind="$props" v-bind:is="`a-row`" :style="_style">
    <!-- <a-col :span="24"></a-col> -->
  </component>
</template>
<script>
import PropTypes from '@luban-h5/plugin-common-props'

export default {
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
    _style:
    {
      type: Object,
      default: function () {
        return {
          // wdith: 'auto !important',
          // margin: '10px',
          boxShadow: '3px 3px 3px #ccc'
        }
      }
    }
  }
}
</script>
