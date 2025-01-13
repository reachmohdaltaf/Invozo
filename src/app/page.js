import { useState } from 'react';
import jsPDF from 'jspdf';

export default function Home() {
  const [invoiceData, setInvoiceData] = useState({
    clientName: '',
    items: [{ description: '', quantity: 1, price: 0 }],
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInvoiceData((prev) => ({ ...prev, [name]: value }));
  };

  const handleItemChange = (index, field, value) => {
    const updatedItems = [...invoiceData.items];
    updatedItems[index][field] = field === 'quantity' || field === 'price' ? parseFloat(value) : value;
    setInvoiceData((prev) => ({ ...prev, items: updatedItems }));
  };

  const addItem = () => {
    setInvoiceData((prev) => ({
      ...prev,
      items: [...prev.items, { description: '', quantity: 1, price: 0 }],
    }));
  };

  const generatePDF = () => {
    const doc = new jsPDF();

    // Invoice Header
    doc.setFontSize(18);
    doc.text('Invoice', 10, 10);
    doc.setFontSize(12);
    doc.text(`Client: ${invoiceData.clientName}`, 10, 20);

    // Table Headers
    doc.text('Description', 10, 40);
    doc.text('Quantity', 100, 40);
    doc.text('Price', 140, 40);

    // Table Rows
    let y = 50;
    invoiceData.items.forEach((item) => {
      doc.text(item.description, 10, y);
      doc.text(item.quantity.toString(), 100, y);
      doc.text(item.price.toFixed(2), 140, y);
      y += 10;
    });

    // Total Amount
    const total = invoiceData.items.reduce((sum, item) => sum + item.quantity * item.price, 0);
    doc.text(`Total: $${total.toFixed(2)}`, 10, y + 10);

    // Save PDF
    doc.save('invoice.pdf');
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Invoice Generator</h1>

      <div style={{ marginBottom: '20px' }}>
        <label>Client Name:</label>
        <input
          type="text"
          name="clientName"
          value={invoiceData.clientName}
          onChange={handleInputChange}
          style={{ marginLeft: '10px' }}
        />
      </div>

      <h3>Items</h3>
      {invoiceData.items.map((item, index) => (
        <div key={index} style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
          <input
            type="text"
            placeholder="Description"
            value={item.description}
            onChange={(e) => handleItemChange(index, 'description', e.target.value)}
          />
          <input
            type="number"
            placeholder="Quantity"
            value={item.quantity}
            onChange={(e) => handleItemChange(index, 'quantity', e.target.value)}
          />
          <input
            type="number"
            placeholder="Price"
            value={item.price}
            onChange={(e) => handleItemChange(index, 'price', e.target.value)}
          />
        </div>
      ))}

      <button onClick={addItem}>Add Item</button>
      <button onClick={generatePDF} style={{ marginLeft: '10px' }}>
        Download PDF
      </button>
    </div>
  );
}
