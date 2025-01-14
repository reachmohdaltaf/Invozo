import {
    Table,
    TableBody,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
  
  export function TaxTable({ taxes, setTaxes }) {
    const handleAddTax = () => {
      setTaxes([...taxes, { description: "", percentage: 0 }]);
    };
  
    const handleTaxChange = (index, field, value) => {
      const updatedTaxes = taxes.map((tax, i) =>
        i === index ? { ...tax, [field]: value } : tax
      );
      setTaxes(updatedTaxes);
    };
  
    const handleRemoveTax = (index) => {
      setTaxes(taxes.filter((_, i) => i !== index));
    };
  
    const totalPercentage = taxes.reduce((total, tax) => total + tax.percentage, 0);
  
    return (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Description</TableHead>
            <TableHead className="text-right">Percentage</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {taxes.map((tax, index) => (
            <TableRow key={index}>
              <TableCell>
                <Input
                  type="text"
                  value={tax.description}
                  onChange={(e) => handleTaxChange(index, "description", e.target.value)}
                  placeholder="Tax Description"
                  className="w-full p-2 border rounded"
                />
              </TableCell>
              <TableCell>
                <Input
                  type="number"
                  value={tax.percentage}
                  onChange={(e) => handleTaxChange(index, "percentage", parseFloat(e.target.value))}
                  placeholder="Tax %"
                  className="w-full p-2 border rounded text-right"
                />
              </TableCell>
              <TableCell className='text-right'>
                <Button
                    variant='outline'
                  className=""
                  onClick={() => handleRemoveTax(index)}
                >
                  Remove
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
  <TableRow>
    <TableCell className="text-3xl">Total</TableCell>
    <TableCell className="text-right text-3xl">{totalPercentage.toFixed(2)}%</TableCell>
    <TableCell className="text-right"></TableCell>
  </TableRow>
  <TableRow>
    <TableCell colSpan={3} className="w-full">
      <Button
        variant="outline"
        className="w-full"
        onClick={handleAddTax}
      >
        Add Tax
      </Button>
    </TableCell>
  </TableRow>
</TableFooter>

      </Table>
    );
  }
  