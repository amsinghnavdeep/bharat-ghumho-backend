/**
 * PDF invoice generation using PDFKit
 */
import PDFDocument from 'pdfkit';
import { logger } from '../utils/logger';
import { formatCurrency, formatDate } from '../utils/helpers';
import { APP_NAME } from '../utils/constants';

export class InvoiceService {
  /**
   * Generate PDF invoice for a booking
   */
  static async generateInvoice(booking: any, payment: any): Promise<Buffer> {
    return new Promise((resolve, reject) => {
      try {
        const doc = new PDFDocument({ size: 'A4', margin: 50 });
        const chunks: Buffer[] = [];

        doc.on('data', (chunk) => chunks.push(chunk));
        doc.on('end', () => resolve(Buffer.concat(chunks)));
        doc.on('error', reject);

        // Header
        doc.fontSize(24).font('Helvetica-Bold').text(APP_NAME, { align: 'center' });
        doc.moveDown(0.5);
        doc.fontSize(12).font('Helvetica').text('Tax Invoice', { align: 'center' });
        doc.moveDown(1);

        // Line separator
        doc.moveTo(50, doc.y).lineTo(545, doc.y).stroke();
        doc.moveDown(1);

        // Invoice details
        doc.fontSize(10).font('Helvetica-Bold');
        doc.text(`Invoice No: INV-${booking.pnr}`, 50);
        doc.text(`Date: ${formatDate(new Date())}`, 350, doc.y - 12);
        doc.moveDown(1);

        // Customer details
        doc.font('Helvetica-Bold').text('Bill To:');
        doc.font('Helvetica');
        doc.text(`${booking.user?.firstName || ''} ${booking.user?.lastName || ''}`);
        doc.text(booking.contactEmail);
        doc.text(booking.contactPhone);
        doc.moveDown(1);

        // Booking details
        doc.font('Helvetica-Bold').text('Booking Details:');
        doc.moveDown(0.5);
        doc.font('Helvetica');
        doc.text(`PNR: ${booking.pnr}`);
        doc.text(`Type: ${booking.type}`);
        doc.text(`Status: ${booking.status}`);
        doc.text(`Booked: ${formatDate(booking.createdAt)}`);
        doc.moveDown(1);

        // Passengers
        const passengers = booking.passengers as any[];
        if (passengers && passengers.length > 0) {
          doc.font('Helvetica-Bold').text('Passengers:');
          doc.moveDown(0.5);
          doc.font('Helvetica');
          passengers.forEach((p: any, i: number) => {
            doc.text(`${i + 1}. ${p.firstName} ${p.lastName} (${p.gender})`);
          });
          doc.moveDown(1);
        }

        // Payment details
        doc.moveTo(50, doc.y).lineTo(545, doc.y).stroke();
        doc.moveDown(0.5);

        doc.font('Helvetica-Bold').fontSize(12);
        doc.text('Payment Summary', 50);
        doc.moveDown(0.5);
        doc.fontSize(10).font('Helvetica');

        if (payment) {
          doc.text(`Payment ID: ${payment.stripePaymentIntentId}`);
          doc.text(`Amount: ${formatCurrency(Number(payment.amount), payment.currency)}`);
          doc.text(`Status: ${payment.status}`);
          if (payment.paidAt) doc.text(`Paid: ${formatDate(payment.paidAt)}`);
        }

        doc.moveDown(2);

        // Total
        doc.moveTo(50, doc.y).lineTo(545, doc.y).stroke();
        doc.moveDown(0.5);
        doc.font('Helvetica-Bold').fontSize(14);
        doc.text(
          `Total: ${formatCurrency(Number(booking.totalAmount), booking.currency)}`,
          { align: 'right' }
        );

        doc.moveDown(3);

        // Footer
        doc.fontSize(8).font('Helvetica').fillColor('#888');
        doc.text('Bharat Ghumho — Your Gateway to India', { align: 'center' });
        doc.text('This is a computer-generated invoice.', { align: 'center' });

        doc.end();
      } catch (error) {
        logger.error('Invoice generation failed:', error);
        reject(error);
      }
    });
  }
}
