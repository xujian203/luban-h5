import ShortcutButton from './shortcut-button.vue'
// import LoadNpmPlugins from './load-npm-plugins.vue'
import langMixin from 'core/mixins/i18n'
import dragMixin from 'core/mixins/drag'
import loadPluginsMixin from 'core/plugins/index'
import { mapActions } from 'vuex'

export default {
  mixins: [langMixin, dragMixin, loadPluginsMixin],
  data: () => ({
    npmPackages: []
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
    return (
      <a-row
        gutter={0}
        style="max-height: calc(100vh - 150px);overflow: auto;overflow-x:hidden; margin:0;background-color:#e8e8e9"
      >
        {/* <UsageTip /> */}
        {[]
          .concat(this.pluginsList, this.npmPackages)
          .filter(plugin => plugin.visible)
          .map(plugin => (
            <a-col span={8} style={{ marginTop: '0px' }}>
              <ShortcutButton
                clickFn={this.clone.bind(this, plugin)}
                mousedownFn={this.handleDragStartFromMixin.bind(this, plugin)}
                // title={plugin.title}
                title={plugin.i18nTitle[this.currentLang] || plugin.title}
                faIcon={plugin.icon}
                disabled={plugin.disabled}
              />
            </a-col>
          ))}
        {/* <LoadNpmPlugins
          onLoadComplete={npmPackages => {
            this.npmPackages = npmPackages
          }}
        /> */}
      </a-row>
    )
  }
}
