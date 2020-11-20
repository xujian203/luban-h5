import { mapState, mapActions } from 'vuex'

export default {
  data: () => ({
    editingItem: JSON.stringify([
      {
        dataIndex: 'name',
        key: 'name',
        slots: { title: 'customTitle' },
        scopedSlots: { customRender: 'name' }
      },
      {
        title: 'Age',
        dataIndex: 'age',
        key: 'age'
      },
      {
        title: 'Address',
        dataIndex: 'address',
        key: 'address'
      },
      {
        title: 'Tags',
        key: 'tags',
        dataIndex: 'tags',
        scopedSlots: { customRender: 'tags' }
      },
      {
        title: 'Action',
        key: 'action',
        scopedSlots: { customRender: 'action' }
      }
    ])
  }),
  computed: {
    ...mapState('editor', [
      'editingElement'
    ])
  },
  methods: {
    ...mapActions('editor', [
      'setEditingElement'
    ]),
    mixinScript () {
      console.log('this.editingElement', this.editingElement)
      this.editingElement.pluginProps._columns = JSON.parse(this.editingItem)
    }
  },
  render (h) {
    const ele = this.editingElement
    if (!ele) return (<span>{this.$t('editor.editPanel.common.empty')}</span>)
    return <div>
      <a-button onClick={this.mixinScript} >使用样式</a-button>
      <div style={{ margin: '20px' }}></div>
      <a-textarea
        rows={36}
        placeholder="Basic usage"
        value={this.editingItem}
        onChange={(e) => {
          this.editingItem = e.target.value
        }}
      />
    </div>
  }
}
