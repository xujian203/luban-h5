<template>
  <component xx="xx" v-bind="$props" v-bind:is="`div`">
    <!-- {{_dataSource[dataKey]}} -->
    {{_dataSource}}
  </component>
</template>
<script>
import PropTypes from '@luban-h5/plugin-common-props'

export default {
  name: 'boe-div',
  props: {
    dataKey: PropTypes.string({ label: 'dataKey', defaultValue: 'name' }),
    _dataSource:
    {
      type: String,
      default: function () {
        return '[Dynamic Data]'
      }
    }
  }
}
</script>
