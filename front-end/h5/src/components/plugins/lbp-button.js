/*
 * @Author: ly525
 * @Date: 2020-02-09 15:22:36
 * @LastEditors: ly525
 * @LastEditTime: 2020-02-09 15:27:48
 * @FilePath: /luban-h5/front-end/h5/src/components/plugins/lbp-button.js
 * @Github: https://github.com/ly525/luban-h5
 * @Description: Do not edit
 * @Copyright 2018 - 2019 luban-h5. All Rights Reserved
 */
// https://github.com/luban-h5-components/plugin-common-props
import commonProps from '@luban-h5/plugin-common-props'

export default {
  render () {
    const {
      color,
      textAlign,
      backgroundColor,
      fontSize,
      lineHeight,
      borderColor,
      borderRadius,
      borderWidth,
      text
    } = this

    const style = {
      color,
      textAlign,
      backgroundColor,
      fontSize: fontSize,
      lineHeight: lineHeight + 'em',
      borderColor,
      borderRadius: borderRadius + 'px',
      borderWidth: borderWidth + 'px',
      textDecoration: 'none'
    }
    return (
      <button
        style={style}
      >{text}</button>)
  },
  name: 'lbp-button',
  props: {
    text: commonProps.text(),
    vertical: commonProps.vertical,
    backgroundColor: commonProps.backgroundColor,
    color: commonProps.color,
    fontSize: commonProps.fontSize,
    lineHeight: commonProps.lineHeight,
    borderWidth: commonProps.borderWidth,
    borderRadius: commonProps.borderRadius,
    borderColor: commonProps.borderColor,
    textAlign: commonProps.textAlign()

  }
}
