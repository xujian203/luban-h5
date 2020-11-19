import { mapState, mapActions } from 'vuex'

import RenderEditCanvas from './edit'
import RenderPreviewCanvas from './preview'
import sidebar from '../masterPage/sidebar.vue'

export default {
  name: 'EditorCanvas',
  data: () => ({
    isPreviewMode: false
  }),
  computed: {
    ...mapState('editor', {
      editingPage: state => state.editingPage,
      editingElement: state => state.editingElement,
      elements: state => state.editingPage.elements,
      pages: state => state.work.pages,
      work: state => state.work,
      scaleRate: state => state.scaleRate
    }),
    ...mapState('loading', [
      'saveWork_loading',
      'previewWork_loading',
      'setWorkAsTemplate_loading',
      'uploadWorkCover_loading'
    ])
  },
  methods: {
    ...mapActions('editor', [
      'elementManager',
      'pageManager',
      'saveWork',
      'createWork',
      'fetchWork',
      'updateWork',
      'setWorkAsTemplate',
      'setEditingElement',
      'setEditingPage'
    ]),
    handleToggleMode (isPreviewMode) {
      this.isPreviewMode = isPreviewMode
      if (isPreviewMode) {
        // 当切换到预览模式的时候，清空当前编辑元素
        this.setEditingElement() // 相当于  setEditingElement(null)
      }
    }
  },
  render (h) {
    return (
      <a-layout id="canvas-outer-wrapper">
        <a-radio-group
          class="mode-toggle-wrapper"
          size="small"
          value={this.isPreviewMode}
          onInput={this.handleToggleMode}
        >
          {/* 编辑模式、预览模式 */}
          <a-radio-button label={false} value={false}>{this.$t('editor.centerPanel.mode.edit')}</a-radio-button>
          <a-radio-button label={true} value={true}>{this.$t('editor.centerPanel.mode.preview')}</a-radio-button>
        </a-radio-group>
        <a-layout-content style={{ transform: `scale(${this.scaleRate})`, 'transform-origin': 'center top' }}>

          <a-layout>
            <a-layout-sider><sidebar></sidebar></a-layout-sider>
            <a-layout>
              <a-layout-header>表头预览区域</a-layout-header>
              <a-layout-content>
                <div class='canvas-wrapper' style={{
                  height: `${this.work.height}px`
                }}>
                  {this.isPreviewMode
                    ? <RenderPreviewCanvas elements={this.elements} />
                    : <RenderEditCanvas
                      class="edit-mode"
                      elements={this.elements}
                    />
                  }
                </div>
              </a-layout-content>
              {/* <a-layout-footer>欢迎使用动态Web应用系统</a-layout-footer> */}
            </a-layout>
          </a-layout>
        </a-layout-content>
      </a-layout>
    )
  }
}
