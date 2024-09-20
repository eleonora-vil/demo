import { Button } from '@/components/ui/button';
import React from 'react';
import * as XLSX from 'xlsx';

const ExportButton: React.FC = () => {
  const exportToExcel = () => {
    // Example data
    const data = [
      ['Email'],
      ['ljabqbv@aol.com'],
      ['dpxti0a79@outlook.com'],
      ['g3ykd4f8@outlook.com'],
      ['tq2k15@yahoo.com'],
      ['65kuv4l0@yahoo.com'],
      ['jo11o4@aol.com'],
      ['instructor@gmail.com'],
      ['phigeagbaol.com'],
      ['f71l0@gmail.com'],
      ['umgr7rod8@gmail.com'],
      ['u40auh7y@aol.com'],
      ['bih9q@gmail.com'],
      ['mm0af4qhl@outlook.com'],
      ['fnryrd864r@yahoo.com'],
      ['tk5ugu@gmail.com'],
      ['jknzafwxen@yahoo.com'],
      ['414hm@aol.com'],
      ['inuv329@hotmail.com'],
      ['otuzpuf@yahoo.com'],
      ['cq5vgsdtn0@aol.com'],
      ['ptfdwic@aol.com'],
      ['148x3er1j@yahoo.com'],
      ['b4h48wr7n7@hotmail.com'],
      ['lx7pwvsx@yahoo.com'],
      ['46jsvospz@gmail.com'],
      ['j3m3qmeoa3@outlook.com'],
      ['z538wt3uh@hotmail.com'],
      ['iibl1@hotmail.com'],
      ['hetcp@yahoo.com'],
      ['4jlv58kpv@gmail.com'],
      ['wkzcbsgmail.com'],
      ['tq2k15@yahoo.com'],
      ['tq2k15@yahoo.com'],
      ['tq2k15@yahoo.com'],
      ['tq2k15@yahoo.com'],
      ['z538wt3uh@hotmail.com'],
      ['hetcp@yahoo.com'],
      ['z538wt3uh@hotmail.com'],
      ['hetcp@yahoo.com'],
    ];

    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.aoa_to_sheet(data);
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    // Save file
    XLSX.writeFile(wb, 'example-trainee-list.xlsx');
  };

  return (
    <Button className="bg-white text-blue-500 border-[1px] border-blue-500 hover:bg-blue-200" onClick={exportToExcel}>
      Example Excel file
    </Button>
  );
};

export default ExportButton;
