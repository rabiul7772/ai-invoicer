import fs from 'fs';
import puppeteer from 'puppeteer';

export const getExecutablePath = () => {
  const platform = process.platform;
  let paths: string[] = [];

  if (platform === 'win32') {
    paths = [
      'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
      'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
      'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
      'C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe'
    ];
  } else if (platform === 'darwin') {
    paths = [
      '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
      '/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge'
    ];
  } else if (platform === 'linux') {
    paths = [
      '/usr/bin/google-chrome',
      '/usr/bin/google-chrome-stable',
      '/usr/bin/chromium',
      '/usr/bin/chromium-browser',
      '/usr/bin/microsoft-edge-stable'
    ];
  }

  for (const p of paths) {
    if (fs.existsSync(p)) return p;
  }
  return undefined;
};

let browserInstance: any = null;

export const getBrowser = async () => {
  if (browserInstance && browserInstance.isConnected()) {
    return browserInstance;
  }

  const executablePath = getExecutablePath();
  const options: any = {
    headless: true,
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage', // Critical for Render/Docker
      '--disable-gpu',
      '--disable-extensions',
      '--no-first-run',
      '--no-zygote',
      '--disable-accelerated-2d-canvas',
      '--disable-canvas-aa',
      '--disable-2d-canvas-clip-aa',
      '--disable-gl-drawing-for-tests',
      '--font-render-hinting=none'
    ]
  };

  // Only use custom executable path if it's found (otherwise let Puppeteer find its own)
  if (executablePath) {
    options.executablePath = executablePath;
  }

  browserInstance = await puppeteer.launch(options);

  // Handle browser crash/disconnect
  browserInstance.on('disconnected', () => {
    console.log('Puppeteer browser disconnected. Cleaning up instance.');
    browserInstance = null;
  });

  return browserInstance;
};

/**
 * @deprecated Use getBrowser() for better performance and memory management.
 */
export const launchBrowser = async () => {
  return await getBrowser();
};
