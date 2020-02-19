/*
 * @Author: ly525
 * @Date: 2020-02-21 23:23:11
 * @LastEditors: ly525
 * @LastEditTime: 2020-02-23 13:06:28
 * @FilePath: /luban-h5/front-end/h5/src/components/core/editor/canvas/preview.js
 * @Github: https://github.com/ly525/luban-h5
 * @Description: Do not edit
 * @Copyright 2018 - 2019 luban-h5. All Rights Reserved
 */
import NodeWrapper from '@/components/preview/node-wrapper.js'
/**
 * TODO extract page preview card used for page list
 */
export default {
  props: ['elements'],
  components: {
    NodeWrapper
  },
  methods: {
    genEventHandlers (element) {
      const Ctor = this.$options.components[element.name + element.uuid]
      return element.getEventHandlers(Ctor)
    },
    renderPreview (h, elements) {
      return (
        <div style={{ height: '100%', position: 'relative' }}>
          {
            elements.map((element, index) => {
              // console.log(element.getStyle())
              /**
               * TODO 是否可以将 renderElement 进行抽象成 renderBaseElement？
               * renderBaseElement
               * -> renderBaseElementWithEvent()
               * -> renderBaseElementWithCustomStyle()
               */
              return <node-wrapper element={element}>
                {
                  h(element.name + element.uuid, {
                    ...element.getPreviewData({ position: 'static' }),
                    nativeOn: this.genEventHandlers(element)
                  })
                }
              </node-wrapper>
            })
          }
        </div>
      )
    }
  },
  render (h) {
    return this.renderPreview(h, this.elements)
  }
}
