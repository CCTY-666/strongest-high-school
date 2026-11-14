# Steam 打包说明（Electron）

把单文件 HTML 包成 Windows 可执行程序，再通过 SteamPipe 上传。

## 1. 安装依赖

```bash
cd steam
npm install
```

需要 Node.js LTS（https://nodejs.org）。

## 2. 本地运行测试

```bash
npm start
```

会打开一个 540×980 的竖屏窗口加载 `../index.html`。

## 3. 生成 Windows 包

```bash
npm run dist
```

产物在 `steam/dist/win-unpacked/`，双击 `StrongestHighSchool.exe` 可运行。

## 4. 准备 Steam 内容目录

```bash
# 在 steam/ 目录
mkdir content
xcopy /E /I /Y dist\win-unpacked\* content\
```

`content/` 就是最终要上传的 depot 内容。

## 5. 填 AppID / DepotID

1. 在 Steamworks 后台创建 App，得到 **AppID**
2. 在 App 下创建 Depot（Windows），得到 **DepotID**
3. 复制模板并填写：

```bash
copy app_build.vdf.template app_build.vdf
copy depot_build.vdf.template depot_build_YOUR_DEPOT_ID.vdf
```

把两个文件里的 `YOUR_APP_ID` / `YOUR_DEPOT_ID` 替换成真实数字。

## 6. 用 steamcmd 上传

```bash
steamcmd +login <你的Steamworks账号> +run_app_build <路径>\app_build.vdf +quit
```

首次登录需要 Steam Guard 验证码。
上传完成后到 Steamworks → Builds 设置分支（建议先设 beta）。

## 7. 商店页

需要准备：

- Header Capsule 460×215
- Small Capsule 231×87
- Main Capsule 616×353
- Vertical Capsule 374×448
- 截图 ≥5 张（1920×1080 / 1280×720）
- 宣传片（可选但强烈建议）
- 简介、标签、系统需求、价格、内容调查（含 AI 内容披露）

## 8. 常见问题

- **窗口太大/太小**：改 `main.js` 里的 `width` / `height`
- **打包后白屏**：确认 `index.html` 在 `resources/game/` 下（`extraResources` 配置）
- **杀毒误报**：Electron 打包程序常见，签名可缓解
- **成就/云存档**：需接入 Steamworks SDK（原生模块），可后续做
