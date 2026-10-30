# Google Sheets lead receiver

1. Create the sheet tab named `Sheet1` and add this header row, in this exact order:

   `Name | Email | Mobile | Amount | Page name | Razorpay order ID | Razorpay payment ID | Payment status | Programme date | Submitted at | IP address | UTM source | UTM medium | UTM campaign | UTM term | UTM content | Current status | City`

2. Open **Extensions → Apps Script**, paste the script below, and run `initialSetup` once. It stores the spreadsheet ID in Script Properties.
3. In **Project Settings → Script properties**, add `WEBHOOK_TOKEN` with a long random value. Put the same value in the landing page's `LEAD_WEBHOOK_TOKEN` environment variable.
4. Deploy as a Web app with **Execute as: Me** and **Who has access: Anyone**. Put the resulting `/exec` URL in `LEAD_WEBHOOK_URL`.

```javascript
const SHEET_NAME = 'Sheet1';

function initialSetup() {
  PropertiesService.getScriptProperties().setProperty(
    'SPREADSHEET_ID',
    SpreadsheetApp.getActiveSpreadsheet().getId(),
  );
}

function doPost(e) {
  try {
    const data = readPayload(e);
    const expectedToken = PropertiesService.getScriptProperties().getProperty('WEBHOOK_TOKEN');
    if (!expectedToken || data.token !== expectedToken) return json({ result: 'error', error: 'Unauthorized' });

    const spreadsheetId = PropertiesService.getScriptProperties().getProperty('SPREADSHEET_ID');
    const sheet = SpreadsheetApp.openById(spreadsheetId).getSheetByName(SHEET_NAME);
    if (!sheet) return json({ result: 'error', error: `Missing sheet: ${SHEET_NAME}` });

    const utm = data.utm || {};
    sheet.appendRow([
      value(data.name), value(data.email), value(data.mobile), value(data.amount),
      value(data.page_name), value(data.razorpay_order_id), value(data.razorpay_payment_id),
      value(data.payment_status), value(data.programme_date || data.programm_date),
      Utilities.formatDate(new Date(), 'Asia/Kolkata', 'MMM-dd-yyyy hh:mm a'),
      value(data.ip_address), value(utm.utm_source || data.utm_source),
      value(utm.utm_medium || data.utm_medium), value(utm.utm_campaign || data.utm_campaign),
      value(utm.utm_term || data.utm_term), value(utm.utm_content || data.utm_content),
      value(data.current_status || data.status), value(data.city),
    ]);
    return json({ result: 'success' });
  } catch (error) {
    console.error(error);
    return json({ result: 'error', error: 'Could not save lead' });
  }
}

function readPayload(e) {
  const type = (e.postData && e.postData.type) || '';
  if (type.indexOf('application/json') === 0) return JSON.parse(e.postData.contents || '{}');
  return e.parameter || {};
}

function value(input) {
  return input === null || input === undefined ? '' : String(input);
}

function json(body) {
  return ContentService.createTextOutput(JSON.stringify(body))
    .setMimeType(ContentService.MimeType.JSON);
}
```
