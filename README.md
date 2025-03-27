# anti-devtools-detector

## 简介
`anti-devtools-detector` 是一个用于屏蔽超星学习通等网站开发者工具检测的 Tampermonkey 脚本。通过拦截和覆盖相关检测脚本，禁用页面检测开发者工具的功能，从而保护用户的调试自由。

## 功能
1. **拦截检测脚本**：自动移除页面中加载的 `devtools-detector.js` 脚本。
2. **覆盖检测对象**：创建假的 `devtoolsDetector` 对象，模拟正常行为。
3. **多层防御**：拦截关键对象和方法，防止检测脚本通过其他方式检测开发者工具。

默认仅开启 **拦截检测脚本** 和 **多层防御**。

## 使用方法

- 手动安装
  1. 安装 [Tampermonkey](https://www.tampermonkey.net/) 浏览器扩展。
  2. 创建一个新的用户脚本，将 [`anti-devtools-detector.user.js`](anti-devtools-detector.user.js) 的内容复制粘贴到脚本编辑器中。
  3. 保存并启用脚本。
  4. 打开目标网站（如超星学习通），脚本会自动生效。

## 适用范围
- 匹配的 URL：`*://*.chaoxing.com/*`
- 运行时机：页面加载的最开始（`document-start`）

## 注意事项
- 本脚本仅用于学习和研究目的，请勿用于非法用途。
- 如果目标网站更新了检测机制，可能需要对脚本进行调整。

## 许可证
本项目基于 [MIT License](LICENSE) 开源，详情请参阅 [LICENSE](LICENSE) 文件。