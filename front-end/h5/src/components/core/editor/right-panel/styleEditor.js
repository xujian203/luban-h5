import { mapState, mapActions } from 'vuex'

export default {
  data: () => ({
    editingStyle: `{"color":"red","font-size":"20px"}`
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
      this.editingElement.pluginProps._style = JSON.parse(this.editingStyle)
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
        value={this.editingStyle}
        onChange={(e) => {
          this.editingStyle = e.target.value
        }}
      />
    </div>
  }
}
