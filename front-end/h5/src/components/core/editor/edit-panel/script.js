/*
 * @Author: ly525
 * @Date: 2020-02-09 15:22:36
 * @LastEditors: ly525
 * @LastEditTime: 2020-02-15 17:08:06
 * @FilePath: /luban-h5/front-end/h5/src/components/core/editor/edit-panel/script.js
 * @Github: https://github.com/ly525/luban-h5
 * @Description: Do not edit
 * @Copyright 2018 - 2019 luban-h5. All Rights Reserved
 */
import Vue from 'vue'
import { mapState, mapActions } from 'vuex'
import scriptList from '@/constants/script'

export default {
  data: () => ({
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
    mixinScript (script) {
      const pluginName = this.editingElement.name
      const editingPlugin = this.$options.components[this.editingElement.name]
      // eslint-disable-next-line no-new-func
      const mixin = new Function(script.value)()
      const newEdingtingPlugin = editingPlugin.mixin({
        name: pluginName,
        ...mixin
      })
      Vue.component(pluginName, newEdingtingPlugin)
    }
  },
  render (h) {
    const ele = this.editingElement
    if (!ele) return (<span>{this.$t('editor.editPanel.common.empty')}</span>)
    return <div>
      {/* <a-button onClick={this.mixinScript}>使用脚本</a-button> */}
      {/* <div style={{ margin: '20px' }}>全部行为列表</div> */}
      <a-card title="全部行为列表" style="width: 300px">
        <a href="#" slot="extra">more</a>
        {
          scriptList.map((script, index) => {
            return <a-button class="script-item" type="dashed" onClick={() => {
              this.mixinScript(script)
              this.editingElement.scripts.push(script)
            }}>{script.label}</a-button>
          })
        }
      </a-card>
      {/* <a-textarea
        rows={12}
        placeholder="Basic usage"
        value={this.editorContent}
        onChange={(e) => {
          this.editorContent = e.target.value
        }}
      /> */}
    </div>
  }
}
