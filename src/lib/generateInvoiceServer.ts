import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";

export async function generateInvoicePDF(order: any) {
  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
  });

  // 1. Add Logo (Top Left)
  try {
    const logoUrl = "https://losdmrjfozfpvhuejdsp.supabase.co/storage/v1/object/public/dioxera/logo%20dioxera.png";
    const response = await fetch(logoUrl);
    const buffer = await response.arrayBuffer();
    const logoData = new Uint8Array(buffer);
    
    // X=15, Y=15, Width=50, Height=0 (Auto)
    // This reserves space from Y=15 to roughly Y=50 depending on logo shape
    doc.addImage(logoData, "PNG", 15, 15, 50, 0); 
  } catch (err) {
    console.error("Logo load failed:", err);
    doc.setFontSize(24);
    doc.setFont("helvetica", "bold");
    doc.text("DIOXERA.", 20, 25);
  }

  // 2. Company Details (Moved DOWN to Y=60 to clear the logo)
  doc.setFontSize(9);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(100);
  
  doc.text("High-Purity Solutions", 15, 60); // Aligned with logo X
  doc.text("Zug, Switzerland", 15, 65);
  doc.text("support@dioxera.com", 15, 70);
  doc.setTextColor(0);

  // 3. Invoice Header (Top Right - Stays put)
  doc.setFontSize(24);
  doc.setFont("helvetica", "bold");
  doc.text("INVOICE", 140, 25);
  
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.text(`Invoice #:`, 140, 35);
  doc.text(order.id.slice(0, 8).toUpperCase(), 170, 35);
  
  doc.text(`Date:`, 140, 40);
  doc.text(new Date(order.created_at).toLocaleDateString(), 170, 40);
  
  doc.text(`Status:`, 140, 45);
  if (order.payment_status === 'paid') doc.setTextColor(0, 150, 0);
  else doc.setTextColor(200, 100, 0);
  doc.text(order.payment_status.toUpperCase(), 170, 45);
  doc.setTextColor(0);

  // 4. Divider Line (Moved DOWN to Y=80)
  doc.setDrawColor(200);
  doc.line(15, 80, 195, 80); 

  // 5. Customer Details (Moved DOWN to Y=90)
  doc.setFontSize(10);
  doc.setFont("helvetica", "bold");
  doc.text("Bill To:", 15, 90);
  
  doc.setFont("helvetica", "normal");
  const fName = order.customer_details?.firstName || "";
  const lName = order.customer_details?.lastName || "";
  const address = order.customer_details?.address || "";
  const city = order.customer_details?.city || "";
  const country = order.customer_details?.country || "";
  
  doc.text(`${fName} ${lName}`, 15, 97);
  doc.text(address, 15, 102);
  doc.text(`${city}, ${country}`, 15, 107);
  doc.text(order.customer_email || "", 15, 112);

  // 6. Items Table (Moved DOWN to Y=120)
  const tableRows = order.items.map((item: any) => [
    item.name,
    item.quantity,
    `€${item.price.toFixed(2)}`,
    `€${(item.price * item.quantity).toFixed(2)}`,
  ]);

  autoTable(doc, {
    startY: 120, 
    head: [["Item Description", "Qty", "Unit Price", "Total"]],
    body: tableRows,
    theme: "grid",
    headStyles: { 
      fillColor: [17, 17, 17], 
      textColor: 255,
      fontStyle: 'bold'
    },
    styles: { 
      fontSize: 10,
      cellPadding: 4,
    },
    margin: { left: 15, right: 15 } // Match margin with text
  });

  // 7. Totals
  // @ts-ignore
  const finalY = doc.lastAutoTable.finalY + 10;
  const subtotal = Number(order.total_amount) - Number(order.shipping_cost);
  
  doc.text(`Subtotal:`, 140, finalY);
  doc.text(`€${subtotal.toFixed(2)}`, 185, finalY, { align: "right" });
  
  doc.text(`Shipping:`, 140, finalY + 6);
  doc.text(`€${Number(order.shipping_cost).toFixed(2)}`, 185, finalY + 6, { align: "right" });
  
  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  doc.text(`Total Due:`, 140, finalY + 14);
  doc.text(`€${Number(order.total_amount).toFixed(2)}`, 185, finalY + 14, { align: "right" });

  // 8. Bank Footer
  if (order.payment_method === 'bank_transfer') {
      const bankY = 240;
      doc.setFillColor(245, 245, 245);
      doc.rect(15, bankY - 5, 180, 40, 'F'); // Wider box to match margins

      doc.setFontSize(10);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(50);
      doc.text("PAYMENT INSTRUCTIONS", 25, bankY + 5);
      
      doc.setFont("helvetica", "normal");
      doc.setFontSize(9);
      doc.text("Bank Name: Wise (TransferWise)", 25, bankY + 12);
      doc.text("IBAN: CH93 0000 0000 0000 0000 0", 25, bankY + 17);
      doc.text("BIC/SWIFT: WISECHZZ", 25, bankY + 22);
      doc.text(`Reference: Order #${order.id.slice(0, 8)}`, 100, bankY + 12);
  }

  return Buffer.from(doc.output("arraybuffer"));
}