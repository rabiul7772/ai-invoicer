export const generateInvoiceEmailHtml = (data: any): string => {
  // Generate invoice number
  const randomStr = Math.random().toString(36).substring(2, 7).toUpperCase();
  const invoiceNumber = `INV-${randomStr}`;

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

  const status = data.status || 'DRAFT';
  let statusLabel = 'Unpaid';
  let statusBg = '#f3f4f6';
  let statusColor = '#374151';
  let statusBorder = '#d1d5db';

  if (status === 'PAID') {
    statusLabel = 'Paid';
    statusBg = '#f0fdf4';
    statusColor = '#15803d';
    statusBorder = '#bbf7d0';
  } else if (status === 'OVERDUE') {
    statusLabel = 'Overdue';
    statusBg = '#fef2f2';
    statusColor = '#b91c1c';
    statusBorder = '#fecaca';
  } else if (status === 'SENT') {
    statusLabel = 'Sent';
    statusBg = '#eff6ff';
    statusColor = '#1d4ed8';
    statusBorder = '#bfdbfe';
  }

  const itemsHtml = (data.items || [])
    .map(
      (item: any, index: number) => `
    <tr style="background-color: ${index % 2 === 0 ? '#ffffff' : '#f9fafb'};">
      <td style="padding: 12px 16px; font-size: 14px; color: #111827; border-bottom: 1px solid #e5e7eb;">${item.name || 'Unnamed Item'}</td>
      <td style="padding: 12px 16px; font-size: 14px; color: #374151; text-align: center; border-bottom: 1px solid #e5e7eb;">${item.quantity || 1}</td>
      <td style="padding: 12px 16px; font-size: 14px; color: #374151; text-align: right; border-bottom: 1px solid #e5e7eb;">$${Number(item.price || 0).toFixed(2)}</td>
      <td style="padding: 12px 16px; font-size: 14px; color: #374151; text-align: right; border-bottom: 1px solid #e5e7eb;">${item.tax || 0}%</td>
      <td style="padding: 12px 16px; font-size: 14px; font-weight: 700; color: #111827; text-align: right; border-bottom: 1px solid #e5e7eb; font-family: monospace;">$${Number(item.total || 0).toFixed(2)}</td>
    </tr>
  `
    )
    .join('');

  const logoHtml = data.billFrom?.companyLogoUrl
    ? `<img src="${data.billFrom.companyLogoUrl}" alt="Company Logo" style="width: 60px; height: 60px; object-fit: contain; border-radius: 8px; border: 1px solid #e5e7eb; padding: 4px; background: #f9fafb;" />`
    : '';

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Invoice ${invoiceNumber}</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f3f4f6; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">

  <!-- Outer Wrapper -->
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color: #f3f4f6; padding: 40px 16px;">
    <tr>
      <td align="center">
        <!-- Card -->
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 24px rgba(0,0,0,0.08); max-width: 600px; width: 100%;">

          <!-- Top Accent Bar -->
          <tr>
            <td style="background: linear-gradient(135deg, #1d4ed8 0%, #7c3aed 100%); height: 6px; font-size: 0; line-height: 0;">&nbsp;</td>
          </tr>

          <!-- Header -->
          <tr>
            <td style="padding: 32px 40px 24px 40px; border-bottom: 1px solid #e5e7eb;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="vertical-align: middle;">
                    ${logoHtml}
                  </td>
                  <td style="vertical-align: middle; padding-left: ${data.billFrom?.companyLogoUrl ? '16px' : '0'};">
                    <p style="margin: 0; font-size: 26px; font-weight: 800; color: #111827; letter-spacing: -0.5px;">INVOICE</p>
                    <p style="margin: 4px 0 0 0; font-size: 13px; color: #6b7280;"># ${invoiceNumber}</p>
                  </td>
                  <td style="vertical-align: middle; text-align: right;">
                    <span style="display: inline-block; padding: 6px 16px; border-radius: 999px; font-size: 11px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; background-color: ${statusBg}; color: ${statusColor}; border: 1px solid ${statusBorder};">
                      ${statusLabel}
                    </span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Dates + From/To Grid -->
          <tr>
            <td style="padding: 28px 40px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <!-- Bill From -->
                  <td style="vertical-align: top; width: 48%;">
                    <p style="margin: 0 0 8px 0; font-size: 10px; font-weight: 700; color: #9ca3af; letter-spacing: 0.12em; text-transform: uppercase;">From</p>
                    <p style="margin: 0; font-size: 15px; font-weight: 700; color: #111827;">${data.billFrom?.businessName || ''}</p>
                    <p style="margin: 4px 0 0 0; font-size: 13px; color: #4b5563;">${data.billFrom?.email || ''}</p>
                    <p style="margin: 2px 0 0 0; font-size: 13px; color: #4b5563;">${data.billFrom?.phoneNumber || ''}</p>
                    <p style="margin: 4px 0 0 0; font-size: 13px; color: #4b5563; line-height: 1.5;">${data.billFrom?.address || ''}</p>
                  </td>

                  <td style="width: 4%;"></td>

                  <!-- Bill To -->
                  <td style="vertical-align: top; width: 48%;">
                    <p style="margin: 0 0 8px 0; font-size: 10px; font-weight: 700; color: #9ca3af; letter-spacing: 0.12em; text-transform: uppercase;">Bill To</p>
                    <p style="margin: 0; font-size: 15px; font-weight: 700; color: #111827;">${data.billTo?.clientName || ''}</p>
                    <p style="margin: 4px 0 0 0; font-size: 13px; color: #4b5563;">${data.billTo?.clientEmail || ''}</p>
                    <p style="margin: 2px 0 0 0; font-size: 13px; color: #4b5563;">${data.billTo?.clientPhone || ''}</p>
                    <p style="margin: 4px 0 0 0; font-size: 13px; color: #4b5563; line-height: 1.5;">${data.billTo?.clientAddress || ''}</p>
                  </td>
                </tr>

                <!-- Divider -->
                <tr><td colspan="3" style="padding: 20px 0 0 0;"><div style="border-top: 1px solid #e5e7eb;"></div></td></tr>

                <!-- Dates Row -->
                <tr>
                  <td style="padding-top: 20px; vertical-align: top;">
                    <p style="margin: 0 0 4px 0; font-size: 10px; font-weight: 700; color: #9ca3af; letter-spacing: 0.12em; text-transform: uppercase;">Invoice Date</p>
                    <p style="margin: 0; font-size: 14px; font-weight: 600; color: #111827;">${invoiceDate}</p>
                  </td>
                  <td style="width: 4%;"></td>
                  <td style="padding-top: 20px; vertical-align: top;">
                    ${dueDateStr ? `
                    <p style="margin: 0 0 4px 0; font-size: 10px; font-weight: 700; color: #9ca3af; letter-spacing: 0.12em; text-transform: uppercase;">Due Date</p>
                    <p style="margin: 0; font-size: 14px; font-weight: 600; color: #111827;">${dueDateStr}</p>
                    ` : ''}
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Items Table -->
          <tr>
            <td style="padding: 0 40px 28px 40px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border: 1px solid #e5e7eb; border-radius: 10px; overflow: hidden;">
                <!-- Table Header -->
                <tr style="background-color: #f9fafb;">
                  <th style="padding: 11px 16px; font-size: 11px; font-weight: 700; color: #6b7280; text-align: left; letter-spacing: 0.08em; text-transform: uppercase; border-bottom: 1px solid #e5e7eb;">Item</th>
                  <th style="padding: 11px 16px; font-size: 11px; font-weight: 700; color: #6b7280; text-align: center; letter-spacing: 0.08em; text-transform: uppercase; border-bottom: 1px solid #e5e7eb;">Qty</th>
                  <th style="padding: 11px 16px; font-size: 11px; font-weight: 700; color: #6b7280; text-align: right; letter-spacing: 0.08em; text-transform: uppercase; border-bottom: 1px solid #e5e7eb;">Price</th>
                  <th style="padding: 11px 16px; font-size: 11px; font-weight: 700; color: #6b7280; text-align: right; letter-spacing: 0.08em; text-transform: uppercase; border-bottom: 1px solid #e5e7eb;">Tax</th>
                  <th style="padding: 11px 16px; font-size: 11px; font-weight: 700; color: #6b7280; text-align: right; letter-spacing: 0.08em; text-transform: uppercase; border-bottom: 1px solid #e5e7eb;">Amount</th>
                </tr>
                ${itemsHtml}

                <!-- Totals -->
                <tr>
                  <td colspan="4" style="padding: 12px 16px; font-size: 13px; color: #6b7280; text-align: right; border-top: 1px solid #e5e7eb; background-color: #f9fafb;">Subtotal</td>
                  <td style="padding: 12px 16px; font-size: 13px; font-weight: 600; color: #111827; text-align: right; border-top: 1px solid #e5e7eb; background-color: #f9fafb; font-family: monospace;">$${Number(data.subtotal || 0).toFixed(2)}</td>
                </tr>
                <tr>
                  <td colspan="4" style="padding: 10px 16px; font-size: 13px; color: #6b7280; text-align: right; border-top: 1px solid #e5e7eb; background-color: #f9fafb;">Tax</td>
                  <td style="padding: 10px 16px; font-size: 13px; font-weight: 600; color: #111827; text-align: right; border-top: 1px solid #e5e7eb; background-color: #f9fafb; font-family: monospace;">$${Number(data.taxTotal || 0).toFixed(2)}</td>
                </tr>
                <tr style="background: linear-gradient(135deg, #1d4ed8 0%, #7c3aed 100%);">
                  <td colspan="4" style="padding: 16px; font-size: 14px; font-weight: 700; color: #ffffff; text-align: right; letter-spacing: 0.02em;">Total Due</td>
                  <td style="padding: 16px; font-size: 18px; font-weight: 800; color: #ffffff; text-align: right; font-family: monospace;">$${Number(data.totalAmount || 0).toFixed(2)}</td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Notes -->
          ${data.notes ? `
          <tr>
            <td style="padding: 0 40px 28px 40px;">
              <div style="background-color: #f9fafb; border: 1px solid #e5e7eb; border-radius: 10px; padding: 20px;">
                <p style="margin: 0 0 8px 0; font-size: 11px; font-weight: 700; color: #9ca3af; letter-spacing: 0.12em; text-transform: uppercase;">Notes / Terms</p>
                <p style="margin: 0; font-size: 13px; color: #374151; line-height: 1.6; white-space: pre-wrap;">${data.notes}</p>
              </div>
            </td>
          </tr>
          ` : ''}

          <!-- Footer -->
          <tr>
            <td style="background-color: #f9fafb; border-top: 1px solid #e5e7eb; padding: 24px 40px; text-align: center;">
              <p style="margin: 0; font-size: 15px; font-weight: 700; color: #111827;">Thank you for your business!</p>
              <p style="margin: 8px 0 0 0; font-size: 13px; color: #6b7280;">
                Questions? Email us at <a href="mailto:${data.billFrom?.email || ''}" style="color: #1d4ed8; text-decoration: none; font-weight: 600;">${data.billFrom?.email || ''}</a>
              </p>
              <p style="margin: 16px 0 0 0; font-size: 11px; color: #9ca3af;">Generated by <strong style="color: #6b7280;">AI Invoicer</strong></p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>

</body>
</html>
`;
};
