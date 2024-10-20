import { h } from 'vue';
import { NIcon } from 'naive-ui';

/**
 * input只允许数字
 * @param {*} value
 * @returns
 */
export const onlyAllowNumber = (value) => !value || /^\d+$/.test(value);

/**
 * 渲染icon
 * @param {*} icon
 * @returns
 */
export function renderIcon(icon) {
  return () => h(NIcon, null, { default: () => h(icon) });
}

/**
 * 检查数组是否全true
 * @param {*} arr
 * @returns {Boolean}
 */
export const checkAllTrue = (arr) => arr.every((element) => element === true);
