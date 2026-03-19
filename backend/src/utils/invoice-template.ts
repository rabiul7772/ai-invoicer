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

  // Status logic
  const status = data.status || 'DRAFT';
  let statusLabel = 'Unpaid';
  let badgeClasses = 'bg-gray-100 text-gray-700 border-gray-200';

  if (status === 'PAID') {
    statusLabel = 'Paid';
    badgeClasses = 'bg-green-50 text-green-700 border-green-200';
  } else if (status === 'OVERDUE') {
    statusLabel = 'Overdue';
    badgeClasses = 'bg-red-50 text-red-700 border-red-200';
  }

  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Invoice</title>
    <style>
        @page { size: A4; margin: 0; }
        body, p, h1, h2, h3, h4 { margin: 0; padding: 0; }
        body { 
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
          -webkit-print-color-adjust: exact;
          padding: 2.5rem; /* Increased from 2.25rem */
          width: 800px;
          margin-left: auto;
          margin-right: auto;
          background-color: white;
          color: black;
          min-height: 1000px;
          display: flex;
          flex-direction: column;
        }
        .grow { flex-grow: 1; }
        .flex { display: flex; }
        .flex-col { flex-direction: column; }
        .justify-between { justify-content: space-between; }
        .justify-end { justify-content: flex-end; }
        .justify-center { justify-content: center; }
        .items-start { align-items: flex-start; }
        .items-center { align-items: center; }
        .shrink-0 { flex-shrink: 0; }
        .w-full { width: 100%; }
        .w-24 { width: 6rem; }
        .h-24 { height: 6rem; }
        .w-1\/2 { width: 50%; }
        .gap-6 { gap: 1.5rem; }
        .gap-2 { gap: 0.5rem; }
        .space-y-8 > * + * { margin-top: 1.25rem; } /* Increased from 1rem */
        .space-y-3 > * + * { margin-top: 0.5rem; } /* Increased from 0.35rem */
        .border-b { border-bottom: 1px solid #e5e7eb; }
        .border-b-2 { border-bottom: 2px solid #e5e7eb; }
        .border-t { border-top: 1px solid #e5e7eb; }
        .border { border: 1px solid #e5e7eb; }
        .border-gray-100 { border-color: #f3f4f6; }
        .border-gray-200 { border-color: #e5e7eb; }
        .border-gray-300 { border-color: #d1d5db; }
        .pb-8 { padding-bottom: 1.25rem; } /* Increased from 1rem */
        .pt-6 { padding-top: 1rem; }
        .pt-3 { padding-top: 0.5rem; } /* Increased from 0.35rem */
        .pt-12 { padding-top: 1.5rem; } /* Increased from 1rem */
        .pt-8 { padding-top: 1.5rem; } /* Increased from 1.25rem */
        .py-4 { padding-top: 0.75rem; padding-bottom: 0.75rem; }
        .py-3 { padding-top: 0.5rem; padding-bottom: 0.5rem; }
        .py-2 { padding-top: 0.4rem; padding-bottom: 0.4rem; }
        .px-2 { padding-left: 0.5rem; padding-right: 0.5rem; }
        .px-5 { padding-left: 1.25rem; padding-right: 1.25rem; }
        .mt-2 { margin-top: 0.35rem; } /* Increased from 0.25rem */
        .mt-1 { margin-top: 0.15rem; } /* Increased from 0.1rem */
        .mt-4 { margin-top: 0.75rem; } /* Increased from 0.5rem */
        .mt-8 { margin-top: 1.5rem; } /* Increased from 1rem */
        .mt-12 { margin-top: 1.5rem; } /* Increased from 1rem */
        .mb-1 { margin-bottom: 0.2rem; }
        .mb-2 { margin-bottom: 0.4rem; }
        .mb-4 { margin-bottom: 0.75rem; }
        .mb-12 { margin-bottom: 2rem; } /* Increased from 1rem */
        .ml-auto { margin-left: auto; }
        .rounded-xl { border-radius: 0.75rem; }
        .overflow-hidden { overflow: hidden; }
        .shadow-sm { box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05); }
        .object-contain { object-fit: contain; }
        .p-2 { padding: 0.5rem; }
        .text-3xl { font-size: 1.875rem; line-height: 2.25rem; }
        .text-xl { font-size: 1.25rem; line-height: 1.75rem; }
        .text-lg { font-size: 1.125rem; line-height: 1.75rem; }
        .text-md { font-size: 1rem; line-height: 1.5rem; }
        .text-sm { font-size: 0.875rem; line-height: 1.25rem; }
        .text-\[10px\] { font-size: 10px; }
        .font-bold { font-weight: 700; }
        .font-extrabold { font-weight: 800; }
        .font-black { font-weight: 900; }
        .font-semibold { font-weight: 600; }
        .font-medium { font-weight: 500; }
        .tracking-tight { letter-spacing: -0.025em; }
        .tracking-wider { letter-spacing: 0.05em; }
        .tracking-\[0.15em\] { letter-spacing: 0.15em; }
        .uppercase { text-transform: uppercase; }
        .text-gray-900 { color: #111827; }
        .text-gray-800 { color: #1f2937; }
        .text-gray-700 { color: #374151; }
        .text-gray-600 { color: #4b5563; }
        .text-right { text-align: right; }
        .text-center { text-align: center; }
        .whitespace-pre-wrap { white-space: pre-wrap; }
        .bg-gray-50 { background-color: #f9fafb; }
        .bg-gray-100 { background-color: #f3f4f6; }
        .bg-green-50 { background-color: #f0fdf4; }
        .bg-red-50 { background-color: #fef2f2; }
        .text-green-700 { color: #15803d; }
        .text-red-700 { color: #b91c1c; }
        .border-green-200 { border-color: #bbf7d0; }
        .border-red-200 { border-color: #fecaca; }
        .font-mono { font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace; }
        .underline { text-decoration: underline; }
        .text-\(--color-primary\) { color: #2563eb; }
        table { width: 100%; border-collapse: collapse; }
        th, td { padding: 0.5rem 0.5rem; }
    </style>
    </head>
    <body class="bg-white text-black p-12 w-[800px] mx-auto space-y-8 font-sans flex flex-col min-h-[1050px]">
        
        <div class="grow">
          <!-- Header -->
          <div class="flex justify-between items-start border-b border-gray-200 pb-8">
            <div class="flex items-start gap-6">
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
        <div class="py-4 mt-4 flex justify-between items-start">
          <div>
            <h3 class="text-sm font-bold text-gray-600 uppercase tracking-wider mb-2">
              Bill To
            </h3>
            <p class="text-lg font-bold text-gray-900">${data.billTo?.clientName || ''}</p>
            <p class="text-gray-800 text-sm font-medium">${data.billTo?.clientEmail || ''}</p>
            <p class="text-gray-800 text-sm font-medium">${data.billTo?.clientPhone || ''}</p>
            <p class="text-gray-800 text-sm font-medium whitespace-pre-wrap">${data.billTo?.clientAddress || ''}</p>
          </div>

          <div class="px-5 py-2 rounded-xl text-[10px] font-black uppercase tracking-[0.15em] border ${badgeClasses}">
            ${statusLabel}
          </div>
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
            <div class="flex justify-between border-t border-gray-300 pt-3 text-xl font-extrabold text-gray-900 gap-2">
              <span>Total Due:</span>
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
