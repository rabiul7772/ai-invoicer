/**
 * Downloads a PDF file from a given URL.
 * @param url The Blob URL or direct URL to the PDF.
 * @param fileName The desired name for the downloaded file.
 */
export const downloadPdf = (url: string, fileName: string) => {
  const a = document.createElement('a');
  a.href = url;
  a.download = fileName.replace(/\s+/g, '-');
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
};
