<script>
import Vue from 'vue'
import ShortcutButton from './shortcut-button.vue'
import langMixin from 'core/mixins/i18n'
import dragMixin from 'core/mixins/drag'
import loadPluginsMixin from 'core/plugins/index'
import { mapActions } from 'vuex'

export default Vue.extend({
  mixins: [langMixin, dragMixin, loadPluginsMixin],
  data: () => ({
    npmPackages: [],
    activeKey: [1, 2]
  }),
  methods: {
    ...mapActions('editor', [
      'elementManager',
      'pageManager',
      'saveWork',
      'setEditingPage'
    ]),
    ...mapActions('loading', {
      updateLoading: 'update'
    }),
    clone (shortcutItem) {
      this.elementManager({
        type: 'add',
        value: shortcutItem
      })
    }
  },
  /**
   * #!zh: 在左侧或顶部导航上显示可用的组件快捷方式，用户点击/拖拽之后，即可将其添加到中间画布上
   * #!en: render shortcust at the sidebar or the header.
   * if user click/drag the shortcut, the related plugin will be added to the canvas
   */
  render (h) {
    // return this.renderShortCutsPanel(this.groups)
    console.log('pluginsList', this.pluginsList)
    return (
      <a-collapse activeKey={this.activeKey}>
        <a-collapse-panel key="1" header="Basic">
          <a-row
            gutter={0}
            style="max-height: calc(100vh - 150px);overflow: auto;overflow-x:hidden; margin:0;background-color:#e8e8e9"
          >
            {this.pluginsList
              .filter((plugin) => plugin.visible && plugin.type !== 'ant')
              .map((plugin) => (
                <a-col span={8} style={{ marginTop: '0px' }}>
                  <ShortcutButton
                    clickFn={this.clone.bind(this, plugin)}
                    mousedownFn={this.handleDragStartFromMixin.bind(
                      this,
                      plugin
                    )}
                    title={plugin.i18nTitle[this.currentLang] || plugin.title}
                    faIcon={plugin.icon}
                    disabled={plugin.disabled}
                  />
                </a-col>
              ))}
          </a-row>
        </a-collapse-panel>
        <a-collapse-panel key="2" header="Ant">
          <a-row
            gutter={0}
            style="max-height: calc(100vh - 150px);overflow: auto;overflow-x:hidden; margin:0;background-color:#e8e8e9"
          >
            {this.pluginsList
              .filter((plugin) => plugin.visible && plugin.type === 'ant')
              .map((plugin) => (
                <a-col span={8} style={{ marginTop: '0px' }}>
                  <ShortcutButton
                    clickFn={this.clone.bind(this, plugin)}
                    mousedownFn={this.handleDragStartFromMixin.bind(
                      this,
                      plugin
                    )}
                    title={plugin.i18nTitle[this.currentLang] || plugin.title}
                    faIcon={plugin.icon}
                    disabled={plugin.disabled}
                  />
                </a-col>
              ))}
          </a-row>
        </a-collapse-panel>
      </a-collapse>
    )
  }
})
</script>
<style lang="scss" scoped>
::v-deep .ant-collapse-content > .ant-collapse-content-box {
  padding: 0;
}
::v-deep.ant-collapse {
  border: 0;
}
::v-deep.ant-collapse > .ant-collapse-item {
  border: 0;
}
::v-deep.ant-collapse .ant-collapse-icon-position-left {
  border: 0;
}
::v-deep .ant-collapse-header {
  background: #e8e8e9;
  border: 0;
}
</style>
