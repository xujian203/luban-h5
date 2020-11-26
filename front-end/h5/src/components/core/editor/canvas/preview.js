import NodeWrapper from 'core/preview/node-wrapper.js'
/**
 * 预览模块
 * preview h5 work module
 */
export default {
  props: ['elements', 'height', 'pageContext'],
  components: {
    NodeWrapper
  },
  methods: {
    renderPreview (h, elements, pageContext = {}) {
      console.log('1', pageContext)
      const pageWrapperStyle = { height: this.height || '100%', position: 'relative' }
      return (
        <div style={pageWrapperStyle}>
          {
            elements.map((element, index) => {
              console.log('element', element)
              if (element.pluginProps.dataKey) {
                // element.pluginProps._dataSource = pageContext[element.pluginProps.dataKey]
              }
              return <node-wrapper element={element}>
                {h(element.name, element.getPreviewData({ position: 'static' }))}
              </node-wrapper>
            })
          }
        </div>
      )
    }
  },
  mounted () {
    console.log('preview loaded')
  },
  render (h) {
    return this.renderPreview(h, this.elements, this.pageContext)
  }
}
