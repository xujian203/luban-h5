<template>
  <component v-bind="$props" v-bind:is="`a-calendar`">
    <ul slot="dateCellRender" slot-scope="value" class="events">
      <li v-for="item in getListData(value)" :key="item.content">
        <a-badge :status="item.type" :text="item.content" />
      </li>
    </ul>
  </component>
</template>
<script>
import PropTypes from '@luban-h5/plugin-common-props'

export default {
  name: 'boe-calendar',
  methods: {
    getListData (selectedDate) {
      const currentDay = selectedDate.date()
      let listData = this._dataSource.filter(s => s.day === currentDay)
      return listData || []
    }
  },
  props: {
    width: PropTypes.string({ label: 'width', defaultValue: '100%' }),
    _dataSource:
    {
      type: Array,
      default: function () {
        return [
          { day: 1, type: 'warning', content: 'This is warning event.' },
          { day: 2, type: 'success', content: 'This is usual event.' },
          { day: 1, type: 'warning', content: 'This is warning event' },
          { day: 1, type: 'success', content: 'This is very long usual event。。....' },
          { day: 2, type: 'error', content: 'This is error event 1.' },
          { day: 4, type: 'error', content: 'This is error event 2.' },
          { day: 15, type: 'error', content: 'This is error event 3.' },
          { day: 15, type: 'error', content: 'This is error event 4.' }
        ]
      }
    }
  }
}
</script>
