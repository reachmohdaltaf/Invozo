import React from "react";
import {
  Table,
  TableBody,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "./ui/input";

export const EntryTable = ({ entries, setEntries }) => {
  
    const handleAddEntry = () => {
    setEntries([...entries, { description: "", quantity: 0, amount: 0 }]);
  };

  const handleEntryChange = (index, field, value) => {
    const updatedEntries = entries.map((entry, i) =>
      i === index ? { ...entry, [field]: value } : entry
    );
    setEntries(updatedEntries);
  };

  const totalAmount = entries.reduce(
    (total, entry) => total + entry.quantity * entry.amount,
    0
  );

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Description</TableHead>
          <TableHead>Quantity</TableHead>
          <TableHead>Amount</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {entries.map((entry, index) => (
          <TableRow key={index}>
            <TableCell>
              <Input
                type="text"
                value={entry.description}
                onChange={(e) =>
                  handleEntryChange(index, "description", e.target.value)
                }
              />
            </TableCell>
            <TableCell>
              <Input
                type="number"
                value={entry.quantity}
                onChange={(e) =>
                  handleEntryChange(index, "quantity", parseInt(e.target.value))
                }
              />
            </TableCell>
            <TableCell>
              <Input
                type="number"
                value={entry.amount}
                onChange={(e) =>
                  handleEntryChange(index, "amount", parseFloat(e.target.value))
                }
              />
            </TableCell>
            <TableCell>
              <Button
                variant="outline"
                onClick={() =>
                  setEntries(entries.filter((_, i) => i !== index))
                }
              >
                Remove
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell className='text-3xl' colSpan={3}>Total</TableCell>
          <TableCell  className='text-3xl' >${totalAmount.toFixed(2)}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell colSpan={4}>
            <Button variant="outline" className="w-full" onClick={handleAddEntry}>
              Add Another Entry
            </Button>
          </TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
};
