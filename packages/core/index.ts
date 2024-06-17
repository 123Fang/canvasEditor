/*
 * @Author: 秦少卫
 * @Date: 2023-02-03 23:29:34
 * @LastEditors: 秦少卫
 * @LastEditTime: 2024-04-22 00:40:24
 * @Description: 核心入口文件
 */
import Editor from './Editor';
export { default as DringPlugin } from './plugin/DringPlugin';
export { default as LayerPlugin } from './plugin/LayerPlugin';
export { default as CopyPlugin } from './plugin/CopyPlugin';
export { default as GroupPlugin } from './plugin/GroupPlugin';
export { default as DrawLinePlugin } from './plugin/DrawLinePlugin';
export { default as GroupAlignPlugin } from './plugin/GroupAlignPlugin';
export { default as HistoryPlugin } from './plugin/HistoryPlugin';

export default Editor;
