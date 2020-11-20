/*
 * @Author: ly525
 * @Date: 2019-11-24 18:51:58
 * @LastEditors: ly525
 * @LastEditTime: 2020-10-10 23:35:42
 * @FilePath: /luban-h5/front-end/h5/src/engine-entry.js
 * @Github: https://github.com/ly525/luban-h5
 * @Description:
    #!zh: 页面预览引擎入口
      构建 engine 页面的入口，作用与 src/main.js 类似，都是页面入口
      作用：作品预览的渲染引擎，原理：遍历 work(作品) 的 pages 以及 elements，显示即可
      使用场景：预览弹窗中预览 和 在手机上查看作品使用
 * @Copyright 2018 - 2020 luban-h5. All Rights Reserved
 */

import Vue from 'vue'
// import 'font-awesome/css/font-awesome.min.css'
import message from 'ant-design-vue/lib/message' // 加载 JS
import 'ant-design-vue/lib/message/style/css' // 加载 CSS

import Element from '../components/core/models/element'
import RenderPreview from '../components/core/editor/canvas/preview'
import NodeWrapper from '../components/core/preview/node-wrapper.js'
import axios from 'axios'

import { pluginsList } from 'core/plugins/index.js'
Vue.config.productionTip = true
Vue.prototype.$message = message

const install = function () {
  // Vue.component(Engine.name, Engine)
  pluginsList.forEach(plugin => {
    Vue.component(plugin.name, plugin.component)
  })
}

install()

export default {
  name: 'engine',
  components: {
    NodeWrapper
  },
  data () {
    return {
      isLongPage: true,
      work: null
    }
  },
  methods: {
    renderLongPage (work) {
      return this.renderPreview(work.pages[0].elements)
    },
    renderSwiperPage () {
      const work = window.__work
      return (
        <div class="swiper-container">
          <div class="swiper-wrapper">{
            work.pages.map(page => {
              return (
                <section class="swiper-slide flat">
                  {/* this.walk(h, page.elements) */}
                  { this.renderPreview(page.elements) }
                </section>
              )
            })
          }</div>
          <div class="swiper-pagination"></div>
        </div>
      )
    },
    renderPreview (pageElements = []) {
      const height = '100%'
      console.log("pageElements",pageElements)
      const elements = pageElements.map(element => new Element(element))
      console.log("elements",elements)
      // src//core/editor/canvas/elements
      return <RenderPreview elements={elements} height={height} />
    },
    getContainerStyle (work) {
      const containerStyle = {
        position: 'relative',
        height: '100%',
        minHeight: '100vh'
      }

      if (this.isLongPage) {
        containerStyle['overflow-y'] = 'scroll'
      }
      return containerStyle
    },
    renderUnPublishTip () {
      return <div style="box-sizing: border-box;min-height: 568px;line-height: 568px;text-align: center;">页面可能暂未发布</div>
    }
  },
  async mounted () {
    const { data: work } = await axios.get("http://localhost:1337/works/15")
    this.work = work
    this.$forceUpdate()
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

    const containerStyle = this.getContainerStyle(work)
    return <div id="work-container" data-work-id={work.id} style={containerStyle}>
      {
        this.renderLongPage(work)
      }
    </div>
  }
}
