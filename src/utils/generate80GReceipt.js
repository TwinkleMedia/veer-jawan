/**
 * generate80GReceipt.js
 *
 * Generates a downloadable 80G donation receipt on the VJF letterhead.
 * Uses pdf-lib (browser-compatible). No Python or server required.
 *
 * SETUP:
 *  1. Place the letterhead PDF at:  /public/VJF_LetterHead_pdf.pdf
 *  2. Install pdf-lib:              npm install pdf-lib
 *  3. Import and call generate80GReceipt(donationData) after successful payment.
 */

import { PDFDocument, rgb, StandardFonts } from "pdf-lib";

// ── Helpers ───────────────────────────────────────────────────────────────────

function amountInWords(n) {
  const ones = [
    "", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine",
    "Ten", "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen",
    "Seventeen", "Eighteen", "Nineteen",
  ];
  const tens = [
    "", "", "Twenty", "Thirty", "Forty", "Fifty",
    "Sixty", "Seventy", "Eighty", "Ninety",
  ];
  if (n === 0) return "Zero";

  function twoDigits(num) {
    if (num < 20) return ones[num];
    return tens[Math.floor(num / 10)] + (num % 10 ? " " + ones[num % 10] : "");
  }
  function threeDigits(num) {
    if (num >= 100)
      return ones[Math.floor(num / 100)] + " Hundred" + (num % 100 ? " " + twoDigits(num % 100) : "");
    return twoDigits(num);
  }

  let result = "";
  const crore = Math.floor(n / 10000000);
  const lakh  = Math.floor((n % 10000000) / 100000);
  const thou  = Math.floor((n % 100000)   / 1000);
  const rest  = n % 1000;

  if (crore) result += threeDigits(crore) + " Crore ";
  if (lakh)  result += twoDigits(lakh)    + " Lakh ";
  if (thou)  result += threeDigits(thou)  + " Thousand ";
  if (rest)  result += threeDigits(rest);

  return result.trim() + " Rupees Only";
}

function buildReceiptNumber(paymentId, date) {
  const year   = date.getFullYear();
  const month  = String(date.getMonth() + 1).padStart(2, "0");
  const suffix = paymentId ? paymentId.slice(-6).toUpperCase() : "000000";
  return `VJF/${year}-${Number(year) + 1}/${month}/${suffix}`;
}

function formatDate(d) {
  return [
    String(d.getDate()).padStart(2, "0"),
    String(d.getMonth() + 1).padStart(2, "0"),
    d.getFullYear(),
  ].join("/");
}

// ── Main Function ─────────────────────────────────────────────────────────────

export async function generate80GReceipt({
  donorName,
  donorAddress,
  donorPan,
  amount,
  paymentId,
  receiptDate = new Date(),
}) {
  // 1. Load letterhead
  const letterheadBytes = await fetch("/VJF_LetterHead_pdf.pdf").then((r) => {
    if (!r.ok) throw new Error("Could not load VJF_LetterHead_pdf.pdf from /public");
    return r.arrayBuffer();
  });

  const pdfDoc = await PDFDocument.load(letterheadBytes);
  const page   = pdfDoc.getPages()[0];
  const { width, height } = page.getSize(); // 595.3 x 841.9

  // Fonts
  const bold    = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  const regular = await pdfDoc.embedFont(StandardFonts.Helvetica);

  // ── Colours ──
  const darkBlue  = rgb(0.122, 0.22, 0.392);   // matches letterhead blue
  const orange    = rgb(1,     0.40, 0.12);     // #FF671F
  const black     = rgb(0,     0,    0);
  const grey      = rgb(0.4,   0.4,  0.4);
  const lightGrey = rgb(0.92,  0.92, 0.92);
  const green     = rgb(0,     0.42, 0.22);
  const lightBlue = rgb(0.93,  0.95, 1.0);
  const lightGreen= rgb(0.92,  1.0,  0.94);

  // ── LAYOUT CONSTANTS (pdf-lib: origin = bottom-left) ──
  //
  //  The letterhead has:
  //    Header (logo + title): top 0 → 151pt from top  = y: 691 → 842 in pdf-lib
  //    Left names column:     x: 0  → 223
  //    Content area:          x: 228 → 583,  y: 35 → 688
  //
  const CX     = 215;          // content area left x
  const CW     = 352;          // content area width  (231 → 583)
  const CTOP   = 682;          // content area top y in pdf-lib (just below header line)
  const CBOT   = 38;           // content area bottom y in pdf-lib
  const LW     = 148;          // label column width inside content
  const VX     = CX + LW + 8; // value column x

  // Computed values
  const receiptNo    = buildReceiptNumber(paymentId, receiptDate);
  const dateStr      = formatDate(receiptDate);
  const amtWords     = amountInWords(Math.round(amount));
  const amtFormatted = "Rs. " + Number(amount).toLocaleString("en-IN");

  // ── Drawing helpers ──────────────────────────────────────────────────────

  // Draw a filled rectangle
  const fillRect = (x, y, w, h, color, border, borderColor) => {
    page.drawRectangle({
      x, y, width: w, height: h,
      color,
      ...(border ? { borderWidth: border, borderColor } : {}),
    });
  };

  // Draw a horizontal divider line
  const hLine = (y, color = lightGrey, thickness = 0.6) => {
    page.drawLine({
      start: { x: CX, y }, end: { x: CX + CW, y },
      thickness, color,
    });
  };

  // Draw label + colon + value on one row
  const row = (label, value, y, sz = 10, valBold = false, valColor = black) => {
    page.drawText(label, { x: CX + 4, y, size: sz, font: bold, color: darkBlue });
    page.drawText(":", { x: CX + LW - 6, y, size: sz, font: bold, color: darkBlue });
    page.drawText(value, { x: VX, y, size: sz, font: valBold ? bold : regular, color: valColor });
  };

  // Section header (orange bold label + underline)
  const sectionHeader = (text, y) => {
    page.drawText(text, { x: CX + 4, y, size: 10.5, font: bold, color: orange });
    hLine(y - 3, orange, 0.5);
  };

  // ── START DRAWING ────────────────────────────────────────────────────────

  let curY = CTOP;

  // ── 1. DONATION RECEIPT TITLE ──────────────────────────────────────────
  const titleText = "DONATION RECEIPT";
  const titleSize = 18;
  const titleW    = bold.widthOfTextAtSize(titleText, titleSize);
  // Center it in the content area
  const titleX    = CX + (CW - titleW) / 2;

  page.drawText(titleText, {
    x: titleX, y: curY - 16,
    size: titleSize, font: bold, color: darkBlue,
  });
  // Underline
  page.drawLine({
    start: { x: titleX - 2,         y: curY - 19 },
    end:   { x: titleX + titleW + 2, y: curY - 19 },
    thickness: 1.5, color: orange,
  });

  curY -= 38;

  // ── 2. TRUST DETAILS BOX ───────────────────────────────────────────────
  const trustBoxH = 56;
  fillRect(CX, curY - trustBoxH, CW, trustBoxH, lightBlue, 0.8, darkBlue);

  page.drawText("Trust / NGO Name", { x: CX + 4, y: curY - 12, size: 10, font: bold, color: darkBlue });
  page.drawText(":", { x: CX + LW - 6, y: curY - 12, size: 10, font: bold, color: darkBlue });
  page.drawText("Veer Jawan Foundation", { x: VX, y: curY - 12, size: 10, font: bold, color: darkBlue });

  page.drawText("80G Registration No.", { x: CX + 4, y: curY - 26, size: 10, font: bold, color: darkBlue });
  page.drawText(":", { x: CX + LW - 6, y: curY - 26, size: 10, font: bold, color: darkBlue });
  page.drawText("AADTV7929EF20231", { x: VX, y: curY - 26, size: 10, font: bold, color: darkBlue });

  page.drawText("Trust Address", { x: CX + 4, y: curY - 40, size: 10, font: bold, color: darkBlue });
  page.drawText(":", { x: CX + LW - 6, y: curY - 40, size: 10, font: bold, color: darkBlue });
  page.drawText("NL-8B, Patkar Apt, LIG Bldg 58/6, 3rd Floor,", { x: VX, y: curY - 40, size: 9.5, font: regular, color: black });
  page.drawText("Sector 10, Nerul, Navi Mumbai - 400706.", { x: VX, y: curY - 52, size: 9.5, font: regular, color: black });

  curY -= trustBoxH + 14;

  // ── 3. RECEIPT INFORMATION ─────────────────────────────────────────────
  sectionHeader("RECEIPT INFORMATION", curY);
  curY -= 14;

  row("Receipt Number", receiptNo, curY);
  curY -= 16;
  row("Receipt Date", dateStr, curY);
  curY -= 20;

  hLine(curY, lightGrey);
  curY -= 14;

  // ── 4. DONOR DETAILS ───────────────────────────────────────────────────
  sectionHeader("DONOR DETAILS", curY);
  curY -= 14;

  row("Donor Name", donorName, curY);
  curY -= 16;
  row("PAN Number", donorPan, curY, 10, true, darkBlue);
  curY -= 16;

  // Address — wrap at ~45 chars to fit the value column (max width ~200pt)
  const addrWords = donorAddress.split(" ");
  let addrLine1 = "", addrLine2 = "", addrLine3 = "";
  for (const word of addrWords) {
    const candidate = (addrLine1 + " " + word).trim();
    if (candidate.length <= 42) { addrLine1 = candidate; continue; }
    const candidate2 = (addrLine2 + " " + word).trim();
    if (candidate2.length <= 42) { addrLine2 = candidate2; continue; }
    addrLine3 = (addrLine3 + " " + word).trim();
  }

  page.drawText("Donor Address", { x: CX + 4, y: curY, size: 10, font: bold, color: darkBlue });
  page.drawText(":", { x: CX + LW - 6, y: curY, size: 10, font: bold, color: darkBlue });
  page.drawText(addrLine1, { x: VX, y: curY, size: 10, font: regular, color: black });
  if (addrLine2) { curY -= 13; page.drawText(addrLine2, { x: VX, y: curY, size: 10, font: regular, color: black }); }
  if (addrLine3) { curY -= 13; page.drawText(addrLine3, { x: VX, y: curY, size: 10, font: regular, color: black }); }

  curY -= 20;
  hLine(curY, lightGrey);
  curY -= 14;

  // ── 5. DONATION DETAILS ────────────────────────────────────────────────
  sectionHeader("DONATION DETAILS", curY);
  curY -= 14;

  row("Amount Received", amtFormatted, curY, 10, true, green);
  curY -= 16;
  row("Amount in Words", amtWords, curY, 9.5);
  curY -= 16;
  row("Mode of Payment", "Online (Razorpay)", curY);
  curY -= 16;
  row("Date of Transaction", dateStr, curY);
  curY -= 16;
  row("Transaction ID", paymentId || "N/A", curY, 9.5, false, grey);
  curY -= 20;

  // ── 6. 80G NOTE BOX ────────────────────────────────────────────────────
  hLine(curY, lightGrey);
  curY -= 8;

  const noteText = "This donation is eligible for tax deduction under Section 80G of the Income Tax Act, 1961.";
  fillRect(CX, curY - 20, CW, 24, lightGreen, 0.6, green);
  page.drawText(noteText, { x: CX + 6, y: curY - 14, size: 8.5, font: regular, color: green });

  curY -= 34;

  
  // ── 8. FOOTER ──────────────────────────────────────────────────────────
  const footNote = "This is a system-generated receipt and does not require a physical signature.";
  const footW = regular.widthOfTextAtSize(footNote, 7.5);
  hLine(CBOT + 16, lightGrey, 0.4);
  page.drawText(footNote, {
    x: CX + (CW - footW) / 2, y: CBOT + 4,
    size: 7.5, font: regular, color: grey,
  });

  // ── Save & download ───────────────────────────────────────────────────
  const pdfBytes = await pdfDoc.save();
  const blob = new Blob([pdfBytes], { type: "application/pdf" });
  const url  = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href     = url;
  a.download = `VJF_80G_Receipt_${receiptNo.replace(/\//g, "-")}.pdf`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}