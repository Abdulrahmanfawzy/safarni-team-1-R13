import QRCode from "qrcode";
import type { FlightTicketData } from "./flight-ticket";

const PAGE_WIDTH = 595;
const PAGE_HEIGHT = 842;

function escapePdfText(value: string) {
  const ascii = value.normalize("NFKD").replace(/[^\x20-\x7E]/g, "?");
  return ascii.replaceAll("\\", "\\\\").replaceAll("(", "\\(").replaceAll(")", "\\)");
}

function formatDate(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat("en", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  }).format(date);
}

function formatTime(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat("en", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone: "UTC",
  }).format(date);
}

function drawText(
  value: string,
  x: number,
  top: number,
  size: number,
  font = "F1",
  color = "0.12 0.17 0.27",
) {
  const y = PAGE_HEIGHT - top - size;
  return `${color} rg BT /${font} ${size} Tf 1 0 0 1 ${x} ${y} Tm (${escapePdfText(value)}) Tj ET\n`;
}

function drawRect(x: number, top: number, width: number, height: number, color: string) {
  const y = PAGE_HEIGHT - top - height;
  return `${color} rg ${x} ${y} ${width} ${height} re f\n`;
}

function drawLine(x1: number, top: number, x2: number, color = "0.86 0.89 0.93") {
  const y = PAGE_HEIGHT - top;
  return `${color} RG 0.8 w ${x1} ${y} m ${x2} ${y} l S\n`;
}

function drawQr(ticketUrl: string, x: number, top: number, size: number) {
  const matrix = QRCode.create(ticketUrl, { errorCorrectionLevel: "M" }).modules;
  const cell = size / matrix.size;
  let commands = drawRect(x - 8, top - 8, size + 16, size + 16, "1 1 1");
  for (let row = 0; row < matrix.size; row += 1) {
    for (let column = 0; column < matrix.size; column += 1) {
      if (matrix.get(row, column)) {
        const cellTop = top + row * cell;
        const y = PAGE_HEIGHT - cellTop - cell;
        commands += `0.05 0.09 0.16 rg ${x + column * cell} ${y} ${cell + 0.12} ${cell + 0.12} re f\n`;
      }
    }
  }
  return commands;
}

function buildPdf(content: string) {
  const stream = `<< /Length ${Buffer.byteLength(content, "ascii")} >>\nstream\n${content}endstream`;
  const objects = [
    "<< /Type /Catalog /Pages 2 0 R >>",
    "<< /Type /Pages /Kids [3 0 R] /Count 1 >>",
    "<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] /Resources << /Font << /F1 4 0 R /F2 5 0 R >> >> /Contents 6 0 R >>",
    "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>",
    "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>",
    stream,
  ];

  let pdf = "%PDF-1.4\n";
  const offsets = [0];
  objects.forEach((object, index) => {
    offsets.push(Buffer.byteLength(pdf, "ascii"));
    pdf += `${index + 1} 0 obj\n${object}\nendobj\n`;
  });
  const xrefOffset = Buffer.byteLength(pdf, "ascii");
  pdf += `xref\n0 ${objects.length + 1}\n0000000000 65535 f \n`;
  for (const offset of offsets.slice(1)) {
    pdf += `${String(offset).padStart(10, "0")} 00000 n \n`;
  }
  pdf += `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xrefOffset}\n%%EOF`;
  return Buffer.from(pdf, "ascii");
}

export function createFlightTicketPdf(ticket: FlightTicketData, ticketUrl: string) {
  let content = "";
  content += drawRect(0, 0, PAGE_WIDTH, 132, "0.08 0.15 0.29");
  content += drawText("SAFARNI  /  FLIGHT TICKET", 42, 34, 12, "F2", "0.76 0.84 0.95");
  content += drawText("Your journey", 42, 61, 28, "F2", "1 1 1");
  content += drawText(`BOOKING ${ticket.bookingCode}`, 42, 105, 11, "F2", "1 1 1");

  content += drawRect(32, 154, 531, 192, "0.96 0.97 0.99");
  content += drawText("DEPARTURE", 54, 177, 10, "F2", "0.36 0.43 0.55");
  content += drawText(formatTime(ticket.departureAt), 54, 204, 26, "F2");
  content += drawText(formatDate(ticket.departureAt), 54, 240, 13);
  content += drawText(`Flight ID  ${ticket.flightId}`, 54, 271, 11, "F1", "0.36 0.43 0.55");

  content += drawText("ARRIVAL", 322, 177, 10, "F2", "0.36 0.43 0.55");
  content += drawText(formatTime(ticket.arrivalAt), 322, 204, 26, "F2");
  content += drawText(formatDate(ticket.arrivalAt), 322, 240, 13);
  content += drawText(ticket.status.toUpperCase(), 322, 271, 11, "F2", "0.12 0.45 0.32");

  content += drawText("PASSENGERS", 42, 383, 10, "F2", "0.36 0.43 0.55");
  content += drawText(`${ticket.adults} adults  /  ${ticket.children} children  /  ${ticket.infants} infants`, 42, 408, 15, "F2");
  content += drawLine(42, 450, 553);
  content += drawText("BOOKING REFERENCE", 42, 477, 10, "F2", "0.36 0.43 0.55");
  content += drawText(ticket.bookingCode, 42, 499, 17, "F2");
  content += drawText("TOTAL", 42, 543, 10, "F2", "0.36 0.43 0.55");
  content += drawText(`${ticket.currency} ${ticket.totalAmount}`, 42, 565, 17, "F2");

  content += drawQr(ticketUrl, 376, 500, 142);
  content += drawText("SCAN TO DOWNLOAD THIS TICKET", 346, 682, 9, "F2", "0.36 0.43 0.55");
  content += drawLine(42, 735, 553);
  content += drawText("Please keep this ticket available for your journey.", 42, 758, 10, "F1", "0.36 0.43 0.55");
  content += drawText(`Ticket ID  ${ticket.bookingId}`, 42, 778, 9, "F1", "0.48 0.53 0.62");

  return buildPdf(content);
}
