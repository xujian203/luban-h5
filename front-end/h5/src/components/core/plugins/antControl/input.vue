<template>
  <component v-bind="$props" v-bind:is="`a-input`" v-if="$runtime" v-model="$pageContext[dataKey]"></component>
  <component v-bind="$props" v-bind:is="`a-input`" v-else></component>
  <!-- <component v-bind="$props" v-bind:is="`a-input`"></component> -->
</template>
<script>
import PropTypes from '@luban-h5/plugin-common-props'

export default {
  name: 'boe-input',
  props: {
    text: PropTypes.string({ label: '属性名(英文)' }),
    placeholder: PropTypes.string({ defaultValue: 'placeholder', label: 'placeholder' }),
    borderColor: PropTypes.color({ label: '边框颜色', defaultValue: '#ced4da' }),
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
