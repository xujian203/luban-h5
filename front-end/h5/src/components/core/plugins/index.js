import Vue from 'vue'
import LbpButton from 'core/plugins/lbp-button'
import antButton from 'core/plugins/antControl/button'
import antInput2 from 'core/plugins/antControl/input.vue'
import antTable from 'core/plugins/antControl/table.vue'
import antRow from 'core/plugins/antControl/row.vue'
import antColumn from 'core/plugins/antControl/column.vue'
import antSelector from 'core/plugins/antControl/selector.vue'
import searchSection from 'core/plugins/combinedControl/searchSection.vue'
import LbpPicture from 'core/plugins/lbp-picture'
import LbpText from 'core/plugins/lbp-text'
import LbpFormInput from 'core/plugins/lbp-form-input'
import LbpFormButton from 'core/plugins/lbp-form-button'
import LbpFormRadioGroup from 'core/plugins/lbp-form-radio-group'
import LbpFormCheckboxGroup from 'core/plugins/lbp-form-checkbox-group'
import LbpBackground from 'core/plugins/lbp-background'
import LbpTable from 'core/plugins/lbp-table'

export const pluginsList = [
  {
    title: '图片',
    i18nTitle: {
      'en-US': 'Picture',
      'zh-CN': '图片'
    },
    icon: 'photo',
    component: LbpPicture,
    visible: true,
    name: LbpPicture.name
  },
  {
    i18nTitle: {
      'en-US': 'Text',
      'zh-CN': '文字'
    },
    title: '文字',
    icon: 'text-width',
    component: LbpText,
    visible: true,
    name: LbpText.name
  },
  {
    i18nTitle: {
      'en-US': 'Button',
      'zh-CN': '普通按钮'
    },
    title: '普通按钮',
    icon: 'hand-pointer-o',
    component: LbpButton,
    visible: true,
    name: LbpButton.name
  },
  {
    i18nTitle: {
      'en-US': 'input2',
      'zh-CN': 'ant-input'
    },
    title: 'ant-input',
    icon: 'hand-pointer-o',
    component: antInput2,
    visible: true,
    name: antInput2.name
  },
  {
    i18nTitle: {
      'en-US': 'antSelector',
      'zh-CN': 'antSelector'
    },
    title: 'antSelector',
    icon: 'hand-pointer-o',
    component: antSelector,
    visible: true,
    name: antSelector.name
  },
  {
    i18nTitle: {
      'en-US': 'antRow',
      'zh-CN': 'antRow'
    },
    title: 'antRow',
    icon: 'hand-pointer-o',
    component: antRow,
    visible: true,
    name: antRow.name
  }, {
    i18nTitle: {
      'en-US': 'antColumn',
      'zh-CN': 'antColumn'
    },
    title: 'antColumn',
    icon: 'hand-pointer-o',
    component: antColumn,
    visible: true,
    name: antColumn.name
  },
  {
    i18nTitle: {
      'en-US': 'searchSection',
      'zh-CN': 'searchSection'
    },
    title: 'searchSection',
    icon: 'hand-pointer-o',
    component: searchSection,
    visible: true,
    name: searchSection.name
  },
  {
    i18nTitle: {
      'en-US': 'Button',
      'zh-CN': 'ant按钮'
    },
    title: 'ant按钮',
    icon: 'hand-pointer-o',
    component: antButton,
    visible: true,
    name: antButton.name
  },
  {
    i18nTitle: {
      'en-US': 'Form Input',
      'zh-CN': '表单输入'
    },
    title: '表单输入',
    icon: 'pencil-square-o',
    component: LbpFormInput,
    visible: true,
    name: LbpFormInput.name
  },
  {
    i18nTitle: {
      'en-US': 'Form Submit',
      'zh-CN': '表单提交'
    },
    title: '表单提交',
    icon: 'hand-pointer-o',
    component: LbpFormButton,
    visible: true,
    name: LbpFormButton.name
  },
  {
    i18nTitle: {
      'en-US': 'Form Checkbox',
      'zh-CN': '表单多选'
    },
    title: '表单多选',
    icon: 'check-square-o',
    component: LbpFormCheckboxGroup,
    visible: true,
    name: LbpFormCheckboxGroup.name
  },
  {
    i18nTitle: {
      'en-US': 'Form Radio',
      'zh-CN': '表单单选'
    },
    title: '表单单选',
    icon: 'dot-circle-o',
    component: LbpFormRadioGroup,
    visible: true,
    name: LbpFormRadioGroup.name
  },
  {
    i18nTitle: {
      'en-US': 'Background',
      'zh-CN': '背景'
    },
    title: '背景',
    icon: 'dot-circle-o',
    component: LbpBackground,
    visible: false,
    name: LbpBackground.name
  },
  {
    i18nTitle: {
      'en-US': 'Table',
      'zh-CN': '表格'
    },
    icon: 'table',
    component: LbpTable,
    visible: true,
    name: LbpTable.name,
    shortcutProps: {
      theme: 'lbp-table-theme-light-blue'
    }
  },
  {
    i18nTitle: {
      'en-US': 'Table',
      'zh-CN': 'Ant表格'
    },
    icon: 'table',
    component: antTable,
    visible: true,
    name: antTable.name,
    shortcutProps: {
      theme: 'lbp-table-theme-light-blue'
    }
  }
]

export default {
  data: () => ({ pluginsList }),
  methods: {
    mixinPlugins2Editor () {
      pluginsList.forEach(plugin => {
        // 全局注册组件，便于以后扩展自定义脚本，注释原来的局部注册：this.$options.components[plugin.name] = plugin.component
        Vue.component(plugin.name, plugin.component)
      })
    }
  },
  created () {
    this.mixinPlugins2Editor()
  }
}
