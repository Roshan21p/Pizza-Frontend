import jsPDF from 'jspdf';
import 'jspdf-autotable';
import logo from '../assets/Images/Pizza_logo.webp';
import { formatDate } from '../Helpers/formatDate';

function generateInvoice(orderDetails, userDetails) {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const currentYear = new Date().getFullYear();

  doc.setFillColor(255, 255, 204); // Light yellow color
  doc.rect(0, 0, pageWidth, pageHeight, 'F'); // Fills the entire page

  // Add Pizzify Logo
  const logoWidth = 50;
  const logoHeight = 30;
  doc.addImage(logo, 'PNG', (pageWidth - logoWidth) / 2, 10, logoWidth, logoHeight);

  // Add Pizzify Title
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(32);
  doc.setTextColor('#FF9110');
  doc.text('Pizzify', pageWidth / 2, 50, { align: 'center' });

  // Add a horizontal line below the Pizzify title
  doc.line(20, 59, pageWidth - 20, 59); // Horizontal line
  doc.setDrawColor(0, 0, 0); // Set the line color to black

  doc.setFillColor(240, 240, 240); // Light Gray
  doc.rect(20, 60, pageWidth - 40, 10, 'F'); // Creates a background for the invoice section

  // Add Invoice Title
  doc.setTextColor(0, 0, 0);
  doc.setFontSize(18);
  doc.text('Invoice', pageWidth / 2, 67, { align: 'center' });

  // Add a horizontal line below the title
  doc.setDrawColor(0, 0, 0); // Set the line color to black
  doc.line(20, 70, pageWidth - 20, 70); // Horizontal line

  // User Details Section (Single Row)
  doc.setFontSize(12);
  const userDetailsX = 20;

  // Add User Details Header
  doc.setFont('helvetica', 'bold');
  // Add User Details (Single Row)
  doc.setFont('helvetica', 'normal');
  doc.text(`Name: ${userDetails?.firstName} ${userDetails?.lastName}`, userDetailsX, 80);
  doc.text(`Email: ${userDetails?.email}`, userDetailsX, 85);
  doc.text(`Mobile: ${userDetails?.mobileNumber}`, userDetailsX, 90);

  // Move to the next line after User Details
  const nextLineY = 100;

  // Order Details and Shipping Section (Side by Side)
  const leftColumnX = 20;
  const rightColumnX = pageWidth - 70; // Adjusted to move the right column further right

  // Add Order Details Header
  doc.setFont('helvetica', 'bold');
  doc.text('Order Details', leftColumnX, nextLineY);

  // Add Order Details
  doc.setFont('helvetica', 'normal');
  doc.text(`Order ID: ${orderDetails?._id}`, leftColumnX, nextLineY + 10);
  doc.text(`Date: ${formatDate(orderDetails?.createdAt)}`, leftColumnX, nextLineY + 15);
  doc.text(`Total Price: INR ${orderDetails?.totalPrice?.toFixed(2)}`, leftColumnX, nextLineY + 20);
  doc.text(`Payment Status: ${orderDetails?.payment}`, leftColumnX, nextLineY + 25);

  // Add Shipping Address Section (Extreme Right)
  doc.setFont('helvetica', 'bold');
  doc.text('Shipping Address', rightColumnX, nextLineY);

  doc.setFont('helvetica', 'normal');
  doc.text(
    `${orderDetails?.address?.flat}, ${orderDetails?.address?.area}`,
    rightColumnX,
    nextLineY + 10
  );
  doc.text(`${orderDetails?.address?.landmark}`, rightColumnX, nextLineY + 15);
  doc.text(
    `${orderDetails?.address?.city}, ${orderDetails?.address?.state}`,
    rightColumnX,
    nextLineY + 20
  );
  doc.text(`${orderDetails?.address?.pincode}`, rightColumnX, nextLineY + 25);

  // Add a horizontal line before the table
  doc.setDrawColor(0, 0, 0);
  doc.line(20, nextLineY + 40, pageWidth - 20, nextLineY + 40);

  // Add Table for Order Items
  const tableData = orderDetails?.items?.map((item) => [
    item?.product?.productName,
    item?.quantity,
    `INR ${item?.quantity * item?.product?.price}`
  ]);

  doc.autoTable({
    head: [['Product', 'Quantity', 'Price']],
    body: tableData,
    startY: nextLineY + 45,
    theme: 'grid',
    headStyles: {
      fillColor: [240, 128, 128], // Light red background for the header
      textColor: [255, 255, 255], // White text for the header
      fontSize: 12,
      halign: 'center'
    },
    bodyStyles: {
      fontSize: 10,
      halign: 'center' // Center-align the body content
    },
    columnStyles: {
      0: { cellWidth: 90, halign: 'left' },
      1: { cellWidth: 40, halign: 'center' },
      2: { cellWidth: 40, halign: 'center' }
    }
  });

  // Footer
  doc.setFontSize(10);
  doc.setFont('italic');
  doc.text(
    `Copyright © ${currentYear} Pizzify. All rights reserved.`,
    pageWidth / 2,
    pageHeight - 15,
    { align: 'center' }
  );
  doc.text('Thank you for ordering from Pizzify!', pageWidth / 2, pageHeight - 10, {
    align: 'center'
  });

  // Save the PDF
  doc.save(`Invoice-${orderDetails?._id}.pdf`);
}

export default generateInvoice;
