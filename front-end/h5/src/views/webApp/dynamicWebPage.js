import Vue from 'vue'
import message from 'ant-design-vue/lib/message' // 加载 JS
import 'ant-design-vue/lib/message/style/css' // 加载 CSS

import Element from '@/components/core/models/element'
import RenderPreview from '@/components/core/editor/canvas/preview'
import NodeWrapper from '@/components/core/preview/node-wrapper.js'
import axios from 'axios'
import sidebar from '@/components/core/editor/masterPage/sidebar.vue'

import { pluginsList } from 'core/plugins/index.js'
Vue.config.productionTip = true
Vue.prototype.$message = message
Vue.prototype.$runtime = true
Vue.prototype.$pageContext = {}
const install = function () {
  pluginsList.forEach(plugin => {
    Vue.component(plugin.name, plugin.component)
  })
}

install()

export default {
  name: 'engine',
  components: { NodeWrapper, sidebar },
  data () {
    return {
      isLongPage: true,
      work: null,
      appContext: null,
      pageContext: {},
      currentPage: null
    }
  },
  methods: {
    renderWithMaster (work) {
      const containerStyle = this.getContainerStyle(work)
      const pageElements = this.currentPage.elements || []
      const height = '100%'
      const elements = pageElements.map(element => new Element(element))
      return (
        <div id="work-container" data-work-id={work.id} style={containerStyle}>
          <RenderPreview elements={elements} height={height} pageContext={this.pageContext} />
        </div>)
    },
    getContainerStyle (work) {
      const containerStyle = {
        position: 'relative',
        height: '100%'
      }
      return containerStyle
    },
    renderUnPublishTip () {
      return (
        <div style="box-sizing: border-box;min-height: 568px;line-height: 568px;text-align: center;">
          页面可能暂未发布
        </div>
      )
    }
  },
  async mounted () {
    console.log('this.$route', this.$route)
    const appId = this.$route.params.id
    const { data: work } = await axios.get(`/works/${appId}`)
    this.work = work
    const pageId = this.$route.params.pageId
    this.currentPage = pageId ? work.pages.find(s => s.uuid === pageId) : work.pages[0]
    if (this.currentPage.dataLoadApi) {
      let res = await axios.get(this.currentPage.dataLoadApi)
      Vue.prototype.$pageContext = this.pageContext = res.data
    }
    // this.$forceUpdate()
  },
  render (h) {
    const { work } = this
    console.log(' const', work)
    if (!work) {
      return <div></div>
    }
    // const work = window.__work

    // 预览模式 或者 已经发布 的页面可以正常渲染，否则提示用户暂未发布
    // const query = new URLSearchParams(window.location.search)
    // const canRender = query.get('view_mode') === 'preview' || work.is_publish
    // if (!canRender) return this.renderUnPublishTip()

    return this.renderWithMaster(work)
  }
}
