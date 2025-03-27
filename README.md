# anti-devtools-detector

## 简介
`anti-devtools-detector` 是一个用于屏蔽超星学习通等网站开发者工具检测的 Tampermonkey 脚本。通过拦截和覆盖相关检测脚本，禁用页面检测开发者工具的功能，从而保护用户的调试自由。

目前仅在超星学习通的 `AI助教` 中发现了此类检测脚本，其他页面和网站可能也存在类似的检测机制。

## 功能
1. **拦截检测脚本**：自动移除页面中加载的 `devtools-detector.js` 脚本。
2. **多层防御**：拦截关键对象和方法，防止检测脚本通过其他方式检测开发者工具。
3. **XMLHttpRequest 拦截**：拦截 XMLHttpRequest 发出的 `devtools-detector.js` 脚本。

默认仅开启 **拦截检测脚本** 和 **多层防御**。

## 使用方法

- Greasy Fork
  1. 安装 [Tampermonkey](https://www.tampermonkey.net/) 浏览器扩展。
  2. 访问 [Greasy Fork](https://greasyfork.org/zh-CN/scripts/531024-%E5%B1%8F%E8%94%BD-devtools-%E6%A3%80%E6%B5%8B) 页面。
  3. 点击 `Install this script` 安装脚本。
  4. 打开目标网站（如超星学习通），脚本会自动生效。
- GitHub
  1. 安装 [Tampermonkey](https://www.tampermonkey.net/) 浏览器扩展。
  2. 访问 [anti-devtools-detector.user.js](anti-devtools-detector.user.js) 页面。
  3. 点击 `Raw` 按钮，Tampermonkey 会自动弹出安装页面。
  4. 点击 `Install` 安装脚本。
  5. 打开目标网站（如超星学习通），脚本会自动生效。
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