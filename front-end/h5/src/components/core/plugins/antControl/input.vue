<template>
  <component v-bind="$props" v-bind:is="`a-input`" :style="_style"></component>
</template>
<script>
// https://github.com/luban-h5-components/plugin-common-props
import PropTypes from '@luban-h5/plugin-common-props'

export default {
  name: 'boe-input',
  props: {
    text: PropTypes.string({ label: '属性名(英文)' }),
    placeholder: PropTypes.string({ defaultValue: 'placeholder', label: 'placeholder' }),
    borderColor: PropTypes.color({ label: '边框颜色', defaultValue: '#ced4da' }),
    _style: Object
  }
}
</script>
