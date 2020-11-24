<template>
  <component v-bind="$props" v-bind:is="`a-select`">
    <a-select-option :key="index" :value="option.value" v-for="(option,index) in _dataSource">
      {{option.label}}
    </a-select-option>
  </component>
</template>
<script>
import PropTypes from '@luban-h5/plugin-common-props'

export default {
  name: 'boe-selector',
  props: {
    text: PropTypes.string({ label: 'dataKey' }),
    placeholder: PropTypes.string({ defaultValue: 'placeholder', label: 'placeholder' }),
    borderColor: PropTypes.color({ label: '边框颜色', defaultValue: '#ced4da' }),
    _dataSource:
    {
      type: Array,
      default: function () {
        return [
          { label: 'a', value: 1 },
          { label: 'bv', value: 2 }
        ]
      }
    }
  }
}
</script>
