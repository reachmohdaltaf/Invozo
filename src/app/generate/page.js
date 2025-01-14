"use client";
import React, { useState } from "react";
import { jsPDF } from "jspdf"; // Import jsPDF
import { EntryTable } from "@/components/EntryTable";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { TaxTable } from "@/components/TaxTable";
import { Textarea } from "@/components/ui/textarea";
import autoTable from "jspdf-autotable"; // Import autoTable

const InvoicePage = () => {
  const [invoiceData, setInvoiceData] = useState({
    invoiceId: "",
    invoiceDate: new Date().toISOString().split("T")[0], // Default to today
    dueDate: new Date(new Date().setDate(new Date().getDate() + 30))
      .toISOString()
      .split("T")[0], // Default to 30 days from today
    paymentTerms: "",
    billedTo: { name: "", address: "" },
    entries: [],
    taxes: [],
  });

  const [image, setImage] = useState(null); // State for uploaded image

  const handleInputChange = (e, field) => {
    setInvoiceData({ ...invoiceData, [field]: e.target.value });
  };

  const handleBilledToChange = (e, field) => {
    setInvoiceData({
      ...invoiceData,
      billedTo: { ...invoiceData.billedTo, [field]: e.target.value },
    });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImage(event.target.result); // Base64 string
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setImage(null); // Remove the image
  };

  const handleDownloadInvoice = () => {
    const doc = new jsPDF();

    // Add Background (Optional)
    if (image) {
      doc.addImage(image, "JPEG", 140, 20, 50, 50); // Top-right corner with size 50x50
 // Small square at position (20, 20) with size 50x50
    } else {
      doc.setFillColor(230, 230, 230); // Light gray background
      doc.rect(0, 0, 210, 297, "F");
    }

    // Header
    doc.setFontSize(24);
    doc.setTextColor(40, 40, 40);
    doc.text("Invoice", 105, 20, { align: "center" });

    // Invoice Details
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    doc.text(`Invoice ID: ${invoiceData.invoiceId}`, 10, 30);
    doc.text(`Invoice Date: ${invoiceData.invoiceDate}`, 10, 40);
    doc.text(`Due Date: ${invoiceData.dueDate}`, 10, 50);
    doc.text(`Payment Terms: ${invoiceData.paymentTerms}`, 10, 60);

    // Billed To Section
    doc.text("Billed To:", 10, 70);
    doc.text(`Name: ${invoiceData.billedTo.name}`, 10, 80);
    doc.text(`Address: ${invoiceData.billedTo.address}`, 10, 90);

    // Entries Table
    const entryRows = invoiceData.entries.map((entry, index) => [
      index + 1,
      entry.description,
      entry.quantity,
      `$${entry.amount}`,
    ]);
    autoTable(doc, {
      head: [["#", "Description", "Quantity", "Amount"]],
      body: entryRows,
      startY: 100,
      theme: "striped",
    });

    // Taxes Table
    const taxStartY = doc.previousAutoTable.finalY + 10; // Start after entries table
    const taxRows = invoiceData.taxes.map((tax, index) => [
      index + 1,
      tax.description,
      `${tax.percentage}%`,
    ]);
    autoTable(doc, {
      head: [["#", "Tax Description", "Percentage"]],
      body: taxRows,
      startY: taxStartY,
      theme: "striped",
    });

    // Footer
    const footerStartY = doc.previousAutoTable.finalY + 20;
    doc.setFontSize(10);
    doc.setTextColor(60, 60, 60);
    doc.text("Thank you for your business!", 105, footerStartY, { align: "center" });

    // Save PDF
    doc.save("invoice.pdf");
  };

  return (
    <div className="mt-10">
      <Card className="p-5 h-full dark">
        <h1 className="text-3xl font-bold text-[#E4E5E7]">Invoice</h1>
        <div className="flex items-start justify-between mt-5">
          {/* Invoice Details Form */}
          <div className="flex flex-col gap-4 w-[40%]">
            <div>
              <label className="block text-lg">Invoice ID</label>
              <Input
                placeholder="Enter invoice ID"
                value={invoiceData.invoiceId}
                onChange={(e) => handleInputChange(e, "invoiceId")}
              />
            </div>
            <div>
              <label className="block text-lg">Invoice Date</label>
              <Input
                type="date"
                value={invoiceData.invoiceDate}
                onChange={(e) => handleInputChange(e, "invoiceDate")}
              />
            </div>
            <div>
              <label className="block text-lg">Due Date</label>
              <Input
                type="date"
                value={invoiceData.dueDate}
                onChange={(e) => handleInputChange(e, "dueDate")}
              />
            </div>
            <div>
              <label className="block text-lg">Payment Terms</label>
              <Input
                placeholder="Enter payment terms"
                value={invoiceData.paymentTerms}
                onChange={(e) => handleInputChange(e, "paymentTerms")}
              />
            </div>
            <div>
              <label className="block text-lg">Billed To: Name</label>
              <Textarea
                placeholder="Enter name"
                className="w-full p-2 border rounded"
                value={invoiceData.billedTo.name}
                onChange={(e) => handleBilledToChange(e, "name")}
              />
            </div>
            <div>
              <label className="block text-lg">Billed To: Address</label>
              <Textarea
                placeholder="Enter address"
                className="w-full p-2 border rounded"
                value={invoiceData.billedTo.address}
                onChange={(e) => handleBilledToChange(e, "address")}
              />
            </div>
          </div>

          {/* Image Upload */}
          <div className="text-center">
            <h3 className="text-lg font-medium">Upload Invoice Image</h3>
            {!image ? (
              <input type="file" className="mt-2" onChange={handleImageUpload} />
            ) : (
              <div className="mt-2">
                <img src={image} alt="Invoice" className="w-24 h-24 object-cover" />
                <Button
                  variant="secondary"
                  className="mt-2"
                  onClick={handleRemoveImage}
                >
                  Remove Image
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Entries Section */}
        <div className="mt-10">
          <h1 className="text-2xl font-bold text-[#E4E5E7]">Entries</h1>
          <EntryTable
            entries={invoiceData.entries}
            setEntries={(newEntries) =>
              setInvoiceData({ ...invoiceData, entries: newEntries })
            }
          />

          {/* Tax Section */}
          <h1 className="text-2xl font-bold mt-10 text-[#E4E5E7]">Tax</h1>
          <TaxTable
            taxes={invoiceData.taxes}
            setTaxes={(newTaxes) =>
              setInvoiceData({ ...invoiceData, taxes: newTaxes })
            }
          />
        </div>

        {/* Download Invoice */}
        <Button
          variant="secondary"
          className=" mt-10 flex items-end"
          onClick={handleDownloadInvoice}
        >
          Download Invoice
        </Button>
      </Card>
    </div>
  );
};

export default InvoicePage;
