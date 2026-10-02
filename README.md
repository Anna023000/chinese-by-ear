# Chinese by Ear · Lesson 01

第一课英文音频复习网页，适合 GitHub Pages。无需安装软件、无需构建。

## 先在电脑上看

双击 `index.html`，用浏览器打开即可。也可以在 Codex 的本地预览中查看。

- 三部分：Vocabulary、Grammar、Practice。
- 简洁词汇表：中文、拼音、英文和发音。
- 拼音、英文可以分别隐藏。
- 情景与复习题直接列出，每题答案默认隐藏，点击可展开或收起。
- 语法解释：你与您、们的用法、变调。
- 顶部播放器直接播放完整的第一课录音，并支持暂停、拖动进度和调节音量。
- 课程栏可收起或展开，页面会记住用户上次的选择。
- 词汇扬声器播放教师录制的 WAV 文件；中文练习答案也使用同一套录音。

## 不用命令行，发布到 GitHub Pages

### 1. 建一个仓库

1. 登录 https://github.com 。没有账户则先注册。
2. 点右上角 **+ → New repository**。
3. Repository name 填 `chinese-by-ear`。
4. 选择 **Public**。免费个人账户可用公开仓库开启 Pages。
5. 勾选 **Add README**，点击 **Create repository**。

### 2. 上传网页

1. 进入新仓库的 **Code** 页面。
2. 点 **Add file → Upload files**。
3. 打开电脑上的 `lesson01-site` 文件夹，上传**里面的文件**，不要把整个外层文件夹作为一层目录上传，也不要上传 ZIP 压缩包。
4. 至少上传这四个文件：`index.html`、`styles.css`、`app.js`、`config.js`。可一并上传本 README。
5. 页面底部点击 **Commit changes**，保存到 `main`。

检查：仓库 Code 首页应该直接看见 `index.html`，而不是要先点进 `lesson01-site` 才看见它。

本地还包含 `.nojekyll` 空文件，可一起上传。它在 Finder 中可能隐藏；这个简单网页不依赖它也可正常发布。

### 3. 开启 Pages

1. 点仓库 **Settings**。
2. 点左侧 **Pages**。
3. **Build and deployment → Source** 选择 **Deploy from a branch**。
4. **Branch** 选择 **main**，文件夹选择 **/(root)**。
5. 点击 **Save**。
6. 等几分钟，再回到 Pages 页面点 **Visit site**。官方说明发布可能需要最多约 10 分钟。

网址格式为：`https://你的GitHub用户名.github.io/chinese-by-ear/`。

### 4. 以后更新内容

重新进入仓库的 **Add file → Upload files**，上传改好的同名文件，点击 **Commit changes** 即可。Pages 会自动重新发布。

## 更换正式课程录音

1. 把新录音导出为 MP3，命名为 `lesson-01.mp3`。
2. 用新文件替换本网站 `assets` 文件夹中的同名文件。
3. `config.js` 已经使用以下地址，无需再次修改：

```js
window.LESSON_AUDIO = "./assets/lesson-01.mp3";
```

4. 上传新的 `assets/lesson-01.mp3` 后，GitHub Pages 会自动重新发布。

如果录音超过 GitHub 网页单文件上传限制（25 MiB），先导出较小的 MP3，或用 Git 客户端上传。没有音频文件时，不要提前修改配置，否则播放器会提示加载失败。

## 常见情况

- **404**：确认 Pages 使用 `main` 和 `/(root)`，`index.html` 在仓库顶层，并等发布完成。
- **样式丢失**：确认 `styles.css` 与 `index.html` 在同一层且文件名完全一致。
- **词汇或练习不显示**：确认 `app.js` 已上传，浏览器允许 JavaScript。
- **音频不能播放**：确认 `config.js` 路径、音频文件名大小写和实际位置一致。
- **短语扬声器无声音**：确认 `assets/words` 中的 WAV 文件已经上传，并且文件名与 `app.js` 中一致。

## 文件分工

| 文件 | 用途 |
|---|---|
| `index.html` | 页面内容和结构 |
| `styles.css` | 颜色、字体、手机排版 |
| `app.js` | 词汇、练习及交互 |
| `config.js` | 正式课程录音的地址 |
| `assets/` | 存放录音等网站素材 |

本文件夹是完整的发布范围，不需要上传上一级的课本 PDF、教学脚本、课件或图片。

## 官方参考

- [创建 GitHub Pages 网站](https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site)
- [设置发布分支](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site)
- [向仓库添加文件](https://docs.github.com/en/repositories/working-with-files/managing-files/adding-a-file-to-a-repository)
