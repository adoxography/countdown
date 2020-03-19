const { app, BrowserWindow } = require('electron');

const path = require('path');
const isDev = require('electron-is-dev');

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 609,
    height: 212,
    frame: false,
    transparent: true,
    hasShadow: false,
    webPreferences: {
      nodeIntegration: true
    }
  });

  mainWindow.loadURL(isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, '../build/index.html')}`);

  // Ensure app is always on top, aside for truly floating apps like Spotlight
  mainWindow.setAlwaysOnTop(true, 'floating', 1);

  // Allow app to appear even on fullscreen apps
  mainWindow.setVisibleOnAllWorkspaces(true);
}

app.dock.hide();
app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  app.quit();
});
