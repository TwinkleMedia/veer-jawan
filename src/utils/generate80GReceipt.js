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
 *
 * USAGE (inside your DonatePage success handler):
 *
 *   import { generate80GReceipt } from "@/utils/generate80GReceipt";
 *
 *   // After verifyData.success === true:
 *   if (donorInfo.wants80G) {
 *     await generate80GReceipt({
 *       donorName:    donorInfo.name,
 *       donorAddress: donorInfo.address,
 *       donorPan:     donorInfo.panNumber,
 *       amount:       donorInfo.amount,
 *       paymentId:    response.razorpay_payment_id,
 *       receiptDate:  new Date(),
 *     });
 *   }
 */

import { PDFDocument, rgb, StandardFonts } from "pdf-lib";

// ── Helpers ───────────────────────────────────────────────────────────────────

/** Convert a number to Indian words (up to crores). */
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

/** Generate a sequential-looking receipt number from the payment ID. */
function buildReceiptNumber(paymentId, date) {
  const year  = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  // Use last 6 chars of paymentId as a unique suffix
  const suffix = paymentId ? paymentId.slice(-6).toUpperCase() : "000000";
  return `VJF/${year}-${Number(year) + 1}/${month}/${suffix}`;
}

/** Format a Date as "DD/MM/YYYY". */
function formatDate(d) {
  return [
    String(d.getDate()).padStart(2, "0"),
    String(d.getMonth() + 1).padStart(2, "0"),
    d.getFullYear(),
  ].join("/");
}

// ── Main Function ─────────────────────────────────────────────────────────────

/**
 * @param {object} data
 * @param {string}  data.donorName
 * @param {string}  data.donorAddress
 * @param {string}  data.donorPan
 * @param {number}  data.amount          – in INR (integer or float)
 * @param {string}  data.paymentId       – Razorpay payment ID
 * @param {Date}    [data.receiptDate]   – defaults to now
 */
export async function generate80GReceipt({
  donorName,
  donorAddress,
  donorPan,
  amount,
  paymentId,
  receiptDate = new Date(),
}) {
  // 1. Load the letterhead PDF from /public
  const letterheadBytes = await fetch("/VJF_LetterHead_pdf.pdf").then((r) => {
    if (!r.ok) throw new Error("Could not load VJF_LetterHead_pdf.pdf from /public");
    return r.arrayBuffer();
  });

  // 2. Load into pdf-lib
  const pdfDoc  = await PDFDocument.load(letterheadBytes);
  const page    = pdfDoc.getPages()[0];
  const { width, height } = page.getSize(); // typically 595 × 842 for A4

  // 3. Embed fonts
  const bold    = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  const regular = await pdfDoc.embedFont(StandardFonts.Helvetica);

  // ── Colour palette ──
  const darkBlue = rgb(0.16, 0.24, 0.53);   // #293C86
  const orange   = rgb(1,    0.40, 0.12);    // #FF671F
  const black    = rgb(0,    0,    0);
  const grey     = rgb(0.35, 0.35, 0.35);

  // ── Y-offset helper (pdf-lib origin is bottom-left) ──
  const y = (fromTop) => height - fromTop;

  // ── Computed values ──
  const receiptNo   = buildReceiptNumber(paymentId, receiptDate);
  const dateStr     = formatDate(receiptDate);
  const amtWords    = amountInWords(Math.round(amount));
  const amtFormatted = "Rs. " + Number(amount).toLocaleString("en-IN");

  // ─────────────────────────────────────────────────────────────────────────
  //  RECEIPT TITLE
  // ─────────────────────────────────────────────────────────────────────────
  const titleText = "DONATION RECEIPT";
  const titleW    = bold.widthOfTextAtSize(titleText, 15);
  page.drawText(titleText, {
    x: (width - titleW) / 2,
    y: y(210),
    size: 15,
    font: bold,
    color: darkBlue,
  });

  // Underline
  page.drawLine({
    start: { x: (width - titleW) / 2 - 4, y: y(213) },
    end:   { x: (width + titleW) / 2 + 4, y: y(213) },
    thickness: 1.2,
    color: orange,
  });

  // ─────────────────────────────────────────────────────────────────────────
  //  TRUST DETAILS BOX
  // ─────────────────────────────────────────────────────────────────────────
  const boxX = 50;
  const boxW = width - 100;
  let   curY = y(230);

  page.drawRectangle({
    x: boxX - 6,
    y: curY - 48,
    width: boxW + 12,
    height: 56,
    borderColor: darkBlue,
    borderWidth: 0.8,
    color: rgb(0.95, 0.96, 1),
  });

  // Row label helper
  const drawRow = (label, value, topY, labelFont = bold, valueFont = regular, labelColor = darkBlue, valueColor = black) => {
    page.drawText(label, { x: boxX, y: topY, size: 9, font: labelFont, color: labelColor });
    page.drawText(value, { x: boxX + 175, y: topY, size: 9, font: valueFont, color: valueColor });
  };

  drawRow("Trust / NGO Name       :", "Veer Jawan Foundation",               curY - 8);
  drawRow("80G Registration No.   :", "AADTV7929EF20231",                    curY - 22);
  drawRow("Trust Address          :", "NL-8B, Patkar Apt, LIG Bldg 58/6, 3rd Floor,", curY - 36);
  page.drawText("Sector 10, Nerul, Navi Mumbai – 400706.", {
    x: boxX + 175, y: curY - 47, size: 9, font: regular, color: black,
  });

  curY -= 70;

  // ─────────────────────────────────────────────────────────────────────────
  //  RECEIPT INFORMATION
  // ─────────────────────────────────────────────────────────────────────────
  page.drawText("RECEIPT INFORMATION", {
    x: boxX, y: curY, size: 9.5, font: bold, color: orange,
  });
  curY -= 14;

  page.drawLine({
    start: { x: boxX, y: curY + 2 }, end: { x: boxX + boxW, y: curY + 2 },
    thickness: 0.5, color: rgb(0.8, 0.8, 0.8),
  });

  drawRow("Receipt Number :", receiptNo,  curY - 8,  bold, regular);
  drawRow("Receipt Date   :", dateStr,    curY - 22, bold, regular);

  curY -= 44;

  // ─────────────────────────────────────────────────────────────────────────
  //  DONOR DETAILS
  // ─────────────────────────────────────────────────────────────────────────
  page.drawText("DONOR DETAILS", {
    x: boxX, y: curY, size: 9.5, font: bold, color: orange,
  });
  curY -= 14;

  page.drawLine({
    start: { x: boxX, y: curY + 2 }, end: { x: boxX + boxW, y: curY + 2 },
    thickness: 0.5, color: rgb(0.8, 0.8, 0.8),
  });

  drawRow("Donor Name    :", donorName,  curY - 8,  bold, regular);
  drawRow("PAN Number    :", donorPan,   curY - 22, bold, bold, darkBlue, darkBlue);

  // Address may be multi-line — wrap at ~55 chars
  const addrWords = donorAddress.split(" ");
  let   addrLine1 = "";
  let   addrLine2 = "";
  for (const word of addrWords) {
    if ((addrLine1 + " " + word).trim().length <= 55) addrLine1 = (addrLine1 + " " + word).trim();
    else addrLine2 = (addrLine2 + " " + word).trim();
  }

  page.drawText("Donor Address :", { x: boxX,       y: curY - 36, size: 9, font: bold,    color: darkBlue });
  page.drawText(addrLine1,         { x: boxX + 175, y: curY - 36, size: 9, font: regular, color: black });
  if (addrLine2) {
    page.drawText(addrLine2, { x: boxX + 175, y: curY - 48, size: 9, font: regular, color: black });
  }

  curY -= (addrLine2 ? 70 : 58);

  // ─────────────────────────────────────────────────────────────────────────
  //  DONATION DETAILS
  // ─────────────────────────────────────────────────────────────────────────
  page.drawText("DONATION DETAILS", {
    x: boxX, y: curY, size: 9.5, font: bold, color: orange,
  });
  curY -= 14;

  page.drawLine({
    start: { x: boxX, y: curY + 2 }, end: { x: boxX + boxW, y: curY + 2 },
    thickness: 0.5, color: rgb(0.8, 0.8, 0.8),
  });

  drawRow("Amount Received    :", amtFormatted,        curY - 8,  bold, bold, darkBlue, rgb(0, 0.45, 0.15));
  drawRow("Amount in Words    :", amtWords,            curY - 22, bold, regular);
  drawRow("Mode of Payment    :", "Online (Razorpay)", curY - 36, bold, regular);
  drawRow("Date of Transaction:", dateStr,             curY - 50, bold, regular);
  drawRow("Transaction ID     :", paymentId || "N/A",  curY - 64, bold, regular, darkBlue, grey);

  curY -= 90;

  // ─────────────────────────────────────────────────────────────────────────
  //  80G NOTE
  // ─────────────────────────────────────────────────────────────────────────
  const noteText =
    "This donation is eligible for tax deduction under Section 80G of the Income Tax Act, 1961.";
  page.drawRectangle({
    x: boxX - 6, y: curY - 16, width: boxW + 12, height: 26,
    color: rgb(0.95, 1, 0.95), borderColor: rgb(0, 0.55, 0.2), borderWidth: 0.6,
  });
  page.drawText(noteText, {
    x: boxX, y: curY - 8, size: 8, font: regular, color: rgb(0, 0.45, 0.15),
  });

  curY -= 40;

  // ─────────────────────────────────────────────────────────────────────────
  //  SIGNATURE BLOCK
  // ─────────────────────────────────────────────────────────────────────────
  const sigX = width - 200;
  page.drawLine({
    start: { x: sigX, y: curY - 4 }, end: { x: sigX + 140, y: curY - 4 },
    thickness: 0.8, color: darkBlue,
  });
  page.drawText("Authorised Signatory", {
    x: sigX + 10, y: curY - 16, size: 8.5, font: bold, color: darkBlue,
  });
  page.drawText("Veer Jawan Foundation", {
    x: sigX + 5, y: curY - 28, size: 8, font: regular, color: grey,
  });

  // ─────────────────────────────────────────────────────────────────────────
  //  FOOTER NOTE
  // ─────────────────────────────────────────────────────────────────────────
  page.drawLine({
    start: { x: 40, y: 60 }, end: { x: width - 40, y: 60 },
    thickness: 0.5, color: rgb(0.8, 0.8, 0.8),
  });
  const footNote = "This is a computer-generated receipt and does not require a physical signature.";
  const footW = regular.widthOfTextAtSize(footNote, 7.5);
  page.drawText(footNote, {
    x: (width - footW) / 2, y: 48, size: 7.5, font: regular, color: grey,
  });

  // 4. Serialize & trigger download
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