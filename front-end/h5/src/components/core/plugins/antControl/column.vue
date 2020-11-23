<template>
  <component v-bind="$props" v-bind:is="`a-col`" :style="_style"></component>
</template>
<script>
import PropTypes from '@luban-h5/plugin-common-props'

export default {
  name: 'boe-col',
  props: {
    span: PropTypes.number({ label: 'span', defaultValue: 1 }),
    _style: Object
  }
}
</script>
