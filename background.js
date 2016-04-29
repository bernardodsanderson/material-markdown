/**
 * Listens for the app launching, then creates the window.
 *
 * @see http://developer.chrome.com/apps/app.runtime.html
 * @see http://developer.chrome.com/apps/app.window.html
 */
chrome.app.runtime.onLaunched.addListener(function(launchData) {
  chrome.app.window.create(
    'index.html', {
      id: 'mainWindow',
      frame: { color: "#1F292E" },
      bounds: {width: 900, height: 700},
      minHeight: 700,
      minWidth: 900
    }
  );
});
