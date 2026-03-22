import { getBrowser } from './browser.js';

export const generatePDF = async (html: string) => {
  const browser = await getBrowser();

  const page = await browser.newPage();

  try {
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

    return Buffer.from(pdfBuffer);
  } finally {
    // Crucial: Only close the page, not the browser
    if (page) {
      try {
        await page.close();
      } catch (err) {
        console.warn(
          'Efficiency: Failed to close Puppeteer page (likely browser disconnected):',
          err
        );
      }
    }
  }
};
