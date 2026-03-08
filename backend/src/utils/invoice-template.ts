export const generateInvoiceHtml = (data: any): string => {
  // Generate random invoice number (e.g., INV-8F3A2)
  const randomStr = Math.random().toString(36).substring(2, 7).toUpperCase();
  const invoiceNumber = `INV-${randomStr}`;

  // Format the dates
  const invoiceDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  const dueDateStr = data.dueDate
    ? new Date(data.dueDate).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    : '';

  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Invoice</title>
      <script src="https://cdn.tailwindcss.com"></script>
    </head>
    <body class="bg-white text-black p-12 w-[800px] mx-auto space-y-8 font-sans flex flex-col min-h-[1050px]">
        
        <div class="grow">
          <!-- Header -->
          <div class="flex justify-between items-start border-b border-gray-200 pb-8">
            <div class="flex items-center gap-6">
              ${
                data.billFrom?.companyLogoUrl
                  ? `<div class="w-24 h-24 shrink-0 bg-gray-50 rounded-xl overflow-hidden flex items-center justify-center border border-gray-100 shadow-sm"><img src="${data.billFrom.companyLogoUrl}" alt="Company Logo" class="w-full h-full object-contain p-2" /></div>`
                  : ''
              }
              <div>
                <h1 class="text-3xl font-extrabold tracking-tight text-gray-900 uppercase">
                  Invoice
                </h1>
                <p class="text-gray-700 mt-2 font-semibold">Invoice Number: <span class="text-black">${invoiceNumber}</span></p>
                <p class="text-gray-700 mt-1 font-medium">Invoice Date: <span class="text-gray-900">${invoiceDate}</span></p>
                ${dueDateStr ? `<p class="text-gray-700 mt-1 font-medium">Due Date: <span class="text-gray-900">${dueDateStr}</span></p>` : ''}
              </div>
            </div>
            <div class="text-right">
              <h2 class="text-xl font-bold text-gray-900">
                ${data.billFrom?.businessName || 'Your Business Name'}
              </h2>
              <p class="text-gray-700 text-sm mt-1 font-medium">${data.billFrom?.email || ''}</p>
              <p class="text-gray-700 text-sm font-medium">${data.billFrom?.phoneNumber || ''}</p>
              <p class="text-gray-700 text-sm font-medium max-w-[200px] ml-auto whitespace-pre-wrap">${data.billFrom?.address || ''}</p>
            </div>
          </div>

        <!-- Bill To -->
        <div class="py-4 mt-4">
          <h3 class="text-sm font-bold text-gray-600 uppercase tracking-wider mb-2">
            Bill To
          </h3>
          <p class="text-lg font-bold text-gray-900">${data.billTo?.clientName || ''}</p>
          <p class="text-gray-800 text-sm font-medium">${data.billTo?.clientEmail || ''}</p>
          <p class="text-gray-800 text-sm font-medium">${data.billTo?.clientPhone || ''}</p>
          <p class="text-gray-800 text-sm font-medium whitespace-pre-wrap">${data.billTo?.clientAddress || ''}</p>
        </div>

        <!-- Items Table -->
        <table class="w-full text-left border-collapse mt-8">
          <thead>
            <tr class="border-b-2 border-gray-200">
              <th class="py-3 px-2 font-bold text-gray-900">Item</th>
              <th class="py-3 px-2 font-bold text-gray-900 text-right">Qty</th>
              <th class="py-3 px-2 font-bold text-gray-900 text-right">Price</th>
              <th class="py-3 px-2 font-bold text-gray-900 text-right">Tax %</th>
              <th class="py-3 px-2 font-bold text-gray-900 text-right">Amount</th>
            </tr>
          </thead>
          <tbody>
            ${(data.items || [])
              .map(
                (item: any) => `
              <tr class="border-b border-gray-100">
                <td class="py-4 px-2 text-gray-900 font-medium">${item.name || 'Unnamed Item'}</td>
                <td class="py-4 px-2 text-gray-800 font-medium text-right">${item.quantity || 1}</td>
                <td class="py-4 px-2 text-gray-800 font-medium text-right">$${Number(item.price || 0).toFixed(2)}</td>
                <td class="py-4 px-2 text-gray-800 font-medium text-right">${item.tax || 0}%</td>
                <td class="py-4 px-2 text-gray-900 font-bold text-right font-mono">
                  $${Number(item.total || 0).toFixed(2)}
                </td>
              </tr>
            `
              )
              .join('')}
          </tbody>
        </table>

        <!-- Totals -->
        <div class="flex justify-end pt-6">
          <div class="w-1/2 space-y-3">
            <div class="flex justify-between text-gray-800 font-medium">
              <span>Subtotal</span>
              <span class="font-mono">$${Number(data.subtotal || 0).toFixed(2)}</span>
            </div>
            <div class="flex justify-between text-gray-800 font-medium">
              <span>Tax</span>
              <span class="font-mono">$${Number(data.taxTotal || 0).toFixed(2)}</span>
            </div>
            <div class="flex justify-between border-t border-gray-300 pt-3 text-xl font-extrabold text-gray-900">
              <span>Total Due</span>
              <span class="font-mono">$${Number(data.totalAmount || 0).toFixed(2)}</span>
            </div>
          </div>
        </div>

        <!-- Notes -->
        <div class="pt-12 border-t mb-12 border-gray-200 mt-12 text-sm text-gray-800">
          <h4 class="font-bold text-gray-900 mb-1">Notes / Terms</h4>
          <p class="whitespace-pre-wrap font-medium">${
            data.notes || 'Please make payment before the due date.'
          }</p>
        </div>
        </div>

        <div class="text-center mt-12 mb-4">
          <h2 class="text-md font-semibold text-gray-800">Thank you for your business!</h2>
        </div>

        <!-- Footer -->
        <div class="pt-8 border-t border-gray-200 text-center text-sm text-gray-700 mt-auto w-full font-medium">
          <p>Please email <a href="mailto:${data.billFrom?.email || ''}" class="text-(--color-primary) font-bold underline">${data.billFrom?.email || 'us'}</a> if you have any questions.</p>
        </div>
    </body>
    </html>
  `;
};
