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

export const launchBrowser = async () => {
  const executablePath = getExecutablePath();
  
  // On Render/Linux, if we didn't find a system browser, 
  // let Puppeteer use its own downloaded one in the cache.
  const options: any = {
    headless: true,
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
      '--disable-gpu'
    ]
  };

  if (executablePath) {
    options.executablePath = executablePath;
  }

  const browser = await puppeteer.launch(options);
  return browser;
};
