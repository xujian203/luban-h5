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
      }, {
        key: '3',
        name: 'Jim Green',
        age: 42,
        address: 'London No. 1 Lake Park',
        tags: ['loser']
      }, {
        key: '4',
        name: 'Jim Green',
        age: 42,
        address: 'London No. 1 Lake Park',
        tags: ['loser']
      }, {
        key: '5',
        name: 'Jim Green',
        age: 42,
        address: 'London No. 1 Lake Park',
        tags: ['loser']
      }, {
        key: '6',
        name: 'Jim Green',
        age: 42,
        address: 'London No. 1 Lake Park',
        tags: ['loser']
      }, {
        key: '7',
        name: 'Jim Green',
        age: 42,
        address: 'London No. 1 Lake Park',
        tags: ['loser']
      }, {
        key: '8',
        name: 'Jim Green',
        age: 42,
        address: 'London No. 1 Lake Park',
        tags: ['loser']
      }, {
        key: '9',
        name: 'Jim Green',
        age: 42,
        address: 'London No. 1 Lake Park',
        tags: ['loser']
      },
      {
        key: '10',
        name: 'Joe Black',
        age: 32,
        address: 'Sidney No. 1 Lake Park',
        tags: ['cool', 'teacher']
      }, {
        key: '11',
        name: 'Joe Black2',
        age: 32,
        address: 'Sidney No. 1 Lake Park',
        tags: ['cool', 'teacher']
      }, {
        key: '12',
        name: 'Joe Black3',
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
  mounted () {
    if (this.editingElement.pluginProps._dataSource) {
      this.editingItem = JSON.stringify(this.editingElement.pluginProps._dataSource)
    }
  },
  render (h) {
    const ele = this.editingElement
    let code = this.editingItem

    if (!ele) return (<span>{this.$t('editor.editPanel.common.empty')}</span>)
    return <div>
      <a-button onClick={this.mixinScript} >应用设置</a-button>
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
