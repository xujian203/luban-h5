import Vue from 'vue'
import { mapState, mapActions } from 'vuex'
import scriptList from '@/constants/script'
import * as monaco from 'monaco-editor'

export default {
  data: () => ({
    codeEditor: null,
    dialog: {
      view: {
        visible: false,
        content: '',
        title: '脚本编辑'
      }
    },
    currentMethod: {
      name: '',
      arguments: [],
      trigger: 'click'
    }
  }),
  computed: {
    ...mapState('editor', [
      'editingElement'
    ])
  },
  methods: {
    ...mapActions('element', [
      'setEditingElement' // -> this.foo()
    ]),
    /**
     *
     * 元素对应的Vue实例vm 格式化之后的全部 method
     *
     *
     * @returns { Array<Object> }
      [
        {
          name: 'handleRedirect',
          label: '点击跳转',
          trigger: 'click',
          arguments: ['http', 'www.baidu.com'],
          isAdded: true, // 是否已经绑定到元素上
        },
        {
          name: 'trackClick',
          label: '点击打点'
          trigger: 'mouseover',
          arguments: [],
          isAdded: true,
        },
        {
          name: 'trackClick',
          label: '鼠标悬浮',
          trigger: 'mouseover',
          arguments: [],
          isAdded: false,
        }
      ]
      *
      * vm: 获取 baseComponent.mixin([script1, script2]) 之后，元素对应的 Vue实例
      * addedMethods: 已经绑定到元素上的 method 列表
      * addedMethods: [
          {
            clickFn: {
              name: 'clickFn',
              trigger: 'click',
              arguments: []
            }
          }
        ]
      *
      * vm.$options.methods: 所有methods
      * vm.$options.methodsConfig: methods 对应的配置
      *
     */
    getAvailableMethods () {
      const vm = this.getEditingElementVM()
      const addedMethods = this.editingElement.methodList.reduce((obj, method) => ({ ...obj, [method.name]: method }), {})
      const { methods = {}, methodsConfig = {} } = vm.$options

      // methods: { methodA: () => {}, methodB: () => {}, methodC: () => {} }
      return Object.keys(methods).map(name => {
        const addedMethod = addedMethods[name] // { name, trigger, arguments }
        const methodConfig = methodsConfig[name]
        return {
          ...(addedMethod || { name, trigger: 'click', arguments: [] }),
          /**
             * 处理 methodConifg 不存在（即用户没有配置 methodsConfig 或者 忘记配置了<哈哈>)
             */
          label: methodConfig && (methodConfig.label || name),
          isAdded: !!addedMethod // 是否已经被选中
        }
      })
    },
    /**
     * 获取元素对应 Vue 实例
     */
    getEditingElementVM () {
      const name = this.editingElement.name + this.editingElement.uuid
      const Ctor = this.$options.components[name]
      const vm = new Ctor()
      return vm
    },
    /**
     * 获取代码编辑器实例
     * get code editor intance
     */
    getCodeEditor () {
      // 使用 this.codeEditor 来做缓存，否则会导致重复调用 create 创建多个编辑器
      if (this.codeEditor) return this.codeEditor
      this.codeEditor = monaco.editor.create(this.$refs.editor, {
        value: '',
        language: 'javascript'
      })
      return this.codeEditor
    },
    /**
     *
     * @param {Object} script <{ label, value // script content string }>
     */
    mixinScript (script) {
      this.editingElement.mixinScript(script)
    },
    renderSelectActions (h) {
      const methodList = this.getAvailableMethods()
      const addedMethods = methodList.filter(item => item.isAdded)
      const notAddedMethods = methodList.filter(item => !item.isAdded)

      return (
        <a-timeline class="action-steps-wrapper">
          <a-timeline-item>
            <div>1.选择事件类型</div>
            <a-select style="width: 160px" onChange={(value) => { this.currentMethod.trigger = value }} placeholder="事件类型">
              <a-select-option value="click">点击</a-select-option>
            </a-select>
          </a-timeline-item>
          <a-timeline-item>
            <div>2.选择事件方法</div>
            <a-select style="width: 160px" onChange={name => {
              const method = methodList.find(method => method.name === name)
              this.currentMethod = method
            }} placeholder="事件方法">
              <a-select-opt-group>
                <span slot="label"><a-icon type="user" />已选事件</span>
                {
                  addedMethods.map((method, index) => (<a-select-option key={index} value={method.name}>{method.label}</a-select-option>))
                }
              </a-select-opt-group>
              <a-select-opt-group label="未选事件">
                {
                  notAddedMethods.map((method, index) => (<a-select-option key={index} value={method.name}>{method.label}</a-select-option>))
                }
              </a-select-opt-group>
            </a-select>
          </a-timeline-item>
          <a-timeline-item>
            <div class="mb-3">3.函数参数</div>
            {this.renderFillActionParams(h)}
          </a-timeline-item>
          <a-timeline-item>
            <span>4.添加事件</span>
            <a-button onClick={() => {
              if (!this.currentMethod.name) return
              this.editingElement.methodList.push(this.currentMethod)
            }}>添加事件</a-button>
          </a-timeline-item>
        </a-timeline>
      )
    },
    renderFillActionParams (h) {
      const method = this.currentMethod
      if (!method.name) return
      const vm = this.getEditingElementVM()
      // eslint-disable-next-line no-unused-vars
      const methodParamsList = vm.$options.methodsConfig[method.name].params

      // 将 params 转换为表单
      const formItems = methodParamsList.map((param, index) => {
        if (!method.arguments[index]) {
          method.arguments[index] = param.default
        }
        const editorConfig = param.editor || {}
        const data = {
          props: {
            ...editorConfig.prop || {},
            [editorConfig.type === 'a-switch' ? 'checked' : 'value']: method.arguments[index]
          },
          style: { width: '100%' },
          on: {
            change (e) {
              // <method.arguments[index] = e.target ? e.target.value : e> will not work, because the the arguments is not reactive
              // see more: https://vuejs.org/v2/guide/instance.html#Data-and-Methods
              Vue.set(method.arguments, index, e.target ? e.target.value : e)
            }
          }
        }
        return (
          <a-form-item label={param.label} wrapperCol={{ span: 22 }}>
            { h(editorConfig.type || 'a-input', data) }
          </a-form-item>
        )
      })

      return <a-form
        layout="vertical"
        ref="form"
        size="mini"
        id="props-edit-form"
        // label-width="100px"
        // label-position="left"
      >{formItems}</a-form>
    },
    /**
     *
     * @param {Object} script <{label, value // script content string}>
     */
    renderScriptItem (script) {
      return (
        <a-dropdown-button
          style="margin: 4px;"
          onClick={() => {
            this.mixinScript(script)
            this.editingElement.scripts.push(script)
          }}
        >
          {script.label}
          <a-menu slot="overlay" onClick={({ key }) => {
            switch (key) {
              case 'view':
                this.dialog.view.visible = true
                this.dialog.view.title = script.label
                this.dialog.view.content = script.value

                // 使用 nextTick 的原因：dialog 刚刚设置为 true, 在这次事件循环中 this.$refs.editor 的值仍然为 undefined
                // 等弹框显示在 dom 中之后，this.$refs.editor才会有值
                this.$nextTick(() => {
                  const codeEditor = this.getCodeEditor()
                  codeEditor.setValue(script.value)
                  // this.editor = monaco.editor.create(this.$refs.editor, {
                  //   value: script.value,
                  //   language: 'javascript'
                  // })
                })
            }
          }}>
            <a-menu-item key="view"><a-icon type="edit" />View</a-menu-item>
            <a-menu-item key="2"><a-icon type="user" />2nd menu item</a-menu-item>
            <a-menu-item key="3"><a-icon type="user" />3rd item</a-menu-item>
          </a-menu>
        </a-dropdown-button>
      )
    },
    renderScriptsModule () {
      return <div>
        <a-tabs defaultActiveKey="1">
          <a-tab-pane tab="已添加行为" key="2" forceRender>
            {
              (this.editingElement.scripts || []).map((script, index) => {
                return <a-button
                  class="script-item"
                  onClick={() => {
                    // remove added script
                  }}
                >{script.label}</a-button>
              })
            }
          </a-tab-pane>
          <a-tab-pane tab="全部行为" key="1">
            {
              scriptList.map((script, index) => this.renderScriptItem(script))
              // scriptList.map((script, index) => {
              //   return <a-button
              //     class="script-item"
              //     onClick={() => {
              //       this.mixinScript(script)
              //       this.editingElement.scripts.push(script)
              //     }}
              //   >{script.label}</a-button>
              // })
            }
          </a-tab-pane>
        </a-tabs>
      </div>
    }
  },
  created () {
  },
  render (h) {
    const ele = this.editingElement
    if (!ele) return (<span>{this.$t('editor.editPanel.common.empty')}</span>)
    return (<div>
      {this.renderScriptsModule()}
      <div style="margin: 20px 0;"></div>
      {this.renderSelectActions(h)}
      {/* <a-modal
        width={800}
        title={this.dialog.view.title}
        visible={this.dialog.view.visible}
        onOk={() => { this.dialog.view.visible = false }}
        onCancel={() => { this.dialog.view.visible = false }}
      >
        <div ref="editor" id="script-editor" style="height:480px;"></div>
      </a-modal> */}
    </div>)
  }
}
