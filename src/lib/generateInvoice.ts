import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export const generateInvoice = (order: any) => {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.width;
  
  // -- 1. Header --
  doc.setFontSize(20);
  doc.setFont("helvetica", "bold");
  doc.text("DIOXERA.", 14, 20);

  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.text("Molecular Purity Systems", 14, 25);
  doc.text("Zug, Switzerland", 14, 30);
  doc.text("support@dioxera.com", 14, 35);

  // -- 2. Invoice Details (Right Side) --
  const date = new Date(order.created_at).toLocaleDateString();
  doc.text(`INVOICE #${order.id.slice(0, 8).toUpperCase()}`, pageWidth - 14, 20, { align: "right" });
  doc.text(`Date: ${date}`, pageWidth - 14, 25, { align: "right" });
  doc.text(`Status: ${order.payment_method === 'bank_transfer' ? 'Pending Payment' : 'Paid'}`, pageWidth - 14, 30, { align: "right" });

  // -- 3. Bill To --
  doc.text("Bill To:", 14, 50);
  doc.setFont("helvetica", "bold");
  doc.text(`${order.customer_details.firstName} ${order.customer_details.lastName}`, 14, 55);
  doc.setFont("helvetica", "normal");
  doc.text(order.customer_details.email, 14, 60);
  doc.text(order.customer_details.address || "", 14, 65);
  doc.text(`${order.customer_details.city}, ${order.customer_details.country}`, 14, 70);

  // -- 4. Items Table --
  const tableRows = order.items.map((item: any) => [
    item.name,
    item.quantity,
    `€${item.price.toFixed(2)}`,
    `€${(item.price * item.quantity).toFixed(2)}`
  ]);

  autoTable(doc, {
    startY: 80,
    head: [['Item Description', 'Qty', 'Unit Price', 'Total']],
    body: tableRows,
    theme: 'grid',
    headStyles: { fillColor: [26, 26, 26], textColor: [203, 218, 8], fontStyle: 'bold' }, // Brand Dark & Brand Primary
    styles: { fontSize: 10, cellPadding: 4 },
  });

  // -- 5. Totals --
  // @ts-ignore
  const finalY = doc.lastAutoTable.finalY + 10;
  
  doc.setFontSize(10);
  doc.text(`Subtotal:`, pageWidth - 50, finalY);
  doc.text(`€${(order.total_amount - (order.shipping_cost || 0)).toFixed(2)}`, pageWidth - 14, finalY, { align: "right" });
  
  doc.text(`Shipping:`, pageWidth - 50, finalY + 5);
  doc.text(order.shipping_cost ? `€${order.shipping_cost}` : "Free", pageWidth - 14, finalY + 5, { align: "right" });

  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  doc.text(`Total Due:`, pageWidth - 50, finalY + 12);
  doc.text(`€${order.total_amount.toFixed(2)}`, pageWidth - 14, finalY + 12, { align: "right" });

  // -- 6. Footer --
  doc.setFontSize(8);
  doc.setFont("helvetica", "normal");
  doc.text("Thank you for choosing Dioxera.", 14, finalY + 30);
  doc.text("For bank transfers, please use the Order ID as the payment reference.", 14, finalY + 35);

  // -- 7. Save --
  doc.save(`Dioxera_Invoice_${order.id.slice(0, 8)}.pdf`);
};