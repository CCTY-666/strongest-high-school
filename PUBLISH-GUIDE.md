# 发布指南：GitHub + Steam

本文分三部分：**0. 发布前必读（版权/合规）**、**1. 上传 GitHub**、**2. 上架 Steam**。

---

## 0. 发布前必读（版权与合规）

当前版本是**非商业同人 demo**，直接上架 Steam 有较高下架风险，务必先处理：

### 必须处理（Steam 尤其严格）

1. **真实校名 + 校徽**
   - 目前使用 6 所真实学校的校名与真实校徽图片，**未获授权**
   - 涉及商标权、著作权，也可能涉及学校名誉问题
   - 建议：改虚构校名（如「宇宙附中」「衡水模式中学」等）+ 自己画/委托画原创校徽
   - 或：取得 6 所学校书面授权

2. **AI 生成图片**
   - 墨池、龙门楼、華字、战机、弹坑均为 AI 生成（豆包）
   - 需确认豆包用户协议允许商用；Steam 商店页需在「AI 内容披露」中申报
   - 建议保留原图与生成记录，必要时替换为自绘素材

3. **第三方图标**
   - game-icons.net 为 **CC BY 3.0**，可商用，但必须署名（游戏内已署名，README 也需保留）

### 建议做法

- **GitHub**：可以先发布仓库 + 开源代码，但把 `index.html` 里的真实校徽/校名替换为占位版，或在 README 明确「素材仅作演示，未授权，请勿商用」
- **Steam**：建议用「原创校徽 + 虚构校名 + 自绘素材」的版本，避免 DMCA 与商店审核驳回

---

## 1. 上传 GitHub

### 1.1 安装 Git

- Windows：https://git-scm.com/download/win 安装后重启终端
- 验证：`git --version`

### 1.2 配置身份（只需一次）

```bash
git config --global user.name "你的名字"
git config --global user.email "你的邮箱"
```

### 1.3 创建远程仓库

**方式 A：网页创建（推荐新手）**

1. 打开 https://github.com/new
2. Repository name 填 `strongest-high-school`（或任意名字）
3. 选择 Public / Private
4. **不要**勾选 Add a README / .gitignore / license（本地已准备）
5. 点 Create repository

**方式 B：GitHub CLI**

```bash
# 安装 gh 后
gh auth login
gh repo create strongest-high-school --public --source=. --remote=origin --push
```

### 1.4 本地初始化并推送

在本目录（`发布/`）打开终端：

```bash
git init -b main
git add .
git commit -m "feat: 谁是最强高中 demo v3.4（竖屏 / 5 流派 / Electron 打包）"
git remote add origin https://github.com/<你的用户名>/strongest-high-school.git
git push -u origin main
```

> 首次 push 会要求登录：推荐用 **Personal Access Token**（GitHub → Settings → Developer settings → Tokens (classic) → Generate new token，勾选 `repo`），密码处粘贴 token。

### 1.5 开启 GitHub Pages（在线试玩）

1. 仓库 → Settings → Pages
2. Source 选 `Deploy from a branch`
3. Branch 选 `main`，目录选 `/(root)`
4. 保存后等待 1~2 分钟，访问：
   `https://<你的用户名>.github.io/strongest-high-school/`

> 根目录的 `index.html` 就是入口，无需改文件名。

### 1.6 打 Release（可选）

```bash
git tag v0.1.0
git push origin v0.1.0
```

在 GitHub 仓库 → Releases → Draft a new release，选择 tag，上传 `index.html` 或整个 zip。

---

## 2. 上架 Steam

> Steam 不是"上传 HTML 就行"，需要一个 Windows 可执行程序；本仓库的 `steam/` 已提供 **Electron 包装**骨架。

### 2.1 注册 Steamworks 合作伙伴

1. 打开 https://partner.steamgames.com/
2. 注册 Steamworks 账号（需绑定 Steam 账号、邮箱验证）
3. 填写公司/个人税务与银行信息（Steam Direct 需要）
4. 支付 **Steam Direct 上架费：每款游戏 100 美元**（销量达到 1000 美元后可返还）
5. 创建 App：Steamworks → App Admin → Create New App
   - 记下 **AppID** 与 DepotID（创建 depot 后生成）

### 2.2 打包 Windows 版本（Electron）

前置：安装 Node.js LTS（https://nodejs.org）

```bash
cd steam
npm install
npm run dist
```

产物：`steam/dist/win-unpacked/`（整个目录就是 Steam 要上传的内容）。

`steam/` 结构：

```
steam/
  package.json        # Electron + electron-builder 配置
  main.js             # 窗口封装（无菜单、竖屏窗口、加载 index.html）
  app_build.vdf.template      # SteamPipe 应用构建脚本模板
  depot_build.vdf.template    # SteamPipe 仓库构建脚本模板
  README.md           # 打包与上传详细说明
```

### 2.3 安装 steamcmd 并上传（SteamPipe）

1. 下载 steamcmd：https://developer.valvesoftware.com/wiki/SteamCMD
2. 按 `steam/README.md` 填好 AppID / DepotID
3. 上传：

```bash
steamcmd +login <你的Steamworks账号> +run_app_build ../scripts/app_build.vdf +quit
```

4. 到 Steamworks → Builds 把 build 设为 default 分支（先设 beta 测试更稳）

### 2.4 商店页素材

Steam 要求（常用尺寸）：

| 素材 | 尺寸 |
|---|---|
| 商店页头图 Header Capsule | 460 × 215 |
| 小胶囊 Small Capsule | 231 × 87 |
| 主胶囊 Main Capsule | 616 × 353 |
| 竖版胶囊 Vertical Capsule | 374 × 448 |
| 截图 Screenshots | 至少 5 张，1920 × 1080 或 1280 × 720 |
| 宣传片 Trailer | 建议 30~60 秒，1920 × 1080 |

还要填写：游戏简介、标签、系统需求、价格、**内容调查问卷**（含 AI 生成内容披露）、年龄分级。

### 2.5 审核与发布

- 商店页「即将推出」需**提前至少 2 周**上线
- 提交审核后一般 1~5 个工作日
- 审核通过后设置发行日期，点 Release

### 2.6 Steam 版建议

- 游戏是 9:16 竖屏，Steam 窗口建议默认 **540×960**（`steam/main.js` 已设）
- Electron 包体约 100~150MB，可在 `electron-builder` 里开启 asar 压缩
- 建议加一个「退出游戏」按钮（Electron 里可用 Alt+F4；也可在游戏菜单加退出）
- Steam 成就/云存档可后续接 Steamworks SDK（需要原生插件，较复杂）

---

## 3. 发布清单

- [ ] 校徽/校名已替换为原创或已授权素材
- [ ] AI 图片商用许可已确认，Steam 已填写 AI 披露
- [ ] game-icons.net 署名保留（游戏内 + README）
- [ ] `index.html` 可离线双击运行、手机可玩
- [ ] Steam 版 `npm run dist` 能生成可执行文件并本地运行
- [ ] 商店页素材齐全（胶囊图 ×4、截图 ×5、宣传片）
- [ ] 定价、税务、银行信息完成
- [ ] 「即将推出」页提前 2 周上线
