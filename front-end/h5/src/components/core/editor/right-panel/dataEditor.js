import { mapState, mapActions } from 'vuex'

export default {
  data: () => ({
    editingItem: JSON.stringify([
      {
        key: '1',
        name: 'John Brown',
        age: 32,
        address: 'New York No. 1 Lake Park',
        tags: ['nice', 'developer']
      },
      {
        key: '2',
        name: 'Jim Green',
        age: 42,
        address: 'London No. 1 Lake Park',
        tags: ['loser']
      },
      {
        key: '3',
        name: 'Joe Black',
        age: 32,
        address: 'Sidney No. 1 Lake Park',
        tags: ['cool', 'teacher']
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
      this.editingElement.pluginProps._dataSource = JSON.parse(this.editingItem)
    }
  },
  render (h) {
    const ele = this.editingElement
    let code = this.editingItem
    if (this.editingElement.pluginProps._dataSource) {
      code = JSON.stringify(this.editingElement.pluginProps._dataSource)
    }
    if (!ele) return (<span>{this.$t('editor.editPanel.common.empty')}</span>)
    return <div>
      <a-button onClick={this.mixinScript} >使用样式</a-button>
      <div style={{ margin: '20px' }}></div>
      <a-textarea
        rows={36}
        placeholder="Basic usage"
        value={code}
        onChange={(e) => {
          this.editingItem = e.target.value
        }}
      />
    </div>
  }
}
