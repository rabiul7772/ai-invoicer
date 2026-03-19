import { launchBrowser } from './browser.js';

export const generatePDF = async (html: string) => {
  const browser = await launchBrowser();

  const page = await browser.newPage();

  await page.setContent(html, {
    waitUntil: 'load',
    timeout: 60000
  });

  const pdfBuffer = await page.pdf({
    format: 'A4',
    printBackground: true,
    margin: {
      top: '20px',
      right: '20px',
      bottom: '20px',
      left: '20px'
    }
  });

  await browser.close();

  return Buffer.from(pdfBuffer);
};
