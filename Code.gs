const SHEET_NAMES = ["leads", "jamaah", "bookings", "payments", "packages", "itinerary", "activity"];
const SPREADSHEET_ID = "11-UBKsXjpfBvWXnqjbXfhLmj2V9rYP1zOrU0572GS7E";

function doGet() {
  return jsonOutput({ ok: true, app: "MDD Travel Umrah Dashboard", data: readAll() });
}

function doPost(e) {
  try {
    const body = JSON.parse(e.postData.contents || "{}");
    if (body.action === "push" && body.payload) {
      writeAll(body.payload);
      logSync(body.clientTime || new Date().toISOString());
      return jsonOutput({ ok: true, data: readAll() });
    }
    return jsonOutput({ ok: true, data: readAll() });
  } catch (err) {
    return jsonOutput({ ok: false, error: String(err) });
  }
}

function setupWorkbook() {
  const ss = getSpreadsheet();
  SHEET_NAMES.forEach((name) => ensureSheet(ss, name));
  const settings = ensureSheet(ss, "settings");
  settings.getRange(1, 1, 4, 2).setValues([
    ["app", "MDD Travel Umrah Dashboard"],
    ["workspace", "rizkifriends19@gmail.com"],
    ["repo", "https://github.com/abuadzka/mddtravel"],
    ["updatedAt", new Date().toISOString()]
  ]);
}

function readAll() {
  const ss = getSpreadsheet();
  const data = {};
  SHEET_NAMES.forEach((name) => {
    const sheet = ensureSheet(ss, name);
    const values = sheet.getDataRange().getValues();
    if (values.length < 2) {
      data[name] = [];
      return;
    }
    const headers = values[0].map(String);
    data[name] = values.slice(1).filter((row) => row.some((cell) => cell !== "")).map((row) => {
      const item = {};
      headers.forEach((header, index) => {
        item[header] = row[index] instanceof Date ? row[index].toISOString().slice(0, 10) : row[index];
      });
      return item;
    });
  });
  return data;
}

function writeAll(payload) {
  const ss = getSpreadsheet();
  SHEET_NAMES.forEach((name) => {
    const rows = Array.isArray(payload[name]) ? payload[name] : [];
    const sheet = ensureSheet(ss, name);
    sheet.clearContents();
    const headers = collectHeaders(rows);
    sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
    if (rows.length) {
      const values = rows.map((row) => headers.map((header) => row[header] == null ? "" : row[header]));
      sheet.getRange(2, 1, values.length, headers.length).setValues(values);
    }
    sheet.setFrozenRows(1);
    sheet.autoResizeColumns(1, headers.length);
  });
}

function collectHeaders(rows) {
  const preferred = ["id", "name", "code", "invoice", "package", "phone", "stage", "status", "amount", "departure", "updatedAt"];
  const found = {};
  rows.forEach((row) => Object.keys(row || {}).forEach((key) => found[key] = true));
  const headers = preferred.filter((key) => found[key]);
  Object.keys(found).sort().forEach((key) => {
    if (!headers.includes(key)) headers.push(key);
  });
  return headers.length ? headers : ["id", "updatedAt"];
}

function ensureSheet(ss, name) {
  return ss.getSheetByName(name) || ss.insertSheet(name);
}

function logSync(clientTime) {
  const ss = getSpreadsheet();
  const settings = ensureSheet(ss, "settings");
  settings.getRange("D1:E1").setValues([["lastSync", new Date().toISOString()]]);
  settings.getRange("D2:E2").setValues([["clientTime", clientTime]]);
}

function jsonOutput(value) {
  return ContentService
    .createTextOutput(JSON.stringify(value))
    .setMimeType(ContentService.MimeType.JSON);
}

function getSpreadsheet() {
  return SpreadsheetApp.openById(SPREADSHEET_ID);
}
