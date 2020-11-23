<template>
  <component v-bind="$props" v-bind:is="`a-select`" :style="_style">
    <a-select-option value="jack">
      Jack
    </a-select-option>
    <a-select-option value="lucy">
      Lucy
    </a-select-option>
  </component>
</template>
<script>
// https://github.com/luban-h5-components/plugin-common-props
import PropTypes from '@luban-h5/plugin-common-props'

export default {
  name: 'boe-selector',
  props: {
    text: PropTypes.string({ label: 'dataKey' }),
    placeholder: PropTypes.string({ defaultValue: 'placeholder', label: 'placeholder' }),
    borderColor: PropTypes.color({ label: '边框颜色', defaultValue: '#ced4da' }),
    _style: Object
  }
}
</script>
