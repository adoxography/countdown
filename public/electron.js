const { app, BrowserWindow } = require('electron');

const path = require('path');
const isDev = require('electron-is-dev');

/**
 * Creates the app window
 */
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

  // If we're in a development environment, look for where the react app is
  // getting built to. Otherwise, look at the place where the production react
  // app was built.
  mainWindow.loadURL(
    isDev
      ? 'http://localhost:3000'
      : `file://${path.join(__dirname, '../build/index.html')}`
  );

  // Ensure app is always on top, aside for truly floating apps like Spotlight
  mainWindow.setAlwaysOnTop(true, 'floating', 1);

  // Allow app to appear even on fullscreen apps
  mainWindow.setVisibleOnAllWorkspaces(true);
}

// The app can't float if it's in the dock
app.dock.hide();
app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  // Normally, mac apps are allowed to sit in the dock, but since this app is
  // hidden from the dock, close it anyway to avoid draining system resources
  app.quit();
});
