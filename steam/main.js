const { app, BrowserWindow, Menu, shell } = require('electron');
const path = require('path');

// 单实例：避免重复开窗口
const gotLock = app.requestSingleInstanceLock();
if (!gotLock) app.quit();

function createWindow() {
  Menu.setApplicationMenu(null);
  const win = new BrowserWindow({
    width: 540,
    height: 980,
    minWidth: 420,
    minHeight: 700,
    backgroundColor: '#070b16',
    title: '谁是最强高中',
    autoHideMenuBar: true,
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: true
    }
  });

  // 开发时读仓库根目录的 index.html；打包后读 resources/game/index.html
  const indexPath = app.isPackaged
    ? path.join(process.resourcesPath, 'game', 'index.html')
    : path.join(__dirname, '..', 'index.html');

  win.loadFile(indexPath);

  // 外部链接用系统浏览器打开
  win.webContents.setWindowOpenHandler(({ url }) => {
    shell.openExternal(url);
    return { action: 'deny' };
  });
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});
